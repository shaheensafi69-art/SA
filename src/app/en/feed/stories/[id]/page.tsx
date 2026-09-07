"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";

// تایپ‌های مربوط به دیتابیس شما
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

// تابع برای محاسبه زمان گذشته (مثلاً 2h یا 15m)
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
    const userId = params.id as string;
    const supabase = createClient();

    const [stories, setStories] = useState<Story[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ۱. واکشی اطلاعات استوری‌ها و کاربر از دیتابیس
    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // دریافت پروفایل کاربر
                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .eq("id", userId)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // دریافت استوری‌های فعال (منقضی نشده)
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

    // منطق رفتن به استوری بعدی
    const handleNext = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setProgress(0);
        } else {
            router.push("/en/feed"); // بازگشت به فید وقتی استوری‌ها تمام شد
        }
    }, [currentIndex, stories.length, router]);

    // منطق برگشت به استوری قبلی
    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setProgress(0);
        } else {
            setProgress(0); // ریست کردن زمان اگر در اولین استوری هستیم
        }
    }, [currentIndex]);

    // ۲. مدیریت تایمر و پروگرس‌بار با انیمیشن روان
    useEffect(() => {
        if (stories.length === 0 || isPaused) return;

        // اگر دیتابیس تایم نداشت، پیش‌فرض 5 ثانیه (برای عکس)
        const currentDuration = (stories[currentIndex]?.duration_seconds || 5) * 1000;
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

    // لودینگ اولیه
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // اگر کاربری استوری نداشت
    if (error || stories.length === 0) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
                <svg className="w-16 h-16 text-neutral-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p className="text-neutral-500 font-bold mb-6 tracking-wide">{error || "Story is unavailable."}</p>
                <button onClick={() => router.push("/en/feed")} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[1.2rem] transition-colors font-bold text-sm backdrop-blur-md">
                    Return to Feed
                </button>
            </div>
        );
    }

    const currentStory = stories[currentIndex];

    return (
        <div className="fixed inset-0 z-[999] bg-[#050505] flex items-center justify-center overflow-hidden font-sans">

            {/* 
        افکت بلور در دسکتاپ 
        پس‌زمینه را از عکس خود استوری می‌گیرد تا جلوه بصری عالی ایجاد کند
      */}
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
                className="relative w-full h-full sm:w-[400px] sm:h-[90vh] sm:max-h-[850px] bg-black sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:border border-white/10 transition-transform duration-300"
                onPointerDown={() => setIsPaused(true)}  // متوقف کردن با نگه داشتن کلیک یا تاچ
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
                            muted
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

                {/* سایه‌های بالا و پایین برای خوانایی متن‌ها (Gradients) */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

                {/* رابط کاربری بالای صفحه (نوار پیشرفت و مشخصات کاربر) */}
                <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-col gap-4 pointer-events-none">

                    {/* نوار پیشرفت (پروگرس بارها) */}
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

                    {/* هدر: عکس پروفایل، نام و دکمه خروج */}
                    <div className="flex items-center justify-between w-full pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-neutral-800 shrink-0">
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

                        {/* دکمه X برای بستن استوری */}
                        <button
                            onClick={(e) => { e.stopPropagation(); router.push('/en/feed'); }}
                            className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-xl transition-all border border-transparent hover:border-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>

                {/* نواحی کلیک برای رفتن به استوری قبلی و بعدی */}
                <div className="absolute inset-0 flex z-10">
                    {/* سمت چپ (30% از صفحه): استوری قبلی */}
                    <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
                    {/* سمت راست (70% از صفحه): استوری بعدی */}
                    <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
                </div>

                {/* کپشن یا متن روی استوری */}
                {currentStory.caption && (
                    <div className="absolute bottom-8 inset-x-6 z-20 pointer-events-none">
                        <p className="text-white text-sm sm:text-[15px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
                            {currentStory.caption}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}