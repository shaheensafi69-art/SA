import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Tech Reels, Coding Shorts & Micro-Lessons | Safi Academy Reels",
  description: "Watch short vertical educational reels, coding tips, algorithm explanations, language tutorials, and inspirational tech stories created by students and faculty on Safi Academy.",
  keywords: [
    "Educational Reels",
    "Coding Shorts",
    "Tech Micro Lessons",
    "Developer Reels",
    "Safi Academy Reels",
    "Learn Coding Fast"
  ],
  openGraph: {
    title: "Educational Tech Reels, Coding Shorts & Micro-Lessons | Safi Academy Reels",
    description: "Engage with bite-sized video tutorials, software demos, and expert advice on Safi Academy Reels.",
    url: "https://safiacademy.org/en/feed/reels",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Tech Reels, Coding Shorts & Micro-Lessons | Safi Academy Reels",
    description: "Swipe through short-form educational videos, coding tricks, and tech insights on Safi Academy Reels.",
  }
};

export default function ReelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
