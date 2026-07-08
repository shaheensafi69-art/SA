import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ایمپورت کردن کامپوننت مدیریت لایاوت
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ۱. تنظیمات Viewport برای اپلیکیشن (رنگ مشکی لاکچری برای نوار بالای گوشی)
export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ۲. تنظیمات متادیتا و مانیفست برای تبدیل سایت به اپلیکیشن (کاملاً حفظ شده است)
export const metadata: Metadata = {
  title: "Safi Academy",
  description: "The premium educational platform for modern skills.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Safi Academy",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        
        {/* مدیریت نمایش هدر، فوتر و پدینگ دسکتاپ/موبایل */}
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        
      </body>
    </html>
  );
}