"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Star,
  Loader2,
  UserCheck,
  CalendarDays,
  FileText,
  Save,
  Settings2,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  UserCircle,
  UserPlus,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  Layers,
  ChevronDown
} from "lucide-react";

type EnrolledStudent = {
  record_id: string; // id in class_students
  student_id: string;
  joined_at: string;
  is_paid: boolean;
  is_trial: boolean;
  trial_ends_at: string | null;
  // Profile information
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
};

export default function ClassStudentsManagePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [className, setClassName] = useState("Loading Class...");
  const [parentCourseTitle, setParentCourseTitle] = useState<string | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "trial">("all");
  const [sortBy, setSortBy] = useState<"score" | "recent" | "name">("score");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Selected Student for Dossier Modal
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudent | null>(null);

  // Scoring states
  const [scoreToAdd, setScoreToAdd] = useState("");
  const [isScoring, setIsScoring] = useState(false);
  const [scoreSuccessMsg, setScoreSuccessMsg] = useState(false);

  // Status update states (paid/trial)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Attendance states
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isLoggingAttendance, setIsLoggingAttendance] = useState(false);
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    session_date: new Date().toISOString().split("T")[0],
    status: "Present",
    notes: "",
  });

  useEffect(() => {
    if (classId) {
      fetchClassData();
    }
  }, [classId]);

  const fetchClassData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Fetch class details + parent course
      const { data: classData } = await supabase
        .from("class_groups")
        .select(`
          class_name, 
          course_id,
          courses (title)
        `)
        .eq("id", classId)
        .single();

      if (classData) {
        setClassName(classData.class_name);
        const course = Array.isArray(classData.courses) ? classData.courses[0] : classData.courses;
        if (course?.title) setParentCourseTitle(course.title);
      }

      // 2. Fetch class_students
      const { data: studentsData, error: studentsError } = await supabase
        .from("class_students")
        .select("id, student_id, joined_at, is_paid, is_trial, trial_ends_at")
        .eq("class_group_id", classId)
        .order("joined_at", { ascending: false });

      if (studentsError) throw studentsError;

      if (studentsData && studentsData.length > 0) {
        const studentIds = studentsData.map((s) => s.student_id);

        // 3. Fetch profiles safely
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, father_name, date_of_birth, email, phone_number, country, avatar_url, total_score, wallet_balance, bio")
          .in("id", studentIds);

        if (profilesError) throw profilesError;

        // 4. Merge
        const formatted: EnrolledStudent[] = studentsData.map((item: any) => {
          const p = profilesData?.find((profile: any) => profile.id === item.student_id);

          return {
            record_id: item.id,
            student_id: item.student_id,
            joined_at: item.joined_at,
            is_paid: item.is_paid ?? false,
            is_trial: item.is_trial ?? false,
            trial_ends_at: item.trial_ends_at || null,
            first_name: p?.first_name || (isRtl ? "شاگرد" : "Scholar"),
            last_name: p?.last_name || "",
            father_name: p?.father_name || (isRtl ? "تعیین نشده" : "Not specified"),
            date_of_birth: p?.date_of_birth || (isRtl ? "تعیین نشده" : "Not specified"),
            email: p?.email || (isRtl ? "بدون ایمیل" : "No email"),
            phone_number: p?.phone_number || (isRtl ? "بدون شماره" : "No phone"),
            country: p?.country || (isRtl ? "تعیین نشده" : "Not specified"),
            avatar_url: p?.avatar_url || "",
            total_score: p?.total_score || 0,
            wallet_balance: p?.wallet_balance || 0,
            bio: p?.bio || (isRtl ? "بیوگرافی ثبت نشده است." : "No biography provided in profile."),
          };
        });

        setEnrolledStudents(formatted);
      } else {
        setEnrolledStudents([]);
      }
    } catch (error) {
      console.error("Error fetching class students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveStudent = async () => {
    if (!selectedStudent) return;
    const confirmMsg = isRtl
      ? `آیا از حذف ${selectedStudent.first_name} از این صنف اطمینان دارید؟`
      : `Are you sure you want to remove ${selectedStudent.first_name} from this cohort?`;

    if (!confirm(confirmMsg)) return;

    const supabase = createClient();
    try {
      const { error } = await supabase.from("class_students").delete().eq("id", selectedStudent.record_id);
      if (error) throw error;

      setEnrolledStudents((prev) => prev.filter((s) => s.record_id !== selectedStudent.record_id));
      setSelectedStudent(null);
    } catch (error: any) {
      alert("Failed to remove student: " + error.message);
    }
  };

  const handleAddScore = async (e?: React.FormEvent, directPoints?: number) => {
    if (e) e.preventDefault();
    const points = directPoints !== undefined ? directPoints : Number(scoreToAdd);
    if (!selectedStudent || isNaN(points) || points <= 0) return;

    setIsScoring(true);
    const supabase = createClient();
    const newTotalScore = selectedStudent.total_score + points;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ total_score: newTotalScore })
        .eq("id", selectedStudent.student_id);

      if (error) throw error;

      const updatedStudent = { ...selectedStudent, total_score: newTotalScore };
      setEnrolledStudents((prev) =>
        prev.map((s) => (s.student_id === selectedStudent.student_id ? updatedStudent : s))
      );
      setSelectedStudent(updatedStudent);

      setScoreToAdd("");
      setScoreSuccessMsg(true);
      setTimeout(() => setScoreSuccessMsg(false), 3000);
    } catch (error: any) {
      alert("Failed to update score: " + error.message);
    } finally {
      setIsScoring(false);
    }
  };

  const handleToggleMembership = async (field: "is_paid" | "is_trial") => {
    if (!selectedStudent) return;

    setIsUpdatingStatus(true);
    const supabase = createClient();
    const newValue = !selectedStudent[field];

    try {
      const { error } = await supabase
        .from("class_students")
        .update({ [field]: newValue })
        .eq("id", selectedStudent.record_id);

      if (error) throw error;

      const updated = { ...selectedStudent, [field]: newValue };
      setEnrolledStudents((prev) =>
        prev.map((s) => (s.record_id === selectedStudent.record_id ? updated : s))
      );
      setSelectedStudent(updated);
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleLogAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !attendanceForm.session_date) return;

    setIsLoggingAttendance(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("attendance_logs").upsert(
        {
          class_group_id: classId,
          student_id: selectedStudent.student_id,
          session_date: attendanceForm.session_date,
          status: attendanceForm.status,
          notes: attendanceForm.notes.trim() || null,
        },
        {
          onConflict: "class_group_id,student_id,session_date",
        }
      );

      if (error) throw error;

      setAttendanceSuccess(true);
      setTimeout(() => {
        setAttendanceSuccess(false);
        setIsAttendanceModalOpen(false);
        setAttendanceForm({
          session_date: new Date().toISOString().split("T")[0],
          status: "Present",
          notes: "",
        });
      }, 1500);
    } catch (error: any) {
      alert("Failed to log attendance: " + error.message);
    } finally {
      setIsLoggingAttendance(false);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = enrolledStudents.length;
    const paid = enrolledStudents.filter((s) => s.is_paid).length;
    const trial = enrolledStudents.filter((s) => s.is_trial).length;
    const totalScore = enrolledStudents.reduce((acc, s) => acc + s.total_score, 0);
    const avgScore = total > 0 ? (totalScore / total).toFixed(0) : "0";

    return { total, paid, trial, avgScore };
  }, [enrolledStudents]);

  // Filtered & Sorted
  const filteredStudents = useMemo(() => {
    let list = enrolledStudents.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        s.first_name.toLowerCase().includes(q) ||
        s.last_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone_number.includes(q) ||
        s.country.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "paid" && s.is_paid) ||
        (statusFilter === "trial" && s.is_trial);

      return matchesSearch && matchesStatus;
    });

    list.sort((a, b) => {
      if (sortBy === "score") return b.total_score - a.total_score;
      if (sortBy === "recent") return new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime();
      if (sortBy === "name") return a.first_name.localeCompare(b.first_name);
      return 0;
    });

    return list;
  }, [enrolledStudents, searchQuery, statusFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.teacherPages?.loadingAcademyRoster || (isRtl ? "در حال بارگذاری لیست شاگردان صنف..." : "Loading Academy Roster...")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="relative z-10">
            <Link
              href={`/${currentLocale}/teacher/courses`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={14} />
              <span>{isRtl ? "بازگشت به تقویم صنف‌ها" : "Back to Courses Hub"}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={12} />
                <span>{parentCourseTitle || (isRtl ? "صنف آکادمی" : "Academy Cohort")}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              {t.teacherPages?.classroomName || (isRtl ? "مدیریت شاگردان" : "Classroom")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                {t.teacherPages?.roster || (isRtl ? "و کارنامه صنف" : "Roster & Dossier")}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
              {isRtl ? "صنف هدف:" : "Managing enrolled scholars for:"}{" "}
              <strong className="text-white bg-white/5 px-2.5 py-1 rounded-md ml-1 border border-white/10 font-bold">
                {className}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              href={`/${currentLocale}/teacher/courses/${classId}/students/add`}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-[0_15px_35px_rgba(217,70,239,0.35)] flex items-center justify-center gap-2.5 active:scale-95"
            >
              <UserPlus size={18} />
              <span>{isRtl ? "ثبت‌نام شاگرد جدید" : "Enroll New Student"}</span>
            </Link>
          </div>
        </header>

        {/* ================= BENTO KPI STRIP ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
              {isRtl ? "مجموع شاگردان" : "Total Enrolled"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.total}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "دانشجو" : "Scholars"}</span>
            </div>
            <p className="text-[10px] text-fuchsia-400 font-medium mt-2">
              {isRtl ? "اعضای فعال این صنف" : "Active in this classroom"}
            </p>
          </div>

          <div className="bg-[#0a0a0f]/80 border border-emerald-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">
              {isRtl ? "شاگردان رسمی (پرداخت شده)" : "Paid Scholars"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.paid}</span>
              <span className="text-[10px] text-emerald-500/70 uppercase font-bold">{isRtl ? "شاگرد" : "Enrolled"}</span>
            </div>
            <p className="text-[10px] text-emerald-400/70 font-medium mt-2">
              {isRtl ? "شهریه تسویه شده" : "Full tuition completed"}
            </p>
          </div>

          <div className="bg-[#0a0a0f]/80 border border-amber-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
              {isRtl ? "دوره آزمایشی (Trial)" : "Trial Members"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-amber-400">{stats.trial}</span>
              <span className="text-[10px] text-amber-500/70 uppercase font-bold">{isRtl ? "شاگرد" : "Trial"}</span>
            </div>
            <p className="text-[10px] text-amber-400/70 font-medium mt-2">
              {isRtl ? "دوره دسترسی آزمایشی" : "Temporary trial window"}
            </p>
          </div>

          <div className="bg-[#0a0a0f]/80 border border-purple-500/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-purple-400 mb-2">
              {isRtl ? "میانگین امتیاز صنف" : "Avg Score Points"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-white">{stats.avgScore}</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold">{isRtl ? "امتیاز" : "pts"}</span>
            </div>
            <p className="text-[10px] text-purple-400/80 font-medium mt-2">
              {isRtl ? "شاخص انگیزه و پیشرفت" : "Performance index"}
            </p>
          </div>
        </div>

        {/* ================= CONTROLS & FILTER BAR ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-3xl p-4 sm:p-6 backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
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
                  (isRtl ? "جستجوی شاگرد با نام، ایمیل، شماره یا کشور..." : "Search by student name, email, phone, or country...")
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-2xl">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "all" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isRtl ? "همه" : "All"} ({stats.total})
                </button>
                <button
                  onClick={() => setStatusFilter("paid")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "paid"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-neutral-400 hover:text-emerald-400"
                  }`}
                >
                  {isRtl ? "پرداخت شده" : "Paid"} ({stats.paid})
                </button>
                <button
                  onClick={() => setStatusFilter("trial")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "trial"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "text-neutral-400 hover:text-amber-400"
                  }`}
                >
                  {isRtl ? "آزمایشی" : "Trial"} ({stats.trial})
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-black/60 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-fuchsia-500 appearance-none pr-8 cursor-pointer shadow-inner"
                >
                  <option value="score">{isRtl ? "بیشترین امتیاز" : "Highest Score"}</option>
                  <option value="recent">{isRtl ? "جدیدترین ثبت‌نام" : "Recently Joined"}</option>
                  <option value="name">{isRtl ? "الفبایی (A-Z)" : "Alphabetical"}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>

              {/* View Switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-2xl">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  title="Table View"
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "table" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= STUDENTS DISPLAY ================= */}
        {filteredStudents.length === 0 ? (
          <div className="py-24 sm:py-36 flex flex-col items-center justify-center bg-[#0a0a0f]/60 border border-dashed border-white/10 rounded-[3rem] backdrop-blur-md p-8 shadow-2xl text-center">
            <UserCircle size={64} className="text-neutral-700 mb-4" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {searchQuery || statusFilter !== "all"
                ? (isRtl ? "هیچ شاگردی با این معیار یافت نشد" : "No Scholars Match Criteria")
                : (t.teacherPages?.noStudentsFound || (isRtl ? "هیچ شاگردی ثبت‌نام نشده است" : "No Students Enrolled Yet"))}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mb-6">
              {searchQuery || statusFilter !== "all"
                ? (isRtl ? "عبارت جستجو یا فیلترهای انتخابی را بازبینی کنید." : "Try adjusting your search query or status filter.")
                : (t.teacherPages?.noStudentsEnrolledDesc || (isRtl ? "هنوز هیچ شاگردی به این صنف ملحق نشده است. روی افزودن شاگرد کلیک کنید." : "There are no students enrolled in this cohort yet. Click below to add scholars."))}
            </p>
            <Link
              href={`/${currentLocale}/teacher/courses/${classId}/students/add`}
              className="px-6 py-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-xs font-black text-white uppercase tracking-widest flex items-center gap-2"
            >
              <UserPlus size={16} />
              <span>{isRtl ? "افزودن شاگرد به صنف" : "Enroll Student"}</span>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          /* ================= GRID CARDS VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.record_id}
                className="bg-[#0a0a0f] border border-white/5 rounded-[2.2rem] p-6 flex flex-col items-center text-center group hover:border-fuchsia-500/40 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(217,70,239,0.15)] relative overflow-hidden hover:-translate-y-1.5"
              >
                {/* Score Badge */}
                <div className="absolute top-4 left-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1.5 shadow-inner">
                  <Star size={11} className="fill-amber-400" />
                  <span>{student.total_score}</span>
                </div>

                {/* Membership Status Badge */}
                <div className="absolute top-4 right-4">
                  {student.is_paid ? (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      <span>Paid</span>
                    </span>
                  ) : student.is_trial ? (
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Clock size={10} />
                      <span>Trial</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-black uppercase tracking-wider">
                      Enrolled
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.8rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl mb-4 mt-4 group-hover:scale-105 transition-transform duration-500 relative">
                  {student.avatar_url ? (
                    <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-fuchsia-400">{student.first_name.charAt(0)}</span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-white line-clamp-1 w-full group-hover:text-fuchsia-400 transition-colors">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono mt-1 mb-1 truncate w-full px-2">
                  {student.email}
                </p>
                <p className="text-[10px] text-neutral-500 flex items-center justify-center gap-1 mb-5">
                  <MapPin size={11} className="text-neutral-500" />
                  <span>{student.country || "Academy Global"}</span>
                </p>

                {/* Quick Action Buttons */}
                <div className="w-full space-y-2 mt-auto">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="w-full py-3.5 bg-white/5 hover:bg-fuchsia-500/10 border border-white/10 hover:border-fuchsia-500/30 text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-fuchsia-300 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
                  >
                    <Settings2 size={15} />
                    <span>{isRtl ? "مدیریت و کارنامه" : "Manage Profile"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= TABLE VIEW ================= */
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs min-w-[700px]" dir={isRtl ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-black uppercase text-[10px] tracking-widest">
                  <th className="py-4 px-4">{isRtl ? "شاگرد" : "Scholar"}</th>
                  <th className="py-4 px-4">{isRtl ? "ایمیل / شماره" : "Contact"}</th>
                  <th className="py-4 px-4">{isRtl ? "کشور" : "Country"}</th>
                  <th className="py-4 px-4">{isRtl ? "امتیاز کل" : "Score"}</th>
                  <th className="py-4 px-4">{isRtl ? "وضعیت عضویت" : "Status"}</th>
                  <th className="py-4 px-4 text-right">{isRtl ? "عملیات" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredStudents.map((student) => (
                  <tr key={student.record_id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-black text-fuchsia-400">{student.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                          {student.first_name} {student.last_name}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono">
                          {isRtl ? "پدر:" : "Father:"} {student.father_name}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-neutral-300">
                      <div>{student.email}</div>
                      <div className="text-[10px] text-neutral-500">{student.phone_number}</div>
                    </td>

                    <td className="py-4 px-4 text-neutral-300">{student.country}</td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-black border border-amber-500/20">
                        <Star size={11} className="fill-amber-400" />
                        {student.total_score}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {student.is_paid ? (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase">
                          Paid
                        </span>
                      ) : student.is_trial ? (
                        <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase">
                          Trial
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-black uppercase">
                          Enrolled
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 text-neutral-300 hover:text-fuchsia-300 text-xs font-bold transition-all"
                      >
                        {isRtl ? "مدیریت" : "Manage"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL 1: DETAILED STUDENT PROFILE DOSSIER ============= */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          <div
            className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md"
            onClick={() => !isAttendanceModalOpen && setSelectedStudent(null)}
          ></div>

          <div className="relative w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-32 bg-fuchsia-500/15 blur-[60px] pointer-events-none"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
                  {selectedStudent.avatar_url ? (
                    <img src={selectedStudent.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-fuchsia-400">{selectedStudent.first_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-wider text-neutral-400 border border-white/10">
                      ID: {selectedStudent.student_id.substring(0, 8)}
                    </span>
                    {selectedStudent.is_paid && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                        Paid Member
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    {isRtl ? "تاریخ عضویت در صنف:" : "Joined Cohort:"}{" "}
                    {new Date(selectedStudent.joined_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 relative z-10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 bg-[#050508] space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left 2 Cols: Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xs font-black text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">
                    {t.teacherPages?.studentInformation || (isRtl ? "مشخصات هویتی و ارتباطی شاگرد" : "Student Identity & Contact")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <Mail size={18} className="text-neutral-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.email || "Email"}
                        </p>
                        <p className="text-xs sm:text-sm text-white font-mono truncate">{selectedStudent.email}</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <Phone size={18} className="text-neutral-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.phone || "Phone"}
                        </p>
                        <p className="text-xs sm:text-sm text-white font-mono truncate">{selectedStudent.phone_number}</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <UserCheck size={18} className="text-neutral-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.fatherName || (isRtl ? "نام پدر" : "Father's Name")}
                        </p>
                        <p className="text-xs sm:text-sm text-white">{selectedStudent.father_name}</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <Calendar size={18} className="text-neutral-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.dateOfBirth || (isRtl ? "تاریخ تولد" : "Date of Birth")}
                        </p>
                        <p className="text-xs sm:text-sm text-white font-mono">{selectedStudent.date_of_birth}</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <MapPin size={18} className="text-neutral-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.country || (isRtl ? "کشور سکونت" : "Country")}
                        </p>
                        <p className="text-xs sm:text-sm text-white">{selectedStudent.country}</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
                      <CreditCard size={18} className="text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">
                          {t.teacherPages?.walletBalance || (isRtl ? "موجودی کیف پول SafiPay" : "Wallet Balance")}
                        </p>
                        <p className="text-xs sm:text-sm text-emerald-400 font-mono font-bold">
                          ${selectedStudent.wallet_balance}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">
                      {t.teacherPages?.biography || (isRtl ? "درباره شاگرد / بیوگرافی" : "Biography & Profile Bio")}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{selectedStudent.bio}</p>
                  </div>
                </div>

                {/* Right 1 Col: Operations & Controls */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">
                    {t.teacherPages?.cohortActions || (isRtl ? "عملیات و مدیریت شاگرد" : "Cohort Management")}
                  </h3>

                  {/* Score Terminal */}
                  <form onSubmit={handleAddScore} className="bg-amber-500/5 border border-amber-500/15 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Star size={14} className="fill-amber-400" />
                        <span>{t.teacherPages?.currentScore || (isRtl ? "امتیاز فعلی" : "Score Points")}</span>
                      </span>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        {selectedStudent.total_score}
                      </span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {[5, 10, 25, 50].map((pts) => (
                        <button
                          key={pts}
                          type="button"
                          onClick={() => handleAddScore(undefined, pts)}
                          disabled={isScoring}
                          className="py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/20 text-amber-400 text-xs font-black transition-all active:scale-95"
                        >
                          +{pts}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        placeholder={t.teacherPages?.addPointsPlaceholder || (isRtl ? "امتیاز دلخواه..." : "Custom points...")}
                        value={scoreToAdd}
                        onChange={(e) => setScoreToAdd(e.target.value)}
                        className="w-full bg-black/60 border border-amber-500/20 rounded-xl px-3 py-2.5 text-amber-300 text-xs font-mono focus:outline-none focus:border-amber-500 shadow-inner"
                      />
                      <button
                        type="submit"
                        disabled={isScoring || !scoreToAdd}
                        className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center shrink-0"
                      >
                        {isScoring ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      </button>
                    </div>

                    {scoreSuccessMsg && (
                      <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 animate-[fadeIn_0.2s_ease-out]">
                        <CheckCircle2 size={12} /> {isRtl ? "امتیاز با موفقیت افزوده شد!" : "Score points awarded!"}
                      </p>
                    )}
                  </form>

                  {/* Membership & Payment Toggles */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                      {isRtl ? "وضعیت اشتراک و شهریه:" : "Cohort Enrollment Flags:"}
                    </p>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
                      <div>
                        <p className="text-xs font-bold text-white">{isRtl ? "شهریه پرداخت شده" : "Tuition Paid"}</p>
                        <p className="text-[10px] text-neutral-500">{selectedStudent.is_paid ? "Active Full Access" : "Unpaid"}</p>
                      </div>
                      <button
                        type="button"
                        disabled={isUpdatingStatus}
                        onClick={() => handleToggleMembership("is_paid")}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                          selectedStudent.is_paid
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {selectedStudent.is_paid ? "Paid" : "Mark Paid"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
                      <div>
                        <p className="text-xs font-bold text-white">{isRtl ? "وضعیت دوره آزمایشی" : "Trial Mode"}</p>
                        <p className="text-[10px] text-neutral-500">{selectedStudent.is_trial ? "Active Trial Window" : "Standard"}</p>
                      </div>
                      <button
                        type="button"
                        disabled={isUpdatingStatus}
                        onClick={() => handleToggleMembership("is_trial")}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                          selectedStudent.is_trial
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {selectedStudent.is_trial ? "Trial On" : "Set Trial"}
                      </button>
                    </div>
                  </div>

                  {/* Attendance Shortcut */}
                  <button
                    onClick={() => setIsAttendanceModalOpen(true)}
                    className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <UserCheck size={16} />
                    <span>{t.teacherPages?.logAttendance || (isRtl ? "ثبت حضور و غیاب" : "Log Attendance")}</span>
                  </button>

                  {/* Remove Student */}
                  <button
                    onClick={handleRemoveStudent}
                    className="w-full py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    <span>{isRtl ? "حذف از این صنف" : "Remove from Cohort"}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ================= MODAL 2: LOG ATTENDANCE (Sub-Modal) =================== */}
      {/* ========================================================================= */}
      {isAttendanceModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
          <div
            className="absolute inset-0 bg-[#020202]/80 backdrop-blur-sm"
            onClick={() => setIsAttendanceModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#111116] to-[#07070a] border border-white/10 rounded-[2.5rem] shadow-2xl p-7 sm:p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500"></div>

            <div className="flex flex-col items-center text-center mb-6 mt-1">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                <UserCheck size={30} />
              </div>
              <h3 className="text-xl font-black text-white">
                {t.teacherPages?.logAttendance || (isRtl ? "ثبت حضور و غیاب جلسه" : "Log Attendance")}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-medium">
                {isRtl ? "شاگرد:" : "Scholar:"}{" "}
                <strong className="text-emerald-400">{selectedStudent.first_name} {selectedStudent.last_name}</strong>
              </p>
            </div>

            <form onSubmit={handleLogAttendance} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.sessionDate || (isRtl ? "تاریخ جلسه" : "Session Date")}
                </label>
                <div className="relative">
                  <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="date"
                    required
                    value={attendanceForm.session_date}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, session_date: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.common?.status || (isRtl ? "وضعیت حضور" : "Attendance Status")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "Present", labelFa: "حاضر", labelEn: "Present" },
                    { key: "Late", labelFa: "تأخیر", labelEn: "Late" },
                    { key: "Absent", labelFa: "غایب", labelEn: "Absent" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setAttendanceForm({ ...attendanceForm, status: item.key })}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        attendanceForm.status === item.key
                          ? item.key === "Present"
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-md"
                            : item.key === "Late"
                            ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-md"
                            : "bg-red-500/20 border-red-500/40 text-red-400 shadow-md"
                          : "bg-black/40 border-white/5 text-neutral-500 hover:border-white/10 hover:text-neutral-300"
                      }`}
                    >
                      {isRtl ? item.labelFa : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  {t.teacherPages?.notesOptional || (isRtl ? "یادداشت جلسه (اختیاری)" : "Session Notes (Optional)")}
                </label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-neutral-500" />
                  <textarea
                    rows={2}
                    placeholder={t.teacherPages?.addNotePlaceholder || (isRtl ? "مبحث تدریس شده یا توضیحات..." : "Session topic or note...")}
                    value={attendanceForm.notes}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, notes: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-xs focus:outline-none focus:border-emerald-500/50 resize-none custom-scrollbar shadow-inner"
                  />
                </div>
              </div>

              {attendanceSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{isRtl ? "حضور و غیاب ثبت گردید!" : "Attendance logged successfully!"}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-xl text-xs font-black uppercase tracking-wider transition-colors active:scale-95"
                >
                  {t.teacherPages?.cancel || (isRtl ? "انصراف" : "Cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isLoggingAttendance}
                  className="flex-[2] py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isLoggingAttendance ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{isLoggingAttendance ? (isRtl ? "در حال ثبت..." : "Saving...") : (isRtl ? "ثبت حضور" : "Save Log")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}