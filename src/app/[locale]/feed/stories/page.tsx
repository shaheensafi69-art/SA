"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Sparkles, Plus, Play, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

interface StoryUser {
  userId: string;
  name: string;
  avatar: string;
  latestMedia: string;
  count: number;
}

export default function StoriesOverviewPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadStories() {
      setIsLoading(true);
      try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { data, error } = await supabase
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
          .gt("created_at", twentyFourHoursAgo)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const userMap = new Map<string, StoryUser>();
        if (data) {
          data.forEach((item: any) => {
            const uId = item.user_id;
            const prof = item.profiles;
            const name = `${prof?.first_name || ""} ${prof?.last_name || ""}`.trim() || "Academy Member";
            const avatar = prof?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

            if (!userMap.has(uId)) {
              userMap.set(uId, {
                userId: uId,
                name,
                avatar,
                latestMedia: item.media_url,
                count: 1,
              });
            } else {
              const existing = userMap.get(uId)!;
              existing.count += 1;
            }
          });
        }
        setStoryUsers(Array.from(userMap.values()));
      } catch (e) {
        console.error("Error loading stories:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStories();
  }, [supabase]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#030307] text-white pt-24 sm:pt-28 pb-32 px-4 sm:px-8 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-yellow-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-rose-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/${currentLocale}/feed`}
            className="flex items-center gap-2 text-neutral-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:bg-white/10"
          >
            <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
            <span>{(t.feed as any)?.backToFeed || (isRtl ? "بازگشت به فید" : "Back to Feed")}</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Campus Stories</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {currentLocale === "fa" ? "استوری‌های زنده آکادمی" :
             currentLocale === "ps" ? "د اکاډمۍ ژوندۍ کیسې" :
             currentLocale === "ar" ? "قصص الأكاديمية المباشرة" :
             "Live Academy Stories"}
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            {currentLocale === "fa" ? "مشاهده آخرین استوری‌ها و دستاوردهای اعضای کامیونیتی آکادمی صافی طی ۲۴ ساعت گذشته." :
             currentLocale === "ps" ? "په تېرو ۲۴ ساعتونو کې د صافي اکاډمۍ د ټولنې د غړو وروستۍ کیسې وګورئ." :
             "Browse daily moments, project milestones, and video updates from community members."}
          </p>
        </div>

        {/* Stories Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : storyUsers.length === 0 ? (
          <div className="bg-[#0a0a0f]/80 border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto my-8">
            <User size={36} className="text-neutral-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              {currentLocale === "fa" ? "استوری جدیدی ثبت نشده است" : "No active stories yet"}
            </h3>
            <p className="text-neutral-400 text-xs mb-6">
              {currentLocale === "fa" ? "اولین نفری باشید که داستان روز خود را با هم‌دانشگاهی‌هایتان به اشتراک می‌گذارد." :
               "Be the first to share your learning update with the campus!"}
            </p>
            <Link
              href={`/${currentLocale}/feed`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs transition-all"
            >
              <Plus size={16} />
              <span>{currentLocale === "fa" ? "ایجاد استوری در فید" : "Create Story in Feed"}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-8">
            {storyUsers.map((item) => (
              <Link
                key={item.userId}
                href={`/${currentLocale}/feed/stories/${item.userId}`}
                className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between p-3.5"
              >
                {/* Background media preview */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.latestMedia}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.avatar;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
                </div>

                {/* Top: Avatar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-yellow-500 to-rose-500 shadow-lg">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-yellow-300">
                    {item.count}
                  </span>
                </div>

                {/* Bottom: Name & Play */}
                <div className="relative z-10">
                  <p className="text-white font-bold text-xs truncate drop-shadow-md">
                    {item.name}
                  </p>
                  <span className="text-[10px] text-neutral-300 flex items-center gap-1 mt-0.5 opacity-80 group-hover:opacity-100">
                    <Play size={10} className="fill-current" /> Watch Story
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Adsterra Native Banner Placement */}
        <AdsterraNativeBanner
          category="Student Feeds & Campus Stories"
          keywords="education, campus, students, online learning, career, tech"
          badgeLabel="Campus Partner"
        />
      </div>
    </div>
  );
}
