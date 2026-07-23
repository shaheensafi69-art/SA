"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Search, Mail, Phone, CalendarDays, CheckCircle2, ShieldAlert, BadgeCent, Users } from "lucide-react";

type ProfileResult = {
  id: string;
  first_name: string;
  last_name: string;
  father_name: string | null;
  email: string;
  phone_number: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  referral_code: string | null;
  created_at: string;
};

export default function AdminAddStudentToClassPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classid as string;

  const [allStudents, setAllStudents] = useState<ProfileResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedStudent, setSelectedStudent] = useState<ProfileResult | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // 1. واکشی تمام شاگردان به محض لود شدن صفحه
  useEffect(() => {
    fetchInitialStudents();
  }, []);

  const fetchInitialStudents = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      // گرفتن لیست شاگردان (برای سرعت بالاتر در پنل، محدود به 500 نفر آخر کردیم که قابل تغییر است)
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('role', 'student')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      setAllStudents(data || []);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. فیلتر کردن آنی (Live Search) بر اساس متن سرچ
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return allStudents;
    
    const query = searchQuery.toLowerCase().trim();
    return allStudents.filter(student => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      const fatherName = (student.father_name || "").toLowerCase();
      const email = student.email.toLowerCase();
      const phone = (student.phone_number || "").toLowerCase();
      const referral = (student.referral_code || "").toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        referral.includes(query) ||
        fatherName.includes(query)
      );
    });
  }, [searchQuery, allStudents]);

  // 3. هندل کردن ثبت نام در کلاس
  const handleEnrollStudent = async () => {
    if (!selectedStudent) return;
    setIsEnrolling(true);
    const supabase = createClient();

    try {
      // پیدا کردن اطلاعات کلاس تا course_id رو بدست بیاریم
      const { data: classData, error: classError } = await supabase
        .from("class_groups")
        .select("course_id, class_name")
        .eq("id", classId)
        .single();

      if (classError || !classData) throw new Error("Class not found");

      // اضافه کردن به جدول class_students
      const { error: studentError } = await supabase
        .from("class_students")
        .upsert({
          class_group_id: classId,
          student_id: selectedStudent.id,
          is_paid: isPaid
        }, { onConflict: "class_group_id, student_id" });

      if (studentError) throw studentError;

      // اضافه کردن به جدول enrollments
      const { error: enrollError } = await supabase
        .from("enrollments")
        .upsert({
          student_id: selectedStudent.id,
          course_id: classData.course_id,
          progress_percentage: 0
        }, { onConflict: "student_id, course_id" });

      if (enrollError) throw enrollError;

      // برگشت به صفحه کلاس
      router.push(`/en/admin/classes/${classId}`);
      
    } catch (error: any) {
      alert("Error enrolling student: " + error.message);
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-40" dir="ltr">
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between md:items-end">
            <div>
              <Link href={`/en/admin/classes/${classId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-cyan-400 transition-colors mb-6 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
                <ArrowLeft size={14} /> Back to Class Roster
              </Link>
              
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Enroll <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Student</span>
              </h1>
              <p className="text-sm text-neutral-400 font-medium max-w-lg">
                Browse the directory or search by Name, Email, Phone, Father's Name, or Referral Code to quickly find and enroll a student.
              </p>
            </div>

            {/* LIVE SEARCH BOX */}
            <div className="w-full md:w-96 relative shrink-0">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-cyan-500/30 rounded-2xl py-4 pl-14 pr-4 text-sm text-white focus:border-cyan-400 focus:bg-black focus:outline-none transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              />
            </div>
          </div>
        </header>

        {/* ================= STUDENTS LIST ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 size={40} className="animate-spin text-cyan-500" />
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500 animate-pulse">Loading Global Directory...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <Users size={18} className="text-cyan-400" />
              <h2 className="text-lg font-black text-white">Student Directory</h2>
              <span className="bg-white/10 text-neutral-400 text-[10px] font-black px-2 py-0.5 rounded-md ml-2">
                {filteredStudents.length} Results
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0f]/80 border border-dashed border-white/10 rounded-[2.5rem] backdrop-blur-md">
                <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
                <h3 className="text-xl font-black text-white mb-2">No Student Found</h3>
                <p className="text-neutral-500 text-sm">No profiles match your current search query.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredStudents.map((user) => (
                  <div 
                    key={user.id} 
                    onClick={() => setSelectedStudent(user)}
                    className={`relative overflow-hidden cursor-pointer bg-[#0a0a0f]/90 border rounded-[2rem] p-6 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col gap-5 ${
                      selectedStudent?.id === user.id 
                        ? "border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500 scale-[1.02]" 
                        : "border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* User Select Indicator */}
                    {selectedStudent?.id === user.id && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                    )}
                    
                    {/* Profile Header */}
                    <div className="flex items-center gap-4 relative z-10 border-b border-white/5 pb-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center shadow-inner">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-cyan-500">{user.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-white truncate">{user.first_name} {user.last_name}</h3>
                        {user.father_name && <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 truncate">F/O: {user.father_name}</p>}
                      </div>
                      
                      {/* Checkmark Overlay */}
                      {selectedStudent?.id === user.id && (
                        <div className="text-cyan-400 shrink-0">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </div>

                    {/* Meta Data Grid */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 flex items-center gap-1"><Mail size={10}/> Email</p>
                        <p className="text-xs font-mono text-neutral-300 truncate" title={user.email}>{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 flex items-center gap-1"><Phone size={10}/> Phone</p>
                        <p className="text-xs font-mono text-neutral-300">{user.phone_number || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 flex items-center gap-1"><BadgeCent size={10}/> Referral Code</p>
                        <p className="text-xs font-mono text-cyan-400">{user.referral_code || 'None'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 flex items-center gap-1"><CalendarDays size={10}/> Date of Birth</p>
                        <p className="text-xs text-neutral-300">{user.date_of_birth || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= STICKY ENROLLMENT ACTION BAR ================= */}
      {selectedStudent && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gradient-to-t from-black via-[#0a0a0f]/95 to-transparent backdrop-blur-sm animate-[slideInUp_0.3s_ease-out]">
          <div className="max-w-4xl mx-auto bg-cyan-950/40 border border-cyan-500/30 rounded-[2rem] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_-10px_40px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-black border border-cyan-500/30 flex items-center justify-center shrink-0">
                {selectedStudent.avatar_url ? (
                  <img src={selectedStudent.avatar_url} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-cyan-500 font-black">{selectedStudent.first_name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-white truncate">Ready to Enroll: {selectedStudent.first_name} {selectedStudent.last_name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={isPaid} 
                      onChange={() => setIsPaid(!isPaid)}
                      className="w-4 h-4 rounded border-white/20 text-cyan-500 focus:ring-cyan-500 bg-black cursor-pointer"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                      Mark as <span className="text-emerald-400">PAID</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto gap-3">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnrollStudent}
                disabled={isEnrolling}
                className="flex-1 sm:flex-none bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {isEnrolling ? <Loader2 size={16} className="animate-spin" /> : "Confirm Enrollment"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}