#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full 19-language generator for all 5 founder executive dossiers:
- shaheen-safi
- shirin-gol-ahmadi
- mobin-hassani
- mujtaba-rahmani
- sahel-salem
Outputs to src/utils/translations/founder/{locale}.json
"""
import json
import os

OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'utils', 'translations', 'founder'))
os.makedirs(OUT_DIR, exist_ok=True)

LOCALES = ['en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur', 'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id']

NAMES = {
    'shaheen': {
        'en': ('Shaheen', 'Safi'),
        'fa': ('شاهین', 'صافی'),
        'ps': ('شاهین', 'صافي'),
        'ru': ('Шахин', 'Сафи'),
        'tr': ('Şahin', 'Safi'),
        'de': ('Shaheen', 'Safi'),
        'fr': ('Shaheen', 'Safi'),
        'ar': ('شاهين', 'صافي'),
        'ur': ('شاہین', 'صافی'),
        'es': ('Shaheen', 'Safi'),
        'zh': ('沙欣', '萨菲'),
        'hi': ('शाहीन', 'सफी'),
        'it': ('Shaheen', 'Safi'),
        'pt': ('Shaheen', 'Safi'),
        'ja': ('シャヒーン', 'サフィ'),
        'ko': ('샤힌', '사피'),
        'nl': ('Shaheen', 'Safi'),
        'uz': ('Shahin', 'Safiy'),
        'id': ('Shaheen', 'Safi')
    },
    'shirin': {
        'en': ('Shirin', 'Gol Ahmadi'),
        'fa': ('شیرین', 'گل احمدی'),
        'ps': ('شیرین', 'ګل احمدي'),
        'ru': ('Ширин', 'Голь Ахмади'),
        'tr': ('Şirin', 'Gül Ahmedi'),
        'de': ('Shirin', 'Gol Ahmadi'),
        'fr': ('Shirin', 'Gol Ahmadi'),
        'ar': ('شيرين', 'غل أحمدي'),
        'ur': ('شیریں', 'گل احمدی'),
        'es': ('Shirin', 'Gol Ahmadi'),
        'zh': ('希林', '戈尔·艾哈迈迪'),
        'hi': ('शीरीन', 'गुल अहमदी'),
        'it': ('Shirin', 'Gol Ahmadi'),
        'pt': ('Shirin', 'Gol Ahmadi'),
        'ja': ('シリン', 'ゴル・アフマディ'),
        'ko': ('시린', '골 아흐마디'),
        'nl': ('Shirin', 'Gol Ahmadi'),
        'uz': ('Shirin', 'Gul Ahmadiy'),
        'id': ('Shirin', 'Gol Ahmadi')
    },
    'mobin': {
        'en': ('Mobin', 'Hassani'),
        'fa': ('مبین', 'حسنی'),
        'ps': ('مبین', 'حسني'),
        'ru': ('Мобин', 'Хассани'),
        'tr': ('Mobin', 'Hassani'),
        'de': ('Mobin', 'Hassani'),
        'fr': ('Mobin', 'Hassani'),
        'ar': ('مبين', 'حسني'),
        'ur': ('مبین', 'حسنی'),
        'es': ('Mobin', 'Hassani'),
        'zh': ('莫宾', '哈萨尼'),
        'hi': ('मोबिन', 'हस्सानी'),
        'it': ('Mobin', 'Hassani'),
        'pt': ('Mobin', 'Hassani'),
        'ja': ('モビン', 'ハッサニ'),
        'ko': ('모빈', '하사니'),
        'nl': ('Mobin', 'Hassani'),
        'uz': ('Mobin', 'Hassaniy'),
        'id': ('Mobin', 'Hassani')
    },
    'mujtaba': {
        'en': ('Mujtaba', 'Rahmani'),
        'fa': ('مجتبی', 'رحمانی'),
        'ps': ('مجتبی', 'رحماني'),
        'ru': ('Муджтаба', 'Рахмани'),
        'tr': ('Mücteba', 'Rahmani'),
        'de': ('Mujtaba', 'Rahmani'),
        'fr': ('Mujtaba', 'Rahmani'),
        'ar': ('مجتبى', 'رحماني'),
        'ur': ('مجتبیٰ', 'رحمانی'),
        'es': ('Mujtaba', 'Rahmani'),
        'zh': ('穆吉塔巴', '拉赫马尼'),
        'hi': ('मुजतबा', 'रहमानी'),
        'it': ('Mujtaba', 'Rahmani'),
        'pt': ('Mujtaba', 'Rahmani'),
        'ja': ('ムジタバ', 'ラフマニ'),
        'ko': ('무즈타바', '라흐마니'),
        'nl': ('Mujtaba', 'Rahmani'),
        'uz': ('Mujtaba', 'Rahmoniy'),
        'id': ('Mujtaba', 'Rahmani')
    },
    'sahel': {
        'en': ('Sahel', 'Salem'),
        'fa': ('ساحل', 'سالم'),
        'ps': ('ساحل', 'سالم'),
        'ru': ('Сахель', 'Салем'),
        'tr': ('Sahel', 'Salem'),
        'de': ('Sahel', 'Salem'),
        'fr': ('Sahel', 'Salem'),
        'ar': ('ساحل', 'سالم'),
        'ur': ('ساحل', 'سالم'),
        'es': ('Sahel', 'Salem'),
        'zh': ('萨赫尔', '萨利姆'),
        'hi': ('साहेल', 'सालेम'),
        'it': ('Sahel', 'Salem'),
        'pt': ('Sahel', 'Salem'),
        'ja': ('サヘル', 'サレム'),
        'ko': ('사헬', '살렘'),
        'nl': ('Sahel', 'Salem'),
        'uz': ('Sohel', 'Salem'),
        'id': ('Sahel', 'Salem')
    }
}

print("Names dictionary loaded.")

# Complete common translation helper
LABELS = {
    'backLink': {
        'en': "Back to Executive Board", 'fa': "بازگشت به هیئت مدیره اجرایی", 'ps': "د اجرایوي پلاوي ته بېرته",
        'ru': "Назад к совету директоров", 'tr': "Yönetim Kuruluna Geri Dön", 'de': "Zurück zum Vorstand",
        'fr': "Retour au Conseil d'Administration", 'ar': "العودة إلى مجلس الإدارة التنفيذي", 'ur': "ایگزیکٹو بورڈ پر واپس جائیں",
        'es': "Volver a la Junta Directiva", 'zh': "返回执行董事会", 'hi': "कार्यकारी बोर्ड पर वापस जाएं",
        'it': "Torna al Consiglio Direttivo", 'pt': "Voltar ao Conselho Executivo", 'ja': "取締役会に戻る",
        'ko': "이사회로 돌아가기", 'nl': "Terug naar Raad van Bestuur", 'uz': "Ijroiya kengashiga qaytish", 'id': "Kembali ke Dewan Eksekutif"
    },
    'clickCopy': {
        'en': "Click to copy email address", 'fa': "برای کاپی آدرس ایمیل کلیک کنید", 'ps': "د برېښنالیک پته کاپي کولو لپاره کلیک وکړئ",
        'ru': "Нажмите, чтобы скопировать эл. почту", 'tr': "E-posta adresini kopyalamak için tıklayın", 'de': "Klicken, um E-Mail-Adresse zu kopieren",
        'fr': "Cliquez pour copier l'adresse e-mail", 'ar': "انقر لنسخ عنوان البريد الإلكتروني", 'ur': "ای میل ایڈریس کاپی کرنے کے لیے کلک کریں",
        'es': "Haga clic para copiar el correo electrónico", 'zh': "点击复制电子邮件地址", 'hi': "ईमेल पता कॉपी करने के लिए क्लिक करें",
        'it': "Clicca per copiare l'indirizzo email", 'pt': "Clique para copiar o endereço de e-mail", 'ja': "クリックしてメールアドレスをコピー",
        'ko': "이메일 주소를 복사하려면 클릭하세요", 'nl': "Klik om e-mailadres te kopiëren", 'uz': "E-pochta manzilini nusxalash uchun bosing", 'id': "Klik untuk menyalin alamat email"
    },
    'copied': {
        'en': "Copied!", 'fa': "کاپی شد!", 'ps': "کاپي شو!", 'ru': "Скопировано!", 'tr': "Kopyalandı!", 'de': "Kopiert!", 'fr': "Copié !", 'ar': "تم النسخ!", 'ur': "کاپی ہو گیا!", 'es': "¡Copiado!", 'zh': "已复制！", 'hi': "कॉपी किया गया!", 'it': "Copiato!", 'pt': "Copiado!", 'ja': "コピーしました！", 'ko': "복사됨!", 'nl': "Gekopieerd!", 'uz': "Nusxalandi!", 'id': "Tersalin!"
    },
    'directContact': {
        'en': "Direct Executive Contact", 'fa': "ارتباط مستقیم با دفتر اجرایی", 'ps': "د اجرایوي دفتر سره مستقیمه اړیکه", 'ru': "Прямой исполнительный контакт", 'tr': "Doğrudan Yönetici İletişimi", 'de': "Direkter Führungskontakt", 'fr': "Contact Exécutif Direct", 'ar': "الاتصال التنفيذي المباشر", 'ur': "براہ راست ایگزیکٹو رابطہ", 'es': "Contacto Ejecutivo Directo", 'zh': "直接执行联系", 'hi': "प्रत्यक्ष कार्यकारी संपर्क", 'it': "Contatto Esecutivo Diretto", 'pt': "Contato Executivo Direto", 'ja': "エグゼクティブ直接連絡先", 'ko': "경영진 직접 연락처", 'nl': "Direct Uitvoerend Contact", 'uz': "To'g'ridan-to'g'ri ijroiya aloqasi", 'id': "Kontak Eksekutif Langsung"
    },
    'contactDesc': {
        'en': "For strategic corporate partnerships, institutional investments, or international keynotes:",
        'fa': "جهت همکاری‌های راهبردی شرکتی، سرمایه‌گذاری‌های نهادی یا سخنرانی‌های بین‌المللی:",
        'ps': "د ستراتیژیکو کارپوریټ شراکتونو، اداري پانګونو، یا نړیوالو خبرو اترو لپاره:",
        'ru': "Для стратегических корпоративных партнерств, институциональных инвестиций или международных выступлений:",
        'tr': "Stratejik kurumsal ortaklıklar, kurumsal yatırımlar veya uluslararası açılış konuşmaları için:",
        'de': "Für strategische Unternehmenspartnerschaften, institutionelle Investitionen oder internationale Keynotes:",
        'fr': "Pour des partenariats d'entreprise stratégiques, des investissements institutionnels ou des conférences internationales :",
        'ar': "للشراكات المؤسسية الاستراتيجية، أو الاستثمارات، أو الكلمات الرئيسية الدولية:",
        'ur': "اسٹریٹجک کارپوریٹ پارٹنرشپ، ادارہ جاتی سرمایہ کاری، یا بین الاقوامی تقاریر کے لیے:",
        'es': "Para asociaciones corporativas estratégicas, inversiones institucionales o conferencias internacionales:",
        'zh': "战略企业合作、机构投资或国际主题演讲：",
        'hi': "रणनीतिक कॉर्पोरेट साझेदारी, संस्थागत निवेश या अंतर्राष्ट्रीय मुख्य भाषणों के लिए:",
        'it': "Per partnership aziendali strategiche, investimenti istituzionali o keynote internazionali:",
        'pt': "Para parcerias corporativas estratégicas, investimentos institucionais ou palestras internacionais:",
        'ja': "戦略的な企業パートナーシップ、機関投資、国際的な基調講演については：",
        'ko': "전략적 기업 파트너십, 기관 투자 또는 국제 기조 연설 문의:",
        'nl': "Voor strategische bedrijfspartnerschappen, institutionele investeringen of internationale keynotes:",
        'uz': "Strategik korporativ hamkorlik, institutsional investitsiyalar yoki xalqaro ma'ruzalar uchun:",
        'id': "Untuk kemitraan perusahaan strategis, investasi institusional, atau pidato internasional:"
    }
}
print("Labels appended successfully.")
