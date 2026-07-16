"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Plus, Target, CheckCircle2, ShieldAlert, Loader2, ArrowRight, Clock, AlertCircle } from "lucide-react";

type QuizOverview = {
  id: string;
  title: string;
  course_name: string;
  passing_score: number;
  is_active: boolean;
  quiz_type: string; // 'regular' or 'chance'
  stats: {
    total_attempts: number;
    pending_reviews: number;
  };
};

export default function TeacherQuizzesOverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizOverview[]>([]);
  const [filterType, setFilterType] = useState<"all" | "regular" | "chance">("all");

  useEffect(() => {
    fetchTeacherQuizzes();
  }, []);

  const fetchTeacherQuizzes = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // ۱. پیدا کردن کلاس‌های متعلق به این استاد
      const { data: myClasses } = await supabase
        .from("class_groups")
        .select("id, class_name, course_id")
        .eq("teacher_id", session.user.id);

      if (!myClasses || myClasses.length === 0) {
        setIsLoading(false);
        return;
      }

      const classIds = myClasses.map(c => c.id);
      const courseIds = [...new Set(myClasses.map(c => c.course_id))];

      const { data: courses } = await supabase
        .from("courses")
        .select("id, title")
        .in("id", courseIds);

      // ۲. دریافت کوییزهای متصل به این کلاس‌ها
      const { data: allQuizzes, error: quizError } = await supabase
        .from("quizzes")
        .select("*")
        .in("class_group_id", classIds)
        .order("created_at", { ascending: false });

      if (quizError) throw quizError;

      // ۳. دریافت تمام تلاش‌ها (Attempts) برای محاسبه وضعیت تصحیح برگه‌ها
      const { data: allAttempts } = await supabase
        .from("quiz_attempts")
        .select("quiz_id, status")
        .in("quiz_id", allQuizzes?.map(q => q.id) || []);

      if (allQuizzes) {
        const formatted: QuizOverview[] = allQuizzes.map(quiz => {
          const classData = myClasses.find(c => c.id === quiz.class_group_id);
          const courseData = courses?.find(c => c.id === classData?.course_id);
          
          const quizAttempts = allAttempts?.filter(a => a.quiz_id === quiz.id) || [];
          const pendingReviewsCount = quizAttempts.filter(a => a.status === "pending_review").length;

          return {
            id: quiz.id,
            title: quiz.title,
            course_name: courseData?.title || classData?.class_name || "Unknown Course",
            passing_score: quiz.passing_score,
            is_active: quiz.is_active,
            quiz_type: quiz.quiz_type || 'regular',
            stats: {
              total_attempts: quizAttempts.length,
              pending_reviews: pendingReviewsCount,
            }
          };
        });
        setQuizzes(formatted);
      }

    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setIsLoading(false);
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
    } catch (error) {
      alert("Failed to toggle status.");
    }
  };

  const filteredQuizzes = quizzes.filter(q => filterType === "all" ? true : q.quiz_type === filterType);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Exams Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/5 text-fuchsia-400 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 shadow-inner shrink-0">
              <Target size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">Hub</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Design essay exams, manage chance tests, and grade student submissions.</p>
            </div>
          </div>
          
          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <Link 
              href="/en/teacher/quizzes/create" 
              className="flex-1 md:flex-none px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus size={16} /> Deploy Exam
            </Link>
          </div>
        </header>

        {/* ================= FILTER TABS ================= */}
        <div className="flex bg-[#0a0a0f]/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl w-full sm:w-fit overflow-x-auto custom-scrollbar">
          {(['all', 'regular', 'chance'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filterType === tab ? 'bg-white/10 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
              }`}
            >
              {tab === 'all' ? 'All Assessments' : tab === 'regular' ? 'Regular Exams' : 'Chance Exams'}
            </button>
          ))}
        </div>

        {/* ================= EXAMS GRID ================= */}
        {filteredQuizzes.length === 0 ? (
          <div className="bg-[#0a0a0f]/60 border border-white/5 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center backdrop-blur-xl shadow-2xl min-h-[400px]">
            <ShieldAlert size={48} className="text-neutral-600 mb-6" />
            <h3 className="text-2xl font-black text-white mb-2">No Exams Deployed</h3>
            <p className="text-neutral-500 font-medium max-w-sm">You haven't created any exams in this category yet. Click "Deploy Exam" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 flex flex-col backdrop-blur-3xl shadow-xl hover:-translate-y-2 hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
                
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${quiz.quiz_type === 'chance' ? 'bg-rose-500/10' : 'bg-fuchsia-500/10'}`}></div>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-2.5">
                    <span className="px-3 py-1 bg-black/40 border border-white/5 rounded-md text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                      {quiz.course_name}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight pr-4">{quiz.title}</h3>
                  </div>
                  
                  {/* Status Toggle */}
                  <button 
                    onClick={() => handleToggleStatus(quiz.id, quiz.is_active)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                      quiz.is_active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" : "bg-neutral-800 text-neutral-500 border border-white/5 hover:bg-neutral-700"
                    }`}
                  >
                    {quiz.is_active ? <CheckCircle2 size={12}/> : <div className="w-1.5 h-1.5 rounded-full bg-neutral-500"></div>}
                    {quiz.is_active ? "Live" : "Draft"}
                  </button>
                </div>

                {/* Exam Details & Pending Review Alert */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-8 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                    <span className="text-neutral-500">Pass Mark:</span> {quiz.passing_score}%
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                    <span className="text-neutral-500">Type:</span> 
                    <span className={quiz.quiz_type === 'chance' ? 'text-rose-400' : 'text-fuchsia-400'}>
                      {quiz.quiz_type.toUpperCase()}
                    </span>
                  </div>
                  {quiz.stats.pending_reviews > 0 && (
                    <div className="w-full mt-2 sm:mt-0 sm:w-auto px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                      <Clock size={12}/> {quiz.stats.pending_reviews} Papers to Grade
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/en/teacher/quizzes/${quiz.id}/questions`}
                    className="flex-1 text-center py-3.5 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:text-white transition-all"
                  >
                    Question Bank
                  </Link>
                  <Link 
                    href={`/en/teacher/quizzes/${quiz.id}/results`}
                    className={`flex-1 text-center py-3.5 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      quiz.stats.pending_reviews > 0 
                        ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30" 
                        : "bg-white/5 hover:bg-fuchsia-500/10 text-white border-white/10 hover:border-fuchsia-500/30"
                    }`}
                  >
                    {quiz.stats.pending_reviews > 0 ? "Grade Papers" : "View Results"} <ArrowRight size={14}/>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}