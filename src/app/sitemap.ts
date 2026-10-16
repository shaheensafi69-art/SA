import { MetadataRoute } from 'next';
import { locales } from '@/middleware';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600; // بازسازی خودکار نقشه سایت هر یک ساعت

const BASE_URL = 'https://www.safiacademy.org';

const PUBLIC_ROUTES = [
  '',
  '/courses',
  '/scholarships',
  '/blog',
  '/feed',
  '/feed/reels',
  '/feed/network',
  '/founder/shaheen-safi',
  '/hosting',
  '/business-formation',
  '/bank-account-service',
  '/development-services',
  '/store',
  '/donate',
  '/instructor-application',
  '/partners',
  '/about',
  '/contact',
  '/terms',
  '/privacy-policy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ۱. آدرس ریشه اصلی با بالاترین اولویت
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // ۲. تولید آدرس‌های استاتیک برای تمامی ۱۹ زبان با حفظ ساختار
  for (const locale of locales) {
    for (const route of PUBLIC_ROUTES) {
      const isHome = route === '';
      const isHighPriority =
        route === '/courses' ||
        route === '/scholarships' ||
        route === '/blog' ||
        route === '/founder/shaheen-safi';
      const isServices =
        route === '/hosting' ||
        route === '/business-formation' ||
        route === '/bank-account-service' ||
        route === '/development-services';

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: isHome || isHighPriority ? 'daily' : isServices ? 'weekly' : 'monthly',
        priority: isHome ? 1.0 : isHighPriority ? 0.95 : isServices ? 0.85 : 0.75,
      });
    }
  }

  // ۳. واکشی داینامیک دوره‌ها، بورسیه‌ها و مقالات از دیتابیس Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // واکشی دوره‌ها
      const { data: courses } = await supabase
        .from('courses')
        .select('id, created_at, updated_at');

      if (courses && courses.length > 0) {
        for (const course of courses) {
          const modDate = course.updated_at ? new Date(course.updated_at) : currentDate;
          // ثبت برای زبان‌های اصلی و محلی
          for (const locale of ['en', 'fa', 'ps']) {
            sitemapEntries.push({
              url: `${BASE_URL}/${locale}/courses/${course.id}`,
              lastModified: modDate,
              changeFrequency: 'weekly',
              priority: 0.9,
            });
          }
        }
      }

      // واکشی بورسیه‌های تحصیلی فعال
      const { data: scholarships } = await supabase
        .from('scholarships')
        .select('slug, language, created_at, updated_at')
        .eq('is_active', true);

      if (scholarships && scholarships.length > 0) {
        for (const item of scholarships) {
          const itemLocale = item.language || 'en';
          const modDate = item.updated_at ? new Date(item.updated_at) : currentDate;

          sitemapEntries.push({
            url: `${BASE_URL}/${itemLocale}/scholarships/${item.slug}`,
            lastModified: modDate,
            changeFrequency: 'daily',
            priority: 0.9,
          });

          // اگر زبان مقاله انگلیسی است، برای زبان‌های منطقه هم ثبت شود تا ایندکس سریع‌تر شود
          if (itemLocale === 'en') {
            sitemapEntries.push({
              url: `${BASE_URL}/fa/scholarships/${item.slug}`,
              lastModified: modDate,
              changeFrequency: 'daily',
              priority: 0.85,
            });
            sitemapEntries.push({
              url: `${BASE_URL}/ps/scholarships/${item.slug}`,
              lastModified: modDate,
              changeFrequency: 'daily',
              priority: 0.85,
            });
          }
        }
      }

      // واکشی مقالات منتشر شده وبلاگ
      const { data: blogs } = await supabase
        .from('blogs')
        .select('slug, language, created_at, updated_at')
        .eq('is_published', true);

      if (blogs && blogs.length > 0) {
        for (const blog of blogs) {
          const blogLocale = blog.language || 'en';
          const modDate = blog.updated_at ? new Date(blog.updated_at) : currentDate;

          sitemapEntries.push({
            url: `${BASE_URL}/${blogLocale}/blog/${blog.slug}`,
            lastModified: modDate,
            changeFrequency: 'weekly',
            priority: 0.85,
          });

          if (blogLocale === 'en') {
            sitemapEntries.push({
              url: `${BASE_URL}/fa/blog/${blog.slug}`,
              lastModified: modDate,
              changeFrequency: 'weekly',
              priority: 0.8,
            });
          }
        }
      }
    } catch (e) {
      console.warn('Notice: sitemap dynamic database fetch fallback handled', e);
    }
  }

  return sitemapEntries;
}
