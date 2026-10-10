"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, X } from "lucide-react";

interface AdsterraNativeBannerProps {
  className?: string;
  category?: string;
  niche?: string;
  title?: string;
  keywords?: string;
  badgeLabel?: string;
  minimal?: boolean;
  canDismiss?: boolean;
}

export default function AdsterraNativeBanner({
  className = "",
  category = "Educational & Professional Tech",
  niche,
  title,
  keywords = "tech, software, career, certification, digital skills",
  badgeLabel,
  minimal = false,
  canDismiss = false,
}: AdsterraNativeBannerProps) {
  const activeBadge = title || badgeLabel || "Verified Partner";
  const activeCategory = niche || category;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const scriptInjectedRef = useRef(false);

  useEffect(() => {
    if (isDismissed) return;
    const container = containerRef.current;
    if (!container) return;

    // Remove any previously appended script tag to allow clean re-execution on client transitions
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
      scriptInjectedRef.current = true;
    } catch (e) {
      console.warn("Notice loading native ad widget:", e);
    }

    return () => {
      try {
        const sc = container?.querySelector("script[src*='bicea.org']");
        if (sc && container.contains(sc)) {
          container.removeChild(sc);
        }
      } catch (e) {}
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const innerWidget = (
    <div
      ref={containerRef}
      id="container-ffb70d5f14558619a60ad9f6dbaf30fb"
      className="w-full min-h-[90px] flex items-center justify-center overflow-hidden transition-all duration-300"
      data-ai-niche={activeCategory}
      data-keywords={keywords}
    />
  );

  if (minimal) {
    return (
      <div 
        className={`w-full overflow-hidden ${className}`}
        data-ai-category={activeCategory}
        data-ai-keywords={keywords}
      >
        {innerWidget}
      </div>
    );
  }

  return (
    <section
      aria-label="Sponsored Partner Recommendations"
      data-ai-category={activeCategory}
      data-ai-keywords={keywords}
      className={`w-full bg-[#0a0a0f]/90 border border-yellow-500/20 hover:border-yellow-500/35 rounded-[2rem] p-4 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300 my-8 max-w-5xl mx-auto group ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[90px] pointer-events-none group-hover:bg-yellow-500/10 transition-colors" />
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/35 to-transparent" />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 text-xs border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
            <Sparkles size={12} />
          </div>
          <span className="font-bold tracking-wider uppercase text-yellow-400 text-[11px] flex items-center gap-1">
            {activeBadge} <ShieldCheck size={13} className="text-yellow-400" />
          </span>
          {activeCategory && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-400 font-mono">
              {category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
            Partner Recommendations
          </span>
          {canDismiss && (
            <button
              onClick={() => setIsDismissed(true)}
              className="text-neutral-500 hover:text-neutral-300 p-1 transition-colors rounded-lg hover:bg-white/5"
              aria-label="Dismiss ad"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Native Ad Container */}
      {innerWidget}
    </section>
  );
}
