import "../globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import type { Metadata } from "next";

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
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </div>
  );
}
