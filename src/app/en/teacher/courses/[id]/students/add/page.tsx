"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, UserPlus, Loader2, ShieldAlert, Globe, CheckCircle2, CheckCircle } from "lucide-react";

type GlobalStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar_url: string;
};

export default function AddStudentToClassPage() {
  const params = useParams();
  const classId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [className, setClassName] = useState("Loading...");
  const [courseId, setCourseId] = useState<string | null>(null);

  const [allStudents, setAllStudents] = useState<GlobalStudent[]>([]);
  const [enrolledStudentIds, setEnrolledStudentIds] = useState<Set<string>>(new Set());
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingId, setIsAddingId] = useState<string | null>(null);
  
  // سیستم نمایش پیام (Toast)
  const [successMessage, setSuccessMessage] = useState<{show: boolean, name: string}>({ show: false, name: "" });

  useEffect(() => {
    if (classId) fetchPageData();
  }, [classId]);

  const fetchPageData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // ۱. دریافت نام کلاس و آی‌دی کورس مادر
      const { data: classData } = await supabase
        .from("class_groups")
        .select("class_name, course_id")
        .eq("id", classId)
        .single();
        
      if (classData) {
        setClassName(classData.class_name);
        setCourseId(classData.course_id);
      }

      // ۲. دریافت تمام کاربران با نقش Student
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, phone_number, avatar_url")
        .eq("role", "student")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;
      if (profilesData) setAllStudents(profilesData as GlobalStudent[]);

      // ۳. دریافت آی‌دی شاگردانی که از قبل در این کلاس هستند (برای غیرفعال کردن دکمه‌ها)
      const { data: enrolledData } = await supabase
        .from("class_students")
        .select("student_id")
        .eq("class_group_id", classId);

      if (enrolledData) {
        const ids = new Set(enrolledData.map(item => item.student_id));
        setEnrolledStudentIds(ids);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (student: GlobalStudent) => {
    if (!courseId) {
      alert("Error: Course ID is missing.");
      return;
    }

    setIsAddingId(student.id);
    const supabase = createClient();

    try {
      // 🔥 قدم اول: بررسی و ثبت‌نام شاگرد در خود کورس (جدول enrollments)
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", courseId)
        .eq("student_id", student.id)
        .maybeSingle();

      if (!existingEnrollment) {
        const { error: enrollError } = await supabase
          .from("enrollments")
          .insert({
            course_id: courseId,
            student_id: student.id,
            progress_percentage: 0
          });
        if (enrollError) throw enrollError;
      }

      // 🔥 قدم دوم: اضافه کردن شاگرد به کلاس لایو (جدول class_students)
      const { error: classError } = await supabase
        .from("class_students")
        .insert({
          class_group_id: classId,
          student_id: student.id
        });

      if (classError) throw classError;

      // آپدیت موفقیت آمیز در UI
      setEnrolledStudentIds(prev => new Set(prev).add(student.id));
      
      // نمایش پیام موفقیت (Toast)
      setSuccessMessage({ show: true, name: `${student.first_name} ${student.last_name}` });
      setTimeout(() => setSuccessMessage({ show: false, name: "" }), 4000);

    } catch (error: any) {
      alert("Error adding student: " + error.message);
    } finally {
      setIsAddingId(null);
    }
  };

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return allStudents;
    return allStudents.filter(s => 
      s.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone_number && s.phone_number.includes(searchQuery))
    );
  }, [allStudents, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Academy Roster...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* ================= SUCCESS TOAST NOTIFICATION ================= */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${successMessage.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.2)] flex items-center gap-4">
          <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-emerald-400 font-black text-sm">Successfully Enrolled!</p>
            <p className="text-xs text-emerald-500/70 font-bold mt-0.5">{successMessage.name} was added to the class.</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-end gap-6 bg-neutral-900/40 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div>
            <Link href={`/en/teacher/courses/${classId}/students`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Manage
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              <Globe className="text-fuchsia-400" size={32} /> Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Roster</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
              Assign new students to: <strong className="text-white bg-white/5 px-2 py-0.5 rounded-md ml-1">{className}</strong>
            </p>
          </div>
          
          <div className="w-full md:w-80 relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search student..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors shadow-inner"
            />
          </div>
        </header>

        {/* ================= STUDENT LIST ================= */}
        <div className="bg-[#0a0a0f]/60 border border-white/5 rounded-[2.5rem] p-4 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[50vh]">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh] opacity-60 p-10 text-center">
              <ShieldAlert size={64} className="text-neutral-600 mb-6" />
              <h3 className="text-xl font-black text-white mb-2">No Students Found</h3>
              <p className="text-neutral-400 text-sm">We couldn't find any students matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map(student => {
                const isAlreadyEnrolled = enrolledStudentIds.has(student.id);

                return (
                  <div 
                    key={student.id} 
                    className={`border rounded-[1.5rem] p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5 transition-all duration-300 ${
                      isAlreadyEnrolled 
                        ? "bg-black/40 border-white/5 opacity-50 grayscale pointer-events-none" 
                        : "bg-[#0a0a0f] border-white/10 hover:border-fuchsia-500/30 hover:bg-white/[0.02] shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-neutral-400">{student.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0 truncate">
                        <p className="font-black text-white text-base truncate">{student.first_name} {student.last_name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-1 mb-0.5 truncate">{student.email}</p>
                        <p className="text-[10px] text-neutral-500 font-mono truncate">{student.phone_number}</p>
                      </div>
                    </div>

                    <div className="shrink-0 flex justify-end xl:w-auto w-full pt-3 xl:pt-0 border-t xl:border-0 border-white/5">
                      {isAlreadyEnrolled ? (
                        <div className="w-full xl:w-auto px-6 py-3.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/80 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2">
                          <CheckCircle2 size={16} /> Already Enrolled
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddStudent(student)}
                          disabled={isAddingId === student.id}
                          className="w-full xl:w-auto px-8 py-3.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 hover:border-fuchsia-500/40 text-fuchsia-400 hover:text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_5px_15px_rgba(217,70,239,0.1)] flex items-center justify-center gap-2 active:scale-95"
                        >
                          {isAddingId === student.id ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                          Add to Class
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}