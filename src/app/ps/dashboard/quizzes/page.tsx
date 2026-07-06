"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// تعریف تایپ‌ها برای مدیریت داده‌های آزمون
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
            // پیدا کردن اسم دوره
            const enrollment = enrollments.find(e => e.course_id === quiz.course_id);
            const courseData: any = Array.isArray(enrollment?.courses) ? enrollment?.courses[0] : enrollment?.courses;
            const courseName = courseData?.title || "Unknown Course";

            // بررسی وضعیت آزمون (آیا قبلا شرکت کرده؟)
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
    return true; // all
  });

  return (
    <div className="w-full">
      
      {/* ================= Header (تراز با سایدبار h-24) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Exams & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Quizzes</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Test your knowledge and earn your certificates.</p>
        </div>
      </header>

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 pb-12 max-w-7xl mx-auto">

        {/* ================= آمار سریع (Quick Stats) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Total Exams</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : stats.total}</h3>
            </div>
          </div>
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center text-2xl">✅</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Passed</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : stats.passed}</h3>
            </div>
          </div>
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center text-2xl">📊</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Average Score</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : `${stats.average}%`}</h3>
            </div>
          </div>
        </div>

        {/* ================= تب‌های فیلتر ================= */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {([
            { id: "all", label: "All Exams" },
            { id: "pending", label: "Pending" },
            { id: "completed", label: "Completed" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
                  : "bg-neutral-900/50 text-neutral-400 border border-white/5 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-md text-xs ${filter === tab.id ? "bg-black/20" : "bg-white/10"}`}>
                {quizzes.filter(q => tab.id === "all" ? true : tab.id === "pending" ? q.status === "pending" : q.status !== "pending").length}
              </span>
            </button>
          ))}
        </div>

        {/* ================= لیست آزمون‌ها ================= */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="bg-neutral-900/40 rounded-[2rem] border border-white/5 backdrop-blur-xl p-6 md:p-8 flex flex-col hover:bg-neutral-900/60 hover:border-yellow-500/30 hover:-translate-y-1 transition-all shadow-lg group relative overflow-hidden"
              >
                {/* افکت نوری پس زمینه کارت */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-20 ${quiz.status === "passed" ? "bg-green-500" : quiz.status === "failed" ? "bg-red-500" : "bg-yellow-500"}`}></div>

                {/* هدر کارت: دسته بندی و وضعیت */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-neutral-400 uppercase tracking-widest line-clamp-1 max-w-[60%]">
                    {quiz.course_name}
                  </span>
                  
                  {quiz.status === "pending" && (
                    <span className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[10px] font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                      To Do
                    </span>
                  )}
                  {quiz.status === "passed" && (
                    <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Passed
                    </span>
                  )}
                  {quiz.status === "failed" && (
                    <span className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      Failed
                    </span>
                  )}
                </div>
                
                {/* تایتل و نمره قبولی */}
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 relative z-10">{quiz.title}</h3>
                <p className="text-sm text-neutral-500 font-medium mb-6 relative z-10">
                  Passing Score Required: <span className="text-neutral-300 font-bold">{quiz.passing_score}%</span>
                </p>

                {/* بخش نمره (در صورت شرکت کردن) و دکمه */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                  
                  {quiz.status !== "pending" ? (
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Your Score</p>
                      <p className={`text-3xl font-extrabold ${quiz.status === "passed" ? "text-green-400" : "text-red-400"}`}>
                        {quiz.score}<span className="text-sm text-neutral-500 ml-1">/ 100</span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Not attempted yet
                    </div>
                  )}

                  {/* دکمه عملیات (بعدا لینک می‌شود به کامپوننت کوئیز میکر) */}
                  <button 
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      quiz.status === "pending" 
                        ? "bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105 shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
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
          <div className="bg-neutral-900/40 p-12 rounded-[2rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-6">📝</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">No Quizzes Found</h3>
            <p className="text-neutral-400 font-medium mb-8 max-w-md">
              {filter === "all" 
                ? "There are no exams available for your enrolled courses yet." 
                : `You don't have any ${filter} exams right now.`}
            </p>
            {filter !== "all" && (
              <button onClick={() => setFilter("all")} className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                View All Exams
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}