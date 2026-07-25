"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Smartphone, Database, Bot, ArrowRight, 
  Terminal, ShieldCheck, Rocket, CheckCircle2, Zap,
  User, Mail, Phone, MessageSquare, DollarSign, Send, Loader2
} from "lucide-react";

export default function DevelopmentServicesPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "Web Application", budget: "To be discussed", details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "Web Application", budget: "To be discussed", details: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "Web Application Development",
      desc: "We build ultra-fast, SEO-optimized, and highly scalable web applications using cutting-edge frameworks like Next.js, React, and TypeScript.",
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      color: "border-blue-500/30",
      glow: "bg-blue-500/10"
    },
    {
      title: "Cross-Platform Mobile Apps",
      desc: "Reach both iOS and Android users natively. We engineer fluid and responsive mobile applications using Flutter and Dart for a seamless user experience.",
      icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
      color: "border-emerald-500/30",
      glow: "bg-emerald-500/10"
    },
    {
      title: "Backend & Cloud Architecture",
      desc: "Robust server-side logic and database management. We design secure, real-time relational databases using PostgreSQL and Supabase infrastructure.",
      icon: <Database className="w-8 h-8 text-purple-400" />,
      color: "border-purple-500/30",
      glow: "bg-purple-500/10"
    },
    {
      title: "Custom AI Integration",
      desc: "Supercharge your business with Artificial Intelligence. We integrate intelligent bots, automated workflows, and multi-modal AI generation APIs directly into your software.",
      icon: <Bot className="w-8 h-8 text-amber-400" />,
      color: "border-amber-500/30",
      glow: "bg-amber-500/10"
    }
  ];

  const features = [
    "UK-Registered Enterprise Standards",
    "End-to-End Encryption & Security",
    "Agile Development Methodology",
    "Post-Launch Technical Support",
    "Scalable Microservices Architecture",
    "Premium UI/UX Design (Glassmorphism & Dark Mode)"
  ];

  return (
    <main className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Terminal size={16} /> Software Engineering Division
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Transform Your Vision Into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Digital Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
            Hire the elite engineering team behind the Safi Ecosystem. From intelligent mobile applications to highly secure FinTech web platforms, we build software that scales globally.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#quote-form" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] hover:bg-neutral-200 hover:-translate-y-1 active:scale-95 group"
            >
              Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-md"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services" className="mb-32 scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Our Engineering Arsenal</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-[#0a0a0f] border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 shadow-2xl relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 ${service.glow} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 bg-[#050505] border ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 relative z-10">{service.title}</h3>
                <p className="text-neutral-400 text-base leading-relaxed relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us / Features */}
        <div className="bg-gradient-to-br from-[#0a0a0f] to-[#0a0f1a] border border-blue-500/20 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden mb-32 flex flex-col lg:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> Built for Reliability
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Why Partner With Our Development Team?
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              We don't just write code; we build digital ecosystems. Drawing from our experience in establishing international FinTech and E-Commerce platforms, we engineer solutions that are secure, scalable, and ready for the global market.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-black/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-neutral-300 leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request Form Section */}
        <motion.div 
          id="quote-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="scroll-mt-32 w-full bg-[#0a0a0f] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-16"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
          
          {/* Left Text */}
          <div className="w-full lg:w-1/3 relative z-10 flex flex-col justify-center">
            <Rocket className="w-16 h-16 text-blue-400 mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Let's Build <br/><span className="text-cyan-400">Together</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Fill out the form with your project details. Our architecture team will review your requirements and get back to you within 24 hours.
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Direct Contact</p>
              <p className="text-sm font-black text-white">info@safiacademy.org</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-2/3 relative z-10">
            <form onSubmit={handleSubmit} className="bg-black/40 border border-white/10 p-6 md:p-10 rounded-[2rem] backdrop-blur-md flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Mail size={14}/> Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@company.com" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Phone size={14}/> WhatsApp / Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="+44 7000 000000" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Zap size={14}/> Required Service</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors appearance-none">
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                    <option value="AI Integration & Bots">AI Integration & Bots</option>
                    <option value="Backend & Database">Backend & Database</option>
                    <option value="E-Commerce Setup">E-Commerce Platform</option>
                    <option value="Other">Other Custom Software</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><DollarSign size={14}/> Estimated Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors appearance-none">
                  <option value="To be discussed">To be discussed</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000+">$15,000+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14}/> Project Details</label>
                <textarea required name="details" value={formData.details} onChange={handleChange} rows={4} placeholder="Tell us briefly about your project, goals, and any specific features you need..." className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {isSubmitting ? "Sending Request..." : "Submit Project Request"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-bold mt-2">
                  <CheckCircle2 size={18} /> Request submitted successfully. Our team will contact you soon!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-bold mt-2">
                  An error occurred. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </motion.div>

      </div>
    </main>
  );
}