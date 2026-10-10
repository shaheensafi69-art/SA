"use client";

import React, { useState } from "react";
import { Sparkles, X, ShieldCheck } from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";
import AdsterraNativeBanner from "./AdsterraNativeBanner";

interface InFeedNativeAdProps {
  adIndex?: number;
  currentLocale?: string;
}

const getVerifiedPartnerLabel = (locale: string) => {
  const map: Record<string, string> = {
    fa: "همکار رسمی شبکه تبلیغات",
    ps: "د تبلیغاتي شبکې رسمي ملګری",
    ar: "شريك معتمد في شبكة الإعلانات",
    ur: "تصدیق شدہ اشتہاری نیٹ ورک پارٹنر",
    ru: "Проверенный партнер рекламной сети",
    tr: "Doğrulanmış Reklam Ağı İş Ortağı",
    de: "Verifizierter Werbepartner",
    fr: "Partenaire publicitaire vérifié",
    es: "Socio publicitario verificado",
    zh: "认证广告网络合作伙伴",
    hi: "सत्यापित विज्ञापन नेटवर्क भागीदार",
    it: "Partner di rete pubblicitaria verificato",
    pt: "Parceiro verificado da rede de anúncios",
    ja: "認定広告ネットワークパートナー",
    ko: "인증된 광고 네트워크 파트너",
    nl: "Geverifieerde advertentienetwerkpartner",
    uz: "Tasdiqlangan reklama tarmog'i hamkori",
    id: "Mitra Jaringan Iklan Terverifikasi",
  };
  return map[locale] || "Verified Partner Network";
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
                {t.publicPages?.sponsorBadge || "Partner Recommendations"}
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

      {/* Native Banner Unit */}
      <div className="w-full overflow-hidden rounded-2xl bg-white/[0.01] border border-white/5 p-2 min-h-[100px] flex items-center justify-center">
        <AdsterraNativeBanner
          key={`infeed-${currentLocale}-${adIndex}`}
          minimal={true}
          category="Student Community & Academic Feed"
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
          Native Banner 4:1
        </span>
      </div>
    </div>
  );
}
