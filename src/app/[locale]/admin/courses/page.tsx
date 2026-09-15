"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Search, ShieldAlert, BookOpen, Plus, Eye, DollarSign, Activity } from "lucide-react";

type CourseItem = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  created_at: string;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // دریافت لیست تمام دوره‌ها از دیتابیس
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, description, thumbnail_url, price, is_published, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setCourses(data);
      
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // فیلتر جستجو
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(c => 
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Course Library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambient Glows (Violet & Fuchsia) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Library</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Manage existing educational programs or build new courses to expand your academy's offerings.
            </p>
          </div>

          {/* Create Button */}
          <div className="relative z-10 shrink-0">
            <Link 
              href="/en/admin/courses/create"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)] active:scale-95 flex items-center justify-center gap-3 border border-white/10"
            >
              <Plus size={18}/> Deploy New Course
            </Link>
          </div>
        </header>

        {/* ================= SEARCH & METRICS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="bg-[#0a0a0f]/60 p-2 rounded-2xl border border-white/5 backdrop-blur-xl flex items-center gap-3 w-full sm:max-w-md shadow-lg">
            <div className="pl-4 text-neutral-500"><Search size={18} /></div>
            <input 
              type="text" 
              placeholder="Search courses by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 py-3 pr-4 font-medium placeholder:text-neutral-600"
            />
          </div>

          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner flex-1 sm:flex-none">
              <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400"><BookOpen size={16}/></div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Total Courses</p>
                <p className="text-lg font-black text-white">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Courses Grid ================= */}
        {filteredCourses.length === 0 ? (
           <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
             <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
             <h3 className="text-xl font-black text-white mb-2">No Courses Found</h3>
             <p className="text-neutral-500 text-sm">Create your first course using the button above.</p>
           </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] hover:border-violet-500/30"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Course Thumbnail */}
                <div className="w-full h-48 bg-neutral-900 relative overflow-hidden shrink-0">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 flex items-center justify-center">
                      <BookOpen size={48} className="text-white/20" />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border ${
                      course.is_published ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-black/60 text-neutral-300 border-white/10"
                    }`}>
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-white mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-medium mb-6 flex-1">
                    {course.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-1">Pricing</span>
                      <span className={`font-mono text-lg font-black tracking-tight ${course.price > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                        {course.price > 0 ? `$${course.price}` : "FREE"}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-1">Created At</span>
                      <span className="text-xs font-mono text-neutral-300">
                        {new Date(course.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={`/en/admin/courses/${course.id}`}
                    className="w-full py-3.5 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-neutral-300 hover:text-violet-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Activity size={14}/> Open Course Details
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