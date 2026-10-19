"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartAdBanner from "@/components/ads/SmartAdBanner";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [clientPath, setClientPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientPath(window.location.pathname);
    }
  }, []);

  const path = pathname || clientPath || "";

  // تشخیص دقیق مسیرهای پورتال‌ها و صفحات مستقل
  const isStudentRoute = Boolean(path.includes("/student") || path.includes("/dashboard"));
  const isAdminRoute = Boolean(path.includes("/admin"));
  const isTeacherRoute = Boolean(path.includes("/teacher"));
  const isFeedRoute = Boolean(path.includes("/feed"));
  const isAuthRoute = Boolean(path.includes("/login") || path.includes("/register") || path.includes("/forgot-password") || path.includes("/reset-password"));

  const isPortal = isStudentRoute || isAdminRoute || isTeacherRoute;
  const isHiddenLayout = isPortal || isAuthRoute || isFeedRoute;

  // ۱. برای پورتال دانش‌آموز (و سایر پورتال‌ها)، هیچ هیدر، فوتر یا تبلیغاتی رندر نمی‌شود و پدینگ صفر است
  if (isPortal || isStudentRoute) {
    return (
      <main className="w-full h-full min-h-screen p-0 m-0 overflow-hidden bg-[#030305]">
        {children}
      </main>
    );
  }

  // ۲. برای صفحات اختصاصی مثل لاگین و فید
  if (isHiddenLayout) {
    return (
      <main className="w-full h-full min-h-screen p-0 m-0">
        {children}
      </main>
    );
  }

  // ۳. صفحات عمومی آکادمی (خانه، دوره‌ها، بورسیه‌ها و...)
  return (
    <>
      <Header />
      
      <main className="flex-grow w-full h-full pt-28 md:pt-32 lg:pt-36">
        {children}

        {/* بنر خودکار فقط در صفحات عمومی سایت */}
        <div className="container mx-auto px-4">
          <SmartAdBanner slotType="footer-top" />
        </div>
      </main>

      <Footer />

      {/* بنر شناور شیک در پایین صفحات عمومی */}
      <SmartAdBanner slotType="sticky-bottom" />
    </>
  );
}