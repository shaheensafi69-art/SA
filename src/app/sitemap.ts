import { MetadataRoute } from 'next';
import { locales } from '@/middleware';

const BASE_URL = 'https://www.safiacademy.org';

const PUBLIC_ROUTES = [
  '',
  '/feed',
  '/feed/reels',
  '/feed/network',
  '/blog',
  '/scholarships',
  '/donate',
  '/instructor-application',
  '/store',
  '/business-formation',
  '/hosting',
  '/development-services',
  '/bank-account-service',
  '/partners',
  '/about',
  '/contact',
  '/terms',
  '/privacy-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root entry
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Entries for each of the 19 supported languages
  for (const locale of locales) {
    for (const route of PUBLIC_ROUTES) {
      const isHome = route === '';
      const isHighPriority = route === '/feed' || route === '/blog' || route === '/scholarships';
      const isServices = route === '/hosting' || route === '/business-formation' || route === '/partners';

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: isHighPriority ? 'daily' : isServices ? 'weekly' : 'monthly',
        priority: isHome ? 1.0 : isHighPriority ? 0.9 : isServices ? 0.8 : 0.7,
      });
    }
  }

  return sitemapEntries;
}
