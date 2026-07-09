"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type ClassGroup = {
  id: string;
  class_name: string;
  schedule_info: string;
  is_active: boolean;
  start_date: string;
  enrolled_count: number;
};

export default function TeacherLiveClasses() {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMyClasses();
  }, []);

  const fetchMyClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    // شناسایی استاد
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push("/en/login");

    try {
      // فقط کلاس‌هایی که teacher_id آن‌ها برابر با آیدی این استاد است خوانده می‌شود
      const { data, error } = await supabase
        .from("class_groups")
        .select(`id, class_name, schedule_info, is_active, start_date, class_students(student_id)`)
        .eq("teacher_id", session.user.id)
        .order("is_active", { ascending: false })
        .order("start_date", { ascending: true });

      if (error) throw error;

      if (data) {
        const formatted = data.map((cls: any) => ({
          ...cls,
          enrolled_count: cls.class_students ? cls.class_students.length : 0
        }));
        setClasses(formatted);
      }
    } catch (error) {
      console.error("Error loading teacher classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeClasses = classes.filter(c => c.is_active);
  const upcomingClasses = classes.filter(c => !c.is_active);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden font-sans">
      {/* افکت‌های نوری پس‌زمینه */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="rounded-[2rem] border border-white/5 bg-neutral-950/60 p-8 md:p-10 backdrop-blur-3xl shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(192,38,211,0.3)]">
               👨‍🏫
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-400 mb-1">Instructor Portal</p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">My Broadcasting <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Studio</span></h1>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center flex-shrink-0 min-w-[120px]">
             <p className="text-3xl font-black text-white leading-none mb-1">{isLoading ? "-" : classes.length}</p>
             <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Total Classes</p>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(192,38,211,0.5)]"></div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ================= Active Sessions ================= */}
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-3 mb-6 text-white">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Active Sessions
              </h2>
              
              {activeClasses.length === 0 ? (
                 <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.01] p-10 text-center text-neutral-500 text-sm backdrop-blur-sm">
                   You have no active broadcasts running at this exact moment.
                 </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {activeClasses.map((room) => (
                    <div key={room.id} className="group rounded-[2rem] border border-red-500/40 bg-gradient-to-br from-red-950/30 to-black p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(239,68,68,0.15)] hover:border-red-500 transition-all duration-300 hover:-translate-y-1">
                       <div className="mb-8">
                         <div className="flex justify-between items-start mb-4">
                           <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md animate-pulse">Live Now</span>
                           <span className="text-xl bg-white/5 w-10 h-10 flex items-center justify-center rounded-full text-red-400">🎙️</span>
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2">{room.class_name}</h3>
                         <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 bg-black/40 inline-flex px-3 py-1.5 rounded-lg border border-white/5">
                           <span>👥</span> {room.enrolled_count} Students Waiting
                         </div>
                       </div>
                       
                       <Link href={`/en/teacher/live-classes/${room.id}`} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(220,38,38,0.4)] group-hover:scale-[1.02]">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                         Return to Studio
                       </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ================= Upcoming & Scheduled ================= */}
            <div>
              <h2 className="text-xl font-extrabold text-neutral-300 mb-6 flex items-center gap-3">
                <span className="text-fuchsia-500">📅</span> Upcoming & Scheduled
              </h2>
              
              {upcomingClasses.length === 0 ? (
                 <div className="rounded-[2rem] border border-white/5 bg-white/5 p-10 text-center text-neutral-500 text-sm">
                   No upcoming classes found in your schedule.
                 </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingClasses.map((room) => (
                    <div key={room.id} className="group rounded-[2rem] border border-white/5 bg-neutral-900/40 p-6 hover:border-fuchsia-500/40 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between h-full backdrop-blur-sm">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                           <span className="bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Standby</span>
                           <span className="text-neutral-600 group-hover:text-fuchsia-400 transition-colors">→</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-fuchsia-300 transition-colors">{room.class_name}</h3>
                        
                        <div className="space-y-3 mb-8">
                          <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Schedule</span>
                            <span className="text-xs font-medium text-white">{room.schedule_info}</span>
                          </div>
                          <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Enrolled</span>
                            <span className="text-xs font-medium text-white bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded">{room.enrolled_count} Students</span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/en/teacher/live-classes/${room.id}`} className="mt-auto block w-full text-center bg-white/5 hover:bg-fuchsia-600 border border-white/10 hover:border-fuchsia-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md">
                        Prepare Room
                      </Link>
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