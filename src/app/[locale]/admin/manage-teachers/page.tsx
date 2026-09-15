"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Search, ShieldAlert, UserCheck, BookOpen, Users, Edit3, Shield, Mail } from "lucide-react";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "teacher" | "super_admin";
  bio: string | null;
  avatar_url: string | null;
  activeClasses: number;
  totalStudents: number;
};

export default function ManageTeachersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // ۱. دریافت لیست اساتید و سوپر ادمین‌ها
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, role, bio, avatar_url")
        .in("role", ["teacher", "super_admin"])
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      if (profiles) {
        // ۲. محاسبه داینامیک تعداد کلاس‌ها و شاگردان برای هر استاد
        const enrichedProfiles = await Promise.all(
          profiles.map(async (teacher) => {
            const { data: groups } = await supabase
              .from("class_groups")
              .select("id, is_active, class_students(student_id)")
              .eq("teacher_id", teacher.id);

            let activeCount = 0;
            let uniqueStudents = new Set();

            if (groups) {
              groups.forEach((g: any) => {
                if (g.is_active) activeCount++;
                if (g.class_students) {
                  g.class_students.forEach((cs: any) => uniqueStudents.add(cs.student_id));
                }
              });
            }

            return {
              ...teacher,
              activeClasses: activeCount,
              totalStudents: uniqueStudents.size,
            };
          })
        );

        setUsers(enrichedProfiles as Profile[]);
      }
    } catch (error) {
      console.error("Error fetching teachers data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(t => 
      t.first_name?.toLowerCase().includes(query) || 
      t.last_name?.toLowerCase().includes(query) || 
      t.email?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const stats = useMemo(() => {
    const totalFaculty = users.length;
    const totalClasses = users.reduce((acc, curr) => acc + curr.activeClasses, 0);
    return { totalFaculty, totalClasses };
  }, [users]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Faculty Records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambient Glows (Indigo & Violet for Faculty) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div>
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-2xl">
              Review instructor profiles, monitor their active cohorts, and manage administrative access levels across Safi Academy.
            </p>
          </div>

          {/* Quick Stats in Header */}
          <div className="flex gap-3 shrink-0 relative z-10">
            <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400"><UserCheck size={18}/></div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Total Faculty</p>
                <p className="text-xl font-black text-white">{stats.totalFaculty}</p>
              </div>
            </div>
            <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner hidden sm:flex">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400"><BookOpen size={18}/></div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Active Cohorts</p>
                <p className="text-xl font-black text-white">{stats.totalClasses}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= SEARCH BAR ================= */}
        <div className="bg-[#0a0a0f]/60 p-2 rounded-2xl border border-white/5 backdrop-blur-xl flex items-center gap-3 w-full max-w-xl shadow-lg">
          <div className="pl-4 text-neutral-500"><Search size={18} /></div>
          <input 
            type="text" 
            placeholder="Search instructor by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 py-3 pr-4 font-medium placeholder:text-neutral-600"
          />
        </div>

        {/* ================= Faculty Grid ================= */}
        {filteredTeachers.length === 0 ? (
           <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
             <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
             <h3 className="text-xl font-black text-white mb-2">No Instructors Found</h3>
             <p className="text-neutral-500 text-sm">There are no faculty members matching your search criteria.</p>
           </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTeachers.map((teacher, index) => (
              <div 
                key={teacher.id} 
                className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] hover:border-indigo-500/30 overflow-hidden relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Header: Avatar + Info */}
                <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-inner shrink-0 group-hover:border-indigo-500/50 transition-colors bg-neutral-900 flex items-center justify-center">
                      {teacher.avatar_url ? (
                        <img src={teacher.avatar_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-black text-indigo-500">
                          {teacher.first_name.charAt(0)}{teacher.last_name.charAt(0)}
                        </span>
                      )}
                      {/* Online Status Dot */}
                      <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0f] rounded-full"></div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-white truncate group-hover:text-indigo-300 transition-colors">
                        {teacher.first_name} {teacher.last_name}
                      </h3>
                      <p className="text-[10px] font-mono text-neutral-500 mt-0.5 truncate flex items-center gap-1.5">
                        <Mail size={10}/> {teacher.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Role Badge */}
                  <span className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-sm border flex items-center gap-1.5 ${
                    teacher.role === "super_admin" 
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                      : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                  }`}>
                    {teacher.role === "super_admin" ? <Shield size={10}/> : <UserCheck size={10}/>}
                    {teacher.role.replace('_', ' ')}
                  </span>
                </div>

                {/* Bio Section */}
                <div className="mb-6 relative z-10 flex-1">
                  <p className="font-black text-neutral-500 text-[9px] uppercase tracking-widest mb-2">Professional Summary</p>
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-medium">
                    {teacher.bio ? teacher.bio : <span className="italic opacity-50">No professional biography has been provided for this instructor.</span>}
                  </p>
                </div>

                {/* Database Live Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10 mt-auto">
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1 flex items-center gap-1"><BookOpen size={10}/> Active Classes</p>
                    <p className="text-2xl font-black text-white">{teacher.activeClasses}</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Users size={10}/> Total Students</p>
                    <p className="text-2xl font-black text-white">{teacher.totalStudents}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 relative z-10 pt-2 border-t border-white/5">
                  <Link 
                    href={`/en/admin/manage-teachers/${teacher.id}`}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    View Full Profile
                  </Link>
                  {teacher.role !== "super_admin" && (
                    <button className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:border-rose-400/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all shadow-sm flex items-center justify-center gap-2">
                      <Edit3 size={14}/> Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}