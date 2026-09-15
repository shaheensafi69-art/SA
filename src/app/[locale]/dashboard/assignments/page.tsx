"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import { 
  CheckCircle2, ClipboardCheck, FileCheck, Video, 
  MessageSquare, ExternalLink, Loader2, UploadCloud, 
  CalendarDays, CheckCircle, Clock, AlertTriangle, BookOpen, FileText, FileUp, Trophy
} from "lucide-react";

type ClassGroupForAttendance = {
  id: string;
  class_name: string;
  meeting_link: string | null; 
  signal_group_link: string | null; 
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
      const todayDate = new Date().toISOString().split('T')[0];

      // ۱. دریافت لاگ‌های حاضری امروز
      const { data: myLogs } = await supabase
        .from("attendance_logs")
        .select("class_group_id")
        .eq("student_id", userId)
        .eq("session_date", todayDate);
      
      const signedClassIds = myLogs?.map(log => log.class_group_id) || [];

      // ۲. دریافت کلاس‌های ثبت‌نام شده شاگرد
      const { data: enrollments } = await supabase
        .from("class_students")
        .select(`
          class_group_id,
          class_groups (
            id,
            class_name,
            meeting_link,
            signal_group_link
          )
        `)
        .eq("student_id", userId);
        
      if (enrollments) {
        const formattedClasses: ClassGroupForAttendance[] = enrollments.map((item: any) => {
          const cg = Array.isArray(item.class_groups) ? item.class_groups[0] : item.class_groups;
          return {
            id: cg?.id,
            class_name: cg?.class_name || "Unknown Class",
            meeting_link: cg?.meeting_link || null,
            signal_group_link: cg?.signal_group_link || null,
            already_signed: signedClassIds.includes(cg?.id),
          };
        });
        setTodayClasses(formattedClasses);
      }

      // ۳. دریافت تکالیف متصل به دوره‌های فعال
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
          session_date: new Date().toISOString() 
        });

      if (error) throw error;
      setTodayClasses(prev => prev.map(c => c.id === classGroupId ? {...c, already_signed: true} : c));
    } catch (error: any) { 
      alert(`Database Error: ${error.message}`);
    } finally { 
      setSigningId(null); 
    }
  };

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
      const fileUrl = await uploadFileToR2(file, 'assignments');
      
      await supabase.from('assignment_submissions').insert({ 
        assignment_id: assignmentId, 
        student_id: session?.user?.id, 
        file_url: fileUrl 
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
      case "overdue": return "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "submitted": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "graded": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      default: return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto bg-[#030305] font-sans pb-24 lg:pb-12 min-h-screen custom-scrollbar" dir="ltr">
      
      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* ================= HEADER ================= */}
      <header className="px-4 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-2 relative z-10 mb-8 sm:mb-10 max-w-[85rem] mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Hub</span>
        </h1>
        <p className="text-neutral-500 text-xs sm:text-sm font-medium max-w-xl">Sign today's attendance, submit your homework, and track your academic progress smoothly.</p>
      </header>

      <div className="px-4 sm:px-8 max-w-[85rem] mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* ================= 1. ATTENDANCE SECTION ================= */}
        <section className="relative w-full bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/10"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10 border-b border-white/5 pb-4">
            <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-emerald-500/20 to-teal-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Today's Check-in</h2>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Live Classes Roster</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : todayClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {todayClasses.map(cls => (
                <div key={cls.id} className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-emerald-500/30 transition-all hover:bg-white/5">
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen size={14} className="text-neutral-500" />
                      <p className="text-white font-extrabold text-sm sm:text-base truncate">{cls.class_name}</p>
                    </div>
                    
                    {/* لینک‌های هوشمند مایکروسافت تیمز و سیگنال کلاسی */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {cls.meeting_link ? (
                        <a href={cls.meeting_link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold text-red-400 rounded-lg flex items-center gap-1.5 transition-colors">
                          <Video size={12} /> Teams <ExternalLink size={10} />
                        </a>
                      ) : <span className="px-3 py-1.5 bg-white/5 text-[10px] font-bold text-neutral-600 rounded-lg">Teams Locked</span>}

                      {cls.signal_group_link ? (
                        <a href={cls.signal_group_link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-bold text-indigo-400 rounded-lg flex items-center gap-1.5 transition-colors">
                          <MessageSquare size={12} /> Signal <ExternalLink size={10} />
                        </a>
                      ) : <span className="px-3 py-1.5 bg-white/5 text-[10px] font-bold text-neutral-600 rounded-lg">Signal Syncing</span>}
                    </div>
                  </div>

                  {cls.already_signed ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-[11px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-lg w-full sm:w-auto">
                      <CheckCircle2 size={16} /> Signed In
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleSignAttendance(cls.id)}
                      disabled={signingId === cls.id}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      {signingId === cls.id ? (
                        <><Loader2 size={16} className="animate-spin"/> Processing...</>
                      ) : (
                        <><ClipboardCheck size={16} /> Sign Now</>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 bg-white/[0.02] rounded-[1.5rem] border border-dashed border-white/10 relative z-10 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-600 mb-2">
                <CalendarDays size={20} />
              </div>
              <p className="text-neutral-400 text-sm font-bold tracking-wide">No live classes scheduled for today.</p>
              <p className="text-neutral-600 text-xs">Take a break or review your pending assignments.</p>
            </div>
          )}
        </section>

        {/* ================= 2. ASSIGNMENTS SECTION ================= */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shadow-inner shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Homework & Projects</h2>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Academic Tasks</p>
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex items-center bg-[#0a0a0f]/80 p-1.5 rounded-[1rem] border border-white/5 overflow-x-auto shadow-inner w-full md:w-auto mt-2 md:mt-0">
              {(["pending", "submitted", "graded"] as const).map(tabId => (
                <button
                  key={tabId}
                  onClick={() => setFilter(tabId)}
                  className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === tabId 
                    ? "bg-[#C2185B] text-white shadow-[0_0_15px_rgba(194,24,91,0.3)]" 
                    : "text-neutral-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tabId === "pending" ? "To Do" : tabId === "submitted" ? "In Review" : "Graded"}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {[1, 2].map(i => <div key={i} className="h-56 bg-white/[0.02] rounded-[2rem] border border-white/5 animate-pulse"></div>)}
            </div>
          ) : filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {filteredAssignments.map((task) => (
                <div key={task.id} className="relative group bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/20 hover:-translate-y-1 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col gap-6">
                  
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-neutral-400 truncate max-w-[60%] flex items-center gap-1.5">
                      <BookOpen size={10} className="text-amber-500" />
                      {task.course_name}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${getStatusStyle(task.status)}`}>
                      {task.status === "overdue" && <AlertTriangle size={10} />}
                      {task.status === "pending" && <Clock size={10} />}
                      {task.status === "submitted" && <UploadCloud size={10} />}
                      {task.status === "graded" && <CheckCircle size={10} />}
                      {task.status === "overdue" ? "Overdue" : task.status}
                    </span>
                  </div>

                  {/* Task Content */}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors line-clamp-2">{task.title}</h3>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-5">{task.description}</p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                      <CalendarDays size={14} className="text-amber-500/70" />
                      Due: {new Date(task.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Action / Result Area */}
                  <div className="relative z-10 pt-5 sm:pt-6 border-t border-white/5 mt-auto bg-[#0a0a0f]/50 -mx-6 sm:-mx-8 px-6 sm:px-8 pb-1 sm:pb-2">
                    
                    {/* حالت آپلود (Pending / Overdue) */}
                    {(task.status === "pending" || task.status === "overdue") && (
                      <div className="space-y-4">
                        <label className="group/file relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border border-dashed border-white/10 rounded-xl hover:border-amber-500/40 hover:bg-amber-500/5 cursor-pointer transition-all">
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileSelect(task.id, e.target.files?.[0] || null)} />
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover/file:text-amber-500 transition-colors shrink-0">
                            <FileUp size={18} />
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 truncate group-hover/file:text-amber-400">
                            {selectedFile[task.id] ? selectedFile[task.id]?.name : "Select project file to upload"}
                          </span>
                        </label>

                        <button 
                          onClick={() => handleSubmitAssignment(task.id)}
                          disabled={!selectedFile[task.id] || uploadingId === task.id}
                          className="w-full py-3.5 flex items-center justify-center gap-2 bg-[#C2185B] hover:bg-pink-700 text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(194,24,91,0.3)] disabled:opacity-50 disabled:hover:scale-100"
                        >
                          {uploadingId === task.id ? (
                            <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                          ) : (
                            <><UploadCloud size={16} /> Submit Assignment</>
                          )}
                        </button>
                      </div>
                    )}

                    {/* حالت منتظر نمره (Submitted) */}
                    {task.status === "submitted" && (
                      <div className="flex flex-col items-center justify-center py-4 bg-white/[0.02] rounded-xl border border-white/5 gap-2">
                        <Clock className="text-blue-400 animate-pulse" size={20} />
                        <p className="text-[10px] sm:text-xs font-bold text-blue-400">Assignment Under Review</p>
                      </div>
                    )}

                    {/* حالت نمره‌دهی شده (Graded) */}
                    {task.status === "graded" && (
                      <div className="flex flex-row items-center bg-emerald-500/5 rounded-[1.2rem] p-4 sm:p-5 border border-emerald-500/20 gap-4 sm:gap-5">
                        <div className="text-center border-r border-emerald-500/20 pr-4 sm:pr-5 shrink-0">
                          <Trophy size={16} className="text-emerald-500 mx-auto mb-1.5" />
                          <p className="text-2xl sm:text-3xl font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{task.grade}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-500/70 mb-1">Feedback</p>
                          <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed line-clamp-3">"{task.feedback || "Excellent job!"}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0f]/60 p-10 sm:p-16 rounded-[2rem] sm:rounded-[3rem] border border-white/5 text-center shadow-lg flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <CheckCircle size={32} className="text-neutral-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">All caught up!</h3>
              <p className="text-neutral-500 text-xs sm:text-sm font-medium max-w-sm">No {filter} assignments found. Take a rest or prepare for upcoming classes.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}