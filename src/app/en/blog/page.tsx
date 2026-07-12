"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Calendar, User, ArrowRight, BookOpen, Clock, Tag, Search, Globe, X, ChevronDown } from "lucide-react";

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

// محاسبه زمان مطالعه
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const noHtmlContent = content.replace(/<[^>]*>/g, "");
  const words = noHtmlContent.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function EnglishBlogOverviewPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // State for mobile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        // 🔥 فقط و فقط مقالات انگلیسی این پوشه را فیلتر میکند
        let query = supabase
          .from("blogs")
          .select("id, title, slug, content, author_name, cover_image, category, created_at")
          .eq("language", "en")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (activeCategory !== "All") {
          query = query.eq("category", activeCategory);
        }

        const { data: postsData, error: postsError } = await query;
        if (postsError) throw postsError;
        if (postsData) setPosts(postsData);

        // دریافت دسته‌بندی‌های منحصربه‌فرد انگلیسی
        const { data: catData } = await supabase
          .from("blogs")
          .select("category")
          .eq("language", "en")
          .eq("is_published", true)
          .not("category", "is", null);

        if (catData) {
          const uniqueCats = Array.from(new Set(catData.map(c => c.category)));
          setCategories(["All", ...uniqueCats]);
        }
      } catch (error) {
        console.error("Error loading English blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

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

  // فیلتر جستجوی زنده
  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pb-40 overflow-hidden" dir="ltr">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-yellow-600/5 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-40">
        
        {/* HERO HEADER */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-8 shadow-inner animate-[fadeInDown_0.5s_ease-out]">
            <BookOpen size={14} /> Knowledge Hub
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
            Safi Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 drop-shadow-lg">Insights.</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Stay ahead of the curve with expert analysis, technical deep-dives, and corporate updates from our leading software specialists. Discover the future of Fintech.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-12 relative group px-2 sm:px-0">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative flex items-center bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full p-2 focus-within:border-yellow-500/50 transition-colors shadow-2xl">
              <Search className="text-yellow-500 ml-3 sm:ml-4 mr-2 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-neutral-600 px-2 py-2.5 sm:py-3 font-medium text-xs sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="mr-3 text-neutral-600 hover:text-yellow-500"><X size={18} /></button>
              )}
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <section className="mb-16 max-w-5xl mx-auto">
          
          {/* Desktop Version (Pills) */}
          <div className="hidden sm:flex justify-center w-full">
            <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md min-w-max shadow-inner">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat ? "text-black" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div layoutId="engActiveTab" className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full -z-10 shadow-[0_0_20px_rgba(234,179,8,0.4)]" />
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
              className="w-full flex items-center justify-between bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white font-bold uppercase tracking-widest text-xs shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Tag size={16} className="text-yellow-500" />
                <span>Category: {activeCategory}</span>
              </div>
              <ChevronDown size={16} className={`text-yellow-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-2 right-2 mt-2 bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                        activeCategory === cat 
                          ? "bg-yellow-500/10 text-yellow-500 border-l-2 border-yellow-500" 
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {activeCategory === cat ? <Tag size={14} /> : <div className="w-[14px]"></div>}
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </section>

        {/* ARTICLES GRID */}
        {isLoading ? (
          <div className="w-full flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
            <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-[#0a0a0e] border border-white/5 rounded-[2rem] sm:rounded-[3rem] shadow-inner flex flex-col items-center gap-4 mx-2 sm:mx-0">
            <Globe className="w-16 h-16 text-neutral-700" />
            <h3 className="text-lg sm:text-xl font-bold text-neutral-400">No articles available matching your criteria.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <AnimatePresence>
              {filteredPosts.map((post, idx) => {
                const readTime = calculateReadingTime(post.content);
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                    key={post.id}
                    className="group bg-[#0a0a0e] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/50 hover:-translate-y-2 transition-all duration-500 shadow-xl flex flex-col"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
                      <img src={post.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%] group-hover:grayscale-0" />
                      <span className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm border border-white/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                        <Clock size={12} /> {readTime} min read
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-neutral-500 text-[10px] sm:text-[11px] font-bold tracking-wide mb-5">
                        <span className="flex items-center gap-1.5 truncate"><User size={13} className="text-yellow-500/70 shrink-0" /> {post.author_name}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-yellow-500/70" /> {formatDate(post.created_at)}</span>
                          <span className="bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">{post.category || "General"}</span>
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-5 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                        {post.content.replace(/<[^>]*>/g, "")}
                      </p>

                      <Link
                        href={`/en/blog/${post.slug}`}
                        className="mt-auto flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 group-hover:text-white transition-all pt-5 border-t border-white/5 w-full"
                      >
                        Read Full Insights
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-2" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}