"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Video, MessageCircle, Clock, Calendar, Users, Loader2, ArrowLeft, ExternalLink, User, ShieldCheck, Layers, BadgeAlert, Settings, GraduationCap, FileText, FolderArchive } from "lucide-react";

type LiveClassDetails = {
  id: string;
  class_name: string;
  class_days: string | null;
  class_time: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  is_active: boolean;
  student_count: number;
  
  // اطلاعات اساتید از جدول courses
  course_title: string;
  instructor_name: string | null;
  instructor_bio: string | null;
  instructor_image_url: string | null;
  instructor_2_name: string | null;
  instructor_2_bio: string | null;
  instructor_2_image_url: string | null;
};

export default function LiveClassDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // استخراج امن آی‌دی از URL
  const classId = params?.classId as string;

  const [classDetails, setClassDetails] = useState<LiveClassDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    let isMounted = true;

    const fetchClassDetails = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
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
            courses(
              title,
              instructor_name,
              instructor_bio,
              instructor_image_url,
              instructor_2_name,
              instructor_2_bio,
              instructor_2_image_url
            )
          `)
          .eq("id", classId)
          .maybeSingle(); // 🔥 استفاده از maybeSingle برای جلوگیری از کرش کردن سیستم در صورت نبودن دیتا

        if (error) throw error;

        if (data && isMounted) {
          const courseData = Array.isArray(data.courses) ? data.courses[0] : data.courses;
          
          setClassDetails({
            id: data.id,
            class_name: data.class_name,
            class_days: data.class_days || "Not Set",
            class_time: data.class_time || "Not Set",
            meeting_link: data.meeting_link,
            signal_group_link: data.signal_group_link,
            is_active: data.is_active,
            student_count: data.class_students ? data.class_students.length : 0,
            
            course_title: courseData?.title || "Untitled Course",
            instructor_name: courseData?.instructor_name,
            instructor_bio: courseData?.instructor_bio,
            instructor_image_url: courseData?.instructor_image_url,
            instructor_2_name: courseData?.instructor_2_name,
            instructor_2_bio: courseData?.instructor_2_bio,
            instructor_2_image_url: courseData?.instructor_2_image_url,
          });
        } else if (!data && isMounted) {
          setClassDetails(null);
        }
      } catch (error) {
        console.error("Error fetching live class hub data:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchClassDetails();

    return () => {
      isMounted = false;
    };
  }, [classId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Opening Control Room...</p>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <BadgeAlert size={64} className="text-red-500" />
        <h2 className="text-3xl font-black">Class Not Found</h2>
        <p className="text-neutral-500 text-sm">The live class you are looking for does not exist or was removed.</p>
        <Link href="/en/teacher/live-classes" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-purple-400 font-bold flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Return to Live Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out] relative overflow-hidden pb-32" dir="ltr">
      
      {/* ================= BACKGROUND AMBIENT GLOWS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-32 bg-purple-500/10 blur-[60px] pointer-events-none"></div>
          
          <Link href="/en/teacher/live-classes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-purple-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 relative z-10">
            <ArrowLeft size={14} /> Live Classes Terminal
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 relative z-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-md mb-2 inline-block shadow-inner">
                {classDetails.course_title}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">{classDetails.class_name}</h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Control panel for managing live broadcast, students, and cohort operations.</p>
            </div>
            
            <div className={`px-5 py-3 rounded-2xl border text-[11px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg ${classDetails.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.15)]' : 'bg-white/5 text-neutral-500 border-white/5'}`}>
              {classDetails.is_active ? <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div> : <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>}
              {classDetails.is_active ? "Broadcast Active" : "Standby Mode"}
            </div>
          </div>
        </header>

        {/* ================= CORE INFORMATION & LINKS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left/Middle: Live Broadcast Control & Links */}
          <div className="lg:col-span-2 bg-[#0a0a0f]/60 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3">
                <Layers size={18} /> Connectivity Channels
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                  <Calendar size={24} className="text-purple-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Weekly Schedule</p>
                    <p className="text-sm font-black text-white mt-0.5 truncate">{classDetails.class_days}</p>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                  <Clock size={24} className="text-purple-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Class Timing</p>
                    <p className="text-sm font-black text-white mt-0.5 truncate">{classDetails.class_time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
              {classDetails.meeting_link ? (
                <a 
                  href={classDetails.meeting_link} target="_blank" rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black uppercase tracking-[0.15em] text-xs py-4.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(168,85,247,0.2)] active:scale-[0.98]"
                >
                  <Video size={18} /> Launch Live Room <ExternalLink size={12} />
                </a>
              ) : (
                <div className="bg-neutral-900 border border-white/5 text-neutral-600 font-black uppercase tracking-[0.15em] text-xs py-4.5 rounded-2xl text-center flex items-center justify-center gap-2.5 cursor-not-allowed">
                  <Video size={18} /> No Live Link Set
                </div>
              )}

              {classDetails.signal_group_link ? (
                <a 
                  href={classDetails.signal_group_link} target="_blank" rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-black uppercase tracking-[0.15em] text-xs py-4.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <MessageCircle size={18} className="text-fuchsia-400" /> Open Signal Channel <ExternalLink size={12} />
                </a>
              ) : (
                <div className="bg-transparent border border-dashed border-white/5 text-neutral-600 font-black uppercase tracking-[0.15em] text-xs py-4.5 rounded-2xl text-center flex items-center justify-center gap-2.5 cursor-not-allowed">
                  <MessageCircle size={18} /> No Signal Channel
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Counter Dashboard */}
          <div className="bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-white/5 rounded-[2.5rem] p-6 sm:p-8 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl h-full min-h-[250px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none"></div>
            <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-3xl flex items-center justify-center mb-6 shadow-inner relative z-10">
              <Users size={32} />
            </div>
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-2 relative z-10">Total Cohort Size</p>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-3 relative z-10 drop-shadow-2xl">{classDetails.student_count}</h2>
            <p className="text-xs text-neutral-400 font-medium max-w-[200px] relative z-10">Active enrolled students assigned to this specific group.</p>
          </div>
        </div>

        {/* ================= NEW SECTION: QUICK OPERATIONS (4 CARDS) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
           
           {/* Manage Roster */}
           <Link href={`/en/teacher/courses/${classId}/students`} className="bg-[#0a0a0f]/60 border border-white/5 hover:border-purple-500/30 rounded-[1.5rem] p-5 flex flex-col gap-4 transition-all duration-300 group shadow-xl">
             <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
               <GraduationCap size={20} />
             </div>
             <div>
               <h3 className="text-base font-black text-white group-hover:text-purple-400 transition-colors">Manage Roster</h3>
               <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Add, remove, or score your students.</p>
             </div>
           </Link>

           {/* Class Settings */}
           <Link href={`/en/teacher/live-classes/${classId}/edit`} className="bg-[#0a0a0f]/60 border border-white/5 hover:border-fuchsia-500/30 rounded-[1.5rem] p-5 flex flex-col gap-4 transition-all duration-300 group shadow-xl">
             <div className="w-12 h-12 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
               <Settings size={20} />
             </div>
             <div>
               <h3 className="text-base font-black text-white group-hover:text-fuchsia-400 transition-colors">Class Settings</h3>
               <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Update schedule, timings, and links.</p>
             </div>
           </Link>

           {/* Attendance Logs */}
           <div className="bg-[#0a0a0f]/60 border border-white/5 hover:border-emerald-500/30 rounded-[1.5rem] p-5 flex flex-col gap-4 transition-all duration-300 group shadow-xl cursor-pointer">
             <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
               <FileText size={20} />
             </div>
             <div>
               <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">Attendance</h3>
               <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Review session participation logs.</p>
             </div>
           </div>

           {/* Class Materials */}
           <div className="bg-[#0a0a0f]/60 border border-white/5 hover:border-amber-500/30 rounded-[1.5rem] p-5 flex flex-col gap-4 transition-all duration-300 group shadow-xl cursor-pointer">
             <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
               <FolderArchive size={20} />
             </div>
             <div>
               <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">Materials</h3>
               <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Upload resources for this cohort.</p>
             </div>
           </div>

        </div>

        {/* ================= SECTION: FACULTY & INSTRUCTORS (FIXED DESIGN) ================= */}
        <div className="space-y-6 sm:space-y-8 pt-4 border-t border-white/5">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <Users size={22} className="text-purple-400" /> Assigned Faculty Instructors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Instructor 1: Main Faculty */}
            <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 hover:border-purple-500/20 transition-all duration-300 flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-400 border-l border-b border-white/5 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck size={12} /> Primary Instructor
              </div>
              
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center shrink-0 mt-4 xl:mt-0">
                {classDetails.instructor_image_url ? (
                  <img src={classDetails.instructor_image_url} alt="Primary Faculty" className="w-full h-full object-cover grayscale-[10%]" />
                ) : (
                  <User size={40} className="text-neutral-600" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-2">
                <h4 className="text-xl sm:text-2xl font-black text-white mb-2 truncate">{classDetails.instructor_name || "Verified Faculty"}</h4>
                {/* 🔥 استفاده از line-clamp برای جلوگیری از بهم ریختن دیزاین با متن طولانی */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium line-clamp-3">
                  {classDetails.instructor_bio || "Academy Senior Faculty member assigned to broadcast this module live."}
                </p>
              </div>
            </div>

            {/* Instructor 2: Co-Faculty */}
            <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 hover:border-fuchsia-500/20 transition-all duration-300 flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-fuchsia-500/10 text-fuchsia-400 border-l border-b border-white/5 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                Co-Instructor
              </div>
              
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center shrink-0 mt-4 xl:mt-0">
                {classDetails.instructor_2_image_url ? (
                  <img src={classDetails.instructor_2_image_url} alt="Co-Faculty" className="w-full h-full object-cover grayscale-[10%]" />
                ) : (
                  <User size={40} className="text-neutral-600" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-2">
                <h4 className="text-xl sm:text-2xl font-black text-white mb-2 truncate">{classDetails.instructor_2_name || "Assistant / Co-Faculty"}</h4>
                {/* 🔥 محدود کردن متن به 3 خط */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium line-clamp-3">
                  {classDetails.instructor_2_bio || "Assigned co-instructor managing curriculum assets and live operations for this module."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}