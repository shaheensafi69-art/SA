"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, ShieldCheck, CheckCircle2, MoreHorizontal, X, ArrowRight } from "lucide-react";

interface AdCampaign {
  id: string;
  sponsorName: string;
  sponsorHandle: string;
  sponsorAvatar: string;
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  category: string;
}

// کمپین‌های بومی پریمیوم (مانند اینستاگرام و فیسبوک)
const DEFAULT_CAMPAIGNS: AdCampaign[] = [
  {
    id: "ad-1",
    sponsorName: "Safi Cloud & Infrastructure",
    sponsorHandle: "@saficloud",
    sponsorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200",
    badge: "Official Sponsor",
    title: "High-Speed NVMe Developer Cloud & Free Domain",
    description: "Deploy Next.js, Node.js and Python projects with 99.99% uptime. Exclusive 60% student discount for Safi Academy community members.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200",
    ctaText: "Claim Cloud Offer",
    ctaLink: "/en/hosting",
    category: "Cloud Infrastructure"
  },
  {
    id: "ad-2",
    sponsorName: "Registered Agents Inc (US)",
    sponsorHandle: "@registeredagents",
    sponsorAvatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200",
    badge: "Corporate Partner",
    title: "Form Your US LLC or Corporation Worldwide",
    description: "Launch your American business entity from any country with professional registered agent representation, corporate privacy, and bank account readiness.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    ctaText: "Start US Formation",
    ctaLink: "/en/business-formation",
    category: "Global Business"
  },
  {
    id: "ad-3",
    sponsorName: "Safi Academy Masterclasses",
    sponsorHandle: "@safiacademy",
    sponsorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    badge: "Featured Program",
    title: "Full-Stack AI & Cloud Engineering Certification",
    description: "Master modern AI agents, Next.js 14, and scalable microservices. Get verified credentials shareable on LinkedIn and recognized globally.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
    ctaText: "Explore Curriculum",
    ctaLink: "/en/courses",
    category: "Masterclass"
  }
];

interface InFeedNativeAdProps {
  adIndex?: number;
  adSlotId?: string; // برای گوگل ادسنس در صورت فعال‌بودن
}

export default function InFeedNativeAd({ adIndex = 0, adSlotId }: InFeedNativeAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const campaign = DEFAULT_CAMPAIGNS[adIndex % DEFAULT_CAMPAIGNS.length];

  if (isDismissed) return null;

  return (
    <div className="bg-[#0a0a0f]/80 border border-yellow-500/20 rounded-[2.5rem] p-5 sm:p-8 backdrop-blur-md space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden group">

      {/* هاله نور پس‌زمینه ملایم برای تمایز لوکس اما بدون مزاحمت */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

      {/* سرتیتر ادسنس / اسپانسر دقیقاً با هماهنگی ابعاد و المان‌های پست فید */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-[1.2rem] bg-neutral-800 border-2 border-yellow-500/40 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
            <img src={campaign.sponsorAvatar} alt={campaign.sponsorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs sm:text-[15px] tracking-wide">
                {campaign.sponsorName}
              </span>
              <CheckCircle2 size={14} className="text-yellow-400 fill-yellow-400/20" />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-neutral-400 font-medium">{campaign.sponsorHandle}</span>
              <span className="text-neutral-600">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                <Sparkles size={10} /> Sponsored
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-neutral-500 hover:text-neutral-300 p-2 transition-colors bg-white/5 rounded-xl hover:bg-white/10"
          title="Hide Ad"
        >
          <X size={16} />
        </button>
      </div>

      {/* تگ دسته آگهی */}
      <div className="inline-block px-3.5 py-1.5 bg-gradient-to-r from-yellow-500/20 to-transparent border-l-2 border-yellow-500 rounded-r-lg text-yellow-300 text-[10px] font-black uppercase tracking-widest mt-1 shadow-sm">
        {campaign.badge} • {campaign.category}
      </div>

      {/* عنوان و توضیحات آگهی با همان فونت و خوانایی متن پست‌های عادی */}
      <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
        {campaign.title}
      </h3>
      <p className="text-neutral-300 text-[15px] leading-relaxed">
        {campaign.description}
      </p>

      {/* تصویر آگهی (با نسبت دقیق و متناسب باکس پست فید - بدون فول‌اسکرین شدن) */}
      <div className="relative rounded-2xl border border-white/10 bg-[#050508] overflow-hidden group/img">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full max-h-[380px] object-cover rounded-2xl group-hover/img:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

        {/* نشان گوشه تصویر */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="text-[11px] text-white/90 font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            Ad Promotion
          </span>
          <Link
            href={campaign.ctaLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            {campaign.ctaText} <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <hr className="border-white/5" />

      {/* نوار فوتر آگهی - شبیه اکشن بار فیسبوک و اینستاگرام */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold">
          <ShieldCheck size={16} className="text-yellow-500" />
          <span>Verified Sponsor</span>
        </div>
        <Link
          href={campaign.ctaLink}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <span>Learn More</span>
          <ExternalLink size={13} />
        </Link>
      </div>

    </div>
  );
}
