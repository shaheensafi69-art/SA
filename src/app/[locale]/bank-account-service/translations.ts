// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES BANK ACCOUNT SERVICE TRANSLATIONS (100% NATIVE)
// ============================================================================

export interface BankPartnerItem {
  name: string;
  domain: string;
  accent: string;
  badge: string;
  description: string;
  details: string[];
}

export interface BankFaqItem {
  q: string;
  a: string;
}

export interface BankFeatureItem {
  num: string;
  title: string;
  desc: string;
}

export interface BankAccountServiceTranslation {
  isRtl: boolean;
  archBadge?: string;
  archTitle?: string;
  archSubtitle?: string;
  features?: BankFeatureItem[];
  verifiedCapabilitiesLabel?: string;
  termsDisclaimer?: string;
  applyForPartner?: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  startApplication: string;
  exploreProviders: string;
  settlementCurrencies: string;
  cardTitle: string;
  cardSubtitle: string;
  cardHolderLabel: string;
  cardHolderName: string;
  expiryLabel: string;
  personalTab: string;
  businessTab: string;
  providersBadge: string;
  providersTitle: string;
  providersSub: string;
  selectProviderLabel: string;
  coreCapabilities: string;
  visitPortalBtn: string;
  applicationBadge: string;
  applicationTitle: string;
  applicationSub: string;
  accountTypeLabel: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  countryLabel: string;
  countryPlaceholder: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  companyRegLabel: string;
  companyRegPlaceholder: string;
  submittingBtn: string;
  submitBtn: string;
  successTitle: string;
  successDesc: string;
  errorDesc: string;
  faqsBadge: string;
  faqsTitle: string;
  partners: BankPartnerItem[];
  faqs: BankFaqItem[];
}

export const bankAccountServiceTranslations: Record<string, BankAccountServiceTranslation> = {
  "en": {
    "isRtl": false,
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
    "badge": "Global Banking Infrastructure",
    "heroTitle": "Banking without borders.",
    "heroSubtitle": "A premium international-account experience designed for people and businesses operating across currencies, countries and digital markets.",
    "startApplication": "Start Application",
    "exploreProviders": "Explore Providers",
    "settlementCurrencies": "Settlement Currencies:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Multi-Currency Commercial IBAN",
    "cardHolderLabel": "CARDHOLDER",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "EXPIRY",
    "personalTab": "Personal Account",
    "businessTab": "Business (Corporate)",
    "providersBadge": "Verified Global Gateways",
    "providersTitle": "Selected International Banking & EMI Rails",
    "providersSub": "Compare institutional-grade features across premier cross-border electronic money institutions.",
    "selectProviderLabel": "Select Provider:",
    "coreCapabilities": "Core Capabilities & Compliant Rails",
    "visitPortalBtn": "Visit Official Platform",
    "applicationBadge": "Advisory & Onboarding",
    "applicationTitle": "Request Dedicated Advisory Onboarding",
    "applicationSub": "Submit your profile to verify jurisdictional availability, corporate rails, and compliance pre-screening.",
    "accountTypeLabel": "Account Classification",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Alexander",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Vance",
    "emailLabel": "Corporate / Personal Email",
    "emailPlaceholder": "alex@enterprise.com",
    "phoneLabel": "Phone (with country code)",
    "phonePlaceholder": "+1 (555) 019-2834",
    "countryLabel": "Country of Residence / Incorporation",
    "countryPlaceholder": "e.g. United Kingdom, Germany, UAE",
    "companyNameLabel": "Registered Corporate Name",
    "companyNamePlaceholder": "e.g. Vanguard Logistics LLC",
    "companyRegLabel": "Company Registration Number / Tax ID",
    "companyRegPlaceholder": "e.g. 12345678 or EIN/VAT",
    "submittingBtn": "Transmitting Dossier...",
    "submitBtn": "Submit Onboarding Dossier",
    "successTitle": "Dossier Received Successfully",
    "successDesc": "Your banking inquiry has been recorded. Our corporate advisory desk will review your details against compliance requirements within 1 business day.",
    "errorDesc": "An error occurred while transmitting your request. Please verify your connection or contact direct support.",
    "faqsBadge": "Due Diligence",
    "faqsTitle": "Compliance, Licensing & Account Structure",
    "features": [
      {
        "num": "01",
        "title": "Multi-Currency Vault",
        "desc": "Hold and convert major international currencies with real mid-market rates across 40+ countries without hidden fees."
      },
      {
        "num": "02",
        "title": "Dedicated IBAN Rails",
        "desc": "Receive dedicated local bank credentials in Europe (SEPA), United Kingdom (Faster Payments), and the US (ACH)."
      },
      {
        "num": "03",
        "title": "Corporate & Virtual Cards",
        "desc": "Issue virtual cards instantly for SaaS tools, cloud servers, and international advertising campaigns."
      },
      {
        "num": "04",
        "title": "Strict Regulatory Safeguard",
        "desc": "Customer funds are safeguarded in segregated accounts under UK FCA and European Central Bank regulations."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Personal & Business",
        "description": "Global market leader in multi-currency accounts with real mid-market exchange rates, local receiving account numbers in 9+ currencies, and transparent low transaction fees.",
        "details": [
          "Direct local bank account numbers (EUR IBAN, USD Routing/Account, GBP Sort Code)",
          "Supports payments to and from 160+ countries worldwide",
          "Automated batch payouts for international payroll and contractors",
          "Physical and digital debit cards for global expense management"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "B2B & Freelance Hub",
        "description": "Tailored for digital entrepreneurs, global marketplaces, cross-border e-commerce sellers, and freelancers receiving payments from platforms like Amazon, Upwork, and international clients.",
        "details": [
          "Direct settlement from major global marketplaces (Amazon, eBay, Upwork, Fiverr)",
          "Receiving accounts in USD, EUR, GBP, CAD, JPY, and AUD",
          "Fast supplier and subcontractor payments in local currencies",
          "Working capital and trade financing solutions for growing businesses"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Innovative hybrid financial platform seamlessly bridging traditional fiat currencies and digital assets with instant swaps, crypto-backed cards, and high-yield rewards.",
        "details": [
          "Instant exchange between 50+ cryptocurrencies and major traditional fiat currencies",
          "Next-generation debit card with up to 8% Cryptoback rewards on purchases",
          "Zero exchange fees on foreign transactions and competitive OTC exchange rates",
          "Regulated custody and cold-storage security partnerships"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Enterprise Trade",
        "description": "Enterprise-grade cross-border payment platform under Ant Group, engineered for high-volume import/export companies, Asian supply chains, and complex FX risk management.",
        "details": [
          "Optimized for high-volume global trade payments and wholesale transactions",
          "Deep integration with Chinese and Asian manufacturer supply chains (1688, Alibaba)",
          "Competitive FX spreads with tailored corporate forward contracts",
          "Institutional account management and multi-user corporate hierarchy"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "These accounts are provided by licensed Electronic Money Institutions (EMIs) and authorized payment providers rather than traditional brick-and-mortar banks. They provide dedicated IBANs, sort codes, and routing numbers that function identically for wire transfers, direct debits, and global commerce while keeping funds protected in segregated client asset vaults."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "Different entrepreneurs have different international operating footprints. Wise is ideal for everyday multi-currency transfers, Payoneer excels at marketplace and freelance payouts, Wirex bridges digital assets with fiat, and WorldFirst is built for enterprise import/export supply chains."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Yes. Upon successful identity verification and onboarding compliance approval, each provider issues dedicated receiving account credentials (such as a European SEPA IBAN or US ACH Routing number) in your personal or corporate legal name."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "For individual accounts: a valid international passport or government national ID along with proof of address (utility bill or bank statement issued within the last 90 days). For corporate accounts: Certificate of Incorporation, Articles of Association, register of directors/shareholders, and proof of operating business activity."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Safi Academy provides structural guidance, pre-screening document reviews, and direct institutional links to official compliance desks to help members establish reliable international banking rails without unnecessary rejections."
      }
    ]
  },
  "fa": {
    "isRtl": true,
    "archBadge": "۰۱ / معماری زیرساخت مالی",
    "archTitle": "یک رابط مالی مهندسی‌شده با استانداردهای مدرن بین‌المللی.",
    "archSubtitle": "بررسی دقیق خدمات هر شبکه بانکی و آماده‌سازی پرونده هویتی با حداکثر دقت برای افتتاح حساب بین‌المللی.",
    "verifiedCapabilitiesLabel": "قابلیت‌ها و شبکه‌های بانکی تاییدشده:",
    "termsDisclaimer": "شرایط نهایی، دسترسی منطقه‌ای و مدارک لازم در مرحله بررسی انطباق و مشاوره اختصاصی نهایی خواهد شد.",
    "applyForPartner": "درخواست افتتاح حساب در",
    "badge": "زیرساخت بانکداری بین‌المللی",
    "heroTitle": "بانکداری فرامرزی، بدون مرز و محدودیت.",
    "heroSubtitle": "تجربه‌ای برتر در دریافت حساب‌های معتبر بین‌المللی برای افراد و کسب‌وکارهایی که با ارزهای مختلف، کشورهای متعدد و بازارهای دیجیتال جهانی فعالیت می‌کنند.",
    "startApplication": "شروع ثبت پرونده",
    "exploreProviders": "مشاهده ارائه‌دهندگان بانکی",
    "settlementCurrencies": "ارزهای تحت پوشش تسویه:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "شماره شبا تجاری چندارزی (Commercial IBAN)",
    "cardHolderLabel": "دارنده حساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ انقضا",
    "personalTab": "حساب شخصی",
    "businessTab": "حساب شرکتی (حقوقی)",
    "providersBadge": "درگاه‌های معتبر جهانی",
    "providersTitle": "برترین موسسات مالی الکترونیکی و شبکه‌های بانکی بین‌المللی",
    "providersSub": "مقایسه قابلیت‌های تخصصی و رتبه‌بندی موسسات دارای مجوز رسمی پول الکترونیکی (EMI) در سطح جهان.",
    "selectProviderLabel": "انتخاب موسسه مالی:",
    "coreCapabilities": "قابلیت‌های اصلی و شبکه‌های تسویه مجاز",
    "visitPortalBtn": "ورود به پلتفرم رسمی",
    "applicationBadge": "مشاوره و بررسی پرونده",
    "applicationTitle": "درخواست بررسی و مشاوره افتتاح حساب بین‌المللی",
    "applicationSub": "اطلاعات هویتی و کاری خود را ارسال نمایید تا وضعیت دسترسی جغرافیایی، مدارک شرکتی و انطباق اولیه بررسی شود.",
    "accountTypeLabel": "نوع حساب مورد نیاز",
    "firstNameLabel": "نام",
    "firstNamePlaceholder": "مثال: علی",
    "lastNameLabel": "نام خانوادگی",
    "lastNamePlaceholder": "مثال: رضایی",
    "emailLabel": "ایمیل کاری یا شخصی",
    "emailPlaceholder": "ali@example.com",
    "phoneLabel": "شماره تماس (همراه با کد کشور)",
    "phonePlaceholder": "+93 70 123 4567",
    "countryLabel": "کشور محل اقامت یا ثبت شرکت",
    "countryPlaceholder": "مثال: آلمان، انگلستان، ترکیه، امارات",
    "companyNameLabel": "نام رسمی شرکت (برای حساب‌های تجاری)",
    "companyNamePlaceholder": "مثال: Safi Trading LLC",
    "companyRegLabel": "شماره ثبت شرکت یا شناسه مالیاتی",
    "companyRegPlaceholder": "مثال: 12345678 یا کد مالیاتی",
    "submittingBtn": "در حال ارسال پرونده...",
    "submitBtn": "ارسال پرونده جهت بررسی",
    "successTitle": "پرونده شما با موفقیت ثبت شد",
    "successDesc": "اطلاعات شما با موفقیت در سیستم ثبت گردید. کارشناسان ما مدارک شما را ظرف ۱ روز کاری با استانداردهای قانونی انطباق بررسی خواهند کرد.",
    "errorDesc": "خطایی در ثبت اطلاعات رخ داده است. لطفاً اتصال اینترنت خود را بررسی کرده یا مجدداً تلاش فرمایید.",
    "faqsBadge": "بررسی حقوقی و مدارک",
    "faqsTitle": "انطباق قانونی، مجوزها و ساختار حساب‌های بین‌المللی",
    "features": [
      {
        "num": "۰۱",
        "title": "کیف پول چندارزی امن",
        "desc": "نگهداری و تبدیل ارزهای مطرح جهان با نرخ واقعی بازار و پشتیبانی از بیش از ۴۰ کشور دنیا بدون هزینه‌های مخفی."
      },
      {
        "num": "۰۲",
        "title": "شماره حساب و شبا اختصاصی (IBAN)",
        "desc": "دریافت اطلاعات حساب محلی اختصاصی در اروپا (SEPA)، بریتانیا (Faster Payments) و آمریکا (ACH) به نام شخص یا شرکت."
      },
      {
        "num": "۰۳",
        "title": "کارت‌های اعتباری فیزیکی و مجازی",
        "desc": "صدور آنی کارت‌های مجازی برای پرداخت هزینه‌های سرور ابری، تبلیغات آنلاین و خرید از فروشگاه‌های سراسر جهان."
      },
      {
        "num": "۰۴",
        "title": "امنیت و تضمین سپرده‌های مشتریان",
        "desc": "حفاظت صددرصدی از دارایی‌های کاربران در حساب‌های تفکیک‌شده تحت نظارت مرجع رفتار مالی بریتانیا (FCA) و بانک مرکزی اروپا."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "حساب شخصی و تجاری",
        "description": "پیشگام جهانی حساب‌های چندارزی با کارمزد شفاف و بسیار پایین، ارائه شماره حساب‌های محلی اختصاصی در ۹+ ارز مختلف و تبدیل بر پایه نرخ واقعی بازار.",
        "details": [
          "ارائه شماره حساب محلی مستقیم (IBAN اروپا، Routing آمریکا، Sort Code بریتانیا)",
          "امکان ارسال و دریافت حواله با بیش از ۱۶۰ کشور دنیا",
          "سیستم پرداخت دسته‌جمعی حقوق و تسویه‌حساب با فریلنسرها",
          "صدور کارت‌های فیزیکی و دیجیتال برای مدیریت هزینه‌های فرامرزی"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "مرکز فریلنسرها و تجارت B2B",
        "description": "بهترین راهکار برای کارآفرینان دیجیتال، فروشندگان آمازون و بازارهای آنلاین، و فریلنسرهایی که از پلتفرم‌های بین‌المللی نظیر Upwork و Fiverr درآمد کسب می‌کنند.",
        "details": [
          "اتصال مستقیم و دریافت درآمد از آمازون، eBay، Upwork و Fiverr",
          "حساب‌های دریافت بانکی در ارزهای دلار، یورو، پوند، ین، دلار کانادا و استرالیا",
          "پرداخت سریع به تامین‌کنندگان خارجی با ارزهای بومی",
          "تسهیلات سرمایه در گردش برای فروشندگان در حال رشد بازارهای دیجیتال"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "ترکیب رمزارز و ارز سنتی",
        "description": "پلتفرم مالی هیبریدی مدرن که ارزهای فیات و دارایی‌های دیجیتال را بدون واسطه به یکدیگر پیوند می‌دهد؛ همراه با تبادل آنی و کارت‌های متصل به کریپتو.",
        "details": [
          "تبدیل آنی بین بیش از ۵۰ نوع ارز دیجیتال و ارزهای فیات رایج",
          "کارت نقدی با بازگشت نقدی (Cryptoback) تا سقف ۸ درصد در خریدها",
          "صفر درصد کارمزد تبدیل در تراکنش‌های خارجی و نرخ‌های رقابتی OTC",
          "امنیت بالا و ذخیره‌سازی سرد دارایی‌ها مطابق موازین قانونی بین‌المللی"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "تجارت عمده سازمانی",
        "description": "پلتفرم پرداخت بین‌المللی زیرمجموعه Ant Group، مهندسی‌شده برای شرکت‌های بزرگ واردات/صادرات، تسویه با زنجیره تامین آسیایی و مدیریت ریسک نوسانات ارزی.",
        "details": [
          "بهینه‌سازی‌شده برای حجم بالای حواله‌های ارزی و تسویه‌حساب‌های تجاری بین‌المللی",
          "یکپارچگی عمیق با کارخانجات چین و بازارهای عمده‌فروشی (1688 و Alibaba)",
          "اسپردهای ارزی بسیار رقابتی همراه با قراردادهای فوروارد برای مهار نوسانات",
          "پشتیبانی سازمانی با دسترسی‌های چندکاربره برای تیم‌های مالی شرکت‌ها"
        ]
      }
    ],
    "faqs": [
      {
        "q": "آیا این حساب‌ها مانند حساب‌های سنتی بانک‌های سنتی هستند؟",
        "a": "این حساب‌ها توسط موسسات رسمی پول الکترونیکی (EMI) و ارائه‌دهندگان دارای مجوز بانکی صادر می‌شوند. این موسسات شماره شبا (IBAN) و کدهای بانکی کاملاً اختصاصی به نام شما صادر می‌کنند که برای دریافت و ارسال حواله سوییفت، سپا (SEPA) و ACH دقیقاً کارکرد یکسانی با بانک‌های سنتی دارند، با این تفاوت که دارایی‌ها در حساب‌های محافظت‌شده نگهداری می‌شوند."
      },
      {
        "q": "چرا آکادمی صافی چندین ارائه‌دهنده را معرفی می‌کند؟",
        "a": "هر کارآفرین نیازهای متفاوتی دارد. Wise برای انتقال چندارزی روزانه مناسب است، Payoneer برای درآمد بازارهای آنلاین و فریلنسری بهترین است، Wirex میان رمزارز و فیات پل می‌زند، و WorldFirst ویژه شرکت‌های بزرگ صادرات و واردات کالا طراحی شده است."
      },
      {
        "q": "آیا هر متقاضی شماره حساب اختصاصی اروپایی یا آمریکایی دریافت می‌کند؟",
        "a": "بله؛ پس از احراز هویت موفق و انطباق با قوانین بانکی، هر ارائه‌دهنده مشخصات بانکی مستقیم و منحصربه‌فرد (مانند IBAN اروپایی یا شماره روتینگ آمریکا) را دقیقاً به نام شخص یا نام رسمی شرکت شما صادر می‌نماید."
      },
      {
        "q": "چه مدارکی برای تایید هویت و افتتاح حساب مورد نیاز است؟",
        "a": "برای حساب‌های شخصی: پاسپورت بین‌المللی معتبر یا کارت شناسایی دولتی همراه با گواهی نشانی (قبض آب/برق یا صورت‌حساب بانکی صادرشده در ۹۰ روز گذشته). برای حساب‌های شرکتی: گواهی ثبت شرکت، اساسنامه رسمی، مدارک مدیران و سهامداران، و مدارک دال بر فعالیت تجاری."
      },
      {
        "q": "آکادمی صافی چگونه در این فرآیند به متقاضیان کمک می‌کند؟",
        "a": "آکادمی صافی با ارائه راهنمای ساختار اسناد، پیش‌بررسی مدارک هویتی و ایجاد ارتباط با درگاه‌های معتبر بین‌المللی به دانشجویان و کارآفرینان کمک می‌کند تا بدون ریجکت شدن و اتلاف وقت، به زیرساخت بانکی جهانی متصل شوند."
      }
    ]
  },
  "ps": {
    "isRtl": true,
    "archBadge": "۰۱ / مالي جوړښت او زیربنا",
    "archTitle": "یو مالي انٹرفیس چې د نړیوالو معیارونو سره سم جوړ شوی دی.",
    "archSubtitle": "د هر بانکي چینل خدمات وڅیړئ او د نړیوال حساب خلاصولو لپاره خپل اسناد په پوره دقت چمتو کړئ.",
    "verifiedCapabilitiesLabel": "تصدیق شوې وړتیاوې او مالي شبکې:",
    "termsDisclaimer": "وروستي شرایط او د سیمې شتون به د تایید او ځانګړې مشورې په پړاو کې تایید شي.",
    "applyForPartner": "د حساب غوښتنه په",
    "badge": "د نړیوال بانکدارۍ بنسټیزه زیربنا",
    "heroTitle": "بې پولې بانکداري، د هر ډول محدودیت پرته.",
    "heroSubtitle": "د نړیوالو باوري حسابونو ترلاسه کولو غوره تجربه د هغو کسانو او شرکتونو لپاره چې په بېلابېلو اسعارو، هیوادونو او ډیجیټل بازارونو کې کار کوي.",
    "startApplication": "د غوښتنلیک پیل",
    "exploreProviders": "بانکي ادارې وګورئ",
    "settlementCurrencies": "د تصفیې وړ اسعار:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "څو اسعاري سوداګریز شبا (Commercial IBAN)",
    "cardHolderLabel": "د حساب خاوند",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "د پای نیټه",
    "personalTab": "شخصي حساب",
    "businessTab": "شرکتي (سوداګریز) حساب",
    "providersBadge": "باوري نړیوالې درګاوې",
    "providersTitle": "غوره الکترونیکي مالي ادارې او نړیوال بانکي چینلونه",
    "providersSub": "په نړۍ کې د باوري جواز لرونکو ادارو (EMI) تخصصي پرتله او ځانګړتیاوې.",
    "selectProviderLabel": "مالي اداره غوره کړئ:",
    "coreCapabilities": "اصلي وړتیاوې او قانوني شبکې",
    "visitPortalBtn": "رسمي وېبپاڼې ته ننوتل",
    "applicationBadge": "مشوره او د اسنادو ارزونه",
    "applicationTitle": "د نړیوال بانکي حساب د پرانیستلو غوښتنه",
    "applicationSub": "خپل معلومات او اسناد راواستوئ ترڅو ستاسو د سیمې شتون او لومړني معیارونه وڅیړل شي.",
    "accountTypeLabel": "د اړتیا وړ حساب ډول",
    "firstNameLabel": "نوم",
    "firstNamePlaceholder": "مثال: احمد",
    "lastNameLabel": "تخلص",
    "lastNamePlaceholder": "مثال: خان",
    "emailLabel": "کاري یا شخصي بریښنالیک",
    "emailPlaceholder": "ahmad@example.com",
    "phoneLabel": "د تلیفون شمیره (له هیواد کوډ سره)",
    "phonePlaceholder": "+93 70 123 4567",
    "countryLabel": "د اوسیدو یا د شرکت د ثبت هیواد",
    "countryPlaceholder": "مثال: جرمني، بریتانیا، ترکیه، متحده امارات",
    "companyNameLabel": "د شرکت رسمي نوم (د سوداګریزو حسابونو لپاره)",
    "companyNamePlaceholder": "مثال: Safi Trading LLC",
    "companyRegLabel": "د شرکت د ثبت شمیره یا مالیاتي پیژندپاڼه",
    "companyRegPlaceholder": "مثال: 12345678 یا د مالیې کوډ",
    "submittingBtn": "د اسنادو د لیږلو په حال کې...",
    "submitBtn": "د ارزونې لپاره اسناد واستوئ",
    "successTitle": "ستاسو اسناد په بریالیتوب سره ثبت شول",
    "successDesc": "ستاسو معلومات په سیستم کې ثبت شول. زموږ مسلکي ټیم به ستاسو اسناد په ۱ کاري ورځ کې له رسمي قوانینو سره سم وڅیړي.",
    "errorDesc": "د معلوماتو په لیږلو کې تېروتنه وشوه. مهرباني وکړئ انټرنیټ وګورئ یا بیا هڅه وکړئ.",
    "faqsBadge": "حقوقي څیړنه او اسناد",
    "faqsTitle": "قانوني مقررات، جوازونه او د حساب جوړښت",
    "features": [
      {
        "num": "۰۱",
        "title": "خوندي څو اسعاري بټوه",
        "desc": "د نړۍ د مهمو اسعارو ساتل او بدلول په اصلي بازار نرخونو او له ۴۰ څخه زیاتو هیوادونو ملاتړ پرته له پټو لګښتونو."
      },
      {
        "num": "۰۲",
        "title": "ځانګړی حساب او شبا شمیره (IBAN)",
        "desc": "په اروپا (SEPA)، بریتانیا (Faster Payments) او امریکا (ACH) کې د شخص یا شرکت په نوم د ځانګړي سیمه ایز حساب ترلاسه کول."
      },
      {
        "num": "۰۳",
        "title": "فزیکي او مجازی بانکي کارتونه",
        "desc": "د سرور، آنلاین اعلاناتو او په ټوله نړۍ کې د پیرودلو لپاره د فوري مجازی کارتونو صادرول."
      },
      {
        "num": "۰۴",
        "title": "د کاروونکو د شتمنیو لوړ امنیت",
        "desc": "د بریتانیا د مالي ادارې (FCA) او د اروپا د مرکزي بانک د څارنې لاندې په ځانګړو حسابونو کې د شتمنیو بشپړ خوندیتوب."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "شخصي او سوداګریز حساب",
        "description": "د څو اسعاري حسابونو نړیوال مخکښ چې په شفاف کمیسیون، په ۹+ مهمو اسعارو کې د محلي حسابونو چمتو کولو او د بازار په ریښتیني نرخ تبادلې باندې مشهور دی.",
        "details": [
          "مستقیم محلي بانکي حسابونه (د اروپا IBAN، د امریکا Routing، د بریتانیا Sort Code)",
          "له ۱۶۰ څخه زیاتو هیوادونو ته د پیسو لیږل او ترلاسه کول",
          "د کارکوونکو او قراردادیانو د تنخواګانو یوځای ورکړه",
          "د لګښتونو د کنټرول لپاره فزیکي او ډیجیټل ډیبټ کارتونه"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "د فریلانسرانو او B2B مرکز",
        "description": "د ډیجیټل متشبثینو، د امازون پلورونکو او هغو فریلانسرانو لپاره غوره حل چې له نړیوالو پلیټفارمونو لکه Upwork او Fiverr څخه عاید ترلاسه کوي.",
        "details": [
          "له امازون، eBay، Upwork او Fiverr څخه مستقیم عاید ترلاسه کول",
          "په ډالر، یورو، پونډ، ین او اسټرالیایي ډالرو کې حسابونه",
          "بهرنیو عرضه کوونکو ته په سیمه ایزو اسعارو چټکې تادیات",
          "د سوداګرۍ د پراختیا لپاره د مالي تمویل اسانتیاوې"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "د کریپټو او دودیزو اسعارو ترکیب",
        "description": "یو نوښتګر مالي هایبرډ پلیټفارم چې فیات او ډیجیټل شتمنۍ سره یوځای کوي؛ د فوري تبادلې او کریپټو سره وصل کارتونو په مرسته.",
        "details": [
          "د ۵۰ څخه زیاتو کریپټو اسعارو او دودیزو اسعارو ترمنځ فوري تبادله",
          "په هر پیرود کې تر ۸ سلنې پورې د کریپټوبیک (Cryptoback) ګټه",
          "په بهرنیو معاملو کې صفر کارمزد او رقابتي نرخونه",
          "د نړیوالو مالي قوانینو سره سم لوړ امنیت او سړې زېرمې"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "لوی کارپوریټ تجارت",
        "description": "د Ant Group تر چتر لاندې یو پیاوړی نړیوال مالي پلیټفارم، چې د صادراتو او وارداتو د لویو شرکتونو او اسیايي بازارونو لپاره جوړ شوی دی.",
        "details": [
          "د لویو نړیوالو سوداګریزو حوالو او راکړو ورکړو لپاره ځانګړی ډیزاین",
          "د چینايي فابریکو او لویو پلورنځیو (1688 او Alibaba) سره مستقیم اړیکه",
          "د اسعارو په بدلون کې د زیان د مخنیوي لپاره ځانګړي قراردادونه",
          "د شرکتونو د مالي ټیمونو لپاره ګڼ کاروونکي واکونه او پرمختللی کنټرول"
        ]
      }
    ],
    "faqs": [
      {
        "q": "ایا دا حسابونه لکه د دودیزو بانکونو په څیر دي؟",
        "a": "دا حسابونه د جواز لرونکو الکترونیکي پیسو د ادارو (EMI) لخوا صادرېږي. دوی ستاسو په شخصي یا شرکتي نوم ځانګړی شبا (IBAN) او بانکي شمیرې درکوي چې د سوییفت، سیپا (SEPA) او ACH لپاره کټ مټ د عادي بانکونو په څیر کار کوي."
      },
      {
        "q": "ولې صافي اکاډمي څو بېلابېلې ادارې وړاندیز کوي؟",
        "a": "د هر متشبث اړتیاوې توپیر لري. Wise د ورځني څو اسعاري تبادلې لپاره غوره دی، Payoneer د فریلانسرانو او آنلاین پلورنځیو لپاره مناسب دی، Wirex د کریپټو شتمنیو سره مرسته کوي او WorldFirst د صادراتو او وارداتو د لویو شرکتونو لپاره ډیزاین شوی."
      },
      {
        "q": "ایا هر غوښتونکی یو ځانګړی اروپایي یا امریکایی حساب ترلاسه کوي؟",
        "a": "هو؛ د هویت او اسنادو له رسمي تایید وروسته، هره اداره ستاسو یا ستاسو د شرکت په رسمي نوم مستقیم بانکي معلومات (لکه د اروپا IBAN یا د امریکا Routing شمیره) صادروي."
      },
      {
        "q": "د حساب پرانیستلو لپاره کوم اسناد اړین دي؟",
        "a": "د شخصي حسابونو لپاره: معتبر پاسپورټ یا تذکره د استوګنې د ثبوت سره (د تیرو ۹۰ ورځو د برښنا بل یا د بانک بیانیه). د شرکتي حسابونو لپاره: د شرکت د ثبت سند، اساسنامه، او د سوداګریز فعالیت اسناد."
      },
      {
        "q": "صافي اکاډمي په دې بهیر کې له غوښتونکو سره څنګه مرسته کوي؟",
        "a": "صافي اکاډمي د اسنادو د چمتو کولو لارښوونه، د هویت لومړنۍ ارزونه او له باوري نړیوالو ادارو سره مستقیمه اړیکه برابروي ترڅو غوښتونکي پرته له بندیدو او رد کیدو نړیوالو بانکي اسانتیاوو ته ورسیږي."
      }
    ]
  },
  "ar": {
    "isRtl": true,
    "archBadge": "۰۱ / البنية التحتية المالية",
    "archTitle": "واجهة مالية متطورة مصممة وفق أرقى المعايير المصرفية الدولية.",
    "archSubtitle": "تعرف على مسارات الدفع لكل شريك وهيئ ملفك الثبوتي بدقة لفتح حساب مصرفي دولي موثق.",
    "verifiedCapabilitiesLabel": "المسارات والقدرات المصرفية المعتمدة:",
    "termsDisclaimer": "يتم تأكيد الشروط النهائية والأهلية الجغرافية خلال مرحلة التدقيق القانوني والاستشارة المخصصة.",
    "applyForPartner": "طلب فتح حساب في",
    "badge": "البنية التحتية المصرفية العالمية",
    "heroTitle": "خدمات مصرفية بلا حدود جغرافية.",
    "heroSubtitle": "تجربة مصرفية دولية استثنائية مصممة خصيصًا للأفراد والشركات التي تدير أعمالها عبر عملات وأسواق رقمية متعددة حول العالم.",
    "startApplication": "بدء تقديم الطلب",
    "exploreProviders": "استعراض المؤسسات المصرفية",
    "settlementCurrencies": "عملات التسوية المعتمدة:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "رقم آيبان تجاري متعدد العملات (Commercial IBAN)",
    "cardHolderLabel": "صاحب الحساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاريخ الانتهاء",
    "personalTab": "حساب أفراد (شخصي)",
    "businessTab": "حساب شركات (مؤسسي)",
    "providersBadge": "بوابات مصرفية عالمية معتمدة",
    "providersTitle": "نخبة مؤسسات النقود الإلكترونية والقنوات المصرفية الدولية",
    "providersSub": "مقارنة دقيقة للمزايا المؤسسية بين أرقى بوابات الدفع ومؤسسات الأموال الإلكترونية (EMI) المرخصة عالميًا.",
    "selectProviderLabel": "اختر المؤسسة المالية:",
    "coreCapabilities": "القدرات الأساسية والمسارات النظامية المعتمدة",
    "visitPortalBtn": "زيارة المنصة الرسمية",
    "applicationBadge": "الاستشارة والتدقيق المسبق",
    "applicationTitle": "طلب استشارة وتدقيق لفتح حساب مصرفي دولي",
    "applicationSub": "أرسل بياناتك للتحقق من الملاءمة الجغرافية، والمسارات المصرفية المتاحة، والتدقيق المسبق لملف الامتثال.",
    "accountTypeLabel": "نوع الحساب المطلوب",
    "firstNameLabel": "الاسم الأول",
    "firstNamePlaceholder": "مثال: محمد",
    "lastNameLabel": "اسم العائلة",
    "lastNamePlaceholder": "مثال: القحطاني",
    "emailLabel": "البريد الإلكتروني للعمل أو الشخصي",
    "emailPlaceholder": "mohammed@example.com",
    "phoneLabel": "رقم الهاتف (مع رمز الدولة)",
    "phonePlaceholder": "+966 50 123 4567",
    "countryLabel": "بلد الإقامة أو تأسيس الشركة",
    "countryPlaceholder": "مثال: المملكة العربية السعودية، الإمارات، ألمانيا، بريطانيا",
    "companyNameLabel": "الاسم القانوني المسجل للشركة (لحسابات الأعمال)",
    "companyNamePlaceholder": "مثال: Safi Trading LLC",
    "companyRegLabel": "رقم السجل التجاري أو الرقم الضريبي",
    "companyRegPlaceholder": "مثال: 1010123456 أو الرقم الضريبي",
    "submittingBtn": "جاري إرسال الملف...",
    "submitBtn": "إرسال الملف للتدقيق والاعتماد",
    "successTitle": "تم استلام ملفك بنجاح",
    "successDesc": "تم تسجيل بياناتك بنجاح. سيقوم فريق الاستشارات المالية بمراجعة مستنداتك والتأكد من مطابقتها للمعايير النظامية خلال يوم عمل واحد.",
    "errorDesc": "حدث خطأ أثناء إرسال البيانات. يرجى التحقق من اتصال الإنترنت أو المحاولة مرة أخرى.",
    "faqsBadge": "التدقيق والامتثال",
    "faqsTitle": "الامتثال النظامي، التراخيص وهيكلية الحسابات",
    "features": [
      {
        "num": "۰۱",
        "title": "خزينة آمنة متعددة العملات",
        "desc": "احتفاظ وتحويل فوري لأهم العملات العالمية بأسعار الصرف الحقيقية للأسواق وبدعم لأكثر من 40 دولة دون رسوم خفية."
      },
      {
        "num": "۰۲",
        "title": "مسارات آيبان (IBAN) مخصصة",
        "desc": "الحصول على بيانات مصرفية محلية مخصصة في أوروبا (SEPA)، بريطانيا (Faster Payments)، والولايات المتحدة (ACH) باسمك أو باسم شركتك."
      },
      {
        "num": "۰۳",
        "title": "بطاقات دفع فعلية وافتراضية",
        "desc": "إصدار بطاقات دفع افتراضية فورية لإدارة نفقات البرمجيات السحابية، الحملات الإعلانية، والمشتريات الدولية."
      },
      {
        "num": "۰۴",
        "title": "حماية نظامية صارمة للودائع",
        "desc": "حماية أموال العملاء بنسبة 100% في حسابات مفصولة ومؤمنة وفق لوائح هيئة السلوك المالي البريطانية (FCA) والبنك المركزي الأوروبي."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "حساب شخصي وشركات",
        "description": "الرائد العالمي في الحسابات متعددة العملات برسوم شفافة ومنخفضة، وحسابات استقبال محلية مخصصة في أكثر من 9 عملات بأسعار السوق الحقيقية.",
        "details": [
          "أرقام حسابات محلية مباشرة (آيبان أوروبي، كود توجيه أمريكي، وسورت كود بريطاني)",
          "إرسال واستقبال التحويلات من وإلى أكثر من 160 دولة حول العالم",
          "نظام دفع جماعي آلي لرواتب الموظفين والمستقلين الدوليين",
          "بطاقات خصم فعلية ورقمية لإدارة المصروفات والنفقات التشغيلية"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "منصة المدفوعات للمستقلين والتجارة",
        "description": "الحل المثالي لرواد الأعمال الرقميين وبائعي التجارة الإلكترونية عبر أمازون والمستقلين على منصات العمل الحر العالمية مثل Upwork و Fiverr.",
        "details": [
          "استقبال مباشر للأرباح من كبرى المتاجر والمنصات (Amazon, eBay, Upwork, Fiverr)",
          "حسابات تحصيل بنكية بالدولار، اليورو، الجنيه الإسترليني، الين، والدولار الكندي",
          "دفع سريع للموردين والمقاولين بالعملات المحلية للبلدان المختلفة",
          "حلول تمويل رأس المال العامل للمتاجر الإلكترونية المتنامية"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "الربط بين العملات الرقمية والتقليدية",
        "description": "منصة مالية هجينة ومبتكرة تجمع بسلاسة بين العملات النقدية التقليدية والأصول الرقمية مع تحويل فوري وبطاقات مرتبطة بالعملات المشفرة.",
        "details": [
          "تحويل فوري بين أكثر من 50 عملة رقمية وأهم العملات النقدية التقليدية",
          "بطاقات خصم من الجيل الحديث مع مكافآت كاش باك تصل إلى 8% من قيمة المشتريات",
          "صفر رسوم تحويل على المعاملات الخارجية وأسعار صرف تنافسية للغاية",
          "حفظ آمن في محافظ باردة وشراكات أمنية معتمدة وفق اللوائح الدولية"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "التجارة الدولية للشركات الكبرى",
        "description": "منصة مدفوعات دولية مؤسسية تابعة لمجموعة Ant Group، مصممة خصيصًا لشركات الاستيراد والتصدير ذات الأحجام الكبيرة والتسوية مع الموردين الآسيويين.",
        "details": [
          "تحسين متخصص لمدفوعات التجارة الدولية الكبرى والتحويلات بالجملة",
          "تكامل وثيق مع سلاسل التوريد والمصانع في الصين وآسيا (منصات 1688 وAlibaba)",
          "فوارق أسعار صرف تنافسية مع عقود صرف آجلة للتحوط ضد تقلبات العملة",
          "صلاحيات مستخدمين متعددة ومستويات تحكم متطورة للفرق المالية في الشركات"
        ]
      }
    ],
    "faqs": [
      {
        "q": "هل هذه الحسابات مماثلة لحسابات البنوك التقليدية؟",
        "a": "يتم توفير هذه الحسابات من خلال مؤسسات نقود إلكترونية (EMI) مرخصة رسميًا وبوابات مدفوعات معتمدة. تمنحك هذه الحسابات أرقام آيبان (IBAN) وحسابات مصرفية محلية باسمك تتيح إرسال واستقبال الحوالات عبر سويفت وسيبا (SEPA) وACH بنفس آلية البنوك العادية مع حماية تامة لأموالك في حسابات مصرفية معزولة."
      },
      {
        "q": "لماذا تستعرض أكاديمية صافي مزودي خدمات متعددين؟",
        "a": "تختلف متطلبات رواد الأعمال؛ فمنصة Wise ممتازة للحوالات اليومية متعددة العملات، وPayoneer تتفوق في سحب أرباح العمل الحر والمتاجر، بينما تربط Wirex الأصول المشفرة بالنقد، وتعتبر WorldFirst الخيار الأفضل لشركات الاستيراد والتصدير الكبرى."
      },
      {
        "q": "هل يحصل كل مقدم طلب على بيانات استقبال أوروبية أو أمريكية مخصصة؟",
        "a": "نعم؛ بمجرد التحقق من الهوية واستكمال متطلبات الامتثال المصرفي، تصدر المؤسسة بيانات حساب استقبال مصرفي مخصصة (مثل رقم آيبان أوروبي أو كود توجيه أمريكي) صادرة رسميًا باسمك الشخصي أو باسم شركتك."
      },
      {
        "q": "ما هي الوثائق المطلوبة للتحقق وفتح الحساب؟",
        "a": "للحسابات الشخصية: جواز سفر ساري المفعول أو بطاقة هوية وطنية مع إثبات عنوان إقامة (فاتورة خدمات أو كشف حساب بنكي صادر خلال آخر 90 يومًا). لحسابات الشركات: شهادة تأسيس الشركة، عقد التأسيس، سجل المديرين والمساهمين، وإثبات طبيعة النشاط التجاري."
      },
      {
        "q": "كيف تساعد أكاديمية صافي المتقدمين في إجراءات التسجيل؟",
        "a": "توفر الأكاديمية إرشادات شاملة، وتدقيقًا مسبقًا للوثائق، وتوجيهًا مباشرًا إلى القنوات المصرفية المعتمدة لمساعدة الطلاب ورواد الأعمال في الحصول على حساباتهم دون مواجهة الرفض أو التأخير."
      }
    ]
  },
  "ur": {
    "isRtl": true,
    "archBadge": "۰۱ / مالیاتی فریم ورک اور بنیادی ڈھانچہ",
    "archTitle": "بین الاقوامی معیار کے مطابق ڈیزائن کیا گیا جدید مالیاتی انٹرفیس۔",
    "archSubtitle": "ہر بینکنگ چینل کی خصوصیات کو سمجھیں اور عالمی اکاؤنٹ کھولنے کے لیے اپنی دستاویزات درستگی کے ساتھ تیار کریں۔",
    "verifiedCapabilitiesLabel": "تصدیق شدہ مالیاتی صلاحیتیں اور پیمنٹ چینلز:",
    "termsDisclaimer": "حتمی شرائط، جغرافیائی دستیابی اور ضروری دستاویزات کی تصدیق ذاتی مشاورتی مرحلے میں کی جائے گی۔",
    "applyForPartner": "اکاؤنٹ کی درخواست برائے",
    "badge": "عالمی بینکنگ انفراسٹرکچر",
    "heroTitle": "بے سرحد بینکنگ، بغیر کسی رکاوٹ کے۔",
    "heroSubtitle": "ان افراد اور کمپنیوں کے لیے ایک شاندار بین الاقوامی بینک اکاؤنٹ کا تجربہ جو کثیر کرنسیاں، مختلف ممالک اور عالمی ڈیجیٹل مارکیٹوں میں کام کرتے ہیں۔",
    "startApplication": "درخواست کا آغاز کریں",
    "exploreProviders": "بینکنگ ادارے دیکھیں",
    "settlementCurrencies": "سیٹلمنٹ کی معاون کرنسیاں:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "کثیر کرنسی کمرشل آئیبان (Commercial IBAN)",
    "cardHolderLabel": "اکاؤنٹ ہولڈر",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ تنسیخ",
    "personalTab": "ذاتی اکاؤنٹ",
    "businessTab": "کارپوریٹ (کاروباری) اکاؤنٹ",
    "providersBadge": "تصدیق شدہ عالمی گیٹ ویز",
    "providersTitle": "منتخب بین الاقوامی الیکٹرانک مالیاتی ادارے اور بینکنگ چینلز",
    "providersSub": "دنیا بھر کے لائسنس یافتہ الیکٹرانک منی اداروں (EMI) کی کارپوریٹ خصوصیات کا تقابلی جائزہ۔",
    "selectProviderLabel": "ادارہ منتخب کریں:",
    "coreCapabilities": "بنیادی صلاحیتیں اور قانونی ریگولیٹری چینلز",
    "visitPortalBtn": "سرکاری پورٹل پر جائیں",
    "applicationBadge": "مشاورت اور دستاویزات کی جانچ",
    "applicationTitle": "بین الاقوامی بینک اکاؤنٹ کھولنے کی مشاورتی درخواست",
    "applicationSub": "اپنی تفصیلات جمع کروائیں تاکہ جغرافیائی دستیابی، کارپوریٹ چینلز اور قانونی تقاضوں کی پیشگی جانچ کی جا سکے۔",
    "accountTypeLabel": "مطلوبہ اکاؤنٹ کی قسم",
    "firstNameLabel": "پہلا نام",
    "firstNamePlaceholder": "مثال: علی",
    "lastNameLabel": "آخری نام",
    "lastNamePlaceholder": "مثال: خان",
    "emailLabel": "کاروباری یا ذاتی ای میل",
    "emailPlaceholder": "ali@example.com",
    "phoneLabel": "فون نمبر (ملکی کوڈ کے ساتھ)",
    "phonePlaceholder": "+92 300 1234567",
    "countryLabel": "رہائش یا کمپنی رجسٹریشن کا ملک",
    "countryPlaceholder": "مثال: برطانیہ، جرمنی، متحدہ عرب امارات، کینیڈا",
    "companyNameLabel": "رجسٹرڈ کمپنی کا نام (کاروباری اکاؤنٹس کے لیے)",
    "companyNamePlaceholder": "مثال: Safi Trading LLC",
    "companyRegLabel": "کمپنی رجسٹریشن نمبر یا ٹیکس شناختی نمبر",
    "companyRegPlaceholder": "مثال: 12345678 یا NTN",
    "submittingBtn": "دستاویزات بھیجی جا رہی ہیں...",
    "submitBtn": "جانچ کے لیے درخواست جمع کروائیں",
    "successTitle": "آپ کی تفصیلات کامیابی کے ساتھ موصول ہوئیں",
    "successDesc": "آپ کا ریکارڈ درج کر لیا گیا ہے۔ ہمارا مشاورتی عملہ ایک دفتری دن کے اندر قانونی تقاضوں کے مطابق آپ کی تفصیلات کا جائزہ لے گا۔",
    "errorDesc": "درخواست بھیجنے میں خرابی پیش آئی۔ براہ کرم انٹرنیٹ کنکشن چیک کریں یا دوبارہ کوشش کریں۔",
    "faqsBadge": "قانونی چھان بین اور تعمیل",
    "faqsTitle": "ریگولیٹری تعمیل، لائسنسنگ اور اکاؤنٹ کا ڈھانچہ",
    "features": [
      {
        "num": "۰۱",
        "title": "محفوظ کثیر کرنسی والٹ",
        "desc": "دنیا کی بڑی کرنسیاں مارکیٹ کے حقیقی ریٹس پر محفوظ رکھیں اور بغیر کسی پوشیدہ فیس کے 40 سے زائد ممالک میں تبادلہ کریں۔"
      },
      {
        "num": "۰۲",
        "title": "مخصوص آئیبان (IBAN) چینلز",
        "desc": "یورپ (SEPA)، برطانیہ (Faster Payments) اور امریکہ (ACH) میں اپنے یا اپنی کمپنی کے نام پر خصوصی مقامی بینک اکاؤنٹ حاصل کریں۔"
      },
      {
        "num": "۰۳",
        "title": "کارپوریٹ اور ورچوئل کارڈز",
        "desc": "کلاؤڈ سرورز، سافٹ ویئر سبسکرپشنز اور عالمی آن لائن اشتہارات کے لیے فوری ورچوئل کارڈز جاری کریں۔"
      },
      {
        "num": "۰۴",
        "title": "صارفین کے فنڈز کا سخت قانونی تحفظ",
        "desc": "برطانوی مالیاتی نگراں ادارے (FCA) اور یورپی سینٹرل بینک کے قوانین کے تحت صارفین کی رقوم مکمل طور پر محفوظ الگ کھاتوں میں رکھی جاتی ہیں۔"
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "ذاتی اور کاروباری",
        "description": "کثیر کرنسی اکاؤنٹس میں عالمی مارکیٹ لیڈر جو شفاف ترین فیسوں، 9 سے زائد کرنسیوں میں لوکل ریسیونگ اکاؤنٹس اور مارکیٹ کے حقیقی ریٹس کے ساتھ رقوم کی منتقلی فراہم کرتا ہے۔",
        "details": [
          "براہ راست مقامی بینک اکاؤنٹ نمبرز (یورپ کا IBAN، امریکہ کا Routing نمبر، برطانیہ کا Sort Code)",
          "دنیا بھر کے 160 سے زائد ممالک میں رقوم بھیجنے اور وصول کرنے کی سہولت",
          "ملازمین اور فری لانسرز کو بیک وقت ادائیگیاں کرنے کا خودکار نظام",
          "بین الاقوامی اخراجات کے لیے فزیکل اور ڈیجیٹل ڈیبٹ کارڈز"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "فری لانسرز اور B2B حب",
        "description": "ڈیجیٹل کاروباری افراد، ایمیزون کے فروخت کنندگان اور ان فری لانسرز کے لیے بہترین حل جو Upwork اور Fiverr جیسے بین الاقوامی پلیٹ فارمز سے رقوم وصول کرتے ہیں۔",
        "details": [
          "عالمی مارکیٹوں (Amazon, eBay, Upwork, Fiverr) سے براہ راست آمدنی کی وصولی",
          "امریکی ڈالر، یورو، برطانوی پاؤنڈ، کینیڈین ڈالر اور جاپانی ین میں اکاؤنٹس",
          "عالمی وینڈرز کو مقامی کرنسیوں میں فوری اور آسان ادائیگیاں",
          "ترقی کرتے ہوئے کاروباری اداروں کے لیے ورکنگ کیپیٹل کی سہولت"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "کرپٹو اور روایتی کرنسی کا سنگم",
        "description": "ایک جدید ہائبرڈ فنانشل پلیٹ فارم جو روایتی کرنسی اور ڈیجیٹل اثاثوں کو آپس میں جوڑتا ہے؛ فوری تبادلے اور کرپٹو سے منسلک کارڈز کے ساتھ۔",
        "details": [
          "50 سے زائد کرپٹو کرنسیوں اور روایتی فیات کرنسیوں کے درمیان فوری تبادلہ",
          "خریداری پر 8 فیصد تک کرپٹوبیک (Cryptoback) ریوارڈز والا ڈیبٹ کارڈ",
          "بین الاقوامی ٹرانزیکشنز پر صفر ایکسچینج فیس اور مسابقتی ریٹس",
          "ریگولیٹڈ سیکیورٹی اور محفوظ کولڈ اسٹوریج والٹس"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "بڑے کاروباری اداروں کی تجارت",
        "description": "اینٹ گروپ (Ant Group) کا کارپوریٹ انٹرنیشنل پیمنٹ پلیٹ فارم، جو بڑی درآمدی و برآمدی کمپنیوں اور ایشیائی سپلائی چینز کے لیے ڈیزائن کیا گیا ہے۔",
        "details": [
          "بڑے پیمانے کی بین الاقوامی تجارتی ادائیگیوں اور ہول سیل لین دین کے لیے موزوں",
          "چینی سپلائی چینز اور فیکٹریوں (1688 اور Alibaba) کے ساتھ گہری وابستگی",
          "کرنسی کے اتار چڑھاؤ کے خلاف فارورڈ کنٹریکٹس اور بہترین ایکسچینج ریٹس",
          "کمپنی کی مالیاتی ٹیموں کے لیے کثیر صارف رسائی اور جدید کنٹرولز"
        ]
      }
    ],
    "faqs": [
      {
        "q": "کیا یہ روایتی بینک اکاؤنٹس کی طرح ہیں؟",
        "a": "یہ اکاؤنٹس باضابطہ لائسنس یافتہ الیکٹرانک منی اداروں (EMI) کی طرف سے فراہم کیے جاتے ہیں۔ یہ آپ کو مخصوص آئیبان (IBAN) اور بینکنگ کوڈز دیتے ہیں جو روایتی بینکوں کی طرح سوئفٹ، سیپا (SEPA) اور ACH کے لیے مکمل طور پر کام کرتے ہیں، جبکہ کسٹمر فنڈز محفوظ اور علیحدہ اکاؤنٹس میں رکھے جاتے ہیں۔"
      },
      {
        "q": "صافی اکیڈمی متعدد فراہم کنندگان کیوں تجویز کرتی ہے؟",
        "a": "مختلف کاروباری افراد کی ضروریات مختلف ہوتی ہیں۔ Wise روزمرہ کی کثیر کرنسی منتقلیوں کے لیے بہترین ہے، Payoneer فری لانس اور ای کامرس کے لیے مفید ہے، Wirex ڈیجیٹل اثاثوں اور فیات کے درمیان پل ہے اور WorldFirst بڑی درآمدی و برآمدی کمپنیوں کے لیے ہے۔"
      },
      {
        "q": "کیا ہر درخواست گزار کو یورپی یا امریکی بینک اکاؤنٹ کی تفصیلات ملتی ہیں؟",
        "a": "جی ہاں؛ کامیاب تصدیق اور ریگولیٹری منظوری کے بعد ہر ادارہ آپ کے ذاتی نام یا کمپنی کے قانونی نام پر براہ راست بینکنگ تفصیلات (جیسے یورپی IBAN یا امریکی Routing نمبر) جاری کرتا ہے۔"
      },
      {
        "q": "اکاؤنٹ کھولنے کے لیے کون سی دستاویزات درکار ہیں؟",
        "a": "ذاتی اکاؤنٹس کے لیے: درست بین الاقوامی پاسپورٹ یا قومی شناختی کارڈ بمعہ رہائشی پتے کا ثبوت (یوٹیلٹی بل یا پچھلے 90 دنوں کا بینک اسٹیٹمنٹ)۔ کارپوریٹ اکاؤنٹس کے لیے: کمپنی رجسٹریشن سرٹیفکیٹ، میمورنڈم، ڈائریکٹرز کے شناختی کارڈز اور کاروباری ثبوت۔"
      },
      {
        "q": "صافی اکیڈمی اس عمل میں کس طرح مدد کرتی ہے؟",
        "a": "صافی اکیڈمی دستاویزات کا جائزہ لے کر اور باضابطہ بین الاقوامی اداروں کے ساتھ محفوظ روابط فراہم کر کے رہنمائی کرتی ہے تاکہ اراکین بغیر کسی پریشانی کے اپنا بین الاقوامی بینکنگ نظام قائم کر سکیں۔"
      }
    ]
  },
  "ru": {
    "isRtl": false,
    "archBadge": "01 / Архитектура решений",
    "archTitle": "Финансовый интерфейс мирового уровня, созданный как высокотехнологичный продукт.",
    "archSubtitle": "Изучите возможности каждого банковского шлюза и подготовьте документы для успешного прохождения проверки.",
    "verifiedCapabilitiesLabel": "Проверенные банковские каналы и протоколы:",
    "termsDisclaimer": "Итоговая доступность по юрисдикциям, лимиты и условия обслуживания подтверждаются в ходе индивидуальной проверки.",
    "applyForPartner": "Подать заявку на",
    "badge": "Глобальная банковская инфраструктура",
    "heroTitle": "Международный банкинг без границ.",
    "heroSubtitle": "Премиальный опыт открытия мультивалютных счетов для частных лиц и компаний, работающих с зарубежными рынками и клиентами по всему миру.",
    "startApplication": "Начать оформление",
    "exploreProviders": "Обзор финансовых институтов",
    "settlementCurrencies": "Поддерживаемые валюты расчетов:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Мультивалютный корпоративный IBAN",
    "cardHolderLabel": "ДЕРЖАТЕЛЬ КАРТЫ",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "СРОК ДЕЙСТВИЯ",
    "personalTab": "Личный счет",
    "businessTab": "Корпоративный счет (Бизнес)",
    "providersBadge": "Проверенные финансовые институты",
    "providersTitle": "Ведущие международные банки и платежные системы (EMI)",
    "providersSub": "Сравните ключевые преимущества лицензированных учреждений электронных денег для эффективного ведения бизнеса.",
    "selectProviderLabel": "Выберите финансовый институт:",
    "coreCapabilities": "Ключевые возможности и каналы расчетов",
    "visitPortalBtn": "Перейти на официальный сайт",
    "applicationBadge": "Консультация и проверка документов",
    "applicationTitle": "Заявка на индивидуальное сопровождение",
    "applicationSub": "Отправьте свои данные для предварительной проверки документов и доступности банковских шлюзов для вашей юрисдикции.",
    "accountTypeLabel": "Тип открываемого счета",
    "firstNameLabel": "Имя",
    "firstNamePlaceholder": "Например: Александр",
    "lastNameLabel": "Фамилия",
    "lastNamePlaceholder": "Например: Иванов",
    "emailLabel": "Рабочий или личный Email",
    "emailPlaceholder": "alex@example.com",
    "phoneLabel": "Телефон (с кодом страны)",
    "phonePlaceholder": "+7 (999) 123-45-67",
    "countryLabel": "Страна проживания или юрисдикция компании",
    "countryPlaceholder": "Например: Великобритания, ОАЭ, Германия",
    "companyNameLabel": "Официальное наименование компании",
    "companyNamePlaceholder": "Например: Safi Logistics LLC",
    "companyRegLabel": "Регистрационный номер компании или ИНН",
    "companyRegPlaceholder": "Например: 12345678 или налоговый номер",
    "submittingBtn": "Отправка заявки...",
    "submitBtn": "Отправить документы на проверку",
    "successTitle": "Заявка успешно принята",
    "successDesc": "Ваш запрос зарегистрирован в системе. Наши специалисты по комплаенсу свяжутся с вами в течение 1 рабочего дня.",
    "errorDesc": "Произошла ошибка при отправке заявки. Пожалуйста, проверьте интернет-соединение или повторите попытку.",
    "faqsBadge": "Правовые аспекты",
    "faqsTitle": "Комплаенс, лицензирование и структура счетов",
    "features": [
      {
        "num": "01",
        "title": "Мультивалютное хранилище",
        "desc": "Хранение и обмен ключевых мировых валют по реальному межбанковскому курсу в 40+ странах без скрытых комиссий."
      },
      {
        "num": "02",
        "title": "Выделенные реквизиты IBAN",
        "desc": "Получение персональных банковских реквизитов в Европе (SEPA), Великобритании (Faster Payments) и США (ACH)."
      },
      {
        "num": "03",
        "title": "Корпоративные и виртуальные карты",
        "desc": "Мгновенный выпуск виртуальных карт для оплаты облачных сервисов, зарубежной рекламы и подписок."
      },
      {
        "num": "04",
        "title": "Строгая правовая защита средств",
        "desc": "Средства клиентов хранятся на изолированных сегрегированных счетах под надзором регуляторов FCA и ЕЦБ."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Физические и юрлица",
        "description": "Мировой лидер в области мультивалютных счетов с реальным рыночным курсом обмена, локальными реквизитами в 9+ валютах и прозрачными низкими комиссиями.",
        "details": [
          "Прямые локальные реквизиты (европейский IBAN, американский Routing, британский Sort Code)",
          "Поддержка платежей в более чем 160 стран мира",
          "Массовые выплаты для международных команд и подрядчиков",
          "Физические и цифровые дебетовые карты для корпоративных расходов"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Фриланс и B2B коммерция",
        "description": "Идеальное решение для цифровых предпринимателей, продавцов на Amazon и фрилансеров, получающих выплаты от международных платформ Upwork и Fiverr.",
        "details": [
          "Прямой вывод средств с ведущих маркетплейсов (Amazon, eBay, Upwork, Fiverr)",
          "Счета для приема платежей в USD, EUR, GBP, CAD, JPY и AUD",
          "Быстрые расчеты с зарубежными поставщиками в местных валютах",
          "Программы оборотного финансирования для развивающихся магазинов"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Связка крипто и фиата",
        "description": "Инновационная гибридная платформа, объединяющая традиционные фиатные деньги и криптовалюты с мгновенным обменом и картами с кешбэком.",
        "details": [
          "Мгновенный обмен между 50+ криптовалютами и фиатными валютами",
          "Дебетовая карта с крипто-кешбэком (Cryptoback) до 8% с покупок",
          "0% комиссий за конвертацию при международных операциях",
          "Регулируемое холодное хранение активов в соответствии с нормативами"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Крупная оптовая торговля",
        "description": "Платформа трансграничных корпоративных платежей от Ant Group для крупных экспортеров/импортеров и расчетов с азиатскими поставщиками.",
        "details": [
          "Оптимизировано для крупных оптовых международных торговых контрактов",
          "Прямая интеграция с китайскими производителями (1688 и Alibaba)",
          "Минимальные валютные спреды и форвардные контракты для хеджирования рисков",
          "Многопользовательский корпоративный доступ для финансовых отделов"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Являются ли эти счета классическими банковскими счетами?",
        "a": "Данные счета открываются в лицензированных европейских и британских институтах электронных денег (EMI). Они предоставляют полноценные индивидуальные реквизиты IBAN, SWIFT и Routing, работающие идентично традиционным банкам, при этом средства клиентов хранятся на защищенных сегрегированных счетах."
      },
      {
        "q": "Почему Safi Academy представляет несколько сервисов?",
        "a": "У каждого предпринимателя свои задачи: Wise идеален для повседневных расчетов, Payoneer незаменим для фриланса и маркетплейсов, Wirex соединяет криптовалюты с фиатом, а WorldFirst создан для крупных импортеров и торговли с Азией."
      },
      {
        "q": "Получает ли каждый клиент персональные европейские или американские реквизиты?",
        "a": "Да. После успешной проверки документов каждый сервис выпускает персональные реквизиты (например, европейский IBAN или американский номер счета) на ваше имя или на наименование вашей компании."
      },
      {
        "q": "Какие документы необходимы для открытия счета?",
        "a": "Для физлиц: действующий заграничный паспорт или национальное удостоверение, а также подтверждение адреса проживания (счет за коммунальные услуги или выписка за последние 90 дней). Для компаний: свидетельство о регистрации, устав, реестр директоров и подтверждение реальной деятельности."
      },
      {
        "q": "Какую помощь оказывает Safi Academy при открытии?",
        "a": "Safi Academy помогает подготовить досье, проводит предварительный комплаенс-аудит документов и направляет заявку напрямую по официальным партнерским каналам для минимизации риска отказа."
      }
    ]
  },
  "tr": {
    "isRtl": false,
    "archBadge": "01 / Altyapı Mimarisi",
    "archTitle": "Basit bir form değil, ürün gibi tasarlanan finansal arayüz.",
    "archSubtitle": "Her ödeme kanalının sunduğu özellikleri inceleyin ve uluslararası hesap başvurunuzu eksiksiz hazırlayın.",
    "verifiedCapabilitiesLabel": "Doğrulanmış Bankacılık Yetenekleri ve Kanalları:",
    "termsDisclaimer": "Nihai uygunluk, bölgesel erişim ve hesap şartları kişisel danışmanlık aşamasında kesinleşir.",
    "applyForPartner": "Hesap Başvurusu:",
    "badge": "Küresel Bankacılık Altyapısı",
    "heroTitle": "Sınır Tanımayan Uluslararası Bankacılık.",
    "heroSubtitle": "Farklı para birimlerinde, ülkelerde ve dijital pazarlarda faaliyet gösteren bireyler ve işletmeler için birinci sınıf küresel hesap deneyimi.",
    "startApplication": "Başvuruyu Başlat",
    "exploreProviders": "Kurumları İncele",
    "settlementCurrencies": "Desteklenen Takas Para Birimleri:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Çok Para Birimli Ticari IBAN",
    "cardHolderLabel": "KART SAHİBİ",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "SON KULLANMA",
    "personalTab": "Bireysel Hesap",
    "businessTab": "Kurumsal (Şirket) Hesap",
    "providersBadge": "Doğrulanmış Küresel Ağlar",
    "providersTitle": "Seçkin Uluslararası Elektronik Para ve Bankacılık Kurumları",
    "providersSub": "Dünya çapında lisanslı elektronik para kuruluşlarının (EMI) sunduğu avantajları karşılaştırın.",
    "selectProviderLabel": "Kurum Seçin:",
    "coreCapabilities": "Temel Yetenekler ve Uyumlu Kanallar",
    "visitPortalBtn": "Resmi Platformu Ziyaret Et",
    "applicationBadge": "Danışmanlık ve Evrak Ön İncelemesi",
    "applicationTitle": "Ön Değerlendirme ve Danışmanlık Talebi",
    "applicationSub": "Bölgesel uygunluk, şirket evrakları ve yasal ön inceleme için profil bilgilerinizi iletin.",
    "accountTypeLabel": "Hesap Türü",
    "firstNameLabel": "Adınız",
    "firstNamePlaceholder": "Örn: Mehmet",
    "lastNameLabel": "Soyadınız",
    "lastNamePlaceholder": "Örn: Yılmaz",
    "emailLabel": "Kurumsal veya Şahsi E-posta",
    "emailPlaceholder": "mehmet@example.com",
    "phoneLabel": "Telefon Numarası (Ülke kodu ile)",
    "phonePlaceholder": "+90 532 123 4567",
    "countryLabel": "İkamet Edilen Ülke / Şirket Kuruluş Yeri",
    "countryPlaceholder": "Örn: Türkiye, Almanya, Birleşik Krallık",
    "companyNameLabel": "Resmi Şirket Unvanı",
    "companyNamePlaceholder": "Örn: Safi Bilişim Ltd. Şti.",
    "companyRegLabel": "Şirket Sicil Numarası / Vergi Kimlik No",
    "companyRegPlaceholder": "Örn: 1234567890 veya Vergi No",
    "submittingBtn": "Dosya İletiliyor...",
    "submitBtn": "Başvuru Dosyasını Gönder",
    "successTitle": "Dosyanız Başarıyla Alındı",
    "successDesc": "Başvurunuz sisteme kaydedildi. Danışmanlarımız evraklarınızı mevzuat kriterlerine göre 1 iş günü içinde inceleyecektir.",
    "errorDesc": "Başvuru gönderilirken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.",
    "faqsBadge": "Mevzuat ve Uyum",
    "faqsTitle": "Yasal Uyum, Lisanslama ve Hesap Yapısı",
    "features": [
      {
        "num": "01",
        "title": "Çok Para Birimli Güvenli Kasa",
        "desc": "Gizli komisyonlar olmadan, gerçek piyasa kurlarıyla 40'tan fazla ülkede para tutma ve anında dönüştürme."
      },
      {
        "num": "02",
        "title": "Kişiye Özel IBAN Numaraları",
        "desc": "Avrupa (SEPA), İngiltere (Faster Payments) ve ABD (ACH) ağlarında adınıza doğrudan yerel hesap bilgileri."
      },
      {
        "num": "03",
        "title": "Sanal ve Fiziksel Kartlar",
        "desc": "Bulut sunucuları, yazılım abonelikleri ve yurt dışı dijital reklamlar için anında sanal kart oluşturma."
      },
      {
        "num": "04",
        "title": "Sıkı Düzenleyici Mevzuat Güvencesi",
        "desc": "Müşteri fonları, Birleşik Krallık FCA ve Avrupa Merkez Bankası kuralları uyarınca koruma altındadır."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Bireysel ve Kurumsal",
        "description": "Şeffaf düşük komisyonlar, 9'dan fazla para biriminde yerel hesap bilgileri ve gerçek piyasa kurlarıyla çoklu para biriminde dünya lideri.",
        "details": [
          "Doğrudan yerel banka hesap bilgileri (Avrupa IBAN, ABD Routing, İngiltere Sort Code)",
          "160'tan fazla ülkeye ve ülkeden para transferi imkanı",
          "Uluslararası çalışanlar ve yükleniciler için toplu maaş ödeme altyapısı",
          "Şirket harcamaları için fiziksel ve dijital banka kartları"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance ve B2B Ticaret",
        "description": "Dijital girişimciler, Amazon satıcıları ve Upwork ile Fiverr gibi platformlardan döviz kazanan serbest çalışanlar için mükemmel çözüm.",
        "details": [
          "Global pazar yerlerinden (Amazon, eBay, Upwork, Fiverr) doğrudan gelir tahsilatı",
          "USD, EUR, GBP, CAD, JPY ve AUD para birimlerinde tahsilat hesapları",
          "Yurt dışındaki tedarikçilere yerel para birimleriyle hızlı ödeme",
          "Büyüyen e-ticaret işletmeleri için işletme sermayesi çözümleri"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Kripto-İtibari Para Hibriti",
        "description": "Geleneksel itibari para ile dijital varlıkları sorunsuz şekilde birbirine bağlayan, anında takas ve kripto destekli kartlar sunan yenilikçi platform.",
        "details": [
          "50'den fazla kripto para ve geleneksel itibari para arasında anında takas",
          "Alışverişlerde %8'e varan Cryptoback nakit iade ödüllü banka kartı",
          "Yabancı para işlemlerinde sıfır döviz komisyonu ve rekabetçi OTC kurları",
          "Düzenleyici standartlara uygun soğuk depolama güvenlik altyapısı"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Büyük Kurumsal Ticaret",
        "description": "Ant Group bünyesindeki kurumsal ödeme platformu; yüksek hacimli ihracat/ithalat şirketleri ve Asya tedarik zincirleri için tasarlanmıştır.",
        "details": [
          "Yüksek hacimli uluslararası dış ticaret transferleri için optimize edilmiş altyapı",
          "Çin ve Asya üretici tedarik zincirleriyle (1688, Alibaba) doğrudan entegrasyon",
          "Kur dalgalanmalarına karşı vadeli döviz sözleşmeleri ve rekabetçi kurlar",
          "Şirket finans ekipleri için çok kullanıcılı kurumsal yetkilendirme sistemi"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Bu hesaplar geleneksel banka hesaplarıyla aynı mıdır?",
        "a": "Bu hesaplar lisanslı Elektronik Para Kuruluşları (EMI) tarafından sağlanır. Adınıza düzenlenen IBAN ve yönlendirme numaraları sayesinde SWIFT, SEPA ve ACH transferlerinde geleneksel bankalarla aynı işlevi görür ve paranız güvence altındadır."
      },
      {
        "q": "Safi Akademi neden birden fazla kurum önermektedir?",
        "a": "Her işletmenin ihtiyacı farklıdır: Wise günlük transferler için idealdir, Payoneer pazar yeri ve serbest çalışan gelirleri için uygundur, Wirex dijital varlıkları nakde bağlar, WorldFirst ise büyük dış ticaret hacimleri için tasarlanmıştır."
      },
      {
        "q": "Her başvuru sahibi kişisel Avrupa veya ABD hesap bilgisi alır mı?",
        "a": "Evet. Kimlik doğrulama ve yasal onay sürecinin ardından her kurum, şahsınız veya şirketiniz adına doğrudan yerel hesap numaraları (örneğin Avrupa SEPA IBAN veya ABD hesap numarası) tahsis eder."
      },
      {
        "q": "Hesap açılışı için hangi belgeler gereklidir?",
        "a": "Bireysel hesaplar için: Geçerli pasaport veya kimlik belgesi ve son 90 güne ait adres kanıtı (fatura veya banka ekstresi). Şirket hesapları için: Şirket kuruluş belgesi, ana sözleşme, imza yetkilileri listesi ve faaliyet belgesi."
      },
      {
        "q": "Safi Akademi bu süreçte nasıl destek olur?",
        "a": "Safi Akademi, evrakların hazırlanması, ön denetim ve resmi uyum birimleriyle doğrudan bağlantı kurarak üyelerin ret almadan global bankacılık ağına erişmelerini sağlar."
      }
    ]
  },
  "de": {
    "isRtl": false,
    "archBadge": "01 / Architektur & Infrastruktur",
    "archTitle": "Eine Finanzschnittstelle, konzipiert wie ein High-End-Produkt.",
    "archSubtitle": "Erfahren Sie, welche Zahlungswege jedes Institut bietet, und bereiten Sie Ihr Dossier präzise vor.",
    "verifiedCapabilitiesLabel": "Verifizierte Bankkanäle & Netzwerke:",
    "termsDisclaimer": "Die endgültige Verfügbarkeit und Konditionen werden während des persönlichen Onboardings bestätigt.",
    "applyForPartner": "Konto eröffnen bei",
    "badge": "Globale Bankeninfrastruktur",
    "heroTitle": "Grenzenloses Banking weltweit.",
    "heroSubtitle": "Erstklassiges internationales Konto-Erlebnis für Privatpersonen und Unternehmen, die global agieren.",
    "startApplication": "Antrag starten",
    "exploreProviders": "Anbieter vergleichen",
    "settlementCurrencies": "Unterstützte Abrechnungswährungen:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Kommerzieller Multi-Währungs-IBAN",
    "cardHolderLabel": "KARTENINHABER",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "GÜLTIG BIS",
    "personalTab": "Privatkonto",
    "businessTab": "Geschäftskonto (Firma)",
    "providersBadge": "Verifizierte Institute",
    "providersTitle": "Führende E-Geld-Institute & globale Bankkanäle",
    "providersSub": "Vergleichen Sie regulierte E-Geld-Institute (EMI) für weltweiten Zahlungsverkehr.",
    "selectProviderLabel": "Institut auswählen:",
    "coreCapabilities": "Kernfunktionen & regulierte Schienen",
    "visitPortalBtn": "Offizielle Plattform besuchen",
    "applicationBadge": "Beratung & Vorprüfung",
    "applicationTitle": "Individuelle Beratung zur Kontoeröffnung anfordern",
    "applicationSub": "Übermitteln Sie Ihre Daten zur Vorprüfung der Verfügbarkeit und regulatorischen Voraussetzungen.",
    "accountTypeLabel": "Gewünschte Kontoart",
    "firstNameLabel": "Vorname",
    "firstNamePlaceholder": "z. B. Maximilian",
    "lastNameLabel": "Nachname",
    "lastNamePlaceholder": "z. B. Weber",
    "emailLabel": "Geschäftliche oder private E-Mail",
    "emailPlaceholder": "maximilian@example.com",
    "phoneLabel": "Telefonnummer (mit Ländervorwahl)",
    "phonePlaceholder": "+49 170 1234567",
    "countryLabel": "Wohnsitzland oder Unternehmenssitz",
    "countryPlaceholder": "z. B. Deutschland, Österreich, Schweiz",
    "companyNameLabel": "Offizieller Firmenname (bei Geschäftskonten)",
    "companyNamePlaceholder": "z. B. Safi Global Solutions GmbH",
    "companyRegLabel": "Handelsregisternummer / Steuernummer",
    "companyRegPlaceholder": "z. B. HRB 12345 oder USt-IdNr.",
    "submittingBtn": "Dossier wird übertragen...",
    "submitBtn": "Dossier zur Prüfung einreichen",
    "successTitle": "Dossier erfolgreich eingereicht",
    "successDesc": "Ihre Angaben wurden erfasst. Unser Beratungsteam prüft Ihre Dokumente innerhalb eines Werktages.",
    "errorDesc": "Beim Übermitteln ist ein Fehler aufgetreten. Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es erneut.",
    "faqsBadge": "Compliance & Recht",
    "faqsTitle": "Regulierung, Lizenzen und Kontostruktur",
    "features": [
      {
        "num": "01",
        "title": "Multi-Währungs-Konto",
        "desc": "Halten und tauschen Sie globale Währungen zum echten Devisenmittelkurs ohne versteckte Aufschläge."
      },
      {
        "num": "02",
        "title": "Individuelle IBAN-Kontoverbindungen",
        "desc": "Erhalten Sie lokale Bankverbindungen in Europa (SEPA), UK (Faster Payments) und den USA (ACH) auf Ihren Namen."
      },
      {
        "num": "03",
        "title": "Physische & virtuelle Karten",
        "desc": "Erstellen Sie virtuelle Karten für Cloud-Server, Marketingbudgets und internationale Einkäufe."
      },
      {
        "num": "04",
        "title": "Strenge Einlagensicherung",
        "desc": "Kundengelder werden auf getrennten Treuhandkonten gemäß den Vorschriften der FCA und der EZB verwahrt."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Privat & Geschäftlich",
        "description": "Weltweiter Marktführer für Multi-Währungs-Konten mit echten Devisenkursen, lokalen Kontoverbindungen in 9+ Währungen und minimalen Gebühren.",
        "details": [
          "Direkte lokale Kontoverbindungen (EUR IBAN, USD Routing, GBP Sort Code)",
          "Überweisungen in über 160 Länder weltweit",
          "Automatisierte Sammelzahlungen für internationale Teams",
          "Debitkarten für weltweites Ausgabenmanagement"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance & E-Commerce",
        "description": "Optimal für Online-Händler, Amazon-Verkäufer und Freelancer, die Einnahmen von globalen Plattformen wie Upwork und Fiverr erzielen.",
        "details": [
          "Direkte Auszahlungen von Marktplätzen (Amazon, eBay, Upwork, Fiverr)",
          "Empfangskonten in USD, EUR, GBP, CAD, JPY und AUD",
          "Schnelle Lieferantenzahlungen in lokalen Währungen",
          "Betriebsmittel- und Wachstumsfinanzierung für Händler"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Krypto-Fiat-Hybrid",
        "description": "Innovative Plattform zur nahtlosen Verbindung von traditionellen Fiat-Währungen und Krypto-Assets mit Debitkarten und Cashback.",
        "details": [
          "Sofortiger Wechsel zwischen über 50 Kryptowährungen und Fiat-Währungen",
          "Debitkarte mit bis zu 8 % Cryptoback-Prämien auf Einkäufe",
          "Keine Wechselgebühren bei Auslandstransaktionen",
          "Regulierte Cold-Storage-Verwahrung nach höchsten Sicherheitsstandards"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Großhandel & B2B",
        "description": "Globale Zahlungsplattform der Ant Group, spezialisiert auf Außenhandel, asiatische Lieferketten und professionelles Währungsmanagement.",
        "details": [
          "Maßgeschneidert für hohe Volumina im internationalen Im- und Export",
          "Direkte Anbindung an asiatische Hersteller und Marktplätze (1688, Alibaba)",
          "Attraktive Spreads und Terminkontrakte zur Kurssicherung",
          "Mehrbenutzer-Verwaltung für Finanzabteilungen"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Handelt es sich um ein klassisches Filialbankkonto?",
        "a": "Diese Konten werden von lizenzierten E-Geld-Instituten (EMI) bereitgestellt. Sie bieten dedizierte IBANs und Bankleitzahlen, die für Überweisungen (SEPA, SWIFT, ACH) genauso funktionieren wie traditionelle Banken, während Kundengelder auf separaten Konten geschützt sind."
      },
      {
        "q": "Warum empfiehlt die Safi Academy mehrere Anbieter?",
        "a": "Unternehmer haben unterschiedliche Anforderungen: Wise eignet sich für den täglichen Zahlungsverkehr, Payoneer ist ideal für Plattformen und Freelancer, Wirex verbindet Krypto mit Fiat, und WorldFirst ist für den Großhandel ausgelegt."
      },
      {
        "q": "Erhält jeder Antragsteller ein eigenes europäisches oder US-Konto?",
        "a": "Ja. Nach erfolgreicher Identitätsprüfung stellt jeder Anbieter individuelle Kontodaten (wie eine europäische IBAN oder eine US-Routing-Nummer) auf Ihren Namen oder Ihren Firmennamen aus."
      },
      {
        "q": "Welche Unterlagen sind für die Eröffnung erforderlich?",
        "a": "Für Privatpersonen: Reisepass oder Personalausweis sowie Adressnachweis (Versorgerrechnung oder Bankauszug nicht älter als 90 Tage). Für Unternehmen: Handelsregisterauszug, Gesellschaftsvertrag und Nachweis der Geschäftstätigkeit."
      },
      {
        "q": "Wie unterstützt die Safi Academy bei der Antragstellung?",
        "a": "Die Safi Academy unterstützt durch strukturierte Anleitungen, Vorab-Prüfungen der Unterlagen und direkte Schnittstellen zu Partnern, um Ablehnungen zu vermeiden."
      }
    ]
  },
  "fr": {
    "isRtl": false,
    "archBadge": "01 / Architecture & Réseaux",
    "archTitle": "Une interface financière conçue avec les plus hauts standards technologiques.",
    "archSubtitle": "Découvrez les atouts de chaque canal bancaire et préparez votre dossier pour ouvrir un compte international.",
    "verifiedCapabilitiesLabel": "Canaux bancaires et protocoles certifiés :",
    "termsDisclaimer": "L'éligibilité finale, la disponibilité géographique et les tarifs sont confirmés lors de l'étude personnalisée.",
    "applyForPartner": "Demander l'ouverture chez",
    "badge": "Infrastructure bancaire mondiale",
    "heroTitle": "Une banque internationale sans frontières.",
    "heroSubtitle": "Une expérience de compte international de premier ordre pour les particuliers et les entreprises opérant à l'échelle mondiale.",
    "startApplication": "Démarrer la demande",
    "exploreProviders": "Explorer les établissements",
    "settlementCurrencies": "Devises de règlement acceptées :",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "IBAN commercial multi-devises",
    "cardHolderLabel": "TITULAIRE DE CARTE",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "DATE D'EXPIRATION",
    "personalTab": "Compte Personnel",
    "businessTab": "Compte Entreprise",
    "providersBadge": "Établissements certifiés",
    "providersTitle": "Établissements de monnaie électronique et réseaux bancaires",
    "providersSub": "Comparez les fonctionnalités institutionnelles des meilleurs établissements de monnaie électronique (EME) agréés.",
    "selectProviderLabel": "Choisir l'établissement :",
    "coreCapabilities": "Capacités clés et réseaux réglementés",
    "visitPortalBtn": "Visiter la plateforme officielle",
    "applicationBadge": "Conseil & Vérification de dossier",
    "applicationTitle": "Demander un accompagnement personnalisé",
    "applicationSub": "Transmettez votre profil pour vérifier la faisabilité, les réseaux bancaires et la conformité préalable.",
    "accountTypeLabel": "Type de compte souhaité",
    "firstNameLabel": "Prénom",
    "firstNamePlaceholder": "ex. Alexandre",
    "lastNameLabel": "Nom",
    "lastNamePlaceholder": "ex. Dupont",
    "emailLabel": "E-mail professionnel ou personnel",
    "emailPlaceholder": "alexandre@example.com",
    "phoneLabel": "Téléphone (avec l'indicatif pays)",
    "phonePlaceholder": "+33 6 12 34 56 78",
    "countryLabel": "Pays de résidence ou d'immatriculation",
    "countryPlaceholder": "ex. France, Belgique, Suisse, Canada",
    "companyNameLabel": "Raison sociale officielle (pour les entreprises)",
    "companyNamePlaceholder": "ex. Safi Global Solutions SAS",
    "companyRegLabel": "Numéro d'immatriculation / Numéro fiscal",
    "companyRegPlaceholder": "ex. Numéro SIREN ou TVA",
    "submittingBtn": "Transmission du dossier...",
    "submitBtn": "Envoyer le dossier pour vérification",
    "successTitle": "Dossier reçu avec succès",
    "successDesc": "Votre demande a été enregistrée. Notre équipe de conformité étudiera vos pièces sous un jour ouvré.",
    "errorDesc": "Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion ou réessayer.",
    "faqsBadge": "Conformité & Légalité",
    "faqsTitle": "Réglementation, agréments et structure de compte",
    "features": [
      {
        "num": "01",
        "title": "Coffre multi-devises",
        "desc": "Détenez et convertissez les principales devises au taux de change réel du marché dans plus de 40 pays."
      },
      {
        "num": "02",
        "title": "Coordonnées IBAN dédiées",
        "desc": "Bénéficiez de coordonnées bancaires locales en Europe (SEPA), au Royaume-Uni et aux États-Unis (ACH) à votre nom."
      },
      {
        "num": "03",
        "title": "Cartes virtuelles & physiques",
        "desc": "Émettez des cartes virtuelles pour les abonnements cloud, les campagnes publicitaires et les achats internationaux."
      },
      {
        "num": "04",
        "title": "Protection rigoureuse des avoirs",
        "desc": "Les fonds des clients sont cantonnés sur des comptes ségrégués conformément aux directives de la FCA et de la BCE."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Particuliers & Entreprises",
        "description": "Leader mondial des comptes multi-devises offrant le taux de change réel, des coordonnées bancaires locales dans 9+ devises et des frais minimes.",
        "details": [
          "Coordonnées bancaires locales (IBAN européen, Routing américain, Sort Code britannique)",
          "Envois et réceptions de fonds dans plus de 160 pays",
          "Paiements groupés pour les équipes internationales et prestataires",
          "Cartes de débit physiques et digitales pour la gestion des dépenses"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelances & E-commerce",
        "description": "Solution privilégiée des entrepreneurs du numérique, des vendeurs de marketplaces et des freelances rémunérés via Upwork et Fiverr.",
        "details": [
          "Rapatriement direct depuis les marketplaces (Amazon, eBay, Upwork, Fiverr)",
          "Comptes récepteurs en USD, EUR, GBP, CAD, JPY et AUD",
          "Règlement rapide des fournisseurs internationaux en devises locales",
          "Avances de trésorerie pour les commerces en pleine expansion"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Hybride Crypto-Fiat",
        "description": "Plateforme financière hybride reliant devises traditionnelles et crypto-actifs, proposant des échanges instantanés et des cartes avec récompenses.",
        "details": [
          "Échange instantané entre plus de 50 cryptomonnaies et devises fiduciaires",
          "Carte de débit avec jusqu'à 8 % de récompenses Cryptoback sur les achats",
          "Zéro commission de change sur les transactions internationales",
          "Sécurité renforcée avec stockage à froid réglementé"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Commerce international",
        "description": "Plateforme institutionnelle d'Ant Group dédiée aux sociétés d'import-export à fort volume et aux règlements avec les fournisseurs asiatiques.",
        "details": [
          "Optimisée pour les volumes élevés de commerce international et de gros",
          "Intégration poussée avec les fabricants asiatiques (1688, Alibaba)",
          "Spreads de change très compétitifs et contrats à terme de couverture",
          "Gestion multi-utilisateurs pour les équipes financières des entreprises"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Ces comptes sont-ils identiques à ceux d'une banque traditionnelle ?",
        "a": "Ces comptes sont fournis par des Établissements de Monnaie Électronique (EME) agréés. Ils vous attribuent des IBAN et numéros de compte dédiés fonctionnant comme ceux des banques classiques pour les virements SEPA, SWIFT et ACH, tout en sécurisant vos fonds sur des comptes séparés."
      },
      {
        "q": "Pourquoi Safi Academy présente-t-elle plusieurs établissements ?",
        "a": "Chaque entrepreneur a des besoins spécifiques : Wise convient aux virements quotidiens, Payoneer est optimal pour les marketplaces et les freelances, Wirex fait le pont avec les cryptos, et WorldFirst répond aux besoins d'import-export de grande envergure."
      },
      {
        "q": "Chaque demandeur reçoit-il un compte nominatif européen ou américain ?",
        "a": "Oui. Après validation de votre identité et des vérifications d'usage, chaque établissement vous attribue des coordonnées de compte directes (IBAN européen ou Routing américain) à votre nom personnel ou au nom de votre entreprise."
      },
      {
        "q": "Quels documents sont nécessaires pour l'ouverture ?",
        "a": "Pour les particuliers : passeport valide ou carte d'identité avec justificatif de domicile de moins de 90 jours. Pour les entreprises : extrait Kbis ou certificat d'immatriculation, statuts certifiés et justificatif d'activité commerciale."
      },
      {
        "q": "Comment Safi Academy vous accompagne-t-elle ?",
        "a": "Safi Academy vous guide dans la structuration de vos documents, effectue un audit préalable et vous oriente vers les canaux officiels partenaires afin de maximiser vos chances d'approbation."
      }
    ]
  },
  "es": {
    "isRtl": false,
    "archBadge": "01 / Arquitectura y redes",
    "archTitle": "Una interfaz financiera diseñada con los más altos estándares tecnológicos.",
    "archSubtitle": "Conozca los canales y vías que ofrece cada entidad y prepare su expediente con precisión para abrir su cuenta internacional.",
    "verifiedCapabilitiesLabel": "Canales y protocolos bancarios verificados:",
    "termsDisclaimer": "La disponibilidad jurisdiccional definitiva y las condiciones comerciales se confirman durante la asesoría personalizada.",
    "applyForPartner": "Solicitar cuenta en",
    "badge": "Infraestructura bancaria global",
    "heroTitle": "Banca internacional sin fronteras.",
    "heroSubtitle": "Una experiencia de cuenta internacional de primer nivel para personas y empresas que operan con múltiples divisas y en mercados globales.",
    "startApplication": "Iniciar solicitud",
    "exploreProviders": "Explorar entidades",
    "settlementCurrencies": "Divisas de liquidación admitidas:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "IBAN comercial multidivisa",
    "cardHolderLabel": "TITULAR DE LA TARJETA",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "VENCIMIENTO",
    "personalTab": "Cuenta Personal",
    "businessTab": "Cuenta Corporativa (Empresa)",
    "providersBadge": "Entidades verificadas",
    "providersTitle": "Entidades de dinero electrónico y canales bancarios internacionales",
    "providersSub": "Compare las ventajas institucionales entre las principales entidades de dinero electrónico (EDE) reguladas a nivel mundial.",
    "selectProviderLabel": "Seleccione entidad:",
    "coreCapabilities": "Capacidades clave y canales homologados",
    "visitPortalBtn": "Visitar plataforma oficial",
    "applicationBadge": "Asesoría y precalificación",
    "applicationTitle": "Solicitud de asesoramiento para apertura de cuenta",
    "applicationSub": "Envíe sus datos para comprobar la disponibilidad regional, los requisitos corporativos y la precalificación legal.",
    "accountTypeLabel": "Tipo de cuenta deseada",
    "firstNameLabel": "Nombre",
    "firstNamePlaceholder": "ej. Carlos",
    "lastNameLabel": "Apellidos",
    "lastNamePlaceholder": "ej. Navarro",
    "emailLabel": "Correo corporativo o personal",
    "emailPlaceholder": "carlos@example.com",
    "phoneLabel": "Teléfono (con prefijo de país)",
    "phonePlaceholder": "+34 600 123 456",
    "countryLabel": "País de residencia o constitución",
    "countryPlaceholder": "ej. España, México, Colombia, EE. UU.",
    "companyNameLabel": "Razón social oficial de la empresa",
    "companyNamePlaceholder": "ej. Safi Global Solutions SL",
    "companyRegLabel": "Número de registro mercantil / NIF / CIF",
    "companyRegPlaceholder": "ej. B12345678 o Tax ID",
    "submittingBtn": "Enviando expediente...",
    "submitBtn": "Enviar expediente para revisión",
    "successTitle": "Expediente recibido correctamente",
    "successDesc": "Su solicitud ha sido registrada. Nuestro equipo de asesoría revisará sus documentos conforme a los requisitos legales en un plazo de 1 día laborable.",
    "errorDesc": "Se ha producido un error al enviar su solicitud. Compruebe su conexión o inténtelo de nuevo.",
    "faqsBadge": "Cumplimiento y garantías",
    "faqsTitle": "Normativa, licencias y estructura de cuentas",
    "features": [
      {
        "num": "01",
        "title": "Bóveda multidivisa",
        "desc": "Mantenga y convierta las principales divisas mundiales con tipos de cambio reales de mercado en más de 40 países."
      },
      {
        "num": "02",
        "title": "Datos de cuenta IBAN dedicados",
        "desc": "Obtenga cuentas locales dedicadas en Europa (SEPA), Reino Unido (Faster Payments) y EE. UU. (ACH) a su nombre."
      },
      {
        "num": "03",
        "title": "Tarjetas virtuales y físicas",
        "desc": "Emita tarjetas virtuales instantáneas para pagar servidores en la nube, suscripciones SaaS y publicidad internacional."
      },
      {
        "num": "04",
        "title": "Protección regulatoria estricta",
        "desc": "Los fondos de los clientes se custodian en cuentas segregadas bajo la supervisión de la FCA británica y el BCE."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Personal y Empresa",
        "description": "Líder global en cuentas multidivisa con tipos de cambio reales de mercado, datos de cuenta locales en más de 9 divisas y tarifas reducidas.",
        "details": [
          "Datos bancarios locales directos (IBAN europeo, Routing estadounidense, Sort Code británico)",
          "Transferencias a más de 160 países de todo el mundo",
          "Pagos masivos automatizados para nóminas y contratistas internacionales",
          "Tarjetas de débito físicas y digitales para gestionar gastos de negocio"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance y Comercio B2B",
        "description": "La plataforma idónea para emprendedores digitales, vendedores de marketplaces globales y freelancers que cobran por Upwork o Fiverr.",
        "details": [
          "Cobro directo de las principales plataformas (Amazon, eBay, Upwork, Fiverr)",
          "Cuentas de cobro en USD, EUR, GBP, CAD, JPY y AUD",
          "Pagos ágiles a proveedores internacionales en monedas locales",
          "Soluciones de capital circulante para tiendas online en expansión"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Híbrido Cripto y Fiduciario",
        "description": "Plataforma financiera innovadora que une las divisas tradicionales con criptoactivos, ofreciendo intercambios instantáneos y tarjetas con cashback.",
        "details": [
          "Intercambio inmediato entre más de 50 criptomonedas y dinero fiduciario",
          "Tarjeta de débito con hasta un 8% de recompensas Cryptoback en compras",
          "0% de comisión de cambio en pagos en el extranjero",
          "Custodia regulada y almacenamiento en frío según estándares internacionales"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Comercio Mayorista",
        "description": "Plataforma de pagos transfronterizos perteneciente a Ant Group, diseñada para empresas de importación/exportación de gran volumen y proveedores asiáticos.",
        "details": [
          "Optimizada para grandes volúmenes de comercio internacional",
          "Integración directa con fabricantes y mayoristas de Asia (1688, Alibaba)",
          "Spreads de cambio muy competitivos y contratos a plazo para cubrir riesgos",
          "Gestión multiusuario con jerarquía corporativa para equipos de tesorería"
        ]
      }
    ],
    "faqs": [
      {
        "q": "¿Son estas cuentas iguales a las de un banco comercial tradicional?",
        "a": "Estas cuentas son provistas por Entidades de Dinero Electrónico (EDE) debidamente autorizadas. Proporcionan números IBAN y códigos de ruta que funcionan de forma idéntica a los bancos convencionales para transferencias SEPA, SWIFT y ACH, manteniendo los fondos protegidos en cuentas segregadas."
      },
      {
        "q": "¿Por qué Safi Academy muestra diferentes entidades?",
        "a": "Cada negocio tiene requerimientos distintos: Wise es ideal para transferencias habituales multidivisa, Payoneer destaca en pagos de marketplaces y freelancers, Wirex conecta las finanzas tradicionales con criptomonedas y WorldFirst se enfoca en comercio mayorista internacional."
      },
      {
        "q": "¿Recibe cada solicitante datos de cuenta nominativos en Europa o EE. UU.?",
        "a": "Sí. Una vez superado el proceso de verificación de identidad y cumplimiento normativo, cada proveedor emite datos de cuenta directos (como un IBAN europeo o un número de cuenta y ruta de EE. UU.) a su nombre personal o de empresa."
      },
      {
        "q": "¿Qué documentación se exige para la apertura?",
        "a": "Para particulares: pasaporte vigente o documento nacional de identidad y justificante de domicilio expedido en los últimos 90 días. Para empresas: certificado de constitución, estatutos sociales y documentación que acredite la actividad mercantil."
      },
      {
        "q": "¿Cómo ayuda Safi Academy en este proceso?",
        "a": "Safi Academy ofrece orientación estructural, revisión preliminar de los expedientes y enlaces directos con los departamentos de cumplimiento de nuestros socios para facilitar una tramitación exitosa."
      }
    ]
  },
  "zh": {
    "isRtl": false,
    "archBadge": "01 / 离岸金融体系架构",
    "archTitle": "像打造工业级数字产品一样构建的国际金融交互界面。",
    "archSubtitle": "深度洞察各主流离岸结算通道的合规优势，精准建立符合国际标准的企业开户档案。",
    "verifiedCapabilitiesLabel": "已认证的核心清算通道与功能网络：",
    "termsDisclaimer": "具体的准入资质、支持国别及费率标准将在专属客户顾问合规初审阶段最终确立。",
    "applyForPartner": "申请开通",
    "badge": "全球国际银行清算体系",
    "heroTitle": "跨越国界限制，畅享无缝国际金融。",
    "heroSubtitle": "专为跨币种结算、出海贸易企业及国际自由职业者打造的高品质多币种境外银行账户开户解决方案。",
    "startApplication": "立即发起开户申请",
    "exploreProviders": "浏览合作金融机构",
    "settlementCurrencies": "支持结算的主流法定货币：",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "企业级多币种商业 IBAN 账户",
    "cardHolderLabel": "持卡人姓名",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "有效截止期",
    "personalTab": "个人离岸账户",
    "businessTab": "企业商业账户",
    "providersBadge": "全球持牌金融网关",
    "providersTitle": "精选国际电子货币机构 (EMI) 与银行网络",
    "providersSub": "全方位横向对比全球主流合规持牌支付机构在跨境结算、多币种收付方面的核心优势。",
    "selectProviderLabel": "选择金融机构：",
    "coreCapabilities": "核心服务优势与合规清算轨道",
    "visitPortalBtn": "前往官方直营平台",
    "applicationBadge": "专属开户咨询与档案预审",
    "applicationTitle": "预约海外银行账户开设专属咨询",
    "applicationSub": "提交基本业务背景与资质信息，由资深顾问为您评估准入政策、合规通道并进行初审。",
    "accountTypeLabel": "拟申请账户类型",
    "firstNameLabel": "名字",
    "firstNamePlaceholder": "例如：建国",
    "lastNameLabel": "姓氏",
    "lastNamePlaceholder": "例如：李",
    "emailLabel": "企业或个人工作邮箱",
    "emailPlaceholder": "li@enterprise.com",
    "phoneLabel": "联系电话（含国际区号）",
    "phonePlaceholder": "+86 138 0000 0000",
    "countryLabel": "常住国 / 公司实际注册地",
    "countryPlaceholder": "例如：中国香港、新加坡、英国、美国",
    "companyNameLabel": "公司法定注册全称（申请企业户需填）",
    "companyNamePlaceholder": "例如：Safi Global Trading Ltd",
    "companyRegLabel": "公司商业登记证号 / 税号",
    "companyRegPlaceholder": "例如：企业注册编号或纳税识别号",
    "submittingBtn": "正在加密传输申请资料...",
    "submitBtn": "提交开户预审资料",
    "successTitle": "资料已成功提交",
    "successDesc": "您的开户咨询信息已成功进入处理队列，我们的合规审核团队将在 1 个工作日内对资质进行初审。",
    "errorDesc": "提交过程中发生网络通信异常，请检查网络设置或稍后重新尝试。",
    "faqsBadge": "合规与监管指南",
    "faqsTitle": "合规监管、牌照资质与境外账户架构解析",
    "features": [
      {
        "num": "01",
        "title": "全球多币种资产金库",
        "desc": "支持持有并按国际银行间公允汇率实时兑换全球主流货币，覆盖40+国家和地区，绝无隐性汇率加点。"
      },
      {
        "num": "02",
        "title": "独立同名 IBAN 清算轨道",
        "desc": "以个人或公司名义开立专属本地银行账户（欧洲 SEPA IBAN、英国 Faster Payments、美国 ACH）。"
      },
      {
        "num": "03",
        "title": "企业级实体及虚拟万事达/VISA卡",
        "desc": "秒级签发虚拟卡，便捷结算海外服务器、SaaS软件订阅费及全球数字营销广告投放支出。"
      },
      {
        "num": "04",
        "title": "严谨的法定独立资金托管",
        "desc": "用户沉淀资金全额存放于受英国金融行为监管局 (FCA) 与欧洲央行严密监管的法定隔离银行账户中。"
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "个人与企业通用",
        "description": "全球多币种跨境账户翘楚，以中间市场真实汇率、极低透明手续费以及支持9+主流币种本地原生账户著称。",
        "details": [
          "提供直属本地银行收款信息（欧洲 SEPA IBAN、美国 Routing/Account、英国 Sort Code）",
          "支持资金安全汇出至全球 160 多个国家与地区",
          "针对跨国团队与海外自由职业者提供批量智能薪资分发",
          "配备实体与数字借记卡，全方位赋能跨境企业日常开支管理"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "B2B外贸与跨境电商枢纽",
        "description": "跨境出海企业、亚马逊卖家及国际自由职业者的标准资金伙伴，无缝对接 Amazon、Upwork、Fiverr 等主流平台。",
        "details": [
          "主流跨境电商平台与自由职业接单网站收入直接结汇提现",
          "支持美元、欧元、英镑、加元、日元、澳元等多币种本地银行收款",
          "支持直接以海外当地币种向全球供应商及协作伙伴极速分发款项",
          "为高速成长阶段的跨境电商卖家提供灵活便捷的供应链营运资金支持"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "加密资产与法币混合账户",
        "description": "新一代混合金融科技平台，顺畅架起传统法币体系与 Web3 数字资产之间的清算桥梁，配备高额消费返利卡。",
        "details": [
          "支持 50+ 种主流加密数字货币与国际主要法定货币之间的即时双向兑换",
          "次世代借记卡赋能日常线下线上消费，享高达 8% 的 Cryptoback 返现奖励",
          "海外跨境刷卡消费尊享 0 汇兑手续费及极具竞争力的场外大宗汇率",
          "严格遵循国际合规标准，冷钱包冷存储安全保障用户资产"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "大宗跨境进出口贸易",
        "description": "蚂蚁集团旗下专为大宗跨境出口企业、亚洲供应链外贸企业打造的一站式大额资金清算与外汇避险管理平台。",
        "details": [
          "针对大额全球贸易支付及批量批发清算进行了全链路深度性能优化",
          "深度打通中国本土及亚洲供应链制造源头（如阿里巴巴国际站、1688）",
          "极具竞争力的外汇点差，并提供企业级远期外汇合约锁定汇率波动风险",
          "支持多用户多层级财务权限划分，契合中大型跨国企业的内控要求"
        ]
      }
    ],
    "faqs": [
      {
        "q": "此类账户与传统的商业银行柜台账户有何实质区别？",
        "a": "此类账户由受严格监管的持牌电子货币机构 (EMI) 提供。在实际收付款功能上，它为您提供专属的 IBAN、Sort Code 和美国银行清算号，完全支持 SWIFT、SEPA 和 ACH 汇款，日常功能与传统银行并无二致，且客户资金根据法律强制要求由一级清算银行隔离存管，安全更有保障。"
      },
      {
        "q": "为什么 Safi Academy 会同时推荐多个不同的金融服务商？",
        "a": "不同企业的出海商业模型差异显著。Wise 极具性价比且适合日常小额多币种资金周转；Payoneer 针对平台卖家与自由职业收款体验极佳；Wirex 满足数字资产与法币互通需求；WorldFirst 则专为传统进出口外贸大宗款项深度定制。"
      },
      {
        "q": "成功开户后是否能获得以个人或我司名义专属的独立账户？",
        "a": "是的。在通过服务商的 KYC/KYB 身份及反洗钱合规核验后，每家机构均会为您生成专属于您个人或以您企业法定英文名称抬头的独立收款账户凭证（如专属欧洲 SEPA IBAN 或美国 ACH 路由账号）。"
      },
      {
        "q": "开立国际账户通常需要准备哪些合规审核文件？",
        "a": "个人账户：有效期内的国际护照或居民身份证、近90天内的地址证明（如水电煤气账单或银行流水）。企业账户：公司正式注册证书、公司章程、董事与持股25%以上股东的身份证明及其实际业务往来佐证材料。"
      },
      {
        "q": "Safi Academy 如何在开户全流程中为会员提供赋能支持？",
        "a": "Safi Academy 提供规范的开户资料建档指导、初审材料合规排查，并通过官方绿色合作渠道协助学员和创业者高效提交申请，有效规避因资料不规范造成的拒批风险。"
      }
    ]
  },
  "hi": {
    "isRtl": false,
    "archBadge": "01 / वित्तीय संरचना और नेटवर्क",
    "archTitle": "विश्व स्तरीय तकनीकी मानकों पर आधारित एक आधुनिक वित्तीय इंटरफेस।",
    "archSubtitle": "प्रत्येक बैंकिंग गेटवे की क्षमताओं को समझें और अंतरराष्ट्रीय खाता खोलने के लिए अपने दस्तावेज़ सटीकता से तैयार करें।",
    "verifiedCapabilitiesLabel": "सत्यापित बैंकिंग क्षमताएं और नेटवर्क:",
    "termsDisclaimer": "अंतिम पात्रता, क्षेत्रीय उपलब्धता और शुल्क व्यक्तिगत परामर्श और सत्यापन के दौरान तय किए जाते हैं।",
    "applyForPartner": "खाता खोलने का आवेदन:",
    "badge": "वैश्विक बैंकिंग अवसंरचना",
    "heroTitle": "सीमाओं से परे अंतरराष्ट्रीय बैंकिंग।",
    "heroSubtitle": "वैश्विक मुद्राओं और अंतरराष्ट्रीय डिजिटल बाजारों में काम करने वाले व्यक्तियों और व्यवसायों के लिए एक प्रीमियम खाता अनुभव।",
    "startApplication": "आवेदन शुरू करें",
    "exploreProviders": "वित्तीय संस्थान देखें",
    "settlementCurrencies": "स्वीकृत निपटान मुद्राएं:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "बहु-मुद्रा वाणिज्यिक IBAN",
    "cardHolderLabel": "कार्डधारक",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "समाप्ति तिथि",
    "personalTab": "व्यक्तिगत खाता",
    "businessTab": "व्यावसायिक (कंपनी) खाता",
    "providersBadge": "प्रमाणित वैश्विक संस्थान",
    "providersTitle": "प्रमुख अंतरराष्ट्रीय इलेक्ट्रॉनिक मनी संस्थान और बैंकिंग नेटवर्क",
    "providersSub": "वैश्विक व्यापार के लिए लाइसेंस प्राप्त इलेक्ट्रॉनिक मनी संस्थानों (EMI) की सुविधाओं की तुलना करें।",
    "selectProviderLabel": "संस्थान चुनें:",
    "coreCapabilities": "मुख्य क्षमताएं और अनुपालित बैंकिंग रेल",
    "visitPortalBtn": "आधिकारिक वेबसाइट पर जाएं",
    "applicationBadge": "परामर्श और दस्तावेज़ पूर्व-जांच",
    "applicationTitle": "अंतरराष्ट्रीय बैंक खाते के लिए परामर्श का अनुरोध",
    "applicationSub": "अपनी जानकारी भेजें ताकि क्षेत्रीय उपलब्धता, कंपनी दस्तावेज़ों और कानूनी अनुपालन की जांच की जा सके।",
    "accountTypeLabel": "खाते का प्रकार",
    "firstNameLabel": "पहला नाम",
    "firstNamePlaceholder": "उदा: राहुल",
    "lastNameLabel": "अंतिम नाम",
    "lastNamePlaceholder": "उदा: शर्मा",
    "emailLabel": "कॉर्पोरेट या व्यक्तिगत ईमेल",
    "emailPlaceholder": "rahul@example.com",
    "phoneLabel": "फ़ोन नंबर (देश कोड के साथ)",
    "phonePlaceholder": "+91 98765 43210",
    "countryLabel": "निवास का देश या कंपनी का पंजीकरण देश",
    "countryPlaceholder": "उदा: भारत, ब्रिटेन, जर्मनी, यूएई",
    "companyNameLabel": "कंपनी का आधिकारिक पंजीकृत नाम",
    "companyNamePlaceholder": "उदा: Safi Global Tech Pvt Ltd",
    "companyRegLabel": "कंपनी पंजीकरण संख्या / टैक्स आईडी (CIN/GST)",
    "companyRegPlaceholder": "उदा: U12345DL2024PTC123456 या पैन/जीएसटी",
    "submittingBtn": "दस्तावेज़ भेजे जा रहे हैं...",
    "submitBtn": "समीक्षा के लिए फ़ाइल जमा करें",
    "successTitle": "आवेदन सफलतापूर्वक प्राप्त हुआ",
    "successDesc": "आपकी जानकारी दर्ज कर ली गई है। हमारी परामर्श टीम 1 कार्यदिवस के भीतर नियामक मानकों के अनुसार आपके दस्तावेज़ों की समीक्षा करेगी।",
    "errorDesc": "जानकारी भेजने में त्रुटि हुई। कृपया इंटरनेट कनेक्शन जांचें या पुनः प्रयास करें।",
    "faqsBadge": "नियामक अनुपालन और नियम",
    "faqsTitle": "कानूनी अनुपालन, लाइसेंसिंग और खाता संरचना",
    "features": [
      {
        "num": "01",
        "title": "सुरक्षित बहु-मुद्रा वॉल्ट",
        "desc": "बिना किसी छुपे शुल्क के 40 से अधिक देशों में वास्तविक बाजार विनिमय दरों पर प्रमुख मुद्राओं को रखें और बदलें।"
      },
      {
        "num": "02",
        "title": "व्यक्तिगत IBAN खाते",
        "desc": "यूरोप (SEPA), ब्रिटेन (Faster Payments) और अमेरिका (ACH) में अपने या कंपनी के नाम पर स्थानीय बैंक खाते प्राप्त करें।"
      },
      {
        "num": "03",
        "title": "वर्चुअल और भौतिक कार्ड",
        "desc": "क्लाउड सर्वर, सॉफ्टवेयर सब्सक्रिप्शन और अंतरराष्ट्रीय विज्ञापनों के भुगतान के लिए तुरंत वर्चुअल कार्ड जारी करें।"
      },
      {
        "num": "04",
        "title": "कड़े कानूनी सुरक्षा उपाय",
        "desc": "ग्राहकों की धनराशि यूके एफसीए और यूरोपीय सेंट्रल बैंक के नियमों के तहत अलग सुरक्षित खातों में रखी जाती है।"
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "व्यक्तिगत और व्यावसायिक",
        "description": "पारदर्शी कम शुल्क, 9 से अधिक मुद्राओं में स्थानीय खाता विवरण और वास्तविक बाजार विनिमय दरों के साथ बहु-मुद्रा खातों में वैश्विक अग्रणी।",
        "details": [
          "सीधे स्थानीय बैंक खाते (यूरोपीय IBAN, यूएस रूटीन नंबर, यूके सॉर्ट कोड)",
          "दुनिया भर के 160 से अधिक देशों में धन भेजने और प्राप्त करने की सुविधा",
          "अंतरराष्ट्रीय टीम और फ्रीलांसरों के लिए स्वचालित सामूहिक भुगतान",
          "कारोबारी खर्चों के प्रबंधन के लिए भौतिक और डिजिटल डेबिट कार्ड"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "फ्रीलांस और B2B हब",
        "description": "डिजिटल उद्यमियों, अमेज़न विक्रेताओं और Upwork तथा Fiverr जैसे अंतरराष्ट्रीय प्लेटफॉर्मों से विदेशी मुद्रा कमाने वाले पेशेवरों के लिए उपयुक्त समाधान।",
        "details": [
          "वैश्विक मार्केटप्लेस (Amazon, eBay, Upwork, Fiverr) से सीधे आय की प्राप्ति",
          "USD, EUR, GBP, CAD, JPY और AUD में भुगतान प्राप्त करने वाले खाते",
          "स्थानीय मुद्राओं में विदेशी आपूर्तिकर्ताओं को त्वरित भुगतान",
          "ई-कॉमर्स विक्रेताओं के लिए कार्यशील पूंजी और व्यवसाय विकास समाधान"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "क्रिप्टो और पारंपरिक मुद्रा का मेल",
        "description": "पारंपरिक मुद्राओं और डिजिटल परिसंपत्तियों को सहजता से जोड़ने वाला अभिनव वित्तीय प्लेटफॉर्म, जिसमें त्वरित एक्सचेंज और कार्ड उपलब्ध हैं।",
        "details": [
          "50 से अधिक क्रिप्टोकरेंसी और पारंपरिक मुद्राओं के बीच त्वरित रूपांतरण",
          "खरीदारी पर 8% तक Cryptoback कैशबैक रिवॉर्ड वाला डेबिट कार्ड",
          "विदेशी लेन-देन पर 0% विनिमय शुल्क और प्रतिस्पर्धी ओटीसी दरें",
          "अंतरराष्ट्रीय मानकों के अनुसार सुरक्षित कोल्ड स्टोरेज वॉलेट"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "थोक अंतरराष्ट्रीय व्यापार",
        "description": "Ant Group का अंतरराष्ट्रीय भुगतान प्लेटफॉर्म, जो बड़े निर्यातकों/आयातकों और एशियाई आपूर्ति श्रृंखलाओं के लिए तैयार किया गया है।",
        "details": [
          "बड़े पैमाने के अंतरराष्ट्रीय व्यापारिक भुगतानों के लिए विशेष रूप से अनुकूलित",
          "चीनी और एशियाई निर्माताओं (1688, Alibaba) के साथ सीधा जुड़ाव",
          "प्रतिस्पर्धी विनिमय दरें और मुद्रा जोखिम से बचाव के लिए फॉरवर्ड अनुबंध",
          "कंपनियों की वित्त टीमों के लिए बहु-उपयोगकर्ता नियंत्रण प्रणाली"
        ]
      }
    ],
    "faqs": [
      {
        "q": "क्या ये खाते पारंपरिक बैंकों के खातों जैसे ही हैं?",
        "a": "ये खाते लाइसेंस प्राप्त इलेक्ट्रॉनिक मनी संस्थानों (EMI) द्वारा जारी किए जाते हैं। वे आपके नाम पर IBAN और बैंकिंग कोड प्रदान करते हैं जो स्विफ्ट, सेपा (SEPA) और ACH के माध्यम से पारंपरिक बैंकों की तरह ही काम करते हैं, और आपकी धनराशि सुरक्षित रखी जाती है।"
      },
      {
        "q": "साफ़ी अकादमी कई प्रदाताओं की अनुशंसा क्यों करती है?",
        "a": "प्रत्येक उद्यमी की आवश्यकताएं भिन्न होती हैं: Wise दैनिक लेन-देन के लिए बेहतरीन है, Payoneer फ्रीलांसरों और मार्केटप्लेस के लिए उत्तम है, Wirex क्रिप्टो और पारंपरिक मुद्रा को जोड़ता है और WorldFirst बड़े थोक व्यापार के लिए उपयुक्त है।"
      },
      {
        "q": "क्या प्रत्येक आवेदक को व्यक्तिगत यूरोपीय या अमेरिकी खाता विवरण मिलता है?",
        "a": "हाँ। दस्तावेज़ सत्यापन और कानूनी स्वीकृति के बाद प्रत्येक प्रदाता आपके व्यक्तिगत नाम या कंपनी के नाम पर सीधे स्थानीय बैंक विवरण (जैसे यूरोपीय IBAN या यूएस रूटीन कोड) जारी करता है।"
      },
      {
        "q": "खाता खोलने के लिए कौन से दस्तावेज़ आवश्यक हैं?",
        "a": "व्यक्तिगत खातों के लिए: वैध अंतरराष्ट्रीय पासपोर्ट या राष्ट्रीय पहचान पत्र और पते का प्रमाण (बिजली बिल या पिछले 90 दिनों का बैंक स्टेटमेंट)। कंपनी खातों के लिए: पंजीकरण प्रमाणपत्र, मेमोरेंडम और व्यावसायिक गतिविधि के प्रमाण।"
      },
      {
        "q": "साफ़ी अकादमी इस प्रक्रिया में कैसे सहायता करती है?",
        "a": "साफ़ी अकादमी दस्तावेज़ तैयार करने में मार्गदर्शन, प्राथमिक समीक्षा और आधिकारिक अंतरराष्ट्रीय साझेदारों के साथ संपर्क प्रदान करती है ताकि बिना किसी बाधा के आपको खाता मिल सके।"
      }
    ]
  },
  "it": {
    "isRtl": false,
    "archBadge": "01 / Architettura e reti",
    "archTitle": "Un'interfaccia finanziaria progettata come un prodotto ad alta tecnologia.",
    "archSubtitle": "Scopri le funzionalità offerte da ciascun canale e prepara con cura il tuo dossier per aprire un conto internazionale.",
    "verifiedCapabilitiesLabel": "Canali e protocolli bancari verificati:",
    "termsDisclaimer": "La disponibilità giurisdizionale e le condizioni commerciali sono confermate durante la fase di onboarding personalizzato.",
    "applyForPartner": "Richiedi conto con",
    "badge": "Infrastruttura bancaria globale",
    "heroTitle": "Banca internazionale senza confini.",
    "heroSubtitle": "Un'esperienza bancaria globale di prim'ordine per privati e aziende che operano con più valute e mercati digitali.",
    "startApplication": "Inizia la richiesta",
    "exploreProviders": "Esplora gli istituti",
    "settlementCurrencies": "Valute di regolamento supportate:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "IBAN commerciale multivaluta",
    "cardHolderLabel": "TITOLARE DELLA CARTA",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "SCADENZA",
    "personalTab": "Conto Personale",
    "businessTab": "Conto Aziendale (Business)",
    "providersBadge": "Istituti autorizzati",
    "providersTitle": "Istituti di moneta elettronica e canali bancari internazionali",
    "providersSub": "Confronta le caratteristiche istituzionali dei principali istituti di moneta elettronica (IMEL) regolamentati al mondo.",
    "selectProviderLabel": "Seleziona istituto:",
    "coreCapabilities": "Funzionalità chiave e reti conformi",
    "visitPortalBtn": "Visita piattaforma ufficiale",
    "applicationBadge": "Consulenza e pre-verifica dossier",
    "applicationTitle": "Richiesta di consulenza per apertura conto",
    "applicationSub": "Invia i tuoi dati per verificare la disponibilità territoriale, i requisiti societari e la conformità normativa.",
    "accountTypeLabel": "Tipologia di conto richiesta",
    "firstNameLabel": "Nome",
    "firstNamePlaceholder": "es. Marco",
    "lastNameLabel": "Cognome",
    "lastNamePlaceholder": "es. Rossi",
    "emailLabel": "E-mail aziendale o personale",
    "emailPlaceholder": "marco@example.com",
    "phoneLabel": "Telefono (con prefisso internazionale)",
    "phonePlaceholder": "+39 340 1234567",
    "countryLabel": "Paese di residenza o costituzione societaria",
    "countryPlaceholder": "es. Italia, Svizzera, Regno Unito, Germania",
    "companyNameLabel": "Ragione sociale ufficiale (per conti aziendali)",
    "companyNamePlaceholder": "es. Safi Global Solutions Srl",
    "companyRegLabel": "Numero REA / Partita IVA / Codice Fiscale",
    "companyRegPlaceholder": "es. IT12345678901 o codice fiscale",
    "submittingBtn": "Invio dossier in corso...",
    "submitBtn": "Invia dossier per la verifica",
    "successTitle": "Dossier ricevuto con successo",
    "successDesc": "I tuoi dati sono stati registrati. Il nostro team di conformità analizzerà la tua documentazione entro 1 giorno lavorativo.",
    "errorDesc": "Si è verificato un errore durante l'invio. Verifica la tua connessione e riprova.",
    "faqsBadge": "Conformità e normative",
    "faqsTitle": "Normativa, licenze e struttura dei conti",
    "features": [
      {
        "num": "01",
        "title": "Cassaforte multivaluta",
        "desc": "Detieni e converti le principali valute mondiali a tassi reali di mercato in oltre 40 paesi senza costi nascosti."
      },
      {
        "num": "02",
        "title": "Coordinate IBAN dedicate",
        "desc": "Ottieni coordinate bancarie locali dedicate in Europa (SEPA), Regno Unito (Faster Payments) e USA (ACH) a tuo nome."
      },
      {
        "num": "03",
        "title": "Carte virtuali e fisiche",
        "desc": "Emetti istantaneamente carte virtuali per server cloud, abbonamenti software e pubblicità internazionale."
      },
      {
        "num": "04",
        "title": "Rigorosa tutela normativa",
        "desc": "I fondi dei clienti sono protetti in conti segregati conformemente alle normative della FCA e della BCE."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Personale e Aziendale",
        "description": "Leader globale nei conti multivaluta con tasso reale di mercato, coordinate locali dedicate in 9+ valute e commissioni trasparenti.",
        "details": [
          "Coordinate bancarie locali (IBAN europeo, Routing USA, Sort Code britannico)",
          "Trasferimenti verso oltre 160 paesi nel mondo",
          "Pagamenti di massa per team e collaboratori internazionali",
          "Carte di debito fisiche e digitali per la gestione delle spese"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance e Commercio B2B",
        "description": "La scelta ideale per imprenditori digitali, venditori marketplace e professionisti che incassano da Upwork o Fiverr.",
        "details": [
          "Incasso diretto dai principali marketplace (Amazon, eBay, Upwork, Fiverr)",
          "Conti di ricezione in USD, EUR, GBP, CAD, JPY e AUD",
          "Pagamenti rapidi ai fornitori internazionali nelle loro valute locali",
          "Soluzioni di capitale circolante per negozi online in forte espansione"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Ibrido Cripto e Valute Tradizionali",
        "description": "Piattaforma finanziaria ibrida innovativa che unisce valute fiat e asset digitali con conversioni istantanee e carte con premi.",
        "details": [
          "Scambio istantaneo tra oltre 50 criptovalute e valute tradizionali",
          "Carta di debito con cashback Cryptoback fino all'8% sugli acquisti",
          "Zero commissioni di cambio per pagamenti all'estero e ottimi tassi",
          "Custodia regolamentata e portafogli freddi conformi alle norme"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Commercio all'Ingrosso",
        "description": "Piattaforma di pagamenti internazionali del gruppo Ant Group, pensata per importatori ed esportatori ad alto volume e catene asiatiche.",
        "details": [
          "Ottimizzata per grandi volumi di commercio internazionale e transazioni all'ingrosso",
          "Integrazione diretta con produttori asiatici (1688, Alibaba)",
          "Spread di cambio competitivi e contratti a termine per coprire il rischio cambio",
          "Gestione multiutente per i dipartimenti finanziari aziendali"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Questi conti sono identici a quelli delle banche tradizionali?",
        "a": "Questi conti sono forniti da Istituti di Moneta Elettronica (IMEL) autorizzati. Offrono codici IBAN e coordinate bancarie che funzionano esattamente come le banche ordinarie per bonifici SEPA, SWIFT e ACH, custodendo i fondi dei clienti in conti separati e protetti."
      },
      {
        "q": "Perché Safi Academy suggerisce diversi fornitori?",
        "a": "Ogni impresa ha esigenze differenti: Wise è ottimale per le transazioni ordinarie, Payoneer per compensi freelance e marketplace, Wirex unisce il mondo cripto e fiat, mentre WorldFirst è perfetta per importatori di beni su vasta scala."
      },
      {
        "q": "Ogni richiedente riceve coordinate bancarie europee o americane a proprio nome?",
        "a": "Sì. Al superamento delle verifiche di identità e conformità, ciascun fornitore rilascia coordinate di conto dedicate (come un IBAN SEPA europeo o un codice Routing USA) intestate al tuo nome personale o alla tua azienda."
      },
      {
        "q": "Quali documenti servono per l'apertura del conto?",
        "a": "Per i privati: passaporto o carta d'identità valida e prova di residenza emessa negli ultimi 90 giorni. Per le aziende: visura camerale o certificato di registrazione, statuto sociale e prova dell'attività d'impresa."
      },
      {
        "q": "Come assiste Safi Academy nella procedura?",
        "a": "Safi Academy fornisce supporto nella preparazione dei documenti, verifica preliminare della conformità e canali diretti con i partner per evitare rifiuti."
      }
    ]
  },
  "pt": {
    "isRtl": false,
    "archBadge": "01 / Arquitetura & Redes Financeiras",
    "archTitle": "Uma interface financeira concebida com os mais altos padrões tecnológicos.",
    "archSubtitle": "Conheça os canais bancários de cada provedor e prepare seu dossiê para abrir sua conta internacional.",
    "verifiedCapabilitiesLabel": "Canais e protocolos bancários verificados:",
    "termsDisclaimer": "A disponibilidade jurisdicional e as condições comerciais são confirmadas durante a assessoria personalizada.",
    "applyForPartner": "Solicitar conta com",
    "badge": "Infraestrutura bancária global",
    "heroTitle": "Bancos internacionais sem fronteiras.",
    "heroSubtitle": "Uma experiência de conta internacional de alto nível para pessoas e empresas que operam em múltiplas moedas e mercados digitais.",
    "startApplication": "Iniciar solicitação",
    "exploreProviders": "Explorar instituições",
    "settlementCurrencies": "Moedas de liquidação suportadas:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "IBAN comercial multimoeda",
    "cardHolderLabel": "TITULAR DO CARTÃO",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "VALIDADE",
    "personalTab": "Conta Pessoal",
    "businessTab": "Conta Corporativa (PJ)",
    "providersBadge": "Instituições credenciadas",
    "providersTitle": "Instituições de moeda eletrônica e canais bancários internacionais",
    "providersSub": "Compare os recursos institucionais entre as principais instituições de moeda eletrônica (EMI) regulamentadas mundialmente.",
    "selectProviderLabel": "Selecione a instituição:",
    "coreCapabilities": "Recursos essenciais e redes em conformidade",
    "visitPortalBtn": "Acessar plataforma oficial",
    "applicationBadge": "Assessoria e pré-análise",
    "applicationTitle": "Solicitação de assessoria para abertura de conta",
    "applicationSub": "Envie suas informações para verificar a disponibilidade por país, requisitos corporativos e pré-qualificação jurídica.",
    "accountTypeLabel": "Tipo de conta pretendida",
    "firstNameLabel": "Nome",
    "firstNamePlaceholder": "ex: Rodrigo",
    "lastNameLabel": "Sobrenome",
    "lastNamePlaceholder": "ex: Silva",
    "emailLabel": "E-mail corporativo ou pessoal",
    "emailPlaceholder": "rodrigo@example.com",
    "phoneLabel": "Telefone (com DDI do país)",
    "phonePlaceholder": "+55 11 98765-4321",
    "countryLabel": "País de residência ou abertura da empresa",
    "countryPlaceholder": "ex: Brasil, Portugal, EUA, Reino Unido",
    "companyNameLabel": "Razão social oficial da empresa",
    "companyNamePlaceholder": "ex: Safi Global Tech Ltda",
    "companyRegLabel": "CNPJ / NIF / Número de registro da empresa",
    "companyRegPlaceholder": "ex: 12.345.678/0001-90 ou Tax ID",
    "submittingBtn": "Enviando dossiê...",
    "submitBtn": "Enviar dossiê para análise",
    "successTitle": "Dossiê recebido com sucesso",
    "successDesc": "Seus dados foram registrados com sucesso. Nossa equipe de assessoria analisará seus documentos dentro de 1 dia útil.",
    "errorDesc": "Ocorreu um erro ao enviar sua solicitação. Verifique sua conexão e tente novamente.",
    "faqsBadge": "Conformidade e Regulação",
    "faqsTitle": "Conformidade, licenças e estrutura de contas",
    "features": [
      {
        "num": "01",
        "title": "Cofre multimoeda seguro",
        "desc": "Mantenha e converta as principais moedas mundiais com taxas reais de mercado em mais de 40 países sem taxas ocultas."
      },
      {
        "num": "02",
        "title": "Dados bancários IBAN dedicados",
        "desc": "Receba contas locais dedicadas na Europa (SEPA), Reino Unido (Faster Payments) e EUA (ACH) em seu nome ou de sua empresa."
      },
      {
        "num": "03",
        "title": "Cartões virtuais e físicos",
        "desc": "Emita cartões virtuais instantaneamente para servidores em nuvem, ferramentas SaaS e campanhas de anúncios internacionais."
      },
      {
        "num": "04",
        "title": "Rigorosa proteção regulatória",
        "desc": "Os fundos dos clientes são mantidos em contas segregadas e protegidas sob a supervisão da FCA britânica e do Banco Central Europeu."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Pessoa Física e Jurídica",
        "description": "Líder mundial em contas multimoeda com taxa de câmbio comercial real, dados de conta locais em mais de 9 moedas e tarifas transparentes.",
        "details": [
          "Dados de conta bancária local direta (IBAN europeu, Routing americano, Sort Code britânico)",
          "Transferências de e para mais de 160 países ao redor do mundo",
          "Pagamentos em lote automatizados para equipes e prestadores internacionais",
          "Cartões de débito físicos e digitais para gestão de despesas empresariais"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance e Comércio B2B",
        "description": "A melhor escolha para empreendedores digitais, vendedores de marketplaces globais e freelancers que recebem de plataformas como Upwork e Fiverr.",
        "details": [
          "Recebimento direto das principais plataformas (Amazon, eBay, Upwork, Fiverr)",
          "Contas de recebimento em USD, EUR, GBP, CAD, JPY e AUD",
          "Pagamentos rápidos a fornecedores globais em moedas locais",
          "Soluções de capital de giro para empresas de e-commerce em crescimento"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Híbrido Cripto e Moeda Tradicional",
        "description": "Plataforma financeira híbrida inovadora que conecta perfeitamente moedas fiduciárias e criptoativos com conversões imediatas e cartões com cashback.",
        "details": [
          "Conversão imediata entre mais de 50 criptomoedas e moedas fiduciárias tradicionais",
          "Cartão de débito com recompensas Cryptoback de até 8% em compras",
          "Zero taxa de câmbio em transações internacionais e taxas OTC competitivas",
          "Custódia regulamentada e armazenamento em carteiras frias de alta segurança"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Comércio Atacadista",
        "description": "Plataforma de pagamentos transfronteiriços do Ant Group para empresas de importação/exportação de alto volume e cadeia de suprimentos asiática.",
        "details": [
          "Otimizada para grandes volumes de pagamentos de comércio internacional",
          "Integração direta com fabricantes e fornecedores na Ásia (1688, Alibaba)",
          "Spreads de câmbio competitivos e contratos a termo para proteção cambial",
          "Gestão multiusuário com hierarquia corporativa para equipes financeiras"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Essas contas são iguais às contas de bancos tradicionais?",
        "a": "Essas contas são emitidas por Instituições de Moeda Eletrônica (EMI) devidamente autorizadas. Elas fornecem códigos IBAN e dados bancários dedicados que operam exatamente como bancos tradicionais para transferências SEPA, SWIFT e ACH, com seus fundos protegidos em contas segregadas."
      },
      {
        "q": "Por que a Safi Academy apresenta vários fornecedores?",
        "a": "Cada modelo de negócio possui necessidades diferentes: a Wise é ideal para movimentações rotineiras, a Payoneer se destaca para marketplaces e freelancers, a Wirex une cripto a moedas fiat e a WorldFirst é indicada para grandes importadores."
      },
      {
        "q": "Cada solicitante recebe dados de conta europeus ou americanos em seu nome?",
        "a": "Sim. Após a aprovação da verificação de identidade e conformidade, cada instituição gera dados de conta locais dedicados (como um IBAN europeu ou número de conta e Routing dos EUA) emitidos em seu nome ou no de sua empresa."
      },
      {
        "q": "Quais documentos são exigidos para a abertura da conta?",
        "a": "Para contas pessoais: passaporte válido ou documento nacional de identidade e comprovante de endereço recente (emitido nos últimos 90 dias). Para empresas: contrato social, certidão de registro da empresa e comprovação de atividade comercial."
      },
      {
        "q": "Como a Safi Academy auxilia no processo de solicitação?",
        "a": "A Safi Academy oferece orientação na estruturação dos documentos, pré-análise dos comprovantes e direcionamento direto aos canais oficiais das instituições parceiras para evitar rejeições."
      }
    ]
  },
  "ja": {
    "isRtl": false,
    "archBadge": "01 / 金融ネットワーク構造",
    "archTitle": "最高峰の技術基準で設計された国際金融インターフェース。",
    "archSubtitle": "各金融機関の清算ネットワークの特徴を把握し、海外口座開設のための書類を正確に準備します。",
    "verifiedCapabilitiesLabel": "検証済みの決済チャネルおよび対応ネットワーク:",
    "termsDisclaimer": "国・地域別の対応状況や最終条件は、専任担当者による個別確認時に確定されます。",
    "applyForPartner": "口座開設を申請する：",
    "badge": "グローバルバンキング基盤",
    "heroTitle": "国境のないグローバルバンキング。",
    "heroSubtitle": "複数通貨、多国間取引、デジタル市場で活躍する個人および法人のための高品質な国際口座開設ソリューション。",
    "startApplication": "申請を開始する",
    "exploreProviders": "提携金融機関を見る",
    "settlementCurrencies": "対応決済通貨一覧:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "法人向けマルチカレンシーIBAN",
    "cardHolderLabel": "カード名義人",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "有効期限",
    "personalTab": "個人口座",
    "businessTab": "法人口座 (ビジネス)",
    "providersBadge": "正規ライセンス認可機関",
    "providersTitle": "厳選された国際電子マネー機関 (EMI) および決済レール",
    "providersSub": "世界規模で金融ライセンスを保有する大手電子マネー機関（EMI）の機能と特徴を比較検討できます。",
    "selectProviderLabel": "金融機関を選択:",
    "coreCapabilities": "主要機能およびコンプライアンス適合レール",
    "visitPortalBtn": "公式プラットフォームへ進む",
    "applicationBadge": "個別相談および事前書類審査",
    "applicationTitle": "国際口座開設の事前審査・相談申込",
    "applicationSub": "基本情報をご送信いただき、対応地域、法人要件、コンプライアンス適格性を事前にチェックします。",
    "accountTypeLabel": "ご希望の口座種別",
    "firstNameLabel": "名（ファーストネーム）",
    "firstNamePlaceholder": "例: 太郎 (Taro)",
    "lastNameLabel": "姓（ラストネーム）",
    "lastNamePlaceholder": "例: 山田 (Yamada)",
    "emailLabel": "業務用または個人のメールアドレス",
    "emailPlaceholder": "taro@example.com",
    "phoneLabel": "電話番号（国番号付き）",
    "phonePlaceholder": "+81 90 1234 5678",
    "countryLabel": "居住国または法人設立国",
    "countryPlaceholder": "例: 日本、イギリス、アメリカ、シンガポール",
    "companyNameLabel": "法人の正式英文名称（法人口座の場合）",
    "companyNamePlaceholder": "例: Safi Global Trading Ltd.",
    "companyRegLabel": "法人登録番号 / 法人番号",
    "companyRegPlaceholder": "例: 13桁の法人番号または税務番号",
    "submittingBtn": "申請書類を送信中...",
    "submitBtn": "審査用書類を提出する",
    "successTitle": "申請を正常に受領しました",
    "successDesc": "ご入力情報が正常に登録されました。弊校のコンプライアンス担当チームが1営業日以内に書類の事前確認を行います。",
    "errorDesc": "送信中にエラーが発生しました。インターネット接続をご確認の上、再度お試しください。",
    "faqsBadge": "法規制とコンプライアンス",
    "faqsTitle": "法令遵守・ライセンス・口座構造に関するご案内",
    "features": [
      {
        "num": "01",
        "title": "安全なマルチカレンシー金庫",
        "desc": "隠れた手数料なしで、市場の実勢レート（ミッドマーケットレート）に基づき主要通貨を安全に保有・両替できます。"
      },
      {
        "num": "02",
        "title": "専用の現地IBAN口座情報",
        "desc": "欧州（SEPA）、英国（Faster Payments）、米国（ACH）において、ご自身または貴社名義の口座情報を取得可能です。"
      },
      {
        "num": "03",
        "title": "バーチャルおよび実物カード",
        "desc": "クラウドサーバー費用、SaaSツールのサブスクリプション、海外広告出稿のためにバーチャルカードを即時発行。"
      },
      {
        "num": "04",
        "title": "厳格な規制による資産保全",
        "desc": "顧客資産は英国FCAおよび欧州中央銀行の指針に基づき、分別管理口座で100%安全に保護されています。"
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "個人・法人共通",
        "description": "実勢為替レートと明瞭な格安手数料、9種類以上の通貨で現地口座情報が取得できる多通貨口座の世界標準プラットフォーム。",
        "details": [
          "現地の銀行口座情報を直接取得（欧州SEPA IBAN、米国ルーティング番号、英国ソートコード）",
          "世界160カ国以上への迅速な送金および受取に対応",
          "海外スタッフや契約先への一括給与支払い自動化機能",
          "経費管理を効率化する実物およびバーチャルデビットカード"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "フリーランス・越境EC向け",
        "description": "デジタル起業家、Amazonグローバル出品者、UpworkやFiverrなどの海外受託案件で外貨報酬を得る方に最適な決済基盤。",
        "details": [
          "大手マーケットプレイス（Amazon、eBay、Upwork、Fiverr）からの直接売上回収",
          "米ドル、ユーロ、ポンド、カナダドル、日本円、豪ドルでの現地受取口座",
          "現地通貨建てによる海外サプライヤーへの迅速な支払い",
          "成長期にある越境EC事業者のための運転資金サポート"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "暗号資産と法定通貨のハイブリッド",
        "description": "法定通貨と暗号資産をシームレスに統合し、即時スワップやキャッシュバック付きカードを提供する次世代金融サービス。",
        "details": [
          "50種類以上の暗号資産と主要法定通貨との間の即時両替",
          "ショッピング利用時に最大8%のCryptoback還元が付与されるデビットカード",
          "海外決済時の為替手数料ゼロおよび有利な大口OTCレート",
          "国際規格に準拠した強固なコールドストレージ資産保管"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "大口貿易・企業間取引",
        "description": "アントグループ（Ant Group）傘下の法人向け越境決済プラットフォーム。大口輸出入事業者やアジア調達網に最適化。",
        "details": [
          "大口の国際貿易決済および卸売取引に特化して最適化された高速処理",
          "中国・アジア圏の製造サプライチェーン（1688、Alibaba）との緊密な連携",
          "競争力ある為替スプレッドおよび為替リスクヘッジ用の先渡予約",
          "企業の財務管理部門向けの権限階層・複数ユーザー管理機能"
        ]
      }
    ],
    "faqs": [
      {
        "q": "これらの口座は従来の一般銀行の口座と同じですか？",
        "a": "これらの口座は正規ライセンスを受けた電子マネー機関（EMI）により提供されます。SEPA、SWIFT、ACHに対応した専用のIBANや口座番号が発行され、日常的な送金・受取において一般の商業銀行と同様に機能し、資金は分別保全されます。"
      },
      {
        "q": "なぜSafi Academyは複数の金融機関を提案しているのですか？",
        "a": "起業家によって必要な機能が異なるためです。日常的な多通貨決済にはWise、フリーランスやEC売上にはPayoneer、暗号資産の活用にはWirex、大口貿易にはWorldFirstが適しています。"
      },
      {
        "q": "申請者は欧州や米国の自分名義の口座情報を取得できますか？",
        "a": "はい。ご本人確認およびコンプライアンス審査の完了後、各機関より個人名義または貴社の法人名義で現地の正式な受取口座番号（欧州IBANや米国口座番号など）が発行されます。"
      },
      {
        "q": "口座開設にはどのような書類が必要ですか？",
        "a": "個人の場合：有効期限内のパスポート等の公的身分証、直近90日以内に発行された住所確認書類（公共料金領収書等）。法人の場合：登記簿謄本、定款、代表者・主要株主の身分証、事業実態を示す資料等が必要です。"
      },
      {
        "q": "Safi Academyはどのように申請をサポートしますか？",
        "a": "Safi Academyは書類準備のアドバイス、事前チェック、公式なパートナー提携窓口への連携を行い、不要な審査却下を防いで円滑な開設を支援します。"
      }
    ]
  },
  "ko": {
    "isRtl": false,
    "archBadge": "01 / 금융 아키텍처 및 네트워크",
    "archTitle": "최고 수준의 기술 표준으로 구축된 글로벌 금융 인터페이스.",
    "archSubtitle": "각 결제망의 특징을 파악하고 정확한 서류 준비를 통해 신뢰할 수 있는 해외 계좌 개설을 준비하십시오.",
    "verifiedCapabilitiesLabel": "검증된 은행 채널 및 공식 프로토콜:",
    "termsDisclaimer": "국가별 최종 이용 가능 여부 및 수수료 조건은 맞춤형 심사 과정에서 확정됩니다.",
    "applyForPartner": "계좌 개설 신청하기:",
    "badge": "글로벌 뱅킹 인프라",
    "heroTitle": "국경 없는 글로벌 뱅킹 솔루션.",
    "heroSubtitle": "다양한 통화, 해외 시장, 글로벌 디지털 비즈니스를 운영하는 개인과 기업을 위한 프리미엄 국제 계좌 경험.",
    "startApplication": "신청 시작하기",
    "exploreProviders": "제휴 금융기관 확인",
    "settlementCurrencies": "지원 정산 통화 목록:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "기업용 다통화 상업용 IBAN",
    "cardHolderLabel": "카드 소유자",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "유효기간",
    "personalTab": "개인 계좌",
    "businessTab": "기업(법인) 계좌",
    "providersBadge": "정식 인가 기관",
    "providersTitle": "엄선된 국제 전자화폐기관(EMI) 및 은행 결제망",
    "providersSub": "전 세계적으로 공인된 전자화폐기관(EMI)의 기업 지원 기능을 체계적으로 비교하십시오.",
    "selectProviderLabel": "금융기관 선택:",
    "coreCapabilities": "핵심 기능 및 규정 준수 결제망",
    "visitPortalBtn": "공식 플랫폼 방문",
    "applicationBadge": "상담 및 서류 사전 검토",
    "applicationTitle": "해외 은행 계좌 개설을 위한 사전 심사 신청",
    "applicationSub": "기본 정보를 제출하시면 지역별 승인 가능 여부와 법인 요건 및 규정 준수 상태를 사전 검토해 드립니다.",
    "accountTypeLabel": "신청 계좌 유형",
    "firstNameLabel": "이름",
    "firstNamePlaceholder": "예: 민수",
    "lastNameLabel": "성",
    "lastNamePlaceholder": "예: 김",
    "emailLabel": "회사 또는 개인 이메일",
    "emailPlaceholder": "minsu@example.com",
    "phoneLabel": "전화번호 (국가번호 포함)",
    "phonePlaceholder": "+82 10 1234 5678",
    "countryLabel": "거주 국가 또는 법인 설립 국가",
    "countryPlaceholder": "예: 대한민국, 영국, 미국, 싱가포르",
    "companyNameLabel": "공식 영문 법인명 (기업 계좌의 경우)",
    "companyNamePlaceholder": "예: Safi Global Tech Ltd.",
    "companyRegLabel": "사업자 등록번호 / 법인 등록번호",
    "companyRegPlaceholder": "예: 123-45-67890 또는 Tax ID",
    "submittingBtn": "서류 제출 중...",
    "submitBtn": "사전 심사 서류 제출하기",
    "successTitle": "서류가 성공적으로 접수되었습니다",
    "successDesc": "신청 정보가 시스템에 안전하게 등록되었습니다. 전문 상담팀이 영업일 기준 1일 이내에 적격성을 검토합니다.",
    "errorDesc": "제출 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해 주십시오.",
    "faqsBadge": "규정 준수 및 법적 요건",
    "faqsTitle": "금융 규제, 라이선스 및 계좌 운영 구조",
    "features": [
      {
        "num": "01",
        "title": "안전한 다통화 금고",
        "desc": "숨겨진 수수료 없이 실시간 시장 매매기준율로 40개국 이상의 주요 통화를 보유하고 환전할 수 있습니다."
      },
      {
        "num": "02",
        "title": "전용 로컬 IBAN 계좌",
        "desc": "유럽(SEPA), 영국(Faster Payments), 미국(ACH)에서 본인 또는 회사 명의의 현지 계좌 정보를 발급받습니다."
      },
      {
        "num": "03",
        "title": "가상 및 실물 결제 카드",
        "desc": "클라우드 인프라, SaaS 소프트웨어 구독, 해외 디지털 광고비 결제를 위한 가상 카드를 즉시 발급합니다."
      },
      {
        "num": "04",
        "title": "엄격한 자산 분리 보관",
        "desc": "고객 예치금은 영국 FCA 및 유럽중앙은행 규정에 따라 법적으로 분리된 신탁 계좌에 100% 안전하게 보호됩니다."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "개인 및 기업용",
        "description": "실제 시장 환율 적용, 9개 이상 통화의 현지 계좌 발급, 투명하고 저렴한 수수료를 자랑하는 글로벌 다통화 계좌의 선두주자.",
        "details": [
          "직접적인 현지 은행 계좌 정보 제공 (유럽 SEPA IBAN, 미국 라우팅 번호, 영국 소트코드)",
          "전 세계 160개국 이상으로의 신속한 송금 및 수취 지원",
          "해외 원격 근무자 및 계약업체를 위한 대량 급여 일괄 지급 시스템",
          "법인 경비 관리를 위한 실물 및 디지털 직불카드 제공"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "프리랜서 및 B2B 정산",
        "description": "디지털 창업가, 아마존 해외 판매자, Upwork와 Fiverr 등 글로벌 플랫폼에서 외화 수익을 정산받는 프리랜서를 위한 필수 솔루션.",
        "details": [
          "글로벌 마켓플레이스 (Amazon, eBay, Upwork, Fiverr) 정산금 직접 수취",
          "USD, EUR, GBP, CAD, JPY, AUD 통화별 현지 수취 계좌 지원",
          "해외 공급업체 및 파트너에게 현지 통화로 신속한 송금 가능",
          "성장하는 글로벌 이커머스 셀러를 위한 운전자본 솔루션"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "가상자산-법정화폐 하이브리드",
        "description": "전통적인 법정화폐와 가상자산을 매끄럽게 연결하며 실시간 스왑과 캐시백 카드를 제공하는 혁신적인 하이브리드 금융 플랫폼.",
        "details": [
          "50종 이상의 암호화폐와 주요 전통 법정화폐 간의 즉각적인 교환",
          "결제 시 최대 8% Cryptoback 리워드를 제공하는 차세대 직불카드",
          "해외 결제 시 환전 수수료 0% 및 유리한 기관용 OTC 환율 적용",
          "국제 보안 기준을 준수하는 콜드 스토리지 규제 자산 보관"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "대규모 무역 및 B2B",
        "description": "앤트그룹(Ant Group) 산하의 기업용 국경 간 결제 플랫폼으로, 대규모 수출입 기업과 아시아 공급망 결제에 특화되어 있습니다.",
        "details": [
          "대량 해외 무역 결제 및 도매 거래에 최적화된 고속 처리망",
          "중국 및 아시아 주요 제조 공급망 (1688, Alibaba)과의 완벽한 연동",
          "환율 변동 위험을 헤지하기 위한 선물환 계약 및 경쟁력 있는 환율 스프레드",
          "기업 재무팀을 위한 다중 사용자 권한 관리 체계"
        ]
      }
    ],
    "faqs": [
      {
        "q": "이 계좌들은 일반 시중 은행 계좌와 동일한가요?",
        "a": "이 계좌들은 공식 인가를 받은 전자화폐기관(EMI)을 통해 제공됩니다. SEPA, SWIFT, ACH 송금을 위해 본인 명의의 고유한 IBAN과 계좌번호가 발급되어 일반 은행과 동일하게 작동하며, 자금은 별도 분리 계좌에 안전하게 예치됩니다."
      },
      {
        "q": "Safi Academy에서 여러 파트너를 소개하는 이유는 무엇인가요?",
        "a": "사업 모델마다 최적의 솔루션이 다릅니다. Wise는 일상적인 다통화 환전 및 송금에, Payoneer는 마켓플레이스 정산에, Wirex는 암호화폐 연동에, WorldFirst는 대규모 수출입 결제에 특화되어 있습니다."
      },
      {
        "q": "신청자 본인 명의의 유럽이나 미국 계좌를 발급받을 수 있나요?",
        "a": "네, 그렇습니다. 신원 확인 및 규정 준수 승인이 완료되면 각 금융기관에서 본인 또는 귀사 법인 명의로 된 현지 수취 계좌(유럽 SEPA IBAN 또는 미국 ACH 번호 등)를 정식으로 발급합니다."
      },
      {
        "q": "계좌 개설에 필요한 필수 서류는 무엇인가요?",
        "a": "개인 계좌: 유효한 여권 또는 신분증, 90일 이내 발급된 영문 거주지 증명서(공과금 고지서 또는 은행 잔고증명서). 법인 계좌: 사업자등록증 또는 법인설립인가증, 정관, 주주 및 대표자 신분증, 실제 사업 활동 증빙자료."
      },
      {
        "q": "Safi Academy는 어떤 지원을 제공하나요?",
        "a": "Safi Academy는 서류 준비 가이드, 사전 검토, 공식 제휴 채널을 통한 직접 신청 지원을 제공하여 불필요한 거절을 예방하고 원활한 계좌 개설을 돕습니다."
      }
    ]
  },
  "nl": {
    "isRtl": false,
    "archBadge": "01 / Architectuur & Infrastructuur",
    "archTitle": "Een financiële interface ontworpen als een hoogwaardig product.",
    "archSubtitle": "Ontdek de mogelijkheden van elk betalingsnetwerk en bereid uw dossier voor om een internationale rekening te openen.",
    "verifiedCapabilitiesLabel": "Geverifieerde bankkanalen en protocollen:",
    "termsDisclaimer": "Definitieve beschikbaarheid per regio en tarieven worden bevestigd tijdens de persoonlijke adviesfase.",
    "applyForPartner": "Rekening aanvragen bij",
    "badge": "Wereldwijde bankinfrastructuur",
    "heroTitle": "Internationaal bankieren zonder grenzen.",
    "heroSubtitle": "Een eersteklas internationale rekeningervaring voor particulieren en bedrijven die wereldwijd opereren met meerdere valuta's.",
    "startApplication": "Aanvraag starten",
    "exploreProviders": "Aanbieders bekijken",
    "settlementCurrencies": "Ondersteunde afwikkelingsvaluta's:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Zakelijke multi-valuta IBAN",
    "cardHolderLabel": "KAARTHOUDER",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "VERVALDATUM",
    "personalTab": "Particuliere rekening",
    "businessTab": "Zakelijke rekening (Bedrijf)",
    "providersBadge": "Gelicentieerde instellingen",
    "providersTitle": "Toonaangevende elektronischgeldinstellingen & bankkanalen",
    "providersSub": "Vergelijk de mogelijkheden van gereguleerde elektronischgeldinstellingen (EMI's) wereldwijd.",
    "selectProviderLabel": "Kies instelling:",
    "coreCapabilities": "Kernfuncties & gereguleerde netwerken",
    "visitPortalBtn": "Bezoek officieel platform",
    "applicationBadge": "Advies & Dossiercontrole",
    "applicationTitle": "Adviesgesprek voor rekeningaanvraag",
    "applicationSub": "Verstuur uw gegevens voor een voorafgaande controle van regionale beschikbaarheid en compliance.",
    "accountTypeLabel": "Gewenst rekeningtype",
    "firstNameLabel": "Voornaam",
    "firstNamePlaceholder": "bijv. Daan",
    "lastNameLabel": "Achternaam",
    "lastNamePlaceholder": "bijv. de Vries",
    "emailLabel": "Zakelijk of persoonlijk e-mailadres",
    "emailPlaceholder": "daan@example.com",
    "phoneLabel": "Telefoonnummer (met landcode)",
    "phonePlaceholder": "+31 6 12345678",
    "countryLabel": "Land van verblijf of oprichting",
    "countryPlaceholder": "bijv. Nederland, België, Duitsland, VK",
    "companyNameLabel": "Officiële bedrijfsnaam (voor zakelijke rekeningen)",
    "companyNamePlaceholder": "bijv. Safi Global Solutions BV",
    "companyRegLabel": "KvK-nummer / Btw-nummer",
    "companyRegPlaceholder": "bijv. 12345678 of NL123456789B01",
    "submittingBtn": "Dossier wordt verzonden...",
    "submitBtn": "Dossier indienen voor controle",
    "successTitle": "Dossier succesvol ontvangen",
    "successDesc": "Uw gegevens zijn geregistreerd. Ons adviesteam beoordeelt uw documenten binnen 1 werkdag.",
    "errorDesc": "Er is een fout opgetreden bij het verzenden. Controleer uw internetverbinding en probeer het opnieuw.",
    "faqsBadge": "Compliance & Regelgeving",
    "faqsTitle": "Wetgeving, licenties en rekeningstructuur",
    "features": [
      {
        "num": "01",
        "title": "Veilige multi-valuta kluis",
        "desc": "Beheer en wissel belangrijke wereldvaluta's tegen echte middenkoersen in meer dan 40 landen zonder verborgen kosten."
      },
      {
        "num": "02",
        "title": "Toegewezen IBAN-rekeningen",
        "desc": "Ontvang lokale bankgegevens in Europa (SEPA), het Verenigd Koninkrijk en de VS (ACH) op uw eigen naam."
      },
      {
        "num": "03",
        "title": "Virtuele en fysieke kaarten",
        "desc": "Genereer direct virtuele betaalkaarten voor cloudservers, softwarelicenties en internationale advertenties."
      },
      {
        "num": "04",
        "title": "Strikte wettelijke bescherming",
        "desc": "Klanttegoeden worden bewaard op gescheiden derdengeldenrekeningen conform de richtlijnen van de FCA en de ECB."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Particulier & Zakelijk",
        "description": "Wereldleider in multi-valuta rekeningen met de werkelijke wisselkoers, lokale bankgegevens in 9+ valuta's en lage transparante kosten.",
        "details": [
          "Directe lokale rekeningnummers (Europese IBAN, Amerikaanse Routing, Britse Sort Code)",
          "Geld overmaken naar en ontvangen uit meer dan 160 landen",
          "Geautomatiseerde batchbetalingen voor internationale salarissen en freelancers",
          "Fysieke en digitale betaalpassen voor zakelijke uitgaven"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelancers & E-commerce",
        "description": "Ideaal voor digitale ondernemers, marketplaceverkopers en freelancers die inkomsten ontvangen via Upwork of Fiverr.",
        "details": [
          "Direct uitbetalen vanaf wereldwijde platforms (Amazon, eBay, Upwork, Fiverr)",
          "Ontvangstrekeningen in USD, EUR, GBP, CAD, JPY en AUD",
          "Snelle betalingen aan internationale leveranciers in lokale valuta",
          "Werkkapitaaloplossingen voor groeiende webwinkels"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Hybride Crypto & Fiat",
        "description": "Innovatief hybride financieel platform dat traditionele valuta en digitale activa naadloos combineert met betaalpassen en cashback.",
        "details": [
          "Direct wisselen tussen meer dan 50 cryptocurrencies en traditionele valuta",
          "Betaalpas met tot wel 8% Cryptoback beloningen op aankopen",
          "0% wisselkoersopslag bij buitenlandse betalingen",
          "Gereguleerde bewaring met koude opslag volgens hoge veiligheidseisen"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Grootzakelijke handel",
        "description": "Internationaal betalingsplatform van Ant Group, ontworpen voor import-/exportbedrijven met hoge volumes en Aziatische toeleveringsketens.",
        "details": [
          "Geoptimaliseerd voor grote volumes aan internationale handelstransacties",
          "Directe integratie met Aziatische fabrikanten en groothandels (1688, Alibaba)",
          "Scherpe wisselkoersen en termijncontracten voor valutarisicobeheer",
          "Beheer voor meerdere gebruikers binnen zakelijke financiële teams"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Zijn deze rekeningen hetzelfde als die bij een traditionele bank?",
        "a": "Deze rekeningen worden uitgegeven door erkende elektronischgeldinstellingen (EMI's). Ze bieden volwaardige IBAN's en bankcodes die voor SEPA, SWIFT en ACH net zo werken als traditionele banken, waarbij uw tegoeden veilig op gescheiden rekeningen staan."
      },
      {
        "q": "Waarom beveelt Safi Academy meerdere aanbieders aan?",
        "a": "Elke ondernemer heeft andere behoeften: Wise is uitstekend voor dagelijkse transacties, Payoneer is perfect voor freelance- en platforminkomsten, Wirex verbindt crypto met fiat, en WorldFirst is ontworpen voor groothandel en import."
      },
      {
        "q": "Krijgt elke aanvrager eigen Europese of Amerikaanse rekeninggegevens?",
        "a": "Ja. Na succesvolle identiteitsverificatie en compliance-goedkeuring verstrekt elke instelling lokale rekeninggegevens (zoals een Europese IBAN of Amerikaans rekeningnummer) op uw eigen naam of bedrijfsnaam."
      },
      {
        "q": "Welke documenten zijn vereist voor het openen van een rekening?",
        "a": "Voor particulieren: geldig paspoort of ID-kaart en een adresbewijs van maximaal 90 dagen oud. Voor bedrijven: uittreksel KvK, oprichtingsstatuten en bewijs van daadwerkelijke bedrijfsactiviteit."
      },
      {
        "q": "Hoe helpt Safi Academy bij de aanvraag?",
        "a": "Safi Academy helpt bij het correct opstellen van uw documenten, voert een voorcontrole uit en biedt rechtstreekse kanalen naar de compliance-afdelingen van partners om afwijzingen te voorkomen."
      }
    ]
  },
  "uz": {
    "isRtl": false,
    "archBadge": "01 / Moliyaviy arxitektura va tarmoqlar",
    "archTitle": "Yuqori texnologik standartlar asosida yaratilgan zamonaviy moliyaviy interfeys.",
    "archSubtitle": "Har bir to'lov kanalining imkoniyatlarini o'rganing va xalqaro hisob ochish uchun hujjatlaringizni to'g'ri tayyorlang.",
    "verifiedCapabilitiesLabel": "Tasdiqlangan bank kanallari va protokollari:",
    "termsDisclaimer": "Hududiy mavjudlik va yakuniy xizmat ko'rsatish shartlari shaxsiy maslahat bosqichida tasdiqlanadi.",
    "applyForPartner": "Hisob ochish uchun ariza:",
    "badge": "Global bank infratuzilmasi",
    "heroTitle": "Chegarasiz xalqaro bank xizmatlari.",
    "heroSubtitle": "Ko'p valyutada, xorijiy bozorlarda va xalqaro platformalarda faoliyat yurituvchi jismoniy shaxslar va bizneslar uchun premium hisob ochish imkoniyati.",
    "startApplication": "Arizani boshlash",
    "exploreProviders": "Moliya muassasalarini ko'rish",
    "settlementCurrencies": "Qo'llab-quvvatlanadigan hisob-kitob valyutalari:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "Ko'p valyutali tijoriy IBAN",
    "cardHolderLabel": "KARTA EGASI",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "AMAL QILISH MUDDATI",
    "personalTab": "Jismoniy shaxs hisobi",
    "businessTab": "Yuridik shaxs (Biznes) hisobi",
    "providersBadge": "Litsenziyalangan muassasalar",
    "providersTitle": "Yetakchi elektron pul institutlari (EMI) va xalqaro bank kanallari",
    "providersSub": "Xalqaro litsenziyaga ega nufuzli elektron pul institutlarining (EMI) imkoniyatlarini taqqoslang.",
    "selectProviderLabel": "Moliya muassasasini tanlang:",
    "coreCapabilities": "Asosiy imkoniyatlar va qonuniy to'lov tarmoqlari",
    "visitPortalBtn": "Rasmiy veb-saytga o'tish",
    "applicationBadge": "Maslahat va dastlabki tekshiruv",
    "applicationTitle": "Xalqaro hisob ochish bo'yicha maslahat olish",
    "applicationSub": "Hududiy mavjudlik, korporativ talablar va hujjatlar muvofiqligini dastlabki tekshirish uchun ma'lumotlaringizni yuboring.",
    "accountTypeLabel": "Kerakli hisob turi",
    "firstNameLabel": "Ism",
    "firstNamePlaceholder": "Masalan: Sardor",
    "lastNameLabel": "Familiya",
    "lastNamePlaceholder": "Masalan: Karimov",
    "emailLabel": "Ishchi yoki shaxsiy elektron pochta",
    "emailPlaceholder": "sardor@example.com",
    "phoneLabel": "Telefon raqami (mamlakat kodi bilan)",
    "phonePlaceholder": "+998 90 123 45 67",
    "countryLabel": "Yashash mamlakati yoki kompaniya ro'yxatdan o'tgan davlat",
    "countryPlaceholder": "Masalan: O'zbekiston, Buyuk Britaniya, BAA",
    "companyNameLabel": "Kompaniyaning rasmiy nomi (biznes hisoblar uchun)",
    "companyNamePlaceholder": "Masalan: Safi Global Logistics LLC",
    "companyRegLabel": "Kompaniya ro'yxatdan o'tish raqami / STIR (INN)",
    "companyRegPlaceholder": "Masalan: 123456789 yoki STIR",
    "submittingBtn": "Ma'lumotlar yuborilmoqda...",
    "submitBtn": "Hujjatlarni tekshiruvga yuborish",
    "successTitle": "Arizangiz muvaffaqiyatli qabul qilindi",
    "successDesc": "Ma'lumotlaringiz tizimga kiritildi. Mutaxassislarimiz 1 ish kuni ichida hujjatlaringizni qonuniy me'yorlar asosida ko'rib chiqadi.",
    "errorDesc": "Yuborishda xatolik yuz berdi. Internet aloqasini tekshiring yoki qayta urinib ko'ring.",
    "faqsBadge": "Huquqiy talablar va tartibga solish",
    "faqsTitle": "Qonuniy talablar, litsenziyalar va hisob tuzilishi",
    "features": [
      {
        "num": "01",
        "title": "Xavfsiz ko'p valyutali hamyon",
        "desc": "Yashirin komissiyalarsiz, real bozor kurslari bo'yicha 40 dan ortiq mamlakatda asosiy valyutalarni saqlash va ayirboshlash."
      },
      {
        "num": "02",
        "title": "Shaxsiy IBAN bank rekvizitlari",
        "desc": "Yevropa (SEPA), Buyuk Britaniya (Faster Payments) va AQSh (ACH) hududlarida o'z nomingizga mahalliy hisob rekvizitlarini olish."
      },
      {
        "num": "03",
        "title": "Virtual va plastik kartalar",
        "desc": "Bulutli serverlar, dasturiy ta'minot obunalari va xalqaro onlayn reklamalar uchun tezkor virtual kartalar ochish."
      },
      {
        "num": "04",
        "title": "Mablag'larning qat'iy qonuniy himoyasi",
        "desc": "Mijozlarning mablag'lari Buyuk Britaniya FCA va Yevropa Markaziy banki qoidalariga binoan alohida himoyalangan hisoblarda saqlanadi."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Jismoniy va yuridik shaxslar",
        "description": "Real bozor almashinuv kursi, 9 dan ortiq valyutada mahalliy hisob rekvizitlari va minimal shaffof komissiyalar bo'yicha jahon yetakchisi.",
        "details": [
          "To'g'ridan-to'g'ri mahalliy bank rekvizitlari (Yevropa IBAN, AQSh Routing, Buyuk Britaniya Sort Code)",
          "Dunyoning 160 dan ortiq mamlakatiga pul o'tkazmalari yuborish va qabul qilish",
          "Xalqaro jamoalar va frilanserlar uchun avtomatlashtirilgan ommaviy ish haqi to'lovlari",
          "Biznes xarajatlarini boshqarish uchun jismoniy va raqamli debet kartalari"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Frilans va B2B savdo",
        "description": "Raqamli tadbirkorlar, Amazon sotuvchilari va Upwork hamda Fiverr platformalaridan daromad oluvchi frilanserlar uchun eng qulay yechim.",
        "details": [
          "Yirik global savdo maydonchalaridan (Amazon, eBay, Upwork, Fiverr) to'g'ridan-to'g'ri daromad yechib olish",
          "USD, EUR, GBP, CAD, JPY va AUD valyutalarida to'lov qabul qilish hisoblari",
          "Xorijiy yetkazib beruvchilarga mahalliy valyutalarda tezkor to'lovlar",
          "Rivojlanayotgan elektron tijorat do'konlari uchun aylanma mablag' yechimlari"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Kripto va an'anaviy valyuta gibridi",
        "description": "An'anaviy fiat valyutalar va raqamli aktivlarni tezkor ayirboshlash va keshbek kartalari orqali birlashtiruvchi innovatsion platforma.",
        "details": [
          "50 dan ortiq kriptovalyuta va an'anaviy fiat pullari o'rtasida bir lahzada konvertatsiya",
          "Har bir xarid uchun 8% gacha Cryptoback keshbek taqdim etuvchi debet karta",
          "Xalqaro to'lovlarda 0% konvertatsiya komissiyasi va qulay OTC kurslari",
          "Xalqaro me'yorlarga to'liq javob beruvchi xavfsiz sovuq saqlash tizimi"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Yirik ulgurji savdo",
        "description": "Ant Group tarkibidagi xalqaro to'lov platformasi; yirik eksport/import kompaniyalari va Osiyo yetkazib beruvchilari bilan hisob-kitoblar uchun yaratilgan.",
        "details": [
          "Yirik hajmdagi xalqaro savdo to'lovlari va ulgurji operatsiyalar uchun optimallashtirilgan",
          "Xitoy va Osiyo ishlab chiqaruvchilari (1688, Alibaba) bilan to'g'ridan-to'g'ri integratsiya",
          "Valyuta xatarlarini kamaytirish uchun forvard shartnomalari va raqobatbardosh kurslar",
          "Kompaniyalarning moliya bo'limlari uchun ko'p foydalanuvchili boshqaruv tizimi"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Bu hisoblar an'anaviy bank hisoblari bilan bir xilmi?",
        "a": "Ushbu hisoblar rasmiy litsenziyaga ega Elektron Pul Institutlari (EMI) tomonidan taqdim etiladi. Ular sizning nomingizga IBAN va hisob raqamlarini beradi va SEPA, SWIFT hamda ACH orqali an'anaviy banklar kabi to'liq ishlaydi, mijozlar mablag'lari esa alohida himoyalangan hisoblarda saqlanadi."
      },
      {
        "q": "Nima uchun Safi Academy bir nechta provayderni tavsiya qiladi?",
        "a": "Har bir tadbirkorning ehtiyoji har xil: Wise kundalik ko'p valyutali o'tkazmalar uchun qulay, Payoneer frilans va internet do'konlar daromadini olish uchun qulay, Wirex kripto va naqd pulni bog'laydi, WorldFirst esa yirik ulgurji savdo uchun mo'ljallangan."
      },
      {
        "q": "Har bir arizachi o'z nomiga Yevropa yoki AQSh bank hisobini oladimi?",
        "a": "Ha. Shaxsni tasdiqlash va qonuniy me'yorlar tekshiruvidan muvaffaqiyatli o'tgach, har bir muassasa sizning shaxsiy nomingizga yoki kompaniyangiz nomiga to'g'ridan-to'g'ri mahalliy bank rekvizitlarini (Yevropa SEPA IBAN yoki AQSh hisob raqami) taqdim etadi."
      },
      {
        "q": "Hisob ochish uchun qanday hujjatlar talab qilinadi?",
        "a": "Jismoniy shaxslar uchun: amal qilayotgan xorijga chiqish pasporti yoki ID-karta hamda yashash joyini tasdiqlovchi hujjat (oxirgi 90 kun ichida olingan kommunal to'lov kvitansiyasi yoki bank ko'chirmasi). Yuridik shaxslar uchun: kompaniya guvohnomasi, ustav va tijorat faoliyati isboti."
      },
      {
        "q": "Safi Academy ariza topshirishda qanday yordam beradi?",
        "a": "Safi Academy hujjatlarni to'g'ri tayyorlash bo'yicha ko'rsatmalar beradi, dastlabki tekshiruvdan o'tkazadi va rad etilish xavfini kamaytirish uchun rasmiy hamkorlik kanallari orqali yo'naltiradi."
      }
    ]
  },
  "id": {
    "isRtl": false,
    "archBadge": "01 / Arsitektur & Jalur Keuangan",
    "archTitle": "Antarmuka keuangan canggih yang dirancang dengan standar teknologi tertinggi.",
    "archSubtitle": "Pahami keunggulan masing-masing gerbang pembayaran dan siapkan berkas Anda untuk membuka rekening internasional.",
    "verifiedCapabilitiesLabel": "Jalur dan protokol perbankan terverifikasi:",
    "termsDisclaimer": "Kelayakan regional definitif dan ketentuan biaya dikonfirmasi selama proses konsultasi terarah.",
    "applyForPartner": "Ajukan pembukaan di",
    "badge": "Infrastruktur Perbankan Global",
    "heroTitle": "Perbankan internasional tanpa batas wilayah.",
    "heroSubtitle": "Pengalaman rekening internasional premium untuk individu dan bisnis yang bertransaksi dalam banyak mata uang di pasar global.",
    "startApplication": "Mulai Pengajuan",
    "exploreProviders": "Lihat Lembaga Keuangan",
    "settlementCurrencies": "Mata uang penyelesaian yang didukung:",
    "cardTitle": "SAFI GLOBAL",
    "cardSubtitle": "IBAN Komersial Multi-Mata Uang",
    "cardHolderLabel": "PEMEGANG KARTU",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "BERLAKU HINGGA",
    "personalTab": "Rekening Pribadi",
    "businessTab": "Rekening Bisnis (Perusahaan)",
    "providersBadge": "Lembaga Berlisensi",
    "providersTitle": "Lembaga Uang Elektronik & Jalur Perbankan Internasional Terpilih",
    "providersSub": "Bandingkan keunggulan institusional antara lembaga uang elektronik (EMI) berlisensi resmi di seluruh dunia.",
    "selectProviderLabel": "Pilih Lembaga Keuangan:",
    "coreCapabilities": "Kemampuan Utama & Jalur Sesuai Regulasi",
    "visitPortalBtn": "Kunjungi Platform Resmi",
    "applicationBadge": "Konsultasi & Pemeriksaan Berkas",
    "applicationTitle": "Permohonan Konsultasi Pembukaan Rekening",
    "applicationSub": "Kirimkan profil Anda untuk memeriksa kelayakan regional, kepatuhan hukum, dan jalur perusahaan yang tersedia.",
    "accountTypeLabel": "Jenis Rekening yang Dibutuhkan",
    "firstNameLabel": "Nama Depan",
    "firstNamePlaceholder": "contoh: Budi",
    "lastNameLabel": "Nama Belakang",
    "lastNamePlaceholder": "contoh: Santoso",
    "emailLabel": "Email Perusahaan atau Pribadi",
    "emailPlaceholder": "budi@example.com",
    "phoneLabel": "Nomor Telepon (dengan kode negara)",
    "phonePlaceholder": "+62 812 3456 7890",
    "countryLabel": "Negara Domisili atau Tempat Pendirian Perusahaan",
    "countryPlaceholder": "contoh: Indonesia, Singapura, Inggris, AS",
    "companyNameLabel": "Nama Resmi Perusahaan (untuk rekening bisnis)",
    "companyNamePlaceholder": "contoh: PT Safi Global Nusantara",
    "companyRegLabel": "Nomor NIB / NPWP Perusahaan",
    "companyRegPlaceholder": "contoh: NIB atau Nomor Pokok Wajib Pajak",
    "submittingBtn": "Mengirimkan berkas...",
    "submitBtn": "Kirim Berkas untuk Pemeriksaan",
    "successTitle": "Berkas Berhasil Diterima",
    "successDesc": "Informasi Anda telah terdaftar dalam sistem. Tim penasihat kami akan memeriksa berkas Anda sesuai kepatuhan regulasi dalam 1 hari kerja.",
    "errorDesc": "Terjadi kesalahan saat mengirimkan data. Silakan periksa koneksi Anda dan coba kembali.",
    "faqsBadge": "Kepatuhan & Regulasi",
    "faqsTitle": "Kepatuhan Hukum, Lisensi, dan Struktur Rekening",
    "features": [
      {
        "num": "01",
        "title": "Brankas multi-mata uang aman",
        "desc": "Simpan dan tukarkan mata uang utama dunia dengan nilai tukar pasar riil di 40+ negara tanpa biaya tersembunyi."
      },
      {
        "num": "02",
        "title": "Data rekening IBAN lokal khusus",
        "desc": "Dapatkan detail rekening bank lokal di Eropa (SEPA), Inggris (Faster Payments), dan AS (ACH) atas nama Anda."
      },
      {
        "num": "03",
        "title": "Kartu virtual dan fisik",
        "desc": "Terbitkan kartu virtual secara instan untuk biaya server cloud, langganan software SaaS, dan iklan online internasional."
      },
      {
        "num": "04",
        "title": "Perlindungan regulasi yang ketat",
        "desc": "Dana nasabah dilindungi dalam rekening terpisah (segregated accounts) di bawah pengawasan FCA Inggris dan Bank Sentral Eropa."
      }
    ],
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "emerald",
        "badge": "Pribadi & Bisnis",
        "description": "Pemimpin global dalam rekening multi-mata uang dengan kurs pasar riil, data rekening lokal dalam 9+ mata uang, dan biaya rendah transparan.",
        "details": [
          "Data rekening bank lokal langsung (IBAN Eropa, Routing AS, Sort Code Inggris)",
          "Kirim dan terima pembayaran ke dan dari 160+ negara di dunia",
          "Pembayaran gaji dan kontraktor internasional massal secara otomatis",
          "Kartu debit fisik dan digital untuk manajemen pengeluaran bisnis"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "amber",
        "badge": "Freelance & Hub B2B",
        "description": "Pilihan utama bagi wirausahawan digital, penjual di marketplace global, dan freelancer yang menerima pembayaran dari platform Upwork dan Fiverr.",
        "details": [
          "Pencairan langsung dari marketplace global (Amazon, eBay, Upwork, Fiverr)",
          "Rekening penerimaan dalam mata uang USD, EUR, GBP, CAD, JPY, dan AUD",
          "Pembayaran cepat ke pemasok internasional dalam mata uang lokal mereka",
          "Solusi modal kerja untuk toko online yang sedang berkembang pesat"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "purple",
        "badge": "Hibrida Kripto & Fiat",
        "description": "Platform keuangan hibrida inovatif yang menghubungkan mata uang fiat dan aset kripto dengan konversi instan dan kartu cashback.",
        "details": [
          "Konversi instan antara 50+ mata uang kripto dan mata uang fiat utama",
          "Kartu debit dengan cashback Cryptoback hingga 8% untuk setiap pembelanjaan",
          "0% biaya selisih kurs untuk transaksi luar negeri dan kurs OTC kompetitif",
          "Penyimpanan aset cold-storage berlisensi dengan standar keamanan tinggi"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "blue",
        "badge": "Perdagangan Grosir",
        "description": "Platform pembayaran lintas batas dari Ant Group, dirancang untuk eksportir/importir volume besar dan rantai pasokan manufaktur Asia.",
        "details": [
          "Dioptimalkan untuk pembayaran perdagangan internasional skala besar dan grosir",
          "Integrasi langsung dengan pabrik dan pemasok Asia (1688, Alibaba)",
          "Spread valas kompetitif dan kontrak berjangka (forward) untuk lindung nilai",
          "Akses multi-pengguna dengan hierarki korporat untuk tim keuangan bisnis"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Apakah rekening ini sama dengan rekening bank konvensional?",
        "a": "Rekening ini disediakan oleh Lembaga Uang Elektronik (EMI) berlisensi resmi. Mereka menyediakan nomor IBAN dan kode perbankan lokal yang berfungsi sama persis seperti bank biasa untuk transfer SEPA, SWIFT, dan ACH, dengan dana nasabah disimpan aman di rekening terpisah."
      },
      {
        "q": "Mengapa Safi Academy merekomendasikan beberapa penyedia?",
        "a": "Setiap model bisnis memiliki kebutuhan yang berbeda: Wise sangat cocok untuk transaksi rutin harian, Payoneer unggul untuk freelancer dan marketplace, Wirex menghubungkan kripto dan fiat, sedangkan WorldFirst dirancang untuk ekspor-impor skala besar."
      },
      {
        "q": "Apakah setiap pemohon menerima rekening Eropa atau AS atas nama pribadi/perusahaan?",
        "a": "Ya. Setelah verifikasi identitas dan persetujuan kepatuhan berhasil, setiap lembaga menerbitkan data rekening lokal langsung (seperti IBAN Eropa atau nomor Routing AS) atas nama legal Anda atau perusahaan Anda."
      },
      {
        "q": "Dokumen apa saja yang diperlukan untuk pembukaan rekening?",
        "a": "Untuk rekening pribadi: paspor yang masih berlaku atau KTP serta bukti alamat tinggal dalam 90 hari terakhir. Untuk rekening bisnis: akta pendirian perusahaan, NIB/izin usaha, dan bukti aktivitas bisnis yang sah."
      },
      {
        "q": "Bagaimana Safi Academy mendampingi dalam proses pengajuan?",
        "a": "Safi Academy memberikan panduan penyusunan berkas, pemeriksaan awal kepatuhan, dan jalur resmi ke mitra terkait agar meminimalkan risiko penolakan."
      }
    ]
  }
};

export function getBankAccountServiceTranslation(locale: string): BankAccountServiceTranslation {
  const normalized = (locale || "en").toLowerCase();
  return bankAccountServiceTranslations[normalized] || bankAccountServiceTranslations.en;
}
