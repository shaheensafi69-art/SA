"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
    wallet: 0
  });

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    totalScore: 0,
    certificates: 0,
  });

  const [activeCourse, setActiveCourse] = useState<{
    title: string;
    progress: number;
    thumbnail: string;
  } | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return router.push("/en/login");
      const userId = session.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url, email, total_score, wallet_balance")
        .eq("id", userId)
        .single();

      if (profile) {
        setStudent({
          first_name: profile.first_name || "Student",
          last_name: profile.last_name || "",
          avatar: profile.avatar_url || "",
          email: profile.email || session.user.email || "",
          wallet: profile.wallet_balance || 0
        });
      }

      const [enrollmentsRes, certsRes] = await Promise.all([
        supabase.from("class_students").select("id", { count: "exact", head: true }).eq("student_id", userId),
        supabase.from("certificates").select("id", { count: "exact", head: true }).eq("student_id", userId)
      ]);

      setStats({
        enrolledCourses: enrollmentsRes.count || 0,
        totalScore: profile?.total_score || 0,
        certificates: certsRes.count || 0,
      });

      const { data: latestEnrollment } = await supabase
        .from("class_students")
        .select(`class_groups ( class_name )`)
        .eq("student_id", userId)
        .order("enrolled_at", { ascending: false })
        .limit(1)
        .single();

      if (latestEnrollment && latestEnrollment.class_groups) {
        const courseData = Array.isArray(latestEnrollment.class_groups) 
          ? latestEnrollment.class_groups[0] 
          : latestEnrollment.class_groups;

        setActiveCourse({
          title: courseData.class_name || "Untitled Course",
          thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
          progress: 35,
        });
      }

      setIsLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
         <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden bg-transparent font-sans">
      
      <div className="px-6 md:px-12 pt-8 pb-32 max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* ================= 1. PREMIUM PROFILE BOX ================= */}
        <div className="relative w-full bg-gradient-to-br from-neutral-900/90 to-black border border-white/10 rounded-[2.5rem] p-6 md:p-10 overflow-hidden shadow-2xl animate-[fadeIn_0.4s_ease-out] group">
          {/* افکت نوری پس زمینه باکس پروفایل */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* آواتار کاربر */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-neutral-800 border-2 border-yellow-500/30 p-1.5 shrink-0 shadow-[0_0_30px_rgba(234,179,8,0.15)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-neutral-900 flex items-center justify-center">
                {student.avatar ? (
                  <img src={student.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-yellow-500">{student.first_name.charAt(0)}</span>
                )}
              </div>
            </div>
            
            {/* اطلاعات کاربر */}
            <div className="flex-1 pt-2">
              <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-3">
                Academy Student
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-sm text-neutral-400 font-medium">{student.email}</p>
            </div>

            {/* کیف پول (نمایش جذاب) */}
            <div className="mt-4 md:mt-0 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center min-w-[140px] backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Wallet Balance</span>
              <span className="text-2xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">${student.wallet}</span>
            </div>
          </div>
        </div>

        {/* ================= 2. COLORFUL STATS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          
          {/* باکس دوره‌ها (آبی) */}
          <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(59,130,246,0.05)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] group cursor-default">
            <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">📚</div>
            <div>
              <p className="text-blue-400/70 text-[10px] font-black uppercase tracking-widest mb-1">Enrolled</p>
              <h3 className="text-3xl font-black text-white">{stats.enrolledCourses}</h3>
            </div>
          </div>

          {/* باکس امتیاز (فوشیا) */}
          <div className="bg-gradient-to-br from-fuchsia-900/20 to-black border border-fuchsia-500/20 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(217,70,239,0.05)] hover:shadow-[0_15px_40px_rgba(217,70,239,0.15)] group cursor-default">
            <div className="w-16 h-16 bg-fuchsia-500/10 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all duration-500">⚡</div>
            <div>
              <p className="text-fuchsia-400/70 text-[10px] font-black uppercase tracking-widest mb-1">Total Score</p>
              <h3 className="text-3xl font-black text-white">{stats.totalScore}</h3>
            </div>
          </div>

          {/* باکس مدارک (زمردی) */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.05)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] group cursor-default sm:col-span-2 md:col-span-1">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">🏆</div>
            <div>
              <p className="text-emerald-400/70 text-[10px] font-black uppercase tracking-widest mb-1">Certificates</p>
              <h3 className="text-3xl font-black text-white">{stats.certificates}</h3>
            </div>
          </div>

        </div>

        {/* ================= 3. BOTTOM SECTIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* بخش چپ: Continue Learning (طلایی) */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white tracking-wide">Continue Learning</h2>
            </div>
            
            {activeCourse ? (
              <div className="bg-gradient-to-r from-amber-900/20 to-black p-6 rounded-[2.5rem] border border-amber-500/20 backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-6 shadow-[0_10px_40px_rgba(245,158,11,0.05)] group cursor-pointer hover:border-amber-500/40 transition-all duration-300">
                <div className="w-full sm:w-56 h-48 sm:h-full rounded-[1.5rem] overflow-hidden shrink-0 relative bg-neutral-800">
                  <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <button className="w-14 h-14 bg-amber-500 text-black rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </button>
                  </div>
                </div>

                <div className="flex-1 w-full py-2">
                  <p className="text-amber-500 font-black text-[10px] mb-2 uppercase tracking-widest bg-amber-500/10 inline-block px-3 py-1 rounded-md">In Progress</p>
                  <h3 className="text-2xl font-black text-white mb-6 leading-tight">{activeCourse.title}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-400">Course Progress</span>
                      <span className="text-amber-400">{activeCourse.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full relative" style={{ width: `${activeCourse.progress}%` }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:20px_20px] animate-[progress_1s_linear_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center h-[220px]">
                <p className="text-neutral-400 font-bold mb-5">You haven't enrolled in any courses yet.</p>
                <Link href="/en/courses" className="px-8 py-3.5 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105">
                  Explore Courses
                </Link>
              </div>
            )}
          </section>

          {/* بخش راست: Community (نیلی) */}
          <section className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white tracking-wide">Community</h2>
            </div>
            
            <Link href="/en/dashboard/groups" className="block h-[220px] rounded-[2.5rem] border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-black p-8 relative overflow-hidden group hover:border-indigo-500/60 transition-all duration-500 shadow-[0_10px_30px_rgba(79,70,229,0.05)] hover:-translate-y-2">
               <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-indigo-500/20 rounded-full blur-[50px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                   <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-[1rem] flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-500">💬</div>
                   <h3 className="text-xl font-black text-white">Class Groups</h3>
                   <p className="text-xs text-indigo-200/50 mt-1.5 max-w-[200px] leading-relaxed">Join discussions, ask questions, and collaborate with peers.</p>
                 </div>
                 <div className="flex items-center text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                   Open Messenger <span className="ml-2 text-sm group-hover:translate-x-2 transition-transform duration-300">→</span>
                 </div>
               </div>
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}