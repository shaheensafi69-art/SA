// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES COMPREHENSIVE DONATION TRANSLATIONS
// 100% Native Translations, zero spread fallbacks, zero language leaks.
// ============================================================================

export interface DonateTier {
  amount: number;
  label: string;
  tier: string;
  impact: string;
  badge: string;
}

export interface StudentStory {
  name: string;
  location: string;
  track: string;
  quote: string;
  avatar: string;
}

export interface FundAllocation {
  percent: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface DonateBankAccount {
  title: string;
  subtitle: string;
  note?: string;
}

export interface DonateTranslation {
  isRtl: boolean;
  home: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc1: string;
  heroDesc2: string;
  liveGoalLabel: string;
  raisedOf: string;
  goal: string;
  fundedBadge: string;
  boxTitle: string;
  boxSubtitle: string;
  customAmount: string;
  dedicationLabel: string;
  dedicationPlaceholder: string;
  tabCard: string;
  tabCardSub: string;
  tabPaypal: string;
  tabPaypalSub: string;
  tabBank: string;
  tabBankSub: string;
  tiers: DonateTier[];
  donateNowBtn: string;
  processingBtn: string;
  cancelBtn: string;
  encryptedNotice: string;
  paypalTitle: string;
  paypalDesc: string;
  paypalError: string;
  bankSelectLabel: string;
  bankVerifiedBadge: string;
  copyAllBtn: string;
  allCopiedText: string;
  copiedText: string;
  beneficiaryLabel: string;
  ibanLabel: string;
  bicLabel: string;
  routingLabel: string;
  sortCodeLabel: string;
  accountNumberLabel: string;
  bankNameLabel: string;
  bankAddressLabel: string;
  noticeLabel: string;
  receiptHeader: string;
  receiptSub: string;
  donorNameLabel: string;
  donorNamePlaceholder: string;
  donorEmailLabel: string;
  donorEmailPlaceholder: string;
  transferAmountLabel: string;
  txIdLabel: string;
  txIdPlaceholder: string;
  notesLabel: string;
  submitReceiptBtn: string;
  submittingReceiptBtn: string;
  successReceiptTitle: string;
  successReceiptDesc: string;
  trackingRefLabel: string;
  alertFillRequired: string;
  alertMinDonation: string;
  alertNetworkError: string;
  alertSubmitFailed: string;
  girlsEnrolled: string;
  liveClassrooms: string;
  freeScholarships: string;
  trustBadge1Title: string;
  trustBadge1Desc: string;
  trustBadge2Title: string;
  trustBadge2Desc: string;
  trustBadge3Title: string;
  trustBadge3Desc: string;
  storiesBadge: string;
  storiesTitle: string;
  storiesSub: string;
  stories: StudentStory[];
  transparencyBadge: string;
  transparencyTitle: string;
  transparencySub: string;
  allocations: FundAllocation[];
  faqBadge: string;
  faqTitle: string;
  faqSub: string;
  faqs: FaqItem[];
  bottomCtaBadge: string;
  bottomCtaTitle: string;
  bottomCtaDesc: string;
  bottomCtaBtn: string;
  verifiedScholarship: string;
  bankAccounts: DonateBankAccount[];
}

export const donateTranslationsMap: Record<string, DonateTranslation> = {
  "en": {
  "isRtl": false,
  "home": "Home",
  "heroBadge": "Emergency Educational Relief • Defying the Ban",
  "heroTitle1": "They Locked the School Gates.",
  "heroTitle2": "We Are Opening the Universe.",
  "heroDesc1": "When 1.4 million Afghan girls and women were stripped of their fundamental right to learn, Safi Academy refused to stand by. Through secure decentralized mesh networks and encrypted channels, we bring elite coding and STEM education directly into homes across Afghanistan.",
  "heroDesc2": "Your contribution is not charity — it is defiance, solidarity, and empowerment. Every single cent directly funds Starlink connectivity, secure laptops, and global mentors for brave Afghan female scholars. 100% of education funds go directly to students.",
  "liveGoalLabel": "2026 Educational Relief Goal",
  "raisedOf": "Raised of",
  "goal": "Target",
  "fundedBadge": "Transparent Ledger • 100% Student Allocation",
  "boxTitle": "Direct Student Sponsorship",
  "boxSubtitle": "Choose a funding tier or specify a custom donation amount.",
  "customAmount": "Custom Contribution ($ USD)",
  "dedicationLabel": "Dedication / Special Note (Optional)",
  "dedicationPlaceholder": "In honor of, in memory of, or words of encouragement for students...",
  "tabCard": "Debit / Credit Card",
  "tabCardSub": "Instant • Encrypted • Global",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Direct • One-Click Checkout",
  "tabBank": "Direct Wire Transfer",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 Month Internet & Security",
      "tier": "Tier 1: Connectivity",
      "impact": "Provides 1 month of high-speed Starlink/VPN connectivity for a female student in Afghanistan.",
      "badge": "Essential"
    },
    {
      "amount": 75,
      "label": "Tech Stack & Dev Server",
      "tier": "Tier 2: Infrastructure",
      "impact": "Funds cloud sandbox servers, high-end curriculum materials, and offline video lessons.",
      "badge": "Most Popular"
    },
    {
      "amount": 150,
      "label": "Direct Student Scholarship",
      "tier": "Tier 3: Full Scholarship",
      "impact": "Directly funds a full semester of elite engineering education for one underprivileged female student.",
      "badge": "High Impact"
    },
    {
      "amount": 500,
      "label": "Equip a Student with Laptop",
      "tier": "Tier 4: Hardware",
      "impact": "Supplies a verified, secure development laptop and power bank directly delivered to a female student.",
      "badge": "Transformational"
    },
    {
      "amount": 1200,
      "label": "Sponsor a Full Year Track",
      "tier": "Tier 5: Full Year Pathway",
      "impact": "Endows an entire year of engineering mastery, 1-on-1 global mentoring, and remote job placement support.",
      "badge": "Endowment"
    }
  ],
  "donateNowBtn": "Proceed to Secure Checkout",
  "processingBtn": "Securing Encrypted Gateway...",
  "cancelBtn": "Cancel",
  "encryptedNotice": "256-Bit TLS Bank-Grade Encryption • Zero Cardholder Data Retention",
  "paypalTitle": "Complete via PayPal",
  "paypalDesc": "You will be redirected to PayPal's secure portal to authorize your donation.",
  "paypalError": "Unable to initialize PayPal gateway. Please try Card or Wire Transfer.",
  "bankSelectLabel": "Select Institutional Bank Account:",
  "bankVerifiedBadge": "Verified Banking Partners",
  "copyAllBtn": "Copy All Bank Details",
  "allCopiedText": "All details copied to clipboard!",
  "copiedText": "Copied!",
  "beneficiaryLabel": "Beneficiary Name",
  "ibanLabel": "IBAN",
  "bicLabel": "BIC / SWIFT Code",
  "routingLabel": "Routing Number (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Account Number",
  "bankNameLabel": "Financial Institution",
  "bankAddressLabel": "Bank Registered Address",
  "noticeLabel": "Deposit Verification Requirement",
  "receiptHeader": "Report Bank Transfer Receipt",
  "receiptSub": "Notify our finance team so we can confirm receipt and issue your tax deduction acknowledgement.",
  "donorNameLabel": "Your Full Name",
  "donorNamePlaceholder": "e.g. Sarah Jenkins",
  "donorEmailLabel": "Your Email Address",
  "donorEmailPlaceholder": "e.g. sarah@example.com",
  "transferAmountLabel": "Transferred Amount & Currency",
  "txIdLabel": "Bank Transaction Reference / UTR Number",
  "txIdPlaceholder": "e.g. TXN-984210 or wire reference",
  "notesLabel": "Additional Message or Dedication",
  "submitReceiptBtn": "Submit Transfer Proof",
  "submittingReceiptBtn": "Verifying & Recording...",
  "successReceiptTitle": "Transfer Receipt Logged!",
  "successReceiptDesc": "Thank you for your generosity. Our compliance desk will verify the ledger and email your official confirmation.",
  "trackingRefLabel": "Tracking Reference:",
  "alertFillRequired": "Please fill in your name, email and transfer amount.",
  "alertMinDonation": "Minimum donation amount is $1.",
  "alertNetworkError": "Network error. Please try again or contact us directly.",
  "alertSubmitFailed": "Failed to submit transfer receipt.",
  "girlsEnrolled": "Girls Enrolled",
  "liveClassrooms": "Live Classrooms",
  "freeScholarships": "100% Free",
  "trustBadge1Title": "100% Direct Impact",
  "trustBadge1Desc": "All philanthropic gifts go directly toward tuition waivers, laptops, and internet stipends for Afghan women.",
  "trustBadge2Title": "Zero-Knowledge Privacy",
  "trustBadge2Desc": "Student identities and physical locations are protected under strict military-grade cryptographic safeguards.",
  "trustBadge3Title": "Audited & Transparent",
  "trustBadge3Desc": "Real-time ledger updates, audited annual accounting reports, and milestone delivery notifications.",
  "storiesBadge": "Voices from Kabul, Herat & Beyond",
  "storiesTitle": "Education Under Siege, Minds Unbroken",
  "storiesSub": "Real words from our female scholars studying in secret classrooms across Afghanistan.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afghanistan",
      "track": "Full-Stack Software Engineering",
      "quote": "When universities were barred, I felt as if the sun had set forever. Safi Academy gave me back my future. Today, I build cloud software and teach younger girls in my neighborhood.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afghanistan",
      "track": "Python & Machine Learning",
      "quote": "The laptop and Starlink stipend I received through your donations changed my life. I am no longer a silenced statistic; I am an aspiring artificial intelligence researcher.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-i-Sharif, Afghanistan",
      "track": "UI/UX & Product Design",
      "quote": "They can lock the doors of physical schools, but they cannot imprison our curiosity. Every code commit I push is a victory against darkness.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Financial Integrity & Governance",
  "transparencyTitle": "Where Every Single Dollar Goes",
  "transparencySub": "We maintain radical transparency. Here is how your donation is allocated.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Direct Student Hardware & Internet",
      "desc": "Laptops, high-speed Starlink/VPN connectivity, solar power packs, and secure home learning equipment."
    },
    {
      "percent": "30%",
      "title": "Educational Cloud & LMS Infrastructure",
      "desc": "Decentralized servers, offline lecture video sync, and code sandbox execution environments."
    },
    {
      "percent": "15%",
      "title": "Global Mentorship & Career Placement",
      "desc": "Stipends for international technical mentors, technical English coaching, and remote job placement."
    },
    {
      "percent": "5%",
      "title": "Verification & Threat Monitoring",
      "desc": "Compliance audits, end-to-end operational safety, and encrypted identity shielding."
    }
  ],
  "faqBadge": "Got Questions?",
  "faqTitle": "Frequently Asked Questions",
  "faqSub": "Everything you need to know about our student aid fund, security, and verification.",
  "faqs": [
    {
      "q": "How do you guarantee donations safely reach female students in Afghanistan?",
      "a": "We operate a decentralized peer-to-peer distribution network using vetted local partner coordinators, direct hardware drop-offs, and encrypted mobile stipends. No funds touch sanction-sensitive or state-controlled financial channels."
    },
    {
      "q": "Is my donation secure and tax-deductible?",
      "a": "Yes. All credit card and electronic transactions are processed through Level-1 PCI-DSS compliant gateways. Bank transfers are deposited into regulated European and American institutional accounts."
    },
    {
      "q": "Can I sponsor a specific student or track?",
      "a": "Yes! When choosing Tier 3, 4, or 5, you may include a dedication note. We will pair your donation with an incoming student scholar and provide anonymized progress milestones."
    },
    {
      "q": "What payment methods do you accept?",
      "a": "We accept major credit/debit cards (Visa, MasterCard, American Express), PayPal, and direct wire transfers (USD ACH/Routing, EUR SEPA, and GBP UK Faster Payments)."
    },
    {
      "q": "How is student identity protected against retaliation?",
      "a": "Student privacy is our top security mandate. Students participate under cryptographic handles with pseudonyms. Classrooms utilize end-to-end encrypted tunnels and camera-free voice/screen shares."
    }
  ],
  "bottomCtaBadge": "Stand on the Right Side of History",
  "bottomCtaTitle": "Light a Beacon of Hope in the Darkest Hours.",
  "bottomCtaDesc": "Join hundreds of global philanthropists, technologists, and human rights advocates empowering the women of Afghanistan.",
  "bottomCtaBtn": "Donate Now • Empower a Scholar",
  "verifiedScholarship": "Verified 501(c)(3) Equivalent Global Academic Relief Initiative",
  "bankAccounts": [
    {
      "title": "US Dollar (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Direct US Domestic Bank Transfer / Wirex",
      "note": "Minimum deposit is $1."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "European Single Euro Payments Area (SEPA)",
      "note": "Zero incoming SEPA transfer fees across EU/EEA."
    },
    {
      "title": "British Pound (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Direct UK Domestic Transfer / BACS",
      "note": "Instant settlement via UK Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "European Single Euro Payments Area (SEPA)",
      "note": "SEPA transfer processed within 1-2 business days."
    },
    {
      "title": "Euro SEPA (Luxembourg) - Shaheen Safi",
      "subtitle": "SEPA Cross-Border Transfer",
      "note": "Direct IBAN transfer with instant settlement."
    }
  ]
},
  "fa": {
  "isRtl": true,
  "home": "صفحه اصلی",
  "heroBadge": "کمک اضطراری به آموزش • ایستادگی در برابر ممنوعیت",
  "heroTitle1": "درهای مکاتب را بستند.",
  "heroTitle2": "ما افق‌های کائنات را می‌گشاییم.",
  "heroDesc1": "هنگامی که ۱.۴ میلیون دختر و زن جوان در افغانستان از ابتدایی‌ترین حق بشری خود یعنی آموزش محروم شدند، آکادمی صافی سکوت نکرد. ما از طریق شبکه‌های توزیع‌شده امن و کانال‌های رمزگذاری‌شده، آموزش تخصصی برنامه‌نویسی و فناوری را مستقیماً به خانه‌های زنان شجاع افغانستان می‌آوریم.",
  "heroDesc2": "حمایت شما صدقه نیست؛ بلکه نماد همبستگی، مقاومت و توانمندسازی است. تک‌تک سنت‌های اهدایی شما مستقیماً صرف تهیه اینترنت استارلینک، لپ‌تاپ‌های امن و منتورشیپ بین‌المللی برای دختران افغانستان می‌شود. ۱۰۰٪ وجوه آموزشی مستقیماً به دانش‌آموزان اختصاص می‌یابد.",
  "liveGoalLabel": "هدف صندوق امداد آموزشی ۲۰۲۶",
  "raisedOf": "جمع‌آوری شده از",
  "goal": "هدف کل",
  "fundedBadge": "دفتر کل شفاف • تخصیص ۱۰۰٪ به دانش‌آموزان",
  "boxTitle": "تأمین مالی مستقیم بورسیه دانش‌آموزان",
  "boxSubtitle": "یکی از سطوح حمایتی را انتخاب کنید یا مبلغ دلخواه خود را وارد نمایید.",
  "customAmount": "مبلغ دلخواه اهدایی (دلار آمریکا)",
  "dedicationLabel": "یادداشت یا تقدیم‌نامه (اختیاری)",
  "dedicationPlaceholder": "به یاد، به افتخار، یا کلمات انگیزشی برای دانش‌آموزان دختر...",
  "tabCard": "کارت بانکی بین‌المللی",
  "tabCardSub": "آنی • رمزنگاری‌شده • جهانی",
  "tabPaypal": "پی‌پال (PayPal)",
  "tabPaypalSub": "پرداخت سریع با یک کلیک",
  "tabBank": "انتقال مستقیم بانکی",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "۱ ماه انترنت پرسرعت و وی‌پی‌ان امن",
      "tier": "سطح ۱: اتصال امن",
      "impact": "تامین ۱ ماه انترنت پرسرعت و وی‌پی‌ان امن برای اتصال یک دانش‌آموز در افغانستان.",
      "badge": "بسیار حیاتی"
    },
    {
      "amount": 75,
      "label": "سرور ابری و محیط توسعه کدنویسی",
      "tier": "سطح ۲: زیرساخت فنی",
      "impact": "پوشش سرورهای ابری کدنویسی، مواد درسی پیشرفته و دانلود آفلاین دروس.",
      "badge": "محبوب‌ترین"
    },
    {
      "amount": 150,
      "label": "بورسیه تحصیلی مستقیم یک دانش‌آموز",
      "tier": "سطح ۳: بورسیه کامل",
      "impact": "تأمین مالی مستقیم یک سمستر کامل آموزش مهندسی نرم‌افزار برای یک دختر محروم از تحصیل.",
      "badge": "تأثیر ماندگار"
    },
    {
      "amount": 500,
      "label": "تهیه لپ‌تاپ اختصاصی برای دانش‌آموز",
      "tier": "سطح ۴: تجهیزات سخت‌افزاری",
      "impact": "خریداری و تحویل امن یک دستگاه لپ‌تاپ تخصصی برنامه‌نویسی و پاوربانک برای یک دانش‌آموز.",
      "badge": "تحول‌آفرین"
    },
    {
      "amount": 1200,
      "label": "تأمین مالی کامل یک‌ساله مسیر شغلی",
      "tier": "سطح ۵: سرپرستی سالانه",
      "impact": "پوشش جامع یک‌ساله دوره مهندسی نرم‌افزار، منتورشیپ بین‌المللی یک‌به‌یک و استخدام ریموت جهانی.",
      "badge": "بورسیه جامع سالانه"
    }
  ],
  "donateNowBtn": "انتقال به درگاه پرداخت امن",
  "processingBtn": "در حال اتصال به درگاه امن رمزنگاری‌شده...",
  "cancelBtn": "انصراف",
  "encryptedNotice": "رمزنگاری پیشرفته ۲۵۶ بیتی بانکی • بدون ذخیره‌سازی اطلاعات کارت",
  "paypalTitle": "تکمیل پرداخت از طریق پی‌پال",
  "paypalDesc": "جهت تأیید اهدا به پرتال امن پی‌پال هدایت خواهید شد.",
  "paypalError": "اتصال به درگاه پی‌پال میسر نشد. لطفاً از کارت بانکی یا واریز حساب استفاده کنید.",
  "bankSelectLabel": "انتخاب حساب بانکی رسمی آکادمی:",
  "bankVerifiedBadge": "شرکای معتبر بانکی بین‌المللی",
  "copyAllBtn": "کپی کردن کلیه مشخصات بانکی",
  "allCopiedText": "تمام مشخصات حساب در کلیپ‌بورد کپی شد!",
  "copiedText": "کپی شد!",
  "beneficiaryLabel": "نام صاحب حساب (ذینفع)",
  "ibanLabel": "شماره شبا بین‌المللی (IBAN)",
  "bicLabel": "کد سوئیفت / BIC",
  "routingLabel": "کد روتینگ (ACH / Wire)",
  "sortCodeLabel": "سورت کد (Sort Code)",
  "accountNumberLabel": "شماره حساب",
  "bankNameLabel": "نام بانک یا مؤسسه مالی",
  "bankAddressLabel": "آدرس ثبتی شعبه بانک",
  "noticeLabel": "شرط تأیید واریز حساب",
  "receiptHeader": "ثبت و ارسال رسید حواله بانکی",
  "receiptSub": "رسید واریزی خود را ثبت کنید تا تیم مالی ما پس از تایید، گواهی رسمی اهدا را برایتان ایمیل کند.",
  "donorNameLabel": "نام و نام خانوادگی اهداکننده",
  "donorNamePlaceholder": "مثلاً: سارا رضایی",
  "donorEmailLabel": "آدرس ایمیل شما",
  "donorEmailPlaceholder": "مثلاً: sara@example.com",
  "transferAmountLabel": "مبلغ و ارز واریز شده",
  "txIdLabel": "کد پیگیری تراکنش / شماره ارجاع بانکی (UTR)",
  "txIdPlaceholder": "مثلاً: TXN-984210 یا شماره حواله",
  "notesLabel": "پیام اختیاری یا تقدیم‌نامه",
  "submitReceiptBtn": "ارسال رسید بانکی",
  "submittingReceiptBtn": "در حال بررسی و ثبت رسید...",
  "successReceiptTitle": "رسید بانکی با موفقیت ثبت شد!",
  "successReceiptDesc": "از همبستگی و سخاوت شما بی‌نهایت سپاسگزاریم. رسید توسط تیم مالی بررسی و تاییدیه رسمی ارسال خواهد شد.",
  "trackingRefLabel": "کد پیگیری اختصاصی:",
  "alertFillRequired": "لطفاً نام، ایمیل و مبلغ واریزی را وارد کنید.",
  "alertMinDonation": "حداقل مبلغ اهدایی ۱ دلار است.",
  "alertNetworkError": "خطای شبکه رخ داد. لطفاً مجدداً تلاش کنید یا با پشتیبانی در تماس شوید.",
  "alertSubmitFailed": "ارسال رسید بانکی با خطا مواجه شد.",
  "girlsEnrolled": "دختران ثبت‌نام‌شده",
  "liveClassrooms": "کلاس‌های آنلاین زنده",
  "freeScholarships": "۱۰۰٪ رایگان",
  "trustBadge1Title": "۱۰۰٪ تأثیر مستقیم آموزشی",
  "trustBadge1Desc": "کلیه کمک‌های دریافتی مستقیماً برای تجهیز لپ‌تاپ، اشتراک اینترنت و آموزش رایگان دختران اختصاص می‌یابد.",
  "trustBadge2Title": "امنیت و حریم خصوصی مطلق",
  "trustBadge2Desc": "هویت دانش‌آموزان و موقعیت فیزیکی آنان تحت تدابیر فوق‌امنیتی و رمزنگاری پیشرفته محافظت می‌شود.",
  "trustBadge3Title": "شفافیت و پاسخگویی کامل",
  "trustBadge3Desc": "گزارش‌های دوره‌ای مالی شفاف، بررسی مستقل و امکان رهگیری دستاوردهای دانش‌آموزان تحت پوشش.",
  "storiesBadge": "صداهایی از کابل، هرات و بلخ",
  "storiesTitle": "آموزش در محاصره، امیدهای تسلیم‌ناپذیر",
  "storiesSub": "سخنانی از دانش‌آموزان دختر ما که در کلاس‌های درس مخفیانه در حال فراگیری علم و کدنویسی هستند.",
  "stories": [
    {
      "name": "فاطمه ر.",
      "location": "کابل، افغانستان",
      "track": "مهندسی نرم‌افزار فول‌استک",
      "quote": "وقتی دانشگاه‌ها بسته شدند احساس کردم همه آرزوهایم بر باد رفت. آکادمی صافی آینده را به من برگرداند. امروز من نرم‌افزارهای ابری می‌سازم و به دختران کوچک‌تر محله‌ام برنامه‌نویسی یاد می‌دهم.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "زهرا م.",
      "location": "هرات، افغانستان",
      "track": "پایتون و یادگیری ماشین",
      "quote": "لپ‌تاپ و بسته انترنتی که از طریق کمک‌های شما دریافت کردم زندگی‌ام را دگرگون کرد. من دیگر یک عدد فراموش‌شده نیستم؛ من پژوهشگر آینده هوش مصنوعی هستم.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "مریم ک.",
      "location": "مزار شریف، افغانستان",
      "track": "طراحی رابط و تجربه کاربری (UI/UX)",
      "quote": "آن‌ها درهای فیزیکی مکاتب را قفل زدند، اما هرگز نمی‌توانند اشتیاق ما به دانستن را زندانی کنند. هر کدی که می‌نویسم، پاسخی به تاریکی است.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "شفافیت مالی و تعهد اخلاقی",
  "transparencyTitle": "هر دلار شما دقیقاً در کجا مصرف می‌شود؟",
  "transparencySub": "ما به اصل شفافیت مطلق پایبندیم. در این بخش نحوه تخصیص اعتبارات اهدایی آورده شده است.",
  "allocations": [
    {
      "percent": "۵۰٪",
      "title": "تأمین سخت‌افزار و انترنت دانش‌آموزان",
      "desc": "خرید لپ‌تاپ‌های کاری، اشتراک اینترنت پرسرعت و وی‌پی‌ان، پاوربانک‌های خورشیدی و تجهیزات یادگیری در خانه."
    },
    {
      "percent": "۳۰٪",
      "title": "زیرساخت ابری و سرورهای آموزشی",
      "desc": "سرورهای غیرمتمرکز، پلتفرم ویدیوهای آفلاین درسی، و محیط‌های اجرای کدهای برنامه‌نویسی دانش‌آموزان."
    },
    {
      "percent": "۱۵٪",
      "title": "منتورشیپ جهانی و کاریابی ریموت",
      "desc": "حق‌الزحمه منتورهای بین‌المللی، آموزش زبان انگلیسی تخصصی و اتصال فارغ‌التحصیلان به بازار کار آنلاین جهانی."
    },
    {
      "percent": "۵٪",
      "title": "عملیات امنیتی و پایش ریسک",
      "desc": "حسابرسی‌های امنیتی، ایمنی فرآیندهای توزیع و تضمین محرمانگی کامل هویت دانش‌آموزان."
    }
  ],
  "faqBadge": "پرسش‌های پرتکرار",
  "faqTitle": "سؤالات متداول درباره کمک‌های مالی",
  "faqSub": "پاسخ به سوالات پیرامون نحوه کمک، تضمین امنیت دانش‌آموزان و گزارش‌دهی مالی.",
  "faqs": [
    {
      "q": "چگونه مطمئن می‌شوید کمک‌ها امن به دست دختران در افغانستان می‌رسد؟",
      "a": "ما از طریق شبکه‌ای از هماهنگ‌کننده‌های معتمد محلی، بسته‌های سخت‌افزاری و هزینه‌های اینترنت را بدون ارتباط با مجاری وابسته به حاکمیت و به روش‌های غیرقابل ردگیری توزیع می‌کنیم."
    },
    {
      "q": "آیا کمک مالی من ایمن و دارای رسید معتبر است؟",
      "a": "بله، تمام پرداخت‌های آنلاین از طریق سیستم‌های رمزنگاری معتبر بین‌المللی و حساب‌های رسمی ثبت‌شده بانکی اروپا و آمریکا انجام می‌شود و رسید رسمی صادر می‌گردد."
    },
    {
      "q": "آیا می‌توانم هزینه تحصیل یک دانش‌آموز مشخص را متقبل شوم؟",
      "a": "بله، در سطوح حمایتی ۳ به بالا، می‌توانید در یادداشت نام یا مشخصات دلخواه را قید کنید تا گزارش پیشرفت تحصیلی آن دانش‌آموز (به‌صورت ناشناس) برایتان ارسال شود."
    },
    {
      "q": "چه روش‌های پرداختی پشتیبانی می‌شوند؟",
      "a": "انواع کارت‌های اعتباری بین‌المللی، پی‌پال (PayPal)، و حواله مستقیم بانکی در قالب‌های دلاری (ACH)، یورویی (SEPA) و پوند انگلیس (Faster Payments)."
    },
    {
      "q": "هویت دانش‌آموزان چگونه در برابر خطرات احتمالی حفظ می‌شود؟",
      "a": "حفظ جان و امنیت دانش‌آموزان خط قرمز ماست. دانش‌آموزان با شناسه‌های مستعار و در بستر تونل‌های فوق‌العاده امن بدون الزام به باز کردن دوربین در کلاس‌ها شرکت می‌کنند."
    }
  ],
  "bottomCtaBadge": "در کنار زنان شجاع افغانستان بایستید",
  "bottomCtaTitle": "در تاریک‌ترین روزها، مشعلی از امید برافروزید.",
  "bottomCtaDesc": "به جمع صدها نیکوکار، متخصص فناوری و حامی حقوق بشر در سراسر جهان بپیوندید و آینده را روشن کنید.",
  "bottomCtaBtn": "همین حالا اهدا کنید • نجات آموزش یک دختر",
  "verifiedScholarship": "طرح امداد تحصیلی بین‌المللی با ساختار عام‌المنفعه معتبر",
  "bankAccounts": [
    {
      "title": "دلار آمریکا (ACH / Routing) - شیرین گل احمدی",
      "subtitle": "انتقال مستقیم بانکی داخلی آمریکا / وایرکس",
      "note": "حداقل مبلغ واریز ۱ دلار است."
    },
    {
      "title": "یورو SEPA (مالت) - شیرین گل احمدی",
      "subtitle": "انتقال مستقیم حوزه یورو اروپا (SEPA)",
      "note": "بدون کارمزد در سراسر اتحادیه اروپا."
    },
    {
      "title": "پوند انگلیس (UK Faster Payments) - شاهین صافی",
      "subtitle": "انتقال مستقیم بانکی داخل بریتانیا / BACS",
      "note": "تسویه حساب فوری از طریق Faster Payments."
    },
    {
      "title": "یورو SEPA (مالت) - شاهین صافی",
      "subtitle": "انتقال بین‌بانکی حوزه یورو اروپا (SEPA)",
      "note": "انتقال بانکی استاندارد طی ۱ الی ۲ روز کاری."
    },
    {
      "title": "یورو SEPA (لوکزامبورگ) - شاهین صافی",
      "subtitle": "حواله مستقیم بانکی SEPA لوکزامبورگ",
      "note": "انتقال مستقیم با شناسه بین‌المللی شبا."
    }
  ]
},
  "ps": {
  "isRtl": true,
  "home": "اصلي پاڼه",
  "heroBadge": "بېړنۍ ښوونیزه مرسته • د بندیز پر وړاندې ودرېدل",
  "heroTitle1": "د ښوونځیو دروازې یې وتړلې.",
  "heroTitle2": "موږ د کایناتو ورونه پرانیزو.",
  "heroDesc1": "کله چې په افغانستان کې ۱.۴ میلیونه نجونې او ځوانې مېرمنې د زده کړې له بنسټیز حق څخه بې برخې شوې، صافي اکاډمۍ چوپه پاتې نشوه. موږ د خوندي غیرمتمرکزو شبکو او کوډ شوو لارو، د پروګرامینګ او ټیکنالوژۍ مسلکي زده کړې مستقیماً د افغان نجونو کورونو ته رسوو.",
  "heroDesc2": "ستاسو مرسته خیرات نه دی، بلکې د تیاره پر وړاندې رڼا، مقاومت او توانمندول دي. هره یوه روپۍ په مستقیم ډول د سټارلینکن انټرنیټ، لپ‌ټاپونو او نړیوالو استادانو په لګښت مصرفیږي. سل په سلو کې ښوونیزې مرستې زده‌کوونکو ته رسیږي.",
  "liveGoalLabel": "د ۲۰۲۶ تعلیمي مرستو ژوندی هدف",
  "raisedOf": "ټول شوي له",
  "goal": "ټول هدف",
  "fundedBadge": "شفاف مالي حساب • ۱۰۰٪ زده‌کوونکو ته ځانګړی شوی",
  "boxTitle": "د زده‌کوونکو مستقیم مالي ملاتړ",
  "boxSubtitle": "یو له ملاتړیزو کچو وټاکئ یا خپله خوښه اندازه ولیکئ.",
  "customAmount": "خپله خوښه مرسته (امریکایي ډالر)",
  "dedicationLabel": "ځانګړی یادښت یا ډالۍ (اختیاري)",
  "dedicationPlaceholder": "د زده کوونکو نجونو لپاره د هڅونې ټکي یا یادښت...",
  "tabCard": "نړیوال بانکي کارت",
  "tabCardSub": "سملاسي • خوندي • نړیوال",
  "tabPaypal": "پی‌پال (PayPal)",
  "tabPaypalSub": "په یوه کلیک سره چټک تادیه",
  "tabBank": "مستقیم بانکي لیږد",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "۱ میاشت چټک انټرنیټ او خوندي وی‌پي‌این",
      "tier": "لومړۍ کچه: خوندي نښلول",
      "impact": "په افغانستان کې د یوې زده‌کوونکې نجلۍ لپاره د یوې میاشتې چټک انټرنیټ او وی‌پي‌این چمتو کول.",
      "badge": "حیاتي"
    },
    {
      "amount": 75,
      "label": "کلاوډ سرور او د کوډینګ چاپېریال",
      "tier": "دویمه کچه: تخنیکي زېربنا",
      "impact": "د کوډینګ کلاوډ سرورونه، پرمختللي درسي توکي او آفلاین ویډیوګانې تمویلوي.",
      "badge": "ډېر مشهور"
    },
    {
      "amount": 150,
      "label": "د یوې زده‌کوونکې مستقیم تحصیلي بورس",
      "tier": "دریمه کچه: بشپړ بورس",
      "impact": "د یوې محرومې نجلۍ لپاره د سافټویر انجینرۍ د بشپړ سمستر زده‌کړې مستقیم مالي ملاتړ.",
      "badge": "لوړ اغېز"
    },
    {
      "amount": 500,
      "label": "زده‌کوونکې ته د لپ‌ټاپ چمتو کول",
      "tier": "څلورمه کچه: سخت‌افزاري تجهیزات",
      "impact": "یوې نجلۍ ته د پروګرامینګ لپاره د ځانګړي لپ‌ټاپ او پاوربینک پیرودل او سپارل.",
      "badge": "بدلون راوړونکی"
    },
    {
      "amount": 1200,
      "label": "د یوه کال بشپړ تحصیلي لګښت تمویل",
      "tier": "پنځمه کچه: کلنی بورس",
      "impact": "د سافټویر انجینرۍ بشپړ یو کلن لګښت، له نړیوالو لارښودانو سره یو پر یو مېنټورشپ او نړیوال کارموندنه.",
      "badge": "بشپړ کلنی ملاتړ"
    }
  ],
  "donateNowBtn": "د خوندي تادیې برخې ته تلل",
  "processingBtn": "د خوندي شبکې سره د نښلولو په حال کې...",
  "cancelBtn": "لغوه کول",
  "encryptedNotice": "۲۵۶ بیټه پرمختللی بانکي امنیت • د کارت معلومات نه ساتل کیږي",
  "paypalTitle": "د پی‌پال له لارې تادیه",
  "paypalDesc": "ستاسو د تادیې د بشپړولو لپاره به د پی‌پال خوندي پاڼې ته واستول شئ.",
  "paypalError": "له پی‌پال سره ونښلول شو. مهرباني وکړئ بانکي کارت یا حواله وکاروئ.",
  "bankSelectLabel": "د اکاډمۍ رسمي بانکي حساب وټاکئ:",
  "bankVerifiedBadge": "تایید شوي نړیوال بانکي ملګري",
  "copyAllBtn": "د بانک ټول معلومات کاپي کړئ",
  "allCopiedText": "د حساب ټول معلومات کاپي شول!",
  "copiedText": "کاپي شو!",
  "beneficiaryLabel": "د حساب خاوند نوم",
  "ibanLabel": "نړیوال آی‌بان نمبر (IBAN)",
  "bicLabel": "سوېفټ کوډ / BIC",
  "routingLabel": "روټینګ نمبر (ACH / Wire)",
  "sortCodeLabel": "سورټ کوډ (Sort Code)",
  "accountNumberLabel": "د حساب شمېره",
  "bankNameLabel": "د بانک نوم",
  "bankAddressLabel": "د بانک رسمي پته",
  "noticeLabel": "د حساب د تایید شرط",
  "receiptHeader": "د بانکي رسید استول او ثبتول",
  "receiptSub": "خپل رسید ثبت کړئ ترڅو زموږ مالي ډله یې تصدیق او رسمي تایید پاڼه درواستوي.",
  "donorNameLabel": "د مرسته کوونکي بشپړ نوم",
  "donorNamePlaceholder": "د بېلګې په توګه: احمد خان",
  "donorEmailLabel": "ستاسو برېښنالیک پته",
  "donorEmailPlaceholder": "د بېلګې په توګه: ahmad@example.com",
  "transferAmountLabel": "لیږدول شوې اندازه او اسعار",
  "txIdLabel": "د لیږد پیژندپاڼه / بانکي رفرنس (UTR)",
  "txIdPlaceholder": "د بېلګې په توګه: TXN-984210",
  "notesLabel": "اضافي یادښت یا پیغام",
  "submitReceiptBtn": "د رسید استول",
  "submittingReceiptBtn": "د رسید د ثبتولو په حال کې...",
  "successReceiptTitle": "رسید په بریا سره ثبت شو!",
  "successReceiptDesc": "ستاسو له سخاوت او مرستې مننه. رسید به وڅېړل شي او رسمي تایید پاڼه به درواستول شي.",
  "trackingRefLabel": "د تعقیب شمېره:",
  "alertFillRequired": "مهرباني وکړئ خپل نوم، بریښنالیک او د واریز اندازه وټاکئ.",
  "alertMinDonation": "لږ تر لږه د مرستې اندازه ۱ ډالر ده.",
  "alertNetworkError": "د انټرنیټ ستونزه شته، مهرباني وکړئ بیا هڅه وکړئ.",
  "alertSubmitFailed": "د رسید استول ناکام شول.",
  "girlsEnrolled": "ثبت شوې نجونې",
  "liveClassrooms": "ژوندۍ آنلاین ټولګي",
  "freeScholarships": "۱۰۰٪ وړیا",
  "trustBadge1Title": "۱۰۰٪ مستقیمه ښوونیزه ګټه",
  "trustBadge1Desc": "ټولې مرستې په مستقیم ډول د افغان نجونو د کمپیوټرونو، انټرنیټ او زده کړې لپاره لګول کیږي.",
  "trustBadge2Title": "بشپړ محرمیت او خوندیتوب",
  "trustBadge2Desc": "د نجونو هویت او استوګنځی په خورا پرمختللو کوډ شوو وسیلو ساتل کیږي.",
  "trustBadge3Title": "روڼتیا او مسؤلیت منل",
  "trustBadge3Desc": "مالي راپورونه په دوامداره توګه خپریږي او د زده‌کوونکو د بریا راپورونه شریکیږي.",
  "storiesBadge": "له کابل، هرات او بلخ څخه غږونه",
  "storiesTitle": "تر محاصرې لاندې زده‌کړه، نه ماتېدونکی هوډ",
  "storiesSub": "زموږ د زده‌کوونکو نجونو خپلې خبرې چې په پټو ټولګیو کې زده‌کړې کوي.",
  "stories": [
    {
      "name": "فاطمه ر.",
      "location": "کابل، افغانستان",
      "track": "د فول سټیک پروګرامینګ انجینري",
      "quote": "کله چې پوهنتونونه بند شول، زما راتلونکی تیاره ښکاریده. صافي اکاډمۍ هیله بېرته راکړه. نن زه کلاوډ سافټویرونه جوړوم او وړو نجونو ته کوډینګ ورښیم.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "زهرا م.",
      "location": "هرات، افغانستان",
      "track": "پایتون او مصنوعي هوښ (AI)",
      "quote": "هغه لپ‌ټاپ او انټرنیټ چې ستاسو له برکته ما ترلاسه کړل زما ژوند یې بدل کړ. زه یو هیر شوی عدد نه یم؛ زه د مصنوعي هوښ څیړونکې یم.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "مریم ک.",
      "location": "مزار شریف، افغانستان",
      "track": "د کاروونکي تجربه او ډیزاین (UI/UX)",
      "quote": "دوی ښوونځي وتړل، خو زموږ فکر نشي زنداني کولی. زما هر لیکل شوی کوډ د تیارو پر وړاندې بریا ده.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "مالي روڼتیا او ژمنتیا",
  "transparencyTitle": "ستاسو هر ډالر چیرته لګول کیږي؟",
  "transparencySub": "موږ پوره روڼتیا لرو؛ دلته ستاسو د مرستو ویش ښودل شوی دی.",
  "allocations": [
    {
      "percent": "۵۰٪",
      "title": "د زده‌کوونکو لپ‌ټاپونه او انټرنیټ",
      "desc": "د لپ‌ټاپونو اخیستل، چټک سټارلینکن او وی‌پي‌این انټرنیټ، لمریزې بټرۍ او د کور درسي وسایل."
    },
    {
      "percent": "۳۰٪",
      "title": "کلاوډ سرورونه او ښوونیز سیستم",
      "desc": "غیر متمرکز سرورونه، د درسي ویډیوګانو آفلاین پلاتفورم او د زده‌کوونکو د کوډینګ محیط."
    },
    {
      "percent": "۱۵٪",
      "title": "نړیوال استادان او آنلاین کارموندنه",
      "desc": "د نړیوالو استادانو لګښت، مسلکي انګلیسي او له لیرې نړیوال کار ته د نجونو رسول."
    },
    {
      "percent": "۵٪",
      "title": "امنیتي عملیات او د خطرونو کنټرول",
      "desc": "امنیتي پلټنې، خوندي توزیع او د زده‌کوونکو د هویت بشپړ پټ ساتل."
    }
  ],
  "faqBadge": "ډېرې پوښتل شوې پوښتنې",
  "faqTitle": "د مرستو په اړه عامې پوښتنې",
  "faqSub": "د مرستې څرنګوالي، د زده‌کوونکو د خوندیتوب او مالي روڼتیا په هکله ځوابونه.",
  "faqs": [
    {
      "q": "څنګه باوري کېږئ چې مرستې نجونو ته په افغانستان کې رسیږي؟",
      "a": "موږ په هیواد کې د باوري ځايي ملګرو، خوندي وسایلو او پټو لارو له لارې مرستې مستقیم هغوی ته رسوو، پرته له دې چې کوم حکومتي کانال په کې شامل وي."
    },
    {
      "q": "ایا زما مالي مرسته خوندي او رسمي ده؟",
      "a": "هو، ټولې تادیې د نړیوالو بانکي سیستمونو له لارې په اروپايي او امریکايي رسمي بانکي حسابونو کې ترسره کیږي او رسمي تاییدیه لري."
    },
    {
      "q": "ایا زه کولی شم د یوې ځانګړې نجلۍ لګښت پر غاړه واخلم؟",
      "a": "هو، په لوړو کچو کې، تاسو کولی شئ په یادښت کې ولیکئ او موږ به ستاسو لپاره د زده کوونکې د زده کړې راپور شریک کړو."
    },
    {
      "q": "د پیسو تادیه په کومو طریقو کیږي؟",
      "a": "په نړیوالو بانکي کارتونو، پی‌پال او مستقیم بانکي حسابونو لکه امریکايي ډالر، یورو او پونډ."
    },
    {
      "q": "د نجونو خوندیتوب څنګه تضمین کیږي؟",
      "a": "د نجونو خوندیتوب زموږ تر ټولو لوی مسؤلیت دی. هغوی په مستعارو نومونو او له کمره پرته په بشپړ کوډ شوو چینلونو کې زده‌کړه کوي."
    }
  ],
  "bottomCtaBadge": "د افغان ښځو تر څنګ ودریږئ",
  "bottomCtaTitle": "په تیاره شیبو کې د امید ډیوه روښانه کړئ.",
  "bottomCtaDesc": "له سلګونو نړیوالو ملاتړو سره یوځای شئ او د افغان مېرمنو راتلونکی روښانه کړئ.",
  "bottomCtaBtn": "همدا اوس مرسته وکړئ • د یوې نجلۍ راتلونکی وژغورئ",
  "verifiedScholarship": "د نړیوالو تعلیمي مرستو باوري او رسمي نوښت",
  "bankAccounts": [
    {
      "title": "امریکایي ډالر (ACH / Routing) - شیرین ګل احمدي",
      "subtitle": "د امریکا کورنی بانکي لیږد / وایرکس",
      "note": "لږ تر لږه واریز ۱ ډالر دی."
    },
    {
      "title": "یورو SEPA (مالټا) - شیرین ګل احمدي",
      "subtitle": "د اروپا د یورو مستقیم لیږد (SEPA)",
      "note": "په ټوله اروپا کې پرته له کوم فیس."
    },
    {
      "title": "د برتانیا پونډ (UK Faster Payments) - شاهین صافي",
      "subtitle": "په بریتانیا کې دننه چټک بانکي لیږد / BACS",
      "note": "سملاسي تسویه د Faster Payments له لارې."
    },
    {
      "title": "یورو SEPA (مالټا) - شاهین صافي",
      "subtitle": "د اروپا د یورو مستقیم لیږد (SEPA)",
      "note": "معیاري بانکي لیږد په ۱-۲ کاري ورځو کې."
    },
    {
      "title": "یورو SEPA (لوګزامبورګ) - شاهین صافي",
      "subtitle": "مستقیم SEPA لوګزامبورګ بانکي لیږد",
      "note": "د نړیوال آی‌بان له لارې مستقیم لیږد."
    }
  ]
},
  "ar": {
  "isRtl": true,
  "home": "الرئيسية",
  "heroBadge": "الإغاثة التعليمية الطارئة • تحدي الحظر",
  "heroTitle1": "أغلقوا أبواب المدارس.",
  "heroTitle2": "ونحن نفتح آفاق الكون.",
  "heroDesc1": "حين حُرمت ١.٤ مليون فتاة وامرأة في أفغانستان من حقهن الأساسي في التعليم، لم تقف أكاديمية صافي مكتوفة الأيدي. عبر شبكات لا مركزية آمنة وقنوات مشفرة، ننقل تعليم البرمجة والتكنولوجيا المتقدمة مباشرة إلى منازل النساء الشجاعات في أفغانستان.",
  "heroDesc2": "مساهمتكم ليست مجرد إحسان، بل هي تضامن وصمود وتمكين. كل سنت تتبرعون به يُخصص مباشرة لتوفير إنترنت ستارلينك وأجهزة حاسوب محمولة آمنة وتوجيه دولي لطالباتنا. ١٠٠٪ من أموال التعليم تذهب مباشرة للفتيات.",
  "liveGoalLabel": "هدف صندوق الإغاثة التعليمية لعام ٢٠٢٦",
  "raisedOf": "تم جمع من أصل",
  "goal": "الهدف الكلي",
  "fundedBadge": "سجل مالي شفاف • تخصيص ١٠٠٪ للطالبات",
  "boxTitle": "كفالة تعليمية مباشرة لطالبة",
  "boxSubtitle": "اختر أحد مستويات الدعم أو حدد المبلغ الذي ترغب في التبرع به.",
  "customAmount": "مبلغ التبرع المخصص (بالدولار الأمريكي)",
  "dedicationLabel": "إهداء أو رسالة خاصة (اختياري)",
  "dedicationPlaceholder": "تكريماً لـ، أو كلمات تشجيعية للطالبات...",
  "tabCard": "بطاقة بنكية دولية",
  "tabCardSub": "فوري • مشفر • عالمي",
  "tabPaypal": "باي بال (PayPal)",
  "tabPaypalSub": "دفع سريع بنقرة واحدة",
  "tabBank": "تحويل بنكي مباشر",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "شهر واحد من الإنترنت فائق السرعة وVPN آمن",
      "tier": "المستوى ١: الاتصال الآمن",
      "impact": "توفير شهر من الإنترنت والاتصال المشفر لطالبة داخل أفغانستان لمواصلة تعليمها.",
      "badge": "حيوي وأساسي"
    },
    {
      "amount": 75,
      "label": "خوادم سحابية وبيئة تطوير البرمجيات",
      "tier": "المستوى ٢: البنية التحتية",
      "impact": "تمويل خوادم الحوسبة السحابية والمواد التعليمية المتقدمة وتنزيل الدروس بدون إنترنت.",
      "badge": "الأكثر شيوعاً"
    },
    {
      "amount": 150,
      "label": "منحة دراسية كاملة لطالبة",
      "tier": "المستوى ٣: منحة دراسية",
      "impact": "تمويل مباشر لفصل دراسي كامل في هندسة البرمجيات لطالبة محرومة من التعليم.",
      "badge": "أثر استثنائي"
    },
    {
      "amount": 500,
      "label": "توفير حاسوب محمول لطالبة",
      "tier": "المستوى ٤: الأجهزة والمعدات",
      "impact": "تأمين وتسليم جهاز حاسوب محمول مخصص للبرمجة وبنك طاقة لطالبة داخل أفغانستان.",
      "badge": "تأثير تحويلي"
    },
    {
      "amount": 1200,
      "label": "كفالة عام دراسي كامل ومسار مهني",
      "tier": "المستوى ٥: الرعاية السنوية",
      "impact": "تغطية كاملة لسنة من هندسة البرمجيات، وتوجيه دولي شخصي، ودعم التوظيف عن بُعد.",
      "badge": "رعاية سنوية شاملة"
    }
  ],
  "donateNowBtn": "المتابعة إلى بوابة الدفع الآمنة",
  "processingBtn": "جاري الاتصال بالبوابة المشفرة بأمان...",
  "cancelBtn": "إلغاء",
  "encryptedNotice": "تشفير بنكي متقدم ٢٥٦ بت • لا يتم تخزين أي بيانات للبطاقات",
  "paypalTitle": "إتمام التبرع عبر باي بال",
  "paypalDesc": "سيتم توجيهك إلى بوابة باي بال الآمنة لتأكيد عملية التبرع.",
  "paypalError": "تعذر تهيئة بوابة باي بال. يرجى تجربة الدفع بالبطاقة أو التحويل البنكي.",
  "bankSelectLabel": "اختر الحساب المصرفي الرسمي للأكاديمية:",
  "bankVerifiedBadge": "شركاء مصرفيون دوليون معتمدون",
  "copyAllBtn": "نسخ كافة البيانات المصرفية",
  "allCopiedText": "تم نسخ جميع التفاصيل إلى الحافظة!",
  "copiedText": "تم النسخ!",
  "beneficiaryLabel": "اسم المستفيد (صاحب الحساب)",
  "ibanLabel": "رقم الآيبان الدولي (IBAN)",
  "bicLabel": "رمز السويفت / BIC",
  "routingLabel": "رقم التوجيه (Routing / ACH)",
  "sortCodeLabel": "السورت كود (Sort Code)",
  "accountNumberLabel": "رقم الحساب",
  "bankNameLabel": "اسم المصرف",
  "bankAddressLabel": "العنوان المسجل للبنك",
  "noticeLabel": "شرط تأكيد الإيداع المصرفي",
  "receiptHeader": "تسجيل إيصال التحويل البنكي",
  "receiptSub": "سجل إيصال التحويل ليتسنى لفريقنا المالي التحقق وإصدار إفادة رسمية بالتبرع.",
  "donorNameLabel": "الاسم الكامل للمتبرع",
  "donorNamePlaceholder": "مثال: مريم العتيبي",
  "donorEmailLabel": "البريد الإلكتروني",
  "donorEmailPlaceholder": "مثال: maryam@example.com",
  "transferAmountLabel": "المبلغ المحول والعملة",
  "txIdLabel": "الرقم المرجعي للحوالة (UTR)",
  "txIdPlaceholder": "مثال: TXN-984210 أو رقم الحوالة",
  "notesLabel": "رسالة إضافية أو إهداء",
  "submitReceiptBtn": "إرسال إيصال التحويل",
  "submittingReceiptBtn": "جاري التحقق وتسجيل الإيصال...",
  "successReceiptTitle": "تم تسجيل الإيصال بنجاح!",
  "successReceiptDesc": "شكراً جزيلاً لعطائكم السخي. سيقوم الفريق المالي بتدقيق السجل وإرسال التأكيد الرسمي لبريدكم الإلكتروني.",
  "trackingRefLabel": "رقم التتبع المرجعي:",
  "alertFillRequired": "يرجى تعبئة الاسم والبريد الإلكتروني ومبلغ التحويل.",
  "alertMinDonation": "الحد الأدنى للتبرع هو ١ دولار أمريكي.",
  "alertNetworkError": "خطأ في الشبكة. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.",
  "alertSubmitFailed": "فشل في إرسال إيصال التحويل البنكي.",
  "girlsEnrolled": "طالبة ملتحقة",
  "liveClassrooms": "فصول دراسية مباشرة",
  "freeScholarships": "١٠٠٪ مجاناً",
  "trustBadge1Title": "أثر مباشر بنسبة ١٠٠٪",
  "trustBadge1Desc": "جميع التبرعات تذهب مباشرة لتغطية أجهزة الحواسيب واشتراكات الإنترنت وتعليم الفتيات في أفغانستان.",
  "trustBadge2Title": "خصوصية وأمان تام",
  "trustBadge2Desc": "تتم حماية هويات الطالبات ومواقعهن الجغرافية بأعلى معايير التشفير الرقمي العسكري.",
  "trustBadge3Title": "شفافية مالية مدققة",
  "trustBadge3Desc": "سجلات مالية محدثة باستمرار، وتقارير سنوية معتمدة، وإشعارات بإنجازات الطالبات.",
  "storiesBadge": "أصوات من كابل وهيرات ومزار شريف",
  "storiesTitle": "التعليم تحت الحصار، والإرادة لا تنكسر",
  "storiesSub": "كلمات حقيقية من طالباتنا اللاتي يدرسن سراً في فصول افتراضية داخل أفغانستان.",
  "stories": [
    {
      "name": "فاطمة ر.",
      "location": "كابل، أفغانستان",
      "track": "هندسة البرمجيات الكاملة (Full-Stack)",
      "quote": "حين أغلقت الجامعات أبوابها شعرت بأن كل أحلامي قد انتهت. أكاديمية صافي أعادت لي الأمل في المستقبل. اليوم أقوم ببناء تطبيقات سحابية وأعلم الفتيات الصغيرات في حيي.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "زهراء م.",
      "location": "هيرات، أفغانستان",
      "track": "بايثون والذكاء الاصطناعي",
      "quote": "الحاسوب المحمول وباقة الإنترنت التي حصلت عليها بفضل تبرعاتكم غيرت حياتي بالكامل. لم أعد رقماً منسياً؛ أنا باحثة واعدة في مجال الذكاء الاصطناعي.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "مريم ك.",
      "location": "مزار شريف، أفغانستان",
      "track": "تصميم واجهات وتجربة المستخدم (UI/UX)",
      "quote": "قد يستطيعون قفل أبواب المباني المدرسية، لكنهم لن يستطيعوا سجن شغفنا بالمعرفة. كل سطر برمجي أكتبه هو انتصار على الظلام.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "النزاهة المالية والحوكمة",
  "transparencyTitle": "أين يُنفق كل دولار تقدمه؟",
  "transparencySub": "نلتزم بأعلى معايير الشفافية المطلقة. إليك كيفية تخصيص أموال التبرعات.",
  "allocations": [
    {
      "percent": "٥٠٪",
      "title": "أجهزة حواسيب وإنترنت للطالبات",
      "desc": "شراء حواسيب مخصصة للبرمجة، باقات إنترنت ستارلينك وVPN، بطاريات شمسية، ومعدات تعلم آمنة."
    },
    {
      "percent": "٣٠٪",
      "title": "البنية التحتية السحابية وأنظمة التعليم",
      "desc": "خوادم غير مركزية، منصات مزامنة مقاطع الدروس بدون إنترنت، وبيئات تشغيل الأكواد البرمجية."
    },
    {
      "percent": "١٥٪",
      "title": "التوجيه الدولي والتأهيل الوظيفي",
      "desc": "مكافآت للموجهين والمدربين الدوليين، تدريب على اللغة الإنجليزية التقنية وربط الخريجات بفرص العمل عن بُعد."
    },
    {
      "percent": "٥٪",
      "title": "عمليات الأمان ومراقبة المخاطر",
      "desc": "تدقيق الامتثال والأمان العملياتي، وحماية وتشفير بيانات وهويات الطالبات بشكل كامل."
    }
  ],
  "faqBadge": "الأسئلة الشائعة",
  "faqTitle": "كل ما تود معرفته عن صندوق التبرعات",
  "faqSub": "إجابات شافية حول أمان إيصال المساعدات والسرية التامة للطالبات والشفافية.",
  "faqs": [
    {
      "q": "كيف تضمنون وصول المساعدات بأمان إلى الطالبات داخل أفغانستان؟",
      "a": "ندير شبكة توزيع آمنة عبر منسقين محليين موثوقين، حيث نوفر الأجهزة وباقات الإنترنت بطرق مشفرة لا تمر عبر أي قنوات تابعة للسلطات الحاكمة."
    },
    {
      "q": "هل تبرعي آمن ومصادق عليه رسمياً؟",
      "a": "نعم، كافة التبرعات تتم عبر بوابات دفع عالمية متوافقة مع معايير الأمان المصرفي وحسابات بنكية رسمية مسجلة في أوروبا والولايات المتحدة."
    },
    {
      "q": "هل يمكنني كفالة طالبة محددة أو مسار دراسي معين؟",
      "a": "نعم، عند اختيار المستوى الثالث أو أعلى، يمكنك تدوين ملاحظة خاصة وسنوافيكم بتقرير دوري مجهول الهوية عن تقدم الطالبة الأكاديمي."
    },
    {
      "q": "ما هي طرق الدفع المقبولة؟",
      "a": "نقبل البطاقات البنكية الدولية، باي بال (PayPal)، والتحويلات المصرفية المباشرة بالدولار (ACH)، واليورو (SEPA)، والجنيه الإسترليني."
    },
    {
      "q": "كيف تحمون هوية الطالبات من أي مخاطر أمنية؟",
      "a": "أمن الطالبات هو أولويتنا المطلقة. تشارك الطالبات بأسماء مستعارة عبر اتصالات مشفرة مشددة وبدون إجبار على تشغيل الكاميرات."
    }
  ],
  "bottomCtaBadge": "قف في الجانب الصحيح من التاريخ",
  "bottomCtaTitle": "أنِر شعلة أمل في أكثر الأوقات حلكة.",
  "bottomCtaDesc": "انضم إلى مئات الداعمين ورواد التكنولوجيا والمدافعين عن حقوق الإنسان حول العالم لتمكين نساء أفغانستان.",
  "bottomCtaBtn": "تبرع الآن • ساهم في تمكين طالبة",
  "verifiedScholarship": "مبادرة إغاثة أكاديمية عالمية غير ربحية معتمدة",
  "bankAccounts": [
    {
      "title": "الدولار الأمريكي (ACH / Routing) - شيرين غل أحمدي",
      "subtitle": "تحويل مصرفي محلي مباشر داخل الولايات المتحدة / وايركس",
      "note": "الحد الأدنى للإيداع هو ١ دولار."
    },
    {
      "title": "اليورو SEPA (مالطا) - شيرين غل أحمدي",
      "subtitle": "تحويل بنكي مباشر داخل منطقة اليورو (SEPA)",
      "note": "بدون أي رسوم تحويل داخل الاتحاد الأوروبي."
    },
    {
      "title": "الجنيه الإسترليني (UK Faster Payments) - شاهين صافي",
      "subtitle": "تحويل محلي مباشر داخل المملكة المتحدة / BACS",
      "note": "تسوية فورية عبر نظام Faster Payments."
    },
    {
      "title": "اليورو SEPA (مالطا) - شاهین صافي",
      "subtitle": "تحويل بنكي مباشر داخل منطقة اليورو (SEPA)",
      "note": "تحويل بنكي قياسي يكتمل خلال يوم إلى يومي عمل."
    },
    {
      "title": "اليورو SEPA (لوكسمبورغ) - شاهین صافي",
      "subtitle": "تحويل بنكي مباشر عبر الحدود SEPA لوكسمبورغ",
      "note": "تحويل مباشر باستخدام رقم الآيبان الدولي."
    }
  ]
},
  "ur": {
  "isRtl": true,
  "home": "مرکزی صفحہ",
  "heroBadge": "ہنگامی تعلیمی امداد • پابندی کے خلاف استقامت",
  "heroTitle1": "انہوں نے اسکولوں کے دروازے بند کر دیئے۔",
  "heroTitle2": "ہم کائنات کے افق کھول رہے ہیں۔",
  "heroDesc1": "جب افغانستان میں ۱۴ لاکھ لڑکیوں اور خواتین کو ان کے بنیادی تعلیمی حق سے محروم کر دیا گیا، تو صافی اکیڈمی خاموش نہیں بیٹھی۔ ہم محفوظ غیر مرکزی نیٹ ورکس اور خفیہ چینلز کے ذریعے جدید ترین پروگرامنگ اور ٹیکنالوجی کی تعلیم براہ راست افغان خواتین کے گھروں تک پہنچاتے ہیں۔",
  "heroDesc2": "آپ کا تعاون محض خیرات نہیں ہے، بلکہ یہ استقامت، یکجہتی اور بااختیار بنانے کا جذبہ ہے۔ آپ کا دیا ہوا ایک ایک پیسہ براہ راست اسٹار لنک کنکشن، محفوظ لیپ ٹاپ اور باہمت طالبات کے لیے عالمی رہنمائی پر خرچ ہوتا ہے۔ تعلیمی فنڈز کا ۱۰۰ فیصد براہ راست طالبات کو جاتا ہے۔",
  "liveGoalLabel": "تعلیمی امدادی فنڈ کا ہدف ۲۰۲۶",
  "raisedOf": "جمع شدہ از",
  "goal": "کل ہدف",
  "fundedBadge": "شفاف مالی کھاتہ • ۱۰۰ فیصد طالبات کے لیے مخصوص",
  "boxTitle": "طالبہ کی براہ راست کفالت اور اسکالرشپ",
  "boxSubtitle": "امدادی سطح کا انتخاب کریں یا اپنی مرضی کی رقم درج کریں۔",
  "customAmount": "اپنی مرضی کی امدادی رقم (امریکی ڈالر)",
  "dedicationLabel": "خصوصی نوٹ یا انتساب (اختیاری)",
  "dedicationPlaceholder": "طالبات کی حوصلہ افزائی کے لیے الفاظ یا انتساب...",
  "tabCard": "بین الاقوامی بینک کارڈ",
  "tabCardSub": "فوری • محفوظ • عالمی",
  "tabPaypal": "پے پال (PayPal)",
  "tabPaypalSub": "ایک کلک میں فوری ادائیگی",
  "tabBank": "براہ راست بینک ٹرانسفر",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "۱ ماہ تیز رفتار انٹرنیٹ اور محفوظ وی پی این",
      "tier": "درجہ ۱: محفوظ رابطہ",
      "impact": "افغانستان میں ایک طالبہ کے لیے ایک ماہ کا تیز رفتار انٹرنیٹ اور محفوظ کنکشن فراہم کرنا۔",
      "badge": "انتہائی ضروری"
    },
    {
      "amount": 75,
      "label": "کلاؤڈ سرور اور کوڈنگ ڈویلپمنٹ ماحول",
      "tier": "درجہ ۲: تکنیکی بنیادی ڈھانچہ",
      "impact": "کوڈنگ کلاؤڈ سرورز، جدید ترین نصاب اور آف لائن ویڈیو اسباق کی فراہمی۔",
      "badge": "سب سے زیادہ مقبول"
    },
    {
      "amount": 150,
      "label": "طالبہ کے لیے براہ راست تعلیمی اسکالرشپ",
      "tier": "درجہ ۳: مکمل اسکالرشپ",
      "impact": "ایک محروم طالبہ کے لیے سافٹ ویئر انجینئرنگ کے مکمل سمسٹر کی فیس اور اخراجات کی کفالت۔",
      "badge": "گہرا اثر"
    },
    {
      "amount": 500,
      "label": "طالبہ کے لیے باقاعدہ لیپ ٹاپ کی فراہمی",
      "tier": "درجہ ۴: ہارڈ ویئر آلات",
      "impact": "پروگرامنگ کے لیے مخصوص لیپ ٹاپ اور پاور بینک کی خریداری اور محفوظ ترسیل۔",
      "badge": "تبدیلی کا پیش خیمہ"
    },
    {
      "amount": 1200,
      "label": "ایک سال کے مکمل تعلیمی ٹریک کی کفالت",
      "tier": "درجہ ۵: سالانہ مکمل کفالت",
      "impact": "سافٹ ویئر انجینئرنگ کے پورے سال کی فیس، ون آن ون بین الاقوامی رہنمائی اور ریموٹ جاب میں مدد۔",
      "badge": "مکمل سالانہ کفالت"
    }
  ],
  "donateNowBtn": "محفوظ ادائیگی کی طرف آگے بڑھیں",
  "processingBtn": "محفوظ انکرپٹڈ گیٹ وے سے رابطہ کیا جا رہا ہے...",
  "cancelBtn": "منسوخ کریں",
  "encryptedNotice": "۲۵۶ بٹ ایڈوانس بینکنگ سیکیورٹی • کارڈ ڈیٹا محفوظ نہیں کیا جاتا",
  "paypalTitle": "پے پال کے ذریعے ادائیگی",
  "paypalDesc": "آپ کو اپنی عطیہ کی تصدیق کے لیے پے پال کے محفوظ پورٹل پر لے جایا جائے گا۔",
  "paypalError": "پے پال گیٹ وے سے رابطہ نہیں ہو سکا۔ برائے مہربانی کارڈ یا بینک ٹرانسفر استعمال کریں۔",
  "bankSelectLabel": "اکیڈمی کا باضابطہ بینک اکاؤنٹ منتخب کریں:",
  "bankVerifiedBadge": "تصدیق شدہ بین الاقوامی بینکنگ پارٹنرز",
  "copyAllBtn": "تمام بینک تفصیلات کاپی کریں",
  "allCopiedText": "تمام تفصیلات کلپ بورڈ پر کاپی ہو گئیں!",
  "copiedText": "کاپی ہو گیا!",
  "beneficiaryLabel": "اکاؤنٹ ہولڈر کا نام",
  "ibanLabel": "بین الاقوامی آئی بین (IBAN)",
  "bicLabel": "سوئفٹ کوڈ / BIC",
  "routingLabel": "روٹنگ نمبر (ACH / Wire)",
  "sortCodeLabel": "سورٹ کوڈ (Sort Code)",
  "accountNumberLabel": "اکاؤنٹ نمبر",
  "bankNameLabel": "بینک کا نام",
  "bankAddressLabel": "بینک کا رجسٹرڈ پتہ",
  "noticeLabel": "بینک ڈپازٹ کی تصدیق کی شرط",
  "receiptHeader": "بینک ٹرانسفر کی رسید جمع کروائیں",
  "receiptSub": "اپنی بینک رسید اپ لوڈ کریں تاکہ ہماری مالیاتی ٹیم اس کی تصدیق کر کے باضابطہ رسید جاری کر سکے۔",
  "donorNameLabel": "عطیہ دہندہ کا پورا نام",
  "donorNamePlaceholder": "مثال کے طور پر: فاطمہ خان",
  "donorEmailLabel": "آپ کا ای میل پتہ",
  "donorEmailPlaceholder": "مثال کے طور پر: fatima@example.com",
  "transferAmountLabel": "منتقل شدہ رقم اور کرنسی",
  "txIdLabel": "ٹرانزیکشن ریفرنس نمبر (UTR)",
  "txIdPlaceholder": "مثال کے طور پر: TXN-984210",
  "notesLabel": "اضافی پیغام یا انتساب",
  "submitReceiptBtn": "رسید جمع کروائیں",
  "submittingReceiptBtn": "رسید کی تصدیق کی جا رہی ہے...",
  "successReceiptTitle": "رسید کامیابی سے درج کر لی گئی!",
  "successReceiptDesc": "آپ کی فیاضی کا دلی شکریہ۔ ہماری فنانس ٹیم کھاتے کی جانچ کر کے تصدیق نامہ ای میل کرے گی۔",
  "trackingRefLabel": "ٹریکنگ ریفرنس:",
  "alertFillRequired": "برائے مہربانی اپنا نام، ای میل اور رقم درج کریں۔",
  "alertMinDonation": "کم از کم عطیہ کی رقم ۱ ڈالر ہے۔",
  "alertNetworkError": "نیٹ ورک کی خرابی۔ براہ کرم دوبارہ کوشش کریں یا ہم سے رابطہ کریں۔",
  "alertSubmitFailed": "بینک رسید جمع کروانے میں ناکامی۔",
  "girlsEnrolled": "طالبات کا اندراج",
  "liveClassrooms": "لائیو آن لائن کلاس رومز",
  "freeScholarships": "۱۰۰ فیصد مفت",
  "trustBadge1Title": "۱۰۰ فیصد براہ راست اثر",
  "trustBadge1Desc": "تمام عطیات براہ راست افغان خواتین کے لیے لیپ ٹاپ، انٹرنیٹ اور تعلیمی اخراجات پر خرچ ہوتے ہیں۔",
  "trustBadge2Title": "مکمل پرائیویسی اور رازداری",
  "trustBadge2Desc": "طالبات کی شناخت اور ان کا مقام سخت ترین ملٹری گریڈ سیکیورٹی کے تحت محفوظ رکھا جاتا ہے۔",
  "trustBadge3Title": "شفاف اور آڈٹ شدہ انتظام",
  "trustBadge3Desc": "مالی حسابات کی باقاعدہ جانچ، سالانہ رپورٹس اور طالبات کی ترقی کی مسلسل آگاہی۔",
  "storiesBadge": "کابل، ہرات اور مزار شریف سے صدائیں",
  "storiesTitle": "محاصرے میں تعلیم، ناقابل تسخیر جذبہ",
  "storiesSub": "افغانستان میں خفیہ کلاس رومز میں زیر تعلیم باہمت طالبات کے اپنے تاثرات۔",
  "stories": [
    {
      "name": "فاطمہ ر.",
      "location": "کابل، افغانستان",
      "track": "فل اسٹیک سافٹ ویئر انجینئرنگ",
      "quote": "جب جامعات بند ہوئیں تو لگا کہ میرا مستقبل اندھیرے میں ڈوب گیا۔ صافی اکیڈمی نے مجھے نئی زندگی دی۔ آج میں کلاؤڈ ایپلی کیشنز بناتی ہوں اور محلے کی چھوٹی لڑکیوں کو کوڈنگ سکھاتی ہوں۔",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "زہرا م.",
      "location": "ہرات، افغانستان",
      "track": "پائتھون اور مشین لرننگ",
      "quote": "آپ کے عطیات سے ملنے والے لیپ ٹاپ اور انٹرنیٹ نے میری دنیا بدل کر رکھ دی۔ میں اب کوئی بھولی بسری گنتی نہیں ہوں؛ میں مصنوعی ذہانت کی محقق ہوں۔",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "مریم ک.",
      "location": "مزار شریف، افغانستان",
      "track": "یو آئی اور یو ایکس ڈیزائننگ",
      "quote": "وہ اسکولوں کی عمارتوں کو تالے لگا سکتے ہیں، لیکن ہمارے سیکھنے کے شوق کو قید نہیں کر سکتے۔ میرا لکھا ہر کوڈ اندھیروں کے خلاف ایک فتح ہے۔",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "مالی دیانت داری اور نگرانی",
  "transparencyTitle": "آپ کا ہر ڈالر کہاں خرچ ہوتا ہے؟",
  "transparencySub": "ہم شفافیت پر یقین رکھتے ہیں۔ یہ رہا عطیات کی تقسیم کا واضح نقشہ۔",
  "allocations": [
    {
      "percent": "۵۰٪",
      "title": "طالبات کے لیے لیپ ٹاپ اور انٹرنیٹ",
      "desc": "پروگرامنگ لیپ ٹاپس کی فراہمی، تیز رفتار اسٹار لنک اور وی پی این کنکشن، سولر پاور بینکس اور گھریلو سامان۔"
    },
    {
      "percent": "۳۰٪",
      "title": "کلاؤڈ اور تعلیمی انفراسٹرکچر",
      "desc": "غیر مرکزی سرورز، آف لائن لیکچر ویڈیوز کا نظام اور طالبات کے لیے آن لائن کوڈنگ پلیٹ فارم۔"
    },
    {
      "percent": "۱۵٪",
      "title": "عالمی اساتذہ اور ریموٹ جابز",
      "desc": "بین الاقوامی ماہرین کی نگرانی، پیشہ ورانہ انگریزی کی تربیت اور عالمی ریموٹ ملازمتوں کے مواقع۔"
    },
    {
      "percent": "۵٪",
      "title": "سیکیورٹی اور آپریشنل اخراجات",
      "desc": "سیکیورٹی کا سخت آڈٹ، محفوظ ترسیل اور طالبات کی شناخت کو مکمل طور پر خفیہ رکھنا۔"
    }
  ],
  "faqBadge": "اکثر پوچھے جانے والے سوالات",
  "faqTitle": "عطیات کے بارے میں ضروری معلومات",
  "faqSub": "عطیہ کی ترسیل، طالبات کی حفاظت اور مالی شفافیت سے متعلق سوالات کے جوابات۔",
  "faqs": [
    {
      "q": "آپ کیسے یقینی بناتے ہیں کہ عطیات طالبات تک محفوظ پہنچیں؟",
      "a": "ہم مقامی بااعتماد کوآرڈینیٹرز اور خفیہ نیٹ ورکس کے ذریعے بغیر کسی حکومتی عمل دخل کے ہارڈ ویئر اور انٹرنیٹ الاؤنس براہ راست طالبات کو فراہم کرتے ہیں۔"
    },
    {
      "q": "کیا میرا عطیہ محفوظ اور باضابطہ ہے؟",
      "a": "جی ہاں، تمام تر ادائیگیاں بین الاقوامی بینکنگ سیکیورٹی اور یورپ اور امریکہ کے باقاعدہ رجسٹرڈ بینک اکاؤنٹس میں کی جاتی ہیں۔"
    },
    {
      "q": "کیا میں کسی مخصوص طالبہ کی کفالت کر سکتا ہوں؟",
      "a": "جی ہاں! سطح ۳ یا اس سے اوپر، آپ نوٹ میں ذکر کر سکتے ہیں اور ہم طالبہ کی تعلیمی کارکردگی کی گمنام رپورٹ آپ کو فراہم کریں گے۔"
    },
    {
      "q": "ادائیگی کے کون سے طریقے دستیاب ہیں؟",
      "a": "تمام بین الاقوامی کارڈز، پے پال، اور امریکی ڈالر (ACH)، یورو (SEPA) اور برطانوی پاؤنڈ میں براہ راست بینک ٹرانسفر۔"
    },
    {
      "q": "طالبات کی شناخت کی حفاظت کیسے کی جاتی ہے؟",
      "a": "طالبات کی حفاظت ہماری اولین ترجیح ہے۔ وہ فرضی ناموں کے ساتھ انکرپٹڈ چینلز کے ذریعے بغیر کیمرہ آن کیے تعلیم حاصل کرتی ہیں۔"
    }
  ],
  "bottomCtaBadge": "تاریخ کے درست رخ پر کھڑے ہوں",
  "bottomCtaTitle": "اندھیری رات میں امید کی شمع جلائیں۔",
  "bottomCtaDesc": "دنیا بھر کے ان سینکڑوں ہمدردوں اور ماہرین میں شامل ہوں جو افغان خواتین کو بااختیار بنا رہے ہیں۔",
  "bottomCtaBtn": "ابھی عطیہ دیں • ایک طالبہ کا مستقبل سنواریں",
  "verifiedScholarship": "باضابطہ اور تصدیق شدہ بین الاقوامی تعلیمی امدادی منصوبہ",
  "bankAccounts": [
    {
      "title": "امریکی ڈالر (ACH / Routing) - شیرین گل احمدی",
      "subtitle": "امریکہ کے اندر براہ راست بینک ٹرانسفر / وائرکس",
      "note": "کم از کم جمع رقم ۱ ڈالر ہے۔"
    },
    {
      "title": "یورو SEPA (مالٹا) - شیرین گل احمدی",
      "subtitle": "یورپی سنگل یورو پیمنٹس ایریا (SEPA)",
      "note": "پورے یورپی یونین میں بغیر کسی فیس کے۔"
    },
    {
      "title": "برطانوی پاؤنڈ (UK Faster Payments) - شاہین صافی",
      "subtitle": "برطانیہ کے اندر فوری بینک ٹرانسفر / BACS",
      "note": "فاسٹر پیمنٹس کے ذریعے فوری ٹرانسفر۔"
    },
    {
      "title": "یورو SEPA (مالٹا) - شاہین صافی",
      "subtitle": "یورپی سنگل یورو پیمنٹس ایریا (SEPA)",
      "note": "۱ سے ۲ کاروباری دنوں میں معیاری ٹرانسفر۔"
    },
    {
      "title": "یورو SEPA (لکسمبرگ) - شاہین صافی",
      "subtitle": "براہ راست SEPA لکسمبرگ بینک ٹرانسفر",
      "note": "آئی بین کے ذریعے فوری ٹرانسفر۔"
    }
  ]
},
  "ru": {
  "isRtl": false,
  "home": "Главная",
  "heroBadge": "Экстренная образовательная помощь • Вопреки запретам",
  "heroTitle1": "Они заперли двери школ.",
  "heroTitle2": "Мы открываем Вселенную.",
  "heroDesc1": "Когда 1,4 миллиона девушек в Афганистане лишили права на образование, Safi Academy не осталась в стороне. Через защищенные децентрализованные каналы мы обучаем программированию и технологиям прямо на дому.",
  "heroDesc2": "Ваше пожертвование — это реальный акт солидарности. 100% средств направляются напрямую на закупку ноутбуков, защищенный интернет Starlink и оплату обучения афганских девушек.",
  "liveGoalLabel": "Цель образовательного фонда на 2026 год",
  "raisedOf": "Собрано из",
  "goal": "Общая цель",
  "fundedBadge": "Прозрачный реестр • 100% прямая передача студенткам",
  "boxTitle": "Прямая спонсорская помощь студенткам",
  "boxSubtitle": "Выберите уровень стипендии или укажите произвольную сумму.",
  "customAmount": "Своя сумма пожертвования ($ USD)",
  "dedicationLabel": "Посвящение или слова поддержки (Необязательно)",
  "dedicationPlaceholder": "В честь, в память или слова напутствия для студенток...",
  "tabCard": "Банковская карта",
  "tabCardSub": "Мгновенно • Защищено • По всему миру",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Прямая оплата в 1 клик",
  "tabBank": "Прямой банковский перевод",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 месяц скоростного интернета и защищенного VPN",
      "tier": "Уровень 1: Связь",
      "impact": "Обеспечивает 1 месяц безопасного высокоскоростного подключения для студентки в Афганистане.",
      "badge": "Жизненно важно"
    },
    {
      "amount": 75,
      "label": "Облачный сервер и среда разработки",
      "tier": "Уровень 2: Инфраструктура",
      "impact": "Оплачивает облачные серверы для кодинга, передовые учебные материалы и офлайн-уроки.",
      "badge": "Популярный выбор"
    },
    {
      "amount": 150,
      "label": "Полная стипендия для одной студентки",
      "tier": "Уровень 3: Стипендия",
      "impact": "Прямое финансирование полного семестра обучения разработке ПО для девушки в Афганистане.",
      "badge": "Высокий вклад"
    },
    {
      "amount": 500,
      "label": "Ноутбук для программирования для студентки",
      "tier": "Уровень 4: Оборудование",
      "impact": "Покупка и безопасная доставка надежного ноутбука для кодинга и повербанка студентке в Афганистане.",
      "badge": "Судьбоносный шаг"
    },
    {
      "amount": 1200,
      "label": "Спонсорство годового курса обучения",
      "tier": "Уровень 5: Годовой трек",
      "impact": "Оплачивает полный год инженерного обучения, персональное международное менторство и помощь в трудоустройстве.",
      "badge": "Полный годовой грант"
    }
  ],
  "donateNowBtn": "Перейти к безопасной оплате",
  "processingBtn": "Подключение к защищенному шлюзу...",
  "cancelBtn": "Отмена",
  "encryptedNotice": "256-битное банковское шифрование TLS • Данные карт не сохраняются",
  "paypalTitle": "Завершить оплату через PayPal",
  "paypalDesc": "Вы будете перенаправлены на защищенный портал PayPal для подтверждения перевода.",
  "paypalError": "Не удалось загрузить PayPal. Попробуйте оплату картой или банковский перевод.",
  "bankSelectLabel": "Выберите официальный счет Академии:",
  "bankVerifiedBadge": "Проверенные международные банковские партнеры",
  "copyAllBtn": "Скопировать все реквизиты",
  "allCopiedText": "Все банковские реквизиты скопированы!",
  "copiedText": "Скопировано!",
  "beneficiaryLabel": "Получатель (Владелец счета)",
  "ibanLabel": "IBAN",
  "bicLabel": "Код BIC / SWIFT",
  "routingLabel": "Номер маршрутизации (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Номер счета",
  "bankNameLabel": "Банк получателя",
  "bankAddressLabel": "Юридический адрес банка",
  "noticeLabel": "Требование для подтверждения депозита",
  "receiptHeader": "Отправить квитанцию о банковском переводе",
  "receiptSub": "Загрузите квитанцию перевода, чтобы финансовый отдел подтвердил зачисление и выслал вам официальное подтверждение.",
  "donorNameLabel": "ФИО благотворителя",
  "donorNamePlaceholder": "например: Елена Смирнова",
  "donorEmailLabel": "Ваш адрес электронной почты",
  "donorEmailPlaceholder": "например: elena@example.ru",
  "transferAmountLabel": "Сумма и валюта перевода",
  "txIdLabel": "Номер транзакции / UTR",
  "txIdPlaceholder": "например: TXN-984210 или номер платежа",
  "notesLabel": "Слова поддержки или пожелания",
  "submitReceiptBtn": "Отправить квитанцию",
  "submittingReceiptBtn": "Проверка и регистрация платежа...",
  "successReceiptTitle": "Квитанция успешно зарегистрирована!",
  "successReceiptDesc": "Огромное спасибо за вашу поддержку. Финансовый отдел проверит поступление и вышлет официальное подтверждение.",
  "trackingRefLabel": "Номер отслеживания:",
  "alertFillRequired": "Пожалуйста, укажите имя, email и сумму перевода.",
  "alertMinDonation": "Минимальная сумма пожертвования составляет 1 $ USD.",
  "alertNetworkError": "Сетевая ошибка. Попробуйте еще раз или свяжитесь с нами.",
  "alertSubmitFailed": "Не удалось отправить квитанцию.",
  "girlsEnrolled": "Студенток на обучении",
  "liveClassrooms": "Живые онлайн-классы",
  "freeScholarships": "100% Бесплатно",
  "trustBadge1Title": "100% Прямое воздействие",
  "trustBadge1Desc": "Все средства направляются на ноутбуки, интернет и образование для женщин Афганистана.",
  "trustBadge2Title": "Полная конфиденциальность",
  "trustBadge2Desc": "Личности и адреса студенток защищены надежным военным шифрованием.",
  "trustBadge3Title": "Прозрачность и подотчетность",
  "trustBadge3Desc": "Регулярно обновляемый финансовый реестр и открытые отчеты об успехах учениц.",
  "storiesBadge": "Голоса из Кабула, Герата и Мазари-Шарифа",
  "storiesTitle": "Образование в блокаде, несгибаемая воля",
  "storiesSub": "Реальные слова наших студенток, обучающихся в тайных виртуальных классах.",
  "stories": [
    {
      "name": "Фатима Р.",
      "location": "Кабул, Афганистан",
      "track": "Full-Stack разработка ПО",
      "quote": "Когда закрыли университеты, мне казалось, что жизнь оборвалась. Safi Academy вернула мне веру в будущее. Сегодня я создаю облачные сервисы и учу программированию девочек в своем районе.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Захра М.",
      "location": "Герат, Афганистан",
      "track": "Python и Машинное обучение",
      "quote": "Ноутбук и интернет Starlink, полученные благодаря вашим пожертвованиям, изменили мою жизнь. Теперь я не просто статистика; я будущий исследователь искусственного интеллекта.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Марьям К.",
      "location": "Мазари-Шариф, Афганистан",
      "track": "UI/UX и Продуктовый дизайн",
      "quote": "Они могут запереть школы на замки, но им никогда не запереть нашу жажду знаний. Каждая строчка кода, которую я пишу — это победа над тьмой.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Финансовая честность и контроль",
  "transparencyTitle": "Куда направляется каждый пожертвованный доллар",
  "transparencySub": "Мы придерживаемся абсолютной прозрачности. Вот как распределяются средства.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Ноутбуки и интернет для учениц",
      "desc": "Закупка ноутбуков, подключение Starlink и защищенный VPN, солнечные батареи и учебные материалы."
    },
    {
      "percent": "30%",
      "title": "Облачные платформы и серверы обучения",
      "desc": "Децентрализованные серверы, офлайн-доступ к урокам и виртуальные среды для написания кода."
    },
    {
      "percent": "15%",
      "title": "Международные менторы и карьерная помощь",
      "desc": "Оплата труда зарубежных технических наставников, профессиональный английский язык и удаленная работа."
    },
    {
      "percent": "5%",
      "title": "Безопасность и оценка рисков",
      "desc": "Аудит безопасности, защищенная логистика и строгое сохранение анонимности студенток."
    }
  ],
  "faqBadge": "Частые вопросы",
  "faqTitle": "Все, что нужно знать о фонде помощи",
  "faqSub": "Ответы о защите средств, безопасности учениц и прозрачности.",
  "faqs": [
    {
      "q": "Как вы гарантируете безопасную передачу помощи девушкам в Афганистане?",
      "a": "Мы работаем через проверенную сеть местных координаторов, передавая технику и интернет напрямую без участия государственных структур."
    },
    {
      "q": "Безопасен ли мой платеж?",
      "a": "Да, все переводы осуществляются по международным банковским протоколам на официальные институциональные счета в Европе и США."
    },
    {
      "q": "Могу ли я взять шефство над конкретной студенткой?",
      "a": "Да, при выборе 3-го уровня и выше вы можете указать пожелание, и мы закрепим стипендию за студенткой, предоставляя анонимные отчеты об учебе."
    },
    {
      "q": "Какие способы оплаты доступны?",
      "a": "Банковские карты, PayPal и прямые банковские переводы в долларах (ACH), евро (SEPA) и фунтах стерлингов (BACS)."
    },
    {
      "q": "Как защищены студентки от преследований?",
      "a": "Безопасность девушек — наш высший приоритет. Обучение ведется под псевдонимами через зашифрованные соединения без требования включать камеру."
    }
  ],
  "bottomCtaBadge": "Встаньте на правильную сторону истории",
  "bottomCtaTitle": "Зажгите луч надежды в самые темные времена.",
  "bottomCtaDesc": "Присоединяйтесь к сотням благотворителей со всего мира, дарящих будущее женщинам Афганистана.",
  "bottomCtaBtn": "Пожертвовать сейчас • Поддержать студентку",
  "verifiedScholarship": "Проверенная международная образовательная гуманитарная инициатива",
  "bankAccounts": [
    {
      "title": "Доллар США (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Прямой банковский перевод внутри США / Wirex",
      "note": "Минимальный депозит составляет 1 $."
    },
    {
      "title": "Евро SEPA (Мальта) - Shirin Gol Ahmadi",
      "subtitle": "Единая зона платежей в евро (SEPA)",
      "note": "Без комиссии за перевод на всей территории ЕС/ЕЭЗ."
    },
    {
      "title": "Британский фунт (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Внутренний банковский перевод по Великобритании / BACS",
      "note": "Мгновенное зачисление через систему Faster Payments."
    },
    {
      "title": "Евро SEPA (Мальта) - Shaheen Safi",
      "subtitle": "Единая зона платежей в евро (SEPA)",
      "note": "Стандартный банковский перевод в течение 1-2 рабочих дней."
    },
    {
      "title": "Евро SEPA (Люксембург) - Shaheen Safi",
      "subtitle": "Прямой перевод SEPA Люксембург",
      "note": "Прямой перевод по международному номеру IBAN."
    }
  ]
},
  "tr": {
  "isRtl": false,
  "home": "Ana Sayfa",
  "heroBadge": "Acil Eğitim Yardımı • Yasağa Karşı Direniş",
  "heroTitle1": "Okul kapılarını kilitlediler.",
  "heroTitle2": "Biz evreni açıyoruz.",
  "heroDesc1": "Afganistan'da 1,4 milyon kız çocuğu ve genç kadın en temel hakları olan eğitimden mahrum bırakıldığında Safi Academy sessiz kalmadı. Güvenli merkeziyetsiz ağlar ve şifreli kanallar aracılığıyla, ileri düzey yazılım eğitimini doğrudan evlerine taşıyoruz.",
  "heroDesc2": "Bağışınız bir sadaka değil; direnişin, dayanışmanın ve kadınların güçlenmesinin simgesidir. Yapacağınız her kuruş doğrudan Starlink internetine, güvenli dizüstü bilgisayarlara ve uluslararası mentörlüğe dönüşür. Eğitim fonlarının %100'ü doğrudan öğrencilere aktarılır.",
  "liveGoalLabel": "2026 Eğitim Destek Fonu Hedefi",
  "raisedOf": "Toplanan / Hedef",
  "goal": "Genel Hedef",
  "fundedBadge": "Şeffaf Hesap Defteri • %100 Doğrudan Öğrenci Tahsisi",
  "boxTitle": "Doğrudan Öğrenci Burs Sponsorluğu",
  "boxSubtitle": "Bir burs seviyesi seçin veya bağışlamak istediğiniz özel tutarı girin.",
  "customAmount": "Özel Bağış Tutarı ($ USD)",
  "dedicationLabel": "İthaf veya Destek Mesajı (İsteğe bağlı)",
  "dedicationPlaceholder": "Öğrencilere moral vermek için bir not veya ithaf yazın...",
  "tabCard": "Banka / Kredi Kartı",
  "tabCardSub": "Anında • Şifreli • Küresel",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Doğrudan • Tek Tıkla Ödeme",
  "tabBank": "Doğrudan Banka Havalesi",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 Aylık Yüksek Hızlı İnternet ve Güvenli VPN",
      "tier": "Seviye 1: Bağlantı",
      "impact": "Afganistan'daki bir kız öğrencinin eğitime erişmesi için 1 aylık yüksek hızlı internet ve VPN sağlar.",
      "badge": "Temel Destek"
    },
    {
      "amount": 75,
      "label": "Bulut Sunucu ve Geliştirme Ortamı",
      "tier": "Seviye 2: Altyapı",
      "impact": "Kodlama için bulut sunucuları, ileri düzey müfredat ve çevrimdışı ders indirmelerini finanse eder.",
      "badge": "En Çok Tercih Edilen"
    },
    {
      "amount": 150,
      "label": "Doğrudan Öğrenci Eğitim Bursu",
      "tier": "Seviye 3: Tam Burs",
      "impact": "Eğitimden mahrum bırakılan bir kız öğrencinin bir dönemlik yazılım mühendisliği eğitimini finanse eder.",
      "badge": "Büyük Etki"
    },
    {
      "amount": 500,
      "label": "Öğrenciye Özel Dizüstü Bilgisayar",
      "tier": "Seviye 4: Donanım Desteği",
      "impact": "Bir kız öğrenciye güvenli şekilde teslim edilecek kodlama dizüstü bilgisayarı ve taşınabilir batarya sağlar.",
      "badge": "Dönüştürücü Güç"
    },
    {
      "amount": 1200,
      "label": "Bir Yıllık Tam Kariyer Yolu Sponsorluğu",
      "tier": "Seviye 5: Yıllık Tam Destek",
      "impact": "Tam bir yıllık yazılım mühendisliği, bire bir uluslararası mentorluk ve uzaktan iş bulma desteğini kapsar.",
      "badge": "Yıllık Tam Burs"
    }
  ],
  "donateNowBtn": "Güvenli Ödemeye Devam Et",
  "processingBtn": "Güvenli ödeme geçidine bağlanıyor...",
  "cancelBtn": "İptal",
  "encryptedNotice": "256-Bit TLS Banka Düzeyinde Güvenlik • Kart bilgileri asla saklanmaz",
  "paypalTitle": "PayPal ile Tamamla",
  "paypalDesc": "Bağışınızı onaylamak için güvenli PayPal sayfasına yönlendirileceksiniz.",
  "paypalError": "PayPal başlatılamadı. Lütfen Kart veya Banka Havalesi yöntemini deneyin.",
  "bankSelectLabel": "Akademi Resmi Banka Hesabını Seçin:",
  "bankVerifiedBadge": "Doğrulanmış Uluslararası Bankacılık Ortakları",
  "copyAllBtn": "Tüm Banka Bilgilerini Kopyala",
  "allCopiedText": "Tüm banka bilgileri panoya kopyalandı!",
  "copiedText": "Kopyalandı!",
  "beneficiaryLabel": "Alıcı (Hesap Sahibi)",
  "ibanLabel": "IBAN Numarası",
  "bicLabel": "BIC / SWIFT Kodu",
  "routingLabel": "Routing Numarası (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Hesap Numarası",
  "bankNameLabel": "Banka Adı",
  "bankAddressLabel": "Bankanın Kayıtlı Adresi",
  "noticeLabel": "Havale Onay Koşulu",
  "receiptHeader": "Banka Havale Dekontunu Bildir",
  "receiptSub": "Finans ekibimizin ödemeyi onaylayıp resmi bağış belgenizi iletebilmesi için dekontunuzu yükleyin.",
  "donorNameLabel": "Bağışçının Adı Soyadı",
  "donorNamePlaceholder": "örn. Elif Yılmaz",
  "donorEmailLabel": "E-posta Adresiniz",
  "donorEmailPlaceholder": "örn. elif@example.com",
  "transferAmountLabel": "Gönderilen Tutar ve Para Birimi",
  "txIdLabel": "İşlem Referans Numarası (UTR)",
  "txIdPlaceholder": "örn. TXN-984210 veya dekont referansı",
  "notesLabel": "Destek Mesajı veya İthaf",
  "submitReceiptBtn": "Havale Dekontunu Gönder",
  "submittingReceiptBtn": "Dekont Doğrulanıyor ve Kaydediliyor...",
  "successReceiptTitle": "Havale Dekontu Başarıyla Kaydedildi!",
  "successReceiptDesc": "Cömertliğiniz için teşekkür ederiz. Finans ekibimiz havaleyi inceleyecek ve resmi onay belgenizi e-posta ile iletecektir.",
  "trackingRefLabel": "Takip Numarası:",
  "alertFillRequired": "Lütfen adınızı, e-posta adresinizi ve havale tutarını girin.",
  "alertMinDonation": "Minimum bağış tutarı 1 $ USD'dir.",
  "alertNetworkError": "Bağlantı hatası oluştu. Lütfen tekrar deneyin.",
  "alertSubmitFailed": "Havale dekontu gönderilemedi.",
  "girlsEnrolled": "Kayıtlı Kız Öğrenci",
  "liveClassrooms": "Canlı Sınıflar",
  "freeScholarships": "%100 Ücretsiz",
  "trustBadge1Title": "%100 Doğrudan Etki",
  "trustBadge1Desc": "Tüm bağışlar doğrudan Afgan kız öğrencilerin bilgisayarlarına, internetlerine ve eğitimlerine harcanır.",
  "trustBadge2Title": "Mutlak Gizlilik ve Güvenlik",
  "trustBadge2Desc": "Öğrencilerin kimlikleri ve konumları askeri düzeyde şifrelemeyle korunur.",
  "trustBadge3Title": "Şeffaf ve Denetimli",
  "trustBadge3Desc": "Sürekli güncellenen mali kayıtlar ve öğrencilerin akademik başarı raporları şeffafça paylaşılır.",
  "storiesBadge": "Kabil, Herat ve Mezar-ı Şerif'ten Sesler",
  "storiesTitle": "Kuşatma Altında Eğitim, Kırılmayan İrade",
  "storiesSub": "Gizli sanal sınıflarda yazılım öğrenen cesur kız öğrencilerimizin gerçek hikayeleri.",
  "stories": [
    {
      "name": "Fatıma R.",
      "location": "Kabil, Afganistan",
      "track": "Full-Stack Yazılım Mühendisliği",
      "quote": "Üniversiteler kapatıldığında geleceğimin tamamen yok olduğunu sandım. Safi Academy umudumu geri verdi. Bugün bulut yazılımları geliştiriyorum ve mahallemdeki küçük kızlara kodlama öğretiyorum.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zehra M.",
      "location": "Herat, Afganistan",
      "track": "Python & Yapay Zeka",
      "quote": "Bağışlarınız sayesinde aldığım dizüstü bilgisayar ve Starlink internet paketi hayatımı değiştirdi. Artık unutulmuş bir istatistik değilim; yapay zeka araştırmacısıyım.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Meryem K.",
      "location": "Mezar-ı Şerif, Afganistan",
      "track": "UI/UX & Dijital Ürün Tasarımı",
      "quote": "Okul binalarını kilitleyebilirler ama öğrenme tutkumuzu asla hapsedemezler. Yazdığım her satır kod, karanlığa karşı kazanılmış bir zaferdir.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Mali Dürüstlük ve Yönetişim",
  "transparencyTitle": "Bağışlanan Her Dolar Nereye Harcanıyor?",
  "transparencySub": "Radikal şeffaflık ilkesiyle hareket ediyoruz. Fonların kullanım dağılımı aşağıdadır.",
  "allocations": [
    {
      "percent": "%50",
      "title": "Öğrencilere Donanım ve İnternet Desteği",
      "desc": "Kodlama bilgisayarları, Starlink ve VPN paketleri, güneş enerjili şarj cihazları ve ev çalışma gereçleri."
    },
    {
      "percent": "%30",
      "title": "Bulut Altyapısı ve Ders Platformu",
      "desc": "Merkeziyetsiz sunucular, çevrimdışı video ders senkronizasyonu ve kod çalıştırma ortamları."
    },
    {
      "percent": "%15",
      "title": "Uluslararası Mentorluk ve Uzaktan İstihdam",
      "desc": "Uluslararası mentör ödemeleri, teknik İngilizce dersleri ve küresel uzaktan iş olanaklarına yönlendirme."
    },
    {
      "percent": "%5",
      "title": "Güvenlik Operasyonları ve Risk Yönetimi",
      "desc": "Güvenlik denetimleri, güvenli donanım teslimatı ve öğrenci kimliklerinin mutlak gizliliği."
    }
  ],
  "faqBadge": "Sıkça Sorulan Sorular",
  "faqTitle": "Eğitim Fonumuz Hakkında Merak Edilenler",
  "faqSub": "Bağışların güvenliği, öğrenci gizliliği ve hesap verebilirlik hakkında tüm detaylar.",
  "faqs": [
    {
      "q": "Bağışların Afganistan'daki kız öğrencilere güvenle ulaştığından nasıl emin oluyorsunuz?",
      "a": "Güvenilir yerel koordinatörlerden oluşan merkeziyetsiz bir ağ üzerinden, hükümet kanallarına bulaşmadan doğrudan cihaz ve internet paketlerini ulaştırıyoruz."
    },
    {
      "q": "Bağışım güvenli ve resmi midir?",
      "a": "Evet, tüm ödemeler uluslararası bankacılık standartlarında işlenir ve Avrupa ile ABD'deki resmi kurumsal hesaplarımıza aktarılır."
    },
    {
      "q": "Belirli bir öğrenciye sponsor olabilir miyim?",
      "a": "Evet, Seviye 3 ve üzeri desteklerde özel bir not iletebilirsiniz. Bağışınızı bir öğrenciyle eşleştirir ve anonim gelişim raporunu sizinle paylaşırız."
    },
    {
      "q": "Hangi ödeme yöntemleri kabul ediliyor?",
      "a": "Tüm uluslararası kredi kartları, PayPal ve doğrudan banka havalesi (USD ACH, EUR SEPA ve GBP BACS)."
    },
    {
      "q": "Öğrencilerin kimlikleri olası tehlikelere karşı nasıl korunuyor?",
      "a": "Öğrenci güvenliği bir numaralı önceliğimizdir. Dersler takma adlarla, uçtan uca şifreli platformlarda ve kamera açma zorunluluğu olmadan yapılır."
    }
  ],
  "bottomCtaBadge": "Tarihin Doğru Tarafında Yer Alın",
  "bottomCtaTitle": "En karanlık anlarda bir umut ışığı yakın.",
  "bottomCtaDesc": "Dünyanın dört bir yanından yüzlerce hayırsever ve uzmana katılın, Afgan kadınlarına aydınlık bir gelecek sunun.",
  "bottomCtaBtn": "Şimdi Bağış Yap • Bir Öğrenciyi Destekle",
  "verifiedScholarship": "Doğrulanmış Kar Amacı Gütmeyen Uluslararası Akademik Yardım Girişimi",
  "bankAccounts": [
    {
      "title": "Amerikan Doları (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "ABD İçi Doğrudan Banka Havalesi / Wirex",
      "note": "Minimum havale tutarı 1 $'dır."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Avrupa Tek Euro Ödemeler Alanı (SEPA)",
      "note": "AB/AEA genelinde sıfır havale ücreti."
    },
    {
      "title": "İngiliz Sterlini (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Birleşik Krallık İçi Doğrudan Havale / BACS",
      "note": "Faster Payments ile anında hesaba geçiş."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Avrupa Tek Euro Ödemeler Alanı (SEPA)",
      "note": "Standart banka havalesi 1-2 iş gününde tamamlanır."
    },
    {
      "title": "Euro SEPA (Lüksemburg) - Shaheen Safi",
      "subtitle": "SEPA Sınır Ötesi Banka Havalesi Lüksemburg",
      "note": "Uluslararası IBAN ile doğrudan transfer."
    }
  ]
},
  "de": {
  "isRtl": false,
  "home": "Startseite",
  "heroBadge": "Notfall-Bildungshilfe • Gegen das Verbot",
  "heroTitle1": "Sie schlossen die Schultore.",
  "heroTitle2": "Wir öffnen das Universum.",
  "heroDesc1": "Als 1,4 Millionen Mädchen und junge Frauen in Afghanistan ihres Rechts auf Bildung beraubt wurden, weigerte sich die Safi Academy zuzusehen. Über dezentrale, verschlüsselte Netzwerke bringen wir akkreditierte IT- und Programmierausbildung direkt in die Wohnzimmer mutiger afghanischer Frauen.",
  "heroDesc2": "Ihre Spende ist keine Wohltätigkeit – sie ist Widerstand, Solidarität und gelebte Selbstbestimmung. Jeder Cent fließt direkt in Starlink-Konnektivität, sichere Laptops und globale Mentoren für mutige afghanische Studentinnen. 100 % der Bildungsgelder kommen direkt bei den Schülerinnen an.",
  "liveGoalLabel": "Bildungshilfe-Ziel 2026",
  "raisedOf": "Gesammelt von",
  "goal": "Gesamtziel",
  "fundedBadge": "Transparentes Hauptbuch • 100 % direkte Zuweisung",
  "boxTitle": "Direkte Stipendienförderung",
  "boxSubtitle": "Wählen Sie eine Förderstufe oder geben Sie einen individuellen Betrag ein.",
  "customAmount": "Individueller Spendenbetrag ($ USD)",
  "dedicationLabel": "Widmung / Persönliche Nachricht (Optional)",
  "dedicationPlaceholder": "Zu Ehren von, in Gedenken an oder ermutigende Worte für die Studentinnen...",
  "tabCard": "Kredit- / Debitkarte",
  "tabCardSub": "Sofort • Verschlüsselt • Weltweit",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Direkt • 1-Klick-Zahlung",
  "tabBank": "Direkte Banküberweisung",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 Monat Highspeed-Internet & sicheres VPN",
      "tier": "Stufe 1: Konnektivität",
      "impact": "Sichert 1 Monat verschlüsseltes Highspeed-Internet für eine Schülerin in Afghanistan.",
      "badge": "Unerlässlich"
    },
    {
      "amount": 75,
      "label": "Cloud-Server & Entwicklungsumgebung",
      "tier": "Stufe 2: Infrastruktur",
      "impact": "Finanziert Cloud-Entwicklungsserver, moderne Lehrmaterialien und Offline-Lektionen.",
      "badge": "Sehr beliebt"
    },
    {
      "amount": 150,
      "label": "Vollstipendium für eine Studentin",
      "tier": "Stufe 3: Vollstipendium",
      "impact": "Finanziert ein komplettes Semester Software-Engineering für eine Schülerin in Afghanistan.",
      "badge": "Hohe Wirkung"
    },
    {
      "amount": 500,
      "label": "Ausstattung einer Schülerin mit Laptop",
      "tier": "Stufe 4: Hardware",
      "impact": "Finanziert und liefert einen Programmier-Laptop samt Powerbank sicher an eine afghanische Schülerin.",
      "badge": "Transformativ"
    },
    {
      "amount": 1200,
      "label": "Patenschaft für ein ganzes Ausbildungsjahr",
      "tier": "Stufe 5: Jahrespaket",
      "impact": "Umfasst ein ganzes Jahr Ingenieursausbildung, internationales 1-zu-1-Mentoring und Vermittlung in Remote-Jobs.",
      "badge": "Jahresstipendium"
    }
  ],
  "donateNowBtn": "Weiter zur sicheren Zahlung",
  "processingBtn": "Verbindung zum sicheren Zahlungsportal wird hergestellt...",
  "cancelBtn": "Abbrechen",
  "encryptedNotice": "256-Bit-TLS-Verschlüsselung nach Bankstandard • Keine Speicherung von Kartendaten",
  "paypalTitle": "Zahlung mit PayPal abschließen",
  "paypalDesc": "Sie werden zum sicheren PayPal-Portal weitergeleitet, um die Spende zu bestätigen.",
  "paypalError": "PayPal-Gateway konnte nicht geladen werden. Bitte nutzen Sie Kartenzahlung oder Banküberweisung.",
  "bankSelectLabel": "Offizielles Bankkonto der Akademie auswählen:",
  "bankVerifiedBadge": "Verifizierte europäische & internationale Partnerbanken",
  "copyAllBtn": "Alle Bankdaten kopieren",
  "allCopiedText": "Alle Bankverbindungsdaten in die Zwischenablage kopiert!",
  "copiedText": "Kopiert!",
  "beneficiaryLabel": "Empfänger / Kontoinhaber",
  "ibanLabel": "IBAN",
  "bicLabel": "BIC / SWIFT-Code",
  "routingLabel": "Routing-Nummer (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Kontonummer",
  "bankNameLabel": "Kreditinstitut",
  "bankAddressLabel": "Bankadresse",
  "noticeLabel": "Bedingung für Einzahlungsbestätigung",
  "receiptHeader": "Überweisungsbeleg einreichen",
  "receiptSub": "Reichen Sie Ihren Überweisungsnachweis ein, damit unser Finanzteam die Spende verbucht und Ihre offizielle Bestätigung ausstellt.",
  "donorNameLabel": "Vollständiger Name des Spenders",
  "donorNamePlaceholder": "z. B. Julia Schneider",
  "donorEmailLabel": "Ihre E-Mail-Adresse",
  "donorEmailPlaceholder": "z. B. julia@example.de",
  "transferAmountLabel": "Überwiesener Betrag und Währung",
  "txIdLabel": "Transaktionsreferenz / UTR-Nummer",
  "txIdPlaceholder": "z. B. TXN-984210 oder Überweisungsreferenz",
  "notesLabel": "Persönliche Widmung oder Nachricht",
  "submitReceiptBtn": "Überweisungsbeleg absenden",
  "submittingReceiptBtn": "Beleg wird geprüft und verbucht...",
  "successReceiptTitle": "Überweisungsbeleg erfolgreich eingereicht!",
  "successReceiptDesc": "Vielen Dank für Ihre großzügige Unterstützung. Unser Finanzteam wird den Eingang verbuchen und Ihnen die Bestätigung zusenden.",
  "trackingRefLabel": "Referenznummer:",
  "alertFillRequired": "Bitte füllen Sie Name, E-Mail und Überweisungsbetrag aus.",
  "alertMinDonation": "Der Mindestspendenbetrag beträgt 1 $ USD.",
  "alertNetworkError": "Netzwerkfehler. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
  "alertSubmitFailed": "Übermittlung des Überweisungsbelegs fehlgeschlagen.",
  "girlsEnrolled": "Eingeschriebene Schülerinnen",
  "liveClassrooms": "Live-Klassenräume",
  "freeScholarships": "100 % Kostenfrei",
  "trustBadge1Title": "100 % Direkte Wirkung",
  "trustBadge1Desc": "Alle Spendengelder fließen vollständig in Laptops, Internetzugang und Stipendien für afghanische Frauen.",
  "trustBadge2Title": "Vollkommener Datenschutz",
  "trustBadge2Desc": "Identitäten und Standorte der Schülerinnen werden mit militärischer Verschlüsselung geschützt.",
  "trustBadge3Title": "Transparenz & Rechnungslegung",
  "trustBadge3Desc": "Fortlaufend aktualisierte Rechnungslegung, geprüfte Berichte und Nachweise über den Bildungsfortschritt.",
  "storiesBadge": "Stimmen aus Kabul, Herat und Masar-e Scharif",
  "storiesTitle": "Bildung unter Belagerung, unbezwingbarer Wille",
  "storiesSub": "Wahre Berichte unserer Studentinnen, die in geheimen digitalen Klassenräumen lernen.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afghanistan",
      "track": "Full-Stack Software-Engineering",
      "quote": "Als die Universitäten geschlossen wurden, dachte ich, meine Zukunft sei für immer verloren. Die Safi Academy hat mir die Hoffnung zurückgegeben. Heute entwickle ich Cloud-Software und unterrichte jüngere Mädchen.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afghanistan",
      "track": "Python & Maschinelles Lernen",
      "quote": "Der Laptop und das Starlink-Paket, die ich durch Ihre Spenden erhalten habe, haben mein Leben verändert. Ich bin keine vergessene Statistik mehr; ich bin eine Forscherin für künstliche Intelligenz.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Masar-e Scharif, Afghanistan",
      "track": "UI/UX & Produktdesign",
      "quote": "Sie können Schulgebäude absperren, aber sie können unseren Wissensdurst niemals einsperren. Jede Codezeile, die ich schreibe, ist ein Sieg über die Dunkelheit.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Finanzielle Integrität & Mittelverwendung",
  "transparencyTitle": "Wohin jeder gespendete Euro fließt",
  "transparencySub": "Wir stehen für lückenlose Transparenz. Hier sehen Sie die genaue Aufteilung Ihrer Spende.",
  "allocations": [
    {
      "percent": "50 %",
      "title": "Hardware & Internet für Schülerinnen",
      "desc": "Laptops, Starlink- und VPN-Zugänge, Solarladegeräte und sichere Lernausrüstung für zu Hause."
    },
    {
      "percent": "30 %",
      "title": "Bildungs-Cloud & Lernplattform",
      "desc": "Dezentrale Server, Offline-Synchronisation von Videolektionen und interaktive Code-Ausführungsumgebungen."
    },
    {
      "percent": "15 %",
      "title": "Internationale Mentoren & Berufsvermittlung",
      "desc": "Vergütung für internationale Fachmentoren, technisches Englisch und Vorbereitung auf Remote-Arbeitsplätze."
    },
    {
      "percent": "5 %",
      "title": "Sicherheitsprüfung & Risikomanagement",
      "desc": "Compliance-Prüfungen, sichere Hardware-Lieferketten und vollständiger Schutz der Schülerinnen-Identitäten."
    }
  ],
  "faqBadge": "Häufige Fragen",
  "faqTitle": "Wissenswertes über unsere Bildungshilfe",
  "faqSub": "Antworten zu Mittelweiterleitung, Sicherheitsmaßnahmen und Spendennachweisen.",
  "faqs": [
    {
      "q": "Wie wird sichergestellt, dass die Spenden die Schülerinnen in Afghanistan erreichen?",
      "a": "Wir nutzen ein dezentrales Netzwerk geprüfter lokaler Koordinatoren, die Laptops und Internet-Guthaben direkt und ohne Beteiligung staatlicher Stellen übergeben."
    },
    {
      "q": "Sind meine Spendenzahlungen sicher und belegt?",
      "a": "Ja, alle Online-Zahlungen laufen über nach Bankenstandard zertifizierte Zahlungsanbieter und offizielle institutionelle Bankkonten in Europa und den USA."
    },
    {
      "q": "Kann ich die Patenschaft für eine bestimmte Schülerin übernehmen?",
      "a": "Ja, ab Stufe 3 können Sie eine Widmung hinterlassen. Wir ordnen Ihre Spende einer Studentin zu und stellen Ihnen anonymisierte Lernfortschritte bereit."
    },
    {
      "q": "Welche Zahlungsmethoden werden akzeptiert?",
      "a": "Wir akzeptieren alle gängigen Kreditkarten, PayPal sowie direkte SEPA-, ACH- und BACS-Banküberweisungen."
    },
    {
      "q": "Wie wird die Identität der Schülerinnen vor Gefahren geschützt?",
      "a": "Die Sicherheit der Frauen steht an erster Stelle. Der Unterricht erfolgt unter Pseudonymen in verschlüsselten Räumen ohne Kameraverpflichtung."
    }
  ],
  "bottomCtaBadge": "Stehen Sie auf der richtigen Seite der Geschichte",
  "bottomCtaTitle": "Entzünden Sie ein Licht der Hoffnung in dunklen Zeiten.",
  "bottomCtaDesc": "Schließen Sie sich Hunderten von Förderern weltweit an, um den mutigen Frauen Afghanistans eine Zukunft zu schenken.",
  "bottomCtaBtn": "Jetzt spenden • Eine Studentin fördern",
  "verifiedScholarship": "Verifizierte gemeinnützige internationale Bildungsinitiative",
  "bankAccounts": [
    {
      "title": "US-Dollar (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Direkte Inlandsüberweisung USA / Wirex",
      "note": "Mindesteinzahlung beträgt 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Europäischer Zahlungsraum (SEPA)",
      "note": "Gebührenfreie Überweisung innerhalb der EU/EWR."
    },
    {
      "title": "Britisches Pfund (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Inlandsüberweisung Großbritannien / BACS",
      "note": "Sofortige Wertstellung über Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Europäischer Zahlungsraum (SEPA)",
      "note": "Standard-Banküberweisung innerhalb von 1–2 Werktagen."
    },
    {
      "title": "Euro SEPA (Luxemburg) - Shaheen Safi",
      "subtitle": "SEPA-Grenzüberschreitende Überweisung Luxemburg",
      "note": "Direkte IBAN-Überweisung mit sofortiger Verbuchung."
    }
  ]
},
  "fr": {
  "isRtl": false,
  "home": "Accueil",
  "heroBadge": "Aide Éducative d'Urgence • Braver l'Interdit",
  "heroTitle1": "Ils ont verrouillé les écoles.",
  "heroTitle2": "Nous ouvrons l'univers.",
  "heroDesc1": "Lorsque 1,4 million de jeunes filles et femmes en Afghanistan ont été privées de leur droit fondamental à l'éducation, Safi Academy a refusé de rester spectatrice. Grâce à des réseaux décentralisés et des canaux hautement chiffrés, nous apportons l'enseignement du code et des technologies directement chez elles.",
  "heroDesc2": "Votre contribution n'est pas de la charité : c'est un acte de résistance, de solidarité et d'émancipation. Chaque centime finance directement la connectivité Starlink, des ordinateurs portables sécurisés et des mentors pour les étudiantes afghanes. 100 % des fonds éducatifs vont aux étudiantes.",
  "liveGoalLabel": "Objectif du Fonds d'Aide 2026",
  "raisedOf": "Collecté sur",
  "goal": "Objectif total",
  "fundedBadge": "Registre transparent • 100 % alloué aux étudiantes",
  "boxTitle": "Parrainage éducatif direct",
  "boxSubtitle": "Choisissez un palier de soutien ou indiquez un montant personnalisé.",
  "customAmount": "Contribution personnalisée ($ USD)",
  "dedicationLabel": "Dédicace / Message de soutien (Facultatif)",
  "dedicationPlaceholder": "En hommage à, en mémoire de, ou quelques mots d'encouragement...",
  "tabCard": "Carte bancaire",
  "tabCardSub": "Instantané • Chiffré • Mondial",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Direct • Paiement en 1 clic",
  "tabBank": "Virement bancaire direct",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 mois d'Internet haut débit et VPN sécurisé",
      "tier": "Niveau 1 : Connectivité",
      "impact": "Fournit 1 mois de connexion Internet haut débit et VPN chiffré pour une étudiante en Afghanistan.",
      "badge": "Indispensable"
    },
    {
      "amount": 75,
      "label": "Serveur Cloud et environnement de développement",
      "tier": "Niveau 2 : Infrastructure",
      "impact": "Finance les serveurs cloud de programmation, les cours avancés et les leçons téléchargeables hors ligne.",
      "badge": "Le plus populaire"
    },
    {
      "amount": 150,
      "label": "Bourse d'études complète pour une étudiante",
      "tier": "Niveau 3 : Bourse complète",
      "impact": "Finance directement un semestre complet de formation en ingénierie logicielle pour une jeune femme.",
      "badge": "Fort impact"
    },
    {
      "amount": 500,
      "label": "Fournir un ordinateur portable de développement",
      "tier": "Niveau 4 : Matériel",
      "impact": "Achat et livraison sécurisée d'un ordinateur portable de programmation et d'une batterie de secours pour une étudiante.",
      "badge": "Révolutionnaire"
    },
    {
      "amount": 1200,
      "label": "Parrainez une année complète d'ingénierie",
      "tier": "Niveau 5 : Parcours annuel",
      "impact": "Finance une année entière d'apprentissage du code, un mentorat mondial individuel et l'accès à un emploi à distance.",
      "badge": "Bourse d'excellence"
    }
  ],
  "donateNowBtn": "Procéder au paiement sécurisé",
  "processingBtn": "Connexion sécurisée en cours...",
  "cancelBtn": "Annuler",
  "encryptedNotice": "Chiffrement TLS 256 bits de niveau bancaire • Aucune donnée de carte conservée",
  "paypalTitle": "Finaliser avec PayPal",
  "paypalDesc": "Vous allez être redirigé vers le portail sécurisé de PayPal pour confirmer votre don.",
  "paypalError": "Impossible d'initialiser PayPal. Veuillez utiliser le paiement par carte ou virement.",
  "bankSelectLabel": "Sélectionnez le compte bancaire de l'Académie :",
  "bankVerifiedBadge": "Partenaires bancaires internationaux vérifiés",
  "copyAllBtn": "Copier toutes les coordonnées",
  "allCopiedText": "Coordonnées bancaires copiées dans le presse-papiers !",
  "copiedText": "Copié !",
  "beneficiaryLabel": "Bénéficiaire (Titulaire du compte)",
  "ibanLabel": "IBAN",
  "bicLabel": "Code BIC / SWIFT",
  "routingLabel": "Numéro de routage (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Numéro de compte",
  "bankNameLabel": "Établissement bancaire",
  "bankAddressLabel": "Adresse de la banque",
  "noticeLabel": "Condition de confirmation du virement",
  "receiptHeader": "Enregistrer un reçu de virement bancaire",
  "receiptSub": "Téléchargez votre justificatif pour que notre équipe financière valide la réception et vous adresse votre reçu officiel.",
  "donorNameLabel": "Nom complet du donateur",
  "donorNamePlaceholder": "ex. Camille Dubois",
  "donorEmailLabel": "Votre adresse e-mail",
  "donorEmailPlaceholder": "ex. camille@example.fr",
  "transferAmountLabel": "Montant transféré et devise",
  "txIdLabel": "Référence de transaction / UTR",
  "txIdPlaceholder": "ex. TXN-984210 ou référence du virement",
  "notesLabel": "Dédicace ou message personnel",
  "submitReceiptBtn": "Envoyer le justificatif",
  "submittingReceiptBtn": "Vérification et enregistrement...",
  "successReceiptTitle": "Justificatif enregistré avec succès !",
  "successReceiptDesc": "Merci infiniment pour votre générosité. Notre équipe comptable validera la transaction et vous enverra la confirmation.",
  "trackingRefLabel": "Référence de suivi :",
  "alertFillRequired": "Veuillez renseigner votre nom, e-mail et le montant du transfert.",
  "alertMinDonation": "Le don minimal est de 1 $ USD.",
  "alertNetworkError": "Erreur réseau. Veuillez réessayer ou nous contacter directement.",
  "alertSubmitFailed": "Échec de l'envoi du reçu bancaire.",
  "girlsEnrolled": "Étudiantes inscrites",
  "liveClassrooms": "Classes en direct",
  "freeScholarships": "100 % Gratuit",
  "trustBadge1Title": "Impact direct à 100 %",
  "trustBadge1Desc": "Chaque don sert exclusivement à financer le matériel, les abonnements Internet et la formation des femmes afghanes.",
  "trustBadge2Title": "Confidentialité absolue",
  "trustBadge2Desc": "L'identité et la localisation des étudiantes sont protégées par un chiffrement strict de niveau militaire.",
  "trustBadge3Title": "Transparence totale et audits",
  "trustBadge3Desc": "Mise à jour régulière des comptes, rapports annuels certifiés et suivi des progrès des étudiantes.",
  "storiesBadge": "Témoignages de Kaboul, Hérat et Mazar-e-Charif",
  "storiesTitle": "L'éducation sous siège, un courage invincible",
  "storiesSub": "Paroles authentiques de nos étudiantes qui apprennent clandestinement le développement logiciel.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kaboul, Afghanistan",
      "track": "Génie logiciel Full-Stack",
      "quote": "Quand les universités ont fermé, j'ai cru que mon avenir était brisé à jamais. Safi Academy m'a rendu l'espoir. Aujourd'hui, je développe des applications cloud et j'enseigne aux plus jeunes filles de mon quartier.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Hérat, Afghanistan",
      "track": "Python & Intelligence Artificielle",
      "quote": "L'ordinateur et le forfait Starlink que j'ai reçus grâce à votre soutien ont métamorphosé ma vie. Je ne suis plus une statistique muette ; je suis une chercheuse en IA en devenir.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-e-Charif, Afghanistan",
      "track": "Design UI/UX & Produits",
      "quote": "Ils peuvent barricader les portes des écoles, mais ils n'emprisonneront jamais notre soif de savoir. Chaque ligne de code que j'écris est une victoire contre l'obscurantisme.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Intégrité financière et gouvernance",
  "transparencyTitle": "La répartition précise de chaque euro reçu",
  "transparencySub": "Nous appliquons une transparence absolue. Voici comment vos dons sont investis.",
  "allocations": [
    {
      "percent": "50 %",
      "title": "Matériel et connexions Internet",
      "desc": "Ordinateurs portables, forfaits Starlink et VPN, batteries solaires et matériel de travail sécurisé à domicile."
    },
    {
      "percent": "30 %",
      "title": "Infrastructure Cloud et plateforme LMS",
      "desc": "Serveurs décentralisés, synchronisation hors ligne des cours vidéo et environnements de programmation."
    },
    {
      "percent": "15 %",
      "title": "Mentorat mondial et insertion professionnelle",
      "desc": "Indemnités pour mentors techniques internationaux, cours d'anglais professionnel et accès aux emplois à distance."
    },
    {
      "percent": "5 %",
      "title": "Sécurité opérationnelle et conformité",
      "desc": "Audits de sécurité, sécurisation des livraisons de matériel et préservation stricte de l'anonymat des élèves."
    }
  ],
  "faqBadge": "Questions fréquentes",
  "faqTitle": "Tout savoir sur notre fonds éducatif",
  "faqSub": "Réponses sur la traçabilité des dons, la sécurité des élèves et la conformité.",
  "faqs": [
    {
      "q": "Comment garantissez-vous que l'aide parvient bien aux étudiantes en Afghanistan ?",
      "a": "Nous opérons via un réseau décentralisé de coordinateurs locaux de confiance, distribuant le matériel et les forfaits Internet sans aucun intermédiaire étatique."
    },
    {
      "q": "Mon don est-il sécurisé et certifié ?",
      "a": "Oui, tous les règlements sont traités par des protocoles bancaires hautement sécurisés et crédités sur des comptes institutionnels régulés en Europe et aux États-Unis."
    },
    {
      "q": "Puis-je parrainer une étudiante en particulier ?",
      "a": "Oui, dès le niveau 3, vous pouvez ajouter une mention spécifique. Nous associerons votre don à une élève et vous partagerons son suivi académique anonymisé."
    },
    {
      "q": "Quels moyens de paiement sont disponibles ?",
      "a": "Nous acceptons les cartes bancaires internationales, PayPal ainsi que les virements bancaires directs SEPA, ACH et BACS."
    },
    {
      "q": "Comment l'anonymat des élèves est-il garanti ?",
      "a": "Leur sécurité est prioritaire. Les cours sont dispensés sous pseudonymes, sans caméra obligatoire, via des flux chiffrés de bout en bout."
    }
  ],
  "bottomCtaBadge": "Prenez part à ce combat pour la liberté",
  "bottomCtaTitle": "Allumez une lueur d'espoir au cœur des ténèbres.",
  "bottomCtaDesc": "Rejoignez des centaines de donateurs, ingénieurs et défenseurs des droits humains mobilisés pour les femmes d'Afghanistan.",
  "bottomCtaBtn": "Faire un don • Soutenir une étudiante",
  "verifiedScholarship": "Initiative humanitaire éducative internationale vérifiée",
  "bankAccounts": [
    {
      "title": "Dollar américain (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Virement domestique direct États-Unis / Wirex",
      "note": "Dépôt minimal de 1 $."
    },
    {
      "title": "Euro SEPA (Malte) - Shirin Gol Ahmadi",
      "subtitle": "Espace unique de paiement en euros (SEPA)",
      "note": "Sans aucun frais de transfert dans toute l'UE/EEE."
    },
    {
      "title": "Livre Sterling (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Virement bancaire direct Royaume-Uni / BACS",
      "note": "Règlement instantané via Faster Payments."
    },
    {
      "title": "Euro SEPA (Malte) - Shaheen Safi",
      "subtitle": "Espace unique de paiement en euros (SEPA)",
      "note": "Virement standard exécuté en 1 à 2 jours ouvrés."
    },
    {
      "title": "Euro SEPA (Luxembourg) - Shaheen Safi",
      "subtitle": "Virement transfrontalier SEPA Luxembourg",
      "note": "Virement direct par IBAN international."
    }
  ]
},
  "es": {
  "isRtl": false,
  "home": "Inicio",
  "heroBadge": "Ayuda Educativa de Emergencia • Desafiando la Prohibición",
  "heroTitle1": "Cerraron las escuelas.",
  "heroTitle2": "Nosotros abrimos el universo.",
  "heroDesc1": "Cuando 1,4 millones de niñas y jóvenes en Afganistán fueron despojadas de su derecho elemental a la educación, Safi Academy se negó a permanecer en silencio. Mediante redes descentralizadas seguras y canales cifrados, llevamos la formación en programación y tecnología directamente a sus hogares.",
  "heroDesc2": "Tu aportación no es caridad: es resistencia, solidaridad y emancipación. Cada céntimo financia directamente conectividad Starlink, portátiles seguros y mentores globales para valientes estudiantes afganas. El 100 % de los fondos educativos se destina directamente a las alumnas.",
  "liveGoalLabel": "Objetivo del Fondo Educativo 2026",
  "raisedOf": "Recaudado de",
  "goal": "Meta global",
  "fundedBadge": "Libro mayor transparente • 100 % asignado a alumnas",
  "boxTitle": "Patrocinio educativo directo",
  "boxSubtitle": "Elige un nivel de beca o introduce la cantidad que desees aportar.",
  "customAmount": "Contribución personalizada ($ USD)",
  "dedicationLabel": "Dedicatoria o mensaje de ánimo (Opcional)",
  "dedicationPlaceholder": "En honor a, en memoria de o palabras de motivación para las estudiantes...",
  "tabCard": "Tarjeta de débito / crédito",
  "tabCardSub": "Instantáneo • Cifrado • Global",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Directo • Pago en 1 clic",
  "tabBank": "Transferencia bancaria directa",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 mes de Internet de alta velocidad y VPN seguro",
      "tier": "Nivel 1: Conectividad",
      "impact": "Proporciona 1 mes de conexión de alta velocidad y VPN cifrado para una estudiante en Afganistán.",
      "badge": "Esencial"
    },
    {
      "amount": 75,
      "label": "Servidor en la nube y entorno de desarrollo",
      "tier": "Nivel 2: Infraestructura",
      "impact": "Financia servidores en la nube para programación, material didáctico avanzado y lecciones sin conexión.",
      "badge": "Más popular"
    },
    {
      "amount": 150,
      "label": "Beca de estudios completa para una estudiante",
      "tier": "Nivel 3: Beca completa",
      "impact": "Financia directamente un semestre completo de ingeniería de software para una estudiante afgana.",
      "badge": "Gran impacto"
    },
    {
      "amount": 500,
      "label": "Equipar a una estudiante con un ordenador portátil",
      "tier": "Nivel 4: Equipamiento",
      "impact": "Suministra y entrega de forma segura un portátil para programación y una batería externa a una estudiante.",
      "badge": "Transformador"
    },
    {
      "amount": 1200,
      "label": "Patrocina un año completo de formación técnica",
      "tier": "Nivel 5: Carrera completa",
      "impact": "Financia un año completo de ingeniería de software, tutoría internacional individual y apoyo para empleo remoto.",
      "badge": "Beca anual integral"
    }
  ],
  "donateNowBtn": "Continuar al pago seguro",
  "processingBtn": "Conectando con la pasarela cifrada...",
  "cancelBtn": "Cancelar",
  "encryptedNotice": "Cifrado TLS de 256 bits de estándar bancario • No almacenamos datos de tarjetas",
  "paypalTitle": "Completar mediante PayPal",
  "paypalDesc": "Serás redirigido al portal protegido de PayPal para validar tu donación.",
  "paypalError": "No se pudo iniciar PayPal. Por favor, prueba con tarjeta o transferencia bancaria.",
  "bankSelectLabel": "Selecciona la cuenta bancaria de la Academia:",
  "bankVerifiedBadge": "Socios bancarios internacionales verificados",
  "copyAllBtn": "Copiar todos los datos bancarios",
  "allCopiedText": "¡Datos bancarios copiados al portapapeles!",
  "copiedText": "¡Copiado!",
  "beneficiaryLabel": "Beneficiario (Titular de la cuenta)",
  "ibanLabel": "IBAN",
  "bicLabel": "Código BIC / SWIFT",
  "routingLabel": "Número de ruta (Routing / ACH)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Número de cuenta",
  "bankNameLabel": "Entidad bancaria",
  "bankAddressLabel": "Dirección registrada del banco",
  "noticeLabel": "Requisito de confirmación de depósito",
  "receiptHeader": "Registrar comprobante de transferencia",
  "receiptSub": "Envíanos tu justificante de ingreso para que nuestro equipo financiero valide la donación y emita tu certificado oficial.",
  "donorNameLabel": "Nombre completo del donante",
  "donorNamePlaceholder": "ej. Carlos Morales",
  "donorEmailLabel": "Tu correo electrónico",
  "donorEmailPlaceholder": "ej. carlos@example.es",
  "transferAmountLabel": "Importe transferido y moneda",
  "txIdLabel": "Referencia de la transferencia (UTR)",
  "txIdPlaceholder": "ej. TXN-984210 o referencia bancaria",
  "notesLabel": "Mensaje personal o dedicatoria",
  "submitReceiptBtn": "Enviar comprobante bancario",
  "submittingReceiptBtn": "Comprobando y registrando...",
  "successReceiptTitle": "¡Comprobante registrado con éxito!",
  "successReceiptDesc": "Muchísimas gracias por tu generosidad. Nuestro equipo contable verificará el ingreso y enviará la confirmación por correo.",
  "trackingRefLabel": "Código de seguimiento:",
  "alertFillRequired": "Por favor, indica tu nombre, correo electrónico y el importe transferido.",
  "alertMinDonation": "La donación mínima es de 1 $ USD.",
  "alertNetworkError": "Error de red. Inténtalo de nuevo o contáctanos directamente.",
  "alertSubmitFailed": "No se pudo enviar el comprobante de transferencia.",
  "girlsEnrolled": "Alumnas matriculadas",
  "liveClassrooms": "Aulas en vivo",
  "freeScholarships": "100 % Gratuito",
  "trustBadge1Title": "Impacto directo al 100 %",
  "trustBadge1Desc": "Todas las donaciones se destinan exclusivamente a ordenadores, internet y educación de mujeres afganas.",
  "trustBadge2Title": "Privacidad y confidencialidad absoluta",
  "trustBadge2Desc": "Las identidades y ubicaciones de las alumnas están blindadas bajo cifrado de grado militar.",
  "trustBadge3Title": "Transparencia auditada",
  "trustBadge3Desc": "Contabilidad pública actualizada, informes periódicos y seguimiento del progreso de las estudiantes.",
  "storiesBadge": "Voces desde Kabul, Herat y Mazar-e-Sharif",
  "storiesTitle": "Educación bajo asedio, determinación inquebrantable",
  "storiesSub": "Testimonios directos de nuestras estudiantes en aulas digitales clandestinas.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afganistán",
      "track": "Ingeniería de Software Full-Stack",
      "quote": "Cuando clausuraron las universidades creí que mi vida se había apagado. Safi Academy me devolvió el porvenir. Hoy programo aplicaciones en la nube y enseño a niñas de mi vecindario.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afganistán",
      "track": "Python e Inteligencia Artificial",
      "quote": "El portátil y el paquete Starlink que obtuve gracias a sus donaciones transformaron mi realidad. Ya no soy una cifra silenciada; soy una investigadora de inteligencia artificial.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-e-Sharif, Afganistán",
      "track": "Diseño UI/UX y Productos Digitales",
      "quote": "Podrán cerrar las aulas físicas con candados, pero jamás encarcelarán nuestras ganas de aprender. Cada línea de código que escribo es una victoria frente a la oscuridad.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Integridad contable y gobierno",
  "transparencyTitle": "A dónde va cada dólar que aportas",
  "transparencySub": "Mantenemos una transparencia total. Así es como se distribuyen los fondos de tu donación.",
  "allocations": [
    {
      "percent": "50 %",
      "title": "Equipamiento y conexión para alumnas",
      "desc": "Portátiles para programación, paquetes Starlink y VPN, baterías solares y material para el estudio seguro en casa."
    },
    {
      "percent": "30 %",
      "title": "Infraestructura en la nube y campus virtual",
      "desc": "Servidores descentralizados, descarga de lecciones en vídeo y entornos de ejecución de código en la nube."
    },
    {
      "percent": "15 %",
      "title": "Tutoría internacional e inserción remota",
      "desc": "Compensación a mentores técnicos de primer nivel, inglés para ingenieros y orientación laboral internacional."
    },
    {
      "percent": "5 %",
      "title": "Seguridad operativa y control de riesgos",
      "desc": "Auditorías de seguridad, protección de la cadena de suministro y salvaguarda absoluta del anonimato."
    }
  ],
  "faqBadge": "Preguntas frecuentes",
  "faqTitle": "Todo lo que necesitas saber sobre el fondo",
  "faqSub": "Respuestas claras sobre la entrega de la ayuda, la protección de las estudiantes y la rendición de cuentas.",
  "faqs": [
    {
      "q": "¿Cómo garantizan que las donaciones llegan de forma segura a las estudiantes en Afganistán?",
      "a": "Operamos a través de una red descentralizada de colaboradores locales de total confianza, suministrando equipos y saldo de internet directamente sin intervención estatal."
    },
    {
      "q": "¿Es mi donación segura y está debidamente respaldada?",
      "a": "Sí, todos los pagos se realizan mediante pasarelas con certificación bancaria internacional y cuentas institucionales en la Unión Europea y EE. UU."
    },
    {
      "q": "¿Puedo apadrinar a una estudiante concreta?",
      "a": "Sí, a partir del nivel 3 puedes incluir una dedicatoria y te vincularemos con una alumna, compartiendo su progreso académico de forma anónima."
    },
    {
      "q": "¿Qué modalidades de pago admiten?",
      "a": "Tarjetas bancarias internacionales, PayPal y transferencias directas en dólares (ACH), euros (SEPA) y libras esterlinas (BACS)."
    },
    {
      "q": "¿Cómo se protege a las alumnas frente a represalias?",
      "a": "Su seguridad es prioritaria. Estudian bajo nombres ficticios en canales fuertemente cifrados y sin obligación de encender la cámara."
    }
  ],
  "bottomCtaBadge": "Ponte del lado correcto de la historia",
  "bottomCtaTitle": "Enciende una luz de esperanza en los momentos más oscuros.",
  "bottomCtaDesc": "Únete a cientos de colaboradores globales, tecnólogos y defensores de los derechos humanos que apoyan a las mujeres afganas.",
  "bottomCtaBtn": "Donar ahora • Apoyar a una estudiante",
  "verifiedScholarship": "Iniciativa humanitaria académica global verificada sin fines de lucro",
  "bankAccounts": [
    {
      "title": "Dólar estadounidense (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Transferencia bancaria doméstica directa EE. UU. / Wirex",
      "note": "Depósito mínimo de 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Zona Única de Pagos en Euros (SEPA)",
      "note": "Sin comisión de transferencia en toda la UE/EEE."
    },
    {
      "title": "Libra esterlina (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Transferencia doméstica en Reino Unido / BACS",
      "note": "Liquidación inmediata mediante Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Zona Única de Pagos en Euros (SEPA)",
      "note": "Transferencia estándar en 1-2 días laborables."
    },
    {
      "title": "Euro SEPA (Luxemburgo) - Shaheen Safi",
      "subtitle": "Transferencia transfronteriza SEPA Luxemburgo",
      "note": "Transferencia directa mediante IBAN internacional."
    }
  ]
},
  "zh": {
  "isRtl": false,
  "home": "首页",
  "heroBadge": "紧急教育援助 • 冲破禁令阻碍",
  "heroTitle1": "他们锁上了校门。",
  "heroTitle2": "我们正在开启浩瀚宇宙。",
  "heroDesc1": "当阿富汗140万名女童和年轻女性被剥夺受教育的基本权利时，Safi Academy 绝不袖手旁观。通过高安全性的去中心化网络和加密通讯频道，我们将优质的软件工程与前沿科技课程直接送达阿富汗女性家中。",
  "heroDesc2": "您的善款绝非单纯的施舍，而是最坚定的声援、抵抗与赋能。每一分捐款都直接用于星链网络资助、安全笔记本电脑采购和全球名师辅导。100%的教育专款直接落实到女学生身上。",
  "liveGoalLabel": "2026年教育援助基金目标",
  "raisedOf": "已筹集 / 目标",
  "goal": "总目标",
  "fundedBadge": "全公开透明账本 • 100%学生专项资助",
  "boxTitle": "女学生奖学金直接资助",
  "boxSubtitle": "选择资助级别或自由输入赞助金额。",
  "customAmount": "自定义捐助金额 ($ 美元)",
  "dedicationLabel": "特别寄语 / 鼓励留言（选填）",
  "dedicationPlaceholder": "献给阿富汗勇敢的女学生、表达敬意或鼓励寄语...",
  "tabCard": "借记卡 / 信用卡",
  "tabCardSub": "实时到账 • 银行级加密 • 全球支持",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "直接付款 • 一键快速支付",
  "tabBank": "国际银行电汇",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1个月高速互联网与安全加密VPN",
      "tier": "第一级：网络接入",
      "impact": "为阿富汗的一名女学生提供为期一个月的加密高速互联网接入支持。",
      "badge": "至关重要"
    },
    {
      "amount": 75,
      "label": "云开发服务器与实验环境",
      "tier": "第二级：技术基建",
      "impact": "资助云端代码运行沙盒服务器、前沿课程课件及离线视频资源下载。",
      "badge": "最受欢迎"
    },
    {
      "amount": 150,
      "label": "全额资助一名女学生学期奖学金",
      "tier": "第三级：全额奖学金",
      "impact": "直接资助一名阿富汗失学女性获得完整的软件工程学期培训与指导。",
      "badge": "重大影响"
    },
    {
      "amount": 500,
      "label": "为一名女学生配备专业编程笔记本电脑",
      "tier": "第四级：硬件支持",
      "impact": "采购并安全递送一台用于软件开发的高性能笔记本电脑和应急移动电源。",
      "badge": "改变命运"
    },
    {
      "amount": 1200,
      "label": "全额资助一名学员全年度培养计划",
      "tier": "第五级：年度全面资助",
      "impact": "资助全年的软件工程系统进阶、一对一全球技术导师指导以及海外远程就业岗位支持。",
      "badge": "卓越年度奖学金"
    }
  ],
  "donateNowBtn": "前往安全支付",
  "processingBtn": "正在建立加密支付安全连接...",
  "cancelBtn": "取消",
  "encryptedNotice": "256位TLS银行级安全加密 • 不保存任何银行卡个人数据",
  "paypalTitle": "使用 PayPal 完成支付",
  "paypalDesc": "页面将跳转至 PayPal 官方安全页面以完成捐款确认。",
  "paypalError": "无法启动 PayPal 支付通道，请尝试使用银行卡或电汇。",
  "bankSelectLabel": "请选择学院官方受捐银行账户：",
  "bankVerifiedBadge": "经认证的欧美及国际官方银行合作机构",
  "copyAllBtn": "复制完整银行账户信息",
  "allCopiedText": "所有银行电汇信息已成功复制到剪贴板！",
  "copiedText": "已复制！",
  "beneficiaryLabel": "收款人户名（受益人）",
  "ibanLabel": "国际银行账号 (IBAN)",
  "bicLabel": "SWIFT / BIC 代码",
  "routingLabel": "银行代码 (Routing / ACH)",
  "sortCodeLabel": "分类代码 (Sort Code)",
  "accountNumberLabel": "银行账号",
  "bankNameLabel": "开户银行名称",
  "bankAddressLabel": "开户银行法定地址",
  "noticeLabel": "电汇入账确认须知",
  "receiptHeader": "提交银行电汇转账凭证",
  "receiptSub": "请上传汇款水单凭证，以便财务团队及时核对入账并向您发送官方捐赠收据。",
  "donorNameLabel": "捐款人完整姓名",
  "donorNamePlaceholder": "例如：张伟",
  "donorEmailLabel": "电子邮箱地址",
  "donorEmailPlaceholder": "例如：zhangwei@example.cn",
  "transferAmountLabel": "汇款金额与货币种类",
  "txIdLabel": "交易流水号 / 电汇参考编号 (UTR)",
  "txIdPlaceholder": "例如：TXN-984210 或银行流水号",
  "notesLabel": "寄语或特别留言",
  "submitReceiptBtn": "提交电汇凭证",
  "submittingReceiptBtn": "正在审核并记录凭证...",
  "successReceiptTitle": "汇款凭证已成功提交！",
  "successReceiptDesc": "衷心感谢您的善举与支持。财务团队将在确认账目后，向您的邮箱发送官方确认文件。",
  "trackingRefLabel": "凭证追踪单号：",
  "alertFillRequired": "请填写您的姓名、电子邮箱及汇款金额。",
  "alertMinDonation": "单笔捐款最低金额为 1 美元。",
  "alertNetworkError": "网络连接异常，请重试或与我们取得联系。",
  "alertSubmitFailed": "汇款凭证提交失败。",
  "girlsEnrolled": "在读女学生",
  "liveClassrooms": "实时在线课堂",
  "freeScholarships": "100%全免",
  "trustBadge1Title": "100%直接受惠",
  "trustBadge1Desc": "所有爱心捐款均专项用于阿富汗失学女性的硬件设备、网络连接与全额学费。",
  "trustBadge2Title": "军工级安全隐私",
  "trustBadge2Desc": "受助学员的个人身份及地理位置受到严格加密技术的绝对保护。",
  "trustBadge3Title": "经审计与公开透明",
  "trustBadge3Desc": "实时更新财务账目、定期发布年度财务报告及受助学员学习成果进展。",
  "storiesBadge": "来自喀布尔、赫拉特与马扎里沙里夫的声音",
  "storiesTitle": "困境中的求索，不可磨灭的求知之火",
  "storiesSub": "身处阿富汗秘密网络课堂的女学生们的真情独白。",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "阿富汗 · 喀布尔",
      "track": "全栈软件工程",
      "quote": "当大学大门向我们关闭的那一刻，我曾以为前途一片灰暗。Safi Academy 重新点燃了我的希望。如今我能独立构建云端软件，并在邻里间辅导更年轻的女孩们。",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "阿富汗 · 赫拉特",
      "track": "Python 与机器学习",
      "quote": "借助全球捐款赠予我的笔记本电脑和星链网络，我的命运被彻底改写。我不再是一个被遗忘的受害者，而是一名未来的AI学者。",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "阿富汗 · 马扎里沙里夫",
      "track": "UI/UX 与数字产品设计",
      "quote": "他们能锁住实体校门，却永远无法禁锢我们对真理的渴望。我写下的每一行代码，都是对抗黑暗与蒙昧的胜利。",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "财务诚信与监管说明",
  "transparencyTitle": "每一分善款的具体去向",
  "transparencySub": "我们坚守彻底的公开透明。以下是爱心善款的精准分配比例。",
  "allocations": [
    {
      "percent": "50%",
      "title": "学员硬件设备与高速网络",
      "desc": "软件开发电脑采购、星链与高阶VPN流量支持、太阳能备用电池及家庭学习防护用品。"
    },
    {
      "percent": "30%",
      "title": "云端算力与教学管理平台",
      "desc": "去中心化服务器集群、离线教学视频镜像分发以及云端编程调试沙盒系统。"
    },
    {
      "percent": "15%",
      "title": "全球导师指导与远程就业支持",
      "desc": "海外技术导师津贴、专业科技英语培训及跨国远程实习与工作对接。"
    },
    {
      "percent": "5%",
      "title": "安全风控与合规审查",
      "desc": "物资供应链保密运输、反追踪审查以及学员身份信息的绝密保护。"
    }
  ],
  "faqBadge": "常见疑问解答",
  "faqTitle": "关于助学基金的核心解答",
  "faqSub": "全面了解资助流程、善款落地、资金安全与学员隐私保护机制。",
  "faqs": [
    {
      "q": "你们如何确保善款和物资能安全送达阿富汗女学生手中？",
      "a": "我们通过由经过严格背景审查的本地协调员组成的去中心化网络，点对点递送设备并充值加密流量，完全绕过当局控制渠道。"
    },
    {
      "q": "我的捐款流程是否安全合规？",
      "a": "完全安全。所有在线支付均符合全球一级金融安全标准，款项直接进入受欧洲和美国金融监管机构批准的学院官方银行账户。"
    },
    {
      "q": "我可以指定资助某一位具体的学生吗？",
      "a": "可以。选择3级及以上资助级别时，您可附上特别寄语，我们将为您匹配一名受助女学生，并定期向您发送隐去敏感信息的学业成长报告。"
    },
    {
      "q": "平台支持哪些付款方式？",
      "a": "支持 Visa、MasterCard 等国际信用卡、PayPal 以及美元 (ACH)、欧元 (SEPA) 和英镑 (BACS) 国际电汇。"
    },
    {
      "q": "如何避免学员因学习而遭受安全威胁？",
      "a": "学员人身安全高于一切。授课全程使用匿名代码和端到端加密通道，上课无需开启摄像头，所有通讯均防侦测。"
    }
  ],
  "bottomCtaBadge": "选择站在历史正确的一边",
  "bottomCtaTitle": "在至暗时刻，点亮一盏照亮未来的希望之光。",
  "bottomCtaDesc": "携手全球数百位慈善家、科技先锋与人权支持者，共同赋能阿富汗女性重掌命运。",
  "bottomCtaBtn": "立即捐助 • 托起一位女学生的未来",
  "verifiedScholarship": "经权威核验的全球非营利国际学术人道救援计划",
  "bankAccounts": [
    {
      "title": "美元账户 (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "美国本土直接银行电汇 / Wirex",
      "note": "单笔最低入账限额为 1 美元。"
    },
    {
      "title": "欧元账户 SEPA (马耳他) - Shirin Gol Ahmadi",
      "subtitle": "欧洲单一欧元支付区 (SEPA)",
      "note": "欧盟及欧洲经济区范围内免电汇手续费。"
    },
    {
      "title": "英镑账户 (UK Faster Payments) - Shaheen Safi",
      "subtitle": "英国本土直接转账 / BACS",
      "note": "通过 Faster Payments 系统实现即时结算。"
    },
    {
      "title": "欧元账户 SEPA (马耳他) - Shaheen Safi",
      "subtitle": "欧洲单一欧元支付区 (SEPA)",
      "note": "标准电汇在1至2个工作日内入账。"
    },
    {
      "title": "欧元账户 SEPA (卢森堡) - Shaheen Safi",
      "subtitle": "卢森堡跨境 SEPA 银行转账",
      "note": "支持国际 IBAN 直接电汇。"
    }
  ]
},
  "hi": {
  "isRtl": false,
  "home": "मुख्य पृष्ठ",
  "heroBadge": "आपातकालीन शैक्षिक सहायता • पाबंदियों के विरुद्ध दृढ़ संकल्प",
  "heroTitle1": "उन्होंने स्कूलों के दरवाज़े बंद कर दिए।",
  "heroTitle2": "हम ब्रह्मांड के द्वार खोल रहे हैं।",
  "heroDesc1": "जब अफगानिस्तान में 14 लाख लड़कियों और महिलाओं को उनके बुनियादी शिक्षा के अधिकार से वंचित कर दिया गया, तब Safi Academy चुप नहीं बैठी। हम सुरक्षित विकेंद्रीकृत नेटवर्क और एन्क्रिप्टेड चैनलों के माध्यम से सीधे उनके घरों तक कोडिंग और तकनीकी शिक्षा पहुँचा रहे हैं।",
  "heroDesc2": "आपका योगदान दान नहीं है — यह एकजुटता, साहस और सशक्तिकरण है। आपका दिया हर एक पैसा सीधे स्टारलिंक इंटरनेट, सुरक्षित लैपटॉप और अफगान छात्राओं के वैश्विक मार्गदर्शन में लगाया जाता है। शिक्षा कोष का 100% हिस्सा सीधे छात्राओं तक पहुँचता है।",
  "liveGoalLabel": "2026 शैक्षिक सहायता कोष लक्ष्य",
  "raisedOf": "एकत्रित / लक्ष्य",
  "goal": "कुल लक्ष्य",
  "fundedBadge": "पारदर्शी सार्वजनिक बहीखाता • 100% सीधे छात्राओं को आवंटन",
  "boxTitle": "छात्रा के लिए सीधी छात्रवृत्ति सहायता",
  "boxSubtitle": "एक छात्रवृत्ति स्तर चुनें या अपनी इच्छानुसार राशि दर्ज करें।",
  "customAmount": "इच्छानुसार योगदान राशि ($ USD)",
  "dedicationLabel": "समर्पण संदेश या प्रोत्साहन पत्र (वैकल्पिक)",
  "dedicationPlaceholder": "छात्राओं के प्रोत्साहन के लिए कुछ शब्द या संदेश...",
  "tabCard": "डेबिट / क्रेडिट कार्ड",
  "tabCardSub": "त्वरित • एन्क्रिप्टेड • वैश्विक",
  "tabPaypal": "पेपैल (PayPal)",
  "tabPaypalSub": "सीधा भुगतान • एक क्लिक में",
  "tabBank": "सीधा बैंक ट्रांसफर",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 महीने का हाई-स्पीड इंटरनेट और सुरक्षित VPN",
      "tier": "स्तर 1: सुरक्षित कनेक्टिविटी",
      "impact": "अफगानिस्तान में एक छात्रा के लिए 1 महीने का सुरक्षित इंटरनेट और वीपीएन प्रदान करता है।",
      "badge": "अति आवश्यक"
    },
    {
      "amount": 75,
      "label": "क्लाउड सर्वर और विकास वातावरण",
      "tier": "स्तर 2: तकनीकी अवसंरचना",
      "impact": "कोडिंग के लिए क्लाउड सर्वर, उन्नत अध्ययन सामग्री और ऑफ़लाइन पाठों को वित्तपोषित करता है।",
      "badge": "सर्वाधिक लोकप्रिय"
    },
    {
      "amount": 150,
      "label": "छात्रा के लिए सीधी छात्रवृत्ति",
      "tier": "स्तर 3: पूर्ण छात्रवृत्ति",
      "impact": "एक वंचित छात्रा के लिए सॉफ्टवेयर इंजीनियरिंग के पूरे सेमेस्टर की शिक्षा का वित्तपोषण।",
      "badge": "गहरा प्रभाव"
    },
    {
      "amount": 500,
      "label": "छात्रा को लैपटॉप और हार्डवेयर प्रदान करना",
      "tier": "स्तर 4: हार्डवेयर उपकरण",
      "impact": "एक छात्रा को सुरक्षित रूप से कोडिंग लैपटॉप और पावर बैंक खरीदकर उपलब्ध कराना।",
      "badge": "परिवर्तनकारी"
    },
    {
      "amount": 1200,
      "label": "पूर्ण वर्ष के तकनीकी करियर की प्रायोजन",
      "tier": "स्तर 5: वार्षिक पूर्ण छात्रवृत्ति",
      "impact": "सॉफ्टवेयर इंजीनियरिंग के पूरे एक साल, 1-ऑन-1 वैश्विक मेंटरशिप और रिमोट जॉब में सहायता।",
      "badge": "वार्षिक सर्वोच्च प्रायोजन"
    }
  ],
  "donateNowBtn": "सुरक्षित भुगतान की ओर बढ़ें",
  "processingBtn": "सुरक्षित गेटवे से कनेक्ट किया जा रहा है...",
  "cancelBtn": "रद्द करें",
  "encryptedNotice": "256-बिट टीएलएस बैंकिंग सुरक्षा • कोई कार्ड डेटा संग्रहीत नहीं किया जाता",
  "paypalTitle": "पेपैल (PayPal) द्वारा भुगतान पूरा करें",
  "paypalDesc": "आपको भुगतान की पुष्टि के लिए पेपैल के सुरक्षित पोर्टल पर भेजा जाएगा।",
  "paypalError": "पेपैल गेटवे लोड नहीं हो सका। कृपया कार्ड या बैंक ट्रांसफर का उपयोग करें।",
  "bankSelectLabel": "अकादमी का आधिकारिक बैंक खाता चुनें:",
  "bankVerifiedBadge": "सत्यापित अंतरराष्ट्रीय बैंकिंग भागीदार",
  "copyAllBtn": "बैंक विवरण कॉपी करें",
  "allCopiedText": "बैंक विवरण क्लिपबोर्ड पर कॉपी हो गया!",
  "copiedText": "कॉपी हुआ!",
  "beneficiaryLabel": "लाभार्थी (खाताधारक का नाम)",
  "ibanLabel": "अंतरराष्ट्रीय आईबीएएन (IBAN)",
  "bicLabel": "स्विफ्ट कोड / BIC",
  "routingLabel": "राउटिंग नंबर (ACH / Wire)",
  "sortCodeLabel": "सॉर्ट कोड (Sort Code)",
  "accountNumberLabel": "खाता संख्या",
  "bankNameLabel": "बैंक का नाम",
  "bankAddressLabel": "बैंक का पंजीकृत पता",
  "noticeLabel": "जमा सत्यापन की शर्त",
  "receiptHeader": "बैंक ट्रांसफर की रसीद दर्ज करें",
  "receiptSub": "अपनी भुगतान रसीद अपलोड करें ताकि हमारी वित्तीय टीम इसे सत्यापित कर आधिकारिक पावती भेज सके।",
  "donorNameLabel": "दानदाता का पूरा नाम",
  "donorNamePlaceholder": "उदा. रोहन शर्मा",
  "donorEmailLabel": "आपका ईमेल पता",
  "donorEmailPlaceholder": "उदा. rohan@example.in",
  "transferAmountLabel": "अंतरित राशि और मुद्रा",
  "txIdLabel": "लेनदेन संदर्भ संख्या (UTR)",
  "txIdPlaceholder": "उदा. TXN-984210 या यूटीआर संख्या",
  "notesLabel": "संदेश या शुभकामनाएँ",
  "submitReceiptBtn": "रसीद जमा करें",
  "submittingReceiptBtn": "रसीद की पुष्टि की जा रही है...",
  "successReceiptTitle": "रसीद सफलतापूर्वक दर्ज हो गई!",
  "successReceiptDesc": "आपकी उदारता के लिए बहुत-बहुत धन्यवाद। हमारी वित्त टीम राशि की पुष्टि कर रसीद ईमेल करेगी।",
  "trackingRefLabel": "ट्रैकिंग संदर्भ:",
  "alertFillRequired": "कृपया अपना नाम, ईमेल और ट्रांसफर राशि दर्ज करें।",
  "alertMinDonation": "न्यूनतम योगदान राशि 1 $ USD है।",
  "alertNetworkError": "नेटवर्क समस्या। कृपया पुनः प्रयास करें।",
  "alertSubmitFailed": "रसीद जमा करने में त्रुटि हुई।",
  "girlsEnrolled": "नामांकित छात्राएं",
  "liveClassrooms": "लाइव कक्षाएं",
  "freeScholarships": "100% निःशुल्क",
  "trustBadge1Title": "100% प्रत्यक्ष प्रभाव",
  "trustBadge1Desc": "सभी दान राशि सीधे अफगान महिलाओं के लैपटॉप, इंटरनेट और शिक्षा में लगाई जाती है।",
  "trustBadge2Title": "पूर्ण गोपनीयता व सुरक्षा",
  "trustBadge2Desc": "छात्राओं की पहचान और स्थान को सैन्य-स्तरीय एन्क्रिप्शन द्वारा सुरक्षित रखा जाता है।",
  "trustBadge3Title": "पारदर्शी और जाँचा हुआ",
  "trustBadge3Desc": "नियमित रूप से अद्यतन वित्तीय बहीखाता और छात्राओं की शैक्षिक प्रगति की रिपोर्ट।",
  "storiesBadge": "काबुल, हेरात और मज़ार-ए-शरीफ़ से आवाजें",
  "storiesTitle": "कठिन परिस्थितियों में शिक्षा, अटूट संकल्प",
  "storiesSub": "गुप्त आभासी कक्षाओं में कोडिंग सीख रहीं हमारी छात्राओं के वास्तविक अनुभव।",
  "stories": [
    {
      "name": "फातिमा आर.",
      "location": "काबुल, अफगानिस्तान",
      "track": "फुल-स्टैक सॉफ्टवेयर इंजीनियरिंग",
      "quote": "जब विश्वविद्यालयों को बंद कर दिया गया, तो मुझे लगा कि मेरा भविष्य समाप्त हो गया। Safi Academy ने मुझे नई उम्मीद दी। आज मैं क्लाउड सॉफ्टवेयर बनाती हूँ और अपने पड़ोस की लड़कियों को कोडिंग सिखाती हूँ।",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "ज़हरा एम.",
      "location": "हेरात, अफगानिस्तान",
      "track": "पायथन और मशीन लर्निंग",
      "quote": "आपके सहयोग से मिला लैपटॉप और स्टारलिंक इंटरनेट ने मेरी दुनिया बदल दी। अब मैं केवल एक संख्या नहीं हूँ; मैं एक भावी एआई शोधकर्ता हूँ।",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "मरियम के.",
      "location": "मज़ार-ए-शरीफ़, अफगानिस्तान",
      "track": "UI/UX और उत्पाद डिज़ाइन",
      "quote": "वे स्कूलों के दरवाजों पर ताला लगा सकते हैं, लेकिन हमारे सीखने के जज्बे को कैद नहीं कर सकते। मेरे द्वारा लिखा गया हर कोड अंधेरे के खिलाफ एक जीत है।",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "वित्तीय निष्पक्षता और जवाबदेही",
  "transparencyTitle": "आपका हर डॉलर कहाँ खर्च होता है?",
  "transparencySub": "हम पूर्ण पारदर्शिता में विश्वास रखते हैं। यहाँ राशि के वितरण का विवरण दिया गया है।",
  "allocations": [
    {
      "percent": "50%",
      "title": "छात्राओं के लिए लैपटॉप व इंटरनेट",
      "desc": "प्रोग्रामिंग लैपटॉप, स्टारलिंक व वीपीएन कनेक्टिविटी, सौर ऊर्जा उपकरण और घरेलू शिक्षण संसाधन।"
    },
    {
      "percent": "30%",
      "title": "क्लाउड सर्वर व शिक्षण मंच",
      "desc": "विकेंद्रीकृत सर्वर, ऑफ़लाइन वीडियो पाठ और कोड निष्पादन के लिए सुरक्षित वातावरण।"
    },
    {
      "percent": "15%",
      "title": "वैश्विक मेंटरशिप व रिमोट करियर",
      "desc": "अंतरराष्ट्रीय विशेषज्ञों का मार्गदर्शन, तकनीकी अंग्रेजी और रिमोट जॉब्स में सहायता।"
    },
    {
      "percent": "5%",
      "title": "सुरक्षा संचालन व जोखिम नियंत्रण",
      "desc": "सुरक्षा समीक्षा, सुरक्षित हार्डवेयर वितरण और छात्राओं की पूर्ण गोपनीयता सुनिश्चित करना।"
    }
  ],
  "faqBadge": "अक्सर पूछे जाने वाले प्रश्न",
  "faqTitle": "शिक्षा कोष के विषय में आवश्यक जानकारी",
  "faqSub": "सहायता वितरण, छात्राओं की सुरक्षा और वित्तीय पारदर्शिता पर स्पष्ट उत्तर।",
  "faqs": [
    {
      "q": "आप कैसे सुनिश्चित करते हैं कि सहायता सुरक्षित रूप से छात्राओं तक पहुँचे?",
      "a": "हम स्थानीय स्तर पर जाँचे-परखे समन्वयकों के विकेंद्रीकृत नेटवर्क के माध्यम से बिना किसी सरकारी हस्तक्षेप के उपकरण और इंटरनेट सहायता सीधे पहुँचाते हैं।"
    },
    {
      "q": "क्या मेरा दान सुरक्षित और प्रमाणित है?",
      "a": "हाँ, सभी भुगतान अंतरराष्ट्रीय बैंकिंग मानकों के अनुरूप यूरोप और अमेरिका में पंजीकृत आधिकारिक खातों में किए जाते हैं।"
    },
    {
      "q": "क्या मैं किसी विशिष्ट छात्रा की शिक्षा प्रायोजित कर सकता हूँ?",
      "a": "हाँ! स्तर 3 या उससे ऊपर, आप एक समर्पण नोट लिख सकते हैं और हम छात्रा की प्रगति रिपोर्ट (गोपनीय रूप से) आपके साथ साझा करेंगे।"
    },
    {
      "q": "भुगतान के कौन-से साधन स्वीकार किए जाते हैं?",
      "a": "सभी अंतरराष्ट्रीय कार्ड, पेपैल और डॉलर (ACH), यूरो (SEPA) व ब्रिटिश पाउंड (BACS) में सीधा बैंक ट्रांसफर।"
    },
    {
      "q": "छात्राओं की सुरक्षा कैसे सुनिश्चित की जाती है?",
      "a": "छात्राओं की सुरक्षा हमारी पहली प्राथमिकता है। वे काल्पनिक नामों से पूरी तरह एन्क्रिप्टेड प्लेटफॉर्म पर बिना कैमरा ऑन किए पढ़ती हैं।"
    }
  ],
  "bottomCtaBadge": "इतिहास के सही पक्ष में खड़े हों",
  "bottomCtaTitle": "घोर अंधकार में आशा की एक किरण जलाएं।",
  "bottomCtaDesc": "अफगान महिलाओं के भविष्य को संवारने के लिए विश्वभर के सैकड़ों समर्थकों के साथ जुड़ें।",
  "bottomCtaBtn": "अभी दान करें • एक छात्रा का भविष्य बदलें",
  "verifiedScholarship": "सत्यापित अंतरराष्ट्रीय गैर-लाभकारी शैक्षणिक सहायता पहल",
  "bankAccounts": [
    {
      "title": "अमेरिकी डॉलर (ACH / Routing) - शिरिन गुल अहमदी",
      "subtitle": "अमेरिका के भीतर सीधा बैंक ट्रांसफर / Wirex",
      "note": "न्यूनतम जमा राशि 1 $ है।"
    },
    {
      "title": "यूरो SEPA (माल्टा) - शिरिन गुल अहमदी",
      "subtitle": "यूरोपीय एकल भुगतान क्षेत्र (SEPA)",
      "note": "पूरे यूरोपीय संघ/ईईए में शून्य शुल्क।"
    },
    {
      "title": "ब्रिटिश पाउंड (UK Faster Payments) - शाहीन साफ़ी",
      "subtitle": "यूके घरेलू ट्रांसफर / BACS",
      "note": "Faster Payments के माध्यम से तुरंत भुगतान।"
    },
    {
      "title": "यूरो SEPA (माल्टा) - शाहीन साफ़ी",
      "subtitle": "यूरोपीय एकल भुगतान क्षेत्र (SEPA)",
      "note": "मानक बैंक ट्रांसफर 1-2 कार्य दिवसों में।"
    },
    {
      "title": "यूरो SEPA (लक्ज़मबर्ग) - शाहीन साफ़ी",
      "subtitle": "SEPA क्रॉस-बॉर्डर बैंक ट्रांसफर लक्ज़मबर्ग",
      "note": "अंतरराष्ट्रीय आईबीएएन के माध्यम से सीधा ट्रांसफर।"
    }
  ]
},
  "it": {
  "isRtl": false,
  "home": "Home",
  "heroBadge": "Aiuto Educativo di Emergenza • Sfidare il Divieto",
  "heroTitle1": "Hanno sbarrato le porte delle scuole.",
  "heroTitle2": "Noi apriamo l'universo.",
  "heroDesc1": "Quando a 1,4 milioni di ragazze e donne in Afghanistan è stato negato il diritto all'istruzione, Safi Academy ha scelto di non voltarsi dall'altra parte. Attraverso reti decentralizzate e canali crittografati, portiamo la formazione in programmazione e tecnologia direttamente nelle loro case.",
  "heroDesc2": "Il vostro sostegno non è beneficenza: è resistenza, solidarietà ed emancipazione. Ogni singolo centesimo finanzia direttamente connessioni Starlink, laptop sicuri e tutor internazionali per coraggiose studentesse afghane. Il 100% dei fondi educativi è destinato direttamente alle studentesse.",
  "liveGoalLabel": "Obiettivo del Fondo Educativo 2026",
  "raisedOf": "Raccolti su",
  "goal": "Obiettivo complessivo",
  "fundedBadge": "Registro trasparente • 100% devoluto alle studentesse",
  "boxTitle": "Sostegno diretto agli studi",
  "boxSubtitle": "Scegli un livello di borsa di studio o inserisci un importo personalizzato.",
  "customAmount": "Donazione personalizzata ($ USD)",
  "dedicationLabel": "Dedica o messaggio di incoraggiamento (Facoltativo)",
  "dedicationPlaceholder": "In onore di, in memoria di o parole di vicinanza per le studentesse...",
  "tabCard": "Carta di debito / credito",
  "tabCardSub": "Istantaneo • Crittografato • Globale",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Diretto • Pagamento in 1 clic",
  "tabBank": "Bonifico bancario diretto",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 mese di Internet ad alta velocità e VPN sicura",
      "tier": "Livello 1: Connettività",
      "impact": "Garantisce 1 mese di connessione internet ad alta velocità e VPN cifrata per una studentessa in Afghanistan.",
      "badge": "Essenziale"
    },
    {
      "amount": 75,
      "label": "Server cloud e ambiente di sviluppo",
      "tier": "Livello 2: Infrastruttura",
      "impact": "Finanzia server cloud per la programmazione, materiali didattici all'avanguardia e lezioni offline.",
      "badge": "Più scelto"
    },
    {
      "amount": 150,
      "label": "Borsa di studio completa per una studentessa",
      "tier": "Livello 3: Borsa di studio",
      "impact": "Finanzia direttamente un intero semestre di ingegneria del software per una ragazza afghana.",
      "badge": "Grande impatto"
    },
    {
      "amount": 500,
      "label": "Fornisci un laptop a una studentessa",
      "tier": "Livello 4: Attrezzatura",
      "impact": "Fornisce e consegna in modo sicuro un computer portatile da programmazione e un power bank a una studentessa.",
      "badge": "Trasformativo"
    },
    {
      "amount": 1200,
      "label": "Sponsorizza un intero anno di studi",
      "tier": "Livello 5: Percorso annuale",
      "impact": "Finanzia un intero anno di formazione ingegneristica, tutoraggio internazionale individuale e supporto per il lavoro da remoto.",
      "badge": "Borsa annuale completa"
    }
  ],
  "donateNowBtn": "Procedi al pagamento sicuro",
  "processingBtn": "Connessione al gateway sicuro in corso...",
  "cancelBtn": "Annulla",
  "encryptedNotice": "Crittografia bancaria TLS a 256 bit • Nessun dato della carta viene archiviato",
  "paypalTitle": "Completa con PayPal",
  "paypalDesc": "Verrai reindirizzato al portale protetto di PayPal per confermare la donazione.",
  "paypalError": "Impossibile caricare PayPal. Si prega di utilizzare carta o bonifico.",
  "bankSelectLabel": "Seleziona il conto bancario ufficiale dell'Accademia:",
  "bankVerifiedBadge": "Partner bancari internazionali verificati",
  "copyAllBtn": "Copia tutte le coordinate bancarie",
  "allCopiedText": "Coordinate copiate negli appunti!",
  "copiedText": "Copiato!",
  "beneficiaryLabel": "Beneficiario (Intestatario del conto)",
  "ibanLabel": "IBAN",
  "bicLabel": "Codice BIC / SWIFT",
  "routingLabel": "Routing Number (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Numero di conto",
  "bankNameLabel": "Istituto di credito",
  "bankAddressLabel": "Indirizzo della banca",
  "noticeLabel": "Requisito di convalida del bonifico",
  "receiptHeader": "Registra ricevuta del bonifico bancario",
  "receiptSub": "Carica la contabile del bonifico affinché il nostro ufficio contabile possa confermare la donazione e inviarti la ricevuta.",
  "donorNameLabel": "Nome completo del donatore",
  "donorNamePlaceholder": "es. Marco Rossi",
  "donorEmailLabel": "Indirizzo e-mail",
  "donorEmailPlaceholder": "es. marco@example.it",
  "transferAmountLabel": "Importo trasferito e valuta",
  "txIdLabel": "CRO / Riferimento transazione (UTR)",
  "txIdPlaceholder": "es. TXN-984210 o riferimento bonifico",
  "notesLabel": "Dedica o messaggio personale",
  "submitReceiptBtn": "Invia contabile bancaria",
  "submittingReceiptBtn": "Verifica e registrazione...",
  "successReceiptTitle": "Ricevuta registrata con successo!",
  "successReceiptDesc": "Grazie di cuore per la tua generosità. Verificheremo la transazione e ti invieremo la conferma via email.",
  "trackingRefLabel": "Codice di tracciamento:",
  "alertFillRequired": "Compila nome, e-mail e importo trasferito.",
  "alertMinDonation": "La donazione minima è di 1 $ USD.",
  "alertNetworkError": "Errore di rete. Riprova o contattaci direttamente.",
  "alertSubmitFailed": "Invio della contabile bancaria non riuscito.",
  "girlsEnrolled": "Studentesse iscritte",
  "liveClassrooms": "Classi dal vivo",
  "freeScholarships": "100% Gratuito",
  "trustBadge1Title": "Impatto diretto al 100%",
  "trustBadge1Desc": "Tutte le donazioni sono impiegate per computer portatili, internet e formazione delle donne in Afghanistan.",
  "trustBadge2Title": "Privacy e sicurezza assolute",
  "trustBadge2Desc": "Le identità e i luoghi delle studentesse sono tutelati con crittografia di livello militare.",
  "trustBadge3Title": "Trasparenza certificata",
  "trustBadge3Desc": "Bilanci pubblici regolarmente aggiornati, rendicontazione accurata e tracciamento dei traguardi raggiunti.",
  "storiesBadge": "Voci da Kabul, Herat e Mazar-i-Sharif",
  "storiesTitle": "Istruzione sotto assedio, volontà incrollabile",
  "storiesSub": "Parole autentiche delle nostre studentesse che imparano a programmare in classi clandestine.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afghanistan",
      "track": "Ingegneria del Software Full-Stack",
      "quote": "Quando hanno chiuso le università sentivo che il mio futuro era svanito. Safi Academy mi ha ridato una prospettiva. Oggi creo software cloud e insegno alle ragazzine del mio quartiere.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afghanistan",
      "track": "Python & Intelligenza Artificiale",
      "quote": "Il computer e la connessione Starlink che ho ricevuto grazie alle vostre donazioni hanno cambiato radicalmente la mia vita. Ora sono una ricercatrice nell'ambito dell'IA.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-i-Sharif, Afghanistan",
      "track": "Design UI/UX e Prodotti Digitali",
      "quote": "Possono chiudere gli edifici scolastici, ma non potranno mai imprigionare la nostra sete di conoscenza. Ogni riga di codice che scrivo è una vittoria contro il buio.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Integrità finanziaria e controllo",
  "transparencyTitle": "Come viene impiegato ogni euro donato",
  "transparencySub": "Manteniamo una trasparenza senza compromessi. Ecco la ripartizione dei fondi.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Hardware e connessione per le studentesse",
      "desc": "Computer portatili, connessioni Starlink e VPN, batterie solari e dotazioni per lo studio protetto a casa."
    },
    {
      "percent": "30%",
      "title": "Infrastruttura cloud e piattaforma didattica",
      "desc": "Server decentralizzati, videolezioni scaricabili offline e ambienti cloud per eseguire codice."
    },
    {
      "percent": "15%",
      "title": "Tutoraggio internazionale e lavoro da remoto",
      "desc": "Compensi per mentori tecnologici esteri, corsi di inglese specialistico e inserimento lavorativo da remoto."
    },
    {
      "percent": "5%",
      "title": "Sicurezza operativa e prevenzione rischi",
      "desc": "Controlli di conformità, logistica protetta e salvaguardia totale dell'anonimato delle allieve."
    }
  ],
  "faqBadge": "Domande frequenti",
  "faqTitle": "Tutto quello che c'è da sapere sul fondo",
  "faqSub": "Risposte su sicurezza, gestione dei fondi e tutela delle allieve.",
  "faqs": [
    {
      "q": "Come garantite che le donazioni arrivino in sicurezza alle studentesse in Afghanistan?",
      "a": "Operiamo tramite una rete decentralizzata di coordinatori locali fidati, fornendo computer e connettività senza alcun tramite istituzionale locale."
    },
    {
      "q": "La mia donazione è sicura e certificata?",
      "a": "Sì, i pagamenti sono protetti da rigorosi standard bancari internazionali e confluiscono su conti regolamentati in Europa e negli Stati Uniti."
    },
    {
      "q": "Posso sostenere una specifica studentessa?",
      "a": "Sì, dal livello 3 in poi puoi specificare una dedica: assegneremo il tuo contributo a una ragazza e condivideremo i suoi progressi in forma anonima."
    },
    {
      "q": "Quali modalità di versamento sono accettate?",
      "a": "Carte di credito/debito internazionali, PayPal e bonifici bancari diretti in dollari (ACH), euro (SEPA) e sterline inglesi (BACS)."
    },
    {
      "q": "In che modo tutelate le allieve da eventuali ritorsioni?",
      "a": "La loro incolumità viene prima di tutto. Partecipano sotto pseudonimi su piattaforme cifrate e senza alcun obbligo di telecamera accesa."
    }
  ],
  "bottomCtaBadge": "Scegli da che parte della storia stare",
  "bottomCtaTitle": "Accendi una fiamma di speranza nei momenti più bui.",
  "bottomCtaDesc": "Unisciti a centinaia di sostenitori in tutto il mondo per dare un futuro concreto alle donne dell'Afghanistan.",
  "bottomCtaBtn": "Dona adesso • Sostieni una studentessa",
  "verifiedScholarship": "Iniziativa umanitaria educativa globale verificata",
  "bankAccounts": [
    {
      "title": "Dollaro USA (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Bonifico bancario domestico USA / Wirex",
      "note": "Deposito minimo di 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Area unica dei pagamenti in euro (SEPA)",
      "note": "Nessuna commissione bancaria in tutta l'UE/SEE."
    },
    {
      "title": "Sterlina britannica (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Bonifico domestico nel Regno Unito / BACS",
      "note": "Accredito immediato tramite Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Area unica dei pagamenti in euro (SEPA)",
      "note": "Bonifico standard accreditato in 1-2 giorni lavorativi."
    },
    {
      "title": "Euro SEPA (Lussemburgo) - Shaheen Safi",
      "subtitle": "Bonifico transfrontaliero SEPA Lussemburgo",
      "note": "Bonifico diretto tramite IBAN internazionale."
    }
  ]
},
  "pt": {
  "isRtl": false,
  "home": "Início",
  "heroBadge": "Ajuda Educacional de Emergência • Desafiando a Proibição",
  "heroTitle1": "Trancaram as portas das escolas.",
  "heroTitle2": "Nós abrimos o universo.",
  "heroDesc1": "Quando 1,4 milhão de meninas e mulheres no Afeganistão foram privadas do direito à educação, a Safi Academy não se calou. Por meio de redes descentralizadas e canais criptografados, levamos o ensino de programação e tecnologia diretamente para dentro de suas casas.",
  "heroDesc2": "A sua contribuição não é caridade: é resistência, solidariedade e empoderamento real. Cada centavo financia diretamente internet Starlink, laptops seguros e mentores globais para jovens afegãs. 100% dos fundos vão diretamente para as alunas.",
  "liveGoalLabel": "Meta do Fundo de Auxílio 2026",
  "raisedOf": "Arrecadado de",
  "goal": "Meta global",
  "fundedBadge": "Livro-razão transparente • 100% destinado a alunas",
  "boxTitle": "Patrocínio estudantil direto",
  "boxSubtitle": "Escolha um plano de bolsa ou insira uma quantia personalizada.",
  "customAmount": "Contribuição personalizada ($ USD)",
  "dedicationLabel": "Dedicatória ou mensagem de incentivo (Opcional)",
  "dedicationPlaceholder": "Em homenagem a, em memória de ou palavras de apoio às alunas...",
  "tabCard": "Cartão de débito / crédito",
  "tabCardSub": "Instantâneo • Criptografado • Global",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Direto • Pagamento em 1 clique",
  "tabBank": "Transferência bancária direta",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 mês de Internet de alta velocidade e VPN segura",
      "tier": "Nível 1: Conectividade",
      "impact": "Garante 1 mês de acesso à internet de alta velocidade e VPN segura para uma aluna no Afeganistão.",
      "badge": "Essencial"
    },
    {
      "amount": 75,
      "label": "Servidor em nuvem e ambiente de desenvolvimento",
      "tier": "Nível 2: Infraestrutura",
      "impact": "Cobre servidores em nuvem para programação, materiais de curso avançados e aulas offline.",
      "badge": "Mais popular"
    },
    {
      "amount": 150,
      "label": "Bolsa de estudos integral para uma aluna",
      "tier": "Nível 3: Bolsa integral",
      "impact": "Financia diretamente um semestre inteiro de engenharia de software para uma jovem afegã.",
      "badge": "Alto impacto"
    },
    {
      "amount": 500,
      "label": "Equipar uma aluna com um laptop",
      "tier": "Nível 4: Equipamento",
      "impact": "Compra e entrega com segurança um notebook de desenvolvimento e um carregador portátil a uma aluna.",
      "badge": "Transformador"
    },
    {
      "amount": 1200,
      "label": "Patrocine um ano inteiro de engenharia",
      "tier": "Nível 5: Trajetória anual",
      "impact": "Cobre um ano completo de formação em engenharia de software, mentoria global individual e apoio para emprego remoto.",
      "badge": "Bolsa anual completa"
    }
  ],
  "donateNowBtn": "Seguir para pagamento seguro",
  "processingBtn": "Conectando ao gateway protegido...",
  "cancelBtn": "Cancelar",
  "encryptedNotice": "Criptografia TLS de 256 bits padrão bancário • Não armazenamos dados de cartões",
  "paypalTitle": "Concluir via PayPal",
  "paypalDesc": "Você será redirecionado ao portal protegido do PayPal para validar sua doação.",
  "paypalError": "Não foi possível carregar o PayPal. Por favor, utilize cartão ou transferência bancária.",
  "bankSelectLabel": "Selecione a conta bancária da Academia:",
  "bankVerifiedBadge": "Parceiros bancários internacionais verificados",
  "copyAllBtn": "Copiar todos os dados bancários",
  "allCopiedText": "Dados bancários copiados para a área de transferência!",
  "copiedText": "Copiado!",
  "beneficiaryLabel": "Beneficiário (Titular da conta)",
  "ibanLabel": "IBAN",
  "bicLabel": "Código BIC / SWIFT",
  "routingLabel": "Número de roteamento (Routing / ACH)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Número da conta",
  "bankNameLabel": "Instituição bancária",
  "bankAddressLabel": "Endereço registrado do banco",
  "noticeLabel": "Requisito para confirmação de depósito",
  "receiptHeader": "Registrar comprovante de transferência",
  "receiptSub": "Envie o comprovante para que nosso departamento financeiro confirme a doação e emita o recibo oficial.",
  "donorNameLabel": "Nome completo do doador",
  "donorNamePlaceholder": "ex. Ana Silva",
  "donorEmailLabel": "Seu endereço de e-mail",
  "donorEmailPlaceholder": "ex. ana@example.com",
  "transferAmountLabel": "Valor transferido e moeda",
  "txIdLabel": "Referência de transação (UTR)",
  "txIdPlaceholder": "ex. TXN-984210 ou número da transferência",
  "notesLabel": "Dedicatória ou mensagem pessoal",
  "submitReceiptBtn": "Enviar comprovante bancário",
  "submittingReceiptBtn": "Conferindo e registrando...",
  "successReceiptTitle": "Comprovante registrado com sucesso!",
  "successReceiptDesc": "Muito obrigado pela sua generosidade. Nossa equipe contábil confirmará a entrada dos fundos e enviará o recibo por e-mail.",
  "trackingRefLabel": "Código de rastreamento:",
  "alertFillRequired": "Por favor, preencha nome, e-mail e o valor transferido.",
  "alertMinDonation": "O valor mínimo para doação é 1 $ USD.",
  "alertNetworkError": "Erro de conexão. Tente novamente ou entre em contato diretamente.",
  "alertSubmitFailed": "Falha ao enviar o comprovante de transferência.",
  "girlsEnrolled": "Alunas matriculadas",
  "liveClassrooms": "Salas ao vivo",
  "freeScholarships": "100% Gratuito",
  "trustBadge1Title": "Impacto 100% direto",
  "trustBadge1Desc": "Todas as doações são destinadas exclusivamente a computadores, internet e educação para mulheres afegãs.",
  "trustBadge2Title": "Privacidade e segurança totais",
  "trustBadge2Desc": "A identidade e a localização das estudantes são protegidas por criptografia militar de alta segurança.",
  "trustBadge3Title": "Transparência auditada",
  "trustBadge3Desc": "Contabilidade pública atualizada, relatórios periódicos e acompanhamento das conquistas acadêmicas.",
  "storiesBadge": "Vozes de Cabul, Herat e Mazar-i-Sharif",
  "storiesTitle": "Educação sob cerco, coragem invencível",
  "storiesSub": "Depoimentos reais de nossas estudantes aprendendo tecnologia em salas digitais secretas.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Cabul, Afeganistão",
      "track": "Engenharia de Software Full-Stack",
      "quote": "Quando fecharam as faculdades, achei que meu futuro havia acabado. A Safi Academy me deu esperança. Hoje eu crio aplicações em nuvem e ensino as meninas mais novas do meu bairro.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afeganistão",
      "track": "Python e Inteligência Artificial",
      "quote": "O notebook e o plano de internet que recebi graças às doações transformaram a minha vida. Deixei de ser um número silenciado para me tornar uma pesquisadora em IA.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-i-Sharif, Afeganistão",
      "track": "Design UI/UX e Produtos Digitais",
      "quote": "Eles podem trancar os prédios escolares, mas jamais conseguirão prender nossa paixão pelo conhecimento. Cada código que programo é uma vitória contra a escuridão.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Integridade financeira e governança",
  "transparencyTitle": "O destino de cada dólar doado",
  "transparencySub": "Prezamos pela transparência absoluta. Veja como seus recursos são alocados.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Hardware e internet para as estudantes",
      "desc": "Laptops de programação, planos Starlink e VPN, painéis solares e material para estudo seguro em casa."
    },
    {
      "percent": "30%",
      "title": "Infraestrutura em nuvem e plataforma de aulas",
      "desc": "Servidores descentralizados, download de videoaulas offline e ambiente de testes de código."
    },
    {
      "percent": "15%",
      "title": "Mentoria internacional e empregabilidade remota",
      "desc": "Remuneração para mentores de tecnologia estrangeiros, inglês corporativo e apoio para vagas remotas."
    },
    {
      "percent": "5%",
      "title": "Segurança operacional e gestão de riscos",
      "desc": "Auditorias contínuas, transporte seguro de equipamentos e sigilo absoluto sobre a identidade das alunas."
    }
  ],
  "faqBadge": "Perguntas frequentes",
  "faqTitle": "Tudo sobre o nosso fundo educacional",
  "faqSub": "Respostas sobre a entrega de donativos, proteção e transparência.",
  "faqs": [
    {
      "q": "Como garantem que os recursos chegam com segurança às alunas no Afeganistão?",
      "a": "Atuamos por meio de uma rede local confiável e descentralizada, distribuindo equipamentos e internet sem intermediários governamentais."
    },
    {
      "q": "Minha doação é segura e comprovada?",
      "a": "Sim, todas as operações utilizam canais bancários internacionais auditados e contas institucionais na Europa e nos EUA."
    },
    {
      "q": "Posso custear os estudos de uma aluna específica?",
      "a": "Sim, a partir do nível 3 é possível incluir uma dedicatória, e enviaremos atualizações anônimas sobre o progresso dos estudos dela."
    },
    {
      "q": "Quais formas de pagamento são aceitas?",
      "a": "Cartões bancários internacionais, PayPal e transferências bancárias diretas em dólares (ACH), euros (SEPA) e libras (BACS)."
    },
    {
      "q": "Como a identidade das estudantes é protegida?",
      "a": "A segurança delas é nossa prioridade máxima. Elas estudam sob pseudônimos em canais com criptografia ponta a ponta e sem câmera obrigatória."
    }
  ],
  "bottomCtaBadge": "Posicione-se do lado certo da história",
  "bottomCtaTitle": "Acenda uma chama de esperança nos momentos mais sombrios.",
  "bottomCtaDesc": "Junte-se a centenas de doadores no mundo todo para abrir caminhos reais para as mulheres afegãs.",
  "bottomCtaBtn": "Doar agora • Apoiar uma aluna",
  "verifiedScholarship": "Iniciativa humanitária educacional internacional verificada",
  "bankAccounts": [
    {
      "title": "Dólar americano (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Transferência bancária doméstica direta EUA / Wirex",
      "note": "Depósito mínimo de 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Área Única de Pagamentos em Euros (SEPA)",
      "note": "Sem taxa de transferência em toda a UE/EEE."
    },
    {
      "title": "Libra esterlina (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Transferência bancária direta no Reino Unido / BACS",
      "note": "Liquidação instantânea via Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Área Única de Pagamentos em Euros (SEPA)",
      "note": "Transferência padrão processada em 1 a 2 dias úteis."
    },
    {
      "title": "Euro SEPA (Luxemburgo) - Shaheen Safi",
      "subtitle": "Transferência internacional SEPA Luxemburgo",
      "note": "Transferência bancária direta com IBAN internacional."
    }
  ]
},
  "ja": {
  "isRtl": false,
  "home": "ホーム",
  "heroBadge": "緊急教育支援 • 学ぶ権利を守る挑戦",
  "heroTitle1": "彼らは学校の扉を閉ざしました。",
  "heroTitle2": "私たちは宇宙の扉を開きます。",
  "heroDesc1": "アフガニスタンで140万人もの女性が学ぶ権利を奪われたとき、Safi Academy は沈黙を拒みました。強固に暗号化された分散型ネットワークを通じ、最先端のプログラミング教育を女性たちの自宅へ直接届けています。",
  "heroDesc2": "皆様のご寄付は単なる施しではなく、連帯と不屈の意志そのものです。全額がStarlink衛星通信、学習用ノートPC、そして国際メンターシップに直接充当されます。教育資金の100%が学生本人に届けられます。",
  "liveGoalLabel": "2026年 教育支援基金目標",
  "raisedOf": "達成額 / 目標額",
  "goal": "目標額",
  "fundedBadge": "完全公開台帳 • 100%学生直接配分",
  "boxTitle": "女子学生への直接奨学金支援",
  "boxSubtitle": "支援プランを選択するか、任意の寄付金額をご入力ください。",
  "customAmount": "自由設定の寄付額 ($ USD)",
  "dedicationLabel": "メッセージ・応援の言葉（任意）",
  "dedicationPlaceholder": "アフガニスタンの勇敢な女子学生への励ましの言葉...",
  "tabCard": "クレジットカード / デビットカード",
  "tabCardSub": "即時処理 • 銀行レベル暗号化 • 世界対応",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "直接決済 • ワンクリック",
  "tabBank": "海外銀行送金",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1か月間の高速インターネットとセキュアVPN",
      "tier": "レベル1：接続支援",
      "impact": "アフガニスタンの女子学生1名に1か月間の安全な高速インターネット接続を提供します。",
      "badge": "不可欠"
    },
    {
      "amount": 75,
      "label": "クラウド開発サーバーと学習環境",
      "tier": "レベル2：技術インフラ",
      "impact": "コーディング用クラウドサーバー、高度な教材、オフライン学習コンテンツを提供します。",
      "badge": "一番人気"
    },
    {
      "amount": 150,
      "label": "女子学生1名への全額奨学金",
      "tier": "レベル3：全額奨学金",
      "impact": "教育機会を奪われたアフガニスタンの女性1名にソフトウェア工学の1セメスター教育を提供します。",
      "badge": "絶大な効果"
    },
    {
      "amount": 500,
      "label": "女子学生へ開発用ノートPCの提供",
      "tier": "レベル4：ハードウェア支援",
      "impact": "アフガニスタンの女子学生1名にコーディング専用ノートPCとモバイルバッテリーを安全に提供します。",
      "badge": "人生を変える支援"
    },
    {
      "amount": 1200,
      "label": "1年間のエンジニア育成プログラム全額支援",
      "tier": "レベル5：年間フルパス",
      "impact": "1年間のソフトウェア工学研修、世界トップクラスの個別メンター指導、リモート就職支援をすべて提供します。",
      "badge": "年間特別奨学金"
    }
  ],
  "donateNowBtn": "安全な決済画面へ進む",
  "processingBtn": "暗号化ゲートウェイに接続中...",
  "cancelBtn": "キャンセル",
  "encryptedNotice": "256ビットTLS銀行基準暗号化 • カード情報の保持は一切行いません",
  "paypalTitle": "PayPal でお支払い",
  "paypalDesc": "寄付を承認するため、PayPalの安全な決済ページへ移動します。",
  "paypalError": "PayPalを起動できませんでした。カードまたは銀行送金をご利用ください。",
  "bankSelectLabel": "アカデミー公式受取口座を選択：",
  "bankVerifiedBadge": "認証済み欧米・国際パートナー銀行",
  "copyAllBtn": "すべての銀行情報をコピー",
  "allCopiedText": "すべての口座情報がクリップボードにコピーされました！",
  "copiedText": "コピー完了！",
  "beneficiaryLabel": "口座名義人",
  "ibanLabel": "IBANコード",
  "bicLabel": "BIC / SWIFTコード",
  "routingLabel": "ルーティング番号 (ACH / Wire)",
  "sortCodeLabel": "ソートコード (Sort Code)",
  "accountNumberLabel": "口座番号",
  "bankNameLabel": "銀行名",
  "bankAddressLabel": "銀行登録住所",
  "noticeLabel": "送金確認要件",
  "receiptHeader": "銀行送金明細書の登録",
  "receiptSub": "受領確認と公式領収書の発行のため、送金明細の控えをご提出ください。",
  "donorNameLabel": "ご寄付者様のお名前",
  "donorNamePlaceholder": "例：山田 太郎",
  "donorEmailLabel": "メールアドレス",
  "donorEmailPlaceholder": "例：yamada@example.jp",
  "transferAmountLabel": "送金額および通貨",
  "txIdLabel": "送金照会番号 / トランザクションID (UTR)",
  "txIdPlaceholder": "例：TXN-984210 または送金番号",
  "notesLabel": "応援メッセージまたは記念メモ",
  "submitReceiptBtn": "送金控えを送信",
  "submittingReceiptBtn": "確認・登録処理中...",
  "successReceiptTitle": "送金控えを受領いたしました！",
  "successReceiptDesc": "温かいご支援を心より感謝申し上げます。財務部門にて確認後、受領証をメールでお送りいたします。",
  "trackingRefLabel": "追跡照会番号：",
  "alertFillRequired": "お名前、メールアドレス、送金額をご入力ください。",
  "alertMinDonation": "最低寄付金額は1米ドルです。",
  "alertNetworkError": "通信エラーが発生しました。もう一度お試しください。",
  "alertSubmitFailed": "送金控えの送信に失敗しました。",
  "girlsEnrolled": "受講中の女子学生",
  "liveClassrooms": "ライブ授業数",
  "freeScholarships": "100%無料",
  "trustBadge1Title": "100% 直接支援",
  "trustBadge1Desc": "すべての寄付金がアフガニスタンの女性のためのPC、通信、学費に直接充てられます。",
  "trustBadge2Title": "軍事レベルの機密保護",
  "trustBadge2Desc": "学生の身元および所在地は極めて強固な暗号化によって厳重に保護されています。",
  "trustBadge3Title": "透明性と監査済み会計",
  "trustBadge3Desc": "随時更新される会計台帳、年次報告書の公開、学生の学習成果の可視化を徹底しています。",
  "storiesBadge": "カブール、ヘラート、マザーリシャリーフからの声",
  "storiesTitle": "閉ざされた教室、決して折れない意志",
  "storiesSub": "秘密のバーチャル教室でテクノロジーを学ぶ女子学生たちの真実の声。",
  "stories": [
    {
      "name": "ファティマ R.",
      "location": "アフガニスタン・カブール",
      "track": "フルスタック・ソフトウェア工学",
      "quote": "大学が閉鎖された時、私の未来は閉ざされたと思いました。Safi Academy が私に希望を取り戻してくれました。今ではクラウドアプリを開発し、近所の少女たちにコードを教えています。",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "ザフラ M.",
      "location": "アフガニスタン・ヘラート",
      "track": "Python & 機械学習",
      "quote": "皆様のご支援でいただいたノートPCとStarlink接続が私の人生を変えました。私はもう忘れられた存在ではありません。未来のAI研究者です。",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "マリアム K.",
      "location": "アフガニスタン・マザーリシャリーフ",
      "track": "UI/UX & プロダクトデザイン",
      "quote": "校舎に鍵をかけることはできても、学ぶ情熱を閉じ込めることは誰にもできません。私が書くコードの一行一行が、暗闇に対する勝利です。",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "財務の健全性とガバナンス",
  "transparencyTitle": "皆様のご寄付の使途について",
  "transparencySub": "徹底した透明性をお約束します。ご寄付の配分比率は以下の通りです。",
  "allocations": [
    {
      "percent": "50%",
      "title": "学生向けハードウェアとインターネット",
      "desc": "開発用ノートPCの購入、StarlinkおよびVPN回線、ソーラー充電器、安全な自宅学習環境の整備。"
    },
    {
      "percent": "30%",
      "title": "教育クラウドと学習基盤",
      "desc": "分散型サーバー運用、講義動画のオフライン同期システム、コード実行用サンドボックス環境。"
    },
    {
      "percent": "15%",
      "title": "国際メンターシップと就労支援",
      "desc": "海外の技術指導者への謝礼、技術英語の講習、およびグローバルなリモートワークへの推薦。"
    },
    {
      "percent": "5%",
      "title": "セキュリティ運用とリスク監視",
      "desc": "安全監査の実施、物資の秘密輸送、および受講生の個人情報の完全秘匿管理。"
    }
  ],
  "faqBadge": "よくあるご質問",
  "faqTitle": "教育支援基金についてのQ&A",
  "faqSub": "支援金の届け方、学生の安全確保、資金の透明性についてお答えします。",
  "faqs": [
    {
      "q": "寄付が確実に現地の女子学生に届く仕組みはどうなっていますか？",
      "a": "厳格な審査を経た現地の信頼できる支援者ネットワークを通じ、現地の当局を一切経由せず安全にPCや通信環境を直接手渡しています。"
    },
    {
      "q": "寄付手続きの安全性は確保されていますか？",
      "a": "はい。すべての決済は国際規格に準拠した最高水準の暗号化で行われ、欧米の公式金融機関口座にて厳正に管理されています。"
    },
    {
      "q": "特定の学生を個人的に支援することはできますか？",
      "a": "はい。レベル3以上をお選びの際に応援メッセージを添えていただくことで、特定の学生とマッチングし、個人を特定しない形で学習成果をご報告します。"
    },
    {
      "q": "利用できる支払い方法は何ですか？",
      "a": "各種国際クレジットカード、PayPal、米ドル (ACH)、ユーロ (SEPA)、英ポンド (BACS) の銀行送金に対応しています。"
    },
    {
      "q": "学生たちの身の安全はどのように守られていますか？",
      "a": "安全の確保が最優先事項です。学生たちは匿名のアカウントを使用し、カメラを起動することなく暗号化された安全な回線を通じて受講しています。"
    }
  ],
  "bottomCtaBadge": "歴史の正しい側に立つ選択",
  "bottomCtaTitle": "暗闇の中に、希望の光を灯してください。",
  "bottomCtaDesc": "世界中の篤志家やエンジニアと共に、アフガニスタンの女性たちに確かな未来を届けてみませんか。",
  "bottomCtaBtn": "今すぐ寄付する • 女子学生を支援する",
  "verifiedScholarship": "認定国際人道教育支援イニシアチブ",
  "bankAccounts": [
    {
      "title": "米ドル口座 (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "米国国内送金 / Wirex",
      "note": "最低入金額は1米ドルです。"
    },
    {
      "title": "ユーロ口座 SEPA (マルタ) - Shirin Gol Ahmadi",
      "subtitle": "欧州単一ユーロ決済圏 (SEPA)",
      "note": "EU/EEA圏内は送金手数料無料です。"
    },
    {
      "title": "英ポンド口座 (UK Faster Payments) - Shaheen Safi",
      "subtitle": "英国国内送金 / BACS",
      "note": "Faster Paymentsによる即時入金。"
    },
    {
      "title": "ユーロ口座 SEPA (マルタ) - Shaheen Safi",
      "subtitle": "欧州単一ユーロ決済圏 (SEPA)",
      "note": "通常1〜2営業日で着金します。"
    },
    {
      "title": "ユーロ口座 SEPA (ルクセンブルク) - Shaheen Safi",
      "subtitle": "SEPA ルクセンブルク国際送金",
      "note": "国際IBANによる直接送金に対応。"
    }
  ]
},
  "ko": {
  "isRtl": false,
  "home": "홈",
  "heroBadge": "긴급 교육 구호 • 배움의 권리를 향한 저항",
  "heroTitle1": "그들은 학교 문을 걸어 잠갔습니다.",
  "heroTitle2": "우리는 온 세상을 엽니다.",
  "heroDesc1": "아프가니스탄에서 140만 명의 여학생들이 배움의 권리를 박탈당했을 때, Safi Academy는 침묵하지 않았습니다. 안전한 분산형 네트워크와 암호화된 채널을 통해 코딩과 첨단 기술 교육을 학생들의 가정으로 직접 전달하고 있습니다.",
  "heroDesc2": "여러분의 후원은 단순한 자선이 아니라 연대이자 용기 있는 저항입니다. 모든 후원금은 스타링크 인터넷 연결, 보안 노트북, 아프간 여학생들을 위한 글로벌 멘토링에 100% 전액 지원됩니다.",
  "liveGoalLabel": "2026 교육 구호 기금 목표",
  "raisedOf": "모금액 / 목표액",
  "goal": "총 목표액",
  "fundedBadge": "투명 공개 장부 • 100% 학생 직접 배정",
  "boxTitle": "여학생 장학금 직접 후원",
  "boxSubtitle": "장학금 지원 등급을 선택하거나 원하시는 금액을 직접 입력하세요.",
  "customAmount": "직접 입력 후원금 ($ USD)",
  "dedicationLabel": "응원 메시지 / 헌정사 (선택 사항)",
  "dedicationPlaceholder": "용기 있는 아프간 여학생들을 위한 격려의 메시지...",
  "tabCard": "신용 / 체크카드",
  "tabCardSub": "즉시 완료 • 은행급 암호화 • 전 세계 지원",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "간편 결제 • 원클릭",
  "tabBank": "해외 은행 송금",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1개월 초고속 인터넷 및 보안 VPN 지원",
      "tier": "레벨 1: 연결성 지원",
      "impact": "아프가니스탄 여학생 1명에게 한 달간의 안전한 고속 인터넷과 VPN을 제공합니다.",
      "badge": "필수 지원"
    },
    {
      "amount": 75,
      "label": "클라우드 서버 및 개발 환경 지원",
      "tier": "레벨 2: 기술 인프라",
      "impact": "코딩용 클라우드 샌드박스 서버, 고급 커리큘럼 자료 및 오프라인 강의 다운로드를 지원합니다.",
      "badge": "가장 인기"
    },
    {
      "amount": 150,
      "label": "여학생 1인 전액 장학금 지원",
      "tier": "레벨 3: 전액 장학금",
      "impact": "교육을 받지 못하는 아프간 여학생 1명의 소프트웨어 엔지니어링 한 학기 교육을 전액 지원합니다.",
      "badge": "강력한 변화"
    },
    {
      "amount": 500,
      "label": "여학생에게 개발용 노트북 지원",
      "tier": "레벨 4: 하드웨어 지원",
      "impact": "아프가니스탄 여학생에게 코딩용 노트북과 대용량 보조배터리를 안전하게 구매 및 전달합니다.",
      "badge": "인생의 전환점"
    },
    {
      "amount": 1200,
      "label": "1년 과정 엔지니어링 전액 후원",
      "tier": "레벨 5: 1년 종합 후원",
      "impact": "1년간의 소프트웨어 엔지니어링 과정, 일대일 글로벌 멘토링 및 원격 근무 취업 연계를 전액 지원합니다.",
      "badge": "연간 종합 장학금"
    }
  ],
  "donateNowBtn": "안전한 결제 진행하기",
  "processingBtn": "암호화 결제 게이트웨이 연결 중...",
  "cancelBtn": "취소",
  "encryptedNotice": "256비트 TLS 은행 수준 암호화 • 카드 정보 미저장 원칙",
  "paypalTitle": "PayPal로 결제 완료",
  "paypalDesc": "후원을 승인하기 위해 안전한 PayPal 결제 페이지로 이동합니다.",
  "paypalError": "PayPal을 불러올 수 없습니다. 카드 또는 은행 송금을 이용해 주세요.",
  "bankSelectLabel": "아카데미 공식 수납 계좌 선택:",
  "bankVerifiedBadge": "검증된 유럽 및 국제 파트너 은행",
  "copyAllBtn": "모든 계좌 정보 복사",
  "allCopiedText": "모든 계좌 정보가 클립보드에 복사되었습니다!",
  "copiedText": "복사 완료!",
  "beneficiaryLabel": "예금주 (수취인 성명)",
  "ibanLabel": "국제 계좌번호 (IBAN)",
  "bicLabel": "SWIFT / BIC 코드",
  "routingLabel": "라우팅 번호 (ACH / Wire)",
  "sortCodeLabel": "소트 코드 (Sort Code)",
  "accountNumberLabel": "계좌 번호",
  "bankNameLabel": "은행명",
  "bankAddressLabel": "은행 공식 주소",
  "noticeLabel": "입금 확인 필수 사항",
  "receiptHeader": "은행 송금 영수증 제출",
  "receiptSub": "입금 내역을 등록해 주시면 재무팀에서 확인 후 공식 후원 확인서를 발급해 드립니다.",
  "donorNameLabel": "후원자 성명",
  "donorNamePlaceholder": "예: 김민수",
  "donorEmailLabel": "이메일 주소",
  "donorEmailPlaceholder": "예: minsu@example.kr",
  "transferAmountLabel": "송금 금액 및 통화",
  "txIdLabel": "거래 참조 번호 (UTR / 거래 ID)",
  "txIdPlaceholder": "예: TXN-984210 또는 송금 번호",
  "notesLabel": "응원 메시지 또는 메모",
  "submitReceiptBtn": "송금 영수증 제출",
  "submittingReceiptBtn": "영수증 확인 및 처리 중...",
  "successReceiptTitle": "송금 영수증이 등록되었습니다!",
  "successReceiptDesc": "따뜻한 마음에 진심으로 감사드립니다. 입금 내역 확인 후 확인 메일을 발송해 드리겠습니다.",
  "trackingRefLabel": "조회 번호:",
  "alertFillRequired": "성명, 이메일, 송금 금액을 모두 입력해 주세요.",
  "alertMinDonation": "최소 후원 금액은 1달러입니다.",
  "alertNetworkError": "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "alertSubmitFailed": "영수증 제출에 실패했습니다.",
  "girlsEnrolled": "등록된 여학생 수",
  "liveClassrooms": "실시간 강의실",
  "freeScholarships": "100% 전액 무료",
  "trustBadge1Title": "100% 직접 지원",
  "trustBadge1Desc": "모든 후원금은 아프가니스탄 여성들의 노트북, 인터넷, 교육에 전액 투입됩니다.",
  "trustBadge2Title": "철저한 프라이버시 보호",
  "trustBadge2Desc": "학생들의 신원과 위치는 군사 등급의 첨단 암호화 시스템으로 안전하게 보호됩니다.",
  "trustBadge3Title": "투명성과 감사 보고",
  "trustBadge3Desc": "실시간으로 갱신되는 재정 장부, 공인 연례 보고서 및 학생 성장 지표를 공개합니다.",
  "storiesBadge": "카불, 헤라트, 마자르이샤리프의 목소리",
  "storiesTitle": "억압 속에서도 피어나는 배움의 열정",
  "storiesSub": "비밀 가상 교실에서 소프트웨어를 배우고 있는 여학생들의 진솔한 고백.",
  "stories": [
    {
      "name": "파티마 R.",
      "location": "아프가니스탄 카불",
      "track": "풀스택 소프트웨어 엔지니어링",
      "quote": "대학 문이 닫혔을 때 제 인생의 빛이 영영 꺼진 줄 알았습니다. Safi Academy는 제게 미래를 돌려주었습니다. 지금 저는 클라우드 앱을 개발하고 이웃의 어린 소녀들에게 코딩을 가르칩니다.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "자흐라 M.",
      "location": "아프가니스탄 헤라트",
      "track": "파이썬 및 머신러닝",
      "quote": "여러분의 후원으로 지원받은 노트북과 스타링크 인터넷이 제 삶을 송두리째 바꿨습니다. 저는 이제 잊혀진 통계 속 숫자가 아니라 인공지능 연구원입니다.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "마리암 K.",
      "location": "아프가니스탄 마자르이샤리프",
      "track": "UI/UX 및 디지털 제품 디자인",
      "quote": "그들이 학교 건물에 자물쇠를 채울 수는 있어도 배움을 향한 우리의 갈망을 가둘 수는 없습니다. 제가 작성하는 코드 한 줄 한 줄이 어둠에 맞선 승리입니다.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "재정 건전성 및 운영 보고",
  "transparencyTitle": "후원금 1달러의 쓰임새",
  "transparencySub": "우리는 완벽한 투명성을 원칙으로 합니다. 후원금 배분 내역은 다음과 같습니다.",
  "allocations": [
    {
      "percent": "50%",
      "title": "학생 하드웨어 및 인터넷 연결",
      "desc": "코딩용 노트북, 스타링크 및 보안 VPN 패키지, 태양광 보조 배터리, 안전한 가정 학습 장비."
    },
    {
      "percent": "30%",
      "title": "교육 클라우드 및 강의 플랫폼",
      "desc": "분산형 서버 인프라, 오프라인 동영상 동기화 시스템, 클라우드 코드 실행 샌드박스."
    },
    {
      "percent": "15%",
      "title": "글로벌 멘토링 및 원격 취업 지원",
      "desc": "해외 기술 멘토 수당, 실무 기술 영어 교육 및 글로벌 원격 근무 채용 연계."
    },
    {
      "percent": "5%",
      "title": "보안 운영 및 위험 관리",
      "desc": "보안 감사, 안전한 장비 운송 및 학생 신원 보호를 위한 철저한 암호화 체계 유지."
    }
  ],
  "faqBadge": "자주 묻는 질문",
  "faqTitle": "교육 구호 기금 안내",
  "faqSub": "후원금 전달 방식, 학생 안전 대책, 재정 투명성에 대해 상세히 안내해 드립니다.",
  "faqs": [
    {
      "q": "후원금이 아프간 현지 여학생들에게 안전하게 전달되는 것을 어떻게 보장하나요?",
      "a": "철저히 검증된 현지 코디네이터 네트워크를 통해 어떠한 현지 정부 채널도 거치지 않고 노트북과 인터넷 이용권을 학생들에게 직접 안전하게 전달합니다."
    },
    {
      "q": "결제는 안전하게 처리되나요?",
      "a": "네, 모든 결제는 국제 금융 표준을 준수하는 공인 채널을 통해 처리되며 유럽과 미국의 공식 인가 계좌로 안전하게 입금됩니다."
    },
    {
      "q": "특정 학생을 지정하여 후원할 수 있나요?",
      "a": "네, 3단계 이상 후원 시 응원 메시지를 남겨주시면 특정 학생과 매칭하여 개인정보가 보호된 학습 성과 보고서를 전달해 드립니다."
    },
    {
      "q": "어떤 결제 수단을 지원하나요?",
      "a": "국제 신용카드, PayPal, 달러 (ACH), 유로 (SEPA), 파운드 (BACS) 해외 송금을 지원합니다."
    },
    {
      "q": "학생들의 신변은 어떻게 보호되나요?",
      "a": "학생 안전이 최우선입니다. 가명으로 활동하며 카메라를 켜지 않고 최고 수준의 보안 암호화 채널을 통해서만 수업에 참여합니다."
    }
  ],
  "bottomCtaBadge": "역사의 올바른 편에 서십시오",
  "bottomCtaTitle": "가장 어두운 순간에 희망의 등불을 밝혀주세요.",
  "bottomCtaDesc": "아프가니스탄 여성들의 배움을 지키기 위해 전 세계 수백 명의 후원자들과 함께해 주세요.",
  "bottomCtaBtn": "지금 후원하기 • 학생에게 날개 달아주기",
  "verifiedScholarship": "공식 인증 글로벌 비영리 학술 구호 이니셔티브",
  "bankAccounts": [
    {
      "title": "미국 달러 (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "미국 국내 계좌 이체 / Wirex",
      "note": "최소 입금액은 1달러입니다."
    },
    {
      "title": "유로 SEPA (몰타) - Shirin Gol Ahmadi",
      "subtitle": "유럽 단일 유로 결제 지역 (SEPA)",
      "note": "EU/EEA 전역 송금 수수료 면제."
    },
    {
      "title": "영국 파운드 (UK Faster Payments) - Shaheen Safi",
      "subtitle": "영국 국내 빠른 송금 / BACS",
      "note": "Faster Payments를 통한 즉시 입금."
    },
    {
      "title": "유로 SEPA (몰타) - Shaheen Safi",
      "subtitle": "유럽 단일 유로 결제 지역 (SEPA)",
      "note": "영업일 기준 1~2일 내 표준 이체."
    },
    {
      "title": "유로 SEPA (룩셈부르크) - Shaheen Safi",
      "subtitle": "SEPA 룩셈부르크 국제 계좌 이체",
      "note": "국제 IBAN 번호를 통한 직접 이체."
    }
  ]
},
  "nl": {
  "isRtl": false,
  "home": "Home",
  "heroBadge": "Noodhulp voor Onderwijs • Weerstand tegen het Verbod",
  "heroTitle1": "Ze sloten de schooldeuren.",
  "heroTitle2": "Wij openen het universum.",
  "heroDesc1": "Toen 1,4 miljoen Afghaanse meisjes en jonge vrouwen het recht op onderwijs werd ontnomen, weigerde Safi Academy toe te kijken. Via beveiligde gedecentraliseerde netwerken en versleutelde kanalen brengen wij IT- en programmeeronderwijs direct bij hen thuis.",
  "heroDesc2": "Uw gift is geen aalmoes: het is verzet, solidariteit en daadwerkelijke zelfbeschikking. Elke cent financiert rechtstreeks Starlink-verbindingen, veilige laptops en internationale mentoren voor moedige Afghaanse studentes. 100% van de fondsen gaat rechtstreeks naar de studentes.",
  "liveGoalLabel": "Onderwijshulpdoel voor 2026",
  "raisedOf": "Ingezameld van",
  "goal": "Totaal doel",
  "fundedBadge": "Transparant grootboek • 100% toewijzing aan studenten",
  "boxTitle": "Directe studiebeursfinanciering",
  "boxSubtitle": "Kies een donatieniveau of voer een gewenst bedrag in.",
  "customAmount": "Aangepast donatiebedrag ($ USD)",
  "dedicationLabel": "Opdracht of bemoedigende boodschap (Optioneel)",
  "dedicationPlaceholder": "Ter ere van, ter nagedachtenis aan of een bemoedigend woord voor de studentes...",
  "tabCard": "Credit- / Debetkaart",
  "tabCardSub": "Direct • Versleuteld • Wereldwijd",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Direct • Betalen met 1 klik",
  "tabBank": "Directe bankoverschrijving",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 maand snel internet en beveiligde VPN",
      "tier": "Niveau 1: Connectiviteit",
      "impact": "Biedt 1 maand snelle internetverbinding en beveiligde VPN voor een vrouwelijke student in Afghanistan.",
      "badge": "Essentieel"
    },
    {
      "amount": 75,
      "label": "Cloudservers en ontwikkelomgeving",
      "tier": "Niveau 2: Infrastructuur",
      "impact": "Financiert cloudservers voor programmeren, geavanceerd lesmateriaal en offline videolessen.",
      "badge": "Meest gekozen"
    },
    {
      "amount": 150,
      "label": "Volledige beurs voor één student",
      "tier": "Niveau 3: Volledige studiebeurs",
      "impact": "Financiert rechtstreeks een volledig semester software engineering voor een kansarme vrouwelijke student.",
      "badge": "Grote impact"
    },
    {
      "amount": 500,
      "label": "Rust een student uit met een laptop",
      "tier": "Niveau 4: Hardware",
      "impact": "Levert een veilige programmeerlaptop en powerbank rechtstreeks aan een vrouwelijke student in Afghanistan.",
      "badge": "Levensveranderend"
    },
    {
      "amount": 1200,
      "label": "Sponsor een volledig jaartraject",
      "tier": "Niveau 5: Volledig jaartraject",
      "impact": "Dekt een heel jaar ingenieursopleiding, 1-op-1 internationale mentoring en ondersteuning bij het vinden van een remote baan.",
      "badge": "Volledige jaarbeurs"
    }
  ],
  "donateNowBtn": "Doorgaan naar veilige betaling",
  "processingBtn": "Verbinding maken met beveiligde betaalomgeving...",
  "cancelBtn": "Annuleren",
  "encryptedNotice": "256-bit TLS bankversleuteling • Geen opslag van kaartgegevens",
  "paypalTitle": "Afronden via PayPal",
  "paypalDesc": "U wordt doorgestuurd naar de beveiligde omgeving van PayPal om uw donatie te bevestigen.",
  "paypalError": "Kan PayPal niet laden. Probeer betaling met kaart of bankoverschrijving.",
  "bankSelectLabel": "Selecteer de officiële bankrekening van de Academie:",
  "bankVerifiedBadge": "Geverifieerde internationale bankpartners",
  "copyAllBtn": "Kopieer alle bankgegevens",
  "allCopiedText": "Alle bankgegevens gekopieerd naar klembord!",
  "copiedText": "Gekopieerd!",
  "beneficiaryLabel": "Begunstigde (Rekeninghouder)",
  "ibanLabel": "IBAN",
  "bicLabel": "BIC / SWIFT-code",
  "routingLabel": "Routingnummer (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Rekeningnummer",
  "bankNameLabel": "Financiële instelling",
  "bankAddressLabel": "Geregistreerd adres bank",
  "noticeLabel": "Voorwaarde voor bevestiging overschrijving",
  "receiptHeader": "Overboekingsbewijs registreren",
  "receiptSub": "Upload uw betalingsbewijs zodat onze financiële afdeling uw donatie kan registreren en een officieel certificaat kan sturen.",
  "donorNameLabel": "Volledige naam donateur",
  "donorNamePlaceholder": "bijv. Daan van Dijk",
  "donorEmailLabel": "Uw e-mailadres",
  "donorEmailPlaceholder": "bijv. daan@example.nl",
  "transferAmountLabel": "Overgemaakt bedrag en valuta",
  "txIdLabel": "Transactiereferentie / UTR",
  "txIdPlaceholder": "bijv. TXN-984210 of bankreferentie",
  "notesLabel": "Persoonlijke boodschap of toewijding",
  "submitReceiptBtn": "Overboekingsbewijs verzenden",
  "submittingReceiptBtn": "Bezig met verifiëren en vastleggen...",
  "successReceiptTitle": "Bewijs succesvol geregistreerd!",
  "successReceiptDesc": "Hartelijk dank voor uw solidariteit. Onze financiële afdeling zal de bijschrijving controleren en een officiële bevestiging mailen.",
  "trackingRefLabel": "Referentienummer:",
  "alertFillRequired": "Vul uw naam, e-mail en het overgemaakte bedrag in.",
  "alertMinDonation": "Minimale donatie bedraagt 1 $ USD.",
  "alertNetworkError": "Netwerkfout. Probeer het opnieuw of neem contact op.",
  "alertSubmitFailed": "Verzenden van overboekingsbewijs mislukt.",
  "girlsEnrolled": "Ingeschreven studentes",
  "liveClassrooms": "Live klaslokalen",
  "freeScholarships": "100% Kosteloos",
  "trustBadge1Title": "100% Directe impact",
  "trustBadge1Desc": "Alle giften gaan direct naar hardware, internet en onderwijs voor Afghaanse vrouwen.",
  "trustBadge2Title": "Volledige privacy en anonimiteit",
  "trustBadge2Desc": "Identiteit en locatie van studentes worden beveiligd met encryptie van militair niveau.",
  "trustBadge3Title": "Transparant en controleerbaar",
  "trustBadge3Desc": "Doorlopend bijgewerkte jaarverslagen en controleerbare mijlpalen van de studentes.",
  "storiesBadge": "Verhalen uit Kabul, Herat en Mazar-i-Sharif",
  "storiesTitle": "Onderwijs onder belegering, onbreekbare moed",
  "storiesSub": "Echte getuigenissen van onze studentes die in het geheim coderen en studeren.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afghanistan",
      "track": "Full-Stack Software Engineering",
      "quote": "Toen de universiteiten dichtgingen, dacht ik dat mijn toekomst voorgoed voorbij was. Safi Academy gaf mij mijn hoop terug. Nu bouw ik cloudtoepassingen en geef ik les aan jongere meisjes in mijn wijk.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afghanistan",
      "track": "Python & Kunstmatige Intelligentie",
      "quote": "De laptop en het Starlink-pakket die ik via uw steun ontving, hebben mijn bestaan veranderd. Ik ben geen stil cijfer meer, maar een beginnend AI-onderzoeker.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-i-Sharif, Afghanistan",
      "track": "UI/UX & Productontwerp",
      "quote": "Ze kunnen schoolgebouwen met kettingen afsluiten, maar onze leergierigheid sluiten ze nooit op. Elke regel code die ik schrijf, is een overwinning op de duisternis.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Financiële integriteit en toezicht",
  "transparencyTitle": "Waar elke gedoneerde euro terechtkomt",
  "transparencySub": "Wij staan voor radicale transparantie. Zo worden de gelden precies besteed.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Hardware en internet voor studentes",
      "desc": "Laptops voor softwareontwikkeling, Starlink- en VPN-pakketten, zonnepanelen en veilig thuismateriaal."
    },
    {
      "percent": "30%",
      "title": "Cloud-infrastructuur en leerplatform",
      "desc": "Gedecentraliseerde servers, offline synchronisatie van videolessen en cloudomgevingen voor code."
    },
    {
      "percent": "15%",
      "title": "Internationale mentoren en remote banen",
      "desc": "Vergoedingen voor buitenlandse mentoren, technisch Engels en bemiddeling naar banen op afstand."
    },
    {
      "percent": "5%",
      "title": "Operationele veiligheid en risicobeheer",
      "desc": "Veiligheidsaudits, beschermde toelevering en strikte geheimhouding van de studentgegevens."
    }
  ],
  "faqBadge": "Veelgestelde vragen",
  "faqTitle": "Alles over ons onderwijsfonds",
  "faqSub": "Informatie over fondsenwerving, studentenveiligheid en verantwoording.",
  "faqs": [
    {
      "q": "Hoe weet u zeker dat de hulp veilig aankomt bij de studentes in Afghanistan?",
      "a": "Wij werken via een betrouwbaar gedecentraliseerd lokaal netwerk dat apparatuur en tegoeden rechtstreeks uitreikt, zonder enige betrokkenheid van de machthebbers."
    },
    {
      "q": "Is mijn donatie veilig en traceerbaar?",
      "a": "Jazeker, alle transacties worden afgehandeld via beveiligde internationale betaalkanalen en gestort op erkende rekeningen in Europa en de VS."
    },
    {
      "q": "Kan ik een specifieke studente adopteren?",
      "a": "Ja, vanaf niveau 3 kunt u een speciale vermelding toevoegen. Wij koppelen uw bijdrage aan een studente en delen anoniem haar studievoortgang."
    },
    {
      "q": "Welke betaalmethoden worden ondersteund?",
      "a": "Alle grote creditcards, PayPal en directe bankoverschrijvingen in dollars (ACH), euro's (SEPA) en Britse ponden (BACS)."
    },
    {
      "q": "Hoe worden de studentes beschermd tegen represailles?",
      "a": "Hun veiligheid staat voorop. De lessen vinden plaats onder pseudoniemen via sterk versleutelde verbindingen, zonder cameraverplichting."
    }
  ],
  "bottomCtaBadge": "Sta aan de juiste kant van de geschiedenis",
  "bottomCtaTitle": "Steek een baken van hoop aan in de donkerste tijden.",
  "bottomCtaDesc": "Sluit u aan bij honderden weldoeners wereldwijd en geef de vrouwen van Afghanistan een eerlijke kans.",
  "bottomCtaBtn": "Doneer nu • Steun een studente",
  "verifiedScholarship": "Geverifieerd internationaal humanitair onderwijsinitiatief",
  "bankAccounts": [
    {
      "title": "Amerikaanse dollar (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Binnenlandse bankoverschrijving VS / Wirex",
      "note": "Minimale storting is 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Europese Single Euro Payments Area (SEPA)",
      "note": "Geen overboekingskosten binnen de hele EU/EER."
    },
    {
      "title": "Brits pond (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Binnenlandse overboeking VK / BACS",
      "note": "Directe verrekening via Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Europese Single Euro Payments Area (SEPA)",
      "note": "Standaard overboeking binnen 1-2 werkdagen."
    },
    {
      "title": "Euro SEPA (Luxemburg) - Shaheen Safi",
      "subtitle": "SEPA Grensoverschrijdende overboeking Luxemburg",
      "note": "Directe overboeking via internationaal IBAN."
    }
  ]
},
  "uz": {
  "isRtl": false,
  "home": "Bosh sahifa",
  "heroBadge": "Favqulodda ta'limiy yordam • Taqiqlarga qarshi qat'iyat",
  "heroTitle1": "Ular maktab eshiklarini qulfladilar.",
  "heroTitle2": "Biz esa butun olamni ochmoqdamiz.",
  "heroDesc1": "Afg'onistonda 1,4 million qiz va ayol fundamental ta'lim olish huquqidan mahrum etilganda, Safi Academy jim qarab turmadi. Xavfsiz markazlashmagan tarmoqlar va shifrlangan kanallar orqali biz dasturlash va texnologiya ta'limini to'g'ridan-to'g'ri ularning uylariga yetkazmoqdamiz.",
  "heroDesc2": "Sizning xayriyangiz shunchaki sadaqa emas — bu birdamlik, matonat va ozodlik ramzidir. Har bir sent to'g'ridan-to'g'ri Starlink interneti, xavfsiz noutbuklar va xalqaro ustozlarga yo'naltiriladi. Mablag'ning 100% qismi bevosita talaba qizlarga yetib boradi.",
  "liveGoalLabel": "2026-yil Ta'lim Yordam Jamg'armasi Maqsadi",
  "raisedOf": "Yig'ilgan mablag'",
  "goal": "Umumiy maqsad",
  "fundedBadge": "Shaffof hisob kitobi • 100% talabalarga ajratilgan",
  "boxTitle": "Talaba qizlar uchun to'g'ridan-to'g'ri stipendiya",
  "boxSubtitle": "Yordam darajasini tanlang yoki o'zingiz istagan summani kiriting.",
  "customAmount": "Ixtiyoriy yordam summasi ($ USD)",
  "dedicationLabel": "Maxsus tilak yoki bag'ishlov (Ixtiyoriy)",
  "dedicationPlaceholder": "Talaba qizlarga dalda bo'luvchi so'zlar yoki tilaklar...",
  "tabCard": "Xalqaro bank kartasi",
  "tabCardSub": "Tezkor • Himoyalangan • Global",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Bir bosishda to'g'ridan-to'g'ri to'lov",
  "tabBank": "To'g'ridan-to'g'ri bank o'tkazmasi",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 oylik tezkor internet va xavfsiz VPN",
      "tier": "1-daraja: Aloqa ta'minoti",
      "impact": "Afg'onistondagi talaba qiz uchun 1 oylik xavfsiz va tezkor internet aloqasini ta'minlaydi.",
      "badge": "Muhim yordam"
    },
    {
      "amount": 75,
      "label": "Bulut serveri va dasturlash muhiti",
      "tier": "2-daraja: Texnik infratuzilma",
      "impact": "Dasturlash uchun bulutli serverlar, ilg'or o'quv materiallari va oflayn darslarni moliyalashtiradi.",
      "badge": "Eng ommabop"
    },
    {
      "amount": 150,
      "label": "Bir talaba qiz uchun to'liq stipendiya",
      "tier": "3-daraja: To'liq stipendiya",
      "impact": "Afg'onistondagi talaba qizning dasturiy injiniring bo'yicha bir semestrlik to'liq o'qish xarajatlarini qoplaydi.",
      "badge": "Katta ta'sir"
    },
    {
      "amount": 500,
      "label": "Talaba qizni noutbuk bilan ta'minlash",
      "tier": "4-daraja: Texnik vositalar",
      "impact": "Afg'onistondagi talaba qizga dasturlash uchun ishonchli noutbuk va quvvatlantiruvchi qurilma taqdim etadi.",
      "badge": "Taqdirni o'zgartiruvchi"
    },
    {
      "amount": 1200,
      "label": "To'liq yillik o'quv dasturi homiyligi",
      "tier": "5-daraja: Yillik to'liq dastur",
      "impact": "Bir yillik dasturiy injiniring ta'limi, yakkama-yakka xalqaro ustozlik va masofaviy ishga joylashishni qoplaydi.",
      "badge": "Yillik maxsus grant"
    }
  ],
  "donateNowBtn": "Xavfsiz to'lovga o'tish",
  "processingBtn": "Shifrlangan to'lov tizimiga ulanmoqda...",
  "cancelBtn": "Bekor qilish",
  "encryptedNotice": "256-bitli TLS bank xavfsizligi • Karta ma'lumotlari saqlanmaydi",
  "paypalTitle": "PayPal orqali to'lov",
  "paypalDesc": "Xayriyani tasdiqlash uchun xavfsiz PayPal sahifasiga yo'naltirilasiz.",
  "paypalError": "PayPal tizimi ochilmadi. Iltimos, karta yoki bank o'tkazmasidan foydalaning.",
  "bankSelectLabel": "Akademiya rasmiy bank hisobini tanlang:",
  "bankVerifiedBadge": "Tasdiqlangan xalqaro bank hamkorlari",
  "copyAllBtn": "Barcha bank ma'lumotlarini nusxalash",
  "allCopiedText": "Barcha bank ma'lumotlari nusxalandi!",
  "copiedText": "Nusxalandi!",
  "beneficiaryLabel": "Qabul qiluvchi (Hisob egasi)",
  "ibanLabel": "Xalqaro IBAN hisob raqami",
  "bicLabel": "SWIFT / BIC kodi",
  "routingLabel": "Routing raqami (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Hisob raqami",
  "bankNameLabel": "Bank nomi",
  "bankAddressLabel": "Bank yuridik manzili",
  "noticeLabel": "Hisobni tasdiqlash sharti",
  "receiptHeader": "Bank to'lov chekini yuborish",
  "receiptSub": "Moliya guruhimiz to'lovni tasdiqlashi va rasmiy guvohnoma yuborishi uchun chekni yuklang.",
  "donorNameLabel": "Xayriya qiluvchining to'liq ismi",
  "donorNamePlaceholder": "masalan: Sardor Aliyev",
  "donorEmailLabel": "Elektron pochta manzilingiz",
  "donorEmailPlaceholder": "masalan: sardor@example.uz",
  "transferAmountLabel": "O'tkazilgan summa va valyuta",
  "txIdLabel": "Tranzaksiya raqami / UTR",
  "txIdPlaceholder": "masalan: TXN-984210 yoki to'lov raqami",
  "notesLabel": "Qo'shimcha tilak yoki xabar",
  "submitReceiptBtn": "To'lov chekini yuborish",
  "submittingReceiptBtn": "Chek tekshirilmoqda va yozilmoqda...",
  "successReceiptTitle": "To'lov cheki muvaffaqiyatli qabul qilindi!",
  "successReceiptDesc": "Saxovatingiz uchun minnatdorchilik bildiramiz. Moliya bo'limimiz to'lovni tasdiqlab, rasmiy xat yuboradi.",
  "trackingRefLabel": "Kuzatuv raqami:",
  "alertFillRequired": "Iltimos, ismingiz, emailingiz va summani kiriting.",
  "alertMinDonation": "Minimal xayriya summasi 1 $ USD.",
  "alertNetworkError": "Tarmoq xatosi. Iltimos, qaytadan urinib ko'ring.",
  "alertSubmitFailed": "To'lov chekini yuborishda xatolik yuz berdi.",
  "girlsEnrolled": "Ta'lim olayotgan qizlar",
  "liveClassrooms": "Jonli dars xonalari",
  "freeScholarships": "100% Bepul",
  "trustBadge1Title": "100% To'g'ridan-to'g'ri ta'sir",
  "trustBadge1Desc": "Barcha yordamlar bevosita afg'on qizlarining noutbuklari, interneti va o'qishiga sarflanadi.",
  "trustBadge2Title": "Mutlaq maxfiylik va himoya",
  "trustBadge2Desc": "Talabalarning shaxsi va turgan joyi yuqori darajadagi shifrlash vositalari bilan himoyalanadi.",
  "trustBadge3Title": "Shaffoflik va hisobdorlik",
  "trustBadge3Desc": "Muntazam yangilanib turuvchi ochiq hisob kitobi va o'quvchilar yutuqlari hisoboti.",
  "storiesBadge": "Kobul, Hirot va Mozori Sharifdan ovozlar",
  "storiesTitle": "Qamal ostidagi ta'lim, sinmas iroda",
  "storiesSub": "Yashirin onlayn sinflarda dasturlashni o'rganayotgan qizlarimizning samimiy so'zlari.",
  "stories": [
    {
      "name": "Fotima R.",
      "location": "Kobul, Afg'oniston",
      "track": "Full-Stack dasturiy injiniring",
      "quote": "Universitetlar yopilganda, hayotim butunlay so'ndi deb o'ylagandim. Safi Academy menga umid berdi. Bugun men bulutli dasturlar yaratmoqdaman va mahallamizdagi kichik qizlarga dars bermoqdaman.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahro M.",
      "location": "Hirot, Afg'oniston",
      "track": "Python va Sun'iy intellekt",
      "quote": "Sizning yordamingiz tufayli olgan noutbukim va Starlink interneti hayotimni o'zgartirdi. Men endi unutilgan statistika emasman; men sun'iy intellekt tadqiqotchisiman.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mozori Sharif, Afg'oniston",
      "track": "UI/UX va Raqamli mahsulot dizayni",
      "quote": "Ular maktab binolariga qulf osishlari mumkin, lekin o'rganishga bo'lgan ishtiyoqimizni qamay olmaydilar. Men yozgan har bir kod qorong'ulik ustidan g'alabadir.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Moliyaviy halollik va nazorat",
  "transparencyTitle": "Xayriya qilingan har bir dollar qayerga yo'naltiriladi?",
  "transparencySub": "Biz to'liq shaffoflikka rioya qilamiz. Mablag'larning taqsimlanishi quyidagicha.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Talabalar uchun noutbuk va internet",
      "desc": "Dasturlash noutbuklari, Starlink va VPN to'plamlari, quyosh quvvatlagichlari va uy o'quv jihozlari."
    },
    {
      "percent": "30%",
      "title": "Bulutli infratuzilma va o'quv platformasi",
      "desc": "Markazlashmagan serverlar, dars videolarini oflayn yuklab olish tizimi va kod sinov muhitlari."
    },
    {
      "percent": "15%",
      "title": "Xalqaro ustozlar va masofaviy ish o'rinlari",
      "desc": "Xorijiy ustozlar maoshi, texnik ingliz tili darslari va masofaviy ishlarga yo'naltirish."
    },
    {
      "percent": "5%",
      "title": "Xavfsizlik amaliyotlari va xavf nazorati",
      "desc": "Xavfsizlik tekshiruvlari, xavfsiz yetkazib berish va talabalar shaxsini mutlaq sir saqlash."
    }
  ],
  "faqBadge": "Ko'p beriladigan savollar",
  "faqTitle": "Yordam jamg'armasi haqida ma'lumot",
  "faqSub": "Yordam yetkazish, talabalar xavfsizligi va hisobdorlik bo'yicha javoblar.",
  "faqs": [
    {
      "q": "Yordam Afg'onistondagi talaba qizlarga yetib borishiga qanday kafolat berasiz?",
      "a": "Biz ishonchli mahalliy koordinatorlar tarmog'i orqali hech qanday hukumat idoralarisiz noutbuk va internetni to'g'ridan-to'g'ri topshiramiz."
    },
    {
      "q": "Mening to'lovim xavfsizmi?",
      "a": "Ha, barcha to'lovlar xalqaro bank xavfsizligi talablariga mos ravishda Yevropa va AQShdagi rasmiy hisoblarga tushadi."
    },
    {
      "q": "Aniq bir talaba qizni homiylikka olishim mumkinmi?",
      "a": "Ha, 3-darajadan boshlab tilak yozishingiz mumkin va biz sizga o'sha talabaning o'qish natijalari hisobotini anonim tarzda yuboramiz."
    },
    {
      "q": "Qaysi to'lov usullari qabul qilinadi?",
      "a": "Xalqaro bank kartalari, PayPal hamda dollar (ACH), yevro (SEPA) va funt (BACS) to'g'ridan-to'g'ri bank o'tkazmalari."
    },
    {
      "q": "Talabalarning xavfsizligi qanday ta'minlanadi?",
      "a": "Xavfsizlik bizning bosh maqsadimizdir. Qizlar darslarda taxalluslar ostida, kamerasiz va kuchli shifrlangan tarmoqlar orqali qatnashadilar."
    }
  ],
  "bottomCtaBadge": "Tarixning to'g'ri tomonida turing",
  "bottomCtaTitle": "Zulmat ichra umid chirog'ini yoqing.",
  "bottomCtaDesc": "Afg'on ayollariga kelajak berish uchun butun dunyodagi yuzlab saxovatpeshalarga qo'shiling.",
  "bottomCtaBtn": "Hozir xayriya qilish • Qizlarga umid bag'ishlash",
  "verifiedScholarship": "Tasdiqlangan xalqaro notijorat ta'limiy yordam tashabbusi",
  "bankAccounts": [
    {
      "title": "AQSh dollari (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "AQSh ichki to'g'ridan-to'g'ri bank o'tkazmasi / Wirex",
      "note": "Minimal depozit 1 $."
    },
    {
      "title": "Yevro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Yevropa Yagona To'lov Hududi (SEPA)",
      "note": "Butun Yevropa Ittifoqida 0% komissiya."
    },
    {
      "title": "Buyuk Britaniya Funti (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Buyuk Britaniya ichki tezkor o'tkazmasi / BACS",
      "note": "Faster Payments orqali bir zumda tushadi."
    },
    {
      "title": "Yevro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Yevropa Yagona To'lov Hududi (SEPA)",
      "note": "Standart bank o'tkazmasi 1-2 ish kunida bajariladi."
    },
    {
      "title": "Yevro SEPA (Lyuksemburg) - Shaheen Safi",
      "subtitle": "Lyuksemburg SEPA chegaralararo o'tkazmasi",
      "note": "Xalqaro IBAN orqali to'g'ridan-to'g'ri o'tkazma."
    }
  ]
},
  "id": {
  "isRtl": false,
  "home": "Beranda",
  "heroBadge": "Bantuan Pendidikan Darurat • Menentang Pelarangan",
  "heroTitle1": "Mereka mengunci gerbang sekolah.",
  "heroTitle2": "Kami membuka gerbang semesta.",
  "heroDesc1": "Ketika 1,4 juta anak perempuan dan wanita muda di Afghanistan dirampas hak dasarnya untuk belajar, Safi Academy menolak untuk berdiam diri. Melalui jaringan terdesentralisasi yang aman dan jalur terenkripsi, kami menghadirkan pendidikan coding dan teknologi mutakhir langsung ke rumah mereka.",
  "heroDesc2": "Kontribusi Anda bukan sekadar amal — ini adalah bentuk perlawanan, solidaritas, dan pemberdayaan nyata. Setiap sen secara langsung mendanai konektivitas Starlink, laptop yang aman, dan bimbingan mentor global bagi mahasiswi Afghanistan. 100% dana pendidikan langsung dialokasikan untuk para siswi.",
  "liveGoalLabel": "Target Dana Bantuan Pendidikan 2026",
  "raisedOf": "Terkumpul dari",
  "goal": "Target Total",
  "fundedBadge": "Buku Kas Transparan • 100% Dialokasikan Langsung ke Siswi",
  "boxTitle": "Sponsori Beasiswa Siswi Secara Langsung",
  "boxSubtitle": "Pilih tingkatan beasiswa atau masukkan jumlah donasi kustom Anda.",
  "customAmount": "Jumlah Donasi Kustom ($ USD)",
  "dedicationLabel": "Pesan Dedikasi atau Dukungan (Opsional)",
  "dedicationPlaceholder": "Kata-kata penyemangat untuk siswi perempuan yang berani...",
  "tabCard": "Kartu Debit / Kredit",
  "tabCardSub": "Instan • Terenkripsi • Global",
  "tabPaypal": "PayPal",
  "tabPaypalSub": "Langsung • Pembayaran 1 Klik",
  "tabBank": "Transfer Bank Langsung",
  "tabBankSub": "SEPA • ACH • BACS • Swift",
  "tiers": [
    {
      "amount": 25,
      "label": "1 Bulan Akses Internet Berkecepatan Tinggi & VPN Aman",
      "tier": "Tingkat 1: Akses Konektivitas",
      "impact": "Menyediakan 1 bulan akses internet aman dan VPN berkecepatan tinggi bagi seorang siswi di Afghanistan.",
      "badge": "Sangat Penting"
    },
    {
      "amount": 75,
      "label": "Server Cloud & Lingkungan Pengembangan",
      "tier": "Tingkat 2: Infrastruktur",
      "impact": "Mendukung server cloud untuk coding, kurikulum tingkat lanjut, dan pengunduhan materi offline.",
      "badge": "Paling Populer"
    },
    {
      "amount": 150,
      "label": "Beasiswa Penuh untuk Satu Mahasiswi",
      "tier": "Tingkat 3: Beasiswa Penuh",
      "impact": "Mendanai langsung satu semester penuh pendidikan rekayasa perangkat lunak bagi mahasiswi di Afghanistan.",
      "badge": "Dampak Nyata"
    },
    {
      "amount": 500,
      "label": "Membekali Mahasiswi dengan Laptop",
      "tier": "Tingkat 4: Perangkat Keras",
      "impact": "Membeli dan mengirimkan laptop khusus pemrograman serta power bank secara aman kepada seorang siswi.",
      "badge": "Mengubah Hidup"
    },
    {
      "amount": 1200,
      "label": "Sponsori Jalur Pendidikan Satu Tahun Penuh",
      "tier": "Tingkat 5: Jalur Satu Tahun Penuh",
      "impact": "Mendanai satu tahun penuh pendidikan rekayasa perangkat lunak, bimbingan 1-on-1 tingkat global, dan dukungan kerja jarak jauh.",
      "badge": "Beasiswa Tahunan Penuh"
    }
  ],
  "donateNowBtn": "Lanjutkan ke Pembayaran Aman",
  "processingBtn": "Menghubungkan ke gateway aman...",
  "cancelBtn": "Batal",
  "encryptedNotice": "Enkripsi TLS 256-Bit Standar Perbankan • Kami tidak menyimpan data kartu Anda",
  "paypalTitle": "Selesaikan dengan PayPal",
  "paypalDesc": "Anda akan diarahkan ke portal aman PayPal untuk mengonfirmasi donasi Anda.",
  "paypalError": "Gagal memuat PayPal. Silakan gunakan kartu atau transfer bank langsung.",
  "bankSelectLabel": "Pilih Rekening Bank Resmi Akademi:",
  "bankVerifiedBadge": "Mitra Perbankan Internasional Terverifikasi",
  "copyAllBtn": "Salin Semua Detail Bank",
  "allCopiedText": "Semua detail rekening berhasil disalin!",
  "copiedText": "Tersalin!",
  "beneficiaryLabel": "Nama Penerima (Pemilik Rekening)",
  "ibanLabel": "Nomor IBAN",
  "bicLabel": "Kode BIC / SWIFT",
  "routingLabel": "Routing Number (ACH / Wire)",
  "sortCodeLabel": "Sort Code",
  "accountNumberLabel": "Nomor Rekening",
  "bankNameLabel": "Nama Bank",
  "bankAddressLabel": "Alamat Terdaftar Bank",
  "noticeLabel": "Ketentuan Konfirmasi Setoran",
  "receiptHeader": "Kirim Bukti Transfer Bank",
  "receiptSub": "Unggah bukti transfer Anda agar tim keuangan kami dapat memvalidasi dan mengirimkan tanda terima resmi.",
  "donorNameLabel": "Nama Lengkap Donatur",
  "donorNamePlaceholder": "cth. Budi Pratama",
  "donorEmailLabel": "Alamat Email Anda",
  "donorEmailPlaceholder": "cth. budi@example.id",
  "transferAmountLabel": "Jumlah yang Ditransfer dan Mata Uang",
  "txIdLabel": "Nomor Referensi Transaksi (UTR)",
  "txIdPlaceholder": "cth. TXN-984210 atau nomor referensi bank",
  "notesLabel": "Pesan Dedikasi atau Dukungan",
  "submitReceiptBtn": "Kirim Bukti Transfer",
  "submittingReceiptBtn": "Memverifikasi dan Merekam...",
  "successReceiptTitle": "Bukti Transfer Berhasil Dikirim!",
  "successReceiptDesc": "Terima kasih banyak atas kedermawanan Anda. Tim keuangan kami akan memverifikasi dan mengirimkan konfirmasi resmi ke email Anda.",
  "trackingRefLabel": "Nomor Pelacakan:",
  "alertFillRequired": "Harap isi nama, email, dan jumlah transfer Anda.",
  "alertMinDonation": "Jumlah donasi minimum adalah 1 $ USD.",
  "alertNetworkError": "Terjadi kesalahan jaringan. Silakan coba lagi.",
  "alertSubmitFailed": "Gagal mengirimkan bukti transfer.",
  "girlsEnrolled": "Siswi Terdaftar",
  "liveClassrooms": "Kelas Langsung",
  "freeScholarships": "100% Gratis",
  "trustBadge1Title": "Dampak Langsung 100%",
  "trustBadge1Desc": "Seluruh donasi langsung dialokasikan untuk laptop, internet, dan pendidikan bagi wanita Afghanistan.",
  "trustBadge2Title": "Privasi dan Keamanan Mutlak",
  "trustBadge2Desc": "Identitas dan lokasi siswi dilindungi dengan enkripsi tingkat militer yang sangat ketat.",
  "trustBadge3Title": "Transparan & Diaudit",
  "trustBadge3Desc": "Buku kas publik yang selalu diperbarui, laporan tahunan berkala, dan pelacakan capaian siswa.",
  "storiesBadge": "Suara dari Kabul, Herat, dan Mazar-i-Sharif",
  "storiesTitle": "Pendidikan dalam Kepungan, Semangat yang Tak Patah",
  "storiesSub": "Kesaksian nyata dari para siswi kami yang belajar pemrograman di kelas digital rahasia.",
  "stories": [
    {
      "name": "Fatima R.",
      "location": "Kabul, Afghanistan",
      "track": "Rekayasa Perangkat Lunak Full-Stack",
      "quote": "Ketika universitas ditutup, saya merasa masa depan saya hancur selamanya. Safi Academy mengembalikan harapan saya. Sekarang saya membangun aplikasi cloud dan mengajar gadis-gadis di lingkungan saya.",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Zahra M.",
      "location": "Herat, Afghanistan",
      "track": "Python & Kecerdasan Buatan (AI)",
      "quote": "Laptop dan paket internet Starlink yang saya terima melalui donasi Anda mengubah hidup saya. Saya bukan lagi sekadar angka bisu; saya seorang peneliti kecerdasan buatan.",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      "name": "Maryam K.",
      "location": "Mazar-i-Sharif, Afghanistan",
      "track": "Desain UI/UX & Produk Digital",
      "quote": "Mereka bisa menggembok gedung sekolah, tetapi mereka tidak akan pernah bisa memenjarakan rasa ingin tahu kami. Setiap baris kode yang saya tulis adalah kemenangan atas kegelapan.",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ],
  "transparencyBadge": "Integritas Keuangan dan Tata Kelola",
  "transparencyTitle": "Ke Mana Setiap Dolar Donasi Anda Dialokasikan",
  "transparencySub": "Kami menjunjung tinggi prinsip transparansi total. Berikut adalah alokasi dana donasi Anda.",
  "allocations": [
    {
      "percent": "50%",
      "title": "Perangkat Keras dan Akses Internet Siswi",
      "desc": "Pembelian laptop coding, paket Starlink dan VPN aman, baterai tenaga surya, dan perlengkapan belajar aman di rumah."
    },
    {
      "percent": "30%",
      "title": "Infrastruktur Cloud dan Platform Belajar",
      "desc": "Server terdesentralisasi, sinkronisasi video materi offline, dan lingkungan sandbox eksekusi kode."
    },
    {
      "percent": "15%",
      "title": "Mentorship Global dan Karier Jarak Jauh",
      "desc": "Honorarium untuk mentor teknis internasional, kursus bahasa Inggris teknik, dan persiapan kerja remote."
    },
    {
      "percent": "5%",
      "title": "Operasional Keamanan dan Mitigasi Risiko",
      "desc": "Audit keamanan, pengiriman perlengkapan yang aman, dan perlindungan kerahasiaan identitas siswi secara ketat."
    }
  ],
  "faqBadge": "Pertanyaan yang Sering Diajukan",
  "faqTitle": "Hal Penting Mengenai Dana Bantuan Siswi",
  "faqSub": "Jawaban lengkap mengenai penyaluran bantuan, keamanan siswa, dan transparansi dana.",
  "faqs": [
    {
      "q": "Bagaimana Anda memastikan donasi sampai dengan aman ke siswi di Afghanistan?",
      "a": "Kami beroperasi melalui jaringan koordinator lokal terpercaya yang terdesentralisasi, menyerahkan laptop dan saldo internet langsung tanpa melalui perantara otoritas mana pun."
    },
    {
      "q": "Apakah donasi saya aman dan terverifikasi?",
      "a": "Ya, semua pembayaran diproses melalui saluran perbankan internasional yang memenuhi standar PCI-DSS dan disetorkan ke rekening institusional resmi di Eropa dan AS."
    },
    {
      "q": "Bisakah saya menjadi sponsor bagi siswi tertentu?",
      "a": "Bisa. Pada donasi Tingkat 3 ke atas, Anda dapat menyertakan pesan dedikasi, dan kami akan memadankan donasi Anda dengan seorang siswi serta membagikan laporan belajarnya secara anonim."
    },
    {
      "q": "Metode pembayaran apa saja yang diterima?",
      "a": "Semua kartu kredit/debit internasional, PayPal, dan transfer bank langsung dalam Dolar AS (ACH), Euro (SEPA), dan Pound Inggris (BACS)."
    },
    {
      "q": "Bagaimana identitas siswi dilindungi dari potensi bahaya?",
      "a": "Keselamatan mereka adalah prioritas utama. Siswi belajar menggunakan nama samaran di platform yang dienkripsi secara penuh tanpa kewajiban menyalakan kamera."
    }
  ],
  "bottomCtaBadge": "Berdirilah di Sisi Sejarah yang Benar",
  "bottomCtaTitle": "Nyalakan lentera harapan di saat-saat paling gelap.",
  "bottomCtaDesc": "Bergabunglah dengan ratusan dermawan di seluruh dunia untuk membuka masa depan cerah bagi wanita Afghanistan.",
  "bottomCtaBtn": "Donasi Sekarang • Berdayakan Siswi",
  "verifiedScholarship": "Inisiatif Bantuan Akademik Kemanusiaan Internasional Terverifikasi",
  "bankAccounts": [
    {
      "title": "Dolar AS (ACH / Routing) - Shirin Gol Ahmadi",
      "subtitle": "Transfer Bank Domestik AS Langsung / Wirex",
      "note": "Setoran minimum adalah 1 $."
    },
    {
      "title": "Euro SEPA (Malta) - Shirin Gol Ahmadi",
      "subtitle": "Wilayah Pembayaran Tunggal Euro (SEPA)",
      "note": "Bebas biaya transfer di seluruh Uni Eropa/EEA."
    },
    {
      "title": "Pound Inggris (UK Faster Payments) - Shaheen Safi",
      "subtitle": "Transfer Domestik Langsung Inggris Raya / BACS",
      "note": "Penyelesaian instan melalui Faster Payments."
    },
    {
      "title": "Euro SEPA (Malta) - Shaheen Safi",
      "subtitle": "Wilayah Pembayaran Tunggal Euro (SEPA)",
      "note": "Transfer bank standar dalam 1-2 hari kerja."
    },
    {
      "title": "Euro SEPA (Luksemburg) - Shaheen Safi",
      "subtitle": "Transfer Lintas Batas SEPA Luksemburg",
      "note": "Transfer langsung dengan nomor IBAN internasional."
    }
  ]
},
};

export function getDonateTranslation(locale: string): DonateTranslation {
  const normalized = (locale || "en").toLowerCase();
  return donateTranslationsMap[normalized] || donateTranslationsMap.en;
}
