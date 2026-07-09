"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ClassGroup = {
  id: string;
  class_name: string;
  schedule_info: string;
  is_active: boolean;
  start_date: string;
  enrolled_count: number;
};

export default function TeacherOverview() {
  const [instructor, setInstructor] = useState({ first_name: "Instructor", avatar: "" });
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalClasses: 0, pendingAssignments: 45 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return router.push("/en/login");
      const userId = session.user.id;

      try {
        // ۱. دریافت اطلاعات پروفایل استاد
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, avatar_url")
          .eq("id", userId)
          .single();
          
        if (profile) {
          setInstructor({
            first_name: profile.first_name || "Instructor",
            avatar: profile.avatar_url || "",
          });
        }

        // ۲. دریافت کلاس‌های این استاد همراه با تعداد شاگردان
        const { data: classData, error } = await supabase
          .from("class_groups")
          .select(`id, class_name, schedule_info, is_active, start_date, class_students(student_id)`)
          .eq("teacher_id", userId)
          .order("is_active", { ascending: false }) // کلاس‌های لایو در صدر قرار می‌گیرند
          .order("start_date", { ascending: true })
          .limit(6); // نمایش حداکثر ۶ کلاس در داشبورد اصلی

        if (error) throw error;

        if (classData) {
          let totalStudentsCount = 0;
          const formattedClasses = classData.map((cls: any) => {
            const studentsCount = cls.class_students ? cls.class_students.length : 0;
            totalStudentsCount += studentsCount; // جمع کل شاگردان
            return {
              ...cls,
              enrolled_count: studentsCount
            };
          });

          setClasses(formattedClasses);
          
          // بروزرسانی آمار واقعی بالای صفحه
          setStats({
            totalStudents: totalStudentsCount,
            totalClasses: classData.length,
            pendingAssignments: 12 // فعلاً عدد نمایشی تا جدول تکالیف ساخته شود
          });
        }
      } catch (error) {
        console.error("Error loading teacher dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full relative min-h-screen bg-[#020202] font-sans pb-12 overflow-hidden">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-10%] w-[30vw] h-[30vw] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* ================= HEADER ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-500">{isLoading ? "..." : instructor.first_name}</span>!
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Here is your live command center and upcoming schedule.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/en/teacher/live-classes" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 hidden sm:flex items-center gap-2">
            <span>🔴</span> Go to Studio
          </Link>
          
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] bg-neutral-800 flex items-center justify-center shrink-0">
            {instructor.avatar ? (
              <img src={instructor.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-indigo-400">{instructor.first_name.charAt(0) || "T"}</span>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="px-8 md:px-12 pt-8 max-w-7xl mx-auto relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 rounded-3xl border border-white/5 flex flex-col shadow-xl hover:-translate-y-1 transition-transform group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">👥</div>
            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Students</p>
            <h3 className="text-3xl font-black text-white">{isLoading ? "-" : stats.totalStudents}</h3>
          </div>
          
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 rounded-3xl border border-white/5 flex flex-col shadow-xl hover:-translate-y-1 transition-transform group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">🔴</div>
            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-1">Active Classrooms</p>
            <h3 className="text-3xl font-black text-white">{isLoading ? "-" : stats.totalClasses}</h3>
          </div>

          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 rounded-3xl border border-white/5 flex flex-col shadow-xl hover:-translate-y-1 transition-transform group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">📝</div>
            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-1">Assignments to Review</p>
            <h3 className="text-3xl font-black text-white">{isLoading ? "-" : stats.pendingAssignments}</h3>
          </div>
        </div>

        {/* ================= DYNAMIC LIVE CLASSES SECTION ================= */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-3">
              My Live Classes Hub
            </h2>
            <p className="text-neutral-500 text-xs mt-1">Manage your active broadcasts and upcoming sessions.</p>
          </div>
          <Link href="/en/teacher/live-classes" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-widest transition-colors hidden sm:block">
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="w-full h-64 bg-neutral-900/40 border border-white/5 rounded-3xl flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="bg-gradient-to-b from-neutral-900/50 to-black border border-white/5 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">No Classes Assigned Yet</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8">You haven't been assigned to any live classes yet. Check back later or contact the administration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {classes.map((room) => (
              <div 
                key={room.id} 
                className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1 ${
                  room.is_active 
                    ? "bg-gradient-to-br from-red-950/40 via-neutral-900 to-black border border-red-500/40 hover:border-red-500" 
                    : "bg-gradient-to-br from-indigo-950/20 via-neutral-900/80 to-black border border-white/5 hover:border-indigo-500/40"
                }`}
              >
                {/* افکت نوری پس‌زمینه کارت */}
                {room.is_active && <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>}

                <div className="relative z-10 mb-8">
                  <div className="flex justify-between items-start mb-5">
                    {room.is_active ? (
                      <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md animate-pulse flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span> Live Now
                      </span>
                    ) : (
                      <span className="bg-white/10 text-neutral-300 border border-white/10 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                        Standby
                      </span>
                    )}
                    <span className="text-xl bg-white/5 w-10 h-10 flex items-center justify-center rounded-full border border-white/5">{room.is_active ? "🎙️" : "📅"}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight">{room.class_name}</h3>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 bg-black/50 px-3 py-2 rounded-xl border border-white/5">
                      <span className="text-indigo-400">🕒</span> {room.schedule_info}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 bg-black/50 px-3 py-2 rounded-xl border border-white/5">
                      <span className="text-fuchsia-400">👥</span> {room.enrolled_count} Students
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                  <Link 
                    href={`/en/teacher/live-classes/${room.id}`} 
                    className={`w-full font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      room.is_active 
                        ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_10px_25px_rgba(220,38,38,0.4)] group-hover:scale-[1.02]" 
                        : "bg-white/10 hover:bg-indigo-600 text-white hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)]"
                    }`}
                  >
                    {room.is_active ? "Enter Live Studio" : "Prepare Room"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}