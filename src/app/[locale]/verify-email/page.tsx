"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "your email";

  return (
    <div className="bg-[#0a0a0f]/90 p-8 sm:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative z-10 w-full max-w-lg animate-[fadeInUp_0.5s_ease-out]">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Animated Mail Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400/20 blur-[40px] rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-amber-500/5 rounded-[2rem] flex items-center justify-center border border-yellow-500/30 relative shadow-[0_0_50px_rgba(234,179,8,0.15)]">
            <Mail className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Verify Your Identity
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            Welcome to Safi Academy! We've sent a secure verification link to your email address:
          </p>
        </div>

        {/* User Email Display */}
        <div className="bg-black/60 border border-white/10 rounded-2xl px-8 py-4 shadow-inner w-full">
          <span className="text-yellow-400 font-black text-lg tracking-wide">{email}</span>
        </div>

        {/* Action Required Box */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-6 w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
          <p className="text-yellow-400/90 text-xs font-black uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <ShieldCheck size={16} /> Action Required
          </p>
          <p className="text-neutral-300 text-xs leading-loose" dir="rtl">
            لطفاً وارد صندوق ورودی (Inbox) خود شده و برای فعال‌سازی حساب، روی دکمه تایید کلیک کنید. 
            <br/><br/>
            <span className="text-neutral-500">
              در صورت عدم مشاهده ایمیل، حتماً پوشه <strong className="text-yellow-500/70">Spam</strong> یا <strong className="text-yellow-500/70">Junk</strong> را نیز بررسی نمایید.
            </span>
          </p>
        </div>

        {/* Login Button */}
        <Link 
          href="/en/login" 
          className="mt-4 w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 hover:scale-[1.02] rounded-xl text-black font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,179,8,0.25)] flex items-center justify-center gap-2 group"
        >
          Proceed to Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full bg-[#030305] text-white flex items-center justify-center font-sans overflow-hidden relative p-4">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      <Suspense fallback={
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}