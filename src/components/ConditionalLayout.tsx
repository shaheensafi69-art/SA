"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartAdBanner from "@/components/ads/SmartAdBanner";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isDashboardRoute = pathname?.includes("/dashboard");
  const isAdminRoute = pathname?.includes("/admin");
  const isTeacherRoute = pathname?.includes("/teacher");
  const isFeedRoute = pathname?.includes("/feed");
  const isAuthRoute = pathname?.includes("/login") || pathname?.includes("/register");

  const isPortal = isDashboardRoute || isAdminRoute || isTeacherRoute;
  const isHiddenLayout = isPortal || isAuthRoute || isFeedRoute;

  return (
    <>
      {!isHiddenLayout && <Header />}
      
      <main className={`flex-grow w-full h-full ${!isHiddenLayout ? "pt-28 md:pt-32 lg:pt-36" : ""}`}>
        {children}

        {/* بنر خودکار قبل از فوتر (فقط در صفحات عمومی سایت، بدون ورود به پنل‌ها) */}
        {!isPortal && !isAuthRoute && (
          <div className="container mx-auto px-4">
            <SmartAdBanner slotType="footer-top" />
          </div>
        )}
      </main>

      {!isHiddenLayout && <Footer />}

      {/* بنر شناور شیک در پایین تمام صفحات عمومی */}
      {!isPortal && !isAuthRoute && (
        <SmartAdBanner slotType="sticky-bottom" />
      )}
    </>
  );
}