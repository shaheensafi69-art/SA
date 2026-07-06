"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type GlobalClass = {
  id: string;
  class_name: string;
  is_active: boolean;
  teacher: { first_name: string; last_name: string } | null;
  enrolled_count: number;
};

export default function AdminGlobalLiveClasses() {
  const [classes, setClasses] = useState<GlobalClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllClassesGlobally();
  }, []);

  const fetchAllClassesGlobally = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ادمین نیازی به فیلتر ندارد، همه کلاس‌های شبکه را می‌خوانیم
      const { data } = await supabase
        .from("class_groups")
        .select(`id, class_name, is_active, teacher:profiles!teacher_id(first_name, last_name), class_students(student_id)`)
        .order("is_active", { ascending: false });

      if (data) {
        const formatted = data.map((cls: any) => ({
          ...cls,
          teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher,
          enrolled_count: cls.class_students ? cls.class_students.length : 0
        }));
        setClasses(formatted);
      }
    } catch (error) {
      console.error("Error loading global classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeClasses = classes.filter(c => c.is_active);
  const inactiveClasses = classes.filter(c => !c.is_active);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden">
      {/* رادارهای نظارتی پس‌زمینه */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border border-indigo-500/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] border border-purple-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* هدر نظارتی ادمین */}
        <header className="rounded-[2.5rem] border border-white/10 bg-neutral-950/80 p-10 backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
               <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">Global Monitoring</p>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Live Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Control</span></h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">Oversee all active broadcasts across the academy. Access any room instantly as a super supervisor.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-black/50 border border-white/5 rounded-2xl p-4 text-center min-w-[120px]">
               <p className="text-3xl font-black text-red-500">{activeClasses.length}</p>
               <p className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Live Now</p>
             </div>
             <div className="bg-black/50 border border-white/5 rounded-2xl p-4 text-center min-w-[120px]">
               <p className="text-3xl font-black text-white">{classes.length}</p>
               <p className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Total Rooms</p>
             </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* ستون اصلی: کلاس‌های در حال برگزاری */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4">Currently Broadcasting</h2>
              
              {activeClasses.length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-10 text-center text-neutral-500">
                   Network is quiet. No classes are broadcasting.
                </div>
              ) : (
                <div className="grid gap-4">
                  {activeClasses.map((room) => (
                    <div key={room.id} className="rounded-3xl border border-red-500/30 bg-black p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <span className="bg-red-500 text-black text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">Live</span>
                           <span className="text-xs font-mono text-neutral-500">ID: {room.id.substring(0,8)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{room.class_name}</h3>
                        <p className="text-sm text-neutral-400 mt-1">Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Unknown"}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="text-right hidden sm:block">
                           <p className="text-xl font-black text-white">{room.enrolled_count}</p>
                           <p className="text-[9px] uppercase tracking-widest text-neutral-500">Students</p>
                        </div>
                        {/* ورود ادمین به صورت مستقیم به کلاس */}
                        <Link href={`/en/admin/live-classes/${room.id}`} className="flex-1 sm:flex-none text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/10">
                          Monitor Room
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ستون کناری: کلاس‌های غیرفعال */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-500 border-b border-white/10 pb-4">Offline Network</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {inactiveClasses.map((room) => (
                  <div key={room.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex justify-between items-center group hover:bg-white/[0.05] transition-all">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">{room.class_name}</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">{room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Unknown"}</p>
                    </div>
                    <Link href={`/en/admin/live-classes/${room.id}`} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
                      →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}