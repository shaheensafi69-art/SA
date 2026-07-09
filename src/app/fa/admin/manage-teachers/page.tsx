"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// اضافه شدن activeClasses و totalStudents به تایپ
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
            // دریافت کلاس‌های استاد و وصل شدن به جدول شاگردانِ آن کلاس
            const { data: groups } = await supabase
              .from("class_groups")
              .select("id, is_active, class_students(student_id)")
              .eq("teacher_id", teacher.id);

            let activeCount = 0;
            let uniqueStudents = new Set(); // برای جلوگیری از شمارش تکراری شاگردی که در ۲ کلاس یک استاد است

            if (groups) {
              groups.forEach((g: any) => {
                // شمارش کلاس‌های فعال
                if (g.is_active) activeCount++;
                
                // شمارش شاگردان
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

  return (
    <div className="min-h-full bg-[#020202] text-white px-6 py-12 overflow-hidden relative">
      
      {/* پس‌زمینه‌های متحرک و نئونی (3D Feeling) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite_reverse]"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* ================= Header ================= */}
        <header className="rounded-[2.5rem] border border-white/10 bg-neutral-950/60 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-3xl animate-[fadeIn_0.5s_ease-out]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"></span>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Command Center</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">Management</span></h1>
              <p className="mt-4 max-w-2xl text-neutral-400 leading-relaxed">
                Review instructor profiles, manage access levels, and orchestrate the academic team of Safi Academy.
              </p>
            </div>
            <Link href="/en/admin" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Return to Dashboard
            </Link>
          </div>
        </header>

        {/* ================= Grid اساتید ================= */}
        {isLoading ? (
           <div className="flex justify-center items-center h-64">
             <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : users.length === 0 ? (
           <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md">
             <span className="text-6xl block mb-4 opacity-50">👥</span>
             <h3 className="text-xl font-bold text-white mb-2">No Instructors Found</h3>
             <p className="text-neutral-500">There are currently no active teachers in the database.</p>
           </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {users.map((teacher, index) => (
              <div 
                key={teacher.id} 
                className="group relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-indigo-500/30 overflow-hidden animate-[slideUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-lg group-hover:border-indigo-400 transition-colors">
                      {teacher.avatar_url ? (
                        <img src={teacher.avatar_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xl font-black text-neutral-400">
                          {teacher.first_name.charAt(0)}{teacher.last_name.charAt(0)}
                        </div>
                      )}
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
                        {teacher.first_name} {teacher.last_name}
                      </h3>
                      <p className="text-xs font-mono text-neutral-500 mt-1">{teacher.email}</p>
                    </div>
                  </div>
                  
                  {/* Role Badge */}
                  <span className={`rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    teacher.role === "super_admin" 
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                      : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  }`}>
                    {teacher.role.replace('_', ' ')}
                  </span>
                </div>

                {/* Bio Section */}
                <div className="space-y-4 text-sm text-neutral-400 relative">
                  <p className="font-bold text-white text-xs uppercase tracking-widest border-b border-white/5 pb-2">Professional Summary</p>
                  <p className="line-clamp-3 leading-relaxed min-h-[4.5rem]">
                    {teacher.bio ? teacher.bio : "No professional biography has been provided for this instructor yet."}
                  </p>
                </div>

                {/* آمار ۱۰۰٪ واقعی از دیتابیس */}
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Active Classes</p>
                        <p className="text-xl font-black text-white">{teacher.activeClasses}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Students</p>
                        <p className="text-xl font-black text-white">{teacher.totalStudents}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-white hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all shadow-sm">
                    View Full Profile
                  </button>
                  {teacher.role !== "super_admin" && (
                    <button className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-white hover:border-fuchsia-400/50 hover:bg-fuchsia-500/20 hover:text-fuchsia-300 transition-all shadow-sm">
                      Manage Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* استایل‌های انیمیشن سفارشی */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}