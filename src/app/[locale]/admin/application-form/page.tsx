"use client";

import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  FileText,
  Mail,
  Globe,
  Eye,
  Trash2,
  ExternalLink,
  ChevronRight,
  User,
  Sparkles,
  RefreshCw,
  Loader2,
  Calendar,
  AlertCircle,
  Send,
  Check,
  X,
  Award,
  BookOpen
} from "lucide-react";

interface InstructorApplication {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  date_of_birth: string | null;
  category: string;
  course_title: string;
  course_description: string | null;
  experience_level: string | null;
  teaching_format: string | null;
  language: string | null;
  bio: string | null;
  achievements: string | null;
  portfolio_url: string | null;
  sample_video_url: string | null;
  resume_url: string | null;
  avatar_url: string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export default function AdminApplicationFormPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [applications, setApplications] = useState<InstructorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Quick Decision Modal State
  const [decisionModal, setDecisionModal] = useState<{
    app: InstructorApplication;
    action: "approved" | "rejected";
  } | null>(null);
  const [decisionNotes, setDecisionNotes] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/application-form?status=${statusFilter}&_t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Pragma": "no-cache",
          "Cache-Control": "no-cache"
        }
      });
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      } else if (data.error) {
        setFeedbackMessage({ text: data.error, type: "error" });
      }
    } catch (err: any) {
      console.error("Failed to load instructor applications:", err);
      setFeedbackMessage({ text: "Failed to load instructor applications.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleExecuteDecision = async () => {
    if (!decisionModal) return;
    const { app, action } = decisionModal;

    setActionLoadingId(app.id);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: app.id,
          status: action,
          adminNotes: decisionNotes || app.admin_notes
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update application status");
      }

      setFeedbackMessage({
        text: data.message || `Application marked as ${action.toUpperCase()}!`,
        type: data.emailResult?.success ? "success" : "error"
      });

      setApplications(prev =>
        prev.map(item => (item.id === app.id ? { ...item, status: action, admin_notes: decisionNotes || item.admin_notes } : item))
      );
      setDecisionModal(null);
      setDecisionNotes("");
    } catch (err: any) {
      console.error("Status update error:", err);
      setFeedbackMessage({ text: err.message || "Failed to update status.", type: "error" });
    } finally {
      setActionLoadingId(null);
      setTimeout(() => setFeedbackMessage(null), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this candidate dossier?")) return;

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/application-form?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
        setFeedbackMessage({ text: "Application dossier removed from registry.", type: "success" });
      }
    } catch (err) {
      console.error("Delete application error:", err);
      setFeedbackMessage({ text: "Failed to delete application record.", type: "error" });
    } finally {
      setActionLoadingId(null);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  // Unique categories list for filtering
  const categories = useMemo(() => {
    const set = new Set<string>();
    applications.forEach(a => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (app.first_name || "").toLowerCase().includes(q) ||
        (app.last_name || "").toLowerCase().includes(q) ||
        (app.email || "").toLowerCase().includes(q) ||
        (app.course_title || "").toLowerCase().includes(q) ||
        (app.category || "").toLowerCase().includes(q) ||
        (app.country || "").toLowerCase().includes(q);

      const matchesCat = categoryFilter === "all" || app.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [applications, searchQuery, categoryFilter]);

  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === "pending").length;
  const approvedCount = applications.filter(a => a.status === "approved").length;
  const rejectedCount = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-screen text-white font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-black uppercase tracking-wider mb-3">
              <GraduationCap size={14} className="text-amber-400" />
              <span>Faculty Admissions Pipeline</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Instructor Applications
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Review educator proposals, audition lectures, inspect CVs, and manage official faculty appointments with automated onboarding email dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-amber-400" : ""} />
              <span>{t.adminPages.syncingCoreMetrics}</span>
            </button>
            <Link
              href={`/${currentLocale}/instructor-application`}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span>Public Form</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Alert / Feedback Notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all animate-in fade-in ${
            feedbackMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedbackMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="font-semibold">{feedbackMessage.text}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-neutral-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 sm:p-6 rounded-3xl bg-[#08080f]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">{t.adminPages.totalSubmissions}</span>
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <GraduationCap size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalCount}</div>
          <span className="text-[10px] text-neutral-500 mt-1 block">Candidates in database</span>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/[0.03] border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {t.adminPages.pendingReview}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{pendingCount}</div>
          <span className="text-[10px] text-amber-500/70 mt-1 block">Awaiting admissions verdict</span>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-emerald-500/[0.03] border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">{t.adminPages.approvedFaculty}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{approvedCount}</div>
          <span className="text-[10px] text-emerald-500/70 mt-1 block">Active teaching members</span>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-rose-500/[0.03] border border-rose-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">{t.adminPages.archivedRejected}</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <XCircle size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">{rejectedCount}</div>
          <span className="text-[10px] text-rose-500/70 mt-1 block">Declined / archived applications</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-[#08080f]/90 border border-white/[0.08] backdrop-blur-xl shadow-xl">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
          {[
            { label: "All Candidates", value: "all", count: totalCount },
            { label: "Pending", value: "pending", count: pendingCount },
            { label: "Approved", value: "approved", count: approvedCount },
            { label: "Rejected", value: "rejected", count: rejectedCount }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                statusFilter === tab.value
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  statusFilter === tab.value ? "bg-black/20 text-black" : "bg-white/10 text-neutral-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:border-amber-400 focus:outline-none transition-colors"
            >
              <option value="all" className="bg-[#0b0b14] text-white">All Disciplines</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#0b0b14] text-white">
                  {cat}
                </option>
              ))}
            </select>
          )}

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder={t.adminPages.searchCandidatePlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {loading ? (
        <div className="py-28 text-center bg-[#08080f]/40 border border-white/[0.06] rounded-3xl">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-3" />
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Synchronizing Candidate Dossiers...
          </span>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl bg-[#08080f]/50 backdrop-blur-xl">
          <GraduationCap className="w-14 h-14 text-neutral-600 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-1">{t.adminPages.noApplicationsFound}</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {searchQuery
              ? "No instructor applications matched your active search query."
              : "No candidate records currently inside this filter bucket."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map(app => {
            const isPending = app.status === "pending";
            const isApproved = app.status === "approved";
            const isRejected = app.status === "rejected";

            return (
              <div
                key={app.id}
                className="bg-[#090913]/90 hover:bg-[#0c0c1a] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden hover:-translate-y-1"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                <div className="relative z-10">
                  {/* Top Status & Date */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        isApproved
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : isRejected
                          ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {isApproved && <CheckCircle2 size={12} />}
                      {isRejected && <XCircle size={12} />}
                      {isPending && <Clock size={12} className="animate-spin" />}
                      <span>{app.status}</span>
                    </span>

                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(app.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  {/* Candidate Profile Avatar & Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                      {app.avatar_url ? (
                        <img
                          src={app.avatar_url}
                          alt={app.first_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-mono font-black text-xl text-amber-400">
                          {app.first_name?.[0]}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {app.first_name} {app.last_name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 truncate mt-0.5">
                        <Mail size={12} className="shrink-0 text-neutral-500" />
                        <span className="truncate">{app.email}</span>
                      </div>
                      {app.country && (
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                          <Globe size={11} className="shrink-0 text-amber-500/70" />
                          <span>{app.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Proposed Course Card */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 truncate">
                        {app.category || "General"}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {app.experience_level || "Faculty"}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {app.course_title}
                    </h4>

                    {app.course_description && (
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {app.course_description}
                      </p>
                    )}
                  </div>

                  {/* Materials Preview Indicators */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-neutral-400 font-mono mb-4">
                    {app.sample_video_url ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Video size={11} /> Lecture Video
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 text-neutral-600 border border-white/5">
                        No Video
                      </span>
                    )}

                    {app.resume_url ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <FileText size={11} /> CV Attached
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 text-neutral-600 border border-white/5">
                        No CV
                      </span>
                    )}

                    {app.teaching_format && (
                      <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 truncate max-w-[140px]">
                        {app.teaching_format}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 relative z-10">
                  <Link
                    href={`/${currentLocale}/admin/application-form/${app.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <Eye size={13} />
                    <span>{t.adminPages.viewDossier}</span>
                  </Link>

                  <div className="flex items-center gap-1.5">
                    {app.status !== "approved" && (
                      <button
                        title={t.adminPages.quickApprove}
                        disabled={actionLoadingId === app.id}
                        onClick={() => setDecisionModal({ app, action: "approved" })}
                        className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors disabled:opacity-50 active:scale-95"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}

                    {app.status !== "rejected" && (
                      <button
                        title={t.adminPages.quickReject}
                        disabled={actionLoadingId === app.id}
                        onClick={() => setDecisionModal({ app, action: "rejected" })}
                        className="p-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors disabled:opacity-50 active:scale-95"
                      >
                        <XCircle size={16} />
                      </button>
                    )}

                    <button
                      title={t.adminPages.deleteApplication}
                      disabled={actionLoadingId === app.id}
                      onClick={() => handleDelete(app.id)}
                      className="p-2.5 rounded-2xl bg-white/5 hover:bg-rose-500/15 text-neutral-400 hover:text-rose-400 transition-colors disabled:opacity-50 active:scale-95"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Decision Confirmation Modal */}
      {decisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => !actionLoadingId && setDecisionModal(null)}
          />
          <div className="relative w-full max-w-lg bg-[#0c0c16] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    decisionModal.action === "approved"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {decisionModal.action === "approved" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {decisionModal.action === "approved" ? "Approve Instructor" : "Decline Application"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Candidate: {decisionModal.app.first_name} {decisionModal.app.last_name}
                  </p>
                </div>
              </div>
              <button
                disabled={!!actionLoadingId}
                onClick={() => setDecisionModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-2">
              <p className="font-semibold text-white">
                {decisionModal.action === "approved"
                  ? "An automated invitation email with an onboarding activation link will be sent to:"
                  : "A respectful consideration email will be dispatched to:"}
              </p>
              <p className="font-mono text-amber-400 font-bold">{decisionModal.app.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Admissions Notes (Optional)
              </label>
              <textarea
                value={decisionNotes}
                onChange={e => setDecisionNotes(e.target.value)}
                placeholder="Internal feedback or special onboarding instructions..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={!!actionLoadingId}
                onClick={() => setDecisionModal(null)}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                disabled={!!actionLoadingId}
                onClick={handleExecuteDecision}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                  decisionModal.action === "approved"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20"
                    : "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20"
                }`}
              >
                {actionLoadingId ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Confirm & Notify</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}