import "../globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import type { Metadata } from "next";
import Script from "next/script";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fa" },
    { locale: "ps" },
    { locale: "ru" },
    { locale: "tr" },
    { locale: "de" },
    { locale: "fr" },
    { locale: "ar" },
    { locale: "ur" },
    { locale: "es" },
    { locale: "zh" },
    { locale: "hi" },
    { locale: "it" },
    { locale: "pt" },
    { locale: "ja" },
    { locale: "ko" },
    { locale: "nl" },
    { locale: "uz" },
    { locale: "id" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params?.locale || "en";
  return {
    alternates: {
      canonical: `https://safiacademy.org/${locale}`,
      languages: {
        en: "https://safiacademy.org/en",
        fa: "https://safiacademy.org/fa",
        ps: "https://safiacademy.org/ps",
        ru: "https://safiacademy.org/ru",
        tr: "https://safiacademy.org/tr",
        de: "https://safiacademy.org/de",
        fr: "https://safiacademy.org/fr",
        ar: "https://safiacademy.org/ar",
        ur: "https://safiacademy.org/ur",
        es: "https://safiacademy.org/es",
        zh: "https://safiacademy.org/zh",
        hi: "https://safiacademy.org/hi",
        it: "https://safiacademy.org/it",
        pt: "https://safiacademy.org/pt",
        ja: "https://safiacademy.org/ja",
        ko: "https://safiacademy.org/ko",
        nl: "https://safiacademy.org/nl",
        uz: "https://safiacademy.org/uz",
        id: "https://safiacademy.org/id",
        "x-default": "https://safiacademy.org/en",
      },
    },
  };
}

export default function DynamicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale || "en";
  const isRtl = ["fa", "ps", "ar", "ur"].includes(locale);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      data-locale={locale}
      className={`w-full h-full ${isRtl ? "font-vazirmatn" : "font-sans"}`}
    >
      <Script
        id="google-adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6551903544426492"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </div>
  );
}
