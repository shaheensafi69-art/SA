import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'fr', 'ps', 'ur', 'fa', 'de'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚫 فیلتر مهم: درخواست‌های API، مسیر کالبک احراز هویت و فایل‌های استاتیک باید بدون دستکاری رد شوند
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth/callback') ||
    pathname.includes('.') || pathname === '/app-ads.txt'
  ) {
    return NextResponse.next();
  }

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

  // 🔒 استفاده از getSession به جای getUser برای جلوگیری از لاگ‌آوت شدن ناخواسته و حفظ پایداری نشست
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (pathname === '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(redirectUrl);
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // حفظ کامل کوئری پارامترها (Query Params مانند appId و token) در صورت نبود لوکال
  if (pathnameIsMissingLocale && pathname !== '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const currentLocale = pathname.split('/')[1] || defaultLocale;

  // مسیرهای اصلی سیستم (برای بررسی‌های دسترسی)
  // مسیر ثبت‌نام و آنبوردینگ استاد نباید با پنل محافظت‌شده اشتباه گرفته شود
  const isTeacherOnboarding = pathname.includes('/teacher-onboarding') || pathname.includes('/teacher-register');
  const isAuthPage = (pathname.includes('/login') || pathname.includes('/register')) && !isTeacherOnboarding;
  const isAdminRoute = pathname.includes('/admin');

  // مسیرهای محافظت‌شده مدرس: فقط مسیرهای داخل /teacher که آنبوردینگ نیستند
  const isTeacherRoute = (pathname === `/${currentLocale}/teacher` || pathname.startsWith(`/${currentLocale}/teacher/`)) && !isTeacherOnboarding;
  const isStudentRoute = pathname.includes('/dashboard');

  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  // ==========================================
  // مدیریت دسترسی‌ها (Role-Based Access Control)
  // ==========================================
  if (isProtectedRoute || isAuthPage) {

    // اگر کاربر مهمان است و می‌خواهد به صفحات محافظت‌شده برود -> لاگین
    if (!user && isProtectedRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${currentLocale}/login`;
      return NextResponse.redirect(loginUrl);
    }

    if (user) {
      // گرفتن نقش واقعی کاربر
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

      // اگر لاگین است و می‌خواهد برود صفحه لاگین/رجیستر دانش‌آموز -> ریدایرکت به پنل اصلی خودش
      if (isAuthPage) {
        return NextResponse.redirect(new URL(getCorrectDashboardRoot(), request.url));
      }

      // 🔴 جلوگیری از دسترسی غیرمجاز متقاطع (بدون خراب کردن مسیرهای زیرمجموعه)
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
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};