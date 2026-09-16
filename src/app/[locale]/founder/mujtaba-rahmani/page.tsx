'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Lightbulb,
  Code2, Server, BarChart3, Binary, User,
  Database, Layout, Languages, Briefcase, Mail, MapPin, 
  MessageCircle, ArrowLeft, ExternalLink, CheckCircle2,
  Sparkles, Terminal, Phone, Send, Copy, Check,
  TrendingUp, PieChart, Activity, Trophy, Lock
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

export default function MujtabaRahmaniExecutiveDossier() {
  const pathname = usePathname() || '/en';
  const currentLocale = pathname.split('/')[1] || 'en';

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
    navigator.clipboard.writeText("mujtaba@safipay.net");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Executive Social Links
  const socialLinks = [
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/mujtabarahmani", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
    { name: "Instagram", icon: <InstagramIcon size={18} />, href: "https://www.instagram.com/bigshot_tradez", color: "hover:text-[#E4405F] hover:border-[#E4405F]/40" },
    { name: "Facebook", icon: <FacebookIcon size={18} />, href: "https://www.facebook.com/mujtaba.rahmani.792", color: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
    { name: "TikTok", icon: <TikTokIcon size={18} />, href: "https://www.tiktok.com/@chill_asf_fr", color: "hover:text-white hover:border-white/40" },
    { name: "WhatsApp", icon: <MessageCircle size={18} />, href: "https://wa.me/+93793035609", color: "hover:text-[#25D366] hover:border-[#25D366]/40" },
  ];

  return (
    <div 
      className="min-h-screen bg-[#030307] text-white font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white" 
       
      onMouseMove={handleMouseMove}
    >
      {/* ================= BACKGROUND COSMIC SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), radial-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            backgroundPosition: '0 0, 22px 22px'
          }}
        />
        {/* Glowing Nebulae */}
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-indigo-900/15 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[35%] h-[35%] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-12 z-50">
          <Link 
            href={`/${currentLocale}/about`} 
            className="flex items-center gap-2 text-neutral-300 hover:text-blue-400 transition-all font-bold text-xs uppercase tracking-widest bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/[0.08] hover:border-blue-500/30 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft size={16} /> Back to Executive Board
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              Operations & Cyber Governance • Kabul
            </span>
          </div>
        </header>

        {/* ================= HERO DOSSIER THEATER ================= */}
        <section ref={containerRef} className="relative pt-36 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            {/* Ambient Backlight Halo */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-transparent blur-[90px] rounded-[5rem] pointer-events-none" />
            
            {/* Portrait Frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 rounded-[3.5rem] p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/0 border border-blue-500/30 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-[#07070d]">
                <Image 
                  src="/team/mujtaba.jpeg" 
                  alt="Sayed Mujtaba Rahmani - COO & CISO" 
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
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a12]/90 border border-blue-500/30 backdrop-blur-2xl shadow-2xl">
                <TrendingUp size={20} className="text-blue-400" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-wider text-blue-400">Forex Specialist</p>
                  <p className="text-xs font-bold text-white">Macro Order Flow</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ x: moveY, y: moveX, translateZ: 150 }} 
              className="absolute -right-6 sm:-right-12 top-12 z-20"
            >
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black tracking-widest text-xs uppercase shadow-[0_10px_35px_rgba(37,99,235,0.4)] flex items-center gap-2">
                <Lock size={15} />
                <span>COO & CISO</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Coordinates */}
          <div className="text-center mt-12 px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-inner">
              <Sparkles size={13} /> Corporate Executive • SafiPay & Safi Academy
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3">
              Mujtaba <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-600">Rahmani</span>
            </h1>

            <p className="text-neutral-300 font-semibold tracking-wide text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Chief Operating Officer (COO), Chief Information Security Officer (CISO) & Financial Markets Strategist.
            </p>

            {/* Social Channels Cluster */}
            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {socialLinks.map((social, idx) => (
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
                <MapPin size={15} className="text-blue-400"/> Kabul, Afghanistan
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <User size={15} className="text-blue-400"/> Born: July 28, 2006
              </span>
              <button 
                onClick={copyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail size={15} className="text-blue-400"/>
                <span>mujtaba@safipay.net</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-neutral-500" />}
              </button>
            </div>
          </div>
        </section>

        {/* ================= CO-FOUNDER'S MISSION ================= */}
        <section className="py-16 container mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-14 md:p-16 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-8 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600" />
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">The Co-Founder's Mission</h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
              <p>
                My name is <strong className="text-white font-bold">Sayed Mujtaba Rahmani</strong>. In a world where digital boundaries are dissolving and economic sovereignty is governed by code, my life mission is to engineer systems that grant Afghan students and global professionals unfettered access to world-class financial instruments and technical education.
              </p>
              
              <p>
                Holding a specialized academic foundation in <strong className="text-white font-bold underline decoration-blue-500 underline-offset-4">Economics and Online Business from the University of the People (UoPeople, USA)</strong>, I have dedicated myself to bridging traditional macroeconomic models with modern decentralized fintech architecture.
              </p>

              {/* Callout Quote Box */}
              <div className="my-8 bg-gradient-to-r from-blue-600/15 via-indigo-600/5 to-transparent p-8 rounded-3xl border-l-4 border-blue-500 text-blue-100 shadow-inner">
                <p className="italic text-base sm:text-xl font-medium leading-relaxed">
                  "True resilience in financial engineering is forged through discipline. Just as in mixed martial arts, where split-second decisions dictate survival, managing high-stakes capital and securing banking infrastructure demands absolute mental clarity, zero complacency, and unyielding tactical execution."
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-400">
                  <span>— Sayed Mujtaba Rahmani</span>
                  <span>•</span>
                  <span>Chief Operating Officer & CISO</span>
                </div>
              </div>

              <p>
                Beyond strategic operations and corporate management, I remain an active full-time participant in the global currency markets. Analyzing institutional order books, Smart Money Concepts (SMC), and market structure since 2021 has provided the tactical intuition required to steer SafiPay's risk management protocols and ensure ironclad cybersecurity across our ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CORE COMPETENCIES & MANDATES ================= */}
        <section className="py-20 bg-blue-600/[0.02] border-y border-white/10">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-400 mb-2 block">Executive Responsibilities</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Core Competencies</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <BarChart3 className="text-blue-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Market Analysis</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Advanced Technical Analysis, Price Action, Smart Money Concepts (SMC), Foreign Exchange order flow.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Globe className="text-blue-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Digital Economy</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Macroeconomic modeling, cross-border e-commerce strategy, digital currency settlement frameworks.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <ShieldCheck className="text-blue-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Cybersecurity (CISO)</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Defensive infrastructure security, encryption standards, vulnerability audits, anti-fraud telemetry.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <PieChart className="text-blue-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Capital Strategy</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Operational budgeting, risk-to-reward ratio governance, corporate treasury allocation, liquidity scaling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WORK EXPERIENCE & PHYSICAL DISCIPLINE ================= */}
        <section className="py-24 container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Professional Experience */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <Briefcase className="text-blue-400" /> Executive History
              </h2>

              <div className="space-y-10 border-l-2 border-blue-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.7)]" />
                  <h4 className="text-xl font-black text-white">Chief Operating Officer & CISO</h4>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">SafiPay & Safi International Capital LTD (2025 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Directing day-to-day enterprise operations, cross-departmental coordination, information security audits, and banking gateway scaling across Europe, Asia, and the Americas.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Full-Time Institutional Forex Trader</h4>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Independent Markets (2021 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Managing proprietary currency books using order-flow analysis, liquidity pool mapping, and institutional risk-reward models under high-volatility macro conditions.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Director of Academic Finance</h4>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Safi Academy (2025 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Governing the 100% full-ride scholarship endowment allocations, educational treasury, and financial trading curriculum design.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Credentials & Discipline */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <GraduationCap className="text-blue-400" /> Academic & Lifestyle Discipline
              </h2>

              <div className="space-y-10 border-l-2 border-blue-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.7)]" />
                  <h4 className="text-xl font-black text-white">University of the People (UoPeople, USA)</h4>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Bachelor of Economics & Online Business</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Comprehensive focus on modern microeconomics, digital commerce strategies, global trade balance, and multinational corporate finance.
                  </p>
                </div>
              </div>

              {/* Physical Conditioning Matrix */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-300">
                  <Activity size={16} className="text-blue-400"/> Physical Discipline & Conditioning
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-white font-bold text-xs">MMA Fighter</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Combat Focus</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-white font-bold text-xs">Endurance Running</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Stamina & Grit</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-white font-bold text-xs">Tactical Gaming</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Rapid Reflexes</p>
                  </div>
                </div>
              </div>

              {/* Language Matrix */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 mt-6">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-300">
                  <Languages size={16} className="text-blue-400"/> Linguistic Proficiency
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { lang: 'English', level: 'Professional Working' },
                    { lang: 'Persian / Dari', level: 'Native' },
                    { lang: 'Pashto', level: 'Native' }
                  ].map((item, idx) => (
                    <div key={idx} className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.lang}</span>
                      <span className="text-[10px] text-blue-400 uppercase tracking-wider font-mono">({item.level})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= CORE ACHIEVEMENTS & AWARDS ================= */}
        <section className="py-16 container mx-auto max-w-4xl px-6 text-center">
          <div className="bg-gradient-to-br from-blue-600/10 via-white/[0.02] to-transparent p-10 sm:p-14 md:p-16 rounded-[3.5rem] border border-blue-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
            <Trophy className="text-blue-400 mx-auto mb-6 relative z-10" size={56} />
            <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10 text-white tracking-tight">Executive Achievements</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Co-Founder of SafiPay</p>
                  <p className="text-neutral-400 text-xs">Architecting international payment operations</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Economics & Business Degree</p>
                  <p className="text-neutral-400 text-xs">University of the People, United States</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">4+ Years Active Forex Trader</p>
                  <p className="text-neutral-400 text-xs">Proven track record in macro currency markets</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Youth Economic Advocate</p>
                  <p className="text-neutral-400 text-xs">Pioneering digital education across Central Asia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXECUTIVE FOOTER TERMINAL --- */}
        <footer className="py-14 text-center border-t border-white/10 mt-10">
          <div className="flex justify-center gap-3 mb-6">
            {socialLinks.map((social, idx) => (
              <Link 
                key={idx} 
                href={social.href} 
                target="_blank" 
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-400 hover:border-blue-400 hover:text-blue-400 transition-all shadow-md"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-[11px] font-black tracking-[0.25em] uppercase">
            Sayed Mujtaba Rahmani • Executive Portfolio • Safi International Capital LTD 2026
          </p>
        </footer>

      </div>
    </div>
  );
}