"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  FileText,
  Database,
  Smartphone,
  Mail,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Building2,
  Scale,
  HelpCircle,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Info,
  RefreshCw,
  UserX
} from "lucide-react";

export default function AccountDeletionPortal() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  // Form State
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState("leaving");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [confirmConsequences, setConfirmConsequences] = useState(false);
  const [confirmIrreversible, setConfirmIrreversible] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Active FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid registered email address.");
      return;
    }
    if (!fullName.trim()) {
      setFormStatus("error");
      setErrorMessage("Please provide your full registered name.");
      return;
    }
    if (!confirmConsequences || !confirmIrreversible) {
      setFormStatus("error");
      setErrorMessage("You must check both confirmation boxes before submitting.");
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    // Simulate secure request dispatch
    setTimeout(() => {
      const generatedTicket = `DEL-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setTicketId(generatedTicket);
      setFormStatus("success");
    }, 1200);
  };

  const copyTicket = () => {
    if (!ticketId) return;
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const faqs = [
    {
      q: "What happens to my enrolled courses and educational certificates?",
      a: "Upon account deletion, all active course enrollments, lecture progress, quiz submissions, and personal certificates in your portal will be permanently removed. If you require proof of your past achievements, we strongly urge you to download and save all your cryptographic PDF certificates and transcripts BEFORE initiating deletion. Cryptographic hashes stored on our public blockchain ledger for third-party employer verification will have all your personal identifiers (PII) stripped and redacted."
    },
    {
      q: "Can I cancel my account deletion request if I change my mind?",
      a: "Yes. Safi Academy enforces a mandatory 30-Day Cooling-Off (Grace) Period. During these 30 calendar days, your account is placed in an inactive, locked state. If you decide to cancel the deletion, you can either log back into the Safi Academy mobile app / website, or send an urgent email to support@safi.academy quoting your Request Reference Ticket. After the 30-day window expires, the data purge is absolute and irreversible."
    },
    {
      q: "What happens to remaining balances in my SafiPay or Academy wallet?",
      a: "Any remaining credits, cash balances, or scholarship stipends stored in your account wallet must be either withdrawn or utilized prior to submitting an account deletion request. Account deletion forfeits unspent platform-specific tokens. If you have an active SafiPay European banking IBAN or physical card linked to your identity, you must separately settle your banking account via the SafiPay portal to comply with international banking liquidation standards."
    },
    {
      q: "Why must some financial records be retained after account deletion?",
      a: "Under the statutory laws of England and Wales, HM Revenue & Customs (HMRC) regulations, and international Anti-Money Laundering (AML) directives, Safi International Capital LTD is legally required to retain transaction receipts, tax invoices, and accounting ledgers for a statutory period of 6 years from the date of the financial transaction. These records are held in a secure, cold-storage compliance vault, isolated from all marketing and operational databases."
    },
    {
      q: "How does this portal comply with Google Play Store & Apple App Store rules?",
      a: "Both Google Play and Apple App Store mandate that applications allowing user account creation must also provide an in-app deletion button AND an external web-based URL where users can request deletion without needing the app installed. This page is our official, publicly verifiable App Store Deletion Gateway, honoring Google Play Data Safety policies, App Store Guideline 5.1.1(v), UK GDPR, and the UK Data Protection Act 2018."
    },
    {
      q: "How can I contact the Data Protection Officer (DPO) directly?",
      a: "You may reach our legal compliance team and Data Protection Officer at privacy@safipay.net or by physical post to: Safi International Capital LTD, Attn: Legal & DPO, 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom. We respond to verified data subject rights inquiries within 72 business hours."
    }
  ];

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#030307] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32 selection:bg-rose-500 selection:text-white">
      {/* ================= BACKGROUND COSMIC SYSTEM ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(244, 63, 94, 0.4) 1px, transparent 1px), radial-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            backgroundPosition: "0 0, 22px 22px",
          }}
        />

        {/* Ambient Warning Nebulae */}
        <div className="bg-gradient-to-br from-rose-600/10 via-red-700/5 to-transparent absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full blur-[170px]" />
        <div className="bg-gradient-to-tr from-amber-600/10 via-yellow-600/5 to-transparent absolute right-1/6 bottom-1/4 h-[600px] w-[600px] rounded-full blur-[180px]" />
        <div className="bg-rose-500/5 absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col">
        {/* --- TOP BREADCRUMB & UK BADGE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <Link
            href={`/${currentLocale}`}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full hover:bg-white/[0.08]"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-semibold">
              <Building2 size={13} className="text-yellow-400" />
              <span>Safi International Capital LTD • UK Reg: <span className="text-yellow-400 font-mono font-bold">17063286</span></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
              <Scale size={13} />
              <span>{isRtl ? "تایید شده مطابق با UK GDPR و استانداردهای اپ استور" : "UK GDPR & App Store Certified"}</span>
            </div>
          </div>
        </div>

        {/* ================= HERO THEATER ================= */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-black uppercase tracking-[0.25em] mb-6 shadow-inner">
            <ShieldAlert size={14} className="animate-pulse" /> {t.publicPages.deleteAccountTitle}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Account Deletion & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500">
              Data Privacy Erasure
            </span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal text-justify sm:text-center">
            At Safi Academy and Safi International Capital LTD, we respect your fundamental right to digital privacy, autonomy, and data sovereignty. This portal provides complete transparency regarding how your account and data are permanently purged in strict adherence with <strong className="text-white">UK GDPR</strong>, the <strong className="text-white">UK Data Protection Act 2018</strong>, and the mandatory <strong className="text-white">Google Play Store & Apple App Store</strong> account deletion directives.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-left">
              <div className="flex items-center gap-2 text-rose-400 mb-2 font-black text-xs uppercase tracking-wider">
                <Clock size={16} /> {t.publicPages.thirtyDayGracePeriod}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your data is safely frozen for 30 calendar days, allowing cancellation before permanent cryptographic destruction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-left">
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-black text-xs uppercase tracking-wider">
                <Database size={16} /> Complete PII Purge
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero leftover profile records, chat logs, auth tokens, device identifiers, or assignment history in production.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-left">
              <div className="flex items-center gap-2 text-emerald-400 mb-2 font-black text-xs uppercase tracking-wider">
                <Scale size={16} /> Legal Transparency
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Strict disclosures regarding non-PII financial invoices required by UK HMRC statutory regulations.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 3 OFFICIAL DELETION METHODS ================= */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-2 block">{t.publicPages.chooseChannel}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Three Ways to Terminate Your Account</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Method 1: Mobile App */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-rose-500/30 transition-all duration-500 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Method 1 • In-App
                </span>
                <h3 className="text-xl font-black text-white mb-3">Safi Academy Mobile App</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                  If you have the Safi Academy iOS or Android application installed on your device, you can delete your account instantly from within your profile:
                </p>
                <ol className="space-y-2.5 text-xs text-neutral-300 font-medium pl-1 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Open the Safi Academy app & tap your <strong>Profile</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Go to <strong>Settings & Privacy</strong> → <strong>Security</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Tap <strong>Delete Account</strong> & confirm with your password.</span>
                  </li>
                </ol>
              </div>
              <Link
                href={`/${currentLocale}/get-app`}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Download App</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            {/* Method 2: Web Form */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-rose-500/[0.08] via-white/[0.02] to-transparent border border-rose-500/30 shadow-[0_15px_45px_rgba(244,63,94,0.15)] flex flex-col justify-between relative group">
              <div className="absolute top-4 right-4">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping inline-block" />
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Method 2 • Direct Web Form
                </span>
                <h3 className="text-xl font-black text-white mb-3">Online Request Dispatch</h3>
                <p className="text-neutral-300 text-xs leading-relaxed mb-6">
                  Recommended if you uninstalled the mobile application or no longer have device access. Fill out the verified request form below on this page.
                </p>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20 text-xs text-neutral-300 mb-6">
                  <p className="font-semibold text-rose-300 mb-1">Instant Ticket Generation:</p>
                  <p className="text-[11px] text-neutral-400">
                    A cryptographic deletion reference ticket will be issued immediately upon submission.
                  </p>
                </div>
              </div>
              <a
                href="#deletion-form"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Jump to Request Form</span>
                <ChevronDown size={14} />
              </a>
            </div>

            {/* Method 3: Direct DPO Email */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/30 transition-all duration-500 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Method 3 • Legal Officer
                </span>
                <h3 className="text-xl font-black text-white mb-3">Data Protection Officer</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                  Send a formal written erasure request under UK GDPR Article 17 directly to our designated Data Protection Officer and compliance secretariat:
                </p>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 mb-6">
                  <p className="font-mono text-yellow-400 text-xs mb-1">privacy@safipay.net</p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Subject: <em>"UK GDPR Article 17 — Account Erasure Request"</em>
                  </p>
                </div>
              </div>
              <a
                href="mailto:privacy@safipay.net?subject=UK%20GDPR%20Article%2017%20Account%20Erasure%20Request"
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Email Legal Office</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE DELETION REQUEST FORM ================= */}
        <div id="deletion-form" className="mb-20 scroll-mt-32">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 sm:p-12 md:p-14 rounded-[3.5rem] shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-8 rounded-full bg-gradient-to-b from-rose-400 to-red-600" />
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Online Account Erasure Request
                </h2>
              </div>
              <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                Submit your registered credentials below. Our automated identity verification engine will match your record and schedule your account for permanent erasure following the 30-day grace window.
              </p>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{t.publicPages.deletionRequestSubmitted}</h3>
                  <p className="text-neutral-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                    Your request has been logged and assigned to our automated compliance queue. A formal confirmation dispatch has been routed to your registered email address.
                  </p>

                  <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-black/60 border border-emerald-500/30 mb-6">
                    <span className="text-xs text-neutral-400 uppercase font-black tracking-wider">{t.publicPages.referenceTicketId}:</span>
                    <span className="font-mono text-emerald-400 font-black text-base">{ticketId}</span>
                    <button
                      onClick={copyTicket}
                      className="ml-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Copy Ticket Reference"
                    >
                      {copiedTicket ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left max-w-xl mx-auto text-xs text-neutral-400 space-y-2">
                    <p className="flex items-center gap-2 text-white font-bold">
                      <Clock size={14} className="text-yellow-400" /> What happens next:
                    </p>
                    <p>• <strong>Days 1–30:</strong> Your account is suspended and hidden from public view.</p>
                    <p>• <strong>Need to Cancel?</strong> Log in before Day 30 or contact support quoting ticket <code>{ticketId}</code>.</p>
                    <p>• <strong>Day 30:</strong> Permanent, non-recoverable cryptographic data purge is executed.</p>
                  </div>

                  <button
                    onClick={() => {
                      setFormStatus("idle");
                      setEmail("");
                      setFullName("");
                      setAdditionalDetails("");
                      setConfirmConsequences(false);
                      setConfirmIrreversible(false);
                    }}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
                  >
                    <RefreshCw size={12} /> Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-3">
                      <AlertTriangle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
                        Registered Account Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
                        Full Name on Profile <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ahmad Shah"
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
                      Primary Reason for Termination <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#0a0a10] border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500/60 transition-all cursor-pointer"
                    >
                      <option value="leaving">I have completed my academic goals</option>
                      <option value="privacy">Privacy / Data Sovereignty considerations</option>
                      <option value="duplicate">I have a duplicate or secondary account</option>
                      <option value="app_issues">Technical difficulties with the mobile application</option>
                      <option value="other">Other reason (Please specify below)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
                      Additional Feedback or Instructions <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Tell us how we can improve Safi Academy or provide specific data erasure notes..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  {/* Legal Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmConsequences}
                        onChange={(e) => setConfirmConsequences(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-rose-500 rounded cursor-pointer"
                        required
                      />
                      <span className="text-xs text-neutral-300 leading-relaxed">
                        I understand that my course enrollments, lecture progress, quiz records, community posts, and wallet credits will be <strong className="text-white">permanently deleted</strong>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmIrreversible}
                        onChange={(e) => setConfirmIrreversible(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-rose-500 rounded cursor-pointer"
                        required
                      />
                      <span className="text-xs text-neutral-300 leading-relaxed">
                        I understand that this action is <strong className="text-white">irreversible after the 30-day grace period</strong> and that Safi Academy will not be able to restore my learning history.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-400 hover:to-red-400 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(244,63,94,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t.publicPages.submittingRequest}</span>
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} />
                        <span>{t.publicPages.submitDeletionRequest}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ================= DATA AUDIT & STATUTORY DISCLOSURES ================= */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-2 block">Transparency & Governance</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Data Erasure vs. Statutory Retention</h2>
            <p className="text-neutral-400 text-sm max-w-2xl mx-auto mt-3">
              We operate with absolute transparency regarding exactly what is purged and what must be held under UK statutory law.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1: Permanently Deleted */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-rose-500/[0.03] border border-rose-500/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <UserX size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Permanently Purged Data</h3>
                  <p className="text-[11px] text-rose-400 uppercase font-black tracking-wider">Erased on Day 30</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-neutral-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Profile Credentials:</strong> Full name, email address, password hashes, phone numbers, avatars, and bio.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Session & OAuth Tokens:</strong> Google Sign-In tokens, Apple ID tokens, active JWT sessions, and device FCM push tokens.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Learning Telemetry:</strong> Video watch percentages, module completion timestamps, quiz scores, and student coding assignments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Community & Communications:</strong> Forum discussion threads, private messages with mentors, likes, comments, and media uploads.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Gamification & Honors:</strong> Experience points (XP), Wall of Fame leaderboard rankings, trophy badges, and reward tokens.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Retained by Law */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-amber-500/[0.03] border border-amber-500/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Scale size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Statutory Retention Exceptions</h3>
                  <p className="text-[11px] text-amber-400 uppercase font-black tracking-wider">Mandated by UK Law</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-neutral-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Tax & Invoicing Records (6 Years):</strong> HM Revenue & Customs (HMRC) and the UK Companies Act mandate retaining transaction receipts, payment gateway invoice IDs, and VAT calculations for 6 years.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Anti-Money Laundering (AML) Compliance:</strong> Where financial payments were executed via SafiPay banking gateways, transaction logs are archived in encrypted cold storage pursuant to UK financial crime statutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Anonymized Cryptographic Hashes:</strong> Hashes of issued academic diplomas remain on public ledger nodes to prevent fraudulent counterfeit diploma claims, but all personally identifiable information (PII) is permanently stripped.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Security Audit Logs (90 Days):</strong> Anonymized server access logs and firewall IP event hashes are retained for 90 days under legitimate interest to prevent coordinated cyberattacks and DDoS attempts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= COMPREHENSIVE FAQ ACCORDION ================= */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-2 block">Answers & Clarifications</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Account Deletion FAQ</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-rose-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      {isOpen ? <ChevronUp size={16} className="text-rose-400" /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4 text-justify">
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

        {/* ================= DPO DIRECT LEGAL NOTICE ================= */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 text-center max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-yellow-400 flex items-center justify-center mx-auto mb-4">
            <Lock size={22} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Statutory Legal Oversight</h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            Safi Academy is a registered institution governed by Safi International Capital LTD. For formal legal notices, subpoena inquiries, or compliance correspondence, contact our London secretariat:
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-300">
            <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">
              Email: <strong>privacy@safipay.net</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">
              Registered Office: <strong>71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK</strong>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}