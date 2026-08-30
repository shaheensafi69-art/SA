"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, UserPlus, Clock, UserCheck, UserMinus,
  ShieldCheck, Trophy, Users, FileText, Mail, Globe,
  ThumbsUp, MessageSquare, Trash2, Send, X, BookOpen,
  Award, Flame, Wallet, Calendar, Share2, Link as LinkIcon, Activity, Video, Play
} from "lucide-react";

// ================= TYPES =================
interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  country: string;
  email: string;
  avatar_url: string;
  role: string;
  total_score: number;
  wallet_balance: number;
  referral_code: string;
  referral_link: string;
  referral_discount_rate: number;
  date_of_birth: string;
  created_at: string;
}

interface PostItem {
  id: string;
  studentId: string;
  rawTitle: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  likesCount: number;
  isLikedByMe: boolean;
  commentsCount: number;
  moodTag: string;
  cleanTitle: string;
}

interface ReelItem {
  id: string;
  video_url: string;
  thumbnail_url: string | null;
  title: string;
  category: string;
  views_count: number;
  likes_count: number;
}

interface EnrollmentItem {
  id: string;
  progress_percentage: number;
  enrolled_at: string;
  courses: {
    id: string;
    title: string;
    thumbnail_url: string;
    category: string;
  };
}

interface AwardItem {
  id: string;
  awarded_at: string;
  awards: {
    title: string;
    description: string;
    icon_url: string;
    points_required: number;
  };
}

interface CertificateItem {
  id: string;
  certificate_code: string;
  issue_date: string;
  certificate_url: string;
  courses: {
    title: string;
  };
}

interface StreakItem {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

// ================= MAIN COMPONENT =================
export default function UserProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const targetUserId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Data States
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [streak, setStreak] = useState<StreakItem | null>(null);

  // Connection States
  const [friendshipStatus, setFriendshipStatus] = useState<'none' | 'pending_sent' | 'pending_received' | 'friends'>('none');
  const [friendsCount, setFriendsCount] = useState(0);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // UI States
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'learning' | 'achievements'>('posts');
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const extractMood = (title: string) => {
    if (title.startsWith('[') && title.includes(']')) return title.substring(1, title.indexOf(']'));
    return "Thought";
  };

  const extractCleanTitle = (title: string) => {
    if (title.startsWith('[') && title.includes(']')) return title.substring(title.indexOf(']') + 1).trim();
    return title;
  };

  useEffect(() => {
    fetchCompleteProfile();
  }, [targetUserId]);

  const fetchCompleteProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return router.push("/en/login");

      const loggedInUserId = session.user.id;
      setCurrentUserId(loggedInUserId);

      const [
        { data: profileRes },
        { count: friendsCountRes },
        { data: postsRes },
        { data: reelsRes },
        { data: enrollmentsRes },
        { data: awardsRes },
        { data: certsRes },
        { data: streakRes }
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", targetUserId).maybeSingle(),
        supabase.from("student_friends").select("id", { count: "exact", head: true }).or(`sender_id.eq.${targetUserId},receiver_id.eq.${targetUserId}`).eq("status", "accepted"),
        supabase.from("discussion_posts").select("*").eq("student_id", targetUserId).order("created_at", { ascending: false }),
        supabase.from("reels").select("id, video_url, thumbnail_url, title, category, views_count, likes_count").eq("user_id", targetUserId).eq("is_published", true).order("created_at", { ascending: false }),
        supabase.from("enrollments").select("id, progress_percentage, enrolled_at, courses(id, title, thumbnail_url, category)").eq("student_id", targetUserId),
        supabase.from("student_awards").select("id, awarded_at, awards(title, description, icon_url, points_required)").eq("student_id", targetUserId),
        supabase.from("certificates").select("id, certificate_code, issue_date, certificate_url, courses(title)").eq("student_id", targetUserId),
        supabase.from("student_streaks").select("*").eq("student_id", targetUserId).maybeSingle()
      ]);

      if (profileRes) setProfileData(profileRes as ProfileData);
      setFriendsCount(friendsCountRes || 0);
      if (reelsRes) setReels(reelsRes as ReelItem[]);
      if (enrollmentsRes) setEnrollments(enrollmentsRes as unknown as EnrollmentItem[]);
      if (awardsRes) setAwards(awardsRes as unknown as AwardItem[]);
      if (certsRes) setCertificates(certsRes as unknown as CertificateItem[]);
      if (streakRes) setStreak(streakRes as StreakItem);

      if (loggedInUserId !== targetUserId) {
        const { data: relData } = await supabase
          .from("student_friends")
          .select("*")
          .or(`and(sender_id.eq.${loggedInUserId},receiver_id.eq.${targetUserId}),and(sender_id.eq.${targetUserId},receiver_id.eq.${loggedInUserId})`)
          .maybeSingle();

        if (relData) {
          if (relData.status === 'accepted') setFriendshipStatus('friends');
          else if (relData.sender_id === loggedInUserId) setFriendshipStatus('pending_sent');
          else setFriendshipStatus('pending_received');
        }
      }

      const loadedPosts: PostItem[] = [];
      for (const item of (postsRes || [])) {
        const pId = item.id.toString();
        let likesCount = 0, isLikedByMe = false, commentsCount = 0;
        try {
          const [{ data: likesRes }, { data: commentsRes }] = await Promise.all([
            supabase.from("discussion_likes").select("student_id").eq("post_id", pId),
            supabase.from("discussion_comments").select("id").eq("post_id", pId)
          ]);
          if (likesRes) {
            likesCount = likesRes.length;
            isLikedByMe = likesRes.some((l) => l.student_id === loggedInUserId);
          }
          if (commentsRes) commentsCount = commentsRes.length;
        } catch (_) { }

        const rawTitle = item.title || "";
        loadedPosts.push({
          id: pId, studentId: item.student_id, rawTitle,
          content: item.content || "", imageUrl: item.image_url,
          createdAt: item.created_at || "", likesCount, isLikedByMe,
          commentsCount, moodTag: extractMood(rawTitle), cleanTitle: extractCleanTitle(rawTitle),
        });
      }
      setPosts(loadedPosts);

    } catch (e) {
      console.error("Error fetching complete profile:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectionAction = async () => {
    if (!currentUserId || currentUserId === targetUserId) return;
    setIsActionLoading(true);
    try {
      if (friendshipStatus === 'none') {
        await supabase.from("student_friends").insert({ sender_id: currentUserId, receiver_id: targetUserId, status: 'pending' });
        setFriendshipStatus('pending_sent');
      } else if (friendshipStatus === 'pending_sent' || friendshipStatus === 'friends') {
        await supabase.from("student_friends").delete().or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${targetUserId}),and(sender_id.eq.${targetUserId},receiver_id.eq.${currentUserId})`);
        setFriendshipStatus('none');
      } else if (friendshipStatus === 'pending_received') {
        await supabase.from("student_friends").update({ status: 'accepted' }).or(`and(sender_id.eq.${targetUserId},receiver_id.eq.${currentUserId})`);
        setFriendshipStatus('friends');
      }
    } catch (error) {
      console.error("Connection action failed:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleLike = async (post: PostItem) => {
    if (!currentUserId) return;
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, isLikedByMe: !p.isLikedByMe, likesCount: !p.isLikedByMe ? p.likesCount + 1 : Math.max(0, p.likesCount - 1) } : p));
    try {
      if (post.isLikedByMe) await supabase.from("discussion_likes").delete().eq("post_id", post.id).eq("student_id", currentUserId);
      else await supabase.from("discussion_likes").insert({ post_id: post.id, student_id: currentUserId });
    } catch (e) {
      fetchCompleteProfile();
    }
  };

  const deletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await supabase.from("discussion_posts").delete().eq("id", postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (e) {
      console.error("Error deleting post:", e);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(194,24,91,0.5)]"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-white">Profile Not Found</h2>
        <Link href="/en/feed" className="mt-4 text-[#C2185B] hover:underline font-bold">Return to Feed</Link>
      </div>
    );
  }

  const isMyProfile = currentUserId === targetUserId;
  const isFaculty = profileData.role === 'teacher' || profileData.role === 'admin' || profileData.role === 'super_admin';

  return (
    <div className="w-full max-w-[85rem] mx-auto pb-24 pt-4 sm:pt-0 font-sans relative min-h-screen bg-[#030305]">

      <div className="hidden sm:flex items-center gap-4 px-8 py-6">
        <button onClick={() => router.back()} className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/20 transition-all shadow-lg">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Academy Profile</h1>
          <p className="text-xs text-[#C2185B] font-bold mt-1 uppercase tracking-widest">{profileData.role.replace('_', ' ')}</p>
        </div>
      </div>

      {/* ================= PROFILE COVER & AVATAR ================= */}
      <div className="sm:px-8">
        <div className="bg-[#0a0a0f] sm:bg-[#0a0a0f]/80 sm:border border-white/10 sm:rounded-[2.5rem] backdrop-blur-xl sm:shadow-2xl relative overflow-hidden mb-6 sm:mb-8 pb-6 sm:pb-8">

          <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-[#0a0a0f] via-[#C2185B]/30 to-indigo-900/20 relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0f] sm:from-[#0a0a0f]/90 to-transparent"></div>
          </div>

          <div className="px-5 sm:px-10 relative z-10 -mt-12 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">

              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-[1.8rem] sm:rounded-[2rem] bg-[#050508] border-4 sm:border-[5px] border-[#0a0a0f] overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(194,24,91,0.3)]">
                  {profileData.avatar_url ? (
                    <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#C2185B] font-black text-4xl sm:text-5xl">{profileData.first_name?.[0] || 'U'}</span>
                  )}
                </div>
                {isFaculty && (
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center border-[3px] sm:border-[4px] border-[#0a0a0f] shadow-lg">
                    <ShieldCheck size={16} className="text-white" />
                  </div>
                )}
              </div>

              {/* User Info & Stats */}
              <div className="flex-1 w-full mt-2 sm:mt-0 sm:pb-2">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-1 sm:mb-2">
                  {profileData.first_name} {profileData.last_name}
                </h2>
                <div className="inline-block sm:hidden px-3 py-1 mb-4 bg-white/5 rounded-lg text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                  {profileData.role.replace('_', ' ')}
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-6 mt-2 w-full">
                  <div className="flex-1 sm:flex-none flex flex-col items-center sm:flex-row sm:gap-2 bg-white/5 sm:bg-transparent border sm:border-0 border-white/5 py-2 sm:py-0 rounded-xl">
                    <span className="text-lg sm:text-xl font-black text-white">{friendsCount}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Network</span>
                  </div>
                  {!isFaculty && (
                    <div className="flex-1 sm:flex-none flex flex-col items-center sm:flex-row sm:gap-2 bg-[#C2185B]/10 sm:bg-transparent border sm:border-0 border-[#C2185B]/20 py-2 sm:py-0 rounded-xl">
                      <span className="text-lg sm:text-xl font-black text-[#C2185B]">{profileData.total_score || 0}</span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#C2185B]/70 uppercase tracking-widest">Score</span>
                    </div>
                  )}
                  <div className="flex-1 sm:flex-none flex flex-col items-center sm:flex-row sm:gap-2 bg-white/5 sm:bg-transparent border sm:border-0 border-white/5 py-2 sm:py-0 rounded-xl">
                    <span className="text-lg sm:text-xl font-black text-white">{posts.length}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Posts</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Connect & Message) */}
              {!isMyProfile && (
                <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:pb-2 flex items-center gap-2">
                  <button
                    disabled={isActionLoading}
                    onClick={handleConnectionAction}
                    className={`px-6 py-3.5 sm:py-4 flex items-center justify-center gap-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg ${friendshipStatus === 'friends' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 group" :
                      friendshipStatus === 'pending_sent' ? "bg-white/5 text-neutral-400 border border-white/10" :
                        friendshipStatus === 'pending_received' ? "bg-emerald-500 text-black border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" :
                          "bg-[#C2185B] text-white border border-[#C2185B] shadow-[0_0_20px_rgba(194,24,91,0.4)]"
                      }`}
                  >
                    {isActionLoading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : (
                      <>
                        {friendshipStatus === 'friends' && <><span className="group-hover:hidden flex items-center gap-2"><UserCheck size={16} /> Connected</span> <span className="hidden group-hover:flex items-center gap-2"><UserMinus size={16} /> Remove</span></>}
                        {friendshipStatus === 'pending_sent' && <><Clock size={16} /> Pending</>}
                        {friendshipStatus === 'pending_received' && <><UserPlus size={16} /> Accept</>}
                        {friendshipStatus === 'none' && <><UserPlus size={16} /> Connect</>}
                      </>
                    )}
                  </button>

                  {/* دکمه مسیج (فقط وقتی باهم فرند هستند) */}
                  {friendshipStatus === 'friends' && (
                    <Link
                      href={`/en/feed/chats/screen?userId=${targetUserId}`}
                      className="px-6 py-3.5 sm:py-4 bg-gradient-to-r from-pink-600 to-[#C2185B] text-white border border-pink-500/40 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(194,24,91,0.4)] hover:scale-105 transition-all"
                    >
                      <MessageSquare size={16} /> Message
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT SIDE: BIO & INFO */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-8">
            <div className="bg-[#0a0a0f]/80 sm:border border-white/10 p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] backdrop-blur-md sm:shadow-xl">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <UserCheck size={16} className="text-[#C2185B]" /> Biography
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap mb-6 bg-white/5 p-4 rounded-2xl">
                {profileData.bio || "No biography provided yet."}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <InfoRow icon={<Globe size={16} />} label="Location" value={profileData.country || "Global"} />
                <InfoRow icon={<Calendar size={16} />} label="Joined" value={new Date(profileData.created_at).toLocaleDateString()} />
                {streak && streak.current_streak > 0 && (
                  <InfoRow icon={<Flame size={16} />} label="Streak" value={`${streak.current_streak} Days`} />
                )}

                {(isMyProfile || isFaculty) && (
                  <>
                    <InfoRow icon={<Mail size={16} />} label="Email" value={profileData.email} isPrivate />
                    {profileData.date_of_birth && (
                      <InfoRow icon={<UserCheck size={16} />} label="Birth Date" value={new Date(profileData.date_of_birth).toLocaleDateString()} isPrivate />
                    )}
                    <InfoRow icon={<Wallet size={16} />} label="Wallet" value={`$${profileData.wallet_balance || 0}`} isPrivate />
                    {profileData.referral_code && (
                      <InfoRow icon={<Share2 size={16} />} label="Ref Code" value={profileData.referral_code} isPrivate className="col-span-2 lg:col-span-1" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TABS & CONTENT */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 pb-6">

            {/* TABS */}
            <div className="sticky top-0 sm:top-0 z-30 flex overflow-x-auto scrollbar-hide gap-2 p-1.5 bg-[#0a0a0f]/90 backdrop-blur-xl sm:border border-white/5 sm:rounded-2xl -mx-4 px-4 sm:mx-0 sm:px-1.5 shadow-md sm:shadow-none">
              {[
                { id: 'posts', label: 'Posts', icon: <MessageSquare size={16} /> },
                { id: 'reels', label: 'Reels', icon: <Video size={16} /> },
                { id: 'learning', label: 'Learning', icon: <BookOpen size={16} /> },
                { id: 'achievements', label: 'Awards', icon: <Award size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 sm:flex-none ${activeTab === tab.id
                    ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.3)] border border-[#C2185B]"
                    : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300 border border-transparent"
                    }`}
                >
                  <span className="hidden sm:inline">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <div className="animate-[fadeIn_0.3s_ease-out]">

              {/* TAB: POSTS */}
              {activeTab === 'posts' && (
                <div className="space-y-4 sm:space-y-6">
                  {posts.length === 0 ? (
                    <EmptyState icon={<FileText size={40} />} title="No Discussions" description="This user hasn't published any posts yet." />
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className="bg-[#0a0a0f]/80 sm:border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 backdrop-blur-md space-y-4 sm:space-y-5 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full sm:rounded-[1rem] bg-neutral-800 border-2 border-[#C2185B]/30 overflow-hidden flex items-center justify-center shrink-0">
                              {profileData.avatar_url ? (
                                <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[#C2185B] font-black">{profileData.first_name?.[0] || 'U'}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-black text-sm tracking-wide">{profileData.first_name} {profileData.last_name}</h4>
                              <p className="text-[10px] text-neutral-500 font-bold mt-0.5">{post.createdAt.split('T')[0]}</p>
                            </div>
                          </div>
                          {isMyProfile && (
                            <button onClick={() => deletePost(post.id)} className="text-neutral-500 hover:text-red-400 p-2 sm:p-2.5 bg-white/5 rounded-xl hover:bg-red-500/10 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="inline-block px-3 py-1 bg-[#C2185B]/10 border-l-2 border-[#C2185B] rounded-r-lg text-pink-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {post.moodTag}
                        </div>

                        {post.cleanTitle && <h3 className="text-lg sm:text-xl font-black text-white leading-tight">{post.cleanTitle}</h3>}
                        <p className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">{post.content}</p>

                        {post.imageUrl && (
                          <div className="rounded-2xl border border-white/5 bg-[#050508] mt-3 flex items-center justify-center overflow-hidden max-h-[300px] sm:max-h-[500px]">
                            <img src={post.imageUrl} alt="Post media" className="w-full h-full object-contain rounded-2xl" />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 text-[10px] sm:text-[11px] font-bold text-neutral-400">
                          {post.likesCount > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <div className="p-1 sm:p-1.5 bg-[#C2185B] rounded-full text-white shadow-[0_0_10px_rgba(194,24,91,0.5)]"><ThumbsUp size={10} className="fill-current" /></div>
                              <span className="text-white">{post.likesCount}</span>
                            </div>
                          ) : <span />}
                          {post.commentsCount > 0 && <span>{post.commentsCount} Comments</span>}
                        </div>

                        <hr className="border-white/5 my-3" />

                        <div className="flex items-center justify-between gap-2">
                          <button onClick={() => toggleLike(post)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl sm:rounded-[1rem] transition-all font-black text-xs ${post.isLikedByMe ? "text-[#C2185B] bg-[#C2185B]/10 border border-[#C2185B]/30 shadow-[0_0_15px_rgba(194,24,91,0.15)]" : "text-neutral-400 bg-white/[0.02] border border-transparent hover:bg-white/5 hover:text-white"}`}>
                            <ThumbsUp size={16} className={post.isLikedByMe ? "fill-current" : ""} />
                            <span>Like</span>
                          </button>
                          <button onClick={() => setActivePostId(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl sm:rounded-[1rem] transition-all font-black text-xs text-neutral-400 bg-white/[0.02] hover:bg-white/5 hover:text-white border border-transparent">
                            <MessageSquare size={16} />
                            <span>Comment</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB: REELS */}
              {activeTab === 'reels' && (
                <div className="space-y-4">
                  {reels.length === 0 ? (
                    <EmptyState icon={<Video size={40} />} title="No Reels Yet" description="This user hasn't published any reels yet." />
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {reels.map((reel) => (
                        <Link
                          key={reel.id}
                          href={`/en/feed/reels`}
                          className="group relative bg-neutral-900 rounded-2xl overflow-hidden aspect-[9/16] border border-white/10 hover:border-[#C2185B] transition-all shadow-lg flex items-center justify-center"
                        >
                          {reel.thumbnail_url ? (
                            <img src={reel.thumbnail_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <video src={reel.video_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                            <span className="text-[8px] font-black text-pink-300 uppercase tracking-widest bg-pink-500/20 px-2 py-0.5 rounded w-max mb-1">{reel.category}</span>
                            <h4 className="text-white font-bold text-xs line-clamp-1">{reel.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-[9px] text-neutral-300 font-bold">
                              <span>👁 {reel.views_count}</span>
                              <span>❤️ {reel.likes_count}</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <div className="w-10 h-10 rounded-full bg-[#C2185B] text-white flex items-center justify-center shadow-lg"><Play size={18} className="fill-current ml-0.5" /></div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: LEARNING */}
              {activeTab === 'learning' && (
                <div className="space-y-4">
                  {enrollments.length === 0 ? (
                    <EmptyState icon={<BookOpen size={40} />} title="No Courses Yet" description="This user hasn't enrolled in any courses." />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {enrollments.map((enr) => (
                        <div key={enr.id} className="bg-[#0a0a0f]/80 border border-white/10 p-4 sm:p-5 rounded-[1.5rem] flex items-center gap-4 hover:border-white/20 transition-all">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-neutral-900 border border-white/5 overflow-hidden shrink-0">
                            {enr.courses?.thumbnail_url ? (
                              <img src={enr.courses.thumbnail_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-600"><BookOpen size={20} /></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#C2185B] bg-[#C2185B]/10 px-2 py-1 rounded-md">{enr.courses?.category || 'Course'}</span>
                            <h4 className="text-white font-bold text-xs sm:text-sm mt-1.5 leading-tight line-clamp-2">{enr.courses?.title}</h4>
                            <div className="mt-2.5">
                              <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-neutral-400 mb-1">
                                <span>Progress</span>
                                <span>{enr.progress_percentage}%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#C2185B] h-full rounded-full shadow-[0_0_8px_#C2185B]" style={{ width: `${enr.progress_percentage}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ACHIEVEMENTS */}
              {activeTab === 'achievements' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-[#0a0a0f]/80 border border-white/10 p-5 sm:p-8 rounded-[2rem] backdrop-blur-md shadow-xl">
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2 border-b border-white/5 pb-3 sm:pb-4"><Trophy size={16} className="text-yellow-500" /> Earned Badges</h3>
                    {awards.length === 0 ? (
                      <p className="text-neutral-500 text-xs sm:text-sm font-medium text-center py-4 sm:py-6">No badges earned yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {awards.map((award) => (
                          <div key={award.id} className="bg-white/[0.02] border border-white/5 p-4 rounded-[1.5rem] flex flex-col items-center text-center relative overflow-hidden group hover:bg-white/5 hover:border-yellow-500/30 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050508] border border-white/10 flex items-center justify-center mb-3 shadow-lg z-10 group-hover:scale-110 transition-transform">
                              {award.awards?.icon_url ? <img src={award.awards.icon_url} alt="" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" /> : <Award size={20} className="text-yellow-500" />}
                            </div>
                            <h4 className="text-white font-black text-[10px] sm:text-xs z-10 line-clamp-1">{award.awards?.title}</h4>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#0a0a0f]/80 border border-white/10 p-5 sm:p-8 rounded-[2rem] backdrop-blur-md shadow-xl">
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2 border-b border-white/5 pb-3 sm:pb-4"><Award size={16} className="text-emerald-500" /> Official Certificates</h3>
                    {certificates.length === 0 ? (
                      <p className="text-neutral-500 text-xs sm:text-sm font-medium text-center py-4 sm:py-6">No certificates issued yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {certificates.map((cert) => (
                          <div key={cert.id} className="bg-gradient-to-r from-emerald-900/10 to-transparent border border-emerald-500/20 p-4 sm:p-5 rounded-[1.5rem] flex items-center justify-between group hover:border-emerald-500/50 transition-colors">
                            <div className="flex-1 pr-3">
                              <p className="text-[9px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{cert.certificate_code}</p>
                              <h4 className="text-white font-bold text-xs sm:text-sm leading-tight line-clamp-2">{cert.courses?.title}</h4>
                              <p className="text-neutral-500 text-[9px] sm:text-[10px] font-bold mt-1.5">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                            </div>
                            {cert.certificate_url && (
                              <a href={cert.certificate_url} target="_blank" rel="noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/10 text-emerald-400 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors border border-emerald-500/30 group-hover:scale-110 shrink-0">
                                <LinkIcon size={14} />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {activePostId && currentUserId && (
        <CommentsModal postId={activePostId} currentUserId={currentUserId} onClose={() => { setActivePostId(null); fetchCompleteProfile(); }} />
      )}
    </div>
  );
}

// ================= UI HELPERS =================
function InfoRow({ icon, label, value, isPrivate, isLink, className = "" }: any) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 relative group hover:bg-white/10 hover:border-white/10 transition-colors ${className}`}>
      {isPrivate && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" title="Private Field"></div>}
      <div className="text-neutral-400 group-hover:text-[#C2185B] transition-colors">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] sm:text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-[11px] sm:text-xs font-bold text-blue-400 hover:underline truncate block" title={value}>{value}</a>
        ) : (
          <p className="text-[11px] sm:text-xs font-bold text-white truncate" title={value}>{value}</p>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, description }: any) {
  return (
    <div className="text-center py-16 sm:py-20 bg-[#0a0a0f]/40 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5">
      <div className="text-neutral-700 flex justify-center mb-3 sm:mb-4 opacity-50">{icon}</div>
      <h4 className="text-white font-black text-base sm:text-lg mb-1">{title}</h4>
      <p className="text-neutral-500 font-bold text-xs sm:text-sm">{description}</p>
    </div>
  );
}

// ================= COMMENTS MODAL COMPONENT =================
function CommentsModal({ postId, currentUserId, onClose }: { postId: string, currentUserId: string, onClose: () => void }) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyingToName, setReplyingToName] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data: res } = await supabase.from("discussion_comments").select("*, profiles:student_id (first_name, last_name, avatar_url)").eq("post_id", postId).order("created_at", { ascending: true });
    if (res) setComments(res);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!newComment.trim()) return;
    setIsSending(true);
    await supabase.from("discussion_comments").insert({ post_id: postId, student_id: currentUserId, comment_text: newComment.trim(), parent_comment_id: replyingToId || null });
    setNewComment(""); setReplyingToId(null); setReplyingToName(null);
    await fetchComments();
    setIsSending(false);
  };

  const buildCommentTree = (parentId: string | null, depth: number): JSX.Element[] => {
    const children = comments.filter((c) => c.parent_comment_id === parentId);
    let elements: JSX.Element[] = [];
    children.forEach((c) => {
      const authorName = `${c.profiles?.first_name || 'User'} ${c.profiles?.last_name || ''}`.trim();
      elements.push(
        <div key={c.id} style={{ marginLeft: `${depth * 16}px` }} className="mb-4">
          <div className="flex gap-2.5 sm:gap-3 items-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full sm:rounded-xl bg-neutral-800 shrink-0 border border-[#C2185B]/20 flex items-center justify-center overflow-hidden">
              {c.profiles?.avatar_url ? <img src={c.profiles.avatar_url} className="w-full h-full object-cover" alt="" /> : <span className="text-[#C2185B] text-[10px] sm:text-xs font-black">{authorName.charAt(0)}</span>}
            </div>
            <div className="flex-1">
              <div className="bg-neutral-800/80 border border-white/5 p-3 sm:p-3.5 rounded-[1rem] sm:rounded-[1.2rem] rounded-tl-sm inline-block min-w-[180px] max-w-full shadow-md">
                <p className="text-white font-black text-[11px] sm:text-xs mb-1">{authorName}</p>
                <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed">{c.comment_text}</p>
              </div>
              <div className="flex items-center gap-3 mt-1.5 ml-2">
                <span className="text-[8px] sm:text-[9px] text-neutral-500 font-bold">{c.created_at.split('T')[0]}</span>
                <button onClick={() => { setReplyingToId(c.id); setReplyingToName(authorName); }} className="text-[9px] sm:text-[10px] font-black text-[#C2185B] hover:text-pink-400 uppercase">Reply</button>
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#0a0a0f] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] w-full max-w-2xl h-[85vh] sm:max-h-[90vh] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-[slideUp_0.3s_ease-out]">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5 bg-[#0a0a0f]/90 shrink-0">
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">Discussion</h3>
          <button onClick={onClose} className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide pb-32">
          {isLoading ? <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div></div> : comments.length === 0 ? <div className="text-center py-16"><MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-700 mx-auto mb-4" /><p className="text-neutral-500 font-bold text-xs sm:text-sm tracking-wide">No comments yet. Start the conversation!</p></div> : buildCommentTree(null, 0)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 sm:p-6 border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl">
          {replyingToName && (
            <div className="flex items-center justify-between mb-2 sm:mb-3 px-3 py-1.5 sm:py-2 bg-[#C2185B]/10 rounded-xl border border-[#C2185B]/20">
              <span className="text-[10px] sm:text-xs font-black text-[#C2185B]">Replying to {replyingToName}</span>
              <button onClick={() => { setReplyingToId(null); setReplyingToName(null); }} className="text-neutral-400 hover:text-white text-[10px] sm:text-xs font-bold bg-white/5 px-2.5 py-1 rounded-lg">Cancel</button>
            </div>
          )}
          <div className="flex items-end gap-2 sm:gap-3 pb-safe">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write your thought..." rows={1} className="flex-1 bg-neutral-900 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C2185B] focus:ring-1 focus:ring-[#C2185B] resize-none min-h-[45px] sm:min-h-[55px] max-h-[100px] sm:max-h-[120px] transition-all" />
            <button onClick={handleSend} disabled={isSending || !newComment.trim()} className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] shrink-0 bg-[#C2185B] text-white rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-[#ad1457] disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(194,24,91,0.3)]">
              {isSending ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={18} className="ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}