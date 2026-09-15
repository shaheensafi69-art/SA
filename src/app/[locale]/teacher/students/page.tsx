"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Search, Loader2, ShieldAlert, ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, UserCheck, FileText, X, Star, Eye } from "lucide-react";

type StudentProfile = {
  id: string;
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
  referral_code: string;
  enrolled_classes: string[]; // لیست کلاس‌هایی از این استاد که شاگرد در آن‌ها حضور دارد
};

export default function TeacherAllStudentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // مدیریت مودال جزییات کامل شاگرد
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    fetchAllTeacherStudents();
  }, []);

  const fetchAllTeacherStudents = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    // ۱. دریافت اطلاعات استاد لاگین شده
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    const teacherId = session.user.id;

    try {
      // ۲. پیدا کردن تمام کلاس‌های این استاد
      const { data: teacherClasses, error: classesError } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", teacherId);

      if (classesError) throw classesError;

      if (!teacherClasses || teacherClasses.length === 0) {
        setStudents([]);
        return;
      }

      const classIds = teacherClasses.map(c => c.id);

      // ۳. پیدا کردن تمام رکوردهای شاگردان این کلاس‌ها
      const { data: classStudentsData, error: csError } = await supabase
        .from("class_students")
        .select("student_id, class_group_id")
        .in("class_group_id", classIds);

      if (csError) throw csError;

      if (!classStudentsData || classStudentsData.length === 0) {
        setStudents([]);
        return;
      }

      // استخراج لیست آی‌دی‌های منحصربه‌فرد شاگردان
      const uniqueStudentIds = Array.from(new Set(classStudentsData.map(item => item.student_id)));

      // ۴. واکشی پروفایل کامل این شاگردان
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, father_name, date_of_birth, email, phone_number, country, avatar_url, total_score, wallet_balance, bio, referral_code")
        .in("id", uniqueStudentIds);

      if (profilesError) throw profilesError;

      if (profilesData) {
        // ۵. ترکیب اطلاعات و مشخص کردن اینکه هر شاگرد در کدام کلاس‌های این استاد است
        const formattedStudents = profilesData.map((p: any) => {
          // پیدا کردن کلاس‌های این شاگرد
          const studentClassRelations = classStudentsData.filter(cs => cs.student_id === p.id);
          const enrolledClassNames = studentClassRelations.map(rel => {
            const cls = teacherClasses.find(c => c.id === rel.class_group_id);
            return cls ? cls.class_name : "Unknown Class";
          });

          return {
            id: p.id,
            first_name: p.first_name || "Unknown",
            last_name: p.last_name || "",
            father_name: p.father_name || "Not specified",
            date_of_birth: p.date_of_birth || "Not specified",
            email: p.email || "No email",
            phone_number: p.phone_number || "No phone",
            country: p.country || "Not specified",
            avatar_url: p.avatar_url || "",
            total_score: p.total_score || 0,
            wallet_balance: p.wallet_balance || 0,
            bio: p.bio || "No biography provided.",
            referral_code: p.referral_code || "-",
            enrolled_classes: Array.from(new Set(enrolledClassNames))
          };
        });

        setStudents(formattedStudents);
      }

    } catch (error) {
      console.error("Error fetching teacher roster:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // فیلتر هوشمند شاگردان بر اساس سرچ
  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    return students.filter(s => 
      s.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone_number.includes(searchQuery)
    );
  }, [students, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Academy Roster...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= PREMIUM HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              <Users className="text-fuchsia-400" size={32} /> My <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Students</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
              Global directory of all students enrolled across your classes (<strong className="text-white">{students.length} Total</strong>)
            </p>
          </div>
          
          {/* Mega Search Input */}
          <div className="w-full md:w-80 relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors shadow-inner"
            />
          </div>
        </header>

        {/* ================= DATA TERMINAL / TABLE LAYOUT ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] sm:text-[11px] font-black text-neutral-500 uppercase tracking-widest">
                  <th className="p-6">Student Profile</th>
                  <th className="p-6">Contact Details</th>
                  <th className="p-6">Active Cohorts</th>
                  <th className="p-6 text-center">Score</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-50">
                        <ShieldAlert size={48} className="text-neutral-600" />
                        <p className="text-neutral-400 text-sm font-bold">No students found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      {/* Name & Avatar */}
                      <td className="p-5 sm:p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                            {student.avatar_url ? (
                              <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg font-black text-fuchsia-500">{student.first_name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-white text-base">{student.first_name} {student.last_name}</p>
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5">ID: {student.id.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="p-5 sm:p-6">
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span> {student.email}
                        </p>
                        <p className="text-[11px] sm:text-xs text-neutral-500 font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span> {student.phone_number}
                        </p>
                      </td>

                      {/* Enrolled Classes List */}
                      <td className="p-5 sm:p-6 max-w-[250px]">
                        <div className="flex flex-wrap gap-1.5">
                          {student.enrolled_classes.map((clsName, index) => (
                            <span key={index} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-wide truncate max-w-[150px]" title={clsName}>
                              {clsName}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Score */}
                      <td className="p-5 sm:p-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-xs sm:text-sm font-black tracking-wider">
                          <Star size={12} className="fill-amber-500" /> {student.total_score}
                        </div>
                      </td>

                      {/* Manage Action */}
                      <td className="p-5 sm:p-6 text-right">
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="px-4 py-2.5 bg-white/5 hover:bg-fuchsia-500/10 border border-white/10 hover:border-fuchsia-500/30 text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white rounded-xl transition-all active:scale-95 flex items-center gap-2 ml-auto shadow-md"
                        >
                          <Eye size={14} className="text-fuchsia-400" /> View Profile
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= DETAILED STUDENT PROFILE MODAL ======================== */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md" onClick={() => setSelectedStudent(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/50 shrink-0 flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-32 bg-fuchsia-500/20 blur-[60px] pointer-events-none"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-[1.2rem] bg-black border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                  {selectedStudent.avatar_url ? (
                    <img src={selectedStudent.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-black text-fuchsia-500">{selectedStudent.first_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                  <p className="text-xs text-neutral-400 font-mono mt-1">Safi Academy Scholar</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 relative z-10">
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508] space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <Mail size={18} className="text-neutral-500" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Email Address</p>
                    <p className="text-sm text-white font-mono mt-0.5">{selectedStudent.email}</p>
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <Phone size={18} className="text-neutral-500" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Phone Number</p>
                    <p className="text-sm text-white font-mono mt-0.5">{selectedStudent.phone_number}</p>
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <UserCheck size={18} className="text-neutral-500" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Father's Name</p>
                    <p className="text-sm text-white mt-0.5">{selectedStudent.father_name}</p>
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <Calendar size={18} className="text-neutral-500" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Date of Birth</p>
                    <p className="text-sm text-white font-mono mt-0.5">{selectedStudent.date_of_birth}</p>
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <MapPin size={18} className="text-neutral-500" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Country / Origin</p>
                    <p className="text-sm text-white mt-0.5">{selectedStudent.country}</p>
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <CreditCard size={18} className="text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Wallet Balance</p>
                    <p className="text-sm text-emerald-400 font-mono mt-0.5">${selectedStudent.wallet_balance}</p>
                  </div>
                </div>
              </div>

              {/* Bio & Referral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white/[0.01] border border-white/5 rounded-2xl p-5">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">Student Biography</p>
                  <p className="text-sm text-neutral-300 leading-relaxed font-medium">{selectedStudent.bio}</p>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">Referral Code</p>
                  <p className="text-xl font-black text-white font-mono bg-black/40 px-4 py-2 rounded-xl border border-white/5 mt-1 tracking-wider">{selectedStudent.referral_code}</p>
                </div>
              </div>

              {/* Class Members لیست کلاس‌ها */}
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-3">Enrolled In Your Classes</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.enrolled_classes.map((cls, idx) => (
                    <span key={idx} className="px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-xl text-xs font-black uppercase tracking-wider">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}