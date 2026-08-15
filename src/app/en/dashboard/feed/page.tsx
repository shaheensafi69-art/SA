"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostItem {
  id: string;
  studentId: string;
  rawTitle: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  authorName: string;
  authorAvatar: string;
  likesCount: number;
  isLikedByMe: boolean;
  commentsCount: number;
  moodTag: string;
  cleanTitle: string;
}

interface FriendUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
}

interface CommentItem {
  id: string;
  post_id: string;
  student_id: string;
  parent_comment_id: string | null;
  comment_text: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

export default function StudentFeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // لیست کاربران برای بخش Manage Friends در سمت چپ (فقط در دسکتاپ نشان داده می‌شود)
  const [exploreUsers, setExploreUsers] = useState<FriendUser[]>([]);

  // مدیریت کامنت‌ها
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const extractMood = (title: string) => {
    if (title.startsWith('[') && title.includes(']')) {
      const endIndex = title.indexOf(']');
      return title.substring(1, endIndex);
    }
    return "📢 Post";
  };

  const extractCleanTitle = (title: string) => {
    if (title.startsWith('[') && title.includes(']')) {
      const endIndex = title.indexOf(']');
      return title.substring(endIndex + 1).trim();
    }
    return title;
  };

  useEffect(() => {
    fetchFeedAndUsers();
  }, []);

  const fetchFeedAndUsers = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return router.push("/en/login");
      const userId = session.user.id;
      setCurrentUserId(userId);

      // ۱. دریافت پست‌ها
      const { data: res, error } = await supabase
        .from("discussion_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const loadedPosts: PostItem[] = [];

      for (const item of (res || [])) {
        const pId = item.id.toString();
        const sId = item.student_id.toString();

        let authorName = "Academy Member";
        let authorAvatar = "";

        try {
          const { data: profileRes } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", sId)
            .maybeSingle();

          if (profileRes) {
            authorName = `${profileRes.first_name || ''} ${profileRes.last_name || ''}`.trim() || "Academy Member";
            authorAvatar = profileRes.avatar_url || "";
          }
        } catch (_) {}

        let likesCount = 0;
        let isLikedByMe = false;
        try {
          const { data: likesRes } = await supabase.from("discussion_likes").select("student_id").eq("post_id", pId);
          if (likesRes) {
            likesCount = likesRes.length;
            isLikedByMe = likesRes.some((l) => l.student_id === userId);
          }
        } catch (_) {}

        let commentsCount = 0;
        try {
          const { data: commentsRes } = await supabase.from("discussion_comments").select("id").eq("post_id", pId);
          if (commentsRes) commentsCount = commentsRes.length;
        } catch (_) {}

        const rawTitle = item.title || "";
        loadedPosts.push({
          id: pId,
          studentId: sId,
          rawTitle,
          content: item.content || "",
          imageUrl: item.image_url,
          createdAt: item.created_at || "",
          authorName,
          authorAvatar,
          likesCount,
          isLikedByMe,
          commentsCount,
          moodTag: extractMood(rawTitle),
          cleanTitle: extractCleanTitle(rawTitle),
        });
      }

      setPosts(loadedPosts);
      setFilteredPosts(loadedPosts);

      // ۲. دریافت کاربران برای بخش Manage Friends (دسکتاپ)
      const { data: profilesList } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, role")
        .neq("id", userId)
        .limit(8);

      if (profilesList) {
        setExploreUsers(profilesList);
      }

    } catch (e) {
      console.error("Feed fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(posts);
    } else {
      const q = query.trim().toLowerCase();
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.cleanTitle.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.authorName.toLowerCase().includes(q)
        )
      );
    }
  };

  const toggleLike = async (post: PostItem) => {
    if (!currentUserId) return;

    const updateList = (list: PostItem[]) =>
      list.map((p) => {
        if (p.id === post.id) {
          const liked = !p.isLikedByMe;
          return {
            ...p,
            isLikedByMe: liked,
            likesCount: liked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      });

    setPosts(updateList);
    setFilteredPosts(updateList);

    try {
      if (post.isLikedByMe) {
        await supabase.from("discussion_likes").delete().eq("post_id", post.id).eq("student_id", currentUserId);
      } else {
        await supabase.from("discussion_likes").insert({ post_id: post.id, student_id: currentUserId });
      }
    } catch (e) {
      console.error("Error toggling like:", e);
      fetchFeedAndUsers(); 
    }
  };

  const deletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await supabase.from("discussion_posts").delete().eq("id", postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setFilteredPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (e) {
      console.error("Error deleting post:", e);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // مکس‌ویدث افزایش یافت تا در نمایشگرهای بزرگ فضای بهتری برای سایدبار چپ فراهم شود
    <div className="max-w-[90rem] mx-auto px-4 sm:px-8 py-6 sm:py-8 font-sans relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative items-start">
        
        {/* ================= سمت چپ: مدیریت دوستان (زیبا شده و متمایل به چپ) ================= */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6 sticky top-8 z-10 xl:-ml-4">
          <div className="bg-[#0a0a0f]/90 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            {/* افکت نوری جذاب در پس زمینه سایدبار */}
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#C2185B]/15 rounded-full blur-[40px] pointer-events-none transition-all duration-700 group-hover:bg-[#C2185B]/25"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 bg-gradient-to-br from-[#C2185B] to-pink-700 rounded-[1.2rem] text-white shadow-lg shadow-[#C2185B]/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <div>
                <h2 className="text-white font-black text-sm tracking-wide">Academy Peers</h2>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Discover Network</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {exploreUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/en/dashboard/feed/profile/${user.id}`}
                  className="flex items-center gap-4 p-3 rounded-[1.2rem] bg-white/[0.02] border border-white/5 hover:border-[#C2185B]/30 hover:bg-white/[0.04] hover:shadow-[0_4px_15px_rgba(194,24,91,0.1)] transition-all duration-300 group/item"
                >
                  <div className="w-11 h-11 rounded-[1rem] bg-neutral-800 overflow-hidden border border-[#C2185B]/20 flex items-center justify-center shrink-0 group-hover/item:border-[#C2185B] transition-colors">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#C2185B] font-black text-sm">{user.first_name?.[0] || 'U'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-black text-xs truncate group-hover/item:text-pink-300 transition-colors">
                      {user.first_name} {user.last_name}
                    </h4>
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5 block">{user.role || 'Student'}</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/en/dashboard/feed/network"
              className="mt-6 w-full py-4 bg-transparent border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all duration-300 relative z-10"
            >
              Manage Network →
            </Link>
          </div>
        </div>

        {/* ================= سمت راست: فید پست‌ها (با تنظیم گرید جدید) ================= */}
        <div className="col-span-1 lg:col-span-8 xl:col-span-9 space-y-6 w-full max-w-3xl mx-auto xl:max-w-4xl">
          
          {/* هدر و دکمه ایجاد پست */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-[#0a0a0f]/80 border border-white/5 p-5 sm:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Academy Feed</h1>
              <p className="text-xs text-neutral-400 font-medium mt-1.5">Share your setups, ideas, and discuss with peers.</p>
            </div>
            {/* دکمه فقط در حالت دسکتاپ/تبلت نمایش داده می‌شود */}
            <Link
              href="/en/dashboard/feed/create"
              className="hidden sm:flex px-6 py-4 bg-gradient-to-r from-[#C2185B] to-pink-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform duration-300 shadow-[0_10px_25px_rgba(194,24,91,0.4)] items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
              Create Post
            </Link>
          </div>

          {/* نوار جستجو */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, topics, or authors..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-[#0a0a0f]/60 border border-white/5 rounded-[1.5rem] px-5 py-4 pl-14 text-white placeholder-neutral-500 font-medium focus:outline-none focus:border-[#C2185B] transition-colors shadow-lg"
            />
            <svg className="absolute left-5 top-[18px] w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          {/* لیست پست‌ها */}
          <div className="space-y-6 pb-24 lg:pb-10">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0f]/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                <svg className="w-14 h-14 text-neutral-600 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"></path></svg>
                <p className="text-neutral-500 font-bold text-sm tracking-wide">No posts found matching your criteria.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-5 sm:p-8 backdrop-blur-md space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all">
                  
                  {/* هدر کارت پست */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Link href={`/en/dashboard/feed/profile/${post.studentId}`} className="w-10 h-10 sm:w-14 sm:h-14 rounded-[1.2rem] bg-neutral-800 border-2 border-[#C2185B]/30 overflow-hidden flex items-center justify-center hover:scale-105 hover:border-[#C2185B] transition-all shrink-0">
                        {post.authorAvatar ? (
                          <img src={post.authorAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[#C2185B] font-black text-lg">{post.authorName.charAt(0)}</span>
                        )}
                      </Link>
                      <div>
                        <Link href={`/en/dashboard/feed/profile/${post.studentId}`} className="text-white font-black text-xs sm:text-[15px] hover:text-[#C2185B] transition-colors tracking-wide">
                          {post.authorName}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-1">
                          <svg className="w-3 h-3 text-neutral-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                          <p className="text-[10px] text-neutral-500 font-bold tracking-widest">{post.createdAt.split('T')[0]}</p>
                        </div>
                      </div>
                    </div>

                    {currentUserId === post.studentId && (
                      <button onClick={() => deletePost(post.id)} className="text-neutral-500 hover:text-red-500 p-2.5 transition-colors bg-white/5 rounded-xl hover:bg-red-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    )}
                  </div>

                  {/* تگ مود */}
                  <div className="inline-block px-3.5 py-1.5 bg-gradient-to-r from-[#C2185B]/20 to-transparent border-l-2 border-[#C2185B] rounded-r-lg text-pink-300 text-[10px] font-black uppercase tracking-widest mt-2 shadow-sm">
                    {post.moodTag}
                  </div>

                  {/* عنوان و محتوا */}
                  {post.cleanTitle && <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">{post.cleanTitle}</h3>}
                  <p className="text-neutral-300 text-[15px] leading-relaxed whitespace-pre-wrap">{post.content}</p>

                  {/* تصویر پست (فیت شده در هر سایز) */}
                  {post.imageUrl && (
                    <div className="rounded-2xl border border-white/5 bg-[#050508] mt-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt="Post media" 
                        className="max-w-full max-h-[500px] object-contain rounded-2xl" 
                      />
                    </div>
                  )}

                  {/* نمایش تعداد لایک و کامنت */}
                  {(post.likesCount > 0 || post.commentsCount > 0) && (
                    <div className="flex items-center justify-between pt-4 pb-1 text-[11px] font-bold text-neutral-400">
                      {post.likesCount > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-[#C2185B] rounded-full text-white shadow-[0_0_10px_rgba(194,24,91,0.5)]">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                          </div>
                          <span className="text-white">{post.likesCount}</span>
                        </div>
                      ) : <span />}
                      {post.commentsCount > 0 && <span>{post.commentsCount} Comments</span>}
                    </div>
                  )}

                  <hr className="border-white/5" />

                  {/* دکمه‌های اکشن (Like/Comment) */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleLike(post)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1rem] transition-all font-black text-xs ${
                        post.isLikedByMe 
                        ? "text-[#C2185B] bg-[#C2185B]/10 border border-[#C2185B]/30 shadow-[0_0_15px_rgba(194,24,91,0.15)]" 
                        : "text-neutral-400 bg-white/[0.02] border border-transparent hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <svg className="w-4 h-4" fill={post.isLikedByMe ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"></path></svg>
                      <span>Like</span>
                    </button>
                    <div className="w-3 sm:w-4"></div>
                    <button
                      onClick={() => setActivePostId(post.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[1rem] transition-all font-black text-xs text-neutral-400 bg-white/[0.02] hover:bg-white/5 hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= COMMENTS MODAL ================= */}
      {activePostId && currentUserId && (
        <CommentsModal 
          postId={activePostId} 
          currentUserId={currentUserId} 
          onClose={() => {
            setActivePostId(null);
            fetchFeedAndUsers();
          }} 
        />
      )}
    </div>
  );
}

// =====================================================================
// COMPONENT: COMMENTS MODAL (WITH NESTED REPLIES)
// =====================================================================
function CommentsModal({ postId, currentUserId, onClose }: { postId: string, currentUserId: string, onClose: () => void }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyingToName, setReplyingToName] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data: res } = await supabase
      .from("discussion_comments")
      .select("*, profiles:student_id (first_name, last_name, avatar_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (res) setComments(res as CommentItem[]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!newComment.trim()) return;
    setIsSending(true);

    const payload = {
      post_id: postId,
      student_id: currentUserId,
      comment_text: newComment.trim(),
      parent_comment_id: replyingToId || null,
    };

    await supabase.from("discussion_comments").insert(payload);
    setNewComment("");
    setReplyingToId(null);
    setReplyingToName(null);
    await fetchComments();
    setIsSending(false);
  };

  const buildCommentTree = (parentId: string | null, depth: number): JSX.Element[] => {
    const children = comments.filter((c) => c.parent_comment_id === parentId);
    let elements: JSX.Element[] = [];

    children.forEach((c) => {
      const authorName = `${c.profiles?.first_name || 'User'} ${c.profiles?.last_name || ''}`.trim();
      const avatarUrl = c.profiles?.avatar_url;

      elements.push(
        <div key={c.id} style={{ marginLeft: `${depth * 24}px` }} className="mb-4">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-neutral-800 shrink-0 overflow-hidden border border-[#C2185B]/20 flex items-center justify-center">
              {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" alt="" /> : <span className="text-[#C2185B] text-xs font-black">{authorName.charAt(0)}</span>}
            </div>
            <div className="flex-1">
              <div className="bg-neutral-800/80 border border-white/5 p-3.5 rounded-[1.2rem] rounded-tl-sm inline-block min-w-[200px] max-w-full shadow-md">
                <p className="text-white font-black text-xs mb-1">{authorName}</p>
                <p className="text-neutral-300 text-[13px] leading-relaxed">{c.comment_text}</p>
              </div>
              <div className="flex items-center gap-4 mt-1.5 ml-2">
                <span className="text-[9px] text-neutral-500 font-bold">{c.created_at.split('T')[0]}</span>
                <button 
                  onClick={() => { setReplyingToId(c.id); setReplyingToName(authorName); }}
                  className="text-[10px] font-black text-[#C2185B] hover:text-pink-400 transition-colors tracking-wide uppercase"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      elements = elements.concat(buildCommentTree(c.id, depth > 2 ? 2 : depth + 1));
    });

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#0a0a0f] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-[slideUp_0.3s_ease-out]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0f]/90">
          <h3 className="text-xl font-black text-white tracking-tight">Discussion</h3>
          <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {isLoading ? (
            <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div></div>
          ) : comments.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <p className="text-neutral-500 font-bold text-sm tracking-wide">No comments yet. Start the conversation!</p>
            </div>
          ) : (
            buildCommentTree(null, 0)
          )}
        </div>

        {/* Footer (Input) */}
        <div className="p-5 sm:p-6 border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl">
          {replyingToName && (
            <div className="flex items-center justify-between mb-3 px-3 py-2 bg-[#C2185B]/10 rounded-xl border border-[#C2185B]/20">
              <span className="text-xs font-black text-[#C2185B] flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                Replying to {replyingToName}
              </span>
              <button onClick={() => { setReplyingToId(null); setReplyingToName(null); }} className="text-neutral-400 hover:text-white text-xs font-bold bg-white/5 px-3 py-1 rounded-lg">Cancel</button>
            </div>
          )}
          <div className="flex items-end gap-3 pb-safe">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your thought..."
              rows={1}
              className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#C2185B] focus:ring-1 focus:ring-[#C2185B] resize-none min-h-[55px] max-h-[120px] transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isSending || !newComment.trim()}
              className="w-[55px] h-[55px] shrink-0 bg-[#C2185B] text-white rounded-2xl flex items-center justify-center hover:bg-[#ad1457] disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(194,24,91,0.3)]"
            >
              {isSending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}