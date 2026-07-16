"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2, HelpCircle, Save, ListOrdered, AlertCircle, FileText } from "lucide-react";

type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  points: number;
};

export default function ManageQuizQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");

  // استیت فرم ثبت سوال تشریحی
  const [newQ, setNewQ] = useState({
    question_text: "",
    points: 10
  });

  useEffect(() => {
    if (quizId) {
      fetchQuizAndQuestions();
    }
  }, [quizId]);

  const fetchQuizAndQuestions = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. واکشی اطلاعات آزمون
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      if (quizData) setQuizTitle(quizData.title);

      // ۲. واکشی لیست سوالات (فقط متن سوال و بارم نیاز است)
      const { data: questionsData, error: qError } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, question_text, points")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qError) throw qError;
      if (questionsData) setQuestions(questionsData);

    } catch (error: any) {
      console.error("Error fetching question bank:", error);
      setErrorMsg("Failed to load the question bank. " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.question_text.trim()) {
      setErrorMsg("Question text cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      // ثبت سوال جدید با پر کردن مقادیر پیش‌فرض برای فیلدهای چندگزینه‌ای
      const payload = {
        quiz_id: quizId,
        question_text: newQ.question_text.trim(),
        points: newQ.points,
        option_a: 'Descriptive',
        option_b: 'Descriptive',
        option_c: 'Descriptive',
        option_d: 'Descriptive',
        correct_option: 'A'
      };

      const { data, error } = await supabase
        .from("quiz_questions")
        .insert([payload])
        .select("id, quiz_id, question_text, points")
        .single();

      if (error) throw error;

      if (data) {
        // آپدیت لیست سوالات در لحظه
        setQuestions([...questions, data]);
        // ریست فرم
        setNewQ({ question_text: "", points: 10 });
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to add question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error: any) {
      alert("Failed to delete question: " + error.message);
    }
  };

  // محاسبه مجموع بارم سوالات ثبت شده
  const totalPoints = questions.reduce((acc, curr) => acc + (curr.points || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Question Bank...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-start gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
          <div>
            <Link href="/en/teacher/quizzes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Exam Hub
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {quizTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Bank</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Manage and compile descriptive questions for this assessment.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <div className="px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-lg">
              <ListOrdered size={16} /> {questions.length} Questions
            </div>
            <div className="px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-white/5 text-neutral-300 border-white/10 shadow-lg">
              Total Points: <span className={totalPoints > 100 ? "text-red-400" : "text-white"}>{totalPoints}</span>
            </div>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* ================= FORM: ADD NEW DESCRIPTIVE QUESTION ================= */}
        <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 sm:p-8 rounded-[2.5rem] shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none"></div>
          
          <h3 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-2 text-indigo-400 border-b border-indigo-500/20 pb-4">
            <Plus size={22} /> Add Descriptive Question
          </h3>
          
          <form onSubmit={handleAddQuestion} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Question Prompt *</label>
              <textarea 
                required placeholder="Type the descriptive question clearly here..." rows={4}
                value={newQ.question_text} onChange={e => setNewQ({...newQ, question_text: e.target.value})}
                className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-white text-base font-medium focus:outline-none focus:border-indigo-500/50 resize-y shadow-inner custom-scrollbar"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-end justify-between">
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Assigned Points *</label>
                <input 
                  required type="number" min="1" max="100"
                  value={newQ.points} onChange={e => setNewQ({...newQ, points: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 mt-2 text-center text-amber-400 text-sm font-black focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 shrink-0"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Question
              </button>
            </div>
          </form>
        </div>

        {/* ================= QUESTION LIST INVENTORY ================= */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-4">
            <HelpCircle size={22} className="text-neutral-500" /> Current Inventory
          </h3>
          
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-[#0a0a0f]/50 border border-dashed border-white/10 rounded-[2rem]">
              <p className="text-neutral-500 text-sm font-bold">No questions added yet. Start building your exam above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="bg-[#0a0a0f] border border-white/5 p-5 sm:p-6 rounded-[1.5rem] flex flex-col sm:flex-row justify-between items-start gap-4 group hover:border-white/10 transition-colors shadow-lg">
                  
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 font-black flex items-center justify-center text-sm shrink-0 mt-1 border border-indigo-500/20">
                      {index + 1}
                    </div>
                    <div className="space-y-2 w-full">
                      <p className="text-sm sm:text-base font-bold text-white leading-relaxed">{q.question_text}</p>
                      <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                        <FileText size={12}/> Descriptive Type
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-3 shrink-0 self-end sm:self-start w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="flex-1 sm:flex-none text-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                      {q.points} Points
                    </div>
                    <button 
                      onClick={() => handleDeleteQuestion(q.id)} 
                      className="p-3 sm:px-4 sm:py-2 bg-red-500/5 hover:bg-red-500/20 text-red-500/70 hover:text-red-400 rounded-xl transition-all border border-red-500/10 active:scale-95 flex items-center justify-center gap-2 text-xs font-bold sm:w-full"
                    >
                      <Trash2 size={14}/> <span className="sm:hidden">Delete</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}