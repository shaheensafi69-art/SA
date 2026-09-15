import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "en";
  return {
  title: "Custom Enterprise Software & Web Development Services | Safi Academy",
  description: "Accelerate your enterprise with Safi Academy's engineering team: custom web applications, cross-platform mobile apps, cloud architecture, AI automation, and cybersecurity auditing.",
  keywords: [
    "Safi Academy Development Services",
    "Custom Web Development",
    "Next.js Enterprise Applications",
    "Mobile App Development iOS Android",
    "AI Agent Integration",
    "Full-Stack Software Agency"
  ],
  openGraph: {
    title: "Custom Enterprise Software & Web Development Services | Safi Academy",
    description: "High-grade custom software engineering, mobile development, and enterprise cloud solutions built by Safi Academy.",
    url: `https://safiacademy.org/${currentLocale}/development-services`,
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Enterprise Software & Web Development Services | Safi Academy",
    description: "Full-cycle software development, bespoke cloud infrastructure, and AI engineering for global startups and enterprises.",
  }
};
}

export default function DevelopmentServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
