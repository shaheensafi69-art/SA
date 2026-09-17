"use client";

import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, ExternalLink, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";

interface GoogleAdStoryProps {
  currentLocale?: string;
  slotId?: string;
  onClose?: () => void;
  onNext?: () => void;
}

export default function GoogleAdStory({
  currentLocale = "en",
  slotId,
  onClose,
  onNext,
}: GoogleAdStoryProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Graceful error handle
    }
  }, []);

  // 7 second auto-advance timer for story ad
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNext) onNext();
          return 100;
        }
        return prev + 2;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full h-full sm:w-[400px] sm:h-[90vh] sm:max-h-[850px] bg-gradient-to-b from-[#0a0a0f] via-black to-[#06060a] sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] sm:border border-white/10 flex flex-col justify-between p-5 sm:p-6"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

      {/* Top Header: Progress bar + Brand info */}
      <div className="relative z-30 flex flex-col gap-3.5 pointer-events-auto">
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-black text-sm">
                  {t.publicPages.sponsorBadge || "Safi Academy Partner"}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-yellow-500/20 text-yellow-300 text-[8px] font-bold uppercase">
                  {t.publicPages.adBadge || "Ad"}
                </span>
              </div>
              <span className="text-neutral-400 text-[11px]">
                {currentLocale === "fa" ? "اسپانسر تایید شده" :
                 currentLocale === "ps" ? "تایید شوی سپانسر" :
                 currentLocale === "ar" ? "شريك معتمد" :
                 "Verified Sponsor"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Center: Ad Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto py-6">
        <div className="w-full bg-[#0d0d14]/90 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl text-center space-y-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: "200px" }}
            data-ad-client="ca-pub-6551903544426492"
            data-ad-slot={slotId || "auto"}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />

          <div className="pt-2">
            <h4 className="text-white font-black text-base tracking-tight mb-1">
              {currentLocale === "fa" ? "فرصت‌های تحصیلی و استارتاپی جهانی" :
               currentLocale === "ps" ? "نړیوال تحصیلي او کاري فرصتونه" :
               currentLocale === "ar" ? "فرص عالمية في التعليم والتقنية" :
               "Global Educational & Tech Opportunities"}
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {currentLocale === "fa" ? "بورسیه‌ها، خدمات شرکتی و دوره‌های تخصصی را در اکوسیستم آکادمی صافی دنبال کنید." :
               currentLocale === "ps" ? "په صافي اکاډمۍ کې نړیوال بورسونه او مسلکي زده کړې ترلاسه کړئ." :
               currentLocale === "ar" ? "اكتشف البرامج العالمية الموثوقة لتطوير مهاراتك القيادية." :
               "Connect with verified international programs, scholarships, and technological resources."}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: CTA & Next Indicator */}
      <div className="relative z-30 flex items-center justify-between w-full pt-3 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Google AdSense</span>
        </div>

        <button
          onClick={onNext}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-yellow-500/20"
        >
          <span>{t.publicPages.learnMore || "Next Story"}</span>
          <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}
