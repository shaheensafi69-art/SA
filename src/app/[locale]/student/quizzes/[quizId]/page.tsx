"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Send,
  PenTool,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  HelpCircle,
  ListChecks,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  Check,
  X,
  Target,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  AlertTriangle,
  GraduationCap
} from "lucide-react";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

type Question = {
  id: string;
  question_text: string;
  points: number;
  question_type?: "multiple_choice" | "descriptive" | string | null;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  correct_option: string | null; // A, B, C, D
};

type QuizInfo = {
  id: string;
  title: string;
  quiz_type: string;
  passing_score: number;
  course_title?: string;
};

type SavedAttempt = {
  id: string;
  score: number;
  is_passed: boolean;
  status: "pending_review" | "graded" | "completed" | string;
  letter_grade: string | null;
  attempted_at: string;
};

type SavedAnswer = {
  id: string;
  question_id: string;
  student_answer_text: string;
  points_earned: number | null;
  is_correct: boolean | null;
};

export default function StudentExamPaperPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const quizId = (params?.quizId || params?.quizid || params?.id) as string;

  // Loading & View States
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Taking Exam State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);

  // Review / Previous Attempt State
  const [existingAttempt, setExistingAttempt] = useState<SavedAttempt | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Question refs for smooth scrolling
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (quizId) {
      fetchExamData();
    }
  }, [quizId]);

  const fetchExamData = async () => {
    setIsLoading(true);
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

      // 1. دریافت اطلاعات آزمون
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title, passing_score, quiz_type, class_group_id, course_id")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;

      // دریافت نام دوره یا کلاس مربوطه
      let courseTitle = isRtl ? "دوره تخصصی آکادمی" : "Academy Specialization";
      if (quizData.course_id) {
        const { data: crs } = await supabase
          .from("courses")
          .select("title")
          .eq("id", quizData.course_id)
          .single();
        if (crs?.title) courseTitle = crs.title;
      } else if (quizData.class_group_id) {
        const { data: cg } = await supabase
          .from("class_groups")
          .select("class_name")
          .eq("id", quizData.class_group_id)
          .single();
        if (cg?.class_name) courseTitle = cg.class_name;
      }

      setQuizInfo({
        id: quizData.id,
        title: quizData.title,
        quiz_type: quizData.quiz_type || "regular",
        passing_score: Number(quizData.passing_score) || 70,
        course_title: courseTitle,
      });

      // 2. دریافت سوالات آزمون
      const { data: questionsData, error: qError } = await supabase
        .from("quiz_questions")
        .select("id, question_text, points, question_type, option_a, option_b, option_c, option_d, correct_option")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qError) throw qError;
      setQuestions(questionsData || []);

      // 3. بررسی اینکه آیا دانش‌آموز قبلاً در این آزمون شرکت کرده است؟
      const { data: attemptData } = await supabase
        .from("quiz_attempts")
        .select("id, score, is_passed, status, letter_grade, attempted_at")
        .eq("quiz_id", quizId)
        .eq("student_id", userId)
        .order("attempted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (attemptData) {
        setExistingAttempt(attemptData);

        // واکشی پاسخ‌های ثبت‌شده قبلی
        const { data: answersData } = await supabase
          .from("quiz_student_answers")
          .select("id, question_id, student_answer_text, points_earned, is_correct")
          .eq("attempt_id", attemptData.id);

        if (answersData) {
          setSavedAnswers(answersData);
        }
        setIsReviewMode(true);
      }
    } catch (error: any) {
      console.error("Failed to load exam paper:", error);
      alert(isRtl ? "خطا در بارگذاری برگه آزمون. ممکن است در دسترس نباشد." : "Failed to load exam paper.");
      router.push(`/${currentLocale}/student/quizzes`);
    } finally {
      setIsLoading(false);
    }
  };

  // ثبت یا تغییر جواب برای یک سوال
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // پرش نرم به سمت سوال خاص
  const scrollToQuestion = (questionId: string) => {
    const el = questionRefs.current[questionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // محاسبات سوالات و نمرات
  const totalQuizPoints = useMemo(() => {
    return questions.reduce((acc, curr) => acc + (Number(curr.points) || 10), 0);
  }, [questions]);

  const answeredQuestionsCount = useMemo(() => {
    return Object.keys(answers).filter((qId) => (answers[qId] || "").trim() !== "").length;
  }, [answers]);

  const unansweredQuestionsCount = useMemo(() => {
    return questions.length - answeredQuestionsCount;
  }, [questions.length, answeredQuestionsCount]);

  const progressPercentage = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round((answeredQuestionsCount / questions.length) * 100);
  }, [answeredQuestionsCount, questions.length]);

  // محاسبه گرید حروف
  const calculateGradeLetter = (score: number, maxPoints: number): string => {
    const pct = maxPoints > 0 ? (score / maxPoints) * 100 : score;
    if (pct >= 100) return "A+";
    if (pct >= 90) return "A";
    if (pct >= 80) return "B";
    if (pct >= 70) return "C";
    return "Chance";
  };

  // ارسال نهایی برگه آزمون به دیتابیس
  const handleSubmitExamPaper = async () => {
    setIsSubmitting(true);
    setShowSubmitModal(false);

    const supabase = createClient();

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user || !quizInfo) throw new Error("User session expired.");
      const userId = session.user.id;

      // بررسی اینکه آیا سوال تشریحی دارد؟
      const hasDescriptive = questions.some((q) => {
        if (q.question_type === "descriptive") return true;
        if (!q.option_a || q.option_a.toLowerCase() === "descriptive" || q.option_a.toLowerCase() === "null") {
          return true;
        }
        return false;
      });

      let totalEarnedMCQScore = 0;

      // ساخت آرایه جواب‌های دانش‌آموز جهت ذخیره
      const studentAnswersArray = questions.map((q) => {
        const isMultipleChoice =
          q.question_type === "multiple_choice" ||
          (q.option_a &&
            q.option_a.toLowerCase() !== "descriptive" &&
            q.option_a.toLowerCase() !== "null");

        const studentAnswerVal = (answers[q.id] || "").trim();
        let earned = 0;
        let isCorrect: boolean | null = null;
        let textToSave = studentAnswerVal;

        if (isMultipleChoice) {
          isCorrect = studentAnswerVal === q.correct_option;
          earned = isCorrect ? q.points : 0;
          totalEarnedMCQScore += earned;

          // ذخیره متن گزینه جهت سهولت مطالعه کارنامه
          if (studentAnswerVal === "A") textToSave = q.option_a || "A";
          else if (studentAnswerVal === "B") textToSave = q.option_b || "B";
          else if (studentAnswerVal === "C") textToSave = q.option_c || "C";
          else if (studentAnswerVal === "D") textToSave = q.option_d || "D";
        }

        return {
          question_id: q.id,
          student_answer_text: textToSave || (isRtl ? "بدون پاسخ ثبت شد." : "No answer provided."),
          points_earned: isMultipleChoice ? earned : 0,
          is_correct: isMultipleChoice ? isCorrect : null,
        };
      });

      // وضعیت تلاش
      const attemptStatus = hasDescriptive ? "pending_review" : "graded";
      const pct = totalQuizPoints > 0 ? (totalEarnedMCQScore / totalQuizPoints) * 100 : 0;
      const isPassed = !hasDescriptive ? pct >= quizInfo.passing_score : false;
      const letterGrade = !hasDescriptive ? calculateGradeLetter(totalEarnedMCQScore, totalQuizPoints) : null;

      // 1. ثبت در جدول quiz_attempts
      const { data: attemptData, error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert({
          quiz_id: quizId,
          student_id: userId,
          score: totalEarnedMCQScore,
          is_passed: isPassed,
          status: attemptStatus,
          letter_grade: letterGrade,
        })
        .select("id, score, is_passed, status, letter_grade, attempted_at")
        .single();

      if (attemptError) throw attemptError;

      // 2. ثبت در جدول quiz_student_answers
      const finalAnswersToInsert = studentAnswersArray.map((ans) => ({
        attempt_id: attemptData.id,
        question_id: ans.question_id,
        student_answer_text: ans.student_answer_text,
        points_earned: ans.points_earned,
        is_correct: ans.is_correct,
      }));

      const { error: answersError } = await supabase
        .from("quiz_student_answers")
        .insert(finalAnswersToInsert);

      if (answersError) throw answersError;

      // ذخیره در وضعیت لوکال و انتقال به حالت کارنامه
      setExistingAttempt(attemptData);
      setSavedAnswers(
        studentAnswersArray.map((a, idx) => ({
          id: `ans-${idx}`,
          question_id: a.question_id,
          student_answer_text: a.student_answer_text,
          points_earned: a.points_earned,
          is_correct: a.is_correct,
        }))
      );
      setIsReviewMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        isRtl
          ? "خطا در ثبت نهایی برگه آزمون: " + (error.message || "")
          : "Could not submit exam paper: " + (error.message || "")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // فعال‌سازی تلاش مجدد برای آزمون
  const handleStartRetake = () => {
    if (
      !confirm(
        isRtl
          ? "آیا می‌خواهید آزمون را مجدداً شروع کنید؟ پاسخ‌های جدید به عنوان تلاش تازه ثبت خواهند شد."
          : "Are you sure you want to retake this exam? Your new submission will be recorded."
      )
    ) {
      return;
    }
    setAnswers({});
    setIsReviewMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // تشخیص تستی بودن یا تشریحی بودن یک سوال
  const isQuestionMCQ = (q: Question) => {
    if (q.question_type === "multiple_choice") return true;
    if (q.question_type === "descriptive") return false;
    return Boolean(
      q.option_a &&
        q.option_a.toLowerCase() !== "descriptive" &&
        q.option_a.toLowerCase() !== "null"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.quizzes.distributingExam || (isRtl ? "در حال آماده‌سازی برگه آزمون دیجیتال..." : "Distributing Exam Papers...")}
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-6 text-center pb-32">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-neutral-500" />
        </div>
        <h2 className="text-2xl font-black mb-2">{t.quizzes.noQuestionsFound || (isRtl ? "سوالی یافت نشد" : "No Questions Found")}</h2>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-sm mb-6">
          {t.quizzes.noQuestionsDesc || (isRtl ? "استاد هنوز سوالی به این آزمون اضافه نکرده است." : "The instructor hasn't added any questions yet.")}
        </p>
        <Link
          href={`/${currentLocale}/student/quizzes`}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition-colors"
        >
          {t.quizzes.goBack || (isRtl ? "بازگشت به مرکز آزمون‌ها" : "Return to Hub")}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020205] text-white font-sans flex flex-col relative pb-36"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ================= AMBIENT NEON GLOWS ================= */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-purple-600/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ================= STICKY EXAMINATION HEADER ================= */}
      <header className="sticky top-0 z-50 h-20 border-b border-white/5 bg-[#05050c]/90 backdrop-blur-2xl shadow-xl flex items-center justify-between px-4 sm:px-6 md:px-10 shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <Link
            href={`/${currentLocale}/student/quizzes`}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-all shrink-0 active:scale-95"
            title={isRtl ? "بازگشت به لیست آزمون‌ها" : "Return to Quizzes"}
          >
            {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-black text-white truncate max-w-[200px] sm:max-w-md">
                {quizInfo?.title}
              </h1>
              {quizInfo?.quiz_type === "chance" && (
                <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-black uppercase tracking-wider shrink-0 animate-pulse flex items-center gap-1">
                  <Flame size={10} />
                  <span>{t.quizzes.chanceExam || (isRtl ? "آزمون چانس" : "Chance")}</span>
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5 truncate">
              {quizInfo?.course_title} • {isRtl ? "حد قبولی:" : "Pass Mark:"} {quizInfo?.passing_score}٪
            </p>
          </div>
        </div>

        {/* Header Right: Minimap Toggle & Quick Progress */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isReviewMode ? (
            <>
              {/* Question Navigator Button */}
              <button
                onClick={() => setShowMinimap(!showMinimap)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 flex items-center gap-1.5 transition-colors"
                title={isRtl ? "نقشه دسترسی سریع به سوالات" : "Questions Minimap"}
              >
                <ListChecks size={14} className="text-indigo-400" />
                <span className="hidden sm:inline">{isRtl ? "فهرست سوالات" : "Questions"}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-black">
                  {answeredQuestionsCount}/{questions.length}
                </span>
              </button>

              {/* Progress Ring / Percentage */}
              <div className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-300">
                <Target size={14} className="text-emerald-400" />
                <span>{progressPercentage}٪ {isRtl ? "پاسخ داده شد" : "Done"}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-extrabold flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-indigo-400" />
                <span>{isRtl ? "حالت بازبینی کارنامه" : "Scorecard Review Mode"}</span>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ================= QUESTIONS PALETTE MINIMAP DRAWER ================= */}
      {showMinimap && !isReviewMode && (
        <div className="sticky top-20 z-40 bg-[#080812]/95 border-b border-white/10 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl animate-[fadeInDown_0.2s_ease-out]">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400">
              <span>{isRtl ? "کلیک روی هر شماره برای پرش به آن سوال:" : "Jump to question:"}</span>
              <button
                onClick={() => setShowMinimap(false)}
                className="text-neutral-500 hover:text-white p-1 rounded-lg"
              >
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => {
                const isAnswered = Boolean((answers[q.id] || "").trim());
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      scrollToQuestion(q.id);
                      setShowMinimap(false);
                    }}
                    className={`w-9 h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center border ${
                      isAnswered
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                        : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN EXAMINATION BODY ================= */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 md:p-8 space-y-8 relative z-10">
        
        {/* ================= CASE A: REVIEW / SCORECARD HERO POD ================= */}
        {isReviewMode && existingAttempt && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            {existingAttempt.status === "pending_review" ? (
              // Status: Under Teacher Review
              <div className="bg-gradient-to-br from-blue-950/40 via-[#0a0a18] to-black border border-blue-500/30 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <Clock size={28} className="animate-pulse" />
                    </div>
                    <div>
                      <span className="px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-black uppercase tracking-wider border border-blue-500/20">
                        {isRtl ? "در حال تصحیح استاد" : "Teacher Evaluation Pending"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {t.quizzes.paperSubmitted || (isRtl ? "برگه آزمون شما با موفقیت تحویل داده شد" : "Paper Submitted")}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={handleStartRetake}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <RotateCcw size={14} />
                    <span>{isRtl ? "تلاش مجدد در آزمون" : "Retake Exam"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {t.quizzes.paperSubmittedDesc ||
                    (isRtl
                      ? "برگه شما حاوی سوالات تشریحی است. استاد مربوطه پاسخ‌های تحلیلی شما را به دقت مطالعه نموده و نمره نهایی را به زودی ثبت خواهد کرد. در زیر می‌توانید پاسخ‌های ارسال‌شده را مرور کنید."
                      : "Your exam paper contains descriptive questions. The instructor will review your detailed written answers and post the official score shortly.")}
                </p>

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                  <span>
                    {isRtl ? "تاریخ ارسال:" : "Submitted on:"}{" "}
                    {new Date(existingAttempt.attempted_at).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    {isRtl ? "نمره سوالات تستی ثبت‌شده:" : "MCQ Points Earned:"} {existingAttempt.score} {isRtl ? "امتیاز" : "pts"}
                  </span>
                </div>
              </div>
            ) : (
              // Status: Graded / Completed with Scorecard
              <div
                className={`rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl border space-y-6 ${
                  existingAttempt.is_passed
                    ? "bg-gradient-to-br from-emerald-950/40 via-[#0a0a18] to-black border-emerald-500/30"
                    : "bg-gradient-to-br from-rose-950/40 via-[#0a0a18] to-black border-rose-500/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xl ${
                        existingAttempt.is_passed
                          ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                          : "bg-rose-500/20 border-rose-500/30 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.3)]"
                      }`}
                    >
                      {existingAttempt.is_passed ? <Trophy size={32} /> : <AlertTriangle size={32} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            existingAttempt.is_passed
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                          }`}
                        >
                          {existingAttempt.is_passed
                            ? isRtl
                              ? "قبول شده در آزمون (Passed) ✓"
                              : "Passed Assessment ✓"
                            : isRtl
                            ? "عدم کسب حد نصاب قبولی (Needs Retake)"
                            : "Did Not Meet Pass Mark"}
                        </span>
                        {existingAttempt.letter_grade && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-white font-black text-xs border border-white/10">
                            {existingAttempt.letter_grade}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5">
                        {isRtl ? "کارنامه رسمی آزمون" : "Official Exam Report"}
                      </h2>
                    </div>
                  </div>

                  {/* Score Pod */}
                  <div className="flex items-baseline gap-2 bg-white/[0.03] border border-white/10 p-4 rounded-2xl self-start sm:self-auto">
                    <span
                      className={`text-3xl sm:text-4xl font-black ${
                        existingAttempt.is_passed ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {existingAttempt.score}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">
                      / {totalQuizPoints} {isRtl ? "امتیاز کل" : "pts"}
                    </span>
                    <span className="text-xs text-neutral-500 font-semibold ml-2">
                      ({totalQuizPoints > 0 ? Math.round((existingAttempt.score / totalQuizPoints) * 100) : 0}٪)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-neutral-400 font-medium">
                    {existingAttempt.is_passed
                      ? isRtl
                        ? "تبریک! شما حد نصاب قبولی این ارزیابی را با موفقیت پشت سر گذاشتید."
                        : "Congratulations! You have satisfied all required proficiency criteria."
                      : isRtl
                      ? "نمره کسب‌شده کمتر از حد نصاب قبولی (۷۰٪) است. می‌توانید در آزمون جبرانی (چانس) شرکت کنید."
                      : "Your score was below passing criteria. You are eligible to retake the exam."}
                  </p>

                  <button
                    onClick={handleStartRetake}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-black text-white flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                  >
                    <RotateCcw size={14} />
                    <span>{isRtl ? "شرکت دوباره در آزمون" : "Retake Assessment"}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText size={18} className="text-indigo-400" />
                <span>{isRtl ? "بازبینی دقیق سوالات و پاسخ‌های شما" : "Question-by-Question Paper Review"}</span>
              </h3>
              <span className="text-xs text-neutral-500 font-semibold">
                {questions.length} {isRtl ? "سوال مورد بررسی" : "Questions Reviewed"}
              </span>
            </div>
          </div>
        )}

        {/* ================= INSTRUCTIONS BANNER (TAKING MODE) ================= */}
        {!isReviewMode && (
          <div className="bg-gradient-to-r from-indigo-950/40 via-[#0a0a18] to-purple-950/30 border border-indigo-500/20 rounded-[2rem] p-5 sm:p-6 flex gap-4 items-start shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
              <PenTool size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-indigo-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                {t.quizzes.instructions || (isRtl ? "دستورالعمل آزمون آنلاین" : "Examination Guidelines")}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {isRtl
                  ? "سوالات را با دقت مطالعه فرمایید. برای سوالات تستی، روی گزینه صحیح کلیک کنید و برای سوالات تشریحی، پاسخ تحلیلی خود را در کادر تایپ نمایید. تا زمان کلیک روی دکمه ثبت نهایی، پاسخ‌های شما در صفحه حفظ می‌شوند."
                  : "Read each question carefully. Select an option for 4-choice questions, or type your comprehensive solution for descriptive ones. Submit when all questions are complete."}
              </p>
            </div>
          </div>
        )}

        {/* ================= QUESTIONS LIST ================= */}
        <div className="space-y-6 sm:space-y-8">
          {questions.map((q, index) => {
            const isMCQ = isQuestionMCQ(q);
            const savedAns = savedAnswers.find((a) => a.question_id === q.id);

            return (
              <div
                key={q.id}
                ref={(el) => {
                  questionRefs.current[q.id] = el;
                }}
                className={`relative group bg-[#090913]/90 border rounded-[2rem] p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 shadow-xl ${
                  isReviewMode
                    ? savedAns?.is_correct === true
                      ? "border-emerald-500/25 bg-emerald-500/[0.015]"
                      : savedAns?.is_correct === false
                      ? "border-rose-500/25 bg-rose-500/[0.015]"
                      : "border-white/10"
                    : answers[q.id]
                    ? "border-indigo-500/40"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                {/* Question Header: Number, Points, Type Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 border ${
                        isReviewMode
                          ? savedAns?.is_correct === true
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : savedAns?.is_correct === false
                            ? "bg-rose-500/20 border-rose-500 text-rose-400"
                            : "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                          : answers[q.id]
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                          : "bg-white/5 border-white/10 text-neutral-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-400">
                        {isRtl ? `سوال شماره ${index + 1}` : `Question #${index + 1}`}
                      </span>

                      {isMCQ ? (
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/20 flex items-center gap-1">
                          <ListChecks size={11} />
                          <span>{isRtl ? "سوال تستی (۴ گزینه‌ای)" : "Multiple Choice"}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-300 text-[10px] font-extrabold border border-purple-500/20 flex items-center gap-1">
                          <PenTool size={11} />
                          <span>{isRtl ? "سوال تشریحی (تحلیلی)" : "Descriptive Essay"}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {/* Points Badge */}
                    <span className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] font-black text-neutral-300">
                      {q.points} {isRtl ? "امتیاز" : "Pts"}
                    </span>

                    {/* Review Mode Points Earned */}
                    {isReviewMode && savedAns && (
                      <span
                        className={`px-3 py-1 rounded-xl text-[11px] font-black border ${
                          savedAns.points_earned && savedAns.points_earned > 0
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : savedAns.is_correct === false
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                            : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        }`}
                      >
                        {isMCQ
                          ? savedAns.is_correct
                            ? `+${q.points} امتیاز`
                            : "۰ امتیاز"
                          : existingAttempt?.status === "pending_review"
                          ? (isRtl ? "در انتظار نمره‌دهی" : "Pending Grade")
                          : `${savedAns.points_earned ?? 0} از ${q.points} امتیاز`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Prompt Text */}
                <h3 className="text-base sm:text-lg font-black text-white leading-relaxed mb-6">
                  {q.question_text}
                </h3>

                {/* ================= QUESTION INTERACTIVE BODY ================= */}
                <div className="relative">
                  {isMCQ ? (
                    // ================= 4-CHOICE MULTIPLE CHOICE UI =================
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {(
                        [
                          { key: "A", label: isRtl ? "الف" : "A", text: q.option_a },
                          { key: "B", label: isRtl ? "ب" : "B", text: q.option_b },
                          { key: "C", label: isRtl ? "ج" : "C", text: q.option_c },
                          { key: "D", label: isRtl ? "د" : "D", text: q.option_d },
                        ] as const
                      )
                        .filter((opt) => opt.text && opt.text.trim())
                        .map((option) => {
                          const isSelectedInTaking = answers[q.id] === option.key;
                          
                          // In review mode: check if this was the option the student chose
                          const isStudentSelectedInReview =
                            savedAns?.student_answer_text === option.text ||
                            savedAns?.student_answer_text === option.key;

                          const isCorrectOptionInReview = q.correct_option === option.key;

                          let optionClass =
                            "bg-black/40 border-white/5 hover:border-white/20 text-neutral-300";

                          if (!isReviewMode) {
                            if (isSelectedInTaking) {
                              optionClass =
                                "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500";
                            }
                          } else {
                            if (isCorrectOptionInReview) {
                              optionClass =
                                "bg-emerald-500/15 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/50";
                            } else if (isStudentSelectedInReview && !savedAns?.is_correct) {
                              optionClass =
                                "bg-rose-500/15 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/50";
                            }
                          }

                          return (
                            <button
                              key={option.key}
                              type="button"
                              disabled={isReviewMode}
                              onClick={() => handleAnswerChange(q.id, option.key)}
                              className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left rtl:text-right transition-all duration-200 ${optionClass} ${
                                !isReviewMode ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-xs border transition-all ${
                                  !isReviewMode && isSelectedInTaking
                                    ? "bg-indigo-600 border-indigo-400 text-white shadow-md"
                                    : isReviewMode && isCorrectOptionInReview
                                    ? "bg-emerald-500 border-emerald-400 text-black font-black"
                                    : isReviewMode && isStudentSelectedInReview
                                    ? "bg-rose-500 border-rose-400 text-white font-black"
                                    : "border-neutral-700 bg-white/5 text-neutral-400"
                                }`}
                              >
                                {isReviewMode && isCorrectOptionInReview ? (
                                  <Check size={16} />
                                ) : isReviewMode && isStudentSelectedInReview && !savedAns?.is_correct ? (
                                  <X size={16} />
                                ) : !isReviewMode && isSelectedInTaking ? (
                                  <Check size={16} />
                                ) : (
                                  option.label
                                )}
                              </div>

                              <div className="flex-1 overflow-hidden">
                                <span className="text-xs sm:text-sm font-semibold leading-relaxed break-words block">
                                  {option.text}
                                </span>
                              </div>

                              {isReviewMode && isStudentSelectedInReview && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-bold shrink-0">
                                  {isRtl ? "انتخاب شما" : "Your Pick"}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ) : (
                    // ================= DESCRIPTIVE ESSAY UI =================
                    <div className="space-y-3">
                      {!isReviewMode ? (
                        <>
                          <textarea
                            rows={6}
                            value={answers[q.id] || ""}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={
                              t.quizzes.typeAnswerPlaceholder ||
                              (isRtl
                                ? "پاسخ تحلیلی، توضیحات کامل و راه‌حل خود را در این بخش بنویسید..."
                                : "Type your detailed analytical solution here...")
                            }
                            className="w-full bg-[#05050b] border border-white/10 rounded-2xl p-4 sm:p-5 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 resize-y shadow-inner custom-scrollbar placeholder:text-neutral-600 transition-all leading-relaxed"
                          />

                          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
                            <span>
                              {isRtl ? "تعداد کاراکترها:" : "Characters:"}{" "}
                              <strong className="text-neutral-400">{(answers[q.id] || "").length}</strong>
                            </span>
                            <span>
                              {isRtl ? "تعداد کلمات:" : "Words:"}{" "}
                              <strong className="text-neutral-400">
                                {(answers[q.id] || "").trim() ? (answers[q.id] || "").trim().split(/\s+/).length : 0}
                              </strong>
                            </span>
                          </div>
                        </>
                      ) : (
                        // Review Mode: Show submitted essay
                        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-purple-400">
                            <PenTool size={12} />
                            <span>{isRtl ? "متن پاسخ ارسالی شما به استاد:" : "Your Submitted Written Answer:"}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed italic bg-black/40 p-4 rounded-xl border border-white/5">
                            {savedAns?.student_answer_text || (isRtl ? "پاسخی ثبت نگردیده بود." : "No answer written.")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= STICKY BOTTOM SUBMISSION BAR ================= */}
        {!isReviewMode && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#05050c]/90 border-t border-white/10 backdrop-blur-2xl p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">
                    {answeredQuestionsCount} {isRtl ? "از" : "of"} {questions.length} {isRtl ? "سوال پاسخ داده شده" : "questions answered"}
                  </span>
                </div>

                {unansweredQuestionsCount > 0 && (
                  <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                    {unansweredQuestionsCount} {isRtl ? "بی‌پاسخ" : "unanswered"}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(99,102,241,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>{isRtl ? "در حال ثبت نهایی..." : "Submitting..."}</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{isRtl ? "ثبت نهایی و تحویل برگه آزمون" : "Submit Exam Paper"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= REVIEW MODE RETURN BUTTON ================= */}
        {isReviewMode && (
          <div className="pt-6 flex justify-center">
            <Link
              href={`/${currentLocale}/student/quizzes`}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
            >
              {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{t.quizzes.returnToExams || (isRtl ? "بازگشت به فهرست آزمون‌ها" : "Return to Exam Center")}</span>
            </Link>
          </div>
        )}

      </main>

      {/* ================= FINAL SUBMISSION CONFIRMATION MODAL ================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#0b0b16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Send size={28} />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                {isRtl ? "تحویل نهایی برگه آزمون" : "Submit Exam Paper"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                {isRtl
                  ? `شما به ${answeredQuestionsCount} سوال از ${questions.length} سوال پاسخ داده‌اید.`
                  : `You have answered ${answeredQuestionsCount} out of ${questions.length} questions.`}
                {unansweredQuestionsCount > 0 && (
                  <span className="block text-amber-400 font-bold mt-1.5">
                    {isRtl
                      ? `هشدار: ${unansweredQuestionsCount} سوال هنوز بدون پاسخ رها شده است!`
                      : `Warning: ${unansweredQuestionsCount} questions are still unanswered!`}
                  </span>
                )}
              </p>
              <p className="text-[11px] text-neutral-500 mt-2">
                {isRtl
                  ? "پس از ارسال، امکان تغییر گزینه‌ها و ویرایش متن تشریحی وجود نخواهد داشت."
                  : "Once submitted, your answers will be locked for grading."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 transition-colors"
              >
                {isRtl ? "انصراف و ادامه آزمون" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleSubmitExamPaper}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin text-white" />
                ) : (
                  <span>{isRtl ? "تایید و ارسال برگه" : "Yes, Submit"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
