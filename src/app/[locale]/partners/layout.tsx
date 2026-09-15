import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "en";
  return {
  title: "Strategic Global Academic, Cloud & Industry Partners | Safi Academy",
  description: "Discover Safi Academy's global network of accreditation partners, cloud providers, educational bodies, and industry leaders advancing world-class education worldwide.",
  keywords: [
    "Safi Academy Partners",
    "Academic Accreditation Partners",
    "Cloud Infrastructure Alliances",
    "Credly Accredible Verification",
    "Global Education Alliance",
    "EdTech Institutional Partners"
  ],
  openGraph: {
    title: "Strategic Global Academic, Cloud & Industry Partners | Safi Academy",
    description: "Partnering with world-leading educational organizations and technology innovators to empower global learners.",
    url: `https://safiacademy.org/${currentLocale}/partners`,
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Global Academic, Cloud & Industry Partners | Safi Academy",
    description: "Our accredited institutional and industry partners powering credentials, certificates, and student opportunities.",
  }
};
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
