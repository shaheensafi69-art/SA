// ============================================================================
// CONTACT PAGE 19-LANGUAGE COMPREHENSIVE TRANSLATIONS
// ============================================================================

export interface ContactSubjectItem {
  label: string;
  value: string;
}

export interface ContactDeskItem {
  title: string;
  sla: string;
  desc: string;
  coverage: string[];
}

export interface ContactSlaItem {
  channel: string;
  speed: string;
  status: string;
  availability: string;
}

export interface ContactFaqItem {
  q: string;
  a: string;
}

export interface ContactTranslation {
  badge: string;
  heroTitle: string;
  heroSub: string;
  statSlaNumber: string;
  statSlaLabel: string;
  statSecureNumber: string;
  statSecureLabel: string;
  statSecureSub: string;
  statHqNumber: string;
  statHqSub: string;
  statDesksNumber: string;
  statDesksLabel: string;
  statDesksSub: string;
  dispatchCardTitle: string;
  dispatchCardSub: string;
  quickRoutingLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  subjectLabel: string;
  presetSelected: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitBtn: string;
  sendingBtn: string;
  successTitle: string;
  successDesc: string;
  errorTitle: string;
  errorDesc: string;
  subjects: ContactSubjectItem[];
  routingSectionBadge: string;
  routingSectionTitle: string;
  routingSectionSub: string;
  desks: ContactDeskItem[];
  slaSectionBadge: string;
  slaSectionTitle: string;
  slaSectionSub: string;
  slaItems: ContactSlaItem[];
  faqSectionBadge: string;
  faqSectionTitle: string;
  faqSectionSub: string;
  faqs: ContactFaqItem[];
  selfServeBadge: string;
  selfServeTitle: string;
  selfServeSub: string;
  selfServeCourses: string;
  selfServeScholarships: string;
  selfServeServices: string;
  selfServePartners: string;
}

export const contactTranslationsMap: Record<string, ContactTranslation> = {
  "en": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application Tier-1, Web3 Platform Scoping...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "fa": {
    "badge": "ارتباطات مستقیم بین‌المللی",
    "heroTitle": "استعلامات سازمانی و پشتیبانی مستقیم",
    "heroSub": "ارتباط با دفتر مرکزی لندن، دپارتمان پذیرش بورسیه و تیم مهندسی راهکارهای سازمانی آکادمی صافی.",
    "statSlaNumber": "کمتر از ۴ ساعت",
    "statSlaLabel": "پاسخگویی سریع اولویت‌دار",
    "statSecureNumber": "۱۰۰٪ امن",
    "statSecureLabel": "حریم خصوصی کامل",
    "statSecureSub": "مطابق با استانداردهای GDPR و DPA بریتانیا",
    "statHqNumber": "لندن، بریتانیا",
    "statHqSub": "شماره ثبت رسمی: 17063286",
    "statDesksNumber": "۵ دپارتمان",
    "statDesksLabel": "ارتباط تخصصی",
    "statDesksSub": "مشاوران مستقیم هر حوزه",
    "dispatchCardTitle": "ارسال پیام رسمی و محرمانه",
    "dispatchCardSub": "مشخصات خود را تکمیل نمایید. پیام شما مستقیماً به ترمینال مرکزی با قابلیت رهگیری لحظه‌ای ارسال می‌گردد.",
    "quickRoutingLabel": "مسیریابی سریع دپارتمان‌ها (کلیک جهت انتخاب خودکار):",
    "nameLabel": "نام و نام خانوادگی",
    "namePlaceholder": "مثال: احمد رضایی",
    "emailLabel": "آدرس ایمیل سازمانی",
    "subjectLabel": "دپارتمان مربوطه",
    "presetSelected": "پیش‌فرض انتخاب شد",
    "subjectPlaceholder": "مثال: درخواست بورسیه، استعلام پروژه سازمانی...",
    "messageLabel": "شرح پیام / پیشنهاد همکاری",
    "messagePlaceholder": "جزئیات درخواست، مدارک یا پیشنهادات خود را کامل بنویسید...",
    "submitBtn": "ارسال امن پیام رسمی",
    "sendingBtn": "در حال ارسال به ترمینال عملیات...",
    "successTitle": "پیام با موفقیت ثبت و ارسال شد",
    "successDesc": "پیام شما به ترمینال عملیاتی لندن واصل شد. کارشناسان ما ظرف ۲ الی ۴ ساعت کاری پاسخ خواهند داد.",
    "errorTitle": "خطا در ارسال پیام",
    "errorDesc": "خطای شبکه رخ داد. لطفاً مستقیماً از طریق واتس‌اپ یا تلگرام با ما تماس بگیرید.",
    "subjects": [
      {
        "label": "🎓 بورسیه و پذیرش تحصیلی",
        "value": "استعلام بورسیه و پذیرش"
      },
      {
        "label": "💻 نرم‌افزار سازمانی و تکنولوژی",
        "value": "استعلام نرم‌افزار سازمانی و توسعه"
      },
      {
        "label": "🤝 مشارکت و همکاری استراتژیک",
        "value": "پیشنهاد مشارکت استراتژیک"
      },
      {
        "label": "⚡ پشتیبانی دانشجویی و پورتال",
        "value": "پشتیبانی فنی پورتال و دانشجویان"
      },
      {
        "label": "💖 گرنت و کمک‌های بشردوستانه",
        "value": "استعلام گرنت و کمک‌های خیریه"
      }
    ],
    "routingSectionBadge": "مسیریابی دقیق دپارتمان‌ها",
    "routingSectionTitle": "نحوه بررسی و دسته‌بندی پیام شما",
    "routingSectionSub": "ما از صف‌های تیکت عمومی استفاده نمی‌کنیم. هر پیام ورودی مستقیماً توسط مدیر ارشد دپارتمان مربوطه بررسی می‌شود.",
    "desks": [
      {
        "title": "دپارتمان آموزش و بورسیه تحصیلی",
        "sla": "پاسخگویی کمتر از ۴ ساعت",
        "desc": "بررسی سوابق داوطلبان، ارزیابی واجدین شرایط بورسیه ۱۰۰٪، مدارک تحصیلی و پیش‌نیازهای ورود به دوره‌ها.",
        "coverage": [
          "ارزیابی شرایط اخذ بورسیه",
          "بررسی سرفصل و برنامه‌های آموزشی",
          "تایید ریزنمرات و مدارک",
          "ثبت‌نام مستقیم داوطلبان"
        ]
      },
      {
        "title": "راهکارهای مهندسی نرم‌افزار سازمانی",
        "sla": "پاسخگویی کمتر از ۲ ساعت",
        "desc": "کانال اختصاصی برای استارتاپ‌ها، بانک‌ها و شرکت‌هایی که پروژه‌های مهم نرم‌افزاری و وب۳ را واگذار می‌کنند.",
        "coverage": [
          "تحلیل معماری و امنیت سیستم",
          "ارائه پروپوزال‌های اختصاصی سازمانی",
          "تامین توسعه‌دهندگان ارشد",
          "انعقاد قراردادهای عدم افشا و SLA"
        ]
      },
      {
        "title": "اتحادها و همکاری‌های بین‌المللی",
        "sla": "پاسخگویی کمتر از ۱۲ ساعت",
        "desc": "میز ارتباطی مدیریت ارشد با دانشگاه‌ها، وزارتخانه‌ها، نهادهای غیردولتی و سازمان‌های اعتباربخشی.",
        "coverage": [
          "همکاری‌های مدرک دوگانه دانشگاهی",
          "برنامه‌های مهارت‌آموزی منطقه‌ای",
          "حمایت‌های خیریه و مالی سازمانی",
          "پروتکل‌های حقوقی و اجرایی مشترک"
        ]
      }
    ],
    "slaSectionBadge": "تعهد سازمانی و شفافیت",
    "slaSectionTitle": "ماتریس سطح تعهد خدمات (SLA)",
    "slaSectionSub": "ما استانداردهای دقیقی برای زمان پاسخگویی داریم تا هیچ درخواستی بی‌پاسخ نماند. در زیر زمان‌بندی پاسخگویی در هر کانال آمده است.",
    "slaItems": [
      {
        "channel": "ترمینال وب‌سایت رسمی",
        "speed": "کمتر از ۴ ساعت",
        "status": "تضمین‌شده",
        "availability": "میز عملیاتی ۲۴/۷"
      },
      {
        "channel": "میز اختصاصی تلگرام",
        "speed": "کمتر از ۱۵ دقیقه",
        "status": "پاسخ فوری",
        "availability": "همه‌روزه ۰۷:۰۰ الی ۲۳:۰۰ GMT"
      },
      {
        "channel": "واتس‌اپ پذیرش دانشجویان",
        "speed": "کمتر از ۳۰ دقیقه",
        "status": "فعال",
        "availability": "همه‌روزه ۰۸:۰۰ الی ۲۲:۰۰ GMT"
      },
      {
        "channel": "ایمیل حقوقی و اداری",
        "speed": "کمتر از ۲۴ ساعت",
        "status": "رسمی",
        "availability": "دوشنبه تا جمعه ساعات کاری"
      }
    ],
    "faqSectionBadge": "شفاف‌سازی سوالات",
    "faqSectionTitle": "پاسخ به سوالات متداول",
    "faqSectionSub": "دستورالعمل‌های ضروری در خصوص جلسات، استعلام سازمانی و پروتکل‌های ارتباطی.",
    "faqs": [
      {
        "q": "پیام من با چه سرعتی بررسی و پاسخ داده می‌شود؟",
        "a": "کلیه پیام‌های ارسالی از طریق ترمینال وب فورا شماره پیگیری دریافت کرده و ظرف ۲ الی ۴ ساعت کاری توسط مدیر مربوطه بررسی می‌شوند."
      },
      {
        "q": "آیا امکان برگزاری جلسه مشاوره ویدیویی آنلاین وجود دارد؟",
        "a": "بله؛ مشتریان سازمانی، شرکای تجاری و داوطلبان برگزیده بورسیه لینک اختصاصی گوگل میت یا زوم دریافت خواهند کرد."
      },
      {
        "q": "آیا مدارک و پیشنهادات ارسالی تحت قوانین محرمانگی محافظت می‌شوند؟",
        "a": "کاملاً. کلیه اطلاعات ارسالی با پروتکل TLS 1.3 رمزنگاری شده و تحت پوشش قوانین GDPR بریتانیا کاملاً محرمانه تلقی می‌گردد."
      },
      {
        "q": "سریع‌ترین روش برای دریافت پشتیبانی آموزشی و دانشجویی کدام است؟",
        "a": "کانال‌های واتس‌اپ و تلگرام رسمی آکادمی با میانگین زمان پاسخگویی ۱۵ تا ۳۰ دقیقه سریع‌ترین گزینه برای رفع ابهامات هستند."
      }
    ],
    "selfServeBadge": "پورتال‌های مستقیم و خودکار",
    "selfServeTitle": "دسترسی مستقیم و فوری بدون انتظار",
    "selfServeSub": "اگر به دنبال ثبت‌نام در دوره‌ها، درخواست بورسیه یا مشاهده نمونه کارها هستید، نیازی به انتظار برای پاسخ ندارید:",
    "selfServeCourses": "مشاهده تمام دوره‌ها",
    "selfServeScholarships": "درخواست بورسیه تحصیلی",
    "selfServeServices": "خدمات مهندسی نرم‌افزار",
    "selfServePartners": "شرکای بین‌المللی"
  },
  "ps": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "ru": {
    "badge": "Прямая глобальная связь",
    "heroTitle": "Официальные запросы и прямая поддержка",
    "heroSub": "Свяжитесь с нашей штаб-квартирой в Лондоне, приемной комиссией и отделом корпоративных решений.",
    "statSlaNumber": "< 4 часов",
    "statSlaLabel": "Приоритетная обработка",
    "statSecureNumber": "100% защита",
    "statSecureLabel": "Полная конфиденциальность",
    "statSecureSub": "Соответствие GDPR и UK DPA",
    "statHqNumber": "Лондон, Великобритания",
    "statHqSub": "Рег. номер: 17063286",
    "statDesksNumber": "5 отделов",
    "statDesksLabel": "Специализированная маршрутизация",
    "statDesksSub": "Прямые консультанты по направлениям",
    "dispatchCardTitle": "Отправить официальное сообщение",
    "dispatchCardSub": "Заполните форму ниже. Ваше обращение моментально поступает в центральный операционный центр.",
    "quickRoutingLabel": "Быстрый выбор темы (нажмите для автозаполнения):",
    "nameLabel": "Полное имя",
    "namePlaceholder": "например: Александр Морозов",
    "emailLabel": "Корпоративный e-mail",
    "subjectLabel": "Тема обращения",
    "presetSelected": "Выбран шаблон",
    "subjectPlaceholder": "например: Заявка на стипендию, корпоративный софт...",
    "messageLabel": "Текст сообщения / Предложение",
    "messagePlaceholder": "Опишите цель обращения, технические требования или академические достижения...",
    "submitBtn": "Отправить защищенное сообщение",
    "sendingBtn": "Перенаправление в операционный центр...",
    "successTitle": "Сообщение успешно отправлено",
    "successDesc": "Ваше обращение передано в лондонский операционный центр. Ответ будет предоставлен в течение 2-4 рабочих часов.",
    "errorTitle": "Сбой передачи",
    "errorDesc": "Сетевая ошибка. Пожалуйста, напишите нам напрямую в WhatsApp или Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Точная маршрутизация запросов",
    "routingSectionTitle": "Как обрабатывается ваше обращение",
    "routingSectionSub": "Мы не используем общие очереди. Каждое сообщение направляется руководителю соответствующего направления.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Ответственность и прозрачность",
    "slaSectionTitle": "Соглашение об уровне сервиса (SLA)",
    "slaSectionSub": "Мы соблюдаем строгие стандарты времени отклика по каждому каналу связи.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Частые вопросы",
    "faqSectionTitle": "Ответы на популярные вопросы",
    "faqSectionSub": "Важные правила назначения встреч, проверки компаний и протоколов связи.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Порталы самообслуживания",
    "selfServeTitle": "Хотите получить информацию мгновенно?",
    "selfServeSub": "Вам не нужно ждать ответа, чтобы ознакомиться с курсами, подать заявку на стипендию или посмотреть портфолио:",
    "selfServeCourses": "Все курсы",
    "selfServeScholarships": "Подать на стипендию",
    "selfServeServices": "Разработка ПО",
    "selfServePartners": "Международные партнеры"
  },
  "tr": {
    "badge": "Küresel Doğrudan İletişim",
    "heroTitle": "Kurumsal Talepler ve Doğrudan Destek",
    "heroSub": "Londra genel merkezimize, burs kabul birimimize ve kurumsal teknoloji ekiplerimize ulaşın.",
    "statSlaNumber": "< 4 Saat",
    "statSlaLabel": "Öncelikli yanıt süresi",
    "statSecureNumber": "%100 Güvenli",
    "statSecureLabel": "Uçtan Uca Gizlilik",
    "statSecureSub": "UK GDPR & DPA uyumlu",
    "statHqNumber": "Londra, Birleşik Krallık",
    "statHqSub": "Kayıt No: 17063286",
    "statDesksNumber": "5 Departman",
    "statDesksLabel": "Uzman Yönlendirme",
    "statDesksSub": "Doğrudan alan danışmanları",
    "dispatchCardTitle": "Resmi Mesaj Gönderin",
    "dispatchCardSub": "Aşağıdaki formu doldurun. Başvurunuz gerçek zamanlı takip ile Londra operasyon merkezimize iletilir.",
    "quickRoutingLabel": "Hızlı Departman Seçimi (Konuyu otomatik doldurmak için tıklayın):",
    "nameLabel": "Ad ve Soyad",
    "namePlaceholder": "ör. Mehmet Yılmaz",
    "emailLabel": "Resmi E-posta Adresi",
    "subjectLabel": "İlgili Departman",
    "presetSelected": "Şablon Seçildi",
    "subjectPlaceholder": "ör. Burs Başvurusu, Kurumsal Yazılım...",
    "messageLabel": "Detaylı Mesaj / Teklif",
    "messagePlaceholder": "Talebinizi, hedeflerinizi ve proje detaylarınızı eksiksiz belirtin...",
    "submitBtn": "Güvenli Mesaj Gönder",
    "sendingBtn": "Operasyon merkezine iletiliyor...",
    "successTitle": "Mesaj Başarıyla İletildi",
    "successDesc": "Talebiniz Londra operasyon merkezimize ulaştı. 2-4 iş saati içinde dönüş yapılacaktır.",
    "errorTitle": "İletim Kesintiye Uğradı",
    "errorDesc": "Ağ hatası oluştu. Lütfen doğrudan WhatsApp veya Telegram üzerinden ulaşın.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Hassas Departman Yönlendirmesi",
    "routingSectionTitle": "Mesajınız Nasıl İncelenir?",
    "routingSectionSub": "Genel destek kuyrukları kullanmıyoruz; her mesaj ilgili departmanın kıdemli yöneticisine gider.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Kurumsal Hesap Verebilirlik",
    "slaSectionTitle": "Hizmet Seviyesi Taahhüdü (SLA)",
    "slaSectionSub": "Tüm iletişim kanallarımızda sıkı yanıt süreleri uyguluyoruz.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Sıkça Sorulan Sorular",
    "faqSectionTitle": "Merak Edilen Konular",
    "faqSectionSub": "Görüşme takvimi ve kurumsal protokoller hakkında temel yönergeler.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Anında Kendi Kendine Hizmet",
    "selfServeTitle": "Beklemeden Doğrudan Erişim",
    "selfServeSub": "Kurs detayları veya burs başvuruları için yanıt beklemek zorunda değilsiniz:",
    "selfServeCourses": "Tüm Kursları Keşfet",
    "selfServeScholarships": "Burs Başvurusu Yap",
    "selfServeServices": "Yazılım Hizmetleri",
    "selfServePartners": "Kurumsal Ortaklar"
  },
  "de": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "fr": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "ar": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "ur": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "es": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "zh": {
    "badge": "全球直连沟通渠道",
    "heroTitle": "机构咨询与官方直接支持",
    "heroSub": "直接联络萨菲学院伦敦总部、奖学金录取委员会及全球企业软件方案团队。",
    "statSlaNumber": "< 4小时",
    "statSlaLabel": "高优先级响应分流",
    "statSecureNumber": "100%安全",
    "statSecureLabel": "端到端隐私保护",
    "statSecureSub": "符合英国GDPR与DPA规范",
    "statHqNumber": "英国·伦敦",
    "statHqSub": "官方注册号: 17063286",
    "statDesksNumber": "5大部门",
    "statDesksLabel": "专业定向分流",
    "statDesksSub": "各领域高级主管直面回复",
    "dispatchCardTitle": "发送正式机密工单",
    "dispatchCardSub": "请填写以下参数。您的工单将即时路由至伦敦执行终端并生成实时跟踪码。",
    "quickRoutingLabel": "快捷部门路由预设（点击自动填充主题）：",
    "nameLabel": "姓名",
    "namePlaceholder": "例如：王思明",
    "emailLabel": "官方电子邮箱",
    "subjectLabel": "咨询部门",
    "presetSelected": "已选定预设",
    "subjectPlaceholder": "例如：全额奖学金申请、企业级Web3定制开发...",
    "messageLabel": "详细诉求 / 合作方案",
    "messagePlaceholder": "请详述您的诉求、项目范围、学术背景或合作目标...",
    "submitBtn": "发送安全加密工单",
    "sendingBtn": "正在路由至运营终端...",
    "successTitle": "工单已成功传达",
    "successDesc": "您的咨询已转交至伦敦运营终端。我们通常在2至4个工作小时内给予正式回复。",
    "errorTitle": "传输中断",
    "errorDesc": "发生网络错误。请通过官方 WhatsApp 或 Telegram 直接与我们取得联系。",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "精准部门分流体系",
    "routingSectionTitle": "您的工单如何被高效处理",
    "routingSectionSub": "我们不使用无人值守的通用工单池，每份来信均由相关部门的高级主管直接审阅。",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "机构履约承诺与透明度",
    "slaSectionTitle": "服务等级协议 (SLA) 响应矩阵",
    "slaSectionSub": "我们执行严格的响应时间基准。以下是跨各官方渠道的承诺目标：",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "咨询疑难释义",
    "faqSectionTitle": "常见问题与官方解答",
    "faqSectionSub": "涵盖会议预约、企业资格验证及加密沟通协议的官方守则。",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "即时自助门户",
    "selfServeTitle": "需要立即自助查阅？",
    "selfServeSub": "如需查询课程大纲、申请全额奖学金或查看技术案例，可直接访问我们的实时目录：",
    "selfServeCourses": "浏览所有课程",
    "selfServeScholarships": "申请全额奖学金",
    "selfServeServices": "软件工程服务",
    "selfServePartners": "全球合作机构"
  },
  "hi": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "it": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "pt": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "ja": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "ko": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "nl": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "uz": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  },
  "id": {
    "badge": "Global Direct Communications",
    "heroTitle": "Institutional Inquiries & Direct Support",
    "heroSub": "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
    "statSlaNumber": "< 4 Hours",
    "statSlaLabel": "Priority dispatch triage",
    "statSecureNumber": "100% Secure",
    "statSecureLabel": "End-to-End Privacy",
    "statSecureSub": "GDPR & UK DPA compliant",
    "statHqNumber": "London, UK",
    "statHqSub": "Reg No: 17063286",
    "statDesksNumber": "5 Desks",
    "statDesksLabel": "Specialized Routing",
    "statDesksSub": "Direct domain advisors",
    "dispatchCardTitle": "Transmit an Official Dispatch",
    "dispatchCardSub": "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking.",
    "quickRoutingLabel": "Quick Routing Presets (Click to Auto-fill Subject):",
    "nameLabel": "Full Name",
    "namePlaceholder": "e.g. Alexander Wright",
    "emailLabel": "Official Email Address",
    "subjectLabel": "Inquiry Department",
    "presetSelected": "Preset Selected",
    "subjectPlaceholder": "e.g. Scholarship Application...",
    "messageLabel": "Detailed Message / Proposal",
    "messagePlaceholder": "Detail your inquiry, proposed scope, or background credentials with specific goals...",
    "submitBtn": "Transmit Secure Dispatch",
    "sendingBtn": "Routing to Operations Terminal...",
    "successTitle": "Dispatch Successfully Transmitted",
    "successDesc": "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
    "errorTitle": "Transmission Interrupted",
    "errorDesc": "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
    "subjects": [
      {
        "label": "🎓 Scholarship & Admissions",
        "value": "Scholarship & Admissions Inquiry"
      },
      {
        "label": "💻 Enterprise Software & Tech",
        "value": "Enterprise Software & Development Inquiry"
      },
      {
        "label": "🤝 Strategic Partnership",
        "value": "Strategic Partnership Proposal"
      },
      {
        "label": "⚡ Student Helpdesk & LMS",
        "value": "Technical Student Support & Portal Access"
      },
      {
        "label": "💖 Philanthropic Grant & Donation",
        "value": "Philanthropic Grant & Donation Inquiry"
      }
    ],
    "routingSectionBadge": "Precision Department Routing",
    "routingSectionTitle": "How Your Dispatch is Triaged",
    "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
    "desks": [
      {
        "title": "Academic & Scholarship Bureau",
        "sla": "< 4 Hours Response",
        "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
        "coverage": [
          "Scholarship eligibility audits",
          "Curriculum syllabus breakdowns",
          "Academic transcripts verification",
          "Direct enrollment assistance"
        ]
      },
      {
        "title": "Enterprise Software Solutions",
        "sla": "< 2 Hours Response",
        "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
        "coverage": [
          "Architecture & security scoping",
          "Custom enterprise proposals",
          "Dedicated developer staffing",
          "NDA execution & SLA contracting"
        ]
      },
      {
        "title": "Global Institutional Alliances",
        "sla": "< 12 Hours Response",
        "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
        "coverage": [
          "Joint degree accreditation",
          "Regional workforce training grants",
          "Corporate philanthropic funding",
          "Legal & operational protocols"
        ]
      }
    ],
    "slaSectionBadge": "Institutional Accountability",
    "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
    "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
    "slaItems": [
      {
        "channel": "Official Web Dispatch",
        "speed": "< 4 Hours",
        "status": "Guaranteed",
        "availability": "24/7 Operations Desk"
      },
      {
        "channel": "Executive Telegram Desk",
        "speed": "< 15 Minutes",
        "status": "Real-time",
        "availability": "Daily 07:00 - 23:00 GMT"
      },
      {
        "channel": "Admissions WhatsApp",
        "speed": "< 30 Minutes",
        "status": "Active",
        "availability": "Daily 08:00 - 22:00 GMT"
      },
      {
        "channel": "Legal & Corporate Email",
        "speed": "< 24 Hours",
        "status": "Statutory",
        "availability": "Mon - Fri Business Hours"
      }
    ],
    "faqSectionBadge": "Inquiry Clarifications",
    "faqSectionTitle": "Frequently Asked Questions",
    "faqSectionSub": "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols.",
    "faqs": [
      {
        "q": "How fast will I receive a formal reply to my dispatch?",
        "a": "All dispatches sent through our web terminal trigger an instant automated routing receipt and are reviewed by senior department staff within 2 to 4 business hours."
      },
      {
        "q": "Can I schedule a live video consultation with the leadership team?",
        "a": "Yes. Enterprise software clients, institutional partners, and shortlisted Tier-1 scholarship finalists are provided with direct Google Meet or Zoom scheduling links."
      },
      {
        "q": "Is our strategic proposal or student dossier protected under NDA?",
        "a": "Absolutely. All information submitted to Safi Academy is encrypted under TLS 1.3, governed by UK GDPR & Data Protection Act 2018, and treated with strict institutional confidentiality."
      },
      {
        "q": "Which messaging app is fastest for student assistance?",
        "a": "Our official WhatsApp and Telegram student helpdesks offer average response speeds under 15-30 minutes for urgent course access, payment verification, or quiz issues."
      }
    ],
    "selfServeBadge": "Alternative Self-Serve Portals",
    "selfServeTitle": "Prefer Immediate Self-Service?",
    "selfServeSub": "You don't have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:",
    "selfServeCourses": "Explore All Courses",
    "selfServeScholarships": "Apply for Scholarships",
    "selfServeServices": "Software Services",
    "selfServePartners": "Institutional Partners"
  }
};

export function getContactTranslation(locale: string): ContactTranslation {
  const norm = (locale || "en").toLowerCase();
  return contactTranslationsMap[norm] || contactTranslationsMap.en;
}
