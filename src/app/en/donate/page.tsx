"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Heart, ArrowLeft, ShieldCheck, ArrowRight, MessageSquareQuote } from "lucide-react";

// کلید پابلیک استرایپ
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_live_51TVYvgHSGmJUtsTTaP8jCiE3bR6KDKQaVT5Wm0R7CQkQAu1t7W9vkIOaEAZ5tKKJuB4hfA8TlMNDvDhP7RBFfsSe00SXyYj3NU");

const PRESET_AMOUNTS = [10, 50, 100, 500];

export default function EnglishDonatePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [campaign, setCampaign] = useState({ goal: 100000, raised: 0 });

  useEffect(() => {
    const fetchCampaign = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("donation_campaigns").select("*").eq("language", "en").single();
      if (data) setCampaign({ goal: data.goal_amount, raised: data.raised_amount });
    };
    fetchCampaign();
  }, []);

  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

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
        alert(`Backend Error: ${data.error || 'Unknown error'}`);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Network or Frontend error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden" dir="ltr">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[150px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-28 left-4 md:left-12 z-50">
        <Link href="/en" className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black uppercase text-neutral-300 hover:text-white hover:bg-white/10 transition-all shadow-xl group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-40 pb-32">

        {/* ================= HERO SECTION ================= */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest mb-8 shadow-inner animate-[fadeInDown_0.5s_ease-out]">
            <Heart size={14} className="fill-red-500/50" /> Education is a Human Right
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            Defy the Darkness. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 drop-shadow-lg">Empower Afghan Women.</span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-6 text-neutral-400 text-sm sm:text-base leading-relaxed font-medium">
            <p>
              Right now, millions of girls and women in Afghanistan are systematically denied their fundamental right to education. School doors are locked, universities are restricted, and dreams are put on hold. But the human drive to learn, innovate, and lead cannot be extinguished by decrees.
            </p>
            <p>
              <strong className="text-white">Safi Academy</strong> serves as a borderless, digital lifeline. We provide fully-funded scholarships, advanced tech infrastructure, and a secure learning ecosystem to those trapped behind these barriers.
            </p>
            <p className="text-yellow-500/90 font-bold border-l-2 border-yellow-500 pl-4 py-1 text-left italic">
              "Your contribution is more than a donation; it is an act of defiance against ignorance. Help us break the chains, fund the future, and prove that education knows no borders."
            </p>
          </div>
        </div>

        {/* CAMPAIGN PROGRESS */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 mb-12 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Raised so far</p>
              <p className="text-3xl font-black text-white">${campaign.raised.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Goal</p>
              <p className="text-xl font-bold text-neutral-400">${campaign.goal.toLocaleString()}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ================= STRIPE (ONLINE) SECTION ================= */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 lg:col-start-3 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3"><ShieldCheck className="text-emerald-500" /> Secure Online Donation</h3>

            {!clientSecret ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button key={preset} onClick={() => setAmount(preset)} className={`py-4 rounded-2xl font-black text-lg transition-all border ${amount === preset ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] scale-105" : "bg-white/[0.03] text-white border-white/10 hover:border-yellow-500/50 hover:bg-white/[0.06]"}`}>
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-neutral-500">$</span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-xl font-black text-white outline-none focus:border-yellow-500/50 transition-colors"
                  />
                </div>

                <div className="relative mb-10">
                  <div className="absolute left-6 top-5 text-neutral-500">
                    <MessageSquareQuote size={20} />
                  </div>
                  <textarea
                    placeholder="Leave a message of support for the students... (Optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium text-white outline-none focus:border-yellow-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={initStripeCheckout}
                  disabled={isProcessing || !amount}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Connecting to Secure Gateway..." : `Proceed with ${amount ? `$${amount}` : ''}`} <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                <div className="bg-white rounded-3xl p-4 sm:p-6 mb-6">
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                </div>
                <button
                  onClick={() => setClientSecret(null)}
                  className="w-full py-3 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  Cancel & Change Amount
                </button>
              </motion.div>
            )}

            <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-black text-blue-800">VISA</div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-black text-red-600">MASTER</div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-black text-blue-500">AMEX</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Powered by Stripe</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}