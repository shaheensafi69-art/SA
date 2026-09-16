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

export default function DevelopmentServicesPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

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

  // --------------------------------------------------------------------------
  // 6 Core Engineering Solutions with Deep Technical Authority
  // --------------------------------------------------------------------------
  const services = [
    {
      id: "web-app",
      title: "Enterprise Full-Stack Web Applications",
      badge: "High Concurrency",
      icon: Code2,
      color: "border-blue-500/30",
      glow: "bg-blue-500/10",
      iconColor: "text-blue-400",
      shortDesc: "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
      longDesc:
        "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
      features: [
        "Next.js App Router & TypeScript Strict Mode",
        "Sub-second TTFB with Global Edge Caching",
        "Enterprise RBAC & SSO (OAuth2 / SAML)",
        "State Management via Zustand & React Query",
        "Responsive Glassmorphic UI with Tailwind CSS",
        "Automated Lighthouse & Performance CI Audits"
      ]
    },
    {
      id: "mobile-apps",
      title: "Cross-Platform & Native Mobile Apps",
      badge: "iOS & Android",
      icon: Smartphone,
      color: "border-emerald-500/30",
      glow: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      shortDesc: "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
      longDesc:
        "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
      features: [
        "Flutter & Dart Cross-Platform Architecture",
        "Offline-First SQLite Data Synchronization",
        "Biometric Authentication & Secure Keychain",
        "Low-Latency Push Notifications & Deep Linking",
        "Background Geolocation & Background Tasks",
        "Automated CI/CD App Store Deployment"
      ]
    },
    {
      id: "backend-cloud",
      title: "High-Throughput Cloud & Backend Architecture",
      badge: "Distributed Scale",
      icon: Database,
      color: "border-purple-500/30",
      glow: "bg-purple-500/10",
      iconColor: "text-purple-400",
      shortDesc: "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
      longDesc:
        "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
      features: [
        "PostgreSQL & Supabase Real-Time Engine",
        "Redis In-Memory Distributed Caching",
        "Go & Node.js Asynchronous Microservices",
        "Docker Containerization & Kubernetes Ready",
        "Strict Schema Validation via Zod & Prisma",
        "Rate Limiting, Anti-DDoS & WAF Protection"
      ]
    },
    {
      id: "ai-integration",
      title: "Autonomous AI Agents & LLM Infrastructure",
      badge: "Next-Gen AI",
      icon: Bot,
      color: "border-cyan-500/30",
      glow: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      shortDesc: "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
      longDesc:
        "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
      features: [
        "Enterprise RAG Pipelines with Hybrid Search",
        "Custom Vector Embeddings (pgvector / Pinecone)",
        "Autonomous Task Orchestration & Tool Calling",
        "Multi-Modal Vision, Speech & OCR Pipelines",
        "Hallucination Guardrails & Token Optimization",
        "Private On-Premise LLM Deployments (Ollama)"
      ]
    },
    {
      id: "fintech-ecommerce",
      title: "FinTech & E-Commerce Payment Systems",
      badge: "PCI-DSS Level 1",
      icon: DollarSign,
      color: "border-amber-500/30",
      glow: "bg-amber-500/10",
      iconColor: "text-amber-400",
      shortDesc: "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
      longDesc:
        "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
      features: [
        "Stripe Embedded & Custom Checkout Gateways",
        "Double-Entry Accounting Transaction Ledgers",
        "Webhook Event Queue Idempotency & Retries",
        "Multi-Currency Dynamic Conversion & FX Handling",
        "Automated Subscription Lifecycle & Churn Prevention",
        "Real-Time Anti-Fraud & Chargeback Detection"
      ]
    },
    {
      id: "cybersecurity-audit",
      title: "Cybersecurity Auditing & Code Hardening",
      badge: "Zero-Trust",
      icon: ShieldCheck,
      color: "border-rose-500/30",
      glow: "bg-rose-500/10",
      iconColor: "text-rose-400",
      shortDesc: "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
      longDesc:
        "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
      features: [
        "OWASP Top 10 Web & API Penetration Testing",
        "Automated Static Analysis (SAST) in CI/CD",
        "End-to-End AES-256 Data Encryption",
        "Zero-Trust Network Access & Strict IAM Roles",
        "Comprehensive Vulnerability Remediation Reports",
        "GDPR, HIPAA & SOC-2 Architecture Alignment"
      ]
    }
  ];

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

  // --------------------------------------------------------------------------
  // 6-Stage Battle-Tested Agile Delivery Blueprint
  // --------------------------------------------------------------------------
  const deliveryStages = [
    {
      stage: "01",
      title: "Technical Discovery & Blueprinting",
      desc: "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
    },
    {
      stage: "02",
      title: "Interactive UI/UX & Design Systems",
      desc: "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
    },
    {
      stage: "03",
      title: "Agile Sprints & Bi-Weekly Demos",
      desc: "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
    },
    {
      stage: "04",
      title: "Rigorous QA, Security & Load Testing",
      desc: "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
    },
    {
      stage: "05",
      title: "Zero-Downtime Cloud Deployment",
      desc: "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
    },
    {
      stage: "06",
      title: "24/7 SLA, Monitoring & Code Handoff",
      desc: "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
    }
  ];

  // --------------------------------------------------------------------------
  // Client Trust Guarantees
  // --------------------------------------------------------------------------
  const clientGuarantees = [
    {
      title: "100% Full IP & Code Ownership",
      desc: "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented.",
      icon: Award
    },
    {
      title: "Strict Non-Disclosure Agreements (NDA)",
      desc: "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions.",
      icon: Shield
    },
    {
      title: "Direct Senior Engineer Communication",
      desc: "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels.",
      icon: Headphones
    },
    {
      title: "UK-Registered Enterprise Standards",
      desc: "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders.",
      icon: Globe
    }
  ];

  // --------------------------------------------------------------------------
  // Frequently Asked Questions
  // --------------------------------------------------------------------------
  const faqs = [
    {
      q: "How quickly can your engineering team start on my project?",
      a: "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
    },
    {
      q: "Who owns the code and intellectual property once built?",
      a: "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
    },
    {
      q: "How are project payments structured?",
      a: "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
    },
    {
      q: "Can you take over and refactor an existing software codebase?",
      a: "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
    },
    {
      q: "What happens after our application goes live?",
      a: "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
    },
    {
      q: "Do you build custom AI models or just integrate third-party APIs?",
      a: "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
    }
  ];

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
            <Terminal size={16} /> Elite Software Engineering Division
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.08]">
            We Engineer Software That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Powers Global Enterprises
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            Hire the elite technical team behind the Safi Ecosystem. From high-concurrency SaaS platforms and fluid cross-platform mobile apps to autonomous AI workflows and hardened cloud infrastructure, we build digital systems that dominate their markets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_35px_rgba(6,182,212,0.35)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.55)] hover:scale-105 active:scale-95 group"
            >
              <span>{t.publicPages.requestProposal}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-md"
            >
              Explore Engineering Arsenal
            </a>
          </div>

          {/* Quick Credibility Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-white">99.99%</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{t.publicPages.uptimeSla}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400">Sub-100ms</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{t.publicPages.globalApiLatency}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">{t.publicPages.codeIpOwnership}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">Zero-Trust</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Hardened Security</div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. SERVICES SECTION: 6 Core Engineering Offerings */}
        {/* ================================================================== */}
        <div id="services" className="mb-32 scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              Full-Cycle Engineering
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our Software Engineering Arsenal
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              We do not cut corners or rely on fragile templates. Every architecture is custom-crafted for high performance, bulletproof security, and future-proof scalability.
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
                        Architectural Highlights:
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
                      <span>Request Architecture Quote</span>
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
              Modern Engineering Stack
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Battle-Tested Technologies We Master
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              We select tools based on proven scalability, type safety, low latency, and long-term ecosystem stability.
            </p>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mt-6 rounded-full"></div>

            {/* Stack Category Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: "frontend", label: "Frontend & Web" },
                { id: "backend", label: "Backend & APIs" },
                { id: "mobile", label: "Mobile Apps" },
                { id: "database", label: "Databases & Cache" },
                { id: "cloud", label: "Cloud & DevOps" },
                { id: "ai", label: "AI & LLM Infra" }
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
              Delivery Methodology
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our 6-Stage Agile Engineering Roadmap
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              A structured, transparent engineering lifecycle designed to ship on schedule without budget surprises.
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
              Client Protection Standards
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              Why Global Startups & Enterprises Partner With Us
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              We operate with European and British corporate integrity, providing uncompromising legal, IP, and privacy guarantees.
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
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Masterpiece
                </span>
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                Fill out the project scope form. Our lead software architects will review your requirements, prepare an initial technical roadmap, and schedule a discovery call within 24 hours.
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
                    <User size={14} className="text-cyan-400" /> Full Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. Alexander Smith"
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={14} className="text-cyan-400" /> Work Email *
                  </label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} className="text-cyan-400" /> WhatsApp / Phone *
                  </label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-cyan-400" /> Required Service
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
                  <DollarSign size={14} className="text-cyan-400" /> Estimated Budget
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
                  <MessageSquare size={14} className="text-cyan-400" /> Project Details & Goals *
                </label>
                <textarea
                  required
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your project, target audience, preferred timeline, and any specific technical features you require..."
                  className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmitting ? "Dispatching to Architecture Team..." : "Submit Project Request"}</span>
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-bold mt-2">
                  <CheckCircle2 size={18} />
                  <span>Request received successfully! Our senior lead engineer will contact you within 24 hours.</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3 text-red-400 text-sm font-bold mt-2">
                  <span>An error occurred while submitting your request. Please try again or email info@safiacademy.org directly.</span>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        {/* ================================================================== */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
              Client FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
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