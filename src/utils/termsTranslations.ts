// ============================================================================
// TERMS OF SERVICE TRANSLATIONS (19 OFFICIAL LANGUAGES)
// ============================================================================

export interface TermsSectionItem {
  id: string;
  title: string;
  isWarning?: boolean;
  isHighlight?: boolean;
}

export interface TermsHighlightItem {
  title: string;
  desc: string;
  badge: string;
}

export interface TermsTranslation {
  isRtl: boolean;
  badge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSub: string;
  entityLabel: string;
  regLabel: string;
  jurisdictionLabel: string;
  highlights: TermsHighlightItem[];
  tocTitle: string;
  tocCount: string;
  sections: TermsSectionItem[];
  legalHelp: {
    title: string;
    desc: string;
    btn: string;
  };
  section1: {
    secBadge: string;
    title: string;
    desc: string;
    opEntityLabel: string;
    companyNumLabel: string;
    hqLabel: string;
    hqValue: string;
  };
  section2: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section3: {
    secBadge: string;
    title: string;
    alert: string;
    bullets: string[];
  };
  section4: {
    secBadge: string;
    title: string;
    badge: string;
    p1: string;
    rulesTitle: string;
    rulesBullets: { lead: string; text: string }[];
    adTitle: string;
    adBullets: { lead: string; text: string }[];
  };
  section5: {
    secBadge: string;
    title: string;
    p1: string;
    rulesTitle: string;
    rulesDesc: string;
  };
  section6: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section7: {
    secBadge: string;
    title: string;
    p1: string;
    policyTitle: string;
    policyDesc: string;
  };
  section8: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section9: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section10: {
    secBadge: string;
    title: string;
    p1: string;
    emailLabel: string;
    btn: string;
    relatedTitle: string;
    privacyPolicy: string;
    contactUs: string;
    deleteAccount: string;
  };
}

export const termsTranslations: Record<string, TermsTranslation> = {
  "en": {
    "isRtl": false,
    "badge": "Official Terms & User Agreement",
    "heroTitleLine1": "Terms of Service &",
    "heroTitleLine2": "User Agreement",
    "heroSub": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
    "entityLabel": "Entity: Safi International Capital LTD",
    "regLabel": "Reg: 17063286 (UK)",
    "jurisdictionLabel": "Jurisdiction: England & Wales",
    "highlights": [
      {
        "title": "Strictly Educational",
        "desc": "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
        "badge": "Crucial Notice"
      },
      {
        "title": "Affiliate Transparency",
        "desc": "Disclosing independent referral partnerships with providers like Registered Agents Inc.",
        "badge": "FTC Compliant"
      },
      {
        "title": "Protected Academy IP",
        "desc": "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.",
        "badge": "Protected Assets"
      },
      {
        "title": "Fair Gamification",
        "desc": "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.",
        "badge": "Ecosystem Rules"
      }
    ],
    "tocTitle": "Navigation Index",
    "tocCount": "10 Legal Articles",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Acceptance of Terms"
      },
      {
        "id": "scope",
        "title": "2. Nature of Services"
      },
      {
        "id": "disclaimer",
        "title": "3. No Legal/Tax Advice",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Third-Party & Affiliates",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Accounts & Gamification"
      },
      {
        "id": "ip",
        "title": "6. Intellectual Property"
      },
      {
        "id": "payments",
        "title": "7. Payments & Subscriptions"
      },
      {
        "id": "liability",
        "title": "8. Limitation of Liability"
      },
      {
        "id": "governing-law",
        "title": "9. Governing Law & Courts"
      },
      {
        "id": "contact",
        "title": "10. Legal Inquiries"
      }
    ],
    "legalHelp": {
      "title": "Need Legal Clarification?",
      "desc": "Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.",
      "btn": "Contact Legal Department"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Acceptance of Terms",
      "desc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "opEntityLabel": "Entity",
      "companyNumLabel": "Reg",
      "hqLabel": "Headquarters",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Nature of Services",
      "p1": "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
      "p2": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
    },
    "section3": {
      "secBadge": "Section 3 • Essential Disclaimer",
      "title": "3. No Legal/Tax Advice",
      "alert": "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
      "bullets": [
        "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
        "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
        "Disclosing independent referral partnerships with providers like Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Section 4 • Third-Party Relations",
      "title": "4. Third-Party & Affiliates",
      "badge": "FTC Compliant",
      "p1": "Disclosing independent referral partnerships with providers like Registered Agents Inc.",
      "rulesTitle": "4. Third-Party & Affiliates",
      "rulesBullets": [
        {
          "lead": "FTC Compliant:",
          "text": "Disclosing independent referral partnerships with providers like Registered Agents Inc."
        },
        {
          "lead": "Third-Party Relations:",
          "text": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Disclosing independent referral partnerships with providers like Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "5. Accounts & Gamification",
      "p1": "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.",
      "rulesTitle": "Fair Gamification",
      "rulesDesc": "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots."
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "6. Intellectual Property",
      "p1": "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.",
      "p2": "All video curriculum, source repositories, and course syllabi remain strictly copyrighted."
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "7. Payments & Subscriptions",
      "p1": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "policyTitle": "7. Payments & Subscriptions",
      "policyDesc": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "8. Limitation of Liability",
      "p1": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
      "p2": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully."
    },
    "section9": {
      "secBadge": "Section 9",
      "title": "9. Governing Law & Courts",
      "p1": "Jurisdiction: England & Wales",
      "p2": "Jurisdiction: England & Wales"
    },
    "section10": {
      "secBadge": "Section 10",
      "title": "10. Legal Inquiries",
      "p1": "Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.",
      "emailLabel": "Need Legal Clarification?",
      "btn": "Contact Legal Department",
      "relatedTitle": "Related Documents:",
      "privacyPolicy": "Privacy Policy",
      "contactUs": "Contact Us",
      "deleteAccount": "Account Deletion"
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
    "jurisdictionLabel": "حوزه قضایی: انگلستان و ولز",
    "highlights": [
      {
        "title": "کاملاً آموزشی و مهارتی",
        "desc": "دوره‌ها و راهنماهای تاسیس شرکت به هیچ وجه مشاوره رسمی حقوقی، مالیاتی یا حسابداری نیستند.",
        "badge": "اخطار حیاتی"
      },
      {
        "title": "شفافیت کامل در همکاری",
        "desc": "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc.",
        "badge": "منطبق با قوانین FTC"
      },
      {
        "title": "حفاظت از مالکیت معنوی",
        "desc": "تمامی ویدیوها، مخازن سورس‌کد و سرفصل‌های آموزشی تحت قوانین کپی‌رایت بین‌المللی هستند.",
        "badge": "دارایی‌های محافظت‌شده"
      },
      {
        "title": "عدالت در رتبه‌بندی",
        "desc": "امتیازات و رتبه‌بندی تالار افتخارات ارزش آکادمیک دارند و در برابر ربات‌ها ایمن هستند.",
        "badge": "قوانین زیست‌بوم"
      }
    ],
    "tocTitle": "فهرست دسترسی",
    "tocCount": "۱۰ ماده حقوقی",
    "sections": [
      {
        "id": "agreement",
        "title": "۱. پذیرش شرایط و نهاد حقوقی"
      },
      {
        "id": "scope",
        "title": "۲. ماهیت و دامنه خدمات"
      },
      {
        "id": "disclaimer",
        "title": "۳. سلب مسئولیت حقوقی/مالیاتی",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "۴. خدمات شخص ثالث و افشای همکاری",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "۵. حساب‌های کاربری و رتبه‌بندی"
      },
      {
        "id": "ip",
        "title": "۶. مالکیت معنوی و لایسنس"
      },
      {
        "id": "payments",
        "title": "۷. پرداخت‌ها و دسترسی دیجیتال"
      },
      {
        "id": "liability",
        "title": "۸. حدود مسئولیت و جبران خسارت"
      },
      {
        "id": "governing-law",
        "title": "۹. قوانین حاکم و دادگاه‌ها"
      },
      {
        "id": "contact",
        "title": "۱۰. مکاتبات و استعلامات حقوقی"
      }
    ],
    "legalHelp": {
      "title": "نیاز به شفاف‌سازی حقوقی دارید؟",
      "desc": "استعلامات مربوط به مجوز پلتفرم، همکاری‌های تجاری یا حقوق مالکیت معنوی.",
      "btn": "تماس با دپارتمان حقوقی"
    },
    "section1": {
      "secBadge": "ماده 1",
      "title": "۱. پذیرش شرایط و نهاد حقوقی",
      "desc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "opEntityLabel": "نهاد حقوقی",
      "companyNumLabel": "شماره ثبت",
      "hqLabel": "نهاد حقوقی",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "ماده 2",
      "title": "۲. ماهیت و دامنه خدمات",
      "p1": "دوره‌ها و راهنماهای تاسیس شرکت به هیچ وجه مشاوره رسمی حقوقی، مالیاتی یا حسابداری نیستند.",
      "p2": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
    },
    "section3": {
      "secBadge": "ماده 3 • سلب مسئولیت ضروری",
      "title": "۳. سلب مسئولیت حقوقی/مالیاتی",
      "alert": "دوره‌ها و راهنماهای تاسیس شرکت به هیچ وجه مشاوره رسمی حقوقی، مالیاتی یا حسابداری نیستند.",
      "bullets": [
        "دوره‌ها و راهنماهای تاسیس شرکت به هیچ وجه مشاوره رسمی حقوقی، مالیاتی یا حسابداری نیستند.",
        "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
        "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "ماده 4 • روابط شخص ثالث",
      "title": "۴. خدمات شخص ثالث و افشای همکاری",
      "badge": "منطبق با قوانین FTC",
      "p1": "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc.",
      "rulesTitle": "۴. خدمات شخص ثالث و افشای همکاری",
      "rulesBullets": [
        {
          "lead": "منطبق با قوانین FTC:",
          "text": "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc."
        },
        {
          "lead": "روابط شخص ثالث:",
          "text": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
        }
      ]
    },
    "section5": {
      "secBadge": "ماده 5",
      "title": "۵. حساب‌های کاربری و رتبه‌بندی",
      "p1": "امتیازات و رتبه‌بندی تالار افتخارات ارزش آکادمیک دارند و در برابر ربات‌ها ایمن هستند.",
      "rulesTitle": "عدالت در رتبه‌بندی",
      "rulesDesc": "امتیازات و رتبه‌بندی تالار افتخارات ارزش آکادمیک دارند و در برابر ربات‌ها ایمن هستند."
    },
    "section6": {
      "secBadge": "ماده 6",
      "title": "۶. مالکیت معنوی و لایسنس",
      "p1": "تمامی ویدیوها، مخازن سورس‌کد و سرفصل‌های آموزشی تحت قوانین کپی‌رایت بین‌المللی هستند.",
      "p2": "تمامی ویدیوها، مخازن سورس‌کد و سرفصل‌های آموزشی تحت قوانین کپی‌رایت بین‌المللی هستند."
    },
    "section7": {
      "secBadge": "ماده 7",
      "title": "۷. پرداخت‌ها و دسترسی دیجیتال",
      "p1": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "policyTitle": "۷. پرداخت‌ها و دسترسی دیجیتال",
      "policyDesc": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
    },
    "section8": {
      "secBadge": "ماده 8",
      "title": "۸. حدود مسئولیت و جبران خسارت",
      "p1": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید.",
      "p2": "این شرایط، دسترسی و استفاده شما از آکادمی صافی را کنترل می‌کند. لطفاً مقررات، سلب مسئولیت‌های آموزشی و افشاگری‌های همکاری را به دقت مطالعه فرمایید."
    },
    "section9": {
      "secBadge": "ماده 9",
      "title": "۹. قوانین حاکم و دادگاه‌ها",
      "p1": "حوزه قضایی: انگلستان و ولز",
      "p2": "حوزه قضایی: انگلستان و ولز"
    },
    "section10": {
      "secBadge": "ماده 10",
      "title": "۱۰. مکاتبات و استعلامات حقوقی",
      "p1": "استعلامات مربوط به مجوز پلتفرم، همکاری‌های تجاری یا حقوق مالکیت معنوی.",
      "emailLabel": "نیاز به شفاف‌سازی حقوقی دارید؟",
      "btn": "تماس با دپارتمان حقوقی",
      "relatedTitle": "اسناد مرتبط:",
      "privacyPolicy": "حریم خصوصی",
      "contactUs": "تماس با ما",
      "deleteAccount": "امحای حساب کاربری"
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
    "jurisdictionLabel": "قضايي ساحه: انګلستان او ویلز",
    "highlights": [
      {
        "title": "په بشپړه توګه تعلیمي",
        "desc": "د شرکتونو د جوړولو لارښوونې او کورسونه رسمي حقوقي یا مالیاتي مشوره نه ده.",
        "badge": "حیاتي خبرداری"
      },
      {
        "title": "د ملګرتیا روڼتیا",
        "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه.",
        "badge": "د FTC معیار"
      },
      {
        "title": "خوندي معنوي ملکیت",
        "desc": "ټول درسي ویډیوګانې، سرچینې کوډونه او نصابونه د کاپي رایټ تر بشپړ پوښښ لاندې دي.",
        "badge": "خوندي شتمنۍ"
      },
      {
        "title": "عادلانه سیالي",
        "desc": "د اکاډمۍ ټکي او د ویاړوال تالار رتبې اکاډمیک ارزښت لري او د بوټونو څخه خوندي دي.",
        "badge": "د سیستم اصول"
      }
    ],
    "tocTitle": "د محتوا لړلیک",
    "tocCount": "۱۰ حقوقي مادې",
    "sections": [
      {
        "id": "agreement",
        "title": "۱. د شرایطو منل او حقوقي اداره"
      },
      {
        "id": "scope",
        "title": "۲. د خدماتو ماهیت او ساحه"
      },
      {
        "id": "disclaimer",
        "title": "۳. قانوني او مالیاتي سلب مسؤلیت",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "۴. د دریمې ډلې خدمات او شفافیت",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "۵. کارن حسابونه او اکاډمیک ټکي"
      },
      {
        "id": "ip",
        "title": "۶. معنوي ملکیت او جواز"
      },
      {
        "id": "payments",
        "title": "۷. تادیات او ډیجیټل لاسرسی"
      },
      {
        "id": "liability",
        "title": "۸. د مسؤلیت محدودیت"
      },
      {
        "id": "governing-law",
        "title": "۹. حاکم قوانین او محکمې"
      },
      {
        "id": "contact",
        "title": "۱۰. رسمي حقوقي اړیکې"
      }
    ],
    "legalHelp": {
      "title": "حقوقي وضاحت ته اړتیا لرئ؟",
      "desc": "د لایسنس، سوداګریزو همکاریو یا د معنوي مالکیت حقوقو په اړه پوښتنې.",
      "btn": "له حقوقي څانګې سره اړیکه"
    },
    "section1": {
      "secBadge": "ماده 1",
      "title": "۱. د شرایطو منل او حقوقي اداره",
      "desc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "opEntityLabel": "حقوقي اداره",
      "companyNumLabel": "د ثبت شمیره",
      "hqLabel": "حقوقي اداره",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "ماده 2",
      "title": "۲. د خدماتو ماهیت او ساحه",
      "p1": "د شرکتونو د جوړولو لارښوونې او کورسونه رسمي حقوقي یا مالیاتي مشوره نه ده.",
      "p2": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
    },
    "section3": {
      "secBadge": "ماده 3 • اړین ردول",
      "title": "۳. قانوني او مالیاتي سلب مسؤلیت",
      "alert": "د شرکتونو د جوړولو لارښوونې او کورسونه رسمي حقوقي یا مالیاتي مشوره نه ده.",
      "bullets": [
        "د شرکتونو د جوړولو لارښوونې او کورسونه رسمي حقوقي یا مالیاتي مشوره نه ده.",
        "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
        "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه."
      ]
    },
    "section4": {
      "secBadge": "ماده 4 • د دریمې ډلې اړیکې",
      "title": "۴. د دریمې ډلې خدمات او شفافیت",
      "badge": "د FTC معیار",
      "p1": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه.",
      "rulesTitle": "۴. د دریمې ډلې خدمات او شفافیت",
      "rulesBullets": [
        {
          "lead": "د FTC معیار:",
          "text": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه."
        },
        {
          "lead": "د دریمې ډلې اړیکې:",
          "text": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه."
        },
        {
          "lead": "Compliance:",
          "text": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
        }
      ]
    },
    "section5": {
      "secBadge": "ماده 5",
      "title": "۵. کارن حسابونه او اکاډمیک ټکي",
      "p1": "د اکاډمۍ ټکي او د ویاړوال تالار رتبې اکاډمیک ارزښت لري او د بوټونو څخه خوندي دي.",
      "rulesTitle": "عادلانه سیالي",
      "rulesDesc": "د اکاډمۍ ټکي او د ویاړوال تالار رتبې اکاډمیک ارزښت لري او د بوټونو څخه خوندي دي."
    },
    "section6": {
      "secBadge": "ماده 6",
      "title": "۶. معنوي ملکیت او جواز",
      "p1": "ټول درسي ویډیوګانې، سرچینې کوډونه او نصابونه د کاپي رایټ تر بشپړ پوښښ لاندې دي.",
      "p2": "ټول درسي ویډیوګانې، سرچینې کوډونه او نصابونه د کاپي رایټ تر بشپړ پوښښ لاندې دي."
    },
    "section7": {
      "secBadge": "ماده 7",
      "title": "۷. تادیات او ډیجیټل لاسرسی",
      "p1": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "policyTitle": "۷. تادیات او ډیجیټل لاسرسی",
      "policyDesc": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
    },
    "section8": {
      "secBadge": "ماده 8",
      "title": "۸. د مسؤلیت محدودیت",
      "p1": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ.",
      "p2": "دا شرایط ستاسو د صافي اکاډمۍ کارول او لاسرسی تنظیموي. مهرباني وکړئ عملیاتي شرایط، تعلیمي مسؤلیتونه او د همکارۍ څرګندونې ولولئ."
    },
    "section9": {
      "secBadge": "ماده 9",
      "title": "۹. حاکم قوانین او محکمې",
      "p1": "قضايي ساحه: انګلستان او ویلز",
      "p2": "قضايي ساحه: انګلستان او ویلز"
    },
    "section10": {
      "secBadge": "ماده 10",
      "title": "۱۰. رسمي حقوقي اړیکې",
      "p1": "د لایسنس، سوداګریزو همکاریو یا د معنوي مالکیت حقوقو په اړه پوښتنې.",
      "emailLabel": "حقوقي وضاحت ته اړتیا لرئ؟",
      "btn": "له حقوقي څانګې سره اړیکه",
      "relatedTitle": "اړوند اسناد:",
      "privacyPolicy": "د محرمیت تګلاره",
      "contactUs": "له موږ سره اړیکه",
      "deleteAccount": "د حساب حذف کول"
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
    "jurisdictionLabel": "Юрисдикция: Англия и Уэльс",
    "highlights": [
      {
        "title": "Исключительно образование",
        "desc": "Курсы и руководства по регистрации бизнеса не являются юридическими или налоговыми консультациями.",
        "badge": "Важное уведомление"
      },
      {
        "title": "Прозрачность партнерств",
        "desc": "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc.",
        "badge": "Соответствие FTC"
      },
      {
        "title": "Защита авторских прав",
        "desc": "Все учебные видеоматериалы, репозитории кода и программы курсов защищены копирайтом.",
        "badge": "Охраняемые активы"
      },
      {
        "title": "Честный рейтинг",
        "desc": "Баллы Академии и Доска почета имеют академическую ценность и защищены от накруток.",
        "badge": "Правила платформы"
      }
    ],
    "tocTitle": "Навигация по разделам",
    "tocCount": "10 правовых статей",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Принятие условий и статус юрлица"
      },
      {
        "id": "scope",
        "title": "2. Характер и объем услуг"
      },
      {
        "id": "disclaimer",
        "title": "3. Отсутствие юридических консультаций",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Сторонние сервисы и партнеры",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Учетные записи и геймификация"
      },
      {
        "id": "ip",
        "title": "6. Интеллектуальная собственность"
      },
      {
        "id": "payments",
        "title": "7. Платежи и цифровой доступ"
      },
      {
        "id": "liability",
        "title": "8. Ограничение ответственности"
      },
      {
        "id": "governing-law",
        "title": "9. Применимое право и юрисдикция"
      },
      {
        "id": "contact",
        "title": "10. Юридические запросы"
      }
    ],
    "legalHelp": {
      "title": "Нужна правовая консультация?",
      "desc": "Запросы по лицензированию платформы, коммерческим партнерствам или авторским правам.",
      "btn": "Связаться с юридическим отделом"
    },
    "section1": {
      "secBadge": "Статья 1",
      "title": "1. Принятие условий и статус юрлица",
      "desc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "opEntityLabel": "Юрлицо",
      "companyNumLabel": "Рег. номер",
      "hqLabel": "Юрлицо",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Статья 2",
      "title": "2. Характер и объем услуг",
      "p1": "Курсы и руководства по регистрации бизнеса не являются юридическими или налоговыми консультациями.",
      "p2": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
    },
    "section3": {
      "secBadge": "Статья 3 • Важное уведомление",
      "title": "3. Отсутствие юридических консультаций",
      "alert": "Курсы и руководства по регистрации бизнеса не являются юридическими или налоговыми консультациями.",
      "bullets": [
        "Курсы и руководства по регистрации бизнеса не являются юридическими или налоговыми консультациями.",
        "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
        "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Статья 4 • Взаимодействие с третьими лицами",
      "title": "4. Сторонние сервисы и партнеры",
      "badge": "Соответствие FTC",
      "p1": "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc.",
      "rulesTitle": "4. Сторонние сервисы и партнеры",
      "rulesBullets": [
        {
          "lead": "Соответствие FTC:",
          "text": "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc."
        },
        {
          "lead": "Взаимодействие с третьими лицами:",
          "text": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
        }
      ]
    },
    "section5": {
      "secBadge": "Статья 5",
      "title": "5. Учетные записи и геймификация",
      "p1": "Баллы Академии и Доска почета имеют академическую ценность и защищены от накруток.",
      "rulesTitle": "Честный рейтинг",
      "rulesDesc": "Баллы Академии и Доска почета имеют академическую ценность и защищены от накруток."
    },
    "section6": {
      "secBadge": "Статья 6",
      "title": "6. Интеллектуальная собственность",
      "p1": "Все учебные видеоматериалы, репозитории кода и программы курсов защищены копирайтом.",
      "p2": "Все учебные видеоматериалы, репозитории кода и программы курсов защищены копирайтом."
    },
    "section7": {
      "secBadge": "Статья 7",
      "title": "7. Платежи и цифровой доступ",
      "p1": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "policyTitle": "7. Платежи и цифровой доступ",
      "policyDesc": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
    },
    "section8": {
      "secBadge": "Статья 8",
      "title": "8. Ограничение ответственности",
      "p1": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями.",
      "p2": "Настоящие Условия регулируют ваш доступ к Safi Academy. Внимательно ознакомьтесь с правилами платформы, образовательными оговорками и партнерскими соглашениями."
    },
    "section9": {
      "secBadge": "Статья 9",
      "title": "9. Применимое право и юрисдикция",
      "p1": "Юрисдикция: Англия и Уэльс",
      "p2": "Юрисдикция: Англия и Уэльс"
    },
    "section10": {
      "secBadge": "Статья 10",
      "title": "10. Юридические запросы",
      "p1": "Запросы по лицензированию платформы, коммерческим партнерствам или авторским правам.",
      "emailLabel": "Нужна правовая консультация?",
      "btn": "Связаться с юридическим отделом",
      "relatedTitle": "Связанные документы:",
      "privacyPolicy": "Политика конфиденциальности",
      "contactUs": "Контакты",
      "deleteAccount": "Удаление аккаунта"
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
    "jurisdictionLabel": "Yargı Yetkisi: İngiltere ve Galler",
    "highlights": [
      {
        "title": "Tamamen Eğitsel Nitelik",
        "desc": "Kurslar ve şirket kurulum kılavuzları resmi hukuki veya mali müşavirlik tavsiyesi teşkil etmez.",
        "badge": "Önemli Uyarı"
      },
      {
        "title": "Şeffaf İş Ortaklıkları",
        "desc": "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı.",
        "badge": "FTC Uyumlu"
      },
      {
        "title": "Korunan Fikri Mülkiyet",
        "desc": "Tüm ders videoları, kaynak kod depoları ve müfredatlar kesin telif hakkı koruması altındadır.",
        "badge": "Korunan Varlıklar"
      },
      {
        "title": "Adil Sıralama İlkeleri",
        "desc": "Akademi Puanları ve Onur Listesi dereceleri akademik değer taşır ve botlardan korunur.",
        "badge": "Ekosistem Kuralları"
      }
    ],
    "tocTitle": "Gezinme Dizini",
    "tocCount": "10 Hukuki Madde",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Şartların Kabulü ve Tüzel Kişilik"
      },
      {
        "id": "scope",
        "title": "2. Hizmetlerin Niteliği ve Kapsamı"
      },
      {
        "id": "disclaimer",
        "title": "3. Hukuki/Mali Danışmanlık Reddi",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Üçüncü Taraf ve İş Ortaklıkları",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Hesaplar ve Puanlama Kuralları"
      },
      {
        "id": "ip",
        "title": "6. Fikri Mülkiyet ve Lisans"
      },
      {
        "id": "payments",
        "title": "7. Ödemeler ve Dijital Erişim"
      },
      {
        "id": "liability",
        "title": "8. Sorumluluğun Sınırlandırılması"
      },
      {
        "id": "governing-law",
        "title": "9. Uygulanacak Hukuk ve Mahkemeler"
      },
      {
        "id": "contact",
        "title": "10. Hukuki Bildirimler"
      }
    ],
    "legalHelp": {
      "title": "Hukuki Açıklamaya mı İhtiyacınız Var?",
      "desc": "Platform lisanslaması, ticari ortaklıklar veya fikri mülkiyet haklarına ilişkin talepler.",
      "btn": "Hukuk Departmanıyla İletişime Geçin"
    },
    "section1": {
      "secBadge": "Bölüm 1",
      "title": "1. Şartların Kabulü ve Tüzel Kişilik",
      "desc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "opEntityLabel": "Tüzel Kişilik",
      "companyNumLabel": "Kayıt No",
      "hqLabel": "Tüzel Kişilik",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Bölüm 2",
      "title": "2. Hizmetlerin Niteliği ve Kapsamı",
      "p1": "Kurslar ve şirket kurulum kılavuzları resmi hukuki veya mali müşavirlik tavsiyesi teşkil etmez.",
      "p2": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
    },
    "section3": {
      "secBadge": "Bölüm 3 • Önemli Feragatname",
      "title": "3. Hukuki/Mali Danışmanlık Reddi",
      "alert": "Kurslar ve şirket kurulum kılavuzları resmi hukuki veya mali müşavirlik tavsiyesi teşkil etmez.",
      "bullets": [
        "Kurslar ve şirket kurulum kılavuzları resmi hukuki veya mali müşavirlik tavsiyesi teşkil etmez.",
        "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
        "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı."
      ]
    },
    "section4": {
      "secBadge": "Bölüm 4 • Üçüncü Taraf İlişkileri",
      "title": "4. Üçüncü Taraf ve İş Ortaklıkları",
      "badge": "FTC Uyumlu",
      "p1": "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı.",
      "rulesTitle": "4. Üçüncü Taraf ve İş Ortaklıkları",
      "rulesBullets": [
        {
          "lead": "FTC Uyumlu:",
          "text": "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı."
        },
        {
          "lead": "Üçüncü Taraf İlişkileri:",
          "text": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı."
        },
        {
          "lead": "Compliance:",
          "text": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
        }
      ]
    },
    "section5": {
      "secBadge": "Bölüm 5",
      "title": "5. Hesaplar ve Puanlama Kuralları",
      "p1": "Akademi Puanları ve Onur Listesi dereceleri akademik değer taşır ve botlardan korunur.",
      "rulesTitle": "Adil Sıralama İlkeleri",
      "rulesDesc": "Akademi Puanları ve Onur Listesi dereceleri akademik değer taşır ve botlardan korunur."
    },
    "section6": {
      "secBadge": "Bölüm 6",
      "title": "6. Fikri Mülkiyet ve Lisans",
      "p1": "Tüm ders videoları, kaynak kod depoları ve müfredatlar kesin telif hakkı koruması altındadır.",
      "p2": "Tüm ders videoları, kaynak kod depoları ve müfredatlar kesin telif hakkı koruması altındadır."
    },
    "section7": {
      "secBadge": "Bölüm 7",
      "title": "7. Ödemeler ve Dijital Erişim",
      "p1": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "policyTitle": "7. Ödemeler ve Dijital Erişim",
      "policyDesc": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
    },
    "section8": {
      "secBadge": "Bölüm 8",
      "title": "8. Sorumluluğun Sınırlandırılması",
      "p1": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin.",
      "p2": "Bu Şartlar Safi Academy'ye erişiminizi ve kullanımınızı yönetir. Lütfen işletim koşullarımızı, eğitim sorumluluk reddimizi ve ortaklık bildirimlerimizi dikkatlice inceleyin."
    },
    "section9": {
      "secBadge": "Bölüm 9",
      "title": "9. Uygulanacak Hukuk ve Mahkemeler",
      "p1": "Yargı Yetkisi: İngiltere ve Galler",
      "p2": "Yargı Yetkisi: İngiltere ve Galler"
    },
    "section10": {
      "secBadge": "Bölüm 10",
      "title": "10. Hukuki Bildirimler",
      "p1": "Platform lisanslaması, ticari ortaklıklar veya fikri mülkiyet haklarına ilişkin talepler.",
      "emailLabel": "Hukuki Açıklamaya mı İhtiyacınız Var?",
      "btn": "Hukuk Departmanıyla İletişime Geçin",
      "relatedTitle": "İlgili Belgeler:",
      "privacyPolicy": "Gizlilik Politikası",
      "contactUs": "Bize Ulaşın",
      "deleteAccount": "Hesap Silme"
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
    "jurisdictionLabel": "Gerichtsstand: England & Wales",
    "highlights": [
      {
        "title": "Ausschließlich Bildungszweck",
        "desc": "Kurse und Gründungsleitfäden stellen keine formelle Rechts- oder Steuerberatung dar.",
        "badge": "Wichtiger Hinweis"
      },
      {
        "title": "Transparente Partnerschaften",
        "desc": "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc.",
        "badge": "FTC-konform"
      },
      {
        "title": "Geschütztes geistiges Eigentum",
        "desc": "Alle Lehrvideos, Quellcode-Repositories und Lehrpläne sind urheberrechtlich streng geschützt.",
        "badge": "Geschützte Werte"
      },
      {
        "title": "Faire Gamification-Regeln",
        "desc": "Akademie-Punkte und Bestenlisten haben akademischen Wert und sind vor Bots geschützt.",
        "badge": "Ökosystem-Regeln"
      }
    ],
    "tocTitle": "Navigationsverzeichnis",
    "tocCount": "10 Rechtsabschnitte",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Annahme der Bedingungen & Rechtsträger"
      },
      {
        "id": "scope",
        "title": "2. Art und Umfang der Dienste"
      },
      {
        "id": "disclaimer",
        "title": "3. Keine Rechts-/Steuerberatung",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Drittanbieter & Partneroffenlegung",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Benutzerkonten & Ranglisten"
      },
      {
        "id": "ip",
        "title": "6. Geistiges Eigentum & Lizenz"
      },
      {
        "id": "payments",
        "title": "7. Zahlungen & digitaler Zugang"
      },
      {
        "id": "liability",
        "title": "8. Haftungsbeschränkung & Freistellung"
      },
      {
        "id": "governing-law",
        "title": "9. Anwendbares Recht & Gerichtsstand"
      },
      {
        "id": "contact",
        "title": "10. Rechtliche Anfragen"
      }
    ],
    "legalHelp": {
      "title": "Rechtliche Klärung erforderlich?",
      "desc": "Anfragen zu Plattformlizenzen, Unternehmenspartnerschaften oder geistigem Eigentum.",
      "btn": "Rechtsabteilung kontaktieren"
    },
    "section1": {
      "secBadge": "Abschnitt 1",
      "title": "1. Annahme der Bedingungen & Rechtsträger",
      "desc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "opEntityLabel": "Rechtsträger",
      "companyNumLabel": "Handelsregister",
      "hqLabel": "Rechtsträger",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Abschnitt 2",
      "title": "2. Art und Umfang der Dienste",
      "p1": "Kurse und Gründungsleitfäden stellen keine formelle Rechts- oder Steuerberatung dar.",
      "p2": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
    },
    "section3": {
      "secBadge": "Abschnitt 3 • Wichtiger Hinweis",
      "title": "3. Keine Rechts-/Steuerberatung",
      "alert": "Kurse und Gründungsleitfäden stellen keine formelle Rechts- oder Steuerberatung dar.",
      "bullets": [
        "Kurse und Gründungsleitfäden stellen keine formelle Rechts- oder Steuerberatung dar.",
        "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
        "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Abschnitt 4 • Drittanbieterbeziehungen",
      "title": "4. Drittanbieter & Partneroffenlegung",
      "badge": "FTC-konform",
      "p1": "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc.",
      "rulesTitle": "4. Drittanbieter & Partneroffenlegung",
      "rulesBullets": [
        {
          "lead": "FTC-konform:",
          "text": "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc."
        },
        {
          "lead": "Drittanbieterbeziehungen:",
          "text": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
        }
      ]
    },
    "section5": {
      "secBadge": "Abschnitt 5",
      "title": "5. Benutzerkonten & Ranglisten",
      "p1": "Akademie-Punkte und Bestenlisten haben akademischen Wert und sind vor Bots geschützt.",
      "rulesTitle": "Faire Gamification-Regeln",
      "rulesDesc": "Akademie-Punkte und Bestenlisten haben akademischen Wert und sind vor Bots geschützt."
    },
    "section6": {
      "secBadge": "Abschnitt 6",
      "title": "6. Geistiges Eigentum & Lizenz",
      "p1": "Alle Lehrvideos, Quellcode-Repositories und Lehrpläne sind urheberrechtlich streng geschützt.",
      "p2": "Alle Lehrvideos, Quellcode-Repositories und Lehrpläne sind urheberrechtlich streng geschützt."
    },
    "section7": {
      "secBadge": "Abschnitt 7",
      "title": "7. Zahlungen & digitaler Zugang",
      "p1": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "policyTitle": "7. Zahlungen & digitaler Zugang",
      "policyDesc": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
    },
    "section8": {
      "secBadge": "Abschnitt 8",
      "title": "8. Haftungsbeschränkung & Freistellung",
      "p1": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch.",
      "p2": "Diese Bedingungen regeln Ihren Zugang zur Safi Academy. Bitte lesen Sie unsere Betriebsbestimmungen, pädagogischen Hinweise und Partneroffenlegungen aufmerksam durch."
    },
    "section9": {
      "secBadge": "Abschnitt 9",
      "title": "9. Anwendbares Recht & Gerichtsstand",
      "p1": "Gerichtsstand: England & Wales",
      "p2": "Gerichtsstand: England & Wales"
    },
    "section10": {
      "secBadge": "Abschnitt 10",
      "title": "10. Rechtliche Anfragen",
      "p1": "Anfragen zu Plattformlizenzen, Unternehmenspartnerschaften oder geistigem Eigentum.",
      "emailLabel": "Rechtliche Klärung erforderlich?",
      "btn": "Rechtsabteilung kontaktieren",
      "relatedTitle": "Verwandte Dokumente:",
      "privacyPolicy": "Datenschutzerklärung",
      "contactUs": "Kontakt",
      "deleteAccount": "Konto löschen"
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
    "jurisdictionLabel": "Juridiction : Angleterre et Pays de Galles",
    "highlights": [
      {
        "title": "Strictement éducatif",
        "desc": "Les cours et guides de création d'entreprise ne constituent pas des conseils juridiques ou fiscaux.",
        "badge": "Avis crucial"
      },
      {
        "title": "Transparence d'affiliation",
        "desc": "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Propriété intellectuelle",
        "desc": "Tous les cursus vidéo, dépôts de code et programmes restent strictement protégés par le droit d'auteur.",
        "badge": "Actifs protégés"
      },
      {
        "title": "Classement équitable",
        "desc": "Les points de l'Académie et le tableau d'honneur ont une valeur académique protégée des robots.",
        "badge": "Règles du système"
      }
    ],
    "tocTitle": "Index de navigation",
    "tocCount": "10 articles juridiques",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Acceptation des conditions et entité"
      },
      {
        "id": "scope",
        "title": "2. Nature et portée des services"
      },
      {
        "id": "disclaimer",
        "title": "3. Absence de conseil juridique/fiscal",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Services tiers et affiliation",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Comptes d'utilisateurs et points"
      },
      {
        "id": "ip",
        "title": "6. Propriété intellectuelle et licence"
      },
      {
        "id": "payments",
        "title": "7. Paiements et accès numérique"
      },
      {
        "id": "liability",
        "title": "8. Limitation de responsabilité"
      },
      {
        "id": "governing-law",
        "title": "9. Droit applicable et tribunaux"
      },
      {
        "id": "contact",
        "title": "10. Correspondance juridique"
      }
    ],
    "legalHelp": {
      "title": "Besoin d'éclaircissements juridiques ?",
      "desc": "Demandes relatives aux licences, partenariats commerciaux ou propriété intellectuelle.",
      "btn": "Contacter le service juridique"
    },
    "section1": {
      "secBadge": "Section 1",
      "title": "1. Acceptation des conditions et entité",
      "desc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "opEntityLabel": "Entité juridique ",
      "companyNumLabel": "N° registre ",
      "hqLabel": "Entité juridique ",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Section 2",
      "title": "2. Nature et portée des services",
      "p1": "Les cours et guides de création d'entreprise ne constituent pas des conseils juridiques ou fiscaux.",
      "p2": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
    },
    "section3": {
      "secBadge": "Section 3 • Avertissement essentiel",
      "title": "3. Absence de conseil juridique/fiscal",
      "alert": "Les cours et guides de création d'entreprise ne constituent pas des conseils juridiques ou fiscaux.",
      "bullets": [
        "Les cours et guides de création d'entreprise ne constituent pas des conseils juridiques ou fiscaux.",
        "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
        "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Section 4 • Relations avec des tiers",
      "title": "4. Services tiers et affiliation",
      "badge": "Conforme FTC",
      "p1": "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc.",
      "rulesTitle": "4. Services tiers et affiliation",
      "rulesBullets": [
        {
          "lead": "Conforme FTC:",
          "text": "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc."
        },
        {
          "lead": "Relations avec des tiers:",
          "text": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
        }
      ]
    },
    "section5": {
      "secBadge": "Section 5",
      "title": "5. Comptes d'utilisateurs et points",
      "p1": "Les points de l'Académie et le tableau d'honneur ont une valeur académique protégée des robots.",
      "rulesTitle": "Classement équitable",
      "rulesDesc": "Les points de l'Académie et le tableau d'honneur ont une valeur académique protégée des robots."
    },
    "section6": {
      "secBadge": "Section 6",
      "title": "6. Propriété intellectuelle et licence",
      "p1": "Tous les cursus vidéo, dépôts de code et programmes restent strictement protégés par le droit d'auteur.",
      "p2": "Tous les cursus vidéo, dépôts de code et programmes restent strictement protégés par le droit d'auteur."
    },
    "section7": {
      "secBadge": "Section 7",
      "title": "7. Paiements et accès numérique",
      "p1": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "policyTitle": "7. Paiements et accès numérique",
      "policyDesc": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
    },
    "section8": {
      "secBadge": "Section 8",
      "title": "8. Limitation de responsabilité",
      "p1": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation.",
      "p2": "Ces conditions régissent votre accès et utilisation de Safi Academy. Veuillez examiner attentivement nos règles, clauses éducatives et déclarations d'affiliation."
    },
    "section9": {
      "secBadge": "Section 9",
      "title": "9. Droit applicable et tribunaux",
      "p1": "Juridiction : Angleterre et Pays de Galles",
      "p2": "Juridiction : Angleterre et Pays de Galles"
    },
    "section10": {
      "secBadge": "Section 10",
      "title": "10. Correspondance juridique",
      "p1": "Demandes relatives aux licences, partenariats commerciaux ou propriété intellectuelle.",
      "emailLabel": "Besoin d'éclaircissements juridiques ?",
      "btn": "Contacter le service juridique",
      "relatedTitle": "Documents connexes :",
      "privacyPolicy": "Politique de confidentialité",
      "contactUs": "Contactez-nous",
      "deleteAccount": "Suppression de compte"
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
    "jurisdictionLabel": "الاختصاص القضائي: إنجلترا وويلز",
    "highlights": [
      {
        "title": "أكاديمي وتعليمي بحت",
        "desc": "الدورات وأدلة تأسيس الشركات لا تشكل بأي حال من الأحوال استشارة قانونية أو ضريبية معتمدة.",
        "badge": "إشعار بالغ الأهمية"
      },
      {
        "title": "شفافية الشراكات والترويج",
        "desc": "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc.",
        "badge": "متوافق مع FTC"
      },
      {
        "title": "حماية الملكية الفكرية",
        "desc": "جميع مقاطع الفيديو ومستودعات الأكواد والمناهج محمية بالكامل بموجب حقوق النشر الدولي.",
        "badge": "أصول محمية"
      },
      {
        "title": "نزاهة التقييم والترتيب",
        "desc": "نقاط الأكاديمية وتصنيفات لوحة الشرف تحمل قيمة تعليمية ومحمية تماماً من الحسابات الوهمية.",
        "badge": "قواعد المنظومة"
      }
    ],
    "tocTitle": "فهرس التنقل",
    "tocCount": "10 مواد قانونية",
    "sections": [
      {
        "id": "agreement",
        "title": "1. قبول الشروط والكيان المؤسسي"
      },
      {
        "id": "scope",
        "title": "2. طبيعة ونطاق خدمات الأكاديمية"
      },
      {
        "id": "disclaimer",
        "title": "3. إخلاء المسؤولية القانونية والضريبية",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. خدمات الطرف الثالث والإفصاحات",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. الحسابات ونقاط الإنجاز"
      },
      {
        "id": "ip",
        "title": "6. الملكية الفكرية والترخيص"
      },
      {
        "id": "payments",
        "title": "7. المدفوعات والوصول الرقمي"
      },
      {
        "id": "liability",
        "title": "8. تحديد المسؤولية والتعويض"
      },
      {
        "id": "governing-law",
        "title": "9. القانون الحاكم والاختصاص القضائي"
      },
      {
        "id": "contact",
        "title": "10. الاستفسارات القانونية الرسمية"
      }
    ],
    "legalHelp": {
      "title": "هل تحتاج إلى توضيح قانوني؟",
      "desc": "استفسارات بشأن ترخيص المنصة أو الشراكات التجارية أو حقوق الملكية الفكرية.",
      "btn": "الاتصال بالقسم القانوني"
    },
    "section1": {
      "secBadge": "المادة 1",
      "title": "1. قبول الشروط والكيان المؤسسي",
      "desc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "opEntityLabel": "الكيان القانوني",
      "companyNumLabel": "رقم التسجيل",
      "hqLabel": "الكيان القانوني",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "المادة 2",
      "title": "2. طبيعة ونطاق خدمات الأكاديمية",
      "p1": "الدورات وأدلة تأسيس الشركات لا تشكل بأي حال من الأحوال استشارة قانونية أو ضريبية معتمدة.",
      "p2": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
    },
    "section3": {
      "secBadge": "المادة 3 • إخلاء مسؤولية أساسي",
      "title": "3. إخلاء المسؤولية القانونية والضريبية",
      "alert": "الدورات وأدلة تأسيس الشركات لا تشكل بأي حال من الأحوال استشارة قانونية أو ضريبية معتمدة.",
      "bullets": [
        "الدورات وأدلة تأسيس الشركات لا تشكل بأي حال من الأحوال استشارة قانونية أو ضريبية معتمدة.",
        "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
        "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "المادة 4 • علاقات الطرف الثالث",
      "title": "4. خدمات الطرف الثالث والإفصاحات",
      "badge": "متوافق مع FTC",
      "p1": "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc.",
      "rulesTitle": "4. خدمات الطرف الثالث والإفصاحات",
      "rulesBullets": [
        {
          "lead": "متوافق مع FTC:",
          "text": "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc."
        },
        {
          "lead": "علاقات الطرف الثالث:",
          "text": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
        }
      ]
    },
    "section5": {
      "secBadge": "المادة 5",
      "title": "5. الحسابات ونقاط الإنجاز",
      "p1": "نقاط الأكاديمية وتصنيفات لوحة الشرف تحمل قيمة تعليمية ومحمية تماماً من الحسابات الوهمية.",
      "rulesTitle": "نزاهة التقييم والترتيب",
      "rulesDesc": "نقاط الأكاديمية وتصنيفات لوحة الشرف تحمل قيمة تعليمية ومحمية تماماً من الحسابات الوهمية."
    },
    "section6": {
      "secBadge": "المادة 6",
      "title": "6. الملكية الفكرية والترخيص",
      "p1": "جميع مقاطع الفيديو ومستودعات الأكواد والمناهج محمية بالكامل بموجب حقوق النشر الدولي.",
      "p2": "جميع مقاطع الفيديو ومستودعات الأكواد والمناهج محمية بالكامل بموجب حقوق النشر الدولي."
    },
    "section7": {
      "secBadge": "المادة 7",
      "title": "7. المدفوعات والوصول الرقمي",
      "p1": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "policyTitle": "7. المدفوعات والوصول الرقمي",
      "policyDesc": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
    },
    "section8": {
      "secBadge": "المادة 8",
      "title": "8. تحديد المسؤولية والتعويض",
      "p1": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية.",
      "p2": "تحكم هذه الشروط وصولك إلى أكاديمية صافي واستخدامها. يرجى مراجعة شروط التشغيل وإخلاء المسؤولية التعليمي والإفصاحات التابعة بعناية."
    },
    "section9": {
      "secBadge": "المادة 9",
      "title": "9. القانون الحاكم والاختصاص القضائي",
      "p1": "الاختصاص القضائي: إنجلترا وويلز",
      "p2": "الاختصاص القضائي: إنجلترا وويلز"
    },
    "section10": {
      "secBadge": "المادة 10",
      "title": "10. الاستفسارات القانونية الرسمية",
      "p1": "استفسارات بشأن ترخيص المنصة أو الشراكات التجارية أو حقوق الملكية الفكرية.",
      "emailLabel": "هل تحتاج إلى توضيح قانوني؟",
      "btn": "الاتصال بالقسم القانوني",
      "relatedTitle": "المستندات ذات الصلة:",
      "privacyPolicy": "سياسة الخصوصية",
      "contactUs": "اتصل بنا",
      "deleteAccount": "حذف الحساب"
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
    "jurisdictionLabel": "عدالتی دائرہ اختیار: انگلینڈ اور ویلز",
    "highlights": [
      {
        "title": "خالصتاً تعلیمی نوعیت",
        "desc": "کورسز اور کاروباری رجسٹریشن گائیڈز باضابطہ قانونی یا ٹیکس مشاورت نہیں ہیں۔",
        "badge": "اہم ترین انتباہ"
      },
      {
        "title": "شراکت داری کی شفافیت",
        "desc": "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔",
        "badge": "FTC کے مطابق"
      },
      {
        "title": "دانشورانہ ملکیت کا تحفظ",
        "desc": "تمام تعلیمی ویڈیوز، سورس کوڈ کے ذخائر اور نصاب کاپی رائٹ کے تحت سختی سے محفوظ ہیں۔",
        "badge": "محفوظ اثاثے"
      },
      {
        "title": "منصفانہ تعلیمی رینکنگ",
        "desc": "اکیڈمی پوائنٹس اور وال آف فیم رینکنگ علمی قدر رکھتے ہیں اور بوٹس سے محفوظ ہیں۔",
        "badge": "نظام کے قوانین"
      }
    ],
    "tocTitle": "فہرست مضامین",
    "tocCount": "10 قانونی شقیں",
    "sections": [
      {
        "id": "agreement",
        "title": "1. شرائط کی قبولیت اور قانونی ادارہ"
      },
      {
        "id": "scope",
        "title": "2. اکیڈمی کی خدمات کی نوعیت"
      },
      {
        "id": "disclaimer",
        "title": "3. قانونی اور ٹیکس مشورے سے لاتعلقی",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. فریق ثالث کی خدمات اور شراکت داری",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. صارف کے اکاؤنٹس اور تعلیمی پوائنٹس"
      },
      {
        "id": "ip",
        "title": "6. دانشورانہ ملکیت اور لائسنس"
      },
      {
        "id": "payments",
        "title": "7. ادائیگیاں اور ڈیجیٹل رسائی"
      },
      {
        "id": "liability",
        "title": "8. ذمہ داری کی حد اور معاوضہ"
      },
      {
        "id": "governing-law",
        "title": "9. لاگو قوانین اور عدالتیں"
      },
      {
        "id": "contact",
        "title": "10. سرکاری قانونی خط و کتابت"
      }
    ],
    "legalHelp": {
      "title": "قانونی وضاحت درکار ہے؟",
      "desc": "پلیٹ فارم لائسنسنگ، تجارتی شراکت داری یا دانشورانہ ملکیت کے حقوق کے بارے میں استفسارات۔",
      "btn": "قانونی شعبے سے رابطہ کریں"
    },
    "section1": {
      "secBadge": "شق 1",
      "title": "1. شرائط کی قبولیت اور قانونی ادارہ",
      "desc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "opEntityLabel": "قانونی ادارہ",
      "companyNumLabel": "رجسٹریشن نمبر",
      "hqLabel": "قانونی ادارہ",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "شق 2",
      "title": "2. اکیڈمی کی خدمات کی نوعیت",
      "p1": "کورسز اور کاروباری رجسٹریشن گائیڈز باضابطہ قانونی یا ٹیکس مشاورت نہیں ہیں۔",
      "p2": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
    },
    "section3": {
      "secBadge": "شق 3 • ضروری ڈس کلیمر",
      "title": "3. قانونی اور ٹیکس مشورے سے لاتعلقی",
      "alert": "کورسز اور کاروباری رجسٹریشن گائیڈز باضابطہ قانونی یا ٹیکس مشاورت نہیں ہیں۔",
      "bullets": [
        "کورسز اور کاروباری رجسٹریشن گائیڈز باضابطہ قانونی یا ٹیکس مشاورت نہیں ہیں۔",
        "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
        "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔"
      ]
    },
    "section4": {
      "secBadge": "شق 4 • تیسرے فریق کے تعلقات",
      "title": "4. فریق ثالث کی خدمات اور شراکت داری",
      "badge": "FTC کے مطابق",
      "p1": "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔",
      "rulesTitle": "4. فریق ثالث کی خدمات اور شراکت داری",
      "rulesBullets": [
        {
          "lead": "FTC کے مطابق:",
          "text": "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔"
        },
        {
          "lead": "تیسرے فریق کے تعلقات:",
          "text": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔"
        },
        {
          "lead": "Compliance:",
          "text": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
        }
      ]
    },
    "section5": {
      "secBadge": "شق 5",
      "title": "5. صارف کے اکاؤنٹس اور تعلیمی پوائنٹس",
      "p1": "اکیڈمی پوائنٹس اور وال آف فیم رینکنگ علمی قدر رکھتے ہیں اور بوٹس سے محفوظ ہیں۔",
      "rulesTitle": "منصفانہ تعلیمی رینکنگ",
      "rulesDesc": "اکیڈمی پوائنٹس اور وال آف فیم رینکنگ علمی قدر رکھتے ہیں اور بوٹس سے محفوظ ہیں۔"
    },
    "section6": {
      "secBadge": "شق 6",
      "title": "6. دانشورانہ ملکیت اور لائسنس",
      "p1": "تمام تعلیمی ویڈیوز، سورس کوڈ کے ذخائر اور نصاب کاپی رائٹ کے تحت سختی سے محفوظ ہیں۔",
      "p2": "تمام تعلیمی ویڈیوز، سورس کوڈ کے ذخائر اور نصاب کاپی رائٹ کے تحت سختی سے محفوظ ہیں۔"
    },
    "section7": {
      "secBadge": "شق 7",
      "title": "7. ادائیگیاں اور ڈیجیٹل رسائی",
      "p1": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "policyTitle": "7. ادائیگیاں اور ڈیجیٹل رسائی",
      "policyDesc": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
    },
    "section8": {
      "secBadge": "شق 8",
      "title": "8. ذمہ داری کی حد اور معاوضہ",
      "p1": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔",
      "p2": "یہ شرائط صفی اکیڈمی تک آپ کی رسائی اور استعمال کو کنٹرول کرتی ہیں۔ براہ کرم ہمارے تعلیمی ڈس کلیمر اور الحاق کے انکشافات کا بغور جائزہ لیں۔"
    },
    "section9": {
      "secBadge": "شق 9",
      "title": "9. لاگو قوانین اور عدالتیں",
      "p1": "عدالتی دائرہ اختیار: انگلینڈ اور ویلز",
      "p2": "عدالتی دائرہ اختیار: انگلینڈ اور ویلز"
    },
    "section10": {
      "secBadge": "شق 10",
      "title": "10. سرکاری قانونی خط و کتابت",
      "p1": "پلیٹ فارم لائسنسنگ، تجارتی شراکت داری یا دانشورانہ ملکیت کے حقوق کے بارے میں استفسارات۔",
      "emailLabel": "قانونی وضاحت درکار ہے؟",
      "btn": "قانونی شعبے سے رابطہ کریں",
      "relatedTitle": "متعلقہ دستاویزات:",
      "privacyPolicy": "رازداری کی پالیسی",
      "contactUs": "ہم سے رابطہ کریں",
      "deleteAccount": "اکاؤنٹ کا خاتمہ"
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
    "jurisdictionLabel": "Jurisdicción: Inglaterra y Gales",
    "highlights": [
      {
        "title": "Estrictamente educativo",
        "desc": "Los cursos y guías de constitución de empresas NO constituyen asesoría legal o fiscal formal.",
        "badge": "Aviso crucial"
      },
      {
        "title": "Transparencia de afiliación",
        "desc": "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc.",
        "badge": "Cumple con la FTC"
      },
      {
        "title": "Propiedad intelectual",
        "desc": "Todos los videos, repositorios de código y planes de estudio están protegidos por derechos de autor.",
        "badge": "Activos protegidos"
      },
      {
        "title": "Gamificación justa",
        "desc": "Los Puntos de Academia y el Muro de la Fama tienen valor académico y están protegidos contra bots.",
        "badge": "Reglas de la plataforma"
      }
    ],
    "tocTitle": "Índice de navegación",
    "tocCount": "10 secciones legales",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Aceptación de términos y entidad"
      },
      {
        "id": "scope",
        "title": "2. Naturaleza y alcance de servicios"
      },
      {
        "id": "disclaimer",
        "title": "3. Sin asesoramiento legal o fiscal",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Servicios de terceros y afiliados",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Cuentas y sistema de puntos"
      },
      {
        "id": "ip",
        "title": "6. Propiedad intelectual y licencias"
      },
      {
        "id": "payments",
        "title": "7. Pagos y acceso digital"
      },
      {
        "id": "liability",
        "title": "8. Limitación de responsabilidad"
      },
      {
        "id": "governing-law",
        "title": "9. Ley aplicable y jurisdicción"
      },
      {
        "id": "contact",
        "title": "10. Consultas legales oficiales"
      }
    ],
    "legalHelp": {
      "title": "¿Necesita aclaración legal?",
      "desc": "Consultas sobre licencias de plataforma, asociaciones comerciales o derechos de autor.",
      "btn": "Contactar departamento legal"
    },
    "section1": {
      "secBadge": "Sección 1",
      "title": "1. Aceptación de términos y entidad",
      "desc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "opEntityLabel": "Entidad legal",
      "companyNumLabel": "Registro",
      "hqLabel": "Entidad legal",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sección 2",
      "title": "2. Naturaleza y alcance de servicios",
      "p1": "Los cursos y guías de constitución de empresas NO constituyen asesoría legal o fiscal formal.",
      "p2": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
    },
    "section3": {
      "secBadge": "Sección 3 • Aviso crucial",
      "title": "3. Sin asesoramiento legal o fiscal",
      "alert": "Los cursos y guías de constitución de empresas NO constituyen asesoría legal o fiscal formal.",
      "bullets": [
        "Los cursos y guías de constitución de empresas NO constituyen asesoría legal o fiscal formal.",
        "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
        "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Sección 4 • Relaciones con terceros",
      "title": "4. Servicios de terceros y afiliados",
      "badge": "Cumple con la FTC",
      "p1": "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc.",
      "rulesTitle": "4. Servicios de terceros y afiliados",
      "rulesBullets": [
        {
          "lead": "Cumple con la FTC:",
          "text": "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc."
        },
        {
          "lead": "Relaciones con terceros:",
          "text": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
        }
      ]
    },
    "section5": {
      "secBadge": "Sección 5",
      "title": "5. Cuentas y sistema de puntos",
      "p1": "Los Puntos de Academia y el Muro de la Fama tienen valor académico y están protegidos contra bots.",
      "rulesTitle": "Gamificación justa",
      "rulesDesc": "Los Puntos de Academia y el Muro de la Fama tienen valor académico y están protegidos contra bots."
    },
    "section6": {
      "secBadge": "Sección 6",
      "title": "6. Propiedad intelectual y licencias",
      "p1": "Todos los videos, repositorios de código y planes de estudio están protegidos por derechos de autor.",
      "p2": "Todos los videos, repositorios de código y planes de estudio están protegidos por derechos de autor."
    },
    "section7": {
      "secBadge": "Sección 7",
      "title": "7. Pagos y acceso digital",
      "p1": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "policyTitle": "7. Pagos y acceso digital",
      "policyDesc": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
    },
    "section8": {
      "secBadge": "Sección 8",
      "title": "8. Limitación de responsabilidad",
      "p1": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones.",
      "p2": "Estos Términos rigen su acceso y uso de Safi Academy. Revise cuidadosamente nuestros términos operativos, descargos de responsabilidad y afiliaciones."
    },
    "section9": {
      "secBadge": "Sección 9",
      "title": "9. Ley aplicable y jurisdicción",
      "p1": "Jurisdicción: Inglaterra y Gales",
      "p2": "Jurisdicción: Inglaterra y Gales"
    },
    "section10": {
      "secBadge": "Sección 10",
      "title": "10. Consultas legales oficiales",
      "p1": "Consultas sobre licencias de plataforma, asociaciones comerciales o derechos de autor.",
      "emailLabel": "¿Necesita aclaración legal?",
      "btn": "Contactar departamento legal",
      "relatedTitle": "Documentos relacionados:",
      "privacyPolicy": "Política de privacidad",
      "contactUs": "Contacto",
      "deleteAccount": "Eliminación de cuenta"
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
    "jurisdictionLabel": "司法管辖区：英格兰和威尔士",
    "highlights": [
      {
        "title": "纯粹学术教育性质",
        "desc": "平台所有课程与公司注册教程绝不构成正式的法律、税务或执业会计师（CPA）咨询建议。",
        "badge": "关键免责通知"
      },
      {
        "title": "推广合作完全透明",
        "desc": "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。",
        "badge": "符合FTC规范"
      },
      {
        "title": "严格知识产权保护",
        "desc": "平台包含的全部教学视频、实战代码仓库和课程讲义均受国际版权法严格独家保护。",
        "badge": "受保护专有资产"
      },
      {
        "title": "公平竞技与积分纪律",
        "desc": "学院成就积分与荣誉墙排行榜代表学术荣誉，系统严禁自动化脚本刷分并设作弊熔断机制。",
        "badge": "生态系统守则"
      }
    ],
    "tocTitle": "导航索引",
    "tocCount": "10项法律条款",
    "sections": [
      {
        "id": "agreement",
        "title": "1. 条款接受与法人实体声明"
      },
      {
        "id": "scope",
        "title": "2. 学院服务性质与业务范围"
      },
      {
        "id": "disclaimer",
        "title": "3. 非法律或税务建议免责声明",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. 第三方服务与推广佣金披露",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. 用户账户安全与学术积分规则"
      },
      {
        "id": "ip",
        "title": "6. 知识产权保护与有限许可"
      },
      {
        "id": "payments",
        "title": "7. 课程学费支付与数字访问条款"
      },
      {
        "id": "liability",
        "title": "8. 责任限制与法律赔偿豁免"
      },
      {
        "id": "governing-law",
        "title": "9. 法律适用与排他司法管辖权"
      },
      {
        "id": "contact",
        "title": "10. 官方合规联络与公文送达"
      }
    ],
    "legalHelp": {
      "title": "需要法律说明？",
      "desc": "关于平台授权许可、商业战略合作或知识产权的官方咨询。",
      "btn": "联络法务合规部门"
    },
    "section1": {
      "secBadge": "第 1",
      "title": "1. 条款接受与法人实体声明",
      "desc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "opEntityLabel": "Entity",
      "companyNumLabel": "Reg",
      "hqLabel": "法人实体：Safi International Capital LTD",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第 2",
      "title": "2. 学院服务性质与业务范围",
      "p1": "平台所有课程与公司注册教程绝不构成正式的法律、税务或执业会计师（CPA）咨询建议。",
      "p2": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
    },
    "section3": {
      "secBadge": "第 3 • 重要免责声明",
      "title": "3. 非法律或税务建议免责声明",
      "alert": "平台所有课程与公司注册教程绝不构成正式的法律、税务或执业会计师（CPA）咨询建议。",
      "bullets": [
        "平台所有课程与公司注册教程绝不构成正式的法律、税务或执业会计师（CPA）咨询建议。",
        "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
        "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。"
      ]
    },
    "section4": {
      "secBadge": "第 4 • 第三方合作关系",
      "title": "4. 第三方服务与推广佣金披露",
      "badge": "符合FTC规范",
      "p1": "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。",
      "rulesTitle": "4. 第三方服务与推广佣金披露",
      "rulesBullets": [
        {
          "lead": "符合FTC规范:",
          "text": "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。"
        },
        {
          "lead": "第三方合作关系:",
          "text": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。"
        },
        {
          "lead": "Compliance:",
          "text": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
        }
      ]
    },
    "section5": {
      "secBadge": "第 5",
      "title": "5. 用户账户安全与学术积分规则",
      "p1": "学院成就积分与荣誉墙排行榜代表学术荣誉，系统严禁自动化脚本刷分并设作弊熔断机制。",
      "rulesTitle": "公平竞技与积分纪律",
      "rulesDesc": "学院成就积分与荣誉墙排行榜代表学术荣誉，系统严禁自动化脚本刷分并设作弊熔断机制。"
    },
    "section6": {
      "secBadge": "第 6",
      "title": "6. 知识产权保护与有限许可",
      "p1": "平台包含的全部教学视频、实战代码仓库和课程讲义均受国际版权法严格独家保护。",
      "p2": "平台包含的全部教学视频、实战代码仓库和课程讲义均受国际版权法严格独家保护。"
    },
    "section7": {
      "secBadge": "第 7",
      "title": "7. 课程学费支付与数字访问条款",
      "p1": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "policyTitle": "7. 课程学费支付与数字访问条款",
      "policyDesc": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
    },
    "section8": {
      "secBadge": "第 8",
      "title": "8. 责任限制与法律赔偿豁免",
      "p1": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。",
      "p2": "本条款规范您对萨菲学院（Safi Academy）的访问和使用。请仔细阅读我们的运营条款、教育免责声明和商业推广披露。"
    },
    "section9": {
      "secBadge": "第 9",
      "title": "9. 法律适用与排他司法管辖权",
      "p1": "司法管辖区：英格兰和威尔士",
      "p2": "司法管辖区：英格兰和威尔士"
    },
    "section10": {
      "secBadge": "第 10",
      "title": "10. 官方合规联络与公文送达",
      "p1": "关于平台授权许可、商业战略合作或知识产权的官方咨询。",
      "emailLabel": "需要法律说明？",
      "btn": "联络法务合规部门",
      "relatedTitle": "相关法律文件：",
      "privacyPolicy": "隐私保护政策",
      "contactUs": "联系我们",
      "deleteAccount": "账号注销申请"
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
    "jurisdictionLabel": "क्षेत्राधिकार: इंग्लैंड और वेल्स",
    "highlights": [
      {
        "title": "कड़ाई से शैक्षिक सामग्री",
        "desc": "पाठ्यक्रम और व्यवसाय निर्माण गाइड किसी भी तरह से औपचारिक कानूनी या कर सलाह नहीं हैं।",
        "badge": "महत्वपूर्ण सूचना"
      },
      {
        "title": "संबद्धता की पारदर्शिता",
        "desc": "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।",
        "badge": "FTC अनुपालन"
      },
      {
        "title": "संरक्षित बौद्धिक संपदा",
        "desc": "सभी वीडियो पाठ्यक्रम, कोड रिपॉजिटरी और पाठ्यक्रम विवरण कॉपीराइट द्वारा सुरक्षित हैं।",
        "badge": "संरक्षित संपत्ति"
      },
      {
        "title": "निष्पक्ष उपलब्धि रैंकिंग",
        "desc": "अकादमी अंक और हॉल ऑफ फेम रैंकिंग का शैक्षणिक मूल्य है और वे बॉट से सुरक्षित हैं।",
        "badge": "पारिस्थितिकी तंत्र नियम"
      }
    ],
    "tocTitle": "नेविगेशन सूची",
    "tocCount": "10 कानूनी खंड",
    "sections": [
      {
        "id": "agreement",
        "title": "1. शर्तों की स्वीकृति और कानूनी इकाई"
      },
      {
        "id": "scope",
        "title": "2. अकादमी सेवाओं की प्रकृति और दायरा"
      },
      {
        "id": "disclaimer",
        "title": "3. कोई कानूनी या कर सलाह नहीं",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. तृतीय-पक्ष सेवाएं और संबद्ध प्रकटीकरण",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. उपयोगकर्ता खाते और उपलब्धि अंक"
      },
      {
        "id": "ip",
        "title": "6. बौद्धिक संपदा और सीमित लाइसेंस"
      },
      {
        "id": "payments",
        "title": "7. भुगतान और डिजिटल सामग्री पहुंच"
      },
      {
        "id": "liability",
        "title": "8. देयता की सीमा और क्षतिपूर्ति"
      },
      {
        "id": "governing-law",
        "title": "9. शासी कानून और अनन्य क्षेत्राधिकार"
      },
      {
        "id": "contact",
        "title": "10. आधिकारिक कानूनी पत्राचार"
      }
    ],
    "legalHelp": {
      "title": "कानूनी स्पष्टीकरण चाहिए?",
      "desc": "प्लेटफ़ॉर्म लाइसेंसिंग, व्यावसायिक साझेदारी या बौद्धिक संपदा अधिकारों से संबंधित पूछताछ।",
      "btn": "कानूनी विभाग से संपर्क करें"
    },
    "section1": {
      "secBadge": "धारा 1",
      "title": "1. शर्तों की स्वीकृति और कानूनी इकाई",
      "desc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "opEntityLabel": "कानूनी इकाई",
      "companyNumLabel": "पंजीकरण संख्या",
      "hqLabel": "कानूनी इकाई",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "धारा 2",
      "title": "2. अकादमी सेवाओं की प्रकृति और दायरा",
      "p1": "पाठ्यक्रम और व्यवसाय निर्माण गाइड किसी भी तरह से औपचारिक कानूनी या कर सलाह नहीं हैं।",
      "p2": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
    },
    "section3": {
      "secBadge": "धारा 3 • महत्वपूर्ण अस्वीकरण",
      "title": "3. कोई कानूनी या कर सलाह नहीं",
      "alert": "पाठ्यक्रम और व्यवसाय निर्माण गाइड किसी भी तरह से औपचारिक कानूनी या कर सलाह नहीं हैं।",
      "bullets": [
        "पाठ्यक्रम और व्यवसाय निर्माण गाइड किसी भी तरह से औपचारिक कानूनी या कर सलाह नहीं हैं।",
        "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
        "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।"
      ]
    },
    "section4": {
      "secBadge": "धारा 4 • तृतीय-पक्ष संबंध",
      "title": "4. तृतीय-पक्ष सेवाएं और संबद्ध प्रकटीकरण",
      "badge": "FTC अनुपालन",
      "p1": "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।",
      "rulesTitle": "4. तृतीय-पक्ष सेवाएं और संबद्ध प्रकटीकरण",
      "rulesBullets": [
        {
          "lead": "FTC अनुपालन:",
          "text": "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।"
        },
        {
          "lead": "तृतीय-पक्ष संबंध:",
          "text": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।"
        },
        {
          "lead": "Compliance:",
          "text": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
        }
      ]
    },
    "section5": {
      "secBadge": "धारा 5",
      "title": "5. उपयोगकर्ता खाते और उपलब्धि अंक",
      "p1": "अकादमी अंक और हॉल ऑफ फेम रैंकिंग का शैक्षणिक मूल्य है और वे बॉट से सुरक्षित हैं।",
      "rulesTitle": "निष्पक्ष उपलब्धि रैंकिंग",
      "rulesDesc": "अकादमी अंक और हॉल ऑफ फेम रैंकिंग का शैक्षणिक मूल्य है और वे बॉट से सुरक्षित हैं।"
    },
    "section6": {
      "secBadge": "धारा 6",
      "title": "6. बौद्धिक संपदा और सीमित लाइसेंस",
      "p1": "सभी वीडियो पाठ्यक्रम, कोड रिपॉजिटरी और पाठ्यक्रम विवरण कॉपीराइट द्वारा सुरक्षित हैं।",
      "p2": "सभी वीडियो पाठ्यक्रम, कोड रिपॉजिटरी और पाठ्यक्रम विवरण कॉपीराइट द्वारा सुरक्षित हैं।"
    },
    "section7": {
      "secBadge": "धारा 7",
      "title": "7. भुगतान और डिजिटल सामग्री पहुंच",
      "p1": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "policyTitle": "7. भुगतान और डिजिटल सामग्री पहुंच",
      "policyDesc": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
    },
    "section8": {
      "secBadge": "धारा 8",
      "title": "8. देयता की सीमा और क्षतिपूर्ति",
      "p1": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।",
      "p2": "ये शर्तें सफी एकेडमी तक आपकी पहुंच और उपयोग को नियंत्रित करती हैं। कृपया हमारे परिचालन नियमों, शैक्षिक अस्वीकरणों और संबद्ध प्रकटीकरणों की सावधानीपूर्वक समीक्षा करें।"
    },
    "section9": {
      "secBadge": "धारा 9",
      "title": "9. शासी कानून और अनन्य क्षेत्राधिकार",
      "p1": "क्षेत्राधिकार: इंग्लैंड और वेल्स",
      "p2": "क्षेत्राधिकार: इंग्लैंड और वेल्स"
    },
    "section10": {
      "secBadge": "धारा 10",
      "title": "10. आधिकारिक कानूनी पत्राचार",
      "p1": "प्लेटफ़ॉर्म लाइसेंसिंग, व्यावसायिक साझेदारी या बौद्धिक संपदा अधिकारों से संबंधित पूछताछ।",
      "emailLabel": "कानूनी स्पष्टीकरण चाहिए?",
      "btn": "कानूनी विभाग से संपर्क करें",
      "relatedTitle": "संबंधित दस्तावेज़:",
      "privacyPolicy": "गोपनीयता नीति",
      "contactUs": "संपर्क करें",
      "deleteAccount": "खाता हटाना"
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
    "jurisdictionLabel": "Giurisdizione: Inghilterra e Galles",
    "highlights": [
      {
        "title": "Natura puramente educativa",
        "desc": "I corsi e le guide non costituiscono consulenza legale, fiscale o contabile formale.",
        "badge": "Avviso fondamentale"
      },
      {
        "title": "Trasparenza di affiliazione",
        "desc": "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Proprietà intellettuale",
        "desc": "Tutti i video didattici, i repository di codice e i programmi sono rigorosamente protetti da copyright.",
        "badge": "Beni protetti"
      },
      {
        "title": "Classifiche eque",
        "desc": "I Punti Accademia e il Muro della Gloria hanno valore formativo e sono schermati dai bot.",
        "badge": "Regole dell'ecosistema"
      }
    ],
    "tocTitle": "Indice di navigazione",
    "tocCount": "10 articoli legali",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Accettazione dei termini ed entità"
      },
      {
        "id": "scope",
        "title": "2. Natura e ambito dei servizi"
      },
      {
        "id": "disclaimer",
        "title": "3. Nessuna consulenza legale/fiscale",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Servizi di terzi e affiliazioni",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Account utente e punti accademici"
      },
      {
        "id": "ip",
        "title": "6. Proprietà intellettuale e licenza"
      },
      {
        "id": "payments",
        "title": "7. Pagamenti e accesso digitale"
      },
      {
        "id": "liability",
        "title": "8. Limitazione di responsabilità"
      },
      {
        "id": "governing-law",
        "title": "9. Legge applicabile e foro competente"
      },
      {
        "id": "contact",
        "title": "10. Comunicazioni legali"
      }
    ],
    "legalHelp": {
      "title": "Hai bisogno di chiarimenti legali?",
      "desc": "Richieste relative a licenze della piattaforma, partnership commerciali o proprietà intellettuale.",
      "btn": "Contatta l'ufficio legale"
    },
    "section1": {
      "secBadge": "Sezione 1",
      "title": "1. Accettazione dei termini ed entità",
      "desc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "opEntityLabel": "Entità legale",
      "companyNumLabel": "Reg",
      "hqLabel": "Entità legale",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Sezione 2",
      "title": "2. Natura e ambito dei servizi",
      "p1": "I corsi e le guide non costituiscono consulenza legale, fiscale o contabile formale.",
      "p2": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
    },
    "section3": {
      "secBadge": "Sezione 3 • Avvertenza essenziale",
      "title": "3. Nessuna consulenza legale/fiscale",
      "alert": "I corsi e le guide non costituiscono consulenza legale, fiscale o contabile formale.",
      "bullets": [
        "I corsi e le guide non costituiscono consulenza legale, fiscale o contabile formale.",
        "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
        "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Sezione 4 • Relazioni con terze parti",
      "title": "4. Servizi di terzi e affiliazioni",
      "badge": "Conforme FTC",
      "p1": "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc.",
      "rulesTitle": "4. Servizi di terzi e affiliazioni",
      "rulesBullets": [
        {
          "lead": "Conforme FTC:",
          "text": "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc."
        },
        {
          "lead": "Relazioni con terze parti:",
          "text": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
        }
      ]
    },
    "section5": {
      "secBadge": "Sezione 5",
      "title": "5. Account utente e punti accademici",
      "p1": "I Punti Accademia e il Muro della Gloria hanno valore formativo e sono schermati dai bot.",
      "rulesTitle": "Classifiche eque",
      "rulesDesc": "I Punti Accademia e il Muro della Gloria hanno valore formativo e sono schermati dai bot."
    },
    "section6": {
      "secBadge": "Sezione 6",
      "title": "6. Proprietà intellettuale e licenza",
      "p1": "Tutti i video didattici, i repository di codice e i programmi sono rigorosamente protetti da copyright.",
      "p2": "Tutti i video didattici, i repository di codice e i programmi sono rigorosamente protetti da copyright."
    },
    "section7": {
      "secBadge": "Sezione 7",
      "title": "7. Pagamenti e accesso digitale",
      "p1": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "policyTitle": "7. Pagamenti e accesso digitale",
      "policyDesc": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
    },
    "section8": {
      "secBadge": "Sezione 8",
      "title": "8. Limitazione di responsabilità",
      "p1": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione.",
      "p2": "Questi Termini regolano l'accesso e l'uso di Safi Academy. Ti invitiamo a leggere attentamente le nostre regole operative, clausole educative e informative di affiliazione."
    },
    "section9": {
      "secBadge": "Sezione 9",
      "title": "9. Legge applicabile e foro competente",
      "p1": "Giurisdizione: Inghilterra e Galles",
      "p2": "Giurisdizione: Inghilterra e Galles"
    },
    "section10": {
      "secBadge": "Sezione 10",
      "title": "10. Comunicazioni legali",
      "p1": "Richieste relative a licenze della piattaforma, partnership commerciali o proprietà intellettuale.",
      "emailLabel": "Hai bisogno di chiarimenti legali?",
      "btn": "Contatta l'ufficio legale",
      "relatedTitle": "Documenti correlati:",
      "privacyPolicy": "Informativa sulla privacy",
      "contactUs": "Contattaci",
      "deleteAccount": "Eliminazione account"
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
    "jurisdictionLabel": "Jurisdição: Inglaterra e País de Gales",
    "highlights": [
      {
        "title": "Estritamente educacional",
        "desc": "Os cursos e guias não constituem consultoria jurídica, contábil ou fiscal formal.",
        "badge": "Aviso crucial"
      },
      {
        "title": "Transparência de afiliados",
        "desc": "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc.",
        "badge": "Conforme FTC"
      },
      {
        "title": "Propriedade intelectual",
        "desc": "Todos os vídeos das aulas, repositórios de código e ementas permanecem protegidos por direitos autorais.",
        "badge": "Ativos protegidos"
      },
      {
        "title": "Gamificação justa",
        "desc": "Os Pontos da Academia e o Mural da Fama têm valor acadêmico e são blindados contra bots.",
        "badge": "Regras do ecossistema"
      }
    ],
    "tocTitle": "Índice de navegação",
    "tocCount": "10 artigos legais",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Aceitação dos termos e entidade"
      },
      {
        "id": "scope",
        "title": "2. Natureza e escopo dos serviços"
      },
      {
        "id": "disclaimer",
        "title": "3. Sem aconselhamento jurídico/fiscal",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Serviços de terceiros e afiliados",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Contas de usuário e pontuação"
      },
      {
        "id": "ip",
        "title": "6. Propriedade intelectual e licença"
      },
      {
        "id": "payments",
        "title": "7. Pagamentos e acesso digital"
      },
      {
        "id": "liability",
        "title": "8. Limitação de responsabilidade"
      },
      {
        "id": "governing-law",
        "title": "9. Lei aplicável e jurisdição"
      },
      {
        "id": "contact",
        "title": "10. Correspondência jurídica oficial"
      }
    ],
    "legalHelp": {
      "title": "Precisa de esclarecimento jurídico?",
      "desc": "Consultas sobre licenciamento da plataforma, parcerias comerciais ou propriedade intelectual.",
      "btn": "Contatar departamento jurídico"
    },
    "section1": {
      "secBadge": "Seção 1",
      "title": "1. Aceitação dos termos e entidade",
      "desc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "opEntityLabel": "Entidade legal",
      "companyNumLabel": "Reg",
      "hqLabel": "Entidade legal",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Seção 2",
      "title": "2. Natureza e escopo dos serviços",
      "p1": "Os cursos e guias não constituem consultoria jurídica, contábil ou fiscal formal.",
      "p2": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
    },
    "section3": {
      "secBadge": "Seção 3 • Aviso essencial",
      "title": "3. Sem aconselhamento jurídico/fiscal",
      "alert": "Os cursos e guias não constituem consultoria jurídica, contábil ou fiscal formal.",
      "bullets": [
        "Os cursos e guias não constituem consultoria jurídica, contábil ou fiscal formal.",
        "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
        "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Seção 4 • Relações com terceiros",
      "title": "4. Serviços de terceiros e afiliados",
      "badge": "Conforme FTC",
      "p1": "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc.",
      "rulesTitle": "4. Serviços de terceiros e afiliados",
      "rulesBullets": [
        {
          "lead": "Conforme FTC:",
          "text": "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc."
        },
        {
          "lead": "Relações com terceiros:",
          "text": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
        }
      ]
    },
    "section5": {
      "secBadge": "Seção 5",
      "title": "5. Contas de usuário e pontuação",
      "p1": "Os Pontos da Academia e o Mural da Fama têm valor acadêmico e são blindados contra bots.",
      "rulesTitle": "Gamificação justa",
      "rulesDesc": "Os Pontos da Academia e o Mural da Fama têm valor acadêmico e são blindados contra bots."
    },
    "section6": {
      "secBadge": "Seção 6",
      "title": "6. Propriedade intelectual e licença",
      "p1": "Todos os vídeos das aulas, repositórios de código e ementas permanecem protegidos por direitos autorais.",
      "p2": "Todos os vídeos das aulas, repositórios de código e ementas permanecem protegidos por direitos autorais."
    },
    "section7": {
      "secBadge": "Seção 7",
      "title": "7. Pagamentos e acesso digital",
      "p1": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "policyTitle": "7. Pagamentos e acesso digital",
      "policyDesc": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
    },
    "section8": {
      "secBadge": "Seção 8",
      "title": "8. Limitação de responsabilidade",
      "p1": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados.",
      "p2": "Estes Termos regem o acesso e uso da Safi Academy. Por favor, leia atentamente nossos termos operacionais, isenções de responsabilidade educacional e divulgações de afiliados."
    },
    "section9": {
      "secBadge": "Seção 9",
      "title": "9. Lei aplicável e jurisdição",
      "p1": "Jurisdição: Inglaterra e País de Gales",
      "p2": "Jurisdição: Inglaterra e País de Gales"
    },
    "section10": {
      "secBadge": "Seção 10",
      "title": "10. Correspondência jurídica oficial",
      "p1": "Consultas sobre licenciamento da plataforma, parcerias comerciais ou propriedade intelectual.",
      "emailLabel": "Precisa de esclarecimento jurídico?",
      "btn": "Contatar departamento jurídico",
      "relatedTitle": "Documentos relacionados:",
      "privacyPolicy": "Política de privacidade",
      "contactUs": "Fale conosco",
      "deleteAccount": "Exclusão de conta"
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
    "jurisdictionLabel": "管轄区域: イングランドおよびウェールズ",
    "highlights": [
      {
        "title": "純粋な教育・研究目的",
        "desc": "講義や法人設立ガイドは、正式な弁護士・公認会計士・税理士による法的助言ではありません。",
        "badge": "重要免責事項"
      },
      {
        "title": "提携関係の完全な透明性",
        "desc": "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。",
        "badge": "FTC基準準拠"
      },
      {
        "title": "知的財産権の厳格な保護",
        "desc": "すべての講義動画、ソースコードリポジトリ、教育カリキュラムは著作権法により保護されています。",
        "badge": "保護対象資産"
      },
      {
        "title": "公平なアカデミック規律",
        "desc": "アカデミーポイントや栄誉の殿堂ランキングは学習成果を評価するもので、不正操作を排除します。",
        "badge": "プラットフォーム規律"
      }
    ],
    "tocTitle": "目次ナビゲーション",
    "tocCount": "10の法的条項",
    "sections": [
      {
        "id": "agreement",
        "title": "1. 規約の承諾と法人概要"
      },
      {
        "id": "scope",
        "title": "2. 提供サービスの性質と範囲"
      },
      {
        "id": "disclaimer",
        "title": "3. 法律・税務・財務助言の非該当性",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. 提携第三者サービスと報酬開示",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. アカウント管理とアカデミー規律"
      },
      {
        "id": "ip",
        "title": "6. 知的財産権と限定利用許諾"
      },
      {
        "id": "payments",
        "title": "7. 受講料決済とデジタルアクセス"
      },
      {
        "id": "liability",
        "title": "8. 損害賠償責任の制限と補償"
      },
      {
        "id": "governing-law",
        "title": "9. 準拠法および専属的合意管轄"
      },
      {
        "id": "contact",
        "title": "10. 公式法務窓口および通知"
      }
    ],
    "legalHelp": {
      "title": "法的なご質問・ご確認ですか？",
      "desc": "プラットフォームのライセンス、事業提携、知的財産権に関する正式なお問い合わせ。",
      "btn": "法務・コンプライアンス部門へ連絡"
    },
    "section1": {
      "secBadge": "第 1",
      "title": "1. 規約の承諾と法人概要",
      "desc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "opEntityLabel": "運営法人",
      "companyNumLabel": "英国登録番号",
      "hqLabel": "運営法人",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "第 2",
      "title": "2. 提供サービスの性質と範囲",
      "p1": "講義や法人設立ガイドは、正式な弁護士・公認会計士・税理士による法的助言ではありません。",
      "p2": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
    },
    "section3": {
      "secBadge": "第 3 • 重要免責事項",
      "title": "3. 法律・税務・財務助言の非該当性",
      "alert": "講義や法人設立ガイドは、正式な弁護士・公認会計士・税理士による法的助言ではありません。",
      "bullets": [
        "講義や法人設立ガイドは、正式な弁護士・公認会計士・税理士による法的助言ではありません。",
        "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
        "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。"
      ]
    },
    "section4": {
      "secBadge": "第 4 • 第三者提携関係",
      "title": "4. 提携第三者サービスと報酬開示",
      "badge": "FTC基準準拠",
      "p1": "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。",
      "rulesTitle": "4. 提携第三者サービスと報酬開示",
      "rulesBullets": [
        {
          "lead": "FTC基準準拠:",
          "text": "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。"
        },
        {
          "lead": "第三者提携関係:",
          "text": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。"
        },
        {
          "lead": "Compliance:",
          "text": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
        }
      ]
    },
    "section5": {
      "secBadge": "第 5",
      "title": "5. アカウント管理とアカデミー規律",
      "p1": "アカデミーポイントや栄誉の殿堂ランキングは学習成果を評価するもので、不正操作を排除します。",
      "rulesTitle": "公平なアカデミック規律",
      "rulesDesc": "アカデミーポイントや栄誉の殿堂ランキングは学習成果を評価するもので、不正操作を排除します。"
    },
    "section6": {
      "secBadge": "第 6",
      "title": "6. 知的財産権と限定利用許諾",
      "p1": "すべての講義動画、ソースコードリポジトリ、教育カリキュラムは著作権法により保護されています。",
      "p2": "すべての講義動画、ソースコードリポジトリ、教育カリキュラムは著作権法により保護されています。"
    },
    "section7": {
      "secBadge": "第 7",
      "title": "7. 受講料決済とデジタルアクセス",
      "p1": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "policyTitle": "7. 受講料決済とデジタルアクセス",
      "policyDesc": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
    },
    "section8": {
      "secBadge": "第 8",
      "title": "8. 損害賠償責任の制限と補償",
      "p1": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。",
      "p2": "本規約はサフィ・アカデミー（Safi Academy）へのアクセスおよび利用を規定します。運営規約、教育上の免責事項、アフィリエイト開示を十分にご確認ください。"
    },
    "section9": {
      "secBadge": "第 9",
      "title": "9. 準拠法および専属的合意管轄",
      "p1": "管轄区域: イングランドおよびウェールズ",
      "p2": "管轄区域: イングランドおよびウェールズ"
    },
    "section10": {
      "secBadge": "第 10",
      "title": "10. 公式法務窓口および通知",
      "p1": "プラットフォームのライセンス、事業提携、知的財産権に関する正式なお問い合わせ。",
      "emailLabel": "法的なご質問・ご確認ですか？",
      "btn": "法務・コンプライアンス部門へ連絡",
      "relatedTitle": "関連法務文書:",
      "privacyPolicy": "プライバシーポリシー",
      "contactUs": "お問い合わせ",
      "deleteAccount": "アカウント削除申請"
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
    "jurisdictionLabel": "관할 법원: 잉글랜드 및 웨일스",
    "highlights": [
      {
        "title": "순수 교육 및 연구 목적",
        "desc": "본 강좌 및 회사 설립 안내서는 공식적인 법률, 세무 또는 공인회계사 자문이 아닙니다.",
        "badge": "핵심 고지사항"
      },
      {
        "title": "제휴 관계의 투명성",
        "desc": "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다.",
        "badge": "FTC 가이드라인 준수"
      },
      {
        "title": "지적 재산권 보호",
        "desc": "모든 강의 영상, 소스 코드 저장소 및 커리큘럼은 저작권법에 의해 엄격히 보호됩니다.",
        "badge": "독점 보호 자산"
      },
      {
        "title": "공정한 성취 평가",
        "desc": "아카데미 포인트 및 명예의 전당 랭킹은 학업 성취를 나타내며 봇과 부정을 차단합니다.",
        "badge": "에코시스템 규정"
      }
    ],
    "tocTitle": "내비게이션 목차",
    "tocCount": "10개 법률 조항",
    "sections": [
      {
        "id": "agreement",
        "title": "1. 약관 동의 및 법인 개요"
      },
      {
        "id": "scope",
        "title": "2. 서비스 성격 및 제공 범위"
      },
      {
        "id": "disclaimer",
        "title": "3. 법률·세무·재무 자문 부인",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. 제3자 제휴 서비스 및 투명성",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. 계정 보안 및 아카데미 포인트"
      },
      {
        "id": "ip",
        "title": "6. 지적 재산권 및 라이선스"
      },
      {
        "id": "payments",
        "title": "7. 수강료 결제 및 디지털 콘텐츠"
      },
      {
        "id": "liability",
        "title": "8. 책임 제한 및 면책 조항"
      },
      {
        "id": "governing-law",
        "title": "9. 준거법 및 전속 관할 법원"
      },
      {
        "id": "contact",
        "title": "10. 공식 법무 지원 및 통지"
      }
    ],
    "legalHelp": {
      "title": "법적 문의사항이 있으신가요?",
      "desc": "플랫폼 라이선스, 기업 파트너십 또는 지적 재산권에 관한 공식 문의.",
      "btn": "법무팀에 문의하기"
    },
    "section1": {
      "secBadge": "제 1",
      "title": "1. 약관 동의 및 법인 개요",
      "desc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "opEntityLabel": "운영 법인",
      "companyNumLabel": "법인 등록번호",
      "hqLabel": "운영 법인",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "제 2",
      "title": "2. 서비스 성격 및 제공 범위",
      "p1": "본 강좌 및 회사 설립 안내서는 공식적인 법률, 세무 또는 공인회계사 자문이 아닙니다.",
      "p2": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
    },
    "section3": {
      "secBadge": "제 3 • 필수 면책 조항",
      "title": "3. 법률·세무·재무 자문 부인",
      "alert": "본 강좌 및 회사 설립 안내서는 공식적인 법률, 세무 또는 공인회계사 자문이 아닙니다.",
      "bullets": [
        "본 강좌 및 회사 설립 안내서는 공식적인 법률, 세무 또는 공인회계사 자문이 아닙니다.",
        "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
        "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다."
      ]
    },
    "section4": {
      "secBadge": "제 4 • 제3자 서비스 관계",
      "title": "4. 제3자 제휴 서비스 및 투명성",
      "badge": "FTC 가이드라인 준수",
      "p1": "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다.",
      "rulesTitle": "4. 제3자 제휴 서비스 및 투명성",
      "rulesBullets": [
        {
          "lead": "FTC 가이드라인 준수:",
          "text": "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다."
        },
        {
          "lead": "제3자 서비스 관계:",
          "text": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다."
        },
        {
          "lead": "Compliance:",
          "text": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
        }
      ]
    },
    "section5": {
      "secBadge": "제 5",
      "title": "5. 계정 보안 및 아카데미 포인트",
      "p1": "아카데미 포인트 및 명예의 전당 랭킹은 학업 성취를 나타내며 봇과 부정을 차단합니다.",
      "rulesTitle": "공정한 성취 평가",
      "rulesDesc": "아카데미 포인트 및 명예의 전당 랭킹은 학업 성취를 나타내며 봇과 부정을 차단합니다."
    },
    "section6": {
      "secBadge": "제 6",
      "title": "6. 지적 재산권 및 라이선스",
      "p1": "모든 강의 영상, 소스 코드 저장소 및 커리큘럼은 저작권법에 의해 엄격히 보호됩니다.",
      "p2": "모든 강의 영상, 소스 코드 저장소 및 커리큘럼은 저작권법에 의해 엄격히 보호됩니다."
    },
    "section7": {
      "secBadge": "제 7",
      "title": "7. 수강료 결제 및 디지털 콘텐츠",
      "p1": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "policyTitle": "7. 수강료 결제 및 디지털 콘텐츠",
      "policyDesc": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
    },
    "section8": {
      "secBadge": "제 8",
      "title": "8. 책임 제한 및 면책 조항",
      "p1": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다.",
      "p2": "본 약관은 사피 아카데미(Safi Academy) 이용을 규율합니다. 플랫폼 운영 조건, 교육 관련 고지 및 제휴 공개 사항을 면밀히 검토해 주시기 바랍니다."
    },
    "section9": {
      "secBadge": "제 9",
      "title": "9. 준거법 및 전속 관할 법원",
      "p1": "관할 법원: 잉글랜드 및 웨일스",
      "p2": "관할 법원: 잉글랜드 및 웨일스"
    },
    "section10": {
      "secBadge": "제 10",
      "title": "10. 공식 법무 지원 및 통지",
      "p1": "플랫폼 라이선스, 기업 파트너십 또는 지적 재산권에 관한 공식 문의.",
      "emailLabel": "법적 문의사항이 있으신가요?",
      "btn": "법무팀에 문의하기",
      "relatedTitle": "관련 법률 문서:",
      "privacyPolicy": "개인정보 처리방침",
      "contactUs": "고객지원 문의",
      "deleteAccount": "계정 영구 삭제"
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
    "jurisdictionLabel": "Jurisdictie: Engeland & Wales",
    "highlights": [
      {
        "title": "Uitsluitend educatief",
        "desc": "Cursussen en bedrijfsoprichtingsgidsen vormen GEEN formeel juridisch, fiscaal of accountantsadvies.",
        "badge": "Belangrijke mededeling"
      },
      {
        "title": "Transparantie in affiliatie",
        "desc": "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc.",
        "badge": "FTC-conform"
      },
      {
        "title": "Beschermd intellectueel eigendom",
        "desc": "Alle video's, broncode-repositories en leerplannen vallen onder strikt auteursrecht.",
        "badge": "Beschermde activa"
      },
      {
        "title": "Eerlijke ranglijstregels",
        "desc": "Academiepunten en Wall of Fame-ranglijsten hebben academische waarde en zijn beschermd tegen bots.",
        "badge": "Platformregels"
      }
    ],
    "tocTitle": "Navigatie-index",
    "tocCount": "10 juridische artikelen",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Aanvaarding van voorwaarden & entiteit"
      },
      {
        "id": "scope",
        "title": "2. Aard en reikwijdte van diensten"
      },
      {
        "id": "disclaimer",
        "title": "3. Geen juridisch/fiscaal advies",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Externe diensten & partners",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Gebruikersaccounts & gamification"
      },
      {
        "id": "ip",
        "title": "6. Intellectueel eigendom & licentie"
      },
      {
        "id": "payments",
        "title": "7. Betalingen & digitale toegang"
      },
      {
        "id": "liability",
        "title": "8. Beperking van aansprakelijkheid"
      },
      {
        "id": "governing-law",
        "title": "9. Toepasselijk recht & rechtbanken"
      },
      {
        "id": "contact",
        "title": "10. Juridische correspondentie"
      }
    ],
    "legalHelp": {
      "title": "Juridische verduidelijking nodig?",
      "desc": "Vragen over platformlicenties, zakelijke partnerschappen of intellectueel eigendom.",
      "btn": "Contact opnemen met juridische afdeling"
    },
    "section1": {
      "secBadge": "Artikel 1",
      "title": "1. Aanvaarding van voorwaarden & entiteit",
      "desc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "opEntityLabel": "Rechtsentiteit",
      "companyNumLabel": "Reg. nr.",
      "hqLabel": "Rechtsentiteit",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Artikel 2",
      "title": "2. Aard en reikwijdte van diensten",
      "p1": "Cursussen en bedrijfsoprichtingsgidsen vormen GEEN formeel juridisch, fiscaal of accountantsadvies.",
      "p2": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
    },
    "section3": {
      "secBadge": "Artikel 3 • Essentiële disclaimer",
      "title": "3. Geen juridisch/fiscaal advies",
      "alert": "Cursussen en bedrijfsoprichtingsgidsen vormen GEEN formeel juridisch, fiscaal of accountantsadvies.",
      "bullets": [
        "Cursussen en bedrijfsoprichtingsgidsen vormen GEEN formeel juridisch, fiscaal of accountantsadvies.",
        "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
        "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Artikel 4 • Derdenrelaties",
      "title": "4. Externe diensten & partners",
      "badge": "FTC-conform",
      "p1": "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc.",
      "rulesTitle": "4. Externe diensten & partners",
      "rulesBullets": [
        {
          "lead": "FTC-conform:",
          "text": "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc."
        },
        {
          "lead": "Derdenrelaties:",
          "text": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
        }
      ]
    },
    "section5": {
      "secBadge": "Artikel 5",
      "title": "5. Gebruikersaccounts & gamification",
      "p1": "Academiepunten en Wall of Fame-ranglijsten hebben academische waarde en zijn beschermd tegen bots.",
      "rulesTitle": "Eerlijke ranglijstregels",
      "rulesDesc": "Academiepunten en Wall of Fame-ranglijsten hebben academische waarde en zijn beschermd tegen bots."
    },
    "section6": {
      "secBadge": "Artikel 6",
      "title": "6. Intellectueel eigendom & licentie",
      "p1": "Alle video's, broncode-repositories en leerplannen vallen onder strikt auteursrecht.",
      "p2": "Alle video's, broncode-repositories en leerplannen vallen onder strikt auteursrecht."
    },
    "section7": {
      "secBadge": "Artikel 7",
      "title": "7. Betalingen & digitale toegang",
      "p1": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "policyTitle": "7. Betalingen & digitale toegang",
      "policyDesc": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
    },
    "section8": {
      "secBadge": "Artikel 8",
      "title": "8. Beperking van aansprakelijkheid",
      "p1": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door.",
      "p2": "Deze voorwaarden zijn van toepassing op uw toegang tot Safi Academy. Lees onze operationele bepalingen, onderwijsdisclaimers en affiliate-openbaarmakingen zorgvuldig door."
    },
    "section9": {
      "secBadge": "Artikel 9",
      "title": "9. Toepasselijk recht & rechtbanken",
      "p1": "Jurisdictie: Engeland & Wales",
      "p2": "Jurisdictie: Engeland & Wales"
    },
    "section10": {
      "secBadge": "Artikel 10",
      "title": "10. Juridische correspondentie",
      "p1": "Vragen over platformlicenties, zakelijke partnerschappen of intellectueel eigendom.",
      "emailLabel": "Juridische verduidelijking nodig?",
      "btn": "Contact opnemen met juridische afdeling",
      "relatedTitle": "Gerelateerde documenten:",
      "privacyPolicy": "Privacybeleid",
      "contactUs": "Contact opnemen",
      "deleteAccount": "Account verwijderen"
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
    "jurisdictionLabel": "Yurisdiksiya: Angliya va Uels",
    "highlights": [
      {
        "title": "Mutlaqo ta’limiy maqsad",
        "desc": "Kurslar va kompaniya ochish qo‘llanmalari rasmiy yuridik yoki soliq maslahati hisoblanmaydi.",
        "badge": "Muhim ogohlantirish"
      },
      {
        "title": "Hamkorlik shaffofligi",
        "desc": "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish.",
        "badge": "FTC talablariga mos"
      },
      {
        "title": "Himoyalangan mualliflik huquqi",
        "desc": "Barcha video darslar, dasturiy kod omborlari va o‘quv rejalari qat’iy mualliflik huquqi ostidadir.",
        "badge": "Himoyalangan mulk"
      },
      {
        "title": "Adolatli reyting tizimi",
        "desc": "Akademiya ballari va Shon-sharaf doskasi o‘quv yutuqlarini aks ettiradi va botlardan himoyalangan.",
        "badge": "Tizim qoidalari"
      }
    ],
    "tocTitle": "Mundarija",
    "tocCount": "10 ta yuridik modda",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Shartlarni qabul qilish va yuridik shaxs"
      },
      {
        "id": "scope",
        "title": "2. Xizmatlarning xususiyati va qamrovi"
      },
      {
        "id": "disclaimer",
        "title": "3. Huquqiy/soliq maslahati berilmasligi",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Uchinchi tomon va hamkorlik shartlari",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Foydalanuvchi hisoblari va ballar"
      },
      {
        "id": "ip",
        "title": "6. Intellektual mulk va litsenziya"
      },
      {
        "id": "payments",
        "title": "7. To‘lovlar va raqamli kirish"
      },
      {
        "id": "liability",
        "title": "8. Javobgarlikni cheklash"
      },
      {
        "id": "governing-law",
        "title": "9. Qo‘llaniladigan huquq va sudlar"
      },
      {
        "id": "contact",
        "title": "10. Rasmiy huquqiy aloqalar"
      }
    ],
    "legalHelp": {
      "title": "Huquqiy tushuntirish kerakmi?",
      "desc": "Litsenziyalash, tijoriy hamkorlik yoki intellektual mulk huquqlari bo‘yicha so‘rovlar.",
      "btn": "Yuridik bo‘lim bilan bog‘lanish"
    },
    "section1": {
      "secBadge": "Modda 1",
      "title": "1. Shartlarni qabul qilish va yuridik shaxs",
      "desc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "opEntityLabel": "Yuridik shaxs",
      "companyNumLabel": "Ro‘yxat raqami",
      "hqLabel": "Yuridik shaxs",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Modda 2",
      "title": "2. Xizmatlarning xususiyati va qamrovi",
      "p1": "Kurslar va kompaniya ochish qo‘llanmalari rasmiy yuridik yoki soliq maslahati hisoblanmaydi.",
      "p2": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
    },
    "section3": {
      "secBadge": "Modda 3 • Muhim ogohlantirish",
      "title": "3. Huquqiy/soliq maslahati berilmasligi",
      "alert": "Kurslar va kompaniya ochish qo‘llanmalari rasmiy yuridik yoki soliq maslahati hisoblanmaydi.",
      "bullets": [
        "Kurslar va kompaniya ochish qo‘llanmalari rasmiy yuridik yoki soliq maslahati hisoblanmaydi.",
        "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
        "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish."
      ]
    },
    "section4": {
      "secBadge": "Modda 4 • Uchinchi tomon munosabatlari",
      "title": "4. Uchinchi tomon va hamkorlik shartlari",
      "badge": "FTC talablariga mos",
      "p1": "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish.",
      "rulesTitle": "4. Uchinchi tomon va hamkorlik shartlari",
      "rulesBullets": [
        {
          "lead": "FTC talablariga mos:",
          "text": "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish."
        },
        {
          "lead": "Uchinchi tomon munosabatlari:",
          "text": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish."
        },
        {
          "lead": "Compliance:",
          "text": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
        }
      ]
    },
    "section5": {
      "secBadge": "Modda 5",
      "title": "5. Foydalanuvchi hisoblari va ballar",
      "p1": "Akademiya ballari va Shon-sharaf doskasi o‘quv yutuqlarini aks ettiradi va botlardan himoyalangan.",
      "rulesTitle": "Adolatli reyting tizimi",
      "rulesDesc": "Akademiya ballari va Shon-sharaf doskasi o‘quv yutuqlarini aks ettiradi va botlardan himoyalangan."
    },
    "section6": {
      "secBadge": "Modda 6",
      "title": "6. Intellektual mulk va litsenziya",
      "p1": "Barcha video darslar, dasturiy kod omborlari va o‘quv rejalari qat’iy mualliflik huquqi ostidadir.",
      "p2": "Barcha video darslar, dasturiy kod omborlari va o‘quv rejalari qat’iy mualliflik huquqi ostidadir."
    },
    "section7": {
      "secBadge": "Modda 7",
      "title": "7. To‘lovlar va raqamli kirish",
      "p1": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "policyTitle": "7. To‘lovlar va raqamli kirish",
      "policyDesc": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
    },
    "section8": {
      "secBadge": "Modda 8",
      "title": "8. Javobgarlikni cheklash",
      "p1": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing.",
      "p2": "Ushbu shartlar Safi Academy dan foydalanishingizni belgilaydi. Iltimos, ta’limga oid ogohlantirishlar va hamkorlik shartlarini diqqat bilan o‘rganib chiqing."
    },
    "section9": {
      "secBadge": "Modda 9",
      "title": "9. Qo‘llaniladigan huquq va sudlar",
      "p1": "Yurisdiksiya: Angliya va Uels",
      "p2": "Yurisdiksiya: Angliya va Uels"
    },
    "section10": {
      "secBadge": "Modda 10",
      "title": "10. Rasmiy huquqiy aloqalar",
      "p1": "Litsenziyalash, tijoriy hamkorlik yoki intellektual mulk huquqlari bo‘yicha so‘rovlar.",
      "emailLabel": "Huquqiy tushuntirish kerakmi?",
      "btn": "Yuridik bo‘lim bilan bog‘lanish",
      "relatedTitle": "Tegishli hujjatlar:",
      "privacyPolicy": "Maxfiylik siyosati",
      "contactUs": "Bog‘lanish",
      "deleteAccount": "Hisobni o‘chirish"
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
    "jurisdictionLabel": "Yurisdiksi: Inggris & Wales",
    "highlights": [
      {
        "title": "Murni Bersifat Edukasi",
        "desc": "Kursus dan panduan pendirian perusahaan BUKAN merupakan nasihat hukum, pajak, atau akuntan resmi.",
        "badge": "Pemberitahuan Penting"
      },
      {
        "title": "Transparansi Afiliasi",
        "desc": "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc.",
        "badge": "Sesuai Aturan FTC"
      },
      {
        "title": "Kekayaan Intelektual Terlindungi",
        "desc": "Semua kurikulum video, repositori kode sumber, dan silabus dilindungi hak cipta secara ketat.",
        "badge": "Aset Terlindungi"
      },
      {
        "title": "Gamifikasi yang Adil",
        "desc": "Poin Akademi dan peringkat Wall of Fame bernilai akademis dan dilindungi dari manipulasi bot.",
        "badge": "Aturan Ekosistem"
      }
    ],
    "tocTitle": "Indeks Navigasi",
    "tocCount": "10 Pasal Hukum",
    "sections": [
      {
        "id": "agreement",
        "title": "1. Penerimaan Ketentuan & Entitas Hukum"
      },
      {
        "id": "scope",
        "title": "2. Sifat dan Cakupan Layanan"
      },
      {
        "id": "disclaimer",
        "title": "3. Bukan Nasihat Hukum/Pajak",
        "isWarning": true
      },
      {
        "id": "affiliates",
        "title": "4. Layanan Pihak Ketiga & Afiliasi",
        "isHighlight": true
      },
      {
        "id": "accounts",
        "title": "5. Akun Pengguna & Poin Akademi"
      },
      {
        "id": "ip",
        "title": "6. Kekayaan Intelektual & Lisensi"
      },
      {
        "id": "payments",
        "title": "7. Pembayaran & Akses Digital"
      },
      {
        "id": "liability",
        "title": "8. Batasan Tanggung Jawab & Ganti Rugi"
      },
      {
        "id": "governing-law",
        "title": "9. Hukum yang Mengatur & Yurisdiksi"
      },
      {
        "id": "contact",
        "title": "10. Korespondensi Hukum Resmi"
      }
    ],
    "legalHelp": {
      "title": "Butuh Klarifikasi Hukum?",
      "desc": "Pertanyaan mengenai lisensi platform, kemitraan komersial, atau hak kekayaan intelektual.",
      "btn": "Hubungi Departemen Hukum"
    },
    "section1": {
      "secBadge": "Pasal 1",
      "title": "1. Penerimaan Ketentuan & Entitas Hukum",
      "desc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "opEntityLabel": "Entitas Hukum",
      "companyNumLabel": "No. Registrasi",
      "hqLabel": "Entitas Hukum",
      "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
    },
    "section2": {
      "secBadge": "Pasal 2",
      "title": "2. Sifat dan Cakupan Layanan",
      "p1": "Kursus dan panduan pendirian perusahaan BUKAN merupakan nasihat hukum, pajak, atau akuntan resmi.",
      "p2": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
    },
    "section3": {
      "secBadge": "Pasal 3 • Pernyataan Penting",
      "title": "3. Bukan Nasihat Hukum/Pajak",
      "alert": "Kursus dan panduan pendirian perusahaan BUKAN merupakan nasihat hukum, pajak, atau akuntan resmi.",
      "bullets": [
        "Kursus dan panduan pendirian perusahaan BUKAN merupakan nasihat hukum, pajak, atau akuntan resmi.",
        "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
        "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc."
      ]
    },
    "section4": {
      "secBadge": "Pasal 4 • Hubungan Pihak Ketiga",
      "title": "4. Layanan Pihak Ketiga & Afiliasi",
      "badge": "Sesuai Aturan FTC",
      "p1": "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc.",
      "rulesTitle": "4. Layanan Pihak Ketiga & Afiliasi",
      "rulesBullets": [
        {
          "lead": "Sesuai Aturan FTC:",
          "text": "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc."
        },
        {
          "lead": "Hubungan Pihak Ketiga:",
          "text": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        }
      ],
      "adTitle": "Google AdSense & Digital Advertising",
      "adBullets": [
        {
          "lead": "Display:",
          "text": "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc."
        },
        {
          "lead": "Compliance:",
          "text": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
        }
      ]
    },
    "section5": {
      "secBadge": "Pasal 5",
      "title": "5. Akun Pengguna & Poin Akademi",
      "p1": "Poin Akademi dan peringkat Wall of Fame bernilai akademis dan dilindungi dari manipulasi bot.",
      "rulesTitle": "Gamifikasi yang Adil",
      "rulesDesc": "Poin Akademi dan peringkat Wall of Fame bernilai akademis dan dilindungi dari manipulasi bot."
    },
    "section6": {
      "secBadge": "Pasal 6",
      "title": "6. Kekayaan Intelektual & Lisensi",
      "p1": "Semua kurikulum video, repositori kode sumber, dan silabus dilindungi hak cipta secara ketat.",
      "p2": "Semua kurikulum video, repositori kode sumber, dan silabus dilindungi hak cipta secara ketat."
    },
    "section7": {
      "secBadge": "Pasal 7",
      "title": "7. Pembayaran & Akses Digital",
      "p1": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "policyTitle": "7. Pembayaran & Akses Digital",
      "policyDesc": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
    },
    "section8": {
      "secBadge": "Pasal 8",
      "title": "8. Batasan Tanggung Jawab & Ganti Rugi",
      "p1": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat.",
      "p2": "Ketentuan ini mengatur akses dan penggunaan Safi Academy oleh Anda. Harap tinjau ketentuan operasional, sanggahan edukasi, dan pengungkapan afiliasi kami dengan cermat."
    },
    "section9": {
      "secBadge": "Pasal 9",
      "title": "9. Hukum yang Mengatur & Yurisdiksi",
      "p1": "Yurisdiksi: Inggris & Wales",
      "p2": "Yurisdiksi: Inggris & Wales"
    },
    "section10": {
      "secBadge": "Pasal 10",
      "title": "10. Korespondensi Hukum Resmi",
      "p1": "Pertanyaan mengenai lisensi platform, kemitraan komersial, atau hak kekayaan intelektual.",
      "emailLabel": "Butuh Klarifikasi Hukum?",
      "btn": "Hubungi Departemen Hukum",
      "relatedTitle": "Dokumen Terkait:",
      "privacyPolicy": "Kebijakan Privasi",
      "contactUs": "Hubungi Kami",
      "deleteAccount": "Penghapusan Akun"
    }
  }
};

export function getTermsTranslation(locale: string): TermsTranslation {
  const norm = (locale || "en").toLowerCase();
  return termsTranslations[norm] || termsTranslations.en;
}
