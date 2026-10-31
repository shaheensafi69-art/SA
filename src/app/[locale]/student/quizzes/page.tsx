"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  FileQuestion,
  HelpCircle,
  Layers,
  Search,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Target,
  Trophy,
  AlertTriangle,
  Flame,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  ListChecks,
  PenTool,
  CalendarDays,
  ShieldCheck,
  GraduationCap
} from "lucide-react";

export type QuizHubItem = {
  id: string;
  course_name: string;
  title: string;
  quiz_type: "regular" | "chance" | string;
  passing_score: number;
  status: "pending" | "pending_review" | "graded";
  score?: number | null;
  letter_grade?: string | null;
  is_passed?: boolean;
  attempted_at?: string | null;
  attempt_id?: string | null;
  created_at?: string;
  // Metadata about questions
  totalQuestions: number;
  mcqCount: number;
  descriptiveCount: number;
  totalPoints: number;
};

export default function StudentQuizzesHubPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizHubItem[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "pending_review" | "completed" | "chance">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "passing_score" | "title">("newest");

  useEffect(() => {
    fetchQuizzesData();
  }, []);

  const fetchQuizzesData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    const supabase = createClient();

    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session?.user) {
        return router.push(`/${currentLocale}/login`);
      }
      const userId = session.user.id;

      // 1. دریافت کلاس‌های ثبت‌نامی دانش‌آموز (class_students)
      const { data: classStudents } = await supabase
        .from("class_students")
        .select(`
          class_group_id,
          class_groups (
            id,
            class_name,
            course_id,
            courses (id, title)
          )
        `)
        .eq("student_id", userId);

      // 2. دریافت دوره‌های ثبت‌نامی مستقیم (enrollments)
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select(`
          course_id,
          courses (id, title)
        `)
        .eq("student_id", userId);

      // جمع‌آوری تمام شناسه کلاس‌ها و دوره‌ها
      const classGroupIds: string[] = [];
      const courseIds: string[] = [];
      const courseNameMap = new Map<string, string>();
      const classNameMap = new Map<string, string>();

      (classStudents || []).forEach((item: any) => {
        const cg = Array.isArray(item.class_groups) ? item.class_groups[0] : item.class_groups;
        if (!cg) return;
        classGroupIds.push(cg.id);
        classNameMap.set(cg.id, cg.class_name);

        if (cg.course_id) {
          courseIds.push(cg.course_id);
          const crs = Array.isArray(cg.courses) ? cg.courses[0] : cg.courses;
          if (crs?.title) courseNameMap.set(cg.course_id, crs.title);
        }
      });

      (enrollments || []).forEach((item: any) => {
        if (item.course_id) {
          courseIds.push(item.course_id);
          const crs = Array.isArray(item.courses) ? item.courses[0] : item.courses;
          if (crs?.title) courseNameMap.set(item.course_id, crs.title);
        }
      });

      const distinctClassIds = Array.from(new Set(classGroupIds));
      const distinctCourseIds = Array.from(new Set(courseIds));

      // 3. واکشی آزمون‌های فعال
      let allQuizzes: any[] = [];
      if (distinctClassIds.length > 0 || distinctCourseIds.length > 0) {
        const queries = [];
        if (distinctClassIds.length > 0) {
          queries.push(
            supabase
              .from("quizzes")
              .select("id, class_group_id, course_id, title, passing_score, is_active, quiz_type, created_at")
              .in("class_group_id", distinctClassIds)
              .eq("is_active", true)
          );
        }
        if (distinctCourseIds.length > 0) {
          queries.push(
            supabase
              .from("quizzes")
              .select("id, class_group_id, course_id, title, passing_score, is_active, quiz_type, created_at")
              .in("course_id", distinctCourseIds)
              .eq("is_active", true)
          );
        }

        const responses = await Promise.all(queries);
        const merged = responses.flatMap((r) => r.data || []);
        const deduplicated = new Map<string, any>();
        merged.forEach((q) => deduplicated.set(q.id, q));
        allQuizzes = Array.from(deduplicated.values());
      }

      // 4. واکشی تلاش‌ها و کارنامه‌های دانش‌آموز (quiz_attempts)
      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select("id, quiz_id, score, is_passed, status, letter_grade, attempted_at")
        .eq("student_id", userId)
        .order("attempted_at", { ascending: false });

      // ساخت نقشه آخرین تلاش برای هر آزمون
      const attemptsMap = new Map<string, any>();
      (attempts || []).forEach((att) => {
        if (!attemptsMap.has(att.quiz_id)) {
          attemptsMap.set(att.quiz_id, att);
        }
      });

      // 5. واکشی آمار سوالات آزمون‌ها (تعداد تستی و تشریحی و مجموع امتیاز)
      const quizIds = allQuizzes.map((q) => q.id);
      const questionsMetaMap = new Map<
        string,
        { total: number; mcq: number; descriptive: number; maxPoints: number }
      >();

      if (quizIds.length > 0) {
        const { data: qData } = await supabase
          .from("quiz_questions")
          .select("id, quiz_id, points, question_type, option_a")
          .in("quiz_id", quizIds);

        if (qData) {
          qData.forEach((q: any) => {
            const current = questionsMetaMap.get(q.quiz_id) || {
              total: 0,
              mcq: 0,
              descriptive: 0,
              maxPoints: 0,
            };
            current.total += 1;
            current.maxPoints += Number(q.points) || 10;
            const isMCQ =
              q.question_type === "multiple_choice" ||
              (q.option_a &&
                q.option_a.toLowerCase() !== "descriptive" &&
                q.option_a.toLowerCase() !== "null");
            if (isMCQ) current.mcq += 1;
            else current.descriptive += 1;

            questionsMetaMap.set(q.quiz_id, current);
          });
        }
      }

      // 6. قالب‌بندی نهایی لیست آزمون‌ها
      const formatted: QuizHubItem[] = allQuizzes.map((quiz) => {
        let courseLabel = isRtl ? "دوره تخصصی آکادمی" : "Academy Specialization";
        if (quiz.course_id && courseNameMap.has(quiz.course_id)) {
          courseLabel = courseNameMap.get(quiz.course_id)!;
        } else if (quiz.class_group_id && classNameMap.has(quiz.class_group_id)) {
          courseLabel = classNameMap.get(quiz.class_group_id)!;
        }

        const attempt = attemptsMap.get(quiz.id);
        const qMeta = questionsMetaMap.get(quiz.id) || {
          total: 0,
          mcq: 0,
          descriptive: 0,
          maxPoints: 100,
        };

        let currentStatus: QuizHubItem["status"] = "pending"; // در انتظار آزمون
        if (attempt) {
          if (attempt.status === "graded" || attempt.status === "completed") {
            currentStatus = "graded";
          } else {
            currentStatus = "pending_review";
          }
        }

        return {
          id: quiz.id,
          course_name: courseLabel,
          title: quiz.title || (isRtl ? "آزمون بدون عنوان" : "Untitled Exam"),
          quiz_type: quiz.quiz_type || "regular",
          passing_score: Number(quiz.passing_score) || 70,
          status: currentStatus,
          score: attempt?.score !== null && attempt?.score !== undefined ? Number(attempt.score) : null,
          letter_grade: attempt?.letter_grade || null,
          is_passed: attempt?.is_passed,
          attempted_at: attempt?.attempted_at,
          attempt_id: attempt?.id,
          created_at: quiz.created_at,
          totalQuestions: qMeta.total,
          mcqCount: qMeta.mcq,
          descriptiveCount: qMeta.descriptive,
          totalPoints: qMeta.maxPoints,
        };
      });

      setQuizzes(formatted);
    } catch (err: any) {
      console.error("Error loading student quizzes hub:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // محاسبات آمار کلیدی داشبورد (KPIs)
  const stats = useMemo(() => {
    const total = quizzes.length;
    const pending = quizzes.filter((q) => q.status === "pending").length;
    const pendingReview = quizzes.filter((q) => q.status === "pending_review").length;
    const graded = quizzes.filter((q) => q.status === "graded");
    const passed = graded.filter((q) => q.is_passed).length;
    const chanceExams = quizzes.filter((q) => q.quiz_type === "chance").length;

    let totalScore = 0;
    graded.forEach((g) => {
      totalScore += g.score || 0;
    });

    const averageScore = graded.length > 0 ? Math.round(totalScore / graded.length) : 0;
    const passRate = graded.length > 0 ? Math.round((passed / graded.length) * 100) : 0;

    return {
      total,
      pending,
      pendingReview,
      gradedCount: graded.length,
      passed,
      chanceExams,
      averageScore,
      passRate,
    };
  }, [quizzes]);

  // فیلتر و جستجوی آزمون‌ها
  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((quiz) => {
        if (filter === "pending") return quiz.status === "pending";
        if (filter === "pending_review") return quiz.status === "pending_review";
        if (filter === "completed") return quiz.status === "graded";
        if (filter === "chance") return quiz.quiz_type === "chance";
        return true; // "all"
      })
      .filter((quiz) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          quiz.title.toLowerCase().includes(q) ||
          quiz.course_name.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "passing_score") return b.passing_score - a.passing_score;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        // newest
        return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
      });
  }, [quizzes, filter, searchQuery, sortBy]);

  return (
    <div
      className="w-full relative overflow-x-hidden overflow-y-auto bg-[#020205] text-white font-sans pb-32 min-h-screen custom-scrollbar"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ================= AMBIENT NEON GLOWS ================= */}
      <div
        className="fixed top-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-indigo-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/[0.03] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "12s" }}
      />
      <div
        className="fixed top-[40%] left-[30%] w-[45vw] h-[45vw] bg-amber-500/[0.02] rounded-full blur-[130px] pointer-events-none z-0"
      />

      <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10 pt-6 sm:pt-8">
        
        {/* ================= HERO COCKPIT HEADER ================= */}
        <header className="relative bg-gradient-to-b from-[#0a0a16]/90 to-[#06060e]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-110" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-bold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <Sparkles size={13} className="text-amber-400" />
                <span>{isRtl ? "مرکز آزمون‌ها و سنجش آکادمیک • Safi Assessment Studio" : "Academic Assessment Hub • Safi Academy"}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t.quizzes.title || (isRtl ? "مرکز آزمون‌ها و کارنامه تحصیلی" : "Examination Center")}
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                {t.quizzes.subtitle ||
                  (isRtl
                    ? "در آزمون‌های تستی و تشریحی دوره‌ها شرکت کنید، پاسخ‌ها را ثبت نموده و نمرات رسمی و کارنامه پایان‌ترم را مشاهده فرمایید."
                    : "Take your academic multiple-choice and descriptive exams, submit papers, and track your official grades.")}
              </p>
            </div>

            {/* Quick Actions / Refresh */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchQuizzesData(true)}
                disabled={isRefreshing || isLoading}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                title={isRtl ? "به‌روزرسانی داده‌ها" : "Refresh Data"}
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin text-indigo-400" : "text-neutral-400"} />
                <span>{isRefreshing ? (isRtl ? "در حال دریافت..." : "Syncing...") : (isRtl ? "همگام‌سازی" : "Sync Data")}</span>
              </button>

              <Link
                href={`/${currentLocale}/student/achievements`}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Trophy size={14} className="text-amber-400" />
                <span>{isRtl ? "لیدربورد و دستاوردها" : "Leaderboard"}</span>
              </Link>
            </div>
          </div>

          {/* ================= TOP BENTO KPI PODS ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
            {/* Pod 1: Total Exams */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-white/10 transition-all group/pod">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  {t.quizzes.totalExams || (isRtl ? "کل آزمون‌ها" : "Total Exams")}
                </span>
                <FileQuestion size={16} className="text-neutral-500 group-hover/pod:text-white transition-colors" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">{stats.total}</span>
                <span className="text-[10px] text-neutral-500 font-semibold">{isRtl ? "امتحان فعال" : "Assessments"}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${stats.total > 0 ? ((stats.gradedCount + stats.pendingReview) / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Pod 2: To Do / Action Required */}
            <div className="bg-amber-500/[0.02] border border-amber-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "در انتظار شرکت" : "To Do"}</span>
                <Clock size={16} className="text-amber-400/80 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pending}</span>
                {stats.chanceExams > 0 && (
                  <span className="text-[10px] text-rose-400 font-bold">
                    ({stats.chanceExams} {isRtl ? "چانس" : "chance"})
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
                {stats.pending > 0
                  ? isRtl
                    ? "آماده برای ورود و پاسخگویی به سوالات"
                    : "Ready for taking examination"
                  : isRtl
                  ? "تمامی آزمون‌ها تحویل داده شده‌اند"
                  : "All examinations submitted"}
              </p>
            </div>

            {/* Pod 3: Exams Passed */}
            <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  {t.quizzes.examsPassed || (isRtl ? "آزمون‌های قبول‌شده" : "Exams Passed")}
                </span>
                <CheckCircle2 size={16} className="text-emerald-400 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.passed}</span>
                <span className="text-[10px] text-neutral-400 font-semibold">
                  / {stats.gradedCount} {isRtl ? "تصحیح‌شده" : "evaluated"}
                </span>
              </div>
              <p className="text-[10px] text-emerald-400/80 truncate mt-3 font-medium">
                {stats.gradedCount > 0
                  ? isRtl
                    ? `نرخ قبولی: ${stats.passRate}٪ با موفقیت`
                    : `Pass rate: ${stats.passRate}% success`
                  : isRtl
                  ? "در انتظار ثبت اولین نتیجه آزمون"
                  : "Awaiting first test evaluation"}
              </p>
            </div>

            {/* Pod 4: GPA & Average Score */}
            <div className="bg-purple-500/[0.02] border border-purple-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-purple-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-purple-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "معدل نمرات" : "Average GPA"}</span>
                <Trophy size={16} className="text-purple-400 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {stats.averageScore > 0 ? `${stats.averageScore}%` : "—"}
                </span>
                {stats.pendingReview > 0 && (
                  <span className="text-[10px] text-indigo-300 font-semibold">
                    ({stats.pendingReview} {isRtl ? "در حال تصحیح" : "review"})
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
                {stats.gradedCount > 0
                  ? isRtl
                    ? "میانگین نمرات ثبت‌شده در کارنامه"
                    : "Overall academic test average"
                  : isRtl
                  ? "ارزیابی اولیه پس از نمره‌دهی"
                  : "Calculated after review"}
              </p>
            </div>
          </div>
        </header>

        {/* ================= MAIN CONTENT SECTION ================= */}
        <section className="space-y-6">
          
          {/* Section Bar: Title & Search & Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {isRtl ? "فهرست آزمون‌های کلاسی و دوره‌ها" : "Assessments & Quizzes Roster"}
                </h2>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {isRtl ? "شامل سوالات ۴ گزینه‌ای و تشریحی با نمره‌دهی مستقیم اساتید" : "Including 4-choice MCQ and analytical descriptive questions"}
                </p>
              </div>
            </div>

            {/* Filter Tabs & Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-60">
                <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? "جستجوی آزمون یا دوره..." : "Search quiz or course..."}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute top-1/2 -translate-y-1/2 right-2.5 text-neutral-500 hover:text-white p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Status Tabs */}
              <div className="flex items-center bg-[#080812] p-1 rounded-xl border border-white/5 overflow-x-auto shadow-inner no-scrollbar">
                {(
                  [
                    { id: "all", label: isRtl ? "همه" : "All", count: stats.total },
                    { id: "pending", label: isRtl ? "در انتظار شرکت" : "To Do", count: stats.pending },
                    { id: "pending_review", label: isRtl ? "در حال تصحیح" : "Review", count: stats.pendingReview },
                    { id: "completed", label: isRtl ? "کارنامه آماده" : "Graded", count: stats.gradedCount },
                    { id: "chance", label: isRtl ? "چانس" : "Chance", count: stats.chanceExams },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      filter === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        filter === tab.id ? "bg-black/30 text-white" : "bg-white/5 text-neutral-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= QUIZZES GRID ================= */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredQuizzes.map((quiz) => {
                const isChance = quiz.quiz_type === "chance";
                const isPending = quiz.status === "pending";
                const isPendingReview = quiz.status === "pending_review";
                const isGraded = quiz.status === "graded";
                const isPassed = quiz.is_passed;

                return (
                  <div
                    key={quiz.id}
                    className="relative group bg-[#090913]/90 border border-white/5 rounded-[2rem] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-6"
                  >
                    {/* Top Badges Bar */}
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {/* Course Name Badge */}
                        <span className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] font-bold text-neutral-300 flex items-center gap-1.5 truncate max-w-[65%]">
                          <BookOpen size={12} className="text-indigo-400 shrink-0" />
                          <span className="truncate">{quiz.course_name}</span>
                        </span>

                        {/* Quiz Type Badge */}
                        {isChance ? (
                          <span className="px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/25 text-[10px] font-black text-rose-400 uppercase tracking-wider flex items-center gap-1 animate-pulse">
                            <Flame size={12} />
                            <span>{t.quizzes.chanceExam || (isRtl ? "آزمون چانس" : "Chance Exam")}</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-wider">
                            {isRtl ? "آزمون رسمی" : "Regular"}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-white leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {quiz.title}
                      </h3>

                      {/* Metadata Chips: Questions, MCQ, Descriptive, Points */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-400 font-semibold flex items-center gap-1">
                          <HelpCircle size={12} className="text-neutral-500" />
                          <span>
                            {quiz.totalQuestions} {isRtl ? "سوال" : "Questions"}
                          </span>
                        </span>

                        {quiz.mcqCount > 0 && (
                          <span className="px-2 py-0.5 rounded-lg bg-indigo-500/5 text-indigo-300 text-[10px] font-bold border border-indigo-500/10 flex items-center gap-1">
                            <ListChecks size={11} />
                            <span>
                              {quiz.mcqCount} {isRtl ? "تستی" : "MCQ"}
                            </span>
                          </span>
                        )}

                        {quiz.descriptiveCount > 0 && (
                          <span className="px-2 py-0.5 rounded-lg bg-purple-500/5 text-purple-300 text-[10px] font-bold border border-purple-500/10 flex items-center gap-1">
                            <PenTool size={11} />
                            <span>
                              {quiz.descriptiveCount} {isRtl ? "تشریحی" : "Essay"}
                            </span>
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-400 font-semibold ml-auto rtl:mr-auto rtl:ml-0">
                          {isRtl ? "حد قبولی:" : "Pass:"} {quiz.passing_score}٪
                        </span>
                      </div>
                    </div>

                    {/* ================= ACTION / RESULT CARD AREA ================= */}
                    <div className="pt-4 border-t border-white/5">
                      
                      {/* CASE 1: NOT ATTEMPTED YET (TO DO) */}
                      {isPending && (
                        <Link
                          href={`/${currentLocale}/student/quizzes/${quiz.id}`}
                          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group/btn"
                        >
                          <span>{t.quizzes.startExam || (isRtl ? "ورود به جلسه و شروع آزمون" : "Start Exam")}</span>
                          {isRtl ? (
                            <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                          ) : (
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          )}
                        </Link>
                      )}

                      {/* CASE 2: PENDING REVIEW (DESCRIPTIVE QUESTIONS BEING GRADED) */}
                      {isPendingReview && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-500/[0.05] border border-blue-500/20">
                            <Clock size={16} className="text-blue-400 animate-pulse shrink-0" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-blue-300">
                                {isRtl ? "برگه تحویل داده شد • در حال تصحیح استاد" : "Submitted • Grading in progress"}
                              </p>
                              {quiz.attempted_at && (
                                <p className="text-[10px] text-neutral-400 mt-0.5">
                                  {new Date(quiz.attempted_at).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              )}
                            </div>
                          </div>

                          <Link
                            href={`/${currentLocale}/student/quizzes/${quiz.id}`}
                            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>{isRtl ? "مشاهده پاسخ‌های ثبت‌شده" : "Review Submitted Paper"}</span>
                            {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                          </Link>
                        </div>
                      )}

                      {/* CASE 3: GRADED & COMPLETED */}
                      {isGraded && (
                        <div className="space-y-3">
                          <div
                            className={`flex items-center justify-between p-3.5 rounded-xl border ${
                              isPassed
                                ? "bg-emerald-500/[0.06] border-emerald-500/25"
                                : "bg-rose-500/[0.06] border-rose-500/25"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border ${
                                  isPassed
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                    : "bg-rose-500/20 border-rose-500/30 text-rose-400"
                                }`}
                              >
                                {isPassed ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                              </div>
                              <div>
                                <div className="flex items-baseline gap-1.5">
                                  <span
                                    className={`text-xl font-black ${
                                      isPassed ? "text-emerald-400" : "text-rose-400"
                                    }`}
                                  >
                                    {quiz.score ?? 0}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-bold">
                                    / {quiz.totalPoints || 100} {isRtl ? "امتیاز" : "pts"}
                                  </span>
                                </div>
                                <span
                                  className={`text-[10px] font-black uppercase tracking-wider ${
                                    isPassed ? "text-emerald-300" : "text-rose-300"
                                  }`}
                                >
                                  {isPassed
                                    ? isRtl
                                      ? "قبول شده (Passed) ✓"
                                      : "Exam Passed ✓"
                                    : isRtl
                                    ? "نیاز به تلاش مجدد"
                                    : "Needs Retake"}
                                </span>
                              </div>
                            </div>

                            {quiz.letter_grade && (
                              <div
                                className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                                  isPassed
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                    : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                                }`}
                              >
                                {quiz.letter_grade}
                              </div>
                            )}
                          </div>

                          <Link
                            href={`/${currentLocale}/student/quizzes/${quiz.id}`}
                            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>{t.quizzes.viewResults || (isRtl ? "مشاهده کارنامه و بازبینی سوالات" : "View Results & Review")}</span>
                            {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                          </Link>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-[#080812]/80 p-10 sm:p-16 rounded-[2.5rem] border border-white/5 text-center shadow-xl flex flex-col items-center justify-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-2">
                <FileQuestion size={32} className="text-neutral-500" />
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide">
                {t.quizzes.noQuizzesFound || (isRtl ? "آزمونی در این دسته‌بندی یافت نشد" : "No Quizzes Found")}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
                {filter === "all"
                  ? isRtl
                    ? "در حال حاضر هیچ آزمون فعالی برای کلاس‌ها و دوره‌های ثبت‌نامی شما تعریف نشده است."
                    : "No examinations are currently assigned to your active classrooms."
                  : isRtl
                  ? `هیچ آزمونی با وضعیت فیلتر «${filter}» مطابقت ندارد.`
                  : `No exams currently found matching the "${filter}" filter.`}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-200 transition-colors"
                >
                  {isRtl ? "مشاهده همه آزمون‌ها" : "View All Exams"}
                </button>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
