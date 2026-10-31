"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  HelpCircle,
  Save,
  ListOrdered,
  AlertCircle,
  FileText,
  CheckCircle2,
  AlignLeft,
  ListChecks,
  Award,
  Sparkles,
  Calculator,
  Search,
  Filter,
  Check,
  X,
  Copy,
  ChevronDown,
  Info
} from "lucide-react";

interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  points: number;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  correct_option: string | null;
  question_type?: "multiple_choice" | "descriptive" | null;
  created_at?: string;
}

interface QuizInfo {
  id: string;
  title: string;
  passing_score: number;
  quiz_type: string;
  is_active: boolean;
}

export default function TeacherManageQuizQuestionsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();

  const quizId = (params?.quizId || params?.quizid || params?.id) as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Filtering
  const [filterType, setFilterType] = useState<"all" | "multiple_choice" | "descriptive">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // New Question Form state
  const [questionType, setQuestionType] = useState<"multiple_choice" | "descriptive">("multiple_choice");
  const [newQ, setNewQ] = useState({
    question_text: "",
    points: 10,
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A" as "A" | "B" | "C" | "D",
  });

  useEffect(() => {
    if (quizId) {
      fetchQuizAndQuestions();
    }
  }, [quizId]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchQuizAndQuestions = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // 1. Fetch quiz info
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title, passing_score, quiz_type, is_active")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setQuizInfo(quizData);

      // 2. Fetch questions
      const { data: questionsData, error: qError } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, question_text, points, option_a, option_b, option_c, option_d, correct_option, question_type, created_at")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qError) throw qError;

      // Normalize question types
      const normalized = (questionsData || []).map((q: any) => {
        const isDescriptive = q.question_type === "descriptive" || q.option_a === "Descriptive";
        return {
          ...q,
          question_type: isDescriptive ? "descriptive" : "multiple_choice",
        };
      });

      setQuestions(normalized);

    } catch (error: any) {
      console.error("Error fetching question bank:", error);
      showToast("error", "Failed to retrieve questions: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newQ.question_text.trim()) {
      showToast("error", "Question prompt text cannot be empty.");
      return;
    }

    if (questionType === "multiple_choice") {
      if (!newQ.option_a.trim() || !newQ.option_b.trim() || !newQ.option_c.trim() || !newQ.option_d.trim()) {
        showToast("error", "All 4 options (A, B, C, D) are required for multiple-choice questions.");
        return;
      }
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const payload = {
        quiz_id: quizId,
        question_text: newQ.question_text.trim(),
        points: Number(newQ.points) || 10,
        option_a: questionType === "multiple_choice" ? newQ.option_a.trim() : "Descriptive",
        option_b: questionType === "multiple_choice" ? newQ.option_b.trim() : "Descriptive",
        option_c: questionType === "multiple_choice" ? newQ.option_c.trim() : "Descriptive",
        option_d: questionType === "multiple_choice" ? newQ.option_d.trim() : "Descriptive",
        correct_option: questionType === "multiple_choice" ? newQ.correct_option : "A",
        question_type: questionType,
      };

      const { data, error } = await supabase
        .from("quiz_questions")
        .insert([payload])
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        setQuestions((prev) => [
          ...prev,
          {
            ...data,
            question_type: questionType,
          },
        ]);

        // Reset form
        setNewQ({
          question_text: "",
          points: 10,
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_option: "A",
        });

        showToast("success", "Question successfully added to inventory!");
      }
    } catch (error: any) {
      showToast("error", "Failed to save question: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this question?")) return;

    setIsDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      showToast("success", "Question removed from inventory.");
    } catch (error: any) {
      showToast("error", "Failed to delete question: " + error.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Calculations
  const totalPoints = useMemo(() => {
    return questions.reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [questions]);

  const mcqCount = useMemo(() => {
    return questions.filter((q) => q.question_type === "multiple_choice").length;
  }, [questions]);

  const descCount = useMemo(() => {
    return questions.filter((q) => q.question_type === "descriptive").length;
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filterType !== "all" && q.question_type !== filterType) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return q.question_text.toLowerCase().includes(query);
      }
      return true;
    });
  }, [questions, filterType, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Question Inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 text-xs font-black uppercase tracking-wider animate-[fadeInDown_0.2s_ease-out] ${
          toastMessage.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {toastMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            
            <div className="space-y-3">
              <Link
                href={`/${currentLocale}/teacher/quizzes`}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 active:scale-95"
              >
                <ArrowLeft size={13} className={isRtl ? "rotate-180" : ""} /> Return to Assessments
              </Link>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                    Question Bank Manager
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    quizInfo?.quiz_type === "chance"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  }`}>
                    {quizInfo?.quiz_type === "chance" ? "Chance (Retake)" : "Regular"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono ${
                    quizInfo?.is_active
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-neutral-400 bg-white/5 border border-white/5"
                  }`}>
                    {quizInfo?.is_active ? "Live" : "Draft"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {quizInfo?.title}
                </h1>
              </div>
            </div>

            {/* Metrics Pills */}
            <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 shrink-0">
              <div className="px-5 py-3 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <ListOrdered size={16} /> {questions.length} Questions ({mcqCount} MCQ • {descCount} Desc)
              </div>
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <span>Total Points:</span>
                <span className={`font-black text-sm ${totalPoints === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                  {totalPoints} Pts
                </span>
                <span className="text-neutral-500 text-[10px]">(Pass: {quizInfo?.passing_score}%)</span>
              </div>
            </div>

          </div>

        </header>

        {/* ================= FORM: ADD NEW QUESTION ================= */}
        <div className="bg-[#0a0a10]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2.5">
                <Plus size={20} className="text-fuchsia-400" />
                Add Question to Examination
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Select question category and specify answer requirements
              </p>
            </div>

            {/* Question Type Switcher */}
            <div className="flex bg-black/60 border border-white/10 rounded-2xl p-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionType("multiple_choice")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  questionType === "multiple_choice"
                    ? "bg-fuchsia-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <ListChecks size={15} /> Multiple Choice (۴ گزینه‌ای)
              </button>
              <button
                type="button"
                onClick={() => setQuestionType("descriptive")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  questionType === "descriptive"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <AlignLeft size={15} /> Descriptive (تشریحی)
              </button>
            </div>
          </div>

          <form onSubmit={handleAddQuestion} className="space-y-6">
            
            {/* Question Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                  Question Prompt Text *
                </label>
                <span className="text-[10px] font-mono text-neutral-500">
                  {questionType === "multiple_choice" ? "Multiple Choice Prompt" : "Open-ended Descriptive Prompt"}
                </span>
              </div>
              <textarea
                required
                rows={3}
                placeholder={
                  questionType === "multiple_choice"
                    ? "State the question problem or scenario clearly..."
                    : "Describe the descriptive essay prompt, analytical question, or technical assignment..."
                }
                value={newQ.question_text}
                onChange={(e) => setNewQ({ ...newQ, question_text: e.target.value })}
                className="w-full bg-[#050508] border border-white/10 rounded-2xl p-4 text-white text-sm font-medium focus:outline-none focus:border-fuchsia-500/60 resize-y shadow-inner custom-scrollbar transition-colors leading-relaxed"
              />
            </div>

            {/* Multiple Choice Options Builder */}
            {questionType === "multiple_choice" ? (
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-4">
                
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest block">
                    Define 4 Options & Click Badge to Mark Correct Answer
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Correct Key: [{newQ.correct_option}]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {(["A", "B", "C", "D"] as const).map((optKey) => {
                    const isCorrect = newQ.correct_option === optKey;
                    const fieldName = `option_${optKey.toLowerCase()}` as keyof typeof newQ;

                    return (
                      <div
                        key={optKey}
                        className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
                          isCorrect
                            ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            : "bg-black/50 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Option Button */}
                        <button
                          type="button"
                          onClick={() => setNewQ({ ...newQ, correct_option: optKey })}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs transition-all ${
                            isCorrect
                              ? "bg-emerald-500 text-white shadow-emerald-500/30"
                              : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
                          }`}
                          title={`Select ${optKey} as correct answer`}
                        >
                          {isCorrect ? <CheckCircle2 size={16} /> : optKey}
                        </button>

                        <input
                          required
                          type="text"
                          placeholder={`Option ${optKey} answer text...`}
                          value={newQ[fieldName] as string}
                          onChange={(e) => setNewQ({ ...newQ, [fieldName]: e.target.value })}
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
              /* Descriptive Notice */
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15 flex items-start gap-3">
                <Info size={18} className="text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-purple-300">Descriptive Assessment Notice</p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                    Students will write their answers in an essay editor. You will review and award points for these answers in the <strong className="text-white">Exam Results Hub</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Row: Points Input & Save Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
              
              <div className="flex items-center gap-3">
                <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider whitespace-nowrap">
                  Points Allocation:
                </label>
                <div className="relative">
                  <input
                    required
                    type="number"
                    min="1"
                    max="1000"
                    value={newQ.points}
                    onChange={(e) => setNewQ({ ...newQ, points: Math.max(1, Number(e.target.value)) })}
                    className="w-24 bg-[#050508] border border-white/10 rounded-xl px-3 py-2.5 text-center text-amber-400 font-mono font-black text-sm focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-1">
                  {[5, 10, 15, 20, 25].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setNewQ({ ...newQ, points: pts })}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                        newQ.points === pts
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                          : "bg-white/5 text-neutral-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {pts}p
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_10px_25px_rgba(217,70,239,0.25)] disabled:opacity-40 flex items-center justify-center gap-2 active:scale-95"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>{isSubmitting ? "Adding Question..." : "Save Question to Bank"}</span>
              </button>

            </div>

          </form>

        </div>

        {/* ================= INVENTORY LIST & SEARCH ================= */}
        <div className="space-y-6">
          
          {/* Inventory Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            <h3 className="text-xl font-black text-white flex items-center gap-2.5">
              <HelpCircle size={22} className="text-fuchsia-400" />
              Existing Questions ({filteredQuestions.length})
            </h3>

            <div className="flex items-center gap-2">
              
              {/* Filter Tabs */}
              <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === "all" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType("multiple_choice")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === "multiple_choice" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  MCQ ({mcqCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType("descriptive")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === "descriptive" ? "bg-purple-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Descriptive ({descCount})
                </button>
              </div>

            </div>

          </div>

          {/* Questions Grid */}
          {filteredQuestions.length === 0 ? (
            <div className="p-16 text-center bg-[#0a0a10]/50 border border-dashed border-white/10 rounded-[2.5rem]">
              <HelpCircle size={44} className="text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400 text-sm font-bold">No questions match your current view.</p>
              <p className="text-neutral-500 text-xs mt-1">Add your first question using the editor above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const isDescriptive = q.question_type === "descriptive";

                return (
                  <div
                    key={q.id}
                    className="bg-[#0a0a10]/90 border border-white/5 hover:border-fuchsia-500/30 p-5 sm:p-7 rounded-[2rem] transition-all duration-300 shadow-xl space-y-4 group relative overflow-hidden"
                  >
                    
                    {/* Header: Index, Type Badge, Points, Delete */}
                    <div className="flex items-start justify-between gap-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 font-black flex items-center justify-center text-xs shrink-0 shadow-inner">
                          {idx + 1}
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${
                          isDescriptive
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"
                        }`}>
                          {isDescriptive ? <AlignLeft size={11} /> : <ListChecks size={11} />}
                          {isDescriptive ? "Descriptive (تشریحی)" : "Multiple Choice (۴ گزینه‌ای)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-black">
                          {q.points} Pts
                        </span>

                        <button
                          type="button"
                          disabled={isDeletingId === q.id}
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all active:scale-95 disabled:opacity-40"
                          title="Delete Question"
                        >
                          {isDeletingId === q.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      </div>

                    </div>

                    {/* Question Prompt */}
                    <div className="pl-0 sm:pl-11">
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {q.question_text}
                      </p>
                    </div>

                    {/* MCQ Options Display */}
                    {!isDescriptive && (
                      <div className="pl-0 sm:pl-11 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                          {(["A", "B", "C", "D"] as const).map((optKey) => {
                            const optText = q[`option_${optKey.toLowerCase()}` as keyof Question] as string;
                            const isCorrect = q.correct_option === optKey;

                            if (!optText || optText === "Descriptive") return null;

                            return (
                              <div
                                key={optKey}
                                className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium border ${
                                  isCorrect
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                    : "bg-black/30 border-white/5 text-neutral-300"
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${
                                  isCorrect ? "bg-emerald-500 text-white" : "bg-white/5 text-neutral-400"
                                }`}>
                                  {optKey}
                                </span>
                                <span className="truncate flex-1">{optText}</span>
                                {isCorrect && (
                                  <span className="text-[9px] font-black uppercase text-emerald-400 font-mono pr-1">
                                    Correct
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

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