"use client";
import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Search, ShieldAlert, BookOpen, 
  Users, Radio, Sparkles, Clock, CalendarDays, 
  CheckCircle2, User, Video, MessageCircle, ExternalLink,
  ChevronRight, Layers, Check
} from "lucide-react";

type ClassItem = {
  id: string;
  class_name: string;
  is_active: boolean;
  created_at: string;
  class_time: string | null;
  class_days: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  course: { id?: string; title: string } | null;
  teacher: { id?: string; first_name: string; last_name: string; avatar_url: string | null } | null;
  students_count: number;
};

export default function AdminClassesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active, created_at, class_time, class_days,
          meeting_link, signal_group_link,
          course:courses(id, title),
          teacher:profiles!teacher_id(id, first_name, last_name, avatar_url),
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
          class_time: cls.class_time,
          class_days: cls.class_days,
          meeting_link: cls.meeting_link,
          signal_group_link: cls.signal_group_link,
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

  const isClassNew = (dateString: string) => {
    const classDate = new Date(dateString).getTime();
    const today = new Date().getTime();
    const diffDays = Math.ceil((today - classDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(c => {
      if (statusFilter === "ACTIVE" && !c.is_active) return false;
      if (statusFilter === "COMPLETED" && c.is_active) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = c.class_name?.toLowerCase().includes(q);
        const matchesCourse = c.course?.title?.toLowerCase().includes(q);
        const matchesTeacher = `${c.teacher?.first_name || ""} ${c.teacher?.last_name || ""}`.toLowerCase().includes(q);
        if (!matchesName && !matchesCourse && !matchesTeacher) return false;
      }

      return true;
    });
  }, [classes, searchQuery, statusFilter]);

  const groupedClasses = useMemo(() => {
    const groups: { [key: string]: ClassItem[] } = {};
    filteredClasses.forEach(cls => {
      const courseName = cls.course?.title || "Independent Cohorts";
      if (!groups[courseName]) groups[courseName] = [];
      groups[courseName].push(cls);
    });
    return groups;
  }, [filteredClasses]);

  const stats = useMemo(() => {
    const total = classes.length;
    const active = classes.filter(c => c.is_active).length;
    const completed = total - active;
    const totalStudents = classes.reduce((acc, c) => acc + c.students_count, 0);
    return { total, active, completed, totalStudents };
  }, [classes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.organizingClassCohorts}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href={`/${currentLocale}/admin`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              {t.adminPages.classCohorts}
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-mono font-bold">
                {classes.length}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Supervise active live cohorts, examine completed academic terms, and review student attendance rosters.
            </p>
          </div>
        </header>

        {/* ================= METRICS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Total Cohorts</p>
              <p className="text-2xl font-black text-white font-mono">{stats.total}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-rose-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <Radio size={22} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-400/80">In Progress</p>
              <p className="text-2xl font-black text-rose-400 font-mono">{stats.active}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-emerald-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80">Completed</p>
              <p className="text-2xl font-black text-emerald-400 font-mono">{stats.completed}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-purple-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-purple-400/80">Total Scholars</p>
              <p className="text-2xl font-black text-purple-400 font-mono">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & STATUS TABS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#0a0a0f]/60 p-3 rounded-2xl border border-white/5 backdrop-blur-xl">
          
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" placeholder={t.adminPages.searchClassesPlaceholder}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-xs font-medium focus:outline-none focus:border-rose-500/50 placeholder:text-neutral-600"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: "ALL", label: "All Cohorts" },
              { id: "ACTIVE", label: "In Progress" },
              { id: "COMPLETED", label: "Completed" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  statusFilter === tab.id
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= GROUPED CLASSES ================= */}
        {Object.keys(groupedClasses).length === 0 ? (
          <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{t.adminPages.noClassesFound}</h3>
            <p className="text-neutral-500 text-sm">{t.adminPages.noClassesMatchingSearch}</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.keys(groupedClasses).map((courseName, groupIndex) => (
              <section key={courseName} className="animate-[slideUp_0.5s_ease-out_forwards]" style={{ animationDelay: `${groupIndex * 0.08}s` }}>
                
                <div className="flex items-center gap-3 mb-6 pl-2 border-b border-white/5 pb-3">
                  <BookOpen size={20} className="text-rose-500" />
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{courseName}</h2>
                  <span className="ml-2 px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-black text-neutral-400 font-mono">
                    {groupedClasses[courseName].length} Cohorts
                  </span>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedClasses[courseName].map((cls) => {
                    const statusNew = isClassNew(cls.created_at);
                    return (
                      <Link 
                        href={`/${currentLocale}/admin/classes/${cls.id}`} 
                        key={cls.id}
                        className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-3xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)] hover:border-rose-500/30 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-rose-500/10 transition-colors"></div>

                        {/* Status + Badge */}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${
                            cls.is_active 
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                              : "bg-black/60 text-neutral-400 border-white/10"
                          }`}>
                            {cls.is_active ? <Radio size={10} className="animate-pulse"/> : <CheckCircle2 size={10}/>}
                            {cls.is_active ? "In Progress" : "Completed"}
                          </span>
                          
                          {statusNew && (
                            <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                              <Sparkles size={10}/> NEW
                            </span>
                          )}
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col">
                          <h3 className="text-base sm:text-lg font-black text-white mb-3 line-clamp-2 leading-snug group-hover:text-rose-400 transition-colors">
                            {cls.class_name}
                          </h3>

                          {/* Schedule snippet */}
                          {(cls.class_days || cls.class_time) && (
                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mb-4 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                              <Clock size={12} className="text-rose-400 shrink-0" />
                              <span className="truncate">{cls.class_days || "Days TBD"} • {cls.class_time || "Time TBD"}</span>
                            </div>
                          )}
                          
                          {/* Teacher Row */}
                          <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-2xl mb-4 mt-auto">
                            <div className="w-8 h-8 rounded-xl overflow-hidden bg-neutral-800 shrink-0 flex items-center justify-center border border-white/5">
                              {cls.teacher?.avatar_url ? (
                                <img src={cls.teacher.avatar_url} className="w-full h-full object-cover" />
                              ) : (
                                <User size={14} className="text-neutral-500"/>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Instructor</p>
                              <p className="text-xs font-bold text-white truncate">
                                {cls.teacher ? `${cls.teacher.first_name} ${cls.teacher.last_name}` : "Faculty Assigned"}
                              </p>
                            </div>
                          </div>

                          {/* Footer: Students Count & Created */}
                          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium border-t border-white/5 pt-3">
                            <span className="flex items-center gap-1.5 font-bold text-white">
                              <Users size={14} className="text-rose-500/80" /> {cls.students_count} Scholars
                            </span>
                            <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                              <CalendarDays size={12} /> {new Date(cls.created_at).toLocaleDateString()}
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
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
