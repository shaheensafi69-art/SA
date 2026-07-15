"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Trash2, Loader2, BarChart3, Filter, Target, FileQuestion, GraduationCap, CheckCircle2, Settings2, FileText } from "lucide-react";

type Quiz = {
  id: string;
  class_group_id: string;
  class_name: string;
  title: string;
  passing_score: number;
  is_active: boolean; // وضعیت On/Off
  created_at: string;
};

type ClassOption = {
  id: string;
  class_name: string;
};

export default function TeacherQuizzesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("all");

  useEffect(() => {
    fetchQuizzesData();
  }, []);

  const fetchQuizzesData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      // ۱. پیدا کردن کلاس‌هایی که این استاد تدریس می‌کند
      const { data: classGroups, error: cgError } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", session.user.id);

      if (cgError) throw cgError;

      if (classGroups && classGroups.length > 0) {
        setClasses(classGroups);
        const classIds = classGroups.map(cg => cg.id);

        // ۲. واکشی کوییزهای متصل به این کلاس‌ها
        const { data: quizzesData, error: quizzesError } = await supabase
          .from("quizzes")
          .select("id, class_group_id, title, passing_score, is_active, created_at")
          .in("class_group_id", classIds)
          .order("created_at", { ascending: false });

        if (quizzesError) throw quizzesError;

        if (quizzesData) {
          const formatted = quizzesData.map((item: any) => {
            const targetClass = classGroups.find(c => c.id === item.class_group_id);
            return {
              id: item.id,
              class_group_id: item.class_group_id,
              class_name: targetClass ? targetClass.class_name : "Unknown Class",
              title: item.title,
              passing_score: item.passing_score || 50,
              is_active: item.is_active || false,
              created_at: item.created_at,
            };
          });
          setQuizzes(formatted);
        }
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // تابع تغییر وضعیت داینامیک On/Off
  const toggleQuizStatus = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();
    try {
      const newStatus = !currentStatus;
      const { error } = await supabase.from("quizzes").update({ is_active: newStatus }).eq("id", id);
      if (error) throw error;
      
      setQuizzes(quizzes.map(q => q.id === id ? { ...q, is_active: newStatus } : q));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to change quiz status.");
    }
  };

  const handleDeleteQuiz = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete the quiz: "${title}"?`)) return;

    setIsDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("quizzes").delete().eq("id", id);
      if (error) throw error;

      setQuizzes(prev => prev.filter(item => item.id !== id));
      alert("Quiz deleted successfully.");
    } catch (error: any) {
      alert("Failed to delete quiz: " + error.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredQuizzes = useMemo(() => {
    if (selectedClassFilter === "all") return quizzes;
    return quizzes.filter(item => item.class_group_id === selectedClassFilter);
  }, [quizzes, selectedClassFilter]);

  const stats = useMemo(() => {
    const total = quizzes.length;
    const activeExams = quizzes.filter(q => q.is_active).length;
    return { total, activeExams };
  }, [quizzes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Assessment Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= PREMIUM HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/5 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-inner shrink-0">
              <FileQuestion size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Assessment <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Hub</span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-md leading-relaxed tracking-wide">
                Design quizzes, manage exam states, and evaluate student comprehension per class.
              </p>
            </div>
          </div>
          
          <Link 
            href="/en/teacher/quizzes/create"
            className="w-full lg:w-auto px-8 py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(99,102,241,0.3)] flex items-center justify-center gap-3 active:scale-95 shrink-0"
          >
            <PlusCircle size={18} /> Create Quiz
          </Link>
        </header>

        {/* ================= STATS & FILTER BAR ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/10"><Target size={20}/></div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Created</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{stats.total} Exams</h3>
            </div>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/10"><CheckCircle2 size={20}/></div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Active Exams</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{stats.activeExams} Online</h3>
            </div>
          </div>
          
          {/* Smart Filter */}
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-white/5 text-neutral-400 rounded-xl flex items-center justify-center border border-white/5 shrink-0"><Filter size={18}/></div>
            <div className="flex-1">
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1 mb-1">Filter by Class</p>
              <select 
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500/50 appearance-none shadow-inner"
              >
                <option value="all">All Classrooms</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.class_name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= QUIZZES GRID LIST ================= */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <BarChart3 size={56} className="text-neutral-700 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No Quizzes Found</h3>
            <p className="text-neutral-400 text-sm max-w-xs mx-auto">You haven't created any exams or quizzes for this selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className={`bg-[#0a0a0f]/90 border rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 shadow-2xl relative overflow-hidden ${quiz.is_active ? 'border-emerald-500/30 shadow-[0_20px_40px_rgba(16,185,129,0.05)]' : 'border-white/5 hover:border-indigo-500/30'}`}>
                
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[40px] pointer-events-none transition-colors ${quiz.is_active ? 'bg-emerald-500/10' : 'bg-indigo-500/5 group-hover:bg-indigo-500/10'}`}></div>

                {/* Status Toggle (ON/OFF) */}
                <div className="absolute top-6 right-6 z-20">
                  <button 
                    onClick={() => toggleQuizStatus(quiz.id, quiz.is_active)}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border flex items-center gap-1.5 ${
                      quiz.is_active 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-black/60 text-neutral-500 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {quiz.is_active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                    {quiz.is_active ? "LIVE" : "OFFLINE"}
                  </button>
                </div>

                <div className="space-y-4 flex-1 relative z-10 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 inline-block line-clamp-1 max-w-[70%]">
                    {quiz.class_name}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">{quiz.title}</h3>
                </div>

                <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  
                  <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px] bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
                    <Target size={14} className="text-amber-400" />
                    Passing Score: <strong className="text-white ml-1">{quiz.passing_score}</strong>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    
                    {/* دکمه بررسی برگه‌های شاگردان */}
                    <Link 
                      href={`/en/teacher/quizzes/${quiz.id}/results`}
                      className="p-3 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/20 rounded-xl transition-all active:scale-95 shadow-md flex items-center justify-center"
                      title="View Student Papers"
                    >
                      <FileText size={16} />
                    </Link>

                    {/* هدایت به صفحه مدیریت سوالات */}
                    <Link 
                      href={`/en/teacher/quizzes/${quiz.id}/questions`}
                      className="p-3 bg-white/5 hover:bg-indigo-500/10 text-neutral-400 hover:text-white border border-white/5 hover:border-indigo-500/30 rounded-xl transition-all active:scale-95 shadow-md flex items-center justify-center"
                      title="Manage Questions"
                    >
                      <Settings2 size={16} />
                    </Link>

                    {/* دکمه حذف */}
                    <button 
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                      disabled={isDeletingId === quiz.id}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/30 rounded-xl transition-all active:scale-95 shadow-md disabled:opacity-40 flex items-center justify-center"
                      title="Delete Quiz"
                    >
                      {isDeletingId === quiz.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}