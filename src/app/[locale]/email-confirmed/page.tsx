"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Verified } from "lucide-react";

// ==========================================
// 0. CUSTOM CONFETTI EFFECT (جشن موفقیت)
// ==========================================
function ConfettiEffect() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#facc15', '#10b981', '#3b82f6', '#ec4899', '#ffffff'];
    const newPieces = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 1.5}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      rotate: `${Math.random() * 360}deg`,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-[-10vh] w-2.5 h-4 opacity-90 animate-confetti-fall rounded-sm shadow-sm"
          style={{
            left: piece.left,
            backgroundColor: piece.backgroundColor,
            animationDuration: piece.animationDuration,
            animationDelay: piece.animationDelay,
            transform: `rotate(${piece.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

export default function EmailConfirmedPage() {
  return (
    <div className="min-h-screen w-full bg-[#030305] text-white flex items-center justify-center font-sans overflow-hidden relative p-4">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      {/* Confetti Celebration */}
      <ConfettiEffect />

      {/* Main Glassmorphism Card */}
      <div className="bg-[#0a0a0f]/90 p-8 sm:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative z-10 w-full max-w-lg animate-[fadeInUp_0.6s_ease-out]">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          
          {/* Animated Verified Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-[40px] rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/5 rounded-[2rem] flex items-center justify-center border border-emerald-500/30 relative shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <Verified className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Email Verified!
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mx-auto">
              Your identity has been successfully confirmed. Welcome to the Safi Academy ecosystem.
            </p>
          </div>

          {/* Persian Texts (RTL) */}
          <div className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 shadow-inner" dir="rtl">
            <h3 className="text-lg font-black text-emerald-400 tracking-tight mb-2">حساب شما فعال شد!</h3>
            <p className="text-neutral-300 text-xs leading-relaxed">
              ایمیل شما با موفقیت تایید شد و هویت شما در سیستم ثبت گردید. هم‌اکنون می‌توانید وارد داشبورد کاربری خود شوید.
            </p>
          </div>

          <div className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80 mb-2">
            <ShieldCheck size={14} /> Full Access Granted
          </div>

          {/* Login / Dashboard Button */}
          <Link 
            href="/en/login" 
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02] rounded-xl text-black font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group"
          >
            Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
}