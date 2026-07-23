import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'fr', 'ps', 'ur', 'fa', 'de'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚫 فیلتر مهم: درخواست‌های API و فایل‌های استاتیک باید بدون دستکاری رد شوند
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
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
        getAll() { return request.cookies.getAll(); },
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

  const { data: { user } } = await supabase.auth.getUser();

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

  // مسیرهای اصلی سیستم (برای بررسی‌های دسترسی)
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');
  const isAdminRoute = pathname.includes('/admin');
  const isTeacherRoute = pathname.includes('/teacher');
  const isStudentRoute = pathname.includes('/dashboard');
  
  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  // ==========================================
  // مدیریت دسترسی‌ها (Role-Based Access Control)
  // ==========================================
  if (isProtectedRoute || isAuthPage) {
    
    // اگر کاربر مهمان است و می‌خواهد به صفحات محافظت‌شده برود -> لاگین
    if (!user && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
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

      // اگر لاگین است و می‌خواهد برود صفحه لاگین/رجیستر -> ریدایرکت به پنل اصلی خودش
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

      // ✅ نکته کلیدی: اگر کاربر لاگین بود و حق دسترسی داشت،
      // هیچ ریدایرکتی انجام نمیدهیم تا بگذاریم به مسیر خودش (مثلاً /admin/classes) برود.
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};