"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  Video,
  MessageCircle,
  Clock,
  Calendar,
  Users,
  MonitorPlay,
  Loader2,
  Layers,
  Activity,
  ArrowLeft,
  Settings2,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Radio,
  CheckCircle2,
  Power,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  List,
  PlusCircle,
  ShieldCheck,
  Zap
} from "lucide-react";

type LiveClass = {
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

export default function TeacherLiveClassesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [classGroups, setClassGroups] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "standby">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/${currentLocale}/login`);
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
        .order("is_active", { ascending: false });

      if (classesError) throw classesError;

      if (classesData) {
        const formattedClasses: LiveClass[] = classesData.map((cls: any) => {
          const courseData = Array.isArray(cls.courses) ? cls.courses[0] : cls.courses;
          return {
            id: cls.id,
            class_name: cls.class_name,
            class_days: cls.class_days || (isRtl ? "تعیین نشده" : "Not Set"),
            class_time: cls.class_time || (isRtl ? "تعیین نشده" : "Not Set"),
            meeting_link: cls.meeting_link,
            signal_group_link: cls.signal_group_link,
            is_active: cls.is_active ?? true,
            student_count: cls.class_students ? cls.class_students.length : 0,
            thumbnail_url: courseData?.thumbnail_url || null,
            category: courseData?.category || (isRtl ? "صنف پخش زنده" : "Live Cohort"),
            course_id: cls.course_id || null,
            course_title: courseData?.title || null,
          };
        });
        setClassGroups(formattedClasses);
      }
    } catch (error) {
      console.error("Error syncing live classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActiveClass = async (cls: LiveClass) => {
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
      alert("Error toggling live broadcast status: " + err.message);
    } finally {
      setIsTogglingId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = classGroups.length;
    const active = classGroups.filter((c) => c.is_active).length;
    const standby = total - active;
    const totalStudents = classGroups.reduce((acc, c) => acc + c.student_count, 0);
    const connectedRooms = classGroups.filter((c) => !!c.meeting_link).length;

    return { total, active, standby, totalStudents, connectedRooms };
  }, [classGroups]);

  // Filtered
  const filteredClasses = useMemo(() => {
    return classGroups.filter((cls) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        cls.class_name.toLowerCase().includes(q) ||
        (cls.course_title && cls.course_title.toLowerCase().includes(q)) ||
        (cls.category && cls.category.toLowerCase().includes(q)) ||
        (cls.class_days && cls.class_days.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && cls.is_active) ||
        (statusFilter === "standby" && !cls.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [classGroups, searchQuery, statusFilter]);

  return (
    <div
      className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.5s_ease-out] relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-indigo-600/[0.03] rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
        
        {/* ================= HERO HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-purple-500/15 via-fuchsia-500/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent text-purple-400 rounded-3xl flex items-center justify-center border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.25)] shrink-0">
              <Radio size={36} className="text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>{isRtl ? "مرکز عملیات پخش زنده و وبینارها" : "Live Broadcasting Control Hub"}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                {t.liveClasses?.title || (isRtl ? "صنف‌های پخش زنده" : "Live Campus")} &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                  {isRtl ? "جلسات تصویری" : "Lecture Rooms"}
                </span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-2xl leading-relaxed">
                {t.liveClasses?.desc ||
                  (isRtl
                    ? "مدیریت جلسات زنده آنلاین، پیوندهای مایکروسافت تیمز/گوگل میت، کانال‌های رمزگذاری‌شده سیگنال و حضور فعال شاگردان."
                    : "Manage active broadcast streams, encrypted connectivity links, and live scholar attendances.")}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto relative z-10">
            <Link
              href={`/${currentLocale}/teacher/classes/create`}
              className="px-6 sm:px-7 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_15px_35px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2.5 active:scale-95"
            >
              <PlusCircle size={18} />
              <span>{isRtl ? "ایجاد صنف لایو جدید" : "Create Live Class"}</span>
            </Link>
            <Link
              href={`/${currentLocale}/teacher/courses`}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-neutral-300 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-xl"
            >
              <Layers size={18} className="text-purple-400" />
              <span>{isRtl ? "تقویم تمام صنف‌ها" : "All Cohorts Hub"}</span>
            </Link>
          </div>
        </header>

        {/* ================= BENTO KPI METRICS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Card 1: Active Live Streams */}
          <div className="bg-[#0a0a0f]/80 border border-rose-500/20 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-rose-500/40 transition-all shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-rose-400">
                {isRtl ? "در حال پخش زنده" : "Live Transmissions"}
              </span>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-rose-400">{stats.active}</span>
              <span className="text-[10px] text-rose-500/70 font-bold uppercase tracking-wider">
                {isRtl ? "جلسه آنلاین" : "Active"}
              </span>
            </div>
            <p className="text-[10px] text-rose-400/80 font-bold mt-2 flex items-center gap-1">
              <Zap size={11} /> {isRtl ? "پخش برای شاگردان باز است" : "Broadcast open to students"}
            </p>
          </div>

          {/* Card 2: Standby Classes */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-white/10 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                {isRtl ? "در حالت آماده‌باش" : "Standby Rooms"}
              </span>
              <Clock size={18} className="text-neutral-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.standby}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                {isRtl ? "صنف" : "Standby"}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium mt-2">
              {isRtl ? "جلسات خارج از برنامه ساعت" : "Scheduled off-hours"}
            </p>
          </div>

          {/* Card 3: Enrolled Scholars */}
          <div className="bg-[#0a0a0f]/80 border border-purple-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-purple-400">
                {isRtl ? "شاگردان جلسات لایو" : "Live Scholars"}
              </span>
              <Users size={18} className="text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.totalStudents}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                {isRtl ? "دانشجو" : "Scholars"}
              </span>
            </div>
            <p className="text-[10px] text-purple-400/80 font-medium mt-2 flex items-center gap-1">
              <TrendingUp size={11} /> {isRtl ? "در تمام صنف‌های لایو" : "Enrolled across rooms"}
            </p>
          </div>

          {/* Card 4: Meeting Rooms Configured */}
          <div className="bg-[#0a0a0f]/80 border border-emerald-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
                {isRtl ? "اتاق‌های متصل" : "Configured Streams"}
              </span>
              <Video size={18} className="text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.connectedRooms}</span>
              <span className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-wider">
                /{stats.total}
              </span>
            </div>
            <p className="text-[10px] text-emerald-400/80 font-medium mt-2 flex items-center gap-1">
              <CheckCircle2 size={11} /> {isRtl ? "لینک میتینگ متصل است" : "Teams / Meet link ready"}
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-400 transition-colors"
              />
              <input
                type="text"
                placeholder={
                  isRtl
                    ? "جستجوی صنف لایو با نام، روزها، زمان یا شاخه..."
                    : "Search live classes by title, schedule, or category..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
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
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "همه جلسات" : "All Rooms"} ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === "active"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg"
                    : "text-neutral-400 hover:text-rose-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                {isRtl ? "لایو اکنون" : "Live Now"} ({stats.active})
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
        </div>

        {/* ================= LIVE CLASSES GRID / LIST ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
              {t.liveClasses?.teamsProcessing || (isRtl ? "در حال همگام‌سازی اتاق‌های لایو..." : "Synchronizing Broadcast Hubs...")}
            </p>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-24 sm:py-36 bg-[#0a0a0f]/60 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-600">
              <MonitorPlay size={40} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              {searchQuery || statusFilter !== "all"
                ? (isRtl ? "هیچ جلسه لایوی با این فیلترها یافت نشد" : "No Broadcast Rooms Match Filters")
                : (t.liveClasses?.noLive || (isRtl ? "هیچ جلسه لایوی فعال نیست" : "No Live Classes Available"))}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
              {t.teacherPages?.noLiveCohortsScheduledDesc ||
                (isRtl
                  ? "در حال حاضر هیچ کلاس زنده‌ای برنامه‌ریزی نشده است. برای راه‌اندازی جلسه از دکمه زیر استفاده کنید."
                  : "You haven't scheduled any live broadcast rooms yet. Initialize a new room below.")}
            </p>
            <Link
              href={`/${currentLocale}/teacher/classes/create`}
              className="px-7 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest inline-flex items-center gap-2 shadow-xl"
            >
              <PlusCircle size={16} />
              <span>{isRtl ? "ایجاد اولین جلسه آنلاین" : "Create Live Classroom"}</span>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className={`bg-[#0a0a0f] border rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl flex flex-col hover:-translate-y-2 relative ${
                  cls.is_active
                    ? "border-rose-500/30 hover:border-rose-500/50 hover:shadow-[0_20px_50px_rgba(225,29,72,0.2)]"
                    : "border-white/5 hover:border-purple-500/30 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]"
                }`}
              >
                {/* Image Cover & Live Status Overlay */}
                <div className="h-52 sm:h-56 bg-neutral-900 relative overflow-hidden shrink-0 border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10"></div>

                  {cls.thumbnail_url ? (
                    <img
                      src={cls.thumbnail_url}
                      alt={cls.class_name}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-black opacity-30">
                      <Layers size={48} className="text-neutral-500" />
                    </div>
                  )}

                  {/* Header Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start gap-2">
                    <span className="backdrop-blur-xl bg-black/60 text-neutral-300 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl border border-white/10 shadow-xl truncate max-w-[55%]">
                      {cls.category}
                    </span>

                    {/* Toggle Button */}
                    <button
                      onClick={() => handleToggleActiveClass(cls)}
                      disabled={isTogglingId === cls.id}
                      title={cls.is_active ? "Click to set Standby" : "Click to Broadcast Live"}
                      className={`backdrop-blur-xl text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shadow-xl transition-all cursor-pointer ${
                        cls.is_active
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:bg-rose-500/30"
                          : "bg-black/70 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {isTogglingId === cls.id ? (
                        <Loader2 size={10} className="animate-spin text-white" />
                      ) : cls.is_active ? (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
                      ) : (
                        <Power size={10} />
                      )}
                      <span>{cls.is_active ? (isRtl ? "پخش زنده" : "LIVE NOW") : (isRtl ? "استندبای" : "Standby")}</span>
                    </button>
                  </div>

                  {/* Course Parent Tag */}
                  {cls.course_title && (
                    <div className="absolute bottom-3 left-4 right-4 z-20">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-300 bg-black/70 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10 truncate max-w-full">
                        <MonitorPlay size={12} className="shrink-0 text-purple-400" />
                        <span className="truncate">{cls.course_title}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-20 bg-[#0a0a0f]">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 mb-5 leading-tight tracking-tight">
                    {cls.class_name}
                  </h3>

                  {/* Timings & Rosters */}
                  <div className="space-y-2.5 mb-6 flex-1">
                    <div className="flex items-center justify-between gap-3 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Calendar size={16} className="text-purple-400 shrink-0" />
                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest truncate">
                          {cls.class_days}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 shadow-inner">
                        <Clock size={12} /> {cls.class_time}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-neutral-300 text-xs font-bold bg-white/[0.03] px-3.5 py-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="text-purple-400 shrink-0" />
                        <span>
                          <strong className="text-white text-base mr-1">{cls.student_count}</strong>
                          {isRtl ? "شاگرد ثبت‌نامی" : "Active Scholars"}
                        </span>
                      </div>

                      {/* Direct External Connectivity Pills */}
                      <div className="flex items-center gap-1.5">
                        {cls.meeting_link && (
                          <a
                            href={cls.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct Launch Stream"
                            className="p-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-colors flex items-center gap-1 text-[10px] font-bold"
                          >
                            <Video size={13} />
                            <span>Teams</span>
                          </a>
                        )}
                        {cls.signal_group_link && (
                          <a
                            href={cls.signal_group_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct Open Signal Hub"
                            className="p-2 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/30 text-fuchsia-300 border border-fuchsia-500/30 transition-colors flex items-center gap-1 text-[10px] font-bold"
                          >
                            <MessageCircle size={13} />
                            <span>Signal</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Button: Enter Mission Control */}
                  <div className="mt-auto border-t border-white/5 pt-5">
                    <Link
                      href={`/${currentLocale}/teacher/live-classes/${cls.id}`}
                      className="w-full bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-500/30 hover:border-purple-500/50 text-white font-black uppercase tracking-[0.15em] text-xs py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/50 active:scale-[0.98] group/btn"
                    >
                      <Settings2 size={16} className="text-purple-400 group-hover/btn:rotate-90 transition-transform duration-500" />
                      <span>{isRtl ? "ورود به اتاق فرمان صنف" : "Open Control Room"}</span>
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
                className="bg-black/40 hover:bg-white/[0.02] border border-white/5 hover:border-purple-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 relative">
                    {cls.thumbnail_url ? (
                      <img src={cls.thumbnail_url} alt={cls.class_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <MonitorPlay size={24} />
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
                            ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                            : "bg-black/60 text-neutral-500 border-white/10"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cls.is_active ? "bg-rose-400" : "bg-neutral-500"}`}></span>
                        {cls.is_active ? "LIVE NOW" : "Standby"}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-purple-400 transition-colors truncate">
                      {cls.class_name}
                    </h3>

                    <p className="text-xs text-neutral-400 flex items-center gap-3 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-purple-400" /> {cls.class_days}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-fuchsia-400" /> {cls.class_time}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-0 border-white/5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5">
                    <Users size={15} className="text-purple-400" />
                    <span className="text-xs font-bold text-white">
                      <strong>{cls.student_count}</strong> {isRtl ? "شاگرد" : "Students"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {cls.meeting_link && (
                      <a
                        href={cls.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Video size={14} />
                        <span>Launch</span>
                      </a>
                    )}
                    <Link
                      href={`/${currentLocale}/teacher/live-classes/${cls.id}`}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <Settings2 size={14} />
                      <span>{isRtl ? "اتاق فرمان" : "Control"}</span>
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