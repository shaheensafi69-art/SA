"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  BookOpen,
  Filter,
  Sparkles,
  ChevronDown,
  Info,
  ShieldCheck
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  session_date: string;
  status: "present" | "absent" | "late" | "excused" | string;
  notes: string | null;
  class_groups: {
    id: string;
    class_name: string;
  } | null;
}

interface ClassGroupOption {
  id: string;
  class_name: string;
}

export default function StudentAttendancePage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [classGroups, setClassGroups] = useState<ClassGroupOption[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    let isMounted = true;

    async function loadAttendanceData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const [attendanceRes, enrollmentsRes] = await Promise.all([
          supabase
            .from("attendance_logs")
            .select(`
              id,
              session_date,
              status,
              notes,
              class_groups (
                id,
                class_name
              )
            `)
            .eq("student_id", user.id)
            .order("session_date", { ascending: false }),
          supabase
            .from("class_students")
            .select(`
              class_groups (
                id,
                class_name
              )
            `)
            .eq("student_id", user.id)
        ]);

        if (!isMounted) return;

        // Process attendance records
        const formattedRecords: AttendanceRecord[] = (attendanceRes.data || []).map((r: any) => ({
          id: r.id,
          session_date: r.session_date,
          status: (r.status || "present").toLowerCase(),
          notes: r.notes,
          class_groups: Array.isArray(r.class_groups) ? r.class_groups[0] : r.class_groups,
        }));
        setRecords(formattedRecords);

        // Process available classes
        const groupOptions: ClassGroupOption[] = [];
        (enrollmentsRes.data || []).forEach((e: any) => {
          const cg = Array.isArray(e.class_groups) ? e.class_groups[0] : e.class_groups;
          if (cg && !groupOptions.some(g => g.id === cg.id)) {
            groupOptions.push({ id: cg.id, class_name: cg.class_name });
          }
        });
        setClassGroups(groupOptions);

      } catch (err) {
        console.error("Error loading attendance records:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAttendanceData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Filtering records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchClass = selectedClassId === "all" || r.class_groups?.id === selectedClassId;
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchClass && matchStatus;
    });
  }, [records, selectedClassId, statusFilter]);

  // Calculations
  const totalSessions = records.length;
  const presentCount = records.filter(r => r.status === "present").length;
  const lateCount = records.filter(r => r.status === "late").length;
  const absentCount = records.filter(r => r.status === "absent").length;
  const excusedCount = records.filter(r => r.status === "excused").length;

  const attendanceRate = totalSessions > 0
    ? Math.round(((presentCount + (lateCount * 0.75) + excusedCount) / totalSessions) * 100)
    : 100;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#0a1215]/95 via-[#070b0e]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={12} className="text-emerald-400" />
                {isRtl ? "سیستم ثبت هوشمند حضور و غیاب" : "Automated Class Attendance System"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "کارنامه حضور و غیاب جلسات" : "Class Attendance & Sessions"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "بررسی وضعیت حضور شما در جلسات زنده آنلاین صنف‌ها، تاخیرها، غیبت‌ها و یادداشت‌های ثبت‌شده توسط استاد دوره."
                  : "Track your real-time live session attendance, punctual arrival rate, excused leaves, and instructor session logs."
                }
              </p>
            </div>

            {/* Attendance Percentage Dial */}
            <div className="px-6 py-5 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center gap-5 shadow-lg">
              <div className="text-center">
                <span className={`text-4xl font-black font-mono tracking-tight block ${attendanceRate >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {attendanceRate}%
                </span>
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 mt-1 block">
                  {isRtl ? "شاخص انضباط کلاسی" : "Attendance Rate"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS KPI STRIP */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "جلسات حاضر" : "Present Sessions"}</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400 font-mono">{presentCount}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "ورود با تاخیر" : "Late Arrivals"}</span>
              <Clock size={16} className="text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400 font-mono">{lateCount}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "غیبت‌ها" : "Absences"}</span>
              <XCircle size={16} className="text-rose-400" />
            </div>
            <span className="text-2xl font-black text-rose-400 font-mono">{absentCount}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "مرخصی موجه" : "Excused"}</span>
              <AlertTriangle size={16} className="text-blue-400" />
            </div>
            <span className="text-2xl font-black text-blue-400 font-mono">{excusedCount}</span>
          </div>
        </section>

        {/* 3. FILTERS & SEARCH */}
        <section className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Class Filter */}
            {classGroups.length > 0 && (
              <div className="relative">
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white appearance-none pr-8 cursor-pointer focus:outline-none"
                >
                  <option value="all" className="bg-[#0b0b14]">{isRtl ? "همه صنف‌ها" : "All Classes"}</option>
                  {classGroups.map(cg => (
                    <option key={cg.id} value={cg.id} className="bg-[#0b0b14]">{cg.class_name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 right-2.5 text-neutral-400 pointer-events-none" />
              </div>
            )}

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "all" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "همه" : "All"}
              </button>
              <button
                onClick={() => setStatusFilter("present")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "present" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "حاضر" : "Present"}
              </button>
              <button
                onClick={() => setStatusFilter("late")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "late" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "تاخیر" : "Late"}
              </button>
              <button
                onClick={() => setStatusFilter("absent")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "absent" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "غایب" : "Absent"}
              </button>
            </div>
          </div>

          <span className="text-xs text-neutral-500 font-mono">
            {isRtl ? `${filteredRecords.length} رکورد ثبت‌شده` : `${filteredRecords.length} logs found`}
          </span>
        </section>

        {/* 4. ATTENDANCE LOGS LIST */}
        {filteredRecords.length > 0 ? (
          <section className="space-y-3">
            {filteredRecords.map((item) => {
              const isPresent = item.status === "present";
              const isLate = item.status === "late";
              const isAbsent = item.status === "absent";
              const isExcused = item.status === "excused";

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      isPresent ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      isLate ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      isAbsent ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {isPresent && <CheckCircle2 size={20} />}
                      {isLate && <Clock size={20} />}
                      {isAbsent && <XCircle size={20} />}
                      {isExcused && <AlertTriangle size={20} />}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {item.class_groups?.class_name || (isRtl ? "صنف آکادمی" : "Academy Class")}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Calendar size={12} className="text-neutral-500" />
                        <span>{new Date(item.session_date).toLocaleDateString()}</span>
                        {item.notes && (
                          <span className="text-neutral-500">| {item.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg shrink-0 ${
                    isPresent ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    isLate ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                    isAbsent ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                    'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  }`}>
                    {isPresent ? (isRtl ? "حاضر" : "Present") :
                     isLate ? (isRtl ? "ورود با تاخیر" : "Late") :
                     isAbsent ? (isRtl ? "غایب" : "Absent") :
                     (isRtl ? "موجه" : "Excused")}
                  </span>
                </div>
              );
            })}
          </section>
        ) : (
          <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CalendarCheck size={32} />
            </div>
            <h3 className="text-lg font-black text-white">
              {isRtl ? "رکوردی برای نمایش وجود ندارد" : "No Attendance Records Logged Yet"}
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              {isRtl
                ? "حضور شما در جلسات زنده آنلاین توسط سیستم به شکل خودکار ثبت می‌شود. پس از برگزاری جلسات بعدی، لاگ‌های تفصیلی در این بخش نمایش داده خواهد شد."
                : "Live meeting attendance is automatically synchronized after each live campus class concludes."
              }
            </p>
            <Link
              href={`/${currentLocale}/student/live-classes`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              <Clock size={16} />
              {isRtl ? "مشاهده برنامه کلاس‌های زنده" : "View Live Campus Schedule"}
            </Link>
          </section>
        )}

        {/* 5. ACADEMIC POLICY ALERT */}
        <section className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
          <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 space-y-1">
            <p className="font-bold text-amber-400">
              {isRtl ? "قوانین انضباطی و صدور مدرک:" : "Attendance Policy & Credential Requirements:"}
            </p>
            <p className="text-neutral-400 leading-relaxed">
              {isRtl
                ? "حداقل میزان حضور موجه در جلسات برای دریافت گواهینامه معتبر پایان‌دوره ۸۰٪ است. در صورت نیاز به مرخصی، قبل از شروع جلسه تیکت پشتیبانی ثبت نمایید."
                : "A minimum of 80% attendance is strictly required to qualify for graduation and certificate issuance. Please submit an excused leave ticket in advance."
              }
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
