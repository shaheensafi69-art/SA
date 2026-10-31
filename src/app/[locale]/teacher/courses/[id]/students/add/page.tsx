"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  UserPlus,
  Loader2,
  ShieldAlert,
  Globe,
  CheckCircle2,
  CheckCircle,
  Users,
  Star,
  MapPin,
  Mail,
  Phone,
  Layers,
  Sparkles,
  SlidersHorizontal,
  UserCheck
} from "lucide-react";

type GlobalStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  avatar_url: string;
  total_score: number;
};

export default function AddStudentToClassPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const classId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [className, setClassName] = useState("Loading...");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [parentCourseTitle, setParentCourseTitle] = useState<string | null>(null);

  const [allStudents, setAllStudents] = useState<GlobalStudent[]>([]);
  const [enrolledStudentIds, setEnrolledStudentIds] = useState<Set<string>>(new Set());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "available" | "enrolled">("all");
  const [isAddingId, setIsAddingId] = useState<string | null>(null);

  // Success Toast notification
  const [successToast, setSuccessToast] = useState<{
    show: boolean;
    name: string;
    avatarUrl?: string;
  }>({ show: false, name: "" });

  useEffect(() => {
    if (classId) fetchPageData();
  }, [classId]);

  const fetchPageData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Fetch class name, course_id, and parent course title
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
        setCourseId(classData.course_id);
        const course = Array.isArray(classData.courses) ? classData.courses[0] : classData.courses;
        if (course?.title) setParentCourseTitle(course.title);
      }

      // 2. Fetch all student profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, phone_number, country, avatar_url, total_score")
        .eq("role", "student")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      if (profilesData) {
        const formatted: GlobalStudent[] = profilesData.map((p: any) => ({
          id: p.id,
          first_name: p.first_name || (isRtl ? "شاگرد" : "Scholar"),
          last_name: p.last_name || "",
          email: p.email || "",
          phone_number: p.phone_number || "",
          country: p.country || (isRtl ? "تعیین نشده" : "Not specified"),
          avatar_url: p.avatar_url || "",
          total_score: p.total_score || 0,
        }));
        setAllStudents(formatted);
      }

      // 3. Fetch currently enrolled student IDs in this cohort
      const { data: enrolledData } = await supabase
        .from("class_students")
        .select("student_id")
        .eq("class_group_id", classId);

      if (enrolledData) {
        const ids = new Set(enrolledData.map((item) => item.student_id));
        setEnrolledStudentIds(ids);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (student: GlobalStudent) => {
    if (!courseId) {
      alert("Error: Associated Course ID is missing.");
      return;
    }

    setIsAddingId(student.id);
    const supabase = createClient();

    try {
      // Step 1: Ensure enrolled at course level
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", courseId)
        .eq("student_id", student.id)
        .maybeSingle();

      if (!existingEnrollment) {
        const { error: enrollError } = await supabase.from("enrollments").insert({
          course_id: courseId,
          student_id: student.id,
          progress_percentage: 0,
        });
        if (enrollError) throw enrollError;
      }

      // Step 2: Add student to class_students
      const { error: classError } = await supabase.from("class_students").insert({
        class_group_id: classId,
        student_id: student.id,
        is_paid: true,
        is_trial: false,
      });

      if (classError) throw classError;

      // Optimistic update
      setEnrolledStudentIds((prev) => new Set(prev).add(student.id));

      // Show toast
      setSuccessToast({
        show: true,
        name: `${student.first_name} ${student.last_name}`,
        avatarUrl: student.avatar_url,
      });

      setTimeout(() => {
        setSuccessToast({ show: false, name: "" });
      }, 4000);
    } catch (error: any) {
      alert("Error adding student: " + error.message);
    } finally {
      setIsAddingId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = allStudents.length;
    const enrolled = enrolledStudentIds.size;
    const available = Math.max(0, total - enrolled);
    return { total, enrolled, available };
  }, [allStudents, enrolledStudentIds]);

  // Filtered
  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        s.first_name.toLowerCase().includes(q) ||
        s.last_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone_number.includes(q) ||
        s.country.toLowerCase().includes(q);

      const isEnrolled = enrolledStudentIds.has(s.id);
      const matchesFilter =
        filterType === "all" ||
        (filterType === "available" && !isEnrolled) ||
        (filterType === "enrolled" && isEnrolled);

      return matchesSearch && matchesFilter;
    });
  }, [allStudents, searchQuery, filterType, enrolledStudentIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.teacherPages?.loadingAcademyRoster || (isRtl ? "در حال بارگذاری راهنمای شاگردان..." : "Loading Academy Directory...")}
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

      {/* ================= FLOATING LUXURY TOAST NOTIFICATION ================= */}
      <div
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 max-w-md w-full px-4 ${
          successToast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0f]/95 border border-emerald-500/40 backdrop-blur-2xl px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-emerald-400 font-black text-sm">
              {t.teacherPages?.successfullyEnrolled || (isRtl ? "ثبت‌نام با موفقیت انجام شد!" : "Successfully Enrolled!")}
            </p>
            <p className="text-xs text-neutral-300 font-medium truncate mt-0.5">
              <strong className="text-white">{successToast.name}</strong>{" "}
              {isRtl ? "به این صنف اضافه شد." : "has been added to the cohort."}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-end gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div>
            <Link
              href={`/${currentLocale}/teacher/courses/${classId}/students`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={14} />
              <span>{isRtl ? "بازگشت به کارنامه صنف" : "Back to Cohort Roster"}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={12} />
                <span>{parentCourseTitle || "Academy Course"}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              <Globe className="text-fuchsia-400" size={32} />
              <span>
                {t.teacherPages?.studentDirectory || (isRtl ? "ثبت‌نام شاگردان" : "Directory")}
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                {t.teacherPages?.roster || (isRtl ? "در صنف" : "Enrollment")}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
              {isRtl ? "افزودن شاگردان جدید به صنف:" : "Assign new scholars to:"}{" "}
              <strong className="text-white bg-white/5 px-2.5 py-1 rounded-md ml-1 border border-white/10 font-bold">
                {className}
              </strong>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-black/60 p-2 rounded-2xl border border-white/10 shrink-0">
            <div className="px-3 py-1.5 text-center">
              <p className="text-[9px] font-black uppercase text-neutral-500 tracking-wider">
                {isRtl ? "موجود برای ثبت‌نام" : "Available"}
              </p>
              <p className="text-base font-black text-fuchsia-400">{stats.available}</p>
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="px-3 py-1.5 text-center">
              <p className="text-[9px] font-black uppercase text-neutral-500 tracking-wider">
                {isRtl ? "ثبت‌شده قبلی" : "In Cohort"}
              </p>
              <p className="text-base font-black text-emerald-400">{stats.enrolled}</p>
            </div>
          </div>
        </header>

        {/* ================= SEARCH & FILTER BAR ================= */}
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
                  (isRtl ? "جستجوی شاگرد با نام، ایمیل، شماره یا کشور..." : "Search students by name, email, phone, or country...")
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-2xl shrink-0 overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  filterType === "all" ? "bg-white/10 text-white shadow-inner" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isRtl ? "همه شاگردان" : "All Scholars"} ({stats.total})
              </button>
              <button
                onClick={() => setFilterType("available")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  filterType === "available"
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30"
                    : "text-neutral-400 hover:text-fuchsia-400"
                }`}
              >
                {isRtl ? "آماده ثبت‌نام" : "Not In Cohort"} ({stats.available})
              </button>
              <button
                onClick={() => setFilterType("enrolled")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  filterType === "enrolled"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-neutral-400 hover:text-emerald-400"
                }`}
              >
                {isRtl ? "قبلاً ثبت شده" : "Already Enrolled"} ({stats.enrolled})
              </button>
            </div>

          </div>
        </div>

        {/* ================= STUDENT DIRECTORY LIST ================= */}
        <div className="bg-[#0a0a0f]/60 border border-white/5 rounded-[2.5rem] p-4 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[50vh]">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center p-6">
              <ShieldAlert size={64} className="text-neutral-700 mb-4" />
              <h3 className="text-xl font-black text-white mb-2">
                {t.teacherPages?.noStudentsFound || (isRtl ? "شاگردی یافت نشد" : "No Scholars Found")}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-sm">
                {t.teacherPages?.noStudentsMatchingCriteria ||
                  (isRtl
                    ? "هیچ شاگردی با معیارهای جستجو یا فیلترهای انتخابی شما مطابقت ندارد."
                    : "No scholars matched your current search criteria.")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map((student) => {
                const isAlreadyEnrolled = enrolledStudentIds.has(student.id);

                return (
                  <div
                    key={student.id}
                    className={`border rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all duration-300 ${
                      isAlreadyEnrolled
                        ? "bg-black/40 border-white/5 opacity-60"
                        : "bg-[#0a0a0f] border-white/10 hover:border-fuchsia-500/40 hover:bg-white/[0.02] shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-fuchsia-400">{student.first_name.charAt(0)}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-black text-white text-base truncate">
                            {student.first_name} {student.last_name}
                          </p>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-black text-[10px] border border-amber-500/20 shrink-0">
                            <Star size={10} className="fill-amber-400" />
                            {student.total_score}
                          </span>
                        </div>

                        <p className="text-[11px] text-neutral-400 font-mono truncate flex items-center gap-1.5">
                          <Mail size={12} className="text-neutral-500 shrink-0" />
                          <span>{student.email || "No email"}</span>
                        </p>

                        <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-1">
                          {student.phone_number && (
                            <span className="flex items-center gap-1 font-mono">
                              <Phone size={10} /> {student.phone_number}
                            </span>
                          )}
                          {student.country && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {student.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex justify-end sm:w-auto w-full pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
                      {isAlreadyEnrolled ? (
                        <div className="w-full sm:w-auto px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
                          <CheckCircle2 size={16} />
                          <span>{isRtl ? "عضو صنف است" : "Already in Cohort"}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddStudent(student)}
                          disabled={isAddingId === student.id}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_5px_20px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                          {isAddingId === student.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <UserPlus size={16} />
                          )}
                          <span>
                            {isAddingId === student.id
                              ? (isRtl ? "در حال ثبت..." : "Enrolling...")
                              : (isRtl ? "افزودن به صنف" : "Add to Class")}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}