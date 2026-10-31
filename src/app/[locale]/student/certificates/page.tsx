"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  ExternalLink,
  Copy,
  CheckCircle2,
  Calendar,
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Clock,
  Search,
  Check
} from "lucide-react";

interface CertificateItem {
  id: string;
  certificate_code: string;
  issue_date: string;
  certificate_url: string | null;
  courses: {
    id: string;
    title: string;
    thumbnail_url: string | null;
    instructor_name: string | null;
  } | null;
}

interface InProgressCourse {
  id: string;
  progress_percentage: number;
  courses: {
    id: string;
    title: string;
    thumbnail_url: string | null;
    instructor_name: string | null;
  } | null;
}

export default function StudentCertificatesPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<InProgressCourse[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCertificates() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const [certsRes, enrollmentsRes] = await Promise.all([
          supabase
            .from("certificates")
            .select(`
              id,
              certificate_code,
              issue_date,
              certificate_url,
              courses (
                id,
                title,
                thumbnail_url,
                instructor_name
              )
            `)
            .eq("student_id", user.id)
            .order("issue_date", { ascending: false }),
          supabase
            .from("enrollments")
            .select(`
              id,
              progress_percentage,
              courses (
                id,
                title,
                thumbnail_url,
                instructor_name
              )
            `)
            .eq("student_id", user.id)
            .lt("progress_percentage", 100)
            .order("progress_percentage", { ascending: false })
            .limit(3)
        ]);

        if (!isMounted) return;

        // Process certificates
        const certList = (certsRes.data || []).map((c: any) => ({
          id: c.id,
          certificate_code: c.certificate_code,
          issue_date: c.issue_date,
          certificate_url: c.certificate_url,
          courses: Array.isArray(c.courses) ? c.courses[0] : c.courses,
        }));
        setCertificates(certList);

        // Process in-progress courses
        const progressList = (enrollmentsRes.data || []).map((e: any) => ({
          id: e.id,
          progress_percentage: e.progress_percentage || 0,
          courses: Array.isArray(e.courses) ? e.courses[0] : e.courses,
        }));
        setInProgressCourses(progressList);

      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadCertificates();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredCerts = certificates.filter(c =>
    (c.courses?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.certificate_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-72 bg-neutral-900/50 rounded-3xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/10 via-[#C2185B]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#0e0c16]/95 via-[#08080f]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <ShieldCheck size={12} className="text-yellow-400" />
                {isRtl ? "گواهینامه‌های رسمی و تاییدشده" : "Verified Academic Credentials"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "گواهینامه‌ها و مدارک تحصیلی" : "My Certificates & Credentials"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "تمامی مدارک فارغ‌التحصیلی و گواهی دوره‌های تخصصی شما در آکادمی صافی دارای کد احراز اصالت بین‌المللی با قابلیت استعلام آنلاین هستند."
                  : "All graduation credentials and course certificates earned at Safi Academy include an internationally verifiable credential code."
                }
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3">
              <div className="px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/30">
                  <Award size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "مدارک دریافت شده" : "Earned Credentials"}
                  </span>
                  <span className="text-2xl font-black text-white font-mono">
                    {certificates.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isRtl ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? "جستجوی گواهینامه بر اساس نام دوره یا کد..." : "Search certificate by course or code..."}
                className={`w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-yellow-500/50 transition-colors ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
              />
            </div>
          </div>
        </section>

        {/* 2. CERTIFICATES GRID */}
        {filteredCerts.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="group relative rounded-3xl bg-gradient-to-br from-[#0d0c15] via-[#08080f] to-[#040407] border border-white/10 hover:border-yellow-500/40 p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Certificate Glow Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500/20 to-amber-400/10 text-yellow-400 border border-yellow-500/30 flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 size={11} /> {isRtl ? "تایید شده" : "Verified"}
                  </span>
                </div>

                {/* Course Details */}
                <div className="space-y-3">
                  <h3 className="text-base font-black text-white leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {cert.courses?.title || (isRtl ? "دوره تخصصی آکادمی صافی" : "Safi Academy Masterclass")}
                  </h3>

                  {cert.courses?.instructor_name && (
                    <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                      <span className="text-neutral-500">{isRtl ? "استاد:" : "Instructor:"}</span>
                      <span className="text-white font-bold">{cert.courses.instructor_name}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                    <Calendar size={12} className="text-yellow-500" />
                    <span>{new Date(cert.issue_date).toLocaleDateString()}</span>
                  </div>

                  {/* Verification Code Pill */}
                  <div className="pt-2">
                    <span className="text-[9px] text-neutral-500 uppercase font-black tracking-widest block mb-1">
                      {isRtl ? "کد احراز اصالت بین‌المللی:" : "Credential ID:"}
                    </span>
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs text-yellow-400">
                      <span className="truncate">{cert.certificate_code}</span>
                      <button
                        onClick={() => handleCopyCode(cert.certificate_code)}
                        className="text-neutral-400 hover:text-white transition-colors ml-2 cursor-pointer"
                        title={isRtl ? "کپی کد" : "Copy Code"}
                      >
                        {copiedCode === cert.certificate_code ? (
                          <Check size={14} className="text-emerald-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  {cert.certificate_url ? (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-yellow-500 text-black text-xs font-black uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-md"
                    >
                      <Download size={14} />
                      {isRtl ? "دانلود مدرک (PDF)" : "Download PDF"}
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider transition-colors"
                    >
                      <ExternalLink size={14} />
                      {isRtl ? "مشاهده آنلاین" : "View Credential"}
                    </button>
                  )}

                  <button
                    onClick={() => handleCopyCode(`https://www.safiacademy.org/verify/${cert.certificate_code}`)}
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                    title={isRtl ? "اشتراک‌گذاری لینک استعلام" : "Share Verification Link"}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/20">
              <Award size={32} />
            </div>
            <h3 className="text-lg font-black text-white">
              {isRtl ? "هنوز گواهینامه‌ای صادر نشده است" : "No Certificates Issued Yet"}
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              {isRtl
                ? "پس از تکمیل ۱۰۰٪ ویدیوهای دوره، قبولی در آزمون‌های پایان‌دوره و تایید استاد، گواهینامه دیجیتال شما به‌صورت خودکار در این بخش صادر خواهد شد."
                : "Upon 100% curriculum completion and passing the final exam, your accredited digital certificate will automatically appear here."
              }
            </p>
            <Link
              href={`/${currentLocale}/student/courses`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-black text-xs font-black uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <BookOpen size={16} />
              {isRtl ? "مشاهده دوره‌های در حال یادگیری" : "Go to My Courses"}
            </Link>
          </section>
        )}

        {/* 3. IN-PROGRESS COURSES (ROAD TO NEXT CERTIFICATE) */}
        {inProgressCourses.length > 0 && (
          <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0c0c16] via-[#08080f] to-[#040407] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.7)] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-400" />
                <h2 className="text-lg font-black text-white">
                  {isRtl ? "مسیر دستیابی به گواهینامه‌های بعدی" : "Pathway to Upcoming Certificates"}
                </h2>
              </div>
              <Link
                href={`/${currentLocale}/student/courses`}
                className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {isRtl ? "همه دوره‌ها" : "View All"} <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {inProgressCourses.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3"
                >
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.courses?.title || (isRtl ? "دوره تحصیلی" : "Academic Course")}
                  </h4>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">{isRtl ? "پیشرفت فعلی:" : "Progress:"}</span>
                    <span className="text-yellow-400 font-bold">{item.progress_percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                      style={{ width: `${item.progress_percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    {isRtl
                      ? `${100 - item.progress_percentage}% تا فارغ‌التحصیلی و دریافت مدرک`
                      : `${100 - item.progress_percentage}% remaining until credential issue`
                    }
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Online Certificate Modal Preview */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0b14] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 mx-auto flex items-center justify-center border border-yellow-500/20">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-black text-white">{selectedCert.courses?.title}</h3>
              <p className="text-xs text-neutral-400 font-mono">
                {isRtl ? "شناسه گواهینامه:" : "Certificate Code:"} {selectedCert.certificate_code}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-2 text-start">
              <p>✓ {isRtl ? "تایید شده توسط دپارتمان آموزشی آکادمی صافی" : "Accredited by Safi Academy Faculty Department"}</p>
              <p>✓ {isRtl ? "تاریخ صدور رسمی:" : "Official Issue Date:"} {new Date(selectedCert.issue_date).toLocaleDateString()}</p>
              <p>✓ {isRtl ? "لینک استعلام دائمی بین‌المللی" : "Permanent Global Verification Link"}</p>
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              {isRtl ? "بستن" : "Close"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
