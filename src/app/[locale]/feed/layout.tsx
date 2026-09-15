import type { Metadata } from "next";
import FeedClientLayout from "./FeedClientLayout";

export const metadata: Metadata = {
  title: "Student Community Feed & Academic Social Stream | Safi Academy",
  description: "Connect with global students, tech enthusiasts, and mentors. Share projects, discover learning discussions, and grow your academic network on Safi Academy Community Feed.",
  keywords: [
    "Safi Academy Feed",
    "Student Social Network",
    "Developer Community",
    "Coding Discussions",
    "Peer Learning Network",
    "Academic Social Stream"
  ],
  openGraph: {
    title: "Student Community Feed & Academic Social Stream | Safi Academy",
    description: "Connect with global students, tech enthusiasts, and mentors on the Safi Academy community feed.",
    url: "https://safiacademy.org/en/feed",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Community Feed & Academic Social Stream | Safi Academy",
    description: "Join discussions, share code breakthroughs, and network with global peers on Safi Academy Feed.",
  }
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FeedClientLayout>{children}</FeedClientLayout>;
}