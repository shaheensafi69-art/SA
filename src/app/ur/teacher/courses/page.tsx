"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  level: string;
};

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("courses")
        .select("id, title, category, thumbnail_url, level")
        .eq("teacher_id", session.user.id);

      if (data) setCourses(data as Course[]);
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out]">
      <header className="mb-10 flex justify-between items-center bg-neutral-950/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-black">My Curriculum</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage and structure your published video courses.</p>
        </div>
        <button className="px-5 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-fuchsia-600/20">
          + Create New Course
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/10 border border-dashed border-white/5 rounded-3xl">
          <span className="text-4xl block mb-3">📚</span>
          <p className="text-neutral-400 font-bold">No courses published yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="bg-neutral-900/30 border border-white/5 rounded-3xl overflow-hidden group hover:border-fuchsia-500/30 transition-all">
              <div className="h-40 bg-neutral-800 relative overflow-hidden">
                <img src={course.thumbnail_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded text-fuchsia-400 border border-white/5">{course.level}</span>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{course.category}</span>
                <h3 className="text-base font-bold mt-1 text-white group-hover:text-fuchsia-300 transition-colors truncate">{course.title}</h3>
                <Link href={`/en/teacher/courses/${course.id}`} className="mt-5 w-full block text-center bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold py-3 rounded-xl transition-all">
                  Manage Curriculum
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}