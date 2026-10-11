# -*- coding: utf-8 -*-

def get_mobin_sections(loc):
    skills_title = {
        'en': "Core Technical Stack & Engineering Capabilities", 'fa': "تخصص‌های کلیدی و پشته فنی مهندسی", 'ps': "کلیدي تخنیکي مهارتونه او انجنیري وړتیاوې",
        'ru': "Ключевой стек технологий и инженерные компетенции", 'tr': "Temel Teknik Yığın ve Mühendislik Yetenekleri", 'de': "Technischer Kern-Stack & Engineering-Fähigkeiten",
        'fr': "Stack technique de base et compétences d'ingénierie", 'ar': "المكدس التقني الأساسي والقدرات الهندسية", 'ur': "بنیادی ٹیکنیکل اسٹیک اور انجینئرنگ کی صلاحیتیں",
        'es': "Stack técnico principal y capacidades de ingeniería", 'zh': "核心全栈技术栈与工程研发能力", 'hi': "कोर तकनीकी स्टैक और इंजीनियरिंग क्षमताएं",
        'it': "Stack tecnico principale e capacità di ingegneria", 'pt': "Stack técnico principal e capacidades de engenharia", 'ja': "中核技術スタック＆エンジニアリング能力",
        'ko': "핵심 기술 스택 및 엔지니어링 역량", 'nl': "Kerntechnologische stack & engineeringcapaciteiten", 'uz': "Asosiy texnik stek va muhandislik qobiliyatlari", 'id': "Stack Teknis Inti & Kemampuan Rekayasa"
    }

    s1_title = {
        'en': "Software Architecture", 'fa': "معماری نرم‌افزار", 'ps': "د سافټویر معمارۍ",
        'ru': "Архитектура ПО", 'tr': "Yazılım Mimarisi", 'de': "Software-Architektur",
        'fr': "Architecture logicielle", 'ar': "معمارية البرمجيات", 'ur': "سافٹ ویئر آرکیٹیکچر",
        'es': "Arquitectura de software", 'zh': "高并发软件架构设计", 'hi': "सॉफ्टवेयर आर्किटेक्चर",
        'it': "Architettura software", 'pt': "Arquitetura de software", 'ja': "ソフトウェアアーキテクチャ",
        'ko': "소프트웨어 아키텍처 설계", 'nl': "Software-architectuur", 'uz': "Dasturiy ta'minot arxitekturasi", 'id': "Arsitektur Perangkat Lunak"
    }
    s1_desc = {
        'en': "Distributed system design, high concurrency, clean architecture patterns, and enterprise performance tuning.",
        'fa': "طراحی سیستم‌های توزیع‌شده، مقیاس‌پذیری و کانکارنسی بالا، الگوهای کلین آرکیتکچر و بهینه‌سازی سازمانی.",
        'ps': "د ویشل شویو سیسټمونو ډیزاین، لوړ چټکتیا، د پاکې معمارۍ نمونې او د اداري فعالیتونو ښه والی.",
        'ru': "Проектирование распределенных систем, высокая нагрузка, чистая архитектура и корпоративная оптимизация.",
        'tr': "Dağıtık sistem tasarımı, yüksek eşzamanlılık, temiz mimari kalıpları ve kurumsal performans ayarlama.",
        'de': "Verteiltes Systemdesign, hohe Parallelität, saubere Architekturmuster und Enterprise-Performance-Tuning.",
        'fr': "Conception de systèmes distribués, haute concurrence, Clean Architecture et optimisation des performances.",
        'ar': "تصميم النظم الموزعة، التزامن العالي، أنماط العمارة النظيفة، وضبط أداء المؤسسات.",
        'ur': "ڈسٹری بیوٹڈ سسٹمز ڈیزائن، ہائی کنکرنسی، کلین آرکیٹیکچر، اور کارکردگی کی بہترین ترتیب۔",
        'es': "Diseño de sistemas distribuidos, alta concurrencia, patrones de arquitectura limpia y optimización empresarial.",
        'zh': "企业级分布式系统设计、高并发吞吐架构、整洁架构设计模式（Clean Architecture）与极致性能调优。",
        'hi': "वितरित प्रणाली डिजाइन, उच्च समवर्तीता, स्वच्छ वास्तुकला पैटर्न, और उद्यम प्रदर्शन ट्यूनिंग।",
        'it': "Progettazione di sistemi distribuiti, elevata concorrenza, Clean Architecture e ottimizzazione enterprise.",
        'pt': "Design de sistemas distribuídos, alta concorrência, padrões de arquitetura limpa e otimização empresarial.",
        'ja': "分散システム設計、高並行処理、クリーンアーキテクチャ、エンタープライズ性能チューニング。",
        'ko': "분산 시스템 설계, 고동시성 처리, 클린 아키텍처 패턴 및 엔터프라이즈 성능 튜닝.",
        'nl': "Gedistribueerd systeemontwerp, hoge gelijktijdigheid, clean architecture-patronen en enterprise-prestatieafstemming.",
        'uz': "Taqsimlangan tizimlar dizayni, yuqori parallelizm, toza arxitektura namunalari va korporativ optimallashtirish.",
        'id': "Desain sistem terdistribusi, konkurensi tinggi, pola arsitektur bersih, dan penyetelan kinerja perusahaan."
    }

    s2_title = {
        'en': "Modern Full-Stack", 'fa': "توسعه فول‌استک مدرن", 'ps': "عصري بشپړ پروګرامینګ",
        'ru': "Современный Full-Stack", 'tr': "Modern Full-Stack", 'de': "Modernes Full-Stack",
        'fr': "Full-Stack Moderne", 'ar': "التطوير الشامل الحديث", 'ur': "ماڈرن فل اسٹیک",
        'es': "Full-Stack Moderno", 'zh': "现代全栈前沿开发", 'hi': "आधुनिक फुल-स्टैक",
        'it': "Full-Stack Moderno", 'pt': "Full-Stack Moderno", 'ja': "モダンフルスタック開発",
        'ko': "모던 풀스택 개발", 'nl': "Moderne Full-Stack", 'uz': "Zamonaviy Full-Stack", 'id': "Full-Stack Modern"
    }

    s3_title = {
        'en': "Cloud & DevOps", 'fa': "زیرساخت ابری و دواپس", 'ps': "کلاوډ او ډیوآپس زیربناوې",
        'ru': "Облако и DevOps", 'tr': "Bulut ve DevOps", 'de': "Cloud & DevOps",
        'fr': "Cloud et DevOps", 'ar': "السحابة وديف أوبس", 'ur': "کلاؤڈ اور ڈیواپس",
        'es': "Nube y DevOps", 'zh': "云原生与DevOps工程化", 'hi': "क्लाउड और डेवऑप्स",
        'it': "Cloud e DevOps", 'pt': "Cloud e DevOps", 'ja': "クラウド＆DevOps",
        'ko': "클라우드 및 DevOps 인프라", 'nl': "Cloud & DevOps", 'uz': "Bulut va DevOps", 'id': "Cloud & DevOps"
    }

    s4_title = {
        'en': "Fintech Security", 'fa': "امنیت فین‌تک و داده‌ها", 'ps': "د فینټیک او ډیټا امنیت",
        'ru': "Финтех-безопасность", 'tr': "FinTek Güvenliği", 'de': "Fintech-Sicherheit",
        'fr': "Sécurité Fintech", 'ar': "أمن التكنولوجيا المالية", 'ur': "فنٹیک سیکیورٹی",
        'es': "Seguridad Fintech", 'zh': "金融科技安全与合规防护", 'hi': "फिनटेक सुरक्षा",
        'it': "Sicurezza Fintech", 'pt': "Segurança Fintech", 'ja': "FinTechセキュリティ",
        'ko': "핀테크 금융 보안 및 데이터 암호화", 'nl': "Fintech-beveiliging", 'uz': "FinTech xavfsizligi", 'id': "Keamanan Fintech"
    }
    s4_desc = {
        'en': "End-to-end data encryption, ISO & PCI compliance, penetration audits, and isolated transactions.",
        'fa': "رمزنگاری سرتاسری داده‌ها، استانداردهای بانکی ISO و PCI، ممیزی‌های امنیتی نفوذ و تراکنش‌های ایزوله.",
        'ps': "د ډیټا بشپړ کوډ کول، د ISO او PCI بانکي معیارونه، د نفوذ امنیتي تفتیش او جلا شوي تادیات.",
        'ru': "Сквозное шифрование данных, стандарты ISO и PCI, аудит на проникновение и изолированные транзакции.",
        'tr': "Uçtan uca veri şifreleme, ISO ve PCI uyumluluğu, sızma denetimleri ve izole işlemler.",
        'de': "Ende-zu-Ende-Datenverschlüsselung, ISO- und PCI-Konformität, Penetrationsaudits und isolierte Transaktionen.",
        'fr': "Chiffrement de bout en bout, conformité ISO et PCI, audits de pénétration et transactions isolées.",
        'ar': "تشفير البيانات من طرف إلى طرف، الامتثال لمعايير ISO و PCI، وتدقيق الاختراق والمعاملات المعزولة.",
        'ur': "مکمل ڈیٹا انکرپشن، ISO اور PCI تعمیل، سیکیورٹی آڈٹ اور محفوظ لین دین۔",
        'es': "Cifrado de datos de extremo a extremo, cumplimiento ISO y PCI, auditorías de penetración y transacciones seguras.",
        'zh': "端到端金融级数据加密、ISO与PCI DSS合规性标准、渗透测试审计与隔离交易引擎。",
        'hi': "एंड-टू-एंड डेटा एन्क्रिप्शन, ISO और PCI अनुपालन, पेनेट्रेशन ऑडिट, और सुरक्षित लेनदेन।",
        'it': "Crittografia dati end-to-end, conformità ISO e PCI, audit di penetrazione e transazioni isolate.",
        'pt': "Encriptação de dados ponta a ponta, conformidade ISO e PCI, auditorias de penetração e transações seguras.",
        'ja': "エンドツーエンド暗号化、ISO＆PCIコンプライアンス、侵入テスト監査、分離型トランザクション。",
        'ko': "종단간 데이터 암호화, ISO 및 PCI 규정 준수, 침투 감사 및 격리된 금융 거래 시스템.",
        'nl': "End-to-end gegevensversleuteling, ISO- en PCI-naleving, penetratie-audits en geïsoleerde transacties.",
        'uz': "To'liq ma'lumotlar shifrlanishi, ISO va PCI standartlariga moslik, xavfsizlik auditi va izolyatsiya qilingan tranzaksiyalar.",
        'id': "Enkripsi data ujung ke ujung, kepatuhan ISO & PCI, audit penetrasi, dan transaksi terisolasi."
    }

    exp_title = {
        'en': "Responsibilities & Experience", 'fa': "مسئولیت‌ها و تجارب حرفه‌ای", 'ps': "مسؤلیتونه او مسلکي تجربې",
        'ru': "Обязанности и опыт", 'tr': "Sorumluluklar ve Deneyim", 'de': "Verantwortlichkeiten & Erfahrung",
        'fr': "Responsabilités et Expérience", 'ar': "المسؤوليات والخبرات المهنية", 'ur': "ذمہ داریاں اور تجربہ",
        'es': "Responsabilidades y Experiencia", 'zh': "核心职责与技术管理履历", 'hi': "जिम्मेदारियां और अनुभव",
        'it': "Responsabilità ed Esperienza", 'pt': "Responsabilidades e Experiência", 'ja': "責任および職務経験",
        'ko': "주요 책무 및 엔지니어링 경력", 'nl': "Verantwoordelijkheden & Ervaring", 'uz': "Mas'uliyatlar va tajriba", 'id': "Tanggung Jawab & Pengalaman"
    }

    vision_title = {
        'en': "Technical Vision for Safi Ecosystem", 'fa': "چشم‌انداز فنی در اکوسیستم صافی", 'ps': "په صافي ایکوسیستم کې تخنیکي لیدلوری",
        'ru': "Техническое видение экосистемы Safi", 'tr': "Safi Ekosistemi Teknik Vizyonu", 'de': "Technische Vision für das Safi-Ökosystem",
        'fr': "Vision technique de l'écosystème Safi", 'ar': "الرؤية التقنية لمنظومة صافي", 'ur': "صافی ایکو سسٹم کے لیے تکنیکی وژن",
        'es': "Visión técnica para el Ecosistema Safi", 'zh': "萨菲全球数字生态系统技术愿景", 'hi': "सफ़ी इकोसिस्टम के लिए तकनीकी दृष्टिकोण",
        'it': "Visione tecnica per l'Ecosistema Safi", 'pt': "Visão técnica para o Ecossistema Safi", 'ja': "Safiエコシステムの技術的ビジョン",
        'ko': "사피 생태계 기술 비전 및 로드맵", 'nl': "Technische visie voor het Safi-ecosysteem", 'uz': "Safi ekotizimi uchun texnik qarash", 'id': "Visi Teknis untuk Ekosistem Safi"
    }

    return {
        'mobinSkillsTitle': skills_title.get(loc, skills_title['en']),
        'mobinS1Title': s1_title.get(loc, s1_title['en']),
        'mobinS1Desc': s1_desc.get(loc, s1_desc['en']),
        'mobinS2Title': s2_title.get(loc, s2_title['en']),
        'mobinS3Title': s3_title.get(loc, s3_title['en']),
        'mobinS4Title': s4_title.get(loc, s4_title['en']),
        'mobinS4Desc': s4_desc.get(loc, s4_desc['en']),
        'mobinExpTitle': exp_title.get(loc, exp_title['en']),
        'mobinVisionTitle': vision_title.get(loc, vision_title['en'])
    }

def get_mujtaba_sections(loc):
    coo_title = {
        'en': "Chief Operating Officer (COO)", 'fa': "مدیر ارشد عملیات (COO)", 'ps': "د عملیاتو عمومي رییس (COO)",
        'ru': "Главный операционный директор (COO)", 'tr': "Operasyon Direktörü (COO)", 'de': "Chief Operating Officer (COO)",
        'fr': "Directeur des Opérations (COO)", 'ar': "المدير التنفيذي للعمليات (COO)", 'ur': "چیف آپریٹنگ آفیسر (COO)",
        'es': "Director de Operaciones (COO)", 'zh': "首席运营官（COO）", 'hi': "मुख्य परिचालन अधिकारी (सीओओ)",
        'it': "Direttore Operativo (COO)", 'pt': "Diretor de Operações (COO)", 'ja': "最高執行責任者（COO）",
        'ko': "최고 운영 책임자 (COO)", 'nl': "Chief Operating Officer (COO)", 'uz': "Bosh operatsion direktor (COO)", 'id': "Chief Operating Officer (COO)"
    }
    ops_subtitle = {
        'en': "Operations & Cyber Governance • Kabul", 'fa': "عملیات اجرایی و حاکمیت سایبری • کابل", 'ps': "اجرایي عملیات او سایبري حاکمیت • کابل",
        'ru': "Операции и киберуправление • Кабул", 'tr': "Operasyonlar ve Siber Yönetişim • Kabil", 'de': "Betrieb & Cyber-Governance • Kabul",
        'fr': "Opérations et Gouvernance Cyber • Kaboul", 'ar': "العمليات والحوكمة السيبرانية • كابول", 'ur': "آپریشنز اور سائبر گورننس • کابل",
        'es': "Operaciones y Gobernanza Cibernética • Kabul", 'zh': "全球运营交付与网络治理中心 • 喀布尔", 'hi': "संचालन और साइबर गवर्नेंस • काबुल",
        'it': "Operazioni e Cyber Governance • Kabul", 'pt': "Operações e Cibergovernança • Cabul", 'ja': "オペレーション＆サイバーガバナンス • カブール",
        'ko': "운영 총괄 및 사이버 거버넌스 • 카불", 'nl': "Operaties & Cyberbeheer • Kabul", 'uz': "Operatsiyalar va kiberboshqaruv • Kobul", 'id': "Operasi & Tata Kelola Siber • Kabul"
    }
    return {
        'mujtabaRoleTitle': coo_title.get(loc, coo_title['en']),
        'mujtabaSubtitle': ops_subtitle.get(loc, ops_subtitle['en'])
    }

def get_sahel_sections(loc):
    ceo_title = {
        'en': "Chief Executive Officer (CEO) & European Relations", 'fa': "مدیرعامل (CEO) و مدیر روابط اروپایی", 'ps': "اجراییه رییس (CEO) او د اروپا اړیکو مشر",
        'ru': "Главный исполнительный директор (CEO) и связи с Европой", 'tr': "İcra Kurulu Başkanı (CEO) ve Avrupa İlişkileri", 'de': "Chief Executive Officer (CEO) & Europa-Beziehungen",
        'fr': "Directeur Général (CEO) et Relations Européennes", 'ar': "الرئيس التنفيذي (CEO) والعلاقات الأوروبية", 'ur': "چیف ایگزیکٹو آفیسر (CEO) اور یورپی تعلقات",
        'es': "Director Ejecutivo (CEO) y Relaciones Europeas", 'zh': "首席执行官（CEO）兼欧洲区事务总裁", 'hi': "मुख्य कार्यकारी अधिकारी (सीईओ) और यूरोपीय संबंध",
        'it': "Amministratore Delegato (CEO) e Relazioni Europee", 'pt': "Diretor Executivo (CEO) e Relações Europeias", 'ja': "最高経営責任者（CEO）兼欧州関係総括",
        'ko': "최고경영자(CEO) 겸 유럽 대외협력 총괄", 'nl': "Chief Executive Officer (CEO) & Europese Relaties", 'uz': "Bosh ijrochi direktor (CEO) va Yevropa aloqalari", 'id': "Chief Executive Officer (CEO) & Hubungan Eropa"
    }
    expansion_subtitle = {
        'en': "European Banking Expansion • Global Lead", 'fa': "توسعه بانکداری اروپایی • راهبر جهانی", 'ps': "د اروپا بانکي پراختیا • نړیوال مشر",
        'ru': "Европейская банковская экспансия • Глобальный лидер", 'tr': "Avrupa Bankacılık Genişlemesi • Küresel Lider", 'de': "Europäische Bankenexpansion • Global Lead",
        'fr': "Expansion bancaire européenne • Responsable mondial", 'ar': "التوسع المصرفي الأوروبي • القائد العالمي", 'ur': "یورپی بینکنگ کی توسیع • گلوبل لیڈ",
        'es': "Expansión bancaria europea • Líder global", 'zh': "欧洲银行清算与泛欧金融拓展 • 全球总裁", 'hi': "यूरोपीय बैंकिंग विस्तार • वैश्विक लीड",
        'it': "Espansione bancaria europea • Responsabile globale", 'pt': "Expansão bancária europeia • Líder global", 'ja': "欧州バンキング展開 • グローバルリード",
        'ko': "유럽 뱅킹 네트워크 확장 • 글로벌 리드", 'nl': "Europese bankuitbreiding • Wereldwijde leider", 'uz': "Yevropa bank kengayishi • Global yetakchi", 'id': "Ekspansi Perbankan Eropa • Pemimpin Global"
    }
    return {
        'sahelRoleTitle': ceo_title.get(loc, ceo_title['en']),
        'sahelSubtitle': expansion_subtitle.get(loc, expansion_subtitle['en'])
    }
