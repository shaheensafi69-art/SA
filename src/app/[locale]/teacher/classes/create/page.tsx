"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Video, Calendar, Clock, Link as LinkIcon, MessageCircle, AlertCircle, Save, CheckCircle2 } from "lucide-react";

type CourseOption = {
  id: string;
  title: string;
};

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CreateClassPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // فرم دیتا
  const [form, setForm] = useState({
    course_id: "",
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
    fetchTeacherCourses();
  }, []);

  const fetchTeacherCourses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      // 1. اول چک می‌کنیم نقش کاربر چیست
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const userRole = profile?.role?.toLowerCase();
      const isAdmin = userRole === 'admin' || userRole === 'super_admin';

      // 2. ساخت کوئری هوشمند بر اساس نقش
      let query = supabase.from("courses").select("id, title").order("created_at", { ascending: false });

      // اگر ادمین نیست، کوئری را فقط محدود کن به کورس‌های خودش
      if (!isAdmin) {
        query = query.eq("teacher_id", session.user.id);
      }

      // اجرای کوئری
      const { data, error } = await query;

      if (error) throw error;
      
      if (data && data.length > 0) {
        setCourses(data);
        setForm(prev => ({ ...prev, course_id: data[0].id })); // پیش‌فرض انتخاب اولین کورس
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setErrorMsg("Failed to load courses. Please make sure you have created a course first.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;
    const teacherId = session.user.id; // آی‌دی کسی که در حال ساخت کلاس است

    try {
      if (!form.course_id) throw new Error("Please select a parent course first.");
      if (selectedDays.length === 0) throw new Error("Please select at least one class day.");

      // تبدیل آرایه روزها به یک استرینگ (مثلاً "Monday, Wednesday")
      const daysString = selectedDays.join(", ");

      const { error } = await supabase
        .from("class_groups")
        .insert({
          course_id: form.course_id,
          teacher_id: teacherId, // تخصیص مستقیم استاد (سازنده) کلاس
          class_name: form.class_name.trim(),
          schedule_info: form.schedule_info.trim(),
          start_date: form.start_date || null,
          end_date: form.end_date || null,
          meeting_link: form.meeting_link.trim() || null,
          signal_group_link: form.signal_group_link.trim() || null,
          class_time: form.class_time.trim(),
          class_days: daysString,
          is_active: form.is_active
        });

      if (error) throw error;

      // هدایت به صفحه مدیریت کلاس‌ها پس از موفقیت
      router.push("/en/teacher/courses");
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create class cohort.");
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

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Deep Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <Link href="/en/teacher/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Hub
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Cohort</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Configure a new live classroom for an existing course.</p>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
          
          {/* Section 1: Core Identity */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <Video size={18} /> Cohort Identity
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* انتخاب کورس (داینامیک شده بر اساس نقش) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Parent Course *</label>
                {courses.length === 0 ? (
                  <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-4 text-red-400 text-sm font-bold">
                    No courses available. Please create a course first.
                  </div>
                ) : (
                  <select 
                    required 
                    value={form.course_id}
                    onChange={(e) => setForm({...form, course_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* نام کلاس */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Classroom Name *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Shopify Masterclass - Group 01"
                  value={form.class_name}
                  onChange={(e) => setForm({...form, class_name: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Scheduling & Time */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-4">
              <Calendar size={18} /> Schedule & Timings
            </h3>
            
            {/* انتخاب روزهای هفته */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Class Days *</label>
              <div className="flex flex-wrap gap-2">
                {WEEK_DAYS.map(day => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border ${
                        isSelected 
                          ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]" 
                          : "bg-black/40 text-neutral-500 border-white/5 hover:border-white/10 hover:text-neutral-300"
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={12} className="inline-block mr-1.5 -mt-0.5" />}
                      {day.substring(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Time (UTC/Local) *</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input required type="text" placeholder="e.g. 18:00 - 20:00" value={form.class_time} onChange={(e) => setForm({...form, class_time: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Start Date</label>
                <input type="date" value={form.start_date} onChange={(e) => setForm({...form, start_date: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/50 [color-scheme:dark]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">End Date</label>
                <input type="date" value={form.end_date} onChange={(e) => setForm({...form, end_date: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/50 [color-scheme:dark]" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Schedule Summary (Optional)</label>
              <input type="text" placeholder="e.g. Evening intensive cohort, 3 days a week" value={form.schedule_info} onChange={(e) => setForm({...form, schedule_info: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50" />
            </div>
          </div>

          {/* Section 3: Links & Status */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-4">
              <LinkIcon size={18} /> Connectivity & Status
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Live Meeting Link</label>
                <div className="relative">
                  <Video size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="url" placeholder="Zoom / Google Meet URL" value={form.meeting_link} onChange={(e) => setForm({...form, meeting_link: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Support Group Link</label>
                <div className="relative">
                  <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="url" placeholder="Signal / Telegram / WhatsApp URL" value={form.signal_group_link} onChange={(e) => setForm({...form, signal_group_link: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50" />
                </div>
              </div>
            </div>

            {/* Custom Toggle Switch for Active Status */}
            <div className="flex items-center justify-between p-5 mt-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div>
                <p className="font-black text-white text-sm">Activate Cohort</p>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Allow students to see this class and its links.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setForm({...form, is_active: !form.is_active})}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${form.is_active ? 'bg-fuchsia-600' : 'bg-neutral-800 border border-white/10'}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${form.is_active ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-white/5">
            <button 
              type="submit" 
              disabled={isSubmitting || courses.length === 0} 
              className="w-full py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? "Initializing Cohort..." : "Create Class Cohort"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}