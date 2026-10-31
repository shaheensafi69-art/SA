"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Search, Mail, Phone, 
  CalendarDays, CheckCircle2, ShieldAlert, 
  BadgeCent, Users, UserPlus, AlertCircle, Sparkles, Check
} from "lucide-react";

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
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  
  // Safe param extraction for Next.js 15
  const classId = (params?.classid || params?.classId || params?.id) as string;

  const [allStudents, setAllStudents] = useState<ProfileResult[]>([]);
  const [existingStudentIds, setExistingStudentIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedStudent, setSelectedStudent] = useState<ProfileResult | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchInitialStudents();
  }, [classId]);

  const fetchInitialStudents = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      // 1. Get already enrolled students in this cohort
      if (classId) {
        const { data: enrolledData } = await supabase
          .from("class_students")
          .select("student_id")
          .eq("class_group_id", classId);
        
        if (enrolledData) {
          setExistingStudentIds(new Set(enrolledData.map(e => e.student_id)));
        }
      }

      // 2. Get students directory
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('role', 'student')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      setAllStudents(data || []);
    } catch (error: any) {
      console.error("Failed to load students:", error);
      setFeedback({ text: error.message || "Failed to load directory", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleEnrollStudent = async () => {
    if (!selectedStudent || !classId) return;
    setIsEnrolling(true);
    setFeedback(null);
    const supabase = createClient();

    try {
      const { data: classData, error: classError } = await supabase
        .from("class_groups")
        .select("course_id, class_name")
        .eq("id", classId)
        .single();

      if (classError || !classData) throw new Error("Class group not found");

      // Insert/Upsert into class_students
      const { error: studentError } = await supabase
        .from("class_students")
        .upsert({
          class_group_id: classId,
          student_id: selectedStudent.id,
          is_paid: isPaid,
          joined_at: new Date().toISOString()
        }, { onConflict: "class_group_id, student_id" });

      if (studentError) throw studentError;

      // Upsert into enrollments
      if (classData.course_id) {
        await supabase
          .from("enrollments")
          .upsert({
            student_id: selectedStudent.id,
            course_id: classData.course_id,
            progress_percentage: 0,
            enrolled_at: new Date().toISOString()
          }, { onConflict: "student_id, course_id" });
      }

      setFeedback({
        text: `Successfully enrolled ${selectedStudent.first_name} into ${classData.class_name}!`,
        type: "success"
      });

      setTimeout(() => {
        router.push(`/${currentLocale}/admin/classes/${classId}`);
      }, 1500);
      
    } catch (error: any) {
      setFeedback({ text: error.message || "Error enrolling student", type: "error" });
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-40" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between md:items-end">
            <div>
              <Link href={`/${currentLocale}/admin/classes/${classId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-6 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
                <ArrowLeft size={14} /> Back to Cohort Roster
              </Link>
              
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Enroll Scholar into <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">Cohort</span>
              </h1>
              <p className="text-sm text-neutral-400 font-medium max-w-lg">
                Query academy scholars by Name, Email, Phone Number, or Referral Code and assign them immediately to this active live class.
              </p>
            </div>

            {/* LIVE SEARCH BOX */}
            <div className="w-full md:w-96 relative shrink-0">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" />
              <input 
                type="text" 
                placeholder={t.adminPages.findStudentPlaceholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#030305]/60 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white focus:border-rose-500 focus:bg-black focus:outline-none transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)] placeholder:text-neutral-600"
              />
            </div>
          </div>
        </header>

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

        {/* ================= STUDENTS LIST ================= */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 size={40} className="animate-spin text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] rounded-full" />
            <p className="text-xs font-black uppercase tracking-widest text-rose-500 animate-pulse">{t.adminPages.loadingStudentRecords}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <Users size={18} className="text-rose-500" />
              <h2 className="text-lg font-black text-white">Scholars Directory</h2>
              <span className="bg-white/10 text-neutral-400 text-[10px] font-black px-2 py-0.5 rounded-md ml-2 border border-white/5 font-mono">
                {filteredStudents.length} Results
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0f]/80 border border-dashed border-white/10 rounded-[2.5rem] backdrop-blur-md">
                <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
                <h3 className="text-xl font-black text-white mb-2">{t.adminStudents.noStudents}</h3>
                <p className="text-neutral-500 text-sm">No scholars matched your search query.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredStudents.map((user) => {
                  const isSelected = selectedStudent?.id === user.id;
                  const isAlreadyEnrolled = existingStudentIds.has(user.id);

                  return (
                    <div 
                      key={user.id} 
                      onClick={() => !isAlreadyEnrolled && setSelectedStudent(user)}
                      className={`relative overflow-hidden bg-[#0a0a0f]/90 border rounded-[2rem] p-6 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col gap-4 ${
                        isAlreadyEnrolled
                          ? "opacity-50 border-white/5 cursor-not-allowed bg-black/40"
                          : isSelected
                            ? "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.15)] ring-1 ring-rose-500 scale-[1.02] cursor-pointer" 
                            : "border-white/5 hover:border-white/20 hover:bg-white/[0.02] cursor-pointer"
                      }`}
                    >
                      {/* Glow indicator on select */}
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                      )}

                      {/* Header */}
                      <div className="flex items-center gap-4 relative z-10 border-b border-white/5 pb-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center shadow-inner">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl font-black text-rose-500">{user.first_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black text-white truncate">{user.first_name} {user.last_name}</h3>
                          {user.father_name && <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 truncate mt-0.5">F/O: {user.father_name}</p>}
                        </div>
                        
                        {isAlreadyEnrolled ? (
                          <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-wider text-neutral-400 shrink-0">
                            Enrolled
                          </span>
                        ) : isSelected ? (
                          <div className="text-rose-500 shrink-0">
                            <CheckCircle2 size={22} />
                          </div>
                        ) : null}
                      </div>

                      {/* Meta data */}
                      <div className="grid grid-cols-2 gap-3 relative z-10">
                        <div className="space-y-1 col-span-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-1"><Mail size={10} className="text-rose-500/70"/> Email</p>
                          <p className="text-xs font-mono text-neutral-300 truncate" title={user.email}>{user.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-1"><Phone size={10} className="text-rose-500/70"/> Phone</p>
                          <p className="text-xs font-mono text-neutral-300 truncate">{user.phone_number || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-1"><BadgeCent size={10} className="text-rose-500/70"/> Referral</p>
                          <p className="text-xs font-mono text-rose-400 truncate">{user.referral_code || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= STICKY ENROLLMENT ACTION BAR ================= */}
      {selectedStudent && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gradient-to-t from-[#030305] via-[#0a0a0f]/95 to-transparent backdrop-blur-md animate-[slideInUp_0.3s_ease-out]">
          <div className="max-w-4xl mx-auto bg-rose-950/30 border border-rose-500/40 rounded-[2rem] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_-10px_40px_rgba(244,63,94,0.2)] backdrop-blur-2xl">
            
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-black border border-rose-500/40 flex items-center justify-center shrink-0 overflow-hidden">
                {selectedStudent.avatar_url ? (
                  <img src={selectedStudent.avatar_url} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-rose-500 font-black">{selectedStudent.first_name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-white truncate">
                  Ready to enroll: {selectedStudent.first_name} {selectedStudent.last_name}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={isPaid} 
                      onChange={() => setIsPaid(!isPaid)}
                      className="w-4 h-4 rounded border-white/20 text-rose-500 focus:ring-rose-500 bg-black cursor-pointer"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                      Mark as <span className="text-emerald-400 font-black">PAID & ACTIVE</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto gap-3 shrink-0">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 transition-all flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnrollStudent}
                disabled={isEnrolling}
                className="flex-1 sm:flex-none bg-rose-500 hover:bg-rose-600 text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] border border-rose-500 active:scale-95"
              >
                {isEnrolling ? <Loader2 size={16} className="animate-spin" /> : <><UserPlus size={16} /> Confirm Enrollment</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
