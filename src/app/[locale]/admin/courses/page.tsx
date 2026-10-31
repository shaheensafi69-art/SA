"use client";
import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Search, ShieldAlert, BookOpen, Plus, 
  Eye, DollarSign, Activity, CheckCircle2, AlertCircle, Trash2, 
  Sparkles, Layers, Globe, User, Tag, ToggleLeft, ToggleRight
} from "lucide-react";

type CourseItem = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  language: string | null;
  created_at: string;
  instructor_name: string | null;
  teacher?: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  } | null;
};

export default function AdminCoursesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT" | "FREE">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          id, title, description, category, thumbnail_url, price, 
          is_published, language, created_at, instructor_name,
          teacher:profiles!teacher_id(first_name, last_name, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        const formatted = data.map((item: any) => ({
          ...item,
          teacher: Array.isArray(item.teacher) ? item.teacher[0] : item.teacher
        }));
        setCourses(formatted);
      }
      
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      setFeedback({ text: error.message || "Failed to load courses.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async (courseId: string, currentStatus: boolean) => {
    setActionLoadingId(courseId);
    setFeedback(null);
    const supabase = createClient();

    try {
      const newStatus = !currentStatus;
      const { error } = await supabase
        .from("courses")
        .update({ is_published: newStatus })
        .eq("id", courseId);

      if (error) throw error;

      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_published: newStatus } : c));
      setFeedback({
        text: newStatus ? "Course published live to platform!" : "Course moved to draft mode.",
        type: "success"
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Failed to update status", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteCourse = async (courseId: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) return;

    setActionLoadingId(courseId);
    setFeedback(null);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);

      if (error) throw error;

      setCourses(prev => prev.filter(c => c.id !== courseId));
      setFeedback({ text: "Course successfully removed.", type: "success" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Failed to delete course", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach(c => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Status filter
      if (statusFilter === "PUBLISHED" && !c.is_published) return false;
      if (statusFilter === "DRAFT" && c.is_published) return false;
      if (statusFilter === "FREE" && c.price > 0) return false;

      // Category filter
      if (selectedCategory !== "ALL" && c.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = c.title?.toLowerCase().includes(q);
        const matchesDesc = c.description?.toLowerCase().includes(q);
        const matchesInstructor = c.instructor_name?.toLowerCase().includes(q) ||
          `${c.teacher?.first_name || ""} ${c.teacher?.last_name || ""}`.toLowerCase().includes(q);
        const matchesCat = c.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesCat) return false;
      }

      return true;
    });
  }, [courses, statusFilter, selectedCategory, searchQuery]);

  // Metrics
  const metrics = useMemo(() => {
    const total = courses.length;
    const published = courses.filter(c => c.is_published).length;
    const drafts = total - published;
    const free = courses.filter(c => c.price <= 0).length;
    return { total, published, drafts, free };
  }, [courses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.loadingCourseLibrary}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href={`/${currentLocale}/admin`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              {t.adminPages.courseLibrary}
              <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl text-xs font-mono font-bold">
                {courses.length}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Curate and deploy masterclasses, oversee publication states, tuition fees, and lead faculty appointments.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <Link 
              href={`/${currentLocale}/admin/courses/create`}
              className="px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)] active:scale-95 flex items-center justify-center gap-2.5 border border-white/10"
            >
              <Plus size={18}/> Deploy New Course
            </Link>
          </div>
        </header>

        {/* Feedback alert */}
        {feedback && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out] backdrop-blur-md ${
            feedback.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* ================= METRICS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/20">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{t.adminPages.totalCourses}</p>
              <p className="text-2xl font-black text-white font-mono">{metrics.total}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-emerald-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80">Published Live</p>
              <p className="text-2xl font-black text-emerald-400 font-mono">{metrics.published}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-amber-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">Draft Mode</p>
              <p className="text-2xl font-black text-amber-400 font-mono">{metrics.drafts}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-cyan-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
              <DollarSign size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400/80">Free Programs</p>
              <p className="text-2xl font-black text-cyan-400 font-mono">{metrics.free}</p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTER CONTROLS ================= */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#0a0a0f]/60 p-3 rounded-2xl border border-white/5 backdrop-blur-xl">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder={t.adminPages.searchCoursesPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-xs font-medium focus:outline-none focus:border-violet-500/50 placeholder:text-neutral-600"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "ALL", label: "All" },
              { id: "PUBLISHED", label: "Published" },
              { id: "DRAFT", label: "Drafts" },
              { id: "FREE", label: "Free" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Category Dropdown if available */}
            {categories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black/60 border border-white/10 text-neutral-300 text-[10px] font-black uppercase tracking-widest rounded-xl px-3 py-2 outline-none focus:border-violet-500/50"
              >
                <option value="ALL">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* ================= Courses Grid ================= */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{t.adminPages.noCoursesFound}</h3>
            <p className="text-neutral-500 text-sm">{t.adminPages.createFirstCourseDesc}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course, index) => {
              const isWorking = actionLoadingId === course.id;
              const instructorDisplay = course.instructor_name ||
                (course.teacher ? `${course.teacher.first_name} ${course.teacher.last_name}` : "Faculty Lead");

              return (
                <div 
                  key={course.id} 
                  className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] hover:border-violet-500/30 relative"
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  {/* Course Thumbnail */}
                  <div className="w-full h-48 bg-neutral-900 relative overflow-hidden shrink-0">
                    {course.thumbnail_url ? (
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 flex items-center justify-center">
                        <BookOpen size={48} className="text-white/20" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border ${
                        course.is_published 
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" 
                          : "bg-black/80 text-amber-300 border-amber-500/30"
                      }`}>
                        {course.is_published ? "Published" : "Draft"}
                      </span>
                    </div>

                    {/* Category Pill */}
                    {course.category && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-black/60 text-neutral-300 border border-white/10 backdrop-blur-md">
                          {course.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-6 flex flex-col flex-1">
                    
                    {/* Instructor meta */}
                    <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                        {course.teacher?.avatar_url ? (
                          <img src={course.teacher.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <User size={12} className="text-violet-400" />
                        )}
                      </div>
                      <span className="truncate text-[11px] font-medium text-neutral-300">{instructorDisplay}</span>
                    </div>

                    <h3 className="text-base font-black text-white mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors leading-tight">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 line-clamp-2 font-medium mb-6 flex-1">
                      {course.description || "No curriculum description provided."}
                    </p>

                    {/* Price & Meta row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-0.5">{t.adminPages.pricing}</span>
                        <span className={`font-mono text-base font-black tracking-tight ${course.price > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                          {course.price > 0 ? `$${course.price}` : "FREE"}
                        </span>
                      </div>

                      <div className="flex flex-col text-right">
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-0.5">{t.adminPages.createdAt}</span>
                        <span className="text-xs font-mono text-neutral-400">
                          {new Date(course.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Link 
                        href={`/${currentLocale}/admin/courses/${course.id}`}
                        className="w-full py-3 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-neutral-300 hover:text-violet-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Activity size={14}/> Course Dossier & Cohorts
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isWorking}
                          onClick={() => handleTogglePublish(course.id, course.is_published)}
                          className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-1.5 ${
                            course.is_published
                              ? "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 text-amber-400"
                              : "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {isWorking ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : course.is_published ? (
                            <><ToggleLeft size={13} /> Unpublish</>
                          ) : (
                            <><ToggleRight size={13} /> Publish</>
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={isWorking}
                          onClick={() => handleDeleteCourse(course.id, course.title)}
                          className="px-3 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all flex items-center justify-center"
                          title="Delete Course"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
