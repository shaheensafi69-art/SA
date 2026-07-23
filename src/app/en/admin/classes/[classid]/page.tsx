"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Users, Clock, CalendarDays, BookOpen, ShieldAlert, Radio, CheckCircle2, User, Mail, Sparkles, Plus, LockKeyhole } from "lucide-react";

type ClassDetail = {
  id: string;
  course_id: string;
  class_name: string;
  is_active: boolean;
  created_at: string;
  start_date: string | null;
  schedule_time?: string; 
  schedule_days?: string;
  course: { title: string } | null;
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
  const params = useParams();
  const classId = params.classid as string;

  const [isLoading, setIsLoading] = useState(true);
  const [classData, setClassData] = useState<ClassDetail | null>(null);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);

  useEffect(() => {
    if (classId) fetchClassDetails();
  }, [classId]);

  const fetchClassDetails = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: clsData, error: clsError } = await supabase
        .from("class_groups")
        .select(`
          *,
          course:courses(title),
          teacher:profiles!teacher_id(id, first_name, last_name, email, avatar_url)
        `)
        .eq("id", classId)
        .single();

      if (clsError) throw clsError;
      
      const teacherObj = Array.isArray(clsData.teacher) ? clsData.teacher[0] : clsData.teacher;
      const courseObj = Array.isArray(clsData.course) ? clsData.course[0] : clsData.course;
      
      setClassData({ 
        ...clsData, 
        teacher: teacherObj, 
        course: courseObj,
        schedule_time: clsData.schedule_time || "18:00 PM - 20:00 PM",
        schedule_days: clsData.schedule_days || "Monday, Wednesday, Friday"
      });

      const { data: classStudents } = await supabase
        .from("class_students")
        .select("student_id, created_at, is_paid")
        .eq("class_group_id", classId)
        .order('created_at', { ascending: false });

      if (classStudents && classStudents.length > 0) {
        const studentIds = classStudents.map(cs => cs.student_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        if (profiles) {
          const formattedStudents = profiles.map(profile => {
            const joinedData = classStudents.find(cs => cs.student_id === profile.id);
            return {
              ...profile,
              joined_at: joinedData?.created_at || new Date().toISOString(),
              is_paid: joinedData?.is_paid ?? false
            };
          });
          
          formattedStudents.sort((a, b) => (a.is_paid === b.is_paid) ? 0 : a.is_paid ? 1 : -1);
          setStudents(formattedStudents);
        }
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStudentPaymentStatus = async (studentId: string, currentStatus: boolean) => {
    const supabase = createClient();
    const newStatus = !currentStatus;

    try {
      const { error } = await supabase
        .from("class_students")
        .update({ is_paid: newStatus })
        .eq("class_group_id", classId)
        .eq("student_id", studentId);

      if (error) throw error;

      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, is_paid: newStatus } : s));
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Class Information...</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Cohort Not Found</h2>
        <p className="text-neutral-500 mb-6">This class group does not exist or has been deleted.</p>
        <Link href="/en/admin/classes" className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">Return to Cohorts</Link>
      </div>
    );
  }

  const isNew = (new Date().getTime() - new Date(classData.created_at).getTime()) / (1000 * 3600 * 24) <= 10;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        <section className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-start gap-6 border-b border-white/5 pb-8 mb-8">
            <div>
              <Link href="/en/admin/classes" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-cyan-400 transition-colors mb-6 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
                <ArrowLeft size={14} /> Back to Cohorts
              </Link>
              
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">{classData.class_name}</h1>
                {isNew && <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md"><Sparkles size={10}/> New</span>}
              </div>
              <p className="text-sm font-bold text-neutral-400 flex items-center gap-2"><BookOpen size={16}/> {classData.course?.title}</p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-lg ${
                classData.is_active ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" : "bg-black/60 text-neutral-300 border-white/10"
              }`}>
                {classData.is_active ? <Radio size={14} className="animate-pulse"/> : <CheckCircle2 size={14}/>}
                {classData.is_active ? "Live / In Progress" : "Completed Cohort"}
              </span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><Clock size={12}/> Time</p>
              <p className="text-base font-bold text-white font-mono">{classData.schedule_time}</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><CalendarDays size={12}/> Days</p>
              <p className="text-sm font-bold text-white">{classData.schedule_days}</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5"><CalendarDays size={12}/> Created On</p>
              <p className="text-sm font-bold text-white font-mono">{new Date(classData.created_at).toLocaleDateString()}</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center border-l-2 border-l-cyan-500/50 shadow-[inset_10px_0_20px_rgba(6,182,212,0.05)]">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500/70 mb-2 flex items-center gap-1.5"><Users size={12}/> Enrolled</p>
              <p className="text-2xl font-black text-cyan-400">{students.length}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-[1.3fr_0.7fr]">
          
          {/* LEFT: STUDENTS LIST */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl flex-1 flex flex-col relative">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Users size={22} className="text-cyan-400"/> Student Roster
                </h3>
                
                {/* 👈 دکمه هدایت به صفحه جدید جستجو و افزودن شاگرد */}
                <Link 
                  href={`/en/admin/classes/${classId}/add-student`}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Plus size={16} /> Enroll New Student
                </Link>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {students.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500">
                    <Users size={32} className="mx-auto mb-3 opacity-50"/>
                    <p className="text-sm font-bold">No students have enrolled in this class yet.</p>
                  </div>
                ) : (
                  students.map((student) => (
                    <div key={student.id} className={`w-full text-left rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${student.is_paid ? 'bg-black/40 border-white/5' : 'bg-red-950/10 border-red-500/20'}`}>
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center">
                          {student.avatar_url ? (
                            <img src={student.avatar_url} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-black text-cyan-500">{student.first_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate">{student.first_name} {student.last_name}</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate">{student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Joined</p>
                          <p className="text-xs font-bold text-neutral-300 mt-0.5 font-mono">{new Date(student.joined_at).toLocaleDateString()}</p>
                        </div>
                        
                        <button
                          onClick={() => toggleStudentPaymentStatus(student.id, student.is_paid)}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all flex items-center gap-1.5 min-w-[90px] justify-center ${
                            student.is_paid 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 animate-pulse'
                          }`}
                        >
                          {student.is_paid ? <CheckCircle2 size={12}/> : <LockKeyhole size={12}/>}
                          {student.is_paid ? 'PAID / ACTIVE' : 'PENDING / LOCKED'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: INSTRUCTOR INFO */}
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-base font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4 relative z-10">
                <User size={18} className="text-cyan-400"/> Cohort Instructor
              </h3>
              
              {classData.teacher ? (
                <div className="flex flex-col items-center text-center relative z-10 mt-8">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-neutral-900 border-2 border-white/10 shadow-2xl mb-5 flex items-center justify-center">
                    {classData.teacher.avatar_url ? (
                      <img src={classData.teacher.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-cyan-500">{classData.teacher.first_name.charAt(0)}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{classData.teacher.first_name} {classData.teacher.last_name}</h4>
                  <p className="text-xs text-neutral-500 font-mono mb-6 flex items-center justify-center gap-1"><Mail size={12}/> {classData.teacher.email}</p>
                  
                  <Link 
                    href={`/en/admin/manage-teachers/${classData.teacher.id}`}
                    className="w-full mt-auto py-4 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-neutral-300 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 text-center"
                  >
                    View Faculty Profile
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <User size={32} className="mx-auto mb-3 opacity-50"/>
                  <p className="text-sm font-bold">No instructor assigned.</p>
                </div>
              )}
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}