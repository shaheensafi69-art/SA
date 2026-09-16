"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MapPin, Phone, MessageCircle, Send, Loader2, 
  CheckCircle2, AlertCircle, Building2, Clock, ShieldCheck, 
  Globe, Sparkles, ChevronDown, ArrowRight, Headphones, 
  Laptop, GraduationCap, Briefcase, HeartHandshake, FileText, 
  Check, ExternalLink, Lock, CheckCircle, ArrowUpRight, Zap
} from "lucide-react";

export default function ContactPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const subjectPresets = [
    { label: "🎓 Scholarship & Admissions", value: "Scholarship & Admissions Inquiry" },
    { label: "💻 Enterprise & Software", value: "Enterprise Software & Development Inquiry" },
    { label: "🤝 Institutional Alliance", value: "Strategic Partnership Proposal" },
    { label: "⚡ Student Helpdesk", value: "Technical Student Support & Portal Access" },
    { label: "💖 Philanthropic Grant", value: "Philanthropic Grant & Donation Inquiry" },
  ];

  const communicationDesks = [
    {
      icon: GraduationCap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      title: "Academic & Scholarship Bureau",
      sla: "< 4 Hours Response",
      description: "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites for all upcoming cohorts.",
      coverage: ["Scholarship eligibility audits", "Curriculum syllabus breakdowns", "Academic transcripts verification", "Direct enrollment assistance"]
    },
    {
      icon: Briefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      title: "Enterprise Software Solutions",
      sla: "< 2 Hours Response",
      description: "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software, Web3/Fintech platforms, and dedicated engineering squads.",
      coverage: ["Architecture & security scoping", "Custom enterprise proposals", "Dedicated developer staffing", "NDA execution & SLA contracting"]
    },
    {
      icon: HeartHandshake,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      title: "Global Institutional Alliances",
      sla: "< 6 Hours Response",
      description: "Coordinates mutual MOUs with international universities, compute providers, non-profit foundations, and corporate talent recruiters.",
      coverage: ["University credit transfers", "Cloud credit sponsorship", "Corporate recruitment pipelines", "Joint educational symposiums"]
    },
    {
      icon: Headphones,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      title: "Student Success & LMS Support",
      sla: "< 1 Hour Priority",
      description: "Active enrolled students needing instant assistance with learning management systems, lecture archives, code submissions, or Discord community access.",
      coverage: ["LMS authentication issues", "Certificate ID verification", "Mentor 1-on-1 office hours", "Discord VIP role assignment"]
    }
  ];

  const slaMatrix = [
    {
      channel: "Telegram Dispatch Terminal",
      speed: "2 – 4 Hours",
      status: "Highest Automated Priority",
      availability: "24/7/365 Central Routing",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      channel: "WhatsApp Direct Hotline",
      speed: "15 – 45 Minutes",
      status: "Rapid Advisory",
      availability: "Mon – Sat: 08:00 – 20:00 GMT",
      badgeClass: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      channel: "Official Digital Mail (info@)",
      speed: "< 24 Business Hours",
      status: "Document Review & Legal",
      availability: "Continuous Business Monitoring",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      channel: "WhatsApp Broadcast Channel",
      speed: "Real-time Instant",
      status: "One-Way Global Bulletins",
      availability: "Permanent Public Broadcast",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  const contactFaqs = [
    {
      q: "How quickly can I expect a reply after submitting the dispatch form?",
      a: "Dispatches submitted via this form are parsed directly into our centralized operations terminal via Telegram API with automated triage. Typical response time is under 4 business hours, and under 1 hour for urgent student or enterprise queries."
    },
    {
      q: "Can I schedule a live video consultation with an academic advisor or solutions architect?",
      a: "Yes. In your dispatch, indicate your preferred timezone and topic (e.g. 'Admissions Evaluation' or 'Enterprise Project Scoping'). Our coordinator will respond with a direct Google Meet or Zoom scheduling link."
    },
    {
      q: "How do corporate clients and partners verify Safi International Capital LTD's credentials?",
      a: "Safi International Capital LTD is an incorporated UK company registered at Companies House with Company Registration Number 17063286 and registered offices at 71-75 Shelton Street, Covent Garden, London, United Kingdom. Official certified extracts and VAT documentation are provided upon request."
    },
    {
      q: "Can international educators or software engineers apply for roles through this page?",
      a: "Yes. Select 'Strategic Partnership Proposal' or 'Enterprise Software' as your subject and attach your LinkedIn profile, GitHub repository, and pedagogical experience in the message body. Our talent committee reviews all candidate dispatches weekly."
    },
    {
      q: "What security measures protect the data transmitted through this portal?",
      a: "All dispatches are transmitted via TLS 1.3 encryption and relayed over secure bot protocols directly into our restricted headquarters chat. We enforce strict GDPR and UK Data Protection Act compliance — your credentials will never be commercialized or shared with third parties."
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // فرمت پیامی که در تلگرام دریافت می‌کنید
    const text = `📬 پیام جدید از وب‌سایت Safi Academy\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📌 موضوع: ${subject}\n\n📝 پیام:\n${message}`;

    // توکن و آیدی ربات تلگرام
    const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 || "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 || "5195615040";

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset(); // پاک کردن فرم بعد از ارسال
        setSelectedSubject("");
        setMessageLength(0);
        
        // برگشتن به حالت اولیه بعد از ۵ ثانیه
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#030307] text-white pt-28 sm:pt-32 pb-24 px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto relative overflow-hidden font-sans selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-yellow-500/10 rounded-full blur-[170px] pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] bg-amber-600/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      
      {/* Micro-dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      ></div>

      {/* ================= HERO SECTION ================= */}
      <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20 relative z-10">
        
        {/* Operations Status Pulse */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl mb-8 group hover:border-yellow-500/30 transition-all">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
            Operations Active • 24/7 Global Dispatch Gateway
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.08]">
          Direct Dispatch & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">
            Global Communications
          </span>
        </h1>

        <p className="text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-normal">
          Whether you are an ambitious student seeking scholarship enrollment, an enterprise contracting custom software, or a university pursuing accredited partnership — our centralized command team handles your inquiry with confidentiality and speed.
        </p>

        {/* Global Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono mb-1">&lt; 4 Hours</div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t.publicPages.averageResponseSla}</div>
            <div className="text-[11px] text-neutral-500 mt-1">Priority dispatch triage</div>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">100% Secure</div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">End-to-End Privacy</div>
            <div className="text-[11px] text-neutral-500 mt-1">GDPR & UK DPA compliant</div>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mb-1">London, UK</div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t.publicPages.corporateHeadquarters}</div>
            <div className="text-[11px] text-neutral-500 mt-1">Reg No: 17063286</div>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">5 Desks</div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Specialized Routing</div>
            <div className="text-[11px] text-neutral-500 mt-1">Direct domain advisors</div>
          </div>
        </div>

      </div>

      {/* ================= PRIMARY SECTION: DIRECTORY & TELEGRAM FORM ================= */}
      <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-start relative z-10 mb-28">
        
        {/* ================= LEFT COLUMN: CORPORATE DIRECTORY & DIRECT CHANNELS ================= */}
        <div className="space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Building2 className="text-yellow-400" size={28} />
              Corporate Directory
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Verified Dossier
            </span>
          </div>
          
          {/* Card 1: London Global Headquarters */}
          <div className="group bg-[#080811]/80 hover:bg-[#0a0a16] p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all pointer-events-none"></div>
            
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0 border border-yellow-500/20 group-hover:scale-105 transition-transform">
                <MapPin size={26} />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider font-bold">
                    Global {t.publicPages.corporateHeadquarters}
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/30">
                    UNITED KINGDOM
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">Safi International Capital LTD</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  71-75 Shelton Street, Covent Garden<br/>
                  London, United Kingdom, WC2H 9JQ
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    UK Registration: <strong className="text-white">17063286</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Clock size={14} className="text-yellow-400" />
                    Timezone: <span className="text-white font-bold">London (GMT / BST)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Digital Inboxes & Official Mail */}
          <div className="group bg-[#080811]/80 hover:bg-[#0a0a16] p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 shadow-2xl backdrop-blur-2xl">
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                <Mail size={26} />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider font-bold">
                  Central Electronic Mail
                </div>
                <div>
                  <a 
                    href="mailto:info@safiacademy.org" 
                    className="text-lg sm:text-2xl font-black text-white hover:text-yellow-400 transition-colors break-all flex items-center gap-2"
                  >
                    info@safiacademy.org
                    <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-yellow-400 transition-colors" />
                  </a>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  General inquiries, official verification requests, and strategic partnership proposals. Dispatches reviewed within 24 business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Direct Priority Telephone & WhatsApp Hotline */}
          <div className="group bg-[#080811]/80 hover:bg-[#0a0a16] p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 shadow-2xl backdrop-blur-2xl">
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 border border-green-500/20 group-hover:scale-105 transition-transform">
                <Phone size={26} />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider font-bold">
                    Direct Priority Hotline
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live WhatsApp
                  </span>
                </div>
                <div>
                  <a 
                    href="https://wa.me/447476620282" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl sm:text-2xl font-black font-mono text-white hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    +44 7476 620282
                    <ArrowUpRight size={18} className="text-neutral-500" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://wa.me/447476620282" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-bold border border-[#25D366]/30 transition-colors"
                  >
                    <MessageCircle size={14} />
                    Open Direct WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Official Community Broadcast & Social Media Channels */}
          <div className="bg-[#080811]/80 p-7 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider font-bold flex items-center gap-2">
                <Globe size={16} className="text-yellow-400" />
                Community & Social Command
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">15,000+ Followers</span>
            </div>

            {/* Official WhatsApp Channel */}
            <a 
              href="https://whatsapp.com/channel/0029Vb8WCN9FXUucJwrltI32" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    Official WhatsApp Channel
                    <CheckCircle2 size={14} className="text-[#25D366]" />
                  </div>
                  <div className="text-xs text-neutral-300">Live announcements, scholarships & updates</div>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Social Icons Row */}
            <div className="grid grid-cols-3 gap-3">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61591973281742" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center py-4 px-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 transition-all group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-[#1877F2] group-hover:scale-110 transition-all mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-bold text-neutral-300 group-hover:text-white">Facebook</span>
                <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Safi Academy</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/safi_academy01?igsh=MXV1ZW44aXBwOHd3NQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center py-4 px-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#e6683c]/20 hover:to-[#bc1888]/20 hover:border-[#e6683c]/40 transition-all group"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-all mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-xs font-bold text-neutral-300 group-hover:text-white">Instagram</span>
                <span className="text-[10px] text-neutral-500 font-mono mt-0.5">@safi_academy01</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/safi-academy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center py-4 px-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 transition-all group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-[#0A66C2] group-hover:scale-110 transition-all mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs font-bold text-neutral-300 group-hover:text-white">LinkedIn</span>
                <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Corporate Page</span>
              </a>
            </div>

          </div>

        </div>

        {/* ================= RIGHT COLUMN: TELEGRAM DISPATCH TERMINAL ================= */}
        <div className="bg-[#070712]/95 p-8 sm:p-12 lg:p-14 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[70px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Form Header */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-bold">
                <Send size={12} />
                SECURE ENCRYPTED DISPATCH
              </div>
              <span className="text-xs font-mono text-neutral-500">Protocol: Telegram Central</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Transmit an Official Dispatch
            </h2>
            <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
              Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.
            </p>
          </div>

          {/* Preset Subject Chips */}
          <div className="relative z-10 mb-8 space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
              Quick Routing Presets (Click to Auto-fill Subject):
            </label>
            <div className="flex flex-wrap gap-2">
              {subjectPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSubject(preset.value)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-medium flex items-center gap-1.5 ${
                    selectedSubject === preset.value
                      ? "bg-yellow-500 text-black border-yellow-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                      : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-yellow-500/40 hover:text-white"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                  <span>{t.publicPages.fullLegalName} <span className="text-yellow-500">*</span></span>
                </label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Alexander Wright" 
                  className="w-full bg-black/60 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 shadow-inner transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                  <span>Email Address <span className="text-yellow-500">*</span></span>
                </label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  placeholder="name@organization.com" 
                  className="w-full bg-black/60 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 shadow-inner transition-all"
                />
              </div>
            </div>

            {/* Row 2: Subject Matter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>{t.publicPages.subjectDepartmentTarget} <span className="text-yellow-500">*</span></span>
                {selectedSubject && (
                  <span className="text-[10px] text-yellow-400 font-mono font-normal">
                    Preset Selected
                  </span>
                )}
              </label>
              <input 
                required 
                type="text" 
                name="subject" 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                placeholder="e.g. Scholarship Application Tier-1, Web3 Platform Scoping..." 
                className="w-full bg-black/60 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 shadow-inner transition-all"
              />
            </div>

            {/* Row 3: Message Body */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Detailed Transmission Body <span className="text-yellow-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-500">
                  {messageLength} chars entered
                </span>
              </div>
              <textarea 
                required 
                name="message" 
                rows={6} 
                onChange={(e) => setMessageLength(e.target.value.length)}
                placeholder="Detail your inquiry, proposed scope, or background credentials with specific goals..." 
                className="w-full bg-black/60 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-sm font-normal focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 shadow-inner transition-all resize-y min-h-[140px]"
              ></textarea>
            </div>

            {/* Submit Action Button */}
            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_35px_rgba(234,179,8,0.25)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-3 mt-4 group"
            >
              {status === "idle" && (
                <>
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" /> 
                  Transmit Official Dispatch
                </>
              )}
              {status === "loading" && (
                <>
                  <Loader2 size={18} className="animate-spin" /> 
                  Encrypting & Routing Transmission...
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 size={18} className="text-black" /> 
                  Signal Successfully Transmitted & Logged
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle size={18} /> 
                  Transmission Failed — Click to Retry
                </>
              )}
            </button>
            
            {/* Status Feedback Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-2xl flex items-start gap-3 text-sm font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-lg"
                >
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-200 block mb-0.5">{t.publicPages.transmissionConfirmed}</strong>
                    Your dispatch has been securely delivered to Central Headquarters. A senior coordinator has been notified and will review your file shortly.
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-2xl flex items-start gap-3 text-sm font-medium bg-red-500/10 text-red-300 border border-red-500/30"
                >
                  <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-red-200 block mb-0.5">{t.publicPages.transmissionInterrupted}</strong>
                    A momentary connection latency occurred. Please verify your internet or contact our direct WhatsApp hotline at <a href="https://wa.me/447476620282" className="underline font-bold text-white">+44 7476 620282</a>.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy & Guarantee Footnote */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Lock size={13} className="text-yellow-400" />
                TLS 1.3 256-Bit Encrypted
              </span>
              <span>{t.publicPages.zeroSpamGdprGuarantee}</span>
            </div>

          </form>

        </div>

      </div>

      {/* ================= SECTION 2: SPECIALIZED COMMUNICATION DESKS ================= */}
      <div className="mb-28 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-bold uppercase mb-4">
            <Sparkles size={14} />
            Precision Department Routing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Your Dispatch is Triaged
          </h2>
          <p className="text-neutral-400 mt-4 text-base leading-relaxed">
            We don&apos;t use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communicationDesks.map((desk, idx) => {
            const IconComponent = desk.icon;
            return (
              <div 
                key={idx}
                className="bg-[#080812]/90 p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${desk.bgColor} border ${desk.borderColor} flex items-center justify-center ${desk.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent size={26} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                      {desk.sla}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {desk.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {desk.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">{t.publicPages.scopeCoverage}</div>
                  <ul className="space-y-1.5">
                    {desk.coverage.map((item, cIdx) => (
                      <li key={cIdx} className="text-xs text-neutral-300 flex items-center gap-2">
                        <Check size={12} className="text-yellow-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ================= SECTION 3: SLA TRANSPARENCY MATRIX ================= */}
      <div className="mb-28 relative z-10 bg-[#080813]/90 rounded-[2.5rem] border border-white/10 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest block mb-2">
            Institutional Accountability
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Service Level Agreement (SLA) Matrix
          </h2>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base leading-relaxed">
            We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-neutral-400 uppercase">
                <th className="py-4 px-4 font-bold">{t.publicPages.communicationChannel}</th>
                <th className="py-4 px-4 font-bold">{t.publicPages.guaranteedResponseWindow}</th>
                <th className="py-4 px-4 font-bold">{t.publicPages.operationalScope}</th>
                <th className="py-4 px-4 font-bold">{t.publicPages.serviceTarget}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {slaMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-4 font-bold text-white flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    {row.channel}
                  </td>
                  <td className="py-5 px-4 font-mono font-bold text-yellow-400">
                    {row.speed}
                  </td>
                  <td className="py-5 px-4">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${row.badgeClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-xs font-mono text-neutral-400">
                    {row.availability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 4: FREQUENTLY ASKED QUESTIONS ================= */}
      <div className="mb-28 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest block mb-2">
            Inquiry Clarifications
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base">
            Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.
          </p>
        </div>

        <div className="space-y-4">
          {contactFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-[#080812]/90 border border-white/10 rounded-2xl overflow-hidden transition-all shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-yellow-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 5: GRAND FAST-ACTION FINALE ================= */}
      <div className="relative z-10 rounded-[3rem] bg-gradient-to-br from-neutral-900 via-[#0a0a14] to-black border border-white/15 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-bold uppercase">
            <Zap size={14} />
            Alternative Self-Serve Portals
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Prefer Immediate Self-Service?
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            You don&apos;t have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={`/${currentLocale}/courses`}
              className="px-6 py-3.5 rounded-xl bg-yellow-500 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-lg flex items-center gap-2"
            >
              <GraduationCap size={16} />
              Explore All Courses
            </Link>
            <Link
              href={`/${currentLocale}/scholarships`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
            >
              <FileText size={16} />
              Apply for Scholarships
            </Link>
            <Link
              href={`/${currentLocale}/development-services`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
            >
              <Laptop size={16} />
              Software Services
            </Link>
            <Link
              href={`/${currentLocale}/partners`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
            >
              <HeartHandshake size={16} />
              Institutional Partners
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}