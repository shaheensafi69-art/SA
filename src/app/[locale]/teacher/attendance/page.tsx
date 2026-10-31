"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Save,
  Users,
  Search,
  Filter,
  Check,
  AlertCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface ClassGroup {
  id: string;
  class_name: string;
  class_time: string | null;
  class_days: string | null;
}

interface StudentItem {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
  status: "present" | "late" | "absent";
  note: string;
}

interface HistoricalLog {
  id: string;
  session_date: string;
  status: string;
  notes: string | null;
  student: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  } | null;
}

export default function TeacherAttendancePage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [sessionDate, setSessionDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [sessionTopic, setSessionTopic] = useState("");
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"mark" | "history">("mark");
  const [historyLogs, setHistoryLogs] = useState<HistoricalLog[]>([]);

  // 1. Load teacher classes
  useEffect(() => {
    let isMounted = true;

    async function loadClasses() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const { data, error } = await supabase
          .from("class_groups")
          .select("id, class_name, class_time, class_days")
          .eq("teacher_id", user.id)
          .order("class_name", { ascending: true });

        if (!isMounted) return;

        if (data && data.length > 0) {
          setClasses(data);
          setSelectedClassId(data[0].id);
        }
      } catch (err) {
        console.error("Error loading teacher classes:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadClasses();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // 2. Load students & existing attendance logs for selected class & date
  useEffect(() => {
    if (!selectedClassId) return;

    let isMounted = true;

    async function loadClassStudents() {
      try {
        setIsLoadingStudents(true);
        const supabase = createClient();

        // Fetch enrolled students
        const { data: enrolledData, error: enrollError } = await supabase
          .from("class_students")
          .select(`
            student_id,
            profiles (
              id,
              first_name,
              last_name,
              email,
              avatar_url
            )
          `)
          .eq("class_group_id", selectedClassId);

        if (enrollError) throw enrollError;

        // Fetch existing attendance logs for this class & date
        const { data: existingLogs } = await supabase
          .from("attendance_logs")
          .select("student_id, status, notes")
          .eq("class_group_id", selectedClassId)
          .eq("session_date", sessionDate);

        const logsMap = new Map<string, { status: "present" | "late" | "absent"; notes: string }>();
        (existingLogs || []).forEach((log: any) => {
          logsMap.set(log.student_id, {
            status: (log.status || "present").toLowerCase() as any,
            notes: log.notes || ""
          });
        });

        if (!isMounted) return;

        const studentList: StudentItem[] = [];
        (enrolledData || []).forEach((item: any) => {
          const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
          if (profile) {
            const existing = logsMap.get(profile.id);
            studentList.push({
              id: profile.id,
              first_name: profile.first_name || "Scholar",
              last_name: profile.last_name || "",
              email: profile.email || "",
              avatar_url: profile.avatar_url,
              status: existing ? existing.status : "present",
              note: existing ? existing.notes : ""
            });
          }
        });

        setStudents(studentList);

        // Also fetch history logs if viewing history
        if (viewMode === "history") {
          const { data: historyData } = await supabase
            .from("attendance_logs")
            .select(`
              id,
              session_date,
              status,
              notes,
              profiles (
                first_name,
                last_name,
                avatar_url
              )
            `)
            .eq("class_group_id", selectedClassId)
            .order("session_date", { ascending: false })
            .limit(50);

          if (historyData) {
            setHistoryLogs(
              historyData.map((h: any) => ({
                id: h.id,
                session_date: h.session_date,
                status: h.status,
                notes: h.notes,
                student: Array.isArray(h.profiles) ? h.profiles[0] : h.profiles
              }))
            );
          }
        }
      } catch (err) {
        console.error("Error loading class students:", err);
      } finally {
        if (isMounted) setIsLoadingStudents(false);
      }
    }

    loadClassStudents();

    return () => {
      isMounted = false;
    };
  }, [selectedClassId, sessionDate, viewMode]);

  // Set single student status
  const handleSetStatus = (studentId: string, status: "present" | "late" | "absent") => {
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, status } : s))
    );
  };

  // Set single student note
  const handleSetNote = (studentId: string, note: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, note } : s))
    );
  };

  // Mark all as present
  const handleMarkAll = (status: "present" | "late" | "absent") => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  // Save all attendance
  const handleSaveAttendance = async () => {
    if (!selectedClassId || students.length === 0) return;

    try {
      setIsSaving(true);
      const supabase = createClient();

      const recordsToUpsert = students.map(s => ({
        class_group_id: selectedClassId,
        student_id: s.id,
        session_date: sessionDate,
        status: s.status,
        notes: s.note ? s.note.trim() : (sessionTopic ? sessionTopic.trim() : null)
      }));

      const { error } = await supabase
        .from("attendance_logs")
        .upsert(recordsToUpsert, {
          onConflict: "class_group_id,student_id,session_date"
        });

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert(isRtl ? "خطا در ثبت حضور و غیاب" : "Failed to save attendance logs.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const presentCount = students.filter(s => s.status === "present").length;
  const lateCount = students.filter(s => s.status === "late").length;
  const absentCount = students.filter(s => s.status === "absent").length;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-fuchsia-500 selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-500/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#120a16]/95 via-[#0c0610]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                <CalendarCheck size={12} className="text-fuchsia-400" />
                {isRtl ? "مدیریت حضور و غیاب صنف‌های زنده" : "Faculty Live Campus Roll Call"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "ثبت حضور و غیاب و انضباط دانشجویان" : "Attendance & Scholar Roll Call"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "ثبت حضور، تاخیر و غیبت دانشجویان صنف‌های فعال، ارائه بازخورد کلاسی و همگام‌سازی فوری با کارنامه آکادمیک دانشجو."
                  : "Track student arrivals, unexcused absences, and session remarks with automated synchronization to scholar credentials."
                }
              </p>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving || students.length === 0}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(217,70,239,0.3)] cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check size={16} />
                    <span>{isRtl ? "ذخیره شد!" : "Saved Successfully!"}</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>{isSaving ? (isRtl ? "در حال ثبت..." : "Saving...") : (isRtl ? "ثبت نهایی حضور و غیاب" : "Save Attendance Logs")}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Controls Bar: Class selector, date, topic */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Class Selector */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                {isRtl ? "انتخاب صنف" : "Select Class"}
              </label>
              <div className="relative">
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs appearance-none pr-8 cursor-pointer focus:outline-none focus:border-fuchsia-500/50"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#0b0b14]">{c.class_name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Selector */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                {isRtl ? "تاریخ جلسه" : "Session Date"}
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-fuchsia-500/50"
              />
            </div>

            {/* Session Topic Note */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                {isRtl ? "مبحث یا عنوان تدریس جلسه" : "Session Topic / Agenda"}
              </label>
              <input
                type="text"
                value={sessionTopic}
                onChange={(e) => setSessionTopic(e.target.value)}
                placeholder={isRtl ? "مثال: الگوهای هارمونیک و سطوح فیبوناچی..." : "e.g. Price Action & Liquidity Pools..."}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-fuchsia-500/50"
              />
            </div>

          </div>
        </section>

        {/* 2. STATS KPI STRIP */}
        <section className="grid grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "حاضرین" : "Present"}</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400 font-mono">{presentCount}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "تاخیر" : "Late Arrivals"}</span>
              <Clock size={16} className="text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400 font-mono">{lateCount}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "غایبین" : "Absent"}</span>
              <XCircle size={16} className="text-rose-400" />
            </div>
            <span className="text-2xl font-black text-rose-400 font-mono">{absentCount}</span>
          </div>
        </section>

        {/* 3. FAST ACTIONS & SEARCH BAR */}
        <section className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll("present")}
              className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              {isRtl ? "ثبت همه به عنوان حاضر" : "Mark All Present"}
            </button>
            <button
              onClick={() => handleMarkAll("absent")}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-white/10 text-xs font-bold transition-all cursor-pointer"
            >
              {isRtl ? "ثبت همه غایب" : "Mark All Absent"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? "جستجوی دانشجو..." : "Search student..."}
                className={`py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none ${isRtl ? 'pr-8 pl-3' : 'pl-8 pr-3'}`}
              />
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              {students.length} {isRtl ? "دانشجو" : "Scholars"}
            </span>
          </div>
        </section>

        {/* 4. STUDENTS ROLL CALL LIST */}
        {isLoadingStudents ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
            ))}
          </div>
        ) : filteredStudents.length > 0 ? (
          <section className="space-y-3">
            {filteredStudents.map((student) => {
              const isPresent = student.status === "present";
              const isLate = student.status === "late";
              const isAbsent = student.status === "absent";

              return (
                <div
                  key={student.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Student Info */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-fuchsia-400">
                      {student.avatar_url ? (
                        <img src={student.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        student.first_name.charAt(0)
                      )}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {student.first_name} {student.last_name}
                      </h4>
                      <p className="text-[10px] text-neutral-500 truncate">{student.email}</p>
                    </div>
                  </div>

                  {/* Status Toggle & Note Input */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                    
                    {/* Note input */}
                    <input
                      type="text"
                      value={student.note}
                      onChange={(e) => handleSetNote(student.id, e.target.value)}
                      placeholder={isRtl ? "یادداشت اختصاصی دانشجو..." : "Scholar remark..."}
                      className="py-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-[11px] placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/50 flex-1 sm:flex-initial sm:w-44"
                    />

                    {/* Status Chips */}
                    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/5">
                      <button
                        type="button"
                        onClick={() => handleSetStatus(student.id, "present")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                          isPresent
                            ? "bg-emerald-500 text-black shadow-md"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {isRtl ? "حاضر" : "Present"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSetStatus(student.id, "late")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                          isLate
                            ? "bg-amber-500 text-black shadow-md"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {isRtl ? "تاخیر" : "Late"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSetStatus(student.id, "absent")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                          isAbsent
                            ? "bg-rose-500 text-white shadow-md"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {isRtl ? "غایب" : "Absent"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-12 text-center space-y-4">
            <Users size={32} className="mx-auto text-neutral-600" />
            <h3 className="text-lg font-black text-white">
              {isRtl ? "دانشجویی در این صنف یافت نشد" : "No Scholars Enrolled in this Class"}
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              {isRtl
                ? "برای شروع، دانشجویان را به این صنف اختصاص دهید یا صنف دیگری را از منوی بالا انتخاب کنید."
                : "Assign students to this class group or choose another active class from the dropdown above."
              }
            </p>
          </section>
        )}

      </div>
    </div>
  );
}
