"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, MessageSquare, ThumbsUp, Video, ArrowLeft, Sparkles, Activity } from "lucide-react";

interface ActivityItem {
    id: string;
    type: 'post_like' | 'post_comment' | 'reel_like' | 'reel_comment';
    title: string;
    targetId: string;
    createdAt: string;
    actorName: string;
    actorAvatar: string;
}

export default function LikeCommentStatusPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'likes' | 'comments'>('all');

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;

            // ۱. پیدا کردن پست‌های کاربر برای بررسی لایک و کامنت روی آن‌ها
            const { data: myPosts } = await supabase
                .from("discussion_posts")
                .select("id, title")
                .eq("student_id", userId);

            const postIds = (myPosts || []).map(p => p.id);
            const postTitleMap: { [key: string]: string } = {};
            myPosts?.forEach(p => { postTitleMap[p.id] = p.title || "Post"; });

            // ۲. پیدا کردن ریلزهای کاربر
            const { data: myReels } = await supabase
                .from("reels")
                .select("id, title")
                .eq("user_id", userId);

            const reelIds = (myReels || []).map(r => r.id);
            const reelTitleMap: { [key: string]: string } = {};
            myReels?.forEach(r => { reelTitleMap[r.id] = r.title || "Reel"; });

            let loadedActivities: ActivityItem[] = [];

            // الف. لایک‌های پست‌ها
            if (postIds.length > 0) {
                const { data: postLikes } = await supabase
                    .from("discussion_likes")
                    .select("id, post_id, student_id, created_at")
                    .in("post_id", postIds)
                    .neq("student_id", userId); // لایک دیگران روی پست من

                if (postLikes) {
                    for (const l of postLikes) {
                        const actor = await fetchProfile(l.student_id);
                        loadedActivities.push({
                            id: `plike_${l.id}`,
                            type: 'post_like',
                            title: postTitleMap[l.post_id] || "Your Post",
                            targetId: l.post_id,
                            createdAt: l.created_at,
                            actorName: actor.name,
                            actorAvatar: actor.avatar
                        });
                    }
                }

                // ب. کامنت‌های پست‌ها
                const { data: postComments } = await supabase
                    .from("discussion_comments")
                    .select("id, post_id, student_id, comment_text, created_at")
                    .in("post_id", postIds)
                    .neq("student_id", userId);

                if (postComments) {
                    for (const c of postComments) {
                        const actor = await fetchProfile(c.student_id);
                        loadedActivities.push({
                            id: `pcom_${c.id}`,
                            type: 'post_comment',
                            title: postTitleMap[c.post_id] || "Your Post",
                            targetId: c.post_id,
                            createdAt: c.created_at,
                            actorName: actor.name,
                            actorAvatar: actor.avatar
                        });
                    }
                }
            }

            // ج. لایک‌های ریلز
            if (reelIds.length > 0) {
                const { data: reelLikes } = await supabase
                    .from("reel_likes")
                    .select("id, reel_id, user_id, created_at")
                    .in("reel_id", reelIds)
                    .neq("user_id", userId);

                if (reelLikes) {
                    for (const rl of reelLikes) {
                        const actor = await fetchProfile(rl.user_id);
                        loadedActivities.push({
                            id: `rlike_${rl.id}`,
                            type: 'reel_like',
                            title: reelTitleMap[rl.reel_id] || "Your Reel",
                            targetId: rl.reel_id,
                            createdAt: rl.created_at,
                            actorName: actor.name,
                            actorAvatar: actor.avatar
                        });
                    }
                }

                // د. کامنت‌های ریلز
                const { data: reelComments } = await supabase
                    .from("reel_comments")
                    .select("id, reel_id, user_id, comment_text, created_at")
                    .in("reel_id", reelIds)
                    .neq("user_id", userId);

                if (reelComments) {
                    for (const rc of reelComments) {
                        const actor = await fetchProfile(rc.user_id);
                        loadedActivities.push({
                            id: `rcom_${rc.id}`,
                            type: 'reel_comment',
                            title: reelTitleMap[rc.reel_id] || "Your Reel",
                            targetId: rc.reel_id,
                            createdAt: rc.created_at,
                            actorName: actor.name,
                            actorAvatar: actor.avatar
                        });
                    }
                }
            }

            // مرتب‌سازی بر اساس تاریخ جدیدترین
            loadedActivities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setActivities(loadedActivities);

        } catch (e) {
            console.error("Error fetching activity status:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProfile = async (userId: string) => {
        try {
            const { data } = await supabase.from("profiles").select("first_name, last_name, avatar_url").eq("id", userId).maybeSingle();
            if (data) {
                return {
                    name: `${data.first_name || 'User'} ${data.last_name || ''}`.trim(),
                    avatar: data.avatar_url || ""
                };
            }
        } catch (_) { }
        return { name: "Academy Member", avatar: "" };
    };

    const filteredActivities = activities.filter(act => {
        if (activeTab === 'likes') return act.type.includes('like');
        if (activeTab === 'comments') return act.type.includes('comment');
        return true;
    });

    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center bg-transparent">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans relative pb-28">

            {/* هاله‌های نوری پس‌زمینه */}
            <div className="absolute top-0 right-[10%] w-[40vw] h-[40vw] bg-[#C2185B]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            {/* هیدر صفحه */}
            <div className="flex items-center justify-between mb-8 bg-[#0a0a0f]/80 border border-white/5 p-6 rounded-[2.2rem] backdrop-blur-xl shadow-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C2185B] to-pink-600 flex items-center justify-center text-white shadow-lg shadow-[#C2185B]/30">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Likes & Comments Status</h1>
                        <p className="text-xs text-neutral-400 font-medium mt-0.5">Track engagement and reactions on your posts and reels.</p>
                    </div>
                </div>
            </div>

            {/* تب‌ها */}
            <div className="flex gap-2 p-1.5 bg-[#0a0a0f]/80 border border-white/5 rounded-2xl mb-8 relative z-10 shadow-lg">
                {[
                    { id: 'all', label: 'All Activity' },
                    { id: 'likes', label: 'Likes Only' },
                    { id: 'comments', label: 'Comments Only' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                            ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.3)]"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* لیست فعالیت‌ها */}
            <div className="space-y-4 relative z-10">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-20 bg-[#0a0a0f]/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                        <Sparkles className="w-12 h-12 text-neutral-700 mx-auto mb-3 opacity-50" />
                        <p className="text-neutral-500 font-bold text-sm tracking-wide">No engagement activity found yet.</p>
                    </div>
                ) : (
                    filteredActivities.map((act) => {
                        const isLike = act.type.includes('like');
                        const isReel = act.type.includes('reel');

                        return (
                            <div
                                key={act.id}
                                className="flex items-center gap-4 bg-[#0a0a0f]/80 border border-white/5 p-4 sm:p-5 rounded-[2.2rem] backdrop-blur-xl shadow-lg hover:border-[#C2185B]/30 transition-all group"
                            >
                                {/* آواتار کاربر */}
                                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                                    {act.actorAvatar ? (
                                        <img src={act.actorAvatar} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[#C2185B] font-black text-sm">{act.actorName.charAt(0)}</span>
                                    )}
                                </div>

                                {/* توضیحات */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed truncate">
                                        <span className="text-white font-black">{act.actorName}</span>{' '}
                                        {isLike ? 'liked your' : 'commented on your'}{' '}
                                        <span className="text-pink-300 font-bold">{isReel ? 'reel' : 'post'}:</span>{' '}
                                        <span className="text-white font-black truncate">"{act.title}"</span>
                                    </p>
                                    <span className="text-[10px] text-neutral-500 font-bold mt-1 block">
                                        {act.createdAt.split('T')[0]} at {act.createdAt.split('T')[1]?.substring(0, 5)}
                                    </span>
                                </div>

                                {/* آیکون وضعیت */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${isLike ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                    }`}>
                                    {isLike ? <Heart size={18} className="fill-current" /> : <MessageSquare size={18} />}
                                </div>

                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
}