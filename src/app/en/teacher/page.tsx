"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TeacherOverview() {
  const [instructorName, setInstructorName] = useState("Instructor");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      
      const { data: profile } = await supabase.from("profiles").select("first_name").eq("id", session.user.id).single();
      if (profile) setInstructorName(profile.first_name);
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full relative min-h-screen pb-12">
      
      {/* هدر مخصوص مدرس */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{instructorName}</span>!
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Here is an overview of your active classes and students.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          + Schedule Class
        </button>
      </header>

      {/* بدنه */}
      <div className="px-8 md:px-12 pt-8 max-w-7xl mx-auto">
        
        {/* کارت‌های آماری مدرس */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 flex flex-col shadow-lg">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-xl mb-4">👥</div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1">My Students</p>
            <h3 className="text-3xl font-extrabold text-white">124</h3>
          </div>
          
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 flex flex-col shadow-lg">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-xl mb-4">🔴</div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1">Upcoming Live Classes</p>
            <h3 className="text-3xl font-extrabold text-white">3</h3>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 flex flex-col shadow-lg">
            <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center text-xl mb-4">📝</div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1">Pending Assignments</p>
            <h3 className="text-3xl font-extrabold text-white">45</h3>
          </div>
        </div>

        {/* بخش محتوای اصلی (برنامه زمانی کلاس‌های امروز) */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Today's Schedule</h2>
          <div className="py-12 text-center border border-white/5 rounded-2xl bg-neutral-900/20">
            <span className="text-4xl opacity-50 block mb-4">📅</span>
            <p className="text-white font-bold mb-2">No Classes Scheduled Today</p>
            <p className="text-neutral-500 text-sm">Take a rest or review pending assignments from your students.</p>
          </div>
        </div>

      </div>
    </div>
  );
}