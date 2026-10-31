"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  Video,
  MessageCircle,
  Clock,
  Calendar,
  Users,
  Loader2,
  ArrowLeft,
  ExternalLink,
  User,
  ShieldCheck,
  Layers,
  BadgeAlert,
  Settings,
  GraduationCap,
  FileText,
  FolderArchive,
  Power,
  Copy,
  Check,
  Radio,
  Sparkles,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react";

type LiveClassDetails = {
  id: string;
  class_name: string;
  class_days: string | null;
  class_time: string | null;
  schedule_info: string | null;
  start_date: string | null;
  end_date: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  is_active: boolean;
  student_count: number;

  // Course & Instructor data
  course_id: string | null;
  course_title: string;
  instructor_name: string | null;
  instructor_bio: string | null;
  instructor_image_url: string | null;
  instructor_2_name: string | null;
  instructor_2_bio: string | null;
  instructor_2_image_url: string | null;
};

export default function LiveClassDetailsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();

  const classId = params?.classId as string;

  const [classDetails, setClassDetails] = useState<LiveClassDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Copy feedbacks
  const [copiedLink, setCopiedLink] = useState<"meeting" | "signal" | null>(null);

  useEffect(() => {
    if (!classId) return;

    let isMounted = true;

    const fetchClassDetails = async () => {
      setIsLoading(true);
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("class_groups")
          .select(`
            id,
            class_name,
            class_days,
            class_time,
            schedule_info,
            start_date,
            end_date,
            meeting_link,
            signal_group_link,
            is_active,
            course_id,
            class_students(student_id),
            courses(
              id,
              title,
              instructor_name,
              instructor_bio,
              instructor_image_url,
              instructor_2_name,
              instructor_2_bio,
              instructor_2_image_url
            )
          `)
          .eq("id", classId)
          .maybeSingle();

        if (error) throw error;

        if (data && isMounted) {
          const courseData = Array.isArray(data.courses) ? data.courses[0] : data.courses;

          setClassDetails({
            id: data.id,
            class_name: data.class_name,
            class_days: data.class_days || (isRtl ? "تعیین نشده" : "Not Set"),
            class_time: data.class_time || (isRtl ? "تعیین نشده" : "Not Set"),
            schedule_info: data.schedule_info || null,
            start_date: data.start_date || null,
            end_date: data.end_date || null,
            meeting_link: data.meeting_link,
            signal_group_link: data.signal_group_link,
            is_active: data.is_active ?? true,
            student_count: data.class_students ? data.class_students.length : 0,

            course_id: data.course_id || null,
            course_title: courseData?.title || (isRtl ? "دوره آموزشی صنف" : "Academy Masterclass"),
            instructor_name: courseData?.instructor_name || null,
            instructor_bio: courseData?.instructor_bio || null,
            instructor_image_url: courseData?.instructor_image_url || null,
            instructor_2_name: courseData?.instructor_2_name || null,
            instructor_2_bio: courseData?.instructor_2_bio || null,
            instructor_2_image_url: courseData?.instructor_2_image_url || null,
          });
        } else if (!data && isMounted) {
          setClassDetails(null);
        }
      } catch (error) {
        console.error("Error fetching live class hub data:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchClassDetails();

    return () => {
      isMounted = false;
    };
  }, [classId, isRtl]);

  const handleToggleBroadcast = async () => {
    if (!classDetails) return;
    setIsTogglingStatus(true);
    const supabase = createClient();
    const newStatus = !classDetails.is_active;

    try {
      const { error } = await supabase
        .from("class_groups")
        .update({ is_active: newStatus })
        .eq("id", classDetails.id);

      if (error) throw error;

      setClassDetails((prev) => (prev ? { ...prev, is_active: newStatus } : null));
    } catch (err: any) {
      alert("Error toggling broadcast status: " + err.message);
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const copyToClipboard = (text: string, type: "meeting" | "signal") => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.teacherPages?.openingControlRoom || (isRtl ? "در حال بازگشایی اتاق فرمان صنف..." : "Opening Control Room...")}
        </p>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <BadgeAlert size={64} className="text-red-500" />
        <h2 className="text-2xl sm:text-3xl font-black">
          {t.teacherPages?.classNotFound || (isRtl ? "صنف یافت نشد" : "Class Not Found")}
        </h2>
        <p className="text-neutral-500 text-sm max-w-sm text-center">
          {t.teacherPages?.classNotFoundDesc || (isRtl ? "صنف لایو مورد نظر در دیتابیس وجود ندارد یا حذف شده است." : "The live class you are looking for does not exist.")}
        </p>
        <Link
          href={`/${currentLocale}/teacher/live-classes`}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-purple-400 font-bold flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} /> {isRtl ? "بازگشت به مرکز صنف‌های لایو" : "Return to Live Terminal"}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out] relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
        
        {/* ================= MISSION CONTROL HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-40 bg-purple-500/15 blur-[70px] pointer-events-none"></div>

          <Link
            href={`/${currentLocale}/teacher/live-classes`}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-purple-400 transition-colors mb-4 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5 relative z-10"
          >
            <ArrowLeft size={14} />
            <span>{isRtl ? "بازگشت به مرکز صنف‌های آنلاین" : "Live Classes Terminal"}</span>
          </Link>

          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-md inline-flex items-center gap-1.5 shadow-inner">
                  <Layers size={12} />
                  <span>{classDetails.course_title}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
                {classDetails.class_name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
                {t.teacherPages?.controlPanelLiveDesc ||
                  (isRtl
                    ? "مرکز فرماندهی جلسه زنده، اتصال کانال‌های پخش، مدیریت شاگردان و تنظیمات صنف."
                    : "Control panel for managing live broadcast, connectivity links, and scholar operations.")}
              </p>
            </div>

            {/* Live Broadcast Status & Quick Toggle */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                onClick={handleToggleBroadcast}
                disabled={isTogglingStatus}
                className={`px-5 py-3.5 rounded-2xl border text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xl ${
                  classDetails.is_active
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:bg-rose-500/30"
                    : "bg-black/60 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {isTogglingStatus ? (
                  <Loader2 size={14} className="animate-spin text-white" />
                ) : classDetails.is_active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
                ) : (
                  <Power size={14} />
                )}
                <span>
                  {classDetails.is_active
                    ? (isRtl ? "پخش زنده فعال (LIVE NOW)" : "Broadcast Active")
                    : (isRtl ? "در حالت استندبای (Standby)" : "Standby Mode")}
                </span>
              </button>

              <Link
                href={`/${currentLocale}/teacher/live-classes/${classId}/edit`}
                className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <Settings size={15} />
                <span>{isRtl ? "تنظیمات صنف" : "Edit Settings"}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ================= CONNECTIVITY CHANNELS & COHORT SIZE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left/Center (2 Cols): Live Broadcast Links & Schedule */}
          <div className="lg:col-span-2 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3">
                <Radio size={18} className="text-purple-400 animate-pulse" />
                <span>{isRtl ? "کانال‌های ارتباطی و اتصال زنده" : "Connectivity Channels & Stream"}</span>
              </h3>

              {/* Weekly Days & Timings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.weeklySchedule || (isRtl ? "روزهای برگزاری" : "Weekly Schedule")}
                    </p>
                    <p className="text-xs sm:text-sm font-black text-white mt-0.5 truncate">{classDetails.class_days}</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.classTiming || (isRtl ? "ساعت برگزاری جلسه" : "Session Timing")}
                    </p>
                    <p className="text-xs sm:text-sm font-black text-white mt-0.5 truncate">{classDetails.class_time}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Summary note if present */}
              {classDetails.schedule_info && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 leading-relaxed font-medium">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1">
                    {isRtl ? "توضیحات زمان‌بندی:" : "Schedule Brief:"}
                  </span>
                  {classDetails.schedule_info}
                </div>
              )}
            </div>

            {/* Launch Links Terminal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
              
              {/* Meeting Link Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Video size={13} />
                    <span>{isRtl ? "لینک میتینگ زنده" : "Meeting Broadcast"}</span>
                  </span>
                  {classDetails.meeting_link && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(classDetails.meeting_link!, "meeting")}
                      className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                      title="Copy URL"
                    >
                      {copiedLink === "meeting" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>

                {classDetails.meeting_link ? (
                  <a
                    href={classDetails.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.15em] text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                  >
                    <Video size={16} />
                    <span>{t.teacherPages?.launchLiveRoom || (isRtl ? "ورود به اتاق جلسه" : "Launch Meeting")}</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-neutral-500 text-center text-xs font-bold">
                    {isRtl ? "لینک جلسه ثبت نشده است" : "No Meeting Link Set"}
                  </div>
                )}
              </div>

              {/* Signal Group Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400 flex items-center gap-1.5">
                    <MessageCircle size={13} />
                    <span>{isRtl ? "کانال رمزگذاری سیگنال" : "Encrypted Signal Hub"}</span>
                  </span>
                  {classDetails.signal_group_link && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(classDetails.signal_group_link!, "signal")}
                      className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                      title="Copy URL"
                    >
                      {copiedLink === "signal" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>

                {classDetails.signal_group_link ? (
                  <a
                    href={classDetails.signal_group_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-fuchsia-500/30 text-neutral-200 hover:text-white font-black uppercase tracking-[0.15em] text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <MessageCircle size={16} className="text-fuchsia-400" />
                    <span>{t.teacherPages?.openSignalChannel || (isRtl ? "ورود به کانال سیگنال" : "Open Signal Channel")}</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-neutral-500 text-center text-xs font-bold">
                    {isRtl ? "لینک سیگنال ثبت نشده است" : "No Signal Channel Set"}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Col: Cohort Size Counter Card */}
          <div className="bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-white/5 rounded-[2.5rem] p-6 sm:p-8 text-center flex flex-col items-center justify-between relative overflow-hidden shadow-2xl min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none"></div>

            <div className="w-full">
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Users size={32} />
              </div>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
                {t.teacherPages?.totalCohortSize || (isRtl ? "تعداد کل شاگردان صنف" : "Total Cohort Size")}
              </p>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-2 drop-shadow-2xl">
                {classDetails.student_count}
              </h2>
              <p className="text-xs text-neutral-400 font-medium max-w-[220px] mx-auto leading-relaxed">
                {t.teacherPages?.activeEnrolledSpecificDesc ||
                  (isRtl ? "شاگردان فعال که به این گروه اختصاص دارند." : "Scholars registered in this active broadcast.")}
              </p>
            </div>

            <Link
              href={`/${currentLocale}/teacher/courses/${classId}/students`}
              className="w-full mt-6 py-3.5 bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/30 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Users size={15} className="text-fuchsia-400" />
              <span>{isRtl ? "مشاهده کارنامه شاگردان" : "View Cohort Roster"}</span>
            </Link>
          </div>
        </div>

        {/* ================= COMMAND CENTER: 4 QUICK OPERATION HUBS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Hub 1: Manage Roster */}
          <Link
            href={`/${currentLocale}/teacher/courses/${classId}/students`}
            className="bg-[#0a0a0f]/80 border border-white/5 hover:border-purple-500/40 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 group shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white group-hover:text-purple-400 transition-colors">
                {t.teacherPages?.manageRoster || (isRtl ? "مدیریت شاگردان" : "Manage Roster")}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t.teacherPages?.addRemoveScoreStudents ||
                  (isRtl ? "افزودن، امتیازدهی، و بررسی وضعیت اعضا." : "Add, remove, or score scholars.")}
              </p>
            </div>
          </Link>

          {/* Hub 2: Class Settings */}
          <Link
            href={`/${currentLocale}/teacher/live-classes/${classId}/edit`}
            className="bg-[#0a0a0f]/80 border border-white/5 hover:border-fuchsia-500/40 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 group shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Settings size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white group-hover:text-fuchsia-400 transition-colors">
                {t.teacherPages?.classSettings || (isRtl ? "تنظیمات صنف" : "Class Settings")}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t.teacherPages?.updateScheduleLinksDesc ||
                  (isRtl ? "ویرایش زمان‌بندی، پیوندها و وضعیت پخش." : "Update schedule, timings, and stream links.")}
              </p>
            </div>
          </Link>

          {/* Hub 3: Class Attendance */}
          <Link
            href={`/${currentLocale}/teacher/attendance`}
            className="bg-[#0a0a0f]/80 border border-white/5 hover:border-emerald-500/40 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 group shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                {t.teacherPages?.attendance || (isRtl ? "دفتر حضور و غیاب" : "Attendance Journal")}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t.teacherPages?.reviewParticipationLogs ||
                  (isRtl ? "بررسی و ثبت گزارش‌های حضور هر جلسه." : "Review and register daily session logs.")}
              </p>
            </div>
          </Link>

          {/* Hub 4: Assignments */}
          <Link
            href={`/${currentLocale}/teacher/assignments`}
            className="bg-[#0a0a0f]/80 border border-white/5 hover:border-indigo-500/40 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 group shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <FolderArchive size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white group-hover:text-indigo-400 transition-colors">
                {t.teacher?.assignments || (isRtl ? "تکالیف و پروژه‌ها" : "Cohort Tasks")}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {isRtl ? "مشاهده و تصحیح تکالیف ارسال شده." : "Review homework and student submissions."}
              </p>
            </div>
          </Link>

        </div>

        {/* ================= SECTION: FACULTY & INSTRUCTORS ================= */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          <h3 className="text-xl font-black text-white flex items-center gap-2.5">
            <Users size={22} className="text-purple-400" />
            <span>{isRtl ? "هیئت علمی و استادان صنف" : "Assigned Faculty Instructors"}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Instructor 1: Lead Faculty */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-6 sm:p-7 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-purple-500/15 text-purple-300 px-3.5 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck size={11} />
                <span>{isRtl ? "استاد اصلی" : "Lead Faculty"}</span>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 overflow-hidden shadow-xl flex items-center justify-center shrink-0 mt-3 sm:mt-0">
                {classDetails.instructor_image_url ? (
                  <img
                    src={classDetails.instructor_image_url}
                    alt="Lead Faculty"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-neutral-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-black text-white mb-1 truncate">
                  {classDetails.instructor_name || (isRtl ? "استاد ارشد آکادمی" : "Verified Lead Faculty")}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium line-clamp-3">
                  {classDetails.instructor_bio || (isRtl ? "مدرس ارشد تخصصی آکادمی صافی مسئول هدایت این صنف آنلاین." : "Academy Senior Faculty member assigned to broadcast this module live.")}
                </p>
              </div>
            </div>

            {/* Instructor 2: Co-Faculty */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-6 sm:p-7 hover:border-fuchsia-500/30 transition-all flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-fuchsia-500/15 text-fuchsia-300 px-3.5 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <span>{isRtl ? "استاد همکار" : "Co-Instructor"}</span>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 overflow-hidden shadow-xl flex items-center justify-center shrink-0 mt-3 sm:mt-0">
                {classDetails.instructor_2_image_url ? (
                  <img
                    src={classDetails.instructor_2_image_url}
                    alt="Co-Faculty"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-neutral-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-black text-white mb-1 truncate">
                  {classDetails.instructor_2_name || (isRtl ? "همکار تدریس" : "Assistant / Co-Faculty")}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium line-clamp-3">
                  {classDetails.instructor_2_bio || (isRtl ? "استاد همکار مسئول پشتیبانی و مدیریت سرفصل‌های آموزشی این جلسه." : "Assigned co-instructor managing curriculum assets and live operations.")}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}