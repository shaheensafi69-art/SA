"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2, CheckCircle2, XCircle, Clock, Lock } from "lucide-react";

// تطبیق با ساختار جدید دیتابیس
type QuizItem = {
  id: string;
  course_name: string;
  title: string;
  quiz_type: string; // 'regular' or 'chance'
  passing_score: number;
  status: "pending" | "pending_review" | "graded"; // منطق جدید
  score?: number;
  letter_grade?: string; // A+, A, B, C, Chance
  is_passed?: boolean;
  attempted_at?: string;
};

export default function QuizzesPage() {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  
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
        const { data: classStudents } = await supabase
          .from("class_students")
          .select("class_group_id")
          .eq("student_id", userId);

        if (!classStudents || classStudents.length === 0) {
          setIsLoading(false);
          return;
        }
        const classIds = classStudents.map(cs => cs.class_group_id);

        const { data: classGroups } = await supabase
          .from("class_groups")
          .select("id, class_name, course_id")
          .in("id", classIds);

        const courseIds = classGroups?.map(cg => cg.course_id) || [];
        const { data: courses } = await supabase
          .from("courses")
          .select("id, title")
          .in("id", courseIds);

        // واکشی امتحانات فعال (عادی و چانس)
        const { data: allQuizzes } = await supabase
          .from("quizzes")
          .select("id, title, passing_score, quiz_type, class_group_id")
          .in("class_group_id", classIds)
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        // واکشی تلاش‌ها و وضعیت تصحیح
        const { data: attempts } = await supabase
          .from("quiz_attempts")
          .select("quiz_id, score, is_passed, status, letter_grade, attempted_at")
          .eq("student_id", userId);

        if (allQuizzes) {
          let passedCount = 0;
          let totalScore = 0;
          let gradedCount = 0;

          const formatted: QuizItem[] = allQuizzes.map(quiz => {
            const cg = classGroups?.find(c => c.id === quiz.class_group_id);
            const crs = courses?.find(c => c.id === cg?.course_id);
            const courseName = crs?.title || cg?.class_name || "Premium Course";

            const attempt = attempts?.find(a => a.quiz_id === quiz.id);
            
            let currentStatus: QuizItem["status"] = "pending"; // پیش‌فرض: امتحان نداده
            if (attempt) {
              currentStatus = attempt.status === "graded" ? "graded" : "pending_review";
              
              if (attempt.status === "graded") {
                if (attempt.is_passed) passedCount++;
                totalScore += attempt.score || 0;
                gradedCount++;
              }
            }

            return {
              id: quiz.id,
              course_name: courseName,
              title: quiz.title,
              quiz_type: quiz.quiz_type || 'regular',
              passing_score: quiz.passing_score,
              status: currentStatus,
              score: attempt?.score,
              letter_grade: attempt?.letter_grade,
              is_passed: attempt?.is_passed,
              attempted_at: attempt?.attempted_at
            };
          });

          setQuizzes(formatted);
          setStats({
            total: formatted.length,
            passed: passedCount,
            average: gradedCount > 0 ? Math.round(totalScore / gradedCount) : 0
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

  const filteredQuizzes = quizzes.filter(quiz => {
    if (filter === "pending") return quiz.status === "pending";
    if (filter === "completed") return quiz.status !== "pending";
    return true; 
  });

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-32 min-h-screen">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col gap-2 relative z-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Examination <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Center</span>
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl">Take your academic descriptive exams and track your official grades.</p>
      </header>

      {/* ================= Main Content Layout ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-start pb-24">

        {/* Left Column: Stats & Filters */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-indigo-900/30 to-black p-5 rounded-[2rem] border border-indigo-500/20 backdrop-blur-xl flex items-center gap-5 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-[1rem] flex items-center justify-center text-xl text-indigo-400 shrink-0">🎯</div>
              <div>
                <p className="text-indigo-400/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Total Exams</p>
                <h3 className="text-2xl font-extrabold text-white leading-none">{isLoading ? "-" : stats.total}</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/30 to-black p-5 rounded-[2rem] border border-emerald-500/20 backdrop-blur-xl flex items-center gap-5 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-[1rem] flex items-center justify-center text-xl text-emerald-400 shrink-0">✅</div>
              <div>
                <p className="text-emerald-400/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Exams Passed</p>
                <h3 className="text-2xl font-extrabold text-white leading-none">{isLoading ? "-" : stats.passed}</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-neutral-900/40 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/5 shadow-2xl space-y-1.5">
            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] px-4 pt-3 pb-1 hidden md:block">Filter Quizzes</p>
            {([
              { id: "all", label: "All Exams", icon: "📋" },
              { id: "pending", label: "To Do", icon: "⏳" },
              { id: "completed", label: "Attempted", icon: "🎓" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 group ${
                  filter === tab.id ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg" : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-lg border ${
                  filter === tab.id ? "bg-black/20 border-black/10 text-white" : "bg-black/30 border-white/5 text-neutral-500"
                }`}>
                  {quizzes.filter(q => tab.id === "all" ? true : tab.id === "pending" ? q.status === "pending" : q.status !== "pending").length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Quiz List */}
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
                    quiz.status === "graded" && quiz.is_passed ? "border-emerald-500/20" : 
                    quiz.status === "graded" && !quiz.is_passed ? "border-red-500/20" : 
                    "border-amber-500/20"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[70px] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                    quiz.status === "graded" && quiz.is_passed ? "bg-emerald-500/20" : quiz.status === "graded" && !quiz.is_passed ? "bg-red-500/20" : "bg-amber-500/20"
                  }`}></div>

                  {/* Header: Course Name & Status Badge */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <span className="px-3.5 py-1.5 bg-black/50 border border-white/10 rounded-lg text-[10px] font-black text-neutral-400 uppercase tracking-widest line-clamp-1 max-w-[50%] shadow-inner">
                      {quiz.course_name}
                    </span>
                    
                    {/* Status Badges */}
                    {quiz.status === "pending" && (
                      <span className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div> Not Attempted
                      </span>
                    )}
                    {quiz.status === "pending_review" && (
                      <span className="px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={12} /> Under Review
                      </span>
                    )}
                    {quiz.status === "graded" && quiz.is_passed && (
                      <span className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> Passed
                      </span>
                    )}
                    {quiz.status === "graded" && !quiz.is_passed && (
                      <span className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                        <XCircle size={12} /> Failed
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Type */}
                  <div className="mb-8 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${quiz.quiz_type === 'chance' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}`}>
                        {quiz.quiz_type} Exam
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight">{quiz.title}</h3>
                  </div>

                  {/* Bottom Section: Score / Action Button */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    
                    {/* Score / Grade Display */}
                    {quiz.status === "graded" ? (
                      <div>
                        <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Final Grade</p>
                        <div className="flex items-baseline gap-2">
                          <p className={`text-4xl font-black ${quiz.is_passed ? "text-emerald-400" : "text-red-400"}`}>{quiz.score}</p>
                          <span className={`text-sm font-black px-2 py-0.5 rounded border ${quiz.is_passed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                            Grade {quiz.letter_grade}
                          </span>
                        </div>
                      </div>
                    ) : quiz.status === "pending_review" ? (
                      <div className="text-neutral-500 text-xs font-bold">
                        <p className="uppercase tracking-widest text-[9px] mb-1">Status</p>
                        Awaiting Instructor Grading
                      </div>
                    ) : (
                      <div>
                        <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Pass Mark</p>
                        <p className="text-xl font-black text-white">{quiz.passing_score} / 100</p>
                      </div>
                    )}

                    {/* Action Button: Start or Locked */}
                    <button 
                      onClick={() => {
                        if (quiz.status === "pending") router.push(`/en/dashboard/quizzes/${quiz.id}`);
                      }}
                      disabled={quiz.status !== "pending"}
                      className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-xl ${
                        quiz.status === "pending" 
                          ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:scale-105 shadow-[0_10px_20px_rgba(245,158,11,0.3)] cursor-pointer" 
                          : "bg-white/5 text-neutral-500 border border-white/10 cursor-not-allowed"
                      }`}
                    >
                      {quiz.status === "pending" ? (
                        <>Start Exam</>
                      ) : (
                        <><Lock size={14} /> Locked</>
                      )}
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-12 rounded-[3rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
              <div className="text-6xl mb-6 opacity-80">🎯</div>
              <h3 className="text-2xl font-black text-white mb-2">No Quizzes Found</h3>
              <p className="text-neutral-400 font-medium mb-8 max-w-sm">You don't have any exams matching this status.</p>
              {filter !== "all" && (
                <button onClick={() => setFilter("all")} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/10">
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