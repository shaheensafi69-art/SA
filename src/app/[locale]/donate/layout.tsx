import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Global Education & Student Aid | Donate to Safi Academy",
  description: "Join our global philanthropic mission to provide free technology education, verified certificates, and academic laptops to underprivileged students and girls worldwide.",
  keywords: [
    "Donate Safi Academy",
    "Support Education Equity",
    "Global Student Scholarships Fund",
    "Charity for Afghan Girls Education",
    "Tech Education Philanthropy",
    "Non-Profit Educational Impact"
  ],
  openGraph: {
    title: "Support Global Education & Student Aid | Donate to Safi Academy",
    description: "Empower underserved students and Afghan girls with free world-class education and verified digital skills.",
    url: "https://safiacademy.org/en/donate",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Global Education & Student Aid | Donate to Safi Academy",
    description: "Your donation directly funds free education, verified diplomas, and scholarships for disadvantaged youth.",
  }
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
