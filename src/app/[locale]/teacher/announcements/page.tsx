"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { createClient } from "@/utils/supabase/client";
import {
  Megaphone,
  BellRing,
  CalendarDays,
  Clock,
  Info,
  Search,
  X,
  Plus,
  Send,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Users,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Share2,
  Radio,
  FileText
} from "lucide-react";

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  target_role: string;
  created_by: string | null;
  created_at: string;
  language?: string;
}

export default function TeacherAnnouncementsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Filters & Search
  const [activeFilter, setActiveFilter] = useState<"all" | "teacher" | "student" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // UI state
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Create announcement modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    message: "",
    target_role: "student" as "student" | "all"
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    const supabase = createClient();

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      setCurrentUserId(session.user.id);

      // 1. Fetch user role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const userRole = profile?.role || "teacher";

      // 2. Fetch announcements
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Filter: Show "all", "teacher" (or user's role), and announcements created by this teacher
      const visible = (data || []).filter(a =>
        a.target_role === "all" ||
        a.target_role === userRole ||
        a.target_role === "teacher" ||
        a.created_by === session.user.id
      );

      setAnnouncements(visible);
    } catch (err: any) {
      console.error("Error fetching announcements:", err);
      showToast("error", isRtl ? "خطا در دریافت اطلاعیه‌ها" : "Failed to load announcements.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const stats = useMemo(() => {
    const total = announcements.length;
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const recent = announcements.filter(a => (now - new Date(a.created_at).getTime()) < threeDaysMs).length;
    const faculty = announcements.filter(a => a.target_role === "teacher").length;
    const mine = announcements.filter(a => a.created_by === currentUserId).length;
    return { total, recent, faculty, mine };
  }, [announcements, currentUserId]);

  // Filtered and searched announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(item => {
      // Filter tab
      if (activeFilter === "teacher" && item.target_role !== "teacher") return false;
      if (activeFilter === "student" && item.target_role !== "student") return false;
      if (activeFilter === "mine" && item.created_by !== currentUserId) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesMsg = item.message.toLowerCase().includes(q);
        const matchesRole = item.target_role.toLowerCase().includes(q);
        return matchesTitle || matchesMsg || matchesRole;
      }

      return true;
    });
  }, [announcements, activeFilter, searchQuery, currentUserId]);

  // Handle Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title.trim() || !createForm.message.trim()) {
      showToast("error", isRtl ? "لطفاً عنوان و متن اطلاعیه را وارد نمایید." : "Title and message are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("announcements")
        .insert({
          title: createForm.title.trim(),
          message: createForm.message.trim(),
          target_role: createForm.target_role,
          created_by: currentUserId
        })
        .select()
        .single();

      if (error) throw error;

      showToast("success", isRtl ? "اطلاعیه با موفقیت ارسال شد!" : "Announcement broadcasted successfully!");
      setAnnouncements(prev => [data, ...prev]);
      setCreateForm({ title: "", message: "", target_role: "student" });
      setIsCreateModalOpen(false);
    } catch (err: any) {
      console.error("Error creating announcement:", err);
      showToast("error", err.message || (isRtl ? "خطا در ثبت اطلاعیه" : "Failed to publish announcement."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm(isRtl ? "آیا از حذف این اطلاعیه اطمینان دارید؟" : "Are you sure you want to delete this broadcast?")) {
      return;
    }

    try {
      setDeletingId(id);
      const supabase = createClient();

      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id)
        .eq("created_by", currentUserId);

      if (error) throw error;

      showToast("success", isRtl ? "اطلاعیه حذف گردید." : "Announcement deleted.");
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      console.error("Error deleting announcement:", err);
      showToast("error", err.message || (isRtl ? "خطا در حذف اطلاعیه" : "Failed to delete announcement."));
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Copy text
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle expand for long messages
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Format date helper
  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const dateFormatted = d.toLocaleDateString(currentLocale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    const timeFormatted = d.toLocaleTimeString(currentLocale === "fa" ? "fa-IR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
    return { dateFormatted, timeFormatted };
  };

  return (
    <div className="w-full relative min-h-screen bg-[#030305] text-white font-sans selection:bg-indigo-500 selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-blue-700/10 via-cyan-600/5 to-transparent rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-10 space-y-6 sm:space-y-8 relative z-10">

        {/* ================= 1. HERO HEADER ================= */}
        <section className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#120f24]/95 via-[#090714]/90 to-[#030306] border border-white/10 p-4 sm:p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Megaphone size={13} className="text-indigo-400 shrink-0" />
                <span>{isRtl ? "مرکز اعلانات و بخشنامه‌های آکادمی" : "Official Broadcasts & Faculty Directives"}</span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {t.teacherPages.classroomAnnouncements || (isRtl ? "تابلو اعلانات کلاس و آکادمی" : "Classroom Announcements")}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "اطلاع از آخرین بخشنامه‌ها، برنامه‌های کلاس زنده، اطلاعیه‌های سراسری مدیریت و ارسال اطلاعیه‌های درسی به دانشجویان."
                  : "Stay informed on the latest administration directives, live schedule updates, and broadcast classroom instructions to scholars."
                }
              </p>
            </div>

            {/* Header Actions - 100% Mobile Responsive */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              
              {/* Refresh button */}
              <button
                type="button"
                onClick={() => fetchAnnouncements(true)}
                disabled={isRefreshing}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                title={isRtl ? "به‌روزرسانی اطلاعیه‌ها" : "Refresh Announcements"}
              >
                <RefreshCw size={15} className={isRefreshing ? "animate-spin text-indigo-400" : ""} />
                <span className="sm:hidden md:inline">{isRtl ? "تازه‌سازی" : "Refresh"}</span>
              </button>

              {/* Broadcast Announcement Button */}
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(99,102,241,0.3)] active:scale-95 cursor-pointer"
              >
                <Plus size={16} />
                <span>{isRtl ? "ارسال اطلاعیه جدید" : "Create Broadcast"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Toast Message Banner */}
        {toastMessage && (
          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 text-xs font-bold border backdrop-blur-md transition-all animate-[fadeInDown_0.2s_ease-out] ${
            toastMessage.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}>
            {toastMessage.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* ================= 2. QUICK STATS MATRIX (MOBILE, IPAD, DESKTOP) ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
              <Megaphone size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "کل اطلاعیه‌ها" : "Total Broadcasts"}
              </span>
              <span className="text-sm sm:text-lg font-black text-white font-mono">
                {stats.total}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "تازه (۳ روز اخیر)" : "New Updates"}
              </span>
              <span className="text-sm sm:text-lg font-black text-amber-400 font-mono">
                {stats.recent}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <ShieldCheck size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "مخصوص اساتید" : "Faculty Directives"}
              </span>
              <span className="text-sm sm:text-lg font-black text-purple-400 font-mono">
                {stats.faculty}
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Users size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block font-medium truncate">
                {isRtl ? "ارسال‌شده توسط من" : "My Broadcasts"}
              </span>
              <span className="text-sm sm:text-lg font-black text-emerald-400 font-mono">
                {stats.mine}
              </span>
            </div>
          </div>

        </section>

        {/* ================= 3. FILTER TABS & SEARCH BAR ================= */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Scrollable Filter Pills (100% Mobile & iPad responsive) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl sm:rounded-2xl bg-black/60 border border-white/10 shrink-0">
            
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "همه" : "All"} ({stats.total})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("teacher")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                activeFilter === "teacher"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "اساتید" : "Faculty"} ({stats.faculty})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("student")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                activeFilter === "student"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "دانشجویان" : "Scholars"}
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("mine")}
              className={`px-3 py-2 rounded-lg sm:rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                activeFilter === "mine"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "ارسالی‌های من" : "Mine"} ({stats.mine})
            </button>

          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? "right-3" : "left-3"}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? "جستجو در متن یا عنوان..." : "Search broadcasts..."}
              className={`w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors ${
                isRtl ? "pr-9 pl-8" : "pl-9 pr-8"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white ${isRtl ? "left-3" : "right-3"}`}
              >
                <X size={13} />
              </button>
            )}
          </div>

        </section>


        {/* ================= 4. ANNOUNCEMENTS LIST ================= */}
        <section className="space-y-4">
          {isLoading ? (
            // Skeleton Loader
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-8 animate-pulse space-y-3">
                  <div className="h-6 w-1/3 bg-white/5 rounded-lg"></div>
                  <div className="h-4 w-1/4 bg-white/5 rounded-lg"></div>
                  <div className="h-16 w-full bg-white/5 rounded-xl mt-3"></div>
                </div>
              ))}
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => {
              const { dateFormatted, timeFormatted } = formatDateTime(announcement.created_at);
              const isRecent = (Date.now() - new Date(announcement.created_at).getTime()) < (3 * 24 * 60 * 60 * 1000);
              const isMine = announcement.created_by === currentUserId;
              const isExpanded = expandedIds.has(announcement.id);
              const isCopied = copiedId === announcement.id;
              const isLongMessage = announcement.message.length > 280;

              return (
                <article
                  key={announcement.id}
                  className="bg-gradient-to-b from-[#0e0c18] to-[#07050d] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group"
                >
                  {/* Subtle top gradient aura */}
                  <div className="absolute top-0 right-0 w-64 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>

                  <div className="relative z-10 space-y-4">
                    
                    {/* Top Row: Badges & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      
                      {/* Left: Audience & Status Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        
                        {/* Target Role Tag */}
                        {announcement.target_role === "all" ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                            <Radio size={11} className="text-indigo-400" />
                            {isRtl ? "عمومی آکادمی" : "Entire Academy"}
                          </span>
                        ) : announcement.target_role === "teacher" ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                            <ShieldCheck size={11} className="text-purple-400" />
                            {isRtl ? "ویژه کادر اساتید" : "Faculty Only"}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <Users size={11} className="text-emerald-400" />
                            {isRtl ? "شاگردان و دانشجویان" : "Scholars & Students"}
                          </span>
                        )}

                        {/* Recent Indicator */}
                        {isRecent && (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <BellRing size={11} className="animate-pulse text-amber-400" />
                            {isRtl ? "پیام جدید" : "New Update"}
                          </span>
                        )}

                        {/* My Broadcast Tag */}
                        {isMine && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 text-neutral-300">
                            {isRtl ? "ارسال‌شده توسط شما" : "Authored by you"}
                          </span>
                        )}

                      </div>

                      {/* Right: Quick Action Controls */}
                      <div className="flex items-center gap-1.5">
                        
                        {/* Copy text button */}
                        <button
                          type="button"
                          onClick={() => handleCopyText(announcement.id, announcement.message)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title={isRtl ? "کپی متن اطلاعیه" : "Copy text"}
                        >
                          {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>

                        {/* Delete button (If created by current teacher) */}
                        {isMine && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                            disabled={deletingId === announcement.id}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                            title={isRtl ? "حذف اطلاعیه" : "Delete broadcast"}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}

                      </div>

                    </div>

                    {/* Middle: Title & DateTime */}
                    <div>
                      <h2 className="text-base sm:text-xl font-black text-white leading-snug">
                        {announcement.title}
                      </h2>

                      <div className="flex items-center gap-3 text-[10px] sm:text-xs text-neutral-400 font-mono mt-1.5">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={13} className="text-indigo-400" />
                          <span>{dateFormatted}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-indigo-400" />
                          <span>{timeFormatted}</span>
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>

                    {/* Body Message */}
                    <div className="text-neutral-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-normal">
                      <p className={!isExpanded && isLongMessage ? "line-clamp-4" : ""}>
                        {announcement.message}
                      </p>

                      {isLongMessage && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(announcement.id)}
                          className="mt-2 text-indigo-400 hover:text-indigo-300 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <span>{isRtl ? "بستن متن" : "Show less"}</span>
                              <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              <span>{isRtl ? "مشاهده متن کامل..." : "Read more..."}</span>
                              <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            // High-Tech Empty State
            <div className="bg-[#0a0a0f]/80 p-8 sm:p-14 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
                <BellRing size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-1.5">
                {isRtl ? "هیچ اطلاعیه‌ای یافت نشد" : "No Announcements Found"}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                {searchQuery || activeFilter !== "all"
                  ? (isRtl ? "اطلاعیه‌ای مطابق با فیلتر یا عبارت جستجوی شما وجود ندارد." : "No announcements match your search or filter.")
                  : (isRtl ? "در حال حاضر هیچ اطلاعیه‌ای برای نمایش وجود ندارد. اطلاعیه‌های جدید مدیریت یا کلاس‌ها در اینجا نمایش داده خواهد شد." : "You're all caught up! New administrative notices and schedules will appear here.")
                }
              </p>
              
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                <Plus size={14} />
                <span>{isRtl ? "ایجاد اولین اطلاعیه کلاسی" : "Publish First Broadcast"}</span>
              </button>
            </div>
          )}
        </section>

      </div>

      {/* ================= MODAL: CREATE BROADCAST ANNOUNCEMENT ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0c0a18] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full space-y-5 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 pe-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
                <Megaphone size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isRtl ? "ارسال اطلاعیه و بخشنامه جدید" : "Create New Announcement"}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400">
                  {isRtl ? "انتشار پیام رسمی در تابلوی اعلانات دانشجویان" : "Broadcast official message to student dashboard"}
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-start">
              
              {/* Title */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                  {isRtl ? "عنوان اطلاعیه *" : "Announcement Title *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRtl ? "مثال: تغییر ساعت کلاس لایو تحلیلی فردا" : "e.g. Rescheduled Live Market Analysis Session"}
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                  {isRtl ? "مخاطبان هدف اطلاعیه *" : "Target Audience *"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateForm({ ...createForm, target_role: "student" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      createForm.target_role === "student"
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm"
                        : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Users size={14} />
                    <span>{isRtl ? "فقط دانشجویان" : "Students Only"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCreateForm({ ...createForm, target_role: "all" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      createForm.target_role === "all"
                        ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-400 shadow-sm"
                        : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Radio size={14} />
                    <span>{isRtl ? "عمومی (همه)" : "Entire Academy"}</span>
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "متن کامل اطلاعیه *" : "Broadcast Message *"}
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {createForm.message.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder={isRtl ? "متن کامل اطلاعیه، جزئیات و لینک‌های لازم را وارد نمایید..." : "Write detailed announcement, instructions, and relevant meeting links..."}
                  value={createForm.message}
                  onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 resize-y"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold text-center"
                >
                  {isRtl ? "انصراف" : "Cancel"}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-black uppercase tracking-wider disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  {isSubmitting ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  <span>{isSubmitting ? (isRtl ? "در حال ارسال..." : "Publishing...") : (isRtl ? "انتشار و ارسال" : "Broadcast Now")}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}