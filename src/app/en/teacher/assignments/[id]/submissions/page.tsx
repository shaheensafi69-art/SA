"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, ClipboardCheck, Calendar, Star, FileText, UserCheck, CheckCircle2, AlertCircle, X, Save, MessageSquare, ExternalLink, ShieldAlert } from "lucide-react";

type SubmissionData = {
  submission_id: string;
  student_id: string;
  file_url: string | null;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  // پروفایل شاگرد
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

type AssignmentInfo = {
  title: string;
  description: string;
  deadline: string | null;
  max_score: number;
};

export default function AssignmentSubmissionsPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState<AssignmentInfo | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

  // مدیریت مودال نمره‌دهی
  const [selectedSubmission, setSelectedStudentSubmission] = useState<SubmissionData | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);

  useEffect(() => {
    if (assignmentId) {
      fetchSubmissionsData();
    }
  }, [assignmentId]);

  const fetchSubmissionsData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. دریافت اطلاعات خود تکلیف
      const { data: assignData, error: assignError } = await supabase
        .from("assignments")
        .select("title, description, deadline, max_score")
        .eq("id", assignmentId)
        .single();

      if (assignError) throw assignError;
      setAssignment(assignData);

      // ۲. واکشی اطلاعات از جدول شما (هماهنگ شده با فیلدهای جدید)
      const { data: subData, error: subError } = await supabase
        .from("assignment_submissions")
        .select("id, student_id, file_url, grade, feedback, submitted_at")
        .eq("assignment_id", assignmentId)
        .order("submitted_at", { ascending: false });

      if (subError) throw subError;

      if (subData && subData.length > 0) {
        const studentIds = subData.map(s => s.student_id);

        // ۳. دریافت اطلاعات پروفایل شاگردان
        const { data: profilesData, error: profError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        if (profError) throw profError;

        // ۴. ادغام دیتا
        const formatted = subData.map((sub: any) => {
          const p = profilesData?.find((prof: any) => prof.id === sub.student_id);
          return {
            submission_id: sub.id,
            student_id: sub.student_id,
            file_url: sub.file_url,
            grade: sub.grade,
            feedback: sub.feedback,
            submitted_at: sub.submitted_at,
            first_name: p?.first_name || "Unknown",
            last_name: p?.last_name || "Student",
            email: p?.email || "No Email",
            avatar_url: p?.avatar_url || "",
          };
        });

        setSubmissions(formatted);
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      console.error("Error loading submissions hub:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGradeModal = (sub: SubmissionData) => {
    setSelectedStudentSubmission(sub);
    setGradeInput(sub.grade !== null ? sub.grade.toString() : "");
    setFeedbackInput(sub.feedback || "");
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission || !assignment) return;

    const score = Number(gradeInput);
    if (score > assignment.max_score || score < 0) {
      alert(`Invalid grade. Must be between 0 and ${assignment.max_score}`);
      return;
    }

    setIsSubmittingGrade(true);
    const supabase = createClient();

    try {
      // آپدیت کردن جدول شما
      const { error } = await supabase
        .from("assignment_submissions")
        .update({
          grade: score,
          feedback: feedbackInput.trim() || null,
        })
        .eq("id", selectedSubmission.submission_id);

      if (error) throw error;

      // آپدیت آنی لیست فرانت‌اند
      setSubmissions(prev => prev.map(item => 
        item.submission_id === selectedSubmission.submission_id 
          ? { ...item, grade: score, feedback: feedbackInput.trim() }
          : item
      ));

      setSelectedStudentSubmission(null);
      alert("Grade and feedback submitted successfully!");
    } catch (error: any) {
      alert("Failed to submit grade: " + error.message);
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER & ASSIGNMENT INFO ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <Link href="/en/teacher/assignments" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <ArrowLeft size={14} /> Assignments Terminal
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">{assignment?.title}</h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium max-w-2xl">{assignment?.description}</p>
            </div>
            
            <div className="flex flex-row md:flex-col gap-3 shrink-0">
              <div className="px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Star size={14} className="fill-amber-500" /> Max Score: {assignment?.max_score}
              </div>
              <div className="px-4 py-2.5 bg-white/5 border border-white/5 text-neutral-400 rounded-xl text-xs font-mono flex items-center gap-2">
                <Calendar size={14} /> Due: {assignment?.deadline ? new Date(assignment.deadline).toLocaleDateString() : "No Deadline"}
              </div>
            </div>
          </div>
        </header>

        {/* ================= SUBMISSIONS TABLE LAYOUT ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
              <ClipboardCheck size={16} /> Received Submissions ({submissions.length})
            </h3>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] sm:text-[11px] font-black text-neutral-500 uppercase tracking-widest">
                  <th className="p-6">Student Profile</th>
                  <th className="p-6">Submission Date</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-center">Grade Point</th>
                  <th className="p-6 text-right">Review Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                        <ShieldAlert size={48} className="text-neutral-600" />
                        <p className="text-neutral-400 text-sm font-bold">No student submissions received for this assignment yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => {
                    // وضعیت بر اساس نمره محاسبه می‌شود
                    const isGraded = sub.grade !== null;

                    return (
                      <tr key={sub.submission_id} className="hover:bg-white/[0.02] transition-colors group">
                        
                        <td className="p-5 sm:p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                              {sub.avatar_url ? (
                                <img src={sub.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-lg font-black text-fuchsia-500">{sub.first_name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-black text-white text-base">{sub.first_name} {sub.last_name}</p>
                              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{sub.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-5 sm:p-6 font-mono text-xs text-neutral-300">
                          {new Date(sub.submitted_at).toLocaleString()}
                        </td>

                        <td className="p-5 sm:p-6 text-center">
                          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1.5 ${
                            isGraded 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)] animate-pulse"
                          }`}>
                            {isGraded ? "Graded" : "Pending Review"}
                          </span>
                        </td>

                        <td className="p-5 sm:p-6 text-center font-black text-sm">
                          {isGraded ? (
                            <span className="text-amber-400 font-mono text-base">{sub.grade} <span className="text-neutral-600 text-xs font-normal">/ {assignment?.max_score}</span></span>
                          ) : (
                            <span className="text-neutral-600 font-mono">-</span>
                          )}
                        </td>

                        <td className="p-5 sm:p-6 text-right">
                          <button
                            onClick={() => handleOpenGradeModal(sub)}
                            className="px-4 py-2.5 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 hover:from-fuchsia-600 hover:to-purple-600 border border-fuchsia-500/20 hover:border-transparent text-xs font-black uppercase tracking-widest text-neutral-200 hover:text-white rounded-xl transition-all active:scale-95 ml-auto shadow-md"
                          >
                            Evaluate Task
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: SUBMISSION REVIEW & GRADING ==================== */}
      {/* ========================================================================= */}
      {selectedSubmission && assignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md" onClick={() => setSelectedStudentSubmission(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/50 shrink-0 flex justify-between items-start relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  {selectedSubmission.avatar_url ? (
                    <img src={selectedSubmission.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-black text-fuchsia-500">{selectedSubmission.first_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Evaluate Work: {selectedSubmission.first_name} {selectedSubmission.last_name}</h2>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">Submitted at: {new Date(selectedSubmission.submitted_at).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudentSubmission(null)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveGrade} className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508] space-y-6">
              
              {/* Student's Uploaded Attachment File URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Student's Submitted File</label>
                {selectedSubmission.file_url ? (
                  <a 
                    href={selectedSubmission.file_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 border border-fuchsia-500/10 text-fuchsia-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span className="flex items-center gap-2"><FileText size={18}/> View Uploaded Attachment</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="p-5 bg-neutral-900 border border-white/5 text-neutral-500 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-not-allowed">
                    <AlertCircle size={16}/> No file attached to this submission
                  </div>
                )}
              </div>

              {/* Grading Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-white/5">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Award Points *</label>
                  <div className="relative">
                    <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input 
                      required type="number" min="0" max={assignment.max_score} placeholder="0"
                      value={gradeInput} onChange={(e) => setGradeInput(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-16 py-4 text-amber-400 text-xl font-black focus:outline-none focus:border-amber-500/50 shadow-inner text-center" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-neutral-600 uppercase">/ {assignment.max_score}</span>
                  </div>
                </div>

                {/* Feedback Input */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Teacher Feedback (Optional)</label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-5 text-neutral-500" />
                    <textarea 
                      rows={2} placeholder="Type your constructive comments here..."
                      value={feedbackInput} onChange={(e) => setFeedbackInput(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 resize-none shadow-inner" 
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex gap-3">
                <button type="button" onClick={() => setSelectedStudentSubmission(null)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-xl text-xs font-black uppercase tracking-widest transition-colors active:scale-95">Cancel</button>
                <button type="submit" disabled={isSubmittingGrade} className="flex-[2] py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(217,70,239,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95">
                  {isSubmittingGrade ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Evaluation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}