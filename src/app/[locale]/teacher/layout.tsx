"use client";

import { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  LogOut,
  Bell,
  ShieldCheck,
  LayoutDashboard,
  Rss,
  Megaphone,
  BookOpen,
  Video,
  FileText,
  Target,
  TrendingUp,
  Trophy,
  Settings,
  Grid,
  Headset,
  CalendarCheck,
  Users,
  Wallet,
  Gift,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

type MenuItem = {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  disabled?: boolean;
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check routes for full-screen display (group chats, live meets, support chat)
  const isGroupChatRoute = pathname.includes("/teacher/groups/") && pathname.split("/").length > 4;
  const isLiveMeetRoute = pathname.includes("/teacher/live-classes/") && pathname.split("/").length > 4;
  const isSupportChatRoute = pathname.includes("/support/chat");
  const isFullScreenRoute = isGroupChatRoute || isLiveMeetRoute || isSupportChatRoute;

  // Load sidebar collapsed state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("teacher_sidebar_collapsed");
      if (saved !== null) {
        setIsSidebarCollapsed(saved === "true");
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("teacher_sidebar_collapsed", String(next));
      } catch (e) {}
      return next;
    });
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
          .select("first_name, last_name, avatar_url, wallet_balance, role, email")
          .eq("id", user.id)
          .single();

        if (profile) {
          if (
            profile.role !== "teacher" &&
            profile.role !== "admin" &&
            profile.role !== "super_admin"
          ) {
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

  const walletFormatted = userProfile?.wallet_balance
    ? Number(userProfile.wallet_balance).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  // Flat & Crystal Clear Menu Items list (matching student layout style)
  const menuItems: MenuItem[] = [
    {
      id: "overview",
      name: t.teacher?.overview || (isRtl ? "نمای کلی داشبورد" : "Overview"),
      path: `/${currentLocale}/teacher`,
      icon: <LayoutDashboard size={22} />,
    },
    {
      id: "feed",
      name: t.teacher?.feed || (isRtl ? "فید آکادمی" : "Academy Feed"),
      path: `/${currentLocale}/feed`,
      icon: <Rss size={22} />,
    },
    {
      id: "announcements",
      name: t.teacher?.announcements || (isRtl ? "اطلاعیه‌ها" : "Announcements"),
      path: `/${currentLocale}/teacher/announcements`,
      icon: <Megaphone size={22} />,
    },
    {
      id: "courses",
      name: t.teacher?.myCourses || (isRtl ? "دوره‌های من" : "My Courses"),
      path: `/${currentLocale}/teacher/courses`,
      icon: <BookOpen size={22} />,
    },
    {
      id: "liveClasses",
      name: t.teacher?.liveClasses || (isRtl ? "کلاس‌های زنده آنلاین" : "Live Classes"),
      path: `/${currentLocale}/teacher/live-classes`,
      icon: <Video size={22} />,
      badge: isRtl ? "زنده" : "LIVE",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
    },
    {
      id: "attendance",
      name: isRtl ? "حضور و غیاب صنف‌ها" : "Class Attendance",
      path: `/${currentLocale}/teacher/attendance`,
      icon: <CalendarCheck size={22} />,
    },
    {
      id: "assignments",
      name: t.teacher?.assignments || (isRtl ? "تکالیف و پروژه‌ها" : "Assignments"),
      path: `/${currentLocale}/teacher/assignments`,
      icon: <FileText size={22} />,
    },
    {
      id: "quizzes",
      name: t.teacher?.quizzes || (isRtl ? "آزمون‌ها و کوئیزها" : "Quizzes & Tests"),
      path: `/${currentLocale}/teacher/quizzes`,
      icon: <Target size={22} />,
    },
    {
      id: "tradingJournal",
      name: t.teacher?.tradingJournal || (isRtl ? "دفتر معاملات دانشجویان" : "Trading Journal"),
      path: `/${currentLocale}/teacher/trading-journal`,
      icon: <TrendingUp size={22} />,
    },
    {
      id: "students",
      name: t.teacher?.myStudents || (isRtl ? "شاگردان من" : "Students Directory"),
      path: `/${currentLocale}/teacher/students`,
      icon: <Users size={22} />,
    },
    {
      id: "wallet",
      name: isRtl ? "کیف پول SafiPay" : "SafiPay Wallet",
      path: `/${currentLocale}/teacher/wallet`,
      icon: <Wallet size={22} />,
      badge: `$${walletFormatted}`,
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-mono font-black",
    },
    {
      id: "referrals",
      name: isRtl ? "دعوت دوستان و پاداش" : "Referrals & Rewards",
      path: `/${currentLocale}/teacher/referrals`,
      icon: <Gift size={22} />,
      badge: isRtl ? "۱۰٪ تخفیف" : "10% Bonus",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    },
    {
      id: "achievements",
      name: t.teacher?.achievements || (isRtl ? "افتخارات و جوایز" : "Achievements"),
      path: `/${currentLocale}/teacher/achievements`,
      icon: <Trophy size={22} />,
    },
    {
      id: "support",
      name: t.teacher?.support || (isRtl ? "پشتیبانی و تیکت‌ها" : "Support Desk"),
      path: `/${currentLocale}/teacher/support`,
      icon: <Headset size={22} />,
    },
    {
      id: "settings",
      name: t.teacher?.settings || (isRtl ? "تنظیمات حساب" : "Account Settings"),
      path: `/${currentLocale}/teacher/settings`,
      icon: <Settings size={22} />,
    },
  ];

  const getMenuColor = (id: string) => {
    switch (id) {
      case "overview":
        return "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30";
      case "feed":
        return "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30";
      case "announcements":
        return "from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/30";
      case "courses":
        return "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30";
      case "liveClasses":
        return "from-red-500/20 to-red-500/5 text-red-400 border-red-500/30";
      case "attendance":
        return "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30";
      case "students":
        return "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/30";
      case "assignments":
        return "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30";
      case "quizzes":
        return "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30";
      case "tradingJournal":
        return "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30";
      case "wallet":
        return "from-emerald-500/25 to-emerald-500/10 text-emerald-400 border-emerald-500/40";
      case "referrals":
        return "from-amber-500/25 to-amber-500/10 text-amber-400 border-amber-500/40";
      case "achievements":
        return "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30";
      case "support":
        return "from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/30";
      case "settings":
        return "from-slate-500/20 to-slate-500/5 text-slate-400 border-slate-500/30";
      default:
        return "from-neutral-500/20 to-neutral-500/5 text-neutral-400 border-neutral-500/30";
    }
  };

  if (!isReady) {
    return (
      <div
        dir={t.dir}
        className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin shadow-[0_0_25px_rgba(217,70,239,0.4)]"></div>
          <Sparkles className="w-6 h-6 text-fuchsia-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mt-4 animate-pulse">
          {t.teacher?.initializing || (isRtl ? "در حال آماده‌سازی پرتال اساتید..." : "Initializing Faculty Portal...")}
        </span>
      </div>
    );
  }

  return (
    <div
      dir={t.dir}
      className="flex h-screen bg-[#020202] text-white font-sans overflow-hidden relative selection:bg-fuchsia-500 selection:text-white"
    >
      {/* Background Ambient Cosmic Glows */}
      <div
        className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute bottom-[-15%] right-[-15%] w-[45vw] h-[45vw] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>

      {/* ================= 1. DESKTOP SIDEBAR WITH HIDE & SHOW TOGGLE ================= */}
      <aside
        className={`hidden lg:flex ${
          isSidebarCollapsed ? "w-[84px]" : "w-[295px]"
        } bg-[#060609]/95 backdrop-blur-2xl ${
          isRtl ? "border-l border-r-0" : "border-r border-l-0"
        } border-white/[0.06] flex-col relative z-20 shrink-0 p-3.5 shadow-[20px_0_50px_rgba(0,0,0,0.9)] transition-all duration-300 ease-in-out`}
      >
        {/* Brand Header Card with Hide & Show Toggle Button */}
        <div
          className={`mb-3 p-3.5 rounded-2xl bg-gradient-to-br from-[#0e0a16] to-[#06050a] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.5)] border border-white/5 shrink-0 relative group flex items-center ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-2xl opacity-15 blur group-hover:opacity-30 transition duration-500 pointer-events-none"></div>

          <Link
            href={`/${currentLocale}/teacher`}
            className={`flex items-center gap-3 relative z-10 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
            title="Safi Academy - Faculty Portal"
          >
            <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-fuchsia-500/30 blur-[10px] rounded-full"></div>
              <img
                src="/logo-without-b.png"
                alt="Safi Academy"
                className="relative z-10 w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]"
              />
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0">
                <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 truncate">
                  <span>Safi Academy</span>
                  <Sparkles size={11} className="text-fuchsia-400 animate-spin" style={{ animationDuration: "5s" }} />
                </h2>
                <p className="text-[9px] text-fuchsia-400 font-black uppercase tracking-[0.2em] mt-0.5 truncate">
                  {t.teacher?.facultyPortal || (isRtl ? "پرتال جامع اساتید" : "Senior Faculty Console")}
                </p>
              </div>
            )}
          </Link>

          {/* Hide & Show Sidebar Collapse Button */}
          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="relative z-10 w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/5 flex items-center justify-center transition-all cursor-pointer shrink-0"
              title={isRtl ? "جمع‌کردن سایدبار" : "Collapse Sidebar"}
            >
              {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* If Collapsed, Show Expand Toggle Button */}
        {isSidebarCollapsed && (
          <div className="mb-3 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-fuchsia-500/20 text-neutral-400 hover:text-fuchsia-400 border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title={isRtl ? "نمایش کامل سایدبار" : "Expand Sidebar"}
            >
              {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        )}

        {/* Dedicated SafiPay Faculty Wallet Mini-Card (When Expanded) */}
        {!isSidebarCollapsed && (
          <div className="mb-3 shrink-0">
            <Link
              href={`/${currentLocale}/teacher/wallet`}
              className="block p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#06100c]/50 to-[#020604] border border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_8px_20px_rgba(16,185,129,0.1)] transition-all group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-108 transition-transform">
                    <Wallet size={19} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 block">
                      {isRtl ? "کیف پول SafiPay استاد" : "SafiPay Wallet"}
                    </span>
                    <span className="text-base font-black text-emerald-400 font-mono tracking-tight flex items-baseline gap-0.5">
                      <span className="text-xs text-emerald-500/80">$</span>
                      {walletFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400/80 group-hover:text-emerald-300">
                  <span>{isRtl ? "مدیریت" : "Manage"}</span>
                  {isRtl ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Scrollable Navigation Menu (Flat, clean, fast like student portal) */}
        <nav
          className={`flex-1 overflow-y-auto space-y-1.5 custom-scrollbar ${
            isRtl ? "pl-1 pr-0" : "pr-1 pl-0"
          }`}
        >
          {menuItems.map((item) => {
            if (item.disabled) return null;

            const isActive =
              item.path === `/${currentLocale}/teacher`
                ? pathname === `/${currentLocale}/teacher`
                : pathname.startsWith(item.path);

            // Special highlight for wallet item
            const isWallet = item.id === "wallet";

            return (
              <Link
                key={item.id}
                href={item.path}
                title={isSidebarCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isSidebarCollapsed ? "justify-center p-3" : "justify-between px-3.5 py-2.5"
                } rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r from-[#220f29] to-[#07070b] text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_20px_rgba(217,70,239,0.2)] border border-fuchsia-500/40 ${
                        isRtl && !isSidebarCollapsed ? "-translate-x-1" : !isSidebarCollapsed ? "translate-x-1" : ""
                      }`
                    : isWallet
                    ? "bg-emerald-950/20 text-emerald-300 hover:text-white hover:bg-emerald-950/40 border border-emerald-500/25 shadow-sm"
                    : "bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/[0.03] hover:border-white/10"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && !isSidebarCollapsed && (
                  <div
                    className={`absolute ${
                      isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                    } top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-fuchsia-400 to-purple-600 shadow-[0_0_12px_#d946ef]`}
                  ></div>
                )}

                <div
                  className={`flex items-center gap-3 relative z-10 min-w-0 ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                >
                  <span
                    className={`transition-all duration-300 shrink-0 ${
                      isActive
                        ? "scale-110 text-fuchsia-400"
                        : isWallet
                        ? "text-emerald-400 group-hover:scale-110"
                        : "group-hover:scale-110 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="tracking-wide truncate text-[11px] sm:text-xs">
                      {item.name}
                    </span>
                  )}
                </div>

                {/* Pill Badge (When Expanded) */}
                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm shrink-0 ${
                      item.badgeColor || "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/25"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile & Logout */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2 shrink-0">
          {/* Teacher Profile Card */}
          <div
            className={`bg-[#09090e] border border-white/[0.05] p-2.5 rounded-2xl flex items-center ${
              isSidebarCollapsed ? "justify-center" : "justify-between"
            } shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] relative overflow-hidden group`}
          >
            <div
              className={`flex items-center gap-3 overflow-hidden relative z-10 ${
                isSidebarCollapsed ? "justify-center" : "min-w-0"
              }`}
            >
              <div className="w-9 h-9 rounded-xl border border-fuchsia-500/40 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center shadow-inner group-hover:border-fuchsia-500 transition-colors relative">
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt="Teacher"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-fuchsia-400 font-black text-sm">
                    {userProfile?.first_name?.charAt(0) || "T"}
                  </span>
                )}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-black"></div>
              </div>

              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <span className="truncate">{userProfile?.first_name} {userProfile?.last_name}</span>
                    <ShieldCheck size={12} className="text-fuchsia-400 shrink-0" />
                  </p>
                  <p className="text-[9px] text-emerald-400 font-mono font-bold mt-0.5 flex items-center gap-1">
                    <Wallet size={10} /> ${walletFormatted}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            title={isSidebarCollapsed ? (t.teacher?.secureSignOut || (isRtl ? "خروج امن" : "Sign Out")) : undefined}
            className={`flex items-center justify-center gap-2 ${
              isSidebarCollapsed ? "p-2.5" : "px-4 py-2.5"
            } text-neutral-400 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.04] hover:border-red-500/30 shadow-sm group cursor-pointer`}
          >
            <LogOut
              size={14}
              className={`group-hover:${
                isRtl ? "translate-x-1" : "-translate-x-1"
              } transition-transform ${isRtl ? "rotate-180" : ""}`}
            />
            {!isSidebarCollapsed && (
              <span>{t.teacher?.secureSignOut || (isRtl ? "خروج امن از حساب" : "Sign Out")}</span>
            )}
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP FLOATING QUICK BAR ================= */}
      <div
        className={`hidden lg:flex items-center gap-2.5 absolute top-5 ${
          isRtl ? "left-8" : "right-8"
        } z-50`}
      >
        {/* If Sidebar is collapsed, show quick toggle here too */}
        {isSidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0a0a0f]/90 hover:bg-white/[0.1] backdrop-blur-xl border border-white/10 rounded-2xl text-xs font-bold text-neutral-300 transition-all shadow-lg cursor-pointer"
            title={isRtl ? "نمایش کامل سایدبار" : "Expand Sidebar"}
          >
            <Menu size={15} />
            <span>{isRtl ? "منو" : "Sidebar"}</span>
          </button>
        )}

        {/* Floating Wallet Shortcut with Real Balance */}
        <Link
          href={`/${currentLocale}/teacher/wallet`}
          title={isRtl ? "کیف پول SafiPay و امور مالی" : "SafiPay Wallet"}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0f]/90 hover:bg-emerald-500/15 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 rounded-2xl text-xs font-bold transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] group"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Wallet size={14} />
          </div>
          <span className="text-emerald-400 font-mono font-black">${walletFormatted}</span>
        </Link>

        {/* Live Broadcast Radar Shortcut */}
        <Link
          href={`/${currentLocale}/teacher/live-classes`}
          title={isRtl ? "پخش زنده و کلاس‌های آنلاین" : "Live Classes"}
          className="w-11 h-11 bg-[#0a0a0f]/90 hover:bg-red-500/10 backdrop-blur-xl border border-white/10 hover:border-red-500/30 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-red-400 transition-all group shadow-[0_10px_25px_rgba(0,0,0,0.5)] relative"
        >
          <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>

        {/* Notifications / Announcements Bell */}
        <Link
          href={`/${currentLocale}/teacher/announcements`}
          title={isRtl ? "اطلاعیه‌ها و اعلانات" : "Announcements"}
          className="w-11 h-11 bg-[#0a0a0f]/90 hover:bg-fuchsia-500/10 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/40 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400 transition-all group shadow-[0_10px_25px_rgba(0,0,0,0.5)] relative"
        >
          <Bell className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]"></span>
        </Link>
      </div>

      {/* ================= 3. MOBILE TOP HEADER ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 sm:px-6 bg-[#030305]/95 backdrop-blur-2xl border-b border-white/[0.06] z-40 shadow-md">
          <Link href={`/${currentLocale}/teacher`} className="flex items-center gap-2.5 relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-[12px] rounded-full scale-150"></div>
            <img
              src="/logo-without-b.png"
              alt="Safi Academy"
              className="relative z-10 w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]"
            />
            <span className="relative z-10 font-black text-xs tracking-widest text-white uppercase">
              Safi Academy
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Mobile Wallet Pill */}
            <Link
              href={`/${currentLocale}/teacher/wallet`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-mono font-bold"
            >
              <Wallet size={13} />
              <span>${walletFormatted}</span>
            </Link>

            {/* Mobile Notification Bell */}
            <Link
              href={`/${currentLocale}/teacher/announcements`}
              className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400"
            >
              <Bell size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT ================= */}
      <main
        className={`flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar ${
          isFullScreenRoute ? "pt-0 pb-0" : "pt-16 pb-28"
        } lg:pt-0 lg:pb-0`}
      >
        {children}
      </main>

      {/* ================= 5. FLOATING MOBILE BOTTOM NAV ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 h-[72px] bg-[#09090e]/95 backdrop-blur-3xl border border-white/10 z-50 px-2 rounded-[2.2rem] flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <Link
            href={`/${currentLocale}/teacher`}
            className="relative flex flex-col items-center justify-center w-[20%] h-full group"
          >
            <LayoutDashboard
              size={20}
              className={pathname === `/${currentLocale}/teacher` ? "text-fuchsia-400" : "text-neutral-500"}
            />
            <span className="text-[8px] font-bold uppercase mt-1 truncate max-w-full">
              {t.teacher?.overview || (isRtl ? "داشبورد" : "Overview")}
            </span>
          </Link>

          <Link
            href={`/${currentLocale}/teacher/courses`}
            className="relative flex flex-col items-center justify-center w-[20%] h-full group"
          >
            <BookOpen
              size={20}
              className={pathname.startsWith(`/${currentLocale}/teacher/courses`) ? "text-emerald-400" : "text-neutral-500"}
            />
            <span className="text-[8px] font-bold uppercase mt-1 truncate max-w-full">
              {t.teacher?.myCourses || (isRtl ? "دوره‌ها" : "Courses")}
            </span>
          </Link>

          {/* Central Prominent Wallet Button */}
          <Link
            href={`/${currentLocale}/teacher/wallet`}
            className="relative flex flex-col items-center justify-center w-[20%] h-full group"
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                pathname.startsWith(`/${currentLocale}/teacher/wallet`)
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              <Wallet size={18} />
            </div>
            <span className="text-[8px] font-bold uppercase mt-0.5 text-emerald-400 truncate max-w-full">
              {isRtl ? "کیف‌پول" : "Wallet"}
            </span>
          </Link>

          <Link
            href={`/${currentLocale}/feed`}
            className="relative flex flex-col items-center justify-center w-[20%] h-full group"
          >
            <Rss
              size={20}
              className={pathname.startsWith(`/${currentLocale}/feed`) ? "text-pink-400" : "text-neutral-500"}
            />
            <span className="text-[8px] font-bold uppercase mt-1 truncate max-w-full">
              {t.teacher?.feed || (isRtl ? "فید" : "Feed")}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="relative flex flex-col items-center justify-center w-[20%] h-full group cursor-pointer"
          >
            <Grid size={20} className="text-neutral-500 group-hover:text-white" />
            <span className="text-[8px] font-bold uppercase mt-1 truncate max-w-full">
              {t.teacher?.menu || (isRtl ? "منو" : "Menu")}
            </span>
          </button>
        </div>
      )}

      {/* ================= 6. MOBILE FULL MENU DRAWER ================= */}
      {isMobileMenuOpen && (
        <div
          dir={t.dir}
          className="fixed inset-0 bg-[#030305]/98 backdrop-blur-3xl z-[100] flex flex-col lg:hidden animate-[fadeIn_0.2s_ease-out]"
        >
          {/* Drawer Header */}
          <div className="h-16 px-5 border-b border-white/[0.06] flex justify-between items-center bg-black/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-fuchsia-400" />
              <span className="font-black text-white uppercase tracking-widest text-xs">
                {t.teacher?.facultyTools || (isRtl ? "امکانات و ابزارهای اساتید" : "Faculty Workspace")}
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 rounded-full cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
            
            {/* Mobile Wallet & Referrals Quick Banner */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/${currentLocale}/teacher/wallet`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/30 flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400">
                    {isRtl ? "کیف پول SafiPay" : "Wallet"}
                  </span>
                  <Wallet size={16} className="text-emerald-400" />
                </div>
                <span className="text-xl font-black text-white font-mono">${walletFormatted}</span>
              </Link>

              <Link
                href={`/${currentLocale}/teacher/referrals`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/30 flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-400">
                    {isRtl ? "باشگاه رفرال" : "Referral Club"}
                  </span>
                  <Gift size={16} className="text-amber-400" />
                </div>
                <span className="text-xs font-black text-white">
                  {isRtl ? "۱۰٪ تخفیف و پاداش" : "10% Cash Rewards"}
                </span>
              </Link>
            </div>

            {/* Flat Grid Menu Items */}
            <div className="grid grid-cols-2 gap-2.5">
              {menuItems.map((item) => {
                const isActive =
                  item.path === `/${currentLocale}/teacher`
                    ? pathname === `/${currentLocale}/teacher`
                    : pathname.startsWith(item.path);
                const colorClasses = getMenuColor(item.id);
                if (item.disabled) return null;

                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center justify-center text-center gap-2 p-4 rounded-2xl font-bold border bg-gradient-to-br transition-all ${colorClasses} ${
                      isActive ? "ring-2 ring-white/30 shadow-lg" : "opacity-90"
                    }`}
                  >
                    <div>{item.icon}</div>
                    <span className="text-[10px] tracking-wider uppercase line-clamp-1">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Logout CTA */}
            <div className="pt-2 pb-6">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-neutral-300 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.06] shadow-md cursor-pointer"
              >
                <LogOut size={16} className={isRtl ? "rotate-180" : ""} />
                <span>{t.teacher?.secureSignOut || (isRtl ? "خروج امن از حساب کاربری" : "Sign Out")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
