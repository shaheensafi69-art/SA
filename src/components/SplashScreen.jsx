"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  // عبارت تایپ‌اسکریپت از خط زیر حذف شد
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    // این تابع بررسی می‌کند کاربر با موبایل است یا دسکتاپ
    const checkDeviceAndSetVideo = () => {
      if (window.innerWidth < 768) {
        // برای گوشی‌ها (عرض کمتر از 768 پیکسل)
        setVideoSrc("/loader-720x1280.mp4");
      } else {
        // برای تبلت و دسکتاپ
        setVideoSrc("/loader-1920x1080.mp4");
      }
    };

    checkDeviceAndSetVideo();
  }, []);

  // اگر هنوز ویدیو مشخص نشده یا اسپلش باید بسته شود، چیزی نشان نده
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
        // چون حالا هر ویدیو دقیقاً سایز دستگاه خودش است، 
        // می‌توانیم از object-cover استفاده کنیم تا ویدیو کل صفحه را بدون نقص پر کند
        className="w-full h-full object-cover" 
      />
    </div>
  );
}