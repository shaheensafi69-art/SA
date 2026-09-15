import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "en";
  return {
  title: "Teach With Us - Apply as Certified Faculty Instructor | Safi Academy",
  description: "Join the global faculty of Safi Academy. Teach software engineering, AI, languages, or business, reach thousands of ambitious students worldwide, and earn competitive academic compensation.",
  keywords: [
    "Safi Academy Teach With Us",
    "Instructor Application",
    "Online Teaching Jobs",
    "Become a Tech Tutor",
    "Safi Academy Faculty Onboarding",
    "Teach Coding Online"
  ],
  openGraph: {
    title: "Teach With Us - Apply as Certified Faculty Instructor | Safi Academy",
    description: "Join our distinguished global faculty and mentor the next generation of digital leaders and engineers.",
    url: `https://safiacademy.org/${currentLocale}/instructor-application`,
    siteName: "Safi Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teach With Us - Apply as Certified Faculty Instructor | Safi Academy",
    description: "Apply to become a verified instructor at Safi Academy and teach students across 50+ countries.",
  }
};
}

export default function InstructorApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
