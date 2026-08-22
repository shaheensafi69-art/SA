"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  ArrowLeft, Mail, KeyRound, CheckCircle2, 
  AlertCircle, ShieldCheck, Loader2 
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      // ارسال لینک بازیابی به ایمیل کاربر
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // بسیار مهم: کاربر پس از کلیک روی ایمیل دقیقاً به این صفحه هدایت می‌شود
        redirectTo: `${window.location.origin}/en/reset-password`,
      });

      if (error) {
        throw error;
      }

      // نمایش صفحه موفقیت
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans relative flex items-center justify-center p-6 selection:bg-fuchsia-500 selection:text-white overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10 animate-[fadeInUp_0.4s_ease-out]">
        
        {/* Back Button */}
        <Link href="/en/login" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors group text-sm font-bold uppercase tracking-widest">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-8 shadow-inner">
            <KeyRound size={32} className="text-fuchsia-400" />
          </div>

          <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
            Reset Password
          </h1>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            Enter the email address associated with your Safi Academy account and we'll send you a secure link to set a new password.
          </p>

          {isSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center animate-[fadeIn_0.3s_ease-out]">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Check Your Email</h3>
              <p className="text-emerald-400/80 text-sm mb-6">
                We've sent a secure reset link to <strong className="text-white">{email}</strong>
              </p>
              <p className="text-xs text-neutral-500 mb-6" dir="rtl">
                لطفاً پوشه Spam یا Junk ایمیل خود را نیز بررسی کنید.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors uppercase tracking-widest"
              >
                Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 focus:border-fuchsia-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/10 transition-all"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-[fadeIn_0.2s_ease-out]">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 font-medium leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full relative group overflow-hidden rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-blue-600 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative px-6 py-4 flex items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-widest">
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                    </>
                  )}
                </div>
              </button>

            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secured by Safi Ecosystem
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}