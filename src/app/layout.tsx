import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Safi Academy",
  applicationName: "Safi Academy",
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
    <html lang="en" className="h-full antialiased">
      <head>
        {/* دریافت مستقیم فونت‌ها از گوگل در مرورگر کاربر به جای زمان Build سرور */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* تزریق متغیرهای فونت برای اینکه کدهای Tailwind شما دقیقاً مثل قبل کار کنند */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-geist-sans: 'Inter', sans-serif;
              --font-geist-mono: 'JetBrains Mono', monospace;
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}