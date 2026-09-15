"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { UserPlus, Loader2, BookOpen } from "lucide-react";

type Course = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
};

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, category, thumbnail_url")
        .eq("teacher_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase Error:", error.message);
        throw error;
      }

      if (data) setCourses(data as Course[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out] relative overflow-hidden" dir="ltr">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= Header ================= */}
        <header className="mb-10 flex flex-col md:flex-row justify-between md:items-center gap-6 bg-neutral-950/60 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl flex items-center justify-center text-xl">📚</div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Curriculum</span></h1>
            </div>
            <p className="text-sm text-neutral-500 font-medium">Manage your published video courses and enroll students manually.</p>
          </div>
          
          {/* 🔥 دکمه متصل شد به صفحه ترمینال (Management) 🔥 */}
          <Link 
            href="/en/teacher/management" 
            className="px-6 py-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(217,70,239,0.2)] hover:shadow-[0_10px_30px_rgba(217,70,239,0.4)] hover:-translate-y-1 flex items-center justify-center"
          >
            + Create New Course
          </Link>
        </header>

        {/* ================= Course Grid ================= */}
        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/20 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-sm">
            <span className="text-6xl block mb-4 opacity-50">📖</span>
            <h3 className="text-xl font-black text-white mb-2">No courses published yet</h3>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto">Start building your educational empire by creating your first video course.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id} className="bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-fuchsia-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                
                {/* Thumbnail */}
                <div className="h-48 bg-neutral-800 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img 
                    src={course.thumbnail_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"} 
                    alt={course.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                  <span className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md text-fuchsia-400 border border-white/10">
                    MASTERCLASS
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative z-20">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">{course.category || "General"}</span>
                  <h3 className="text-lg font-black text-white group-hover:text-fuchsia-300 transition-colors line-clamp-2 mb-6 leading-tight">
                    {course.title}
                  </h3>
                  
                  {/* Actions Grid */}
                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    <Link 
                      href={`/en/teacher/courses/${course.id}`} 
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:text-white py-3 rounded-xl transition-all"
                    >
                      <BookOpen size={14} /> Manage
                    </Link>
                    
                    {/* 🔥 دکمه ثبت‌نام متصل به صفحه ترمینال (Management) 🔥 */}
                    <Link 
                      href="/en/teacher/management"
                      className="flex items-center justify-center gap-2 bg-fuchsia-600/10 hover:bg-fuchsia-600/20 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all hover:text-fuchsia-300"
                    >
                      <UserPlus size={14} /> Add Student
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