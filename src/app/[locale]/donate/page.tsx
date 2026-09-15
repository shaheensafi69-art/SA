"use client";

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
  Info
} from "lucide-react";

// ============================================================================
// STRIPE CONFIGURATION & PUBLIC KEY (PRESERVED)
// ============================================================================
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_live_51TVYvgHSGmJUtsTTaP8jCiE3bR6KDKQaVT5Wm0R7CQkQAu1t7W9vkIOaEAZ5tKKJuB4hfA8TlMNDvDhP7RBFfsSe00SXyYj3NU"
);

// Impact-linked donation tiers
const PRESET_AMOUNTS = [
  {
    amount: 15,
    label: "$15",
    tier: "Digital Lifeline",
    impact: "Provides 1 month of encrypted high-speed internet & secure VPN access for an underground student.",
    badge: "Essential"
  },
  {
    amount: 35,
    label: "$35",
    tier: "Learning Toolkit",
    impact: "Covers cloud coding sandbox environments, course materials, and offline lesson downloads.",
    badge: "Student Kit"
  },
  {
    amount: 75,
    label: "$75",
    tier: "Full Course + Mentorship",
    impact: "Funds 1 complete technical course with weekly 1-on-1 office hours from senior software engineers.",
    badge: "Most Popular"
  },
  {
    amount: 150,
    label: "$150",
    tier: "Semester Scholarship",
    impact: "Full 6-month comprehensive scholarship (Coding, UI/UX, or English) with verifiable graduation diploma.",
    badge: "High Impact"
  },
  {
    amount: 350,
    label: "$350",
    tier: "Hardware & Solar Kit",
    impact: "Sponsors a refurbished programming laptop plus a high-capacity power bank for frequent electrical blackouts.",
    badge: "Lifesaver"
  },
  {
    amount: 500,
    label: "$500",
    tier: "Classroom Guardian",
    impact: "Sponsors an entire virtual cohort of 5 courageous students with equipment, connectivity, and mentorship.",
    badge: "Champion"
  }
];

export default function EnglishDonatePage() {
  const [amount, setAmount] = useState<number | "">(75);
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [campaign, setCampaign] = useState({ goal: 100000, raised: 14250 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  // Determine current active impact text
  const currentPreset = PRESET_AMOUNTS.find((p) => p.amount === amount);

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
  // Impact Testimonials & Verified Stories
  // --------------------------------------------------------------------------
  const studentStories = [
    {
      name: "Fatima R.",
      location: "Kabul, Afghanistan",
      track: "Full-Stack Web Development Graduate",
      quote:
        "When the university gates were slammed shut in my face, I cried for weeks. My world ended that day. Safi Academy gave me an encrypted laptop, paid for my 4G internet data, and taught me React and Node.js in secret. Today, I work on remote freelance contracts from my room and feed my family of six. They barred our classrooms, but they could not bar our minds.",
      avatar: "F"
    },
    {
      name: "Maryam K.",
      location: "Herat, Afghanistan",
      track: "Python & Data Science Scholar",
      quote:
        "In our city, teenage girls are not even allowed into public libraries. Studying here is an act of defiance. Every evening, when the house is quiet, I open my lessons on my smartphone through Safi Academy's offline proxy. I am building an automated database for local healthcare clinics. Your donation is not charity; it is our weapon against darkness.",
      avatar: "M"
    },
    {
      name: "Zahra S.",
      location: "Mazar-i-Sharif, Afghanistan",
      track: "UI/UX & Digital Product Design",
      quote:
        "The hardest part of being an Afghan girl today is the world forgetting that you exist. Safi Academy reminded me that my intellect has value. I completed my design portfolio, received mentorship from engineers in Germany and Canada, and won my first international design grant. Thank you to everyone who donates. You give us our dignity back.",
      avatar: "Z"
    }
  ];

  // --------------------------------------------------------------------------
  // Financial Transparency Breakdown
  // --------------------------------------------------------------------------
  const fundAllocations = [
    {
      percent: "45%",
      title: "Direct Student Scholarships & Diplomas",
      desc: "Comprehensive course access, live mentor office hours, accredited digital certificates, and career placement coaching.",
      icon: GraduationCap,
      color: "from-amber-500 to-yellow-400"
    },
    {
      percent: "25%",
      title: "Encrypted High-Speed Internet & Data Packs",
      desc: "Subsidizing monthly mobile 4G and satellite internet data packs for female students living under strict restrictions.",
      icon: Wifi,
      color: "from-yellow-400 to-amber-600"
    },
    {
      percent: "18%",
      title: "Anti-Censorship Digital Infrastructure",
      desc: "Cloud servers, lightweight low-bandwidth video streaming, offline lesson packs, and secure encrypted communication tunnels.",
      icon: Globe,
      color: "from-amber-600 to-orange-500"
    },
    {
      percent: "12%",
      title: "Hardware & Emergency Solar Battery Grants",
      desc: "Refurbished coding laptops and high-capacity portable power banks to overcome chronic electrical power cuts.",
      icon: Laptop,
      color: "from-orange-500 to-amber-500"
    }
  ];

  // --------------------------------------------------------------------------
  // Frequently Asked Questions
  // --------------------------------------------------------------------------
  const faqs = [
    {
      q: "How is my donation processed and is it safe?",
      a: "Every transaction is encrypted using bank-grade 256-bit TLS encryption powered by Stripe, an industry-leading PCI Service Provider Level 1 certified payment processor. Safi Academy never stores your credit or debit card numbers."
    },
    {
      q: "How do you protect the safety of female students in Afghanistan?",
      a: "Safety is our absolute paramount priority. We utilize zero-knowledge principles: student real names, exact physical locations, and IP addresses are completely masked and encrypted. Lessons can be downloaded asynchronously and studied offline, eliminating live video surveillance risks."
    },
    {
      q: "Can I donate from outside the United States in my local currency?",
      a: "Yes! Stripe automatically supports cards from over 135 countries. Whether you hold British Pounds (GBP), Euros (EUR), Canadian Dollars (CAD), Australian Dollars (AUD), or any other currency, your bank will seamlessly convert the amount to USD at the standard market exchange rate."
    },
    {
      q: "Can I make an anonymous donation?",
      a: "Yes. You can leave the tribute note blank or write 'Anonymous Supporter'. We respect your privacy and will never share your personal information or contact details with third parties."
    },
    {
      q: "How are scholarship recipients selected?",
      a: "Students undergo a rigorous, compassionate application process administered by our educational advisory board. Priority is granted to girls and women currently barred from secondary schools or universities, orphans, and those demonstrating dedication to learning technology despite extreme adversity."
    },
    {
      q: "Will I receive a receipt for my contribution?",
      a: "Yes. Immediately upon completing checkout through our secure Stripe portal, an official digital receipt with a unique transaction reference ID is generated on-screen and dispatched to your email address."
    }
  ];

  return (
    <div
      className="min-h-screen bg-[#040408] text-white font-sans selection:bg-amber-500/30 overflow-hidden relative"
      dir="ltr"
    >
      {/* Dynamic Background Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-amber-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute top-[40%] left-[-15%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[190px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] bg-orange-600/10 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:36px_36px] opacity-40"></div>
      </div>

      {/* Floating Home Link */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <Link
          href="/en"
          className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase text-neutral-300 hover:text-white hover:bg-white/10 transition-all shadow-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-36 md:pt-44 pb-32">
        {/* ================================================================== */}
        {/* HERO: The Heart of the Mission */}
        {/* ================================================================== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-[fadeInDown_0.6s_ease-out]">
            <Heart size={15} className="fill-red-500/80 animate-pulse text-red-500" />
            <span>Emergency Educational Aid • Defy the Ban</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-[1.08]">
            They Locked the School Gates. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-sm">
              We Open the Universe.
            </span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              In Afghanistan today, over <strong className="text-white font-semibold">1,000+ days</strong> have passed since teenage girls were banned from secondary schools. Universities are sealed. Dreams of becoming software architects, doctors, and civic leaders have been forcefully silenced.
            </p>
            <p>
              <strong className="text-white font-semibold">Safi Academy</strong> operates as an encrypted, underground digital sanctuary. We provide 100% free technical scholarships, high-speed mobile internet subsidies, and verifiable credentials to thousands of courageous women studying in secret from their homes.
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-sm font-medium text-left flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Your donation is an act of human defiance.</strong> You are not merely sending funds; you are purchasing internet data packs, placing laptops into eager hands, and proving to every Afghan girl that she has not been abandoned.
              </span>
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
                  Live Global Scholarship Campaign
                </p>
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white flex items-baseline gap-2">
                ${campaign.raised.toLocaleString()}
                <span className="text-xs text-neutral-400 font-normal">USD Raised</span>
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                Target 2026 Student Goal
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
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Girls Enrolled</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">100%</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Free Scholarships</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">48+</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Secret Classrooms</div>
            </div>
            <div className="p-2">
              <div className="text-lg sm:text-xl font-black text-white">256-bit</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Encrypted Privacy</div>
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
                  100% Secure & Direct Student Aid
                </span>
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <ShieldCheck className="text-emerald-400 w-7 h-7" />
                  <span>Choose Your Level of Impact</span>
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <Lock size={13} /> Bank-Grade TLS 1.3
              </div>
            </div>

            {!clientSecret ? (
              <>
                {/* Preset Amount Grid with Impact Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                  {PRESET_AMOUNTS.map((preset) => {
                    const isSelected = amount === preset.amount;
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => setAmount(preset.amount)}
                        className={`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
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
                      <strong className="text-amber-300 mr-1">Your ${amount} Gift:</strong>
                      {currentPreset.impact}
                    </div>
                  </div>
                )}

                {/* Custom Amount Input */}
                <div className="relative mb-6">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-neutral-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={5}
                    placeholder="Enter custom amount in USD (e.g. 100)"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAmount(val === "" ? "" : Number(val));
                    }}
                    className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-4 pl-12 pr-6 text-xl font-black text-white outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                    USD
                  </span>
                </div>

                {/* Message of Hope & Tribute */}
                <div className="relative mb-8">
                  <div className="absolute left-5 top-4 text-neutral-400">
                    <MessageSquareQuote size={19} />
                  </div>
                  <textarea
                    placeholder="Write a heartfelt message or note of courage for the students... (Optional - sent directly to our students)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-4 pl-13 pr-5 text-sm font-medium text-white outline-none focus:border-amber-500 transition-colors resize-none placeholder:text-neutral-500"
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
                    <span>Connecting to Bank-Grade Gateway...</span>
                  ) : (
                    <>
                      <span>Proceed with Gift of {amount ? `$${amount}` : "$0"} USD</span>
                      <ArrowRight size={20} />
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
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-black">
                  APPLE
                </div>
                <div className="w-9 h-5 bg-white rounded flex items-center justify-center text-[7px] font-black text-neutral-700">
                  GPAY
                </div>
              </div>
              <span className="font-semibold text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> Powered by Stripe • 256-Bit SSL
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
              Voices from Behind Closed Doors
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Real Lives Changed by Your Courage
            </h2>
            <p className="mt-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              Read authentic testimonies from female students who refused to surrender their intellect and are now programming their way to financial freedom.
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
                  <span>Verified Scholarship Recipient</span>
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
              100% Financial Accountability
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Where Every Dollar of Your Gift Goes
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              We operate with ruthless efficiency and zero administrative bloat. Your funds go straight to students, internet data packs, and hardware inside Afghanistan.
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
              Donor Information
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
                  className="bg-[#0b0a14] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-amber-500/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
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
            Be the Reason an Afghan Girl Writes Her Future Tomorrow.
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
            History will remember who stood in silence and who chose to light a candle in the darkness. Join thousands of compassionate donors from around the world.
          </p>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_40px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.6)] hover:scale-105"
          >
            <span>Make Your Donation Now</span>
            <ArrowRight size={18} />
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Tax & Financial Integrity
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              Instant Email Tax Receipt
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Zero Platform Commission
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}