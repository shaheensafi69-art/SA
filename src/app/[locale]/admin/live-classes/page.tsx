"use client";

import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  ArrowLeft,
  Video,
  Radio,
  Clock,
  CalendarDays,
  ExternalLink,
  Edit3,
  Link as LinkIcon,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  MessageCircle,
  Search,
  Copy,
  Check,
  Sparkles,
  Zap,
  Globe,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";

type LiveClassItem = {
  id: string;
  class_name: string;
  is_active: boolean;
  class_time: string | null;
  class_days: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  course: { title: string } | null;
  teacher: { first_name: string; last_name: string; avatar_url: string | null } | null;
};

export default function AdminLiveClassesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [classes, setClasses] = useState<LiveClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "archived" | "missing">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit Link Modal State
  const [selectedClass, setSelectedClass] = useState<LiveClassItem | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [signalLink, setSignalLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active, class_time, class_days, meeting_link, signal_group_link,
          course:courses(title),
          teacher:profiles!teacher_id(first_name, last_name, avatar_url)
        `)
        .order("is_active", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted = data.map((cls: any) => ({
          ...cls,
          course: Array.isArray(cls.course) ? cls.course[0] : cls.course,
          teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher
        }));
        setClasses(formatted);
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openLinkModal = (cls: LiveClassItem) => {
    setSelectedClass(cls);
    setMeetingLink(cls.meeting_link || "");
    setSignalLink(cls.signal_group_link || "");
    setMessage(null);
  };

  const handleUpdateLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    setIsSaving(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("class_groups")
        .update({
          meeting_link: meetingLink.trim() || null,
          signal_group_link: signalLink.trim() || null
        })
        .eq("id", selectedClass.id);

      if (error) throw error;

      setClasses(prev =>
        prev.map(c =>
          c.id === selectedClass.id
            ? { ...c, meeting_link: meetingLink.trim() || null, signal_group_link: signalLink.trim() || null }
            : c
        )
      );

      setMessage({ type: "success", text: "Classroom broadcast links updated successfully!" });
      setTimeout(() => {
        setSelectedClass(null);
        setMessage(null);
      }, 1800);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update links." });
    } finally {
      setIsSaving(false);
    }
  };

  // Detect Video Platform
  const detectPlatform = (url: string | null) => {
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes("zoom.us")) return { name: "Zoom", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    if (lower.includes("meet.google.com")) return { name: "Google Meet", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (lower.includes("teams.microsoft.com")) return { name: "MS Teams", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" };
    return { name: "Live Room", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(c => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.class_name?.toLowerCase().includes(q) ||
        c.course?.title?.toLowerCase().includes(q) ||
        c.teacher?.first_name?.toLowerCase().includes(q) ||
        c.teacher?.last_name?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? c.is_active
          : statusFilter === "archived"
          ? !c.is_active
          : !c.meeting_link;

      return matchesSearch && matchesStatus;
    });
  }, [classes, searchQuery, statusFilter]);

  const metrics = useMemo(() => {
    const total = classes.length;
    const active = classes.filter(c => c.is_active).length;
    const configured = classes.filter(c => !!c.meeting_link).length;
    const missing = classes.filter(c => !c.meeting_link).length;
    return { total, active, configured, missing };
  }, [classes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030308] flex flex-col items-center justify-center space-y-4 text-white">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest animate-pulse">
          {t.adminPages.establishingLiveConnection}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030308] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10 font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">

        {/* ================= HEADER ================= */}
        <header className="bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] p-6 sm:p-8 rounded-3xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <Link
              href={`/${currentLocale}/admin`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-rose-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={13} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              <span>{t.adminPages.liveSessions}</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-wider">
                <Radio size={12} className="animate-pulse text-rose-500" />
                Live Hub
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
              Monitor active class rooms, verify meeting URLs (Zoom / Meet / Teams), and ensure scholars enjoy frictionless access to live lectures.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={fetchLiveClasses}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all active:scale-95"
            >
              <RefreshCw size={14} className="text-rose-400" />
              <span>Refresh Broadcasts</span>
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090913]/90 border border-white/[0.08] backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">Total Cohorts</span>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">{metrics.total}</span>
            <span className="text-[10px] text-neutral-500 mt-1 block">Registered in database</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-rose-500/[0.04] border border-rose-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block flex items-center gap-1.5">
              <Radio size={12} className="animate-pulse" /> Active Broadcasts
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1 block">{metrics.active}</span>
            <span className="text-[10px] text-rose-500/70 mt-1 block">Live teaching rooms</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-500/[0.04] border border-emerald-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">Configured Rooms</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 block">{metrics.configured}</span>
            <span className="text-[10px] text-emerald-500/70 mt-1 block">Active meeting URLs</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/[0.04] border border-amber-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Missing URLs</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1 block">{metrics.missing}</span>
            <span className="text-[10px] text-amber-500/70 mt-1 block">Requires attention</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#090913]/90 border border-white/[0.08] backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { label: "All Cohorts", value: "all", count: metrics.total },
              { label: "Active Live", value: "active", count: metrics.active },
              { label: "Archived", value: "archived", count: metrics.total - metrics.active },
              { label: "Missing Links", value: "missing", count: metrics.missing }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  statusFilter === tab.value
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                    : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    statusFilter === tab.value ? "bg-black/30 text-white" : "bg-white/10 text-neutral-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder={t.adminPages.searchCohortsPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-rose-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* ================= LIVE CLASSES GRID ================= */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-20 bg-[#090913]/90 border border-dashed border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
            <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{t.adminPages.noSessionsFound}</h3>
            <p className="text-neutral-500 text-xs">{t.adminPages.noClassesMatchingCriteria}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClasses.map(cls => {
              const platform = detectPlatform(cls.meeting_link);

              return (
                <div
                  key={cls.id}
                  className="group flex flex-col justify-between bg-[#090913]/90 border border-white/[0.08] hover:border-rose-500/30 rounded-3xl p-6 backdrop-blur-3xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(225,29,72,0.12)] relative overflow-hidden"
                >
                  {/* Glow accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-rose-500/10 transition-colors" />

                  <div className="relative z-10 space-y-4">
                    {/* Top Status & Platform Pill */}
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 shadow-sm ${
                          cls.is_active
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-neutral-900 text-neutral-500 border-neutral-800"
                        }`}
                      >
                        {cls.is_active ? <Radio size={10} className="animate-pulse" /> : <Clock size={10} />}
                        <span>{cls.is_active ? "Live Broadcast" : "Archived"}</span>
                      </span>

                      {platform && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${platform.color}`}>
                          {platform.name}
                        </span>
                      )}
                    </div>

                    {/* Class & Course Names */}
                    <div>
                      <h3 className="text-base font-black text-white line-clamp-1 group-hover:text-rose-300 transition-colors">
                        {cls.class_name}
                      </h3>
                      <p className="text-[11px] text-neutral-400 font-bold mt-0.5 truncate">
                        {cls.course?.title || "Standalone Cohort"}
                      </p>
                    </div>

                    {/* Instructor Info */}
                    {cls.teacher && (
                      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-white/5">
                        <div className="w-7 h-7 rounded-lg overflow-hidden bg-neutral-800 shrink-0 flex items-center justify-center font-bold text-xs text-rose-400">
                          {cls.teacher.avatar_url ? (
                            <img src={cls.teacher.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            cls.teacher.first_name?.[0]
                          )}
                        </div>
                        <span className="text-xs text-neutral-300 font-medium truncate">
                          {cls.teacher.first_name} {cls.teacher.last_name}
                        </span>
                      </div>
                    )}

                    {/* Schedule Info */}
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 flex items-center gap-1.5">
                          <CalendarDays size={13} /> {t.adminPages.days}
                        </span>
                        <span className="font-bold text-neutral-200 truncate pl-2">{cls.class_days || "Not configured"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 flex items-center gap-1.5">
                          <Clock size={13} /> {t.adminPages.time}
                        </span>
                        <span className="font-bold text-neutral-200 font-mono">{cls.class_time || "Not set"}</span>
                      </div>
                    </div>

                    {/* Links Status & Quick Copy */}
                    <div className="space-y-2 text-[10px] font-black uppercase tracking-wider">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                        <span className="text-neutral-500 flex items-center gap-1">
                          <Video size={12} className="text-blue-400" /> {t.adminPages.meetingUrl}
                        </span>
                        {cls.meeting_link ? (
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={11} /> Ready
                            </span>
                            <button
                              onClick={() => handleCopy(cls.meeting_link!, `meet-${cls.id}`)}
                              className="text-neutral-400 hover:text-white"
                              title="Copy URL"
                            >
                              {copiedId === `meet-${cls.id}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-rose-400">{t.adminPages.missing}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                        <span className="text-neutral-500 flex items-center gap-1">
                          <MessageCircle size={12} className="text-purple-400" /> {t.adminPages.commsGroup}
                        </span>
                        {cls.signal_group_link ? (
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={11} /> Ready
                            </span>
                            <button
                              onClick={() => handleCopy(cls.signal_group_link!, `sig-${cls.id}`)}
                              className="text-neutral-400 hover:text-white"
                              title="Copy Group Link"
                            >
                              {copiedId === `sig-${cls.id}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-neutral-500">None</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 relative z-10 pt-4 mt-4 border-t border-white/[0.06]">
                    {cls.meeting_link ? (
                      <a
                        href={cls.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 px-3 py-3 text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-rose-500/10"
                      >
                        <Video size={13} />
                        <span>Launch</span>
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-600 px-3 py-3 text-[10px] font-black uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-1.5"
                      >
                        No Link
                      </button>
                    )}

                    <button
                      onClick={() => openLinkModal(cls)}
                      className="flex-1 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white px-3 py-3 text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Edit3 size={13} />
                      <span>{t.adminClasses.manage}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ================= MODAL: EDIT LINKS ================= */}
      {selectedClass && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md"
            onClick={() => !isSaving && setSelectedClass(null)}
          />

          <div className="relative w-full max-w-lg bg-[#0a0a14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-6">
            <div className="p-6 border-b border-white/[0.08] bg-black/40 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-white">{t.adminPages.manageAccessLinks}</h2>
                <p className="text-xs text-rose-400 font-mono mt-0.5 truncate max-w-[280px]">
                  Cohort: {selectedClass.class_name}
                </p>
              </div>
              <button
                disabled={isSaving}
                onClick={() => setSelectedClass(null)}
                className="w-9 h-9 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-full flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 pt-0 space-y-5">
              {message && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border ${
                    message.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleUpdateLinks} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    <Video size={13} className="text-rose-400" /> {t.adminPages.meetingUrl}
                  </label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="url"
                      placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                      value={meetingLink}
                      onChange={e => setMeetingLink(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-xs font-mono focus:outline-none focus:border-rose-400 transition-colors shadow-inner"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 ml-1">
                    {t.adminPages.pasteZoomMeetTeamsDesc}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    <MessageCircle size={13} className="text-purple-400" /> {t.adminPages.commsGroup}
                  </label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="url"
                      placeholder="https://t.me/joinchat/... or Signal group"
                      value={signalLink}
                      onChange={e => setSignalLink(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-xs font-mono focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 ml-1">
                    {t.adminPages.pasteSocialGroupDesc}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(225,29,72,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                  <span>{isSaving ? "Updating Broadcast Links..." : "Save Classroom Links"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}