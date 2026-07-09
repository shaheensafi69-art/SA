import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const allowedExactPaths = new Set([
  '/en',
  '/en/login',
  '/en/register',
  '/en/admin',
'/en/admin/achievements',
'/en/admin/ai-assistant',
'/en/admin/achievements',
'/en/admin/assignments',
'/en/admin/courses',
'/en/admin/groups',
'/en/admin/groups/[id]',
'/en/admin/live-classes',
'/en/admin/live-classes/[classId]',
'/en/admin/quizzes',
'/en/admin/settings',
'/en/admin/support',
'/en/admin/trading-journal',
'/en/admin/wallet',
  '/en/dashboard',
'/en/dashboard/achievements',
'/en/dashboard/ai-assistant',
'/en/dashboard/achievements',
'/en/dashboard/assignments',
'/en/dashboard/courses',
'/en/dashboard/groups',
'/en/dashboard/groups/[id]',
'/en/dashboard/live-classes',
'/en/dashboard/live-classes/[classId]',
'/en/dashboard/quizzes',
'/en/dashboard/settings',
'/en/dashboard/support',
'/en/dashboard/trading-journal',
'/en/dashboard/wallet',
  '/en/teacher',
'/en/teacher/achievements',
'/en/teacher/ai-assistant',
'/en/teacher/achievements',
'/en/teacher/assignments',
'/en/teacher/courses',
'/en/teacher/groups',
'/en/teacher/groups/[id]',
'/en/teacher/live-classes',
'/en/teacher/live-classes/[classId]',
'/en/teacher/quizzes',
'/en/teacher/settings',
'/en/teacher/support',
'/en/teacher/trading-journal',
'/en/teacher/wallet',
   '/fr',
  '/fr/login',
  '/fr/register',
  '/fr/admin',
'/fr/admin/achievements',
'/fr/admin/ai-assistant',
'/fr/admin/achievements',
'/fr/admin/assignments',
'/fr/admin/courses',
'/fr/admin/groups',
'/fr/admin/groups/[id]',
'/fr/admin/live-classes',
'/fr/admin/live-classes/[classId]',
'/fr/admin/quizzes',
'/fr/admin/settings',
'/fr/admin/support',
'/fr/admin/trading-journal',
'/fr/admin/wallet',
  '/fr/dashboard',
'/fr/dashboard/achievements',
'/fr/dashboard/ai-assistant',
'/fr/dashboard/achievements',
'/fr/dashboard/assignments',
'/fr/dashboard/courses',
'/fr/dashboard/groups',
'/fr/dashboard/groups/[id]',
'/fr/dashboard/live-classes',
'/fr/dashboard/live-classes/[classId]',
'/fr/dashboard/quizzes',
'/fr/dashboard/settings',
'/fr/dashboard/support',
'/fr/dashboard/trading-journal',
'/fr/dashboard/wallet',
  '/fr/teacher',
'/fr/teacher/achievements',
'/fr/teacher/ai-assistant',
'/fr/teacher/achievements',
'/fr/teacher/assignments',
'/fr/teacher/courses',
'/fr/teacher/groups',
'/fr/teacher/groups/[id]',
'/fr/teacher/live-classes',
'/fr/teacher/live-classes/[classId]',
'/fr/teacher/quizzes',
'/fr/teacher/settings',
'/fr/teacher/support',
'/fr/teacher/trading-journal',
'/fr/teacher/wallet',
   '/ps',
  '/ps/login',
  '/ps/register',
  '/ps/admin',
'/ps/admin/achievements',
'/ps/admin/ai-assistant',
'/ps/admin/achievements',
'/ps/admin/assignments',
'/ps/admin/courses',
'/ps/admin/groups',
'/ps/admin/groups/[id]',
'/ps/admin/live-classes',
'/ps/admin/live-classes/[classId]',
'/ps/admin/quizzes',
'/ps/admin/settings',
'/ps/admin/support',
'/ps/admin/trading-journal',
'/ps/admin/wallet',
  '/ps/dashboard',
'/ps/dashboard/achievements',
'/ps/dashboard/ai-assistant',
'/ps/dashboard/achievements',
'/ps/dashboard/assignments',
'/ps/dashboard/courses',
'/ps/dashboard/groups',
'/ps/dashboard/groups/[id]',
'/ps/dashboard/live-classes',
'/ps/dashboard/live-classes/[classId]',
'/ps/dashboard/quizzes',
'/ps/dashboard/settings',
'/ps/dashboard/support',
'/ps/dashboard/trading-journal',
'/ps/dashboard/wallet',
  '/ps/teacher',
'/ps/teacher/achievements',
'/ps/teacher/ai-assistant',
'/ps/teacher/achievements',
'/ps/teacher/assignments',
'/ps/teacher/courses',
'/ps/teacher/groups',
'/ps/teacher/groups/[id]',
'/ps/teacher/live-classes',
'/ps/teacher/live-classes/[classId]',
'/ps/teacher/quizzes',
'/ps/teacher/settings',
'/ps/teacher/support',
'/ps/teacher/trading-journal',
'/ps/teacher/wallet',
  '/ur',
  '/ur/login',
  '/ur/register',
  '/ur/admin',
  '/ur/dashboard',
  '/ur/teacher',
  '/fa',
  '/fa/login',
  '/fa/register',
  '/fa/admin',
  '/fa/dashboard',
  '/fa/teacher',
  '/de',
  '/de/login',
  '/de/register',
  '/de/admin',
  '/de/dashboard',
  '/de/teacher',
]);

const allowedPrefixes = [
  '/en/admin/',
  '/en/dashboard/',
  '/en/teacher/',
  '/fr/admin/',
  '/fr/dashboard/',
  '/fr/teacher/',
  '/ps/admin/',
  '/ps/dashboard/',
  '/ps/teacher/',
  '/ur/admin/',
  '/ur/dashboard/',
  '/ur/teacher/',
  '/fa/admin/',
  '/fa/dashboard/',
  '/fa/teacher/',
  '/de/admin/',
  '/de/dashboard/',
  '/de/teacher/',
];

const defaultPath = '/en/login';

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/u, '') || '/';
}

function isAllowedPath(pathname: string) {
  if (allowedExactPaths.has(pathname)) {
    return true;
  }

  return allowedPrefixes.some((prefix) => pathname.startsWith(prefix));
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

  if (isAllowedPath(pathname)) {
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
