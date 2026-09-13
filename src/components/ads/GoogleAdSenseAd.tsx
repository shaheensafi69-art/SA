"use client";

import React, { useEffect, useRef, useState } from "react";

interface GoogleAdSenseAdProps {
  client?: string;
  slot?: string;
  layout?: string;
  format?: string;
  className?: string;
  style?: React.CSSProperties;
  onAdLoaded?: () => void;
}

export default function GoogleAdSenseAd({
  client = "ca-pub-6551903544426492",
  slot = "2638580043",
  layout = "in-article",
  format = "fluid",
  className = "",
  style = { display: "block", textAlign: "center" },
  onAdLoaded,
}: GoogleAdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef(false);
  const [hasAdFilled, setHasAdFilled] = useState(false);

  useEffect(() => {
    // Ensure Google AdSense script is present in document head
    if (typeof window !== "undefined") {
      const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
    }

    // Push ad unit once when element is ready
    const pushTimer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && adRef.current) {
          const status = adRef.current.getAttribute("data-adsbygoogle-status");
          if (!status && !isPushedRef.current) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            isPushedRef.current = true;
          }
        }
      } catch (err) {
        console.warn("AdSense push notice:", err);
      }
    }, 200);

    // Observe when Google AdSense injects the ad iframe
    let observer: MutationObserver | null = null;
    if (adRef.current) {
      observer = new MutationObserver(() => {
        if (adRef.current) {
          const iframe = adRef.current.querySelector("iframe");
          const adStatus = adRef.current.getAttribute("data-ad-status");
          if (iframe && adStatus === "filled") {
            setHasAdFilled(true);
            onAdLoaded?.();
          }
        }
      });

      observer.observe(adRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-ad-status", "data-adsbygoogle-status"],
      });
    }

    return () => {
      clearTimeout(pushTimer);
      if (observer) observer.disconnect();
    };
  }, [client, slot, onAdLoaded]);

  return (
    <div className={`google-adsense-wrapper w-full overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
}
