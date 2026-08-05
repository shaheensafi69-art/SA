"use client";

import { useState, useEffect } from "react";

export default function LogoLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تابعی برای مخفی کردن لودر وقتی سایت کامل لود شد
    const handleLoad = () => {
      setIsLoading(false);
    };

    // اگر صفحه از قبل لود شده بود
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      // در غیر این صورت منتظر بمان تا مرورگر همه چیز را بارگیری کند
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // وقتی لودینگ تمام شد، این کامپوننت از صفحه حذف می‌شود
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9998] bg-neutral-950 flex flex-col items-center justify-center">
      {/* انیمیشن پالس (تپش قلب) و محو شدن روی این بخش اعمال شده است */}
      <div className="relative flex flex-col items-center animate-pulse">
        {/* 👈 نام لوگوی جدید در این قسمت قرار گرفت */}
        <img 
          src="/logo-without-b.png" 
          alt="Safi Academy Loading" 
          // عرض لوگو را کمی بزرگتر کردیم (w-40) تا بهتر دیده شود
          className="w-40 md:w-48 h-auto object-contain mb-6"
        />
        <span className="text-white/80 text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
}