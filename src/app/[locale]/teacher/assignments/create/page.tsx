"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, ClipboardEdit, CalendarDays, AlignLeft, Target, Layers, AlertCircle, Save, Star } from "lucide-react";

type ClassOption = {
  id: string;
  class_name: string;
};

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [classes, setClasses] = useState<ClassOption[]>([]);

  // فرم دیتای تکلیف (هماهنگ شده با دیتابیس شما)
  const [form, setForm] = useState({
    class_group_id: "",
    title: "",
    description: "",
    deadline: "", // آپدیت شده به deadline
    max_score: 100,
  });

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
      // استخراج کلاس‌های لایو این استاد برای لیست کشویی
      const { data, error } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setClasses(data);
        // کلاس اول به صورت پیش‌فرض انتخاب می‌شود
        setForm(prev => ({ ...prev, class_group_id: data[0].id }));
      }
    } catch (err) {
      console.error("Error fetching classes for assignment:", err);
      setErrorMsg("Failed to load your classes. Please make sure you have active classes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      if (!form.class_group_id) throw new Error("Please select a target classroom.");
      if (!form.title) throw new Error("Assignment title is required.");

      const { error } = await supabase
        .from("assignments")
        .insert({
          class_group_id: form.class_group_id, // متصل به کلاس
          title: form.title.trim(),
          description: form.description.trim() || null,
          deadline: form.deadline || null, // استفاده از فیلد deadline دیتابیس شما
          max_score: form.max_score || 100,
        });

      if (error) throw error;

      // هدایت به داشبورد تکالیف پس از موفقیت
      router.push("/en/teacher/assignments");
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to issue the assignment.");
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
            <Link href="/en/teacher/assignments" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Terminal
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              Issue <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Assignment</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Create and deploy a new academic task for a specific cohort.</p>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
          
          {/* Section 1: Target Definition */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <Target size={18} /> Assignment Target
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Target Classroom *</label>
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                {classes.length === 0 ? (
                  <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-4 text-red-400 text-sm font-bold pl-11">
                    No active classes found.
                  </div>
                ) : (
                  <select 
                    required 
                    value={form.class_group_id}
                    onChange={(e) => setForm({...form, class_group_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner cursor-pointer"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.class_name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Task Specifications */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-4">
              <ClipboardEdit size={18} /> Task Specifications
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Assignment Title *</label>
              <input 
                required type="text" 
                placeholder="e.g. Chapter 4 Reading Reflection"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Task Description / Instructions</label>
              <div className="relative">
                <AlignLeft size={16} className="absolute left-4 top-4 text-neutral-500" />
                <textarea 
                  rows={5}
                  placeholder="Provide clear instructions for the students..."
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 resize-none shadow-inner custom-scrollbar" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Parameters */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3 pt-4">
              <CalendarDays size={18} /> Assessment Parameters
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Deadline Date & Time</label>
                <div className="relative">
                  <input 
                    type="datetime-local" 
                    value={form.deadline}
                    onChange={(e) => setForm({...form, deadline: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-fuchsia-500/50 [color-scheme:dark]" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Maximum Score (Points)</label>
                <div className="relative">
                  <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                  <input 
                    type="number" min="1" max="1000"
                    value={form.max_score}
                    onChange={(e) => setForm({...form, max_score: Number(e.target.value)})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-amber-400 text-lg font-black focus:outline-none focus:border-amber-500/50 shadow-inner" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-white/5">
            <button 
              type="submit" 
              disabled={isSubmitting || classes.length === 0} 
              className="w-full py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? "Deploying Task..." : "Deploy Assignment"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}