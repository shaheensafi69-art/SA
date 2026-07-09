import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

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
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Helper function to create redirect with preserved cookies
  const redirect = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const redirectRes = NextResponse.redirect(url);
    // Copy cookies set during session refresh
    response.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectRes;
  };

  // 0. Redirect root to /en
  if (pathname === '/') {
    return redirect('/en');
  }

  // 1. Access Control
  const isProtectedRoute = 
    pathname.startsWith('/en/dashboard') || 
    pathname.startsWith('/en/admin') || 
    pathname.startsWith('/en/teacher');

  if (isProtectedRoute && !user) {
    return redirect('/en/login');
  }

  // 2. Prevent logged-in users from seeing login/register pages
  if (user && (pathname === '/en/login' || pathname === '/en/register')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student';
    
    if (userRole === 'super_admin') return redirect('/en/admin');
    if (userRole === 'teacher') return redirect('/en/teacher');
    return redirect('/en/dashboard');
  }

  if (user && isProtectedRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = profile?.role || 'student';

    // Admin access
    if (pathname.startsWith('/en/admin') && userRole !== 'super_admin') {
      return redirect(userRole === 'teacher' ? '/en/teacher' : '/en/dashboard');
    }

    // Teacher access
    if (pathname.startsWith('/en/teacher') && userRole !== 'teacher' && userRole !== 'super_admin') {
      return redirect('/en/dashboard');
    }

    // Students shouldn't see admin/teacher, and admins/teachers shouldn't see student dashboard
    if (pathname.startsWith('/en/dashboard')) {
      if (userRole === 'super_admin') {
        return redirect('/en/admin');
      }
      if (userRole === 'teacher') {
        return redirect('/en/teacher');
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};