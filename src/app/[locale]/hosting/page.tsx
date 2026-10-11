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
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

import { getHostingTranslation } from "@/utils/hostingTranslations";

// ============================================================================
// OFFICIAL PARTNER & REFERRAL CONFIGURATION
// Verified Safi Academy Hostinger Referral Link & Partner Code
// ============================================================================
const REFERRAL_LINK = "https://www.hostinger.com/?REFERRALCODE=89LSHAHEEKCO";
const REFERRAL_CODE = "89LSHAHEEKCO";

export default function HostingerAffiliatePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const ht = getHostingTranslation(currentLocale);
  const isRtl = ht.isRtl;
  const [copied, setCopied] = useState(false);
  const [selectedPlanTab, setSelectedPlanTab] = useState<"all" | "web" | "cloud" | "vps">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const SERVICE_ICONS: Record<string, any> = {
    "web-hosting": Server,
    "cloud-hosting": Cloud,
    "vps-hosting": HardDrive,
    "agency-hosting": Briefcase,
    "ai-website-builder": LayoutTemplate,
    "hostinger-horizons": Globe,
    "business-email": Mail,
    "reach-email": Send,
    "managed-openclaw": Cpu,
    "ai-agents": Sparkles,
  };

  const ARCH_ICONS = [Zap, Globe, ShieldCheck, Sliders, RefreshCw, Terminal];
  const PLAN_ACCENTS = [
    "border-white/10",
    "border-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.3)]",
    "border-indigo-500/50",
    "border-blue-500/40"
  ];

  const services = ht.services.map((s) => ({
    ...s,
    icon: SERVICE_ICONS[s.id] || Server
  }));

  const plans = ht.plans.map((p, idx) => ({
    ...p,
    accent: PLAN_ACCENTS[idx] || "border-white/10"
  }));

  const architectureHighlights = ht.architectureHighlights.map((a, idx) => ({
    ...a,
    icon: ARCH_ICONS[idx] || Zap
  }));

  const launchSteps = ht.launchSteps;
  const faqs = ht.faqs;

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
            <span className="font-bold text-purple-300 mr-1.5">{ht.partnerDisclosureBadge}</span>
            {ht.disclosure}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. Hero Section: High-Impact Cyber / Glassmorphism Masterpiece */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>{ht.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {ht.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl">
              {ht.heroSubtitle}
            </p>

            {/* Key Value Pill Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{ht.pill1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{ht.pill2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{ht.pill3}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{ht.pill4}</span>
              </div>
            </div>

            {/* Interactive Coupon Code Box */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-3 bg-[#0d0d16] border border-purple-500/30 rounded-2xl p-2.5 sm:p-3 backdrop-blur-md">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{ht.partnerCodeLabel}</span>
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
                      <span>{ht.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{ht.copyCodeBtn}</span>
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
                <span>{ht.claimDiscountBtn}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>

              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
              >
                <span>{ht.comparePlansBtn}</span>
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
                    {ht.telemetryTitle}
                  </span>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    {ht.telemetrySubtitle}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {ht.telemetryLive}
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
                      <div className="text-xs font-bold text-white">{ht.metricTtfb}</div>
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
                      <div className="text-xs font-bold text-white">{ht.metricCdn}</div>
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
                      <div className="text-xs font-bold text-white">{ht.metricUptime}</div>
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
                      <div className="text-xs font-bold text-white">{ht.metricAi}</div>
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
              {ht.plansBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {ht.plansTitle}
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              {ht.plansSubtitle}
            </p>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-6 rounded-full"></div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: "all", label: ht.planFilterAll },
                { id: "web", label: ht.planFilterWeb },
                { id: "cloud", label: ht.planFilterCloud },
                { id: "vps", label: ht.planFilterVps }
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
              {ht.servicesBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {ht.servicesTitle}
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              {ht.servicesSubtitle}
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
              {ht.archBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              {ht.archTitle}
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {ht.archSubtitle}
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
              {ht.stepsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {ht.stepsTitle}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              {ht.stepsSubtitle}
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
              {ht.faqsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {ht.faqsTitle}
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
        {/* NATIVE AD BANNER (CLOUD HOSTING SPONSOR) */}
        {/* ================================================================== */}
        <AdsterraNativeBanner
          category="Web Hosting, Cloud VPS & Domain Infrastructure"
          keywords="hostinger, cloud vps, web hosting, dedicated servers, domain names, ssl certificate, cpanel"
          badgeLabel="Cloud Infrastructure Partner"
        />

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