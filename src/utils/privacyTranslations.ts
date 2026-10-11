// ============================================================================
// PRIVACY POLICY TRANSLATIONS (19 OFFICIAL LANGUAGES)
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
    "heroSub": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
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
    "tocCount": "8 Legal",
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
      "desc": "Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.",
      "btn": "Email Privacy Team"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Data Controller",
      "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "legalEntityLabel": "Entity",
      "companyNumLabel": "Reg",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Information We Collect",
      "desc": "We strictly never sell or rent your personal information to third-party data brokers.",
      "cards": [
        {
          "title": "Zero Data Selling",
          "desc": "We strictly never sell or rent your personal information to third-party data brokers."
        },
        {
          "title": "Affiliate Transparency",
          "desc": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc."
        },
        {
          "title": "Enterprise Encryption",
          "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data."
        },
        {
          "title": "Full GDPR Control",
          "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time."
        }
      ]
    },
    "section3": {
      "secBadge": "Section 3 • Third-Party Relations",
      "title": "3. Affiliates & Third Parties",
      "badge": "FTC Compliant",
      "desc": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
      "rulesTitle": "3. Affiliates & Third Parties",
      "bullets": [
        "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
        "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
        "We strictly never sell or rent your personal information to third-party data brokers.",
        "End-to-end TLS/SSL encryption across all academy courses, credentials, and data."
      ]
    },
    "section4": {
      "secBadge": "Section 4",
      "title": "4. How We Use Data",
      "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "5. Cookies & Tracking",
      "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        },
        {
          "lead": "Personalized Ads:",
          "text": "We strictly never sell or rent your personal information to third-party data brokers."
        }
      ]
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "6. Security & Storage",
      "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Jurisdiction: England & Wales"
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "7. Your Legal Rights",
      "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time."
        },
        {
          "title": "Right to Rectification",
          "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        },
        {
          "title": "Right to Erasure",
          "desc": "We strictly never sell or rent your personal information to third-party data brokers."
        },
        {
          "title": "Right to Restriction",
          "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        },
        {
          "title": "Right to Portability",
          "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data."
        },
        {
          "title": "Right to Object",
          "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Account Deletion"
      }
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "8. Privacy Inquiries",
      "desc": "Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.",
      "emailLabel": "Need Legal Clarification?",
      "btn": "Contact Legal Department",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "fa": {
    "isRtl": true,
    "badge": "شرایط رسمی و توافق‌نامه کاربری",
    "heroTitleLine1": "شرایط استفاده و",
    "heroTitleLine2": "توافق‌نامه کاربری",
    "heroSub": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
    "entityLabel": "نهاد حقوقی: Safi International Capital LTD",
    "regLabel": "شماره ثبت: ۱۷۰۶۳۲۸۶ (بریتانیا)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "عدم فروش اطلاعات کاربران",
        "desc": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم.",
        "badge": "استاندارد تضمین‌شده"
      },
      {
        "title": "شفافیت در کوکی‌های ارجاع",
        "desc": "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc.",
        "badge": "منطبق با مقررات FTC"
      },
      {
        "title": "رمزنگاری سطح سازمانی",
        "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی.",
        "badge": "حفاظت رمزنگاری‌شده"
      },
      {
        "title": "کنترل کامل GDPR",
        "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب.",
        "badge": "حقوق مصرح قانونی"
      }
    ],
    "tocTitle": "فهرست دسترسی",
    "tocCount": "8 ماده",
    "sections": [
      {
        "id": "controller",
        "title": "۱. نهاد کنترل‌کننده داده‌ها"
      },
      {
        "id": "collection",
        "title": "۲. دسته‌بندی اطلاعات گردآوری‌شده"
      },
      {
        "id": "affiliates",
        "title": "۳. پیوندهای ارجاع و شخص ثالث",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "۴. مبنای قانونی و کاربرد داده‌ها"
      },
      {
        "id": "cookies",
        "title": "۵. کوکی‌ها و فناوری‌های رهگیری"
      },
      {
        "id": "security",
        "title": "۶. امنیت، نگهداری و انتقال داده‌ها"
      },
      {
        "id": "rights",
        "title": "۷. حقوق قانونی و درخواست امحا"
      },
      {
        "id": "contact",
        "title": "۸. استعلامات حریم خصوصی و مراجع نظارتی"
      }
    ],
    "legalHelp": {
      "title": "نیاز به شفاف‌سازی حقوقی دارید؟",
      "desc": "استعلامات مربوط به مجوز پلتفرم، همکاری‌های تجاری یا حقوق مالکیت معنوی.",
      "btn": "تماس با دپارتمان حقوقی"
    },
    "section1": {
      "secBadge": "ماده 1",
      "title": "۱. نهاد کنترل‌کننده داده‌ها",
      "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "legalEntityLabel": "نهاد حقوقی",
      "companyNumLabel": "شماره ثبت",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "ماده 2",
      "title": "۲. دسته‌بندی اطلاعات گردآوری‌شده",
      "desc": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم.",
      "cards": [
        {
          "title": "عدم فروش اطلاعات کاربران",
          "desc": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم."
        },
        {
          "title": "شفافیت در کوکی‌های ارجاع",
          "desc": "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc."
        },
        {
          "title": "رمزنگاری سطح سازمانی",
          "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی."
        },
        {
          "title": "کنترل کامل GDPR",
          "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب."
        }
      ]
    },
    "section3": {
      "secBadge": "ماده 3 • روابط شخص ثالث",
      "title": "۳. پیوندهای ارجاع و شخص ثالث",
      "badge": "منطبق با مقررات FTC",
      "desc": "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc.",
      "rulesTitle": "۳. پیوندهای ارجاع و شخص ثالث",
      "bullets": [
        "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc.",
        "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
        "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم.",
        "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی."
      ]
    },
    "section4": {
      "secBadge": "ماده 4",
      "title": "۴. مبنای قانونی و کاربرد داده‌ها",
      "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        }
      ]
    },
    "section5": {
      "secBadge": "ماده 5",
      "title": "۵. کوکی‌ها و فناوری‌های رهگیری",
      "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        },
        {
          "lead": "Personalized Ads:",
          "text": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم."
        }
      ]
    },
    "section6": {
      "secBadge": "ماده 6",
      "title": "۶. امنیت، نگهداری و انتقال داده‌ها",
      "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "حوزه قضایی: انگلستان و ولز"
    },
    "section7": {
      "secBadge": "ماده 7",
      "title": "۷. حقوق قانونی و درخواست امحا",
      "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب."
        },
        {
          "title": "Right to Rectification",
          "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        },
        {
          "title": "Right to Erasure",
          "desc": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم."
        },
        {
          "title": "Right to Restriction",
          "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        },
        {
          "title": "Right to Portability",
          "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی."
        },
        {
          "title": "Right to Object",
          "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "امحای حساب کاربری"
      }
    },
    "section8": {
      "secBadge": "ماده 8",
      "title": "۸. استعلامات حریم خصوصی و مراجع نظارتی",
      "desc": "استعلامات مربوط به مجوز پلتفرم، همکاری‌های تجاری یا حقوق مالکیت معنوی.",
      "emailLabel": "نیاز به شفاف‌سازی حقوقی دارید؟",
      "btn": "تماس با دپارتمان حقوقی",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ps": {
    "isRtl": true,
    "badge": "رسمي شرایط او د کارونکي تړون",
    "heroTitleLine1": "د کارونې شرایط او",
    "heroTitleLine2": "د کارونکي تړون",
    "heroSub": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
    "entityLabel": "حقوقي اداره: Safi International Capital LTD",
    "regLabel": "د ثبت شمیره: ۱۷۰۶۳۲۸۶ (انګلستان)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "د معلوماتو نه پلورل",
        "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو.",
        "badge": "تضمین شوی معیار"
      },
      {
        "title": "د کوکیز روڼتیا",
        "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه.",
        "badge": "د FTC معیار"
      },
      {
        "title": "پرمختللی کوډکول",
        "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول.",
        "badge": "خوندي ساتنه"
      },
      {
        "title": "د GDPR بشپړ کنټرول",
        "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق.",
        "badge": "قانوني حقونه"
      }
    ],
    "tocTitle": "د محتوا لړلیک",
    "tocCount": "8 حقوقي",
    "sections": [
      {
        "id": "controller",
        "title": "۱. د معلوماتو کنټرول کوونکې اداره"
      },
      {
        "id": "collection",
        "title": "۲. د راټولو شویو معلوماتو کټګورۍ"
      },
      {
        "id": "affiliates",
        "title": "۳. د دریمې ډلې او ملګرو لینکونه",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "۴. د معلوماتو قانوني کارول"
      },
      {
        "id": "cookies",
        "title": "۵. کوکیز او تعقیبي ټیکنالوژي"
      },
      {
        "id": "security",
        "title": "۶. امنیت او د معلوماتو ساتنه"
      },
      {
        "id": "rights",
        "title": "۷. ستاسو قانوني حقونه او د حذف غوښتنه"
      },
      {
        "id": "contact",
        "title": "۸. د محرمیت اړیکې او پوښتنې"
      }
    ],
    "legalHelp": {
      "title": "حقوقي وضاحت ته اړتیا لرئ؟",
      "desc": "د لایسنس، سوداګریزو همکاریو یا د معنوي مالکیت حقوقو په اړه پوښتنې.",
      "btn": "له حقوقي څانګې سره اړیکه"
    },
    "section1": {
      "secBadge": "ماده 1",
      "title": "۱. د معلوماتو کنټرول کوونکې اداره",
      "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "legalEntityLabel": "حقوقي اداره",
      "companyNumLabel": "د ثبت شمیره",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "ماده 2",
      "title": "۲. د راټولو شویو معلوماتو کټګورۍ",
      "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو.",
      "cards": [
        {
          "title": "د معلوماتو نه پلورل",
          "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو."
        },
        {
          "title": "د کوکیز روڼتیا",
          "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه."
        },
        {
          "title": "پرمختللی کوډکول",
          "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول."
        },
        {
          "title": "د GDPR بشپړ کنټرول",
          "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق."
        }
      ]
    },
    "section3": {
      "secBadge": "ماده 3 • د دریمې ډلې اړیکې",
      "title": "۳. د دریمې ډلې او ملګرو لینکونه",
      "badge": "د FTC معیار",
      "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه.",
      "rulesTitle": "۳. د دریمې ډلې او ملګرو لینکونه",
      "bullets": [
        "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه.",
        "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
        "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو.",
        "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول."
      ]
    },
    "section4": {
      "secBadge": "ماده 4",
      "title": "۴. د معلوماتو قانوني کارول",
      "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        }
      ]
    },
    "section5": {
      "secBadge": "ماده 5",
      "title": "۵. کوکیز او تعقیبي ټیکنالوژي",
      "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        },
        {
          "lead": "Personalized Ads:",
          "text": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو."
        }
      ]
    },
    "section6": {
      "secBadge": "ماده 6",
      "title": "۶. امنیت او د معلوماتو ساتنه",
      "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "قضايي ساحه: انګلستان او ویلز"
    },
    "section7": {
      "secBadge": "ماده 7",
      "title": "۷. ستاسو قانوني حقونه او د حذف غوښتنه",
      "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق."
        },
        {
          "title": "Right to Rectification",
          "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        },
        {
          "title": "Right to Erasure",
          "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو."
        },
        {
          "title": "Right to Restriction",
          "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        },
        {
          "title": "Right to Portability",
          "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول."
        },
        {
          "title": "Right to Object",
          "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "د حساب حذف کول"
      }
    },
    "section8": {
      "secBadge": "ماده 8",
      "title": "۸. د محرمیت اړیکې او پوښتنې",
      "desc": "د لایسنس، سوداګریزو همکاریو یا د معنوي مالکیت حقوقو په اړه پوښتنې.",
      "emailLabel": "حقوقي وضاحت ته اړتیا لرئ؟",
      "btn": "له حقوقي څانګې سره اړیکه",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ru": {
    "isRtl": false,
    "badge": "Официальные условия и соглашение",
    "heroTitleLine1": "Условия обслуживания и",
    "heroTitleLine2": "Пользовательское соглашение",
    "heroSub": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
    "entityLabel": "Юрлицо: Safi International Capital LTD",
    "regLabel": "Рег. номер: 17063286 (Великобритания)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Никакой продажи данных",
        "desc": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам.",
        "badge": "Гарантия безопасности"
      },
      {
        "title": "Прозрачность файлов cookie",
        "desc": "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc.",
        "badge": "Стандарт FTC"
      },
      {
        "title": "Шифрование данных",
        "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных.",
        "badge": "Криптографическая защита"
      },
      {
        "title": "Полный контроль GDPR",
        "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля.",
        "badge": "Законные права"
      }
    ],
    "tocTitle": "Навигация по разделам",
    "tocCount": "8 правовых",
    "sections": [
      {
        "id": "controller",
        "title": "1. Оператор персональных данных"
      },
      {
        "id": "collection",
        "title": "2. Категории собираемой информации"
      },
      {
        "id": "affiliates",
        "title": "3. Сторонние ссылки и партнеры",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Правовые основания и цели обработки"
      },
      {
        "id": "cookies",
        "title": "5. Файлы cookie и отслеживание"
      },
      {
        "id": "security",
        "title": "6. Безопасность и хранение данных"
      },
      {
        "id": "rights",
        "title": "7. Ваши законные права (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Запросы о конфиденциальности и регуляторы"
      }
    ],
    "legalHelp": {
      "title": "Нужна правовая консультация?",
      "desc": "Запросы по лицензированию платформы, коммерческим партнерствам или авторским правам.",
      "btn": "Связаться с юридическим отделом"
    },
    "section1": {
      "secBadge": "Статья 1",
      "title": "1. Оператор персональных данных",
      "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "legalEntityLabel": "Юрлицо",
      "companyNumLabel": "Рег. номер",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Статья 2",
      "title": "2. Категории собираемой информации",
      "desc": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам.",
      "cards": [
        {
          "title": "Никакой продажи данных",
          "desc": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам."
        },
        {
          "title": "Прозрачность файлов cookie",
          "desc": "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc."
        },
        {
          "title": "Шифрование данных",
          "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных."
        },
        {
          "title": "Полный контроль GDPR",
          "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля."
        }
      ]
    },
    "section3": {
      "secBadge": "Статья 3 • Взаимодействие с третьими лицами",
      "title": "3. Сторонние ссылки и партнеры",
      "badge": "Стандарт FTC",
      "desc": "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc.",
      "rulesTitle": "3. Сторонние ссылки и партнеры",
      "bullets": [
        "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc.",
        "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
        "Мы строго никогда не продаем и не передаем персональные данные третьим лицам.",
        "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных."
      ]
    },
    "section4": {
      "secBadge": "Статья 4",
      "title": "4. Правовые основания и цели обработки",
      "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        }
      ]
    },
    "section5": {
      "secBadge": "Статья 5",
      "title": "5. Файлы cookie и отслеживание",
      "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам."
        }
      ]
    },
    "section6": {
      "secBadge": "Статья 6",
      "title": "6. Безопасность и хранение данных",
      "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Юрисдикция: Англия и Уэльс"
    },
    "section7": {
      "secBadge": "Статья 7",
      "title": "7. Ваши законные права (GDPR)",
      "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля."
        },
        {
          "title": "Right to Rectification",
          "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        },
        {
          "title": "Right to Erasure",
          "desc": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам."
        },
        {
          "title": "Right to Restriction",
          "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        },
        {
          "title": "Right to Portability",
          "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных."
        },
        {
          "title": "Right to Object",
          "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Удаление аккаунта"
      }
    },
    "section8": {
      "secBadge": "Статья 8",
      "title": "8. Запросы о конфиденциальности и регуляторы",
      "desc": "Запросы по лицензированию платформы, коммерческим партнерствам или авторским правам.",
      "emailLabel": "Нужна правовая консультация?",
      "btn": "Связаться с юридическим отделом",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "tr": {
    "isRtl": false,
    "badge": "Resmi Koşullar ve Kullanıcı Sözleşmesi",
    "heroTitleLine1": "Hizmet Şartları ve",
    "heroTitleLine2": "Kullanıcı Sözleşmesi",
    "heroSub": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
    "entityLabel": "Tüzel Kişilik: Safi International Capital LTD",
    "regLabel": "Kayıt No: 17063286 (Birleşik Krallık)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Veri Satışı Yapılmaz",
        "desc": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız.",
        "badge": "Garantili Standart"
      },
      {
        "title": "Şeffaf Yönlendirme Çerezleri",
        "desc": "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan.",
        "badge": "FTC Uyumlu"
      },
      {
        "title": "Kurumsal Düzeyde Şifreleme",
        "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi.",
        "badge": "Kriptografik Koruma"
      },
      {
        "title": "Tam GDPR Kontrolü",
        "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı.",
        "badge": "Yasal Haklar"
      }
    ],
    "tocTitle": "Gezinme Dizini",
    "tocCount": "8 Hukuki",
    "sections": [
      {
        "id": "controller",
        "title": "1. Veri Sorumlusu ve Tüzel Kişilik"
      },
      {
        "id": "collection",
        "title": "2. Toplanan Bilgi Kategorileri"
      },
      {
        "id": "affiliates",
        "title": "3. Üçüncü Taraf Bağlantıları ve Ortaklar",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Verilerin Kullanım Amaçları"
      },
      {
        "id": "cookies",
        "title": "5. Çerezler ve İzleme Teknolojileri"
      },
      {
        "id": "security",
        "title": "6. Veri Güvenliği ve Saklama"
      },
      {
        "id": "rights",
        "title": "7. Yasal Haklarınız (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Gizlilik Talepleri ve Denetim Makamı"
      }
    ],
    "legalHelp": {
      "title": "Hukuki Açıklamaya mı İhtiyacınız Var?",
      "desc": "Platform lisanslaması, ticari ortaklıklar veya fikri mülkiyet haklarına ilişkin talepler.",
      "btn": "Hukuk Departmanıyla İletişime Geçin"
    },
    "section1": {
      "secBadge": "Bölüm 1",
      "title": "1. Veri Sorumlusu ve Tüzel Kişilik",
      "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "legalEntityLabel": "Tüzel Kişilik",
      "companyNumLabel": "Kayıt No",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Bölüm 2",
      "title": "2. Toplanan Bilgi Kategorileri",
      "desc": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız.",
      "cards": [
        {
          "title": "Veri Satışı Yapılmaz",
          "desc": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız."
        },
        {
          "title": "Şeffaf Yönlendirme Çerezleri",
          "desc": "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan."
        },
        {
          "title": "Kurumsal Düzeyde Şifreleme",
          "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi."
        },
        {
          "title": "Tam GDPR Kontrolü",
          "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı."
        }
      ]
    },
    "section3": {
      "secBadge": "Bölüm 3 • Üçüncü Taraf İlişkileri",
      "title": "3. Üçüncü Taraf Bağlantıları ve Ortaklar",
      "badge": "FTC Uyumlu",
      "desc": "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan.",
      "rulesTitle": "3. Üçüncü Taraf Bağlantıları ve Ortaklar",
      "bullets": [
        "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan.",
        "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
        "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız.",
        "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi."
      ]
    },
    "section4": {
      "secBadge": "Bölüm 4",
      "title": "4. Verilerin Kullanım Amaçları",
      "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        }
      ]
    },
    "section5": {
      "secBadge": "Bölüm 5",
      "title": "5. Çerezler ve İzleme Teknolojileri",
      "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız."
        }
      ]
    },
    "section6": {
      "secBadge": "Bölüm 6",
      "title": "6. Veri Güvenliği ve Saklama",
      "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Yargı Yetkisi: İngiltere ve Galler"
    },
    "section7": {
      "secBadge": "Bölüm 7",
      "title": "7. Yasal Haklarınız (GDPR)",
      "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı."
        },
        {
          "title": "Right to Rectification",
          "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        },
        {
          "title": "Right to Erasure",
          "desc": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız."
        },
        {
          "title": "Right to Restriction",
          "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        },
        {
          "title": "Right to Portability",
          "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi."
        },
        {
          "title": "Right to Object",
          "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Hesap Silme"
      }
    },
    "section8": {
      "secBadge": "Bölüm 8",
      "title": "8. Gizlilik Talepleri ve Denetim Makamı",
      "desc": "Platform lisanslaması, ticari ortaklıklar veya fikri mülkiyet haklarına ilişkin talepler.",
      "emailLabel": "Hukuki Açıklamaya mı İhtiyacınız Var?",
      "btn": "Hukuk Departmanıyla İletişime Geçin",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "de": {
    "isRtl": false,
    "badge": "Offizielle Nutzungsbedingungen & Vereinbarung",
    "heroTitleLine1": "Nutzungsbedingungen &",
    "heroTitleLine2": "Nutzervereinbarung",
    "heroSub": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
    "entityLabel": "Rechtsträger: Safi International Capital LTD",
    "regLabel": "Handelsregister: 17063286 (UK)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Kein Datenverkauf",
        "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte.",
        "badge": "Garantierter Standard"
      },
      {
        "title": "Affiliate-Transparenz",
        "desc": "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc.",
        "badge": "FTC-konform"
      },
      {
        "title": "Unternehmensverschlüsselung",
        "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten.",
        "badge": "Kryptografischer Schutz"
      },
      {
        "title": "Volle DSGVO-Kontrolle",
        "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung.",
        "badge": "Gesetzliche Rechte"
      }
    ],
    "tocTitle": "Navigationsverzeichnis",
    "tocCount": "8 Rechtsabschnitte",
    "sections": [
      {
        "id": "controller",
        "title": "1. Verantwortliche Stelle & Unternehmen"
      },
      {
        "id": "collection",
        "title": "2. Erfasste Datenkategorien"
      },
      {
        "id": "affiliates",
        "title": "3. Drittanbieter-Links & Partner",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Rechtsgrundlagen & Nutzung der Daten"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & Tracking-Technologien"
      },
      {
        "id": "security",
        "title": "6. Datensicherheit & Speicherung"
      },
      {
        "id": "rights",
        "title": "7. Ihre gesetzlichen Rechte (DSGVO)"
      },
      {
        "id": "contact",
        "title": "8. Datenschutzanfragen & Aufsichtsbehörde"
      }
    ],
    "legalHelp": {
      "title": "Rechtliche Klärung erforderlich?",
      "desc": "Anfragen zu Plattformlizenzen, Unternehmenspartnerschaften oder geistigem Eigentum.",
      "btn": "Rechtsabteilung kontaktieren"
    },
    "section1": {
      "secBadge": "Abschnitt 1",
      "title": "1. Verantwortliche Stelle & Unternehmen",
      "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "legalEntityLabel": "Rechtsträger",
      "companyNumLabel": "Handelsregister",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Abschnitt 2",
      "title": "2. Erfasste Datenkategorien",
      "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte.",
      "cards": [
        {
          "title": "Kein Datenverkauf",
          "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte."
        },
        {
          "title": "Affiliate-Transparenz",
          "desc": "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc."
        },
        {
          "title": "Unternehmensverschlüsselung",
          "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten."
        },
        {
          "title": "Volle DSGVO-Kontrolle",
          "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung."
        }
      ]
    },
    "section3": {
      "secBadge": "Abschnitt 3 • Drittanbieterbeziehungen",
      "title": "3. Drittanbieter-Links & Partner",
      "badge": "FTC-konform",
      "desc": "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc.",
      "rulesTitle": "3. Drittanbieter-Links & Partner",
      "bullets": [
        "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc.",
        "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
        "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte.",
        "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten."
      ]
    },
    "section4": {
      "secBadge": "Abschnitt 4",
      "title": "4. Rechtsgrundlagen & Nutzung der Daten",
      "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        }
      ]
    },
    "section5": {
      "secBadge": "Abschnitt 5",
      "title": "5. Cookies & Tracking-Technologien",
      "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte."
        }
      ]
    },
    "section6": {
      "secBadge": "Abschnitt 6",
      "title": "6. Datensicherheit & Speicherung",
      "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Gerichtsstand: England & Wales"
    },
    "section7": {
      "secBadge": "Abschnitt 7",
      "title": "7. Ihre gesetzlichen Rechte (DSGVO)",
      "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung."
        },
        {
          "title": "Right to Rectification",
          "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        },
        {
          "title": "Right to Erasure",
          "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte."
        },
        {
          "title": "Right to Restriction",
          "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        },
        {
          "title": "Right to Portability",
          "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten."
        },
        {
          "title": "Right to Object",
          "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Konto löschen"
      }
    },
    "section8": {
      "secBadge": "Abschnitt 8",
      "title": "8. Datenschutzanfragen & Aufsichtsbehörde",
      "desc": "Anfragen zu Plattformlizenzen, Unternehmenspartnerschaften oder geistigem Eigentum.",
      "emailLabel": "Rechtliche Klärung erforderlich?",
      "btn": "Rechtsabteilung kontaktieren",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "fr": {
    "isRtl": false,
    "badge": "Conditions officielles et contrat d'utilisation",
    "heroTitleLine1": "Conditions d'utilisation et",
    "heroTitleLine2": "Accord utilisateur",
    "heroSub": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
    "entityLabel": "Entité juridique : Safi International Capital LTD",
    "regLabel": "N° registre : 17063286 (Royaume-Uni)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Zéro vente de données",
        "desc": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données.",
        "badge": "Norme garantie"
      },
      {
        "title": "Transparence d'affiliation",
        "desc": "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Chiffrement de pointe",
        "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie.",
        "badge": "Protection cryptographique"
      },
      {
        "title": "Contrôle RGPD complet",
        "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données.",
        "badge": "Droits légaux"
      }
    ],
    "tocTitle": "Index de navigation",
    "tocCount": "8 articles",
    "sections": [
      {
        "id": "controller",
        "title": "1. Responsable du traitement des données"
      },
      {
        "id": "collection",
        "title": "2. Catégories d'informations collectées"
      },
      {
        "id": "affiliates",
        "title": "3. Liens tiers et partenaires affiliés",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Utilisation et base légale des données"
      },
      {
        "id": "cookies",
        "title": "5. Cookies et technologies de suivi"
      },
      {
        "id": "security",
        "title": "6. Sécurité et conservation des données"
      },
      {
        "id": "rights",
        "title": "7. Vos droits légaux (RGPD)"
      },
      {
        "id": "contact",
        "title": "8. Demandes de confidentialité et autorité"
      }
    ],
    "legalHelp": {
      "title": "Besoin d'éclaircissements juridiques ?",
      "desc": "Demandes relatives aux licences, partenariats commerciaux ou propriété intellectuelle.",
      "btn": "Contacter le service juridique"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Responsable du traitement des données",
      "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "legalEntityLabel": "Entité juridique ",
      "companyNumLabel": "N° registre ",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Catégories d'informations collectées",
      "desc": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données.",
      "cards": [
        {
          "title": "Zéro vente de données",
          "desc": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données."
        },
        {
          "title": "Transparence d'affiliation",
          "desc": "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc."
        },
        {
          "title": "Chiffrement de pointe",
          "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie."
        },
        {
          "title": "Contrôle RGPD complet",
          "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données."
        }
      ]
    },
    "section3": {
      "secBadge": "Section 3 • Relations avec des tiers",
      "title": "3. Liens tiers et partenaires affiliés",
      "badge": "Conforme FTC",
      "desc": "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc.",
      "rulesTitle": "3. Liens tiers et partenaires affiliés",
      "bullets": [
        "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc.",
        "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
        "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données.",
        "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie."
      ]
    },
    "section4": {
      "secBadge": "Section 4",
      "title": "4. Utilisation et base légale des données",
      "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "5. Cookies et technologies de suivi",
      "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données."
        }
      ]
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "6. Sécurité et conservation des données",
      "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Juridiction : Angleterre et Pays de Galles"
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "7. Vos droits légaux (RGPD)",
      "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données."
        },
        {
          "title": "Right to Rectification",
          "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        },
        {
          "title": "Right to Erasure",
          "desc": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données."
        },
        {
          "title": "Right to Restriction",
          "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        },
        {
          "title": "Right to Portability",
          "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie."
        },
        {
          "title": "Right to Object",
          "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Suppression de compte"
      }
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "8. Demandes de confidentialité et autorité",
      "desc": "Demandes relatives aux licences, partenariats commerciaux ou propriété intellectuelle.",
      "emailLabel": "Besoin d'éclaircissements juridiques ?",
      "btn": "Contacter le service juridique",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ar": {
    "isRtl": true,
    "badge": "الشروط الرسمية واتفاقية المستخدم",
    "heroTitleLine1": "شروط الخدمة و",
    "heroTitleLine2": "اتفاقية المستخدم",
    "heroSub": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
    "entityLabel": "الكيان القانوني: Safi International Capital LTD",
    "regLabel": "رقم التسجيل: 17063286 (المملكة المتحدة)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "حظر بيع البيانات نهائياً",
        "desc": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات.",
        "badge": "معيار مضمون"
      },
      {
        "title": "شفافية ملفات تعريف الإحالة",
        "desc": "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc.",
        "badge": "متوافق مع FTC"
      },
      {
        "title": "تشفير بمستوى المؤسسات",
        "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول.",
        "badge": "حماية مشفرة"
      },
      {
        "title": "تحكم كامل بموجب GDPR",
        "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً.",
        "badge": "حقوق قانونية ملزمة"
      }
    ],
    "tocTitle": "فهرس التنقل",
    "tocCount": "8 مواد",
    "sections": [
      {
        "id": "controller",
        "title": "1. مسؤول معالجة البيانات والكيان"
      },
      {
        "id": "collection",
        "title": "2. فئات المعلومات التي نجمعها"
      },
      {
        "id": "affiliates",
        "title": "3. روابط الطرف الثالث والشركاء",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. الأساس القانوني واستخدام البيانات"
      },
      {
        "id": "cookies",
        "title": "5. ملفات تعريف الارتباط والتتبع"
      },
      {
        "id": "security",
        "title": "6. أمن البيانات وبروتوكولات التخزين"
      },
      {
        "id": "rights",
        "title": "7. حقوقك القانونية وطلب الحذف"
      },
      {
        "id": "contact",
        "title": "8. استفسارات الخصوصية والجهات التنظيمية"
      }
    ],
    "legalHelp": {
      "title": "هل تحتاج إلى توضيح قانوني؟",
      "desc": "استفسارات بشأن ترخيص المنصة أو الشراكات التجارية أو حقوق الملكية الفكرية.",
      "btn": "الاتصال بالقسم القانوني"
    },
    "section1": {
      "secBadge": "المادة 1",
      "title": "1. مسؤول معالجة البيانات والكيان",
      "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "legalEntityLabel": "الكيان القانوني",
      "companyNumLabel": "رقم التسجيل",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "المادة 2",
      "title": "2. فئات المعلومات التي نجمعها",
      "desc": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات.",
      "cards": [
        {
          "title": "حظر بيع البيانات نهائياً",
          "desc": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات."
        },
        {
          "title": "شفافية ملفات تعريف الإحالة",
          "desc": "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc."
        },
        {
          "title": "تشفير بمستوى المؤسسات",
          "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول."
        },
        {
          "title": "تحكم كامل بموجب GDPR",
          "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً."
        }
      ]
    },
    "section3": {
      "secBadge": "المادة 3 • علاقات الطرف الثالث",
      "title": "3. روابط الطرف الثالث والشركاء",
      "badge": "متوافق مع FTC",
      "desc": "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc.",
      "rulesTitle": "3. روابط الطرف الثالث والشركاء",
      "bullets": [
        "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc.",
        "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
        "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات.",
        "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول."
      ]
    },
    "section4": {
      "secBadge": "المادة 4",
      "title": "4. الأساس القانوني واستخدام البيانات",
      "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        }
      ]
    },
    "section5": {
      "secBadge": "المادة 5",
      "title": "5. ملفات تعريف الارتباط والتتبع",
      "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        },
        {
          "lead": "Personalized Ads:",
          "text": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات."
        }
      ]
    },
    "section6": {
      "secBadge": "المادة 6",
      "title": "6. أمن البيانات وبروتوكولات التخزين",
      "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "الاختصاص القضائي: إنجلترا وويلز"
    },
    "section7": {
      "secBadge": "المادة 7",
      "title": "7. حقوقك القانونية وطلب الحذف",
      "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً."
        },
        {
          "title": "Right to Rectification",
          "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        },
        {
          "title": "Right to Erasure",
          "desc": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات."
        },
        {
          "title": "Right to Restriction",
          "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        },
        {
          "title": "Right to Portability",
          "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول."
        },
        {
          "title": "Right to Object",
          "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "حذف الحساب"
      }
    },
    "section8": {
      "secBadge": "المادة 8",
      "title": "8. استفسارات الخصوصية والجهات التنظيمية",
      "desc": "استفسارات بشأن ترخيص المنصة أو الشراكات التجارية أو حقوق الملكية الفكرية.",
      "emailLabel": "هل تحتاج إلى توضيح قانوني؟",
      "btn": "الاتصال بالقسم القانوني",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ur": {
    "isRtl": true,
    "badge": "سرکاری شرائط اور صارف کا معاہدہ",
    "heroTitleLine1": "سروس کی شرائط اور",
    "heroTitleLine2": "صارف کا معاہدہ",
    "heroSub": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
    "entityLabel": "قانونی ادارہ: Safi International Capital LTD",
    "regLabel": "رجسٹریشن نمبر: 17063286 (برطانیہ)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "ڈیٹا فروخت نہ کرنے کی ضمانت",
        "desc": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔",
        "badge": "گارنٹی شدہ معیار"
      },
      {
        "title": "الحاق کی شفافیت",
        "desc": "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔",
        "badge": "FTC کے مطابق"
      },
      {
        "title": "اعلیٰ درجے کی انکرپشن",
        "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔",
        "badge": "کرپٹوگرافک تحفظ"
      },
      {
        "title": "مکمل GDPR کنٹرول",
        "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔",
        "badge": "قانونی حقوق"
      }
    ],
    "tocTitle": "فہرست مضامین",
    "tocCount": "8 قانونی",
    "sections": [
      {
        "id": "controller",
        "title": "1. ڈیٹا کنٹرولر اور ادارہ"
      },
      {
        "id": "collection",
        "title": "2. جمع کی جانے والی معلومات کے زمرے"
      },
      {
        "id": "affiliates",
        "title": "3. تیسرے فریق کے لنکس اور پارٹنرز",
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
        "title": "6. ڈیٹا کی حفاظت اور اسٹوریج"
      },
      {
        "id": "rights",
        "title": "7. آپ کے قانونی حقوق اور اکاؤنٹ حذف کرنا"
      },
      {
        "id": "contact",
        "title": "8. رازداری کے استفسارات اور رابطہ"
      }
    ],
    "legalHelp": {
      "title": "قانونی وضاحت درکار ہے؟",
      "desc": "پلیٹ فارم لائسنسنگ، تجارتی شراکت داری یا دانشورانہ ملکیت کے حقوق کے بارے میں استفسارات۔",
      "btn": "قانونی شعبے سے رابطہ کریں"
    },
    "section1": {
      "secBadge": "شق 1",
      "title": "1. ڈیٹا کنٹرولر اور ادارہ",
      "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "legalEntityLabel": "قانونی ادارہ",
      "companyNumLabel": "رجسٹریشن نمبر",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "شق 2",
      "title": "2. جمع کی جانے والی معلومات کے زمرے",
      "desc": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔",
      "cards": [
        {
          "title": "ڈیٹا فروخت نہ کرنے کی ضمانت",
          "desc": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔"
        },
        {
          "title": "الحاق کی شفافیت",
          "desc": "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔"
        },
        {
          "title": "اعلیٰ درجے کی انکرپشن",
          "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔"
        },
        {
          "title": "مکمل GDPR کنٹرول",
          "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔"
        }
      ]
    },
    "section3": {
      "secBadge": "شق 3 • تیسرے فریق کے تعلقات",
      "title": "3. تیسرے فریق کے لنکس اور پارٹنرز",
      "badge": "FTC کے مطابق",
      "desc": "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔",
      "rulesTitle": "3. تیسرے فریق کے لنکس اور پارٹنرز",
      "bullets": [
        "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔",
        "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
        "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔",
        "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔"
      ]
    },
    "section4": {
      "secBadge": "شق 4",
      "title": "4. ڈیٹا کے استعمال کی قانونی بنیادیں",
      "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔"
        },
        {
          "title": "Legitimate Interests:",
          "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔"
        },
        {
          "title": "Statutory Obligations:",
          "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        }
      ]
    },
    "section5": {
      "secBadge": "شق 5",
      "title": "5. کوکیز اور ٹریکنگ ٹیکنالوجیز",
      "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        },
        {
          "lead": "Personalized Ads:",
          "text": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔"
        }
      ]
    },
    "section6": {
      "secBadge": "شق 6",
      "title": "6. ڈیٹا کی حفاظت اور اسٹوریج",
      "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "عدالتی دائرہ اختیار: انگلینڈ اور ویلز"
    },
    "section7": {
      "secBadge": "شق 7",
      "title": "7. آپ کے قانونی حقوق اور اکاؤنٹ حذف کرنا",
      "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔"
        },
        {
          "title": "Right to Rectification",
          "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        },
        {
          "title": "Right to Erasure",
          "desc": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔"
        },
        {
          "title": "Right to Restriction",
          "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        },
        {
          "title": "Right to Portability",
          "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔"
        },
        {
          "title": "Right to Object",
          "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔"
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "اکاؤنٹ کا خاتمہ"
      }
    },
    "section8": {
      "secBadge": "شق 8",
      "title": "8. رازداری کے استفسارات اور رابطہ",
      "desc": "پلیٹ فارم لائسنسنگ، تجارتی شراکت داری یا دانشورانہ ملکیت کے حقوق کے بارے میں استفسارات۔",
      "emailLabel": "قانونی وضاحت درکار ہے؟",
      "btn": "قانونی شعبے سے رابطہ کریں",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "es": {
    "isRtl": false,
    "badge": "Términos oficiales y acuerdo de usuario",
    "heroTitleLine1": "Términos de servicio y",
    "heroTitleLine2": "Acuerdo de usuario",
    "heroSub": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
    "entityLabel": "Entidad legal: Safi International Capital LTD",
    "regLabel": "Registro: 17063286 (Reino Unido)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Cero venta de datos",
        "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos.",
        "badge": "Estándar garantizado"
      },
      {
        "title": "Transparencia de afiliados",
        "desc": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.",
        "badge": "Cumple con la FTC"
      },
      {
        "title": "Cifrado empresarial",
        "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros.",
        "badge": "Protección criptográfica"
      },
      {
        "title": "Control total de RGPD",
        "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento.",
        "badge": "Derechos legales"
      }
    ],
    "tocTitle": "Índice de navegación",
    "tocCount": "8 secciones",
    "sections": [
      {
        "id": "controller",
        "title": "1. Responsable del tratamiento de datos"
      },
      {
        "id": "collection",
        "title": "2. Categorías de información recopilada"
      },
      {
        "id": "affiliates",
        "title": "3. Enlaces a terceros y afiliados",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Base legal y uso de datos"
      },
      {
        "id": "cookies",
        "title": "5. Cookies y tecnologías de rastreo"
      },
      {
        "id": "security",
        "title": "6. Seguridad y almacenamiento de datos"
      },
      {
        "id": "rights",
        "title": "7. Sus derechos legales (RGPD)"
      },
      {
        "id": "contact",
        "title": "8. Consultas de privacidad y autoridades"
      }
    ],
    "legalHelp": {
      "title": "¿Necesita aclaración legal?",
      "desc": "Consultas sobre licencias de plataforma, asociaciones comerciales o derechos de autor.",
      "btn": "Contactar departamento legal"
    },
    "section1": {
      "secBadge": "Sección 1",
      "title": "1. Responsable del tratamiento de datos",
      "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "legalEntityLabel": "Entidad legal",
      "companyNumLabel": "Registro",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sección 2",
      "title": "2. Categorías de información recopilada",
      "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos.",
      "cards": [
        {
          "title": "Cero venta de datos",
          "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos."
        },
        {
          "title": "Transparencia de afiliados",
          "desc": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc."
        },
        {
          "title": "Cifrado empresarial",
          "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros."
        },
        {
          "title": "Control total de RGPD",
          "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento."
        }
      ]
    },
    "section3": {
      "secBadge": "Sección 3 • Relaciones con terceros",
      "title": "3. Enlaces a terceros y afiliados",
      "badge": "Cumple con la FTC",
      "desc": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.",
      "rulesTitle": "3. Enlaces a terceros y afiliados",
      "bullets": [
        "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.",
        "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
        "Nunca vendemos ni alquilamos su información personal a intermediarios de datos.",
        "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros."
      ]
    },
    "section4": {
      "secBadge": "Sección 4",
      "title": "4. Base legal y uso de datos",
      "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        }
      ]
    },
    "section5": {
      "secBadge": "Sección 5",
      "title": "5. Cookies y tecnologías de rastreo",
      "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos."
        }
      ]
    },
    "section6": {
      "secBadge": "Sección 6",
      "title": "6. Seguridad y almacenamiento de datos",
      "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Jurisdicción: Inglaterra y Gales"
    },
    "section7": {
      "secBadge": "Sección 7",
      "title": "7. Sus derechos legales (RGPD)",
      "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento."
        },
        {
          "title": "Right to Rectification",
          "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        },
        {
          "title": "Right to Erasure",
          "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos."
        },
        {
          "title": "Right to Restriction",
          "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        },
        {
          "title": "Right to Portability",
          "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros."
        },
        {
          "title": "Right to Object",
          "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Eliminación de cuenta"
      }
    },
    "section8": {
      "secBadge": "Sección 8",
      "title": "8. Consultas de privacidad y autoridades",
      "desc": "Consultas sobre licencias de plataforma, asociaciones comerciales o derechos de autor.",
      "emailLabel": "¿Necesita aclaración legal?",
      "btn": "Contactar departamento legal",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "zh": {
    "isRtl": false,
    "badge": "官方条款与用户协议",
    "heroTitleLine1": "服务条款与",
    "heroTitleLine2": "用户使用协议",
    "heroSub": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
    "entityLabel": "法人实体：Safi International Capital LTD",
    "regLabel": "注册号：17063286（英国）",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "坚决绝不出售任何数据",
        "desc": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。",
        "badge": "品质合规保证"
      },
      {
        "title": "推广返佣机制完全透明",
        "desc": "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。",
        "badge": "符合FTC规范"
      },
      {
        "title": "金融企业级端到端加密",
        "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。",
        "badge": "密码级安全屏障"
      },
      {
        "title": "完整英国/欧盟GDPR主权",
        "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。",
        "badge": "法定主权权利"
      }
    ],
    "tocTitle": "导航索引",
    "tocCount": "8 Sections",
    "sections": [
      {
        "id": "controller",
        "title": "1. 数据控制者与法人实体"
      },
      {
        "id": "collection",
        "title": "2. 我们收集的个人信息类别"
      },
      {
        "id": "affiliates",
        "title": "3. 第三方外链与商业推广披露",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. 数据处理的合法性基础与用途"
      },
      {
        "id": "cookies",
        "title": "5. Cookie与追踪技术管理"
      },
      {
        "id": "security",
        "title": "6. 数据安全防护与跨境传输协议"
      },
      {
        "id": "rights",
        "title": "7. 您的法定数据权利与注销通道"
      },
      {
        "id": "contact",
        "title": "8. 隐私事务联络与ICO监管投诉"
      }
    ],
    "legalHelp": {
      "title": "需要法律说明？",
      "desc": "关于平台授权许可、商业战略合作或知识产权的官方咨询。",
      "btn": "联络法务合规部门"
    },
    "section1": {
      "secBadge": "第 1",
      "title": "1. 数据控制者与法人实体",
      "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "legalEntityLabel": "Entity",
      "companyNumLabel": "Reg",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第 2",
      "title": "2. 我们收集的个人信息类别",
      "desc": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。",
      "cards": [
        {
          "title": "坚决绝不出售任何数据",
          "desc": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。"
        },
        {
          "title": "推广返佣机制完全透明",
          "desc": "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。"
        },
        {
          "title": "金融企业级端到端加密",
          "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。"
        },
        {
          "title": "完整英国/欧盟GDPR主权",
          "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。"
        }
      ]
    },
    "section3": {
      "secBadge": "第 3 • 第三方合作关系",
      "title": "3. 第三方外链与商业推广披露",
      "badge": "符合FTC规范",
      "desc": "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。",
      "rulesTitle": "3. 第三方外链与商业推广披露",
      "bullets": [
        "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。",
        "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
        "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。",
        "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。"
      ]
    },
    "section4": {
      "secBadge": "第 4",
      "title": "4. 数据处理的合法性基础与用途",
      "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。"
        },
        {
          "title": "Legitimate Interests:",
          "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。"
        },
        {
          "title": "Statutory Obligations:",
          "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        }
      ]
    },
    "section5": {
      "secBadge": "第 5",
      "title": "5. Cookie与追踪技术管理",
      "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        },
        {
          "lead": "Personalized Ads:",
          "text": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。"
        }
      ]
    },
    "section6": {
      "secBadge": "第 6",
      "title": "6. 数据安全防护与跨境传输协议",
      "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "司法管辖区：英格兰和威尔士"
    },
    "section7": {
      "secBadge": "第 7",
      "title": "7. 您的法定数据权利与注销通道",
      "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。"
        },
        {
          "title": "Right to Rectification",
          "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        },
        {
          "title": "Right to Erasure",
          "desc": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。"
        },
        {
          "title": "Right to Restriction",
          "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        },
        {
          "title": "Right to Portability",
          "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。"
        },
        {
          "title": "Right to Object",
          "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。"
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "账号注销申请"
      }
    },
    "section8": {
      "secBadge": "第 8",
      "title": "8. 隐私事务联络与ICO监管投诉",
      "desc": "关于平台授权许可、商业战略合作或知识产权的官方咨询。",
      "emailLabel": "需要法律说明？",
      "btn": "联络法务合规部门",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "hi": {
    "isRtl": false,
    "badge": "आधिकारिक नियम और उपयोगकर्ता समझौता",
    "heroTitleLine1": "सेवा की शर्तें और",
    "heroTitleLine2": "उपयोगकर्ता समझौता",
    "heroSub": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
    "entityLabel": "कानूनी इकाई: Safi International Capital LTD",
    "regLabel": "पंजीकरण संख्या: 17063286 (यूके)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "डेटा कभी नहीं बेचा जाता",
        "desc": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।",
        "badge": "गारंटीकृत मानक"
      },
      {
        "title": "संबद्ध कुकी पारदर्शिता",
        "desc": "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।",
        "badge": "FTC अनुपालन"
      },
      {
        "title": "उन्नत स्तर का एन्क्रिप्शन",
        "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।",
        "badge": "क्रिप्टोग्राफिक सुरक्षा"
      },
      {
        "title": "पूर्ण GDPR नियंत्रण",
        "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।",
        "badge": "वैधानिक अधिकार"
      }
    ],
    "tocTitle": "नेविगेशन सूची",
    "tocCount": "8 कानूनी",
    "sections": [
      {
        "id": "controller",
        "title": "1. डेटा नियंत्रक और कानूनी इकाई"
      },
      {
        "id": "collection",
        "title": "2. एकत्र की गई जानकारी की श्रेणियां"
      },
      {
        "id": "affiliates",
        "title": "3. तृतीय-पक्ष लिंक और संबद्ध साझेदार",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. कानूनी आधार और डेटा का उपयोग"
      },
      {
        "id": "cookies",
        "title": "5. कुकीज़ और ट्रैकिंग तकनीक"
      },
      {
        "id": "security",
        "title": "6. डेटा सुरक्षा और भंडारण प्रोटोकॉल"
      },
      {
        "id": "rights",
        "title": "7. आपके कानूनी अधिकार (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. गोपनीयता पूछताछ और शिकायत निवारण"
      }
    ],
    "legalHelp": {
      "title": "कानूनी स्पष्टीकरण चाहिए?",
      "desc": "प्लेटफ़ॉर्म लाइसेंसिंग, व्यावसायिक साझेदारी या बौद्धिक संपदा अधिकारों से संबंधित पूछताछ।",
      "btn": "कानूनी विभाग से संपर्क करें"
    },
    "section1": {
      "secBadge": "धारा 1",
      "title": "1. डेटा नियंत्रक और कानूनी इकाई",
      "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "legalEntityLabel": "कानूनी इकाई",
      "companyNumLabel": "पंजीकरण संख्या",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "धारा 2",
      "title": "2. एकत्र की गई जानकारी की श्रेणियां",
      "desc": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।",
      "cards": [
        {
          "title": "डेटा कभी नहीं बेचा जाता",
          "desc": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।"
        },
        {
          "title": "संबद्ध कुकी पारदर्शिता",
          "desc": "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।"
        },
        {
          "title": "उन्नत स्तर का एन्क्रिप्शन",
          "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।"
        },
        {
          "title": "पूर्ण GDPR नियंत्रण",
          "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।"
        }
      ]
    },
    "section3": {
      "secBadge": "धारा 3 • तृतीय-पक्ष संबंध",
      "title": "3. तृतीय-पक्ष लिंक और संबद्ध साझेदार",
      "badge": "FTC अनुपालन",
      "desc": "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।",
      "rulesTitle": "3. तृतीय-पक्ष लिंक और संबद्ध साझेदार",
      "bullets": [
        "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।",
        "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
        "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।",
        "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।"
      ]
    },
    "section4": {
      "secBadge": "धारा 4",
      "title": "4. कानूनी आधार और डेटा का उपयोग",
      "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।"
        },
        {
          "title": "Legitimate Interests:",
          "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।"
        },
        {
          "title": "Statutory Obligations:",
          "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        }
      ]
    },
    "section5": {
      "secBadge": "धारा 5",
      "title": "5. कुकीज़ और ट्रैकिंग तकनीक",
      "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        },
        {
          "lead": "Personalized Ads:",
          "text": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।"
        }
      ]
    },
    "section6": {
      "secBadge": "धारा 6",
      "title": "6. डेटा सुरक्षा और भंडारण प्रोटोकॉल",
      "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "क्षेत्राधिकार: इंग्लैंड और वेल्स"
    },
    "section7": {
      "secBadge": "धारा 7",
      "title": "7. आपके कानूनी अधिकार (GDPR)",
      "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।"
        },
        {
          "title": "Right to Rectification",
          "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        },
        {
          "title": "Right to Erasure",
          "desc": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।"
        },
        {
          "title": "Right to Restriction",
          "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        },
        {
          "title": "Right to Portability",
          "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।"
        },
        {
          "title": "Right to Object",
          "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।"
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "खाता हटाना"
      }
    },
    "section8": {
      "secBadge": "धारा 8",
      "title": "8. गोपनीयता पूछताछ और शिकायत निवारण",
      "desc": "प्लेटफ़ॉर्म लाइसेंसिंग, व्यावसायिक साझेदारी या बौद्धिक संपदा अधिकारों से संबंधित पूछताछ।",
      "emailLabel": "कानूनी स्पष्टीकरण चाहिए?",
      "btn": "कानूनी विभाग से संपर्क करें",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "it": {
    "isRtl": false,
    "badge": "Termini ufficiali e accordo utente",
    "heroTitleLine1": "Termini di servizio e",
    "heroTitleLine2": "Accordo con l'utente",
    "heroSub": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
    "entityLabel": "Entità legale: Safi International Capital LTD",
    "regLabel": "Reg: 17063286 (Regno Unito)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Nessuna vendita di dati",
        "desc": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati.",
        "badge": "Standard garantito"
      },
      {
        "title": "Trasparenza sui cookie",
        "desc": "Informativa chiara sui cookie di referral e partner come Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Crittografia di livello enterprise",
        "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma.",
        "badge": "Protezione crittografica"
      },
      {
        "title": "Controllo GDPR completo",
        "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento.",
        "badge": "Diritti statutari"
      }
    ],
    "tocTitle": "Indice di navigazione",
    "tocCount": "8 articoli",
    "sections": [
      {
        "id": "controller",
        "title": "1. Titolare del trattamento dei dati"
      },
      {
        "id": "collection",
        "title": "2. Categorie di informazioni raccolte"
      },
      {
        "id": "affiliates",
        "title": "3. Link di terze parti e affiliati",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Base giuridica e utilizzo dei dati"
      },
      {
        "id": "cookies",
        "title": "5. Cookie e tecnologie di tracciamento"
      },
      {
        "id": "security",
        "title": "6. Sicurezza e conservazione dei dati"
      },
      {
        "id": "rights",
        "title": "7. I tuoi diritti legali (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Richieste sulla privacy e autorità"
      }
    ],
    "legalHelp": {
      "title": "Hai bisogno di chiarimenti legali?",
      "desc": "Richieste relative a licenze della piattaforma, partnership commerciali o proprietà intellettuale.",
      "btn": "Contatta l'ufficio legale"
    },
    "section1": {
      "secBadge": "Sezione 1",
      "title": "1. Titolare del trattamento dei dati",
      "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "legalEntityLabel": "Entità legale",
      "companyNumLabel": "Reg",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sezione 2",
      "title": "2. Categorie di informazioni raccolte",
      "desc": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati.",
      "cards": [
        {
          "title": "Nessuna vendita di dati",
          "desc": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati."
        },
        {
          "title": "Trasparenza sui cookie",
          "desc": "Informativa chiara sui cookie di referral e partner come Registered Agents Inc."
        },
        {
          "title": "Crittografia di livello enterprise",
          "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma."
        },
        {
          "title": "Controllo GDPR completo",
          "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento."
        }
      ]
    },
    "section3": {
      "secBadge": "Sezione 3 • Relazioni con terze parti",
      "title": "3. Link di terze parti e affiliati",
      "badge": "Conforme FTC",
      "desc": "Informativa chiara sui cookie di referral e partner come Registered Agents Inc.",
      "rulesTitle": "3. Link di terze parti e affiliati",
      "bullets": [
        "Informativa chiara sui cookie di referral e partner come Registered Agents Inc.",
        "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
        "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati.",
        "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma."
      ]
    },
    "section4": {
      "secBadge": "Sezione 4",
      "title": "4. Base giuridica e utilizzo dei dati",
      "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        }
      ]
    },
    "section5": {
      "secBadge": "Sezione 5",
      "title": "5. Cookie e tecnologie di tracciamento",
      "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Informativa chiara sui cookie di referral e partner come Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati."
        }
      ]
    },
    "section6": {
      "secBadge": "Sezione 6",
      "title": "6. Sicurezza e conservazione dei dati",
      "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Giurisdizione: Inghilterra e Galles"
    },
    "section7": {
      "secBadge": "Sezione 7",
      "title": "7. I tuoi diritti legali (GDPR)",
      "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento."
        },
        {
          "title": "Right to Rectification",
          "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        },
        {
          "title": "Right to Erasure",
          "desc": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati."
        },
        {
          "title": "Right to Restriction",
          "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        },
        {
          "title": "Right to Portability",
          "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma."
        },
        {
          "title": "Right to Object",
          "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Eliminazione account"
      }
    },
    "section8": {
      "secBadge": "Sezione 8",
      "title": "8. Richieste sulla privacy e autorità",
      "desc": "Richieste relative a licenze della piattaforma, partnership commerciali o proprietà intellettuale.",
      "emailLabel": "Hai bisogno di chiarimenti legali?",
      "btn": "Contatta l'ufficio legale",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "pt": {
    "isRtl": false,
    "badge": "Termos oficiais e contrato do usuário",
    "heroTitleLine1": "Termos de serviço e",
    "heroTitleLine2": "Contrato do usuário",
    "heroSub": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
    "entityLabel": "Entidade legal: Safi International Capital LTD",
    "regLabel": "Reg: 17063286 (Reino Unido)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Zero venda de dados",
        "desc": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados.",
        "badge": "Padrão garantido"
      },
      {
        "title": "Transparência de afiliados",
        "desc": "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Criptografia corporativa",
        "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados.",
        "badge": "Guarda criptográfica"
      },
      {
        "title": "Controle total do GDPR",
        "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento.",
        "badge": "Direitos estatutários"
      }
    ],
    "tocTitle": "Índice de navegação",
    "tocCount": "8 artigos",
    "sections": [
      {
        "id": "controller",
        "title": "1. Controlador de dados e entidade"
      },
      {
        "id": "collection",
        "title": "2. Categorias de informações coletadas"
      },
      {
        "id": "affiliates",
        "title": "3. Links de terceiros e afiliados",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Base legal e uso de dados"
      },
      {
        "id": "cookies",
        "title": "5. Cookies e tecnologias de rastreamento"
      },
      {
        "id": "security",
        "title": "6. Segurança e armazenamento de dados"
      },
      {
        "id": "rights",
        "title": "7. Seus direitos legais (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Consultas de privacidade e autoridade"
      }
    ],
    "legalHelp": {
      "title": "Precisa de esclarecimento jurídico?",
      "desc": "Consultas sobre licenciamento da plataforma, parcerias comerciais ou propriedade intelectual.",
      "btn": "Contatar departamento jurídico"
    },
    "section1": {
      "secBadge": "Seção 1",
      "title": "1. Controlador de dados e entidade",
      "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "legalEntityLabel": "Entidade legal",
      "companyNumLabel": "Reg",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Seção 2",
      "title": "2. Categorias de informações coletadas",
      "desc": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados.",
      "cards": [
        {
          "title": "Zero venda de dados",
          "desc": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados."
        },
        {
          "title": "Transparência de afiliados",
          "desc": "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc."
        },
        {
          "title": "Criptografia corporativa",
          "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados."
        },
        {
          "title": "Controle total do GDPR",
          "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento."
        }
      ]
    },
    "section3": {
      "secBadge": "Seção 3 • Relações com terceiros",
      "title": "3. Links de terceiros e afiliados",
      "badge": "Conforme FTC",
      "desc": "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc.",
      "rulesTitle": "3. Links de terceiros e afiliados",
      "bullets": [
        "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc.",
        "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
        "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados.",
        "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados."
      ]
    },
    "section4": {
      "secBadge": "Seção 4",
      "title": "4. Base legal e uso de dados",
      "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        }
      ]
    },
    "section5": {
      "secBadge": "Seção 5",
      "title": "5. Cookies e tecnologias de rastreamento",
      "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados."
        }
      ]
    },
    "section6": {
      "secBadge": "Seção 6",
      "title": "6. Segurança e armazenamento de dados",
      "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Jurisdição: Inglaterra e País de Gales"
    },
    "section7": {
      "secBadge": "Seção 7",
      "title": "7. Seus direitos legais (GDPR)",
      "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento."
        },
        {
          "title": "Right to Rectification",
          "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        },
        {
          "title": "Right to Erasure",
          "desc": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados."
        },
        {
          "title": "Right to Restriction",
          "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        },
        {
          "title": "Right to Portability",
          "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados."
        },
        {
          "title": "Right to Object",
          "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Exclusão de conta"
      }
    },
    "section8": {
      "secBadge": "Seção 8",
      "title": "8. Consultas de privacidade e autoridade",
      "desc": "Consultas sobre licenciamento da plataforma, parcerias comerciais ou propriedade intelectual.",
      "emailLabel": "Precisa de esclarecimento jurídico?",
      "btn": "Contatar departamento jurídico",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ja": {
    "isRtl": false,
    "badge": "公式利用規約およびユーザー同意書",
    "heroTitleLine1": "利用規約および",
    "heroTitleLine2": "ユーザー合意契約",
    "heroSub": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
    "entityLabel": "運営法人: Safi International Capital LTD",
    "regLabel": "英国登録番号: 17063286",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "個人データの売買一切禁止",
        "desc": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。",
        "badge": "保証基準"
      },
      {
        "title": "アフィリエイトCookieの透明性",
        "desc": "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。",
        "badge": "FTC基準準拠"
      },
      {
        "title": "エンタープライズ級の暗号化",
        "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。",
        "badge": "暗号化保護"
      },
      {
        "title": "完全なGDPR権利保障",
        "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。",
        "badge": "法定権利"
      }
    ],
    "tocTitle": "目次ナビゲーション",
    "tocCount": "8 Sections",
    "sections": [
      {
        "id": "controller",
        "title": "1. データ管理者および運営組織"
      },
      {
        "id": "collection",
        "title": "2. 収集する個人情報の分類と項目"
      },
      {
        "id": "affiliates",
        "title": "3. 第三者リンクおよびアフィリエイト開示",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. 適法な処理根拠および利用目的"
      },
      {
        "id": "cookies",
        "title": "5. Cookieおよびトラッキング技術の管理"
      },
      {
        "id": "security",
        "title": "6. データセキュリティおよび保管基準"
      },
      {
        "id": "rights",
        "title": "7. 利用者の法的権利（GDPR等）および削除"
      },
      {
        "id": "contact",
        "title": "8. プライバシー窓口および監督機関"
      }
    ],
    "legalHelp": {
      "title": "法的なご質問・ご確認ですか？",
      "desc": "プラットフォームのライセンス、事業提携、知的財産権に関する正式なお問い合わせ。",
      "btn": "法務・コンプライアンス部門へ連絡"
    },
    "section1": {
      "secBadge": "第 1",
      "title": "1. データ管理者および運営組織",
      "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "legalEntityLabel": "運営法人",
      "companyNumLabel": "英国登録番号",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第 2",
      "title": "2. 収集する個人情報の分類と項目",
      "desc": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。",
      "cards": [
        {
          "title": "個人データの売買一切禁止",
          "desc": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。"
        },
        {
          "title": "アフィリエイトCookieの透明性",
          "desc": "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。"
        },
        {
          "title": "エンタープライズ級の暗号化",
          "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。"
        },
        {
          "title": "完全なGDPR権利保障",
          "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。"
        }
      ]
    },
    "section3": {
      "secBadge": "第 3 • 第三者提携関係",
      "title": "3. 第三者リンクおよびアフィリエイト開示",
      "badge": "FTC基準準拠",
      "desc": "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。",
      "rulesTitle": "3. 第三者リンクおよびアフィリエイト開示",
      "bullets": [
        "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。",
        "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
        "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。",
        "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。"
      ]
    },
    "section4": {
      "secBadge": "第 4",
      "title": "4. 適法な処理根拠および利用目的",
      "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。"
        },
        {
          "title": "Legitimate Interests:",
          "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。"
        },
        {
          "title": "Statutory Obligations:",
          "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        }
      ]
    },
    "section5": {
      "secBadge": "第 5",
      "title": "5. Cookieおよびトラッキング技術の管理",
      "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        },
        {
          "lead": "Personalized Ads:",
          "text": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。"
        }
      ]
    },
    "section6": {
      "secBadge": "第 6",
      "title": "6. データセキュリティおよび保管基準",
      "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "管轄区域: イングランドおよびウェールズ"
    },
    "section7": {
      "secBadge": "第 7",
      "title": "7. 利用者の法的権利（GDPR等）および削除",
      "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。"
        },
        {
          "title": "Right to Rectification",
          "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        },
        {
          "title": "Right to Erasure",
          "desc": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。"
        },
        {
          "title": "Right to Restriction",
          "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        },
        {
          "title": "Right to Portability",
          "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。"
        },
        {
          "title": "Right to Object",
          "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。"
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "アカウント削除申請"
      }
    },
    "section8": {
      "secBadge": "第 8",
      "title": "8. プライバシー窓口および監督機関",
      "desc": "プラットフォームのライセンス、事業提携、知的財産権に関する正式なお問い合わせ。",
      "emailLabel": "法的なご質問・ご確認ですか？",
      "btn": "法務・コンプライアンス部門へ連絡",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "ko": {
    "isRtl": false,
    "badge": "공식 이용약관 및 사용자 계약",
    "heroTitleLine1": "서비스 이용약관 및",
    "heroTitleLine2": "사용자 동의 계약",
    "heroSub": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
    "entityLabel": "운영 법인: Safi International Capital LTD",
    "regLabel": "법인 등록번호: 17063286 (영국)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "개인정보 매매 절대 금지",
        "desc": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다.",
        "badge": "보증된 보안 표준"
      },
      {
        "title": "제휴 쿠키의 투명한 운영",
        "desc": "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다.",
        "badge": "FTC 규정 준수"
      },
      {
        "title": "엔터프라이즈급 암호화",
        "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다.",
        "badge": "암호화 가드"
      },
      {
        "title": "완벽한 GDPR 권리 보장",
        "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다.",
        "badge": "법적 권리"
      }
    ],
    "tocTitle": "내비게이션 목차",
    "tocCount": "8 법률",
    "sections": [
      {
        "id": "controller",
        "title": "1. 개인정보 처리자 및 법인 개요"
      },
      {
        "id": "collection",
        "title": "2. 수집하는 개인정보 항목 및 범주"
      },
      {
        "id": "affiliates",
        "title": "3. 제3자 링크 및 제휴 파트너 고지",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. 정보 처리의 적법한 근거 및 목적"
      },
      {
        "id": "cookies",
        "title": "5. 쿠키 및 추적 기술 운영 정책"
      },
      {
        "id": "security",
        "title": "6. 데이터 보안 조치 및 보관 기간"
      },
      {
        "id": "rights",
        "title": "7. 정보주체의 법적 권리 및 삭제 신청"
      },
      {
        "id": "contact",
        "title": "8. 개인정보 보호 문의 및 감독 기구"
      }
    ],
    "legalHelp": {
      "title": "법적 문의사항이 있으신가요?",
      "desc": "플랫폼 라이선스, 기업 파트너십 또는 지적 재산권에 관한 공식 문의.",
      "btn": "법무팀에 문의하기"
    },
    "section1": {
      "secBadge": "제 1",
      "title": "1. 개인정보 처리자 및 법인 개요",
      "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "legalEntityLabel": "운영 법인",
      "companyNumLabel": "법인 등록번호",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "제 2",
      "title": "2. 수집하는 개인정보 항목 및 범주",
      "desc": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다.",
      "cards": [
        {
          "title": "개인정보 매매 절대 금지",
          "desc": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다."
        },
        {
          "title": "제휴 쿠키의 투명한 운영",
          "desc": "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다."
        },
        {
          "title": "엔터프라이즈급 암호화",
          "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다."
        },
        {
          "title": "완벽한 GDPR 권리 보장",
          "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다."
        }
      ]
    },
    "section3": {
      "secBadge": "제 3 • 제3자 서비스 관계",
      "title": "3. 제3자 링크 및 제휴 파트너 고지",
      "badge": "FTC 규정 준수",
      "desc": "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다.",
      "rulesTitle": "3. 제3자 링크 및 제휴 파트너 고지",
      "bullets": [
        "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다.",
        "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
        "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다.",
        "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다."
      ]
    },
    "section4": {
      "secBadge": "제 4",
      "title": "4. 정보 처리의 적법한 근거 및 목적",
      "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        }
      ]
    },
    "section5": {
      "secBadge": "제 5",
      "title": "5. 쿠키 및 추적 기술 운영 정책",
      "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        },
        {
          "lead": "Personalized Ads:",
          "text": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다."
        }
      ]
    },
    "section6": {
      "secBadge": "제 6",
      "title": "6. 데이터 보안 조치 및 보관 기간",
      "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "관할 법원: 잉글랜드 및 웨일스"
    },
    "section7": {
      "secBadge": "제 7",
      "title": "7. 정보주체의 법적 권리 및 삭제 신청",
      "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다."
        },
        {
          "title": "Right to Rectification",
          "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        },
        {
          "title": "Right to Erasure",
          "desc": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다."
        },
        {
          "title": "Right to Restriction",
          "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        },
        {
          "title": "Right to Portability",
          "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다."
        },
        {
          "title": "Right to Object",
          "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "계정 영구 삭제"
      }
    },
    "section8": {
      "secBadge": "제 8",
      "title": "8. 개인정보 보호 문의 및 감독 기구",
      "desc": "플랫폼 라이선스, 기업 파트너십 또는 지적 재산권에 관한 공식 문의.",
      "emailLabel": "법적 문의사항이 있으신가요?",
      "btn": "법무팀에 문의하기",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "nl": {
    "isRtl": false,
    "badge": "Officiële voorwaarden & gebruikersovereenkomst",
    "heroTitleLine1": "Servicevoorwaarden &",
    "heroTitleLine2": "Gebruikersovereenkomst",
    "heroSub": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
    "entityLabel": "Rechtsentiteit: Safi International Capital LTD",
    "regLabel": "Reg. nr.: 17063286 (VK)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Geen gegevensverkoop",
        "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren.",
        "badge": "Gegarandeerde standaard"
      },
      {
        "title": "Affiliate-transparantie",
        "desc": "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc.",
        "badge": "FTC-conform"
      },
      {
        "title": "Enterprise encryptie",
        "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata.",
        "badge": "Cryptografische bescherming"
      },
      {
        "title": "Volledige AVG-controle",
        "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens.",
        "badge": "Wettelijke rechten"
      }
    ],
    "tocTitle": "Navigatie-index",
    "tocCount": "8 juridische",
    "sections": [
      {
        "id": "controller",
        "title": "1. Gegevensverantwoordelijke & entiteit"
      },
      {
        "id": "collection",
        "title": "2. Categorieën van verzamelde gegevens"
      },
      {
        "id": "affiliates",
        "title": "3. Externe links & partners",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Wettelijke grondslag & gebruik van data"
      },
      {
        "id": "cookies",
        "title": "5. Cookies & trackingtechnologieën"
      },
      {
        "id": "security",
        "title": "6. Beveiliging & gegevensopslag"
      },
      {
        "id": "rights",
        "title": "7. Uw wettelijke rechten (AVG)"
      },
      {
        "id": "contact",
        "title": "8. Privacyverzoeken & toezichthouder"
      }
    ],
    "legalHelp": {
      "title": "Juridische verduidelijking nodig?",
      "desc": "Vragen over platformlicenties, zakelijke partnerschappen of intellectueel eigendom.",
      "btn": "Contact opnemen met juridische afdeling"
    },
    "section1": {
      "secBadge": "Artikel 1",
      "title": "1. Gegevensverantwoordelijke & entiteit",
      "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "legalEntityLabel": "Rechtsentiteit",
      "companyNumLabel": "Reg. nr.",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Artikel 2",
      "title": "2. Categorieën van verzamelde gegevens",
      "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren.",
      "cards": [
        {
          "title": "Geen gegevensverkoop",
          "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren."
        },
        {
          "title": "Affiliate-transparantie",
          "desc": "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc."
        },
        {
          "title": "Enterprise encryptie",
          "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata."
        },
        {
          "title": "Volledige AVG-controle",
          "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens."
        }
      ]
    },
    "section3": {
      "secBadge": "Artikel 3 • Derdenrelaties",
      "title": "3. Externe links & partners",
      "badge": "FTC-conform",
      "desc": "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc.",
      "rulesTitle": "3. Externe links & partners",
      "bullets": [
        "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc.",
        "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
        "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren.",
        "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata."
      ]
    },
    "section4": {
      "secBadge": "Artikel 4",
      "title": "4. Wettelijke grondslag & gebruik van data",
      "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        }
      ]
    },
    "section5": {
      "secBadge": "Artikel 5",
      "title": "5. Cookies & trackingtechnologieën",
      "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren."
        }
      ]
    },
    "section6": {
      "secBadge": "Artikel 6",
      "title": "6. Beveiliging & gegevensopslag",
      "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Jurisdictie: Engeland & Wales"
    },
    "section7": {
      "secBadge": "Artikel 7",
      "title": "7. Uw wettelijke rechten (AVG)",
      "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens."
        },
        {
          "title": "Right to Rectification",
          "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        },
        {
          "title": "Right to Erasure",
          "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren."
        },
        {
          "title": "Right to Restriction",
          "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        },
        {
          "title": "Right to Portability",
          "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata."
        },
        {
          "title": "Right to Object",
          "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Account verwijderen"
      }
    },
    "section8": {
      "secBadge": "Artikel 8",
      "title": "8. Privacyverzoeken & toezichthouder",
      "desc": "Vragen over platformlicenties, zakelijke partnerschappen of intellectueel eigendom.",
      "emailLabel": "Juridische verduidelijking nodig?",
      "btn": "Contact opnemen met juridische afdeling",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "uz": {
    "isRtl": false,
    "badge": "Rasmiy shartlar va foydalanuvchi shartnomasi",
    "heroTitleLine1": "Xizmat ko‘rsatish shartlari va",
    "heroTitleLine2": "Foydalanuvchi shartnomasi",
    "heroSub": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
    "entityLabel": "Yuridik shaxs: Safi International Capital LTD",
    "regLabel": "Ro‘yxat raqami: 17063286 (Buyuk Britaniya)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Ma’lumotlar sotilmaydi",
        "desc": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz.",
        "badge": "Kafolatlangan standart"
      },
      {
        "title": "Cookie fayllari shaffofligi",
        "desc": "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot.",
        "badge": "FTC talablariga mos"
      },
      {
        "title": "Kuchli shifrlash",
        "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash.",
        "badge": "Kriptografik himoya"
      },
      {
        "title": "To‘liq GDPR nazorati",
        "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi.",
        "badge": "Qonuniy huquqlar"
      }
    ],
    "tocTitle": "Mundarija",
    "tocCount": "8 ta",
    "sections": [
      {
        "id": "controller",
        "title": "1. Ma’lumotlar nazoratchisi va yuridik shaxs"
      },
      {
        "id": "collection",
        "title": "2. To‘planadigan ma’lumotlar toifalari"
      },
      {
        "id": "affiliates",
        "title": "3. Uchinchi tomon havolalari va hamkorlar",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Ma’lumotlardan foydalanishning qonuniy asoslari"
      },
      {
        "id": "cookies",
        "title": "5. Cookie fayllari va kuzatuv texnologiyalari"
      },
      {
        "id": "security",
        "title": "6. Ma’lumotlar xavfsizligi va saqlash"
      },
      {
        "id": "rights",
        "title": "7. Sizning qonuniy huquqlaringiz"
      },
      {
        "id": "contact",
        "title": "8. Maxfiylik bo‘yicha so‘rovlar"
      }
    ],
    "legalHelp": {
      "title": "Huquqiy tushuntirish kerakmi?",
      "desc": "Litsenziyalash, tijoriy hamkorlik yoki intellektual mulk huquqlari bo‘yicha so‘rovlar.",
      "btn": "Yuridik bo‘lim bilan bog‘lanish"
    },
    "section1": {
      "secBadge": "Modda 1",
      "title": "1. Ma’lumotlar nazoratchisi va yuridik shaxs",
      "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "legalEntityLabel": "Yuridik shaxs",
      "companyNumLabel": "Ro‘yxat raqami",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Modda 2",
      "title": "2. To‘planadigan ma’lumotlar toifalari",
      "desc": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz.",
      "cards": [
        {
          "title": "Ma’lumotlar sotilmaydi",
          "desc": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz."
        },
        {
          "title": "Cookie fayllari shaffofligi",
          "desc": "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot."
        },
        {
          "title": "Kuchli shifrlash",
          "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash."
        },
        {
          "title": "To‘liq GDPR nazorati",
          "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi."
        }
      ]
    },
    "section3": {
      "secBadge": "Modda 3 • Uchinchi tomon munosabatlari",
      "title": "3. Uchinchi tomon havolalari va hamkorlar",
      "badge": "FTC talablariga mos",
      "desc": "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot.",
      "rulesTitle": "3. Uchinchi tomon havolalari va hamkorlar",
      "bullets": [
        "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot.",
        "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
        "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz.",
        "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash."
      ]
    },
    "section4": {
      "secBadge": "Modda 4",
      "title": "4. Ma’lumotlardan foydalanishning qonuniy asoslari",
      "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        }
      ]
    },
    "section5": {
      "secBadge": "Modda 5",
      "title": "5. Cookie fayllari va kuzatuv texnologiyalari",
      "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz."
        }
      ]
    },
    "section6": {
      "secBadge": "Modda 6",
      "title": "6. Ma’lumotlar xavfsizligi va saqlash",
      "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Yurisdiksiya: Angliya va Uels"
    },
    "section7": {
      "secBadge": "Modda 7",
      "title": "7. Sizning qonuniy huquqlaringiz",
      "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi."
        },
        {
          "title": "Right to Rectification",
          "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        },
        {
          "title": "Right to Erasure",
          "desc": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz."
        },
        {
          "title": "Right to Restriction",
          "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        },
        {
          "title": "Right to Portability",
          "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash."
        },
        {
          "title": "Right to Object",
          "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Hisobni o‘chirish"
      }
    },
    "section8": {
      "secBadge": "Modda 8",
      "title": "8. Maxfiylik bo‘yicha so‘rovlar",
      "desc": "Litsenziyalash, tijoriy hamkorlik yoki intellektual mulk huquqlari bo‘yicha so‘rovlar.",
      "emailLabel": "Huquqiy tushuntirish kerakmi?",
      "btn": "Yuridik bo‘lim bilan bog‘lanish",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  },
  "id": {
    "isRtl": false,
    "badge": "Syarat Resmi & Perjanjian Pengguna",
    "heroTitleLine1": "Ketentuan Layanan &",
    "heroTitleLine2": "Perjanjian Pengguna",
    "heroSub": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
    "entityLabel": "Entitas Hukum: Safi International Capital LTD",
    "regLabel": "No. Registrasi: 17063286 (Inggris Raya)",
    "lawLabel": "UK GDPR & DPA 2018",
    "highlights": [
      {
        "title": "Data Tidak Dijual",
        "desc": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data.",
        "badge": "Standar Terjamin"
      },
      {
        "title": "Transparansi Cookie Afiliasi",
        "desc": "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc.",
        "badge": "Sesuai Aturan FTC"
      },
      {
        "title": "Enkripsi Tingkat Enterprise",
        "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform.",
        "badge": "Pelindung Kriptografi"
      },
      {
        "title": "Kontrol Penuh Sesuai GDPR",
        "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja.",
        "badge": "Hak Hukum"
      }
    ],
    "tocTitle": "Indeks Navigasi",
    "tocCount": "8 Pasal",
    "sections": [
      {
        "id": "controller",
        "title": "1. Pengendali Data & Entitas Hukum"
      },
      {
        "id": "collection",
        "title": "2. Kategori Informasi yang Kami Kumpulkan"
      },
      {
        "id": "affiliates",
        "title": "3. Tautan Pihak Ketiga & Afiliasi",
        "isHighlight": true
      },
      {
        "id": "usage",
        "title": "4. Dasar Hukum & Penggunaan Data"
      },
      {
        "id": "cookies",
        "title": "5. Cookie & Teknologi Pelacakan"
      },
      {
        "id": "security",
        "title": "6. Keamanan & Penyimpanan Data"
      },
      {
        "id": "rights",
        "title": "7. Hak Hukum Anda (GDPR)"
      },
      {
        "id": "contact",
        "title": "8. Pertanyaan Privasi & Otoritas Pengawas"
      }
    ],
    "legalHelp": {
      "title": "Butuh Klarifikasi Hukum?",
      "desc": "Pertanyaan mengenai lisensi platform, kemitraan komersial, atau hak kekayaan intelektual.",
      "btn": "Hubungi Departemen Hukum"
    },
    "section1": {
      "secBadge": "Pasal 1",
      "title": "1. Pengendali Data & Entitas Hukum",
      "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "legalEntityLabel": "Entitas Hukum",
      "companyNumLabel": "No. Registrasi",
      "hqLabel": "Headquarters Address",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Pasal 2",
      "title": "2. Kategori Informasi yang Kami Kumpulkan",
      "desc": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data.",
      "cards": [
        {
          "title": "Data Tidak Dijual",
          "desc": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data."
        },
        {
          "title": "Transparansi Cookie Afiliasi",
          "desc": "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc."
        },
        {
          "title": "Enkripsi Tingkat Enterprise",
          "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform."
        },
        {
          "title": "Kontrol Penuh Sesuai GDPR",
          "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja."
        }
      ]
    },
    "section3": {
      "secBadge": "Pasal 3 • Hubungan Pihak Ketiga",
      "title": "3. Tautan Pihak Ketiga & Afiliasi",
      "badge": "Sesuai Aturan FTC",
      "desc": "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc.",
      "rulesTitle": "3. Tautan Pihak Ketiga & Afiliasi",
      "bullets": [
        "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc.",
        "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
        "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data.",
        "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform."
      ]
    },
    "section4": {
      "secBadge": "Pasal 4",
      "title": "4. Dasar Hukum & Penggunaan Data",
      "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "items": [
        {
          "title": "Contractual Fulfillment:",
          "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform."
        },
        {
          "title": "Legitimate Interests:",
          "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja."
        },
        {
          "title": "Statutory Obligations:",
          "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        }
      ]
    },
    "section5": {
      "secBadge": "Pasal 5",
      "title": "5. Cookie & Teknologi Pelacakan",
      "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "cookies": [
        {
          "title": "Strictly Necessary Cookies",
          "desc": "Authentication & security.",
          "badge": "Always Active"
        },
        {
          "title": "Performance & Metrics",
          "desc": "Lesson loading performance.",
          "badge": "Configurable"
        },
        {
          "title": "Affiliate & Referral Cookies",
          "desc": "Set upon clicking partner links.",
          "badge": "Outbound Only"
        },
        {
          "title": "Google AdSense Advertising Cookies",
          "desc": "Relevant ad delivery by Google.",
          "badge": "Third-Party"
        }
      ],
      "adHeading": "Google AdSense Compliance",
      "adIntro": "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc.",
      "adBullets": [
        {
          "lead": "Third-Party Vendors:",
          "text": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        },
        {
          "lead": "Personalized Ads:",
          "text": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data."
        }
      ]
    },
    "section6": {
      "secBadge": "Pasal 6",
      "title": "6. Keamanan & Penyimpanan Data",
      "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform.",
      "retentionTitle": "Data Retention Period:",
      "retentionDesc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "transfersTitle": "International Transfers:",
      "transfersDesc": "Yurisdiksi: Inggris & Wales"
    },
    "section7": {
      "secBadge": "Pasal 7",
      "title": "7. Hak Hukum Anda (GDPR)",
      "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja.",
      "rights": [
        {
          "title": "Right of Access",
          "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja."
        },
        {
          "title": "Right to Rectification",
          "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        },
        {
          "title": "Right to Erasure",
          "desc": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data."
        },
        {
          "title": "Right to Restriction",
          "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        },
        {
          "title": "Right to Portability",
          "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform."
        },
        {
          "title": "Right to Object",
          "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja."
        }
      ],
      "deletionBox": {
        "title": "Need to permanently delete your account & erase your data?",
        "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
        "btn": "Penghapusan Akun"
      }
    },
    "section8": {
      "secBadge": "Pasal 8",
      "title": "8. Pertanyaan Privasi & Otoritas Pengawas",
      "desc": "Pertanyaan mengenai lisensi platform, kemitraan komersial, atau hak kekayaan intelektual.",
      "emailLabel": "Butuh Klarifikasi Hukum?",
      "btn": "Hubungi Departemen Hukum",
      "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
    }
  }
};

export function getPrivacyTranslation(locale: string): PrivacyTranslation {
  const norm = (locale || "en").toLowerCase();
  return privacyTranslations[norm] || privacyTranslations.en;
}
