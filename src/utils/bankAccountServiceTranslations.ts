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

export interface BankAccountServiceTranslation {
  isRtl: boolean;
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
