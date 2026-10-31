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
  Activity,
  Copy,
  Check,
  Zap,
  TrendingDown,
  Compass,
  Headset,
  Radio,
  BookMarked,
  Share2
} from "lucide-react";

// ================= TYPES =================
interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  wallet_balance: number;
  total_score: number;
  role: string;
  referral_code?: string | null;
}

interface EnrolledCourseItem {
  id: string;
  class_group_id?: string;
  class_name?: string;
  meeting_link?: string | null;
  signal_group_link?: string | null;
  class_time?: string | null;
  class_days?: string | null;
  schedule_info?: string | null;
  is_active?: boolean;
  course_id: string;
  title: string;
  thumbnail_url: string | null;
  instructor_name: string | null;
  instructor_image_url?: string | null;
  category?: string | null;
  price?: number;
  progress: number;
}

interface TradeItem {
  id: string;
  symbol: string;
  position_type: string;
  setup_strategy?: string | null;
  lot_size?: number | null;
  entry_price?: number | null;
  exit_price?: number | null;
  profit_loss_usd: number | null;
  trade_date: string;
  teacher_score: number | null;
  teacher_feedback: string | null;
}

interface AssignmentItem {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  max_score: number;
  submitted: boolean;
  grade?: number | null;
  feedback?: string | null;
}

interface QuizItem {
  id: string;
  title: string;
  passing_score: number;
  quiz_type?: string;
  attempted: boolean;
  score?: number | null;
  is_passed?: boolean;
}

interface RecordingItem {
  id: string;
  title: string;
  video_url: string;
  duration_minutes?: number | null;
  recorded_at: string;
  thumbnail_url?: string | null;
}

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
  target_role?: string;
}

interface StudentAwardItem {
  id: string;
  awarded_at: string;
  awards: {
    title: string;
    description?: string;
    icon_url?: string;
    points_required?: number;
  } | null;
}

export default function StudentPortalOverview() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [streakDays, setStreakDays] = useState(1);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseItem[]>([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [recentTrades, setRecentTrades] = useState<TradeItem[]>([]);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [awards, setAwards] = useState<StudentAwardItem[]>([]);
  const [suggestedCourses, setSuggestedCourses] = useState<any[]>([]);

  // تب فعال در پنل داده‌های میانی
  const [activeTab, setActiveTab] = useState<"trades" | "recordings" | "assignments" | "quizzes">("trades");
  
  // کپی کد رفرال
  const [copiedReferral, setCopiedReferral] = useState(false);

  // ساعت دیجیتال زنده
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(isRtl ? "fa-AF" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [isRtl]);

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

  // محاسبه رتبه و لول دانشجو بر اساس امتیاز کل
  const studentRank = useMemo(() => {
    const score = profile?.total_score || 0;
    if (score >= 1500) {
      return {
        level: 4,
        title: isRtl ? "نخبه ارشد آکادمی صفی" : "Master Scholar",
        progress: 100,
        nextTier: isRtl ? "بالاترین سطح اعطا شده" : "Maximum Tier Reached",
        badgeBg: "from-amber-500/20 via-yellow-500/10 to-amber-600/20 text-yellow-300 border-yellow-500/30",
      };
    }
    if (score >= 500) {
      return {
        level: 3,
        title: isRtl ? "معامله‌گر حرفه‌ای (Pro Trader)" : "Pro Scholar",
        progress: Math.min(100, Math.round(((score - 500) / 1000) * 100)),
        nextTier: isRtl ? `${1500 - score} امتیاز تا نخبه ارشد` : `${1500 - score} XP to Master Tier`,
        badgeBg: "from-emerald-500/20 via-teal-500/10 to-emerald-600/20 text-emerald-300 border-emerald-500/30",
      };
    }
    if (score >= 100) {
      return {
        level: 2,
        title: isRtl ? "تحلیل‌گر تکنیکال (Technical Analyst)" : "Active Analyst",
        progress: Math.min(100, Math.round(((score - 100) / 400) * 100)),
        nextTier: isRtl ? `${500 - score} امتیاز تا سطح حرفه‌ای` : `${500 - score} XP to Pro Tier`,
        badgeBg: "from-blue-500/20 via-cyan-500/10 to-blue-600/20 text-blue-300 border-blue-500/30",
      };
    }
    return {
      level: 1,
      title: isRtl ? "دانشجوی پژوهشگر (Apprentice)" : "Academy Apprentice",
      progress: Math.min(100, Math.round((score / 100) * 100)),
      nextTier: isRtl ? `${100 - score} امتیاز تا سطح تحلیل‌گر` : `${100 - score} XP to Analyst`,
      badgeBg: "from-purple-500/20 via-violet-500/10 to-purple-600/20 text-purple-300 border-purple-500/30",
    };
  }, [profile?.total_score, isRtl]);

  // بارگذاری داده‌ها از پایگاه داده Supabase
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

        // فراخوانی همزمان تمام بخش‌های دیتابیس با بیشترین سرعت ممکن
        const [
          profileRes,
          streakRes,
          classStudentsRes,
          enrollmentsRes,
          tradesRes,
          assignmentsRes,
          submissionsRes,
          quizzesRes,
          quizAttemptsRes,
          recordingsRes,
          announcementsRes,
          awardsRes,
          suggestedRes
        ] = await Promise.all([
          supabase.from("profiles").select("id, first_name, last_name, avatar_url, email, wallet_balance, total_score, role, referral_code").eq("id", userId).single(),
          supabase.from("student_streaks").select("current_streak, longest_streak, last_activity_date").eq("student_id", userId).maybeSingle(),
          supabase.from("class_students").select(`
            id,
            class_groups (
              id,
              class_name,
              meeting_link,
              signal_group_link,
              class_time,
              class_days,
              schedule_info,
              is_active,
              courses (
                id,
                title,
                thumbnail_url,
                instructor_name,
                instructor_image_url,
                category,
                price
              )
            )
          `).eq("student_id", userId),
          supabase.from("enrollments").select(`
            id,
            progress_percentage,
            enrolled_at,
            courses (
              id,
              title,
              thumbnail_url,
              instructor_name,
              instructor_image_url,
              category,
              price
            )
          `).eq("student_id", userId),
          supabase.from("trading_journals").select("id, symbol, position_type, setup_strategy, lot_size, entry_price, exit_price, profit_loss_usd, trade_date, teacher_score, teacher_feedback").eq("student_id", userId).order("trade_date", { ascending: false }).limit(6),
          supabase.from("assignments").select("id, title, description, deadline, max_score, created_at").order("deadline", { ascending: true }).limit(6),
          supabase.from("assignment_submissions").select("id, assignment_id, grade, feedback, submitted_at").eq("student_id", userId),
          supabase.from("quizzes").select("id, title, passing_score, quiz_type").eq("is_active", true).limit(5),
          supabase.from("quiz_attempts").select("id, quiz_id, score, is_passed, letter_grade, attempted_at").eq("student_id", userId),
          supabase.from("class_recordings").select("id, title, video_url, duration_minutes, recorded_at, thumbnail_url").order("recorded_at", { ascending: false }).limit(4),
          supabase.from("announcements").select("id, title, message, created_at, target_role").in("target_role", ["student", "all"]).order("created_at", { ascending: false }).limit(4),
          supabase.from("student_awards").select("id, awarded_at, awards(title, description, icon_url, points_required)").eq("student_id", userId).limit(4),
          supabase.from("courses").select("id, title, price, thumbnail_url, instructor_name, category").eq("is_published", true).limit(3)
        ]);

        if (!isMounted) return;

        // ۱. ذخیره پروفایل
        if (profileRes.data) {
          setProfile(profileRes.data);
        }

        // ۲. استریک روزانه
        if (streakRes.data?.current_streak) {
          setStreakDays(streakRes.data.current_streak);
        } else {
          setStreakDays(1);
        }

        // ۳. ادغام دوره‌ها از هر دو جدول class_students و enrollments
        const courseMap = new Map<string, EnrolledCourseItem>();

        // کلاس‌های دارای گروه کلاسی
        (classStudentsRes.data || []).forEach((item: any) => {
          const cg = Array.isArray(item.class_groups) ? item.class_groups[0] : item.class_groups;
          if (!cg) return;
          const course = Array.isArray(cg.courses) ? cg.courses[0] : cg.courses;
          if (!course) return;

          courseMap.set(course.id, {
            id: item.id,
            class_group_id: cg.id,
            class_name: cg.class_name || course.title,
            meeting_link: cg.meeting_link,
            signal_group_link: cg.signal_group_link,
            class_time: cg.class_time,
            class_days: cg.class_days,
            schedule_info: cg.schedule_info,
            is_active: cg.is_active,
            course_id: course.id,
            title: course.title,
            thumbnail_url: course.thumbnail_url,
            instructor_name: course.instructor_name || "Faculty Master",
            instructor_image_url: course.instructor_image_url,
            category: course.category,
            price: course.price,
            progress: 35, // پیش‌فرض منطقی برای دوره‌های فعال
          });
        });

        // ثبت‌نام‌های مستقیم
        (enrollmentsRes.data || []).forEach((item: any) => {
          const course = Array.isArray(item.courses) ? item.courses[0] : item.courses;
          if (!course) return;

          if (courseMap.has(course.id)) {
            const existing = courseMap.get(course.id)!;
            existing.progress = Math.max(existing.progress, Number(item.progress_percentage) || 0);
          } else {
            courseMap.set(course.id, {
              id: item.id,
              course_id: course.id,
              title: course.title,
              thumbnail_url: course.thumbnail_url,
              instructor_name: course.instructor_name || "Academy Faculty",
              instructor_image_url: course.instructor_image_url,
              category: course.category,
              price: course.price,
              progress: Number(item.progress_percentage) || 0,
            });
          }
        });

        const mergedCourses = Array.from(courseMap.values());
        setEnrolledCourses(mergedCourses);

        // ۴. معاملات ژورنال
        setRecentTrades(tradesRes.data || []);

        // ۵. تکالیف همراه با وضعیت ارسال دانشجو
        const subMap = new Map<string, any>();
        (submissionsRes.data || []).forEach((s: any) => subMap.set(s.assignment_id, s));

        const formattedAssignments: AssignmentItem[] = (assignmentsRes.data || []).map((a: any) => {
          const sub = subMap.get(a.id);
          return {
            id: a.id,
            title: a.title,
            description: a.description,
            deadline: a.deadline,
            max_score: a.max_score || 100,
            submitted: Boolean(sub),
            grade: sub?.grade ?? null,
            feedback: sub?.feedback ?? null,
          };
        });
        setAssignments(formattedAssignments);

        // ۶. کوئیزها و وضعیت قبولی
        const attemptMap = new Map<string, any>();
        (quizAttemptsRes.data || []).forEach((att: any) => attemptMap.set(att.quiz_id, att));

        const formattedQuizzes: QuizItem[] = (quizzesRes.data || []).map((q: any) => {
          const att = attemptMap.get(q.id);
          return {
            id: q.id,
            title: q.title,
            passing_score: q.passing_score || 70,
            quiz_type: q.quiz_type,
            attempted: Boolean(att),
            score: att?.score ?? null,
            is_passed: att?.is_passed ?? false,
          };
        });
        setQuizzes(formattedQuizzes);

        // ۷. سایر داده‌ها
        setRecordings(recordingsRes.data || []);
        setAnnouncements(announcementsRes.data || []);
        setAwards((awardsRes.data as any) || []);
        setSuggestedCourses(suggestedRes.data || []);

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

  // مجموع سود/ضرر ثبت‌شده در ژورنال
  const statsOverview = useMemo(() => {
    const totalProfitUSD = recentTrades.reduce((acc, trade) => acc + (Number(trade.profit_loss_usd) || 0), 0);
    const winningTrades = recentTrades.filter((t) => Number(t.profit_loss_usd || 0) > 0).length;
    const winRate = recentTrades.length > 0 ? Math.round((winningTrades / recentTrades.length) * 100) : 0;
    const passedQuizzes = quizzes.filter((q) => q.is_passed).length;
    const pendingAssignments = assignments.filter((a) => !a.submitted).length;

    return {
      enrolledCount: enrolledCourses.length,
      totalProfitUSD,
      winRate,
      tradesCount: recentTrades.length,
      passedQuizzes,
      pendingAssignments,
    };
  }, [recentTrades, enrolledCourses, quizzes, assignments]);

  const activeHeroCourse = enrolledCourses[selectedCourseIndex] || enrolledCourses[0] || null;

  // عملکرد کپی کد معرف
  const handleCopyReferral = () => {
    if (!profile?.referral_code) return;
    navigator.clipboard.writeText(profile.referral_code);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  // اسکلتون بارگذاری لوکس (Zero Layout Shift)
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-48 bg-[#090a10] rounded-3xl border border-white/5"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#090a10] rounded-2xl border border-white/5"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-[450px] bg-[#090a10] rounded-3xl border border-white/5"></div>
          <div className="lg:col-span-4 h-[450px] bg-[#090a10] rounded-3xl border border-white/5"></div>
        </div>
      </div>
    );
  }

  const studentFullName = profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : "Student";

  return (
    <div
      className="w-full min-h-screen bg-[#030305] text-neutral-100 font-sans selection:bg-[#C2185B] selection:text-white pb-32 relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* مشبک نوری پس‌زمینه سایبرنتیک فوق لوکس */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="fixed top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#C2185B]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-8 max-w-7xl mx-auto space-y-7 relative z-10">

        {/* ================= 1. THE COMMANDER'S HERO DECK ================= */}
        <header className="relative w-full rounded-3xl bg-gradient-to-b from-[#0d0e17] via-[#090a12] to-[#05060a] border border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* نور ملایم امبینت هدر */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-[#C2185B]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

          {/* نوار بالا: وضعیت زنده شبکه آکادمی و ساعت دیجیتال */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.06] text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Safi Campus Online</span>
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-neutral-400 hidden sm:inline-flex items-center gap-1 font-mono text-[11px]">
                <Clock size={12} className="text-amber-400" />
                {currentTime}
              </span>
            </div>

            {/* نشان سطح و لول آکادمیک */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border bg-gradient-to-r ${studentRank.badgeBg}`}>
                <Sparkles size={12} />
                <span>{studentRank.title}</span>
              </span>
            </div>
          </div>

          {/* بدنه اصلی هیرو: آواتار، اطلاعات دانشجو و نوار KPIهای اصلی */}
          <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* اطلاعات و هویت دانشجو */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-0.5 bg-gradient-to-tr from-[#C2185B] via-amber-400 to-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.25)]">
                  <div className="w-full h-full rounded-[0.95rem] bg-[#07070c] overflow-hidden flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={studentFullName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-[#C2185B]">
                        {studentFullName.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#05060a] shadow-[0_0_8px_#10b981]" title="Online" />
              </div>

              <div className="space-y-1.5 text-start">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-400">{timeGreeting}،</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-neutral-300">
                    <ShieldCheck size={11} className="text-amber-400" />
                    ID: {profile?.id ? profile.id.slice(0, 8).toUpperCase() : "STUDENT"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  {studentFullName}
                </h1>

                {/* پیشرفت تا سطح بعدی آکادمی */}
                <div className="pt-1 flex items-center gap-3 text-xs text-neutral-400">
                  <div className="w-32 sm:w-44 h-1.5 bg-neutral-800 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700" style={{ width: `${studentRank.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{studentRank.nextTier}</span>
                </div>
              </div>
            </div>

            {/* کارت‌های تعاملی موجودی کیف پول و استریک */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* موجودی کیف پول */}
              <Link
                href={`/${currentLocale}/student/wallet`}
                className="flex-1 sm:flex-initial flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Wallet size={19} />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">{t.dashboard.wallet}</span>
                  <span className="text-lg font-black text-emerald-400 font-mono tracking-tight">
                    ${Number(profile?.wallet_balance || 0).toFixed(2)}
                  </span>
                </div>
              </Link>

              {/* استریک پیوسته */}
              <div className="flex-1 sm:flex-initial flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Flame size={20} className="animate-pulse" />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "استریک مطالعه" : "Study Streak"}
                  </span>
                  <span className="text-lg font-black text-orange-400 font-mono tracking-tight">
                    {streakDays} <span className="text-xs font-semibold text-neutral-400">{isRtl ? "روز" : "Days"}</span>
                  </span>
                </div>
              </div>

              {/* کد معرف اختصاصی دانشجو با امکان کپی ۱-کلیک */}
              {profile?.referral_code && (
                <button
                  onClick={handleCopyReferral}
                  className="flex-1 sm:flex-initial flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-amber-500/40 transition-all text-start group cursor-pointer"
                  title={isRtl ? "کپی کد معرف" : "Copy Referral Code"}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    {copiedReferral ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      {isRtl ? "کد دعوت شما" : "Your Invite Code"}
                    </span>
                    <span className="text-xs font-mono font-black text-amber-300">
                      {copiedReferral ? (isRtl ? "کپی شد!" : "Copied!") : profile.referral_code}
                    </span>
                  </div>
                </button>
              )}
            </div>

          </div>

          {/* اکشن‌های دسترسی فوری (Quick Dock) */}
          <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-2.5">
            <Link
              href={`/${currentLocale}/student/live-classes`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/20 transition-all shadow-sm"
            >
              <Video size={14} />
              <span>{t.dashboard.liveCampus}</span>
            </Link>

            <Link
              href={`/${currentLocale}/student/trading-journal`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-black border border-teal-500/20 transition-all shadow-sm"
            >
              <TrendingUp size={14} />
              <span>{t.dashboard.tradingJournal}</span>
            </Link>

            <Link
              href={`/${currentLocale}/student/assignments`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500 text-blue-300 hover:text-white border border-blue-500/20 transition-all shadow-sm"
            >
              <FileText size={14} />
              <span>{t.dashboard.assignments}</span>
            </Link>

            <Link
              href={`/${currentLocale}/student/quizzes`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/20 transition-all shadow-sm"
            >
              <Target size={14} />
              <span>{t.dashboard.quizzes}</span>
            </Link>

            <Link
              href={`/${currentLocale}/student/achievements`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/20 transition-all shadow-sm"
            >
              <Trophy size={14} />
              <span>{t.dashboard.achievements}</span>
            </Link>

            <Link
              href={`/${currentLocale}/support`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 transition-all shadow-sm ml-auto"
            >
              <Headset size={14} />
              <span>{t.dashboard.support}</span>
            </Link>
          </div>
        </header>

        {/* ================= 2. BENTO METRIC PERFORMANCE STRIP ================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          
          {/* صنف‌های من */}
          <div className="p-5 rounded-3xl bg-[#090a12]/90 border border-white/[0.07] hover:border-blue-500/30 transition-all duration-300 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.dashboardPages.enrolled}
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <BookOpen size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">{statsOverview.enrolledCount}</span>
              <span className="text-xs text-neutral-400">{isRtl ? "دوره فعال" : "Programs"}</span>
            </div>
            <p className="text-[10px] text-neutral-500 mt-2 flex items-center gap-1 font-medium">
              <CheckCircle2 size={11} className="text-emerald-400" />
              {isRtl ? "برنامه آموزشی معتبر" : "Curriculum active"}
            </p>
          </div>

          {/* عملکرد ژورنال معاملاتی */}
          <div className="p-5 rounded-3xl bg-[#090a12]/90 border border-white/[0.07] hover:border-teal-500/30 transition-all duration-300 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {isRtl ? "بازدهی معاملات (PnL)" : "Trading Performance"}
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black font-mono ${statsOverview.totalProfitUSD >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {statsOverview.totalProfitUSD >= 0 ? "+" : ""}${statsOverview.totalProfitUSD.toFixed(1)}
              </span>
              <span className="text-xs text-neutral-400">USD</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1.5 font-medium">
              <span className="font-mono text-teal-300">{statsOverview.tradesCount} {isRtl ? "معامله" : "trades"}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-emerald-400 font-mono">{statsOverview.winRate}% Win</span>
            </p>
          </div>

          {/* کوئیزها و آزمون‌ها */}
          <div className="p-5 rounded-3xl bg-[#090a12]/90 border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.dashboard.quizzes}
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Target size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">{statsOverview.passedQuizzes}</span>
              <span className="text-xs text-neutral-400">/ {quizzes.length}</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1 font-medium">
              <Award size={11} className="text-purple-400" />
              {isRtl ? "آزمون‌های قبول شده" : "Evaluations passed"}
            </p>
          </div>

          {/* تکالیف و پروژه‌ها */}
          <div className="p-5 rounded-3xl bg-[#090a12]/90 border border-white/[0.07] hover:border-amber-500/30 transition-all duration-300 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.dashboard.assignments}
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <FileText size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">{statsOverview.pendingAssignments}</span>
              <span className="text-xs text-neutral-400">{isRtl ? "در انتظار تحویل" : "Pending"}</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1 font-medium">
              <Clock size={11} className="text-amber-400" />
              {isRtl ? "بررسی و ارسال پاسخ" : "Deadlines tracked"}
            </p>
          </div>

        </section>

        {/* ================= 3. PRIMARY STAGE: ACTIVE CLASS & TERMINAL ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-start">
          
          {/* ستون اصلی سمت چپ (۸ ستون): صنف فعال + تب‌های تعاملی ترید/ویدیو/تکالیف */}
          <div className="lg:col-span-8 space-y-6">

            {/* کارت صنف فعال / کانون کلاس زنده */}
            <div className="rounded-3xl bg-[#090a12] border border-white/[0.08] p-6 sm:p-7 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-amber-400">
                    {t.dashboardPages.continueLearning}
                  </h2>
                </div>

                {/* سوئیچر دوره‌ها در صورت داشتن بیش از یک دوره */}
                {enrolledCourses.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                    {enrolledCourses.map((c, idx) => (
                      <button
                        key={c.course_id}
                        onClick={() => setSelectedCourseIndex(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedCourseIndex === idx ? "bg-amber-500 text-black shadow" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {c.title.slice(0, 15)}...
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeHeroCourse ? (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                    
                    {/* تامبنیل دوره */}
                    <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 group">
                      {activeHeroCourse.thumbnail_url ? (
                        <img
                          src={activeHeroCourse.thumbnail_url}
                          alt={activeHeroCourse.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">
                          <BookOpen size={36} className="text-neutral-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {activeHeroCourse.meeting_link && (
                        <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                          Live Room
                        </span>
                      )}
                    </div>

                    {/* عنوان دوره و مدرس */}
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 inline-block">
                        {activeHeroCourse.category || activeHeroCourse.class_name || "Safi Academy Masterclass"}
                      </span>

                      <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                        {activeHeroCourse.title}
                      </h3>

                      <p className="text-xs text-neutral-400 flex items-center gap-2">
                        <span>{isRtl ? "مدرس دوره:" : "Instructor:"}</span>
                        <span className="text-neutral-200 font-bold">{activeHeroCourse.instructor_name}</span>
                      </p>

                      {/* برنامه برگزاری کلاسی */}
                      {(activeHeroCourse.class_days || activeHeroCourse.class_time) && (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-medium pt-1">
                          {activeHeroCourse.class_days && (
                            <span className="flex items-center gap-1">
                              <Calendar size={13} className="text-amber-400" />
                              {activeHeroCourse.class_days}
                            </span>
                          )}
                          {activeHeroCourse.class_time && (
                            <span className="flex items-center gap-1">
                              <Clock size={13} className="text-amber-400" />
                              {activeHeroCourse.class_time}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* نوار پیشرفت دوره */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-neutral-400">{t.dashboardPages.courseProgress}</span>
                      <span className="text-amber-400 font-mono font-bold">{activeHeroCourse.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700"
                        style={{ width: `${activeHeroCourse.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* دکمه‌های اکشن مستقیم صنف آنلاین و سیگنال */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {activeHeroCourse.meeting_link ? (
                      <a
                        href={activeHeroCourse.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all"
                      >
                        <Video size={16} />
                        <span>{isRtl ? "ورود به کلاس آنلاین زنده" : "Join Live Meeting"}</span>
                      </a>
                    ) : (
                      <Link
                        href={`/${currentLocale}/student/live-classes`}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
                      >
                        <Video size={16} className="text-rose-400" />
                        <span>{isRtl ? "مشاهده برنامه کلاس‌های زنده" : "View Live Schedule"}</span>
                      </Link>
                    )}

                    {activeHeroCourse.signal_group_link && (
                      <a
                        href={activeHeroCourse.signal_group_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition-all"
                      >
                        <MessageSquare size={15} />
                        <span>{isRtl ? "گروه سیگنال و تحلیل کلاسی" : "Class Signal Hub"}</span>
                      </a>
                    )}

                    <Link
                      href={`/${currentLocale}/student/courses`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs font-bold border border-white/5 transition-all ml-auto"
                    >
                      <span>{isRtl ? "محتوای کامل دوره" : "Course Materials"}</span>
                      <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
                    </Link>
                  </div>
                </div>
              ) : (
                /* حالت عدم ثبت‌نام در دوره: ویترین پیشنهادی آکادمی */
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                    <Compass size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white">
                      {isRtl ? "شما در حال حاضر در دوره‌ای ثبت‌نام نکرده‌اید" : "No Active Course Enrollment"}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto">
                      {isRtl
                        ? "برای دسترسی به کلاس‌های زنده، ژورنال معاملاتی، دریافت مدرک و شرکت در آزمون‌ها، یکی از دوره‌های تخصصی زیر را انتخاب نمایید."
                        : "Enroll in our flagship professional curriculums to unlock live trading rooms, verified certifications, and mentor reviews."}
                    </p>
                  </div>

                  {suggestedCourses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-start">
                      {suggestedCourses.map((c) => (
                        <Link
                          key={c.id}
                          href={`/${currentLocale}/courses`}
                          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/30 transition-all block group"
                        >
                          <span className="text-[10px] text-amber-400 font-mono font-bold block mb-1">
                            {c.category || "Masterclass"}
                          </span>
                          <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                            {c.title}
                          </h4>
                          <span className="text-xs font-mono font-bold text-emerald-400 mt-2 block">
                            ${c.price || 0} USD
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/${currentLocale}/courses`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg"
                  >
                    <span>{t.dashboardPages.browseCourses}</span>
                    <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                  </Link>
                </div>
              )}
            </div>

            {/* ترمینال تعاملی تب‌بندی شده: ژورنال تریدینگ / ضبط‌ها / تکالیف / آزمون‌ها */}
            <div className="rounded-3xl bg-[#090a12] border border-white/[0.08] p-6 shadow-xl space-y-5">
              
              {/* تب‌های انتخاب */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-2xl border border-white/5">
                  <button
                    onClick={() => setActiveTab("trades")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "trades"
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <TrendingUp size={14} />
                    <span>{isRtl ? "ژورنال ترید" : "Trading Journal"}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("recordings")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "recordings"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Play size={14} />
                    <span>{isRtl ? "ضبط کلاس‌ها" : "Recordings"}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("assignments")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "assignments"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <FileText size={14} />
                    <span>{t.dashboard.assignments}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "quizzes"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Target size={14} />
                    <span>{t.dashboard.quizzes}</span>
                  </button>
                </div>

                {/* دکمه اکشن وابسته به تب */}
                {activeTab === "trades" && (
                  <Link
                    href={`/${currentLocale}/student/trading-journal`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 text-black text-xs font-black uppercase tracking-wider hover:bg-teal-400 transition-all shadow"
                  >
                    <Plus size={14} />
                    <span>{isRtl ? "ثبت معامله" : "Log Trade"}</span>
                  </Link>
                )}
                {activeTab === "assignments" && (
                  <Link
                    href={`/${currentLocale}/student/assignments`}
                    className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1"
                  >
                    <span>{isRtl ? "ارسال تکلیف" : "Submit Tasks"}</span>
                    <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
                  </Link>
                )}
              </div>

              {/* محتوای تب ۱: ژورنال معاملات */}
              {activeTab === "trades" && (
                <div className="space-y-3">
                  {recentTrades.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recentTrades.map((trade) => {
                        const isProfit = Number(trade.profit_loss_usd || 0) >= 0;
                        return (
                          <div
                            key={trade.id}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-500/30 transition-all space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-black text-white tracking-wider">
                                {trade.symbol}
                              </span>
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                  trade.position_type?.toUpperCase() === "BUY"
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                    : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                                }`}
                              >
                                {trade.position_type}
                              </span>
                            </div>

                            <div className="flex items-baseline justify-between text-xs">
                              <span className="text-neutral-400 font-medium">PnL USD:</span>
                              <span className={`text-base font-black font-mono ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                                {isProfit ? "+" : ""}${Number(trade.profit_loss_usd || 0).toFixed(2)}
                              </span>
                            </div>

                            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-neutral-400">
                              <span>{trade.trade_date}</span>
                              {trade.teacher_score !== null ? (
                                <span className="text-amber-400 font-bold flex items-center gap-1">
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
                    <div className="py-8 text-center text-xs text-neutral-400 space-y-3">
                      <p>{isRtl ? "هنوز هیچ معامله‌ای در ژورنال ثبت نکرده‌اید." : "No trades logged in your journal yet."}</p>
                      <Link
                        href={`/${currentLocale}/student/trading-journal`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/15 text-teal-300 border border-teal-500/30 hover:bg-teal-500 hover:text-black font-bold text-xs transition-all"
                      >
                        <Plus size={14} />
                        <span>{isRtl ? "ثبت اولین معامله" : "Log First Trade"}</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* محتوای تب ۲: ضبط‌های کلاسی */}
              {activeTab === "recordings" && (
                <div className="space-y-3">
                  {recordings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recordings.map((rec) => (
                        <a
                          key={rec.id}
                          href={rec.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-rose-500/30 transition-all flex items-center gap-3.5 group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20 group-hover:scale-105 transition-transform">
                            <Play size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate mb-1">{rec.title}</h4>
                            <p className="text-[10px] text-neutral-400 flex items-center gap-2">
                              <span>{new Date(rec.recorded_at).toLocaleDateString()}</span>
                              {rec.duration_minutes && <span>• {rec.duration_minutes} min</span>}
                            </p>
                          </div>
                          <ExternalLink size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-neutral-500 font-medium">
                      {isRtl ? "ویدیوی ضبط شده‌ای برای جلسات اخیر در دسترس نیست." : "No session recordings available currently."}
                    </div>
                  )}
                </div>
              )}

              {/* محتوای تب ۳: تکالیف */}
              {activeTab === "assignments" && (
                <div className="space-y-2.5">
                  {assignments.length > 0 ? (
                    assignments.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="font-bold text-white truncate mb-0.5">{item.title}</h4>
                          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                            <Clock size={11} className="text-neutral-500" />
                            {isRtl ? "مهلت: " : "Deadline: "} {new Date(item.deadline).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.grade !== null && item.grade !== undefined && (
                            <span className="text-emerald-400 font-mono font-bold text-[11px]">
                              {item.grade}/{item.max_score}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${
                              item.submitted
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {item.submitted ? (isRtl ? "ارسال شده" : "Submitted") : (isRtl ? "معلق" : "Pending")}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-neutral-500">
                      {isRtl ? "هیچ تکلیفی در حال حاضر ثبت نشده است." : "No assignments posted at this moment."}
                    </div>
                  )}
                </div>
              )}

              {/* محتوای تب ۴: آزمون‌ها */}
              {activeTab === "quizzes" && (
                <div className="space-y-2.5">
                  {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="font-bold text-white truncate mb-0.5">{quiz.title}</h4>
                          <span className="text-[10px] text-neutral-400">
                            {isRtl ? `حداقل نمره قبولی: ${quiz.passing_score}%` : `Passing threshold: ${quiz.passing_score}%`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {quiz.attempted ? (
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${
                                quiz.is_passed
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {quiz.is_passed ? (isRtl ? "قبول شده" : "Passed") : (isRtl ? "نیاز به تکرار" : "Retake")}
                            </span>
                          ) : (
                            <Link
                              href={`/${currentLocale}/student/quizzes`}
                              className="px-3 py-1 rounded-md bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white font-bold text-[10px] transition-all"
                            >
                              {isRtl ? "شروع آزمون" : "Start Quiz"}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-neutral-500">
                      {isRtl ? "آزمون فعالی یافت نشد." : "No quizzes scheduled right now."}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* ستون فرعی سمت راست (۴ ستون): اعلانات رسمی، دستاوردها و تیکت پشتیبانی */}
          <aside className="lg:col-span-4 space-y-6">

            {/* کارت اطلاعیه‌های رسمی صفی آکادمی */}
            <div className="rounded-3xl bg-[#090a12] border border-white/[0.08] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Radio size={16} className="text-amber-400 animate-pulse" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">
                    {t.dashboard.announcements}
                  </h3>
                </div>
                <Link
                  href={`/${currentLocale}/student/announcements`}
                  className="text-xs font-bold text-neutral-400 hover:text-white"
                >
                  {isRtl ? "همه" : "View All"}
                </Link>
              </div>

              {announcements.length > 0 ? (
                <div className="space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 transition-all space-y-1"
                    >
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      <span className="text-[9px] font-mono text-neutral-500 block pt-1">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-neutral-500">
                  {isRtl ? "اطلاعیه جدیدی ثبت نشده است." : "No official announcements."}
                </div>
              )}
            </div>

            {/* کارت دستاوردها و مدال‌های آکادمیک */}
            <div className="rounded-3xl bg-[#090a12] border border-white/[0.08] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">
                    {t.dashboard.achievements}
                  </h3>
                </div>
                <Link
                  href={`/${currentLocale}/student/achievements`}
                  className="text-xs font-bold text-neutral-400 hover:text-white"
                >
                  {isRtl ? "همه مدال‌ها" : "All Medals"}
                </Link>
              </div>

              {awards.length > 0 ? (
                <div className="space-y-2.5">
                  {awards.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/20">
                        <Award size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">{item.awards?.title || "Safi Honor"}</h4>
                        <p className="text-[10px] text-neutral-400 line-clamp-1">{item.awards?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center space-y-2 text-neutral-500 text-xs">
                  <p>{isRtl ? "با تکمیل تکالیف و معاملات، مدال‌های رسمی باز می‌شوند." : "Unlock verified medals by submitting tasks and logging trades."}</p>
                  <Link
                    href={`/${currentLocale}/student/achievements`}
                    className="inline-block text-[11px] font-bold text-amber-400 hover:underline pt-1"
                  >
                    {isRtl ? "مشاهده فهرست جوایز" : "Browse Milestone Awards"}
                  </Link>
                </div>
              )}
            </div>

            {/* کارت پشتیبانی ۲۴/۷ و درخواست استادی */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0c0d18] via-[#090a12] to-[#05060b] border border-white/[0.08] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Headset size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    {isRtl ? "پشتیبانی اختصاصی دانشجویان" : "Direct Scholar Desk"}
                  </h4>
                  <p className="text-[10px] text-neutral-400">
                    {isRtl ? "پاسخ‌گویی سریع به مسائل درسی و مالی" : "Academic & technical inquiries"}
                  </p>
                </div>
              </div>

              <Link
                href={`/${currentLocale}/support`}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/5 transition-all"
              >
                <span>{isRtl ? "ثبت تیکت جدید" : "Open Support Ticket"}</span>
                <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
              </Link>
            </div>

          </aside>

        </section>

      </div>
    </div>
  );
}