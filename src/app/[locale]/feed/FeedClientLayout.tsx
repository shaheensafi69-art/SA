"use client";

import { useState, useEffect } from "react";
import {
  Rss, Users, SquarePen, User, Video,
  MessageSquare, ArrowLeft, LayoutDashboard, Sparkles, X, PlusCircle, Home, Menu, Activity
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthRequiredModal from "@/components/feed/AuthRequiredModal";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

export default function FeedClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authActionText, setAuthActionText] = useState("create posts and access member features");

  const isReelsPage = pathname.includes('/feed/reels');
  const isChatPage = pathname.includes('/feed/chats/screen');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, role, first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single();
        if (profile) setUserProfile(profile);
      }
    };
    fetchUser();
  }, []);

  const requireAuth = (actionText: string, callback?: () => void) => {
    if (!userProfile) {
      setAuthActionText(actionText);
      setShowAuthModal(true);
      return;
    }
    callback?.();
  };

  const handleBackToOverview = () => {
    if (!userProfile) {
      router.push(`/${currentLocale}`);
      return;
    }
    const role = userProfile?.role?.toLowerCase();
    if (role === 'admin') {
      router.push(`/${currentLocale}/admin`);
    } else if (role === 'teacher') {
      router.push(`/${currentLocale}/teacher`);
    } else {
      router.push(`/${currentLocale}/dashboard`);
    }
  };

  const myProfilePath = userProfile?.id ? `/${currentLocale}/feed/profile/${userProfile.id}` : `/${currentLocale}/feed/profile`;

  const feedNavItems = [
    { id: "stream", name: t.feed.stream, path: `/${currentLocale}/feed`, icon: <Rss size={20} /> },
    { id: "reels", name: t.feed.reels, path: `/${currentLocale}/feed/reels`, icon: <Video size={20} /> },
    { id: "network", name: t.feed.network, path: `/${currentLocale}/feed/network`, icon: <Users size={20} /> },
    { id: "create", name: t.feed.createPost, path: "#", isAction: true, icon: <SquarePen size={20} /> },
    { id: "messages", name: t.feed.messages, path: `/${currentLocale}/feed/chats/list`, icon: <MessageSquare size={20} /> },
    { id: "likesComments", name: t.feed.likesComments, path: `/${currentLocale}/feed/like-comment-status`, icon: <Activity size={20} /> },
    { id: "myProfile", name: t.feed.myProfile, path: myProfilePath, icon: <User size={20} /> },
  ];

  return (
    <div
      dir={t.dir}
      className="fixed inset-0 z-[9999] flex h-full w-full bg-[#030305] text-white font-sans overflow-hidden selection:bg-[#C2185B] selection:text-white"
    >

      {/* هاله‌های نوری پس‌زمینه پریمیوم */}
      <div className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-[#C2185B]/15 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* ================= دسکتاپ سایدبار اختصاصی فید ================= */}
      <aside
        className={`hidden lg:flex w-[295px] bg-[#060609]/95 backdrop-blur-2xl ${
          isRtl ? "border-l border-r-0" : "border-r border-l-0"
        } border-white/[0.06] flex-col relative z-20 shrink-0 p-5 shadow-[15px_0_40px_rgba(0,0,0,0.9)] h-full`}
      >

        <button
          onClick={handleBackToOverview}
          className="mb-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.03] border border-white/10 text-neutral-300 hover:text-white transition-all group shadow-inner shrink-0"
        >
          <div
            className={`w-8 h-8 rounded-xl bg-[#C2185B]/20 border border-[#C2185B]/30 flex items-center justify-center text-[#C2185B] transition-transform ${
              isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
            }`}
          >
            <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
          </div>
          <div className={isRtl ? "text-right" : "text-left"}>
            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">
              {userProfile ? t.feed.portalNav : t.feed.backToWeb}
            </p>
            <p className="text-xs font-black text-white flex items-center gap-1">
              {userProfile ? t.feed.backToOverview : t.feed.home} <LayoutDashboard size={10} />
            </p>
          </div>
        </button>

        <div className="px-2 mb-4 shrink-0 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C2185B]">
            {t.feed.hubTitle}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C2185B] animate-pulse"></span>
        </div>

        <nav className={`flex-1 space-y-2.5 overflow-y-auto custom-scrollbar ${isRtl ? "pl-1 pr-0" : "pr-1 pl-0"}`}>
          {feedNavItems.map((item) => {
            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={() => requireAuth("create a post", () => setIsCreateModalOpen(true))}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] border border-white/[0.03] hover:border-white/10 ${
                    isRtl ? "text-right" : "text-left"
                  } cursor-pointer`}
                >
                  <span className="group-hover:scale-110 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.name}</span>
                </button>
              );
            }

            const isProtected = ["messages", "likesComments", "myProfile"].includes(item.id);
            if (isProtected && !userProfile) {
              return (
                <button
                  key={item.id}
                  onClick={() => requireAuth(`access ${item.name.toLowerCase()}`)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] border border-white/[0.03] hover:border-white/10 ${
                    isRtl ? "text-right" : "text-left"
                  } cursor-pointer`}
                >
                  <span className="group-hover:scale-110 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.name}</span>
                </button>
              );
            }

            const isActive = pathname === item.path || (item.path !== `/${currentLocale}/feed` && pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r from-[#1c1a12] to-[#0a0a0e] text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_20px_rgba(194,24,91,0.15)] border border-[#C2185B]/30 ${
                        isRtl ? "-translate-x-1" : "translate-x-1"
                      }`
                    : "bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] border border-white/[0.03] hover:border-white/10"
                }`}
              >
                {isActive && (
                  <div
                    className={`absolute ${
                      isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                    } top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C2185B] shadow-[0_0_10px_#C2185B]`}
                  ></div>
                )}
                <span className={`transition-all duration-300 ${isActive ? "scale-110 text-[#C2185B]" : "group-hover:scale-110 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/[0.06] shrink-0 space-y-3">
          {!userProfile && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 text-center">
              <p className="text-[10px] text-yellow-400 font-black uppercase tracking-wider mb-2">
                {t.feed.guestExplorer}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/${currentLocale}/login`}
                  className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold border border-white/10 transition-colors"
                >
                  {t.feed.signIn}
                </Link>
                <Link
                  href={`/${currentLocale}/register`}
                  className="py-2 px-2.5 rounded-xl bg-yellow-500 text-black text-[11px] font-extrabold hover:bg-yellow-400 transition-colors"
                >
                  {t.feed.joinFree}
                </Link>
              </div>
            </div>
          )}
          <button
            onClick={() => requireAuth("create a new post", () => setIsCreateModalOpen(true))}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-gradient-to-r from-[#C2185B] to-yellow-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(194,24,91,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <SquarePen size={16} strokeWidth={2.5} /> {t.feed.createNewPost}
          </button>
        </div>
      </aside>

      {/* ================= محتوای اصلی فید ================= */}
      <main className={`flex-1 min-w-0 h-full relative z-10 ${isChatPage || isReelsPage ? 'overflow-hidden flex flex-col pb-0' : 'overflow-y-auto custom-scrollbar pb-28 lg:pb-0'}`}>
        {children}
      </main>

      {/* ================= موبایل نویگیشن بار پایین ================= */}
      {!isChatPage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#060609]/95 backdrop-blur-2xl border-t border-white/10 z-50 px-6 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">

          {/* فید */}
          <Link href={`/${currentLocale}/feed`} className="flex items-center justify-center flex-1 h-full relative group">
            <Home size={22} className={pathname === `/${currentLocale}/feed` ? "text-white stroke-[2.5]" : "text-neutral-400 stroke-[1.8] group-hover:text-white"} />
            {pathname === `/${currentLocale}/feed` && <span className="absolute bottom-1 w-1 h-1 bg-[#C2185B] rounded-full shadow-[0_0_8px_#C2185B]"></span>}
          </Link>

          {/* ریلز */}
          <Link href={`/${currentLocale}/feed/reels`} className="flex items-center justify-center flex-1 h-full relative group">
            <Video size={22} className={isReelsPage ? "text-white stroke-[2.5]" : "text-neutral-400 stroke-[1.8] group-hover:text-white"} />
            {isReelsPage && <span className="absolute bottom-1 w-1 h-1 bg-[#C2185B] rounded-full shadow-[0_0_8px_#C2185B]"></span>}
          </Link>

          {/* دکمه ایجاد (پلاس) */}
          <button onClick={() => requireAuth("create content", () => setIsCreateModalOpen(true))} className="flex items-center justify-center flex-1 h-full focus:outline-none group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C2185B] to-yellow-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#060609] rounded-[14px] flex items-center justify-center">
                <SquarePen size={18} className="text-white" />
              </div>
            </div>
          </button>

          {/* شبکه */}
          <Link href={`/${currentLocale}/feed/network`} className="flex items-center justify-center flex-1 h-full relative group">
            <Users size={22} className={pathname.includes(`/${currentLocale}/feed/network`) ? "text-white stroke-[2.5]" : "text-neutral-400 stroke-[1.8] group-hover:text-white"} />
            {pathname.includes(`/${currentLocale}/feed/network`) && <span className="absolute bottom-1 w-1 h-1 bg-[#C2185B] rounded-full shadow-[0_0_8px_#C2185B]"></span>}
          </Link>

          {/* دکمه منو */}
          <button onClick={() => setIsMenuDrawerOpen(true)} className="flex items-center justify-center flex-1 h-full focus:outline-none group">
            <Menu size={22} className="text-neutral-400 group-hover:text-white stroke-[1.8]" />
          </button>
        </div>
      )}

      {/* ================= کشوی منوی موبایل (Drawer) ================= */}
      {isMenuDrawerOpen && (
        <div className={`fixed inset-0 z-[10000] flex ${isRtl ? 'justify-start' : 'justify-end'} bg-black/80 backdrop-blur-md animate-fadeIn`}>

          <div className="absolute inset-0" onClick={() => setIsMenuDrawerOpen(false)}></div>

          <div className={`w-[300px] h-full bg-[#07070c] ${isRtl ? 'border-r' : 'border-l'} border-white/10 p-6 flex flex-col relative z-10 shadow-2xl`}>

            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C2185B]/20 text-[#C2185B] flex items-center justify-center border border-[#C2185B]/30">
                  <Menu size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">{t.feed.menuHub}</h3>
                  <p className="text-[10px] text-neutral-400">{t.feed.quickNav}</p>
                </div>
              </div>
              <button onClick={() => setIsMenuDrawerOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
              <Link
                href={myProfilePath}
                onClick={() => setIsMenuDrawerOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C2185B]/40 hover:bg-white/[0.06] transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#C2185B]/20 text-[#C2185B] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.feed.myProfile}</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{t.feed.profileDesc}</p>
                </div>
              </Link>

              <Link
                href={`/${currentLocale}/feed/chats/list`}
                onClick={() => setIsMenuDrawerOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C2185B]/40 hover:bg-white/[0.06] transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.feed.messages}</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{t.feed.chatDesc}</p>
                </div>
              </Link>

              <Link
                href={`/${currentLocale}/feed/like-comment-status`}
                onClick={() => setIsMenuDrawerOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C2185B]/40 hover:bg-white/[0.06] transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.feed.likesComments}</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{t.feed.statusDesc}</p>
                </div>
              </Link>

              <button
                onClick={() => { setIsMenuDrawerOpen(false); handleBackToOverview(); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-yellow-500/40 hover:bg-white/[0.06] transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.feed.backToOverview}</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{t.feed.dashboardDesc}</p>
                </div>
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 text-center">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">{t.feed.ecosystem}</span>
            </div>

          </div>
        </div>
      )}

      {/* ================= پاپ‌آپ ایجاد پست / ریلز ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div dir={t.dir} className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2185B]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C2185B]/20 border border-[#C2185B]/40 flex items-center justify-center text-[#C2185B]">
                  <PlusCircle size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">{t.feed.createContent}</h3>
                  <p className="text-[10px] text-neutral-400 font-bold">{t.feed.chooseContent}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 relative z-10">
              <Link
                href={`/${currentLocale}/feed/create/post`}
                onClick={() => setIsCreateModalOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/30 hover:border-pink-500/60 hover:bg-pink-500/20 transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform shrink-0">
                  <SquarePen size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-pink-300 transition-colors">{t.feed.createPost}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{t.feed.sharePostDesc}</p>
                </div>
              </Link>

              <Link
                href={`/${currentLocale}/feed/create/reels`}
                onClick={() => setIsCreateModalOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20 transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                  <Video size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-purple-300 transition-colors">{t.feed.createReel}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{t.feed.uploadReelDesc}</p>
                </div>
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center relative z-10">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                {t.feed.cancel}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= AUTH REQUIRED MODAL ================= */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionText={authActionText}
      />

    </div>
  );
}
