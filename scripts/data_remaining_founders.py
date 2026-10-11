# -*- coding: utf-8 -*-

def get_shirin_sections(loc):
    competencies_badge = {
        'en': "Multidisciplinary Mastery", 'fa': "تسلط چندرشته‌ای", 'ps': "څو اړخیز مهارتونه",
        'ru': "Междисциплинарное мастерство", 'tr': "Disiplinlerarası Uzmanlık", 'de': "Interdisziplinäre Meisterschaft",
        'fr': "Maîtrise multidisciplinaire", 'ar': "التمكن متعدد التخصصات", 'ur': "کثیر الشعبہ مہارت",
        'es': "Dominio multidisciplinario", 'zh': "跨学科前沿专业造诣", 'hi': "बहुविषयक विशेषज्ञता",
        'it': "Maestria multidisciplinare", 'pt': "Domínio multidisciplinar", 'ja': "学際的エキスパート",
        'ko': "다학제적 전문 역량", 'nl': "Multidisciplinair meesterschap", 'uz': "Ko'p tarmoqli mahorat", 'id': "Keahlian Multidisiplin"
    }

    competencies_title = {
        'en': "Executive Competencies", 'fa': "شایستگی‌های کلیدی اجرایی", 'ps': "کلیدي اجرایي وړتیاوې",
        'ru': "Ключевые исполнительные компетенции", 'tr': "Temel Yönetimsel Yetkinlikler", 'de': "Wesentliche Führungskompetenzen",
        'fr': "Compétences de direction clés", 'ar': "الكفاءات التنفيذية الأساسية", 'ur': "کلیدی انتظامی قابلیتیں",
        'es': "Competencias ejecutivas clave", 'zh': "核心高级执行力矩阵", 'hi': "प्रमुख कार्यकारी क्षमताएं",
        'it': "Competenze esecutive chiave", 'pt': "Competências executivas essenciais", 'ja': "主要エグゼクティブ能力",
        'ko': "핵심 경영 실행 역량", 'nl': "Belangrijkste leidinggevende competenties", 'uz': "Asosiy ijroiya malakalari", 'id': "Kompetensi Eksekutif Utama"
    }

    c1_title = {
        'en': "Operations & Strategy", 'fa': "عملیات و استراتژی", 'ps': "عملیات او ستراتیژي",
        'ru': "Операции и стратегия", 'tr': "Operasyon ve Strateji", 'de': "Betrieb & Strategie",
        'fr': "Opérations et Stratégie", 'ar': "العمليات والاستراتيجية", 'ur': "آپریشنز اور حکمت عملی",
        'es': "Operaciones y Estrategia", 'zh': "运营治理与战略统筹", 'hi': "संचालन और रणनीति",
        'it': "Operazioni e Strategia", 'pt': "Operações e Estratégia", 'ja': "オペレーション＆戦略",
        'ko': "운영 및 글로벌 전략", 'nl': "Operaties & Strategie", 'uz': "Operatsiyalar va strategiya", 'id': "Operasi & Strategi"
    }
    c1_desc = {
        'en': "Organizational leadership, Agile workflow coordination, cross-departmental operations, resource allocation.",
        'fa': "رهبری سازمانی، هماهنگی جریان‌های کاری اجایل، عملیات بین‌بخشی و تخصیص بهینه منابع.",
        'ps': "سازماني رهبري، د کاري جریان همغږي، د څانګو ترمنځ عملیات او د سرچینو تخصیص.",
        'ru': "Организационное лидерство, координация рабочих процессов Agile, межотраслевые операции, распределение ресурсов.",
        'tr': "Kurumsal liderlik, Çevik iş akışı koordinasyonu, departmanlar arası operasyonlar, kaynak tahsisi.",
        'de': "Organisatorische Führung, Agile Workflow-Koordination, abteilungsübergreifende Prozesse, Ressourcenallokation.",
        'fr': "Leadership organisationnel, coordination Agile, opérations interdépartementales et allocation des ressources.",
        'ar': "القيادة التنظيمية، تنسيق سير العمل المرن، العمليات بين الأقسام، وتوزيع الموارد.",
        'ur': "تنظیمی قیادت، ایجائل ورک فلو ہم آہنگی، بین الشعبہ جاتی آپریشنز، اور وسائل کی تقسیم۔",
        'es': "Liderazgo organizacional, coordinación de flujos Agile, operaciones interdepartamentales y asignación de recursos.",
        'zh': "组织治理架构、敏捷工作流协同、跨部门业务运营闭环与企业级战略资源精准配置。",
        'hi': "संगठनात्मक नेतृत्व, एजाइल वर्कफ़्लो समन्वय, क्रॉस-विभागीय संचालन, संसाधन आवंटन।",
        'it': "Leadership organizzativa, coordinamento dei flussi di lavoro Agile, operazioni interdipartimentali.",
        'pt': "Liderança organizacional, coordenação de fluxos Agile, operações interdepartamentais e alocação de recursos.",
        'ja': "組織リーダーシップ、アジャイル業務調整、部門横断オペレーション、戦略的リソース配分。",
        'ko': "조직 리더십, 애자일 워크플로우 조율, 부서 간 통합 운영 및 자원 배분 최적화.",
        'nl': "Organisatorisch leiderschap, Agile workflowcoördinatie, afdelingsoverschrijdende operaties en toewijzing van middelen.",
        'uz': "Tashkiliy yetakchilik, Agile ish jarayonlarini muvofiqlashtirish, bo'limlararo operatsiyalar va resurslarni taqsimlash.",
        'id': "Kepemimpinan organisasi, koordinasi alur kerja Agile, operasi lintas departemen, dan alokasi sumber daya."
    }

    c2_title = {
        'en': "Full-Stack Dev", 'fa': "توسعه فول‌استک", 'ps': "بشپړ پروګرامینګ",
        'ru': "Full-Stack разработка", 'tr': "Full-Stack Geliştirme", 'de': "Full-Stack-Entwicklung",
        'fr': "Développement Full-Stack", 'ar': "تطوير البرمجيات الشامل", 'ur': "فل اسٹیک ڈویلپمنٹ",
        'es': "Desarrollo Full-Stack", 'zh': "全栈工程架构研发", 'hi': "फुल-स्टैक विकास",
        'it': "Sviluppo Full-Stack", 'pt': "Desenvolvimento Full-Stack", 'ja': "フルスタック開発",
        'ko': "풀스택 소프트웨어 개발", 'nl': "Full-Stack Ontwikkeling", 'uz': "Full-Stack dasturlash", 'id': "Pengembangan Full-Stack"
    }
    c2_desc = {
        'en': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST APIs, Microservices.",
        'fa': "توسعه وب مدرن با Next.js، تایپ‌اسکریپت، پایتون، پستگرس‌کیوال، ای‌پی‌آی‌های رست و میکروسرویس‌ها.",
        'ps': "د Next.js، TypeScript، Python، PostgreSQL، او مایکروسروسیسونو پر بنسټ عصري ویب پراختیا.",
        'ru': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API, микросервисы.",
        'tr': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API'ler, Mikro Hizmetler.",
        'de': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST-APIs, Microservices.",
        'fr': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, API REST, Microservices.",
        'ar': "تطوير المنصات بواسطة React.js و Next.js و TypeScript و Python و PostgreSQL و Microservices.",
        'ur': "جدید ویب ڈیولپمنٹ بذریعہ Next.js، TypeScript، Python، PostgreSQL اور مائیکرو سروسز۔",
        'es': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, API REST, microservicios.",
        'zh': "React.js、Next.js、Node.js、TypeScript、Python、Tailwind CSS、PostgreSQL及微服务架构。",
        'hi': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST APIs, माइक्रोसर्विसेज।",
        'it': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, API REST, Microservizi.",
        'pt': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, APIs REST, Microsserviços.",
        'ja': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API, マイクロサービス。",
        'ko': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API, 마이크로서비스.",
        'nl': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API's, Microservices.",
        'uz': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API va mikroservislar.",
        'id': "React.js, Next.js, Node.js, TypeScript, Python, Tailwind CSS, PostgreSQL, REST API, Layanan Mikro."
    }

    c3_title = {
        'en': "Applied AI Systems", 'fa': "سیستم‌های کاربردی هوش مصنوعی", 'ps': "د پلي شوي AI سیسټمونه",
        'ru': "Прикладные системы ИИ", 'tr': "Uygulamalı Yapay Zeka Sistemleri", 'de': "Angewandte KI-Systeme",
        'fr': "Systèmes d'IA appliquée", 'ar': "أنظمة الذكاء الاصطناعي التطبيقي", 'ur': "اپلائیڈ اے آئی سسٹمز",
        'es': "Sistemas de IA aplicada", 'zh': "应用人工智能与智能体系统", 'hi': "अनुप्रयुक्त एआई सिस्टम",
        'it': "Sistemi di IA Applicata", 'pt': "Sistemas de IA Aplicada", 'ja': "応用AIシステム",
        'ko': "응용 AI 시스템 및 에이전트", 'nl': "Toegepaste AI-systemen", 'uz': "Amaliy sun'iy intellekt tizimlari", 'id': "Sistem AI Terapan"
    }
    c3_desc = {
        'en': "Advanced Prompt Engineering, LLM Integration, Autonomous AI Tutoring (Safi AI), Workflow Orchestration.",
        'fa': "مهندسی پرامپت پیشرفته، ادغام مدل‌های زبانی بزرگ، سامانه هوشمند منتور صافی و ارکستراسیون اتوماسیون.",
        'ps': "پرمختللي پرامپټ انجینري، د لویو ژبنیو ماډلونو ادغام، د صافي سمارټ تدریسي سیسټم او اتومات کارونه.",
        'ru': "Продвинутый промпт-инжиниринг, интеграция LLM, автономное обучение с Safi AI, оркестрация рабочих процессов.",
        'tr': "Gelişmiş Prompt Mühendisliği, LLM Entegrasyonu, Otonom Yapay Zeka Eğitimi (Safi AI), İş Akışı Orkestrasyonu.",
        'de': "Advanced Prompt Engineering, LLM-Integration, autonomes Mentoring (Safi AI), Workflow-Orchestrierung.",
        'fr': "Ingénierie avancée de prompts, intégration de LLM, tutorat autonome Safi AI, orchestration de flux de travail.",
        'ar': "هندسة الأوامر المتقدمة، دمج نماذج اللغات الكبيرة، المعلم الذكي المستقل (Safi AI)، وتنظيم سير العمل.",
        'ur': "ایڈوانس پرامپٹ انجینئرنگ، ایل ایل ایم انضمام، خودکار اے آئی ٹیوٹر (صافی اے آئی) اور ورک فلو آرکیسٹریشن۔",
        'es': "Ingeniería avanzada de prompts, integración de LLM, tutoría autónoma con Safi AI y orquestación de flujos.",
        'zh': "前沿提示工程、大语言模型（LLM）工业化集成、萨菲AI自适应助教及自主业务流程编排。",
        'hi': "उन्नत प्रॉम्प्ट इंजीनियरिंग, एलएलएम एकीकरण, स्वायत्त एआई ट्यूटरिंग (Safi AI), वर्कफ़्लो ऑर्केस्ट्रेशन।",
        'it': "Prompt Engineering avanzato, integrazione LLM, tutoraggio autonomo Safi AI, orchestrazione dei flussi.",
        'pt': "Engenharia avançada de prompts, integração de LLMs, tutoria autónoma Safi AI e orquestração de fluxos.",
        'ja': "高度プロンプト工学、LLM統合、Safi AI自律チューター、ワークフロー・オーケストレーション。",
        'ko': "고급 프롬프트 엔지니어링, LLM 통합, 자율형 교육 AI(Safi AI) 및 워크플로우 자동화 조율.",
        'nl': "Geavanceerde prompt-engineering, LLM-integratie, autonome AI-begeleiding (Safi AI), workfloworkestratie.",
        'uz': "Ilg'or prompt muhandisligi, LLM integratsiyasi, Safi AI avtonom ta'lim tizimi va ish jarayonlarini boshqarish.",
        'id': "Rekayasa Prompt Tingkat Lanjut, Integrasi LLM, Bimbingan AI Otonom (Safi AI), Orkestrasi Alur Kerja."
    }

    c4_title = {
        'en': "Design & Brand", 'fa': "طراحی و هویت برند", 'ps': "ډیزاین او د برانډ پېژندنه",
        'ru': "Дизайн и бренд", 'tr': "Tasarım ve Marka", 'de': "Design & Marke",
        'fr': "Design et Marque", 'ar': "التصميم وهوية العلامة التجارية", 'ur': "ڈیزائن اور برانڈ",
        'es': "Diseño y Marca", 'zh': "品牌视觉与人机交互设计", 'hi': "डिजाइन और ब्रांड",
        'it': "Design e Brand", 'pt': "Design e Marca", 'ja': "デザイン＆ブランド",
        'ko': "UI/UX 디자인 및 브랜드 아이덴티티", 'nl': "Design & Merk", 'uz': "Dizayn va brend", 'id': "Desain & Merek"
    }
    c4_desc = {
        'en': "Figma UI/UX, Design Systems, Adobe Photoshop & Illustrator, Visual Identity Architecture, Responsive Layouts.",
        'fa': "طراحی رابط کاربری فیگما، سیستم‌های طراحی جامع، ادوبی فوتوشاپ و ایلاستریتور، معماری هویت بصری.",
        'ps': "د فیګما UI/UX ډیزاین، جامع ډیزاین سیسټمونه، بصري هویت او ځواب ویونکي ډیجیټل جوړښتونه.",
        'ru': "Figma UI/UX, дизайн-системы, Adobe Photoshop и Illustrator, визуальная идентичность, адаптивные макеты.",
        'tr': "Figma UI/UX, Tasarım Sistemleri, Adobe Photoshop ve Illustrator, Görsel Kimlik Mimarisi, Duyarlı Düzenler.",
        'de': "Figma UI/UX, Designsysteme, Adobe Photoshop & Illustrator, visuelle Identität, responsive Layouts.",
        'fr': "Figma UI/UX, systèmes de design, Adobe Photoshop & Illustrator, identité visuelle, interfaces réactives.",
        'ar': "تصميم واجهات المستخدم Figma، نظم التصميم، Adobe Photoshop، معمارية الهوية البصرية، وتخطيطات متجاوبة.",
        'ur': "فگما UI/UX، ڈیزائن سسٹمز، ایڈوبی فوٹوشاپ اور السٹریٹر، بصری شناخت کی تعمیر، اور ریسپانسیو لے آؤٹس۔",
        'es': "Figma UI/UX, sistemas de diseño, Adobe Photoshop e Illustrator, identidad visual y diseño responsivo.",
        'zh': "Figma专业级UI/UX交互规范、企业级设计系统（Design System）、品牌视觉识别与全端自适应布局。",
        'hi': "Figma UI/UX, डिज़ाइन सिस्टम, Adobe Photoshop & Illustrator, विज़ुअल पहचान, रिस्पॉन्सिव लेआउट।",
        'it': "Figma UI/UX, Design Systems, Adobe Photoshop e Illustrator, architettura dell'identità visiva.",
        'pt': "Figma UI/UX, Sistemas de Design, Adobe Photoshop e Illustrator, Identidade Visual e Layouts Responsivos.",
        'ja': "Figma UI/UX、デザインシステム、Adobe Photoshop & Illustrator、ビジュアルアイデンティティ設計。",
        'ko': "Figma UI/UX, 디자인 시스템, Adobe Photoshop & Illustrator, 시각적 브랜드 정체성 및 반응형 레이아웃.",
        'nl': "Figma UI/UX, ontwerpsystemen, Adobe Photoshop & Illustrator, visuele identiteit, responsieve lay-outs.",
        'uz': "Figma UI/UX, dizayn tizimlari, Adobe Photoshop va Illustrator, vizual identifikatsiya arxitekturasi.",
        'id': "Figma UI/UX, Sistem Desain, Adobe Photoshop & Illustrator, Arsitektur Identitas Visual, Tata Letak Responsif."
    }

    history_title = {
        'en': "Executive History", 'fa': "سوابق اجرایی و مدیریتی", 'ps': "اجرایي او اداري سوابق",
        'ru': "Исполнительная история", 'tr': "Yönetici Geçmişi", 'de': "Führungshistorie",
        'fr': "Parcours exécutif", 'ar': "السجل التنفيذي والمهني", 'ur': "انتظامی تاریخ",
        'es': "Historial ejecutivo", 'zh': "高级管理履历与里程碑", 'hi': "कार्यकारी इतिहास",
        'it': "Storia esecutiva", 'pt': "Histórico executivo", 'ja': "エグゼクティブ経歴",
        'ko': "주요 경영 및 실무 경력", 'nl': "Leidinggevende geschiedenis", 'uz': "Boshqaruv tarixi", 'id': "Riwayat Eksekutif"
    }

    pedigree_title = {
        'en': "Academic Pedigree", 'fa': "سوابق علمی و دانشگاهی", 'ps': "علمي او تحصیلي شالید",
        'ru': "Академическая биография", 'tr': "Akademik Geçmiş", 'de': "Akademischer Werdegang",
        'fr': "Formation académique", 'ar': "المؤهلات الأكاديمية", 'ur': "تعلیمی پس منظر",
        'es': "Trayectoria académica", 'zh': "学术教育背景与国际认证", 'hi': "अकादमिक पृष्ठभूमि",
        'it': "Percorso accademico", 'pt': "Formação académica", 'ja': "学歴・アカデミック背景",
        'ko': "학력 및 학술 전문 인증", 'nl': "Academische achtergrond", 'uz': "Akademik malaka", 'id': "Latar Belakang Akademis"
    }

    multilingual_title = {
        'en': "Multilingual Proficiency", 'fa': "تسلط بر زبان‌های بین‌المللی", 'ps': "په نړیوالو ژبو تسلط",
        'ru': "Владение иностранными языками", 'tr': "Çok Dilli Yetkinlik", 'de': "Mehrsprachige Kompetenz",
        'fr': "Compétences linguistiques", 'ar': "الكفاءة اللغوية المتعددة", 'ur': "کثیر لسانی مہارت",
        'es': "Competencia multilingüe", 'zh': "全球国际多语种精通能力", 'hi': "बहुभाषी दक्षता",
        'it': "Competenza multilingue", 'pt': "Proficiência multilingue", 'ja': "多言語コミュニケーション能力",
        'ko': "다국어 구사 역량", 'nl': "Meertalige vaardigheid", 'uz': "Ko'p tilli mahorat", 'id': "Kemahiran Multibahasa"
    }

    distinctions_title = {
        'en': "Executive Distinctions", 'fa': "افتخارات و تمایزات اجرایی", 'ps': "اجرایي ویاړونه او لاسته راوړنې",
        'ru': "Исполнительные отличия", 'tr': "Yönetici Başarıları", 'de': "Besondere Führungsleistungen",
        'fr': "Distinctions de direction", 'ar': "التميز المؤسسي والإنجازات", 'ur': "انتظامی اعزازات",
        'es': "Distinciones ejecutivas", 'zh': "卓越管理成就与殊荣", 'hi': "कार्यकारी विशिष्टताएं",
        'it': "Distinzioni esecutive", 'pt': "Distinções executivas", 'ja': "エグゼクティブ表彰・実績",
        'ko': "주요 경영 성과 및 공적", 'nl': "Leidinggevende onderscheidingen", 'uz': "Ijroiya yutuqlari", 'id': "Penghargaan Eksekutif"
    }

    return {
        'shirinCompetenciesBadge': competencies_badge.get(loc, competencies_badge['en']),
        'shirinCompetenciesTitle': competencies_title.get(loc, competencies_title['en']),
        'shirinC1Title': c1_title.get(loc, c1_title['en']),
        'shirinC1Desc': c1_desc.get(loc, c1_desc['en']),
        'shirinC2Title': c2_title.get(loc, c2_title['en']),
        'shirinC2Desc': c2_desc.get(loc, c2_desc['en']),
        'shirinC3Title': c3_title.get(loc, c3_title['en']),
        'shirinC3Desc': c3_desc.get(loc, c3_desc['en']),
        'shirinC4Title': c4_title.get(loc, c4_title['en']),
        'shirinC4Desc': c4_desc.get(loc, c4_desc['en']),
        'shirinHistoryTitle': history_title.get(loc, history_title['en']),
        'shirinPedigreeTitle': pedigree_title.get(loc, pedigree_title['en']),
        'shirinMultilingualTitle': multilingual_title.get(loc, multilingual_title['en']),
        'shirinDistinctionsTitle': distinctions_title.get(loc, distinctions_title['en'])
    }
