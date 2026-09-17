"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { usePathname } from "next/navigation";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Cloud,
  HardDrive,
  Briefcase,
  LayoutTemplate,
  Globe,
  Mail,
  Send,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Zap,
  Lock,
  RefreshCw,
  Database,
  Terminal,
  Users,
  Award,
  HelpCircle,
  Activity,
  Flame,
  Layers,
  Bot,
  Info,
  Sliders,
  CheckCheck
} from "lucide-react";

// ============================================================================
// OFFICIAL PARTNER & REFERRAL CONFIGURATION
// Verified Safi Academy Hostinger Referral Link & Partner Code
// ============================================================================
const REFERRAL_LINK = "https://www.hostinger.com/?REFERRALCODE=89LSHAHEEKCO";
const REFERRAL_CODE = "89LSHAHEEKCO";

export default function HostingerAffiliatePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const [copied, setCopied] = useState(false);
  const [selectedPlanTab, setSelectedPlanTab] = useState<"all" | "web" | "cloud" | "vps">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // --------------------------------------------------------------------------
  // 10 Core Hostinger Services with Deep Educational Details
  // --------------------------------------------------------------------------
  const services = [
    {
      id: "web-hosting",
      name: "High-Speed Web Hosting",
      icon: Server,
      badge: "Most Popular",
      category: "web",
      shortDesc: "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
      longDesc:
        "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
      specs: [
        "LiteSpeed Web Server with LSCache",
        "Free 1-Click WordPress Auto-Installer",
        "Free 1-Year Domain Registration Included",
        "Unlimited Free SSL Certificates",
        "Automated Weekly & Daily Backups",
        "Integrated Git Version Control Deployment"
      ]
    },
    {
      id: "cloud-hosting",
      name: "Enterprise Cloud Hosting",
      icon: Cloud,
      badge: "High Performance",
      category: "cloud",
      shortDesc: "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
      longDesc:
        "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
      specs: [
        "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
        "Dedicated IPv4 & IPv6 Address Included",
        "3x to 4x Faster Speed than Standard Hosting",
        "Built-in Cloudflare Enterprise CDN Protection",
        "Automated Daily Backups with 1-Click Restore",
        "Priority 24/7 VIP Technical Support"
      ]
    },
    {
      id: "vps-hosting",
      name: "KVM Cloud VPS Hosting",
      icon: HardDrive,
      badge: "Developers & DevOps",
      category: "vps",
      shortDesc: "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
      longDesc:
        "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
      specs: [
        "Full Root Access & Dedicated Kernel (KVM)",
        "Enterprise-Class NVMe Storage with Ultra-High IOPS",
        "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
        "Docker, Node.js, Python & Microservices Ready",
        "Automated Weekly Snapshots & Firewall Rules",
        "Built-in AI Assistant for Terminal Configurations"
      ]
    },
    {
      id: "agency-hosting",
      name: "Agency Hosting & Hostinger Pro",
      icon: Briefcase,
      badge: "Agencies & Freelancers",
      category: "web",
      shortDesc: "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
      longDesc:
        "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
      specs: [
        "Centralized Multi-Client Management Portal",
        "Granular Role-Based Access Control (RBAC)",
        "Access Delegation Without Password Sharing",
        "Automated Client Website Maintenance Reports",
        "Integrated Referral & Commission Payouts",
        "Mass Plugin & Core WordPress Updates in 1-Click"
      ]
    },
    {
      id: "ai-website-builder",
      name: "AI Website Builder",
      icon: LayoutTemplate,
      badge: "No-Code & Fast",
      category: "web",
      shortDesc: "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
      longDesc:
        "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
      specs: [
        "Prompt-to-Website Generation in 60 Seconds",
        "Intuitive Drag-and-Drop Visual Canvas",
        "Integrated AI Copywriter & SEO Generator",
        "AI Heatmap for Conversion Rate Optimization",
        "Complete E-Commerce Suite (0% Transaction Fees)",
        "Mobile-First Responsive Layouts by Default"
      ]
    },
    {
      id: "hostinger-horizons",
      name: "Hostinger Horizons",
      icon: Globe,
      badge: "Next-Gen Cloud",
      category: "cloud",
      shortDesc: "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
      longDesc:
        "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
      specs: [
        "Next-Generation Edge-Native Architecture",
        "Ultra-Low Global Latency with Anycast Routing",
        "Automatic Elastic Resource Reallocation",
        "Future-Proof Compatibility with Modern Web Frameworks",
        "Tier-3 Globally Certified Data Center Backbone",
        "Continuous Performance & Reliability Tuning"
      ]
    },
    {
      id: "business-email",
      name: "Professional Business Email",
      icon: Mail,
      badge: "Brand Identity",
      category: "web",
      shortDesc: "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
      longDesc:
        "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
      specs: [
        "Professional Branded Inboxes (@yourdomain.com)",
        "Up to 50GB Dedicated Storage per Mailbox",
        "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
        "Integrated Business Calendar & Contact Manager",
        "Native Mobile Apps for iOS & Android",
        "Automated Email Forwarding & Signature Builder"
      ]
    },
    {
      id: "reach-email",
      name: "Reach Email Marketing",
      icon: Send,
      badge: "Growth & Lead Gen",
      category: "web",
      shortDesc: "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
      longDesc:
        "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
      specs: [
        "Integrated Directly into Your Hosting Dashboard",
        "Drag-and-Drop Newsletter & Campaign Designer",
        "Automated Drip Sequences & Autoresponders",
        "Real-Time Delivery, Open, and Click Telemetry",
        "High Inbox Deliverability with Pre-Warmed IPs",
        "Seamless Form Integration with WordPress & HTML"
      ]
    },
    {
      id: "managed-openclaw",
      name: "Managed OpenClaw Microservices",
      icon: Cpu,
      badge: "High Concurrency",
      category: "cloud",
      shortDesc: "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
      longDesc:
        "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
      specs: [
        "Isolated Containerized Microservice Architecture",
        "Optimized for High-Concurrency API Gateways",
        "Low-Overhead Compute Resource Allocation",
        "Continuous Process Health Monitoring & Self-Healing",
        "Integrated Micro-Telemetry & Error Logging",
        "Zero Server Maintenance & Automated Security Patching"
      ]
    },
    {
      id: "ai-agents",
      name: "Autonomous AI Hosting Agents",
      icon: Sparkles,
      badge: "Next-Gen AI",
      category: "cloud",
      shortDesc: "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
      longDesc:
        "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
      specs: [
        "Automated WordPress Plugin Conflict Diagnostics",
        "Natural Language .htaccess & Nginx Rule Generation",
        "Slow MySQL Query Detection & Indexing Advice",
        "Automated On-Page SEO Recommendations",
        "Terminal Command Generation for VPS Users",
        "24/7 Instant In-Dashboard Assistance"
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // Hosting Plan Comparison Tiers
  // --------------------------------------------------------------------------
  const plans = [
    {
      name: "Premium Web Hosting",
      tagline: "Best for personal websites, blogs, and student projects",
      price: "$2.99",
      period: "/month",
      savings: "Save 75% + 20% Partner Off",
      popular: false,
      category: "web",
      specs: [
        { label: "Websites", val: "100 Websites" },
        { label: "Storage", val: "100 GB SSD" },
        { label: "Performance", val: "Standard LiteSpeed" },
        { label: "Domain", val: "Free 1-Year Domain ($9.99 value)" },
        { label: "SSL", val: "Unlimited Free SSL" },
        { label: "Bandwidth", val: "Unlimited" },
        { label: "Backups", val: "Weekly Automated" },
        { label: "Email", val: "Free Business Email" },
        { label: "AI Tools", val: "Basic AI Website Builder" }
      ],
      ctaText: "Choose Premium Plan",
      accent: "border-white/10"
    },
    {
      name: "Business Web Hosting",
      tagline: "Recommended for businesses, creators & e-commerce stores",
      price: "$3.99",
      period: "/month",
      savings: "Save 73% + 20% Partner Off",
      popular: true,
      category: "web",
      specs: [
        { label: "Websites", val: "100 Websites" },
        { label: "Storage", val: "200 GB Ultra NVMe (5x Faster)" },
        { label: "Performance", val: "Up to 5x Increased Speed" },
        { label: "Domain", val: "Free 1-Year Domain ($9.99 value)" },
        { label: "SSL", val: "Unlimited Free SSL" },
        { label: "Bandwidth", val: "Unlimited" },
        { label: "Backups", val: "Daily & On-Demand Backups" },
        { label: "CDN", val: "Free Built-in CDN Included" },
        { label: "Staging", val: "1-Click WordPress Staging Tool" },
        { label: "AI Tools", val: "Full AI Website Builder Suite" }
      ],
      ctaText: "Choose Business Plan",
      accent: "border-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.3)]"
    },
    {
      name: "Cloud Startup",
      tagline: "Dedicated resources for viral traffic and high-growth apps",
      price: "$9.99",
      period: "/month",
      savings: "Save 60% + 20% Partner Off",
      popular: false,
      category: "cloud",
      specs: [
        { label: "Websites", val: "300 Websites" },
        { label: "Storage", val: "200 GB NVMe Storage" },
        { label: "RAM / CPU", val: "3 GB RAM + 2 CPU Cores (Dedicated)" },
        { label: "Performance", val: "Up to 10x Boosted Speed" },
        { label: "IP Address", val: "Dedicated IP Address Included" },
        { label: "Domain", val: "Free 1-Year Domain" },
        { label: "Backups", val: "Automated Daily Backups" },
        { label: "CDN", val: "Cloudflare Enterprise CDN" },
        { label: "Support", val: "Priority 24/7 VIP Support Queue" }
      ],
      ctaText: "Choose Cloud Startup",
      accent: "border-indigo-500/50"
    },
    {
      name: "KVM 2 Cloud VPS",
      tagline: "Dedicated root server power for engineers and developers",
      price: "$7.99",
      period: "/month",
      savings: "Save 55% + 20% Partner Off",
      popular: false,
      category: "vps",
      specs: [
        { label: "CPU", val: "2 Dedicated vCPU Cores" },
        { label: "RAM", val: "8 GB Dedicated RAM" },
        { label: "Storage", val: "100 GB High-IOPS NVMe" },
        { label: "Bandwidth", val: "8 TB High-Speed Traffic" },
        { label: "Access", val: "Full Root Administrative Access" },
        { label: "Virtualization", val: "100% Kernel-based (KVM)" },
        { label: "Backups", val: "Automated Weekly Snapshots" },
        { label: "AI Terminal", val: "AI Assistant for Linux Commands" },
        { label: "OS Support", val: "Ubuntu, Debian, AlmaLinux, Rocky" }
      ],
      ctaText: "Choose KVM VPS",
      accent: "border-blue-500/40"
    }
  ];

  // --------------------------------------------------------------------------
  // Technical Benchmarks & Architecture Reasons
  // --------------------------------------------------------------------------
  const architectureHighlights = [
    {
      title: "LiteSpeed Enterprise vs. Apache",
      desc: "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
      icon: Zap,
      metric: "5x Faster TTFB"
    },
    {
      title: "Global Tier-3 Data Centers",
      desc: "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
      icon: Globe,
      metric: "8 Global Regions"
    },
    {
      title: "Multi-Layer Defensive Security",
      desc: "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
      icon: ShieldCheck,
      metric: "99.9% Uptime SLA"
    },
    {
      title: "Next-Gen hPanel Control Center",
      desc: "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
      icon: Sliders,
      metric: "3x Faster Navigation"
    },
    {
      title: "Automated Snapshot & Daily Backups",
      desc: "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
      icon: RefreshCw,
      metric: "Zero-Downtime Restores"
    },
    {
      title: "Developer & Staging Toolkit",
      desc: "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
      icon: Terminal,
      metric: "Dev-Ready Stack"
    }
  ];

  // --------------------------------------------------------------------------
  // Step-by-Step Blueprint
  // --------------------------------------------------------------------------
  const launchSteps = [
    {
      step: "01",
      title: "Click Safi Academy's Partner Link",
      desc: "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
    },
    {
      step: "02",
      title: "Select Your Preferred Plan",
      desc: "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
    },
    {
      step: "03",
      title: "Apply Code 89LSHAHEEKCO at Checkout",
      desc: "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
    },
    {
      step: "04",
      title: "Claim Free Domain & Deploy in 60s",
      desc: "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
    }
  ];

  // --------------------------------------------------------------------------
  // Frequently Asked Questions
  // --------------------------------------------------------------------------
  const faqs = [
    {
      q: "How do I claim the 20% discount using the referral code?",
      a: "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
    },
    {
      q: "Is the free domain name really included at no cost?",
      a: "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
    },
    {
      q: "Can I migrate my existing website from another hosting provider for free?",
      a: "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
    },
    {
      q: "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
      a: "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
    },
    {
      q: "Can I run modern programming languages like Node.js, Python, and Docker?",
      a: "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
    },
    {
      q: "What is the 30-day money-back guarantee policy?",
      a: "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
    },
    {
      q: "How does Hostinger's hPanel compare to traditional cPanel?",
      a: "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
    },
    {
      q: "Does Hostinger support SSL certificates and HTTPS encryption?",
      a: "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
    }
  ];

  const filteredPlans = selectedPlanTab === "all" ? plans : plans.filter(p => p.category === selectedPlanTab);

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#030307] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-24">
      {/* Background Ambient Glow & Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/12 rounded-full blur-[160px]"></div>
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-600/12 rounded-full blur-[170px]"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[40vw] h-[40vw] bg-violet-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* ================================================================== */}
        {/* 1. Transparent Affiliate & Editorial Disclosure Notice */}
        {/* ================================================================== */}
        <div className="mb-10 bg-purple-950/30 border border-purple-500/20 rounded-2xl p-4 md:p-5 flex items-start gap-4 backdrop-blur-md shadow-lg">
          <Info className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
          <div className="text-xs md:text-sm text-neutral-300 leading-relaxed">
            <span className="font-bold text-purple-300 mr-1.5">{t.publicPages.partnerDisclosure}</span>
            Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code <code className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded font-mono font-bold text-xs">{REFERRAL_CODE}</code>, you receive an exclusive <strong className="text-white font-semibold">20% additional discount</strong> on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. Hero Section: High-Impact Cyber / Glassmorphism Masterpiece */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Safi Academy Verified Partner • 20% Off Code: {REFERRAL_CODE}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Ultra-Fast NVMe Cloud & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
                Next-Gen Web Hosting
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl">
              Power your websites, web applications, and digital business on world-class infrastructure. Equipped with <strong className="text-white font-semibold">{t.publicPages.liteSpeedServers}</strong>, enterprise-grade NVMe SSDs, 99.9% uptime SLA, global Cloudflare CDN, and autonomous AI site-building agents.
            </p>

            {/* Key Value Pill Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{isRtl ? "وب‌سرور پرسرعت LiteSpeed Enterprise و کش اختصاصی" : "LiteSpeed Enterprise & LSCache Included"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{isRtl ? "دامنه رایگان یک‌ساله و گواهی SSL نامحدود" : "Free 1-Year Domain & Lifetime Free SSL"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{isRtl ? "بکاپ‌گیری خودکار روزانه و هفتگی در فضای ابری" : "Automated Daily & Weekly Backups"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>

            {/* Interactive Coupon Code Box */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-3 bg-[#0d0d16] border border-purple-500/30 rounded-2xl p-2.5 sm:p-3 backdrop-blur-md">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Partner Code:</span>
                  <span className="font-mono text-sm sm:text-base font-black text-purple-300 tracking-wider">
                    {REFERRAL_CODE}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-300" />
                      <span>Copied! 20% Applied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={REFERRAL_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_30px_rgba(147,51,234,0.35)] hover:shadow-[0_15px_45px_rgba(147,51,234,0.55)] group"
              >
                <span>Claim 20% Discount with Partner Link</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>

              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
              >
                <span>Compare Plans</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero Visual: Live Telemetry Performance HUD Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#0a0a14]/90 border border-purple-500/25 rounded-3xl p-6 md:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
                <div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">
                    Hostinger Cloud Telemetry
                  </span>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    NVMe Tier-3 Infrastructure
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 99.99% Live
                </span>
              </div>

              {/* Real-Time Metric Tiles */}
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Server Response (TTFB)</div>
                      <div className="text-[11px] text-neutral-400">LiteSpeed Optimized</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    142 ms
                  </span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Global Edge Network</div>
                      <div className="text-[11px] text-neutral-400">Cloudflare Enterprise CDN</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                    150+ PoPs
                  </span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Active Cyber Defense</div>
                      <div className="text-[11px] text-neutral-400">Monarx & WAF Real-Time</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Storage Architecture</div>
                      <div className="text-[11px] text-neutral-400">Enterprise NVMe (RAID-10)</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Ultra NVMe
                  </span>
                </div>
              </div>

              {/* Bottom Card Guarantee Notice */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1 text-purple-300 font-semibold">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  30-Day Money-Back Guarantee
                </span>
                <span className="text-neutral-500">24/7 Live Chat</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. Hosting Plan Comparison Matrix (The Core Plans) */}
        {/* ================================================================== */}
        <div id="plans" className="mb-32 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-3">
              Transparent Pricing & Architecture
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Choose the Perfect Hosting Plan
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              Every plan includes LiteSpeed server technology, SSL certificates, and 24/7 support. Use our verified partner link to save up to 75% plus an extra 20% off.
            </p>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-6 rounded-full"></div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: "all", label: "All Plans" },
                { id: "web", label: "Web Hosting" },
                { id: "cloud", label: "Cloud Hosting" },
                { id: "vps", label: "KVM VPS" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPlanTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPlanTab === tab.id
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className={`bg-[#0a0a14] border ${plan.accent} rounded-3xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1.5`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-[11px] font-black uppercase tracking-wider text-white shadow-lg shadow-purple-600/40">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest block mb-1">
                      {plan.category.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-neutral-400 mt-2 min-h-[36px]">{plan.tagline}</p>
                  </div>

                  <div className="py-4 border-y border-white/10 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-xs text-neutral-400">{plan.period}</span>
                    </div>
                    <div className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-[11px] font-bold text-emerald-300">
                      {plan.savings}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Included Architecture:
                    </div>
                    {plan.specs.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">{s.label}:</strong> {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href={REFERRAL_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[10px] text-center text-neutral-500 mt-2.5">
                    Code <span className="text-purple-300 font-mono font-bold">{REFERRAL_CODE}</span> applied
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 4. Deep-Dive: 10 Core Hostinger Services (Rich Information) */}
        {/* ================================================================== */}
        <div id="services" className="mb-32 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-3">
              Full Ecosystem Overview
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              10 Core Services Powering Your Web Vision
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              Explore Hostinger's comprehensive suite of web hosting, dedicated cloud instances, developer tools, AI agents, and marketing microservices.
            </p>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[#0a0a14]/80 border border-white/10 hover:border-purple-500/40 rounded-3xl p-7 md:p-8 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-purple-600/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300 p-3">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                      {service.shortDesc}
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {service.longDesc}
                    </p>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-6">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                        Key Architectural Features:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.specs.map((item, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400">Promo Code: {REFERRAL_CODE}</span>
                    <a
                      href={REFERRAL_LINK}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-300 transition-colors group/link"
                    >
                      <span>Get Started with {service.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 5. Architectural Deep-Dive (Why Hostinger Leads the Market) */}
        {/* ================================================================== */}
        <div className="bg-gradient-to-br from-[#0c0a18] via-[#080710] to-[#040409] border border-purple-500/20 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-32">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-3">
              Engineering & Performance Standards
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              Why Hostinger Beats Legacy Hosting Providers
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              From hardware-level NVMe storage to custom server caching, Hostinger is built from the ground up for superior speed, enhanced security, and streamlined developer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {architectureHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-start p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all hover:bg-white/[0.05]"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full mb-3">
                    {item.metric}
                  </span>
                  <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 6. Step-by-Step Launch Blueprint */}
        {/* ================================================================== */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-3">
              Execution Roadmap
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              How to Launch Your Website in 4 Steps
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              A rapid, step-by-step roadmap to get your website or cloud app live online today with your 20% discount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {launchSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a14] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-purple-500/30 transition-colors"
              >
                <div className="text-3xl font-black text-purple-500/30 mb-4 font-mono">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-semibold">
                  <span>Phase {step.step}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 7. Comprehensive FAQ (Interactive Accordion) */}
        {/* ================================================================== */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-3">
              Got Questions?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-neutral-400 text-sm">
              Everything you need to know about pricing, free domains, site migration, and discounts.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-purple-500/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white flex items-start gap-3">
                      <span className="text-purple-400 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
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

        {/* ================================================================== */}
        {/* 8. Grand Finale CTA Banner & Money-Back Guarantee */}
        {/* ================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-[#0e0c1f] via-[#110d24] to-[#080612] border border-purple-500/30 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-18 h-18 rounded-3xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 p-4 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Special Referral Code: {REFERRAL_CODE}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-3xl leading-tight">
            Ready to Build Your Website or Cloud Architecture?
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
            Join over 3,000,000 creators, developers, and entrepreneurs worldwide. Use Safi Academy's official partner link to apply your 20% discount automatically and get your free domain today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={REFERRAL_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_40px_rgba(147,51,234,0.45)] hover:shadow-[0_15px_50px_rgba(147,51,234,0.65)] group/btn"
            >
              <span>Get Started with 20% Off</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>

            <Link
              href={`/${currentLocale}/courses`}
              className="inline-flex items-center justify-center gap-2 px-7 py-5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-2xl border border-white/10 transition-colors"
            >
              <span>Explore Coding Courses</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              30-Day Unconditional Money-Back Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Instant Cloud Account Activation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              24/7 Priority Chat Assistance
            </span>
          </div>

          <p className="text-[11px] text-neutral-500 mt-6 max-w-lg">
            * Hostinger is an independent cloud hosting provider. Promotional discounts, domain availability, and renewal terms are managed directly by Hostinger.
          </p>
        </motion.div>
      </div>
    </main>
  );
}