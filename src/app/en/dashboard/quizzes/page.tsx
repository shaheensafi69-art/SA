"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// تعریف تایپ‌ها برای مدیریت داده‌های آزمون متصل به دیتابیس
type QuizItem = {
  id: string;
  course_name: string;
  title: string;
  passing_score: number;
  status: "pending" | "passed" | "failed";
  score?: number;
  attempted_at?: string;
};

export default function QuizzesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  
  // آمار کلی آزمون‌ها
  const [stats, setStats] = useState({
    total: 0,
    passed: 0,
    average: 0
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;
      const userId = session.user.id;

      try {
        // 1. دریافت دوره‌های شاگرد
        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("course_id, courses(title)")
          .eq("student_id", userId);

        if (!enrollments || enrollments.length === 0) {
          setIsLoading(false);
          return;
        }

        const courseIds = enrollments.map(e => e.course_id);

        // 2. دریافت تمام آزمون‌های مربوط به این دوره‌ها
        const { data: allQuizzes } = await supabase
          .from("quizzes")
          .select("*")
          .in("course_id", courseIds)
          .order("created_at", { ascending: false });

        // 3. دریافت نمرات و تلاش‌های این شاگرد در آزمون‌ها
        const { data: attempts } = await supabase
          .from("quiz_attempts")
          .select("*")
          .eq("student_id", userId);

        if (allQuizzes) {
          let passedCount = 0;
          let totalScore = 0;
          let attemptCount = 0;

          const formatted: QuizItem[] = allQuizzes.map(quiz => {
            const enrollment = enrollments.find(e => e.course_id === quiz.course_id);
            const courseData: any = Array.isArray(enrollment?.courses) ? enrollment?.courses[0] : enrollment?.courses;
            const courseName = courseData?.title || "Premium Course";

            const attempt = attempts?.find(a => a.quiz_id === quiz.id);
            
            let status: QuizItem["status"] = "pending";
            if (attempt) {
              status = attempt.is_passed ? "passed" : "failed";
              if (attempt.is_passed) passedCount++;
              totalScore += attempt.score || 0;
              attemptCount++;
            }

            return {
              id: quiz.id,
              course_name: courseName,
              title: quiz.title,
              passing_score: quiz.passing_score,
              status,
              score: attempt?.score,
              attempted_at: attempt?.attempted_at
            };
          });

          setQuizzes(formatted);
          setStats({
            total: formatted.length,
            passed: passedCount,
            average: attemptCount > 0 ? Math.round(totalScore / attemptCount) : 0
          });
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // فیلتر کردن لیست آزمون‌ها
  const filteredQuizzes = quizzes.filter(quiz => {
    if (filter === "pending") return quiz.status === "pending";
    if (filter === "completed") return quiz.status !== "pending";
    return true; 
  });

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-10">
      
      {/* افکت نوری پس‌زمینه کل صفحه (Global Glow) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col gap-2 relative z-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Examination <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Center</span>
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl">Test your knowledge, pass the final exams, and earn your official certificates.</p>
      </header>

      {/* ================= بدنه اصلی تعاملی دو ستونه ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-start">

        {/* ================= ستون سمت چپ: آمار و فیلترها (Vertical Stacking) ================= */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          
          {/* آمار سریع (Quick Stats) از بالا به پایین */}
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-indigo-900/30 to-black p-5 rounded-[2rem] border border-indigo-500/20 backdrop-blur-xl flex items-center gap-5 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(99,102,241,0.05)] cursor-default">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-[1rem] flex items-center justify-center text-xl text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)] shrink-0">🎯</div>
              <div>
                <p className="text-indigo-400/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Total Exams</p>
                <h3 className="text-2xl font-extrabold text-white leading-none">{isLoading ? "-" : stats.total}</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-black p-5 rounded-[2rem] border border-emerald-500/20 backdrop-blur-xl flex items-center gap-5 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.05)] cursor-default">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-[1rem] flex items-center justify-center text-xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">✅</div>
              <div>
                <p className="text-emerald-400/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Exams Passed</p>
                <h3 className="text-2xl font-extrabold text-white leading-none">{isLoading ? "-" : stats.passed}</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-black p-5 rounded-[2rem] border border-blue-500/20 backdrop-blur-xl flex items-center gap-5 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.05)] cursor-default">
              <div className="w-12 h-12 bg-blue-500/10 rounded-[1rem] flex items-center justify-center text-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] shrink-0">📊</div>
              <div>
                <p className="text-blue-400/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Average Score</p>
                <h3 className="text-2xl font-extrabold text-white leading-none">{isLoading ? "-" : `${stats.average}%`}</h3>
              </div>
            </div>
          </div>

          {/* تب‌های فیلتر عمودی */}
          <div className="flex flex-col bg-neutral-900/40 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/5 shadow-2xl space-y-1.5 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] px-4 pt-3 pb-1 hidden md:block">Filter Quizzes</p>
            {([
              { id: "all", label: "All Exams", icon: "📋" },
              { id: "pending", label: "Pending", icon: "⏳" },
              { id: "completed", label: "Completed", icon: "🏆" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 group relative overflow-hidden ${
                  filter === tab.id 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-[1.02]" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <span className={`text-base transition-transform duration-300 ${filter === tab.id ? "" : "group-hover:scale-110"}`}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                
                <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-lg border relative z-10 ${
                  filter === tab.id ? "bg-black/20 border-black/10 text-white" : "bg-black/30 border-white/5 text-neutral-500 group-hover:text-neutral-300"
                }`}>
                  {quizzes.filter(q => tab.id === "all" ? true : tab.id === "pending" ? q.status === "pending" : q.status !== "pending").length}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ================= ستون سمت راست: لیست آزمون‌ها ================= */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-neutral-900/40 rounded-[2.5rem] border border-white/5 animate-pulse"></div>
              ))}
            </div>
          ) : filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredQuizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  className={`bg-neutral-900/40 rounded-[2.5rem] border backdrop-blur-2xl p-6 md:p-8 flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-xl group relative overflow-hidden h-full ${
                    quiz.status === "passed" ? "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(16,185,129,0.1)]" : 
                    quiz.status === "failed" ? "border-red-500/20 hover:border-red-500/40 hover:shadow-[0_15px_40px_rgba(239,68,68,0.1)]" : 
                    "border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_15px_40px_rgba(245,158,11,0.1)]"
                  }`}
                >
                  {/* 🔥 افکت نوری بک‌لایت زمان هاور */}
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[70px] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                    quiz.status === "passed" ? "bg-emerald-500/20" : quiz.status === "failed" ? "bg-red-500/20" : "bg-amber-500/20"
                  }`}></div>

                  {/* هدر کارت: دسته بندی و وضعیت */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <span className="px-3.5 py-1.5 bg-black/50 border border-white/10 rounded-lg text-[10px] font-black text-neutral-400 uppercase tracking-widest line-clamp-1 max-w-[60%] shadow-inner">
                      {quiz.course_name}
                    </span>
                    
                    {/* بج‌های وضعیت نئونی */}
                    {quiz.status === "pending" && (
                      <span className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                        To Do
                      </span>
                    )}
                    {quiz.status === "passed" && (
                      <span className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        Passed
                      </span>
                    )}
                    {quiz.status === "failed" && (
                      <span className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        Failed
                      </span>
                    )}
                  </div>
                  
                  {/* تایتل و نمره قبولی */}
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 relative z-10 leading-tight transition-colors group-hover:text-purple-400">{quiz.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-8 relative z-10">
                    <div className="px-3 py-1 bg-white/5 rounded-md text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      Required Pass Mark: <span className="text-white ml-1">{quiz.passing_score}%</span>
                    </div>
                  </div>

                  {/* بخش پایین: نمره (در صورت شرکت کردن) و دکمه اکشن */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    
                    {quiz.status !== "pending" ? (
                      <div>
                        <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Final Score</p>
                        <p className={`text-4xl font-black drop-shadow-[0_0_15px_currentColor] ${quiz.status === "passed" ? "text-emerald-400" : "text-red-400"}`}>
                          {quiz.score}<span className="text-sm text-neutral-500 ml-1">/ 100</span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
                        <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">⏳</span>
                        Not attempted yet
                      </div>
                    )}

                    {/* دکمه عملیات */}
                    <button 
                      className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-xl ${
                        quiz.status === "pending" 
                          ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:scale-105 shadow-[0_10px_20px_rgba(245,158,11,0.3)]" 
                          : quiz.status === "failed"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:scale-105"
                          : "bg-white/5 text-white border border-white/10 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {quiz.status === "pending" ? (
                        <>Start Exam <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                      ) : quiz.status === "failed" ? (
                        <>Retake Exam <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></>
                      ) : (
                        "Review Answers"
                      )}
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-12 rounded-[3rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px] h-full">
              <div className="text-6xl mb-6 opacity-80">🎯</div>
              <h3 className="text-2xl font-black text-white mb-2">No Quizzes Found</h3>
              <p className="text-neutral-400 font-medium mb-8 max-w-sm">
                {filter === "all" 
                  ? "There are no exams available for your enrolled courses at this moment." 
                  : `You don't have any ${filter} exams right now.`}
              </p>
              {filter !== "all" && (
                <button onClick={() => setFilter("all")} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 transition-all">
                  View All Exams
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}