"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Users, Clock, CalendarDays, 
  BookOpen, ShieldAlert, Radio, CheckCircle2, 
  User, Mail, Sparkles, Plus, LockKeyhole, Video, 
  MessageCircle, Edit3, X, Trash2, Search, ExternalLink,
  Save, AlertCircle
} from "lucide-react";

type ClassDetail = {
  id: string;
  course_id: string;
  class_name: string;
  is_active: boolean;
  created_at: string;
  start_date: string | null;
  class_time: string | null;
  class_days: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  course: { id: string; title: string } | null;
  teacher: { id: string; first_name: string; last_name: string; email: string; avatar_url: string | null } | null;
};

type EnrolledStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
  joined_at: string;
  is_paid: boolean;
};

export default function AdminClassDetailsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  
  // Safe param extraction for Next.js 15
  const classId = (params?.classid || params?.classId || params?.id) as string;

  const [isLoading, setIsLoading] = useState(true);
  const [classData, setClassData] = useState<ClassDetail | null>(null);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentFilter, setStudentFilter] = useState<"ALL" | "PAID" | "UNPAID">("ALL");

  // Edit Cohort Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    class_name: "",
    class_time: "",
    class_days: "",
    meeting_link: "",
    signal_group_link: "",
    is_active: true
  });
  const [isSavingCohort, setIsSavingCohort] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (classId) {
      fetchClassDetails();
    } else {
      setIsLoading(false);
    }
  }, [classId]);

  const fetchClassDetails = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Fetch class cohort with joined course and teacher
      const { data: clsData, error: clsError } = await supabase
        .from("class_groups")
        .select(`
          *,
          course:courses(id, title),
          teacher:profiles!teacher_id(id, first_name, last_name, email, avatar_url)
        `)
        .eq("id", classId)
        .single();

      if (clsError) throw clsError;
      
      const teacherObj = Array.isArray(clsData.teacher) ? clsData.teacher[0] : clsData.teacher;
      const courseObj = Array.isArray(clsData.course) ? clsData.course[0] : clsData.course;
      
      const loadedClass: ClassDetail = { 
        ...clsData, 
        teacher: teacherObj, 
        course: courseObj,
      };
      
      setClassData(loadedClass);
      setEditForm({
        class_name: loadedClass.class_name || "",
        class_time: loadedClass.class_time || "",
        class_days: loadedClass.class_days || "",
        meeting_link: loadedClass.meeting_link || "",
        signal_group_link: loadedClass.signal_group_link || "",
        is_active: loadedClass.is_active
      });

      // 2. Fetch enrolled students
      const { data: classStudentsData, error: csError } = await supabase
        .from("class_students")
        .select("student_id, joined_at, is_paid")
        .eq("class_group_id", classId);

      if (csError) throw csError;

      if (classStudentsData && classStudentsData.length > 0) {
        const studentIds = classStudentsData.map(cs => cs.student_id);

        const { data: profilesData, error: profError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        if (profError) throw profError;

        if (profilesData) {
          const formattedStudents: EnrolledStudent[] = profilesData.map(profile => {
            const enrollmentInfo = classStudentsData.find(cs => cs.student_id === profile.id);
            return {
              id: profile.id,
              first_name: profile.first_name || "Unknown",
              last_name: profile.last_name || "",
              email: profile.email || "",
              avatar_url: profile.avatar_url,
              joined_at: enrollmentInfo?.joined_at || new Date().toISOString(),
              is_paid: enrollmentInfo?.is_paid ?? false
            };
          });
          
          formattedStudents.sort((a, b) => (a.is_paid === b.is_paid) ? 0 : a.is_paid ? 1 : -1);
          setStudents(formattedStudents);
        }
      } else {
        setStudents([]);
      }

    } catch (error: any) {
      console.error("Error fetching class details:", error);
      setFeedback({ text: error.message || "Failed to load class details", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStudentPaymentStatus = async (studentId: string, currentStatus: boolean) => {
    const supabase = createClient();
    const newStatus = !currentStatus;
    setActionLoadingId(studentId);

    try {
      const { error } = await supabase
        .from("class_students")
        .update({ is_paid: newStatus })
        .eq("class_group_id", classId)
        .eq("student_id", studentId);

      if (error) throw error;

      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, is_paid: newStatus } : s));
      setFeedback({
        text: newStatus ? "Student marked as PAID / ACTIVE" : "Student marked as LOCKED / UNPAID",
        type: "success"
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error: any) {
      setFeedback({ text: "Failed to update status: " + error.message, type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDisenrollStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to remove ${studentName} from this class cohort?`)) return;

    setActionLoadingId(studentId);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("class_students")
        .delete()
        .eq("class_group_id", classId)
        .eq("student_id", studentId);

      if (error) throw error;

      setStudents(prev => prev.filter(s => s.id !== studentId));
      setFeedback({ text: `${studentName} removed from cohort roster.`, type: "success" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error: any) {
      setFeedback({ text: "Failed to remove student: " + error.message, type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleUpdateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classData) return;

    setIsSavingCohort(true);
    setFeedback(null);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("class_groups")
        .update({
          class_name: editForm.class_name.trim() || classData.class_name,
          class_time: editForm.class_time.trim() || null,
          class_days: editForm.class_days.trim() || null,
          meeting_link: editForm.meeting_link.trim() || null,
          signal_group_link: editForm.signal_group_link.trim() || null,
          is_active: editForm.is_active
        })
        .eq("id", classId);

      if (error) throw error;

      setClassData({
        ...classData,
        class_name: editForm.class_name.trim() || classData.class_name,
        class_time: editForm.class_time.trim() || null,
        class_days: editForm.class_days.trim() || null,
        meeting_link: editForm.meeting_link.trim() || null,
        signal_group_link: editForm.signal_group_link.trim() || null,
        is_active: editForm.is_active
      });

      setIsEditModalOpen(false);
      setFeedback({ text: "Cohort settings successfully updated!", type: "success" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error: any) {
      setFeedback({ text: "Failed to update cohort: " + error.message, type: "error" });
    } finally {
      setIsSavingCohort(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (studentFilter === "PAID" && !s.is_paid) return false;
      if (studentFilter === "UNPAID" && s.is_paid) return false;

      if (studentSearch.trim()) {
        const q = studentSearch.toLowerCase().trim();
        const matchesName = `${s.first_name} ${s.last_name}`.toLowerCase().includes(q);
        const matchesEmail = s.email.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [students, studentSearch, studentFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin shadow-[0_0_15px_rgba(244,63,94,0.5)] rounded-full" />
        <p className="text-rose-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.loadingCohortInfo}
        </p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-2xl font-black text-white mb-2">{t.adminPages.cohortNotFound}</h2>
        <p className="text-neutral-500 mb-8 font-medium">{t.adminPages.cohortNotFoundDesc}</p>
        <Link href={`/${currentLocale}/admin/classes`} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          Return to Cohorts
        </Link>
      </div>
    );
  }

  const isNew = (new Date().getTime() - new Date(classData.created_at).getTime()) / (1000 * 3600 * 24) <= 10;

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Glow Effects */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= CLASS OVERVIEW HEADER ================= */}
        <section className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-start gap-6 border-b border-white/5 pb-8 mb-8">
            <div>
              <Link href={`/${currentLocale}/admin/classes`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-6 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
                <ArrowLeft size={14} /> Back to Cohorts
              </Link>
              
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">{classData.class_name}</h1>
                {isNew && (
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                    <Sparkles size={10}/> NEW
                  </span>
                )}
              </div>

              {classData.course && (
                <Link 
                  href={`/${currentLocale}/admin/courses/${classData.course.id}`}
                  className="text-sm font-bold text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-2 group w-fit"
                >
                  <BookOpen size={16} className="text-rose-500/70" /> 
                  <span>{classData.course.title}</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-lg ${
                classData.is_active ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "bg-black/60 text-neutral-300 border-white/10"
              }`}>
                {classData.is_active ? <Radio size={14} className="animate-pulse"/> : <CheckCircle2 size={14}/>}
                {classData.is_active ? t.adminClasses.liveInProgress : t.adminClasses.completedCohort}
              </span>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-1.5 active:scale-95 shadow-md"
              >
                <Edit3 size={14} /> Edit Cohort
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center hover:bg-white/5 transition-colors">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><Clock size={12} className="text-rose-400"/> {t.adminPages.time}</p>
              <p className="text-base font-bold text-white font-mono">{classData.class_time || "18:00 PM - 20:00 PM"}</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center hover:bg-white/5 transition-colors">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><CalendarDays size={12} className="text-rose-400"/> {t.adminPages.days}</p>
              <p className="text-sm font-bold text-white">{classData.class_days || "Monday, Wednesday, Friday"}</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center hover:bg-white/5 transition-colors">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><CalendarDays size={12} className="text-rose-400"/> {t.adminClasses.createdOn}</p>
              <p className="text-sm font-bold text-white font-mono">{new Date(classData.created_at).toLocaleDateString()}</p>
            </div>
            <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-2xl flex flex-col justify-center border-l-2 border-l-rose-500 shadow-[inset_10px_0_20px_rgba(244,63,94,0.05)]">
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2 flex items-center gap-1.5"><Users size={12}/> {t.adminClasses.enrolled}</p>
              <p className="text-2xl font-black text-white font-mono">{students.length} Scholars</p>
            </div>
          </div>

          {/* Meeting & Signal Group Link Badges */}
          {(classData.meeting_link || classData.signal_group_link) && (
            <div className="relative z-10 flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/5">
              {classData.meeting_link && (
                <a
                  href={classData.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Video size={14} /> Join Live Classroom <ExternalLink size={12} />
                </a>
              )}
              {classData.signal_group_link && (
                <a
                  href={classData.signal_group_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <MessageCircle size={14} /> Signal / Telegram Group <ExternalLink size={12} />
                </a>
              )}
            </div>
          )}
        </section>

        {feedback && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out] backdrop-blur-md ${
            feedback.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-[1.3fr_0.7fr]">
          
          {/* ================= LEFT: STUDENTS LIST ================= */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Users size={22} className="text-rose-500"/> {t.adminClasses.studentRoster} ({students.length})
                </h3>
                
                <Link 
                  href={`/${currentLocale}/admin/classes/${classId}/add-student`}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                >
                  <Plus size={16} /> {t.adminClasses.enrollNewStudent}
                </Link>
              </div>

              {/* Search & Filter Bar */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-4">
                <div className="relative flex-1 w-full">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search enrolled scholars..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto">
                  {(["ALL", "PAID", "UNPAID"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setStudentFilter(tab)}
                      className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        studentFilter === tab 
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500">
                    <Users size={32} className="mx-auto mb-3 opacity-50"/>
                    <p className="text-sm font-bold">{t.adminPages.noStudentsEnrolledClass}</p>
                  </div>
                ) : (
                  filteredStudents.map((student) => {
                    const isBusy = actionLoadingId === student.id;

                    return (
                      <div key={student.id} className={`w-full text-left rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                        student.is_paid ? 'bg-black/40 border-white/5 hover:border-white/10' : 'bg-rose-950/10 border-rose-500/20 hover:border-rose-500/40'
                      }`}>
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center">
                            {student.avatar_url ? (
                              <img src={student.avatar_url} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-black text-rose-500">{student.first_name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-sm truncate">{student.first_name} {student.last_name}</p>
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate">{student.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                          <div className="text-left sm:text-right hidden sm:block">
                            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t.adminClasses.joined}</p>
                            <p className="text-xs font-bold text-neutral-300 mt-0.5 font-mono">{new Date(student.joined_at).toLocaleDateString()}</p>
                          </div>
                          
                          {/* Payment status toggle button */}
                          <button
                            disabled={isBusy}
                            onClick={() => toggleStudentPaymentStatus(student.id, student.is_paid)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all flex items-center gap-1.5 min-w-[110px] justify-center ${
                              student.is_paid 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                            }`}
                          >
                            {isBusy ? <Loader2 size={12} className="animate-spin" /> : student.is_paid ? <CheckCircle2 size={12}/> : <LockKeyhole size={12}/>}
                            {student.is_paid ? 'PAID / ACTIVE' : 'LOCKED (UNPAID)'}
                          </button>

                          {/* Disenroll Button */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleDisenrollStudent(student.id, `${student.first_name} ${student.last_name}`)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                            title="Remove student from cohort"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          {/* ================= RIGHT: INSTRUCTOR INFO ================= */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-base font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4 relative z-10">
                <User size={18} className="text-rose-400"/> Cohort Instructor
              </h3>
              
              {classData.teacher ? (
                <div className="flex flex-col items-center text-center relative z-10 mt-8">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-neutral-900 border-2 border-white/10 shadow-2xl mb-5 flex items-center justify-center">
                    {classData.teacher.avatar_url ? (
                      <img src={classData.teacher.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-rose-500">{classData.teacher.first_name.charAt(0)}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{classData.teacher.first_name} {classData.teacher.last_name}</h4>
                  <p className="text-xs text-neutral-500 font-mono mb-6 flex items-center justify-center gap-1">
                    <Mail size={12}/> {classData.teacher.email}
                  </p>
                  
                  <Link 
                    href={`/${currentLocale}/admin/manage-teachers/${classData.teacher.id}`}
                    className="w-full mt-auto py-4 bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-neutral-300 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> View Faculty Profile
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500 mt-auto mb-auto">
                  <User size={32} className="mx-auto mb-3 opacity-50"/>
                  <p className="text-sm font-bold">{t.adminPages.noInstructorAssigned}</p>
                </div>
              )}
            </section>
          </div>

        </div>
      </div>

      {/* ================= MODAL: EDIT COHORT DETAILS ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Edit3 size={18} className="text-rose-400" /> Edit Cohort Settings
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateCohort} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Cohort Name</label>
                <input
                  type="text"
                  required
                  value={editForm.class_name}
                  onChange={(e) => setEditForm({ ...editForm, class_name: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-rose-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Schedule Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 18:00 - 20:00"
                    value={editForm.class_time}
                    onChange={(e) => setEditForm({ ...editForm, class_time: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-rose-500/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Schedule Days</label>
                  <input
                    type="text"
                    placeholder="e.g. Mon, Wed, Fri"
                    value={editForm.class_days}
                    onChange={(e) => setEditForm({ ...editForm, class_days: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-rose-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                  <Video size={12} className="text-rose-400" /> Meeting URL (Zoom / Google Meet)
                </label>
                <input
                  type="url"
                  placeholder="https://zoom.us/j/..."
                  value={editForm.meeting_link}
                  onChange={(e) => setEditForm({ ...editForm, meeting_link: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-rose-500/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                  <MessageCircle size={12} className="text-purple-400" /> Comms Group URL (Signal / Telegram)
                </label>
                <input
                  type="url"
                  placeholder="https://t.me/..."
                  value={editForm.signal_group_link}
                  onChange={(e) => setEditForm({ ...editForm, signal_group_link: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-rose-500/50"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.is_active}
                    onChange={() => setEditForm({ ...editForm, is_active: !editForm.is_active })}
                    className="w-4 h-4 rounded border-white/20 text-rose-500 bg-black cursor-pointer"
                  />
                  <span className="text-xs font-bold text-neutral-300">Cohort is currently active & in progress</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCohort}
                  className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingCohort ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
