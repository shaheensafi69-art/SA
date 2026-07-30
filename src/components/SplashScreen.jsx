"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  // پیش‌فرض فالس است؛ یعنی در حالت عادی (وب‌سایت) اصلاً ویدیو لود نمی‌شود
  const [showSplash, setShowSplash] = useState(false); 
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    // این خط بررسی می‌کند که آیا کاربر از داخل اپلیکیشن نصب‌شده وارد شده است یا خیر؟
    const isInstalledApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    // اگر کاربر داخل اپلیکیشن PWA بود، ویدیو را آماده پخش کن
    if (isInstalledApp) {
      setShowSplash(true); 
      
      if (window.innerWidth < 768) {
        setVideoSrc("/loader-720x1280.mp4");
      } else {
        setVideoSrc("/loader-1920x1080.mp4");
      }
    }
  }, []);

  // اگر کاربر در وب‌سایت بود (isInstalledApp فالس بود) یا ویدیو تمام شد، هیچ چیزی نمایش نده و سایت را سنگین نکن
  if (!showSplash || !videoSrc) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        ref={(el) => {
          if (el) el.playbackRate = 5.5;
        }}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={() => setShowSplash(false)}
        className="w-full h-full object-cover" 
      />
    </div>
  );
}