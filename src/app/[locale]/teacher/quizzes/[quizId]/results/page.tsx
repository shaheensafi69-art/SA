"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, FileText, CheckCircle2, XCircle, Users, Target, Clock, ShieldAlert, X, Edit3, Save, AlertCircle } from "lucide-react";

type QuizAttempt = {
  id: string;
  student_id: string;
  score: number;
  is_passed: boolean;
  status: "pending_review" | "graded";
  letter_grade: string | null;
  attempted_at: string;
  // پروفایل شاگرد
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

type QuizInfo = {
  title: string;
  passing_score: number;
  quiz_type: string;
};

type Question = {
  id: string;
  question_text: string;
  points: number;
};

type StudentAnswer = {
  id: string;
  question_id: string;
  student_answer_text: string;
  points_earned: number;
};

export default function TeacherQuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // استیت‌های مودال تصحیح (Grading Modal)
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<StudentAnswer[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);

  // ذخیره نمراتی که استاد در مودال وارد می‌کند: { question_id: points }
  const [gradingScores, setGradingScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (quizId) {
      fetchResultsData();
    }
  }, [quizId]);

  const fetchResultsData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. واکشی اطلاعات کوییز
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title, passing_score, quiz_type")
        .eq("id", quizId)
        .single();
      if (quizError) throw quizError;
      setQuizInfo(quizData);

      // ۲. واکشی لیست سوالات (برای محاسبه نمره و نمایش در مودال)
      const { data: qData } = await supabase
        .from("quiz_questions")
        .select("id, question_text, points")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });
      if (qData) setQuestions(qData);

      // ۳. واکشی لیست تمام تلاش‌ها
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
            first_name: p?.first_name || "Unknown",
            last_name: p?.last_name || "Student",
            email: p?.email || "No Email",
            avatar_url: p?.avatar_url || "",
          };
        });
        setAttempts(formatted);
      } else {
        setAttempts([]);
      }
    } catch (error) {
      console.error("Error loading quiz results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // باز کردن مودال و دریافت پاسخ‌های شاگرد از دیتابیس
  const handleOpenGrading = async (attempt: QuizAttempt) => {
    setSelectedAttempt(attempt);
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
      
      // اگر قبلاً نمره داده شده بود، اینپوت‌ها را پر می‌کنیم
      const initialScores: Record<string, number> = {};
      answersData?.forEach(ans => {
        initialScores[ans.question_id] = ans.points_earned || 0;
      });
      setGradingScores(initialScores);
      
    } catch (error) {
      console.error("Failed to load student answers:", error);
      alert("Failed to load answer details.");
      setSelectedAttempt(null);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // تابع محاسبه گرید که شما درخواست داده بودید
  const calculateLetterGrade = (score: number): "A+" | "A" | "B" | "C" | "Chance" => {
    if (score === 100) return "A+";
    if (score >= 90 && score <= 99) return "A";
    if (score >= 80 && score < 90) return "B";
    if (score >= 70 && score < 80) return "C";
    return "Chance";
  };

  // ذخیره نهایی نمرات در دیتابیس
  const handleSaveGrades = async () => {
    if (!selectedAttempt || !quizInfo) return;
    
    // محاسبه مجموع نمراتی که استاد وارد کرده است
    let totalScore = 0;
    Object.values(gradingScores).forEach(val => totalScore += (val || 0));

    // محاسبه گرید حروف
    const letterGrade = calculateLetterGrade(totalScore);
    const isPassed = totalScore >= quizInfo.passing_score;

    setIsSubmittingGrade(true);
    const supabase = createClient();
    try {
      // ۱. آپدیت جدول quiz_student_answers برای تک تک سوالات
      const updatePromises = studentAnswers.map(ans => 
        supabase.from("quiz_student_answers").update({
          points_earned: gradingScores[ans.question_id] || 0,
          is_correct: (gradingScores[ans.question_id] || 0) > 0 // اگر نمره بیشتر از 0 باشد یعنی درست بوده
        }).eq("id", ans.id)
      );
      await Promise.all(updatePromises);

      // ۲. آپدیت جدول quiz_attempts برای تغییر استاتوس و ثبت نمره نهایی
      const { error: attemptError } = await supabase.from("quiz_attempts").update({
        score: totalScore,
        is_passed: isPassed,
        status: "graded",
        letter_grade: letterGrade
      }).eq("id", selectedAttempt.id);

      if (attemptError) throw attemptError;

      // ۳. آپدیت لیست لوکال (رابط کاربری) بدون نیاز به رفرش کل صفحه
      setAttempts(prev => prev.map(a => 
        a.id === selectedAttempt.id 
          ? { ...a, score: totalScore, is_passed: isPassed, status: "graded", letter_grade: letterGrade } 
          : a
      ));

      alert("Exam graded successfully!");
      setSelectedAttempt(null);
    } catch (error) {
      console.error("Failed to save grade:", error);
      alert("Failed to save the grade. Please try again.");
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  // آمار لحظه‌ای
  const stats = useMemo(() => {
    const total = attempts.length;
    const pending = attempts.filter(a => a.status === "pending_review").length;
    const graded = attempts.filter(a => a.status === "graded");
    const passed = graded.filter(a => a.is_passed).length;
    
    return { total, pending, passed, gradedCount: graded.length };
  }, [attempts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-5 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <Link href="/en/teacher/quizzes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <ArrowLeft size={14} /> Back to Hub
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${quizInfo?.quiz_type === 'chance' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30'}`}>
                  {quizInfo?.quiz_type} Exam
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">{quizInfo?.title}</h1>
              <p className="text-xs text-neutral-400 font-medium">Evaluate descriptive answers and assign grades.</p>
            </div>
            
            <div className="px-4 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 w-fit">
              <Target size={14} /> Pass Mark: {quizInfo?.passing_score}
            </div>
          </div>
        </header>

        {/* ================= STATS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-4 rounded-[1.5rem] flex flex-col justify-center items-center text-center shadow-lg">
            <Users size={18} className="text-fuchsia-400 mb-2" />
            <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Total Submitted</p>
            <h3 className="text-xl font-black text-white mt-1">{stats.total}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-amber-500/20 p-4 rounded-[1.5rem] flex flex-col justify-center items-center text-center shadow-[0_0_15px_rgba(245,158,11,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
            <Clock size={18} className="text-amber-400 mb-2 relative z-10" />
            <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest relative z-10">Pending Grading</p>
            <h3 className="text-xl font-black text-amber-400 mt-1 relative z-10">{stats.pending}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-4 rounded-[1.5rem] flex flex-col justify-center items-center text-center shadow-lg">
            <CheckCircle2 size={18} className="text-emerald-400 mb-2" />
            <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Passed</p>
            <h3 className="text-xl font-black text-emerald-400 mt-1">{stats.passed}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-4 rounded-[1.5rem] flex flex-col justify-center items-center text-center shadow-lg">
            <XCircle size={18} className="text-rose-400 mb-2" />
            <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Failed (Chance)</p>
            <h3 className="text-xl font-black text-rose-400 mt-1">{stats.gradedCount - stats.passed}</h3>
          </div>
        </div>

        {/* ================= RESULTS LIST (RESPONSIVE) ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="p-5 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} className="text-fuchsia-400"/> Student Submissions
            </h3>
          </div>

          {attempts.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <ShieldAlert size={40} className="text-neutral-600 mb-4" />
              <p className="text-neutral-400 text-sm font-bold">No submissions found for this exam.</p>
            </div>
          ) : (
            <>
              {/* === DESKTOP TABLE (Hidden on Mobile) === */}
              <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                      <th className="p-5">Student Profile</th>
                      <th className="p-5">Submitted At</th>
                      <th className="p-5 text-center">Status / Grade</th>
                      <th className="p-5 text-center">Final Score</th>
                      <th className="p-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                              {attempt.avatar_url ? <img src={attempt.avatar_url} className="w-full h-full object-cover" /> : <span className="font-black text-fuchsia-500">{attempt.first_name.charAt(0)}</span>}
                            </div>
                            <div>
                              <p className="font-black text-white text-sm">{attempt.first_name} {attempt.last_name}</p>
                              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{attempt.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 font-mono text-[11px] text-neutral-400">
                          {new Date(attempt.attempted_at).toLocaleString()}
                        </td>
                        <td className="p-5 text-center">
                          {attempt.status === "pending_review" ? (
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit mx-auto animate-pulse">
                              <Clock size={12}/> Needs Grading
                            </span>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-fit ${attempt.is_passed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                                {attempt.is_passed ? <CheckCircle2 size={12}/> : <XCircle size={12}/>} {attempt.is_passed ? "Passed" : "Chance"}
                              </span>
                              <span className="text-[10px] font-black text-white uppercase tracking-widest mt-1">Grade: {attempt.letter_grade}</span>
                            </div>
                          )}
                        </td>
                        <td className="p-5 text-center">
                          <span className={`font-black text-lg ${attempt.status === "pending_review" ? "text-neutral-600" : attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {attempt.status === "pending_review" ? "-" : attempt.score}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <button onClick={() => handleOpenGrading(attempt)} className={`px-4 py-2 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ml-auto flex items-center gap-2 ${attempt.status === "pending_review" ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30" : "bg-white/5 text-neutral-400 hover:text-fuchsia-400"}`}>
                            {attempt.status === "pending_review" ? <><Edit3 size={14} /> Evaluate</> : <><FileText size={14} /> Review</>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* === MOBILE CARDS (Strictly Vertical - No Horizontal Scroll) === */}
              <div className="md:hidden flex flex-col divide-y divide-white/5">
                {attempts.map((attempt) => (
                  <div key={attempt.id} className="p-4 flex flex-col gap-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {attempt.avatar_url ? <img src={attempt.avatar_url} className="w-full h-full object-cover" /> : <span className="font-black text-fuchsia-500">{attempt.first_name.charAt(0)}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-sm truncate">{attempt.first_name} {attempt.last_name}</p>
                        <p className="text-[9px] text-neutral-500 font-mono truncate">{new Date(attempt.attempted_at).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {/* Status & Action */}
                    <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Status</span>
                        {attempt.status === "pending_review" ? (
                           <span className="text-amber-400 font-black text-[10px] uppercase flex items-center gap-1"><Clock size={12}/> Needs Grading</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-black uppercase ${attempt.is_passed ? "text-emerald-400" : "text-rose-400"}`}>
                              Score: {attempt.score}
                            </span>
                            <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-black text-neutral-400">
                              Grade: {attempt.letter_grade}
                            </span>
                          </div>
                        )}
                      </div>
                      <button onClick={() => handleOpenGrading(attempt)} className={`px-4 py-2 border rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-1.5 ${attempt.status === "pending_review" ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30" : "bg-white/5 text-neutral-300 border-white/10"}`}>
                        {attempt.status === "pending_review" ? <Edit3 size={12} /> : <FileText size={12} />}
                        {attempt.status === "pending_review" ? "Evaluate" : "Review"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: TEACHER EVALUATION & GRADING ==================== */}
      {/* ========================================================================= */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => !isSubmittingGrade && setSelectedAttempt(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-[#0a0a0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  {selectedAttempt.avatar_url ? <img src={selectedAttempt.avatar_url} className="w-full h-full object-cover" /> : <span className="font-black text-fuchsia-500">{selectedAttempt.first_name.charAt(0)}</span>}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-black text-white truncate">Paper: {selectedAttempt.first_name} {selectedAttempt.last_name}</h2>
                  <p className="text-[10px] text-fuchsia-400 font-black uppercase tracking-widest mt-0.5 truncate">Evaluation Mode</p>
                </div>
              </div>
              <button disabled={isSubmittingGrade} onClick={() => setSelectedAttempt(null)} className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={16} />
              </button>
            </div>
            
            {/* Body (Scrollable Questions) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-[#050508] space-y-6">
              {isLoadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                  <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Retrieving Answers...</p>
                </div>
              ) : (
                questions.map((q, index) => {
                  const studentAns = studentAnswers.find(sa => sa.question_id === q.id);
                  const currentScore = gradingScores[q.id] || 0;
                  
                  return (
                    <div key={q.id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
                      {/* Question Text */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3 items-start">
                          <span className="text-fuchsia-400 font-black text-sm mt-0.5">Q{index + 1}.</span>
                          <p className="text-sm sm:text-base font-bold text-white leading-relaxed">{q.question_text}</p>
                        </div>
                      </div>
                      
                      {/* Student's Answer */}
                      <div className="bg-black/50 border border-white/5 rounded-xl p-4 mt-2">
                        <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><FileText size={12}/> Student's Response:</p>
                        <p className="text-xs sm:text-sm text-neutral-300 whitespace-pre-wrap font-medium leading-relaxed">
                          {studentAns?.student_answer_text || <span className="italic text-neutral-600">No answer provided.</span>}
                        </p>
                      </div>

                      {/* Grading Input (Vertical on Mobile) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pt-4 border-t border-white/5">
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Assign Points (Max: {q.points})</p>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            min="0" 
                            max={q.points}
                            value={currentScore === 0 && studentAns?.student_answer_text === "No answer provided." ? 0 : currentScore.toString()}
                            onChange={(e) => {
                              let val = parseInt(e.target.value) || 0;
                              if (val > q.points) val = q.points; // جلوگیری از نمره بیشتر از حد مجاز
                              if (val < 0) val = 0;
                              setGradingScores(prev => ({ ...prev, [q.id]: val }));
                            }}
                            className="w-20 bg-black border border-white/10 rounded-xl px-3 py-2 text-white text-center text-sm font-black focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                          />
                          <span className="text-xs font-bold text-neutral-500">/ {q.points}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Action (Sticky) */}
            <div className="p-4 sm:p-6 border-t border-white/5 bg-[#0a0a0f] shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto bg-black/40 px-4 py-3 rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Calculated Total</span>
                  <span className="text-xl font-black text-fuchsia-400">
                    {Object.values(gradingScores).reduce((a, b) => a + (b || 0), 0)} <span className="text-xs text-neutral-500">/ 100</span>
                  </span>
                </div>
                
                <button 
                  onClick={handleSaveGrades}
                  disabled={isSubmittingGrade || isLoadingDetails}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmittingGrade ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>}
                  {isSubmittingGrade ? "Saving Grade..." : "Submit Final Grade"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}