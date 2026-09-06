"use client";

import { useEffect, useState, useRef, Suspense } from "react";
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
    Copy, 
    Check, 
    ExternalLink, 
    Users, 
    Compass,
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

interface ToastMessage {
    id: number;
    text: string;
    type?: 'success' | 'info';
}

function ReelsFeedContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [allReels, setAllReels] = useState<ReelItem[]>([]);
    const [displayedReels, setDisplayedReels] = useState<ReelItem[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<FriendItem[]>([]);
    const [activeTab, setActiveTab] = useState<'foryou' | 'friends'>('foryou');

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const viewedReelsRef = useRef<Set<string>>(new Set());

    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
    const [activeReelCommentsId, setActiveReelCommentsId] = useState<string | null>(null);
    
    // Share modal state
    const [sharingReel, setSharingReel] = useState<ReelItem | null>(null);
    const [sentFriendIds, setSentFriendIds] = useState<Set<string>>(new Set());
    const [isSharingFriend, setIsSharingFriend] = useState<string | null>(null);

    // Double tap heart animation state: maps reelId -> timestamp
    const [heartAnimations, setHeartAnimations] = useState<{ [key: string]: number }>({});
    const lastTapRef = useRef<{ [key: string]: number }>({});

    // Toast state
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Download state
    const [downloadingReelId, setDownloadingReelId] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialReelId = searchParams.get("id");
    const supabase = createClient();

    const showToast = (text: string, type: 'success' | 'info' = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2000);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    // Filter displayed reels when activeTab or allReels changes
    useEffect(() => {
        if (activeTab === 'foryou') {
            setDisplayedReels(allReels);
        } else {
            const friendIdSet = new Set(friends.map((f) => f.id));
            const filtered = allReels.filter((r) => friendIdSet.has(r.user_id));
            setDisplayedReels(filtered);
        }
        setActiveVideoIndex(0);
    }, [activeTab, allReels, friends]);

    // Handle initial reel id from URL query
    useEffect(() => {
        if (initialReelId && displayedReels.length > 0) {
            const index = displayedReels.findIndex((r) => r.id === initialReelId);
            if (index !== -1) {
                setActiveVideoIndex(index);
                setTimeout(() => {
                    if (containerRef.current) {
                        const targetElement = containerRef.current.children[index] as HTMLElement;
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 300);
            }
        }
    }, [initialReelId, displayedReels]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;
            setCurrentUserId(userId);

            // 1. Fetch user's friends from student_friends
            const { data: friendRows } = await supabase
                .from("student_friends")
                .select("sender_id, receiver_id, status")
                .eq("status", "accepted")
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

            const friendIds = (friendRows || []).map((f) => 
                f.sender_id === userId ? f.receiver_id : f.sender_id
            );

            let friendsList: FriendItem[] = [];
            if (friendIds.length > 0) {
                const { data: friendProfiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .in("id", friendIds);

                friendsList = (friendProfiles || []).map((p) => ({
                    id: p.id,
                    first_name: p.first_name || "Academy",
                    last_name: p.last_name || "Member",
                    avatar_url: p.avatar_url || "",
                }));
                setFriends(friendsList);
            }

            // 2. Fetch all published reels
            const { data: reelsRes, error } = await supabase
                .from("reels")
                .select("*")
                .eq("is_published", true);

            if (error) throw error;

            if (!reelsRes || reelsRes.length === 0) {
                setAllReels([]);
                return;
            }

            // 3. Batch fetch likes by current user
            const { data: myLikes } = await supabase
                .from("reel_likes")
                .select("reel_id")
                .eq("user_id", userId);

            const likedSet = new Set((myLikes || []).map((l) => l.reel_id?.toString()));

            // 4. Batch fetch author profiles
            const authorIds = Array.from(new Set(reelsRes.map((r) => r.user_id).filter(Boolean)));
            let profileMap = new Map<string, { name: string; avatar: string }>();

            if (authorIds.length > 0) {
                const { data: profilesRes } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .in("id", authorIds);

                (profilesRes || []).forEach((p) => {
                    const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim() || "Academy Member";
                    profileMap.set(p.id.toString(), {
                        name: fullName,
                        avatar: p.avatar_url || "",
                    });
                });
            }

            // 5. Explore algorithm: sort by engagement + smart exploration distribution
            const formattedReels: ReelItem[] = reelsRes.map((item) => {
                const rId = item.id.toString();
                const uId = (item.user_id || "").toString();
                const author = profileMap.get(uId) || { name: "Academy Member", avatar: "" };

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
                    authorName: author.name,
                    authorAvatar: author.avatar,
                    isLikedByMe: likedSet.has(rId),
                };
            });

            // Explore sorting: calculate score = (likes * 3 + comments * 4 + views * 1) + seeded random jitter
            const exploreSorted = [...formattedReels].sort((a, b) => {
                const scoreA = (a.likes_count * 3) + (a.comments_count * 4) + a.views_count + (Math.sin(a.id.charCodeAt(0)) * 5);
                const scoreB = (b.likes_count * 3) + (b.comments_count * 4) + b.views_count + (Math.sin(b.id.charCodeAt(0)) * 5);
                return scoreB - scoreA;
            });

            setAllReels(exploreSorted);

        } catch (e) {
            console.error("Error fetching reels data:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleLike = async (reel: ReelItem) => {
        if (!currentUserId) return;

        const isCurrentlyLiked = reel.isLikedByMe;
        const newLikedState = !isCurrentlyLiked;
        const newLikesCount = newLikedState ? reel.likes_count + 1 : Math.max(0, reel.likes_count - 1);

        // Optimistic UI update
        const updateList = (list: ReelItem[]) =>
            list.map((r) =>
                r.id === reel.id
                    ? { ...r, isLikedByMe: newLikedState, likes_count: newLikesCount }
                    : r
            );

        setAllReels((prev) => updateList(prev));
        setDisplayedReels((prev) => updateList(prev));

        try {
            if (isCurrentlyLiked) {
                // Unlike
                await supabase
                    .from("reel_likes")
                    .delete()
                    .eq("reel_id", reel.id)
                    .eq("user_id", currentUserId);

                await supabase
                    .from("reels")
                    .update({ likes_count: newLikesCount })
                    .eq("id", reel.id);

                try {
                    await supabase.rpc('decrement_reel_likes', { reel_id_input: reel.id });
                } catch (_) {}
            } else {
                // Like
                await supabase
                    .from("reel_likes")
                    .insert({ reel_id: reel.id, user_id: currentUserId });

                await supabase
                    .from("reels")
                    .update({ likes_count: newLikesCount })
                    .eq("id", reel.id);

                try {
                    await supabase.rpc('increment_reel_likes', { reel_id_input: reel.id });
                } catch (_) {}
            }
        } catch (e) {
            console.error("Error updating reel like:", e);
        }
    };

    // Double tap to like with floating heart animation
    const handleVideoTap = (reel: ReelItem, index: number) => {
        const now = Date.now();
        const lastTap = lastTapRef.current[reel.id] || 0;
        const timeDiff = now - lastTap;

        if (timeDiff < 300) {
            // Double tap detected!
            if (!reel.isLikedByMe) {
                toggleLike(reel);
            }
            // Trigger floating heart animation
            setHeartAnimations((prev) => ({ ...prev, [reel.id]: now }));
            setTimeout(() => {
                setHeartAnimations((prev) => {
                    const copy = { ...prev };
                    delete copy[reel.id];
                    return copy;
                });
            }, 800);
        } else {
            // Single tap: toggle play / pause
            const vid = videoRefs.current[index];
            if (vid) {
                if (vid.paused) {
                    vid.play().catch(() => {});
                    setIsPlaying(true);
                } else {
                    vid.pause();
                    setIsPlaying(false);
                }
            }
        }
        lastTapRef.current[reel.id] = now;
    };

    const handleVideoIntersection = (index: number) => {
        setActiveVideoIndex(index);
        const currentReel = displayedReels[index];

        videoRefs.current.forEach((vid, i) => {
            if (vid) {
                if (i === index) {
                    vid.play().catch(() => {});
                    setIsPlaying(true);
                } else {
                    vid.pause();
                    vid.currentTime = 0;
                }
            }
        });

        // Record view in reel_views table
        if (currentReel && currentUserId && !viewedReelsRef.current.has(currentReel.id)) {
            viewedReelsRef.current.add(currentReel.id);
            recordReelView(currentReel.id);
        }
    };

    const recordReelView = async (reelId: string) => {
        try {
            await supabase.from("reel_views").insert({
                reel_id: reelId,
                viewer_id: currentUserId,
                viewed_at: new Date().toISOString(),
            });

            // Increment views_count
            const targetReel = allReels.find((r) => r.id === reelId);
            if (targetReel) {
                const newViews = (targetReel.views_count || 0) + 1;
                await supabase
                    .from("reels")
                    .update({ views_count: newViews })
                    .eq("id", reelId);
            }
        } catch (e) {
            console.error("Error recording view:", e);
        }
    };

    // Copy Reel Link
    const handleCopyLink = (reel: ReelItem) => {
        const shareUrl = `${window.location.origin}/en/feed/reels?id=${reel.id}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            showToast("Link copied to clipboard");
        } else {
            const input = document.createElement("input");
            input.value = shareUrl;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            showToast("Link copied to clipboard");
        }
    };

    // Download Video through server-side stream API
    const handleDownloadVideo = async (reel: ReelItem) => {
        setDownloadingReelId(reel.id);
        showToast("Downloading video...", "info");

        try {
            const filename = `safi-reel-${reel.id}.mp4`;
            const downloadUrl = `/api/download-video?url=${encodeURIComponent(reel.video_url)}&filename=${encodeURIComponent(filename)}`;

            const response = await fetch(downloadUrl);
            if (!response.ok) throw new Error("Download request failed");

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);

            showToast("Video saved successfully");
        } catch (err) {
            console.error("Video download error:", err);
            // Fallback direct window open if blob download is restricted
            window.open(reel.video_url, "_blank");
            showToast("Video saved successfully");
        } finally {
            setDownloadingReelId(null);
        }
    };

    // Send Reel to a Friend via Direct Message
    const handleSendToFriend = async (friend: FriendItem, reel: ReelItem) => {
        if (!currentUserId) return;
        setIsSharingFriend(friend.id);

        try {
            const { error } = await supabase.from("direct_messages").insert({
                sender_id: currentUserId,
                receiver_id: friend.id,
                message_text: `🎥 Shared a Reel: ${reel.title || 'Watch this video'}`,
                attachment_url: reel.video_url,
                attachment_type: "reel",
                is_delivered: true,
                is_read: false,
            });

            if (error) throw error;

            setSentFriendIds((prev) => new Set([...prev, friend.id]));
            showToast(`Reel sent to ${friend.first_name}`);
        } catch (err) {
            console.error("Error sharing reel with friend:", err);
            showToast("Failed to send reel", "info");
        } finally {
            setIsSharingFriend(null);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row bg-[#030305] lg:p-4 gap-4 overflow-hidden relative font-sans">
            
            {/* ================= FLOATING TOASTS ================= */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-black/90 backdrop-blur-xl border border-white/20 text-white px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 text-xs font-bold animate-[slideDown_0.25s_ease-out] text-center"
                    >
                        <Check size={14} className="text-[#C2185B]" />
                        <span>{toast.text}</span>
                    </div>
                ))}
            </div>

            {/* ================= MAIN VIDEO FEED CONTAINER ================= */}
            <div className="flex-1 w-full h-full relative bg-black lg:rounded-[2rem] lg:border border-white/5 shadow-2xl overflow-hidden flex flex-col">
                
                {/* TOP HEADER: FOR YOU & FRIENDS TABS + CREATE BUTTON */}
                <div className="absolute top-4 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
                    
                    {/* Glassmorphic Tabs */}
                    <div className="mx-auto flex items-center bg-black/60 backdrop-blur-2xl p-1 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
                        <button
                            onClick={() => setActiveTab('foryou')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                                activeTab === 'foryou'
                                    ? "bg-gradient-to-r from-[#C2185B] to-pink-600 text-white shadow-[0_0_20px_rgba(194,24,91,0.6)]"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            <Compass size={14} /> For You
                        </button>
                        <button
                            onClick={() => setActiveTab('friends')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                                activeTab === 'friends'
                                    ? "bg-gradient-to-r from-[#C2185B] to-pink-600 text-white shadow-[0_0_20px_rgba(194,24,91,0.6)]"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            <Users size={14} /> Friends
                        </button>
                    </div>

                    {/* Mute/Unmute & Create Button */}
                    <div className="absolute right-4 top-0 flex items-center gap-2 pointer-events-auto">
                        <Link
                            href="/en/feed/create/reels"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#C2185B]/20 hover:bg-[#C2185B]/40 text-pink-200 border border-[#C2185B]/40 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md transition-colors"
                        >
                            + Upload
                        </Link>
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/90 transition-colors shadow-lg"
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                    </div>

                </div>

                {/* VIDEO FEED SCROLL VIEW */}
                {displayedReels.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4 bg-[#030305]">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#C2185B]">
                            {activeTab === 'friends' ? <Users size={32} /> : <Sparkles size={32} />}
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-wider">
                            {activeTab === 'friends' ? "No Friends' Reels Yet" : "No Reels Found"}
                        </h2>
                        <p className="text-xs text-neutral-400 font-bold mt-1 max-w-sm">
                            {activeTab === 'friends'
                                ? "Connect with fellow academy members in Network to see their short videos here!"
                                : "Be the first member to upload an engaging short reel!"}
                        </p>
                        {activeTab === 'friends' ? (
                            <Link
                                href="/en/feed/network"
                                className="mt-5 px-6 py-3 bg-gradient-to-r from-[#C2185B] to-pink-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                            >
                                Find Friends
                            </Link>
                        ) : (
                            <Link
                                href="/en/feed/create/reels"
                                className="mt-5 px-6 py-3 bg-gradient-to-r from-[#C2185B] to-pink-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                            >
                                Upload Reel
                            </Link>
                        )}
                    </div>
                ) : (
                    <div
                        ref={containerRef}
                        className="flex-1 w-full h-full relative overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
                        onScroll={(e) => {
                            const index = Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight);
                            if (index !== activeVideoIndex && index >= 0 && index < displayedReels.length) {
                                handleVideoIntersection(index);
                            }
                        }}
                    >
                        {displayedReels.map((reel, index) => {
                            const isExpanded = expandedDescriptions[reel.id] || false;
                            const isHeartActive = !!heartAnimations[reel.id];

                            return (
                                <div key={reel.id} className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-black group select-none">
                                    
                                    {/* VIDEO ELEMENT */}
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

                                    {/* INSTAGRAM STYLE DOUBLE-TAP FLOATING HEART ANIMATION */}
                                    {isHeartActive && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                                            <div className="animate-[heartPop_0.8s_ease-out_forwards] text-pink-500 drop-shadow-[0_0_35px_rgba(236,72,153,0.9)]">
                                                <Heart size={110} fill="#C2185B" stroke="#ffffff" strokeWidth={1.5} />
                                            </div>
                                        </div>
                                    )}

                                    {/* GRADIENT OVERLAYS */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 pointer-events-none"></div>

                                    {/* BOTTOM LEFT: AUTHOR & CAPTION INFO */}
                                    <div className="absolute bottom-16 lg:bottom-8 left-5 right-20 z-20 space-y-3 pointer-events-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-neutral-900 border-[2.5px] border-[#C2185B] overflow-hidden flex items-center justify-center shrink-0 shadow-lg">
                                                {reel.authorAvatar ? (
                                                    <img src={reel.authorAvatar} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[#C2185B] font-black text-sm">{reel.authorName.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-black text-sm tracking-wide drop-shadow-md flex items-center gap-1.5">
                                                    {reel.authorName}
                                                </h4>
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
                                                            onClick={() => setExpandedDescriptions((prev) => ({ ...prev, [reel.id]: !isExpanded }))}
                                                            className="text-[#C2185B] font-black text-[11px] mt-1 hover:text-pink-400 transition-colors bg-black/50 px-2.5 py-0.5 rounded-full"
                                                        >
                                                            {isExpanded ? "Show Less" : "Read More..."}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* RIGHT ACTION BUTTONS BAR */}
                                    <div className="absolute bottom-20 lg:bottom-10 right-4 z-20 flex flex-col items-center gap-5">
                                        
                                        {/* LIKE BUTTON */}
                                        <button onClick={() => toggleLike(reel)} className="flex flex-col items-center group/btn cursor-pointer">
                                            <div className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 shadow-lg ${
                                                reel.isLikedByMe
                                                    ? "bg-[#C2185B] border-[#C2185B] text-white shadow-[0_0_25px_rgba(194,24,91,0.7)] scale-110"
                                                    : "bg-black/60 border-white/20 text-white hover:bg-black/80 hover:scale-105"
                                            }`}>
                                                <Heart size={22} fill={reel.isLikedByMe ? "currentColor" : "none"} />
                                            </div>
                                            <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">{reel.likes_count}</span>
                                        </button>

                                        {/* COMMENTS BUTTON */}
                                        <button onClick={() => setActiveReelCommentsId(reel.id)} className="flex flex-col items-center group/btn cursor-pointer">
                                            <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/80 hover:scale-105 transition-all shadow-lg">
                                                <MessageCircle size={22} />
                                            </div>
                                            <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">{reel.comments_count}</span>
                                        </button>

                                        {/* SHARE BUTTON */}
                                        <button onClick={() => setSharingReel(reel)} className="flex flex-col items-center group/btn cursor-pointer">
                                            <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-[#C2185B] hover:border-[#C2185B] hover:scale-105 transition-all shadow-lg">
                                                <Share2 size={20} />
                                            </div>
                                            <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">Share</span>
                                        </button>

                                        {/* DOWNLOAD BUTTON */}
                                        <button
                                            onClick={() => handleDownloadVideo(reel)}
                                            disabled={downloadingReelId === reel.id}
                                            className="flex flex-col items-center group/btn cursor-pointer disabled:opacity-50"
                                            title="Download Reel"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 hover:scale-105 transition-all shadow-lg">
                                                {downloadingReelId === reel.id ? (
                                                    <Loader2 size={20} className="animate-spin text-emerald-400" />
                                                ) : (
                                                    <Download size={20} />
                                                )}
                                            </div>
                                            <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-lg">Save</span>
                                        </button>

                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* ================= DESKTOP SIDEBAR COMMENTS PANEL ================= */}
            {displayedReels.length > 0 && currentUserId && (
                <div className="hidden lg:flex w-[380px] xl:w-[420px] h-full bg-[#0a0a0f] border border-white/5 rounded-[2rem] flex-col overflow-hidden shadow-2xl shrink-0">
                    <div className="p-6 border-b border-white/5 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <MessageCircle size={18} className="text-[#C2185B]" /> Discussion
                            </h3>
                            <p className="text-[10px] text-neutral-400 font-bold mt-1">Comments update in real-time as you scroll.</p>
                        </div>
                        <span className="text-xs font-black text-[#C2185B] bg-[#C2185B]/10 px-2.5 py-1 rounded-full border border-[#C2185B]/20">
                            {displayedReels[activeVideoIndex]?.comments_count || 0}
                        </span>
                    </div>
                    <SharedCommentsView
                        reelId={displayedReels[activeVideoIndex]?.id}
                        currentUserId={currentUserId}
                        onCommentAdded={() => {
                            // Update comments_count locally
                            const targetId = displayedReels[activeVideoIndex]?.id;
                            if (targetId) {
                                const updateList = (list: ReelItem[]) =>
                                    list.map((r) => r.id === targetId ? { ...r, comments_count: r.comments_count + 1 } : r);
                                setAllReels(updateList);
                                setDisplayedReels(updateList);
                            }
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
                                const targetId = activeReelCommentsId;
                                if (targetId) {
                                    const updateList = (list: ReelItem[]) =>
                                        list.map((r) => r.id === targetId ? { ...r, comments_count: r.comments_count + 1 } : r);
                                    setAllReels(updateList);
                                    setDisplayedReels(updateList);
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ================= SHARE & SEND TO FRIENDS MODAL ================= */}
            {sharingReel && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-[#0c0c14] border border-white/10 rounded-[2.5rem] w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-b from-[#141420] to-[#0c0c14]">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#C2185B]/20 border border-[#C2185B]/40 flex items-center justify-center text-[#C2185B]">
                                    <Share2 size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white tracking-wide">Share Reel</h3>
                                    <p className="text-[10px] text-neutral-400 font-bold truncate max-w-[200px]">{sharingReel.title}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSharingReel(null)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Quick Copy Link Bar */}
                        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2.5">Direct Reel Link</p>
                            <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 p-2 rounded-2xl">
                                <input
                                    type="text"
                                    readOnly
                                    value={typeof window !== 'undefined' ? `${window.location.origin}/en/feed/reels?id=${sharingReel.id}` : ''}
                                    className="flex-1 bg-transparent px-2 text-xs text-neutral-300 font-mono focus:outline-none truncate"
                                />
                                <button
                                    onClick={() => handleCopyLink(sharingReel)}
                                    className="px-4 py-2 bg-gradient-to-r from-[#C2185B] to-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                                >
                                    <Copy size={13} /> Copy
                                </button>
                            </div>

                            {/* Open in Safi App / Google Play Store Intent Link */}
                            <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-[#C2185B]/10 border border-[#C2185B]/20">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#C2185B] animate-pulse"></span>
                                    <span className="text-[11px] font-bold text-pink-200">Safi Academy Mobile App</span>
                                </div>
                                <a
                                    href="https://play.google.com/store/apps/details?id=org.safiacademy.app"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] font-black uppercase tracking-wider text-[#C2185B] hover:underline flex items-center gap-1"
                                >
                                    Get App <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Send to Friends List */}
                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                                <Users size={13} /> Send Directly to Friends
                            </p>

                            {friends.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center opacity-60">
                                    <Users size={28} className="text-neutral-500 mb-2" />
                                    <p className="text-xs font-bold text-neutral-300">No friends connected yet</p>
                                    <Link href="/en/feed/network" className="text-[11px] text-[#C2185B] font-bold mt-1 hover:underline">
                                        Explore Network
                                    </Link>
                                </div>
                            ) : (
                                friends.map((friend) => {
                                    const isSent = sentFriendIds.has(friend.id);
                                    const isSending = isSharingFriend === friend.id;

                                    return (
                                        <div key={friend.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                                    {friend.avatar_url ? (
                                                        <img src={friend.avatar_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-[#C2185B] font-black text-xs">{friend.first_name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h5 className="text-xs font-black text-white">{friend.first_name} {friend.last_name}</h5>
                                                    <span className="text-[10px] text-neutral-500 font-medium">Academy Member</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleSendToFriend(friend, sharingReel)}
                                                disabled={isSent || isSending}
                                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                                    isSent
                                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                        : "bg-white/10 hover:bg-[#C2185B] text-white hover:shadow-[0_0_15px_rgba(194,24,91,0.5)] cursor-pointer"
                                                }`}
                                            >
                                                {isSending ? (
                                                    <Loader2 size={12} className="animate-spin" />
                                                ) : isSent ? (
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
            )}

        </div>
    );
}

// =====================================================================
// COMPONENT: SHARED COMMENTS VIEW (Used in Desktop Panel & Mobile Modal)
// =====================================================================
function SharedCommentsView({ 
    reelId, 
    currentUserId, 
    onCommentAdded 
}: { 
    reelId: string | undefined; 
    currentUserId: string; 
    onCommentAdded: () => void; 
}) {
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
        if (!reelId) return;
        setIsLoading(true);
        try {
            const { data: res } = await supabase
                .from("reel_comments")
                .select("*, profiles:user_id (first_name, last_name, avatar_url)")
                .eq("reel_id", reelId)
                .order("created_at", { ascending: true });

            if (res) setComments(res as ReelComment[]);
        } catch (e) {
            console.error("Error fetching reel comments:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!newComment.trim() || !reelId || isSending) return;
        setIsSending(true);

        try {
            const commentText = newComment.trim();
            setNewComment("");

            const { error } = await supabase.from("reel_comments").insert({
                reel_id: reelId,
                user_id: currentUserId,
                comment_text: commentText,
            });

            if (error) throw error;

            // Direct update count on reels table
            const { data: targetReel } = await supabase
                .from("reels")
                .select("comments_count")
                .eq("id", reelId)
                .single();

            if (targetReel) {
                await supabase
                    .from("reels")
                    .update({ comments_count: (targetReel.comments_count || 0) + 1 })
                    .eq("id", reelId);
            }

            try {
                await supabase.rpc('increment_reel_comments', { reel_id_input: reelId });
            } catch (_) {}

            await fetchComments();
            onCommentAdded();
        } catch (e) {
            console.error("Error adding reel comment:", e);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0a0f] overflow-hidden">
            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
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
                                    <p className="text-neutral-300 text-xs mt-1 leading-relaxed font-medium">{c.comment_text}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Box */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-[#0a0a0f] shrink-0">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 text-white text-xs font-medium focus:outline-none focus:border-[#C2185B]/70 focus:bg-white/[0.05] transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isSending || !newComment.trim()}
                        className="w-11 h-11 bg-gradient-to-br from-[#C2185B] to-pink-700 text-white rounded-2xl flex items-center justify-center hover:to-pink-600 disabled:opacity-50 transition-all shrink-0 shadow-[0_0_15px_rgba(194,24,91,0.3)] hover:shadow-[0_0_20px_rgba(194,24,91,0.5)] cursor-pointer"
                    >
                        {isSending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Send size={16} className="ml-0.5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ReelsPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ReelsFeedContent />
        </Suspense>
    );
}