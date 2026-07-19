"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ۱. لیست شرکای استراتژیک جهانی (نوار متحرک)
const strategicPartners = [
  { name: "Credly", url: "https://img.logo.dev/credly.com?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "Accredible", url: "https://img.logo.dev/accredible.com?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "BadgeCert", url: "https://img.logo.dev/badgecert.com?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "CompTIA", url: "https://img.logo.dev/comptia.org?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "PMI", url: "https://img.logo.dev/pmi.org?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "AWS", url: "https://img.logo.dev/aws.amazon.com?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "Microsoft", url: "https://img.logo.dev/learn.microsoft.com?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "Google", url: "https://img.logo.dev/google.org?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "Gates Foundation", url: "https://img.logo.dev/gatesfoundation.org?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
  { name: "NEFE", url: "https://img.logo.dev/nefe.org?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true" },
];

// ۲. لیست تاییدیه‌ها و مجوزهای ملی/دولتی (بخش ثابت پایین - آپدیت شده با کشورهای جدید)
const nationalRecognitions = [
  { name: "US Department of Education", url: "https://img.logo.dev/ed.gov?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Dept. of Education (USA)" },
  { name: "BMBF Germany", url: "https://img.logo.dev/bmbf.de?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (Germany)" },
  { name: "Ministry of National Education France", url: "https://img.logo.dev/education.gouv.fr?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (France)" },
  { name: "Government of Netherlands", url: "https://img.logo.dev/rijksoverheid.nl?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (Netherlands)" },
  { name: "SERI Switzerland", url: "https://img.logo.dev/sbfi.admin.ch?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "State Secretariat (Switzerland)" },
  { name: "Ministry of Education AFG", url: "https://img.logo.dev/moe.gov.af?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Ministry of Education (AFG)" },
  { name: "Ministry of Higher Education AFG", url: "https://img.logo.dev/old.mohe.gov.af?token=pk_KFxIPBNeQa6ZPc2CP18vhQ&format=webp&retina=true", label: "Higher Education (AFG)" }
];

export default function Footer() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const currentYear = new Date().getFullYear();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredInstallPrompt = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    const promptEvent = deferredPrompt || (window as any).deferredInstallPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        (window as any).deferredInstallPrompt = null;
      }
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        alert("To install the Safi Academy app on your iPhone, tap the Share button at the bottom of Safari and select 'Add to Home Screen'.");
      } else {
        alert("App installation is either already completed or blocked by your browser settings.");
      }
    }
  };

  const hideFooterRoutes = ["/dashboard", "/login", "/register", "/admin", "/teacher"];
  const shouldHideFooter = hideFooterRoutes.some(route => pathname.includes(route));

  if (shouldHideFooter) return null;

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#020202] pt-16 pb-12 overflow-hidden font-sans z-10">
      
      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-yellow-600/10 rounded-[100%] blur-[120px] pointer-events-none"></div>
      </div>

      {/* ================= SECTION 1: GLOBAL PARTNERS MARQUEE ================= */}
      <div className="relative z-10 w-full border-b border-white/5 pb-16 mb-16 overflow-hidden flex flex-col items-center">
        
        {/* هدر راهنمای پارتنرها */}
        <div className="flex flex-col items-center justify-center mb-8 px-4 text-center">
          <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-3 shadow-inner">
            Global Network
          </span>
          <h4 className="text-sm md:text-base font-bold text-neutral-400 max-w-2xl leading-relaxed">
            Proudly partnered and integrated with world-leading technology, accreditation, and educational platforms to bring you globally recognized standards.
          </h4>
        </div>
        
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] items-center">
            {[...strategicPartners, ...strategicPartners, ...strategicPartners].map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center mx-10 group filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                title={`${partner.name} Strategic Partner`}
              >
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-7 md:h-9 object-contain max-w-[140px] drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        
        {/* ================= SECTION 2: MASSIVE LOGO ================= */}
        <div className="flex flex-col items-center text-center mb-20 group cursor-default">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[40px] rounded-full group-hover:bg-yellow-500/40 group-hover:blur-[60px] transition-all duration-700"></div>
            <img 
              src="/logo-without-b.png" 
              alt="Safi Academy Logo" 
              className="relative z-10 w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(234,179,8,0.5)] transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700"
            />
          </div>
          
          <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            Safi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Academy</span>
          </span>
          <p className="text-neutral-400 max-w-2xl text-lg font-medium leading-relaxed">
            The premium educational platform designed to empower students globally with modern skills in Tech, E-commerce, and Financial Markets.
          </p>
          <div className="mt-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer" title="UK Registration Number: 17063286">
             <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase">UK Reg: 17063286</span>
          </div>
        </div>

        {/* ================= SECTION 3: LINKS GRID ================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          {/* Column 1: Ecosystem */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ecosystem
            </h3>
            <a href="https://www.safipay.net" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium flex justify-between items-center group">
              SafiPay Banking <span className="opacity-0 group-hover:opacity-100 text-xs">↗</span>
            </a>
            <span className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium cursor-pointer">Safi International Capital</span>
            <a href="https://www.safipro.site" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium flex justify-between items-center group">
              SafiPro Apparel <span className="opacity-0 group-hover:opacity-100 text-xs">↗</span>
            </a>
            <a href="https://www.safitopup.site" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium flex justify-between items-center group">
              Safi TopUp Global <span className="opacity-0 group-hover:opacity-100 text-xs">↗</span>
            </a>
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
            <Link href={`/${currentLocale}/contact`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Contact Headquarters</Link>
            <Link href={`/${currentLocale}/support`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium">Help Center & FAQ</Link>
            <Link href={`/${currentLocale}/instructor-application`} className="text-neutral-400 hover:text-yellow-500 hover:translate-x-2 transition-all font-medium flex items-center gap-2">Instructor Application <span className="bg-yellow-500/20 text-yellow-500 text-[8px] uppercase tracking-widest px-2 py-0.5 rounded">Hiring</span></Link>
          </div>

          {/* Column 4: Connect & Socials */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-extrabold text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Connect
            </h3>
            
            <div className="flex items-center gap-3 mt-1 mb-3">
               {/* Facebook */}
               <a href="https://www.facebook.com/profile.php?id=61591973281742" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-transparent transition-all group">
                 <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
               </a>
               {/* Instagram */}
               <a href="https://www.instagram.com/safi_academy01?igsh=MXV1ZW44aXBwOHd3NQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent transition-all group">
                 <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
               </a>
               {/* LinkedIn */}
               <a href="https://www.linkedin.com/company/safi-academy/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-transparent transition-all group">
                 <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
               </a>
               {/* WhatsApp */}
               <a href="https://whatsapp.com/channel/0029Vb8WCN9FXUucJwrltI32" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-transparent transition-all group">
                 <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
               </a>
            </div>

            {/* دکمه نصب اپلیکیشن */}
            {!isStandalone && (
              <button 
                onClick={handleInstallApp}
                className="mt-3 flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-extrabold text-sm hover:scale-105 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Install Safi App
              </button>
            )}
          </div>

        </div>

        {/* ================= SECTION 4: NATIONAL ACCREDITATIONS ================= */}
        <div className="w-full flex flex-col items-center justify-center border-b border-white/10 pb-12 mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-8 text-center">
            Officially Recognized & Registered By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-5xl">
            {nationalRecognitions.map((ministry, idx) => (
              <div key={idx} className="flex flex-col items-center group" title={ministry.label}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-3 mb-3 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-inner">
                  <img 
                    src={ministry.url} 
                    alt={ministry.name} 
                    className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors text-center max-w-[130px]">
                  {ministry.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 5: COPYRIGHT ================= */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-500 text-xs sm:text-sm font-medium">
          <p>© {currentYear} Safi Academy. Safi International Capital LTD. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
             <Link href={`/${currentLocale}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href={`/${currentLocale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10" title="Powered by Advanced AI">
               <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
               <span className="text-neutral-300 text-xs">Powered by <span className="text-white font-bold">Safi AI</span></span>
             </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </footer>
  );
}