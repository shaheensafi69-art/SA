"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ClipboardEdit,
  CalendarDays,
  AlignLeft,
  Target,
  Layers,
  AlertCircle,
  Save,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  RotateCcw,
  Eye,
  GraduationCap,
  Calendar,
  Zap,
  Code2,
  FileCode,
  BookOpen,
  Info
} from "lucide-react";

interface ClassOption {
  id: string;
  class_name: string;
  course_id: string | null;
}

export default function CreateAssignmentPage() {
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
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  // Form state
  const [form, setForm] = useState({
    class_group_id: "",
    title: "",
    description: "",
    deadline: "",
    max_score: 100,
    submission_type: "Any Document or Link",
  });

  const submissionTypes = [
    { label: "Document (PDF / Word)", icon: FileText },
    { label: "Source Code / Git Repo", icon: Code2 },
    { label: "Archive (ZIP / RAR)", icon: FileCode },
    { label: "Any Document or Link", icon: BookOpen },
  ];

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
        setForm(prev => ({ ...prev, class_group_id: data[0].id }));
      }
    } catch (err: any) {
      console.error("Error fetching classes for assignment:", err);
      setErrorMsg("Failed to load your classroom roster. Please make sure you have active classes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format date for datetime-local input
  const formatDateTimeLocal = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Quick preset deadline setters
  const setQuickDeadline = (hoursAhead: number) => {
    const target = new Date();
    target.setHours(target.getHours() + hoursAhead);
    // Round to next 30 minutes
    const remMinutes = target.getMinutes() % 30;
    if (remMinutes > 0) {
      target.setMinutes(target.getMinutes() + (30 - remMinutes));
    }
    setForm(prev => ({ ...prev, deadline: formatDateTimeLocal(target) }));
  };

  const handleTemplateInsert = (template: "guidelines" | "objective" | "rubric") => {
    let snippet = "";
    if (template === "objective") {
      snippet = `\n\n📌 OBJECTIVE:\nClearly describe the core problem to solve, required deliverables, and expected technical implementation.`;
    } else if (template === "guidelines") {
      snippet = `\n\n📋 SUBMISSION GUIDELINES:\n1. Upload your completed project files or provide a verifiable repository URL.\n2. Include a README or brief documentation explaining your solution.\n3. Make sure all tests and instructions are verified prior to the deadline.`;
    } else if (template === "rubric") {
      snippet = `\n\n🎯 EVALUATION CRITERIA:\n- Correctness & Functionality: 50%\n- Code Quality & Architecture: 30%\n- Documentation & Cleanliness: 20%`;
    }
    setForm(prev => ({ ...prev, description: (prev.description + snippet).trim() }));
  };

  const selectedClass = useMemo(() => {
    return classes.find(c => c.id === form.class_group_id);
  }, [classes, form.class_group_id]);

  const deadlineCountdown = useMemo(() => {
    if (!form.deadline) return null;
    const due = new Date(form.deadline).getTime();
    const now = Date.now();
    const diff = due - now;
    if (diff <= 0) return { label: "Expired / Past Due", isPast: true };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;

    if (days > 0) {
      return { label: `Due in ${days}d ${remHours}h`, isPast: false };
    }
    return { label: `Due in ${hours} hours`, isPast: false };
  }, [form.deadline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const supabase = createClient();

    try {
      if (!form.class_group_id) {
        throw new Error("Please select a target classroom from your roster.");
      }
      if (!form.title.trim()) {
        throw new Error("Assignment title is required.");
      }
      if (form.max_score <= 0 || form.max_score > 10000) {
        throw new Error("Maximum score must be between 1 and 10,000 points.");
      }

      // Check deadline if set
      let isoDeadline: string | null = null;
      if (form.deadline) {
        const parsed = new Date(form.deadline);
        if (isNaN(parsed.getTime())) {
          throw new Error("Invalid deadline format.");
        }
        isoDeadline = parsed.toISOString();
      }

      // Format description with submission type prefix if specified
      let fullDescription = form.description.trim();
      if (form.submission_type && !fullDescription.includes("[Format: ")) {
        fullDescription = `[Format: ${form.submission_type}]\n\n${fullDescription}`.trim();
      }

      // Insert into Supabase assignments table
      const { error } = await supabase
        .from("assignments")
        .insert({
          class_group_id: form.class_group_id,
          course_id: selectedClass?.course_id || null,
          title: form.title.trim(),
          description: fullDescription || null,
          deadline: isoDeadline,
          max_score: Number(form.max_score) || 100,
        });

      if (error) throw error;

      setSuccessMsg("Assignment successfully deployed to classroom!");
      setTimeout(() => {
        router.push(`/${currentLocale}/teacher/assignments`);
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to deploy the assignment. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Deployment Terminal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link 
              href={`/${currentLocale}/teacher/assignments`} 
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white flex items-center justify-center transition-all shrink-0 active:scale-95"
              title="Return to Assignments"
            >
              <ArrowLeft size={20} className={isRtl ? "rotate-180" : ""} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                  Task Deployment Hub
                </span>
                <span className="text-neutral-600 text-xs font-mono">•</span>
                <span className="text-neutral-400 text-xs font-medium">
                  {classes.length} Active Classroom{classes.length === 1 ? "" : "s"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Deploy New <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Academic Task</span>
              </h1>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden bg-white/5 p-1 rounded-xl border border-white/5 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "form" ? "bg-fuchsia-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"
              }`}
            >
              <ClipboardEdit size={14} /> Task Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "preview" ? "bg-fuchsia-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Eye size={14} /> Student View
            </button>
          </div>
        </header>

        {/* Notifications / Alerts */}
        {errorMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3.5 text-red-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Deployment Notice</p>
              <p className="text-xs text-red-400/90 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3.5 text-emerald-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Operation Successful</p>
              <p className="text-xs text-emerald-400/90 mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        {/* ================= MAIN 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM CONSOLE (8 Cols on LG) */}
          <div className={`lg:col-span-7 xl:col-span-8 space-y-6 ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
            <form onSubmit={handleSubmit} className="bg-[#0a0a10]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
              
              {/* SECTION 1: TARGET COHORT */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <Target size={16} /> 1. Target Classroom Cohort
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono uppercase">Required Field</span>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                    Assigned Classroom
                  </label>
                  {classes.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={16} /> No active classrooms detected for your instructor account.
                    </div>
                  ) : (
                    <div className="relative">
                      <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      <select
                        required
                        value={form.class_group_id}
                        onChange={(e) => setForm({ ...form, class_group_id: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-white text-sm font-semibold focus:outline-none focus:border-fuchsia-500/60 appearance-none shadow-inner cursor-pointer transition-colors"
                      >
                        {classes.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#0a0a10] text-white py-2">
                            {c.class_name} {c.course_id ? `(Course ID: ${c.course_id.slice(0, 8)}...)` : ""}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs">
                        ▼
                      </div>
                    </div>
                  )}
                  {selectedClass && (
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1.5 pl-1">
                      <GraduationCap size={13} className="text-fuchsia-400" />
                      Assigned to cohort: <span className="text-neutral-300 font-medium">{selectedClass.class_name}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 2: TASK SPECIFICATIONS */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <ClipboardEdit size={16} /> 2. Task Specifications
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {form.title.length}/120
                  </span>
                </div>

                {/* Assignment Title */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                    Assignment Title *
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={120}
                    placeholder="e.g. Project Phase 2: Autonomous Neural Pipeline"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-semibold placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner transition-colors"
                  />
                </div>

                {/* Submission Format Selector */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                    Expected Submission Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {submissionTypes.map((st) => {
                      const Icon = st.icon;
                      const isSelected = form.submission_type === st.label;
                      return (
                        <button
                          key={st.label}
                          type="button"
                          onClick={() => setForm({ ...form, submission_type: st.label })}
                          className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                            isSelected
                              ? "bg-fuchsia-500/10 border-fuchsia-500/40 text-white shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                              : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                          }`}
                        >
                          <Icon size={16} className={isSelected ? "text-fuchsia-400" : "text-neutral-500"} />
                          <span className="text-xs font-semibold">{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Task Instructions / Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Instructions & Deliverables
                    </label>
                    {/* Quick Insert Snippet Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleTemplateInsert("objective")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        + Objective
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTemplateInsert("guidelines")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        + Guidelines
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTemplateInsert("rubric")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        + Rubric
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <AlignLeft size={16} className="absolute left-4 top-4 text-neutral-500 pointer-events-none" />
                    <textarea
                      rows={6}
                      placeholder="Outline detailed instructions, learning goals, submission requirements, and technical constraints..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 resize-none shadow-inner custom-scrollbar transition-colors leading-relaxed font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: ASSESSMENT PARAMETERS */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <CalendarDays size={16} /> 3. Assessment Parameters
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono">Deadlines & Scoring</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Deadline Input with Quick Presets */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                        Submission Deadline
                      </label>
                      {form.deadline && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, deadline: "" })}
                          className="text-[10px] font-mono text-red-400 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      <input
                        type="datetime-local"
                        value={form.deadline}
                        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/60 [color-scheme:dark] shadow-inner transition-colors"
                      />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(24)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        +24h
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(72)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        +3 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(168)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        +1 Week
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDeadline(336)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        +2 Weeks
                      </button>
                    </div>

                    {deadlineCountdown && (
                      <p className={`text-[11px] font-mono flex items-center gap-1.5 ${deadlineCountdown.isPast ? "text-red-400 font-bold" : "text-purple-400"}`}>
                        <Clock size={12} /> {deadlineCountdown.label}
                      </p>
                    )}
                  </div>

                  {/* Maximum Score Input with Score Presets */}
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Maximum Points
                    </label>
                    <div className="relative">
                      <Star size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none fill-amber-500/20" />
                      <input
                        required
                        type="number"
                        min="1"
                        max="10000"
                        value={form.max_score}
                        onChange={(e) => setForm({ ...form, max_score: Math.max(1, Number(e.target.value)) })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-16 py-4 text-amber-400 text-lg font-black focus:outline-none focus:border-amber-500/60 shadow-inner font-mono transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500 uppercase">
                        Pts
                      </span>
                    </div>

                    {/* Quick Score Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {[25, 50, 100, 150, 200].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setForm({ ...form, max_score: score })}
                          className={`px-3 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                            form.max_score === score
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                              : "bg-white/5 text-neutral-400 border-white/5 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {score} pts
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset all form fields to default?")) {
                      setForm({
                        class_group_id: classes[0]?.id || "",
                        title: "",
                        description: "",
                        deadline: "",
                        max_score: 100,
                        submission_type: "Any Document or Link",
                      });
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40"
                >
                  <RotateCcw size={15} /> Reset
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || classes.length === 0}
                  className="w-full sm:flex-1 py-4.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_15px_35px_rgba(217,70,239,0.25)] disabled:opacity-40 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Deploying Task to Classroom...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Publish & Deploy Assignment</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: LIVE INTERACTIVE STUDENT PREVIEW (4-5 Cols on LG) */}
          <div className={`lg:col-span-5 xl:col-span-4 space-y-6 ${activeTab === "form" ? "hidden lg:block" : "block"}`}>
            
            {/* Live Student Preview Card */}
            <div className="bg-[#0a0a10]/90 border border-white/10 rounded-[2.5rem] p-6 sm:p-7 backdrop-blur-3xl shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    Live Student Card Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                  Interactive
                </span>
              </div>

              {/* Simulated Card as seen by students */}
              <div className="bg-[#050508] border border-fuchsia-500/20 rounded-[2rem] p-6 shadow-xl relative overflow-hidden space-y-5">
                
                {/* Score Pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                    {selectedClass?.class_name || "Target Classroom"}
                  </span>
                  <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Star size={12} className="fill-amber-400" />
                    Max: {form.max_score} Pts
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-black text-white leading-snug line-clamp-2">
                    {form.title.trim() || "Untitled Academic Task"}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/5">
                      {form.submission_type}
                    </span>
                  </div>
                </div>

                {/* Description snippet */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4 font-normal">
                    {form.description.trim() || "Task description and deliverables instructions will appear here for the students..."}
                  </p>
                </div>

                {/* Deadlines & CTA preview */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Calendar size={13} className="text-fuchsia-400" /> Deadline:
                    </span>
                    <span className="text-neutral-300 font-semibold">
                      {form.deadline ? new Date(form.deadline).toLocaleString() : "No Deadline"}
                    </span>
                  </div>

                  {deadlineCountdown && (
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs">
                      <span className="text-purple-300 text-[11px] font-medium flex items-center gap-1.5">
                        <Clock size={13} /> Status:
                      </span>
                      <span className={`font-mono text-xs font-bold ${deadlineCountdown.isPast ? "text-red-400" : "text-emerald-400"}`}>
                        {deadlineCountdown.label}
                      </span>
                    </div>
                  )}

                  {/* Mock Student Submission Button */}
                  <div className="pt-1">
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-neutral-500 text-xs font-black uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Sparkles size={14} /> Submit Work (Student Action)
                    </button>
                    <p className="text-[10px] text-neutral-600 text-center mt-2 font-mono">
                      Mockup preview of the student submission terminal
                    </p>
                  </div>
                </div>

              </div>

              {/* Helpful Tips Card */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-fuchsia-400 uppercase tracking-wider">
                  <Info size={14} /> Instructor Advisory
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                  Once published, students enrolled in <strong className="text-neutral-200">{selectedClass?.class_name || "this classroom"}</strong> will receive instantaneous notifications and can begin submitting their work through their portal.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}