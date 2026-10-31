"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Users, DollarSign, BookOpen, GraduationCap, 
  CheckCircle2, User, Mail, Calendar, Activity, ShieldAlert, Award, 
  Search, ToggleLeft, ToggleRight, Radio, Tag, Globe, ExternalLink, 
  Sparkles, Layers, ChevronRight 
} from "lucide-react";

type TeacherInfo = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
};

type CourseClassGroup = {
  id: string;
  class_name: string;
  is_active: boolean;
  class_time: string | null;
  class_days: string | null;
  created_at: string;
};

type CourseDetail = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  language: string | null;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  created_at: string;
  instructor_name: string | null;
  instructor_bio: string | null;
  instructor_image_url: string | null;
  instructor_2_name: string | null;
  instructor_2_bio: string | null;
  instructor_2_image_url: string | null;
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
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  
  // Safe param extraction for Next.js 15
  const courseId = (params?.courseid || params?.courseId || params?.id) as string;

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [classes, setClasses] = useState<CourseClassGroup[]>([]);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (courseId) fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Fetch course details and lead teacher
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

      // 2. Fetch associated class cohorts
      const { data: classesData } = await supabase
        .from("class_groups")
        .select("id, class_name, is_active, class_time, class_days, created_at")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (classesData) {
        setClasses(classesData);
      }

      // 3. Extract unique enrolled scholars from all cohorts of this course
      if (classesData && classesData.length > 0) {
        const classIds = classesData.map(c => c.id);

        const { data: classStudents } = await supabase
          .from("class_students")
          .select("student_id, created_at")
          .in("class_group_id", classIds);

        if (classStudents && classStudents.length > 0) {
          const uniqueStudentMap = new Map();
          classStudents.forEach(cs => {
            if (!uniqueStudentMap.has(cs.student_id)) {
              uniqueStudentMap.set(cs.student_id, cs.created_at);
            }
          });

          const studentIds = Array.from(uniqueStudentMap.keys());

          // 4. Fetch profiles
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, email, avatar_url")
            .in("id", studentIds);

          // 5. Check certificates for completed status
          const { data: certificates } = await supabase
            .from("certificates")
            .select("student_id")
            .eq("course_id", courseId);

          const completedStudentIds = new Set(certificates?.map(cert => cert.student_id));

          if (profiles) {
            const finalStudentsList: EnrolledStudent[] = profiles.map(profile => ({
              ...profile,
              enrolled_at: uniqueStudentMap.get(profile.id),
              status: completedStudentIds.has(profile.id) ? "Completed" : "Active"
            }));
            
            finalStudentsList.sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime());
            setStudents(finalStudentsList);
          }
        } else {
          setStudents([]);
        }
      } else {
        setStudents([]);
      }

    } catch (error: any) {
      console.error("Error fetching course details:", error);
      setFeedback({ text: error.message || "Failed to load course details", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!course) return;
    setIsTogglingPublish(true);
    setFeedback(null);
    const supabase = createClient();

    try {
      const nextStatus = !course.is_published;
      const { error } = await supabase
        .from("courses")
        .update({ is_published: nextStatus })
        .eq("id", course.id);

      if (error) throw error;

      setCourse({ ...course, is_published: nextStatus });
      setFeedback({
        text: nextStatus ? "Course published live to academy catalogue!" : "Course moved to draft mode.",
        type: "success"
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Failed to toggle status", type: "error" });
    } finally {
      setIsTogglingPublish(false);
    }
  };

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const query = searchQuery.toLowerCase().trim();
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
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.compilingCourseAnalytics}
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">{t.adminPages.courseNotFound}</h2>
        <p className="text-neutral-500 mb-6">{t.adminPages.courseNotFoundDesc}</p>
        <Link href={`/${currentLocale}/admin/courses`} className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">
          {t.adminPages.returnToLibrary}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER & COURSE COVER ================= */}
        <section className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Course Thumbnail */}
          <div className="w-full lg:w-[380px] aspect-video rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden relative shrink-0 shadow-2xl group">
            {course.thumbnail_url ? (
              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 flex items-center justify-center">
                <BookOpen size={64} className="text-white/20" />
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border ${
                course.is_published ? "bg-emerald-500/90 text-white border-emerald-400" : "bg-black/90 text-amber-300 border-amber-500/40"
              }`}>
                {course.is_published ? "Published Live" : "Draft Mode"}
              </span>
            </div>

            {course.category && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-black/70 text-neutral-300 border border-white/10 backdrop-blur-md">
                  {course.category}
                </span>
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="relative z-10 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <Link href={`/${currentLocale}/admin/courses`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ArrowLeft size={14} /> Back to Courses
              </Link>

              {/* Status Toggle Button */}
              <button
                type="button"
                disabled={isTogglingPublish}
                onClick={handleTogglePublish}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all flex items-center gap-2 shadow-lg active:scale-95 ${
                  course.is_published 
                    ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {isTogglingPublish ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : course.is_published ? (
                  <><ToggleLeft size={16} /> Switch to Draft</>
                ) : (
                  <><ToggleRight size={16} /> Publish Now</>
                )}
              </button>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3 leading-tight">{course.title}</h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-2xl leading-relaxed mb-6">
              {course.description || "No specific curriculum description provided for this course."}
            </p>

            {/* Badges / Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2 shadow-inner">
                <DollarSign size={16} className={course.price > 0 ? "text-emerald-400" : "text-amber-400"}/>
                <span className="font-black text-white">{course.price > 0 ? `$${course.price}` : "Free Course"}</span>
              </div>
              
              {course.language && (
                <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2 shadow-inner">
                  <Globe size={15} className="text-violet-400"/>
                  <span className="text-xs font-bold text-neutral-300">{course.language}</span>
                </div>
              )}

              <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2 shadow-inner">
                <Calendar size={15} className="text-neutral-500"/>
                <span className="text-xs font-bold text-neutral-300 font-mono">Created: {new Date(course.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </section>

        {feedback && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out] backdrop-blur-md ${
            feedback.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* ================= METRICS GRID ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-violet-500/10 text-violet-400 rounded-xl flex items-center justify-center mb-4"><Users size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{t.adminPages.totalEnrolled}</p>
            <p className="text-3xl font-black text-white font-mono">{stats.total}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4"><Activity size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{t.adminPages.currentlyStudying}</p>
            <p className="text-3xl font-black text-white font-mono">{stats.active}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5"></div>
            <div className="relative z-10 w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20"><Award size={20}/></div>
            <p className="relative z-10 text-[10px] font-black text-emerald-500/70 uppercase tracking-widest mb-1">{t.adminPages.completedAndCertified}</p>
            <p className="relative z-10 text-3xl font-black text-emerald-400 font-mono">{stats.completed}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-4"><DollarSign size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{t.adminPages.estimatedRevenue}</p>
            <p className="text-3xl font-black text-white font-mono">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* ================= 2 COLUMN LAYOUT ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-[1.3fr_0.7fr]">
          
          {/* LEFT: ENROLLED STUDENTS LIST & CLASS COHORTS */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            
            {/* Cohorts attached to this course */}
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers size={20} className="text-violet-400" /> Active Class Cohorts ({classes.length})
                </h3>
              </div>

              {classes.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs font-bold border border-dashed border-white/5 rounded-2xl">
                  No class cohorts have been formed for this course yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {classes.map(cls => (
                    <Link
                      key={cls.id}
                      href={`/${currentLocale}/admin/classes/${cls.id}`}
                      className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">{cls.class_name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          {cls.class_days || "Mon, Wed"} • {cls.class_time || "TBD"}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-neutral-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Enrolled Students Roster */}
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl flex-1 flex flex-col">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <GraduationCap size={22} className="text-violet-400"/> Cohort Roster ({students.length})
                </h3>
                
                {/* Search in List */}
                <div className="bg-black/40 p-2 rounded-2xl border border-white/5 flex items-center gap-2 w-full sm:max-w-xs shadow-inner">
                  <div className="pl-3 text-neutral-500"><Search size={14} /></div>
                  <input 
                    type="text" placeholder={t.adminPages.findStudentPlaceholder}
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-white text-xs focus:outline-none py-2 pr-3 font-medium placeholder:text-neutral-600"
                  />
                </div>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                    <Users size={32} className="mb-3 opacity-50"/>
                    <p className="text-sm font-bold">{t.adminPages.noStudentsEnrolledCourse}</p>
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
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t.adminPages.enrolled}</p>
                          <p className="text-xs font-bold text-neutral-300 mt-0.5 font-mono">{new Date(student.enrolled_at).toLocaleDateString()}</p>
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
                <User size={18} className="text-violet-400"/> Lead Faculty
              </h3>
              
              {course.teacher ? (
                <div className="flex flex-col items-center text-center relative z-10 mt-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-neutral-900 border-2 border-white/10 shadow-2xl mb-5 flex items-center justify-center">
                    {course.teacher.avatar_url ? (
                      <img src={course.teacher.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-violet-500">{course.teacher.first_name.charAt(0)}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{course.teacher.first_name} {course.teacher.last_name}</h4>
                  <p className="text-xs text-neutral-500 font-mono mb-4 flex items-center justify-center gap-1">
                    <Mail size={12}/> {course.teacher.email}
                  </p>

                  {course.instructor_bio && (
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                      {course.instructor_bio}
                    </p>
                  )}
                  
                  <Link 
                    href={`/${currentLocale}/admin/manage-teachers/${course.teacher.id}`}
                    className="w-full mt-auto py-4 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-neutral-300 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> View Faculty Profile
                  </Link>
                </div>
              ) : course.instructor_name ? (
                <div className="flex flex-col items-center text-center relative z-10 mt-6">
                  <div className="w-20 h-20 rounded-3xl bg-neutral-800 border border-white/10 flex items-center justify-center mb-4 text-violet-400 font-bold text-2xl">
                    {course.instructor_name.charAt(0)}
                  </div>
                  <h4 className="text-lg font-black text-white">{course.instructor_name}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{course.instructor_bio || "Academy Instructor"}</p>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <User size={32} className="mx-auto mb-3 opacity-50"/>
                  <p className="text-sm font-bold">{t.adminPages.noInstructorAssigned}</p>
                </div>
              )}

              {/* Co-Instructor display if present */}
              {course.instructor_2_name && (
                <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-3">Co-Instructor</span>
                  <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-violet-400">
                      {course.instructor_2_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{course.instructor_2_name}</p>
                      <p className="text-[10px] text-neutral-400 line-clamp-1">{course.instructor_2_bio || "Faculty Member"}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
