// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES COURSE PARTNERSHIP TRANSLATIONS (COLOCATED)
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
    "badge": "فرصت انحصاری سرمایه‌گذاری",
    "title": "هم‌مالک آینده شوید در",
    "titleHighlight": "آموزش بین‌المللی برتر",
    "subtitle": "به عنوان شریک استراتژیک به آکادمی صافی بپیوندید. با خرید سهام دوره‌های آموزشی برتر، درآمد غیرفعال مادام‌العمر از رشد جامعه جهانی دانشجویان کسب کنید.",
    "benefits": [
      {
        "title": "سهم سود پایدار و غیرفعال",
        "desc": "درصد مشخصی از هر ثبت‌نام در دوره را دریافت کنید. سود سهام شما با گسترش دانشجویان جهانی افزایش می‌یابد."
      },
      {
        "title": "امن و دارای چارچوب قانونی",
        "desc": "با اطمینان سرمایه‌گذاری کنید. کلیه قراردادهای شراکت تحت نظارت شرکت رسمی ثبت شده ما در بریتانیا منعقد می‌شود."
      },
      {
        "title": "واریز ماهانه سود به حساب",
        "desc": "سود ماهانه خود را مستقیماً از طریق زیرساخت بانکی دیجیتال صافی‌پی با ارز دلخواه خود دریافت نمایید."
      }
    ],
    "liveRoundsTitle": "دوره‌های آماده جذب سرمایه",
    "liveRoundsSubtitle": "فرصت‌های فعال خرید سهام و حق امتیاز دوره‌های ممتاز",
    "highYieldBadge": "پتانسیل بازدهی بالا",
    "targetRaiseLabel": "سرمایه هدف",
    "minInvestmentLabel": "حداقل سرمایه‌گذاری",
    "expectedReturnLabel": "بازدهی پیش‌بینی‌شده",
    "fundedLabel": "تکمیل شده",
    "partnersCount": "شریک",
    "requestDetailsBtn": "درخواست طرح توجیهی",
    "opportunities": [
      {
        "title": "مسترکلاس تجارت الکترونیک بین‌الملل",
        "category": "تجارت الکترونیک",
        "targetRaise": "$۵۰,۰۰۰",
        "minInvestment": "$۵,۰۰۰",
        "expectedROI": "۱۸٪ - ۲۴٪ سالانه",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "بوت‌کمپ جامع هوش مصنوعی و Next.js",
        "category": "فناوری و برنامه‌نویسی",
        "targetRaise": "$۸۰,۰۰۰",
        "minInvestment": "$۱۰,۰۰۰",
        "expectedROI": "۲۰٪ - ۲۸٪ سالانه",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "معاملات نهادی و تحلیل پیشرفته SMC",
        "category": "بازارهای مالی",
        "targetRaise": "$۱۰۰,۰۰۰",
        "minInvestment": "$۱۵,۰۰۰",
        "expectedROI": "۲۵٪ - ۳۵٪ سالانه",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "آماده‌اید تا یک",
    "ctaTitleHighlight": "شریک استراتژیک شوید؟",
    "ctaSubtitle": "تیم روابط سرمایه‌گذاران ما آماده است تا طرح‌های توجیهی، پیش‌بینی‌های مالی و چارچوب حقوقی را در اختیارتان قرار دهد.",
    "ctaBullet1": "ارائه قرارداد محرمانگی (NDA) و دفترچه سرمایه‌گذاری",
    "ctaBullet2": "شفافیت مالی لحظه‌ای از طریق پرتال سرمایه‌گذاران",
    "ctaBullet3": "مدیر حساب اختصاصی و مشاور سرمایه‌گذاری حقوقی",
    "ctaButton": "ارتباط با تیم سرمایه‌گذاری"
  },
  "ps": {
    "isRtl": true,
    "badge": "د پانګونې ځانګړی فرصت",
    "title": "د راتلونکي شریک مالک شئ په",
    "titleHighlight": "پرمختللې نړیوالې زده‌کړه کې",
    "subtitle": "په صافي اکاډمۍ کې ستراتیژیک شریک شئ. زموږ د غوره کورسونو ونډې واخلئ او د نړیوالو محصلینو له زیاتوالي څخه دایمي ګټه ترلاسه کړئ.",
    "benefits": [
      {
        "title": "د عاید دوامداره برخه",
        "desc": "له هر نوي محصل څخه مشخصه سلنه ترلاسه کړئ. لکه څنګه چې کورس وده کوي، ستاسو ګټه هم زیاتیږي."
      },
      {
        "title": "خوندي او قانوني چوکاټ",
        "desc": "په پوره ډاډ پانګونه وکړئ. ټول شراکتونه په انګلستان کې د ثبت شوي رسمي شرکت له لارې ترسره کیږي."
      },
      {
        "title": "میاشتنۍ فوري تادیه",
        "desc": "خپله میاشتنۍ ګټه په مستقیم ډول د صافي پې ډیجیټل بانکي سیستم له لارې په خپله خوښه اسعارو کې ترلاسه کړئ."
      }
    ],
    "liveRoundsTitle": "د پانګونې فعال پړاوونه",
    "liveRoundsSubtitle": "د کورسونو د ونډو او امتیاز ترلاسه کولو موجود فرصتونه",
    "highYieldBadge": "د لوړې ګټې وړتیا",
    "targetRaiseLabel": "هدف شوې پانګه",
    "minInvestmentLabel": "لږ تر لږه پانګونه",
    "expectedReturnLabel": "اټکل شوې ګټه",
    "fundedLabel": "تمویل شوی",
    "partnersCount": "شریکان",
    "requestDetailsBtn": "د جزیاتو غوښتنه",
    "opportunities": [
      {
        "title": "د نړیوال آنلاین تجارت ماسټر کلاس",
        "category": "ای کامرس",
        "targetRaise": "$۵۰,۰۰۰",
        "minInvestment": "$۵,۰۰۰",
        "expectedROI": "۱۸٪ - ۲۴٪ کلنۍ",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "د Next.js او مصنوعي هوښ بوټ کمپ",
        "category": "ټیکنالوژي",
        "targetRaise": "$۸۰,۰۰۰",
        "minInvestment": "$۱۰,۰۰۰",
        "expectedROI": "۲۰٪ - ۲۸٪ کلنۍ",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "د مالي بازارونو مسلکي ټریډینګ (SMC)",
        "category": "مالي مارکیټونه",
        "targetRaise": "$۱۰۰,۰۰۰",
        "minInvestment": "$۱۵,۰۰۰",
        "expectedROI": "۲۵٪ - ۳۵٪ کلنۍ",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "ایا چمتو یاست چې یو",
    "ctaTitleHighlight": "ستراتیژیک شریک شئ؟",
    "ctaSubtitle": "زموږ د پانګونې اړیکو ډله چمتو ده چې تاسو ته د راتلونکو کورسونو مالي راپورونه او قانوني شرایط وړاندې کړي.",
    "ctaBullet1": "د رسمي محرمیت تړون (NDA) او مالي بروشر",
    "ctaBullet2": "د پانګوالو د پرتال له لارې بشپړه روڼتیا",
    "ctaBullet3": "ځانګړی مالي مدیر او حقوقي ملاتړ",
    "ctaButton": "د پانګونې له ډلې سره اړیکه"
  },
  "ar": {
    "isRtl": true,
    "badge": "فرصة استثمارية حصرية",
    "title": "شارك في ملكية مستقبل",
    "titleHighlight": "التعليم العالمي المتميز",
    "subtitle": "كن شريكاً استراتيجياً في أكاديمية صافي. اشترِ حصصاً وأسهماً في دوراتنا الرائدة واحصل على دخل دوري مستمر مدى الحياة مع توسع قاعدة طلابنا حول العالم.",
    "benefits": [
      {
        "title": "حصة أرباح دورية ومستمرة",
        "desc": "احصل على نسبة محددة من كل عملية تسجيل. تنمو عوائدك تلقائياً كلما زاد عدد الطلاب المسجلين عالمياً."
      },
      {
        "title": "آمن ومرخص قانونياً",
        "desc": "استثمر بثقة تامة. جميع اتفاقيات الشراكة موثقة تحت مظلة كياننا المالي المسجل رسمياً في بريطانيا."
      },
      {
        "title": "تحويلات شهرية فورية",
        "desc": "استلم أرباحك الشهرية مباشرة وفورياً عبر البنية التحتية المصرفية الرقمية لـ SafiPay بالعملة التي تفضلها."
      }
    ],
    "liveRoundsTitle": "جولات التمويل الاستثماري الحالية",
    "liveRoundsSubtitle": "فرص المشاركة في ملكية الدورات وعوائد الملكية الفكرية",
    "highYieldBadge": "عائد استثماري واعد",
    "targetRaiseLabel": "التمويل المستهدف",
    "minInvestmentLabel": "الحد الأدنى للاستثمار",
    "expectedReturnLabel": "العائد السنوي المتوقع",
    "fundedLabel": "تم تمويله",
    "partnersCount": "شركاء",
    "requestDetailsBtn": "طلب كراسة الشروط",
    "opportunities": [
      {
        "title": "ماستر كلاس التجارة الإلكترونية العالمية",
        "category": "التجارة الإلكترونية",
        "targetRaise": "$٥٠,٠٠٠",
        "minInvestment": "$٥,٠٠٠",
        "expectedROI": "١٨٪ - ٢٤٪ سنوياً",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "معسكر الذكاء الاصطناعي وتطوير الويب Next.js",
        "category": "التكنولوجيا والبرمجة",
        "targetRaise": "$٨٠,٠٠٠",
        "minInvestment": "$١٠,٠٠٠",
        "expectedROI": "٢٠٪ - ٢٨٪ سنوياً",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "التداول المؤسسي وتحليل الأسواق SMC",
        "category": "الأسواق المالية",
        "targetRaise": "$١٠٠,٠٠٠",
        "minInvestment": "$١٥,٠٠٠",
        "expectedROI": "٢٥٪ - ٣٥٪ سنوياً",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "هل أنت مستعد لتصبح",
    "ctaTitleHighlight": "شريكاً استراتيجياً؟",
    "ctaSubtitle": "فريق علاقات المستثمرين لدينا على استعداد لتزويدكم بالدراسات المالية وتفاصيل العقود للدورات القادمة.",
    "ctaBullet1": "توفير اتفاقية السرية (NDA) ودراسة الجدوى الكاملة",
    "ctaBullet2": "شفافية مالية مطلقة عبر بوابة المستثمرين الذكية",
    "ctaBullet3": "مدير حسابات استثمارية مخصص لدعمك",
    "ctaButton": "تواصل مع فريق الاستثمار"
  },
  "ur": {
    "isRtl": true,
    "badge": "سرمایہ کاری کا خصوصی موقع",
    "title": "مستقبل میں شراکت دار بنیں",
    "titleHighlight": "اعلیٰ معیاری عالمی تعلیم میں",
    "subtitle": "صافی اکیڈمی کے اسٹریٹجک پارٹنر بنیں۔ ہمارے مقبول کورسز میں شیئرز خریدیں اور دنیا بھر میں بڑھتے ہوئے طلبہ سے زندگی بھر غیر فعال آمدنی حاصل کریں۔",
    "benefits": [
      {
        "title": "مستقل اور غیر فعال آمدنی کا حصہ",
        "desc": "ہر طالب علم کے داخلے پر مقررہ فیصد منافع حاصل کریں۔ دنیا بھر میں کورس کی مقبولیت کے ساتھ آپ کا منافع خودکار طور پر بڑھے گا۔"
      },
      {
        "title": "محفوظ اور قانونی ضوابط کے تحت",
        "desc": "مکمل اعتماد کے ساتھ سرمایہ کاری کریں۔ تمام شراکت داری کے معاہدات برطانیہ میں رجسٹرڈ ہماری مالیاتی کمپنی کے تحت ہوتے ہیں۔"
      },
      {
        "title": "فوری ماہانہ ادائیگیاں",
        "desc": "اپنا ماہانہ منافع صافی پے کے ڈیجیٹل بینکنگ پلیٹ فارم کے ذریعے اپنی پسندیدہ کرنسی میں فوری وصول کریں۔"
      }
    ],
    "liveRoundsTitle": "سرمایہ کاری کے جاری مواقع",
    "liveRoundsSubtitle": "کورسز میں ایکویٹی اور رائلٹی کے دستیاب مواقع",
    "highYieldBadge": "شاندار منافع کا امکان",
    "targetRaiseLabel": "مطلوبہ سرمایہ",
    "minInvestmentLabel": "کم از کم سرمایہ کاری",
    "expectedReturnLabel": "متوقع سالانہ منافع",
    "fundedLabel": "مکمل ہوا",
    "partnersCount": "شراکت دار",
    "requestDetailsBtn": "تفصیلات کی درخواست کریں",
    "opportunities": [
      {
        "title": "عالمی ای کامرس ماسٹر کلاس",
        "category": "ای کامرس",
        "targetRaise": "$۵۰,۰۰۰",
        "minInvestment": "$۵,۰۰۰",
        "expectedROI": "۱۸٪ - ۲۴٪ سالانہ",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "فل اسٹیک اے آئی اور Next.js بوٹ کیمپ",
        "category": "ٹیکنالوجی",
        "targetRaise": "$۸۰,۰۰۰",
        "minInvestment": "$۱۰,۰۰۰",
        "expectedROI": "۲۰٪ - ۲۸٪ سالانہ",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "ادارہ جاتی ٹریڈنگ اور اسمارٹ منی (SMC)",
        "category": "مالیاتی مارکیٹس",
        "targetRaise": "$۱۰۰,۰۰۰",
        "minInvestment": "$۱۵,۰۰۰",
        "expectedROI": "۲۵٪ - ۳۵٪ سالانہ",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "کیا آپ تیار ہیں ایک",
    "ctaTitleHighlight": "اسٹریٹجک پارٹنر بننے کے لیے؟",
    "ctaSubtitle": "ہماری سرمایہ کاری ٹیم آپ کو آنے والے کورسز کی مالیاتی رپورٹ، معاہدات اور مکمل تفصیلات فراہم کرنے کے لیے تیار ہے۔",
    "ctaBullet1": "معاہدہ رازداری (NDA) اور مکمل فنانشل دستاویزات",
    "ctaBullet2": "انویسٹر پورٹل کے ذریعے حقیقی وقت میں شفافیت",
    "ctaBullet3": "مخصوص ادارہ جاتی اکاؤنٹ مینیجر کی سہولت",
    "ctaButton": "انویسٹمنٹ ٹیم سے رابطہ کریں"
  },
  "ru": {
    "isRtl": false,
    "badge": "Эксклюзивная инвестиционная возможность",
    "title": "Совладейте будущим",
    "titleHighlight": "Премиального онлайн-образования",
    "subtitle": "Станьте стратегическим партнером Safi Academy. Приобретайте доли в наших ведущих образовательных курсах и получайте пожизненный пассивный доход от растущей аудитории студентов со всего мира.",
    "benefits": [
      {
        "title": "Пассивный доход от продаж",
        "desc": "Получайте фиксированный процент от каждой оплаты обучения. Ваши дивиденды растут по мере расширения глобального набора."
      },
      {
        "title": "Надежность и британская юрисдикция",
        "desc": "Инвестируйте уверенно. Все партнерские соглашения оформляются через юридическое лицо, зарегистрированное в Великобритании."
      },
      {
        "title": "Мгновенные ежемесячные выплаты",
        "desc": "Получайте дивиденды каждый месяц напрямую через цифровую банковскую инфраструктуру SafiPay в удобной для вас валюте."
      }
    ],
    "liveRoundsTitle": "Текущие инвестиционные раунды",
    "liveRoundsSubtitle": "Доступные доли и возможности получения роялти от курсов",
    "highYieldBadge": "Высокая доходность",
    "targetRaiseLabel": "Целевой объем",
    "minInvestmentLabel": "Мин. инвестиция",
    "expectedReturnLabel": "Ожидаемая доходность",
    "fundedLabel": "Собрано",
    "partnersCount": "Партнеров",
    "requestDetailsBtn": "Запросить меморандум",
    "opportunities": [
      {
        "title": "Глобальный мастер-класс по E-Commerce",
        "category": "Электронная коммерция",
        "targetRaise": "$50 000",
        "minInvestment": "$5 000",
        "expectedROI": "18% - 24% годовых",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Фулстек-буткемп по ИИ и Next.js",
        "category": "Технологии",
        "targetRaise": "$80 000",
        "minInvestment": "$10 000",
        "expectedROI": "20% - 28% годовых",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Институциональный трейдинг и концепция SMC",
        "category": "Финансовые рынки",
        "targetRaise": "$100 000",
        "minInvestment": "$15 000",
        "expectedROI": "25% - 35% годовых",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Готовы стать",
    "ctaTitleHighlight": "Стратегическим партнером?",
    "ctaSubtitle": "Наша инвестиционная команда готова предоставить вам подробные проспекты, финансовые модели и юридическую структуру по предстоящим курсам.",
    "ctaBullet1": "Предоставление стандартного соглашения о конфиденциальности (NDA)",
    "ctaBullet2": "Полная прозрачность в реальном времени через кабинет инвестора",
    "ctaBullet3": "Персональный менеджер по институциональным инвестициям",
    "ctaButton": "Связаться с отделом инвестиций"
  },
  "tr": {
    "isRtl": false,
    "badge": "Ayrıcalıklı Yatırım Fırsatı",
    "title": "Geleceğin Ortağı Olun",
    "titleHighlight": "Seçkin Küresel Eğitimde",
    "subtitle": "Safi Academy'nin stratejik ortağı olun. En popüler kurslarımızın gelir ortaklığı paylarını satın alarak hızla büyüyen küresel öğrenci tabanından ömür boyu pasif gelir elde edin.",
    "benefits": [
      {
        "title": "Düzenli Pasif Gelir Payı",
        "desc": "Her kurs kaydından sabit bir komisyon kazanın. Kursun öğrenci sayısı arttıkça kâr payınız otomatik olarak büyür."
      },
      {
        "title": "Güvenli ve Yasal Çerçeve",
        "desc": "Güvenle yatırım yapın. Tüm ortaklık sözleşmeleri Birleşik Krallık tescilli resmi şirketimiz güvencesiyle imzalanır."
      },
      {
        "title": "Anında Aylık Kâr Payı Ödemeleri",
        "desc": "Aylık kâr payınızı SafiPay dijital bankacılık altyapısı üzerinden dilediğiniz para biriminde anında ve doğrudan alın."
      }
    ],
    "liveRoundsTitle": "Aktif Yatırım Turları",
    "liveRoundsSubtitle": "Mevcut Kurs Hissesi ve Telif Ortaklığı Fırsatları",
    "highYieldBadge": "Yüksek Getiri Potansiyeli",
    "targetRaiseLabel": "Hedef Fon",
    "minInvestmentLabel": "Min. Yatırım",
    "expectedReturnLabel": "Beklenen Yıllık Getiri",
    "fundedLabel": "Tamamlandı",
    "partnersCount": "Ortak",
    "requestDetailsBtn": "Detaylı Bilgi İste",
    "opportunities": [
      {
        "title": "Küresel E-Ticaret Masterclass",
        "category": "E-Ticaret",
        "targetRaise": "$50.000",
        "minInvestment": "$5.000",
        "expectedROI": "%18 - %24 Yıllık",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack Yapay Zeka ve Next.js Kampı",
        "category": "Yazılım ve Teknoloji",
        "targetRaise": "$80.000",
        "minInvestment": "$10.000",
        "expectedROI": "%20 - %28 Yıllık",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Kurumsal Trading ve SMC Analizi",
        "category": "Finansal Piyasalar",
        "targetRaise": "$100.000",
        "minInvestment": "$15.000",
        "expectedROI": "%25 - %35 Yıllık",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Siz de Bir",
    "ctaTitleHighlight": "Stratejik Ortak Olmaya Hazır mısınız?",
    "ctaSubtitle": "Yatırımcı ilişkileri ekibimiz, yeni kurslarımıza ait ayrıntılı izahnameleri, finansal projeksiyonları ve yasal çerçeveyi sunmaya hazır.",
    "ctaBullet1": "Standart gizlilik sözleşmesi (NDA) ve yatırımcı izahnamesi",
    "ctaBullet2": "Yatırımcı paneli üzerinden 7/24 anlık mali şeffaflık",
    "ctaBullet3": "Özel kurumsal müşteri temsilcisi desteği",
    "ctaButton": "Yatırım Ekibiyle İletişime Geçin"
  },
  "zh": {
    "isRtl": false,
    "badge": "尊享独家战略投资机遇",
    "title": "共同拥有未来",
    "titleHighlight": "全球一流在线教育资产",
    "subtitle": "成为 Safi Academy 的全球战略合伙人。认购我们顶尖旗舰课程的版权股权与分红权益，从快速壮大的全球学员群体中享有长期的被动收益回报。",
    "benefits": [
      {
        "title": "长期稳定的被动学费分红",
        "desc": "享有每位学员付费报名的固定收益分成。随着课程辐射全球数万名付费生源，您的股息分红持续倍增。"
      },
      {
        "title": "英国合法合规金融架构",
        "desc": "安心投资。所有股权与版税合作协议均受我们在英国注册的正规公司法律管辖与审计背书。"
      },
      {
        "title": "每月收益即时全球结算",
        "desc": "每月分红通过 SafiPay 数字化清算体系即时划转至您的国际银行账户，支持自主选择清算货币。"
      }
    ],
    "liveRoundsTitle": "正在进行的融资轮次",
    "liveRoundsSubtitle": "精选优质课程版权股权与收益权认购席位",
    "highYieldBadge": "高年化回报潜力",
    "targetRaiseLabel": "目标融资金额",
    "minInvestmentLabel": "最低起投门槛",
    "expectedReturnLabel": "预期年化回报率",
    "fundedLabel": "认购进度",
    "partnersCount": "位投资人",
    "requestDetailsBtn": "索取商业计划书",
    "opportunities": [
      {
        "title": "全球跨境电商高级实操大师班",
        "category": "跨境电商",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% 年化",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "全栈 AI 大模型与 Next.js 实战集训营",
        "category": "前沿科技",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% 年化",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "机构级交易策略与 SMC 资金流架构",
        "category": "金融市场",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% 年化",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "准备好成为我们的",
    "ctaTitleHighlight": "战略投资合伙人了吗？",
    "ctaSubtitle": "我们的投资者关系团队已准备就绪，可随时向您提供详细的募资说明书、财务测算模型及法律合规文件。",
    "ctaBullet1": "提供正规保密协议（NDA）及深度投资备忘录",
    "ctaBullet2": "投资者专属控制台提供全天候实时财务数据透明披露",
    "ctaBullet3": "专属机构客户经理提供一对一专业对接",
    "ctaButton": "联系投资关系团队"
  },
  "hi": {
    "isRtl": false,
    "badge": "विशिष्ट निवेश अवसर",
    "title": "भविष्य के सह-मालिक बनें",
    "titleHighlight": "प्रीमियम वैश्विक शिक्षा में",
    "subtitle": "Safi Academy में एक रणनीतिक भागीदार बनें। हमारे शीर्ष पाठ्यक्रमों में इक्विटी शेयर खरीदें और तेजी से बढ़ रहे वैश्विक छात्र आधार से आजीवन निष्क्रिय आय अर्जित करें।",
    "benefits": [
      {
        "title": "स्थायी निष्क्रिय राजस्व हिस्सेदारी",
        "desc": "प्रत्येक छात्र के नामांकन शुल्क का एक निश्चित प्रतिशत अर्जित करें। वैश्विक छात्रों की संख्या बढ़ने के साथ आपका लाभांश भी बढ़ता है।"
      },
      {
        "title": "सुरक्षित और कानूनी रूप से प्रमाणित",
        "desc": "विश्वास के साथ निवेश करें। सभी साझेदारी समझौते यूके में पंजीकृत हमारी संस्था द्वारा समर्थित हैं।"
      },
      {
        "title": "तत्काल मासिक भुगतान",
        "desc": "SafiPay डिजिटल बैंकिंग अवसंरचना के माध्यम से अपनी पसंदीदा मुद्रा में सीधे और तुरंत अपना मासिक लाभांश प्राप्त करें।"
      }
    ],
    "liveRoundsTitle": "सक्रिय फंडिंग राउंड",
    "liveRoundsSubtitle": "उपलब्ध पाठ्यक्रम इक्विटी और रॉयल्टी अवसर",
    "highYieldBadge": "उच्च रिटर्न क्षमता",
    "targetRaiseLabel": "लक्षित राशि",
    "minInvestmentLabel": "न्यूनतम निवेश",
    "expectedReturnLabel": "अपेक्षित वार्षिक रिटर्न",
    "fundedLabel": "वित्तपोषित",
    "partnersCount": "साझेदार",
    "requestDetailsBtn": "विवरण का अनुरोध करें",
    "opportunities": [
      {
        "title": "वैश्विक ई-कॉमर्स मास्टरक्लास",
        "category": "ई-कॉमर्स",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "18% - 24% वार्षिक",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "फुल-स्टैक एआई और Next.js बूटकैंप",
        "category": "प्रौद्योगिकी",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "20% - 28% वार्षिक",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "संस्थागत ट्रेडिंग और एसएमसी विश्लेषण",
        "category": "वित्तीय बाजार",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "25% - 35% वार्षिक",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "क्या आप बनने के लिए तैयार हैं",
    "ctaTitleHighlight": "रणनीतिक साझेदार?",
    "ctaSubtitle": "हमारी निवेशक संबंध टीम आपको आगामी पाठ्यक्रमों के लिए विस्तृत विवरण, वित्तीय अनुमान और कानूनी रूपरेखा प्रदान करने के लिए तैयार है।",
    "ctaBullet1": "मानक एनडीए और निवेश विवरणिका प्रदान की जाएगी",
    "ctaBullet2": "हमारे निवेशक पोर्टल के माध्यम से पूर्ण वास्तविक समय पारदर्शिता",
    "ctaBullet3": "समर्पित संस्थागत खाता प्रबंधक की सुविधा",
    "ctaButton": "निवेश टीम से संपर्क करें"
  },
  "de": {
    "isRtl": false,
    "badge": "Exklusive Investitionsmöglichkeit",
    "title": "Werden Sie Miteigentümer der Zukunft von",
    "titleHighlight": "Erstklassiger Globaler Bildung",
    "subtitle": "Werden Sie strategischer Partner der Safi Academy. Erwerben Sie Anteile an unseren Spitzenkursen und sichern Sie sich lebenslange passive Erträge aus einer weltweit wachsenden Studierendenschaft.",
    "benefits": [
      {
        "title": "Passiver Erlösanteil",
        "desc": "Verdienen Sie einen festen Prozentsatz an jeder Kursgebühr. Ihre Ausschüttungen steigen mit der weltweiten Expansion der Teilnehmerzahlen."
      },
      {
        "title": "Sicher & Rechtlich Reguliert",
        "desc": "Investieren Sie mit Vertrauen. Alle Partnerschaftsverträge unterliegen unserem in Großbritannien registrierten Finanzunternehmen."
      },
      {
        "title": "Sofortige Monatliche Auszahlungen",
        "desc": "Erhalten Sie Ihre monatlichen Dividenden direkt über die digitale Bankinfrastruktur von SafiPay in Ihrer gewünschten Währung."
      }
    ],
    "liveRoundsTitle": "Aktuelle Finanzierungsrunden",
    "liveRoundsSubtitle": "Verfügbare Kursbeteiligungen & Lizenzchancen",
    "highYieldBadge": "Hohes Renditepotenzial",
    "targetRaiseLabel": "Zielvolumen",
    "minInvestmentLabel": "Mindestinvestition",
    "expectedReturnLabel": "Erwartete Rendite",
    "fundedLabel": "Finanziert",
    "partnersCount": "Partner",
    "requestDetailsBtn": "Details anfordern",
    "opportunities": [
      {
        "title": "Globaler E-Commerce Masterclass-Kurs",
        "category": "E-Commerce",
        "targetRaise": "50.000 $",
        "minInvestment": "5.000 $",
        "expectedROI": "18 % - 24 % p. a.",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack KI & Next.js Intensivkurs",
        "category": "Technologie",
        "targetRaise": "80.000 $",
        "minInvestment": "10.000 $",
        "expectedROI": "20 % - 28 % p. a.",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutionelles Trading & SMC-Analyse",
        "category": "Finanzmärkte",
        "targetRaise": "100.000 $",
        "minInvestment": "15.000 $",
        "expectedROI": "25 % - 35 % p. a.",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Bereit, ein",
    "ctaTitleHighlight": "Strategischer Partner zu werden?",
    "ctaSubtitle": "Unser Team für Investor Relations stellt Ihnen gerne ausführliche Emissionsprospekte, Finanzprognosen und rechtliche Rahmenbedingungen bereit.",
    "ctaBullet1": "Standardmäßige Geheimhaltungsvereinbarung (NDA) und Investitionsprospekt",
    "ctaBullet2": "Vollständige Echtzeit-Transparenz über unser Investorenportal",
    "ctaBullet3": "Dedizierter Betreuer für institutionelle Investoren",
    "ctaButton": "Investoren-Team kontaktieren"
  },
  "fr": {
    "isRtl": false,
    "badge": "Opportunité d'Investissement Exclusive",
    "title": "Devenez copropriétaire de l'avenir de",
    "titleHighlight": "L'Enseignement d'Excellence Mondial",
    "subtitle": "Devenez un partenaire stratégique de Safi Academy. Achetez des parts dans nos formations phares et générez des revenus passifs à vie grâce à une audience étudiante mondiale en plein essor.",
    "benefits": [
      {
        "title": "Partage de Revenus Passifs",
        "desc": "Percevez un pourcentage garanti sur chaque inscription. Vos dividendes augmentent automatiquement à mesure que les cours se développent à l'international."
      },
      {
        "title": "Sécurisé et Régulé Juridiquement",
        "desc": "Investissez en toute sérénité. Tous nos accords de partenariat s'appuient sur notre entité immatriculée au Royaume-Uni."
      },
      {
        "title": "Paiements Mensuels Instantanés",
        "desc": "Recevez vos dividendes mensuels instantanément via notre infrastructure bancaire numérique SafiPay dans la devise de votre choix."
      }
    ],
    "liveRoundsTitle": "Tours de Financement en Cours",
    "liveRoundsSubtitle": "Opportunités d'Investissement et de Royalties Disponibles",
    "highYieldBadge": "Fort Potentiel de Rendement",
    "targetRaiseLabel": "Objectif de Levée",
    "minInvestmentLabel": "Investissement Min.",
    "expectedReturnLabel": "Rendement Attendu",
    "fundedLabel": "Financé",
    "partnersCount": "Partenaires",
    "requestDetailsBtn": "Demander les Détails",
    "opportunities": [
      {
        "title": "Masterclass E-Commerce Mondial",
        "category": "E-Commerce",
        "targetRaise": "50 000 $",
        "minInvestment": "5 000 $",
        "expectedROI": "18 % - 24 % par an",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Bootcamp IA Full-Stack & Next.js",
        "category": "Technologies",
        "targetRaise": "80 000 $",
        "minInvestment": "10 000 $",
        "expectedROI": "20 % - 28 % par an",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Trading Institutionnel & Stratégies SMC",
        "category": "Marchés Financiers",
        "targetRaise": "100 000 $",
        "minInvestment": "15 000 $",
        "expectedROI": "25 % - 35 % par an",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Prêt à Devenir un",
    "ctaTitleHighlight": "Partenaire Stratégique ?",
    "ctaSubtitle": "Notre équipe des relations investisseurs se tient à votre disposition pour vous remettre des prospectus détaillés et les projections financières.",
    "ctaBullet1": "Accords de confidentialité (NDA) et prospectus d'investissement officiels",
    "ctaBullet2": "Transparence totale en temps réel via le portail investisseur",
    "ctaBullet3": "Chargé de compte institutionnel dédié",
    "ctaButton": "Contacter l'Équipe d'Investissement"
  },
  "es": {
    "isRtl": false,
    "badge": "Oportunidad Exclusiva de Inversión",
    "title": "Sea copropietario del futuro de la",
    "titleHighlight": "Educación Global de Élite",
    "subtitle": "Conviértase en socio estratégico de Safi Academy. Adquiera participaciones patrimoniales en nuestros cursos de primer nivel y obtenga ingresos pasivos vitalicios del crecimiento de alumnos en todo el mundo.",
    "benefits": [
      {
        "title": "Reparto de Ingresos Pasivos",
        "desc": "Obtenga un porcentaje fijo sobre cada matrícula de alumno. Sus dividendos se incrementan a medida que el curso alcanza audiencia global."
      },
      {
        "title": "Inversión Segura y Regulada",
        "desc": "Invierta con total confianza. Todos los contratos se formalizan bajo nuestra entidad corporativa constituida en el Reino Unido."
      },
      {
        "title": "Liquidaciones Mensuales Inmediatas",
        "desc": "Cobre sus dividendos mensuales directamente y de manera instantánea a través de la infraestructura bancaria digital SafiPay."
      }
    ],
    "liveRoundsTitle": "Rondas de Financiación Activas",
    "liveRoundsSubtitle": "Oportunidades de Participación y Regalías de Cursos",
    "highYieldBadge": "Alto Rendimiento Potencial",
    "targetRaiseLabel": "Objetivo de Captación",
    "minInvestmentLabel": "Inversión Mínima",
    "expectedReturnLabel": "Retorno Estimado",
    "fundedLabel": "Financiado",
    "partnersCount": "Inversores",
    "requestDetailsBtn": "Solicitar Información",
    "opportunities": [
      {
        "title": "Masterclass de Comercio Electrónico Global",
        "category": "Comercio Electrónico",
        "targetRaise": "50.000 $",
        "minInvestment": "5.000 $",
        "expectedROI": "18 % - 24 % anual",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Bootcamp de IA Full-Stack y Next.js",
        "category": "Tecnología",
        "targetRaise": "80.000 $",
        "minInvestment": "10.000 $",
        "expectedROI": "20 % - 28 % anual",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Trading Institucional y Metodología SMC",
        "category": "Mercados Financieros",
        "targetRaise": "100.000 $",
        "minInvestment": "15.000 $",
        "expectedROI": "25 % - 35 % anual",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "¿Listo para Convertirse en un",
    "ctaTitleHighlight": "Socio Estratégico?",
    "ctaSubtitle": "Nuestro equipo de relaciones con inversores está preparado para facilitarle folletos detallados, modelos financieros y el marco legal correspondiente.",
    "ctaBullet1": "Acuerdo de confidencialidad estándar (NDA) y memoria de inversión",
    "ctaBullet2": "Transparencia contable en tiempo real a través del portal del inversor",
    "ctaBullet3": "Gestor de cuenta institucional asignado de forma personalizada",
    "ctaButton": "Contactar con el Equipo de Inversión"
  },
  "it": {
    "isRtl": false,
    "badge": "Opportunità Esclusiva di Investimento",
    "title": "Diventa comproprietario del futuro della",
    "titleHighlight": "Formazione Globale di Alto Livello",
    "subtitle": "Diventa partner strategico di Safi Academy. Acquista quote di partecipazione nei nostri corsi di punta e genera entrate passive a vita dalla nostra crescente platea studentesca internazionale.",
    "benefits": [
      {
        "title": "Quota di Ricavi Passivi",
        "desc": "Percepisci una percentuale fissa su ogni quota di iscrizione. I tuoi dividendi aumentano proporzionalmente alla crescita degli studenti nel mondo."
      },
      {
        "title": "Investimento Sicuro e Regolamentato",
        "desc": "Investi con la massima serenità. Tutti gli accordi sono sottoscritti con la nostra società finanziaria registrata nel Regno Unito."
      },
      {
        "title": "Accrediti Mensili Immediati",
        "desc": "Ricevi i tuoi dividendi mensili in tempo reale attraverso l'infrastruttura di banking digitale SafiPay nella valuta prescelta."
      }
    ],
    "liveRoundsTitle": "Round di Finanziamento Attivi",
    "liveRoundsSubtitle": "Quote di Corsi e Opportunità di Royalty Disponibili",
    "highYieldBadge": "Alto Rendimento Atteso",
    "targetRaiseLabel": "Obiettivo di Raccolta",
    "minInvestmentLabel": "Investimento Minimo",
    "expectedReturnLabel": "Rendimento Previsto",
    "fundedLabel": "Finanziato",
    "partnersCount": "Partner",
    "requestDetailsBtn": "Richiedi Dettagli",
    "opportunities": [
      {
        "title": "Masterclass Globale di E-Commerce",
        "category": "E-Commerce",
        "targetRaise": "50.000 $",
        "minInvestment": "5.000 $",
        "expectedROI": "18% - 24% annuo",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Bootcamp Full-Stack AI & Next.js",
        "category": "Tecnologia",
        "targetRaise": "80.000 $",
        "minInvestment": "10.000 $",
        "expectedROI": "20% - 28% annuo",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Trading Istituzionale & Modelli SMC",
        "category": "Mercati Finanziari",
        "targetRaise": "100.000 $",
        "minInvestment": "15.000 $",
        "expectedROI": "25% - 35% annuo",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Pronto a Diventare un",
    "ctaTitleHighlight": "Partner Strategico?",
    "ctaSubtitle": "Il nostro team di relazioni con gli investitori è a disposizione per presentarti prospetti dettagliati, proiezioni economico-finanziarie e accordi legali.",
    "ctaBullet1": "Accordo di riservatezza (NDA) e prospetto informativo inclusi",
    "ctaBullet2": "Trasparenza contabile in tempo reale tramite il portale investitori",
    "ctaBullet3": "Account manager istituzionale dedicato",
    "ctaButton": "Contatta il Team di Investimento"
  },
  "pt": {
    "isRtl": false,
    "badge": "Oportunidade Exclusiva de Investimento",
    "title": "Seja coproprietário do futuro da",
    "titleHighlight": "Educação Global de Alto Padrão",
    "subtitle": "Torne-se um parceiro estratégico da Safi Academy. Compre cotas de participação nos nossos principais cursos e receba renda passiva vitalícia do crescimento da nossa base global de alunos.",
    "benefits": [
      {
        "title": "Divisão de Receitas Passivas",
        "desc": "Receba uma porcentagem fixa de cada matrícula. Seus dividendos crescem à medida que os cursos alcançam um público mundial."
      },
      {
        "title": "Seguro e em Conformidade Legal",
        "desc": "Invista com confiança. Todos os contratos de parceria são firmados sob a chancela da nossa entidade registrada no Reino Unido."
      },
      {
        "title": "Repasses Mensais Imediatos",
        "desc": "Receba seus lucros mensais de forma direta e instantânea por meio da infraestrutura de banco digital SafiPay na moeda desejada."
      }
    ],
    "liveRoundsTitle": "Rodadas de Captação Abertas",
    "liveRoundsSubtitle": "Oportunidades de Participação e Royalties de Cursos",
    "highYieldBadge": "Alto Potencial de Retorno",
    "targetRaiseLabel": "Meta de Captação",
    "minInvestmentLabel": "Investimento Mínimo",
    "expectedReturnLabel": "Retorno Estimado",
    "fundedLabel": "Captado",
    "partnersCount": "Sócios",
    "requestDetailsBtn": "Solicitar Detalhes",
    "opportunities": [
      {
        "title": "Masterclass de E-Commerce Global",
        "category": "E-Commerce",
        "targetRaise": "US$ 50.000",
        "minInvestment": "US$ 5.000",
        "expectedROI": "18% - 24% a.a.",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Bootcamp de IA Full-Stack e Next.js",
        "category": "Tecnologia",
        "targetRaise": "US$ 80.000",
        "minInvestment": "US$ 10.000",
        "expectedROI": "20% - 28% a.a.",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Trading Institucional e Estratégias SMC",
        "category": "Mercados Financeiros",
        "targetRaise": "US$ 100.000",
        "minInvestment": "US$ 15.000",
        "expectedROI": "25% - 35% a.a.",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Pronto para se Tornar um",
    "ctaTitleHighlight": "Sócio Estratégico?",
    "ctaSubtitle": "Nossa equipe de relações com investidores está pronta para apresentar prospectos detalhados, projeções financeiras e a estrutura jurídica dos próximos cursos.",
    "ctaBullet1": "Termo de confidencialidade padrão (NDA) e prospecto de investimento",
    "ctaBullet2": "Transparência total em tempo real pelo portal do investidor",
    "ctaBullet3": "Gerente de contas institucionais exclusivo",
    "ctaButton": "Falar com a Equipe de Investimento"
  },
  "ja": {
    "isRtl": false,
    "badge": "限定投資オファー",
    "title": "未来の共同オーナーへ",
    "titleHighlight": "世界水準のプレミアム教育事業",
    "subtitle": "Safi Academy の戦略的パートナーになりませんか。最高水準の講座資産の持ち分（エクイティ）を共同保有し、世界中で拡大し続ける受講生基盤から永続的なインカムゲインを獲得できます。",
    "benefits": [
      {
        "title": "受講料の安定的なレベニューシェア",
        "desc": "受講申し込みごとに所定の割合の配当を受領。講座の世界的展開と受講生の増加に伴い、自動的に配当原資が拡大します。"
      },
      {
        "title": "英国法人による厳格な法的保護",
        "desc": "安心の投資環境。すべてのパートナーシップ契約は、英国法人を通じて法的コンプライアンスに基づき厳正に締結されます。"
      },
      {
        "title": "毎月即時入金される配当システム",
        "desc": "SafiPay の次世代デジタル決済インフラを通じて、毎月の配当金を希望の通貨で直接かつ即座にお受け取りいただけます。"
      }
    ],
    "liveRoundsTitle": "現在募集中の調達ラウンド",
    "liveRoundsSubtitle": "現在出資可能な講座資産およびロイヤルティ権利",
    "highYieldBadge": "高利回りポテンシャル",
    "targetRaiseLabel": "募集目標額",
    "minInvestmentLabel": "最低出資額",
    "expectedReturnLabel": "想定年間利回り",
    "fundedLabel": "調達進捗率",
    "partnersCount": "名の投資家",
    "requestDetailsBtn": "事業計画書の請求",
    "opportunities": [
      {
        "title": "グローバル越境Eコマース実務マスター講座",
        "category": "Eコマース",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "年利 18% - 24%",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "フルスタックAI＆Next.js集中開発ブートキャンプ",
        "category": "テクノロジー",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "年利 20% - 28%",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "機関投資家向けトレーディング＆SMC資金流戦略",
        "category": "金融市場",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "年利 25% - 35%",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "あなたも今すぐ",
    "ctaTitleHighlight": "戦略的パートナーへ",
    "ctaSubtitle": "弊社の投資家対応チームが、今後開講予定のコースに関する詳細な目論見書、財務予測モデル、法的合意枠組みをご案内いたします。",
    "ctaBullet1": "標準秘密保持契約（NDA）および投資目論見書の交付",
    "ctaBullet2": "投資家専用ポータルを通じた完全なリアルタイム財務開示",
    "ctaBullet3": "専任の機関投資家担当アカウントマネージャーのサポート",
    "ctaButton": "投資担当チームへ連絡する"
  },
  "ko": {
    "isRtl": false,
    "badge": "독점 투자 기회",
    "title": "미래를 공동 소유하세요",
    "titleHighlight": "최고급 글로벌 교육 자산",
    "subtitle": "Safi Academy의 전략적 파트너가 되십시오. 최고 등급 교육 강좌의 지분을 인수하고 전 세계적으로 급성장하는 수강생 네트워크로부터 지속적인 패시브 인컴을 창출하세요.",
    "benefits": [
      {
        "title": "수익성 높은 배당 분배",
        "desc": "수강 등록 수수료의 일정 비율을 안정적으로 배당받습니다. 전 세계 수강생이 늘어남에 따라 배당 수익이 자동으로 증가합니다."
      },
      {
        "title": "영국 법인 기반의 법적 보호",
        "desc": "안심하고 투자하십시오. 모든 파트너십 계약은 영국에 공식 등록된 금융 법인을 통해 엄격한 법적 규정에 따라 체결됩니다."
      },
      {
        "title": "매월 즉시 지급되는 배당금",
        "desc": "SafiPay 디지털 뱅킹 인프라를 통해 원하시는 통화로 매월 배당금을 지체 없이 즉시 입금받으실 수 있습니다."
      }
    ],
    "liveRoundsTitle": "현재 진행 중인 펀딩 라운드",
    "liveRoundsSubtitle": "출자 가능한 강좌 지분 및 로열티 권리",
    "highYieldBadge": "높은 기대 수익률",
    "targetRaiseLabel": "목표 펀딩액",
    "minInvestmentLabel": "최소 출자액",
    "expectedReturnLabel": "예상 연간 수익률",
    "fundedLabel": "달성률",
    "partnersCount": "명의 파트너",
    "requestDetailsBtn": "상세 제안서 요청",
    "opportunities": [
      {
        "title": "글로벌 이커머스 마스터클래스",
        "category": "이커머스",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "연 18% - 24%",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "풀스택 AI & Next.js 실전 부트캠프",
        "category": "테크놀로지",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "연 20% - 28%",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "기관급 트레이딩 & SMC 분석 전략",
        "category": "금융 시장",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "연 25% - 35%",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Safi Academy의",
    "ctaTitleHighlight": "전략적 파트너가 될 준비가 되셨습니까?",
    "ctaSubtitle": "투자자 관계(IR) 전담팀이 향후 출시 강좌에 대한 상세 투자 설명서, 재무 추정치 및 법률 계약 문서를 안내해 드립니다.",
    "ctaBullet1": "표준 비밀유지계약서(NDA) 및 상세 투자 제안서 제공",
    "ctaBullet2": "투자자 전용 대시보드를 통한 실시간 투명한 재무 데이터 열람",
    "ctaBullet3": "기관 전담 어카운트 매니저의 일대일 맞춤 지원",
    "ctaButton": "투자팀에 문의하기"
  },
  "nl": {
    "isRtl": false,
    "badge": "Exclusieve Investeringskans",
    "title": "Mede-eigenaar van de toekomst van",
    "titleHighlight": "Toonaangevend Wereldwijd Onderwijs",
    "subtitle": "Word een strategische partner van Safi Academy. Koop aandelen in onze topcursussen en geniet van levenslange passieve inkomsten uit een snelgroeiend internationaal studentenbestand.",
    "benefits": [
      {
        "title": "Passieve Omzetverdeling",
        "desc": "Verdien een vast percentage op elk inschrijfgeld. Uw dividend groeit automatisch mee naarmate cursussen meer studenten trekken."
      },
      {
        "title": "Veilig & Juridisch Gereguleerd",
        "desc": "Investeer met vertrouwen. Alle partnerschapsovereenkomsten vallen onder onze in het VK geregistreerde officiële entiteit."
      },
      {
        "title": "Directe Maandelijkse Uitbetaling",
        "desc": "Ontvang uw maandelijkse dividenden rechtstreeks via de digitale bankinfrastructuur van SafiPay in de valuta van uw voorkeur."
      }
    ],
    "liveRoundsTitle": "Lopende Financieringsrondes",
    "liveRoundsSubtitle": "Beschikbare Cursusaandelen & Royalty-mogelijkheden",
    "highYieldBadge": "Hoog Rendementspotentieel",
    "targetRaiseLabel": "Doelbedrag",
    "minInvestmentLabel": "Minimale Investering",
    "expectedReturnLabel": "Verwacht Rendement",
    "fundedLabel": "Gefinancierd",
    "partnersCount": "Partners",
    "requestDetailsBtn": "Informatie Aanvragen",
    "opportunities": [
      {
        "title": "Masterclass Wereldwijde E-Commerce",
        "category": "E-Commerce",
        "targetRaise": "$50.000",
        "minInvestment": "$5.000",
        "expectedROI": "18% - 24% op jaarbasis",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI & Next.js Bootcamp",
        "category": "Technologie",
        "targetRaise": "$80.000",
        "minInvestment": "$10.000",
        "expectedROI": "20% - 28% op jaarbasis",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutionele Handel & SMC-Strategieën",
        "category": "Financiële Markten",
        "targetRaise": "$100.000",
        "minInvestment": "$15.000",
        "expectedROI": "25% - 35% op jaarbasis",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Klaar om een",
    "ctaTitleHighlight": "Strategische Partner te Worden?",
    "ctaSubtitle": "Ons investor relations-team staat klaar om u te voorzien van gedetailleerde prospectussen, financiële prognoses en juridische voorwaarden.",
    "ctaBullet1": "Standaard geheimhoudingsovereenkomst (NDA) en investeringsprospectus",
    "ctaBullet2": "Volledige realtime transparantie via ons beleggersportaal",
    "ctaBullet3": "Vaste institutionele relatiebeheerder",
    "ctaButton": "Contact Opnemen met Investeringsteam"
  },
  "uz": {
    "isRtl": false,
    "badge": "Eksklyuziv investitsiya imkoniyati",
    "title": "Kelajakning hammuallifi bo'ling",
    "titleHighlight": "Yuqori darajadagi global ta'limda",
    "subtitle": "Safi Academy ning strategik hamkoriga aylaning. Bizning eng talabgir kurslarimizdan ulushlar sotib oling va butun dunyoda kengayib borayotgan talabalar tarmog'idan umrbod passiv daromad oling.",
    "benefits": [
      {
        "title": "Doimiy passiv daromad ulushi",
        "desc": "Har bir talabaning to'lovidan belgilangan foizda daromad oling. Kurs ommalashgani sari sizning daromadingiz mutanosib ravishda oshadi."
      },
      {
        "title": "Xavfsiz va qonuniy kafolatlangan",
        "desc": "Ishonch bilan sarmoya kiriting. Barcha hamkorlik shartnomalari Buyuk Britaniyada ro'yxatdan o'tgan rasmiy yuridik shaxsimiz tomonidan kafolatlanadi."
      },
      {
        "title": "Tezkor oylik to'lovlar",
        "desc": "Oylik dividendlaringizni SafiPay raqamli bank infratuzilmasi orqali o'zingizga qulay valyutada to'g'ridan-to'g'ri qabul qiling."
      }
    ],
    "liveRoundsTitle": "Faol investitsiya raundlari",
    "liveRoundsSubtitle": "Kurslar ulushi va royalti olish imkoniyatlari",
    "highYieldBadge": "Yuqori daromad salohiyati",
    "targetRaiseLabel": "Maqsadli mablag'",
    "minInvestmentLabel": "Minimal investitsiya",
    "expectedReturnLabel": "Kutilayotgan yillik daromad",
    "fundedLabel": "Yig'ildi",
    "partnersCount": "ta investor",
    "requestDetailsBtn": "Tafsilotlarni so'rash",
    "opportunities": [
      {
        "title": "Global elektron tijorat master-klassi",
        "category": "Elektron tijorat",
        "targetRaise": "$50,000",
        "minInvestment": "$5,000",
        "expectedROI": "Yillik 18% - 24%",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Full-Stack AI va Next.js intensiv kursi",
        "category": "Texnologiya",
        "targetRaise": "$80,000",
        "minInvestment": "$10,000",
        "expectedROI": "Yillik 20% - 28%",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Institutsional treyding va SMC tahlili",
        "category": "Moliya bozorlari",
        "targetRaise": "$100,000",
        "minInvestment": "$15,000",
        "expectedROI": "Yillik 25% - 35%",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Siz ham",
    "ctaTitleHighlight": "Strategik hamkor bo'lishga tayyormisiz?",
    "ctaSubtitle": "Investitsiyalar bo'yicha mas'ul jamoamiz bo'lajak kurslar bo'yicha batafsil biznes-reja, moliyaviy hisob-kitoblar va qonuniy shartnomalarni taqdim etishga tayyor.",
    "ctaBullet1": "Maxfiylik to'g'risidagi shartnoma (NDA) va rasmiy investitsiya prospekti",
    "ctaBullet2": "Investorlar portali orqali real vaqtda to'liq shaffoflik",
    "ctaBullet3": "Har bir investorga biriktirilgan shaxsiy menejer xizmati",
    "ctaButton": "Investitsiya jamoasi bilan bog'lanish"
  },
  "id": {
    "isRtl": false,
    "badge": "Peluang Investasi Eksklusif",
    "title": "Miliki Bersama Masa Depan",
    "titleHighlight": "Pendidikan Global Unggulan",
    "subtitle": "Jadilah mitra strategis di Safi Academy. Beli kepemilikan saham di kursus-kursus unggulan kami dan dapatkan penghasilan pasif seumur hidup dari pertumbuhan basis siswa di seluruh dunia.",
    "benefits": [
      {
        "title": "Bagi Hasil Pendapatan Pasif",
        "desc": "Dapatkan persentase tetap dari setiap biaya pendaftaran kursus. Dividen Anda bertumbuh seiring bertambahnya siswa global."
      },
      {
        "title": "Aman & Terikat Regulasi Hukum",
        "desc": "Berinvestasi dengan penuh percaya diri. Semua perjanjian kemitraan didukung oleh entitas resmi kami yang terdaftar di Inggris (UK)."
      },
      {
        "title": "Pencairan Dividen Bulanan Cepat",
        "desc": "Terima dividen bulanan Anda secara langsung dan instan melalui infrastruktur perbankan digital SafiPay dalam mata uang pilihan Anda."
      }
    ],
    "liveRoundsTitle": "Putaran Pendanaan yang Sedang Berjalan",
    "liveRoundsSubtitle": "Peluang Kepemilikan Saham Kursus & Royalti yang Tersedia",
    "highYieldBadge": "Potensi Imbal Hasil Tinggi",
    "targetRaiseLabel": "Target Pendanaan",
    "minInvestmentLabel": "Investasi Minimum",
    "expectedReturnLabel": "Perkiraan Imbal Hasil",
    "fundedLabel": "Tercapai",
    "partnersCount": "Mitra",
    "requestDetailsBtn": "Minta Rincian Proposal",
    "opportunities": [
      {
        "title": "Masterclass E-Commerce Global",
        "category": "E-Commerce",
        "targetRaise": "$50.000",
        "minInvestment": "$5.000",
        "expectedROI": "18% - 24% per tahun",
        "progress": 65,
        "investors": 4
      },
      {
        "title": "Bootcamp AI Full-Stack & Next.js",
        "category": "Teknologi",
        "targetRaise": "$80.000",
        "minInvestment": "$10.000",
        "expectedROI": "20% - 28% per tahun",
        "progress": 30,
        "investors": 2
      },
      {
        "title": "Trading Institusional & Analisis SMC",
        "category": "Pasar Keuangan",
        "targetRaise": "$100.000",
        "minInvestment": "$15.000",
        "expectedROI": "25% - 35% per tahun",
        "progress": 85,
        "investors": 7
      }
    ],
    "ctaTitle": "Siap untuk Menjadi",
    "ctaTitleHighlight": "Mitra Strategis?",
    "ctaSubtitle": "Tim hubungan investor kami siap memberi Anda prospektus terperinci, proyeksi keuangan, dan kerangka hukum legal untuk kursus kami mendatang.",
    "ctaBullet1": "Disediakan NDA standar kerahasiaan dan prospektus investasi resmi",
    "ctaBullet2": "Transparansi penuh secara real-time melalui portal khusus investor",
    "ctaBullet3": "Manajer akun institusional khusus yang siap melayani Anda",
    "ctaButton": "Hubungi Tim Investasi"
  }
};

export function getCoursePartnershipTranslation(locale: string): CoursePartnershipTranslation {
  return coursePartnershipTranslations[locale] || coursePartnershipTranslations.en;
}
