"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface GoogleAdSenseAdProps {
  client?: string;
  slot?: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: boolean | string;
  className?: string;
  style?: React.CSSProperties;
  onAdLoaded?: () => void;
}

export default function GoogleAdSenseAd({
  className = "",
  style,
  onAdLoaded,
}: GoogleAdSenseAdProps) {
  const pathname = usePathname();
  const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "");

  // مسدودسازی ۱۰۰٪ در بخش استودنت و پورتال‌ها
  if (
    currentPath.includes("/student") ||
    currentPath.includes("/dashboard") ||
    currentPath.includes("/admin") ||
    currentPath.includes("/teacher")
  ) {
    return null;
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load Adsterra native banner script
    const existingScript = container.querySelector("script[src*='bicea.org']");
    if (existingScript) {
      existingScript.remove();
    }

    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://bicea.org/21/ffb70d5f14558619a60ad9f6dbaf30fb";
      container.appendChild(script);
      onAdLoaded?.();
    } catch (e) {
      console.warn("Notice loading ad unit:", e);
    }

    return () => {
      try {
        const sc = container?.querySelector("script[src*='bicea.org']");
        if (sc && container.contains(sc)) {
          container.removeChild(sc);
        }
      } catch (e) {}
    };
  }, [onAdLoaded]);

  return (
    <div className={`adsterra-native-wrapper w-full overflow-hidden ${className}`} style={style}>
      <div
        ref={containerRef}
        id="container-ffb70d5f14558619a60ad9f6dbaf30fb"
        className="w-full min-h-[90px] flex items-center justify-center overflow-hidden"
      />
    </div>
  );
}
