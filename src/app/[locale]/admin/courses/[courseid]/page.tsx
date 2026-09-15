"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Users, DollarSign, BookOpen, GraduationCap, CheckCircle2, User, Mail, Calendar, Activity, ShieldAlert, Award, Search } from "lucide-react";

type TeacherInfo = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
};

type CourseDetail = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  created_at: string;
  teacher: TeacherInfo | null;
};

type EnrolledStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
  enrolled_at: string;
  status: "Active" | "Completed";
};

export default function CourseDetailsAdminPage() {
  const params = useParams();
  const courseId = params.courseid as string;

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (courseId) fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. واکشی اطلاعات دوره به همراه استاد
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select(`
          *,
          teacher:profiles!teacher_id(id, first_name, last_name, email, avatar_url)
        `)
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      
      const teacherObj = Array.isArray(courseData.teacher) ? courseData.teacher[0] : courseData.teacher;
      setCourse({ ...courseData, teacher: teacherObj });

      // ۲. یافتن تمام گروه‌های کلاسی مرتبط با این دوره
      const { data: classesData } = await supabase
        .from("class_groups")
        .select("id")
        .eq("course_id", courseId);

      if (classesData && classesData.length > 0) {
        const classIds = classesData.map(c => c.id);

        // ۳. استخراج تمام شاگردان ثبت‌نام شده در این کلاس‌ها
        const { data: classStudents } = await supabase
          .from("class_students")
          .select("student_id, created_at")
          .in("class_group_id", classIds);

        if (classStudents && classStudents.length > 0) {
          // حذف شاگردان تکراری (در صورت ثبت‌نام همزمان در دو گروه از یک دوره)
          const uniqueStudentMap = new Map();
          classStudents.forEach(cs => {
            if (!uniqueStudentMap.has(cs.student_id)) {
              uniqueStudentMap.set(cs.student_id, cs.created_at);
            }
          });

          const studentIds = Array.from(uniqueStudentMap.keys());

          // ۴. واکشی اطلاعات پروفایل شاگردان
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, email, avatar_url")
            .in("id", studentIds);

          // ۵. بررسی گواهینامه‌ها برای تشخیص وضعیت فارغ‌التحصیلی
          const { data: certificates } = await supabase
            .from("certificates")
            .select("student_id")
            .eq("course_id", courseId);

          const completedStudentIds = new Set(certificates?.map(cert => cert.student_id));

          // ترکیب اطلاعات
          if (profiles) {
            const finalStudentsList: EnrolledStudent[] = profiles.map(profile => ({
              ...profile,
              enrolled_at: uniqueStudentMap.get(profile.id),
              status: completedStudentIds.has(profile.id) ? "Completed" : "Active"
            }));
            
            // مرتب‌سازی بر اساس تاریخ ثبت‌نام
            finalStudentsList.sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime());
            setStudents(finalStudentsList);
          }
        }
      }

    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    const query = searchQuery.toLowerCase();
    return students.filter(s => 
      s.first_name.toLowerCase().includes(query) || 
      s.last_name.toLowerCase().includes(query) || 
      s.email.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const stats = useMemo(() => {
    const total = students.length;
    const completed = students.filter(s => s.status === "Completed").length;
    const active = total - completed;
    const revenue = total * (course?.price || 0);
    return { total, completed, active, revenue };
  }, [students, course]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Compiling Course Analytics...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Course Not Found</h2>
        <p className="text-neutral-500 mb-6">This course does not exist or has been deleted.</p>
        <Link href="/en/admin/courses" className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER & COURSE COVER ================= */}
        <section className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Course Thumbnail */}
          <div className="w-full lg:w-[350px] xl:w-[450px] aspect-video rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden relative shrink-0 shadow-2xl group">
            {course.thumbnail_url ? (
              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 flex items-center justify-center">
                <BookOpen size={64} className="text-white/20" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border ${
                course.is_published ? "bg-emerald-500/80 text-white border-emerald-400" : "bg-black/80 text-neutral-300 border-white/20"
              }`}>
                {course.is_published ? "Published" : "Draft Mode"}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex-1">
            <Link href="/en/admin/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-6 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <ArrowLeft size={14} /> Back to Courses
            </Link>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">{course.title}</h1>
            <p className="text-sm text-neutral-400 font-medium max-w-2xl leading-relaxed mb-6">
              {course.description || "No specific curriculum description provided for this course."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
                <DollarSign size={16} className={course.price > 0 ? "text-emerald-400" : "text-amber-400"}/>
                <span className="font-black text-white">{course.price > 0 ? `$${course.price}` : "Free Course"}</span>
              </div>
              <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
                <Calendar size={16} className="text-neutral-500"/>
                <span className="text-xs font-bold text-neutral-300">Created: {new Date(course.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= METRICS GRID ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-violet-500/10 text-violet-400 rounded-xl flex items-center justify-center mb-4"><Users size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Enrolled</p>
            <p className="text-3xl font-black text-white">{stats.total}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4"><Activity size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Currently Studying</p>
            <p className="text-3xl font-black text-white">{stats.active}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5"></div>
            <div className="relative z-10 w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20"><Award size={20}/></div>
            <p className="relative z-10 text-[10px] font-black text-emerald-500/70 uppercase tracking-widest mb-1">Completed & Certified</p>
            <p className="relative z-10 text-3xl font-black text-emerald-400">{stats.completed}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-4"><DollarSign size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Estimated Revenue</p>
            <p className="text-3xl font-black text-white">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* ================= 2 COLUMN LAYOUT ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-[1.3fr_0.7fr]">
          
          {/* LEFT: ENROLLED STUDENTS LIST */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl flex-1 flex flex-col">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <GraduationCap size={22} className="text-violet-400"/> Cohort Roster
                </h3>
                
                {/* Search in List */}
                <div className="bg-black/40 p-2 rounded-2xl border border-white/5 flex items-center gap-2 w-full sm:max-w-xs shadow-inner">
                  <div className="pl-3 text-neutral-500"><Search size={14} /></div>
                  <input 
                    type="text" placeholder="Find student..."
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-white text-xs focus:outline-none py-2 pr-3 font-medium placeholder:text-neutral-600"
                  />
                </div>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                    <Users size={32} className="mb-3 opacity-50"/>
                    <p className="text-sm font-bold">No students are currently enrolled in this course.</p>
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="w-full text-left rounded-2xl border border-white/5 bg-black/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center">
                          {student.avatar_url ? (
                            <img src={student.avatar_url} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-black text-violet-500">{student.first_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate">{student.first_name} {student.last_name}</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate">{student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t border-white/5 sm:border-0 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right hidden sm:block">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Enrolled</p>
                          <p className="text-xs font-bold text-neutral-300 mt-0.5">{new Date(student.enrolled_at).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border shrink-0 flex items-center gap-1.5 ${
                          student.status === "Completed" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
                        }`}>
                          {student.status === "Completed" ? <CheckCircle2 size={12}/> : <Activity size={12}/>}
                          {student.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: INSTRUCTOR PROFILE */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-base font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4 relative z-10">
                <User size={18} className="text-violet-400"/> Lead Instructor
              </h3>
              
              {course.teacher ? (
                <div className="flex flex-col items-center text-center relative z-10 mt-8">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-neutral-900 border-2 border-white/10 shadow-2xl mb-5 flex items-center justify-center">
                    {course.teacher.avatar_url ? (
                      <img src={course.teacher.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-violet-500">{course.teacher.first_name.charAt(0)}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{course.teacher.first_name} {course.teacher.last_name}</h4>
                  <p className="text-xs text-neutral-500 font-mono mb-4 flex items-center justify-center gap-1"><Mail size={12}/> {course.teacher.email}</p>
                  
                  <Link 
                    href={`/en/admin/manage-teachers/${course.teacher.id}`}
                    className="w-full mt-auto py-4 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-neutral-300 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 text-center"
                  >
                    View Faculty Profile
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <User size={32} className="mx-auto mb-3 opacity-50"/>
                  <p className="text-sm font-bold">No instructor assigned.</p>
                </div>
              )}
            </section>
          </div>

        </div>

      </div>
    </div>
  );
}