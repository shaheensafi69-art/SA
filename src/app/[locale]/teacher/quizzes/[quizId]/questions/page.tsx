"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Loader2, Plus, Trash2, HelpCircle, 
  Save, ListOrdered, AlertCircle, FileText, CheckCircle2, 
  AlignLeft, ListChecks 
} from "lucide-react";

type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  points: number;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  correct_option: string | null;
};

export default function TeacherManageQuizQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  
  // رفع مشکل حساس به حروف در دریافت شناسه
  const quizId = (params?.quizId || params?.quizid || params?.id) as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");

  // استیت‌های مربوط به ثبت سوال
  const [questionType, setQuestionType] = useState<"mcq" | "desc">("mcq");
  const [newQ, setNewQ] = useState({
    question_text: "",
    points: 10,
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A"
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

      // ۲. واکشی لیست سوالات
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
    setErrorMsg(null);

    if (!newQ.question_text.trim()) {
      setErrorMsg("Question text cannot be empty.");
      return;
    }

    if (questionType === "mcq") {
      if (!newQ.option_a.trim() || !newQ.option_b.trim() || !newQ.option_c.trim() || !newQ.option_d.trim()) {
        setErrorMsg("All 4 options must be filled for a multiple-choice question.");
        return;
      }
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      // تنظیم مقادیر بر اساس نوع سوال
      const payload = {
        quiz_id: quizId,
        question_text: newQ.question_text.trim(),
        points: newQ.points,
        option_a: questionType === "mcq" ? newQ.option_a.trim() : "Descriptive",
        option_b: questionType === "mcq" ? newQ.option_b.trim() : "Descriptive",
        option_c: questionType === "mcq" ? newQ.option_c.trim() : "Descriptive",
        option_d: questionType === "mcq" ? newQ.option_d.trim() : "Descriptive",
        correct_option: questionType === "mcq" ? newQ.correct_option : "A"
      };

      const { data, error } = await supabase
        .from("quiz_questions")
        .insert([payload])
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        setQuestions([...questions, data]);
        // ریست فرم
        setNewQ({
          question_text: "",
          points: 10,
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_option: "A"
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
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error: any) {
      alert("Failed to delete question: " + error.message);
    }
  };

  const totalPoints = questions.reduce((acc, curr) => acc + (curr.points || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-fuchsia-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Question Bank...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambient Glows (Teacher Theme) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-start gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/teacher/quizzes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <ArrowLeft size={14} /> Back to Exam Hub
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {quizTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Bank</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Manage and compile multiple-choice or descriptive questions for this assessment.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
            <div className="px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-lg">
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

        {/* ================= FORM: ADD NEW QUESTION ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[50px] pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6 relative z-10">
            <h3 className="text-lg sm:text-xl font-black flex items-center gap-2 text-white">
              <Plus size={22} className="text-fuchsia-500" /> Add New Question
            </h3>

            {/* Type Switcher */}
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setQuestionType("mcq")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  questionType === "mcq" 
                    ? "bg-fuchsia-500 text-white shadow-lg" 
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <ListChecks size={14} /> Multiple Choice
              </button>
              <button
                onClick={() => setQuestionType("desc")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  questionType === "desc" 
                    ? "bg-fuchsia-500 text-white shadow-lg" 
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <AlignLeft size={14} /> Descriptive
              </button>
            </div>
          </div>
          
          <form onSubmit={handleAddQuestion} className="space-y-6 relative z-10">
            {/* Question Text */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Question Prompt *</label>
              <textarea 
                required placeholder="Type the question clearly here..." rows={3}
                value={newQ.question_text} onChange={e => setNewQ({...newQ, question_text: e.target.value})}
                className="w-full bg-[#050508] border border-white/10 rounded-2xl p-5 text-white text-base font-medium focus:outline-none focus:border-fuchsia-500/50 resize-y shadow-inner custom-scrollbar"
              />
            </div>

            {/* Options (Only for MCQ) */}
            {questionType === "mcq" && (
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-4">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Answers & Correct Option *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["A", "B", "C", "D"] as const).map((opt) => (
                    <div key={opt} className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${newQ.correct_option === opt ? 'bg-fuchsia-500/10 border-fuchsia-500/40' : 'bg-black/40 border-white/10'}`}>
                      <button
                        type="button"
                        onClick={() => setNewQ({ ...newQ, correct_option: opt })}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${newQ.correct_option === opt ? 'bg-fuchsia-500 border-fuchsia-500 text-white' : 'bg-white/5 border-white/10 text-neutral-500 hover:text-white'}`}
                        title="Mark as correct answer"
                      >
                        {newQ.correct_option === opt ? <CheckCircle2 size={16} /> : opt}
                      </button>
                      <input
                        type="text"
                        placeholder={`Option ${opt}`}
                        value={newQ[`option_${opt.toLowerCase()}` as keyof typeof newQ] as string}
                        onChange={(e) => setNewQ({ ...newQ, [`option_${opt.toLowerCase()}`]: e.target.value })}
                        className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none font-medium pr-2"
                        required={questionType === "mcq"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-5 items-end justify-between border-t border-white/5 pt-6">
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Assigned Points *</label>
                <input 
                  required type="number" min="1" max="100"
                  value={newQ.points} onChange={e => setNewQ({...newQ, points: Number(e.target.value)})}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3.5 mt-2 text-center text-amber-400 text-sm font-black focus:outline-none focus:border-fuchsia-500/50"
                />
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 shrink-0"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Question
              </button>
            </div>
          </form>
        </div>

        {/* ================= QUESTION LIST INVENTORY ================= */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-4">
            <HelpCircle size={22} className="text-fuchsia-500" /> Current Inventory
          </h3>
          
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-[#0a0a0f]/50 border border-dashed border-white/10 rounded-[2rem]">
              <p className="text-neutral-500 text-sm font-bold">No questions added yet. Start building your exam above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, index) => {
                const isDescriptive = !q.option_a || q.option_a === "Descriptive";

                return (
                  <div key={q.id} className="bg-[#0a0a0f]/90 border border-white/5 p-5 sm:p-6 rounded-[1.5rem] flex flex-col sm:flex-row justify-between items-start gap-4 group hover:border-fuchsia-500/30 transition-colors shadow-lg relative overflow-hidden">
                    
                    <div className="flex gap-4 items-start flex-1 min-w-0 z-10">
                      <div className="w-8 h-8 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-black flex items-center justify-center text-sm shrink-0 mt-1 border border-fuchsia-500/20 shadow-inner">
                        {index + 1}
                      </div>
                      <div className="space-y-3 w-full">
                        <p className="text-sm sm:text-base font-bold text-white leading-relaxed">{q.question_text}</p>
                        
                        {/* Tags */}
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                            {isDescriptive ? <AlignLeft size={10} className="text-blue-400"/> : <ListChecks size={10} className="text-emerald-400"/>}
                            {isDescriptive ? "Descriptive" : "Multiple Choice"}
                          </span>
                        </div>

                        {/* Options preview for MCQ */}
                        {!isDescriptive && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                            {(["A", "B", "C", "D"] as const).map(optKey => {
                              const optVal = q[`option_${optKey.toLowerCase()}` as keyof typeof q];
                              const isCorrect = q.correct_option === optKey;
                              return optVal ? (
                                <div key={optKey} className={`flex items-center gap-2 text-xs font-medium ${isCorrect ? 'text-emerald-400' : 'text-neutral-400'}`}>
                                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black shrink-0 ${isCorrect ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-black border border-white/10'}`}>
                                    {optKey}
                                  </span>
                                  <span className="truncate">{optVal}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center gap-3 shrink-0 self-end sm:self-start w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5 z-10">
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
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}