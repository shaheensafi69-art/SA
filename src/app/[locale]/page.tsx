"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Globe, Cpu, TrendingUp, ShoppingCart, 
  CreditCard, Smartphone, Award, Trophy, ChevronRight, ChevronDown,
  CheckCircle2, Building, Zap, Users, GraduationCap, Clock, Sparkles, Quote, Volume2, VolumeX, Download,
  Bell, Home, BookOpen, Wallet, User, LayoutGrid, Radio, Rss, Menu, Flame, 
  PlayCircle, Heart, Search, Video, LogOut, MessageSquare, Plus, FileText, Bookmark, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary, isRtlLocale } from "@/dictionaries";

/* -------------------------------------------------------------------------- */
/*                            AnimatedNumber Component                         */
/* -------------------------------------------------------------------------- */
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

/* -------------------------------------------------------------------------- */
/*                            VideoPlayer Component                           */
/* -------------------------------------------------------------------------- */
const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative w-full h-[320px] md:h-[450px] lg:h-[540px] rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group bg-black flex items-center justify-center">
      <video 
        ref={videoRef}
        src={src} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-contain block transform group-hover:scale-102 transition-transform duration-700"
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-30 bg-black/70 hover:bg-black text-white p-3.5 rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        title={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={22} className="text-yellow-400" /> : <Volume2 size={22} className="text-yellow-400 animate-pulse" />}
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*             Localized Partner Descriptions Across 9 Languages              */
/* -------------------------------------------------------------------------- */
const partnerDescriptions: Record<string, Record<string, string>> = {
  en: {
    aws: "Cloud Infrastructure & Student Compute Credits",
    ms: "Enterprise Developer Curriculums & Azure Labs",
    google: "AI Essentials & Autonomous Agentic Frameworks",
    gates: "Humanitarian Education & Global Inclusion",
    comptia: "Cybersecurity & Systems Engineering Standards",
    pmi: "Agile Leadership & Global Governance",
    credly: "Cryptographic Tamper-Proof Credential Verification",
    accredible: "Blockchain Ledger Academic Verification",
    badgecert: "Institutional Certification Integrity Protocol",
    nefe: "Financial Literacy & Risk Management Governance"
  },
  fa: {
    aws: "زیرساخت ابری و اعتبارات رایانش دانشجویی",
    ms: "برنامه درسی توسعه‌دهندگان سازمانی و آزمایشگاه‌های آژور",
    google: "مبانی هوش مصنوعی و فریم‌ورک‌های خودکار اجنتیک",
    gates: "آموزش بشردوستانه و شمولیت بین‌المللی",
    comptia: "استانداردهای امنیت سایبری و مهندسی سیستم‌ها",
    pmi: "رهبری چابک و حاکمیت سازمانی جهانی",
    credly: "تأیید مدارک دیجیتال رمزنگاری‌شده ضدجعل",
    accredible: "اعتبارسنجی تحصیلی بر بستر دفترکل بلاک‌چین",
    badgecert: "پروتکل جامع اصالت مدارک سازمانی",
    nefe: "سواد مالی و حاکمیت مدیریت ریسک"
  },
  ps: {
    aws: "کلاوډ زیربناوې او د محصلینو کمپیوټري کریډیټونه",
    ms: "د مسلکي پروګرامرانو تدریسي نصاب او ایژور لابراتوارونه",
    google: "د مصنوعي استخباراتو اساسات او اتومات ایجنټیک چوکاټونه",
    gates: "بشردوستانه زده کړې او نړیوال شمولیت",
    comptia: "د سایبري امنیت او سیسټمونو انجنیرۍ معیارونه",
    pmi: "ځیرک مشري او نړیوال مدیریت",
    credly: "د اسنادو ډیجیټل او کریپټوګرافیک تصدیق",
    accredible: "په بلاک‌چین باندې اکاډمیک اعتبار ورکول",
    badgecert: "د اداري سندونو د روڼتیا پروتوکول",
    nefe: "مالي پوهه او د خطرونو مدیریت"
  },
  ru: {
    aws: "Облачная инфраструктура и студенческие вычислительные кредиты",
    ms: "Корпоративные программы разработчиков и лаборатории Azure",
    google: "Основы ИИ и автономные агентные платформы",
    gates: "Гуманитарное образование и глобальная интеграция",
    comptia: "Стандарты кибербезопасности и системной инженерии",
    pmi: "Agile-руководство и глобальное управление",
    credly: "Криптографическая верификация защищенных сертификатов",
    accredible: "Академическая верификация в блокчейн-реестре",
    badgecert: "Институциональный протокол подлинности сертификатов",
    nefe: "Финансовая грамотность и управление рисками"
  },
  tr: {
    aws: "Bulut Altyapısı ve Öğrenci Bilişim Kredileri",
    ms: "Kurumsal Geliştirici Müfredatları ve Azure Laboratuvarları",
    google: "Yapay Zeka Temelleri ve Otonom Ajan Çerçeveleri",
    gates: "İnsani Eğitim ve Küresel Kapsayıcılık",
    comptia: "Siber Güvenlik ve Sistem Mühendisliği Standartları",
    pmi: "Çevik Liderlik ve Küresel Yönetişim",
    credly: "Kriptografik ve Güvenli Sertifika Doğrulama",
    accredible: "Blokzincir Kayıtlı Akademik Doğrulama",
    badgecert: "Kurumsal Sertifika Bütünlüğü Protokolü",
    nefe: "Finansal Okuryazarlık ve Risk Yönetimi Yönetişimi"
  },
  de: {
    aws: "Cloud-Infrastruktur und studentische Rechen-Credits",
    ms: "Entwicklerlehrpläne für Unternehmen und Azure Labs",
    google: "KI-Grundlagen und autonome Agenten-Frameworks",
    gates: "Humanitäre Bildung und globale Inklusion",
    comptia: "Standards für Cybersicherheit und Systemtechnik",
    pmi: "Agile Führung und globale Governance",
    credly: "Kryptografische manipulationssichere Zertifikatsverifizierung",
    accredible: "Blockchain-basierte akademische Verifizierung",
    badgecert: "Protokoll zur institutionellen Zertifikatsintegrität",
    nefe: "Finanzkompetenz und Risikomanagement-Governance"
  },
  fr: {
    aws: "Infrastructure Cloud et crédits de calcul pour étudiants",
    ms: "Programmes de développement d'entreprise et laboratoires Azure",
    google: "Fondamentaux de l'IA et frameworks d'agents autonomes",
    gates: "Éducation humanitaire et inclusion mondiale",
    comptia: "Normes de cybersécurité et d'ingénierie système",
    pmi: "Leadership agile et gouvernance mondiale",
    credly: "Vérification cryptographique infalsifiable des certificats",
    accredible: "Vérification académique sur registre blockchain",
    badgecert: "Protocole d'intégrité des certifications institutionnelles",
    nefe: "Éducation financière et gouvernance de gestion des risques"
  },
  ar: {
    aws: "البنية التحتية السحابية وأرصدة الحوسبة للطلاب",
    ms: "مناهج المطورين للمؤسسات ومختبرات آژور",
    google: "أساسيات الذكاء الاصطناعي وأطر الوكلاء المستقلين",
    gates: "التعليم الإنساني والشمول العالمي",
    comptia: "معايير الأمن السيبراني وهندسة النظم",
    pmi: "القيادة المرنة والحوكمة المؤسسية العالمية",
    credly: "التحقق الرقمي المشفر المقاوم للتزوير للشهادات",
    accredible: "التوثيق الأكاديمي عبر سجلات البلوكتشين",
    badgecert: "بروتوكول سلامة الشهادات المؤسسية",
    nefe: "الثقافة المالية وإدارة المخاطر"
  },
  ur: {
    aws: "کلاؤڈ انفراسٹرکچر اور طالب علموں کے لیے کمپیوٹ کریڈٹس",
    ms: "انٹرپرائز ڈویلپر نصاب اور ایژور لیبز",
    google: "مصنوعی ذہانت کے بنیادی اصول اور خودمختار فریم ورکس",
    gates: "انسانی تعلیم اور عالمی شمولیت",
    comptia: "سائبر سیکیورٹی اور سسٹمز انجینئرنگ کے معیارات",
    pmi: "ایجائل قیادت اور عالمی گورننس",
    credly: "جعلسازی سے محفوظ تصدیق شدہ اسناد",
    accredible: "بلاک چین لیجر پر مبنی تعلیمی تصدیق",
    badgecert: "ادارہ جاتی سرٹیفکیٹ کی سالمیت کا پروٹوکول",
    nefe: "مالیاتی خواندگی اور رسک مینجمنٹ گورننس"
  }
};

/* -------------------------------------------------------------------------- */
/*            Localized App Mockup Sub-items Across 9 Languages               */
/* -------------------------------------------------------------------------- */
const appMenuItemsData: Record<string, { label: string }[]> = {
  en: [
    { label: "Announcements" }, { label: "My Courses" }, { label: "Wishlist" }, { label: "Live Campus" },
    { label: "Assignments" }, { label: "Exams & Quizzes" }, { label: "Certificates" }, { label: "Scholarships" },
    { label: "Payments & Invoices" }, { label: "Trading Journal" }
  ],
  fa: [
    { label: "اطلاعیه‌ها" }, { label: "کورس‌های من" }, { label: "علاقه‌مندی‌ها" }, { label: "کمپوس زنده" },
    { label: "تکالیف و پروژه‌ها" }, { label: "امتحانات و کوییزها" }, { label: "گواهینامه‌ها" }, { label: "بورسیه‌ها" },
    { label: "پرداخت‌ها و فاکتورها" }, { label: "ژورنال تریدینگ" }
  ],
  ps: [
    { label: "خبرتیاوې" }, { label: "زما کورسونه" }, { label: "د خوښې لیست" }, { label: "ژوندی کمپس" },
    { label: "کورنۍ دندې" }, { label: "ازموینې او پوښتنې" }, { label: "تصدیق پاڼې" }, { label: "بورسیې" },
    { label: "تادیات او انوایسونه" }, { label: "د سوداګرۍ ژورنال" }
  ],
  ru: [
    { label: "Объявления" }, { label: "Мои курсы" }, { label: "Избранное" }, { label: "Прямой эфир" },
    { label: "Задания" }, { label: "Экзамены и тесты" }, { label: "Сертификаты" }, { label: "Стипендии" },
    { label: "Оплата и счета" }, { label: "Торговый журнал" }
  ],
  tr: [
    { label: "Duyurular" }, { label: "Kurslarım" }, { label: "İstek Listesi" }, { label: "Canlı Kampüs" },
    { label: "Ödevler" }, { label: "Sınavlar ve Testler" }, { label: "Sertifikalar" }, { label: "Burslar" },
    { label: "Ödemeler ve Faturalar" }, { label: "İşlem Günlüğü" }
  ],
  de: [
    { label: "Ankündigungen" }, { label: "Meine Kurse" }, { label: "Wunschliste" }, { label: "Live-Campus" },
    { label: "Aufgaben" }, { label: "Prüfungen & Quizze" }, { label: "Zertifikate" }, { label: "Stipendien" },
    { label: "Zahlungen & Rechnungen" }, { label: "Trading-Journal" }
  ],
  fr: [
    { label: "Annonces" }, { label: "Mes cours" }, { label: "Favoris" }, { label: "Campus en direct" },
    { label: "Devoirs" }, { label: "Examens et quiz" }, { label: "Certificats" }, { label: "Bourses" },
    { label: "Paiements et factures" }, { label: "Journal de trading" }
  ],
  ar: [
    { label: "الإعلانات" }, { label: "دوراتي" }, { label: "قائمة الرغبات" }, { label: "الحرم المباشر" },
    { label: "الواجبات" }, { label: "الامتحانات والاختبارات" }, { label: "الشهادات" }, { label: "المنح الدراسية" },
    { label: "المدفوعات والفواتير" }, { label: "سجل التداول" }
  ],
  ur: [
    { label: "اعلانات" }, { label: "میرے کورسز" }, { label: "خواہشات کی فہرست" }, { label: "لائیو کیمپس" },
    { label: "اسائنمنٹس" }, { label: "امتحانات اور کوئز" }, { label: "سرٹیفکیٹس" }, { label: "وظائف" },
    { label: "ادائیگی اور انوائس" }, { label: "ٹریڈنگ جرنل" }
  ]
};

/* -------------------------------------------------------------------------- */
/*                            Main Home Component                             */
/* -------------------------------------------------------------------------- */
export default function LocalizedHome() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const dict = getDictionary(currentLocale);
  const isRTL = isRtlLocale(currentLocale);

  // ================= LIVE DATABASE STATS (Main Site) =================
  const [stats, setStats] = useState({
    students: 0,
    graduates: 0,
    teachers: 0,
    courses: 0
  });
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  // ================= MOBILE APP MOCKUP STATE & DATA =================
  const [activeAppTab, setActiveAppTab] = useState('overview');
  const [appData, setAppData] = useState({
    courses: [
      { id: '1', title: 'Web & App Development with AI', instructor_name: 'Shaheen Safi', price: '$90.00', category: 'MASTERCLASS', language: 'English, DARI' },
      { id: '2', title: 'Shopify Masterclass Pro', instructor_name: 'Shaheen Safi', price: '$150.00', category: 'E-COMMERCE', language: 'English' }
    ],
    feed: [
      { id: '1', profiles: { first_name: 'Shaheen', last_name: 'Safi', avatar_url: '' }, created_at: '2026-08-14', title: 'Gaming Room', content: 'Call Of duty', image_url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80' }
    ],
    liveClasses: [
      { id: '1', class_name: 'Shopify Main Batch', schedule_info: 'Mon, Wed, Fri, Tuesday, Wednesday, Sunday • 18:00' }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      try {
        // Fetch Main Site Stats
        const [
          { count: studentsCount },
          { count: graduatesCount },
          { count: teachersCount },
          { count: coursesCount }
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
          supabase.from('graduates').select('*', { count: 'exact', head: true }),
          supabase.from('teacher_info').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          students: studentsCount || 0,
          graduates: graduatesCount || 0,
          teachers: teachersCount || 0,
          courses: coursesCount || 0
        });

        // Fetch App Mockup Data from Database
        const { data: coursesData } = await supabase.from('courses').select('id, title, instructor_name, price, category, language').limit(3);
        const { data: feedData } = await supabase.from('discussion_posts').select('id, title, content, created_at, image_url, profiles(first_name, last_name, avatar_url)').order('created_at', { ascending: false }).limit(3);
        const { data: classesData } = await supabase.from('class_groups').select('id, class_name, schedule_info').eq('is_active', true).limit(2);

        setAppData(prev => ({
          courses: coursesData && coursesData.length > 0 ? (coursesData as any) : prev.courses,
          feed: feedData && feedData.length > 0 ? (feedData as any) : prev.feed,
          liveClasses: classesData && classesData.length > 0 ? (classesData as any) : prev.liveClasses
        }));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchData();
  }, []);

  const gradPercentage = stats.students > 0 ? Math.round((stats.graduates / stats.students) * 100) : 0;

  // ================= FAQ STATE & STATIC DATA =================
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const localizedPartnerDescs = partnerDescriptions[currentLocale] || partnerDescriptions.en;

  const partnerLogos = [
    { name: "Amazon Web Services", logo: "/par/aws.amazon.com-logo.webp", desc: localizedPartnerDescs.aws },
    { name: "Microsoft Learn", logo: "/par/learn.microsoft.com-logo.webp", desc: localizedPartnerDescs.ms },
    { name: "Google.org", logo: "/par/google.org-logo.webp", desc: localizedPartnerDescs.google },
    { name: "Bill & Melinda Gates Foundation", logo: "/par/gatesfoundation.org-logo.webp", desc: localizedPartnerDescs.gates },
    { name: "CompTIA", logo: "/par/comptia.org-logo.webp", desc: localizedPartnerDescs.comptia },
    { name: "Project Management Institute (PMI)", logo: "/par/pmi.org-logo.webp", desc: localizedPartnerDescs.pmi },
    { name: "Credly Digital Badges", logo: "/par/credly.com-logo.webp", desc: localizedPartnerDescs.credly },
    { name: "Accredible", logo: "/par/accredible.com-logo.webp", desc: localizedPartnerDescs.accredible },
    { name: "BadgeCert", logo: "/par/badgecert.com-logo.webp", desc: localizedPartnerDescs.badgecert },
    { name: "NEFE Financial Foundation", logo: "/par/nefe.org-logo.png", desc: localizedPartnerDescs.nefe }
  ];

  const ecosystemFeatures = [
    { 
      title: dict.ecosystem.safipayTitle, 
      badge: dict.ecosystem.safipayBadge,
      desc: dict.ecosystem.safipayDesc, 
      icon: <CreditCard className="w-8 h-8 text-yellow-400" />, 
      logo: "/company/SafiPay.png",
      link: "www.safipay.net", 
      color: "from-blue-600/20 to-cyan-600/20", 
      border: "border-blue-500/30", 
      stat: dict.ecosystem.safipayStat
    },
    { 
      title: dict.ecosystem.topupTitle, 
      badge: dict.ecosystem.topupBadge,
      desc: dict.ecosystem.topupDesc, 
      icon: <Smartphone className="w-8 h-8 text-yellow-400" />, 
      logo: "/company/Safi TopUp.jpg",
      link: "www.safitopup.site", 
      color: "from-emerald-600/20 to-teal-600/20", 
      border: "border-emerald-500/30", 
      stat: dict.ecosystem.topupStat
    },
    { 
      title: dict.ecosystem.proTitle, 
      badge: dict.ecosystem.proBadge,
      desc: dict.ecosystem.proDesc, 
      icon: <ShoppingCart className="w-8 h-8 text-yellow-400" />, 
      logo: "/company/SafiPro.jpeg",
      link: "www.safipro.site", 
      color: "from-rose-600/20 to-orange-600/20", 
      border: "border-rose-500/30", 
      stat: dict.ecosystem.proStat
    },
    { 
      title: dict.ecosystem.capitalTitle, 
      badge: dict.ecosystem.capitalBadge,
      desc: dict.ecosystem.capitalDesc, 
      icon: <Building className="w-8 h-8 text-yellow-400" />, 
      logo: "/company/Safi International Capital LTD.png",
      link: "UK Registry No. 17063286", 
      color: "from-purple-600/20 to-indigo-600/20", 
      border: "border-purple-500/30", 
      stat: dict.ecosystem.capitalStat
    }
  ];

  const leadershipTeam = [
    { 
      name: "Shaheen Safi", 
      role: dict.leadership.shaheenRole, 
      title: dict.leadership.shaheenTitle, 
      image: "/team/shaheen.jpeg",
      link: `/${currentLocale}/founder/shaheen-safi`,
      bio: dict.leadership.shaheenBio
    },
    { 
      name: "Mujtaba Rahmani", 
      role: dict.leadership.mujtabaRole, 
      title: dict.leadership.mujtabaTitle, 
      image: "/team/mujtaba.jpeg",
      link: `/${currentLocale}/founder/mujtaba-rahmani`,
      bio: dict.leadership.mujtabaBio
    },
    { 
      name: "Sahel Salem", 
      role: dict.leadership.sahelRole, 
      title: dict.leadership.sahelTitle, 
      image: "/team/sahel.jpeg",
      link: `/${currentLocale}/founder/sahel-salem`,
      bio: dict.leadership.sahelBio
    },
    { 
      name: "Shirin Gol Ahmadi", 
      role: dict.leadership.shirinRole, 
      title: dict.leadership.shirinTitle, 
      image: "/team/shirin.jpeg",
      link: `/${currentLocale}/founder/shirin-gol-ahmadi`,
      bio: dict.leadership.shirinBio
    }
  ];

  const academicFaculties = [
    {
      title: dict.faculties.f1Title,
      subtitle: dict.faculties.f1Subtitle,
      desc: dict.faculties.f1Desc,
      icon: <ShoppingCart size={36} className="text-yellow-400" />,
      tag: dict.faculties.f1Tag,
      color: "from-yellow-500/20 to-amber-600/10",
      border: "border-yellow-500/30",
      badge: dict.faculties.f1Badge,
      link: `/${currentLocale}/courses`,
      actionText: dict.faculties.f1Action
    },
    {
      title: dict.faculties.f2Title,
      subtitle: dict.faculties.f2Subtitle,
      desc: dict.faculties.f2Desc,
      icon: <Cpu size={36} className="text-blue-400" />,
      tag: dict.faculties.f2Tag,
      color: "from-blue-500/20 to-cyan-600/10",
      border: "border-blue-500/30",
      badge: dict.faculties.f2Badge,
      link: `/${currentLocale}/courses`,
      actionText: dict.faculties.f2Action
    },
    {
      title: dict.faculties.f3Title,
      subtitle: dict.faculties.f3Subtitle,
      desc: dict.faculties.f3Desc,
      icon: <TrendingUp size={36} className="text-emerald-400" />,
      tag: dict.faculties.f3Tag,
      color: "from-emerald-500/20 to-teal-600/10",
      border: "border-emerald-500/30",
      badge: dict.faculties.f3Badge,
      link: `/${currentLocale}/courses`,
      actionText: dict.faculties.f3Action
    },
    {
      title: dict.faculties.f4Title,
      subtitle: dict.faculties.f4Subtitle,
      desc: dict.faculties.f4Desc,
      icon: <Globe size={36} className="text-purple-400" />,
      tag: dict.faculties.f4Tag,
      color: "from-purple-500/20 to-pink-600/10",
      border: "border-purple-500/30",
      badge: dict.faculties.f4Badge,
      link: `/${currentLocale}/courses`,
      actionText: dict.faculties.f4Action
    },
    {
      title: dict.faculties.f5Title,
      subtitle: dict.faculties.f5Subtitle,
      desc: dict.faculties.f5Desc,
      icon: <GraduationCap size={36} className="text-amber-400" />,
      tag: dict.faculties.f5Tag,
      color: "from-amber-500/20 to-yellow-600/10",
      border: "border-amber-500/30",
      badge: dict.faculties.f5Badge,
      link: `/${currentLocale}/scholarships`,
      actionText: dict.faculties.f5Action
    },
    {
      title: dict.faculties.f6Title,
      subtitle: dict.faculties.f6Subtitle,
      desc: dict.faculties.f6Desc,
      icon: <Building size={36} className="text-cyan-400" />,
      tag: dict.faculties.f6Tag,
      color: "from-cyan-500/20 to-blue-600/10",
      border: "border-cyan-500/30",
      badge: dict.faculties.f6Badge,
      link: `/${currentLocale}/development-services`,
      actionText: dict.faculties.f6Action
    }
  ];

  const testimonials = [
    { 
      quote: dict.testimonials.t1Quote, 
      name: "Cris M.", 
      role: dict.testimonials.t1Role, 
      image: "https://cms-images.udemycdn.com/96883mtakkm8/3RtbxhMUTMftb9PKczSTDW/f383a1effc2975968d2f87d9273c6e9d/cris-m.webp", 
      linkText: dict.testimonials.t1Link, 
      linkUrl: `/${currentLocale}/courses` 
    },
    { 
      quote: dict.testimonials.t2Quote, 
      name: "Alvin Lim", 
      role: dict.testimonials.t2Role, 
      image: "https://cms-images.udemycdn.com/96883mtakkm8/1Djz6c0gZLaCG5SQS3PgUY/54b6fb8c85d8da01da95cbb94fa6335f/Alvin_Lim.jpeg", 
      linkText: dict.testimonials.t2Link, 
      linkUrl: `/${currentLocale}/courses` 
    },
    { 
      quote: dict.testimonials.t3Quote, 
      name: "William A. Wachlin", 
      role: dict.testimonials.t3Role, 
      image: "https://cms-images.udemycdn.com/96883mtakkm8/6dT7xusLHYoOUizXeVqgUk/4317f63fe25b2e07ad8c70cda641014b/William_A_Wachlin.jpeg", 
      linkText: dict.testimonials.t3Link, 
      linkUrl: `/${currentLocale}/courses` 
    },
    { 
      quote: dict.testimonials.t4Quote, 
      name: "Ben C.", 
      role: dict.testimonials.t4Role, 
      image: "https://cms-images.udemycdn.com/96883mtakkm8/1AXU6146N5h3Ti9rGXytFv/4832b694a15fa19c4f0538ee0c71f55a/ben-c.webp", 
      linkText: dict.testimonials.t4Link, 
      linkUrl: `/${currentLocale}/honors` 
    }
  ];

  const homeFaqs = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
  ];

  const appMenuLabels = appMenuItemsData[currentLocale] || appMenuItemsData.en;
  const appMenuIcons = [
    <Volume2 size={16} key="ann" />,
    <BookOpen size={16} key="courses" />,
    <Heart size={16} key="wish" />,
    <Radio size={16} key="live" />,
    <FileText size={16} key="assig" />,
    <Bookmark size={16} key="exams" />,
    <Award size={16} key="certs" />,
    <GraduationCap size={16} key="schol" />,
    <CreditCard size={16} key="pay" />,
    <TrendingUp size={16} key="trad" />
  ];

  return (
    <main className="w-full relative bg-[#050505] text-white selection:bg-yellow-500 selection:text-black font-sans overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* ================= BACKGROUND: ALIVE & DYNAMIC ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-amber-800/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-yellow-900/10 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative z-10 w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-32 pb-16">
        
        <div className="w-full lg:w-[56%] flex flex-col items-start space-y-8 z-20">
          <div className="flex flex-wrap items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl animate-[fadeInDown_1s_ease-out]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
            </span>
            <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-neutral-300 uppercase">
              {dict.hero.badge}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black leading-[1.08] tracking-tight animate-[fadeInLeft_1s_ease-out]">
            {dict.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 drop-shadow-md">
              {dict.hero.titleHighlight}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal animate-[fadeInLeft_1.2s_ease-out]">
            {dict.hero.desc}
          </p>
          
          {/* Action CTA Grid */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full animate-[fadeInUp_1.5s_ease-out]">
            <Link href={`/${currentLocale}/courses`} className="px-8 py-4.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_0_35px_rgba(234,179,8,0.35)] hover:shadow-[0_0_55px_rgba(234,179,8,0.55)] hover:-translate-y-1 flex items-center justify-center gap-2 group active:scale-95">
              {dict.hero.exploreBtn} <ArrowRight size={18} className={`transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </Link>

            <Link href={`/${currentLocale}/scholarships`} className="px-7 py-4.5 bg-white/[0.04] border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 text-amber-400 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group shadow-lg active:scale-95">
              <GraduationCap size={18} className="group-hover:scale-110 transition-transform" /> {dict.hero.scholarshipsBtn}
            </Link>
            
            <Link href={`/${currentLocale}/honors`} className="px-6 py-4.5 bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] text-neutral-200 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group active:scale-95">
              <Trophy size={18} className="text-amber-500 group-hover:scale-110 transition-transform" /> {dict.hero.honorsBtn}
            </Link>

            <Link href={`/${currentLocale}/get-app`} className="px-6 py-4.5 bg-fuchsia-500/10 border border-fuchsia-500/30 hover:border-fuchsia-500/60 hover:bg-fuchsia-500/20 text-fuchsia-300 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group active:scale-95">
              <Smartphone size={18} className="text-fuchsia-400 group-hover:scale-110 transition-transform" /> {dict.hero.appBtn}
            </Link>
          </div>

          {/* Key Trust & Institutional Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 w-full animate-[fadeIn_2s_ease-out]">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white font-mono">6+</span>
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{dict.hero.statFaculties}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-yellow-400 font-mono">150+</span>
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{dict.hero.statCountries}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-blue-400 font-mono">24/7</span>
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{dict.hero.statAi}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-emerald-400 font-mono">100%</span>
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">{dict.hero.statCerts}</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Display */}
        <div className="w-full lg:w-[42%] mt-14 lg:mt-0 relative z-10 flex justify-center lg:justify-end animate-[fadeInRight_1.5s_ease-out]">
          <div className="relative w-full max-w-xl">
             <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse"></div>
             <div className="relative z-10 w-full overflow-hidden rounded-[3.2rem] bg-[#0d0d12] shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-white/15 transform hover:scale-[1.01] transition-transform duration-700">
               <img 
                 src="/hero.png" 
                 alt="Safi Academy British Standard Education" 
                 className="w-full h-full object-cover block scale-[1.02]"
               />
             </div>
             
             {/* Regulatory Badge */}
             <div className="absolute -bottom-5 -left-4 bg-black/90 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3.5 animate-float">
                <div className="w-11 h-11 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">{dict.hero.complianceTitle}</p>
                  <p className="text-xs font-black text-white">{dict.hero.complianceDesc}</p>
                </div>
             </div>

             {/* Live Student Counter Badge */}
             <div className="absolute -top-4 -right-4 bg-black/90 backdrop-blur-xl border border-white/15 p-3.5 rounded-2xl shadow-2xl z-20 flex items-center gap-3 animate-float" style={{animationDelay: "1.5s"}}>
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <div className={isRTL ? "text-left" : "text-right"}>
                  <p className="text-[10px] text-neutral-400 uppercase font-mono">{dict.hero.liveCampusTitle}</p>
                  <p className="text-xs font-bold text-yellow-400">{dict.hero.liveCampusDesc}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ================= 1.2. GLOBAL INSTITUTIONAL ALLIANCES & CERTIFICATION MARQUEE ================= */}
      <section className="relative z-20 w-full py-12 border-y border-white/10 bg-[#07070d]/90 backdrop-blur-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
              {dict.marquee.badge}
            </span>
          </div>
          <Link href={`/${currentLocale}/partners`} className="text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1.5 group">
            <span>{dict.marquee.explore}</span>
            <ArrowRight size={14} className={`transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </Link>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07070d] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07070d] to-transparent z-10 pointer-events-none"></div>

          <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
            {[...partnerLogos, ...partnerLogos].map((partner, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-3.5 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-7 max-w-[130px] object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" 
                />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <div className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors">{partner.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono line-clamp-1">{partner.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 🌟 CAREER ACADEMIES BANNER SECTION ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="w-full">
          <div className="relative w-full rounded-[3.5rem] overflow-hidden border border-white/15 bg-gradient-to-r from-[#0d0d14] via-[#12121c] to-[#0d0d14] shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-8 md:p-16 lg:p-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <div className={`w-full lg:w-1/2 space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-purple-400 backdrop-blur-md shadow-lg">
                  <Sparkles size={16} /> {dict.accelerators.badge}
                </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                {dict.accelerators.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">{dict.accelerators.titleHighlight}</span>
              </h2>
            <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
              {dict.accelerators.desc}
            </p>
            <div className="pt-4">
              <Link href={`/${currentLocale}/courses`} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_15px_40px_rgba(147,51,235,0.4)] hover:shadow-[0_20px_50px_rgba(147,51,235,0.6)] hover:-translate-y-1 active:scale-95">
                {dict.accelerators.btn} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
              <img 
                src="/career-academies-banner.webp" 
                alt="Storyboard for Safi Academy ad" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
            />
          </div>
        </div>
      </div>
      </div>
      </div>
      </section>

      {/* ================= 🌟 1.5. SAFI VIDEO SHOWCASE 1 ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-24">
        <div className="w-full">
          <div className="relative w-full rounded-[3.5rem] overflow-hidden border-2 border-amber-500/30 bg-[#0a0a0f] shadow-[0_30px_90px_rgba(245,158,11,0.15)] p-8 md:p-16 lg:p-20">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              
              <div className={`w-full lg:w-1/2 space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-lg">
                  <Sparkles size={16} /> {dict.showcase1.badge}
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {dict.showcase1.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">{dict.showcase1.titleHighlight}</span>
                </h2>
                
                <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                  {dict.showcase1.desc}
                </p>

                <div className="pt-4">
                  <Link href={`/${currentLocale}/courses`} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_15px_40px_rgba(234,179,8,0.3)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.5)] hover:-translate-y-1 active:scale-95">
                    {dict.showcase1.btn} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <VideoPlayer src="/safi video.mp4" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= 🌟 1.6. SAFI VIDEO SHOWCASE 2 ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-24">
        <div className="w-full">
          <div className="relative w-full rounded-[3.5rem] overflow-hidden border-2 border-yellow-500/30 bg-[#0a0a0f] shadow-[0_30px_90px_rgba(234,179,8,0.15)] p-8 md:p-16 lg:p-20">
            
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16">
              
              <div className={`w-full lg:w-1/2 space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-yellow-400 backdrop-blur-md shadow-lg">
                  <Sparkles size={16} /> {dict.showcase2.badge}
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {dict.showcase2.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">{dict.showcase2.titleHighlight}</span>
                </h2>
                
                <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                  {dict.showcase2.desc}
                </p>

                <div className="pt-4">
                  <Link href={`/${currentLocale}/courses`} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_15px_40px_rgba(234,179,8,0.3)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.5)] hover:-translate-y-1 active:scale-95">
                    {dict.showcase2.btn} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <VideoPlayer src="/Safi_Academy_educational_ad_202607270027.mp4" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. SAFI ECOSYSTEM GRID ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-24 bg-neutral-950/60 border-y border-white/10 backdrop-blur-xl">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-bold uppercase">
              <Building size={14} /> {dict.ecosystem.badge}
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {dict.ecosystem.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">{dict.ecosystem.titleHighlight}</span>
            </h3>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              {dict.ecosystem.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ecosystemFeatures.map((feature, idx) => (
              <div key={idx} className={`relative group bg-gradient-to-br ${feature.color} border ${feature.border} p-8 lg:p-9 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-black/60 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/15 group-hover:scale-105 transition-transform shadow-inner overflow-hidden p-2.5">
                      <img src={feature.logo} alt={feature.title} className="w-full h-full object-contain filter drop-shadow" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">
                      {feature.badge}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black text-white mb-3 tracking-tight">{feature.title}</h4>
                  <p className="text-neutral-300/90 leading-relaxed flex-1 text-sm mb-6">
                    {feature.desc}
                  </p>

                  <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between text-xs font-mono">
                    <span className="text-yellow-400 font-bold">{feature.stat}</span>
                    <span className="text-neutral-400 group-hover:text-white transition-colors">{feature.link}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. WALL OF FAME TEASER ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent"></div>
        <div className="w-full relative z-10 bg-black/60 border border-amber-500/20 rounded-[3.5rem] p-8 md:p-16 lg:p-20 backdrop-blur-2xl shadow-[0_0_120px_rgba(245,158,11,0.1)] flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className={`w-full lg:w-1/2 space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/20 px-5 py-2 text-xs font-black uppercase tracking-widest text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Award size={16} /> {dict.honors.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              {dict.honors.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{dict.honors.titleHighlight}</span>
            </h2>
            <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
              {dict.honors.desc}
            </p>
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3 text-base font-bold text-neutral-300">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20}/> {dict.honors.bullet1}
              </li>
              <li className="flex items-center gap-3 text-base font-bold text-neutral-300">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20}/> {dict.honors.bullet2}
              </li>
              <li className="flex items-center gap-3 text-base font-bold text-neutral-300">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20}/> {dict.honors.bullet3}
              </li>
            </ul>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href={`/${currentLocale}/honors`} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-amber-500 hover:bg-amber-400 text-black font-black text-base uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] active:scale-95">
                <Trophy size={20}/> {dict.honors.btnWall}
              </Link>
              <Link href={`/${currentLocale}/courses`} className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-base rounded-2xl transition-all">
                {dict.honors.btnCourses} <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
              <div className="absolute top-0 right-10 w-48 h-56 bg-[#0a0a0f] border border-amber-500/30 rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-30 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 mb-4 flex items-center justify-center border border-amber-500/50">
                  <span className="text-3xl">👑</span>
                </div>
                <div className="h-2.5 w-24 bg-neutral-800 rounded-full mb-3"></div>
                <div className="h-2.5 w-16 bg-amber-500 rounded-full mb-6"></div>
                <span className="px-4 py-1.5 bg-amber-500/10 text-amber-500 text-xs font-black uppercase tracking-widest rounded-lg border border-amber-500/20">{dict.honors.rank1}</span>
              </div>
              <div className="absolute bottom-10 left-0 w-48 h-56 bg-[#0a0a0f] border border-slate-400/30 rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-slate-400/20 mb-4 flex items-center justify-center border border-slate-400/50">
                  <span className="text-3xl">🥈</span>
                </div>
                <div className="h-2.5 w-24 bg-neutral-800 rounded-full mb-3"></div>
                <div className="h-2.5 w-16 bg-slate-400 rounded-full mb-6"></div>
                <span className="px-4 py-1.5 bg-slate-400/10 text-slate-400 text-xs font-black uppercase tracking-widest rounded-lg border border-slate-400/20">{dict.honors.rank2}</span>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-56 bg-[#0a0a0f] border border-orange-700/30 rounded-3xl p-6 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 z-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-orange-700/20 mb-4 flex items-center justify-center border border-orange-700/50">
                  <span className="text-3xl">🥉</span>
                </div>
                <div className="h-2.5 w-24 bg-neutral-800 rounded-full mb-3"></div>
                <div className="h-2.5 w-16 bg-orange-700 rounded-full mb-6"></div>
                <span className="px-4 py-1.5 bg-orange-700/10 text-orange-600 text-xs font-black uppercase tracking-widest rounded-lg border border-orange-700/20">{dict.honors.rank3}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. DEPARTMENTS BENTO GRID (6 COMPREHENSIVE FACULTIES) ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-24">
        <div className="mb-16 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-bold uppercase">
            <GraduationCap size={14} /> {dict.faculties.badge}
          </div>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
            {dict.faculties.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">{dict.faculties.titleHighlight}</span>
          </h3>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {dict.faculties.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {academicFaculties.map((faculty, fIdx) => (
            <div 
              key={fIdx}
              className={`group relative bg-[#090910] border ${faculty.border} p-9 sm:p-10 rounded-[2.5rem] overflow-hidden hover:border-yellow-400/50 transition-all duration-500 shadow-2xl flex flex-col justify-between hover:-translate-y-1.5`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {faculty.icon}
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {faculty.tag}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-yellow-400 mb-1">{faculty.subtitle}</div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{faculty.title}</h4>
                <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                  {faculty.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  {faculty.badge}
                </span>
                <Link 
                  href={faculty.link} 
                  className="text-xs font-mono font-bold text-yellow-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>{faculty.actionText}</span>
                  <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4.5. LIVE ACADEMY STATS ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-28 bg-[#08080c] border-y border-white/5">
        <div className="w-full flex flex-col items-center">
          {isStatsLoading ? (
             <div className="w-full max-w-4xl h-72 flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-black/50 backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-neutral-500 mt-4 text-base font-bold animate-pulse">{dict.analytics.syncing}</p>
             </div>
          ) : (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="w-full max-w-5xl p-8 md:p-12 bg-[#0a0a0f] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-500/10 rounded-full blur-[80px]"></div>
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-10">
                   <h2 className="text-3xl font-black text-white">{dict.analytics.title}</h2>
                   <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                     <TrendingUp className="w-6 h-6 text-blue-400" />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
                   <div className="flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl">
                     <span className="text-xs uppercase font-black tracking-widest text-neutral-500 mb-2">{dict.analytics.totalEnrolled}</span>
                     <span className="text-4xl font-black text-white"><AnimatedNumber value={stats.students} /></span>
                   </div>
                   <div className="flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl">
                     <span className="text-xs uppercase font-black tracking-widest text-neutral-500 mb-2">{dict.analytics.graduates}</span>
                     <span className="text-4xl font-black text-yellow-400"><AnimatedNumber value={stats.graduates} /></span>
                   </div>
                   <div className="flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl">
                     <span className="text-xs uppercase font-black tracking-widest text-neutral-500 mb-2">{dict.analytics.instructors}</span>
                     <span className="text-4xl font-black text-blue-400"><AnimatedNumber value={stats.teachers} /></span>
                   </div>
                   <div className="flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl">
                     <span className="text-xs uppercase font-black tracking-widest text-neutral-500 mb-2">{dict.analytics.liveCourses}</span>
                     <span className="text-4xl font-black text-emerald-400"><AnimatedNumber value={stats.courses} /></span>
                   </div>
                 </div>

                 <div className="bg-black/40 border border-white/5 p-8 rounded-3xl shadow-inner">
                   <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-3">
                       <Clock className="w-5 h-5 text-neutral-500" />
                       <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{dict.analytics.studentProgression}</span>
                     </div>
                     <span className="text-sm font-black text-white bg-white/10 px-4 py-1.5 rounded-full">{gradPercentage}% {dict.analytics.successRate}</span>
                   </div>
                   <div className="w-full h-4 mb-4 overflow-hidden rounded-full bg-white/5 flex">
                     <motion.div
                       className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                       initial={{ width: 0 }}
                       whileInView={{ width: `${100 - gradPercentage}%` }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                     />
                     <motion.div
                       className="h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                       initial={{ width: 0 }}
                       whileInView={{ width: `${gradPercentage}%` }}
                       transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                     />
                   </div>
                   <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest mt-6">
                     <div className="flex items-center gap-3">
                       <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                       <span className="text-blue-400">{dict.analytics.activeLearners}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
                       <span className="text-yellow-500">{dict.analytics.certifiedGraduates}</span>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>
          )}
        </div>
      </section>

      {/* ================= 5. SAFI AI & LEADERSHIP ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 bg-neutral-950/80 border-t border-white/5">
        <div className="w-full flex flex-col lg:flex-row items-center gap-20 mb-20">
          
          <div className="w-full lg:w-5/12 relative">
             <div className="relative w-full aspect-square rounded-[3.5rem] p-1 bg-gradient-to-b from-blue-500/40 to-transparent shadow-[0_0_120px_rgba(59,130,246,0.15)] group">
                <div className="absolute inset-0 bg-[#020202] rounded-[3.5rem] overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-bg-pan"></div>
                  <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center relative z-10">
                    <div className="relative w-56 h-56 mb-10">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
                      <img 
                        src="/safi-ai.jpeg" 
                        alt="Safi AI v4.1" 
                        className="relative z-10 w-full h-full object-cover rounded-[2.5rem] border-2 border-blue-500/30 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute -bottom-4 right-0 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-blue-400 z-20 shadow-xl">
                        {dict.leadership.aiVersion}
                      </div>
                    </div>
                    <h3 className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
                      {dict.leadership.aiTitle} <Zap className="text-blue-400 w-8 h-8" />
                    </h3>
                    <p className="text-neutral-400 mt-6 text-lg font-medium leading-relaxed">
                      {dict.leadership.aiQuote}
                    </p>
                  </div>
                </div>
             </div>
          </div>

          <div className={`w-full lg:w-7/12 space-y-12 ${isRTL ? "text-right" : "text-left"}`}>
            <div>
              <span className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">{dict.leadership.badge}</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8">
                {dict.leadership.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{dict.leadership.titleHighlight}</span>
              </h2>
              <p className="text-neutral-400 text-xl leading-relaxed">
                {dict.leadership.desc}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="bg-[#090912]/90 border border-white/10 p-7 sm:p-8 rounded-[2rem] hover:bg-[#0d0d1a] hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-400 transition-colors shrink-0 shadow-lg">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                        <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">{member.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm font-semibold text-neutral-200 mb-2">{member.title}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">{member.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{dict.leadership.executiveBoard}</span>
                    <Link 
                      href={member.link}
                      className="text-xs font-mono font-bold text-blue-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-300"
                    >
                      <span>{dict.leadership.viewDossier}</span>
                      <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 5.5. GET THE APP SECTION (PURE CSS APP MOCKUP) ================= */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-24 bg-[#030305] border-t border-white/5 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Text Content */}
          <div className={`w-full lg:w-1/2 space-y-8 relative z-10 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              <Smartphone size={16} /> {dict.app.badge}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {dict.app.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-500">{dict.app.titleHighlight}</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
              {dict.app.desc}
            </p>
            <div className={`pt-4 flex flex-col sm:flex-row items-center gap-4 ${isRTL ? "justify-start" : "justify-start"}`}>
              <Link href={`/${currentLocale}/get-app`} className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_15px_40px_rgba(217,70,239,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                <Download size={20} /> {dict.app.getAppBtn}
              </Link>
            </div>
          </div>

          {/* Fully Interactive Pure Code Phone Mockup */}
          <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
            <div className="relative flex items-center justify-center animate-float drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
              
              {/* Background Glow Behind Phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/40 to-blue-500/40 rounded-full blur-[70px] animate-pulse"></div>
              
              {/* CSS Phone Chassis */}
              <div className="relative z-10 w-[290px] h-[610px] bg-neutral-950 border-[8px] border-neutral-900 rounded-[3rem] shadow-[0_0_0_1px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-sans">
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-2 inset-x-0 flex justify-center z-50">
                  <div className="w-24 h-7 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-white/5"></div>
                  </div>
                </div>

                {/* --- Screen Inner Content (Light Theme) --- */}
                <div className="flex-1 bg-[#faf6f8] text-neutral-900 w-full flex flex-col relative overflow-hidden">
                  
                  {/* Subtle Pink Header Glow inside App */}
                  <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ffedf3] to-transparent pointer-events-none"></div>
                  
                  {/* APP TABS CONTENT AREA (Scrollable) */}
                  <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10 w-full">
                    
                    {/* TAB 1: OVERVIEW */}
                    {activeAppTab === 'overview' && (
                      <div className="px-4 pt-12 flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex justify-end w-full pb-2">
                           <span className="text-[10px] font-black text-neutral-400 tracking-widest">56</span>
                        </div>
                        {/* Profile Header */}
                        <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 relative">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-pink-100 rounded-xl border border-pink-200 flex-shrink-0"></div>
                              <div>
                                 <span className="bg-pink-100 text-[#d81b60] text-[8px] font-black uppercase px-2 py-0.5 rounded-md">{dict.app.academyStudent}</span>
                                 <h3 className="text-lg font-black leading-tight mt-1">Shaheen Safi</h3>
                                 <p className="text-[10px] text-neutral-500">info@safiacademy.org</p>
                              </div>
                           </div>
                           <div className="bg-[#f5f6f8] rounded-2xl p-3 flex justify-between items-center">
                              <span className="text-[11px] font-bold text-neutral-500">{dict.app.walletBalance}</span>
                              <span className="text-base font-black text-emerald-600">$5.00</span>
                           </div>
                        </div>

                        {/* Streaks */}
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                 <Flame size={16} className="text-orange-500" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">{dict.app.dailyStreak}</p>
                                 <p className="text-xs font-black">0 {dict.app.days}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                                 <Zap size={16} className="text-orange-400" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">{dict.app.longestStreak}</p>
                                 <p className="text-xs font-black">0 {dict.app.days}</p>
                              </div>
                           </div>
                        </div>

                        {/* Stats Box */}
                        <div className="grid grid-cols-3 gap-3">
                           <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex flex-col justify-between aspect-square">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                 <BookOpen size={12} className="text-blue-600" />
                              </div>
                              <div>
                                 <p className="text-base font-black text-blue-600">1</p>
                                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">{dict.app.enrolled}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex flex-col justify-between aspect-square">
                              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                                 <Zap size={12} className="text-[#d81b60]" />
                              </div>
                              <div>
                                 <p className="text-base font-black text-[#d81b60]">1000</p>
                                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">{dict.app.score}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex flex-col justify-between aspect-square">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                                 <Trophy size={12} className="text-emerald-600" />
                              </div>
                              <div>
                                 <p className="text-base font-black text-emerald-600">1</p>
                                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">{dict.app.certs}</p>
                              </div>
                           </div>
                        </div>

                        {/* Continue Learning */}
                        <div>
                           <h4 className="text-[13px] font-black mb-2 px-1">{dict.app.continueLearning}</h4>
                           <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full border-4 border-neutral-100 flex items-center justify-center flex-shrink-0">
                                 <span className="text-[10px] font-black">0%</span>
                              </div>
                              <div>
                                 <span className="bg-pink-100 text-[#d81b60] text-[8px] font-black uppercase px-2 py-0.5 rounded-md">{dict.app.inProgress}</span>
                                 <p className="text-[13px] font-black mt-1 line-clamp-1">Shopify Masterclass</p>
                              </div>
                           </div>
                        </div>

                        {/* Active Classes */}
                        <div>
                           <h4 className="text-[13px] font-black mb-2 px-1">{dict.app.activeLiveClasses}</h4>
                           <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex justify-between items-center">
                              <div className="flex gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-[#d81b60]">
                                    <Video size={18} />
                                 </div>
                                 <div>
                                    <p className="text-[12px] font-black">Shopify Main Batch</p>
                                    <p className="text-[9px] text-neutral-500 line-clamp-1">Mon, Wed, Fri...</p>
                                 </div>
                              </div>
                              <button className="bg-pink-100 text-[#d81b60] text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1">
                                 {dict.app.join} <span className="text-[10px]">🚀</span>
                              </button>
                           </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: COURSES */}
                    {activeAppTab === 'courses' && (
                      <div className="px-4 pt-12 flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex justify-between items-center w-full pb-1">
                           <div className="flex items-center gap-2">
                             <div className="font-bold text-sm">2:35</div>
                             <div className="flex gap-0.5"><div className="w-2 h-2 rounded-full bg-neutral-300"></div><div className="w-2 h-2 rounded-full bg-neutral-300"></div></div>
                           </div>
                           <span className="text-[10px] font-black text-neutral-400 tracking-widest">55</span>
                        </div>
                        
                        <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
                           <div className="w-12 h-12 bg-[#d81b60] rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md">
                              <BookOpen size={20} />
                           </div>
                           <div>
                              <h3 className="text-base font-black leading-tight">{dict.app.learningHub}</h3>
                              <p className="text-[10px] text-neutral-500 mt-1">{dict.app.hubDesc}</p>
                           </div>
                        </div>

                        <div className="flex bg-white rounded-2xl p-1 border border-neutral-100 shadow-sm">
                           <button className="flex-1 py-2 text-[11px] font-black text-[#d81b60] bg-white rounded-xl shadow-sm">{dict.app.exploreAll}</button>
                           <button className="flex-1 py-2 text-[11px] font-bold text-neutral-500">{dict.app.myEnrolled}</button>
                        </div>

                        <div className="relative">
                           <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d81b60]" />
                           <input type="text" placeholder={dict.app.searchCourses} className="w-full bg-white border border-neutral-100 rounded-2xl py-3 pl-10 pr-4 text-[11px] shadow-sm outline-none placeholder:text-neutral-400" />
                        </div>

                        <div className="flex flex-col gap-4">
                           {appData.courses.map((course, i) => (
                             <div key={course.id || i} className="bg-white rounded-[1.5rem] shadow-sm border border-neutral-100 overflow-hidden relative">
                                <div className="h-28 bg-neutral-100 relative">
                                   <div className="absolute top-3 left-3 bg-neutral-800 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md z-10">{course.category || 'MASTERCLASS'}</div>
                                   <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10">
                                      <Heart size={14} className="text-[#d81b60]" fill="#d81b60" />
                                   </div>
                                </div>
                                <div className="p-4">
                                   <h4 className="text-[13px] font-black mb-1 leading-tight">{course.title}</h4>
                                   <p className="text-[9px] text-neutral-500 mb-4">Instructor: {course.instructor_name} • {course.language || 'English'}</p>
                                   <div className="flex justify-between items-center">
                                      <span className="text-[#d81b60] font-black text-base">{course.price}</span>
                                      <button className="bg-[#d81b60] text-white text-[10px] font-black px-4 py-2 rounded-xl">{dict.app.viewDetails}</button>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: LIVE */}
                    {activeAppTab === 'live' && (
                      <div className="px-4 pt-12 flex flex-col gap-5 animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex justify-between items-center w-full pb-1">
                           <div className="flex items-center gap-2">
                             <div className="font-bold text-sm">2:35</div>
                           </div>
                        </div>

                        <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
                           <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#d81b60] border border-pink-200">
                              <Radio size={20} />
                           </div>
                           <div>
                              <h3 className="text-base font-black leading-tight">{dict.app.liveCampus}</h3>
                              <p className="text-[10px] text-neutral-500 mt-1">{dict.app.liveCampusDesc}</p>
                           </div>
                        </div>

                        <div>
                           <div className="flex items-center gap-2 mb-3 px-1">
                              <div className="w-2 h-2 rounded-full bg-[#d81b60]"></div>
                              <h4 className="text-[13px] font-black">{dict.app.liveTransmissions} ({appData.liveClasses.length})</h4>
                           </div>
                           
                           <div className="flex flex-col gap-3">
                             {appData.liveClasses.map((cls, i) => (
                               <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 relative">
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                                     <ChevronRight size={18} />
                                  </div>
                                  <span className="bg-red-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md mb-2 inline-block">{dict.app.liveNow}</span>
                                  <h4 className="text-[14px] font-black leading-tight mb-1">{cls.class_name}</h4>
                                  <p className="text-[10px] text-neutral-500">Instructor: Shaheen Safi</p>
                                  <p className="text-[10px] text-neutral-500">Schedule: {cls.schedule_info}</p>
                               </div>
                             ))}
                           </div>
                        </div>

                        <div>
                           <h4 className="text-[13px] font-black mb-3 px-1">{dict.app.scheduledStandby}</h4>
                           <div className="bg-[#f5f6f8] rounded-3xl p-6 border border-neutral-200 text-center">
                              <p className="text-[11px] font-bold text-neutral-500">{dict.app.noUpcoming}</p>
                           </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: FEED */}
                    {activeAppTab === 'feed' && (
                      <div className="px-4 pt-12 flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex justify-between items-center w-full">
                           <h3 className="text-2xl font-black">{dict.app.feedTitle}</h3>
                           <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#d81b60]">
                              <Bell size={14} />
                           </div>
                        </div>

                        <div className="relative">
                           <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                           <input type="text" placeholder={dict.app.searchFeed} className="w-full bg-white border border-neutral-100 rounded-2xl py-3 pl-10 pr-4 text-[12px] font-medium shadow-sm outline-none placeholder:text-neutral-400" />
                        </div>

                        <div className="flex flex-col gap-5 pb-10">
                           {appData.feed.map((post, i) => (
                             <div key={post.id || i} className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                   <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
                                     {post.profiles?.avatar_url && <img src={post.profiles.avatar_url} className="w-full h-full object-cover" />}
                                   </div>
                                   <div>
                                      <h4 className="text-[13px] font-black">{post.profiles?.first_name || 'Shaheen'} {post.profiles?.last_name || 'Safi'}</h4>
                                      <p className="text-[9px] text-neutral-400 flex items-center gap-1"><Globe size={8}/> {new Date(post.created_at).toISOString().split('T')[0]}</p>
                                   </div>
                                </div>
                                <span className="bg-pink-100 text-[#d81b60] text-[9px] font-black px-2 py-1 rounded-lg mb-2 inline-block">🚀 Excited</span>
                                <h4 className="text-[15px] font-black mb-1">{post.title}</h4>
                                <p className="text-[12px] text-neutral-600 mb-3">{post.content}</p>
                                <div className="w-full h-56 bg-neutral-100 rounded-2xl overflow-hidden relative">
                                   <img src={post.image_url || '/hero.png'} className="w-full h-full object-cover" alt="Post" />
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 5: MENU */}
                    {activeAppTab === 'menu' && (
                      <div className="px-4 pt-12 flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex justify-between items-center w-full pb-2">
                           <span className="text-[10px] font-black text-[#d81b60] uppercase tracking-widest">{dict.app.portalMenu}</span>
                           <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[#d81b60]">
                              <VolumeX size={12} />
                           </div>
                        </div>

                        <div className="flex flex-col gap-2">
                           {/* Active menu item */}
                           <div className="bg-pink-100 rounded-2xl p-3 flex justify-between items-center cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-[#d81b60] text-white flex items-center justify-center">
                                  <LayoutGrid size={16} />
                                </div>
                                <span className="text-[13px] font-black text-[#d81b60]">{dict.app.overview}</span>
                              </div>
                              <ChevronRight size={16} className="text-[#d81b60]" />
                           </div>

                           {/* Other items with full localization */}
                           {appMenuLabels.map((item, i) => (
                             <div key={i} className="bg-white rounded-2xl p-3 flex justify-between items-center shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-colors">
                                <div className="flex items-center gap-4 px-2">
                                  <div className="text-[#d81b60] opacity-80">
                                    {appMenuIcons[i % appMenuIcons.length]}
                                  </div>
                                  <span className="text-[13px] font-black">{item.label}</span>
                                </div>
                                <ChevronRight size={16} className="text-neutral-400" />
                             </div>
                           ))}
                        </div>

                        {/* Profile Bottom Card */}
                        <div className="mt-4 bg-pink-50 rounded-2xl p-3 border border-pink-100 flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0"></div>
                              <div>
                                 <h4 className="text-[13px] font-black leading-tight">Roheed Safi</h4>
                                 <span className="text-[9px] font-bold text-emerald-600">BAL: $5.00</span>
                              </div>
                           </div>
                           <button className="border border-pink-200 text-[#d81b60] text-[10px] font-black px-3 py-2 rounded-xl flex items-center gap-1">
                              <LogOut size={12} /> {dict.app.logOut}
                           </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- BOTTOM NAVIGATION BAR --- */}
                  <div className="absolute bottom-0 w-full h-[72px] bg-white border-t border-neutral-200 flex justify-around items-center px-1 z-20 rounded-b-[2.2rem] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                     
                     {activeAppTab !== 'feed' ? (
                       <>
                         <button onClick={() => setActiveAppTab('overview')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${activeAppTab === 'overview' ? 'bg-pink-100 text-[#d81b60]' : 'text-neutral-400'}`}>
                           <LayoutGrid size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.overview}</span>
                         </button>
                         <button onClick={() => setActiveAppTab('courses')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${activeAppTab === 'courses' ? 'bg-pink-100 text-[#d81b60]' : 'text-neutral-400'}`}>
                           <BookOpen size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.courses}</span>
                         </button>
                         <button onClick={() => setActiveAppTab('live')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${activeAppTab === 'live' ? 'bg-pink-100 text-[#d81b60]' : 'text-neutral-400'}`}>
                           <Radio size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.live}</span>
                         </button>
                         <button onClick={() => setActiveAppTab('feed')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${activeAppTab === 'feed' ? 'bg-pink-100 text-[#d81b60]' : 'text-neutral-400'}`}>
                           <Rss size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.feed}</span>
                         </button>
                         <button onClick={() => setActiveAppTab('menu')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${activeAppTab === 'menu' ? 'bg-pink-100 text-[#d81b60]' : 'text-neutral-400'}`}>
                           <Menu size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.menu}</span>
                         </button>
                       </>
                     ) : (
                       <>
                         <button onClick={() => setActiveAppTab('feed')} className="flex flex-col items-center justify-center w-14 h-14 bg-pink-100 text-[#d81b60] rounded-2xl">
                           <LayoutGrid size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.feed}</span>
                         </button>
                         <button className="flex flex-col items-center justify-center w-14 h-14 text-neutral-400 hover:text-[#d81b60] transition-colors">
                           <Users size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.friends}</span>
                         </button>
                         <button className="flex flex-col items-center justify-center w-16 h-16 bg-[#d81b60] text-white rounded-full shadow-lg transform -translate-y-4 hover:scale-105 transition-transform">
                           <Plus size={24} />
                           <span className="text-[8px] font-black uppercase mt-0.5 tracking-wider">{dict.app.post}</span>
                         </button>
                         <button className="flex flex-col items-center justify-center w-14 h-14 text-neutral-400 hover:text-[#d81b60] transition-colors">
                           <User size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.profile}</span>
                         </button>
                         <button onClick={() => setActiveAppTab('overview')} className="flex flex-col items-center justify-center w-14 h-14 text-neutral-400 hover:text-red-500 transition-colors">
                           <LogOut size={18} />
                           <span className="text-[8px] font-black uppercase mt-1 tracking-wider">{dict.app.exit}</span>
                         </button>
                       </>
                     )}
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 6. STUDENT SUCCESS STORIES (TESTIMONIALS) ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-28 bg-[#060609] border-t border-white/5">
        <div className="w-full">
          <div className="mb-16 text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.3em]">{dict.testimonials.badge}</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {dict.testimonials.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">{dict.testimonials.titleHighlight}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-[#0b0b12] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between hover:border-yellow-500/40 transition-all duration-300 group">
                <div className="space-y-6">
                  <Quote className="w-10 h-10 text-yellow-500/40 group-hover:text-yellow-500 transition-colors" />
                  <p className="text-neutral-300 text-base leading-relaxed font-medium">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500/30 shadow-md"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-neutral-400 font-medium leading-snug">{item.role}</p>
                    </div>
                  </div>

                  <Link href={item.linkUrl} className="text-yellow-400 hover:text-yellow-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    {item.linkText} <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6.5. COMPREHENSIVE ACADEMIC FAQ ACCORDION ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-28 bg-[#050508] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest block">
              {dict.faq.badge}
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {dict.faq.title}
            </h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              {dict.faq.desc}
            </p>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#090912]/90 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-yellow-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className={`px-6 pb-6 pt-2 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5 ${isRTL ? 'pr-11' : 'pl-11'}`}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 7. MASSIVE MARTIAN CTA ================= */}
      <section className="relative z-10 w-full px-6 py-40 flex items-center justify-center overflow-hidden border-t border-white/10">
         <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-amber-950/50 to-[#020202] opacity-90"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-500/20 blur-[200px] rounded-full pointer-events-none"></div>
         
         <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center space-y-8">
            <div className="w-20 h-20 rounded-3xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
              <Award className="w-10 h-10" />
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl leading-[1.08]">
              {dict.cta.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                {dict.cta.titleHighlight}
              </span>
            </h2>

            <p className="text-lg sm:text-2xl text-neutral-300 font-normal max-w-3xl leading-relaxed">
              {dict.cta.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href={`/${currentLocale}/register`} className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-base uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(234,179,8,0.35)] hover:scale-105 flex items-center gap-3 active:scale-95">
                {dict.cta.createAccount} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
              </Link>
              <Link href={`/${currentLocale}/scholarships`} className="px-8 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-base uppercase tracking-wider rounded-2xl transition-all border border-white/15 flex items-center gap-2">
                <GraduationCap size={20} /> {dict.cta.applyScholarship}
              </Link>
              <Link href={`/${currentLocale}/contact`} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-base uppercase tracking-wider rounded-2xl transition-all border border-white/10 flex items-center gap-2">
                <Building size={18} /> {dict.cta.contactHq}
              </Link>
            </div>
         </div>
      </section>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-bg-pan {
          animation: bg-pan 4s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </main>
  );
}