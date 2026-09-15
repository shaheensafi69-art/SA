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
  PenTool
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom Social SVG Components
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ShirinGolAhmadiExecutiveDossier() {
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
    navigator.clipboard.writeText("shirin@safipay.net");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Executive Social Links
  const mySocials = [
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/shirin-gol-ahmadi-842b40344?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
    { name: "Official Email", icon: <Mail size={18} />, href: "mailto:shirin@safipay.net", color: "hover:text-rose-400 hover:border-rose-400/40" },
  ];

  return (
    <div 
      className="min-h-screen bg-[#030307] text-white font-sans overflow-x-hidden selection:bg-rose-500 selection:text-white" 
      dir="ltr" 
      onMouseMove={handleMouseMove}
    >
      {/* ================= BACKGROUND COSMIC SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(244, 63, 94, 0.5) 1px, transparent 1px), radial-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            backgroundPosition: '0 0, 22px 22px'
          }}
        />
        {/* Glowing Nebulae */}
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-rose-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-purple-900/15 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[35%] h-[35%] bg-pink-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-12 z-50">
          <Link 
            href={`/${currentLocale}/about`} 
            className="flex items-center gap-2 text-neutral-300 hover:text-rose-400 transition-all font-bold text-xs uppercase tracking-widest bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/[0.08] hover:border-rose-500/30 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft size={16} /> Back to Executive Board
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              General Operations & AI Systems • Islamabad
            </span>
          </div>
        </header>

        {/* ================= HERO DOSSIER THEATER ================= */}
        <section ref={containerRef} className="relative pt-36 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            {/* Ambient Backlight Halo */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-rose-600/30 via-pink-600/20 to-transparent blur-[90px] rounded-[5rem] pointer-events-none" />
            
            {/* Portrait Frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 rounded-[3.5rem] p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/0 border border-rose-500/30 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-[#07070d]">
                <Image 
                  src="/team/shirin.jpeg" 
                  alt="Shirin Gol Ahmadi - Company Manager" 
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
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a12]/90 border border-rose-500/30 backdrop-blur-2xl shadow-2xl">
                <Cpu size={20} className="text-rose-400" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-wider text-rose-400">AI Systems</p>
                  <p className="text-xs font-bold text-white">Autonomous Agents</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ x: moveY, y: moveX, translateZ: 150 }} 
              className="absolute -right-6 sm:-right-12 top-12 z-20"
            >
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black tracking-widest text-xs uppercase shadow-[0_10px_35px_rgba(244,63,94,0.4)] flex items-center gap-2">
                <Briefcase size={15} />
                <span>Company Manager</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Coordinates */}
          <div className="text-center mt-12 px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-inner">
              <Sparkles size={13} /> Corporate Executive • SafiPay & Safi International Capital
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3">
              Shirin <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-rose-600">Gol Ahmadi</span>
            </h1>

            <p className="text-neutral-300 font-semibold tracking-wide text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Company General Manager, Applied Artificial Intelligence Lead & Multi-Disciplinary Digital Strategist.
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
                <MapPin size={15} className="text-rose-400"/> Islamabad, Pakistan & Global
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <User size={15} className="text-rose-400"/> Born: December 16, 2004
              </span>
              <button 
                onClick={copyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-rose-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail size={15} className="text-rose-400"/>
                <span>shirin@safipay.net</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-neutral-500" />}
              </button>
            </div>
          </div>
        </section>

        {/* ================= EXECUTIVE MANAGER'S MISSION ================= */}
        <section className="py-16 container mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-14 md:p-16 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-600" />
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Executive Leadership & Vision</h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
              <p>
                I am <strong className="text-white font-bold">Shirin Gol Ahmadi</strong>, Company Manager at SafiPay and Director of Applied Artificial Intelligence Systems across the Safi Global Ecosystem. Born on December 16, 2004, my career is defined by fusing economic theory with full-stack engineering, high-aesthetic UI/UX design, and autonomous AI automation.
              </p>
              
              <p>
                Graduated with a Bachelor of Science in Economics from the prestigious <strong className="text-white font-bold underline decoration-rose-400 underline-offset-4">National University of Sciences & Technology (NUST)</strong> in Islamabad, Pakistan, I approach corporate leadership through an analytical, macro-financial lens. I orchestrate cross-functional teams, align engineering sprints with market demand, and establish seamless communication between developers, financial analysts, and corporate clients.
              </p>

              {/* Callout Quote Box */}
              <div className="my-8 bg-gradient-to-r from-rose-600/15 via-pink-600/5 to-transparent p-8 rounded-3xl border-l-4 border-rose-400 text-rose-100 shadow-inner">
                <p className="italic text-base sm:text-xl font-medium leading-relaxed">
                  "At SafiPay and Safi Academy, our mission transcends traditional operations. We are actively deploying artificial intelligence not merely as a novelty, but as a core multiplier that accelerates student mastery, streamlines payment compliance, and opens international markets to previously underserved communities."
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-rose-400">
                  <span>— Shirin Gol Ahmadi</span>
                  <span>•</span>
                  <span>Company Manager & AI Specialist</span>
                </div>
              </div>

              <p>
                Beyond corporate administration, I am an active Full-Stack Developer and Graphic Designer. Having architected complete web platforms with Next.js, TypeScript, and Python, I maintain intimate knowledge of the codebases our teams ship, ensuring that every interface under the Safi banner achieves an uncompromising standard of elegance, performance, and accessibility.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CORE MULTIDISCIPLINARY COMPETENCIES ================= */}
        <section className="py-20 bg-rose-500/[0.02] border-y border-white/10">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-rose-400 mb-2 block">Multidisciplinary Mastery</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Executive Competencies</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Briefcase className="text-rose-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Operations & Strategy</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Organizational leadership, Agile workflow coordination, cross-departmental operations, resource allocation.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Code2 className="text-rose-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Full-Stack Dev</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST APIs, Microservices.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <Cpu className="text-rose-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Applied AI Systems</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Advanced Prompt Engineering, LLM Integration, Autonomous AI Tutoring (Safi AI), Workflow Orchestration.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#07070d] border border-white/10 hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <PenTool className="text-rose-400 mb-6" size={38} />
                <h3 className="text-xl font-black text-white mb-2">Design & Brand</h3>
                <p className="text-neutral-400 text-xs font-semibold leading-relaxed">
                  Figma UI/UX, Design Systems, Adobe Photoshop & Illustrator, Visual Identity Architecture, Responsive Layouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WORK EXPERIENCE & ACADEMIC PEDIGREE ================= */}
        <section className="py-24 container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Professional Experience */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <Briefcase className="text-rose-400" /> Executive History
              </h2>

              <div className="space-y-10 border-l-2 border-rose-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-rose-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.7)]" />
                  <h4 className="text-xl font-black text-white">Company General Manager</h4>
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">SafiPay & Safi International Capital LTD (2025 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Directing organizational execution, supervising executive communications, managing team roadmaps, and ensuring seamless cross-pollination between technical products and corporate finance.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Director of AI Systems & Student Affairs</h4>
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Safi Academy (2025 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Overseeing the deployment of the Safi AI autonomous mentor engine (v4.1), student scholarship vetting, and personalized pedagogical course trajectories.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Lead Full-Stack Developer & Brand Architect</h4>
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Private Projects & Freelance (2022 - 2025)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Engineered high-performance web applications and created cohesive corporate design languages for diverse international technology ventures.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Track & Languages */}
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
                <GraduationCap className="text-rose-400" /> Academic Pedigree
              </h2>

              <div className="space-y-10 border-l-2 border-rose-500/20 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-rose-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.7)]" />
                  <h4 className="text-xl font-black text-white">National University of Sciences & Technology (NUST)</h4>
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Bachelor of Science in Economics (Islamabad, Pakistan)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Graduated with a distinguished background in quantitative macroeconomic analysis, econometrics, capital market structures, and corporate resource optimization.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#030307] rounded-full" />
                  <h4 className="text-xl font-black text-white">Advanced Computing & AI Certifications</h4>
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1 mb-2">Independent Research & Specialization</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Specialized training in Prompt Engineering, Neural Network integrations, Next.js Full-Stack Architecture, and UI/UX Ergonomics.
                  </p>
                </div>
              </div>

              {/* Language Matrix */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-300">
                  <Languages size={16} className="text-rose-400"/> Multilingual Proficiency
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { lang: 'English', level: 'Fluent Professional' },
                    { lang: 'Persian / Dari', level: 'Native' },
                    { lang: 'Pashto', level: 'Native' },
                    { lang: 'Urdu', level: 'Fluent Regional' }
                  ].map((item, idx) => (
                    <div key={idx} className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.lang}</span>
                      <span className="text-[10px] text-rose-400 uppercase tracking-wider font-mono">({item.level})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= CORE ACHIEVEMENTS & AWARDS ================= */}
        <section className="py-16 container mx-auto max-w-4xl px-6 text-center">
          <div className="bg-gradient-to-br from-rose-600/10 via-white/[0.02] to-transparent p-10 sm:p-14 md:p-16 rounded-[3.5rem] border border-rose-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
            <Lightbulb className="text-rose-400 mx-auto mb-6 relative z-10" size={56} />
            <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10 text-white tracking-tight">Executive Distinctions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Economics & Tech Synergy</p>
                  <p className="text-neutral-400 text-xs">Pioneering digital economic frameworks at NUST</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">AI Autonomous System Lead</p>
                  <p className="text-neutral-400 text-xs">Architecting Safi AI v4.1 student mentor engine</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Corporate General Manager</p>
                  <p className="text-neutral-400 text-xs">Directing operations across SafiPay & Safi Academy</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Full-Stack Design Excellence</p>
                  <p className="text-neutral-400 text-xs">Creating world-class brand identities and interfaces</p>
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
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-400 hover:border-rose-400 hover:text-rose-400 transition-all shadow-md"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-[11px] font-black tracking-[0.25em] uppercase">
            Shirin Gol Ahmadi • Executive Portfolio • Safi International Capital LTD 2026
          </p>
        </footer>

      </div>
    </div>
  );
}