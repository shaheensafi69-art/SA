"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, BookOpen, User, DollarSign, Image as ImageIcon, Save, CheckCircle2, AlertCircle, ChevronDown, Check, Type, AlignLeft } from "lucide-react";

type Teacher = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
};

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // دیتای اساتید
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // استیت فرم دوره
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    teacher_id: "",
    thumbnail_url: "",
    is_published: false
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTeachers();

    // بستن دراپ‌داون اساتید وقتی بیرون از آن کلیک می‌شود
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTeacherDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, avatar_url")
        .in("role", ["teacher", "super_admin"])
        .order("first_name", { ascending: true });

      if (error) throw error;
      if (data) setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.teacher_id) {
      setMessage({ type: 'error', text: 'Title and Instructor are required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    const supabase = createClient();

    try {
      let finalThumbnailUrl = form.thumbnail_url;

      // اگر فایلی برای کاور انتخاب شده باشد، ابتدا آن را آپلود می‌کنیم
      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `course_${Date.now()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`; // باکت course_thumbnails یا مشابه آن باید در سوپابیس وجود داشته باشد

        const { error: uploadError } = await supabase.storage
          .from("courses") // نام باکت
          .upload(filePath, thumbnailFile);

        if (uploadError) {
          console.warn("Upload failed, continuing without custom image: ", uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage.from("courses").getPublicUrl(filePath);
          finalThumbnailUrl = publicUrlData.publicUrl;
        }
      }

      // ثبت دوره در دیتابیس
      const { data: newCourse, error } = await supabase
        .from("courses")
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          price: form.price,
          teacher_id: form.teacher_id, // اختصاص استاد اصلی به دوره
          thumbnail_url: finalThumbnailUrl.trim() || null,
          is_published: form.is_published,
        })
        .select()
        .single();

      if (error) throw error;

      setMessage({ type: 'success', text: 'Course successfully deployed to the platform!' });
      
      // هدایت به صفحه دوره‌ها بعد از موفقیت
      setTimeout(() => {
        router.push("/en/admin/courses");
      }, 2000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create course.' });
      setIsSubmitting(false);
    }
  };

  const selectedTeacherInfo = teachers.find(t => t.id === form.teacher_id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Initializing Course Builder...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Library
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Builder</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Construct a new educational program. Set the syllabus, pricing, and assign a lead instructor.
            </p>
          </div>
        </header>

        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-[fadeInDown_0.3s_ease-out] border backdrop-blur-md ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <p>{message.text}</p>
          </div>
        )}

        {/* ================= BUILDER FORM ================= */}
        <form onSubmit={handleCreateCourse} className="space-y-8">
          
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <BookOpen size={22} className="text-violet-400" /> Core Details
            </h3>

            <div className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Course Title *</label>
                <div className="relative">
                  <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required type="text" placeholder="e.g. Masterclass in Advanced AI"
                    value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-violet-500/50 shadow-inner" 
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Curriculum Description</label>
                <div className="relative">
                  <AlignLeft size={16} className="absolute left-4 top-5 text-neutral-500" />
                  <textarea 
                    rows={4} placeholder="Describe the course syllabus and goals..."
                    value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-medium focus:outline-none focus:border-violet-500/50 shadow-inner resize-y custom-scrollbar" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Enrollment Price (USD)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input 
                      type="number" min="0" step="0.01" required
                      value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-emerald-400 text-lg font-black focus:outline-none focus:border-violet-500/50 shadow-inner" 
                    />
                  </div>
                  <p className="text-[9px] text-neutral-500 ml-1">Set to 0 to make it a free course.</p>
                </div>

                {/* Status Toggle */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Publication Status</label>
                  <div className="bg-black/60 border border-white/10 rounded-2xl p-2.5 flex shadow-inner h-[60px]">
                    <button
                      type="button"
                      onClick={() => setForm({...form, is_published: true})}
                      className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        form.is_published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({...form, is_published: false})}
                      className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        !form.is_published ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Draft Mode
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <User size={22} className="text-violet-400" /> Instructor & Media
            </h3>

            <div className="space-y-8">
              
              {/* Custom Teacher Dropdown (With Avatars) */}
              <div className="space-y-2" ref={dropdownRef}>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Lead Instructor *</label>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
                    className="w-full bg-black/60 border border-white/10 hover:border-white/20 rounded-2xl p-3 flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    {selectedTeacherInfo ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0 flex items-center justify-center">
                          {selectedTeacherInfo.avatar_url ? (
                            <img src={selectedTeacherInfo.avatar_url} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-black text-violet-400 text-xs">{selectedTeacherInfo.first_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white leading-tight">{selectedTeacherInfo.first_name} {selectedTeacherInfo.last_name}</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{selectedTeacherInfo.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 pl-2 text-neutral-500">
                        <User size={18} />
                        <span className="text-sm font-medium">Select an instructor from the database...</span>
                      </div>
                    )}
                    <ChevronDown size={18} className={`text-neutral-500 transition-transform ${isTeacherDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isTeacherDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-950 border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 max-h-64 overflow-y-auto custom-scrollbar animate-[fadeInDown_0.2s_ease-out]">
                      {teachers.length === 0 ? (
                        <div className="p-4 text-center text-xs text-neutral-500">No teachers found in database.</div>
                      ) : (
                        <ul className="p-2 space-y-1">
                          {teachers.map(teacher => (
                            <li key={teacher.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, teacher_id: teacher.id });
                                  setIsTeacherDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                                  form.teacher_id === teacher.id ? "bg-violet-500/10 border border-violet-500/20" : "hover:bg-white/5 border border-transparent"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-800 shrink-0 flex items-center justify-center">
                                    {teacher.avatar_url ? (
                                      <img src={teacher.avatar_url} className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="font-black text-violet-400 text-xs">{teacher.first_name.charAt(0)}</span>
                                    )}
                                  </div>
                                  <div className="text-left">
                                    <p className={`text-sm font-bold ${form.teacher_id === teacher.id ? "text-violet-300" : "text-white"}`}>
                                      {teacher.first_name} {teacher.last_name}
                                    </p>
                                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{teacher.email}</p>
                                  </div>
                                </div>
                                {form.teacher_id === teacher.id && <Check size={16} className="text-violet-400" />}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Course Thumbnail */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Course Cover (Thumbnail)</label>
                  <div className="relative flex items-center">
                    <input 
                      type="file" accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-sm text-neutral-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer bg-black/40 border border-white/10 rounded-2xl" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <hr className="flex-1 border-white/5" />
                  <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">OR PASTE URL</span>
                  <hr className="flex-1 border-white/5" />
                </div>

                <div className="relative">
                  <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="url" placeholder="https://..." disabled={!!thumbnailFile}
                    value={form.thumbnail_url} onChange={(e) => setForm({...form, thumbnail_url: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-violet-500/50 shadow-inner disabled:opacity-30 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="sticky bottom-6 sm:static pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting || !form.title || !form.teacher_id}
              className="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(139,92,246,0.4)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.6)] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20}/>}
              {isSubmitting ? "Deploying Course..." : "Create & Deploy Course"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}