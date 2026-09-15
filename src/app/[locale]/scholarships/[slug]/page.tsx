"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  ArrowLeft, Calendar, Building2, GraduationCap, MapPin, 
  CheckCircle2, FileText, ExternalLink, Globe, ShieldCheck,
  Share2, X as XIcon, Sparkles 
} from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// آپدیت تایپ برای پشتیبانی از آرایه‌های جدید
type Scholarship = {
  id: string;
  title: string;
  continent: string;
  country: string;
  university: string;
  degree_level: string;
  deadline: string;
  description: string;
  cover_image: string;
  apply_link: string;
  eligibility_criteria: string[] | null;
  required_documents: string[] | null;
};

export default function EnglishScholarshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("scholarships")
          .select("*")
          .eq("language", "en") // قفل روی زبان انگلیسی
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (error) throw error;
        if (data) setScholarship(data);
      } catch (error) {
        console.error("Error loading scholarship details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchScholarship();
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Rolling Deadline";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Scholarship Details...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-neutral-400 mb-8">Scholarship opportunity not found or has expired.</p>
        <Link href="/en/scholarships" className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-500 to-amber-500 hover:scale-105 transition-all">
          Back to Scholarships
        </Link>
      </div>
    );
  }

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Scholarship link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pb-32 overflow-hidden selection:bg-yellow-500/30" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[60vw] bg-yellow-600/5 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* ================= FLOATING BACK BUTTON ================= */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <button 
          onClick={() => router.push('/en/scholarships')}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-36 sm:pt-40">
        
        {/* ================= UNIFIED MASTER GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT MAIN CONTENT (8 COLS) ================= */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header Tags & Title */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] font-black uppercase tracking-wider">
                  <Globe size={13} /> {scholarship.continent} Award
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Verified Opportunity
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-8 leading-[1.2] text-white">
                {scholarship.title}
              </h1>

              {/* Cover Image */}
              <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 mb-2">
                <img 
                  src={scholarship.cover_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"} 
                  alt={scholarship.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80"></div>
              </div>
            </div>

            {/* 1. Program Description Card */}
            <div className="relative rounded-[2.5rem] bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

              <h2 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                Program Description & Scope
              </h2>

              <div className="overflow-hidden">
                <MarkdownRenderer content={scholarship.description} />
              </div>
            </div>

            {/* 2. Eligibility Criteria Card */}
            <div className="rounded-[2.5rem] bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"></div>
              
              <h3 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                Eligibility Criteria
              </h3>

              {scholarship.eligibility_criteria && scholarship.eligibility_criteria.length > 0 ? (
                <div className="space-y-3.5">
                  {scholarship.eligibility_criteria.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                        ✓
                      </div>
                      <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed break-words">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm italic">No specific criteria listed.</p>
              )}
            </div>

            {/* 3. Required Documents Card */}
            <div className="rounded-[2.5rem] bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>
              
              <h3 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                  <FileText size={20} />
                </div>
                Required Application Documents
              </h3>

              {scholarship.required_documents && scholarship.required_documents.length > 0 ? (
                <div className="space-y-3.5">
                  {scholarship.required_documents.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-yellow-500/30 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                        ■
                      </div>
                      <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed break-words">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm italic">No specific documents listed.</p>
              )}
            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (4 COLS) ================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Key Overview Card */}
            <div className="bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>

              <h3 className="text-base font-black tracking-widest uppercase text-yellow-400 border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
                <span>Key Overview</span>
                <Sparkles size={16} className="text-yellow-500" />
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3.5 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                    <Building2 size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase text-neutral-500 font-black tracking-widest">University / Sponsor</p>
                    <p className="font-bold text-white leading-snug break-words">{scholarship.university}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase text-neutral-500 font-black tracking-widest">Location</p>
                    <p className="font-bold text-white leading-snug break-words">{scholarship.country} ({scholarship.continent})</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase text-neutral-500 font-black tracking-widest">Degree Level</p>
                    <p className="font-bold text-white leading-snug break-words">{scholarship.degree_level}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent p-4 rounded-2xl border border-amber-500/30">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-amber-500 font-black tracking-widest">Application Deadline</p>
                    <p className="font-black text-amber-400 text-sm">{formatDate(scholarship.deadline)}</p>
                  </div>
                </div>
              </div>

              {/* Direct Apply Button */}
              <Link 
                href={scholarship.apply_link || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Apply on Official Website <ExternalLink size={15} />
              </Link>
            </div>

            {/* Share & Connect Card */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-xl space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Share Opportunity</p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={copyToClipboard}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" 
                  title="Copy Link"
                >
                  <Share2 size={16} />
                </button>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(scholarship.title)}%20${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors" 
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.822 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a 
                  href={`https://t.me/share/url?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(scholarship.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#229ED9] hover:bg-[#229ED9]/10 transition-colors" 
                  title="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.926z"/></svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(scholarship.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" 
                  title="X (Twitter)"
                >
                  <XIcon size={16} />
                </a>
              </div>
            </div>

            {/* Need Assistance Card */}
            <div className="bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20 rounded-[2rem] p-6 shadow-xl space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
                <Sparkles size={14} /> Need Application Help?
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Connect with Safi Academy mentors for document reviews, motivation letter refinement & guidance.
              </p>
              <Link 
                href="/en/support" 
                className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-400 hover:text-yellow-300 uppercase tracking-wider pt-1"
              >
                Contact Student Desk →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}