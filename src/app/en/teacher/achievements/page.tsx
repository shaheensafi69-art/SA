"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Award, FileBadge, Medal, Send, User, BookOpen, Link as LinkIcon, Hash, CheckCircle2, AlertCircle, UploadCloud, Search, Wand2 } from "lucide-react";

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

type Course = {
  id: string;
  title: string;
};

type AwardItem = {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  points_required: number;
};

export default function TeacherAchievementsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // دیتای پایه برای فرم‌ها
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);

  // استیت فرم صدور گواهینامه
  const [certForm, setCertForm] = useState({
    student_id: "",
    course_id: "",
    certificate_code: "",
    certificate_url: "", // در صورت داشتن لینک دستی
  });
  const [certFile, setCertFile] = useState<File | null>(null); // برای آپلود فایل در باکت
  const [isSubmittingCert, setIsSubmittingCert] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  // استیت فرم اعطای نشان (Award)
  const [awardForm, setAwardForm] = useState({
    student_id: "",
    award_id: "",
  });
  const [isSubmittingAward, setIsSubmittingAward] = useState(false);

  // پیام‌های سیستم
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/en/login");
        return;
      }

      // ۱. دریافت کلاس‌های استاد
      const { data: myClasses } = await supabase
        .from("class_groups")
        .select("id, course_id")
        .eq("teacher_id", session.user.id);

      if (myClasses && myClasses.length > 0) {
        const classIds = myClasses.map(c => c.id);
        const courseIds = [...new Set(myClasses.map(c => c.course_id))];

        // ۲. دریافت دوره‌ها
        const { data: coursesData } = await supabase
          .from("courses")
          .select("id, title")
          .in("id", courseIds);
        
        if (coursesData) setCourses(coursesData);

        // ۳. دریافت شاگردان این استاد
        const { data: classStudents } = await supabase
          .from("class_students")
          .select("student_id")
          .in("class_group_id", classIds);

        if (classStudents && classStudents.length > 0) {
          const studentIds = [...new Set(classStudents.map(cs => cs.student_id))];
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, email, avatar_url")
            .in("id", studentIds);
          
          if (profiles) {
            setStudents(profiles);
            if (profiles.length > 0) {
              setCertForm(prev => ({ ...prev, student_id: profiles[0].id }));
              setAwardForm(prev => ({ ...prev, student_id: profiles[0].id }));
            }
          }
        }
        
        if (coursesData && coursesData.length > 0) {
          setCertForm(prev => ({ ...prev, course_id: coursesData[0].id }));
        }
      }

      // ۴. دریافت لیست تمام نشان‌ها (Awards)
      const { data: awardsData } = await supabase
        .from("awards")
        .select("*")
        .order("points_required", { ascending: true });
        
      if (awardsData) {
        setAwards(awardsData);
        if (awardsData.length > 0) {
          setAwardForm(prev => ({ ...prev, award_id: awardsData[0].id }));
        }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // فیلتر کردن شاگردان بر اساس سرچ باکس
  const filteredStudents = useMemo(() => {
    if (!studentSearchQuery) return students;
    return students.filter(s => 
      s.first_name.toLowerCase().includes(studentSearchQuery.toLowerCase()) || 
      s.last_name.toLowerCase().includes(studentSearchQuery.toLowerCase()) || 
      s.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
    );
  }, [students, studentSearchQuery]);

  // تولید خودکار کد گواهینامه
  const generateAutoCode = () => {
    if (!certForm.course_id) {
      alert("Please select a course first.");
      return;
    }
    const year = new Date().getFullYear();
    const coursePrefix = certForm.course_id.substring(0, 4).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCertForm({ ...certForm, certificate_code: `SAFI-${year}-${coursePrefix}-${randomHex}` });
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.student_id || !certForm.course_id || !certForm.certificate_code) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmittingCert(true);
    setMessage(null);
    const supabase = createClient();

    try {
      let finalUrl = certForm.certificate_url;

      // آپلود فایل در باکت (اگر فایلی انتخاب شده باشد)
      if (certFile) {
        const fileExt = certFile.name.split('.').pop();
        const fileName = `${certForm.student_id}_${Date.now()}.${fileExt}`;
        const filePath = `certificates/${fileName}`; // فرض بر این است که باکتی به نام certificates ساخته‌اید

        const { error: uploadError, data } = await supabase.storage
          .from("certificates")
          .upload(filePath, certFile);

        if (uploadError) throw new Error("Failed to upload certificate file: " + uploadError.message);

        // دریافت لینک پابلیک فایل آپلود شده
        const { data: publicUrlData } = supabase.storage.from("certificates").getPublicUrl(filePath);
        finalUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("certificates").insert({
        student_id: certForm.student_id,
        course_id: certForm.course_id,
        certificate_code: certForm.certificate_code.trim(),
        certificate_url: finalUrl.trim() || null,
        issue_date: new Date().toISOString(),
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Certificate issued successfully!' });
      setCertForm(prev => ({ ...prev, certificate_code: "", certificate_url: "" }));
      setCertFile(null);
      setTimeout(() => setMessage(null), 4000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to issue certificate.' });
    } finally {
      setIsSubmittingCert(false);
    }
  };

  const handleGrantAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardForm.student_id || !awardForm.award_id) {
      setMessage({ type: 'error', text: 'Please select a student and an award.' });
      return;
    }

    setIsSubmittingAward(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("student_awards").insert({
        student_id: awardForm.student_id,
        award_id: awardForm.award_id,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Award granted successfully!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to grant award.' });
    } finally {
      setIsSubmittingAward(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Achievements Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/5 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-inner shrink-0">
              <Award size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Awards</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Issue official certificates and grant special awards to your top students.</p>
            </div>
          </div>
        </header>

        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-[fadeInDown_0.3s_ease-out] border backdrop-blur-md ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <p>{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ================= SECTION 1: ISSUE CERTIFICATE ================= */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-6 mb-8 relative z-10">
              <FileBadge size={28} className="text-indigo-400" /> Issue Certificate
            </h3>

            <form onSubmit={handleIssueCertificate} className="space-y-6 relative z-10">
              
              {/* Student Search & Select */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Select Student *</label>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" placeholder="Search student by name or email..."
                      value={studentSearchQuery} onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <select 
                    required value={certForm.student_id} onChange={(e) => setCertForm({...certForm, student_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 appearance-none shadow-inner cursor-pointer"
                  >
                    {filteredStudents.length === 0 ? <option value="">No matching students found</option> : null}
                    {filteredStudents.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.email})</option>)}
                  </select>
                </div>
              </div>

              {/* Course Select */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Related Course *</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <select 
                    required value={certForm.course_id} onChange={(e) => setCertForm({...certForm, course_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 appearance-none shadow-inner cursor-pointer"
                  >
                    {courses.length === 0 ? <option value="">No courses available</option> : null}
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
              </div>

              {/* Certificate Code with Auto-Generator */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Certificate Code (ID) *</label>
                  <button type="button" onClick={generateAutoCode} className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded hover:bg-indigo-500/20 transition-colors flex items-center gap-1">
                    <Wand2 size={10}/> Auto Generate
                  </button>
                </div>
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required type="text" placeholder="e.g. SAFI-2026-X89"
                    value={certForm.certificate_code} onChange={(e) => setCertForm({...certForm, certificate_code: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 shadow-inner uppercase" 
                  />
                </div>
              </div>

              {/* File Upload OR URL */}
              <div className="space-y-4 pt-2 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Upload Certificate File (PDF/Image)</label>
                  <div className="relative flex items-center">
                    <input 
                      type="file" accept=".pdf,image/*"
                      onChange={(e) => setCertFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-sm text-neutral-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer bg-black/40 border border-white/10 rounded-2xl" 
                    />
                  </div>
                  <p className="text-[9px] text-neutral-500 italic ml-1">File will be uploaded to Supabase Storage securely.</p>
                </div>

                <div className="flex items-center gap-3">
                  <hr className="flex-1 border-white/10" />
                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">OR USE EXTERNAL LINK</span>
                  <hr className="flex-1 border-white/10" />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="url" placeholder="Paste direct URL (https://...)" disabled={!!certFile}
                      value={certForm.certificate_url} onChange={(e) => setCertForm({...certForm, certificate_url: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 shadow-inner disabled:opacity-30 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" disabled={isSubmittingCert || students.length === 0 || courses.length === 0}
                className="w-full py-5 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_15px_40px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
              >
                {isSubmittingCert ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} Issue Certificate
              </button>
            </form>
          </div>

          {/* ================= SECTION 2: GRANT AWARDS ================= */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-6 mb-8 relative z-10">
              <Medal size={28} className="text-amber-400" /> Grant Special Award
            </h3>

            <form onSubmit={handleGrantAward} className="space-y-6 relative z-10 flex flex-col flex-1">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Select Student *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <select 
                    required value={awardForm.student_id} onChange={(e) => setAwardForm({...awardForm, student_id: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 appearance-none shadow-inner cursor-pointer"
                  >
                    {students.length === 0 ? <option value="">No students available</option> : null}
                    {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Select Badge / Award *</label>
                <div className="grid grid-cols-1 gap-3 mt-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                  {awards.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-white/10 rounded-xl text-neutral-500 text-sm">No awards configured in database.</div>
                  ) : null}
                  {awards.map(award => (
                    <div 
                      key={award.id} 
                      onClick={() => setAwardForm({ ...awardForm, award_id: award.id })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex gap-4 items-center ${
                        awardForm.award_id === award.id 
                          ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                          : 'bg-black/40 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-3xl shrink-0">{award.icon_url || '🏆'}</div>
                      <div>
                        <h4 className={`font-black text-sm ${awardForm.award_id === award.id ? 'text-amber-400' : 'text-white'}`}>{award.title}</h4>
                        <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">{award.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <button 
                  type="submit" disabled={isSubmittingAward || students.length === 0 || awards.length === 0}
                  className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_15px_40px_rgba(245,158,11,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmittingAward ? <Loader2 size={18} className="animate-spin" /> : <Award size={18} />} Grant Award
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}