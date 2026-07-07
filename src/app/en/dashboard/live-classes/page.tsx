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
      // دریافت کلاس‌ها همراه با مشخصات استاد
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, schedule_info, is_active, start_date,
          teacher:profiles!teacher_id(first_name, last_name)
        `)
        .order("is_active", { ascending: false })
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

  const liveSessions = classes.filter((c) => c.is_active);
  const generalClasses = classes.filter((c) => !c.is_active);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-red-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="rounded-[2rem] border border-white/5 bg-neutral-950/40 p-8 backdrop-blur-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-400 mb-2">Safi Academy Studio</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Live & Scheduled <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Classrooms</span></h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">Access ongoing live trading rooms, join class discussion groups, and review archived sessions.</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-4 rounded-2xl items-center gap-4">
             <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl text-xl">🎓</div>
             <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Total Classes</p>
                <p className="text-2xl font-black">{isLoading ? "-" : classes.length}</p>
             </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ================= LIVE CLASSES SECTION ================= */}
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
                    <div key={room.id} className="relative rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/20 via-black to-black p-6 shadow-[0_15px_40px_rgba(239,68,68,0.1)] flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md animate-pulse">Live Now</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2 font-medium">Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}</p>
                      <p className="text-xs text-neutral-500 mt-2">🕒 {room.schedule_info}</p>
                      
                      {/* دکمه‌های اکشن برای کلاس لایو */}
                      <div className="mt-auto pt-6 flex gap-2">
                        <Link href={`/en/dashboard/live-classes/${room.id}`} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          Join Studio
                        </Link>
                        <Link href={`/en/dashboard/live-classes/${room.id}`} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-all">
                          💬 Group
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ================= SCHEDULED / ARCHIVED CLASSES SECTION ================= */}
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
                    <div key={room.id} className="rounded-3xl border border-white/5 bg-white/5 p-6 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Standby</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2">Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}</p>
                      <p className="text-xs text-neutral-500 mt-2">📅 {room.schedule_info}</p>
                      
                      {/* دکمه‌های اکشن برای کلاس‌های عادی */}
                      <div className="mt-auto pt-6 flex gap-2">
                        <Link href={`/en/dashboard/live-classes/${room.id}`} className="flex-1 bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                          💬 Open Group Chat
                        </Link>
                        <Link href={`/en/dashboard/live-classes/${room.id}`} className="bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-all title='View Recordings'">
                          📼
                        </Link>
                      </div>
                    </div>
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