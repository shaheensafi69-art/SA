import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'fr', 'ps', 'ur', 'fa', 'de'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚫 فیلتر مهم: اگر درخواست مربوط به API بود، فوراً از میدل‌ویر رد شود و هیچ کاری نکند
  if (pathname.startsWith('/api')) {
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

  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');
  const isAdminRoute = pathname.includes('/admin');
  const isTeacherRoute = pathname.includes('/teacher');
  const isStudentRoute = pathname.includes('/dashboard');
  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute;

  if (isProtectedRoute || isAuthPage) {
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
    '/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};