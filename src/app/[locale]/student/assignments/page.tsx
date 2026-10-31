"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import {
  CheckCircle2,
  ClipboardCheck,
  Video,
  MessageSquare,
  ExternalLink,
  Loader2,
  UploadCloud,
  CalendarDays,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  FileText,
  FileCheck,
  FileUp,
  Trophy,
  Search,
  RefreshCw,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Check,
  FolderOpen,
  Eye,
  AlertCircle,
  Layers,
  ArrowUpRight
} from "lucide-react";

type ClassGroupForAttendance = {
  id: string;
  class_name: string;
  course_title?: string;
  meeting_link: string | null;
  signal_group_link: string | null;
  class_time?: string | null;
  class_days?: string | null;
  schedule_info?: string | null;
  already_signed: boolean;
};

type AssignmentItem = {
  id: string;
  course_id?: string | null;
  class_group_id?: string | null;
  course_name: string;
  title: string;
  description: string;
  deadline: string | null;
  max_score: number;
  status: "pending" | "submitted" | "graded" | "overdue";
  submission_id?: string;
  file_url?: string;
  grade?: number | null;
  feedback?: string | null;
  submitted_at?: string | null;
  created_at?: string;
};

type ToastState = {
  type: "success" | "error" | "info";
  message: string;
} | null;

export default function StudentAssignmentsHubPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  // Loading & Data states
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [todayClasses, setTodayClasses] = useState<ClassGroupForAttendance[]>([]);

  // Filtering & Search
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded" | "overdue">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"deadline" | "newest" | "score">("deadline");

  // Interaction states
  const [signingId, setSigningId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({});
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);
  const [expandedDesc, setExpandedDesc] = useState<{ [key: string]: boolean }>({});
  const [replaceMode, setReplaceMode] = useState<{ [key: string]: boolean }>({});
  const [toast, setToast] = useState<ToastState>(null);

  // Hidden file input refs
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchAllData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    const supabase = createClient();
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session?.user) {
        return router.push(`/${currentLocale}/login`);
      }
      const userId = session.user.id;
      const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      // 1. دریافت لاگ‌های حاضری امروز دانش‌آموز
      const { data: myLogs, error: logsError } = await supabase
        .from("attendance_logs")
        .select("class_group_id, session_date")
        .eq("student_id", userId)
        .eq("session_date", todayDate);

      if (logsError) console.warn("Notice: Error fetching attendance logs", logsError);
      const signedClassIds = new Set((myLogs || []).map((log: any) => log.class_group_id));

      // 2. دریافت صنف‌های ثبت‌نام شده دانش‌آموز (class_students)
      const { data: classEnrollments, error: classErr } = await supabase
        .from("class_students")
        .select(`
          class_group_id,
          class_groups (
            id,
            class_name,
            meeting_link,
            signal_group_link,
            class_time,
            class_days,
            schedule_info,
            course_id,
            courses (
              id,
              title
            )
          )
        `)
        .eq("student_id", userId);

      if (classErr) console.warn("Notice: Error fetching class enrollments", classErr);

      // 3. دریافت دوره‌های ثبت‌نام شده (enrollments)
      const { data: courseEnrollments, error: courseErr } = await supabase
        .from("enrollments")
        .select(`
          course_id,
          courses (
            id,
            title
          )
        `)
        .eq("student_id", userId);

      if (courseErr) console.warn("Notice: Error fetching enrollments", courseErr);

      // جمع‌آوری صنف‌های امروز
      const formattedClasses: ClassGroupForAttendance[] = [];
      const classGroupIds: string[] = [];
      const courseIds: string[] = [];
      const courseNameMap = new Map<string, string>();

      (classEnrollments || []).forEach((item: any) => {
        const cg = Array.isArray(item.class_groups) ? item.class_groups[0] : item.class_groups;
        if (!cg) return;
        classGroupIds.push(cg.id);

        const crs = Array.isArray(cg.courses) ? cg.courses[0] : cg.courses;
        if (cg.course_id) {
          courseIds.push(cg.course_id);
          if (crs?.title) courseNameMap.set(cg.course_id, crs.title);
        }

        formattedClasses.push({
          id: cg.id,
          class_name: cg.class_name || (isRtl ? "صنف آکادمی" : "Academy Class"),
          course_title: crs?.title,
          meeting_link: cg.meeting_link || null,
          signal_group_link: cg.signal_group_link || null,
          class_time: cg.class_time,
          class_days: cg.class_days,
          schedule_info: cg.schedule_info,
          already_signed: signedClassIds.has(cg.id),
        });
      });

      (courseEnrollments || []).forEach((item: any) => {
        if (item.course_id) {
          courseIds.push(item.course_id);
          const crs = Array.isArray(item.courses) ? item.courses[0] : item.courses;
          if (crs?.title) courseNameMap.set(item.course_id, crs.title);
        }
      });

      setTodayClasses(formattedClasses);

      // 4. دریافت تکالیف متصل به کلاس‌ها و دوره‌های دانش‌آموز
      const distinctClassIds = Array.from(new Set(classGroupIds));
      const distinctCourseIds = Array.from(new Set(courseIds));

      let rawAssignments: any[] = [];

      if (distinctClassIds.length > 0 || distinctCourseIds.length > 0) {
        const queries = [];
        if (distinctClassIds.length > 0) {
          queries.push(
            supabase
              .from("assignments")
              .select("id, class_group_id, course_id, title, description, deadline, max_score, created_at")
              .in("class_group_id", distinctClassIds)
          );
        }
        if (distinctCourseIds.length > 0) {
          queries.push(
            supabase
              .from("assignments")
              .select("id, class_group_id, course_id, title, description, deadline, max_score, created_at")
              .in("course_id", distinctCourseIds)
          );
        }

        const responses = await Promise.all(queries);
        const merged = responses.flatMap((r) => r.data || []);
        
        // Deduplicate assignments by id
        const deduplicatedMap = new Map<string, any>();
        merged.forEach((a) => deduplicatedMap.set(a.id, a));
        rawAssignments = Array.from(deduplicatedMap.values());
      }

      // 5. دریافت تحویل‌های دانش‌آموز (assignment_submissions)
      const { data: mySubmissions, error: subsError } = await supabase
        .from("assignment_submissions")
        .select("id, assignment_id, student_id, file_url, grade, feedback, submitted_at")
        .eq("student_id", userId);

      if (subsError) console.warn("Notice: Error fetching submissions", subsError);

      const submissionsMap = new Map<string, any>();
      (mySubmissions || []).forEach((sub: any) => {
        submissionsMap.set(sub.assignment_id, sub);
      });

      // 6. ساخت ساختار استاندارد تکالیف
      const now = new Date();
      const formattedAssignments: AssignmentItem[] = rawAssignments.map((task: any) => {
        const sub = submissionsMap.get(task.id);
        const deadlineDate = task.deadline ? new Date(task.deadline) : null;
        
        let status: AssignmentItem["status"] = "pending";
        if (sub) {
          status = sub.grade !== null && sub.grade !== undefined ? "graded" : "submitted";
        } else if (deadlineDate && deadlineDate < now) {
          status = "overdue";
        }

        // تشخیص عنوان صنف یا دوره
        let courseLabel = isRtl ? "دوره تخصصی" : "Specialized Course";
        if (task.course_id && courseNameMap.has(task.course_id)) {
          courseLabel = courseNameMap.get(task.course_id)!;
        } else if (task.class_group_id) {
          const matchedClass = formattedClasses.find((c) => c.id === task.class_group_id);
          if (matchedClass) courseLabel = matchedClass.class_name;
        }

        return {
          id: task.id,
          course_id: task.course_id,
          class_group_id: task.class_group_id,
          course_name: courseLabel,
          title: task.title || (isRtl ? "تکلیف بدون عنوان" : "Untitled Assignment"),
          description: task.description || "",
          deadline: task.deadline,
          max_score: Number(task.max_score) || 100,
          status,
          submission_id: sub?.id,
          file_url: sub?.file_url,
          grade: sub?.grade !== null && sub?.grade !== undefined ? Number(sub.grade) : null,
          feedback: sub?.feedback,
          submitted_at: sub?.submitted_at,
          created_at: task.created_at,
        };
      });

      setAssignments(formattedAssignments);
    } catch (err: any) {
      console.error("Database connection error in student assignments:", err);
      showToast("error", isRtl ? "خطا در برقراری ارتباط با پایگاه داده." : "Failed to load academic data.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // ثبت حاضری هوشمند با upsert سازگار با پایگاه داده
  const handleSignAttendance = async (classGroupId: string) => {
    setSigningId(classGroupId);
    const supabase = createClient();

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) throw new Error("Session expired. Please log in again.");

      const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const { error } = await supabase.from("attendance_logs").upsert(
        {
          class_group_id: classGroupId,
          student_id: session.user.id,
          status: "present",
          session_date: todayDate,
          notes: "Checked in via Student Hub",
        },
        { onConflict: "class_group_id,student_id,session_date" }
      );

      if (error) throw error;

      // Optimistic update
      setTodayClasses((prev) =>
        prev.map((cls) => (cls.id === classGroupId ? { ...cls, already_signed: true } : cls))
      );

      showToast(
        "success",
        isRtl ? "حاضری شما در این جلسه با موفقیت ثبت شد!" : "Attendance recorded successfully!"
      );
    } catch (error: any) {
      console.error("Attendance error:", error);
      showToast("error", error.message || (isRtl ? "خطا در ثبت حاضری." : "Could not sign attendance."));
    } finally {
      setSigningId(null);
    }
  };

  // مدیریت انتخاب فایل
  const handleFileSelect = (assignmentId: string, file: File | null) => {
    if (!file) return;
    // محدودیت حجم ۵۰ مگابایت
    if (file.size > 50 * 1024 * 1024) {
      showToast(
        "error",
        isRtl ? "حجم فایل نمی‌تواند بیشتر از ۵۰ مگابایت باشد." : "File size cannot exceed 50MB."
      );
      return;
    }
    setSelectedFile((prev) => ({ ...prev, [assignmentId]: file }));
  };

  // تحویل و بارگذاری فایل به کلودفلیر R2 و ثبت در دیتابیس
  const handleSubmitAssignment = async (assignmentId: string, isReplacing = false) => {
    const file = selectedFile[assignmentId];
    if (!file) {
      showToast("error", isRtl ? "لطفاً ابتدا فایل پروژه را انتخاب کنید." : "Please select a file to submit.");
      return;
    }

    setUploadingId(assignmentId);
    const supabase = createClient();

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) throw new Error("Session expired.");
      const userId = session.user.id;

      // 1. آپلود به Cloudflare R2
      const uploadedUrl = await uploadFileToR2(file, "assignments");
      if (!uploadedUrl) throw new Error("Upload did not return a valid URL.");

      // 2. بررسی رکورد قبلی در دیتابیس
      const existingTask = assignments.find((a) => a.id === assignmentId);

      if (existingTask?.submission_id) {
        // به‌روزرسانی رکورد تحویل قبلی
        const { error: updateError } = await supabase
          .from("assignment_submissions")
          .update({
            file_url: uploadedUrl,
            submitted_at: new Date().toISOString(),
            grade: null, // ریست کردن جهت بازبینی دوباره توسط استاد
            feedback: null,
          })
          .eq("id", existingTask.submission_id);

        if (updateError) throw updateError;
      } else {
        // ایجاد رکورد تحویل جدید
        const { error: insertError } = await supabase.from("assignment_submissions").insert({
          assignment_id: assignmentId,
          student_id: userId,
          file_url: uploadedUrl,
          submitted_at: new Date().toISOString(),
        });

        if (insertError) throw insertError;
      }

      showToast(
        "success",
        isReplacing
          ? (isRtl ? "فایل تکلیف با موفقیت به‌روزرسانی و ارسال شد!" : "Submission replaced successfully!")
          : (isRtl ? "تکلیف با موفقیت به استاد تحویل داده شد!" : "Assignment submitted successfully!")
      );

      // ریست وضعیت فایل محلی
      setSelectedFile((prev) => ({ ...prev, [assignmentId]: null }));
      setReplaceMode((prev) => ({ ...prev, [assignmentId]: false }));

      // رفرش بی‌صدا داده‌ها
      await fetchAllData(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      showToast("error", error.message || (isRtl ? "خطا در ارسال تکلیف." : "Failed to submit assignment."));
    } finally {
      setUploadingId(null);
    }
  };

  // فیلتر و جستجوی لحظه‌ای تکالیف
  const filteredAssignments = useMemo(() => {
    return assignments
      .filter((task) => {
        // فیلتر وضعیت
        if (filter === "pending") return task.status === "pending";
        if (filter === "submitted") return task.status === "submitted";
        if (filter === "graded") return task.status === "graded";
        if (filter === "overdue") return task.status === "overdue";
        return true; // "all"
      })
      .filter((task) => {
        // فیلتر جستجو
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(q) ||
          task.course_name.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "deadline") {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortBy === "score") {
          return b.max_score - a.max_score;
        }
        // newest
        return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
      });
  }, [assignments, filter, searchQuery, sortBy]);

  // محاسبات آمار کلیدی داشبورد (KPIs)
  const stats = useMemo(() => {
    const total = assignments.length;
    const pending = assignments.filter((a) => a.status === "pending").length;
    const submitted = assignments.filter((a) => a.status === "submitted").length;
    const graded = assignments.filter((a) => a.status === "graded");
    const overdue = assignments.filter((a) => a.status === "overdue").length;

    let averageGrade = 0;
    if (graded.length > 0) {
      const sumPercentage = graded.reduce((acc, curr) => {
        const pct = curr.grade !== null && curr.max_score > 0 ? (curr.grade / curr.max_score) * 100 : 0;
        return acc + pct;
      }, 0);
      averageGrade = Math.round(sumPercentage / graded.length);
    }

    const attendedClasses = todayClasses.filter((c) => c.already_signed).length;

    return {
      total,
      pending,
      submitted,
      gradedCount: graded.length,
      overdue,
      averageGrade,
      todayTotalClasses: todayClasses.length,
      attendedClasses,
    };
  }, [assignments, todayClasses]);

  // محاسبه هوشمند شمارش معکوس مهلت
  const formatDeadlineCountdown = (deadlineStr: string | null) => {
    if (!deadlineStr) return null;
    const target = new Date(deadlineStr).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { label: isRtl ? "مهلت گذشته" : "Overdue", isPast: true, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;

    if (days > 0) {
      return {
        label: isRtl ? `${days} روز و ${remHours} ساعت باقی مانده` : `${days}d ${remHours}h remaining`,
        isPast: false,
        color: days <= 1 ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    }
    return {
      label: isRtl ? `${hours} ساعت باقی مانده (فوری)` : `${hours}h left (urgent)`,
      isPast: false,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20 animate-pulse",
    };
  };

  // فرمت حجم فایل
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // استایل نشانگر وضعیت
  const getStatusBadge = (status: AssignmentItem["status"]) => {
    switch (status) {
      case "overdue":
        return {
          label: isRtl ? "مهلت گذشته" : "Overdue",
          icon: AlertTriangle,
          cls: "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]",
        };
      case "submitted":
        return {
          label: isRtl ? "در حال بررسی استاد" : "In Review",
          icon: Clock,
          cls: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        };
      case "graded":
        return {
          label: isRtl ? "نمره‌دهی شده" : "Graded",
          icon: Trophy,
          cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
        };
      default:
        return {
          label: isRtl ? "در انتظار تحویل" : "To Do",
          icon: FileUp,
          cls: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        };
    }
  };

  return (
    <div
      className="w-full relative overflow-x-hidden overflow-y-auto bg-[#020205] text-white font-sans pb-28 lg:pb-16 min-h-screen custom-scrollbar"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ================= AMBIENT NEON GLOWS ================= */}
      <div
        className="fixed top-[-12%] left-[-10%] w-[55vw] h-[55vw] bg-pink-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "9s" }}
      />
      <div
        className="fixed top-[30%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "11s" }}
      />
      <div
        className="fixed bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-emerald-500/[0.03] rounded-full blur-[130px] pointer-events-none z-0"
      />

      {/* ================= FLOATING TOAST NOTIFICATION ================= */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeInDown_0.3s_ease-out] w-full max-w-md px-4 pointer-events-none">
          <div
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
              toast.type === "success"
                ? "bg-emerald-950/85 border-emerald-500/30 text-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                : toast.type === "error"
                ? "bg-rose-950/85 border-rose-500/30 text-rose-200 shadow-[0_10px_30px_rgba(244,63,94,0.3)]"
                : "bg-[#0d0d18]/90 border-white/10 text-neutral-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            ) : toast.type === "error" ? (
              <AlertCircle size={20} className="text-rose-400 shrink-0" />
            ) : (
              <Sparkles size={20} className="text-amber-400 shrink-0" />
            )}
            <p className="text-xs sm:text-sm font-bold flex-1">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="text-white/40 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10 pt-6 sm:pt-8">
        
        {/* ================= HERO COCKPIT HEADER ================= */}
        <header className="relative bg-gradient-to-b from-[#0a0a14]/90 to-[#06060c]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-110" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-bold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles size={13} className="text-amber-400" />
                <span>{isRtl ? "پرتال یکپارچه دانش‌آموزی • مدیریت تکالیف و حاضری" : "Student Command Hub • Assignments & Attendance"}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t.assignments.title || (isRtl ? "میز کار تکالیف و کلاس‌های زنده" : "Student Hub")}
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                {t.assignments.subtitle ||
                  (isRtl
                    ? "تکالیف دوره‌ها را به سادگی تحویل دهید، بازخورد نمرات استاد را بررسی کنید و در جلسات آنلاین امروز حضور به عمل آورید."
                    : "Sign today's attendance, submit your homework, and track your academic performance smoothly.")}
              </p>
            </div>

            {/* Quick Actions / Sync */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchAllData(true)}
                disabled={isRefreshing || isLoading}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                title={isRtl ? "به‌روزرسانی داده‌ها" : "Refresh Data"}
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin text-pink-400" : "text-neutral-400"} />
                <span>{isRefreshing ? (isRtl ? "در حال دریافت..." : "Syncing...") : (isRtl ? "همگام‌سازی داده‌ها" : "Sync Data")}</span>
              </button>

              <Link
                href={`/${currentLocale}/student`}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <span>{isRtl ? "داشبورد اصلی" : "Dashboard"}</span>
                <ArrowUpRight size={14} className="text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* ================= TOP BENTO KPI PODS ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
            {/* Pod 1: Total Tasks */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-white/10 transition-all group/pod">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "کل تکالیف" : "Total Tasks"}</span>
                <Layers size={16} className="text-neutral-500 group-hover/pod:text-white transition-colors" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">{stats.total}</span>
                <span className="text-[10px] text-neutral-500 font-semibold">{isRtl ? "پروژه ثبت‌شده" : "Assigned"}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-pink-500 to-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${stats.total > 0 ? ((stats.gradedCount + stats.submitted) / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Pod 2: Pending To-Do */}
            <div className="bg-amber-500/[0.02] border border-amber-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "در انتظار تحویل" : "To Do"}</span>
                <Clock size={16} className="text-amber-400/80 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pending}</span>
                {stats.overdue > 0 && (
                  <span className="text-[10px] text-rose-400 font-bold">
                    (+{stats.overdue} {isRtl ? "مهلت گذشته" : "overdue"})
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
                {stats.pending > 0
                  ? isRtl
                    ? "نیاز به ارسال پروژه توسط شما"
                    : "Action required before deadline"
                  : isRtl
                  ? "همه تکالیف تحویل شده‌اند"
                  : "All assignments up to date"}
              </p>
            </div>

            {/* Pod 3: Graded & GPA */}
            <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "نمرات و میانگین" : "Graded GPA"}</span>
                <Trophy size={16} className="text-emerald-400 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {stats.averageGrade > 0 ? `${stats.averageGrade}%` : "—"}
                </span>
                <span className="text-[10px] text-neutral-400 font-semibold">
                  ({stats.gradedCount} {isRtl ? "نمره‌داده‌شده" : "evaluated"})
                </span>
              </div>
              <p className="text-[10px] text-emerald-400/80 truncate mt-3 font-medium">
                {stats.gradedCount > 0
                  ? isRtl
                    ? "معدل تکالیف تاییدشده استاد"
                    : "Average homework performance"
                  : isRtl
                  ? "در انتظار نمره‌دهی اولین تکلیف"
                  : "Awaiting first evaluation"}
              </p>
            </div>

            {/* Pod 4: Live Check-in Today */}
            <div className="bg-purple-500/[0.02] border border-purple-500/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-purple-500/25 transition-all group/pod">
              <div className="flex items-center justify-between text-purple-400 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isRtl ? "صنف‌های امروز" : "Today's Check-in"}</span>
                <ClipboardCheck size={16} className="text-purple-400 group-hover/pod:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {stats.attendedClasses} <span className="text-neutral-500 text-lg">/ {stats.todayTotalClasses}</span>
                </span>
                <span className="text-[10px] text-purple-300 font-semibold">{isRtl ? "حاضر شده" : "Signed"}</span>
              </div>
              <p className="text-[10px] text-neutral-500 truncate mt-3 font-medium">
                {stats.todayTotalClasses > 0
                  ? stats.attendedClasses === stats.todayTotalClasses
                    ? isRtl
                      ? "تمامی حاضری‌های امروز ثبت شدند ✓"
                      : "All sessions checked in ✓"
                    : isRtl
                    ? "جلساتی برای ثبت حضور باقی مانده"
                    : "Pending session check-in"
                  : isRtl
                  ? "امروز کلاسی برنامه‌ریزی نشده"
                  : "No live sessions today"}
              </p>
            </div>
          </div>
        </header>

        {/* ================= 1. TODAY'S LIVE CLASSES & ATTENDANCE STUDIO ================= */}
        <section className="relative w-full bg-[#080811]/90 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-2xl shadow-xl overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/10" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {t.assignments.todaysCheckin || (isRtl ? "صنف‌های آنلاین امروز و ثبت حاضری" : "Today's Live Classes")}
                </h2>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {t.assignments.liveRoster || (isRtl ? "لینک جلسات زنده، گروه سیگنال و امضای دیجیتال حضور در کلاس" : "Live Class Roster & Self Check-in")}
                </p>
              </div>
            </div>

            {todayClasses.length > 0 && (
              <span className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-bold text-neutral-400 self-start sm:self-auto flex items-center gap-1.5">
                <CalendarDays size={13} className="text-emerald-400" />
                {new Date().toLocaleDateString(isRtl ? "fa-IR" : "en-US", { weekday: "long", month: "short", day: "numeric" })}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{isRtl ? "در حال دریافت وضعیت صنف‌ها..." : "Loading live roster..."}</p>
            </div>
          ) : todayClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 relative z-10">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-5 hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all shadow-sm group/card"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen size={16} className="text-neutral-500 shrink-0" />
                        <h3 className="text-white font-extrabold text-sm sm:text-base truncate group-hover/card:text-emerald-400 transition-colors">
                          {cls.class_name}
                        </h3>
                      </div>
                      {cls.course_title && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-white/5 text-[10px] font-bold text-neutral-400 shrink-0 border border-white/5">
                          {cls.course_title}
                        </span>
                      )}
                    </div>

                    {(cls.class_time || cls.schedule_info) && (
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                        <Clock size={12} className="text-amber-400/80" />
                        <span>{cls.class_time || cls.schedule_info}</span>
                      </div>
                    )}

                    {/* Quick Access Channels: Teams / Google Meet & Signal VIP */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {cls.meeting_link ? (
                        <a
                          href={cls.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold text-rose-300 rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                        >
                          <Video size={13} className="text-rose-400" />
                          <span>{t.assignments.teams || (isRtl ? "ورود به جلسه زنده" : "Join Class Meeting")}</span>
                          <ExternalLink size={11} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="px-3 py-1.5 bg-white/5 text-[10px] font-bold text-neutral-500 rounded-xl flex items-center gap-1.5">
                          <Video size={12} className="opacity-50" />
                          <span>{t.assignments.teamsLocked || (isRtl ? "لینک جلسه ثبت نشده" : "Meeting Link Pending")}</span>
                        </span>
                      )}

                      {cls.signal_group_link ? (
                        <a
                          href={cls.signal_group_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-bold text-indigo-300 rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                        >
                          <MessageSquare size={13} className="text-indigo-400" />
                          <span>{t.assignments.signal || (isRtl ? "گروه سیگنال کلاسی" : "Signal VIP Group")}</span>
                          <ExternalLink size={11} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="px-3 py-1.5 bg-white/5 text-[10px] font-bold text-neutral-500 rounded-xl flex items-center gap-1.5">
                          <MessageSquare size={12} className="opacity-50" />
                          <span>{t.assignments.signalSyncing || (isRtl ? "کانال سیگنال اختصاصی" : "Signal Synchronizing")}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Attendance Check-in Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    {cls.already_signed ? (
                      <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>{t.assignments.attended || (isRtl ? "حاضری امروز ثبت شده است ✓" : "Attended Today ✓")}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSignAttendance(cls.id)}
                        disabled={signingId === cls.id}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {signingId === cls.id ? (
                          <>
                            <Loader2 size={15} className="animate-spin text-black" />
                            <span>{t.assignments.processing || (isRtl ? "در حال ثبت حاضری..." : "Signing...")}</span>
                          </>
                        ) : (
                          <>
                            <ClipboardCheck size={16} />
                            <span>{t.assignments.signAttendance || (isRtl ? "ثبت حضور در کلاس امروز" : "Sign Attendance")}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 bg-white/[0.015] rounded-2xl border border-dashed border-white/10 relative z-10 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-500 mb-1">
                <CalendarDays size={22} />
              </div>
              <h4 className="text-neutral-300 text-sm font-extrabold">
                {t.liveClasses?.noScheduled || (isRtl ? "امروز هیچ صنف برنامه‌ریزی‌شده‌ای ندارید" : "No Live Classes Scheduled Today")}
              </h4>
              <p className="text-neutral-500 text-xs max-w-md">
                {t.assignments.takeBreak || (isRtl ? "از این زمان برای تکمیل پروژه‌ها و ارسال تکالیف دوره‌ها استفاده کنید." : "Take a rest or review your pending coursework.")}
              </p>
            </div>
          )}
        </section>

        {/* ================= 2. ACADEMIC TASKS & ASSIGNMENTS SECTION ================= */}
        <section className="space-y-6">
          
          {/* Section Bar: Title & Search & Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-pink-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t.assignments.courseAssignments || (isRtl ? "تکالیف و پروژه‌های کلاسی" : "Course Assignments")}
                </h2>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {t.assignments.academicTasks || (isRtl ? "ارسال فایل‌ها، رهگیری بازخورد و نمرات اعطا شده توسط استاد" : "Submit solutions, track reviews, and earn master points")}
                </p>
              </div>
            </div>

            {/* Filter Tabs & Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              
              {/* Search Box */}
              <div className="relative flex-1 sm:w-60">
                <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? "جستجو در تکالیف..." : "Search assignments..."}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute top-1/2 -translate-y-1/2 right-2.5 text-neutral-500 hover:text-white p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Status Tabs */}
              <div className="flex items-center bg-[#080812] p-1 rounded-xl border border-white/5 overflow-x-auto shadow-inner no-scrollbar">
                {(
                  [
                    { id: "all", label: isRtl ? "همه" : "All", count: stats.total },
                    { id: "pending", label: isRtl ? "در انتظار اقدام" : "To Do", count: stats.pending },
                    { id: "submitted", label: isRtl ? "در حال بررسی" : "In Review", count: stats.submitted },
                    { id: "graded", label: isRtl ? "نمره‌دهی شده" : "Graded", count: stats.gradedCount },
                    { id: "overdue", label: isRtl ? "مهلت گذشته" : "Overdue", count: stats.overdue },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      filter === tab.id
                        ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        filter === tab.id ? "bg-black/30 text-white" : "bg-white/5 text-neutral-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= ASSIGNMENTS GRID ================= */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {filteredAssignments.map((task) => {
                const statusMeta = getStatusBadge(task.status);
                const countdown = formatDeadlineCountdown(task.deadline);
                const isOverdue = task.status === "overdue";
                const isPending = task.status === "pending";
                const isSubmitted = task.status === "submitted";
                const isGraded = task.status === "graded";
                const isReplacing = replaceMode[task.id];
                const currentSelectedFile = selectedFile[task.id];
                const isExpanded = expandedDesc[task.id];
                const StatusIcon = statusMeta.icon;

                return (
                  <div
                    key={task.id}
                    className="relative group bg-[#090913]/90 border border-white/5 rounded-[2rem] p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300 hover:border-white/15 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-6"
                  >
                    {/* Top Badges Bar */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        
                        {/* Course Name Badge */}
                        <span className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] font-bold text-neutral-300 flex items-center gap-1.5 truncate max-w-[65%]">
                          <BookOpen size={12} className="text-amber-400 shrink-0" />
                          <span className="truncate">{task.course_name}</span>
                        </span>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          {task.max_score > 0 && (
                            <span className="px-2.5 py-1 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-extrabold text-neutral-400">
                              {task.max_score} {isRtl ? "نمره" : "pts"}
                            </span>
                          )}
                          <span
                            className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${statusMeta.cls}`}
                          >
                            <StatusIcon size={12} />
                            <span>{statusMeta.label}</span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 leading-snug group-hover:text-pink-400 transition-colors">
                          {task.title}
                        </h3>

                        {task.description && (
                          <div className="relative">
                            <p
                              className={`text-neutral-400 text-xs sm:text-sm leading-relaxed ${
                                !isExpanded ? "line-clamp-3" : ""
                              } whitespace-pre-line`}
                            >
                              {task.description}
                            </p>
                            {task.description.length > 180 && (
                              <button
                                onClick={() =>
                                  setExpandedDesc((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                                }
                                className="text-pink-400 hover:text-pink-300 text-[11px] font-bold mt-1 inline-flex items-center gap-0.5"
                              >
                                {isExpanded
                                  ? isRtl
                                    ? "نمایش کمتر"
                                    : "Show less"
                                  : isRtl
                                  ? "مشاهده متن کامل"
                                  : "Read full instructions"}
                                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Deadline & Meta Information */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                        {task.deadline && (
                          <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                            <CalendarDays size={13} className="text-neutral-500" />
                            <span>
                              {isRtl ? "مهلت:" : "Due:"}{" "}
                              {new Date(task.deadline).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}

                        {countdown && (
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${countdown.color}`}>
                            {countdown.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ================= ACTION / SUBMISSION / EVALUATION AREA ================= */}
                    <div className="pt-4 border-t border-white/5 bg-[#06060c]/60 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-6 sm:p-7 rounded-b-[2rem] space-y-4">
                      
                      {/* CASE 1: PENDING OR OVERDUE (OR IN REPLACE MODE) -> FILE UPLOADER */}
                      {(isPending || isOverdue || isReplacing) && (
                        <div className="space-y-3.5">
                          {/* Drag & Drop File Upload Box */}
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragActiveId(task.id);
                            }}
                            onDragLeave={() => setDragActiveId(null)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragActiveId(null);
                              const file = e.dataTransfer.files?.[0] || null;
                              handleFileSelect(task.id, file);
                            }}
                            onClick={() => fileInputRefs.current[task.id]?.click()}
                            className={`group/drop relative p-4 sm:p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 ${
                              dragActiveId === task.id
                                ? "border-pink-500 bg-pink-500/10 scale-[1.01]"
                                : currentSelectedFile
                                ? "border-emerald-500/40 bg-emerald-500/[0.03]"
                                : "border-white/10 hover:border-pink-500/40 hover:bg-white/[0.02]"
                            }`}
                          >
                            <input
                              type="file"
                              ref={(el) => {
                                fileInputRefs.current[task.id] = el;
                              }}
                              className="hidden"
                              onChange={(e) => handleFileSelect(task.id, e.target.files?.[0] || null)}
                            />

                            {currentSelectedFile ? (
                              <div className="flex items-center justify-between w-full gap-3">
                                <div className="flex items-center gap-3 overflow-hidden text-left rtl:text-right">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                    <FileCheck size={20} />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-white text-xs font-bold truncate">
                                      {currentSelectedFile.name}
                                    </p>
                                    <p className="text-[10px] text-neutral-400">
                                      {formatFileSize(currentSelectedFile.size)} • {isRtl ? "آماده ارسال" : "Ready to submit"}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFileSelect(task.id, null);
                                    if (fileInputRefs.current[task.id]) {
                                      fileInputRefs.current[task.id]!.value = "";
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                                  title={isRtl ? "حذف فایل انتخابی" : "Remove selected file"}
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover/drop:text-pink-400 group-hover/drop:border-pink-500/30 transition-all">
                                  <FileUp size={18} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-neutral-300 group-hover/drop:text-pink-400 transition-colors">
                                    {isRtl ? "انتخاب یا کشیدن فایل پروژه (PDF, ZIP, DOCX, Code)" : "Choose or drag project files (PDF, ZIP, Code)"}
                                  </p>
                                  <p className="text-[10px] text-neutral-500 mt-0.5">
                                    {isRtl ? "حداکثر حجم مجاز: ۵۰ مگابایت" : "Maximum upload size: 50MB"}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Submit Actions Button */}
                          <div className="flex items-center gap-2">
                            {isReplacing && (
                              <button
                                type="button"
                                onClick={() => {
                                  setReplaceMode((prev) => ({ ...prev, [task.id]: false }));
                                  setSelectedFile((prev) => ({ ...prev, [task.id]: null }));
                                }}
                                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-xl text-xs font-bold transition-colors"
                              >
                                {isRtl ? "انصراف" : "Cancel"}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleSubmitAssignment(task.id, isReplacing)}
                              disabled={!currentSelectedFile || uploadingId === task.id}
                              className="flex-1 py-3 px-5 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-[0_0_20px_rgba(225,29,72,0.3)] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                              {uploadingId === task.id ? (
                                <>
                                  <Loader2 size={16} className="animate-spin text-white" />
                                  <span>{t.assignments.uploading || (isRtl ? "در حال آپلود و ارسال..." : "Uploading...")}</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud size={16} />
                                  <span>
                                    {isReplacing
                                      ? isRtl
                                        ? "به‌روزرسانی و ارسال فایل جدید"
                                        : "Replace & Re-submit"
                                      : t.assignments.submitHomework || (isRtl ? "ارسال نهایی تکلیف به استاد" : "Submit Homework")}
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* CASE 2: SUBMITTED (UNDER REVIEW BY TEACHER) */}
                      {isSubmitted && !isReplacing && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-500/[0.05] border border-blue-500/20">
                            <div className="flex items-center gap-2.5">
                              <Clock size={18} className="text-blue-400 animate-pulse shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-blue-300">
                                  {t.assignments.underReview || (isRtl ? "تکلیف شما در صف بررسی استاد قرار دارد" : "Submitted • Under Teacher Review")}
                                </p>
                                {task.submitted_at && (
                                  <p className="text-[10px] text-neutral-400 mt-0.5">
                                    {isRtl ? "ارسال شده در:" : "Submitted on:"}{" "}
                                    {new Date(task.submitted_at).toLocaleDateString(isRtl ? "fa-IR" : "en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {task.file_url && (
                              <a
                                href={task.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors"
                              >
                                <Eye size={13} className="text-blue-400" />
                                <span>{isRtl ? "مشاهده فایل تحویل‌داده‌شده" : "View Submitted File"}</span>
                                <ExternalLink size={11} className="opacity-60" />
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={() => setReplaceMode((prev) => ({ ...prev, [task.id]: true }))}
                              className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
                            >
                              <FileUp size={13} className="text-neutral-400" />
                              <span>{isRtl ? "ویرایش و جایگزینی فایل" : "Update / Replace File"}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* CASE 3: GRADED (EVALUATED BY TEACHER) */}
                      {isGraded && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 shadow-inner">
                            
                            {/* Score & Trophy Pod */}
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <Trophy size={28} />
                              </div>
                              <div>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-3xl font-black text-emerald-400">
                                    {task.grade}
                                  </span>
                                  <span className="text-xs text-neutral-400 font-bold">
                                    / {task.max_score} {isRtl ? "نمره" : "pts"}
                                  </span>
                                </div>
                                <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-wider">
                                  {task.grade !== null && task.max_score > 0 && Math.round((task.grade / task.max_score) * 100) >= 90
                                    ? isRtl
                                      ? "عملکرد عالی (Mastery)"
                                      : "Excellent Performance"
                                    : isRtl
                                    ? "تکلیف تاییدشده"
                                    : "Passed Assignment"}
                                </span>
                              </div>
                            </div>

                            {/* View Uploaded Work Link */}
                            {task.file_url && (
                              <a
                                href={task.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto"
                              >
                                <Eye size={13} />
                                <span>{isRtl ? "مشاهده پروژه ارسالی" : "View Work"}</span>
                                <ExternalLink size={11} className="opacity-70" />
                              </a>
                            )}
                          </div>

                          {/* Teacher's Feedback Box */}
                          {task.feedback ? (
                            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400/80">
                                <MessageSquare size={12} />
                                <span>{t.assignments.feedback || (isRtl ? "یادداشت و بازخورد استاد:" : "Teacher Feedback:")}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                                &ldquo;{task.feedback}&rdquo;
                              </p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-neutral-500 italic">
                              {isRtl ? "نمره توسط استاد بدون یادداشت اختصاصی ثبت شده است." : "Graded without written remarks."}
                            </p>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-[#080812]/80 p-10 sm:p-16 rounded-[2.5rem] border border-white/5 text-center shadow-xl flex flex-col items-center justify-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-2">
                <CheckCircle size={32} className="text-neutral-500" />
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide">
                {t.assignments.allCaughtUp || (isRtl ? "تکلیفی در این دسته‌بندی یافت نشد" : "All Caught Up!")}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
                {filter === "all"
                  ? isRtl
                    ? "در حال حاضر هیچ تکلیفی برای کلاس‌ها و دوره‌های ثبت‌نامی شما تعریف نشده است."
                    : "No assignments have been assigned to your classrooms yet."
                  : isRtl
                  ? `هیچ تکلیفی با وضعیت «${filter}» وجود ندارد.`
                  : `No assignments currently found in the "${filter}" category.`}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-200 transition-colors"
                >
                  {isRtl ? "مشاهده همه تکالیف" : "View All Assignments"}
                </button>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}