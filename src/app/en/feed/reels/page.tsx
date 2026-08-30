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

    // مدیریت باز بودن کپشن‌های طولانی
    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
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
                <p className="text-xs text-neutral-400 font-bold mt-1">Be the first academy member to upload a short vertical video!</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black relative">

            {/* کانتینر ریلز با حذف کامل اسکرول‌بار (هیچ اسکرول زشتی دیده نمی‌شود) */}
            <div
                className="w-full max-w-md h-full bg-black relative overflow-y-scroll snap-y snap-mandatory no-scrollbar shadow-2xl"
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
                        <div key={reel.id} className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-neutral-950 overflow-hidden group">

                            {/* ویدیوی ریلز */}
                            <video
                                ref={(el) => { videoRefs.current[index] = el; }}
                                src={reel.video_url}
                                poster={reel.thumbnail_url || undefined}
                                className="w-full h-full object-cover cursor-pointer"
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

                            {/* گرادیانت تیره پایین */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none"></div>

                            {/* کنترل صدا در بالا */}
                            <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>

                            {/* اطلاعات سازنده و کپشن (با قابلیت Hide/Show مثل اینستاگرام) */}
                            <div className="absolute bottom-20 lg:bottom-6 left-5 right-20 z-20 space-y-2.5 pointer-events-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-[#C2185B] overflow-hidden flex items-center justify-center shrink-0">
                                        {reel.authorAvatar ? (
                                            <img src={reel.authorAvatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[#C2185B] font-black text-xs">{reel.authorName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-xs tracking-wide">{reel.authorName}</h4>
                                        <span className="inline-block px-2 py-0.5 bg-[#C2185B]/20 border border-[#C2185B]/40 text-pink-300 text-[8px] font-black uppercase tracking-widest rounded-md mt-0.5">
                                            {reel.category}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-black text-xs">{reel.title}</h3>
                                    {reel.description && (
                                        <div className="text-neutral-300 text-xs font-medium mt-1">
                                            <p className={isExpanded ? "" : "line-clamp-1"}>{reel.description}</p>
                                            {reel.description.length > 50 && (
                                                <button
                                                    onClick={() => setExpandedDescriptions(prev => ({ ...prev, [reel.id]: !isExpanded }))}
                                                    className="text-neutral-400 font-bold text-[10px] mt-0.5 hover:text-white transition-colors"
                                                >
                                                    {isExpanded ? "less" : "...more"}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* دکمه‌های اکشن عمودی در سمت راست (فقط لایک و کامنت) */}
                            <div className="absolute bottom-24 lg:bottom-12 right-4 z-20 flex flex-col items-center gap-6">

                                {/* دکمه لایک */}
                                <button
                                    onClick={() => toggleLike(reel)}
                                    className="flex flex-col items-center group/btn"
                                >
                                    <div className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all ${reel.isLikedByMe
                                        ? "bg-[#C2185B] border-[#C2185B] text-white shadow-[0_0_20px_rgba(194,24,91,0.6)] scale-110"
                                        : "bg-black/40 border-white/10 text-white hover:bg-black/60"
                                        }`}>
                                        <Heart size={20} fill={reel.isLikedByMe ? "currentColor" : "none"} />
                                    </div>
                                    <span className="text-[10px] font-black text-white mt-1.5 drop-shadow-md">{reel.likes_count}</span>
                                </button>

                                {/* دکمه کامنت */}
                                <button
                                    onClick={() => setActiveReelCommentsId(reel.id)}
                                    className="flex flex-col items-center group/btn"
                                >
                                    <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                                        <MessageCircle size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-white mt-1.5 drop-shadow-md">{reel.comments_count}</span>
                                </button>

                            </div>

                        </div>
                    );
                })}
            </div>

            {/* ================= MODAL: REEL COMMENTS ================= */}
            {activeReelCommentsId && currentUserId && (
                <ReelCommentsModal
                    reelId={activeReelCommentsId}
                    currentUserId={currentUserId}
                    onClose={() => {
                        setActiveReelCommentsId(null);
                        fetchReelsData();
                    }}
                />
            )}

        </div>
    );
}

// =====================================================================
// COMPONENT: REEL COMMENTS MODAL
// =====================================================================
function ReelCommentsModal({ reelId, currentUserId, onClose }: { reelId: string, currentUserId: string, onClose: () => void }) {
    const [comments, setComments] = useState<ReelComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [newComment, setNewComment] = useState("");

    const supabase = createClient();

    useEffect(() => {
        fetchComments();
    }, []);

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
        setIsSending(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 pb-[100px] sm:p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#0a0a0f] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-md max-h-[75vh] flex flex-col shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#0a0a0f]/90">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Reel Comments</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white">
                        <X size={16} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div></div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500 font-bold text-xs">No comments yet. Be the first!</div>
                    ) : (
                        comments.map((c) => {
                            const name = `${c.profiles?.first_name || 'User'} ${c.profiles?.last_name || ''}`.trim();
                            return (
                                <div key={c.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-neutral-800 overflow-hidden shrink-0 border border-white/10 flex items-center justify-center">
                                        {c.profiles?.avatar_url ? (
                                            <img src={c.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[#C2185B] text-xs font-black">{name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 bg-white/[0.03] border border-white/5 p-3 rounded-2xl">
                                        <h5 className="text-white font-black text-xs">{name}</h5>
                                        <p className="text-neutral-300 text-xs mt-1 leading-relaxed">{c.comment_text}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-[#0a0a0f]">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#C2185B]"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isSending || !newComment.trim()}
                            className="w-11 h-11 bg-[#C2185B] text-white rounded-2xl flex items-center justify-center hover:bg-pink-700 disabled:opacity-50 transition-all shrink-0"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}