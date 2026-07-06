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
      const { data } = await supabase
        .from("class_groups")
        .select(`id, class_name, schedule_info, is_active, start_date, class_students(student_id)`)
        .eq("teacher_id", session.user.id)
        .order("is_active", { ascending: false })
        .order("start_date", { ascending: true });

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
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        <header className="rounded-[2rem] border border-white/5 bg-neutral-950/60 p-8 backdrop-blur-2xl shadow-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-400 mb-2">Instructor Portal</p>
            <h1 className="text-3xl font-black tracking-tight">My Broadcasting <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Studio</span></h1>
          </div>
          <div className="hidden sm:block text-right">
             <p className="text-2xl font-black text-white">{classes.length}</p>
             <p className="text-[10px] uppercase tracking-widest text-neutral-500">Total Classes</p>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="space-y-10">
            {/* بخش کلاس‌های لایو استاد */}
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span> Active Sessions
              </h2>
              {activeClasses.length === 0 ? (
                 <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-neutral-500 text-sm">
                   You have no active broadcasts right now.
                 </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {activeClasses.map((room) => (
                    <div key={room.id} className="rounded-3xl border border-red-500/30 bg-red-950/10 p-6 flex justify-between items-center shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                       <div>
                         <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Live Now</span>
                         <h3 className="text-lg font-bold text-white mt-3">{room.class_name}</h3>
                         <p className="text-xs text-neutral-400 mt-1">{room.enrolled_count} Students Enrolled</p>
                       </div>
                       <Link href={`/en/teacher/live-classes/${room.id}`} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg">
                         Enter Studio
                       </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* بخش کلاس‌های آینده (Upcoming) */}
            <div>
              <h2 className="text-xl font-extrabold text-neutral-300 mb-6 flex items-center gap-2"><span>📅</span> Upcoming & Scheduled</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingClasses.map((room) => (
                  <div key={room.id} className="rounded-3xl border border-white/5 bg-white/5 p-6 hover:border-fuchsia-500/30 transition-all">
                    <h3 className="text-lg font-bold text-white">{room.class_name}</h3>
                    <div className="mt-4 space-y-2 text-xs text-neutral-400">
                      <p className="flex justify-between"><span>Schedule:</span> <span className="text-white">{room.schedule_info}</span></p>
                      <p className="flex justify-between"><span>Students:</span> <span className="text-white">{room.enrolled_count}</span></p>
                    </div>
                    <Link href={`/en/teacher/live-classes/${room.id}`} className="mt-6 block w-full text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all">
                      Prepare Room
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