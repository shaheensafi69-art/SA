"use client";

import AdsterraNativeBanner from "./AdsterraNativeBanner";

interface GoogleAdCardProps {
  currentLocale?: string;
  slotId?: string;
  layoutKey?: string;
  className?: string;
}

export default function GoogleAdCard({
  currentLocale = "en",
  className = "",
}: GoogleAdCardProps) {
  const isRtl = ["fa", "ps", "ar", "ur"].includes(currentLocale);

  return (
    <div className={`w-full my-4 ${className}`}>
      <AdsterraNativeBanner
        title={isRtl ? "محتوای تاییدشده همکاران" : "Verified Partner Showcase"}
        niche="Global Education, Technology, Software & Online Services"
        keywords="online courses, learning, technology, software tools, remote work"
      />
    </div>
  );
}
