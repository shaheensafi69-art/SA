"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, FileText, CheckCircle2, XCircle, Users, Target, BarChart3, Eye, ShieldAlert, X } from "lucide-react";

type QuizAttempt = {
  attempt_id: string;
  student_id: string;
  score: number;
  is_passed: boolean;
  answers: any; // برای نمایش جزئیات پاسخ‌های شاگرد
  submitted_at: string;
  // پروفایل شاگرد
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

type QuizInfo = {
  title: string;
  passing_score: number;
};

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // استیت برای مودال نمایش برگه امتحانی شاگرد
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);

  useEffect(() => {
    if (quizId) {
      fetchResultsData();
    }
  }, [quizId]);

  const fetchResultsData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. واکشی اطلاعات خود کوییز
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title, passing_score")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setQuizInfo(quizData);

      // ۲. واکشی لیست تمام برگه‌های امتحانی این کوییز (Two-Step Fetch)
      const { data: attemptsData, error: attemptsError } = await supabase
        .from("quiz_attempts")
        .select("id, student_id, score, is_passed, answers, submitted_at")
        .eq("quiz_id", quizId)
        .order("score", { ascending: false }); // مرتب‌سازی از بالاترین نمره به کمترین

      if (attemptsError) throw attemptsError;

      if (attemptsData && attemptsData.length > 0) {
        const studentIds = attemptsData.map(a => a.student_id);

        // ۳. واکشی پروفایل شاگردان
        const { data: profilesData, error: profError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        if (profError) throw profError;

        // ۴. ترکیب اطلاعات
        const formatted = attemptsData.map((attempt: any) => {
          const p = profilesData?.find((prof: any) => prof.id === attempt.student_id);
          return {
            attempt_id: attempt.id,
            student_id: attempt.student_id,
            score: attempt.score || 0,
            is_passed: attempt.is_passed || false,
            answers: attempt.answers || null,
            submitted_at: attempt.submitted_at,
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

  // محاسبه آمار کلی آزمون
  const stats = useMemo(() => {
    const total = attempts.length;
    const passed = attempts.filter(a => a.is_passed).length;
    const failed = total - passed;
    const avgScore = total > 0 ? Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / total) : 0;
    
    return { total, passed, failed, avgScore };
  }, [attempts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Exam Papers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <Link href="/en/teacher/quizzes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <ArrowLeft size={14} /> Back to Exam Hub
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">{quizInfo?.title}</h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Review and analyze student performance for this assessment.</p>
            </div>
            
            <div className="flex flex-col gap-2 shrink-0">
              <div className="px-4 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Target size={14} /> Passing Threshold: {quizInfo?.passing_score} Points
              </div>
            </div>
          </div>
        </header>

        {/* ================= STATS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-xl">
            <Users size={20} className="text-indigo-400 mb-2" />
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Submitted</p>
            <h3 className="text-2xl font-black text-white mt-1">{stats.total}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-xl">
            <CheckCircle2 size={20} className="text-emerald-400 mb-2" />
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Passed</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">{stats.passed}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-xl">
            <XCircle size={20} className="text-rose-400 mb-2" />
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Failed</p>
            <h3 className="text-2xl font-black text-rose-400 mt-1">{stats.failed}</h3>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-xl">
            <BarChart3 size={20} className="text-amber-400 mb-2" />
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Average Score</p>
            <h3 className="text-2xl font-black text-amber-400 mt-1">{stats.avgScore}</h3>
          </div>
        </div>

        {/* ================= RESULTS TABLE ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} /> Exam Papers
            </h3>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] sm:text-[11px] font-black text-neutral-500 uppercase tracking-widest">
                  <th className="p-6">Student Profile</th>
                  <th className="p-6">Submitted At</th>
                  <th className="p-6 text-center">Score</th>
                  <th className="p-6 text-center">Result Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attempts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                        <ShieldAlert size={48} className="text-neutral-600" />
                        <p className="text-neutral-400 text-sm font-bold">No students have taken this exam yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  attempts.map((attempt) => (
                    <tr key={attempt.attempt_id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      <td className="p-5 sm:p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            {attempt.avatar_url ? (
                              <img src={attempt.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg font-black text-indigo-500">{attempt.first_name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-white text-base">{attempt.first_name} {attempt.last_name}</p>
                            <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{attempt.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-5 sm:p-6 font-mono text-xs text-neutral-300">
                        {new Date(attempt.submitted_at).toLocaleString()}
                      </td>

                      <td className="p-5 sm:p-6 text-center">
                        <span className={`font-black text-lg ${attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {attempt.score}
                        </span>
                      </td>

                      <td className="p-5 sm:p-6 text-center">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1.5 ${
                          attempt.is_passed 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          {attempt.is_passed ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                          {attempt.is_passed ? "Passed" : "Failed"}
                        </span>
                      </td>

                      <td className="p-5 sm:p-6 text-right">
                        <button
                          onClick={() => setSelectedAttempt(attempt)}
                          className="px-4 py-2.5 bg-white/5 hover:bg-indigo-500/10 text-neutral-400 hover:text-indigo-400 border border-white/5 hover:border-indigo-500/30 rounded-xl transition-all active:scale-95 ml-auto shadow-md flex items-center gap-2"
                        >
                          <Eye size={14} /> View Paper
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: VIEW EXAM PAPER DETAILS ======================== */}
      {/* ========================================================================= */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md" onClick={() => setSelectedAttempt(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/50 shrink-0 flex justify-between items-start relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-64 h-32 blur-[60px] pointer-events-none ${selectedAttempt.is_passed ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  {selectedAttempt.avatar_url ? (
                    <img src={selectedAttempt.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-black text-indigo-500">{selectedAttempt.first_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{selectedAttempt.first_name}'s Exam Paper</h2>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">Submitted: {new Date(selectedAttempt.submitted_at).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => setSelectedAttempt(null)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 relative z-10">
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508] space-y-6">
              
              {/* Score Highlight Box */}
              <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${selectedAttempt.is_passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Final Graded Score</p>
                  <h3 className={`text-4xl font-black ${selectedAttempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedAttempt.score} Points
                  </h3>
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border flex items-center gap-2 ${selectedAttempt.is_passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>
                  {selectedAttempt.is_passed ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
                  {selectedAttempt.is_passed ? "Exam Passed" : "Exam Failed"}
                </div>
              </div>

              {/* Answers Breakdown placeholder */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="text-sm font-black text-indigo-400 flex items-center gap-2 uppercase tracking-widest">
                  <FileText size={16} /> Answers Breakdown
                </h4>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-sm leading-relaxed text-neutral-400 font-medium">
                  {/* اگر در آینده ساختار JSON پاسخ‌های شاگرد را ذخیره کردید، می‌توانید آن‌ها را اینجا رندر کنید */}
                  {selectedAttempt.answers ? (
                    <pre className="text-xs font-mono overflow-x-auto text-neutral-300">{JSON.stringify(selectedAttempt.answers, null, 2)}</pre>
                  ) : (
                    <p className="text-center italic opacity-60">Detailed answer logs are automatically evaluated by the system. Raw answer data is hidden.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}