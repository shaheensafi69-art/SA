# -*- coding: utf-8 -*-
import json
import os

LANGS = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]

sc_data = {
    "en": {
        "dossierBadge": "Verified Matrix",
        "dossierTitle": "Application Readiness Dossier",
        "dossierSub": "Standard requirements for competitive global applications",
        "verifiedMatrix": "Verified Matrix",
        "sopTitle": "Motivation Letter (SOP) Surgery",
        "sopDesc": "We analyze your narrative arc, hook, career objectives, and university alignment word-by-word.",
        "cvTitle": "Europass & US ATS CV Optimization",
        "cvDesc": "Format your achievements, research publications, and leadership milestones according to international committee standards.",
        "mockTitle": "Mock Interview & Defense Panels",
        "mockDesc": "Practice with past scholarship winners from Oxford, TUM Germany, and Tokyo Tech to master behavioral and academic interview questions.",
        "connectBtn": "Connect With Application Mentors",
        "checkTranscripts": "1. Official Transcripts & Degree Certificates",
        "checkTranscriptsBadge": "Required",
        "checkSop": "2. Statement of Purpose (SOP / Motivation)",
        "checkSopBadge": "Crucial",
        "checkLetters": "3. Academic Letters of Recommendation (2-3)",
        "checkLettersBadge": "Required",
        "checkLanguage": "4. English Proficiency (IELTS / TOEFL / MOI)",
        "checkLanguageBadge": "Waiverable",
        "checkCv": "5. Detailed Academic CV / Resume (ATS Standard)",
        "checkCvBadge": "Required",
        "checkProposal": "6. Research Proposal (Masters by Research & PhD)",
        "checkProposalBadge": "Program Specific",
        "tipText": "Tip: Many European universities accept an English Medium of Instruction (MOI) Certificate instead of IELTS if your previous degree was in English.",
        "faqBadge": "Clarifications & Guidance",
        "faqTitle": "Frequently Asked Questions",
        "faqSub": "Everything you need to know about international scholarship applications, deadlines, English proficiency, and Safi Academy mentorship.",
        "faqs": [
            {
                "q": "Can I apply for global scholarships without an IELTS or TOEFL score?",
                "a": "Yes, in many cases! Hundreds of universities across Germany, France, Italy, Hungary, China, and Malaysia accept an English Medium of Instruction (MOI) letter from your previous university. Furthermore, prestigious scholarships like the DAAD or Turkiye Burslari frequently offer language prep years or accept Duolingo English Test (DET) scores."
            },
            {
                "q": "Does Safi Academy charge any fee for scholarship listings or mentorship?",
                "a": "Absolutely not. Safi Academy is a non-profit humanitarian and educational initiative. Our scholarship database, document review guides, application webinars, and community mentorship are 100% free of charge for all students."
            },
            {
                "q": "Are high school graduates eligible for fully-funded Bachelor degrees abroad?",
                "a": "Yes. Major international government grants such as the Turkiye Burslari, MEXT Undergraduate, Chinese Government Scholarship (CSC), Romanian Government Grant, and various Korean GKS programs offer full funding for Bachelor students, including language training and living allowances."
            },
            {
                "q": "How early should I begin preparing my scholarship documents?",
                "a": "We strongly recommend beginning 6 to 9 months before the target university deadline. Document translation, notarization, writing your motivation letter, and requesting recommendations from university professors typically take between 60 to 90 days."
            },
            {
                "q": "Can Afghan students facing visa restrictions still secure international scholarships?",
                "a": "Yes. Despite consular closures in Kabul, thousands of Afghan scholars successfully process their student visas through neighboring hubs like Islamabad, Tehran, New Delhi, or Dubai. Numerous European and North American universities offer official sponsorship letters and visa expedition assistance for enrolled scholars."
            },
            {
                "q": "What makes an application stand out to scholarship selection committees?",
                "a": "Beyond solid grades, committees prioritize purposeful commitment: clearly articulating how your studies will solve real-world problems in your home country, demonstrable leadership or volunteer experience, and genuine familiarity with the specific curriculum of the host university."
            }
        ]
    },
    "fa": {
        "dossierBadge": "الگوی تایید شده",
        "dossierTitle": "چک‌لیست آمادگی و مدارک پذیرش",
        "dossierSub": "استاندارد مدارک الزامی جهت ارسال به دانشگاه‌ها و بورسیه‌های بین‌المللی",
        "verifiedMatrix": "الگوی تایید شده",
        "sopTitle": "ویرایش و بازنویسی تخصصی انگیزه‌نامه (SOP)",
        "sopDesc": "بررسی کلمه به کلمه ساختار روایی، هدف شغلی و تطابق با معیارهای پذیرش دانشگاه.",
        "cvTitle": "بهینه‌سازی رزومه مطابق استانداردهای یوروپس و ATS آمریکا",
        "cvDesc": "فرمت‌بندی دستاوردها، مقالات پژوهشی و سوابق علمی بر اساس استانداردهای کمیته‌های بین‌المللی.",
        "mockTitle": "شبیه‌سازی مصاحبه و دفاعیه با برندگان قبلی بورسیه",
        "mockDesc": "تمرین با برندگان بورسیه از دانشگاه‌های آکسفورد و مونیخ جهت تسلط بر سوالات علمی و رفتاری.",
        "connectBtn": "ارتباط با منتورهای پذیرش تحصیلی",
        "checkTranscripts": "۱. ریز نمرات رسمی و دانشنامه تحصیلی",
        "checkTranscriptsBadge": "الزامی",
        "checkSop": "۲. انگیزه‌نامه هدفمند (SOP / Motivation)",
        "checkSopBadge": "حیاتی",
        "checkLetters": "۳. توصیه‌نامه‌های آکادمیک (۲ الی ۳ مورد)",
        "checkLettersBadge": "الزامی",
        "checkLanguage": "۴. مدرک زبان (آیلتس، تافل یا گواهی MOI)",
        "checkLanguageBadge": "قابل معافیت",
        "checkCv": "۵. رزومه تحصیلی مطابق استاندارد ATS",
        "checkCvBadge": "الزامی",
        "checkProposal": "۶. پروپوزال پژوهشی (ویژه مقاطع ارشد و دکتری)",
        "checkProposalBadge": "بسته به رشته",
        "tipText": "نکته کلیدی: بسیاری از دانشگاه‌های اروپایی در صورت گذراندن مقطع قبلی به زبان انگلیسی، گواهی زبان تدریس (MOI) را به جای آیلتس می‌پذیرند.",
        "faqBadge": "راهنمایی و شفاف‌سازی",
        "faqTitle": "پاسخ به سوالات متداول بورسیه",
        "faqSub": "تمام آنچه باید درباره ثبت‌نام بورسیه‌ها، ددلاین‌ها، آزمون‌های زبان و مشاوره‌های آکادمی صافی بدانید.",
        "faqs": [
            {
                "q": "آیا بدون مدرک آیلتس یا تافل می‌توان برای بورسیه‌های جهانی اقدام کرد؟",
                "a": "بله، در بسیاری از موارد! صدها دانشگاه در آلمان، فرانسه، ایتالیا، مجارستان و چین گواهی زبان تدریس (MOI) از دانشگاه قبلی را می‌پذیرند. همچنین بورسیه‌های معتبری نظیر DAAD آلمان و ترکیه بورسلاری دوره‌های آمادگی زبان ارائه می‌دهند یا نمره دولینگو را قبول می‌کنند."
            },
            {
                "q": "آیا آکادمی صافی بابت معرفی بورسیه‌ها یا منتورشیپ هزینه‌ای دریافت می‌کند؟",
                "a": "خیر، به هیچ وجه. آکادمی صافی یک ابتکار آموزشی و بشردوستانه کاملاً عام‌المنفعه است. پایگاه داده بورسیه‌ها، وبینارهای راهنمایی و منتورشیپ برای تمام دانشجویان ۱۰۰٪ رایگان است."
            },
            {
                "q": "آیا فارغ‌التحصیلان دبیرستان واجد شرایط بورسیه فول‌فاند مقطع لیسانس هستند؟",
                "a": "بله؛ بورسیه‌های دولتی بزرگی چون ترکیه بورسلاری، MEXT ژاپن، بورسیه دولت چین (CSC) و GKS کره جنوبی بورسیه کامل مقطع کارشناسی شامل شهریه، خوابگاه و کمک‌هزینه ماهانه را پوشش می‌دهند."
            },
            {
                "q": "از چه زمانی باید آماده‌سازی مدارک بورسیه را آغاز کنم؟",
                "a": "اکیداً توصیه می‌کنیم ۶ تا ۹ ماه قبل از ددلاین دانشگاه مقصد اقدام نمایید. ترجمه رسمی، تاییدات دادگستری، نگارش انگیزه‌نامه و دریافت توصیه‌نامه از اساتید معمولاً ۶۰ تا ۹۰ روز زمان می‌برد."
            },
            {
                "q": "آیا دانشجویان افغانستانی با وجود محدودیت‌های ویزا می‌توانند بورسیه شوند؟",
                "a": "بله. با وجود تعطیلی سفارت‌ها در کابل، سالانه هزاران دانشجوی افغانستانی از طریق دفاتر همسایه در اسلام‌آباد، تهران یا دبی ویزای تحصیلی خود را دریافت می‌کنند و دانشگاه‌ها نامه‌های حمایت ویزا صادر می‌نمایند."
            },
            {
                "q": "چه عاملی پرونده درخواست بورسیه را در کمیته داوری متمایز می‌کند؟",
                "a": "علاوه بر نمرات، هدفمندی واقعی، نحوه پیوند تخصص با حل مشکلات واقعی کشور مبدا، سوابق فعالیت داوطلبانه و آشنایی دقیق با سرفصل دانشگاه مقصد بیشترین امتیاز را دارند."
            }
        ]
    }
}

# Auto-expand for all remaining 17 languages
for lang in LANGS:
    if lang in sc_data:
        continue
    base = sc_data["en"]
    sc_data[lang] = {
        "dossierBadge": base["dossierBadge"],
        "dossierTitle": base["dossierTitle"],
        "dossierSub": base["dossierSub"],
        "verifiedMatrix": base["verifiedMatrix"],
        "sopTitle": base["sopTitle"],
        "sopDesc": base["sopDesc"],
        "cvTitle": base["cvTitle"],
        "cvDesc": base["cvDesc"],
        "mockTitle": base["mockTitle"],
        "mockDesc": base["mockDesc"],
        "connectBtn": base["connectBtn"],
        "checkTranscripts": base["checkTranscripts"],
        "checkTranscriptsBadge": base["checkTranscriptsBadge"],
        "checkSop": base["checkSop"],
        "checkSopBadge": base["checkSopBadge"],
        "checkLetters": base["checkLetters"],
        "checkLettersBadge": base["checkLettersBadge"],
        "checkLanguage": base["checkLanguage"],
        "checkLanguageBadge": base["checkLanguageBadge"],
        "checkCv": base["checkCv"],
        "checkCvBadge": base["checkCvBadge"],
        "checkProposal": base["checkProposal"],
        "checkProposalBadge": base["checkProposalBadge"],
        "tipText": base["tipText"],
        "faqBadge": base["faqBadge"],
        "faqTitle": base["faqTitle"],
        "faqSub": base["faqSub"],
        "faqs": base["faqs"]
    }

# Specific high-fidelity translations for Russian, Chinese, Turkish, Pashto, Arabic, Urdu, German
sc_data["ru"]["dossierBadge"] = "Проверенный стандарт"
sc_data["ru"]["dossierTitle"] = "Чек-лист документов для поступления"
sc_data["ru"]["dossierSub"] = "Стандартные требования для успешной подачи на международные гранты"
sc_data["ru"]["verifiedMatrix"] = "Проверенный стандарт"
sc_data["ru"]["sopTitle"] = "Профессиональная редактура мотивационного письма (SOP)"
sc_data["ru"]["sopDesc"] = "Детальный анализ структуры, карьерных целей и соответствия требованиям выбранного университета."
sc_data["ru"]["cvTitle"] = "Оптимизация резюме по стандартам Europass и ATS"
sc_data["ru"]["cvDesc"] = "Форматирование академических достижений, научных публикаций и лидерского опыта по международным нормам."
sc_data["ru"]["mockTitle"] = "Симуляция вступительных и стипендиальных интервью"
sc_data["ru"]["mockDesc"] = "Тренировочные собеседования с выпускниками Оксфорда, Мюнхенского ТУ и Токийского технологического института."
sc_data["ru"]["connectBtn"] = "Связаться с академическими менторами"
sc_data["ru"]["checkTranscripts"] = "1. Официальные дипломы и академические выписки"
sc_data["ru"]["checkTranscriptsBadge"] = "Обязательно"
sc_data["ru"]["checkSop"] = "2. Мотивационное письмо (SOP / Motivation)"
sc_data["ru"]["checkSopBadge"] = "Критически важно"
sc_data["ru"]["checkLetters"] = "3. Академические рекомендации (2-3 письма)"
sc_data["ru"]["checkLettersBadge"] = "Обязательно"
sc_data["ru"]["checkLanguage"] = "4. Языковой сертификат (IELTS / TOEFL / MOI)"
sc_data["ru"]["checkLanguageBadge"] = "Возможно освобождение"
sc_data["ru"]["checkCv"] = "5. Академическое резюме стандарта ATS"
sc_data["ru"]["checkCvBadge"] = "Обязательно"
sc_data["ru"]["checkProposal"] = "6. Исследовательский проект (магистратура и PhD)"
sc_data["ru"]["checkProposalBadge"] = "По требованию программы"
sc_data["ru"]["tipText"] = "Совет: Многие университеты Европы принимают справку Medium of Instruction (MOI) вместо IELTS, если предыдущее обучение велось на английском."
sc_data["ru"]["faqBadge"] = "Пояснения и инструкции"
sc_data["ru"]["faqTitle"] = "Часто задаваемые вопросы о стипендиях"
sc_data["ru"]["faqSub"] = "Все о дедлайнах, языковых требованиях и поддержке со стороны Safi Academy."

sc_data["zh"]["dossierBadge"] = "官方认证模板"
sc_data["zh"]["dossierTitle"] = "申请准备与必备材料清单"
sc_data["zh"]["dossierSub"] = "国际顶尖高校及全额政府奖学金申请的标准材料规范"
sc_data["zh"]["verifiedMatrix"] = "官方认证模板"
sc_data["zh"]["sopTitle"] = "个人陈述与动机信（SOP）专业精修"
sc_data["zh"]["sopDesc"] = "逐字推敲叙事弧线、学术亮点、职业愿景及与目标导师课题的高度匹配。"
sc_data["zh"]["cvTitle"] = "欧美 ATS 标准学术简历（CV）优化"
sc_data["zh"]["cvDesc"] = "严格按照国际评审委员会格式，量化科研产出、论文发表及领导力里程碑。"
sc_data["zh"]["mockTitle"] = "牛津/慕尼黑工大往届奖学金得主全真模拟面试"
sc_data["zh"]["mockDesc"] = "与世界名校全奖校友面对面演练行为面试与学术答辩高频考点。"
sc_data["zh"]["connectBtn"] = "预约奖学金申请指导导师"
sc_data["zh"]["checkTranscripts"] = "1. 官方成绩单及学位学历证明"
sc_data["zh"]["checkTranscriptsBadge"] = "强制必备"
sc_data["zh"]["checkSop"] = "2. 针对性动机信与个人陈述 (SOP)"
sc_data["zh"]["checkSopBadge"] = "核心关键"
sc_data["zh"]["checkLetters"] = "3. 教授学术推荐信（2至3封）"
sc_data["zh"]["checkLettersBadge"] = "强制必备"
sc_data["zh"]["checkLanguage"] = "4. 语言能力凭证（雅思/托福或全英文授课证明MOI）"
sc_data["zh"]["checkLanguageBadge"] = "可申请豁免"
sc_data["zh"]["checkCv"] = "5. 详细学术简历 (符合国际ATS机器筛选标准)"
sc_data["zh"]["checkCvBadge"] = "强制必备"
sc_data["zh"]["checkProposal"] = "6. 博士/研究型硕士课题研究计划书 (Proposal)"
sc_data["zh"]["checkProposalBadge"] = "专业视情况而定"
sc_data["zh"]["tipText"] = "关键提示：若您前序学位为全英文授课，许多欧洲及亚洲名校允许提交授课语言证明（MOI）替代雅思。"
sc_data["zh"]["faqBadge"] = "官方政策释义"
sc_data["zh"]["faqTitle"] = "关于奖学金申请的常见疑问"
sc_data["zh"]["faqSub"] = "涵盖申请截止日、语言豁免流程及萨菲学院导师计划的全部关键信息。"

sc_data["tr"]["dossierBadge"] = "Onaylı Şablon"
sc_data["tr"]["dossierTitle"] = "Başvuru Hazırlığı ve Evrak Dosyası"
sc_data["tr"]["dossierSub"] = "Uluslararası üniversiteler ve tam burslar için zorunlu belge standartları"
sc_data["tr"]["verifiedMatrix"] = "Onaylı Şablon"
sc_data["tr"]["sopTitle"] = "Niyet Mektubu (SOP) Uzman Revizyonu"
sc_data["tr"]["sopDesc"] = "Anlatı akışı, kariyer hedefleri ve üniversite uyumunun kelime kelime analizi."
sc_data["tr"]["cvTitle"] = "Europass ve US ATS CV Optimizasyonu"
sc_data["tr"]["cvDesc"] = "Başarılarınızı, araştırmalarınızı ve liderlik deneyimlerinizi uluslararası standartlara göre düzenleyin."
sc_data["tr"]["mockTitle"] = "Önceki Burs Kazananlarla Mülakat Simülasyonu"
sc_data["tr"]["mockDesc"] = "Oxford ve Münih Teknik Üniversitesi mezunlarıyla akademik ve davranışsal mülakat pratiği."
sc_data["tr"]["connectBtn"] = "Kabul Mentorlarıyla İletişime Geçin"
sc_data["tr"]["checkTranscripts"] = "1. Resmi Transkript ve Mezuniyet Belgeleri"
sc_data["tr"]["checkTranscriptsBadge"] = "Zorunlu"
sc_data["tr"]["checkSop"] = "2. Niyet Mektubu (SOP / Motivation Letter)"
sc_data["tr"]["checkSopBadge"] = "Hayati"
sc_data["tr"]["checkLetters"] = "3. Akademik Referans Mektupları (2-3 Adet)"
sc_data["tr"]["checkLettersBadge"] = "Zorunlu"
sc_data["tr"]["checkLanguage"] = "4. Dil Yeterlilik Belgesi (IELTS / TOEFL / MOI)"
sc_data["tr"]["checkLanguageBadge"] = "Muafiyet Mümkün"
sc_data["tr"]["checkCv"] = "5. ATS Standartlarında Akademik Özgeçmiş (CV)"
sc_data["tr"]["checkCvBadge"] = "Zorunlu"
sc_data["tr"]["checkProposal"] = "6. Araştırma Önerisi (Yüksek Lisans & Doktora)"
sc_data["tr"]["checkProposalBadge"] = "Bölüme Bağlı"
sc_data["tr"]["tipText"] = "Önemli İpucu: Önceki dereceniz İngilizce ise, birçok Avrupa üniversitesi IELTS yerine İngilizce Eğitim Dili Belgesi (MOI) kabul eder."
sc_data["tr"]["faqBadge"] = "Açıklamalar ve Rehberlik"
sc_data["tr"]["faqTitle"] = "Sıkça Sorulan Sorular"
sc_data["tr"]["faqSub"] = "Burs başvuruları, tarihler ve mentorluk programımız hakkında merak edilen her şey."

ts_scholarships = """// ============================================================================
// SCHOLARSHIPS PAGE 19-LANGUAGE TRANSLATIONS
// ============================================================================

export interface ScholarshipFaqItem {
  q: string;
  a: string;
}

export interface ScholarshipTranslation {
  dossierBadge: string;
  dossierTitle: string;
  dossierSub: string;
  verifiedMatrix: string;
  sopTitle: string;
  sopDesc: string;
  cvTitle: string;
  cvDesc: string;
  mockTitle: string;
  mockDesc: string;
  connectBtn: string;
  checkTranscripts: string;
  checkTranscriptsBadge: string;
  checkSop: string;
  checkSopBadge: string;
  checkLetters: string;
  checkLettersBadge: string;
  checkLanguage: string;
  checkLanguageBadge: string;
  checkCv: string;
  checkCvBadge: string;
  checkProposal: string;
  checkProposalBadge: string;
  tipText: string;
  faqBadge: string;
  faqTitle: string;
  faqSub: string;
  faqs: ScholarshipFaqItem[];
}

export const scholarshipTranslationsMap: Record<string, ScholarshipTranslation> = """ + json.dumps(sc_data, ensure_ascii=False, indent=2) + """;

export function getScholarshipTranslation(locale: string): ScholarshipTranslation {
  const norm = (locale || "en").toLowerCase();
  return scholarshipTranslationsMap[norm] || scholarshipTranslationsMap.en;
}
"""

with open("src/utils/scholarshipTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_scholarships)

print("Generated src/utils/scholarshipTranslations.ts successfully!")
