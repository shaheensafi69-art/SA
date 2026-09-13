"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, ShieldCheck, Heart, Share2, ArrowRight } from "lucide-react";

interface ReelAdCampaign {
  id: string;
  sponsorName: string;
  sponsorHandle: string;
  sponsorAvatar: string;
  badge: string;
  title: string;
  description: string;
  backgroundMedia: string;
  ctaText: string;
  ctaLink: string;
}

const REEL_CAMPAIGNS: ReelAdCampaign[] = [
  {
    id: "reel-ad-1",
    sponsorName: "Safi Academy Masterclasses",
    sponsorHandle: "@safiacademy",
    sponsorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    badge: "Official Sponsor",
    title: "Master AI Engineering & Next.js 14",
    description: "Launch your career with verified diplomas, mentorship & project portfolios recognized by global tech companies.",
    backgroundMedia: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200",
    ctaText: "Enroll in Masterclass",
    ctaLink: "/en/courses"
  },
  {
    id: "reel-ad-2",
    sponsorName: "Registered Agents Inc (US)",
    sponsorHandle: "@registeredagents",
    sponsorAvatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200",
    badge: "Corporate Partner",
    title: "Form Your US LLC from Anywhere",
    description: "Start your American company today. Fast 50-state filings, registered agent privacy, and Stripe banking readiness.",
    backgroundMedia: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    ctaText: "Start US Company",
    ctaLink: "/en/business-formation"
  },
  {
    id: "reel-ad-3",
    sponsorName: "Safi Cloud Deals",
    sponsorHandle: "@saficloud",
    sponsorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200",
    badge: "Infrastructure",
    title: "Fast NVMe Web Hosting & Free Domain",
    description: "Get lightning-speed performance for your apps and websites. 60% student and founder discount available.",
    backgroundMedia: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    ctaText: "Explore Hosting Deals",
    ctaLink: "/en/hosting"
  }
];

interface InReelNativeAdProps {
  adIndex?: number;
  onShare?: () => void;
}

export default function InReelNativeAd({ adIndex = 0, onShare }: InReelNativeAdProps) {
  const [isLiked, setIsLiked] = useState(false);
  const campaign = REEL_CAMPAIGNS[adIndex % REEL_CAMPAIGNS.length];

  return (
    <div className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-black group overflow-hidden">

      {/* تصویر یا بک‌گراند موشن آگهی ریلز در سایز استاندارد عمودی 9:16 */}
      <img
        src={campaign.backgroundMedia}
        alt={campaign.title}
        className="w-full h-full object-cover bg-black opacity-90"
      />

      {/* گرادینت تاریک برای خوانایی عالی متن (دقیقاً هماهنگ با ریلزهای اصلی) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none lg:rounded-[2rem]"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>

      {/* بج اسپانسر در بالای ریلز */}
      <div className="absolute top-6 left-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-yellow-500/30 text-[10px] font-black uppercase tracking-widest text-yellow-400 shadow-xl">
          <Sparkles size={11} className="text-yellow-400" />
          Sponsored Reel
        </span>
      </div>

      {/* ================= نوار اطلاعات اسپانسر و آگهی در پایین چپ ================= */}
      <div className="absolute bottom-20 lg:bottom-10 left-3.5 right-18 z-20 space-y-3 pointer-events-auto">

        {/* دکمه برجسته و زیبای اکشن (CTA) شبیه آگهی‌های اینستاگرام ریلز */}
        <Link
          href={campaign.ctaLink}
          className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-amber-400 text-black font-black uppercase text-xs tracking-wider rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:scale-[1.02] active:scale-95 transition-all max-w-[280px]"
        >
          <span>{campaign.ctaText}</span>
          <ArrowRight size={15} />
        </Link>

        {/* پروفایل اسپانسر */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-yellow-500/60 overflow-hidden flex items-center justify-center shrink-0 shadow-lg">
            <img src={campaign.sponsorAvatar} alt={campaign.sponsorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
                {campaign.sponsorName}
              </span>
              <ShieldCheck size={14} className="text-yellow-400" />
            </div>
            <span className="inline-block px-2 py-0.5 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-200 text-[8px] sm:text-[9px] font-black uppercase tracking-wider rounded mt-0.5 shadow-sm">
              {campaign.badge}
            </span>
          </div>
        </div>

        {/* عنوان و کپشن */}
        <div>
          <h3 className="text-white font-bold text-xs sm:text-sm drop-shadow-md leading-snug">
            {campaign.title}
          </h3>
          <p className="text-neutral-200 text-[11px] sm:text-xs font-medium mt-1 drop-shadow-md leading-relaxed line-clamp-2">
            {campaign.description}
          </p>
        </div>
      </div>

      {/* ================= اکشن بار عمودی سمت راست ================= */}
      <div className="absolute bottom-20 lg:bottom-10 right-2.5 z-20 flex flex-col items-center gap-3.5 sm:gap-4.5">
        {/* Like */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center group/btn"
          title={isLiked ? "Unlike" : "Like"}
        >
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all shadow-lg ${isLiked
            ? "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.7)] scale-105"
            : "bg-black/45 border-white/20 text-white hover:bg-black/70 hover:scale-105"
            }`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-neutral-300 mt-1">Sponsored</span>
        </button>

        {/* External Link */}
        <Link
          href={campaign.ctaLink}
          className="flex flex-col items-center group/btn"
          title="Open Website"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 border border-white/20 text-white hover:bg-black/70 hover:scale-105 backdrop-blur-xl flex items-center justify-center transition-all shadow-lg">
            <ExternalLink size={19} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-neutral-300 mt-1">Visit</span>
        </Link>

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
