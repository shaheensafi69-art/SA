"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  Loader2,
  Search,
  Layers,
  Users,
  Video,
  DollarSign,
  Globe,
  Settings2,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  List,
  CheckCircle2,
  SlidersHorizontal,
  Power,
  ChevronDown,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

type CourseItem = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
  language: string | null;
  created_at: string;
  teacher_id: string | null;
  enrolled_count: number;
  cohorts_count: number;
  is_mine: boolean; // authored by teacher or has assigned cohorts
};

export default function TeacherCourseManagementPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState<"my_courses" | "all_courses" | "published" | "draft">("my_courses");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/${currentLocale}/login`);
      return;
    }

    const currentUserId = session.user.id;

    try {
      // 1. Fetch teacher's assigned class_groups to know which courses they teach
      const { data: myClasses } = await supabase
        .from("class_groups")
        .select("course_id")
        .eq("teacher_id", currentUserId);

      const assignedCourseIds = new Set<string>();
      (myClasses || []).forEach((c) => {
        if (c.course_id) assignedCourseIds.add(c.course_id);
      });

      // 2. Fetch all courses with relations
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select(`
          id,
          title,
          description,
          category,
          price,
          thumbnail_url,
          is_published,
          language,
          created_at,
          teacher_id,
          enrollments (id),
          class_groups (id)
        `)
        .order("created_at", { ascending: false });

      if (coursesError) throw coursesError;

      if (coursesData) {
        const formatted: CourseItem[] = coursesData.map((c: any) => {
          const isAuthored = c.teacher_id === currentUserId;
          const isAssigned = assignedCourseIds.has(c.id);

          return {
            id: c.id,
            title: c.title,
            description: c.description || null,
            category: c.category || (isRtl ? "تخصصی" : "General"),
            price: Number(c.price) || 0,
            thumbnail_url: c.thumbnail_url || null,
            is_published: c.is_published ?? true,
            language: c.language || "English",
            created_at: c.created_at,
            teacher_id: c.teacher_id,
            enrolled_count: c.enrollments ? c.enrollments.length : 0,
            cohorts_count: c.class_groups ? c.class_groups.length : 0,
            is_mine: isAuthored || isAssigned,
          };
        });

        setCourses(formatted);
      }
    } catch (error) {
      console.error("Error fetching courses for management:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async (course: CourseItem) => {
    setIsTogglingId(course.id);
    const supabase = createClient();
    const newStatus = !course.is_published;

    try {
      const { error } = await supabase
        .from("courses")
        .update({ is_published: newStatus })
        .eq("id", course.id);

      if (error) throw error;

      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, is_published: newStatus } : c))
      );
    } catch (err: any) {
      alert("Failed to toggle publish status: " + err.message);
    } finally {
      setIsTogglingId(null);
    }
  };

  // Categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Metrics
  const stats = useMemo(() => {
    const total = courses.length;
    const myCount = courses.filter((c) => c.is_mine).length;
    const published = courses.filter((c) => c.is_published).length;
    const drafts = total - published;
    const totalScholars = courses.reduce((acc, c) => acc + c.enrolled_count, 0);

    return { total, myCount, published, drafts, totalScholars };
  }, [courses]);

  // Filtered
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.language && c.language.toLowerCase().includes(q));

      let matchesTab = true;
      if (tabFilter === "my_courses") matchesTab = c.is_mine;
      else if (tabFilter === "published") matchesTab = c.is_published;
      else if (tabFilter === "draft") matchesTab = !c.is_published;

      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;

      return matchesSearch && matchesTab && matchesCategory;
    });
  }, [courses, searchQuery, tabFilter, categoryFilter]);

  return (
    <div
      className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HERO HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-fuchsia-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent text-fuchsia-400 rounded-3xl flex items-center justify-center border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.25)] shrink-0">
              <BookOpen size={36} className="text-fuchsia-400" />
            </div>
            <div>
              <Link
                href={`/${currentLocale}/teacher/courses`}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors mb-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
              >
                <ArrowLeft size={12} />
                <span>{isRtl ? "بازگشت به تقویم صنف‌ها" : "Classroom Hub"}</span>
              </Link>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                {t.teacherPages?.course || (isRtl ? "مدیریت دوره‌ها" : "Course")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                  {t.teacherPages?.courseCurriculum || (isRtl ? "و برنامه‌های آموزشی" : "Curriculums")}
                </span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-2xl leading-relaxed">
                {t.teacherPages?.managePublishedCoursesDesc ||
                  (isRtl
                    ? "مدیریت سرفصل‌های آموزشی، تعیین شهریه، انتشار دوره‌های آکادمی و راه‌اندازی صنف‌های جدید."
                    : "Manage published courses, tuition pricing, enrollment metrics, and curriculum cohorts.")}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto relative z-10">
            <Link
              href={`/${currentLocale}/teacher/classes/create`}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-xl"
            >
              <Video size={18} className="text-purple-400" />
              <span>{isRtl ? "ایجاد صنف لایو" : "New Classroom"}</span>
            </Link>
            <Link
              href={`/${currentLocale}/teacher/courses/create`}
              className="px-6 sm:px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_15px_35px_rgba(217,70,239,0.35)] flex items-center justify-center gap-2.5 active:scale-95"
            >
              <PlusCircle size={18} />
              <span>{isRtl ? "تعریف دوره جدید" : "Create New Course"}</span>
            </Link>
          </div>
        </header>

        {/* ================= BENTO KPI METRICS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Total Curriculums */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-white/10 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
              {isRtl ? "مجموع دوره‌ها" : "Total Courses"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.total}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "دوره" : "Courses"}</span>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium mt-2">
              {stats.published} {isRtl ? "منتشر شده" : "published"} • {stats.drafts} {isRtl ? "پیش‌نویس" : "drafts"}
            </p>
          </div>

          {/* My Assigned Courses */}
          <div className="bg-[#0a0a0f]/80 border border-fuchsia-500/20 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-fuchsia-500/40 transition-all shadow-[0_10px_30px_rgba(217,70,239,0.1)]">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-fuchsia-400 mb-2">
              {isRtl ? "دوره‌های من" : "My Assigned"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-fuchsia-400">{stats.myCount}</span>
              <span className="text-[10px] text-fuchsia-500/70 uppercase font-bold">{isRtl ? "دوره" : "Masterclasses"}</span>
            </div>
            <p className="text-[10px] text-fuchsia-400/80 font-bold mt-2 flex items-center gap-1">
              <ShieldCheck size={12} /> {isRtl ? "دارای صنف یا تالیف اختصاصی" : "Authored or teaching cohorts"}
            </p>
          </div>

          {/* Total Course Enrolled Scholars */}
          <div className="bg-[#0a0a0f]/80 border border-purple-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-purple-500/30 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-purple-400 mb-2">
              {isRtl ? "مجموع شاگردان ثبت‌نامی" : "Total Enrolled"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.totalScholars}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "دانشجو" : "Scholars"}</span>
            </div>
            <p className="text-[10px] text-purple-400/80 font-medium mt-2 flex items-center gap-1">
              <TrendingUp size={11} /> {isRtl ? "در سراسر کاتالوگ" : "Across academy catalog"}
            </p>
          </div>

          {/* Active Status Ratio */}
          <div className="bg-[#0a0a0f]/80 border border-emerald-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">
              {isRtl ? "منتشر شده در کاتالوگ" : "Public Catalog"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.published}</span>
              <span className="text-[10px] text-emerald-500/70 uppercase font-bold">/{stats.total}</span>
            </div>
            <p className="text-[10px] text-emerald-400/80 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 size={11} /> {isRtl ? "آماده ثبت‌نام دانشجو" : "Ready for enrollment"}
            </p>
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
                placeholder={
                  isRtl
                    ? "جستجوی دوره با عنوان، شاخه، توضیحات یا زبان..."
                    : "Search courses by title, category, language..."
                }
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

            {/* Tab Filter Chips */}
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-2xl overflow-x-auto custom-scrollbar shrink-0">
              <button
                onClick={() => setTabFilter("my_courses")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  tabFilter === "my_courses"
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "دوره‌های من" : "My Courses"} ({stats.myCount})
              </button>
              <button
                onClick={() => setTabFilter("all_courses")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  tabFilter === "all_courses"
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "تمام دوره‌ها" : "All Courses"} ({stats.total})
              </button>
              <button
                onClick={() => setTabFilter("published")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  tabFilter === "published"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-neutral-400 hover:text-emerald-400"
                }`}
              >
                {isRtl ? "منتشر شده" : "Published"} ({stats.published})
              </button>
              <button
                onClick={() => setTabFilter("draft")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  tabFilter === "draft"
                    ? "bg-neutral-800 text-neutral-200 border border-white/10"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "پیش‌نویس" : "Draft"} ({stats.drafts})
              </button>
            </div>

            {/* View Mode */}
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

          {/* Category Chips Filter */}
          {categoriesList.length > 0 && (
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
              {categoriesList.map((cat) => (
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

        {/* ================= COURSE DISPLAY ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
              {isRtl ? "در حال بارگذاری کاتالوگ دوره‌ها..." : "Loading Course Curriculums..."}
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-24 sm:py-36 bg-[#0a0a0f]/60 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-600">
              <BookOpen size={40} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              {searchQuery || tabFilter !== "my_courses" || categoryFilter !== "all"
                ? (isRtl ? "هیچ دوره‌ای با این فیلترها یافت نشد" : "No Courses Match Filter")
                : (t.teacherPages?.noCoursesPublishedYet || (isRtl ? "هیچ دوره‌ای تعریف نشده است" : "No Courses Published Yet"))}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
              {searchQuery || tabFilter !== "my_courses" || categoryFilter !== "all"
                ? (isRtl ? "لطفاً عبارت جستجو یا تب فیلتر خود را تغییر دهید." : "Try adjusting your search criteria or switching tabs.")
                : (t.teacherPages?.startBuildingEduEmpire || (isRtl ? "با تعریف اولین دوره، امپراتوری آموزشی خود را بنا نهید." : "Start building your educational curriculum by authoring your first masterclass."))}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={`/${currentLocale}/teacher/courses/create`}
                className="px-7 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest inline-flex items-center gap-2 shadow-xl"
              >
                <PlusCircle size={16} />
                <span>{isRtl ? "تعریف دوره جدید" : "Create Masterclass"}</span>
              </Link>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-fuchsia-500/40 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col hover:-translate-y-2 relative"
              >
                {/* Thumbnail Cover */}
                <div className="h-52 bg-neutral-900 relative overflow-hidden shrink-0 border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10"></div>

                  <img
                    src={
                      course.thumbnail_url ||
                      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start gap-2">
                    <span className="backdrop-blur-xl bg-black/60 text-neutral-300 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl border border-white/10 shadow-xl truncate max-w-[55%]">
                      {course.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(course)}
                      disabled={isTogglingId === course.id}
                      title={course.is_published ? "Click to set Draft" : "Click to Publish"}
                      className={`backdrop-blur-xl text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shadow-xl transition-all ${
                        course.is_published
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-500/30"
                          : "bg-black/70 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {isTogglingId === course.id ? (
                        <Loader2 size={10} className="animate-spin text-white" />
                      ) : (
                        <span className={`w-2 h-2 rounded-full ${course.is_published ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"}`}></span>
                      )}
                      <span>{course.is_published ? (isRtl ? "منتشر شده" : "Published") : (isRtl ? "پیش‌نویس" : "Draft")}</span>
                    </button>
                  </div>

                  {/* Bottom Tags: Price & Language */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black px-3 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/40 shadow-lg">
                      {course.price === 0 ? (isRtl ? "رایگان" : "FREE") : `$${course.price}`}
                    </span>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10 flex items-center gap-1">
                      <Globe size={11} className="text-neutral-400" />
                      <span>{course.language}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-20 bg-[#0a0a0f]">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-fuchsia-300 transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                    {course.title}
                  </h3>

                  {course.description && (
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-6 font-medium">
                      {course.description}
                    </p>
                  )}

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center">
                      <p className="text-[9px] font-black uppercase text-neutral-500 tracking-wider">
                        {isRtl ? "شاگردان دوره" : "Scholars"}
                      </p>
                      <p className="text-base font-black text-white mt-0.5">{course.enrolled_count}</p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center">
                      <p className="text-[9px] font-black uppercase text-neutral-500 tracking-wider">
                        {isRtl ? "صنف‌های فعال" : "Cohorts"}
                      </p>
                      <p className="text-base font-black text-purple-400 mt-0.5">{course.cohorts_count}</p>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="pt-4 border-t border-white/5 flex gap-2.5">
                    <Link
                      href={`/${currentLocale}/teacher/classes/create`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 hover:border-fuchsia-500/40 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-fuchsia-400 hover:text-fuchsia-300 py-3.5 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-md"
                    >
                      <Video size={14} />
                      <span>{isRtl ? "صنف جدید" : "+ New Class"}</span>
                    </Link>

                    <Link
                      href={`/${currentLocale}/teacher/courses`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-300 hover:text-white py-3.5 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-md"
                    >
                      <Settings2 size={14} />
                      <span>{isRtl ? "صنف‌های من" : "My Classes"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-4 sm:p-6 backdrop-blur-xl shadow-2xl space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-black/40 hover:bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 relative">
                    <img
                      src={
                        course.thumbnail_url ||
                        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
                      }
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                        {course.category}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                          course.is_published
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-black/60 text-neutral-500 border-white/10"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${course.is_published ? "bg-emerald-400" : "bg-neutral-500"}`}></span>
                        {course.is_published ? "Published" : "Draft"}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {course.price === 0 ? "FREE" : `$${course.price}`}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-fuchsia-300 transition-colors truncate">
                      {course.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-0 border-white/5">
                  <div className="flex items-center gap-4 text-xs text-neutral-400 font-bold">
                    <span>
                      <strong className="text-white">{course.enrolled_count}</strong> {isRtl ? "شاگرد" : "Scholars"}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-purple-400">{course.cohorts_count}</strong> {isRtl ? "صنف" : "Cohorts"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${currentLocale}/teacher/classes/create`}
                      className="px-4 py-2.5 rounded-xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <Video size={14} />
                      <span>{isRtl ? "+ صنف" : "+ Class"}</span>
                    </Link>

                    <Link
                      href={`/${currentLocale}/teacher/courses`}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <Settings2 size={14} />
                      <span>{isRtl ? "صنف‌ها" : "Cohorts"}</span>
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