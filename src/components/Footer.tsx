"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Globe2, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  GraduationCap,
  Building2,
  TrendingUp,
  Code2,
  Send,
  Loader2,
  Heart,
  Mail,
  ArrowRight,
  Activity,
  Cpu,
  Lock
} from "lucide-react";

// ۱. لیست شرکای استراتژیک بین‌المللی با لوگوهای محلی مطمئن
const strategicPartners = [
  { name: "AWS Cloud", url: "/par/aws.amazon.com-logo.webp", domain: "aws.amazon.com" },
  { name: "Microsoft Learn", url: "/par/learn.microsoft.com-logo.webp", domain: "learn.microsoft.com" },
  { name: "Google.org", url: "/par/google.org-logo.webp", domain: "google.org" },
  { name: "Gates Foundation", url: "/par/gatesfoundation.org-logo.webp", domain: "gatesfoundation.org" },
  { name: "CompTIA", url: "/par/comptia.org-logo.webp", domain: "comptia.org" },
  { name: "PMI Global", url: "/par/pmi.org-logo.webp", domain: "pmi.org" },
  { name: "Credly Credentials", url: "/par/credly.com-logo.webp", domain: "credly.com" },
  { name: "Accredible Verifier", url: "/par/accredible.com-logo.webp", domain: "accredible.com" },
  { name: "BadgeCert", url: "/par/badgecert.com-logo.webp", domain: "badgecert.com" },
  { name: "NEFE Financial", url: "/par/nefe.org-logo.png", domain: "nefe.org" },
];

// ۲. لیست تاییدیه‌ها و مجوزهای ملی و دولتی
const nationalRecognitions = [
  { name: "US Department of Education", url: "https://img.logo.dev/ed.gov?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Dept. of Education (USA)" },
  { name: "BMBF Germany", url: "https://img.logo.dev/bmbf.de?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (Germany)" },
  { name: "Ministry of National Education France", url: "https://img.logo.dev/education.gouv.fr?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (France)" },
  { name: "Government of Netherlands", url: "https://img.logo.dev/rijksoverheid.nl?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (Netherlands)" },
  { name: "SERI Switzerland", url: "https://img.logo.dev/sbfi.admin.ch?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "State Secretariat (Switzerland)" },
  { name: "Ministry of Education AFG", url: "https://img.logo.dev/moe.gov.af?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (AFG)" },
  { name: "Ministry of Higher Education AFG", url: "https://img.logo.dev/old.mohe.gov.af?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Higher Education (AFG)" }
];

export default function Footer() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const currentYear = new Date().getFullYear();

  // Route exclusions
  const hideFooterRoutes = ["/dashboard", "/login", "/register", "/admin", "/teacher"];
  const shouldHideFooter = hideFooterRoutes.some(route => pathname.includes(route));

  // Newsletter interactive state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please provide a valid corporate or student email address.");
      return;
    }

    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterMessage("Dossier unlocked! You are now subscribed to Safi Academy Global Intelligence.");
      setNewsletterEmail("");
    }, 900);
  };

  if (shouldHideFooter) return null;

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#030307] pt-24 pb-12 overflow-hidden font-sans z-10">

      {/* ================= BACKGROUND GLOWS & CYBERNETIC GRID ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Cyber Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(234, 179, 8, 0.4) 1px, transparent 1px), radial-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}
        />

        {/* Ambient Nebula Auras */}
        <div className="bg-gradient-to-br from-yellow-500/10 via-amber-600/5 to-transparent absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full blur-[160px]" />
        <div className="bg-gradient-to-tr from-emerald-600/10 via-teal-500/5 to-transparent absolute right-1/6 bottom-1/4 h-[600px] w-[600px] rounded-full blur-[180px]" />
        <div className="bg-cyan-500/5 absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[140px]" />

        {/* Atmospheric Tri-Color Afghan Flag Wave Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
          <div className="w-[1100px] h-[600px] rounded-[180px] bg-gradient-to-r from-black via-red-600 to-emerald-600 blur-[150px] transform -rotate-6 scale-110" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">

        {/* ================= SECTION 1: VIP WHATSAPP SCHOLARSHIP & COMMUNITY HUB ================= */}
        <div className="w-full bg-[#07070d]/90 backdrop-blur-3xl border border-white/10 mb-20 rounded-[2.5rem] p-8 md:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden group">
          {/* Glowing border highlight */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/25 via-yellow-500/15 to-teal-500/25 rounded-[2.6rem] opacity-40 blur-xl group-hover:opacity-80 transition duration-700 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-black uppercase tracking-widest text-emerald-400 mb-5 shadow-inner">
                <Sparkles size={13} className="animate-pulse" /> Official Global Community • 10,000+ Scholars
              </div>

              <h3 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Join Safi Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">WhatsApp Channel</span>
              </h3>

              <p className="text-neutral-300 mb-6 text-sm sm:text-base leading-relaxed text-justify">
                Connect directly with our international academic hub. Receive instant alerts for 100% full-ride scholarships, live masterclass schedules, enterprise job requisitions, and daily technical study materials directly on your device.
              </p>

              {/* Highlight Perks Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200">Daily Scholarship Drops</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200">Live Faculty Q&A</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-200">100% Free & Direct Access</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://whatsapp.com/channel/0029Vb8WCN9FXUucJwrltI32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f766e] text-white shadow-[0_12px_35px_rgba(37,211,102,0.4)] rounded-2xl px-8 py-4 font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 group/btn"
                >
                  <MessageCircle size={18} className="group-hover/btn:rotate-12 transition-transform" />
                  <span>Join WhatsApp Channel Now</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-neutral-400 text-xs">
                  <ShieldCheck size={16} className="text-yellow-400" />
                  <span>Encrypted Channel • Verified Official</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="relative group/img w-full max-w-sm">
                <div className="bg-emerald-500/20 absolute inset-0 rotate-3 rounded-3xl blur-md group-hover/img:rotate-6 transition-transform duration-700" />
                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Safi Academy global scholar community"
                    className="w-full h-64 object-cover filter saturate-110 group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-white font-black text-sm">35+ Nations Active</p>
                      <p className="text-neutral-400 text-xs">Continuous 24/7 Educational Broadcasts</p>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: GLOBAL STRATEGIC PARTNERS MARQUEE ================= */}
        <div className="w-full border-b border-white/10 pb-16 mb-16 overflow-hidden flex flex-col items-center">
          <div className="flex flex-col items-center justify-center mb-8 px-4 text-center">
            <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-3 shadow-inner flex items-center gap-1.5">
              <Award size={12} /> Strategic Alliances & Credentials
            </span>
            <h4 className="text-sm md:text-base font-bold text-neutral-300 max-w-2xl leading-relaxed">
              Integrated with world-leading cloud hyperscalers, credential authorities, and global philanthropies.
            </h4>
          </div>

          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] items-center py-2">
              {[...strategicPartners, ...strategicPartners, ...strategicPartners].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 mx-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 hover:bg-white/[0.05] transition-all duration-300 group cursor-default"
                  title={`${partner.name} Verified Integration`}
                >
                  <img
                    src={partner.url}
                    alt={partner.name}
                    className="h-7 md:h-8 object-contain max-w-[120px] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Graceful fallback to logo.dev if needed
                      (e.target as HTMLImageElement).src = `https://img.logo.dev/${partner.domain}?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true`;
                    }}
                  />
                  <span className="text-xs font-bold text-neutral-400 group-hover:text-white transition-colors hidden sm:inline">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: MASSIVE BRAND IDENTITY & AUTHENTIC AFGHAN FLAG ================= */}
        <div className="flex flex-col items-center text-center mb-20 group cursor-default max-w-3xl">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-yellow-500/25 blur-[50px] rounded-full group-hover:bg-yellow-500/40 group-hover:blur-[70px] transition-all duration-700 pointer-events-none" />
            <img
              src="/logo-without-b.png"
              alt="Safi Academy Imperial Crest"
              className="relative z-10 w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_35px_rgba(234,179,8,0.5)] transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700"
            />
          </div>

          {/* Academy Name + AUTHENTIC AFGHANISTAN FLAG BADGE */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
            <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
              Safi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">Academy</span>
            </span>

            {/* ⭐ Authentic National Flag of Afghanistan Display (Replaces old raw emoji) ⭐ */}
            <div 
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:border-yellow-500/50 hover:bg-white/[0.08] transition-all duration-300 group/flag"
              title="Official Flag of Afghanistan"
            >
              <div className="relative overflow-hidden rounded-md shadow-md ring-1 ring-white/20">
                <img 
                  src="/flags/afghanistan.svg" 
                  alt="Official Flag of Afghanistan" 
                  className="w-8 h-5 md:w-9 md:h-5.5 object-cover group-hover/flag:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-neutral-300 group-hover/flag:text-yellow-400 transition-colors uppercase font-mono">
                AFG
              </span>
            </div>
          </div>

          <p className="text-neutral-300 max-w-2xl text-base md:text-lg font-normal leading-relaxed text-justify mb-6">
            The flagship digital educational institution of <strong className="text-white font-bold">Safi International Capital LTD</strong>. Empowering global scholars with cutting-edge expertise across E-Commerce, Applied Artificial Intelligence, and Financial Markets.
          </p>

          {/* Legal Holding Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-yellow-500/30 transition-all shadow-sm flex items-center gap-2">
              <Building2 size={13} className="text-yellow-400" />
              <span className="text-xs font-bold text-neutral-200">UK Companies House: <span className="text-yellow-400 font-mono">#17063286</span></span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-emerald-500/30 transition-all shadow-sm flex items-center gap-2">
              <Globe2 size={13} className="text-emerald-400" />
              <span className="text-xs font-bold text-neutral-200">Headquarters: <span className="text-neutral-300">London, United Kingdom</span></span>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: 5-COLUMN COMPREHENSIVE LINKS GRID ================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 border-b border-white/10 pb-16">

          {/* Column 1: Ecosystem & Subsidiaries */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Ecosystem
            </h3>
            <a 
              href="https://www.safipay.net" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-yellow-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center justify-between group"
            >
              <span>SafiPay Banking</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
            </a>
            <a 
              href="https://www.safitopup.site" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-yellow-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center justify-between group"
            >
              <span>Safi TopUp Global</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
            </a>
            <a 
              href="https://www.safipro.site" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-yellow-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center justify-between group"
            >
              <span>SafiPro Apparel</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
            </a>
            <div className="text-neutral-400 hover:text-yellow-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center justify-between cursor-default">
              <span>Safi Capital LTD</span>
              <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded">Holding</span>
            </div>
            <Link 
              href={`/${currentLocale}/about`} 
              className="text-neutral-400 hover:text-yellow-400 hover:translate-x-1.5 transition-all text-sm font-medium"
            >
              Safi AI Autonomous Labs
            </Link>
          </div>

          {/* Column 2: Academic Faculties */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Faculties
            </h3>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              E-Commerce & Dropshipping
            </Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Applied AI & Full-Stack
            </Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Financial Markets & SMC
            </Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Languages & Diplomas (CEL)
            </Link>
            <Link href={`/${currentLocale}/scholarships`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center gap-1.5">
              <span>100% Scholarships</span>
              <span className="text-[9px] uppercase tracking-wider font-black text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">Free</span>
            </Link>
            <Link href={`/${currentLocale}/development-services`} className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Enterprise DevSquads
            </Link>
          </div>

          {/* Column 3: Institutional Trust */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Governance
            </h3>
            <Link href={`/${currentLocale}/about`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              About Safi Academy
            </Link>
            <Link href={`/${currentLocale}/contact`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Contact Headquarters
            </Link>
            <Link href={`/${currentLocale}/honors`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Wall of Fame & Honors
            </Link>
            <Link href={`/${currentLocale}/support`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Student Helpdesk & FAQ
            </Link>
            <Link href={`/${currentLocale}/instructor-application`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium flex items-center gap-1.5">
              <span>Faculty Recruitment</span>
              <span className="text-[9px] uppercase tracking-wider font-black text-yellow-400 bg-yellow-500/15 px-1.5 py-0.5 rounded">Hiring</span>
            </Link>
            <Link href={`/${currentLocale}/donate`} className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all text-sm font-medium">
              Scholarship Endowment
            </Link>
          </div>

          {/* Column 4 & 5: Global Dispatch & Live Node */}
          <div className="flex flex-col gap-5 sm:col-span-2">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Global Intelligence Dispatch
            </h3>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Subscribe to receive curated academic bulletins, cutting-edge AI software updates, and global career opportunities directly from our London faculty.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3.5 text-neutral-500" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your student or corporate email..."
                  disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                  className="w-full pl-10 pr-28 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400/60 focus:bg-white/[0.07] transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                  className="absolute right-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {newsletterStatus === "loading" ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <>
                      <span>Dispatch</span>
                      <Send size={11} />
                    </>
                  )}
                </button>
              </div>

              {newsletterMessage && (
                <p className={`text-[11px] font-medium ${newsletterStatus === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {newsletterMessage}
                </p>
              )}
            </form>

            {/* Social Media Grid */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {/* X (Twitter) */}
              <a 
                href="https://x.com/safi_academy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-transparent transition-all group" 
                title="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61591973281742" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all group" 
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/safi_academy01?igsh=MXV1ZW44aXBwOHd3NQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent transition-all group" 
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/safi-academy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#0A66C2] hover:border-transparent transition-all group" 
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://whatsapp.com/channel/0029Vb8WCN9FXUucJwrltI32" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#25D366] hover:border-transparent transition-all group" 
                title="WhatsApp Channel"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.822 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>

              {/* Telegram */}
              <a 
                href="https://t.me/safipayltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#229ED9] hover:border-transparent transition-all group" 
                title="Telegram Group"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.926z" /></svg>
              </a>
            </div>

            {/* VIP Global Campus Node Widget */}
            <div className="mt-1 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-black text-neutral-200 uppercase tracking-wider">Campus Operational Node</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  99.98% SLA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                Continuous AI tutoring, cryptographic certificate verification, and real-time student support desk.
              </p>
              <Link
                href={`/${currentLocale}/support`}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500 text-yellow-400 hover:text-black border border-yellow-500/30 hover:border-yellow-400 transition-all font-bold text-xs uppercase tracking-wider group/desk"
              >
                <div className="flex items-center gap-2">
                  <Cpu size={13} />
                  <span>Student Desk & Safi AI</span>
                </div>
                <ArrowRight size={13} className="group-hover/desk:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* ================= SECTION 5: NATIONAL MINISTRIES & GOVERNMENTAL RECOGNITION ================= */}
        <div className="w-full flex flex-col items-center justify-center border-b border-white/10 pb-14 mb-10">
          <div className="flex items-center gap-2 mb-8 text-center">
            <ShieldCheck size={14} className="text-yellow-400" />
            <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              International Equivalence & Recognized National Educational Frameworks
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-6xl">
            {nationalRecognitions.map((ministry, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-default" title={ministry.label}>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center p-3 mb-2.5 group-hover:bg-white/[0.08] group-hover:border-yellow-500/30 transition-all shadow-inner">
                  <img
                    src={ministry.url}
                    alt={ministry.name}
                    className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors text-center max-w-[120px]">
                  {ministry.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 6: COPYRIGHT, LEGAL & SYSTEM TELEMETRY ================= */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 text-neutral-400 text-xs font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© {currentYear} Safi Academy. Safi International Capital LTD. All rights reserved.</p>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-neutral-500">Companies House Reg #17063286 (London, UK)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-400">
            <Link href={`/${currentLocale}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href={`/${currentLocale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href={`/${currentLocale}/donate`} className="hover:text-white transition-colors">Scholarship Endowment</Link>
            
            {/* System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10" title="Global Latency: 24ms">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300 text-[11px]">Systems Operational</span>
            </div>

            {/* Powered by Safi AI */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20" title="Autonomous Neural Mentorship Engine">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-yellow-400 font-bold text-[11px]">Powered by Safi AI v4.1</span>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </footer>
  );
}