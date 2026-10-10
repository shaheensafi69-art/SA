"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Terminal,
  Server,
  Cpu,
  Layers,
  GitBranch,
  ShieldCheck,
  Zap,
  Globe,
  Laptop,
  Database,
  Binary,
  User,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Flame,
  Workflow,
  MonitorDot,
  ArrowLeft,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

// Custom Social SVG Components
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function MobinHassaniExecutiveDossier() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const moveX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("mobin@safipay.net");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Executive Social Links
  const socialLinks = [
    { name: "GitHub", icon: <GithubIcon size={18} />, href: "https://github.com", color: "hover:text-cyan-400 hover:border-cyan-400/40" },
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, href: "https://linkedin.com", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
  ];

  return (
    <div
      className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background FX - Tech Cyan & Deep Indigo */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), radial-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            backgroundPosition: "0 0, 22px 22px",
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-blue-900/15 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <header className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-12 z-50">
          <Link
            href={`/${currentLocale}/about`}
            className="flex items-center gap-2 text-neutral-300 hover:text-cyan-400 transition-all font-bold text-xs uppercase tracking-widest bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/[0.08] hover:border-cyan-500/30 backdrop-blur-xl shadow-lg"
          >
            <ArrowLeft size={16} /> {isRtl ? "بازگشت به اعضای هیئت مدیره" : "Back to Executive Board"}
          </Link>
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ACTIVE CORE ARCHITECT</span>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={containerRef} className="relative pt-36 pb-20 flex flex-col items-center">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 z-10">
              <div className="absolute inset-0 bg-cyan-500/30 blur-[100px] rounded-full opacity-60" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-2 border-cyan-500/40 p-2 bg-[#050505] shadow-[0_0_60px_rgba(6,182,212,0.25)]">
                <Image
                  src="/team/mobin.jpeg"
                  alt="Mobin Hassani"
                  fill
                  className="object-cover rounded-[3.5rem]"
                  priority
                />
              </div>
            </div>

            {/* Floating 3D Chips */}
            <motion.div
              style={{ x: moveX, y: moveY, translateZ: 130 }}
              className="absolute -left-6 sm:-left-12 bottom-10 z-20"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a12]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl">
                <Terminal size={20} className="text-cyan-400" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-wider text-cyan-400">Core Engineering</p>
                  <p className="text-xs font-bold text-white">Full-Stack Cloud Systems</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ x: moveY, y: moveX, translateZ: 150 }}
              className="absolute -right-6 sm:-right-12 top-12 z-20"
            >
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-black font-black tracking-widest text-xs uppercase shadow-[0_10px_35px_rgba(6,182,212,0.4)] flex items-center gap-2">
                <Flame size={15} />
                <span>{isRtl ? "لیدر بخش توسعه‌دهندگان" : "Lead Developer"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Coordinates */}
          <div className="text-center mt-12 px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-inner">
              <Sparkles size={13} /> {isRtl ? "تیم رهبری فنی • اکوسیستم نرم‌افزاری صافی" : "Technical Executive • Safi Global Ecosystem"}
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3">
              Mobin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Hassani</span>
            </h1>

            <p className="text-neutral-300 font-semibold tracking-wide text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {isRtl
                ? "لیدر بخش توسعه‌دهندگان و مهندسی نرم‌افزار، معمار سیستم‌های ابری و سرپرست تیم دولوپرهای اکوسیستم صافی."
                : "Lead Software Engineer, Cloud Systems Architect & Head of the Developer Division across the Safi Ecosystem."}
            </p>

            {/* Social Channels */}
            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-300 ${social.color} transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-xl text-xs font-bold`}
                  title={social.name}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </Link>
              ))}
            </div>

            {/* Direct Coordinates Strip */}
            <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mt-8 text-neutral-400 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <MapPin size={15} className="text-cyan-400" /> International Remote & Tech Core
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <User size={15} className="text-cyan-400" /> {isRtl ? "لیدر تیم توسعه‌دهندگان" : "Lead Software Architect"}
              </span>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail size={15} className="text-cyan-400" />
                <span>mobin@safipay.net</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-neutral-500" />}
              </button>
            </div>
          </div>
        </section>

        {/* Executive Technical Biography */}
        <section className="py-16 container mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-14 md:p-16 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600" />
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isRtl ? "بیانیه و چشم‌انداز لیدر تیم فنی" : "Lead Developer Manifesto & Architecture"}
              </h2>
            </div>

            {isRtl ? (
              <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
                <p>
                  من <strong className="text-white font-bold">مبین حسنی (Mobin Hassani)</strong> هستم؛ مهندس ارشد نرم‌افزار، معمار سیستم‌های ابری توزیع‌شده و لیدر بخش توسعه‌دهندگان (Lead Developer) در اکوسیستم صافی. رسالت من خلق، مهندسی و هدایت زیرساخت‌های نرم‌افزاری مدرنی است که میلیون‌ها تراکنش و تعاملات آموزشی و مالی را با حداکثر سرعت، پایداری و امنیت در مقیاس جهانی مدیریت می‌کنند.
                </p>
                <p>
                  به‌عنوان لیدر تیم توسعه‌دهندگان، نظارت مستقیم بر کل چرخه حیات نرم‌افزارهای اکوسیستم، از معماری فرانت‌اند و بک‌اند، پیاده‌سازی APIهای اختصاصی مالی، سیستم‌های احراز هویت چندلایه تا استقرار سرویس‌های ابری با استانداردهای سخت‌گیرانه بین‌المللی را بر عهده دارم.
                </p>
                <div className="bg-cyan-500/10 p-6 sm:p-8 rounded-[2.5rem] italic border-r-8 border-cyan-400 text-cyan-100">
                  «معماری دقیق نرم‌افزار، کدهای بهینه‌سازی‌شده و امنیت غیرقابل نفوذ، شالوده اصلی اعتماد در فناوری‌های نوین است. ما پلتفرم‌های اکوسیستم صافی را با استانداردهایی مهندسی می‌کنیم که در هر کجای دنیا بدون وقفه و با حداکثر توان کار کند.»
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed text-justify font-normal">
                <p>
                  I am <strong className="text-white font-bold">Mobin Hassani</strong>, Lead Developer and Head of Software Architecture across the Safi Ecosystem. My mission is to design, engineer, and lead the resilient technical foundations that power our financial applications, global student portals, and distributed microservices with near-zero latency and bank-grade security.
                </p>
                <p>
                  Leading the development ecosystem, I oversee full software lifecycle governance—from reactive frontend experiences and high-throughput backend APIs to cloud orchestration, CI/CD automated deployment pipelines, and proactive vulnerability mitigation.
                </p>
                <div className="bg-cyan-500/10 p-6 sm:p-8 rounded-[2.5rem] italic border-l-8 border-cyan-400 text-cyan-100">
                  “Immaculate software architecture, high-concurrency optimization, and uncompromising security form the core foundation of modern digital trust. We build Safi platforms to perform seamlessly across the globe.”
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Grid */}
        <section className="py-20 bg-cyan-500/[0.02]">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl sm:text-4xl font-black mb-16 italic tracking-tight">
              {isRtl ? "تخصص‌های کلیدی و پشته فنی" : "Core Technical Stack & Engineering Capabilities"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 bg-[#070b14] border border-white/5 rounded-[3rem] hover:border-cyan-400/40 transition-all group">
                <Code2 className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-3">{isRtl ? "معماری نرم‌افزار" : "Software Architecture"}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {isRtl
                    ? "طراحی سیستم‌های توزیع‌شده، میکروسرویس‌ها، مقیاس‌پذیری بالا، الگوهای طراحی پیشرفته و بهینه‌سازی عملکرد."
                    : "Distributed system design, high concurrency, clean architecture patterns, and enterprise performance tuning."}
                </p>
              </div>

              <div className="p-8 bg-[#070b14] border border-white/5 rounded-[3rem] hover:border-cyan-400/40 transition-all group">
                <Terminal className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-3">{isRtl ? "توسعه فول‌استک مدرن" : "Modern Full-Stack"}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono" dir="ltr">
                  TypeScript, Next.js, React, Node.js, Python, TailwindCSS, State Engines, GraphQL
                </p>
              </div>

              <div className="p-8 bg-[#070b14] border border-white/5 rounded-[3rem] hover:border-cyan-400/40 transition-all group">
                <Server className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-3">{isRtl ? "زیرساخت ابری و دواپس" : "Cloud & DevOps"}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono" dir="ltr">
                  Docker, Kubernetes, CI/CD Pipelines, AWS, GCP, Redis, Nginx, High Availability
                </p>
              </div>

              <div className="p-8 bg-[#070b14] border border-white/5 rounded-[3rem] hover:border-cyan-400/40 transition-all group">
                <ShieldCheck className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-3">{isRtl ? "امنیت فین‌تک و داده‌ها" : "Fintech Security"}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {isRtl
                    ? "رمزنگاری داده‌ها، استانداردهای بانکی، تست نفوذ، امنیت تراکنش‌ها، PostgreSQL و ذخیره‌سازی ایزوله."
                    : "End-to-end data encryption, ISO & PCI compliance, penetration audits, and isolated transactions."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Leadership */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black flex items-center gap-4 italic">
                <Workflow className="text-cyan-400" /> {isRtl ? "مسئولیت‌ها و تجارب" : "Responsibilities & Experience"}
              </h2>
              <div className="space-y-8 border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {isRtl ? "لیدر بخش توسعه‌دهندگان (Lead Developer)" : "Lead Software Engineer & Ecosystem Developer Head"}
                  </h4>
                  <p className="text-cyan-400 text-xs font-mono mb-2">Safi Global Ecosystem (2025 - Present)</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {isRtl
                      ? "هدایت تیم مهندسی نرم‌افزار، تدوین معماری فنی، بررسی و بازبینی کدها (Code Review)، تضمین عملکرد بهینه هسته مالی و هماهنگی کامل بین تیم‌های توسعه."
                      : "Directing software engineering squads, authoring core architectural blueprints, conducting strict code reviews, and maintaining 99.99% system availability."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white">
                    {isRtl ? "معمار ارشد سیستم و مهندس فول‌استک" : "Senior Systems Architect"}
                  </h4>
                  <p className="text-cyan-400 text-xs font-mono mb-2">International High-Load Web Projects</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {isRtl
                      ? "طراحی زیرساخت‌های بدون وقفه، بهینه‌سازی دیتابیس‌های پرتراکنش و پیاده‌سازی پلتفرم‌های تعاملی نسل وب با تکنولوژی‌های مدرن."
                      : "Architecting zero-downtime platforms, high-throughput database tuning, and high-performance interactive web portals."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black flex items-center gap-4 italic">
                <MonitorDot className="text-cyan-400" /> {isRtl ? "چشم‌انداز فنی در اکوسیستم صافی" : "Technical Vision for Safi Ecosystem"}
              </h2>
              <div className="space-y-8 border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
                <div>
                  <h4 className="text-xl font-bold text-white">{isRtl ? "پلتفرم دیجیتال فوق‌سریع" : "Ultra-Fast Digital Processing"}</h4>
                  <p className="text-cyan-400 text-xs font-mono mb-2">Real-Time Event Architecture</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {isRtl
                      ? "پیاده‌سازی سازوکارهای لودینگ آنی، تسویه فوری و مدیریت رویدادهای مالی بر بستر شبکه جهانی."
                      : "Immediate state synchronization, instant settlement hooks, and sub-millisecond API response caching."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white">{isRtl ? "امنیت و استانداردهای جهانی" : "Global Security Standards"}</h4>
                  <p className="text-cyan-400 text-xs font-mono mb-2">Enterprise Automated E2E Testing</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {isRtl
                      ? "پایش مستمر کدهای پروژه، ممانعت از آسیب‌پذیری‌های امنیتی و پیاده‌سازی تست‌های خودکار E2E."
                      : "Continuous code audits, automated dependency sanitization, and regression test suites."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Adsterra Sponsor Banner */}
        <section className="container mx-auto max-w-4xl px-6 py-8">
          <AdsterraNativeBanner
            title={isRtl ? "ابزارها و سرویس‌های پیشنهادی توسعه نرم‌افزار و ابر" : "Recommended Cloud, DevOps & Engineering Tools"}
            niche="Software Engineering, Cloud Computing, Web Development, DevOps & Fintech Tools"
            keywords="software development, web hosting, nextjs, cloud server, devops, coding bootcamp, tech jobs"
            className="border-cyan-500/20 bg-neutral-900/60"
          />
        </section>

        {/* Footer */}
        <footer className="py-16 text-center border-t border-white/5">
          <div className="flex justify-center gap-6 mb-6">
            {socialLinks.map((social, idx) => (
              <Link key={idx} href={social.href} target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="opacity-40 text-xs tracking-widest uppercase">
            {isRtl
              ? "مبین حسنی • لیدر بخش توسعه‌دهندگان اکوسیستم صافی • ۲۰۲۶"
              : "Mobin Hassani • Lead Developer • Safi Global Ecosystem • 2026"}
          </p>
        </footer>
      </div>
    </div>
  );
}
