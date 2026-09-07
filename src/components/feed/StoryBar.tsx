"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface StoryBarProps {
  currentUserId: string | null;
}

interface RealStory {
  id: string;
  user_id: string;
  name: string;
  avatar: string;
  previewImage: string;
}

export default function StoryBar({ currentUserId }: StoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [stories, setStories] = useState<RealStory[]>([]);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchStories();
  }, [currentUserId]);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      // ۱. دریافت عکس پروفایل کاربر فعلی (برای کارت Create Story)
      if (currentUserId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", currentUserId)
          .single();

        if (profile?.avatar_url) {
          setCurrentUserAvatar(profile.avatar_url);
        }
      }

      // ۲. دریافت استوری‌های واقعی (با منطق ۲۴ ساعت)
      const now = new Date().toISOString();
      // محاسبه دقیق زمان ۲۴ ساعت گذشته
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const { data: fetchedStories, error } = await supabase
        .from("user_stories")
        .select(`
          id,
          user_id,
          media_url,
          created_at,
          profiles:user_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .gte("created_at", twentyFourHoursAgo) // منطق ۲۴ ساعت: فقط استوری‌های ۲۴ ساعت اخیر
        .gt("expires_at", now) // شرط انقضای پیش‌فرض در دیتابیس
        .order("created_at", { ascending: false });

      if (error) throw error;

      // ۳. فیلتر کردن استوری‌ها (از هر کاربر فقط یک کارت - جدیدترین استوری - نشان داده شود)
      const uniqueUsers = new Set();
      const formattedStories: RealStory[] = [];

      for (const story of (fetchedStories || [])) {
        // برای جلوگیری از خطاهای تایپ اسکریپت با روابط Supabase
        const profileData = Array.isArray(story.profiles) ? story.profiles[0] : story.profiles;

        if (!uniqueUsers.has(story.user_id) && story.user_id !== currentUserId) {
          uniqueUsers.add(story.user_id);
          formattedStories.push({
            id: story.id,
            user_id: story.user_id,
            name: `${profileData?.first_name || 'User'} ${profileData?.last_name || ''}`.trim(),
            avatar: profileData?.avatar_url || '',
            previewImage: story.media_url,
          });
        }
      }

      setStories(formattedStories);
    } catch (error) {
      console.error("Error fetching real stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // تابع برای اسکرول کردن به سمت راست (با کلیک روی آیکون فلش)
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    // یک حالت لودینگ ساده تا زمانی که استوری‌ها فچ شوند
    return (
      <div className="w-full h-[230px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // دیفالت آواتار در صورت نداشتن عکس پروفایل
  const defaultAvatar = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="relative w-full group/slider">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* ۱. کارت ایجاد استوری (Create Story) - با دیتای کاربر فعلی */}
        <div className="relative w-[110px] h-[200px] sm:w-[130px] sm:h-[230px] shrink-0 rounded-[1rem] overflow-hidden cursor-pointer group snap-start bg-[#242526] shadow-md border border-white/5">
          {/* نیمه بالایی: عکس کاربر */}
          <div className="h-[65%] w-full bg-neutral-800 relative overflow-hidden flex items-center justify-center text-white text-xs">
            <img
              src={currentUserAvatar || defaultAvatar}
              alt="My Avatar"
              className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-300"
            />
          </div>
          {/* نیمه پایینی: رنگ تیره و دکمه پلاس */}
          <div className="h-[35%] w-full flex flex-col items-center justify-end pb-3 relative">
            <div className="absolute -top-5 w-10 h-10 bg-[#0866ff] rounded-full border-4 border-[#242526] flex items-center justify-center text-white transition-colors group-hover:bg-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v12m-6-6h12"></path>
              </svg>
            </div>
            <span className="text-white text-[13px] font-semibold mt-4">Create story</span>
          </div>
        </div>

        {/* ۲. لیست استوری‌های دوستان (ریل تایم از دیتابیس) */}
        {stories.map((story) => (
          <Link
            href={`/en/feed/stories/${story.user_id}`} // مسیر مستقیم به صفحه stories/[id]/page.tsx
            key={story.id}
            className="relative w-[110px] h-[200px] sm:w-[130px] sm:h-[230px] shrink-0 rounded-[1rem] overflow-hidden cursor-pointer group snap-start border border-white/5 shadow-md block"
          >
            {/* عکس پس‌زمینه (پریویو استوری) */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              {story.previewImage ? (
                <img
                  src={story.previewImage}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-white/20 text-xs">No Media</span>
              )}
            </div>

            {/* گرادیانت تیره برای خوانایی متن‌ها */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 pointer-events-none"></div>

            {/* پروفایل کاربر در بالا سمت چپ با حلقه آبی */}
            <div className="absolute top-3 left-3 z-10">
              <div className="w-10 h-10 rounded-full border-[3.5px] border-[#0866ff] overflow-hidden bg-neutral-800 shadow-sm flex items-center justify-center">
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-sm">{story.name.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* نام کاربر در پایین سمت چپ */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="text-white text-[13px] font-semibold leading-tight line-clamp-2 drop-shadow-md">
                {story.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* دکمه فلش سمت راست برای اسکرول (فقط در دسکتاپ و روی هاور ظاهر می‌شود) */}
      {stories.length > 3 && (
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded-full flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hidden md:flex"
        >
          <svg className="w-6 h-6 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      )}

      {/* استایل مخفی کردن اسکرول‌بار در مرورگرهای مختلف */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}