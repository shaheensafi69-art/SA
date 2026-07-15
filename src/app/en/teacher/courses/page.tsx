"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Users, UserPlus, Loader2, PlusCircle, Video, Settings2, Clock, Calendar, MonitorPlay, Layers, Activity } from "lucide-react";

type ClassGroup = {
  id: string;
  class_name: string;
  class_days: string | null;   // فیلد جدید: روزهای هفته
  class_time: string | null;   // فیلد جدید: ساعت کلاس
  is_active: boolean;
  student_count: number;
  thumbnail_url: string | null; // داینامیک از جدول کورس
  category: string | null;      // داینامیک از جدول کورس
};

export default function TeacherCoursesPage() {
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveClasses();
  }, []);

  const fetchActiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const teacherId = session.user.id;

    try {
      // 🔥 Join حرفه‌ای به جدول کورس برای گرفتن عکس + دریافت فیلد روز و ساعت
      const { data: classesData, error: classesError } = await supabase
        .from("class_groups")
        .select(`
          id, 
          class_name, 
          class_days,
          class_time,
          is_active, 
          class_students(student_id),
          courses (thumbnail_url, category)
        `)
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });

      if (classesError) throw classesError;

      if (classesData) {
        const formattedClasses = classesData.map((cls: any) => {
          const courseData = Array.isArray(cls.courses) ? cls.courses[0] : cls.courses;
          return {
            id: cls.id,
            class_name: cls.class_name,
            class_days: cls.class_days || "Not Set",
            class_time: cls.class_time || "Not Set",
            is_active: cls.is_active,
            student_count: cls.class_students ? cls.class_students.length : 0,
            thumbnail_url: courseData?.thumbnail_url || null,
            category: courseData?.category || "Academy Cohort"
          };
        });
        setClassGroups(formattedClasses);
      }

    } catch (error) {
      console.error("DB Sync Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.5s_ease-out] relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 space-y-10 sm:space-y-16">
        
        {/* ================= HEADER (Premium Glass Style) ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-neutral-900/40 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/5 text-fuchsia-400 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 shadow-inner shrink-0">
              <Layers size={32} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                <Activity size={12} className="text-fuchsia-500" /> Professional Terminal
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Scheduler</span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-md leading-relaxed tracking-wide">
                Real-time database integration for managing class timings, weekly days, and cohort enrollment.
              </p>
            </div>
          </div>
          
          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto relative z-10">
            <Link href="/en/teacher/classes/create" className="w-full sm:w-auto px-8 py-4 bg-black/50 hover:bg-[#111116] border border-white/10 hover:border-purple-500/30 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl">
              <Video size={18} className="text-purple-400" /> Create Class
            </Link>
            <Link href="/en/teacher/courses/create" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(217,70,239,0.3)] flex items-center justify-center gap-3 active:scale-95">
              <PlusCircle size={18} /> Create Course
            </Link>
          </div>
        </header>

        {/* ================= CLASSES DYNAMIC GRID ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Synchronizing Schedules...</p>
          </div>
        ) : classGroups.length === 0 ? (
          <div className="text-center py-24 sm:py-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md mx-2 sm:mx-0 shadow-2xl relative">
            <MonitorPlay size={64} className="text-neutral-700 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-4">No Schedules Found</h3>
            <p className="text-neutral-400 text-sm max-w-xs mx-auto leading-relaxed">Your teaching calendar is currently empty. Start by initializing a new classroom group.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {classGroups.map((cls) => (
              <div key={cls.id} className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-fuchsia-500/30 transition-all duration-500 shadow-2xl flex flex-col hover:-translate-y-2 relative">
                
                {/* Image & Badges */}
                <div className="h-48 sm:h-56 bg-neutral-900 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10"></div>
                  
                  {cls.thumbnail_url ? (
                    <img src={cls.thumbnail_url} alt={cls.class_name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-black opacity-30">
                      <Layers size={48} className="text-neutral-500" />
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-start">
                    <span className="backdrop-blur-xl bg-black/50 text-neutral-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                      {cls.category}
                    </span>
                    
                    <span className={`backdrop-blur-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl border flex items-center gap-2 shadow-2xl ${cls.is_active ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-black/60 text-neutral-400 border-white/10'}`}>
                      {cls.is_active && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                      {cls.is_active ? "Active" : "Standby"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20 bg-[#0a0a0f]">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-fuchsia-400 transition-colors duration-300 line-clamp-2 mb-6 leading-tight tracking-tight">
                    {cls.class_name}
                  </h3>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-center justify-between gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Calendar size={16} className="text-fuchsia-500 shrink-0"/> 
                        <span className="text-[11px] sm:text-xs font-black text-neutral-300 uppercase tracking-widest truncate">{cls.class_days}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 shadow-inner">
                        <Clock size={12} /> {cls.class_time}
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 text-neutral-300 text-xs sm:text-sm font-bold bg-white/[0.03] px-4 py-4 rounded-2xl border border-white/5">
                      <Users size={18} className="text-fuchsia-500 shrink-0"/> 
                      <span><strong className="text-white text-lg">{cls.student_count}</strong> Active Students</span>
                    </div>
                  </div>
                  
                  {/* 🔥 Action Links (Add Student & Manage Cohort) 🔥 */}
                <div className="mt-auto border-t border-white/5 pt-6 flex gap-3">
                  <Link 
                    // مسیر مستقیم به صفحه افزودن با پارامتر action=add برای باز شدن خودکار مودال
                    href={`/en/teacher/courses/${cls.id}/students/add`} 
                    className="flex-1 flex items-center justify-center gap-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 hover:border-fuchsia-500/40 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-fuchsia-400 hover:text-fuchsia-300 py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg"
                  >
                    <UserPlus size={16} /> Add Student
                  </Link>
                  <Link 
                    // مسیر صفحه مدیریت لیست شاگردان
                    href={`/en/teacher/courses/${cls.id}/students`} 
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-neutral-400 hover:text-white py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/50"
                  >
                    <Settings2 size={16} /> Manage
                  </Link>
                </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}