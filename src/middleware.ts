import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// زبان‌هایی که سایت Safi Academy پشتیبانی می‌کند
const locales = ['en', 'fa'];
const defaultLocale = 'en';

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
  // بدون توجه به زبان مرورگر یا سیستم‌عامل کاربر، او را مستقیماً به انگلیسی (en) می‌فرستیم
  request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

// این بخش به نکست‌جی‌اس می‌گوید که میدلور را روی چه فایل‌هایی اجرا نکند
// (ما نمی‌خواهیم فایل‌های عکس، فونت یا کدهای سیستمی ریدایرکت شوند)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|manifest.json|icon.png|favicon.ico|.*\\..*).*)',
  ],
};