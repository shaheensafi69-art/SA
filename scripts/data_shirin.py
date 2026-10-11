# -*- coding: utf-8 -*-
from data_common import LOCALES

def get_shirin(loc):
    names = {
        'en': ('Shirin', 'Gol Ahmadi'), 'fa': ('شیرین', 'گل احمدی'), 'ps': ('شیرین', 'ګل احمدي'),
        'ru': ('Ширин', 'Голь Ахмади'), 'tr': ('Şirin', 'Gül Ahmedi'), 'de': ('Shirin', 'Gol Ahmadi'),
        'fr': ('Shirin', 'Gol Ahmadi'), 'ar': ('شيرين', 'غل أحمدي'), 'ur': ('شیریں', 'گل احمدی'),
        'es': ('Shirin', 'Gol Ahmadi'), 'zh': ('希林', '戈尔·艾哈迈迪'), 'hi': ('शीरीन', 'गुल अहमदी'),
        'it': ('Shirin', 'Gol Ahmadi'), 'pt': ('Shirin', 'Gol Ahmadi'), 'ja': ('シリン', 'ゴル・アフマディ'),
        'ko': ('시린', '골 아흐마디'), 'nl': ('Shirin', 'Gol Ahmadi'), 'uz': ('Shirin', 'Gul Ahmadiy'), 'id': ('Shirin', 'Gol Ahmadi')
    }
    first, last = names.get(loc, ('Shirin', 'Gol Ahmadi'))
    full = f"{first} {last}" if loc != 'zh' else f"{first}·{last}"

    roles = {
        'en': "General Manager of All Safi Ecosystem",
        'fa': "جنرال منیجر تمام اکوسیستم صافی",
        'ps': "د ټول صافي ایکوسیستم عمومي مدیره",
        'ru': "Генеральный менеджер всей экосистемы Safi",
        'tr': "Tüm Safi Ekosisteminin Genel Müdürü",
        'de': "Generaldirektorin des gesamten Safi-Ökosystems",
        'fr': "Directrice Générale de tout l'écosystème Safi",
        'ar': "المدير العام لكامل منظومة صافي",
        'ur': "تمام صافی ایکو سسٹم کی جنرل مینیجر",
        'es': "Directora General de todo el Ecosistema Safi",
        'zh': "萨菲全生态系统总经理",
        'hi': "संपूर्ण सफी इकोसिस्टम की महाप्रबंधक",
        'it': "Direttrice Generale dell'intero Ecosistema Safi",
        'pt': "Diretora Geral de todo o Ecossistema Safi",
        'ja': "サフィ全エコシステム統括ゼネラルマネージャー",
        'ko': "사피 전 에코시스템 총괄 제너럴 매니저",
        'nl': "Algemeen Directeur van het gehele Safi-ecosysteem",
        'uz': "Barcha Safiy ekotizimining Bosh menejeri",
        'id': "Manajer Umum Seluruh Ekosistem Safi"
    }

    bios = {
        'en': "General Manager of All Safi Ecosystem, Applied AI Systems Director & Multi-Disciplinary Digital Strategist.",
        'fa': "جنرال منیجر تمام اکوسیستم صافی، هدایت‌کننده یکپارچه‌سازی سیستم‌های هوش مصنوعی و استراتژی‌های بین‌المللی.",
        'ps': "د ټول صافي ایکوسیستم عمومي مدیره، د مصنوعي استخباراتو سیسټمونو لارښوده او څو اړخیزه ډیجیټل ستراتیژیسته.",
        'ru': "Генеральный менеджер всей экосистемы Safi, директор систем прикладного ИИ и мультидисциплинарный стратег.",
        'tr': "Tüm Safi Ekosisteminin Genel Müdürü, Uygulamalı Yapay Zeka Sistemleri Direktörü ve Dijital Stratejist.",
        'de': "Generaldirektorin des gesamten Safi-Ökosystems, Direktorin für angewandte KI-Systeme & multidisziplinäre Strategin.",
        'fr': "Directrice Générale de tout l'écosystème Safi, Directrice des Systèmes d'IA Appliquée & Stratège Numérique.",
        'ar': "المدير العام لكامل منظومة صافي، مديرة أنظمة الذكاء الاصطناعي التطبيقي والمستشارة الرقمية.",
        'ur': "تمام صافی ایکو سسٹم کی جنرل مینیجر، اپلائیڈ اے آئی سسٹمز ڈائریکٹر اور کثیر الجہتی ڈیجیٹل اسٹریٹجسٹ۔",
        'es': "Directora General de todo el Ecosistema Safi, Directora de Sistemas de IA Aplicada y Estratega Digital.",
        'zh': "萨菲全生态系统总经理、应用人工智能系统总监兼多领域数字战略专家。",
        'hi': "संपूर्ण सफी इकोसिस्टम की महाप्रबंधक, अनुप्रयुक्त एआई सिस्टम निदेशक और बहु-विषयक डिजिटल रणनीतिकार।",
        'it': "Direttrice Generale dell'intero Ecosistema Safi, Direttrice dei Sistemi di IA Applicata e Stratega Digitale.",
        'pt': "Diretora Geral de todo o Ecossistema Safi, Diretora de Sistemas de IA Aplicada e Estrategista Digital.",
        'ja': "サフィ全エコシステム統括ゼネラルマネージャー、応用AIシステムディレクター兼デジタルストラテジスト。",
        'ko': "사피 전 에코시스템 총괄 제너럴 매니저, 응용 AI 시스템 디렉터 및 다학제적 디지털 전략가.",
        'nl': "Algemeen Directeur van het gehele Safi-ecosysteem, Directeur Toegepaste AI-systemen & Digitaal Strateeg.",
        'uz': "Barcha Safiy ekotizimining Bosh menejeri, Amaliy sun'iy intellekt tizimlari direktori va raqamli strateg.",
        'id': "Manajer Umum Seluruh Ekosistem Safi, Direktur Sistem AI Terapan & Ahli Strategi Digital Multidisiplin."
    }

    offices = {
        'en': "General Operations & AI Systems • Islamabad", 'fa': "عملیات عمومی و سیستم‌های هوش مصنوعی • اسلام‌آباد",
        'ps': "عمومي عملیات او د مصنوعي استخباراتو سیسټمونه • اسلام اباد", 'ru': "Общие операции и системы ИИ • Исламабад",
        'tr': "Genel Operasyonlar ve Yapay Zeka Sistemleri • İslamabad", 'de': "Allgemeine Operationen & KI-Systeme • Islamabad",
        'fr': "Opérations Générales & Systèmes d'IA • Islamabad", 'ar': "العمليات العامة وأنظمة الذكاء الاصطناعي • إسلام أباد",
        'ur': "عمومی آپریشنز اور اے آئی سسٹمز • اسلام آباد", 'es': "Operaciones Generales y Sistemas de IA • Islamabad",
        'zh': "综合运营与人工智能系统 • 伊斯兰堡", 'hi': "सामान्य संचालन और एआई सिस्टम • इस्लामाबाद",
        'it': "Operazioni Generali e Sistemi di IA • Islamabad", 'pt': "Operações Gerais e Sistemas de IA • Islamabad",
        'ja': "統括オペレーション＆AIシステム • イスラマバード", 'ko': "총괄 운영 및 AI 시스템 • 이슬라마바드",
        'nl': "Algemene Operaties & AI-systemen • Islamabad", 'uz': "Umumiy operatsiyalar va AI tizimlari • Islomobod",
        'id': "Operasi Umum & Sistem AI • Islamabad"
    }

    coordinates = {
        'en': "Islamabad, Pakistan & Global", 'fa': "اسلام‌آباد، پاکستان و بین‌المللی", 'ps': "اسلام اباد، پاکستان او نړیوال",
        'ru': "Исламабад, Пакистан и мир", 'tr': "İslamabad, Pakistan & Küresel", 'de': "Islamabad, Pakistan & Global",
        'fr': "Islamabad, Pakistan & International", 'ar': "إسلام أباد، باكستان ودولياً", 'ur': "اسلام آباد، پاکستان اور بین الاقوامی",
        'es': "Islamabad, Pakistán y Global", 'zh': "巴基斯坦伊斯兰堡与全球", 'hi': "इस्लामाबाद, पाकिस्तान और वैश्विक",
        'it': "Islamabad, Pakistan e Globale", 'pt': "Islamabad, Paquistão e Global", 'ja': "パキスタン・イスラマバード＆グローバル",
        'ko': "파키스탄 이슬라마바드 및 글로벌", 'nl': "Islamabad, Pakistan & Wereldwijd", 'uz': "Islomobod, Pokiston va global",
        'id': "Islamabad, Pakistan & Global"
    }

    borns = {
        'en': "Born: December 16, 2004", 'fa': "تاریخ تولد: ۱۶ دسامبر ۲۰۰۴", 'ps': "د زیږیدنې نیټه: ۱۶ ډسمبر ۲۰۰۴",
        'ru': "Дата рождения: 16 декабря 2004 г.", 'tr': "Doğum: 16 Aralık 2004", 'de': "Geboren: 16. Dezember 2004",
        'fr': "Née le : 16 décembre 2004", 'ar': "تاريخ الميلاد: 16 ديسمبر 2004", 'ur': "تاریخ پیدائش: 16 دسمبر 2004",
        'es': "Nacimiento: 16 de diciembre de 2004", 'zh': "出生日期：2004年12月16日", 'hi': "जन्म: 16 दिसंबर 2004",
        'it': "Nata: 16 dicembre 2004", 'pt': "Data de nascimento: 16 de dezembro de 2004", 'ja': "生年月日：2004年12月16日",
        'ko': "출생: 2004년 12월 16일", 'nl': "Geboren: 16 december 2004", 'uz': "Tug'ilgan sana: 16-dekabr, 2004-yil",
        'id': "Lahir: 16 Desember 2004"
    }

    badgeAIs = {
        'en': "Applied AI Systems", 'fa': "سیستم‌های کاربردی هوش مصنوعی", 'ps': "د مصنوعي استخباراتو تطبیقي سیسټمونه",
        'ru': "Системы прикладного ИИ", 'tr': "Uygulamalı Yapay Zeka Sistemleri", 'de': "Angewandte KI-Systeme",
        'fr': "Systèmes d'IA Appliquée", 'ar': "أنظمة الذكاء الاصطناعي التطبيقي", 'ur': "اپلائیڈ اے آئی سسٹمز",
        'es': "Sistemas de IA Aplicada", 'zh': "应用人工智能系统", 'hi': "अनुप्रयुक्त एआई सिस्टम",
        'it': "Sistemi di IA Applicata", 'pt': "Sistemas de IA Aplicada", 'ja': "応用AIシステム",
        'ko': "응용 AI 시스템", 'nl': "Toegepaste AI-systemen", 'uz': "Amaliy AI tizimlari", 'id': "Sistem AI Terapan"
    }

    badgeAgents = {
        'en': "Autonomous Agents", 'fa': "ایجنت‌های خودکار و ایجنتیک", 'ps': "خودکاره اجنټان",
        'ru': "Автономные агенты", 'tr': "Otonom Ajanlar", 'de': "Autonome Agenten",
        'fr': "Agents Autonomes", 'ar': "الوكلاء المستقلون", 'ur': "خود مختار ایجنٹس",
        'es': "Agentes Autónomos", 'zh': "自主智能体", 'hi': "स्वायत्त एजेंट",
        'it': "Agenti Autonomi", 'pt': "Agentes Autónomos", 'ja': "自律型エージェント",
        'ko': "자율 에이전트", 'nl': "Autonome Agenten", 'uz': "Avtonom agentlar", 'id': "Agen Otonom"
    }

    boardTexts = {
        'en': "Executive Board • Safi Global Ecosystem",
        'fa': "هیئت مدیره اجرایی • اکوسیستم جهانی صافی",
        'ps': "اجرایوي بورډ • د صافي نړیوال ایکوسیستم",
        'ru': "Исполнительный совет • Глобальная экосистема Safi",
        'tr': "Yönetim Kurulu • Safi Küresel Ekosistemi",
        'de': "Vorstand • Globales Safi-Ökosystem",
        'fr': "Conseil Exécutif • Écosystème Mondial Safi",
        'ar': "مجلس الإدارة التنفيذي • منظومة صافي العالمية",
        'ur': "ایگزیکٹو بورڈ • صافی گلوبل ایکو سسٹم",
        'es': "Junta Directiva • Ecosistema Global Safi",
        'zh': "执行董事会 • 萨菲全球生态系统",
        'hi': "कार्यकारी बोर्ड • सफी ग्लोबल इकोसिस्टम",
        'it': "Consiglio Esecutivo • Ecosistema Globale Safi",
        'pt': "Conselho Executivo • Ecossistema Global Safi",
        'ja': "取締役会 • サフィ・グローバル・エコシステム",
        'ko': "이사회 • 사피 글로벌 에코시스템",
        'nl': "Raad van Bestuur • Wereldwijd Safi Ecosysteem",
        'uz': "Ijroiya kengashi • Safiy global ekotizimi",
        'id': "Dewan Eksekutif • Ekosistem Global Safi"
    }

    manifestoTitles = {
        'en': "Executive Leadership & Applied AI Directive",
        'fa': "رهبری اجرایی و دستورالعمل هوش مصنوعی کاربردی",
        'ps': "اجرایوي رهبري او د تطبیقي مصنوعي استخباراتو لارښود",
        'ru': "Исполнительное руководство и директива по прикладному ИИ",
        'tr': "Yönetici Liderliği ve Uygulamalı Yapay Zeka Direktifi",
        'de': "Führungsdirektive & Angewandte KI-Strategie",
        'fr': "Direction Exécutive & Directive d'IA Appliquée",
        'ar': "القيادة التنفيذية وتوجيهات الذكاء الاصطناعي التطبيقي",
        'ur': "ایگزیکٹو قیادت اور اپلائیڈ اے آئی ہدایت نامہ",
        'es': "Liderazgo Ejecutivo y Directiva de IA Aplicada",
        'zh': "执行领导力与应用人工智能指令",
        'hi': "कार्यकारी नेतृत्व और अनुप्रयुक्त एआई निर्देश",
        'it': "Leadership Esecutiva e Direttiva sull'IA Applicata",
        'pt': "Liderança Executiva e Diretiva de IA Aplicada",
        'ja': "エグゼクティブリーダーシップ＆応用AI方針",
        'ko': "경영진 리더십 및 응용 AI 지침",
        'nl': "Uitvoerend Leiderschap & Toegepaste AI-richtlijn",
        'uz': "Ijroiya yetakchiligi va Amaliy AI yo'riqnomasi",
        'id': "Kepemimpinan Eksekutif & Direktif AI Terapan"
    }

    quotes = {
        'en': "\"At SafiPay and Safi Academy, our mission transcends traditional operations. We are actively deploying artificial intelligence not merely as a novelty, but as a core multiplier that accelerates student mastery, streamlines payment compliance, and opens international markets to previously underserved communities.\"",
        'fa': "«در صافی‌پی و آکادمی صافی، رسالت ما فراتر از عملیات سنتی است. ما هوش مصنوعی را نه به‌عنوان یک ابزار گذرا، بلکه به‌عنوان یک نیروی محرکه بنیادین به کار می‌گیریم که تسلط تحصیلی شاگردان را شتاب می‌بخشد، انطباق سیستم‌های مالی را تسریع می‌کند و درهای بازارهای جهانی را به روی جامعه ما می‌گشاید.»",
        'ps': "«په صافي‌پي او صافي اکاډمۍ کې زموږ ماموریت له دودیزو چارو ډېر لوړ دی. موږ مصنوعي استخبارات د یو بنسټیز ځواک په توګه کاروو چې د محصلینو زده کړه ګړندۍ کوي، د تادیاتو قانوني پروسې اسانه کوي او نړیوال بازارونه پرانیزي.»",
        'ru': "«В SafiPay и Safi Academy наша миссия выходит далеко за рамки традиционных операций. Мы внедряем искусственный интеллект как ключевой мультипликатор, который ускоряет обучение студентов, оптимизирует платежи и открывает мировые рынки.»",
        'tr': "\"SafiPay ve Safi Academy'de misyonumuz geleneksel operasyonların ötesine geçmektedir. Yapay zekayı öğrencilerin başarısını hızlandıran, ödeme uyumunu kolaylaştıran ve uluslararası pazarları açan temel bir güç olarak kullanıyoruz.\"",
        'de': "„Bei SafiPay und der Safi Academy geht unsere Mission weit über traditionelle Abläufe hinaus. Wir setzen künstliche Intelligenz als Kernmultiplikator ein, der den Lernerfolg beschleunigt und globale Märkte eröffnet.“",
        'fr': "« Chez SafiPay et Safi Academy, notre mission dépasse les opérations traditionnelles. Nous déployons l'intelligence artificielle comme un multiplicateur essentiel qui accélère la maîtrise des étudiants et ouvre les marchés mondiaux. »",
        'ar': "«في صافي بي وأكاديمية صافي، تتجاوز مهمتنا العمليات التقليدية. نحن نوظف الذكاء الاصطناعي كمضاعف أساسي يسرع إتقان الطلاب ويفتح الأسواق الدولية أمام المجتمعات الواعدة.»",
        'ur': "«صافی پے اور صافی اکیڈمی میں ہمارا مشن روایتی آپریشنز سے کہیں بڑھ کر ہے۔ ہم مصنوعی ذہانت کو ایک بنیادی طاقت کے طور پر نافذ کر رہے ہیں جو طلباء کی مہارت کو تیز کرتی ہے اور عالمی منڈیوں کو کھولتی ہے۔»",
        'es': "«En SafiPay y Safi Academy, nuestra misión trasciende las operaciones tradicionales. Desplegamos la inteligencia artificial como un multiplicador central que acelera el aprendizaje y abre mercados internacionales.»",
        'zh': "“在SafiPay和萨菲学院，我们的使命超越了传统运营。我们正积极部署人工智能作为核心驱动力，加速学生的技能掌握并为全球学子开拓国际市场。”",
        'hi': "«सफीपे और सफी अकादमी में हमारा मिशन पारंपरिक संचालन से परे है। हम कृत्रिम बुद्धिमत्ता को एक मुख्य गुणक के रूप में लागू कर रहे हैं जो छात्रों के सीखने की गति को तेज करता है और वैश्विक बाजारों को खोलता है।»",
        'it': "«In SafiPay e Safi Academy, la nostra missione va oltre le operazioni tradizionali. Implementiamo l'intelligenza artificiale come un moltiplicatore centrale che accelera l'apprendimento e apre mercati globali.»",
        'pt': "«No SafiPay e na Safi Academy, a nossa missão transcende as operações tradicionais. Implementamos a inteligência artificial como um multiplicador central que acelera a aprendizagem e abre mercados internacionais.»",
        'ja': "「SafiPayとサフィ・アカデミーにおいて、私たちの使命は従来の運営を超越しています。私たちはAIを単なる目新しさとしてではなく、生徒の習熟を加速させ、世界市場を開拓する中核的な力として活用しています。」",
        'ko': "\"SafiPay와 사피 아카데미에서 우리의 사명은 전통적인 운영을 뛰어넘습니다. 우리는 인공지능을 단순한 신기술이 아닌, 학생들의 학습 속도를 가속화하고 글로벌 시장을 열어주는 핵심 원동력으로 적극 도입하고 있습니다.\"",
        'nl': "„Bij SafiPay en Safi Academy overstijgt onze missie traditionele operaties. We zetten AI in als een kernvermenigvuldiger die het leren van studenten versnelt en internationale markten opent.”",
        'uz': "«SafiPay va Safiy Academy'da bizning vazifamiz an'anaviy operatsiyalardan ancha yuqori. Biz sun'iy intellektni talabalarning mahoratini oshiruvchi va xalqaro bozorlarni ochuvchi asosiy kuch sifatida joriy qilmoqdamiz.»",
        'id': "«Di SafiPay dan Safi Academy, misi kami melampaui operasi tradisional. Kami menerapkan kecerdasan buatan sebagai pengganda inti yang mempercepat penguasaan siswa dan membuka pasar internasional.»"
    }

    quoteLocations = {
        'en': f"— {full} • General Manager & AI Specialist",
        'fa': f"— {full} • جنرال منیجر و متخصص هوش مصنوعی",
        'ps': f"— {full} • عمومي مدیره او د مصنوعي استخباراتو متخصصه",
        'ru': f"— {full} • Генеральный менеджер и специалист по ИИ",
        'tr': f"— {full} • Genel Müdür & Yapay Zeka Uzmanı",
        'de': f"— {full} • Generaldirektorin & KI-Spezialistin",
        'fr': f"— {full} • Directrice Générale & Spécialiste IA",
        'ar': f"— {full} • المدير العام وخبير الذكاء الاصطناعي",
        'ur': f"— {full} • جنرل مینیجر اور اے آئی اسپیشلسٹ",
        'es': f"— {full} • Directora General y Especialista en IA",
        'zh': f"— {full} • 总经理兼人工智能专家",
        'hi': f"— {full} • महाप्रबंधक और एआई विशेषज्ञ",
        'it': f"— {full} • Direttrice Generale & Specialista IA",
        'pt': f"— {full} • Diretora Geral & Especialista em IA",
        'ja': f"— {full} • ゼネラルマネージャー＆AIスペシャリスト",
        'ko': f"— {full} • 제너럴 매니저 & AI 전문가",
        'nl': f"— {full} • Algemeen Directeur & AI-specialist",
        'uz': f"— {full} • Bosh menejer va AI bo'yicha mutaxassis",
        'id': f"— {full} • Manajer Umum & Spesialis AI"
    }

    return {
        'name': full,
        'firstName': first,
        'lastName': last,
        'role': roles.get(loc, roles['en']),
        'office': offices.get(loc, offices['en']),
        'coordinates': coordinates.get(loc, coordinates['en']),
        'born': borns.get(loc, borns['en']),
        'badgeAI': badgeAIs.get(loc, badgeAIs['en']),
        'badgeAgents': badgeAgents.get(loc, badgeAgents['en']),
        'badgeManager': roles.get(loc, roles['en']),
        'boardText': boardTexts.get(loc, boardTexts['en']),
        'bio': bios.get(loc, bios['en']),
        'manifestoTitle': manifestoTitles.get(loc, manifestoTitles['en']),
        'manifestoQuote': quotes.get(loc, quotes['en']),
        'manifestoAuthor': quoteLocations.get(loc, quoteLocations['en'])
    }
