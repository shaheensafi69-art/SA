import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// زبان‌هایی که سایت Safi Academy پشتیبانی می‌کند
const locales = ['en', 'fa'];
const defaultLocale = 'en';

// تابع هوشمند برای خواندن زبان مرورگر/کشور کاربر
function getPreferredLocale(request: NextRequest): string {
  // خواندن هدر زبان از درخواست کاربر
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // اگر مرورگر کاربر تنظیمات فارسی یا ایران/افغانستان داشته باشد
  if (acceptLanguage.includes('fa') || acceptLanguage.includes('fa-IR') || acceptLanguage.includes('fa-AF')) {
    return 'fa';
  }
  
  // در غیر این صورت، زبان پیش‌فرض (انگلیسی) انتخاب می‌شود
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. بررسی می‌کنیم که آیا کاربر همین الان در پوشه en یا fa هست؟
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // اگر در مسیر درستی بود، اجازه می‌دهیم سایت لود شود
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // ۲. اگر کاربر آدرس اصلی سایت (بدون زبان) را وارد کرده بود:
  // زبان او را تشخیص می‌دهیم
  const locale = getPreferredLocale(request);
  
  // او را به آدرس جدید (همراه با زبان) منتقل (Redirect) می‌کنیم
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

// این بخش به نکست‌جی‌اس می‌گوید که میدلور را روی چه فایل‌هایی اجرا نکند
// (ما نمی‌خواهیم فایل‌های عکس، فونت یا کدهای سیستمی ریدایرکت شوند)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};