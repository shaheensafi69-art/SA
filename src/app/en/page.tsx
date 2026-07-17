"use client";

import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Globe, Cpu, TrendingUp, ShoppingCart, 
  CreditCard, Smartphone, Award, Trophy, Star, ChevronRight, 
  CheckCircle2, Building, Zap, Users, GraduationCap, Flame
} from "lucide-react";

export default function EnglishHome() {
  // دیتاهای اکوسیستم برای رندر داینامیک
  const ecosystemFeatures = [
    {
      title: "SafiPay Digital Banking",
      desc: "Open multi-currency international accounts instantly. Hold balances in EUR, USD, GBP, PLN, SEK, NOK, RON, HUF, CZK, and DKK. Issue virtual and physical Visa cards in exactly one second, securely backed by EU standards.",
      icon: <CreditCard className="w-8 h-8 text-yellow-400" />,
      link: "www.safipay.net",
      color: "from-blue-600/20 to-cyan-600/20",
      border: "border-blue-500/30",
    },
    {
      title: "Safi TopUp Global",
      desc: "Connect anywhere. Send mobile credit and top-ups to over 150 countries and 700+ global operators. Instantly purchase digital gift cards, gaming cards, and pay prepaid utility bills globally.",
      icon: <Smartphone className="w-8 h-8 text-yellow-400" />,
      link: "www.safitopup.site",
      color: "from-emerald-600/20 to-teal-600/20",
      border: "border-emerald-500/30",
    },
    {
      title: "SafiPro Apparel",
      desc: "Our exclusive lifestyle and e-commerce brand. Discover high-quality, modern clothing with unique, cutting-edge designs engineered to meet the highest global fashion standards.",
      icon: <ShoppingCart className="w-8 h-8 text-yellow-400" />,
      link: "www.safipro.site",
      color: "from-rose-600/20 to-orange-600/20",
      border: "border-rose-500/30",
    },
    {
      title: "Safi International Capital LTD",
      desc: "The financial titan behind it all. Officially registered in the UK (No. 17063286). Headquartered in Covent Garden, London. Providing world-class financial services and international capital management.",
      icon: <Building className="w-8 h-8 text-yellow-400" />,
      link: "UK Registry",
      color: "from-purple-600/20 to-indigo-600/20",
      border: "border-purple-500/30",
    }
  ];

  const leadershipTeam = [
    { name: "Shaheen Safi", role: "Founder & CEO", title: "Visionary & Chief Architect" },
    { name: "Mujtaba Rahmani", role: "Chief Operating Officer", title: "Operations Director" },
    { name: "Sahel Salem", role: "Head of European Relations", title: "EU Market Director" },
    { name: "Shirin Gol Ahmadi", role: "Company Manager & AI Specialist", title: "AI Integration Lead" }
  ];

  return (
    <main className="w-full relative bg-[#050505] text-white selection:bg-yellow-500 selection:text-black font-sans overflow-hidden">
      
      {/* ================= BACKGROUND: ALIVE & DYNAMIC ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Noise overlay for premium texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* Dynamic glowing orbs */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-amber-800/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-yellow-900/10 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
        
        {/* FinTech Grid Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-32 pb-20">
        
        {/* Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start space-y-8 z-20">
          <div className="flex flex-wrap items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl animate-[fadeInDown_1s_ease-out]">
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] animate-pulse"></div>
            <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-300 uppercase">
              Registered in the UK • No. 17063286
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[5.5rem] font-extrabold leading-[1.1] tracking-tight animate-[fadeInLeft_1s_ease-out]">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 drop-shadow-sm">
              Digital Empire
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium animate-[fadeInLeft_1.2s_ease-out]">
            Step into a premium educational ecosystem backed by Safi International Capital LTD. Master global E-Commerce, advanced AI Development, and Financial Markets with certified British standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full sm:w-auto animate-[fadeInUp_1.5s_ease-out]">
            <Link href="/en/courses" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold text-lg rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Explore Academy <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* 🌟 دکمه اتصال به دیوار افتخارات 🌟 */}
            <Link href="/en/honors" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10 text-amber-400 font-bold text-lg rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(245,158,11,0.05)]">
              <Trophy className="text-amber-500 group-hover:scale-110 transition-transform" /> Wall of Fame
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-white/10 w-full animate-[fadeIn_2s_ease-out]">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">4+</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Elite Faculties</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">150+</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Countries Reached</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white flex items-center gap-1">24/7</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">AI Mentorship</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full lg:w-[45%] mt-16 lg:mt-0 relative z-10 flex justify-center lg:justify-end animate-[fadeInRight_1.5s_ease-out]">
          <div className="relative w-full max-w-2xl">
             <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse"></div>
             <img 
               src="/hero.png" 
               alt="Safi Academy Premium Education" 
               className="relative z-10 w-full h-auto object-contain rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.9)] border border-white/5 transform hover:scale-[1.02] transition-transform duration-700 animate-float"
             />
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-4 animate-float" style={{animationDelay: "1s"}}>
               <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                 <ShieldCheck className="text-emerald-400" />
               </div>
               <div>
                 <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Security</p>
                 <p className="text-sm font-black text-white">Fully EU Compliant</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ================= 2. SAFI ECOSYSTEM GRID ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-24 bg-neutral-950/40 border-y border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.3em]">The Foundation</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">More Than Just An Academy</h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Safi Academy is backed by a massive international infrastructure. We don't just teach you how to succeed; we provide the global tools to make it happen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {ecosystemFeatures.map((feature, idx) => (
              <div key={idx} className={`relative group bg-gradient-to-br ${feature.color} border ${feature.border} p-8 lg:p-10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-inner">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-4">{feature.title}</h4>
                  <p className="text-neutral-400 leading-relaxed flex-1 text-sm md:text-base mb-8">
                    {feature.desc}
                  </p>
                  <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-yellow-400 transition-colors">
                    <span>{feature.link}</span>
                    <ChevronRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. WALL OF FAME TEASER (New Section) ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 bg-black/60 border border-amber-500/20 rounded-[3rem] p-8 md:p-16 backdrop-blur-2xl shadow-[0_0_100px_rgba(245,158,11,0.1)] flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Award size={14} /> Global Recognition
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ascend to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Legendary Status</span>
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed">
              We reward excellence. Our gamified learning platform tracks your progress, assignments, and trading journals. Earn points to rank up from <strong className="text-white">Bronze Scholar</strong> to the ultimate <strong className="text-amber-500">Safi Legend</strong>.
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-sm font-bold text-neutral-400"><CheckCircle2 className="text-emerald-500" size={18}/> Get Official Academic Certificates</li>
              <li className="flex items-center gap-3 text-sm font-bold text-neutral-400"><CheckCircle2 className="text-emerald-500" size={18}/> Receive Personalized Instructor Feedback</li>
              <li className="flex items-center gap-3 text-sm font-bold text-neutral-400"><CheckCircle2 className="text-emerald-500" size={18}/> Showcase Your Profile to Employers</li>
            </ul>
            <div className="pt-6">
              <Link href="/en/honors" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] active:scale-95">
                <Trophy size={18}/> View Wall of Fame
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center">
            {/* Visual representation of the leaderboard */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full animate-pulse"></div>
              
              <div className="absolute top-0 right-10 w-40 h-48 bg-[#0a0a0f] border border-amber-500/30 rounded-3xl p-4 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-30 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 mb-3 flex items-center justify-center border border-amber-500/50">
                  <span className="text-2xl">👑</span>
                </div>
                <div className="h-2 w-20 bg-neutral-800 rounded-full mb-2"></div>
                <div className="h-2 w-12 bg-amber-500 rounded-full mb-4"></div>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded border border-amber-500/20">Rank #1</span>
              </div>
              
              <div className="absolute bottom-10 left-0 w-40 h-48 bg-[#0a0a0f] border border-slate-400/30 rounded-3xl p-4 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-400/20 mb-3 flex items-center justify-center border border-slate-400/50">
                  <span className="text-2xl">🥈</span>
                </div>
                <div className="h-2 w-20 bg-neutral-800 rounded-full mb-2"></div>
                <div className="h-2 w-12 bg-slate-400 rounded-full mb-4"></div>
                <span className="px-3 py-1 bg-slate-400/10 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded border border-slate-400/20">Rank #2</span>
              </div>

              <div className="absolute bottom-0 right-0 w-40 h-48 bg-[#0a0a0f] border border-orange-700/30 rounded-3xl p-4 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 z-10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-700/20 mb-3 flex items-center justify-center border border-orange-700/50">
                  <span className="text-2xl">🥉</span>
                </div>
                <div className="h-2 w-20 bg-neutral-800 rounded-full mb-2"></div>
                <div className="h-2 w-12 bg-orange-700 rounded-full mb-4"></div>
                <span className="px-3 py-1 bg-orange-700/10 text-orange-600 text-[8px] font-black uppercase tracking-widest rounded border border-orange-700/20">Rank #3</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. DEPARTMENTS BENTO GRID ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">Academic Faculties</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Master the <span className="text-yellow-500">Future</span>
          </h3>
          <p className="text-xl text-neutral-400">Engineered for real-world impact. Build your career with our specialized, market-tested faculties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* E-Commerce Box (Large) */}
          <div className="md:col-span-2 group relative bg-[#0a0a0f] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/50 transition-all duration-500 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-2xl flex items-center justify-center border border-yellow-500/20 text-yellow-400 mb-8 group-hover:scale-110 transition-transform">
                <ShoppingCart size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-4">Global E-Commerce</h3>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-8">Launch and scale international businesses. Master Shopify dropshipping, Amazon FBA, TikTok Shop, and comprehensive brand building from A to Z.</p>
                <Link href="/en/courses" className="text-yellow-500 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Explore Curriculums <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </div>

          {/* Tech Box (Tall) */}
          <div className="group relative bg-[#0a0a0f] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-xl">
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
             <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                <Cpu size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-4">Tech & AI Dev</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">Learn Full-Stack Development. Code in Python, React, Next.js, and integrate advanced AI APIs into modern applications.</p>
                <Link href="/en/courses" className="text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  View Syllabus <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </div>

          {/* Financial Markets Box */}
          <div className="group relative bg-[#0a0a0f] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/50 transition-all duration-500 shadow-xl">
             <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 mb-8 group-hover:scale-110 transition-transform">
                <TrendingUp size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-4">Financial Markets</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">Trade Forex, Crypto, and Futures. Master technical analysis, SMC, and strict institutional risk management.</p>
                <Link href="/en/courses" className="text-emerald-400 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Start Trading <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </div>

          {/* Languages Box (Wide) */}
          <div className="md:col-span-2 group relative bg-[#0a0a0f] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
             <div className="relative z-10 flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Languages & Certifications</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">Prepare for international opportunities. We offer CEL & DEL English Programs, plus specialized German and French courses.</p>
            </div>
            <Link href="/en/courses" className="px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-purple-500 hover:text-white transition-colors shrink-0 shadow-lg relative z-10">
              Browse Languages
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 5. SAFI AI & LEADERSHIP ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 bg-neutral-950/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 mb-32">
          
          {/* Safi AI Visual */}
          <div className="w-full lg:w-5/12 relative">
             <div className="relative w-full aspect-square rounded-[3rem] p-1 bg-gradient-to-b from-blue-500/40 to-transparent shadow-[0_0_100px_rgba(59,130,246,0.15)] group">
                <div className="absolute inset-0 bg-[#020202] rounded-[3rem] overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-bg-pan"></div>
                  
                  <div className="h-full w-full flex flex-col items-center justify-center p-10 text-center relative z-10">
                    
                    <div className="relative w-48 h-48 mb-8">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-[50px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
                      <img 
                        src="/safi-ai.jpeg" 
                        alt="Safi AI v4.1" 
                        className="relative z-10 w-full h-full object-cover rounded-[2rem] border-2 border-blue-500/30 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute -bottom-4 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-blue-400 z-20 shadow-lg">
                        Version 4.1
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                      Safi AI <Zap className="text-blue-400" />
                    </h3>
                    <p className="text-neutral-400 mt-4 font-medium leading-relaxed">
                      "I am Safi AI, the official chief assistant of the Safi Ecosystem. I am here 24/7 to mentor your progress, answer your queries, and guide you through your educational journey."
                    </p>
                  </div>
                </div>
             </div>
          </div>

          {/* Core Leadership Team */}
          <div className="w-full lg:w-7/12 space-y-10">
            <div>
              <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-3 block">Corporate Leadership</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Guided by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Visionaries.</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                The Safi Ecosystem operates under a strict, professional hierarchy ensuring world-class service delivery across education, finance, and technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-neutral-900 rounded-xl mb-4 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 transition-colors">
                    <Users size={18} className="text-neutral-400 group-hover:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-sm text-neutral-500">{member.title}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 6. MASSIVE CTA ================= */}
      <section className="relative z-10 w-full px-6 py-40 flex items-center justify-center overflow-hidden border-t border-white/10">
         <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-900 to-[#020202] opacity-80"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
         
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-500/20 blur-[200px] rounded-full pointer-events-none"></div>
         
         <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center animate-[slideUp_1s_ease-out]">
            <Award className="w-20 h-20 text-yellow-400 mb-8 opacity-80" />
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl leading-tight">
              Ready to Claim <br/> Your Future?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 font-medium max-w-2xl">
              Join thousands of global students shaping the digital economy. Create your account and access the ecosystem today.
            </p>
            <Link href="/en/register" className="px-12 py-6 bg-white text-black font-black text-lg uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-yellow-400 hover:shadow-[0_20px_60px_rgba(234,179,8,0.4)] flex items-center gap-3">
              Create Free Account <ArrowRight size={20} />
            </Link>
         </div>
      </section>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-bg-pan {
          animation: bg-pan 4s linear infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </main>
  );
}