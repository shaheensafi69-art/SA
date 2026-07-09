import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const locales = ['en', 'fa', 'ps', 'ur', 'de', 'fr'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  // Update Supabase session to keep the user logged in
  const supabaseResponse = await updateSession(request);

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return supabaseResponse;
  }

  // Redirect to default locale if not present
  request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  const redirectResponse = NextResponse.redirect(request.nextUrl);
  
  // Transfer any cookies that were updated by Supabase to the redirect response
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
