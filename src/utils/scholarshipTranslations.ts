// ============================================================================
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

export const scholarshipTranslationsMap: Record<string, ScholarshipTranslation> = {
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
  },
  "ps": {
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
  "ru": {
    "dossierBadge": "Проверенный стандарт",
    "dossierTitle": "Чек-лист документов для поступления",
    "dossierSub": "Стандартные требования для успешной подачи на международные гранты",
    "verifiedMatrix": "Проверенный стандарт",
    "sopTitle": "Профессиональная редактура мотивационного письма (SOP)",
    "sopDesc": "Детальный анализ структуры, карьерных целей и соответствия требованиям выбранного университета.",
    "cvTitle": "Оптимизация резюме по стандартам Europass и ATS",
    "cvDesc": "Форматирование академических достижений, научных публикаций и лидерского опыта по международным нормам.",
    "mockTitle": "Симуляция вступительных и стипендиальных интервью",
    "mockDesc": "Тренировочные собеседования с выпускниками Оксфорда, Мюнхенского ТУ и Токийского технологического института.",
    "connectBtn": "Связаться с академическими менторами",
    "checkTranscripts": "1. Официальные дипломы и академические выписки",
    "checkTranscriptsBadge": "Обязательно",
    "checkSop": "2. Мотивационное письмо (SOP / Motivation)",
    "checkSopBadge": "Критически важно",
    "checkLetters": "3. Академические рекомендации (2-3 письма)",
    "checkLettersBadge": "Обязательно",
    "checkLanguage": "4. Языковой сертификат (IELTS / TOEFL / MOI)",
    "checkLanguageBadge": "Возможно освобождение",
    "checkCv": "5. Академическое резюме стандарта ATS",
    "checkCvBadge": "Обязательно",
    "checkProposal": "6. Исследовательский проект (магистратура и PhD)",
    "checkProposalBadge": "По требованию программы",
    "tipText": "Совет: Многие университеты Европы принимают справку Medium of Instruction (MOI) вместо IELTS, если предыдущее обучение велось на английском.",
    "faqBadge": "Пояснения и инструкции",
    "faqTitle": "Часто задаваемые вопросы о стипендиях",
    "faqSub": "Все о дедлайнах, языковых требованиях и поддержке со стороны Safi Academy.",
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
  "tr": {
    "dossierBadge": "Onaylı Şablon",
    "dossierTitle": "Başvuru Hazırlığı ve Evrak Dosyası",
    "dossierSub": "Uluslararası üniversiteler ve tam burslar için zorunlu belge standartları",
    "verifiedMatrix": "Onaylı Şablon",
    "sopTitle": "Niyet Mektubu (SOP) Uzman Revizyonu",
    "sopDesc": "Anlatı akışı, kariyer hedefleri ve üniversite uyumunun kelime kelime analizi.",
    "cvTitle": "Europass ve US ATS CV Optimizasyonu",
    "cvDesc": "Başarılarınızı, araştırmalarınızı ve liderlik deneyimlerinizi uluslararası standartlara göre düzenleyin.",
    "mockTitle": "Önceki Burs Kazananlarla Mülakat Simülasyonu",
    "mockDesc": "Oxford ve Münih Teknik Üniversitesi mezunlarıyla akademik ve davranışsal mülakat pratiği.",
    "connectBtn": "Kabul Mentorlarıyla İletişime Geçin",
    "checkTranscripts": "1. Resmi Transkript ve Mezuniyet Belgeleri",
    "checkTranscriptsBadge": "Zorunlu",
    "checkSop": "2. Niyet Mektubu (SOP / Motivation Letter)",
    "checkSopBadge": "Hayati",
    "checkLetters": "3. Akademik Referans Mektupları (2-3 Adet)",
    "checkLettersBadge": "Zorunlu",
    "checkLanguage": "4. Dil Yeterlilik Belgesi (IELTS / TOEFL / MOI)",
    "checkLanguageBadge": "Muafiyet Mümkün",
    "checkCv": "5. ATS Standartlarında Akademik Özgeçmiş (CV)",
    "checkCvBadge": "Zorunlu",
    "checkProposal": "6. Araştırma Önerisi (Yüksek Lisans & Doktora)",
    "checkProposalBadge": "Bölüme Bağlı",
    "tipText": "Önemli İpucu: Önceki dereceniz İngilizce ise, birçok Avrupa üniversitesi IELTS yerine İngilizce Eğitim Dili Belgesi (MOI) kabul eder.",
    "faqBadge": "Açıklamalar ve Rehberlik",
    "faqTitle": "Sıkça Sorulan Sorular",
    "faqSub": "Burs başvuruları, tarihler ve mentorluk programımız hakkında merak edilen her şey.",
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
  "de": {
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
  "fr": {
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
  "ar": {
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
  "ur": {
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
  "es": {
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
  "zh": {
    "dossierBadge": "官方认证模板",
    "dossierTitle": "申请准备与必备材料清单",
    "dossierSub": "国际顶尖高校及全额政府奖学金申请的标准材料规范",
    "verifiedMatrix": "官方认证模板",
    "sopTitle": "个人陈述与动机信（SOP）专业精修",
    "sopDesc": "逐字推敲叙事弧线、学术亮点、职业愿景及与目标导师课题的高度匹配。",
    "cvTitle": "欧美 ATS 标准学术简历（CV）优化",
    "cvDesc": "严格按照国际评审委员会格式，量化科研产出、论文发表及领导力里程碑。",
    "mockTitle": "牛津/慕尼黑工大往届奖学金得主全真模拟面试",
    "mockDesc": "与世界名校全奖校友面对面演练行为面试与学术答辩高频考点。",
    "connectBtn": "预约奖学金申请指导导师",
    "checkTranscripts": "1. 官方成绩单及学位学历证明",
    "checkTranscriptsBadge": "强制必备",
    "checkSop": "2. 针对性动机信与个人陈述 (SOP)",
    "checkSopBadge": "核心关键",
    "checkLetters": "3. 教授学术推荐信（2至3封）",
    "checkLettersBadge": "强制必备",
    "checkLanguage": "4. 语言能力凭证（雅思/托福或全英文授课证明MOI）",
    "checkLanguageBadge": "可申请豁免",
    "checkCv": "5. 详细学术简历 (符合国际ATS机器筛选标准)",
    "checkCvBadge": "强制必备",
    "checkProposal": "6. 博士/研究型硕士课题研究计划书 (Proposal)",
    "checkProposalBadge": "专业视情况而定",
    "tipText": "关键提示：若您前序学位为全英文授课，许多欧洲及亚洲名校允许提交授课语言证明（MOI）替代雅思。",
    "faqBadge": "官方政策释义",
    "faqTitle": "关于奖学金申请的常见疑问",
    "faqSub": "涵盖申请截止日、语言豁免流程及萨菲学院导师计划的全部关键信息。",
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
  "hi": {
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
  "it": {
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
  "pt": {
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
  "ja": {
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
  "ko": {
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
  "nl": {
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
  "uz": {
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
  "id": {
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
  }
};

export function getScholarshipTranslation(locale: string): ScholarshipTranslation {
  const norm = (locale || "en").toLowerCase();
  return scholarshipTranslationsMap[norm] || scholarshipTranslationsMap.en;
}
