"use client";

import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, ExternalLink, ArrowRight, Compass, Volume2, VolumeX } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";

interface GoogleAdReelProps {
  currentLocale?: string;
  slotId?: string;
  onNext?: () => void;
}

export default function GoogleAdReel({
  currentLocale = "en",
  slotId,
  onNext,
}: GoogleAdReelProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Graceful error handle
    }
  }, []);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full h-full relative bg-gradient-to-b from-[#07070b] via-black to-[#050508] sm:rounded-[2.5rem] sm:border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm tracking-tight">
                {t.publicPages.sponsorBadge || "Safi Academy Partner"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[9px] font-black uppercase tracking-wider">
                {t.publicPages.adBadge || "Ad"}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {currentLocale === "fa" ? "اسپانسر منتخب آکادمی" :
               currentLocale === "ps" ? "د اکاډمۍ ځانګړی سپانسر" :
               currentLocale === "ar" ? "شريك مميز في المنظومة" :
               "Featured Global Sponsor"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMuted(!muted)}
          className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all backdrop-blur-md"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Center: Ad Content Unit */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-6 px-2">
        <div className="w-full max-w-sm bg-[#0a0a0f]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl text-center space-y-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: "250px" }}
            data-ad-client="ca-pub-6551903544426492"
            data-ad-slot={slotId || "auto"}
            data-ad-format="rectangle,vertical"
            data-full-width-responsive="true"
          />

          <div className="space-y-2 pt-2">
            <h3 className="text-white font-black text-lg sm:text-xl tracking-tight">
              {currentLocale === "fa" ? "فناوری و دانش بدون مرز" :
               currentLocale === "ps" ? "بې پولې ټکنالوژي او پوهه" :
               currentLocale === "ar" ? "حلول تكنولوجية رائدة للمستقبل" :
               "Engineering Global Success"}
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {currentLocale === "fa" ? "دسترسی به خدمات مالی، شرکت‌های بین‌المللی و ابزارهای توسعه کدنویسی." :
               currentLocale === "ps" ? "مالي اسانتیاوې او نړیوال تخنیکي خدمات ستاسو د پرمختګ لپاره." :
               currentLocale === "ar" ? "أدوات متطورة وبرامج تدريبية عالمية معتمدة من آكاديمية صافي." :
               "Empowering tech leaders and entrepreneurs worldwide through verified infrastructure."}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Google AdSense Verified Partner</span>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md"
        >
          <span>{currentLocale === "fa" ? "مشاهده محتوای بعدی" :
                 currentLocale === "ps" ? "بل ریلس ته لاړ شئ" :
                 currentLocale === "ar" ? "التالي" :
                 "Next Reel"}</span>
          <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}
