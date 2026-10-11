"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { getDonateTranslation } from "@/utils/donateTranslations";
import { CircularFlag } from "@/components/CircularFlag";
import { usePathname, useParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import {
  Heart,
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
  MessageSquareQuote,
  Sparkles,
  Globe,
  Wifi,
  Laptop,
  Lock,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  ChevronRight,
  CreditCard,
  Flame,
  Info,
  Copy,
  Check,
  Landmark,
  Building2,
  Send,
  Wallet,
  ExternalLink
} from "lucide-react";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// ============================================================================
// STRIPE CONFIGURATION & PUBLIC KEY
// ============================================================================
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_live_51TVYvgHSGmJUtsTTaP8jCiE3bR6KDKQaVT5Wm0R7CQkQAu1t7W9vkIOaEAZ5tKKJuB4hfA8TlMNDvDhP7RBFfsSe00SXyYj3NU"
);

// PayPal Client ID (Live / Environment)
const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  "BAAZRuOcLp_I3CeOAmQ-4D_2LsCqgNu86CYrsml4AP__PLDBITjyx4MrjbmtyRYHAifkBzPxDvWtt_Ebe8";

// ============================================================================
// DIRECT BANK TRANSFER ACCOUNTS (MANUAL SEPA, UK & US)
// ============================================================================
interface BankAccount {
  id: string;
  currency: string;
  currencySymbol: string;
  countryCode: "US" | "MT" | "GB" | "LU";
  title: string;
  subtitle: string;
  beneficiary: string;
  iban?: string;
  bic?: string;
  routingNumber?: string;
  sortCode?: string;
  accountNumber?: string;
  bankName?: string;
  bankAddress?: string;
  note?: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: "usd_wirex_shirin",
    currency: "USD",
    currencySymbol: "$",
    countryCode: "US",
    title: "US Dollar (ACH / Routing) - Shirin Gol Ahmadi",
    subtitle: "Direct US Domestic Bank Transfer / Wirex",
    beneficiary: "Shirin Gol Ahmadi",
    accountNumber: "214222579029",
    routingNumber: "101019644",
    bankName: "Wirex USA",
    note: "Minimum deposit is $1 (حداقل واریز ۱ دلار است، مقادیر کمتر پذیرفته نمی‌شوند)",
  },
  {
    id: "eur_malta_shirin",
    currency: "EUR",
    currencySymbol: "€",
    countryCode: "MT",
    title: "Euro SEPA (Malta) - Shirin Gol Ahmadi",
    subtitle: "European Single Euro Payments Area (SEPA)",
    beneficiary: "Shirin Gol Ahmadi",
    iban: "MT92CFTE28004000000000006678211",
    bic: "CFTEMTM1",
    bankName: "BANKING CIRCLE (MALTA)",
    bankAddress: "Malta",
  },
  {
    id: "gbp_uk",
    currency: "GBP",
    currencySymbol: "£",
    countryCode: "GB",
    title: "British Pound (UK Faster Payments)",
    subtitle: "Direct UK Domestic Transfer / BACS",
    beneficiary: "SHAHEEN SAFI",
    sortCode: "60-83-82",
    accountNumber: "47508069",
    bankName: "BANKING CIRCLE UK",
    bankAddress: "24 KING WILLIAM STREET, LONDON",
  },
  {
    id: "eur_malta_shaheen",
    currency: "EUR",
    currencySymbol: "€",
    countryCode: "MT",
    title: "Euro SEPA (Malta) - Shaheen Safi",
    subtitle: "European Single Euro Payments Area (SEPA)",
    beneficiary: "Shaheen Safi",
    iban: "MT42CFTE2800400000000005958401",
    bic: "CFTEMTM1",
    bankName: "BANKING CIRCLE (MALTA)",
    bankAddress: "Malta",
  },
  {
    id: "eur_lux_shaheen",
    currency: "EUR",
    currencySymbol: "€",
    countryCode: "LU",
    title: "Euro SEPA (Luxembourg) - Shaheen Safi",
    subtitle: "SEPA Cross-Border Transfer",
    beneficiary: "SHAHEEN SAFI",
    iban: "LU064080000047474342",
    bic: "BCIRLULL",
    bankName: "BANKING CIRCLE S.A.",
    bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG",
  },
];

export default function DonatePage() {
  const pathname = usePathname() || "/en";
  const params = useParams();
  const currentLocale = (params?.locale as string) || pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const dt = getDonateTranslation(currentLocale);
  const isRtl = dt.isRtl;

  
  const [amount, setAmount] = useState<number | "">(75);
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [campaign, setCampaign] = useState({ goal: 100000, raised: 14250 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Payment Method Selection & Manual Bank States
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");
  const [selectedBankIdx, setSelectedBankIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [bankForm, setBankForm] = useState({
    name: "",
    email: "",
    amount: "75",
    currency: "EUR",
    txId: "",
    notes: ""
  });
  const [isSubmittingBank, setIsSubmittingBank] = useState(false);
  const [bankSuccessRef, setBankSuccessRef] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleBankTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.name || !bankForm.email || !bankForm.amount) {
      alert("Please fill in your name, email and transfer amount.");
      return;
    }
    setIsSubmittingBank(true);
    try {
      const selectedAcc = BANK_ACCOUNTS[selectedBankIdx];
      const res = await fetch("/api/donate/bank-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: bankForm.name,
          donorEmail: bankForm.email,
          amount: bankForm.amount,
          currency: bankForm.currency,
          selectedAccount: `${selectedAcc.title} (${selectedAcc.beneficiary})`,
          txId: bankForm.txId,
          notes: bankForm.notes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBankSuccessRef(data.referenceId);
      } else {
        alert(data.error || "Failed to submit transfer receipt.");
      }
    } catch (err) {
      console.error("Bank transfer submit error:", err);
      alert("Network error. Please try again or contact us directly.");
    } finally {
      setIsSubmittingBank(false);
    }
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("donation_campaigns")
          .select("*")
          .eq("language", "en")
          .single();

        if (data && data.goal_amount) {
          setCampaign({
            goal: data.goal_amount,
            raised: data.raised_amount || 0
          });
        }
      } catch (err) {
        console.error("Could not fetch real-time campaign:", err);
      }
    };
    fetchCampaign();
  }, []);

  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

  // Determine current active impact text from localized tiers
  const currentPreset = dt.tiers.find((p) => p.amount === amount) || dt.tiers[2];

  const initStripeCheckout = async () => {
    if (!amount || amount < 5) return alert("Minimum donation is $5");
    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, note }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        alert(`Backend Error: ${data.error || "Unknown error"}`);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Network or Frontend error:", error);
      setIsProcessing(false);
    }
  };

  // --------------------------------------------------------------------------
  // Impact Testimonials & Verified Stories (19 Languages)
  // --------------------------------------------------------------------------
  const studentStories = dt.stories;

  // --------------------------------------------------------------------------
  // Financial Transparency Breakdown (19 Languages)
  // --------------------------------------------------------------------------
  const fundAllocationsIcons = [
    { icon: GraduationCap, color: "from-amber-500 to-yellow-400" },
    { icon: Wifi, color: "from-yellow-400 to-amber-600" },
    { icon: Globe, color: "from-amber-600 to-orange-500" },
    { icon: Laptop, color: "from-orange-500 to-amber-500" }
  ];
  const fundAllocations = dt.allocations.map((item, idx) => ({
    ...item,
    icon: fundAllocationsIcons[idx]?.icon || GraduationCap,
    color: fundAllocationsIcons[idx]?.color || "from-amber-500 to-yellow-400"
  }));

  // --------------------------------------------------------------------------
  // Frequently Asked Questions (19 Languages)
  // --------------------------------------------------------------------------
  const faqs = dt.faqs;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#040408] text-white font-sans selection:bg-amber-500/30 overflow-hidden relative"
    >
      {/* Dynamic Background Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-amber-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute top-[40%] left-[-15%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[190px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] bg-orange-600/10 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:36px_36px] opacity-40"></div>
      </div>

      {/* Floating Home Link */}
      <div className="fixed top-28 left-4 md:left-12 rtl:left-auto rtl:right-4 rtl:md:right-12 z-50">
        <Link
          href={`/${currentLocale}`}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase text-neutral-300 hover:text-white hover:bg-white/10 transition-all shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform" />
          <span>{dt.home}</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-36 md:pt-44 pb-32">
        {/* ================================================================== */}
        {/* HERO: The Heart of the Mission */}
        {/* ================================================================== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-[fadeInDown_0.6s_ease-out]">
            <Heart size={15} className="fill-red-500/80 animate-pulse text-red-500" />
            <span>{dt.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-[1.08]">
            {dt.heroTitle1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-sm">
              {dt.heroTitle2}
            </span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>{dt.heroDesc1}</p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-sm font-medium text-left rtl:text-right flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>{dt.heroDesc2}</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* REAL-TIME CAMPAIGN PROGRESS HUD */}
        {/* ================================================================== */}
        <div className="bg-[#0b0a12]/90 border border-amber-500/30 rounded-[2.5rem] p-7 md:p-10 mb-14 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {dt.liveGoalLabel}
                </p>
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white flex items-baseline gap-2">
                ${campaign.raised.toLocaleString()}
                <span className="text-xs text-neutral-400 font-normal">{dt.raisedOf}</span>
              </p>
            </div>
            <div className="sm:text-right rtl:sm:text-left">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                {dt.goal}
              </p>
              <p className="text-2xl font-black text-neutral-300">
                ${campaign.goal.toLocaleString()}
                <span className="text-xs text-neutral-500 font-normal"> USD</span>
              </p>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-4 bg-neutral-900/90 rounded-full overflow-hidden border border-white/10 p-0.5 mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
            </motion.div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10 text-center">
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">1,240+</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">{t.publicPages.girlsEnrolled || "Girls Enrolled"}</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">100%</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">{t.publicPages.freeScholarships || "Free Scholarships"}</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">48+</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">{t.publicPages.liveClassrooms || "Classrooms"}</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">256-bit</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">{dt.fundedBadge}</div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* INTERACTIVE DONATION CHECKOUT CARD */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-10 lg:col-start-2 bg-[#090812]/95 backdrop-blur-2xl border border-amber-500/30 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {dt.boxSubtitle}
                </span>
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <ShieldCheck className="text-emerald-400 w-7 h-7" />
                  <span>{dt.boxTitle}</span>
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <Lock size={13} /> TLS 1.3 256-Bit
              </div>
            </div>

            {/* ========================================================== */}
            {/* PAYMENT METHOD SELECTOR TABS                                */}
            {/* ========================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("card");
                  setClientSecret(null);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm ${
                  paymentMethod === "card"
                    ? "bg-amber-500/20 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <CreditCard size={18} className={paymentMethod === "card" ? "text-amber-400" : ""} />
                <span>{dt.tabCard}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("paypal");
                  setClientSecret(null);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm ${
                  paymentMethod === "paypal"
                    ? "bg-[#0070ba]/20 border-[#0070ba] text-white shadow-[0_0_20px_rgba(0,112,186,0.3)]"
                    : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Wallet size={18} className={paymentMethod === "paypal" ? "text-[#0070ba]" : ""} />
                <span>{dt.tabPaypal}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("bank");
                  setClientSecret(null);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm ${
                  paymentMethod === "bank"
                    ? "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Landmark size={18} className={paymentMethod === "bank" ? "text-emerald-400" : ""} />
                <span>{dt.tabBank}</span>
              </button>
            </div>

            {/* ========================================================== */}
            {/* METHOD 1: STRIPE CARD & WALLET (AUTOMATIC)                */}
            {/* ========================================================== */}
            {paymentMethod === "card" && (
              <>
                {!clientSecret ? (
                  <>
                    {/* Preset Amount Grid with Impact Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                      {dt.tiers.map((preset) => {
                        const isSelected = amount === preset.amount;
                        return (
                          <button
                            key={preset.amount}
                            type="button"
                            onClick={() => setAmount(preset.amount)}
                            className={`p-4 rounded-2xl text-left rtl:text-right transition-all border relative flex flex-col justify-between ${
                              isSelected
                                ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-amber-500 text-white shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.02]"
                                : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06]"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl font-black text-white">{preset.label}</span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                  isSelected
                                    ? "bg-amber-500 text-black font-extrabold"
                                    : "bg-white/10 text-neutral-400"
                                }`}
                              >
                                {preset.badge}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-amber-400 mb-1">{preset.tier}</div>
                            <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
                              {preset.impact}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Impact Highlight Box */}
                    {currentPreset && (
                      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                        <Heart className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 fill-amber-500/40" />
                        <div className="text-xs sm:text-sm text-neutral-200">
                          <strong className="text-amber-300 mr-1.5 ml-1.5">{amount ? `$${amount}` : ""}:</strong>
                          {currentPreset.impact}
                        </div>
                      </div>
                    )}

                    {/* Custom Amount Input */}
                    <div className="relative mb-6">
                      <span className="absolute left-6 rtl:left-auto rtl:right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-neutral-500">
                        $
                      </span>
                      <input
                        type="number"
                        min={5}
                        placeholder={dt.customAmount}
                        value={amount}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAmount(val === "" ? "" : Number(val));
                        }}
                        className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-4 pl-12 pr-6 rtl:pl-6 rtl:pr-12 text-xl font-black text-white outline-none focus:border-amber-500 transition-colors shadow-inner"
                      />
                      <span className="absolute right-6 rtl:right-auto rtl:left-6 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                        USD
                      </span>
                    </div>

                    {/* Message of Hope & Tribute */}
                    <div className="relative mb-8">
                      <div className="absolute left-5 rtl:left-auto rtl:right-5 top-4 text-neutral-400">
                        <MessageSquareQuote size={19} />
                      </div>
                      <textarea
                        placeholder={dt.dedicationPlaceholder}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-4 pl-13 pr-5 rtl:pl-5 rtl:pr-13 text-sm font-medium text-white outline-none focus:border-amber-500 transition-colors resize-none placeholder:text-neutral-500"
                      />
                    </div>

                    {/* Primary Donate Button */}
                    <button
                      type="button"
                      onClick={initStripeCheckout}
                      disabled={isProcessing || !amount || amount < 5}
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black uppercase tracking-widest text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isProcessing ? (
                        <span>{dt.processingBtn}</span>
                      ) : (
                        <>
                          <span>{dt.donateNowBtn} ({amount ? `$${amount}` : "$0"} USD)</span>
                          <ArrowRight size={20} className="rtl:rotate-180" />
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  /* Embedded Stripe Checkout Window */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                    <div className="bg-white rounded-3xl p-4 sm:p-6 mb-6 shadow-2xl">
                      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                        <EmbeddedCheckout />
                      </EmbeddedCheckoutProvider>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setClientSecret(null);
                        setIsProcessing(false);
                      }}
                      className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
                    >
                      Cancel & Change Amount
                    </button>
                  </motion.div>
                )}
              </>
            )}

            {/* ========================================================== */}
            {/* METHOD 2: PAYPAL SMART CHECKOUT (AUTOMATIC)               */}
            {/* ========================================================== */}
            {paymentMethod === "paypal" && (
              <div className="space-y-6">
                {/* Preset Amount Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-4">
                  {dt.tiers.map((preset) => {
                    const isSelected = amount === preset.amount;
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => setAmount(preset.amount)}
                        className={`p-3.5 rounded-2xl text-left rtl:text-right transition-all border relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#0070ba]/20 border-[#0070ba] text-white shadow-[0_0_20px_rgba(0,112,186,0.25)] scale-[1.02]"
                            : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-[#0070ba]/40 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="text-xl font-black text-white mb-1">{preset.label}</span>
                        <span className="text-xs font-bold text-[#40a7ff] mb-1">{preset.tier}</span>
                        <span className="text-[10px] text-neutral-400 line-clamp-1">{preset.impact}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-6 rtl:left-auto rtl:right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-neutral-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    placeholder={dt.customAmount}
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAmount(val === "" ? "" : Number(val));
                    }}
                    className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-4 pl-12 pr-6 rtl:pl-6 rtl:pr-12 text-xl font-black text-white outline-none focus:border-[#0070ba] transition-colors shadow-inner"
                  />
                  <span className="absolute right-6 rtl:right-auto rtl:left-6 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                    USD
                  </span>
                </div>

                {/* Message of Hope */}
                <div className="relative">
                  <div className="absolute left-5 rtl:left-auto rtl:right-5 top-4 text-neutral-400">
                    <MessageSquareQuote size={19} />
                  </div>
                  <textarea
                    placeholder={dt.dedicationPlaceholder}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-3 pl-13 pr-5 rtl:pl-5 rtl:pr-13 text-sm font-medium text-white outline-none focus:border-[#0070ba] transition-colors resize-none placeholder:text-neutral-500"
                  />
                </div>

                {/* PayPal Smart Buttons Container */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{dt.paypalTitle}</span>
                    </div>
                    <span className="text-xs text-neutral-400">
                      <strong>${amount || 0} USD</strong>
                    </span>
                  </div>

                  <div className="min-h-[140px] flex items-center justify-center">
                    <PayPalScriptProvider
                      options={{
                        clientId: PAYPAL_CLIENT_ID,
                        currency: "USD",
                        intent: "capture",
                      }}
                    >
                      <div className="w-full max-w-md mx-auto">
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "pill",
                            label: "donate",
                          }}
                          createOrder={async () => {
                            const res = await fetch("/api/donate/paypal", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                action: "create",
                                amount: Number(amount) || 25,
                                note: note || "Safi Academy Donor",
                              }),
                            });
                            const data = await res.json();
                            if (!res.ok || !data.orderId) {
                              throw new Error(data.error || "Failed to create PayPal order");
                            }
                            return data.orderId;
                          }}
                          onApprove={async (data) => {
                            const res = await fetch("/api/donate/paypal", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                action: "capture",
                                orderId: data.orderID,
                                note: note || "Safi Academy Donor",
                                amount: Number(amount) || 25,
                              }),
                            });
                            const captureData = await res.json();
                            if (captureData.success) {
                              window.location.href = `/${currentLocale}/donate/success?session_id=${data.orderID}`;
                            } else {
                              alert("Payment recorded: " + (captureData.error || "Success"));
                              window.location.href = `/${currentLocale}/donate/success?session_id=${data.orderID}`;
                            }
                          }}
                          onError={(err) => {
                            console.error("PayPal Error:", err);
                            alert(dt.paypalError);
                          }}
                        />
                      </div>
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* METHOD 3: MANUAL BANK TRANSFER (SEPA & UK FASTER PAYMENTS) */}
            {/* ========================================================== */}
            {paymentMethod === "bank" && (
              <div className="space-y-8">
                {/* Account Selection Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {dt.bankSelectLabel}
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {BANK_ACCOUNTS.length} {dt.bankVerifiedBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {BANK_ACCOUNTS.map((acc, idx) => {
                      const isSelected = selectedBankIdx === idx;
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => {
                            setSelectedBankIdx(idx);
                            setBankForm((prev) => ({ ...prev, currency: acc.currency }));
                          }}
                          className={`p-3.5 rounded-2xl text-left rtl:text-right border transition-all ${
                            isSelected
                              ? "bg-emerald-500/15 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]"
                              : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <CircularFlag code={acc.countryCode} className="w-6 h-6 shadow-sm" />
                            <span className="text-xs font-extrabold font-mono text-emerald-400">{acc.currency}</span>
                          </div>
                          <div className="text-xs font-bold text-white truncate">{acc.beneficiary}</div>
                          <div className="text-[10px] text-neutral-400 truncate">{acc.title}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Bank Details Card */}
                {(() => {
                  const acc = BANK_ACCOUNTS[selectedBankIdx];
                  const allDetailsText = [
                    `${dt.beneficiaryLabel}: ${acc.beneficiary}`,
                    acc.iban ? `${dt.ibanLabel}: ${acc.iban}` : null,
                    acc.bic ? `${dt.bicLabel}: ${acc.bic}` : null,
                    acc.routingNumber ? `${dt.routingLabel}: ${acc.routingNumber}` : null,
                    acc.sortCode ? `${dt.sortCodeLabel}: ${acc.sortCode}` : null,
                    acc.accountNumber ? `${dt.accountNumberLabel}: ${acc.accountNumber}` : null,
                    acc.bankName ? `${dt.bankNameLabel}: ${acc.bankName}` : null,
                    acc.bankAddress ? `${dt.bankAddressLabel}: ${acc.bankAddress}` : null,
                    acc.note ? `${dt.noticeLabel}: ${acc.note}` : null,
                  ]
                    .filter(Boolean)
                    .join("\n");

                  return (
                    <div className="bg-gradient-to-br from-neutral-900/90 to-[#0c0a15] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                            <CircularFlag code={acc.countryCode} className="w-9 h-9 shadow-md" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-white">{acc.title}</h4>
                            <p className="text-xs text-neutral-400">{acc.subtitle}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyToClipboard(allDetailsText, `all_${acc.id}`)}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-bold text-xs uppercase tracking-wider text-neutral-200 transition-all flex items-center gap-2 self-start sm:self-auto"
                        >
                          {copiedKey === `all_${acc.id}` ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span>{dt.allCopiedText}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>{dt.copyAllBtn}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Fields with 1-Click Copy */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Beneficiary */}
                        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                              {dt.beneficiaryLabel}
                            </span>
                            <span className="font-bold text-white text-sm select-all">{acc.beneficiary}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(acc.beneficiary, `bene_${acc.id}`)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                            title="Copy Beneficiary"
                          >
                            {copiedKey === `bene_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>

                        {/* IBAN (If applicable) */}
                        {acc.iban && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.ibanLabel}
                              </span>
                              <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm break-all select-all">
                                {acc.iban}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.iban!, `iban_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors shrink-0"
                              title="Copy IBAN"
                            >
                              {copiedKey === `iban_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* BIC / SWIFT */}
                        {acc.bic && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.bicLabel}
                              </span>
                              <span className="font-mono font-bold text-white text-sm select-all">{acc.bic}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.bic!, `bic_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy BIC"
                            >
                              {copiedKey === `bic_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Routing Number (US Domestic / Wire) */}
                        {acc.routingNumber && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.routingLabel}
                              </span>
                              <span className="font-mono font-bold text-amber-300 text-sm select-all">{acc.routingNumber}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.routingNumber!, `routing_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy Routing Number"
                            >
                              {copiedKey === `routing_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Sort Code (UK) */}
                        {acc.sortCode && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.sortCodeLabel}
                              </span>
                              <span className="font-mono font-bold text-amber-300 text-sm select-all">{acc.sortCode}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.sortCode!, `sort_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy Sort Code"
                            >
                              {copiedKey === `sort_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Account Number (UK / US) */}
                        {acc.accountNumber && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.accountNumberLabel}
                              </span>
                              <span className="font-mono font-bold text-white text-sm select-all">{acc.accountNumber}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.accountNumber!, `accnum_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy Account Number"
                            >
                              {copiedKey === `accnum_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Bank Name */}
                        {acc.bankName && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.bankNameLabel}
                              </span>
                              <span className="font-bold text-white text-xs select-all">{acc.bankName}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.bankName!, `bname_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy Bank Name"
                            >
                              {copiedKey === `bname_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Bank Address */}
                        {acc.bankAddress && (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between md:col-span-2">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-0.5">
                                {dt.bankAddressLabel}
                              </span>
                              <span className="text-neutral-300 text-xs select-all">{acc.bankAddress}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(acc.bankAddress!, `baddr_${acc.id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                              title="Copy Address"
                            >
                              {copiedKey === `baddr_${acc.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Notice / Note (if any) */}
                        {acc.note && (
                          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between md:col-span-2">
                            <div>
                              <span className="text-[10px] text-amber-400 uppercase font-bold block mb-0.5">
                                {dt.noticeLabel}
                              </span>
                              <span className="text-amber-200 text-xs font-semibold select-all">{acc.note}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Bank Transfer Confirmation Form */}
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {dt.receiptHeader}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 mb-6">
                    {dt.receiptSub}
                  </p>

                  {bankSuccessRef ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <h5 className="text-lg font-bold text-white mb-2">{dt.successReceiptTitle}</h5>
                      <p className="text-xs text-neutral-300 mb-4">
                        {dt.successReceiptDesc}
                      </p>
                      <div className="inline-block px-4 py-2 rounded-xl bg-black/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                        {dt.trackingRefLabel}: <strong>{bankSuccessRef}</strong>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBankTransferSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase mb-1 block">
                            {dt.donorNameLabel}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ahmad Reza"
                            value={bankForm.name}
                            onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase mb-1 block">
                            {dt.donorEmailLabel}
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. ahmad@example.com"
                            value={bankForm.email}
                            onChange={(e) => setBankForm({ ...bankForm, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase mb-1 block">
                            {dt.transferAmountLabel}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              required
                              placeholder="75"
                              value={bankForm.amount}
                              onChange={(e) => setBankForm({ ...bankForm, amount: e.target.value })}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                            />
                            <select
                              value={bankForm.currency}
                              onChange={(e) => setBankForm({ ...bankForm, currency: e.target.value })}
                              className="bg-neutral-800 border border-white/10 rounded-xl px-3 py-3 text-xs text-white outline-none"
                            >
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="USD">USD ($)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase mb-1 block">
                            {dt.txIdLabel}
                          </label>
                          <input
                            type="text"
                            placeholder="Reference code on your bank slip"
                            value={bankForm.txId}
                            onChange={(e) => setBankForm({ ...bankForm, txId: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 uppercase mb-1 block">
                          {dt.notesLabel}
                        </label>
                        <textarea
                          rows={2}
                          placeholder={dt.dedicationPlaceholder}
                          value={bankForm.notes}
                          onChange={(e) => setBankForm({ ...bankForm, notes: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingBank}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_5px_25px_rgba(16,185,129,0.3)] disabled:opacity-50"
                      >
                        {isSubmittingBank ? (
                          <span>{dt.submittingReceiptBtn}</span>
                        ) : (
                          <>
                            <span>{dt.submitReceiptBtn}</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Payment Trust Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-blue-800">
                  VISA
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-red-600">
                  MC
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-blue-500">
                  AMEX
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-blue-600">
                  PAYPAL
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-emerald-700">
                  SEPA
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-black">
                  APPLE
                </div>
              </div>
              <span className="font-semibold text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> {dt.encryptedNotice}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ================================================================== */}
        {/* REAL STUDENT VOICES & TESTIMONIALS */}
        {/* ================================================================== */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              {dt.storiesBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {dt.storiesTitle}
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              {dt.storiesSub}
            </p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentStories.map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0b0a14] border border-white/10 hover:border-amber-500/40 rounded-3xl p-7 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg">
                      {story.avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white">{story.name}</h4>
                      <p className="text-[11px] text-amber-300/90 font-medium">{story.track}</p>
                      <p className="text-[10px] text-neutral-500">{story.location}</p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed italic mb-6">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>{dt.isRtl ? "بورسیه تحصیلی تأیید شده" : "Verified Scholarship Recipient"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* FINANCIAL TRANSPARENCY: WHERE EVERY DOLLAR GOES */}
        {/* ================================================================== */}
        <div className="bg-gradient-to-br from-[#0e0c18] via-[#090812] to-[#040408] border border-amber-500/25 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              {dt.transparencyBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              {dt.transparencyTitle}
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {dt.transparencySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {fundAllocations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                        <Icon size={22} />
                      </div>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        {item.percent}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* FREQUENTLY ASKED QUESTIONS */}
        {/* ================================================================== */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              {dt.faqBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {dt.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0b0a14] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-amber-500/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left rtl:text-right p-6 flex items-center justify-between gap-4"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white flex items-start gap-3">
                      <span className="text-amber-400 font-mono">Q.</span>
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
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
                        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed pl-7 rtl:pl-0 rtl:pr-7 pt-4">
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
        {/* NATIVE AD BANNER (SPONSOR SPOTLIGHT) */}
        {/* ================================================================== */}
        <AdsterraNativeBanner
          category="Philanthropic Education & Global Humanitarian Initiatives"
          keywords="charity, student scholarships, education access, female empowerment, global donations"
          badgeLabel="Sponsor Spotlight"
        />

        {/* ================================================================== */}
        {/* FINAL HEARTWARMING CALL TO ACTION */}
        {/* ================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-[#120f20] via-[#0d0a17] to-[#06050b] border border-amber-500/30 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          <div className="w-18 h-18 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 p-4 shadow-inner">
            <Heart className="w-10 h-10 fill-amber-500/50 text-amber-400 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-3xl leading-tight">
            {dt.bottomCtaTitle}
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
            {dt.bottomCtaDesc}
          </p>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_40px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.6)] hover:scale-105"
          >
            <span>{dt.bottomCtaBtn}</span>
            <ArrowRight size={18} className="rtl:rotate-180" />
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {dt.trustBadge1Title}
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              {dt.trustBadge2Title}
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {dt.trustBadge3Title}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}