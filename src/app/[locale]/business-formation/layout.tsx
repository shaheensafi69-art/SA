import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Business Formation & Registered Agent Services | Safi Academy",
  description: "Form your US LLC or Corporation across all 50 states. Learn about professional registered agent representation, founder address privacy where permitted by law, state compliance, and FinCEN BOI guidance.",
  keywords: [
    "US Business Formation",
    "Registered Agent Services",
    "LLC Formation",
    "Corporation Setup",
    "Delaware LLC",
    "Wyoming LLC",
    "Safi Academy",
    "Registered Agents Inc",
    "Entity Compliance"
  ],
  openGraph: {
    title: "US Business Formation & Registered Agent Services | Safi Academy",
    description: "Form your US LLC or Corporation across all 50 states. Professional registered agent representation, address privacy where permitted by law, and entity compliance support.",
    url: "https://safiacademy.com/en/business-formation",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Business Formation & Registered Agent Services | Safi Academy",
    description: "Form your US LLC or Corporation across all 50 states with trusted registered agent representation and corporate compliance guidance.",
  }
};

export default function BusinessFormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
