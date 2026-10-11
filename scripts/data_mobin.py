# -*- coding: utf-8 -*-
from data_common import LOCALES

def get_mobin(loc):
    names = {
        'en': ('Mobin', 'Hassani'), 'fa': ('مبین', 'حسنی'), 'ps': ('مبین', 'حسني'),
        'ru': ('Мобин', 'Хассани'), 'tr': ('Mobin', 'Hassani'), 'de': ('Mobin', 'Hassani'),
        'fr': ('Mobin', 'Hassani'), 'ar': ('مبين', 'حسني'), 'ur': ('مبین', 'حسنی'),
        'es': ('Mobin', 'Hassani'), 'zh': ('莫宾', '哈萨尼'), 'hi': ('मोबिन', 'हस्सानी'),
        'it': ('Mobin', 'Hassani'), 'pt': ('Mobin', 'Hassani'), 'ja': ('モビン', 'ハッサニ'),
        'ko': ('모빈', '하사니'), 'nl': ('Mobin', 'Hassani'), 'uz': ('Mobin', 'Hassaniy'), 'id': ('Mobin', 'Hassani')
    }
    first, last = names.get(loc, ('Mobin', 'Hassani'))
    full = f"{first} {last}" if loc != 'zh' else f"{first}·{last}"

    roles = {
        'en': "Lead Developer & Head of Software Engineering",
        'fa': "لیدر بخش توسعه‌دهندگان و مهندسی نرم‌افزار",
        'ps': "د پرمختیا کونکو څانګې مشر او د ساوت ویر انجینرۍ لارښود",
        'ru': "Ведущий разработчик и руководитель отдела программной инженерии",
        'tr': "Baş Geliştirici ve Yazılım Mühendisliği Başkanı",
        'de': "Lead Developer & Leiter der Softwareentwicklung",
        'fr': "Développeur Principal & Responsable de l'Ingénierie Logicielle",
        'ar': "كبير المطورين ورئيس قسم هندسة البرمجيات",
        'ur': "لیڈ ڈویلپر اور شعبہ سافٹ ویئر انجینئرنگ کے سربراہ",
        'es': "Desarrollador Principal y Jefe de Ingeniería de Software",
        'zh': "首席开发工程师兼软件工程负责人",
        'hi': "लीड डेवलपर और सॉफ्टवेयर इंजीनियरिंग प्रमुख",
        'it': "Sviluppatore Principale e Responsabile Ingegneria del Software",
        'pt': "Desenvolvedor Líder e Chefe de Engenharia de Software",
        'ja': "リード開発者兼ソフトウェアエンジニアリング責任者",
        'ko': "수석 개발자 및 소프트웨어 엔지니어링 총괄",
        'nl': "Hoofdontwikkelaar & Hoofd Software Engineering",
        'uz': "Yetakchi dasturchi va Dasturiy ta'minot muhandisligi bo'limi boshlig'i",
        'id': "Pengembang Utama & Kepala Rekayasa Perangkat Lunak"
    }

    bios = {
        'en': "Lead Software Engineer, Cloud Systems Architect & Head of the Developer Division across the Safi Ecosystem.",
        'fa': "لیدر بخش توسعه‌دهندگان و مهندسی نرم‌افزار، معمار سیستم‌های ابری و سرپرست تیم دولوپرهای اکوسیستم صافی.",
        'ps': "د سافټ ویر مخکښ انجینر، د کلاوډ سیسټمونو معمار او د صافي ایکوسیستم د پراختیا کونکو د برخې مشر.",
        'ru': "Ведущий инженер-программист, архитектор облачных систем и руководитель отдела разработки экосистемы Safi.",
        'tr': "Kıdemli Yazılım Mühendisi, Bulut Sistemleri Mimarı ve Safi Ekosistemi Geliştirici Bölümü Başkanı.",
        'de': "Leitender Software-Ingenieur, Cloud-Systemarchitekt und Leiter der Entwicklungsabteilung im Safi-Ökosystem.",
        'fr': "Ingénieur Logiciel Principal, Architecte Systèmes Cloud et Chef de la Division Développement de Safi.",
        'ar': "مهندس برمجيات رئيسي، مهندس نظم سحابية ورئيس قسم المطورين في منظومة صافي.",
        'ur': "لیڈ سافٹ ویئر انجینئر، کلاؤڈ سسٹمز آرکیٹیکٹ اور صافی ایکو سسٹم ڈویلپر ڈویژن کے سربراہ۔",
        'es': "Ingeniero Principal de Software, Arquitecto de Sistemas Cloud y Jefe de la División de Desarrollo de Safi.",
        'zh': "萨菲生态系统首席软件工程师、云系统架构师兼开发者部门负责人。",
        'hi': "सफी इकोसिस्टम में प्रमुख सॉफ्टवेयर इंजीनियर, क्लाउड सिस्टम आर्किटेक्ट और डेवलपर डिवीजन के प्रमुख।",
        'it': "Ingegnere del Software Principale, Architetto di Sistemi Cloud e Capo della Divisione Sviluppatori di Safi.",
        'pt': "Engenheiro de Software Principal, Arquiteto de Sistemas Cloud e Chefe da Divisão de Desenvolvedores do Safi.",
        'ja': "リードソフトウェアエンジニア、クラウドシステムアーキテクト兼サフィ・開発部門責任者。",
        'ko': "사피 에코시스템의 수석 소프트웨어 엔지니어, 클라우드 시스템 아키텍트 및 개발 총괄.",
        'nl': "Lead Software Engineer, Cloud Systeemarchitect & Hoofd van de Ontwikkelaarsdivisie binnen het Safi Ecosysteem.",
        'uz': "Yetakchi dasturiy ta'minot muhandisi, Bulut tizimlari arxitektori va Safiy ekotizimi dasturchilar bo'limi rahbari.",
        'id': "Insinyur Perangkat Lunak Utama, Arsitek Sistem Cloud & Kepala Divisi Pengembang di Seluruh Ekosistem Safi."
    }

    offices = {
        'en': "Technical Executive • Safi Global Ecosystem",
        'fa': "تیم رهبری فنی • اکوسیستم نرم‌افزاری صافی",
        'ps': "تخنیکي رهبري ډله • د صافي سافټ ویر ایکوسیستم",
        'ru': "Техническое руководство • Глобальная экосистема Safi",
        'tr': "Teknik Yönetim • Safi Küresel Ekosistemi",
        'de': "Technische Leitung • Globales Safi-Ökosystem",
        'fr': "Direction Technique • Écosystème Mondial Safi",
        'ar': "القيادة التقنية • منظومة صافي العالمية",
        'ur': "ٹیکنیکل ایگزیکٹو • صافی گلوبل ایکو سسٹم",
        'es': "Ejecutivo Técnico • Ecosistema Global Safi",
        'zh': "技术高管 • 萨菲全球生态系统",
        'hi': "तकनीकी कार्यकारी • सफी ग्लोबल इकोसिस्टम",
        'it': "Direzione Tecnica • Ecosistema Globale Safi",
        'pt': "Executivo Técnico • Ecossistema Global Safi",
        'ja': "技術エグゼクティブ • サフィ・グローバル・エコシステム",
        'ko': "기술 총괄 • 사피 글로벌 에코시스템",
        'nl': "Technisch Bestuur • Wereldwijd Safi Ecosysteem",
        'uz': "Texnik rahbariyat • Safiy global ekotizimi",
        'id': "Eksekutif Teknis • Ekosistem Global Safi"
    }

    coordinates = {
        'en': "International Remote & Tech Core", 'fa': "هسته ریموت بین‌المللی و مراکز فنی", 'ps': "نړیوال ریموټ مرکز او تخنیکي هسته",
        'ru': "Международный удаленный и тех-центр", 'tr': "Uluslararası Uzaktan ve Teknik Merkez", 'de': "International Remote & Tech Core",
        'fr': "Centre Technique & Télétravail International", 'ar': "المركز التقني والعمل الدولي عن بعد", 'ur': "انٹرنیشنل ریموٹ اور ٹیک کور",
        'es': "Núcleo Técnico y Remoto Internacional", 'zh': "国际远程与核心技术中心", 'hi': "अंतर्राष्ट्रीय रिमोट और तकनीकी केंद्र",
        'it': "Polo Tecnico & Lavoro Remoto Internazionale", 'pt': "Núcleo Técnico & Trabalho Remoto Internacional", 'ja': "国際リモート＆テックコア",
        'ko': "글로벌 원격 및 기술 핵심 센터", 'nl': "Internationaal Remote & Tech Core", 'uz': "Xalqaro masofaviy va texnik markaz",
        'id': "Remote Internasional & Inti Teknis"
    }

    badgeCores = {
        'en': "Core Engineering", 'fa': "مهندسی هسته نرم‌افزار", 'ps': "د ساوت ویر اصلي انجنیري",
        'ru': "Базовая инженерия", 'tr': "Çekirdek Mühendislik", 'de': "Kern-Engineering",
        'fr': "Ingénierie Centrale", 'ar': "الهندسة الأساسية", 'ur': "بنیادی انجینئرنگ",
        'es': "Ingeniería Central", 'zh': "核心工程", 'hi': "कोर इंजीनियरिंग",
        'it': "Ingegneria di Base", 'pt': "Engenharia Central", 'ja': "コアエンジニアリング",
        'ko': "코어 엔지니어링", 'nl': "Kern Engineering", 'uz': "Asosiy muhandislik", 'id': "Rekayasa Inti"
    }

    badgeClouds = {
        'en': "Full-Stack Cloud Systems", 'fa': "سیستم‌های ابری فول‌استک", 'ps': "فول سټیک کلاوډ سیسټمونه",
        'ru': "Full-Stack Cloud Systems", 'tr': "Full-Stack Bulut Sistemleri", 'de': "Full-Stack-Cloud-Systeme",
        'fr': "Systèmes Cloud Full-Stack", 'ar': "أنظمة سحابية متكاملة", 'ur': "فل اسٹیک کلاؤڈ سسٹمز",
        'es': "Sistemas Cloud Full-Stack", 'zh': "全栈云系统", 'hi': "फुल-स्टैक क्लाउड सिस्टम",
        'it': "Sistemi Cloud Full-Stack", 'pt': "Sistemas Cloud Full-Stack", 'ja': "フルスタッククラウドシステム",
        'ko': "풀스택 클라우드 시스템", 'nl': "Full-Stack Cloud Systemen", 'uz': "Full-Stack bulut tizimlari", 'id': "Sistem Cloud Full-Stack"
    }

    badgeLeads = {
        'en': "Lead Developer", 'fa': "لیدر بخش توسعه‌دهندگان", 'ps': "د پراختیا کونکو لیدر",
        'ru': "Ведущий разработчик", 'tr': "Baş Geliştirici", 'de': "Leitender Entwickler",
        'fr': "Développeur Principal", 'ar': "كبير المطورين", 'ur': "لیڈ ڈویلپر",
        'es': "Desarrollador Principal", 'zh': "首席开发工程师", 'hi': "लीड डेवलपर",
        'it': "Sviluppatore Principale", 'pt': "Desenvolvedor Líder", 'ja': "リード開発者",
        'ko': "수석 개발자", 'nl': "Hoofdontwikkelaar", 'uz': "Yetakchi dasturchi", 'id': "Pengembang Utama"
    }

    manifestoTitles = {
        'en': "Lead Developer Manifesto & Architecture",
        'fa': "بیانیه و چشم‌انداز لیدر تیم فنی",
        'ps': "د تخنیکي مشر اعلامیه او معماري لید",
        'ru': "Манифест ведущего разработчика и архитектура",
        'tr': "Baş Geliştirici Manifestosu ve Mimarisi",
        'de': "Lead Developer Manifest & Architektur",
        'fr': "Manifeste du Développeur Principal & Architecture",
        'ar': "بيان كبير المطورين والرؤية المعمارية",
        'ur': "لیڈ ڈویلپر کا منشور اور فن تعمیر",
        'es': "Manifiesto del Desarrollador Principal y Arquitectura",
        'zh': "首席开发工程师宣言与系统架构",
        'hi': "लीड डेवलپر घोषणापत्र और वास्तुकला",
        'it': "Manifesto dello Sviluppatore Principale e Architettura",
        'pt': "Manifesto do Desenvolvedor Líder e Arquitetura",
        'ja': "リード開発者マニフェスト＆システムアーキテクチャ",
        'ko': "수석 개발자 선언문 및 시스템 아키텍처",
        'nl': "Manifest van de Hoofdontwikkelaar & Architectuur",
        'uz': "Yetakchi dasturchi manifesti va arxitekturasi",
        'id': "Manifes & Arsitektur Pengembang Utama"
    }

    quotes = {
        'en': "\"Immaculate software architecture, high-concurrency optimization, and uncompromising security form the core foundation of modern digital trust. We build Safi platforms to perform seamlessly across the globe.\"",
        'fa': "«معماری دقیق نرم‌افزار، کدهای بهینه‌سازی‌شده و امنیت غیرقابل نفوذ، شالوده اصلی اعتماد در فناوری‌های نوین است. ما پلتفرم‌های اکوسیستم صافی را با استانداردهایی مهندسی می‌کنیم که در هر کجای دنیا بدون وقفه و با حداکثر توان کار کند.»",
        'ps': "«د سافټ ویر دقیقه معمارۍ، اصلاح شوي کوډونه او نه نفوذ کیدونکی امنیت د عصري ډیجیټل باور اصلي بنسټ جوړوي. موږ د صافي اکوسیستم پلیټ فارمونه په داسې معیارونو سمبالوو چې د نړۍ په هر ګوټ کې پرته له ځنډه کار وکړي.»",
        'ru': "«Безупречная архитектура ПО, оптимизация высокой нагрузки и бескомпромиссная безопасность — это фундамент современного цифрового доверия. Мы создаем платформы Safi для бесперебойной работы по всему миру.»",
        'tr': "\"Kusursuz yazılım mimarisi, yüksek eşzamanlılık optimizasyonu ve tavizsiz güvenlik, modern dijital güvenin temelini oluşturur. Safi platformlarını tüm dünyada sorunsuz çalışacak şekilde tasarlıyoruz.\"",
        'de': "„Makellose Softwarearchitektur, Hochleistungsoptimierung und kompromisslose Sicherheit bilden das Fundament modernen digitalen Vertrauens. Wir entwickeln Safi-Plattformen für weltweite Spitzenleistung.“",
        'fr': "« Une architecture logicielle impeccable, une optimisation pour la haute concurrence et une sécurité sans compromis forment le fondement de la confiance numérique moderne. »",
        'ar': "«إن بنية البرمجيات المتقنة والتحسين عالي الكفاءة والأمان غير القابل للمساومة هي الأساس الحقيقي للثقة الرقمية الحديثة. نحن نبني منصات صافي لتعمل بأعلى أداء في جميع أنحاء العالم.»",
        'ur': "«بے عیب سافٹ ویئر فن تعمیر، اعلی کارکردگی اور غیر سمجھوتہ سیکیورٹی جدید ڈیجیٹل اعتماد کی بنیاد بناتے ہیں۔ ہم صافی پلیٹ فارمز کو دنیا بھر میں بغیر کسی رکاوٹ کے چلانے کے لیے انجینئر کرتے ہیں۔»",
        'es': "«Una arquitectura de software impecable, optimización de alta concurrencia y seguridad sin concesiones forman la base de la confianza digital moderna. Construimos las plataformas de Safi para un rendimiento global perfecto.»",
        'zh': "“无懈可击的软件架构、高并发性能优化以及坚不可摧的安全性，构成了现代数字信任的基石。我们以严苛的标准构建萨菲平台，确保其在全球范围内稳定高效运行。”",
        'hi': "«त्रुटिहीन सॉफ्टवेयर वास्तुकला, उच्च-समानता अनुकूलन और अडिग सुरक्षा आधुनिक डिजिटल विश्वास का मुख्य आधार हैं। हम सफी प्लेटफॉर्म को दुनिया भर में निर्बाध रूप से प्रदर्शन करने के लिए इंजीनियर करते हैं।»",
        'it': "«Un'architettura software impeccabile, l'ottimizzazione per l'alta concorrenza e una sicurezza senza compromessi costituiscono il fondamento della moderna fiducia digitale.»",
        'pt': "«Uma arquitetura de software impecável, otimização de alta concorrência e segurança inflexível formam a base da confiança digital moderna. Construímos as plataformas do Safi para operarem com perfeição global.»",
        'ja': "「完璧なソフトウェアアーキテクチャ、高並行処理の最適化、妥協のないセキュリティが、現代のデジタル信頼の基盤を形成します。世界中でシームレスに動作するようサフィプラットフォームを設計しています。」",
        'ko': "\"완벽한 소프트웨어 아키텍처, 고동시성 최적화, 타협 없는 보안이 현대 디지털 신뢰의 핵심 기반입니다. 우리는 전 세계 어디서나 원활하게 작동하도록 사피 플랫폼을 엔지니어링합니다.\"",
        'nl': "„Vlekkeloze softwarearchitectuur, hoge concurrency-optimalisatie en compromisloze beveiliging vormen de kern van modern digitaal vertrouwen. We bouwen Safi-platforms voor wereldwijde topprestaties.”",
        'uz': "«Mukammal dasturiy ta'minot arxitekturasi, yuqori yuklamalarga chidamlilik va murosasiz xavfsizlik zamonaviy raqamli ishonchning asosidir. Biz Safiy platformalarini butun dunyo bo'ylab to'xtovsiz ishlashi uchun quramiz.»",
        'id': "«Arsitektur perangkat lunak yang sempurna, pengoptimalan konkurensi tinggi, dan keamanan tanpa kompromi membentuk fondasi utama kepercayaan digital modern. Kami membangun platform Safi untuk berkinerja mulus di seluruh dunia.»"
    }

    quoteLocations = {
        'en': f"— {full} • Lead Developer",
        'fa': f"— {full} • لیدر بخش توسعه‌دهندگان",
        'ps': f"— {full} • د پراختیا کونکو مشر",
        'ru': f"— {full} • Ведущий разработчик",
        'tr': f"— {full} • Baş Geliştirici",
        'de': f"— {full} • Lead Developer",
        'fr': f"— {full} • Développeur Principal",
        'ar': f"— {full} • كبير المطورين",
        'ur': f"— {full} • لیڈ ڈویلپر",
        'es': f"— {full} • Desarrollador Principal",
        'zh': f"— {full} • 首席开发工程师",
        'hi': f"— {full} • लीड डेवलपर",
        'it': f"— {full} • Sviluppatore Principale",
        'pt': f"— {full} • Desenvolvedor Líder",
        'ja': f"— {full} • リード開発者",
        'ko': f"— {full} • 수석 개발자",
        'nl': f"— {full} • Hoofdontwikkelaar",
        'uz': f"— {full} • Yetakchi dasturchi",
        'id': f"— {full} • Pengembang Utama"
    }

    return {
        'name': full,
        'firstName': first,
        'lastName': last,
        'role': roles.get(loc, roles['en']),
        'office': offices.get(loc, offices['en']),
        'coordinates': coordinates.get(loc, coordinates['en']),
        'badgeCore': badgeCores.get(loc, badgeCores['en']),
        'badgeCloud': badgeClouds.get(loc, badgeClouds['en']),
        'badgeLead': badgeLeads.get(loc, badgeLeads['en']),
        'badgeActive': "ACTIVE CORE ARCHITECT",
        'bio': bios.get(loc, bios['en']),
        'manifestoTitle': manifestoTitles.get(loc, manifestoTitles['en']),
        'manifestoQuote': quotes.get(loc, quotes['en']),
        'manifestoAuthor': quoteLocations.get(loc, quoteLocations['en'])
    }
