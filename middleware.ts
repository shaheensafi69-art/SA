import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const allowedLocales = ['en', 'fr', 'ps', 'ur', 'fa', 'de'] as const;
const defaultPath = '/en/login';

function normalizePath(pathname: string) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$|^\/+/gu, '/');
}

function getLocaleFromPath(pathname: string) {
  return allowedLocales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function isAllowedLocalePath(pathname: string) {
  return getLocaleFromPath(pathname) !== undefined;
}

function isProtectedRoute(pathname: string) {
  return allowedLocales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/admin`) ||
      pathname.startsWith(`/${locale}/dashboard`) ||
      pathname.startsWith(`/${locale}/teacher`)
  );
}

function isAuthEntryPage(pathname: string) {
  return allowedLocales.some(
    (locale) => pathname === `/${locale}/login` || pathname === `/${locale}/register`
  );
}

function roleRedirect(userRole: string, locale: string) {
  if (userRole === 'super_admin') return `/${locale}/admin`;
  if (userRole === 'teacher') return `/${locale}/teacher`;
  return `/${locale}/dashboard`;
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
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

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = normalizePath(request.nextUrl.pathname);
  const locale = getLocaleFromPath(pathname) ?? 'en';

  const redirect = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const redirectRes = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectRes;
  };

  if (pathname === '/') {
    return redirect(defaultPath);
  }

  if (!isAllowedLocalePath(pathname)) {
    return redirect(defaultPath);
  }

  if (isProtectedRoute(pathname) && !user) {
    return redirect(defaultPath);
  }

  if (user && isAuthEntryPage(pathname)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student';
    return redirect(roleRedirect(userRole, locale));
  }

  if (user && isProtectedRoute(pathname)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student';

    if (pathname.includes('/admin') && userRole !== 'super_admin') {
      return redirect(roleRedirect(userRole, locale));
    }

    if (pathname.includes('/teacher') && userRole !== 'teacher' && userRole !== 'super_admin') {
      return redirect(`/${locale}/dashboard`);
    }

    if (pathname.includes('/dashboard')) {
      if (userRole === 'super_admin') return redirect(`/${locale}/admin`);
      if (userRole === 'teacher') return redirect(`/${locale}/teacher`);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
