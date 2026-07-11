'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Zap, Globe, GraduationCap, 
  Award, BookOpen, Cpu, Gamepad2, Lightbulb,
  Code2, Server, BarChart3, Binary, User, Share2, TrendingUp, PieChart, Activity, Trophy,
  Database, Layout, Languages, Briefcase, Mail, MapPin,
  MessageCircle, ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

// --- Custom Social Icons (To prevent import errors) ---
const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// --- 3D Floating Objects Component ---
const Floating3DObject = ({ children, x, y, translateZ, rotate }: any) => (
  <motion.div
    style={{ x, y, translateZ, rotateZ: rotate, transformStyle: "preserve-3d" }}
    className="absolute z-20 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.2)] text-blue-500"
  >
    {children}
  </motion.div>
);

export default function MujtabaRahmaniFullBio() {
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

  // --- Social Links ---
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/mujtabarahmani" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/bigshot_tradez" },
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/mujtaba.rahmani.792" },
    { icon: <TikTokIcon size={20} />, href: "https://www.tiktok.com/@chill_asf_fr" },
    { icon: <MessageCircle size={20} />, href: "https://wa.me/+93793035609" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-20 font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white" dir="ltr" onMouseMove={handleMouseMove}>
      
      {/* Background FX - Safi Academy Aesthetic */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>
      </div>

      <div className="relative z-10">
        
        {/* --- TOP NAVIGATION --- */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center px-6 md:px-12 z-50">
          <Link href="/en/about" className="flex items-center gap-2 text-neutral-400 hover:text-blue-500 transition-colors font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">
            <ArrowLeft size={16} /> Back to Board
          </Link>
        </header>

        {/* --- HERO SECTION --- */}
        <section ref={containerRef} className="relative pt-32 pb-20 flex flex-col items-center">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
              <div className="absolute inset-0 bg-blue-500/30 blur-[100px] rounded-full opacity-50" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-2 border-blue-500/30 p-2 bg-[#0a0a0f]">
                <Image src="/team/mujtaba.jpeg" alt="Mujtaba Rahmani" fill className="object-cover rounded-[3.5rem]" priority />
              </div>
            </div>

            <Floating3DObject x={moveX} y={moveY} translateZ={120} rotate="10deg">
              <TrendingUp size={30} />
            </Floating3DObject>
            <motion.div style={{ x: moveY, y: moveX, translateZ: 180 }} className="absolute -right-16 top-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] font-black tracking-widest uppercase text-sm">CISO & COO</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12 px-6">
            <h1 className="text-6xl md:text-[7vw] font-black italic tracking-tighter text-white uppercase mb-2">
              MUJTABA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">RAHMANI</span>
            </h1>
            <p className="text-blue-500 font-bold tracking-[0.4em] text-sm md:text-lg mt-4 uppercase text-pretty">
              Chief Operating Officer & CISO
            </p>
            
            <div className="flex justify-center gap-3 mt-8">
              {socialLinks.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0a0a0f] border border-white/10 text-neutral-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 text-neutral-400 text-xs sm:text-sm font-bold tracking-wider">
               <span className="flex items-center gap-2"><MapPin size={16} className="text-blue-500"/> Kabul, Afghanistan</span>
               <span className="flex items-center gap-2"><User size={16} className="text-blue-500"/> Born: July 28, 2006</span>
               <span className="flex items-center gap-2 font-bold text-blue-400 italic">@bigshot_tradez</span>
            </div>
          </motion.div>
        </section>

        {/* --- ABOUT & VISION --- */}
        <section className="py-20 container mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-10 border-l-4 border-blue-600 pl-6 uppercase italic tracking-tight">The Co-Founder's Mission</h2>
            <div className="space-y-8 text-neutral-300 text-lg sm:text-xl leading-relaxed text-justify font-medium">
              <p>
                My name is <span className="text-white font-bold">Mujtaba Rahmani</span>, a visionary entrepreneur and professional trader dedicated to revolutionizing the financial landscape of Afghanistan. With a specialized academic background in <span className="text-white underline decoration-blue-500 underline-offset-4 font-bold">Economics and Online Business</span>, I lead the strategic and financial development of SafiPay.
              </p>
              <div className="bg-gradient-to-r from-blue-600/10 to-transparent p-8 rounded-[2.5rem] italic border-l-4 border-blue-600 text-blue-100 shadow-inner">
                "We are merging traditional economic principles with cutting-edge FinTech solutions to empower the Afghan people and connect them to the global digital market."
              </div>
              <p>
                Beyond the charts and business strategies, I am a firm believer in discipline and resilience—qualities I cultivate daily through MMA and running, ensuring I stay sharp for the high-stakes world of Foreign Exchange.
              </p>
            </div>
          </motion.div>
        </section>

        {/* --- TECHNICAL STACK --- */}
        <section className="py-20 bg-blue-600/[0.02] border-y border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black mb-16 tracking-tight uppercase italic">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <BarChart3 className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white">Market Analysis</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-bold">Advanced Technical Analysis, Price Action, Liquidity Management, and Forex Strategies.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Globe className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white">Digital Economy</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-bold">Strategic Online Business Development, E-commerce Scaling, and Global Market Expansion.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <PieChart className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white">Financial Strategy</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-bold">Asset Allocation, Risk-to-Reward Ratio Management, and FinTech System Optimization.</p>
              </div>
              <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                <Gamepad2 className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-black mb-4 text-white">Next-Gen Tech</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-bold">Digital Banking Infrastructure, Blockchain Basics, and High-Performance Gaming Systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE & EDUCATION --- */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16">
            
            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 italic tracking-tight"><Briefcase className="text-blue-500"/> WORK EXPERIENCE</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">COO & CISO</h4>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">SafiPay Ecosystem (Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Strategizing the financial framework, cybersecurity protocols, and driving the growth of Afghanistan's first modern digital banking ecosystem.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-white/20 border-2 border-[#050508] rounded-full" />
                  <h4 className="text-xl font-black text-white tracking-wide">Full-Time Forex Trader</h4>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Independent Markets (2021-Present)</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Analyzing global currency markets and managing diversified digital asset portfolios with high precision.</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-4 italic tracking-tight"><GraduationCap className="text-blue-500"/> EDUCATION & LIFESTYLE</h2>
              <div className="space-y-10 border-l-2 border-white/10 pl-8 ml-3">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <h4 className="text-xl font-black text-white tracking-wide">Bachelor of Economics & Online Business</h4>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">University of the People, USA</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">Comprehensive study of global financial markets, digital commerce strategies, and advanced economic modeling.</p>
                </div>
              </div>
              
              <div className="pt-6 bg-[#0a0a0f] p-6 rounded-3xl border border-white/5 mt-8">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-neutral-300"><Activity size={18} className="text-blue-500"/> PHYSICAL DISCIPLINE</h3>
                <div className="flex flex-wrap gap-3">
                  {['MMA', 'Endurance Running', 'Strategic Gaming'].map(item => (
                    <span key={item} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-neutral-300 tracking-wider uppercase">{item}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- ACHIEVEMENTS --- */}
        <section className="py-20 container mx-auto max-w-4xl px-6 text-center">
           <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-10 md:p-16 rounded-[3rem] border border-blue-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute top-0 right-0 p-8 opacity-5"><Trophy size={150}/></div>
              <Award className="text-blue-500 mx-auto mb-6 relative z-10" size={60} />
              <h2 className="text-3xl font-black mb-8 relative z-10 tracking-tight text-white uppercase italic">Core Achievements</h2>
              <ul className="text-neutral-300 space-y-4 text-base md:text-lg text-left inline-block relative z-10 font-medium">
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">✦</span> <span>Co-Founding the <strong className="text-white">SafiPay Global Financial Ecosystem</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">✦</span> <span>Strategic Graduate in <strong className="text-white">Economics & Digital Markets</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">✦</span> <span>Expert Trader with 3+ years in <strong className="text-white">Foreign Exchange</strong></span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">✦</span> <span>Active Advocate for Online Business in Afghanistan</span></li>
              </ul>
           </div>
        </section>

        <footer className="py-12 text-center border-t border-white/5 mt-10">
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, idx) => (
              <Link key={idx} href={social.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:border-blue-500 hover:text-blue-500 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase">
            Mujtaba Rahmani • Executive Portfolio • Safi Ecosystem 2026
          </p>
        </footer>
      </div>
    </div>
  );
}