"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  BookOpen,
  Video,
  TrendingUp,
  Target,
  FileText,
  Trophy,
  Flame,
  Wallet,
  Sparkles,
  Clock,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Plus,
  Award,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  Layers,
  Activity
} from "lucide-react";

interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  wallet_balance: number;
  total_score: number;
  role: string;
}

interface ActiveClass {
  id: string;
  class_name: string;
  meeting_link: string | null;
  class_time: string | null;
  class_days: string | null;
  course_title: string;
  thumbnail_url: string | null;
  instructor_name: string | null;
  progress: number;
}

interface TradeItem {
  id: string;
  symbol: string;
  position_type: string;
  profit_loss_usd: number | null;
  trade_date: string;
  teacher_score: number | null;
  teacher_feedback: string | null;
}

interface AssignmentItem {
  id: string;
  title: string;
  deadline: string;
  max_score: number;
  submitted: boolean;
}

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

export default function StudentPortalOverview() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [streakDays, setStreakDays] = useState(0);
  const [activeClass, setActiveClass] = useState<ActiveClass | null>(null);
  const [recentTrades, setRecentTrades] = useState<TradeItem[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<AssignmentItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  
  const [stats, setStats] = useState({
    enrolledClasses: 0,
    certificates: 0,
    quizzesPassed: 0,
    totalTrades: 0,
    totalProfitUSD: 0,
    totalScore: 0,
  });

  // پیام خوش‌آمدگویی بر اساس ساعت شبانه‌روز
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (isRtl) {
      if (hour >= 5 && hour < 12) return "صبح بخیر";
      if (hour >= 12 && hour < 17) return "ظهر بخیر";
      if (hour >= 17 && hour < 21) return "عصر بخیر";
      return "شب بخیر";
    } else {
      if (hour >= 5 && hour < 12) return "Good morning";
      if (hour >= 12 && hour < 17) return "Good afternoon";
      if (hour >= 17 && hour < 21) return "Good evening";
      return "Welcome back";
    }
  }, [isRtl]);

  useEffect(() => {
    let isMounted = true;

    async function loadStudentData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const userId = user.id;

        // فراخوانی موازی برای حداکثر سرعت لود
        const [
          profileRes,
          streakRes,
          enrollmentsRes,
          certsRes,
          quizzesRes,
          tradesRes,
          assignmentsRes,
          submissionsRes,
          announcementsRes
        ] = await Promise.all([
          supabase.from("profiles").select("id, first_name, last_name, avatar_url, email, wallet_balance, total_score, role").eq("id", userId).single(),
          supabase.from("student_streaks").select("current_streak, longest_streak").eq("student_id", userId).maybeSingle(),
          supabase.from("class_students").select(`
            id,
            class_groups (
              id,
              class_name,
              meeting_link,
              class_time,
              class_days,
              courses (
                id,
                title,
                thumbnail_url,
                instructor_name
              )
            )
          `).eq("student_id", userId),
          supabase.from("certificates").select("id", { count: "exact", head: true }).eq("student_id", userId),
          supabase.from("quiz_attempts").select("id, is_passed").eq("student_id", userId),
          supabase.from("trading_journals").select("id, symbol, position_type, profit_loss_usd, trade_date, teacher_score, teacher_feedback").eq("student_id", userId).order("trade_date", { ascending: false }).limit(4),
          supabase.from("assignments").select("id, title, deadline, max_score").order("deadline", { ascending: true }).limit(5),
          supabase.from("assignment_submissions").select("assignment_id").eq("student_id", userId),
          supabase.from("announcements").select("id, title, message, created_at").in("target_role", ["student", "all"]).order("created_at", { ascending: false }).limit(3)
        ]);

        if (!isMounted) return;

        // ۱. اطلاعات پروفایل
        if (profileRes.data) {
          setProfile(profileRes.data);
        }

        // ۲. استریک روزانه
        if (streakRes.data?.current_streak) {
          setStreakDays(streakRes.data.current_streak);
        } else {
          setStreakDays(1);
        }

        // ۳. صنف فعال و در حال یادگیری
        const enrollments = enrollmentsRes.data || [];
        if (enrollments.length > 0) {
          const firstEnrollment: any = enrollments[0];
          const classGroup = Array.isArray(firstEnrollment.class_groups)
            ? firstEnrollment.class_groups[0]
            : firstEnrollment.class_groups;

          const course = classGroup?.courses
            ? (Array.isArray(classGroup.courses) ? classGroup.courses[0] : classGroup.courses)
            : null;

          if (classGroup) {
            setActiveClass({
              id: classGroup.id,
              class_name: classGroup.class_name || "Safi Academy Masterclass",
              meeting_link: classGroup.meeting_link,
              class_time: classGroup.class_time,
              class_days: classGroup.class_days,
              course_title: course?.title || classGroup.class_name,
              thumbnail_url: course?.thumbnail_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
              instructor_name: course?.instructor_name || "Master Faculty",
              progress: 45
            });
          }
        }

        // ۴. ژورنال معاملاتی
        const trades = tradesRes.data || [];
        setRecentTrades(trades);

        const totalProfit = trades.reduce((acc: number, item: any) => acc + (Number(item.profit_loss_usd) || 0), 0);

        // ۵. تکالیف و وضعیت ارسال
        const submittedIds = new Set((submissionsRes.data || []).map((s: any) => s.assignment_id));
        const formattedAssignments: AssignmentItem[] = (assignmentsRes.data || []).map((a: any) => ({
          id: a.id,
          title: a.title,
          deadline: a.deadline,
          max_score: a.max_score || 100,
          submitted: submittedIds.has(a.id)
        }));
        setUpcomingAssignments(formattedAssignments);

        // ۶. اطلاعیه‌ها
        setAnnouncements(announcementsRes.data || []);

        // ۷. آمار کل
        const passedQuizzes = (quizzesRes.data || []).filter((q: any) => q.is_passed).length;

        setStats({
          enrolledClasses: enrollments.length,
          certificates: certsRes.count || 0,
          quizzesPassed: passedQuizzes,
          totalTrades: trades.length,
          totalProfitUSD: totalProfit,
          totalScore: profileRes.data?.total_score || 0,
        });

      } catch (err) {
        console.error("Error loading student portal data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // اسکلتون بارگذاری مدرن بدون پرش صفحه (Zero Layout Shift)
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-neutral-900/40 rounded-[2.5rem] border border-white/5"></div>
          <div className="h-96 bg-neutral-900/40 rounded-[2.5rem] border border-white/5"></div>
        </div>
      </div>
    );
  }

  const studentName = profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : "Student";

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* هاله‌های نوری پس‌زمینه هماهنگ با هویت بصری آکادمی صافی */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#C2185B]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* ================= 1. ULTRA-PREMIUM STUDENT HERO BANNER ================= */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#0c0c16]/95 via-[#08080e]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
          
          {/* جلوه نور محیطی */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C2185B]/20 via-yellow-500/15 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* اطلاعات دانشجو */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              
              {/* آواتار کاربر با جلوه گرادیانت */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-gradient-to-tr from-[#C2185B] via-yellow-500 to-amber-400 shadow-[0_0_25px_rgba(194,24,91,0.3)]">
                  <div className="w-full h-full rounded-[1.3rem] bg-[#07070a] overflow-hidden flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={studentName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-[#C2185B]">
                        {studentName.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-[#07070a] shadow-[0_0_10px_#10b981]" title="Online"></div>
              </div>

              {/* نام و عناوین */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_12px_rgba(234,179,8,0.15)]">
                    <ShieldCheck size={12} className="text-yellow-400" />
                    {t.dashboardPages.studentRole}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Flame size={12} className="text-orange-400 animate-bounce" />
                    {streakDays} {isRtl ? "روز فعالیت پیوسته" : "Day Streak"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  <span className="text-neutral-400 font-medium text-lg sm:text-xl block mb-1">{timeGreeting}،</span>
                  {studentName}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1 flex items-center gap-2">
                  <span>{profile?.email}</span>
                </p>
              </div>

            </div>

            {/* کارت‌های اکشن سریع مالی و امتیازات */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
              {/* موجودی کیف پول */}
              <Link
                href={`/${currentLocale}/student/wallet`}
                className="flex-1 sm:flex-initial flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg group/wallet"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover/wallet:scale-110 transition-transform">
                  <Wallet size={20} />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">{t.dashboardPages.walletBalance}</span>
                  <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">${Number(profile?.wallet_balance || 0).toFixed(2)}</span>
                </div>
              </Link>

              {/* مجموع امتیازات و رتبه */}
              <div className="flex-1 sm:flex-initial flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg">
                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/20">
                  <Trophy size={20} />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">{t.dashboardPages.totalScore}</span>
                  <span className="text-xl font-black text-yellow-400 font-mono tracking-tight">{stats.totalScore} <span className="text-xs font-bold text-neutral-500">XP</span></span>
                </div>
              </div>

            </div>

          </div>

          {/* نوار دسترسی‌های سریع کاربردی (Quick Actions) */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2.5">
            <Link
              href={`/${currentLocale}/student/live-classes`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <Video size={14} />
              {t.dashboardPages.liveClasses}
            </Link>

            <Link
              href={`/${currentLocale}/student/trading-journal`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all shadow-sm"
            >
              <TrendingUp size={14} />
              {t.dashboardPages.tradingJournal}
            </Link>

            <Link
              href={`/${currentLocale}/student/assignments`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
            >
              <FileText size={14} />
              {t.dashboardPages.assignments}
            </Link>

            <Link
              href={`/${currentLocale}/student/quizzes`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500 hover:text-white transition-all shadow-sm"
            >
              <Target size={14} />
              {t.dashboard.quizzes}
            </Link>

            <Link
              href={`/${currentLocale}/student/groups`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
            >
              <MessageSquare size={14} />
              {t.dashboardPages.classGroups}
            </Link>
          </div>

        </section>


        {/* ================= 2. BENTO STATS METRICS ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 text-start">
          
          {/* صنف‌های ثبت‌نامی */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-950/30 to-[#07070c] border border-blue-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">{t.dashboardPages.enrolled}</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen size={18} />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white">{stats.enrolledClasses}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1">{isRtl ? "صنف‌های فعال" : "Active Curriculums"}</p>
            </div>
          </div>

          {/* امتحانات و کوئیزهای قبول شده */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-950/30 to-[#07070c] border border-purple-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">{isRtl ? "آزمون‌های موفق" : "Exams Passed"}</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={18} />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white">{stats.quizzesPassed}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1">{isRtl ? "نمرات ثبت‌شده" : "Graded Attempts"}</p>
            </div>
          </div>

          {/* گواهینامه‌های دریافتی */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-[#07070c] border border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">{t.dashboardPages.certificates}</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award size={18} />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white">{stats.certificates}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1">{isRtl ? "مدارک تایید شده" : "Verified Credentials"}</p>
            </div>
          </div>

          {/* معاملات ثبت‌شده در ژورنال */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-teal-950/30 to-[#07070c] border border-teal-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">{isRtl ? "ژورنال ترید" : "Logged Trades"}</span>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp size={18} />
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white">{stats.totalTrades}</span>
              <p className={`text-[10px] font-bold mt-1 ${stats.totalProfitUSD >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                PnL: {stats.totalProfitUSD >= 0 ? "+" : ""}${stats.totalProfitUSD.toFixed(1)} USD
              </p>
            </div>
          </div>

        </section>


        {/* ================= 3. ACTIVE COURSE & LIVE CLASS HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start">
          
          {/* صنف فعال و دکمه مستقیم ورود به کلاس زنده */}
          <div className="lg:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-[#0c0c16] to-[#050508] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <h2 className="text-xs font-black uppercase tracking-widest text-amber-400">{t.dashboardPages.continueLearning}</h2>
                </div>
                <Link
                  href={`/${currentLocale}/student/courses`}
                  className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isRtl ? "همه دوره‌ها" : "All Courses"} <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
                </Link>
              </div>

              {activeClass ? (
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  
                  {/* تصویر تامبنیل دوره */}
                  <div className="relative w-full sm:w-56 h-48 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 group-hover:border-amber-500/40 transition-colors">
                    {activeClass.thumbnail_url ? (
                      <img src={activeClass.thumbnail_url} alt={activeClass.course_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">
                        <BookOpen size={40} className="text-neutral-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {activeClass.meeting_link && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Live Room
                      </span>
                    )}
                  </div>

                  {/* جزییات صنف و برنامه کلاسی */}
                  <div className="flex-1 w-full space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 inline-block">
                      {activeClass.class_name}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                      {activeClass.course_title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-xs text-neutral-400 font-medium">
                      {activeClass.class_days && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-amber-400" /> {activeClass.class_days}
                        </span>
                      )}
                      {activeClass.class_time && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-amber-400" /> {activeClass.class_time}
                        </span>
                      )}
                    </div>

                    {/* نوار پیشرفت */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-neutral-400">{t.dashboardPages.courseProgress}</span>
                        <span className="text-amber-400 font-mono">{activeClass.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: `${activeClass.progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-12 px-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-neutral-400 text-sm mb-4">{t.dashboardPages.noActiveCourses}</p>
                  <Link
                    href={`/${currentLocale}/courses`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    {t.dashboardPages.browseCourses}
                  </Link>
                </div>
              )}
            </div>

            {/* دکمه اکشن ورود به کلاس زنده */}
            {activeClass && (
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  {isRtl ? "پلتفرم اختصاصی آموزش زنده آکادمی صافی" : "Safi Academy Live Classroom Platform"}
                </span>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {activeClass.meeting_link && (
                    <a
                      href={activeClass.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all"
                    >
                      <Video size={16} />
                      {isRtl ? "ورود به جلسه آنلاین" : "Join Live Meeting"}
                    </a>
                  )}

                  <Link
                    href={`/${currentLocale}/student/live-classes`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-widest transition-colors"
                  >
                    <Play size={14} />
                    {isRtl ? "جلسات و ضبط‌ها" : "Recordings & Campus"}
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* کارت دسترسی به گروه صنفی و ارتباطات */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-[#0a0a14] to-[#04040a] border border-indigo-500/20 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            
            <div className="absolute top-[-20%] right-[-20%] w-56 h-56 bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/25 transition-all"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={26} />
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-1">
                {t.dashboardPages.community}
              </span>
              <h3 className="text-2xl font-black text-white mb-2">
                {t.dashboardPages.classGroups}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t.dashboardPages.classGroupsDesc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <Link
                href={`/${currentLocale}/student/groups`}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-black uppercase tracking-wider transition-all duration-300"
              >
                <span>{t.dashboardPages.openMessenger}</span>
                <ArrowRight size={16} className={isRtl ? "rotate-180" : ""} />
              </Link>
            </div>

          </div>

        </section>


        {/* ================= 4. SIGNATURE TRADING JOURNAL SNAPSHOT ================= */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0c0c16] via-[#08080f] to-[#040407] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-start relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-teal-400" />
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {isRtl ? "خلاصه دفترچه معاملاتی (Trading Journal)" : "Trading Performance & Journal"}
                </h2>
              </div>
              <p className="text-xs text-neutral-400">
                {isRtl ? "ثبت دقیق پوزیشن‌ها، تحلیل روانشناسی و بازخورد مستقیم استاد ترید" : "Log positions, psychology analysis, and get direct faculty feedback"}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/${currentLocale}/student/trading-journal`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500 hover:text-black text-xs font-black uppercase tracking-wider transition-all"
              >
                <Plus size={14} />
                {isRtl ? "ثبت معامله جدید" : "Log New Trade"}
              </Link>

              <Link
                href={`/${currentLocale}/student/trading-journal`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold transition-colors"
              >
                {isRtl ? "مشاهده همه" : "View All"}
                <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>

          {recentTrades.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTrades.map((trade) => {
                const isProfit = Number(trade.profit_loss_usd || 0) >= 0;
                return (
                  <div
                    key={trade.id}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-black text-white tracking-wider">
                        {trade.symbol}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${trade.position_type?.toUpperCase() === "BUY" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/15 text-rose-400 border border-rose-500/20"}`}>
                        {trade.position_type}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-neutral-400 font-medium">PnL:</span>
                      <span className={`text-lg font-black font-mono ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                        {isProfit ? "+" : ""}${Number(trade.profit_loss_usd || 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                      <span>{trade.trade_date}</span>
                      {trade.teacher_score !== null ? (
                        <span className="text-yellow-400 font-black flex items-center gap-1">
                          ⭐ {trade.teacher_score}/10
                        </span>
                      ) : (
                        <span className="text-neutral-500">{isRtl ? "در انتظار بررسی" : "Pending Review"}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 px-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-neutral-400 text-sm mb-4">
                {isRtl ? "هنوز هیچ معامله‌ای در ژورنال خود ثبت نکرده‌اید." : "No trade entries logged in your journal yet."}
              </p>
              <Link
                href={`/${currentLocale}/student/trading-journal`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-black text-xs font-black uppercase tracking-wider hover:bg-teal-400 transition-colors shadow-lg"
              >
                <Plus size={16} />
                {isRtl ? "اولین معامله خود را ثبت کنید" : "Log Your First Trade"}
              </Link>
            </div>
          )}

        </section>


        {/* ================= 5. TWO-COLUMN: ASSIGNMENTS & ANNOUNCEMENTS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-start">
          
          {/* تکالیف و پروژه‌ها */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0b0b14] to-[#040408] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  <h3 className="text-lg font-black text-white">{t.dashboardPages.assignments}</h3>
                </div>
                <Link href={`/${currentLocale}/student/assignments`} className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1">
                  {isRtl ? "مشاهده همه" : "View All"} <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
                </Link>
              </div>

              {upcomingAssignments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAssignments.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="min-w-0 pr-3">
                        <h4 className="text-sm font-bold text-white truncate mb-1">{item.title}</h4>
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                          <Clock size={11} className="text-neutral-500" />
                          {isRtl ? "مهلت: " : "Deadline: "} {new Date(item.deadline).toLocaleDateString()}
                        </span>
                      </div>

                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg shrink-0 ${
                        item.submitted
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {item.submitted ? (isRtl ? "ارسال شده" : "Submitted") : (isRtl ? "در انتظار ارسال" : "Pending")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-neutral-500 text-xs font-bold">
                  {isRtl ? "تکلیف معلقی برای شما ثبت نشده است." : "No pending assignments right now."}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <Link
                href={`/${currentLocale}/student/assignments`}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {isRtl ? "مدیریت و ارسال تکالیف" : "Submit & Review Assignments"}
              </Link>
            </div>
          </div>

          {/* آخرین اطلاعیه‌های آکادمی */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0b0b14] to-[#040408] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-400" />
                  <h3 className="text-lg font-black text-white">{t.dashboard.announcements}</h3>
                </div>
                <Link href={`/${currentLocale}/student/announcements`} className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1">
                  {isRtl ? "مشاهده همه" : "View All"} <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
                </Link>
              </div>

              {announcements.length > 0 ? (
                <div className="space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
                    >
                      <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{item.message}</p>
                      <span className="text-[9px] text-neutral-500 font-mono mt-2 block">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-neutral-500 text-xs font-bold">
                  {isRtl ? "اطلاعیه جدیدی موجود نیست." : "No new announcements available."}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <Link
                href={`/${currentLocale}/student/announcements`}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {isRtl ? "مشاهده تابلوی اعلانات" : "Open Academy Bulletin"}
              </Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}