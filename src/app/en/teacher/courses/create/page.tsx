"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, BookOpen, Image as ImageIcon, DollarSign, Globe, User, Users, AlignLeft, CheckCircle2, Save, Lock, Upload, AlertCircle } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // استیت‌های آپلود عکس
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [isUploadingInstructor, setIsUploadingInstructor] = useState(false);

  // اطلاعات اتوماتیک و قفل شده استاد اصلی
  const [teacherId, setTeacherId] = useState<string>("");
  const [primaryInstructor, setPrimaryInstructor] = useState({
    name: "",
    bio: "",
    image_url: ""
  });

  // فرم دیتای قابل تغییر دوره
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Masterclass",
    price: "",
    thumbnail_url: "",
    language: "English",
    is_published: false,
    
    // استاد دوم (اختیاری)
    instructor_2_name: "",
    instructor_2_bio: "",
    instructor_2_image_url: ""
  });

  useEffect(() => {
    fetchCurrentTeacherData();
  }, []);

  const fetchCurrentTeacherData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    const currentUserId = session.user.id;
    setTeacherId(currentUserId);

    try {
      // ۱. ابتدا تلاش برای گرفتن اطلاعات از جدول تخصصی teacher_info
      const { data: teacherInfo, error: teacherError } = await supabase
        .from("teacher_info")
        .select("first_name, last_name, bio, avatar_url")
        .eq("id", currentUserId)
        .single();

      if (teacherInfo && !teacherError) {
        setPrimaryInstructor({
          name: `${teacherInfo.first_name} ${teacherInfo.last_name}`.trim(),
          bio: teacherInfo.bio || "Senior Academy Instructor",
          image_url: teacherInfo.avatar_url || ""
        });
      } else {
        // ۲. اگر در teacher_info نبود، از profiles می‌گیریم
        const { data: profileData } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", currentUserId)
          .single();
          
        if (profileData) {
          setPrimaryInstructor({
            name: `${profileData.first_name || ""} ${profileData.last_name || ""}`.trim() || "Verified Instructor",
            bio: "Senior Academy Instructor",
            image_url: profileData.avatar_url || ""
          });
        }
      }
    } catch (err) {
      console.error("Error fetching teacher identity:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= تابع طلایی آپلود عکس در باکت‌های سوپابیس =================
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucketName: string, targetField: 'thumbnail_url' | 'instructor_2_image_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // روشن کردن لودینگ دکمه آپلود مربوطه
    if (targetField === 'thumbnail_url') setIsUploadingThumb(true);
    else setIsUploadingInstructor(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      // ساخت یک نام یکتا برای فایل جلوگیری از تداخل (Overwriting)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      // آپلود فایل در باکت مورد نظر
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // دریافت لینک عمومی (Public URL) عکس آپلود شده
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (publicUrlData) {
        // جایگذاری اتوماتیک لینک در فیلد متنی مربوطه در فرم
        setForm(prev => ({ ...prev, [targetField]: publicUrlData.publicUrl }));
      }
    } catch (err: any) {
      setErrorMsg(`Image Upload Failed: ${err.message}`);
    } finally {
      // خاموش کردن لودینگ دکمه
      if (targetField === 'thumbnail_url') setIsUploadingThumb(false);
      else setIsUploadingInstructor(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      if (!form.title) throw new Error("Course title is required.");

      const { error } = await supabase
        .from("courses")
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category.trim(),
          teacher_id: teacherId, // 🔥 شناسه امن از سشن
          price: form.price ? parseFloat(form.price) : 0,
          thumbnail_url: form.thumbnail_url.trim() || null,
          is_published: form.is_published,
          language: form.language.trim(),
          
          // 🔥 اطلاعات استاد اصلی (قفل شده - اتوماتیک از دیتابیس)
          instructor_name: primaryInstructor.name,
          instructor_bio: primaryInstructor.bio,
          instructor_image_url: primaryInstructor.image_url || null,
          
          // اطلاعات استاد دوم (اختیاری)
          instructor_2_name: form.instructor_2_name.trim() || null,
          instructor_2_bio: form.instructor_2_bio.trim() || null,
          instructor_2_image_url: form.instructor_2_image_url.trim() || null,
        });

      if (error) throw error;

      // هدایت به داشبورد کورس‌ها پس از موفقیت
      router.push("/en/teacher/courses");
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create the course.");
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

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <Link href="/en/teacher/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Hub
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Course</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Design and publish a new masterclass or video series to the academy.</p>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          {/* ================= SECTION 1: COURSE DETAILS ================= */}
          <div className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-6 sm:space-y-8">
            <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <BookOpen size={18} /> Course Curriculum Details
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Course Title *</label>
                <input required type="text" placeholder="e.g. Advanced AI Trading Masterclass" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Detailed Description</label>
                <div className="relative">
                  <AlignLeft size={18} className="absolute left-4 top-4 text-neutral-500" />
                  <textarea rows={4} placeholder="What will students learn in this course?..." value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 resize-none custom-scrollbar shadow-inner" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Category</label>
                  <input type="text" placeholder="e.g. Finance, Programming" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Language</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <select value={form.language} onChange={(e) => setForm({...form, language: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner">
                      <option value="English">English</option>
                      <option value="Persian">Persian (فارسی)</option>
                      <option value="Arabic">Arabic (العربية)</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Price (USD)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input type="number" min="0" step="0.01" placeholder="0.00 (Leave empty for Free)" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono shadow-inner" />
                  </div>
                </div>
              </div>

              {/* 🔥 آپلود یا لینک کاور کورس (Thumbnail) 🔥 */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Course Thumbnail Image *</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="url" 
                      required
                      placeholder="Paste Image URL or upload a file..." 
                      value={form.thumbnail_url} 
                      onChange={(e) => setForm({...form, thumbnail_url: e.target.value})} 
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner transition-colors" 
                    />
                  </div>
                  <div className="shrink-0">
                    <input 
                      type="file" 
                      id="course-thumbnail-upload" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, "course-thumbnails", "thumbnail_url")}
                    />
                    <label 
                      htmlFor="course-thumbnail-upload" 
                      className={`flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all h-full ${isUploadingThumb ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {isUploadingThumb ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                      {isUploadingThumb ? 'Uploading...' : 'Upload Image'}
                    </label>
                  </div>
                </div>
                {/* Image Preview */}
                {form.thumbnail_url && (
                  <div className="mt-3 w-40 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                    <img src={form.thumbnail_url} alt="Course Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: INSTRUCTORS ================= */}
          <div className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl space-y-8">
            <h3 className="text-lg font-black text-purple-400 flex items-center gap-2 border-b border-white/5 pb-3">
              <Users size={18} /> Faculty & Instructors
            </h3>

            {/* 🔥 فیلد قفل شده استاد اصلی (تامین امنیت دیتابیس) 🔥 */}
            <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-fuchsia-500/20 text-fuchsia-400 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <Lock size={10} /> Auto-Assigned Primary Instructor
              </div>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
                <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                  {primaryInstructor.image_url ? (
                    <img src={primaryInstructor.image_url} alt="Instructor" className="w-full h-full object-cover grayscale-[20%]" />
                  ) : (
                    <User size={32} className="text-neutral-600" />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h4 className="text-xl font-black text-white">{primaryInstructor.name || "Loading Name..."}</h4>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-2xl">
                    {primaryInstructor.bio || "No biography available in profile."}
                  </p>
                  <p className="text-[10px] font-bold text-fuchsia-500/60 uppercase tracking-widest mt-2 flex items-center justify-center sm:justify-start gap-1.5">
                    <CheckCircle2 size={12} /> Identity Verified by Safi Auth
                  </p>
                </div>
              </div>
            </div>

            {/* استاد دوم (اختیاری و قابل ویرایش) */}
            <div className="pt-4 space-y-5">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Users size={16} className="text-neutral-500" /> Co-Instructor <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">Optional</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Co-Instructor Name</label>
                  <input type="text" placeholder="e.g. John Doe" value={form.instructor_2_name} onChange={(e) => setForm({...form, instructor_2_name: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner" />
                </div>
                
                {/* 🔥 آپلود یا لینک عکس استاد دوم 🔥 */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Co-Instructor Image URL</label>
                  <div className="flex flex-col xl:flex-row gap-3">
                    <div className="relative flex-1">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input 
                        type="url" 
                        placeholder="Paste URL or upload file..." 
                        value={form.instructor_2_image_url} 
                        onChange={(e) => setForm({...form, instructor_2_image_url: e.target.value})} 
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner" 
                      />
                    </div>
                    <div className="shrink-0">
                      <input 
                        type="file" 
                        id="instructor-image-upload" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, "instructor_image", "instructor_2_image_url")}
                      />
                      <label 
                        htmlFor="instructor-image-upload" 
                        className={`flex items-center justify-center gap-2 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all h-full ${isUploadingInstructor ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {isUploadingInstructor ? <Loader2 size={16} className="animate-spin" /> : <Upload size={14} />}
                        Upload
                      </label>
                    </div>
                  </div>
                  {/* Instructor Preview */}
                  {form.instructor_2_image_url && (
                    <div className="mt-3 w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                      <img src={form.instructor_2_image_url} alt="Co-Instructor Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Co-Instructor Biography</label>
                  <input type="text" placeholder="Short bio for the second instructor..." value={form.instructor_2_bio} onChange={(e) => setForm({...form, instructor_2_bio: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SUBMIT ACTION ================= */}
          <div className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Toggle Publish Status */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-6 bg-black/40 px-5 py-3.5 rounded-2xl border border-white/5">
              <div>
                <p className="font-black text-white text-sm">Publish Course</p>
                <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Make it visible to academy students.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setForm({...form, is_published: !form.is_published})}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none shrink-0 ${form.is_published ? 'bg-fuchsia-600' : 'bg-neutral-800 border border-white/10'}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${form.is_published ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !primaryInstructor.name || isUploadingThumb || isUploadingInstructor} 
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] hover:shadow-[0_15px_40px_rgba(217,70,239,0.5)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? "Compiling Course..." : "Create Course"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}