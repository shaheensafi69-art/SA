"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  FileQuestion,
  Target,
  Layers,
  AlertCircle,
  Save,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  AlignLeft,
  ListChecks,
  Copy,
  Sparkles,
  Sliders,
  HelpCircle,
  Calculator,
  RotateCcw,
  BookOpen
} from "lucide-react";

interface ClassOption {
  id: string;
  class_name: string;
  course_id: string;
}

interface QuestionForm {
  id: string;
  type: "multiple_choice" | "descriptive";
  question_text: string;
  points: number;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
}

export default function TeacherCreateDynamicQuizPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassOption[]>([]);

  // Assessment Configuration State
  const [quizConfig, setQuizConfig] = useState({
    class_group_id: "",
    title: "",
    passing_score: 70,
    is_active: false,
    quiz_type: "regular" as "regular" | "chance",
  });

  const createEmptyQuestion = (type: "multiple_choice" | "descriptive"): QuestionForm => ({
    id: Math.random().toString(36).substring(2, 9),
    type,
    question_text: "",
    points: 10,
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
  });

  // Start with 1 Multiple Choice and 1 Descriptive question by default
  const [questions, setQuestions] = useState<QuestionForm[]>([
    createEmptyQuestion("multiple_choice"),
  ]);

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const fetchTeacherClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      const { data, error } = await supabase
        .from("class_groups")
        .select("id, class_name, course_id")
        .eq("teacher_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setClasses(data);
        setQuizConfig((prev) => ({ ...prev, class_group_id: data[0].id }));
      }
    } catch (err: any) {
      console.error("Error fetching classes:", err);
      setErrorMsg("Failed to load active classes. Please verify your instructor account.");
    } finally {
      setIsLoading(false);
    }
  };

  const addQuestionBlock = (type: "multiple_choice" | "descriptive") => {
    setQuestions((prev) => [...prev, createEmptyQuestion(type)]);
  };

  const removeQuestionBlock = (idToRemove: string) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((q) => q.id !== idToRemove));
  };

  const duplicateQuestionBlock = (question: QuestionForm) => {
    const duplicated: QuestionForm = {
      ...question,
      id: Math.random().toString(36).substring(2, 9),
      question_text: `${question.question_text} (Copy)`,
    };
    setQuestions((prev) => [...prev, duplicated]);
  };

  const updateQuestion = (id: string, field: keyof QuestionForm, value: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // Utility to balance points evenly across all questions to reach exactly 100 points
  const handleAutoBalancePoints = () => {
    if (questions.length === 0) return;
    const basePoints = Math.floor(100 / questions.length);
    const remainder = 100 % questions.length;

    setQuestions((prev) =>
      prev.map((q, idx) => ({
        ...q,
        points: basePoints + (idx < remainder ? 1 : 0),
      }))
    );
  };

  const selectedClass = useMemo(() => {
    return classes.find((c) => c.id === quizConfig.class_group_id);
  }, [classes, quizConfig.class_group_id]);

  const totalPoints = useMemo(() => {
    return questions.reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [questions]);

  const mcqCount = useMemo(() => {
    return questions.filter((q) => q.type === "multiple_choice").length;
  }, [questions]);

  const descCount = useMemo(() => {
    return questions.filter((q) => q.type === "descriptive").length;
  }, [questions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const supabase = createClient();

    try {
      if (!quizConfig.class_group_id) {
        throw new Error("Please select a target classroom from your roster.");
      }
      if (!quizConfig.title.trim()) {
        throw new Error("Examination title is required.");
      }
      if (questions.length === 0) {
        throw new Error("Please include at least one question in this assessment.");
      }

      // Comprehensive validation of all questions
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question_text.trim()) {
          throw new Error(`Question #${i + 1} has no prompt text. Please complete or delete it.`);
        }
        if (q.type === "multiple_choice") {
          if (!q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
            throw new Error(`Multiple-choice Question #${i + 1} requires all 4 options (A, B, C, D) to be filled.`);
          }
        }
        if (q.points <= 0) {
          throw new Error(`Question #${i + 1} points must be greater than 0.`);
        }
      }

      if (!selectedClass) {
        throw new Error("Selected class is invalid.");
      }

      // 1. Create the Quiz record
      const { data: newQuiz, error: quizError } = await supabase
        .from("quizzes")
        .insert({
          class_group_id: quizConfig.class_group_id,
          course_id: selectedClass.course_id,
          title: quizConfig.title.trim(),
          passing_score: Number(quizConfig.passing_score) || 70,
          is_active: quizConfig.is_active,
          quiz_type: quizConfig.quiz_type,
        })
        .select("id")
        .single();

      if (quizError) throw quizError;

      // 2. Prepare and insert questions
      const questionsToInsert = questions.map((q) => ({
        quiz_id: newQuiz.id,
        question_text: q.question_text.trim(),
        option_a: q.type === "multiple_choice" ? q.option_a.trim() : "Descriptive",
        option_b: q.type === "multiple_choice" ? q.option_b.trim() : "Descriptive",
        option_c: q.type === "multiple_choice" ? q.option_c.trim() : "Descriptive",
        option_d: q.type === "multiple_choice" ? q.option_d.trim() : "Descriptive",
        correct_option: q.type === "multiple_choice" ? q.correct_option : "A",
        points: Number(q.points) || 10,
        question_type: q.type,
      }));

      const { error: qError } = await supabase
        .from("quiz_questions")
        .insert(questionsToInsert);

      if (qError) {
        // Rollback quiz if question insertion fails
        await supabase.from("quizzes").delete().eq("id", newQuiz.id);
        throw new Error("Failed to store examination questions: " + qError.message);
      }

      setSuccessMsg("Assessment successfully published and deployed!");
      setTimeout(() => {
        router.push(`/${currentLocale}/teacher/quizzes`);
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create assessment.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Examination Authoring Hub...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-36" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div>
            <Link
              href={`/${currentLocale}/teacher/quizzes`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 active:scale-95"
            >
              <ArrowLeft size={14} className={isRtl ? "rotate-180" : ""} /> Return to Examination Terminal
            </Link>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                Assessment Authoring Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Author New <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Examination</span>
            </h1>
          </div>
        </header>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3.5 text-red-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Configuration Alert</p>
              <p className="text-xs text-red-400/90 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3.5 text-emerald-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Exam Published</p>
              <p className="text-xs text-emerald-400/90 mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ================= SECTION 1: ASSESSMENT SPECIFICATION ================= */}
          <div className="bg-[#0a0a10]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-7">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                <Target size={16} /> 1. Examination Parameters & Target Cohort
              </h3>

              {/* Status Switcher (Online / Draft) */}
              <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-2xl border border-white/5 w-fit">
                <span className={`text-[10px] font-black uppercase tracking-widest ${quizConfig.is_active ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {quizConfig.is_active ? "Status: Live (Students Can Take)" : "Status: Draft (Hidden)"}
                </span>
                <button
                  type="button"
                  onClick={() => setQuizConfig(prev => ({ ...prev, is_active: !prev.is_active }))}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                    quizConfig.is_active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-neutral-800 border border-white/10'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${quizConfig.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Target Class & Exam Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Classroom */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                  Target Classroom Cohort *
                </label>
                <div className="relative">
                  <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  <select
                    required
                    value={quizConfig.class_group_id}
                    onChange={(e) => setQuizConfig({ ...quizConfig, class_group_id: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-white text-sm font-semibold focus:outline-none focus:border-fuchsia-500/60 appearance-none shadow-inner cursor-pointer"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#0a0a10] text-white">
                        {c.class_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs">▼</div>
                </div>
              </div>

              {/* Exam Type (Regular vs Chance) */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                  Assessment Modality *
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/60 border border-white/10 rounded-2xl p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQuizConfig({ ...quizConfig, quiz_type: "regular" })}
                    className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                      quizConfig.quiz_type === "regular"
                        ? "bg-fuchsia-600 text-white shadow-md"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Regular Exam
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizConfig({ ...quizConfig, quiz_type: "chance" })}
                    className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                      quizConfig.quiz_type === "chance"
                        ? "bg-rose-600 text-white shadow-md"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Chance (Retake)
                  </button>
                </div>
              </div>

            </div>

            {/* Exam Title & Passing Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                  Exam Title / Subject *
                </label>
                <div className="relative">
                  <FileQuestion size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Midterm Examination: Database Systems & SQL"
                    value={quizConfig.title}
                    onChange={(e) => setQuizConfig({ ...quizConfig, title: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm font-semibold placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                  />
                </div>
              </div>

              {/* Passing Threshold Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                    Passing Threshold Percentage *
                  </label>
                  <span className="text-[10px] font-mono text-neutral-400">Min to Pass: {quizConfig.passing_score}%</span>
                </div>
                <div className="relative">
                  <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
                  <input
                    required
                    type="number"
                    min="1"
                    max="100"
                    value={quizConfig.passing_score}
                    onChange={(e) => setQuizConfig({ ...quizConfig, passing_score: Math.min(100, Math.max(1, Number(e.target.value))) })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-amber-400 text-base font-black font-mono focus:outline-none focus:border-amber-500/60 shadow-inner"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500">%</span>
                </div>
                {/* Passing Presets */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[50, 60, 70, 75, 80].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setQuizConfig({ ...quizConfig, passing_score: score })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                        quizConfig.passing_score === score
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                          : "bg-white/5 text-neutral-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {score}%
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ================= SECTION 2: QUESTION BANK BUILDER ================= */}
          <div className="space-y-6">
            
            {/* Header with Stats & Balance Tool */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a10]/80 p-5 rounded-2xl sm:rounded-3xl border border-white/5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                  <BookOpen size={22} className="text-fuchsia-400" />
                  Questions Inventory ({questions.length})
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {mcqCount} Multiple-Choice • {descCount} Descriptive
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-black/60 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
                  <span className="text-neutral-500 uppercase text-[10px]">Total Points:</span>
                  <span className={`text-base font-black ${totalPoints === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                    {totalPoints} Pts
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAutoBalancePoints}
                  className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-bold text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
                  title="Evenly distribute points across questions so total equals 100 pts"
                >
                  <Calculator size={14} className="text-fuchsia-400" />
                  <span className="hidden sm:inline">Balance to 100</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            {questions.map((q, idx) => {
              const isMcq = q.type === "multiple_choice";

              return (
                <div
                  key={q.id}
                  className="bg-[#0a0a10]/90 border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative group transition-all duration-300 focus-within:border-fuchsia-500/40 hover:shadow-[0_20px_40px_rgba(217,70,239,0.04)] space-y-6"
                >
                  
                  {/* Top: Index, Type Switcher, Points, Duplicate, Remove */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-fuchsia-500 text-white font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0">
                        {idx + 1}
                      </div>

                      {/* Question Type Toggle */}
                      <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuestion(q.id, "type", "multiple_choice")}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            isMcq
                              ? "bg-fuchsia-600 text-white shadow-md"
                              : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <ListChecks size={13} /> Multiple Choice
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQuestion(q.id, "type", "descriptive")}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            !isMcq
                              ? "bg-purple-600 text-white shadow-md"
                              : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <AlignLeft size={13} /> Descriptive
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      
                      {/* Point Setter */}
                      <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">Points:</span>
                        <input
                          required
                          type="number"
                          min="1"
                          max="1000"
                          value={q.points}
                          onChange={(e) => updateQuestion(q.id, "points", Math.max(1, Number(e.target.value)))}
                          className="w-12 bg-transparent text-amber-400 font-mono font-black text-sm text-center focus:outline-none"
                        />
                      </div>

                      {/* Duplicate Button */}
                      <button
                        type="button"
                        onClick={() => duplicateQuestionBlock(q)}
                        className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        title="Duplicate Question"
                      >
                        <Copy size={16} />
                      </button>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeQuestionBlock(q.id)}
                        disabled={questions.length === 1}
                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-20"
                        title="Delete Question"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                  {/* Question Prompt Textarea */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Question Prompt *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={
                        isMcq
                          ? "State the multiple-choice question problem or prompt clearly..."
                          : "Describe the descriptive essay prompt, analytical question, or technical scenario..."
                      }
                      value={q.question_text}
                      onChange={(e) => updateQuestion(q.id, "question_text", e.target.value)}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl p-4 text-white text-sm font-medium focus:outline-none focus:border-fuchsia-500/60 resize-y shadow-inner custom-scrollbar transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Multiple Choice Options Builder */}
                  {isMcq ? (
                    <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl space-y-4">
                      
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest block">
                          Configure 4 Options & Click to Mark Correct Answer
                        </label>
                        <span className="text-[10px] font-mono text-emerald-400">
                          Selected Key: [{q.correct_option}]
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {(["A", "B", "C", "D"] as const).map((optKey) => {
                          const isCorrect = q.correct_option === optKey;
                          const fieldName = `option_${optKey.toLowerCase()}` as keyof QuestionForm;

                          return (
                            <div
                              key={optKey}
                              className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
                                isCorrect
                                  ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                  : "bg-black/50 border-white/10 hover:border-white/20"
                              }`}
                            >
                              {/* Option Selector Button */}
                              <button
                                type="button"
                                onClick={() => updateQuestion(q.id, "correct_option", optKey)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs transition-all shadow-sm ${
                                  isCorrect
                                    ? "bg-emerald-500 text-white shadow-emerald-500/30"
                                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
                                }`}
                                title={`Mark Option ${optKey} as Correct`}
                              >
                                {isCorrect ? <CheckCircle2 size={16} /> : optKey}
                              </button>

                              {/* Option Input */}
                              <input
                                required
                                type="text"
                                placeholder={`Option ${optKey} answer text...`}
                                value={q[fieldName] as string}
                                onChange={(e) => updateQuestion(q.id, fieldName, e.target.value)}
                                className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-neutral-600 focus:outline-none font-medium pr-2"
                              />

                              {isCorrect && (
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider pr-2 hidden sm:inline">
                                  Correct
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ) : (
                    /* Descriptive Question Notice */
                    <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15 flex items-start gap-3">
                      <HelpCircle size={18} className="text-purple-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-purple-300">Descriptive Assessment Format</p>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          Students will respond with open-ended paragraphs or code solutions. Student submissions will be forwarded to your <strong className="text-white">Exam Results Hub</strong> for manual grading and feedback.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {/* Dynamic Add Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => addQuestionBlock("multiple_choice")}
                className="py-4.5 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 border border-dashed border-fuchsia-500/30 hover:border-fuchsia-500/60 text-fuchsia-400 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-sm"
              >
                <Plus size={18} /> Add Multiple Choice (۴ گزینه‌ای)
              </button>
              <button
                type="button"
                onClick={() => addQuestionBlock("descriptive")}
                className="py-4.5 bg-purple-500/5 hover:bg-purple-500/10 border border-dashed border-purple-500/30 hover:border-purple-500/60 text-purple-400 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-sm"
              >
                <Plus size={18} /> Add Descriptive (تشریحی)
              </button>
            </div>

          </div>

          {/* ================= FINAL SUBMIT ================= */}
          <div className="pt-6 flex justify-center border-t border-white/5 sticky bottom-6 z-40">
            <button
              type="submit"
              disabled={isSubmitting || classes.length === 0}
              className="w-full max-w-xl py-5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_15px_40px_rgba(217,70,239,0.35)] disabled:opacity-40 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Deploying Examination to Cohort...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Publish & Deploy Examination</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}