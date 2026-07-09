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
  
  // بررسی اینکه آیا آدرس فعلی مربوط به یکی از پنل‌ها (داشبورد، ادمین یا استاد) است؟
  const isDashboardRoute = pathname?.includes("/dashboard");
  const isAdminRoute = pathname?.includes("/admin");
  const isTeacherRoute = pathname?.includes("/teacher");

  const isAnyPanel = isDashboardRoute || isAdminRoute || isTeacherRoute;

  // اگر داخل هر یک از پنل‌ها بودیم: بدون هدر/فوتر اصلی و بدون پدینگ رندر می‌شود
  return (
    <>
      {!isAnyPanel && <Header />}
      <main className={`flex-grow w-full h-full ${!isAnyPanel ? "pt-28 md:pt-32 lg:pt-36" : ""}`}>
        {children}
      </main>
      {!isAnyPanel && <Footer />}
    </>
  );
}