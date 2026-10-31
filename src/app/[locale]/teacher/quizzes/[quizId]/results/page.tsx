"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  FileText,
  CheckCircle2,
  XCircle,
  Users,
  Target,
  Clock,
  ShieldAlert,
  X,
  Edit3,
  Save,
  AlertCircle,
  Search,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Award,
  ListChecks,
  AlignLeft,
  Check,
  Star,
  ExternalLink,
  ChevronDown
} from "lucide-react";

interface QuizAttempt {
  id: string;
  student_id: string;
  score: number;
  is_passed: boolean;
  status: "pending_review" | "graded";
  letter_grade: string | null;
  attempted_at: string;
  // Student Profile
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
}

interface QuizInfo {
  title: string;
  passing_score: number;
  quiz_type: string;
}

interface Question {
  id: string;
  question_text: string;
  points: number;
  question_type?: string | null;
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  correct_option?: string | null;
}

interface StudentAnswer {
  id: string;
  question_id: string;
  student_answer_text: string;
  points_earned: number;
  is_correct: boolean;
}

export default function TeacherQuizResultsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const quizId = (params?.quizId || params?.quizid || params?.id) as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending_review" | "passed" | "chance">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "score_high" | "score_low" | "name">("newest");

  // Grading Modal State
  const [selectedAttemptIndex, setSelectedAttemptIndex] = useState<number | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<StudentAnswer[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Scores state: { [question_id]: points }
  const [gradingScores, setGradingScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (quizId) {
      fetchResultsData();
    }
  }, [quizId]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchResultsData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // 1. Fetch quiz info
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title, passing_score, quiz_type")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setQuizInfo(quizData);

      // 2. Fetch questions
      const { data: qData } = await supabase
        .from("quiz_questions")
        .select("id, question_text, points, question_type, option_a, option_b, option_c, option_d, correct_option")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qData) setQuestions(qData);

      // 3. Fetch attempts
      const { data: attemptsData, error: attemptsError } = await supabase
        .from("quiz_attempts")
        .select("id, student_id, score, is_passed, status, letter_grade, attempted_at")
        .eq("quiz_id", quizId)
        .order("attempted_at", { ascending: false });

      if (attemptsError) throw attemptsError;

      if (attemptsData && attemptsData.length > 0) {
        const studentIds = [...new Set(attemptsData.map(a => a.student_id))];

        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        const formatted = attemptsData.map((attempt: any) => {
          const p = profilesData?.find((prof: any) => prof.id === attempt.student_id);
          return {
            ...attempt,
            score: Number(attempt.score) || 0,
            first_name: p?.first_name || "Enrolled",
            last_name: p?.last_name || "Student",
            email: p?.email || "No Email",
            avatar_url: p?.avatar_url || "",
          };
        });
        setAttempts(formatted);
      } else {
        setAttempts([]);
      }
    } catch (error: any) {
      console.error("Error loading quiz results:", error);
      showToast("error", "Failed to retrieve results: " + error.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = attempts.length;
    const pending = attempts.filter(a => a.status === "pending_review").length;
    const graded = attempts.filter(a => a.status === "graded");
    const passed = graded.filter(a => a.is_passed).length;
    const chance = graded.length - passed;
    const passRate = graded.length > 0 ? Math.round((passed / graded.length) * 100) : 0;

    return { total, pending, passed, chance, gradedCount: graded.length, passRate };
  }, [attempts]);

  // Filtered Attempts
  const filteredAttempts = useMemo(() => {
    return attempts
      .filter((attempt) => {
        // Status filter
        if (statusFilter === "pending_review" && attempt.status !== "pending_review") return false;
        if (statusFilter === "passed" && (!attempt.is_passed || attempt.status !== "graded")) return false;
        if (statusFilter === "chance" && (attempt.is_passed || attempt.status !== "graded")) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const fullName = `${attempt.first_name} ${attempt.last_name}`.toLowerCase();
          const email = attempt.email.toLowerCase();
          if (!fullName.includes(q) && !email.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime();
        if (sortBy === "oldest") return new Date(a.attempted_at).getTime() - new Date(b.attempted_at).getTime();
        if (sortBy === "score_high") return b.score - a.score;
        if (sortBy === "score_low") return a.score - b.score;
        if (sortBy === "name") return a.first_name.localeCompare(b.first_name);
        return 0;
      });
  }, [attempts, statusFilter, searchQuery, sortBy]);

  // Total possible quiz points
  const totalQuizPoints = useMemo(() => {
    return questions.reduce((acc, curr) => acc + (curr.points || 0), 0);
  }, [questions]);

  // Open Grading Modal
  const openGradingModal = async (indexInFiltered: number) => {
    const attempt = filteredAttempts[indexInFiltered];
    if (!attempt) return;

    setSelectedAttemptIndex(indexInFiltered);
    setIsLoadingDetails(true);
    setGradingScores({});

    const supabase = createClient();
    try {
      const { data: answersData, error } = await supabase
        .from("quiz_student_answers")
        .select("*")
        .eq("attempt_id", attempt.id);

      if (error) throw error;

      setStudentAnswers(answersData || []);

      // Preload scores
      const initialScores: Record<string, number> = {};
      questions.forEach((q) => {
        const studentAns = answersData?.find(a => a.question_id === q.id);
        if (studentAns) {
          initialScores[q.id] = studentAns.points_earned !== null && studentAns.points_earned !== undefined
            ? Number(studentAns.points_earned)
            : (studentAns.is_correct ? q.points : 0);
        } else {
          initialScores[q.id] = 0;
        }
      });

      setGradingScores(initialScores);
    } catch (err: any) {
      console.error("Failed to load student answers:", err);
      showToast("error", "Failed to retrieve student paper answers: " + err.message);
      setSelectedAttemptIndex(null);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const closeGradingModal = () => {
    setSelectedAttemptIndex(null);
    setStudentAnswers([]);
    setGradingScores({});
  };

  const selectedAttempt = selectedAttemptIndex !== null ? filteredAttempts[selectedAttemptIndex] : null;

  // Next / Previous Student Navigation
  const navigateStudent = (direction: "prev" | "next") => {
    if (selectedAttemptIndex === null) return;
    const nextIdx = direction === "next" ? selectedAttemptIndex + 1 : selectedAttemptIndex - 1;
    if (nextIdx >= 0 && nextIdx < filteredAttempts.length) {
      openGradingModal(nextIdx);
    }
  };

  // Letter Grade Calculation
  const calculateLetterGrade = (score: number, maxPoints: number): "A+" | "A" | "B" | "C" | "Chance" => {
    const percentage = maxPoints > 0 ? (score / maxPoints) * 100 : score;
    if (percentage >= 100) return "A+";
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    return "Chance";
  };

  // Quick percentage assigner for a single question
  const setQuestionPercentage = (questionId: string, maxPoints: number, pct: number) => {
    const points = Math.round((maxPoints * pct) / 100);
    setGradingScores(prev => ({ ...prev, [questionId]: points }));
  };

  const currentModalCalculatedScore = useMemo(() => {
    return Object.values(gradingScores).reduce((acc, curr) => acc + (curr || 0), 0);
  }, [gradingScores]);

  const currentModalGrade = useMemo(() => {
    return calculateLetterGrade(currentModalCalculatedScore, totalQuizPoints || 100);
  }, [currentModalCalculatedScore, totalQuizPoints]);

  const currentModalPassed = useMemo(() => {
    if (!quizInfo) return false;
    const pct = totalQuizPoints > 0 ? (currentModalCalculatedScore / totalQuizPoints) * 100 : currentModalCalculatedScore;
    return pct >= quizInfo.passing_score;
  }, [currentModalCalculatedScore, totalQuizPoints, quizInfo]);

  // Save Grades to Database
  const handleSaveGrades = async () => {
    if (!selectedAttempt || !quizInfo) return;

    setIsSubmittingGrade(true);
    const supabase = createClient();

    try {
      // 1. Update each answer in quiz_student_answers
      for (const ans of studentAnswers) {
        const awardedPoints = gradingScores[ans.question_id] || 0;
        const targetQ = questions.find(q => q.id === ans.question_id);
        const isCorrect = awardedPoints > 0;

        await supabase
          .from("quiz_student_answers")
          .update({
            points_earned: awardedPoints,
            is_correct: isCorrect,
          })
          .eq("id", ans.id);
      }

      // 2. Update quiz_attempts
      const { error: attemptError } = await supabase
        .from("quiz_attempts")
        .update({
          score: currentModalCalculatedScore,
          is_passed: currentModalPassed,
          status: "graded",
          letter_grade: currentModalGrade,
        })
        .eq("id", selectedAttempt.id);

      if (attemptError) throw attemptError;

      // 3. Update local state
      setAttempts(prev =>
        prev.map(a =>
          a.id === selectedAttempt.id
            ? {
                ...a,
                score: currentModalCalculatedScore,
                is_passed: currentModalPassed,
                status: "graded",
                letter_grade: currentModalGrade,
              }
            : a
        )
      );

      showToast("success", `Evaluation completed for ${selectedAttempt.first_name} ${selectedAttempt.last_name}`);

      // Auto-advance to next student if available
      if (selectedAttemptIndex !== null && selectedAttemptIndex + 1 < filteredAttempts.length) {
        openGradingModal(selectedAttemptIndex + 1);
      } else {
        closeGradingModal();
      }

    } catch (err: any) {
      showToast("error", "Failed to save evaluation: " + err.message);
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (attempts.length === 0 || !quizInfo) {
      showToast("error", "No exam attempts to export.");
      return;
    }

    const headers = ["Student Name", "Email", "Submission Date", "Score", "Total Points", "Status", "Grade", "Pass Status"];
    const rows = attempts.map(a => [
      `"${a.first_name} ${a.last_name}"`,
      `"${a.email}"`,
      `"${new Date(a.attempted_at).toLocaleString()}"`,
      a.status === "graded" ? a.score : "Unscored",
      totalQuizPoints || 100,
      a.status,
      a.letter_grade || "N/A",
      a.status === "graded" ? (a.is_passed ? "PASSED" : "CHANCE") : "PENDING",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ExamResults_${quizInfo.title.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("success", "Gradebook CSV exported successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Examination Results...
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
        <header className="bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            
            <div className="space-y-3">
              <Link
                href={`/${currentLocale}/teacher/quizzes`}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 active:scale-95"
              >
                <ArrowLeft size={13} className={isRtl ? "rotate-180" : ""} /> Return to Examination Terminal
              </Link>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                    Results & Paper Evaluation
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    quizInfo?.quiz_type === "chance"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  }`}>
                    {quizInfo?.quiz_type === "chance" ? "Chance (Retake)" : "Regular Exam"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {quizInfo?.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                  Review student answers, grade descriptive essays, and publish verified scores.
                </p>
              </div>
            </div>

            {/* Metrics Pills */}
            <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 shrink-0">
              <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <Target size={16} /> Passing Benchmark: {quizInfo?.passing_score}%
              </div>
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono flex items-center gap-2">
                <Award size={16} className="text-fuchsia-400" />
                <span>Max Points:</span>
                <span className="font-bold text-white">{totalQuizPoints} Pts</span>
              </div>
            </div>

          </div>

        </header>

        {/* ================= BENTO KPI METRICS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Total Submissions */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/20 shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Submitted</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.total}</h3>
            </div>
          </div>

          {/* Pending Manual Grading */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg relative overflow-hidden">
            {stats.pending > 0 && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            )}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              stats.pending > 0
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse"
                : "bg-white/5 text-neutral-500 border-white/5"
            }`}>
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Needs Grading</p>
              <h3 className={`text-xl sm:text-2xl font-black mt-0.5 ${stats.pending > 0 ? "text-amber-400" : "text-neutral-400"}`}>
                {stats.pending}
              </h3>
            </div>
          </div>

          {/* Passed Students */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Passed</p>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{stats.passRate}%</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{stats.passed}</h3>
            </div>
          </div>

          {/* Chance / Failed */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 shrink-0">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Failed / Chance</p>
              <h3 className="text-xl sm:text-2xl font-black text-rose-400 mt-0.5">{stats.chance}</h3>
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
              placeholder="Search student by name or email address..."
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
            
            {/* Status Selector */}
            <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "all" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                All ({attempts.length})
              </button>
              <button
                onClick={() => setStatusFilter("pending_review")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "pending_review" ? "bg-amber-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Needs Grading ({stats.pending})
              </button>
              <button
                onClick={() => setStatusFilter("passed")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "passed" ? "bg-emerald-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Passed ({stats.passed})
              </button>
              <button
                onClick={() => setStatusFilter("chance")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "chance" ? "bg-rose-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Chance ({stats.chance})
              </button>
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-black/60 border border-white/10 text-neutral-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner shrink-0 cursor-pointer"
            >
              <option value="newest">Sort: Newest Attempt</option>
              <option value="oldest">Sort: Oldest Attempt</option>
              <option value="score_high">Sort: Highest Score</option>
              <option value="score_low">Sort: Lowest Score</option>
              <option value="name">Sort: Student Name</option>
            </select>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white text-xs font-bold transition-all shrink-0 active:scale-95"
              title="Export Gradebook CSV"
            >
              <Download size={16} />
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => fetchResultsData(true)}
              disabled={isRefreshing}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white text-xs font-bold transition-all shrink-0 active:scale-95 disabled:opacity-50"
              title="Refresh Results"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin text-fuchsia-400" : ""} />
            </button>

          </div>

        </div>

        {/* ================= ATTEMPTS TABLE (RESPONSIVE) ================= */}
        <div className="bg-[#0a0a10]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          
          {filteredAttempts.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <ShieldAlert size={44} className="text-neutral-600 mb-3" />
              <p className="text-neutral-400 text-sm font-bold">No examination attempts found.</p>
              <p className="text-neutral-500 text-xs mt-1">
                {searchQuery || statusFilter !== "all"
                  ? "Try resetting filters or search query."
                  : "Students have not taken this examination yet."}
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP & TABLET TABLE */}
              <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      <th className="p-6">Student Roster</th>
                      <th className="p-6">Submitted At</th>
                      <th className="p-6 text-center">Status & Grade</th>
                      <th className="p-6 text-center">Points Earned</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAttempts.map((attempt, idx) => {
                      const isPending = attempt.status === "pending_review";

                      return (
                        <tr key={attempt.id} className="hover:bg-white/[0.02] transition-colors group">
                          
                          {/* Student Profile */}
                          <td className="p-5 sm:p-6">
                            <div className="flex items-center gap-3.5">
                              <div className="w-11 h-11 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                                {attempt.avatar_url ? (
                                  <img src={attempt.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-base font-black text-fuchsia-400">{attempt.first_name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-white text-sm group-hover:text-fuchsia-300 transition-colors">
                                  {attempt.first_name} {attempt.last_name}
                                </p>
                                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{attempt.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Submission Date */}
                          <td className="p-5 sm:p-6 font-mono text-xs text-neutral-300">
                            {new Date(attempt.attempted_at).toLocaleDateString()} {new Date(attempt.attempted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>

                          {/* Status & Grade */}
                          <td className="p-5 sm:p-6 text-center">
                            {isPending ? (
                              <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-500/20 bg-amber-500/10 text-amber-400 inline-flex items-center gap-1.5 animate-pulse">
                                <Clock size={12} /> Needs Grading
                              </span>
                            ) : (
                              <div className="inline-flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                                  attempt.is_passed
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                }`}>
                                  {attempt.is_passed ? "Passed" : "Chance"}
                                </span>
                                {attempt.letter_grade && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-white/5 border border-white/10 text-white">
                                    {attempt.letter_grade}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Points Earned */}
                          <td className="p-5 sm:p-6 text-center">
                            {isPending ? (
                              <span className="text-neutral-500 font-mono text-xs">Pending</span>
                            ) : (
                              <span className={`font-mono font-black text-base ${
                                attempt.is_passed ? "text-emerald-400" : "text-rose-400"
                              }`}>
                                {attempt.score} <span className="text-neutral-600 text-xs font-normal">/ {totalQuizPoints}</span>
                              </span>
                            )}
                          </td>

                          {/* Action Button */}
                          <td className="p-5 sm:p-6 text-right">
                            <button
                              onClick={() => openGradingModal(idx)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center gap-2 ml-auto ${
                                isPending
                                  ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-500/20"
                                  : "bg-white/5 hover:bg-fuchsia-500/10 border border-white/10 hover:border-fuchsia-500/30 text-neutral-200 hover:text-white"
                              }`}
                            >
                              <Edit3 size={14} />
                              <span>{isPending ? "Evaluate Paper" : "Review Paper"}</span>
                            </button>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden flex flex-col divide-y divide-white/5">
                {filteredAttempts.map((attempt, idx) => {
                  const isPending = attempt.status === "pending_review";

                  return (
                    <div key={attempt.id} className="p-4 sm:p-5 flex flex-col gap-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          {attempt.avatar_url ? (
                            <img src={attempt.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-black text-fuchsia-400">{attempt.first_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">
                            {attempt.first_name} {attempt.last_name}
                          </p>
                          <p className="text-[10px] text-neutral-500 font-mono truncate">
                            {new Date(attempt.attempted_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-black/50 p-3.5 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-[10px] text-neutral-500 font-mono uppercase">Result</p>
                          {isPending ? (
                            <span className="text-amber-400 text-xs font-bold flex items-center gap-1 mt-0.5">
                              <Clock size={12} /> Needs Grading
                            </span>
                          ) : (
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`font-mono font-black text-sm ${attempt.is_passed ? "text-emerald-400" : "text-rose-400"}`}>
                                {attempt.score} Pts
                              </span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/5 text-neutral-300">
                                {attempt.letter_grade}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => openGradingModal(idx)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95 ${
                            isPending
                              ? "bg-amber-600 text-white"
                              : "bg-white/10 text-white border border-white/10"
                          }`}
                        >
                          <Edit3 size={13} />
                          <span>{isPending ? "Evaluate" : "Review"}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: WORLD-CLASS PAPER EVALUATION =================== */}
      {/* ========================================================================= */}
      {selectedAttempt && selectedAttemptIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeGradingModal}></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-[#0a0a10] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col h-[94vh] z-10">
            
            {/* Modal Header: Student Info + Prev/Next Navigator */}
            <div className="p-5 sm:p-6 border-b border-white/5 bg-white/[0.02] shrink-0 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                  {selectedAttempt.avatar_url ? (
                    <img src={selectedAttempt.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-black text-fuchsia-400">{selectedAttempt.first_name.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-white truncate">
                    Paper: {selectedAttempt.first_name} {selectedAttempt.last_name}
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                    Submitted: {new Date(selectedAttempt.attempted_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Navigator + Close */}
              <div className="flex items-center gap-2 shrink-0">
                
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-400">
                  {selectedAttemptIndex + 1} / {filteredAttempts.length}
                </span>

                <button
                  type="button"
                  disabled={selectedAttemptIndex <= 0}
                  onClick={() => navigateStudent("prev")}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors border border-white/5"
                  title="Previous Student"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  disabled={selectedAttemptIndex >= filteredAttempts.length - 1}
                  onClick={() => navigateStudent("next")}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors border border-white/5"
                  title="Next Student"
                >
                  <ChevronRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={closeGradingModal}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5 ml-1"
                >
                  <X size={16} />
                </button>

              </div>

            </div>

            {/* Modal Body: Question-by-Question Grading */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 space-y-6 bg-[#050508]">
              
              {isLoadingDetails ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3">
                  <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin" />
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Retrieving Student Answers...
                  </p>
                </div>
              ) : (
                questions.map((q, index) => {
                  const studentAns = studentAnswers.find(sa => sa.question_id === q.id);
                  const isDescriptive = q.question_type === "descriptive" || q.option_a === "Descriptive";
                  const currentScore = gradingScores[q.id] || 0;

                  return (
                    <div
                      key={q.id}
                      className="bg-[#0a0a10]/90 border border-white/5 rounded-[2rem] p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden"
                    >
                      
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 font-black flex items-center justify-center text-xs shrink-0">
                            Q{index + 1}
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border flex items-center gap-1 ${
                            isDescriptive
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"
                          }`}>
                            {isDescriptive ? <AlignLeft size={10} /> : <ListChecks size={10} />}
                            {isDescriptive ? "Descriptive Essay" : "Multiple Choice"}
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-neutral-400">
                          Max: {q.points} Pts
                        </span>
                      </div>

                      {/* Question Prompt */}
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {q.question_text}
                      </p>

                      {/* Student's Answer Presentation */}
                      {isDescriptive ? (
                        /* Descriptive Student Response */
                        <div className="space-y-3 pt-1">
                          <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                              <FileText size={13} className="text-purple-400" /> Student's Written Response:
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap">
                              {studentAns?.student_answer_text || (
                                <span className="italic text-neutral-600">No answer provided by student.</span>
                              )}
                            </p>
                          </div>

                          {/* Quick Score Assigner */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-neutral-400 font-mono">Award:</span>
                              {[100, 80, 60, 50, 0].map((pct) => (
                                <button
                                  key={pct}
                                  type="button"
                                  onClick={() => setQuestionPercentage(q.id, q.points, pct)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                                    currentScore === Math.round((q.points * pct) / 100)
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                                      : "bg-white/5 text-neutral-400 border-white/5 hover:text-white"
                                  }`}
                                >
                                  {pct}% ({Math.round((q.points * pct) / 100)}p)
                                </button>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <label className="text-[10px] font-black uppercase text-amber-400">Assigned:</label>
                              <input
                                type="number"
                                min="0"
                                max={q.points}
                                value={currentScore}
                                onChange={(e) => {
                                  let val = Math.min(q.points, Math.max(0, Number(e.target.value) || 0));
                                  setGradingScores(prev => ({ ...prev, [q.id]: val }));
                                }}
                                className="w-16 bg-black border border-white/10 rounded-xl px-2 py-1.5 text-center text-amber-400 font-mono font-black text-sm focus:outline-none focus:border-amber-500/50"
                              />
                              <span className="text-xs font-mono text-neutral-500">/ {q.points}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Multiple Choice Response Evaluation */
                        <div className="space-y-3 pt-1">
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/5">
                            {(["A", "B", "C", "D"] as const).map((optKey) => {
                              const optText = q[`option_${optKey.toLowerCase()}` as keyof Question] as string;
                              const isCorrectAnswer = q.correct_option === optKey;
                              const isStudentChoice = studentAns?.student_answer_text === optKey;

                              if (!optText || optText === "Descriptive") return null;

                              return (
                                <div
                                  key={optKey}
                                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium border ${
                                    isStudentChoice && isCorrectAnswer
                                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm"
                                      : isStudentChoice && !isCorrectAnswer
                                      ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                                      : isCorrectAnswer
                                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400/80"
                                      : "bg-white/[0.02] border-white/5 text-neutral-400"
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${
                                    isStudentChoice
                                      ? isCorrectAnswer ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                                      : isCorrectAnswer ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-neutral-400"
                                  }`}>
                                    {optKey}
                                  </span>

                                  <span className="truncate flex-1">{optText}</span>

                                  {isStudentChoice && (
                                    <span className={`text-[9px] font-black uppercase font-mono px-1.5 py-0.5 rounded ${
                                      isCorrectAnswer ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                                    }`}>
                                      {isCorrectAnswer ? "Correct Choice" : "Student's Pick"}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-neutral-400 font-mono text-[11px]">
                              Auto-graded MCQ:
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-neutral-500">Points Awarded:</span>
                              <input
                                type="number"
                                min="0"
                                max={q.points}
                                value={currentScore}
                                onChange={(e) => {
                                  let val = Math.min(q.points, Math.max(0, Number(e.target.value) || 0));
                                  setGradingScores(prev => ({ ...prev, [q.id]: val }));
                                }}
                                className="w-16 bg-black border border-white/10 rounded-xl px-2 py-1.5 text-center text-amber-400 font-mono font-black text-sm focus:outline-none focus:border-amber-500/50"
                              />
                              <span className="text-xs font-mono text-neutral-500">/ {q.points}</span>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })
              )}

            </div>

            {/* Modal Sticky Footer Action Bar */}
            <div className="p-4 sm:p-6 border-t border-white/5 bg-[#0a0a10] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Score Summary Box */}
              <div className="flex items-center gap-4 w-full sm:w-auto bg-black/60 px-5 py-3 rounded-2xl border border-white/10">
                <div>
                  <p className="text-[9px] text-neutral-500 font-mono uppercase">Calculated Total</p>
                  <p className="text-xl font-black text-white font-mono">
                    <span className="text-fuchsia-400">{currentModalCalculatedScore}</span>
                    <span className="text-neutral-600 text-xs"> / {totalQuizPoints} Pts</span>
                  </p>
                </div>

                <div className="h-7 w-[1px] bg-white/10 mx-1"></div>

                <div>
                  <p className="text-[9px] text-neutral-500 font-mono uppercase">Status & Grade</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                      currentModalPassed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                    }`}>
                      {currentModalPassed ? "PASSED" : "CHANCE"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-white/10 text-white">
                      {currentModalGrade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeGradingModal}
                  className="flex-1 sm:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-xl text-xs font-black uppercase tracking-wider transition-colors active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveGrades}
                  disabled={isSubmittingGrade || isLoadingDetails}
                  className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_10px_25px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmittingGrade ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{isSubmittingGrade ? "Saving Evaluation..." : "Save Evaluation & Advance"}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}