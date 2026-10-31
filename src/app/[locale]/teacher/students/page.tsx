"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  Users,
  Search,
  Loader2,
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  UserCheck,
  X,
  Star,
  Eye,
  LayoutGrid,
  List,
  Sparkles,
  Layers,
  Award,
  ChevronDown,
  Save,
  CheckCircle2,
  ExternalLink,
  Download,
  Copy,
  Check,
  MessageCircle,
  TrendingUp,
  RefreshCw,
  Trophy,
  Medal,
  Zap,
} from "lucide-react";

type StudentProfile = {
  id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  country: string;
  avatar_url: string;
  total_score: number;
  wallet_balance: number;
  bio: string;
  referral_code: string;
  enrolled_classes: string[];
};

type QuickFilter = "all" | "top_scorers" | "multi_class" | "with_phone";

export default function TeacherAllStudentsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [teacherClassNames, setTeacherClassNames] = useState<string[]>([]);

  // Search & Filter & View
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortBy, setSortBy] = useState<"score_desc" | "score_asc" | "name_asc" | "classes_desc">("score_desc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Selected Student for Dossier Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Score Granting in Modal or Direct Card Action
  const [scoreToAdd, setScoreToAdd] = useState("");
  const [scoreReason, setScoreReason] = useState("");
  const [isScoring, setIsScoring] = useState(false);
  const [scoringStudentId, setScoringStudentId] = useState<string | null>(null);
  const [scoreSuccessMsg, setScoreSuccessMsg] = useState(false);

  // Copy feedback states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedAllEmails, setCopiedAllEmails] = useState(false);

  useEffect(() => {
    fetchAllTeacherStudents();
  }, []);

  const fetchAllTeacherStudents = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push(`/${currentLocale}/login`);
      return;
    }

    const teacherId = session.user.id;

    try {
      // 1. Fetch teacher classes
      const { data: teacherClasses, error: classesError } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", teacherId);

      if (classesError) throw classesError;

      if (!teacherClasses || teacherClasses.length === 0) {
        setStudents([]);
        setTeacherClassNames([]);
        return;
      }

      setTeacherClassNames(teacherClasses.map((c) => c.class_name));
      const classIds = teacherClasses.map((c) => c.id);

      // 2. Fetch class_students
      const { data: classStudentsData, error: csError } = await supabase
        .from("class_students")
        .select("student_id, class_group_id")
        .in("class_group_id", classIds);

      if (csError) throw csError;

      if (!classStudentsData || classStudentsData.length === 0) {
        setStudents([]);
        return;
      }

      const uniqueStudentIds = Array.from(new Set(classStudentsData.map((item) => item.student_id)));

      // 3. Fetch profiles safely
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, father_name, date_of_birth, email, phone_number, country, avatar_url, total_score, wallet_balance, bio, referral_code")
        .in("id", uniqueStudentIds);

      if (profilesError) throw profilesError;

      if (profilesData) {
        const formattedStudents: StudentProfile[] = profilesData.map((p: any) => {
          const studentClassRelations = classStudentsData.filter((cs) => cs.student_id === p.id);
          const enrolledClassNames = studentClassRelations.map((rel) => {
            const cls = teacherClasses.find((c) => c.id === rel.class_group_id);
            return cls ? cls.class_name : (isRtl ? "صنف نامشخص" : "Unknown Class");
          });

          return {
            id: p.id,
            first_name: p.first_name || (isRtl ? "شاگرد آکادمی" : "Scholar"),
            last_name: p.last_name || "",
            father_name: p.father_name || (isRtl ? "تعیین نشده" : "Not specified"),
            date_of_birth: p.date_of_birth || (isRtl ? "تعیین نشده" : "Not specified"),
            email: p.email || (isRtl ? "بدون ایمیل" : "No email"),
            phone_number: p.phone_number || "",
            country: p.country || (isRtl ? "بین‌المللی" : "Global"),
            avatar_url: p.avatar_url || "",
            total_score: typeof p.total_score === "number" ? p.total_score : 0,
            wallet_balance: typeof p.wallet_balance === "number" ? p.wallet_balance : 0,
            bio: p.bio || (isRtl ? "بیوگرافی در پرونده ثبت نشده است." : "No biography provided in profile."),
            referral_code: p.referral_code || "-",
            enrolled_classes: Array.from(new Set(enrolledClassNames)),
          };
        });

        setStudents(formattedStudents);
      }
    } catch (error) {
      console.error("Error fetching teacher roster:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Award points to a student
  const handleAwardPoints = async (studentTarget: StudentProfile, pointsAmount: number) => {
    if (!studentTarget || isNaN(pointsAmount) || pointsAmount <= 0) return;

    setScoringStudentId(studentTarget.id);
    setIsScoring(true);
    const supabase = createClient();
    const newTotalScore = studentTarget.total_score + pointsAmount;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ total_score: newTotalScore })
        .eq("id", studentTarget.id);

      if (error) throw error;

      const updated = { ...studentTarget, total_score: newTotalScore };
      setStudents((prev) => prev.map((s) => (s.id === studentTarget.id ? updated : s)));

      if (selectedStudent && selectedStudent.id === studentTarget.id) {
        setSelectedStudent(updated);
      }

      setScoreToAdd("");
      setScoreReason("");
      setScoreSuccessMsg(true);
      setTimeout(() => setScoreSuccessMsg(false), 3500);
    } catch (error: any) {
      alert((isRtl ? "خطا در بروزرسانی امتیاز: " : "Failed to update score: ") + error.message);
    } finally {
      setIsScoring(false);
      setScoringStudentId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const totalUnique = students.length;
    const totalClasses = teacherClassNames.length;
    const topPerformer =
      students.length > 0
        ? [...students].sort((a, b) => b.total_score - a.total_score)[0]
        : null;
    const totalScore = students.reduce((acc, s) => acc + s.total_score, 0);
    const avgScore = totalUnique > 0 ? (totalScore / totalUnique).toFixed(0) : "0";

    return { totalUnique, totalClasses, topPerformer, avgScore, totalScore };
  }, [students, teacherClassNames]);

  // Filtered & Sorted list
  const filteredStudents = useMemo(() => {
    let list = students.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.first_name.toLowerCase().includes(q) ||
        s.last_name.toLowerCase().includes(q) ||
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
        s.father_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone_number.includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.referral_code.toLowerCase().includes(q) ||
        s.enrolled_classes.some((c) => c.toLowerCase().includes(q));

      const matchesClass =
        classFilter === "all" || s.enrolled_classes.includes(classFilter);

      let matchesQuick = true;
      if (quickFilter === "top_scorers") {
        matchesQuick = s.total_score >= 50;
      } else if (quickFilter === "multi_class") {
        matchesQuick = s.enrolled_classes.length > 1;
      } else if (quickFilter === "with_phone") {
        matchesQuick = Boolean(s.phone_number && s.phone_number.length > 4);
      }

      return matchesSearch && matchesClass && matchesQuick;
    });

    list.sort((a, b) => {
      if (sortBy === "score_desc") return b.total_score - a.total_score;
      if (sortBy === "score_asc") return a.total_score - b.total_score;
      if (sortBy === "name_asc") return a.first_name.localeCompare(b.first_name);
      if (sortBy === "classes_desc") return b.enrolled_classes.length - a.enrolled_classes.length;
      return 0;
    });

    return list;
  }, [students, searchQuery, classFilter, quickFilter, sortBy]);

  // Export Roster as CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;

    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Father Name",
      "Email",
      "Phone",
      "Country",
      "Total Score",
      "Wallet Balance",
      "Enrolled Classes",
      "Referral Code",
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.id}"`,
      `"${s.first_name}"`,
      `"${s.last_name}"`,
      `"${s.father_name}"`,
      `"${s.email}"`,
      `"${s.phone_number}"`,
      `"${s.country}"`,
      s.total_score,
      s.wallet_balance,
      `"${s.enrolled_classes.join(", ")}"`,
      `"${s.referral_code}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `safi_academy_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy all emails
  const handleCopyAllEmails = () => {
    const emails = filteredStudents
      .map((s) => s.email)
      .filter((e) => e && !e.includes("No email") && !e.includes("بدون ایمیل"))
      .join(", ");

    if (!emails) return;
    navigator.clipboard.writeText(emails);
    setCopiedAllEmails(true);
    setTimeout(() => setCopiedAllEmails(false), 3000);
  };

  // Helper for WhatsApp link
  const getWhatsAppLink = (phone: string, studentName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      isRtl
        ? `سلام ${studentName} گرامی، پیامی از طرف استاد آکادمی صافی:`
        : `Hello ${studentName}, this is your instructor from Safi Academy:`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-fuchsia-500/20 border-t-fuchsia-500 animate-spin"></div>
          <Users className="w-6 h-6 text-fuchsia-400 absolute inset-0 m-auto" />
        </div>
        <p className="text-neutral-400 text-xs font-bold tracking-widest animate-pulse">
          {t.teacherPages?.loadingAcademyRoster ||
            (isRtl ? "در حال بارگذاری فهرست شاگردان آکادمی..." : "Loading Faculty Student Directory...")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020202] text-white p-3 sm:p-6 md:p-10 relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Cosmic Glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[65vw] h-[65vw] bg-fuchsia-600/10 rounded-full blur-[170px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] left-[30%] w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[200px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.35s_ease-out]">
        
        {/* ================= HERO HEADER ================= */}
        <header className="bg-[#0a0a0f]/90 p-6 sm:p-8 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-fuchsia-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
            
            {/* Title & Badge */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent text-fuchsia-400 rounded-3xl flex items-center justify-center border border-fuchsia-500/30 shadow-[0_0_35px_rgba(217,70,239,0.25)] shrink-0">
                <Users size={36} className="text-fuchsia-400" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                  <Sparkles size={12} className="text-fuchsia-400 animate-pulse" />
                  <span>{isRtl ? "بانک اطلاعات جامع شاگردان" : "Safi Academy Scholar Roster"}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                  {isRtl ? "شاگردان" : "Class"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                    {isRtl ? "صنف‌های من" : "Students & Scholars"}
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
                  {isRtl
                    ? `فهرست کامل و پرونده آموزشی تمام ${students.length} شاگرد حاضر در صنف‌های شما با دسترسی به نمرات، امتیازدهی، و ارتباط مستقیم.`
                    : `Direct dossier access to all ${students.length} scholars across your classes with real-time scoring, awards, and contacts.`}
                </p>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                onClick={() => fetchAllTeacherStudents(true)}
                disabled={isRefreshing}
                title={isRtl ? "بروزرسانی داده‌ها" : "Refresh Roster"}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white rounded-2xl text-xs font-bold transition-all active:scale-95 shrink-0"
              >
                <RefreshCw size={18} className={isRefreshing ? "animate-spin text-fuchsia-400" : ""} />
              </button>

              <button
                onClick={handleCopyAllEmails}
                className="px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-fuchsia-500/30 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                {copiedAllEmails ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">{isRtl ? "ایمیل‌ها کپی شدند!" : "Emails Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-fuchsia-400" />
                    <span>{isRtl ? "کپی ایمیل‌ها" : "Copy Emails"}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCSV}
                disabled={filteredStudents.length === 0}
                className="px-5 py-4 bg-gradient-to-r from-fuchsia-600/80 to-purple-600/80 hover:from-fuchsia-500 hover:to-purple-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[0_10px_25px_rgba(217,70,239,0.3)] disabled:opacity-50"
              >
                <Download size={16} />
                <span>{isRtl ? "خروجی اکسل (CSV)" : "Export CSV"}</span>
              </button>
            </div>

          </div>
        </header>

        {/* ================= BENTO KPI METRICS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Total Unique Scholars */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-white/15 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">
              {isRtl ? "مجموع شاگردان" : "Total Scholars"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.totalUnique}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "نفر" : "Scholars"}</span>
            </div>
            <p className="text-[10px] text-fuchsia-400 font-medium mt-2 flex items-center gap-1">
              <Users size={11} /> {isRtl ? "در تمام صنف‌های شما" : "In your faculty"}
            </p>
          </div>

          {/* Active Cohorts */}
          <div className="bg-[#0a0a0f]/80 border border-purple-500/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-purple-500/30 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-purple-400 mb-1">
              {isRtl ? "صنف‌های فعال" : "Active Cohorts"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.totalClasses}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "گروه" : "Groups"}</span>
            </div>
            <p className="text-[10px] text-purple-400/80 font-medium mt-2 flex items-center gap-1">
              <Layers size={11} /> {isRtl ? "تحت هدایت شما" : "Curriculum groups"}
            </p>
          </div>

          {/* Top Performer */}
          <div className="col-span-2 sm:col-span-1 bg-[#0a0a0f]/80 border border-amber-500/15 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-amber-500/35 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1">
              <Trophy size={13} className="text-amber-400" />
              <span>{isRtl ? "شاگرد برتر" : "Top Performer"}</span>
            </span>
            <div className="truncate">
              <p className="text-base sm:text-xl font-black text-white truncate">
                {stats.topPerformer ? `${stats.topPerformer.first_name} ${stats.topPerformer.last_name}` : "-"}
              </p>
            </div>
            <p className="text-[10px] text-amber-400 font-bold mt-2 flex items-center gap-1">
              <Star size={11} className="fill-amber-400" />
              {stats.topPerformer ? `${stats.topPerformer.total_score} ${isRtl ? "امتیاز کسب شده" : "pts earned"}` : "No score yet"}
            </p>
          </div>

          {/* Average Score */}
          <div className="bg-[#0a0a0f]/80 border border-emerald-500/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">
              {isRtl ? "میانگین نمرات" : "Avg Score"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.avgScore}</span>
              <span className="text-[10px] text-emerald-500/70 uppercase font-bold">{isRtl ? "امتیاز" : "pts"}</span>
            </div>
            <p className="text-[10px] text-emerald-400/80 font-medium mt-2 flex items-center gap-1">
              <TrendingUp size={11} /> {isRtl ? "شاخص مشارکت" : "Engagement index"}
            </p>
          </div>

          {/* Total Points Awarded */}
          <div className="bg-[#0a0a0f]/80 border border-indigo-500/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-indigo-500/30 transition-all">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-indigo-400 mb-1">
              {isRtl ? "مجموع امتیازات" : "Total Points"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-indigo-400">{stats.totalScore}</span>
              <span className="text-[10px] text-indigo-500/70 uppercase font-bold">{isRtl ? "امتیاز" : "pts"}</span>
            </div>
            <p className="text-[10px] text-indigo-400/80 font-medium mt-2 flex items-center gap-1">
              <Award size={11} /> {isRtl ? "کل اعطا شده" : "Total awarded"}
            </p>
          </div>

        </div>

        {/* ================= CONTROLS & FILTER BAR ================= */}
        <div className="bg-[#0a0a0f]/90 border border-white/5 rounded-3xl p-4 sm:p-6 backdrop-blur-xl space-y-4 shadow-xl">
          
          {/* Search + Selects */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors"
              />
              <input
                type="text"
                placeholder={
                  t.teacherPages?.searchStudentPlaceholder ||
                  (isRtl
                    ? "جستجوی شاگرد با نام، ایمیل، شماره تماس، کشور، صنف یا کد رفرال..."
                    : "Search scholars by name, email, phone, country, cohort, or referral...")
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded-full bg-white/5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter by Class & Sort & View Mode */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              
              {/* Class Filter Dropdown */}
              {teacherClassNames.length > 0 && (
                <div className="relative min-w-[150px]">
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:border-fuchsia-500 appearance-none pr-9 cursor-pointer shadow-inner truncate"
                  >
                    <option value="all">{isRtl ? "تمام صنف‌ها" : "All Cohorts"}</option>
                    {teacherClassNames.map((cName) => (
                      <option key={cName} value={cName}>
                        {cName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                </div>
              )}

              {/* Sort Selector */}
              <div className="relative min-w-[150px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:border-fuchsia-500 appearance-none pr-9 cursor-pointer shadow-inner"
                >
                  <option value="score_desc">{isRtl ? "بیشترین امتیاز" : "Highest Score"}</option>
                  <option value="score_asc">{isRtl ? "کمترین امتیاز" : "Lowest Score"}</option>
                  <option value="name_asc">{isRtl ? "نام (الفبایی)" : "Name (A-Z)"}</option>
                  <option value="classes_desc">{isRtl ? "بیشترین صنف" : "Most Classes"}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>

              {/* View Switcher (Grid vs Table) */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1.5 rounded-2xl">
                <button
                  onClick={() => setViewMode("grid")}
                  title={isRtl ? "نمای کارت‌ها" : "Grid View"}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === "grid" ? "bg-fuchsia-600/30 text-fuchsia-300 shadow-sm" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  title={isRtl ? "نمای جدولی" : "Table View"}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === "table" ? "bg-fuchsia-600/30 text-fuchsia-300 shadow-sm" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">
              {isRtl ? "فیلتر سریع:" : "Quick Filter:"}
            </span>

            {[
              { id: "all", label: isRtl ? "همه شاگردان" : "All Scholars" },
              { id: "top_scorers", label: isRtl ? "شاگردان ممتاز (+۵۰)" : "Top Scorers (50+ pts)" },
              { id: "multi_class", label: isRtl ? "چند صنف همزمان" : "Multi-Cohort" },
              { id: "with_phone", label: isRtl ? "دارای واتساپ / شماره" : "With Phone" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setQuickFilter(chip.id as QuickFilter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  quickFilter === chip.id
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm"
                    : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                {chip.label}
              </button>
            ))}

            <span className="text-[11px] text-neutral-500 mr-auto font-mono">
              {filteredStudents.length} {isRtl ? "مورد یافت شد" : "scholars found"}
            </span>
          </div>

        </div>

        {/* ================= DATA DISPLAY: GRID VS TABLE ================= */}
        {filteredStudents.length === 0 ? (
          <div className="py-24 sm:py-36 flex flex-col items-center justify-center bg-[#0a0a0f]/60 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md p-8 shadow-2xl text-center">
            <ShieldAlert size={64} className="text-neutral-700 mb-4" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {searchQuery || classFilter !== "all" || quickFilter !== "all"
                ? (isRtl ? "هیچ شاگردی با این معیار فیلتر یافت نشد" : "No Scholars Match Criteria")
                : (t.teacherPages?.noStudentsFound || (isRtl ? "هنوز هیچ شاگردی در صنف‌های شما ثبت‌نام نشده است" : "No Students Enrolled Yet"))}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mb-6">
              {t.teacherPages?.noStudentsMatchingCriteria ||
                (isRtl
                  ? "می‌توانید کلمه جستجو یا فیلتر صنف را تغییر دهید تا شاگردان نمایش داده شوند."
                  : "Try clearing your search query or modifying class filters.")}
            </p>
            {(searchQuery || classFilter !== "all" || quickFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setClassFilter("all");
                  setQuickFilter("all");
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white transition-all"
              >
                {isRtl ? "پاک‌سازی فیلترها" : "Reset Filters"}
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* ================= GRID CARDS VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredStudents.map((student, index) => {
              const isTop1 = sortBy === "score_desc" && index === 0 && student.total_score > 0;
              const isTop2 = sortBy === "score_desc" && index === 1 && student.total_score > 0;
              const isTop3 = sortBy === "score_desc" && index === 2 && student.total_score > 0;

              return (
                <div
                  key={student.id}
                  className="bg-[#0a0a0f] border border-white/5 rounded-[2.2rem] p-6 flex flex-col items-center text-center group hover:border-fuchsia-500/40 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(217,70,239,0.15)] relative overflow-hidden hover:-translate-y-1.5"
                >
                  {/* Subtle Top Glow on Hover */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Score Pill / Rank Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    {isTop1 ? (
                      <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-lg">
                        <Trophy size={12} className="text-amber-400" />
                        <span>#1</span>
                      </span>
                    ) : isTop2 ? (
                      <span className="bg-slate-400/20 border border-slate-400/40 text-slate-200 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-lg">
                        <Medal size={12} className="text-slate-300" />
                        <span>#2</span>
                      </span>
                    ) : isTop3 ? (
                      <span className="bg-amber-700/20 border border-amber-700/40 text-amber-500 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-lg">
                        <Medal size={12} className="text-amber-600" />
                        <span>#3</span>
                      </span>
                    ) : (
                      <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-inner">
                        <Star size={11} className="fill-amber-400" />
                        <span>{student.total_score} pts</span>
                      </span>
                    )}
                  </div>

                  {/* Country Pill */}
                  <div className="absolute top-4 right-4 text-[9px] font-bold text-neutral-400 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 truncate max-w-[45%]">
                    {student.country}
                  </div>

                  {/* Avatar with Status Ring */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.8rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl mb-4 mt-5 group-hover:scale-105 transition-transform duration-500 relative">
                    {student.avatar_url ? (
                      <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-fuchsia-400">{student.first_name.charAt(0)}</span>
                    )}
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black"></div>
                  </div>

                  {/* Scholar Name */}
                  <h3 className="text-base sm:text-lg font-black text-white line-clamp-1 w-full group-hover:text-fuchsia-400 transition-colors">
                    {student.first_name} {student.last_name}
                  </h3>

                  {/* Email */}
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 mb-2 truncate w-full px-2">
                    {student.email}
                  </p>

                  {/* Enrolled Classes Pills */}
                  <div className="flex flex-wrap gap-1 justify-center max-h-14 overflow-hidden mb-5">
                    {student.enrolled_classes.slice(0, 2).map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold uppercase truncate max-w-[130px]"
                        title={cls}
                      >
                        {cls}
                      </span>
                    ))}
                    {student.enrolled_classes.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-neutral-400 text-[9px] font-bold">
                        +{student.enrolled_classes.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Bar (View Profile + Quick +5 Pts + WhatsApp) */}
                  <div className="w-full mt-auto space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="flex-1 py-3 bg-white/5 hover:bg-fuchsia-500/15 border border-white/10 hover:border-fuchsia-500/40 text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                      >
                        <Eye size={14} className="text-fuchsia-400" />
                        <span>{isRtl ? "مشاهده پرونده" : "View Profile"}</span>
                      </button>

                      {/* Quick +5 Points Micro-Button */}
                      <button
                        onClick={() => handleAwardPoints(student, 5)}
                        disabled={isScoring && scoringStudentId === student.id}
                        title={isRtl ? "اعطای سریع ۵ امتیاز تشویقی" : "Award +5 Kudos Points"}
                        className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-400 rounded-2xl text-xs font-black transition-all active:scale-95 shrink-0"
                      >
                        {isScoring && scoringStudentId === student.id ? (
                          <Loader2 size={14} className="animate-spin text-amber-400" />
                        ) : (
                          <span className="flex items-center gap-0.5">
                            <Zap size={13} className="fill-amber-400" />
                            <span>+5</span>
                          </span>
                        )}
                      </button>

                      {/* WhatsApp shortcut if phone exists */}
                      {student.phone_number && (
                        <a
                          href={getWhatsAppLink(student.phone_number, student.first_name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={isRtl ? "ارسال پیام در واتساپ" : "WhatsApp Chat"}
                          className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 rounded-2xl transition-all active:scale-95 shrink-0"
                        >
                          <MessageCircle size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* ================= TABLE VIEW ================= */
          <div className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2.5rem] p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]" dir={isRtl ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-black uppercase text-[10px] tracking-widest">
                  <th className="py-4 px-4 text-center">#</th>
                  <th className="py-4 px-4">{t.teacherPages?.studentProfile || (isRtl ? "مشخصات شاگرد" : "Scholar Profile")}</th>
                  <th className="py-4 px-4">{t.teacherPages?.contactDetails || (isRtl ? "اطلاعات تماس" : "Contact")}</th>
                  <th className="py-4 px-4">{t.teacherPages?.activeCohorts || (isRtl ? "صنف‌های ثبت‌نامی" : "Enrolled Classes")}</th>
                  <th className="py-4 px-4 text-center">{t.teacherPages?.score || (isRtl ? "امتیاز آکادمی" : "Score")}</th>
                  <th className="py-4 px-4 text-right">{t.teacherPages?.actions || (isRtl ? "عملیات" : "Action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                    
                    {/* Rank Index */}
                    <td className="py-4 px-4 text-center font-mono text-xs text-neutral-500">
                      {index + 1}
                    </td>

                    {/* Scholar Identity */}
                    <td className="py-4 px-4 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-black text-fuchsia-400">{student.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                          <span>{student.first_name} {student.last_name}</span>
                          <span className="text-[10px] font-normal text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                            {student.country}
                          </span>
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          ID: {student.id.substring(0, 8)}...
                        </p>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 font-mono text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-neutral-500" />
                        <span>{student.email}</span>
                      </div>
                      {student.phone_number && (
                        <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                          <Phone size={11} className="text-neutral-500" />
                          <span>{student.phone_number}</span>
                        </div>
                      )}
                    </td>

                    {/* Enrolled Classes */}
                    <td className="py-4 px-4 max-w-[280px]">
                      <div className="flex flex-wrap gap-1.5">
                        {student.enrolled_classes.map((clsName, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-wide truncate max-w-[140px]"
                            title={clsName}
                          >
                            {clsName}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 font-black border border-amber-500/20 text-xs">
                        <Star size={11} className="fill-amber-400" />
                        {student.total_score}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAwardPoints(student, 5)}
                          disabled={isScoring && scoringStudentId === student.id}
                          title={isRtl ? "+۵ امتیاز سریع" : "+5 Quick Points"}
                          className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-400 rounded-xl text-xs font-black transition-all active:scale-95"
                        >
                          +5 pts
                        </button>

                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/40 text-neutral-300 hover:text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <Eye size={14} className="text-fuchsia-400" />
                          <span>{isRtl ? "پرونده" : "Profile"}</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ================= DETAILED STUDENT DOSSIER MODAL ======================== */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div
            className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md"
            onClick={() => setSelectedStudent(null)}
          ></div>

          <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-32 bg-fuchsia-500/15 blur-[60px] pointer-events-none"></div>

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl shrink-0">
                  {selectedStudent.avatar_url ? (
                    <img src={selectedStudent.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-fuchsia-400">{selectedStudent.first_name.charAt(0)}</span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-wider text-neutral-400 border border-white/10">
                      ID: {selectedStudent.id.substring(0, 8)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 text-[10px] font-black uppercase tracking-wider text-fuchsia-400 border border-fuchsia-500/20">
                      {t.teacherPages?.safiAcademyScholar || (isRtl ? "شاگرد آکادمی صافی" : "Safi Academy Scholar")}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 relative z-10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="px-6 sm:px-8 py-3 bg-white/[0.015] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {selectedStudent.email && (
                  <a
                    href={`mailto:${selectedStudent.email}`}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <Mail size={13} className="text-fuchsia-400" />
                    <span>{isRtl ? "ارسال ایمیل" : "Send Email"}</span>
                  </a>
                )}
                {selectedStudent.phone_number && (
                  <a
                    href={getWhatsAppLink(selectedStudent.phone_number, selectedStudent.first_name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-1.5 transition-all"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              <div className="text-[11px] text-neutral-500 font-mono">
                {isRtl ? "پرونده محرمانه دانشجویی" : "Confidential Student Dossier"}
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508] space-y-6">
              
              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Email */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3.5">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Mail size={18} className="text-neutral-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                        {t.teacherPages?.email || "Email"}
                      </p>
                      <p className="text-xs sm:text-sm text-white font-mono mt-0.5 truncate">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedStudent.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    title="Copy Email"
                    className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-all shrink-0"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3.5">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Phone size={18} className="text-neutral-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                        {t.teacherPages?.phone || "Phone"}
                      </p>
                      <p className="text-xs sm:text-sm text-white font-mono mt-0.5 truncate">
                        {selectedStudent.phone_number || (isRtl ? "ثبت نشده" : "Not provided")}
                      </p>
                    </div>
                  </div>
                  {selectedStudent.phone_number && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedStudent.phone_number);
                        setCopiedPhone(true);
                        setTimeout(() => setCopiedPhone(false), 2000);
                      }}
                      title="Copy Phone"
                      className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-all shrink-0"
                    >
                      {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>

                {/* Father Name */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                  <UserCheck size={18} className="text-neutral-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.fatherName || (isRtl ? "نام پدر" : "Father's Name")}
                    </p>
                    <p className="text-xs sm:text-sm text-white mt-0.5">{selectedStudent.father_name}</p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                  <Calendar size={18} className="text-neutral-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.dateOfBirth || (isRtl ? "تاریخ تولد" : "Date of Birth")}
                    </p>
                    <p className="text-xs sm:text-sm text-white font-mono mt-0.5">{selectedStudent.date_of_birth}</p>
                  </div>
                </div>

                {/* Country */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                  <MapPin size={18} className="text-neutral-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.countryOrigin || (isRtl ? "کشور سکونت" : "Country")}
                    </p>
                    <p className="text-xs sm:text-sm text-white mt-0.5">{selectedStudent.country}</p>
                  </div>
                </div>

                {/* Wallet Balance */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                  <CreditCard size={18} className="text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">
                      {t.teacherPages?.walletBalance || (isRtl ? "موجودی کیف پول SafiPay" : "Wallet Balance")}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-400 font-mono font-bold mt-0.5">
                      ${selectedStudent.wallet_balance}
                    </p>
                  </div>
                </div>

              </div>

              {/* Points Granting Terminal */}
              <div className="bg-amber-500/5 border border-amber-500/15 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Star size={14} className="fill-amber-400" />
                      <span>{t.teacherPages?.currentScore || (isRtl ? "اعطای امتیاز به شاگرد" : "Award Score Points")}</span>
                    </span>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      {isRtl
                        ? "افزایش امتیاز برای ارتقای رتبه لیدربورد و پاداش فعالیت‌های درسی شاگرد"
                        : "Elevate scholar rank on the academy leaderboard for active participation"}
                    </p>
                  </div>
                  <span className="text-2xl font-black text-amber-400 font-mono bg-amber-500/10 px-3.5 py-1 rounded-2xl border border-amber-500/20">
                    {selectedStudent.total_score} pts
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 25, 50].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => handleAwardPoints(selectedStudent, pts)}
                      disabled={isScoring}
                      className="py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/20 text-amber-400 text-xs font-black transition-all active:scale-95 disabled:opacity-50"
                    >
                      +{pts} pts
                    </button>
                  ))}
                </div>

                {/* Custom Points Form */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    placeholder={isRtl ? "امتیاز دلخواه..." : "Custom points amount..."}
                    value={scoreToAdd}
                    onChange={(e) => setScoreToAdd(e.target.value)}
                    className="w-full bg-black/60 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-300 text-xs font-mono focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => handleAwardPoints(selectedStudent, Number(scoreToAdd))}
                    disabled={isScoring || !scoreToAdd || Number(scoreToAdd) <= 0}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center shrink-0 shadow-lg"
                  >
                    {isScoring ? <Loader2 size={14} className="animate-spin text-black" /> : <Save size={14} />}
                  </button>
                </div>

                {scoreSuccessMsg && (
                  <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out]">
                    <CheckCircle2 size={13} /> {isRtl ? "امتیاز شاگرد با موفقیت در دیتابیس ثبت و بروزرسانی شد!" : "Score points awarded and updated in database successfully!"}
                  </p>
                )}
              </div>

              {/* Bio & Referral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">
                    {t.teacherPages?.studentBiography || (isRtl ? "درباره شاگرد / بیوگرافی" : "Biography & Background")}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                    {selectedStudent.bio}
                  </p>
                </div>

                <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">
                    {t.teacherPages?.referralCode || (isRtl ? "کد رفرال شاگرد" : "Referral Code")}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-black text-white font-mono bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/5 tracking-wider">
                      {selectedStudent.referral_code}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedStudent.referral_code);
                        setCopiedReferral(true);
                        setTimeout(() => setCopiedReferral(false), 2000);
                      }}
                      title="Copy Code"
                      className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-all"
                    >
                      {copiedReferral ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Enrolled Classes in Teacher's Courses */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-3">
                  {t.teacherPages?.enrolledInYourClasses || (isRtl ? "صنف‌های فعال شاگرد نزد شما" : "Enrolled in Your Classes")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.enrolled_classes.map((cls, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-xl text-xs font-black uppercase tracking-wider"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}