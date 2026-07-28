"use client";

import { useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        // این روش قطعی‌ترین راه برای تغییر سرعت است و هیچ اروری هم نمی‌دهد
        ref={(el) => {
          if (el) el.playbackRate = 5.5;
        }}
        src="/loader.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setShowSplash(false)}
        className="w-full h-full object-cover" 
      />
    </div>
  );
}