"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Lightbulb, Star, Landmark,
  Code2, Server, BarChart3, Binary, User,
  Database, Layout, Languages, Briefcase, Mail, MapPin, 
  MessageCircle, ArrowLeft, ExternalLink, CheckCircle2,
  Sparkles, Terminal, Phone, Send, Copy, Check,
  Camera
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getFounderLocaleData } from "@/utils/founderTranslations";

// Custom Social SVG Components
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

export default function SahelSalemExecutiveDossier() {
  const pathname = usePathname() || '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const t = getPortalTranslation(currentLocale);
  const { dict: fDict, isRtl } = getFounderLocaleData(currentLocale);
  const sl = fDict.sahelSalem;

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
    navigator.clipboard.writeText("sahelsalem@safipay.net");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Executive Social Links
  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon size={18} />, href: "https://www.instagram.com/s4_hel1?igsh=a3k3YW8zNHRxZXUx&utm_source=qr", color: "hover:text-[#E4405F] hover:border-[#E4405F]/40" },
    { name: "Facebook", icon: <FacebookIcon size={18} />, href: "https://www.facebook.com/share/1A6hht1gio/?mibextid=wwXIfr", color: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
    { name: "WhatsApp", icon: <MessageCircle size={18} />, href: "https://wa.me/+93700582033", color: "hover:text-[#25D366] hover:border-[#25D366]/40" },
  ];

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#030307] text-white font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-black" 
      onMouseMove={handleMouseMove}
    >
      {/* ================= BACKGROUND COSMIC SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px), radial-gradient(rgba(5, 150, 105, 0.3) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            backgroundPosition: '0 0, 22px 22px'
          }}
        />
        {/* Glowing Nebulae */}
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-emerald-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-teal-900/15 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[35%] h-[35%] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-12 z-50">
          <Link 
            href={`/${currentLocale}/about`} 
            className="flex items-center gap-2 text-neutral-300 hover:text-emerald-400 transition-all font-bold text-xs uppercase tracking-widest bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/[0.08] hover:border-emerald-500/30 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} /> {sl.backLink}
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              {sl.office}
            </span>
          </div>
        </header>

        {/* ================= HERO DOSSIER THEATER ================= */}
        <section ref={containerRef} className="relative pt-36 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            {/* Ambient Backlight Halo */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-emerald-600/30 via-teal-600/20 to-transparent blur-[90px] rounded-[5rem] pointer-events-none" />
            
            {/* Portrait Frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 rounded-[3.5rem] p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/0 border border-emerald-500/30 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-[#07070d]">
                <Image 
                  src="/team/sahel.jpeg" 
                  alt={`${sl.name} - ${sl.role}`} 
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
              className={`absolute ${isRtl ? '-right-6 sm:-right-12' : '-left-6 sm:-left-12'} bottom-10 z-20`}
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a12]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl">
                <Landmark size={20} className="text-emerald-400" />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <p className="text-[10px] uppercase font-black tracking-wider text-emerald-400">{sl.badgeEuro}</p>
                  <p className="text-xs font-bold text-white">{sl.badgeExpansion || "EU Integration"}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ x: moveY, y: moveX, translateZ: 150 }} 
              className={`absolute ${isRtl ? '-left-6 sm:-left-12' : '-right-6 sm:-right-12'} top-12 z-20`}
            >
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-black font-black tracking-widest text-xs uppercase shadow-[0_10px_35px_rgba(16,185,129,0.4)] flex items-center gap-2">
                <Globe size={15} />
                <span>{sl.badgeCEO}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Coordinates */}
          <div className="text-center mt-12 px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-inner">
              <Sparkles size={13} /> {sl.office}
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3">
              {sl.firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">{sl.lastName}</span>
            </h1>

            <p className="text-neutral-300 font-semibold tracking-wide text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {sl.bio}
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
                <MapPin size={15} className="text-emerald-400"/> {sl.coordinates}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <User size={15} className="text-emerald-400"/> {sl.role}
              </span>
              <button 
                onClick={copyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer"
                title={sl.clickCopy}
              >
                <Mail size={15} className="text-emerald-400"/>
                <span>sahelsalem@safipay.net</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-neutral-500" />}
                {copiedEmail && <span className="text-emerald-400 text-xs ml-1">{sl.copied}</span>}
              </button>
            </div>
          </div>
        </section>

        {/* ================= EXECUTIVE VISION & MISSION ================= */}
        <section className="py-16 container mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-14 md:p-16 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-8 rounded-full bg-gradient-to-b from-emerald-400 to-teal-600" />
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{sl.manifestoTitle}</h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
              <p>
                {sl.manifestoP1}
              </p>
              
              <p>
                {sl.manifestoP2}
              </p>

              {/* Callout Quote Box */}
              <div className={`my-8 bg-gradient-to-r from-emerald-600/15 via-teal-600/5 to-transparent p-8 rounded-3xl ${isRtl ? 'border-r-4' : 'border-l-4'} border-emerald-400 text-emerald-100 shadow-inner`}>
                <p className="italic text-base sm:text-xl font-medium leading-relaxed">
                  {sl.manifestoQuote}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <span>{sl.manifestoAuthor}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPANSION MANDATES ================= */}
        <section className="py-20 bg-emerald-500/[0.02] border-y border-white/10">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400 mb-2 block">{sl.pillarsBadge}</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{sl.pillarsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <Globe className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black text-white mb-3">{sl.p1Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                  {sl.p1Desc}
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <Landmark className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black text-white mb-3">{sl.p2Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                  {sl.p2Desc}
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <ShieldCheck className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black text-white mb-3">{sl.p3Title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                  {sl.p3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACADEMIC CREDENTIALS & LANGUAGES ================= */}
        <section className="py-24 container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Academic Track */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <GraduationCap className="text-emerald-400" /> {sl.pedigreeTitle}
              </h2>

              <div className={`space-y-10 ${isRtl ? 'border-r-2 pr-8 mr-3' : 'border-l-2 pl-8 ml-3'} border-emerald-500/20`}>
                <div className="relative">
                  <div className={`absolute ${isRtl ? '-right-[41px]' : '-left-[41px]'} top-1.5 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.7)]`} />
                  <h4 className="text-xl font-black text-white">{sl.edu1Title}</h4>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">{sl.edu1Subtitle}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {sl.edu1Desc}
                  </p>
                </div>

                <div className="relative">
                  <div className={`absolute ${isRtl ? '-right-[41px]' : '-left-[41px]'} top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full`} />
                  <h4 className="text-xl font-black text-white">{sl.edu2Title}</h4>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">{sl.edu2Subtitle}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {sl.edu2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect & Languages */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <Languages className="text-emerald-400" /> {sl.networkTitle}
              </h2>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-neutral-300">
                  {sl.networkSub}
                </h3>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {[
                    { lang: sl.langEn, level: sl.langEnLevel },
                    { lang: sl.langFa, level: sl.langFaLevel },
                    { lang: sl.langPs, level: sl.langPsLevel }
                  ].map((item, idx) => (
                    <div key={idx} className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.lang}</span>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">({item.level})</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-black text-neutral-400 mb-1 tracking-widest">{sl.executiveDesk}</p>
                    <p className="text-white font-bold text-sm">{sl.directChannel}</p>
                  </div>
                  <a 
                    href="https://wa.me/+93700582033" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <MessageCircle size={14} />
                    <span>{sl.inquireNow}</span>
                  </a>
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
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-400 hover:border-emerald-400 hover:text-emerald-400 transition-all shadow-md"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-[11px] font-black tracking-[0.25em] uppercase">
            {sl.name} • {sl.role} • Safi International Capital LTD 2026
          </p>
        </footer>

      </div>
    </div>
  );
}