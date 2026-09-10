"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", title: "1. Acceptance of Terms", icon: Scale },
    { id: "scope", title: "2. Nature of Services", icon: BookOpen },
    { id: "disclaimer", title: "3. No Legal/Tax Advice", icon: ShieldAlert, isWarning: true },
    { id: "affiliates", title: "4. Third-Party & Affiliates", icon: Share2, isHighlight: true },
    { id: "accounts", title: "5. Accounts & Gamification", icon: UserCheck },
    { id: "ip", title: "6. Intellectual Property", icon: Award },
    { id: "payments", title: "7. Payments & Subscriptions", icon: CreditCard },
    { id: "liability", title: "8. Limitation of Liability", icon: AlertCircle },
    { id: "governing-law", title: "9. Governing Law & Courts", icon: Gavel },
    { id: "contact", title: "10. Legal Inquiries", icon: Mail },
  ];

  const highlights = [
    {
      title: "Strictly Educational",
      desc: "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
      icon: ShieldAlert,
      badge: "Crucial Notice"
    },
    {
      title: "Affiliate Transparency",
      desc: "Disclosing independent referral partnerships with providers like Registered Agents Inc.",
      icon: Share2,
      badge: "FTC Compliant"
    },
    {
      title: "Protected Academy IP",
      desc: "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.",
      icon: Award,
      badge: "Protected Assets"
    },
    {
      title: "Fair Gamification",
      desc: "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.",
      icon: Sparkles,
      badge: "Ecosystem Rules"
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
    <main className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32">
      
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
            <Scale size={14} className="animate-pulse" /> Official Terms & User Agreement
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Terms of Service & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600">
              User Agreement
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed"
          >
            These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.
          </motion.p>

          {/* Metadata Pill Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-neutral-900/80 border border-white/10 rounded-2xl text-xs text-neutral-300 backdrop-blur-md"
          >
            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">Entity: Safi International Capital LTD</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">Reg: 17063286 (UK)</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 font-medium">Jurisdiction: England & Wales</span>
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
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Navigation Index</span>
                <span className="text-[11px] font-mono text-neutral-500">10 Sections</span>
              </div>

              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                        isActive 
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
                <Gavel className="w-4 h-4 text-yellow-500" /> Need Legal Clarification?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.
              </p>
              <a
                href="mailto:support@safi-academy.com"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-yellow-400 transition-colors"
              >
                <span>Contact Legal Department</span>
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
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 1</span>
                  <h2 className="text-2xl font-black text-white">Acceptance of Terms & Corporate Entity</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                These Terms of Service ("Terms") constitute a legally binding agreement entered into between you and <strong>Safi International Capital LTD</strong>, governing your use of the website, learning management tools, video masterclasses, and services offered under <strong>Safi Academy</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Operating Entity</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Company Number</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Official Headquarters</span>
                  <span className="text-neutral-300">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</span>
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
                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 2</span>
                  <h2 className="text-2xl font-black text-white">Scope of Academy Services</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                Safi Academy is an online educational institution dedicated to teaching software development, global e-commerce, digital marketing, corporate setup basics, and technology careers.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Services provided include interactive lessons, video curriculum, student discussion forums, practice quizzes, gamification badges, and curated recommendations of external tools that assist founders with practical business execution.
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
                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider block">Section 3 • Essential Disclaimer</span>
                  <h2 className="text-2xl font-black text-white">No Legal, Tax, or Financial Advice</h2>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-red-500/20 text-xs md:text-sm text-neutral-300 space-y-3">
                <p className="font-bold text-white leading-relaxed">
                  Safi Academy and Safi International Capital LTD are strictly educational entities. We are NOT a law firm, licensed legal counsel, Certified Public Accountant (CPA) firm, financial broker, or licensed registered agent.
                </p>
                <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                  <li>Any training, templates, or articles addressing US LLCs, corporations, registered agent services, state filing requirements, or taxes are provided exclusively for general informational and educational illustration.</li>
                  <li>State laws, federal tax duties (including IRS filings and FinCEN Beneficial Ownership Information reports), and commercial regulations differ significantly across jurisdictions.</li>
                  <li>You are solely responsible for conducting due diligence and consulting licensed attorneys or certified financial accountants prior to forming an entity or signing binding agreements.</li>
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
                  <div className="text-xs text-neutral-500 uppercase font-mono mb-1">Corporate Legal Email</div>
                  <div className="text-base font-bold text-white font-mono">support@safi-academy.com</div>
                </div>
                <a
                  href="mailto:support@safi-academy.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Legal Team</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}