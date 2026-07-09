"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

// تعریف تایپ‌های دقیق بر اساس دیتابیس شما
type ClassGroupForAttendance = {
  id: string;
  class_name: string;
  meeting_link: string | null; // اجازه می‌دهیم لینک خالی باشد
  already_signed: boolean;
};

type AssignmentItem = {
  id: string;
  course_name: string;
  title: string;
  description: string;
  deadline: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  file_url?: string;
  grade?: string | number;
  feedback?: string;
  submitted_at?: string;
};

export default function StudentHubPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [todayClasses, setTodayClasses] = useState<ClassGroupForAttendance[]>([]);
  const [filter, setFilter] = useState<"pending" | "submitted" | "graded">("pending");
  
  // استیت‌های مدیریتی
  const [signingId, setSigningId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;
    const userId = session.user.id;

    try {
      // ==========================================================
      // ۱. دریافت اطلاعات حاضری (Attendance) متصل به دیتابیس واقعی
      // ==========================================================
      const todayDate = new Date().toISOString().split('T')[0];

      // الف) دریافت لاگ‌های حاضری "امروز" برای این "شاگرد"
      const { data: myLogs } = await supabase
        .from("attendance_logs")
        .select("class_group_id")
        .eq("student_id", userId)
        .eq("session_date", todayDate);
      
      const signedClassIds = myLogs?.map(log => log.class_group_id) || [];

      // ب) دریافت کلاس‌های ثبت‌نام شده شاگرد
      const { data: enrollments } = await supabase
        .from("class_students")
        .select(`
          class_group_id,
          class_groups (
            id,
            class_name,
            meeting_link
          )
        `)
        .eq("student_id", userId);
        
      if (enrollments) {
        const formattedClasses: ClassGroupForAttendance[] = enrollments.map((item: any) => {
          const cg = Array.isArray(item.class_groups) ? item.class_groups[0] : item.class_groups;
          return {
            id: cg?.id,
            class_name: cg?.class_name || "Unknown Class",
            meeting_link: cg?.meeting_link || null, // جلوگیری از باگ null
            already_signed: signedClassIds.includes(cg?.id),
          };
        });
        setTodayClasses(formattedClasses);
      }

      // ==========================================================
      // ۲. دریافت اطلاعات تکالیف (Assignments) متصل به دیتابیس
      // ==========================================================
      const { data: assignmentEnrollments } = await supabase
        .from("enrollments")
        .select("course_id, courses(title)")
        .eq("student_id", userId);

      if (assignmentEnrollments && assignmentEnrollments.length > 0) {
        const courseIds = assignmentEnrollments.map(e => e.course_id);
        
        const { data: allAssignments } = await supabase
          .from("assignments")
          .select("*")
          .in("course_id", courseIds)
          .order("deadline", { ascending: true });

        const { data: submissions } = await supabase
          .from("assignment_submissions")
          .select("*")
          .eq("student_id", userId);

        if (allAssignments) {
          const formatted: AssignmentItem[] = allAssignments.map(task => {
            const enrollment = assignmentEnrollments.find(e => e.course_id === task.course_id);
            const courseData: any = Array.isArray(enrollment?.courses) ? enrollment?.courses[0] : enrollment?.courses;
            const courseName = courseData?.title || "Unknown Course";
            const submission = submissions?.find(sub => sub.assignment_id === task.id);
            
            let status: AssignmentItem["status"] = "pending";
            const deadlineDate = new Date(task.deadline);
            if (submission) { status = submission.grade ? "graded" : "submitted"; } 
            else if (deadlineDate < new Date()) { status = "overdue"; }

            return { 
              id: task.id, 
              course_name: courseName, 
              title: task.title, 
              description: task.description, 
              deadline: task.deadline, 
              status, 
              file_url: submission?.file_url, 
              grade: submission?.grade, 
              feedback: submission?.feedback 
            };
          });
          setAssignments(formatted);
        }
      }
    } catch (error) { 
      console.error("Database Error:", error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  // ==========================================================
  // قابلیت امضاء حاضری و ثبت در جدول attendance_logs (با سیستم خطایاب هوشمند)
  // ==========================================================
  const handleSignAttendance = async (classGroupId: string) => {
    setSigningId(classGroupId);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    try {
      const { error } = await supabase
        .from("attendance_logs")
        .insert({
          class_group_id: classGroupId,
          student_id: session?.user?.id,
          status: "present",
          // ارسال کامل تاریخ و زمان برای جلوگیری از ارورهای تایپ دیتابیس
          session_date: new Date().toISOString() 
        });

      // اگر دیتابیس ارور داد، دقیقاً متن ارور را به ما نشان بده!
      if (error) {
        console.error("Supabase Database Error:", error);
        alert(`Database Error: ${error.message}`);
        throw error;
      }

      // آپدیت UI بدون نیاز به رفرش
      setTodayClasses(prev => prev.map(c => c.id === classGroupId ? {...c, already_signed: true} : c));
      
    } catch (error) { 
      console.log("Attendance signature failed.", error);
    } finally { 
      setSigningId(null); 
    }
  };

  // ==========================================================
  // قابلیت انتخاب و آپلود فایل تکلیف
  // ==========================================================
  const handleFileSelect = (assignmentId: string, file: File | null) => {
    setSelectedFile(prev => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmitAssignment = async (assignmentId: string) => {
    const file = selectedFile[assignmentId];
    if (!file) return;
    setUploadingId(assignmentId);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${session?.user?.id}-${assignmentId}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('assignments').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('assignments').getPublicUrl(fileName);
      
      await supabase.from('assignment_submissions').insert({ 
        assignment_id: assignmentId, 
        student_id: session?.user?.id, 
        file_url: publicUrlData.publicUrl 
      });

      await fetchAllData();
      setSelectedFile(prev => ({ ...prev, [assignmentId]: null }));
    } catch (error) { 
      alert("Upload failed."); 
    } finally { 
      setUploadingId(null); 
    }
  };

  const filteredAssignments = assignments.filter(task => {
    if (filter === "pending") return task.status === "pending" || task.status === "overdue";
    return task.status === filter;
  });

  const getStatusStyle = (status: AssignmentItem["status"]) => {
    switch (status) {
      case "overdue": return "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse";
      case "submitted": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "graded": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
      default: return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-10">
      
      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col gap-2 relative z-10 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Hub</span>
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl">Sign today's attendance, submit homework, and track your academic progress.</p>
      </header>

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* ================= 1. ATTENDANCE SECTION (PREMIUM LOOK) ================= */}
        <section className="relative w-full bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.4s_ease-out]">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">✅</div>
            <h2 className="text-2xl font-black text-white tracking-tight">Today's Check-in</h2>
          </div>

          {isLoading ? (
            <div className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>
          ) : todayClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {todayClasses.map(cls => (
                <div key={cls.id} className="bg-black/40 border border-white/5 rounded-3xl p-5 flex items-center justify-between gap-4 hover:border-emerald-500/30 transition-all group">
                  <div className="overflow-hidden flex-1">
                    <p className="text-white font-extrabold truncate">{cls.class_name}</p>
                    
                    {/* 🔥 فیکس ارور Link - بررسی وجود لینک در دیتابیس */}
                    {cls.meeting_link ? (
                      <Link href={cls.meeting_link} target="_blank" className="text-xs text-neutral-500 hover:text-emerald-400 truncate block mt-1 transition-colors">
                        Join Meeting Group 🔗
                      </Link>
                    ) : (
                      <span className="text-xs text-neutral-600 truncate block mt-1">No meeting link provided</span>
                    )}
                  </div>

                  {cls.already_signed ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <span>✓</span> Signed
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleSignAttendance(cls.id)}
                      disabled={signingId === cls.id}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] disabled:opacity-50 shrink-0"
                    >
                      {signingId === cls.id ? "..." : "Sign Now"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500 text-sm bg-black/20 rounded-[2rem] border border-dashed border-white/10 relative z-10 font-bold">
              No live classes scheduled for today.
            </div>
          )}
        </section>

        {/* ================= 2. ASSIGNMENTS SECTION ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white tracking-tight">Homework & Projects</h2>
            
            {/* تب‌های فیلتر کپسولی موبایل‌پسند */}
            <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1.5 rounded-[1.5rem] border border-white/5 overflow-x-auto custom-scrollbar shadow-inner w-full md:w-auto">
              {(["pending", "submitted", "graded"] as const).map(tabId => (
                <button
                  key={tabId}
                  onClick={() => setFilter(tabId)}
                  className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === tabId ? "bg-gradient-to-r from-yellow-400 to-amber-600 text-black shadow-lg scale-100" : "text-neutral-400 hover:text-white scale-95"
                  }`}
                >
                  {tabId === "pending" ? "To Do" : tabId === "submitted" ? "Review" : "Graded"}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="h-48 bg-white/5 rounded-[2.5rem] animate-pulse"></div></div>
          ) : filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAssignments.map((task) => (
                <div key={task.id} className="relative group bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 hover:border-yellow-500/30 hover:-translate-y-2 shadow-xl flex flex-col gap-6">
                  {/* افکت نوری بک‌لایت زمان هاور */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* ردیف بالا: نام کورس و وضعیت */}
                  <div className="flex items-center justify-between gap-4 relative z-10">
                    <span className="px-3.5 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-400 truncate">
                      {task.course_name}
                    </span>
                    <span className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyle(task.status)}`}>
                      {task.status === "overdue" ? "Overdue ⚠️" : task.status}
                    </span>
                  </div>

                  {/* عنوان و توضیحات */}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors">{task.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6">{task.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 pt-5 border-t border-white/5">
                      📅 Deadline: {new Date(task.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  {/* بخش تعاملی (آپلود / نمره) */}
                  <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
                    {(task.status === "pending" || task.status === "overdue") && (
                      <div className="space-y-4">
                        <label className="group/file relative flex items-center gap-4 p-5 border-2 border-dashed border-white/10 rounded-2xl hover:border-yellow-500/50 hover:bg-yellow-500/5 cursor-pointer transition-all">
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileSelect(task.id, e.target.files?.[0] || null)} />
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover/file:text-yellow-500 transition-colors shrink-0">📂</div>
                          <span className="text-xs font-bold text-neutral-400 truncate group-hover/file:text-yellow-400 leading-relaxed">
                            {selectedFile[task.id] ? selectedFile[task.id]?.name : "Tap to select project file (PDF, ZIP, Image)"}
                          </span>
                        </label>
                        <button 
                          onClick={() => handleSubmitAssignment(task.id)}
                          disabled={!selectedFile[task.id] || uploadingId === task.id}
                          className="w-full py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                        >
                          {uploadingId === task.id ? "Uploading File..." : "Submit Assignment 🚀"}
                        </button>
                      </div>
                    )}

                    {task.status === "submitted" && (
                      <div className="text-center py-6 bg-black/40 rounded-2xl border border-white/5 text-sm font-bold text-yellow-400 animate-pulse">Wait for instructor's grade...</div>
                    )}

                    {task.status === "graded" && (
                      <div className="flex flex-row items-center bg-black/40 rounded-[2rem] p-6 border border-white/5 hover:border-emerald-500/30 transition-all gap-6">
                        <div className="text-center border-r border-white/5 pr-6 shrink-0">
                          <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">Grade</p>
                          <p className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{task.grade}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-neutral-300 mb-2">Instructor Feedback:</p>
                          <p className="text-xs text-neutral-400 italic leading-relaxed line-clamp-3">"{task.feedback || "Excellent job!"}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-12 rounded-[3rem] border border-white/5 text-center shadow-lg min-h-[400px] flex flex-col items-center justify-center gap-4">
              <div className="text-6xl mb-4 opacity-80">🎉</div>
              <h3 className="text-2xl font-black text-white">All caught up!</h3>
              <p className="text-neutral-500 font-medium max-w-sm">No {filter} assignments found. Keep up the excellent work and check back later.</p>
            </div>
          )}
        </section>
      </div>

      {/* افکت نوری پس‌زمینه کل صفحه (Global Glow) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
}