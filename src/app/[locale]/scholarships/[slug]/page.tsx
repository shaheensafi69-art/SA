import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ScholarshipDetailClient, { Scholarship } from "./ScholarshipDetailClient";

export const revalidate = 3600; // 1-hour ISR cache for sub-100ms response time

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }> | { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = await Promise.resolve(params);
  const currentLocale = locale || "en";
  const supabase = await createClient();

  let { data: item } = await supabase
    .from("scholarships")
    .select("title, description, cover_image, country, university, degree_level")
    .eq("language", currentLocale)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!item) {
    const fb = await supabase
      .from("scholarships")
      .select("title, description, cover_image, country, university, degree_level")
      .eq("language", "en")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    if (fb.data) item = fb.data;
  }

  if (!item) {
    return {
      title: "Scholarship Details | Safi Academy",
      description: "Explore verified international scholarships, fellowships, and academic grants on Safi Academy.",
    };
  }

  const cleanDescription = item.description
    ? item.description.replace(/[#*`_\[\]()]/g, "").slice(0, 160).trim()
    : "Verified international scholarship and academic opportunity at Safi Academy.";

  const pageUrl = `https://www.safiacademy.org/${currentLocale}/scholarships/${slug}`;
  const ogImage = item.cover_image || "https://www.safiacademy.org/career-academies-banner.webp";

  return {
    title: `${item.title} | Safi Academy`,
    description: cleanDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${item.title} | Safi Academy`,
      description: cleanDescription,
      url: pageUrl,
      siteName: "Safi Academy",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Safi Academy`,
      description: cleanDescription,
      images: [ogImage],
    },
  };
}

export default async function ScholarshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }> | { slug: string; locale: string };
}) {
  const { slug, locale } = await Promise.resolve(params);
  const currentLocale = locale || "en";
  const supabase = await createClient();

  let { data: scholarship } = await supabase
    .from("scholarships")
    .select("*")
    .eq("language", currentLocale)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!scholarship) {
    const fb = await supabase
      .from("scholarships")
      .select("*")
      .eq("language", "en")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    if (fb.data) scholarship = fb.data;
  }

  if (!scholarship) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": scholarship.title,
    "description": scholarship.description?.slice(0, 300),
    "credentialCategory": scholarship.degree_level || "Scholarship & Fellowship",
    "recognizedBy": {
      "@type": "EducationalOrganization",
      "name": scholarship.university || scholarship.country || "International Academic Institution",
      "address": scholarship.country || "Global"
    },
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://www.safiacademy.org/#organization",
      "name": "Safi Academy",
      "url": "https://www.safiacademy.org"
    },
    "image": scholarship.cover_image || "https://www.safiacademy.org/hero.png",
    "url": `https://www.safiacademy.org/${currentLocale}/scholarships/${slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScholarshipDetailClient
        initialScholarship={scholarship as Scholarship}
        locale={currentLocale}
      />
    </>
  );
}