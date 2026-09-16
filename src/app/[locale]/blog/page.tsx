"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  Calendar, User, ArrowRight, BookOpen, Clock, Tag, Search, 
  Globe, X, ChevronDown, Sparkles, CheckCircle2, TrendingUp, 
  Code2, ShieldCheck, Bookmark, Compass, HelpCircle, Send, 
  Share2, Layers, Laptop, Award, Check, Lightbulb, FileText, 
  ArrowUpRight, Star
} from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_name: string;
  cover_image: string;
  category: string;
  created_at: string;
};

// Calculate reading time based on 200 wpm standard
const calculateReadingTime = (content: string) => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const noHtmlContent = content.replace(/<[^>]*>/g, "");
  const words = noHtmlContent.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export default function EnglishBlogOverviewPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for mobile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const quickSearchTags = [
    { label: "All Insights", query: "" },
    { label: "Web Engineering", query: "Web" },
    { label: "System Design", query: "System" },
    { label: "Fintech & Trading", query: "Trading" },
    { label: "Cloud & DevOps", query: "Cloud" },
    { label: "Scholarships", query: "Scholarship" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        let query = supabase
          .from("blogs")
          .select("id, title, slug, content, author_name, cover_image, category, created_at")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (activeCategory !== "All") {
          query = query.eq("category", activeCategory);
        }

        let { data: postsData, error: postsError } = await query;
        if (postsError) throw postsError;
        if (postsData) {
          // If any posts match the currentLocale, show them; otherwise show all published
          const localeMatched = postsData.filter((p: any) => p.language === currentLocale);
          setPosts(localeMatched.length > 0 ? localeMatched : postsData);
        }

        // Fetch distinct categories
        const { data: catData } = await supabase
          .from("blogs")
          .select("category")
          .eq("is_published", true)
          .not("category", "is", null);

        if (catData) {
          const uniqueCats = Array.from(new Set(catData.map(c => c.category))).filter(Boolean);
          setCategories(["All", ...uniqueCats]);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, currentLocale]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time search filter
  const filteredPosts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return posts.filter(post => {
      if (!q) return true;
      const titleMatch = post.title?.toLowerCase().includes(q);
      const contentMatch = post.content?.toLowerCase().includes(q);
      const authorMatch = post.author_name?.toLowerCase().includes(q);
      const categoryMatch = post.category?.toLowerCase().includes(q);
      return titleMatch || contentMatch || authorMatch || categoryMatch;
    });
  }, [posts, searchTerm]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently Published";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  // Lead / Featured article (first item if available)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : (filteredPosts.length === 1 && (searchTerm || activeCategory !== "All") ? filteredPosts : []);

  return (
    <div className="min-h-screen bg-[#030307] text-white font-sans selection:bg-yellow-500/30 overflow-hidden relative" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* ================= LUXURY AMBIENT BACKGROUND SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Gold & Amber Glow Spheres */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[550px] bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[30%] -left-[10%] w-[45vw] max-w-[600px] h-[500px] bg-amber-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50vw] max-w-[650px] h-[550px] bg-yellow-500/5 rounded-full blur-[170px]" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-36 sm:pt-44">
        
        {/* ================= HERO HEADER ================= */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          
          {/* Official Accreditation Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] sm:text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <BookOpen size={14} className="text-yellow-400" />
            <span>{t.publicPages.editorialBadge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.08]">
            {t.publicPages.blogHeroTitle1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_10px_35px_rgba(234,179,8,0.35)]">
              {t.publicPages.blogHeroTitle2}
            </span>
          </h1>

          {/* Deep Informative Subtitle */}
          <p className="text-neutral-300 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            {t.publicPages.blogHeroSubtitle}
          </p>

          {/* Key Editorial Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-yellow-400 mb-1">
                <FileText size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.articles}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">120+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.peerReviewedTechGuides}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <User size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.authors}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.seniorEngineersScholars}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <TrendingUp size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.publicPages.readership}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">45K+</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.monthlyReaders}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{t.teacherPages.access || "Access"}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{t.publicPages.hundredPercentFree}</div>
              <p className="text-[11px] text-neutral-400 mt-1">{t.publicPages.openSourceKnowledgeBase}</p>
            </div>
          </div>

          {/* Smart Search Bar */}
          <div className="max-w-3xl mx-auto relative group px-2 sm:px-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 blur-2xl rounded-full opacity-60 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:p-3 focus-within:border-yellow-500/60 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <Search className="text-yellow-400 ml-3 sm:ml-4 mr-3 shrink-0" size={22} />
              <input 
                type="text" 
                placeholder={t.publicPages.searchBlogPlaceholder} 
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-neutral-500 text-sm sm:text-base font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors mr-2"
                  title={t.publicPages.clearSearch}
                >
                  <X size={18} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold shrink-0">
                <Sparkles size={14} /> {t.publicPages.liveFilter}
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-neutral-400">
              <span className="font-bold text-neutral-500 uppercase tracking-widest text-[10px]">{t.publicPages.popularTopics}</span>
              {quickSearchTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setSearchTerm(tag.query)}
                  className={`px-3 py-1 rounded-full border transition-all text-xs ${
                    searchTerm === tag.query 
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300 font-bold" 
                      : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CATEGORY FILTER TABS (Preserved & Enhanced) ================= */}
        <section className="mb-14 max-w-5xl mx-auto space-y-4">
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Compass size={14} className="text-yellow-400" />
            <p className="text-neutral-400 text-[11px] font-black uppercase tracking-widest">{t.publicPages.filterKnowledgeDomain}</p>
          </div>

          {/* Desktop Version (Pills) */}
          <div className="hidden sm:flex justify-center w-full">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-[#0a0a0f]/80 p-2 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat ? "text-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="engActiveTab" 
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full -z-10 shadow-[0_0_25px_rgba(234,179,8,0.45)]" 
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Version (Dropdown) */}
          <div className="sm:hidden relative w-full px-2" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-[#0a0a0f] border border-white/15 rounded-2xl p-4 text-white font-bold uppercase tracking-widest text-xs shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Tag size={18} className="text-yellow-400" />
                <span>Domain: {activeCategory}</span>
              </div>
              <ChevronDown size={18} className={`text-yellow-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-2 right-2 mt-2 bg-[#0c0c12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-50 divide-y divide-white/5"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-4 text-xs font-black uppercase tracking-widest transition-colors ${
                        activeCategory === cat 
                          ? "bg-yellow-500/15 text-yellow-400 border-l-4 border-yellow-400" 
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {activeCategory === cat ? <Tag size={14} className="text-yellow-400" /> : <div className="w-[14px]"></div>}
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-neutral-400 px-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                Showing <strong className="text-white">{filteredPosts.length}</strong> published {filteredPosts.length === 1 ? "article" : "articles"}
                {(searchTerm || activeCategory !== "All") && ` in ${activeCategory}`}
              </span>
            </div>

            {(searchTerm || activeCategory !== "All") && (
              <button 
                onClick={clearAllFilters}
                className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-wider text-[11px] underline underline-offset-4"
              >
                Reset Filters
              </button>
            )}
          </div>

        </section>

        {/* ================= FEATURED LEAD ARTICLE SPOTLIGHT ================= */}
        {!isLoading && featuredPost && !searchTerm && activeCategory === "All" && (
          <section className="mb-20">
            <div className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-4 flex items-center gap-2">
              <Star size={14} className="fill-yellow-400" /> Lead Editorial Feature
            </div>

            <div className="group relative rounded-[3rem] bg-gradient-to-br from-[#0c0c14] to-[#06060a] border border-white/10 hover:border-yellow-500/40 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-500">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Image */}
                <div className="lg:col-span-6 relative aspect-video rounded-[2rem] overflow-hidden bg-neutral-950 border border-white/10">
                  <img 
                    src={featuredPost.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Clock size={12} className="text-yellow-400" /> {calculateReadingTime(featuredPost.content)} min read
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {featuredPost.category || "Featured Article"}
                    </span>
                    <span className="text-neutral-400 text-xs font-bold flex items-center gap-1.5">
                      <Calendar size={13} className="text-yellow-400" /> {formatDate(featuredPost.created_at)}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-5 leading-snug group-hover:text-yellow-300 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-normal line-clamp-3">
                    {featuredPost.content.replace(/<[^>]*>/g, "")}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-black">Author</p>
                        <p className="text-sm font-bold text-white">{featuredPost.author_name}</p>
                      </div>
                    </div>

                    <Link
                      href={`/${currentLocale}/blog/${featuredPost.slug}`}
                      className="px-6 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase text-xs tracking-widest transition-all shadow-[0_0_25px_rgba(234,179,8,0.35)] hover:scale-105 flex items-center gap-2"
                    >
                      Read Full Deep-Dive <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ================= ARTICLES GRID OR EMPTY STATE ================= */}
        <section className="mb-28">
          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_25px_rgba(234,179,8,0.5)]"></div>
              <p className="text-yellow-400 font-black tracking-widest uppercase text-xs animate-pulse">
                Synchronizing Editorial Archives...
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 px-6 bg-[#0a0a0f]/90 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                <Globe className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">{t.publicPages.noArticlesFound}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
                  We couldn&rsquo;t find articles matching &ldquo;{searchTerm || activeCategory}&rdquo;. Try another keyword or browse all categories.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-transform"
              >
                Browse All Articles
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              <AnimatePresence>
                {(searchTerm || activeCategory !== "All" ? filteredPosts : standardPosts).map((post, idx) => {
                  const readTime = calculateReadingTime(post.content);
                  return (
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.96 }}
                      transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
                      key={post.id}
                      className="group bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/50 hover:-translate-y-2 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col relative"
                    >
                      {/* Glow line on top */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Cover Image & Chips */}
                      <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60" />
                        <img 
                          src={post.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800"} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105" 
                        />
                        <span className="absolute bottom-4 right-4 z-20 bg-black/75 backdrop-blur-sm border border-white/15 text-yellow-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Clock size={12} /> {readTime} min read
                        </span>
                        <span className="absolute top-4 left-4 z-20 bg-black/75 backdrop-blur-sm border border-white/15 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                          {post.category || "General"}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20">
                        
                        {/* Author & Date metadata */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-neutral-400 text-xs font-bold tracking-wide mb-4">
                          <span className="flex items-center gap-1.5 truncate text-neutral-300">
                            <User size={13} className="text-yellow-400 shrink-0" /> 
                            {post.author_name}
                          </span>
                          <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                            <Calendar size={13} className="text-yellow-400/80" /> 
                            {formatDate(post.created_at)}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-4 line-clamp-2 leading-snug group-hover:text-yellow-300 transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                          {post.content.replace(/<[^>]*>/g, "")}
                        </p>

                        {/* Preserved Navigation Link */}
                        <Link
                          href={`/${currentLocale}/blog/${post.slug}`}
                          className="mt-auto flex items-center justify-between text-xs font-black uppercase tracking-widest text-neutral-300 group-hover:text-yellow-300 transition-all pt-5 border-t border-white/5 w-full"
                        >
                          <span>{t.publicPages.readFullInsights}</span>
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5 text-yellow-400" />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ================= SECTION: 4 KNOWLEDGE CURATION TRACKS ================= */}
        <section className="py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <Layers size={14} /> Curated Reading Streams
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Explore Our Core Knowledge Tracks
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Navigate structured collections tailored for software engineers, quantitative analysts, international scholars, and technology leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Track 1 */}
            <div 
              onClick={() => setSearchTerm("Web")}
              className="cursor-pointer bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <Code2 size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.trackWebTitle}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.trackWebDesc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400 flex items-center gap-1.5">
                <span>{t.publicPages.filterWebGuides}</span> <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Track 2 */}
            <div 
              onClick={() => setSearchTerm("Trading")}
              className="cursor-pointer bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.trackFinanceTitle}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.trackFinanceDesc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                <span>{t.publicPages.filterQuantArticles}</span> <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Track 3 */}
            <div 
              onClick={() => setSearchTerm("Scholarship")}
              className="cursor-pointer bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-yellow-500/40 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.trackScholarshipTitle}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.trackScholarshipDesc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-yellow-400 flex items-center gap-1.5">
                <span>{t.publicPages.filterAcademicGuides}</span> <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Track 4 */}
            <div 
              onClick={() => setSearchTerm("Cloud")}
              className="cursor-pointer bg-[#0a0a0f]/90 border border-white/10 rounded-[2rem] p-7 flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                <Laptop size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.publicPages.trackCloudTitle}</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                {t.publicPages.trackCloudDesc}
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                <span>{t.publicPages.filterCloudPosts}</span> <ArrowUpRight size={14} />
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: EDITORIAL QUALITY & PEER REVIEW ================= */}
        <section className="py-20">
          <div className="rounded-[3rem] bg-gradient-to-b from-[#0a0a10] to-[#06060a] border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
                <ShieldCheck size={14} /> {t.publicPages.editorialStandardsBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {t.publicPages.howWeEngineerInsightsTitle}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.publicPages.howWeEngineerInsightsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mb-4">
                  <Code2 size={20} />
                </div>
                <h3 className="text-base font-black text-white mb-2">{t.publicPages.editorialPillar1Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.editorialPillar1Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-base font-black text-white mb-2">{t.publicPages.editorialPillar2Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.editorialPillar2Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-yellow-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-base font-black text-white mb-2">{t.publicPages.editorialPillar3Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.editorialPillar3Desc}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-emerald-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-base font-black text-white mb-2">{t.publicPages.editorialPillar4Title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.publicPages.editorialPillar4Desc}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION: FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <section className="py-20 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
              <HelpCircle size={14} /> {t.publicPages.faqBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {t.publicPages.editorialFaqTitle}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.publicPages.editorialFaqDesc}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How frequently are new technical articles published on Safi Academy?",
                a: "Our editorial team and contributing engineers release 3 to 5 comprehensive deep-dives every month across software engineering, quantitative finance, system design, and international scholarship guides."
              },
              {
                q: "Are the code repositories and examples mentioned in articles freely accessible?",
                a: "Yes! 100% of our code snippets, starter architectures, and companion GitHub repositories are provided freely to the community under MIT and Apache 2.0 open-source licenses."
              },
              {
                q: "Can I submit a guest article or technical research whitepaper?",
                a: "We welcome contributions from experienced software engineers, researchers, and scholars. You can submit your draft outline or article proposal directly through our support desk or by contacting the editorial team."
              },
              {
                q: "Are articles available in other languages like Persian (Farsi / Dari)?",
                a: "Yes. Safi Academy publishes select flagship articles in bilingual format (English and Persian) to empower regional communities and ensure cutting-edge software knowledge is accessible without linguistic barriers."
              },
              {
                q: "How can I request a tutorial on a specific technology or framework?",
                a: "You can propose topics via our student community channels or by submitting a ticket in the student dashboard. Popular community requests are regularly prioritized by our authoring specialists."
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
        <section className="py-20 mb-20">
          <div className="rounded-[3rem] bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-orange-500/20 border border-yellow-500/30 p-8 sm:p-14 md:p-16 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(234,179,8,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} /> {t.publicPages.accelerateCareerBadge}
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                {t.publicPages.turnTheoryIntoCodeTitle}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                {t.publicPages.turnTheoryIntoCodeDesc}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${currentLocale}/courses`}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_35px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Laptop size={16} /> {t.publicPages.exploreAllCoursesBtn}
                </Link>
                <Link
                  href={`/${currentLocale}/scholarships`}
                  className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Award size={16} /> {t.publicPages.findScholarshipsBtn}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}