"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// تعریف تایپ‌ها برای مدیریت یکپارچه اطلاعات
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

export default function AssignmentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [filter, setFilter] = useState<"pending" | "submitted" | "graded">("pending");
  
  // استیت برای مدیریت آپلود فایل
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({});

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;
    const userId = session.user.id;

    try {
      // 1. دریافت دوره‌هایی که شاگرد در آن‌ها ثبت‌نام کرده است
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("course_id, courses(title)")
        .eq("student_id", userId);

      if (!enrollments || enrollments.length === 0) {
        setAssignments([]);
        setIsLoading(false);
        return;
      }

      const courseIds = enrollments.map(e => e.course_id);

      // 2. دریافت تمام تکالیف مربوط به این دوره‌ها
      const { data: allAssignments } = await supabase
        .from("assignments")
        .select("*")
        .in("course_id", courseIds)
        .order("deadline", { ascending: true });

      // 3. دریافت سوابق ارسال (Submissions) این شاگرد
      const { data: submissions } = await supabase
        .from("assignment_submissions")
        .select("*")
        .eq("student_id", userId);

      if (allAssignments) {
        const formatted: AssignmentItem[] = allAssignments.map(task => {
          // پیدا کردن اسم دوره برای این تکلیف
          const enrollment = enrollments.find(e => e.course_id === task.course_id);
          const courseData: any = Array.isArray(enrollment?.courses) ? enrollment?.courses[0] : enrollment?.courses;
          const courseName = courseData?.title || "Unknown Course";

          // بررسی وضعیت ارسال
          const submission = submissions?.find(sub => sub.assignment_id === task.id);
          
          let status: AssignmentItem["status"] = "pending";
          const now = new Date();
          const deadlineDate = new Date(task.deadline);

          if (submission) {
            status = submission.grade ? "graded" : "submitted";
          } else if (deadlineDate < now) {
            status = "overdue";
          }

          return {
            id: task.id,
            course_name: courseName,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status,
            file_url: submission?.file_url,
            grade: submission?.grade,
            feedback: submission?.feedback,
            submitted_at: submission?.submitted_at
          };
        });

        setAssignments(formatted);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setIsLoading(false);
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
    const userId = session?.user?.id;

    try {
      // 1. آپلود فایل در باکت assignments
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${assignmentId}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('assignments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('assignments').getPublicUrl(fileName);
      const fileUrl = publicUrlData.publicUrl;

      // 2. ثبت در جدول assignment_submissions
      const { error: dbError } = await supabase
        .from('assignment_submissions')
        .insert({
          assignment_id: assignmentId,
          student_id: userId,
          file_url: fileUrl,
          // grade و feedback توسط استاد پر می‌شوند، پس اینجا خالی می‌مانند
        });

      if (dbError) throw dbError;

      // رفرش کردن اطلاعات صفحه
      await fetchAssignments();
      setSelectedFile(prev => ({ ...prev, [assignmentId]: null }));

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setUploadingId(null);
    }
  };

  // فیلتر کردن لیست تکالیف بر اساس تب انتخاب شده
  const filteredAssignments = assignments.filter(task => {
    if (filter === "pending") return task.status === "pending" || task.status === "overdue";
    if (filter === "submitted") return task.status === "submitted";
    if (filter === "graded") return task.status === "graded";
    return true;
  });

  return (
    <div className="w-full">
      
      {/* ================= Header (تراز با سایدبار) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Assignments</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Submit your homework and track your grades.</p>
        </div>
      </header>

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 pb-12 max-w-5xl mx-auto">

        {/* ================= تب‌های فیلتر ================= */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {([
            { id: "pending", label: "To Do (Pending)" },
            { id: "submitted", label: "Under Review" },
            { id: "graded", label: "Graded" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
                  : "bg-neutral-900/50 text-neutral-400 border border-white/5 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {tab.label}
              {/* نشان‌دهنده تعداد */}
              <span className={`ml-2 px-2 py-0.5 rounded-md text-xs ${filter === tab.id ? "bg-black/20" : "bg-white/10"}`}>
                {assignments.filter(t => 
                  tab.id === "pending" ? (t.status === "pending" || t.status === "overdue") : t.status === tab.id
                ).length}
              </span>
            </button>
          ))}
        </div>

        {/* ================= لیست تکالیف ================= */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-48 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : filteredAssignments.length > 0 ? (
          <div className="space-y-6">
            {filteredAssignments.map((task) => (
              <div 
                key={task.id} 
                className="bg-neutral-900/40 rounded-[2rem] border border-white/5 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 hover:bg-neutral-900/60 hover:border-yellow-500/30 transition-all shadow-lg"
              >
                {/* اطلاعات سمت چپ */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-neutral-400">
                      {task.course_name}
                    </span>
                    {task.status === "overdue" && (
                      <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">
                        Overdue
                      </span>
                    )}
                    {task.status === "graded" && (
                      <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-bold text-green-400">
                        Grade: {task.grade} / 100
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">{task.title}</h3>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Deadline: {new Date(task.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* اکشن‌ها سمت راست (فرم آپلود یا نتیجه) */}
                <div className="w-full md:w-72 shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                  
                  {/* حالت اول: هنوز سابمیت نکرده */}
                  {(task.status === "pending" || task.status === "overdue") && (
                    <div className="flex flex-col gap-3">
                      <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-xl hover:border-yellow-500/50 hover:bg-yellow-500/5 cursor-pointer transition-all group">
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          onChange={(e) => handleFileSelect(task.id, e.target.files?.[0] || null)}
                        />
                        <svg className="w-6 h-6 text-neutral-500 group-hover:text-yellow-500 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span className="text-xs font-bold text-neutral-400 group-hover:text-yellow-400">
                          {selectedFile[task.id] ? selectedFile[task.id]?.name : "Select Project File"}
                        </span>
                      </label>
                      
                      <button 
                        onClick={() => handleSubmitAssignment(task.id)}
                        disabled={!selectedFile[task.id] || uploadingId === task.id}
                        className="w-full py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:hover:bg-yellow-500 flex items-center justify-center gap-2"
                      >
                        {uploadingId === task.id ? (
                          <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...</>
                        ) : "Submit Assignment"}
                      </button>
                    </div>
                  )}

                  {/* حالت دوم: سابمیت کرده و منتظر نمره است */}
                  {task.status === "submitted" && (
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl h-full">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <p className="text-sm font-bold text-yellow-400">Under Review</p>
                      <p className="text-xs text-neutral-400 mt-1">Instructor is reviewing your file.</p>
                    </div>
                  )}

                  {/* حالت سوم: نمره داده شده */}
                  {task.status === "graded" && (
                    <div className="flex flex-col text-left p-4 bg-white/5 border border-white/10 rounded-xl h-full justify-center">
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-1">Final Grade</p>
                      <p className="text-3xl font-extrabold text-green-400 mb-3">{task.grade} <span className="text-sm text-neutral-500">/ 100</span></p>
                      
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs font-bold text-neutral-300 mb-1">Instructor Feedback:</p>
                        <p className="text-xs text-neutral-400 italic line-clamp-3">"{task.feedback || "Good job!"}"</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/40 p-12 rounded-[2rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-6">📝</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">No {filter} assignments</h3>
            <p className="text-neutral-400 font-medium mb-8">You are all caught up! Keep learning and check back later.</p>
          </div>
        )}

      </div>
    </div>
  );
}