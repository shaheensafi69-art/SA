"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // بررسی مسیرهای پنل‌ها و صفحات احراز هویت (لاگین و ثبت‌نام)
  const isDashboardRoute = pathname?.includes("/dashboard");
  const isAdminRoute = pathname?.includes("/admin");
  const isTeacherRoute = pathname?.includes("/teacher");
  const isAuthRoute = pathname?.includes("/login") || pathname?.includes("/register");

  const isHiddenLayout = isDashboardRoute || isAdminRoute || isTeacherRoute || isAuthRoute;

  // اگر داخل پنل‌ها یا صفحات لاگین/ثبت‌نام بودیم: هدر و فوتر مخفی می‌شوند
  return (
    <>
      {!isHiddenLayout && <Header />}
      <main className={`flex-grow w-full h-full ${!isHiddenLayout ? "pt-28 md:pt-32 lg:pt-36" : ""}`}>
        {children}
      </main>
      {!isHiddenLayout && <Footer />}
    </>
  );
}