"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Video, MessageCircle, Clock, Calendar, Users, MonitorPlay, Loader2, Layers, Activity, ArrowLeft, Settings2 } from "lucide-react";

type LiveClass = {
  id: string;
  class_name: string;
  class_days: string | null;
  class_time: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  is_active: boolean;
  student_count: number;
  thumbnail_url: string | null;
  category: string | null;
};

export default function TeacherLiveClassesPage() {
  const router = useRouter();
  const [classGroups, setClassGroups] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    const teacherId = session.user.id;

    try {
      // 🔥 لود کاملاً داینامیک کلاس‌های لایو استاد همراه با عکس کورس و تعداد شاگردان
      const { data: classesData, error: classesError } = await supabase
        .from("class_groups")
        .select(`
          id, 
          class_name, 
          class_days,
          class_time,
          meeting_link,
          signal_group_link,
          is_active, 
          class_students(student_id),
          courses (thumbnail_url, category)
        `)
        .eq("teacher_id", teacherId)
        .order("is_active", { ascending: false }); // ابتدا کلاس‌های فعال را نشان بده

      if (classesError) throw classesError;

      if (classesData) {
        const formattedClasses = classesData.map((cls: any) => {
          const courseData = Array.isArray(cls.courses) ? cls.courses[0] : cls.courses;
          return {
            id: cls.id,
            class_name: cls.class_name,
            class_days: cls.class_days || "Not Set",
            class_time: cls.class_time || "Not Set",
            meeting_link: cls.meeting_link,
            signal_group_link: cls.signal_group_link,
            is_active: cls.is_active,
            student_count: cls.class_students ? cls.class_students.length : 0,
            thumbnail_url: courseData?.thumbnail_url || null,
            category: courseData?.category || "Live Cohort"
          };
        });
        setClassGroups(formattedClasses);
      }

    } catch (error) {
      console.error("Error syncing live classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.5s_ease-out] relative overflow-hidden pb-32" dir="ltr">
      
      {/* ================= BACKGROUND AMBIENT GLOWS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 space-y-10 sm:space-y-16">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/5 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-inner shrink-0">
              <Activity size={32} className="animate-pulse" />
            </div>
            <div>
              <Link href="/en/teacher/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ArrowLeft size={12} /> Dashboard
              </Link>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Streaming</span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-md leading-relaxed tracking-wide">
                Launch live lectures, manage active channels, and connect with your cohorts instantly.
              </p>
            </div>
          </div>
        </header>

        {/* ================= LIVE CLASSES GRID ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Connecting Live Streams...</p>
          </div>
        ) : classGroups.length === 0 ? (
          <div className="text-center py-24 sm:py-40 bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md mx-2 sm:mx-0 shadow-2xl">
            <MonitorPlay size={64} className="text-neutral-700 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-4">No Live Broadcasts</h3>
            <p className="text-neutral-400 text-sm max-w-xs mx-auto leading-relaxed">You haven't scheduled any live cohorts yet. Go to your courses to initialize a class.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {classGroups.map((cls) => (
              <div key={cls.id} className={`bg-[#0a0a0f] border rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl flex flex-col hover:-translate-y-2 relative ${cls.is_active ? 'border-purple-500/30 hover:shadow-[0_30px_60px_rgba(168,85,247,0.15)]' : 'border-white/5 hover:border-white/10'}`}>
                
                {/* Image & Status Badges */}
                <div className="h-48 sm:h-56 bg-neutral-900 relative overflow-hidden shrink-0 border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10"></div>
                  
                  {cls.thumbnail_url ? (
                    <img src={cls.thumbnail_url} alt={cls.class_name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-black opacity-30">
                      <Layers size={48} className="text-neutral-500" />
                    </div>
                  )}
                  
                  <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-start">
                    <span className="backdrop-blur-xl bg-black/50 text-neutral-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                      {cls.category}
                    </span>
                    
                    <span className={`backdrop-blur-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl border flex items-center gap-2 shadow-2xl ${cls.is_active ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-black/60 text-neutral-400 border-white/10'}`}>
                      {cls.is_active && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></span>}
                      {cls.is_active ? "LIVE NOW" : "Standby"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20 bg-[#0a0a0f]">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 mb-6 leading-tight tracking-tight">
                    {cls.class_name}
                  </h3>
                  
                  {/* Timings & Rosters */}
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-center justify-between gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 group-hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Calendar size={16} className="text-purple-500 shrink-0"/> 
                        <span className="text-[11px] sm:text-xs font-black text-neutral-300 uppercase tracking-widest truncate">{cls.class_days}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 shadow-inner">
                        <Clock size={12} /> {cls.class_time}
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 text-neutral-300 text-xs sm:text-sm font-bold bg-white/[0.02] px-4 py-4 rounded-2xl border border-white/5">
                      <Users size={18} className="text-purple-500 shrink-0"/> 
                      <span><strong className="text-white text-lg">{cls.student_count}</strong> Active Enrolled Students</span>
                    </div>
                  </div>
                  
                  {/* 🔥 دکمه اختصاصی برای رفتن به صفحه مدیریت کلاس 🔥 */}
                  <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-3">
                    <Link 
                      href={`/en/teacher/live-classes/${cls.id}`}
                      className="w-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 hover:from-purple-600/20 hover:to-fuchsia-600/20 border border-purple-500/20 hover:border-fuchsia-500/40 text-white font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                    >
                      <Settings2 size={16} className="text-fuchsia-400" /> Manage Class
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