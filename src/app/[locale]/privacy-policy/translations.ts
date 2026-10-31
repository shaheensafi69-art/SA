// ============================================================================
// PRIVACY POLICY TRANSLATIONS (19 OFFICIAL LANGUAGES - COLOCATED)
// ============================================================================

export interface PrivacySectionItem {
  id: string;
  title: string;
  isHighlight?: boolean;
}

export interface PrivacyHighlightItem {
  title: string;
  desc: string;
  badge: string;
}

export interface PrivacyTranslation {
  isRtl: boolean;
  badge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSub: string;
  entityLabel: string;
  regLabel: string;
  lawLabel: string;
  highlights: PrivacyHighlightItem[];
  tocTitle: string;
  tocCount: string;
  sections: PrivacySectionItem[];
  legalHelp: {
    title: string;
    desc: string;
    btn: string;
  };
  section1: {
    secBadge: string;
    title: string;
    desc: string;
    legalEntityLabel: string;
    companyNumLabel: string;
    hqLabel: string;
    hqValue: string;
  };
  section2: {
    secBadge: string;
    title: string;
    desc: string;
    cards: { title: string; desc: string }[];
  };
  section3: {
    secBadge: string;
    title: string;
    badge: string;
    desc: string;
    rulesTitle: string;
    bullets: string[];
  };
  section4: {
    secBadge: string;
    title: string;
    desc: string;
    items: { title: string; desc: string }[];
  };
  section5: {
    secBadge: string;
    title: string;
    desc: string;
    cookies: { title: string; desc: string; badge: string }[];
    adHeading: string;
    adIntro: string;
    adBullets: { lead: string; text: string }[];
  };
  section6: {
    secBadge: string;
    title: string;
    desc: string;
    retentionTitle: string;
    retentionDesc: string;
    transfersTitle: string;
    transfersDesc: string;
  };
  section7: {
    secBadge: string;
    title: string;
    desc: string;
    rights: { title: string; desc: string }[];
    deletionBox: {
      title: string;
      sub: string;
      btn: string;
    };
  };
  section8: {
    secBadge: string;
    title: string;
    desc: string;
    emailLabel: string;
    btn: string;
    icoText: string;
  };
}

export const privacyTranslations: Record<string, PrivacyTranslation> = {
  "en": {
    "isRtl": false,
    "badge": "Official Data Charter & Privacy Policy",
    "heroTitleLine1": "Your Privacy & Data",
    "heroTitleLine2": "Are Fully Protected",
    "heroSub": "Safi Academy is committed to upholding the highest global data protection standards. Review our data controller credentials, processing foundations, and statutory rights.",
    "entityLabel": "Entity: Safi International Capital LTD",
    "regLabel": "Reg: 17063286 (UK)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Zero Data Selling",
        "desc": "We strictly never sell or rent your personal information to third-party data brokers.",
        "badge": "Guaranteed Standard"
      },
      {
        "title": "Affiliate Transparency",
        "desc": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
        "badge": "FTC Compliant"
      },
      {
        "title": "Enterprise Encryption",
        "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data.",
        "badge": "Cryptographic Guard"
      },
      {
        "title": "Full GDPR Control",
        "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time.",
        "badge": "Statutory Rights"
      }
    ],
    "tocTitle": "Navigation Index",
    "tocCount": "8 Sections",
    "sections": [
      {
        "id": "controller",
        "title": "1. Data Controller"
      },
      {
        "id": "collection",
        "title": "2. Information We Collect"
      },
      {
        "id": "affiliates",
        "title": "3. Affiliates & Third Parties",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. How We Use Data"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & Tracking"
      },
      {
        "id": "security",
        "title": "6. Security & Storage"
      },
      {
        "id": "rights",
        "title": "7. Your Legal Rights"
      },
      {
        "id": "contact",
        "title": "8. Privacy Inquiries"
      }
    ],
    "legalHelp": {
      "title": "Have Data Questions?",
      "desc": "Inquiries regarding platform data handling, privacy compliance, or regulatory rights.",
      "btn": "Email Privacy Team"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Data Controller & Legal Entity",
      "desc": "Safi International Capital LTD is the officially designated Data Controller for all personal data collected and processed via Safi Academy.",
      "legalEntityLabel": "Legal Entity",
      "companyNumLabel": "Company Number",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Information We Collect",
      "desc": "We collect personal data strictly to deliver educational courses, provide authenticated access, and maintain platform security.",
      "cards": [
        {
          "title": "Identity & Profile Data",
          "desc": "Full name, email address, encrypted authentication hashes, language preference, avatar, and enrolled course history."
        },
        {
          "title": "Billing & Transactions",
          "desc": "Order history, invoices, and transaction references. Payment card details are processed directly by Stripe with Level 1 PCI-DSS vaulting."
        },
        {
          "title": "Device & Technical Logs",
          "desc": "IP address, browser type, operating system version, access timestamps, and firewall audit logs for anti-fraud monitoring."
        },
        {
          "title": "Gamification & Progress",
          "desc": "Quiz scores, course completion tracking, assignment submissions, academy points, and public Wall of Fame leaderboards."
        }
      ]
    },
    "section3": {
      "secBadge": "Section 3 • High Importance",
      "title": "Third-Party Links & Affiliate Partners",
      "badge": "Affiliate Disclosure",
      "desc": "To bridge education with practical implementation, Safi Academy recommends vetted corporate service providers. Our US Business Formation portal features referral links to Registered Agents Inc and affiliate networks like AWIN.",
      "rulesTitle": "Key Operating Rules for Recommended Third Parties:",
      "bullets": [
        "Clicking partner referral links may save an affiliate tracking parameter or cookie in your browser to verify that the referral originated from Safi Academy.",
        "Safi Academy never shares your passwords, student dossiers, or educational records with Registered Agents Inc or affiliate networks.",
        "Any corporate, personal, or billing details submitted to Registered Agents Inc are collected directly by them under their official Privacy Policy.",
        "We receive an affiliate referral commission on eligible transactions at zero additional cost to you."
      ]
    },
    "section4": {
      "secBadge": "Section 4",
      "title": "Lawful Basis & Use of Data",
      "desc": "We only process personal data when permitted by law under Article 6 of the UK GDPR:",
      "items": [
        {
          "title": "Contractual Fulfillment",
          "desc": "Delivering courses, granting video streaming access, issuing certificates, and processing student subscriptions."
        },
        {
          "title": "Legitimate Interests",
          "desc": "Continuously improving curriculum, defending our infrastructure against malicious attacks, and optimizing platform performance."
        },
        {
          "title": "Statutory & Regulatory Obligations",
          "desc": "Maintaining audit-compliant corporate records and VAT/tax documentation required by UK tax and company authorities."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "Cookies & Tracking Technologies",
      "desc": "Our platform utilizes session tokens, local storage, and cookies to ensure authenticated sessions, track progress, and protect user security.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication tokens, session security, and firewall verification.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Anonymous lesson playback latency and interface interaction metrics.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Activated strictly when clicking outbound verified partner links (e.g., Registered Agents Inc).",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense & Advertising Cookies",
          "desc": "Used by Google and verified partners to serve relevant advertisements based on visits to this and other websites across the Internet.",
          "badge": "Third-Party (Opt-Out Available)"
        }
      ],
      "adHeading": "Google AdSense & Third-Party Advertising Compliance",
      "adIntro": "Safi Academy uses Google AdSense and accredited third-party advertising partners to display non-intrusive advertisements on select community and feed pages.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors",
          "text": "Google and advertising networks utilize cookies to deliver ads based on prior browsing activity on our platform and third-party sites."
        },
        {
          "lead": "DoubleClick DART Cookie",
          "text": "Google's advertising cookie enables ads tailored to users based on visits to educational portals and web destinations."
        },
        {
          "lead": "Personalized Ad Opt-Out",
          "text": "Students can opt out of personalized ad tracking anytime via Google Ads Settings (adssettings.google.com) or AboutAds.info."
        },
        {
          "lead": "Privacy Safeguards",
          "text": "Safi Academy never transfers student identity records to ad brokers and limits ad units to non-disruptive, native feed placements."
        }
      ]
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "Data Security & Storage Protocols",
      "desc": "We safeguard user data using multi-layered physical, administrative, and technological controls. Data transmissions utilize modern TLS 1.3 cryptographic protocols with automated vulnerability scanning.",
      "retentionTitle": "Data Retention Period",
      "retentionDesc": "We store student records for as long as your account remains active, plus mandatory statutory periods (up to 6 years for UK tax and financial accounting records).",
      "transfersTitle": "International Transfers",
      "transfersDesc": "Cross-border data transfers adhere strictly to UK International Data Transfer Agreements (IDTA) and standard contractual clauses (SCC) with encrypted cloud storage."
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "Your Statutory Rights (UK GDPR)",
      "desc": "Under UK and EU data protection regulations, you hold enforceable statutory rights over your personal data:",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Request a complete digital copy of all personal records we hold."
        },
        {
          "title": "Right to Rectification",
          "desc": "Correct outdated, inaccurate, or incomplete information."
        },
        {
          "title": "Right to Erasure",
          "desc": "Request permanent deletion of your account (\"Right to be Forgotten\")."
        },
        {
          "title": "Right to Restriction",
          "desc": "Temporarily freeze data processing during dispute resolution."
        },
        {
          "title": "Right to Portability",
          "desc": "Obtain your course records in an open, machine-readable format."
        },
        {
          "title": "Right to Object",
          "desc": "Object to processing founded solely upon legitimate commercial interests."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account?",
        "sub": "Submit an automated data purge request through our self-service GDPR portal.",
        "btn": "Open Deletion Portal"
      }
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "Privacy Inquiries & ICO Escalation",
      "desc": "For questions regarding this policy, to exercise your data rights, or to submit a formal privacy inquiry, contact our Data Protection Team at:",
      "emailLabel": "Data Protection Officer Email",
      "btn": "Send Privacy Email",
      "icoText": "If you are dissatisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO), the UK's independent regulatory body for data privacy (ico.org.uk)."
    }
  },
  "fa": {
    "isRtl": true,
    "badge": "منشور رسمی داده‌ها و حریم خصوصی",
    "heroTitleLine1": "حریم خصوصی و داده‌های شما",
    "heroTitleLine2": "کاملاً تحت حفاظت است",
    "heroSub": "آکادمی صافی متعهد به بالاترین استانداردهای حفاظت از داده‌ها در سطح جهانی است. اطلاعات ثبتی، مبانی پردازش داده و حقوق قانونی خود را در این بخش بررسی فرمایید.",
    "entityLabel": "شخصیت حقوقی: Safi International Capital LTD",
    "regLabel": "شماره ثبت: 17063286 (بریتانیا)",
    "lawLabel": "قوانین GDPR بریتانیا و DPA 2018",
    "highlights": [
      {
        "title": "عدم فروش اطلاعات",
        "desc": "ما هرگز اطلاعات هویتی و شخصی شما را به دلالان داده یا اشخاص ثالث نمی‌فروشیم یا اجاره نمی‌دهیم.",
        "badge": "استاندارد تضمین‌شده"
      },
      {
        "title": "شفافیت در همکاری تجاری",
        "desc": "افشای شفاف کوکی‌های معرف و پیوند با شرکای معتبر مانند Registered Agents Inc.",
        "badge": "منطبق با الزامات FTC"
      },
      {
        "title": "رمزنگاری سازمانی",
        "desc": "رمزنگاری پیشرفته TLS/SSL در تمامی دوره‌های آموزشی، گواهی‌ها و پرونده‌های آکادمی.",
        "badge": "حفاظت رمزنگاری‌شده"
      },
      {
        "title": "کنترل کامل بر مبنای GDPR",
        "desc": "حقوق نامحدود برای دسترسی، اصلاح، انتقال یا پاکسازی دائمی داده‌های حساب در هر زمان.",
        "badge": "حقوق قانونی دانش‌آموز"
      }
    ],
    "tocTitle": "فهرست دسترسی سریع",
    "tocCount": "۸ بخش قانونی",
    "sections": [
      {
        "id": "controller",
        "title": "۱. کنترل‌کننده داده‌ها"
      },
      {
        "id": "collection",
        "title": "۲. اطلاعات جمع‌آوری‌شده"
      },
      {
        "id": "affiliates",
        "title": "۳. شرکای تجاری و افشای همکاری",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "۴. مبانی قانونی استفاده از داده"
      },
      {
        "id": "cookies",
        "title": "۵. کوکی‌ها و فناوری‌های ردیابی"
      },
      {
        "id": "security",
        "title": "۶. امنیت و مدت نگهداری"
      },
      {
        "id": "rights",
        "title": "۷. حقوق قانونی شما (GDPR)"
      },
      {
        "id": "contact",
        "title": "۸. استعلامات حریم خصوصی"
      }
    ],
    "legalHelp": {
      "title": "سؤالی درباره حریم خصوصی دارید؟",
      "desc": "استعلام در خصوص پردازش داده‌ها، اعمال حقوق کاربری یا مطابقت با مقررات بین‌المللی.",
      "btn": "ارسال ایمیل به تیم حریم خصوصی"
    },
    "section1": {
      "secBadge": "بخش ۱",
      "title": "۱. کنترل‌کننده داده‌ها و هویت حقوقی",
      "desc": "شرکت Safi International Capital LTD کنترل‌کننده رسمی داده‌ها (Data Controller) برای کلیه اطلاعات شخصی جمع‌آوری‌شده از طریق پلتفرم آکادمی صافی می‌باشد.",
      "legalEntityLabel": "شخصیت حقوقی رسمی",
      "companyNumLabel": "شماره ثبت شرکتی",
      "hqLabel": "آدرس دفتر مرکزی",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "بخش ۲",
      "title": "۲. اطلاعات جمع‌آوری‌شده توسط ما",
      "desc": "ما اطلاعات هویتی و تحصیلی شما را صرفاً جهت ارائه خدمات آموزشی، احراز هویت امن و بهینه‌سازی پلتفرم گردآوری می‌نماییم.",
      "cards": [
        {
          "title": "اطلاعات هویتی و نمایه",
          "desc": "نام و نام خانوادگی، نشانی ایمیل، رمزهای رمزنگاری‌شده، اولویت زبانی، تصویر نمایه و تاریخچه دوره‌های ثبت‌نام‌شده."
        },
        {
          "title": "پرداخت‌ها و صورت‌حساب",
          "desc": "سوابق سفارش‌ها، فاکتورها و شناسه‌های تراکنش. اطلاعات کارت‌های بانکی مستقیماً توسط درگاه Stripe با استاندارد PCI-DSS سطح ۱ پردازش می‌شود."
        },
        {
          "title": "داده‌های فنی و گزارش‌های امنیتی",
          "desc": "نشانی IP، نوع مرورگر، نسخه سیستم‌عامل، زمان‌های اتصال و گزارش‌های فایروال جهت پیشگیری از کلاهبرداری و حملات سایبری."
        },
        {
          "title": "پیشرفت درسی و امتیازات آکادمی",
          "desc": "نمرات آزمون‌ها، تکالیف ارسال‌شده، امتیازات کسب‌شده، نشان‌های افتخار و رتبه‌بندی در تالار افتخارات عمومی."
        }
      ]
    },
    "section3": {
      "secBadge": "بخش ۳ • اهمیت ویژه",
      "title": "پیوندهای شخص ثالث و شرکای همکاری تجاری",
      "badge": "افشاگری همکاری تجاری",
      "desc": "برای پیوند میان آموزش‌های نظری و راه‌اندازی واقعی کسب‌وکارها، آکادمی صافی شرکت‌های معتبر جهانی را معرفی می‌کند. در بخش ثبت شرکت ایالات متحده، پیوندهای معرف به شرکت Registered Agents Inc و شبکه‌های وابسته مانند AWIN قرار داده شده است.",
      "rulesTitle": "اصول حاکم بر پیوندها و خدمات اشخاص ثالث:",
      "bullets": [
        "کلیک بر روی لینک‌های معرفی ممکن است کوکی یا پارامتر ردیابی همکار را در مرورگر شما ذخیره کند تا ارجاع داده شدن از سوی آکادمی صافی تأیید شود.",
        "آکادمی صافی هرگز رمز عبور، اطلاعات شخصی یا پرونده‌های تحصیلی شما را با Registered Agents Inc یا شبکه‌های وابسته به اشتراک نمی‌گذارد.",
        "کلیه اطلاعات ثبت شرکت و پرداخت‌های شما در وبسایت Registered Agents Inc مستقیماً توسط آن شرکت و مطابق با سیاست حریم خصوصی رسمی خودشان جمع‌آوری می‌گردد.",
        "در صورت خرید خدمات از طریق پیوندهای ما، ممکن است کمیسیون همکاری دریافت کنیم بدون این‌که هزینه اضافی برای شما ایجاد گردد."
      ]
    },
    "section4": {
      "secBadge": "بخش ۴",
      "title": "مبانی قانونی و نحوه استفاده از داده‌ها",
      "desc": "پردازش اطلاعات شما منحصراً بر اساس مبانی قانونی ماده ۶ مقررات عمومی حفاظت از داده‌های بریتانیا (UK GDPR) انجام می‌پذیرد:",
      "items": [
        {
          "title": "اجرای تعهدات قراردادی",
          "desc": "ارائه دسترسی به ویدیوها و دوره‌ها، تصحیح تکالیف، صدور مدارک فارغ‌التحصیلی و پردازش اشتراک‌های تحصیلی."
        },
        {
          "title": "منافع مشروع پلتفرم",
          "desc": "بهبود مستمر محتوای دروس، ایمن‌سازی سرورها در برابر حملات سایبری و تحلیل الگوهای یادگیری دانشجویان."
        },
        {
          "title": "تعهدات قانونی و مالیاتی",
          "desc": "نگهداری سوابق مالی و تراکنش‌های حسابداری بر اساس الزامات قانونی ثبت شرکت‌ها و قوانین مالیاتی بریتانیا."
        }
      ]
    },
    "section5": {
      "secBadge": "بخش ۵",
      "title": "کوکی‌ها و فناوری‌های ردیابی",
      "desc": "پلتفرم ما از نشانه‌های نشست، حافظه محلی و کوکی‌ها برای احراز هویت امن و شخصی‌سازی فضای آموزش استفاده می‌کند.",
      "cookies": [
        {
          "title": "کوکی‌های کاملاً ضروری",
          "desc": "توکن‌های احراز هویت، حفظ امنیت ورود به حساب و عملکرد فایروال.",
          "badge": "همواره فعال"
        },
        {
          "title": "کوکی‌های عملکرد و آمار",
          "desc": "سنجش سرعت بارگذاری ویدیوها و نحوه تعامل با بخش‌های پلتفرم به صورت ناشناس.",
          "badge": "قابل تنظیم"
        },
        {
          "title": "کوکی‌های معرف و همکاران تجاری",
          "desc": "صرفاً هنگام کلیک بر روی پیوندهای خروجی شرکای معتبر (نظیر Registered Agents Inc) فعال می‌گردند.",
          "badge": "فقط در لینک‌های خروجی"
        },
        {
          "title": "کوکی‌های تبلیغاتی Google AdSense",
          "desc": "استفاده توسط گوگل و شرکای تبلیغاتی جهت نمایش تبلیغات مرتبط بر اساس بازدید از این سایت و سایر وب‌سایت‌های اینترنت.",
          "badge": "شخص ثالث (امکان انصراف)"
        }
      ],
      "adHeading": "انطباق با قوانین تبلیغاتی Google AdSense و اشخاص ثالث",
      "adIntro": "آکادمی صافی از خدمات تبلیغاتی Google AdSense و شبکه‌های مورد تأیید برای نمایش تبلیغات غیرمزاحم در بخش‌های عمومی و فید جامعه استفاده می‌نماید.",
      "adBullets": [
        {
          "lead": "فروشندگان شخص ثالث",
          "text": "گوگل و شبکه‌های تبلیغاتی از کوکی‌ها برای نمایش آگهی بر اساس بازدیدهای قبلی کاربران از آکادمی صافی و وب‌سایت‌های دیگر بهره می‌برند."
        },
        {
          "lead": "کوکی DoubleClick DART",
          "text": "استفاده گوگل از این کوکی امکان نمایش آگهی‌های مرتبط و متناسب با موضوعات آموزشی را فراهم می‌سازد."
        },
        {
          "lead": "امکان غیرفعال‌سازی تبلیغات شخصی‌سازی‌شده",
          "text": "دانشجویان می‌توانند با مراجعه به تنظیمات تبلیغات گوگل (adssettings.google.com) یا AboutAds.info تبلیغات شخصی را غیرفعال کنند."
        },
        {
          "lead": "تدابیر حفاظت از حریم خصوصی",
          "text": "آکادمی صافی هرگز اطلاعات شخصی کاربران را به دلالان تبلیغاتی واگذار نمی‌کند و محل‌های تبلیغات را به صورت همخوان و بومی طراحی کرده است."
        }
      ]
    },
    "section6": {
      "secBadge": "بخش ۶",
      "title": "امنیت و پروتکل‌های ذخیره‌سازی داده‌ها",
      "desc": "ما داده‌های دانشجویان را با بهره‌گیری از تدابیر فیزیکی، سازمانی و فناورانه چندلایه محافظت می‌کنیم. انتقال اطلاعات با استفاده از پروتکل‌های رمزنگاری مدرن TLS 1.3 انجام می‌شود.",
      "retentionTitle": "مدت‌زمان نگهداری اطلاعات",
      "retentionDesc": "اطلاعات حساب تا زمان فعال بودن حساب کاربری و پس از آن بر اساس مهلت‌های قانونی مقرر (حداکثر ۶ سال برای اسناد حسابداری و مالیاتی بریتانیا) نگهداری می‌شود.",
      "transfersTitle": "انتقال بین‌المللی اطلاعات",
      "transfersDesc": "انتقال فرامرزی داده‌ها کاملاً منطبق بر توافق‌نامه‌های بین‌المللی انتقال داده بریتانیا (IDTA) و بندهای قراردادی استاندارد (SCC) بر روی سرورهای ابری امن صورت می‌گیرد."
    },
    "section7": {
      "secBadge": "بخش ۷",
      "title": "حقوق قانونی شما (بر اساس مقررات UK GDPR)",
      "desc": "بر اساس قوانین حفاظت از داده‌های بریتانیا و اتحادیه اروپا، شما از حقوق قانونی و قابل پیگیری زیر برخوردار می‌باشید:",
      "rights": [
        {
          "title": "حق دسترسی به داده‌ها",
          "desc": "درخواست دریافت یک نسخه دیجیتال کامل از تمام سوابق و اطلاعات ذخیره‌شده شما."
        },
        {
          "title": "حق تصحیح اطلاعات",
          "desc": "اصلاح یا به‌روزرسانی هرگونه داده نادرست، قدیمی یا ناقص در سیستم."
        },
        {
          "title": "حق امحا و فراموشی",
          "desc": "درخواست پاکسازی همیشگی و غیرقابل بازگشت پرونده و حساب کاربری («حق فراموش شدن»)."
        },
        {
          "title": "حق محدودسازی پردازش",
          "desc": "توقف موقت پردازش داده‌ها در جریان بررسی اعتراضات یا اختلافات."
        },
        {
          "title": "حق انتقال داده‌ها",
          "desc": "دریافت سوابق دوره‌ها و پیشرفت تحصیلی در قالب‌های ساختاریافته و استاندارد رایانه‌ای."
        },
        {
          "title": "حق اعتراض قانونی",
          "desc": "اعتراض به هرگونه پردازش داده که منحصراً بر پایه منافع تجاری استوار باشد."
        }
      ],
      "deletionBox": {
        "title": "آیا مایل به حذف همیشگی حساب خود هستید؟",
        "sub": "می‌توانید درخواست امحای خودکار داده‌های خود را مستقیماً از طریق پورتال اختصاصی GDPR ثبت فرمایید.",
        "btn": "ورود به پورتال امحای حساب"
      }
    },
    "section8": {
      "secBadge": "بخش ۸",
      "title": "استعلامات حریم خصوصی و ارتباط با مرجع نظارتی",
      "desc": "جهت طرح هرگونه سؤال در خصوص این منشور، اعمال حقوق کاربری یا ارسال درخواست رسمی، با تیم حفاظت از داده‌ها در ارتباط باشید:",
      "emailLabel": "ایمیل مسئول حفاظت از داده‌ها (DPO)",
      "btn": "ارسال ایمیل حریم خصوصی",
      "icoText": "در صورت عدم رضایت از نحوه پاسخگویی، حق دارید مراتب را به دفتر کمیسر اطلاعات بریتانیا (ICO) به نشانی ico.org.uk ارجاع نمایید."
    }
  },
  "ps": {
    "isRtl": true,
    "badge": "د معلوماتو رسمي منشور او د محرمیت تګلاره",
    "heroTitleLine1": "ستاسو محرمیت او شخصي معلومات",
    "heroTitleLine2": "په بشپړ ډول خوندي دي",
    "heroSub": "صافي اکاډمۍ د معلوماتو ساتنې لوړو نړیوالو معیارونو ته ژمنه ده. دلته زموږ حقوقي اسناد، د پروسس اصول او خپل قانوني حقونه وګورئ.",
    "entityLabel": "حقوقي شرکت: Safi International Capital LTD",
    "regLabel": "د ثبت شمیره: 17063286 (انګلستان)",
    "lawLabel": "د انګلستان GDPR او DPA 2018 قوانین",
    "highlights": [
      {
        "title": "د معلوماتو نه پلورل",
        "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمګړو یا د معلوماتو پلورونکو ته نه ورکوو.",
        "badge": "تضمین شوی معیار"
      },
      {
        "title": "په شراکت کې روڼتیا",
        "desc": "د Registered Agents Inc په څېر رسمي همکارانو او معرفي کوکیز په اړه بشپړ وضاحت.",
        "badge": "د FTC معیارونو سره سم"
      },
      {
        "title": "پرمختللی انکریپشن",
        "desc": "په ټولو درسي کورسونو، اسنادو او معلوماتو کې د TLS/SSL بشپړ انکریپشن شتون لري.",
        "badge": "کوډ شوې ساتنه"
      },
      {
        "title": "د GDPR بشپړ کنټرول",
        "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، سمون او دایمي ړنګولو بشپړ حق.",
        "badge": "د زده کوونکي قانوني حقونه"
      }
    ],
    "tocTitle": "ګړندی لارښود",
    "tocCount": "۸ قانوني برخې",
    "sections": [
      {
        "id": "controller",
        "title": "۱. د معلوماتو کنټرول کوونکی"
      },
      {
        "id": "collection",
        "title": "۲. راټول شوي معلومات"
      },
      {
        "id": "affiliates",
        "title": "۳. سوداګریز همکاران او روڼتیا",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "۴. د معلوماتو کارولو قانوني لارې"
      },
      {
        "id": "cookies",
        "title": "۵. کوکیز او تعقیبي ټیکنالوژي"
      },
      {
        "id": "security",
        "title": "۶. امنیت او د ساتلو موده"
      },
      {
        "id": "rights",
        "title": "۷. ستاسو قانوني حقونه (GDPR)"
      },
      {
        "id": "contact",
        "title": "۸. د محرمیت اړیکې"
      }
    ],
    "legalHelp": {
      "title": "د محرمیت په اړه پوښتنه لرئ؟",
      "desc": "د خپلو شخصي معلوماتو د ساتنې او خپلو حقوقو په اړه زموږ قانوني څانګې سره اړیکه ونیسئ.",
      "btn": "د محرمیت ډلې ته برېښنالیک ولېږئ"
    },
    "section1": {
      "secBadge": "۱ برخه",
      "title": "۱. د معلوماتو رسمي کنټرول کوونکی او شرکت",
      "desc": "شرکت Safi International Capital LTD په رسمي توګه د هغو ټولو معلوماتو مسؤل او کنټرول کوونکی دی چې د صافي اکاډمۍ له لارې راټولیږي.",
      "legalEntityLabel": "رسمي حقوقي شرکت",
      "companyNumLabel": "د شرکت د ثبت شمیره",
      "hqLabel": "د مرکزي دفتر پته",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "۲ برخه",
      "title": "۲. هغه معلومات چې موږ یې راټولوو",
      "desc": "موږ ستاسو معلومات یوازې د زده کړې د وړاندې کولو، خوندي ننوتلو او پلاتفورم د کیفیت لوړولو لپاره کاروو.",
      "cards": [
        {
          "title": "د پېژندنې او پروفایل معلومات",
          "desc": "نوم، د برېښنالیک پته، پټ نوم کوډ شوی بڼه، ژبه، عکس او د بشپړ کړو کورسونو سوابق."
        },
        {
          "title": "تادیات او مالي راکړې ورکړې",
          "desc": "د فرمایشونو او بلونو سوابق. د بانکي کارټونو معلومات مستقیماً د سټرایپ (Stripe) د لومړۍ کچې PCI-DSS پرمختللي سیسټم لخوا اداره کیږي."
        },
        {
          "title": "تخنیکي او امنیتي معلومات",
          "desc": "د انټرنیټ IP پته، براوزر بڼه، د کمپیوټر عملیاتي سیسټم او د ناوړه ګټې اخیستنې د مخنیوي امنیتي ثبتونه."
        },
        {
          "title": "د زده کړې پرمختګ او نمرې",
          "desc": "د ازموینو نمرې، سپارل شوي کورني کارونه، د اکاډمۍ ټکي او د ویاړونو په عمومي تخته کې ستاسو رتبې."
        }
      ]
    },
    "section3": {
      "secBadge": "۳ برخه • خورا مهمه",
      "title": "دریمګړي پیوندونه او سوداګریز همکاران",
      "badge": "د شراکت افشا کول",
      "desc": "د مسلکي سوداګرۍ رامنځته کولو لپاره، صافي اکاډمۍ باوري نړیوال شرکتونه معرفي کوي. د امریکا د شرکت جوړونې په برخه کې د Registered Agents Inc او AWIN پیوندونه وړاندې شوي دي.",
      "rulesTitle": "د دریمګړو ادارو په اړه مهم اصول:",
      "bullets": [
        "د همکار په لینک باندې کلیک کول ممکن ستاسو په براوزر کې یو تعقیبي کوکي ثبت کړي ترڅو دا وښيي چې تاسو د صافي اکاډمۍ لخوا ورپېژندل شوي یاست.",
        "صافي اکاډمۍ هیڅکله ستاسو پټ نوم، شخصي اسناد یا درسي سوابق له بهرنیو ادارو سره نه شریکوي.",
        "هغه معلومات چې تاسو په بهرني سایټ کې داخل کوئ، مستقیماً د هغوی د رسمي محرمیت تګلارې سره سم اداره کیږي.",
        "که تاسو د یادو لینکونو له لارې خدمت واخلئ، موږ ممکن یو څه کمیسیون ترلاسه کړو پرته له دې چې ستاسو لګښت زیات شي."
      ]
    },
    "section4": {
      "secBadge": "۴ برخه",
      "title": "د معلوماتو د پروسس قانوني اساسات",
      "desc": "د معلوماتو پروسس په بشپړ ډول د انګلستان د معلوماتو د خوندي ساتلو عمومي مقرراتو (UK GDPR) د ۶ مې مادې سره سم ترسره کیږي:",
      "items": [
        {
          "title": "د قرارداد پر بنسټ خدمتونه",
          "desc": "د درسي ویډیوګانو لیدل، د کورنیو کارونو ارزونه، د فراغت سندونه ورکول او د ګډون پروسس."
        },
        {
          "title": "د پلاتفورم مشروع اهداف",
          "desc": "د درسي محتوا ښه کول، د سرورونو خوندي کول او د پلاتفورم د تخنیکي کارکرد تحلیل."
        },
        {
          "title": "قانوني او مالیاتي اړتیاوې",
          "desc": "د انګلستان د مالیاتي ادارو د غوښتنو سره سم د مالي او محاسبوي ثبتونو ساتنه."
        }
      ]
    },
    "section5": {
      "secBadge": "۵ برخه",
      "title": "کوکیز او د تعقیب ټیکنالوژي",
      "desc": "زموږ سیسټم د کاروونکي پېژندنې، د ناستې د خوندي ساتلو او د ژبې د خوښې لپاره له کوکیز څخه ګټه اخلي.",
      "cookies": [
        {
          "title": "اړین او حیاتي کوکیز",
          "desc": "حساب ته د ننوتلو توکنونه، امنیتي سکرینینګ او د فایروال کنټرول.",
          "badge": "تل فعال"
        },
        {
          "title": "د کارکرد او احصایې کوکیز",
          "desc": "د درسونو د بارېدو سرعت او د سیسټم د ارزونې پټ معلومات.",
          "badge": "د تنظیم وړ"
        },
        {
          "title": "د همکارانو معرفي کوونکي کوکیز",
          "desc": "یوازې هغه وخت کار کوي کله چې تاسو د باوري همکار (لکه Registered Agents Inc) په لینک کلیک وکړئ.",
          "badge": "یوازې بهرني لینکونه"
        },
        {
          "title": "د Google AdSense اعلاناتي کوکیز",
          "desc": "د ګوګل او باوري اعلاناتي شبکو لخوا په دې او نورو سایټونو کې د ګټورو اعلاناتو د ښودلو لپاره کارول کیږي.",
          "badge": "دریمګړی (د لغوه کولو امکان)"
        }
      ],
      "adHeading": "د Google AdSense او دریمګړو اعلاناتو رسمي معیارونه",
      "adIntro": "صافي اکاډمۍ د ټولنې په فیدونو کې د اعتدال لرونکو اعلاناتو لپاره له Google AdSense څخه کار اخلي.",
      "adBullets": [
        {
          "lead": "دریمګړي اعلان کونکي",
          "text": "ګوګل او ملګري شبکې د کاروونکو د پخوانیو لیدنو پر بنسټ ګټور اعلانات ښيي."
        },
        {
          "lead": "د DoubleClick DART کوکي",
          "text": "ګوګل ته دا اسانتیا برابروي چې د زده کړې اړوند مناسب اعلانونه وښيي."
        },
        {
          "lead": "د شخصي اعلاناتو د بندولو حق",
          "text": "زده کوونکي کولی شي په اسانۍ د ګوګل د تنظیماتو پاڼې (adssettings.google.com) له لارې دا اختیار بند کړي."
        },
        {
          "lead": "د محرمیت خوندیتوب",
          "text": "صافي اکاډمۍ هیڅکله د زده کوونکو شخصي پیژندنه نه افشا کوي او اعلانات یوازې په مناسبو ځایونو کې راځي."
        }
      ]
    },
    "section6": {
      "secBadge": "۶ برخه",
      "title": "د معلوماتو امنیت او د ساتلو مقررات",
      "desc": "موږ د څو پوړیزو تخنیکي او فزیکي وسایلو په مټ معلومات خوندي ساتو. د معلوماتو انتقال د نوي TLS 1.3 انکریپشن له لارې ترسره کیږي.",
      "retentionTitle": "د معلوماتو د ساتلو موده",
      "retentionDesc": "ستاسو معلومات تر هغه ساتل کیږي چې حساب فعال وي، او له هغې وروسته د قانوني غوښتنو سره سم (د مالي ثبتونو لپاره تر ۶ کلونو پورې).",
      "transfersTitle": "نړیوال معلوماتي لېږد",
      "transfersDesc": "ټول معلوماتي لېږدونه د انګلستان د رسمي معیارونو (IDTA او SCC) سره سم په خوندي نړیوالو کلاوډ سرورونو کې تنظیمیږي."
    },
    "section7": {
      "secBadge": "۷ برخه",
      "title": "ستاسو قانوني حقونه (د UK GDPR له مخې)",
      "desc": "د انګلستان او اروپایي ټولنې د قوانینو له مخې تاسو د خپلو شخصي معلوماتو په اړه لاندې حقونه لرئ:",
      "rights": [
        {
          "title": "معلوماتو ته د لاسرسي حق",
          "desc": "د ټولو هغو شخصي ثبتونو د ډیجیټل کاپي غوښتنه چې موږ یې لرو."
        },
        {
          "title": "د سمون او اصلاح حق",
          "desc": "د ناسمو یا نیمګړو معلوماتو د بېړني بدلولو او اصلاح کولو حق."
        },
        {
          "title": "د بشپړ پاکولو حق",
          "desc": "د خپل حساب او شخصي معلوماتو د تلپاتې ړنګولو غوښتنه («د هیرېدو حق»)."
        },
        {
          "title": "د پروسس د محدودولو حق",
          "desc": "د اختلاف یا اعتراض په وخت کې د معلوماتو د پروسس موقتي درول."
        },
        {
          "title": "د معلوماتو د لېږد حق",
          "desc": "په معیاري بڼه د خپلو درسي سوابقو او اسنادو ترلاسه کول."
        },
        {
          "title": "د اعتراض کولو حق",
          "desc": "په هغو مواردو اعتراض چې یوازې پر سوداګریزو موخو ولاړ وي."
        }
      ],
      "deletionBox": {
        "title": "ایا غواړئ خپل حساب د تل لپاره حذف کړئ؟",
        "sub": "تاسو کولی شئ د GDPR د رسمي پورتال له لارې خپل حساب په اسانۍ ړنګ کړئ.",
        "btn": "د حساب ړنګولو پورتال خلاص کړئ"
      }
    },
    "section8": {
      "secBadge": "۸ برخه",
      "title": "د محرمیت اړیکې او رسمي شکایتونه",
      "desc": "که د محرمیت په اړه کومه پوښتنه لرئ یا غواړئ خپل قانوني حق وکاروئ، زموږ د معلوماتو د ساتنې څانګې سره تماس ونیسئ:",
      "emailLabel": "د محرمیت د څانګې رسمي برېښنالیک",
      "btn": "برېښنالیک ولېږئ",
      "icoText": "که تاسو زموږ له ځواب څخه قناعت ونه لرئ، حق لرئ چې د انګلستان د معلوماتو کمیشنر دفتر (ICO) ته په ico.org.uk کې شکایت درج کړئ."
    }
  },
  "ar": {
    "isRtl": true,
    "badge": "ميثاق البيانات الرسمي وسياسة الخصوصية",
    "heroTitleLine1": "خصوصيتك وبياناتك الشخصية",
    "heroTitleLine2": "محمية بالكامل بأعلى المعايير",
    "heroSub": "تلتزم أكاديمية صافي بأعلى المعايير الدولية لحماية البيانات. يرجى الاطلاع على بيانات التسجيل القانونية، وأسس معالجة البيانات، وحقوقك النظامية.",
    "entityLabel": "الكيان القانوني: Safi International Capital LTD",
    "regLabel": "رقم التسجيل: 17063286 (المملكة المتحدة)",
    "lawLabel": "قوانين UK GDPR و DPA 2018",
    "highlights": [
      {
        "title": "عدم بيع البيانات إطلاقاً",
        "desc": "نحن لا نبيع أو نؤجر بياناتك الشخصية لأي وسطاء أو أطراف ثالثة على الإطلاق.",
        "badge": "معيار مضمون"
      },
      {
        "title": "شفافية الشراكات التابعة",
        "desc": "إفصاح كامل وشفاف بخصوص ملفات تعريف الارتباط التابعة وشركائنا مثل Registered Agents Inc.",
        "badge": "متوافق مع FTC"
      },
      {
        "title": "تشفير على مستوى المؤسسات",
        "desc": "تشفير شامل TLS/SSL لجميع الدورات التدريبية، الشهادات، وسجلات الأكاديمية.",
        "badge": "حماية مشفرة"
      },
      {
        "title": "تحكم كامل بموجب GDPR",
        "desc": "حقوق غير مقيدة للوصول إلى بيانات حسابك أو تصحيحها أو نقلها أو حذفها في أي وقت.",
        "badge": "حقوق نظامية"
      }
    ],
    "tocTitle": "فهرس التنقل السريع",
    "tocCount": "8 أقسام قانونية",
    "sections": [
      {
        "id": "controller",
        "title": "1. الجهة المسؤولة عن البيانات"
      },
      {
        "id": "collection",
        "title": "2. البيانات التي نجمعها"
      },
      {
        "id": "affiliates",
        "title": "3. الروابط الخارجية والإفصاح التسويقي",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. الأساس القانوني للمعالجة"
      },
      {
        "id": "cookies",
        "title": "5. ملفات تعريف الارتباط والتتبع"
      },
      {
        "id": "security",
        "title": "6. أمن البيانات ومدة الحفظ"
      },
      {
        "id": "rights",
        "title": "7. حقوقك القانونية (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. استفسارات الخصوصية"
      }
    ],
    "legalHelp": {
      "title": "هل لديك أسئلة حول البيانات؟",
      "desc": "استفسارات بخصوص معالجة البيانات، والامتثال للخصوصية، وممارسة حقوقك القانونية.",
      "btn": "مراسلة فريق الخصوصية"
    },
    "section1": {
      "secBadge": "القسم 1",
      "title": "1. الجهة المسؤولة عن البيانات والكيان القانوني",
      "desc": "تعتبر شركة Safi International Capital LTD هي الجهة الرسمية للتحكم بالبيانات (Data Controller) لجميع البيانات الشخصية المعالجة عبر أكاديمية صافي.",
      "legalEntityLabel": "الكيان القانوني الرسمي",
      "companyNumLabel": "رقم التسجيل التجاري",
      "hqLabel": "عنوان المقر الرئيسي",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "القسم 2",
      "title": "2. المعلومات التي نقوم بجمعها",
      "desc": "نقوم بجمع بياناتك فقط لغرض تقديم المحتوى التعليمي، وضمان أمان تسجيل الدخول، وتحسين تجربة المنصة.",
      "cards": [
        {
          "title": "بيانات الهوية والملف الشخصي",
          "desc": "الاسم الكامل، عنوان البريد الإلكتروني، كلمات المرور المشفرة، اللغة المفضلة، الصورة الشخصية، وسجل الدورات المسجلة."
        },
        {
          "title": "الفواتير والمعاملات المالية",
          "desc": "سجل الطلبات والفواتير والمراجع المالية. تتم معالجة بيانات بطاقات الدفع عبر Stripe وفق أعلى معايير الأمان PCI-DSS المستوى 1."
        },
        {
          "title": "البيانات التقنية وسجلات الأمان",
          "desc": "عنوان IP، نوع المتصفح، نظام التشغيل، وأوقات الدخول وسجلات جدار الحماية لمنع الاحتيال والاختراقات."
        },
        {
          "title": "التقدم الأكاديمي والتحفيز",
          "desc": "نتائج الاختبارات، والواجبات المكتملة، ونقاط الأكاديمية، والشارات، وقائمة الشرف الأكاديمية العامة."
        }
      ]
    },
    "section3": {
      "secBadge": "القسم 3 • أهمية بالغة",
      "title": "روابط الأطراف الثالثة والشركاء التابعين",
      "badge": "إفصاح الشراكة التابعة",
      "desc": "للربط بين التعليم الأكاديمي والتنفيذ العملي، توصي الأكاديمية بمزودي خدمات موثوقين. يتضمن قسم تأسيس الشركات في أمريكا روابط إحالة إلى Registered Agents Inc وشبكات مثل AWIN.",
      "rulesTitle": "قواعد التعامل مع خدمات الأطراف الثالثة:",
      "bullets": [
        "النقر فوق روابط الإحالة قد يؤدي إلى حفظ ملف تعريف ارتباط تتبع في متصفحك للتحقق من أن الإحالة تمت عبر أكاديمية صافي.",
        "لا تشارك الأكاديمية كلمات مرورك أو معلوماتك الشخصية أو سجلاتك الدراسية مع Registered Agents Inc أو شبكات الإحالة.",
        "أي بيانات رسمية أو مصرفية تقدمها على موقع الشركة الشريكة تخضع حصرياً لسياسة الخصوصية الخاصة بتلك الشركة.",
        "قد نحصل على عمولة تسويقية مقابل المعاملات المؤهلة دون أي تكلفة إضافية عليك مطلقاً."
      ]
    },
    "section4": {
      "secBadge": "القسم 4",
      "title": "الأساس القانوني لاستخدام البيانات",
      "desc": "تتم معالجة البيانات الشخصية بموجب المادة 6 من اللائحة العامة لحماية البيانات في المملكة المتحدة (UK GDPR):",
      "items": [
        {
          "title": "تنفيذ الالتزامات التعاقدية",
          "desc": "توفير الدروس ومقاطع الفيديو، وإصدار الشهادات الأكاديمية، وإدارة اشتراكات الطلاب."
        },
        {
          "title": "المصالح المشروعة للمنصة",
          "desc": "تطوير المناهج الدراسية باستمرار، وحماية خوادمنا من الهجمات الرقمية، وتحليل أداء المنصة."
        },
        {
          "title": "الالتزامات القانونية والضريبية",
          "desc": "الاحتفاظ بالسجلات المحاسبية والضريبية المطلوبة وفقاً للقوانين واللوائح الرسمية في المملكة المتحدة."
        }
      ]
    },
    "section5": {
      "secBadge": "القسم 5",
      "title": "ملفات تعريف الارتباط والتتبع",
      "desc": "تستخدم منصتنا رموز الجلسات ومساحة التخزين المحلية وملفات الكوكيز لضمان استمرارية الدخول وتأمين حسابك.",
      "cookies": [
        {
          "title": "ملفات تعريف الارتباط الضرورية",
          "desc": "رموز التحقق، وأمن الجلسة، والتحقق عبر جدار الحماية الأمني.",
          "badge": "مفعلة دائماً"
        },
        {
          "title": "ملفات قياس الأداء والإحصاءات",
          "desc": "قياس زمن تحميل مقاطع الدروس ومعدلات تفاعل المستخدمين دون تحديد الهوية الشخصية.",
          "badge": "قابلة للتهيئة"
        },
        {
          "title": "ملفات تعريف ارتباط الإحالة والشراكات",
          "desc": "تُفعّل فقط عند النقر على روابط الشركاء المعتمدين (مثل Registered Agents Inc).",
          "badge": "للروابط الخارجية فقط"
        },
        {
          "title": "ملفات تعريف الارتباط الإعلانية Google AdSense",
          "desc": "تُستخدم من قبل Google وشبكات الإعلانات لعرض إعلانات ملائمة بناءً على زياراتك لهذا الموقع ومواقع الإنترنت الأخرى.",
          "badge": "طرف ثالث (إمكانية التعطيل)"
        }
      ],
      "adHeading": "الامتثال لمعايير إعلانات Google AdSense والجهات الخارجية",
      "adIntro": "تستخدم أكاديمية صافي إعلانات Google AdSense وشبكات معتمدة لعرض إعلانات ملائمة وغير مزعجة في المساحات المجتمعية.",
      "adBullets": [
        {
          "lead": "مزودو الطرف الثالث",
          "text": "تستخدم جوجل وشبكاتها الإعلانية ملفات تعريف الارتباط لعرض إعلانات استناداً إلى زيارات المستخدمين السابقة للأكاديمية والإنترنت."
        },
        {
          "lead": "ملف DoubleClick DART",
          "text": "يمكن استخدام ملف DART لعرض إعلانات ذات صلة باهتمامات الطلاب والمستخدمين."
        },
        {
          "lead": "إلغاء الاشتراك في الإعلانات المخصصة",
          "text": "يمكن للطلاب تعطيل تخصيص الإعلانات في أي وقت عبر إعدادات إعلانات جوجل (adssettings.google.com) أو AboutAds.info."
        },
        {
          "lead": "ضمانات الخصوصية",
          "text": "لا تبيع الأكاديمية معرفات الطلاب لشركات الإعلانات وتحصر الإعلانات في مواضع مجتمعية مناسبة."
        }
      ]
    },
    "section6": {
      "secBadge": "القسم 6",
      "title": "أمن البيانات وبروتوكولات التخزين",
      "desc": "نحمي بيانات المستخدمين باستخدام تدابير أمنية متعددة المستويات. يتم تشفير نقل البيانات بالكامل باستخدام بروتوكولات TLS 1.3 الحديثة.",
      "retentionTitle": "مدة الاحتفاظ بالبيانات",
      "retentionDesc": "نحتفظ بسجلات الطلاب طوال فترة نشاط الحساب، بالإضافة إلى الفترات القانونية الإلزامية (حتى 6 سنوات للسجلات الضريبية والمحاسبية).",
      "transfersTitle": "نقل البيانات عبر الحدود الدولية",
      "transfersDesc": "تلتزم عمليات نقل البيانات الدولية باتفاقيات نقل البيانات الدولية البريطانية (IDTA) والبنود التعاقدية القياسية (SCC) مع سحابة مشفرة."
    },
    "section7": {
      "secBadge": "القسم 7",
      "title": "حقوقك القانونية (بموجب UK GDPR)",
      "desc": "تمنحك قوانين حماية البيانات في المملكة المتحدة والاتحاد الأوروبي حقوقاً نظامية واجبة النفاذ:",
      "rights": [
        {
          "title": "حق الوصول للبيانات",
          "desc": "طلب نسخة إلكترونية كاملة من جميع البيانات والسجلات المحفوظة لدينا."
        },
        {
          "title": "حق التصحيح والتحديث",
          "desc": "تصحيح أي بيانات غير دقيقة أو قديمة أو غير مكتملة."
        },
        {
          "title": "حق محو البيانات («حق النسيان»)",
          "desc": "طلب الحذف النهائي وغير القابل للاسترداد لملفك وحسابك."
        },
        {
          "title": "حق تقييد المعالجة",
          "desc": "التجميد المؤقت لمعالجة بياناتك أثناء مراجعة أي نزاع أو طلب قانوني."
        },
        {
          "title": "حق نقل البيانات",
          "desc": "الحصول على سجلاتك التعليمية بتنسيق رقمي قياسي يمكن نقله."
        },
        {
          "title": "حق الاعتراض القانوني",
          "desc": "الاعتراض على أي معالجة تستند حصراً إلى المصالح التجارية."
        }
      ],
      "deletionBox": {
        "title": "هل ترغب في حذف حسابك بشكل دائم؟",
        "sub": "يمكنك تقديم طلب فوري لحذف وتطهير البيانات عبر بوابتنا الذاتية المتوافقة مع GDPR.",
        "btn": "فتح بوابة حذف الحساب"
      }
    },
    "section8": {
      "secBadge": "القسم 8",
      "title": "استفسارات الخصوصية والتصعيد القانوني",
      "desc": "لأي استفسارات حول هذه السياسة، أو لممارسة حقوقك، أو لتقديم طلب رسمي، يمكنك التواصل مع فريق حماية البيانات عبر:",
      "emailLabel": "البريد الإلكتروني لمسؤول حماية البيانات (DPO)",
      "btn": "إرسال رسالة للخصوصية",
      "icoText": "إذا لم تكن راضياً عن استجابتنا، يحق لك تقديم شكوى رسمية إلى مكتب مفوض المعلومات في المملكة المتحدة (ICO) عبر الموقع ico.org.uk."
    }
  },
  "ur": {
    "isRtl": true,
    "badge": "آفیشل ڈیٹا چارٹر اور رازداری کی پالیسی",
    "heroTitleLine1": "آپ کی رازداری اور ذاتی ڈیٹا",
    "heroTitleLine2": "مکمل طور پر محفوظ ہیں",
    "heroSub": "صفی اکیڈمی عالمی سطح پر ڈیٹا کے تحفظ کے اعلیٰ ترین معیارات پر کاربند ہے۔ ہمارے قانونی رجسٹریشن، ڈیٹا پروسیسنگ کے اصول اور اپنے قانونی حقوق کا یہاں جائزہ لیں۔",
    "entityLabel": "قانونی ادارہ: Safi International Capital LTD",
    "regLabel": "رجسٹریشن نمبر: 17063286 (برطانیہ)",
    "lawLabel": "برطانوی قوانین UK GDPR اور DPA 2018",
    "highlights": [
      {
        "title": "ڈیٹا فروخت نہ کرنے کی ضمانت",
        "desc": "ہم آپ کی ذاتی معلومات کسی بھی تیسرے فریق یا ڈیٹا بروکر کو فروخت یا کرایہ پر نہیں دیتے۔",
        "badge": "مصدقہ معیار"
      },
      {
        "title": "شراکت داری میں مکمل شفافیت",
        "desc": "Registered Agents Inc جیسے آفیشل پارٹنرز اور ریفرل کوکیز کے بارے میں مکمل اور واضح انکشافات۔",
        "badge": "FTC کے قواعد کے عین مطابق"
      },
      {
        "title": "اعلیٰ سیکیورٹی انکرپشن",
        "desc": "تمام تعلیمی کورسز، اسناد اور ڈیٹا کے لیے جدید ترین TLS/SSL انکرپشن کا استعمال۔",
        "badge": "انکرپٹڈ تحفظ"
      },
      {
        "title": "GDPR کے تحت مکمل کنٹرول",
        "desc": "کسی بھی وقت اپنے اکاؤنٹ کے ڈیٹا تک رسائی، درستگی، منتقلی یا مستقل حذف کرنے کا مکمل حق۔",
        "badge": "طالب علم کے قانونی حقوق"
      }
    ],
    "tocTitle": "فہرست مضامین",
    "tocCount": "8 قانونی سیکشنز",
    "sections": [
      {
        "id": "controller",
        "title": "1. ڈیٹا کنٹرولر"
      },
      {
        "id": "collection",
        "title": "2. جمع کی جانے والی معلومات"
      },
      {
        "id": "affiliates",
        "title": "3. بیرونی لنکس اور ملحقہ شراکت دار",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. ڈیٹا کے استعمال کی قانونی بنیادیں"
      },
      {
        "id": "cookies",
        "title": "5. کوکیز اور ٹریکنگ ٹیکنالوجیز"
      },
      {
        "id": "security",
        "title": "6. سیکیورٹی اور محفوظ رکھنے کی مدت"
      },
      {
        "id": "rights",
        "title": "7. آپ کے قانونی حقوق (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. رازداری کے بارے میں استفسارات"
      }
    ],
    "legalHelp": {
      "title": "ڈیٹا پرائیویسی کے بارے میں کوئی سوال ہے؟",
      "desc": "ڈیٹا پروسیسنگ، پرائیویسی قوانین کی تعمیل یا اپنے قانونی حقوق کے استعمال کے بارے میں پوچھیں۔",
      "btn": "پرائیویسی ٹیم کو ای میل کریں"
    },
    "section1": {
      "secBadge": "سیکشن 1",
      "title": "1. ڈیٹا کنٹرولر اور قانونی ادارہ",
      "desc": "کمپنی Safi International Capital LTD صفی اکیڈمی کے ذریعے جمع کیے گئے تمام ذاتی ڈیٹا کے لیے باضابطہ ڈیٹا کنٹرولر ہے۔",
      "legalEntityLabel": "آفیشل قانونی ادارہ",
      "companyNumLabel": "کمپنی رجسٹریشن نمبر",
      "hqLabel": "مرکزی دفتر کا پتہ",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "سیکشن 2",
      "title": "2. معلومات جو ہم جمع کرتے ہیں",
      "desc": "ہم آپ کی معلومات صرف تعلیمی کورسز کی فراہمی، محفوظ لاگ ان اور پلیٹ فارم کے تحفظ کے لیے جمع کرتے ہیں۔",
      "cards": [
        {
          "title": "شناخت اور پروفائل ڈیٹا",
          "desc": "پورا نام، ای میل ایڈریس، خفیہ انکرپٹڈ پاس ورڈ، زبان کی ترجیح، تصویر اور داخلہ شدہ کورسز کا ریکارڈ۔"
        },
        {
          "title": "ادائیگیاں اور مالیاتی ریکارڈ",
          "desc": "آرڈرز کی تاریخ، انوائسز اور ٹرانزیکشن نمبرز۔ کارڈ کی تفصیلات براہ راست اسٹرائپ (Stripe) کے ذریعے PCI-DSS لیول 1 کے تحت محفوظ رہتی ہیں۔"
        },
        {
          "title": "تکنیکی ڈیٹا اور سیکیورٹی لاگز",
          "desc": "آئی پی ایڈریس، براؤزر کی تفصیلات، آپریٹنگ سسٹم اور دھوکہ دہی کی روک تھام کے لیے فائر وال سیکیورٹی لاگز۔"
        },
        {
          "title": "تعلیمی پیش رفت اور رینکنگ",
          "desc": "کوئز کے نتائج، جمع کروائے گئے اسباق، اکیڈمی پوائنٹس، اعزازی بیجز اور عوامی وال آف فیم کی درجہ بندی۔"
        }
      ]
    },
    "section3": {
      "secBadge": "سیکشن 3 • انتہائی اہم",
      "title": "تھرڈ پارٹی لنکس اور ملحقہ شراکت دار",
      "badge": "ایفیلی ایٹ ڈسکلوزر",
      "desc": "نظریاتی تعلیم کو عملی کاروبار کے ساتھ جوڑنے کے لیے صفی اکیڈمی معتبر اداروں کی سفارش کرتی ہے۔ ہمارے یو ایس کمپنی فارمیشن پورٹل پر Registered Agents Inc اور AWIN جیسے نیٹ ورکس کے لنکس شامل ہیں۔",
      "rulesTitle": "تھرڈ پارٹی اداروں کے ساتھ کام کرنے کے اصول:",
      "bullets": [
        "ریفرل لنکس پر کلک کرنے سے آپ کے براؤزر میں ٹریکنگ کوکی محفوظ ہو سکتی ہے تاکہ یہ ثابت ہو سکے کہ آپ صفی اکیڈمی کے توسط سے آئے ہیں۔",
        "صفی اکیڈمی کبھی بھی آپ کے پاس ورڈز، ذاتی تفصیلات یا تعلیمی ریکارڈ Registered Agents Inc یا اشتہاری نیٹ ورکس کے ساتھ شیئر نہیں کرتی۔",
        "جو معلومات آپ ان کی ویب سائٹ پر فراہم کرتے ہیں وہ براہ راست ان کی آفیشل پرائیویسی پالیسی کے تحت جمع کی جاتی ہیں۔",
        "ہمیں مخصوص ٹرانزیکشنز پر ایک ریفرل کمیشن مل سکتا ہے جس سے آپ کو کوئی اضافی قیمت ادا نہیں کرنی پڑتی۔"
      ]
    },
    "section4": {
      "secBadge": "سیکشن 4",
      "title": "ڈیٹا استعمال کرنے کی قانونی بنیادیں",
      "desc": "ہم برطانیہ کے جنرل ڈیٹا پروٹیکشن ریگولیشنز (UK GDPR) کے آرٹیکل 6 کے تحت ذاتی ڈیٹا پروسیس کرتے ہیں:",
      "items": [
        {
          "title": "معاہدے کی تکمیل",
          "desc": "کورسز کی فراہمی، ویڈیوز تک رسائی دینا، اسناد جاری کرنا اور سبسکرپشنز کو منظم کرنا۔"
        },
        {
          "title": "پلیٹ فارم کے جائز مفادات",
          "desc": "نصاب کو بہتر بنانا، سرورز کو سائبر حملوں سے بچانا اور کارکردگی کا تجزیہ کرنا۔"
        },
        {
          "title": "قانونی اور ٹیکس ذمہ داریاں",
          "desc": "برطانوی ٹیکس اور کارپوریٹ قوانین کے مطابق درست مالیاتی اور اکاؤنٹنگ ریکارڈز برقرار رکھنا۔"
        }
      ]
    },
    "section5": {
      "secBadge": "سیکشن 5",
      "title": "کوکیز اور ٹریکنگ ٹیکنالوجیز",
      "desc": "ہمارا پلیٹ فارم سیشن ٹوکنز، لوکل اسٹوریج اور کوکیز کا استعمال کرتا ہے تاکہ آپ کا لاگ ان سیشن محفوظ رہے اور ترتیبات یاد رکھی جا سکیں۔",
      "cookies": [
        {
          "title": "لازمی اور ضروری کوکیز",
          "desc": "لاگ ان تصدیق، سیشن کا تحفظ اور فائر وال سیکیورٹی۔",
          "badge": "ہمیشہ فعال"
        },
        {
          "title": "کارکردگی اور شماریاتی کوکیز",
          "desc": "ویڈیوز کے لوڈ ہونے کی رفتار اور تعامل کے گمنام میٹرکس۔",
          "badge": "اختیاری"
        },
        {
          "title": "ایفیلی ایٹ اور ریفرل کوکیز",
          "desc": "صرف بیرونی پارٹنر لنکس (جیسے Registered Agents Inc) پر کلک کرنے پر فعال ہوتی ہیں۔",
          "badge": "صرف بیرونی لنکس"
        },
        {
          "title": "گوگل ایڈسینس اشتہاری کوکیز",
          "desc": "گوگل اور مصدقہ پارٹنرز کے ذریعے اس ویب سائٹ اور انٹرنیٹ پر دیگر ویب سائٹس کے دوروں کی بنیاد پر اشتہارات دکھانے کے لیے استعمال ہوتی ہیں۔",
          "badge": "تھرڈ پارٹی (آپٹ آؤٹ دستیاب)"
        }
      ],
      "adHeading": "Google AdSense اور ڈیجیٹل اشتہارات کی قانونی تعمیل",
      "adIntro": "صفی اکیڈمی کمیونٹی کے مخصوص صفحات پر موزوں اشتہارات کے لیے Google AdSense کا استعمال کرتی ہے۔",
      "adBullets": [
        {
          "lead": "تھرڈ پارٹی وینڈرز",
          "text": "گوگل اور اشتہاری نیٹ ورکس پچھلی سرگرمیوں کی بنیاد پر مناسب اشتہارات دکھانے کے لیے کوکیز کا استعمال کرتے ہیں۔"
        },
        {
          "lead": "DoubleClick DART کوکی",
          "text": "گوگل کی یہ کوکی صارفین کو تعلیمی اور انٹرنیٹ کے دوروں کی بنیاد پر متعلقہ اشتہارات فراہم کرنے میں مدد کرتی ہے۔"
        },
        {
          "lead": "ذاتی نوعیت کے اشتہارات بند کرنے کا اختیار",
          "text": "طلباء گوگل ایڈز کی ترتیبات (adssettings.google.com) یا AboutAds.info کے ذریعے کسی بھی وقت اسے غیر فعال کر سکتے ہیں۔"
        },
        {
          "lead": "رازداری کا تحفظ",
          "text": "صفی اکیڈمی کبھی بھی طلباء کی شناخت کسی اشتہاری بروکر کو نہیں دیتی اور اشتہارات کو محدود رکھتی ہے۔"
        }
      ]
    },
    "section6": {
      "secBadge": "سیکشن 6",
      "title": "ڈیٹا سیکیورٹی اور اسٹوریج پروٹوکولز",
      "desc": "ہم جدید جسمانی، انتظامی اور تکنیکی طریقوں سے ڈیٹا کی حفاظت کرتے ہیں۔ ڈیٹا کی منتقلی TLS 1.3 پروٹوکولز اور خودکار اسکیننگ کے تحت ہوتی ہے۔",
      "retentionTitle": "ڈیٹا محفوظ رکھنے کی مدت",
      "retentionDesc": "ہم اکاؤنٹ کے فعال رہنے تک ڈیٹا رکھتے ہیں، اور اس کے بعد لازمی قانونی مدت کے لیے (یو کے ٹیکس ریکارڈ کے لیے 6 سال تک)۔",
      "transfersTitle": "بین الاقوامی ڈیٹا ٹرانسفر",
      "transfersDesc": "سرحد پار ڈیٹا کی منتقلی برطانوی معیار (IDTA اور SCC) کے تحت انکرپٹڈ کلاؤڈ سسٹمز کے ذریعے کی جاتی ہے۔"
    },
    "section7": {
      "secBadge": "سیکشن 7",
      "title": "آپ کے قانونی حقوق (UK GDPR کے تحت)",
      "desc": "برطانیہ اور یورپی یونین کے قوانین کے تحت آپ کو اپنے ڈیٹا پر درج ذیل قانونی حقوق حاصل ہیں:",
      "rights": [
        {
          "title": "ڈیٹا تک رسائی کا حق",
          "desc": "ہمارے پاس محفوظ اپنے تمام ذاتی ڈیٹا کی مکمل کاپی حاصل کرنے کی درخواست۔"
        },
        {
          "title": "درستگی اور تصحیح کا حق",
          "desc": "پرانی یا غلط معلومات کی فوری تصحیح اور اپ ڈیٹ کا حق۔"
        },
        {
          "title": "مستقل حذف کرنے کا حق",
          "desc": "اپنے اکاؤنٹ اور ریکارڈز کو مکمل طور پر ختم کرنے کی درخواست («بھول جانے کا حق»)۔"
        },
        {
          "title": "پروسیسنگ کو محدود کرنے کا حق",
          "desc": "کسی قانونی تنازع کی جانچ پڑتال کے دوران ڈیٹا پروسیسنگ کو عارضی طور پر روکنا۔"
        },
        {
          "title": "ڈیٹا کی منتقلی کا حق",
          "desc": "اپنے کورسز کا ریکارڈ معیاری ڈیجیٹل فارمیٹ میں حاصل کرنا۔"
        },
        {
          "title": "اعتراض کرنے کا حق",
          "desc": "ایسی پروسیسنگ پر اعتراض جو صرف تجارتی مفاد پر مبنی ہو۔"
        }
      ],
      "deletionBox": {
        "title": "کیا آپ اپنا اکاؤنٹ مستقل طور پر حذف کرنا چاہتے ہیں؟",
        "sub": "ہمارے GDPR سیلف سروس پورٹل کے ذریعے اکاؤنٹ حذف کرنے کی باضابطہ درخواست جمع کروائیں۔",
        "btn": "اکاؤنٹ ڈیلیٹ پورٹل کھولیں"
      }
    },
    "section8": {
      "secBadge": "سیکشن 8",
      "title": "پرائیویسی کے استفسارات اور ریگولیٹری رابطہ",
      "desc": "اس پالیسی کے متعلق سوالات، حقوق کے استعمال یا باضابطہ استفسار کے لیے ہماری ڈیٹا پروٹیکشن ٹیم سے رابطہ کریں:",
      "emailLabel": "ڈیٹا پروٹیکشن آفیسر کا ای میل",
      "btn": "ای میل بھیجیں",
      "icoText": "اگر آپ ہمارے جواب سے مطمئن نہ ہوں، تو آپ کو برطانیہ کے انفارمیشن کمشنر آفس (ICO) میں ico.org.uk پر شکایت درج کرانے کا حق ہے۔"
    }
  },
  "ru": {
    "isRtl": false,
    "badge": "Официальная хартия данных и Политика конфиденциальности",
    "heroTitleLine1": "Ваша конфиденциальность и данные",
    "heroTitleLine2": "Надежно защищены",
    "heroSub": "Академия Safi соблюдает высочайшие мировые стандарты защиты персональных данных. Ознакомьтесь с регистрационными данными оператора, правовыми основаниями обработки и вашими правами.",
    "entityLabel": "Юридическое лицо: Safi International Capital LTD",
    "regLabel": "Рег. номер: 17063286 (Великобритания)",
    "lawLabel": "UK GDPR и DPA 2018",
    "highlights": [
      {
        "title": "Никакой продажи данных",
        "desc": "Мы строго никогда не продаем и не передаем в аренду ваши данные сторонним брокерам.",
        "badge": "Гарантированный стандарт"
      },
      {
        "title": "Прозрачность партнерств",
        "desc": "Полное раскрытие реферальных cookie-файлов и связей с партнерами, такими как Registered Agents Inc.",
        "badge": "Соответствие стандартам FTC"
      },
      {
        "title": "Корпоративное шифрование",
        "desc": "Сквозное TLS/SSL шифрование всех учебных курсов, сертификатов и баз данных платформы.",
        "badge": "Криптографическая защита"
      },
      {
        "title": "Полный контроль по GDPR",
        "desc": "Неограниченные права на просмотр, исправление, перенос или безвозвратное удаление аккаунта.",
        "badge": "Законные права студента"
      }
    ],
    "tocTitle": "Навигация по разделам",
    "tocCount": "8 юридических разделов",
    "sections": [
      {
        "id": "controller",
        "title": "1. Оператор данных"
      },
      {
        "id": "collection",
        "title": "2. Собираемая информация"
      },
      {
        "id": "affiliates",
        "title": "3. Внешние ссылки и партнерства",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Правовые основы обработки"
      },
      {
        "id": "cookies",
        "title": "5. Файлы cookie и отслеживание"
      },
      {
        "id": "security",
        "title": "6. Безопасность и хранение"
      },
      {
        "id": "rights",
        "title": "7. Ваши законные права (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Запросы о конфиденциальности"
      }
    ],
    "legalHelp": {
      "title": "Есть вопросы о защите данных?",
      "desc": "Вопросы по обработке персональных данных, соблюдению регламентов или реализации прав.",
      "btn": "Написать в отдел защиты данных"
    },
    "section1": {
      "secBadge": "Раздел 1",
      "title": "1. Оператор данных и юридическое лицо",
      "desc": "Компания Safi International Capital LTD является официально назначенным оператором данных (Data Controller) в отношении всей информации, обрабатываемой платформой Safi Academy.",
      "legalEntityLabel": "Юридическое лицо",
      "companyNumLabel": "Регистрационный номер компании",
      "hqLabel": "Адрес штаб-квартиры",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Раздел 2",
      "title": "2. Информация, которую мы собираем",
      "desc": "Мы собираем личные данные исключительно для предоставления доступа к курсам, безопасной аутентификации и поддержки платформы.",
      "cards": [
        {
          "title": "Данные профиля и личность",
          "desc": "Полное имя, адрес электронной почты, зашифрованные хэши паролей, языковые настройки, аватар и история курсов."
        },
        {
          "title": "Платежи и транзакции",
          "desc": "История заказов, счета и чеки. Данные банковских карт обрабатываются платежной системой Stripe по высшему стандарту PCI-DSS Уровень 1."
        },
        {
          "title": "Технические логи и безопасность",
          "desc": "IP-адрес, тип браузера, версия операционной системы, временные метки сессий и аудит брандмауэра для защиты от мошенничества."
        },
        {
          "title": "Учебный прогресс и достижения",
          "desc": "Баллы тестов, выполненные домашние задания, баллы академии, наградные значки и позиции на публичной Доске почета."
        }
      ]
    },
    "section3": {
      "secBadge": "Раздел 3 • Высокая важность",
      "title": "Сторонние ссылки и партнерские соглашения",
      "badge": "Раскрытие партнерства",
      "desc": "Для связи теории с практическим бизнесом Safi Academy рекомендует проверенные сервисы. В разделе регистрации бизнеса в США размещены реферальные ссылки на Registered Agents Inc и сети, такие как AWIN.",
      "rulesTitle": "Правила взаимодействия со сторонними сервисами:",
      "bullets": [
        "Переход по партнерской ссылке может сохранить реферальный cookie-файл в браузере для подтверждения перехода с платформы Safi Academy.",
        "Safi Academy никогда не передает ваши пароли, студенческие досье или личные документы компании Registered Agents Inc или партнерским сетям.",
        "Любые персональные или платежные данные, введенные на стороннем ресурсе, регулируются исключительно официальной Политикой конфиденциальности данного ресурса.",
        "Мы можем получать реферальное вознаграждение за оформленные услуги без каких-либо дополнительных расходов с вашей стороны."
      ]
    },
    "section4": {
      "secBadge": "Раздел 4",
      "title": "Правовые основания обработки данных",
      "desc": "Обработка данных производится исключительно в рамках статьи 6 Общего регламента по защите данных Великобритании (UK GDPR):",
      "items": [
        {
          "title": "Исполнение договорных обязательств",
          "desc": "Предоставление доступа к курсам и видеоматериалам, выдача сертификатов и управление подписками студентов."
        },
        {
          "title": "Законные интересы платформы",
          "desc": "Постоянное улучшение учебных программ, защита инфраструктуры от кибератак и аналитика стабильности серверов."
        },
        {
          "title": "Юридические и налоговые обязательства",
          "desc": "Хранение бухгалтерской и финансовой отчетности в соответствии с требованиями законодательства Великобритании."
        }
      ]
    },
    "section5": {
      "secBadge": "Раздел 5",
      "title": "Файлы cookie и технологии отслеживания",
      "desc": "Наша платформа использует сессионные токены, локальное хранилище и cookie-файлы для безопасного входа и персонализации среды обучения.",
      "cookies": [
        {
          "title": "Строго необходимые cookie",
          "desc": "Токены аутентификации, безопасность сеанса и защита сетевого брандмауэра.",
          "badge": "Всегда активны"
        },
        {
          "title": "Производительность и метрики",
          "desc": "Анонимный анализ скорости загрузки уроков и интерфейса.",
          "badge": "Настраиваемые"
        },
        {
          "title": "Партнерские реферальные cookie",
          "desc": "Активируются только при клике по внешним ссылкам партнеров (например, Registered Agents Inc).",
          "badge": "Только внешние"
        },
        {
          "title": "Рекламные файлы cookie Google AdSense",
          "desc": "Используются Google и партнерами для показа актуальных объявлений на основе посещений этого и других сайтов в сети Интернет.",
          "badge": "Сторонние (с возможностью отключения)"
        }
      ],
      "adHeading": "Соответствие стандартам рекламы Google AdSense",
      "adIntro": "Safi Academy использует Google AdSense для показа ненавязчивых рекламных объявлений в отдельных разделах сообщества.",
      "adBullets": [
        {
          "lead": "Сторонние поставщики",
          "text": "Google и рекламные сети используют файлы cookie для показа рекламы с учетом предыдущих посещений нашего ресурса."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Файл DART позволяет Google показывать релевантные образовательные объявления студентам платформы."
        },
        {
          "lead": "Отказ от персонализированной рекламы",
          "text": "Пользователи могут отключить персонализацию в настройках Google (adssettings.google.com) или на AboutAds.info."
        },
        {
          "lead": "Гарантии конфиденциальности",
          "text": "Академия никогда не передает идентификаторы студентов рекламным брокерам и сохраняет нативный формат рекламы."
        }
      ]
    },
    "section6": {
      "secBadge": "Раздел 6",
      "title": "Безопасность данных и протоколы хранения",
      "desc": "Мы защищаем данные пользователей с помощью многоуровневых физических, организационных и цифровых мер. Передача данных защищена протоколом TLS 1.3 с непрерывным мониторингом уязвимостей.",
      "retentionTitle": "Срок хранения персональных данных",
      "retentionDesc": "Данные хранятся в течение всего периода активности аккаунта и дополнительно в течение срока, установленного законом (до 6 лет для финансовых и налоговых документов Великобритании).",
      "transfersTitle": "Международная передача данных",
      "transfersDesc": "Трансграничная передача данных строго соответствует британским соглашениям IDTA и стандартным договорным условиям (SCC) с шифрованием в облаке."
    },
    "section7": {
      "secBadge": "Раздел 7",
      "title": "Ваши законные права (по UK GDPR)",
      "desc": "В соответствии с законодательством Великобритании и ЕС вы обладаете следующими неотъемлемыми правами в отношении ваших данных:",
      "rights": [
        {
          "title": "Право на доступ",
          "desc": "Запрос полной цифровой копии всех имеющихся у нас персональных записей."
        },
        {
          "title": "Право на исправление",
          "desc": "Оперативное изменение неточных, устаревших или неполных данных."
        },
        {
          "title": "Право на удаление («право на забвение»)",
          "desc": "Запрос на полное и безвозвратное удаление вашего аккаунта и данных."
        },
        {
          "title": "Право на ограничение обработки",
          "desc": "Временная заморозка обработки данных на период рассмотрения споров."
        },
        {
          "title": "Право на переносимость данных",
          "desc": "Получение учебных сведений в машиночитаемом структурированном формате."
        },
        {
          "title": "Право на возражение",
          "desc": "Возражение против любой обработки, основанной исключительно на коммерческих интересах."
        }
      ],
      "deletionBox": {
        "title": "Хотите безвозвратно удалить свой аккаунт?",
        "sub": "Вы можете подать заявку на автоматическое уничтожение данных через наш портал самообслуживания GDPR.",
        "btn": "Перейти к порталу удаления"
      }
    },
    "section8": {
      "secBadge": "Раздел 8",
      "title": "Вопросы конфиденциальности и надзорные органы",
      "desc": "По любым вопросам относительно данной политики или для реализации ваших прав свяжитесь с нашим отделом защиты данных:",
      "emailLabel": "Электронная почта инспектора по защите данных (DPO)",
      "btn": "Отправить письмо по конфиденциальности",
      "icoText": "Если вас не удовлетворит наш ответ, вы имеете право направить официальную жалобу в Управление комиссара по информации Великобритании (ICO) на сайте ico.org.uk."
    }
  },
  "tr": {
    "isRtl": false,
    "badge": "Resmi Veri Tüzüğü ve Gizlilik Politikası",
    "heroTitleLine1": "Gizliliğiniz ve Verileriniz",
    "heroTitleLine2": "Tamamen Güvence Altında",
    "heroSub": "Safi Academy, en yüksek küresel veri koruma standartlarına bağlıdır. Veri sorumlusu kimliğimizi, işleme temellerini ve yasal haklarınızı buradan inceleyebilirsiniz.",
    "entityLabel": "Tüzel Kişilik: Safi International Capital LTD",
    "regLabel": "Şirket No: 17063286 (Birleşik Krallık)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Veri Satışı Asla Yapılmaz",
        "desc": "Kişisel bilgilerinizi hiçbir veri aracısına veya üçüncü tarafa satmayız veya kiralamayız.",
        "badge": "Garantili Standart"
      },
      {
        "title": "Ortaklıklarda Şeffaflık",
        "desc": "Registered Agents Inc gibi harici iş ortakları ve yönlendirme çerezleri hakkında tam bilgilendirme.",
        "badge": "FTC Uyumlu"
      },
      {
        "title": "Kurumsal Düzeyde Şifreleme",
        "desc": "Tüm akademi dersleri, sertifikalar ve veri tabanında uçtan uca TLS/SSL şifrelemesi.",
        "badge": "Kriptografik Koruma"
      },
      {
        "title": "GDPR Kapsamında Tam Kontrol",
        "desc": "Hesap verilerinize dilediğiniz zaman erişme, düzeltme, taşıma veya kalıcı olarak silme hakkı.",
        "badge": "Yasal Haklar"
      }
    ],
    "tocTitle": "Hızlı Gezinme",
    "tocCount": "8 Yasal Bölüm",
    "sections": [
      {
        "id": "controller",
        "title": "1. Veri Sorumlusu"
      },
      {
        "id": "collection",
        "title": "2. Toplanan Bilgiler"
      },
      {
        "id": "affiliates",
        "title": "3. Üçüncü Taraf ve İş Ortaklıkları",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Veri İşleme Hukuki Sebepleri"
      },
      {
        "id": "cookies",
        "title": "5. Çerezler ve İzleme Teknolojileri"
      },
      {
        "id": "security",
        "title": "6. Güvenlik ve Saklama Süresi"
      },
      {
        "id": "rights",
        "title": "7. Yasal Haklarınız (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Gizlilik Talepleri"
      }
    ],
    "legalHelp": {
      "title": "Gizlilikle İlgili Sorularınız mı Var?",
      "desc": "Veri işleme süreçleri, mevzuata uyum veya yasal haklarınızın kullanımıyla ilgili destek alın.",
      "btn": "Gizlilik Ekibine E-posta Gönderin"
    },
    "section1": {
      "secBadge": "Bölüm 1",
      "title": "1. Veri Sorumlusu ve Tüzel Kişilik",
      "desc": "Safi International Capital LTD, Safi Academy platformu üzerinden toplanan tüm kişisel veriler için resmi Veri Sorumlusudur (Data Controller).",
      "legalEntityLabel": "Resmi Tüzel Kişilik",
      "companyNumLabel": "Şirket Kayıt Numarası",
      "hqLabel": "Genel Merkez Adresi",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Bölüm 2",
      "title": "2. Topladığımız Bilgiler",
      "desc": "Kişisel verilerinizi yalnızca eğitim içeriklerini sunmak, güvenli girişi sağlamak ve platformu korumak amacıyla toplarız.",
      "cards": [
        {
          "title": "Kimlik ve Profil Bilgileri",
          "desc": "Ad soyad, e-posta adresi, şifrelenmiş parola özetleri, dil tercihi, profil fotoğrafı ve kayıtlı kurs geçmişi."
        },
        {
          "title": "Faturalandırma ve İşlemler",
          "desc": "Sipariş geçmişi ve faturalar. Kredi kartı bilgileri doğrudan PCI-DSS Seviye 1 güvencesine sahip Stripe tarafından işlenir."
        },
        {
          "title": "Teknik Günlükler ve Güvenlik",
          "desc": "IP adresi, tarayıcı türü, işletim sistemi ve sahtekarlıkla mücadele için güvenlik duvarı kayıtları."
        },
        {
          "title": "Akademik İlerleme ve Rozetler",
          "desc": "Sınav notları, ödev teslimleri, akademi puanları, rozetler ve genel Başarı Tablosundaki sıralamalar."
        }
      ]
    },
    "section3": {
      "secBadge": "Bölüm 3 • Özel Önem",
      "title": "Üçüncü Taraf Bağlantıları ve İştirak Ortaklıkları",
      "badge": "Ortaklık Bildirimi",
      "desc": "Teorik eğitimi pratik uygulamaya dönüştürmek amacıyla Safi Academy güvenilir kuruluşları önerir. ABD Şirket Kurulumu bölümümüzde Registered Agents Inc ve AWIN bağlantıları yer almaktadır.",
      "rulesTitle": "Üçüncü Taraf Hizmetleri İçin Temel İlkeler:",
      "bullets": [
        "Öneri bağlantılarına tıklamak, yönlendirmenin Safi Academy'den yapıldığını doğrulamak amacıyla tarayıcınıza bir çerez kaydedebilir.",
        "Safi Academy hiçbir zaman parolalarınızı, öğrenci dosyalarınızı veya kişisel verilerinizi üçüncü taraflarla paylaşmaz.",
        "İlgili şirketin web sitesinde paylaştığınız her türlü bilgi, o şirketin resmi Gizlilik Politikasına tabidir.",
        "Bağlantılarımız üzerinden yapılan işlemlerden, size ek bir ücret yansımaksızın komisyon geliri elde edebiliriz."
      ]
    },
    "section4": {
      "secBadge": "Bölüm 4",
      "title": "Veri İşlemenin Hukuki Sebepleri",
      "desc": "Verileriniz yalnızca Birleşik Krallık Genel Veri Koruma Yönetmeliği (UK GDPR) Madde 6 çerçevesinde işlenir:",
      "items": [
        {
          "title": "Sözleşmenin İfası",
          "desc": "Kurslara erişim sağlanması, videoların izlenmesi, sertifikaların düzenlenmesi ve abonelik yönetimi."
        },
        {
          "title": "Meşru Menfaatler",
          "desc": "Müfredatın geliştirilmesi, sunucuların siber saldırılara karşı korunması ve sistem performans analizi."
        },
        {
          "title": "Yasal ve Mali Yükümlülükler",
          "desc": "Birleşik Krallık vergi ve ticaret mevzuatına uygun şekilde muhasebe kayıtlarının tutulması."
        }
      ]
    },
    "section5": {
      "secBadge": "Bölüm 5",
      "title": "Çerezler ve İzleme Teknolojileri",
      "desc": "Platformumuz oturum güvenliği sağlamak, tercihlerinizi hatırlamak ve eğitim deneyiminizi kişiselleştirmek için çerezler kullanır.",
      "cookies": [
        {
          "title": "Zorunlu Çerezler",
          "desc": "Kimlik doğrulama belirteçleri, oturum güvenliği ve güvenlik duvarı kontrolleri.",
          "badge": "Her Zaman Etkin"
        },
        {
          "title": "Performans ve Analitik Çerezleri",
          "desc": "Derslerin yüklenme süreleri ve kullanıcı etkileşimlerinin anonim ölçümü.",
          "badge": "Ayarlanabilir"
        },
        {
          "title": "Yönlendirme ve İştirak Çerezleri",
          "desc": "Yalnızca doğrulanmış harici iş ortağı bağlantılarına (örn. Registered Agents Inc) tıklandığında çalışır.",
          "badge": "Yalnızca Dış Bağlantılar"
        },
        {
          "title": "Google AdSense Reklam Çerezleri",
          "desc": "Google ve iş ortakları tarafından bu ve diğer web sitelerindeki ziyaretlere dayalı uygun reklamlar sunmak için kullanılır.",
          "badge": "Üçüncü Taraf (Devre Dışı Bırakılabilir)"
        }
      ],
      "adHeading": "Google AdSense ve Dijital Reklam Standartları",
      "adIntro": "Safi Academy, topluluk sayfalarında rahatsız edici olmayan reklamlar sunmak üzere Google AdSense ile çalışır.",
      "adBullets": [
        {
          "lead": "Üçüncü Taraf Sağlayıcılar",
          "text": "Google ve reklam ağları, kullanıcıların sitemizi ve diğer internet sitelerini geçmişteki ziyaretlerine göre reklam sunar."
        },
        {
          "lead": "DoubleClick DART Çerezi",
          "text": "Google'ın reklam çerezleri, öğrencilere eğitimle ilgili faydalı ve alakalı reklamlar göstermesini sağlar."
        },
        {
          "lead": "Kişiselleştirilmiş Reklamları Kapatma",
          "text": "Öğrenciler diledikleri zaman Google Reklam Ayarları (adssettings.google.com) üzerinden kişiselleştirmeyi kapatabilir."
        },
        {
          "lead": "Gizlilik Güvenceleri",
          "text": "Akademi, öğrenci kimlik bilgilerini reklam sağlayıcılarına satmaz ve reklam yerleşimlerini doğal tutar."
        }
      ]
    },
    "section6": {
      "secBadge": "Bölüm 6",
      "title": "Veri Güvenliği ve Saklama Esasları",
      "desc": "Kullanıcı verilerini çok katmanlı idari, teknik ve fiziksel kontrollerle koruruz. Veri aktarımları TLS 1.3 şifreleme protokolleri ile güvenceye alınır.",
      "retentionTitle": "Veri Saklama Süresi",
      "retentionDesc": "Hesabınız aktif olduğu sürece ve yasal saklama süreleri boyunca (BK vergi mevzuatı gereği 6 yıla kadar) kayıtlar tutulur.",
      "transfersTitle": "Uluslararası Veri Aktarımı",
      "transfersDesc": "Sınır ötesi veri aktarımları, Birleşik Krallık IDTA ve Standart Sözleşme Maddelerine (SCC) uygun şifreli bulut sistemlerinde gerçekleştirilir."
    },
    "section7": {
      "secBadge": "Bölüm 7",
      "title": "Yasal Haklarınız (UK GDPR Kapsamında)",
      "desc": "Veri koruma mevzuatı uyarınca kişisel verileriniz üzerinde aşağıdaki yasal haklara sahipsiniz:",
      "rights": [
        {
          "title": "Erişim Hakkı",
          "desc": "Sistemlerimizde saklanan kişisel kayıtlarınızın eksiksiz bir dijital kopyasını talep etme hakkı."
        },
        {
          "title": "Düzeltme Hakkı",
          "desc": "Hatalı, eksik veya güncel olmayan bilgilerin derhal düzeltilmesini isteme hakkı."
        },
        {
          "title": "Silme Hakkı («Unutulma Hakkı»)",
          "desc": "Hesabınızın ve kayıtlarınızın kalıcı ve geri alınamaz biçimde silinmesini talep etme hakkı."
        },
        {
          "title": "İşlemeyi Kısıtlama Hakkı",
          "desc": "Bir itiraz sürecinde verilerinizin işlenmesinin geçici olarak durdurulması."
        },
        {
          "title": "Veri Taşınabilirliği Hakkı",
          "desc": "Kurs kayıtlarınızı ve başarı belgelerinizi standart bir dijital formatta alma hakkı."
        },
        {
          "title": "İtiraz Etme Hakkı",
          "desc": "Yalnızca ticari menfaatlere dayalı veri işlemelerine yasal olarak itiraz etme hakkı."
        }
      ],
      "deletionBox": {
        "title": "Hesabınızı kalıcı olarak silmek mi istiyorsunuz?",
        "sub": "GDPR self-servis portalımız üzerinden otomatik veri silme talebinizi hemen iletebilirsiniz.",
        "btn": "Hesap Silme Portalını Aç"
      }
    },
    "section8": {
      "secBadge": "Bölüm 8",
      "title": "Gizlilik Başvuruları ve Yetkili Makam",
      "desc": "Bu politika hakkındaki sorularınız veya yasal haklarınızı kullanmak için Veri Koruma Ekibimizle iletişime geçebilirsiniz:",
      "emailLabel": "Veri Koruma Yetkilisi (DPO) E-posta Adresi",
      "btn": "Gizlilik E-postası Gönder",
      "icoText": "Verilen yanıttan memnun kalmamanız durumunda Birleşik Krallık Bilgi Komisyonerliği Ofisi'ne (ICO - ico.org.uk) resmi şikayette bulunma hakkınız saklıdır."
    }
  },
  "zh": {
    "isRtl": false,
    "badge": "官方数据宪章与隐私政策",
    "heroTitleLine1": "您的隐私与个人数据",
    "heroTitleLine2": "受到全面严格保护",
    "heroSub": "萨菲学院（Safi Academy）严格遵循全球最高数据保护标准。请查阅我们的数据控制者资质、处理法律依据及您的法定权利。",
    "entityLabel": "运营实体：Safi International Capital LTD",
    "regLabel": "公司注册号：17063286（英国）",
    "lawLabel": "适用英国 GDPR 及 2018 年数据保护法",
    "highlights": [
      {
        "title": "绝不出售数据",
        "desc": "我们绝不会向任何第三方数据中间商出售或出租您的任何个人信息。",
        "badge": "保证承诺"
      },
      {
        "title": "商业合作透明",
        "desc": "对引荐 Cookie 及 Registered Agents Inc 等外部合作伙伴进行充分、清晰的披露。",
        "badge": "符合 FTC 规定"
      },
      {
        "title": "企业级数据加密",
        "desc": "全站课程、凭据以及学员档案全程采用 TLS/SSL 强加密传输与保护。",
        "badge": "密码学安全防护"
      },
      {
        "title": "全面 GDPR 掌控权",
        "desc": "享有不受限制的随时查阅、更正、数据迁移或永久注销账户与清除数据的权利。",
        "badge": "法定学员权益"
      }
    ],
    "tocTitle": "快速导航目录",
    "tocCount": "8 个法律条款章节",
    "sections": [
      {
        "id": "controller",
        "title": "1. 数据控制者"
      },
      {
        "id": "collection",
        "title": "2. 我们收集的信息"
      },
      {
        "id": "affiliates",
        "title": "3. 第三方链接与商业合作",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. 数据处理法律基础"
      },
      {
        "id": "cookies",
        "title": "5. Cookie 与追踪技术"
      },
      {
        "id": "security",
        "title": "6. 安全保障与留存期"
      },
      {
        "id": "rights",
        "title": "7. 您的法定权利 (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. 隐私咨询与监管"
      }
    ],
    "legalHelp": {
      "title": "对隐私保护有任何疑问？",
      "desc": "有关平台数据处理、合规政策或行使个人权利的咨询与支持。",
      "btn": "向隐私团队发送邮件"
    },
    "section1": {
      "secBadge": "第 1 节",
      "title": "1. 数据控制者与法律实体",
      "desc": "Safi International Capital LTD 是通过萨菲学院收集和处理的所有个人数据的官方指定数据控制者（Data Controller）。",
      "legalEntityLabel": "法定注册企业实体",
      "companyNumLabel": "英国公司注册代码",
      "hqLabel": "总部注册办公地址",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第 2 节",
      "title": "2. 我们收集的信息范围",
      "desc": "我们收集个人数据仅用于交付教学课程、保障账户身份安全以及系统稳定运行。",
      "cards": [
        {
          "title": "身份与个人资料数据",
          "desc": "全名、电子邮件地址、加密密码散列值、语言偏好设置、头像以及所选课程学习档案。"
        },
        {
          "title": "账单与支付交易记录",
          "desc": "订购历史、发票及交易参考号。银行卡等敏感金融信息由 Stripe 按照最高 PCI-DSS 一级标准进行托管处理。"
        },
        {
          "title": "设备技术日志与安全",
          "desc": "IP 地址、浏览器类型、操作系统版本、访问时间戳以及用于反欺诈审计的防火墙安全日志。"
        },
        {
          "title": "学习进度与积分榜",
          "desc": "测试成绩、课后作业完成情况、学院积分奖励、荣誉徽章以及公开光荣榜排名。"
        }
      ]
    },
    "section3": {
      "secBadge": "第 3 节 • 重要披露",
      "title": "第三方链接与合作伙伴推广披露",
      "badge": "商业合作说明",
      "desc": "为了将学术教学转化为实际商业落地，萨菲学院推荐信誉卓著的企业服务商。在美国企业注册专区，我们提供了指向 Registered Agents Inc 的推广链接及 AWIN 等联盟网络。",
      "rulesTitle": "第三方外部服务管理准则：",
      "bullets": [
        "点击合作商引荐链接可能会在您的浏览器中保存追踪 Cookie，用以核实访问来自萨菲学院。",
        "萨菲学院绝不会向 Registered Agents Inc 或联盟网络透露您的密码、学员档案或个人资料。",
        "您在合作伙伴网站上提交的任何个人、企业或银行信息均由对方按照其独立的隐私政策直接收集和处理。",
        "若您通过我们的引荐链接购买服务，我们可能会收取一定推广佣金，但这不会增加您的任何额外费用。"
      ]
    },
    "section4": {
      "secBadge": "第 4 节",
      "title": "数据使用的合法性依据",
      "desc": "我们仅在符合英国 GDPR 第 6 条法定条件的前提下处理个人数据：",
      "items": [
        {
          "title": "履行教育服务合同",
          "desc": "提供课程视频流媒体播放、批改作业、颁发毕业证书并管理学员订阅。"
        },
        {
          "title": "平台合法运营利益",
          "desc": "持续升级教学大纲、防范网络黑客攻击以及优化系统响应速度。"
        },
        {
          "title": "法定与税务合规义务",
          "desc": "遵守英国税务及海关总署和公司注册处的法定会计凭证保存要求。"
        }
      ]
    },
    "section5": {
      "secBadge": "第 5 节",
      "title": "Cookie 与追踪技术应用",
      "desc": "本平台采用会话令牌、本地存储与 Cookie，以确保安全登录、记住操作习惯并定制学习环境。",
      "cookies": [
        {
          "title": "核心必需型 Cookie",
          "desc": "用于账户身份鉴权、会话保护和防火墙验证。",
          "badge": "始终开启"
        },
        {
          "title": "性能与统计型 Cookie",
          "desc": "匿名统计课程加载耗时与界面交互指标。",
          "badge": "可自定义"
        },
        {
          "title": "引荐与推广 Cookie",
          "desc": "仅在点击推荐合作伙伴（如 Registered Agents Inc）的外链时激活。",
          "badge": "仅限外部跳转"
        },
        {
          "title": "Google AdSense 广告 Cookie",
          "desc": "供 Google 及其广告合作伙伴根据您对本网站及互联网其它网站的访问记录展示切合需求的广告。",
          "badge": "第三方（可随时关闭）"
        }
      ],
      "adHeading": "Google AdSense 与第三方数字广告合规声明",
      "adIntro": "萨菲学院在部分公共社区区域引入 Google AdSense 以展示非侵入式的合规广告。",
      "adBullets": [
        {
          "lead": "第三方广告供应商",
          "text": "Google 及广告网络通过 Cookie 根据学员过往的浏览轨迹展示相关广告。"
        },
        {
          "lead": "DoubleClick DART Cookie",
          "text": "利用 DART Cookie，Google 可向访问教育网站的用户展示与其兴趣相符的宣传信息。"
        },
        {
          "lead": "停用个性化广告",
          "text": "学员可随时前往 Google 广告设置页面 (adssettings.google.com) 或 AboutAds.info 关闭个性化广告投放。"
        },
        {
          "lead": "隐私防护底线",
          "text": "学院坚决不向广告商泄露学员真实身份，并严格采用原生沉浸式排版以避免干扰学习。"
        }
      ]
    },
    "section6": {
      "secBadge": "第 6 节",
      "title": "数据安全与存储规范",
      "desc": "我们采取多层次的物理、行政与技术防护措施。数据通讯全程使用 TLS 1.3 现代加密协议，并定期进行漏洞排查。",
      "retentionTitle": "数据存储保存期限",
      "retentionDesc": "在您的账户维持活跃期间我们持续保存数据；注销后将根据英国法律要求（法定财务税务凭证最高保存 6 年）进行归档。",
      "transfersTitle": "跨境数据流动合规",
      "transfersDesc": "跨国数据传输严格遵循英国国际数据传输协议（IDTA）和标准合同条款（SCC），并在加密云中存储。"
    },
    "section7": {
      "secBadge": "第 7 节",
      "title": "您的法定权利 (UK GDPR)",
      "desc": "依据英国及欧盟数据保护法规，您对自身个人数据享有以下法定强制权利：",
      "rights": [
        {
          "title": "数据查阅权",
          "desc": "随时申请获取我们所持有的关于您的全部个人档案电子副本。"
        },
        {
          "title": "信息更正权",
          "desc": "要求及时修正任何陈旧、不准确或残缺的个人信息。"
        },
        {
          "title": "彻底删除权（「被遗忘权」）",
          "desc": "申请永久性销毁并抹除您的个人账户与学习数据。"
        },
        {
          "title": "限制处理权",
          "desc": "在对数据准确性存在争议期间，要求暂时冻结数据的使用。"
        },
        {
          "title": "数据可携权",
          "desc": "以通用的电子结构化格式调取您的课程记录与学术档案。"
        },
        {
          "title": "法定异议权",
          "desc": "对仅基于商业利益开展的数据处理行为提出正式合法反对。"
        }
      ],
      "deletionBox": {
        "title": "需要彻底注销您的个人账户吗？",
        "sub": "您可以通过我们的 GDPR 自助服务门户直接提交自动化数据清除申请。",
        "btn": "进入账户注销门户"
      }
    },
    "section8": {
      "secBadge": "第 8 节",
      "title": "隐私咨询与监管申诉途径",
      "desc": "如对本隐私政策有任何疑问，或希望行使法定权利，请直接联系我们的数据合规部门：",
      "emailLabel": "数据保护官 (DPO) 官方联络邮箱",
      "btn": "发送隐私咨询邮件",
      "icoText": "若您对我们的答复不满意，有权直接向英国信息专员办公室 (ICO - ico.org.uk) 提出正式法定投诉。"
    }
  },
  "hi": {
    "isRtl": false,
    "badge": "आधिकारिक डेटा चार्टर और गोपनीयता नीति",
    "heroTitleLine1": "आपकी गोपनीयता और व्यक्तिगत डेटा",
    "heroTitleLine2": "पूरी तरह से सुरक्षित हैं",
    "heroSub": "सफी एकेडमी उच्चतम वैश्विक डेटा सुरक्षा मानकों का पालन करने के लिए प्रतिबद्ध है। हमारे डेटा नियंत्रक विवरण, प्रसंस्करण के आधार और अपने कानूनी अधिकारों की समीक्षा करें।",
    "entityLabel": "कानूनी इकाई: Safi International Capital LTD",
    "regLabel": "कंपनी पंजीकरण संख्या: 17063286 (UK)",
    "lawLabel": "UK GDPR और DPA 2018 कानून",
    "highlights": [
      {
        "title": "डेटा कभी नहीं बेचा जाता",
        "desc": "हम आपकी व्यक्तिगत जानकारी को किसी भी तीसरे पक्ष या डेटा दलालों को कभी नहीं बेचते या किराए पर नहीं देते।",
        "badge": "गारंटीकृत मानक"
      },
      {
        "title": "साझेदारी में पूर्ण पारदर्शिता",
        "desc": "Registered Agents Inc जैसे विश्वसनीय भागीदारों और रेफरल कुकीज़ के बारे में स्पष्ट और पूर्ण प्रकटीकरण।",
        "badge": "FTC नियमों के अनुरूप"
      },
      {
        "title": "उन्नत स्तर का एन्क्रिप्शन",
        "desc": "सभी अकादमिक पाठ्यक्रमों, प्रमाणपत्रों और डेटाबेस पर एंड-टू-एंड TLS/SSL एन्क्रिप्शन।",
        "badge": "क्रिप्टोग्राफिक सुरक्षा"
      },
      {
        "title": "GDPR के तहत पूर्ण नियंत्रण",
        "desc": "किसी भी समय अपने खाते के डेटा तक पहुंचने, सुधारने, स्थानांतरित करने या स्थायी रूप से हटाने का अधिकार।",
        "badge": "छात्र के वैधानिक अधिकार"
      }
    ],
    "tocTitle": "त्वरित नेविगेशन",
    "tocCount": "8 कानूनी खंड",
    "sections": [
      {
        "id": "controller",
        "title": "1. डेटा नियंत्रक"
      },
      {
        "id": "collection",
        "title": "2. एकत्र की जाने वाली जानकारी"
      },
      {
        "id": "affiliates",
        "title": "3. तृतीय-पक्ष और संबद्ध साझेदारियां",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. डेटा उपयोग के कानूनी आधार"
      },
      {
        "id": "cookies",
        "title": "5. कुकीज़ और ट्रैकिंग तकनीक"
      },
      {
        "id": "security",
        "title": "6. सुरक्षा और डेटा प्रतिधारण"
      },
      {
        "id": "rights",
        "title": "7. आपके कानूनी अधिकार (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. गोपनीयता संबंधी पूछताछ"
      }
    ],
    "legalHelp": {
      "title": "डेटा सुरक्षा पर कोई सवाल है?",
      "desc": "डेटा प्रोसेसिंग, नियामक अनुपालन या अपने कानूनी अधिकारों का उपयोग करने के संबंध में संपर्क करें।",
      "btn": "गोपनीयता टीम को ईमेल भेजें"
    },
    "section1": {
      "secBadge": "खंड 1",
      "title": "1. डेटा नियंत्रक और कानूनी इकाई",
      "desc": "Safi International Capital LTD सफी एकेडमी के माध्यम से संसाधित सभी व्यक्तिगत डेटा के लिए आधिकारिक डेटा नियंत्रक (Data Controller) है।",
      "legalEntityLabel": "आधिकारिक कॉर्पोरेट इकाई",
      "companyNumLabel": "कंपनी पंजीकरण संख्या",
      "hqLabel": "मुख्यालय का पता",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "खंड 2",
      "title": "2. हमारे द्वारा एकत्र की जाने वाली जानकारी",
      "desc": "हम आपकी जानकारी केवल शैक्षिक पाठ्यक्रम प्रदान करने, सुरक्षित लॉगिन सुनिश्चित करने और प्लेटफॉर्म की सुरक्षा बनाए रखने के लिए एकत्र करते हैं।",
      "cards": [
        {
          "title": "पहचान और प्रोफ़ाइल विवरण",
          "desc": "पूरा नाम, ईमेल पता, एन्क्रिप्टेड पासवर्ड हैश, भाषा प्राथमिकता, प्रोफ़ाइल फ़ोटो और नामांकित पाठ्यक्रमों का इतिहास।"
        },
        {
          "title": "बिलिंग और वित्तीय लेनदेन",
          "desc": "ऑर्डर का इतिहास, चालान और लेनदेन संदर्भ। कार्ड का संवेदनशील डेटा सीधे PCI-DSS स्तर 1 सुरक्षा के साथ Stripe द्वारा प्रबंधित किया जाता है।"
        },
        {
          "title": "तकनीकी डेटा और सुरक्षा लॉग",
          "desc": "आईपी पता, ब्राउज़र प्रकार, ऑपरेटिंग सिस्टम और धोखाधड़ी की रोकथाम के लिए फ़ायरवॉल सुरक्षा ऑडिट लॉग।"
        },
        {
          "title": "अकादमिक प्रगति और अंक",
          "desc": "प्रश्नोत्तरी परिणाम, गृहकार्य, अकादमी अंक, सम्मान बैज और सार्वजनिक वॉल ऑफ फेम रैंकिंग।"
        }
      ]
    },
    "section3": {
      "secBadge": "खंड 3 • विशेष महत्व",
      "title": "तृतीय-पक्ष लिंक और संबद्ध साझेदारियां",
      "badge": "एफिलिएट प्रकटीकरण",
      "desc": "व्यावहारिक व्यापारिक सेटअप के लिए सफी एकेडमी विश्वसनीय कॉर्पोरेट सेवा प्रदाताओं की सिफारिश करती है। हमारे यूएस कंपनी गठन पोर्टल में Registered Agents Inc और AWIN जैसे नेटवर्कों के रेफरल लिंक शामिल हैं।",
      "rulesTitle": "तृतीय-पक्ष सेवाओं के लिए मुख्य नियम:",
      "bullets": [
        "रेफरल लिंक पर क्लिक करने से आपके ब्राउज़र में एक ट्रैकिंग कुकी संग्रहीत हो सकती है ताकि यह सत्यापित हो सके कि आप सफी एकेडमी से आए हैं।",
        "सफी एकेडमी कभी भी आपके पासवर्ड, व्यक्तिगत रिकॉर्ड या छात्र डेटा को साझेदार संस्थाओं के साथ साझा नहीं करती है।",
        "तृतीय-पक्ष वेबसाइट पर दर्ज की गई कोई भी जानकारी विशेष रूप से उनकी अपनी आधिकारिक गोपनीयता नीति द्वारा शासित होती है।",
        "हम पात्र लेनदेन पर एक रेफरल कमीशन अर्जित कर सकते हैं, जिससे आपकी लागत में कोई अतिरिक्त वृद्धि नहीं होती है।"
      ]
    },
    "section4": {
      "secBadge": "खंड 4",
      "title": "डेटा उपयोग के कानूनी आधार",
      "desc": "हम केवल यूके जीडीपीआर (UK GDPR) के अनुच्छेद 6 के तहत कानूनी रूप से अनुमत होने पर ही व्यक्तिगत डेटा संसाधित करते हैं:",
      "items": [
        {
          "title": "अनुबंध की पूर्ति",
          "desc": "पाठ्यक्रम वितरित करना, वीडियो स्ट्रीमिंग पहुंच प्रदान करना, प्रमाणपत्र जारी करना और छात्र सदस्यता का प्रबंधन।"
        },
        {
          "title": "वैध व्यावसायिक हित",
          "desc": "पाठ्यक्रम सामग्री में निरंतर सुधार, बुनियादी ढांचे को साइबर हमलों से बचाना और प्लेटफ़ॉर्म का विश्लेषण।"
        },
        {
          "title": "वैधानिक और कर संबंधी दायित्व",
          "desc": "यूके कर और कंपनी कानूनों के अनुसार सटीक वित्तीय और लेखा रिकॉर्ड बनाए रखना।"
        }
      ]
    },
    "section5": {
      "secBadge": "खंड 5",
      "title": "कुकीज़ और ट्रैकिंग तकनीक",
      "desc": "हमारा प्लेटफ़ॉर्म सुरक्षित सत्र, खाता सुरक्षा और व्यक्तिगत अध्ययन वातावरण बनाए रखने के लिए कुकीज़ और स्थानीय भंडारण का उपयोग करता है।",
      "cookies": [
        {
          "title": "अत्यंत आवश्यक कुकीज़",
          "desc": "प्रमाणीकरण टोकन, सत्र सुरक्षा और फ़ायरवॉल सत्यापन।",
          "badge": "हमेशा सक्रिय"
        },
        {
          "title": "प्रदर्शन और विश्लेषण कुकीज़",
          "desc": "पाठ लोडिंग समय और प्लेटफ़ॉर्म उपयोग का गुमनाम विश्लेषण।",
          "badge": "समायोज्य"
        },
        {
          "title": "संबद्ध और रेफरल कुकीज़",
          "desc": "केवल बाहरी साझेदार लिंक (जैसे Registered Agents Inc) पर क्लिक करने पर ही सक्रिय होती हैं।",
          "badge": "केवल बाहरी लिंक"
        },
        {
          "title": "Google AdSense विज्ञापन कुकीज़",
          "desc": "Google और उसके भागीदारों द्वारा इस और अन्य वेबसाइटों पर पिछली गतिविधियों के आधार पर प्रासंगिक विज्ञापन दिखाने के लिए उपयोग किया जाता है।",
          "badge": "तृतीय-पक्ष (ऑप्ट-आउट उपलब्ध)"
        }
      ],
      "adHeading": "Google AdSense और तृतीय-पक्ष विज्ञापन अनुपालन",
      "adIntro": "सफी एकेडमी चुनिंदा सामुदायिक पेजों पर प्रासंगिक विज्ञापन प्रदर्शित करने के लिए Google AdSense का उपयोग करती है।",
      "adBullets": [
        {
          "lead": "तृतीय-पक्ष विक्रेता",
          "text": "Google और विज्ञापन नेटवर्क छात्रों की पिछली यात्राओं के आधार पर विज्ञापन प्रदर्शित करने के लिए कुकीज़ का उपयोग करते हैं।"
        },
        {
          "lead": "DoubleClick DART कुकी",
          "text": "Google का यह विज्ञापन कुकी उपयोगकर्ताओं को शिक्षा और इंटरनेट गतिविधियों के आधार पर प्रासंगिक विज्ञापन देने में सक्षम बनाता है।"
        },
        {
          "lead": "व्यक्तिगत विज्ञापनों से बाहर निकलना",
          "text": "छात्र Google Ads Settings (adssettings.google.com) या AboutAds.info के माध्यम से कभी भी व्यक्तिगत विज्ञापनों को बंद कर सकते हैं।"
        },
        {
          "lead": "गोपनीयता सुरक्षा",
          "text": "अकादमी छात्रों की पहचान कभी विज्ञापन ब्रोकरों को नहीं देती और विज्ञापनों को गैर-विघटनकारी प्रारूप में रखती है।"
        }
      ]
    },
    "section6": {
      "secBadge": "खंड 6",
      "title": "डेटा सुरक्षा और भंडारण प्रोटोकॉल",
      "desc": "हम उपयोगकर्ता डेटा को बहुस्तरीय भौतिक, प्रशासनिक और तकनीकी नियंत्रणों से सुरक्षित रखते हैं। डेटा ट्रांसमिशन आधुनिक TLS 1.3 एन्क्रिप्शन के साथ होता है।",
      "retentionTitle": "डेटा प्रतिधारण अवधि",
      "retentionDesc": "हम छात्र रिकॉर्ड तब तक रखते हैं जब तक आपका खाता सक्रिय रहता है, और उसके बाद अनिवार्य वैधानिक अवधि तक (यूके कर रिकॉर्ड के लिए 6 साल तक)।",
      "transfersTitle": "अंतर्राष्ट्रीय डेटा स्थानांतरण",
      "transfersDesc": "सीमा पार डेटा स्थानांतरण यूके अंतर्राष्ट्रीय डेटा स्थानांतरण समझौतों (IDTA) और मानक संविदात्मक खंडों (SCC) के अनुरूप होता है।"
    },
    "section7": {
      "secBadge": "खंड 7",
      "title": "आपके कानूनी अधिकार (UK GDPR के तहत)",
      "desc": "यूके और यूरोपीय संघ के डेटा सुरक्षा कानूनों के तहत आपके पास अपने व्यक्तिगत डेटा पर निम्नलिखित कानूनी अधिकार हैं:",
      "rights": [
        {
          "title": "डेटा तक पहुंच का अधिकार",
          "desc": "हमारे पास मौजूद अपने व्यक्तिगत रिकॉर्ड की पूर्ण डिजिटल प्रतिलिपि प्राप्त करने का अधिकार।"
        },
        {
          "title": "सुधार का अधिकार",
          "desc": "किसी भी गलत, पुरानी या अधूरी जानकारी को तुरंत ठीक कराने का अधिकार।"
        },
        {
          "title": "स्थायी विलोपन का अधिकार («भूल जाने का अधिकार»)",
          "desc": "अपने खाते और डेटा को हमेशा के लिए हटाने का अनुरोध करने का अधिकार।"
        },
        {
          "title": "प्रसंस्करण को प्रतिबंधित करने का अधिकार",
          "desc": "किसी विवाद की जांच के दौरान डेटा प्रोसेसिंग को अस्थायी रूप से रोकने का अधिकार।"
        },
        {
          "title": "डेटा पोर्टेबिलिटी का अधिकार",
          "desc": "अपने शैक्षणिक रिकॉर्ड को एक मानक डिजिटल प्रारूप में प्राप्त करने का अधिकार।"
        },
        {
          "title": "आपत्ति करने का अधिकार",
          "desc": "केवल व्यावसायिक हितों पर आधारित डेटा प्रोसेसिंग पर आपत्ति करने का अधिकार।"
        }
      ],
      "deletionBox": {
        "title": "क्या आप अपना खाता स्थायी रूप से हटाना चाहते हैं?",
        "sub": "आप हमारे GDPR स्वयं-सेवा पोर्टल के माध्यम से डेटा हटाने का अनुरोध सीधे जमा कर सकते हैं।",
        "btn": "खाता विलोपन पोर्टल खोलें"
      }
    },
    "section8": {
      "secBadge": "खंड 8",
      "title": "गोपनीयता पूछताछ और विनियामक संपर्क",
      "desc": "इस नीति के संबंध में किसी भी प्रश्न के लिए, या अपने अधिकारों का प्रयोग करने के लिए हमारी डेटा संरक्षण टीम से संपर्क करें:",
      "emailLabel": "डेटा संरक्षण अधिकारी (DPO) ईमेल",
      "btn": "गोपनीयता ईमेल भेजें",
      "icoText": "यदि आप हमारी प्रतिक्रिया से संतुष्ट नहीं हैं, तो आपको यूके सूचना आयुक्त कार्यालय (ICO) में ico.org.uk पर आधिकारिक शिकायत दर्ज करने का अधिकार है।"
    }
  },
  "de": {
    "isRtl": false,
    "badge": "Offizielle Datenschutzerklärung & Datenschutz-Charta",
    "heroTitleLine1": "Ihre Privatsphäre & Daten",
    "heroTitleLine2": "Sind Vollständig Geschützt",
    "heroSub": "Die Safi Academy verpflichtet sich zu den höchsten globalen Datenschutzstandards. Informieren Sie sich über unsere Verantwortlichen-Zulassung, Rechtsgrundlagen und gesetzlichen Rechte.",
    "entityLabel": "Rechtsträger: Safi International Capital LTD",
    "regLabel": "Handelsregisternr.: 17063286 (UK)",
    "lawLabel": "UK DSGVO & DPA 2018",
    "highlights": [
      {
        "title": "Kein Datenverkauf",
        "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte oder Datenhändler.",
        "badge": "Garantierter Standard"
      },
      {
        "title": "Transparenz bei Partnerschaften",
        "desc": "Vollständige Offenlegung von Affiliate-Cookies und Kooperationen wie mit Registered Agents Inc.",
        "badge": "FTC-konform"
      },
      {
        "title": "Enterprise-Verschlüsselung",
        "desc": "Durchgehende TLS/SSL-Verschlüsselung für alle Akademie-Kurse, Nachweise und Datenbanken.",
        "badge": "Kryptografischer Schutz"
      },
      {
        "title": "Volle Kontrolle nach DSGVO",
        "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit oder dauerhafte Kontolöschung.",
        "badge": "Gesetzliche Rechte"
      }
    ],
    "tocTitle": "Inhaltsübersicht",
    "tocCount": "8 Rechtsabschnitte",
    "sections": [
      {
        "id": "controller",
        "title": "1. Verantwortliche Stelle"
      },
      {
        "id": "collection",
        "title": "2. Erfasste Daten"
      },
      {
        "id": "affiliates",
        "title": "3. Externe Links & Partner",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Rechtsgrundlagen der Verarbeitung"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & Tracking-Technologien"
      },
      {
        "id": "security",
        "title": "6. Sicherheit & Speicherdauer"
      },
      {
        "id": "rights",
        "title": "7. Ihre gesetzlichen Rechte (DSGVO)"
      },
      {
        "id": "contact",
        "title": "8. Datenschutz-Anfragen"
      }
    ],
    "legalHelp": {
      "title": "Haben Sie Fragen zum Datenschutz?",
      "desc": "Anfragen zur Datenverarbeitung, Einhaltung von Vorschriften oder Ausübung Ihrer Betroffenenrechte.",
      "btn": "Datenschutz-Team kontaktieren"
    },
    "section1": {
      "secBadge": "Abschnitt 1",
      "title": "1. Verantwortliche Stelle & Rechtsträger",
      "desc": "Safi International Capital LTD ist der offiziell benannte Verantwortliche (Data Controller) für sämtliche über die Safi Academy verarbeiteten Daten.",
      "legalEntityLabel": "Offizieller Rechtsträger",
      "companyNumLabel": "Unternehmensregisternummer",
      "hqLabel": "Hauptsitz-Adresse",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Abschnitt 2",
      "title": "2. Welche Daten wir erfassen",
      "desc": "Wir erfassen personenbezogene Daten ausschließlich zur Bereitstellung der Kurse, für eine sichere Anmeldung und den Systemschutz.",
      "cards": [
        {
          "title": "Identitäts- & Profildaten",
          "desc": "Vollständiger Name, E-Mail-Adresse, kryptografische Passwort-Hashes, Spracheinstellungen, Profilbild und gebuchte Kurse."
        },
        {
          "title": "Zahlungen & Transaktionen",
          "desc": "Bestellverlauf und Rechnungen. Zahlungskartendaten werden direkt über Stripe nach höchstem PCI-DSS Level 1 Sicherheitsstandard verarbeitet."
        },
        {
          "title": "Technische Logs & Sicherheit",
          "desc": "IP-Adresse, Browsertyp, Betriebssystem und Firewall-Protokolle zur Abwehr von Betrugsversuchen und Cyberangriffen."
        },
        {
          "title": "Lernfortschritt & Auszeichnungen",
          "desc": "Testergebnisse, eingereichte Übungsaufgaben, Akademie-Punkte, Abzeichen und Platzierungen auf der öffentlichen Ruhmeshalle."
        }
      ]
    },
    "section3": {
      "secBadge": "Abschnitt 3 • Besondere Wichtigkeit",
      "title": "Drittanbieter-Links & Affiliate-Offenlegung",
      "badge": "Partner-Offenlegung",
      "desc": "Um Theorie und Praxis zu verknüpfen, empfiehlt die Safi Academy geprüfte Unternehmensdienstleister. Unser Bereich zur US-Firmengründung enthält Empfehlungslinks zu Registered Agents Inc und Netzwerken wie AWIN.",
      "rulesTitle": "Grundsätze für empfohlene Drittanbieter:",
      "bullets": [
        "Das Anklicken von Partnerlinks kann ein Tracking-Cookie im Browser setzen, um nachzuweisen, dass die Weiterleitung von der Safi Academy stammt.",
        "Die Safi Academy gibt unter keinen Umständen Ihre Passwörter, Studentenakten oder persönlichen Daten an Partner weiter.",
        "Alle auf externen Seiten eingegebenen Daten unterliegen ausschließlich der dortigen offiziellen Datenschutzerklärung.",
        "Wir erhalten möglicherweise eine Vermittlungsprovision für qualifizierte Abschlüsse, ohne dass für Sie Mehrkosten entstehen."
      ]
    },
    "section4": {
      "secBadge": "Abschnitt 4",
      "title": "Rechtsgrundlagen der Datenverarbeitung",
      "desc": "Die Verarbeitung erfolgt ausschließlich auf Basis von Artikel 6 der britischen Datenschutz-Grundverordnung (UK GDPR):",
      "items": [
        {
          "title": "Vertragserfüllung",
          "desc": "Bereitstellung von Kursen und Videolektionen, Ausstellung von Zertifikaten und Abonnement-Verwaltung."
        },
        {
          "title": "Berechtigte Interessen",
          "desc": "Fortlaufende Verbesserung der Lehrinhalte, Schutz der Server vor Angriffen und Optimierung der Plattform."
        },
        {
          "title": "Gesetzliche Verpflichtungen",
          "desc": "Aufbewahrung von Finanz- und Buchhaltungsunterlagen gemäß den gesetzlichen Vorschriften im Vereinigten Königreich."
        }
      ]
    },
    "section5": {
      "secBadge": "Abschnitt 5",
      "title": "Cookies & Tracking-Technologien",
      "desc": "Unsere Plattform verwendet Sitzungstoken, lokalen Speicher und Cookies für sichere Logins und individuelle Lernumgebungen.",
      "cookies": [
        {
          "title": "Unbedingt erforderliche Cookies",
          "desc": "Authentifizierungs-Token, Sitzungssicherheit und Firewall-Schutz.",
          "badge": "Immer aktiv"
        },
        {
          "title": "Leistungs- & Statistik-Cookies",
          "desc": "Anonyme Messung von Ladezeiten und Systeminteraktionen.",
          "badge": "Konfigurierbar"
        },
        {
          "title": "Partner- & Referral-Cookies",
          "desc": "Werden nur beim Anklicken externer Partnerlinks (z. B. Registered Agents Inc) aktiviert.",
          "badge": "Nur externe Links"
        },
        {
          "title": "Google AdSense Werbe-Cookies",
          "desc": "Werden von Google und Partnern genutzt, um auf Basis früherer Besuche passende Anzeigen bereitzustellen.",
          "badge": "Drittanbieter (Opt-out möglich)"
        }
      ],
      "adHeading": "Google AdSense & Einhaltung digitaler Werbestandards",
      "adIntro": "Die Safi Academy setzt Google AdSense ein, um dezente Werbung in ausgewählten Community-Bereichen zu schalten.",
      "adBullets": [
        {
          "lead": "Drittanbieter",
          "text": "Google und Werbenetzwerke nutzen Cookies zur Anzeige relevanter Werbung basierend auf früheren Website-Besuchen."
        },
        {
          "lead": "DoubleClick DART-Cookie",
          "text": "Ermöglicht Google die Auslieferung von zielgerichteten Bildungs- und Fachanzeigen."
        },
        {
          "lead": "Deaktivierung personalisierter Werbung",
          "text": "Studenten können personalisierte Werbung jederzeit über die Google-Anzeigeneinstellungen (adssettings.google.com) deaktivieren."
        },
        {
          "lead": "Datenschutzgarantien",
          "text": "Die Akademie übermittelt keine Studentendaten an Werbebroker und wählt unaufdringliche, native Anzeigenformate."
        }
      ]
    },
    "section6": {
      "secBadge": "Abschnitt 6",
      "title": "Datensicherheit & Speicherfristen",
      "desc": "Wir schützen Benutzerdaten durch mehrschichtige administrative, technische und physische Kontrollen. Die Datenübertragung ist mit modernem TLS 1.3 verschlüsselt.",
      "retentionTitle": "Speicherdauer",
      "retentionDesc": "Wir speichern Datensätze solange Ihr Konto aktiv ist, sowie für gesetzlich vorgeschriebene Aufbewahrungsfristen (bis zu 6 Jahre für UK-Steuerunterlagen).",
      "transfersTitle": "Internationale Datenübermittlung",
      "transfersDesc": "Grenzüberschreitende Datenübertragungen entsprechen den UK IDTA und Standardvertragsklauseln (SCC) auf hochsicheren Cloud-Servern."
    },
    "section7": {
      "secBadge": "Abschnitt 7",
      "title": "Ihre gesetzlichen Rechte (nach UK DSGVO)",
      "desc": "Gemäß britischem und europäischem Datenschutzrecht stehen Ihnen folgende gesetzliche Rechte zu:",
      "rights": [
        {
          "title": "Auskunftsrecht",
          "desc": "Anforderung einer vollständigen digitalen Kopie aller bei uns gespeicherten Daten."
        },
        {
          "title": "Recht auf Berichtigung",
          "desc": "Unverzügliche Korrektur unrichtiger, veralteter oder unvollständiger Angaben."
        },
        {
          "title": "Recht auf Löschung («Recht auf Vergessenwerden»)",
          "desc": "Beantragung der dauerhaften und unwiderruflichen Löschung Ihres Kontos."
        },
        {
          "title": "Recht auf Einschränkung",
          "desc": "Vorübergehendes Einfrieren der Verarbeitung während der Prüfung von Einwänden."
        },
        {
          "title": "Recht auf Datenübertragbarkeit",
          "desc": "Erhalt Ihrer Kurs- und Lernnachweise in einem gängigen maschinenlesbaren Format."
        },
        {
          "title": "Widerspruchsrecht",
          "desc": "Recht auf Widerspruch gegen Verarbeitungen, die rein auf berechtigten Interessen beruhen."
        }
      ],
      "deletionBox": {
        "title": "Möchten Sie Ihr Konto dauerhaft löschen?",
        "sub": "Sie können einen automatisierten Antrag auf Kontolöschung direkt über unser DSGVO-Portal stellen.",
        "btn": "Löschungsportal öffnen"
      }
    },
    "section8": {
      "secBadge": "Abschnitt 8",
      "title": "Datenschutzanfragen & Aufsichtsbehörde",
      "desc": "Bei Fragen zu dieser Richtlinie oder zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an unser Datenschutz-Team:",
      "emailLabel": "E-Mail des Datenschutzbeauftragten (DPO)",
      "btn": "Datenschutz-E-Mail senden",
      "icoText": "Sollten Sie mit unserer Antwort unzufrieden sein, haben Sie das Recht, Beschwerde beim Information Commissioner's Office (ICO) unter ico.org.uk einzureichen."
    }
  },
  "fr": {
    "isRtl": false,
    "badge": "Charte officielle des données & Politique de confidentialité",
    "heroTitleLine1": "Votre vie privée & vos données",
    "heroTitleLine2": "Sont pleinement protégées",
    "heroSub": "Safi Academy s'engage à respecter les normes internationales les plus strictes en matière de protection des données. Consultez nos accréditations, bases légales et droits statutaires.",
    "entityLabel": "Entité juridique : Safi International Capital LTD",
    "regLabel": "N° d'enregistrement : 17063286 (Royaume-Uni)",
    "lawLabel": "RGPD britannique & DPA 2018",
    "highlights": [
      {
        "title": "Zéro vente de données",
        "desc": "Nous ne vendons ni ne louons jamais vos données personnelles à des courtiers ou à des tiers.",
        "badge": "Norme garantie"
      },
      {
        "title": "Transparence des affiliations",
        "desc": "Divulgation claire des cookies de parrainage et partenariats tels que Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Chiffrement de niveau bancaire",
        "desc": "Chiffrement TLS/SSL de bout en bout pour tous les cours, certifications et bases de données.",
        "badge": "Protection cryptographique"
      },
      {
        "title": "Contrôle total selon le RGPD",
        "desc": "Droit permanent d'accès, de rectification, de portabilité ou de suppression de vos données.",
        "badge": "Droits légaux"
      }
    ],
    "tocTitle": "Index de navigation",
    "tocCount": "8 sections légales",
    "sections": [
      {
        "id": "controller",
        "title": "1. Responsable du traitement"
      },
      {
        "id": "collection",
        "title": "2. Données collectées"
      },
      {
        "id": "affiliates",
        "title": "3. Liens externes & partenaires",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Bases légales du traitement"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & traceurs"
      },
      {
        "id": "security",
        "title": "6. Sécurité & conservation"
      },
      {
        "id": "rights",
        "title": "7. Vos droits légaux (RGPD)"
      },
      {
        "id": "contact",
        "title": "8. Demandes relatives à la confidentialité"
      }
    ],
    "legalHelp": {
      "title": "Des questions sur vos données ?",
      "desc": "Pour toute question sur la gestion de vos données ou pour faire valoir vos droits légaux.",
      "btn": "Contacter l'équipe de confidentialité"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Responsable du traitement & Entité juridique",
      "desc": "Safi International Capital LTD est le responsable du traitement officiel (Data Controller) de toutes les données personnelles collectées via Safi Academy.",
      "legalEntityLabel": "Entité juridique officielle",
      "companyNumLabel": "Numéro d'immatriculation",
      "hqLabel": "Adresse du siège social",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Informations que nous collectons",
      "desc": "Nous collectons uniquement les données nécessaires à la diffusion des formations, à l'accès sécurisé et à l'intégrité de la plateforme.",
      "cards": [
        {
          "title": "Identité et données de profil",
          "desc": "Nom complet, adresse e-mail, hachages de mots de passe chiffrés, préférences de langue, avatar et historique des cours."
        },
        {
          "title": "Facturation et transactions",
          "desc": "Historique des commandes et factures. Les données de carte bancaire sont gérées directement par Stripe selon la norme PCI-DSS Niveau 1."
        },
        {
          "title": "Données techniques et sécurité",
          "desc": "Adresse IP, type de navigateur, système d'exploitation et journaux de pare-feu pour prévenir les cyberattaques."
        },
        {
          "title": "Progression et badges d'honneur",
          "desc": "Résultats des quiz, devoirs remis, points de l'académie, badges et classements au Tableau d'honneur."
        }
      ]
    },
    "section3": {
      "secBadge": "Section 3 • Haute importance",
      "title": "Liens tiers et déclarations de partenariat",
      "badge": "Déclaration d'affiliation",
      "desc": "Pour relier la théorie à la pratique, Safi Academy recommande des prestataires d'infrastructure reconnus. Notre module de création d'entreprise aux USA contient des liens affiliés vers Registered Agents Inc et des réseaux tels que AWIN.",
      "rulesTitle": "Règles applicables aux services tiers recommandés :",
      "bullets": [
        "Cliquer sur un lien partenaire peut déposer un cookie d'affiliation dans votre navigateur pour certifier que le parrainage provient de Safi Academy.",
        "Safi Academy ne transmet jamais vos mots de passe, dossiers étudiants ou coordonnées privées à des partenaires tiers.",
        "Toute donnée communiquée sur le site d'un partenaire est régie exclusivement par la politique de confidentialité de ce dernier.",
        "Nous pouvons percevoir une commission d'affiliation sans aucun coût supplémentaire pour vous."
      ]
    },
    "section4": {
      "secBadge": "Section 4",
      "title": "Bases légales du traitement des données",
      "desc": "Nous traitons vos données uniquement conformément à l'article 6 du RGPD britannique :",
      "items": [
        {
          "title": "Exécution d'un contrat",
          "desc": "Diffusion des cours vidéo, correction des devoirs, émission des certificats et gestion des abonnements."
        },
        {
          "title": "Intérêts légitimes",
          "desc": "Amélioration des formations, sécurisation des serveurs et analyse des performances du service."
        },
        {
          "title": "Obligations légales et fiscales",
          "desc": "Conservation des pièces comptables requises par les autorités financières du Royaume-Uni."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "Cookies et technologies de traçage",
      "desc": "Notre plateforme utilise des jetons de session, le stockage local et des cookies pour assurer une connexion sécurisée et mémoriser vos préférences.",
      "cookies": [
        {
          "title": "Cookies strictement nécessaires",
          "desc": "Authentification, sécurité des sessions et pare-feu.",
          "badge": "Toujours actifs"
        },
        {
          "title": "Cookies de performance et statistiques",
          "desc": "Mesure anonyme de la vitesse de chargement et des interactions.",
          "badge": "Configurable"
        },
        {
          "title": "Cookies d'affiliation et de recommandation",
          "desc": "Activés uniquement lors d'un clic vers un partenaire externe (ex. Registered Agents Inc).",
          "badge": "Liens externes uniquement"
        },
        {
          "title": "Cookies publicitaires Google AdSense",
          "desc": "Utilisés par Google pour diffuser des annonces pertinentes basées sur les visites antérieures.",
          "badge": "Tiers (désactivation possible)"
        }
      ],
      "adHeading": "Conformité publicitaire Google AdSense et tiers",
      "adIntro": "Safi Academy utilise Google AdSense pour afficher des publicités pertinentes et non intrusives dans certains espaces communautaires.",
      "adBullets": [
        {
          "lead": "Fournisseurs tiers",
          "text": "Google et les réseaux partenaires utilisent des cookies pour diffuser des annonces adaptées aux centres d'intérêt."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Permet à Google d'adapter les annonces éducatives en fonction des navigations sur Internet."
        },
        {
          "lead": "Désactivation des annonces personnalisées",
          "text": "Les étudiants peuvent désactiver la personnalisation sur Google Ads Settings (adssettings.google.com) ou AboutAds.info."
        },
        {
          "lead": "Garantie de confidentialité",
          "text": "L'académie ne communique pas l'identité des étudiants et choisit des formats natifs discrets."
        }
      ]
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "Sécurité des données et protocoles de stockage",
      "desc": "Nous protégeons vos données par des mesures physiques, administratives et techniques rigoureuses. Les transferts s'effectuent via TLS 1.3 avec analyse continue des vulnérabilités.",
      "retentionTitle": "Durée de conservation",
      "retentionDesc": "Les données sont conservées pendant toute la durée d'activité du compte, puis conformément aux obligations légales (jusqu'à 6 ans pour les archives fiscales britanniques).",
      "transfersTitle": "Transferts internationaux",
      "transfersDesc": "Les flux transfrontaliers respectent les accords britanniques IDTA et les clauses contractuelles types (CCT) sur des clouds chiffrés."
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "Vos droits légaux (selon le RGPD britannique)",
      "desc": "En vertu des réglementations britannique et européenne, vous disposez des droits suivants :",
      "rights": [
        {
          "title": "Droit d'accès",
          "desc": "Demander une copie numérique complète de toutes vos données personnelles conservées."
        },
        {
          "title": "Droit de rectification",
          "desc": "Faire corriger rapidement toute information erronée, incomplète ou obsolète."
        },
        {
          "title": "Droit à l'effacement («Droit à l'oubli»)",
          "desc": "Demander la suppression définitive et irréversible de votre compte et de vos données."
        },
        {
          "title": "Droit à la limitation",
          "desc": "Geler temporairement le traitement de vos données lors de l'examen d'un litige."
        },
        {
          "title": "Droit à la portabilité",
          "desc": "Recevoir vos relevés de formation dans un format numérique standard et lisible."
        },
        {
          "title": "Droit d'opposition",
          "desc": "Vous opposer à tout traitement reposant exclusivement sur des intérêts commerciaux."
        }
      ],
      "deletionBox": {
        "title": "Souhaitez-vous supprimer définitivement votre compte ?",
        "sub": "Vous pouvez soumettre une demande automatisée d'effacement via notre portail en libre-service conforme RGPD.",
        "btn": "Ouvrir le portail de suppression"
      }
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "Contact confidentialité et autorité de contrôle",
      "desc": "Pour toute question ou pour exercer vos droits légaux, notre équipe de protection des données est à votre écoute :",
      "emailLabel": "E-mail du délégué à la protection des données (DPO)",
      "btn": "Envoyer un e-mail au DPO",
      "icoText": "Si notre réponse ne vous satisfait pas, vous pouvez déposer une réclamation auprès de l'Information Commissioner's Office (ICO) sur ico.org.uk."
    }
  },
  "es": {
    "isRtl": false,
    "badge": "Estatuto oficial de datos y Política de Privacidad",
    "heroTitleLine1": "Su privacidad y sus datos",
    "heroTitleLine2": "Están plenamente protegidos",
    "heroSub": "Safi Academy se compromete con los más altos estándares globales de protección de datos. Conozca las credenciales del responsable del tratamiento, las bases legales y sus derechos.",
    "entityLabel": "Entidad legal: Safi International Capital LTD",
    "regLabel": "N° de registro: 17063286 (Reino Unido)",
    "lawLabel": "UK GDPR y DPA 2018",
    "highlights": [
      {
        "title": "Cero venta de datos",
        "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos ni a terceros.",
        "badge": "Estándar garantizado"
      },
      {
        "title": "Transparencia en afiliación",
        "desc": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.",
        "badge": "Cumple con la FTC"
      },
      {
        "title": "Cifrado empresarial",
        "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros.",
        "badge": "Protección criptográfica"
      },
      {
        "title": "Control total bajo el RGPD",
        "desc": "Derecho irrestricto de acceso, rectificación, portabilidad o supresión permanente de su cuenta.",
        "badge": "Derechos legales"
      }
    ],
    "tocTitle": "Índice de navegación",
    "tocCount": "8 secciones legales",
    "sections": [
      {
        "id": "controller",
        "title": "1. Responsable del tratamiento"
      },
      {
        "id": "collection",
        "title": "2. Información recopilada"
      },
      {
        "id": "affiliates",
        "title": "3. Enlaces externos y afiliados",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Bases legales del tratamiento"
      },
      {
        "id": "cookies",
        "title": "5. Cookies y seguimiento"
      },
      {
        "id": "security",
        "title": "6. Seguridad y retención"
      },
      {
        "id": "rights",
        "title": "7. Sus derechos legales (RGPD)"
      },
      {
        "id": "contact",
        "title": "8. Consultas de privacidad"
      }
    ],
    "legalHelp": {
      "title": "¿Tiene preguntas sobre sus datos?",
      "desc": "Consultas relativas al tratamiento de datos, cumplimiento normativo o ejercicio de sus derechos.",
      "btn": "Contactar al equipo de privacidad"
    },
    "section1": {
      "secBadge": "Sección 1",
      "title": "1. Responsable del tratamiento y Entidad legal",
      "desc": "Safi International Capital LTD es el responsable oficial del tratamiento de datos (Data Controller) de toda la información recopilada en Safi Academy.",
      "legalEntityLabel": "Entidad jurídica oficial",
      "companyNumLabel": "Número de registro corporativo",
      "hqLabel": "Dirección de la sede central",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sección 2",
      "title": "2. Información que recopilamos",
      "desc": "Recopilamos datos estrictamente para impartir cursos, garantizar un acceso seguro y proteger la plataforma.",
      "cards": [
        {
          "title": "Datos de identidad y perfil",
          "desc": "Nombre completo, correo electrónico, hashes de contraseñas cifradas, idioma preferido, foto de perfil e historial de cursos."
        },
        {
          "title": "Facturación y transacciones",
          "desc": "Historial de pedidos y facturas. Los datos de pago con tarjeta son procesados directamente por Stripe con certificación PCI-DSS Nivel 1."
        },
        {
          "title": "Registros técnicos y seguridad",
          "desc": "Dirección IP, tipo de navegador, sistema operativo y registros de firewall para prevención del fraude y ciberseguridad."
        },
        {
          "title": "Progreso y reconocimientos",
          "desc": "Puntuaciones de cuestionarios, tareas entregadas, puntos de academia, insignias y posición en el Cuadro de Honor público."
        }
      ]
    },
    "section3": {
      "secBadge": "Sección 3 • Alta importancia",
      "title": "Enlaces a terceros y divulgación de afiliados",
      "badge": "Divulgación de afiliados",
      "desc": "Para vincular la formación académica con la práctica empresarial, Safi Academy recomienda proveedores corporativos verificados. La sección de creación de empresas en EE. UU. contiene enlaces a Registered Agents Inc y redes como AWIN.",
      "rulesTitle": "Normas aplicables a servicios de terceros recomendados:",
      "bullets": [
        "Hacer clic en enlaces de socios puede almacenar una cookie de seguimiento en su navegador para confirmar que la referencia proviene de Safi Academy.",
        "Safi Academy nunca comparte sus contraseñas, expedientes académicos o información confidencial con socios de terceros.",
        "Cualquier dato suministrado en el portal del tercero se rige exclusivamente por la política de privacidad de dicha entidad.",
        "Podemos recibir una comisión por operaciones elegibles sin que esto suponga ningún coste adicional para usted."
      ]
    },
    "section4": {
      "secBadge": "Sección 4",
      "title": "Bases legales del tratamiento de datos",
      "desc": "Tratamos sus datos personales únicamente bajo las condiciones del Artículo 6 del RGPD británico:",
      "items": [
        {
          "title": "Ejecución de un contrato",
          "desc": "Entrega de contenidos, acceso a vídeos, expedición de certificados y gestión de suscripciones."
        },
        {
          "title": "Intereses legítimos",
          "desc": "Mejora continua del plan de estudios, defensa de los servidores contra ataques y análisis de rendimiento."
        },
        {
          "title": "Obligaciones legales y fiscales",
          "desc": "Conservación de documentación contable y fiscal según las normas del Reino Unido."
        }
      ]
    },
    "section5": {
      "secBadge": "Sección 5",
      "title": "Cookies y tecnologías de seguimiento",
      "desc": "Nuestra plataforma emplea tokens de sesión, almacenamiento local y cookies para garantizar una autenticación segura y personalizar el entorno de estudio.",
      "cookies": [
        {
          "title": "Cookies estrictamente necesarias",
          "desc": "Tokens de autenticación, seguridad de la sesión y firewall.",
          "badge": "Siempre activas"
        },
        {
          "title": "Cookies de rendimiento y análisis",
          "desc": "Medición anónima de tiempos de carga e interacción con la plataforma.",
          "badge": "Configurables"
        },
        {
          "title": "Cookies de referencia y afiliación",
          "desc": "Se activan solo al hacer clic en enlaces de socios externos (p. ej., Registered Agents Inc).",
          "badge": "Solo enlaces externos"
        },
        {
          "title": "Cookies publicitarias de Google AdSense",
          "desc": "Utilizadas por Google y sus socios para mostrar anuncios pertinentes basados en visitas anteriores.",
          "badge": "Terceros (opción de exclusión)"
        }
      ],
      "adHeading": "Cumplimiento publicitario de Google AdSense y terceros",
      "adIntro": "Safi Academy utiliza Google AdSense para mostrar publicidad relevante y no invasiva en áreas seleccionadas de la comunidad.",
      "adBullets": [
        {
          "lead": "Proveedores externos",
          "text": "Google y las redes publicitarias usan cookies para ofrecer anuncios basados en visitas anteriores."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Permite a Google ofrecer anuncios educativos y comerciales adaptados a los intereses de los usuarios."
        },
        {
          "lead": "Exclusión de anuncios personalizados",
          "text": "Los usuarios pueden inhabilitar la personalización en Google Ads Settings (adssettings.google.com) o AboutAds.info."
        },
        {
          "lead": "Protección de la privacidad",
          "text": "La academia no vende datos personales a intermediarios y prioriza formatos nativos y discretos."
        }
      ]
    },
    "section6": {
      "secBadge": "Sección 6",
      "title": "Seguridad de los datos y protocolos de retención",
      "desc": "Protegemos los datos con rigurosas medidas físicas, organizativas y técnicas. El tráfico de datos se cifra mediante protocolos TLS 1.3 con monitorización continua.",
      "retentionTitle": "Período de retención",
      "retentionDesc": "Conservamos los datos mientras su cuenta permanezca activa, más los períodos legales obligatorios (hasta 6 años para registros fiscales del Reino Unido).",
      "transfersTitle": "Transferencias internacionales",
      "transfersDesc": "Las transferencias transfronterizas cumplen estrictamente con los acuerdos británicos IDTA y las cláusulas contractuales tipo (SCC)."
    },
    "section7": {
      "secBadge": "Sección 7",
      "title": "Sus derechos legales (UK GDPR)",
      "desc": "Conforme a las leyes de protección de datos del Reino Unido y la UE, usted cuenta con los siguientes derechos exigibles:",
      "rights": [
        {
          "title": "Derecho de acceso",
          "desc": "Solicitar una copia digital completa de todos sus registros personales conservados."
        },
        {
          "title": "Derecho de rectificación",
          "desc": "Corregir inmediatamente datos inexactos, incompletos o desactualizados."
        },
        {
          "title": "Derecho de supresión («Derecho al olvido»)",
          "desc": "Solicitar la eliminación definitiva e irreversible de su cuenta y sus datos."
        },
        {
          "title": "Derecho de limitación",
          "desc": "Suspender temporalmente el tratamiento de datos durante la resolución de disputas."
        },
        {
          "title": "Derecho a la portabilidad",
          "desc": "Obtener sus expedientes educativos en un formato electrónico estructurado común."
        },
        {
          "title": "Derecho de oposición",
          "desc": "Oponerse a tratamientos basados exclusivamente en intereses comerciales."
        }
      ],
      "deletionBox": {
        "title": "¿Desea eliminar permanentemente su cuenta?",
        "sub": "Puede enviar una solicitud automatizada de supresión de datos a través de nuestro portal de autoservicio RGPD.",
        "btn": "Abrir portal de eliminación"
      }
    },
    "section8": {
      "secBadge": "Sección 8",
      "title": "Consultas de privacidad y autoridad de control",
      "desc": "Para cualquier consulta sobre esta política o para ejercer sus derechos, comuníquese con nuestro equipo de protección de datos:",
      "emailLabel": "Correo del Delegado de Protección de Datos (DPO)",
      "btn": "Enviar correo al DPO",
      "icoText": "Si no está satisfecho con nuestra respuesta, tiene derecho a presentar una reclamación ante la Information Commissioner's Office (ICO) en ico.org.uk."
    }
  },
  "it": {
    "isRtl": false,
    "badge": "Statuto ufficiale dei dati & Informativa sulla Privacy",
    "heroTitleLine1": "La tua privacy e i tuoi dati",
    "heroTitleLine2": "Sono pienamente protetti",
    "heroSub": "Safi Academy rispetta i più elevati standard globali di protezione dei dati personali. Consulta le informazioni sul titolare del trattamento, le basi giuridiche e i tuoi diritti statutari.",
    "entityLabel": "Soggetto giuridico: Safi International Capital LTD",
    "regLabel": "N° iscrizione: 17063286 (Regno Unito)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Nessuna vendita di dati",
        "desc": "Non vendiamo né cediamo mai in locazione i tuoi dati personali a intermediari di dati o terze parti.",
        "badge": "Standard garantito"
      },
      {
        "title": "Trasparenza delle affiliazioni",
        "desc": "Completa informativa sui cookie di tracciamento e su partner esterni come Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Crittografia di livello enterprise",
        "desc": "Crittografia TLS/SSL end-to-end per tutti i corsi, le credenziali e i registri dell'accademia.",
        "badge": "Tutela crittografica"
      },
      {
        "title": "Pieno controllo ai sensi del GDPR",
        "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare il proprio account in qualsiasi momento.",
        "badge": "Diritti dello studente"
      }
    ],
    "tocTitle": "Indice dei contenuti",
    "tocCount": "8 sezioni legali",
    "sections": [
      {
        "id": "controller",
        "title": "1. Titolare del trattamento"
      },
      {
        "id": "collection",
        "title": "2. Dati raccolti"
      },
      {
        "id": "affiliates",
        "title": "3. Link esterni e partner affiliati",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Basi giuridiche del trattamento"
      },
      {
        "id": "cookies",
        "title": "5. Cookie e tecnologie di tracciamento"
      },
      {
        "id": "security",
        "title": "6. Sicurezza e conservazione"
      },
      {
        "id": "rights",
        "title": "7. I tuoi diritti legali (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Richieste sulla privacy"
      }
    ],
    "legalHelp": {
      "title": "Hai domande sulla privacy?",
      "desc": "Richieste relative al trattamento dei dati, alla conformità o all'esercizio dei tuoi diritti legali.",
      "btn": "Contatta il team privacy"
    },
    "section1": {
      "secBadge": "Sezione 1",
      "title": "1. Titolare del trattamento e Soggetto giuridico",
      "desc": "Safi International Capital LTD è il titolare ufficiale del trattamento (Data Controller) per tutti i dati personali gestiti tramite Safi Academy.",
      "legalEntityLabel": "Ente giuridico ufficiale",
      "companyNumLabel": "Numero di iscrizione societaria",
      "hqLabel": "Indirizzo della sede centrale",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sezione 2",
      "title": "2. Informazioni che raccogliamo",
      "desc": "Raccogliamo dati personali esclusivamente per erogare i corsi formativi, garantire accessi sicuri e proteggere l'infrastruttura.",
      "cards": [
        {
          "title": "Dati di identità e profilo",
          "desc": "Nome completo, indirizzo email, hash di password crittografate, lingua preferita, avatar e storico delle iscrizioni."
        },
        {
          "title": "Fatturazione e transazioni",
          "desc": "Cronologia ordini e fatture. I dati delle carte di pagamento sono gestiti direttamente da Stripe secondo lo standard PCI-DSS Livello 1."
        },
        {
          "title": "Log tecnici e sicurezza",
          "desc": "Indirizzo IP, tipo di browser, sistema operativo e registri del firewall per la prevenzione delle frodi."
        },
        {
          "title": "Progresso didattico e punti",
          "desc": "Punteggi dei quiz, compiti consegnati, punti accademia, badge d'onore e posizioni nella classifica pubblica."
        }
      ]
    },
    "section3": {
      "secBadge": "Sezione 3 • Massima rilevanza",
      "title": "Link di terze parti e informativa sulle affiliazioni",
      "badge": "Informativa di affiliazione",
      "desc": "Per collegare la formazione all'avvio concreto di imprese, Safi Academy raccomanda fornitori societari affidabili. La sezione per la costituzione di società USA include link affiliati verso Registered Agents Inc e reti come AWIN.",
      "rulesTitle": "Regole operative per i servizi di terze parti:",
      "bullets": [
        "Facendo clic sui link dei partner potrebbe essere memorizzato un cookie di tracciamento per verificare che l'invito provenga da Safi Academy.",
        "Safi Academy non condivide mai le tue password, il dossier studentesco o i tuoi documenti personali con soggetti terzi.",
        "Tutti i dati inseriti sul portale del partner sono disciplinati unicamente dalla politica sulla privacy del partner stesso.",
        "Potremmo ricevere una commissione di affiliazione per le transazioni idonee, senza alcun costo aggiuntivo a tuo carico."
      ]
    },
    "section4": {
      "secBadge": "Sezione 4",
      "title": "Basi giuridiche del trattamento dei dati",
      "desc": "Trattiamo i dati solo ove consentito dall'Articolo 6 dell'UK GDPR:",
      "items": [
        {
          "title": "Esecuzione contrattuale",
          "desc": "Erogazione di corsi video, correzione delle verifiche, rilascio di attestati e gestione degli abbonamenti."
        },
        {
          "title": "Legittimi interessi",
          "desc": "Perfezionamento della didattica, difesa dei server da attacchi informatici e monitoraggio dell'efficienza della piattaforma."
        },
        {
          "title": "Obblighi legali e fiscali",
          "desc": "Conservazione dei registri contabili e fiscali secondo la normativa societaria del Regno Unito."
        }
      ]
    },
    "section5": {
      "secBadge": "Sezione 5",
      "title": "Cookie e tecnologie di tracciamento",
      "desc": "La nostra piattaforma adotta token di sessione, archiviazione locale e cookie per consentire accessi sicuri e personalizzare l'apprendimento.",
      "cookies": [
        {
          "title": "Cookie strettamente necessari",
          "desc": "Autenticazione, sicurezza della sessione e controlli del firewall.",
          "badge": "Sempre attivi"
        },
        {
          "title": "Cookie di rendimento e analisi",
          "desc": "Misurazione anonima della velocità di caricamento e delle interazioni.",
          "badge": "Configurabili"
        },
        {
          "title": "Cookie di affiliazione e referral",
          "desc": "Attivati unicamente facendo clic su link di partner esterni verificati (es. Registered Agents Inc).",
          "badge": "Solo link esterni"
        },
        {
          "title": "Cookie pubblicitari Google AdSense",
          "desc": "Utilizzati da Google e partner commerciali per proporre annunci pertinenti basati sulle precedenti visite sul web.",
          "badge": "Terze parti (disattivazione disponibile)"
        }
      ],
      "adHeading": "Conformità pubblicitaria Google AdSense",
      "adIntro": "Safi Academy collabora con Google AdSense per offrire annunci pubblicitari pertinenti e non invasivi in specifiche aree del sito.",
      "adBullets": [
        {
          "lead": "Fornitori terzi",
          "text": "Google e le reti pubblicitarie usano i cookie per mostrare inserzioni in base alle visite pregresse."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Permette a Google di fornire annunci formativi e rilevanti in linea con gli interessi degli utenti."
        },
        {
          "lead": "Disattivazione annunci personalizzati",
          "text": "Gli studenti possono disattivare la personalizzazione tramite le Impostazioni annunci Google (adssettings.google.com) o AboutAds.info."
        },
        {
          "lead": "Tutela della riservatezza",
          "text": "L'accademia non comunica i dati personali a intermediari pubblicitari e adotta posizionamenti discreti."
        }
      ]
    },
    "section6": {
      "secBadge": "Sezione 6",
      "title": "Sicurezza dei dati e protocolli di archiviazione",
      "desc": "Proteggiamo i dati con rigorose tutele fisiche, gestionali e tecnologiche. Le comunicazioni avvengono con crittografia TLS 1.3 e scansioni costanti delle vulnerabilità.",
      "retentionTitle": "Periodo di conservazione",
      "retentionDesc": "I dati sono conservati per la durata di attività dell'account e per i successivi periodi obbligatori per legge (fino a 6 anni per i documenti fiscali UK).",
      "transfersTitle": "Trasferimenti internazionali di dati",
      "transfersDesc": "I trasferimenti transfrontalieri rispettano gli accordi IDTA del Regno Unito e le clausole contrattuali standard (SCC)."
    },
    "section7": {
      "secBadge": "Sezione 7",
      "title": "I tuoi diritti statutari (UK GDPR)",
      "desc": "Ai sensi delle normative britanniche ed europee, disponi dei seguenti diritti legali azionabili:",
      "rights": [
        {
          "title": "Diritto di accesso",
          "desc": "Richiedere una copia digitale completa di tutti i dati personali conservati."
        },
        {
          "title": "Diritto di rettifica",
          "desc": "Correggere tempestivamente dati inesatti, obsoleti o incompleti."
        },
        {
          "title": "Diritto alla cancellazione («Diritto all'oblio»)",
          "desc": "Richiedere la distruzione permanente e irrevocabile del proprio account e dei dati."
        },
        {
          "title": "Diritto di limitazione",
          "desc": "Bloccare temporaneamente il trattamento dei dati in pendenza di contestazioni."
        },
        {
          "title": "Diritto alla portabilità",
          "desc": "Ottenere i propri registri accademici in un formato digitale strutturato standard."
        },
        {
          "title": "Diritto di opposizione",
          "desc": "Opporsi a trattamenti fondati unicamente su interessi commerciali."
        }
      ],
      "deletionBox": {
        "title": "Desideri cancellare definitivamente il tuo account?",
        "sub": "Puoi inoltrare una richiesta di eliminazione automatica tramite il nostro portale self-service conforme al GDPR.",
        "btn": "Apri portale cancellazione"
      }
    },
    "section8": {
      "secBadge": "Sezione 8",
      "title": "Contatti per la privacy e autorità di vigilanza",
      "desc": "Per quesiti relativi alla presente informativa o per far valere i tuoi diritti, contatta il nostro Team di Protezione dei Dati:",
      "emailLabel": "Email del Responsabile della Protezione dei Dati (DPO)",
      "btn": "Invia email al DPO",
      "icoText": "Qualora la nostra risposta non sia soddisfacente, hai il diritto di proporre reclamo all'Information Commissioner's Office (ICO) all'indirizzo ico.org.uk."
    }
  },
  "pt": {
    "isRtl": false,
    "badge": "Carta Oficial de Dados & Política de Privacidade",
    "heroTitleLine1": "Sua privacidade e seus dados",
    "heroTitleLine2": "Estão totalmente protegidos",
    "heroSub": "A Safi Academy está comprometida com os mais altos padrões internacionais de proteção de dados. Conheça as credenciais do controlador, bases legais e seus direitos previstos em lei.",
    "entityLabel": "Entidade legal: Safi International Capital LTD",
    "regLabel": "N° de registro: 17063286 (Reino Unido)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Zero venda de dados",
        "desc": "Nunca vendemos ou alugamos suas informações pessoais a corretores de dados ou terceiros.",
        "badge": "Padrão garantido"
      },
      {
        "title": "Transparência em parcerias",
        "desc": "Divulgação transparente sobre cookies de indicação e parceiros como a Registered Agents Inc.",
        "badge": "Conforme regras da FTC"
      },
      {
        "title": "Criptografia corporativa",
        "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, certificados e bancos de dados.",
        "badge": "Guarda criptográfica"
      },
      {
        "title": "Controle total sob o GDPR",
        "desc": "Direito irrevogável de acessar, retificar, portar ou excluir permanentemente seus dados a qualquer momento.",
        "badge": "Direitos garantidos"
      }
    ],
    "tocTitle": "Índice de navegação",
    "tocCount": "8 seções legais",
    "sections": [
      {
        "id": "controller",
        "title": "1. Controlador de dados"
      },
      {
        "id": "collection",
        "title": "2. Informações que coletamos"
      },
      {
        "id": "affiliates",
        "title": "3. Links externos & afiliados",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Bases legais do tratamento"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & tecnologias de rastreamento"
      },
      {
        "id": "security",
        "title": "6. Segurança & retenção"
      },
      {
        "id": "rights",
        "title": "7. Seus direitos legais (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Consultas de privacidade"
      }
    ],
    "legalHelp": {
      "title": "Dúvidas sobre seus dados?",
      "desc": "Consultas sobre o tratamento de informações, conformidade com a legislação ou exercício de direitos.",
      "btn": "Contatar equipe de privacidade"
    },
    "section1": {
      "secBadge": "Seção 1",
      "title": "1. Controlador de Dados & Entidade Jurídica",
      "desc": "A Safi International Capital LTD é a controladora oficial (Data Controller) de todos os dados pessoais coletados pela Safi Academy.",
      "legalEntityLabel": "Entidade legal registrada",
      "companyNumLabel": "Número de registro corporativo",
      "hqLabel": "Endereço da sede central",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Seção 2",
      "title": "2. Informações que coletamos",
      "desc": "Coletamos dados exclusivamente para fornecer cursos didáticos, garantir logins protegidos e manter a segurança da plataforma.",
      "cards": [
        {
          "title": "Dados de identidade e perfil",
          "desc": "Nome completo, endereço de e-mail, senhas com hash criptográfico, idioma preferido, foto de perfil e histórico de matrículas."
        },
        {
          "title": "Faturamento e pagamentos",
          "desc": "Histórico de compras e faturas. Dados de cartão de pagamento são tratados diretamente pela Stripe com certificação PCI-DSS Nível 1."
        },
        {
          "title": "Registros técnicos e segurança",
          "desc": "Endereço IP, tipo de navegador, sistema operacional e logs de firewall para proteção contra fraudes e ameaças cibernéticas."
        },
        {
          "title": "Desempenho e conquistas",
          "desc": "Notas de testes, tarefas concluídas, pontos da academia, medalhas de honra e posição no Mural da Fama público."
        }
      ]
    },
    "section3": {
      "secBadge": "Seção 3 • Alta relevância",
      "title": "Links de terceiros e divulgação de parcerias",
      "badge": "Divulgação de afiliados",
      "desc": "Para unir a teoria acadêmica à fundação real de empresas, a Safi Academy indica prestadores de serviços de excelência. Na área de abertura de empresas nos EUA, disponibilizamos links de indicação para a Registered Agents Inc e redes como AWIN.",
      "rulesTitle": "Diretrizes para serviços recomendados de terceiros:",
      "bullets": [
        "Clicar nos links de parceiros pode gravar um cookie de rastreamento no seu navegador para comprovar que a indicação partiu da Safi Academy.",
        "A Safi Academy nunca compartilha senhas, dossiês educacionais ou dados sigilosos com parceiros terceirizados.",
        "Quaisquer dados fornecidos no portal do parceiro são regidos unicamente pela política de privacidade do respectivo parceiro.",
        "Podemos receber uma comissão de afiliado em transações qualificadas sem qualquer custo adicional para você."
      ]
    },
    "section4": {
      "secBadge": "Seção 4",
      "title": "Bases legais para o uso de dados",
      "desc": "Tratamos dados pessoais estritamente de acordo com o Artigo 6 do UK GDPR:",
      "items": [
        {
          "title": "Cumprimento de obrigações contratuais",
          "desc": "Disponibilização de videoaulas, correção de trabalhos, emissão de certificados e gestão de assinaturas."
        },
        {
          "title": "Interesses legítimos",
          "desc": "Aprimoramento contínuo dos cursos, proteção dos servidores contra ataques e análise de estabilidade do sistema."
        },
        {
          "title": "Obrigações legais e fiscais",
          "desc": "Manutenção de livros contábeis e fiscais exigidos pelas autoridades reguladoras do Reino Unido."
        }
      ]
    },
    "section5": {
      "secBadge": "Seção 5",
      "title": "Cookies e tecnologias de rastreamento",
      "desc": "Nossa plataforma utiliza tokens de sessão, armazenamento local e cookies para garantir logins seguros e personalizar seu ambiente.",
      "cookies": [
        {
          "title": "Cookies estritamente necessários",
          "desc": "Tokens de autenticação, proteção de sessão e verificações de firewall.",
          "badge": "Sempre ativos"
        },
        {
          "title": "Cookies de desempenho e métricas",
          "desc": "Medição anônima de tempo de carregamento e taxas de interação.",
          "badge": "Configuráveis"
        },
        {
          "title": "Cookies de indicação e afiliados",
          "desc": "Acionados apenas quando você clica em links de parceiros externos certificados (ex.: Registered Agents Inc).",
          "badge": "Apenas links externos"
        },
        {
          "title": "Cookies publicitários do Google AdSense",
          "desc": "Utilizados pelo Google e parceiros para exibir anúncios pertinentes com base em navegações anteriores na web.",
          "badge": "Terceiros (desativação disponível)"
        }
      ],
      "adHeading": "Conformidade de anúncios Google AdSense e terceiros",
      "adIntro": "A Safi Academy utiliza o Google AdSense para exibir publicidade relevante e não intrusiva em espaços selecionados.",
      "adBullets": [
        {
          "lead": "Fornecedores terceirizados",
          "text": "O Google e as redes de anúncios utilizam cookies para exibir publicidade alinhada ao histórico de navegação."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Permite que o Google apresente anúncios educacionais e profissionais relevantes aos estudantes."
        },
        {
          "lead": "Desativação de anúncios personalizados",
          "text": "Você pode desativar a personalização de anúncios nas Configurações do Google (adssettings.google.com) ou pelo AboutAds.info."
        },
        {
          "lead": "Compromisso com a privacidade",
          "text": "A academia não transfere identidades de alunos para intermediários e adota formatos nativos e discretos."
        }
      ]
    },
    "section6": {
      "secBadge": "Seção 6",
      "title": "Segurança de dados e protocolos de retenção",
      "desc": "Protegemos os dados com rigorosos controles físicos, administrativos e digitais. A transferência de dados utiliza criptografia TLS 1.3 com varredura contínua.",
      "retentionTitle": "Prazo de retenção dos dados",
      "retentionDesc": "Mantemos os dados enquanto sua conta estiver ativa, e subsequentemente pelos prazos legais estabelecidos (até 6 anos para registros fiscais do Reino Unido).",
      "transfersTitle": "Transferências internacionais de dados",
      "transfersDesc": "As transferências além-fronteiras atendem rigorosamente aos acordos britânicos IDTA e às cláusulas contratuais padrão (SCC)."
    },
    "section7": {
      "secBadge": "Seção 7",
      "title": "Seus direitos legais (sob o UK GDPR)",
      "desc": "De acordo com a legislação do Reino Unido e da União Europeia, você detém os seguintes direitos garantidos:",
      "rights": [
        {
          "title": "Direito de acesso",
          "desc": "Solicitar cópia digital completa de todos os seus dados pessoais armazenados."
        },
        {
          "title": "Direito de retificação",
          "desc": "Exigir a correção imediata de informações incorretas, incompletas ou desatualizadas."
        },
        {
          "title": "Direito à exclusão («Direito ao esquecimento»)",
          "desc": "Solicitar a eliminação permanente e irreversível da sua conta e registros."
        },
        {
          "title": "Direito à limitação",
          "desc": "Congelar temporariamente o processamento dos seus dados durante a averiguação de disputas."
        },
        {
          "title": "Direito à portabilidade",
          "desc": "Receber seus registros acadêmicos em formato eletrônico estruturado e interoperável."
        },
        {
          "title": "Direito de oposição",
          "desc": "Opor-se a operações de tratamento fundamentadas exclusivamente em interesses comerciais."
        }
      ],
      "deletionBox": {
        "title": "Deseja excluir sua conta definitivamente?",
        "sub": "Envie um pedido automático de expurgo de dados através do nosso portal de autoatendimento GDPR.",
        "btn": "Abrir portal de exclusão"
      }
    },
    "section8": {
      "secBadge": "Seção 8",
      "title": "Consultas de privacidade e órgão regulador",
      "desc": "Para perguntas sobre esta política ou para exercer seus direitos, entre em contato com nossa Equipe de Proteção de Dados:",
      "emailLabel": "E-mail do Encarregado de Proteção de Dados (DPO)",
      "btn": "Enviar e-mail de privacidade",
      "icoText": "Caso nossa resposta não seja satisfatória, você tem o direito de prestar queixa formal junto ao Information Commissioner's Office (ICO) em ico.org.uk."
    }
  },
  "ja": {
    "isRtl": false,
    "badge": "公式データ憲章およびプライバシーポリシー",
    "heroTitleLine1": "お客様のプライバシーとデータは",
    "heroTitleLine2": "最高水準で厳重に保護されています",
    "heroSub": "サフィ・アカデミー（Safi Academy）は世界最高峰のデータ保護基準を遵守します。データ管理者の認証、法的根拠、およびお客様の権利についてご確認ください。",
    "entityLabel": "運営法人: Safi International Capital LTD",
    "regLabel": "英国法人登録番号: 17063286 (UK)",
    "lawLabel": "英国GDPRおよび2018年データ保護法準拠",
    "highlights": [
      {
        "title": "データの第三者売却は一切なし",
        "desc": "個人情報をデータブローカーや第三者へ販売・貸与することは決してありません。",
        "badge": "保証基準"
      },
      {
        "title": "提携関係の完全な透明性",
        "desc": "紹介CookieやRegistered Agents Inc等の外部パートナーとの関係を明確に開示します。",
        "badge": "FTC基準準拠"
      },
      {
        "title": "エンタープライズ暗号化",
        "desc": "すべての講座、認証情報、アカデミーの記録にエンドツーエンドのTLS/SSL暗号化を適用。",
        "badge": "暗号技術による保護"
      },
      {
        "title": "GDPRに基づく自己決定権",
        "desc": "アカウントデータの確認、訂正、移行、恒久的な削除を行う完全な権利を保障します。",
        "badge": "法定権利の保障"
      }
    ],
    "tocTitle": "目次ナビゲーション",
    "tocCount": "8つの条項",
    "sections": [
      {
        "id": "controller",
        "title": "1. データ管理者"
      },
      {
        "id": "collection",
        "title": "2. 収集する情報"
      },
      {
        "id": "affiliates",
        "title": "3. 外部連携とアフィリエイト開示",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. データ利用の法的根拠"
      },
      {
        "id": "cookies",
        "title": "5. クッキーと追跡技術"
      },
      {
        "id": "security",
        "title": "6. セキュリティと保存期間"
      },
      {
        "id": "rights",
        "title": "7. お客様の法的権利 (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. プライバシーに関するお問い合わせ"
      }
    ],
    "legalHelp": {
      "title": "データ保護に関するご質問はありますか？",
      "desc": "データ取り扱い、コンプライアンス、または法的権利の行使についてのお問い合わせ。",
      "btn": "プライバシー担当チームへ連絡"
    },
    "section1": {
      "secBadge": "第1条",
      "title": "1. データ管理者および運営法人",
      "desc": "Safi International Capital LTDは、Safi Academyを通じて収集・処理されるすべての個人データの公式データ管理者（Data Controller）です。",
      "legalEntityLabel": "正式運営法人",
      "companyNumLabel": "会社登録番号",
      "hqLabel": "本店所在地",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第2条",
      "title": "2. 当校が収集する情報",
      "desc": "当校は教育講座の提供、安全なログイン認証、およびプラットフォームの保全を目的としてのみデータを収集します。",
      "cards": [
        {
          "title": "本人確認およびプロフィール情報",
          "desc": "氏名、メールアドレス、暗号化パスワードハッシュ、言語設定、アイコン画像、受講履歴。"
        },
        {
          "title": "請求および決済記録",
          "desc": "注文履歴や請求書。クレジットカード情報は最高水準のPCI-DSSレベル1認証を受けたStripeが直接処理します。"
        },
        {
          "title": "技術ログおよびセキュリティ情報",
          "desc": "IPアドレス、ブラウザ種別、OS、アクセス日時、不正アクセス防止用ファイアウォールログ。"
        },
        {
          "title": "学習進捗とアカデミー実績",
          "desc": "小テストの得点、課題提出記録、アカデミーポイント、バッジ、および公開リーダーボードの順位。"
        }
      ]
    },
    "section3": {
      "secBadge": "第3条 • 重要開示",
      "title": "第三者リンクとアフィリエイト開示",
      "badge": "提携開示情報",
      "desc": "アカデミックな学びを実践的なビジネス設立へ直結させるため、厳選された企業サービスを紹介しています。米国法人設立ページにはRegistered Agents IncおよびAWIN等の提携リンクが含まれます。",
      "rulesTitle": "提携サービスに関する基本原則：",
      "bullets": [
        "紹介リンクをクリックすると、サフィ・アカデミーからの紹介であることを確認するためのトラッキングCookieがブラウザに保存される場合があります。",
        "サフィ・アカデミーがお客様のパスワード、受講記録、または個人資料を提携先に開示することは決してありません。",
        "提携先のウェブサイトで入力される情報は、当該企業の公式プライバシーポリシーにのみ従います。",
        "紹介リンク経由でサービスを購入された場合、お客様に追加費用が発生することなく当校が紹介報酬を得る場合があります。"
      ]
    },
    "section4": {
      "secBadge": "第4条",
      "title": "データ処理の法的根拠",
      "desc": "個人データの処理は、英国GDPR第6条に基づく厳格な法的条件に従ってのみ実施されます：",
      "items": [
        {
          "title": "契約の履行",
          "desc": "講義動画の配信、課題の添削、修了証の発行、およびサブスクリプションの管理。"
        },
        {
          "title": "正当な利益",
          "desc": "講座カリキュラムの改良、サイバー攻撃からのサーバー防護、システムの安定性向上。"
        },
        {
          "title": "法的および税務上の義務",
          "desc": "英国の税法および会社法に定められた会計帳簿や取引記録の法定保管。"
        }
      ]
    },
    "section5": {
      "secBadge": "第5条",
      "title": "クッキーおよび追跡技術の利用",
      "desc": "当校は安全なセッション維持と学習環境の個別化のため、セッショントークン、ローカルストレージ、およびCookieを使用します。",
      "cookies": [
        {
          "title": "必要不可欠なクッキー",
          "desc": "認証トークン、セッションセキュリティ、ファイアウォール検証。",
          "badge": "常に有効"
        },
        {
          "title": "パフォーマンスおよび分析クッキー",
          "desc": "講義読み込み速度や操作応答の匿名計測。",
          "badge": "設定可能"
        },
        {
          "title": "アフィリエイトおよび紹介クッキー",
          "desc": "認定パートナー（例: Registered Agents Inc）への外部リンクをクリックした場合にのみ動作。",
          "badge": "外部リンクのみ"
        },
        {
          "title": "Google AdSense 広告クッキー",
          "desc": "当サイトや他のウェブサイトの閲覧履歴に基づき、関連性の高い広告をGoogleおよびそのパートナーが配信するために使用。",
          "badge": "第三者提供（オプトアウト可）"
        }
      ],
      "adHeading": "Google AdSense およびデジタル広告の準拠方針",
      "adIntro": "サフィ・アカデミーではコミュニティの特定領域において、Google AdSenseを通じた学習に適した広告を表示しています。",
      "adBullets": [
        {
          "lead": "第三者配信事業者",
          "text": "Googleなどの広告配信ネットワークは過去の閲覧履歴に基づいて適切な広告を表示します。"
        },
        {
          "lead": "DoubleClick DART クッキー",
          "text": "学習者の興味に即した実用的な教育・キャリア関連の広告配信を可能にします。"
        },
        {
          "lead": "パーソナライズ広告の無効化",
          "text": "Google 広告設定 (adssettings.google.com) または AboutAds.info にて随時オプトアウト可能です。"
        },
        {
          "lead": "プライバシーの保護",
          "text": "生徒の個人識別情報を広告業者に譲渡することはなく、学習の邪魔にならない配置を維持します。"
        }
      ]
    },
    "section6": {
      "secBadge": "第6条",
      "title": "データセキュリティと保管期間",
      "desc": "物理的、管理的、かつ技術的な多重防護体制を敷いています。通信はTLS 1.3によって高度に暗号化され、定期的な脆弱性検査を実施しています。",
      "retentionTitle": "データの保存期間",
      "retentionDesc": "アカウントが有効な期間、および英国法令で定められた法定保管期間（税務書類は最大6年間）にわたり安全に保管されます。",
      "transfersTitle": "国際的なデータ移転",
      "transfersDesc": "国境を越えたデータ送信は英国IDTAおよび標準契約条項（SCC）に厳格に準拠し、暗号化クラウド上で行われます。"
    },
    "section7": {
      "secBadge": "第7条",
      "title": "お客様の法的権利 (英国GDPR)",
      "desc": "英国およびEUのデータ保護法令に基づき、お客様には以下の正当な権利が付与されています：",
      "rights": [
        {
          "title": "アクセス権",
          "desc": "当校が保有するご自身の個人データの完全なデジタル開示を求める権利。"
        },
        {
          "title": "訂正権",
          "desc": "不正確、古い、または不完全な情報を速やかに修正させる権利。"
        },
        {
          "title": "消去権（「忘れられる権利」）",
          "desc": "アカウントおよび個人データを完全かつ恒久的に削除させる権利。"
        },
        {
          "title": "処理の制限権",
          "desc": "異議申し立ての審査中にデータの処理を一時的に停止させる権利。"
        },
        {
          "title": "データポータビリティ権",
          "desc": "受講実績データを一般的な電子形式で受け取る権利。"
        },
        {
          "title": "異議申立権",
          "desc": "商業的利益のみに基づくデータ処理に対して異議を申し立てる権利。"
        }
      ],
      "deletionBox": {
        "title": "アカウントの完全な削除をご希望ですか？",
        "sub": "GDPR対応のセルフサービスポータルから自動データ削除申請を直接送信できます。",
        "btn": "アカウント削除ポータルを開く"
      }
    },
    "section8": {
      "secBadge": "第8条",
      "title": "お問い合わせおよび監督機関",
      "desc": "本方針についてのご質問や法的権利の行使については、データ保護チームまでご連絡ください：",
      "emailLabel": "データ保護責任者 (DPO) 連絡先メール",
      "btn": "問い合わせメールを送信",
      "icoText": "回答にご満足いただけない場合は、英国情報コミッショナー事務局 (ICO - ico.org.uk) に苦情を申し立てる権利があります。"
    }
  },
  "ko": {
    "isRtl": false,
    "badge": "공식 데이터 헌장 및 개인정보 처리방침",
    "heroTitleLine1": "귀하의 개인정보와 학습 데이터는",
    "heroTitleLine2": "완벽하게 보호됩니다",
    "heroSub": "사피 아카데미(Safi Academy)는 세계 최고 수준의 데이터 보호 규정을 준수합니다. 데이터 관리자 자격, 법적 처리 근거 및 보장된 권리를 확인하십시오.",
    "entityLabel": "운영 법인: Safi International Capital LTD",
    "regLabel": "영국 법인등록번호: 17063286 (UK)",
    "lawLabel": "UK GDPR 및 2018 데이터보호법 준수",
    "highlights": [
      {
        "title": "데이터 판매 일절 없음",
        "desc": "개인정보를 제3자 데이터 중개인에게 판매하거나 임대하는 행위를 엄격히 금지합니다.",
        "badge": "보증된 기준"
      },
      {
        "title": "제휴 협력의 투명성",
        "desc": "Registered Agents Inc 등 검증된 파트너와의 제휴 링크 및 추천 쿠키에 대한 명확한 공개.",
        "badge": "FTC 규정 준수"
      },
      {
        "title": "엔터프라이즈급 암호화",
        "desc": "모든 아카데미 강좌, 수료증 및 데이터베이스 전반에 걸친 TLS/SSL 종단간 암호화 적용.",
        "badge": "암호학적 안전장치"
      },
      {
        "title": "GDPR에 따른 완전한 통제권",
        "desc": "언제든지 본인의 계정 데이터를 열람, 수정, 이전하거나 영구 삭제할 수 있는 권리 보장.",
        "badge": "법적 권리 보장"
      }
    ],
    "tocTitle": "목차 바로가기",
    "tocCount": "8개 법률 조항",
    "sections": [
      {
        "id": "controller",
        "title": "1. 개인정보 관리자"
      },
      {
        "id": "collection",
        "title": "2. 수집하는 정보"
      },
      {
        "id": "affiliates",
        "title": "3. 외부 링크 및 제휴 공개",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. 처리의 법적 근거"
      },
      {
        "id": "cookies",
        "title": "5. 쿠키 및 추적 기술"
      },
      {
        "id": "security",
        "title": "6. 보안 및 보존 기간"
      },
      {
        "id": "rights",
        "title": "7. 귀하의 법적 권리 (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. 개인정보 보호 문의"
      }
    ],
    "legalHelp": {
      "title": "개인정보 처리에 관한 문의사항이 있으신가요?",
      "desc": "데이터 처리, 규정 준수 또는 법적 권익 행사와 관련된 문의를 남겨주세요.",
      "btn": "개인정보 보호팀에 문의"
    },
    "section1": {
      "secBadge": "제1조",
      "title": "1. 개인정보 관리자 및 법인 정보",
      "desc": "Safi International Capital LTD는 사피 아카데미를 통해 수집 및 처리되는 모든 개인정보의 공식 데이터 관리자(Data Controller)입니다.",
      "legalEntityLabel": "공식 법인명",
      "companyNumLabel": "법인등록번호",
      "hqLabel": "본사 주소지",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "제2조",
      "title": "2. 수집하는 정보의 종류",
      "desc": "본교는 교육 서비스 제공, 안전한 로그인 인증 및 플랫폼 보안 유지를 위해서만 데이터를 수집합니다.",
      "cards": [
        {
          "title": "신원 및 프로필 정보",
          "desc": "성명, 이메일 주소, 암호화된 비밀번호 해시, 언어 환경설정, 프로필 사진 및 수강 신청 이력."
        },
        {
          "title": "결제 및 거래 내역",
          "desc": "주문 내역과 영수증. 카드 결제 정보는 최고 등급인 PCI-DSS 레벨 1 인증을 받은 Stripe에서 전담 처리합니다."
        },
        {
          "title": "기술 로그 및 시스템 보안",
          "desc": "IP 주소, 브라우저 유형, 운영체제 버전, 접속 타임스탬프 및 부정행위 방지 방화벽 감사 기록."
        },
        {
          "title": "학습 성취도 및 보상",
          "desc": "퀴즈 점수, 과제 제출 내역, 아카데미 포인트, 수료 배지 및 명예의 전당 순위 정보."
        }
      ]
    },
    "section3": {
      "secBadge": "제3조 • 중요 고지",
      "title": "제3자 링크 및 제휴 협력 고지",
      "badge": "제휴 투명성 공개",
      "desc": "이론적 학습을 실제 기업 설립과 연계하기 위해 신뢰할 수 있는 기관을 추천합니다. 미국 법인 설립 페이지에는 Registered Agents Inc 및 AWIN 제휴 링크가 포함되어 있습니다.",
      "rulesTitle": "추천 제3자 서비스 이용 원칙:",
      "bullets": [
        "제휴 링크를 클릭하면 사피 아카데미를 통한 추천임을 확인하기 위한 추적 쿠키가 브라우저에 저장될 수 있습니다.",
        "사피 아카데미는 귀하의 비밀번호, 학적 정보나 개인 서류를 제휴사에 절대로 공유하지 않습니다.",
        "파트너 웹사이트에서 입력하는 모든 정보는 해당 업체의 공식 개인정보 처리방침에 의해 직접 규율됩니다.",
        "추천 링크를 통해 서비스를 구매하실 경우 추가 비용 발생 없이 아카데미가 소정의 수수료를 지급받을 수 있습니다."
      ]
    },
    "section4": {
      "secBadge": "제4조",
      "title": "개인정보 처리의 법적 근거",
      "desc": "개인정보 처리는 영국 GDPR 제6조에 규정된 합법적인 근거에 따라 엄격히 수행됩니다:",
      "items": [
        {
          "title": "계약의 이행",
          "desc": "강의 스트리밍 제공, 과제 채점, 수료증 발급 및 구독 서비스 관리."
        },
        {
          "title": "정당한 이익 추구",
          "desc": "교육 커리큘럼 개선, 외부 사이버 침해 공격 방어 및 시스템 안정화."
        },
        {
          "title": "법적 및 세무상 의무",
          "desc": "영국 세무 및 상법에 명시된 회계 전표 및 결제 내역의 법정 보관 의무 준수."
        }
      ]
    },
    "section5": {
      "secBadge": "제5조",
      "title": "쿠키 및 추적 기술의 운용",
      "desc": "본 플랫폼은 보안 세션 유지 및 맞춤형 학습 환경 제공을 위해 세션 토큰, 로컬 스토리지 및 쿠키를 활용합니다.",
      "cookies": [
        {
          "title": "필수 불가결한 쿠키",
          "desc": "사용자 인증 토큰, 세션 보안 및 방화벽 유효성 검사.",
          "badge": "항상 활성화"
        },
        {
          "title": "성능 및 분석 쿠키",
          "desc": "강의 로딩 지연 시간 및 페이지 인터랙션 통계의 익명 수집.",
          "badge": "설정 가능"
        },
        {
          "title": "제휴 및 추천 쿠키",
          "desc": "검증된 외부 파트너(예: Registered Agents Inc) 링크를 클릭할 때만 동작.",
          "badge": "외부 링크 전용"
        },
        {
          "title": "Google AdSense 광고 쿠키",
          "desc": "Google 및 파트너사가 과거 웹사이트 방문 기록을 바탕으로 관련성 높은 광고를 송출하기 위해 사용.",
          "badge": "제3자 제공 (선택 해제 가능)"
        }
      ],
      "adHeading": "Google AdSense 광고 및 디지털 표준 준수",
      "adIntro": "사피 아카데미는 커뮤니티 공간에 학습 분위기를 저해하지 않는 선별된 Google AdSense 광고를 표시합니다.",
      "adBullets": [
        {
          "lead": "제3자 공급업체",
          "text": "Google 및 광고 네트워크는 과거 방문 내역을 분석하여 적절한 광고를 제공하기 위해 쿠키를 활용합니다."
        },
        {
          "lead": "DoubleClick DART 쿠키",
          "text": "학습자에게 실용적이고 흥미에 맞는 교육 정보를 제공할 수 있도록 돕습니다."
        },
        {
          "lead": "맞춤형 광고 수신 거부",
          "text": "학생들은 Google 광고 설정 (adssettings.google.com) 또는 AboutAds.info에서 언제든지 이를 비활성화할 수 있습니다."
        },
        {
          "lead": "개인정보 보호 원칙",
          "text": "아카데미는 학생들의 식별 정보를 중개업자에게 판매하지 않으며, 자연스러운 디자인을 고수합니다."
        }
      ]
    },
    "section6": {
      "secBadge": "제6조",
      "title": "보안 조치 및 데이터 보존 기간",
      "desc": "물리적, 관리적, 기술적 다중 방어 시스템을 구축하여 데이터를 안전하게 보호합니다. 모든 통신은 TLS 1.3 암호화를 적용합니다.",
      "retentionTitle": "데이터 보유 기간",
      "retentionDesc": "회원 자격 유지 기간 동안 보유하며, 탈퇴 후에는 영국 법정 보관 기간(세무 증빙은 최대 6년) 동안 안전하게 보관됩니다.",
      "transfersTitle": "국제 데이터 전송",
      "transfersDesc": "국경 간 데이터 이전은 영국 IDTA 협약 및 표준계약조항(SCC)을 충족하는 클라우드 환경에서 이루어집니다."
    },
    "section7": {
      "secBadge": "제7조",
      "title": "이용자의 법적 권리 (UK GDPR 기준)",
      "desc": "영국 및 유럽연합 데이터 보호 법령에 따라 귀하는 다음과 같은 법적 권리를 행사할 수 있습니다:",
      "rights": [
        {
          "title": "정보 접근권",
          "desc": "본교가 보관 중인 본인의 개인정보 전체 사본을 전자 파일로 요청할 권리."
        },
        {
          "title": "정정 청구권",
          "desc": "부정확하거나 오래된 정보를 신속하게 수정하도록 요청할 권리."
        },
        {
          "title": "삭제 청구권(「잊힐 권리」)",
          "desc": "계정과 모든 데이터를 영구적으로 파기하도록 요구할 권리."
        },
        {
          "title": "처리 제한권",
          "desc": "분쟁 검토 기간 동안 데이터의 처리를 일시 정지하도록 요구할 권리."
        },
        {
          "title": "데이터 이동권",
          "desc": "학습 이력 등을 표준 전자 구조화 파일로 반출받을 권리."
        },
        {
          "title": "이의 제기권",
          "desc": "오직 상업적 이익만을 목적으로 한 처리에 대해 법적으로 반대할 권리."
        }
      ],
      "deletionBox": {
        "title": "계정을 완전히 삭제하고 싶으신가요?",
        "sub": "GDPR 셀프서비스 포털을 통해 즉각적인 데이터 파기 요청을 직접 신청하실 수 있습니다.",
        "btn": "계정 삭제 포털 열기"
      }
    },
    "section8": {
      "secBadge": "제8조",
      "title": "개인정보 민원 및 감독 기관 접수",
      "desc": "본 방침에 관한 문의나 권리 행사는 언제든지 개인정보 전담팀으로 접수해 주시기 바랍니다:",
      "emailLabel": "개인정보 보호책임자 (DPO) 이메일",
      "btn": "개인정보 보호팀에 메일 보내기",
      "icoText": "본교의 처리 결과에 이의가 있으신 경우 영국 정보위원회 (ICO - ico.org.uk) 에 정식으로 구제를 신청하실 권리가 있습니다."
    }
  },
  "nl": {
    "isRtl": false,
    "badge": "Officieel Gegevenshandvest & Privacybeleid",
    "heroTitleLine1": "Uw privacy & gegevens",
    "heroTitleLine2": "Zijn volledig beschermd",
    "heroSub": "Safi Academy zet zich in voor de allerhoogste internationale standaarden op het gebied van gegevensbescherming. Bekijk onze verwerkingsverantwoordelijke, wettelijke grondslagen en rechten.",
    "entityLabel": "Juridische entiteit: Safi International Capital LTD",
    "regLabel": "Handelsregisternr.: 17063286 (VK)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Geen verkoop van gegevens",
        "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren of derden.",
        "badge": "Gegarandeerde standaard"
      },
      {
        "title": "Transparante samenwerkingen",
        "desc": "Heldere voorlichting over referral-cookies en partners zoals Registered Agents Inc.",
        "badge": "Conform FTC-regels"
      },
      {
        "title": "Enterprise-encryptie",
        "desc": "End-to-end TLS/SSL-beveiliging over alle cursussen, certificaten en academische data.",
        "badge": "Cryptografische bescherming"
      },
      {
        "title": "Volledige controle onder AVG",
        "desc": "Onbeperkt recht op inzage, correctie, overdraagbaarheid of permanente verwijdering van uw account.",
        "badge": "Wettelijke rechten"
      }
    ],
    "tocTitle": "Navigatie-index",
    "tocCount": "8 juridische secties",
    "sections": [
      {
        "id": "controller",
        "title": "1. Verwerkingsverantwoordelijke"
      },
      {
        "id": "collection",
        "title": "2. Gegevens die wij verzamelen"
      },
      {
        "id": "affiliates",
        "title": "3. Externe links & partners",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Grondslagen voor verwerking"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & trackingtechnologieën"
      },
      {
        "id": "security",
        "title": "6. Beveiliging & bewaartermijnen"
      },
      {
        "id": "rights",
        "title": "7. Uw wettelijke rechten (AVG)"
      },
      {
        "id": "contact",
        "title": "8. Vragen over privacy"
      }
    ],
    "legalHelp": {
      "title": "Heeft u vragen over gegevensbescherming?",
      "desc": "Vragen over gegevensverwerking, naleving van regelgeving of het uitoefenen van uw rechten.",
      "btn": "Contacteer het privacyteam"
    },
    "section1": {
      "secBadge": "Sectie 1",
      "title": "1. Verwerkingsverantwoordelijke & Juridische entiteit",
      "desc": "Safi International Capital LTD is de officieel aangewezen verwerkingsverantwoordelijke (Data Controller) voor alle persoonsgegevens die via Safi Academy worden verwerkt.",
      "legalEntityLabel": "Officiële rechtspersoon",
      "companyNumLabel": "KvK / Bedrijfsregistratienummer",
      "hqLabel": "Adres hoofdkantoor",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sectie 2",
      "title": "2. Informatie die wij verzamelen",
      "desc": "Wij verzamelen uitsluitend gegevens om onderwijsdiensten te leveren, beveiligde logins te garanderen en ons platform te beschermen.",
      "cards": [
        {
          "title": "Identiteits- en profielgegevens",
          "desc": "Volledige naam, e-mailadres, gehashte wachtwoorden, taalvoorkeur, profielfoto en cursusinschrijvingen."
        },
        {
          "title": "Facturatie en betalingen",
          "desc": "Bestelgeschiedenis en facturen. Betaalkaartgegevens worden rechtstreeks verwerkt via Stripe conform PCI-DSS Niveau 1."
        },
        {
          "title": "Technische logs en beveiliging",
          "desc": "IP-adres, browsertype, besturingssysteem en firewall-audits voor fraudebescherming en systeembeveiliging."
        },
        {
          "title": "Studievoortgang en prestaties",
          "desc": "Toetsscores, ingeleverd huiswerk, academie-punten, badges en vermeldingen op de openbare Eregalerij."
        }
      ]
    },
    "section3": {
      "secBadge": "Sectie 3 • Belangrijke vermelding",
      "title": "Externe links en partnerverklaringen",
      "badge": "Affiliate-kennisgeving",
      "desc": "Om theorie te koppelen aan echte bedrijfsvoering, beveelt Safi Academy betrouwbare partners aan. Ons portaal voor Amerikaanse bedrijfsoprichting bevat links naar Registered Agents Inc en netwerken zoals AWIN.",
      "rulesTitle": "Uitgangspunten voor aanbevolen externe diensten:",
      "bullets": [
        "Het klikken op partnerlinks kan een trackingcookie opslaan om te verifiëren dat de doorverwijzing via Safi Academy plaatsvond.",
        "Safi Academy deelt nooit uw wachtwoorden, studentendossiers of privégegevens met externe partners.",
        "Alle gegevens die u verstrekt op de website van een partner vallen uitsluitend onder het privacybeleid van die partner.",
        "Wij kunnen een commissie ontvangen bij gekwalificeerde aankopen zonder enige meerprijs voor u."
      ]
    },
    "section4": {
      "secBadge": "Sectie 4",
      "title": "Wettelijke grondslagen voor gegevensverwerking",
      "desc": "Wij verwerken persoonsgegevens uitsluitend volgens de bepalingen van Artikel 6 van de Britse AVG (UK GDPR):",
      "items": [
        {
          "title": "Uitvoering van een overeenkomst",
          "desc": "Toegang bieden tot videolessen, beoordelen van opdrachten, uitreiken van certificaten en abonnementsbeheer."
        },
        {
          "title": "Gerechtvaardigde belangen",
          "desc": "Verbeteren van lesstof, beveiligen van servers tegen aanvallen en optimaliseren van de platformprestaties."
        },
        {
          "title": "Wettelijke en fiscale verplichtingen",
          "desc": "Bewaren van boekhoudkundige administratie conform de wettelijke vereisten in het Verenigd Koninkrijk."
        }
      ]
    },
    "section5": {
      "secBadge": "Sectie 5",
      "title": "Cookies en traceertechnologieën",
      "desc": "Ons platform gebruikt sessietokens, lokale opslag en cookies om veilige sessies te waarborgen en uw voorkeuren te onthouden.",
      "cookies": [
        {
          "title": "Strikt noodzakelijke cookies",
          "desc": "Authenticatie, sessiebeveiliging en firewallvalidatie.",
          "badge": "Altijd actief"
        },
        {
          "title": "Prestatie- en statistiekcookies",
          "desc": "Anonieme meting van laadtijden en platformgebruik.",
          "badge": "Configureerbaar"
        },
        {
          "title": "Affiliate- en verwijzingscookies",
          "desc": "Alleen actief bij het aanklikken van geverifieerde partnerlinks (zoals Registered Agents Inc).",
          "badge": "Alleen externe links"
        },
        {
          "title": "Google AdSense advertentiecookies",
          "desc": "Gebruikt door Google en partners om passende advertenties te tonen op basis van eerdere websitebezoeken.",
          "badge": "Derden (afmelding mogelijk)"
        }
      ],
      "adHeading": "Naleving van advertentiestandaarden met Google AdSense",
      "adIntro": "Safi Academy toont bescheiden advertenties via Google AdSense in geselecteerde communitysecties.",
      "adBullets": [
        {
          "lead": "Externe leveranciers",
          "text": "Google en advertentienetwerken gebruiken cookies om advertenties te tonen op basis van surfgeschiedenis."
        },
        {
          "lead": "DoubleClick DART-cookie",
          "text": "Stelt Google in staat om relevante educatieve en zakelijke advertenties weer te geven."
        },
        {
          "lead": "Afmelden voor gepersonaliseerde advertenties",
          "text": "Studenten kunnen dit op elk moment uitschakelen via Google Advertentie-instellingen (adssettings.google.com) of AboutAds.info."
        },
        {
          "lead": "Privacywaarborg",
          "text": "De academie verstrekt geen identiteitsgegevens aan advertentiebedrijven en kiest voor niet-storende lay-outs."
        }
      ]
    },
    "section6": {
      "secBadge": "Sectie 6",
      "title": "Gegevensbeveiliging en bewaarbeleid",
      "desc": "Wij beschermen gegevens met meerlaagse fysieke, organisatorische en technische maatregelen. Gegevensoverdracht is beveiligd met TLS 1.3.",
      "retentionTitle": "Bewaartermijn",
      "retentionDesc": "Gegevens worden bewaard zolang uw account actief is, aangevuld met wettelijke bewaartermijnen (tot 6 jaar voor fiscale gegevens in het VK).",
      "transfersTitle": "Internationale doorgifte",
      "transfersDesc": "Internationale gegevensdoorgifte voldoet aan de Britse IDTA-overeenkomsten en standaard contractbepalingen (SCC)."
    },
    "section7": {
      "secBadge": "Sectie 7",
      "title": "Uw wettelijke rechten (onder de Britse AVG)",
      "desc": "Onder de privacywetgeving beschikt u over de volgende afdwingbare rechten:",
      "rights": [
        {
          "title": "Recht op inzage",
          "desc": "Het opvragen van een compleet digitaal overzicht van al uw geregistreerde gegevens."
        },
        {
          "title": "Recht op rectificatie",
          "desc": "Onjuiste, onvolledige of verouderde gegevens direct laten corrigeren."
        },
        {
          "title": "Recht op gegevenswissing («Recht op vergetelheid»)",
          "desc": "Verzoeken om definitieve en onherroepelijke verwijdering van uw account."
        },
        {
          "title": "Recht op beperking",
          "desc": "Tijdelijk pauzeren van gegevensverwerking tijdens geschillenbeslechting."
        },
        {
          "title": "Recht op overdraagbaarheid",
          "desc": "Uw cursus- en prestatiegegevens ontvangen in een gestructureerd digitaal formaat."
        },
        {
          "title": "Recht van bezwaar",
          "desc": "Bezwaar maken tegen verwerkingen die uitsluitend zijn gebaseerd op commerciële belangen."
        }
      ],
      "deletionBox": {
        "title": "Wilt u uw account permanent verwijderen?",
        "sub": "U kunt een geautomatiseerd verwijderingsverzoek indienen via ons AVG-zelfbedieningsportaal.",
        "btn": "Verwijderingsportaal openen"
      }
    },
    "section8": {
      "secBadge": "Sectie 8",
      "title": "Privacyvragen & Toezichthoudende autoriteit",
      "desc": "Voor vragen over dit beleid of voor het uitoefenen van uw rechten kunt u contact opnemen met ons privacyteam:",
      "emailLabel": "E-mail van de Functionaris voor Gegevensbescherming (DPO)",
      "btn": "E-mail sturen naar DPO",
      "icoText": "Indien u niet tevreden bent met onze afhandeling, heeft u het recht een klacht in te dienen bij het Information Commissioner's Office (ICO) via ico.org.uk."
    }
  },
  "uz": {
    "isRtl": false,
    "badge": "Rasmiy Ma'lumotlar Nizomi va Maxfiylik Siyosati",
    "heroTitleLine1": "Sizning maxfiyligingiz va ma'lumotlaringiz",
    "heroTitleLine2": "To‘liq himoyalangan",
    "heroSub": "Safi Academy xalqaro miqyosdagi eng yuqori ma'lumotlarni himoya qilish standartlariga amal qiladi. Ma'lumotlar nazoratchisi, qonuniy asoslar va o‘z huquqlaringiz bilan tanishing.",
    "entityLabel": "Yuridik shaxs: Safi International Capital LTD",
    "regLabel": "Ro‘yxatga olish raqami: 17063286 (Buyuk Britaniya)",
    "lawLabel": "UK GDPR va DPA 2018 qonunlari",
    "highlights": [
      {
        "title": "Ma'lumotlar sotilmaydi",
        "desc": "Biz sizning shaxsiy ma'lumotlaringizni hech qachon uchinchi shaxslarga sotmaymiz yoki ijaraga bermaymiz.",
        "badge": "Kafolatlangan standart"
      },
      {
        "title": "Hamkorlikda to‘liq shaffoflik",
        "desc": "Registered Agents Inc kabi hamkorlar va tavsiya cookie-fayllari haqida to‘liq va aniq ma'lumot.",
        "badge": "FTC talablariga mos"
      },
      {
        "title": "Korporativ darajadagi shifrlash",
        "desc": "Barcha kurslar, sertifikatlar va tizim ma'lumotlari uchun zamonaviy TLS/SSL shifrlash usullari.",
        "badge": "Kriptografik himoya"
      },
      {
        "title": "GDPR bo‘yicha to‘liq nazorat",
        "desc": "Istalgan vaqtda akkauntingizdagi ma'lumotlarni ko‘rish, tuzatish, ko‘chirish yoki butunlay o‘chirish huquqi.",
        "badge": "Talabaning qonuniy huquqlari"
      }
    ],
    "tocTitle": "Mundarija",
    "tocCount": "8 ta yuridik bo‘lim",
    "sections": [
      {
        "id": "controller",
        "title": "1. Ma'lumotlar nazoratchisi"
      },
      {
        "id": "collection",
        "title": "2. Biz to‘playdigan ma'lumotlar"
      },
      {
        "id": "affiliates",
        "title": "3. Tashqi havolalar va hamkorlik",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Ma'lumotlardan foydalanish asoslari"
      },
      {
        "id": "cookies",
        "title": "5. Cookie-fayllar va kuzatuv"
      },
      {
        "id": "security",
        "title": "6. Xavfsizlik va saqlash muddati"
      },
      {
        "id": "rights",
        "title": "7. Sizning qonuniy huquqlaringiz (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Maxfiylik bo‘yicha murojaatlar"
      }
    ],
    "legalHelp": {
      "title": "Maxfiylik bo‘yicha savollaringiz bormi?",
      "desc": "Ma'lumotlarni qayta ishlash yoki huquqlaringizni amalga oshirish bo‘yicha yordam oling.",
      "btn": "Maxfiylik jamoasiga yozish"
    },
    "section1": {
      "secBadge": "1-bo‘lim",
      "title": "1. Ma'lumotlar nazoratchisi va yuridik shaxs",
      "desc": "Safi International Capital LTD Safi Academy orqali to‘plangan barcha shaxsiy ma'lumotlar uchun rasmiy Ma'lumotlar Nazoratchisi (Data Controller) hisoblanadi.",
      "legalEntityLabel": "Rasmiy yuridik shaxs",
      "companyNumLabel": "Kompaniya ro‘yxat raqami",
      "hqLabel": "Bosh ofis manzili",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "2-bo‘lim",
      "title": "2. Biz to‘playdigan ma'lumotlar",
      "desc": "Biz ma'lumotlarni faqat ta'lim xizmatlarini ko‘rsatish, xavfsiz kirishni ta'minlash va tizimni himoya qilish uchun yig‘amiz.",
      "cards": [
        {
          "title": "Shaxsiy profil ma'lumotlari",
          "desc": "Ism-familiya, elektron pochta, shifrlangan parol xeshlari, tanlangan til, profil rasmi va kurslar tarixi."
        },
        {
          "title": "To‘lovlar va tranzaksiyalar",
          "desc": "Buyurtmalar tarixi va hisob-fakturalar. Bank karta ma'lumotlari to‘g‘ridan-to‘g‘ri PCI-DSS 1-darajali Stripe orqali ishlanadi."
        },
        {
          "title": "Texnik jurnallar va xavfsizlik",
          "desc": "IP-manzil, brauzer turi, operatsion tizim va kiberhujumlarning oldini olish uchun fayrvoll audit jurnallari."
        },
        {
          "title": "O‘qishdagi natijalar va ballar",
          "desc": "Test natijalari, topshirilgan vazifalar, akademiya ballari, nishonlar va Faxriy doskadagi o‘rinlar."
        }
      ]
    },
    "section3": {
      "secBadge": "3-bo‘lim • Yuqori ahamiyatga ega",
      "title": "Uchinchi tomon havolalari va hamkorlik shartlari",
      "badge": "Hamkorlik to‘g‘risida ma'lumot",
      "desc": "Nazariy bilimlarni real biznes ochish bilan bog‘lash uchun Safi Academy ishonchli xalqaro kompaniyalarni tavsiya qiladi. AQSHda kompaniya ochish bo‘limida Registered Agents Inc va AWIN havolalari mavjud.",
      "rulesTitle": "Tavsiya etilgan tashqi xizmatlar qoidalari:",
      "bullets": [
        "Hamkor havolasini bosganda siz Safi Academy orqali kelganingizni tasdiqlash uchun brauzeringizda cookie saqlanishi mumkin.",
        "Safi Academy hech qachon parollaringizni, talabalik hujjatlaringizni yoki shaxsiy ma'lumotlaringizni hamkorlarga bermaydi.",
        "Tashqi saytlarda kiritilgan ma'lumotlar to‘g‘ridan-to‘g‘ri o‘sha kompaniyaning rasmiy maxfiylik siyosatiga muvofiq boshqariladi.",
        "Xizmatlar sotib olinganda, sizdan hech qanday qo‘shimcha to‘lov olinmagan holda bizga tavsiya mukofoti to‘lanishi mumkin."
      ]
    },
    "section4": {
      "secBadge": "4-bo‘lim",
      "title": "Ma'lumotlardan foydalanishning qonuniy asoslari",
      "desc": "Shaxsiy ma'lumotlar faqat Buyuk Britaniya GDPR qonunining 6-moddasiga binoan ishlanadi:",
      "items": [
        {
          "title": "Shartnomaviy majburiyatlarni bajarish",
          "desc": "Dars videolarini ko‘rish imkoniyati, vazifalarni baholash, sertifikatlar berish va obunalarni yuritish."
        },
        {
          "title": "Qonuniy manfaatlar",
          "desc": "Dars dasturlarini takomillashtirish, serverlarni xakerlik hujumlaridan himoya qilish va tizimni tahlil qilish."
        },
        {
          "title": "Qonuniy va soliq majburiyatlari",
          "desc": "Buyuk Britaniya qonunchiligi bo‘yicha moliyaviy va hisob-kitob hujjatlarini saqlash."
        }
      ]
    },
    "section5": {
      "secBadge": "5-bo‘lim",
      "title": "Cookie-fayllar va kuzatuv texnologiyalari",
      "desc": "Biz tizimga xavfsiz kirish, sessiyani saqlash va ta'lim muhitini qulaylashtirish uchun cookie-fayllardan foydalanamiz.",
      "cookies": [
        {
          "title": "Zaruriy cookie-fayllar",
          "desc": "Autentifikatsiya, xavfsizlik va fayrvoll nazorati.",
          "badge": "Doim faol"
        },
        {
          "title": "Tezlik va tahliliy cookie-fayllar",
          "desc": "Darslar yuklanish tezligini anonim o‘lchash.",
          "badge": "Sozlanishi mumkin"
        },
        {
          "title": "Hamkorlik va yo‘naltiruvchi cookie-fayllar",
          "desc": "Faqat tashqi hamkorlar (masalan, Registered Agents Inc) havolasi bosilganda ishlaydi.",
          "badge": "Faqat tashqi havolalar"
        },
        {
          "title": "Google AdSense reklama cookie-fayllari",
          "desc": "Google va uning hamkorlari tomonidan saytlarga tashrif buyurish asosida mos reklamalarni ko‘rsatish uchun ishlatiladi.",
          "badge": "Uchinchi tomon (o‘chirish mumkin)"
        }
      ],
      "adHeading": "Google AdSense va uchinchi tomon reklama me'yorlari",
      "adIntro": "Safi Academy jamoat maydonlarida foydali reklamalarni ko‘rsatish uchun Google AdSense tizimidan foydalanadi.",
      "adBullets": [
        {
          "lead": "Uchinchi tomon provayderlari",
          "text": "Google va reklama tarmoqlari o‘tmishdagi qiziqishlarga qarab reklamalarni ko‘rsatadi."
        },
        {
          "lead": "DoubleClick DART cookie-fayli",
          "text": "Foydalanuvchilarga ta'limga oid foydali reklamalarni yetkazib berishga xizmat qiladi."
        },
        {
          "lead": "Moslashtirilgan reklamalarni o‘chirish",
          "text": "Talabalar Google Ads sozlamalari (adssettings.google.com) yoki AboutAds.info orqali buni istalgan payt o‘chirib qo‘yishlari mumkin."
        },
        {
          "lead": "Maxfiylik kafolati",
          "text": "Akademiya talabalar shaxsini reklama brokerlariga bermaydi va reklamalarni qulay formatda taqdim etadi."
        }
      ]
    },
    "section6": {
      "secBadge": "6-bo‘lim",
      "title": "Ma'lumotlar xavfsizligi va saqlash muddati",
      "desc": "Biz ma'lumotlarni ko‘p bosqichli texnik va boshqaruv choralari orqali himoya qilamiz. Ma'lumotlar uzatish TLS 1.3 shifrlash protokoli bilan ta'minlangan.",
      "retentionTitle": "Ma'lumotlarni saqlash muddati",
      "retentionDesc": "Akkauntingiz faol bo‘lgan davr davomida hamda qonunda belgilangan muddatgacha (soliq hujjatlari uchun 6 yilgacha) saqlanadi.",
      "transfersTitle": "Xalqaro ma'lumotlar uzatish",
      "transfersDesc": "Chegara ortiga ma'lumot uzatish Buyuk Britaniya IDTA va Standart Shartnoma Qoidalari (SCC) asosida himoyalangan bulutli serverlarda amalga oshiriladi."
    },
    "section7": {
      "secBadge": "7-bo‘lim",
      "title": "Sizning qonuniy huquqlaringiz (UK GDPR)",
      "desc": "Qonunchilikka binoan siz o‘z shaxsiy ma'lumotlaringiz bo‘yicha quyidagi to‘liq huquqlarga egasiz:",
      "rights": [
        {
          "title": "Ma'lumotlar bilan tanishish huquqi",
          "desc": "Tizimda saqlanayotgan barcha shaxsiy ma'lumotlaringiz nusxasini olish."
        },
        {
          "title": "Tuzatish huquqi",
          "desc": "Noto‘g‘ri yoki eskirgan ma'lumotlarni zudlik bilan yangilashni talab qilish."
        },
        {
          "title": "O‘chirish huquqi («Unutilish huquqi»)",
          "desc": "Akkaunt va shaxsiy ma'lumotlarni butunlay va qaytarib bo‘lmas tarzda o‘chirishni so‘rash."
        },
        {
          "title": "Cheklash huquqi",
          "desc": "Nizo ko‘rib chiqilayotgan paytda ma'lumotlarni qayta ishlashni vaqtincha to‘xtatish."
        },
        {
          "title": "Ma'lumotlarni ko‘chirish huquqi",
          "desc": "O‘qish tarixingizni qulay raqamli formatda qabul qilib olish."
        },
        {
          "title": "E'tiroz bildirish huquqi",
          "desc": "Faqat tijoriy manfaatlarga asoslangan ma'lumotlar qayta ishlanishiga e'tiroz bildirish."
        }
      ],
      "deletionBox": {
        "title": "Akkauntingizni butunlay o‘chirmoqchimisiz?",
        "sub": "GDPR o‘z-o‘ziga xizmat ko‘rsatish portali orqali ma'lumotlarni o‘chirish arizasini darhol topshirishingiz mumkin.",
        "btn": "Akkauntni o‘chirish portaliga o‘tish"
      }
    },
    "section8": {
      "secBadge": "8-bo‘lim",
      "title": "Maxfiylik bo‘yicha murojaatlar va nazorat organi",
      "desc": "Ushbu siyosat bo‘yicha savollar yoki huquqlaringizni amalga oshirish uchun Maxfiylik Guruhimizga murojaat qiling:",
      "emailLabel": "Ma'lumotlarni Himoya qilish Mas'uli (DPO) emaili",
      "btn": "Email orqali murojaat qilish",
      "icoText": "Agar javobimiz sizni qoniqtirmasa, Buyuk Britaniya Axborot Komissari Idorasiga (ICO - ico.org.uk) rasmiy shikoyat kiritish huquqiga egasiz."
    }
  },
  "id": {
    "isRtl": false,
    "badge": "Piagam Data Resmi & Kebijakan Privasi",
    "heroTitleLine1": "Privasi dan Data Pribadi Anda",
    "heroTitleLine2": "Dilindungi Sepenuhnya",
    "heroSub": "Safi Academy berkomitmen untuk mematuhi standar perlindungan data global tertinggi. Tinjau kredensial pengendali data, dasar hukum pemrosesan, dan hak-hak Anda di sini.",
    "entityLabel": "Entitas Hukum: Safi International Capital LTD",
    "regLabel": "Nomor Registrasi: 17063286 (Inggris)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Data Tidak Pernah Dijual",
        "desc": "Kami tidak pernah menjual atau menyewakan informasi pribadi Anda kepada pialang data atau pihak ketiga.",
        "badge": "Standar Terjamin"
      },
      {
        "title": "Transparansi Kemitraan",
        "desc": "Keterbukaan penuh mengenai cookie rujukan dan mitra terverifikasi seperti Registered Agents Inc.",
        "badge": "Sesuai Aturan FTC"
      },
      {
        "title": "Enkripsi Tingkat Enterprise",
        "desc": "Enkripsi menyeluruh TLS/SSL di seluruh materi kursus, sertifikat, dan basis data akademi.",
        "badge": "Perlindungan Kriptografi"
      },
      {
        "title": "Kendali Penuh Berdasarkan GDPR",
        "desc": "Hak mutlak untuk mengakses, memperbaiki, memindahkan, atau menghapus akun Anda kapan saja.",
        "badge": "Hak Hukum Pelajar"
      }
    ],
    "tocTitle": "Indeks Navigasi",
    "tocCount": "8 Bagian Hukum",
    "sections": [
      {
        "id": "controller",
        "title": "1. Pengendali Data"
      },
      {
        "id": "collection",
        "title": "2. Data yang Kami Kumpulkan"
      },
      {
        "id": "affiliates",
        "title": "3. Tautan Pihak Ketiga & Afiliasi",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Dasar Hukum Pemrosesan"
      },
      {
        "id": "cookies",
        "title": "5. Cookie & Teknologi Pelacakan"
      },
      {
        "id": "security",
        "title": "6. Keamanan & Masa Retensi"
      },
      {
        "id": "rights",
        "title": "7. Hak-Hak Hukum Anda (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Pertanyaan Privasi"
      }
    ],
    "legalHelp": {
      "title": "Ada pertanyaan seputar data Anda?",
      "desc": "Konsultasikan mengenai pemrosesan data, kepatuhan regulasi, atau pelaksanaan hak hukum Anda.",
      "btn": "Kirim Email ke Tim Privasi"
    },
    "section1": {
      "secBadge": "Bagian 1",
      "title": "1. Pengendali Data & Entitas Hukum",
      "desc": "Safi International Capital LTD adalah Pengendali Data (Data Controller) resmi atas seluruh data pribadi yang dikumpulkan dan diproses melalui Safi Academy.",
      "legalEntityLabel": "Entitas Hukum Resmi",
      "companyNumLabel": "Nomor Registrasi Perusahaan",
      "hqLabel": "Alamat Kantor Pusat",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Bagian 2",
      "title": "2. Informasi yang Kami Kumpulkan",
      "desc": "Kami hanya mengumpulkan data pribadi untuk menyelenggarakan materi kursus, otentikasi akun yang aman, dan menjaga keandalan sistem.",
      "cards": [
        {
          "title": "Data Identitas dan Profil",
          "desc": "Nama lengkap, alamat email, hash kata sandi terenkripsi, preferensi bahasa, foto profil, dan riwayat kursus."
        },
        {
          "title": "Tagihan dan Transaksi",
          "desc": "Riwayat pesanan dan faktur. Rincian kartu pembayaran diproses langsung oleh Stripe dengan standar PCI-DSS Tingkat 1."
        },
        {
          "title": "Log Teknis dan Keamanan",
          "desc": "Alamat IP, tipe peramban, sistem operasi, dan log audit firewall untuk perlindungan terhadap ancaman siber."
        },
        {
          "title": "Kemajuan Belajar dan Poin",
          "desc": "Nilai kuis, tugas yang dikumpulkan, poin akademi, lencana kehormatan, dan peringkat di Wall of Fame publik."
        }
      ]
    },
    "section3": {
      "secBadge": "Bagian 3 • Sangat Penting",
      "title": "Tautan Pihak Ketiga & Pengungkapan Afiliasi",
      "badge": "Keterbukaan Afiliasi",
      "desc": "Untuk memadukan pembelajaran teori dengan pendirian bisnis nyata, Safi Academy merekomendasikan penyedia layanan korporat terpercaya. Modul Pendirian Usaha di AS memuat tautan rujukan ke Registered Agents Inc dan jaringan seperti AWIN.",
      "rulesTitle": "Prinsip Utama untuk Layanan Pihak Ketiga:",
      "bullets": [
        "Mengklik tautan mitra dapat menyimpan cookie pelacakan di peramban Anda untuk memverifikasi bahwa rujukan berasal dari Safi Academy.",
        "Safi Academy tidak pernah membagikan kata sandi, berkas siswa, atau informasi rahasia kepada pihak ketiga.",
        "Setiap data yang Anda masukkan di situs mitra diatur secara independen oleh kebijakan privasi resmi mitra tersebut.",
        "Kami dapat menerima komisi rujukan atas transaksi yang memenuhi syarat tanpa adanya biaya tambahan bagi Anda."
      ]
    },
    "section4": {
      "secBadge": "Bagian 4",
      "title": "Dasar Hukum Pemrosesan Data",
      "desc": "Pemrosesan data pribadi hanya dilakukan berdasarkan Pasal 6 Regulasi Perlindungan Data Umum Inggris (UK GDPR):",
      "items": [
        {
          "title": "Pelaksanaan Perjanjian Kontrak",
          "desc": "Penyediaan materi video kursus, penilaian tugas, penerbitan sertifikat, dan pengelolaan langganan."
        },
        {
          "title": "Kepentingan yang Sah",
          "desc": "Penyempurnaan kurikulum, pengamanan server dari peretasan, dan analisis kinerja sistem."
        },
        {
          "title": "Kewajiban Hukum dan Pajak",
          "desc": "Penyimpanan pembukuan akuntansi dan pajak yang diwajibkan oleh otoritas berwenang di Inggris."
        }
      ]
    },
    "section5": {
      "secBadge": "Bagian 5",
      "title": "Cookie & Teknologi Pelacakan",
      "desc": "Platform kami menggunakan token sesi, penyimpanan lokal, dan cookie untuk menjaga sesi login aman dan mengingat preferensi Anda.",
      "cookies": [
        {
          "title": "Cookie yang Benar-Benar Diperlukan",
          "desc": "Token otentikasi, perlindungan sesi, dan verifikasi firewall.",
          "badge": "Selalu Aktif"
        },
        {
          "title": "Cookie Kinerja dan Statistik",
          "desc": "Pengukuran anonim atas waktu muat materi dan interaksi antarmuka.",
          "badge": "Dapat Dikonfigurasi"
        },
        {
          "title": "Cookie Afiliasi dan Rujukan",
          "desc": "Hanya diaktifkan saat mengklik tautan mitra resmi (misalnya Registered Agents Inc).",
          "badge": "Hanya Tautan Keluar"
        },
        {
          "title": "Cookie Iklan Google AdSense",
          "desc": "Digunakan oleh Google dan mitranya untuk menayangkan iklan yang relevan berdasarkan kunjungan sebelumnya di web.",
          "badge": "Pihak Ketiga (Bisa Dinonaktifkan)"
        }
      ],
      "adHeading": "Kepatuhan Iklan Google AdSense & Pihak Ketiga",
      "adIntro": "Safi Academy menggunakan Google AdSense untuk menayangkan iklan yang relevan dan tidak mengganggu di area komunitas terpilih.",
      "adBullets": [
        {
          "lead": "Penyedia Pihak Ketiga",
          "text": "Google dan jaringan iklan menggunakan cookie untuk menayangkan iklan berdasarkan riwayat kunjungan."
        },
        {
          "lead": "Cookie DoubleClick DART",
          "text": "Memungkinkan Google menyajikan iklan edukatif dan profesional yang relevan bagi para siswa."
        },
        {
          "lead": "Menonaktifkan Iklan yang Dipersonalisasi",
          "text": "Siswa dapat menonaktifkan personalisasi kapan saja melalui Pengaturan Iklan Google (adssettings.google.com) atau AboutAds.info."
        },
        {
          "lead": "Perlindungan Privasi",
          "text": "Akademi tidak menjual data identitas ke pialang iklan dan memilih format tampilan iklan yang nyaman."
        }
      ]
    },
    "section6": {
      "secBadge": "Bagian 6",
      "title": "Keamanan Data dan Protokol Penyimpanan",
      "desc": "Kami melindungi data pengguna dengan pengamanan fisik, administratif, dan teknologi berlapis. Pengiriman data dilindungi protokol kriptografi TLS 1.3.",
      "retentionTitle": "Masa Retensi Data",
      "retentionDesc": "Data disimpan selama akun Anda aktif, ditambah periode hukum yang diwajibkan (hingga 6 tahun untuk catatan pajak Inggris).",
      "transfersTitle": "Transfer Data Internasional",
      "transfersDesc": "Transfer lintas batas mematuhi Perjanjian Transfer Data Internasional Inggris (IDTA) dan Klausul Kontrak Standar (SCC)."
    },
    "section7": {
      "secBadge": "Bagian 7",
      "title": "Hak-Hak Hukum Anda (Berdasarkan UK GDPR)",
      "desc": "Berdasarkan regulasi perlindungan data di Inggris dan Uni Eropa, Anda memiliki hak-hak hukum berikut:",
      "rights": [
        {
          "title": "Hak Akses",
          "desc": "Meminta salinan digital lengkap atas seluruh data pribadi Anda yang kami simpan."
        },
        {
          "title": "Hak Perbaikan",
          "desc": "Meminta koreksi segera atas informasi yang keliru, usang, atau tidak lengkap."
        },
        {
          "title": "Hak Penghapusan («Hak untuk Dilupakan»)",
          "desc": "Meminta penghapusan permanen dan tidak dapat dibatalkan atas akun dan data Anda."
        },
        {
          "title": "Hak Pembatasan",
          "desc": "Membekukan sementara pemrosesan data saat proses penyelesaian sengketa berlangsung."
        },
        {
          "title": "Hak Portabilitas Data",
          "desc": "Menerima catatan akademik Anda dalam format digital terstruktur yang umum."
        },
        {
          "title": "Hak Menolak",
          "desc": "Menolak pemrosesan data yang semata-mata didasarkan pada kepentingan komersial."
        }
      ],
      "deletionBox": {
        "title": "Ingin menghapus akun Anda secara permanen?",
        "sub": "Anda dapat mengirimkan permintaan penghapusan data otomatis melalui portal mandiri GDPR kami.",
        "btn": "Buka Portal Penghapusan Akun"
      }
    },
    "section8": {
      "secBadge": "Bagian 8",
      "title": "Pertanyaan Privasi dan Otoritas Pengawas",
      "desc": "Untuk pertanyaan seputar kebijakan ini atau untuk menggunakan hak Anda, hubungi Tim Perlindungan Data kami di:",
      "emailLabel": "Email Pejabat Perlindungan Data (DPO)",
      "btn": "Kirim Email Privasi",
      "icoText": "Jika Anda tidak puas dengan tanggapan kami, Anda berhak mengajukan keluhan resmi ke Information Commissioner's Office (ICO) Inggris di ico.org.uk."
    }
  }
};

export function getPrivacyTranslation(locale: string): PrivacyTranslation {
  const norm = (locale || "en").toLowerCase();
  return privacyTranslations[norm] || privacyTranslations.en;
}
