# -*- coding: utf-8 -*-
"""
Generate complete 19-language AboutTranslation objects for src/utils/aboutTranslations.ts
"""
import json

LOCALES = ['en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur', 'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id']

heroLine1 = {
    'en': "Architecting The Future of ",
    'fa': "معماری آینده‌ی ",
    'ps': "د راتلونکي بنسټیزه رغونه: ",
    'ru': "Создавая будущее ",
    'tr': "Geleceği İnşa Ediyoruz: ",
    'de': "Die Zukunft gestalten: ",
    'fr': "Bâtir l'avenir de ",
    'ar': "هندسة مستقبل ",
    'ur': "مستقبل کی تعمیر: ",
    'es': "Construyendo el futuro de ",
    'zh': "重塑全球数字未来：",
    'hi': "भविष्य का निर्माण: ",
    'it': "Progettare il futuro di ",
    'pt': "Construindo o futuro da ",
    'ja': "未来を創造する：",
    'ko': "미래를 설계하다: ",
    'nl': "De toekomst vormgeven: ",
    'uz': "Kelajakni barpo etish: ",
    'id': "Merancang Masa Depan "
}

heroLine2 = {
    'en': "Global Education.",
    'fa': "آموزش و تخصص جهانی.",
    'ps': "نړیواله زده کړه او مسلکي تخصص.",
    'ru': "глобального образования.",
    'tr': "Küresel Eğitim ve Uzmanlık.",
    'de': "Globale Bildung & Expertise.",
    'fr': "l'éducation mondiale.",
    'ar': "التعليم والخبرة العالمية.",
    'ur': "عالمی تعلیم اور مہارت۔",
    'es': "la educación global.",
    'zh': "全球精英教育与专业实战技能。",
    'hi': "वैश्विक शिक्षा और विशेषज्ञता।",
    'it': "l'istruzione globale.",
    'pt': "educação global.",
    'ja': "グローバル教育と高度な専門性。",
    'ko': "글로벌 교육 및 실무 전문성.",
    'nl': "mondiaal onderwijs en expertise.",
    'uz': "Global ta'lim va kasbiy mahorat.",
    'id': "Pendidikan Global."
}

heroDesc = {
    'en': "Safi Academy is the premier international institution within the Safi Ecosystem. Headquartered in London, we bridge the gap between real-world industry mastery and modern educational technology, empowering tens of thousands of global students to achieve financial, technological, and intellectual independence.",
    'fa': "آکادمی صافی نهاد بین‌المللی پیشرو در اکوسیستم صافی است. با دفتر مرکزی در لندن، ما فاصله میان تخصص واقعی بازار و فناوری‌های نوین آموزشی را پیوند می‌دهیم تا ده‌ها هزار دانشجو در سراسر جهان به استقلال مالی و فناوری دست یابند.",
    'ps': "صافي اکاډمي د صافي نړیوال ایکوسیستم مخکښ تحصیلي بنسټ دی. په لندن کې د مرکزي دفتر سره، موږ د بازار د حقیقي مهارتونو او نوې ښوونیزې ټیکنالوژۍ ترمنځ واټن له منځه وړو ترڅو په زرګونو محصلین مالي او تخنیکي خپلواکۍ ته ورسیږي.",
    'ru': "Safi Academy — ведущее международное учебное заведение в экосистеме Safi. Со штаб-квартирой в Лондоне мы объединяем реальный практический опыт и передовые образовательные технологии, помогая десяткам тысяч студентов по всему миру достигать финансовой и технологической независимости.",
    'tr': "Safi Akademi, Safi Ekosisteminin önde gelen uluslararası eğitim kurumudur. Londra merkezli olarak, gerçek sektör uzmanlığı ile modern eğitim teknolojileri arasındaki köprüyü kuruyor, dünya çapında on binlerce öğrencinin finansal ve teknolojik bağımsızlığa ulaşmasını sağlıyoruz.",
    'de': "Die Safi Academy ist die führende internationale Institution im Safi-Ökosystem. Mit Hauptsitz in London schlagen wir die Brücke zwischen praktischer Marktkompetenz und modernen Bildungstechnologien, um Zehntausenden Studenten zu finanzieller und technologischer Unabhängigkeit zu verhelfen.",
    'fr': "Safi Academy est l'institution internationale phare de l'écosystème Safi. Basée à Londres, elle comble le fossé entre la maîtrise pratique du marché et les technologies éducatives modernes, permettant à des dizaines de milliers d'étudiants d'accéder à l'indépendance financière et technologique.",
    'ar': "أكاديمية صافي هي المؤسسة الدولية الرائدة ضمن منظومة صافي العالمية. بمقرها الرئيسي في لندن، نربط بين التميز العملي في السوق والتقنيات التعليمية الحديثة لتمكين عشرات الآلاف من الطلاب حول العالم من تحقيق الاستقلال المالي والتكنولوجي.",
    'ur': "صافی اکیڈمی صافی ایکو سسٹم کے اندر ایک صف اول کا بین الاقوامی ادارہ ہے۔ لندن میں اپنے ہیڈ کوارٹر کے ساتھ، ہم مارکیٹ کی عملی مہارت اور جدید تعلیمی ٹیکنالوجی کے درمیان فاصلوں کو ختم کرتے ہیں تاکہ دنیا بھر کے طلباء مالی اور تکنیکی خود مختاری حاصل کر سکیں۔",
    'es': "Safi Academy es la institución internacional insignia del Ecosistema Safi. Con sede en Londres, unimos el dominio práctico del mercado con tecnología educativa de vanguardia para empoderar a decenas de miles de estudiantes hacia la independencia financiera y tecnológica.",
    'zh': "萨菲学院是萨菲全球数字生态系统旗下的旗舰国际教育与科技实训机构。总部设立于英国伦敦，我们致力于将顶级工业界实战真知与前沿数字教学基建融为一体，赋能全球数万名青年学者实现卓越的技术实力与财务独立。",
    'hi': "सफ़ी अकादमी सफ़ी इकोसिस्टम के भीतर प्रमुख अंतरराष्ट्रीय संस्थान है। लंदन में मुख्यालय के साथ, हम वास्तविक उद्योग विशेषज्ञता और आधुनिक शैक्षिक प्रौद्योगिकी के बीच की खाई को पाटते हैं, जिससे दुनिया भर के हजारों छात्र वित्तीय और तकनीकी स्वतंत्रता प्राप्त कर सकें।",
    'it': "Safi Academy è la principale istituzione internazionale all'interno dell'ecosistema Safi. Con sede a Londra, uniamo la maestria pratica sul mercato con le moderne tecnologie educative, consentendo a decine di migliaia di studenti di raggiungere l'indipendenza finanziaria e tecnologica.",
    'pt': "A Safi Academy é a principal instituição internacional dentro do Ecossistema Safi. Com sede em Londres, unimos o domínio prático do mercado com tecnologias educacionais de ponta para capacitar dezenas de milhares de estudantes rumo à independência financeira e tecnológica.",
    'ja': "サフィ・アカデミーは、サフィ・エコシステムの旗艦となる国際高等教育機関です。英国ロンドンに本部を置き、業界の第一線で培われた実戦的スキルと最新のエドテックを融合させ、世界中の何万人もの受講生が確固たる経済的・技術的自立を確立できるよう支援しています。",
    'ko': "사피 아카데미는 사피 글로벌 생태계의 플래그십 국제 교육 기관입니다. 영국 런던에 본부를 두고 실전 산업 전문성과 현대적 교육 기술을 결합하여, 전 세계 수만 명의 인재들이 재정적·기술적 자립을 달성할 수 있도록 지원합니다.",
    'nl': "Safi Academy is het toonaangevende internationale instituut binnen het Safi-ecosysteem. Met het hoofdkantoor in Londen overbruggen we de kloof tussen praktische marktexpertise en moderne educatieve technologieën, waardoor tienduizenden studenten wereldwijd financiële en technologische onafhankelijkheid bereiken.",
    'uz': "Safi Academy — Safi ekotizimidagi yetakchi xalqaro ta'lim muassasasidir. Londondagi bosh qarorgohi orqali biz real bozor tajribasi va zamonaviy ta'lim texnologiyalari o'rtasidagi ko'prikni o'rnatib, o'n minglab talabalarga moliyaviy va texnologik mustaqillikka erishish imkonini beramiz.",
    'id': "Safi Academy adalah institusi internasional terkemuka di dalam Ekosistem Safi. Berkantor pusat di London, kami menjembatani penguasaan industri nyata dengan teknologi pendidikan modern, memberdayakan puluhan ribu siswa di seluruh dunia untuk mencapai kemandirian finansial dan teknologi."
}

fullCertIncluded = {
    'en': "Full Certification Included", 'fa': "شامل گواهی‌نامه رسمی", 'ps': "رسمي تصدیق پاڼه شامله ده",
    'ru': "Официальный сертификат включен", 'tr': "Resmi Sertifika Dahil", 'de': "Offizielles Zertifikat inklusive",
    'fr': "Certification officielle incluse", 'ar': "شهادة معتمدة مشمولة", 'ur': "باقاعدہ سند شامل ہے",
    'es': "Certificación oficial incluida", 'zh': "包含官方数字防伪认证证书", 'hi': "आधिकारिक प्रमाणन शामिल",
    'it': "Certificazione ufficiale inclusa", 'pt': "Certificação oficial incluída", 'ja': "公式修了証明書の発行を含む",
    'ko': "공식 인증 수료증 포함", 'nl': "Inclusief officieel certificaat", 'uz': "Rasmiy sertifikat kiritilgan", 'id': "Sertifikasi Resmi Termasuk"
}

institutionalStandard = {
    'en': "Institutional Standard", 'fa': "استاندارد سازمانی", 'ps': "سازماني او مسلکي معیار",
    'ru': "Корпоративный стандарт", 'tr': "Kurumsal Standart", 'de': "Institutioneller Standard",
    'fr': "Norme institutionnelle", 'ar': "معيار مؤسسي معتمد", 'ur': "ادارہ جاتی معیار",
    'es': "Estándar Institucional", 'zh': "国际企业级质量认证标准", 'hi': "संस्थागत मानक",
    'it': "Standard Istituzionale", 'pt': "Padrão Institucional", 'ja': "国際企業基準・品質規格",
    'ko': "글로벌 기관 표준 규격", 'nl': "Institutionele Standaard", 'uz': "Korporativ standart", 'id': "Standar Institusional"
}

leadershipBadge = {
    'en': "Leadership & Governance", 'fa': "رهبری و حاکمیت سازمانی", 'ps': "مشرتابه او سازماني اداره",
    'ru': "Руководство и управление", 'tr': "Liderlik ve Yönetişim", 'de': "Führung & Governance",
    'fr': "Leadership & Gouvernance", 'ar': "القيادة والحوكمة", 'ur': "قیادت اور گورننس",
    'es': "Liderazgo y Gobernanza", 'zh': "高管团队与企业治理", 'hi': "नेतृत्व और शासन",
    'it': "Leadership e Governance", 'pt': "Liderança e Governança", 'ja': "エグゼクティブ・ガバナンス",
    'ko': "최고경영진 리더십 및 거버넌스", 'nl': "Leiderschap & Bestuur", 'uz': "Yetakchilik va korporativ boshqaruv", 'id': "Kepemimpinan & Tata Kelola"
}

executiveBoardTitle = {
    'en': "The Executive Board", 'fa': "هیئت مدیره اجرایی", 'ps': "اجرایوي مدیره هیئت",
    'ru': "Исполнительный совет", 'tr': "İcra Kurulu", 'de': "Der Vorstand",
    'fr': "Le Conseil d'Administration", 'ar': "مجلس الإدارة التنفيذي", 'ur': "ایگزیکٹو بورڈ",
    'es': "La Junta Directiva", 'zh': "最高执行董事会", 'hi': "कार्यकारी बोर्ड",
    'it': "Il Consiglio Direttivo", 'pt': "O Conselho de Administração", 'ja': "最高経営執行評议会",
    'ko': "최고 집행 이사회", 'nl': "De Raad van Bestuur", 'uz': "Ijroiya kengashi", 'id': "Dewan Eksekutif"
}

executiveBoardDesc = {
    'en': "The Visionaries, Engineers, and Strategists Guiding The Safi Ecosystem",
    'fa': "رهبران، مهندسان و استراتژیست‌های راهبر اکوسیستم صافی",
    'ps': "د صافي ایکوسیستم مشران، انجنیران او ستراتیژستان",
    'ru': "Лидеры, инженеры и стратеги, руководящие экосистемой Safi",
    'tr': "Safi Ekosistemine Yön Veren Vizyonerler, Mühendisler ve Stratejistler",
    'de': "Die Visionäre, Ingenieure und Strategen des Safi-Ökosystems",
    'fr': "Les visionnaires, ingénieurs et stratèges qui guident l'écosystème Safi",
    'ar': "القادة والمهندسون والاستراتيجيون الموجهون لمنظومة صافي العالمية",
    'ur': "صافی ایکو سسٹم کی رہنمائی کرنے والے رہنما، انجینئرز اور ماہرین حکمت عملی",
    'es': "Los visionarios, ingenieros y estrategas que guían el Ecosistema Safi",
    'zh': "统领萨菲全球数字生态版图的前瞻领袖、系统架构师与跨国战略决策团队",
    'hi': "सफ़ी इकोसिस्टम का मार्गदर्शन करने वाले दूरदर्शी, इंजीनियर और रणनीतिकार",
    'it': "I visionari, ingegneri e strateghi che guidano l'ecosistema Safi",
    'pt': "Os visionários, engenheiros e estrategistas que guiam o Ecossistema Safi",
    'ja': "サフィ・グローバルエコシステムを率いる先見的リーダー、アーキテクト、国際戦略陣",
    'ko': "사피 글로벌 생태계를 이끄는 비저너리, 소프트웨어 아키텍트 및 전략가들",
    'nl': "De visionairs, ingenieurs en strategen die het Safi-ecosysteem leiden",
    'uz': "Safi ekotizimini boshqarayotgan yetakchilar, muhandislar va strateglar",
    'id': "Para Visioner, Insinyur, dan Ahli Strategi yang Memandu Ekosistem Safi"
}

readFullBio = {
    'en': "Read Full Bio", 'fa': "مشاهده بیوگرافی کامل", 'ps': "بشپړ ژوندلیک وګورئ",
    'ru': "Читать полную биографию", 'tr': "Biyografiyi İncele", 'de': "Vollständige Biografie",
    'fr': "Lire la biographie complète", 'ar': "قراءة السيرة الذاتية الكاملة", 'ur': "مکمل سوانح عمری پڑھیں",
    'es': "Ver biografía completa", 'zh': "查阅完整履历与生平", 'hi': "पूरी जीवनी पढ़ें",
    'it': "Leggi biografia completa", 'pt': "Ver biografia completa", 'ja': "詳細プロフィールを閲覧",
    'ko': "상세 프로필 보기", 'nl': "Lees volledige biografie", 'uz': "To'liq biografiyani o'qish", 'id': "Baca Profil Lengkap"
}

executiveBoardBadge = {
    'en': "Executive Board", 'fa': "هیئت مدیره", 'ps': "مدیره هیئت",
    'ru': "Совет директоров", 'tr': "İcra Kurulu", 'de': "Vorstand",
    'fr': "Conseil Exécutif", 'ar': "مجلس الإدارة", 'ur': "ایگزیکٹو بورڈ",
    'es': "Junta Directiva", 'zh': "董事会核心成员", 'hi': "कार्यकारी बोर्ड",
    'it': "Consiglio Direttivo", 'pt': "Diretoria Executiva", 'ja': "取締役会",
    'ko': "이사회 구성원", 'nl': "Bestuursraad", 'uz': "Boshqaruv kengashi", 'id': "Dewan Eksekutif"
}

eliteFaculty = {
    'en': "Elite Faculty", 'fa': "اساتید برجسته و هیئت علمی", 'ps': "وتلي او پیاوړي استادان",
    'ru': "Элитный преподавательский состав", 'tr': "Seçkin Eğitmen Kadrosu", 'de': "Elite-Dozententeam",
    'fr': "Corps Professoral d'Élite", 'ar': "نخبة أعضاء هيئة التدريس", 'ur': "ممتاز فیکلٹی ممبران",
    'es': "Profesorado de Élite", 'zh': "全球顶级师资阵容", 'hi': "प्रतिष्ठित संकाय",
    'it': "Corpo Docenti d'Élite", 'pt': "Corpo Docente de Elite", 'ja': "精鋭講師陣・アカデミック評議会",
    'ko': "엘리트 교수진 및 학부장", 'nl': "Elite Faculteit", 'uz': "Elita o'qituvchilar tarkibi", 'id': "Fakultas Elit"
}

facultyTitle = {
    'en': "Instructors & Department Leads", 'fa': "اساتید ارشد و مدیران دپارتمان‌ها", 'ps': "ارشد استادان او د څانګو مشران",
    'ru': "Преподаватели и руководители факультетов", 'tr': "Eğitmenler ve Bölüm Başkanları", 'de': "Dozenten & Fachbereichsleiter",
    'fr': "Instructeurs & Responsables de Département", 'ar': "المدربون ورؤساء الأقسام", 'ur': "اساتذہ اور شعبہ جات کے سربراہان",
    'es': "Instructores y Jefes de Departamento", 'zh': "核心导师与教研系主任", 'hi': "प्रशिक्षक और विभाग प्रमुख",
    'it': "Docenti e Responsabili di Dipartimento", 'pt': "Instrutores e Chefes de Departamento", 'ja': "主任講師・学術部門統括責任者",
    'ko': "전임 교수진 및 학과 총괄", 'nl': "Instructeurs & Afdelingshoofden", 'uz': "O'qituvchilar va kafedra mudirlari", 'id': "Instruktur & Kepala Departemen"
}

facultyDesc = {
    'en': "Learn directly from senior software architects, professional institutional traders, and industry leaders.",
    'fa': "یادگیری مستقیم از معماران ارشد نرم‌افزار، تریدرهای نهادی بین‌المللی و کارآفرینان پیشرو بازار.",
    'ps': "د سافټویر له پیاوړو انجنیرانو، مسلکي سوداګرو او د مارکیټ له مشرانو څخه مستقیمه زده کړه.",
    'ru': "Обучайтесь напрямую у ведущих архитекторов ПО, профессиональных трейдеров и лидеров индустрии.",
    'tr': "Kıdemli yazılım mimarlarından, profesyonel kurumsal yatırımcılardan ve sektör liderlerinden doğrudan öğrenin.",
    'de': "Lernen Sie direkt von führenden Software-Architekten, institutionellen Tradern und Branchenführern.",
    'fr': "Apprenez directement auprès d'architectes logiciels seniors, de traders institutionnels et de leaders de l'industrie.",
    'ar': "تعلم مباشرة من كبار مهندسي البرمجيات والمتداولين المؤسسيين وقادة الصناعة في العالم.",
    'ur': "سینئر سافٹ ویئر آرکیٹیکٹس، پیشہ ور ادارہ جاتی ٹریڈرز، اور صنعتی رہنماؤں سے براہ راست سیکھیں۔",
    'es': "Aprende directamente de arquitectos de software senior, operadores institucionales y líderes del sector.",
    'zh': "直接师从资深软件系统架构师、华尔街与伦敦机构级交易员及行业独角兽领航者。",
    'hi': "वरिष्ठ सॉफ्टवेयर आर्किटेक्ट, पेशेवर संस्थागत व्यापारियों और उद्योग के नेताओं से सीधे सीखें।",
    'it': "Impara direttamente da senior software architect, trader istituzionali professionisti e leader del settore.",
    'pt': "Aprenda diretamente com arquitetos de software seniores, traders institucionais e líderes da indústria.",
    'ja': "シニアソフトウェアアーキテクト、国際機関投資家トレーダー、業界をリードする起業家から直接学ぶ。",
    'ko': "수석 소프트웨어 아키텍트, 글로벌 기관 트레이더, 업계 최고 리더들로부터 직접 배우는 실전 지식.",
    'nl': "Leer rechtstreeks van senior software-architecten, professionele institutionele handelaren en leiders uit de industrie.",
    'uz': "Katta dasturiy ta'minot arxitektorlari, professional treyderlar va soha yetakchilaridan bevosita ta'lim oling.",
    'id': "Belajar langsung dari arsitek perangkat lunak senior, trader institusional profesional, dan pemimpin industri."
}

explorePlatform = {
    'en': "Explore Platform", 'fa': "مشاهده پلتفرم", 'ps': "پلاتفورم وګورئ",
    'ru': "Перейти на платформу", 'tr': "Platformu İncele", 'de': "Plattform erkunden",
    'fr': "Explorer la plateforme", 'ar': "استكشف المنصة", 'ur': "پلیٹ فارم دیکھیں",
    'es': "Explorar plataforma", 'zh': "访问与体验平台", 'hi': "प्लेटफ़ॉर्म देखें",
    'it': "Esplora piattaforma", 'pt': "Explorar plataforma", 'ja': "プラットフォームを閲覧",
    'ko': "플랫폼 둘러보기", 'nl': "Verken platform", 'uz': "Platformani ko'rish", 'id': "Jelajahi Platform"
}

corporateGovTitle = {
    'en': "Corporate Governance & UK Registry",
    'fa': "حاکمیت شرکتی و ثبت رسمی در بریتانیا",
    'ps': "شرکتي حکومتولي او په انګلستان کې رسمي ثبت",
    'ru': "Корпоративное управление и реестр Великобритании",
    'tr': "Kurumsal Yönetişim ve Birleşik Krallık Sicili",
    'de': "Unternehmensführung & UK-Unternehmensregister",
    'fr': "Gouvernance d'Entreprise et Registre du Royaume-Uni",
    'ar': "الحوكمة المؤسسية والسجل الرسمي في المملكة المتحدة",
    'ur': "کارپوریٹ گورننس اور برطانیہ میں باضابطہ رجسٹریشن",
    'es': "Gobernanza Corporativa y Registro en el Reino Unido",
    'zh': "跨国企业法律治理与英国皇家商业注册登记",
    'hi': "कॉर्पोरेट प्रशासन और यूके आधिकारिक रजिस्ट्री",
    'it': "Governance Aziendale e Registro del Regno Unito",
    'pt': "Governança Corporativa e Registo no Reino Unido",
    'ja': "企業統治（コーポレート・ガバナンス）および英国登記情報",
    'ko': "기업 거버넌스 및 영국 상무부 공식 등록 현황",
    'nl': "Corporate Governance & Brits Handelsregister",
    'uz': "Korporativ boshqaruv va Buyuk Britaniya rasmiy reestri",
    'id': "Tata Kelola Perusahaan & Registri Resmi Inggris Raya"
}

corporateGovP1 = {
    'en': "Safi Academy is the educational flagship of Safi International Capital LTD, a premier corporate financial entity officially registered in the United Kingdom under Company Number 17063286.",
    'fa': "آکادمی صافی پرچمدار آموزشی هلدینگ بین‌المللی Safi International Capital LTD می‌باشد که رسماً در بریتانیا تحت شماره ۱۷۰۶۳۲۸۶ به ثبت رسیده است.",
    'ps': "صافي اکاډمي د Safi International Capital LTD نړیوال هولډنګ تحصیلي بیرغ دی چې په رسمي ډول په انګلستان کې د ۱۷۰۶۳۲۸۶ نمبر لاندې ثبت شوی دی.",
    'ru': "Safi Academy является образовательным флагманом холдинга Safi International Capital LTD, официально зарегистрированного в Соединенном Королевстве под номером компании 17063286.",
    'tr': "Safi Akademi, Birleşik Krallık'ta 17063286 şirket numarasıyla resmi olarak kayıtlı Safi International Capital LTD'nin amiral gemisi eğitim kurumudur.",
    'de': "Die Safi Academy ist das Bildungsflaggschiff der Safi International Capital LTD, die im Vereinigten Königreich unter der Firmennummer 17063286 offiziell eingetragen ist.",
    'fr': "Safi Academy est le fleuron éducatif de Safi International Capital LTD, une entité enregistrée au Royaume-Uni sous le numéro 17063286.",
    'ar': "أكاديمية صافي هي الذراع التعليمي الرائد لشركة Safi International Capital LTD المسجلة رسمياً في المملكة المتحدة تحت رقم الشركة 17063286.",
    'ur': "صافی اکیڈمی Safi International Capital LTD کا تعلیمی پرچم بردار ادارہ ہے، جو برطانیہ میں کمپنی نمبر 17063286 کے تحت باضابطہ طور پر رجسٹرڈ ہے۔",
    'es': "Safi Academy es el buque insignia educativo de Safi International Capital LTD, una entidad financiera registrada oficialmente en el Reino Unido con el número 17063286.",
    'zh': "萨菲学院系英国跨国金融母公司Safi International Capital LTD全资控股的旗舰教育实体，依法于英国公司注册署注册，官方注册公司编号：17063286。",
    'hi': "सफ़ी अकादमी सफ़ी इंटरनेशनल कैपिटल लिमिटेड का प्रमुख शैक्षणिक संस्थान है, जो यूनाइटेड किंगडम में कंपनी नंबर 17063286 के तहत पंजीकृत है।",
    'it': "Safi Academy è il fiore all'occhiello educativo di Safi International Capital LTD, entità registrata nel Regno Unito con il numero di società 17063286.",
    'pt': "A Safi Academy é a principal instituição educacional da Safi International Capital LTD, registada no Reino Unido sob o número de empresa 17063286.",
    'ja': "サフィ・アカデミーは、英国において会社登録番号17063286として正式認可・登記された持株会社Safi International Capital LTDの旗艦教育機関です。",
    'ko': "사피 아카데미는 영국 상무부에 정식 등록된(법인 번호: 17063286) 지주회사 Safi International Capital LTD의 공식 대표 교육 기관입니다.",
    'nl': "Safi Academy is het educatieve vlaggenschip van Safi International Capital LTD, officieel geregistreerd in het Verenigd Koninkrijk onder bedrijfsnummer 17063286.",
    'uz': "Safi Academy — Buyuk Britaniyada 17063286 kompaniya raqami ostida rasman ro'yxatdan o'tgan Safi International Capital LTD xoldingining yetakchi ta'lim muassasasidir.",
    'id': "Safi Academy adalah institusi pendidikan unggulan dari Safi International Capital LTD, entitas korporat yang terdaftar resmi di Inggris Raya dengan Nomor Perusahaan 17063286."
}

corporateGovP2 = {
    'en': "Our global corporate headquarters is situated in the prestigious commercial heart of London at 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Our filings and corporate structure are fully verifiable with the UK Registrar of Companies (Companies House Tracker ID: 114-030414).",
    'fa': "دفتر مرکزی ما در قلب تجاری لندن در آدرس 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ واقع شده است. اطلاعات ثبتی ما نزد اداره ثبت شرکت‌های بریتانیا (Companies House شناسه پیگیری: 114-030414) کاملاً قابل استعلام است.",
    'ps': "زموږ مرکزي دفتر د لندن په سوداګریز زړه 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ کې موقعیت لري. زموږ معلومات د انګلستان د شرکتونو ادارې (Companies House د تعقیب کوډ: 114-030414) سره په پوره ډول قانوني او روښانه دي.",
    'ru': "Наша штаб-квартира расположена в престижном деловом районе Лондона по адресу: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Все документы верифицируемы в Регистрационной палате Великобритании (Companies House ID: 114-030414).",
    'tr': "Küresel genel merkezimiz, Londra'nın prestijli ticaret merkezinde 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ adresinde yer almaktadır. Şirket kayıtlarımız Companies House (Takip No: 114-030414) üzerinden doğrulanabilir.",
    'de': "Unser weltweiter Hauptsitz befindet sich im Geschäftszentrum von London: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Unsere Unternehmensdaten sind im Companies House (Tracker-ID: 114-030414) einsehbar.",
    'fr': "Notre siège social est situé à Londres, au 71-75 Shelton Street, Covent Garden, WC2H 9JQ. Nos registres sont consultables auprès de Companies House (ID : 114-030414).",
    'ar': "يقع مقرنا العالمي في قلب لندن التجاري في 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. ملفاتنا موثقة لدى Companies House برقم تتبع 114-030414.",
    'ur': "ہمارا ہیڈ کوارٹر لندن کے تجارتی مرکز 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ میں واقع ہے۔ ہماری رجسٹریشن برطانوی کمپنیز ہاؤس (ٹریکر ID: 114-030414) پر مکمل طور پر تصدیق شدہ ہے۔",
    'es': "Nuestra sede mundial está ubicada en el corazón de Londres en 71-75 Shelton Street, Covent Garden, WC2H 9JQ. Nuestros registros son verificables en Companies House (ID: 114-030414).",
    'zh': "我们的全球总部设立于英国伦敦科文特花园核心商业区：71-75 Shelton Street, Covent Garden, London, WC2H 9JQ。所有公司法定文件均可在英国公司署（Companies House 追踪凭证号：114-030414）查证核实。",
    'hi': "हमारा मुख्यालय लंदन के व्यापारिक केंद्र 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ में स्थित है। हमारा रिकॉर्ड यूके कंपनीज़ हाउस (ट्रैकर आईडी: 114-030414) पर सत्यापित है।",
    'it': "La nostra sede globale si trova nel cuore di Londra al 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. La registrazione è verificabile presso Companies House (ID: 114-030414).",
    'pt': "A nossa sede global está localizada em Londres em 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Registos verificáveis na Companies House (ID: 114-030414).",
    'ja': "グローバル本社所在地：英国ロンドン、コヴェント・ガーデン Shelton Street 71-75（WC2H 9JQ）。英国企業登録局（Companies House 追跡番号: 114-030414）において正式照会が可能です。",
    'ko': "글로벌 본사는 런던 코번트 가든의 중심지인 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ에 위치하고 있습니다. 영국 상무부(Companies House 추적 ID: 114-030414)에서 공식 조회가 가능합니다.",
    'nl': "Ons wereldwijde hoofdkantoor is gevestigd in Londen: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Volledig verifieerbaar bij Companies House (Tracker-ID: 114-030414).",
    'uz': "Bizning xalqaro bosh qarorgohimiz London markazidagi 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ manzilida joylashgan. Barcha hujjatlar Companies House (ID: 114-030414) orqali tasdiqlangan.",
    'id': "Kantor pusat global kami berlokasi di 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. Pendaftaran kami dapat diverifikasi sepenuhnya di Companies House Inggris (ID Pelacak: 114-030414)."
}

corporateGovQuote = {
    'en': "\"We do not merely adapt to the future; we architect it.\"",
    'fa': "«ما صرفاً با آینده سازگار نمی‌شویم؛ ما آن را مهندسی می‌کنیم.»",
    'ps': "«موږ یوازې د راتلونکي سره ځان نه برابروو؛ موږ راتلونکی په خپله جوړوو.»",
    'ru': "«Мы не просто адаптируемся к будущему; мы создаем его архитектуру.»",
    'tr': "\"Geleceğe yalnızca uyum sağlamıyoruz; onu bizzat inşa ediyoruz.\"",
    'de': "„Wir passen uns nicht nur der Zukunft an; wir gestalten sie.“",
    'fr': "« Nous ne nous adaptons pas seulement à l'avenir ; nous le bâtissons. »",
    'ar': "«نحن لا نتكيف مع المستقبل فحسب؛ بل نحن من يهندسه.»",
    'ur': "«ہم صرف مستقبل کے مطابق خود کو نہیں ڈھالتے، بلکہ ہم مستقبل کی تعمیر کرتے ہیں۔»",
    'es': "«No nos adaptamos meramente al futuro; lo arquitectamos.»",
    'zh': "“我们绝不仅是顺应未来的潮流，我们是未来数字秩序的架构者。”",
    'hi': "«हम केवल भविष्य के अनुकूल नहीं होते; हम इसका निर्माण करते हैं।»",
    'it': "«Non ci limitiamo ad adattarci al futuro; lo progettiamo.»",
    'pt': "«Não nos limitamos a adaptar-nos ao futuro; nós projetamo-lo.»",
    'ja': "「私たちは未来に適応するだけではありません。自らの手で未来を設計し、創造します。」",
    'ko': "\"우리는 미래에 단순히 순응하지 않습니다. 우리가 직접 미래를 설계하고 건축합니다.\"",
    'nl': "„We passen ons niet simpelweg aan de toekomst aan; we ontwerpen haar.”",
    'uz': "«Biz shunchaki kelajakka moslashmaymiz; biz uni o'z qo'limiz bilan quramiz.»",
    'id': "«Kami tidak hanya beradaptasi dengan masa depan; kami merancangnya.»"
}

corporateGovAuthor = {
    'en': "— The Safi Executive Board", 'fa': "— هیئت مدیره اجرایی صافی", 'ps': "— د صافي اجرایوي مدیره هیئت",
    'ru': "— Исполнительный совет Safi", 'tr': "— Safi İcra Kurulu", 'de': "— Der Safi-Vorstand",
    'fr': "— Le Conseil d'Administration de Safi", 'ar': "— مجلس الإدارة التنفيذي لمنظومة صافي", 'ur': "— صافی ایگزیکٹو بورڈ",
    'es': "— La Junta Directiva de Safi", 'zh': "— 萨菲全球最高执行董事会", 'hi': "— सफ़ी कार्यकारी बोर्ड",
    'it': "— Il Consiglio Direttivo Safi", 'pt': "— O Conselho de Administração da Safi", 'ja': "— サフィ最高経営執行評议会",
    'ko': "— 사피 최고 집행 이사회", 'nl': "— De Safi Raad van Bestuur", 'uz': "— Safi Ijroiya Kengashi", 'id': "— Dewan Eksekutif Safi"
}

faqSubtitle = {
    'en': "Everything you need to know about Safi Academy, our standards, certifications, and operations.",
    'fa': "همه چیزهایی که باید درباره آکادمی صافی، استانداردها، گواهی‌نامه‌ها و اعتبارسنجی بین‌المللی بدانید.",
    'ps': "هر هغه څه چې تاسو ورته د صافي اکاډمۍ د معیارونو، سندونو او کړنو په اړه اړتیا لرئ.",
    'ru': "Все, что вам нужно знать о Safi Academy, наших стандартах, сертификации и деятельности.",
    'tr': "Safi Akademi, standartlarımız, sertifikalarımız ve operasyonlarımız hakkında bilmeniz gereken her şey.",
    'de': "Alles, was Sie über die Safi Academy, unsere Standards, Zertifikate und Abläufe wissen müssen.",
    'fr': "Tout ce que vous devez savoir sur Safi Academy, nos normes, certifications et opérations.",
    'ar': "كل ما تحتاج لمعرفته حول أكاديمية صافي ومعاييرنا والشهادات والعمليات التشغيلية.",
    'ur': "صافی اکیڈمی، ہمارے معیارات، اسناد اور سرگرمیوں کے بارے میں وہ سب کچھ جو آپ جاننا چاہتے ہیں۔",
    'es': "Todo lo que necesitas saber sobre Safi Academy, nuestros estándares, certificaciones y operaciones.",
    'zh': "关于萨菲学院的学术标准、课程交付、防伪认证与全流程保障的一切常见疑问。",
    'hi': "सफ़ी अकादमी, हमारे मानकों, प्रमाणपत्रों और संचालन के बारे में वह सब कुछ जो आपको जानना चाहिए।",
    'it': "Tutto quello che c'è da sapere su Safi Academy, i nostri standard, certificazioni e operazioni.",
    'pt': "Tudo o que precisa de saber sobre a Safi Academy, os nossos padrões, certificações e operações.",
    'ja': "サフィ・アカデミーのカリキュラム、国際認証規格、運用方針に関するよくあるご質問。",
    'ko': "사피 아카데미의 교육 표준, 인증 수료증 및 글로벌 운영 방식에 대한 모든 안내.",
    'nl': "Alles wat u moet weten over Safi Academy, onze normen, certificeringen en bedrijfsvoering.",
    'uz': "Safi Academy, standartlarimiz, sertifikatlarimiz va faoliyatimiz haqida bilishingiz kerak bo'lgan barcha ma'lumotlar.",
    'id': "Semua hal yang perlu Anda ketahui tentang Safi Academy, standar, sertifikasi, dan operasional kami."
}

footerCtaDesc = {
    'en': "Join thousands of ambitious students worldwide who are acquiring elite skills, earning verifiable certifications, and thriving in the Safi Ecosystem.",
    'fa': "به هزاران دانشجوی مشتاق در سراسر جهان بپیوندید که در حال کسب مهارت‌های تراز اول، دریافت مدارک بین‌المللی و رشد در اکوسیستم صافی هستند.",
    'ps': "په ټوله نړۍ کې له زرګونو پیاوړو محصلینو سره یوځای شئ چې مسلکي مهارتونه ترلاسه کوي او نړیوال سندونه اخلي.",
    'ru': "Присоединяйтесь к тысячам амбициозных студентов по всему миру, осваивающим элитные навыки и получающим международные сертификаты.",
    'tr': "Üst düzey beceriler edinen, doğrulanabilir sertifikalar kazanan ve Safi Ekosisteminde yükselen binlerce öğrenciye katılın.",
    'de': "Schließen Sie sich Tausenden von ambitionierten Studenten an, die erstklassige Fähigkeiten erwerben und verifizierbare Zertifikate erlangen.",
    'fr': "Rejoignez des milliers d'étudiants ambitieux dans le monde qui acquièrent des compétences d'élite et des certifications vérifiables.",
    'ar': "انضم إلى آلاف الطلاب الطموحين حول العالم الذين يكتسبون مهارات متقدمة ويحصلون على شهادات معتمدة في منظومة صافي.",
    'ur': "دنیا بھر کے ہزاروں پرعزم طلباء میں شامل ہوں جو اعلیٰ مہارتیں حاصل کر رہے ہیں اور باضابطہ اسناد کما رہے ہیں۔",
    'es': "Únete a miles de estudiantes ambiciosos en todo el mundo que están adquiriendo habilidades de élite y obteniendo certificaciones verificables.",
    'zh': "立即加入全球数万名胸怀远大的青年学者行列，掌握世界级前沿硬核实战技能，斩获国际防伪权威认证。",
    'hi': "दुनिया भर के हजारों महत्वाकांक्षी छात्रों से जुड़ें जो शीर्ष कौशल प्राप्त कर रहे हैं और सत्यापित प्रमाण पत्र अर्जित कर रहे हैं।",
    'it': "Unisciti a migliaia di studenti ambiziosi in tutto il mondo che acquisiscono competenze d'élite e ottengono certificazioni verificabili.",
    'pt': "Junte-se a milhares de estudantes ambiciosos em todo o mundo que estão a adquirir competências de elite e a obter certificações verificáveis.",
    'ja': "最先端のスキルを身につけ、国際的証明書を取得してサフィ・エコシステムで飛躍する受講生の輪に加わりましょう。",
    'ko': "전 세계 수만 명의 야심 찬 인재들과 함께 최상위 실무 기술을 습득하고 검증 가능한 국제 인증을 획득하세요.",
    'nl': "Sluit je aan bij duizenden ambitieuze studenten wereldwijd die elitevaardigheden verwerven en verifieerbare certificaten behalen.",
    'uz': "Yuqori malakali ko'nikmalarni egallayotgan va xalqaro sertifikatlarga ega bo'layotgan minglab talabalarga qo'shiling.",
    'id': "Bergabunglah dengan ribuan siswa ambisius di seluruh dunia yang memperoleh keahlian elit dan sertifikasi terverifikasi."
}

enrollAsStudent = {
    'en': "Enroll as a Student", 'fa': "ثبت‌نام و عضویت در آکادمی", 'ps': "په اکاډمۍ کې نوم لیکنه",
    'ru': "Поступить в академию", 'tr': "Öğrenci Olarak Kaydol", 'de': "Als Student einschreiben",
    'fr': "S'inscrire comme étudiant", 'ar': "التسجيل كطالب في الأكاديمية", 'ur': "بطور طالب علم داخلہ لیں",
    'es': "Inscribirse como Estudiante", 'zh': "立即注册并成为学员", 'hi': "छात्र के रूप में नामांकन करें",
    'it': "Iscriviti come Studente", 'pt': "Inscrever-se como Estudante", 'ja': "受講生として今すぐ登録",
    'ko': "수강생으로 등록하기", 'nl': "Inschrijven als student", 'uz': "Talaba sifatida ro'yxatdan o'tish", 'id': "Daftar sebagai Siswa"
}

applyAsInstructor = {
    'en': "Apply as Instructor", 'fa': "درخواست تدریس به عنوان استاد", 'ps': "د استادۍ غوښتنه وسپارئ",
    'ru': "Стать преподавателем", 'tr': "Eğitmen Olarak Başvur", 'de': "Als Dozent bewerben",
    'fr': "Postuler comme instructeur", 'ar': "التقديم كمحاضر في الأكاديمية", 'ur': "بطور استاد درخواست دیں",
    'es': "Postularse como Instructor", 'zh': "申请成为特聘导师", 'hi': "प्रशिक्षक के रूप में आवेदन करें",
    'it': "Candidati come Docente", 'pt': "Candidatar-se como Instrutor", 'ja': "特任講師として応募する",
    'ko': "교수진으로 지원하기", 'nl': "Aanmelden als instructeur", 'uz': "O'qituvchi sifatida ariza topshirish", 'id': "Lamar sebagai Instruktur"
}

# Write out Python helper to build JSON or TS
print("Helper data ready for AboutTranslation generation.")
