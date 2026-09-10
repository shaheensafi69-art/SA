"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Video, 
  FileText, 
  ExternalLink, 
  Download, 
  Award, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Save, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  BookOpen, 
  Layers,
  MessageCircle,
  Share2,
  Check,
  Maximize2
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ApplicationItem } from "../page";

// Helper to convert standard YouTube links to embed format
function getYouTubeEmbedUrl(url: string = ""): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const applicationId = resolvedParams.id;

  const [application, setApplication] = useState<ApplicationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [linkedProfile, setLinkedProfile] = useState<any>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("instructor_applications")
          .select("*")
          .eq("id", applicationId)
          .single();

        if (error || !data) {
          // Try fetching via API as backup
          const res = await fetch(`/api/admin/application-form?id=${applicationId}`);
          const apiData = await res.json();
          if (apiData.application) {
            setApplication(apiData.application);
            setAdminNotes(apiData.application.admin_notes || "");
            if (apiData.application.user_id) {
              fetchLinkedUser(apiData.application.user_id);
            }
          }
        } else {
          setApplication(data as ApplicationItem);
          setAdminNotes(data.admin_notes || "");
          if (data.user_id) {
            fetchLinkedUser(data.user_id);
          }
        }
      } catch (err) {
        console.error("Error loading application dossier:", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchLinkedUser(userId: string) {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, role, created_at")
          .eq("id", userId)
          .single();
        if (data) setLinkedProfile(data);
      } catch (e) {
        console.warn("Could not fetch linked profile:", e);
      }
    }

    loadData();
  }, [applicationId]);

  const handleUpdateStatus = async (newStatus: "approved" | "rejected" | "pending") => {
    const actionVerb = newStatus === "approved" ? "APPROVE and grant Faculty status" : newStatus === "rejected" ? "REJECT" : "RESET to Pending";
    if (!confirm(`Are you sure you want to ${actionVerb} for this candidate?`)) return;

    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: applicationId,
          status: newStatus,
          adminNotes
        })
      });

      const data = await res.json();
      if (data.success && data.application) {
        setApplication(data.application);
        alert(`Application successfully marked as ${newStatus.toUpperCase()}`);
        if (newStatus === "approved" && linkedProfile) {
          setLinkedProfile((prev: any) => ({ ...prev, role: "teacher" }));
        }
      } else {
        alert(data.error || "Failed to update application");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsUpdating(true);
    setNotesSaved(false);
    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: applicationId,
          status: application?.status || "pending",
          adminNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 3000);
      }
    } catch (err) {
      console.error("Notes save failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this application? This action cannot be reversed.")) return;
    try {
      const res = await fetch(`/api/admin/application-form?id=${applicationId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        router.push("/en/admin/application-form");
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4 text-white">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Loading Candidate Dossier...
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex-1 min-h-screen bg-[#030305] flex flex-col items-center justify-center p-8 text-white text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Application Dossier Not Found</h2>
        <p className="text-sm text-neutral-400 mb-6">The requested instructor application ID does not exist in the database.</p>
        <Link
          href="/en/admin/application-form"
          className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold transition-colors"
        >
          Return to Applications List
        </Link>
      </div>
    );
  }

  const isApproved = application.status === "approved";
  const isRejected = application.status === "rejected";
  const isPending = application.status === "pending";
  const embedYoutubeUrl = getYouTubeEmbedUrl(application.sample_video_url || "");

  // Clean WhatsApp number
  const cleanPhone = application.phone ? application.phone.replace(/[^0-9]/g, "") : "";

  return (
    <div className="flex-1 overflow-y-auto bg-[#030305] text-white p-6 md:p-10 min-h-screen">
      
      {/* Back Button & Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
        <Link
          href="/en/admin/application-form"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Applications</span>
        </Link>

        {/* Action Decision Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {isPending && (
            <>
              <button
                disabled={isUpdating}
                onClick={() => handleUpdateStatus("approved")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>Approve & Grant Faculty</span>
              </button>

              <button
                disabled={isUpdating}
                onClick={() => handleUpdateStatus("rejected")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                <XCircle size={16} />
                <span>Reject</span>
              </button>
            </>
          )}

          {isApproved && (
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("pending")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Clock size={14} />
              <span>Reset to Pending</span>
            </button>
          )}

          {isRejected && (
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("approved")}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition-all shadow-md shadow-emerald-500/10 disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              <span>Re-Approve Candidate</span>
            </button>
          )}

          <button
            onClick={handleDelete}
            title="Delete application permanently"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-white/5 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900/90 via-[#0a0a12] to-[#07070c] border border-white/10 rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            {/* Avatar with click to zoom */}
            <div 
              onClick={() => application.avatar_url && setShowPhotoModal(true)}
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-neutral-800 border-2 border-amber-500/30 overflow-hidden shrink-0 relative group cursor-pointer shadow-xl shadow-amber-500/10"
            >
              {application.avatar_url ? (
                <>
                  <img
                    src={application.avatar_url}
                    alt={application.first_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                    <Maximize2 size={18} />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-3xl font-black text-amber-400">
                  {application.first_name?.[0]}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {application.first_name} {application.last_name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                    isApproved
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : isRejected
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse"
                  }`}
                >
                  {isApproved && <CheckCircle2 size={13} />}
                  {isRejected && <XCircle size={13} />}
                  {isPending && <Clock size={13} />}
                  <span>{application.status}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <span className="font-mono text-amber-400/90 font-semibold">
                  Ref: APP-{application.id.slice(0, 8).toUpperCase()}
                </span>
                <span>•</span>
                <span>Submitted: {new Date(application.created_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                {application.reviewed_at && (
                  <>
                    <span>•</span>
                    <span className="text-neutral-500">Reviewed: {new Date(application.reviewed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">Target Category</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs">
              {application.category}
            </span>
          </div>

        </div>
      </div>

      {/* Main Grid: Left Column (Profile & Metadata) / Right Column (Proposal, Media, Files, Notes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= LEFT COLUMN: CONTACT & CANDIDATE DATA ================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Contact Details Card */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 pb-3 border-b border-white/[0.06] flex items-center justify-between">
              <span>Personal Dossier</span>
              <User size={14} className="text-amber-400" />
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-neutral-500 block mb-0.5">Email Address</span>
                <a 
                  href={`mailto:${application.email}`}
                  className="font-semibold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Mail size={13} className="text-neutral-400" />
                  <span className="break-all">{application.email}</span>
                </a>
              </div>

              <div>
                <span className="text-neutral-500 block mb-0.5">Phone / WhatsApp</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white font-mono">
                    {application.phone || "Not provided"}
                  </span>
                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-500/25 transition-colors"
                    >
                      <MessageCircle size={12} /> WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block mb-0.5">Country of Residence</span>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Globe size={13} className="text-neutral-400" />
                  <span>{application.country || "Not specified"}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block mb-0.5">Date of Birth</span>
                <div className="font-semibold text-white flex items-center gap-1.5 font-mono">
                  <Calendar size={13} className="text-neutral-400" />
                  <span>{application.date_of_birth || "Not provided"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Linkage Status */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 pb-3 border-b border-white/[0.06] flex items-center justify-between">
              <span>Safi Academy Account</span>
              <ShieldCheck size={14} className="text-emerald-400" />
            </h3>

            {linkedProfile ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span className="font-bold">Linked to User Profile</span>
                </div>
                <div className="text-neutral-300">
                  <span className="text-neutral-500">Current Role:</span>{" "}
                  <strong className="text-white uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-[10px]">
                    {linkedProfile.role}
                  </strong>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 break-all">
                  User ID: {linkedProfile.id}
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 space-y-2">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-neutral-400">
                  Guest Applicant (Not logged in at submission)
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Upon approval, an invitation or account can be provisioned using their email <code className="text-neutral-300 font-mono">{application.email}</code>.
                </p>
              </div>
            )}
          </div>

          {/* CV / Resume Document Card */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 pb-3 border-b border-white/[0.06] flex items-center justify-between">
              <span>Resume / CV Document</span>
              <FileText size={14} className="text-purple-400" />
            </h3>

            {application.resume_url ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">Curriculum Vitae (CV)</div>
                    <div className="text-[10px] text-purple-300/80 font-mono mt-0.5">Uploaded PDF / DOCX</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
                  >
                    <ExternalLink size={13} /> Open
                  </a>
                  <a
                    href={application.resume_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-extrabold transition-colors shadow-md shadow-purple-500/20"
                  >
                    <Download size={13} /> Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-500 py-3 text-center">
                No external document attached.
              </div>
            )}
          </div>

          {/* Portfolio & External Links */}
          {application.portfolio_url && (
            <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-3 shadow-xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 pb-3 border-b border-white/[0.06]">
                Portfolio / Social
              </h3>
              <a
                href={application.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-xs text-amber-400 font-bold transition-colors group"
              >
                <span className="truncate mr-2">{application.portfolio_url}</span>
                <ExternalLink size={14} className="shrink-0 text-neutral-400 group-hover:text-amber-400" />
              </a>
            </div>
          )}

        </div>

        {/* ================= RIGHT COLUMN: COURSE PROPOSAL, BIO, VIDEO & NOTES ================= */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Proposed Course & Teaching Details */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  Proposed Curriculum
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
                  {application.course_title}
                </h2>
              </div>
              <BookOpen size={24} className="text-amber-400 shrink-0" />
            </div>

            {/* Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Category</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.category}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Format</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.teaching_format || "Hybrid"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Language</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.language || "English"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Experience</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.experience_level || "Not specified"}</span>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Course Overview & Learning Objectives
              </h4>
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                {application.course_description || "No specific course overview provided by candidate."}
              </div>
            </div>
          </div>

          {/* 2. Professional Biography & Achievements */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="pb-4 border-b border-white/[0.06]">
              <h3 className="text-lg font-bold text-white">Professional Biography & Qualifications</h3>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Biography
              </span>
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {application.bio || "No biography provided."}
              </div>
            </div>

            {application.achievements && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 block flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" /> Key Achievements & Industry Projects
                </span>
                <div className="p-5 rounded-2xl bg-amber-500/[0.02] border border-amber-500/20 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {application.achievements}
                </div>
              </div>
            )}
          </div>

          {/* 3. Audition & Sample Video Player ("ویدیو") */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Video size={18} className="text-blue-400" />
                  <span>Audition Lecture & Demonstration Video</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Sample teaching material provided by the instructor for pedagogical review.
                </p>
              </div>
            </div>

            {application.sample_video_url ? (
              <div className="space-y-4">
                {embedYoutubeUrl ? (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <iframe
                      src={embedYoutubeUrl}
                      title="Audition Lecture"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-sm font-bold text-white">External Video Link Available</div>
                      <div className="text-xs text-neutral-400 font-mono break-all">
                        {application.sample_video_url}
                      </div>
                    </div>
                    <a
                      href={application.sample_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                    >
                      <span>Watch Demo Video</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 text-center text-xs text-neutral-500">
                No audition video link was submitted with this application.
              </div>
            )}
          </div>

          {/* 4. Internal Admin Evaluation & Review Notes */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span>Admissions Committee Notes</span>
              </h3>
              {notesSaved && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check size={14} /> Notes Saved
                </span>
              )}
            </div>

            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={4}
              placeholder="Add internal evaluation feedback, interview dates, agreed revenue share, or reasons for acceptance/rejection..."
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs md:text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                disabled={isUpdating}
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                <span>Save Notes</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Photo Modal Zoom */}
      {showPhotoModal && application.avatar_url && (
        <div 
          onClick={() => setShowPhotoModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative">
            <img
              src={application.avatar_url}
              alt="High Resolution Avatar"
              className="w-full h-full object-contain max-h-[85vh] bg-black"
            />
          </div>
        </div>
      )}

    </div>
  );
}
