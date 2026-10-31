"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Video,
  Users,
  FileText,
  Target,
  TrendingUp,
  Clock,
  Calendar,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wallet,
  Play,
  CalendarCheck,
  Check,
  Trash2,
  Headset,
  BookOpen,
  ArrowRight,
  Gift,
  Radio,
  Award,
  BarChart3,
  CheckSquare,
  Zap,
  ArrowUpRight,
  RefreshCw,
  Bell,
  Activity,
  Layers,
  GraduationCap
} from "lucide-react";

interface TeacherProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  wallet_balance: number;
  role?: string;
}

interface ClassGroup {
  id: string;
  class_name: string;
  schedule_info: string | null;
  class_time: string | null;
  class_days: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  is_active: boolean;
  enrolled_count: number;
}

interface PendingSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  submitted_at: string;
  assignment_title: string;
  max_score: number;
  student_name: string;
}

interface PendingTrade {
  id: string;
  symbol: string;
  position_type: string;
  profit_loss_usd: number | null;
  trade_date: string;
  student_name: string;
}

interface TodoItem {
  id: string;
  task_text: string;
  is_completed: boolean;
  due_time: string | null;
}

export default function TeacherOverview() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [activeClass, setActiveClass] = useState<ClassGroup | null>(null);
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([]);
  const [pendingTrades, setPendingTrades] = useState<PendingTrade[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [activeTab, setActiveTab] = useState<"trades" | "submissions" | "todos" | "cohorts">("trades");

  const [stats, setStats] = useState({
    totalStudents: 0,
    activeClasses: 0,
    pendingGrading: 0,
    pendingTrades: 0,
    todayAttendance: 0,
    totalCourses: 0,
  });

  // Dynamic greeting based on hour
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (isRtl) {
      if (hour >= 5 && hour < 12) return "صبح بخیر استاد گرامی";
      if (hour >= 12 && hour < 17) return "ظهر بخیر استاد ارشد";
      if (hour >= 17 && hour < 21) return "عصر بخیر همکار ارجمند";
      return "شب بخیر استاد گرامی";
    } else {
      if (hour >= 5 && hour < 12) return "Good morning, Master Faculty";
      if (hour >= 12 && hour < 17) return "Good afternoon, Senior Instructor";
      if (hour >= 17 && hour < 21) return "Good evening, Faculty Member";
      return "Welcome back, Professor";
    }
  }, [isRtl]);

  // Load teacher dashboard data
  useEffect(() => {
    let isMounted = true;

    async function loadTeacherData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const userId = user.id;

        // Parallel queries
        const [
          profileRes,
          classesRes,
          myCoursesRes,
          todosRes
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, first_name, last_name, avatar_url, email, wallet_balance, role")
            .eq("id", userId)
            .single(),
          supabase
            .from("class_groups")
            .select(`
              id,
              class_name,
              schedule_info,
              class_time,
              class_days,
              meeting_link,
              signal_group_link,
              is_active,
              class_students (student_id)
            `)
            .eq("teacher_id", userId)
            .order("is_active", { ascending: false }),
          supabase
            .from("courses")
            .select("id")
            .eq("teacher_id", userId),
          supabase
            .from("teacher_todos")
            .select("id, task_text, is_completed, due_time")
            .eq("teacher_id", userId)
            .order("created_at", { ascending: false })
            .limit(10)
        ]);

        if (!isMounted) return;

        // 1. Profile
        if (profileRes.data) {
          setProfile(profileRes.data);
        }

        // 2. Classes & student count
        let totalStudents = 0;
        const formattedClasses: ClassGroup[] = (classesRes.data || []).map((cls: any) => {
          const studentCount = cls.class_students ? cls.class_students.length : 0;
          totalStudents += studentCount;
          return {
            id: cls.id,
            class_name: cls.class_name,
            schedule_info: cls.schedule_info,
            class_time: cls.class_time,
            class_days: cls.class_days,
            meeting_link: cls.meeting_link,
            signal_group_link: cls.signal_group_link,
            is_active: cls.is_active,
            enrolled_count: studentCount
          };
        });

        setClasses(formattedClasses);
        if (formattedClasses.length > 0) {
          setActiveClass(formattedClasses[0]);
        }

        // 3. Todos
        if (todosRes.data) {
          setTodos(todosRes.data);
        }

        // 4. Pending assignments grading
        let pendingSubsCount = 0;
        let formattedSubs: PendingSubmission[] = [];
        const courseIds = (myCoursesRes.data || []).map((c: any) => c.id);

        if (courseIds.length > 0) {
          const { data: assignmentsData } = await supabase
            .from("assignments")
            .select("id, title, max_score")
            .in("course_id", courseIds);

          if (assignmentsData && assignmentsData.length > 0) {
            const assignmentIds = assignmentsData.map(a => a.id);
            const assignMap = new Map(assignmentsData.map(a => [a.id, a]));

            const { data: subsData } = await supabase
              .from("assignment_submissions")
              .select(`
                id,
                assignment_id,
                student_id,
                submitted_at,
                profiles:student_id (first_name, last_name)
              `)
              .in("assignment_id", assignmentIds)
              .is("grade", null)
              .order("submitted_at", { ascending: false })
              .limit(6);

            if (subsData) {
              pendingSubsCount = subsData.length;
              formattedSubs = subsData.map((s: any) => {
                const a = assignMap.get(s.assignment_id);
                const p = Array.isArray(s.profiles) ? s.profiles[0] : s.profiles;
                return {
                  id: s.id,
                  assignment_id: s.assignment_id,
                  student_id: s.student_id,
                  submitted_at: s.submitted_at,
                  assignment_title: a?.title || "Assignment",
                  max_score: a?.max_score || 100,
                  student_name: p ? `${p.first_name} ${p.last_name || ""}`.trim() : "Scholar"
                };
              });
            }
          }
        }
        setPendingSubmissions(formattedSubs);

        // 5. Pending trading journals awaiting review
        const { data: tradesData } = await supabase
          .from("trading_journals")
          .select(`
            id,
            symbol,
            position_type,
            profit_loss_usd,
            trade_date,
            profiles:student_id (first_name, last_name)
          `)
          .is("teacher_score", null)
          .order("trade_date", { ascending: false })
          .limit(6);

        let formattedTrades: PendingTrade[] = [];
        if (tradesData) {
          formattedTrades = tradesData.map((t: any) => {
            const p = Array.isArray(t.profiles) ? t.profiles[0] : t.profiles;
            return {
              id: t.id,
              symbol: t.symbol,
              position_type: t.position_type,
              profit_loss_usd: t.profit_loss_usd,
              trade_date: t.trade_date,
              student_name: p ? `${p.first_name} ${p.last_name || ""}`.trim() : "Scholar"
            };
          });
        }
        setPendingTrades(formattedTrades);

        // 6. Today's attendance logs count
        let todayAttCount = 0;
        const classIds = formattedClasses.map(c => c.id);
        if (classIds.length > 0) {
          const today = new Date().toISOString().split("T")[0];
          const { count } = await supabase
            .from("attendance_logs")
            .select("id", { count: "exact", head: true })
            .in("class_group_id", classIds)
            .eq("session_date", today)
            .eq("status", "present");

          todayAttCount = count || 0;
        }

        // Stats summary
        setStats({
          totalStudents,
          activeClasses: formattedClasses.filter(c => c.is_active).length,
          pendingGrading: pendingSubsCount,
          pendingTrades: formattedTrades.length,
          todayAttendance: todayAttCount,
          totalCourses: myCoursesRes.data ? myCoursesRes.data.length : 0
        });

      } catch (err) {
        console.error("Error loading teacher portal data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTeacherData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Add todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim() || !profile) return;

    try {
      setIsAddingTodo(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("teacher_todos")
        .insert({
          teacher_id: profile.id,
          task_text: newTodoText.trim(),
          is_completed: false
        })
        .select()
        .single();

      if (!error && data) {
        setTodos(prev => [data, ...prev]);
        setNewTodoText("");
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    } finally {
      setIsAddingTodo(false);
    }
  };

  // Toggle todo
  const handleToggleTodo = async (todoId: string, currentStatus: boolean) => {
    try {
      const supabase = createClient();
      await supabase
        .from("teacher_todos")
        .update({ is_completed: !currentStatus })
        .eq("id", todoId);

      setTodos(prev =>
        prev.map(t => (t.id === todoId ? { ...t, is_completed: !currentStatus } : t))
      );
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (todoId: string) => {
    try {
      const supabase = createClient();
      await supabase.from("teacher_todos").delete().eq("id", todoId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Completed todos count & percentage
  const completedTodosCount = useMemo(() => todos.filter(t => t.is_completed).length, [todos]);
  const todosPercentage = todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#020204] text-white p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-64 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 bg-neutral-900/50 rounded-3xl border border-white/5"></div>
          ))}
        </div>
        <div className="h-80 bg-neutral-900/40 rounded-[2.5rem] border border-white/5"></div>
      </div>
    );
  }

  const teacherName = profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : "Faculty Member";

  return (
    <div className="w-full min-h-screen bg-[#020204] text-white font-sans selection:bg-fuchsia-500 selection:text-white pb-36 relative overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>

      {/* Dynamic Ambient Background Illumination */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-600/12 via-purple-700/8 to-transparent rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse duration-1000"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-amber-500/8 to-transparent rounded-full blur-[180px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-cyan-500/5 to-transparent rounded-full blur-[200px] pointer-events-none -z-10"></div>

      <div className="px-3 sm:px-6 md:px-10 pt-5 md:pt-8 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* ================= 1. ULTRA MASTERCLASS HERO COCKPIT ================= */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#120a1c]/95 via-[#0c0612]/90 to-[#030206] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden group">
          {/* Internal Glow Beacons */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-fuchsia-500/20 via-purple-600/15 to-transparent rounded-full blur-[110px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Micro Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Faculty Identity Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
              <div className="relative shrink-0">
                <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-[2rem] p-1.5 bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-amber-400 shadow-[0_0_35px_rgba(217,70,239,0.35)] relative group-hover:rotate-1 transition-transform">
                  <div className="w-full h-full rounded-[1.6rem] bg-[#07050b] overflow-hidden flex items-center justify-center font-black text-3xl sm:text-4xl text-fuchsia-400 border border-white/10 shadow-inner">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={teacherName} className="w-full h-full object-cover" />
                    ) : (
                      teacherName.charAt(0)
                    )}
                  </div>
                </div>
                {/* Active Status Beacon */}
                <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 w-6 h-6 rounded-full border-[3px] border-[#07050b] shadow-[0_0_15px_#10b981] flex items-center justify-center" title={isRtl ? "استاد فعال و آنلاین" : "Faculty Online"}>
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 text-fuchsia-300 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                    <ShieldCheck size={13} className="text-fuchsia-400" />
                    {t.teacherPages?.facultyRole || (isRtl ? "استاد ارشد آکادمی" : "Master Faculty")}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Sparkles size={13} className="text-amber-400" />
                    {isRtl ? "مرکز فرماندهی تدریس" : "Masterclass Console"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Radio size={12} className="text-emerald-400 animate-pulse" />
                    {isRtl ? "پخش زنده آماده" : "Studio Ready"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  <span className="text-neutral-400 font-medium text-lg sm:text-xl block mb-1">{timeGreeting}،</span>
                  {teacherName}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 font-medium flex items-center gap-2">
                  <span>{profile?.email}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400">{isRtl ? "آکادمی بین‌المللی صافی" : "Safi International Academy"}</span>
                </p>
              </div>
            </div>

            {/* Embedded SafiPay Faculty Treasury & Rewards Pod */}
            <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto">
              
              {/* Wallet Mini-Card */}
              <Link
                href={`/${currentLocale}/teacher/wallet`}
                className="flex items-center gap-4 px-6 py-4.5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:bg-white/[0.1] border border-white/10 hover:border-emerald-500/40 shadow-2xl transition-all group cursor-pointer backdrop-blur-xl"
              >
                <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-108 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <Wallet size={24} />
                </div>
                <div className="text-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                      {isRtl ? "کیف پول SafiPay استاد" : "SafiPay Wallet"}
                    </span>
                    <ArrowUpRight size={13} className="text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight block">
                    ${Number(profile?.wallet_balance || 0).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {isRtl ? "کلیک برای برداشت و تاریخچه" : "Click to view payouts & ledger"}
                  </span>
                </div>
              </Link>

              {/* Referrals & Ambassador Pill */}
              <Link
                href={`/${currentLocale}/teacher/referrals`}
                className="flex items-center gap-3.5 px-5 py-4.5 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent hover:bg-amber-500/15 border border-amber-500/25 hover:border-amber-500/40 shadow-xl transition-all group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Gift size={20} />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    {isRtl ? "کلوپ سفیران" : "Ambassador Club"}
                  </span>
                  <span className="text-xs font-black text-white block mt-0.5">
                    {isRtl ? "پاداش و کد معرف" : "Earn Referral Bonus"}
                  </span>
                </div>
              </Link>

            </div>

          </div>

          {/* Quick Dock Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 me-2 hidden sm:inline-block">
              {isRtl ? "دسترسی سریع:" : "Quick Dock:"}
            </span>

            <Link
              href={`/${currentLocale}/teacher/live-classes`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:scale-[1.02]"
            >
              <Video size={14} className="animate-pulse" />
              {isRtl ? "استودیو صنف آنلاین" : "Live Class Studio"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/attendance`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-all shadow-sm hover:scale-[1.02]"
            >
              <CalendarCheck size={14} />
              {isRtl ? "حاضری و غیاب صنف‌ها" : "Class Attendance"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/trading-journal`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500 hover:text-black transition-all shadow-sm hover:scale-[1.02]"
            >
              <TrendingUp size={14} />
              {isRtl ? "بررسی ژورنال تریدینگ" : "Trade Journals"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/assignments`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all shadow-sm hover:scale-[1.02]"
            >
              <FileText size={14} />
              {isRtl ? "تصحیح و نمره‌دهی تکالیف" : "Grade Assignments"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/courses`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500 hover:text-white transition-all shadow-sm hover:scale-[1.02]"
            >
              <BookOpen size={14} />
              {isRtl ? "دوره‌های آموزشی من" : "My Courses"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/students`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all shadow-sm hover:scale-[1.02]"
            >
              <Users size={14} />
              {isRtl ? "فهرست دانشجویان" : "Scholar Roster"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/quizzes`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-500 hover:text-black transition-all shadow-sm hover:scale-[1.02]"
            >
              <Target size={14} />
              {isRtl ? "آزمون‌ها و کوئیزها" : "Exams & Quizzes"}
            </Link>

            <Link
              href={`/${currentLocale}/teacher/support`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-black transition-all shadow-sm hover:scale-[1.02]"
            >
              <Headset size={14} />
              {isRtl ? "پاسخ به تیکت‌ها" : "Support Desk"}
            </Link>
          </div>
        </section>

        {/* ================= 2. HOLOGRAPHIC 6-POD BENTO STAT MATRIX ================= */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-start">
          
          {/* Card 1: Total Scholars */}
          <Link
            href={`/${currentLocale}/teacher/students`}
            className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0a0a14] to-[#04040a] border border-indigo-500/20 hover:border-indigo-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">{isRtl ? "کل دانشجویان" : "Total Scholars"}</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Users size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-black text-white font-mono">{stats.totalStudents}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "دانشجوی فعال" : "Active Scholars"}</span>
                <ChevronRight size={12} className={`text-indigo-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

          {/* Card 2: Live Classes */}
          <Link
            href={`/${currentLocale}/teacher/live-classes`}
            className="p-5 rounded-3xl bg-gradient-to-br from-red-950/40 via-[#10070a] to-[#04040a] border border-red-500/20 hover:border-red-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-400">{isRtl ? "صنف‌های فعال" : "Live Classes"}</span>
              <div className="w-8 h-8 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform">
                <Video size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-black text-white font-mono">{stats.activeClasses}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "اتاق زنده استودیو" : "Active Cohorts"}</span>
                <ChevronRight size={12} className={`text-red-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

          {/* Card 3: Pending Submissions */}
          <Link
            href={`/${currentLocale}/teacher/assignments`}
            className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-[#070e14] to-[#04040a] border border-cyan-500/20 hover:border-cyan-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">{isRtl ? "صف نمره‌دهی" : "Grading Queue"}</span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <FileText size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-black text-white font-mono">{stats.pendingGrading}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "تکلیف نیازمند بررسی" : "Submissions"}</span>
                <ChevronRight size={12} className={`text-cyan-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

          {/* Card 4: Trade Reviews */}
          <Link
            href={`/${currentLocale}/teacher/trading-journal`}
            className="p-5 rounded-3xl bg-gradient-to-br from-teal-950/40 via-[#071310] to-[#04040a] border border-teal-500/20 hover:border-teal-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">{isRtl ? "ژورنال ترید" : "Trade Reviews"}</span>
              <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-500/30 group-hover:scale-110 transition-transform">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-black text-white font-mono">{stats.pendingTrades}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "معامله بدون فیدبک" : "Unscored Trades"}</span>
                <ChevronRight size={12} className={`text-teal-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

          {/* Card 5: Today's Attendance */}
          <Link
            href={`/${currentLocale}/teacher/attendance`}
            className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#07140e] to-[#04040a] border border-emerald-500/20 hover:border-emerald-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">{isRtl ? "حاضرین امروز" : "Attendance"}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <CalendarCheck size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-black text-white font-mono">{stats.todayAttendance}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "حاضر ثبت‌شده" : "Present Scholars"}</span>
                <ChevronRight size={12} className={`text-emerald-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

          {/* Card 6: Wallet Treasury */}
          <Link
            href={`/${currentLocale}/teacher/wallet`}
            className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#140f07] to-[#04040a] border border-amber-500/20 hover:border-amber-500/50 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">{isRtl ? "موجودی پاداش" : "Treasury Balance"}</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Wallet size={16} />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-2xl font-black text-emerald-400 font-mono">${Number(profile?.wallet_balance || 0).toFixed(0)}</span>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 flex items-center justify-between">
                <span>{isRtl ? "تسویه‌حساب سریع" : "SafiPay Balance"}</span>
                <ChevronRight size={12} className={`text-amber-400 ${isRtl ? "rotate-180" : ""}`} />
              </p>
            </div>
          </Link>

        </section>

        {/* ================= 3. ACTIVE LIVE BROADCAST STUDIO HUB ================= */}
        {activeClass ? (
          <section className="rounded-[2.5rem] bg-gradient-to-br from-[#150a1b] via-[#0d0513] to-[#040206] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden text-start">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Top Bar: Live Beacon & Class Switcher */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/[0.07] relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-red-400">
                    {isRtl ? "استودیوی پخش زنده و مدیریت صنف فعال" : "Live Masterclass Broadcast Studio"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-neutral-300">
                    {activeClass.is_active ? (isRtl ? "فعال" : "Active Cohort") : (isRtl ? "آرشیو / غیرفعال" : "Inactive")}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {activeClass.class_name}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
                  {activeClass.class_days && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/5">
                      <Calendar size={13} className="text-fuchsia-400" />
                      <span>{activeClass.class_days}</span>
                    </span>
                  )}
                  {activeClass.class_time && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/5">
                      <Clock size={13} className="text-fuchsia-400" />
                      <span>{activeClass.class_time}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/5">
                    <Users size={13} className="text-cyan-400" />
                    <span className="font-mono font-bold text-white">{activeClass.enrolled_count}</span>
                    <span>{isRtl ? "دانشجوی ثبت‌نام‌شده" : "Scholars Enrolled"}</span>
                  </span>
                </div>
              </div>

              {/* Multi-Class Switcher Tabs */}
              {classes.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 px-2">
                    {isRtl ? "تعویض صنف:" : "Switch:"}
                  </span>
                  {classes.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveClass(c)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeClass.id === c.id
                          ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                          : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {c.class_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Studio Actions Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                {activeClass.meeting_link ? (
                  <a
                    href={activeClass.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.45)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transition-all hover:scale-[1.02]"
                  >
                    <Play size={16} className="fill-white" />
                    <span>{isRtl ? "شروع و ورود به اتاق جلسه زنده" : "Launch Live Classroom"}</span>
                    <ExternalLink size={13} className="opacity-80" />
                  </a>
                ) : (
                  <Link
                    href={`/${currentLocale}/teacher/live-classes/${activeClass.id}/edit`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 text-xs font-bold border border-white/10 transition-all"
                  >
                    <AlertCircle size={15} className="text-amber-400" />
                    <span>{isRtl ? "تنظیم لینک جلسه آنلاین (Teams / Google Meet)" : "Configure Meeting Link"}</span>
                  </Link>
                )}

                {activeClass.signal_group_link && (
                  <a
                    href={activeClass.signal_group_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-black border border-sky-500/30 text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                  >
                    <MessageSquare size={15} />
                    <span>{isRtl ? "اتاق تحلیل و سیگنال" : "VIP Signals Room"}</span>
                    <ExternalLink size={12} />
                  </a>
                )}

                <Link
                  href={`/${currentLocale}/teacher/attendance`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/30 text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  <CalendarCheck size={15} />
                  <span>{isRtl ? "ثبت حاضری امروز" : "Take Attendance"}</span>
                </Link>

                <Link
                  href={`/${currentLocale}/teacher/live-classes/${activeClass.id}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 text-xs font-bold transition-all"
                >
                  <Activity size={15} className="text-purple-400" />
                  <span>{isRtl ? "اتاق مانیتورینگ صنف" : "Mission Control"}</span>
                </Link>
              </div>

              <Link
                href={`/${currentLocale}/teacher/live-classes`}
                className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors group"
              >
                <span>{isRtl ? "تمام جلسات و بایگانی ضبط‌ها" : "View All Classes & Recordings"}</span>
                <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            </div>
          </section>
        ) : (
          <section className="rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center mx-auto border border-fuchsia-500/20">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-black text-white">
              {isRtl ? "هنوز صنفی برای شما اختصاص داده نشده است" : "No Active Classes Assigned Yet"}
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              {isRtl
                ? "پس از تایید و تخصیص صنف توسط مدیریت آکادمی، استودیو کلاس آنلاین و ابزارهای پخش زنده در این بخش فعال خواهد شد."
                : "Once administration assigns a class group, live tools, meeting launch, and attendance systems will activate here."}
            </p>
            <div className="pt-2">
              <Link
                href={`/${currentLocale}/teacher/classes/create`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-black text-xs font-black uppercase tracking-wider transition-all"
              >
                <Plus size={15} />
                <span>{isRtl ? "ایجاد صنف تدریس جدید" : "Create New Class Group"}</span>
              </Link>
            </div>
          </section>
        )}

        {/* ================= 4. INTERACTIVE FACULTY OPERATIONS TERMINAL ================= */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0b0c16] via-[#070710] to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-start space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Terminal Tab Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.07] relative z-10">
            <div className="flex flex-wrap items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 text-xs">
              
              {/* Tab 1: Trades */}
              <button
                onClick={() => setActiveTab("trades")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "trades"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <TrendingUp size={15} />
                <span>{isRtl ? "ژورنال تریدینگ دانشجویان" : "Journal Reviews"}</span>
                {pendingTrades.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${activeTab === "trades" ? "bg-black text-teal-300" : "bg-teal-500/20 text-teal-300"}`}>
                    {pendingTrades.length}
                  </span>
                )}
              </button>

              {/* Tab 2: Submissions */}
              <button
                onClick={() => setActiveTab("submissions")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "submissions"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <FileText size={15} />
                <span>{isRtl ? "صف نمره‌دهی تکالیف" : "Grading Queue"}</span>
                {pendingSubmissions.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${activeTab === "submissions" ? "bg-black text-cyan-300" : "bg-cyan-500/20 text-cyan-300"}`}>
                    {pendingSubmissions.length}
                  </span>
                )}
              </button>

              {/* Tab 3: Todos */}
              <button
                onClick={() => setActiveTab("todos")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "todos"
                    ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-black shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <CheckSquare size={15} />
                <span>{isRtl ? "چک‌لیست وظایف روزانه استاد" : "Faculty Action Items"}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${activeTab === "todos" ? "bg-black text-fuchsia-300" : "bg-fuchsia-500/20 text-fuchsia-300"}`}>
                  {todos.filter(t => !t.is_completed).length}
                </span>
              </button>

              {/* Tab 4: Cohorts */}
              <button
                onClick={() => setActiveTab("cohorts")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "cohorts"
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Layers size={15} />
                <span>{isRtl ? "صنف‌های من" : "My Cohorts"}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${activeTab === "cohorts" ? "bg-white text-indigo-700" : "bg-indigo-500/20 text-indigo-300"}`}>
                  {classes.length}
                </span>
              </button>

            </div>

            {/* Quick Context Link */}
            {activeTab === "trades" && (
              <Link
                href={`/${currentLocale}/teacher/trading-journal`}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 group"
              >
                <span>{isRtl ? "مشاهده تمام معاملات در دفتر کل" : "Open Full Journal Desk"}</span>
                <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            )}

            {activeTab === "submissions" && (
              <Link
                href={`/${currentLocale}/teacher/assignments`}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
              >
                <span>{isRtl ? "ورود به میز نمره‌دهی تکالیف" : "Open Assignment Grading Desk"}</span>
                <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            )}

            {activeTab === "todos" && todos.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400 font-medium">
                  {completedTodosCount} {isRtl ? "از" : "of"} {todos.length} {isRtl ? "انجام شده" : "completed"} ({todosPercentage}%)
                </span>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${todosPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* TAB CONTENT: 1. PENDING TRADES */}
          {activeTab === "trades" && (
            <div className="relative z-10">
              {pendingTrades.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingTrades.map((trade) => {
                    const isProfit = Number(trade.profit_loss_usd || 0) >= 0;
                    return (
                      <div
                        key={trade.id}
                        className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-teal-500/40 hover:bg-white/[0.05] transition-all space-y-3.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center font-mono font-black text-xs border border-teal-500/25">
                              {trade.symbol.slice(0, 2)}
                            </div>
                            <span className="font-mono text-base font-black text-white">{trade.symbol}</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl ${trade.position_type === 'BUY' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'}`}>
                            {trade.position_type}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs py-2 px-3 rounded-2xl bg-black/40 border border-white/5">
                          <span className="text-neutral-400">{trade.student_name}</span>
                          <span className={`font-mono font-black ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isProfit ? '+' : ''}${Number(trade.profit_loss_usd || 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                            <Clock size={11} />
                            {trade.trade_date}
                          </span>
                          <Link
                            href={`/${currentLocale}/teacher/trading-journal`}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-teal-400 hover:text-teal-300 group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>{isRtl ? "ثبت فیدبک و امتیاز" : "Evaluate & Score"}</span>
                            <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-14 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="text-base font-black text-white">
                    {isRtl ? "تمام ژورنال‌های معاملاتی بررسی شده‌اند" : "All Scholar Trades Evaluated"}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    {isRtl ? "هیچ پوزیشن جدیدی در صف انتظار نیست. تریدهای ثبت‌شده توسط دانشجویان به محض ارسال در اینجا ظاهر می‌شوند." : "There are no pending trades awaiting instructor review at this time."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: 2. PENDING SUBMISSIONS */}
          {activeTab === "submissions" && (
            <div className="relative z-10">
              {pendingSubmissions.length > 0 ? (
                <div className="space-y-3">
                  {pendingSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.05] hover:border-cyan-500/40 transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          <h4 className="text-base font-black text-white">{sub.assignment_title}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                          <span>{isRtl ? "دانشجو:" : "Scholar:"} <strong className="text-white">{sub.student_name}</strong></span>
                          <span>•</span>
                          <span>{isRtl ? "حداکثر نمره:" : "Max Score:"} <strong className="text-cyan-400 font-mono">{sub.max_score}</strong></span>
                          <span>•</span>
                          <span className="font-mono text-neutral-500">{new Date(sub.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Link
                        href={`/${currentLocale}/teacher/assignments`}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 text-xs font-black uppercase tracking-wider transition-all self-end sm:self-auto"
                      >
                        {isRtl ? "بررسی و ثبت نمره" : "Grade Submission"}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="text-base font-black text-white">
                    {isRtl ? "صف نمره‌دهی خالی است" : "Grading Queue is Clear"}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    {isRtl ? "تمام تکالیف ارسالی توسط شما نمره‌دهی شده‌اند یا تمرین جدیدی ارسال نشده است." : "All homework submissions for your courses have been graded."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: 3. TEACHER TODOS */}
          {activeTab === "todos" && (
            <div className="space-y-5 relative z-10">
              {/* Add Todo Input */}
              <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder={isRtl ? "افزودن یادداشت، وظیفه کلاسی یا یادآوری جدید برای امروز..." : "Add faculty action item, lesson prep or reminder..."}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-500/50 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isAddingTodo || !newTodoText.trim()}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 disabled:opacity-40 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Plus size={16} />
                  <span>{isRtl ? "افزودن به چک‌لیست" : "Add Task"}</span>
                </button>
              </form>

              {/* Todo List */}
              {todos.length > 0 ? (
                <div className="space-y-2.5">
                  {todos.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        item.is_completed
                          ? "bg-white/[0.01] border-white/5 opacity-60"
                          : "bg-white/[0.03] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleTodo(item.id, item.is_completed)}
                          className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            item.is_completed
                              ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_10px_#10b981]"
                              : "border-white/25 hover:border-fuchsia-400 text-transparent hover:bg-white/5"
                          }`}
                        >
                          <Check size={15} className={item.is_completed ? "text-black stroke-[3]" : "text-transparent"} />
                        </button>
                        <span className={`text-xs font-medium ${item.is_completed ? "line-through text-neutral-500" : "text-white"}`}>
                          {item.task_text}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(item.id)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-2 rounded-xl hover:bg-rose-500/10 cursor-pointer"
                        title={isRtl ? "حذف وظیفه" : "Delete Task"}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center mx-auto border border-fuchsia-500/20">
                    <CheckSquare size={22} />
                  </div>
                  <h4 className="text-sm font-black text-white">
                    {isRtl ? "هیچ وظیفه‌ای برای امروز ثبت نشده است" : "No Action Items"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {isRtl ? "وظایف تدریس و برنامه‌های روزانه خود را برای تمرکز بهتر در بالا یادداشت کنید." : "Use the input above to organize your daily faculty tasks."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: 4. COHORTS GLANCE */}
          {activeTab === "cohorts" && (
            <div className="relative z-10">
              {classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${cls.is_active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-400'}`}>
                          {cls.is_active ? (isRtl ? "صنف فعال" : "Active") : (isRtl ? "غیرفعال" : "Inactive")}
                        </span>
                        <span className="font-mono text-xs text-neutral-400 flex items-center gap-1">
                          <Users size={12} className="text-indigo-400" />
                          {cls.enrolled_count} {isRtl ? "دانشجو" : "Scholars"}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-white">{cls.class_name}</h4>
                        <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                          <Clock size={12} className="text-neutral-500" />
                          <span>{cls.class_days || "—"} | {cls.class_time || "—"}</span>
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <Link
                          href={`/${currentLocale}/teacher/live-classes/${cls.id}`}
                          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <span>{isRtl ? "ورود به اتاق صنف" : "Manage Studio"}</span>
                          <ChevronRight size={13} className={isRtl ? "rotate-180" : ""} />
                        </Link>

                        <Link
                          href={`/${currentLocale}/teacher/attendance`}
                          className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          {isRtl ? "حاضری" : "Attendance"}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-neutral-500 text-xs font-bold">
                  {isRtl ? "هیچ صنفی برای شما ثبت نشده است." : "No class cohorts assigned."}
                </div>
              )}
            </div>
          )}

        </section>

        {/* ================= 5. FACULTY COMPASS & TOOLBOX DIRECTORY ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 text-start">
          
          {/* Card 1: AI Assistant & Quiz Builder */}
          <Link
            href={`/${currentLocale}/teacher/quizzes`}
            className="p-6 rounded-[2rem] bg-gradient-to-br from-purple-950/20 via-[#0d0714] to-[#040206] border border-purple-500/20 hover:border-purple-500/50 shadow-xl transition-all group cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                {isRtl ? "ساخت آزمون و کوئیزهای هوشمند" : "Smart Exams & Quiz Builder"}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? "طراحی و انتشار آزمون‌های آنلاین با تصحیح خودکار برای ارزیابی مهارت دانشجویان."
                  : "Design online quizzes with automated scoring to evaluate your scholars' progress."}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:underline">
              <span>{isRtl ? "شروع ساخت آزمون" : "Open Quiz Studio"}</span>
              <ChevronRight size={13} className={isRtl ? "rotate-180" : ""} />
            </span>
          </Link>

          {/* Card 2: Student Directory & Roster */}
          <Link
            href={`/${currentLocale}/teacher/students`}
            className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-950/20 via-[#070914] to-[#020306] border border-indigo-500/20 hover:border-indigo-500/50 shadow-xl transition-all group cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-white group-hover:text-indigo-300 transition-colors">
                {isRtl ? "مدیریت و پرونده دانشجویان" : "Scholar Dossier & Directory"}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? "مشاهده کارنامه، آمار حضور و غیاب، ژورنال‌ها و صدور گواهینامه‌های رسمی برای شاگردان ممتاز."
                  : "Review scholar performance, attendance history, portfolios, and issue graduation certificates."}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:underline">
              <span>{isRtl ? "مشاهده پرونده‌ها" : "View Scholar Directory"}</span>
              <ChevronRight size={13} className={isRtl ? "rotate-180" : ""} />
            </span>
          </Link>

          {/* Card 3: SafiPay Financial Desk & Payouts */}
          <Link
            href={`/${currentLocale}/teacher/wallet`}
            className="p-6 rounded-[2rem] bg-gradient-to-br from-emerald-950/20 via-[#06120b] to-[#020503] border border-emerald-500/20 hover:border-emerald-500/50 shadow-xl transition-all group cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Wallet size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                {isRtl ? "میز مالی و تسویه‌حساب SafiPay" : "SafiPay Treasury & Settlements"}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? "بررسی حقوق تدریس، پاداش رفرال، تاریخچه واریزها و درخواست تسویه‌حساب مستقیم با کریپتو یا فیات."
                  : "Track teaching stipends, referral bonuses, transaction history, and instant crypto/fiat payouts."}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
              <span>{isRtl ? "ورود به کیف پول" : "Open SafiPay Treasury"}</span>
              <ChevronRight size={13} className={isRtl ? "rotate-180" : ""} />
            </span>
          </Link>

        </section>

      </div>
    </div>
  );
}