# -*- coding: utf-8 -*-

def get_shaheen_milestones_and_credentials(loc):
    milestone_titles = {
        'm1': {
            'en': "Founder & Group CEO", 'fa': "بنیان‌گذار و مدیرعامل هلدینگ", 'ps': "بنسټ ایښودونکی او عمومي مشر",
            'ru': "Основатель и генеральный директор группы", 'tr': "Kurucu ve Grup CEO'su", 'de': "Gründer und Group CEO",
            'fr': "Fondateur et PDG du Groupe", 'ar': "المؤسس والرئيس التنفيذي للمجموعة", 'ur': "بانی اور گروپ سی ای او",
            'es': "Fundador y CEO del Grupo", 'zh': "创始人兼集团首席执行官", 'hi': "संस्थापक और ग्रुप सीईओ",
            'it': "Fondatore e CEO del Gruppo", 'pt': "Fundador e CEO do Grupo", 'ja': "創業者兼グループCEO",
            'ko': "창립자 및 그룹 CEO", 'nl': "Oprichter & Groeps-CEO", 'uz': "Asoschi va guruh bosh direktori", 'id': "Pendiri & CEO Grup"
        },
        'm2': {
            'en': "Full-Time Institutional Forex Trader", 'fa': "معامله‌گر نهادی تمام‌وقت بازارهای مالی", 'ps': "د مالي بازارونو بشپړ وخت معامله کوونکی",
            'ru': "Штатный институциональный трейдер Forex", 'tr': "Tam Zamanlı Kurumsal Forex Yatırımcısı", 'de': "Vollzeit-Forex-Händler für Institutionen",
            'fr': "Trader Forex Institutionnel à Plein Temps", 'ar': "متداول فوركس مؤسسي بدوام كامل", 'ur': "فل ٹائم ادارہ جاتی فاریکس ٹریڈر",
            'es': "Operador Institucional de Forex a Tiempo Completo", 'zh': "全职机构级外汇交易专家", 'hi': "पूर्णकालिक संस्थागत फॉरेक्स ट्रेडर",
            'it': "Trader Forex Istituzionale a Tempo Pieno", 'pt': "Trader Forex Institucional a Tempo Inteiro", 'ja': "専業・機関為替トレーダー",
            'ko': "기관 외환(Forex) 전업 트레이더", 'nl': "Voltijds Institutioneel Forex-handelaar", 'uz': "To'liq vaqtli institutsional Forex treyderi", 'id': "Trader Forex Institusional Penuh Waktu"
        },
        'm3': {
            'en': "Lead IT & Systems Specialist", 'fa': "متخصص ارشد فناوری اطلاعات و سیستم‌ها", 'ps': "د معلوماتي ټکنالوجۍ او سیسټمونو مخکښ متخصص",
            'ru': "Ведущий специалист по IT и системам", 'tr': "Kıdemli BT ve Sistem Uzmanı", 'de': "Leitender IT- und Systemspezialist",
            'fr': "Spécialiste Principal IT et Systèmes", 'ar': "كبير أخصائيي تكنولوجيا المعلومات والنظم", 'ur': "لیڈ آئی ٹی اور سسٹمز اسپیشلسٹ",
            'es': "Especialista Principal de TI y Sistemas", 'zh': "首席IT与企业级系统架构专家", 'hi': "प्रमुख आईटी और सिस्टम विशेषज्ञ",
            'it': "Specialista Principale IT e Sistemi", 'pt': "Especialista Líder em TI e Sistemas", 'ja': "リードIT＆システムスペシャリスト",
            'ko': "수석 IT 및 시스템 인프라 전문가", 'nl': "Hoofd IT- & Systeemspecialist", 'uz': "Yetakchi IT va tizimlar mutaxassisi", 'id': "Spesialis Utama TI & Sistem"
        }
    }

    milestone_orgs = {
        'm1': "Safi International Capital LTD (2025 - Present)",
        'm2': "Global Currency Markets (2016 - 2024)",
        'm3': "Afghanistan Football Federation (2019 - 2024)"
    }

    milestone_descs = {
        'm1': {
            'en': "Registered in England and Wales under Company No. 17063286. Leading corporate holding governance, sovereign compliance, and multi-platform fintech deployments worldwide.",
            'fa': "ثبت رسمی در انگلستان و ولز با شماره ۱۷۰۶۳۲۸۶. مدیریت حاکمیت هلدینگ شرکتی، انطباق با قوانین بین‌المللی و راه‌اندازی پلتفرم‌های فین‌تک در سراسر جهان.",
            'ps': "په انګلستان او ویلز کې د ۱۷۰۶۳۲۸۶ شمیرې لاندې ثبت شوی. د کارپوریټ هولډینګ رهبري، مالي اطاعت او په ټوله نړۍ کې د فینټیک پلتفارمونو پراختیا.",
            'ru': "Зарегистрировано в Англии и Уэльсе (№ 17063286). Руководство холдингом, соответствие международным стандартам и развертывание финтех-платформ по всему миру.",
            'tr': "İngiltere ve Galler'de 17063286 Şirket Numarası ile tescilli. Kurumsal holding yönetişimi, uluslararası uyumluluk ve küresel FinTech platformlarının dağıtımı.",
            'de': "Eingetragen in England und Wales unter der Firmennummer 17063286. Leitung der Holding-Governance und weltweite Einführung von Fintech-Plattformen.",
            'fr': "Enregistré en Angleterre et au Pays de Galles sous le n° 17063286. Direction de la gouvernance et déploiements fintech dans le monde entier.",
            'ar': "مسجلة في إنجلترا وويلز برقم الشركة 17063286. قيادة حوكمة المجموعة القابضة والامتثال للأنظمة ونشر منصات التكنولوجيا المالية عالمياً.",
            'ur': "انگلینڈ اور ویلز میں کمپنی نمبر 17063286 کے تحت رجسٹرڈ۔ کارپوریٹ ہولڈنگ گورننس اور دنیا بھر میں فین ٹیک پلیٹ فارمز کی قیادت۔",
            'es': "Registrada en Inglaterra y Gales con el n.° 17063286. Liderazgo del holding corporativo y despliegue de plataformas fintech a nivel mundial.",
            'zh': "在英格兰和威尔士合法注册（公司注册编号：17063286）。负责控股集团顶层治理、主权合规及全球多端金融科技产品的研发与部署。",
            'hi': "कंपनी नंबर 17063286 के तहत इंग्लैंड और वेल्स में पंजीकृत। कॉर्पोरेट होल्डिंग प्रशासन और दुनिया भर में फिनटेक परिनियोजन का नेतृत्व।",
            'it': "Registrata in Inghilterra e Galles con il n. 17063286. Guida della governance aziendale e implementazione di piattaforme fintech a livello globale.",
            'pt': "Registada em Inglaterra e no País de Gales sob o n.º 17063286. Liderança da governança e implementações de plataformas fintech a nível mundial.",
            'ja': "イングランドおよびウェールズで法人登記（番号17063286）。持ち株会社の統治、国際コンプライアンス、世界的なFinTech展開を指揮。",
            'ko': "잉글랜드 및 웨일스 등록(회사 번호 17063286). 지주회사 거버넌스, 국제 금융 규제 준수 및 글로벌 핀테크 플랫폼 배포 총괄.",
            'nl': "Geregistreerd in Engeland en Wales onder bedrijfsnummer 17063286. Leiding over de holding en wereldwijde fintech-implementaties.",
            'uz': "Angliya va Uelsda 17063286 kompaniya raqami bilan ro'yxatdan o'tgan. Xolding boshqaruvi va global FinTech platformalarini joriy etish rahbari.",
            'id': "Terdaftar di Inggris dan Wales dengan No. Perusahaan 17063286. Memimpin tata kelola holding dan penerapan platform fintech di seluruh dunia."
        },
        'm2': {
            'en': "Over 8 years managing high-frequency liquidity, order books, and cross-currency execution. Transitioned focus into building automated fintech infrastructure in late 2024.",
            'fa': "بیش از ۸ سال مدیریت نقدینگی فرکانس بالا، دفتر سفارشات و اجرای معاملات بین‌ارزی. انتقال تمرکز به ساخت زیرساخت‌های خودکار فین‌تک در اواخر ۲۰۲۴.",
            'ps': "له ۸ کلونو څخه زیات د لوړې فریکونسۍ نقدینګي، د آرډرونو کتاب او د اسعارو تبادلې مدیریت. په ۲۰۲۴ کې د اتوماتیک فینټیک زیربناوو جوړولو ته د پام اړول.",
            'ru': "Более 8 лет управления высокочастотной ликвидностью, биржевыми стаканами и валютными операциями. Переход к созданию финтех-инфраструктуры в конце 2024 года.",
            'tr': "8 yılı aşkın süre yüksek frekanslı likidite, emir defterleri ve döviz işlemleri yönetimi. 2024 sonlarında otomatik FinTech altyapısı kurmaya odaklanma.",
            'de': "Über 8 Jahre Management von Hochfrequenzliquidität und Devisenhandel. Ende 2024 Verlagerung auf den Aufbau automatisierter Fintech-Infrastrukturen.",
            'fr': "Plus de 8 ans de gestion de la liquidité à haute fréquence et de trading de devises. Transition vers les infrastructures fintech fin 2024.",
            'ar': "أكثر من 8 سنوات في إدارة السيولة عالية التردد ودفاتر الأوامر وتداول العملات. التحول نحو بناء بنية تحتية للتكنولوجيا المالية أواخر 2024.",
            'ur': "ہائی فریکوئنسی لیکویڈیٹی اور کرنسی ٹریڈنگ کے انتظام کا 8 سال سے زیادہ کا تجربہ۔ 2024 کے اواخر میں فین ٹیک انفراسٹرکچر کی تعمیر پر توجہ مرکوز کی۔",
            'es': "Más de 8 años gestionando liquidez de alta frecuencia y operaciones de divisas. Transición a la construcción de infraestructura fintech a finales de 2024.",
            'zh': "拥有超过8年的高频流动性撮合、订单簿微观结构管理及跨币种执行实战底蕴。于2024年底全面聚焦于自动化金融科技底座的研发与拓展。",
            'hi': "उच्च-आवृत्ति तरलता और मुद्रा निष्पादन के प्रबंधन का 8 से अधिक वर्षों का अनुभव। 2024 के अंत में स्वचालित फिनटेक बुनियादी ढांचे के निर्माण पर ध्यान केंद्रित किया।",
            'it': "Oltre 8 anni di gestione della liquidità ad alta frequenza e trading di valute. Transizione verso infrastrutture fintech alla fine del 2024.",
            'pt': "Mais de 8 anos a gerir liquidez de alta frequência e operações cambiais. Transição para a criação de infraestrutura fintech no final de 2024.",
            'ja': "8年以上にわたり高頻度流動性、オーダーブック管理、為替執行を統括。2024年末より自動化FinTechインフラの構築へと発展。",
            'ko': "8년 이상 고주파 유동성 및 통화 트레이딩 집행을 주도했으며, 2024년 말부터 자동화된 핀테크 인프라 구축으로 영역을 확장했습니다.",
            'nl': "Meer dan 8 jaar beheer van hoogfrequente liquiditeit en valutahandel. Eind 2024 focus verlegd naar geautomatiseerde fintech-infrastructuur.",
            'uz': "Yuqori chastotali likvidlik va valyuta operatsiyalarini boshqarish bo'yicha 8 yildan ortiq tajriba. 2024-yil oxirida FinTech infratuzilmasiga o'tish.",
            'id': "Lebih dari 8 tahun mengelola likuiditas frekuensi tinggi dan eksekusi lintas mata uang. Beralih ke pembangunan infrastruktur fintech pada akhir 2024."
        },
        'm3': {
            'en': "Architected enterprise network topology, high-throughput server backbones, live broadcast uplinks, and digital identity databases for national operations.",
            'fa': "معماری توپولوژی شبکه سازمانی، ستون فقرات سرورهای با کارایی بالا، خطوط پخش زنده و پایگاه‌های داده هویت دیجیتال برای عملیات ملی.",
            'ps': "د سازماني شبکې معمارۍ، د لوړ سرعت سرورونو، ژوندی خپرونو لینکس او ملي ډیجیټل هویت ډیټابیسونو ډیزاین او پلي کول.",
            'ru': "Проектирование корпоративной сетевой топологии, высокопроизводительных серверов, спутниковых каналов трансляций и баз данных цифровой идентификации.",
            'tr': "Kurumsal ağ topolojisi, yüksek verimli sunucu omurgaları, canlı yayın bağlantıları ve ulusal dijital kimlik veritabanlarının mimarisi.",
            'de': "Architektur von Unternehmensnetzwerken, Hochleistungsservern, Live-Übertragungs-Uplinks und digitalen Identitätsdatenbanken.",
            'fr': "Architecture de la topologie réseau, des serveurs à haut débit, des liaisons de diffusion en direct et des bases de données d'identité numérique.",
            'ar': "هندسة طوبولوجيا الشبكات المؤسسية والبنية التحتية للخوادم وبث النقل الحي وقواعد بيانات الهوية الرقمية.",
            'ur': "انٹرپرائز نیٹ ورک ٹوپولوجی، اعلیٰ تھرو پٹ سرور بیک بونز، لائیو نشریاتی رابطوں اور ڈیجیٹل شناختی ڈیٹا بیسز کی تیاری۔",
            'es': "Diseño de topología de red empresarial, servidores de alto rendimiento, enlaces de transmisión en vivo y bases de datos de identidad digital.",
            'zh': "主导设计国家级机构的企业网络拓扑、高吞吐分布式服务器中枢、多路高清实时直播卫星链路及大规模数字身份验证数据库。",
            'hi': "उद्यम नेटवर्क टोपोलॉजी, उच्च-थ्रूपुट सर्वर बैकबोन, लाइव प्रसारण अपलिंक और डिजिटल पहचान डेटाबेस का निर्माण।",
            'it': "Progettazione della topologia di rete aziendale, server ad alte prestazioni, uplink per trasmissioni in diretta e database di identità digitale.",
            'pt': "Arquitetura de rede empresarial, servidores de alto rendimento, transmissões ao vivo e bases de dados de identidade digital.",
            'ja': "エンタープライズ・ネットワーク構造、高スループットサーバー、衛星中継リンク、デジタル身元認証データベースを構築。",
            'ko': "엔터프라이즈 네트워크 토폴로지, 고성능 서버 백본, 라이브 방송 업링크 및 디지털 신원 인증 데이터베이스 설계 구축.",
            'nl': "Ontwerp van netwerktopologie, hoogwaardige serverbackbones, live-uitzendingen en databases voor digitale identiteit.",
            'uz': "Korporativ tarmoq topologiyasi, yuqori tezlikdagi serverlar, jonli efir ulanishlari va raqamli identifikatsiya bazalarini loyihalash.",
            'id': "Merancang topologi jaringan perusahaan, infrastruktur server berkecepatan tinggi, siaran langsung, dan basis data identitas digital."
        }
    }

    # Academic credentials
    pedigree_titles = {
        'p1': {
            'school': "Istanbul Technical University (ITU)",
            'degree': {
                'en': "Bachelor of Science in Computer Science (2019 - 2023)",
                'fa': "لیسانس علوم کامپیوتر (۲۰۱۹ - ۲۰۲۳)",
                'ps': "د کمپیوټر ساینس لیسانس (۲۰۱۹ - ۲۰۲۳)",
                'ru': "Бакалавр компьютерных наук (2019 - 2023)",
                'tr': "Bilgisayar Mühendisliği Lisans Derecesi (2019 - 2023)",
                'de': "Bachelor of Science in Informatik (2019 - 2023)",
                'fr': "Bachelor of Science en Informatique (2019 - 2023)",
                'ar': "بكالوريوس في علوم الحاسوب (2019 - 2023)",
                'ur': "کمپیوٹر سائنس میں بیچلرز (2019 - 2023)",
                'es': "Licenciatura en Ciencias de la Computación (2019 - 2023)",
                'zh': "计算机科学理学学士（2019 - 2023）",
                'hi': "कंप्यूटर विज्ञान में विज्ञान स्नातक (2019 - 2023)",
                'it': "Laurea in Informatica (2019 - 2023)",
                'pt': "Licenciatura em Ciências da Computação (2019 - 2023)",
                'ja': "コンピュータサイエンス学士（2019 - 2023）",
                'ko': "컴퓨터공학 학사 (2019 - 2023)",
                'nl': "Bachelor of Science in Computerwetenschappen (2019 - 2023)",
                'uz': "Kompyuter fanlari bakalavriati (2019 - 2023)",
                'id': "Sarjana Ilmu Komputer (2019 - 2023)"
            },
            'desc': {
                'en': "Specialized in Distributed Systems Architecture, Algorithmic Computational Complexity, and Cryptographic Security at one of Eurasia's most prestigious technical institutions.",
                'fa': "تخصص در معماری سیستم‌های توزیع‌شده، پیچیدگی محاسباتی الگوریتم‌ها و امنیت رمزنگاری در یکی از معتبرترین دانشگاه‌های فنی اوراسیا.",
                'ps': "د یوروشیا په یو له خورا معتبرو پوهنتونونو کې د ویشل شویو سیسټمونو معمارۍ، الګوریتمیک محاسبې او کریپټوګرافیک امنیت کې تخصص.",
                'ru': "Специализация на архитектуре распределенных систем, алгоритмической сложности и криптографической безопасности в престижном вузе Евразии.",
                'tr': "Avrasya'nın en prestijli teknik üniversitelerinden birinde Dağıtık Sistemler Mimarisi, Hesaplamalı Karmaşıklık ve Kriptografik Güvenlik uzmanlığı.",
                'de': "Spezialisierung auf verteilte Systeme, algorithmische Komplexität und kryptografische Sicherheit an einer renommierten Universität.",
                'fr': "Spécialisation dans les systèmes distribués, la complexité algorithmique et la sécurité cryptographique dans une institution prestigieuse.",
                'ar': "تخصص في معمارية النظم الموزعة والتعقيد الحسابي الخوارزمي والأمن التشفيري في إحدى أرقى الجامعات التقنية في أوراسيا.",
                'ur': "یوریشیا کے معتبر تعلیمی ادارے سے ڈسٹری بیوٹڈ سسٹمز، الگورتھمک کمپلیکسٹی اور کرپٹوگرافک سیکیورٹی میں مہارت۔",
                'es': "Especialización en arquitectura de sistemas distribuidos, complejidad algorítmica y seguridad criptográfica en una prestigiosa universidad técnica.",
                'zh': "在欧亚大陆享负盛名的理工学府深造，专攻分布式系统架构、计算复杂性理论及高安全性密码学协议。",
                'hi': "यूरेशिया के प्रतिष्ठित तकनीकी संस्थान में वितरित सिस्टम आर्किटेक्चर, एल्गोरिदम जटिलता और क्रिप्टोग्राफिक सुरक्षा में विशेषज्ञता।",
                'it': "Specializzazione in architettura dei sistemi distribuiti, complessità algoritmica e sicurezza crittografica presso un prestigioso ateneo tecnico.",
                'pt': "Especialização em arquitetura de sistemas distribuídos, complexidade algorítmica e segurança criptográfica numa instituição prestigiada.",
                'ja': "ユーラシア有数の名門工科大学にて、分散システムアーキテクチャ、計算複雑性理論、暗号セキュリティを専攻。",
                'ko': "유라시아 최고의 공과대학에서 분산 시스템 아키텍처, 계산 복잡도 이론 및 암호학적 보안을 전공.",
                'nl': "Gespecialiseerd in gedistribueerde systemen, algoritmische complexiteit en cryptografische beveiliging aan een prestigieuze universiteit.",
                'uz': "Yevrosiyoning nufuzli texnika universitetida taqsimlangan tizimlar arxitekturasi va kriptografik xavfsizlik bo'yicha mutaxassislik.",
                'id': "Spesialisasi dalam Arsitektur Sistem Terdistribusi, Kompleksitas Komputasi, dan Keamanan Kriptografi di universitas teknik terkemuka."
            }
        },
        'p2': {
            'school': {
                'en': "IFTA Professional Certification", 'fa': "گواهینامه بین‌المللی تحلیل تکنیکال IFTA", 'ps': "د IFTA مسلکي نړیوال سند",
                'ru': "Профессиональная сертификация IFTA", 'tr': "IFTA Profesyonel Sertifikasyonu", 'de': "Professionelle IFTA-Zertifizierung",
                'fr': "Certification Professionnelle IFTA", 'ar': "الشهادة المهنية من IFTA", 'ur': "آئی ایف ٹی اے پروفیشنل سرٹیفیکیشن",
                'es': "Certificación Profesional IFTA", 'zh': "IFTA国际技术分析师资格认证", 'hi': "IFTA पेशेवर प्रमाणन",
                'it': "Certificazione Professionale IFTA", 'pt': "Certificação Profissional IFTA", 'ja': "IFTA国際テクニカルアナリスト認定",
                'ko': "IFTA 국제공인 기술적분석가 자격", 'nl': "Professionele IFTA-certificering", 'uz': "IFTA professional sertifikati", 'id': "Sertifikasi Profesional IFTA"
            },
            'degree': {
                'en': "International Federation of Technical Analysts (Dec 2024)",
                'fa': "فدراسیون بین‌المللی تحلیل‌گران تکنیکال (دسامبر ۲۰۲۴)",
                'ps': "د تخنیکي تحلیلګرانو نړیوال فدراسیون (دسمبر ۲۰۲۴)",
                'ru': "Международная федерация технических аналитиков (дек. 2024)",
                'tr': "Uluslararası Teknik Analistler Federasyonu (Aralık 2024)",
                'de': "International Federation of Technical Analysts (Dez. 2024)",
                'fr': "Fédération Internationale des Analystes Techniques (Déc. 2024)",
                'ar': "الاتحاد الدولي للمحللين الفنيين (ديسمبر 2024)",
                'ur': "انٹرنیشنل فیڈریشن آف ٹیکنیکل اینالسٹس (دسمبر 2024)",
                'es': "Federación Internacional de Analistas Técnicos (Dic. 2024)",
                'zh': "国际技术分析师联合会（2024年12月）",
                'hi': "इंटरनेशनल फेडरेशन ऑफ टेक्निकल एनालिस्ट्स (दिसंबर 2024)",
                'it': "International Federation of Technical Analysts (Dic. 2024)",
                'pt': "Federação Internacional de Analistas Técnicos (Dez. 2024)",
                'ja': "国際テクニカルアナリスト連盟（2024年12月）",
                'ko': "국제공인기술적분석가연맹 (2024년 12월)",
                'nl': "International Federation of Technical Analysts (Dec 2024)",
                'uz': "Xalqaro texnik tahlilchilar federatsiyasi (Dekabr 2024)",
                'id': "Federasi Analis Teknikal Internasional (Des 2024)"
            },
            'desc': {
                'en': "Certified international credentials in quantitative market modeling, risk analysis, and macro-financial behavioral analytics.",
                'fa': "اعتبارسنجی معتبر بین‌المللی در مدل‌سازی کمی بازارهای مالی، تحلیل ریسک و روانشناسی رفتار کلان مالی.",
                'ps': "په کمیتي بازار موډلینګ، د خطر تحلیل او لوی مالي چلند تحلیل کې باوري نړیوال سند.",
                'ru': "Международный сертификат в области количественного моделирования рынков, анализа рисков и макрофинансовой аналитики.",
                'tr': "Kantitatif piyasa modellemesi, risk analizi ve makro-finansal davranışsal analitik alanlarında uluslararası sertifika.",
                'de': "Zertifizierte Qualifikation in quantitativer Marktmodellierung, Risikoanalyse und Makro-Finanzanalyse.",
                'fr': "Qualification internationale en modélisation quantitative, gestion des risques et analyse macro-financière.",
                'ar': "اعتماد دولي في النمذجة الكمية للأسواق وإدارة المخاطر والتحليلات السلوكية للاقتصاد الكلي.",
                'ur': "مقداری مارکیٹ ماڈلنگ، رسک اینالیسس اور میکرو فنانشل اینالیٹکس میں باضابطہ بین الاقوامی اسناد۔",
                'es': "Credencial internacional en modelado cuantitativo de mercados, análisis de riesgos y analítica macrofinanciera.",
                'zh': "获得量化市场建模、极端风险度量及宏观金融行为学领域的全球顶尖专业资质认证。",
                'hi': "मात्रात्मक बाजार मॉडलिंग, जोखिम विश्लेषण और मैक्रो-वित्तीय व्यवहार एनालिटिक्स में प्रमाणित अंतरराष्ट्रीय साख।",
                'it': "Credenziali internazionali certificate nella modellazione quantitativa del mercato e analisi del rischio.",
                'pt': "Credenciais internacionais certificadas em modelação quantitativa de mercado e gestão de risco.",
                'ja': "計量市場モデリング、リスク解析、マクロ金融行動分析における最高水準の国際認定資格。",
                'ko': "계량적 시장 모델링, 리스크 분석 및 거시 금융 행동 분석에 관한 공인 국제 자격.",
                'nl': "Gecertificeerde internationale kwalificaties in kwantitatieve marktmodellering en risicoanalyse.",
                'uz': "Bozorlarni miqdoriy modellashtirish, xavflarni tahlil qilish va makro-moliyaviy tahlil bo'yicha xalqaro sertifikat.",
                'id': "Kredensial internasional terakreditasi dalam pemodelan pasar kuantitatif, analisis risiko, dan analitik makro-finansial."
            }
        }
    }

    # Languages
    def get_languages(l):
        lang_names = {
            'en': {'l1': "English", 'l2': "Persian / Dari", 'l3': "Pashto", 'l4': "Turkish"},
            'fa': {'l1': "انگلیسی", 'l2': "فارسی / دری", 'l3': "پشتو", 'l4': "ترکی"},
            'ps': {'l1': "انګلیسي", 'l2': "فارسي / دري", 'l3': "پښتو", 'l4': "ترکي"},
            'ru': {'l1': "Английский", 'l2': "Персидский / Дари", 'l3': "Пушту", 'l4': "Турецкий"},
            'tr': {'l1': "İngilizce", 'l2': "Farsça / Derice", 'l3': "Peştuca", 'l4': "Türkçe"},
            'de': {'l1': "Englisch", 'l2': "Persisch / Dari", 'l3': "Paschtu", 'l4': "Türkisch"},
            'fr': {'l1': "Anglais", 'l2': "Persan / Dari", 'l3': "Pachto", 'l4': "Turc"},
            'ar': {'l1': "الإنجليزية", 'l2': "الفارسية / الدري", 'l3': "البشتو", 'l4': "التركية"},
            'ur': {'l1': "انگریزی", 'l2': "فارسی / دری", 'l3': "پشتو", 'l4': "ترکی"},
            'es': {'l1': "Inglés", 'l2': "Persa / Dari", 'l3': "Pastún", 'l4': "Turco"},
            'zh': {'l1': "英语", 'l2': "波斯语 / 达里语", 'l3': "普什图语", 'l4': "土耳其语"},
            'hi': {'l1': "अंग्रेज़ी", 'l2': "फ़ारसी / दरी", 'l3': "पश्तो", 'l4': "तुर्की"},
            'it': {'l1': "Inglese", 'l2': "Persiano / Dari", 'l3': "Pashto", 'l4': "Turco"},
            'pt': {'l1': "Inglês", 'l2': "Persa / Dari", 'l3': "Pashto", 'l4': "Turco"},
            'ja': {'l1': "英語", 'l2': "ペルシャ語 / ダリー語", 'l3': "パシュトー語", 'l4': "トルコ語"},
            'ko': {'l1': "영어", 'l2': "페르시아어 / 다리어", 'l3': "파슈토어", 'l4': "튀르키예어"},
            'nl': {'l1': "Engels", 'l2': "Perzisch / Dari", 'l3': "Pasjtoe", 'l4': "Turks"},
            'uz': {'l1': "Ingliz tili", 'l2': "Fors / Dariy tili", 'l3': "Pushtu tili", 'l4': "Turk tili"},
            'id': {'l1': "Bahasa Inggris", 'l2': "Persia / Dari", 'l3': "Pashto", 'l4': "Turki"}
        }
        levels = {
            'l1': {
                'en': "Professional Fluent", 'fa': "تسلط حرفه‌ای", 'ps': "مسلکي روان",
                'ru': "Свободно профессиональный", 'tr': "Profesyonel Akıcı", 'de': "Verhandlungssicher",
                'fr': "Courant Professionnel", 'ar': "طلاقة مهنية", 'ur': "پیشہ ورانہ روانی",
                'es': "Fluidez Profesional", 'zh': "专业商务流利", 'hi': "व्यावसायिक प्रवाह",
                'it': "Fluente Professionale", 'pt': "Fluência Profissional", 'ja': "ビジネス流暢",
                'ko': "비즈니스 원어민 수준", 'nl': "Professioneel Vloeiend", 'uz': "Professional ravon", 'id': "Fasih Profesional"
            },
            'l2': {
                'en': "Native", 'fa': "زبان مادری", 'ps': "مورنۍ ژبه",
                'ru': "Родной", 'tr': "Anadili", 'de': "Muttersprache",
                'fr': "Langue Maternelle", 'ar': "اللغة الأم", 'ur': "مادری زبان",
                'es': "Nativo", 'zh': "母语", 'hi': "मातृभाषा",
                'it': "Madrelingua", 'pt': "Língua Materna", 'ja': "ネイティブ",
                'ko': "모국어", 'nl': "Moedertaal", 'uz': "Ona tili", 'id': "Penutur Asli"
            },
            'l3': {
                'en': "Native", 'fa': "زبان مادری", 'ps': "مورنۍ ژبه",
                'ru': "Родной", 'tr': "Anadili", 'de': "Muttersprache",
                'fr': "Langue Maternelle", 'ar': "اللغة الأم", 'ur': "مادری زبان",
                'es': "Nativo", 'zh': "母语", 'hi': "मातृभाषा",
                'it': "Madrelingua", 'pt': "Língua Materna", 'ja': "ネイティブ",
                'ko': "모국어", 'nl': "Moedertaal", 'uz': "Ona tili", 'id': "Penutur Asli"
            },
            'l4': {
                'en': "Conversational Academic", 'fa': "مکالمه آکادمیک", 'ps': "اکاډمیک پوهاوی",
                'ru': "Разговорный академический", 'tr': "Akademik ve Günlük", 'de': "Akademische Konversation",
                'fr': "Académique & Conversationnel", 'ar': "محادثة أكاديمية", 'ur': "تعلیمی بات چیت",
                'es': "Conversacional Académico", 'zh': "学术交流与日常会话", 'hi': "शैक्षणिक वार्तालाप",
                'it': "Conversazione Accademica", 'pt': "Conversacional Académico", 'ja': "学術・日常会話",
                'ko': "학술 및 일상 대화 가능", 'nl': "Academisch Vloeiend", 'uz': "Akademik muloqot", 'id': "Percakapan Akademis"
            }
        }
        ln = lang_names.get(l, lang_names['en'])
        return [
            {'lang': ln['l1'], 'level': levels['l1'].get(l, levels['l1']['en'])},
            {'lang': ln['l2'], 'level': levels['l2'].get(l, levels['l2']['en'])},
            {'lang': ln['l3'], 'level': levels['l3'].get(l, levels['l3']['en'])},
            {'lang': ln['l4'], 'level': levels['l4'].get(l, levels['l4']['en'])},
        ]

    # Institutional Accreditations
    def get_accreditations(l):
        acc_title = {
            'en': "Institutional Accreditations", 'fa': "اعتبارات و مدارک رسمی سازمانی", 'ps': "رسمي کارپوریټ اعتبارونه او سندونه",
            'ru': "Институциональные аккредитации", 'tr': "Kurumsal Akreditasyonlar", 'de': "Institutionelle Akkreditierungen",
            'fr': "Accréditations Institutionnelles", 'ar': "الاعتمادات المؤسسية", 'ur': "ادارہ جاتی تصدیقات",
            'es': "Acreditaciones Institucionales", 'zh': "官方机构资质与权威认证", 'hi': "संस्थागत प्रत्यायन",
            'it': "Accreditamenti Istituzionali", 'pt': "Acreditações Institucionais", 'ja': "公式機関認定および資格",
            'ko': "공식 기관 인증 및 자격", 'nl': "Institutionele Accreditaties", 'uz': "Institutsional akkreditatsiyalar", 'id': "Akreditasi Institusional"
        }
        items = {
            'a1': {
                'title': {
                    'en': "IFTA Global Certification", 'fa': "گواهی‌نامه جهانی IFTA", 'ps': "د IFTA نړیوال سند",
                    'ru': "Глобальная сертификация IFTA", 'tr': "IFTA Küresel Sertifikası", 'de': "Globale IFTA-Zertifizierung",
                    'fr': "Certification Mondiale IFTA", 'ar': "شهادة IFTA العالمية", 'ur': "آئی ایف ٹی اے عالمی سرٹیفیکیشن",
                    'es': "Certificación Global IFTA", 'zh': "IFTA全球技术分析师资质", 'hi': "IFTA वैश्विक प्रमाणन",
                    'it': "Certificazione Globale IFTA", 'pt': "Certificação Global IFTA", 'ja': "IFTAグローバル認定資格",
                    'ko': "IFTA 글로벌 공인 자격", 'nl': "Wereldwijde IFTA-certificering", 'uz': "IFTA global sertifikati", 'id': "Sertifikasi Global IFTA"
                },
                'desc': {
                    'en': "Technical Analysis & Financial Market Engineering", 'fa': "تحلیل تکنیکال و مهندسی بازارهای مالی", 'ps': "تخنیکي تحلیل او مالي انجینري",
                    'ru': "Технический анализ и инженерия финансовых рынков", 'tr': "Teknik Analiz ve Finansal Piyasa Mühendisliği", 'de': "Technische Analyse & Finanzmarktentwicklung",
                    'fr': "Analyse Technique & Ingénierie des Marchés Financiers", 'ar': "التحليل الفني وهندسة الأسواق المالية", 'ur': "ٹیکنیکل اینالیسس اور فنانشل انجینئرنگ",
                    'es': "Análisis Técnico e Ingeniería de Mercados Financieros", 'zh': "金融市场量化分析与交易工程学", 'hi': "तकनीकी विश्लेषण और वित्तीय बाजार इंजीनियरिंग",
                    'it': "Analisi Tecnica e Ingegneria dei Mercati Finanziari", 'pt': "Análise Técnica e Engenharia de Mercados Financeiros", 'ja': "テクニカル分析＆金融工学",
                    'ko': "기술적 분석 및 금융공학", 'nl': "Technische analyse & financiële marktengineering", 'uz': "Texnik tahlil va moliya bozori muhandisligi", 'id': "Analisis Teknikal & Rekayasa Pasar Keuangan"
                }
            },
            'a2': {
                'title': {
                    'en': "UK Companies House Registry", 'fa': "ثبت رسمی شرکت در انگلستان", 'ps': "د بریتانیا شرکتونو رسمي ثبت",
                    'ru': "Реестр Companies House Великобритании", 'tr': "Birleşik Krallık Şirketler Tescili", 'de': "UK Companies House Registrierung",
                    'fr': "Registre des Sociétés du Royaume-Uni", 'ar': "سجل الشركات في المملكة المتحدة", 'ur': "برطانیہ کمپنی ہاؤس رجسٹری",
                    'es': "Registro de Sociedades del Reino Unido", 'zh': "英国企业管理署注册备案", 'hi': "यूके कंपनी हाउस रजिस्ट्री",
                    'it': "Registro delle Imprese del Regno Unito", 'pt': "Registo de Empresas do Reino Unido", 'ja': "英国企業登記局公認",
                    'ko': "영국 기업청 공식 법인 등록", 'nl': "Handelsregister van het VK", 'uz': "Buyuk Britaniya Kompaniyalar Palatasi", 'id': "Registri Perusahaan Inggris (Companies House)"
                },
                'desc': {
                    'en': "Incorporation No. 17063286 (London, UK)", 'fa': "شماره ثبت رسمی: ۱۷۰۶۳۲۸۶ (لندن، انگلستان)", 'ps': "رسمي ثبت شمیره: ۱۷۰۶۳۲۸۶ (لندن، انګلستان)",
                    'ru': "Регистрационный номер 17063286 (Лондон, Великобритания)", 'tr': "Kayıt No: 17063286 (Londra, Birleşik Krallık)", 'de': "Handelsregisternr. 17063286 (London, UK)",
                    'fr': "N° d'incorporation 17063286 (Londres, Royaume-Uni)", 'ar': "رقم التأسيس 17063286 (لندن، المملكة المتحدة)", 'ur': "رجسٹریشن نمبر 17063286 (لندن، برطانیہ)",
                    'es': "N.º de incorporación 17063286 (Londres, Reino Unido)", 'zh': "英国法定设立注册号：17063286（英国伦敦）", 'hi': "निगमन संख्या 17063286 (लंदन, यूके)",
                    'it': "N. di registrazione 17063286 (Londra, Regno Unito)", 'pt': "N.º de registo 17063286 (Londres, Reino Unido)", 'ja': "法人登記番号 17063286（英国ロンドン）",
                    'ko': "법인 번호 17063286 (영국 런던)", 'nl': "Registratienr. 17063286 (Londen, VK)", 'uz': "Ro'yxatdan o'tish raqami: 17063286 (London, Buyuk Britaniya)", 'id': "Nomor Registrasi 17063286 (London, Inggris)"
                }
            },
            'a3': {
                'title': {
                    'en': "ITU Computer Science Graduate", 'fa': "دانش‌آموخته علوم کامپیوتر دانشگاه فنی استانبول", 'ps': "د استانبول تخنیکي پوهنتون د کمپیوټر ساینس فارغ",
                    'ru': "Выпускник компьютерных наук ITU", 'tr': "İTÜ Bilgisayar Mühendisliği Mezunu", 'de': "Absolvent der ITU-Informatik",
                    'fr': "Diplômé en informatique de l'ITU", 'ar': "خريج علوم الحاسوب من جامعة إسطنبول التقنية", 'ur': "آئی ٹی یو کمپیوٹر سائنس گریجویٹ",
                    'es': "Graduado en Ciencias de la Computación de la ITU", 'zh': "伊斯坦布尔理工大学计算机科学学士", 'hi': "ITU कंप्यूटर विज्ञान स्नातक",
                    'it': "Laureato in Informatica ITU", 'pt': "Graduado em Ciências da Computação da ITU", 'ja': "イスタンブール工科大学CS修了",
                    'ko': "이스탄불 공과대학교 컴퓨터공학 졸업", 'nl': "Afgestudeerd aan ITU Informatica", 'uz': "ITU kompyuter fanlari bitiruvchisi", 'id': "Lulusan Ilmu Komputer ITU"
                },
                'desc': {
                    'en': "Istanbul Technical University Alumni", 'fa': "عضو انجمن دانش‌آموختگان دانشگاه فنی استانبول", 'ps': "د استانبول تخنیکي پوهنتون علمي غړی",
                    'ru': "Выпускник Стамбульского технического университета", 'tr': "İstanbul Teknik Üniversitesi Mezunlar Ağı", 'de': "Alumni der Technischen Universität Istanbul",
                    'fr': "Alumni de l'Université technique d'Istanbul", 'ar': "خريج جامعة إسطنبول التقنية", 'ur': "استنبول ٹیکنیکل یونیورسٹی ایلومنائی",
                    'es': "Exalumno de la Universidad Técnica de Estambul", 'zh': "伊斯坦布尔理工大学全球校友网络成员", 'hi': "इस्तांबुल तकनीकी विश्वविद्यालय के पूर्व छात्र",
                    'it': "Alumni dell'Università Tecnica di Istanbul", 'pt': "Alumni da Universidade Técnica de Istambul", 'ja': "イスタンブール工科大学同窓生",
                    'ko': "이스탄불 공과대학교 공식 동문", 'nl': "Alumnus Technische Universiteit Istanbul", 'uz': "Istanbul Texnika Universiteti bitiruvchisi", 'id': "Alumni Istanbul Technical University"
                }
            },
            'a4': {
                'title': {
                    'en': "20+ Corporate Seminars", 'fa': "بیش از ۲۰ سمینار تخصصی شرکتی", 'ps': "له ۲۰ څخه ډیر مسلکي کارپوریټ سیمینارونه",
                    'ru': "Более 20 корпоративных семинаров", 'tr': "20'den Fazla Kurumsal Seminer", 'de': "Über 20 Unternehmensseminare",
                    'fr': "Plus de 20 Séminaires d'Entreprise", 'ar': "أكثر من 20 ندوة مؤسسية", 'ur': "20 سے زائد کارپوریٹ سیمینارز",
                    'es': "Más de 20 Seminarios Corporativos", 'zh': "20余场国际企业峰会演讲", 'hi': "20+ कॉर्पोरेट सेमिनार",
                    'it': "Oltre 20 Seminari Aziendali", 'pt': "Mais de 20 Seminários Corporativos", 'ja': "20以上の企業セミナー登壇",
                    'ko': "20회 이상의 기업 세미나 기조연설", 'nl': "20+ Bedrijfsseminars", 'uz': "20 dan ortiq korporativ seminarlar", 'id': "20+ Seminar Korporat"
                },
                'desc': {
                    'en': "Keynote on E-Commerce & FinTech", 'fa': "سخنرانی‌های کلیدی در تجارت الکترونیک و فین‌تک", 'ps': "په ای کامرس او فینټیک کې اصلي ویناوال",
                    'ru': "Ключевые доклады по электронной коммерции и финтеху", 'tr': "E-Ticaret ve FinTech Üzerine Açılış Konuşmaları", 'de': "Keynote zu E-Commerce und FinTech",
                    'fr': "Discours liminaire sur le commerce électronique et la FinTech", 'ar': "محاضرات رئيسية في التجارة الإلكترونية والتكنولوجيا المالية", 'ur': "ای کامرس اور فین ٹیک پر کلیدی خطابات",
                    'es': "Conferencias magistrales sobre comercio electrónico y FinTech", 'zh': "全球电子商务与金融科技前沿主题报告", 'hi': "ई-कॉमर्स और फिनटेक पर मुख्य भाषण",
                    'it': "Interventi su E-Commerce e FinTech", 'pt': "Palestras sobre Comércio Eletrónico e FinTech", 'ja': "Eコマース＆FinTech基調講演",
                    'ko': "이커머스 및 핀테크 기조연설", 'nl': "Keynotes over e-commerce en FinTech", 'uz': "Elektron tijorat va FinTech bo'yicha asosiy ma'ruzalar", 'id': "Pidato Utama tentang E-Commerce & FinTech"
                }
            }
        }
        res = []
        for k in ['a1', 'a2', 'a3', 'a4']:
            res.append({
                'title': items[k]['title'].get(l, items[k]['title']['en']),
                'desc': items[k]['desc'].get(l, items[k]['desc']['en'])
            })
        return acc_title.get(l, acc_title['en']), res

    acc_title, acc_list = get_accreditations(loc)

    return {
        'milestones': [
            {
                'title': milestone_titles['m1'].get(loc, milestone_titles['m1']['en']),
                'org': milestone_orgs['m1'],
                'desc': milestone_descs['m1'].get(loc, milestone_descs['m1']['en'])
            },
            {
                'title': milestone_titles['m2'].get(loc, milestone_titles['m2']['en']),
                'org': milestone_orgs['m2'],
                'desc': milestone_descs['m2'].get(loc, milestone_descs['m2']['en'])
            },
            {
                'title': milestone_titles['m3'].get(loc, milestone_titles['m3']['en']),
                'org': milestone_orgs['m3'],
                'desc': milestone_descs['m3'].get(loc, milestone_descs['m3']['en'])
            }
        ],
        'pedigree': [
            {
                'school': pedigree_titles['p1']['school'],
                'degree': pedigree_titles['p1']['degree'].get(loc, pedigree_titles['p1']['degree']['en']),
                'desc': pedigree_titles['p1']['desc'].get(loc, pedigree_titles['p1']['desc']['en'])
            },
            {
                'school': pedigree_titles['p2']['school'].get(loc, pedigree_titles['p2']['school']['en']),
                'degree': pedigree_titles['p2']['degree'].get(loc, pedigree_titles['p2']['degree']['en']),
                'desc': pedigree_titles['p2']['desc'].get(loc, pedigree_titles['p2']['desc']['en'])
            }
        ],
        'languages': get_languages(loc),
        'accreditationsTitle': acc_title,
        'accreditations': acc_list
    }
