import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createAdminClient } from '@/utils/supabase/admin'
import { generateOnboardingToken } from '@/utils/onboardingSecurity'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect_to') || requestUrl.searchParams.get('redirectTo')
  const origin = requestUrl.origin

  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Can be ignored in Server Components/Route handlers
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {}
        },
      },
    }
  )

  let authUser: any = null

  // 1. Verify OTP token_hash if present
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error && data?.user) {
      authUser = data.user
    }
  }

  // 2. Exchange PKCE code if present
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data?.user) {
      authUser = data.user
    }
  }

  // 3. Fallback: retrieve active session user
  if (!authUser) {
    const { data: { user } } = await supabase.auth.getUser()
    authUser = user
  }

  // 4. Handle Teacher Invite / Onboarding flow
  const isTeacherFlow =
    type === 'invite' ||
    authUser?.user_metadata?.role === 'teacher' ||
    (next && next.includes('teacher-onboarding'))

  if (isTeacherFlow || authUser) {
    const candidateEmail = (authUser?.email || requestUrl.searchParams.get('email') || '').trim().toLowerCase()

    if (candidateEmail) {
      try {
        const adminSupabase = createAdminClient()
        const { data: application } = await adminSupabase
          .from('instructor_applications')
          .select('id, email, status, course_title, first_name')
          .eq('email', candidateEmail)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (application) {
          const secureToken = generateOnboardingToken(application.id, application.email)
          console.log(`[Auth Callback] Matched teacher application ${application.id} for ${candidateEmail}`);
          return NextResponse.redirect(`${origin}/en/teacher-onboarding?appId=${application.id}&token=${secureToken}`)
        }
      } catch (matchErr) {
        console.error('[Auth Callback] Error resolving candidate dossier:', matchErr)
      }
    }

    if (next && next.startsWith('/')) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 5. Standard Auth Flows
  if (type === 'signup') {
    return NextResponse.redirect(`${origin}/en/email-confirmed`)
  }
  if (type === 'recovery') {
    return NextResponse.redirect(`${origin}/en/reset-password`)
  }

  if (next && next.startsWith('/')) {
    return NextResponse.redirect(`${origin}${next}`)
  }

  if (authUser) {
    return NextResponse.redirect(`${origin}/en`)
  }

  // Fallback to login with message
  return NextResponse.redirect(`${origin}/en/login?error=Invalid or expired verification link`)
}