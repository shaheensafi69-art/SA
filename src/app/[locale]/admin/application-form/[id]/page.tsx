"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import Link from "next/link";
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  FileText,
  Mail,
  Phone,
  Globe,
  Calendar,
  ExternalLink,
  Download,
  Save,
  Check,
  AlertCircle,
  Loader2,
  Award,
  Sparkles,
  BookOpen,
  User,
  ShieldCheck,
  Send,
  Eye,
  Maximize2,
  Copy,
  Star,
  Layers,
  HelpCircle,
  X
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

export default function AdminApplicationDetailPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [application, setApplication] = useState<InstructorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionModal, setActionModal] = useState<"approve" | "reject" | null>(null);
  const [modalNotes, setModalNotes] = useState("");
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/application-form?id=${id}&_t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
          }
        });
        const data = await res.json();
        if (data.application) {
          setApplication(data.application);
          setAdminNotes(data.application.admin_notes || "");
        } else {
          setFeedback({ text: data.error || "Application not found in database.", type: "error" });
        }
      } catch (err: any) {
        console.error("Fetch detail error:", err);
        setFeedback({ text: "Failed to load candidate details.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  const handleCopyEmail = () => {
    if (!application?.email) return;
    navigator.clipboard.writeText(application.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Handle Quick Save Notes
  const handleSaveNotes = async () => {
    if (!application) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: application.id,
          status: application.status,
          adminNotes
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFeedback({ text: "Evaluation notes saved successfully to registry.", type: "success" });
    } catch (err: any) {
      setFeedback({ text: err.message || "Failed to save notes.", type: "error" });
    } finally {
      setIsUpdating(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Process Approval or Rejection Decision
  const handleDecision = async (newStatus: "approved" | "rejected") => {
    if (!application) return;
    setIsUpdating(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/application-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: application.id,
          status: newStatus,
          adminNotes: modalNotes || adminNotes
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to process decision");
      }

      setApplication(prev => prev ? { ...prev, status: newStatus, reviewed_at: new Date().toISOString() } : null);
      setActionModal(null);
      setFeedback({
        text: data.message || (newStatus === "approved"
          ? "Candidate APPROVED! Automated faculty welcome email with onboarding link has been dispatched."
          : "Candidate REJECTED. A respectful consideration email has been sent."),
        type: data.emailResult?.success ? "success" : "error"
      });
    } catch (err: any) {
      console.error("Decision error:", err);
      setFeedback({ text: err.message || "Failed to update decision.", type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper for embeddable video URL
  const getEmbedVideoUrl = (url: string | null) => {
    if (!url) return null;
    try {
      const cleanUrl = url.trim();

      // Direct Video files (Cloudflare R2 or mp4/webm/mov)
      if (
        cleanUrl.includes("/instructor_video/") ||
        cleanUrl.endsWith(".mp4") ||
        cleanUrl.endsWith(".webm") ||
        cleanUrl.endsWith(".mov") ||
        cleanUrl.endsWith(".m4v")
      ) {
        return cleanUrl;
      }

      // YouTube Embed
      if (cleanUrl.includes("youtube.com/watch") || cleanUrl.includes("youtu.be/")) {
        let videoId = "";
        if (cleanUrl.includes("v=")) {
          videoId = cleanUrl.split("v=")[1]?.split("&")[0];
        } else if (cleanUrl.includes("youtu.be/")) {
          videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      // Loom Embed
      if (cleanUrl.includes("loom.com/share/")) {
        const videoId = cleanUrl.split("loom.com/share/")[1]?.split("?")[0];
        return videoId ? `https://www.loom.com/embed/${videoId}` : null;
      }

      // Google Drive Preview Embed
      if (cleanUrl.includes("drive.google.com/file/d/")) {
        const fileId = cleanUrl.split("/d/")[1]?.split("/")[0];
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
      }

      return cleanUrl;
    } catch (e) {
      return url;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#030308]">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Decrypting Candidate Dossier...
        </span>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen p-10 text-center text-white flex flex-col items-center justify-center bg-[#030308]">
        <AlertCircle className="w-14 h-14 text-rose-500 mb-3" />
        <h2 className="text-2xl font-black">{t.adminPages.applicationNotFound}</h2>
        <p className="text-xs text-neutral-400 mt-2 mb-6 max-w-sm">{t.adminPages.candidateDossierNotExist}</p>
        <Link
          href={`/${currentLocale}/admin/application-form`}
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Return to Applications List
        </Link>
      </div>
    );
  }

  const isApproved = application.status === "approved";
  const isRejected = application.status === "rejected";
  const isPending = application.status === "pending";
  const embedVideoUrl = getEmbedVideoUrl(application.sample_video_url);

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-screen text-white font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Top Navigation & Status Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <button
              onClick={() => router.push(`/${currentLocale}/admin/application-form`)}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white transition-all active:scale-95 shrink-0"
              title="Return to pipeline"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {application.first_name} {application.last_name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    isApproved
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : isRejected
                      ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {isApproved && <CheckCircle2 size={13} />}
                  {isRejected && <XCircle size={13} />}
                  {isPending && <Clock size={13} className="animate-spin" />}
                  <span>{application.status}</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-2 font-mono">
                <span className="text-amber-400/80">DOSSIER ID: {application.id.slice(0, 8).toUpperCase()}</span>
                <span>&bull;</span>
                <span>Submitted: {new Date(application.created_at).toLocaleDateString()}</span>
                {application.reviewed_at && (
                  <>
                    <span>&bull;</span>
                    <span className="text-neutral-400">
                      Reviewed: {new Date(application.reviewed_at).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Major Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActionModal("reject")}
              disabled={isUpdating}
              className={`px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                isRejected
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30 opacity-70 cursor-not-allowed"
                  : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 hover:scale-105 active:scale-95"
              }`}
            >
              <XCircle size={15} />
              <span>{t.adminPages.rejectCandidate}</span>
            </button>

            <button
              onClick={() => setActionModal("approve")}
              disabled={isUpdating}
              className={`px-6 py-3 rounded-2xl text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                isApproved
                  ? "bg-emerald-500 text-black cursor-not-allowed opacity-90"
                  : "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 shadow-amber-500/20 hover:scale-105 active:scale-95"
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{isApproved ? "Approved Faculty Member" : "Approve & Send Activation Link"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="font-semibold">{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-neutral-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Grid: Left Column Dossier & Right Column Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Personal Identity, Contact & Resume */}
        <div className="lg:col-span-4 space-y-6">

          {/* Identity Card */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <div
                onClick={() => setShowPhotoModal(true)}
                className="w-28 h-28 rounded-3xl border-2 border-amber-500/40 overflow-hidden relative group cursor-pointer shadow-2xl mb-4 bg-neutral-900"
              >
                {application.avatar_url ? (
                  <img
                    src={application.avatar_url}
                    alt={application.first_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-3xl font-black text-amber-400">
                    {application.first_name?.[0]}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Maximize2 size={18} className="text-white" />
                </div>
              </div>

              <h2 className="text-xl font-black text-white">
                {application.first_name} {application.last_name}
              </h2>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-1 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {application.category || "General Faculty"}
              </span>
            </div>

            {/* Contact Details List */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Mail size={14} className="text-neutral-500" /> Email
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${application.email}`}
                    className="font-mono text-white hover:text-amber-400 transition-colors truncate max-w-[150px]"
                  >
                    {application.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="text-neutral-500 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Phone size={14} className="text-neutral-500" /> WhatsApp / Phone
                </span>
                {application.phone ? (
                  <a
                    href={`https://wa.me/${application.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>{application.phone}</span>
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-neutral-500 font-mono">{t.adminPages.notProvided}</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Globe size={14} className="text-neutral-500" /> Country
                </span>
                <span className="text-white font-medium">{application.country || "Not specified"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Calendar size={14} className="text-neutral-500" /> Date of Birth
                </span>
                <span className="text-neutral-300 font-mono">{application.date_of_birth || "Not specified"}</span>
              </div>

              {application.portfolio_url && (
                <div className="pt-2">
                  <a
                    href={application.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>{t.adminPages.viewPortfolio}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Resume & CV Document Viewer */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <FileText size={16} className="text-purple-400" />
                <span>{t.adminPages.curriculumVitae}</span>
              </h3>
              {application.resume_url && (
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-bold"
                >
                  <span>Open Full PDF</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {application.resume_url ? (
              <div className="space-y-3">
                <div className="w-full h-80 rounded-2xl border border-white/10 bg-black/60 overflow-hidden relative shadow-inner">
                  <iframe
                    src={`${application.resume_url}#toolbar=0`}
                    title="Candidate Resume"
                    className="w-full h-full border-0"
                  />
                </div>

                <a
                  href={application.resume_url}
                  target="_blank"
                  download
                  className="w-full py-3 px-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/10 active:scale-95"
                >
                  <Download size={14} />
                  <span>{t.adminPages.downloadCv}</span>
                </a>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 text-center text-xs text-neutral-500">
                No resume document attached to this candidate record.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Course Proposal, Bio, Audition Video & Notes */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. Proposed Course Proposal Card */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[11px] font-mono uppercase font-black text-amber-400 tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} /> Proposed Curriculum Proposal
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                  {application.course_title}
                </h2>
              </div>
              <span className="inline-block px-3.5 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider shrink-0">
                {application.category}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">{t.adminPages.teachingFormat}</span>
                <span className="text-xs font-black text-white mt-1 block truncate">{application.teaching_format || "Hybrid Classroom"}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">{t.adminPages.instructionLanguage}</span>
                <span className="text-xs font-black text-white mt-1 block truncate">{application.language || "English"}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">{t.adminPages.teachingExperience}</span>
                <span className="text-xs font-black text-white mt-1 block truncate">{application.experience_level || "Seasoned Instructor"}</span>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-2">
                Course Syllabus & Pedagogical Goals
              </h4>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                {application.course_description || "No specific course syllabus provided by candidate."}
              </div>
            </div>
          </div>

          {/* 2. Professional Biography & Achievements */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <div className="pb-4 border-b border-white/[0.06]">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <User size={16} className="text-amber-400" />
                <span>{t.adminPages.professionalBioQualifications}</span>
              </h3>
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-2 block">
                Educator Biography
              </span>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {application.bio || "No professional biography provided."}
              </div>
            </div>

            {application.achievements && (
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 mb-2 block flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" /> Notable Achievements & Industry Impact
                </span>
                <div className="p-5 rounded-2xl bg-amber-500/[0.02] border border-amber-500/20 text-xs md:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {application.achievements}
                </div>
              </div>
            )}
          </div>

          {/* 3. Audition & Sample Video Player */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2 uppercase tracking-wider">
                  <Video size={18} className="text-blue-400" />
                  <span>{t.adminPages.auditionLectureVideo}</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Sample teaching demonstration provided for pedagogical rigor and vocal clarity assessment.
                </p>
              </div>
            </div>

            {application.sample_video_url ? (
              <div className="space-y-4">
                {embedVideoUrl ? (
                  embedVideoUrl.includes("/instructor_video/") ||
                  embedVideoUrl.endsWith(".mp4") ||
                  embedVideoUrl.endsWith(".webm") ||
                  embedVideoUrl.endsWith(".mov") ||
                  embedVideoUrl.endsWith(".m4v") ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                      <video
                        src={embedVideoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                      <iframe
                        src={embedVideoUrl}
                        title="Audition Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  )
                ) : (
                  <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-sm font-bold text-white">{t.adminPages.auditionLectureVideo}</div>
                      <div className="text-xs text-neutral-400 font-mono break-all">
                        {application.sample_video_url}
                      </div>
                    </div>
                    <a
                      href={application.sample_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-black font-black text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                    >
                      <span>{t.common.view}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 text-center text-xs text-neutral-500">
                No audition video demonstration was submitted with this application.
              </div>
            )}
          </div>

          {/* 4. Admissions Committee Internal Notes */}
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-400" />
                <span>{t.adminPages.admissionsCommitteeNotes}</span>
              </h3>
            </div>

            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={4}
              placeholder={t.adminPages.admissionsNotesPlaceholder}
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white text-xs md:text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                disabled={isUpdating}
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50 active:scale-95 shadow-md"
              >
                <Save size={14} />
                <span>{t.adminPages.saveNotes}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Decision Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => !isUpdating && setActionModal(null)}
          />
          <div className="relative w-full max-w-lg bg-[#0c0c16] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    actionModal === "approve"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {actionModal === "approve" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {actionModal === "approve" ? "Confirm Faculty Appointment" : "Decline Candidate Application"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Candidate: {application.first_name} {application.last_name}
                  </p>
                </div>
              </div>
              <button
                disabled={isUpdating}
                onClick={() => setActionModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-2">
              <p className="font-semibold text-white">
                {actionModal === "approve"
                  ? "An automated welcome invitation with educator portal credentials will be dispatched to:"
                  : "A respectful decline email will be dispatched to:"}
              </p>
              <p className="font-mono text-amber-400 font-bold">{application.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Evaluation Notes / Comments
              </label>
              <textarea
                value={modalNotes}
                onChange={e => setModalNotes(e.target.value)}
                placeholder="Include feedback or notes recorded in the committee dossier..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={isUpdating}
                onClick={() => setActionModal(null)}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={() => handleDecision(actionModal === "approve" ? "approved" : "rejected")}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                  actionModal === "approve"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20"
                    : "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20"
                }`}
              >
                {isUpdating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Confirm & Send Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {showPhotoModal && application.avatar_url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowPhotoModal(false)} />
          <div className="relative z-10 max-w-lg w-full bg-[#0a0a14] border border-white/10 rounded-3xl overflow-hidden p-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-bold text-neutral-300">
                {application.first_name} {application.last_name}
              </span>
              <button onClick={() => setShowPhotoModal(false)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <img
              src={application.avatar_url}
              alt={application.first_name}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      )}

    </div>
  );
}