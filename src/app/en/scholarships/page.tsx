"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, MapPin, Calendar, GraduationCap, Globe, Building2, ArrowRight } from "lucide-react";
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

// 🔥 ثابت شده روی زبان انگلیسی برای این پوشه
const CURRENT_LANG = "en"; 

export default function EnglishScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // دکمه‌های قاره‌ها
  const continents = [
    { name: "All", icon: "🌍" },
    { name: "Europe", icon: "🇪🇺" },
    { name: "America", icon: "🌎" },
    { name: "Asia", icon: "🌏" },
    { name: "Oceania", icon: "🇦🇺" }
  ];

  useEffect(() => {
    const fetchScholarships = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("scholarships")
          .select("id, title, slug, continent, country, university, degree_level, deadline, description, cover_image")
          .eq("language", CURRENT_LANG) // 🔥 فیلتر سمت سرور فقط برای زبان انگلیسی
          .eq("is_active", true)
          .order("created_at", { ascending: false });
          
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

  // سیستم فیلتر کلاینت ساید برای جستجو و قاره‌ها
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.university?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesContinent = activeContinent === "All" || item.continent === activeContinent;
      
      return matchesSearch && matchesContinent;
    });
  }, [scholarships, searchQuery, activeContinent]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Rolling Deadline";
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-600/5 rounded-full blur-[150px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="pt-40 pb-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 animate-[fadeInDown_0.5s_ease-out] shadow-inner">
            <Globe className="w-4 h-4" /> Global Academic Opportunities
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Discover Global <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 drop-shadow-lg">Scholarships.</span>
          </h1>
          
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 px-4">
            Safi Academy bridges the gap between ambition and opportunity. Explore fully-funded and partially-funded scholarships from the world's top universities.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group px-2 sm:px-0">
            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative flex items-center bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full p-2 focus-within:border-yellow-500/50 transition-colors shadow-2xl">
              <Search className="text-yellow-500 ml-3 sm:ml-4 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search by country, university, or keyword..." 
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-neutral-600 px-2 py-2.5 sm:py-3 text-xs sm:text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ================= CONTINENT FILTERS ================= */}
        <section className="pb-12 px-4 sm:px-6 max-w-7xl mx-auto flex justify-center">
          <div className="w-full sm:w-auto overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex items-center sm:justify-center gap-2 sm:gap-3 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md min-w-max mx-auto px-2 shadow-inner">
              {continents.map((continent) => (
                <button
                  key={continent.name}
                  onClick={() => setActiveContinent(continent.name)}
                  className={`relative flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    activeContinent === continent.name 
                      ? "text-black" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {activeContinent === continent.name && (
                    <motion.div layoutId="engScholarshipTab" className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full -z-10 shadow-[0_0_20px_rgba(234,179,8,0.4)]" />
                  )}
                  <span className="relative z-10 text-sm sm:text-base">{continent.icon}</span> 
                  <span className="relative z-10">{continent.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SCHOLARSHIPS GRID OR LOADING ================= */}
        <section className="pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          
          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
              <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Opportunities...</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredScholarships.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-24 bg-[#0a0a0e] border border-white/5 rounded-[2rem] sm:rounded-[3rem] mx-2 sm:mx-0 shadow-inner flex flex-col items-center gap-6"
                >
                  <Globe className="w-16 h-16 text-neutral-700" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">No Scholarships Found</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm px-4">We couldn't find any active opportunities matching your criteria in English.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredScholarships.map((item, idx) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      key={item.id} 
                      className="group bg-[#0a0a0e] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-500 shadow-xl flex flex-col"
                    >
                      {/* Cover Image & Badges */}
                      <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-black/20 to-transparent group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
                        <img 
                          src={item.cover_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800"} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-[10%] group-hover:grayscale-0" 
                        />
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          <span className="bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <MapPin size={12} className="text-yellow-500" /> {item.country}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-20">
                          <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                            {item.continent}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1 relative z-20">
                        <h3 className="text-lg sm:text-xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-neutral-400 text-xs sm:text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                          {item.description.replace(/<[^>]*>/g, "")}
                        </p>
                        
                        <div className="space-y-3 mb-8 flex-1">
                          <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                            <Building2 size={16} className="text-neutral-500 shrink-0 mt-0.5" />
                            <span className="font-bold line-clamp-1">{item.university}</span>
                          </div>
                          <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                            <GraduationCap size={16} className="text-neutral-500 shrink-0 mt-0.5" />
                            <span className="font-bold">{item.degree_level}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs sm:text-sm text-black font-black uppercase tracking-widest bg-yellow-500/90 p-3 rounded-xl shadow-inner mt-4">
                            <Calendar size={16} className="shrink-0" />
                            <span>Deadline: {formatDate(item.deadline)}</span>
                          </div>
                        </div>

                        {/* 🔥 هدایت به صفحه اسلاگ داخلی */}
                        <Link 
                          href={`/${CURRENT_LANG}/scholarships/${item.slug}`} 
                          className="w-full py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all shadow-lg group/btn"
                        >
                          View Requirements 
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-50 group-hover/btn:opacity-100" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </section>

      </div>
    </div>
  );
}