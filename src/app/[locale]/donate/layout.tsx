import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "en";
  const dict = getDictionary(currentLocale);
  const dt = (dict as any)?.donate;

  const title = dt?.heroTitle1 && dt?.heroTitle2
    ? `${dt.heroTitle1} ${dt.heroTitle2} | Safi Academy`
    : "Support Global Education & Student Aid | Donate to Safi Academy";

  const description = dt?.heroDesc1 ||
    "Join our global philanthropic mission to provide free technology education, verified certificates, and academic laptops to underprivileged students and girls worldwide.";

  return {
    title,
    description,
    keywords: [
      "Donate Safi Academy",
      dt?.tabBank || "Bank Transfer",
      dt?.heroBadge || "Education Charity",
      dt?.boxTitle || "Sponsor a Student",
      "Global Student Scholarships Fund",
      "Tech Education Philanthropy",
      "Non-Profit Educational Impact"
    ],
    openGraph: {
      title,
      description,
      url: `https://safiacademy.org/${currentLocale}/donate`,
      siteName: "Safi Academy",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
