"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Removed Twitter import from lucide-react as it's not exported
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, X } from "lucide-react";

// تعریف تایپ مقاله
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

// تابع محاسبه زمان مطالعه
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const noHtmlContent = content.replace(/<[^>]*>/g, "");
  const words = noHtmlContent.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("language", "en") // 🔥 قفل شده روی زبان انگلیسی برای این پوشه
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (error) throw error;
        if (data) setPost(data);
      } catch (error) {
        console.error("Error loading the blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // کپی کردن لینک مقاله برای اشتراک گذاری
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        <p className="text-yellow-500 font-bold tracking-widest uppercase text-xs animate-pulse">Loading Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-neutral-400 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link href="/en/blog" className="px-6 py-3 rounded-xl font-bold text-black bg-yellow-500 hover:bg-yellow-400 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  const readTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans pb-32 overflow-hidden selection:bg-yellow-500/30">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[200px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* ================= FLOATING BACK BUTTON ================= */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <button 
          onClick={() => router.push('/en/blog')}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-40">
        
        {/* ================= ARTICLE HEADER ================= */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md flex items-center gap-1.5">
              <Tag size={12} /> {post.category || "General"}
            </span>
            <span className="bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md flex items-center gap-1.5">
              <Clock size={12} /> {readTime} min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 leading-[1.15] text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400 text-sm font-bold border-b border-white/10 pb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">Author</p>
                <p className="text-white">{post.author_name}</p>
              </div>
            </div>
            
            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center text-neutral-500">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">Published</p>
                <p className="text-white">{formatDate(post.created_at)}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= COVER IMAGE ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-white/5"
        >
          <img 
            src={post.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80"></div>
        </motion.div>

        {/* ================= ARTICLE CONTENT ================= */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-yellow-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl leading-relaxed text-neutral-300"
          // در صورتی که بعداً از ادیتور متنی استفاده کنید، این کد تگ‌های HTML را به درستی رندر می‌کند
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ================= FOOTER / SHARE SECTION ================= */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Thanks for reading</p>
            <p className="text-sm font-black text-white">Safi Academy Insights</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mr-2">Share:</span>
            <button onClick={copyToClipboard} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors tooltip-trigger" title="Copy Link">
              <Share2 size={16} />
            </button>
            <Link href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-blue-400/20 hover:border-blue-400/50 transition-colors" title="Share on X (Twitter)">
              <X size={16} />
            </Link>
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-600/50 transition-colors">
              <Share2 size={16} /> {/* Replaced Linkedin with Share2 due to import error */}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}