"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";

interface SmartAdBannerProps {
  slotType?: "sticky-bottom" | "in-article" | "footer-top";
  className?: string;
}

export default function SmartAdBanner({
  slotType = "in-article",
  className = "",
}: SmartAdBannerProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  // 🚫 لیست مسیرهایی که تبلیغ در آن‌ها کاملاً ممنوع است
  const isExcluded =
    !pathname ||
    pathname.includes("/dashboard") ||
    pathname.includes("/teacher") ||
    pathname.includes("/admin") ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/payment") ||
    pathname.includes("/store/payment") ||
    pathname.includes("/checkout") ||
    pathname.includes("/support/chat");

  // بررسی حافظه مرورگر برای عدم نمایش بنرهای بسته شده
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (slotType === "sticky-bottom") {
      const dismissed = sessionStorage.getItem("safi_ad_bottom_dismissed");
      if (dismissed === "true") setIsDismissed(true);
    }
  }, [slotType]);

  // لود تنبل و بهینه با IntersectionObserver برای جلوگیری از افت سرعت صفحه
  useEffect(() => {
    if (isExcluded || isDismissed) return;

    // بنر چسبان پایین بدون اسکرول مستقیم نمایش داده می‌شود مگر اینکه بسته شده باشد
    if (slotType === "sticky-bottom") {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );

    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [isExcluded, isDismissed, slotType]);

  // بارگذاری امن اسکریپت نیتیو فقط زمانی که کاربر در نزدیکی بنر قرار گرفته است
  useEffect(() => {
    if (!isVisible || isDismissed || isExcluded) return;
    const container = scriptContainerRef.current;
    if (!container) return;

    // بارگذاری اسکریپت به شکل کاملاً ایزوله داخل کانتینر
    const existing = container.querySelector("script[src*='bicea.org']");
    if (!existing) {
      try {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.src = "https://bicea.org/21/ffb70d5f14558619a60ad9f6dbaf30fb";
        container.appendChild(script);
      } catch (err) {
        console.warn("Notice: ad script lazy load handled", err);
      }
    }
  }, [isVisible, isDismissed, isExcluded]);

  if (isExcluded || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      if (slotType === "sticky-bottom") {
        sessionStorage.setItem("safi_ad_bottom_dismissed", "true");
      }
    }
  };

  // ۱. بنر شناور پایین صفحه (Sticky Bottom) با طراحی شیشه‌ای مدرن و غیرمزاحم
  if (slotType === "sticky-bottom") {
    if (!isVisible) return null;
    return (
      <aside
        aria-label="Sponsored content"
        className="fixed bottom-3 inset-x-0 mx-auto w-[94%] max-w-3xl z-40 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 text-white transition-all animate-in fade-in duration-500"
      >
        <div className="flex items-center gap-2 text-xs text-neutral-300 shrink-0">
          <span className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
            Sponsored
          </span>
          <span className="hidden md:inline font-medium text-xs text-neutral-300">
            حامیان آموزشی و فناوری آکادمی صافی
          </span>
        </div>

        {/* محتوای بنر استاندارد نیتیو */}
        <div className="flex-1 flex justify-center items-center text-xs text-neutral-300 min-h-[36px] overflow-hidden">
          <div ref={scriptContainerRef} id="container-ffb70d5f14558619a60ad9f6dbaf30fb" className="w-full flex items-center justify-center">
            <span className="text-neutral-400 text-xs flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-yellow-400" />
              پیشنهادات برگزیده ابزارهای دیجیتال، سرور و آموزش آنلاین
            </span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1.5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title="بستن تبلیغ"
          aria-label="Close advertisement"
        >
          <X size={16} />
        </button>
      </aside>
    );
  }

  // ۲. بنر درون‌صفحه‌ای (In-Article یا قبل از فوتر footer-top)
  return (
    <section
      ref={adRef}
      aria-label="Partner recommendations"
      className={`w-full my-8 max-w-4xl mx-auto rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-white/10 p-4 sm:p-5 relative overflow-hidden text-neutral-300 min-h-[140px] flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <span className="text-[10px] tracking-widest text-neutral-400 uppercase flex items-center gap-1.5 font-bold">
          <Sparkles size={12} className="text-yellow-400" /> اسپانسر منتخب و همکاران تجاری
        </span>
        <button
          onClick={handleDismiss}
          className="text-neutral-500 hover:text-neutral-300 p-1 transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
          title="بستن"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[80px]">
        {isVisible ? (
          <div className="w-full flex justify-center items-center overflow-hidden">
            <div
              ref={scriptContainerRef}
              id="container-ffb70d5f14558619a60ad9f6dbaf30fb"
              className="w-full min-h-[80px] flex items-center justify-center"
            >
              <div className="flex items-center gap-3 text-xs text-neutral-400 py-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span>فرصت‌های ویژه میزبانی ابری، سرورهای بین‌المللی و گواهینامه‌های حرفه‌ای</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-20 w-full animate-pulse bg-neutral-800/30 rounded-xl" />
        )}
      </div>
    </section>
  );
}
