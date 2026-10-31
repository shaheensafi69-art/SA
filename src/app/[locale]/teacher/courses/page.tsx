"use client";

import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Loader2,
  PlusCircle,
  Video,
  Settings2,
  Clock,
  Calendar,
  Layers,
  Activity,
  Search,
  ExternalLink,
  Radio,
  BookOpen,
  LayoutGrid,
  List,
  Sparkles,
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  SlidersHorizontal,
  Power,
  RefreshCw
} from "lucide-react";

type ClassGroup = {
  id: string;
  class_name: string;
  class_days: string | null;
  class_time: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  is_active: boolean;
  student_count: number;
  thumbnail_url: string | null;
  category: string | null;
  course_id: string | null;
  course_title: string | null;
};

export default function TeacherCoursesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "standby">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchActiveClasses();
  }, []);

  const fetchActiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    const teacherId = session.user.id;

    try {
      const { data: classesData, error: classesError } = await supabase
        .from("class_groups")
        .select(`
          id, 
          class_name, 
          class_days,
          class_time,
          meeting_link,
          signal_group_link,
          is_active, 
          course_id,
          class_students(student_id),
          courses (id, title, thumbnail_url, category)
        `)
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });

      if (classesError) throw classesError;

      if (classesData) {
        const formattedClasses: ClassGroup[] = classesData.map((cls: any) => {
          const courseData = Array.isArray(cls.courses) ? cls.courses[0] : cls.courses;
          return {
            id: cls.id,
            class_name: cls.class_name,
            class_days: cls.class_days || (isRtl ? "تعیین نشده" : "Not Set"),
            class_time: cls.class_time || (isRtl ? "تعیین نشده" : "Not Set"),
            meeting_link: cls.meeting_link || null,
            signal_group_link: cls.signal_group_link || null,
            is_active: cls.is_active ?? true,
            student_count: cls.class_students ? cls.class_students.length : 0,
            thumbnail_url: courseData?.thumbnail_url || null,
            category: courseData?.category || (isRtl ? "کلاس آکادمی" : "Academy Cohort"),
            course_id: cls.course_id || null,
            course_title: courseData?.title || null,
          };
        });
        setClassGroups(formattedClasses);
      }
    } catch (error) {
      console.error("DB Sync Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActiveClass = async (cls: ClassGroup) => {
    setIsTogglingId(cls.id);
    const supabase = createClient();
    const newStatus = !cls.is_active;

    try {
      const { error } = await supabase
        .from("class_groups")
        .update({ is_active: newStatus })
        .eq("id", cls.id);

      if (error) throw error;

      setClassGroups((prev) =>
        prev.map((c) => (c.id === cls.id ? { ...c, is_active: newStatus } : c))
      );
    } catch (err: any) {
      alert("Error toggling cohort status: " + err.message);
    } finally {
      setIsTogglingId(null);
    }
  };

  // Categories list
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    classGroups.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [classGroups]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const total = classGroups.length;
    const active = classGroups.filter((c) => c.is_active).length;
    const standby = total - active;
    const totalStudents = classGroups.reduce((acc, c) => acc + c.student_count, 0);
    const avgDensity = total > 0 ? (totalStudents / total).toFixed(1) : "0";

    return { total, active, standby, totalStudents, avgDensity };
  }, [classGroups]);

  // Filtered List
  const filteredClasses = useMemo(() => {
    return classGroups.filter((cls) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        cls.class_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cls.course_title && cls.course_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cls.category && cls.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cls.class_days && cls.class_days.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && cls.is_active) ||
        (statusFilter === "standby" && !cls.is_active);

      const matchesCategory =
        categoryFilter === "all" || cls.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [classGroups, searchQuery, statusFilter, categoryFilter]);

  return (
    <div
      className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.5s_ease-out] relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-blue-600/[0.03] rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
        
        {/* ================= HEADER (Luxury Obsidian Glass) ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-fuchsia-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent text-fuchsia-400 rounded-3xl flex items-center justify-center border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.2)] shrink-0">
              <Layers size={36} className="text-fuchsia-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                <Activity size={12} className="text-fuchsia-400 animate-pulse" />
                <span>{isRtl ? "ترمینال مدیریت آکادمی" : "Academy Command Center"}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                {t.teacherPages?.classroomName || (isRtl ? "کلاس‌ها" : "Classroom")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                  {t.teacherPages?.scheduler || (isRtl ? "و برنامه‌ریزی زنده" : "Scheduler")}
                </span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-2xl leading-relaxed">
                {isRtl
                  ? "مدیریت بلادرنگ تقویم آموزشی، زمان‌بندی جلسات زنده، پیوندهای برودکست و آمار ثبت‌نام شاگردان."
                  : "Real-time hub for live cohort schedules, broadcast streams, meeting links, and student rosters."}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto relative z-10">
            <Link
              href={`/${currentLocale}/teacher/classes/create`}
              className="px-6 sm:px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl group"
            >
              <Video size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
              <span>{t.teacherPages?.createClass || (isRtl ? "ایجاد صنف جدید" : "Create Class")}</span>
            </Link>
            <Link
              href={`/${currentLocale}/teacher/courses/create`}
              className="px-6 sm:px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-[0_15px_35px_rgba(217,70,239,0.35)] flex items-center justify-center gap-3 active:scale-95"
            >
              <PlusCircle size={18} />
              <span>{isRtl ? "تعریف کورس جدید" : "Create Course"}</span>
            </Link>
          </div>
        </header>

        {/* ================= BENTO ANALYTICS STRIP ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Card 1: Total Classes */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
                {isRtl ? "مجموع صنف‌ها" : "Total Classes"}
              </span>
              <Layers size={18} className="text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.total}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                {isRtl ? "صنف" : "Cohorts"}
              </span>
            </div>
            <div className="mt-3 text-[10px] text-neutral-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              {stats.active} {isRtl ? "فعال" : "active"} / {stats.standby} {isRtl ? "استندبای" : "standby"}
            </div>
          </div>

          {/* Card 2: Active Broadcasts */}
          <div className="bg-[#0a0a0f]/80 border border-emerald-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
                {isRtl ? "صنف‌های فعال" : "Active Cohorts"}
              </span>
              <Radio size={18} className="text-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.active}</span>
              <span className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-wider">
                {isRtl ? "زنده" : "Live"}
              </span>
            </div>
            <div className="mt-3 text-[10px] text-emerald-400/70 flex items-center gap-1 font-bold">
              <CheckCircle2 size={12} />
              {isRtl ? "آماده برگزاری جلسه" : "Ready for broadcast"}
            </div>
          </div>

          {/* Card 3: Total Enrolled Scholars */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-fuchsia-500/20 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-fuchsia-400">
                {isRtl ? "مجموع شاگردان" : "Total Enrolled"}
              </span>
              <Users size={18} className="text-fuchsia-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.totalStudents}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                {isRtl ? "دانشجو" : "Scholars"}
              </span>
            </div>
            <div className="mt-3 text-[10px] text-fuchsia-400/80 flex items-center gap-1 font-medium">
              <TrendingUp size={12} />
              {isRtl ? "در تمام صنف‌ها" : "Across all classrooms"}
            </div>
          </div>

          {/* Card 4: Cohort Density */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/20 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-blue-400">
                {isRtl ? "تراکم میانگین صنف" : "Avg Density"}
              </span>
              <Sparkles size={18} className="text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.avgDensity}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                {isRtl ? "شاگرد / صنف" : "per class"}
              </span>
            </div>
            <div className="mt-3 text-[10px] text-neutral-500 font-medium">
              {isRtl ? "شاخص ظرفیت تدریس" : "Optimal learning ratio"}
            </div>
          </div>
        </div>

        {/* ================= CONTROLS & FILTER BAR ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-4 sm:p-6 backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors"
              />
              <input
                type="text"
                placeholder={isRtl ? "جستجو در صنف‌ها، روزها، ساعت یا کورس..." : "Search cohorts by name, schedule, or category..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-2xl overflow-x-auto custom-scrollbar shrink-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  statusFilter === "all"
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "همه" : "All"} ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === "active"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg"
                    : "text-neutral-400 hover:text-emerald-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {isRtl ? "فعال" : "Active"} ({stats.active})
              </button>
              <button
                onClick={() => setStatusFilter("standby")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  statusFilter === "standby"
                    ? "bg-neutral-800 text-neutral-200 border border-white/10 shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "استندبای" : "Standby"} ({stats.standby})
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-2xl shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-2.5 rounded-xl transition-all ${
                  viewMode === "grid" ? "bg-white/10 text-white shadow-inner" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-2.5 rounded-xl transition-all ${
                  viewMode === "list" ? "bg-white/10 text-white shadow-inner" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Category Pills (if any exist) */}
          {availableCategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-2 border-t border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 shrink-0 flex items-center gap-1">
                <SlidersHorizontal size={12} /> {isRtl ? "دسته‌بندی:" : "Category:"}
              </span>
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shrink-0 ${
                  categoryFilter === "all"
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                {isRtl ? "همه شاخه‌ها" : "All Categories"}
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shrink-0 ${
                    categoryFilter === cat
                      ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40"
                      : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= CLASSES DYNAMIC DISPLAY ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
              {t.teacherPages?.syncingSchedules || (isRtl ? "در حال همگام‌سازی صنف‌ها با دیتابیس..." : "Synchronizing Schedules...")}
            </p>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-24 sm:py-36 bg-[#0a0a0f]/60 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-600">
              <Layers size={40} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? (isRtl ? "هیچ صنفی با این فیلترها یافت نشد" : "No Cohorts Match Filters")
                : (t.teacherPages?.noSchedulesFound || (isRtl ? "هیچ صنفی ثبت نشده است" : "No Schedules Found"))}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? (isRtl ? "لطفاً عبارت جستجو یا فیلترهای انتخابی را تغییر دهید." : "Try adjusting your search criteria or resetting filters.")
                : (t.teacherPages?.teachingCalendarEmptyDesc ||
                  (isRtl
                    ? "تقویم تدریس شما در حال حاضر خالی است. برای شروع، اولین صنف یا کورس خود را ایجاد کنید."
                    : "Your teaching calendar is currently empty. Start by initializing a new classroom group."))}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={`/${currentLocale}/teacher/classes/create`}
                className="px-6 py-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>{isRtl ? "ایجاد صنف جدید" : "Create New Class"}</span>
              </Link>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-fuchsia-500/40 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col hover:-translate-y-2 relative"
              >
                {/* Image Banner & Badges */}
                <div className="h-48 sm:h-56 bg-neutral-900 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10"></div>

                  {cls.thumbnail_url ? (
                    <img
                      src={cls.thumbnail_url}
                      alt={cls.class_name}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black opacity-40">
                      <Layers size={48} className="text-neutral-500" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start gap-2">
                    <span className="backdrop-blur-xl bg-black/60 text-neutral-300 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl border border-white/10 shadow-xl truncate max-w-[55%]">
                      {cls.category}
                    </span>

                    <button
                      onClick={() => handleToggleActiveClass(cls)}
                      disabled={isTogglingId === cls.id}
                      title={cls.is_active ? "Click to set Standby" : "Click to Activate"}
                      className={`backdrop-blur-xl text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shadow-xl transition-all cursor-pointer ${
                        cls.is_active
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-500/30"
                          : "bg-black/70 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {isTogglingId === cls.id ? (
                        <Loader2 size={10} className="animate-spin text-white" />
                      ) : cls.is_active ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      ) : (
                        <Power size={10} />
                      )}
                      <span>{cls.is_active ? (isRtl ? "فعال" : "Active") : (isRtl ? "استندبای" : "Standby")}</span>
                    </button>
                  </div>

                  {/* Course Parent Tag */}
                  {cls.course_title && (
                    <div className="absolute bottom-3 left-4 right-4 z-20">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-fuchsia-300 bg-black/70 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10 truncate max-w-full">
                        <BookOpen size={12} className="shrink-0" />
                        <span className="truncate">{cls.course_title}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Section */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-20 bg-[#0a0a0f]">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-fuchsia-400 transition-colors duration-300 line-clamp-2 mb-5 leading-tight tracking-tight">
                    {cls.class_name}
                  </h3>

                  {/* Timing & Schedule Matrix */}
                  <div className="space-y-2.5 mb-6 flex-1">
                    <div className="flex items-center justify-between gap-3 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Calendar size={16} className="text-fuchsia-400 shrink-0" />
                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest truncate">
                          {cls.class_days}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 shadow-inner">
                        <Clock size={12} /> {cls.class_time}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-neutral-300 text-xs font-bold bg-white/[0.03] px-3.5 py-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="text-fuchsia-400 shrink-0" />
                        <span>
                          <strong className="text-white text-base mr-1">{cls.student_count}</strong>
                          {t.teacherPages?.activeStudents || (isRtl ? "شاگرد ثبت‌نامی" : "Enrolled Scholars")}
                        </span>
                      </div>

                      {/* External links pills */}
                      <div className="flex items-center gap-1.5">
                        {cls.meeting_link && (
                          <a
                            href={cls.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Meeting Link"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                          >
                            <Video size={13} />
                          </a>
                        )}
                        {cls.signal_group_link && (
                          <a
                            href={cls.signal_group_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Support Channel"
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 transition-colors"
                          >
                            <MessageCircle size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Link: Manage Cohort */}
                  <div className="mt-auto border-t border-white/5 pt-5">
                    <Link
                      href={`/${currentLocale}/teacher/courses/${cls.id}/students`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-indigo-600/20 hover:from-fuchsia-600/30 hover:via-purple-600/30 hover:to-indigo-600/30 border border-fuchsia-500/30 hover:border-fuchsia-500/50 text-xs font-black uppercase tracking-[0.15em] text-white py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/50 group/btn"
                    >
                      <Settings2 size={16} className="text-fuchsia-400 group-hover/btn:rotate-90 transition-transform duration-500" />
                      <span>{isRtl ? "مدیریت صنف و کارنامه" : "Manage Cohort & Roster"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-4 sm:p-6 backdrop-blur-xl shadow-2xl space-y-3">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-black/40 hover:bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 relative">
                    {cls.thumbnail_url ? (
                      <img src={cls.thumbnail_url} alt={cls.class_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <Layers size={24} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                        {cls.category}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                          cls.is_active
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-black/60 text-neutral-500 border-white/10"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cls.is_active ? "bg-emerald-400" : "bg-neutral-500"}`}></span>
                        {cls.is_active ? "Active" : "Standby"}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-fuchsia-400 transition-colors truncate">
                      {cls.class_name}
                    </h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-3 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-fuchsia-400" /> {cls.class_days}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-purple-400" /> {cls.class_time}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-0 border-white/5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5">
                    <Users size={15} className="text-fuchsia-400" />
                    <span className="text-xs font-bold text-white">
                      <strong>{cls.student_count}</strong> {isRtl ? "شاگرد" : "Students"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${currentLocale}/teacher/courses/${cls.id}/students`}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/30 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                    >
                      <Settings2 size={15} className="text-fuchsia-400" />
                      <span>{isRtl ? "مدیریت صنف" : "Manage"}</span>
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