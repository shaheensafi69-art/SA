import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Tech, Business & Academic Insights Blog | Safi Academy",
  description: "Read expert analyses, authoritative guides on UK company formation, international scholarships, artificial intelligence breakthroughs, and global career roadmaps.",
  keywords: [
    "Safi Academy Blog",
    "UK Company Formation Guides",
    "Tech Tutorials & Articles",
    "International Education Insights",
    "Global Scholarship Guides",
    "Software Architecture Articles"
  ],
  openGraph: {
    title: "Global Tech, Business & Academic Insights Blog | Safi Academy",
    description: "Read expert analyses, authoritative guides on UK company formation, tech ecosystems, and international careers.",
    url: "https://safiacademy.org/en/blog",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Tech, Business & Academic Insights Blog | Safi Academy",
    description: "Expert insights, step-by-step corporate tutorials, and technology articles from Safi Academy researchers.",
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
