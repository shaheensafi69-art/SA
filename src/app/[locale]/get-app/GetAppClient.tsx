"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Smartphone, Apple, Download, 
  Share, PlusSquare, Compass, ArrowLeft,
  CheckCircle2, BellRing, Video, ShieldCheck, Zap,
  Monitor, Laptop, Sparkles, HardDrive, Info, ExternalLink
} from "lucide-react";
import type { AppDownloadsData } from "@/lib/r2";
import { getAppTranslation } from "./getAppTranslations";

interface GetAppClientProps {
  downloads: AppDownloadsData;
}

export default function GetAppClient({ downloads }: GetAppClientProps) {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getAppTranslation(currentLocale);
  const isRtl = t.isRtl;

  const [activeTab, setActiveTab] = useState<"all" | "windows" | "mac" | "android" | "ios">("all");
  const [detectedOs, setDetectedOs] = useState<"windows" | "mac" | "android" | "ios" | "other">("other");

  // Detect user's Operating System automatically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes("win")) {
      setDetectedOs("windows");
    } else if (ua.includes("mac") && !ua.includes("iphone") && !ua.includes("ipad")) {
      setDetectedOs("mac");
    } else if (ua.includes("android")) {
      setDetectedOs("android");
    } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      setDetectedOs("ios");
    }
  }, []);

  const winFile = downloads.windows;
  const macFile = downloads.mac;
  const androidFile = downloads.android;

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#030305] text-white font-sans relative overflow-hidden selection:bg-fuchsia-500 selection:text-white pb-32"
    >
      {/* ================= AMBIENT BACKGROUND GLOWS ================= */}
      <div className="fixed -top-40 -left-40 w-[65vw] h-[65vw] bg-fuchsia-600/10 rounded-full blur-[170px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed -bottom-40 -right-40 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center">
        
        {/* ================= TOP BAR ================= */}
        <div className="w-full mb-10 flex items-center justify-between">
          <Link 
            href={`/${currentLocale}`} 
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-lg backdrop-blur-md group"
          >
            <ArrowLeft size={20} className={`group-hover:-translate-x-0.5 transition-transform ${isRtl ? "rotate-180 group-hover:translate-x-0.5" : ""}`} />
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-blue-500/10 border border-fuchsia-500/20 rounded-full text-[11px] font-black uppercase tracking-widest text-fuchsia-300 shadow-inner backdrop-blur-md">
            <Sparkles size={14} className="text-fuchsia-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.badge}</span>
          </div>
        </div>

        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-[fadeInUp_0.4s_ease-out]">
          <div className="w-24 h-24 mx-auto bg-gradient-to-b from-[#14141e] to-[#0a0a0f] shadow-[0_0_50px_rgba(217,70,239,0.35),inset_0_2px_10px_rgba(255,255,255,0.15)] border border-fuchsia-500/30 rounded-[2.2rem] flex items-center justify-center mb-8 relative group">
            <div className="absolute inset-0 bg-fuchsia-500/30 blur-[24px] rounded-[2.2rem] group-hover:bg-fuchsia-500/50 transition-colors" />
            <img 
              src="/logo-without-b.png" 
              alt="Safi Academy" 
              className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]" 
            />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            {t.title}
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {t.subtitle}
          </p>

          {/* Cloudflare R2 Indicator */}
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-neutral-400">
            <HardDrive size={13} className="text-emerald-400" />
            <span>{t.cdnPowered}</span>
          </div>
        </div>

        {/* ================= PLATFORM TABS ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl">
          {[
            { id: "all", label: t.allPlatforms, icon: <Sparkles size={14} /> },
            { id: "windows", label: t.windowsTab, icon: <Monitor size={14} /> },
            { id: "mac", label: t.macTab, icon: <Apple size={14} /> },
            { id: "android", label: t.androidTab, icon: <Smartphone size={14} /> },
            { id: "ios", label: t.iosTab, icon: <Laptop size={14} /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const isDetected = detectedOs === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {isDetected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" title={t.recommended} />
                )}
              </button>
            );
          })}
        </div>

        {/* ================= MAIN DOWNLOAD CARDS GRID ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* ---------------- 1. WINDOWS DESKTOP CARD ---------------- */}
          {(activeTab === "all" || activeTab === "windows") && (
            <div className={`relative group rounded-[2.5rem] p-1 transition-all duration-500 ${
              detectedOs === "windows"
                ? "bg-gradient-to-b from-blue-500/40 via-blue-600/20 to-transparent shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
                : "bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            }`}>
              <div className="h-full bg-[#07070b]/95 backdrop-blur-2xl rounded-[2.4rem] p-7 sm:p-9 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                {/* Windows Watermark Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-105 transition-transform">
                        {/* Windows Logo Icon */}
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-white">{t.windowsTitle}</h2>
                          {detectedOs === "windows" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase">
                              {t.recommended}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 font-medium mt-1">{t.windowsSubtitle}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider">
                      .EXE
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-3 gap-2.5 mb-7 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.fileSize}</span>
                      <span className="text-xs sm:text-sm font-black text-white">{winFile?.sizeFormatted || "107 MB"}</span>
                    </div>
                    <div className="border-x border-white/5">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.version}</span>
                      <span className="text-xs sm:text-sm font-black text-white">v0.1.0</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Setup</span>
                      <span className="text-xs sm:text-sm font-black text-blue-400">NSIS 64-Bit</span>
                    </div>
                  </div>

                  {/* Windows SmartScreen Helpful Tip */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-blue-200/90 text-xs mb-7 leading-relaxed">
                    <Info size={16} className="shrink-0 text-blue-400 mt-0.5" />
                    <span>{t.windowsTips}</span>
                  </div>
                </div>

                {/* Action Download Button */}
                <a
                  href={winFile?.url || "https://media.safiacademy.org/App%20For%20Win%20,%20Mac%20,%20Android/Safi%20Academy%20Setup%200.1.0.exe"}
                  download
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-3 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0 group/btn"
                >
                  <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                  <span>{t.windowsBtn}</span>
                </a>
              </div>
            </div>
          )}

          {/* ---------------- 2. MACOS DESKTOP CARD ---------------- */}
          {(activeTab === "all" || activeTab === "mac") && (
            <div className={`relative group rounded-[2.5rem] p-1 transition-all duration-500 ${
              detectedOs === "mac"
                ? "bg-gradient-to-b from-purple-500/40 via-purple-600/20 to-transparent shadow-[0_20px_60px_rgba(168,85,247,0.25)]"
                : "bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            }`}>
              <div className="h-full bg-[#07070b]/95 backdrop-blur-2xl rounded-[2.4rem] p-7 sm:p-9 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                {/* Mac Watermark Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-inner group-hover:scale-105 transition-transform">
                        <Apple size={34} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-white">{t.macTitle}</h2>
                          {detectedOs === "mac" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase">
                              {t.recommended}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 font-medium mt-1">{t.macSubtitle}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                      .PKG
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-3 gap-2.5 mb-7 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.fileSize}</span>
                      <span className="text-xs sm:text-sm font-black text-white">{macFile?.sizeFormatted || "126 MB"}</span>
                    </div>
                    <div className="border-x border-white/5">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.version}</span>
                      <span className="text-xs sm:text-sm font-black text-white">v0.1.0</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Silicon / Intel</span>
                      <span className="text-xs sm:text-sm font-black text-purple-400">Universal</span>
                    </div>
                  </div>

                  {/* Mac Installer Tip */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200/90 text-xs mb-7 leading-relaxed">
                    <Info size={16} className="shrink-0 text-purple-400 mt-0.5" />
                    <span>{t.macTips}</span>
                  </div>
                </div>

                {/* Action Download Button */}
                <a
                  href={macFile?.url || "https://media.safiacademy.org/App%20For%20Win%20,%20Mac%20,%20Android/Safi%20Academy%20Installer-0.1.0.pkg"}
                  download
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm flex items-center justify-center gap-3 transition-all shadow-[0_10px_25px_rgba(192,38,211,0.4)] hover:shadow-[0_15px_35px_rgba(192,38,211,0.6)] hover:-translate-y-0.5 active:translate-y-0 group/btn"
                >
                  <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                  <span>{t.macBtn}</span>
                </a>
              </div>
            </div>
          )}

          {/* ---------------- 3. ANDROID MOBILE CARD ---------------- */}
          {(activeTab === "all" || activeTab === "android") && (
            <div className={`relative group rounded-[2.5rem] p-1 transition-all duration-500 ${
              detectedOs === "android"
                ? "bg-gradient-to-b from-emerald-500/40 via-emerald-600/20 to-transparent shadow-[0_20px_60px_rgba(16,185,129,0.25)]"
                : "bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            }`}>
              <div className="h-full bg-[#07070b]/95 backdrop-blur-2xl rounded-[2.4rem] p-7 sm:p-9 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                        <Smartphone size={32} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-white">{t.androidTitle}</h2>
                          {detectedOs === "android" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase">
                              {t.recommended}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 font-medium mt-1">{t.androidSubtitle}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                      .APK
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-3 gap-2.5 mb-7 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.fileSize}</span>
                      <span className="text-xs sm:text-sm font-black text-white">{androidFile?.sizeFormatted || "~45 MB"}</span>
                    </div>
                    <div className="border-x border-white/5">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">{t.version}</span>
                      <span className="text-xs sm:text-sm font-black text-white">v0.1.0</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">OS</span>
                      <span className="text-xs sm:text-sm font-black text-emerald-400">Android 8.0+</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200/90 text-xs mb-7 leading-relaxed">
                    <Info size={16} className="shrink-0 text-emerald-400 mt-0.5" />
                    <span>{t.androidTips}</span>
                  </div>
                </div>

                {/* Buttons (Direct APK + Google Play) */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {androidFile ? (
                    <a
                      href={androidFile.url}
                      download
                      className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 group/btn"
                    >
                      <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                      <span>{t.androidBtn}</span>
                    </a>
                  ) : (
                    <a
                      href="https://media.safiacademy.org/App%20For%20Win%20,%20Mac%20,%20Android/Safi%20Academy.apk"
                      className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 group/btn"
                    >
                      <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                      <span>{t.androidBtn}</span>
                    </a>
                  )}

                  <a
                    href="https://play.google.com/store/apps/details?id=org.safiacademy.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink size={14} className="text-neutral-400" />
                    <span>{t.androidPlayStore}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 4. APPLE iOS / PWA CARD ---------------- */}
          {(activeTab === "all" || activeTab === "ios") && (
            <div className={`relative group rounded-[2.5rem] p-1 transition-all duration-500 ${
              detectedOs === "ios"
                ? "bg-gradient-to-b from-blue-500/40 via-cyan-600/20 to-transparent shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
                : "bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            }`}>
              <div className="h-full bg-[#07070b]/95 backdrop-blur-2xl rounded-[2.4rem] p-7 sm:p-9 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                        <Apple size={34} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-white">{t.iosTitle}</h2>
                          {detectedOs === "ios" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase">
                              {t.recommended}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 font-medium mt-1">{t.iosSubtitle}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-wider">
                      PWA
                    </span>
                  </div>

                  {/* 3-Step iOS Guide */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2 font-black text-xs">
                        <Compass size={18} />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-300 leading-snug">{t.iosStep1}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2 font-black text-xs">
                        <Share size={18} />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-300 leading-snug">{t.iosStep2}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center mb-2 font-black text-xs">
                        <PlusSquare size={18} />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-300 leading-snug">{t.iosStep3}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 size={16} />
                  <span>{t.iosComplete}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================= APP ADVANTAGES GRID ================= */}
        <div className="w-full mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
              {t.featuresHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                icon: <Video size={22}/>, 
                title: t.feat1Title, 
                desc: t.feat1Desc, 
                color: "text-red-400", 
                bg: "bg-red-500/10", 
                border: "border-red-500/20" 
              },
              { 
                icon: <BellRing size={22}/>, 
                title: t.feat2Title, 
                desc: t.feat2Desc, 
                color: "text-amber-400", 
                bg: "bg-amber-500/10", 
                border: "border-amber-500/20" 
              },
              { 
                icon: <ShieldCheck size={22}/>, 
                title: t.feat3Title, 
                desc: t.feat3Desc, 
                color: "text-emerald-400", 
                bg: "bg-emerald-500/10", 
                border: "border-emerald-500/20" 
              },
              { 
                icon: <Zap size={22}/>, 
                title: t.feat4Title, 
                desc: t.feat4Desc, 
                color: "text-blue-400", 
                bg: "bg-blue-500/10", 
                border: "border-blue-500/20" 
              },
            ].map((feat, i) => (
              <div 
                key={i} 
                className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] hover:bg-[#0e0e16] transition-all hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${feat.bg} ${feat.color} ${feat.border} group-hover:scale-105 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-white font-black text-sm mb-2">{feat.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECURITY & CDN FOOTER BANNER ================= */}
        <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-bold text-white block">{t.verifiedSafe}</span>
              <span className="text-[11px] text-neutral-400">Cloudflare R2 Storage (Bucket: safiacademy-media)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct CDN Link Active
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}