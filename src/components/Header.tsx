"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// لیست زبان‌ها همراه با رنگ‌های پرچم آن‌ها برای ساخت افکت‌های نوری
const languages = [
  { code: "en", name: "English", flag: "🇬🇧", gradient: "from-blue-600 via-red-500 to-blue-600" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", gradient: "from-green-500 via-white to-red-500" },
  { code: "ps", name: "پښتو", flag: "🇦🇫", gradient: "from-neutral-800 via-red-600 to-green-600" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", gradient: "from-neutral-800 via-red-600 to-yellow-500" },
  { code: "fr", name: "Français", flag: "🇫🇷", gradient: "from-blue-600 via-white to-red-600" },
  { code: "ur", name: "اردو", flag: "🇵🇰", gradient: "from-green-700 via-emerald-400 to-green-700" },
];

const navLinks = [
  { name: "Home", path: "" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname() || "/en";
  const router = useRouter();
  
  // استخراج زبان فعلی از آدرس سایت
  const currentLocale = pathname.split("/")[1] || "en";
  const activeLang = languages.find((l) => l.code === currentLocale) || languages[0];

  // استیت‌های مربوط به وضعیت کاربری
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // بستن منوی موبایل در صورت تغییر مسیر (تغییر صفحه)
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // بررسی وضعیت لاگین به محض لود شدن هدر
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const supabase = createClient();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error("Error fetching profile:", profileError);
          }

          setUserProfile(profile || { first_name: "Student", avatar_url: null });
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserProfile(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    checkUserStatus();
  }, [pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserProfile(null);
    router.push(`/${currentLocale}/login`);
  };

  // پنهان کردن کل هدر در مسیر داشبورد
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] lg:w-[98%] max-w-[2000px] transition-all duration-700">
      
      {/* 1. هاله نوری داینامیک پشت هدر */}
      <div 
        className={`absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r ${activeLang.gradient} opacity-40 blur-xl transition-all duration-1000`}
      ></div>

      {/* 2. بدنه شیشه‌ای هدر */}
      <div className="relative w-full h-20 lg:h-24 px-5 lg:px-10 bg-[#050505]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
        
        {/* خط نوری ظریف زیر هدر */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r ${activeLang.gradient} opacity-50 rounded-full`}></div>

        {/* ================= بخش لوگو ================= */}
        <Link href={`/${activeLang.code}`} className="flex items-center gap-3 md:gap-4 group">
          <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 bg-yellow-500/30 blur-[20px] rounded-full"></div>
            <img 
              src="/logo-without-b.png" 
              alt="Safi Academy Logo" 
              className="relative z-10 w-12 h-12 lg:w-16 lg:h-16 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            />
          </div>
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-wide">
            Safi <span className="text-yellow-500 hidden sm:inline">Academy</span>
          </span>
        </Link>

        {/* ================= منوی لینک‌های وسط (دسکتاپ) ================= */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 bg-[#111111]/40 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={`/${activeLang.code}${link.path}`} 
              className="px-6 py-2.5 rounded-xl text-base font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ================= بخش دکمه‌ها و انتخاب زبان ================= */}
        <div className="flex items-center gap-3 lg:gap-6">
          
          {/* دراپ‌داون زبان‌ها (فقط دسکتاپ) */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
              <span className="text-xl leading-none">{activeLang.flag}</span>
              <span className="text-sm font-bold text-white uppercase">{activeLang.code}</span>
            </button>
            <div className="absolute top-full mt-3 right-0 w-48 p-2 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl transform origin-top-right group-hover:scale-100 scale-95">
              {languages.map((lang) => (
                <Link 
                  key={lang.code} 
                  href={`/${lang.code}`} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors duration-200 ${activeLang.code === lang.code ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>

          {/* دکمه‌های متغیر (داشبورد/ورود) (فقط دسکتاپ) */}
          <div className="hidden md:flex items-center gap-3 min-w-[180px] justify-end">
            {isLoadingUser ? (
              <div className="w-6 h-6 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mr-8"></div>
            ) : userProfile ? (
              <>
                <Link 
                  href={`/${activeLang.code}/dashboard`} 
                  className="px-6 py-3 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  Dashboard
                </Link>
                
                <div className="relative group cursor-pointer ml-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-neutral-800 flex items-center justify-center">
                    {userProfile.avatar_url ? (
                      <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-yellow-500">{userProfile.first_name?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute top-full right-0 mt-3 p-2 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
                    <div className="px-4 py-2 border-b border-white/10 mb-2">
                       <p className="text-xs text-neutral-400">Signed in as</p>
                       <p className="text-sm font-bold text-white whitespace-nowrap">{userProfile.first_name}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href={`/${activeLang.code}/login`} 
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  href={`/${activeLang.code}/register`} 
                  className="px-7 py-3 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ================= دکمه همبرگری (موبایل) ================= */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 md:hidden z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>

        {/* ================= منوی موبایل (نسخه اصلاح شده و فوق تمیز) ================= */}
        <div 
          className={`absolute inset-x-0 top-full mt-4 rounded-3xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out md:hidden overflow-hidden origin-top ${
            mobileMenuOpen ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
          }`}
        >
          {/* اضافه شدن max-height و overflow برای اسکرول در گوشی‌های کوچک */}
          <div className="max-h-[75vh] overflow-y-auto custom-scrollbar p-5 flex flex-col gap-5">
            
            {/* لینک‌های اصلی سایت */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={`/${activeLang.code}${link.path}`}
                  className="block rounded-2xl px-5 py-3.5 text-sm font-bold text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* بخش ورود / داشبورد (موبایل) */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
              {isLoadingUser ? (
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm py-2">
                  <div className="w-5 h-5 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : userProfile ? (
                <>
                  <div className="flex items-center gap-4 px-2 mb-2">
                     <div className="w-10 h-10 rounded-full bg-neutral-800 border border-yellow-500 flex items-center justify-center font-bold overflow-hidden">
                       {userProfile.avatar_url ? <img src={userProfile.avatar_url} className="w-full h-full object-cover" /> : userProfile.first_name?.charAt(0)}
                     </div>
                     <div>
                       <p className="text-xs text-neutral-400">Welcome back,</p>
                       <p className="text-sm font-bold text-white">{userProfile.first_name}</p>
                     </div>
                  </div>
                  <Link
                    href={`/${activeLang.code}/dashboard`}
                    className="block text-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 px-4 py-3.5 text-sm font-bold text-yellow-500 hover:bg-yellow-500/20 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/${activeLang.code}/login`}
                    className="block text-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/${activeLang.code}/register`}
                    className="block text-center rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-3.5 text-sm font-bold text-black hover:from-yellow-400 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* بخش تغییر زبان (گرید ۲ ستونه برای موبایل) */}
            <div className="border-t border-white/10 pt-5">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3 px-2">Select Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      activeLang.code === lang.code 
                        ? "bg-white/10 text-white border border-white/10 shadow-inner" 
                        : "text-neutral-400 bg-white/[0.02] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    {lang.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}