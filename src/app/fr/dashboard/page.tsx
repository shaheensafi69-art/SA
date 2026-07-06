"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [student, setStudent] = useState({
    first_name: "",
    avatar: "",
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
      
      if (!session?.user) return;
      const userId = session.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, avatar_url, total_score")
        .eq("id", userId)
        .single();

      if (profile) {
        setStudent({
          first_name: profile.first_name || "Student",
          avatar: profile.avatar_url || "https://i.pravatar.cc/150?img=11",
        });
      }

      const [enrollmentsRes, certsRes] = await Promise.all([
        supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("student_id", userId),
        supabase.from("certificates").select("id", { count: "exact", head: true }).eq("student_id", userId)
      ]);

      setStats({
        enrolledCourses: enrollmentsRes.count || 0,
        totalScore: profile?.total_score || 0,
        certificates: certsRes.count || 0,
      });

      const { data: latestEnrollment } = await supabase
        .from("enrollments")
        .select(`
          progress_percentage,
          courses (
            title,
            thumbnail_url
          )
        `)
        .eq("student_id", userId)
        .order("enrolled_at", { ascending: false })
        .limit(1)
        .single();

      if (latestEnrollment && latestEnrollment.courses) {
        const courseData = Array.isArray(latestEnrollment.courses) 
          ? latestEnrollment.courses[0] 
          : latestEnrollment.courses;

        setActiveCourse({
          title: courseData.title || "Untitled Course",
          thumbnail: courseData.thumbnail_url || "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=800",
          progress: latestEnrollment.progress_percentage || 0,
        });
      }

      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full">
      
      {/* ================= Header / تراز شده دقیقاً با سایدبار ================= */}
      {/* ارتفاع دقیقاً h-24 تنظیم شد تا با هدر سایدبار در یک خط قرار بگیرد */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out]">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{isLoading ? "..." : student.first_name}</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Ready to conquer the financial markets today?</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 md:w-12 md:h-12 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#050505] animate-pulse"></span>
          </button>
          
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-neutral-800 flex items-center justify-center">
            {student.avatar && student.avatar !== "https://i.pravatar.cc/150?img=11" ? (
              <img src={student.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-yellow-500">{student.first_name.charAt(0) || "S"}</span>
            )}
          </div>
        </div>
      </header>

      {/* ================= بدنه اصلی محتوا ================= */}
      <div className="px-8 md:px-12 pt-6 pb-12 max-w-7xl mx-auto">
        
        {/* ================= Overview Stats ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-6 hover:bg-neutral-900/60 transition-all hover:-translate-y-1 shadow-lg group cursor-default">
            <div className="w-14 h-14 bg-white/5 group-hover:bg-yellow-500/10 rounded-2xl flex items-center justify-center text-2xl transition-colors">📚</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Enrolled Courses</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : stats.enrolledCourses}</h3>
            </div>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-6 hover:bg-neutral-900/60 transition-all hover:-translate-y-1 shadow-lg group cursor-default">
            <div className="w-14 h-14 bg-white/5 group-hover:bg-yellow-500/10 rounded-2xl flex items-center justify-center text-2xl transition-colors">⚡</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Total Score</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : stats.totalScore}</h3>
            </div>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex items-center gap-6 hover:bg-neutral-900/60 transition-all hover:-translate-y-1 shadow-lg group cursor-default">
            <div className="w-14 h-14 bg-white/5 group-hover:bg-yellow-500/10 rounded-2xl flex items-center justify-center text-2xl transition-colors">🏆</div>
            <div>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Certificates</p>
              <h3 className="text-2xl font-extrabold text-white">{isLoading ? "-" : stats.certificates}</h3>
            </div>
          </div>
        </div>

        {/* ================= Continue Learning ================= */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Continue Learning</h2>
          
          {isLoading ? (
            <div className="w-full h-40 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse flex items-center justify-center">
              <span className="text-neutral-500 font-bold">Loading...</span>
            </div>
          ) : activeCourse ? (
            <div className="bg-gradient-to-r from-neutral-900/80 to-black/60 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group cursor-pointer hover:border-yellow-500/30 transition-colors">
              
              <div className="w-full md:w-64 h-48 md:h-40 rounded-2xl overflow-hidden shrink-0 relative bg-neutral-800">
                <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <button className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <p className="text-yellow-500 font-bold text-sm mb-2">Pick up where you left off</p>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-6 leading-tight">{activeCourse.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-neutral-400">Course Progress</span>
                    <span className="text-yellow-400">{activeCourse.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full relative" style={{ width: `${activeCourse.progress}%` }}>
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:20px_20px] animate-[progress_1s_linear_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-lg h-40">
              <p className="text-neutral-400 font-bold mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/en/courses" className="px-6 py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-colors">
                Explore Courses
              </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}