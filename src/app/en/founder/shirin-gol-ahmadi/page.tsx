'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Gamepad2, Lightbulb,
  Code2, Server, BarChart3, Binary, User, Share2, // Added Share2
  Database, Layout, Languages, Briefcase, Mail, MapPin, 
  MessageCircle, ArrowLeft, // Removed Linkedin and Facebook due to import error
  PenTool
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

// --- Custom TikTok Icon ---
const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- 3D Floating Objects Component ---
const Floating3DObject = ({ children, x, y, translateZ, rotate }: any) => (
  <motion.div
    style={{ x, y, translateZ, rotateZ: rotate, transformStyle: "preserve-3d" }}
    className="absolute z-20 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-rose-500"
  >
    {children}
  </motion.div>
);

export default function ShirinGolAhmadiBio() {
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
    { icon: <Share2 size={20} />, href: "https://www.linkedin.com/in/shirin-gol-ahmadi-842b40344?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { icon: <Mail size={20} />, href: "mailto:shirin@safipay.net" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-20 font-sans overflow-x-hidden selection:bg-rose-500 selection:text-white" dir="ltr" onMouseMove={handleMouseMove}>
      
      {/* Background FX - Premium Rose/Purple Aesthetic */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        {/* Grainy Noise Overlay for Luxury Vibe */}
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center px-6 md:px-12 z-50">
          <Link href="/en/about" className="flex items-center gap-2 text-neutral-400 hover:text-rose-500 transition-colors font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">
            <ArrowLeft size={16} /> Back to Board
          </Link>
        </header>

        {/* --- HERO SECTION --- */}
        <section ref={containerRef} className="relative pt-32 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
              <div className="absolute inset-0 bg-rose-500/30 blur-[100px] rounded-full opacity-50" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-2 border-rose-500/40 p-2 bg-[#0a0a0f]">
                {/* Updated Image Path */}
                <Image src="/team/shirin.jpeg" alt="Shirin Gol Ahmadi" fill className="object-cover rounded-[3.5rem]" priority />
              </div>
            </div>

            {/* Floating 3D Icons */}
            <Floating3DObject x={moveX} y={moveY} translateZ={120} rotate="10deg">
              <Briefcase size={30} />
            </Floating3DObject>
            <motion.div style={{ x: moveY, y: moveX, translateZ: 180 }} className="absolute -right-16 top-10">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.3)] font-black tracking-widest">MANAGER</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12 px-6">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-2">
              Shirin <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600">Gol Ahmadi</span>
            </h1>
            <p className="text-rose-500 font-black tracking-[0.3em] text-sm sm:text-base mt-4 uppercase">Company Manager & AI Specialist</p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3 mt-8">
              {mySocials.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-gray-400 hover:border-rose-500 hover:text-rose-500 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 text-neutral-400 text-xs sm:text-sm font-bold tracking-wider">
               <span className="flex items-center gap-2"><MapPin size={16} className="text-rose-500"/> Islamabad, Pakistan</span>
               <span className="flex items-center gap-2"><User size={16} className="text-rose-500"/> Born: Dec 16, 2004</span>
            </div>
          </motion.div>
        </section>

        {/* --- ABOUT ME --- */}
        <section className="py-20 container mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-10 border-l-4 border-rose-500 pl-6 tracking-tight">About Me</h2>
            <div className="space-y-8 text-neutral-300 text-lg sm:text-xl leading-relaxed text-justify font-medium">
              <p>
                I am Shirin Gol Ahmadi, a multi-disciplinary professional serving as the Manager at SafiPay. Born on December 16, 2004, I have always been driven by a passion for technology, economics, and creative problem-solving. My diverse skill set bridges the gap between technical execution and business strategy.
              </p>
              <p>
                I am a university graduate with a degree in Economics from the <span className="text-white font-bold underline decoration-rose-500 underline-offset-4">National University of Sciences & Technology (NUST)</span> in Islamabad, Pakistan. Alongside my academic background in economics, I have deeply immersed myself in the tech world as a Full Stack Developer, AI enthusiast, and Graphic Designer.
              </p>
              <div className="bg-gradient-to-r from-rose-500/10 to-transparent p-8 rounded-[2rem] italic border-l-4 border-rose-500 text-rose-100/90 shadow-inner">
                "My ultimate goal is to combine economic strategy, cutting-edge Artificial Intelligence, and seamless design to help make SafiPay a leading force in the global digital finance ecosystem."
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SKILLS GRID --- */}
        <section className="py-20 bg-rose-500/[0.02] border-y border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black mb-16 tracking-tight">Professional Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Briefcase className="text-rose-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Management & Econ</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Business Strategy, Operations Management, Economic Analysis, Team Leadership, Agile Methodologies.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Code2 className="text-rose-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Full Stack Dev</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">React.js, Next.js, Node.js, JavaScript, TypeScript, Python, HTML/CSS, Tailwind, Database Management.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <PenTool className="text-rose-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Graphic Design</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">UI/UX Design, Figma, Adobe Photoshop, Illustrator, Brand Identity, Visual Communication.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-rose-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Cpu className="text-rose-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Artificial Intelligence</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Prompt Engineering, AI Integration, Machine Learning Concepts, Workflow Automation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE & EDUCATION --- */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16">
            
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><Briefcase className="text-rose-500"/> Work Experience</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Company Manager</h4>
                  <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">SafiPay Ecosystem (Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Leading operational management, overseeing team coordination, and integrating tech solutions with business strategies for the SafiPay platform.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">Full Stack Developer & Designer</h4>
                  <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Freelance & Private Projects</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Developing end-to-end web applications and creating visually appealing brand identities and UI/UX designs.</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><GraduationCap className="text-rose-500"/> Education & Languages</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">National University of Sciences & Technology (NUST)</h4>
                  <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Islamabad, Pakistan</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Bachelor's Degree in Economics. Graduated with a strong foundation in economic strategy and financial management.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">Tech & Design Certifications</h4>
                  <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Advanced Studies</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Advanced studies in AI, Full Stack Development, and Graphic Design.</p>
                </div>
              </div>
              
              <div className="pt-6 bg-[#0a0a0f] p-6 rounded-3xl border border-white/5 mt-8">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-neutral-300"><Languages size={18} className="text-rose-500"/> Language Proficiency</h3>
                <div className="flex flex-wrap gap-3">
                  {['English', 'Dari', 'Pashto', 'Urdu'].map(lang => (
                    <span key={lang} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-neutral-300">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- ACHIEVEMENTS --- */}
        <section className="py-20 container mx-auto max-w-4xl px-6 text-center">
           <div className="bg-gradient-to-br from-rose-500/10 to-transparent p-10 md:p-16 rounded-[3rem] border border-rose-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px]"></div>
              <Lightbulb className="text-rose-500 mx-auto mb-6 relative z-10" size={60} />
              <h2 className="text-3xl font-black mb-8 relative z-10 tracking-tight text-white">Core Competencies</h2>
              <ul className="text-neutral-300 space-y-4 text-base md:text-lg text-left inline-block relative z-10 font-medium">
                <li className="flex items-start gap-3"><span className="text-rose-500 mt-1">✦</span> <span>Expertise in bridging <strong className="text-white">Economics</strong> with <strong className="text-white">Digital Tech</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-rose-500 mt-1">✦</span> <span>Proficient in modern <strong className="text-white">AI tools</strong> and Prompt Engineering</span></li>
                <li className="flex items-start gap-3"><span className="text-rose-500 mt-1">✦</span> <span>Managerial leadership within the SafiPay ecosystem</span></li>
                <li className="flex items-start gap-3"><span className="text-rose-500 mt-1">✦</span> <span>Creative ability to design and code complete web platforms</span></li>
              </ul>
           </div>
        </section>

        <footer className="py-12 text-center border-t border-white/5 mt-10">
          <div className="flex justify-center gap-4 mb-8">
            {mySocials.map((social, idx) => (
              <Link key={idx} href={social.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:border-rose-500 hover:text-rose-500 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase">
            Shirin Gol Ahmadi • Technical & Management Portfolio • Safi Ecosystem 2026
          </p>
        </footer>
      </div>
    </div>
  );
}