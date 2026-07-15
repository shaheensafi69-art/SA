"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2, HelpCircle, Save, CheckCircle2, ListOrdered, Target, AlertCircle } from "lucide-react";

type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
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

  // استیت برای فرم ثبت سوال جدید
  const [newQ, setNewQ] = useState({
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
    points: 1
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
      // ۱. واکشی اطلاعات خود کوییز (برای نمایش عنوان)
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      if (quizData) setQuizTitle(quizData.title);

      // ۲. واکشی لیست سوالات فعلی این کوییز
      const { data: questionsData, error: qError } = await supabase
        .from("quiz_questions")
        .select("*")
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
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("quiz_questions")
        .insert([{ ...newQ, quiz_id: quizId }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // آپدیت لیست سوالات در لحظه
        setQuestions([...questions, data]);
        
        // خالی کردن فرم برای ثبت سوال بعدی
        setNewQ({ 
          question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", points: 1 
        });
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

      // آپدیت رابط کاربری با حذف سوال
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error: any) {
      alert("Failed to delete question: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Question Bank...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
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
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Manage and compile your exam's question inventory.</p>
          </div>
          
          <div className="px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-lg shrink-0">
            <ListOrdered size={16} /> Total: {questions.length} Questions
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* ================= FORM: ADD NEW QUESTION ================= */}
        <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 sm:p-8 rounded-[2.5rem] shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none"></div>
          
          <h3 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-2 text-indigo-400 border-b border-indigo-500/20 pb-4">
            <Plus size={22} /> Append New Question
          </h3>
          
          <form onSubmit={handleAddQuestion} className="space-y-6 relative z-10">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Question Prompt *</label>
              <textarea 
                required placeholder="Type the question text clearly here..." rows={3}
                value={newQ.question_text} onChange={e => setNewQ({...newQ, question_text: e.target.value})}
                className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-white text-base font-medium focus:outline-none focus:border-indigo-500/50 resize-none shadow-inner custom-scrollbar"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Multiple Choice Options *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/[0.01] p-5 rounded-2xl border border-white/5">
                {['a', 'b', 'c', 'd'].map((opt) => (
                  <div key={opt} className="relative flex items-center">
                    <span className="absolute left-4 text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">{opt}</span>
                    <input 
                      required type="text" placeholder={`Enter text for option ${opt.toUpperCase()}`}
                      value={(newQ as any)[`option_${opt}`]} onChange={e => setNewQ({...newQ, [`option_${opt}`]: e.target.value})}
                      className="w-full bg-black border border-white/5 rounded-xl py-4 pl-14 pr-4 text-sm text-neutral-200 focus:outline-none focus:border-indigo-500/50 shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 items-end bg-black/40 border border-white/5 p-5 rounded-2xl">
              <div className="flex-1 w-full">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Correct Answer *</label>
                <select 
                  value={newQ.correct_option} onChange={e => setNewQ({...newQ, correct_option: e.target.value})}
                  className="w-full bg-black border border-indigo-500/20 rounded-xl px-4 py-3.5 mt-2 outline-none text-white font-bold cursor-pointer"
                >
                  <option value="A">Option A is Correct</option>
                  <option value="B">Option B is Correct</option>
                  <option value="C">Option C is Correct</option>
                  <option value="D">Option D is Correct</option>
                </select>
              </div>

              <div className="w-full md:w-1/3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Score Points *</label>
                <input 
                  required type="number" min="1" max="100"
                  value={newQ.points} onChange={e => setNewQ({...newQ, points: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 mt-2 text-center text-amber-400 text-sm font-black focus:outline-none"
                />
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 shrink-0"
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
                <div key={q.id} className="bg-[#0a0a0f] border border-white/5 p-6 sm:p-8 rounded-[1.5rem] flex flex-col sm:flex-row justify-between items-start gap-6 group hover:border-white/10 transition-colors shadow-lg">
                  
                  <div className="space-y-4 flex-1 w-full">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 font-black flex items-center justify-center text-sm shrink-0 mt-0.5 border border-indigo-500/20">
                        {index + 1}
                      </div>
                      <p className="text-base font-black text-white leading-relaxed">{q.question_text}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pl-0 sm:pl-12">
                      {['A', 'B', 'C', 'D'].map((opt) => {
                        const isCorrect = q.correct_option === opt;
                        return (
                          <div key={opt} className={`flex items-center gap-3 p-3 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/[0.01] border-white/5'}`}>
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${isCorrect ? 'bg-emerald-500 text-white border-transparent' : 'bg-white/5 text-neutral-500 border-white/10'}`}>
                              {opt}
                            </span>
                            <p className={`text-xs sm:text-sm font-medium ${isCorrect ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                              {(q as any)[`option_${opt.toLowerCase()}`]}
                            </p>
                            {isCorrect && <CheckCircle2 size={14} className="text-emerald-500 ml-auto shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-3 shrink-0 self-end sm:self-start w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="flex-1 sm:flex-none text-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {q.points} Points
                    </div>
                    <button 
                      onClick={() => handleDeleteQuestion(q.id)} 
                      className="p-3 bg-red-500/5 hover:bg-red-500/20 text-red-500/70 hover:text-red-400 rounded-xl transition-all border border-red-500/10 active:scale-95 flex items-center justify-center gap-2 text-xs font-bold sm:w-full"
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