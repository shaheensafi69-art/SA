"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Award,
  Trophy,
  ScrollText,
  Medal,
  Crown,
  Flame,
  Search,
  Sparkles,
  Users,
  GraduationCap,
  X,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";

// ================= TYPES =================
interface CertificateItem {
  id: string;
  course_name: string;
  certificate_code: string;
  issue_date: string;
  certificate_url: string;
}

interface AwardItem {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  awarded_at: string;
}

interface LeaderboardUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  role: string;
  total_score: number;
  country: string | null;
  email: string;
  streak_days?: number;
  awards_count?: number;
}

export default function AchievementsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);

  // Navigation Tabs: Leaderboard vs My Certificates vs My Badges
  const [activeMainTab, setActiveMainTab] = useState<"leaderboard" | "certificates" | "awards">("leaderboard");

  // Leaderboard 2-button Switcher: "student" vs "teacher"
  const [leaderboardRole, setLeaderboardRole] = useState<"student" | "teacher">("student");
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState<LeaderboardUser[]>([]);
  const [teachers, setTeachers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push(`/${currentLocale}/login`);
          return;
        }
        const userId = session.user.id;
        if (isMounted) setCurrentUserId(userId);

        // Fetch user profile, certificates, awards, and leaderboard data in parallel
        const [
          profileRes,
          certRes,
          awardRes,
          profilesRes,
          streaksRes,
          studentAwardsRes
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("total_score, first_name, last_name, avatar_url, country")
            .eq("id", userId)
            .single(),
          supabase
            .from("certificates")
            .select(`
              id,
              certificate_code,
              issue_date,
              certificate_url,
              courses (title)
            `)
            .eq("student_id", userId)
            .order("issue_date", { ascending: false }),
          supabase
            .from("student_awards")
            .select(`
              id,
              awarded_at,
              awards (
                title,
                description,
                icon_url
              )
            `)
            .eq("student_id", userId)
            .order("awarded_at", { ascending: false }),
          supabase
            .from("profiles")
            .select("id, first_name, last_name, avatar_url, role, total_score, country, email")
            .order("total_score", { ascending: false })
            .limit(100),
          supabase
            .from("student_streaks")
            .select("student_id, current_streak"),
          supabase
            .from("student_awards")
            .select("student_id, award_id")
        ]);

        if (!isMounted) return;

        // 1. My Profile Total Score
        if (profileRes.data) {
          setTotalScore(profileRes.data.total_score || 0);
        }

        // 2. My Certificates
        if (certRes.data) {
          const formattedCerts: CertificateItem[] = certRes.data.map((cert: any) => {
            const courseData = Array.isArray(cert.courses) ? cert.courses[0] : cert.courses;
            return {
              id: cert.id,
              course_name: courseData?.title || "Safi Academy Course",
              certificate_code: cert.certificate_code,
              issue_date: cert.issue_date,
              certificate_url: cert.certificate_url,
            };
          });
          setCertificates(formattedCerts);
        }

        // 3. My Badges & Awards
        if (awardRes.data) {
          const formattedAwards: AwardItem[] = awardRes.data.map((item: any) => {
            const awardDetails = Array.isArray(item.awards) ? item.awards[0] : item.awards;
            return {
              id: item.id,
              title: awardDetails?.title || "Special Honor",
              description: awardDetails?.description || "Earned for academic excellence.",
              icon_url: awardDetails?.icon_url || "",
              awarded_at: item.awarded_at,
            };
          });
          setAwards(formattedAwards);
        }

        // 4. Leaderboard maps
        const streakMap = new Map<string, number>();
        (streaksRes.data || []).forEach((st: any) => {
          streakMap.set(st.student_id, st.current_streak || 0);
        });

        const awardsCountMap = new Map<string, number>();
        (studentAwardsRes.data || []).forEach((aw: any) => {
          awardsCountMap.set(aw.student_id, (awardsCountMap.get(aw.student_id) || 0) + 1);
        });

        const studentList: LeaderboardUser[] = [];
        const teacherList: LeaderboardUser[] = [];

        (profilesRes.data || []).forEach((p: any) => {
          const item: LeaderboardUser = {
            id: p.id,
            first_name: p.first_name || "Academy",
            last_name: p.last_name || "Scholar",
            avatar_url: p.avatar_url,
            role: p.role || "student",
            total_score: Number(p.total_score || 0),
            country: p.country,
            email: p.email || "",
            streak_days: streakMap.get(p.id) || 0,
            awards_count: awardsCountMap.get(p.id) || 0
          };

          if (p.role === "teacher" || p.role === "admin" || p.role === "super_admin") {
            teacherList.push(item);
          } else {
            studentList.push(item);
          }
        });

        // Ensure sorted by total_score descending
        studentList.sort((a, b) => b.total_score - a.total_score);
        teacherList.sort((a, b) => b.total_score - a.total_score);

        setStudents(studentList);
        setTeachers(teacherList);

      } catch (error) {
        console.error("Error fetching achievements & leaderboard:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Current active list based on role switcher
  const currentLeaderboardList = useMemo(() => {
    const list = leaderboardRole === "student" ? students : teachers;
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter((u) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      (u.country && u.country.toLowerCase().includes(q))
    );
  }, [leaderboardRole, students, teachers, searchQuery]);

  // Top 3 Podium
  const top1 = currentLeaderboardList[0] || null;
  const top2 = currentLeaderboardList[1] || null;
  const top3 = currentLeaderboardList[2] || null;

  // User's own rank among students
  const myStudentRank = useMemo(() => {
    if (!currentUserId) return null;
    const index = students.findIndex((s) => s.id === currentUserId);
    return index !== -1 ? index + 1 : null;
  }, [students, currentUserId]);

  const getRankBadgeTitle = (score: number) => {
    if (score >= 1000) return isRtl ? "افسانه آکادمی" : "Legend";
    if (score >= 600) return isRtl ? "تریدر ارشد" : "Senior Trader";
    if (score >= 300) return isRtl ? "تحلیل‌گر برتر" : "Top Analyst";
    if (score >= 150) return isRtl ? "هنرجوی کوشا" : "Rising Scholar";
    return isRtl ? "هنرجوی نوآموز" : "Active Scholar";
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020204] text-white font-sans pb-32 overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambient Cosmic Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="px-3 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 max-w-7xl mx-auto space-y-5 sm:space-y-8 relative z-10">

        {/* ================= 1. ACADEMY HONORS HERO COCKPIT ================= */}
        <section className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#181108]/95 via-[#0e0a05]/90 to-[#030306] border border-amber-500/20 p-4 sm:p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/15 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Trophy size={13} className="text-amber-400 shrink-0" />
                  <span>{isRtl ? "تالار افتخارات و لیدربورد" : "Hall of Fame & Leaderboard"}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/10 text-neutral-300 border border-white/10">
                  <Sparkles size={11} className="text-yellow-400 shrink-0" />
                  <span>{isRtl ? "رتبه‌بندی آکادمی" : "Rank System"}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {isRtl ? "دستاوردها، مدارک و رتبه‌بندی" : "Achievements & Leaderboard"}
              </h1>

              <p className="text-[11px] sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "جدول رتبه‌بندی نخبگان دانشجویی و اساتید، مدارک رسمی صادره و نشان‌های افتخار کسب‌شده شما در آکادمی صافی."
                  : "Explore the live leaderboard for scholars and faculty, verified course certificates, and earned merit badges."}
              </p>
            </div>

            {/* Student's Personal Stats Pod - 100% Mobile 2-Col Grid */}
            <div className="w-full lg:w-auto grid grid-cols-2 gap-2 sm:gap-3">
              
              {/* Score / XP Card */}
              <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:px-5 sm:py-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#1a1205] to-[#0a0702] border border-amber-500/30 shadow-lg backdrop-blur-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  <Medal size={20} className="sm:hidden" />
                  <Medal size={24} className="hidden sm:block" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400/90 block truncate">
                    {t.achievements?.totalScore || (isRtl ? "امتیاز شما" : "Total Score")}
                  </span>
                  <span className="text-lg sm:text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
                    {isLoading ? "..." : totalScore.toLocaleString()}
                    <span className="text-[10px] sm:text-xs text-amber-400 font-bold">XP</span>
                  </span>
                </div>
              </div>

              {/* My Rank Card */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:px-5 sm:py-4 rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/10 shadow-lg backdrop-blur-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-fuchsia-500/15 text-fuchsia-400 flex items-center justify-center shrink-0 border border-fuchsia-500/30">
                  <Trophy size={18} className="sm:hidden" />
                  <Trophy size={22} className="hidden sm:block" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block truncate">
                    {isRtl ? "رتبه فعلی" : "Current Rank"}
                  </span>
                  <span className="text-base sm:text-xl font-black text-fuchsia-400 font-mono tracking-tight truncate block">
                    {myStudentRank ? `#${myStudentRank}` : "—"}
                    <span className="text-[9px] sm:text-xs text-neutral-400 font-bold ms-1">
                      {isRtl ? "آکادمی" : "Global"}
                    </span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ================= MAIN TABS BAR (Mobile 3-Column Touch Segment) ================= */}
          <div className="mt-5 pt-4 sm:mt-8 sm:pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-1.5 sm:gap-3">
            
            <button
              onClick={() => setActiveMainTab("leaderboard")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMainTab === "leaderboard"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              <Trophy size={15} className="shrink-0" />
              <span className="truncate">{isRtl ? "لیدربورد" : "Leaderboard"}</span>
            </button>

            <button
              onClick={() => setActiveMainTab("certificates")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMainTab === "certificates"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              <ScrollText size={15} className="shrink-0" />
              <span className="truncate">{isRtl ? "مدارک من" : "Certificates"}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold shrink-0 ${
                activeMainTab === "certificates" ? "bg-white text-indigo-700" : "bg-white/10 text-neutral-300"
              }`}>
                {certificates.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab("awards")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMainTab === "awards"
                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              <Award size={15} className="shrink-0" />
              <span className="truncate">{isRtl ? "مدال‌ها" : "Badges"}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold shrink-0 ${
                activeMainTab === "awards" ? "bg-white text-fuchsia-700" : "bg-white/10 text-neutral-300"
              }`}>
                {awards.length}
              </span>
            </button>

          </div>
        </section>

        {/* ================= 2. TAB 1: ACADEMY LEADERBOARD ================= */}
        {activeMainTab === "leaderboard" && (
          <section className="space-y-6 sm:space-y-8 animate-[fadeIn_0.3s_ease-out]">
            
            {/* The 2-Button Switcher (استودنت / استاد) & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-xl">
              
              {/* THE 2 MAIN BUTTONS: STUDENT VS TEACHER */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-black/60 border border-white/5">
                
                {/* Button 1: Students (استودنت) */}
                <button
                  type="button"
                  onClick={() => setLeaderboardRole("student")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    leaderboardRole === "student"
                      ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black shadow-md shadow-amber-500/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <GraduationCap size={16} className="shrink-0" />
                  <span className="truncate">
                    <span className="sm:hidden">{isRtl ? "دانشجویان" : "Scholars"}</span>
                    <span className="hidden sm:inline">{isRtl ? "دانشجویان برتر (استودنت)" : "Top Scholars"}</span>
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                    leaderboardRole === "student" ? "bg-black/25 text-black" : "bg-white/10 text-neutral-300"
                  }`}>
                    {students.length}
                  </span>
                </button>

                {/* Button 2: Teachers (استاد) */}
                <button
                  type="button"
                  onClick={() => setLeaderboardRole("teacher")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    leaderboardRole === "teacher"
                      ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Users size={16} className="shrink-0" />
                  <span className="truncate">
                    <span className="sm:hidden">{isRtl ? "اساتید" : "Faculty"}</span>
                    <span className="hidden sm:inline">{isRtl ? "اساتید و مربیان (استاد)" : "Faculty Mentors"}</span>
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                    leaderboardRole === "teacher" ? "bg-white/20 text-white" : "bg-white/10 text-neutral-300"
                  }`}>
                    {teachers.length}
                  </span>
                </button>

              </div>

              {/* Real-time Search Box */}
              <div className="relative w-full md:w-80">
                <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    leaderboardRole === "student"
                      ? (isRtl ? "جستجوی دانشجو با نام یا کشور..." : "Search scholar by name...")
                      : (isRtl ? "جستجوی استاد با نام..." : "Search teacher by name...")
                  }
                  className={`w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner ${
                    isRtl ? 'pr-10 pl-8' : 'pl-10 pr-8'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer ${isRtl ? 'left-3' : 'right-3'}`}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

            </div>

            {/* ================= UNIFIED OLYMPIC PODIUM (Mobile & Desktop 3-Column) ================= */}
            {currentLeaderboardList.length > 0 && !searchQuery && (
              <div className="pt-4 sm:pt-8 pb-2 sm:pb-4 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-2 sm:gap-5 items-end">
                  
                  {/* #2 Rank (Silver Podium - Order 1) */}
                  {top2 ? (
                    <div className="flex flex-col items-center group">
                      {/* Avatar & Info */}
                      <div className="relative mb-2 sm:mb-3">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-slate-400 to-slate-200 shadow-md">
                          <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center font-black text-sm sm:text-xl text-slate-300">
                            {top2.avatar_url ? (
                              <img src={top2.avatar_url} alt={top2.first_name} className="w-full h-full object-cover" />
                            ) : (
                              top2.first_name.charAt(0)
                            )}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-300 text-black font-black text-[9px] sm:text-xs shadow-md">
                          #2
                        </div>
                      </div>

                      <h4 className="text-[11px] sm:text-sm font-black text-white text-center truncate max-w-full px-1">
                        {top2.first_name} {top2.last_name}
                      </h4>
                      <span className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase truncate max-w-full">
                        {getRankBadgeTitle(top2.total_score)}
                      </span>

                      {/* Pedestal Base */}
                      <div className="w-full h-20 sm:h-28 mt-2 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-slate-700/40 via-slate-800/30 to-[#07070b] border-t-2 border-x border-slate-400/40 flex flex-col items-center justify-center p-2 text-center shadow-lg">
                        <span className="text-xs sm:text-sm font-black font-mono text-slate-200">
                          {top2.total_score.toLocaleString()}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          XP
                        </span>
                        {top2.streak_days ? (
                          <span className="hidden sm:flex items-center gap-0.5 text-[9px] text-orange-400 font-bold mt-1">
                            <Flame size={10} className="fill-orange-500 text-orange-500" />
                            {top2.streak_days}d
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : <div />}

                  {/* #1 Rank (Gold Champion Center - Taller & Elevated) */}
                  {top1 ? (
                    <div className="flex flex-col items-center group -mt-4 sm:-mt-6">
                      {/* Crown + Avatar */}
                      <div className="relative mb-2 sm:mb-3 flex flex-col items-center">
                        <Crown size={22} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)] -mb-1 animate-bounce" />
                        <div className="w-18 h-18 sm:w-26 sm:h-26 rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                          <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center font-black text-lg sm:text-3xl text-yellow-400">
                            {top1.avatar_url ? (
                              <img src={top1.avatar_url} alt={top1.first_name} className="w-full h-full object-cover" />
                            ) : (
                              top1.first_name.charAt(0)
                            )}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-black text-[10px] sm:text-xs shadow-md">
                          #1
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-base font-black text-white text-center truncate max-w-full px-1">
                        {top1.first_name} {top1.last_name}
                      </h4>
                      <span className="text-[9px] sm:text-[11px] text-yellow-400 font-bold uppercase truncate max-w-full">
                        {isRtl ? "قهرمان آکادمی" : "Champion"}
                      </span>

                      {/* Pedestal Base */}
                      <div className="w-full h-28 sm:h-40 mt-2 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-amber-600/40 via-amber-900/30 to-[#07070b] border-t-2 border-x-2 border-yellow-400/60 flex flex-col items-center justify-center p-2 text-center shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                        <span className="text-sm sm:text-lg font-black font-mono text-yellow-300">
                          {top1.total_score.toLocaleString()}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-amber-300 font-black uppercase tracking-wider">
                          XP Points
                        </span>
                        {top1.streak_days ? (
                          <span className="flex items-center gap-1 text-[9px] sm:text-[11px] text-orange-400 font-black mt-1">
                            <Flame size={12} className="fill-orange-500 text-orange-500" />
                            {top1.streak_days}d
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : <div />}

                  {/* #3 Rank (Bronze Podium - Order 3) */}
                  {top3 ? (
                    <div className="flex flex-col items-center group">
                      {/* Avatar & Info */}
                      <div className="relative mb-2 sm:mb-3">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-700 to-amber-500 shadow-md">
                          <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center font-black text-sm sm:text-xl text-amber-500">
                            {top3.avatar_url ? (
                              <img src={top3.avatar_url} alt={top3.first_name} className="w-full h-full object-cover" />
                            ) : (
                              top3.first_name.charAt(0)
                            )}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-700 text-white font-black text-[9px] sm:text-xs shadow-md">
                          #3
                        </div>
                      </div>

                      <h4 className="text-[11px] sm:text-sm font-black text-white text-center truncate max-w-full px-1">
                        {top3.first_name} {top3.last_name}
                      </h4>
                      <span className="text-[8px] sm:text-[10px] text-amber-600 font-bold uppercase truncate max-w-full">
                        {getRankBadgeTitle(top3.total_score)}
                      </span>

                      {/* Pedestal Base */}
                      <div className="w-full h-16 sm:h-24 mt-2 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-amber-900/40 via-amber-950/30 to-[#07070b] border-t-2 border-x border-amber-700/40 flex flex-col items-center justify-center p-2 text-center shadow-lg">
                        <span className="text-xs sm:text-sm font-black font-mono text-amber-300">
                          {top3.total_score.toLocaleString()}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-amber-500 font-bold uppercase tracking-wider">
                          XP
                        </span>
                        {top3.streak_days ? (
                          <span className="hidden sm:flex items-center gap-0.5 text-[9px] text-orange-400 font-bold mt-1">
                            <Flame size={10} className="fill-orange-500 text-orange-500" />
                            {top3.streak_days}d
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : <div />}

                </div>
              </div>
            )}

            {/* ================= LEADERBOARD RANKS LIST (Rank 4 to 50) ================= */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <span>{isRtl ? "جدول رتبه‌بندی اعضا" : "Honor Rankings"}</span>
                <span className="font-mono">{currentLeaderboardList.length} {isRtl ? "نفر" : "Members"}</span>
              </div>

              {currentLeaderboardList.length > 0 ? (
                <div className="space-y-2">
                  {currentLeaderboardList.map((user, idx) => {
                    const rankNumber = idx + 1;
                    const isMe = user.id === currentUserId;

                    return (
                      <div
                        key={user.id}
                        className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between gap-2.5 sm:gap-4 ${
                          isMe
                            ? "bg-gradient-to-r from-amber-500/20 via-[#1c1408] to-[#0a0702] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/40"
                            : rankNumber <= 3
                            ? "bg-[#0c0c14]/90 border-white/10 hover:border-amber-500/30"
                            : "bg-[#08080d]/80 border-white/5 hover:border-white/15"
                        }`}
                      >
                        {/* Left: Rank & User Info */}
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                          {/* Rank Badge */}
                          <div
                            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                              rankNumber === 1
                                ? "bg-yellow-500 text-black shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                                : rankNumber === 2
                                ? "bg-slate-300 text-black shadow-[0_0_8px_rgba(203,213,225,0.4)]"
                                : rankNumber === 3
                                ? "bg-amber-700 text-white shadow-[0_0_8px_rgba(180,83,9,0.4)]"
                                : "bg-white/5 text-neutral-400 border border-white/5"
                            }`}
                          >
                            #{rankNumber}
                          </div>

                          {/* Avatar */}
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.first_name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-black text-xs sm:text-sm text-amber-400">
                                {user.first_name.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Name & Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <h4 className="text-xs sm:text-sm font-black text-white truncate">
                                {user.first_name} {user.last_name}
                              </h4>
                              {isMe && (
                                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black uppercase bg-amber-500 text-black shrink-0">
                                  {isRtl ? "شما" : "You"}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 truncate">
                              <span className="text-amber-400/90 font-bold truncate">
                                {getRankBadgeTitle(user.total_score)}
                              </span>
                              {user.country && (
                                <>
                                  <span>•</span>
                                  <span className="truncate">{user.country}</span>
                                </>
                              )}
                              {user.streak_days ? (
                                <>
                                  <span>•</span>
                                  <span className="text-orange-400 font-bold flex items-center gap-0.5 shrink-0">
                                    <Flame size={10} className="fill-orange-500 text-orange-500" />
                                    {user.streak_days}d
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* Right: Score */}
                        <div className="text-end shrink-0 ps-1">
                          <span className="text-xs sm:text-base font-black text-white font-mono tracking-tight block">
                            {user.total_score.toLocaleString()}
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                            XP
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 sm:py-16 text-center space-y-2 bg-[#0a0a0f] rounded-2xl sm:rounded-3xl border border-white/5">
                  <Trophy size={28} className="mx-auto text-neutral-600" />
                  <p className="text-xs text-neutral-400 font-bold">
                    {isRtl ? "هیچ کاربری یافت نشد." : "No members found."}
                  </p>
                </div>
              )}
            </div>

          </section>
        )}

        {/* ================= 3. TAB 2: MY CERTIFICATES ================= */}
        {activeMainTab === "certificates" && (
          <section className="space-y-4 sm:space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <ScrollText className="text-indigo-400 shrink-0" size={20} />
                <h2 className="text-sm sm:text-xl font-black text-white truncate">
                  {t.achievements?.officialCertificates || (isRtl ? "گواهینامه‌های رسمی پایان دوره" : "Official Course Certificates")}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 bg-white/5 rounded-full text-[10px] sm:text-xs font-mono font-bold text-neutral-300 shrink-0">
                {certificates.length} {isRtl ? "مدرک" : "Certs"}
              </span>
            </div>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 sm:p-7 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#0c0c16] via-[#08080f] to-[#040407] border border-white/10 hover:border-indigo-500/40 shadow-xl transition-all group flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                        <ScrollText size={22} />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck size={11} />
                        {t.achievements?.verifiedCredential || (isRtl ? "تایید شده" : "Verified")}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-lg font-black text-white leading-snug group-hover:text-indigo-300 transition-colors">
                        {cert.course_name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-neutral-400 mt-2.5 pt-2.5 border-t border-white/5">
                        <span>{t.achievements?.issued || (isRtl ? "صدور:" : "Issued:")} <strong className="text-white">{new Date(cert.issue_date).toLocaleDateString()}</strong></span>
                        <span>•</span>
                        <span>ID: <strong className="text-indigo-400 font-mono">{cert.certificate_code}</strong></span>
                      </div>
                    </div>

                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-black uppercase tracking-wider transition-all"
                      >
                        <ScrollText size={14} />
                        <span>{t.achievements?.viewCertificate || (isRtl ? "مشاهده و دانلود مدرک" : "View Certificate")}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 sm:py-20 text-center space-y-3 bg-[#0a0a0f] rounded-2xl sm:rounded-[2.5rem] border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                  <ScrollText size={26} />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {t.achievements?.noCertificatesTitle || (isRtl ? "هنوز گواهینامه‌ای صادر نشده است" : "No Certificates Issued Yet")}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed px-4">
                  {t.achievements?.noCertificatesDesc || (isRtl ? "با تکمیل دوره‌های آموزشی و قبولی در آزمون‌ها، گواهینامه رسمی در این بخش صادر خواهد شد." : "Complete academy courses to earn verified graduation credentials.")}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ================= 4. TAB 3: MY BADGES & AWARDS ================= */}
        {activeMainTab === "awards" && (
          <section className="space-y-4 sm:space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Award className="text-yellow-500 shrink-0" size={20} />
                <h2 className="text-sm sm:text-xl font-black text-white truncate">
                  {t.achievements?.badgesHonors || (isRtl ? "نشان‌ها و مدال‌های افتخار" : "Badges & Academic Honors")}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 bg-white/5 rounded-full text-[10px] sm:text-xs font-mono font-bold text-neutral-300 shrink-0">
                {awards.length} {isRtl ? "نشان" : "Badges"}
              </span>
            </div>

            {awards.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-[#0e0e16] to-[#06060a] border border-white/5 hover:border-yellow-500/40 shadow-xl transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 flex items-center justify-center mb-2.5 sm:mb-3 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                      {award.icon_url && (award.icon_url.includes("http") || award.icon_url.includes("/")) ? (
                        <img src={award.icon_url} alt={award.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      ) : (
                        <Award size={26} className="text-yellow-400" />
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                      {award.title}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {award.description}
                    </p>

                    <div className="mt-auto pt-2 text-[8px] sm:text-[9px] text-neutral-500 font-mono">
                      {new Date(award.awarded_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 sm:py-20 text-center space-y-3 bg-[#0a0a0f] rounded-2xl sm:rounded-[2.5rem] border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/20">
                  <Award size={26} />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {t.achievements?.noBadgesTitle || (isRtl ? "هنوز مدالی دریافت نکرده‌اید" : "No Badges Unlocked Yet")}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed px-4">
                  {t.achievements?.noBadgesDesc || (isRtl ? "با تحویل تکالیف، شرکت در کلاس‌ها و ثبت معاملات موفق، نشان‌های افتخار را کسب کنید." : "Complete assignments and submit trading journals to unlock badges.")}
                </p>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}