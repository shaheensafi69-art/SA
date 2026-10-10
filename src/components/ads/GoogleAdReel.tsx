"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";
import AdsterraNativeBanner from "./AdsterraNativeBanner";

interface GoogleAdReelProps {
  currentLocale?: string;
  slotId?: string;
  onNext?: () => void;
}

export default function GoogleAdReel({
  currentLocale = "en",
  onNext,
}: GoogleAdReelProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full h-full relative bg-gradient-to-b from-[#07070b] via-black to-[#050508] sm:rounded-[2.5rem] sm:border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Sparkles size={13} />
          <span>{isRtl ? "اسپانسر تایید شده" : "Verified Sponsor"}</span>
        </div>
        {onNext && (
          <button
            onClick={onNext}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
          >
            <span>{isRtl ? "ویدیو بعدی" : "Next Video"}</span>
            <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
          </button>
        )}
      </div>

      {/* Adsterra Banner */}
      <div className="relative z-10 my-auto py-6">
        <AdsterraNativeBanner
          title={isRtl ? "پیشنهاد ویژه این بخش" : "Featured Spotlight"}
          niche="Short Video, Creator Economy, Tech & Online Media"
          keywords="viral video, social media, creator tools, tech, entertainment"
        />
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-[11px] text-neutral-500">
        {isRtl ? "محتوای هوشمند متناسب با علایق شما" : "Contextual recommendation tailored to your interests"}
      </div>
    </div>
  );
}
