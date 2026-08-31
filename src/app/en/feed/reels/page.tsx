"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Volume2, VolumeX, Sparkles, X, Send } from "lucide-react";

interface ReelItem {
    id: string;
    user_id: string;
    video_url: string;
    thumbnail_url: string | null;
    title: string;
    description: string | null;
    category: string;
    views_count: number;
    likes_count: number;
    comments_count: number;
    created_at: string;
    authorName: string;
    authorAvatar: string;
    isLikedByMe: boolean;
}

interface ReelComment {
    id: string;
    reel_id: string;
    user_id: string;
    comment_text: string;
    created_at: string;
    profiles: {
        first_name: string;
        last_name: string;
        avatar_url: string;
    };
}

export default function ReelsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [reels, setReels] = useState<ReelItem[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

    // این استیت فقط برای مدال موبایل استفاده می‌شود
    const [activeReelCommentsId, setActiveReelCommentsId] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchReelsData();
    }, []);

    const fetchReelsData = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;
            setCurrentUserId(userId);

            const { data: reelsRes, error } = await supabase
                .from("reels")
                .select("*")
                .eq("is_published", true)
                .order("created_at", { ascending: false });

            if (error) throw error;

            const loadedReels: ReelItem[] = [];

            for (const item of (reelsRes || [])) {
                const rId = item.id.toString();
                const uId = item.user_id.toString();

                let authorName = "Academy Member";
                let authorAvatar = "";

                try {
                    const { data: profileRes } = await supabase
                        .from("profiles")
                        .select("first_name, last_name, avatar_url")
                        .eq("id", uId)
                        .maybeSingle();

                    if (profileRes) {
                        authorName = `${profileRes.first_name || ''} ${profileRes.last_name || ''}`.trim() || "Academy Member";
                        authorAvatar = profileRes.avatar_url || "";
                    }
                } catch (_) { }

                let isLikedByMe = false;
                try {
                    const { data: likeCheck } = await supabase
                        .from("reel_likes")
                        .select("user_id")
                        .eq("reel_id", rId)
                        .eq("user_id", userId)
                        .maybeSingle();
                    if (likeCheck) isLikedByMe = true;
                } catch (_) { }

                loadedReels.push({
                    id: rId,
                    user_id: uId,
                    video_url: item.video_url,
                    thumbnail_url: item.thumbnail_url,
                    title: item.title || "",
                    description: item.description,
                    category: item.category || "General",
                    views_count: item.views_count || 0,
                    likes_count: item.likes_count || 0,
                    comments_count: item.comments_count || 0,
                    created_at: item.created_at,
                    authorName,
                    authorAvatar,
                    isLikedByMe,
                });
            }

            setReels(loadedReels);
        } catch (e) {
            console.error("Error fetching reels:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleLike = async (reel: ReelItem) => {
        if (!currentUserId) return;

        const updated = reels.map((r) => {
            if (r.id === reel.id) {
                const liked = !r.isLikedByMe;
                return {
                    ...r,
                    isLikedByMe: liked,
                    likes_count: liked ? r.likes_count + 1 : Math.max(0, r.likes_count - 1),
                };
            }
            return r;
        });
        setReels(updated);

        try {
            if (reel.isLikedByMe) {
                await supabase.from("reel_likes").delete().eq("reel_id", reel.id).eq("user_id", currentUserId);
                await supabase.rpc('decrement_reel_likes', { reel_id_input: reel.id }).match(() => { });
            } else {
                await supabase.from("reel_likes").insert({ reel_id: reel.id, user_id: currentUserId });
                await supabase.rpc('increment_reel_likes', { reel_id_input: reel.id }).match(() => { });
            }
        } catch (e) {
            console.error("Error toggling reel like:", e);
        }
    };

    const handleVideoIntersection = (index: number) => {
        setActiveVideoIndex(index);
        videoRefs.current.forEach((vid, i) => {
            if (vid) {
                if (i === index) {
                    vid.play().catch(() => { });
                    setIsPlaying(true);
                } else {
                    vid.pause();
                    vid.currentTime = 0;
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-[#030305]">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#C2185B]">
                    <Sparkles size={32} />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">No Reels Found</h2>
                <p className="text-xs text-neutral-400 font-bold mt-1">Be the first academy member to upload a short video!</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row bg-[#030305] lg:p-4 gap-4 overflow-hidden relative">

            {/* بخش اصلی ویدیوها */}
            <div
                className="flex-1 w-full h-full relative overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black lg:rounded-[2rem] lg:border border-white/5 shadow-2xl"
                onScroll={(e) => {
                    const index = Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight);
                    if (index !== activeVideoIndex && index >= 0 && index < reels.length) {
                        handleVideoIntersection(index);
                    }
                }}
            >
                {reels.map((reel, index) => {
                    const isExpanded = expandedDescriptions[reel.id] || false;

                    return (
                        <div key={reel.id} className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-black group">

                            {/* تغییر به object-contain برای نمایش سایز واقعی ویدیو */}
                            <video
                                ref={(el) => { videoRefs.current[index] = el; }}
                                src={reel.video_url}
                                poster={reel.thumbnail_url || undefined}
                                className="w-full h-full object-contain cursor-pointer bg-black"
                                loop
                                playsInline
                                muted={isMuted}
                                onClick={() => {
                                    const vid = videoRefs.current[index];
                                    if (vid) {
                                        if (vid.paused) {
                                            vid.play();
                                            setIsPlaying(true);
                                        } else {
                                            vid.pause();
                                            setIsPlaying(false);
                                        }
                                    }
                                }}
                            />

                            {/* گرادیانت برای خوانایی متن‌ها */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none lg:rounded-[2rem]"></div>

                            <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors shadow-lg"
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>

                            <div className="absolute bottom-20 lg:bottom-8 left-5 right-20 z-20 space-y-3 pointer-events-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-neutral-900 border-[2.5px] border-[#C2185B] overflow-hidden flex items-center justify-center shrink-0 shadow-lg">
                                        {reel.authorAvatar ? (
                                            <img src={reel.authorAvatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[#C2185B] font-black text-sm">{reel.authorName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-sm tracking-wide drop-shadow-md">{reel.authorName}</h4>
                                        <span className="inline-block px-2.5 py-1 bg-[#C2185B]/30 backdrop-blur-sm border border-[#C2185B]/50 text-pink-100 text-[9px] font-black uppercase tracking-widest rounded-md mt-1 shadow-sm">
                                            {reel.category}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-black text-sm drop-shadow-md">{reel.title}</h3>
                                    {reel.description && (
                                        <div className="text-neutral-200 text-xs font-medium mt-1.5 drop-shadow-md">
                                            <p className={isExpanded ? "" : "line-clamp-2"}>{reel.description}</p>
                                            {reel.description.length > 80 && (
                                                <button
                                                    onClick={() => setExpandedDescriptions(prev => ({ ...prev, [reel.id]: !isExpanded }))}
                                                    className="text-[#C2185B] font-black text-[11px] mt-1 hover:text-pink-400 transition-colors bg-black/40 px-2 py-0.5 rounded-full"
                                                >
                                                    {isExpanded ? "Show Less" : "Read More..."}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* دکمه‌های اکشن */}
                            <div className="absolute bottom-24 lg:bottom-12 right-4 z-20 flex flex-col items-center gap-6">
                                <button onClick={() => toggleLike(reel)} className="flex flex-col items-center group/btn">
                                    <div className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all shadow-lg ${reel.isLikedByMe
                                        ? "bg-[#C2185B] border-[#C2185B] text-white shadow-[0_0_25px_rgba(194,24,91,0.7)] scale-110"
                                        : "bg-black/50 border-white/20 text-white hover:bg-black/70 hover:scale-105"
                                        }`}>
                                        <Heart size={22} fill={reel.isLikedByMe ? "currentColor" : "none"} />
                                    </div>
                                    <span className="text-[11px] font-black text-white mt-2 drop-shadow-lg">{reel.likes_count}</span>
                                </button>

                                {/* دکمه کامنت در موبایل مدال را باز می‌کند */}
                                <button
                                    onClick={() => setActiveReelCommentsId(reel.id)}
                                    className="flex flex-col items-center group/btn lg:hidden"
                                >
                                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/70 hover:scale-105 transition-all shadow-lg">
                                        <MessageCircle size={22} />
                                    </div>
                                    <span className="text-[11px] font-black text-white mt-2 drop-shadow-lg">{reel.comments_count}</span>
                                </button>

                                {/* آیکون نمایشی کامنت برای دکمه در دسکتاپ (چون در دسکتاپ پنل همیشه باز است) */}
                                <div className="hidden lg:flex flex-col items-center opacity-80">
                                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-lg">
                                        <MessageCircle size={22} />
                                    </div>
                                    <span className="text-[11px] font-black text-white mt-2 drop-shadow-lg">{reel.comments_count}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* بخش کامنت‌ها در دسکتاپ (ثابت در سمت راست) */}
            {reels.length > 0 && currentUserId && (
                <div className="hidden lg:flex w-[380px] xl:w-[420px] h-full bg-[#0a0a0f] border border-white/5 rounded-[2rem] flex-col overflow-hidden shadow-2xl shrink-0">
                    <div className="p-6 border-b border-white/5 bg-gradient-to-b from-[#12121a] to-[#0a0a0f]">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <MessageCircle size={18} className="text-[#C2185B]" /> Discussion
                        </h3>
                        <p className="text-[10px] text-neutral-400 font-bold mt-1">Comments update automatically as you scroll.</p>
                    </div>
                    <SharedCommentsView
                        reelId={reels[activeVideoIndex]?.id}
                        currentUserId={currentUserId}
                        onCommentAdded={fetchReelsData}
                    />
                </div>
            )}

            {/* مدال کامنت‌ها برای موبایل */}
            {activeReelCommentsId && currentUserId && (
                <div className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center p-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-[#0a0a0f] border-t border-white/10 rounded-t-[2.5rem] w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#0a0a0f]/90">
                            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <MessageCircle size={16} className="text-[#C2185B]" /> Comments
                            </h3>
                            <button onClick={() => setActiveReelCommentsId(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <SharedCommentsView
                            reelId={activeReelCommentsId}
                            currentUserId={currentUserId}
                            onCommentAdded={fetchReelsData}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

// =====================================================================
// COMPONENT: SHARED COMMENTS VIEW (Used in Desktop Panel & Mobile Modal)
// =====================================================================
function SharedCommentsView({ reelId, currentUserId, onCommentAdded }: { reelId: string, currentUserId: string, onCommentAdded: () => void }) {
    const [comments, setComments] = useState<ReelComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [newComment, setNewComment] = useState("");

    const supabase = createClient();

    // هر زمان که آیدی ویدیو تغییر کرد، کامنت‌های جدید را لود کن
    useEffect(() => {
        if (reelId) {
            fetchComments();
        }
    }, [reelId]);

    const fetchComments = async () => {
        setIsLoading(true);
        const { data: res } = await supabase
            .from("reel_comments")
            .select("*, profiles:user_id (first_name, last_name, avatar_url)")
            .eq("reel_id", reelId)
            .order("created_at", { ascending: true });

        if (res) setComments(res as ReelComment[]);
        setIsLoading(false);
    };

    const handleSend = async () => {
        if (!newComment.trim()) return;
        setIsSending(true);

        await supabase.from("reel_comments").insert({
            reel_id: reelId,
            user_id: currentUserId,
            comment_text: newComment.trim(),
        });

        await supabase.rpc('increment_reel_comments', { reel_id_input: reelId }).match(() => { });

        setNewComment("");
        await fetchComments();
        onCommentAdded();
        setIsSending(false);
    };

    return (
        <>
            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[#0a0a0f]">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-6 h-6 border-2 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                        <MessageCircle size={32} className="text-neutral-500 mb-3" />
                        <span className="text-neutral-300 font-bold text-xs uppercase tracking-widest">No comments yet</span>
                        <span className="text-neutral-500 text-[10px] mt-1">Be the first to share your thoughts.</span>
                    </div>
                ) : (
                    comments.map((c) => {
                        const name = `${c.profiles?.first_name || 'User'} ${c.profiles?.last_name || ''}`.trim();
                        return (
                            <div key={c.id} className="flex items-start gap-3 group">
                                <div className="w-9 h-9 rounded-[0.8rem] bg-neutral-900 overflow-hidden shrink-0 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-[#C2185B]/50 transition-colors">
                                    {c.profiles?.avatar_url ? (
                                        <img src={c.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[#C2185B] text-xs font-black">{name.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="flex-1 bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl rounded-tl-none group-hover:bg-white/[0.04] transition-colors">
                                    <h5 className="text-white font-black text-xs tracking-wide">{name}</h5>
                                    <p className="text-neutral-300 text-xs mt-1.5 leading-relaxed font-medium">{c.comment_text}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Box */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-[#0a0a0f]">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-xs font-medium focus:outline-none focus:border-[#C2185B]/70 focus:bg-white/[0.05] transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isSending || !newComment.trim()}
                        className="w-12 h-12 bg-gradient-to-br from-[#C2185B] to-pink-700 text-white rounded-2xl flex items-center justify-center hover:to-pink-600 disabled:opacity-50 transition-all shrink-0 shadow-[0_0_15px_rgba(194,24,91,0.3)] hover:shadow-[0_0_20px_rgba(194,24,91,0.5)]"
                    >
                        {isSending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={18} className="ml-1" />}
                    </button>
                </div>
            </div>
        </>
    );
}