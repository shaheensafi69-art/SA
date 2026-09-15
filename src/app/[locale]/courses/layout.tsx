import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accredited Professional Courses & Masterclasses | Safi Academy",
  description: "Explore industry-leading online courses and masterclasses in Software Engineering, AI, Web3, Cyber Security, and Digital Entrepreneurship with verified certifications from Safi Academy.",
  keywords: [
    "Safi Academy Courses",
    "Online Programming Masterclasses",
    "AI and Machine Learning Courses",
    "Full-Stack Web Development",
    "Accredited Tech Certifications",
    "Learn Coding Online",
    "Professional Career Education"
  ],
  openGraph: {
    title: "Accredited Professional Courses & Masterclasses | Safi Academy",
    description: "Explore industry-leading online courses and masterclasses with verified certifications from Safi Academy.",
    url: "https://safiacademy.org/en/courses",
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accredited Professional Courses & Masterclasses | Safi Academy",
    description: "Upgrade your skills with elite tech courses, live mentoring, and accredited diplomas from Safi Academy.",
  }
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
