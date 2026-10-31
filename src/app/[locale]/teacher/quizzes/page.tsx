"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  Plus,
  Target,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  ArrowRight,
  Clock,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  FileQuestion,
  Users,
  Award,
  Layers,
  Trash2,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ListChecks,
  AlignLeft,
  ChevronRight
} from "lucide-react";

interface QuizOverview {
  id: string;
  title: string;
  course_name: string;
  class_name: string;
  passing_score: number;
  is_active: boolean;
  quiz_type: "regular" | "chance";
  created_at: string;
  total_questions: number;
  mcq_count: number;
  desc_count: number;
  stats: {
    total_attempts: number;
    pending_reviews: number;
    passed_count: number;
  };
}

export default function TeacherQuizzesOverviewPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizOverview[]>([]);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filters & Search
  const [filterType, setFilterType] = useState<"all" | "regular" | "chance">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTeacherQuizzes();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchTeacherQuizzes = async (isManual = false) => {
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
      const { data: myClasses, error: classError } = await supabase
        .from("class_groups")
        .select("id, class_name, course_id")
        .eq("teacher_id", session.user.id);

      if (classError) throw classError;

      if (!myClasses || myClasses.length === 0) {
        setQuizzes([]);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      const classIds = myClasses.map(c => c.id);
      const courseIds = [...new Set(myClasses.map(c => c.course_id).filter(Boolean))];

      // 2. Fetch courses
      let courses: any[] = [];
      if (courseIds.length > 0) {
        const { data: coursesData } = await supabase
          .from("courses")
          .select("id, title")
          .in("id", courseIds);
        courses = coursesData || [];
      }

      // 3. Fetch quizzes
      const { data: allQuizzes, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title, course_id, class_group_id, passing_score, is_active, quiz_type, created_at")
        .in("class_group_id", classIds)
        .order("created_at", { ascending: false });

      if (quizError) throw quizError;

      if (!allQuizzes || allQuizzes.length === 0) {
        setQuizzes([]);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      const quizIds = allQuizzes.map(q => q.id);

      // 4. Fetch questions metadata
      const { data: questionsData } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, question_type, option_a")
        .in("quiz_id", quizIds);

      // 5. Fetch attempts metadata
      const { data: attemptsData } = await supabase
        .from("quiz_attempts")
        .select("id, quiz_id, status, is_passed")
        .in("quiz_id", quizIds);

      // 6. Map and correlate all data
      const formatted: QuizOverview[] = allQuizzes.map((quiz) => {
        const classData = myClasses.find(c => c.id === quiz.class_group_id);
        const courseData = courses.find(c => c.id === (quiz.course_id || classData?.course_id));

        const quizQuestions = questionsData?.filter(q => q.quiz_id === quiz.id) || [];
        const mcqCount = quizQuestions.filter(q => q.question_type === "multiple_choice" || (q.option_a && q.option_a !== "Descriptive")).length;
        const descCount = quizQuestions.length - mcqCount;

        const quizAttempts = attemptsData?.filter(a => a.quiz_id === quiz.id) || [];
        const pendingCount = quizAttempts.filter(a => a.status === "pending_review").length;
        const passedCount = quizAttempts.filter(a => a.is_passed).length;

        return {
          id: quiz.id,
          title: quiz.title,
          course_name: courseData?.title || "Course Track",
          class_name: classData?.class_name || "Cohort",
          passing_score: quiz.passing_score || 70,
          is_active: quiz.is_active,
          quiz_type: (quiz.quiz_type as any) === "chance" ? "chance" : "regular",
          created_at: quiz.created_at,
          total_questions: quizQuestions.length,
          mcq_count: mcqCount,
          desc_count: descCount,
          stats: {
            total_attempts: quizAttempts.length,
            pending_reviews: pendingCount,
            passed_count: passedCount,
          },
        };
      });

      setQuizzes(formatted);

    } catch (error: any) {
      console.error("Error fetching exams:", error);
      showToast("error", "Failed to fetch assessments: " + error.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("quizzes")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      setQuizzes(prev => prev.map(q => q.id === id ? { ...q, is_active: !currentStatus } : q));
      showToast("success", `Exam status updated to ${!currentStatus ? "ONLINE (Live)" : "OFFLINE (Draft)"}`);
    } catch (error: any) {
      showToast("error", "Failed to toggle status: " + error.message);
    }
  };

  const handleDeleteQuiz = async (quizId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will permanently delete all student submissions, scores, and questions associated with this exam.`)) {
      return;
    }

    setIsDeletingId(quizId);
    const supabase = createClient();

    try {
      // 1. Delete student answers
      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select("id")
        .eq("quiz_id", quizId);

      if (attempts && attempts.length > 0) {
        const attemptIds = attempts.map(a => a.id);
        await supabase
          .from("quiz_student_answers")
          .delete()
          .in("attempt_id", attemptIds);

        // 2. Delete attempts
        await supabase
          .from("quiz_attempts")
          .delete()
          .eq("quiz_id", quizId);
      }

      // 3. Delete questions
      await supabase
        .from("quiz_questions")
        .delete()
        .eq("quiz_id", quizId);

      // 4. Delete quiz
      const { error } = await supabase
        .from("quizzes")
        .delete()
        .eq("id", quizId);

      if (error) throw error;

      setQuizzes(prev => prev.filter(q => q.id !== quizId));
      showToast("success", `Exam "${title}" successfully removed.`);
    } catch (error: any) {
      showToast("error", "Failed to delete exam: " + error.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = quizzes.length;
    const active = quizzes.filter(q => q.is_active).length;
    const totalAttempts = quizzes.reduce((acc, q) => acc + q.stats.total_attempts, 0);
    const pendingReviews = quizzes.reduce((acc, q) => acc + q.stats.pending_reviews, 0);

    return { total, active, totalAttempts, pendingReviews };
  }, [quizzes]);

  // Filtering
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      // Type filter
      if (filterType !== "all" && quiz.quiz_type !== filterType) return false;

      // Status filter
      if (filterStatus === "active" && !quiz.is_active) return false;
      if (filterStatus === "draft" && quiz.is_active) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = quiz.title.toLowerCase().includes(q);
        const matchCourse = quiz.course_name.toLowerCase().includes(q);
        const matchClass = quiz.class_name.toLowerCase().includes(q);
        if (!matchTitle && !matchCourse && !matchClass) return false;
      }

      return true;
    });
  }, [quizzes, filterType, filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Examination Terminal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 text-xs font-black uppercase tracking-wider animate-[fadeInDown_0.2s_ease-out] ${
          toastMessage.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {toastMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a10]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/5 text-fuchsia-400 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 shadow-inner shrink-0">
              <Target size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                  Assessment Management Suite
                </span>
                <span className="text-neutral-600 text-xs font-mono">•</span>
                <span className="text-neutral-400 text-xs font-medium">MCQ & Descriptive Questions</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Examinations</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl mt-1 leading-relaxed">
                Configure comprehensive multi-choice tests, author descriptive questions, and grade student attempts.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => fetchTeacherQuizzes(true)}
              disabled={isRefreshing}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-neutral-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              title="Refresh Quizzes"
            >
              <RefreshCw size={18} className={isRefreshing ? "animate-spin text-fuchsia-400" : ""} />
            </button>

            <Link 
              href={`/${currentLocale}/teacher/quizzes/create`} 
              className="flex-1 sm:flex-none px-7 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-[0_15px_35px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
            >
              <Plus size={18} /> Deploy New Exam
            </Link>
          </div>

        </header>

        {/* ================= BENTO KPI METRICS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Total Exams */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/20 shrink-0">
              <FileQuestion size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Exams</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.total}</h3>
            </div>
          </div>

          {/* Active Live Exams */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Live Online</p>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{stats.active}</h3>
            </div>
          </div>

          {/* Total Student Attempts */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Submissions</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.totalAttempts}</h3>
            </div>
          </div>

          {/* Pending Papers to Grade */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg relative overflow-hidden">
            {stats.pendingReviews > 0 && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            )}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              stats.pendingReviews > 0
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse"
                : "bg-white/5 text-neutral-500 border-white/5"
            }`}>
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Needs Grading</p>
              <h3 className={`text-xl sm:text-2xl font-black mt-0.5 ${stats.pendingReviews > 0 ? "text-amber-400" : "text-neutral-400"}`}>
                {stats.pendingReviews} Papers
              </h3>
            </div>
          </div>

        </div>

        {/* ================= CONTROLS & FILTER TOOLBAR ================= */}
        <div className="bg-[#0a0a10]/80 border border-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search exam title, course name, or cohort..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            
            {/* Exam Type Selector */}
            <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "all" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilterType("regular")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "regular" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setFilterType("chance")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "chance" ? "bg-rose-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Chance (Retake)
              </button>
            </div>

            {/* Status Selector */}
            <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === "all" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                Status: All
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-400 hover:text-white"
                }`}
              >
                Live
              </button>
              <button
                onClick={() => setFilterStatus("draft")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === "draft" ? "bg-white/10 text-neutral-300" : "text-neutral-400 hover:text-white"
                }`}
              >
                Draft
              </button>
            </div>

          </div>

        </div>

        {/* ================= EXAMS GRID ================= */}
        {filteredQuizzes.length === 0 ? (
          <div className="bg-[#0a0a10]/50 border border-dashed border-white/10 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center backdrop-blur-xl shadow-2xl min-h-[350px]">
            <ShieldAlert size={52} className="text-neutral-600 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No Assessments Found</h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              {searchQuery || filterType !== "all" || filterStatus !== "all"
                ? "No examinations match your active search filters. Try adjusting your query or resetting filters."
                : "No assessments have been deployed to your classrooms yet. Click 'Deploy New Exam' above to begin."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredQuizzes.map((quiz) => {
              const isChance = quiz.quiz_type === "chance";

              return (
                <div
                  key={quiz.id}
                  className="bg-[#0a0a10]/90 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between backdrop-blur-3xl shadow-xl hover:border-fuchsia-500/30 transition-all duration-300 group relative overflow-hidden space-y-6"
                >
                  
                  {/* Glowing background hint */}
                  <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isChance ? "bg-rose-500/10" : "bg-fuchsia-500/10"
                  }`}></div>

                  {/* Header: Cohort Badge, Type Pill & Status Switch */}
                  <div className="flex items-start justify-between gap-4">
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-purple-300 uppercase tracking-wider">
                          {quiz.course_name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[9px] font-mono text-neutral-400 bg-white/[0.02] border border-white/5">
                          {quiz.class_name}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          isChance
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"
                        }`}>
                          {isChance ? "Chance (Retake)" : "Regular Exam"}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-fuchsia-300 transition-colors">
                        {quiz.title}
                      </h3>
                    </div>

                    {/* Live/Draft Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(quiz.id, quiz.is_active)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 shadow-sm ${
                        quiz.is_active
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10"
                      }`}
                      title={quiz.is_active ? "Exam is Live: Click to set Draft" : "Exam is Draft: Click to set Live"}
                    >
                      {quiz.is_active ? <CheckCircle2 size={13} /> : <div className="w-2 h-2 rounded-full bg-neutral-500"></div>}
                      <span>{quiz.is_active ? "Live" : "Draft"}</span>
                    </button>

                  </div>

                  {/* Middle Info: Question breakdown & passing threshold */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    
                    {/* Questions Count Breakdown */}
                    <div className="space-y-1">
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Questions</p>
                      <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <FileQuestion size={14} className="text-fuchsia-400" />
                        <span>{quiz.total_questions} total</span>
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        {quiz.mcq_count} MCQ • {quiz.desc_count} Desc
                      </p>
                    </div>

                    {/* Passing Score */}
                    <div className="space-y-1">
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Pass Threshold</p>
                      <p className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                        <Award size={14} className="text-amber-400" />
                        <span>{quiz.passing_score}% Score</span>
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">Benchmark</p>
                    </div>

                    {/* Submissions Count */}
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Submissions</p>
                      <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <Users size={14} className="text-purple-400" />
                        <span>{quiz.stats.total_attempts} attempts</span>
                      </p>
                      <p className="text-[10px] text-emerald-400 font-mono">
                        {quiz.stats.passed_count} Passed
                      </p>
                    </div>

                  </div>

                  {/* Urgent Review Alert if any pending papers */}
                  {quiz.stats.pending_reviews > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs animate-pulse">
                      <span className="text-amber-400 font-bold flex items-center gap-2">
                        <Clock size={15} />
                        <span>{quiz.stats.pending_reviews} Descriptive Paper{quiz.stats.pending_reviews === 1 ? "" : "s"} awaiting evaluation</span>
                      </span>
                      <span className="text-[10px] font-black uppercase text-amber-300 font-mono">Urgent</span>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Question Bank Link */}
                    <Link
                      href={`/${currentLocale}/teacher/quizzes/${quiz.id}/questions`}
                      className="w-full sm:flex-1 text-center py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-200 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ListChecks size={15} className="text-fuchsia-400" />
                      <span>Question Bank</span>
                    </Link>

                    {/* Results / Grade Papers Link */}
                    <Link
                      href={`/${currentLocale}/teacher/quizzes/${quiz.id}/results`}
                      className={`w-full sm:flex-1 text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                        quiz.stats.pending_reviews > 0
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-[0_10px_25px_rgba(245,158,11,0.25)]"
                          : "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-[0_10px_25px_rgba(217,70,239,0.25)]"
                      }`}
                    >
                      <span>{quiz.stats.pending_reviews > 0 ? "Grade Papers" : "View Results"}</span>
                      <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                    </Link>

                    {/* Delete Quiz Button */}
                    <button
                      type="button"
                      disabled={isDeletingId === quiz.id}
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                      className="p-3.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all active:scale-95 disabled:opacity-40 shrink-0 self-end sm:self-auto"
                      title="Permanently Delete Assessment"
                    >
                      {isDeletingId === quiz.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>

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