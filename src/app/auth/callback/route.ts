import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const origin = requestUrl.origin

  if (token_hash && type) {
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
              // در سرور کامپوننت‌ها گاهی کوکی قابل ست شدن نیست که نادیده گرفته می‌شود
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

    // تایید توکن ایمیل با Supabase
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // هدایت بر اساس نوع درخواست
      if (type === 'signup') {
        return NextResponse.redirect(`${origin}/en/email-confirmed`)
      }
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/en/reset-password`)
      }
    }
  }

  // اگر توکن نامعتبر یا منقضی شده بود، هدایت به صفحه لاگین
  return NextResponse.redirect(`${origin}/en/login?error=Invalid or expired verification link`)
}