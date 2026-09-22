"use client";

import React, { useState } from "react";
import { Sparkles, X, ShieldCheck } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";
import GoogleAdSenseAd from "./GoogleAdSenseAd";

interface InFeedNativeAdProps {
  adIndex?: number;
  currentLocale?: string;
}

const getVerifiedPartnerLabel = (locale: string) => {
  const map: Record<string, string> = {
    fa: "همکار رسمی گوگل ادسنس",
    ps: "د ګوګل اډسینس رسمي ملګری",
    ar: "شريك معتمد من Google AdSense",
    ur: "گوگل ایڈسینس کا تصدیق شدہ پارٹنر",
    ru: "Проверенный партнер Google AdSense",
    tr: "Doğrulanmış Google AdSense İş Ortağı",
    de: "Verifizierter Google AdSense-Partner",
    fr: "Partenaire vérifié Google AdSense",
    es: "Socio verificado de Google AdSense",
    zh: "Google AdSense 认证合作伙伴",
    hi: "सत्यापित Google AdSense भागीदार",
    it: "Partner verificato Google AdSense",
    pt: "Parceiro verificado do Google AdSense",
    ja: "Google AdSense 認定パートナー",
    ko: "Google AdSense 인증 파트너",
    nl: "Geverifieerde Google AdSense-partner",
    uz: "Google AdSense tasdiqlangan hamkori",
    id: "Mitra Terverifikasi Google AdSense",
  };
  return map[locale] || "Verified AdSense Partner";
};

const getHideAdLabel = (locale: string) => {
  const map: Record<string, string> = {
    fa: "بستن تبلیغ",
    ps: "اعلان پټول",
    ar: "إخفاء الإعلان",
    ur: "اشتہار چھپائیں",
    ru: "Скрыть рекламу",
    tr: "Reklamı Gizle",
    de: "Werbung ausblenden",
    fr: "Masquer l'annonce",
    es: "Ocultar anuncio",
    zh: "隐藏广告",
    hi: "विज्ञापन छिपाएं",
    it: "Nascondi annuncio",
    pt: "Ocultar anúncio",
    ja: "広告を非表示",
    ko: "광고 숨기기",
    nl: "Advertentie verbergen",
    uz: "Reklamani yashirish",
    id: "Sembunyikan Iklan",
  };
  return map[locale] || "Hide Ad";
};

export default function InFeedNativeAd({ adIndex = 0, currentLocale = "en" }: InFeedNativeAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  if (isDismissed) return null;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#0a0a0f]/85 border border-yellow-500/25 rounded-[2.5rem] p-5 sm:p-8 backdrop-blur-md space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden group"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[1.2rem] bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border-2 border-yellow-500/40 flex items-center justify-center shrink-0 shadow-md">
            <Sparkles size={18} className="text-yellow-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs sm:text-[15px] tracking-wide">
                {t.publicPages?.sponsorBadge || "Google Ads Network"}
              </span>
              <ShieldCheck size={15} className="text-yellow-400" />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                {t.publicPages?.adBadge || "Sponsored"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-neutral-500 hover:text-neutral-300 p-2 transition-colors bg-white/5 rounded-xl hover:bg-white/10"
          title={getHideAdLabel(currentLocale)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Official Google AdSense In-feed Fluid Unit */}
      <div className="w-full overflow-hidden rounded-2xl bg-white/[0.01] border border-white/5 p-2 min-h-[120px] flex items-center justify-center">
        <GoogleAdSenseAd
          key={`infeed-${currentLocale}-${adIndex}`}
          client="ca-pub-6551903544426492"
          slot="6514651420"
          layoutKey="-ac+c5-5i-c8+17e"
          format="fluid"
          style={{ display: "block" }}
        />
      </div>

      <hr className="border-white/5" />

      {/* Footer */}
      <div className="flex items-center justify-between text-neutral-400 text-xs font-bold pt-1">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-yellow-500" />
          <span>{getVerifiedPartnerLabel(currentLocale)}</span>
        </div>
        <span className="text-[10px] text-neutral-500 font-mono">
          ca-pub-6551903544426492
        </span>
      </div>
    </div>
  );
}
