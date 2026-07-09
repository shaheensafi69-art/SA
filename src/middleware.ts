import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const allowedPages = new Set([
  '/en',
  '/en/login',
  '/en/register',
  '/en/admin',
  '/en/dashboard',
  '/en/teacher',
  '/fr/login',
  '/fr/register',
  '/fr/admin',
  '/fr/dashboard',
  '/fr/teacher',
  '/ps/login',
  '/ps/register',
  '/ps/admin',
  '/ps/dashboard',
  '/ps/teacher',
  '/ur/login',
  '/ur/register',
  '/ur/admin',
  '/ur/dashboard',
  '/ur/teacher',
  '/fa/login',
  '/fa/register',
  '/fa/admin',
  '/fa/dashboard',
  '/fa/teacher',
  '/de/login',
  '/de/register',
  '/de/admin',
  '/de/dashboard',
  '/de/teacher',
]);

const defaultPath = '/en/login';

function normalizePath(pathname: string) {
  const url = new URL(pathname, 'http://localhost');
  return url.pathname.replace(/\/+$/u, '') || '/';
}

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);
  const pathname = normalizePath(request.nextUrl.pathname);

  if (pathname === '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = defaultPath;
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  if (allowedPages.has(pathname)) {
    return supabaseResponse;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = defaultPath;
  const redirectResponse = NextResponse.redirect(redirectUrl);
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|manifest.json|icon.png|favicon.ico|.*\\..*).*)',
  ],
};
