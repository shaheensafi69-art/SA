"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Video, MessageSquare, ExternalLink } from "lucide-react";

type ClassGroup = {
  id: string;
  class_name: string;
  schedule_info: string;
  is_active: boolean;
  start_date: string;
  enrolled_count: number;
  meeting_link: string | null;
  signal_group_link: string | null;
};

export default function TeacherOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const [instructor, setInstructor] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
    wallet: 0
  });

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    pendingGrading: 0,
    todayAttendance: 0, // آمار حاضری امروز که هر ۲۴ ساعت خودکار ریست می‌شود
  });

  const [classes, setClasses] = useState<ClassGroup[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return router.push("/en/login");
      const userId = session.user.id;

      try {
        // ۱. دریافت پروفایل استاد
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, email, wallet_balance")
          .eq("id", userId)
          .single();

        if (profile) {
          setInstructor({
            first_name: profile.first_name || "Instructor",
            last_name: profile.last_name || "",
            avatar: profile.avatar_url || "",
            email: profile.email || session.user.email || "",
            wallet: profile.wallet_balance || 0
          });
        }

        // ۲. دریافت کلاس‌های استاد همراه با لینک‌های تدریس
        const { data: classData, error } = await supabase
          .from("class_groups")
          .select(`id, class_name, schedule_info, is_active, start_date, meeting_link, signal_group_link, class_students(student_id)`)
          .eq("teacher_id", userId)
          .order("is_active", { ascending: false })
          .order("start_date", { ascending: true })
          .limit(4);

        if (error) throw error;

        let totalStudentsCount = 0;
        let classIds: string[] = [];

        if (classData) {
          classIds = classData.map(c => c.id);
          const formattedClasses = classData.map((cls: any) => {
            const studentsCount = cls.class_students ? cls.class_students.length : 0;
            totalStudentsCount += studentsCount;
            return { ...cls, enrolled_count: studentsCount };
          });
          setClasses(formattedClasses);
        }

        // ۳. استخراج هوشمند تعداد تکالیف در انتظار نمره (بدون دیتای فیک)
        let pendingCount = 0;
        const { data: myCourses } = await supabase.from("courses").select("id").eq("teacher_id", userId);
        
        if (myCourses && myCourses.length > 0) {
          const courseIds = myCourses.map(c => c.id);
          const { data: myAssignments } = await supabase.from("assignments").select("id").in("course_id", courseIds);
          
          if (myAssignments && myAssignments.length > 0) {
            const assignmentIds = myAssignments.map(a => a.id);
            // گرفتن تکالیفی که ثبت شده‌اند اما هنوز نمره (grade) ندارند
            const { count } = await supabase.from("assignment_submissions")
              .select("id", { count: "exact", head: true })
              .in("assignment_id", assignmentIds)
              .is("grade", null);
              
            pendingCount = count || 0;
          }
        }

        // ۴. سیستم حاضر غیاب هوشمند (ریستارت خودکار ۲۴ ساعته)
        let todayAttCount = 0;
        if (classIds.length > 0) {
          const today = new Date().toISOString().split('T')[0]; // فقط تاریخ امروز
          const { count } = await supabase.from("attendance_logs")
            .select("id", { count: "exact", head: true })
            .in("class_group_id", classIds)
            .eq("session_date", today)
            .eq("status", "present");
            
          todayAttCount = count || 0;
        }

        // ثبت نهایی آمار واقعی در استیت
        setStats({
          totalStudents: totalStudentsCount,
          totalClasses: classData?.length || 0,
          pendingGrading: pendingCount,
          todayAttendance: todayAttCount
        });

      } catch (error) {
        console.error("Error loading teacher dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
         <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden bg-transparent font-sans" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-[-10%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="px-6 md:px-12 pt-8 pb-32 max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* ================= 1. PREMIUM PROFILE BOX ================= */}
        <div className="relative w-full bg-gradient-to-br from-neutral-900/90 to-black border border-white/10 rounded-[2.5rem] p-6 md:p-10 overflow-hidden shadow-2xl animate-[fadeIn_0.4s_ease-out] group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] group-hover:bg-fuchsia-500/20 transition-all duration-700 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-neutral-800 border-2 border-fuchsia-500/30 p-1.5 shrink-0 shadow-[0_0_30px_rgba(217,70,239,0.15)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-neutral-900 flex items-center justify-center">
                {instructor.avatar ? (
                  <img src={instructor.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-fuchsia-500">{instructor.first_name.charAt(0)}</span>
                )}
              </div>
            </div>
            
            <div className="flex-1 pt-2">
              <div className="inline-block px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg text-fuchsia-400 text-[10px] font-black uppercase tracking-widest mb-3">
                Academy Instructor
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1">
                {instructor.first_name} {instructor.last_name}
              </h2>
              <p className="text-sm text-neutral-400 font-medium">{instructor.email}</p>
            </div>

            <div className="mt-4 md:mt-0 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center min-w-[140px] backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Wallet Balance</span>
              <span className="text-2xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">${instructor.wallet}</span>
            </div>
          </div>
        </div>

        {/* ================= 2. REAL-TIME STATS GRID (4 Columns) ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          <div className="bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 p-5 md:p-6 rounded-[2rem] flex flex-col items-center md:items-start md:flex-row gap-4 hover:-translate-y-1.5 transition-all duration-300 shadow-lg cursor-default">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-500/10 rounded-[1rem] flex items-center justify-center text-2xl">👥</div>
            <div className="text-center md:text-left">
              <p className="text-indigo-400/70 text-[9px] font-black uppercase tracking-widest mb-0.5">Students</p>
              <h3 className="text-2xl font-black text-white">{stats.totalStudents}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-900/20 to-black border border-fuchsia-500/20 p-5 md:p-6 rounded-[2rem] flex flex-col items-center md:items-start md:flex-row gap-4 hover:-translate-y-1.5 transition-all duration-300 shadow-lg cursor-default">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-fuchsia-500/10 rounded-[1rem] flex items-center justify-center text-2xl">🔴</div>
            <div className="text-center md:text-left">
              <p className="text-fuchsia-400/70 text-[9px] font-black uppercase tracking-widest mb-0.5">Live Classes</p>
              <h3 className="text-2xl font-black text-white">{stats.totalClasses}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-900/20 to-black border border-rose-500/20 p-5 md:p-6 rounded-[2rem] flex flex-col items-center md:items-start md:flex-row gap-4 hover:-translate-y-1.5 transition-all duration-300 shadow-lg cursor-default">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-500/10 rounded-[1rem] flex items-center justify-center text-2xl relative">
               📝
               {stats.pendingGrading > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>}
            </div>
            <div className="text-center md:text-left">
              <p className="text-rose-400/70 text-[9px] font-black uppercase tracking-widest mb-0.5">Needs Grading</p>
              <h3 className="text-2xl font-black text-white">{stats.pendingGrading}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 p-5 md:p-6 rounded-[2rem] flex flex-col items-center md:items-start md:flex-row gap-4 hover:-translate-y-1.5 transition-all duration-300 shadow-lg cursor-default">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-[1rem] flex items-center justify-center text-2xl">✅</div>
            <div className="text-center md:text-left">
              <p className="text-emerald-400/70 text-[9px] font-black uppercase tracking-widest mb-0.5">Present Today</p>
              <h3 className="text-2xl font-black text-white">{stats.todayAttendance}</h3>
            </div>
          </div>

        </div>

        {/* ================= 3. BOTTOM SECTIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* بخش چپ: هاب کنترل کلاس‌ها (متصل به تیمز و سیگنال) */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white tracking-wide">Command Center</h2>
              <Link href="/en/teacher/live-classes" className="text-fuchsia-400 hover:text-fuchsia-300 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1">
                Manage Hubs →
              </Link>
            </div>
            
            {classes.length === 0 ? (
              <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center h-[220px]">
                <p className="text-neutral-400 font-bold mb-5">You are not assigned to any active classrooms yet.</p>
                <Link href="/en/teacher/courses" className="px-8 py-3.5 bg-fuchsia-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-fuchsia-500 transition-colors shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:scale-105">
                  View Course Materials
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((room) => (
                  <div key={room.id} className={`p-6 rounded-[1.5rem] border flex flex-col justify-between transition-all duration-300 ${
                    room.is_active 
                      ? "bg-gradient-to-br from-rose-950/40 to-black border-rose-500/30 hover:border-rose-500/60" 
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}>
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        {room.is_active ? (
                          <span className="bg-rose-500/20 text-rose-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">Live Now</span>
                        ) : (
                          <span className="bg-white/10 text-neutral-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">Standby</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mb-3 line-clamp-1">{room.class_name}</h3>
                      <p className="text-[10px] text-neutral-400 font-bold flex items-center gap-2 mb-1"><span className="text-fuchsia-400 text-sm">🕒</span> {room.schedule_info}</p>
                      <p className="text-[10px] text-neutral-400 font-bold flex items-center gap-2"><span className="text-purple-400 text-sm">👥</span> {room.enrolled_count} Students Enrolled</p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {room.meeting_link ? (
                        <a href={room.meeting_link} target="_blank" rel="noopener noreferrer" className={`py-2.5 rounded-lg text-center text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${
                          room.is_active ? "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "bg-white/10 text-neutral-300 hover:bg-white/20"
                        }`}>
                          <Video size={12} /> Launch Teams
                        </a>
                      ) : (
                        <button disabled className="py-2.5 rounded-lg text-center text-[9px] font-black uppercase tracking-widest bg-black/50 text-neutral-600 cursor-not-allowed border border-white/5">
                          No Link
                        </button>
                      )}

                      {room.signal_group_link ? (
                        <a href={room.signal_group_link} target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-lg text-center text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/40 hover:text-white">
                          <MessageSquare size={12} /> Open Signal
                        </a>
                      ) : (
                        <button disabled className="py-2.5 rounded-lg text-center text-[9px] font-black uppercase tracking-widest bg-black/50 text-neutral-600 cursor-not-allowed border border-white/5">
                          Unsynced
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>

          {/* بخش راست: ابزارهای استاد */}
          <section className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-0">
              <h2 className="text-lg font-black text-white tracking-wide">Instructor Tools</h2>
            </div>
            
            <Link href="/en/teacher/ai-assistant" className="rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-900/20 to-black p-6 relative overflow-hidden group hover:border-fuchsia-500/50 transition-all duration-300 shadow-lg hover:-translate-y-1 flex-1 min-h-[140px]">
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[40px] group-hover:bg-fuchsia-500/20 transition-all"></div>
               <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🤖</div>
                   <div>
                     <h3 className="font-black text-white">AI Teaching Assistant</h3>
                     <p className="text-[10px] text-fuchsia-200/60 mt-0.5">Generate quizzes & grading</p>
                   </div>
                 </div>
               </div>
            </Link>

            <Link href="/en/teacher/assignments" className="rounded-[2rem] border border-rose-500/20 bg-gradient-to-br from-rose-900/20 to-black p-6 relative overflow-hidden group hover:border-rose-500/50 transition-all duration-300 shadow-lg hover:-translate-y-1 flex-1 min-h-[140px]">
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] group-hover:bg-rose-500/20 transition-all"></div>
               <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📝</div>
                   <div>
                     <h3 className="font-black text-white">Review Submissions</h3>
                     <p className="text-[10px] text-rose-200/60 mt-0.5">Grade homework & projects</p>
                   </div>
                 </div>
               </div>
            </Link>

          </section>

        </div>
      </div>
    </div>
  );
}