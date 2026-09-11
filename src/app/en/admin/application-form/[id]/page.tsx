"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Maximize2
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

  useEffect(() => {
    async function fetchDetails() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/application-form?id=${id}`);
        const data = await res.json();
        if (data.application) {
          setApplication(data.application);
          setAdminNotes(data.application.admin_notes || "");
        } else {
          setFeedback({ text: "Application not found in database.", type: "error" });
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
      setFeedback({ text: "Internal evaluation notes saved successfully.", type: "success" });
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
        text: newStatus === "approved"
          ? "Candidate APPROVED! Automated faculty welcome email with onboarding link has been dispatched."
          : "Candidate REJECTED. A respectful, emotional consideration email has been sent.",
        type: "success"
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

      // 1. Direct Video files (Cloudflare R2 instructor_video or direct extensions)
      if (
        cleanUrl.includes("/instructor_video/") ||
        cleanUrl.endsWith(".mp4") ||
        cleanUrl.endsWith(".webm") ||
        cleanUrl.endsWith(".mov") ||
        cleanUrl.endsWith(".m4v")
      ) {
        return cleanUrl;
      }

      // 2. YouTube Embed
      if (cleanUrl.includes("youtube.com/watch") || cleanUrl.includes("youtu.be/")) {
        let videoId = "";
        if (cleanUrl.includes("v=")) {
          videoId = cleanUrl.split("v=")[1]?.split("&")[0];
        } else if (cleanUrl.includes("youtu.be/")) {
          videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      // 3. Loom Embed
      if (cleanUrl.includes("loom.com/share/")) {
        const videoId = cleanUrl.split("loom.com/share/")[1]?.split("?")[0];
        return videoId ? `https://www.loom.com/embed/${videoId}` : null;
      }

      // 4. Google Drive Preview Embed
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
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Decrypting Candidate Dossier...
        </span>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen p-10 text-center text-white">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-2xl font-black">Application Not Found</h2>
        <p className="text-xs text-neutral-400 mt-2 mb-6">The requested candidate dossier does not exist.</p>
        <Link
          href="/en/admin/application-form"
          className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider"
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-screen text-white font-sans">

      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/en/admin/application-form")}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {application.first_name} {application.last_name}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${isApproved
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : isRejected
                    ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  }`}
              >
                {isApproved && <CheckCircle2 size={13} />}
                {isRejected && <XCircle size={13} />}
                {isPending && <Clock size={13} />}
                <span>{application.status}</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1 font-mono">
              <span>REF: APP-{application.id.slice(0, 8).toUpperCase()}</span>
              <span>&bull;</span>
              <span>Submitted: {new Date(application.created_at).toLocaleDateString()}</span>
              {application.reviewed_at && (
                <>
                  <span>&bull;</span>
                  <span className="text-neutral-500">
                    Reviewed: {new Date(application.reviewed_at).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Major Action Buttons: APPROVE & REJECT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActionModal("reject")}
            disabled={isUpdating}
            className={`px-5 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${isRejected
              ? "bg-rose-500/10 text-rose-400 border-rose-500/30 opacity-70 cursor-not-allowed"
              : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 hover:scale-105 active:scale-95"
              }`}
          >
            <XCircle size={15} />
            <span>Reject Candidate</span>
          </button>

          <button
            onClick={() => setActionModal("approve")}
            disabled={isUpdating}
            className={`px-6 py-2.5 rounded-xl text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${isApproved
              ? "bg-emerald-500/80 text-black cursor-not-allowed opacity-90"
              : "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 shadow-amber-500/20 hover:scale-105 active:scale-95"
              }`}
          >
            <CheckCircle2 size={15} />
            <span>{isApproved ? "Approved Faculty Member" : "Approve & Send Onboarding Link"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs md:text-sm flex items-center gap-3 transition-all ${feedback.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
        >
          {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold">{feedback.text}</span>
        </div>
      )}

      {/* Main Grid: Left Column Dossier & Right Column Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Personal Identity, Contact & Resume */}
        <div className="lg:col-span-4 space-y-6">

          {/* Identity Card */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <div
                onClick={() => setShowPhotoModal(true)}
                className="w-28 h-28 rounded-3xl border-2 border-amber-500/40 overflow-hidden relative group cursor-pointer shadow-xl mb-4 bg-neutral-900"
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

              <h2 className="text-xl font-bold text-white">
                {application.first_name} {application.last_name}
              </h2>
              <span className="text-xs text-amber-400 font-mono mt-0.5">
                {application.category}
              </span>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Mail size={14} className="text-neutral-500" /> Email
                </span>
                <a
                  href={`mailto:${application.email}`}
                  className="font-mono text-white hover:text-amber-400 transition-colors truncate max-w-[180px]"
                >
                  {application.email}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Phone size={14} className="text-neutral-500" /> Phone / WA
                </span>
                {application.phone ? (
                  <a
                    href={`https://wa.me/${application.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-400 hover:underline"
                  >
                    {application.phone}
                  </a>
                ) : (
                  <span className="text-neutral-500 font-mono">Not provided</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Globe size={14} className="text-neutral-500" /> Country
                </span>
                <span className="text-white font-medium">{application.country || "Not specified"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
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
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View LinkedIn / Portfolio</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Resume & CV Document Viewer ("رسو لیتر پریویو خوب داشته باشد") */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <FileText size={16} className="text-purple-400" />
                <span>Curriculum Vitae (CV)</span>
              </h3>
              {application.resume_url && (
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Open Full</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {application.resume_url ? (
              <div className="space-y-3">
                {/* Embedded PDF Viewer */}
                <div className="w-full h-80 rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative">
                  <iframe
                    src={`${application.resume_url}#toolbar=0`}
                    title="Candidate Resume"
                    className="w-full h-full border-0"
                  />
                </div>

                <a
                  href={application.resume_url}
                  download
                  className="w-full py-3 px-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-500/10"
                >
                  <Download size={14} />
                  <span>Download Candidate CV / Resume</span>
                </a>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 text-center text-xs text-neutral-500">
                No resume document attached to this application.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Course Proposal, Bio, Audition Video & Notes */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. Proposed Course Proposal Card */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-amber-400 tracking-wider">
                  Proposed Course Curriculum
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                  {application.course_title}
                </h2>
              </div>
              <span className="inline-block px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider shrink-0">
                {application.category}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Teaching Format</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.teaching_format || "Hybrid"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Instruction Language</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{application.language || "English"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Teaching Experience</span>
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

          {/* 3. Audition & Sample Video Player ("بخش ویدیو پریویو داشته باشد") */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Video size={18} className="text-blue-400" />
                  <span>Audition Lecture & Demonstration Video</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Sample teaching demonstration provided by the instructor for pedagogical assessment.
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

          {/* 4. Admissions Committee Internal Notes */}
          <div className="bg-[#08080d] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span>Admissions Committee Notes</span>
              </h3>
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

      {/* Confirmation & Email Preview Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e17] border border-white/15 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${actionModal === "approve"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  }`}
              >
                {actionModal === "approve" ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {actionModal === "approve" ? "Confirm Faculty Appointment" : "Confirm Application Rejection"}
                </h3>
                <p className="text-xs text-neutral-400">
                  Recipient: <strong className="text-white">{application.email}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 leading-relaxed">
              {actionModal === "approve" ? (
                <div className="space-y-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} /> Automated Onboarding Email
                  </div>
                  <p>
                    An official congratulatory email containing their personal onboarding setup link (<code>/en/teacher-onboarding?appId=...</code>) will be dispatched from your connected domain.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-rose-400 font-bold flex items-center gap-1.5">
                    <HeartIcon /> Emotional & Respectful Rejection Letter
                  </div>
                  <p>
                    An inspiring, heartfelt letter thanking them for their bravery, praising their course concept, explaining capacity limits, and keeping their file in priority registry will be dispatched.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-400 block mb-2 uppercase tracking-wider">
                Optional Custom Note to Candidate (Included in Email)
              </label>
              <textarea
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
                rows={3}
                placeholder={actionModal === "approve" ? "e.g. Welcome aboard! We loved your section on Agora RTC." : "e.g. Your credentials in software engineering were exceptional."}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleDecision(actionModal === "approve" ? "approved" : "rejected")}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${actionModal === "approve"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20"
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
                    <span>{actionModal === "approve" ? "Approve & Dispatch Invite" : "Send Rejection Letter"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Zoom Modal */}
      {showPhotoModal && application.avatar_url && (
        <div
          onClick={() => setShowPhotoModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative bg-black">
            <img
              src={application.avatar_url}
              alt="High Resolution Profile"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

    </div>
  );
}

function HeartIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-rose-400 inline" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
