"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  Users,
  DollarSign,
  HelpCircle,
  AlertCircle,
  BookOpen,
  UserCheck,
  Megaphone,
  Radio,
  Award,
  Wallet,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Presentation,
  GraduationCap,
  ClipboardList,
  Headset,
  CircleDollarSign,
  Newspaper,
  ShieldAlert,
  Activity,
  Check,
  Zap,
  CreditCard
} from "lucide-react";

type AdminStats = {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  activeClasses: number;
  activeTickets: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  pendingApplications: number;
};

type RecentTransaction = {
  id: string;
  amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
};

type RecentTicket = {
  id: string;
  subject: string;
  department: string;
  status: string;
  created_at: string;
  userName: string;
  userRole: string;
};

type RecentApplicant = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  course_title: string;
  category: string;
  created_at: string;
};

export default function AdminDashboard() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalTeachers: 0,
    activeCourses: 0,
    activeClasses: 0,
    activeTickets: 0,
    totalRevenue: 0,
    pendingWithdrawals: 0,
    pendingApplications: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);

  useEffect(() => {
    fetchExecutiveMetrics();
  }, []);

  const fetchExecutiveMetrics = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    const supabase = createClient();

    try {
      // 1. دریافت هویت ادمین فعال
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setAdminName(profile.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : "Admin");
          setAdminAvatar(profile.avatar_url);
        }
      }

      // 2. دریافت شاخص‌های کلان سیستم به‌صورت موازی (Parallel queries)
      const [
        { count: studentsCount },
        { count: teachersCount },
        { count: coursesCount },
        { count: classesCount },
        { count: ticketsCount },
        { count: withdrawalsCount },
        { count: applicationsCount },
        { data: revenueData },
        { data: rawTransactions },
        { data: rawTickets },
        { data: rawApplicants }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).in("role", ["teacher", "mentor"]),
        supabase.from("courses").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("class_groups").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
        supabase.from("transactions").select("*", { count: "exact", head: true }).eq("transaction_type", "withdrawal").eq("status", "PENDING"),
        supabase.from("instructor_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("transactions").select("amount").eq("status", "COMPLETED").in("transaction_type", ["deposit", "payment", "course_fee"]),
        supabase.from("transactions").select("id, amount, transaction_type, status, created_at, student_id").order("created_at", { ascending: false }).limit(6),
        supabase.from("tickets").select("id, student_id, subject, department, status, created_at").eq("status", "open").order("created_at", { ascending: false }).limit(5),
        supabase.from("instructor_applications").select("id, first_name, last_name, email, course_title, category, created_at").eq("status", "pending").order("created_at", { ascending: false }).limit(3),
      ]);

      // محاسبه درآمد ناخالص
      const realTotalRevenue = revenueData?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        activeCourses: coursesCount || 0,
        activeClasses: classesCount || 0,
        activeTickets: ticketsCount || 0,
        totalRevenue: realTotalRevenue,
        pendingWithdrawals: withdrawalsCount || 0,
        pendingApplications: applicationsCount || 0,
      });

      // 3. تطبیق پروفایل‌های تراکنش‌ها و تیکت‌ها
      const userIdsToFetch = new Set<string>();
      (rawTransactions || []).forEach((tx: any) => {
        if (tx.student_id) userIdsToFetch.add(tx.student_id);
      });
      (rawTickets || []).forEach((tk: any) => {
        if (tk.student_id) userIdsToFetch.add(tk.student_id);
      });

      let profilesMap = new Map<string, any>();
      if (userIdsToFetch.size > 0) {
        const { data: userProfiles } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url, role")
          .in("id", Array.from(userIdsToFetch));

        if (userProfiles) {
          userProfiles.forEach((p) => profilesMap.set(p.id, p));
        }
      }

      // قالب‌بندی تراکنش‌های اخیر
      const formattedTransactions: RecentTransaction[] = (rawTransactions || []).map((tx: any) => {
        const user = profilesMap.get(tx.student_id);
        const name = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : (isRtl ? "کاربر ناشناس" : "Anonymous User");
        return {
          id: tx.id,
          amount: Number(tx.amount) || 0,
          transaction_type: tx.transaction_type,
          status: tx.status,
          created_at: tx.created_at,
          userName: name || "Scholar",
          userEmail: user?.email || "—",
          userAvatar: user?.avatar_url || null,
        };
      });
      setRecentTransactions(formattedTransactions);

      // قالب‌بندی تیکت‌های پشتیبانی باز
      const formattedTickets: RecentTicket[] = (rawTickets || []).map((tk: any) => {
        const user = profilesMap.get(tk.student_id);
        const name = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : (isRtl ? "کاربر سامانه" : "User");
        return {
          id: tk.id,
          subject: tk.subject || (isRtl ? "درخواست پشتیبانی" : "Support Request"),
          department: tk.department || "General",
          status: tk.status,
          created_at: tk.created_at,
          userName: name || "Member",
          userRole: user?.role || "student",
        };
      });
      setRecentTickets(formattedTickets);

      // متقاضیان تدریس جدید
      if (rawApplicants) {
        setRecentApplicants(rawApplicants as RecentApplicant[]);
      }
    } catch (error) {
      console.error("Error fetching executive admin metrics:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // کارت‌های عملیاتی سریع در ۴ شاخه اصلی
  const commandModules = [
    {
      groupTitle: isRtl ? "سرمایه انسانی و اعضا" : "Human Capital & Academy Roster",
      groupIcon: Users,
      color: "emerald",
      items: [
        {
          name: t.adminPages.studentDesk || (isRtl ? "میز مدیریت دانشجویان" : "Student Desk"),
          desc: t.adminPages.studentDeskDesc || (isRtl ? "ثبت‌نام‌ها، پروفایل و دسترسی‌ها" : "Enrollments & Scholar Records"),
          path: `/${currentLocale}/admin/manage-students`,
          icon: Users,
          count: stats.totalStudents,
          badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        },
        {
          name: t.adminPages.facultyOffice || (isRtl ? "دفتر هیئت علمی و اساتید" : "Faculty Office"),
          desc: t.adminPages.facultyOfficeDesc || (isRtl ? "مدیریت استادان، حقوق و کلاس‌ها" : "Instructors, Payroll & Classes"),
          path: `/${currentLocale}/admin/manage-teachers`,
          icon: UserCheck,
          count: stats.totalTeachers,
          badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        },
        {
          name: isRtl ? "درخواست‌های استخدام استاد" : "Faculty Applications",
          desc: isRtl ? "بررسی رزومه، ویدیو و صدور دعوت‌نامه" : "Review Resumes, Videos & Onboard",
          path: `/${currentLocale}/admin/application-form`,
          icon: ClipboardList,
          count: stats.pendingApplications,
          badgeColor: stats.pendingApplications > 0 ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse" : "bg-white/5 text-neutral-400 border-white/5",
        },
      ],
    },
    {
      groupTitle: isRtl ? "خزانه‌داری و مدیریت مالی" : "Treasury & Financial Operations",
      groupIcon: CircleDollarSign,
      color: "green",
      items: [
        {
          name: t.adminPages.financialLedger || (isRtl ? "دفتر کل مالی و تسویه‌ها" : "Financial Ledger"),
          desc: t.adminPages.financialLedgerDesc || (isRtl ? "تراکنش‌های ورودی و برداشت‌ها" : "Transactions & Teacher Payouts"),
          path: `/${currentLocale}/admin/finance`,
          icon: Wallet,
          count: `$${stats.totalRevenue.toLocaleString()}`,
          badgeColor: "bg-green-500/10 text-emerald-400 border-green-500/20",
        },
        {
          name: isRtl ? "برداشت‌های نیازمند تایید" : "Pending Withdrawals",
          desc: isRtl ? "تسویه‌حساب کیف‌پول‌های استادان" : "Review & approve faculty payouts",
          path: `/${currentLocale}/admin/finance`,
          icon: CreditCard,
          count: stats.pendingWithdrawals,
          badgeColor: stats.pendingWithdrawals > 0 ? "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse" : "bg-white/5 text-neutral-400 border-white/5",
        },
        {
          name: isRtl ? "بورسیه‌های تحصیلی" : "Scholarships Program",
          desc: isRtl ? "تخصیص تخفیف و کدهای بورسیه" : "Grant special student discounts",
          path: `/${currentLocale}/admin/scholarships/create`,
          icon: GraduationCap,
          count: null,
          badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        },
      ],
    },
    {
      groupTitle: isRtl ? "عملیات آموزشی و استودیو" : "Curriculum & Broadcast Operations",
      groupIcon: BookOpen,
      color: "violet",
      items: [
        {
          name: t.adminPages.courseBuilder || (isRtl ? "استودیو مدیریت دوره‌ها" : "Course Studio"),
          desc: t.adminPages.courseBuilderDesc || (isRtl ? "ایجاد دوره، سرفصل‌ها و قیمت‌گذاری" : "Build, Publish & Manage Courses"),
          path: `/${currentLocale}/admin/courses`,
          icon: BookOpen,
          count: stats.activeCourses,
          badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
        },
        {
          name: isRtl ? "صنف‌های فعال آکادمی" : "Active Class Cohorts",
          desc: isRtl ? "گروه‌بندی کلاسی و اساتید مربوطه" : "Class cohorts, rosters & times",
          path: `/${currentLocale}/admin/classes`,
          icon: Presentation,
          count: stats.activeClasses,
          badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        },
        {
          name: t.adminPages.liveStudio || (isRtl ? "استودیو پخش زنده کلاس‌ها" : "Live Streaming Studio"),
          desc: t.adminPages.liveStudioDesc || (isRtl ? "نظارت بر جلسات زنده آنلاین" : "Monitor & Broadcast Live Streams"),
          path: `/${currentLocale}/admin/live-classes`,
          icon: Radio,
          count: null,
          badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        },
      ],
    },
    {
      groupTitle: isRtl ? "پشتیبانی، ارتباطات و افتخارات" : "Support, Honors & Community",
      groupIcon: Headset,
      color: "amber",
      items: [
        {
          name: isRtl ? "میز تیکت‌های پشتیبانی" : "Support Tickets Desk",
          desc: isRtl ? "رسیدگی به پیام‌ها و سوالات کاربران" : "Student & faculty support queue",
          path: `/${currentLocale}/admin/tickets`,
          icon: Headset,
          count: stats.activeTickets,
          badgeColor: stats.activeTickets > 0 ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse" : "bg-white/5 text-neutral-400 border-white/5",
        },
        {
          name: t.adminPages.broadcastHub || (isRtl ? "مرکز اعلانات سراسری" : "Broadcast Hub"),
          desc: t.adminPages.broadcastHubDesc || (isRtl ? "ارسال اطلاعیه برای دانشجویان و اساتید" : "Global Academy Announcements"),
          path: `/${currentLocale}/admin/announcements`,
          icon: Megaphone,
          count: null,
          badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        },
        {
          name: t.adminPages.honorsSystem || (isRtl ? "سامانه نشان‌ها و افتخارات" : "Honors & Awards"),
          desc: t.adminPages.honorsSystemDesc || (isRtl ? "تعریف مدال‌ها و گیمیفیکیشن" : "Badges, Medals & Achievements"),
          path: `/${currentLocale}/admin/awards`,
          icon: Award,
          count: null,
          badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        },
        {
          name: isRtl ? "وبلاگ و مقالات آکادمی" : "Academy Blog & Editorial",
          desc: isRtl ? "انتشار اخبار و مقالات تخصصی" : "Publish news & educational articles",
          path: `/${currentLocale}/admin/blogs/create`,
          icon: Newspaper,
          count: null,
          badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.syncingCoreMetrics || (isRtl ? "در حال فراخوانی داده‌های کلان مرکز فرماندهی..." : "Syncing Core Command Metrics...")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-[#020205] text-white p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden pb-32 lg:pb-16 font-sans custom-scrollbar"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ================= AMBIENT NEON GLOWS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-rose-600/[0.04] rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="fixed top-[30%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/[0.03] rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="fixed bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1700px] mx-auto space-y-8 sm:space-y-10">
        
        {/* ================= EXECUTIVE COCKPIT HERO ================= */}
        <section className="relative rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-[#0a0a14]/90 to-[#06060c]/80 p-6 sm:p-8 lg:p-10 backdrop-blur-3xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-110" />

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-bold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>{isRtl ? "مرکز مدیریت و فرماندهی ارشد آکادمی • نسخه ۳.۵" : "Executive Governance & Command Headquarters • v3.5"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {t.adminPages.welcomeBack || (isRtl ? "خوش آمدید،" : "Welcome back,")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                  {adminName || (isRtl ? "مدیر محترم" : "Director")}
                </span>
              </h1>

              <p className="text-neutral-400 text-xs sm:text-sm font-normal leading-relaxed">
                {t.adminPages.summary ||
                  (isRtl
                    ? "خلاصه وضعیت عملکرد کلان آکادمی، پردازش تراکنش‌های مالی، رسیدگی به تیکت‌ها و نظارت بر دوره‌های آموزشی در یک نگاه."
                    : "High-level governance dashboard: monitor real-time revenues, scholar enrollment growth, active courses, and support requests.")}
              </p>
            </div>

            {/* Quick Actions & Sync */}
            <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
              <button
                onClick={() => fetchExecutiveMetrics(true)}
                disabled={isRefreshing || isLoading}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                title={isRtl ? "به‌روزرسانی داده‌ها" : "Sync Database"}
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin text-rose-400" : "text-neutral-400"} />
                <span>{isRefreshing ? (isRtl ? "در حال دریافت..." : "Syncing...") : (isRtl ? "همگام‌سازی زنده" : "Live Sync")}</span>
              </button>

              <Link
                href={`/${currentLocale}/admin/courses/create`}
                className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:scale-105 active:scale-95"
              >
                <BookOpen size={14} />
                <span>{isRtl ? "ثبت دوره جدید" : "New Course"}</span>
              </Link>

              <Link
                href={`/${currentLocale}/admin/announcements`}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Megaphone size={14} className="text-orange-400" />
                <span>{isRtl ? "اعلان سراسری" : "Broadcast"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 6 EXECUTIVE KPI PILLARS ================= */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Pillar 1: Total Scholars */}
          <Link
            href={`/${currentLocale}/admin/manage-students`}
            className="bg-[#090913]/90 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {t.adminPages.totalStudents || (isRtl ? "کل دانشجویان" : "Total Scholars")}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Users size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white">{stats.totalStudents}</span>
              <span className="text-[10px] text-emerald-400 font-bold">{isRtl ? "فعال" : "active"}</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-3">
              <div className="bg-emerald-500 h-full w-[85%]" />
            </div>
          </Link>

          {/* Pillar 2: Total Faculty */}
          <Link
            href={`/${currentLocale}/admin/manage-teachers`}
            className="bg-[#090913]/90 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {t.adminPages.totalFaculty || (isRtl ? "هیئت علمی" : "Total Faculty")}
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <UserCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white">{stats.totalTeachers}</span>
              <span className="text-[10px] text-indigo-400 font-bold">{isRtl ? "استاد" : "staff"}</span>
            </div>
            <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
              {stats.activeClasses} {isRtl ? "صنف فعال جاری" : "active cohorts"}
            </p>
          </Link>

          {/* Pillar 3: Gross Revenue */}
          <Link
            href={`/${currentLocale}/admin/finance`}
            className="bg-[#090913]/90 border border-white/5 hover:border-green-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {t.adminPages.grossRevenue || (isRtl ? "گردش مالی کل" : "Gross Revenue")}
              </span>
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-emerald-400 flex items-center justify-center border border-green-500/20">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-emerald-400/80 truncate mt-3 font-medium">
              {isRtl ? "واریزهای تاییدشده" : "Verified inflows"}
            </p>
          </Link>

          {/* Pillar 4: Active Courses */}
          <Link
            href={`/${currentLocale}/admin/courses`}
            className="bg-[#090913]/90 border border-white/5 hover:border-violet-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {t.adminPages.activeCourses || (isRtl ? "دوره‌های منتشر" : "Curriculum")}
              </span>
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                <BookOpen size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white">{stats.activeCourses}</span>
              <span className="text-[10px] text-violet-400 font-bold">{isRtl ? "دوره" : "courses"}</span>
            </div>
            <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
              {isRtl ? "کاتالوگ آموزشی رسمی" : "Official catalog"}
            </p>
          </Link>

          {/* Pillar 5: Open Support Tickets */}
          <Link
            href={`/${currentLocale}/admin/tickets`}
            className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 border ${
              stats.activeTickets > 0
                ? "bg-amber-500/[0.04] border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                : "bg-[#090913]/90 border-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.adminPages.openTickets || (isRtl ? "تیکت‌های باز" : "Support Tickets")}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  stats.activeTickets > 0
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                    : "bg-white/5 text-neutral-400 border-white/10"
                }`}
              >
                <HelpCircle size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl sm:text-3xl font-black ${
                  stats.activeTickets > 0 ? "text-amber-400" : "text-white"
                }`}
              >
                {stats.activeTickets}
              </span>
              <span className="text-[10px] text-neutral-500 font-semibold">{isRtl ? "در انتظار پاسخ" : "pending"}</span>
            </div>
            <p className="text-[10px] text-amber-400/80 truncate mt-3 font-medium">
              {stats.activeTickets > 0 ? (isRtl ? "نیاز به رسیدگی فوری" : "Action required") : (isRtl ? "همه تیکت‌ها بسته شد ✓" : "Queue clear ✓")}
            </p>
          </Link>

          {/* Pillar 6: Pending Withdrawals */}
          <Link
            href={`/${currentLocale}/admin/finance`}
            className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 border ${
              stats.pendingWithdrawals > 0
                ? "bg-rose-500/[0.04] border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                : "bg-[#090913]/90 border-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.adminPages.pendingWithdrawals || (isRtl ? "برداشت در انتظار" : "Pending Payouts")}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  stats.pendingWithdrawals > 0
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse"
                    : "bg-white/5 text-neutral-400 border-white/10"
                }`}
              >
                <AlertCircle size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl sm:text-3xl font-black ${
                  stats.pendingWithdrawals > 0 ? "text-rose-400" : "text-white"
                }`}
              >
                {stats.pendingWithdrawals}
              </span>
              <span className="text-[10px] text-neutral-500 font-semibold">{isRtl ? "درخواست" : "requests"}</span>
            </div>
            <p className="text-[10px] text-rose-400/80 truncate mt-3 font-medium">
              {stats.pendingWithdrawals > 0 ? (isRtl ? "تسویه‌حساب اساتید" : "Awaiting review") : (isRtl ? "خزانه‌داری تسویه است ✓" : "All cleared ✓")}
            </p>
          </Link>
        </section>

        {/* ================= PENDING FACULTY APPLICANTS BANNER (IF ANY) ================= */}
        {recentApplicants.length > 0 && (
          <div className="bg-gradient-to-r from-amber-950/40 via-[#0c0c1a] to-amber-950/20 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <ClipboardList size={22} className="animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    {stats.pendingApplications} {isRtl ? "متقاضی تدریس جدید" : "New Applications"}
                  </span>
                  <span className="text-xs text-neutral-400 font-semibold">
                    {recentApplicants[0].first_name} {recentApplicants[0].last_name} ({recentApplicants[0].course_title})
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  {isRtl
                    ? "درخواست‌های جدید جذب مدرس در سیستم ثبت شده و منتظر تایید و ارسال لینک فعال‌سازی از طرف شما هستند."
                    : "New instructor recruitment applications are waiting for your review and activation link."}
                </p>
              </div>
            </div>

            <Link
              href={`/${currentLocale}/admin/application-form`}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 flex items-center justify-center gap-2"
            >
              <span>{isRtl ? "بررسی درخواست‌های تدریس" : "Review Applications"}</span>
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </Link>
          </div>
        )}

        {/* ================= LIVE OPERATIONAL STREAMS (2 COLUMNS) ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* STREAM 1: RECENT FINANCIAL TRANSACTIONS */}
          <div className="bg-[#080812]/90 border border-white/5 rounded-[2rem] p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between gap-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-emerald-400">
                  <Activity size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{isRtl ? "آخرین تراکنش‌های خزانه‌داری" : "Live Treasury Stream"}</h3>
                  <p className="text-[11px] text-neutral-400">{isRtl ? "ثبت لحظه‌ای واریزها، پرداخت‌ها و تسویه‌ها" : "Real-time inflows & payout ledger"}</p>
                </div>
              </div>

              <Link
                href={`/${currentLocale}/admin/finance`}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                <span>{isRtl ? "مشاهده کل دفتر" : "View All"}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((tx) => {
                  const isDeposit = ["deposit", "payment", "course_fee"].includes(tx.transaction_type);
                  return (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                            isDeposit
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          }`}
                        >
                          {isDeposit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{tx.userName}</p>
                          <p className="text-[10px] text-neutral-500 font-medium capitalize">
                            {tx.transaction_type.replace("_", " ")} •{" "}
                            {new Date(tx.created_at).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="text-right rtl:text-left shrink-0">
                        <p
                          className={`text-sm font-black ${
                            isDeposit ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {isDeposit ? "+" : "-"}${tx.amount.toLocaleString()}
                        </p>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-md ${
                            tx.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-300"
                              : tx.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-300"
                              : "bg-white/5 text-neutral-400"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-neutral-500 text-xs font-medium">
                {isRtl ? "تراکنشی در سیستم ثبت نشده است." : "No transactions recorded yet."}
              </div>
            )}
          </div>

          {/* STREAM 2: URGENT SUPPORT TICKETS QUEUE */}
          <div className="bg-[#080812]/90 border border-white/5 rounded-[2rem] p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between gap-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Headset size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{isRtl ? "تیکت‌های باز نیازمند پاسخ" : "Urgent Support Desk"}</h3>
                  <p className="text-[11px] text-neutral-400">{isRtl ? "پاسخ به سوالات فنی، مالی و آموزشی" : "Open user support inquiries"}</p>
                </div>
              </div>

              <Link
                href={`/${currentLocale}/admin/tickets`}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>{isRtl ? "میز تیکت‌ها" : "Tickets Hub"}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {recentTickets.length > 0 ? (
              <div className="space-y-3">
                {recentTickets.map((tk) => (
                  <Link
                    key={tk.id}
                    href={`/${currentLocale}/admin/tickets?ticketId=${tk.id}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all group/item"
                  >
                    <div className="min-w-0 pr-3 rtl:pl-3 rtl:pr-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-500/20">
                          {tk.department}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          {new Date(tk.created_at).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-xs font-black text-white group-hover/item:text-amber-400 transition-colors truncate">
                        {tk.subject}
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                        {isRtl ? "ارسال‌شده توسط:" : "From:"} {tk.userName} ({tk.userRole})
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-neutral-400 group-hover/item:text-white">
                      <span>{isRtl ? "پاسخ" : "Reply"}</span>
                      {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-neutral-300">
                  {isRtl ? "تمام تیکت‌های پشتیبانی پاسخ داده شده‌اند ✓" : "Support queue is fully cleared ✓"}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {isRtl ? "هیچ تیکت بازی در انتظار پاسخ وجود ندارد." : "No open tickets are awaiting response."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= COMMAND CENTER OPERATIONS HUB (4 POD GROUPS) ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
              <Zap size={20} className="text-rose-400" />
              <span>{t.adminPages.quickOperations || (isRtl ? "ماژول‌های مرکزی عملیات آکادمی" : "Command Operations Modules")}</span>
            </h2>
            <span className="text-xs text-neutral-500 font-bold">
              {isRtl ? "دسترسی مستقیم و نظارت کلان" : "Direct Governance Access"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {commandModules.map((group, gIdx) => {
              const GroupIcon = group.groupIcon;
              return (
                <div
                  key={gIdx}
                  className="bg-[#080812]/90 border border-white/5 rounded-[2rem] p-5 sm:p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between gap-5"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        group.color === "emerald"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : group.color === "green"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : group.color === "violet"
                          ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}
                    >
                      <GroupIcon size={16} />
                    </div>
                    <h3 className="text-xs font-black text-neutral-300 uppercase tracking-wider">{group.groupTitle}</h3>
                  </div>

                  <div className="space-y-2.5">
                    {group.items.map((item, iIdx) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={iIdx}
                          href={item.path}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all group/item"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover/item:text-white transition-colors shrink-0">
                              <ItemIcon size={15} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors truncate">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-neutral-500 truncate">{item.desc}</p>
                            </div>
                          </div>

                          {item.count !== null && item.count !== undefined && (
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${item.badgeColor}`}
                            >
                              {item.count}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
