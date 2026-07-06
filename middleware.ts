import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // ۱. ساخت پاسخ اولیه
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // ۲. راه‌اندازی کلاینت سوپابیس برای میدلور (SSR)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // ۳. بررسی وضعیت لاگین (گرفتن کاربر)
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // =========================================================================
  // قوانین دسترسی (Access Control)
  // =========================================================================

  // لیست مسیرهایی که نیاز به لاگین دارند (محافظت شده‌اند)
  const isProtectedRoute = 
    pathname.startsWith('/en/dashboard') || 
    pathname.startsWith('/en/admin') || 
    pathname.startsWith('/en/teacher');

  // اگر مسیر محافظت شده است اما کاربر لاگین نکرده -> هدایت به صفحه لاگین
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/en/login';
    // در صورت تمایل می‌توانید مسیر قبلی را هم در URL نگه دارید تا بعد از لاگین به همانجا برگردد
    // url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // اگر کاربر لاگین کرده بود، نقش او را از جدول profiles می‌خوانیم
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student'; // اگر نقشی نداشت، به طور پیش‌فرض دانشجو در نظر گرفته می‌شود

    // قانون ۱: ورود به بخش ادمین فقط برای super_admin
    if (pathname.startsWith('/en/admin') && userRole !== 'super_admin') {
      const url = request.nextUrl.clone();
      // بر اساس نقش به داشبورد مناسب هدایتش می‌کنیم
      url.pathname = userRole === 'teacher' ? '/en/teacher' : '/en/dashboard';
      return NextResponse.redirect(url);
    }

    // قانون ۲: ورود به بخش اساتید فقط برای teacher (یا super_admin)
    if (pathname.startsWith('/en/teacher') && userRole !== 'teacher' && userRole !== 'super_admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/en/dashboard';
      return NextResponse.redirect(url);
    }

    // قانون ۳ (اختیاری): جلوگیری از ورود ادمین و استاد به داشبورد معمولی دانشجویان
    // اگر می‌خواهید ادمین هم نتواند پنل دانشجو را ببیند (یا برعکس او را به پنل ادمین هدایت کنید)
    if (pathname.startsWith('/en/dashboard')) {
        if(userRole === 'super_admin') {
             const url = request.nextUrl.clone();
             url.pathname = '/en/admin';
             return NextResponse.redirect(url);
        }
        if(userRole === 'teacher') {
             const url = request.nextUrl.clone();
             url.pathname = '/en/teacher';
             return NextResponse.redirect(url);
        }
    }
  }

  return response;
}

// ۴. تنظیم اینکه این میدلور روی کدام مسیرها اجرا شود
export const config = {
  matcher: [
    /*
     * روی تمام مسیرها اجرا شود به جز:
     * - _next/static (فایل‌های ثابت)
     * - _next/image (تصاویر بهینه‌شده)
     * - favicon.ico (آیکون مرورگر)
     * - مسیرهای API (چون خود API باید امنیتش را چک کند)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};