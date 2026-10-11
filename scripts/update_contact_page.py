# -*- coding: utf-8 -*-
with open("src/app/[locale]/contact/page.tsx", "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ('{isRtl ? "کمتر از ۴ ساعت" : "< 4 Hours"}', '{ct.statSlaNumber}'),
    ('{isRtl ? "پاسخگویی سریع اولویت‌دار" : "Priority dispatch triage"}', '{ct.statSlaLabel}'),
    ('{isRtl ? "۱۰۰٪ امن" : "100% Secure"}', '{ct.statSecureNumber}'),
    ('{isRtl ? "حریم خصوصی کامل" : "End-to-End Privacy"}', '{ct.statSecureLabel}'),
    ('{isRtl ? "مطابق با استانداردهای GDPR و DPA بریتانیا" : "GDPR & UK DPA compliant"}', '{ct.statSecureSub}'),
    ('{isRtl ? "لندن، بریتانیا" : "London, UK"}', '{ct.statHqNumber}'),
    ('{isRtl ? "شماره ثبت رسمی: 17063286" : "Reg No: 17063286"}', '{ct.statHqSub}'),
    ('{isRtl ? "۵ دپارتمان" : "5 Desks"}', '{ct.statDesksNumber}'),
    ('{isRtl ? "ارتباط تخصصی" : "Specialized Routing"}', '{ct.statDesksLabel}'),
    ('{isRtl ? "مشاوران مستقیم هر حوزه" : "Direct domain advisors"}', '{ct.statDesksSub}'),
    ('{isRtl ? "ارسال پیام رسمی و محرمانه" : "Transmit an Official Dispatch"}', '{ct.dispatchCardTitle}'),
    ('{isRtl ? "مشخصات خود را تکمیل نمایید. پیام شما مستقیماً به ترمینال مرکزی با قابلیت رهگیری لحظه‌ای ارسال می‌گردد." : "Complete the parameters below. Your submission is instantly routed to our central executive terminal with real-time tracking."}', '{ct.dispatchCardSub}'),
    ('{isRtl ? "مسیریابی سریع دپارتمان‌ها (کلیک جهت انتخاب خودکار):" : "Quick Routing Presets (Click to Auto-fill Subject):"}', '{ct.quickRoutingLabel}'),
    ('placeholder={isRtl ? "مثال: احمد رضایی" : "e.g. Alexander Wright"}', 'placeholder={ct.namePlaceholder}'),
    ('{isRtl ? "پیش‌فرض انتخاب شد" : "Preset Selected"}', '{ct.presetSelected}'),
    ('placeholder={isRtl ? "مثال: درخواست بورسیه، استعلام پروژه سازمانی..." : "e.g. Scholarship Application Tier-1, Web3 Platform Scoping..."}', 'placeholder={ct.subjectPlaceholder}'),
    ('placeholder={isRtl ? "جزئیات درخواست، مدارک یا پیشنهادات خود را کامل بنویسید..." : "Detail your inquiry, proposed scope, or background credentials with specific goals..."}', 'placeholder={ct.messagePlaceholder}'),
    ('{isRtl ? "مسیریابی دقیق دپارتمان‌ها" : "Precision Department Routing"}', '{ct.routingSectionBadge}'),
    ('{isRtl ? "نحوه بررسی و دسته‌بندی پیام شما" : "How Your Dispatch is Triaged"}', '{ct.routingSectionTitle}'),
    ('{isRtl ? "ما از صف‌های تیکت عمومی استفاده نمی‌کنیم. هر پیام ورودی مستقیماً توسط مدیر ارشد دپارتمان مربوطه بررسی می‌شود." : "We don\'t use generic, unmonitored ticket queues. Every incoming inquiry is classified and handed to the respective senior department lead."}', '{ct.routingSectionSub}'),
    ('{isRtl ? "تعهد سازمانی و شفافیت" : "Institutional Accountability"}', '{ct.slaSectionBadge}'),
    ('{isRtl ? "ماتریس سطح تعهد خدمات (SLA)" : "Service Level Agreement (SLA) Matrix"}', '{ct.slaSectionTitle}'),
    ('{isRtl ? "ما استانداردهای دقیقی برای زمان پاسخگویی داریم تا هیچ درخواستی بی‌پاسخ نماند. در زیر زمان‌بندی پاسخگویی در هر کانال آمده است." : "We maintain strict response benchmarks so you are never left waiting. Below are our contractual and operational response targets across every channel."}', '{ct.slaSectionSub}'),
    ('{isRtl ? "شفاف‌سازی سوالات" : "Inquiry Clarifications"}', '{ct.faqSectionBadge}'),
    ('{isRtl ? "پاسخ به سوالات متداول" : "Frequently Asked Questions"}', '{ct.faqSectionTitle}'),
    ('{isRtl ? "دستورالعمل‌های ضروری در خصوص جلسات، استعلام سازمانی و پروتکل‌های ارتباطی." : "Essential guidelines regarding meeting schedules, corporate verification, and dispatch protocols."}', '{ct.faqSectionSub}'),
    ('{isRtl ? "پورتال‌های مستقیم و خودکار" : "Alternative Self-Serve Portals"}', '{ct.selfServeBadge}'),
    ('{isRtl ? "دسترسی مستقیم و فوری بدون انتظار" : "Prefer Immediate Self-Service?"}', '{ct.selfServeTitle}'),
    ('{isRtl ? "اگر به دنبال ثبت‌نام در دوره‌ها، درخواست بورسیه یا مشاهده نمونه کارها هستید، نیازی به انتظار برای پاسخ ندارید:" : "You don\'t have to wait for a dispatch reply if you are seeking course details, full-ride scholarships, or agency portfolios. Explore our live self-serve directories right now:"}', '{ct.selfServeSub}'),
    ('{isRtl ? "مشاهده تمام دوره‌ها" : "Explore All Courses"}', '{ct.selfServeCourses}'),
    ('{isRtl ? "درخواست بورسیه تحصیلی" : "Apply for Scholarships"}', '{ct.selfServeScholarships}'),
    ('{isRtl ? "خدمات مهندسی نرم‌افزار" : "Software Services"}', '{ct.selfServeServices}'),
    ('{isRtl ? "شرکای بین‌المللی" : "Institutional Partners"}', '{ct.selfServePartners}')
]

replaced_count = 0
for old, new in replacements:
    if old in c:
        c = c.replace(old, new)
        replaced_count += 1
    else:
        print(f"Warning: pattern not found: {old[:40]}...")

with open("src/app/[locale]/contact/page.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print(f"Successfully replaced {replaced_count} binary ternaries in contact/page.tsx!")
