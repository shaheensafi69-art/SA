'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Gamepad2, Lightbulb,
  Code2, Server, BarChart3, Binary, User,
  Database, Layout, Languages, Briefcase, Mail, MapPin,
  MessageCircle, PenTool, HardDrive, ScrollText, ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

// --- Custom Brand Icons (SVGs) ---
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- 3D Floating Objects Component ---
const Floating3DObject = ({ children, x, y, translateZ, rotate, colorClass }: any) => (
  <motion.div
    style={{ x, y, translateZ, rotateZ: rotate, transformStyle: "preserve-3d" }}
    className={`absolute z-20 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] ${colorClass}`}
  >
    {children}
  </motion.div>
);

export default function HusnafarBio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const moveX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Social Links
  const mySocials = [
    { icon: <LinkedinIcon size={20} />, href: "https://www.linkedin.com/in/husnafar-shadab-zafer-8787b1325/" },
    { icon: <Mail size={20} />, href: "mailto:husnafar@saficapital.com" }, 
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-20 font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white" dir="ltr" onMouseMove={handleMouseMove}>
      
      {/* Background FX - Premium Purple Aesthetic */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-fuchsia-900/10 blur-[120px] rounded-full" />
        {/* Grainy Noise Overlay for Luxury Vibe */}
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center px-6 md:px-12 z-50">
          <Link href="/en/about" className="flex items-center gap-2 text-neutral-400 hover:text-purple-500 transition-colors font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">
            <ArrowLeft size={16} /> Back to Board
          </Link>
        </header>

        {/* --- HERO SECTION --- */}
        <section ref={containerRef} className="relative pt-32 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
              <div className="absolute inset-0 bg-purple-500/30 blur-[100px] rounded-full opacity-50" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-2 border-purple-500/40 p-2 bg-[#0a0a0f]">
                {/* Image Path Updated to match other profiles */}
                <Image src="/team/Husnafar Shadab Zafer.jpeg" alt="Husnafar Shadab Zafer" fill className="object-cover rounded-[3.5rem]" priority />
              </div>
            </div>

            {/* Floating 3D Icons */}
            <Floating3DObject x={moveX} y={moveY} translateZ={120} rotate="10deg" colorClass="text-purple-500">
              <Database size={30} />
            </Floating3DObject>
            <motion.div style={{ x: moveY, y: moveX, translateZ: 180 }} className="absolute -right-16 top-10">
                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] font-black tracking-widest uppercase text-sm">DATA EXPERT</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12 px-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-2 uppercase">
              Husnafar Shadab <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Zafer</span>
            </h1>
            <p className="text-purple-500 font-black tracking-[0.3em] text-sm sm:text-base mt-4 uppercase">Head of Database Management</p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3 mt-8">
              {mySocials.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 text-neutral-400 text-xs sm:text-sm font-bold tracking-wider">
               <span className="flex items-center gap-2"><Briefcase size={16} className="text-purple-500"/> Management & Business Major</span>
               <span className="flex items-center gap-2"><Award size={16} className="text-purple-500"/> 36 Professional Certifications</span>
            </div>
          </motion.div>
        </section>

        {/* --- ABOUT ME --- */}
        <section className="py-20 container mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-10 border-l-4 border-purple-500 pl-6 tracking-tight">About Me</h2>
            <div className="space-y-8 text-neutral-300 text-lg sm:text-xl leading-relaxed text-justify font-medium">
              <p>
                I am Husnafar Shadab Zafer, currently serving as the Head of Database Management at Safi International Capital LTD. My expertise lies in structuring, organizing, and securing complex data ecosystems to ensure seamless corporate operations.
              </p>
              <p>
                Having completed high school in 2022, I am currently pursuing higher education in <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">Management and Business</span>. My passion for continuous learning has led me to acquire <strong className="text-purple-400">36 professional certifications</strong> across various disciplines, proving my dedication to personal and professional growth.
              </p>
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-8 rounded-[2rem] italic border-l-4 border-purple-500 text-purple-100/90 shadow-inner">
                "Data is the foundation of modern business. My goal is to ensure that our organizational infrastructure remains robust, secure, and perfectly optimized for future scalability."
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SKILLS GRID --- */}
        <section className="py-20 bg-purple-500/[0.02] border-y border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black mb-16 tracking-tight">Professional Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Database className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Database Mgmt</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Expertise in Data Entry, Database Structuring, Information Security, and Record Maintenance.</p>
              </div>

              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Briefcase className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Business & Admin</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Currently majoring in Management & Business. Strong foundation in administrative operations.</p>
              </div>

              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <PenTool className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Computer & Design</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Proficient in Office Packages (Word, Excel, PowerPoint) and professional Graphic Design software.</p>
              </div>

              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Award className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Certified Pro</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Holder of 36 distinct certifications validating skills in IT, management, and technical fields.</p>
              </div>

            </div>
          </div>
        </section>

        {/* --- EXPERIENCE & EDUCATION --- */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16">
            
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><HardDrive className="text-purple-500"/> Work Experience</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Head of Database Management</h4>
                  <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Safi International Capital LTD (Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Managing the core data infrastructure, overseeing secure data entry protocols, and maintaining digital archives for the corporate ecosystem.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">Computer & Design Specialist</h4>
                  <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Freelance & Academic Projects</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Utilizing advanced Office Packages and Design software for corporate presentations, reports, and visual asset creation.</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><GraduationCap className="text-purple-500"/> Education & Accolades</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Management & Business (Ongoing)</h4>
                  <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">University Student</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Pursuing higher education focused on organizational management, corporate strategy, and modern business operations.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">High School Graduate</h4>
                  <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Class of 2022</p>
                </div>
              </div>
              
              <div className="pt-6 bg-[#0a0a0f] p-6 rounded-3xl border border-white/5 mt-8">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-neutral-300"><Languages size={18} className="text-purple-500"/> Language Proficiency</h3>
                <div className="flex flex-wrap gap-3">
                  {['English', 'Persian (Farsi)'].map(lang => (
                    <span key={lang} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-neutral-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- ACHIEVEMENTS --- */}
        <section className="py-20 container mx-auto max-w-4xl px-6 text-center">
           <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-10 md:p-16 rounded-[3rem] border border-purple-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
              <ScrollText className="text-purple-500 mx-auto mb-6 relative z-10" size={60} />
              <h2 className="text-3xl font-black mb-8 relative z-10 tracking-tight text-white">Core Competencies</h2>
              <ul className="text-neutral-300 space-y-4 text-base md:text-lg text-left inline-block relative z-10 font-medium">
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✦</span> <span>Certified Expert: <strong className="text-white">36 Professional Certificates</strong> achieved</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✦</span> <span>Fluent in <strong className="text-white">English and Farsi</strong> for seamless communication</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✦</span> <span>Specialist in <strong className="text-white">Data Entry & Database Management</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✦</span> <span>High proficiency in <strong className="text-white">Computer Design & Office Packages</strong></span></li>
              </ul>
           </div>
        </section>

        <footer className="py-12 text-center border-t border-white/5 mt-10">
          <div className="flex justify-center gap-4 mb-8">
            {mySocials.map((social, idx) => (
              <Link key={idx} href={social.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:border-purple-500 hover:text-purple-500 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase">
            Husnafar Shadab Zafer • Executive Portfolio • Safi Ecosystem 2026
          </p>
        </footer>
      </div>
    </div>
  );
}