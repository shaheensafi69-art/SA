"use client";

import AdsterraNativeBanner from "./AdsterraNativeBanner";

interface AdSenseInFeedProps {
  currentLocale?: string;
  slot?: string;
  layoutKey?: string;
  className?: string;
}

export default function AdSenseInFeed({
  currentLocale = "en",
  className = "",
}: AdSenseInFeedProps) {
  const isRtl = ["fa", "ps", "ar", "ur"].includes(currentLocale);

  return (
    <div className={`w-full overflow-hidden my-3 ${className}`}>
      <AdsterraNativeBanner
        title={isRtl ? "محتوای اسپانسر شده در فید" : "In-Feed Featured Sponsor"}
        niche="Social Feed, Community, Technology, Education & Services"
        keywords="feed sponsor, courses, technology, software tools, student community"
      />
    </div>
  );
}
