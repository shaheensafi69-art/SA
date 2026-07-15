"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Star, Loader2, UserCheck, CalendarDays, FileText, Save, Settings2, X, Mail, Phone, MapPin, Calendar, CreditCard, UserCircle } from "lucide-react";

type EnrolledStudent = {
  record_id: string; 
  student_id: string;
  joined_at: string;
  // پروفایل کامل
  first_name: string;
  last_name: string;
  father_name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  country: string;
  avatar_url: string;
  total_score: number;
  wallet_balance: number;
  bio: string;
};

export default function ClassStudentsManagePage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [className, setClassName] = useState("Loading Class...");
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);
  
  // مدیریت مودال مشخصات کامل (Manage Modal)
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudent | null>(null);
  
  // استیت‌های امتیاز دهی
  const [scoreToAdd, setScoreToAdd] = useState("");
  const [isScoring, setIsScoring] = useState(false);

  // استیت‌های حضور و غیاب
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isLoggingAttendance, setIsLoggingAttendance] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    session_date: new Date().toISOString().split('T')[0],
    status: "Present",
    notes: ""
  });

  useEffect(() => {
    if (classId) {
      fetchClassData();
    }
  }, [classId]);

  const fetchClassData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // 1. دریافت نام کلاس
      const { data: classData } = await supabase
        .from("class_groups")
        .select("class_name")
        .eq("id", classId)
        .single();
        
      if (classData) setClassName(classData.class_name);

      // 🔥 ۲. رفع قطعی ارور 400: اول فقط آی‌دی شاگردان کلاس را می‌گیریم
      const { data: studentsData, error: studentsError } = await supabase
        .from("class_students")
        .select("id, student_id, joined_at")
        .eq("class_group_id", classId)
        .order("joined_at", { ascending: false });

      if (studentsError) throw studentsError;

      if (studentsData && studentsData.length > 0) {
        // استخراج تمام آی‌دی‌ها برای گرفتن پروفایل
        const studentIds = studentsData.map(s => s.student_id);

        // 🔥 ۳. حالا اطلاعات پروفایل‌ها را جداگانه می‌گیریم تا دیتابیس Join ارور ندهد
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, father_name, date_of_birth, email, phone_number, country, avatar_url, total_score, wallet_balance, bio")
          .in("id", studentIds);

        if (profilesError) throw profilesError;

        // ۴. ترکیب اطلاعات (Merge)
        const formatted = studentsData.map((item: any) => {
          const p = profilesData?.find((profile: any) => profile.id === item.student_id);
          
          return {
            record_id: item.id,
            student_id: item.student_id,
            joined_at: item.joined_at,
            first_name: p?.first_name || "Unknown",
            last_name: p?.last_name || "",
            father_name: p?.father_name || "Not specified",
            date_of_birth: p?.date_of_birth || "Not specified",
            email: p?.email || "No email",
            phone_number: p?.phone_number || "No phone",
            country: p?.country || "Not specified",
            avatar_url: p?.avatar_url || "",
            total_score: p?.total_score || 0,
            wallet_balance: p?.wallet_balance || 0,
            bio: p?.bio || "No biography provided.",
          };
        });
        
        setEnrolledStudents(formatted);
      } else {
        setEnrolledStudents([]);
      }
    } catch (error) {
      console.error("Error fetching class students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveStudent = async () => {
    if (!selectedStudent) return;
    if (!confirm(`Are you sure you want to remove ${selectedStudent.first_name} from this cohort?`)) return;

    const supabase = createClient();
    try {
      const { error } = await supabase.from("class_students").delete().eq("id", selectedStudent.record_id);
      if (error) throw error;
      
      setEnrolledStudents(prev => prev.filter(s => s.record_id !== selectedStudent.record_id));
      setSelectedStudent(null); 
    } catch (error: any) {
      alert("Failed to remove student: " + error.message);
    }
  };

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !scoreToAdd) return;

    setIsScoring(true);
    const supabase = createClient();
    const newTotalScore = selectedStudent.total_score + Number(scoreToAdd);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ total_score: newTotalScore })
        .eq("id", selectedStudent.student_id);

      if (error) throw error;

      const updatedStudent = { ...selectedStudent, total_score: newTotalScore };
      setEnrolledStudents(prev => prev.map(s => s.student_id === selectedStudent.student_id ? updatedStudent : s));
      setSelectedStudent(updatedStudent); 
      
      setScoreToAdd("");
      alert("Score added successfully!");
    } catch (error: any) {
      alert("Failed to update score: " + error.message);
    } finally {
      setIsScoring(false);
    }
  };

  const handleLogAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !attendanceForm.session_date) return;

    setIsLoggingAttendance(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("attendance_logs")
        .insert({
          class_group_id: classId,
          student_id: selectedStudent.student_id,
          session_date: attendanceForm.session_date,
          status: attendanceForm.status,
          notes: attendanceForm.notes.trim() || null
        });

      if (error) throw error;

      alert(`Attendance for ${selectedStudent.first_name} logged successfully!`);
      setIsAttendanceModalOpen(false);
      setAttendanceForm({ session_date: new Date().toISOString().split('T')[0], status: "Present", notes: "" });
    } catch (error: any) {
      alert("Failed to log attendance: " + error.message);
    } finally {
      setIsLoggingAttendance(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Roster...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div>
            <Link href="/en/teacher/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-fuchsia-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Back to Hub
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Roster</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
              Managing enrolled students for: <strong className="text-white bg-white/5 px-2 py-0.5 rounded-md ml-1">{className}</strong>
            </p>
          </div>
        </header>

        {/* ================= STUDENTS GRID (CARDS) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {enrolledStudents.length === 0 ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center bg-[#0a0a0f]/40 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
              <UserCircle size={64} className="text-neutral-700 mb-6" />
              <h3 className="text-xl font-black text-white mb-2">No Students Found</h3>
              <p className="text-neutral-500 text-sm">There are no students enrolled in this class yet.</p>
            </div>
          ) : (
            enrolledStudents.map((student) => (
              <div key={student.record_id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center text-center group hover:border-fuchsia-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(217,70,239,0.1)] relative">
                
                {/* Score Badge */}
                <div className="absolute top-5 left-5 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1.5">
                  <Star size={10} className="fill-amber-500" /> {student.total_score}
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shadow-inner mb-4 mt-2">
                  {student.avatar_url ? (
                    <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-3xl font-black text-fuchsia-500">{student.first_name.charAt(0)}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-black text-white line-clamp-1 w-full">{student.first_name} {student.last_name}</h3>
                <p className="text-[10px] text-neutral-500 font-mono mt-1 mb-6 truncate w-full px-4">{student.email}</p>
                
                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="w-full py-3.5 bg-white/5 hover:bg-fuchsia-500/10 border border-white/10 hover:border-fuchsia-500/30 text-xs font-black uppercase tracking-[0.15em] text-neutral-300 hover:text-fuchsia-400 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Settings2 size={16} /> Manage
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL 1: DETAILED MANAGE STUDENT PROFILE ============== */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md" onClick={() => !isAttendanceModalOpen && setSelectedStudent(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/50 shrink-0 flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-32 bg-fuchsia-500/20 blur-[60px] pointer-events-none"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-[1.2rem] bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                  {selectedStudent.avatar_url ? (
                    <img src={selectedStudent.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-black text-fuchsia-500">{selectedStudent.first_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                  <p className="text-xs text-neutral-400 font-mono mt-1">Joined Cohort: {new Date(selectedStudent.joined_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 relative z-10">
                <X size={18} />
              </button>
            </div>
            
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Col: Profile Details */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">Student Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <Mail size={18} className="text-neutral-500" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Email</p>
                        <p className="text-sm text-white font-mono">{selectedStudent.email}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <Phone size={18} className="text-neutral-500" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Phone</p>
                        <p className="text-sm text-white font-mono">{selectedStudent.phone_number}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <UserCheck size={18} className="text-neutral-500" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Father's Name</p>
                        <p className="text-sm text-white">{selectedStudent.father_name}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <Calendar size={18} className="text-neutral-500" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Date of Birth</p>
                        <p className="text-sm text-white font-mono">{selectedStudent.date_of_birth}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <MapPin size={18} className="text-neutral-500" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Country</p>
                        <p className="text-sm text-white">{selectedStudent.country}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                      <CreditCard size={18} className="text-emerald-500" />
                      <div>
                        <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Wallet Balance</p>
                        <p className="text-sm text-emerald-400 font-mono">${selectedStudent.wallet_balance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">Biography</p>
                    <p className="text-sm text-neutral-300 leading-relaxed">{selectedStudent.bio}</p>
                  </div>
                </div>

                {/* Right Col: Actions */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">Cohort Actions</h3>
                  
                  {/* Score Form */}
                  <form onSubmit={handleAddScore} className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2"><Star size={14}/> Current Score</p>
                      <span className="text-xl font-black text-amber-400">{selectedStudent.total_score}</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" min="1" required placeholder="Add Points..."
                        value={scoreToAdd} onChange={(e) => setScoreToAdd(e.target.value)}
                        className="w-full bg-black/60 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-400 text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <button type="submit" disabled={isScoring || !scoreToAdd} className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                      {isScoring ? <Loader2 size={14} className="animate-spin" /> : <Star size={14} />} Add Points
                    </button>
                  </form>

                  {/* Attendance Log */}
                  <button 
                    onClick={() => setIsAttendanceModalOpen(true)}
                    className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <UserCheck size={16} /> Log Attendance
                  </button>

                  {/* Remove Student */}
                  <button 
                    onClick={handleRemoveStudent}
                    className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg mt-8"
                  >
                    <Trash2 size={16} /> Remove from Class
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ================= MODAL 2: LOG ATTENDANCE (Sub-Modal) =================== */}
      {/* ========================================================================= */}
      {isAttendanceModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/80 backdrop-blur-sm" onClick={() => setIsAttendanceModalOpen(false)}></div>
          
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#111116] to-black border border-white/10 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <div className="flex flex-col items-center text-center mb-6 mt-2">
              <div className="w-16 h-16 rounded-[1.2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-black text-white">Log Attendance</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-medium leading-relaxed">
                Mark attendance status for <strong className="text-emerald-400">{selectedStudent.first_name}</strong>.
              </p>
            </div>

            <form onSubmit={handleLogAttendance} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Session Date</label>
                <div className="relative">
                  <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="date" required
                    value={attendanceForm.session_date}
                    onChange={(e) => setAttendanceForm({...attendanceForm, session_date: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Present", "Late", "Absent"].map(status => (
                    <button
                      key={status} type="button"
                      onClick={() => setAttendanceForm({...attendanceForm, status})}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        attendanceForm.status === status 
                          ? status === "Present" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : status === "Late" ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                          : "bg-red-500/20 border-red-500/40 text-red-400"
                          : "bg-black/40 border-white/5 text-neutral-500 hover:border-white/10 hover:text-neutral-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-neutral-500" />
                  <textarea 
                    rows={2} placeholder="Add a note..."
                    value={attendanceForm.notes} onChange={(e) => setAttendanceForm({...attendanceForm, notes: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none custom-scrollbar"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-white/5">
                <button type="button" onClick={() => setIsAttendanceModalOpen(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-xl text-xs font-black uppercase tracking-widest transition-colors active:scale-95">Cancel</button>
                <button type="submit" disabled={isLoggingAttendance} className="flex-[2] py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95">
                  {isLoggingAttendance ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}