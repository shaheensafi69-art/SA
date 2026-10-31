"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { uploadFileToR2 } from "@/utils/upload";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  BookOpen,
  Image as ImageIcon,
  DollarSign,
  Globe,
  User,
  Users,
  AlignLeft,
  CheckCircle2,
  Save,
  Lock,
  Upload,
  AlertCircle,
  Eye,
  Sparkles,
  ShieldCheck,
  Check,
  Layers,
  ChevronDown,
  Trash2,
  Radio,
  ExternalLink
} from "lucide-react";

const CATEGORY_PRESETS = [
  "Trading & Financial Markets",
  "Full-Stack Web Development",
  "AI & Machine Learning",
  "Shopify & E-Commerce",
  "Cyber Security & DevSecOps",
  "Mobile App Development",
  "Masterclass",
  "Design & UI/UX"
];

const PRICE_PRESETS = [0, 29, 49, 99, 149, 199, 299];

export default function CreateCoursePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Upload states
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [isUploadingInstructor, setIsUploadingInstructor] = useState(false);

  // Primary instructor (locked from DB)
  const [teacherId, setTeacherId] = useState<string>("");
  const [primaryInstructor, setPrimaryInstructor] = useState({
    name: "",
    bio: "",
    image_url: "",
  });

  // Course Form
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Trading & Financial Markets",
    customCategory: "",
    price: "0",
    isFree: true,
    thumbnail_url: "",
    language: "English",
    is_published: true,

    // Co-Instructor
    hasCoInstructor: false,
    instructor_2_name: "",
    instructor_2_bio: "",
    instructor_2_image_url: "",
  });

  // Mobile preview toggle
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    fetchCurrentTeacherData();
  }, []);

  const fetchCurrentTeacherData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/${currentLocale}/login`);
      return;
    }

    const currentUserId = session.user.id;
    setTeacherId(currentUserId);

    try {
      // 1. Check teacher_info
      const { data: teacherInfo, error: teacherError } = await supabase
        .from("teacher_info")
        .select("first_name, last_name, bio, avatar_url")
        .eq("id", currentUserId)
        .single();

      if (teacherInfo && !teacherError) {
        setPrimaryInstructor({
          name: `${teacherInfo.first_name || ""} ${teacherInfo.last_name || ""}`.trim() || "Verified Faculty",
          bio: teacherInfo.bio || (isRtl ? "مدرس ارشد آکادمی صافی" : "Senior Faculty Instructor at Safi Academy"),
          image_url: teacherInfo.avatar_url || "",
        });
      } else {
        // 2. Fallback to profiles
        const { data: profileData } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, bio")
          .eq("id", currentUserId)
          .single();

        if (profileData) {
          setPrimaryInstructor({
            name: `${profileData.first_name || ""} ${profileData.last_name || ""}`.trim() || "Verified Faculty",
            bio: profileData.bio || (isRtl ? "مدرس ارشد آکادمی صافی" : "Senior Faculty Instructor at Safi Academy"),
            image_url: profileData.avatar_url || "",
          });
        }
      }
    } catch (err) {
      console.error("Error fetching teacher identity:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: "thumbnail_url" | "instructor_2_image_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetField === "thumbnail_url") setIsUploadingThumb(true);
    else setIsUploadingInstructor(true);
    setErrorMsg(null);

    try {
      const folderName = targetField === "thumbnail_url" ? "course-thumbnails" : "instructor_image";
      const uploadedUrl = await uploadFileToR2(file, folderName);
      setForm((prev) => ({ ...prev, [targetField]: uploadedUrl }));
    } catch (err: any) {
      setErrorMsg(`Image Upload Failed: ${err.message}`);
    } finally {
      if (targetField === "thumbnail_url") setIsUploadingThumb(false);
      else setIsUploadingInstructor(false);
    }
  };

  const activeCategory = form.category === "custom" ? form.customCategory : form.category;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      if (!form.title.trim()) throw new Error(isRtl ? "عنوان کورس الزامی است." : "Course title is required.");

      const finalPrice = form.isFree ? 0 : parseFloat(form.price) || 0;
      const finalCategory = (form.category === "custom" ? form.customCategory : form.category).trim() || "General";

      const { data, error } = await supabase
        .from("courses")
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          category: finalCategory,
          teacher_id: teacherId,
          price: finalPrice,
          thumbnail_url: form.thumbnail_url.trim() || null,
          is_published: form.is_published,
          language: form.language.trim(),

          // Primary Instructor locked
          instructor_name: primaryInstructor.name,
          instructor_bio: primaryInstructor.bio,
          instructor_image_url: primaryInstructor.image_url || null,

          // Co-Instructor (Optional)
          instructor_2_name: form.hasCoInstructor ? form.instructor_2_name.trim() || null : null,
          instructor_2_bio: form.hasCoInstructor ? form.instructor_2_bio.trim() || null : null,
          instructor_2_image_url: form.hasCoInstructor ? form.instructor_2_image_url.trim() || null : null,
        })
        .select("id")
        .single();

      if (error) throw error;

      router.push(`/${currentLocale}/teacher/courses`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create the course.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {isRtl ? "در حال بارگذاری استودیوی کورس..." : "Loading Course Authoring Studio..."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Deep Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-xl">
          <div>
            <Link
              href={`/${currentLocale}/teacher/courses`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-fuchsia-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={14} />
              <span>{isRtl ? "بازگشت به مرکز صنف‌ها" : "Back to Courses Hub"}</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              {t.common?.create || (isRtl ? "ایجاد" : "Create")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
                {t.teacherPages?.course || (isRtl ? "کورس و برنامه درسی" : "Course Curriculum")}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">
              {t.teacherPages?.designPublishMasterclassDesc ||
                (isRtl
                  ? "طراحی، تدوین و انتشار دوره آموزشی تخصصی جدید در کاتالوگ آکادمی صافی."
                  : "Design and publish a masterclass curriculum with verified faculty credentials.")}
            </p>
          </div>

          {/* Quick Mobile Preview Button */}
          <div className="lg:hidden flex">
            <button
              type="button"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 text-neutral-300"
            >
              <Eye size={16} className="text-fuchsia-400" />
              <span>{showMobilePreview ? (isRtl ? "مخفی کردن پیش‌نمایش" : "Hide Preview") : (isRtl ? "مشاهده پیش‌نمایش" : "Show Live Preview")}</span>
            </button>
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-bold animate-[fadeInDown_0.3s_ease-out]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: FORM CONTROLS (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* SECTION 1: CURRICULUM ESSENTIALS */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-6">
              <h3 className="text-base sm:text-lg font-black text-fuchsia-400 flex items-center gap-2.5 border-b border-white/5 pb-4">
                <BookOpen size={20} />
                <span>{isRtl ? "مشخصات و سرفصل‌های دوره" : "Course Curriculum Details"}</span>
              </h3>

              <div className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      {t.teacherPages?.courseTitle || (isRtl ? "عنوان دوره آموزشی" : "Course Title")} *
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {form.title.length}/100
                    </span>
                  </div>
                  <input
                    required
                    maxLength={100}
                    type="text"
                    placeholder={
                      t.teacherPages?.courseTitlePlaceholder ||
                      (isRtl ? "مثال: دوره جامع تریدینگ و بازارهای مالی ۲۰۲۶" : "e.g. Masterclass in Algorithmic Trading")
                    }
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner transition-colors font-medium"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      {t.teacherPages?.detailedDescription || (isRtl ? "توضیحات و اهداف یادگیری" : "Detailed Curriculum Description")}
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {form.description.length} chars
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder={
                        t.teacherPages?.detailedDescriptionPlaceholder ||
                        (isRtl
                          ? "دانشجویان در این دوره چه مهارت‌هایی کسب خواهند کرد؟ پیش‌نیازها و اهداف را تشریح کنید..."
                          : "What will students master upon completing this course? Outline prerequisites and outcomes...")
                      }
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 resize-none custom-scrollbar shadow-inner"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    {t.teacherPages?.category || (isRtl ? "شاخه‌ی تخصصی (دسته‌بندی)" : "Course Category")} *
                  </label>
                  
                  {/* Category chips presets */}
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_PRESETS.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setForm({ ...form, category: cat })}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                          form.category === cat
                            ? "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40 shadow-sm"
                            : "bg-white/5 text-neutral-400 hover:text-white border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, category: "custom" })}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                        form.category === "custom"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          : "bg-white/5 text-neutral-400 hover:text-white border-white/5"
                      }`}
                    >
                      {isRtl ? "+ دسته دلخواه" : "+ Custom Category"}
                    </button>
                  </div>

                  {form.category === "custom" && (
                    <input
                      type="text"
                      placeholder={isRtl ? "نام دسته‌بندی دلخواه خود را بنویسید..." : "Enter custom category name..."}
                      value={form.customCategory}
                      onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                      className="w-full bg-black/60 border border-purple-500/40 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 shadow-inner"
                    />
                  )}
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    {t.teacherPages?.language || (isRtl ? "زبان تدریس دوره" : "Instruction Language")}
                  </label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <select
                      value={form.language}
                      onChange={(e) => setForm({ ...form, language: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner"
                    >
                      <option value="English">English (International)</option>
                      <option value="Persian">Persian (فارسی / دری)</option>
                      <option value="Pashto">Pashto (پښتو)</option>
                      <option value="Arabic">Arabic (العربية)</option>
                      <option value="Spanish">Spanish (Español)</option>
                      <option value="German">German (Deutsch)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: MONETIZATION & PRICING */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-6">
              <h3 className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-2.5 border-b border-white/5 pb-4">
                <DollarSign size={20} />
                <span>{isRtl ? "تعرفه و مدل درآمدی دوره" : "Pricing & Tuition"}</span>
              </h3>

              {/* Free vs Paid Toggle */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/60 border border-white/10 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, isFree: true, price: "0" })}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    form.isFree
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Sparkles size={14} />
                  <span>{isRtl ? "دوره رایگان (Free)" : "Free Tuition"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, isFree: false, price: form.price === "0" ? "49" : form.price })}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    !form.isFree
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <DollarSign size={14} />
                  <span>{isRtl ? "دوره ویژه و پولی" : "Premium Paid"}</span>
                </button>
              </div>

              {!form.isFree && (
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    {t.teacherPages?.priceUsd || (isRtl ? "هزینه ثبت‌نام به دلار (USD)" : "Tuition Fee (USD)")}
                  </label>
                  
                  {/* Preset price chips */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRICE_PRESETS.filter((p) => p > 0).map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setForm({ ...form, price: p.toString() })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                          form.price === p.toString()
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-white/5 text-neutral-400 hover:text-white border-white/5"
                        }`}
                      >
                        ${p}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="49.00"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-base font-mono focus:outline-none focus:border-emerald-500 shadow-inner"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: MEDIA & BRANDING (Thumbnail) */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-6">
              <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2.5 border-b border-white/5 pb-4">
                <ImageIcon size={20} />
                <span>{isRtl ? "تصویر کاور و برندینگ دوره" : "Course Thumbnail & Media"}</span>
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="url"
                      placeholder={
                        t.teacherPages?.avatarImageUrl ||
                        (isRtl ? "آدرس مستقیم تصویر کاور (https://...)" : "Paste image URL or upload below...")
                      }
                      value={form.thumbnail_url}
                      onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 shadow-inner transition-colors"
                    />
                  </div>

                  <div className="shrink-0">
                    <input
                      type="file"
                      id="course-thumbnail-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "thumbnail_url")}
                    />
                    <label
                      htmlFor="course-thumbnail-upload"
                      className={`flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all h-full ${
                        isUploadingThumb ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {isUploadingThumb ? <Loader2 size={16} className="animate-spin text-purple-400" /> : <Upload size={16} />}
                      <span>{isUploadingThumb ? (isRtl ? "در حال آپلود..." : "Uploading...") : (isRtl ? "آپلود عکس" : "Upload File")}</span>
                    </label>
                  </div>
                </div>

                {/* Thumbnail Preview Area */}
                {form.thumbnail_url && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black group">
                    <img src={form.thumbnail_url} alt="Cover Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, thumbnail_url: "" })}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-red-500/80 text-white backdrop-blur-md border border-white/10 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 4: FACULTY & INSTRUCTORS */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-6">
              <h3 className="text-base sm:text-lg font-black text-indigo-400 flex items-center gap-2.5 border-b border-white/5 pb-4">
                <Users size={20} />
                <span>{isRtl ? "هیئت علمی و استادان دوره" : "Faculty & Instructors"}</span>
              </h3>

              {/* Primary Instructor Card (Locked) */}
              <div className="bg-gradient-to-br from-fuchsia-500/10 via-purple-500/5 to-transparent border border-fuchsia-500/20 rounded-3xl p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-fuchsia-500/20 text-fuchsia-300 px-3.5 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                  <Lock size={10} />
                  <span>{isRtl ? "مدرس اصلی تایید شده" : "Verified Lead Instructor"}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-3">
                  <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0 shadow-xl flex items-center justify-center">
                    {primaryInstructor.image_url ? (
                      <img
                        src={primaryInstructor.image_url}
                        alt="Lead Instructor"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-neutral-600" />
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <h4 className="text-lg sm:text-xl font-black text-white">{primaryInstructor.name}</h4>
                    <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-xl">
                      {primaryInstructor.bio}
                    </p>
                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">
                      <ShieldCheck size={14} />
                      <span>{isRtl ? "تایید شده با امنیت سشن صافی" : "Authenticated & Locked to Teacher Profile"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Co-Instructor Accordion Toggle */}
              <div className="pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, hasCoInstructor: !form.hasCoInstructor })}
                  className="flex items-center justify-between w-full py-2 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-neutral-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
                      {t.teacherPages?.coInstructor || (isRtl ? "افزودن استاد دوم / همکار" : "Co-Instructor")}
                    </span>
                    <span className="text-[9px] bg-white/5 text-neutral-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {isRtl ? "اختیاری" : "Optional"}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all ${
                      form.hasCoInstructor ? "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30" : "text-neutral-500"
                    }`}
                  >
                    {form.hasCoInstructor ? "✕" : "+"}
                  </div>
                </button>

                {form.hasCoInstructor && (
                  <div className="mt-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          {t.teacherPages?.coInstructorName || (isRtl ? "نام استاد همکار" : "Co-Instructor Name")}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. John Doe"
                          value={form.instructor_2_name}
                          onChange={(e) => setForm({ ...form, instructor_2_name: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white text-xs focus:outline-none focus:border-purple-500 shadow-inner"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          {t.teacherPages?.coInstructorImageUrl || (isRtl ? "عکس استاد همکار" : "Co-Instructor Photo")}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://..."
                            value={form.instructor_2_image_url}
                            onChange={(e) => setForm({ ...form, instructor_2_image_url: e.target.value })}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-purple-500 shadow-inner"
                          />
                          <input
                            type="file"
                            id="co-instructor-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, "instructor_2_image_url")}
                          />
                          <label
                            htmlFor="co-instructor-upload"
                            className="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer shrink-0 text-xs font-bold"
                          >
                            {isUploadingInstructor ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {t.teacherPages?.coInstructorBio || (isRtl ? "بیوگرافی یا تخصص استاد همکار" : "Co-Instructor Bio")}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Quantitative Analyst & Senior Python Developer"
                        value={form.instructor_2_bio}
                        onChange={(e) => setForm({ ...form, instructor_2_bio: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white text-xs focus:outline-none focus:border-purple-500 shadow-inner"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 5: PUBLISH & SAVE ACTIONS */}
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center justify-between w-full sm:w-auto gap-5 bg-black/40 px-5 py-3.5 rounded-2xl border border-white/5">
                <div>
                  <p className="font-black text-white text-sm">
                    {t.teacherPages?.publishCourse || (isRtl ? "انتشار در کاتالوگ عمومی" : "Publish to Catalog")}
                  </p>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                    {t.teacherPages?.makeVisibleStudents || (isRtl ? "قابل مشاهده و ثبت‌نام برای دانشجویان" : "Make visible to academy scholars")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, is_published: !form.is_published })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
                    form.is_published ? "bg-fuchsia-600" : "bg-neutral-800 border border-white/10"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      form.is_published ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !primaryInstructor.name || isUploadingThumb || isUploadingInstructor}
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-2xl transition-all shadow-[0_15px_40px_rgba(217,70,239,0.35)] disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                <span>
                  {isSubmitting
                    ? (isRtl ? "در حال ایجاد کورس..." : "Compiling Course...")
                    : (isRtl ? "تایید و ایجاد کورس" : "Create & Launch Course")}
                </span>
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: STICKY LIVE PREVIEW CARD (5 Cols) ================= */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-8 space-y-4 ${
              showMobilePreview ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-fuchsia-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-300">
                    {isRtl ? "پیش‌نمایش زنده در کاتالوگ" : "Live Catalog Preview"}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-fuchsia-500/10 text-fuchsia-400 px-2.5 py-1 rounded-full border border-fuchsia-500/20">
                  {form.is_published ? "PUBLIC PREVIEW" : "DRAFT MODE"}
                </span>
              </div>

              {/* Course Card Preview as Students See It */}
              <div className="bg-[#050508] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl group flex flex-col">
                {/* Thumbnail Header */}
                <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                  {form.thumbnail_url ? (
                    <img
                      src={form.thumbnail_url}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-black text-neutral-600 gap-2">
                      <ImageIcon size={36} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {isRtl ? "تصویر کاور انتخاب نشده" : "No Cover Image Yet"}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/10 truncate max-w-[60%]">
                      {activeCategory || "Masterclass"}
                    </span>
                    <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
                      {form.isFree ? (isRtl ? "رایگان" : "FREE") : `$${form.price}`}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-md bg-black/70 text-neutral-300 border border-white/10 flex items-center gap-1">
                      <Globe size={10} /> {form.language}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h4 className="text-base font-black text-white line-clamp-2 leading-snug">
                    {form.title || (isRtl ? "عنوان دوره در اینجا نمایش داده می‌شود" : "Your Course Title Will Appear Here")}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {form.description ||
                      (isRtl
                        ? "توضیحات و سرفصل‌های دوره در این قسمت برای شاگردان به صورت شفاف نمایش داده می‌شود..."
                        : "Your comprehensive course summary and learning outcomes will be visible to students here...")}
                  </p>

                  {/* Instructors footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center">
                        {primaryInstructor.image_url ? (
                          <img src={primaryInstructor.image_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={14} className="text-neutral-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-none">{primaryInstructor.name}</p>
                        <p className="text-[9px] text-fuchsia-400 font-bold uppercase tracking-wider mt-0.5">
                          {isRtl ? "استاد دوره" : "Lead Faculty"}
                        </p>
                      </div>
                    </div>

                    {form.hasCoInstructor && form.instructor_2_name && (
                      <span className="text-[9px] text-neutral-400 font-bold bg-white/5 px-2 py-1 rounded-md border border-white/5">
                        + {form.instructor_2_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>{isRtl ? "ملاحظات انتشار دوره:" : "Publishing Checklist:"}</span>
                </p>
                <ul className="text-[11px] text-neutral-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${form.title ? "bg-emerald-400" : "bg-neutral-600"}`}></span>
                    {isRtl ? "عنوان دوره معتبر است" : "Title is defined"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${form.thumbnail_url ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                    {form.thumbnail_url ? (isRtl ? "تصویر کاور بارگذاری شده" : "Cover image attached") : (isRtl ? "کاور پیشنهادی (اختیاری)" : "Recommended cover image")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {isRtl ? "هویت استاد تایید و متصل به سشن" : "Instructor identity verified"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}