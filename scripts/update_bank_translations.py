# -*- coding: utf-8 -*-
import json
import re

LANGS = ["en", "fa", "ps", "ar", "ur", "ru", "tr", "de", "fr", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]

with open("src/utils/bankAccountServiceTranslations.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Interface expansion
old_iface = """export interface BankAccountServiceTranslation {
  isRtl: boolean;"""

new_iface = """export interface BankFeatureItem {
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
  applyForPartner?: string;"""

if old_iface in text and "export interface BankFeatureItem" not in text:
    text = text.replace(old_iface, new_iface, 1)

# Localized additions dictionary
arch_data = {
    "en": {
        "archBadge": "01 / Architecture",
        "archTitle": "A financial interface built like a product, not a form.",
        "archSubtitle": "Understand what each rail provides and prepare your dossier with precision.",
        "verifiedCapabilitiesLabel": "Verified Capabilities & Rails:",
        "termsDisclaimer": "Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.",
        "applyForPartner": "Apply for",
        "features": [
            {"num": "01", "title": "Multi-Currency Vault", "desc": "Hold and convert major international currencies with real mid-market rates across 40+ countries without hidden fees."},
            {"num": "02", "title": "Dedicated IBAN Rails", "desc": "Receive dedicated local bank credentials in Europe (SEPA), United Kingdom (Faster Payments), and the US (ACH)."},
            {"num": "03", "title": "Corporate & Virtual Cards", "desc": "Issue virtual cards instantly for SaaS tools, cloud servers, and international advertising campaigns."},
            {"num": "04", "title": "Strict Regulatory Safeguard", "desc": "Customer funds are safeguarded in segregated accounts under UK FCA and European Central Bank regulations."}
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
            {"num": "۰۱", "title": "صندوق چند ارزی بین‌المللی", "desc": "نگهداری و تبدیل ارزهای معتبر جهانی با نرخ واقعی بازار بین‌بانکی در بیش از ۴۰ کشور بدون کارمزد مخفی."},
            {"num": "۰۲", "title": "شماره حساب اختصاصی IBAN", "desc": "دریافت شماره حساب‌های بانکی محلی در اروپا (SEPA)، انگلستان (Faster Payments) و آمریکا (ACH)."},
            {"num": "۰۳", "title": "کارت‌های تجاری و مجازی", "desc": "صدور آنی کارت‌های مسترکارت و ویزا برای پرداخت سرورهای ابری، تبلیغات بین‌المللی و ابزارهای تخصصی."},
            {"num": "۰۴", "title": "حفاظت تحت نظارت نهادهای قانونی", "desc": "نگهداری امن سپرده‌ها در حساب‌های تفکیک‌شده تحت نظارت مرجع مالی بریتانیا (FCA) و بانک مرکزی اروپا."}
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
            {"num": "۰۱", "title": "څو اسعارو نړیوال حساب", "desc": "په ۴۰+ هیوادونو کې د بازار په ریښتیني نرخ د نړیوالو اسعارو ساتل او بدلول."},
            {"num": "۰۲", "title": "ځانګړی IBAN او بانکي شمیرې", "desc": "په اروپا (SEPA)، انګلستان او امریکا (ACH) کې د ځایی حسابونو ترلاسه کول."},
            {"num": "۰۳", "title": "مجازي او کارپوریټ کارتونه", "desc": "د انټرنیټي تادیاتو، سرورونو او اعلاناتو لپاره د فوري ویزا او ماسټرکارډ صادرول."},
            {"num": "۰۴", "title": "قانوني څارنه او خوندیتوب", "desc": "د انګلستان د FCA او اروپا د مرکزي بانک د مقرراتو لاندې د فنډونو بشپړ خوندیتوب."}
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
            {"num": "01", "title": "Мультивалютный счет", "desc": "Хранение и конвертация основных мировых валют по реальным рыночным курсам в 40+ странах без скрытых комиссий."},
            {"num": "02", "title": "Выделенные реквизиты IBAN", "desc": "Получение местных банковских реквизитов в Европе (SEPA), Великобритании (Faster Payments) и США (ACH)."},
            {"num": "03", "title": "Корпоративные и виртуальные карты", "desc": "Мгновенный выпуск виртуальных карт для оплаты SaaS-сервисов, серверов и глобальной рекламы."},
            {"num": "04", "title": "Строгий регуляторный надзор", "desc": "Средства клиентов хранятся на сегрегированных счетах под надзором регуляторов FCA Великобритании и ЕЦБ."}
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
            {"num": "01", "title": "Çok Para Birimli Kasa", "desc": "40'tan fazla ülkede gizli komisyon olmadan gerçek piyasa kurlarıyla ana para birimlerini tutun ve dönüştürün."},
            {"num": "02", "title": "Özel IBAN Kanalları", "desc": "Avrupa (SEPA), Birleşik Krallık (Faster Payments) ve ABD'de (ACH) yerel banka hesap numaraları alın."},
            {"num": "03", "title": "Kurumsal ve Sanal Kartlar", "desc": "SaaS araçları, bulut sunucuları ve küresel reklam kampanyaları için anında sanal kart oluşturun."},
            {"num": "04", "title": "Sıkı Düzenleyici Koruması", "desc": "Müşteri fonları, Birleşik Krallık FCA ve Avrupa Merkez Bankası kurallarına göre ayrılmış hesaplarda güvendedir."}
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
            {"num": "01", "title": "多币种全球资产金库", "desc": "支持40多个主流国家货币存储与实时汇率兑换，杜绝隐形加价，尽享银行间无损汇率。"},
            {"num": "02", "title": "专属独立本地 IBAN 账户", "desc": "获取欧洲单一支付区（SEPA）、英国快速支付（FPS）和美国自动清算所（ACH）本地企业收款行号。"},
            {"num": "03", "title": "企业级虚拟与实体万事达卡", "desc": "即时生成用于支付海外软件SaaS订阅、公有云服务器及跨境广告投放的企业级虚拟商务卡。"},
            {"num": "04", "title": "高标准合规资产隔离监管", "desc": "所有客户资产均根据英国金融行为监管局（FCA）与欧洲央行法规，存放于一级托管隔离银行。"}
        ]
    }
}

# Add default for all other languages based on en
for l in LANGS:
    if l not in arch_data:
        arch_data[l] = arch_data["en"]

# Inject into bankAccountServiceTranslations dictionary
for l in LANGS:
    match = re.search(r'("' + l + r'":\s*\{)', text)
    if match:
        insertion_point = match.end()
        extra_fields = f"""
    "archBadge": {json.dumps(arch_data[l]["archBadge"], ensure_ascii=False)},
    "archTitle": {json.dumps(arch_data[l]["archTitle"], ensure_ascii=False)},
    "archSubtitle": {json.dumps(arch_data[l]["archSubtitle"], ensure_ascii=False)},
    "verifiedCapabilitiesLabel": {json.dumps(arch_data[l]["verifiedCapabilitiesLabel"], ensure_ascii=False)},
    "termsDisclaimer": {json.dumps(arch_data[l]["termsDisclaimer"], ensure_ascii=False)},
    "applyForPartner": {json.dumps(arch_data[l]["applyForPartner"], ensure_ascii=False)},
    "features": {json.dumps(arch_data[l]["features"], ensure_ascii=False, indent=6)},"""
        text = text[:insertion_point] + extra_fields + text[insertion_point:]

with open("src/utils/bankAccountServiceTranslations.ts", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated src/utils/bankAccountServiceTranslations.ts with architecture cards!")
