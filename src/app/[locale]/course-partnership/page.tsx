"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { getCoursePartnershipTranslation } from "@/utils/coursePartnershipTranslations";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  PieChart, TrendingUp, ShieldCheck, Wallet, 
  ArrowRight, Users, Gem, Landmark, CheckCircle2 
} from "lucide-react";

export default function CoursePartnershipPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const cp = getCoursePartnershipTranslation(currentLocale);
  const isRtl = cp.isRtl;

  const BENEFIT_ICONS = [
    <PieChart key="pie" className="w-6 h-6 text-yellow-400" />,
    <ShieldCheck key="shield" className="w-6 h-6 text-yellow-400" />,
    <Wallet key="wallet" className="w-6 h-6 text-yellow-400" />
  ];

  const benefits = cp.benefits.map((b, idx) => ({
    ...b,
    icon: BENEFIT_ICONS[idx] || BENEFIT_ICONS[0]
  }));

  const activeOpportunities = cp.opportunities;

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-yellow-500 mb-6 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Gem size={16} /> {cp.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {cp.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">{cp.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8 max-w-3xl mx-auto font-medium">
            {cp.subtitle}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:border-yellow-500/30 transition-all duration-300 shadow-xl flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[40px] group-hover:bg-yellow-500/10 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-3">{benefit.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Active Opportunities Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{cp.liveRoundsTitle}</h2>
              <p className="text-neutral-400">{cp.liveRoundsSubtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl">
              <TrendingUp size={18} /> {cp.highYieldBadge}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activeOpportunities.map((opp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0f] border border-white/10 rounded-[2rem] p-6 shadow-2xl relative group hover:border-yellow-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    {opp.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                    <Users size={12} /> {opp.investors} {cp.partnersCount}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-yellow-400 transition-colors">
                  {opp.title}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">{cp.targetRaiseLabel}</span>
                    <span className="font-bold text-white">{opp.targetRaise}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">{cp.minInvestmentLabel}</span>
                    <span className="font-bold text-white">{opp.minInvestment}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">{cp.expectedReturnLabel}</span>
                    <span className="font-black text-emerald-400">{opp.expectedROI}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-bold text-neutral-400 mb-2">
                    <span>{cp.fundedLabel}</span>
                    <span className="text-yellow-500">{opp.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${opp.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                    ></motion.div>
                  </div>
                </div>

                <Link 
                  href={`/${currentLocale}/contact`} 
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-yellow-500 text-white hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-yellow-500"
                >
                  {cp.requestDetailsBtn} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-yellow-600/20 via-[#0a0a0f] to-[#0a0a0f] border border-yellow-500/30 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="w-full md:w-2/3 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {cp.ctaTitle} <span className="text-yellow-500">{cp.ctaTitleHighlight}</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              {cp.ctaSubtitle}
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-sm font-bold text-neutral-300"><CheckCircle2 size={18} className="text-yellow-500" /> {cp.ctaBullet1}</li>
              <li className="flex items-center gap-2 text-sm font-bold text-neutral-300"><CheckCircle2 size={18} className="text-yellow-500" /> {cp.ctaBullet2}</li>
              <li className="flex items-center gap-2 text-sm font-bold text-neutral-300"><CheckCircle2 size={18} className="text-yellow-500" /> {cp.ctaBullet3}</li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end relative z-10">
            <Link 
              href={`/${currentLocale}/contact`} 
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.5)] hover:bg-yellow-400 hover:-translate-y-1 active:scale-95"
            >
              <Landmark size={20} /> {cp.ctaButton}
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}