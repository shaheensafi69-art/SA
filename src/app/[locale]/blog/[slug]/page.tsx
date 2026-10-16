import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import BlogDetailClient, { BlogPost } from "./BlogDetailClient";

export const revalidate = 3600; // 1-hour ISR cache for sub-100ms delivery

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }> | { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = await Promise.resolve(params);
  const currentLocale = locale || "en";
  const supabase = await createClient();

  let { data: post } = await supabase
    .from("blogs")
    .select("title, content, cover_image, category, author_name, created_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!post) {
    return {
      title: "Article | Safi Academy Insights",
      description: "Read technical insights, educational analyses, and tutorials from Safi Academy.",
    };
  }

  const cleanDescription = post.content
    ? post.content.replace(/[#*`_\[\]()]/g, "").slice(0, 160).trim()
    : "Comprehensive article and insights on modern technology from Safi Academy.";

  const pageUrl = `https://www.safiacademy.org/${currentLocale}/blog/${slug}`;
  const ogImage = post.cover_image || "https://www.safiacademy.org/hero.png";

  return {
    title: `${post.title} | Safi Academy Insights`,
    description: cleanDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${post.title} | Safi Academy Insights`,
      description: cleanDescription,
      url: pageUrl,
      siteName: "Safi Academy",
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author_name || "Shaheen Safi"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Safi Academy`,
      description: cleanDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }> | { slug: string; locale: string };
}) {
  const { slug, locale } = await Promise.resolve(params);
  const currentLocale = locale || "en";
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content?.slice(0, 200).replace(/[#*`_]/g, ""),
    "image": [post.cover_image || "https://www.safiacademy.org/hero.png"],
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.author_name || "Shaheen Safi",
      "url": "https://www.safiacademy.org/en/founder/shaheen-safi"
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "@id": "https://www.safiacademy.org/#organization",
      "name": "Safi Academy",
      "url": "https://www.safiacademy.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.safiacademy.org/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.safiacademy.org/${currentLocale}/blog/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient initialPost={post as BlogPost} locale={currentLocale} />
    </>
  );
}