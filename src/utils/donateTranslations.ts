// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES COMPREHENSIVE DONATION TRANSLATIONS
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
  donorEmailLabel: string;
  transferAmountLabel: string;
  txIdLabel: string;
  notesLabel: string;
  submitReceiptBtn: string;
  submittingReceiptBtn: string;
  successReceiptTitle: string;
  successReceiptDesc: string;
  trackingRefLabel: string;
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
}

const en: DonateTranslation = {
  isRtl: false,
  home: "Home",
  heroBadge: "Emergency Educational Aid • Defy the Ban",
  heroTitle1: "They Locked the School Gates.",
  heroTitle2: "We Open the Universe.",
  heroDesc1:
    "When totalitarian decrees stripped 1.4 million girls and young women in Afghanistan of their fundamental right to education, Safi Academy refused to stand by. Operating through decentralized networks, encrypted channels, and stealth infrastructure, we deliver accredited STEM, programming, and language education directly into the living rooms of courageous Afghan women.",
  heroDesc2:
    "Your donation is not charity. It is an act of defiance. Every dollar directly funds high-speed internet data packs, encrypted laptops, satellite proxy channels, and accredited curriculum mentors. 100% of your contribution reaches the frontline of freedom.",
  liveGoalLabel: "Live 2026 Academic Aid Goal",
  raisedOf: "raised of",
  goal: "goal",
  fundedBadge: "Decentralized • Zero Overhead",
  boxTitle: "Empower a Student Today",
  boxSubtitle: "Tax-deductible worldwide • Immediate receipt issued",
  customAmount: "Custom Amount",
  dedicationLabel: "Leave a tribute, message of solidarity, or student dedication:",
  dedicationPlaceholder: "e.g. 'In solidarity with Afghan girls' or 'From Zahra with love' (Optional)",
  tabCard: "Card / Apple Pay",
  tabCardSub: "Instant Stripe Checkout",
  tabPaypal: "PayPal",
  tabPaypalSub: "Instant Checkout",
  tabBank: "Bank Transfer",
  tabBankSub: "Manual SEPA / UK / US",
  tiers: [
    {
      amount: 15,
      label: "$15",
      tier: "Digital Lifeline",
      impact: "Provides 1 month of encrypted high-speed internet & secure VPN access for an underground student.",
      badge: "Essential"
    },
    {
      amount: 35,
      label: "$35",
      tier: "Learning Toolkit",
      impact: "Covers cloud coding sandbox environments, course materials, and offline lesson downloads.",
      badge: "Student Kit"
    },
    {
      amount: 75,
      label: "$75",
      tier: "Full Course + Mentorship",
      impact: "Funds 1 complete technical course with weekly 1-on-1 office hours from senior software engineers.",
      badge: "Most Popular"
    },
    {
      amount: 150,
      label: "$150",
      tier: "Semester Scholarship",
      impact: "Full 6-month comprehensive scholarship (Coding, UI/UX, or English) with verifiable graduation diploma.",
      badge: "High Impact"
    },
    {
      amount: 350,
      label: "$350",
      tier: "Hardware & Solar Kit",
      impact: "Sponsors a refurbished programming laptop plus a high-capacity power bank for frequent electrical blackouts.",
      badge: "Lifesaver"
    },
    {
      amount: 500,
      label: "$500",
      tier: "Classroom Guardian",
      impact: "Sponsors an entire virtual cohort of 5 courageous students with equipment, connectivity, and mentorship.",
      badge: "Champion"
    }
  ],
  donateNowBtn: "Donate Securely Now",
  processingBtn: "Preparing Secure Tunnel...",
  encryptedNotice: "256-Bit Bank-Grade Encryption • PCI Level 1 Certified",
  paypalTitle: "PayPal Direct Checkout",
  paypalDesc: "Pay quickly and securely with your PayPal account or linked debit/credit card.",
  paypalError: "PayPal error occurred. If PayPal is restricted in your region, please use Card or Direct Bank Transfer.",
  bankSelectLabel: "Select Bank Account / Currency:",
  bankVerifiedBadge: "5 Verified Accounts",
  copyAllBtn: "Copy All Info",
  allCopiedText: "All Copied!",
  copiedText: "Copied!",
  beneficiaryLabel: "Beneficiary / Account Holder",
  ibanLabel: "IBAN (International Bank Account)",
  bicLabel: "BIC / SWIFT Code",
  routingLabel: "Routing Number (US ACH / Wire)",
  sortCodeLabel: "Sort Code (UK Domestic)",
  accountNumberLabel: "Account Number",
  bankNameLabel: "Bank Name",
  bankAddressLabel: "Bank Address",
  noticeLabel: "Important Notice",
  receiptHeader: "Confirm Transfer Receipt",
  receiptSub: "After transferring, enter your details below so our finance team can verify and dispatch your confirmation.",
  donorNameLabel: "Full Name",
  donorEmailLabel: "Email Address",
  transferAmountLabel: "Transferred Amount",
  txIdLabel: "Transaction ID / Reference Number (Optional)",
  notesLabel: "Message or Note (Optional)",
  submitReceiptBtn: "Submit Transfer Receipt",
  submittingReceiptBtn: "Submitting...",
  successReceiptTitle: "Transfer Receipt Registered!",
  successReceiptDesc: "Thank you for standing with Afghan students. Our team will verify the deposit and email your official confirmation.",
  trackingRefLabel: "Tracking Reference:",
  trustBadge1Title: "100% Direct Impact",
  trustBadge1Desc: "Zero administrative deductions. Every cent reaches students directly.",
  trustBadge2Title: "Decentralized Delivery",
  trustBadge2Desc: "Circumvents local banking bans via secure private networks.",
  trustBadge3Title: "Audited & Verified",
  trustBadge3Desc: "Open financial ledgers and verifiable graduation diploma credentials.",
  storiesBadge: "Real Lives Transformed",
  storiesTitle: "From Shadows to Global Careers",
  storiesSub: "Read how your support directly dismantles isolation and builds economic autonomy.",
  stories: [
    {
      name: "Fatima R.",
      location: "Kabul, Afghanistan",
      track: "Full-Stack Web Development Graduate",
      quote:
        "When the university gates were slammed shut in my face, I cried for weeks. My world ended that day. Safi Academy gave me an encrypted laptop, paid for my 4G internet data, and taught me React and Node.js in secret. Today, I work on remote freelance contracts from my room and feed my family of six. They barred our classrooms, but they could not bar our minds.",
      avatar: "F"
    },
    {
      name: "Maryam K.",
      location: "Herat, Afghanistan",
      track: "Python & Data Science Scholar",
      quote:
        "In our city, teenage girls are not even allowed into public libraries. Studying here is an act of defiance. Every evening, when the house is quiet, I open my lessons on my smartphone through Safi Academy's offline proxy. I am building an automated database for local healthcare clinics. Your donation is not charity; it is our weapon against darkness.",
      avatar: "M"
    },
    {
      name: "Zahra S.",
      location: "Mazar-i-Sharif, Afghanistan",
      track: "UI/UX & Digital Product Design",
      quote:
        "The hardest part of being an Afghan girl today is the world forgetting that you exist. Safi Academy reminded me that my intellect has value. I completed my design portfolio, received mentorship from engineers in Germany and Canada, and won my first international design grant. Thank you to everyone who donates. You give us our dignity back.",
      avatar: "Z"
    }
  ],
  transparencyBadge: "Financial Stewardship",
  transparencyTitle: "Where Does Every Dollar Go?",
  transparencySub: "Complete transparency. Zero ambiguity. See our 2026 operational allocation.",
  allocations: [
    {
      percent: "45%",
      title: "Direct Student Scholarships & Diplomas",
      desc: "Comprehensive course access, live mentor office hours, accredited digital certificates, and career placement coaching."
    },
    {
      percent: "25%",
      title: "Encrypted High-Speed Internet & Data Packs",
      desc: "Subsidizing monthly mobile 4G and satellite internet data packs for female students living under strict restrictions."
    },
    {
      percent: "18%",
      title: "Anti-Censorship Digital Infrastructure",
      desc: "Cloud servers, lightweight low-bandwidth video streaming, offline lesson packs, and secure encrypted communication tunnels."
    },
    {
      percent: "12%",
      title: "Hardware & Emergency Solar Battery Grants",
      desc: "Refurbished coding laptops and high-capacity portable power banks to overcome chronic electrical power cuts."
    }
  ],
  faqBadge: "Clarity & Trust",
  faqTitle: "Frequently Asked Questions",
  faqSub: "Everything you need to know about donation security, student privacy, and impact.",
  faqs: [
    {
      q: "How is my donation processed and is it safe?",
      a: "Every transaction is encrypted using bank-grade 256-bit TLS encryption powered by Stripe & PayPal, industry-leading PCI Level 1 certified processors. Safi Academy never stores your card numbers."
    },
    {
      q: "How do you protect the safety of female students in Afghanistan?",
      a: "Safety is our paramount priority. We utilize zero-knowledge principles: student real names, exact physical locations, and IP addresses are completely masked and encrypted. Lessons can be downloaded and studied offline."
    },
    {
      q: "Can I donate from outside the United States in my local currency?",
      a: "Yes! Stripe and PayPal automatically support cards from over 135 countries. Whether you hold GBP, EUR, CAD, AUD, or other currencies, your bank converts the amount seamlessly."
    },
    {
      q: "Can I make an anonymous donation?",
      a: "Yes. You can leave the tribute note blank or write 'Anonymous Supporter'. We respect your privacy and never share your data with third parties."
    },
    {
      q: "How are scholarship recipients selected?",
      a: "Students undergo a compassionate application process administered by our advisory board. Priority is granted to girls barred from secondary schools or universities, orphans, and dedicated learners."
    },
    {
      q: "Will I receive a receipt for my contribution?",
      a: "Yes. Immediately upon completing checkout, an official digital receipt with a unique transaction reference ID is generated on-screen and dispatched to your email address."
    }
  ],
  bottomCtaBadge: "Join the Resistance for Education",
  bottomCtaTitle: "Be the Light in Afghanistan's Darkest Hour.",
  bottomCtaDesc: "Every girl we teach to code is a future leader they cannot silence. Choose your amount today and write history.",
  bottomCtaBtn: "Donate Now & Open a Future",
  verifiedScholarship: "Verified Scholarship Recipient"
};

const fa: DonateTranslation = {
  isRtl: true,
  home: "صفحه اصلی",
  heroBadge: "کمک اضطراری آموزشی • ایستادگی در برابر ممنوعیت",
  heroTitle1: "درهای مکاتب را بستند.",
  heroTitle2: "ما دروازه‌های جهان را می‌گشاییم.",
  heroDesc1:
    "زمانی که احکام سرکوبگرانه، ۱.۴ میلیون دختر و زن جوان در افغانستان را از حق اساسی آموزش محروم ساخت، آکادمی صافی سکوت نکرد. ما از طریق شبکه‌های غیرمتمرکز، کانال‌های رمزگذاری‌شده و زیرساخت‌های پنهان، آموزش‌های تخصصی برنامه‌نویسی، فناوری و زبان را مستقیماً به خانه‌های دختران شجاع افغان می‌رسانیم.",
  heroDesc2:
    "کمک مالی شما صدقه نیست؛ اقدامی شجاعانه برای مقاومت و امید است. هر دالر مستقیماً صرف بسته‌های انترنت پرسرعت، لپ‌تاپ‌های رمزگذاری‌شده، پروکسی‌های ضدسانسور و حقوق استادان می‌شود. ۱۰۰٪ کمک شما مستقیماً به دست دانش‌آموزان می‌رسد.",
  liveGoalLabel: "هدف زنده‌ی کمک‌های آموزشی ۲۰۲۶",
  raisedOf: "جمع‌آوری شده از",
  goal: "هدف کلی",
  fundedBadge: "غیرمتمرکز • بدون کسر اداری",
  boxTitle: "همین امروز حامی یک دانش‌آموز شوید",
  boxSubtitle: "دارای معافیت مالیاتی بین‌المللی • صدور فوری رسید رسمی",
  customAmount: "مبلغ دلخواه",
  dedicationLabel: "پیام همبستگی، یادداشت یا تقدیم به یک دانش‌آموز:",
  dedicationPlaceholder: "مثال: «در همبستگی با دختران شجاع افغانستان» (اختیاری)",
  tabCard: "کارت بانکی / Apple Pay",
  tabCardSub: "پرداخت آنی و امن Stripe",
  tabPaypal: "پی‌پال (PayPal)",
  tabPaypalSub: "پرداخت سریع و جهانی",
  tabBank: "انتقال مستقیم بانکی",
  tabBankSub: "واریز دستی SEPA / بریتانیا / آمریکا",
  tiers: [
    {
      amount: 15,
      label: "$۱۵",
      tier: "شریان حیات دیجیتال",
      impact: "تامین ۱ ماه انترنت پرسرعت و وی‌پی‌ان امن برای اتصال یک دانش‌آموز در افغانستان.",
      badge: "حیاتی"
    },
    {
      amount: 35,
      label: "$۳۵",
      tier: "بسته ابزار یادگیری",
      impact: "پوشش سرورهای ابری کدنویسی، مواد درسی پیشرفته و دانلود آفلاین دروس.",
      badge: "کیت دانش‌آموز"
    },
    {
      amount: 75,
      label: "$۷۵",
      tier: "دوره کامل + استاد راهنما",
      impact: "تامین هزینه یک دوره تخصصی همراه با جلسات هفتگی اختصاصی با مهندسان ارشد نرم‌افزار.",
      badge: "محبوب‌ترین"
    },
    {
      amount: 150,
      label: "$۱۵۰",
      tier: "بورسیه کامل ۶ ماهه",
      impact: "بورسیه کامل یک سمستر (برنامه‌نویسی، طراحی UI/UX یا انگلیسی) با مدرک معتبر بین‌المللی.",
      badge: "تاثیرگذار"
    },
    {
      amount: 350,
      label: "$۳۵۰",
      tier: "لپ‌تاپ و کیت باتری خورشیدی",
      impact: "اهدای یک لپ‌تاپ مناسب کدنویسی به همراه پاوربانک خورشیدی برای مقابله با قطعی برق کابل.",
      badge: "نجات‌بخش"
    },
    {
      amount: 500,
      label: "$۵۰۰",
      tier: "حامی صنف مجازی",
      impact: "حمایت کامل از یک گروه ۵ نفره از دختران شجاع با تجهیزات، انترنت و آموزش کامل.",
      badge: "قهرمان"
    }
  ],
  donateNowBtn: "پرداخت امن و فوری",
  processingBtn: "در حال ایجاد اتصال امن...",
  encryptedNotice: "رمزنگاری ۲۵۶ بیتی بانکی • دارای گواهی امنیتی PCI Level 1",
  paypalTitle: "پرداخت مستقیم پی‌پال",
  paypalDesc: "با حساب پی‌پال یا کارت متصل خود به صورت مستقیم و امن واریز کنید.",
  paypalError: "خطا در اتصال به پی‌پال رخ داد. در صورت محدودیت، لطفاً از کارت یا انتقال بانکی استفاده کنید.",
  bankSelectLabel: "انتخاب حساب بانکی و واحد پولی:",
  bankVerifiedBadge: "۵ حساب معتبر و فعال",
  copyAllBtn: "کپی تمام اطلاعات",
  allCopiedText: "همه کپی شد!",
  copiedText: "کپی شد!",
  beneficiaryLabel: "نام دارنده حساب (Beneficiary)",
  ibanLabel: "شماره شبا بین‌المللی (IBAN)",
  bicLabel: "کد سوئیفت / بیک (BIC / SWIFT)",
  routingLabel: "شماره روتینگ آمریکا (Routing Number)",
  sortCodeLabel: "سورت کد بریتانیا (Sort Code)",
  accountNumberLabel: "شماره حساب (Account Number)",
  bankNameLabel: "نام بانک",
  bankAddressLabel: "آدرس بانک",
  noticeLabel: "توجه مهم",
  receiptHeader: "اعلام و ثبت رسید واریز بانکی",
  receiptSub: "پس از انتقال وجه، مشخصات زیر را وارد کنید تا بخش مالی آن را تایید و رسید رسمی برایتان صادر کند.",
  donorNameLabel: "نام و تخلص شما",
  donorEmailLabel: "آدرس ایمیل",
  transferAmountLabel: "مبلغ واریز شده",
  txIdLabel: "شناسه تراکنش / شماره فیش (اختیاری)",
  notesLabel: "پیام یا یادداشت شما (اختیاری)",
  submitReceiptBtn: "ثبت و ارسال رسید واریز",
  submittingReceiptBtn: "در حال ثبت اطلاعات...",
  successReceiptTitle: "رسید شما با موفقیت ثبت شد!",
  successReceiptDesc: "از حمایت ارزشمند شما سپاسگزاریم. تیم مالی پس از بررسی حساب، تاییدیه رسمی را به ایمیل شما ارسال خواهد کرد.",
  trackingRefLabel: "کد پیگیری رسید:",
  trustBadge1Title: "۱۰۰٪ تاثیر مستقیم",
  trustBadge1Desc: "بدون هیچ‌گونه کسر اداری؛ تمام کمک‌ها مستقیماً صرف آموزش دانش‌آموزان می‌شود.",
  trustBadge2Title: "ارسال امن و غیرمتمرکز",
  trustBadge2Desc: "دور زدن تحریم‌ها و انسدادهای مالی با شبکه‌های مالی بین‌المللی امن.",
  trustBadge3Title: "شفافیت و مدارک تاییدشده",
  trustBadge3Desc: "امکان رهگیری مالی و صدور مدارک دیپلم معتبر و قابل استعلام.",
  storiesBadge: "روایت‌های واقعی تغییر",
  storiesTitle: "از کنج تاریکی تا مشاغل بین‌المللی",
  storiesSub: "ببینید چگونه حمایت شما دختران افغان را از انزوا به استقلال مالی رسانده است.",
  stories: [
    {
      name: "فاطمه ر.",
      location: "کابل، افغانستان",
      track: "فارغ‌التحصیل توسعه وب فول‌استک",
      quote:
        "وقتی دروازه‌های دانشگاه را به رویمان بستند، هفته‌ها گریستم. جهان برایم تمام شده بود. آکادمی صافی به من لپ‌تاپ رمزگذاری‌شده داد، هزینه انترنت ۴جی را پرداخت و ری‌اکت و نودجی‌اس را به من آموخت. امروز پروژه‌های فریلنسری خارجی انجام می‌دهم و مخارج خانواده شش‌نفره‌ام را تامین می‌کنم. درهای مکاتب را بستند، اما ذهن ما را نتوانستند متوقف کنند.",
      avatar: "ف"
    },
    {
      name: "مریم ک.",
      location: "هرات، افغانستان",
      track: "دانشجوی پایتون و علم داده",
      quote:
        "در شهر ما دختران حتی حق رفتن به کتابخانه‌های عامه را ندارند. درس خواندن در اینجا شجاعت محض است. هر شب که خانه آرام می‌شود، با پروکسی امن آکادمی درس‌هایم را باز می‌کنم. من در حال ساخت دیتابیس کلینیک‌های صحی هستم. کمک شما صدقه نیست؛ اسلحه ما علیه تاریکی است.",
      avatar: "م"
    },
    {
      name: "زهرا س.",
      location: "مزار شریف، افغانستان",
      track: "طراحی رابط کاربری UI/UX",
      quote:
        "سخت‌ترین درد دختران افغانستان این است که دنیا فراموششان کند. آکادمی صافی به من یادآوری کرد که هوش و استعداد من ارزش دارد. من پورتفولیوی خود را ساختم و از مهندسان کانادا راهنمایی گرفتم. از همه کسانی که دونیت می‌کنند سپاسگزارم؛ شما کرامت انسانی ما را پس دادید.",
      avatar: "ز"
    }
  ],
  transparencyBadge: "شفافیت مالی",
  transparencyTitle: "هر دالر کمک شما دقیقاً کجا هزینه می‌شود؟",
  transparencySub: "شفافیت ۱۰۰ درصدی بدون پنهان‌کاری؛ تخصیص بودجه آکادمی در سال ۲۰۲۶.",
  allocations: [
    {
      percent: "۴۵٪",
      title: "بورسیه مستقیم و اسناد فراغت دانش‌آموزان",
      desc: "دسترسی کامل به دوره‌ها، ساعات اداری با استادان ارشد، گواهینامه‌های رسمی و کاریابی بین‌المللی."
    },
    {
      percent: "۲۵٪",
      title: "انترنت پرسرعت و بسته‌های دیتای رمزگذاری‌شده",
      desc: "پرداخت ماهانه بسته‌های انترنت ۴جی و ماهواره‌ای برای دختران ساکن در مناطق محروم."
    },
    {
      percent: "۱۸٪",
      title: "زیرساخت سرور و ضدسانسور دیجیتال",
      desc: "سرورهای ابری، پخش ویدیویی کم‌حجم برای انترنت ضعیف و تونل‌های ارتباطی محرمانه."
    },
    {
      percent: "۱۲٪",
      title: "تجهیزات، لپ‌تاپ و کیت‌های برق خورشیدی",
      desc: "خرید لپ‌تاپ‌های بازسازی‌شده و پاوربانک‌های پرظرفیت برای عبور از خاموشی‌های مداوم برق."
    }
  ],
  faqBadge: "پرسش‌های متداول",
  faqTitle: "پاسخ به سوالات متداول حامیان",
  faqSub: "تمام آنچه باید درباره امنیت پرداخت، حفظ حریم خصوصی دانش‌آموزان و شیوه مصرف کمک‌ها بدانید.",
  faqs: [
    {
      q: "کمک مالی من چگونه پروسس می‌شود و آیا امن است؟",
      a: "تمام تراکنش‌ها با رمزنگاری پیشرفته ۲۵۶ بیتی TLS توسط شرکت‌های معتبر جهانی Stripe و PayPal انجام می‌شوند. اطلاعات کارت شما هرگز در سرورهای ما ذخیره نمی‌گردد."
    },
    {
      q: "امنیت دختران در افغانستان چگونه حفظ می‌شود؟",
      a: "امنیت اولویت مطلق ماست. نام واقعی، موقعیت جغرافیایی و آی‌پی دانش‌آموزان کاملاً محرمانه و کدگذاری می‌شود و تمام درس‌ها قابلیت دانلود آفلاین دارند."
    },
    {
      q: "آیا می‌توانم با اسعار محلی کشور خود کمک کنم؟",
      a: "بله! درگاه‌های ما از کارت‌های بانکی بیش از ۱۳۵ کشور (پوند، یورو، دالر کانادا، دالر آسترالیا و...) پشتیبانی می‌کنند و بانک شما تبدیل اسعار را خودکار انجام می‌دهد."
    },
    {
      q: "آیا می‌توانم به صورت ناشناس کمک کنم؟",
      a: "بله، می‌توانید نام خود را ننویسید یا بنویسید «حامی ناشناس». ما اطلاعات حامیان را هرگز به شخص ثالثی فاش نمی‌کنیم."
    },
    {
      q: "دانش‌آموزان مستحق چگونه انتخاب می‌شوند؟",
      a: "تیم آموزشی ما درخواست‌ها را با دقت بررسی می‌کند و اولویت به دختران محروم از مکاتب و دانشگاه‌ها، یتیمان و استعدادهای مشتاق داده می‌شود."
    },
    {
      q: "آیا پس از پرداخت رسید رسمی دریافت می‌کنم؟",
      a: "بله، بلافاصله پس از پرداخت موفق، رسید دیجیتال همراه با کد رهگیری روی صفحه نمایش داده شده و به ایمیل شما فرستاده می‌شود."
    }
  ],
  bottomCtaBadge: "به جنبش مقاومت آموزشی بپیوندید",
  bottomCtaTitle: "نوری در تاریک‌ترین روزهای افغانستان باشید.",
  bottomCtaDesc: "هر دختری که برنامه‌نویسی می‌آموزد، رهبری برای آینده است که صدای او هرگز خاموش نخواهد شد.",
  bottomCtaBtn: "همین حالا دونیت کنید و آینده بسازید",
  verifiedScholarship: "بورسیه تحصیلی تأیید شده"
};

const ps: DonateTranslation = {
  ...fa,
  isRtl: true,
  home: "اصلي پاڼه",
  heroBadge: "بېړنۍ ښوونیزه مرسته • د بندیز پر وړاندې ودرېدل",
  heroTitle1: "د ښوونځیو دروازې یې وتړلې.",
  heroTitle2: "موږ د نړۍ ورونه پرانیزو.",
  heroDesc1:
    "کله چې په افغانستان کې ۱.۴ میلیونه نجونې او ځوانې مېرمنې د زده کړې له بنسټیز حق څخه بې برخې شوې، صافي اکاډمۍ چوپه پاتې نشوه. موږ د پټو شبکو او کوډ شوو چینلونو له لارې، د پروګرامینګ او ټیکنالوژۍ زده کړې مستقیماً د افغان نجونو کورونو ته رسوو.",
  heroDesc2:
    "ستاسو مرسته خیرات نه دی، بلکې د تیاره پر وړاندې رڼا او مقاومت دی. هره روپۍ په مستقیم ډول د تیز انټرنیټ، کمپیوټرونو او ښوونکو په لګښت مصرفیږي. سل په سلو کې ستاسو مرسته اړمنو زده کوونکو ته رسیږي.",
  liveGoalLabel: "د ۲۰۲۶ تعلیمي مرستو ژوندی هدف",
  raisedOf: "ټول شوي له",
  goal: "ټول هدف",
  boxTitle: "همدا نن د یوې زده کوونکې ملاتړ وکړئ",
  boxSubtitle: "نړیوال مالیاتي معافیت • رسمي رسید صادرول",
  customAmount: "خوښه شوې اندازه",
  tabCard: "بانکي کارت / Apple Pay",
  tabPaypal: "پی‌پال (PayPal)",
  tabBank: "مستقیم بانکي لیږد",
  donateNowBtn: "په خوندي توګه پیسې ورکړئ",
  processingBtn: "د خوندي اړیکې جوړول...",
  bankSelectLabel: "د بانک حساب او پولي واحد غوره کړئ:",
  bankVerifiedBadge: "۵ تایید شوي حسابونه",
  copyAllBtn: "ټول معلومات کاپي کړئ",
  allCopiedText: "ټول کاپي شول!",
  copiedText: "کاپي شو!",
  receiptHeader: "د بانکي رسید تصدیق او ثبتول",
  submitReceiptBtn: "رسید واستوئ",
  bottomCtaBtn: "همدا اوس مرسته وکړئ",
  verifiedScholarship: "تایید شوی تحصیلي بورس",
  trustBadge1Title: "۱۰۰٪ مستقیم اغیز",
  trustBadge1Desc: "صفر اداري لګښتونه. هره روپۍ مستقیماً افغان زده کوونکو ته رسیږي.",
  trustBadge2Title: "غیرمتمرکز رسول",
  trustBadge2Desc: "د خوندي شخصي چینلونو له لارې محلي بانکي بندیزونه شنډوي.",
  trustBadge3Title: "پلټل شوی او تایید شوی",
  trustBadge3Desc: "شفاف مالي حسابونه او تایید شوي فراغت اسناد.",
  storiesBadge: "بدل شوي واقعي ژوندونه",
  storiesTitle: "له تیاره څخه تر نړیوال کار پورې",
  storiesSub: "ولولئ چې ستاسو ملاتړ څنګه انزوا ماتوي او اقتصادي خپلواکي جوړوي.",
  stories: [
    {
      name: "فاطمه ر.",
      location: "کابل، افغانستان",
      track: "د بشپړ ویب پراختیا فارغه",
      quote: "کله چې زما په مخ د پوهنتون دروازې وتړل شوې، ما اوونۍ اوونۍ ژړل. صافي اکاډمۍ ما ته یو کوډ شوی لپټاپ راکړ، د 4G انټرنیټ لګښت یې ورکړ او په پټه یې د پروګرامینګ زده کړه راکړه. نن زه له خپلې خونې کار کوم او د خپلې کورنۍ نفقه ګټم.",
      avatar: "ف"
    },
    {
      name: "مریم ک.",
      location: "هرات، افغانستان",
      track: "د پایتون او ډیټا ساینس زده کوونکې",
      quote: "زموږ په ښار کې نجونو ته حتی عامه کتابتونونو ته د تګ اجازه نشته. دلته زده کړه کول خپله یو مقاومت دی. هر ماښام د صافي اکاډمۍ له لارې درسونه لولم. ستاسو مرسته زموږ د جهالت پر وړاندې وسله ده.",
      avatar: "م"
    },
    {
      name: "زهرا س.",
      location: "مزارشریف، افغانستان",
      track: "د ډیجیټل محصول ډیزاین (UI/UX)",
      quote: "نن ورځ د افغان نجلۍ تر ټولو سخته برخه دا ده چې نړۍ مو هېره کړي. صافي اکاډمۍ ما ته یادونه وکړه چې زما عقل ارزښت لري. زه خپل لومړنی نړیوال ډیزاین ملاتړ ترلاسه کړم. له ټولو مرسته کوونکو مننه.",
      avatar: "ز"
    }
  ],
  transparencyBadge: "مالي شفافیت",
  transparencyTitle: "هر ډالر چیرته لګول کیږي؟",
  transparencySub: "سل په سلو کې بشپړ شفافیت. د ۲۰۲۶ کال عملیاتي لګښتونه وګورئ.",
  allocations: [
    {
      percent: "۴۵٪",
      title: "مستقیم تحصیلي بورسونه او ډیپلومونه",
      desc: "کورسونو ته بشپړ لاسرسی، د ښوونکو سره ځانګړي ساعتونه او نړیوال معتبر سندونه."
    },
    {
      percent: "۲۵٪",
      title: "چټک انټرنیټ او کوډ شوي ډیټا بستې",
      desc: "په افغانستان کې د نجونو لپاره د میاشتني 4G او سپوږمکۍ انټرنیټ لګښت."
    },
    {
      percent: "۱۸٪",
      title: "ډیجیټل سرورونه او د فلټرینګ ضد زېرمې",
      desc: "د زده کړې محرم چینلونه او د ویډیوګانو سپک فارمټ د ضعیف انټرنیټ لپاره."
    },
    {
      percent: "۱۲٪",
      title: "لپټاپونه او د لمریزې برېښنا بستې",
      desc: "د لپټاپونو او بېټرۍ اخیستل ترڅو د برېښنا د نشتوالي ستونزه حل شي."
    }
  ],
  faqBadge: "پرله‌پسې پوښتنې",
  faqTitle: "د مرسته کوونکو پوښتنو ته ځوابونه",
  faqSub: "هغه څه چې تاسو باید د تادیې د امنیت او د زده کوونکو د محرمیت په اړه پوه شئ.",
  faqs: [
    {
      q: "زما مرسته څنګه پروسس کیږي او ایا خوندي ده؟",
      a: "ټولې تادیات د پرمختللي ۲۵۶-بیټ کوډ کولو له لارې د Stripe او PayPal لخوا خوندي کیږي. ستاسو د کارټ معلومات هیڅکله زموږ په سرورونو کې نه ساتل کیږي."
    },
    {
      q: "په افغانستان کې د نجونو خوندیتوب څنګه تضمینیږي؟",
      a: "امنیت زموږ لومړیتوب دی. د زده کوونکو نوم، موقعیت او د شبکې پته په بشپړه توګه پټه او کوډ شوې ده."
    },
    {
      q: "ایا زه کولی شم په خپل ځايي اسعارو مرسته وکړم؟",
      a: "هو! زموږ درګاه د نړۍ د ۱۳۵ هیوادونو د کارتونو ملاتړ کوي او ستاسو بانک تبادله په اتومات ډول ترسره کوي."
    },
    {
      q: "ایا زه کولی شم په پټه او بې نومه مرسته وکړم؟",
      a: "هو، تاسو کولی شئ خپل نوم پټ وساتئ. موږ د مرسته کوونکو معلومات هیڅکله له دریم اړخ سره نه شریکوو."
    },
    {
      q: "مستحقې زده کوونکې څنګه غوره کیږي؟",
      a: "زموږ ښوونیز ټیم غوښتنلیکونه په دقت ګوري او اولویت هغو نجونو ته ورکول کیږي چې له زده کړې محرومې شوې دي."
    },
    {
      q: "ایا له تادیې وروسته رسمي رسید راکول کیږي؟",
      a: "هو، له بریالۍ تادیې سمدلاسه وروسته ډیجیټل رسید ستاسو سکرین ته راځي او بریښنالیک ته مو هم استول کیږي."
    }
  ],
  bottomCtaBadge: "د ښوونې مقاومت سره یوځای شئ",
  bottomCtaTitle: "د افغانستان په توره تیاره کې رڼا شئ.",
  bottomCtaDesc: "هره نجلۍ چې پروګرامینګ زده کوي، د راتلونکي یو نه خاموشه کیدونکی غږ دی."
};

const ar: DonateTranslation = {
  ...fa,
  isRtl: true,
  home: "الرئيسية",
  heroBadge: "المساعدات التعليمية الطارئة • تحدي الحظر",
  heroTitle1: "أغلقوا أبواب المدارس.",
  heroTitle2: "ونحن نفتح أبواب المستقبل.",
  heroDesc1:
    "عندما حُرمت 1.4 مليون فتاة وامرأة في أفغانستان من حقهن الإنساني في التعليم، لم تقف أكاديمية صافي مكتوفة الأيدي. من خلال شبكات لا مركزية مشفرة، نوصل تعليم البرمجة والتقنية المعتمدة مباشرة إلى بيوت الفتيات الأفغانيات الشجاعات.",
  heroDesc2:
    "تبرعك ليس مجرد صدقة؛ إنه موقف إنساني شجاع. كل دولار يدعم باقات الإنترنت الفضائي المشفرة، وأجهزة الحواسيب، والدروس المعتمدة بنسبة 100%.",
  liveGoalLabel: "هدف الدعم الأكاديمي المباشر لعام 2026",
  raisedOf: "تم جمعه من",
  goal: "الهدف",
  boxTitle: "ادعم طالبة علم اليوم",
  boxSubtitle: "معفى من الضرائب عالمياً • إيصال رسمي فوري",
  customAmount: "مبلغ مخصص",
  tabCard: "بطاقة ائتمان / Apple Pay",
  tabPaypal: "باي بال (PayPal)",
  tabBank: "تحويل بنكي مباشر",
  donateNowBtn: "تبرع بأمان الآن",
  processingBtn: "جاري تأمين الاتصال المشفر...",
  bankSelectLabel: "اختر الحساب البنكي والعملة:",
  bankVerifiedBadge: "5 حسابات بنكية موثقة",
  copyAllBtn: "نسخ جميع البيانات",
  allCopiedText: "تم النسخ بالكامل!",
  copiedText: "تم النسخ!",
  receiptHeader: "تأكيد إيصال التحويل البنكي",
  submitReceiptBtn: "إرسال إيصال التحويل",
  bottomCtaBtn: "تبرع الآن واصنع مستقبلاً",
  verifiedScholarship: "حاصلة على منحة دراسية معتمدة",
  trustBadge1Title: "100% أثر مباشر",
  trustBadge1Desc: "صفر اقتطاعات إدارية. كل سنت يصل مباشرة إلى الطالبات.",
  trustBadge2Title: "توصيل لا مركزي",
  trustBadge2Desc: "تجاوز القيود المصرفية عبر قنوات مشفرة وآمنة تماماً.",
  trustBadge3Title: "مدقق ومعتمد",
  trustBadge3Desc: "سجلات مالية شفافة وشهادات تخرج رقمية يمكن التحقق منها.",
  storiesBadge: "قصص ملهمة حقيقية",
  storiesTitle: "من العزلة إلى آفاق العمل العالمي",
  storiesSub: "اكتشف كيف يفكك دعمك جدار العزلة ويبني الاستقلال الاقتصادي.",
  stories: [
    {
      name: "فاطمة ر.",
      location: "كابول، أفغانستان",
      track: "خريجة تطوير الويب الشامل",
      quote: "حين أغلقت أبواب الجامعات في وجوهنا بكيت لأيام. قدمت لي أكاديمية صافي حاسوباً مشفراً وتكفلت بإنترنت 4G، وتعلّمت البرمجة سراً. واليوم أعمل عن بعد وأعيل أسرتي المكونة من ستة أفراد.",
      avatar: "ف"
    },
    {
      name: "مريم ك.",
      location: "هرات، أفغانستان",
      track: "طالبة بايثون وعلم البيانات",
      quote: "في مدينتنا يُحظر على الفتيات حتى دخول المكتبات. التعلم هنا مقاومة. كل مساء أدرس عبر القنوات الآمنة لأكاديمية صافي. تبرعكم هو سلاحنا في مواجهة الظلام.",
      avatar: "م"
    },
    {
      name: "زهراء س.",
      location: "مزار شريف، أفغانستان",
      track: "تصميم واجهات وتجربة المستخدم (UI/UX)",
      quote: "أصعب ما في كونك فتاة أفغانية اليوم هو أن ينسى العالم وجودك. أعادت لي أكاديمية صافي كرامتي وأملي بعد حصولي على أول منحة تصميم دولية.",
      avatar: "ز"
    }
  ],
  transparencyBadge: "الشفافية المالية",
  transparencyTitle: "أين يذهب كل دولار؟",
  transparencySub: "شفافية مطلقة بلا أي غموض. مخصصاتنا التشغيلية لعام 2026.",
  allocations: [
    {
      percent: "45%",
      title: "المنح الدراسية المباشرة والشهادات",
      desc: "وصول كامل للمقررات، وساعات إرشاد مع كبار المهندسين، وشهادات معتمدة وتوجيه مهني."
    },
    {
      percent: "25%",
      title: "باقات إنترنت 4G فضائي عالي السرعة",
      desc: "تغطية الاشتراكات الشهرية لإنترنت الهواتف والأقمار الصناعية للفتيات المحاصرات."
    },
    {
      percent: "18%",
      title: "البنية التحتية السحابية وتجاوز الحجب",
      desc: "خوادم سحابية، وبث فيديو منخفض الاستهلاك، وقنوات اتصال مشفرة."
    },
    {
      percent: "12%",
      title: "الحواسيب وبطاريات الطاقة الشمسية",
      desc: "تأمين حواسيب محمولة ومصادر طاقة بديلة للتغلب على انقطاع الكهرباء المستمر."
    }
  ],
  faqBadge: "الأسئلة الشائعة",
  faqTitle: "إجابات على أسئلة الداعمين",
  faqSub: "كل ما تحتاج معرفته حول أمان الدفع، وخصوصية الطالبات، واستخدام التبرعات.",
  faqs: [
    {
      q: "كيف تتم معالجة تبرعي وهل العملية آمنة؟",
      a: "تتم المعاملات بتشفير 256-bit TLS عبر بوابات عالمية معتمدة مثل Stripe وPayPal. لا نحتفظ ببيانات بطاقتك أبداً."
    },
    {
      q: "كيف تتم حماية خصوصية وأمان الطالبات في أفغانستان؟",
      a: "الأمان هو أولويتنا القصوى؛ فالأسماء والمواقع وبيانات الاتصال مشفرة بالكامل، وجميع الدروس متاحة للتنزيل دون اتصال."
    },
    {
      q: "هل يمكنني التبرع بعملتي المحلية؟",
      a: "نعم! تقبل بواباتنا البطاقات المصرفية من أكثر من 135 دولة، وسيقوم مصرفك بتحويل العملة تلقائياً."
    },
    {
      q: "هل يمكنني التبرع دون الكشف عن هويتي؟",
      a: "نعم، يمكنك اختيار التبرع كداعم مجهول. نحن لا نشارك معلومات الداعمين مع أي طرف ثالث."
    },
    {
      q: "كيف يتم اختيار الطالبات المستحقات للمنح؟",
      a: "تقوم لجنتنا الأكاديمية بدراسة الطلبات بعناية فائقة، مع إعطاء الأولوية للفتيات المحرومات من التعليم والأيتام."
    },
    {
      q: "هل أحصل على إيصال رسمي بعد الدفع؟",
      a: "نعم، يظهر الإيصال الرقمي مع رمز التتبع فوراً بعد اكتمال الدفع ويُرسل إلى بريدك الإلكتروني."
    }
  ],
  bottomCtaBadge: "انضم إلى مقاومة التجهيل",
  bottomCtaTitle: "كن النور في أحلك أوقات أفغانستان.",
  bottomCtaDesc: "كل فتاة نعلمها البرمجة هي قائدة مستقبلية لن يستطيع أحد إسكات صوتها."
};

const ur: DonateTranslation = {
  ...fa,
  isRtl: true,
  home: "ہوم",
  heroBadge: "ہنگامی تعلیمی امداد • پابندی کے خلاف عزم",
  heroTitle1: "انہوں نے اسکولوں کے دروازے بند کر دیئے۔",
  heroTitle2: "ہم نے پوری کائنات کے دروازے کھول دیئے۔",
  heroDesc1:
    "جب افغانستان میں 14 لاکھ بچیوں اور نوجوان خواتین کو تعلیم کے بنیادی حق سے محروم کر دیا گیا، تو صافی اکیڈمی نے ہتھیار نہیں ڈالے۔ انکرپٹڈ نیٹ ورکس کے ذریعے ہم براہ راست بہادر افغان بیٹیوں کو پروگرامنگ اور جدید ٹیکنالوجی کی تعلیم فراہم کر رہے ہیں۔",
  heroDesc2:
    "آپ کا عطیہ محض خیرات نہیں بلکہ جہالت کے خلاف جدوجہد ہے۔ آپ کی رقم کا 100 فیصد براہ راست تیز رفتار انٹرنیٹ، لیپ ٹاپس اور اسکالرشپس پر خرچ ہوتا ہے۔",
  liveGoalLabel: "تعلیمی امدادی ہدف 2026",
  raisedOf: "جمع شدہ از",
  goal: "کل ہدف",
  boxTitle: "آج ہی کسی طالبہ کو بااختیار بنائیں",
  boxSubtitle: "عالمی ٹیکس استثنیٰ • فوری باضابطہ رسید",
  customAmount: "اپنی مرضی کی رقم",
  tabCard: "بینک کارڈ / Apple Pay",
  tabPaypal: "پے پال (PayPal)",
  tabBank: "براہ راست بینک ٹرانسفر",
  donateNowBtn: "ابھی محفوظ طریقے سے عطیہ دیں",
  processingBtn: "محفوظ کنکشن تیار کیا جا رہا ہے...",
  bankSelectLabel: "بینک اکاؤنٹ اور کرنسی منتخب کریں:",
  bankVerifiedBadge: "5 تصدیق شدہ اکاؤنٹس",
  copyAllBtn: "تمام معلومات کاپی کریں",
  allCopiedText: "سب کاپی ہو گیا!",
  copiedText: "کاپی ہو گیا!",
  receiptHeader: "بینک ٹرانسفر رسید کی تصدیق",
  submitReceiptBtn: "رسید جمع کرائیں",
  bottomCtaBtn: "ابھی عطیہ دیں اور مستقبل بنائیں",
  verifiedScholarship: "تصدیق شدہ تعلیمی اسکالرشپ وصول کنندہ",
  trustBadge1Title: "100% براہ راست اثر",
  trustBadge1Desc: "صفر انتظامی کٹوتیاں۔ ہر پیسہ براہ راست افغان طالبات تک پہنچتا ہے۔",
  trustBadge2Title: "غیر مرکزی ترسیل",
  trustBadge2Desc: "محفوظ نجی نیٹ ورکس کے ذریعے مقامی بینکنگ پابندیوں کا مؤثر حل۔",
  trustBadge3Title: "آڈٹ شدہ اور تصدیق شدہ",
  trustBadge3Desc: "شفاف مالیاتی حسابات اور قابل تصدیق گریجویشن ڈپلومہ اسناد۔",
  storiesBadge: "حقیقی تبدیل شدہ زندگیاں",
  storiesTitle: "تاریکی سے عالمی کیریئر تک",
  storiesSub: "جانیے کہ آپ کی مدد کس طرح قید کو ختم کرتی اور خود مختاری بناتی ہے۔",
  stories: [
    {
      name: "فاطمہ ر.",
      location: "کابل، افغانستان",
      track: "فل اسٹیک ویب ڈویلپمنٹ گریجویٹ",
      quote: "جب یونیورسٹی کے دروازے ہمارے منہ پر بند ہوئے تو میں ہفتوں روتی رہی۔ صافی اکیڈمی نے مجھے انکرپٹڈ لیپ ٹاپ دیا، 4G انٹرنیٹ کا خرچ اٹھایا اور خفیہ طور پر کوڈنگ سکھائی۔ آج میں اپنے کمرے سے فری لانسنگ کر کے چھ افراد کے خاندان کی کفالت کر رہی ہوں۔",
      avatar: "ف"
    },
    {
      name: "مریم ک.",
      location: "ہرات، افغانستان",
      track: "پائتھون اور ڈیٹا سائنس اسکالر",
      quote: "ہمارے شہر میں لڑکیوں کا پبلک لائبریری جانا بھی منع ہے۔ یہاں تعلیم حاصل کرنا بذات خود ایک جدوجہد ہے۔ ہر شام صافی اکیڈمی کے آف لائن پراکسی کے ذریعے اسباق پڑھتی ہوں۔ آپ کا عطیہ جہالت کے خلاف ہمارا ہتھیار ہے۔",
      avatar: "م"
    },
    {
      name: "زہرا س.",
      location: "مزار شریف، افغانستان",
      track: "یو آئی/یو ایکس ڈیجیٹل پروڈکٹ ڈیزائن",
      quote: "آج ایک افغان لڑکی ہونے کا سب سے دکھ بھرا پہلو یہ ہے کہ دنیا آپ کو بھول جائے۔ صافی اکیڈمی نے مجھے یاد دلایا کہ میری سوچ کی اہمیت ہے۔ آپ سب کا شکریہ جنہوں نے عطیات دیے۔",
      avatar: "ز"
    }
  ],
  transparencyBadge: "مالیاتی شفافیت",
  transparencyTitle: "ہر ڈالر کہاں خرچ ہوتا ہے؟",
  transparencySub: "مکمل شفافیت۔ بلا کسی ابہام کے ہماری 2026 آپریشنل تقسیم دیکھیں۔",
  allocations: [
    {
      percent: "45%",
      title: "براہ راست طلباء اسکالرشپس اور اسناد",
      desc: "کورسز تک مکمل رسائی، سینئر اساتذہ کے ساتھ رہنمائی اور بین الاقوامی تسلیم شدہ اسناد۔"
    },
    {
      percent: "25%",
      title: "تیز رفتار انٹرنیٹ اور انکرپٹڈ ڈیٹا پیکس",
      desc: "سخت پابندیوں میں رہنے والی طالبات کے لیے ماہانہ موبائل 4G اور سیٹلائٹ انٹرنیٹ پیکجز۔"
    },
    {
      percent: "18%",
      title: "کلاؤڈ سرورز اور سنسرشپ سے پاک انفراسٹرکچر",
      desc: "محفوظ کلاؤڈ سرورز، کم رفتار انٹرنیٹ کے لیے ہلکے اسباق اور پرائیویٹ ٹنلز۔"
    },
    {
      percent: "12%",
      title: "لیپ ٹاپس اور سولر پاور کٹس",
      desc: "بجلی کی بندش سے نمٹنے کے لیے لیپ ٹاپس اور پاور بینک کٹس کی فراہمی۔"
    }
  ],
  faqBadge: "اکثر پوچھے جانے والے سوالات",
  faqTitle: "معاونین کے سوالات کے جوابات",
  faqSub: "ادائیگی کی حفاظت اور طالبات کی رازداری کے متعلق مکمل معلومات۔",
  faqs: [
    {
      q: "میرا عطیہ کیسے پراسیس ہوتا ہے اور کیا یہ محفوظ ہے؟",
      a: "تمام ٹرانزیکشنز 256-bit TLS انکرپشن کے ساتھ معتبر اداروں جیسے Stripe اور PayPal کے ذریعے محفوظ کی جاتی ہیں۔"
    },
    {
      q: "افغانستان میں لڑکیوں کا تحفظ کیسے یقینی بنایا جاتا ہے؟",
      a: "حفاظت ہماری اولین ترجیح ہے۔ تمام طالبات کا ڈیٹا اور نام مکمل طور پر خفیہ اور کوڈڈ ہوتا ہے۔"
    },
    {
      q: "کیا میں اپنی مقامی کرنسی میں عطیہ دے سکتا ہوں؟",
      a: "جی ہاں! ہمارے گیٹ ویز 135 سے زائد ممالک کے بینک کارڈز کو سپورٹ کرتے ہیں۔"
    },
    {
      q: "کیا میں گمنام طور پر عطیہ دے سکتا ہوں؟",
      a: "جی ہاں، آپ بغیر نام ظاہر کیے عطیہ دے سکتے ہیں۔ ہم ڈونرز کا ڈیٹا کسی کے ساتھ شیئر نہیں کرتے۔"
    },
    {
      q: "مستحق طالبات کا انتخاب کیسے کیا جاتا ہے؟",
      a: "ہماری ٹیم درخواستوں کا بغور جائزہ لیتی ہے اور تعلیم سے محروم ہونے والی طالبات کو ترجیح دی جاتی ہے۔"
    },
    {
      q: "کیا ادائیگی کے بعد سرکاری رسید ملتی ہے؟",
      a: "جی ہاں، کامیاب ادائیگی کے فوراً بعد ڈیجیٹل رسید اسکرین پر اور ای میل پر بھیجی جاتی ہے۔"
    }
  ],
  bottomCtaBadge: "تعلیمی جدوجہد میں شامل ہوں",
  bottomCtaTitle: "افغانستان کے تاریک دور میں امید کی کرن بنیں۔",
  bottomCtaDesc: "جس لڑکی کو ہم کوڈنگ سکھاتے ہیں وہ مستقبل کی ایک ایسی لیڈر ہے جس کی آواز کو دبایا نہیں جا سکتا۔"
};

const de: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Startseite",
  heroBadge: "Notfall-Bildungshilfe • Gegen das Verbot",
  heroTitle1: "Sie schlossen die Schultore.",
  heroTitle2: "Wir öffnen das Universum.",
  heroDesc1:
    "Als 1,4 Millionen Mädchen und junge Frauen in Afghanistan ihres Rechts auf Bildung beraubt wurden, weigerte sich die Safi Academy zuzusehen. Über dezentrale, verschlüsselte Netzwerke bringen wir akkreditierte IT- und Programmierausbildung direkt in die Wohnzimmer mutiger afghanischer Frauen.",
  heroDesc2:
    "Ihre Spende ist keine Wohltätigkeit – sie ist Widerstand für Menschenrechte. Jeder Euro finanziert schnelles Internet, Laptops und Mentorings direkt vor Ort zu 100%.",
  liveGoalLabel: "Aktuelles Spendenziel 2026",
  raisedOf: "gesammelt von",
  goal: "Ziel",
  boxTitle: "Ermächtigen Sie heute eine Schülerin",
  boxSubtitle: "Weltweit steuerlich absetzbar • Sofortige Quittung",
  customAmount: "Anderer Betrag",
  tabCard: "Karte / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Banküberweisung",
  donateNowBtn: "Jetzt sicher spenden",
  processingBtn: "Sicherer Tunnel wird aufgebaut...",
  bankSelectLabel: "Bankkonto & Währung auswählen:",
  bankVerifiedBadge: "5 verifizierte Konten",
  copyAllBtn: "Alle Angaben kopieren",
  allCopiedText: "Alles kopiert!",
  copiedText: "Kopiert!",
  receiptHeader: "Überweisungsbeleg bestätigen",
  submitReceiptBtn: "Überweisungsbeleg einreichen",
  bottomCtaBtn: "Jetzt spenden & Zukunft schenken",
  verifiedScholarship: "Verifizierte Stipendiatin"
};

const fr: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Accueil",
  heroBadge: "Aide Éducative d'Urgence • Défier l'Interdiction",
  heroTitle1: "Ils ont verrouillé les écoles.",
  heroTitle2: "Nous ouvrons l'univers.",
  heroDesc1:
    "Quand 1,4 million de filles et jeunes femmes en Afghanistan ont été privées d'éducation, Safi Academy a refusé de baisser les bras. Grâce à des réseaux décentralisés et chiffrés, nous apportons des formations technologiques accréditées directement aux femmes afghanes.",
  heroDesc2:
    "Votre don n'est pas une simple aumône : c'est un acte de résistance humaine. 100% de vos contributions financent des connexions Internet, des ordinateurs et des bourses.",
  liveGoalLabel: "Objectif d'aide éducative 2026",
  raisedOf: "collectés sur",
  goal: "objectif",
  boxTitle: "Soutenez une étudiante aujourd'hui",
  boxSubtitle: "Déductible d'impôt • Reçu officiel immédiat",
  customAmount: "Montant personnalisé",
  tabCard: "Carte / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Virement Bancaire",
  donateNowBtn: "Faire un don sécurisé",
  processingBtn: "Sécurisation de la connexion...",
  bankSelectLabel: "Sélectionnez le compte et la devise :",
  bankVerifiedBadge: "5 comptes vérifiés",
  copyAllBtn: "Tout copier",
  allCopiedText: "Tout est copié !",
  copiedText: "Copié !",
  receiptHeader: "Confirmer le reçu de virement",
  submitReceiptBtn: "Envoyer le reçu",
  bottomCtaBtn: "Donner maintenant & ouvrir l'avenir",
  verifiedScholarship: "Boursière vérifiée"
};

const es: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Inicio",
  heroBadge: "Ayuda Educativa de Emergencia • Desafiando la Prohibición",
  heroTitle1: "Cerraron las escuelas.",
  heroTitle2: "Nosotros abrimos el universo.",
  heroDesc1:
    "Cuando a 1.4 millones de niñas y mujeres jóvenes en Afganistán se les arrebató el derecho a la educación, Safi Academy decidió actuar. A través de redes cifradas y descentralizadas, llevamos educación tecnológica de vanguardia a sus hogares.",
  heroDesc2:
    "Tu donación es un acto de resistencia y dignidad. El 100% llega directamente a las estudiantes en forma de internet de alta velocidad, laptops y mentorías.",
  liveGoalLabel: "Meta de ayuda académica 2026",
  raisedOf: "recaudados de",
  goal: "meta",
  boxTitle: "Empodera a una estudiante hoy",
  boxSubtitle: "Deducible de impuestos • Recibo inmediato",
  customAmount: "Cantidad personalizada",
  tabCard: "Tarjeta / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Transferencia Bancaria",
  donateNowBtn: "Donar de forma segura ahora",
  processingBtn: "Estableciendo conexión segura...",
  bankSelectLabel: "Seleccionar cuenta y moneda:",
  bankVerifiedBadge: "5 cuentas verificadas",
  copyAllBtn: "Copiar toda la información",
  allCopiedText: "¡Copiado con éxito!",
  copiedText: "¡Copiado!",
  receiptHeader: "Confirmar comprobante de transferencia",
  submitReceiptBtn: "Enviar comprobante",
  bottomCtaBtn: "Donar ahora y construir futuro",
  verifiedScholarship: "Becaria verificada"
};

const ru: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Главная",
  heroBadge: "Экстренная образовательная помощь • Вопреки запретам",
  heroTitle1: "Они заперли двери школ.",
  heroTitle2: "Мы открываем Вселенную.",
  heroDesc1:
    "Когда 1,4 миллиона девушек в Афганистане лишили права на образование, Safi Academy не осталась в стороне. Через защищенные децентрализованные каналы мы обучаем программированию и технологиям прямо на дому.",
  heroDesc2:
    "Ваше пожертвование — это реальный акт солидарности. 100% средств идет на скоростной интернет, ноутбуки и стипендии для студенток.",
  liveGoalLabel: "Цель академической помощи на 2026 год",
  raisedOf: "собрано из",
  goal: "цели",
  boxTitle: "Поддержите студентку сегодня",
  boxSubtitle: "Официальная квитанция выдается мгновенно",
  customAmount: "Другая сумма",
  tabCard: "Карта / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Банковский перевод",
  donateNowBtn: "Пожертвовать безопасно",
  processingBtn: "Подготовка защищенного канала...",
  bankSelectLabel: "Выберите банковский счет и валюту:",
  bankVerifiedBadge: "5 проверенных счетов",
  copyAllBtn: "Скопировать все реквизиты",
  allCopiedText: "Все скопировано!",
  copiedText: "Скопировано!",
  receiptHeader: "Подтверждение квитанции перевода",
  submitReceiptBtn: "Отправить квитанцию",
  bottomCtaBtn: "Пожертвовать и подарить будущее",
  verifiedScholarship: "Подтверждённая стипендиатка"
};

const tr: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Ana Sayfa",
  heroBadge: "Acil Eğitim Yardımı • Yasağa Karşı Direniş",
  heroTitle1: "Okul kapılarını kilitlediler.",
  heroTitle2: "Biz evreni açıyoruz.",
  heroDesc1:
    "Afganistan'da 1,4 milyon kız çocuğu ve genç kadının eğitim hakkı gasp edildiğinde Safi Academy sessiz kalmadı. Şifreli ve güvenli ağlar üzerinden doğrudan kadınlara yazılım ve teknoloji eğitimi ulaştırıyoruz.",
  heroDesc2:
    "Bağışınız sadece bir yardım değil, karanlığa karşı bir umuttur. Katkınızın %100'ü doğrudan internet paketlerine, dizüstü bilgisayarlara ve burslara gitmektedir.",
  liveGoalLabel: "2026 Canlı Eğitim Yardımı Hedefi",
  raisedOf: "toplanan miktar / hedef:",
  goal: "hedef",
  boxTitle: "Bugün bir öğrenciye güç verin",
  boxSubtitle: "Vergiden muaf • Anında resmi makbuz",
  customAmount: "Özel Miktar",
  tabCard: "Kart / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Banka Havalesi",
  donateNowBtn: "Güvenle Bağış Yap",
  processingBtn: "Güvenli bağlantı kuruluyor...",
  bankSelectLabel: "Banka Hesabı ve Para Birimi Seçin:",
  bankVerifiedBadge: "5 Doğrulanmış Hesap",
  copyAllBtn: "Tüm Bilgileri Kopyala",
  allCopiedText: "Tümü Kopyalandı!",
  copiedText: "Kopyalandı!",
  receiptHeader: "Havale Dekontunu Onayla",
  submitReceiptBtn: "Dekontu Gönder",
  bottomCtaBtn: "Şimdi Bağış Yapın ve Gelecek Açın",
  verifiedScholarship: "Doğrulanmış Bursiyer"
};

const zh: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "首页",
  heroBadge: "紧急教育援助 • 突破禁令",
  heroTitle1: "他们锁上了校门。",
  heroTitle2: "我们开启了整个宇宙。",
  heroDesc1:
    "当阿富汗140万名女孩和年轻女性被剥夺受教育权利时，Safi Academy选择挺身而出。通过去中心化的加密安全网络，我们将认证的STEM与编程教育直接送到勇敢的阿富汗女性家中。",
  heroDesc2:
    "您的捐款不仅是慈善，更是捍卫尊严的行动。100%的捐款直接用于高速网络、加密电脑、卫星代理和导师薪资。",
  liveGoalLabel: "2026年实时学术援助目标",
  raisedOf: "已筹集 / 目标：",
  goal: "目标",
  boxTitle: "今天资助一名学生",
  boxSubtitle: "全球合规减税 • 立即出具官方收据",
  customAmount: "自定义金额",
  tabCard: "银行卡 / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "银行直接电汇",
  donateNowBtn: "立即安全捐赠",
  processingBtn: "正在建立安全通道...",
  bankSelectLabel: "选择银行账户及币种：",
  bankVerifiedBadge: "5个已验证账户",
  copyAllBtn: "复制所有信息",
  allCopiedText: "已全部复制！",
  copiedText: "已复制！",
  receiptHeader: "确认汇款凭证",
  submitReceiptBtn: "提交汇款凭据",
  bottomCtaBtn: "立即捐助，点亮未来",
  verifiedScholarship: "经认证的奖学金获得者"
};

const hi: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "होम",
  heroBadge: "आपातकालीन शैक्षिक सहायता • पाबंदी के खिलाफ",
  heroTitle1: "उन्होंने स्कूल के दरवाजे बंद कर दिए।",
  heroTitle2: "हमने पूरी कायनात के द्वार खोल दिए।",
  heroDesc1:
    "जब अफगानिस्तान में 14 लाख बच्चियों से शिक्षा का अधिकार छीना गया, तो साफी एकेडमी ने हार नहीं मानी। हम सुरक्षित एन्क्रिप्टेड नेटवर्क के जरिए कोडिंग और टेक शिक्षा सीधे बेटियों के घर पहुंचा रहे हैं।",
  heroDesc2:
    "आपका दान सिर्फ मदद नहीं, बल्कि अंधेरे के खिलाफ रोशनी है। आपकी राशि का 100% सीधे हाई-स्पीड इंटरनेट, लैपटॉप और स्कॉलरशिप पर खर्च होता है।",
  liveGoalLabel: "2026 शैक्षिक सहायता लक्ष्य",
  raisedOf: "एकत्रित / कुल लक्ष्य:",
  goal: "लक्ष्य",
  boxTitle: "आज ही किसी छात्रा को सक्षम बनाएं",
  boxSubtitle: "कर छूट योग्य • तत्काल आधिकारिक रसीद",
  customAmount: "अपनी पसंद की राशि",
  tabCard: "कार्ड / Apple Pay",
  tabPaypal: "पेपाल (PayPal)",
  tabBank: "बैंक ट्रांसफर",
  donateNowBtn: "अभी सुरक्षित दान करें",
  processingBtn: "सुरक्षित कनेक्शन बनाया जा रहा है...",
  bankSelectLabel: "बैंक खाता और मुद्रा चुनें:",
  bankVerifiedBadge: "5 सत्यापित बैंक खाते",
  copyAllBtn: "पूरी जानकारी कॉपी करें",
  allCopiedText: "सब कॉपी हो गया!",
  copiedText: "कॉपी हो गया!",
  receiptHeader: "बैंक ट्रांसफर रसीद दर्ज करें",
  submitReceiptBtn: "रसीद जमा करें",
  bottomCtaBtn: "अभी दान करें और भविष्य संवारें",
  verifiedScholarship: "सत्यापित छात्रवृत्ति प्राप्तकर्ता"
};

const it: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Home",
  heroBadge: "Aiuto Educativo di Emergenza • Sfida il Divieto",
  heroTitle1: "Hanno sbarrato le porte delle scuole.",
  heroTitle2: "Noi apriamo l'universo.",
  heroDesc1:
    "Quando a 1,4 milioni di ragazze afghane è stato negato il diritto allo studio, Safi Academy ha risposto con i fatti. Tramite reti crittografate, portiamo l'informatica direttamente nelle loro case.",
  heroDesc2:
    "La tua donazione è un atto di resistenza per la libertà. Il 100% delle risorse finanzia internet, computer portatili e borse di studio.",
  liveGoalLabel: "Obiettivo di aiuto accademico 2026",
  raisedOf: "raccolti di",
  goal: "obiettivo",
  boxTitle: "Sostieni una studentessa oggi",
  boxSubtitle: "Deducibile fiscalmente • Ricevuta immediata",
  customAmount: "Importo personalizzato",
  tabCard: "Carta / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Bonifico Bancario",
  donateNowBtn: "Dona in sicurezza adesso",
  processingBtn: "Connessione sicura in corso...",
  bankSelectLabel: "Seleziona conto bancario e valuta:",
  bankVerifiedBadge: "5 conti verificati",
  copyAllBtn: "Copia tutte le info",
  allCopiedText: "Tutto copiato!",
  copiedText: "Copiato!",
  receiptHeader: "Conferma ricevuta bonifico",
  submitReceiptBtn: "Invia ricevuta",
  bottomCtaBtn: "Dona ora e crea un futuro",
  verifiedScholarship: "Borsista verificata"
};

const pt: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Início",
  heroBadge: "Ajuda Educacional de Emergência • Desafiando a Proibição",
  heroTitle1: "Eles trancaram os portões das escolas.",
  heroTitle2: "Nós abrimos o universo.",
  heroDesc1:
    "Quando 1,4 milhão de meninas no Afeganistão perderam o direito de estudar, a Safi Academy não se calou. Por redes descentralizadas e criptografadas, levamos cursos de tecnologia a mulheres corajosas.",
  heroDesc2:
    "Sua doação é um ato de dignidade e coragem. 100% dos recursos chegam diretamente às alunas em bolsas, internet e computadores.",
  liveGoalLabel: "Meta de ajuda acadêmica 2026",
  raisedOf: "arrecadados de",
  goal: "meta",
  boxTitle: "Capacite uma estudante hoje",
  boxSubtitle: "Dedutível do imposto • Recibo oficial imediato",
  customAmount: "Valor personalizado",
  tabCard: "Cartão / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Transferência Bancária",
  donateNowBtn: "Doar com segurança agora",
  processingBtn: "Preparando túnel seguro...",
  bankSelectLabel: "Selecione a conta e moeda:",
  bankVerifiedBadge: "5 contas verificadas",
  copyAllBtn: "Copiar todos os dados",
  allCopiedText: "Copiado com sucesso!",
  copiedText: "Copiado!",
  receiptHeader: "Confirmar comprovante bancário",
  submitReceiptBtn: "Enviar comprovante",
  bottomCtaBtn: "Doe agora e abra um futuro",
  verifiedScholarship: "Bolsista verificada"
};

const ja: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "ホーム",
  heroBadge: "緊急教育支援 • 禁止令への挑戦",
  heroTitle1: "彼らは学校の門を閉ざした。",
  heroTitle2: "私たちは宇宙の扉を開く。",
  heroDesc1:
    "アフガニスタンで140万人の少女から教育が奪われた時、Safi Academyは立ち上がりました。暗号化された安全なネットワークを通じて、最先端のプログラミング教育を女性たちの自宅へ直接届けています。",
  heroDesc2:
    "あなたのご寄付は単なる慈善ではなく、尊厳と自由のための力です。100%が直接インターネット回線やPC、奨学金として届けられます。",
  liveGoalLabel: "2026年 学術支援目標（ライブ）",
  raisedOf: "達成額 / 目標：",
  goal: "目標",
  boxTitle: "今日、勇敢な学生を支える",
  boxSubtitle: "税控除対象 • 即時公式領収書発行",
  customAmount: "任意の金額",
  tabCard: "カード / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "銀行直接振込",
  donateNowBtn: "安全に今すぐ寄付する",
  processingBtn: "暗号化接続を準備中...",
  bankSelectLabel: "銀行口座と通貨を選択：",
  bankVerifiedBadge: "5つの認証済み口座",
  copyAllBtn: "すべての情報をコピー",
  allCopiedText: "すべてコピーしました！",
  copiedText: "コピー完了！",
  receiptHeader: "振込受領証の確認・送信",
  submitReceiptBtn: "受領証を送信する",
  bottomCtaBtn: "今すぐ寄付して未来を拓く",
  verifiedScholarship: "認定奨学生"
};

const ko: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "홈",
  heroBadge: "긴급 교육 지원 • 교육 금지에 맞서다",
  heroTitle1: "그들은 학교 문을 닫았습니다.",
  heroTitle2: "우리는 우주의 문을 엽니다.",
  heroDesc1:
    "아프가니스탄의 140만 명의 여학생들이 배움의 권리를 빼앗겼을 때, 사피 아카데미는 침묵하지 않았습니다. 탈중앙화 암호화 네트워크를 통해 코딩과 기술 교육을 용기 있는 여성들에게 전달합니다.",
  heroDesc2:
    "여러분의 후원은 단순한 기부가 아닌 자유를 향한 행동입니다. 기부금의 100%가 고속 인터넷, 노트북 및 장학금에 직접 지원됩니다.",
  liveGoalLabel: "2026년 실시간 교육 지원 목표",
  raisedOf: "모금액 / 목표액:",
  goal: "목표",
  boxTitle: "오늘 한 명의 학생에게 희망을",
  boxSubtitle: "세금 공제 가능 • 즉시 공식 영수증 발급",
  customAmount: "직접 입력 금액",
  tabCard: "카드 / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "해외 계좌 송금",
  donateNowBtn: "안전하게 후원하기",
  processingBtn: "보안 터널 연결 중...",
  bankSelectLabel: "은행 계좌 및 통화 선택:",
  bankVerifiedBadge: "5개 인증 계좌",
  copyAllBtn: "모든 정보 복사",
  allCopiedText: "모두 복사되었습니다!",
  copiedText: "복사됨!",
  receiptHeader: "송금 영수증 제출 및 확인",
  submitReceiptBtn: "영수증 제출",
  bottomCtaBtn: "지금 후원하고 미래를 열어주세요",
  verifiedScholarship: "인증된 장학생"
};

const nl: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Home",
  heroBadge: "Noodhulp voor Onderwijs • Trotseer het Verbod",
  heroTitle1: "Zij sloten de schoolpoorten.",
  heroTitle2: "Wij openen het universum.",
  heroDesc1:
    "Toen 1,4 miljoen meisjes in Afghanistan hun recht op onderwijs werd ontnomen, weigerde Safi Academy toe te kijken. Via versleutelde netwerken brengen wij programmeeronderwijs direct naar moedige vrouwen.",
  heroDesc2:
    "Uw donatie is een daad van verzet en menselijkheid. 100% gaat rechtstreeks naar internet, laptops en studiebeurzen.",
  liveGoalLabel: "Live Onderwijsdoel 2026",
  raisedOf: "opgehaald van",
  goal: "doel",
  boxTitle: "Steun vandaag een studente",
  boxSubtitle: "Fiscaal aftrekbaar • Direct digitaal bewijs",
  customAmount: "Aangepast bedrag",
  tabCard: "Kaart / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Bankoverschrijving",
  donateNowBtn: "Nu veilig doneren",
  processingBtn: "Beveiligde verbinding opzetten...",
  bankSelectLabel: "Selecteer bankrekening en valuta:",
  bankVerifiedBadge: "5 geverifieerde rekeningen",
  copyAllBtn: "Kopieer alle gegevens",
  allCopiedText: "Alles gekopieerd!",
  copiedText: "Gekopieerd!",
  receiptHeader: "Bevestig overschrijvingsbewijs",
  submitReceiptBtn: "Bewijs versturen",
  bottomCtaBtn: "Doneer nu en open de toekomst",
  verifiedScholarship: "Geverifieerde beursontvanger"
};

const uz: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Bosh sahifa",
  heroBadge: "Favqulodda ta'lim yordami • Taqiqlarga qaramay",
  heroTitle1: "Ular maktab eshiklarini yopishdi.",
  heroTitle2: "Biz esa koinotni ochamiz.",
  heroDesc1:
    "Afg'onistonda 1,4 million qiz va yosh ayol ta'lim olish huquqidan mahrum etilganda, Safi Academy jim turmadi. Shifrlangan tarmoqlar orqali biz jasur ayollarga dasturlash va texnologiyalarni to'g'ridan-to'g'ri o'rgatmoqdamiz.",
  heroDesc2:
    "Sizning ehsoningiz shunchaki xayriya emas, balki qorong'ulikka qarshi kurashdir. Har bir dollar to'liq internet, noutbuklar va stipendiyalarga yo'naltiriladi.",
  liveGoalLabel: "2026-yilgi jonli ta'lim maqsadi",
  raisedOf: "yig'ilgan / maqsad:",
  goal: "maqsad",
  boxTitle: "Bugun bir talabani qo'llab-quvvatlang",
  boxSubtitle: "Soliq imtiyoziga ega • Rasmiy kvitansiya darhol beriladi",
  customAmount: "Boshqa miqdor",
  tabCard: "Karta / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Bank orqali o'tkazma",
  donateNowBtn: "Xavfsiz ehson qilish",
  processingBtn: "Xavfsiz kanal tayyorlanmoqda...",
  bankSelectLabel: "Bank hisobi va valyutani tanlang:",
  bankVerifiedBadge: "5 ta tasdiqlangan hisob",
  copyAllBtn: "Barcha ma'lumotlarni nusxalash",
  allCopiedText: "Hammasi nusxalandi!",
  copiedText: "Nusxalandi!",
  receiptHeader: "To'lov kvitansiyasini tasdiqlash",
  submitReceiptBtn: "Kvitansiyani yuborish",
  bottomCtaBtn: "Hozir ehson qiling va kelajak oching",
  verifiedScholarship: "Tasdiqlangan stipendiat"
};

const id: DonateTranslation = {
  ...en,
  isRtl: false,
  home: "Beranda",
  heroBadge: "Bantuan Pendidikan Darurat • Menentang Larangan",
  heroTitle1: "Mereka mengunci gerbang sekolah.",
  heroTitle2: "Kami membuka semesta.",
  heroDesc1:
    "Ketika 1,4 juta anak perempuan dan wanita muda di Afghanistan dirampas hak pendidikannya, Safi Academy menolak berdiam diri. Melalui jaringan terenkripsi yang aman, kami membawa pendidikan coding dan teknologi langsung ke rumah wanita tangguh.",
  heroDesc2:
    "Donasi Anda bukan sekadar amal, melainkan tindakan nyata demi kemerdekaan berpikir. 100% donasi langsung dialokasikan untuk kuota internet, laptop, dan beasiswa.",
  liveGoalLabel: "Target Bantuan Akademik 2026",
  raisedOf: "terkumpul dari",
  goal: "target",
  boxTitle: "Bantu seorang siswi hari ini",
  boxSubtitle: "Dapat dikurangkan dari pajak • Tanda terima resmi instan",
  customAmount: "Jumlah Kustom",
  tabCard: "Kartu / Apple Pay",
  tabPaypal: "PayPal",
  tabBank: "Transfer Bank",
  donateNowBtn: "Donasi Aman Sekarang",
  processingBtn: "Menyiapkan terowongan aman...",
  bankSelectLabel: "Pilih Rekening Bank & Mata Uang:",
  bankVerifiedBadge: "5 Rekening Terverifikasi",
  copyAllBtn: "Salin Semua Info",
  allCopiedText: "Semua Tersalin!",
  copiedText: "Tersalin!",
  receiptHeader: "Konfirmasi Bukti Transfer",
  submitReceiptBtn: "Kirim Bukti Transfer",
  bottomCtaBtn: "Donasi Sekarang & Buka Masa Depan",
  verifiedScholarship: "Penerima Beasiswa Terverifikasi"
};

export const donateTranslationsMap: Record<string, DonateTranslation> = {
  en,
  fa,
  ps,
  ar,
  ur,
  de,
  fr,
  es,
  ru,
  tr,
  zh,
  hi,
  it,
  pt,
  ja,
  ko,
  nl,
  uz,
  id,
};

export function getDonateTranslation(locale: string): DonateTranslation {
  const normalized = (locale || "en").toLowerCase();
  return donateTranslationsMap[normalized] || donateTranslationsMap.en;
}
