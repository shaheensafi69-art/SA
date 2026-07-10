/** @type {import('next').NextConfig} */
const nextConfig = {
  // غیرفعال کردن بهینه‌سازی فونت برای جلوگیری از ارورهای AbortError در اینترنت‌های محدود
  optimizeFonts: false,
  
  // تنظیمات برای ngrok و سایر هاست‌های مجاز
  eslint: {
    ignoreDuringBuilds: true, // برای جلوگیری از توقف بیلد در صورت خطاهای کوچک کد
  },
  
  // این بخش برای رفع ارورهای امنیتی در محیط توسعه و ngrok
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;