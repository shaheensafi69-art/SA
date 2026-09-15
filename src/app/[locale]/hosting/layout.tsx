import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "en";
  return {
  title: "Cloud Hosting Deals, High-Speed NVMe & VPS Solutions | Safi Academy",
  description: "Access high-performance enterprise cloud hosting, NVMe web hosting, dedicated VPS servers, and exclusive developer domain promotions curated by Safi Academy.",
  keywords: [
    "Safi Academy Hosting Deals",
    "Cloud NVMe Hosting",
    "Developer VPS Servers",
    "Affordable Web Hosting Deals",
    "Fast WordPress Hosting",
    "Student Developer Cloud Promos"
  ],
  openGraph: {
    title: "Cloud Hosting Deals, High-Speed NVMe & VPS Solutions | Safi Academy",
    description: "Get lightning-fast cloud hosting, SSD servers, and exclusive developer deals verified by Safi Academy engineers.",
    url: `https://safiacademy.org/${currentLocale}/hosting`,
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Hosting Deals, High-Speed NVMe & VPS Solutions | Safi Academy",
    description: "Enterprise NVMe hosting, high-uptime VPS, and exclusive infrastructure deals for students and founders.",
  }
};
}

export default function HostingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
