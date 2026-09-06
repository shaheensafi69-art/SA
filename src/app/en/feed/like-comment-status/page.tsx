"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Heart,
    MessageCircle,
    Video,
    ArrowLeft,
    Sparkles,
    Activity,
    Eye,
    TrendingUp,
    FileText,
    Clock,
    User,
    ChevronRight
} from "lucide-react";

interface ActivityItem {
    id: string;
    type: 'post_like' | 'post_comment' | 'reel_like' | 'reel_comment' | 'reel_view';
    title: string;
    commentText?: string;
    targetId: string;
    targetType: 'post' | 'reel';
    createdAt: string;
    actorId: string;
    actorName: string;
    actorAvatar: string;
}

interface StatsSummary {
    totalLikes: number;
    totalComments: number;
    totalViews: number;
    totalPosts: number;
    totalReels: number;
}

export default function LikeCommentStatusPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [stats, setStats] = useState<StatsSummary>({
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0,
        totalPosts: 0,
        totalReels: 0,
    });
    const [activeTab, setActiveTab] = useState<'all' | 'likes' | 'comments' | 'views'>('all');

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchActivitiesAndStats();
    }, []);

    const fetchActivitiesAndStats = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;

            // 1. Fetch user's discussion posts
            const { data: myPosts } = await supabase
                .from("discussion_posts")
                .select("id, title, created_at")
                .eq("student_id", userId);

            const postIds = (myPosts || []).map(p => p.id);
            const postTitleMap: { [key: string]: string } = {};
            myPosts?.forEach(p => { postTitleMap[p.id] = p.title || "Post"; });

            // 2. Fetch user's published reels
            const { data: myReels } = await supabase
                .from("reels")
                .select("id, title, views_count, likes_count, comments_count, created_at")
                .eq("user_id", userId);

            const reelIds = (myReels || []).map(r => r.id);
            const reelTitleMap: { [key: string]: string } = {};
            myReels?.forEach(r => { reelTitleMap[r.id] = r.title || "Reel"; });

            let loadedActivities: ActivityItem[] = [];
            const actorIdsSet = new Set<string>();

            // 3. Post Likes
            let postLikesList: any[] = [];
            if (postIds.length > 0) {
                const { data: pLikes } = await supabase
                    .from("discussion_likes")
                    .select("id, post_id, student_id, created_at")
                    .in("post_id", postIds)
                    .neq("student_id", userId)
                    .order("created_at", { ascending: false });

                if (pLikes) {
                    postLikesList = pLikes;
                    pLikes.forEach(l => actorIdsSet.add(l.student_id));
                }

                // 4. Post Comments
                const { data: pComments } = await supabase
                    .from("discussion_comments")
                    .select("id, post_id, student_id, comment_text, created_at")
                    .in("post_id", postIds)
                    .neq("student_id", userId)
                    .order("created_at", { ascending: false });

                if (pComments) {
                    pComments.forEach(c => {
                        actorIdsSet.add(c.student_id);
                        loadedActivities.push({
                            id: `pcom_${c.id}`,
                            type: 'post_comment',
                            title: postTitleMap[c.post_id] || "Your Post",
                            commentText: c.comment_text,
                            targetId: c.post_id,
                            targetType: 'post',
                            createdAt: c.created_at,
                            actorId: c.student_id,
                            actorName: "Academy Member",
                            actorAvatar: ""
                        });
                    });
                }
            }

            // 5. Reel Likes
            let reelLikesList: any[] = [];
            if (reelIds.length > 0) {
                const { data: rLikes } = await supabase
                    .from("reel_likes")
                    .select("id, reel_id, user_id, created_at")
                    .in("reel_id", reelIds)
                    .neq("user_id", userId)
                    .order("created_at", { ascending: false });

                if (rLikes) {
                    reelLikesList = rLikes;
                    rLikes.forEach(rl => {
                        actorIdsSet.add(rl.user_id);
                        loadedActivities.push({
                            id: `rlike_${rl.id}`,
                            type: 'reel_like',
                            title: reelTitleMap[rl.reel_id] || "Your Reel",
                            targetId: rl.reel_id,
                            targetType: 'reel',
                            createdAt: rl.created_at,
                            actorId: rl.user_id,
                            actorName: "Academy Member",
                            actorAvatar: ""
                        });
                    });
                }

                // 6. Reel Comments
                const { data: rComments } = await supabase
                    .from("reel_comments")
                    .select("id, reel_id, user_id, comment_text, created_at")
                    .in("reel_id", reelIds)
                    .neq("user_id", userId)
                    .order("created_at", { ascending: false });

                if (rComments) {
                    rComments.forEach(rc => {
                        actorIdsSet.add(rc.user_id);
                        loadedActivities.push({
                            id: `rcom_${rc.id}`,
                            type: 'reel_comment',
                            title: reelTitleMap[rc.reel_id] || "Your Reel",
                            commentText: rc.comment_text,
                            targetId: rc.reel_id,
                            targetType: 'reel',
                            createdAt: rc.created_at,
                            actorId: rc.user_id,
                            actorName: "Academy Member",
                            actorAvatar: ""
                        });
                    });
                }

                // 7. Reel Views
                const { data: rViews } = await supabase
                    .from("reel_views")
                    .select("id, reel_id, viewer_id, viewed_at")
                    .in("reel_id", reelIds)
                    .neq("viewer_id", userId)
                    .order("viewed_at", { ascending: false })
                    .limit(50);

                if (rViews) {
                    rViews.forEach(rv => {
                        if (rv.viewer_id) actorIdsSet.add(rv.viewer_id);
                        loadedActivities.push({
                            id: `rview_${rv.id}`,
                            type: 'reel_view',
                            title: reelTitleMap[rv.reel_id] || "Your Reel",
                            targetId: rv.reel_id,
                            targetType: 'reel',
                            createdAt: rv.viewed_at,
                            actorId: rv.viewer_id || "",
                            actorName: "Academy Member",
                            actorAvatar: ""
                        });
                    });
                }
            }

            // Append post likes to loaded activities
            postLikesList.forEach(l => {
                loadedActivities.push({
                    id: `plike_${l.id}`,
                    type: 'post_like',
                    title: postTitleMap[l.post_id] || "Your Post",
                    targetId: l.post_id,
                    targetType: 'post',
                    createdAt: l.created_at,
                    actorId: l.student_id,
                    actorName: "Academy Member",
                    actorAvatar: ""
                });
            });

            // Batch fetch all actor profiles in ONE single efficient query
            const actorIdsArray = Array.from(actorIdsSet).filter(Boolean);
            if (actorIdsArray.length > 0) {
                const { data: profiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .in("id", actorIdsArray);

                const profileMap = new Map<string, { name: string; avatar: string }>();
                profiles?.forEach(p => {
                    const name = `${p.first_name || ''} ${p.last_name || ''}`.trim() || "Academy Member";
                    profileMap.set(p.id, { name, avatar: p.avatar_url || "" });
                });

                // Attach actor names and avatars
                loadedActivities = loadedActivities.map(act => {
                    const prof = profileMap.get(act.actorId);
                    if (prof) {
                        return { ...act, actorName: prof.name, actorAvatar: prof.avatar };
                    }
                    return act;
                });
            }

            // Sort newest first
            loadedActivities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setActivities(loadedActivities);

            // Compute engagement stats
            const totalLikes = postLikesList.length + reelLikesList.length;
            const totalComments = loadedActivities.filter(a => a.type.includes('comment')).length;
            const totalViews = (myReels || []).reduce((acc, r) => acc + (r.views_count || 0), 0);

            setStats({
                totalLikes,
                totalComments,
                totalViews,
                totalPosts: (myPosts || []).length,
                totalReels: (myReels || []).length,
            });

        } catch (e) {
            console.error("Error fetching activity status:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredActivities = activities.filter(act => {
        if (activeTab === 'likes') return act.type.includes('like');
        if (activeTab === 'comments') return act.type.includes('comment');
        if (activeTab === 'views') return act.type.includes('view');
        return true;
    });

    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-transparent">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading Activity Status...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans relative pb-28">

            {/* Background Ambience */}
            <div className="absolute top-0 right-[10%] w-[40vw] h-[40vw] bg-[#C2185B]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8 bg-[#0a0a0f]/80 border border-white/5 p-6 rounded-[2.2rem] backdrop-blur-xl shadow-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/en/feed"
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <Activity className="text-[#C2185B]" size={24} /> Likes & Comments Status
                        </h1>
                        <p className="text-xs text-neutral-400 font-medium mt-0.5">Track real-time engagement and interactions across all your content</p>
                    </div>
                </div>
            </div>

            {/* Engagement Summary Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8 relative z-10">
                <div className="bg-[#0a0a0f]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex flex-col">
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider">Total Likes</span>
                        <Heart size={16} className="text-[#C2185B]" fill="#C2185B" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-white">{stats.totalLikes}</span>
                    <span className="text-[10px] text-neutral-500 font-bold mt-0.5">Across posts & reels</span>
                </div>

                <div className="bg-[#0a0a0f]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex flex-col">
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider">Comments</span>
                        <MessageCircle size={16} className="text-pink-400" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-white">{stats.totalComments}</span>
                    <span className="text-[10px] text-neutral-500 font-bold mt-0.5">Discussions started</span>
                </div>

                <div className="bg-[#0a0a0f]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex flex-col">
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider">Reel Views</span>
                        <Eye size={16} className="text-yellow-400" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-white">{stats.totalViews}</span>
                    <span className="text-[10px] text-neutral-500 font-bold mt-0.5">{stats.totalReels} reels published</span>
                </div>

                <div className="bg-[#0a0a0f]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex flex-col">
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider">My Posts</span>
                        <FileText size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-white">{stats.totalPosts}</span>
                    <span className="text-[10px] text-neutral-500 font-bold mt-0.5">Community posts</span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 p-1.5 bg-[#0a0a0f]/80 border border-white/5 rounded-2xl mb-6 relative z-10 shadow-lg">
                {[
                    { id: 'all', label: 'All Activity' },
                    { id: 'likes', label: 'Likes Only' },
                    { id: 'comments', label: 'Comments Only' },
                    { id: 'views', label: 'Reel Views' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                            ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.3)]"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Activity List */}
            <div className="space-y-3 relative z-10">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-20 bg-[#0a0a0f]/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                        <Sparkles className="w-12 h-12 text-neutral-700 mx-auto mb-3 opacity-50" />
                        <p className="text-neutral-500 font-bold text-sm tracking-wide">No engagement activity found in this category.</p>
                    </div>
                ) : (
                    filteredActivities.map((act) => {
                        const isLike = act.type.includes('like');
                        const isComment = act.type.includes('comment');
                        const isView = act.type.includes('view');
                        const isReel = act.targetType === 'reel';

                        const targetHref = isReel ? `/en/feed/reels?id=${act.targetId}` : `/en/feed/profile/${act.actorId}`;

                        return (
                            <Link
                                key={act.id}
                                href={targetHref}
                                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 backdrop-blur-xl shadow-lg hover:border-[#C2185B]/40 hover:bg-white/[0.03] transition-all group"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    {/* Actor Avatar */}
                                    <div className="w-11 h-11 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#C2185B]/50 transition-colors">
                                        {act.actorAvatar ? (
                                            <img src={act.actorAvatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[#C2185B] font-black text-sm">{act.actorName.charAt(0)}</span>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-white font-black text-xs sm:text-sm tracking-wide truncate">{act.actorName}</h4>
                                            
                                            {/* Action Icon Badge */}
                                            {isLike ? (
                                                <span className="inline-flex items-center gap-1 text-[9px] font-black text-[#C2185B] bg-[#C2185B]/15 px-2 py-0.5 rounded-full border border-[#C2185B]/30">
                                                    <Heart size={10} fill="#C2185B" /> Liked
                                                </span>
                                            ) : isComment ? (
                                                <span className="inline-flex items-center gap-1 text-[9px] font-black text-pink-400 bg-pink-500/15 px-2 py-0.5 rounded-full border border-pink-500/30">
                                                    <MessageCircle size={10} /> Commented
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[9px] font-black text-yellow-400 bg-yellow-500/15 px-2 py-0.5 rounded-full border border-yellow-500/30">
                                                    <Eye size={10} /> Viewed
                                                </span>
                                            )}

                                            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest hidden sm:inline">
                                                {isReel ? "on Reel" : "on Post"}
                                            </span>
                                        </div>

                                        {/* Target Title & Comment snippet */}
                                        <p className="text-neutral-300 text-xs mt-1 font-medium truncate">
                                            {act.commentText ? `"${act.commentText}"` : `Target: ${act.title}`}
                                        </p>

                                        {/* Timestamp */}
                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-neutral-500 font-bold">
                                            <Clock size={11} />
                                            <span>{act.createdAt ? new Date(act.createdAt).toLocaleString() : ""}</span>
                                        </div>
                                    </div>
                                </div>

                                <ChevronRight size={16} className="text-neutral-600 group-hover:text-white transition-colors shrink-0 ml-2" />
                            </Link>
                        );
                    })
                )}
            </div>

        </div>
    );
}