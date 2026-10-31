"use client";

import { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  LogOut,
  Bell,
  ShieldCheck,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Presentation,
  CircleDollarSign,
  Trophy,
  Megaphone,
  Video,
  Headset,
  Settings,
  Grid,
  Rss,
  Newspaper,
  GraduationCap,
  ClipboardList,
  RefreshCw,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Menu,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

type AdminMenuItem = {
  id: string;
  name: string;
  path: string;
  icon: any;
  category: "core" | "academics" | "finance" | "support";
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // وضعیت دکمه سینک محصولات
  const [isSyncingProducts, setIsSyncingProducts] = useState(false);
  const [syncToast, setSyncToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isLiveMeetRoute = pathname.includes("/admin/live-classes/") && pathname.split("/").length > 4;
  const isTicketChatRoute = pathname.includes("/admin/tickets/chat");
  const isFullScreenRoute = isLiveMeetRoute || isTicketChatRoute;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // بازیابی وضعیت جمع‌شدن سایدبار از localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("safi_admin_sidebar_collapsed");
      if (saved === "true") setIsCollapsed(true);
    }
  }, []);

  const toggleSidebarCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("safi_admin_sidebar_collapsed", next ? "true" : "false");
    }
  };

  useEffect(() => {
    const supabase = createClient();

    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && !userError) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, role")
          .eq("id", user.id)
          .single();

        if (profile) {
          if (profile.role !== "admin" && profile.role !== "super_admin") {
            router.replace(`/${currentLocale}/student`);
            return;
          }
          setUserProfile({ ...profile, id: user.id });
        }
        setIsReady(true);
      } else {
        router.replace(`/${currentLocale}/login`);
      }
    };

    fetchProfile();
  }, [router, currentLocale]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace(`/${currentLocale}/login`);
  };

  // تابع اجرای عملیات سینک محصولات تلگرام / فروشگاه
  const handleSyncProducts = async () => {
    if (isSyncingProducts) return;
    setIsSyncingProducts(true);
    setSyncToast(null);

    try {
      const res = await fetch("/api/admin/sync-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSyncToast({
          type: "success",
          text: data.message || (isRtl ? "همگام‌سازی محصولات با موفقیت انجام شد ✓" : "Products synced successfully ✓"),
        });
      } else {
        throw new Error(data.error || (isRtl ? "خطا در همگام‌سازی محصولات" : "Sync failed"));
      }
    } catch (err: any) {
      console.error("Products sync error:", err);
      setSyncToast({
        type: "error",
        text: err.message || (isRtl ? "ارتباط با سرور برقرار نشد." : "Failed to sync products."),
      });
    } finally {
      setIsSyncingProducts(false);
      setTimeout(() => setSyncToast(null), 4500);
    }
  };

  const menuItems: AdminMenuItem[] = [
    // Core
    { id: "overview", name: t.admin?.overview || (isRtl ? "مرکز فرماندهی" : "Overview"), path: `/${currentLocale}/admin`, icon: LayoutDashboard, category: "core" },
    { id: "feed", name: t.admin?.feed || (isRtl ? "فید آکادمی" : "Community Feed"), path: `/${currentLocale}/feed`, icon: Rss, category: "core" },
    
    // Academics
    { id: "courses", name: t.admin?.courses || (isRtl ? "دوره‌های آموزشی" : "Courses"), path: `/${currentLocale}/admin/courses`, icon: BookOpen, category: "academics" },
    { id: "classes", name: t.admin?.classes || (isRtl ? "صنف‌های فعال" : "Class Cohorts"), path: `/${currentLocale}/admin/classes`, icon: Presentation, category: "academics" },
    { id: "liveStudio", name: t.admin?.liveStudio || (isRtl ? "استودیو پخش زنده" : "Live Studio"), path: `/${currentLocale}/admin/live-classes`, icon: Video, category: "academics" },
    { id: "students", name: t.admin?.students || (isRtl ? "دانشجویان" : "Students"), path: `/${currentLocale}/admin/manage-students`, icon: Users, category: "academics" },
    { id: "faculty", name: t.admin?.faculty || (isRtl ? "هیئت علمی" : "Faculty"), path: `/${currentLocale}/admin/manage-teachers`, icon: UserCheck, category: "academics" },
    { id: "applications", name: t.admin?.applications || (isRtl ? "درخواست‌های تدریس" : "Applications"), path: `/${currentLocale}/admin/application-form`, icon: ClipboardList, category: "academics" },

    // Finance & Growth
    { id: "finance", name: t.admin?.finance || (isRtl ? "خزانه‌داری و مالی" : "Finance"), path: `/${currentLocale}/admin/finance`, icon: CircleDollarSign, category: "finance" },
    { id: "scholarships", name: t.admin?.scholarships || (isRtl ? "بورسیه‌ها" : "Scholarships"), path: `/${currentLocale}/admin/scholarships/create`, icon: GraduationCap, category: "finance" },
    { id: "honors", name: t.admin?.honors || (isRtl ? "افتخارات و نشان‌ها" : "Honors & Badges"), path: `/${currentLocale}/admin/awards`, icon: Trophy, category: "finance" },

    // Support & Communications
    { id: "tickets", name: t.admin?.tickets || (isRtl ? "تیکت‌های پشتیبانی" : "Support Tickets"), path: `/${currentLocale}/admin/tickets`, icon: Headset, category: "support" },
    { id: "notices", name: t.admin?.notices || (isRtl ? "اعلانات سراسری" : "Broadcasts"), path: `/${currentLocale}/admin/announcements`, icon: Megaphone, category: "support" },
    { id: "blogs", name: t.admin?.blogs || (isRtl ? "وبلاگ و اخبار" : "Academy Blog"), path: `/${currentLocale}/admin/blogs/create`, icon: Newspaper, category: "support" },
    { id: "settings", name: t.admin?.settings || (isRtl ? "تنظیمات سامانه" : "Settings"), path: `/${currentLocale}/admin/settings`, icon: Settings, category: "support" },
  ];

  const categories = [
    { key: "core", label: isRtl ? "فرماندهی و شبکه" : "Core & Network" },
    { key: "academics", label: isRtl ? "آموزش و کلاس‌ها" : "Academics & Faculty" },
    { key: "finance", label: isRtl ? "خزانه‌داری و مالی" : "Finance & Growth" },
    { key: "support", label: isRtl ? "پشتیبانی و ارتباطات" : "Support & Operations" },
  ];

  if (!isReady) {
    return (
      <div dir={t.dir} className="min-h-screen flex flex-col items-center justify-center bg-[#020205] text-white">
        <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_25px_rgba(244,63,94,0.4)]" />
        <span className="text-rose-500 font-bold uppercase tracking-widest text-xs animate-pulse">
          {t.admin?.initializing || (isRtl ? "در حال اتصال به پنل مدیریت ارشد..." : "Initializing Command Center...")}
        </span>
      </div>
    );
  }

  return (
    <div
      dir={t.dir}
      className="flex h-screen bg-[#020205] text-white font-sans overflow-hidden relative selection:bg-rose-500 selection:text-white"
    >
      {/* Background Ambient Glows */}
      <div
        className="fixed top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-rose-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "9s" }}
      />
      <div
        className="fixed bottom-[-15%] right-[-15%] w-[45vw] h-[45vw] bg-indigo-600/[0.03] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "11s" }}
      />

      {/* ================= TOAST FOR PRODUCT SYNC ================= */}
      {syncToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-[fadeInDown_0.3s_ease-out] w-full max-w-md px-4 pointer-events-none">
          <div
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
              syncToast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                : "bg-rose-950/90 border-rose-500/40 text-rose-200 shadow-[0_10px_30px_rgba(244,63,94,0.3)]"
            }`}
          >
            {syncToast.type === "success" ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={20} className="text-rose-400 shrink-0" />
            )}
            <p className="text-xs sm:text-sm font-bold flex-1">{syncToast.text}</p>
            <button
              onClick={() => setSyncToast(null)}
              className="text-white/40 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ================= 1. DESKTOP ADVANCED SIDEBAR ================= */}
      <aside
        className={`hidden lg:flex ${
          isCollapsed ? "w-[84px]" : "w-[290px]"
        } bg-[#06060c]/95 backdrop-blur-3xl ${
          isRtl ? "border-l border-r-0" : "border-r border-l-0"
        } border-white/[0.06] flex-col relative z-30 shrink-0 transition-all duration-300 p-3.5 shadow-[15px_0_40px_rgba(0,0,0,0.8)]`}
      >
        {/* Brand Header */}
        <div className="mb-3 p-3 rounded-2xl bg-gradient-to-br from-[#0c0c16] to-[#07070d] border border-white/5 shadow-inner relative group shrink-0">
          <div className="flex items-center justify-between">
            <Link
              href={`/${currentLocale}/admin`}
              className={`flex items-center gap-3 relative z-10 ${isCollapsed ? "justify-center w-full" : ""}`}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-rose-500/25 blur-[10px] rounded-full" />
                <img
                  src="/logo-without-b.png"
                  alt="Safi Academy"
                  className="relative z-10 w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(244,63,94,0.7)]"
                />
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 truncate">
                    Safi Academy
                    <Sparkles size={11} className="text-rose-400 animate-spin" style={{ animationDuration: "5s" }} />
                  </h2>
                  <p className="text-[9px] text-rose-400 font-bold uppercase tracking-[0.2em] mt-0.5 truncate">
                    {t.admin?.commandCenter || (isRtl ? "مرکز فرماندهی ارشد" : "Command Center")}
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Sync Reseller Products Button in Sidebar */}
        <div className="mb-3 px-1">
          <button
            type="button"
            onClick={handleSyncProducts}
            disabled={isSyncingProducts}
            className={`w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/25 text-amber-300 hover:text-white transition-all text-xs font-bold flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } shadow-[0_0_15px_rgba(245,158,11,0.15)] group active:scale-95 disabled:opacity-50`}
            title={isRtl ? "همگام‌سازی لحظه‌ای محصولات فروشگاه و تلگرام" : "Sync Reseller Products"}
          >
            <div className="flex items-center gap-2">
              <RefreshCw
                size={15}
                className={`text-amber-400 shrink-0 ${isSyncingProducts ? "animate-spin text-white" : "group-hover:rotate-180 transition-transform duration-500"}`}
              />
              {!isCollapsed && (
                <span className="text-[11px] font-black truncate">
                  {isSyncingProducts ? (isRtl ? "در حال سینک..." : "Syncing...") : (isRtl ? "سینک محصولات" : "Sync Products")}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>

        {/* Navigation Links (Categorized) */}
        <nav className={`flex-1 overflow-y-auto space-y-4 custom-scrollbar ${isRtl ? "pl-1 pr-0" : "pr-1 pl-0"}`}>
          {categories.map((cat) => {
            const catItems = menuItems.filter((i) => i.category === cat.key);
            if (catItems.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-1">
                {!isCollapsed && (
                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 px-3 py-1">
                    {cat.label}
                  </p>
                )}

                {catItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.path === `/${currentLocale}/admin`
                      ? pathname === `/${currentLocale}/admin`
                      : pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      title={isCollapsed ? item.name : undefined}
                      className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 relative group overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r from-rose-950/40 via-[#181116] to-[#0a0a10] text-white shadow-[0_0_15px_rgba(244,63,94,0.15)] border border-rose-500/30 ${
                              isRtl ? "-translate-x-0.5" : "translate-x-0.5"
                            }`
                          : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5"
                      } ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                      {isActive && (
                        <div
                          className={`absolute ${
                            isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                          } top-1/2 -translate-y-1/2 w-1 h-5 bg-rose-500 shadow-[0_0_10px_#f43f5e]`}
                        />
                      )}

                      <span
                        className={`transition-all duration-200 shrink-0 ${
                          isActive
                            ? "scale-110 text-rose-400"
                            : "group-hover:scale-110 group-hover:text-white text-neutral-400"
                        }`}
                      >
                        <Icon size={18} />
                      </span>

                      {!isCollapsed && (
                        <span className="tracking-wide truncate text-xs font-semibold">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer: Profile, Collapse Toggle & Sign Out */}
        <div className="mt-2 pt-3 border-t border-white/[0.06] space-y-2 shrink-0">
          {/* Collapse/Expand Desktop Button */}
          <button
            onClick={toggleSidebarCollapse}
            className={`w-full py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-neutral-400 hover:text-white text-[11px] font-bold flex items-center transition-all ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
            title={isCollapsed ? (isRtl ? "باز کردن سایدبار" : "Expand Sidebar") : (isRtl ? "بستن سایدبار" : "Collapse Sidebar")}
          >
            {!isCollapsed && <span>{isRtl ? "جمع‌کردن منو" : "Collapse Menu"}</span>}
            {isCollapsed ? (
              isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
            ) : (
              isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
            )}
          </button>

          {/* User Profile Mini Badge */}
          <div
            className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 overflow-hidden ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-lg border border-rose-500/40 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center">
              {userProfile?.avatar_url ? (
                <img src={userProfile.avatar_url} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <span className="text-rose-400 font-bold text-xs">{userProfile?.first_name?.charAt(0) || "A"}</span>
              )}
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                  {userProfile?.first_name} {userProfile?.last_name}
                  <ShieldCheck size={11} className="text-rose-400 shrink-0" />
                </p>
                <p className="text-[9px] text-rose-400 font-black tracking-widest uppercase truncate">
                  {userProfile?.role?.replace("_", " ") || "Admin"}
                </p>
              </div>
            )}
          </div>

          {/* Secure Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 py-2.5 px-3 text-neutral-400 hover:text-rose-400 bg-white/[0.02] hover:bg-rose-500/10 rounded-xl text-xs font-bold transition-all w-full border border-white/[0.04] hover:border-rose-500/30 ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
            title={isRtl ? "خروج امن از سیستم" : "Sign Out"}
          >
            <LogOut size={15} className={isRtl ? "rotate-180" : ""} />
            {!isCollapsed && <span>{t.admin?.secureSignOut || (isRtl ? "خروج امن" : "Sign Out")}</span>}
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP EXECUTIVE TOP NAVIGATION BAR ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="hidden lg:flex h-16 border-b border-white/[0.06] bg-[#05050c]/85 backdrop-blur-2xl px-6 items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isRtl ? "سرور مرکزی آنلاین" : "Server Online"}</span>
            </span>

            <span className="text-xs font-bold text-neutral-400">/</span>

            <span className="text-xs font-black text-white">
              {menuItems.find((i) => pathname === i.path || pathname.startsWith(i.path + "/"))?.name ||
                (isRtl ? "داشبورد مدیریت" : "Admin Panel")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sync Products Fast Button */}
            <button
              onClick={handleSyncProducts}
              disabled={isSyncingProducts}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              title={isRtl ? "همگام‌سازی محصولات تلگرام و فروشگاه" : "Sync Reseller Products"}
            >
              <RefreshCw size={13} className={isSyncingProducts ? "animate-spin text-white" : "text-amber-400"} />
              <span>{isSyncingProducts ? (isRtl ? "در حال سینک..." : "Syncing...") : (isRtl ? "سینک محصولات" : "Sync Products")}</span>
            </button>

            {/* Link to Public Store */}
            <Link
              href={`/${currentLocale}/store`}
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ShoppingBag size={13} className="text-neutral-400" />
              <span>{isRtl ? "مشاهده فروشگاه" : "Storefront"}</span>
              <ExternalLink size={10} className="opacity-60" />
            </Link>

            {/* Announcements Bell */}
            <Link
              href={`/${currentLocale}/admin/announcements`}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-rose-400 transition-colors relative"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
            </Link>
          </div>
        </header>

        {/* ================= 3. MOBILE TOP HEADER ================= */}
        {!isFullScreenRoute && (
          <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-[#030305]/95 backdrop-blur-2xl border-b border-white/[0.06] z-40 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-500/20 blur-[10px] rounded-full" />
                <img
                  src="/logo-without-b.png"
                  alt="Safi Academy"
                  className="relative z-10 w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                />
              </div>
              <span className="font-black text-xs tracking-widest text-white uppercase">Safi Academy</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncProducts}
                disabled={isSyncingProducts}
                className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300"
                title="Sync Products"
              >
                <RefreshCw size={15} className={isSyncingProducts ? "animate-spin" : ""} />
              </button>

              <Link
                href={`/${currentLocale}/admin/announcements`}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-300 hover:text-rose-400 relative"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_6px_#f43f5e]" />
              </Link>
            </div>
          </div>
        )}

        {/* ================= 4. MAIN CONTENT ROUTE ================= */}
        <main
          className={`flex-1 relative z-10 overflow-y-auto custom-scrollbar ${
            isFullScreenRoute ? "pt-0 pb-0" : "pt-16 pb-28 lg:pt-0 lg:pb-0"
          }`}
        >
          {children}
        </main>
      </div>

      {/* ================= 5. FLOATING MOBILE BOTTOM BAR ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-5 left-4 right-4 h-[72px] bg-[#090912]/95 backdrop-blur-3xl border border-white/10 z-50 px-3 rounded-[2.5rem] flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(244,63,94,0.1)]">
          <Link
            href={`/${currentLocale}/admin`}
            className={`relative flex flex-col items-center justify-center w-[25%] h-full transition-colors ${
              pathname === `/${currentLocale}/admin` ? "text-rose-400" : "text-neutral-500"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[9px] font-black tracking-widest uppercase mt-1">
              {t.admin?.overview || (isRtl ? "داشبورد" : "Overview")}
            </span>
          </Link>

          <Link
            href={`/${currentLocale}/admin/manage-students`}
            className={`relative flex flex-col items-center justify-center w-[25%] h-full transition-colors ${
              pathname.includes("/admin/manage-students") ? "text-blue-400" : "text-neutral-500"
            }`}
          >
            <Users size={20} />
            <span className="text-[9px] font-black tracking-widest uppercase mt-1">
              {t.admin?.students || (isRtl ? "شاگردان" : "Students")}
            </span>
          </Link>

          <Link
            href={`/${currentLocale}/admin/finance`}
            className={`relative flex flex-col items-center justify-center w-[25%] h-full transition-colors ${
              pathname.includes("/admin/finance") ? "text-emerald-400" : "text-neutral-500"
            }`}
          >
            <CircleDollarSign size={20} />
            <span className="text-[9px] font-black tracking-widest uppercase mt-1">
              {t.admin?.finance || (isRtl ? "مالی" : "Finance")}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="relative flex flex-col items-center justify-center w-[25%] h-full text-neutral-500 hover:text-white transition-colors"
          >
            <Grid size={20} />
            <span className="text-[9px] font-black tracking-widest uppercase mt-1">
              {t.admin?.menu || (isRtl ? "منو کامل" : "Menu")}
            </span>
          </button>
        </div>
      )}

      {/* ================= 6. MOBILE FULLSCREEN MENU DRAWER ================= */}
      {isMobileMenuOpen && (
        <div
          dir={t.dir}
          className="fixed inset-0 bg-[#030307]/98 backdrop-blur-3xl z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden"
        >
          {/* Drawer Header */}
          <div className="h-16 px-5 border-b border-white/[0.08] flex justify-between items-center bg-black/60 shrink-0">
            <span className="font-black text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{t.admin?.commandCenterTools || (isRtl ? "فهرست ابزارهای مدیریت ارشد" : "Command Tools")}</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {/* Sync Products Tile */}
            <button
              onClick={handleSyncProducts}
              disabled={isSyncingProducts}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-black text-xs flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <RefreshCw size={18} className={isSyncingProducts ? "animate-spin" : ""} />
                <span>{isSyncingProducts ? (isRtl ? "در حال سینک محصولات..." : "Syncing Products...") : (isRtl ? "همگام‌سازی محصولات تلگرام و فروشگاه" : "Sync Reseller Products")}</span>
              </div>
              <Sparkles size={16} className="text-amber-400" />
            </button>

            {/* All Menu Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === `/${currentLocale}/admin`
                    ? pathname === `/${currentLocale}/admin`
                    : pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-bold text-center border transition-all ${
                      isActive
                        ? "bg-rose-500/20 border-rose-500/50 text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                        : "bg-white/[0.03] border-white/5 text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon size={22} className={isActive ? "text-rose-400" : "text-neutral-400"} />
                    <span className="text-[11px] font-black tracking-wider truncate w-full">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout Footer */}
            <div className="pt-4 border-t border-white/10 pb-12">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-2xl font-bold transition-all w-full border border-rose-500/20 shadow-lg text-xs"
              >
                <LogOut size={16} className={isRtl ? "rotate-180" : ""} />
                <span>{t.admin?.secureSignOut || (isRtl ? "خروج امن از حساب مدیریت" : "Sign Out")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
