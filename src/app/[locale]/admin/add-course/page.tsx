"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AddCourseRedirectPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";

  useEffect(() => {
    router.replace(`/${currentLocale}/admin/courses/create`);
  }, [router, currentLocale]);

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
      <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
        Directing to Masterclass Builder...
      </p>
    </div>
  );
}
