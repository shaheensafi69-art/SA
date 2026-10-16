import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true,
  swcMinify: true,
  optimizeFonts: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800, // 7 days
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // یکپارچه‌سازی هاست و ریدایرکت 301 دائمی از دامنه بدون www به www
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "safiacademy.org",
          },
        ],
        destination: "https://www.safiacademy.org/:path*",
        permanent: true,
      },
    ];
  },

  // هدرهای بهینه‌سازی سرعت و کش در زیر 100 میلی‌ثانیه
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(company|flags|par|team|career-academies-banner.webp|hero.png|logo.png|manifest.json)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);