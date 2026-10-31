"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { uploadFileToR2 } from "@/utils/upload";
import Link from "next/link";
import {
  PenTool,
  Image as ImageIcon,
  Globe,
  Tag,
  Save,
  User,
  FileText,
  UploadCloud,
  Loader2,
  X,
  ArrowLeft,
  Eye,
  Columns,
  Code,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Quote,
  List,
  Link2,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English (EN)" },
  { code: "fa", label: "فارسی (FA)" },
  { code: "ps", label: "پښتو (PS)" },
  { code: "ar", label: "العربية (AR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "fr", label: "Français (FR)" },
  { code: "ru", label: "Русский (RU)" },
  { code: "tr", label: "Türkçe (TR)" }
];

export default function CreateBlogPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">("edit");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    language: currentLocale || "en",
    category: "",
    author_name: "",
    cover_image: "",
    content: "",
    is_published: true
  });

  // Auto generate slug from title if slug not manually edited
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
      const publicUrl = await uploadFileToR2(file, "Blog");
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

  // Markdown Quick Format Inserter
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = prefix + selectedText + suffix;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // Word count & Reading time
  const readingStats = useMemo(() => {
    const words = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, minutes };
  }, [formData.content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cover_image) {
      setMessage({ type: "error", text: "Please upload an article cover image first." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("blogs").insert([
        {
          ...formData,
          translation_group_id: crypto.randomUUID()
        }
      ]);

      if (error) throw error;

      setMessage({ type: "success", text: "Article successfully published!" });
      setTimeout(() => {
        router.push(`/${currentLocale}/admin/blogs`);
      }, 1000);
    } catch (error: any) {
      setMessage({ type: "error", text: "Error saving article: " + error.message });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 font-sans text-white bg-[#030308] relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-8 relative z-10 animate-in fade-in duration-500">

        {/* Top Header */}
        <header className="bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] p-6 sm:p-8 rounded-3xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Link
              href={`/${currentLocale}/admin/blogs`}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white transition-all active:scale-95 shrink-0"
              title="Return to blogs"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] font-black uppercase tracking-wider mb-2">
                <PenTool size={13} />
                <span>Editorial Studio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.adminPages.createNewBlog}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {t.adminPages.draftPublishArticleDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-neutral-400 flex items-center gap-2">
              <Clock size={13} className="text-yellow-400" />
              <span>{readingStats.words} words • ~{readingStats.minutes} min read</span>
            </div>
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

            {/* Left 7 Columns: Article Metadata & Body */}
            <div className="lg:col-span-8 space-y-6">

              {/* Title & Slug Box */}
              <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 border-b border-white/[0.06] pb-3">
                  Article Metadata & Routing
                </h3>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <FileText size={14} /> Blog Title
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-yellow-400 focus:outline-none transition-all shadow-inner font-bold"
                    placeholder={t.adminPages.enterCaptivatingTitle}
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <Globe size={14} /> URL Slug
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-xs font-mono text-neutral-600">/blog/</span>
                    <input
                      required
                      type="text"
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 pl-16 pr-5 py-3.5 text-xs text-white placeholder-neutral-600 focus:border-yellow-400 focus:outline-none transition-all shadow-inner font-mono"
                      placeholder="trading-strategies-2027"
                    />
                  </div>
                </div>

                {/* Author, Category, Language */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <User size={13} /> Author
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.author_name}
                      onChange={e => setFormData({ ...formData, author_name: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-yellow-400 focus:outline-none transition-all shadow-inner"
                      placeholder={t.adminPages.authorName}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Tag size={13} /> Category
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-yellow-400 focus:outline-none transition-all shadow-inner"
                      placeholder="e.g. Finance, AI"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Globe size={13} /> Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={e => setFormData({ ...formData, language: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#090913] px-3 py-3 text-xs text-white focus:border-yellow-400 focus:outline-none transition-all shadow-inner"
                    >
                      {LANGUAGE_OPTIONS.map(opt => (
                        <option key={opt.code} value={opt.code} className="bg-[#090913] text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Editor with Toolbar & Preview Mode */}
              <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                    <FileText size={14} /> Article Content (Markdown / HTML)
                  </h3>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                    <button
                      type="button"
                      onClick={() => setViewMode("edit")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                        viewMode === "edit" ? "bg-yellow-500 text-black shadow-sm" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("split")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hidden md:block ${
                        viewMode === "split" ? "bg-yellow-500 text-black shadow-sm" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Split
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("preview")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                        viewMode === "preview" ? "bg-yellow-500 text-black shadow-sm" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* Markdown Quick Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 rounded-2xl bg-black/40 border border-white/5 text-neutral-400">
                  <button
                    type="button"
                    onClick={() => insertMarkdown("**", "**")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Bold"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("*", "*")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Italic"
                  >
                    <Italic size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("## ")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("> ")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Quote"
                  >
                    <Quote size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("- ")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Bullet List"
                  >
                    <List size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("[Link Text](", ")")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Insert Link"
                  >
                    <Link2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("```\n", "\n```")}
                    className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    title="Code Block"
                  >
                    <Code size={14} />
                  </button>
                </div>

                {/* Editor Container */}
                <div className={`grid gap-4 ${viewMode === "split" ? "grid-cols-2" : "grid-cols-1"}`}>
                  {viewMode !== "preview" && (
                    <textarea
                      ref={textareaRef}
                      required
                      rows={14}
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-neutral-600 focus:border-yellow-400 focus:outline-none transition-all resize-y shadow-inner leading-relaxed font-mono"
                      placeholder={t.adminPages.writeFullArticlePlaceholder}
                    />
                  )}

                  {viewMode !== "edit" && (
                    <div className="w-full rounded-2xl border border-white/10 bg-black/60 p-6 text-sm text-neutral-200 overflow-y-auto max-h-[400px] leading-relaxed whitespace-pre-line custom-scrollbar">
                      {formData.content ? (
                        <div className="prose prose-invert max-w-none">
                          {formData.content}
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic">Preview will render here as you write...</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Cover Image, SEO Snippet & Actions */}
            <div className="lg:col-span-4 space-y-6">

              {/* Cover Image Upload Box */}
              <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-4">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <ImageIcon size={14} /> Article Cover Image
                </label>

                <div className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-black/40 hover:bg-black/60 hover:border-yellow-500/30 transition-all flex flex-col items-center justify-center overflow-hidden group shadow-inner">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-3 text-yellow-400">
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
                      className="flex flex-col items-center gap-3 text-neutral-500 group-hover:text-yellow-400 transition-colors cursor-pointer p-6 w-full h-full justify-center"
                    >
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/20 transition-all">
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

              {/* Google Search SERP Snippet Preview */}
              <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 backdrop-blur-2xl shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Search size={12} className="text-blue-400" /> Search Engine Snippet Preview
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">Google SERP</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-1 text-left">
                  <div className="text-[11px] text-neutral-500 font-mono truncate">
                    https://safi.academy/blog/{formData.slug || "your-slug"}
                  </div>
                  <h4 className="text-sm font-bold text-blue-400 hover:underline cursor-pointer truncate">
                    {formData.title || "Captivating Article Title Will Appear Here"}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {formData.content
                      ? formData.content.slice(0, 140) + "..."
                      : "The opening paragraph of your article will automatically serve as the meta description snippet on search engines."}
                  </p>
                </div>
              </div>

              {/* Publish Control Box */}
              <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-5">
                <div
                  className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5 cursor-pointer"
                  onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{t.adminPages.publishImmediately}</span>
                    <span className="text-[10px] text-neutral-500">{t.adminPages.makeVisiblePublic}</span>
                  </div>
                  <div
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300 ${
                      formData.is_published ? "bg-yellow-500" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${
                        formData.is_published ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(234,179,8,0.2)] active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-black" />
                      <span>Publishing to CDN...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>{t.adminPages.saveAndPublish}</span>
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