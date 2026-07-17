"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Search, ShieldAlert, BookOpen, Users, Radio, Sparkles, Clock, CalendarDays, CheckCircle2, User } from "lucide-react";

type ClassItem = {
  id: string;
  class_name: string;
  is_active: boolean;
  created_at: string;
  course: { title: string } | null;
  teacher: { first_name: string; last_name: string; avatar_url: string | null } | null;
  students_count: number;
};

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // دریافت لیست کلاس‌ها + استاد + دوره + تعداد شاگردان
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active, created_at,
          course:courses(title),
          teacher:profiles!teacher_id(first_name, last_name, avatar_url),
          class_students(student_id)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedClasses = data.map((cls: any) => ({
          id: cls.id,
          class_name: cls.class_name,
          is_active: cls.is_active,
          created_at: cls.created_at,
          course: Array.isArray(cls.course) ? cls.course[0] : cls.course,
          teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher,
          students_count: cls.class_students?.length || 0,
        }));
        setClasses(formattedClasses);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // محاسبه اینکه آیا کلاس کمتر از 10 روز پیش ساخته شده است
  const isClassNew = (dateString: string) => {
    const classDate = new Date(dateString).getTime();
    const today = new Date().getTime();
    const diffDays = Math.ceil((today - classDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  };

  // فیلتر کردن بر اساس سرچ
  const filteredClasses = useMemo(() => {
    if (!searchQuery) return classes;
    return classes.filter(c => 
      c.class_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.teacher?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classes, searchQuery]);

  // دسته‌بندی کلاس‌ها بر اساس نام دوره
  const groupedClasses = useMemo(() => {
    const groups: { [key: string]: ClassItem[] } = {};
    filteredClasses.forEach(cls => {
      const courseName = cls.course?.title || "Uncategorized Cohorts";
      if (!groups[courseName]) groups[courseName] = [];
      groups[courseName].push(cls);
    });
    return groups;
  }, [filteredClasses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Organizing Class Cohorts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-cyan-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cohorts</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Monitor active groups, review completed classes, and track newly formed cohorts across all courses.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
             <div className="bg-[#0a0a0f]/60 p-2 rounded-2xl border border-white/5 backdrop-blur-xl flex items-center gap-3 w-full sm:w-80 shadow-lg">
              <div className="pl-4 text-neutral-500"><Search size={18} /></div>
              <input 
                type="text" placeholder="Search classes, courses..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none py-3 pr-4 font-medium placeholder:text-neutral-600"
              />
            </div>
          </div>
        </header>

        {/* ================= Grouped Classes ================= */}
        {Object.keys(groupedClasses).length === 0 ? (
           <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
             <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
             <h3 className="text-xl font-black text-white mb-2">No Classes Found</h3>
             <p className="text-neutral-500 text-sm">There are no classes matching your search or none have been created yet.</p>
           </div>
        ) : (
          <div className="space-y-12">
            {Object.keys(groupedClasses).map((courseName, groupIndex) => (
              <section key={courseName} className="animate-[slideUp_0.5s_ease-out_forwards]" style={{ animationDelay: `${groupIndex * 0.1}s`, opacity: 0 }}>
                
                {/* Headerِ دوره */}
                <div className="flex items-center gap-3 mb-6 pl-2 border-b border-white/5 pb-3">
                  <BookOpen size={20} className="text-cyan-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{courseName}</h2>
                  <span className="ml-2 px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-black text-neutral-400">
                    {groupedClasses[courseName].length} Classes
                  </span>
                </div>

                {/* گرید کلاس‌های این دوره */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedClasses[courseName].map((cls) => {
                    const statusNew = isClassNew(cls.created_at);
                    return (
                      <Link 
                        href={`/en/admin/classes/${cls.id}`} 
                        key={cls.id}
                        className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-3xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 relative overflow-hidden"
                      >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>

                        {/* Top Row: Tags */}
                        <div className="flex justify-between items-start mb-5 relative z-10">
                          <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${
                            cls.is_active 
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                              : "bg-neutral-900 text-neutral-400 border-neutral-700"
                          }`}>
                            {cls.is_active ? <Radio size={10} className="animate-pulse"/> : <CheckCircle2 size={10}/>}
                            {cls.is_active ? "In Progress" : "Completed"}
                          </span>
                          
                          {/* برچسب 10 روز اول */}
                          {statusNew && (
                            <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                              <Sparkles size={10}/> NEW
                            </span>
                          )}
                        </div>

                        {/* Class Details */}
                        <div className="relative z-10 flex-1">
                          <h3 className="text-xl font-black text-white mb-4 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {cls.class_name}
                          </h3>
                          
                          <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-2xl mb-4">
                            <div className="w-8 h-8 rounded-xl overflow-hidden bg-neutral-800 shrink-0 flex items-center justify-center">
                              {cls.teacher?.avatar_url ? (
                                <img src={cls.teacher.avatar_url} className="w-full h-full object-cover" />
                              ) : (
                                <User size={14} className="text-neutral-500"/>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Instructor</p>
                              <p className="text-xs font-bold text-white truncate">{cls.teacher?.first_name} {cls.teacher?.last_name}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                              <Users size={12}/> {cls.students_count}
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 font-mono text-[10px]">
                              <CalendarDays size={12}/> {new Date(cls.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}