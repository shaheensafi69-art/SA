"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Share2, ShieldCheck } from "lucide-react";
import GoogleAdSenseAd from "./GoogleAdSenseAd";

interface InReelNativeAdProps {
  adIndex?: number;
  onShare?: () => void;
}

export default function InReelNativeAd({ adIndex = 0, onShare }: InReelNativeAdProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full h-full snap-start snap-always relative flex flex-col items-center justify-center bg-[#07070a] group overflow-hidden select-none shrink-0">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#C2185B]/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Sponsored Reel Badge */}
      <div className="absolute top-16 left-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-yellow-500/30 text-[10px] font-black uppercase tracking-widest text-yellow-400 shadow-xl">
          <Sparkles size={11} className="text-yellow-400" />
          Sponsored • Google AdSense
        </span>
      </div>

      {/* Official Google AdSense In-article / Fluid Unit - Sized to Reel Screen */}
      <div className="w-full max-w-[420px] px-4 flex-1 flex flex-col items-center justify-center relative z-10 my-auto">
        <div className="w-full bg-[#0d0e17]/90 border border-yellow-500/20 rounded-[2rem] p-4 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center min-h-[300px]">
          <GoogleAdSenseAd
            client="ca-pub-6551903544426492"
            slot="2638580043"
            layout="in-article"
            format="fluid"
            className="w-full flex items-center justify-center"
          />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 lg:bottom-10 left-4 z-20 space-y-1 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-yellow-400" />
          <span className="text-white font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
            Google Ads Network
          </span>
        </div>
        <p className="text-neutral-400 text-[11px] font-medium drop-shadow-md">
          Personalized Sponsored Content
        </p>
      </div>

      {/* Right Vertical Action Bar */}
      <div className="absolute bottom-20 lg:bottom-10 right-2.5 z-20 flex flex-col items-center gap-3.5">
        {/* Like */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center group/btn"
          title={isLiked ? "Unlike" : "Like"}
        >
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all shadow-lg ${
              isLiked
                ? "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.7)] scale-105"
                : "bg-black/45 border-white/20 text-white hover:bg-black/70 hover:scale-105"
            }`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-neutral-300 mt-1">Ad</span>
        </button>

        {/* Share */}
        <button
          onClick={onShare}
          className="flex flex-col items-center group/btn"
          title="Share"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 border border-white/20 text-white hover:bg-black/70 hover:scale-105 backdrop-blur-xl flex items-center justify-center transition-all shadow-lg">
            <Share2 size={19} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-neutral-300 mt-1">Share</span>
        </button>
      </div>
    </div>
  );
}
