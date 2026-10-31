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
  ShieldAlert,
  Search,
  X,
  RefreshCw,
  Copy,
  Check,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Radio,
  Users
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  target_role: string;
  created_by: string | null;
  created_at: string;
}

export default function StudentAnnouncementsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [authorsMap, setAuthorsMap] = useState<Map<string, { name: string; avatar: string | null }>>(new Map());

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "recent" | "campus" | "student">("all");

  // Expanded cards state for long messages
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchAnnouncements = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }

      // Fetch user profile to know exact role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const userRole = profile?.role || "student";

      // Fetch announcements targeting "all" or "student"
      const { data: announcementsData, error } = await supabase
        .from("announcements")
        .select("*")
        .in("target_role", ["all", userRole, "student"])
        .order("created_at", { ascending: false });

      if (error) throw error;

      const items: Announcement[] = announcementsData || [];
      setAnnouncements(items);

      // Fetch authors info if available
      const authorIds = Array.from(new Set(items.map((a) => a.created_by).filter(Boolean))) as string[];
      if (authorIds.length > 0) {
        const { data: authorsData } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, avatar_url")
          .in("id", authorIds);

        if (authorsData) {
          const map = new Map<string, { name: string; avatar: string | null }>();
          authorsData.forEach((author) => {
            map.set(author.id, {
              name: `${author.first_name || ""} ${author.last_name || ""}`.trim() || "Administration",
              avatar: author.avatar_url,
            });
          });
          setAuthorsMap(map);
        }
      }
    } catch (error) {
      console.error("Error fetching student announcements:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Filtered and searched announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const dateObj = new Date(item.created_at);
      const isRecent = Date.now() - dateObj.getTime() < 3 * 24 * 60 * 60 * 1000;

      // Filter check
      if (activeFilter === "recent" && !isRecent) return false;
      if (activeFilter === "campus" && item.target_role !== "all") return false;
      if (activeFilter === "student" && item.target_role !== "student") return false;

      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchMessage = item.message?.toLowerCase().includes(q);
        return matchTitle || matchMessage;
      }

      return true;
    });
  }, [announcements, activeFilter, searchQuery]);

  // KPIs
  const stats = useMemo(() => {
    const total = announcements.length;
    const recent = announcements.filter(
      (a) => Date.now() - new Date(a.created_at).getTime() < 3 * 24 * 60 * 60 * 1000
    ).length;
    const campus = announcements.filter((a) => a.target_role === "all").length;
    const student = announcements.filter((a) => a.target_role === "student").length;
    return { total, recent, campus, student };
  }, [announcements]);

  // Toggle message expand
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Copy announcement text
  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToastMessage(isRtl ? "متن اطلاعیه کپی شد" : "Announcement copied to clipboard");
      setTimeout(() => {
        setCopiedId(null);
        setToastMessage(null);
      }, 2000);
    } catch (e) {
      // Fallback
    }
  };

  // Share announcement
  const handleShare = async (title: string, message: string) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: message,
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled or not supported
      }
    } else {
      handleCopy("share", `${title}\n\n${message}`);
    }
  };

  return (
    <div
      className="w-full relative overflow-x-hidden overflow-y-auto bg-[#020204] text-white font-sans pb-32 min-h-screen"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Cosmic Atmosphere */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Floating Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-500 text-black font-black text-xs shadow-2xl flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
          <Check size={14} className="stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10 px-3 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8">
        
        {/* ================= 1. BROADCAST HERO COCKPIT ================= */}
        <header className="relative w-full rounded-[1.75rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#100c1e]/95 via-[#0a0715]/90 to-[#030306] border border-indigo-500/20 p-4 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                  <Radio size={13} className="text-indigo-400 animate-pulse" />
                  <span>{isRtl ? "پایگاه اطلاع‌رسانی رسمی" : "Official Broadcast Hub"}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/10 text-neutral-300 border border-white/10">
                  <Sparkles size={11} className="text-yellow-400 shrink-0" />
                  <span>{isRtl ? "ابلاغیه‌های تاییدشده" : "Verified Decrees"}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {t.announcements?.title || (isRtl ? "اطلاعیه‌های رسمی آکادمی" : "Official Announcements")}
              </h1>

              <p className="text-[11px] sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {t.announcements?.subtitle || (isRtl
                  ? "آخرین اخبار آموزشی، ابلاغیه‌های اداری، زمان‌بندی آزمون‌ها و به‌روزرسانی‌های سراسری آکادمی بین‌المللی صافی."
                  : "Stay informed on class schedules, official decrees, exam deadlines, and administrative notices.")}
              </p>
            </div>

            {/* Quick Refresh Button & Active Status */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <button
                onClick={() => fetchAnnouncements(true)}
                disabled={isRefreshing}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/30 text-xs font-bold text-neutral-300 hover:text-white transition-all shadow-md cursor-pointer disabled:opacity-50"
                title={isRtl ? "به‌روزرسانی اطلاعیه‌ها" : "Refresh Announcements"}
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin text-indigo-400" : ""} />
                <span>{isRtl ? "به‌روزرسانی" : "Refresh"}</span>
              </button>
            </div>

          </div>

          {/* ================= 4 BENTO METRICS PODS ================= */}
          <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            
            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  {isRtl ? "کل اطلاعیه‌ها" : "Total Broadcasts"}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white font-mono mt-0.5 block">
                  {stats.total}
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <Megaphone size={18} />
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  {isRtl ? "اطلاعیه‌های اخیر (۷۲h)" : "Recent (72h)"}
                </span>
                <span className="text-lg sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">
                  {stats.recent}
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <BellRing size={18} className="animate-pulse" />
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                  {isRtl ? "عمومی کل آکادمی" : "Entire Academy"}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white font-mono mt-0.5 block">
                  {stats.campus}
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <Users size={18} />
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-fuchsia-400 block">
                  {isRtl ? "مخصوص دانشجویان" : "Student Exclusive"}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white font-mono mt-0.5 block">
                  {stats.student}
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-fuchsia-500/15 text-fuchsia-400 flex items-center justify-center shrink-0 border border-fuchsia-500/20">
                <ShieldCheck size={18} />
              </div>
            </div>

          </div>
        </header>

        {/* ================= 2. SEARCH & FILTER DOCK ================= */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-xl">
          
          {/* Filter Pills - Responsive Scroll / Grid */}
          <div className="grid grid-cols-2 sm:flex items-center gap-1.5 p-1 rounded-xl sm:rounded-2xl bg-black/60 border border-white/5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "همه اعلانات" : "All"} ({stats.total})
            </button>

            <button
              onClick={() => setActiveFilter("recent")}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "recent"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-md shadow-amber-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "جدید (۷۲h)" : "Recent"} ({stats.recent})
            </button>

            <button
              onClick={() => setActiveFilter("campus")}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "campus"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-black shadow-md shadow-cyan-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "عمومی" : "Campus"} ({stats.campus})
            </button>

            <button
              onClick={() => setActiveFilter("student")}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "student"
                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-md shadow-fuchsia-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isRtl ? "دانشجویان" : "Students"} ({stats.student})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? "جستجو در متن یا عنوان اطلاعیه‌ها..." : "Search announcements..."}
              className={`w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors shadow-inner ${
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

        </section>

        {/* ================= 3. ANNOUNCEMENTS CARDS FEED ================= */}
        <section className="space-y-4 sm:space-y-6">
          {isLoading ? (
            // Skeleton Shimmers
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0a0a0f]/60 border border-white/5 animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-1/3 bg-white/5 rounded-xl"></div>
                    <div className="h-5 w-20 bg-white/5 rounded-lg"></div>
                  </div>
                  <div className="h-4 w-1/4 bg-white/5 rounded-lg"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-white/5 rounded-lg"></div>
                    <div className="h-3 w-4/5 bg-white/5 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            // Real Announcements List
            filteredAnnouncements.map((announcement) => {
              const dateObj = new Date(announcement.created_at);
              const isRecent = Date.now() - dateObj.getTime() < 3 * 24 * 60 * 60 * 1000;
              const isExpanded = expandedIds.has(announcement.id);
              const author = announcement.created_by ? authorsMap.get(announcement.created_by) : null;

              const isEntireAcademy = announcement.target_role === "all";
              const isLongMessage = announcement.message.length > 280;
              const displayMessage = isLongMessage && !isExpanded
                ? announcement.message.slice(0, 280) + "..."
                : announcement.message;

              return (
                <article
                  key={announcement.id}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#0c0c16]/90 via-[#070710]/95 to-[#040407] border border-white/10 hover:border-indigo-500/40 shadow-xl transition-all duration-300 relative overflow-hidden group space-y-5"
                >
                  {/* Subtle Inner Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>

                  {/* Header Row: Issuer Badge & Meta */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
                    
                    {/* Issuer Identity */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30 shadow-inner">
                        {author?.avatar ? (
                          <img src={author.avatar} alt="Author" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <ShieldAlert size={20} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-white truncate">
                            {author?.name || (isRtl ? "دبیرخانه و آموزش آکادمی صافی" : "Safi Academy Administration")}
                          </span>
                          <ShieldCheck size={14} className="text-indigo-400 shrink-0" />
                        </div>
                        <span className="text-[10px] text-neutral-400 font-bold block">
                          {isRtl ? "ابلاغیه رسمی معتبر" : "Official Decrees"}
                        </span>
                      </div>
                    </div>

                    {/* Status & Scope Badges */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {isRecent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                          <BellRing size={10} className="animate-pulse" />
                          <span>{isRtl ? "جدید" : "New"}</span>
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                          isEntireAcademy
                            ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                            : "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30"
                        }`}
                      >
                        <Users size={11} />
                        <span>
                          {isEntireAcademy
                            ? (isRtl ? "عمومی (کل آکادمی)" : "Campus Wide")
                            : (isRtl ? "مخصوص دانشجویان" : "Student Exclusive")}
                        </span>
                      </span>
                    </div>

                  </div>

                  {/* Title & Message Content */}
                  <div className="space-y-3 relative z-10 pt-1">
                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-snug group-hover:text-indigo-300 transition-colors">
                      {announcement.title}
                    </h2>

                    <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap font-normal break-words">
                      {displayMessage}
                    </div>

                    {/* Read More / Read Less Toggle */}
                    {isLongMessage && (
                      <button
                        onClick={() => toggleExpand(announcement.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-1 cursor-pointer"
                      >
                        <span>{isExpanded ? (isRtl ? "بستن متن" : "Show Less") : (isRtl ? "ادامه متن کامل..." : "Read Full Notice...")}</span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    )}
                  </div>

                  {/* Footer Meta Row: Date, Time & Action Buttons */}
                  <div className="pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
                    
                    {/* Timestamp */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-medium">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/5">
                        <CalendarDays size={13} className="text-indigo-400" />
                        <span>{dateObj.toLocaleDateString(currentLocale === "fa" ? "fa-IR" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </span>

                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/5">
                        <Clock size={13} className="text-indigo-400" />
                        <span>{dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </span>
                    </div>

                    {/* Interactive Action Pills */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(announcement.id, `${announcement.title}\n\n${announcement.message}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/5 text-[11px] font-bold transition-all cursor-pointer"
                        title={isRtl ? "کپی متن اطلاعیه" : "Copy Announcement Text"}
                      >
                        {copiedId === announcement.id ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">{isRtl ? "کپی شد" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>{isRtl ? "کپی متن" : "Copy"}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleShare(announcement.title, announcement.message)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/5 text-[11px] font-bold transition-all cursor-pointer"
                        title={isRtl ? "اشتراک‌گذاری" : "Share"}
                      >
                        <Share2 size={12} />
                        <span>{isRtl ? "اشتراک" : "Share"}</span>
                      </button>
                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            // Empty State
            <div className="py-20 text-center space-y-4 bg-[#0a0a0f] rounded-3xl sm:rounded-[2.5rem] border border-white/5 p-6 sm:p-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                <BellRing size={28} className="text-indigo-400/80" />
              </div>
              <h3 className="text-base sm:text-xl font-black text-white">
                {t.announcements?.noAnnouncements || (isRtl ? "هیچ اطلاعیه‌ای یافت نشد" : "No Announcements Found")}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                {searchQuery || activeFilter !== "all"
                  ? (isRtl ? "با فیلترها یا عبارت جستجوی فعلی موردی یافت نشد. می‌توانید فیلترها را ریست کنید." : "No announcements match your search or filter.")
                  : (t.announcements?.noAnnouncementsDesc || (isRtl ? "همه پیام‌ها بررسی شده‌اند! اطلاعیه‌های جدید در این بخش به محض ابلاغ نمایش داده خواهند شد." : "All notices have been checked. New bulletins will appear here."))}
              </p>

              {(searchQuery || activeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>{isRtl ? "نمایش همه اطلاعیه‌ها" : "Reset Filters"}</span>
                </button>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}