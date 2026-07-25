"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Server, Cloud, Briefcase, HardDrive, LayoutTemplate, 
  Globe, Mail, Send, Cpu, Sparkles, ArrowRight, CheckCircle2, Gift,
  ShieldCheck
} from "lucide-react";

export default function HostingerAffiliatePage() {
  const referralLink = "https://www.hostinger.com?REFERRALCODE=89LSHAHEEKCO";

  const services = [
    { name: "Web hosting", icon: <Server className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Cloud hosting", icon: <Cloud className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Agency Hosting", icon: <Briefcase className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "VPS hosting", icon: <HardDrive className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Website builder", icon: <LayoutTemplate className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Hostinger Horizons", icon: <Globe className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Business email", icon: <Mail className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Reach email marketing", icon: <Send className="w-6 h-6 text-purple-400" />, isNew: false },
    { name: "Managed OpenClaw", icon: <Cpu className="w-6 h-6 text-purple-400" />, isNew: true },
    { name: "AI Agents", icon: <Sparkles className="w-6 h-6 text-purple-400" />, isNew: true },
  ];

  return (
    <main className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-purple-400 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Gift size={16} /> Exclusive Partner Offer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Power Your Projects with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Hostinger</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Get premium web hosting, lightning-fast cloud infrastructure, and next-gen AI tools. Use our official partner link to claim an exclusive <strong className="text-white">20% discount</strong> on your entire order.
          </p>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-lg uppercase tracking-widest rounded-full transition-all shadow-[0_10px_40px_rgba(147,51,234,0.4)] hover:shadow-[0_15px_50px_rgba(147,51,234,0.6)]"
          >
            Claim 20% Discount <ArrowRight size={20} />
          </motion.a>
        </div>

        {/* Features/Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Everything You Need to Succeed Online</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <motion.a
                href={referralLink}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-[#0a0a0f] border border-white/5 p-6 rounded-[1.5rem] hover:border-purple-500/50 transition-all duration-300 shadow-xl flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-14 h-14 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{service.name}</h3>
                    {service.isNew && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-[10px] font-black text-purple-400 uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-purple-400 transition-colors transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-[#0a0a0f] to-[#110d1c] border border-purple-500/20 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <ShieldCheck className="w-16 h-16 text-purple-400 mb-6" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build Your Website?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mb-10">
            Join millions of creators globally. Click below to apply your 20% discount automatically at checkout.
          </p>
          
          <a 
            href={referralLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-xl hover:bg-neutral-200 active:scale-95 group/btn"
          >
            Get Started Now
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </main>
  );
}