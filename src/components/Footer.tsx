"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/en";
  // استخراج زبان فعلی از آدرس (مثلاً "en" از "/en/about")
  const currentLocale = pathname.split("/")[1] || "en";

  // استخراج سال به صورت داینامیک
  const currentYear = new Date().getFullYear();

  // استیت‌های مربوط به نصب اپلیکیشن (PWA)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // بررسی اینکه آیا برنامه همین الان روی گوشی نصب شده است یا خیر
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }

    // گرفتن رویداد نصب از مرورگر (اگر توسط کامپوننت دیگر مصرف نشده باشد)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // ذخیره در شیء سراسری window تا فوتر هم بتواند به آن دسترسی داشته باشد
      (window as any).deferredInstallPrompt = e;
    };
    
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    // اول چک می‌کنیم متغیر لوکال پر شده یا متغیر گلوبال
    const promptEvent = deferredPrompt || (window as any).deferredInstallPrompt;
    
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        (window as any).deferredInstallPrompt = null;
      }
    } else {
      // اگر رویداد مسدود شده بود (مثلاً در آیفون) به کاربر پیام می‌دهیم
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        alert("To install the Safi Academy app on your iPhone, tap the Share button at the bottom of Safari and select 'Add to Home Screen'.");
      } else {
        alert("App installation is either already completed or blocked by your browser settings.");
      }
    }
  };

  // لاجیک پنهان کردن فوتر در صفحات داشبورد، لاگین و رجیستر (در تمام زبان‌ها)
  const hideFooterRoutes = ["/dashboard", "/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.some(route => pathname.includes(route));

  if (shouldHideFooter) {
    return null; // فوتر رندر نمی‌شود!
  }

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#050505] pt-24 pb-12 overflow-hidden font-sans z-10">
      
      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* افکت نویز ملایم */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        {/* هاله نوری طلایی در مرکز فوتر */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-yellow-600/10 rounded-[100%] blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        
        {/* ================= TOP SECTION: MASSIVE LOGO ================= */}
        <div className="flex flex-col items-center text-center mb-20 group cursor-default">
          <div className="relative flex items-center justify-center mb-6">
            {/* افکت نوری درخشان که با هاور بزرگتر می‌شود */}
            <div className="absolute inset-0 bg-yellow-500/20 blur-[40px] rounded-full group-hover:bg-yellow-500/40 group-hover:blur-[60px] transition-all duration-700"></div>
            
            {/* لوگوی بدون پس‌زمینه با سایز بسیار بزرگ */}
            <img 
              src="/logo-without-b.png" 
              alt="Safi Academy Logo" 
              className="relative z-10 w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(234,179,8,0.5)] transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700"
            />
          </div>
          
          <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            Safi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Academy</span>
          </span>
          <p className="text-neutral-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
            The premium educational platform designed to empower students globally with modern skills in Tech, E-commerce, and Financial Markets.
          </p>
          <div className="mt-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
             <span className="text-sm font-bold text-yellow-500 tracking-widest uppercase">Part of Safi International Capital LTD</span>
          </div>
        </div>

        {/* ================= MIDDLE SECTION: LINKS GRID ================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
          
          {/* Column 1: Ecosystem */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ecosystem
            </h3>
            <Link href={`/${currentLocale}`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">SafiPay Integration</Link>
            <Link href={`/${currentLocale}`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Safi International Capital</Link>
            <Link href={`/${currentLocale}`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">SafiPro Store</Link>
            <Link href={`/${currentLocale}`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Safi TopUp</Link>
          </div>

          {/* Column 2: Academics */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Academics
            </h3>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">E-Commerce Masterclass</Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Web & AI Development</Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Financial Markets Trading</Link>
            <Link href={`/${currentLocale}/courses`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Language Certifications</Link>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Support
            </h3>
            <Link href={`/${currentLocale}/about`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">About Safi Academy</Link>
            <Link href={`/${currentLocale}/contact`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Contact Us</Link>
            <Link href={`/${currentLocale}/support`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Help Center & FAQ</Link>
            <Link href={`/${currentLocale}/instructor-application`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Instructor Application</Link>
          </div>

          {/* Column 4: Legal, Social & App Install */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Connect
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-2">
              Registered in England and Wales.<br/>
              <span className="text-white font-bold">Company No. 17063286</span>
            </p>
            <div className="flex items-center gap-4 mt-2 mb-2">
               {/* آیکون‌های شبکه‌های اجتماعی */}
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all">IN</a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all">X</a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all">YT</a>
            </div>

            {/* دکمه نصب اپلیکیشن - اگر اپ نصب نباشد نشان داده می‌شود */}
            {!isStandalone && (
              <button 
                onClick={handleInstallApp}
                className="mt-2 flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-extrabold text-sm hover:scale-105 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Install Safi App
              </button>
            )}
          </div>

        </div>

        {/* ================= BOTTOM SECTION: COPYRIGHT ================= */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-500 text-sm font-medium">
          <p>© {currentYear} Safi Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <Link href={`/${currentLocale}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href={`/${currentLocale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
               <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
               <span className="text-neutral-300">Powered by <span className="text-white font-bold">Safi AI</span></span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}