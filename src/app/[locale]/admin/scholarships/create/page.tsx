"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { uploadFileToR2 } from "@/utils/upload";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Save,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  X,
  Globe,
  Award,
  ArrowLeft,
  Building,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Clock,
  BookOpen
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const CONTINENTS = [
  "Global / Remote",
  "Europe",
  "North America",
  "Asia",
  "Australia & Oceania",
  "Middle East",
  "South America",
  "Africa"
];

const DEGREE_PRESETS = [
  "Bachelors",
  "Masters",
  "PhD",
  "Postdoc",
  "Fully Funded",
  "Research Fellowship"
];

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English (EN)" },
  { code: "fa", label: "فارسی (FA)" },
  { code: "ps", label: "پښتو (PS)" },
  { code: "ar", label: "العربية (AR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "fr", label: "Français (FR)" }
];

export default function CreateScholarshipPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    language: currentLocale || "en",
    continent: "Europe",
    country: "",
    university: "",
    degree_level: "Masters, PhD",
    deadline: "",
    description: "",
    eligibility_criteria: "",
    required_documents: "",
    apply_link: "",
    cover_image: "",
    is_active: true
  });

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === slugify(prev.title) ? slugify(val) : prev.slug
    }));
  };

  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Upload image to Cloudflare R2 bucket
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage(null);
    try {
      const publicUrl = await uploadFileToR2(file, "scholarships");
      setFormData(prev => ({ ...prev, cover_image: publicUrl }));
      setMessage({ type: "success", text: "Cover image uploaded successfully to R2 CDN." });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: "error", text: "Error uploading image: " + error.message });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, cover_image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cover_image) {
      setMessage({ type: "error", text: "Please upload an opportunity cover banner first." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("scholarships").insert([
        {
          ...formData,
          translation_group_id: crypto.randomUUID()
        }
      ]);

      if (error) throw error;

      setMessage({ type: "success", text: "Scholarship successfully registered & published!" });
      setTimeout(() => {
        router.push(`/${currentLocale}/admin/scholarships`);
      }, 1200);
    } catch (error: any) {
      setMessage({ type: "error", text: "Error saving scholarship: " + error.message });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 font-sans text-white bg-[#030308] relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-8 relative z-10 animate-in fade-in duration-500">

        {/* Top Header */}
        <header className="bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] p-6 sm:p-8 rounded-3xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Link
              href={`/${currentLocale}/admin/scholarships`}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white transition-all active:scale-95 shrink-0"
              title="Return to scholarships"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-wider mb-2">
                <GraduationCap size={13} />
                <span>Global Opportunities Bureau</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.adminPages.addScholarship}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.adminPages.createGlobalOpportunityDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-blue-400 flex items-center gap-2">
              <Globe size={13} />
              <span>International Directory</span>
            </span>
          </div>
        </header>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all animate-in fade-in ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="font-semibold">{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)} className="text-neutral-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Left 7 Columns: Opportunity Details */}
            <div className="lg:col-span-7 space-y-6">

              {/* General Info Card */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#090913]/90 p-6 sm:p-8 shadow-xl backdrop-blur-2xl space-y-5">
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 border-b border-white/[0.06] pb-3">
                  {t.adminPages.generalInfo}
                </h2>

                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <FileText size={14} /> Opportunity Title
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm font-bold text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                    placeholder="e.g. Fully Funded Oxford Rhodes Scholarship 2027"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <Globe size={14} /> Slug (URL)
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs font-mono text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                      placeholder="oxford-rhodes-2027"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <Globe size={14} /> Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={e => setFormData({ ...formData, language: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#090913] px-3 py-3 text-xs text-white focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                    >
                      {LANGUAGE_OPTIONS.map(opt => (
                        <option key={opt.code} value={opt.code} className="bg-[#090913] text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Continent Chips */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <MapPin size={14} /> {t.adminPages.continent}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CONTINENTS.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setFormData({ ...formData, continent: c })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          formData.continent === c
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm"
                            : "bg-black/40 text-neutral-400 border-white/5 hover:border-white/20"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country & University */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                      {t.teacherPages.country}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                      placeholder="e.g. United Kingdom"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                      {t.adminPages.university}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.university}
                      onChange={e => setFormData({ ...formData, university: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                      placeholder="e.g. Oxford University"
                    />
                  </div>
                </div>

                {/* Degree Level Presets */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <Award size={14} /> {t.adminPages.degreeLevel}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {DEGREE_PRESETS.map(d => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => {
                          const current = formData.degree_level;
                          if (current.includes(d)) {
                            setFormData({ ...formData, degree_level: current.replace(d, "").replace(/^[,\s]+|[,\s]+$/g, "") });
                          } else {
                            setFormData({ ...formData, degree_level: current ? `${current}, ${d}` : d });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          formData.degree_level.includes(d)
                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                            : "bg-black/40 text-neutral-400 border-white/5 hover:border-white/20"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <input
                    required
                    type="text"
                    value={formData.degree_level}
                    onChange={e => setFormData({ ...formData, degree_level: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                    placeholder="e.g. Master, PhD"
                  />
                </div>

                {/* Deadline & Apply Link */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <Calendar size={14} /> {t.adminPages.deadline}
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.deadline}
                      onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <LinkIcon size={14} /> {t.adminPages.applyLink}
                    </label>
                    <input
                      required
                      type="url"
                      value={formData.apply_link}
                      onChange={e => setFormData({ ...formData, apply_link: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Requirements & Description Card */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#090913]/90 p-6 sm:p-8 shadow-xl backdrop-blur-2xl space-y-5">
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 border-b border-white/[0.06] pb-3">
                  {t.adminPages.detailsRequirements}
                </h2>

                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                    Scholarship Overview
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-xs md:text-sm text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all resize-y shadow-inner leading-relaxed"
                    placeholder="Comprehensive overview of stipend, benefits, tuition waiver..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                    {t.adminPages.eligibilityCriteria}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.eligibility_criteria}
                    onChange={e => setFormData({ ...formData, eligibility_criteria: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-xs md:text-sm text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all resize-y shadow-inner leading-relaxed"
                    placeholder="Academic GPA, nationality eligibility, language test scores..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">
                    {t.adminPages.requiredDocuments}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.required_documents}
                    onChange={e => setFormData({ ...formData, required_documents: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-xs md:text-sm text-white placeholder-neutral-600 focus:border-blue-400 focus:outline-none transition-all resize-y shadow-inner leading-relaxed"
                    placeholder="Passport, Academic Transcripts, Statement of Purpose, Recommendation Letters..."
                  />
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Cover Image, Live Card Preview & Publishing */}
            <div className="lg:col-span-5 space-y-6">

              {/* Cover Image Upload Box */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#090913]/90 p-6 sm:p-7 shadow-xl backdrop-blur-2xl space-y-4">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <ImageIcon size={14} /> Opportunity Cover Image
                </label>

                <div className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-black/40 hover:bg-black/60 hover:border-blue-500/30 transition-all flex flex-col items-center justify-center overflow-hidden group shadow-inner">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-3 text-blue-400">
                      <Loader2 size={32} className="animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Uploading to R2...
                      </span>
                    </div>
                  ) : formData.cover_image ? (
                    <>
                      <img
                        src={formData.cover_image}
                        alt="Cover Preview"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-xs font-bold text-white hover:bg-white/30 transition-all border border-white/10"
                        >
                          Change Cover
                        </button>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="rounded-full bg-rose-500/20 backdrop-blur-md px-5 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/40 transition-all border border-rose-500/20 flex items-center gap-1"
                        >
                          <X size={13} /> Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-3 text-neutral-500 group-hover:text-blue-400 transition-colors cursor-pointer p-6 w-full h-full justify-center"
                    >
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                        <UploadCloud size={28} />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-white">{t.adminPages.clickToUploadCover}</p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">PNG, JPG, WEBP (Max 10MB)</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Live Student-Facing Card Preview */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#090913]/90 p-6 shadow-xl backdrop-blur-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-blue-400" /> Student View Live Preview
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">Responsive Card</span>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-black/60 overflow-hidden shadow-2xl group">
                  <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                    {formData.cover_image ? (
                      <img src={formData.cover_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                        No cover banner
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-blue-400 border border-white/10">
                      {formData.continent || "Global"}
                    </span>
                    {formData.deadline && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/80 backdrop-blur-md text-white font-mono">
                        Deadline: {formData.deadline}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                      <span>{formData.university || "University"}</span>
                      {formData.country && (
                        <>
                          <span>&bull;</span>
                          <span>{formData.country}</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-base font-black text-white line-clamp-2 leading-snug">
                      {formData.title || "Scholarship Opportunity Title"}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {formData.description || "Brief overview of the scholarship..."}
                    </p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold truncate max-w-[150px]">
                        {formData.degree_level || "Any Degree"}
                      </span>
                      <span className="px-4 py-1.5 rounded-xl bg-blue-500 text-black font-black text-[10px] uppercase tracking-wider">
                        Apply Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Toggle & Submit */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#090913]/90 p-6 sm:p-7 shadow-xl backdrop-blur-2xl space-y-5">
                <div
                  className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5 cursor-pointer"
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{t.adminPages.setAsActive}</span>
                    <span className="text-[10px] text-neutral-500">{t.adminPages.visibleOnWebsite}</span>
                  </div>
                  <div
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300 ${
                      formData.is_active ? "bg-blue-500" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${
                        formData.is_active ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(59,130,246,0.25)] active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Saving Opportunity...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Publish Scholarship</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </form>

      </div>
    </main>
  );
}