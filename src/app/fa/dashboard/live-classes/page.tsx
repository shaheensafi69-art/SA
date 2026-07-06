"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type ClassGroup = {
  id: string;
  class_name: string;
  schedule_info: string;
  is_active: boolean;
  start_date: string;
  teacher: { first_name: string; last_name: string } | null;
};

export default function LiveClassesDashboard() {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // دریافت تمام کلاس‌ها همراه با مشخصات استاد از دیتابیس
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, schedule_info, is_active, start_date,
          teacher:profiles!teacher_id(first_name, last_name)
        `)
        .order("is_active", { ascending: false }) // ابتدا کلاس‌های لایو قرار می‌گیرند
        .order("start_date", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted = data.map((cls: any) => ({
          ...cls,
          teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher
        }));
        setClasses(formatted as ClassGroup[]);
      }
    } catch (error) {
      console.error("Error loading classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // تفکیک کلاس‌های لایو و کلاس‌های معمولی/قدیمی
  const liveSessions = classes.filter((c) => c.is_active);
  const generalClasses = classes.filter((c) => !c.is_active);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden">
      {/* افکت‌های پس‌زمینه سه بعدی */}
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-red-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* هدر صفحه */}
        <header className="rounded-[2rem] border border-white/5 bg-neutral-950/40 p-8 backdrop-blur-3xl shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-400 mb-2">Safi Academy Studio</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Live & Scheduled <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Classrooms</span></h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-xl">Access ongoing live trading rooms, upcoming financial lectures, and review archived sessions.</p>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ================= بخش ۱: کلاس‌های در حال برگزاری (Live Now) ================= */}
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2.5 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Live Broadcasts ({liveSessions.length})
              </h2>

              {liveSessions.length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-10 text-center text-neutral-500 text-sm backdrop-blur-sm">
                  There are no live broadcasts running at this exact moment.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {liveSessions.map((room) => (
                    <Link 
                      href={`/en/dashboard/live-classes/${room.id}`} 
                      key={room.id}
                      className="group relative rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/20 via-black to-black p-6 hover:border-red-500 transition-all duration-300 shadow-[0_15px_40px_rgba(239,68,68,0.1)] hover:-translate-y-1.5"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md animate-pulse">Live Now</span>
                        <span className="text-neutral-500 group-hover:text-red-400 transition-colors text-lg">→</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2 font-medium">Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500">
                        <span>🕒 {room.schedule_info}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ================= بخش ۲: کلاس‌های بعدی و آرشیو شده ================= */}
            <div>
              <h2 className="text-xl font-extrabold text-neutral-300 mb-6 flex items-center gap-2">
                <span>📚</span> Scheduled & Previous Classes ({generalClasses.length})
              </h2>

              {generalClasses.length === 0 ? (
                <div className="rounded-3xl border border-white/5 p-10 text-center text-neutral-600 text-sm">
                  No previous or scheduled classrooms found.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {generalClasses.map((room) => (
                    <Link 
                      href={`/en/dashboard/live-classes/${room.id}`} 
                      key={room.id}
                      className="group rounded-3xl border border-white/5 bg-white/5 p-6 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Standby / Archived</span>
                        <span className="text-neutral-600 group-hover:text-indigo-400 transition-colors">→</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2">Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500">
                        <span>📅 Scheduled: {room.schedule_info}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}