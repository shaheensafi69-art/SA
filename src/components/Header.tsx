"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, LogOut, LayoutDashboard, Settings, Mail, Globe, Sparkles, BookOpen, GraduationCap, Building2, HandHeart, X, Briefcase, BookMarked, Landmark, Server, Code2, Rss } from "lucide-react";

// لیست ۹ زبان رسمی آکادمی صافی با پرچم‌های وکتور دایره‌ای و گرادینت‌های اختصاصی
const languages = [
  { code: "en", name: "English", flagUrl: "/flags/gb.svg", gradient: "from-blue-600 via-red-500 to-blue-600" },
  { code: "fa", name: "فارسی / دری", flagUrl: "/flags/af.svg", gradient: "from-emerald-500 via-white to-red-500" },
  { code: "ps", name: "پښتو", flagUrl: "/flags/af.svg", gradient: "from-neutral-800 via-red-600 to-emerald-600" },
  { code: "ru", name: "Русский", flagUrl: "/flags/ru.svg", gradient: "from-blue-600 via-white to-red-600" },
  { code: "tr", name: "Türkçe", flagUrl: "/flags/tr.svg", gradient: "from-red-600 via-white to-red-600" },
  { code: "de", name: "Deutsch", flagUrl: "/flags/de.svg", gradient: "from-neutral-800 via-red-600 to-yellow-500" },
  { code: "fr", name: "Français", flagUrl: "/flags/fr.svg", gradient: "from-blue-600 via-white to-red-600" },
  { code: "ar", name: "العربية", flagUrl: "/flags/sa.svg", gradient: "from-emerald-700 via-emerald-500 to-green-600" },
  { code: "ur", name: "اردو", flagUrl: "/flags/pk.svg", gradient: "from-green-700 via-emerald-400 to-green-700" },
];

// دیکشنری ۹ زبانه برای ترجمه داینامیک کل هدر
const translations: Record<string, any> = {
  en: {
    home: "Home", feed: "Feed", learn: "Learn", academy: "Academy", corporate: "Corporate",
    courses: "Courses", blog: "Blog", scholarships: "Scholarships", 
    partners: "Our Partners", donate: "Donate", about: "About", contact: "Contact",
    instructorApplication: "Teach With Us",
    business: "Business Setup", hosting: "Hosting Deals", development: "Development Services",
    dashboard: "Dashboard", signIn: "Sign In", getStarted: "Get Started", signOut: "Sign Out",
    welcome: "Welcome,", selectLang: "Select Language", editProfile: "Edit Profile", signedInAs: "Signed in as"
  },
  fa: {
    home: "خانه", feed: "فید سوشال", learn: "آموزش", academy: "آکادمی", corporate: "شرکتی",
    courses: "کورس‌ها", blog: "بلاگ", scholarships: "بورسیه‌ها",
    partners: "شرکای ما", donate: "کمک مالی", about: "درباره ما", contact: "تماس",
    instructorApplication: "درخواست تدریس (استادی)",
    business: "ثبت شرکت", hosting: "هاستینگ و سرور", development: "خدمات توسعه نرم‌افزار",
    dashboard: "داشـبورد", signIn: "ورود", getStarted: "شروع کنید", signOut: "خروج",
    welcome: "خوش آمدید،", selectLang: "انتخاب زبان آکادمی", editProfile: "ویرایش پروفایل", signedInAs: "وارد شده با"
  },
  ps: {
    home: "کورپاڼه", feed: "سوشل فېډ", learn: "زده کړه", academy: "اکاډمۍ", corporate: "شرکتی",
    courses: "کورسونه", blog: "بلاګ", scholarships: "بورسیې",
    partners: "زموږ شریکان", donate: "مرسته", about: "زموږ په اړه", contact: "اړیکه",
    instructorApplication: "د ښوونکي غوښتنلیک",
    business: "د شرکت ثبت", hosting: "د هوسټینګ وړاندیزونه", development: "د سافټویر جوړولو خدمتونه",
    dashboard: "ډشبورډ", signIn: "ننوتل", getStarted: "پیل کړئ", signOut: "وتل",
    welcome: "ښه راغلاست،", selectLang: "د اکاډمۍ ژبه غوره کړئ", editProfile: "پروفایل ایډیټ کړئ", signedInAs: "ننوتل شوی په توګه"
  },
  ru: {
    home: "Главная", feed: "Лента", learn: "Обучение", academy: "Академия", corporate: "Корпоративным",
    courses: "Курсы", blog: "Блог", scholarships: "Стипендии",
    partners: "Партнеры", donate: "Пожертвовать", about: "О нас", contact: "Контакты",
    instructorApplication: "Преподавать у нас",
    business: "Регистрация бизнеса", hosting: "Хостинг и серверы", development: "Разработка ПО",
    dashboard: "Панель", signIn: "Войти", getStarted: "Начать", signOut: "Выйти",
    welcome: "Добро пожаловать,", selectLang: "Выбрать язык", editProfile: "Редактировать профиль", signedInAs: "Вы вошли как"
  },
  tr: {
    home: "Ana Sayfa", feed: "Sosyal Akış", learn: "Öğren", academy: "Akademi", corporate: "Kurumsal",
    courses: "Kurslar", blog: "Blog", scholarships: "Burslar",
    partners: "Ortaklarımız", donate: "Bağış Yap", about: "Hakkımızda", contact: "İletişim",
    instructorApplication: "Eğitmen Olun",
    business: "Şirket Kuruluşu", hosting: "Hosting & Sunucu", development: "Yazılım Geliştirme",
    dashboard: "Panel", signIn: "Giriş Yap", getStarted: "Başlayın", signOut: "Çıkış Yap",
    welcome: "Hoş geldiniz,", selectLang: "Dil Seçiniz", editProfile: "Profili Düzenle", signedInAs: "Giriş yapılan hesap"
  },
  de: {
    home: "Startseite", feed: "Feed", learn: "Lernen", academy: "Akademie", corporate: "Unternehmen",
    courses: "Kurse", blog: "Blog", scholarships: "Stipendien",
    partners: "Unsere Partner", donate: "Spenden", about: "Über uns", contact: "Kontakt",
    instructorApplication: "Dozent werden",
    business: "Unternehmensgründung", hosting: "Hosting-Angebote", development: "Entwicklungsdienste",
    dashboard: "Dashboard", signIn: "Anmelden", getStarted: "Loslegen", signOut: "Abmelden",
    welcome: "Willkommen,", selectLang: "Sprache auswählen", editProfile: "Profil bearbeiten", signedInAs: "Angemeldet als"
  },
  fr: {
    home: "Accueil", feed: "Flux Social", learn: "Apprendre", academy: "Académie", corporate: "Entreprise",
    courses: "Cours", blog: "Blog", scholarships: "Bourses",
    partners: "Nos Partenaires", donate: "Faire un don", about: "À propos", contact: "Contact",
    instructorApplication: "Devenir Formateur",
    business: "Création d'entreprise", hosting: "Offres d'hébergement", development: "Services de développement",
    dashboard: "Tableau de bord", signIn: "Se connecter", getStarted: "Commencer", signOut: "Se déconnecter",
    welcome: "Bienvenue,", selectLang: "Choisir la langue", editProfile: "Modifier le profil", signedInAs: "Connecté en tant que"
  },
  ar: {
    home: "الرئيسية", feed: "الخلاصة", learn: "التعليم", academy: "الأكاديمية", corporate: "الشركات",
    courses: "الدورات", blog: "المدونة", scholarships: "المنح الدراسية",
    partners: "شركاؤنا", donate: "تبرع", about: "عن الأكاديمية", contact: "اتصل بنا",
    instructorApplication: "انضم كمعلم",
    business: "تأسيس الأعمال", hosting: "الاستضافة والخوادم", development: "خدمات التطوير",
    dashboard: "لوحة التحكم", signIn: "تسجيل الدخول", getStarted: "ابدأ الآن", signOut: "تسجيل الخروج",
    welcome: "مرحباً،", selectLang: "اختر اللغة", editProfile: "تعديل الملف الشخصي", signedInAs: "مسجل الدخول باسم"
  },
  ur: {
    home: "ہوم", feed: "سوشل فیڈ", learn: "سیکھیں", academy: "اکیڈمی", corporate: "کارپوریٹ",
    courses: "کورسز", blog: "بلاگ", scholarships: "اسکالرشپ",
    partners: "ہمارے شراکت دار", donate: "عطیہ", about: "ہمارے بارے میں", contact: "رابطہ",
    instructorApplication: "استاد بنیں (درخواست)",
    business: "بزنس سیٹ اپ", hosting: "ہوسٹنگ ڈیلز", development: "ڈیولپمنٹ سروسز",
    dashboard: "ڈیش بورڈ", signIn: "سائن ان", getStarted: "شروع کریں", signOut: "سائن آؤٹ",
    welcome: "خوش آمدید،", selectLang: "اکیڈمی کی زبان منتخب کریں", editProfile: "پروفایل میں ترمیم کریں", signedInAs: "سائن ان بطور"
  }
};

export default function Header() {
  const pathname = usePathname() || "/en";
  const router = useRouter();
  
  const currentLocale = pathname.split("/")[1] || "en";
  const activeLang = languages.find((l) => l.code === currentLocale) || languages[0];
  const t = translations[currentLocale] || translations["en"];

  const isRTL = useMemo(() => ["fa", "ps", "ar", "ur"].includes(currentLocale), [currentLocale]);

  const getLocalizedPath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    if (segments.length >= 2) {
      segments[1] = targetLocale;
      return segments.join("/") || `/${targetLocale}`;
    }
    return `/${targetLocale}`;
  };

  // Reorganized navigation links into logical dropdown groups
  const navGroups = [
    {
      id: "home",
      name: t.home,
      path: "",
      icon: <Sparkles size={15} />,
      isDropdown: false
    },
    {
      id: "feed",
      name: t.feed,
      path: "/feed",
      icon: <Rss size={15} />,
      isDropdown: false
    },
    {
      id: "learn",
      name: t.learn,
      icon: <BookMarked size={15} />,
      isDropdown: true,
      items: [
        { name: t.courses, path: "/courses", icon: <Globe size={14} /> },
        { name: t.blog, path: "/blog", icon: <BookOpen size={14} /> },
      ]
    },
    {
      id: "academy",
      name: t.academy,
      icon: <Landmark size={15} />,
      isDropdown: true,
      items: [
        { name: t.scholarships, path: "/scholarships", icon: <GraduationCap size={14} /> },
        { name: t.donate, path: "/donate", icon: <HandHeart size={14} /> },
        { name: t.about, path: "/about", icon: <Sparkles size={14} /> },
        { name: t.instructorApplication, path: "/instructor-application", icon: <GraduationCap size={14} /> },
      ]
    },
    {
      id: "corporate",
      name: t.corporate,
      icon: <Building2 size={15} />,
      isDropdown: true,
      items: [
        { name: t.business, path: "/business-formation", icon: <Briefcase size={14} /> },
        { name: t.hosting, path: "/hosting", icon: <Server size={14} /> },
        { name: t.development, path: "/development-services", icon: <Code2 size={14} /> }, // Added Development Services link
        { name: t.partners, path: "/partners", icon: <Building2 size={14} /> },
        { name: t.contact, path: "/contact", icon: <Mail size={14} /> },
      ]
    }
  ];

  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const supabase = createClient();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url, role") 
            .eq("id", session.user.id)
            .single();

          setUserProfile(profile || { first_name: "Student", avatar_url: null, role: "student" });
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

  const getDashboardRoute = () => {
    if (!userProfile) return `/${activeLang.code}/login`;
    if (userProfile.role === "super_admin" || userProfile.role === "admin") {
      return `/${activeLang.code}/admin`;
    }
    if (userProfile.role === "teacher") {
      return `/${activeLang.code}/teacher`;
    }
    return `/${activeLang.code}/dashboard`; 
  };

  if (pathname.includes("/dashboard") || pathname.includes("/admin") || pathname.includes("/teacher")) return null;

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] lg:w-[98%] max-w-[2000px] transition-all duration-700" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* هاله نوری داینامیک پشت هدر */}
      <div className={`absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r ${activeLang.gradient} opacity-20 blur-xl transition-all duration-1000 pointer-events-none`}></div>

      {/* بدنه شیشه‌ای فوق لوکس هدر */}
      <div className="relative w-full h-20 lg:h-24 px-4 lg:px-8 bg-[#030305]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
        
        {/* خط نوری زیرین هدر */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r ${activeLang.gradient} opacity-30 rounded-full`}></div>

        {/* ================= بخش لوگو ================= */}
        <Link href={`/${activeLang.code}`} className="flex items-center gap-2 group shrink-0 relative z-20">
          <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full"></div>
            <img src="/logo-without-b.png" alt="Safi Academy Logo" className="relative z-10 w-11 h-11 lg:w-14 lg:h-14 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
          </div>
          <span className="text-lg lg:text-2xl font-black text-white tracking-tight hidden sm:block">
            Safi <span className="text-yellow-500">Academy</span>
          </span>
        </Link>

        {/* ================= منوی لینک‌های وسط (دسکتاپ - کشویی و گروه بندی شده) ================= */}
        <nav 
          className="hidden xl:flex items-center gap-1 p-1 bg-white/[0.01] border border-white/5 rounded-2xl relative z-20"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navGroups.map((group) => (
            group.isDropdown ? (
              <div 
                key={group.id}
                className="relative group/dropdown h-10 flex items-center justify-center"
                onMouseEnter={() => setHoveredTab(group.id)}
              >
                <button className="relative flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-400 group-hover/dropdown:text-white transition-all duration-300">
                  {hoveredTab === group.id && (
                    <motion.div layoutId="navHoverCapsule" className="absolute inset-0 bg-white/[0.07] border border-white/5 rounded-xl -z-10 shadow-lg backdrop-blur-md" />
                  )}
                  {group.icon} {group.name} <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform opacity-50" />
                </button>

                {/* بدنه شیشه‌ای دراپ‌داون */}
                <div className="absolute top-[85%] mt-2 right-0 w-64 p-2 bg-[#06060a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 shadow-2xl transform origin-top-right scale-95 group-hover/dropdown:scale-100 z-50">
                  {group.items?.map((sub, i) => (
                    <Link 
                      key={i} 
                      href={`/${activeLang.code}${sub.path}`} 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/sub"
                    >
                      {sub.icon} {sub.name} <ArrowRight size={14} className={`opacity-0 group-hover/sub:opacity-100 transition-all ${isRTL ? 'mr-auto rotate-180 group-hover/sub:-translate-x-1' : 'ml-auto group-hover/sub:translate-x-1'}`} />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                key={group.id} 
                href={`/${activeLang.code}${group.path}`} 
                onMouseEnter={() => setHoveredTab(group.id)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-300"
              >
                {hoveredTab === group.id && (
                  <motion.div 
                    layoutId="navHoverCapsule"
                    className="absolute inset-0 bg-white/[0.07] border border-white/5 rounded-xl -z-10 shadow-lg backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {group.icon} {group.name}
              </Link>
            )
          ))}
        </nav>

        {/* ================= بخش اکشن‌ها و سوئیچر زبان ================= */}
        <div className="flex items-center gap-3 shrink-0 relative z-20">
          
          {/* سوئیچر زبان (دسکتاپ با پرچم‌های دایره‌ای) */}
          <div className="relative group/lang hidden md:block h-10 flex items-center justify-center">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/[0.08] hover:text-white text-neutral-300 transition-all duration-300 shadow-sm">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-white/25 shadow-sm shrink-0 flex items-center justify-center bg-black/40">
                <img src={activeLang.flagUrl} alt={activeLang.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">{activeLang.code}</span>
              <ChevronDown size={12} className="group-hover/lang:rotate-180 transition-transform text-white/40" />
            </button>
            <div className="absolute top-[85%] mt-2 p-2 bg-[#06060a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 shadow-2xl transform origin-top-right scale-95 group-hover/lang:scale-100 z-50 w-56 flex flex-col gap-1 max-h-[380px] overflow-y-auto custom-scrollbar">
              {languages.map((lang) => {
                const isActive = lang.code === currentLocale;
                return (
                  <Link 
                    key={lang.code} 
                    href={getLocalizedPath(lang.code)} 
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? "bg-white/10 border border-white/15 text-white shadow-inner" 
                        : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0 flex items-center justify-center bg-black/40">
                        <img src={lang.flagUrl} alt={lang.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate">{lang.name}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* دکمه‌های ورود و داشبورد دینامیک */}
          <div className="hidden sm:flex items-center gap-2.5 min-w-[170px] justify-end">
            {isLoadingUser ? (
              <div className="w-5 h-5 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mr-6"></div>
            ) : userProfile ? (
              <>
                <Link 
                  href={getDashboardRoute()} 
                  className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-black bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-[1.01] transition-all duration-300 flex items-center gap-2 border border-yellow-400/20"
                >
                  <LayoutDashboard size={15} /> {t.dashboard}
                </Link>
                
                <div className="relative group/profile cursor-pointer h-12 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-neutral-900 flex items-center justify-center hover:border-yellow-400 transition-colors">
                    {userProfile.avatar_url ? (
                      <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-yellow-500">{userProfile.first_name?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute top-[85%] mt-2 right-0 p-1.5 bg-[#06060a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 shadow-2xl z-50 transform origin-top-right scale-95 group-hover/profile:scale-100 w-52">
                    <div className="px-4 py-2.5 border-b border-white/5 mb-1">
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{t.signedInAs}</p>
                        <p className="text-xs font-black text-white truncate">{userProfile.first_name}</p>
                    </div>
                    <Link href={`${getDashboardRoute()}/profile`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:bg-white/5 hover:text-white transition-colors">
                        <Settings size={14} /> {t.editProfile}
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
                      <LogOut size={14} /> {t.signOut}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href={`/${activeLang.code}/login`} className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300">
                  {t.signIn}
                </Link>
                <Link href={`/${activeLang.code}/register`} className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-black bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-[1.01] transition-all duration-300 border border-yellow-400/20">
                  {t.getStarted}
                </Link>
              </>
            )}
          </div>

          {/* ================= دکمه همبرگری موبایل ================= */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/5 bg-white/[0.02] text-white transition-all hover:bg-white/10 xl:hidden z-50 group"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-yellow-500 transition-transform rotate-90" />
            ) : (
              <div className="w-5 h-4 flex flex-col justify-between group-hover:scale-105 transition-transform">
                <span className="w-full h-0.5 bg-white rounded-full"></span>
                <span className="w-full h-0.5 bg-yellow-500 rounded-full"></span>
                <span className="w-3/4 h-0.5 bg-white rounded-full ml-auto"></span>
              </div>
            )}
          </button>
        </div>

        {/* ================= منوی موبایل ================= */}
        <div className={`absolute inset-x-0 top-full mt-4 rounded-3xl border border-white/10 bg-[#06060a]/95 backdrop-blur-3xl shadow-2xl transition-all duration-300 ease-in-out xl:hidden overflow-hidden origin-top ${mobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}>
          <div className="max-h-[80vh] overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">
            
            <nav className="flex flex-col gap-2">
                {navGroups.map((group, index) => (
                  <div key={index} className="flex flex-col">
                    {group.isDropdown ? (
                      <>
                        <div className="flex items-center gap-3.5 px-2 py-2 text-xs font-black uppercase tracking-widest text-neutral-500 opacity-60">
                          {group.icon} {group.name}
                        </div>
                        <div className="flex flex-col pl-4 border-l border-white/10 ml-4 mb-2 mt-1">
                          {group.items?.map((sub, subIndex) => (
                            <Link
                              key={subIndex}
                              href={`/${activeLang.code}${sub.path}`}
                              className="flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                {sub.icon} {sub.name} <ArrowRight size={14} className={`opacity-20 ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'}`} />
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                          href={`/${activeLang.code}${group.path}`}
                          className="flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-xs font-black uppercase tracking-widest text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                          {group.icon} {group.name} <ArrowRight size={14} className={`opacity-20 ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'}`} />
                      </Link>
                    )}
                  </div>
                ))}
            </nav>

            {/* بخش کاربری موبایل */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
              {isLoadingUser ? (
                <div className="flex items-center justify-center gap-2 text-neutral-500 text-xs py-2"><div className="w-4 h-4 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div></div>
              ) : userProfile ? (
                <>
                  <div className="flex items-center gap-3 px-2 mb-1">
                     <div className="w-11 h-11 rounded-full bg-neutral-800 border border-yellow-500 flex items-center justify-center font-bold overflow-hidden">
                       {userProfile.avatar_url ? <img src={userProfile.avatar_url} className="w-full h-full object-cover" /> : userProfile.first_name?.charAt(0)}
                     </div>
                     <div>
                       <p className="text-[10px] text-neutral-500 font-bold">{t.welcome}</p>
                       <p className="text-sm font-black text-white">{userProfile.first_name}</p>
                     </div>
                  </div>
                  <Link href={getDashboardRoute()} className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-yellow-500"><LayoutDashboard size={16} /> {t.dashboard}</Link>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-red-400"><LogOut size={16} /> {t.signOut}</button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/${activeLang.code}/login`} className="block text-center rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-white">{t.signIn}</Link>
                  <Link href={`/${activeLang.code}/register`} className="block text-center rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-black">{t.getStarted}</Link>
                </div>
              )}
            </div>

            {/* بخش انتخاب زبان موبایل برای تمام ۹ زبان */}
            <div className="border-t border-white/5 pt-6">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4 px-2 flex items-center gap-2"><Globe size={13} /> {t.selectLang}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {languages.map((lang) => {
                  const isActive = lang.code === currentLocale;
                  return (
                    <Link
                      key={lang.code}
                      href={getLocalizedPath(lang.code)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-white/10 border border-white/15 text-white shadow-inner"
                          : "bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0 flex items-center justify-center bg-black/40">
                          <img src={lang.flagUrl} alt={lang.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="truncate">{lang.name}</span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}