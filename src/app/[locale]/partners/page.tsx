"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { usePathname } from "next/navigation";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Handshake, Globe, ArrowLeft, ArrowRight, ShieldCheck, Building2, 
  ExternalLink, Sparkles, CheckCircle2, Award, Users, Check, 
  Search, X, Layers, Compass, HelpCircle, Send, FileText, 
  Lock, Network, Laptop, ChevronDown, ArrowUpRight, BadgeCheck
} from "lucide-react";

type Partner = {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  website_url: string;
  description: string;
};

export default function EnglishPartnersPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const CURRENT_LANG = currentLocale;
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        let { data, error } = await supabase
          .from("partners")
          .select("id, name, slug, logo_url, website_url, description")
          .eq("language", currentLocale).eq("is_active", true).order("created_at", { ascending: true });
        if (!data || data.length === 0) {
          const fb = await supabase.from("partners").select("id, name, slug, logo_url, website_url, description").eq("language", "en").eq("is_active", true).order("created_at", { ascending: true });
          if (fb.data) data = fb.data;
        }
          
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

  const filteredPartners = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return partners.filter((p) => {
      if (!q) return true;
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    });
  }, [partners, searchQuery]);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#030307] text-white font-sans selection:bg-yellow-500/30 overflow-hidden relative" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* ================= LUXURY AMBIENT BACKGROUND SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[550px] bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-[10%] w-[45vw] max-w-[600px] h-[550px] bg-amber-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-[65%] -right-[10%] w-[50vw] max-w-[650px] h-[550px] bg-yellow-500/5 rounded-full blur-[170px]" />
        <div className="absolute -bottom-[10%] left-1/3 w-[55vw] max-w-[700px] h-[500px] bg-orange-600/5 rounded-full blur-[150px]" />

        {/* Micro Tech Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
            backgroundSize: '36px 36px' 
          }} 
        />
        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
      </div>

      {/* ================= FLOATING NAVIGATION BUTTON ================= */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <Link 
          href={`/${currentLocale}`}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-36 sm:pt-44 pb-32">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          
          {/* Official Accreditation Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] sm:text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <Handshake className="w-4 h-4 text-yellow-400" />
            <span>{t.publicPages.alliancesBadge}</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.08]">
            {t.publicPages.partnersHeroTitle1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_10px_35px_rgba(234,179,8,0.35)]">
              {t.publicPages.partnersHeroTitle2}
            </span>
          </h1>
          
          {/* Deep Informative Subtitle */}
          <p className="text-neutral-300 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            {t.publicPages.partnersHeroSubtitle}
          </p>

          {/* Key Alliance Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-yellow-400 mb-1">
                <Building2 size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.alliances}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">35+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.globalVerifiedPartners}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Award size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.subsidies}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">$2.4M+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.jointGrants}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Users size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.beneficiaries}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">12,000+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.studentsDirectlyFunded}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.compliance}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{t.publicPages.hundredPercentVerified}</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.ndaLegalStandards}</p>
            </div>
          </div>

          {/* Search Bar for Partners */}
          <div className="max-w-2xl mx-auto relative group px-2 sm:px-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 blur-2xl rounded-full opacity-60 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:p-3 focus-within:border-yellow-500/60 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <Search className="text-yellow-400 ml-3 sm:ml-4 mr-3 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder={t.publicPages.searchPartnersPlaceholder} 
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-neutral-500 text-sm sm:text-base font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors mr-2"
                  title={t.publicPages.clearSearch}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

        </section>

        {/* ================= LANDSCAPE PARTNERS DIRECTORY ================= */}
        <section className="mb-24">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-neutral-400 px-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                {t.publicPages.activeInstitutionalCollaborations} <strong className="text-white font-bold">{filteredPartners.length}</strong>
              </span>
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-wider text-[11px] underline underline-offset-4"
              >
                Reset Search
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_25px_rgba(234,179,8,0.5)]" />
              <p className="text-yellow-400 font-black tracking-widest uppercase text-xs animate-pulse">
                Synchronizing Strategic Alliances Database...
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredPartners.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-center py-24 bg-[#0a0a0f]/90 border border-white/10 rounded-[2.5rem] mx-2 sm:mx-0 shadow-2xl flex flex-col items-center gap-6 max-w-xl mx-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                    <Globe className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{t.publicPages.noPartnersFound}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
                      No active partners matching &ldquo;{searchQuery}&rdquo;. Check back soon as new organizations join our ecosystem.
                    </p>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-transform"
                    >
                      Show All Partners
                    </button>
                  )}
                </motion.div>
              ) : (
                /* 🔥 ULTRA-LUXURY LANDSCAPE (HORIZONTAL) CARDS SYSTEM 🔥 */
                <div className="space-y-8">
                  {filteredPartners.map((partner, idx) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.98 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      key={partner.id} 
                      className="group bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/50 hover:-translate-y-1.5 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row relative"
                    >
                      {/* Top gold accent shimmer line */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* ================= LEFT / START LANDSCAPE CHAMBER (Logo + Badges) ================= */}
                      <div className="relative w-full lg:w-96 shrink-0 bg-gradient-to-br from-[#0e0e16] via-[#08080d] to-black p-8 sm:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                        
                        {/* Ambient logo halo */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-amber-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none" />

                        {/* Top corner status badges */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                            <ShieldCheck size={13} className="text-emerald-400" /> Verified
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-20">
                          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center gap-1.5">
                            <Handshake size={12} /> Partner
                          </span>
                        </div>

                        {/* Logo Container */}
                        <div className="relative z-10 w-48 h-32 sm:w-56 sm:h-36 flex items-center justify-center p-4 my-4">
                          <img 
                            src={partner.logo_url} 
                            alt={partner.name} 
                            className="max-w-full max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>

                        {/* Verification Tag */}
                        <div className="relative z-10 text-center">
                          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5 justify-center">
                            <BadgeCheck size={14} className="text-yellow-400" /> {t.publicPages.strategicAlliance}
                          </span>
                        </div>
                      </div>

                      {/* ================= RIGHT / END LANDSCAPE CONTENT ================= */}
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 relative z-20">
                        
                        <div>
                          {/* Partner Title & Official Domain */}
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div>
                              <span className="text-xs uppercase font-black tracking-widest text-yellow-400/90 mb-1 block">
                                {t.publicPages.institutionalEcosystem}
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-yellow-300 transition-colors">
                                {partner.name}
                              </h3>
                            </div>

                            {partner.website_url && partner.website_url !== "#" && (
                              <Link
                                href={partner.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all shadow-sm group/web"
                              >
                                <span className="max-w-[180px] truncate">{partner.website_url.replace(/^https?:\/\//, '')}</span>
                                <ExternalLink size={13} className="text-yellow-400 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-transform" />
                              </Link>
                            )}
                          </div>
                          
                          {/* Description */}
                          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                            {partner.description}
                          </p>

                          {/* Synergy Impact Highlights */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                              <span className="truncate">{t.publicPages.jointCertification}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                              <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                              <span className="truncate">{t.publicPages.talentPipeline}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                              <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                              <span className="truncate">{t.publicPages.verifiedInfrastructure}</span>
                            </div>
                          </div>
                        </div>

                        {/* Preserved Navigation Link to Partner Profile */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold">
                            <Lock size={14} className="text-yellow-400" />
                            <span>{t.publicPages.legalStatusVerified}</span>
                          </div>

                          <Link 
                            href={`/${CURRENT_LANG}/partners/${partner.slug}`} 
                            className="px-6 py-3.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                          >
                            <span>{t.publicPages.viewProfile}</span> 
                            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </section>

        {/* ================= SECTION: 4 STRATEGIC PARTNERSHIP TIERS ================= */}
        <section className="py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <Layers size={14} /> {t.publicPages.ecosystemArch}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {t.publicPages.fourPillarsTitle}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.publicPages.fourPillarsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <Laptop size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.pillar1Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.pillar1Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.pillar1Badge}
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-amber-500/40 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.pillar2Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.pillar2Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.pillar2Badge}
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <Network size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.pillar3Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.pillar3Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.pillar3Badge}
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Handshake size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.pillar4Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.pillar4Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.pillar4Badge}
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: PARTNER GOVERNANCE & ONBOARDING ================= */}
        <section className="py-20">
          <div className="rounded-[3rem] bg-gradient-to-b from-[#0a0a10] to-[#06060a] border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
                <ShieldCheck size={14} /> {t.publicPages.vettingProtocol}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {t.publicPages.vettingTitle}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.publicPages.vettingDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">{t.publicPages.stage01}</div>
                <h3 className="text-lg font-black text-white mb-2">{t.publicPages.stage1Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.stage1Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-amber-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">{t.publicPages.stage02}</div>
                <h3 className="text-lg font-black text-white mb-2">{t.publicPages.stage2Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.stage2Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">{t.publicPages.stage03}</div>
                <h3 className="text-lg font-black text-white mb-2">{t.publicPages.stage3Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.stage3Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-emerald-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">{t.publicPages.stage04}</div>
                <h3 className="text-lg font-black text-white mb-2">{t.publicPages.stage4Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.stage4Desc}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION: FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <section className="py-20 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <HelpCircle size={14} /> Institutional Inquiries
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Everything you need to know regarding Safi Academy&rsquo;s partner ecosystem, vetting procedures, student privacy, and corporate collaboration.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What benefits do partners provide to Safi Academy students?",
                a: "Our partners provide sponsored software licenses, enterprise cloud compute credits, accredited certification vouchers, direct internship and employment fast-tracks, and emergency humanitarian grants for scholars in high-risk zones."
              },
              {
                q: "How does Safi Academy protect student privacy in corporate partnerships?",
                a: "Student data is never sold or commercialized. All partner interactions are governed by legally binding Non-Disclosure Agreements (NDA) and strict GDPR/international data protection compliance."
              },
              {
                q: "Can universities and technology companies apply to become an official partner?",
                a: "Yes! We welcome applications from accredited colleges, research labs, tech startups, and global software companies that share our vision of accessible education. Inquiries can be submitted directly via our Corporate Relations Desk."
              },
              {
                q: "What is the difference between a Verified Partner and an Institutional Alliance?",
                a: "Verified Partners have signed active NDAs and offer direct service integrations. Institutional Alliances include formal university credit transfer memorandums and government-sponsored fellowship frameworks."
              },
              {
                q: "Do partner organizations hire directly from Safi Academy masterclasses?",
                a: "Yes. Leading software development firms, fintech agencies, and overseas employers regularly recruit top graduates from our Fullstack, Python, and Algorithmic Trading programs."
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#0a0a0f]/90 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left text-white font-bold text-sm sm:text-base hover:text-yellow-400 transition-colors"
                >
                  <span className="pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-yellow-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-yellow-300" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 sm:p-6 pt-0 text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ================= GRAND CTA BANNER ================= */}
        <section className="py-20">
          <div className="rounded-[3rem] bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-orange-500/20 border border-yellow-500/30 p-8 sm:p-14 md:p-16 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(234,179,8,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} /> {t.publicPages.joinGlobalMission || "Join Our Global Mission"}
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                {t.publicPages.becomeAPartner || "Become a Partner"}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                {t.publicPages.becomePartnerDesc || ""}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${currentLocale}/contact`}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_35px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Handshake size={16} /> {t.publicPages.partnerWithUsToday || "Partner With Us Today"}
                </Link>
                <Link
                  href={`/${currentLocale}/courses`}
                  className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Laptop size={16} /> {t.publicPages.exploreMasterclasses || "Explore Masterclasses"}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}