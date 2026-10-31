"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Video,
  Calendar,
  Clock,
  Link as LinkIcon,
  MessageCircle,
  AlertCircle,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
  GraduationCap,
  CalendarDays,
  ExternalLink,
  RotateCcw,
  Eye,
  Radio,
  Globe,
  Users,
  Compass,
  Zap,
  Info,
  Check
} from "lucide-react";

interface CourseOption {
  id: string;
  title: string;
}

const WEEK_DAYS = [
  { id: "Monday", short: "Mon", fa: "دوشنبه" },
  { id: "Tuesday", short: "Tue", fa: "سه‌شنبه" },
  { id: "Wednesday", short: "Wed", fa: "چهارشنبه" },
  { id: "Thursday", short: "Thu", fa: "پنج‌شنبه" },
  { id: "Friday", short: "Fri", fa: "جمعه" },
  { id: "Saturday", short: "Sat", fa: "شنبه" },
  { id: "Sunday", short: "Sun", fa: "یک‌شنبه" },
];

const TIME_PRESETS = [
  { label: "Morning (09:00 - 11:00)", value: "09:00 - 11:00" },
  { label: "Afternoon (14:00 - 16:00)", value: "14:00 - 16:00" },
  { label: "Evening (18:00 - 20:00)", value: "18:00 - 20:00" },
  { label: "Night (20:00 - 22:00)", value: "20:00 - 22:00" },
];

const COHORT_NAME_PRESETS = [
  "Cohort Alpha - Morning Track",
  "Evening Intensive Cohort",
  "Weekend Specialized Cohort",
  "Advanced Batch 01",
];

export default function CreateClassPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Active view tab for mobile
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  // Form State
  const [form, setForm] = useState({
    course_id: "",
    class_name: "",
    schedule_info: "",
    start_date: "",
    end_date: "",
    meeting_link: "",
    signal_group_link: "",
    class_time: "18:00 - 20:00",
    is_active: true,
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Monday",
    "Wednesday",
    "Friday",
  ]);

  useEffect(() => {
    fetchTeacherCourses();
  }, []);

  const fetchTeacherCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // Check role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const userRole = profile?.role?.toLowerCase();
      const isAdmin = userRole === "admin" || userRole === "super_admin";

      let query = supabase.from("courses").select("id, title").order("created_at", { ascending: false });

      if (!isAdmin) {
        query = query.eq("teacher_id", session.user.id);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (data && data.length > 0) {
        setCourses(data);
        setForm(prev => ({ ...prev, course_id: data[0].id }));
      }
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setErrorMsg("Failed to load your course catalog. Please make sure you have created a course first.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  // Quick Schedule Presets
  const applyDaysPreset = (preset: "mwf" | "tts" | "weekdays" | "weekend" | "all") => {
    if (preset === "mwf") {
      setSelectedDays(["Monday", "Wednesday", "Friday"]);
    } else if (preset === "tts") {
      setSelectedDays(["Tuesday", "Thursday", "Saturday"]);
    } else if (preset === "weekdays") {
      setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    } else if (preset === "weekend") {
      setSelectedDays(["Saturday", "Sunday"]);
    } else if (preset === "all") {
      setSelectedDays(WEEK_DAYS.map(w => w.id));
    }
  };

  // Quick Duration Calculation
  const setDurationWeeks = (weeks: number) => {
    const start = form.start_date ? new Date(form.start_date) : new Date();
    if (!form.start_date) {
      const pad = (n: number) => n.toString().padStart(2, "0");
      const todayFormatted = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
      setForm(prev => ({ ...prev, start_date: todayFormatted }));
    }

    const end = new Date(start);
    end.setDate(end.getDate() + weeks * 7);
    const pad = (n: number) => n.toString().padStart(2, "0");
    const endFormatted = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;

    setForm(prev => ({ ...prev, end_date: endFormatted }));
  };

  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === form.course_id);
  }, [courses, form.course_id]);

  // Platform detector for meeting link
  const meetingPlatform = useMemo(() => {
    if (!form.meeting_link) return null;
    const lower = form.meeting_link.toLowerCase();
    if (lower.includes("teams.microsoft.com") || lower.includes("teams.live.com")) return "Microsoft Teams";
    if (lower.includes("meet.google.com")) return "Google Meet";
    if (lower.includes("zoom.us")) return "Zoom Video";
    return "Virtual Classroom";
  }, [form.meeting_link]);

  // Platform detector for community link
  const communityPlatform = useMemo(() => {
    if (!form.signal_group_link) return null;
    const lower = form.signal_group_link.toLowerCase();
    if (lower.includes("signal.group")) return "Signal Community";
    if (lower.includes("t.me") || lower.includes("telegram.me")) return "Telegram Group";
    if (lower.includes("chat.whatsapp.com")) return "WhatsApp Community";
    return "Class Community";
  }, [form.signal_group_link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/${currentLocale}/login`);
      return;
    }

    try {
      if (!form.course_id) throw new Error("Please select a parent course for this classroom cohort.");
      if (!form.class_name.trim()) throw new Error("Classroom cohort title is required.");
      if (selectedDays.length === 0) throw new Error("Please select at least one lecture day from the week.");
      if (!form.class_time.trim()) throw new Error("Please specify the scheduled lecture hours.");

      const daysString = selectedDays.join(", ");

      const { error } = await supabase
        .from("class_groups")
        .insert({
          course_id: form.course_id,
          teacher_id: session.user.id,
          class_name: form.class_name.trim(),
          schedule_info: form.schedule_info.trim(),
          start_date: form.start_date || null,
          end_date: form.end_date || null,
          meeting_link: form.meeting_link.trim() || null,
          signal_group_link: form.signal_group_link.trim() || null,
          class_time: form.class_time.trim(),
          class_days: daysString,
          is_active: form.is_active,
        });

      if (error) throw error;

      setSuccessMsg("Classroom cohort initialized successfully!");
      setTimeout(() => {
        router.push(`/${currentLocale}/teacher/courses`);
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize classroom cohort.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Cohort Initialization Terminal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href={`/${currentLocale}/teacher/courses`}
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white flex items-center justify-center transition-all shrink-0 active:scale-95"
              title="Return to Courses Hub"
            >
              <ArrowLeft size={20} className={isRtl ? "rotate-180" : ""} />
            </Link>

            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                  Classroom Cohort Architect
                </span>
                <span className="text-neutral-600 text-xs font-mono">•</span>
                <span className="text-neutral-400 text-xs font-medium">
                  {courses.length} Available Parent Course{courses.length === 1 ? "" : "s"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Initialize Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Classroom Cohort</span>
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
              <Video size={14} /> Cohort Setup
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "preview" ? "bg-fuchsia-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Eye size={14} /> Student Card View
            </button>
          </div>

        </header>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3.5 text-red-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Initialization Alert</p>
              <p className="text-xs text-red-400/90 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3.5 text-emerald-400 text-sm font-semibold animate-[fadeInDown_0.3s_ease-out]">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Cohort Deployed</p>
              <p className="text-xs text-emerald-400/90 mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM CONSOLE (7-8 COLS) */}
          <div className={`lg:col-span-7 xl:col-span-8 space-y-6 ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
            
            <form onSubmit={handleSubmit} className="bg-[#0a0a10]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
              
              {/* SECTION 1: IDENTITY & TRACK */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={16} /> 1. Academic Track & Cohort Identity
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono">Core Specification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Parent Course Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Parent Course Track *
                    </label>
                    <div className="relative">
                      <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      {courses.length === 0 ? (
                        <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-4 text-red-400 text-xs font-bold pl-12">
                          No parent courses found. Create a course first.
                        </div>
                      ) : (
                        <select
                          required
                          value={form.course_id}
                          onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-white text-sm font-semibold focus:outline-none focus:border-fuchsia-500/60 appearance-none shadow-inner cursor-pointer"
                        >
                          {courses.map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#0a0a10] text-white">
                              {c.title}
                            </option>
                          ))}
                        </select>
                      )}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs">▼</div>
                    </div>
                  </div>

                  {/* Classroom Cohort Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Classroom Cohort Name *
                    </label>
                    <div className="relative">
                      <Video size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Batch 01 - Evening Cohort"
                        value={form.class_name}
                        onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm font-semibold placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                      />
                    </div>
                  </div>

                </div>

                {/* Quick Name Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-neutral-500 font-mono">Quick Names:</span>
                  {COHORT_NAME_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setForm({ ...form, class_name: preset })}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 2: SCHEDULE & TIMINGS */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <CalendarDays size={16} /> 2. Schedule Engine & Lecture Timings
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {selectedDays.length} Days Selected
                  </span>
                </div>

                {/* Day Selector with Quick Presets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Lecture Days *
                    </label>

                    {/* Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => applyDaysPreset("mwf")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        Mon-Wed-Fri
                      </button>
                      <button
                        type="button"
                        onClick={() => applyDaysPreset("tts")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        Tue-Thu-Sat
                      </button>
                      <button
                        type="button"
                        onClick={() => applyDaysPreset("weekdays")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        Daily (Mon-Fri)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyDaysPreset("weekend")}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-300 border border-white/5 transition-colors"
                      >
                        Weekend
                      </button>
                    </div>
                  </div>

                  {/* Day Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {WEEK_DAYS.map((day) => {
                      const isSelected = selectedDays.includes(day.id);

                      return (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => toggleDay(day.id)}
                          className={`p-3 rounded-2xl border text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? "bg-fuchsia-600/20 border-fuchsia-500/50 text-white shadow-[0_0_15px_rgba(217,70,239,0.2)] font-black"
                              : "bg-black/40 border-white/5 text-neutral-400 hover:text-neutral-200 hover:border-white/10"
                          }`}
                        >
                          <span className="text-xs uppercase font-bold">{day.short}</span>
                          <span className="text-[10px] font-mono text-neutral-500">{day.fa}</span>
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-0.5"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Class Time Slot & Presets */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Scheduled Lecture Hours *
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">Local Time</span>
                  </div>

                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. 18:00 - 20:00"
                      value={form.class_time}
                      onChange={(e) => setForm({ ...form, class_time: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm font-mono font-bold focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                    />
                  </div>

                  {/* Time Presets */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {TIME_PRESETS.map((tp) => (
                      <button
                        key={tp.value}
                        type="button"
                        onClick={() => setForm({ ...form, class_time: tp.value })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          form.class_time === tp.value
                            ? "bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-300 font-bold"
                            : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <p className="text-[10px] font-mono uppercase">{tp.label.split(" (")[0]}</p>
                        <p className="text-xs font-mono font-bold text-white mt-0.5">{tp.value}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Date Range & Duration Shortcuts */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                      Cohort Calendar Lifecycle
                    </label>

                    {/* Quick Duration Setters */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-neutral-500">Duration:</span>
                      {[4, 8, 12, 16].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setDurationWeeks(w)}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5 transition-colors"
                        >
                          +{w}w
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Commencement Date</span>
                      <input
                        type="date"
                        value={form.start_date}
                        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/60 [color-scheme:dark] shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Conclusion Date</span>
                      <input
                        type="date"
                        value={form.end_date}
                        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/60 [color-scheme:dark] shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Summary note */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                    Curriculum & Schedule Summary (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24 Live Sessions + 4 Practical Workshops with Weekly Q&A"
                    value={form.schedule_info}
                    onChange={(e) => setForm({ ...form, schedule_info: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                  />
                </div>

              </div>

              {/* SECTION 3: CONNECTIVITY & STATUS */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                    <LinkIcon size={16} /> 3. Broadcast Hub & Community Connectivity
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-mono">Virtual Links</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Live Meeting Link */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                        Live Lecture Meeting Link
                      </label>
                      {meetingPlatform && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          {meetingPlatform} Detected
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Video size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      <input
                        type="url"
                        placeholder="https://teams.microsoft.com/l/meetup-join/..."
                        value={form.meeting_link}
                        onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-xs sm:text-sm font-mono placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Signal / Community Support Link */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-neutral-300 uppercase tracking-wider block">
                        Cohort Signal / Support Group
                      </label>
                      {communityPlatform && (
                        <span className="text-[10px] font-mono text-purple-400">
                          {communityPlatform} Detected
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <MessageCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      <input
                        type="url"
                        placeholder="https://signal.group/#CjQK..."
                        value={form.signal_group_link}
                        onChange={(e) => setForm({ ...form, signal_group_link: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-xs sm:text-sm font-mono placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner"
                      />
                    </div>
                  </div>

                </div>

                {/* Cohort Live Switch */}
                <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl mt-4">
                  <div>
                    <p className="font-bold text-white text-sm">
                      Publish Cohort to Enrolled Students
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-normal">
                      When enabled, students enrolled in this course can immediately view schedule timings and launch meeting links.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
                      form.is_active ? "bg-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.3)]" : "bg-neutral-800 border border-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        form.is_active ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset cohort configuration fields?")) {
                      setForm({
                        course_id: courses[0]?.id || "",
                        class_name: "",
                        schedule_info: "",
                        start_date: "",
                        end_date: "",
                        meeting_link: "",
                        signal_group_link: "",
                        class_time: "18:00 - 20:00",
                        is_active: true,
                      });
                      setSelectedDays(["Monday", "Wednesday", "Friday"]);
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40"
                >
                  <RotateCcw size={15} /> Reset
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || courses.length === 0}
                  className="w-full sm:flex-1 py-4.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_15px_35px_rgba(217,70,239,0.3)] disabled:opacity-40 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Initializing Classroom Cohort...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Deploy Live Classroom Cohort</span>
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

          {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW CARD (4-5 COLS) */}
          <div className={`lg:col-span-5 xl:col-span-4 space-y-6 ${activeTab === "form" ? "hidden lg:block" : "block"}`}>
            
            <div className="bg-[#0a0a10]/90 border border-white/10 rounded-[2.5rem] p-6 sm:p-7 backdrop-blur-3xl shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    Student Classroom Card View
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                  Interactive Preview
                </span>
              </div>

              {/* Simulated Classroom Card */}
              <div className="bg-[#050508] border border-fuchsia-500/25 rounded-[2rem] p-6 shadow-xl space-y-5 relative overflow-hidden">
                
                {/* Glow hint */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* Top: Course Track & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider truncate max-w-[200px]">
                    {selectedCourse?.title || "Parent Course Track"}
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                    form.is_active
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-white/5 text-neutral-400 border-white/5"
                  }`}>
                    {form.is_active ? "Active Cohort" : "Scheduled Draft"}
                  </span>
                </div>

                {/* Cohort Title */}
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {form.class_name.trim() || "Untitled Classroom Cohort"}
                  </h3>
                  {form.schedule_info && (
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-normal">
                      {form.schedule_info}
                    </p>
                  )}
                </div>

                {/* Schedule Specifications */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  
                  {/* Days */}
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-500 font-mono uppercase">Lecture Days</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDays.length === 0 ? (
                        <span className="text-xs text-neutral-500 italic">No days selected</span>
                      ) : (
                        selectedDays.map((d) => (
                          <span
                            key={d}
                            className="px-2 py-0.5 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-[10px] font-mono font-bold"
                          >
                            {d.substring(0, 3)}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Timing & Calendar */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Lecture Hours</p>
                      <p className="text-xs font-mono font-bold text-white flex items-center gap-1 mt-0.5">
                        <Clock size={12} className="text-fuchsia-400" />
                        <span>{form.class_time || "Not Set"}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Duration</p>
                      <p className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-purple-400" />
                        <span>{form.start_date ? new Date(form.start_date).toLocaleDateString() : "TBD"}</span>
                      </p>
                    </div>
                  </div>

                </div>

                {/* Broadcast & Community Action Preview */}
                <div className="space-y-2.5 pt-1">
                  
                  {/* Meeting button */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/30 text-white text-xs font-bold shadow-md">
                    <div className="flex items-center gap-2.5">
                      <Video size={16} className="text-fuchsia-400" />
                      <span>Join Live Lecture</span>
                    </div>
                    <span className="text-[10px] font-mono text-fuchsia-300">
                      {meetingPlatform || "Virtual Room"}
                    </span>
                  </div>

                  {/* Community button */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 text-neutral-300 text-xs font-bold">
                    <div className="flex items-center gap-2.5">
                      <MessageCircle size={16} className="text-purple-400" />
                      <span>Signal Support Hub</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {communityPlatform || "Community"}
                    </span>
                  </div>

                </div>

                <p className="text-[10px] text-neutral-600 text-center font-mono pt-1">
                  Mockup of student classroom hub card
                </p>

              </div>

              {/* Advisory note */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-fuchsia-400 uppercase tracking-wider">
                  <Info size={14} /> Faculty Instruction
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                  Classrooms allow you to segment students into targeted live cohorts, record daily attendance, broadcast Teams links, and distribute cohort-specific assignments and exams.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}