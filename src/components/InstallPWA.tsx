"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const pathname = usePathname();

  // گرفتن رویداد نصب از مرورگر
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      // ذخیره رویداد برای استفاده در دکمه
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // بررسی مسیر فعلی کاربر برای نمایش دکمه
  useEffect(() => {
    // فقط در این مسیرها دکمه نصب نشان داده شود
    const allowedRoutes = ["/admin", "/dashboard", "/teacher", "/login", "/register"];
    const isAllowed = allowedRoutes.some((route) => pathname?.includes(route));
    
    // اگر در مسیر مجاز بودیم و مرورگر اجازه نصب داد، دکمه را نشان بده
    if (isAllowed && deferredPrompt) {
      setShowInstall(true);
    } else {
      setShowInstall(false);
    }
  }, [pathname, deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // نمایش پیام نصب مرورگر
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowInstall(false);
      }
    }
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-[fadeIn_0.5s_ease-out]">
      <button 
        onClick={handleInstallClick}
        className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-full shadow-[0_10px_40px_rgba(99,102,241,0.5)] hover:scale-105 transition-all border border-white/20 font-bold text-sm"
      >
        <span className="text-lg">📱</span>
        Install Safi App
      </button>
    </div>
  );
}