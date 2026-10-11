"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { getTermsTranslation } from "@/utils/termsTranslations";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Scale,
  CheckCircle,
  FileText,
  AlertCircle,
  BookOpen,
  Share2,
  ShieldAlert,
  CreditCard,
  Gavel,
  ExternalLink,
  Award,
  Mail,
  Building2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Check,
  Lock,
  UserCheck
} from "lucide-react";

export default function TermsOfServicePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const tm = getTermsTranslation(currentLocale);
  const isRtl = tm.isRtl;
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", title: tm.sections[0].title, icon: Scale },
    { id: "scope", title: tm.sections[1].title, icon: BookOpen },
    { id: "disclaimer", title: tm.sections[2].title, icon: ShieldAlert, isWarning: true },
    { id: "affiliates", title: tm.sections[3].title, icon: Share2, isHighlight: true },
    { id: "accounts", title: tm.sections[4].title, icon: UserCheck },
    { id: "ip", title: tm.sections[5].title, icon: Award },
    { id: "payments", title: tm.sections[6].title, icon: CreditCard },
    { id: "liability", title: tm.sections[7].title, icon: AlertCircle },
    { id: "governing-law", title: tm.sections[8].title, icon: Gavel },
    { id: "contact", title: tm.sections[9].title, icon: Mail },
  ];

  const highlights = [
    {
      title: tm.highlights[0].title,
      desc: tm.highlights[0].desc,
      icon: ShieldAlert,
      badge: tm.highlights[0].badge
    },
    {
      title: tm.highlights[1].title,
      desc: tm.highlights[1].desc,
      icon: Share2,
      badge: tm.highlights[1].badge
    },
    {
      title: tm.highlights[2].title,
      desc: tm.highlights[2].desc,
      icon: Award,
      badge: tm.highlights[2].badge
    },
    {
      title: tm.highlights[3].title,
      desc: tm.highlights[3].desc,
      icon: Sparkles,
      badge: tm.highlights[3].badge
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32">

      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-[-5%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[45vw] h-[45vw] bg-yellow-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Top Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-yellow-500 mb-6"
          >
            <Scale size={14} className="animate-pulse" /> {tm.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6"
          >
            {tm.heroTitleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600">
              {tm.heroTitleLine2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed"
          >
            {tm.heroSub}
          </motion.p>

          {/* Metadata Pill Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-neutral-900/80 border border-white/10 rounded-2xl text-xs text-neutral-300 backdrop-blur-md"
          >
            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">{tm.entityLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">{tm.regLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 font-medium">{tm.jurisdictionLabel}</span>
          </motion.div>
        </div>

        {/* Bento Grid: 4 Pillars of Terms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="bg-neutral-900/60 border border-white/5 hover:border-amber-500/30 p-6 rounded-3xl backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" /> {item.badge}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2-Column Split: Sticky Sidebar TOC + Modular Terms Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Sidebar: Navigation & Contact Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">

            {/* Table of Contents Card */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">{tm.tocTitle}</span>
                <span className="text-[11px] font-mono text-neutral-500">{tm.tocCount}</span>
              </div>

              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${isActive
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black"
                        : sec.isWarning
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                          : sec.isHighlight
                            ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{sec.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "opacity-100" : "opacity-40"}`} />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Legal Help Box */}
            <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Gavel className="w-4 h-4 text-yellow-500" /> {tm.legalHelp.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {tm.legalHelp.desc}
              </p>
              <a
                href="mailto:contact@safiacademy.org"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-yellow-400 transition-colors"
              >
                <span>{tm.legalHelp.btn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Modular Content Cards */}
          <div className="lg:col-span-8 space-y-8">

            {/* Section 1: Acceptance of Terms */}
            <div id="agreement" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">{tm.section1.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section1.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {tm.section1.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.opEntityLabel}</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.companyNumLabel}</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.hqLabel}</span>
                  <span className="text-neutral-300">{tm.section1.hqValue}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Nature of Services */}
            <div id="scope" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">{tm.section2.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section2.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                {tm.section2.p1}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {tm.section2.p2}
              </p>
            </div>

            {/* Section 3: No Legal/Tax Advice Disclaimer (Crucial Callout) */}
            <div id="disclaimer" className="scroll-mt-36 bg-gradient-to-br from-red-500/[0.08] via-neutral-900/80 to-neutral-900/90 border border-red-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider block">{tm.section3.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section3.title}</h2>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-red-500/20 text-xs md:text-sm text-neutral-300 space-y-3">
                <p className="font-bold text-white leading-relaxed">
                  {tm.section3.alert}
                </p>
                <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                  {tm.section3.bullets.map((bullet, bidx) => (
                    <li key={bidx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4: Third-Party & Affiliates (Registered Agents Inc Spotlight) */}
            <div id="affiliates" className="scroll-mt-36 bg-gradient-to-br from-amber-500/[0.08] via-neutral-900/80 to-neutral-900/90 border border-amber-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">Section 4 • Third-Party Relations</span>
                    <h2 className="text-2xl font-black text-white">Third-Party Services & Affiliate Disclosures</h2>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  Partner Referral Terms
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                To help founders implement the principles taught in our academy, we showcase vetted third-party infrastructure providers. On our US Business Formation pages, we recommend <strong className="text-white">Registered Agents Inc</strong> for US registered agent representation, entity formation, and corporate filings.
              </p>

              <div className="space-y-4 text-xs md:text-sm text-neutral-300">
                <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    Key Operating Rules for Recommended Third Parties:
                  </h4>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                    <li><strong className="text-white">Affiliate Compensation:</strong> Safi Academy participates in referral and affiliate programs (including Registered Agents Inc and AWIN). We may receive a referral commission when you purchase services via our referral links. This does not increase the price you pay.</li>
                    <li><strong className="text-white">Independent Entities:</strong> Third parties (including Registered Agents Inc) are independent businesses. Safi Academy does not control, supervise, or own their internal operations or filing processes.</li>
                    <li><strong className="text-white">Third-Party Client Agreement:</strong> Any contract you enter into for registered agent or formation services is solely between you and Registered Agents Inc, governed by the <a href="https://www.registeredagentsinc.com/client-agreement/" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold underline">Registered Agents Inc Client Agreement</a>.</li>
                    <li><strong className="text-white">Disclaimer of Vendor Liability:</strong> Safi International Capital LTD disclaims any liability for third-party filing mistakes, state rejections, processing delays, or service downtime.</li>
                  </ul>
                </div>

                {/* Google AdSense & Third-Party Advertising Network Terms */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                    Google AdSense & Digital Advertising Network Terms:
                  </h4>
                  <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                    <li><strong className="text-white">Third-Party Commercial Display:</strong> Safi Academy displays advertisements served by Google AdSense and accredited digital ad networks. We do not manufacture, guarantee, or directly endorse the specific products or services advertised by third-party sponsors.</li>
                    <li><strong className="text-white">Advertiser Interactions:</strong> Any transactions, communications, or engagements you undertake with commercial advertisers found on our platform are solely between you and the respective third-party vendor.</li>
                    <li><strong className="text-white">Ad Delivery Standards:</strong> Advertisements on Safi Academy adhere to high standards of digital decorum and are integrated natively (such as non-intrusive in-feed cards and in-reel units) to preserve student learning focus.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5: Accounts & Gamification */}
            <div id="accounts" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 5</span>
                  <h2 className="text-2xl font-black text-white">User Accounts, Security & Gamification</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                You must provide accurate, verifiable registration details and maintain the security of your password. Sharing your account credentials or facilitating unauthorized multi-user access is strictly prohibited.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-neutral-300">
                <strong className="text-white block flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Academy Points & Wall of Fame Rules
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Points, badges, and leaderboard rankings represent internal academy achievements and carry no monetary value outside of our platform. Safi Academy reserves the right to reset points or remove accounts from public leaderboards if scripted automation or abuse is detected.
                </p>
              </div>
            </div>

            {/* Section 6: Intellectual Property */}
            <div id="ip" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 6</span>
                  <h2 className="text-2xl font-black text-white">Intellectual Property & Limited License</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                All platform components—including instructional videos, code repositories, lesson syllabi, trademarks, graphics, UI assets, and downloadable resources—are the proprietary intellectual property of <strong>Safi International Capital LTD</strong>.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                You receive a limited, revocable, non-exclusive, non-transferable personal license to view course materials. You may not record, reproduce, mirror, resell, redistribute, or reverse-engineer our curriculum without prior written authorization.
              </p>
            </div>

            {/* Section 7: Payments & Subscriptions */}
            <div id="payments" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 7</span>
                  <h2 className="text-2xl font-black text-white">Payments, Subscriptions & Digital Access</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                Fees for courses, premium masterclasses, or mentorship programs are displayed before purchase. Payments are securely handled through PCI-compliant gateways (such as Stripe).
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300">
                <strong className="text-white block mb-1">Digital Content Access Policy:</strong>
                Because digital learning materials and proprietary repositories are made instantly available upon purchase, access fees are non-refundable once content has been accessed, except where required by mandatory statutory consumer protection laws.
              </div>
            </div>

            {/* Section 8: Limitation of Liability */}
            <div id="liability" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 8</span>
                  <h2 className="text-2xl font-black text-white">Limitation of Liability & Indemnity</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, in no event shall <strong>Safi International Capital LTD</strong>, its officers, directors, instructors, or affiliates be liable for any indirect, special, incidental, consequential, or punitive damages (including loss of business profits, corporate filing rejections, loss of data, or operational interruptions).
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                You agree to indemnify and hold harmless Safi International Capital LTD against any claims, liabilities, damages, or costs resulting from your breach of these Terms or your unauthorized use of the platform.
              </p>
            </div>

            {/* Section 9: Governing Law & Courts */}
            <div id="governing-law" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Gavel className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 9</span>
                  <h2 className="text-2xl font-black text-white">Governing Law & Exclusive Jurisdiction</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                These Terms of Service and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                You irrevocably submit to the exclusive jurisdiction of the courts of England and Wales to resolve any legal disputes or proceedings arising under this agreement.
              </p>
            </div>

            {/* Section 10: Legal Inquiries */}
            <div id="contact" className="scroll-mt-36 bg-neutral-900/60 border border-white/10 hover:border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 10</span>
                  <h2 className="text-2xl font-black text-white">Official Legal Correspondence</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Official notices, corporate documentation requests, and inquiries regarding these Terms should be addressed to our legal department:
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-xs text-neutral-500 uppercase font-mono mb-1">{tm.section10.emailLabel}</div>
                  <div className="text-base font-bold text-white font-mono">contact@safiacademy.org</div>
                </div>
                <a
                  href="mailto:contact@safiacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{tm.section10.btn}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5 text-xs text-neutral-400">
                <span>{tm.section10.relatedTitle}</span>
                <Link href={`/${currentLocale}/privacy-policy`} className="text-amber-400 hover:underline font-bold">
                  {tm.section10.privacyPolicy}
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/contact`} className="text-amber-400 hover:underline font-bold">
                  {tm.section10.contactUs}
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/delete-account`} className="text-rose-400 hover:underline font-bold">
                  {tm.section10.deleteAccount}
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}