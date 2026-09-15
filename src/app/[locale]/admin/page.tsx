"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Users, DollarSign, HelpCircle, AlertCircle, BookOpen, UserCheck, Megaphone, Radio, Award, Wallet } from "lucide-react";

type AdminStats = {
  totalStudents: number;
  activeTickets: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  totalTeachers: number;
  activeCourses: number;
};

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [stats, setStats] = useState<AdminStats>({ 
    totalStudents: 0, 
    activeTickets: 0, 
    totalRevenue: 0, 
    pendingWithdrawals: 0,
    totalTeachers: 0,
    activeCourses: 0
  });

  useEffect(() => {
    fetchCoreStats();
  }, []);

  const fetchCoreStats = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // دریافت نام ادمین
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase.from("profiles").select("first_name").eq("id", session.user.id).single();
        if (profile) setAdminName(profile.first_name);
      }

      // دریافت آمار کلان به صورت موازی (Parallel) برای سرعت بیشتر
      const [
        { count: studentsCount },
        { count: teachersCount },
        { count: coursesCount },
        { count: ticketsCount },
        { count: withdrawalsCount },
        { data: revenueData }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("role", "student"),
        supabase.from("profiles").select("*", { count: 'exact', head: true }).in("role", ["teacher", "mentor"]),
        supabase.from("courses").select("*", { count: 'exact', head: true }).eq("is_published", true),
        supabase.from("tickets").select("*", { count: 'exact', head: true }).eq("status", "open"),
        supabase.from("transactions").select("*", { count: 'exact', head: true }).eq("transaction_type", "withdrawal").eq("status", "PENDING"),
        supabase.from("transactions").select("amount").eq("status", "COMPLETED").in("transaction_type", ["deposit", "payment", "course_fee"])
      ]);

      const realTotalRevenue = revenueData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        activeCourses: coursesCount || 0,
        activeTickets: ticketsCount || 0,
        totalRevenue: realTotalRevenue,
        pendingWithdrawals: withdrawalsCount || 0,
      });

    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Syncing Core Metrics...</p>
      </div>
    );
  }

  // لیست دکمه‌های دسترسی سریع برای ادمین
  const quickLinks = [
    { name: "Student Desk", desc: "Manage enrollments", path: "/en/admin/manage-students", icon: <Users size={24}/>, color: "emerald" },
    { name: "Faculty Office", desc: "Manage instructors", path: "/en/admin/manage-teachers", icon: <UserCheck size={24}/>, color: "indigo" },
    { name: "Course Builder", desc: "Create & edit courses", path: "/en/admin/courses", icon: <BookOpen size={24}/>, color: "violet" },
    { name: "Live Studio", desc: "Monitor active streams", path: "/en/admin/live-classes", icon: <Radio size={24}/>, color: "red" },
    { name: "Financial Ledger", desc: "Transactions & payouts", path: "/en/admin/finance", icon: <Wallet size={24}/>, color: "green" },
    { name: "Broadcast Hub", desc: "Global announcements", path: "/en/admin/announcements", icon: <Megaphone size={24}/>, color: "orange" },
    { name: "Honors System", desc: "Manage badges & awards", path: "/en/admin/awards", icon: <Award size={24}/>, color: "amber" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
        
        {/* ================= HERO BANNER ================= */}
        <section className="rounded-[2.5rem] border border-white/5 bg-[#0a0a0f]/60 p-6 sm:p-10 shadow-2xl backdrop-blur-3xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10">
            <span className="inline-flex rounded-full border border-rose-500/20 bg-rose-500/5 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-rose-400">
              System Core Overview
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Welcome back, <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">{adminName || 'Admin'}</span>
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-neutral-400 font-medium">
              Here is a high-level summary of your academy's current performance and metrics.
            </p>
          </div>

          <div className="flex gap-4 relative z-10 shrink-0">
             <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl text-center shadow-inner">
               <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Active Courses</p>
               <p className="text-2xl font-black text-white">{stats.activeCourses}</p>
             </div>
             <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl text-center shadow-inner">
               <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Total Faculty</p>
               <p className="text-2xl font-black text-white">{stats.totalTeachers}</p>
             </div>
          </div>
        </section>

        {/* ================= 4 MAIN METRICS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl group hover:border-emerald-500/30 transition-colors flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20"><Users size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Students</p>
            <p className="text-3xl font-black text-white">{stats.totalStudents}</p>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl group hover:border-green-500/30 transition-colors flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-4 border border-green-500/20"><DollarSign size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Gross Revenue</p>
            <p className="text-3xl font-black text-emerald-400">${stats.totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] backdrop-blur-xl relative overflow-hidden group flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
            <div className="relative z-10 w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4 border border-amber-500/30"><HelpCircle size={20}/></div>
            <p className="relative z-10 text-[10px] font-black text-amber-500/70 uppercase tracking-widest mb-1">Open Tickets</p>
            <p className="relative z-10 text-3xl font-black text-amber-400">{stats.activeTickets}</p>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)] backdrop-blur-xl relative overflow-hidden group flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-rose-500/5 animate-pulse"></div>
            <div className="relative z-10 w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center mb-4 border border-rose-500/30"><AlertCircle size={20}/></div>
            <p className="relative z-10 text-[10px] font-black text-rose-500/70 uppercase tracking-widest mb-1">Pending Payouts</p>
            <p className="relative z-10 text-3xl font-black text-rose-400">{stats.pendingWithdrawals}</p>
          </div>
        </div>

        {/* ================= COMMAND CENTER NAVIGATION GRID ================= */}
        <section className="pt-4">
          <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-6 pl-2 flex items-center gap-2">
             System Workspaces <span className="w-10 h-px bg-white/10"></span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {quickLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.path}
                className="bg-[#0a0a0f]/80 border border-white/5 p-6 rounded-[2rem] shadow-lg backdrop-blur-xl hover:-translate-y-1 hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col gap-4 group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-110 
                  ${link.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                  ${link.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : ''}
                  ${link.color === 'violet' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : ''}
                  ${link.color === 'red' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                  ${link.color === 'green' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                  ${link.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                  ${link.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                `}>
                  {link.icon}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">{link.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}