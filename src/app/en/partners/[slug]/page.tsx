"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, ExternalLink, ShieldCheck, FileText, Calendar, Link as LinkIcon, Building2, Handshake, AlertCircle } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  nda_file_url: string | null;
  nda_signed_date: string | null;
  nda_expiry_date: string | null;
};

export default function EnglishPartnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("partners")
          .select("*")
          .eq("language", "en") // قفل روی زبان انگلیسی
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (error) throw error;
        if (data) setPartner(data);
      } catch (error) {
        console.error("Error loading partner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchPartner();
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Partner Profile...</p>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-neutral-400 mb-8">Partner profile not found or is currently inactive.</p>
        <Link href="/en/partners" className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-500 to-amber-500 hover:scale-105 transition-all">
          Back to Network
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pb-32 overflow-hidden selection:bg-yellow-500/30" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vw] bg-yellow-600/5 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* ================= FLOATING BACK BUTTON ================= */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <button 
          onClick={() => router.push('/en/partners')}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-40">
        
        {/* ================= HERO HEADER GRID ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* Left/Middle Column: Logo and Core Info */}
          <div className="lg:col-span-2">
            
            {/* Logo Display Area */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] bg-gradient-to-br from-neutral-900 to-[#050508] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 mb-10 flex items-center justify-center p-8 group">
              <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors duration-500"></div>
              
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={partner.logo_url} 
                alt={partner.name} 
                className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute top-6 left-6 z-20">
                <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck size={14} className="text-emerald-500" /> Verified Partner
                </span>
              </div>
              <div className="absolute top-6 right-6 z-20">
                <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                  <Handshake size={14} /> Connected
                </span>
              </div>
            </div>
            
            {/* Title and Content */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-8 leading-tight text-white">
              {partner.name}
            </h1>

            <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 sm:p-10 shadow-inner mb-12">
              <h2 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-3 text-white">
                <Building2 className="text-yellow-500" size={24} /> About {partner.name}
              </h2>
              {/* استفاده از HTML برای رندر کردن استایل‌های تگ‌های دیتابیس */}
              <div 
                className="prose prose-invert prose-md max-w-none text-neutral-400 leading-relaxed font-medium prose-headings:font-black prose-headings:text-white prose-p:mb-6"
                dangerouslySetInnerHTML={{ __html: partner.description }}
              />
            </div>
          </div>

          {/* Right Column: Sticky Summary Card (Cyber-Glass) */}
          <div className="lg:sticky lg:top-32 space-y-6">
            
            {/* Website Info Card */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
              <h3 className="text-sm font-black tracking-widest uppercase text-neutral-500 mb-6 flex items-center gap-2">
                <LinkIcon size={16} /> Partner Hub
              </h3>
              
              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors group">
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase text-neutral-500 font-bold mb-1">Official Website</p>
                  <p className="text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                    {partner.website_url && partner.website_url !== "#" ? partner.website_url.replace(/^https?:\/\//, '') : "Internal Platform"}
                  </p>
                </div>
                {partner.website_url && partner.website_url !== "#" && (
                  <Link href={partner.website_url} target="_blank" className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <ExternalLink size={16} />
                  </Link>
                )}
              </div>
            </div>

            {/* NDA Legal Status Card */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
              <h3 className="text-sm font-black tracking-widest uppercase text-neutral-500 mb-6 flex items-center gap-2">
                <ShieldCheck size={16} /> Legal & Compliance
              </h3>

              {partner.nda_signed_date ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-emerald-500" />
                      <div>
                        <p className="text-[10px] uppercase text-emerald-500/80 font-black">NDA Status</p>
                        <p className="text-xs font-black text-emerald-400">Active & Signed</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] uppercase text-neutral-500 font-bold mb-1">Signed Date</p>
                      <p className="text-xs font-bold text-white flex items-center gap-1"><Calendar size={12}/> {formatDate(partner.nda_signed_date)}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] uppercase text-neutral-500 font-bold mb-1">Expiry Date</p>
                      <p className="text-xs font-bold text-red-400 flex items-center gap-1"><Calendar size={12}/> {formatDate(partner.nda_expiry_date)}</p>
                    </div>
                  </div>

                  {partner.nda_file_url && (
                    <Link 
                      href={partner.nda_file_url} 
                      target="_blank"
                      className="w-full mt-2 py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:bg-white/10 transition-all group"
                    >
                      <FileText size={14} /> View Document
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-red-500/5 border border-red-500/10 rounded-xl text-center">
                  <AlertCircle size={24} className="text-red-500/50 mb-3" />
                  <p className="text-xs font-bold text-red-400">No active Non-Disclosure Agreement (NDA) on file.</p>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}