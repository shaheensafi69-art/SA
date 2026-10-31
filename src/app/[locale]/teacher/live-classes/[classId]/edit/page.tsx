"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
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
  Radio,
  Power,
  CalendarDays,
  FileText
} from "lucide-react";

const WEEK_DAYS = [
  { key: "Monday", labelEn: "Mon", labelFa: "دوشنبه" },
  { key: "Tuesday", labelEn: "Tue", labelFa: "سه‌شنبه" },
  { key: "Wednesday", labelEn: "Wed", labelFa: "چهارشنبه" },
  { key: "Thursday", labelEn: "Thu", labelFa: "پنج‌شنبه" },
  { key: "Friday", labelEn: "Fri", labelFa: "جمعه" },
  { key: "Saturday", labelEn: "Sat", labelFa: "شنبه" },
  { key: "Sunday", labelEn: "Sun", labelFa: "یکشنبه" },
];

const TIME_PRESETS = [
  "18:30 - 20:00",
  "19:00 - 21:00",
  "20:00 - 22:00",
  "16:00 - 18:00",
  "10:00 - 12:00"
];

export default function EditClassSettingsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    class_name: "",
    schedule_info: "",
    start_date: "",
    end_date: "",
    meeting_link: "",
    signal_group_link: "",
    class_time: "",
    is_active: true,
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    if (classId) {
      fetchClassCurrentData();
    }
  }, [classId]);

  const fetchClassCurrentData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("class_groups")
        .select("class_name, schedule_info, start_date, end_date, meeting_link, signal_group_link, class_time, class_days, is_active")
        .eq("id", classId)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          class_name: data.class_name || "",
          schedule_info: data.schedule_info || "",
          start_date: data.start_date || "",
          end_date: data.end_date || "",
          meeting_link: data.meeting_link || "",
          signal_group_link: data.signal_group_link || "",
          class_time: data.class_time || "",
          is_active: data.is_active ?? true,
        });

        if (data.class_days) {
          const daysArray = data.class_days.split(",").map((d) => d.trim());
          setSelectedDays(daysArray);
        }
      }
    } catch (err: any) {
      console.error("Error loading class data:", err);
      setErrorMsg(isRtl ? "خطا در بارگذاری اطلاعات صنف." : "Failed to load class configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (dayKey: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMessage(null);

    const supabase = createClient();

    try {
      if (selectedDays.length === 0) {
        throw new Error(isRtl ? "لطفاً حداقل یک روز هفته را برای صنف انتخاب کنید." : "Please select at least one class day.");
      }

      const daysString = selectedDays.join(", ");

      const { error } = await supabase
        .from("class_groups")
        .update({
          class_name: form.class_name.trim(),
          schedule_info: form.schedule_info.trim(),
          start_date: form.start_date || null,
          end_date: form.end_date || null,
          meeting_link: form.meeting_link.trim() || null,
          signal_group_link: form.signal_group_link.trim() || null,
          class_time: form.class_time.trim(),
          class_days: daysString,
          is_active: form.is_active,
        })
        .eq("id", classId);

      if (error) throw error;

      setSuccessMessage(isRtl ? "تنظیمات صنف با موفقیت ذخیره شد!" : "Class configuration updated successfully!");

      setTimeout(() => {
        router.push(`/${currentLocale}/teacher/live-classes/${classId}`);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || (isRtl ? "خطا در به‌روزرسانی صنف." : "Failed to update class configuration."));
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {isRtl ? "در حال بارگذاری تنظیمات صنف..." : "Loading Class Settings..."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <Link
              href={`/${currentLocale}/teacher/live-classes/${classId}`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-purple-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={14} />
              <span>{isRtl ? "بازگشت به اتاق فرمان صنف" : "Back to Control Room"}</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              {t.teacherPages?.classroomName || (isRtl ? "ویرایش و تنظیمات" : "Classroom")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                {t.teacherPages?.settings || (isRtl ? "صنف آنلاین" : "Settings")}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">
              {t.teacherPages?.modifyLiveSessionDesc ||
                (isRtl
                  ? "ویرایش جدول زمان‌بندی، پیوندهای میتینگ، کانال سیگنال و وضعیت پخش زنده صنف."
                  : "Modify broadcast properties, weekly schedules, connectivity links, and live visibility.")}
            </p>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <p>{successMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
          
          {/* SECTION 1: IDENTITY */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <Video size={18} />
              <span>{isRtl ? "هویت و نام صنف لایو" : "Classroom Identity"}</span>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                {t.teacherPages?.classroomName || (isRtl ? "نام صنف" : "Classroom Name")} *
              </label>
              <input
                required
                type="text"
                placeholder={
                  t.teacherPages?.classroomNamePlaceholder ||
                  (isRtl ? "مثال: صنف زنده ترید و تحلیل تکنیکال (گروه ۰۱)" : "e.g. VIP Live Trading Room - Cohort A")
                }
                value={form.class_name}
                onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner font-medium"
              />
            </div>
          </div>

          {/* SECTION 2: SCHEDULE & TIMING */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-2">
              <Calendar size={18} />
              <span>{isRtl ? "تقویم و زمان‌بندی جلسات" : "Schedule & Timings"}</span>
            </h3>

            {/* Day Selector Pills */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                {t.teacherPages?.classDays || (isRtl ? "روزهای برگزاری جلسات" : "Weekly Days")} *
              </label>
              <div className="flex flex-wrap gap-2">
                {WEEK_DAYS.map((day) => {
                  const isSelected = selectedDays.includes(day.key);
                  return (
                    <button
                      type="button"
                      key={day.key}
                      onClick={() => toggleDay(day.key)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 border ${
                        isSelected
                          ? "bg-purple-600/25 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : "bg-black/40 text-neutral-400 border-white/5 hover:border-white/10 hover:text-neutral-200"
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={12} className="inline-block mr-1.5 -mt-0.5" />}
                      <span>{isRtl ? day.labelFa : day.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time & Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
              
              {/* Timing input + presets */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.timeUtcLocal || (isRtl ? "ساعت برگزاری جلسه" : "Session Time (UTC/Local)")} *
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    required
                    type="text"
                    placeholder="18:30 - 20:00"
                    value={form.class_time}
                    onChange={(e) => setForm({ ...form, class_time: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner font-mono"
                  />
                </div>
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {TIME_PRESETS.map((tPreset) => (
                    <button
                      key={tPreset}
                      type="button"
                      onClick={() => setForm({ ...form, class_time: tPreset })}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/5 transition-colors"
                    >
                      {tPreset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.startDate || (isRtl ? "تاریخ شروع صنف" : "Start Date")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-purple-500/50 [color-scheme:dark] shadow-inner"
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.endDate || (isRtl ? "تاریخ اختتام صنف" : "End Date")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-purple-500/50 [color-scheme:dark] shadow-inner"
                  />
                </div>
              </div>

            </div>

            {/* Schedule Summary */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                {t.teacherPages?.scheduleSummaryOptional || (isRtl ? "توضیحات و خلاصه زمان‌بندی" : "Schedule Summary")}
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-4 top-4 text-neutral-500" />
                <textarea
                  rows={2}
                  placeholder={
                    t.teacherPages?.scheduleSummaryPlaceholder ||
                    (isRtl ? "مثال: شنبه تا چهارشنبه - ساعت ۱۸:۳۰ الی ۲۰:۰۰ به وقت کابل" : "e.g. Evening intensive cohort, 3 days a week")
                  }
                  value={form.schedule_info}
                  onChange={(e) => setForm({ ...form, schedule_info: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner resize-none custom-scrollbar"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: CONNECTIVITY & BROADCAST LINKS */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-2">
              <LinkIcon size={18} />
              <span>{isRtl ? "پیوندهای اتصال جلسه و ارتباطات" : "Connectivity Channels"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.liveMeetingLink || (isRtl ? "لینک جلسه ویدیویی (Teams / Zoom / Meet)" : "Live Meeting URL")}
                </label>
                <div className="relative">
                  <Video size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="url"
                    placeholder="https://teams.microsoft.com/..."
                    value={form.meeting_link}
                    onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.supportGroupLink || (isRtl ? "لینک کانال رمزگذاری سیگنال" : "Encrypted Support Channel URL")}
                </label>
                <div className="relative">
                  <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="url"
                    placeholder="https://signal.group/#..."
                    value={form.signal_group_link}
                    onChange={(e) => setForm({ ...form, signal_group_link: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Broadcast Status Toggle Card */}
            <div className="flex items-center justify-between p-5 mt-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div>
                <p className="font-black text-white text-sm flex items-center gap-2">
                  <Radio size={16} className={form.is_active ? "text-rose-400 animate-pulse" : "text-neutral-500"} />
                  <span>{t.teacherPages?.cohortBroadcastStatus || (isRtl ? "وضعیت پخش زنده صنف" : "Cohort Broadcast Status")}</span>
                </p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                  {t.teacherPages?.toggleBroadcastVisible ||
                    (isRtl
                      ? "هنگام فعال بودن، شاگردان این صنف برچسب LIVE NOW را در پرتال خود مشاهده می‌کنند."
                      : "When active, enrolled scholars will see this stream as LIVE NOW.")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setForm({ ...form, is_active: !form.is_active })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
                  form.is_active ? "bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)]" : "bg-neutral-800 border border-white/10"
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

          {/* SUBMIT BUTTON */}
          <div className="pt-6 border-t border-white/5 flex gap-4">
            <Link
              href={`/${currentLocale}/teacher/live-classes/${classId}`}
              className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center active:scale-95"
            >
              {t.teacherPages?.cancel || (isRtl ? "انصراف" : "Cancel")}
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span>{isSubmitting ? (isRtl ? "در حال ذخیره..." : "Updating Settings...") : (isRtl ? "ذخیره تنظیمات صنف" : "Save Configuration")}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}