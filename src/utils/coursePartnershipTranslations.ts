// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES COURSE PARTNERSHIP TRANSLATIONS
// ============================================================================

export interface PartnershipBenefit {
  title: string;
  desc: string;
}

export interface PartnershipOpportunity {
  title: string;
  category: string;
  targetRaise: string;
  minInvestment: string;
  expectedROI: string;
  progress: number;
  investors: number;
}

export interface CoursePartnershipTranslation {
  isRtl: boolean;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  benefits: PartnershipBenefit[];
  liveRoundsTitle: string;
  liveRoundsSubtitle: string;
  highYieldBadge: string;
  targetRaiseLabel: string;
  minInvestmentLabel: string;
  expectedReturnLabel: string;
  fundedLabel: string;
  partnersCount: string;
  requestDetailsBtn: string;
  opportunities: PartnershipOpportunity[];
  ctaTitle: string;
  ctaTitleHighlight: string;
  ctaSubtitle: string;
  ctaBullet1: string;
  ctaBullet2: string;
  ctaBullet3: string;
  ctaButton: string;
}

export const coursePartnershipTranslations: Record<string, CoursePartnershipTranslation> = {
  "en": {
    "isRtl": false,
    "badge": "Exclusive Investment Opportunity",
    "title": "Co-Own the Future of",
    "titleHighlight": "Premium Global Education",
    "subtitle": "Become a strategic partner at Safi Academy. Buy equity shares in our top-tier courses and earn lifetime passive income from a rapidly expanding global student base.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Request Details",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Contact Investment Team"
  },
  "fa": {
    "isRtl": true,
    "badge": "فرصت سرمایه‌گذاری اختصاصی",
    "title": "هم‌مالک آینده شوید در",
    "titleHighlight": "آموزش بین‌المللی نوین",
    "subtitle": "شریک راهبردی آکادمی صافی شوید. با خرید سهام در دوره‌های برتر ما، از درآمدهای پایدار حاصل از جامعه بین‌المللی دانشجویان بهره‌مند گردید.",
    "benefits": [
      {
        "title": "سهم سود پایدار و غیرفعال",
        "desc": "درصدی مشخص از شهریه هر ثبت‌نام را به صورت خودکار دریافت کنید. با گسترش مخاطبان دوره در سطح جهان، درآمد شما افزایش می‌یابد."
      },
      {
        "title": "امن، قانونی و ثبت‌شده",
        "desc": "با اطمینان کامل سرمایه‌گذاری کنید. تمام توافق‌نامه‌های مشارکت تحت چارچوب حقوقی و شرکت مالی ثبت‌شده ما در بریتانیا تنظیم می‌شوند."
      },
      {
        "title": "واریز آنی در سطح جهانی",
        "desc": "سود ماهانه خود را بی‌درنگ از طریق زیرساخت بانکی دیجیتال SafiPay و به ارز دلخواه خود دریافت نمایید."
      }
    ],
    "liveRoundsTitle": "دوره‌های فعال جذب سرمایه",
    "liveRoundsSubtitle": "فرصت‌های فعال سهم‌داری و مشارکت در دوره‌های آموزشی",
    "highYieldBadge": "پتانسیل بازدهی بالا",
    "targetRaiseLabel": "سرمایه هدف",
    "minInvestmentLabel": "حداقل سرمایه‌گذاری",
    "expectedReturnLabel": "بازده پیش‌بینی‌شده",
    "fundedLabel": "تکمیل شده",
    "partnersCount": "سرمایه‌گذار",
    "requestDetailsBtn": "درخواست اطلاعات و مشارکت",
    "opportunities": [
      {
        "title": "مسترکلاس تجارت الکترونیک بین‌الملل",
        "category": "تجارت الکترونیک",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% سالانه",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "بوت‌کمپ جامع هوش مصنوعی و Next.js",
        "category": "فناوری و نرم‌افزار",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% سالانه",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "معاملات نهادی بازارهای مالی و SMC",
        "category": "بازارهای مالی",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% سالانه",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "آماده‌اید تا به یک",
    "ctaTitleHighlight": "شریک راهبردی تبدیل شوید؟",
    "ctaSubtitle": "تیم روابط سرمایه‌گذاری ما آماده است تا طرح‌های مالی دقیق، پیش‌بینی‌های سودآوری و اسناد حقوقی دوره‌های آینده را در اختیار شما قرار دهد.",
    "ctaBullet1": "ارائه قرارداد رسمی محرمانگی (NDA) و طرح توجیهی سرمایه‌گذاری",
    "ctaBullet2": "شفافیت کامل و نظارت بلادرنگ بر گزارش‌های مالی در پرتال",
    "ctaBullet3": "مدیر حساب اختصاصی برای سرمایه‌گذاران نهادی و شخصی",
    "ctaButton": "ارتباط با تیم سرمایه‌گذاری"
  },
  "ps": {
    "isRtl": true,
    "badge": "د پانګونې ځانګړی فرصت",
    "title": "د راتلونکي شریک مالک شئ په",
    "titleHighlight": "لوړ پوړ نړیوالو زده کړو کې",
    "subtitle": "په صافي اکاډمۍ کې ستراتیژیک شریک شئ. زموږ په مخکښو کورسونو کې ونډې واخلئ او د نړیوالو محصلینو د زیاتوالي څخه دوامداره ګټه ترلاسه کړئ.",
    "benefits": [
      {
        "title": "د عاید دوامداره برخه",
        "desc": "د هرې نوملیکنې د فیس ټاکلې سلنه په اتومات ډول ترلاسه کړئ، چې ستاسو عاید په نړیواله کچه وده کوي."
      },
      {
        "title": "خوندي او تنظیم شوی",
        "desc": "په پوره باور سره پانګونه وکړئ. ټول تړونونه زموږ د برتانیا د ثبت شوي شرکت تر قانوني چوکاټ لاندې دي."
      },
      {
        "title": "سمدستي نړیوالې تادیات",
        "desc": "خپله میاشتنۍ ګټه په مستقیم او چټک ډول د SafiPay ډیجیټل بانکي شبکې له لارې په خپله خوښه اسعارو ترلاسه کړئ."
      }
    ],
    "liveRoundsTitle": "د پانګې راټولولو فعالې دورې",
    "liveRoundsSubtitle": "د شته کورسونو د ونډې او مشارکت فرصتونه",
    "highYieldBadge": "د لوړې ګټې امکان",
    "targetRaiseLabel": "هدف شوې پانګه",
    "minInvestmentLabel": "لږ تر لږه پانګونه",
    "expectedReturnLabel": "ټاکل شوې کلنۍ ګټه",
    "fundedLabel": "بشپړ شوی",
    "partnersCount": "پانګه وال",
    "requestDetailsBtn": "د معلوماتو غوښتنه",
    "opportunities": [
      {
        "title": "د نړیوال ای کامرس ماسټرکلاس",
        "category": "ای کامرس",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% کلنۍ",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "د بشپړ AI او Next.js بوټکیمپ",
        "category": "ټیکنالوژي",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% کلنۍ",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "د اداري سوداګرۍ او مالي مارکیټونو کورس",
        "category": "مالي مارکیټونه",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% کلنۍ",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "ایا تاسو چمتو یاست چې",
    "ctaTitleHighlight": "ستراتیژیک شریک شئ؟",
    "ctaSubtitle": "زموږ د پانګونې ټیم چمتو دی چې د راتلونکو کورسونو لپاره مالي اټکلونه او قانوني اسناد وړاندې کړي.",
    "ctaBullet1": "رسمي محرمیت قرارداد (NDA) او مالي طرحه",
    "ctaBullet2": "په پورټل کې د مالي راپورونو بشپړ شفافیت",
    "ctaBullet3": "د پانګه والو لپاره ځانګړی ملاتړی مدیر",
    "ctaButton": "د پانګونې له ټیم سره اړیکه"
  },
  "ru": {
    "isRtl": false,
    "badge": "Эксклюзивная инвестиционная возможность",
    "title": "Совладейте будущим",
    "titleHighlight": "Премиального глобального образования",
    "subtitle": "Станьте стратегическим партнером Safi Academy. Инвестируйте в флагманские курсы и получайте пассивный доход.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Запросить детали",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Связаться с инвест-командой"
  },
  "tr": {
    "isRtl": false,
    "badge": "Özel Yatırım Fırsatı",
    "title": "Geleceğin Ortağı Olun",
    "titleHighlight": "Seçkin Küresel Eğitim",
    "subtitle": "Safi Academy'de stratejik ortak olun. Kurs hisselerine yatırım yaparak sürekli pasif gelir elde edin.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Detayları Talep Et",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Yatırım Ekibiyle İletişime Geçin"
  },
  "de": {
    "isRtl": false,
    "badge": "Exklusive Investitionsmöglichkeit",
    "title": "Werden Sie Miteigentümer der Zukunft von",
    "titleHighlight": "Erstklassiger globaler Bildung",
    "subtitle": "Werden Sie strategischer Partner der Safi Academy und sichern Sie sich langfristige passive Erträge.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Details anfordern",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Investment-Team kontaktieren"
  },
  "fr": {
    "isRtl": false,
    "badge": "Opportunité d'investissement exclusive",
    "title": "Co-propriétaire de l'avenir de",
    "titleHighlight": "L'éducation mondiale d'excellence",
    "subtitle": "Devenez partenaire stratégique de Safi Academy et générez des revenus passifs durables.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Demander les détails",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Contacter l'équipe d'investissement"
  },
  "ar": {
    "isRtl": true,
    "badge": "فرصة استثمارية حصرية",
    "title": "شارك في ملكية مستقبل",
    "titleHighlight": "التعليم العالمي المتميز",
    "subtitle": "كن شريكاً استراتيجياً في أكاديمية صافي واستثمر في أفضل الدورات التدريبية لتحقيق عوائد مستمرة.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "دورات التمويل المباشرة",
    "liveRoundsSubtitle": "فرص الاستثمار المتاحة في الدورات",
    "highYieldBadge": "عائد مرتفع متوقع",
    "targetRaiseLabel": "الهدف التمويلي",
    "minInvestmentLabel": "الحد الأدنى للاستثمار",
    "expectedReturnLabel": "العائد المتوقع",
    "fundedLabel": "تم تمويله",
    "partnersCount": "شركاء",
    "requestDetailsBtn": "طلب التفاصيل",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "هل أنت مستعد لتصبح",
    "ctaTitleHighlight": "شريكاً استراتيجياً؟",
    "ctaSubtitle": "فريق علاقات المستثمرين لدينا مستعد لتزويدك بكافة التوقعات المالية والأطر القانونية.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "تواصل مع فريق الاستثمار"
  },
  "ur": {
    "isRtl": true,
    "badge": "خصوصی سرمایہ کاری کا موقع",
    "title": "مستقبل میں شراکت دار بنیں",
    "titleHighlight": "اعلیٰ عالمی تعلیم",
    "subtitle": "صافی اکیڈمی کے ساتھ اسٹریٹجک پارٹنر بنیں اور پریمیم کورسز میں ایکویٹی کے ذریعے مسلسل منافع کمائیں۔",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "دورات التمويل المباشرة",
    "liveRoundsSubtitle": "فرص الاستثمار المتاحة في الدورات",
    "highYieldBadge": "عائد مرتفع متوقع",
    "targetRaiseLabel": "الهدف التمويلي",
    "minInvestmentLabel": "الحد الأدنى للاستثمار",
    "expectedReturnLabel": "العائد المتوقع",
    "fundedLabel": "تم تمويله",
    "partnersCount": "شركاء",
    "requestDetailsBtn": "تفصیلات کی درخواست",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "هل أنت مستعد لتصبح",
    "ctaTitleHighlight": "شريكاً استراتيجياً؟",
    "ctaSubtitle": "فريق علاقات المستثمرين لدينا مستعد لتزويدك بكافة التوقعات المالية والأطر القانونية.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "انویسٹمنٹ ٹیم سے رابطہ کریں"
  },
  "es": {
    "isRtl": false,
    "badge": "Oportunidad de inversión exclusiva",
    "title": "Sea copropietario del futuro de la",
    "titleHighlight": "Educación global de élite",
    "subtitle": "Conviértase en socio estratégico de Safi Academy y genere ingresos pasivos de alto rendimiento.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Solicitar detalles",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Contactar al equipo de inversión"
  },
  "zh": {
    "isRtl": false,
    "badge": "独家投资机会",
    "title": "共同拥有未来",
    "titleHighlight": "全球顶级优质教育",
    "subtitle": "成为Safi Academy的战略合作伙伴，认购精品课程股权，获取长期的全球被动收益分成。",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "索取详细材料",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "联系投资团队"
  },
  "hi": {
    "isRtl": false,
    "badge": "विशेष निवेश अवसर",
    "title": "भविष्य के सह-मालिक बनें",
    "titleHighlight": "प्रीमियम वैश्विक शिक्षा",
    "subtitle": "साफी एकेडमी में रणनीतिक भागीदार बनें और हमारे पाठ्यक्रमों से दीर्घकालिक निष्क्रिय आय अर्जित करें।",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "विवरण का अनुरोध करें",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "निवेश टीम से संपर्क करें"
  },
  "it": {
    "isRtl": false,
    "badge": "Opportunità di investimento esclusiva",
    "title": "Co-proprietario del futuro di",
    "titleHighlight": "Istruzione globale d'eccellenza",
    "subtitle": "Diventa un partner strategico di Safi Academy e guadagna royalty passive continuative.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Richiedi dettagli",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Contatta il team investimenti"
  },
  "pt": {
    "isRtl": false,
    "badge": "Oportunidade de investimento exclusiva",
    "title": "Coproprietário do futuro da",
    "titleHighlight": "Educação global premium",
    "subtitle": "Torne-se um parceiro estratégico da Safi Academy e obtenha retornos passivos contínuos.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Solicitar detalhes",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Contatar equipe de investimento"
  },
  "ja": {
    "isRtl": false,
    "badge": "特別投資案件",
    "title": "未来の共同オーナーへ",
    "titleHighlight": "プレミアム・グローバル教育",
    "subtitle": "Safi Academyの戦略的パートナーになり、トップコースの株式保有を通じて継続的な配当を得られます。",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "詳細を請求する",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "投資チームに問い合わせる"
  },
  "ko": {
    "isRtl": false,
    "badge": "독점 투자 기회",
    "title": "미래를 공동 소유하세요",
    "titleHighlight": "프리미엄 글로벌 교육",
    "subtitle": "Safi Academy의 전략적 파트너가 되어 주요 강의의 지분을 확보하고 지속적인 패시브 인컴을 창출하세요.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "상세 자료 요청",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "투자팀에 문의하기"
  },
  "nl": {
    "isRtl": false,
    "badge": "Exclusieve investeringskans",
    "title": "Mede-eigenaar van de toekomst van",
    "titleHighlight": "Premium wereldwijd onderwijs",
    "subtitle": "Word een strategische partner bij Safi Academy en verdien doorlopend passief inkomen uit cursusaandelen.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Details aanvragen",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Neem contact op met investeerders-team"
  },
  "uz": {
    "isRtl": false,
    "badge": "Eksklyuziv investitsiya imkoniyati",
    "title": "Kelajakning hammuallifi bo'ling",
    "titleHighlight": "Yuqori darajadagi ta'lim",
    "subtitle": "Safi Academy strategik hamkoriga aylaning va jahon bo'ylab talabalar soni oshishi bilan doimiy daromad oling.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Tafsilotlarni so'rash",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Investitsiya jamoasi bilan bog'lanish"
  },
  "id": {
    "isRtl": false,
    "badge": "Peluang Investasi Eksklusif",
    "title": "Miliki Bersama Masa Depan",
    "titleHighlight": "Pendidikan Global Premium",
    "subtitle": "Jadilah mitra strategis di Safi Academy. Investasikan dana pada kursus unggulan untuk imbal hasil pasif berkelanjutan.",
    "benefits": [
      {
        "title": "Passive Revenue Share",
        "desc": "Earn a fixed percentage of every enrollment fee. Your dividends grow automatically as the course reaches a global audience."
      },
      {
        "title": "Secure & Regulated",
        "desc": "Invest with confidence. All partnership agreements are backed by our UK-registered financial entity, ensuring full legal compliance."
      },
      {
        "title": "Instant Global Payouts",
        "desc": "Receive your monthly dividends directly and instantly through the SafiPay digital banking infrastructure in your preferred currency."
      }
    ],
    "liveRoundsTitle": "Live Funding Rounds",
    "liveRoundsSubtitle": "Available Course Equity & Royalty Opportunities",
    "highYieldBadge": "High Yield Potential",
    "targetRaiseLabel": "Target Raise",
    "minInvestmentLabel": "Min Investment",
    "expectedReturnLabel": "Expected Return",
    "fundedLabel": "Funded",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Minta Informasi Lengkap",
    "opportunities": [
      {
        "title": "Global E-Commerce Masterclass",
        "category": "E-Commerce",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% APY",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technology",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% APY",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutional Trading & SMC",
        "category": "Financial Markets",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% APY",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Ready to Become a",
    "ctaTitleHighlight": "Strategic Partner?",
    "ctaSubtitle": "Our investment relations team is ready to provide you with detailed prospectuses, financial projections, and legal frameworks for our upcoming courses.",
    "ctaBullet1": "Standard NDA and investment prospectus provided",
    "ctaBullet2": "Full real-time transparency via our investor portal",
    "ctaBullet3": "Dedicated institutional account manager",
    "ctaButton": "Hubungi Tim Investasi"
  }
};

export function getCoursePartnershipTranslation(locale: string): CoursePartnershipTranslation {
  return coursePartnershipTranslations[locale] || coursePartnershipTranslations.en;
}
