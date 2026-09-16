"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import { Suspense, useEffect } from "react";
import {  useSearchParams , usePathname } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ArrowRight, Home, ShieldCheck } from "lucide-react";
import { trackPurchaseConversion } from "@/lib/gtag";

function DonationSuccessContent() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  useEffect(() => {
    // Dynamic conversion event firing with session id
    trackPurchaseConversion({
      value: 1.0,
      currency: "GBP",
      transactionId: sessionId,
    });
  }, [sessionId]);

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      {/* Static Google Ads Event Snippet for Verification Crawlers */}
      <Script
        id="google-ads-purchase-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                'send_to': 'AW-18447660056/A5oFCJ2I4vUcEJjow9xE',
                'value': 1.0,
                'currency': 'GBP',
                'transaction_id': '${sessionId}'
              });
            }
          `,
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-6">
        <Heart size={14} className="fill-yellow-500/40 text-yellow-500" />
        Payment Confirmed
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
        Thank You for Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
          Support & Defiance!
        </span>
      </h1>

      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
        Your contribution directly powers digital classrooms, scholarships, and borderless education for Afghan girls and women. A receipt has been sent to your email.
      </p>

      {sessionId && (
        <div className="mb-10 p-4 bg-white/[0.02] border border-white/10 rounded-2xl max-w-md mx-auto text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            <ShieldCheck size={14} className="text-emerald-400" /> Reference ID
          </div>
          <p className="text-xs font-mono text-neutral-300 break-all select-all">
            {sessionId}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/${currentLocale}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-xs tracking-widest transition-all shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:scale-105"
        >
          <Home size={16} /> Return Home
        </Link>
        <Link
          href={`/${currentLocale}/courses`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase text-xs tracking-widest transition-all"
        >
          Explore Courses <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden relative" >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">{t.publicPages.loadingConfirmation}</div>}>
        <DonationSuccessContent />
      </Suspense>
    </main>
  );
}
