import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified International Scholarships & Fellowships 2026-2027 | Safi Academy",
  description: "Browse fully funded international scholarships, government quotas, and university fellowships across Europe, North America, Asia, and Russia with verified deadlines and application support.",
  keywords: [
    "International Scholarships 2026",
    "Fully Funded Scholarships",
    "Study in Europe Scholarships",
    "Undergraduate and Master Fellowships",
    "PhD Funded Programs",
    "Safi Academy Scholarship Portal"
  ],
  openGraph: {
    title: "Verified International Scholarships & Fellowships 2026-2027 | Safi Academy",
    description: "Browse fully funded scholarships across Europe, Americas, and Asia with step-by-step guidance from Safi Academy.",
    url: "https://safiacademy.org/en/scholarships",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified International Scholarships & Fellowships 2026-2027 | Safi Academy",
    description: "Discover verified fully-funded government scholarships and university grants worldwide.",
  }
};

export default function ScholarshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
