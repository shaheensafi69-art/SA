"use client";

import { useEffect, useRef } from "react";

interface AdSenseInFeedProps {
  currentLocale?: string;
  slot?: string;
  layoutKey?: string;
  className?: string;
}

export default function AdSenseInFeed({
  currentLocale = "en",
  slot = "6514651420",
  layoutKey = "-ac+c5-5i-c8+17e",
  className = "",
}: AdSenseInFeedProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        const status = adRef.current.getAttribute("data-adsbygoogle-status");
        if (!status && !isPushedRef.current) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isPushedRef.current = true;
        }
      }
    } catch (err) {
      console.warn("AdSense in-feed push notice:", err);
    }
  }, [slot, currentLocale]);

  return (
    <div className={`w-full overflow-hidden my-3 ${className}`}>
      <ins
        ref={adRef}
        key={`adsense-infeed-${currentLocale}-${slot}`}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client="ca-pub-6551903544426492"
        data-ad-slot={slot}
      />
    </div>
  );
}
