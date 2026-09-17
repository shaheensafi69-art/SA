"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Lightbulb,
  Code2, Server, BarChart3, Building2, User,
  Database, Layout, Languages, Briefcase, Mail, MapPin, 
  MessageCircle, ArrowLeft, ExternalLink, CheckCircle2,
  Sparkles, Terminal, Phone, Send, Copy, Check
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom Social SVG Components
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function ShaheenSafiExecutiveDossier() {
  const pathname = usePathname() || '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const moveX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ssafi9241@hotmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Verified Executive Socials
  const mySocials = [
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/shaheen-safi-b73a30299", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
    { name: "Instagram", icon: <InstagramIcon size={18} />, href: "https://www.instagram.com/top_g_official1", color: "hover:text-[#E4405F] hover:border-[#E4405F]/40" },
    { name: "Facebook", icon: <FacebookIcon size={18} />, href: "https://www.facebook.com/share/1H1vuV1i9Z/", color: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
    { name: "TikTok", icon: <TikTokIcon size={18} />, href: "https://www.tiktok.com/@safi_sahib6", color: "hover:text-white hover:border-white/40" },
    { name: "WhatsApp", icon: <MessageCircle size={18} />, href: "https://wa.me/+19342032497", color: "hover:text-[#25D366] hover:border-[#25D366]/40" },
  ];

  return (
    <div 
      className="min-h-screen bg-[#030307] text-white font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-black" 
       
      onMouseMove={handleMouseMove}
    >
      {/* ================= BACKGROUND COSMIC SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(234, 179, 8, 0.5) 1px, transparent 1px), radial-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            backgroundPosition: '0 0, 22px 22px'
          }}
        />
        {/* Glowing Nebulae */}
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-yellow-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-amber-600/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[35%] h-[35%] bg-emerald-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-12 z-50">
          <Link 
            href={`/${currentLocale}/about`} 
            className="flex items-center gap-2 text-neutral-300 hover:text-yellow-400 transition-all font-bold text-xs uppercase tracking-widest bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/[0.08] hover:border-yellow-500/30 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft size={16} /> Back to Executive Board
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              Executive Office • London / Kabul
            </span>
          </div>
        </header>

        {/* ================= HERO DOSSIER THEATER ================= */}
        <section ref={containerRef} className="relative pt-36 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            {/* Ambient Backlight Halo */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-yellow-500/30 via-amber-500/20 to-transparent blur-[90px] rounded-[5rem] pointer-events-none" />
            
            {/* Portrait Frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 rounded-[3.5rem] p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/0 border border-yellow-500/30 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-[#07070d]">
                <Image 
                  src="/team/shaheen.jpeg" 
                  alt="Shaheen Safi - {t.publicPages.founderGroupCeo}" 
                  fill 
                  className="object-cover object-top" 
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030307] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* 3D Holographic Badges */}
            <motion.div 
              style={{ x: moveX, y: moveY, translateZ: 130 }} 
              className="absolute -left-6 sm:-left-12 bottom-10 z-20"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a12]/90 border border-yellow-500/30 backdrop-blur-2xl shadow-2xl">
                <Code2 size={20} className="text-yellow-400" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-wider text-yellow-400">{t.publicPages.leadArchitect}</p>
                  <p className="text-xs font-bold text-white">{t.publicPages.fullStackFintech}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ x: moveY, y: moveX, translateZ: 150 }} 
              className="absolute -right-6 sm:-right-12 top-12 z-20"
            >
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-black tracking-widest text-xs uppercase shadow-[0_10px_35px_rgba(234,179,8,0.4)] flex items-center gap-2">
                <Building2 size={15} />
                <span>{t.publicPages.founderGroupCeo}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Coordinates */}
          <div className="text-center mt-12 px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-inner">
              <Sparkles size={13} /> Safi International Capital LTD • UK Reg: 17063286
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3">
              Shaheen <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600">Safi</span>
            </h1>

            <p className="text-neutral-300 font-semibold tracking-wide text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Founder, Group Chief Executive Officer & Lead Fintech Systems Architect of the Safi Global Ecosystem.
            </p>

            {/* Social Channels Cluster */}
            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {mySocials.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-300 ${social.color} transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl text-xs font-bold`}
                  title={social.name}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </Link>
              ))}
            </div>

            {/* Direct Coordinates Strip */}
            <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mt-8 text-neutral-400 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <MapPin size={15} className="text-yellow-400"/> London, UK & Kabul, AFG
              </span>
              <button 
                onClick={copyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-yellow-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail size={15} className="text-yellow-400"/>
                <span>ssafi9241@hotmail.com</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-neutral-500" />}
              </button>
            </div>
          </div>
        </section>

        {/* ================= EXECUTIVE MANIFESTO ================= */}
        <section className="py-16 container mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-14 md:p-16 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-amber-500" />
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{t.publicPages.architectManifesto}</h2>
            </div>

            {isRtl ? (
              <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
                <p>
                  مسیر حرفه‌ای من در محیط پرنوسان و حساس بازارهای مالی بین‌المللی آغاز شد. با فعالیت تمام‌وقت در بازارهای فارکس و ارزهای جهانی از سال ۲۰۱۶ تا اواخر ۲۰۲۴، درکی عمیق از جریان‌های نقدینگی جهانی، پویایی دفتر سفارشات و مدیریت ریسک‌های نهادی به دست آوردم.
                </p>
                <p>
                  در دسامبر ۲۰۲۴، پس از اخذ گواهینامه معتبر تحلیل تکنیکال بین‌المللی از <strong className="text-white font-bold underline decoration-yellow-400 underline-offset-4">فدراسیون بین‌المللی تحلیل‌گران تکنیکال (IFTA)</strong>، دریافتم که استقلال واقعی مالی تنها با معامله‌گری حاصل نمی‌شود؛ بلکه نیازمند معماری زیرساخت‌های دیجیتال و نرم‌افزارهای سازمانی پردازش تراکنش‌هاست.
                </p>
                <div className="my-8 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent p-8 rounded-3xl border-r-4 border-yellow-400 text-yellow-100 shadow-inner">
                  <p className="italic text-base sm:text-xl font-medium leading-relaxed">
                    «ما آکادمی صافی و صافی‌پی را تنها برای حضور در اقتصاد دیجیتال تأسیس نکردیم؛ هدف ما ساختن پلی استوار و تسخیرناپذیر از آموزش و زیرساخت مالی بود تا جوانان و دانش‌پژوهان را مستقیماً به بازارهای سازمانی اروپا و آمریکا متصل سازیم.»
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-400">
                    <span>— شاهین صافی</span>
                    <span>•</span>
                    <span>لندن، بریتانیا</span>
                  </div>
                </div>
                <p>
                  با داشتن مدرک لیسانس علوم کامپیوتر از <strong className="text-white font-bold">دانشگاه فنی استانبول (ITU)</strong>، مهندسی محاسباتی دقیق را با چشم‌انداز شرکتی تلفیق کرده‌ام. به عنوان بنیان‌گذار و مدیرعامل هلدینگ <strong className="text-white font-bold">Safi International Capital LTD</strong>، هدایت معماری فنی پلتفرم‌های اصلی‌مان از جمله بانکداری دیجیتال صافی‌پی، صافی تاپ‌آپ، پوشاک بین‌المللی صافی‌پرو و آکادمی صافی را بر عهده دارم.
                </p>
              </div>
            ) : (
              <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
                <p>
                  My professional trajectory commenced in the high-stakes, volatile environment of international financial markets. Operating as a full-time trader across the Forex markets and foreign currency matrices from 2016 through late 2024, I developed a deep, visceral understanding of global liquidity flows, order-book dynamics, and institutional risk mitigation.
                </p>
                <p>
                  In December 2024, upon earning the prestigious <strong className="text-white font-bold underline decoration-yellow-400 underline-offset-4">International Technical Analysis Certification from IFTA (International Federation of Technical Analysts)</strong>, I recognized that true financial sovereignty cannot be achieved through trading alone—it requires architecting the underlying digital conduits and enterprise software that process global transactions.
                </p>
                <div className="my-8 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent p-8 rounded-3xl border-l-4 border-yellow-400 text-yellow-100 shadow-inner">
                  <p className="italic text-base sm:text-xl font-medium leading-relaxed">
                    "We did not establish Safi Academy and SafiPay merely to participate in the digital economy—we founded them to build an unassailable financial and educational bridge connecting Afghan youth and global scholars directly with European and American enterprise markets."
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-400">
                    <span>— Shaheen Safi</span>
                    <span>•</span>
                    <span>London, United Kingdom</span>
                  </div>
                </div>
                <p>
                  Holding a Bachelor of Computer Science degree from <strong className="text-white font-bold">Istanbul Technical University (ITU)</strong>, I integrate rigorous computational engineering with corporate vision. As Founder and Group CEO of <strong className="text-white font-bold">Safi International Capital LTD</strong>, I lead the technical architecture and strategic trajectory of our key platforms: SafiPay Digital Banking, Safi TopUp Global, SafiPro International Apparel, and Safi Academy.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= 4-PILLAR ECOSYSTEM DIRECTORY ================= */}
        <section className="py-16 container mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-3 block">Corporate Portfolio</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">The Safi Global Enterprise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/40 transition-all duration-500 group shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">SafiPay Digital Banking</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Next-generation multi-currency financial infrastructure enabling instant physical and virtual Visa card issuance, SEPA Instant compliance, and seamless cross-border liquidity across 150+ countries.
              </p>
              <a href="https://www.safipay.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 hover:text-white transition-colors">
                <span>Explore SafiPay Protocol</span> <ExternalLink size={13} />
              </a>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/40 transition-all duration-500 group shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Safi TopUp Global</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Instant digital settlement network connected to 700+ telecommunications operators worldwide, powering real-time mobile recharges, utility settlements, and international gaming pins.
              </p>
              <a href="https://www.safitopup.site" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors">
                <span>Explore Safi TopUp Network</span> <ExternalLink size={13} />
              </a>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/40 transition-all duration-500 group shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Safi Academy</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                The flagship educational academy operating under UK company registration #17063286, offering verifiable certification across E-Commerce, Applied AI, Financial Markets, and 100% full-ride scholarships.
              </p>
              <Link href={`/${currentLocale}/courses`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors">
                <span>View Academic Faculties</span> <ExternalLink size={13} />
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/40 transition-all duration-500 group shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">SafiPro Apparel</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Premium developer and tech streetwear engineered with certified organic cotton, minimalist cyberpunk branding, and international carbon-neutral direct distribution.
              </p>
              <a href="https://www.safipro.site" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-white transition-colors">
                <span>Explore SafiPro Apparel</span> <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= TECHNICAL ARCHITECTURE STACK ================= */}
        <section className="py-20 bg-yellow-500/[0.02] border-y border-white/10">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-2 block">System Engineering</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Core Technical Stack</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Code2 className="text-yellow-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Frontend & Mobile</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Next.js 14/15 App Router, React.js, TypeScript, Flutter, Dart, Tailwind CSS, Framer Motion.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Database className="text-yellow-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Backend & Data</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  PostgreSQL, Supabase Enterprise, Node.js, Python, Redis Caching, Microservices, REST & GraphQL.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Server className="text-yellow-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Network Security</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Cisco IOS, Routing & Switching, Hardware Firewalls, Encrypted VPN Tunnels, SSL/TLS, ISO 27001.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <BarChart3 className="text-yellow-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Financial Markets</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Smart Money Concepts (SMC), Order Flow, IFTA Technical Analysis, Algorithmic Risk Execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CAREER MILESTONES & EDUCATION ================= */}
        <section className="py-24 container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Career Trajectory */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <Briefcase className="text-yellow-400" /> Executive Milestones
              </h2>

              <div className="space-y-10 border-l-2 border-yellow-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.7)]" />
                  <h4 className="text-xl font-black text-white">{t.publicPages.founderGroupCeo}</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Safi International Capital LTD (2025 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Registered in England and Wales under Company No. 17063286. Leading corporate holding governance, sovereign compliance, and multi-platform fintech deployments worldwide.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Full-Time Institutional Forex Trader</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Global Currency Markets (2016 - 2024)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Over 8 years managing high-frequency liquidity, order books, and cross-currency execution. Transitioned focus into building automated fintech infrastructure in late 2024.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Lead IT & Systems Specialist</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Afghanistan Football Federation (2019 - 2024)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Architected enterprise network topology, high-throughput server backbones, live broadcast uplinks, and digital identity databases for national operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Credentials & Languages */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <GraduationCap className="text-yellow-400" /> Academic Pedigree
              </h2>

              <div className="space-y-10 border-l-2 border-yellow-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.7)]" />
                  <h4 className="text-xl font-black text-white">Istanbul Technical University (ITU)</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Bachelor of Science in Computer Science (2019 - 2023)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Specialized in Distributed Systems Architecture, Algorithmic Computational Complexity, and Cryptographic Security at one of Eurasia's most prestigious technical institutions.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">IFTA Professional Certification</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">International Federation of Technical Analysts (Dec 2024)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Certified international credentials in quantitative market modeling, risk analysis, and macro-financial behavioral analytics.
                  </p>
                </div>
              </div>

              {/* Language Matrix */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-300">
                  <Languages size={16} className="text-yellow-400"/> Linguistic Fluency
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { lang: 'English', level: 'Professional Fluent' },
                    { lang: 'Persian / Dari', level: 'Native' },
                    { lang: 'Pashto', level: 'Native' },
                    { lang: 'Turkish', level: 'Conversational Academic' }
                  ].map((item, idx) => (
                    <div key={idx} className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.lang}</span>
                      <span className="text-[10px] text-yellow-400 uppercase tracking-wider font-mono">({item.level})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= EXECUTIVE SEAL & HONORS ================= */}
        <section className="py-16 container mx-auto max-w-4xl px-6 text-center">
          <div className="bg-gradient-to-br from-yellow-500/10 via-white/[0.02] to-transparent p-10 sm:p-14 md:p-16 rounded-[3.5rem] border border-yellow-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none" />
            <Award className="text-yellow-400 mx-auto mb-6 relative z-10" size={56} />
            <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10 text-white tracking-tight">Institutional Accreditations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-yellow-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">IFTA Global Certification</p>
                  <p className="text-neutral-400 text-xs">Technical Analysis & Financial Market Engineering</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-yellow-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">UK Companies House Registry</p>
                  <p className="text-neutral-400 text-xs">Incorporation No. 17063286 (London, UK)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-yellow-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">ITU Computer Science Graduate</p>
                  <p className="text-neutral-400 text-xs">Istanbul Technical University Alumni</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-yellow-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">20+ Corporate Seminars</p>
                  <p className="text-neutral-400 text-xs">Keynote on E-Commerce & FinTech</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXECUTIVE FOOTER TERMINAL --- */}
        <footer className="py-14 text-center border-t border-white/10 mt-10">
          <div className="flex justify-center gap-3 mb-6">
            {mySocials.map((social, idx) => (
              <Link 
                key={idx} 
                href={social.href} 
                target="_blank" 
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-400 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-md"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-[11px] font-black tracking-[0.25em] uppercase">
            Shaheen Safi • Executive Portfolio • Safi International Capital LTD 2026
          </p>
        </footer>

      </div>
    </div>
  );
}