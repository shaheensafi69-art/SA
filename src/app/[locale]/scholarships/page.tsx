"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { usePathname } from "next/navigation";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, MapPin, Calendar, GraduationCap, Globe, Building2, 
  ArrowRight, ChevronDown, Sparkles, ShieldCheck, CheckCircle2, 
  Award, BookOpen, Compass, FileText, Users, Check, ExternalLink, 
  Clock, HelpCircle, Send, Layers, Bookmark, BadgeCheck, X, 
  ArrowUpRight, HeartHandshake, DollarSign, Laptop, Star
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Scholarship = {
  id: string;
  title: string;
  slug: string;
  continent: string;
  country: string;
  university: string;
  degree_level: string;
  deadline: string;
  description: string;
  cover_image: string;
};

export default function EnglishScholarshipsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const CURRENT_LANG = currentLocale;
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState("All");
  const [activeDegree, setActiveDegree] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for mobile dropdowns
  const [isContinentDropdownOpen, setIsContinentDropdownOpen] = useState(false);
  const [isDegreeDropdownOpen, setIsDegreeDropdownOpen] = useState(false);
  
  const continentDropdownRef = useRef<HTMLDivElement>(null);
  const degreeDropdownRef = useRef<HTMLDivElement>(null);

  const continents = [
    { name: "All", icon: "🌍", label: "All Regions" },
    { name: "Europe", icon: "🇪🇺", label: "Europe" },
    { name: "America", icon: "🌎", label: "Americas" },
    { name: "Asia", icon: "🌏", label: "Asia & Central" },
    { name: "Oceania", icon: "🇦🇺", label: "Oceania" }
  ];

  const degrees = [
    { name: "All", label: "All Degrees" },
    { name: "Bachelor", label: "Bachelor" },
    { name: "Master", label: "Master" },
    { name: "PhD", label: "PhD / Doctorate" }
  ];

  const quickFilters = [
    { label: "Fully Funded", query: "Fully Funded" },
    { label: "Germany (DAAD)", query: "Germany" },
    { label: "United Kingdom", query: "United Kingdom" },
    { label: "United States", query: "United States" },
    { label: "Japan (MEXT)", query: "Japan" },
    { label: "Canada", query: "Canada" },
  ];

  useEffect(() => {
    const fetchScholarships = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        let { data, error } = await supabase
          .from("scholarships")
          .select("id, title, slug, continent, country, university, degree_level, deadline, description, cover_image")
          .eq("language", currentLocale).eq("is_active", true).order("created_at", { ascending: false });
        if (!data || data.length === 0) {
          const fb = await supabase.from("scholarships").select("id, title, slug, continent, country, university, degree_level, deadline, description, cover_image").eq("language", "en").eq("is_active", true).order("created_at", { ascending: false });
          if (fb.data) data = fb.data;
        }
          
        if (error) throw error;
        if (data) setScholarships(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (continentDropdownRef.current && !continentDropdownRef.current.contains(event.target as Node)) {
        setIsContinentDropdownOpen(false);
      }
      if (degreeDropdownRef.current && !degreeDropdownRef.current.contains(event.target as Node)) {
        setIsDegreeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title?.toLowerCase().includes(q) || 
        item.country?.toLowerCase().includes(q) ||
        item.university?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q);
      
      const matchesContinent = activeContinent === "All" || item.continent === activeContinent;
      
      // Flexible matching for degree level (case-insensitive check)
      const matchesDegree = activeDegree === "All" || 
        item.degree_level?.toLowerCase().includes(activeDegree.toLowerCase());
      
      return matchesSearch && matchesContinent && matchesDegree;
    });
  }, [scholarships, searchQuery, activeContinent, activeDegree]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Rolling Admission";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getDaysLeft = (dateString: string) => {
    if (!dateString) return null;
    try {
      const target = new Date(dateString).getTime();
      const now = new Date().getTime();
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      return diff;
    } catch {
      return null;
    }
  };

  const activeContinentData = continents.find(c => c.name === activeContinent) || continents[0];
  const activeDegreeData = degrees.find(d => d.name === activeDegree) || degrees[0];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveContinent("All");
    setActiveDegree("All");
  };

  return (
    <div className="min-h-screen bg-[#030307] text-white font-sans selection:bg-yellow-500/30 overflow-hidden relative" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* ================= LUXURY AMBIENT BACKGROUND SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[500px] bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-[10%] w-[45vw] max-w-[600px] h-[550px] bg-amber-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50vw] max-w-[650px] h-[600px] bg-yellow-500/5 rounded-full blur-[170px]" />
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

      <div className="relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="pt-36 sm:pt-44 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
          
          {/* Official Accreditation Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] sm:text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <Globe className="w-4 h-4 text-yellow-400" />
            <span>{t.publicPages.globalOpportunitiesBadge}</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.08]">
            {t.publicPages.discoverScholarshipsTitle1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_10px_35px_rgba(234,179,8,0.35)]">
              {t.publicPages.discoverScholarshipsTitle2}
            </span>
          </h1>
          
          {/* Deep Informative Subtitle */}
          <p className="text-neutral-300 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            {t.publicPages.scholarshipsHeroSubtitle}
          </p>

          {/* Key Impact Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-yellow-400 mb-1">
                <Award size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.totalSecured}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">$4.8M+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.directStudentFunding}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Building2 size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.institutions}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.partnerVerifiedUnis}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <CheckCircle2 size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.successRate}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">94.6%</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.withSafiReview}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <HeartHandshake size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.tuitionCost}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{t.publicPages.hundredPercentFree}</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.zeroHiddenFee}</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto relative group px-2 sm:px-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 blur-2xl rounded-full opacity-60 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:p-3 focus-within:border-yellow-500/60 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <Search className="text-yellow-400 ml-3 sm:ml-4 mr-3 shrink-0" size={22} />
              <input 
                type="text" 
                placeholder={t.publicPages.searchScholarshipsPlaceholder} 
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
              <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold shrink-0">
                <Sparkles size={14} /> {t.publicPages.liveSearch}
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-neutral-400">
              <span className="font-bold text-neutral-500 uppercase tracking-widest text-[10px]">{t.publicPages.quickSearches}</span>
              {quickFilters.map((qf, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(qf.query)}
                  className={`px-3 py-1 rounded-full border transition-all text-xs ${
                    searchQuery === qf.query 
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300 font-bold" 
                      : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {qf.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FILTERS SECTION (Continent & Degree Level) ================= */}
        <section className="pb-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
          
          {/* 1. CONTINENT FILTERS */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={14} className="text-yellow-400" />
              <p className="text-neutral-400 text-[11px] font-black uppercase tracking-widest">{t.publicPages.filterByGlobalRegion}</p>
            </div>
            
            {/* Desktop Version (Pills) */}
            <div className="hidden sm:flex justify-center w-full">
              <div className="flex items-center justify-center gap-2 bg-[#0a0a0f]/80 p-2 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
                {continents.map((continent) => (
                  <button
                    key={continent.name}
                    onClick={() => setActiveContinent(continent.name)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      activeContinent === continent.name 
                        ? "text-black" 
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {activeContinent === continent.name && (
                      <motion.div 
                        layoutId="engScholarshipTab" 
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full -z-10 shadow-[0_0_25px_rgba(234,179,8,0.5)]" 
                      />
                    )}
                    <span className="relative z-10 text-base">{continent.icon}</span> 
                    <span className="relative z-10">{continent.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Version (Dropdown) */}
            <div className="sm:hidden relative w-full" ref={continentDropdownRef}>
              <button 
                onClick={() => setIsContinentDropdownOpen(!isContinentDropdownOpen)}
                className="w-full flex items-center justify-between bg-[#0a0a0f] border border-white/15 rounded-2xl p-4 text-white font-bold uppercase tracking-widest text-xs shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activeContinentData.icon}</span>
                  <span>Region: {activeContinentData.label}</span>
                </div>
                <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isContinentDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isContinentDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-50 divide-y divide-white/5"
                  >
                    {continents.map((continent) => (
                      <button
                        key={continent.name}
                        onClick={() => {
                          setActiveContinent(continent.name);
                          setIsContinentDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-4 text-xs font-black uppercase tracking-widest transition-colors ${
                          activeContinent === continent.name 
                            ? "bg-yellow-500/15 text-yellow-400 border-l-4 border-yellow-400" 
                            : "text-neutral-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-xl">{continent.icon}</span>
                        {continent.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 2. DEGREE LEVEL FILTERS */}
          <div className="flex flex-col items-center pt-2">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={14} className="text-amber-400" />
              <p className="text-neutral-400 text-[11px] font-black uppercase tracking-widest">{t.publicPages.filterByDegreeProgram}</p>
            </div>
            
            {/* Desktop Version (Pills) */}
            <div className="hidden sm:flex justify-center w-full">
              <div className="flex items-center justify-center gap-2 bg-[#0a0a0f]/80 p-2 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
                {degrees.map((deg) => (
                  <button
                    key={deg.name}
                    onClick={() => setActiveDegree(deg.name)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      activeDegree === deg.name 
                        ? "text-black" 
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {activeDegree === deg.name && (
                      <motion.div 
                        layoutId="engDegreeTab" 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full -z-10 shadow-[0_0_20px_rgba(245,158,11,0.4)]" 
                      />
                    )}
                    <span className="relative z-10">{deg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Version (Dropdown) */}
            <div className="sm:hidden relative w-full" ref={degreeDropdownRef}>
              <button 
                onClick={() => setIsDegreeDropdownOpen(!isDegreeDropdownOpen)}
                className="w-full flex items-center justify-between bg-[#0a0a0f] border border-white/15 rounded-2xl p-4 text-white font-bold uppercase tracking-widest text-xs shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={18} className="text-yellow-400" />
                  <span>Program: {activeDegreeData.label}</span>
                </div>
                <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isDegreeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDegreeDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-50 divide-y divide-white/5"
                  >
                    {degrees.map((deg) => (
                      <button
                        key={deg.name}
                        onClick={() => {
                          setActiveDegree(deg.name);
                          setIsDegreeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-4 text-xs font-black uppercase tracking-widest transition-colors ${
                          activeDegree === deg.name 
                            ? "bg-yellow-500/15 text-yellow-400 border-l-4 border-yellow-400" 
                            : "text-neutral-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {deg.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-neutral-400 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                Showing <strong className="text-white">{filteredScholarships.length}</strong> active scholarship {filteredScholarships.length === 1 ? "opportunity" : "opportunities"}
                {(searchQuery || activeContinent !== "All" || activeDegree !== "All") && " matching your criteria"}
              </span>
            </div>

            {(searchQuery || activeContinent !== "All" || activeDegree !== "All") && (
              <button 
                onClick={clearAllFilters}
                className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-wider text-[11px] underline underline-offset-4"
              >
                {t.publicPages.resetAllFilters}
              </button>
            )}
          </div>

        </section>

        {/* ================= SCHOLARSHIPS GRID OR LOADING ================= */}
        <section className="pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          
          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-28">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_25px_rgba(234,179,8,0.5)]" />
              <p className="text-yellow-400 font-black tracking-widest uppercase text-xs animate-pulse">
                {t.publicPages.syncingScholarshipDb}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredScholarships.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-center py-24 px-6 bg-[#0a0a0f]/90 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-2xl mx-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                    <Globe className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{t.publicPages.noMatchingScholarships}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
                      We couldn't find active opportunities matching &ldquo;{searchQuery || `${activeContinent} - ${activeDegree}`}&rdquo;. Try broadening your search or resetting filters.
                    </p>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-transform"
                  >
                    {t.publicPages.viewAllScholarships}
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredScholarships.map((item, idx) => {
                    const daysLeft = getDaysLeft(item.deadline);
                    const isUrgent = daysLeft !== null && daysLeft > 0 && daysLeft <= 30;

                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.96, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, delay: idx * 0.04 }}
                        key={item.id} 
                        className="group bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/50 hover:-translate-y-2 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col relative"
                      >
                        {/* Glowing accent border on top */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Cover Image & Badges */}
                        <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent group-hover:opacity-60 transition-opacity duration-500 z-10" />
                          <img 
                            src={item.cover_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800"} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105" 
                          />
                          
                          {/* Country Tag */}
                          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <span className="bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                              <MapPin size={12} className="text-yellow-400" /> {item.country}
                            </span>
                          </div>

                          {/* Continent / Verified Badges */}
                          <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
                            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                              {item.continent}
                            </span>
                            {isUrgent && (
                              <span className="bg-rose-500/90 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                                <Clock size={10} /> {t.publicPages.closingSoon}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-20">
                          
                          {/* Program Title */}
                          <h3 className="text-lg sm:text-xl font-black text-white mb-3 line-clamp-2 leading-snug group-hover:text-yellow-300 transition-colors">
                            {item.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-neutral-400 text-xs sm:text-sm line-clamp-3 mb-6 font-normal leading-relaxed">
                            {item.description ? item.description.replace(/<[^>]*>/g, "") : "Discover full eligibility criteria, funding allowances, and step-by-step submission guidelines inside."}
                          </p>
                          
                          {/* University & Degree Metadata */}
                          <div className="space-y-3 mb-6 flex-1 pt-2 border-t border-white/5">
                            <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-yellow-400">
                                <Building2 size={15} />
                              </div>
                              <div className="overflow-hidden">
                                <span className="text-[10px] uppercase text-neutral-500 font-black tracking-widest block">{t.publicPages.institutionLabel}</span>
                                <span className="font-bold line-clamp-1 text-white">{item.university}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                                <GraduationCap size={15} />
                              </div>
                              <div className="overflow-hidden">
                                <span className="text-[10px] uppercase text-neutral-500 font-black tracking-widest block">{t.publicPages.academicLevel}</span>
                                <span className="font-bold text-white">{item.degree_level}</span>
                              </div>
                            </div>
                          </div>

                          {/* Deadline Strip */}
                          <div className="flex items-center justify-between text-xs text-neutral-300 bg-white/[0.03] border border-white/5 p-3 rounded-2xl mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-yellow-400" />
                              <span className="font-bold text-white text-[11px] sm:text-xs">
                                Deadline: {formatDate(item.deadline)}
                              </span>
                            </div>
                            {daysLeft !== null && daysLeft > 0 && (
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                isUrgent ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"
                              }`}>
                                {daysLeft} {daysLeft === 1 ? "day left" : "days left"}
                              </span>
                            )}
                          </div>

                          {/* Preserved Navigation Link */}
                          <Link 
                            href={`/${CURRENT_LANG}/scholarships/${item.slug}`} 
                            className="w-full py-4 px-5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                          >
                            <span>{t.publicPages.viewRequirementsAndApply}</span> 
                            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          )}
        </section>

        {/* ================= SECTION: 4-STEP SCHOLARSHIP BLUEPRINT ================= */}
        <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <Compass size={14} /> {t.publicPages.provenSuccessMethodology}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {t.publicPages.fourStepBlueprint}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.publicPages.blueprintDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-colors shadow-xl">
              <div className="text-4xl font-black text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors mb-4">
                01
              </div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <FileText size={22} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{t.publicPages.step1Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.step1Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400/90 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.step1Badge}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-amber-500/40 transition-colors shadow-xl">
              <div className="text-4xl font-black text-amber-500/20 group-hover:text-amber-500/40 transition-colors mb-4">
                02
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <BookOpen size={22} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{t.publicPages.step2Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.step2Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-amber-400/90 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.step2Badge}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-colors shadow-xl">
              <div className="text-4xl font-black text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors mb-4">
                03
              </div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <Building2 size={22} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{t.publicPages.step3Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.step3Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400/90 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.step3Badge}
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-xl">
              <div className="text-4xl font-black text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4">
                04
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{t.publicPages.step4Title}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.step4Desc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-emerald-400/90 flex items-center gap-1.5">
                <Check size={14} /> {t.publicPages.step4Badge}
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: FUNDING TIERS & PRESTIGIOUS GRANTS ================= */}
        <section className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="rounded-[3rem] bg-gradient-to-b from-[#0a0a10] to-[#06060a] border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
                <Award size={14} /> {t.publicPages.globalFundingArchetypes}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {t.publicPages.understandingScholarshipTiers}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.publicPages.tiersDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">{t.publicPages.category01}</div>
                <h3 className="text-lg font-black text-white mb-3">{t.publicPages.cat1Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 flex-1">
                  {t.publicPages.cat1Desc}
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat1Perk1}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat1Perk2}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat1Perk3}</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-amber-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">{t.publicPages.category02}</div>
                <h3 className="text-lg font-black text-white mb-3">{t.publicPages.cat2Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 flex-1">
                  {t.publicPages.cat2Desc}
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat2Perk1}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat2Perk2}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat2Perk3}</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">{t.publicPages.category03}</div>
                <h3 className="text-lg font-black text-white mb-3">{t.publicPages.cat3Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 flex-1">
                  {t.publicPages.cat3Desc}
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat3Perk1}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat3Perk2}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat3Perk3}</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-cyan-400/40 transition-all">
                <div className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2">Category 04</div>
                <h3 className="text-lg font-black text-white mb-3">{t.publicPages.cat4Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6 flex-1">
                  {t.publicPages.cat4Desc}
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat4Perk1}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat4Perk2}</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> {t.publicPages.cat4Perk3}</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION: SAFI MENTORSHIP & DOCUMENT CLINIC ================= */}
        <section className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest">
                <BadgeCheck size={14} /> {t.publicPages.safiAcademicAdvisory}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {t.publicPages.dontApplyAlone}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.publicPages.dontApplyAloneDesc}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base">Motivation Letter (SOP) Surgery</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">We analyze your narrative arc, hook, career objectives, and university alignment word-by-word.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base">Europass & US ATS CV Optimization</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">Format your achievements, research publications, and leadership milestones according to international committee standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base">Mock Interview & Defense Panels</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">Practice with past scholarship winners from Oxford, TUM Germany, and Tokyo Tech to master behavioral and academic interview questions.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  href={`/${currentLocale}/support`} 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105 transition-all"
                >
                  <Sparkles size={16} /> Connect With Application Mentors
                </Link>
              </div>
            </div>

            {/* Checklist Graphic Card */}
            <div className="lg:col-span-6 bg-[#0a0a0f] border border-white/10 rounded-[3rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div>
                  <h3 className="text-xl font-black text-white">Application Readiness Dossier</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Standard requirements for competitive global applications</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Verified Matrix
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">1. Official Transcripts & Degree Certificates</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> Required</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">2. Statement of Purpose (SOP / Motivation)</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> Crucial</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">3. Academic Letters of Recommendation (2-3)</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> Required</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">4. English Proficiency (IELTS / TOEFL / MOI)</span>
                  <span className="text-yellow-400 font-black flex items-center gap-1"><Check size={14} /> Waiverable</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">5. Detailed Academic CV / Resume (ATS Standard)</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> Required</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-neutral-300 font-medium">6. Research Proposal (Masters by Research & PhD)</span>
                  <span className="text-cyan-400 font-black flex items-center gap-1"><Check size={14} /> Program Specific</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs leading-relaxed flex items-center gap-3">
                <Sparkles size={20} className="shrink-0 text-yellow-400" />
                <span>Tip: Many European universities accept an <strong>English Medium of Instruction (MOI) Certificate</strong> instead of IELTS if your previous degree was in English.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <section className="py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <HelpCircle size={14} /> Clarifications & Guidance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Everything you need to know about international scholarship applications, deadlines, English proficiency, and Safi Academy mentorship.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can I apply for global scholarships without an IELTS or TOEFL score?",
                a: "Yes, in many cases! Hundreds of universities across Germany, France, Italy, Hungary, China, and Malaysia accept an English Medium of Instruction (MOI) letter from your previous university. Furthermore, prestigious scholarships like the DAAD or Turkiye Burslari frequently offer language prep years or accept Duolingo English Test (DET) scores."
              },
              {
                q: "Does Safi Academy charge any fee for scholarship listings or mentorship?",
                a: "Absolutely not. Safi Academy is a non-profit humanitarian and educational initiative. Our scholarship database, document review guides, application webinars, and community mentorship are 100% free of charge for all students."
              },
              {
                q: "Are high school graduates eligible for fully-funded Bachelor degrees abroad?",
                a: "Yes. Major international government grants such as the Turkiye Burslari, MEXT Undergraduate, Chinese Government Scholarship (CSC), Romanian Government Grant, and various Korean GKS programs offer full funding for Bachelor students, including language training and living allowances."
              },
              {
                q: "How early should I begin preparing my scholarship documents?",
                a: "We strongly recommend beginning 6 to 9 months before the target university deadline. Document translation, notarization, writing your motivation letter, and requesting recommendations from university professors typically take between 60 to 90 days."
              },
              {
                q: "Can Afghan students facing visa restrictions still secure international scholarships?",
                a: "Yes. Despite consular closures in Kabul, thousands of Afghan scholars successfully process their student visas through neighboring hubs like Islamabad, Tehran, New Delhi, or Dubai. Numerous European and North American universities offer official sponsorship letters and visa expedition assistance for enrolled scholars."
              },
              {
                q: "What makes an application stand out to scholarship selection committees?",
                a: "Beyond solid grades, committees prioritize purposeful commitment: clearly articulating how your studies will solve real-world problems in your home country, demonstrable leadership or volunteer experience, and genuine familiarity with the specific curriculum of the host university."
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

        {/* ================= GRAND CALL TO ACTION ================= */}
        <section className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="rounded-[3rem] bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-orange-500/20 border border-yellow-500/30 p-8 sm:p-14 md:p-16 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(234,179,8,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} /> {t.publicPages.turnAmbitionReality}
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                {t.publicPages.yourIntlDegreeStarts}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                {t.publicPages.intlDegreeDesc}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_35px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Compass size={16} /> {t.publicPages.exploreAllScholarshipsNow}
                </button>
                <Link
                  href={`/${currentLocale}/courses`}
                  className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Laptop size={16} /> {t.publicPages.upskillFreeCourses}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}