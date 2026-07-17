import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'fr', 'ps', 'ur', 'fa', 'de'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  // ۱. ایجاد Response برای مدیریت کوکی‌ها
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          // این بخش حیاتی است: کوکی‌ها را در درخواست و پاسخ ست می‌کند
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ۲. دریافت سشن کاربر (این متد به طور خودکار توکن را رفرش می‌کند)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ۳. مدیریت زبان
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale && pathname !== '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  const currentLocale = pathname.split('/')[1] || defaultLocale;

  // ۴. تعریف مسیرها
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');
  const isAdminRoute = pathname.includes('/admin');
  const isTeacherRoute = pathname.includes('/teacher');
  const isStudentRoute = pathname.includes('/dashboard');
  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  // ۵. لاگیک ریدایرکت (فقط در صورت نیاز به دیتابیس کوئری می‌زنیم)
  if (isProtectedRoute || isAuthPage) {
    
    // اگر کاربر لاگین بود نقش‌اش را بگیریم
    let userRole = 'student';
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      userRole = profile?.role || 'student';
    }

    const getCorrectDashboardUrl = () => {
      if (userRole === 'super_admin' || userRole === 'admin') return `/${currentLocale}/admin`;
      if (userRole === 'teacher') return `/${currentLocale}/teacher`;
      return `/${currentLocale}/dashboard`;
    };

    // هدایت‌ها
    if (!user && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }

    if (user && isAuthPage) {
      return NextResponse.redirect(new URL(getCorrectDashboardUrl(), request.url));
    }

    if (user && isProtectedRoute) {
      if (isAdminRoute && userRole !== 'super_admin' && userRole !== 'admin') {
        return NextResponse.redirect(new URL(getCorrectDashboardUrl(), request.url));
      }
      if (isTeacherRoute && userRole !== 'teacher' && userRole !== 'super_admin') {
        return NextResponse.redirect(new URL(getCorrectDashboardUrl(), request.url));
      }
      if (isStudentRoute && (userRole === 'super_admin' || userRole === 'admin' || userRole === 'teacher')) {
        return NextResponse.redirect(new URL(getCorrectDashboardUrl(), request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};