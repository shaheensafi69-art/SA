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
  layoutKey?: string;
  className?: string;
}

const getPartnerSubLabel = (locale: string) => {
  const map: Record<string, string> = {
    fa: "محتوای تاییدشده اکوسیستم همکار",
    ps: "د تایید شوي ایکوسیستم ملګري محتوا",
    ar: "محتوى موثق من شركاء المنظومة",
    ur: "تصدیق شدہ ایکو سسٹم پارٹنر مواد",
    ru: "Проверенный контент партнерской экосистемы",
    tr: "Doğrulanmış Ekosistem Ortak İçeriği",
    de: "Verifizierte Inhalte von Ökosystem-Partnern",
    fr: "Contenu vérifié des partenaires de l'écosystème",
    es: "Contenido verificado de socios del ecosistema",
    zh: "生态系统合作伙伴认证内容",
    hi: "सत्यापित इकोसिस्टम भागीदार सामग्री",
    it: "Contenuti verificati dei partner dell'ecosistema",
    pt: "Conteúdo verificado de parceiros do ecossistema",
    ja: "認証済みエコシステムパートナーコンテンツ",
    ko: "인증된 에코시스템 파트너 콘텐츠",
    nl: "Geverifieerde content van ecosysteempartners",
    uz: "Tasdiqlangan ekotizim hamkori kontenti",
    id: "Konten Mitra Ekosistem Terverifikasi",
  };
  return map[locale] || "Verified Educational & Corporate Partner";
};

const getFallbackDescription = (locale: string) => {
  const map: Record<string, string> = {
    fa: "فرصت‌های شغلی، بورسیه‌های بین‌المللی و ابزارهای فناوری متناسب با مسیر یادگیری شما.",
    ps: "ستاسو د زده کړې لارې لپاره تایید شوي کاري فرصتونه او نړیوال بورسونه.",
    ar: "فرص وظيفية وتكنولوجية متميزة موجهة لرواد الأعمال والمهندسين حول العالم.",
    ur: "آپ کے سیکھنے کے سفر کے مطابق روزگار کے مواقع اور بین الاقوامی وظائف۔",
    ru: "Карьерные возможности, международные стипендии и инструменты для вашего обучения.",
    tr: "Öğrenme yolculuğunuza özel kariyer fırsatları, uluslararası burslar ve teknoloji araçları.",
    de: "Karrieremöglichkeiten, internationale Stipendien und Technologie-Tools für Ihren Lernweg.",
    fr: "Opportunités de carrière, bourses internationales et outils technologiques pour votre parcours.",
    es: "Oportunidades profesionales, becas internacionales y herramientas de aprendizaje.",
    zh: "量身定制的职业机会、国际奖学金及前沿技术工具。",
    hi: "आपके सीखने के मार्ग के अनुकूल करियर अवसर, अंतर्राष्ट्रीय छात्रवृत्तियां और तकनीकी उपकरण।",
    it: "Opportunità di carriera, borse di studio internazionali e strumenti tecnologici per te.",
    pt: "Oportunidades de carreira, bolsas de estudo internacionais e ferramentas de tecnologia.",
    ja: "学習パスに合わせたキャリア機会、国際奨学金、テクノロジーツール。",
    ko: "학습 여정에 맞춘 커리어 기회, 국제 장학금 및 기술 도구.",
    nl: "Carrièremogelijkheden, internationale beurzen en technologische hulpmiddelen.",
    uz: "O'quv yo'lingizga mos martaba imkoniyatlari, xalqaro stipendiyalar va texnologiyalar.",
    id: "Peluang karier, beasiswa internasional, dan alat teknologi yang disesuaikan untuk Anda.",
  };
  return map[locale] || "Discover premier career opportunities, international fintech tools, and global technology partnerships.";
};

const getPrivacyStandardLabel = (locale: string) => {
  const map: Record<string, string> = {
    fa: "سیاست حفظ حریم خصوصی آکادمی صافی",
    ps: "د صافي اکاډمۍ د محرمیت تګلاره",
    ar: "معيار الإعلانات الآمنة في أكاديمية صافي",
    ur: "صافی اکیڈمی کا محفوظ اشتہاری معیار",
    ru: "Стандарт безопасной рекламы Safi Academy",
    tr: "Safi Academy Güvenli Reklam Standardı",
    de: "Safi Academy Standard für sichere Werbung",
    fr: "Norme de publicité sécurisée de Safi Academy",
    es: "Estándar de publicidad segura de Safi Academy",
    zh: "Safi Academy 安全广告准则",
    hi: "साफ़ी अकादमी सुरक्षित विज्ञापन मानक",
    it: "Standard di pubblicità sicura di Safi Academy",
    pt: "Padrão de publicidade segura da Safi Academy",
    ja: "Safi Academy 安全な広告基準",
    ko: "Safi Academy 안전한 광고 기준",
    nl: "Safi Academy veilige advertentiestandaard",
    uz: "Safi Academy xavfsiz reklama standarti",
    id: "Standar Iklan Aman Safi Academy",
  };
  return map[locale] || "Safi Academy Safe Advertising Standard";
};

export default function GoogleAdCard({
  currentLocale = "en",
  slotId = "6514651420",
  layoutKey = "-ac+c5-5i-c8+17e",
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
  }, [slotId, currentLocale]);

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
                {t.publicPages?.sponsorBadge || "Safi Academy Partner"}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-black uppercase tracking-widest">
                {t.publicPages?.adBadge || "Sponsored"}
              </span>
            </div>
            <p className="text-neutral-400 text-xs mt-0.5">
              {getPartnerSubLabel(currentLocale)}
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
          key={`adcard-${currentLocale}-${slotId}`}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-6551903544426492"
          data-ad-slot={slotId}
          data-ad-format="fluid"
          data-ad-layout-key={layoutKey}
        />

        {/* Fallback presentation if Ad is awaiting impressions or in test */}
        <div className="p-6 text-center max-w-md mx-auto pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mb-2">
            <CheckCircle2 size={12} />
            {t.publicPages?.sponsorBadge || "Global Network Partner"}
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {getFallbackDescription(currentLocale)}
          </p>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-[11px] text-neutral-400 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          {getPrivacyStandardLabel(currentLocale)}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
          Google AdSense Verified
        </span>
      </div>
    </div>
  );
}
