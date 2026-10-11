"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Building2,
  CreditCard,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Lock,
  Layers,
  ChevronDown,
  Clock,
  HelpCircle,
  Laptop
} from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { getBankAccountServiceTranslation } from "@/utils/bankAccountServiceTranslations";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

type AccountType = "Personal" | "Business";

const currencies = ["EUR", "USD", "GBP", "AED", "CAD", "CHF", "JPY", "AUD", "SGD", "AFN"];

export default function BankAccountServicePage() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const bs = getBankAccountServiceTranslation(currentLocale);
  const isRtl = bs.isRtl;

  const partners = bs.partners;
  const faqs = bs.faqs;

  const [accountType, setAccountType] = useState<AccountType>("Personal");
  const [activePartner, setActivePartner] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    companyRegNumber: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/bank-account-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType, ...formData })
      });

      if (!response.ok) throw new Error("Request failed");

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        companyName: "",
        companyRegNumber: ""
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#030508] text-white selection:bg-amber-500/20 selection:text-amber-200 relative overflow-hidden font-sans pt-28 md:pt-36 pb-32"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] bg-gradient-to-b from-amber-500/10 via-yellow-500/5 to-transparent rounded-full blur-[160px]" />
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] bg-cyan-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <section className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-8">
              <Sparkles size={14} className="animate-pulse" />
              <span>{t.bankService?.badge || "Global Banking Infrastructure"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              {t.bankService?.heroTitle || "Banking without borders."}
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mb-10">
              {t.bankService?.heroSubtitle ||
                "A premium international-account experience designed for people and businesses operating across currencies, countries and digital markets."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#application"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{t.bankService?.startApplication || "Start Application"}</span>
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>

              <a
                href="#providers"
                className="px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white font-black uppercase tracking-wider text-xs backdrop-blur-xl transition-all flex items-center gap-2"
              >
                <span>{t.bankService?.exploreProviders || "Explore Providers"}</span>
                <Globe size={16} className="text-amber-400" />
              </a>
            </div>

            {/* Currencies Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mr-2 rtl:ml-2">
                {bs.settlementCurrencies}
              </span>
              {currencies.map((curr) => (
                <span
                  key={curr}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/8 text-[11px] font-mono font-bold text-amber-300/80 hover:text-white hover:border-amber-400/40 transition-colors"
                >
                  {curr}
                </span>
              ))}
            </div>
          </div>

          {/* 3D Visual Card Hologram */}
          <div className="relative flex justify-center items-center py-6">
            <div className="w-full max-w-md relative group">
              {/* Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-cyan-500/30 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Holographic Card */}
              <div className="relative rounded-[2.2rem] bg-gradient-to-br from-[#121622]/95 via-[#0b0e17]/95 to-[#060810]/95 border border-amber-500/30 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden">
                {/* Ambient Top Light Beam */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                      {bs.cardTitle}
                    </div>
                    <div className="text-[11px] font-semibold text-neutral-400 mt-1">
                      {bs.cardSubtitle}
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-black tracking-widest text-white shadow-inner">
                    VISA B2B
                  </div>
                </div>

                {/* Golden Electronic Smart Chip */}
                <div className="mb-8 w-14 h-11 rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 p-0.5 shadow-lg relative overflow-hidden">
                  <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border border-amber-100/50 flex flex-col justify-around p-1.5">
                    <div className="h-0.5 bg-amber-900/30 rounded" />
                    <div className="h-0.5 bg-amber-900/30 rounded" />
                    <div className="h-0.5 bg-amber-900/30 rounded" />
                  </div>
                </div>

                {/* Card Number & Details */}
                <div className="text-2xl sm:text-3xl font-mono font-bold tracking-[0.2em] text-white mb-6">
                  •••• •••• •••• 9241
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-white/10 pt-4 font-mono">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-neutral-500">{bs.cardHolderLabel}</div>
                    <div className="font-bold text-neutral-200 mt-0.5">{bs.cardHolderName}</div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="text-[9px] uppercase tracking-widest text-neutral-500">{bs.expiryLabel}</div>
                    <div className="font-bold text-neutral-200 mt-0.5">12/29</div>
                  </div>
                </div>
              </div>

              {/* Floating Live Settlement Pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 px-5 py-3.5 rounded-2xl bg-[#090d16]/95 border border-cyan-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Live SEPA / SWIFT / ACH
                  </div>
                  <div className="text-xs font-black text-white">100% Verified Clearing Rails</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* ARCHITECTURE SECTION (4 Pillars) */}
        {/* ======================================================== */}
        <section className="mb-24 lg:mb-32">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
              {t.bankService?.archBadge || "01 / Architecture"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {t.bankService?.archTitle || "A financial interface built like a product, not a form."}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.bankService?.archSubtitle ||
                "Understand what each rail provides and prepare your dossier with precision."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: Globe,
                title: "Multi-Currency Vault",
                desc: "Hold and convert major international currencies with real mid-market rates across 40+ countries without hidden fees."
              },
              {
                num: "02",
                icon: Building2,
                title: "Dedicated IBAN Rails",
                desc: "Receive dedicated local bank credentials in Europe (SEPA), United Kingdom (Faster Payments), and the US (ACH)."
              },
              {
                num: "03",
                icon: CreditCard,
                title: "Corporate & Virtual Cards",
                desc: "Issue virtual cards instantly for SaaS tools, cloud servers, and international advertising campaigns."
              },
              {
                num: "04",
                icon: ShieldCheck,
                title: "Strict Regulatory Safeguard",
                desc: "Customer funds are safeguarded in segregated accounts under UK FCA and European Central Bank regulations."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold text-neutral-500 tracking-widest">
                      {feature.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <feature.icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* PROVIDERS PROFILES SECTION */}
        {/* ======================================================== */}
        <section id="providers" className="mb-24 lg:mb-32 pt-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
              {t.bankService?.providersBadge || "02 / Global Providers"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {t.bankService?.providersTitle || "Know the rails behind the logo."}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore the four flagship international banking and fintech ecosystems we support.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
            {/* Left Partner Selector Tabs */}
            <div className="space-y-3">
              {partners.map((partner, index) => (
                <button
                  key={partner.name}
                  onClick={() => setActivePartner(index)}
                  className={`w-full text-left rtl:text-right p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    activePartner === index
                      ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                      : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-base">{partner.name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-neutral-400">
                        {partner.badge}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-normal">{partner.accent}</div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-transform ${
                      activePartner === index ? "bg-amber-400 text-black scale-110" : "text-neutral-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Detailed Partner Showcase */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#080b12] border border-amber-500/25 relative overflow-hidden shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-3xl font-black text-white">{partners[activePartner].name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">
                    {partners[activePartner].accent}
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 font-bold">
                  {partners[activePartner].domain}
                </span>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                {partners[activePartner].description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
                  Verified Capabilities & Rails:
                </div>
                {partners[activePartner].details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs sm:text-sm text-neutral-200"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[11px] text-neutral-500 max-w-sm">
                  Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.
                </span>
                <a
                  href="#application"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider transition-all"
                >
                  Apply for {partners[activePartner].name}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* APPLICATION FORM SECTION */}
        {/* ======================================================== */}
        <section id="application" className="mb-24 lg:mb-32">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-[#0e121d] via-[#090c14] to-[#05070c] border border-amber-500/30 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-black uppercase tracking-widest mb-4">
                <Lock size={12} /> {bs.applicationBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                {bs.applicationTitle}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {bs.applicationSub}
              </p>
            </div>

            {/* Account Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto mb-8">
              {(["Personal", "Business"] as AccountType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccountType(type)}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    accountType === type
                      ? "bg-amber-400 text-black shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {type === "Personal" ? bs.personalTab : bs.businessTab}
                </button>
              ))}
            </div>

            {submitStatus === "success" && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center mb-8 flex flex-col items-center">
                <CheckCircle2 size={36} className="mb-2" />
                <h4 className="font-black text-lg text-white mb-1">
                  {bs.successTitle}
                </h4>
                <p className="text-xs text-neutral-300 max-w-md">
                  {bs.successDesc}
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center mb-8">
                {bs.errorDesc}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    {bs.firstNameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={bs.firstNamePlaceholder}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    {bs.lastNameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={bs.lastNamePlaceholder}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    {bs.emailLabel} *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={bs.emailPlaceholder}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    {bs.phoneLabel} *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={bs.phonePlaceholder}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  {bs.countryLabel} *
                </label>
                <input
                  required
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder={bs.countryPlaceholder}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {accountType === "Business" && (
                <div className="grid sm:grid-cols-2 gap-5 pt-3 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                      {bs.companyNameLabel}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder={bs.companyNamePlaceholder}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                      {bs.companyRegLabel}
                    </label>
                    <input
                      type="text"
                      name="companyRegNumber"
                      value={formData.companyRegNumber}
                      onChange={handleInputChange}
                      placeholder={bs.companyRegPlaceholder}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{bs.submittingBtn}</span>
                ) : (
                  <>
                    <span>{bs.submitBtn}</span>
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* ======================================================== */}
        {/* NATIVE AD BANNER (FINTECH SPONSOR) */}
        {/* ======================================================== */}
        <AdsterraNativeBanner
          category="International Banking, Fintech & Multi-Currency Accounts"
          keywords="wise, payoneer, iban, foreign bank account, mastercard, visa card, international wire"
          badgeLabel="Fintech Partner"
        />

        {/* ======================================================== */}
        {/* FAQS SECTION */}
        {/* ======================================================== */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-3">
              <HelpCircle size={14} /> {bs.faqsBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {bs.faqsTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/8 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left rtl:text-right text-white font-bold text-sm sm:text-base hover:text-amber-400 transition-colors"
                >
                  <span className="pr-4 rtl:pr-0 rtl:pl-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-amber-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
