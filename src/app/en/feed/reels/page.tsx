"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Heart,
    MessageCircle,
    Volume2,
    VolumeX,
    Sparkles,
    X,
    Send,
    Share2,
    Download,
    Check,
    Users,
    Compass,
    Search,
    Smartphone,
    ExternalLink,
    Play,
    Loader2
} from "lucide-react";
import Link from "next/link";

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

interface FriendItem {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
}

function ReelsContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [reels, setReels] = useState<ReelItem[]>([]);
    const [activeTab, setActiveTab] = useState<'for_you' | 'friends'>('for_you');
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});

    // Mobile comments modal
    const [activeReelCommentsId, setActiveReelCommentsId] = useState<string | null>(null);

    // Share modal state
    const [shareReel, setShareReel] = useState<ReelItem | null>(null);
    const [friends, setFriends] = useState<FriendItem[]>([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);
    const [friendSearch, setFriendSearch] = useState("");
    const [sentFriendIds, setSentFriendIds] = useState<{ [key: string]: boolean }>({});

    // Toast notification state
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Double-tap heart animation state
    const [heartAnimations, setHeartAnimations] = useState<{ [key: string]: boolean }>({});
    const lastTapTimeRef = useRef<{ [key: string]: number }>({});

    // Viewed reels tracker in session
    const viewedReelsRef = useRef<Set<string>>(new Set());

    // Download loading state
    const [downloadingReelId, setDownloadingReelId] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const targetReelId = searchParams.get("id");
    const supabase = createClient();

    const showToast = useCallback((msg: string) => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToastMessage(msg);
        toastTimeoutRef.current = setTimeout(() => {
            setToastMessage(null);
        }, 2000);
    }, []);

    // Initial load
    useEffect(() => {
        fetchReelsData(activeTab);
    }, [activeTab]);

    // Fetch reels based on tab (For You / Friends)
    const fetchReelsData = async (tab: 'for_you' | 'friends') => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;
            setCurrentUserId(userId);

            let loadedReels: ReelItem[] = [];

            if (tab === 'friends') {
                // 1. Get accepted friends
                const { data: friendships } = await supabase
                    .from("student_friends")
                    .select("sender_id, receiver_id")
                    .eq("status", "accepted")
                    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

                const friendIds = (friendships || []).map(f => f.sender_id === userId ? f.receiver_id : f.sender_id);

                if (friendIds.length === 0) {
                    setReels([]);
                    setIsLoading(false);
                    return;
                }

                // 2. Fetch reels posted by friends
                const { data: reelsRes, error } = await supabase
                    .from("reels")
                    .select("*")
                    .eq("is_published", true)
                    .in("user_id", friendIds)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                loadedReels = await processReelsList(reelsRes || [], userId);
            } else {
                // For You tab: Explore algorithm
                const { data: reelsRes, error } = await supabase
                    .from("reels")
                    .select("*")
                    .eq("is_published", true);

                if (error) throw error;

                // Rank reels using explore algorithm (likes, comments, views + engagement jitter)
                const scoredReels = (reelsRes || []).map(item => {
                    const views = item.views_count || 0;
                    const likes = item.likes_count || 0;
                    const comments = item.comments_count || 0;
                    // Explore engagement weight + random factor for discovery
                    const score = (likes * 3) + (comments * 5) + (views * 1) + (Math.random() * 10);
                    return { item, score };
                });

                // Sort by explore score descending
                scoredReels.sort((a, b) => b.score - a.score);
                const sortedRaw = scoredReels.map(s => s.item);

                loadedReels = await processReelsList(sortedRaw, userId);
            }

            // If a specific reel ID was passed in URL query, bring it to the front
            if (targetReelId) {
                const targetIdx = loadedReels.findIndex(r => r.id === targetReelId);
                if (targetIdx > 0) {
                    const [targetItem] = loadedReels.splice(targetIdx, 1);
                    loadedReels.unshift(targetItem);
                }
            }

            setReels(loadedReels);
            setActiveVideoIndex(0);
        } catch (e) {
            console.error("Error fetching reels:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper: Batch load profiles & likes
    const processReelsList = async (rawReels: any[], userId: string): Promise<ReelItem[]> => {
        if (rawReels.length === 0) return [];

        const userIds = Array.from(new Set(rawReels.map(r => r.user_id)));
        const reelIds = rawReels.map(r => r.id.toString());

        // Batch 1: Profiles
        const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, avatar_url")
            .in("id", userIds);

        const profileMap = new Map<string, { name: string; avatar: string }>();
        profiles?.forEach(p => {
            const name = `${p.first_name || ''} ${p.last_name || ''}`.trim() || "Academy Member";
            profileMap.set(p.id, { name, avatar: p.avatar_url || "" });
        });

        // Batch 2: Likes
        const { data: myLikes } = await supabase
            .from("reel_likes")
            .select("reel_id")
            .eq("user_id", userId)
            .in("reel_id", reelIds);

        const likedReelIds = new Set((myLikes || []).map(l => l.reel_id?.toString()));

        return rawReels.map(item => {
            const rId = item.id.toString();
            const uId = item.user_id.toString();
            const prof = profileMap.get(uId) || { name: "Academy Member", avatar: "" };

            return {
                id: rId,
                user_id: uId,
                video_url: item.video_url,
                thumbnail_url: item.thumbnail_url,
                title: item.title || "",
                description: item.description,
                category: item.category || "Explore",
                views_count: item.views_count || 0,
                likes_count: item.likes_count || 0,
                comments_count: item.comments_count || 0,
                created_at: item.created_at,
                authorName: prof.name,
                authorAvatar: prof.avatar,
                isLikedByMe: likedReelIds.has(rId),
            };
        });
    };

    // Toggle Like Handler (persists in reel_likes table and updates reels count)
    const toggleLike = async (reel: ReelItem) => {
        if (!currentUserId) return;

        const willBeLiked = !reel.isLikedByMe;
        const newLikesCount = willBeLiked ? reel.likes_count + 1 : Math.max(0, reel.likes_count - 1);

        // Optimistic UI Update
        setReels(prev => prev.map(r => {
            if (r.id === reel.id) {
                return {
                    ...r,
                    isLikedByMe: willBeLiked,
                    likes_count: newLikesCount,
                };
            }
            return r;
        }));

        try {
            if (willBeLiked) {
                // Insert into reel_likes table
                const { error: insErr } = await supabase
                    .from("reel_likes")
                    .insert({ reel_id: reel.id, user_id: currentUserId });

                if (insErr) console.error("Error adding reel like:", insErr);

                // Update reels count
                await supabase
                    .from("reels")
                    .update({ likes_count: newLikesCount })
                    .eq("id", reel.id);

                try {
                    await supabase.rpc('increment_reel_likes', { reel_id_input: reel.id });
                } catch (_) { }
            } else {
                // Delete from reel_likes table
                const { error: delErr } = await supabase
                    .from("reel_likes")
                    .delete()
                    .eq("reel_id", reel.id)
                    .eq("user_id", currentUserId);

                if (delErr) console.error("Error removing reel like:", delErr);

                // Update reels count
                await supabase
                    .from("reels")
                    .update({ likes_count: newLikesCount })
                    .eq("id", reel.id);

                try {
                    await supabase.rpc('decrement_reel_likes', { reel_id_input: reel.id });
                } catch (_) { }
            }
        } catch (e) {
            console.error("Error toggling reel like:", e);
        }
    };

    // Double-tap on video to like with Instagram heart animation
    const handleVideoTap = (reel: ReelItem, index: number) => {
        const now = Date.now();
        const lastTap = lastTapTimeRef.current[reel.id] || 0;

        if (now - lastTap < 300) {
            // Double Tap Detected!
            // Trigger heart animation
            setHeartAnimations(prev => ({ ...prev, [reel.id]: true }));
            setTimeout(() => {
                setHeartAnimations(prev => ({ ...prev, [reel.id]: false }));
            }, 800);

            // If not liked yet, like it
            if (!reel.isLikedByMe) {
                toggleLike(reel);
            }
            lastTapTimeRef.current[reel.id] = 0;
        } else {
            // Single tap: toggle play/pause
            lastTapTimeRef.current[reel.id] = now;
            setTimeout(() => {
                if (lastTapTimeRef.current[reel.id] === now) {
                    const vid = videoRefs.current[index];
                    if (vid) {
                        if (vid.paused) {
                            vid.play().catch(() => { });
                            setIsPlaying(true);
                        } else {
                            vid.pause();
                            setIsPlaying(false);
                        }
                    }
                }
            }, 300);
        }
    };

    // Video intersection and view logging
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

        // Log view to reel_views table if not viewed in this session
        const currentReel = reels[index];
        if (currentReel && currentUserId && !viewedReelsRef.current.has(currentReel.id)) {
            viewedReelsRef.current.add(currentReel.id);
            logReelView(currentReel.id, currentUserId);
        }
    };

    const logReelView = async (reelId: string, userId: string) => {
        try {
            await supabase.from("reel_views").insert({
                reel_id: reelId,
                viewer_id: userId,
                viewed_at: new Date().toISOString()
            });

            // Update views_count in reels table
            const current = reels.find(r => r.id === reelId);
            const newCount = (current?.views_count || 0) + 1;
            await supabase.from("reels").update({ views_count: newCount }).eq("id", reelId);
        } catch (e) {
            console.error("Error logging reel view:", e);
        }
    };

    // Open Share Modal & fetch user's friends
    const handleOpenShare = async (reel: ReelItem) => {
        setShareReel(reel);
        setIsLoadingFriends(true);
        try {
            if (!currentUserId) return;
            const { data: friendships } = await supabase
                .from("student_friends")
                .select("sender_id, receiver_id")
                .eq("status", "accepted")
                .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

            const friendIds = (friendships || []).map(f => f.sender_id === currentUserId ? f.receiver_id : f.sender_id);

            if (friendIds.length > 0) {
                const { data: profiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .in("id", friendIds);

                const formatted: FriendItem[] = (profiles || []).map(p => ({
                    id: p.id,
                    first_name: p.first_name || "Academy",
                    last_name: p.last_name || "Member",
                    avatar_url: p.avatar_url || ""
                }));
                setFriends(formatted);
            } else {
                setFriends([]);
            }
        } catch (e) {
            console.error("Error fetching friends for share:", e);
        } finally {
            setIsLoadingFriends(false);
        }
    };

    // Copy Reel Link
    const handleCopyLink = (reelId: string) => {
        const link = `https://www.safiacademy.org/en/feed/reels?id=${reelId}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(link);
            showToast("Link copied to clipboard");
        } else {
            const input = document.createElement("input");
            input.value = link;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            showToast("Link copied to clipboard");
        }
    };

    // Send Reel to a Friend in Direct Messages
    const handleSendToFriend = async (friend: FriendItem) => {
        if (!shareReel || !currentUserId) return;

        const friendKey = `${shareReel.id}_${friend.id}`;
        try {
            const { error } = await supabase.from("direct_messages").insert({
                sender_id: currentUserId,
                receiver_id: friend.id,
                message_text: `Check out this reel: ${shareReel.title}`,
                attachment_url: shareReel.video_url,
                attachment_type: 'reel',
                is_delivered: true,
                is_read: false,
            });

            if (error) throw error;

            setSentFriendIds(prev => ({ ...prev, [friendKey]: true }));
            showToast(`Reel sent to ${friend.first_name}`);
        } catch (e) {
            console.error("Error sending reel to friend:", e);
            showToast("Failed to send reel");
        }
    };

    // Download Video Handler
    const handleDownloadVideo = async (reel: ReelItem) => {
        if (downloadingReelId) return;
        setDownloadingReelId(reel.id);
        showToast("Downloading video...");

        try {
            const safeName = (reel.title || "safi-reel").replace(/[^a-zA-Z0-9_-]/g, "_");
            const downloadApiUrl = `/api/download-video?url=${encodeURIComponent(reel.video_url)}&filename=${encodeURIComponent(safeName)}.mp4`;

            const res = await fetch(downloadApiUrl);
            if (!res.ok) throw new Error("Download request failed");

            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = blobUrl;
            a.download = `${safeName}.mp4`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);

            showToast("Video saved successfully");
        } catch (e) {
            console.error("Download error:", e);
            // Fallback direct window open
            window.open(reel.video_url, "_blank");
            showToast("Video saved successfully");
        } finally {
            setDownloadingReelId(null);
        }
    };

    // Filtered friends for share search
    const filteredFriends = friends.filter(f =>
        `${f.first_name} ${f.last_name}`.toLowerCase().includes(friendSearch.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading Explore Reels...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row bg-[#030305] lg:p-4 gap-4 overflow-hidden relative font-sans select-none">

            {/* Floating Toast Notification */}
            {toastMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-[#0a0a0f]/95 border border-[#C2185B]/40 px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(194,24,91,0.3)] backdrop-blur-xl flex items-center gap-3 animate-[fadeIn_0.2s_ease-out]">
                    <div className="w-6 h-6 rounded-full bg-[#C2185B] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Check size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">{toastMessage}</span>
                </div>
            )}

            {/* ================= BROWSER DEEP LINK / APP PROMPT BANNER (Mobile Web Only) ================= */}
            <div className="lg:hidden absolute top-3 left-4 right-4 z-40 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#C2185B] to-yellow-500 flex items-center justify-center text-black font-black text-xs shadow-md">
                        SA
                    </div>
                    <div>
                        <p className="text-white font-black text-[11px] leading-tight">Safi Academy</p>
                        <p className="text-neutral-400 text-[9px] font-medium">Watch in Mobile App</p>
                    </div>
                </div>
                <a
                    href="https://play.google.com/store/apps/details?id=org.safiacademy.app"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#C2185B] hover:bg-[#ad1450] text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-[0_0_10px_rgba(194,24,91,0.4)] transition-all flex items-center gap-1"
                >
                    <Smartphone size={12} /> Open App
                </a>
            </div>

            {/* ================= MAIN REELS CONTAINER ================= */}
            <div
                ref={containerRef}
                className="flex-1 w-full h-full relative overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black lg:rounded-[2rem] lg:border border-white/5 shadow-2xl"
                onScroll={(e) => {
                    const clientH = e.currentTarget.clientHeight;
                    if (clientH > 0) {
                        const index = Math.round(e.currentTarget.scrollTop / clientH);
                        if (index !== activeVideoIndex && index >= 0 && index < reels.length) {
                            handleVideoIntersection(index);
                        }
                    }
                }}
            >

                {/* Top Floating Feed Switcher Tabs: [ For You | Friends ] */}
                <div className="absolute top-14 lg:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center bg-black/50 backdrop-blur-xl border border-white/15 p-1 rounded-2xl shadow-2xl">
                    <button
                        onClick={() => setActiveTab('for_you')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'for_you'
                            ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.5)] scale-105"
                            : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        <Compass size={14} /> For You
                    </button>
                    <button
                        onClick={() => setActiveTab('friends')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'friends'
                            ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.5)] scale-105"
                            : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        <Users size={14} /> Friends
                    </button>
                </div>

                {/* Empty State when no reels in selected tab */}
                {reels.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-[#030305]">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#C2185B] shadow-2xl">
                            {activeTab === 'friends' ? <Users size={32} /> : <Sparkles size={32} />}
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                            {activeTab === 'friends' ? "No Friends Reels Yet" : "No Reels Found"}
                        </h2>
                        <p className="text-xs text-neutral-400 font-medium max-w-sm mt-2 leading-relaxed">
                            {activeTab === 'friends'
                                ? "Connect with fellow academy members in Network to see their private and shared reels here!"
                                : "Be the first member to upload an engaging vertical reel!"
                            }
                        </p>
                        {activeTab === 'friends' ? (
                            <div className="flex items-center gap-3 mt-6">
                                <button
                                    onClick={() => setActiveTab('for_you')}
                                    className="px-5 py-3 bg-[#C2185B] text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(194,24,91,0.4)]"
                                >
                                    Explore For You
                                </button>
                                <Link
                                    href="/en/feed/network"
                                    className="px-5 py-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Find Friends
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/en/feed/create/reels"
                                className="mt-6 px-6 py-3.5 bg-gradient-to-r from-[#C2185B] to-yellow-500 text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(194,24,91,0.4)]"
                            >
                                + Create First Reel
                            </Link>
                        )}
                    </div>
                ) : (
                    reels.map((reel, index) => {
                        const isExpanded = expandedDescriptions[reel.id] || false;
                        const isHeartPopping = heartAnimations[reel.id] || false;
                        const isDownloadingThis = downloadingReelId === reel.id;

                        return (
                            <div
                                key={reel.id}
                                className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-black group overflow-hidden"
                            >
                                {/* Video Element */}
                                <video
                                    ref={(el) => { videoRefs.current[index] = el; }}
                                    src={reel.video_url}
                                    poster={reel.thumbnail_url || undefined}
                                    className="w-full h-full object-contain cursor-pointer bg-black"
                                    loop
                                    playsInline
                                    muted={isMuted}
                                    onClick={() => handleVideoTap(reel, index)}
                                />

                                {/* Double-Tap Floating Heart Animation (Instagram Style) */}
                                {isHeartPopping && (
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                                        <div className="animate-[ping_0.6s_ease-out] text-[#C2185B] drop-shadow-[0_0_35px_rgba(194,24,91,0.9)]">
                                            <Heart size={110} fill="#C2185B" className="stroke-[#ffffff] stroke-[1.5]" />
                                        </div>
                                    </div>
                                )}

                                {/* Gradient Overlays for Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-transparent pointer-events-none lg:rounded-[2rem]"></div>
                                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

                                {/* Top Right Mute/Unmute Button */}
                                <div className="absolute top-16 lg:top-6 right-5 z-20 flex items-center gap-3">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-all shadow-lg"
                                        title={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                    </button>
                                </div>

                                {/* Reel Info: Author, Title, Category & Description */}
                                <div className="absolute bottom-20 lg:bottom-8 left-5 right-20 z-20 space-y-3 pointer-events-auto">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/en/feed/profile/${reel.user_id}`}
                                            className="w-12 h-12 rounded-2xl bg-neutral-900 border-[2.5px] border-[#C2185B] overflow-hidden flex items-center justify-center shrink-0 shadow-lg hover:scale-105 transition-transform"
                                        >
                                            {reel.authorAvatar ? (
                                                <img src={reel.authorAvatar} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[#C2185B] font-black text-sm">{reel.authorName.charAt(0)}</span>
                                            )}
                                        </Link>
                                        <div>
                                            <Link
                                                href={`/en/feed/profile/${reel.user_id}`}
                                                className="text-white font-black text-sm tracking-wide drop-shadow-md hover:underline block"
                                            >
                                                {reel.authorName}
                                            </Link>
                                            <span className="inline-block px-2.5 py-0.5 bg-[#C2185B]/30 backdrop-blur-sm border border-[#C2185B]/50 text-pink-100 text-[9px] font-black uppercase tracking-widest rounded-md mt-1 shadow-sm">
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

                                {/* ================= RIGHT FLOATING ACTION BAR ================= */}
                                <div className="absolute bottom-24 lg:bottom-12 right-4 z-20 flex flex-col items-center gap-5">

                                    {/* Like Button */}
                                    <button
                                        onClick={() => toggleLike(reel)}
                                        className="flex flex-col items-center group/btn"
                                        title={reel.isLikedByMe ? "Unlike" : "Like"}
                                    >
                                        <div className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all shadow-lg ${reel.isLikedByMe
                                            ? "bg-[#C2185B] border-[#C2185B] text-white shadow-[0_0_25px_rgba(194,24,91,0.7)] scale-110"
                                            : "bg-black/50 border-white/20 text-white hover:bg-black/70 hover:scale-105"
                                            }`}>
                                            <Heart size={22} fill={reel.isLikedByMe ? "currentColor" : "none"} />
                                        </div>
                                        <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">{reel.likes_count}</span>
                                    </button>

                                    {/* Comment Button (Opens modal on mobile, focuses desktop panel) */}
                                    <button
                                        onClick={() => setActiveReelCommentsId(reel.id)}
                                        className="flex flex-col items-center group/btn lg:hidden"
                                        title="Comments"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/70 hover:scale-105 transition-all shadow-lg">
                                            <MessageCircle size={22} />
                                        </div>
                                        <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">{reel.comments_count}</span>
                                    </button>

                                    {/* Desktop Comment Count Indicator */}
                                    <div className="hidden lg:flex flex-col items-center opacity-85">
                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-lg">
                                            <MessageCircle size={22} />
                                        </div>
                                        <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">{reel.comments_count}</span>
                                    </div>

                                    {/* Share Button */}
                                    <button
                                        onClick={() => handleOpenShare(reel)}
                                        className="flex flex-col items-center group/btn"
                                        title="Share Reel"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#C2185B] hover:border-[#C2185B] hover:scale-105 transition-all shadow-lg">
                                            <Share2 size={20} />
                                        </div>
                                        <span className="text-[10px] font-black text-white mt-1.5 uppercase tracking-wider drop-shadow-lg">Share</span>
                                    </button>

                                    {/* Download Button (TikTok/Instagram Style) */}
                                    <button
                                        onClick={() => handleDownloadVideo(reel)}
                                        disabled={isDownloadingThis}
                                        className="flex flex-col items-center group/btn"
                                        title="Download Video"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 hover:scale-105 transition-all shadow-lg disabled:opacity-50">
                                            {isDownloadingThis ? (
                                                <Loader2 size={20} className="animate-spin text-white" />
                                            ) : (
                                                <Download size={20} />
                                            )}
                                        </div>
                                        <span className="text-[10px] font-black text-white mt-1.5 uppercase tracking-wider drop-shadow-lg">Save</span>
                                    </button>

                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ================= DESKTOP COMMENTS SIDE PANEL ================= */}
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
                        onCommentAdded={() => {
                            // Update comments count on active reel locally
                            setReels(prev => prev.map((r, idx) => {
                                if (idx === activeVideoIndex) {
                                    return { ...r, comments_count: r.comments_count + 1 };
                                }
                                return r;
                            }));
                        }}
                    />
                </div>
            )}

            {/* ================= MOBILE COMMENTS MODAL ================= */}
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
                            onCommentAdded={() => {
                                setReels(prev => prev.map(r => {
                                    if (r.id === activeReelCommentsId) {
                                        return { ...r, comments_count: r.comments_count + 1 };
                                    }
                                    return r;
                                }));
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ================= SHARE MODAL (Friends & Copy Link) ================= */}
            {shareReel && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">

                        {/* Modal Header */}
                        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#C2185B]/20 text-[#C2185B] flex items-center justify-center">
                                    <Share2 size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Share Reel</h3>
                                    <p className="text-[10px] text-neutral-400 font-bold truncate max-w-[220px]">{shareReel.title}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShareReel(null)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Quick Copy Link Bar */}
                        <div className="p-4 border-b border-white/5 bg-black/40">
                            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 p-2 rounded-2xl">
                                <input
                                    type="text"
                                    readOnly
                                    value={`https://www.safiacademy.org/en/feed/reels?id=${shareReel.id}`}
                                    className="flex-1 bg-transparent px-3 text-xs text-neutral-300 outline-none truncate font-mono select-all"
                                />
                                <button
                                    onClick={() => handleCopyLink(shareReel.id)}
                                    className="px-4 py-2 bg-[#C2185B] hover:bg-pink-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_12px_rgba(194,24,91,0.4)] shrink-0 flex items-center gap-1.5"
                                >
                                    Copy Link
                                </button>
                            </div>

                            {/* Open in Safi Academy App / Play Store */}
                            <div className="mt-3 flex items-center justify-between px-2 py-1.5 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-xl border border-white/5">
                                <span className="text-[10px] font-bold text-neutral-300">Open in Safi Academy App</span>
                                <a
                                    href={`intent://feed/reels?id=${shareReel.id}#Intent;scheme=safiacademy;package=org.safiacademy.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dorg.safiacademy.app;end`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] font-black uppercase text-[#C2185B] hover:underline flex items-center gap-1"
                                >
                                    <ExternalLink size={12} /> Launch App
                                </a>
                            </div>
                        </div>

                        {/* Send Directly to Friends */}
                        <div className="p-4 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                                    <Users size={14} className="text-[#C2185B]" /> Send to Friends
                                </h4>
                                <span className="text-[10px] text-neutral-500 font-bold">{filteredFriends.length} Friends</span>
                            </div>

                            {/* Search Friends */}
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder="Search friends..."
                                    value={friendSearch}
                                    onChange={(e) => setFriendSearch(e.target.value)}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 pl-9 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#C2185B]"
                                />
                                <Search className="absolute left-3 top-[10px] w-3.5 h-3.5 text-neutral-500" />
                            </div>

                            {/* Friends List */}
                            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar max-h-60">
                                {isLoadingFriends ? (
                                    <div className="flex justify-center py-8">
                                        <div className="w-5 h-5 border-2 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : filteredFriends.length === 0 ? (
                                    <div className="text-center py-8 opacity-60">
                                        <p className="text-neutral-400 text-xs font-bold">No friends found</p>
                                        <Link href="/en/feed/network" className="text-[10px] text-[#C2185B] font-bold mt-1 block hover:underline">
                                            Find new friends in Network
                                        </Link>
                                    </div>
                                ) : (
                                    filteredFriends.map((friend) => {
                                        const friendKey = `${shareReel.id}_${friend.id}`;
                                        const isSent = sentFriendIds[friendKey] || false;

                                        return (
                                            <div
                                                key={friend.id}
                                                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                                        {friend.avatar_url ? (
                                                            <img src={friend.avatar_url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-[#C2185B] font-black text-xs">{friend.first_name.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-white font-black text-xs tracking-wide">{friend.first_name} {friend.last_name}</h5>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleSendToFriend(friend)}
                                                    disabled={isSent}
                                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 ${isSent
                                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                                        : "bg-[#C2185B] text-white hover:bg-pink-600 shadow-[0_0_10px_rgba(194,24,91,0.3)]"
                                                        }`}
                                                >
                                                    {isSent ? (
                                                        <>
                                                            <Check size={12} /> Sent
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={12} /> Send
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

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

    useEffect(() => {
        if (reelId) {
            fetchComments();
        }
    }, [reelId]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const { data: res } = await supabase
                .from("reel_comments")
                .select("*, profiles:user_id (first_name, last_name, avatar_url)")
                .eq("reel_id", reelId)
                .order("created_at", { ascending: true });

            if (res) setComments(res as ReelComment[]);
        } catch (e) {
            console.error("Error fetching comments:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!newComment.trim() || !currentUserId || !reelId) return;
        setIsSending(true);

        try {
            // 1. Insert into reel_comments table
            const { error: insertErr } = await supabase.from("reel_comments").insert({
                reel_id: reelId,
                user_id: currentUserId,
                comment_text: newComment.trim(),
            });

            if (insertErr) throw insertErr;

            // 2. Update comments_count in reels table
            const { count } = await supabase
                .from("reel_comments")
                .select("id", { count: "exact", head: true })
                .eq("reel_id", reelId);

            if (count !== null) {
                await supabase.from("reels").update({ comments_count: count }).eq("id", reelId);
            }

            try {
                await supabase.rpc('increment_reel_comments', { reel_id_input: reelId });
            } catch (_) { }

            setNewComment("");
            await fetchComments();
            onCommentAdded();
        } catch (e) {
            console.error("Error submitting comment:", e);
        } finally {
            setIsSending(false);
        }
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
                        const name = `${c.profiles?.first_name || 'Academy'} ${c.profiles?.last_name || 'Member'}`.trim();
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

export default function ReelsPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ReelsContent />
        </Suspense>
    );
}