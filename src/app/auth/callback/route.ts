import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as any
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
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    // تایید توکن ایمیل با سوپابیس
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })

    if (!error) {
      // اگر نوع عملیات ثبت‌نام (signup) بود، به صفحه تایید ایمیل برو
      if (type === 'signup') {
        return NextResponse.redirect(`${origin}/en/email-confirmed`)
      }
      // اگر نوع عملیات بازیابی رمز عبور (recovery) بود، به صفحه تغییر رمز برو
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/en/reset-password`)
      }
    }
  }

  // در صورت بروز خطا یا منقضی شدن لینک، هدایت به صفحه لاگین با پیام خطا
  return NextResponse.redirect(`${origin}/en/login?error=Invalid or expired link`)
}