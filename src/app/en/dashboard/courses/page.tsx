"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// تعریف تایپ برای دوره‌ها جهت جلوگیری از خطاهای تایپ‌اسکریپت
type EnrolledCourse = {
  id: string; // ID اصلی انرویلمنت یا دوره
  course_id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  category: string;
  progress: number;
};

export default function MyCoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  useEffect(() => {
    const fetchMyCourses = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;

      // کوئری ترکیبی: دریافت ثبت‌نام‌ها + اطلاعات خود دوره از جدول courses
      const { data: enrollments, error } = await supabase
        .from("enrollments")
        .select(`
          id,
          course_id,
          progress_percentage,
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
          // در سوپابیس گاهی دیتای جوین شده به صورت آرایه برمی‌گردد و گاهی آبجکت
          const courseData = Array.isArray(item.courses) ? item.courses[0] : item.courses;
          
          return {
            id: item.id,
            course_id: item.course_id,
            title: courseData?.title || "Untitled Course",
            thumbnail: courseData?.thumbnail_url || "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=800",
            instructor: courseData?.instructor_name || "Safi Academy Instructor",
            category: courseData?.category || "General",
            progress: item.progress_percentage || 0,
          };
        });

        setCourses(formattedCourses);
      }
      setIsLoading(false);
    };

    fetchMyCourses();
  }, []);

  // فیلتر کردن دوره‌ها بر اساس تب انتخاب شده
  const filteredCourses = courses.filter(course => {
    if (filter === "completed") return course.progress === 100;
    if (filter === "in-progress") return course.progress > 0 && course.progress < 100;
    return true; // "all"
  });

  return (
    <div className="w-full">
      
      {/* ================= Header (فیکس شده با ارتفاع h-24) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Courses</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Continue your learning journey and track your progress.</p>
        </div>
      </header>

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 pb-12 max-w-7xl mx-auto">

        {/* ================= تب‌های فیلتر ================= */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {([
            { id: "all", label: "All Courses" },
            { id: "in-progress", label: "In Progress" },
            { id: "completed", label: "Completed" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
                  : "bg-neutral-900/50 text-neutral-400 border border-white/5 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= گرید دوره‌ها ================= */}
        {isLoading ? (
          // حالت لودینگ (اسکلتون)
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          // نمایش دوره‌ها
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-neutral-900/40 rounded-[2rem] border border-white/5 backdrop-blur-xl overflow-hidden hover:bg-neutral-900/60 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col"
              >
                {/* بخش عکس دوره */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                  {/* بج دسته‌بندی */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
                    <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">{course.category}</span>
                  </div>
                  {/* دکمه پلی وسط عکس (فقط در هاور) */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/en/dashboard/watch/${course.course_id}`} className="w-14 h-14 bg-yellow-500 text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </Link>
                  </div>
                </div>

                {/* اطلاعات دوره */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold text-white mb-2 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    {course.instructor}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className={course.progress === 100 ? "text-green-400" : "text-neutral-400"}>
                        {course.progress === 100 ? "Completed" : "Overall Progress"}
                      </span>
                      <span className="text-yellow-400">{course.progress}%</span>
                    </div>
                    {/* نوار پیشرفت */}
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5 mb-6">
                      <div 
                        className={`h-full rounded-full relative transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-600 to-yellow-400'}`} 
                        style={{ width: `${course.progress}%` }}
                      >
                        {course.progress < 100 && course.progress > 0 && (
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:20px_20px] animate-[progress_1s_linear_infinite]"></div>
                        )}
                      </div>
                    </div>

                    {/* دکمه ورود به دوره */}
                    <Link 
                      href={`/en/dashboard/watch/${course.course_id}`}
                      className="w-full py-3 bg-white/5 hover:bg-yellow-500 text-white hover:text-black border border-white/10 hover:border-yellow-500 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {course.progress === 0 ? "Start Learning" : course.progress === 100 ? "Watch Again" : "Continue Course"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // حالت خالی (هیچ دوره‌ای یافت نشد)
          <div className="bg-neutral-900/40 p-12 rounded-[2rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-6">
              📚
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">No courses found</h3>
            <p className="text-neutral-400 font-medium mb-8 max-w-md">
              {filter === "all" 
                ? "You haven't enrolled in any courses yet. Explore our library to start your learning journey." 
                : `You don't have any ${filter.replace("-", " ")} courses right now.`}
            </p>
            {filter === "all" ? (
              <Link href="/en/courses" className="px-8 py-4 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Browse Academy Courses
              </Link>
            ) : (
              <button onClick={() => setFilter("all")} className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                Clear Filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}