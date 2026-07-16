"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Send, PenTool, LayoutGrid, Clock } from "lucide-react";

type Question = {
  id: string;
  question_text: string;
  points: number;
};

type QuizInfo = {
  id: string;
  title: string;
  quiz_type: string;
  passing_score: number;
};

export default function StudentExamPaperPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // ذخیره جواب‌های تشریحی شاگرد: { question_id: "متن جواب نوشته شده" }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // وضعیت پس از ثبت برگه
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  useEffect(() => {
    if (quizId) fetchExamData();
  }, [quizId]);

  const fetchExamData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title, passing_score, quiz_type")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setQuizInfo(quizData);

      const { data: questionsData, error: qError } = await supabase
        .from("quiz_questions")
        .select("id, question_text, points") // نیازی به گزینه‌های A/B/C/D نداریم
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qError) throw qError;
      setQuestions(questionsData || []);
      
    } catch (error) {
      console.error("Failed to load exam paper:", error);
      alert("Failed to initialize exam. It might be unavailable.");
      router.push("/en/dashboard/quizzes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, text: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const handleSubmitExamPaper = async () => {
    // بررسی اینکه آیا به تمام سوالات پاسخ داده است؟
    const unansweredCount = questions.length - Object.keys(answers).filter(k => answers[k].trim() !== "").length;
    if (unansweredCount > 0) {
      if (!confirm(`You have ${unansweredCount} unanswered questions! Are you sure you want to submit?`)) return;
    } else {
      if (!confirm("Are you ready to submit your exam paper? You cannot change your answers later.")) return;
    }
    
    setIsSubmitting(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user || !quizInfo) return;

    try {
      // ۱. ثبت در جدول quiz_attempts با وضعیت pending_review (بدون نمره)
      const { data: attemptData, error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert({
          quiz_id: quizId,
          student_id: session.user.id,
          score: 0, 
          is_passed: false,
          status: "pending_review", // در انتظار تصحیح استاد
          letter_grade: null
        })
        .select("id")
        .single();

      if (attemptError) throw attemptError;

      // ۲. ثبت جواب‌های تشریحی شاگرد در جدول جدید quiz_student_answers
      const studentAnswersArray = questions.map(q => ({
        attempt_id: attemptData.id,
        question_id: q.id,
        student_answer_text: answers[q.id]?.trim() || "No answer provided.",
        points_earned: 0,
        is_correct: null
      }));

      const { error: answersError } = await supabase
        .from("quiz_student_answers")
        .insert(studentAnswersArray);

      if (answersError) throw answersError;

      // نمایش صفحه موفقیت
      setIsSubmittedSuccessfully(true);

    } catch (error: any) {
      console.error("Failed to submit exam paper:", error);
      alert("Database Error: Could not save your paper. " + (error.message || ""));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Distributing Exam Papers...</p>
      </div>
    );
  }

  // ==========================================
  // صفحه موفقیت آمیز (پس از ارسال)
  // ==========================================
  if (isSubmittedSuccessfully) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-4 sm:p-6 pb-32 relative overflow-hidden" dir="ltr">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] pointer-events-none transition-colors duration-1000"></div>
        
        <div className="relative z-10 w-full max-w-xl bg-[#0a0a0f]/90 border border-white/10 rounded-[3rem] p-10 md:p-16 text-center backdrop-blur-3xl shadow-2xl animate-[slideInUp_0.4s_ease-out]">
          <div className="w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-white/5 bg-indigo-500/10">
            <Clock size={48} className="text-indigo-400" />
          </div>
          
          <h2 className="text-3xl font-black mb-2 text-white">Paper Submitted!</h2>
          <p className="text-neutral-400 font-medium mb-10 text-sm leading-relaxed">
            Your answers for <strong className="text-white">{quizInfo?.title}</strong> have been securely saved. 
            The instructor will review your paper and assign your final grade shortly.
          </p>

          <Link 
            href="/en/dashboard/quizzes"
            className="block w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all"
          >
            Return to Exam Center
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 text-center pb-32">
        <AlertCircle size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-2xl font-black mb-2">No Questions Found</h2>
        <p className="text-neutral-500 text-sm max-w-sm mb-6">The instructor hasn't added any questions to this exam yet.</p>
        <Link href="/en/dashboard/quizzes" className="px-6 py-3 bg-white/10 rounded-xl font-bold">Go Back</Link>
      </div>
    );
  }

  // ==========================================
  // برگه اصلی امتحان (رندر سوالات تشریحی با اسکرول)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans flex flex-col relative pb-32" dir="ltr">
      
      {/* هدر چسبان */}
      <header className="h-20 border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 md:px-10 shrink-0 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/en/dashboard/quizzes" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-neutral-400 transition-colors shrink-0">
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-black text-white truncate">{quizInfo?.title}</h1>
              {quizInfo?.quiz_type === 'chance' && (
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-black uppercase px-2 py-0.5 rounded shrink-0 animate-pulse">Chance Exam</span>
              )}
            </div>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-0.5">Descriptive Evaluation</p>
          </div>
        </div>
      </header>

      {/* ناحیه اسکرول‌شونده سوالات */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-12 relative z-10">
        
        {/* پیام راهنما */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 flex gap-4 items-start">
          <PenTool className="text-indigo-400 shrink-0 mt-1" size={24} />
          <div>
            <h4 className="text-indigo-300 font-black text-sm mb-1 uppercase tracking-widest">Instructions</h4>
            <p className="text-xs sm:text-sm text-indigo-200/70 font-medium leading-relaxed">
              Read each question carefully and type your descriptive answer in the provided boxes. 
              Take your time to elaborate. Scroll down to see all questions.
            </p>
          </div>
        </div>

        {/* لیست سوالات */}
        <div className="space-y-8 sm:space-y-10">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative group focus-within:border-indigo-500/50 transition-colors">
              
              <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4 border-b border-white/5 pb-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black leading-relaxed text-white">
                    {q.question_text}
                  </h3>
                </div>
                <div className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-[10px] font-black text-neutral-400 uppercase tracking-widest shrink-0 whitespace-nowrap">
                  {q.points} Pts
                </div>
              </div>

              <div className="relative">
                <textarea 
                  rows={6}
                  placeholder="Type your detailed answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white text-sm sm:text-base font-medium focus:outline-none focus:border-indigo-500/50 resize-y shadow-inner custom-scrollbar placeholder:text-neutral-600"
                />
              </div>

            </div>
          ))}
        </div>

        {/* دکمه ارسال (ثابت در پایین صفحه برای موبایل) */}
        <div className="pt-8 flex justify-center sticky bottom-24 sm:bottom-6 z-40">
          <button 
            onClick={handleSubmitExamPaper}
            disabled={isSubmitting}
            className="w-full sm:max-w-md px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(99,102,241,0.4)] active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />} 
            {isSubmitting ? "Submitting Paper..." : "Submit Exam Paper"}
          </button>
        </div>

      </main>
    </div>
  );
}