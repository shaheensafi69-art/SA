import "../globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import type { Metadata } from "next";

import OrganizationSchema from "@/components/seo/OrganizationSchema";

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
    metadataBase: new URL("https://www.safiacademy.org"),
    alternates: {
      canonical: `https://www.safiacademy.org/${locale}`,
      languages: {
        en: "https://www.safiacademy.org/en",
        fa: "https://www.safiacademy.org/fa",
        ps: "https://www.safiacademy.org/ps",
        ru: "https://www.safiacademy.org/ru",
        tr: "https://www.safiacademy.org/tr",
        de: "https://www.safiacademy.org/de",
        fr: "https://www.safiacademy.org/fr",
        ar: "https://www.safiacademy.org/ar",
        ur: "https://www.safiacademy.org/ur",
        es: "https://www.safiacademy.org/es",
        zh: "https://www.safiacademy.org/zh",
        hi: "https://www.safiacademy.org/hi",
        it: "https://www.safiacademy.org/it",
        pt: "https://www.safiacademy.org/pt",
        ja: "https://www.safiacademy.org/ja",
        ko: "https://www.safiacademy.org/ko",
        nl: "https://www.safiacademy.org/nl",
        uz: "https://www.safiacademy.org/uz",
        id: "https://www.safiacademy.org/id",
        "x-default": "https://www.safiacademy.org/en",
      },
    },
  };
}

export default async function DynamicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale || "en";
  const isRtl = ["fa", "ps", "ar", "ur"].includes(locale);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      data-locale={locale}
      className={`w-full h-full ${isRtl ? "font-vazirmatn" : "font-sans"} text-start`}
    >
      <OrganizationSchema />
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </div>
  );
}
