"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Handshake, Globe, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  slug: string; // اضافه شدن اسلاگ
  logo_url: string;
  website_url: string;
  description: string;
};

// 🔥 ثابت شده روی زبان انگلیسی برای این پوشه
const CURRENT_LANG = "en"; 

export default function EnglishPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("partners")
          .select("id, name, slug, logo_url, website_url, description")
          .eq("language", CURRENT_LANG) // فیلتر سمت سرور فقط برای زبان انگلیسی
          .eq("is_active", true)
          .order("created_at", { ascending: true });
          
        if (error) throw error;
        if (data) setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[150px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* ================= FLOATING BACK BUTTON ================= */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <Link 
          href="/en"
          className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-40 pb-32">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 animate-[fadeInDown_0.5s_ease-out] shadow-inner">
            <Handshake className="w-4 h-4" /> Global Network
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Our Strategic <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 drop-shadow-lg">Collaborations.</span>
          </h1>
          
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Safi Academy partners with industry-leading organizations, universities, and fintech institutions to bring world-class opportunities and secure infrastructure to our global student community.
          </p>
        </section>

        {/* ================= PARTNERS GRID OR LOADING ================= */}
        {isLoading ? (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
            <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Partners...</p>
          </div>
        ) : (
          <AnimatePresence>
            {partners.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24 bg-[#0a0a0e] border border-white/5 rounded-[2rem] sm:rounded-[3rem] mx-2 sm:mx-0 shadow-inner flex flex-col items-center gap-6"
              >
                <Globe className="w-16 h-16 text-neutral-700" />
                <h3 className="text-lg sm:text-xl font-bold text-white">No Partners Listed Yet</h3>
                <p className="text-neutral-500 text-xs sm:text-sm px-4">Check back soon to see our growing network of global collaborators.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {partners.map((partner, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    key={partner.id} 
                    className="group bg-[#0a0a0e] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-500 shadow-xl flex flex-col"
                  >
                    {/* Cover Image Area (Large Logo Display) */}
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-neutral-900 to-black p-8 flex items-center justify-center border-b border-white/5">
                      {/* Hover Glow Effect inside Cover */}
                      <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors duration-500 z-0"></div>
                      
                      {/* Logo */}
                      <img 
                        src={partner.logo_url} 
                        alt={partner.name} 
                        className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Tags / Badges */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                          <ShieldCheck size={12} className="text-emerald-500" /> Verified
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                          <Handshake size={12} /> Connected
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20">
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight group-hover:text-yellow-400 transition-colors">
                        {partner.name}
                      </h3>
                      
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                        {partner.description}
                      </p>
                      
                      {/* Visit Details Button (Slug Routing) */}
                      <Link 
                        href={`/${CURRENT_LANG}/partners/${partner.slug}`} 
                        className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all shadow-lg group/btn"
                      >
                        Partner Profile 
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-50 group-hover/btn:opacity-100" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}