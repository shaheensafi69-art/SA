"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Megaphone, BellRing, CalendarDays, Clock, Info } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  message: string;
  target_role: string;
  created_by: string;
  created_at: string;
};

export default function AnnouncementsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;

      try {
        // ۱. دریافت نقش کاربر فعلی تا فقط اعلان‌های مربوط به خودش را ببیند
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        const userRole = profile?.role || "student";

        // ۲. واکشی اعلانات (آن‌هایی که برای "all" هستند یا مستقیماً برای نقش این کاربر)
        const { data: announcementsData, error } = await supabase
          .from("announcements")
          .select("*")
          .in("target_role", ["all", userRole])
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAnnouncements(announcementsData || []);
        
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-20 min-h-screen">
      
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1200px] mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out] relative z-10 px-4 sm:px-6 md:px-10 pt-8">
        
        {/* ================= HEADER CARD ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700"></div>
          
          <div className="relative z-10 flex items-start sm:items-center gap-5 sm:gap-6 flex-col sm:flex-row">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20 shadow-inner shrink-0">
              <Megaphone className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">Announcements</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
                Stay updated with the latest news, system upgrades, live class schedules, and important notices from Safi Academy administration.
              </p>
            </div>
          </div>
        </header>

        {/* ================= ANNOUNCEMENTS LIST ================= */}
        <div className="space-y-6">
          {isLoading ? (
            // Skeleton Loader
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 sm:p-8 animate-pulse flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-white/5 rounded-lg"></div>
                  <div className="h-4 w-1/4 bg-white/5 rounded-lg"></div>
                  <div className="h-20 w-full bg-white/5 rounded-xl mt-4"></div>
                </div>
              ))}
            </>
          ) : announcements.length > 0 ? (
            // Fetched Data
            announcements.map((announcement, index) => {
              const dateObj = new Date(announcement.created_at);
              const isRecent = (new Date().getTime() - dateObj.getTime()) < 3 * 24 * 60 * 60 * 1000; // کمتر از 3 روز پیش باشد مارک New می‌گیرد

              return (
                <article 
                  key={announcement.id} 
                  className="bg-[#0a0a0f]/80 p-6 sm:p-8 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-xl hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(99,102,241,0.05)] hover:-translate-y-1"
                >
                  {/* افکت نوری داخلی کارت */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                  
                  {/* تگ وضعیت (مثلا اگر جدید باشد) */}
                  {isRecent && (
                    <div className="absolute top-6 right-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                      <BellRing size={12} className="animate-pulse" /> New Update
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col gap-6">
                    
                    {/* Header (عنوان و تاریخ) */}
                    <div className="pr-20">
                      <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
                        {announcement.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} className="text-indigo-400/70" />
                          {dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-indigo-400/70" />
                          {dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent"></div>

                    {/* محتوای پیام */}
                    <div className="text-neutral-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
                      {announcement.message}
                    </div>

                    {/* فوتر کارت */}
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                      <Info size={12} />
                      Target: {announcement.target_role === "all" ? "Entire Academy" : announcement.target_role}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            // Empty State
            <div className="bg-[#0a0a0f]/80 p-12 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center text-center h-[50vh]">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/10">
                <BellRing className="w-10 h-10 text-neutral-600" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">No Announcements Yet</h2>
              <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
                You're all caught up! Any future updates, scheduled maintenance, or news from the administration will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}