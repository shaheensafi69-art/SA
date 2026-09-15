"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";

// تایپ‌های دیتابیس
interface Story {
    id: string;
    media_url: string;
    media_type: string;
    caption: string;
    duration_seconds: number | null;
    created_at: string;
    user_id: string;
}

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
}

// محاسبه زمان گذشته
const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${Math.max(0, diffInSeconds)}s`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
};

export default function StoryViewerPage() {
    const router = useRouter();
    const params = useParams();
    const storyAuthorId = params.id as string;
    const supabase = createClient();

    const [currentViewerId, setCurrentViewerId] = useState<string | null>(null);
    const [stories, setStories] = useState<Story[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // وضعیت‌های مربوط به تعاملات (لایک و ویو)
    const [viewsCount, setViewsCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);
    const [isLikedByMe, setIsLikedByMe] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

    // ۱. واکشی اطلاعات پایه (کاربر فعلی، پروفایل نویسنده، لیست استوری‌ها)
    useEffect(() => {
        if (!storyAuthorId) return;

        const fetchBaseData = async () => {
            setIsLoading(true);
            try {
                // دریافت آیدی کاربری که دارد نگاه می‌کند
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) setCurrentViewerId(session.user.id);

                // دریافت پروفایل نویسنده استوری
                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .eq("id", storyAuthorId)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // فیلتر ۲۴ ساعت: استوری‌هایی که از دیروز تا حالا گذاشته شده‌اند
                const now = new Date().toISOString();
                const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

                const { data: storiesData, error: storiesError } = await supabase
                    .from("user_stories")
                    .select("*")
                    .eq("user_id", storyAuthorId)
                    .gte("created_at", twentyFourHoursAgo)
                    .gt("expires_at", now)
                    .order("created_at", { ascending: true });

                if (storiesError) throw storiesError;

                if (!storiesData || storiesData.length === 0) {
                    setError("No active stories found.");
                } else {
                    setStories(storiesData);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBaseData();
    }, [storyAuthorId, supabase]);

    const currentStory = stories[currentIndex];

    // ۲. بارگذاری تعاملات (ویو و لایک) برای استوری فعلی و ثبت بازدید
    useEffect(() => {
        if (!currentStory || !currentViewerId) return;

        const loadInteractions = async () => {
            // واکشی بازدیدها
            const { data: viewsData } = await supabase
                .from("story_views")
                .select("viewer_id")
                .eq("story_id", currentStory.id);

            const views = viewsData || [];
            setViewsCount(views.length);

            // ثبت بازدید فقط اگر قبلاً ندیده باشد
            const hasViewed = views.some(v => v.viewer_id === currentViewerId);
            if (!hasViewed) {
                await supabase.from("story_views").insert({ story_id: currentStory.id, viewer_id: currentViewerId });
                setViewsCount(prev => prev + 1);
            }

            // واکشی لایک‌ها
            const { data: likesData } = await supabase
                .from("story_likes")
                .select("user_id")
                .eq("story_id", currentStory.id);

            const likes = likesData || [];
            setLikesCount(likes.length);
            setIsLikedByMe(likes.some(l => l.user_id === currentViewerId));
        };

        loadInteractions();
    }, [currentIndex, currentStory, currentViewerId, supabase]);

    // منطق رفتن به استوری بعدی
    const handleNext = useCallback(() => {
        setSlideDirection('next');
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setProgress(0);
        } else {
            router.push("/en/feed");
        }
    }, [currentIndex, stories.length, router]);

    // منطق برگشت به استوری قبلی
    const handlePrev = useCallback(() => {
        setSlideDirection('prev');
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [currentIndex]);

    // منطق لایک کردن
    const toggleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!currentViewerId || !currentStory) return;

        const wasLiked = isLikedByMe;
        setIsLikedByMe(!wasLiked);
        setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

        try {
            if (wasLiked) {
                await supabase.from("story_likes").delete().eq("story_id", currentStory.id).eq("user_id", currentViewerId);
            } else {
                await supabase.from("story_likes").insert({ story_id: currentStory.id, user_id: currentViewerId });
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    // منطق حذف استوری
    const deleteStory = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!currentStory) return;
        if (!window.confirm("Are you sure you want to delete this story?")) return;

        setIsPaused(true);
        try {
            await supabase.from("user_stories").delete().eq("id", currentStory.id);
            if (stories.length === 1) {
                router.push("/en/feed");
            } else {
                const updatedStories = stories.filter(s => s.id !== currentStory.id);
                setStories(updatedStories);
                if (currentIndex >= updatedStories.length) {
                    setCurrentIndex(0);
                }
            }
        } catch (error) {
            console.error("Error deleting story:", error);
        } finally {
            setIsPaused(false);
        }
    };

    // ۳. مدیریت تایمر با انیمیشن روان
    useEffect(() => {
        if (stories.length === 0 || isPaused) return;

        // اگر ویدیو باشد و تایم ثبت نشده باشد پیش فرض 15، برای عکس 5
        const durationSetting = currentStory?.duration_seconds || (currentStory?.media_type === 'video' ? 15 : 5);
        const currentDurationMs = durationSetting * 1000;

        let lastTime = performance.now();
        let reqId: number;

        const animate = (time: number) => {
            const delta = time - lastTime;
            const progressDelta = (delta / currentDurationMs) * 100;

            setProgress((prev) => {
                const nextProgress = prev + progressDelta;
                if (nextProgress >= 100) {
                    handleNext();
                    return 0;
                }
                return nextProgress;
            });
            lastTime = time;
            reqId = requestAnimationFrame(animate);
        };

        reqId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(reqId);
    }, [currentIndex, isPaused, stories, handleNext, currentStory]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || stories.length === 0) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
                <svg className="w-16 h-16 text-neutral-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p className="text-neutral-500 font-bold mb-6 tracking-wide">{error || "Story has expired or is unavailable."}</p>
                <button onClick={() => router.push("/en/feed")} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[1.2rem] transition-colors font-bold text-sm backdrop-blur-md">
                    Return to Feed
                </button>
            </div>
        );
    }

    const isMyStory = currentViewerId === storyAuthorId;

    return (
        <div className="fixed inset-0 z-[999] bg-[#050505] flex items-center justify-center overflow-hidden font-sans">

            {/* استایل انیمیشن ورق زدن ۳ بعدی (Page Flip/Cube) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pageFlipNext {
                    0% { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
                    100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
                }
                @keyframes pageFlipPrev {
                    0% { transform: perspective(1000px) rotateY(-90deg); opacity: 0; }
                    100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
                }
                .story-flip-anim-next {
                    animation: pageFlipNext 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    transform-origin: right center;
                }
                .story-flip-anim-prev {
                    animation: pageFlipPrev 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    transform-origin: left center;
                }
            `}} />

            {/* افکت بلور در پس زمینه دسکتاپ */}
            <div
                className="absolute inset-0 opacity-40 blur-3xl scale-110 pointer-events-none hidden sm:block transition-all duration-700"
                style={{
                    backgroundImage: `url(${currentStory.media_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            {/* باکس اصلی استوری */}
            <div
                key={currentStory.id} // کلید برای اجرای مجدد انیمیشن در هر تغییر
                className={`relative w-full h-full sm:w-[400px] sm:h-[90vh] sm:max-h-[850px] bg-black sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:border border-white/10 ${slideDirection === 'next' ? 'story-flip-anim-next' : 'story-flip-anim-prev'}`}
                onPointerDown={() => setIsPaused(true)}
                onPointerUp={() => setIsPaused(false)}
                onPointerLeave={() => setIsPaused(false)}
            >

                {/* تصویر یا ویدیوی استوری */}
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {currentStory.media_type === 'video' ? (
                        <video
                            src={currentStory.media_url}
                            autoPlay
                            playsInline
                            muted={false} // ویدیو حرفه ای با صدا پخش میشود
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={currentStory.media_url}
                            alt="Story"
                            className="w-full h-full object-cover select-none pointer-events-none"
                            draggable={false}
                        />
                    )}
                </div>

                {/* سایه‌های بالا و پایین (Gradients) */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

                {/* هدر: نوار پیشرفت و مشخصات */}
                <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-30 flex flex-col gap-4 pointer-events-none">
                    <div className="flex items-center gap-1.5 w-full">
                        {stories.map((story, idx) => (
                            <div key={story.id} className="h-0.5 sm:h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                                    style={{
                                        width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between w-full pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C2185B]/50 bg-neutral-800 shrink-0">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="w-full h-full flex items-center justify-center text-white text-sm font-black">
                                        {profile?.first_name?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col drop-shadow-lg">
                                <span className="text-white font-bold text-[15px] tracking-wide leading-tight">
                                    {profile?.first_name} {profile?.last_name}
                                </span>
                                <span className="text-white/70 text-[11px] font-semibold mt-0.5">
                                    {getTimeAgo(currentStory.created_at)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); router.push('/en/feed'); }}
                            className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-xl transition-all border border-transparent hover:border-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>

                {/* نواحی کلیک مخفی برای رفتن به استوری قبلی و بعدی */}
                {/* به گونه ای تنظیم شده که مزاحم دکمه های پایین نشود (bottom-24) */}
                <div className="absolute inset-x-0 top-0 bottom-24 flex z-20">
                    <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
                    <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
                </div>

                {/* کپشن یا متن روی استوری */}
                {currentStory.caption && (
                    <div className="absolute bottom-20 inset-x-6 z-30 pointer-events-none">
                        <p className="text-white text-sm sm:text-[15px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
                            {currentStory.caption}
                        </p>
                    </div>
                )}

                {/* دکمه‌های پایین (ویو، لایک، دیلیت) */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-40 flex items-center justify-between pointer-events-auto">

                    {/* سمت چپ: آمار بازدید */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        <span className="text-[13px] font-bold">{viewsCount} Views</span>
                    </div>

                    {/* سمت راست: لایک و حذف */}
                    <div className="flex items-center gap-3">
                        {/* دکمه لایک */}
                        <button
                            onClick={toggleLike}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white transition-all group"
                        >
                            <svg className={`w-5 h-5 transition-transform ${isLikedByMe ? 'text-[#C2185B] fill-[#C2185B] scale-110' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            {likesCount > 0 && <span className="text-[13px] font-bold">{likesCount}</span>}
                        </button>

                        {/* دکمه حذف (فقط برای سازنده استوری) */}
                        {isMyStory && (
                            <button
                                onClick={deleteStory}
                                className="flex items-center justify-center w-9 h-9 bg-red-500/80 hover:bg-red-600 backdrop-blur-md rounded-full border border-red-400/50 text-white transition-all shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}