"use client";

import { useState, useEffect } from "react";
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
  Phone,
  Globe,
  Eye,
  Trash2,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  User,
  Sparkles,
  RefreshCw,
  Loader2
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
  const [applications, setApplications] = useState<InstructorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

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

  const handleQuickStatus = async (id: string, newStatus: "approved" | "rejected") => {
    const confirmText = newStatus === "approved"
      ? "Are you sure you want to APPROVE this applicant? An automated invitation email with their onboarding activation link will be dispatched immediately."
      : "Are you sure you want to REJECT this applicant? A polite, emotional consideration email will be dispatched to their address.";

    if (!confirm(confirmText)) return;

    setActionLoadingId(id);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update application status");
      }

      setFeedbackMessage({
        text: `Application successfully marked as ${newStatus.toUpperCase()}! Notification email dispatched.`,
        type: "success"
      });

      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      console.error("Status update error:", err);
      setFeedbackMessage({ text: err.message || "Failed to update status.", type: "error" });
    } finally {
      setActionLoadingId(null);
      setTimeout(() => setFeedbackMessage(null), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this application record?")) return;

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/application-form?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
      }
    } catch (err) {
      console.error("Delete application error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const matchesQuery =
      (app.first_name || "").toLowerCase().includes(q) ||
      (app.last_name || "").toLowerCase().includes(q) ||
      (app.email || "").toLowerCase().includes(q) ||
      (app.course_title || "").toLowerCase().includes(q) ||
      (app.category || "").toLowerCase().includes(q);

    return matchesQuery;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === "pending").length;
  const approvedCount = applications.filter(a => a.status === "approved").length;
  const rejectedCount = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-screen text-white font-sans">

      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap size={15} /> Faculty Recruitment Pipeline
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Instructor Applications
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            Review educator proposals, audition lectures, inspect CVs, and manage official faculty appointments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
          <Link
            href="/en/instructor-application"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
          >
            <span>Public Application Form</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Alert / Feedback Notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs md:text-sm flex items-center gap-3 transition-all ${feedbackMessage.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
        >
          {feedbackMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold">{feedbackMessage.text}</span>
        </div>
      )}

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#08080d] border border-white/10 relative overflow-hidden">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Total Submissions</div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">{totalCount}</div>
          <div className="absolute top-4 right-4 text-neutral-600">
            <GraduationCap size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 relative overflow-hidden">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Pending Review</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">{pendingCount}</div>
          <div className="absolute top-4 right-4 text-amber-500/30">
            <Clock size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 relative overflow-hidden">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Approved Faculty</div>
          <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">{approvedCount}</div>
          <div className="absolute top-4 right-4 text-emerald-500/30">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 relative overflow-hidden">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1">Archived / Rejected</div>
          <div className="text-2xl md:text-3xl font-black text-rose-400 font-mono">{rejectedCount}</div>
          <div className="absolute top-4 right-4 text-rose-500/30">
            <XCircle size={24} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#08080d] border border-white/10">

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {[
            { label: "All Candidates", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === tab.value
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search candidate, course, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Applications Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Loading candidate dossiers...
          </span>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl bg-[#08080d]">
          <GraduationCap className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Applications Found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {searchQuery
              ? "No instructor application matched your search criteria."
              : "No candidates currently in this filter bucket."}
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
                className="bg-[#08080d] hover:bg-[#0c0c14] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Top Status & Date */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${isApproved
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : isRejected
                          ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                        }`}
                    >
                      {isApproved && <CheckCircle2 size={12} />}
                      {isRejected && <XCircle size={12} />}
                      {isPending && <Clock size={12} />}
                      <span>{app.status}</span>
                    </span>

                    <span className="text-[11px] font-mono text-neutral-500">
                      {new Date(app.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  {/* Candidate Profile Avatar & Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                      {app.avatar_url ? (
                        <img
                          src={app.avatar_url}
                          alt={app.first_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-mono font-black text-lg text-amber-400">
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
                          <Globe size={11} className="shrink-0" />
                          <span>{app.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Proposed Course Card */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 mb-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 truncate">
                        {app.category}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {app.experience_level || "Experienced"}
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
                    {app.sample_video_url && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Video size={10} /> Audition Video
                      </span>
                    )}
                    {app.resume_url && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <FileText size={10} /> CV Attached
                      </span>
                    )}
                    {app.teaching_format && (
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 truncate max-w-[150px]">
                        {app.teaching_format}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <Link
                    href={`/en/admin/application-form/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 hover:scale-105 active:scale-95"
                  >
                    <Eye size={13} />
                    <span>View Dossier</span>
                  </Link>

                  <div className="flex items-center gap-1.5">
                    {app.status !== "approved" && (
                      <button
                        title="Quick Approve (Dispatches Onboarding Invite)"
                        disabled={actionLoadingId === app.id}
                        onClick={() => handleQuickStatus(app.id, "approved")}
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                      </button>
                    )}

                    {app.status !== "rejected" && (
                      <button
                        title="Quick Reject (Dispatches Consideration Email)"
                        disabled={actionLoadingId === app.id}
                        onClick={() => handleQuickStatus(app.id, "rejected")}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors disabled:opacity-50"
                      >
                        <XCircle size={15} />
                      </button>
                    )}

                    <button
                      title="Delete Application"
                      disabled={actionLoadingId === app.id}
                      onClick={() => handleDelete(app.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/15 text-neutral-400 hover:text-rose-400 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
