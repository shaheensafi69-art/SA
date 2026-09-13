import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import PushAlertScript from "@/components/PushAlertScript";

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
  other: {
    "google-adsense-account": "ca-pub-6551903544426492",
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
        <meta name="google-adsense-account" content="ca-pub-6551903544426492" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-geist-sans: 'Inter', sans-serif;
              --font-geist-mono: 'JetBrains Mono', monospace;
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-950 text-white relative">
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6551903544426492"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18447660056"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-18447660056');
            `,
          }}
        />

        <PushAlertScript />

        {/* ویدیوی SplashScreen کاملاً حذف شد */}

        {children}
      </body>
    </html>
  );
}