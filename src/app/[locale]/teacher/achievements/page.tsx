"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Flame,
  Search,
  Sparkles,
  Users,
  GraduationCap,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Globe,
  Zap,
  ArrowUpDown,
  Filter
} from "lucide-react";

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

interface AwardItem {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  points_required: number;
}

export default function TeacherAchievementsLeaderboardPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">("student");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "streak" | "awards">("score");

  const [students, setStudents] = useState<LeaderboardUser[]>([]);
  const [teachers, setTeachers] = useState<LeaderboardUser[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);

  // Grant award modal state
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedAwardId, setSelectedAwardId] = useState("");
  const [modalStudentSearch, setModalStudentSearch] = useState("");
  const [isSubmittingAward, setIsSubmittingAward] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeaderboardData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const [
          profilesRes,
          streaksRes,
          studentAwardsRes,
          awardsRes
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, first_name, last_name, avatar_url, role, total_score, country, email")
            .order("total_score", { ascending: false }),
          supabase
            .from("student_streaks")
            .select("student_id, current_streak"),
          supabase
            .from("student_awards")
            .select("student_id, award_id"),
          supabase
            .from("awards")
            .select("id, title, description, icon_url, points_required")
            .order("points_required", { ascending: true })
        ]);

        if (!isMounted) return;

        // Streaks map
        const streakMap = new Map<string, number>();
        (streaksRes.data || []).forEach((s: any) => {
          streakMap.set(s.student_id, s.current_streak || 0);
        });

        // Awards count map
        const awardsCountMap = new Map<string, number>();
        (studentAwardsRes.data || []).forEach((sa: any) => {
          awardsCountMap.set(sa.student_id, (awardsCountMap.get(sa.student_id) || 0) + 1);
        });

        // Separate and format profiles
        const studentList: LeaderboardUser[] = [];
        const teacherList: LeaderboardUser[] = [];

        (profilesRes.data || []).forEach((p: any) => {
          const formattedUser: LeaderboardUser = {
            id: p.id,
            first_name: p.first_name || (p.role === "teacher" ? (isRtl ? "استاد" : "Faculty") : (isRtl ? "دانشجو" : "Scholar")),
            last_name: p.last_name || "",
            avatar_url: p.avatar_url,
            role: p.role || "student",
            total_score: Number(p.total_score || 0),
            country: p.country || "Global",
            email: p.email || "",
            streak_days: streakMap.get(p.id) || 1,
            awards_count: awardsCountMap.get(p.id) || 0
          };

          if (p.role === "teacher" || p.role === "admin" || p.role === "super_admin") {
            teacherList.push(formattedUser);
          } else {
            studentList.push(formattedUser);
          }
        });

        // Sort descending by score initially
        studentList.sort((a, b) => b.total_score - a.total_score);
        teacherList.sort((a, b) => b.total_score - a.total_score);

        setStudents(studentList);
        setTeachers(teacherList);
        setAwards(awardsRes.data || []);

        if (studentList.length > 0) {
          setSelectedStudentId(studentList[0].id);
        }
        if (awardsRes.data && awardsRes.data.length > 0) {
          setSelectedAwardId(awardsRes.data[0].id);
        }
      } catch (err) {
        console.error("Error loading leaderboard data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchLeaderboardData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale, isRtl]);

  // Active roster based on selected tab, search query, and sorting preference
  const activeList = useMemo(() => {
    let rawList = selectedRole === "student" ? [...students] : [...teachers];

    // Sorting
    if (sortBy === "streak") {
      rawList.sort((a, b) => (b.streak_days || 0) - (a.streak_days || 0));
    } else if (sortBy === "awards") {
      rawList.sort((a, b) => (b.awards_count || 0) - (a.awards_count || 0));
    } else {
      rawList.sort((a, b) => b.total_score - a.total_score);
    }

    // Filter by search
    if (!searchQuery.trim()) return rawList;

    const query = searchQuery.toLowerCase();
    return rawList.filter(u =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.country || "").toLowerCase().includes(query)
    );
  }, [selectedRole, students, teachers, searchQuery, sortBy]);

  // Top 3 Podium
  const top1 = activeList[0] || null;
  const top2 = activeList[1] || null;
  const top3 = activeList[2] || null;

  // Filter students inside modal
  const filteredModalStudents = useMemo(() => {
    if (!modalStudentSearch.trim()) return students;
    const q = modalStudentSearch.toLowerCase();
    return students.filter(s =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  }, [students, modalStudentSearch]);

  // Grant award action
  const handleGrantAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedAwardId) return;

    try {
      setIsSubmittingAward(true);
      setStatusMessage(null);
      const supabase = createClient();

      const { error } = await supabase
        .from("student_awards")
        .insert({
          student_id: selectedStudentId,
          award_id: selectedAwardId
        });

      if (error) throw error;

      setStatusMessage({
        type: "success",
        text: isRtl ? "نشان افتخار با موفقیت به دانشجو اعطا شد!" : "Honor award granted successfully!"
      });

      // Update local award count
      setStudents(prev =>
        prev.map(s => s.id === selectedStudentId ? { ...s, awards_count: (s.awards_count || 0) + 1 } : s)
      );

      setTimeout(() => {
        setIsGrantModalOpen(false);
        setStatusMessage(null);
      }, 1800);
    } catch (err: any) {
      console.error("Error granting award:", err);
      setStatusMessage({
        type: "error",
        text: err.message || (isRtl ? "خطا در اعطای نشان" : "Failed to grant award.")
      });
    } finally {
      setIsSubmittingAward(false);
    }
  };

  const getRankBadgeTitle = (score: number) => {
    if (score >= 1000) return isRtl ? "افسانه آکادمی" : "Legend";
    if (score >= 600) return isRtl ? "اسنایپر بازار" : "Sniper";
    if (score >= 300) return isRtl ? "استاد ارشد" : "Master";
    if (score >= 150) return isRtl ? "تحلیل‌گر برتر" : "Analyst";
    return isRtl ? "هنرجوی نوآموز" : "Scholar";
  };

  // Aggregated KPIs
  const totalXP = useMemo(() => {
    const list = selectedRole === "student" ? students : teachers;
    return list.reduce((acc, u) => acc + u.total_score, 0);
  }, [selectedRole, students, teachers]);

  const maxStreak = useMemo(() => {
    const list = selectedRole === "student" ? students : teachers;
    return list.reduce((max, u) => Math.max(max, u.streak_days || 0), 0);
  }, [selectedRole, students, teachers]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-3 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-40 sm:h-48 bg-neutral-900/60 rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/5"></div>
        <div className="h-64 sm:h-72 bg-neutral-900/50 rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/5"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 sm:h-20 bg-neutral-900/40 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-amber-500 selection:text-black pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-transparent rounded-full blur-[120px] sm:blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-fuchsia-600/10 to-transparent rounded-full blur-[100px] sm:blur-[150px] pointer-events-none -z-10"></div>

      <div className="px-3 sm:px-6 md:px-10 pt-3 sm:pt-6 md:pt-10 max-w-7xl mx-auto space-y-5 sm:space-y-8 relative z-10">

        {/* ================= 1. LEADERBOARD HERO HEADER ================= */}
        <section className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#160f09]/95 via-[#0e0905]/90 to-[#030306] border border-white/10 p-4 sm:p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Trophy size={13} className="text-amber-400 shrink-0" />
                <span>{isRtl ? "تالار مشاهیر و نخبگان آکادمی صافی" : "Hall of Fame & Academic Honors"}</span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {isRtl ? "جدول رتبه‌بندی و لیدربورد" : "Safi Academy Leaderboard"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "برترین چهره‌های آموزشی، فعال‌ترین تحلیل‌گران و اساتید پیشرو در بازارهای مالی بر اساس مجموع امتیازات، نمرات و نشان‌های افتخار."
                  : "Celebrating the highest-ranked scholars, top market analysts, and faculty instructors based on earned XP, streaks, and honors."
                }
              </p>
            </div>

            {/* Grant Award Action Button - 100% Mobile Full-Width */}
            <div className="w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsGrantModalOpen(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(245,158,11,0.25)] active:scale-95 cursor-pointer"
              >
                <Award size={16} />
                <span>{isRtl ? "اعطای نشان افتخار به دانشجو" : "Grant Scholar Honor Award"}</span>
              </button>
            </div>
          </div>

          {/* ================= ROLE TOGGLE DOCK (STUDENT / TEACHER) ================= */}
          <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            
            {/* The 2-button Switcher - 100% Mobile Responsive Grid */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-black/70 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedRole === "student"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-md shadow-amber-500/25"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <GraduationCap size={15} className="shrink-0" />
                <span className="truncate">{isRtl ? "دانشجویان" : "Scholars"}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                  selectedRole === "student" ? "bg-black/25 text-black" : "bg-white/10 text-neutral-300"
                }`}>
                  {students.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("teacher")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedRole === "teacher"
                    ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-md shadow-fuchsia-500/25"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Users size={15} className="shrink-0" />
                <span className="truncate">{isRtl ? "اساتید" : "Faculty"}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                  selectedRole === "teacher" ? "bg-white/20 text-white" : "bg-white/10 text-neutral-300"
                }`}>
                  {teachers.length}
                </span>
              </button>
            </div>

            {/* Realtime Search Bar */}
            <div className="relative w-full sm:w-64 md:w-80">
              <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? "جستجوی نام یا کشور..." : "Search by name or country..."}
                className={`w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors ${
                  isRtl ? 'pr-9 pl-8' : 'pl-9 pr-8'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white ${isRtl ? 'left-3' : 'right-3'}`}
                >
                  <X size={13} />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ================= QUICK STATS MATRIX (MOBILE & DESKTOP) ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Users size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? (selectedRole === "student" ? "تعداد دانشجویان" : "تعداد اساتید") : (selectedRole === "student" ? "Total Scholars" : "Total Faculty")}
              </span>
              <span className="text-sm sm:text-lg font-black text-white font-mono">
                {selectedRole === "student" ? students.length : teachers.length}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/20">
              <Trophy size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "مجموع امتیازات (XP)" : "Total XP Points"}
              </span>
              <span className="text-sm sm:text-lg font-black text-amber-400 font-mono">
                {totalXP.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
              <Flame size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "بیشترین استریک روزانه" : "Longest Streak"}
              </span>
              <span className="text-sm sm:text-lg font-black text-orange-400 font-mono">
                {maxStreak} <span className="text-xs text-neutral-500">{isRtl ? "روز" : "days"}</span>
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Award size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "نشان‌های افتخار فعال" : "Honors Active"}
              </span>
              <span className="text-sm sm:text-lg font-black text-purple-300 font-mono">
                {awards.length}
              </span>
            </div>
          </div>
        </section>

        {/* ================= 2. THE CHAMPION'S PODIUM (TOP 3) ================= */}
        {activeList.length > 0 && (
          <section className="relative rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#0e0c15] to-[#050409] border border-white/10 p-3 sm:p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="text-center mb-4 sm:mb-8">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 flex items-center justify-center gap-1.5">
                <Crown size={13} className="text-amber-400 animate-bounce" />
                <span>{isRtl ? "پیشتازان رتبه‌بندی آکادمی صافی" : "Top Tier Champions"}</span>
              </span>
              <h2 className="text-base sm:text-2xl font-black text-white mt-1">
                {isRtl
                  ? selectedRole === "student" ? "سکوی افتخار ۳ دانشجوی برتر" : "سکوی افتخار ۳ استاد برتر"
                  : selectedRole === "student" ? "Top 3 Ranked Scholars" : "Top 3 Ranked Faculty"}
              </h2>
            </div>

            {/* Podium Display (Flawless Responsive Columns) */}
            <div className="flex flex-row items-end justify-center gap-1.5 sm:gap-6 md:gap-8 pt-3 pb-1 max-w-3xl mx-auto">
              
              {/* RANK #2 (Silver - Left) */}
              {top2 && (
                <div className="w-1/3 flex flex-col items-center text-center group">
                  <div className="relative mb-2 sm:mb-3">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 shadow-[0_0_15px_rgba(203,213,225,0.25)]">
                      <div className="w-full h-full rounded-[0.8rem] sm:rounded-[1.2rem] bg-neutral-900 overflow-hidden flex items-center justify-center font-black text-base sm:text-xl text-slate-300">
                        {top2.avatar_url ? (
                          <img src={top2.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          top2.first_name.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-slate-300 text-black text-[9px] sm:text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-[#0e0c15] shadow-md">
                      2
                    </div>
                  </div>

                  <h3 className="text-[11px] sm:text-sm font-black text-white truncate max-w-full px-1">
                    {top2.first_name} {top2.last_name}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono mt-0.5 truncate max-w-full block">
                    {top2.country}
                  </span>

                  <span className="text-[11px] sm:text-sm font-black font-mono text-slate-300 mt-0.5 block">
                    {top2.total_score.toLocaleString()} <span className="text-[8px] sm:text-[9px] text-neutral-500">XP</span>
                  </span>

                  {/* Pedestal block */}
                  <div className="w-full h-20 sm:h-36 md:h-44 mt-2 sm:mt-3 rounded-xl sm:rounded-3xl bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-700/30 border border-slate-400/20 flex flex-col items-center justify-center p-1 sm:p-2 shadow-lg">
                    <Medal size={18} className="text-slate-300 opacity-60 mb-0.5 sm:mb-1" />
                    <span className="text-[9px] sm:text-xs font-black text-slate-300 uppercase tracking-wider text-center">
                      {isRtl ? "مقام ۲" : "Rank #2"}
                    </span>
                  </div>
                </div>
              )}

              {/* RANK #1 (Gold - Center, Highest) */}
              {top1 && (
                <div className="w-1/3 flex flex-col items-center text-center -translate-y-2 sm:-translate-y-4 group">
                  <Crown size={22} className="text-amber-400 mb-0.5 sm:mb-1 animate-pulse" />

                  <div className="relative mb-2 sm:mb-3">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                      <div className="w-full h-full rounded-[0.8rem] sm:rounded-[1.2rem] bg-neutral-900 overflow-hidden flex items-center justify-center font-black text-lg sm:text-2xl text-amber-400">
                        {top1.avatar_url ? (
                          <img src={top1.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          top1.first_name.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] sm:text-xs font-black w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-[#0e0c15] shadow-lg">
                      1
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-base font-black text-amber-400 truncate max-w-full px-1">
                    {top1.first_name} {top1.last_name}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono mt-0.5 truncate max-w-full block">
                    {top1.country}
                  </span>

                  <span className="text-xs sm:text-lg font-black font-mono text-amber-400 mt-0.5 block">
                    {top1.total_score.toLocaleString()} <span className="text-[9px] sm:text-[10px] text-neutral-500">XP</span>
                  </span>

                  {/* Pedestal block (Taller) */}
                  <div className="w-full h-28 sm:h-48 md:h-56 mt-2 sm:mt-3 rounded-xl sm:rounded-3xl bg-gradient-to-t from-amber-950/80 via-amber-900/40 to-amber-700/40 border border-amber-400/40 flex flex-col items-center justify-center p-1 sm:p-2 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-amber-400/5 animate-pulse"></div>
                    <Trophy size={22} className="text-amber-400 mb-0.5 sm:mb-1 relative z-10" />
                    <span className="text-[10px] sm:text-sm font-black text-amber-300 uppercase tracking-widest relative z-10 text-center">
                      {isRtl ? "قهرمان اول" : "Champion"}
                    </span>
                  </div>
                </div>
              )}

              {/* RANK #3 (Bronze - Right) */}
              {top3 && (
                <div className="w-1/3 flex flex-col items-center text-center group">
                  <div className="relative mb-2 sm:mb-3">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 shadow-[0_0_15px_rgba(180,83,9,0.25)]">
                      <div className="w-full h-full rounded-[0.8rem] sm:rounded-[1.2rem] bg-neutral-900 overflow-hidden flex items-center justify-center font-black text-base sm:text-xl text-amber-600">
                        {top3.avatar_url ? (
                          <img src={top3.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          top3.first_name.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[9px] sm:text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-[#0e0c15] shadow-md">
                      3
                    </div>
                  </div>

                  <h3 className="text-[11px] sm:text-sm font-black text-white truncate max-w-full px-1">
                    {top3.first_name} {top3.last_name}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono mt-0.5 truncate max-w-full block">
                    {top3.country}
                  </span>

                  <span className="text-[11px] sm:text-sm font-black font-mono text-amber-600 mt-0.5 block">
                    {top3.total_score.toLocaleString()} <span className="text-[8px] sm:text-[9px] text-neutral-500">XP</span>
                  </span>

                  {/* Pedestal block */}
                  <div className="w-full h-16 sm:h-28 md:h-36 mt-2 sm:mt-3 rounded-xl sm:rounded-3xl bg-gradient-to-t from-amber-950/60 via-amber-900/30 to-amber-800/20 border border-amber-700/20 flex flex-col items-center justify-center p-1 sm:p-2 shadow-lg">
                    <Medal size={16} className="text-amber-600 opacity-60 mb-0.5 sm:mb-1" />
                    <span className="text-[9px] sm:text-xs font-black text-amber-600 uppercase tracking-wider text-center">
                      {isRtl ? "مقام ۳" : "Rank #3"}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}


        {/* ================= 3. LEADERBOARD ROSTER & RUNNERS-UP ================= */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
            <h3 className="text-sm sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span>{isRtl ? "فهرست رتبه‌بندی اعضای برتر" : "Ranked Roster & Statistics"}</span>
            </h3>

            {/* Sorting Pills Toolbar (Mobile Scrollable) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                <ArrowUpDown size={11} /> {isRtl ? "مرتب‌سازی:" : "Sort:"}
              </span>

              <button
                type="button"
                onClick={() => setSortBy("score")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                  sortBy === "score"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                XP Score
              </button>

              <button
                type="button"
                onClick={() => setSortBy("streak")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                  sortBy === "streak"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                🔥 Streak
              </button>

              <button
                type="button"
                onClick={() => setSortBy("awards")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                  sortBy === "awards"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                🏆 Awards
              </button>
            </div>
          </div>

          {activeList.length > 0 ? (
            <div className="space-y-2 sm:space-y-2.5">
              {activeList.map((user, index) => {
                const rank = index + 1;
                const isTop1 = rank === 1;
                const isTop2 = rank === 2;
                const isTop3 = rank === 3;

                return (
                  <div
                    key={user.id}
                    className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between gap-2.5 sm:gap-4 ${
                      isTop1
                        ? "bg-gradient-to-r from-amber-500/10 via-[#0e0c15] to-[#050409] border-amber-500/40 shadow-sm"
                        : isTop2
                        ? "bg-gradient-to-r from-slate-400/10 via-[#0e0c15] to-[#050409] border-slate-400/30"
                        : isTop3
                        ? "bg-gradient-to-r from-amber-700/10 via-[#0e0c15] to-[#050409] border-amber-700/30"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                    }`}
                  >
                    {/* Rank Number & User Avatar & Name */}
                    <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                      
                      {/* Rank Number Pill */}
                      <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-sm font-mono flex items-center justify-center shrink-0 ${
                        isTop1 ? "bg-amber-400 text-black shadow-md shadow-amber-400/20" :
                        isTop2 ? "bg-slate-300 text-black shadow-md shadow-slate-300/20" :
                        isTop3 ? "bg-amber-700 text-white" :
                        "bg-white/5 text-neutral-400 border border-white/10"
                      }`}>
                        #{rank}
                      </div>

                      {/* Avatar */}
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-amber-400 text-xs sm:text-sm">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          user.first_name.charAt(0)
                        )}
                      </div>

                      {/* User Information */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[240px] md:max-w-none">
                            {user.first_name} {user.last_name}
                          </h4>
                          {isTop1 && <Crown size={13} className="text-amber-400 shrink-0" />}
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-500 font-medium truncate mt-0.5">
                          <span className="truncate max-w-[80px] sm:max-w-none">{user.country}</span>
                          <span>•</span>
                          <span className="text-neutral-400 truncate">{getRankBadgeTitle(user.total_score)}</span>
                          
                          {/* Mini Flame for Mobile */}
                          {user.streak_days && user.streak_days > 1 ? (
                            <span className="sm:hidden inline-flex items-center text-[10px] font-black text-orange-400 bg-orange-500/10 px-1 py-0.2 rounded font-mono">
                              🔥{user.streak_days}d
                            </span>
                          ) : null}
                        </div>
                      </div>

                    </div>

                    {/* Stats: Streak, Awards, XP */}
                    <div className="flex items-center gap-2 sm:gap-6 shrink-0">
                      
                      {/* Streak days (Tablet & Desktop) */}
                      {user.streak_days && user.streak_days > 0 ? (
                        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[11px] font-black">
                          <Flame size={12} className="text-orange-400" />
                          <span>{user.streak_days}d</span>
                        </div>
                      ) : null}

                      {/* Awards count (Desktop) */}
                      {user.awards_count && user.awards_count > 0 ? (
                        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-black">
                          <Award size={12} className="text-amber-400" />
                          <span>{user.awards_count}</span>
                        </div>
                      ) : null}

                      {/* Score XP */}
                      <div className="text-end min-w-[65px] sm:min-w-[90px]">
                        <span className={`text-sm sm:text-xl font-black font-mono tracking-tight block ${
                          isTop1 ? "text-amber-400" :
                          isTop2 ? "text-slate-300" :
                          isTop3 ? "text-amber-600" :
                          "text-white"
                        }`}>
                          {user.total_score.toLocaleString()}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-neutral-500 font-bold block uppercase tracking-wider">
                          XP Score
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 sm:py-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-neutral-500 text-xs font-bold">
              {isRtl ? "هیچ کاربری با این مشخصات یافت نشد." : "No members found matching your search."}
            </div>
          )}
        </section>

      </div>

      {/* ================= MODAL: GRANT HONOR AWARD (100% MOBILE RESPONSIVE) ================= */}
      {isGrantModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0c0a14] border border-white/10 rounded-[1.75rem] sm:rounded-3xl p-4 sm:p-7 max-w-lg w-full space-y-4 sm:space-y-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <button
              type="button"
              onClick={() => setIsGrantModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer p-1 rounded-lg bg-white/5 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 pe-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
                <Award size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isRtl ? "اعطای نشان افتخار به دانشجو" : "Grant Scholar Honor Badge"}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400">
                  {isRtl ? "ثبت رسمی نشان در کارنامه و پروفایل دانشجو" : "Award official credentials to scholar profile"}
                </p>
              </div>
            </div>

            {statusMessage && (
              <div className={`p-3 sm:p-4 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                statusMessage.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>
                {statusMessage.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleGrantAward} className="space-y-4 text-start">
              
              {/* Select Student with Search Filter */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                  {isRtl ? "انتخاب دانشجو" : "Select Scholar"}
                </label>
                
                <input
                  type="text"
                  placeholder={isRtl ? "جستجوی دانشجو در لیست..." : "Filter scholars..."}
                  value={modalStudentSearch}
                  onChange={(e) => setModalStudentSearch(e.target.value)}
                  className="w-full mb-2 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                />

                <select
                  required
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full py-2.5 px-3 sm:px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                >
                  {filteredModalStudents.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#0c0a14]">
                      {s.first_name} {s.last_name} ({s.email}) - {s.total_score} XP
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Award Badge */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                  {isRtl ? "انتخاب نشان افتخار" : "Select Honor Award"}
                </label>
                <div className="space-y-2 max-h-44 sm:max-h-52 overflow-y-auto custom-scrollbar pr-1">
                  {awards.map(award => (
                    <div
                      key={award.id}
                      onClick={() => setSelectedAwardId(award.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedAwardId === award.id
                          ? "bg-amber-500/15 border-amber-500/40 shadow-sm"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="text-xl sm:text-2xl shrink-0">{award.icon_url || "🏆"}</span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{award.title}</h4>
                        <p className="text-[10px] text-neutral-400 truncate">{award.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions - Responsive Layout */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsGrantModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold text-center"
                >
                  {isRtl ? "انصراف" : "Cancel"}
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingAward || students.length === 0}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black uppercase tracking-wider disabled:opacity-50 cursor-pointer text-center"
                >
                  {isSubmittingAward ? (isRtl ? "در حال ثبت..." : "Granting...") : (isRtl ? "اعطای رسمی نشان" : "Confirm & Grant")}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}