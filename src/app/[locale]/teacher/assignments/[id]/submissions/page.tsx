"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ClipboardCheck,
  Calendar,
  Star,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  MessageSquare,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  Download,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  RefreshCw,
  LayoutGrid,
  List,
  Eye,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  Check,
  Award
} from "lucide-react";

interface SubmissionData {
  submission_id: string;
  student_id: string;
  file_url: string | null;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  // Student Profile
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  is_late: boolean;
}

interface AssignmentInfo {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  max_score: number;
  class_group_id: string | null;
  created_at: string;
}

export default function AssignmentSubmissionsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [assignment, setAssignment] = useState<AssignmentInfo | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "graded" | "late">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest_grade" | "lowest_grade" | "name">("newest");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Evaluation Modal
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (assignmentId) {
      fetchSubmissionsData();
    }
  }, [assignmentId]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchSubmissionsData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // 1. Fetch assignment details
      const { data: assignData, error: assignError } = await supabase
        .from("assignments")
        .select("id, title, description, deadline, max_score, class_group_id, created_at")
        .eq("id", assignmentId)
        .single();

      if (assignError) throw assignError;
      setAssignment(assignData);

      // 2. Fetch submissions for this assignment
      const { data: subData, error: subError } = await supabase
        .from("assignment_submissions")
        .select("id, student_id, file_url, grade, feedback, submitted_at")
        .eq("assignment_id", assignmentId)
        .order("submitted_at", { ascending: false });

      if (subError) throw subError;

      if (subData && subData.length > 0) {
        const studentIds = Array.from(new Set(subData.map(s => s.student_id)));

        // 3. Fetch student profiles
        const { data: profilesData, error: profError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .in("id", studentIds);

        if (profError) throw profError;

        const deadlineDate = assignData.deadline ? new Date(assignData.deadline).getTime() : null;

        // 4. Format and correlate submissions
        const formatted: SubmissionData[] = subData.map((sub: any) => {
          const profile = profilesData?.find((p: any) => p.id === sub.student_id);
          const submittedTime = new Date(sub.submitted_at).getTime();
          const isLate = deadlineDate ? submittedTime > deadlineDate : false;

          return {
            submission_id: sub.id,
            student_id: sub.student_id,
            file_url: sub.file_url,
            grade: sub.grade !== null && sub.grade !== undefined ? Number(sub.grade) : null,
            feedback: sub.feedback,
            submitted_at: sub.submitted_at,
            first_name: profile?.first_name || "Enrolled",
            last_name: profile?.last_name || "Student",
            email: profile?.email || "No email",
            avatar_url: profile?.avatar_url || "",
            is_late: isLate,
          };
        });

        setSubmissions(formatted);
      } else {
        setSubmissions([]);
      }
    } catch (error: any) {
      console.error("Error loading submissions:", error);
      showToast("error", "Failed to retrieve student submissions: " + error.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = submissions.length;
    const graded = submissions.filter(s => s.grade !== null);
    const gradedCount = graded.length;
    const pendingCount = total - gradedCount;
    const lateCount = submissions.filter(s => s.is_late).length;

    let averageScore: number | null = null;
    let averagePercentage: number | null = null;

    if (gradedCount > 0 && assignment?.max_score) {
      const sum = graded.reduce((acc, curr) => acc + (curr.grade || 0), 0);
      averageScore = Math.round((sum / gradedCount) * 10) / 10;
      averagePercentage = Math.round((averageScore / assignment.max_score) * 100);
    }

    const completionRate = total > 0 ? Math.round((gradedCount / total) * 100) : 0;

    return {
      total,
      gradedCount,
      pendingCount,
      lateCount,
      averageScore,
      averagePercentage,
      completionRate,
    };
  }, [submissions, assignment]);

  // Filtered & Sorted Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((sub) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${sub.first_name} ${sub.last_name}`.toLowerCase();
        const email = sub.email.toLowerCase();
        const matchesSearch = !query || fullName.includes(query) || email.includes(query);

        // Status filter
        let matchesStatus = true;
        if (statusFilter === "pending") matchesStatus = sub.grade === null;
        else if (statusFilter === "graded") matchesStatus = sub.grade !== null;
        else if (statusFilter === "late") matchesStatus = sub.is_late;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        }
        if (sortBy === "highest_grade") {
          return (b.grade ?? -1) - (a.grade ?? -1);
        }
        if (sortBy === "lowest_grade") {
          return (a.grade ?? 999999) - (b.grade ?? 999999);
        }
        if (sortBy === "name") {
          return a.first_name.localeCompare(b.first_name);
        }
        return 0;
      });
  }, [submissions, searchQuery, statusFilter, sortBy]);

  // Modal open & close
  const openGradeModal = (indexInFiltered: number) => {
    const sub = filteredSubmissions[indexInFiltered];
    if (!sub) return;
    setSelectedStudentIndex(indexInFiltered);
    setGradeInput(sub.grade !== null && sub.grade !== undefined ? sub.grade.toString() : "");
    setFeedbackInput(sub.feedback || "");
  };

  const closeGradeModal = () => {
    setSelectedStudentIndex(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  // Next / Previous Student inside Modal
  const currentModalSubmission = selectedStudentIndex !== null ? filteredSubmissions[selectedStudentIndex] : null;

  const navigateStudent = (direction: "prev" | "next") => {
    if (selectedStudentIndex === null) return;
    const nextIdx = direction === "next" ? selectedStudentIndex + 1 : selectedStudentIndex - 1;
    if (nextIdx >= 0 && nextIdx < filteredSubmissions.length) {
      openGradeModal(nextIdx);
    }
  };

  // Grade Percentage Preset helper
  const setScorePercentage = (pct: number) => {
    if (!assignment) return;
    const calculated = Math.round((assignment.max_score * pct) / 100);
    setGradeInput(calculated.toString());
  };

  // Feedback snippet helper
  const addFeedbackSnippet = (snippet: string) => {
    setFeedbackInput((prev) => (prev ? `${prev}\n${snippet}` : snippet));
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentModalSubmission || !assignment) return;

    const score = Number(gradeInput);
    if (isNaN(score) || score < 0 || score > assignment.max_score) {
      showToast("error", `Invalid score! Must be between 0 and ${assignment.max_score} points.`);
      return;
    }

    setIsSubmittingGrade(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("assignment_submissions")
        .update({
          grade: score,
          feedback: feedbackInput.trim() || null,
        })
        .eq("id", currentModalSubmission.submission_id);

      if (error) throw error;

      // Update state locally
      setSubmissions(prev =>
        prev.map(item =>
          item.submission_id === currentModalSubmission.submission_id
            ? { ...item, grade: score, feedback: feedbackInput.trim() || null }
            : item
        )
      );

      showToast("success", `Evaluation recorded for ${currentModalSubmission.first_name} ${currentModalSubmission.last_name}`);

      // Auto-advance to next student if available!
      if (selectedStudentIndex !== null && selectedStudentIndex + 1 < filteredSubmissions.length) {
        openGradeModal(selectedStudentIndex + 1);
      } else {
        closeGradeModal();
      }
    } catch (error: any) {
      showToast("error", "Failed to update grade: " + error.message);
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  // Export to CSV helper
  const handleExportCSV = () => {
    if (submissions.length === 0 || !assignment) {
      showToast("error", "No submission data available to export.");
      return;
    }

    const headers = ["Student Name", "Email", "Submitted Date", "Is Late", "Grade", "Max Score", "Percentage", "Feedback", "File URL"];
    const rows = submissions.map(s => [
      `"${s.first_name} ${s.last_name}"`,
      `"${s.email}"`,
      `"${new Date(s.submitted_at).toLocaleString()}"`,
      s.is_late ? "YES" : "NO",
      s.grade !== null ? s.grade : "Unscored",
      assignment.max_score,
      s.grade !== null ? `${Math.round((s.grade / assignment.max_score) * 100)}%` : "N/A",
      `"${(s.feedback || "").replace(/"/g, '""')}"`,
      `"${s.file_url || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Grades_${assignment.title.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("success", "Gradebook CSV exported successfully!");
  };

  // File Icon Detector
  const getFileIcon = (url: string | null) => {
    if (!url) return FileText;
    const lower = url.toLowerCase();
    if (lower.endsWith(".zip") || lower.endsWith(".rar") || lower.endsWith(".tar") || lower.endsWith(".7z")) return FileArchive;
    if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp") || lower.endsWith(".svg")) return ImageIcon;
    if (lower.endsWith(".js") || lower.endsWith(".ts") || lower.endsWith(".py") || lower.endsWith(".html") || lower.endsWith(".css") || lower.includes("github.com")) return FileCode;
    return FileText;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          Loading Submission Terminal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 text-xs font-black uppercase tracking-wider animate-[fadeInDown_0.2s_ease-out] ${
          toastMessage.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {toastMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= HEADER & ASSIGNMENT DETAILS ================= */}
        <header className="bg-[#0a0a10]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            
            {/* Title & Back link */}
            <div className="space-y-3">
              <Link
                href={`/${currentLocale}/teacher/assignments`}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 active:scale-95"
              >
                <ArrowLeft size={13} className={isRtl ? "rotate-180" : ""} /> Return to Assignments
              </Link>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                    Evaluation Console
                  </span>
                  {assignment?.deadline && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                      new Date(assignment.deadline).getTime() < Date.now()
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    }`}>
                      {new Date(assignment.deadline).getTime() < Date.now() ? "Deadline Expired" : "Deadline Active"}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {assignment?.title}
                </h1>
                {assignment?.description && (
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-3xl line-clamp-2">
                    {assignment.description}
                  </p>
                )}
              </div>
            </div>

            {/* Score & Deadline Badges */}
            <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 shrink-0">
              <div className="px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <Star size={15} className="fill-amber-400" /> Max Score: {assignment?.max_score} Pts
              </div>
              <div className="px-4 py-2.5 bg-white/5 border border-white/5 text-neutral-300 rounded-xl text-xs font-mono flex items-center gap-2">
                <Calendar size={15} className="text-fuchsia-400" />
                {assignment?.deadline ? new Date(assignment.deadline).toLocaleString() : "No Deadline"}
              </div>
            </div>

          </div>

        </header>

        {/* ================= BENTO KPI METRICS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Total Submissions */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/20 shrink-0">
              <ClipboardCheck size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Submitted</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.total}</h3>
            </div>
          </div>

          {/* Graded Submissions with Progress */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Evaluated</p>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{stats.completionRate}%</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.gradedCount} / {stats.total}</h3>
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Needs Review</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.pendingCount}</h3>
            </div>
          </div>

          {/* Class Average Score */}
          <div className="bg-[#0a0a10]/60 border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Class Average</p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5 font-mono">
                {stats.averageScore !== null ? `${stats.averageScore} pts` : "N/A"}
                {stats.averagePercentage !== null && (
                  <span className="text-xs text-neutral-500 font-normal ml-1.5">({stats.averagePercentage}%)</span>
                )}
              </h3>
            </div>
          </div>

        </div>

        {/* ================= CONTROLS & SEARCH TOOLBAR ================= */}
        <div className="bg-[#0a0a10]/80 border border-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search student by name or email address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-fuchsia-500/60 shadow-inner transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            
            {/* Status Selector */}
            <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "all" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "pending" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Pending ({stats.pendingCount})
              </button>
              <button
                onClick={() => setStatusFilter("graded")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === "graded" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Graded ({stats.gradedCount})
              </button>
              {stats.lateCount > 0 && (
                <button
                  onClick={() => setStatusFilter("late")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === "late" ? "bg-fuchsia-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Late ({stats.lateCount})
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-black/60 border border-white/10 text-neutral-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner shrink-0 cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="highest_grade">Sort: Highest Grade</option>
              <option value="lowest_grade">Sort: Lowest Grade</option>
              <option value="name">Sort: Student Name</option>
            </select>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-black/60 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "table" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="Table View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="Grid Card View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white text-xs font-bold transition-all shrink-0 active:scale-95"
              title="Export Gradebook CSV"
            >
              <Download size={16} />
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => fetchSubmissionsData(true)}
              disabled={isRefreshing}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white text-xs font-bold transition-all shrink-0 active:scale-95 disabled:opacity-50"
              title="Refresh Submissions"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin text-fuchsia-400" : ""} />
            </button>

          </div>

        </div>

        {/* ================= SUBMISSIONS LIST ================= */}
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-24 bg-[#0a0a10]/40 border border-dashed border-white/10 rounded-[2.5rem] backdrop-blur-md shadow-2xl p-6">
            <ShieldAlert size={56} className="text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No Submissions Found</h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              {searchQuery || statusFilter !== "all"
                ? "No submittals matched your search query or filter criteria. Try clearing filters."
                : "No students have submitted solutions for this academic task yet. Check back soon."}
            </p>
          </div>
        ) : viewMode === "table" ? (
          
          /* ================= TABLE VIEW ================= */
          <div className="bg-[#0a0a10]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse whitespace-nowrap min-w-[750px]">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    <th className="p-6">Student Roster</th>
                    <th className="p-6">Submitted At</th>
                    <th className="p-6">Deliverable File</th>
                    <th className="p-6 text-center">Review Status</th>
                    <th className="p-6 text-center">Score Awarded</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSubmissions.map((sub, idx) => {
                    const isGraded = sub.grade !== null;
                    const FileIcon = getFileIcon(sub.file_url);

                    return (
                      <tr key={sub.submission_id} className="hover:bg-white/[0.02] transition-colors group">
                        
                        {/* Student Profile Info */}
                        <td className="p-5 sm:p-6">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                              {sub.avatar_url ? (
                                <img src={sub.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-base font-black text-fuchsia-400">{sub.first_name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm group-hover:text-fuchsia-300 transition-colors">
                                {sub.first_name} {sub.last_name}
                              </p>
                              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{sub.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Submission Timestamp with Late Badge */}
                        <td className="p-5 sm:p-6">
                          <div className="space-y-1">
                            <p className="font-mono text-xs text-neutral-300">
                              {new Date(sub.submitted_at).toLocaleDateString()} {new Date(sub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {sub.is_late && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 inline-block font-mono">
                                Late Submission
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Deliverable File URL */}
                        <td className="p-5 sm:p-6">
                          {sub.file_url ? (
                            <a
                              href={sub.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 hover:border-fuchsia-500/30 text-neutral-300 hover:text-fuchsia-300 text-xs font-semibold transition-all shadow-sm"
                            >
                              <FileIcon size={14} className="text-fuchsia-400" />
                              <span className="truncate max-w-[140px]">View Attachment</span>
                              <ExternalLink size={12} className="opacity-60" />
                            </a>
                          ) : (
                            <span className="text-neutral-600 text-xs font-mono">No Attachment</span>
                          )}
                        </td>

                        {/* Status Tag */}
                        <td className="p-5 sm:p-6 text-center">
                          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1.5 ${
                            isGraded
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.15)] animate-pulse"
                          }`}>
                            {isGraded ? <Check size={11} /> : <Clock size={11} />}
                            {isGraded ? "Graded" : "Needs Review"}
                          </span>
                        </td>

                        {/* Score Awarded */}
                        <td className="p-5 sm:p-6 text-center">
                          {isGraded ? (
                            <div className="space-y-1">
                              <span className="text-amber-400 font-mono font-black text-base">
                                {sub.grade} <span className="text-neutral-600 text-xs font-normal">/ {assignment?.max_score}</span>
                              </span>
                              {assignment && (
                                <div className="w-16 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                                    style={{ width: `${Math.min(100, Math.round(((sub.grade || 0) / assignment.max_score) * 100))}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-neutral-600 font-mono text-sm">-</span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-5 sm:p-6 text-right">
                          <button
                            onClick={() => openGradeModal(idx)}
                            className="px-4 py-2.5 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 hover:from-fuchsia-600 hover:to-purple-600 border border-fuchsia-500/20 hover:border-transparent text-xs font-black uppercase tracking-widest text-neutral-200 hover:text-white rounded-xl transition-all active:scale-95 shadow-md ml-auto"
                          >
                            {isGraded ? "Edit Grade" : "Evaluate Task"}
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (

          /* ================= GRID CARDS VIEW ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((sub, idx) => {
              const isGraded = sub.grade !== null;
              const FileIcon = getFileIcon(sub.file_url);

              return (
                <div
                  key={sub.submission_id}
                  className="bg-[#0a0a10]/90 border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-fuchsia-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group space-y-5"
                >
                  
                  {/* Top: Student avatar & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {sub.avatar_url ? (
                          <img src={sub.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-black text-fuchsia-400">{sub.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-fuchsia-300 transition-colors">
                          {sub.first_name} {sub.last_name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-mono truncate max-w-[160px]">{sub.email}</p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border shrink-0 ${
                      isGraded
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 animate-pulse"
                    }`}>
                      {isGraded ? "Graded" : "Needs Review"}
                    </span>
                  </div>

                  {/* Submission metadata */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-mono">Submitted:</span>
                      <span className="text-neutral-300 font-mono text-[11px]">
                        {new Date(sub.submitted_at).toLocaleDateString()}
                      </span>
                    </div>

                    {sub.is_late && (
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold flex items-center gap-1.5">
                        <AlertCircle size={12} /> Late Submission (after deadline)
                      </div>
                    )}

                    {/* File Attachment */}
                    {sub.file_url ? (
                      <a
                        href={sub.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-fuchsia-500/10 border border-white/5 text-neutral-300 hover:text-white text-xs transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <FileIcon size={14} className="text-fuchsia-400" />
                          <span className="truncate max-w-[180px]">Attachment File</span>
                        </span>
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-neutral-600 text-xs font-mono text-center">
                        No Attachment Attached
                      </div>
                    )}

                    {/* Feedback snippet if available */}
                    {sub.feedback && (
                      <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <MessageSquare size={10} /> Feedback Given
                        </p>
                        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                          {sub.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Score & Evaluation Button */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">Score</p>
                      {isGraded ? (
                        <p className="text-amber-400 font-mono font-black text-lg">
                          {sub.grade} <span className="text-neutral-600 text-xs font-normal">/ {assignment?.max_score}</span>
                        </p>
                      ) : (
                        <p className="text-neutral-600 font-mono text-sm font-bold">Unscored</p>
                      )}
                    </div>

                    <button
                      onClick={() => openGradeModal(idx)}
                      className="px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      {isGraded ? "Edit Grade" : "Evaluate"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: WORLD-CLASS GRADING CONSOLE ==================== */}
      {/* ========================================================================= */}
      {currentModalSubmission && assignment && selectedStudentIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
          
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeGradeModal}></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-[#0a0a10] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] z-10">
            
            {/* Header: Student Info + Quick Next/Prev Navigator */}
            <div className="p-6 sm:p-7 border-b border-white/5 bg-white/[0.02] shrink-0 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                  {currentModalSubmission.avatar_url ? (
                    <img src={currentModalSubmission.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-black text-fuchsia-400">{currentModalSubmission.first_name.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-white truncate">
                      {currentModalSubmission.first_name} {currentModalSubmission.last_name}
                    </h2>
                    {currentModalSubmission.is_late && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 font-mono shrink-0">
                        Late
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                    Submitted: {new Date(currentModalSubmission.submitted_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Navigator + Close */}
              <div className="flex items-center gap-2 shrink-0">
                
                {/* Index Pill */}
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-400">
                  {selectedStudentIndex + 1} / {filteredSubmissions.length}
                </span>

                {/* Prev Student */}
                <button
                  type="button"
                  disabled={selectedStudentIndex <= 0}
                  onClick={() => navigateStudent("prev")}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors border border-white/5"
                  title="Previous Student"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Next Student */}
                <button
                  type="button"
                  disabled={selectedStudentIndex >= filteredSubmissions.length - 1}
                  onClick={() => navigateStudent("next")}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors border border-white/5"
                  title="Next Student"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Close Modal */}
                <button
                  type="button"
                  onClick={closeGradeModal}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5 ml-1"
                >
                  <X size={16} />
                </button>

              </div>

            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveGrade} className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6">
              
              {/* Deliverable File Attachment Preview */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">
                  Student's Submitted Solution File
                </label>
                {currentModalSubmission.file_url ? (
                  <div className="p-4 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/20 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate max-w-sm">
                          {currentModalSubmission.file_url}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Direct Cloud Storage Attachment</p>
                      </div>
                    </div>
                    <a
                      href={currentModalSubmission.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 shrink-0"
                    >
                      <ExternalLink size={14} /> Open Attachment
                    </a>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 text-neutral-500 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={15} /> No downloadable file was provided with this submission.
                  </div>
                )}
              </div>

              {/* Scoring Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                    Award Grade / Points *
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Max: {assignment.max_score} Pts
                  </span>
                </div>

                <div className="relative">
                  <Star size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-500/20" />
                  <input
                    required
                    type="number"
                    min="0"
                    max={assignment.max_score}
                    placeholder="e.g. 95"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-24 py-4 text-amber-400 text-xl font-mono font-black focus:outline-none focus:border-amber-500/60 shadow-inner"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500 uppercase">
                    / {assignment.max_score}
                  </span>
                </div>

                {/* Score Percentage Presets */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] text-neutral-500 font-mono">Quick Set:</span>
                  {[100, 95, 90, 85, 80, 75, 60, 0].map((pct) => {
                    const exact = Math.round((assignment.max_score * pct) / 100);
                    const isSelected = gradeInput === exact.toString();
                    return (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setScorePercentage(pct)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                          isSelected
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                            : "bg-white/5 text-neutral-400 border-white/5 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {pct}% ({exact})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-neutral-300 uppercase tracking-widest block">
                    Instructor Feedback & Notes (Optional)
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">Visible to student</span>
                </div>

                <div className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-neutral-500" />
                  <textarea
                    rows={4}
                    placeholder="Provide constructive feedback, praise exceptional insights, or highlight areas for revision..."
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-xs sm:text-sm focus:outline-none focus:border-fuchsia-500/60 resize-none shadow-inner custom-scrollbar leading-relaxed"
                  />
                </div>

                {/* Quick Feedback Snippet Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-neutral-500 font-mono">Snippets:</span>
                  <button
                    type="button"
                    onClick={() => addFeedbackSnippet("Excellent work! Thorough analysis and clean execution.")}
                    className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    + Excellent Work
                  </button>
                  <button
                    type="button"
                    onClick={() => addFeedbackSnippet("Good effort! Pay close attention to requirements.")}
                    className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    + Good Effort
                  </button>
                  <button
                    type="button"
                    onClick={() => addFeedbackSnippet("Incomplete deliverable. Please revise and resubmit.")}
                    className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    + Incomplete
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={closeGradeModal}
                  className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingGrade}
                  className="w-full sm:flex-1 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-2.5 active:scale-95"
                >
                  {isSubmittingGrade ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{isSubmittingGrade ? "Saving Evaluation..." : "Save Evaluation & Advance"}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}