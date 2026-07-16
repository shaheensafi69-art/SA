"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, FileQuestion, Target, Layers, AlertCircle, Save, Award, Plus, Trash2, ListOrdered, FileText } from "lucide-react";

type ClassOption = {
  id: string;
  class_name: string;
  course_id: string;
};

type QuestionForm = {
  question_text: string;
  points: number;
};

export default function CreateDynamicQuizPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [classes, setClasses] = useState<ClassOption[]>([]);

  // استیت تنظیمات اصلی آزمون
  const [quizConfig, setQuizConfig] = useState({
    class_group_id: "",
    title: "",
    passing_score: 70,
    is_active: false,
    quiz_type: "regular" // 'regular' or 'chance'
  });

  // استیت آرایه سوالات تشریحی (فقط متن سوال و بارم)
  const [questions, setQuestions] = useState<QuestionForm[]>([{
    question_text: "", points: 10
  }]);

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const fetchTeacherClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("class_groups")
        .select("id, class_name, course_id")
        .eq("teacher_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setClasses(data);
        setQuizConfig(prev => ({ ...prev, class_group_id: data[0].id }));
      }
    } catch (err) {
      console.error("Error fetching classes:", err);
      setErrorMsg("Failed to load classes. Please ensure you have active cohorts.");
    } finally {
      setIsLoading(false);
    }
  };

  const addQuestionBlock = () => {
    setQuestions([
      ...questions, 
      { question_text: "", points: 10 }
    ]);
  };

  const removeQuestionBlock = (indexToRemove: number) => {
    if (questions.length === 1) return; // حداقل یک سوال باید بماند
    setQuestions(questions.filter((_, idx) => idx !== indexToRemove));
  };

  const updateQuestion = (index: number, field: keyof QuestionForm, value: string | number) => {
    const updatedQs = [...questions];
    updatedQs[index] = { ...updatedQs[index], [field]: value };
    setQuestions(updatedQs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      if (!quizConfig.class_group_id) throw new Error("Please select a target classroom.");
      if (!quizConfig.title) throw new Error("Quiz title is required.");
      if (questions.length === 0) throw new Error("Please add at least one question.");
      
      // بررسی اینکه آیا متنی برای سوالات وارد شده است یا خیر
      for (const q of questions) {
        if (!q.question_text.trim()) {
          throw new Error("All questions must have text. Please remove empty blocks.");
        }
      }

      const selectedClass = classes.find(c => c.id === quizConfig.class_group_id);
      if (!selectedClass) throw new Error("Invalid class configuration.");

      // مرحله ۱: ساخت کوییز
      const { data: newQuiz, error: quizError } = await supabase
        .from("quizzes")
        .insert({
          class_group_id: quizConfig.class_group_id,
          course_id: selectedClass.course_id,
          title: quizConfig.title.trim(),
          passing_score: quizConfig.passing_score || 70,
          is_active: quizConfig.is_active,
          quiz_type: quizConfig.quiz_type
        })
        .select("id")
        .single();

      if (quizError) throw quizError;

      // مرحله ۲: ثبت سوالات (فیلدهای بلااستفاده با مقدار پیش‌فرض پر می‌شوند)
      const questionsToInsert = questions.map(q => ({
        quiz_id: newQuiz.id,
        question_text: q.question_text.trim(),
        option_a: 'Descriptive',
        option_b: 'Descriptive',
        option_c: 'Descriptive',
        option_d: 'Descriptive',
        correct_option: 'A', // فیلد بی‌اثر در سوالات تشریحی
        points: q.points || 10,
      }));

      const { error: qError } = await supabase
        .from("quiz_questions")
        .insert(questionsToInsert);

      if (qError) {
        await supabase.from("quizzes").delete().eq("id", newQuiz.id);
        throw new Error("Failed to save questions. Quiz creation aborted.");
      }

      alert(`Descriptive Exam deployed successfully with ${questions.length} questions!`);
      router.push("/en/teacher/quizzes");
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to deploy the new exam.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
      </div>
    );
  }

  // محاسبه مجموع بارم کل امتحان
  const totalPoints = questions.reduce((acc, curr) => acc + (curr.points || 0), 0);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <Link href="/en/teacher/quizzes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Exam Hub
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-500">Assessment</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Configure settings and build descriptive question papers.</p>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ================= SECTION 1: QUIZ SETTINGS ================= */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <h3 className="text-xl font-black text-fuchsia-400 flex items-center gap-2">
                <Target size={22} /> Assessment Configuration
              </h3>
              
              {/* TOGGLE: On/Off System */}
              <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-2xl border border-white/5 w-fit">
                <span className={`text-[10px] font-black uppercase tracking-widest ${quizConfig.is_active ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {quizConfig.is_active ? "Status: ONLINE" : "Status: OFFLINE"}
                </span>
                <button 
                  type="button" 
                  onClick={() => setQuizConfig({...quizConfig, is_active: !quizConfig.is_active})}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${quizConfig.is_active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-neutral-800 border border-white/10'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${quizConfig.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Target Cohort (Class) *</label>
                <div className="relative">
                  <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <select 
                    required value={quizConfig.class_group_id} onChange={(e) => setQuizConfig({...quizConfig, class_group_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner cursor-pointer"
                  >
                    {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Exam Type *</label>
                <div className="relative flex bg-black/60 border border-white/10 rounded-2xl p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQuizConfig({...quizConfig, quiz_type: 'regular'})}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${quizConfig.quiz_type === 'regular' ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30' : 'text-neutral-500 hover:text-white'}`}
                  >
                    Regular Exam
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizConfig({...quizConfig, quiz_type: 'chance'})}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${quizConfig.quiz_type === 'chance' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-neutral-500 hover:text-white'}`}
                  >
                    Chance (Retake)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Paper Title *</label>
                <div className="relative">
                  <FileQuestion size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required type="text" placeholder="e.g. Mid-Term Evaluation"
                    value={quizConfig.title} onChange={(e) => setQuizConfig({...quizConfig, title: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Passing Threshold Score (%) *</label>
                <div className="relative">
                  <Award size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input 
                    required type="number" min="1" max="100"
                    value={quizConfig.passing_score} onChange={(e) => setQuizConfig({...quizConfig, passing_score: Number(e.target.value)})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-emerald-400 text-lg font-black focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: DYNAMIC QUESTION BUILDER ================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                <FileText size={26} className="text-indigo-400" /> Descriptive Questions
              </h3>
              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                Total Exam Points: <span className="text-indigo-400 text-sm">{totalPoints}</span>
              </div>
            </div>

            {questions.map((q, idx) => (
              <div key={idx} className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative group transition-all duration-300 focus-within:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.05)]">
                
                {/* Header of Question Block */}
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                      {idx + 1}
                    </div>
                    <h4 className="text-sm font-black text-neutral-300 uppercase tracking-widest">Question Text</h4>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => removeQuestionBlock(idx)}
                    disabled={questions.length === 1}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-30"
                    title="Remove Question"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Form Fields for the Question */}
                <div className="space-y-4">
                  <textarea 
                    required placeholder="Type your descriptive question here..." rows={3}
                    value={q.question_text} onChange={(e) => updateQuestion(idx, 'question_text', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white text-base font-medium focus:outline-none focus:border-indigo-500/50 resize-y shadow-inner custom-scrollbar"
                  />

                  <div className="flex justify-end">
                    <div className="w-32">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 block mb-2 text-right">Points Value</label>
                      <input 
                        required type="number" min="1" max="100"
                        value={q.points} onChange={(e) => updateQuestion(idx, 'points', Number(e.target.value))}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-center text-amber-400 text-sm font-black focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* DYNAMIC ADD BUTTON */}
            <button 
              type="button" 
              onClick={addQuestionBlock}
              className="w-full py-6 bg-white/[0.02] hover:bg-white/[0.05] border border-dashed border-white/20 hover:border-indigo-500/50 text-neutral-400 hover:text-indigo-400 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
            >
              <Plus size={20} /> Add Another Question
            </button>
          </div>

          {/* ================= FINAL SUBMIT ================= */}
          <div className="pt-8 flex justify-center border-t border-white/5 sticky bottom-24 sm:bottom-6 z-40">
            <button 
              type="submit" 
              disabled={isSubmitting || classes.length === 0} 
              className="w-full max-w-xl py-5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-[2rem] transition-all shadow-[0_15px_40px_rgba(217,70,239,0.4)] hover:shadow-[0_20px_50px_rgba(217,70,239,0.6)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.95]"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {isSubmitting ? "Compiling Exam..." : "Deploy Descriptive Exam"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}