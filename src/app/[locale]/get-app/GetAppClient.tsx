"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Smartphone, Apple, PlayCircle, Download, 
  Share, PlusSquare, Compass, ArrowLeft, ChevronDown, 
  CheckCircle2, BellRing, Video, ShieldCheck, Zap
} from "lucide-react";

interface GetAppClientProps {
  latestApk: string | null;
  olderApks: string[];
}

export default function GetAppClient({ latestApk, olderApks }: GetAppClientProps) {
  const [showOlderVersions, setShowOlderVersions] = useState(false);

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans relative overflow-hidden selection:bg-fuchsia-500 selection:text-white pb-32">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center">
        
        {/* ================= HEADER ================= */}
        <div className="w-full mb-12 flex items-center justify-between">
          <Link href="/en/teacher/dashboard" className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-lg backdrop-blur-md">
            <ArrowLeft size={20} />
          </Link>
          <div className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 border border-fuchsia-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-fuchsia-400 flex items-center gap-2 shadow-inner">
            <Smartphone size={14} /> Official Ecosystem App
          </div>
        </div>

        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-[fadeInUp_0.4s_ease-out]">
          <div className="w-24 h-24 mx-auto bg-[#0a0a0f] shadow-[0_0_40px_rgba(217,70,239,0.3),inset_0_2px_10px_rgba(255,255,255,0.1)] border border-fuchsia-500/30 rounded-[2rem] flex items-center justify-center mb-8 relative group">
            <div className="absolute inset-0 bg-fuchsia-500/30 blur-[20px] rounded-[2rem] group-hover:bg-fuchsia-500/50 transition-colors"></div>
            <img src="/logo-without-b.png" alt="Logo" className="w-12 h-12 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">
            Take the Academy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-500">Everywhere.</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            The Safi Academy mobile experience brings your trading journals, live classes, network feed, and secure wallet right to your fingertips. Always synced, always secure.
          </p>
        </div>

        {/* ================= APP FEATURES GRID ================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            { icon: <BellRing size={24}/>, title: "Instant Alerts", desc: "Never miss a market update or live class notification.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { icon: <Video size={24}/>, title: "Live Campus", desc: "Join streaming sessions directly from your mobile device.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
            { icon: <ShieldCheck size={24}/>, title: "Secure Wallet", desc: "Manage your SafiPay balance with bank-grade encryption.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { icon: <Zap size={24}/>, title: "Fast Sync", desc: "Your trading journal and feed update instantly across devices.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          ].map((feat, i) => (
            <div key={i} className="bg-[#0a0a0f]/60 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] hover:bg-[#0a0a0f]/80 transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${feat.bg} ${feat.color} ${feat.border}`}>
                {feat.icon}
              </div>
              <h3 className="text-white font-black text-sm mb-2">{feat.title}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= ANDROID DOWNLOADS (LUXURY BUTTONS) ================= */}
        <div className="w-full max-w-4xl bg-gradient-to-b from-[#0a0a0f]/90 to-[#050508]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)] mb-12">
          <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <Smartphone size={28} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Android Devices</h2>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">Samsung, Xiaomi, Google Pixel</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Play Store Luxury Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=org.safiacademy.app" 
              target="_blank" rel="noopener noreferrer"
              className="relative group block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative h-full bg-[#08080c] border border-emerald-500/30 group-hover:border-emerald-500/60 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all z-10 text-center sm:text-left">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-900/40 rounded-[1.8rem] flex items-center justify-center border border-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]">
                  <PlayCircle size={40} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1">Google Play</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-3">
                    <CheckCircle2 size={10} /> Official & Auto-Updated
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">Download safely from the Play Store. You will receive automatic updates whenever we release new features.</p>
                </div>
              </div>
            </a>

            {/* Direct APK Luxury Button */}
            {latestApk ? (
              <a 
                href={`/app/${latestApk}`} 
                download
                className="relative group block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative h-full bg-[#08080c] border border-fuchsia-500/30 group-hover:border-fuchsia-500/60 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all z-10 text-center sm:text-left">
                  <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500/20 to-purple-900/40 rounded-[1.8rem] flex items-center justify-center border border-fuchsia-500/30 shrink-0 group-hover:scale-105 transition-transform shadow-[inset_0_0_20px_rgba(217,70,239,0.2)]">
                    <Download size={40} className="text-fuchsia-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1">Direct APK</h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-md text-[9px] font-black uppercase tracking-widest text-fuchsia-400 mb-3">
                      <Zap size={10} /> Latest Build: {latestApk.replace('.apk', '')}
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">Download the raw APK file directly from our secure servers. Ideal for Huawei devices without Google services.</p>
                  </div>
                </div>
              </a>
            ) : (
               <div className="relative h-full bg-[#08080c] border border-white/5 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left opacity-50">
                  <div className="w-20 h-20 bg-neutral-900 rounded-[1.8rem] flex items-center justify-center border border-white/10 shrink-0">
                    <Download size={40} className="text-neutral-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-400 mb-1">Direct APK</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Not Available Currently</p>
                  </div>
               </div>
            )}
          </div>

          {/* Older Versions Fold */}
          {olderApks.length > 0 && (
            <div className="mt-10 border-t border-white/5 pt-8">
              <button 
                onClick={() => setShowOlderVersions(!showOlderVersions)}
                className="w-full flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors bg-white/[0.02] hover:bg-white/5 py-4 rounded-2xl border border-white/5"
              >
                View Older Versions Archive
                <ChevronDown size={16} className={`transition-transform ${showOlderVersions ? 'rotate-180' : ''}`} />
              </button>
              
              {showOlderVersions && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-[fadeIn_0.3s_ease-out]">
                  {olderApks.map((apk, index) => (
                    <div key={index} className="p-4 bg-[#050508] rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{apk.replace('.apk', '')}</span>
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Archived APK</span>
                      </div>
                      <a 
                        href={`/app/${apk}`} 
                        download
                        className="w-10 h-10 bg-white/5 hover:bg-fuchsia-500/20 hover:text-fuchsia-400 flex items-center justify-center border border-white/10 hover:border-fuchsia-500/30 rounded-xl text-neutral-400 transition-colors"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= iOS SECTION (RICH TUTORIAL) ================= */}
        <div className="w-full max-w-4xl bg-gradient-to-b from-[#0a0a0f]/90 to-[#050508]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
              <Apple size={28} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Apple iOS Installation</h2>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">iPhone & iPad (PWA Web App)</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 mb-8 leading-relaxed max-w-3xl">
            Safi Academy uses powerful Progressive Web App technology. You don't need the App Store. Just follow these 3 simple steps to install the app directly to your home screen. <br/>
            <span className="text-xs text-blue-400 mt-2 block font-medium" dir="rtl">
              برای نصب روی آیفون، نیازی به اپ‌استور نیست. تنها با انجام ۳ مرحله زیر در مرورگر سافاری، وب‌اپلیکیشن قدرتمند ما را به صفحه اصلی گوشی خود اضافه کنید.
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-fuchsia-500/50 z-0"></div>

            {/* Step 1 */}
            <div className="bg-[#050508] border border-white/5 rounded-[2rem] p-6 text-center relative z-10 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform">
                <Compass size={32} />
              </div>
              <h3 className="text-base font-black text-white mb-2">1. Open Safari</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">Open <strong className="text-white">safiacademy.org</strong> using the default Safari browser.</p>
              <div className="bg-white/5 rounded-xl p-3 text-[10px] text-blue-300 font-medium" dir="rtl">
                سایت را حتماً در مرورگر سافاری (Safari) باز کنید.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#050508] border border-white/5 rounded-[2rem] p-6 text-center relative z-10 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mb-6 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform">
                <Share size={32} />
              </div>
              <h3 className="text-base font-black text-white mb-2">2. Tap Share</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">Tap the Share icon located at the bottom center of the screen.</p>
              <div className="bg-white/5 rounded-xl p-3 text-[10px] text-purple-300 font-medium" dir="rtl">
                در منوی پایین صفحه، روی آیکون اشتراک‌گذاری (Share) کلیک کنید.
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#050508] border border-white/5 rounded-[2rem] p-6 text-center relative z-10 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 mx-auto bg-fuchsia-500/10 text-fuchsia-400 rounded-full flex items-center justify-center mb-6 border border-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.15)] group-hover:scale-110 transition-transform">
                <PlusSquare size={32} />
              </div>
              <h3 className="text-base font-black text-white mb-2">3. Add to Home</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">Scroll down the menu and select <strong className="text-white">"Add to Home Screen"</strong>.</p>
              <div className="bg-white/5 rounded-xl p-3 text-[10px] text-fuchsia-300 font-medium" dir="rtl">
                گزینه Add to Home Screen را انتخاب کرده و Add را بزنید.
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-3 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl w-fit mx-auto">
            <CheckCircle2 size={18} />
            Installation Complete! Enjoy the native iOS experience.
          </div>
        </div>

      </div>
    </div>
  );
}