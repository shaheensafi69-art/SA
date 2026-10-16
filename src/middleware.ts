import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const locales = [
  'en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur',
  'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id'
] as const;
export type Locale = typeof locales[number];
export const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  // ۱. ریدایرکت دائمی 301 از دامنه بدون www به نسخه دارای www
  const host = request.headers.get('host') || '';
  if (host === 'safiacademy.org') {
    return NextResponse.redirect(
      `https://www.safiacademy.org${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  const { pathname } = request.nextUrl;

  // ۲. عبور فوری فایل‌های استاتیک، فایل‌های عمومی و APIها بدون سربار و تاخیر
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth/callback') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/app-ads.txt' ||
    pathname === '/ads.txt' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // ۳. هدایت صفحه ریشه به لوکال پیش‌فرض
  if (pathname === '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(redirectUrl);
  }

  // ۴. هدایت مسیرهای بدون لوکال با حفظ کامل پارامترها
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const currentLocale = pathname.split('/')[1] || defaultLocale;

  // ۵. تعیین وضعیت مسیرهای محافظت‌شده در برابر مسیرهای عمومی
  const isTeacherOnboarding = pathname.includes('/teacher-onboarding') || pathname.includes('/teacher-register');
  const isAuthPage = (pathname.includes('/login') || pathname.includes('/register')) && !isTeacherOnboarding;
  const isAdminRoute = pathname.includes('/admin');
  const isTeacherRoute = (pathname === `/${currentLocale}/teacher` || pathname.startsWith(`/${currentLocale}/teacher/`)) && !isTeacherOnboarding;
  const isStudentRoute = pathname.includes('/dashboard');

  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  // 🚀 بهینه‌سازی حیاتی سرعت: صفحات عمومی (خانه، دوره‌ها، بورسیه‌ها، بلاگ و ...) نیازی به اتصال شبکه به Supabase در میدلور ندارند
  // این تغییر زمان پاسخگویی صفحات عمومی را از 800ms به زیر 10ms کاهش می‌دهد!
  if (!isProtectedRoute && !isAuthPage) {
    return NextResponse.next({
      request: { headers: request.headers },
    });
  }

  // ۶. برای مسیرهای پنل کاربری یا ورود، احراز هویت را بررسی کن
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  // اگر کاربر مهمان است و می‌خواهد به صفحات محافظت‌شده برود -> لاگین
  if (!user && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${currentLocale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student';

    const getCorrectDashboardRoot = () => {
      if (userRole === 'super_admin' || userRole === 'admin') return `/${currentLocale}/admin`;
      if (userRole === 'teacher') return `/${currentLocale}/teacher`;
      return `/${currentLocale}/dashboard`;
    };

    if (isAuthPage) {
      return NextResponse.redirect(new URL(getCorrectDashboardRoot(), request.url));
    }

    if (isAdminRoute && userRole !== 'super_admin' && userRole !== 'admin') {
      return NextResponse.redirect(new URL(getCorrectDashboardRoot(), request.url));
    }
    if (isTeacherRoute && userRole !== 'teacher' && userRole !== 'super_admin') {
      return NextResponse.redirect(new URL(getCorrectDashboardRoot(), request.url));
    }
    if (isStudentRoute && (userRole === 'super_admin' || userRole === 'admin' || userRole === 'teacher')) {
      return NextResponse.redirect(new URL(getCorrectDashboardRoot(), request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|app-ads\\.txt|ads\\.txt|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json|txt)$).*)',
  ],
};