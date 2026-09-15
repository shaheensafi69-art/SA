"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Megaphone, BellRing, CalendarDays, Clock, Info, ShieldAlert } from "lucide-react";

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
    <div className="w-full relative overflow-x-hidden overflow-y-auto bg-[#030305] font-sans pb-24 lg:pb-12 min-h-screen custom-scrollbar">
      
      {/* ================= BACKGROUND GLOW EFFECTS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>

      <div className="max-w-[85rem] mx-auto space-y-6 sm:space-y-8 relative z-10 px-4 sm:px-8 pt-6 sm:pt-10">
        
        {/* ================= HEADER CARD ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 rounded-[1.2rem] sm:rounded-3xl flex items-center justify-center border border-indigo-500/30 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-500">
              <Megaphone className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2 sm:mb-3">
                Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Announcements</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-2xl leading-relaxed">
                Stay updated with the latest news, system upgrades, live class schedules, and important notices directly from Safi Academy administration.
              </p>
            </div>
          </div>
        </header>

        {/* ================= ANNOUNCEMENTS LIST ================= */}
        <div className="space-y-5 sm:space-y-6">
          {isLoading ? (
            // Skeleton Loader
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#0a0a0f]/60 border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 animate-pulse flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="h-6 sm:h-8 w-1/2 sm:w-1/3 bg-white/5 rounded-xl"></div>
                    <div className="h-5 w-16 bg-white/5 rounded-lg"></div>
                  </div>
                  <div className="h-4 w-1/4 bg-white/5 rounded-lg mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-lg"></div>
                    <div className="h-3 w-full bg-white/5 rounded-lg"></div>
                    <div className="h-3 w-3/4 bg-white/5 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </>
          ) : announcements.length > 0 ? (
            // Fetched Data
            announcements.map((announcement) => {
              const dateObj = new Date(announcement.created_at);
              // بررسی آیا اطلاعیه مربوط به ۳ روز اخیر است
              const isRecent = (new Date().getTime() - dateObj.getTime()) < 3 * 24 * 60 * 60 * 1000;

              return (
                <article 
                  key={announcement.id} 
                  className="bg-[#0a0a0f]/80 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-xl hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden group hover:shadow-[0_15px_40px_rgba(99,102,241,0.08)] hover:-translate-y-1"
                >
                  {/* افکت نوری داخلی کارت */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                    
                    {/* Header (عنوان و تگ‌ها) */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 pr-0 sm:pr-8">
                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                          <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                            {announcement.title}
                          </h2>
                          {isRecent && (
                            <span className="shrink-0 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md text-[8px] sm:text-[9px] font-black tracking-widest uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                              <BellRing size={10} className="animate-pulse" /> New
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                            <CalendarDays size={12} className="text-indigo-400/70" />
                            {dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                            <Clock size={12} className="text-indigo-400/70" />
                            {dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      
                      {/* آیکون ادمین / دپارتمان */}
                      <div className="hidden sm:flex w-12 h-12 bg-white/5 rounded-2xl items-center justify-center border border-white/10 shrink-0">
                        <ShieldAlert size={20} className="text-neutral-400" />
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent"></div>

                    {/* محتوای پیام */}
                    <div className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                      {announcement.message}
                    </div>

                    {/* فوتر کارت (نقش هدف) */}
                    <div className="mt-2 flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                      <Info size={12} className="text-indigo-400" />
                      Target Audience: <span className="text-white">{announcement.target_role === "all" ? "Entire Academy" : announcement.target_role}</span>
                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            // Empty State
            <div className="bg-[#0a0a0f]/80 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/5 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center text-center min-h-[40vh]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-inner border border-white/10">
                <BellRing className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">No Announcements Yet</h2>
              <p className="text-neutral-500 text-xs sm:text-sm max-w-sm leading-relaxed">
                You're all caught up! Any future updates, scheduled maintenance, or news from the administration will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}