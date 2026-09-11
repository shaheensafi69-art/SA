"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Removed Twitter import from lucide-react as it's not exported
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, X } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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

        {/* ================= ARTICLE CONTENT CARD ================= */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-[2.5rem] bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Top Gold Shimmer & Ambient Glow */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Render Markdown Content */}
          <MarkdownRenderer content={post.content} />
        </motion.article>

        {/* ================= AUTHOR BIO & ECOSYSTEM CTA ================= */}
        <div className="mt-12 rounded-[2rem] bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0 shadow-lg">
              <User size={28} />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-yellow-500 mb-1">Published by Author</p>
              <h4 className="text-lg font-black text-white">{post.author_name}</h4>
              <p className="text-xs text-neutral-400">Contributor at Safi Academy International Research & Editorial</p>
            </div>
          </div>
          <Link
            href="/en/courses"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shrink-0"
          >
            Explore Masterclasses →
          </Link>
        </div>

        {/* ================= FOOTER / SHARE SECTION ================= */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Thanks for reading</p>
            <p className="text-sm font-black text-white">Safi Academy Insights & Analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mr-2">Share:</span>
            <button onClick={copyToClipboard} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" title="Copy Link">
              <Share2 size={16} />
            </button>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors" title="Share on WhatsApp">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.822 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={`https://t.me/share/url?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#229ED9] hover:bg-[#229ED9]/10 transition-colors" title="Share on Telegram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.926z"/></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" title="Share on X (Twitter)">
              <X size={16} />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors" title="Share on LinkedIn">
              <Share2 size={16} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}