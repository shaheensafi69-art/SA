"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type EnrolledCourse = {
  id: string;
  course_id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  category: string;
  progress: number;
  enrolled_at: string; 
};

// =====================================================================
// کامپوننت هوشمند محاسباتی زمان باقیمانده واقعی بر اساس فیلد enrolled_at دیتابیس
// =====================================================================
function ExpirationCounter({ enrolledDate }: { enrolledDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const enrollmentTime = new Date(enrolledDate).getTime();
      const expirationTime = enrollmentTime + 30 * 24 * 60 * 60 * 1000; // مهلت دقیق ۳۰ روزه اشتراک
      const now = new Date().getTime();
      const difference = expirationTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [enrolledDate]);

  if (!timeLeft) return <div className="animate-pulse bg-white/5 w-24 h-7 rounded-xl"></div>;

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <span className="text-red-500 text-xs">⚠️</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Access Expired</span>
      </div>
    );
  }

  const isExpiringSoon = timeLeft.days <= 5;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
      isExpiringSoon 
        ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
        : "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.08)]"
    }`}>
      <span className="text-xs">{isExpiringSoon ? '🔥' : '⏳'}</span>
      <div className="flex items-baseline gap-0.5 font-mono text-[11px] font-black tracking-wider">
        <span>{timeLeft.days}</span><span className="text-[8px] opacity-60 uppercase mr-1">d</span>
        <span>{timeLeft.hours.toString().padStart(2, '0')}</span><span className="text-[8px] opacity-60 uppercase">h</span>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const router = useRouter();

  useEffect(() => {
    const fetchMyCourses = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return router.push("/en/login");

      const { data: enrollments, error } = await supabase
        .from("enrollments")
        .select(`
          id,
          course_id,
          progress_percentage,
          enrolled_at,
          courses (
            title,
            thumbnail_url,
            instructor_name,
            category
          )
        `)
        .eq("student_id", session.user.id)
        .order("enrolled_at", { ascending: false });

      if (enrollments && !error) {
        const formattedCourses: EnrolledCourse[] = enrollments.map((item: any) => {
          const courseData = Array.isArray(item.courses) ? item.courses[0] : item.courses;
          
          return {
            id: item.id,
            course_id: item.course_id,
            title: courseData?.title || "Premium Academy Course",
            thumbnail: courseData?.thumbnail_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
            instructor: courseData?.instructor_name || "Safi Academy Instructor",
            category: courseData?.category || "Trading",
            progress: item.progress_percentage || 0, 
            enrolled_at: item.enrolled_at,
          };
        });

        setCourses(formattedCourses);
      }
      setIsLoading(false);
    };

    fetchMyCourses();
  }, [router]);

  // تابع کمکی برای تشخیص انقضای ۳۰ روزه دوره به صورت زنده
  const isCourseExpired = (enrolledAt: string) => {
    const enrollmentTime = new Date(enrolledAt).getTime();
    const expirationTime = enrollmentTime + 30 * 24 * 60 * 60 * 1000;
    return new Date().getTime() > expirationTime;
  };

  // فیلترینگ ۱۰۰٪ مبتنی بر زمان و اطلاعات واقعی دیتابیس شما
  const filteredCourses = courses.filter(course => {
    const expired = isCourseExpired(course.enrolled_at);
    if (filter === "completed") return expired;
    if (filter === "in-progress") return !expired;
    return true; 
  });

  return (
    <div className="w-full relative overflow-hidden bg-transparent font-sans">
      
      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-10 flex justify-between items-end relative z-40 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Courses</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-sm font-medium">Real-time database records and active core tracking.</p>
        </div>
      </header>

      {/* ================= بدنه اصلی تعاملی دو ستونه ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-start">

        {/* ================= تب‌های فیلتر عمودی با چراغ بک‌لایت اختصاصی ================= */}
        <div className="relative flex flex-col bg-neutral-900/60 backdrop-blur-2xl p-2.5 rounded-[2rem] border border-white/10 w-full md:w-64 shrink-0 shadow-2xl space-y-2 animate-[fadeIn_0.3s_ease-out]">
          {/* چراغ هوشمند پشت باکس فیلتر */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-[2rem] blur-2xl pointer-events-none"></div>

          <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] px-4 pt-3 pb-1 hidden md:block">Filter Curriculum</p>
          
          {([
            { id: "all", label: "All Courses", icon: "📚", count: courses.length, color: "hover:text-yellow-400" },
            { id: "in-progress", label: "In Progress", icon: "⚡", count: courses.filter(c => !isCourseExpired(c.enrolled_at)).length, color: "hover:text-amber-400" },
            { id: "completed", label: "Completed", icon: "🏆", count: courses.filter(c => isCourseExpired(c.enrolled_at)).length, color: "hover:text-red-400" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 group relative overflow-hidden ${
                filter === tab.id 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_10px_25px_rgba(245,158,11,0.25)] scale-[1.02]" 
                  : `text-neutral-400 bg-white/[0.02] border border-white/5 ${tab.color}`
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              
              <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-lg border relative z-10 ${
                filter === tab.id ? "bg-black/10 border-black/10 text-black" : "bg-black/30 border-white/5 text-neutral-500 group-hover:text-neutral-300"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ================= سمت راست: گرید نمایش دوره‌ها با چراغ بک‌لایت نئونی ================= */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="h-[440px] bg-neutral-900/40 rounded-[2.5rem] border border-white/5 animate-pulse overflow-hidden flex flex-col">
                   <div className="h-56 bg-neutral-800/50 w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredCourses.map((course) => {
                const expired = isCourseExpired(course.enrolled_at);
                
                return (
                  <div 
                    key={course.id} 
                    className={`group flex flex-col relative rounded-[2.5rem] border backdrop-blur-2xl overflow-hidden bg-gradient-to-b from-neutral-950 to-black transition-all duration-500 hover:-translate-y-2 h-full ${
                      expired 
                        ? "border-red-500/20 hover:border-red-500/40 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(239,68,68,0.15)]" 
                        : "border-amber-500/20 hover:border-amber-500/40 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(245,158,11,0.15)]"
                    }`}
                  >
                    {/* 🔥 امبینت لایت و سیستم نئون سرتاسری پشت باکس‌ها (Backlight System) */}
                    <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-all duration-700 mix-blend-screen group-hover:opacity-100 opacity-60 ${
                      expired ? "bg-red-500/10 group-hover:bg-red-500/20" : "bg-amber-500/10 group-hover:bg-amber-500/20"
                    }`}></div>

                    {/* تصویر کاور دوره */}
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900 shrink-0">
                      <img 
                        src={course.thumbnail} 
                        alt="" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
                      />
                      
                      {/* اطلاعات روی تصویر */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl">
                          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{course.category}</span>
                        </div>
                        <ExpirationCounter enrolledDate={course.enrolled_at} />
                      </div>

                      {/* دکمه پخش مرکزی متصل به ماژول لایو کلاس */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link href="/en/dashboard/live-classes" className="w-16 h-16 bg-amber-500 text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </Link>
                      </div>
                    </div>

                    {/* محتوای متنی کارت */}
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                      
                      {/* بج داینامیک وضعیت واقعی دوره بر اساس مهلت زمانی */}
                      <div className="mb-3">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          expired 
                            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                        }`}>
                          {expired ? "⏹ Completed (Access Finished)" : "🔴 In Progress (Active Session)"}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-2 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-xs text-neutral-400 font-bold mb-6 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10 text-[9px]">👤</span>
                        {course.instructor}
                      </p>

                      <div className="mt-auto">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Course Modules Progress
                          </span>
                          <span className="text-lg font-black text-white font-mono">{course.progress}%</span>
                        </div>
                        
                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5 mb-6">
                          <div 
                            className={`h-full rounded-full relative transition-all duration-1000 ${expired ? 'bg-red-500' : 'bg-gradient-to-r from-amber-600 to-amber-400'}`} 
                            style={{ width: `${course.progress}%` }}
                          >
                            {!expired && course.progress > 0 && (
                              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:20px_20px] animate-[progress_1s_linear_infinite]"></div>
                            )}
                          </div>
                        </div>

                        {/* دکمه هدایت به پورتال مرکزی کلاس‌های زنده */}
                        <Link 
                          href="/en/dashboard/live-classes"
                          className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border ${
                            expired 
                              ? "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10"
                              : "bg-white/5 text-white border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-lg shadow-black/50"
                          }`}
                        >
                          {expired ? "Review Live Records ↺" : "Go To Live Campus →"}
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-neutral-900/40 to-black p-12 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center shadow-2xl min-h-[450px]">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl">📚</div>
              <h3 className="text-2xl font-black text-white mb-2">No Courses Found</h3>
              <p className="text-neutral-400 font-medium mb-8 max-w-sm">No data entries matched the database active status criteria for this node.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}