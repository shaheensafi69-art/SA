"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";

// تایپ‌های مربوط به دیتابیس
interface Story {
    id: string;
    media_url: string;
    media_type: string;
    caption: string;
    duration_seconds: number | null;
    created_at: string;
}

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
}

// تابع برای محاسبه زمان گذشته
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
    const userId = params.id as string; // آیدی صاحب استوری‌ها
    const supabase = createClient();

    const videoRef = useRef<HTMLVideoElement>(null);

    const [currentViewerId, setCurrentViewerId] = useState<string | null>(null);
    const [stories, setStories] = useState<Story[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ۱. دریافت اطلاعات کاربر و استوری‌ها
    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // دریافت آیدی کاربر فعلی (بازدیدکننده)
                const { data: { session } } = await supabase.auth.getSession();
                setCurrentViewerId(session?.user?.id || null);

                // دریافت پروفایل صاحب استوری
                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .eq("id", userId)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // دریافت استوری‌های فعال
                const now = new Date().toISOString();
                const { data: storiesData, error: storiesError } = await supabase
                    .from("user_stories")
                    .select("*")
                    .eq("user_id", userId)
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

        fetchData();
    }, [userId, supabase]);

    // ۲. ثبت بازدید (View) با شرط یک‌بار برای هر کاربر
    useEffect(() => {
        if (!stories[currentIndex] || !currentViewerId) return;
        const currentStory = stories[currentIndex];

        const recordView = async () => {
            try {
                // اگر صاحب استوری خودش در حال دیدن است، بازدید نزن
                if (currentViewerId === userId) return;

                // چک کردن اینکه آیا قبلاً دیده است یا نه
                const { data: existingView } = await supabase
                    .from("story_views")
                    .select("id")
                    .eq("story_id", currentStory.id)
                    .eq("viewer_id", currentViewerId)
                    .maybeSingle();

                // اگر ندیده بود، ثبت کن
                if (!existingView) {
                    await supabase.from("story_views").insert({
                        story_id: currentStory.id,
                        viewer_id: currentViewerId,
                    });
                }
            } catch (err) {
                console.error("Failed to record view:", err);
            }
        };

        recordView();
    }, [currentIndex, stories, currentViewerId, userId, supabase]);

    // منطق رفتن به استوری بعدی
    const handleNext = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setProgress(0);
        } else {
            router.push("/en/feed"); // بازگشت به فید
        }
    }, [currentIndex, stories.length, router]);

    // منطق برگشت به استوری قبلی
    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [currentIndex]);

    // حذف استوری
    const handleDelete = async (storyId: string) => {
        if (!window.confirm("Are you sure you want to delete this story?")) return;

        setIsPaused(true);
        try {
            await supabase.from("user_stories").delete().eq("id", storyId);

            const updatedStories = stories.filter((s) => s.id !== storyId);
            if (updatedStories.length === 0) {
                router.push("/en/feed");
            } else {
                setStories(updatedStories);
                if (currentIndex >= updatedStories.length) {
                    setCurrentIndex(updatedStories.length - 1);
                }
                setProgress(0);
                setIsPaused(false);
            }
        } catch (err) {
            console.error("Error deleting story:", err);
            setIsPaused(false);
        }
    };

    // ۳. مدیریت تایمر و پروگرس‌بار
    useEffect(() => {
        if (stories.length === 0 || isPaused) return;

        const currentStory = stories[currentIndex];
        // اگر نوع ویدیو بود پیش‌فرض 15 ثانیه، اگر عکس 5 ثانیه (در صورتی که دیتابیس خالی باشد)
        const defaultDuration = currentStory?.media_type === "video" ? 15 : 5;
        const currentDuration = (currentStory?.duration_seconds || defaultDuration) * 1000;

        let lastTime = performance.now();
        let reqId: number;

        const animate = (time: number) => {
            const delta = time - lastTime;
            const progressDelta = (delta / currentDuration) * 100;

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
    }, [currentIndex, isPaused, stories, handleNext]);

    // ریست کردن ویدیو هنگام تغییر استوری
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    }, [currentIndex]);

    // نمایش لودینگ
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#C2185B]"></div>
            </div>
        );
    }

    // اگر استوری وجود نداشت
    if (error || stories.length === 0) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
                <svg className="w-16 h-16 text-neutral-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p className="text-neutral-500 font-bold mb-6 tracking-wide">{error || "Story is unavailable."}</p>
                <button onClick={() => router.push("/en/feed")} className="px-6 py-3 bg-[#C2185B] hover:bg-pink-700 rounded-[1.2rem] transition-colors font-bold text-sm shadow-lg">
                    Return to Feed
                </button>
            </div>
        );
    }

    const currentStory = stories[currentIndex];
    const isOwner = currentViewerId === userId;

    return (
        <div className="fixed inset-0 z-[999] bg-[#050505] flex items-center justify-center overflow-hidden font-sans select-none">

            {/* پس‌زمینه بلور برای دسکتاپ */}
            <div
                className="absolute inset-0 opacity-40 blur-3xl scale-110 pointer-events-none hidden sm:block transition-all duration-700"
                style={{
                    backgroundImage: `url(${currentStory.media_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            {/* کانتینر اصلی استوری */}
            <div
                className="relative w-full h-full sm:w-[420px] sm:h-[90vh] sm:max-h-[850px] bg-black sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] sm:border border-white/10 transition-transform duration-300 group"
                onPointerDown={() => setIsPaused(true)}
                onPointerUp={() => setIsPaused(false)}
                onPointerLeave={() => setIsPaused(false)}
            >

                {/* مدیا (عکس یا ویدیو) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {currentStory.media_type === 'video' ? (
                        <video
                            ref={videoRef}
                            src={currentStory.media_url}
                            autoPlay
                            playsInline
                            muted={isMuted}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={currentStory.media_url}
                            alt="Story"
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                        />
                    )}
                </div>

                {/* گرادیانت‌های بالا و پایین برای خوانایی بهتر */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

                {/* رابط کاربری بالا (هدر و پروگرس‌بار) */}
                <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-col gap-4 pointer-events-none">

                    {/* پروگرس بار */}
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

                    {/* هدر: عکس پروفایل، دکمه‌ها */}
                    <div className="flex items-center justify-between w-full pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-[1.5px] border-white/50 bg-neutral-800 shrink-0">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="w-full h-full flex items-center justify-center text-white text-sm font-black">
                                        {profile?.first_name?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col drop-shadow-md">
                                <span className="text-white font-bold text-[14px] tracking-wide leading-tight drop-shadow-lg">
                                    {profile?.first_name} {profile?.last_name}
                                </span>
                                <span className="text-white/80 text-[11px] font-semibold mt-0.5 drop-shadow-lg">
                                    {getTimeAgo(currentStory.created_at)}
                                </span>
                            </div>
                        </div>

                        {/* دکمه‌های سمت راست */}
                        <div className="flex items-center gap-2">
                            {/* دکمه صدا (اگر ویدیو باشد) */}
                            {currentStory.media_type === "video" && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                    className="w-9 h-9 flex items-center justify-center text-white drop-shadow-lg hover:scale-110 transition-transform"
                                >
                                    {isMuted ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                                    )}
                                </button>
                            )}

                            {/* دکمه حذف استوری (فقط برای صاحب استوری) */}
                            {isOwner && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(currentStory.id); }}
                                    className="w-9 h-9 flex items-center justify-center text-white hover:text-red-500 drop-shadow-lg hover:scale-110 transition-transform"
                                    title="Delete Story"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            )}

                            {/* دکمه بستن (X) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); router.push('/en/feed'); }}
                                className="w-9 h-9 flex items-center justify-center text-white drop-shadow-lg hover:scale-110 transition-transform"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* نواحی کلیک برای چپ و راست */}
                <div className="absolute inset-0 flex z-10">
                    <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
                    <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
                </div>

                {/* کپشن یا متن */}
                {currentStory.caption && (
                    <div className="absolute bottom-8 inset-x-6 z-20 pointer-events-none">
                        <p className="text-white text-[15px] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
                            {currentStory.caption}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}