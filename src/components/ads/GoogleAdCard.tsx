"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, ExternalLink, Info, CheckCircle2 } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface GoogleAdCardProps {
  currentLocale?: string;
  slotId?: string;
  className?: string;
}

export default function GoogleAdCard({
  currentLocale = "en",
  slotId,
  className = "",
}: GoogleAdCardProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      // AdSense push error handle gracefully (e.g. adblocker active)
    }
  }, []);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`w-full bg-[#0a0a0f]/90 border border-white/10 hover:border-yellow-500/30 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-300 group ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header: Verified Sponsor Badge */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-transparent border border-yellow-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.15)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-black text-sm tracking-tight">
                {t.publicPages.sponsorBadge || "Safi Academy Partner"}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-black uppercase tracking-widest">
                {t.publicPages.adBadge || "Sponsored"}
              </span>
            </div>
            <p className="text-neutral-400 text-xs mt-0.5">
              {currentLocale === "fa" ? "محتوای تاییدشده اکوسیستم همکار" :
               currentLocale === "ps" ? "د تایید شوي ایکوسیستم ملګري محتوا" :
               currentLocale === "ar" ? "محتوى موثق من شركاء المنظومة" :
               "Verified Educational & Corporate Partner"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-mono">
          <Info className="w-3 h-3 text-neutral-500" />
          <span>Ads</span>
        </div>
      </div>

      {/* AdSense Placement Area */}
      <div
        ref={adRef}
        className="w-full min-h-[140px] sm:min-h-[200px] flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative z-10"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-6551903544426492"
          data-ad-slot={slotId || "auto"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Fallback presentation if Ad is awaiting impressions or in test */}
        <div className="p-6 text-center max-w-md mx-auto pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mb-2">
            <CheckCircle2 size={12} />
            {t.publicPages.sponsorBadge || "Global Network Partner"}
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {currentLocale === "fa"
              ? "فرصت‌های شغلی، بورسیه‌های بین‌المللی و ابزارهای فناوری متناسب با مسیر یادگیری شما."
              : currentLocale === "ps"
              ? "ستاسو د زده کړې لارې لپاره تایید شوي کاري فرصتونه او نړیوال بورسونه."
              : currentLocale === "ar"
              ? "فرص وظيفية وتكنولوجية متميزة موجهة لرواد الأعمال والمهندسين حول العالم."
              : "Discover premier career opportunities, international fintech tools, and global technology partnerships."}
          </p>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-[11px] text-neutral-400 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          {currentLocale === "fa" ? "سیاست حفظ حریم خصوصی آکادمی صافی" :
           currentLocale === "ps" ? "د صافي اکاډمۍ د محرمیت تګلاره" :
           currentLocale === "ar" ? "سياسة حماية البيانات المعتمدة" :
           "Safi Academy Safe Advertising Standard"}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
          Google AdSense Verified
        </span>
      </div>
    </div>
  );
}
