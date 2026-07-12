"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Calendar, Building2, GraduationCap, MapPin, CheckCircle2, FileText, ExternalLink, Globe, ShieldCheck } from "lucide-react";

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
          className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-40">
        
        {/* ================= HERO HEADER GRID ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* Left/Middle Column: Cover and Core Info */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-6">
              <Globe size={12} /> {scholarship.continent} Award
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-8 leading-tight">
              {scholarship.title}
            </h1>

            <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 mb-8">
              <img 
                src={scholarship.cover_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"} 
                alt={scholarship.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/10 to-transparent opacity-90"></div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="lg:sticky lg:top-32 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-black tracking-wider uppercase text-yellow-500 border-b border-white/5 pb-4">Key Overview</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Building2 size={18} className="text-neutral-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-500 font-bold">University</p>
                  <p className="font-bold text-white truncate">{scholarship.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin size={18} className="text-neutral-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-500 font-bold">Location</p>
                  <p className="font-bold text-white">{scholarship.country} ({scholarship.continent})</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <GraduationCap size={18} className="text-neutral-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-500 font-bold">Degree Level</p>
                  <p className="font-bold text-white">{scholarship.degree_level}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20">
                <Calendar size={18} className="text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-amber-500/80 font-black tracking-widest">Application Deadline</p>
                  <p className="font-black text-amber-400">{formatDate(scholarship.deadline)}</p>
                </div>
              </div>
            </div>

            <Link 
              href={scholarship.apply_link || "#"} 
              target="_blank"
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-all"
            >
              Apply on Official Website <ExternalLink size={14} />
            </Link>
          </div>
        </section>

        {/* ================= DETAILS & REQUIREMENTS SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Program Description */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 sm:p-10 shadow-inner">
              <h2 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-3 text-white">
                <ShieldCheck className="text-yellow-500" size={24} /> Program Description
              </h2>
              <div 
                className="prose prose-invert prose-md max-w-none text-neutral-400 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: scholarship.description }}
              />
            </div>

            {/* 2. Eligibility & Required Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Eligibility Criteria (داینامیک) */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-inner">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
                  <CheckCircle2 className="text-emerald-500" size={20} /> ELIGIBILITY CRITERIA
                </h3>
                {scholarship.eligibility_criteria && scholarship.eligibility_criteria.length > 0 ? (
                  <ul className="space-y-4 text-xs sm:text-sm text-neutral-400 font-bold">
                    {scholarship.eligibility_criteria.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 leading-relaxed">
                        <span className="text-emerald-500 mt-0.5 shrink-0 text-base">✔</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-500 text-sm italic">No specific criteria listed.</p>
                )}
              </div>

              {/* Required Documents (داینامیک) */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-inner">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
                  <FileText className="text-yellow-500" size={20} /> REQUIRED DOCUMENTS
                </h3>
                {scholarship.required_documents && scholarship.required_documents.length > 0 ? (
                  <ul className="space-y-4 text-xs sm:text-sm text-neutral-400 font-bold">
                    {scholarship.required_documents.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 leading-relaxed">
                        <span className="text-yellow-500 mt-1.5 shrink-0 text-[10px]">■</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-500 text-sm italic">No specific documents listed.</p>
                )}
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}