"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ClipboardCheck,
  PlusCircle,
  Calendar,
  Trash2,
  Eye,
  Loader2,
  Clock,
  FileText,
  BarChart3,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Users,
  Star,
  RefreshCw,
  X,
  Layers,
  ArrowUpRight
} from "lucide-react";

interface Assignment {
  id: string;
  class_group_id: string | null;
  class_name: string;
  course_id: string | null;
  title: string;
  description: string;
  deadline: string | null;
  max_score: number;
  created_at: string;
  total_submissions: number;
  pending_evaluations: number;
}

interface ClassOption {
  id: string;
  class_name: string;
}

export default function TeacherAssignmentsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<"all" | "active" | "expired" | "pending_review">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAssignmentsData();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchAssignmentsData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // 1. Fetch teacher classes
      const { data: classesData, error: classesError } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", session.user.id);

      if (classesError) throw classesError;

      const teacherClasses = classesData || [];
      setClasses(teacherClasses);

      if (teacherClasses.length > 0) {
        const classIds = teacherClasses.map(c => c.id);

        // 2. Fetch assignments belonging to teacher's classes
        const { data: assignmentsData, error: assignError } = await supabase
          .from("assignments")
          .select("id, class_group_id, course_id, title, description, deadline, max_score, created_at")
          .in("class_group_id", classIds)
          .order("created_at", { ascending: false });

        if (assignError) throw assignError;

        const rawAssignments = assignmentsData || [];
        const assignmentIds = rawAssignments.map(a => a.id);

        // 3. Fetch submissions metrics
        let submissionsMap = new Map<string, { total: number; pending: number }>();

        if (assignmentIds.length > 0) {
          const { data: subsData, error: subsError } = await supabase
            .from("assignment_submissions")
            .select("id, assignment_id, grade")
            .in("assignment_id", assignmentIds);

          if (!subsError && subsData) {
            subsData.forEach(sub => {
              const current = submissionsMap.get(sub.assignment_id) || { total: 0, pending: 0 };
              current.total += 1;
              if (sub.grade === null) current.pending += 1;
              submissionsMap.set(sub.assignment_id, current);
            });
          }
        }

        // Format assignments
        const formatted: Assignment[] = rawAssignments.map(item => {
          const targetClass = teacherClasses.find(c => c.id === item.class_group_id);
          const subMetric = submissionsMap.get(item.id) || { total: 0, pending: 0 };

          return {
            id: item.id,
            class_group_id: item.class_group_id,
            class_name: targetClass ? targetClass.class_name : (isRtl ? "صنف عمومی" : "General Class"),
            course_id: item.course_id,
            title: item.title,
            description: item.description || (isRtl ? "دستورالعمل خاصی ثبت نشده است." : "No instructions specified."),
            deadline: item.deadline,
            max_score: item.max_score || 100,
            created_at: item.created_at,
            total_submissions: subMetric.total,
            pending_evaluations: subMetric.pending
          };
        });

        setAssignments(formatted);
      } else {
        setAssignments([]);
      }
    } catch (error: any) {
      console.error("Error fetching assignments:", error);
      showToast("error", isRtl ? "خطا در دریافت لیست تکالیف" : "Failed to load assignments.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDeleteAssignment = async (id: string, title: string) => {
    if (!confirm(isRtl ? `آیا از حذف دائم تکلیف "${title}" و تمام نمرات و ارسال‌های آن اطمینان دارید؟` : `Are you sure you want to permanently delete the assignment "${title}"?`)) {
      return;
    }

    setIsDeletingId(id);
    const supabase = createClient();

    try {
      // 1. Delete associated submissions first to ensure consistency
      await supabase.from("assignment_submissions").delete().eq("assignment_id", id);

      // 2. Delete the assignment
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAssignments(prev => prev.filter(item => item.id !== id));
      showToast("success", isRtl ? "تکلیف با موفقیت حذف گردید." : "Assignment deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting assignment:", error);
      showToast("error", error.message || (isRtl ? "خطا در حذف تکلیف" : "Failed to delete assignment."));
    } finally {
      setIsDeletingId(null);
    }
  };

  // KPIs
  const stats = useMemo(() => {
    const total = assignments.length;
    const now = new Date();
    const active = assignments.filter(item => !item.deadline || new Date(item.deadline) >= now).length;
    const expired = assignments.filter(item => item.deadline && new Date(item.deadline) < now).length;
    const totalSubs = assignments.reduce((acc, a) => acc + a.total_submissions, 0);
    const pendingReview = assignments.reduce((acc, a) => acc + a.pending_evaluations, 0);

    return { total, active, expired, totalSubs, pendingReview };
  }, [assignments]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter(item => {
      // Class filter
      if (selectedClassFilter !== "all" && item.class_group_id !== selectedClassFilter) {
        return false;
      }

      // Status filter
      const now = new Date();
      const isExpired = item.deadline ? new Date(item.deadline) < now : false;

      if (selectedStatusFilter === "active" && isExpired) return false;
      if (selectedStatusFilter === "expired" && !isExpired) return false;
      if (selectedStatusFilter === "pending_review" && item.pending_evaluations === 0) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesClass = item.class_name.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesClass;
      }

      return true;
    });
  }, [assignments, selectedClassFilter, selectedStatusFilter, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-neutral-900/40 rounded-2xl border border-white/5"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-56 bg-neutral-900/30 rounded-3xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans selection:bg-fuchsia-500 selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-fuchsia-600/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-purple-800/10 to-transparent rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-10 space-y-6 sm:space-y-8 relative z-10">
        
        {/* ================= 1. PREMIUM HEADER ================= */}
        <header className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#160b1e]/95 via-[#0d0713]/90 to-[#030306] border border-white/10 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-fuchsia-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                <ClipboardCheck size={13} className="text-fuchsia-400 shrink-0" />
                <span>{isRtl ? "ترمینال جامع تکالیف و پروژه‌های آکادمیک" : "Academic Assignments & Research Terminal"}</span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {t.teacherPages.academicTask} <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500">{t.teacherPages.terminalWord}</span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "مدیریت و انتشار تکالیف درسی، تعیین مهلت ارسال، ارزیابی هوشمند فایل‌های تحویلی دانشجویان و ثبت نمرات رسمی."
                  : "Deploy research tasks, manage submission deadlines, review uploaded student assignments, and record verified grades."
                }
              </p>
            </div>

            {/* Header Actions - 100% Mobile Full-Width */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              
              <button
                type="button"
                onClick={() => fetchAssignmentsData(true)}
                disabled={isRefreshing}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                title={isRtl ? "تازه‌سازی" : "Refresh"}
              >
                <RefreshCw size={15} className={isRefreshing ? "animate-spin text-fuchsia-400" : ""} />
                <span className="sm:hidden md:inline">{isRtl ? "تازه‌سازی" : "Refresh"}</span>
              </button>

              <Link
                href={`/${currentLocale}/teacher/assignments/create`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(217,70,239,0.3)] active:scale-95 text-center shrink-0"
              >
                <PlusCircle size={17} />
                <span>{isRtl ? "تعریف تکلیف جدید" : "Deploy Assignment"}</span>
              </Link>

            </div>
          </div>
        </header>

        {/* Toast Banner */}
        {toastMessage && (
          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 text-xs font-bold border backdrop-blur-md transition-all animate-[fadeInDown_0.2s_ease-out] ${
            toastMessage.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}>
            {toastMessage.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* ================= 2. BENTO STATS BAR (MOBILE, IPAD, DESKTOP) ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center shrink-0 border border-fuchsia-500/20">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "کل تکالیف تعریف‌شده" : "Total Assignments"}
              </span>
              <span className="text-sm sm:text-lg font-black text-white font-mono">
                {stats.total}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Clock size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "تکالیف دارای مهلت فعال" : "Active Deadlines"}
              </span>
              <span className="text-sm sm:text-lg font-black text-purple-400 font-mono">
                {stats.active}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
              <Users size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "کل پاسخ‌های دریافتی" : "Total Submissions"}
              </span>
              <span className="text-sm sm:text-lg font-black text-indigo-400 font-mono">
                {stats.totalSubs}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "نیاز به بررسی و نمره‌دهی" : "Pending Review"}
              </span>
              <span className="text-sm sm:text-lg font-black text-amber-400 font-mono">
                {stats.pendingReview}
              </span>
            </div>
          </div>

        </section>

        {/* ================= 3. FILTER TABS, CLASS SELECTOR & SEARCH ================= */}
        <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl sm:rounded-2xl bg-black/60 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedStatusFilter("all")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                selectedStatusFilter === "all"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "همه تکالیف" : "All Tasks"} ({assignments.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatusFilter("active")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                selectedStatusFilter === "active"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "فعال" : "Active"} ({stats.active})
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatusFilter("pending_review")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                selectedStatusFilter === "pending_review"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "نیاز به بررسی" : "Pending Review"} ({stats.pendingReview})
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatusFilter("expired")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                selectedStatusFilter === "expired"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "پایان مهلت" : "Closed"} ({stats.expired})
            </button>
          </div>

          {/* Right: Class Filter + Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            
            {/* Filter by Class */}
            <div className="relative sm:w-56">
              <Layers size={13} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? "right-3" : "left-3"}`} />
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className={`w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-fuchsia-500/50 appearance-none cursor-pointer ${
                  isRtl ? "pr-8 pl-3" : "pl-8 pr-3"
                }`}
              >
                <option value="all" className="bg-[#0c0a18]">{isRtl ? "همه صنف‌ها" : "All Classrooms"}</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#0c0a18]">{c.class_name}</option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 sm:w-60 md:w-72">
              <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? "right-3" : "left-3"}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? "جستجوی عنوان تکلیف..." : "Search assignments..."}
                className={`w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-500/50 transition-colors ${
                  isRtl ? "pr-9 pl-8" : "pl-9 pr-8"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white ${isRtl ? "left-3" : "right-3"}`}
                >
                  <X size={13} />
                </button>
              )}
            </div>

          </div>

        </section>

        {/* ================= 4. ASSIGNMENTS GRID ================= */}
        <section>
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-16 sm:py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-md shadow-2xl p-6">
              <BarChart3 size={48} className="text-neutral-600 mx-auto mb-3" />
              <h3 className="text-base sm:text-xl font-black text-white mb-1.5">
                {isRtl ? "هیچ تکلیفی با این مشخصات یافت نشد" : "No Assignments Found"}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto mb-6">
                {isRtl
                  ? "با کلیک بر روی دکمه زیر می‌توانید نخستین پروژه یا تمرین کلاسی را برای دانشجویان تعریف نمایید."
                  : "Deploy your first academic assignment or research project to receive student submissions."
                }
              </p>
              <Link
                href={`/${currentLocale}/teacher/assignments/create`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold"
              >
                <PlusCircle size={15} />
                <span>{isRtl ? "ایجاد تکلیف جدید" : "Create New Assignment"}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredAssignments.map((task) => {
                const now = new Date();
                const deadlineDate = task.deadline ? new Date(task.deadline) : null;
                const isExpired = deadlineDate ? deadlineDate < now : false;

                return (
                  <div
                    key={task.id}
                    className="bg-gradient-to-b from-[#110d1c] to-[#07050d] border border-white/10 hover:border-fuchsia-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:shadow-[0_20px_50px_rgba(217,70,239,0.06)] relative overflow-hidden"
                  >
                    {/* Top ambient aura */}
                    <div className="absolute top-0 right-0 w-48 h-24 bg-fuchsia-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-fuchsia-500/10 transition-colors"></div>

                    {/* Top row: Class tag & Max points */}
                    <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 truncate max-w-[200px]">
                        {task.class_name}
                      </span>

                      <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-[10px] font-mono font-black shrink-0 flex items-center gap-1">
                        <Star size={11} className="fill-amber-400" />
                        <span>{task.max_score} {isRtl ? "نمره" : "Pts"}</span>
                      </div>
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="relative z-10 space-y-2 flex-1">
                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-fuchsia-400 transition-colors line-clamp-1">
                        {task.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 font-medium">
                        {task.description}
                      </p>
                    </div>

                    {/* Submissions Progress Indicator */}
                    <div className="relative z-10 my-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-indigo-400" />
                        <span className="text-neutral-300 font-bold">
                          {task.total_submissions} {isRtl ? "ارسال شده" : "Submissions"}
                        </span>
                      </div>

                      {task.pending_evaluations > 0 ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 font-bold text-[10px] border border-amber-500/30">
                          {task.pending_evaluations} {isRtl ? "نیاز به بررسی" : "Pending"}
                        </span>
                      ) : task.total_submissions > 0 ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                          {isRtl ? "تماماً ارزیابی شد" : "Evaluated"}
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[10px]">
                          {isRtl ? "بدون ارسال" : "No responses"}
                        </span>
                      )}
                    </div>

                    {/* Bottom: Deadline & Action Buttons */}
                    <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px] truncate">
                        <Calendar size={13} className={isExpired ? "text-rose-400" : "text-fuchsia-400"} />
                        <span className={isExpired ? "text-rose-400 font-bold" : ""}>
                          {deadlineDate
                            ? `${isRtl ? "مهلت:" : "Due:"} ${deadlineDate.toLocaleDateString(currentLocale === "fa" ? "fa-IR" : "en-US")}`
                            : (isRtl ? "بدون مهلت" : "No Deadline")
                          }
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        
                        {/* Submissions Evaluation Link */}
                        <Link
                          href={`/${currentLocale}/teacher/assignments/${task.id}/submissions`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 hover:from-fuchsia-600 hover:to-purple-600 border border-fuchsia-500/30 text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
                          title={isRtl ? "بررسی و نمره‌دهی به پاسخ‌های دانشجویان" : "Review & Grade Submissions"}
                        >
                          <Eye size={14} />
                          <span className="text-[11px] font-black">{isRtl ? "ارزیابی" : "Review"}</span>
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteAssignment(task.id, task.title)}
                          disabled={isDeletingId === task.id}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-40"
                          title={isRtl ? "حذف تکلیف" : "Delete Assignment"}
                        >
                          {isDeletingId === task.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}