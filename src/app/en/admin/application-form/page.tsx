"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  UserCheck, 
  Trash2, 
  RefreshCw, 
  Loader2, 
  AlertCircle,
  GraduationCap,
  Video,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export type ApplicationItem = {
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
  avatar_url: string | null;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export default function AdminApplicationFormListPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/application-form");
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      } else {
        // Fallback directly to client if needed
        const supabase = createClient();
        const { data: dbData } = await supabase
          .from("instructor_applications")
          .select("*")
          .order("created_at", { ascending: false });
        if (dbData) setApplications(dbData as ApplicationItem[]);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickStatus = async (id: string, newStatus: "approved" | "rejected" | "pending") => {
    if (!confirm(`Are you sure you want to mark this application as ${newStatus.toUpperCase()}?`)) return;
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev =>
          prev.map(app => (app.id === id ? { ...app, status: newStatus, reviewed_at: new Date().toISOString() } : app))
        );
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("An error occurred while updating status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application permanently? This cannot be undone.")) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/application-form?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === "pending").length;
    const approved = applications.filter(a => a.status === "approved").length;
    const rejected = applications.filter(a => a.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [applications]);

  // Categories list for filtering
  const categories = useMemo(() => {
    const cats = new Set(applications.map(a => a.category).filter(Boolean));
    return Array.from(cats);
  }, [applications]);

  // Filtered List
  const filteredList = useMemo(() => {
    return applications.filter(item => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.first_name?.toLowerCase().includes(q) ||
        item.last_name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.course_title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.country?.toLowerCase().includes(q)
      );
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [applications, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#030305] text-white p-6 md:p-10 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-2">
            <GraduationCap size={14} /> Faculty Admissions & Recruiting
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Instructor Applications
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm mt-1">
            Review incoming teacher applications, evaluate audition lectures, inspect CVs, and onboard new faculty.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin text-amber-400" : ""} />
            <span>Refresh</span>
          </button>

          <Link
            href="/en/instructor-application"
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95"
          >
            <span>Public Application Form</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-[#0a0a10] border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">Total Applications</div>
          <div className="text-3xl font-black text-white mt-2 font-mono">{stats.total}</div>
          <div className="text-[11px] text-neutral-500 mt-1">All time received proposals</div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Pending Review</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          <div className="text-3xl font-black text-amber-400 mt-2 font-mono">{stats.pending}</div>
          <div className="text-[11px] text-amber-300/70 mt-1">Awaiting audition evaluation</div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Approved Faculty</div>
          <div className="text-3xl font-black text-emerald-400 mt-2 font-mono">{stats.approved}</div>
          <div className="text-[11px] text-emerald-300/70 mt-1">Accepted & granted teacher status</div>
        </div>

        <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="text-rose-400 text-xs font-bold uppercase tracking-wider">Rejected Proposals</div>
          <div className="text-3xl font-black text-rose-400 mt-2 font-mono">{stats.rejected}</div>
          <div className="text-[11px] text-rose-300/70 mt-1">Did not meet minimum criteria</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#09090e] border border-white/[0.08] rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by instructor name, email, course title, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            {(["all", "pending", "approved", "rejected"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                  statusFilter === st
                    ? st === "pending"
                      ? "bg-amber-500 text-black shadow"
                      : st === "approved"
                      ? "bg-emerald-500 text-black shadow"
                      : st === "rejected"
                      ? "bg-rose-500 text-white shadow"
                      : "bg-white text-black shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="all" className="bg-neutral-900 text-white">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-neutral-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

      </div>

      {/* Applications Content */}
      {isLoading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Loading applications database...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="py-20 text-center bg-[#07070b] border border-white/5 rounded-3xl p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Applications Found</h3>
          <p className="text-xs text-neutral-400 mb-6">
            {searchQuery || statusFilter !== "all"
              ? "No applications matched your active search filters."
              : "No instructor applications have been submitted yet."}
          </p>
          {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredList.map((app) => {
            const isPending = app.status === "pending";
            const isApproved = app.status === "approved";
            const isRejected = app.status === "rejected";

            return (
              <div
                key={app.id}
                className="bg-[#08080d] hover:bg-[#0c0c14] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                {/* Top Status & Date */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                        isApproved
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

                  {/* Applicant Header */}
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

                  {/* Course Proposal Card */}
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

                  {/* Badges / Links Preview */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-neutral-400 font-mono mb-4">
                    {app.sample_video_url && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Video size={10} /> Video Audition
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
                        title="Quick Approve"
                        disabled={actionLoadingId === app.id}
                        onClick={() => handleQuickStatus(app.id, "approved")}
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                      </button>
                    )}

                    {app.status !== "rejected" && (
                      <button
                        title="Quick Reject"
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
