// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES BANK ACCOUNT SERVICE TRANSLATIONS
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
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "fa": {
    "archBadge": "۰۱ / معماری زیرساخت",
    "archTitle": "یک رابط مالی مهندسی‌شده با استانداردهای مدرن، نه یک فرم ساده.",
    "archSubtitle": "شناخت دقیق شبکه‌ها و زیرساخت‌های بانکی جهانی و آماده‌سازی بهینه پرونده پذیرش.",
    "verifiedCapabilitiesLabel": "قابلیت‌ها و شبکه‌های بانکی تاییدشده:",
    "termsDisclaimer": "احراز شرایط، دسترسی بر اساس حوزه قضایی و کارمزدها در مرحله بررسی پرونده اختصاصی اعلام می‌گردند.",
    "applyForPartner": "درخواست برای",
    "features": [
      {
            "num": "۰۱",
            "title": "صندوق چند ارزی بین‌المللی",
            "desc": "نگهداری و تبدیل ارزهای معتبر جهانی با نرخ واقعی بازار بین‌بانکی در بیش از ۴۰ کشور بدون کارمزد مخفی."
      },
      {
            "num": "۰۲",
            "title": "شماره حساب اختصاصی IBAN",
            "desc": "دریافت شماره حساب‌های بانکی محلی در اروپا (SEPA)، انگلستان (Faster Payments) و آمریکا (ACH)."
      },
      {
            "num": "۰۳",
            "title": "کارت‌های تجاری و مجازی",
            "desc": "صدور آنی کارت‌های مسترکارت و ویزا برای پرداخت سرورهای ابری، تبلیغات بین‌المللی و ابزارهای تخصصی."
      },
      {
            "num": "۰۴",
            "title": "حفاظت تحت نظارت نهادهای قانونی",
            "desc": "نگهداری امن سپرده‌ها در حساب‌های تفکیک‌شده تحت نظارت مرجع مالی بریتانیا (FCA) و بانک مرکزی اروپا."
      }
],
    "isRtl": true,
    "badge": "زیرساخت بانکداری بین‌المللی و حساب‌های چندارزی",
    "heroTitle": "بانکداری فرامرزی، بدون مرز و محدودیت.",
    "heroSubtitle": "حساب‌های تجاری و شخصی معتبر بین‌المللی با شماره شبا اختصاصی اروپایی و آمریکایی، طراحی‌شده برای فریلنسرها، تجار و استارتاپ‌های جهانی.",
    "startApplication": "درخواست مشاوره و افتتاح حساب",
    "exploreProviders": "مشاهده مؤسسات مالی همکار",
    "settlementCurrencies": "ارزهای قابل تسویه:",
    "cardTitle": "آکادمی بین‌المللی صافی",
    "cardSubtitle": "حساب تجاری چندارزی با IBAN اختصاصی",
    "cardHolderLabel": "دارنده حساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ انقضا",
    "personalTab": "حساب شخصی (Personal)",
    "businessTab": "حساب تجاری و شرکتی (Business)",
    "providersBadge": "مؤسسات پولی مجاز و معتبر جهانی",
    "providersTitle": "درگاه‌ها و ارائه‌دهندگان برتر خدمات مالی بین‌المللی",
    "providersSub": "مقایسه تخصصی قابلیت‌های نهادی معتبرترین مؤسسات پول الکترونیکی (EMI) در بریتانیا و اروپا.",
    "selectProviderLabel": "انتخاب ارائه‌دهنده:",
    "coreCapabilities": "قابلیت‌های اصلی و امکانات قانونی",
    "visitPortalBtn": "ورود به سامانه رسمی ارائه‌دهنده",
    "applicationBadge": "میز مشاوره و پشتیبانی آنبوردینگ",
    "applicationTitle": "ثبت درخواست راهنمایی و افتتاح حساب",
    "applicationSub": "اطلاعات هویتی یا شرکتی خود را جهت بررسی مدارک و معرفی مناسب‌ترین مسیر بانکی ارسال فرمایید.",
    "accountTypeLabel": "نوع معماری حساب مورد نظر",
    "firstNameLabel": "نام",
    "firstNamePlaceholder": "مثال: احمد",
    "lastNameLabel": "نام خانوادگی",
    "lastNamePlaceholder": "مثال: رضایی",
    "emailLabel": "آدرس ایمیل",
    "emailPlaceholder": "example@domain.com",
    "phoneLabel": "شماره تماس (واتساپ / تلگرام)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "کشور محل اقامت / ثبت شرکت",
    "countryPlaceholder": "مثال: افغانستان، امارات، ترکیه، آلمان",
    "companyNameLabel": "نام رسمی شرکت (در صورت حساب تجاری)",
    "companyNamePlaceholder": "مثال: Safi International Tech LTD",
    "companyRegLabel": "شماره ثبت یا لایسنس تجاری",
    "companyRegPlaceholder": "مثال: 17063286 یا شماره جواز تجارت",
    "submittingBtn": "در حال ثبت پرونده...",
    "submitBtn": "ارسال پرونده جهت بررسی و آنبوردینگ",
    "successTitle": "درخواست شما با موفقیت ثبت شد",
    "successDesc": "کارشناسان میز خدمات مالی آکادمی مدارک شما را بررسی نموده و ظرف ۲۴ الی ۴۸ ساعت با شما تماس خواهند گرفت.",
    "errorDesc": "خطا در ثبت درخواست. لطفاً دوباره تلاش نموده یا مستقیماً در تلگرام/واتساپ پیام دهید.",
    "faqsBadge": "پرسش‌های پرتکرار",
    "faqsTitle": "پرسش‌های متداول در مورد حساب‌های بین‌المللی",
    "partners": [
      {
        "name": "وایز (Wise)",
        "domain": "wise.com",
        "accent": "حساب‌های چندارزی با کمترین کارمزد انتقال جهانی",
        "badge": "شخصی و تجاری",
        "description": "پلتفرم پیشتاز بریتانیایی متخصص در حساب‌های بین‌المللی بدون مرز. امکان نگهداری بیش از ۴۰ ارز، دریافت مشخصات بانکی محلی اختصاصی (IBAN اروپا، Routing آمریکا، Sort Code بریتانیا) و نرخ تبدیل دقیق بدون کارمزد مخفی.",
        "details": [
          "مشخصات بانکی محلی (IBAN اروپا، ACH آمریکا، Sort Code بریتانیا)",
          "نرخ تبدیل لحظه‌ای واقعی بدون کارمزد پنهان",
          "کارت‌های دبیت بین‌المللی فیزیکی و مجازی (Visa / Mastercard)",
          "اتصال مستقیم به استرایپ، پی‌پال و بازارهای بین‌المللی",
          "نظارت دقیق تحت قوانین FCA بریتانیا و نهادهای مالی اروپا"
        ]
      },
      {
        "name": "پایونییر (Payoneer)",
        "domain": "payoneer.com",
        "accent": "دریافت درآمدهای فریلنسری و پلتفرم‌های جهانی",
        "badge": "هاب تجاری B2B",
        "description": "زیرساخت مرجع بین‌المللی برای فریلنسرها، آژانس‌های دیجیتال و فروشندگان آنلاین. دریافت مستقیم درآمد از آپ‌ورک، فایور، آمازون و مشتریان شرکتی خارجی به حساب‌های دریافت مجزا.",
        "details": [
          "تسویه خودکار از بیش از ۲۰۰۰ پلتفرم بین‌المللی کار و تجارت",
          "حساب‌های دریافت چندارزی به EUR، USD، GBP، JPY، CAD",
          "کارت‌های شرکتی برای پرداخت هزینه‌های ابزارها و تبلیغات آنلاین",
          "برداشت سریع به حساب‌های بانکی محلی در بیش از ۱۵۰ کشور",
          "سامانه صدور فاکتور رسمی و صورتحساب شرکتی"
        ]
      },
      {
        "name": "وایرکس (Wirex)",
        "domain": "wirexapp.com",
        "accent": "نسل جدید تلفیق دارایی‌های دیجیتال و کارت بانکی",
        "badge": "ترکیب فیات و استیبل‌کوین",
        "description": "وایرکس پل ارتباطی میان بانکداری سنتی و دارایی‌های دیجیتال است. با ارائه حساب‌ها و کارت‌های چندارزی، امکان تبدیل آنی ارزهای فیات به استیبل‌کوین‌های دلاری با پذیرش جهانی در تمامی پایانه‌های فروشگاهی را فراهم می‌آورد.",
        "details": [
          "پل بی‌واسطه میان استیبل‌کوین‌های دیجیتال و ارزهای فیات جهانی",
          "کارت‌های پرداخت بدون‌تماس بین‌المللی ویزا و مسترکارت",
          "حواله‌های همتا‌به‌همتا (P2P) آنی و کاملاً رایگان",
          "حفاظت چندامضایی و نگهداری فوق‌امن دارایی‌های دیجیتال",
          "سقف خرید روزانه و برداشت نقدی بالا در مناطق تحت پوشش"
        ]
      },
      {
        "name": "ورلدفرست (WorldFirst)",
        "domain": "worldfirst.com",
        "accent": "تسویه حساب‌های تجاری بزرگ و تجارت بین‌الملل",
        "badge": "تجارت عمده شرکتی",
        "description": "قدرت بزرگ مبادلات ارزی بین‌المللی و زیرساخت پرداخت جهانی ویژه تجارت‌های با حجم بالا، واردات/صادرات و فروشندگان بزرگ بین‌المللی با مدیر حساب اختصاصی.",
        "details": [
          "پوشش ریسک نرخ ارز و معاملات نقدی با حجم بالا",
          "حساب‌های دریافت شرکتی چندارزی ویژه شرکت‌های تجاری",
          "تسویه همان‌روزه در کریدورهای اصلی تجارت جهانی",
          "مدیریت خزانه‌داری اختصاصی و میز انطباق ویژه شرکت‌ها",
          "تسهیل ترخیص مالی برای تراکنش‌های کلان تجاری"
        ]
      }
    ],
    "faqs": [
      {
        "q": "آیا این حساب‌ها همانند حساب‌های سنتی بانک‌های خیابانی هستند؟",
        "a": "بسته به ارائه‌دهنده انتخابی، زیرساخت پایه یک مؤسسه پول الکترونیکی مجاز (EMI)، مؤسسه پرداخت یا حساب تجاری است که توسط بانک‌های درجه یک بریتانیا و اتحادیه اروپا محافظت می‌شود."
      },
      {
        "q": "چرا آکادمی صافی چندین ارائه‌دهنده مختلف را معرفی می‌کند؟",
        "a": "عملیات مالی بین‌المللی نیازهای متفاوتی دارد. فریلنسرها، دانشجویان و تجار نیازمند کانال‌های مختلفی هستند. ما بر اساس موقعیت جغرافیایی و نوع تراکنش، بهترین گزینه را به شما پیشنهاد می‌کنیم."
      },
      {
        "q": "آیا تمامی متقاضیان مشخصات IBAN اختصاصی اروپایی یا آمریکایی دریافت می‌کنند؟",
        "a": "دسترسی به امکانات کامل (شامل شماره شبا اختصاصی، روتینگ نامبر آمریکا یا کارت فیزیکی) به تابعیت، مدارک اقامتی تأییدشده و استانداردهای انطباق ارائه‌دهنده بستگی دارد."
      },
      {
        "q": "چه مدارکی برای احراز هویت و آنبوردینگ الزامی است؟",
        "a": "مدارک استاندارد شامل پاسپورت معتبر یا کارت ملی هوشمند، مدرک اثبات آدرس سکونت (قبض خدمات عمومی یا پرینت حساب بانکی) و اظهارنامه کوتاه در مورد هدف از افتتاح حساب می‌باشد."
      },
      {
        "q": "آکادمی صافی چگونه در فرایند آنبوردینگ به متقاضیان کمک می‌کند؟",
        "a": "میز مشاوره تخصصی ما پروفایل شما را بررسی، پرونده مدارک را آماده و شما را در مناسب‌ترین کانال قانونی هدایت می‌کند تا شانس تأیید به حداکثر برسد."
      }
    ]
  },
  "ps": {
    "archBadge": "۰۱ / د زیربنا جوړښت",
    "archTitle": "یو مالي انٹرفیس چې د محصول په څیر ډیزاین شوی، نه یو ساده فارم.",
    "archSubtitle": "د هر بانکي چینل په وړتیاوو پوه شئ او خپل اسناد په دقت چمتو کړئ.",
    "verifiedCapabilitiesLabel": "تایید شوي مالي چینلونه او وړتیاوې:",
    "termsDisclaimer": "پوره شرایط او لګښتونه د رسمي مشورې په مرحله کې تایید کیږي.",
    "applyForPartner": "غوښتنه د",
    "features": [
      {
            "num": "۰۱",
            "title": "څو اسعارو نړیوال حساب",
            "desc": "په ۴۰+ هیوادونو کې د بازار په ریښتیني نرخ د نړیوالو اسعارو ساتل او بدلول."
      },
      {
            "num": "۰۲",
            "title": "ځانګړی IBAN او بانکي شمیرې",
            "desc": "په اروپا (SEPA)، انګلستان او امریکا (ACH) کې د ځایی حسابونو ترلاسه کول."
      },
      {
            "num": "۰۳",
            "title": "مجازي او کارپوریټ کارتونه",
            "desc": "د انټرنیټي تادیاتو، سرورونو او اعلاناتو لپاره د فوري ویزا او ماسټرکارډ صادرول."
      },
      {
            "num": "۰۴",
            "title": "قانوني څارنه او خوندیتوب",
            "desc": "د انګلستان د FCA او اروپا د مرکزي بانک د مقرراتو لاندې د فنډونو بشپړ خوندیتوب."
      }
],
    "isRtl": true,
    "badge": "زیرساخت بانکداری بین‌المللی و حساب‌های چندارزی",
    "heroTitle": "بانکداری فرامرزی، بدون مرز و محدودیت.",
    "heroSubtitle": "حساب‌های تجاری و شخصی معتبر بین‌المللی با شماره شبا اختصاصی اروپایی و آمریکایی، طراحی‌شده برای فریلنسرها، تجار و استارتاپ‌های جهانی.",
    "startApplication": "درخواست مشاوره و افتتاح حساب",
    "exploreProviders": "مشاهده مؤسسات مالی همکار",
    "settlementCurrencies": "ارزهای قابل تسویه:",
    "cardTitle": "آکادمی بین‌المللی صافی",
    "cardSubtitle": "حساب تجاری چندارزی با IBAN اختصاصی",
    "cardHolderLabel": "دارنده حساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ انقضا",
    "personalTab": "حساب شخصی (Personal)",
    "businessTab": "حساب تجاری و شرکتی (Business)",
    "providersBadge": "مؤسسات پولی مجاز و معتبر جهانی",
    "providersTitle": "درگاه‌ها و ارائه‌دهندگان برتر خدمات مالی بین‌المللی",
    "providersSub": "مقایسه تخصصی قابلیت‌های نهادی معتبرترین مؤسسات پول الکترونیکی (EMI) در بریتانیا و اروپا.",
    "selectProviderLabel": "انتخاب ارائه‌دهنده:",
    "coreCapabilities": "قابلیت‌های اصلی و امکانات قانونی",
    "visitPortalBtn": "ورود به سامانه رسمی ارائه‌دهنده",
    "applicationBadge": "میز مشاوره و پشتیبانی آنبوردینگ",
    "applicationTitle": "ثبت درخواست راهنمایی و افتتاح حساب",
    "applicationSub": "اطلاعات هویتی یا شرکتی خود را جهت بررسی مدارک و معرفی مناسب‌ترین مسیر بانکی ارسال فرمایید.",
    "accountTypeLabel": "نوع معماری حساب مورد نظر",
    "firstNameLabel": "نام",
    "firstNamePlaceholder": "مثال: احمد",
    "lastNameLabel": "نام خانوادگی",
    "lastNamePlaceholder": "مثال: رضایی",
    "emailLabel": "آدرس ایمیل",
    "emailPlaceholder": "example@domain.com",
    "phoneLabel": "شماره تماس (واتساپ / تلگرام)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "کشور محل اقامت / ثبت شرکت",
    "countryPlaceholder": "مثال: افغانستان، امارات، ترکیه، آلمان",
    "companyNameLabel": "نام رسمی شرکت (در صورت حساب تجاری)",
    "companyNamePlaceholder": "مثال: Safi International Tech LTD",
    "companyRegLabel": "شماره ثبت یا لایسنس تجاری",
    "companyRegPlaceholder": "مثال: 17063286 یا شماره جواز تجارت",
    "submittingBtn": "در حال ثبت پرونده...",
    "submitBtn": "ارسال پرونده جهت بررسی و آنبوردینگ",
    "successTitle": "درخواست شما با موفقیت ثبت شد",
    "successDesc": "کارشناسان میز خدمات مالی آکادمی مدارک شما را بررسی نموده و ظرف ۲۴ الی ۴۸ ساعت با شما تماس خواهند گرفت.",
    "errorDesc": "خطا در ثبت درخواست. لطفاً دوباره تلاش نموده یا مستقیماً در تلگرام/واتساپ پیام دهید.",
    "faqsBadge": "پرسش‌های پرتکرار",
    "faqsTitle": "پرسش‌های متداول در مورد حساب‌های بین‌المللی",
    "partners": [
      {
        "name": "وایز (Wise)",
        "domain": "wise.com",
        "accent": "حساب‌های چندارزی با کمترین کارمزد انتقال جهانی",
        "badge": "شخصی و تجاری",
        "description": "پلتفرم پیشتاز بریتانیایی متخصص در حساب‌های بین‌المللی بدون مرز. امکان نگهداری بیش از ۴۰ ارز، دریافت مشخصات بانکی محلی اختصاصی (IBAN اروپا، Routing آمریکا، Sort Code بریتانیا) و نرخ تبدیل دقیق بدون کارمزد مخفی.",
        "details": [
          "مشخصات بانکی محلی (IBAN اروپا، ACH آمریکا، Sort Code بریتانیا)",
          "نرخ تبدیل لحظه‌ای واقعی بدون کارمزد پنهان",
          "کارت‌های دبیت بین‌المللی فیزیکی و مجازی (Visa / Mastercard)",
          "اتصال مستقیم به استرایپ، پی‌پال و بازارهای بین‌المللی",
          "نظارت دقیق تحت قوانین FCA بریتانیا و نهادهای مالی اروپا"
        ]
      },
      {
        "name": "پایونییر (Payoneer)",
        "domain": "payoneer.com",
        "accent": "دریافت درآمدهای فریلنسری و پلتفرم‌های جهانی",
        "badge": "هاب تجاری B2B",
        "description": "زیرساخت مرجع بین‌المللی برای فریلنسرها، آژانس‌های دیجیتال و فروشندگان آنلاین. دریافت مستقیم درآمد از آپ‌ورک، فایور، آمازون و مشتریان شرکتی خارجی به حساب‌های دریافت مجزا.",
        "details": [
          "تسویه خودکار از بیش از ۲۰۰۰ پلتفرم بین‌المللی کار و تجارت",
          "حساب‌های دریافت چندارزی به EUR، USD، GBP، JPY، CAD",
          "کارت‌های شرکتی برای پرداخت هزینه‌های ابزارها و تبلیغات آنلاین",
          "برداشت سریع به حساب‌های بانکی محلی در بیش از ۱۵۰ کشور",
          "سامانه صدور فاکتور رسمی و صورتحساب شرکتی"
        ]
      },
      {
        "name": "وایرکس (Wirex)",
        "domain": "wirexapp.com",
        "accent": "نسل جدید تلفیق دارایی‌های دیجیتال و کارت بانکی",
        "badge": "ترکیب فیات و استیبل‌کوین",
        "description": "وایرکس پل ارتباطی میان بانکداری سنتی و دارایی‌های دیجیتال است. با ارائه حساب‌ها و کارت‌های چندارزی، امکان تبدیل آنی ارزهای فیات به استیبل‌کوین‌های دلاری با پذیرش جهانی در تمامی پایانه‌های فروشگاهی را فراهم می‌آورد.",
        "details": [
          "پل بی‌واسطه میان استیبل‌کوین‌های دیجیتال و ارزهای فیات جهانی",
          "کارت‌های پرداخت بدون‌تماس بین‌المللی ویزا و مسترکارت",
          "حواله‌های همتا‌به‌همتا (P2P) آنی و کاملاً رایگان",
          "حفاظت چندامضایی و نگهداری فوق‌امن دارایی‌های دیجیتال",
          "سقف خرید روزانه و برداشت نقدی بالا در مناطق تحت پوشش"
        ]
      },
      {
        "name": "ورلدفرست (WorldFirst)",
        "domain": "worldfirst.com",
        "accent": "تسویه حساب‌های تجاری بزرگ و تجارت بین‌الملل",
        "badge": "تجارت عمده شرکتی",
        "description": "قدرت بزرگ مبادلات ارزی بین‌المللی و زیرساخت پرداخت جهانی ویژه تجارت‌های با حجم بالا، واردات/صادرات و فروشندگان بزرگ بین‌المللی با مدیر حساب اختصاصی.",
        "details": [
          "پوشش ریسک نرخ ارز و معاملات نقدی با حجم بالا",
          "حساب‌های دریافت شرکتی چندارزی ویژه شرکت‌های تجاری",
          "تسویه همان‌روزه در کریدورهای اصلی تجارت جهانی",
          "مدیریت خزانه‌داری اختصاصی و میز انطباق ویژه شرکت‌ها",
          "تسهیل ترخیص مالی برای تراکنش‌های کلان تجاری"
        ]
      }
    ],
    "faqs": [
      {
        "q": "آیا این حساب‌ها همانند حساب‌های سنتی بانک‌های خیابانی هستند؟",
        "a": "بسته به ارائه‌دهنده انتخابی، زیرساخت پایه یک مؤسسه پول الکترونیکی مجاز (EMI)، مؤسسه پرداخت یا حساب تجاری است که توسط بانک‌های درجه یک بریتانیا و اتحادیه اروپا محافظت می‌شود."
      },
      {
        "q": "چرا آکادمی صافی چندین ارائه‌دهنده مختلف را معرفی می‌کند؟",
        "a": "عملیات مالی بین‌المللی نیازهای متفاوتی دارد. فریلنسرها، دانشجویان و تجار نیازمند کانال‌های مختلفی هستند. ما بر اساس موقعیت جغرافیایی و نوع تراکنش، بهترین گزینه را به شما پیشنهاد می‌کنیم."
      },
      {
        "q": "آیا تمامی متقاضیان مشخصات IBAN اختصاصی اروپایی یا آمریکایی دریافت می‌کنند؟",
        "a": "دسترسی به امکانات کامل (شامل شماره شبا اختصاصی، روتینگ نامبر آمریکا یا کارت فیزیکی) به تابعیت، مدارک اقامتی تأییدشده و استانداردهای انطباق ارائه‌دهنده بستگی دارد."
      },
      {
        "q": "چه مدارکی برای احراز هویت و آنبوردینگ الزامی است؟",
        "a": "مدارک استاندارد شامل پاسپورت معتبر یا کارت ملی هوشمند، مدرک اثبات آدرس سکونت (قبض خدمات عمومی یا پرینت حساب بانکی) و اظهارنامه کوتاه در مورد هدف از افتتاح حساب می‌باشد."
      },
      {
        "q": "آکادمی صافی چگونه در فرایند آنبوردینگ به متقاضیان کمک می‌کند؟",
        "a": "میز مشاوره تخصصی ما پروفایل شما را بررسی، پرونده مدارک را آماده و شما را در مناسب‌ترین کانال قانونی هدایت می‌کند تا شانس تأیید به حداکثر برسد."
      }
    ]
  },
  "ar": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": true,
    "badge": "زیرساخت بانکداری بین‌المللی و حساب‌های چندارزی",
    "heroTitle": "بانکداری فرامرزی، بدون مرز و محدودیت.",
    "heroSubtitle": "حساب‌های تجاری و شخصی معتبر بین‌المللی با شماره شبا اختصاصی اروپایی و آمریکایی، طراحی‌شده برای فریلنسرها، تجار و استارتاپ‌های جهانی.",
    "startApplication": "درخواست مشاوره و افتتاح حساب",
    "exploreProviders": "مشاهده مؤسسات مالی همکار",
    "settlementCurrencies": "ارزهای قابل تسویه:",
    "cardTitle": "آکادمی بین‌المللی صافی",
    "cardSubtitle": "حساب تجاری چندارزی با IBAN اختصاصی",
    "cardHolderLabel": "دارنده حساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ انقضا",
    "personalTab": "حساب شخصی (Personal)",
    "businessTab": "حساب تجاری و شرکتی (Business)",
    "providersBadge": "مؤسسات پولی مجاز و معتبر جهانی",
    "providersTitle": "درگاه‌ها و ارائه‌دهندگان برتر خدمات مالی بین‌المللی",
    "providersSub": "مقایسه تخصصی قابلیت‌های نهادی معتبرترین مؤسسات پول الکترونیکی (EMI) در بریتانیا و اروپا.",
    "selectProviderLabel": "انتخاب ارائه‌دهنده:",
    "coreCapabilities": "قابلیت‌های اصلی و امکانات قانونی",
    "visitPortalBtn": "ورود به سامانه رسمی ارائه‌دهنده",
    "applicationBadge": "میز مشاوره و پشتیبانی آنبوردینگ",
    "applicationTitle": "ثبت درخواست راهنمایی و افتتاح حساب",
    "applicationSub": "اطلاعات هویتی یا شرکتی خود را جهت بررسی مدارک و معرفی مناسب‌ترین مسیر بانکی ارسال فرمایید.",
    "accountTypeLabel": "نوع معماری حساب مورد نظر",
    "firstNameLabel": "نام",
    "firstNamePlaceholder": "مثال: احمد",
    "lastNameLabel": "نام خانوادگی",
    "lastNamePlaceholder": "مثال: رضایی",
    "emailLabel": "آدرس ایمیل",
    "emailPlaceholder": "example@domain.com",
    "phoneLabel": "شماره تماس (واتساپ / تلگرام)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "کشور محل اقامت / ثبت شرکت",
    "countryPlaceholder": "مثال: افغانستان، امارات، ترکیه، آلمان",
    "companyNameLabel": "نام رسمی شرکت (در صورت حساب تجاری)",
    "companyNamePlaceholder": "مثال: Safi International Tech LTD",
    "companyRegLabel": "شماره ثبت یا لایسنس تجاری",
    "companyRegPlaceholder": "مثال: 17063286 یا شماره جواز تجارت",
    "submittingBtn": "در حال ثبت پرونده...",
    "submitBtn": "ارسال پرونده جهت بررسی و آنبوردینگ",
    "successTitle": "درخواست شما با موفقیت ثبت شد",
    "successDesc": "کارشناسان میز خدمات مالی آکادمی مدارک شما را بررسی نموده و ظرف ۲۴ الی ۴۸ ساعت با شما تماس خواهند گرفت.",
    "errorDesc": "خطا در ثبت درخواست. لطفاً دوباره تلاش نموده یا مستقیماً در تلگرام/واتساپ پیام دهید.",
    "faqsBadge": "پرسش‌های پرتکرار",
    "faqsTitle": "پرسش‌های متداول در مورد حساب‌های بین‌المللی",
    "partners": [
      {
        "name": "وایز (Wise)",
        "domain": "wise.com",
        "accent": "حساب‌های چندارزی با کمترین کارمزد انتقال جهانی",
        "badge": "شخصی و تجاری",
        "description": "پلتفرم پیشتاز بریتانیایی متخصص در حساب‌های بین‌المللی بدون مرز. امکان نگهداری بیش از ۴۰ ارز، دریافت مشخصات بانکی محلی اختصاصی (IBAN اروپا، Routing آمریکا، Sort Code بریتانیا) و نرخ تبدیل دقیق بدون کارمزد مخفی.",
        "details": [
          "مشخصات بانکی محلی (IBAN اروپا، ACH آمریکا، Sort Code بریتانیا)",
          "نرخ تبدیل لحظه‌ای واقعی بدون کارمزد پنهان",
          "کارت‌های دبیت بین‌المللی فیزیکی و مجازی (Visa / Mastercard)",
          "اتصال مستقیم به استرایپ، پی‌پال و بازارهای بین‌المللی",
          "نظارت دقیق تحت قوانین FCA بریتانیا و نهادهای مالی اروپا"
        ]
      },
      {
        "name": "پایونییر (Payoneer)",
        "domain": "payoneer.com",
        "accent": "دریافت درآمدهای فریلنسری و پلتفرم‌های جهانی",
        "badge": "هاب تجاری B2B",
        "description": "زیرساخت مرجع بین‌المللی برای فریلنسرها، آژانس‌های دیجیتال و فروشندگان آنلاین. دریافت مستقیم درآمد از آپ‌ورک، فایور، آمازون و مشتریان شرکتی خارجی به حساب‌های دریافت مجزا.",
        "details": [
          "تسویه خودکار از بیش از ۲۰۰۰ پلتفرم بین‌المللی کار و تجارت",
          "حساب‌های دریافت چندارزی به EUR، USD، GBP، JPY، CAD",
          "کارت‌های شرکتی برای پرداخت هزینه‌های ابزارها و تبلیغات آنلاین",
          "برداشت سریع به حساب‌های بانکی محلی در بیش از ۱۵۰ کشور",
          "سامانه صدور فاکتور رسمی و صورتحساب شرکتی"
        ]
      },
      {
        "name": "وایرکس (Wirex)",
        "domain": "wirexapp.com",
        "accent": "نسل جدید تلفیق دارایی‌های دیجیتال و کارت بانکی",
        "badge": "ترکیب فیات و استیبل‌کوین",
        "description": "وایرکس پل ارتباطی میان بانکداری سنتی و دارایی‌های دیجیتال است. با ارائه حساب‌ها و کارت‌های چندارزی، امکان تبدیل آنی ارزهای فیات به استیبل‌کوین‌های دلاری با پذیرش جهانی در تمامی پایانه‌های فروشگاهی را فراهم می‌آورد.",
        "details": [
          "پل بی‌واسطه میان استیبل‌کوین‌های دیجیتال و ارزهای فیات جهانی",
          "کارت‌های پرداخت بدون‌تماس بین‌المللی ویزا و مسترکارت",
          "حواله‌های همتا‌به‌همتا (P2P) آنی و کاملاً رایگان",
          "حفاظت چندامضایی و نگهداری فوق‌امن دارایی‌های دیجیتال",
          "سقف خرید روزانه و برداشت نقدی بالا در مناطق تحت پوشش"
        ]
      },
      {
        "name": "ورلدفرست (WorldFirst)",
        "domain": "worldfirst.com",
        "accent": "تسویه حساب‌های تجاری بزرگ و تجارت بین‌الملل",
        "badge": "تجارت عمده شرکتی",
        "description": "قدرت بزرگ مبادلات ارزی بین‌المللی و زیرساخت پرداخت جهانی ویژه تجارت‌های با حجم بالا، واردات/صادرات و فروشندگان بزرگ بین‌المللی با مدیر حساب اختصاصی.",
        "details": [
          "پوشش ریسک نرخ ارز و معاملات نقدی با حجم بالا",
          "حساب‌های دریافت شرکتی چندارزی ویژه شرکت‌های تجاری",
          "تسویه همان‌روزه در کریدورهای اصلی تجارت جهانی",
          "مدیریت خزانه‌داری اختصاصی و میز انطباق ویژه شرکت‌ها",
          "تسهیل ترخیص مالی برای تراکنش‌های کلان تجاری"
        ]
      }
    ],
    "faqs": [
      {
        "q": "آیا این حساب‌ها همانند حساب‌های سنتی بانک‌های خیابانی هستند؟",
        "a": "بسته به ارائه‌دهنده انتخابی، زیرساخت پایه یک مؤسسه پول الکترونیکی مجاز (EMI)، مؤسسه پرداخت یا حساب تجاری است که توسط بانک‌های درجه یک بریتانیا و اتحادیه اروپا محافظت می‌شود."
      },
      {
        "q": "چرا آکادمی صافی چندین ارائه‌دهنده مختلف را معرفی می‌کند؟",
        "a": "عملیات مالی بین‌المللی نیازهای متفاوتی دارد. فریلنسرها، دانشجویان و تجار نیازمند کانال‌های مختلفی هستند. ما بر اساس موقعیت جغرافیایی و نوع تراکنش، بهترین گزینه را به شما پیشنهاد می‌کنیم."
      },
      {
        "q": "آیا تمامی متقاضیان مشخصات IBAN اختصاصی اروپایی یا آمریکایی دریافت می‌کنند؟",
        "a": "دسترسی به امکانات کامل (شامل شماره شبا اختصاصی، روتینگ نامبر آمریکا یا کارت فیزیکی) به تابعیت، مدارک اقامتی تأییدشده و استانداردهای انطباق ارائه‌دهنده بستگی دارد."
      },
      {
        "q": "چه مدارکی برای احراز هویت و آنبوردینگ الزامی است؟",
        "a": "مدارک استاندارد شامل پاسپورت معتبر یا کارت ملی هوشمند، مدرک اثبات آدرس سکونت (قبض خدمات عمومی یا پرینت حساب بانکی) و اظهارنامه کوتاه در مورد هدف از افتتاح حساب می‌باشد."
      },
      {
        "q": "آکادمی صافی چگونه در فرایند آنبوردینگ به متقاضیان کمک می‌کند؟",
        "a": "میز مشاوره تخصصی ما پروفایل شما را بررسی، پرونده مدارک را آماده و شما را در مناسب‌ترین کانال قانونی هدایت می‌کند تا شانس تأیید به حداکثر برسد."
      }
    ]
  },
  "ur": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": true,
    "badge": "زیرساخت بانکداری بین‌المللی و حساب‌های چندارزی",
    "heroTitle": "بانکداری فرامرزی، بدون مرز و محدودیت.",
    "heroSubtitle": "حساب‌های تجاری و شخصی معتبر بین‌المللی با شماره شبا اختصاصی اروپایی و آمریکایی، طراحی‌شده برای فریلنسرها، تجار و استارتاپ‌های جهانی.",
    "startApplication": "درخواست مشاوره و افتتاح حساب",
    "exploreProviders": "مشاهده مؤسسات مالی همکار",
    "settlementCurrencies": "ارزهای قابل تسویه:",
    "cardTitle": "آکادمی بین‌المللی صافی",
    "cardSubtitle": "حساب تجاری چندارزی با IBAN اختصاصی",
    "cardHolderLabel": "دارنده حساب",
    "cardHolderName": "SAFI INTERNATIONAL",
    "expiryLabel": "تاریخ انقضا",
    "personalTab": "حساب شخصی (Personal)",
    "businessTab": "حساب تجاری و شرکتی (Business)",
    "providersBadge": "مؤسسات پولی مجاز و معتبر جهانی",
    "providersTitle": "درگاه‌ها و ارائه‌دهندگان برتر خدمات مالی بین‌المللی",
    "providersSub": "مقایسه تخصصی قابلیت‌های نهادی معتبرترین مؤسسات پول الکترونیکی (EMI) در بریتانیا و اروپا.",
    "selectProviderLabel": "انتخاب ارائه‌دهنده:",
    "coreCapabilities": "قابلیت‌های اصلی و امکانات قانونی",
    "visitPortalBtn": "ورود به سامانه رسمی ارائه‌دهنده",
    "applicationBadge": "میز مشاوره و پشتیبانی آنبوردینگ",
    "applicationTitle": "ثبت درخواست راهنمایی و افتتاح حساب",
    "applicationSub": "اطلاعات هویتی یا شرکتی خود را جهت بررسی مدارک و معرفی مناسب‌ترین مسیر بانکی ارسال فرمایید.",
    "accountTypeLabel": "نوع معماری حساب مورد نظر",
    "firstNameLabel": "نام",
    "firstNamePlaceholder": "مثال: احمد",
    "lastNameLabel": "نام خانوادگی",
    "lastNamePlaceholder": "مثال: رضایی",
    "emailLabel": "آدرس ایمیل",
    "emailPlaceholder": "example@domain.com",
    "phoneLabel": "شماره تماس (واتساپ / تلگرام)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "کشور محل اقامت / ثبت شرکت",
    "countryPlaceholder": "مثال: افغانستان، امارات، ترکیه، آلمان",
    "companyNameLabel": "نام رسمی شرکت (در صورت حساب تجاری)",
    "companyNamePlaceholder": "مثال: Safi International Tech LTD",
    "companyRegLabel": "شماره ثبت یا لایسنس تجاری",
    "companyRegPlaceholder": "مثال: 17063286 یا شماره جواز تجارت",
    "submittingBtn": "در حال ثبت پرونده...",
    "submitBtn": "ارسال پرونده جهت بررسی و آنبوردینگ",
    "successTitle": "درخواست شما با موفقیت ثبت شد",
    "successDesc": "کارشناسان میز خدمات مالی آکادمی مدارک شما را بررسی نموده و ظرف ۲۴ الی ۴۸ ساعت با شما تماس خواهند گرفت.",
    "errorDesc": "خطا در ثبت درخواست. لطفاً دوباره تلاش نموده یا مستقیماً در تلگرام/واتساپ پیام دهید.",
    "faqsBadge": "پرسش‌های پرتکرار",
    "faqsTitle": "پرسش‌های متداول در مورد حساب‌های بین‌المللی",
    "partners": [
      {
        "name": "وایز (Wise)",
        "domain": "wise.com",
        "accent": "حساب‌های چندارزی با کمترین کارمزد انتقال جهانی",
        "badge": "شخصی و تجاری",
        "description": "پلتفرم پیشتاز بریتانیایی متخصص در حساب‌های بین‌المللی بدون مرز. امکان نگهداری بیش از ۴۰ ارز، دریافت مشخصات بانکی محلی اختصاصی (IBAN اروپا، Routing آمریکا، Sort Code بریتانیا) و نرخ تبدیل دقیق بدون کارمزد مخفی.",
        "details": [
          "مشخصات بانکی محلی (IBAN اروپا، ACH آمریکا، Sort Code بریتانیا)",
          "نرخ تبدیل لحظه‌ای واقعی بدون کارمزد پنهان",
          "کارت‌های دبیت بین‌المللی فیزیکی و مجازی (Visa / Mastercard)",
          "اتصال مستقیم به استرایپ، پی‌پال و بازارهای بین‌المللی",
          "نظارت دقیق تحت قوانین FCA بریتانیا و نهادهای مالی اروپا"
        ]
      },
      {
        "name": "پایونییر (Payoneer)",
        "domain": "payoneer.com",
        "accent": "دریافت درآمدهای فریلنسری و پلتفرم‌های جهانی",
        "badge": "هاب تجاری B2B",
        "description": "زیرساخت مرجع بین‌المللی برای فریلنسرها، آژانس‌های دیجیتال و فروشندگان آنلاین. دریافت مستقیم درآمد از آپ‌ورک، فایور، آمازون و مشتریان شرکتی خارجی به حساب‌های دریافت مجزا.",
        "details": [
          "تسویه خودکار از بیش از ۲۰۰۰ پلتفرم بین‌المللی کار و تجارت",
          "حساب‌های دریافت چندارزی به EUR، USD، GBP، JPY، CAD",
          "کارت‌های شرکتی برای پرداخت هزینه‌های ابزارها و تبلیغات آنلاین",
          "برداشت سریع به حساب‌های بانکی محلی در بیش از ۱۵۰ کشور",
          "سامانه صدور فاکتور رسمی و صورتحساب شرکتی"
        ]
      },
      {
        "name": "وایرکس (Wirex)",
        "domain": "wirexapp.com",
        "accent": "نسل جدید تلفیق دارایی‌های دیجیتال و کارت بانکی",
        "badge": "ترکیب فیات و استیبل‌کوین",
        "description": "وایرکس پل ارتباطی میان بانکداری سنتی و دارایی‌های دیجیتال است. با ارائه حساب‌ها و کارت‌های چندارزی، امکان تبدیل آنی ارزهای فیات به استیبل‌کوین‌های دلاری با پذیرش جهانی در تمامی پایانه‌های فروشگاهی را فراهم می‌آورد.",
        "details": [
          "پل بی‌واسطه میان استیبل‌کوین‌های دیجیتال و ارزهای فیات جهانی",
          "کارت‌های پرداخت بدون‌تماس بین‌المللی ویزا و مسترکارت",
          "حواله‌های همتا‌به‌همتا (P2P) آنی و کاملاً رایگان",
          "حفاظت چندامضایی و نگهداری فوق‌امن دارایی‌های دیجیتال",
          "سقف خرید روزانه و برداشت نقدی بالا در مناطق تحت پوشش"
        ]
      },
      {
        "name": "ورلدفرست (WorldFirst)",
        "domain": "worldfirst.com",
        "accent": "تسویه حساب‌های تجاری بزرگ و تجارت بین‌الملل",
        "badge": "تجارت عمده شرکتی",
        "description": "قدرت بزرگ مبادلات ارزی بین‌المللی و زیرساخت پرداخت جهانی ویژه تجارت‌های با حجم بالا، واردات/صادرات و فروشندگان بزرگ بین‌المللی با مدیر حساب اختصاصی.",
        "details": [
          "پوشش ریسک نرخ ارز و معاملات نقدی با حجم بالا",
          "حساب‌های دریافت شرکتی چندارزی ویژه شرکت‌های تجاری",
          "تسویه همان‌روزه در کریدورهای اصلی تجارت جهانی",
          "مدیریت خزانه‌داری اختصاصی و میز انطباق ویژه شرکت‌ها",
          "تسهیل ترخیص مالی برای تراکنش‌های کلان تجاری"
        ]
      }
    ],
    "faqs": [
      {
        "q": "آیا این حساب‌ها همانند حساب‌های سنتی بانک‌های خیابانی هستند؟",
        "a": "بسته به ارائه‌دهنده انتخابی، زیرساخت پایه یک مؤسسه پول الکترونیکی مجاز (EMI)، مؤسسه پرداخت یا حساب تجاری است که توسط بانک‌های درجه یک بریتانیا و اتحادیه اروپا محافظت می‌شود."
      },
      {
        "q": "چرا آکادمی صافی چندین ارائه‌دهنده مختلف را معرفی می‌کند؟",
        "a": "عملیات مالی بین‌المللی نیازهای متفاوتی دارد. فریلنسرها، دانشجویان و تجار نیازمند کانال‌های مختلفی هستند. ما بر اساس موقعیت جغرافیایی و نوع تراکنش، بهترین گزینه را به شما پیشنهاد می‌کنیم."
      },
      {
        "q": "آیا تمامی متقاضیان مشخصات IBAN اختصاصی اروپایی یا آمریکایی دریافت می‌کنند؟",
        "a": "دسترسی به امکانات کامل (شامل شماره شبا اختصاصی، روتینگ نامبر آمریکا یا کارت فیزیکی) به تابعیت، مدارک اقامتی تأییدشده و استانداردهای انطباق ارائه‌دهنده بستگی دارد."
      },
      {
        "q": "چه مدارکی برای احراز هویت و آنبوردینگ الزامی است؟",
        "a": "مدارک استاندارد شامل پاسپورت معتبر یا کارت ملی هوشمند، مدرک اثبات آدرس سکونت (قبض خدمات عمومی یا پرینت حساب بانکی) و اظهارنامه کوتاه در مورد هدف از افتتاح حساب می‌باشد."
      },
      {
        "q": "آکادمی صافی چگونه در فرایند آنبوردینگ به متقاضیان کمک می‌کند؟",
        "a": "میز مشاوره تخصصی ما پروفایل شما را بررسی، پرونده مدارک را آماده و شما را در مناسب‌ترین کانال قانونی هدایت می‌کند تا شانس تأیید به حداکثر برسد."
      }
    ]
  },
  "ru": {
    "archBadge": "01 / Архитектура решений",
    "archTitle": "Финансовый интерфейс мирового уровня, созданный как продукт.",
    "archSubtitle": "Понимание всех платежных каналов и точная подготовка вашего регистрационного досье.",
    "verifiedCapabilitiesLabel": "Подтвержденные функции и платежные рельсы:",
    "termsDisclaimer": "Полные условия доступности по юрисдикциям и тарифы подтверждаются при персональном онбординге.",
    "applyForPartner": "Подать заявку в",
    "features": [
      {
            "num": "01",
            "title": "Мультивалютный счет",
            "desc": "Хранение и конвертация основных мировых валют по реальным рыночным курсам в 40+ странах без скрытых комиссий."
      },
      {
            "num": "02",
            "title": "Выделенные реквизиты IBAN",
            "desc": "Получение местных банковских реквизитов в Европе (SEPA), Великобритании (Faster Payments) и США (ACH)."
      },
      {
            "num": "03",
            "title": "Корпоративные и виртуальные карты",
            "desc": "Мгновенный выпуск виртуальных карт для оплаты SaaS-сервисов, серверов и глобальной рекламы."
      },
      {
            "num": "04",
            "title": "Строгий регуляторный надзор",
            "desc": "Средства клиентов хранятся на сегрегированных счетах под надзором регуляторов FCA Великобритании и ЕЦБ."
      }
],
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "tr": {
    "archBadge": "01 / Altyapı Mimarisi",
    "archTitle": "Basit bir form değil, ürün gibi tasarlanmış bir finansal arayüz.",
    "archSubtitle": "Her bir altyapının sunduğu imkanları anlayın ve başvuru dosyanızı titizlikle hazırlayın.",
    "verifiedCapabilitiesLabel": "Onaylanmış Yetkinlikler ve Kanallar:",
    "termsDisclaimer": "Tam uygunluk, yargı alanı geçerliliği ve fiyatlandırma koşulları bireysel danışmanlık sürecinde teyit edilir.",
    "applyForPartner": "Başvur:",
    "features": [
      {
            "num": "01",
            "title": "Çok Para Birimli Kasa",
            "desc": "40'tan fazla ülkede gizli komisyon olmadan gerçek piyasa kurlarıyla ana para birimlerini tutun ve dönüştürün."
      },
      {
            "num": "02",
            "title": "Özel IBAN Kanalları",
            "desc": "Avrupa (SEPA), Birleşik Krallık (Faster Payments) ve ABD'de (ACH) yerel banka hesap numaraları alın."
      },
      {
            "num": "03",
            "title": "Kurumsal ve Sanal Kartlar",
            "desc": "SaaS araçları, bulut sunucuları ve küresel reklam kampanyaları için anında sanal kart oluşturun."
      },
      {
            "num": "04",
            "title": "Sıkı Düzenleyici Koruması",
            "desc": "Müşteri fonları, Birleşik Krallık FCA ve Avrupa Merkez Bankası kurallarına göre ayrılmış hesaplarda güvendedir."
      }
],
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "de": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "fr": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "es": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "zh": {
    "archBadge": "01 / 金融架构体系",
    "archTitle": "像打造工业级数字产品一样构建的国际金融交互界面。",
    "archSubtitle": "深度了解各底层清算通道的核心优势，精准准备您的企业或个人开户材料。",
    "verifiedCapabilitiesLabel": "官方认证能力与底层清算通道：",
    "termsDisclaimer": "具体开户准入资格、司法管辖区限制及官方费率将在个人专属顾问接入审核阶段最终确认。",
    "applyForPartner": "立即申请接入",
    "features": [
      {
            "num": "01",
            "title": "多币种全球资产金库",
            "desc": "支持40多个主流国家货币存储与实时汇率兑换，杜绝隐形加价，尽享银行间无损汇率。"
      },
      {
            "num": "02",
            "title": "专属独立本地 IBAN 账户",
            "desc": "获取欧洲单一支付区（SEPA）、英国快速支付（FPS）和美国自动清算所（ACH）本地企业收款行号。"
      },
      {
            "num": "03",
            "title": "企业级虚拟与实体万事达卡",
            "desc": "即时生成用于支付海外软件SaaS订阅、公有云服务器及跨境广告投放的企业级虚拟商务卡。"
      },
      {
            "num": "04",
            "title": "高标准合规资产隔离监管",
            "desc": "所有客户资产均根据英国金融行为监管局（FCA）与欧洲央行法规，存放于一级托管隔离银行。"
      }
],
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "hi": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "it": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "pt": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "ja": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "ko": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "nl": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "uz": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  },
  "id": {
    "archBadge": "01 / Architecture",
    "archTitle": "A financial interface built like a product, not a form.",
    "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
    "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
    "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
    "applyForPartner": "Apply for",
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
    "isRtl": false,
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
    "applicationBadge": "Advisory & Onboarding Assistance",
    "applicationTitle": "Apply for Assisted Account Onboarding",
    "applicationSub": "Submit your profile to our advisory desk for document verification and direct onboarding assistance.",
    "accountTypeLabel": "Target Account Architecture",
    "firstNameLabel": "First Name",
    "firstNamePlaceholder": "e.g. Ahmad",
    "lastNameLabel": "Last Name",
    "lastNamePlaceholder": "e.g. Reza",
    "emailLabel": "Email Address",
    "emailPlaceholder": "e.g. ahmad@example.com",
    "phoneLabel": "Phone Number (WhatsApp)",
    "phonePlaceholder": "+93 700 000 000",
    "countryLabel": "Country of Residence",
    "countryPlaceholder": "e.g. Afghanistan, UAE, Turkey",
    "companyNameLabel": "Company Legal Name",
    "companyNamePlaceholder": "e.g. Safi International Tech LTD",
    "companyRegLabel": "Registration / License Number",
    "companyRegPlaceholder": "e.g. 17063286 or Trade License #",
    "submittingBtn": "Submitting Dossier...",
    "submitBtn": "Submit Onboarding Request",
    "successTitle": "Application Received Successfully",
    "successDesc": "Our financial advisory desk will review your documents and contact you within 24-48 hours.",
    "errorDesc": "Network error submitting application. Please try again or reach out on Telegram/WhatsApp.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "partners": [
      {
        "name": "Wise",
        "domain": "wise.com",
        "accent": "Multi-Currency & Low-Fee Global Transfers",
        "badge": "Personal & Business",
        "description": "Wise is a premier global financial technology platform specialized in multi-currency borderless accounts. It allows holding 40+ currencies with real mid-market exchange rates, dedicated local bank account details (IBAN in Europe, routing numbers in the US, sort codes in the UK), and low-cost cross-border payments.",
        "details": [
          "Local account details (EUR IBAN, USD ACH, GBP Sort Code)",
          "Real mid-market exchange rate without hidden markups",
          "Digital & physical international debit cards",
          "Direct integration with global payment gateways and marketplaces",
          "Stringent regulatory safeguarding under UK FCA and European authorities"
        ]
      },
      {
        "name": "Payoneer",
        "domain": "payoneer.com",
        "accent": "Commercial Freelance & Marketplace Payouts",
        "badge": "B2B & Freelance Hub",
        "description": "Payoneer is the benchmark cross-border infrastructure for international freelancers, digital agencies, and e-commerce merchants. Seamlessly receive payouts from global marketplaces including Upwork, Fiverr, Amazon, and direct B2B foreign clients into dedicated receiving accounts.",
        "details": [
          "Automated marketplace payouts from 2,000+ global platforms",
          "Multi-currency receiving accounts in EUR, USD, GBP, JPY, CAD",
          "Commercial debit cards for corporate ad spend and SaaS tools",
          "Fast withdrawal to local bank accounts across 150+ countries",
          "Enterprise billing and automated invoice generation tools"
        ]
      },
      {
        "name": "Wirex",
        "domain": "wirexapp.com",
        "accent": "Next-Gen Digital Asset & Card Infrastructure",
        "badge": "Crypto-Fiat Hybrid",
        "description": "Wirex unites traditional fiat banking rails with digital asset capabilities in supported corridors. Featuring mobile-first multi-currency accounts and cards, it enables instant conversion between traditional fiat currencies and digital stablecoins with worldwide point-of-sale acceptance.",
        "details": [
          "Seamless bridge between digital stablecoins and fiat currencies",
          "Multi-currency contactless payment cards (Visa / Mastercard)",
          "Instant zero-fee peer-to-peer digital remittances",
          "Institutional-grade digital asset custody and multi-sig security",
          "High daily spending and ATM withdrawal allowances in supported regions"
        ]
      },
      {
        "name": "WorldFirst",
        "domain": "worldfirst.com",
        "accent": "Enterprise Foreign Exchange & Trade Settlements",
        "badge": "Enterprise Trade",
        "description": "WorldFirst is an enterprise foreign-exchange powerhouse and global payment infrastructure built for high-volume cross-border trade, international import/export, and wholesale global merchant settlement with dedicated account managers.",
        "details": [
          "High-volume wholesale foreign exchange hedging and spot contracts",
          "Dedicated multi-currency corporate receiving accounts",
          "Same-day settlement across major international trade corridors",
          "Personalized treasury management and corporate compliance desk",
          "Built-in compliance clearing for large-scale enterprise transactions"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this a traditional high-street bank account?",
        "a": "Depending on the selected provider, the underlying facility is an authorized electronic money institution (EMI), payment institution, or commercial receiving account backed by regulated European or UK tier-1 safeguarding banks."
      },
      {
        "q": "Why does Safi Academy showcase multiple providers?",
        "a": "International financial operations are multifaceted. Freelancers, international students, and e-commerce companies have distinct cross-border needs. We guide you toward the optimal rail based on your location and transaction profile."
      },
      {
        "q": "Will every applicant receive dedicated European or US receiving details?",
        "a": "Account feature availability (including dedicated IBANs, local routing numbers, or debit cards) is contingent upon your nationality, verified residency, compliance screening, and the provider's regulatory license."
      },
      {
        "q": "What compliance documentation is required for onboarding?",
        "a": "Standard verification requires a valid passport or national ID card, proof of residential address (utility bill or bank statement), and a brief declaration of account purpose or source of funds."
      },
      {
        "q": "How does Safi Academy assist in the onboarding workflow?",
        "a": "Our specialized advisory desk reviews your profile, prepares your documentation dossier, and directs you through the most viable compliant onboarding pipeline to ensure maximum approval probability."
      }
    ]
  }
};

export function getBankAccountServiceTranslation(locale: string): BankAccountServiceTranslation {
  const normalized = (locale || "en").toLowerCase();
  return bankAccountServiceTranslations[normalized] || bankAccountServiceTranslations.en;
}
