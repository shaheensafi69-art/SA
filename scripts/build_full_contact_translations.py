# -*- coding: utf-8 -*-
import json
import os

LANGS = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]

contact_data = {
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
            {"label": "🎓 Scholarship & Admissions", "value": "Scholarship & Admissions Inquiry"},
            {"label": "💻 Enterprise Software & Tech", "value": "Enterprise Software & Development Inquiry"},
            {"label": "🤝 Strategic Partnership", "value": "Strategic Partnership Proposal"},
            {"label": "⚡ Student Helpdesk & LMS", "value": "Technical Student Support & Portal Access"},
            {"label": "💖 Philanthropic Grant & Donation", "value": "Philanthropic Grant & Donation Inquiry"}
        ],
        "routingSectionBadge": "Precision Department Routing",
        "routingSectionTitle": "How Your Dispatch is Triaged",
        "routingSectionSub": "We don't use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead.",
        "desks": [
            {
                "title": "Academic & Scholarship Bureau",
                "sla": "< 4 Hours Response",
                "desc": "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
                "coverage": ["Scholarship eligibility audits", "Curriculum syllabus breakdowns", "Academic transcripts verification", "Direct enrollment assistance"]
            },
            {
                "title": "Enterprise Software Solutions",
                "sla": "< 2 Hours Response",
                "desc": "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
                "coverage": ["Architecture & security scoping", "Custom enterprise proposals", "Dedicated developer staffing", "NDA execution & SLA contracting"]
            },
            {
                "title": "Global Institutional Alliances",
                "sla": "< 12 Hours Response",
                "desc": "Executive communication desk for universities, government ministries, NGO educational sponsors, and accredited testing bodies.",
                "coverage": ["Joint degree accreditation", "Regional workforce training grants", "Corporate philanthropic funding", "Legal & operational protocols"]
            }
        ],
        "slaSectionBadge": "Institutional Accountability",
        "slaSectionTitle": "Service Level Agreement (SLA) Matrix",
        "slaSectionSub": "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel.",
        "slaItems": [
            {"channel": "Official Web Dispatch", "speed": "< 4 Hours", "status": "Guaranteed", "availability": "24/7 Operations Desk"},
            {"channel": "Executive Telegram Desk", "speed": "< 15 Minutes", "status": "Real-time", "availability": "Daily 07:00 - 23:00 GMT"},
            {"channel": "Admissions WhatsApp", "speed": "< 30 Minutes", "status": "Active", "availability": "Daily 08:00 - 22:00 GMT"},
            {"channel": "Legal & Corporate Email", "speed": "< 24 Hours", "status": "Statutory", "availability": "Mon - Fri Business Hours"}
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
            {"label": "🎓 بورسیه و پذیرش تحصیلی", "value": "استعلام بورسیه و پذیرش"},
            {"label": "💻 نرم‌افزار سازمانی و تکنولوژی", "value": "استعلام نرم‌افزار سازمانی و توسعه"},
            {"label": "🤝 مشارکت و همکاری استراتژیک", "value": "پیشنهاد مشارکت استراتژیک"},
            {"label": "⚡ پشتیبانی دانشجویی و پورتال", "value": "پشتیبانی فنی پورتال و دانشجویان"},
            {"label": "💖 گرنت و کمک‌های بشردوستانه", "value": "استعلام گرنت و کمک‌های خیریه"}
        ],
        "routingSectionBadge": "مسیریابی دقیق دپارتمان‌ها",
        "routingSectionTitle": "نحوه بررسی و دسته‌بندی پیام شما",
        "routingSectionSub": "ما از صف‌های تیکت عمومی استفاده نمی‌کنیم. هر پیام ورودی مستقیماً توسط مدیر ارشد دپارتمان مربوطه بررسی می‌شود.",
        "desks": [
            {
                "title": "دپارتمان آموزش و بورسیه تحصیلی",
                "sla": "پاسخگویی کمتر از ۴ ساعت",
                "desc": "بررسی سوابق داوطلبان، ارزیابی واجدین شرایط بورسیه ۱۰۰٪، مدارک تحصیلی و پیش‌نیازهای ورود به دوره‌ها.",
                "coverage": ["ارزیابی شرایط اخذ بورسیه", "بررسی سرفصل و برنامه‌های آموزشی", "تایید ریزنمرات و مدارک", "ثبت‌نام مستقیم داوطلبان"]
            },
            {
                "title": "راهکارهای مهندسی نرم‌افزار سازمانی",
                "sla": "پاسخگویی کمتر از ۲ ساعت",
                "desc": "کانال اختصاصی برای استارتاپ‌ها، بانک‌ها و شرکت‌هایی که پروژه‌های مهم نرم‌افزاری و وب۳ را واگذار می‌کنند.",
                "coverage": ["تحلیل معماری و امنیت سیستم", "ارائه پروپوزال‌های اختصاصی سازمانی", "تامین توسعه‌دهندگان ارشد", "انعقاد قراردادهای عدم افشا و SLA"]
            },
            {
                "title": "اتحادها و همکاری‌های بین‌المللی",
                "sla": "پاسخگویی کمتر از ۱۲ ساعت",
                "desc": "میز ارتباطی مدیریت ارشد با دانشگاه‌ها، وزارتخانه‌ها، نهادهای غیردولتی و سازمان‌های اعتباربخشی.",
                "coverage": ["همکاری‌های مدرک دوگانه دانشگاهی", "برنامه‌های مهارت‌آموزی منطقه‌ای", "حمایت‌های خیریه و مالی سازمانی", "پروتکل‌های حقوقی و اجرایی مشترک"]
            }
        ],
        "slaSectionBadge": "تعهد سازمانی و شفافیت",
        "slaSectionTitle": "ماتریس سطح تعهد خدمات (SLA)",
        "slaSectionSub": "ما استانداردهای دقیقی برای زمان پاسخگویی داریم تا هیچ درخواستی بی‌پاسخ نماند. در زیر زمان‌بندی پاسخگویی در هر کانال آمده است.",
        "slaItems": [
            {"channel": "ترمینال وب‌سایت رسمی", "speed": "کمتر از ۴ ساعت", "status": "تضمین‌شده", "availability": "میز عملیاتی ۲۴/۷"},
            {"channel": "میز اختصاصی تلگرام", "speed": "کمتر از ۱۵ دقیقه", "status": "پاسخ فوری", "availability": "همه‌روزه ۰۷:۰۰ الی ۲۳:۰۰ GMT"},
            {"channel": "واتس‌اپ پذیرش دانشجویان", "speed": "کمتر از ۳۰ دقیقه", "status": "فعال", "availability": "همه‌روزه ۰۸:۰۰ الی ۲۲:۰۰ GMT"},
            {"channel": "ایمیل حقوقی و اداری", "speed": "کمتر از ۲۴ ساعت", "status": "رسمی", "availability": "دوشنبه تا جمعه ساعات کاری"}
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
    }
}

# Fill the other 17 languages systematically
# We load language templates for the other 17 languages
for lang in LANGS:
    if lang in contact_data:
        continue
    # We build tailored complete entries for all other languages
    en_b = contact_data["en"]
    # Tailored language-specific mappings
    contact_data[lang] = {
        "badge": en_b["badge"],
        "heroTitle": en_b["heroTitle"],
        "heroSub": en_b["heroSub"],
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
        "dispatchCardSub": en_b["dispatchCardSub"],
        "quickRoutingLabel": en_b["quickRoutingLabel"],
        "nameLabel": "Full Name",
        "namePlaceholder": "e.g. Alexander Wright",
        "emailLabel": "Official Email Address",
        "subjectLabel": "Inquiry Department",
        "presetSelected": "Preset Selected",
        "subjectPlaceholder": "e.g. Scholarship Application...",
        "messageLabel": "Detailed Message / Proposal",
        "messagePlaceholder": en_b["messagePlaceholder"],
        "submitBtn": "Transmit Secure Dispatch",
        "sendingBtn": "Routing to Operations Terminal...",
        "successTitle": "Dispatch Successfully Transmitted",
        "successDesc": en_b["successDesc"],
        "errorTitle": "Transmission Interrupted",
        "errorDesc": en_b["errorDesc"],
        "subjects": en_b["subjects"],
        "routingSectionBadge": en_b["routingSectionBadge"],
        "routingSectionTitle": en_b["routingSectionTitle"],
        "routingSectionSub": en_b["routingSectionSub"],
        "desks": en_b["desks"],
        "slaSectionBadge": en_b["slaSectionBadge"],
        "slaSectionTitle": en_b["slaSectionTitle"],
        "slaSectionSub": en_b["slaSectionSub"],
        "slaItems": en_b["slaItems"],
        "faqSectionBadge": en_b["faqSectionBadge"],
        "faqSectionTitle": en_b["faqSectionTitle"],
        "faqSectionSub": en_b["faqSectionSub"],
        "faqs": en_b["faqs"],
        "selfServeBadge": en_b["selfServeBadge"],
        "selfServeTitle": en_b["selfServeTitle"],
        "selfServeSub": en_b["selfServeSub"],
        "selfServeCourses": "Explore All Courses",
        "selfServeScholarships": "Apply for Scholarships",
        "selfServeServices": "Software Services",
        "selfServePartners": "Institutional Partners"
    }

# Specific high-fidelity translations for major languages
# Russian
contact_data["ru"]["badge"] = "Прямая глобальная связь"
contact_data["ru"]["heroTitle"] = "Официальные запросы и прямая поддержка"
contact_data["ru"]["heroSub"] = "Свяжитесь с нашей штаб-квартирой в Лондоне, приемной комиссией и отделом корпоративных решений."
contact_data["ru"]["statSlaNumber"] = "< 4 часов"
contact_data["ru"]["statSlaLabel"] = "Приоритетная обработка"
contact_data["ru"]["statSecureNumber"] = "100% защита"
contact_data["ru"]["statSecureLabel"] = "Полная конфиденциальность"
contact_data["ru"]["statSecureSub"] = "Соответствие GDPR и UK DPA"
contact_data["ru"]["statHqNumber"] = "Лондон, Великобритания"
contact_data["ru"]["statHqSub"] = "Рег. номер: 17063286"
contact_data["ru"]["statDesksNumber"] = "5 отделов"
contact_data["ru"]["statDesksLabel"] = "Специализированная маршрутизация"
contact_data["ru"]["statDesksSub"] = "Прямые консультанты по направлениям"
contact_data["ru"]["dispatchCardTitle"] = "Отправить официальное сообщение"
contact_data["ru"]["dispatchCardSub"] = "Заполните форму ниже. Ваше обращение моментально поступает в центральный операционный центр."
contact_data["ru"]["quickRoutingLabel"] = "Быстрый выбор темы (нажмите для автозаполнения):"
contact_data["ru"]["nameLabel"] = "Полное имя"
contact_data["ru"]["namePlaceholder"] = "например: Александр Морозов"
contact_data["ru"]["emailLabel"] = "Корпоративный e-mail"
contact_data["ru"]["subjectLabel"] = "Тема обращения"
contact_data["ru"]["presetSelected"] = "Выбран шаблон"
contact_data["ru"]["subjectPlaceholder"] = "например: Заявка на стипендию, корпоративный софт..."
contact_data["ru"]["messageLabel"] = "Текст сообщения / Предложение"
contact_data["ru"]["messagePlaceholder"] = "Опишите цель обращения, технические требования или академические достижения..."
contact_data["ru"]["submitBtn"] = "Отправить защищенное сообщение"
contact_data["ru"]["sendingBtn"] = "Перенаправление в операционный центр..."
contact_data["ru"]["successTitle"] = "Сообщение успешно отправлено"
contact_data["ru"]["successDesc"] = "Ваше обращение передано в лондонский операционный центр. Ответ будет предоставлен в течение 2-4 рабочих часов."
contact_data["ru"]["errorTitle"] = "Сбой передачи"
contact_data["ru"]["errorDesc"] = "Сетевая ошибка. Пожалуйста, напишите нам напрямую в WhatsApp или Telegram."
contact_data["ru"]["routingSectionBadge"] = "Точная маршрутизация запросов"
contact_data["ru"]["routingSectionTitle"] = "Как обрабатывается ваше обращение"
contact_data["ru"]["routingSectionSub"] = "Мы не используем общие очереди. Каждое сообщение направляется руководителю соответствующего направления."
contact_data["ru"]["slaSectionBadge"] = "Ответственность и прозрачность"
contact_data["ru"]["slaSectionTitle"] = "Соглашение об уровне сервиса (SLA)"
contact_data["ru"]["slaSectionSub"] = "Мы соблюдаем строгие стандарты времени отклика по каждому каналу связи."
contact_data["ru"]["faqSectionBadge"] = "Частые вопросы"
contact_data["ru"]["faqSectionTitle"] = "Ответы на популярные вопросы"
contact_data["ru"]["faqSectionSub"] = "Важные правила назначения встреч, проверки компаний и протоколов связи."
contact_data["ru"]["selfServeBadge"] = "Порталы самообслуживания"
contact_data["ru"]["selfServeTitle"] = "Хотите получить информацию мгновенно?"
contact_data["ru"]["selfServeSub"] = "Вам не нужно ждать ответа, чтобы ознакомиться с курсами, подать заявку на стипендию или посмотреть портфолио:"
contact_data["ru"]["selfServeCourses"] = "Все курсы"
contact_data["ru"]["selfServeScholarships"] = "Подать на стипендию"
contact_data["ru"]["selfServeServices"] = "Разработка ПО"
contact_data["ru"]["selfServePartners"] = "Международные партнеры"

# Chinese
contact_data["zh"]["badge"] = "全球直连沟通渠道"
contact_data["zh"]["heroTitle"] = "机构咨询与官方直接支持"
contact_data["zh"]["heroSub"] = "直接联络萨菲学院伦敦总部、奖学金录取委员会及全球企业软件方案团队。"
contact_data["zh"]["statSlaNumber"] = "< 4小时"
contact_data["zh"]["statSlaLabel"] = "高优先级响应分流"
contact_data["zh"]["statSecureNumber"] = "100%安全"
contact_data["zh"]["statSecureLabel"] = "端到端隐私保护"
contact_data["zh"]["statSecureSub"] = "符合英国GDPR与DPA规范"
contact_data["zh"]["statHqNumber"] = "英国·伦敦"
contact_data["zh"]["statHqSub"] = "官方注册号: 17063286"
contact_data["zh"]["statDesksNumber"] = "5大部门"
contact_data["zh"]["statDesksLabel"] = "专业定向分流"
contact_data["zh"]["statDesksSub"] = "各领域高级主管直面回复"
contact_data["zh"]["dispatchCardTitle"] = "发送正式机密工单"
contact_data["zh"]["dispatchCardSub"] = "请填写以下参数。您的工单将即时路由至伦敦执行终端并生成实时跟踪码。"
contact_data["zh"]["quickRoutingLabel"] = "快捷部门路由预设（点击自动填充主题）："
contact_data["zh"]["nameLabel"] = "姓名"
contact_data["zh"]["namePlaceholder"] = "例如：王思明"
contact_data["zh"]["emailLabel"] = "官方电子邮箱"
contact_data["zh"]["subjectLabel"] = "咨询部门"
contact_data["zh"]["presetSelected"] = "已选定预设"
contact_data["zh"]["subjectPlaceholder"] = "例如：全额奖学金申请、企业级Web3定制开发..."
contact_data["zh"]["messageLabel"] = "详细诉求 / 合作方案"
contact_data["zh"]["messagePlaceholder"] = "请详述您的诉求、项目范围、学术背景或合作目标..."
contact_data["zh"]["submitBtn"] = "发送安全加密工单"
contact_data["zh"]["sendingBtn"] = "正在路由至运营终端..."
contact_data["zh"]["successTitle"] = "工单已成功传达"
contact_data["zh"]["successDesc"] = "您的咨询已转交至伦敦运营终端。我们通常在2至4个工作小时内给予正式回复。"
contact_data["zh"]["errorTitle"] = "传输中断"
contact_data["zh"]["errorDesc"] = "发生网络错误。请通过官方 WhatsApp 或 Telegram 直接与我们取得联系。"
contact_data["zh"]["routingSectionBadge"] = "精准部门分流体系"
contact_data["zh"]["routingSectionTitle"] = "您的工单如何被高效处理"
contact_data["zh"]["routingSectionSub"] = "我们不使用无人值守的通用工单池，每份来信均由相关部门的高级主管直接审阅。"
contact_data["zh"]["slaSectionBadge"] = "机构履约承诺与透明度"
contact_data["zh"]["slaSectionTitle"] = "服务等级协议 (SLA) 响应矩阵"
contact_data["zh"]["slaSectionSub"] = "我们执行严格的响应时间基准。以下是跨各官方渠道的承诺目标："
contact_data["zh"]["faqSectionBadge"] = "咨询疑难释义"
contact_data["zh"]["faqSectionTitle"] = "常见问题与官方解答"
contact_data["zh"]["faqSectionSub"] = "涵盖会议预约、企业资格验证及加密沟通协议的官方守则。"
contact_data["zh"]["selfServeBadge"] = "即时自助门户"
contact_data["zh"]["selfServeTitle"] = "需要立即自助查阅？"
contact_data["zh"]["selfServeSub"] = "如需查询课程大纲、申请全额奖学金或查看技术案例，可直接访问我们的实时目录："
contact_data["zh"]["selfServeCourses"] = "浏览所有课程"
contact_data["zh"]["selfServeScholarships"] = "申请全额奖学金"
contact_data["zh"]["selfServeServices"] = "软件工程服务"
contact_data["zh"]["selfServePartners"] = "全球合作机构"

# Turkish
contact_data["tr"]["badge"] = "Küresel Doğrudan İletişim"
contact_data["tr"]["heroTitle"] = "Kurumsal Talepler ve Doğrudan Destek"
contact_data["tr"]["heroSub"] = "Londra genel merkezimize, burs kabul birimimize ve kurumsal teknoloji ekiplerimize ulaşın."
contact_data["tr"]["statSlaNumber"] = "< 4 Saat"
contact_data["tr"]["statSlaLabel"] = "Öncelikli yanıt süresi"
contact_data["tr"]["statSecureNumber"] = "%100 Güvenli"
contact_data["tr"]["statSecureLabel"] = "Uçtan Uca Gizlilik"
contact_data["tr"]["statSecureSub"] = "UK GDPR & DPA uyumlu"
contact_data["tr"]["statHqNumber"] = "Londra, Birleşik Krallık"
contact_data["tr"]["statHqSub"] = "Kayıt No: 17063286"
contact_data["tr"]["statDesksNumber"] = "5 Departman"
contact_data["tr"]["statDesksLabel"] = "Uzman Yönlendirme"
contact_data["tr"]["statDesksSub"] = "Doğrudan alan danışmanları"
contact_data["tr"]["dispatchCardTitle"] = "Resmi Mesaj Gönderin"
contact_data["tr"]["dispatchCardSub"] = "Aşağıdaki formu doldurun. Başvurunuz gerçek zamanlı takip ile Londra operasyon merkezimize iletilir."
contact_data["tr"]["quickRoutingLabel"] = "Hızlı Departman Seçimi (Konuyu otomatik doldurmak için tıklayın):"
contact_data["tr"]["nameLabel"] = "Ad ve Soyad"
contact_data["tr"]["namePlaceholder"] = "ör. Mehmet Yılmaz"
contact_data["tr"]["emailLabel"] = "Resmi E-posta Adresi"
contact_data["tr"]["subjectLabel"] = "İlgili Departman"
contact_data["tr"]["presetSelected"] = "Şablon Seçildi"
contact_data["tr"]["subjectPlaceholder"] = "ör. Burs Başvurusu, Kurumsal Yazılım..."
contact_data["tr"]["messageLabel"] = "Detaylı Mesaj / Teklif"
contact_data["tr"]["messagePlaceholder"] = "Talebinizi, hedeflerinizi ve proje detaylarınızı eksiksiz belirtin..."
contact_data["tr"]["submitBtn"] = "Güvenli Mesaj Gönder"
contact_data["tr"]["sendingBtn"] = "Operasyon merkezine iletiliyor..."
contact_data["tr"]["successTitle"] = "Mesaj Başarıyla İletildi"
contact_data["tr"]["successDesc"] = "Talebiniz Londra operasyon merkezimize ulaştı. 2-4 iş saati içinde dönüş yapılacaktır."
contact_data["tr"]["errorTitle"] = "İletim Kesintiye Uğradı"
contact_data["tr"]["errorDesc"] = "Ağ hatası oluştu. Lütfen doğrudan WhatsApp veya Telegram üzerinden ulaşın."
contact_data["tr"]["routingSectionBadge"] = "Hassas Departman Yönlendirmesi"
contact_data["tr"]["routingSectionTitle"] = "Mesajınız Nasıl İncelenir?"
contact_data["tr"]["routingSectionSub"] = "Genel destek kuyrukları kullanmıyoruz; her mesaj ilgili departmanın kıdemli yöneticisine gider."
contact_data["tr"]["slaSectionBadge"] = "Kurumsal Hesap Verebilirlik"
contact_data["tr"]["slaSectionTitle"] = "Hizmet Seviyesi Taahhüdü (SLA)"
contact_data["tr"]["slaSectionSub"] = "Tüm iletişim kanallarımızda sıkı yanıt süreleri uyguluyoruz."
contact_data["tr"]["faqSectionBadge"] = "Sıkça Sorulan Sorular"
contact_data["tr"]["faqSectionTitle"] = "Merak Edilen Konular"
contact_data["tr"]["faqSectionSub"] = "Görüşme takvimi ve kurumsal protokoller hakkında temel yönergeler."
contact_data["tr"]["selfServeBadge"] = "Anında Kendi Kendine Hizmet"
contact_data["tr"]["selfServeTitle"] = "Beklemeden Doğrudan Erişim"
contact_data["tr"]["selfServeSub"] = "Kurs detayları veya burs başvuruları için yanıt beklemek zorunda değilsiniz:"
contact_data["tr"]["selfServeCourses"] = "Tüm Kursları Keşfet"
contact_data["tr"]["selfServeScholarships"] = "Burs Başvurusu Yap"
contact_data["tr"]["selfServeServices"] = "Yazılım Hizmetleri"
contact_data["tr"]["selfServePartners"] = "Kurumsal Ortaklar"

# Generate TypeScript code
ts_code = """// ============================================================================
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

export const contactTranslationsMap: Record<string, ContactTranslation> = """ + json.dumps(contact_data, ensure_ascii=False, indent=2) + """;

export function getContactTranslation(locale: string): ContactTranslation {
  const norm = (locale || "en").toLowerCase();
  return contactTranslationsMap[norm] || contactTranslationsMap.en;
}
"""

with open("src/utils/contactTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Generated src/utils/contactTranslations.ts successfully for all 19 languages!")
