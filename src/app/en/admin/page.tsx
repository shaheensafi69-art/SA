"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import GlobalAnnouncementModal from "@/components/admin/GlobalAnnouncementModal";

// --- Types ---
type AdminStats = {
  totalStudents: number;
  activeTickets: number;
  totalRevenue: number;
  pendingWithdrawals: number;
};

type RecentTransaction = {
  id: string;
  student: { first_name: string; last_name: string; email: string } | null;
  amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
};

type LiveClass = {
  id: string;
  title: string;
  status: string;
  instructor: string;
  studentsCount: number;
  startTime: string;
};

type AdminProfile = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string | null;
};

type TicketPreview = {
  id: string;
  subject: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({ totalStudents: 0, activeTickets: 0, totalRevenue: 0, pendingWithdrawals: 0 });
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  
  // استیت‌های جدید برای پروفایل و منوها
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [recentTickets, setRecentTickets] = useState<TicketPreview[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 0. دریافت اطلاعات واقعی ادمین
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        setAdminProfile(profile as AdminProfile);
      }

      // 1. آمار کلی
      const { count: studentsCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("role", "student");
      const { count: ticketsCount } = await supabase.from("tickets").select("*", { count: 'exact', head: true }).eq("status", "open");

      // 1.5 دریافت تیکت‌های اخیر برای بخش نوتیفیکیشن
      const { data: ticketsData } = await supabase
        .from("tickets")
        .select("id, subject, status, created_at")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentTickets(ticketsData || []);

      // 2. محاسبه درآمد واقعی
      const { data: revenueData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("status", "COMPLETED")
        .in("transaction_type", ["deposit", "payment", "course_fee"]);
      const realTotalRevenue = revenueData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

      // 3. محاسبه درخواست‌های برداشت
      const { count: withdrawalsCount } = await supabase
        .from("transactions")
        .select("*", { count: 'exact', head: true })
        .eq("transaction_type", "withdrawal")
        .eq("status", "PENDING");

      // 4. دریافت تراکنش‌های اخیر
      const { data: recentTx } = await supabase
        .from("transactions")
        .select(`id, amount, transaction_type, status, created_at, student:profiles!student_id(first_name, last_name, email)`)
        .order("created_at", { ascending: false })
        .limit(6);

      // 5. دریافت کلاس‌های زنده فعال
      const { data: classesData } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active, start_date,
          teacher:profiles!teacher_id(first_name, last_name),
          class_students(student_id)
        `)
        .order("start_date", { ascending: true })
        .limit(5);

      let formattedClasses: LiveClass[] = [];
      if (classesData && classesData.length > 0) {
        formattedClasses = classesData.map((cls: any) => {
          const teacherData = Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher;
          const instructorName = teacherData ? `${teacherData.first_name} ${teacherData.last_name}` : "Unknown Instructor";
          const studentsCount = cls.class_students ? cls.class_students.length : 0;
          const startDate = new Date(cls.start_date);
          const timeString = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

          return {
            id: cls.id,
            title: cls.class_name,
            status: cls.is_active ? "Live" : "Scheduled",
            instructor: instructorName,
            studentsCount: studentsCount,
            startTime: timeString,
          };
        });
        setLiveClasses(formattedClasses);
        if (formattedClasses.length > 0) {
          setSelectedClassId(formattedClasses[0].id);
        }
      }

      setStats({
        totalStudents: studentsCount || 0,
        activeTickets: ticketsCount || 0,
        totalRevenue: realTotalRevenue,
        pendingWithdrawals: withdrawalsCount || 0,
      });

      if (recentTx) {
        const formattedTx = recentTx.map((tx: any) => ({
          ...tx,
          student: Array.isArray(tx.student) ? tx.student[0] : tx.student,
        }));
        setTransactions(formattedTx as RecentTransaction[]);
      }

    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClass = liveClasses.find((liveClass) => liveClass.id === selectedClassId);
  const activeLiveSessionsCount = liveClasses.filter(c => c.status === "Live").length;

  return (
    <div className="w-full relative min-h-screen bg-[#020202] text-white">
      
      {/* اوورلی نامرئی برای بستن کشوها با کلیک در فضای خالی */}
      {(isProfileMenuOpen || isNotificationMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setIsProfileMenuOpen(false); setIsNotificationMenuOpen(false); }}
        ></div>
      )}

      {/* ================= Header ================= */}
      <header className="h-24 px-8 flex justify-between items-center border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        
        {/* بخش سمت چپ: لوگو (بدون باکس و بزرگتر) */}
        <div className="flex items-center gap-4">
          <img src="/logo-without-b.png" alt="Safi Admin" className="w-14 h-14 sm:w-16 sm:h-16 object-contain invert brightness-0 transition-transform hover:scale-105" />
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Admin Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Center</span></h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 hidden sm:block">Admin hub for courses, teachers, live classrooms and student performance</p>
          </div>
        </div>

        {/* بخش سمت راست: نوتیفیکیشن‌ها و پروفایل */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          
          {/* Notifications Dropdown */}
          <div className="relative z-50">
            <button 
              onClick={() => { setIsNotificationMenuOpen(!isNotificationMenuOpen); setIsProfileMenuOpen(false); }}
              className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isNotificationMenuOpen ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <span className="text-lg">🔔</span>
              {stats.activeTickets > 0 && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-[#020202] animate-pulse"></span>
              )}
            </button>

            {isNotificationMenuOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-neutral-950 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="font-bold text-sm text-white">Recent Tickets</h3>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Pending user requests</p>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                  {recentTickets.length > 0 ? (
                    recentTickets.map(ticket => (
                      <Link href={`/en/admin/tickets/${ticket.id}`} key={ticket.id} className="block p-3 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-white line-clamp-1 pr-4">{ticket.subject}</span>
                          <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0 mt-1"></span>
                        </div>
                        <span className="text-[10px] text-neutral-500">{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-neutral-500">
                      <span className="text-3xl block mb-2 opacity-50">✅</span>
                      <p className="text-xs">No pending tickets right now.</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-white/5 text-center bg-white/[0.02]">
                  <Link href="/en/admin/tickets" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View All Tickets →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative z-50">
            <button 
              onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen); setIsNotificationMenuOpen(false); }}
              className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-white/10 text-left transition-opacity hover:opacity-80"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-white">
                  {adminProfile ? `${adminProfile.first_name} ${adminProfile.last_name}` : 'Loading...'}
                </p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-indigo-400">
                  {adminProfile?.role?.replace('_', ' ') || 'Admin'}
                </p>
              </div>
              
              {/* Profile Image / Initials */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/30 flex items-center justify-center bg-neutral-900 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                {adminProfile?.avatar_url ? (
                  <img src={adminProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-black text-neutral-400">
                    {adminProfile ? `${adminProfile.first_name.charAt(0)}${adminProfile.last_name.charAt(0)}` : 'SA'}
                  </span>
                )}
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-neutral-950 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl p-2 animate-[fadeIn_0.2s_ease-out] flex flex-col gap-1">
                <div className="px-4 py-3 border-b border-white/5 mb-1 md:hidden">
                   <p className="text-sm font-bold text-white">{adminProfile ? `${adminProfile.first_name} ${adminProfile.last_name}` : 'Loading...'}</p>
                   <p className="text-[10px] uppercase tracking-[0.35em] text-indigo-400 mt-0.5">{adminProfile?.role?.replace('_', ' ') || 'Admin'}</p>
                </div>
                
                <Link href="/en/admin" className="px-4 py-3 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-3">
                  <span className="text-lg opacity-70">📊</span> Dashboard Hub
                </Link>
                <Link href="/en/admin/add-course" className="px-4 py-3 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-3">
                  <span className="text-lg opacity-70">📚</span> Add Course
                </Link>
                <Link href="/en/admin/manage-teachers" className="px-4 py-3 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-3">
                  <span className="text-lg opacity-70">👥</span> Manage Faculty
                </Link>
                <Link href="/en/admin/live-classes" className="px-4 py-3 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-3">
                  <span className="text-lg opacity-70">🔴</span> Live Studio
                </Link>
                
                <div className="h-px bg-white/5 my-1"></div>
                
                <Link href="/en/admin/settings" className="px-4 py-3 text-sm font-bold text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 rounded-2xl transition-colors flex items-center gap-3">
                  <span className="text-lg opacity-80">⚙️</span> Settings & Profile
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* ================= Main Content ================= */}
      <div className="p-4 sm:p-8 max-w-[1600px] mx-auto animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= Hero Section ================= */}
        <section className="mb-10 rounded-[2.5rem] border border-white/10 bg-neutral-950/70 p-6 sm:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%)] pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-sky-500/10 blur-[160px] pointer-events-none"></div>
          <div className="relative z-10 grid gap-8 xl:grid-cols-[1.5fr_0.8fr] xl:items-end">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">Admin Hub</span>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Everything in one place.</h2>
              <p className="max-w-2xl text-base sm:text-lg leading-8 text-neutral-400">This dashboard is the central control panel for the whole system. Select classes, manage live sessions, review student attendance, and jump into dedicated admin pages from one interface.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/en/admin/add-course" className="inline-flex items-center justify-between rounded-3xl border border-white/10 bg-yellow-500/10 px-6 py-4 text-sm font-semibold text-white transition hover:border-yellow-400/30 hover:bg-yellow-500/15">
                  New Course <span className="ml-2">→</span>
                </Link>
                <Link href="/en/admin/live-classes" className="inline-flex items-center justify-between rounded-3xl border border-white/10 bg-blue-500/10 px-6 py-4 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/15">
                  Live Class Panel <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">System Overview</p>
              <div className="mt-5 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1 rounded-3xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Active Students</p>
                    <p className="mt-2 text-2xl font-bold text-white">{isLoading ? "..." : stats.totalStudents}</p>
                    </div>
                    <div className="flex-1 rounded-3xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Total Revenue</p>
                    <p className="mt-2 text-2xl font-bold text-green-400">${isLoading ? "..." : stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 rounded-3xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Pending Tickets</p>
                    <p className="mt-2 text-2xl font-bold text-white">{isLoading ? "..." : stats.activeTickets}</p>
                    </div>
                    <div className="flex-1 rounded-3xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Withdrawals</p>
                    <p className="mt-2 text-2xl font-bold text-yellow-500">{isLoading ? "..." : stats.pendingWithdrawals}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Bottom Grid ================= */}
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            
            {/* Live Class Control Section */}
            <section className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    Live Class Control
                    {activeLiveSessionsCount > 0 && (
                        <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                    )}
                  </h3>
                  <p className="mt-2 text-neutral-400 text-sm">Select a class to inspect attendance, instructor details, and open direct session links.</p>
                </div>
                <Link href="/en/admin/live-classes" className="text-sm font-semibold text-blue-300 hover:text-blue-200">Open the live classroom studio →</Link>
              </div>

              <div className="mt-8 grid gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                    <div className="text-center py-10 text-neutral-500">Loading active classes...</div>
                ) : liveClasses.length === 0 ? (
                    <div className="text-center py-10 border border-white/5 rounded-3xl bg-white/5">
                        <span className="text-4xl opacity-50 block mb-2">😴</span>
                        <p className="text-neutral-400">No active or scheduled classes found.</p>
                    </div>
                ) : (
                    liveClasses.map((room) => (
                    <button
                        key={room.id}
                        onClick={() => setSelectedClassId(room.id)}
                        className={`group w-full text-left rounded-3xl border px-5 py-4 transition ${selectedClassId === room.id ? "border-blue-400/40 bg-sky-500/10" : "border-white/10 bg-white/5 hover:border-sky-400/30 hover:bg-sky-500/10"}`}
                    >
                        <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-white">{room.title}</p>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 mt-1">Instructor: {room.instructor}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] ${room.status === "Live" ? "bg-green-500/10 text-green-300" : "bg-white/10 text-neutral-300"}`}>{room.status}</span>
                        </div>
                    </button>
                    ))
                )}
              </div>
            </section>

            {/* Selected Class Details */}
            {selectedClass && (
                <section className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl animate-[fadeIn_0.3s_ease-out]">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                    <h3 className="text-2xl font-bold text-white">Selected class details</h3>
                    <p className="text-neutral-400 text-sm">Real-time data from the database for this specific session.</p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Class Name</p>
                    <p className="mt-3 text-xl font-bold text-white">{selectedClass.title}</p>
                    <p className="mt-2 text-sm text-neutral-400">Instructor: {selectedClass.instructor}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Status & Time</p>
                    <p className={`mt-3 text-2xl font-bold ${selectedClass.status === 'Live' ? 'text-green-400' : 'text-white'}`}>{selectedClass.status}</p>
                    <p className="mt-2 text-sm text-neutral-400">Starts at {selectedClass.startTime}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Enrolled Students</p>
                    <p className="mt-3 text-3xl font-bold text-white">{selectedClass.studentsCount}</p>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button className="rounded-3xl bg-blue-500/10 px-5 py-4 text-sm font-semibold text-blue-300 hover:bg-blue-500/20 transition text-center">Open live classroom</button>
                    <button className="rounded-3xl bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:bg-white/10 transition text-center">View student list</button>
                </div>
                </section>
            )}

            {/* Quick Links Section */}
            <section className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Connected admin pages</h3>
                  <p className="text-sm text-neutral-400">Jump to any system panel from here.</p>
                </div>
                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-yellow-300 hidden sm:block">Quick access</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/en/admin/add-course" className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:border-green-400/30 hover:bg-green-500/10 transition text-center">Course Builder</Link>
                <Link href="/en/admin/manage-teachers" className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:border-yellow-400/30 hover:bg-yellow-500/10 transition text-center">Faculty Mgmt</Link>
                <Link href="/en/admin/live-classes" className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:border-blue-400/30 hover:bg-blue-500/10 transition text-center">Live Studio</Link>
              </div>
            </section>
          </div>

          {/* ================= Right Sidebar (Transactions & Actions) ================= */}
          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                  {isLoading ? (
                       <p className="text-neutral-500 text-sm text-center py-4">Loading...</p>
                  ) : transactions.length === 0 ? (
                       <p className="text-neutral-500 text-sm text-center py-4">No recent activity</p>
                  ) : (
                      transactions.map(tx => (
                          <div key={tx.id} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                              <div>
                                  <p className="text-sm font-bold text-white">{tx.student?.first_name || "User"}</p>
                                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{tx.transaction_type.replace('_', ' ')}</p>
                              </div>
                              <div className="text-right">
                                  <p className={`font-mono text-sm font-bold ${tx.amount > 0 ? "text-green-400" : "text-white"}`}>{tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}</p>
                                  <p className={`text-[9px] uppercase tracking-widest ${tx.status === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'}`}>{tx.status}</p>
                              </div>
                          </div>
                      ))
                  )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <h3 className="text-xl font-bold text-white mb-4">Fast actions</h3>
              <div className="space-y-3">
                <button onClick={() => setIsModalOpen(true)} className="w-full text-left rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:border-indigo-400/30 hover:bg-indigo-500/10 transition">📢 Broadcast Announcement</button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <h3 className="text-xl font-bold text-white mb-4">System health</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400 mb-2"><span>Database load</span><span className="text-green-400">Healthy 18%</span></div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full w-[18%] bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.55)]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400 mb-2"><span>Safi AI Usage</span><span className="text-indigo-400">Active</span></div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full w-[100%] bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.55)]"></div></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <GlobalAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}