"use client";

import { getPortalTranslation } from "@/utils/portalTranslations";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  Database,
  Bot,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Zap,
  User,
  Mail,
  Phone,
  MessageSquare,
  DollarSign,
  Send,
  Loader2,
  Lock,
  Server,
  Layers,
  Cpu,
  Globe,
  Activity,
  Check,
  ChevronRight,
  Award,
  Shield,
  Headphones,
  Sparkles,
  FileCode2
} from "lucide-react";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";
import { getDevelopmentServicesTranslation } from "@/utils/developmentServicesTranslations";

export default function DevelopmentServicesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const dt = getDevelopmentServicesTranslation(currentLocale);
  const isRtl = dt.isRtl;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Application",
    budget: "To be discussed",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeStackTab, setActiveStackTab] = useState<"frontend" | "backend" | "mobile" | "database" | "cloud" | "ai">("frontend");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Web Application",
          budget: "To be discussed",
          details: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SERVICE_STYLES: Record<string, { icon: any; color: string; glow: string; iconColor: string }> = {
    "web-app": { icon: Code2, color: "border-blue-500/30", glow: "bg-blue-500/10", iconColor: "text-blue-400" },
    "mobile-apps": { icon: Smartphone, color: "border-emerald-500/30", glow: "bg-emerald-500/10", iconColor: "text-emerald-400" },
    "backend-cloud": { icon: Database, color: "border-purple-500/30", glow: "bg-purple-500/10", iconColor: "text-purple-400" },
    "ai-integration": { icon: Bot, color: "border-cyan-500/30", glow: "bg-cyan-500/10", iconColor: "text-cyan-400" },
    "fintech-ecommerce": { icon: DollarSign, color: "border-amber-500/30", glow: "bg-amber-500/10", iconColor: "text-amber-400" },
    "cybersecurity-audit": { icon: ShieldCheck, color: "border-rose-500/30", glow: "bg-rose-500/10", iconColor: "text-rose-400" },
  };

  const services = dt.services.map((s) => ({
    ...s,
    ...(SERVICE_STYLES[s.id] || { icon: Code2, color: "border-blue-500/30", glow: "bg-blue-500/10", iconColor: "text-blue-400" })
  }));

  // --------------------------------------------------------------------------
  // Interactive Technology Stack Arsenal
  // --------------------------------------------------------------------------
  const techStacks = {
    frontend: [
      { name: "Next.js 14/15", desc: "React framework for production with App Router, SSR, and ISR." },
      { name: "React 18/19", desc: "Component architecture with concurrent rendering and Server Components." },
      { name: "TypeScript", desc: "100% static typing for zero runtime surprises and enterprise refactoring." },
      { name: "Tailwind CSS v4", desc: "Utility-first design system engine for lightning-fast responsive UI." },
      { name: "Framer Motion", desc: "Production-ready motion library for fluid, 60fps micro-animations." },
      { name: "Zustand & React Query", desc: "Optimistic updates, smart server state caching, and offline sync." }
    ],
    backend: [
      { name: "Node.js & Express", desc: "Event-driven asynchronous I/O for scalable web services and APIs." },
      { name: "Go (Golang)", desc: "Blazing-fast compiled microservices and concurrent network programming." },
      { name: "Python FastAPI", desc: "High-performance async web framework tailored for AI and data services." },
      { name: "GraphQL & REST", desc: "Strongly-typed schemas and hypermedia APIs for flexible client consumption." },
      { name: "Zod & Prisma ORM", desc: "End-to-end type safety spanning client, server, and database schemas." },
      { name: "BullMQ / Redis Queues", desc: "Asynchronous background job workers and distributed task schedulers." }
    ],
    mobile: [
      { name: "Flutter & Dart", desc: "Single codebase compiling directly to native ARM machine code on iOS & Android." },
      { name: "React Native", desc: "Native platform bridge with declarative React components and fast reload." },
      { name: "Swift & Kotlin", desc: "Direct native modules for specialized hardware sensors, Bluetooth, and audio." },
      { name: "SQLite & Hive", desc: "High-throughput local key-value and relational storage for offline use." },
      { name: "Firebase & Supabase SDK", desc: "Real-time subscriptions, cloud messaging, and authentication for mobile." },
      { name: "Fastlane", desc: "Automated mobile deployment pipelines for TestFlight and Google Play Beta." }
    ],
    database: [
      { name: "PostgreSQL", desc: "The world's most advanced relational database engine with JSONB support." },
      { name: "Supabase", desc: "Postgres infrastructure with Row Level Security (RLS) and real-time triggers." },
      { name: "Redis", desc: "Sub-millisecond latency in-memory data store for caching, pub/sub, and sessions." },
      { name: "pgvector", desc: "Vector similarity search inside PostgreSQL for AI embeddings and RAG." },
      { name: "MongoDB", desc: "Flexible document-oriented NoSQL database for rapid unstructured iteration." },
      { name: "ClickHouse", desc: "High-speed columnar database for big-data telemetry and analytics." }
    ],
    cloud: [
      { name: "Amazon Web Services (AWS)", desc: "Enterprise cloud hosting (ECS, Lambda, S3, RDS, CloudFront)." },
      { name: "Google Cloud Platform (GCP)", desc: "Cloud Run, Kubernetes Engine, BigQuery, and enterprise AI infra." },
      { name: "Docker & Containers", desc: "Reproducible containerized environments ensuring dev-to-prod parity." },
      { name: "Kubernetes (K8s)", desc: "Automated container orchestration, self-healing, and horizontal pod autoscaling." },
      { name: "Cloudflare Workers & Edge", desc: "Global edge compute network, serverless functions, and DDoS mitigation." },
      { name: "GitHub Actions CI/CD", desc: "Automated testing, linting, security scanning, and zero-downtime deploys." }
    ],
    ai: [
      { name: "OpenAI GPT-4o / Reasoning", desc: "State-of-the-art multi-modal LLMs for complex problem-solving." },
      { name: "Anthropic Claude 3.5 Sonnet", desc: "Industry-leading code generation and nuanced reasoning capabilities." },
      { name: "LangChain & LlamaIndex", desc: "Frameworks for building agentic architectures and memory chains." },
      { name: "Pinecone Vector DB", desc: "Fully managed vector database engineered for ultra-fast semantic retrieval." },
      { name: "Llama 3 & Mistral", desc: "Open-source foundational models deployed on private GPUs for data sovereignty." },
      { name: "Whisper & ElevenLabs", desc: "State-of-the-art speech-to-text transcription and ultra-realistic voice synthesis." }
    ]
  };

  const GUARANTEE_ICONS = [Award, Shield, Headphones, Globe];
  const clientGuarantees = dt.clientGuarantees.map((g, idx) => ({
    ...g,
    icon: GUARANTEE_ICONS[idx] || Award
  }));

  const deliveryStages = dt.deliveryStages;
  const faqs = dt.faqs;

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#030307] text-white font-sans overflow-hidden min-h-screen pt-32 pb-28">
      {/* Dynamic Background Ambient Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:36px_36px] opacity-40"></div>
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/12 rounded-full blur-[170px]"></div>
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] bg-cyan-600/12 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* ================================================================== */}
        {/* 1. HERO SECTION: Enterprise Software Architecture */}
        {/* ================================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-24 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <Terminal size={16} /> {dt.heroBadge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.08]">
            {dt.heroTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            {dt.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_35px_rgba(6,182,212,0.35)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.55)] hover:scale-105 active:scale-95 group"
            >
              <span>{dt.ctaConsultation}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-md"
            >
              {dt.ctaExplore}
            </a>
          </div>

          {/* Quick Credibility Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-white">{dt.stat1Val}</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{dt.stat1Label}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400">{dt.stat2Val}</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{dt.stat2Label}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{dt.stat3Val}</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{dt.stat3Label}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">{dt.stat4Val}</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{dt.stat4Label}</div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. SERVICES SECTION: 6 Core Engineering Offerings */}
        {/* ================================================================== */}
        <div id="services" className="mb-32 scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              {dt.servicesBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {dt.servicesTitle}
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              {dt.servicesSubtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className={`bg-[#0a0a14] border ${service.color} p-7 md:p-8 rounded-[2.5rem] hover:border-cyan-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5`}
                >
                  <div className={`absolute inset-0 ${service.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 bg-[#050505] border ${service.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={`w-7 h-7 ${service.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-400 mb-4">
                      {service.shortDesc}
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                      {service.longDesc}
                    </p>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-6">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                        Architectural Highlights
                      </div>
                      <div className="space-y-1.5">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 relative z-10">
                    <a
                      href="#quote-form"
                      onClick={() => setFormData({ ...formData, service: service.title })}
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                    >
                      <span>{dt.ctaConsultation}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. INTERACTIVE TECHNOLOGY STACK RADAR */}
        {/* ================================================================== */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              {dt.stackBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {dt.stackTitle}
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              {dt.stackSubtitle}
            </p>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mt-6 rounded-full"></div>

            {/* Stack Category Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: "frontend", label: dt.stackTabFrontend },
                { id: "backend", label: dt.stackTabBackend },
                { id: "mobile", label: dt.stackTabMobile },
                { id: "database", label: dt.stackTabDatabase },
                { id: "cloud", label: dt.stackTabCloud },
                { id: "ai", label: dt.stackTabAi }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveStackTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeStackTab === tab.id
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 scale-105"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStacks[activeStackTab].map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#0a0a14] border border-white/10 hover:border-cyan-500/40 p-6 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileCode2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <h4 className="text-base font-bold text-white">{tech.name}</h4>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed pl-8">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 4. AGILE DELIVERY BLUEPRINT: 6-Stage Roadmap */}
        {/* ================================================================== */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              {dt.deliveryBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {dt.deliveryTitle}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              {dt.deliverySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a14] border border-white/10 rounded-2xl p-7 relative flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-3xl font-black text-cyan-500/30 mb-4 font-mono">
                  {stage.stage}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{stage.title}</h4>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{stage.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Phase {stage.stage}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 5. ENTERPRISE CLIENT GUARANTEES */}
        {/* ================================================================== */}
        <div className="bg-gradient-to-br from-[#0c0a18] via-[#080710] to-[#040409] border border-cyan-500/20 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-32">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              {dt.guaranteesBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              {dt.guaranteesTitle}
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {dt.guaranteesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {clientGuarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-start p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/[0.05]"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 6. REQUEST A QUOTE FORM SECTION (PRESERVED LOGIC & TELEGRAM) */}
        {/* ================================================================== */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="scroll-mt-32 w-full bg-[#0a0a0f] border border-cyan-500/30 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-14 mb-32"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>

          {/* Left Text */}
          <div className="w-full lg:w-1/3 relative z-10 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-6 shadow-inner">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {dt.formTitle}
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                {dt.formSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                  Direct Inquiries
                </p>
                <p className="text-sm font-black text-white">info@safiacademy.org</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-xs text-neutral-300">
                  Strict NDA signed automatically upon request prior to technical sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-2/3 relative z-10">
            <form
              onSubmit={handleSubmit}
              className="bg-black/50 border border-white/10 p-6 md:p-10 rounded-[2rem] backdrop-blur-xl flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} className="text-cyan-400" /> {dt.formNameLabel}
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder={dt.formNamePlaceholder}
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={14} className="text-cyan-400" /> {dt.formEmailLabel}
                  </label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder={dt.formEmailPlaceholder}
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} className="text-cyan-400" /> {dt.formPhoneLabel}
                  </label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder={dt.formPhonePlaceholder}
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-cyan-400" /> {dt.formServiceLabel}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm appearance-none"
                  >
                    <option value="Enterprise Full-Stack Web Applications">Enterprise Web Application</option>
                    <option value="Cross-Platform & Native Mobile Apps">Mobile App (iOS/Android Flutter)</option>
                    <option value="Autonomous AI Agents & LLM Infrastructure">Custom AI Integration & Agents</option>
                    <option value="High-Throughput Cloud & Backend Architecture">Backend & Cloud Microservices</option>
                    <option value="FinTech & E-Commerce Payment Systems">FinTech / Payment Architecture</option>
                    <option value="Cybersecurity Auditing & Code Hardening">Cybersecurity & Code Audit</option>
                    <option value="Other Custom Engineering">Other Custom Software</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign size={14} className="text-cyan-400" /> {dt.formBudgetLabel}
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm appearance-none"
                >
                  <option value="To be discussed">To be discussed / Discovery phase</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000 (MVP / Prototype)</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000 (Standard Production Platform)</option>
                  <option value="$15,000+">$15,000+ (Enterprise Multi-Platform & AI)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} className="text-cyan-400" /> {dt.formDetailsLabel}
                </label>
                <textarea
                  required
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder={dt.formDetailsPlaceholder}
                  className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmitting ? dt.formSubmittingBtn : dt.formSubmitBtn}</span>
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-bold mt-2">
                  <CheckCircle2 size={18} />
                  <span>{dt.formSuccessDesc}</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3 text-red-400 text-sm font-bold mt-2">
                  <span>{dt.formErrorDesc}</span>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* NATIVE AD BANNER (TECH & DEV SPONSOR) */}
        {/* ================================================================== */}
        <AdsterraNativeBanner
          category="Software Architecture, Cloud Dev & Enterprise APIs"
          keywords="software engineering, web development, cloud apps, full stack, react, next.js"
          badgeLabel="Engineering Partner"
        />

        {/* ================================================================== */}
        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        {/* ================================================================== */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              {dt.faqsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {dt.faqsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-cyan-500/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white flex items-start gap-3">
                      <span className="text-cyan-400 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-0 border-t border-white/5"
                      >
                        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed pl-7 pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}