'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Gamepad2, Lightbulb,
  Code2, Server, BarChart3, Binary, User, Share2, // Added Share2
  Database, Layout, Languages, Briefcase, Mail, MapPin, 
  MessageCircle, ArrowLeft // Removed Linkedin and Facebook due to import error
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
    className="absolute z-20 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-yellow-500"
  >
    {children}
  </motion.div>
);

export default function ShaheenSafiFullExpertBio() {
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
    { icon: <User size={20} />, href: "https://www.linkedin.com/in/shaheen-safi-b73a30299" }, // Replaced Linkedin with User due to import error
    { icon: <MessageCircle size={20} />, href: "https://www.instagram.com/top_g_official1" },
    { icon: <Share2 size={20} />, href: "https://www.facebook.com/share/1H1vuV1i9Z/" }, // Replaced Facebook with Share2
    { icon: <TikTokIcon size={20} />, href: "https://www.tiktok.com/@safi_sahib6" },
    { icon: <MessageCircle size={20} />, href: "https://Wa.me/+19342032497" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-20 font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-black" dir="ltr" onMouseMove={handleMouseMove}>
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-yellow-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-amber-900/5 blur-[120px] rounded-full" />
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center px-6 md:px-12 z-50">
          <Link href="/en/about" className="flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">
            <ArrowLeft size={16} /> Back to Board
          </Link>
        </header>

        {/* --- HERO SECTION --- */}
        <section ref={containerRef} className="relative pt-32 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
              <div className="absolute inset-0 bg-yellow-500/30 blur-[100px] rounded-full opacity-50" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-2 border-yellow-500/40 p-2 bg-[#0a0a0f]">
                <Image src="/team/shaheen.jpeg" alt="Shaheen Safi" fill className="object-cover rounded-[3.5rem]" priority />
              </div>
            </div>

            {/* Floating 3D Icons */}
            <Floating3DObject x={moveX} y={moveY} translateZ={120} rotate="10deg">
              <Code2 size={30} />
            </Floating3DObject>
            <motion.div style={{ x: moveY, y: moveX, translateZ: 180 }} className="absolute -right-16 top-10">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] font-black tracking-widest">CEO</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12 px-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-2">Shaheen <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Safi</span></h1>
            <p className="text-yellow-500 font-black tracking-[0.3em] text-sm sm:text-base mt-4 uppercase">Founder & Fintech Architect</p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3 mt-8">
              {mySocials.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mt-10 text-neutral-400 text-xs sm:text-sm font-bold tracking-wider">
               <span className="flex items-center gap-2"><MapPin size={16} className="text-yellow-500"/> Kabul, Afghanistan</span>
               <span className="flex items-center gap-2"><Mail size={16} className="text-yellow-500"/> ssafi9241@hotmail.com</span>
            </div>
          </motion.div>
        </section>

        {/* --- ABOUT ME --- */}
        <section className="py-20 container mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-10 border-l-4 border-yellow-500 pl-6 tracking-tight">The Architect's Journey</h2>
            <div className="space-y-8 text-neutral-300 text-lg sm:text-xl leading-relaxed text-justify font-medium">
              <p>
                My professional journey began in the intense and volatile world of the financial markets, navigating the complexities of Forex trading from 2016 until late 2024. Those years forged a deep understanding of global capital flows, risk management, and the crucial need for flawless technological infrastructure in finance.
              </p>
              <p>
                In December 2024, after earning my <span className="text-white font-bold underline decoration-yellow-500 underline-offset-4">International Technical Analysis Certification from IFTA</span>, I realized my true passion lay not just in trading the markets, but in engineering the systems that power them. I left the trading floors behind to focus entirely on software architecture and digital innovation.
              </p>
              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-8 rounded-[2rem] italic border-l-4 border-yellow-500 text-yellow-100/90 shadow-inner">
                "The ultimate milestone was pivoting my energy to build SafiPay and the broader Safi Ecosystem—crafting a sophisticated digital infrastructure designed to transform financial processing and education globally."
              </div>
              <p>
                Today, as a Computer Science specialist from Istanbul Technical University (ITU), I lead the technological vision of Safi International Capital LTD, architecting platforms like AtomaPay, Safi TopUp, and SafiPro.
              </p>
            </div>
          </motion.div>
        </section>

        {/* --- SKILLS GRID --- */}
        <section className="py-20 bg-yellow-500/[0.02] border-y border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black mb-16 tracking-tight">Technical Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Code2 className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Development</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Next.js, React.js, TypeScript, Node.js, Flutter, Dart, Tailwind CSS, Python.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Database className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Backend & DB</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Supabase, Firebase, PostgreSQL, MySQL, API Architecture, Server Management.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Server className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">Network Security</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Routing & Switching, Firewall Management, VPN Configuration, Cisco Devices.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Layout className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white tracking-wide">E-Commerce</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-bold">Fintech Integration, Payment Gateways, Shopify, Trading, CorelDRAW, UI/UX Mockups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE & EDUCATION --- */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16">
            
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><Briefcase className="text-yellow-500"/> Work Experience</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Founder & CEO</h4>
                  <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Safi International Capital LTD (2026 - Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Architecting and leading a global fintech and educational ecosystem, including SafiPay, Safi TopUp, and Safi Academy.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">IT Specialist</h4>
                  <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Afghanistan Football Federation (2019-2024)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Managed advanced IT systems and network infrastructure for the national federation.</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 tracking-tight"><GraduationCap className="text-yellow-500"/> Education & Languages</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Istanbul Technical University (ITU)</h4>
                  <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Bachelor of Computer Science (2019-2023)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Focus on software architecture, network security, and advanced computational logic.</p>
                </div>
              </div>
              
              <div className="pt-6 bg-[#0a0a0f] p-6 rounded-3xl border border-white/5 mt-8">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-neutral-300"><Languages size={18} className="text-yellow-500"/> Language Proficiency</h3>
                <div className="flex flex-wrap gap-3">
                  {['English', 'Persian/Dari', 'Pashto'].map(lang => (
                    <span key={lang} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-neutral-300">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- ACHIEVEMENTS --- */}
        <section className="py-20 container mx-auto max-w-4xl px-6 text-center">
           <div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-10 md:p-16 rounded-[3rem] border border-yellow-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>
              <Award className="text-yellow-500 mx-auto mb-6 relative z-10" size={60} />
              <h2 className="text-3xl font-black mb-8 relative z-10 tracking-tight text-white">Honors & Certifications</h2>
              <ul className="text-neutral-300 space-y-4 text-base md:text-lg text-left inline-block relative z-10 font-medium">
                <li className="flex items-start gap-3"><span className="text-yellow-500 mt-1">✦</span> <span>International Technical Analysis Certification from <strong className="text-white">IFTA</strong> (2024)</span></li>
                <li className="flex items-start gap-3"><span className="text-yellow-500 mt-1">✦</span> <span>Founder and Lead Architect of <strong className="text-white">SafiPay</strong> & <strong className="text-white">Safi TopUp</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-yellow-500 mt-1">✦</span> <span>Organizer of 20+ successful seminars on business and digital success</span></li>
              </ul>
           </div>
        </section>

        <footer className="py-12 text-center border-t border-white/5 mt-10">
          <div className="flex justify-center gap-4 mb-8">
            {mySocials.map((social, idx) => (
              <Link key={idx} href={social.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase">
            Shaheen Safi • Executive Portfolio • Safi Ecosystem 2026
          </p>
        </footer>
      </div>
    </div>
  );
}