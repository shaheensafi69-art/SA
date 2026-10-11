# -*- coding: utf-8 -*-
from data_common import LOCALES

def get_sahel(loc):
    names = {
        'en': ('Sahel', 'Salem'), 'fa': ('ساحل', 'سالم'), 'ps': ('ساحل', 'سالم'),
        'ru': ('Сахель', 'Салем'), 'tr': ('Sahel', 'Salem'), 'de': ('Sahel', 'Salem'),
        'fr': ('Sahel', 'Salem'), 'ar': ('ساحل', 'سالم'), 'ur': ('ساحل', 'سالم'),
        'es': ('Sahel', 'Salem'), 'zh': ('萨赫尔', '萨利姆'), 'hi': ('साहेल', 'सालेम'),
        'it': ('Sahel', 'Salem'), 'pt': ('Sahel', 'Salem'), 'ja': ('サヘル', 'サレム'),
        'ko': ('사헬', '살렘'), 'nl': ('Sahel', 'Salem'), 'uz': ('Sohel', 'Salem'), 'id': ('Sahel', 'Salem')
    }
    first, last = names.get(loc, ('Sahel', 'Salem'))
    full = f"{first} {last}" if loc != 'zh' else f"{first}·{last}"

    roles = {
        'en': "Chief Executive Officer (CEO) & European Relations",
        'fa': "مدیرعامل (CEO) و مدیر روابط اروپایی",
        'ps': "اجرایوي رییس (CEO) او د اروپايي اړیکو مدیر",
        'ru': "Генеральный директор (CEO) и руководитель европейских связей",
        'tr': "İcra Kurulu Başkanı (CEO) ve Avrupa İlişkileri",
        'de': "Chief Executive Officer (CEO) & Europäische Beziehungen",
        'fr': "Directeur Général (CEO) & Relations Européennes",
        'ar': "الرئيس التنفيذي (CEO) والعلاقات الأوروبية",
        'ur': "چیف ایگزیکٹو آفیسر (سی ای او) اور یورپی تعلقات",
        'es': "Director Ejecutivo (CEO) y Relaciones Europeas",
        'zh': "首席执行官 (CEO) 兼欧洲事务关系负责人",
        'hi': "मुख्य कार्यकारी अधिकारी (सीईओ) और यूरोपीय संबंध",
        'it': "Chief Executive Officer (CEO) e Relazioni Europee",
        'pt': "Diretor Executivo (CEO) e Relações Europeias",
        'ja': "最高経営責任者 (CEO) 兼欧州渉外責任者",
        'ko': "최고 경영자 (CEO) 및 유럽 대외 협력 총괄",
        'nl': "Chief Executive Officer (CEO) & Europese Relaties",
        'uz': "Bosh ijrochi direktor (CEO) va Yevropa aloqalari rahbari",
        'id': "Chief Executive Officer (CEO) & Hubungan Eropa"
    }

    bios = {
        'en': "Chief Executive Officer of Safi Academy, European Relations Director & Cross-Border Academic Partnerships Lead.",
        'fa': "مدیرعامل آکادمی صافی، مدیر روابط اروپایی و راهبر شراکت‌های بین‌المللی دانشگاهی.",
        'ps': "د صافي اکاډمۍ اجرایوي رییس، د اروپايي اړیکو مدیر او د نړیوالو اکاډمیکو شراکتونو مشر.",
        'ru': "Генеральный директор Safi Academy, директор по европейским связям и академическим партнерствам.",
        'tr': "Safi Academy İcra Kurulu Başkanı, Avrupa İlişkileri Direktörü ve Uluslararası Akademik Ortaklıklar Lideri.",
        'de': "CEO der Safi Academy, Direktor für europäische Beziehungen & grenzüberschreitende akademische Partnerschaften.",
        'fr': "Directeur Général de Safi Academy, Directeur des Relations Européennes et Partenariats Académiques.",
        'ar': "الرئيس التنفيذي لأكاديمية صافي، مدير العلاقات الأوروبية وقائد الشراكات الأكاديمية الدولية.",
        'ur': "صافی اکیڈمی کے چیف ایگزیکٹو آفیسر، یورپی تعلقات کے ڈائریکٹر اور بین الاقوامی تعلیمی شراکت داری کے سربراہ۔",
        'es': "Director Ejecutivo de Safi Academy, Director de Relaciones Europeas y Alianzas Académicas Internacionales.",
        'zh': "萨菲学院首席执行官、欧洲事务关系总监兼跨境学术合作负责人。",
        'hi': "सफी अकादमी के मुख्य कार्यकारी अधिकारी, यूरोपीय संबंध निदेशक और सीमा पार शैक्षणिक साझेदारी प्रमुख।",
        'it': "Chief Executive Officer di Safi Academy, Direttore delle Relazioni Europee e Partnership Accademiche.",
        'pt': "Diretor Executivo da Safi Academy, Diretor de Relações Europeias e Parcerias Académicas Internacionais.",
        'ja': "サフィ・アカデミー最高経営責任者、欧州渉外ディレクター兼国境を越えた学術パートナーシップ責任者。",
        'ko': "사피 아카데미 최고 경영자(CEO), 유럽 대외 협력 디렉터 및 글로벌 학술 파트너십 총괄.",
        'nl': "CEO van Safi Academy, Directeur Europese Betrekkingen & Grensoverschrijdende Academische Partnerschappen.",
        'uz': "Safiy Academy bosh ijrochi direktori, Yevropa aloqalari direktori va xalqaro akademik hamkorlik rahbari.",
        'id': "Chief Executive Officer Safi Academy, Direktur Hubungan Eropa & Pemimpin Kemitraan Akademik Lintas Batas."
    }

    offices = {
        'en': "Executive Operations • Frankfurt / London", 'fa': "عملیات اجرایی • فرانکفورت / لندن", 'ps': "اجرایوي عملیات • فرانکفورت / لندن",
        'ru': "Исполнительные операции • Франкфурт / Лондон", 'tr': "Yönetici Operasyonları • Frankfurt / Londra", 'de': "Operative Führung • Frankfurt / London",
        'fr': "Opérations Exécutives • Francfort / Londres", 'ar': "العمليات التنفيذية • فرانكفورت / لندن", 'ur': "ایگزیکٹو آپریشنز • فرینکفرٹ / لندن",
        'es': "Operaciones Ejecutivas • Fráncfort / Londres", 'zh': "行政运营 • 法兰克福 / 伦敦", 'hi': "कार्यकारी संचालन • फ्रैंकफर्ट / लंदन",
        'it': "Operazioni Esecutive • Francoforte / Londra", 'pt': "Operações Executivas • Frankfurt / Londres", 'ja': "エグゼクティブ・オペレーション • フランクフルト / ロンドン",
        'ko': "운영 집무실 • 프랑크푸르트 / 런던", 'nl': "Uitvoerende Operaties • Frankfurt / Londen", 'uz': "Ijroiya operatsiyalari • Frankfurt / London",
        'id': "Operasi Eksekutif • Frankfurt / London"
    }

    coordinates = {
        'en': "Frankfurt, Germany & London, UK", 'fa': "فرانکفورت، آلمان و لندن، بریتانیا", 'ps': "فرانکفورت، جرمني او لندن، انګلستان",
        'ru': "Франкфурт, Германия и Лондон, Великобритания", 'tr': "Frankfurt, Almanya & Londra, Birleşik Krallık", 'de': "Frankfurt, Deutschland & London, UK",
        'fr': "Francfort, Allemagne & Londres, Royaume-Uni", 'ar': "فرانكفورت، ألمانيا ولندن، المملكة المتحدة", 'ur': "فرینکفرٹ، جرمنی اور لندن، برطانیہ",
        'es': "Fráncfort, Alemania y Londres, Reino Unido", 'zh': "德国法兰克福与英国伦敦", 'hi': "फ्रैंकफर्ट, जर्मनी और लंदन, यूके",
        'it': "Francoforte, Germania e Londra, Regno Unito", 'pt': "Frankfurt, Alemanha e Londres, Reino Unido", 'ja': "ドイツ・フランクフルト＆英国ロンドン",
        'ko': "독일 프랑크푸르트 및 영국 런던", 'nl': "Frankfurt, Duitsland & Londen, VK", 'uz': "Frankfurt, Germaniya va London, Buyuk Britaniya",
        'id': "Frankfurt, Jerman & London, Inggris Raya"
    }

    badgeCEOs = {
        'en': "Chief Executive Officer (CEO)", 'fa': "مدیرعامل (CEO)", 'ps': "اجرایوي رییس (CEO)",
        'ru': "Генеральный директор (CEO)", 'tr': "İcra Kurulu Başkanı (CEO)", 'de': "Chief Executive Officer (CEO)",
        'fr': "Directeur Général (CEO)", 'ar': "الرئيس التنفيذي (CEO)", 'ur': "چیف ایگزیکٹو آفیسر (سی ای او)",
        'es': "Director Ejecutivo (CEO)", 'zh': "首席执行官 (CEO)", 'hi': "मुख्य कार्यकारी अधिकारी (सीईओ)",
        'it': "Chief Executive Officer (CEO)", 'pt': "Diretor Executivo (CEO)", 'ja': "最高経営責任者 (CEO)",
        'ko': "최고 경영자 (CEO)", 'nl': "Chief Executive Officer (CEO)", 'uz': "Bosh ijrochi direktor (CEO)",
        'id': "Chief Executive Officer (CEO)"
    }

    badgeEuros = {
        'en': "European Relations", 'fa': "روابط اروپایی", 'ps': "اروپايي اړیکې",
        'ru': "Европейские связи", 'tr': "Avrupa İlişkileri", 'de': "Europäische Beziehungen",
        'fr': "Relations Européennes", 'ar': "العلاقات الأوروبية", 'ur': "یورپی تعلقات",
        'es': "Relaciones Europeas", 'zh': "欧洲关系事务", 'hi': "यूरोपीय संबंध",
        'it': "Relazioni Europee", 'pt': "Relações Europeias", 'ja': "欧州渉外",
        'ko': "유럽 대외 협력", 'nl': "Europese Betrekkingen", 'uz': "Yevropa aloqalari", 'id': "Hubungan Eropa"
    }

    manifestoTitles = {
        'en': "Global Vision & European Integration Manifesto",
        'fa': "چشم‌انداز جهانی و بیانیه پیوند با بازارهای اروپا",
        'ps': "نړیوال لید او د اروپا له بازارونو سره د یوځای کیدو اعلامیه",
        'ru': "Глобальное видение и манифест европейской интеграции",
        'tr': "Küresel Vizyon ve Avrupa Entegrasyonu Manifestosu",
        'de': "Globale Vision & Manifest der europäischen Integration",
        'fr': "Vision Globale & Manifeste d'Intégration Européenne",
        'ar': "الرؤية العالمية وبيان الاندماج الأوروبي",
        'ur': "عالمی وژن اور یورپی انضمام کا منشور",
        'es': "Visión Global y Manifiesto de Integración Europea",
        'zh': "全球愿景与欧洲融合战略宣言",
        'hi': "वैश्विक दृष्टिकोण और यूरोपीय एकीकरण घोषणापत्र",
        'it': "Visione Globale e Manifesto di Integrazione Europea",
        'pt': "Visão Global e Manifesto de Integração Europeia",
        'ja': "グローバルビジョン＆欧州統合マニフェスト",
        'ko': "글로벌 비전 및 유럽 통합 선언문",
        'nl': "Wereldwijde Visie & Europees Integratiemanifest",
        'uz': "Global qarash va Yevropa integratsiyasi manifesti",
        'id': "Visi Global & Manifes Integrasi Eropa"
    }

    quotes = {
        'en': "\"Education without global mobility is a half-opened door. Our imperative is to ensure that every student's effort is recognized directly in the economic hubs of Europe and beyond.\"",
        'fa': "«آموزش بدون دسترسی به بازارهای جهانی، دری نیمه‌باز است. رسالت ما این است که تلاش و استعداد هر دانش‌آموخته مستقیماً در قطب‌های اقتصادی اروپا و جهان به رسمیت شناخته شود.»",
        'ps': "«له نړیوال لاسرسي پرته زده کړه نیمه پرانیستې دروازه ده. زموږ موخه دا ده چې د هر محصل هڅې په مستقیم ډول د اروپا او نړۍ په اقتصادي مرکزونو کې ومنل شي.»",
        'ru': "«Образование без глобальной мобильности — это полуоткрытая дверь. Наша цель — сделать так, чтобы достижения каждого студента признавались напрямую в экономических центрах Европы и мира.»",
        'tr': "\"Küresel hareketlilik olmadan eğitim yarı açık bir kapıdır. Amacımız, her öğrencinin emeğinin Avrupa'nın ve dünyanın ekonomik merkezlerinde doğrudan karşılık bulmasını sağlamaktır.\"",
        'de': "„Bildung ohne globale Mobilität ist eine halb geöffnete Tür. Unser Ziel ist es, sicherzustellen, dass die Leistung jedes Absolventen direkt in den Wirtschaftszentren Europas anerkannt wird.“",
        'fr': "« L'éducation sans mobilité mondiale est une porte entrouverte. Notre mission est de garantir que le travail de chaque étudiant soit directement reconnu dans les centres économiques d'Europe. »",
        'ar': "«إن التعليم دون إمكانية الوصول إلى الأسواق العالمية هو باب نصف مفتوح. هدفنا هو ضمان الاعتراف المباشر بجهود كل طالب في المراكز الاقتصادية في أوروبا وخارجها.»",
        'ur': "«عالمی نقل و حرکت کے بغیر تعلیم ایک آدھا کھلا دروازہ ہے۔ ہمارا فرض ہے کہ ہر طالب علم کی محنت کو یورپ اور اس سے آگے کے اقتصادی مراکز میں براہ راست تسلیم کیا جائے۔»",
        'es': "«La educación sin movilidad global es una puerta entreabierta. Nuestro imperativo es asegurar que el esfuerzo de cada estudiante sea reconocido directamente en los centros económicos de Europa.»",
        'zh': "“缺乏全球流动性的教育只是一扇半开的门。我们的使命是确保每位学子的努力都能直接获得欧洲及全球经济中心的认可与对接。”",
        'hi': "«वैश्विक गतिशीलता के बिना शिक्षा आधा खुला दरवाजा है। हमारा अनिवार्य उद्देश्य यह सुनिश्चित करना है कि प्रत्येक छात्र के प्रयास को यूरोप और उससे परे के आर्थिक केंद्रों में सीधे मान्यता मिले।»",
        'it': "«L'istruzione senza mobilità globale è una porta socchiusa. Il nostro imperativo è garantire che l'impegno di ogni studente sia riconosciuto direttamente nei centri economici europei.»",
        'pt': "«A educação sem mobilidade global é uma porta entreaberta. O nosso imperativo é assegurar que o esforço de cada estudante seja reconhecido diretamente nos centros económicos da Europa.»",
        'ja': "「グローバルな流動性を伴わない教育は、半分しか開いていない扉です。すべての学生の努力が欧州をはじめとする世界の経済拠点において直接評価されることを目指しています。」",
        'ko': "\"글로벌 이동성이 없는 교육은 반쯤 열린 문과 같습니다. 우리는 모든 학생의 노력이 유럽과 글로벌 경제 허브에서 직접 인정받을 수 있도록 최선을 다하고 있습니다.\"",
        'nl': "„Onderwijs zonder wereldwijde mobiliteit is een halfopen deur. Ons doel is ervoor te zorgen dat de inzet van elke student direct wordt erkend in de economische centra van Europa en daarbuiten.”",
        'uz': "«Global harakatchanliksiz ta'lim yarim ochiq eshikdir. Bizning vazifamiz har bir talabaning mehnati Yevropa va dunyoning iqtisodiy markazlarida bevosita tan olinishini ta'minlashdir.»",
        'id': "«Pendidikan tanpa mobilitas global adalah pintu yang setengah terbuka. Keharusan kami adalah memastikan bahwa upaya setiap siswa diakui secara langsung di pusat-pusat ekonomi Eropa dan sekitarnya.»"
    }

    quoteLocations = {
        'en': f"— {full} • CEO & European Relations",
        'fa': f"— {full} • مدیرعامل و مدیر روابط اروپایی",
        'ps': f"— {full} • اجرایوي رییس او د اروپايي اړیکو مدیر",
        'ru': f"— {full} • Генеральный директор и руководитель европейских связей",
        'tr': f"— {full} • CEO & Avrupa İlişkileri",
        'de': f"— {full} • CEO & Europäische Beziehungen",
        'fr': f"— {full} • CEO & Relations Européennes",
        'ar': f"— {full} • الرئيس التنفيذي والعلاقات الأوروبية",
        'ur': f"— {full} • سی ای او اور یورپی تعلقات",
        'es': f"— {full} • CEO y Relaciones Europeas",
        'zh': f"— {full} • 首席执行官兼欧洲事务关系负责人",
        'hi': f"— {full} • सीईओ और यूरोपीय संबंध",
        'it': f"— {full} • CEO e Relazioni Europee",
        'pt': f"— {full} • CEO e Relações Europeias",
        'ja': f"— {full} • CEO兼欧州渉外責任者",
        'ko': f"— {full} • CEO & 유럽 대외 협력 총괄",
        'nl': f"— {full} • CEO & Europese Relaties",
        'uz': f"— {full} • CEO va Yevropa aloqalari rahbari",
        'id': f"— {full} • CEO & Hubungan Eropa"
    }

    pillarsBadges = {
        'en': "Global Strategy", 'fa': "راهبرد جهانی", 'ps': "نړیواله تګلاره",
        'ru': "Глобальная стратегия", 'tr': "Küresel Strateji", 'de': "Globale Strategie",
        'fr': "Stratégie Mondiale", 'ar': "الاستراتيجية العالمية", 'ur': "عالمی حکمت عملی",
        'es': "Estrategia Global", 'zh': "全球战略布局", 'hi': "वैश्विक रणनीति",
        'it': "Strategia Globale", 'pt': "Estratégia Global", 'ja': "グローバル戦略",
        'ko': "글로벌 전략", 'nl': "Wereldwijde Strategie", 'uz': "Global strategiya", 'id': "Strategi Global"
    }

    pillarsTitles = {
        'en': "International Expansion Pillars", 'fa': "ارکان گسترش بین‌المللی", 'ps': "د نړیوالې پراختیا ستنې",
        'ru': "Столпы международной экспансии", 'tr': "Uluslararası Genişleme İlkeleri", 'de': "Säulen der internationalen Expansion",
        'fr': "Piliers d'Expansion Internationale", 'ar': "ركائز التوسع الدولي", 'ur': "بین الاقوامی توسیع کے بنیادی ستون",
        'es': "Pilares de Expansión Internacional", 'zh': "国际业务拓展核心支柱", 'hi': "अंतर्राष्ट्रीय विस्तार के मुख्य स्तंभ",
        'it': "Pilastri di Espansione Internazionale", 'pt': "Pilares de Expansão Internacional", 'ja': "国際展開の基盤ピラー",
        'ko': "국제 확장 핵심 기둥", 'nl': "Pijlers van Internationale Expansie", 'uz': "Xalqaro kengayish ustunlari", 'id': "Pilar Ekspansi Internasional"
    }

    p1Titles = {
        'en': "EU Banking Corridors", 'fa': "کانال‌های بانکی اتحادیه اروپا", 'ps': "د اروپايي ټولنې بانکي دهلیزونه",
        'ru': "Банковские коридоры ЕС", 'tr': "AB Bankacılık Koridorları", 'de': "EU-Bankkorridore",
        'fr': "Couloirs Bancaires de l'UE", 'ar': "الممرات المصرفية للاتحاد الأوروبي", 'ur': "یورپی یونین کے بینکنگ کوریڈورز",
        'es': "Corredores Bancarios de la UE", 'zh': "欧盟银行清算走廊", 'hi': "यूरोपीय संघ बैंकिंग गलियारे",
        'it': "Corridoi Bancari UE", 'pt': "Corredores Bancários da UE", 'ja': "EU銀行決済コリドー",
        'ko': "EU 뱅킹 결제 회랑", 'nl': "EU-Bankcorridors", 'uz': "Yevropa Ittifoqi bank koridorlari", 'id': "Koridor Perbankan UE"
    }

    p1Descs = {
        'en': "Establishing direct connections with tier-1 European financial institutions to provide Afghan expatriates with dedicated, compliant IBAN settlement services.",
        'fa': "برقراری ارتباط مستقیم با نهادهای مالی رده‌اول اروپا جهت ارائه خدمات تسویه حساب و شماره شبا (IBAN) منطبق با مقررات برای مهاجران افغان.",
        'ps': "د لومړۍ درجې اروپايي مالي بنسټونو سره د مستقیمو اړیکو جوړول ترڅو افغان مسافرو ته قانوني او اختصاصي د IBAN حسابونو خدمتونه وړاندې کړي.",
        'ru': "Установление прямых связей с ведущими европейскими финансовыми институтами для предоставления афганским экспатриантам услуг по открытию счетов IBAN.",
        'tr': "Afgan gurbetçilere özel, mevzuata uygun IBAN ödeme hizmetleri sunmak için birinci sınıf Avrupa finans kuruluşlarıyla doğrudan bağlantılar kurmak.",
        'de': "Aufbau direkter Verbindungen zu europäischen Tier-1-Finanzinstituten, um afghanischen Expatriates dedizierte, konforme IBAN-Abwicklungsdienste bereitzustellen.",
        'fr': "Établissement de connexions directes avec des institutions financières européennes de premier plan pour fournir aux expatriés afghans des services de règlement IBAN conformes.",
        'ar': "إقامة روابط مباشرة مع المؤسسات المالية الأوروبية الكبرى لتزويد المغتربين الأفغان بخدمات تسوية وتوليد حسابات IBAN معتمدة.",
        'ur': "افغان تارکین وطن کو وقف اور قانونی IBAN تصفیہ کی خدمات فراہم کرنے کے لیے صف اول کے یورپی مالیاتی اداروں سے براہ راست رابطے۔",
        'es': "Establecimiento de conexiones directas con entidades financieras europeas de primer nivel para proporcionar a los expatriados afganos servicios de liquidación IBAN dedicados y conformes.",
        'zh': "与欧洲一级顶级金融机构建立直接通道，为海外阿富汗侨民提供合规的专属欧洲IBAN账户与清算结算服务。",
        'hi': "अफगान प्रवासियों को समर्पित, अनुपालन IBAN निपटान सेवाएं प्रदान करने के लिए शीर्ष-स्तरीय यूरोपीय वित्तीय संस्थानों के साथ सीधे संबंध स्थापित करना।",
        'it': "Creazione di connessioni dirette con istituti finanziari europei di primo livello per fornire agli espatriati afghani servizi di regolamento IBAN dedicati.",
        'pt': "Estabelecimento de ligações diretas com instituições financeiras europeias de topo para fornecer aos expatriados afegãos serviços dedicados de liquidação IBAN.",
        'ja': "アフガニスタン出身の在外居住者に向け、ティア1欧州金融機関との直接接続による準拠IBAN決済口座サービスを提供。",
        'ko': "재외 아프간인들에게 규정을 준수하는 전용 IBAN 결제 서비스를 제공하기 위해 유럽 1등급 금융 기관들과 직접 파트너십 구축.",
        'nl': "Opzetten van directe verbindingen met toonaangevende Europese financiële instellingen om Afghaanse expats conforme IBAN-vereffeningsdiensten te bieden.",
        'uz': "Afg'on muhojirlariga maxsus va qonuniy IBAN hisob-kitob xizmatlarini taqdim etish uchun Yevropaning yetakchi moliya institutlari bilan to'g'ridan-to'g'ri aloqalar o'rnatish.",
        'id': "Membangun koneksi langsung dengan lembaga keuangan tingkat atas Eropa untuk menyediakan layanan penyelesaian IBAN yang patuh bagi para ekspatriat Afghanistan."
    }

    p2Titles = {
        'en': "SEPA Instant Rails", 'fa': "سیستم تسویه آنی SEPA", 'ps': "د SEPA چټکې راکړې ورکړې",
        'ru': "Мгновенные переводы SEPA", 'tr': "SEPA Anlık Ödeme Ağları", 'de': "SEPA Instant Rails",
        'fr': "Réseaux SEPA Instantanés", 'ar': "قنوات SEPA الفورية", 'ur': "سیپا انسٹنٹ ادائیگی کا نیٹ ورک",
        'es': "Redes SEPA Instantáneas", 'zh': "SEPA即时跨行清算网络", 'hi': "SEPA त्वरित भुगतान नेटवर्क",
        'it': "Canali SEPA Instant", 'pt': "Redes Instantâneas SEPA", 'ja': "SEPA即時決済レール",
        'ko': "SEPA 인스턴트 결제망", 'nl': "SEPA Instant Rails", 'uz': "SEPA lahzalik to'lov tizimi", 'id': "Jaringan Instan SEPA"
    }

    p2Descs = {
        'en': "Architecting sub-second transaction routing across 36 SEPA member states, eliminating predatory transfer fees and archaic multi-day delays.",
        'fa': "طراحی مسیرهای پردازش تراکنش زیر یک ثانیه در سراسر ۳۶ کشور عضو SEPA، حذف کارمزدهای ناعادلانه و پایان دادن به تأخیرهای چندروزه سنتی.",
        'ps': "په ۳۶ SEPA غړو هیوادونو کې له یوې ثانیې په کمه موده کې د راکړو ورکړو مدیریت، د ظالمانه فیسونو او څو ورځنیو ځنډونو پای ته رسول.",
        'ru': "Разработка субсекундной маршрутизации транзакций в 36 странах-членах SEPA, устранение завышенных комиссий и многодневных задержек.",
        'tr': "36 SEPA üye ülkesinde saniyenin altında işlem yönlendirmesi tasarlayarak haksız komisyonları ve günlerce süren gecikmeleri ortadan kaldırmak.",
        'de': "Architektur von Subsekunden-Transaktionsrouting in 36 SEPA-Mitgliedstaaten zur Beseitigung überhöhter Gebühren und tagelanger Verzögerungen.",
        'fr': "Conception d'un routage de transactions en moins d'une seconde à travers 36 pays membres de SEPA, éliminant les frais excessifs et les retards.",
        'ar': "تصميم بنية توجيه المعاملات في أجزاء من الثانية عبر 36 دولة عضو في SEPA، مما يقضي على الرسوم المفرطة والتأخيرات المصرفية الطويلة.",
        'ur': "36 سیپا رکن ممالک میں سیکنڈ کے حصے میں رقوم کی منتقلی کا نظام، زیادہ فیسوں اور کئی دنوں کی تاخیر کا خاتمہ۔",
        'es': "Arquitectura de enrutamiento de transacciones en menos de un segundo en 36 estados miembros de SEPA, eliminando comisiones abusivas y demoras de días.",
        'zh': "在36个SEPA成员国间构建亚秒级资金结算路由，彻底消除掠夺性高昂汇款手续费和长达数天的跨境延迟。",
        'hi': "36 SEPA सदस्य देशों में उप-सेकंड लेनदेन रूटिंग की रूपरेखा तैयार करना, अत्यधिक हस्तांतरण शुल्क और कई दिनों की देरी को समाप्त करना।",
        'it': "Progettazione dell'instradamento delle transazioni in frazioni di secondo in 36 paesi membri SEPA, eliminando commissioni predatorie e ritardi di più giorni.",
        'pt': "Conceção do encaminhamento de transações em frações de segundo em 36 países membros da SEPA, eliminando taxas abusivas e atrasos de dias.",
        'ja': "SEPA加盟36カ国にまたがるミリ秒単位のトランザクションルーティングを構築し、法外な手数料と数日間のタイムラグを排除。",
        'ko': "36개 SEPA 회원국 전역에서 1초 미만의 거래 라우팅을 설계하여 과도한 송금 수수료와 며칠씩 걸리는 지연을 제거.",
        'nl': "Ontwerpen van transactierouting van minder dan een seconde in 36 SEPA-lidstaten, waardoor onevenredige kosten en meerdaagse vertragingen verdwijnen.",
        'uz': "36 ta SEPA a'zo davlatlarida soniyadan kam vaqt ichida tranzaksiyalarni yo'naltirish, ortiqcha to'lovlar va ko'p kunlik kechikishlarni bartaraf etish.",
        'id': "Merancang perutean transaksi sub-detik di 36 negara anggota SEPA, menghapus biaya transfer predator dan penundaan berhari-hari."
    }

    p3Titles = {
        'en': "Global Compliance", 'fa': "انطباق و قانون‌مداری جهانی", 'ps': "نړیوال قانوني انطباق",
        'ru': "Глобальный комплаенс", 'tr': "Küresel Uyum ve Denetim", 'de': "Globale Compliance",
        'fr': "Conformité Mondiale", 'ar': "الامتثال والرقابة العالمية", 'ur': "عالمی تعمیل اور ضوابط",
        'es': "Cumplimiento Normativo Global", 'zh': "全球金融合规与反洗钱监管", 'hi': "वैश्विक अनुपालन",
        'it': "Conformità Globale", 'pt': "Conformidade Global", 'ja': "グローバル・コンプライアンス",
        'ko': "글로벌 규제 준수 (컴플라이언스)", 'nl': "Wereldwijde Compliance", 'uz': "Global muvofiqlik", 'id': "Kepatuhan Global"
    }

    p3Descs = {
        'en': "Overseeing rigorous Anti-Money Laundering (AML) standards, Know-Your-Customer (KYC) telemetry, and adherence to international financial regulations.",
        'fa': "نظارت بر بالاترین استانداردهای ضد پولشویی (AML)، احراز هویت دقیق کاربران (KYC) و پایبندی کامل به مقررات مالی بین‌المللی.",
        'ps': "د پیسو مینځلو ضد (AML) سخت معیارونه، د پیرودونکي پیژندنې (KYC) سیسټمونه، او د نړیوالو مالي مقرراتو پوره څارنه.",
        'ru': "Контроль строгих стандартов борьбы с отмыванием денег (AML), верификации клиентов (KYC) и соблюдения международных финансовых норм.",
        'tr': "Sıkı Kara Para Aklamanın Önlenmesi (AML) standartlarını, Müşterini Tanı (KYC) süreçlerini ve uluslararası finansal düzenlemeleri denetlemek.",
        'de': "Überwachung strenger Anti-Geldwäsche-Standards (AML), KYC-Verfahren und Einhaltung internationaler Finanzvorschriften.",
        'fr': "Surveillance des normes strictes de lutte contre le blanchiment (LCB/AML), des protocoles KYC et du respect des réglementations financières internationales.",
        'ar': "الإشراف على المعايير الصارمة لمكافحة غسل الأموال (AML)، والتحقق من العملاء (KYC)، والامتثال للأنظمة المالية الدولية.",
        'ur': "منی لانڈرنگ کی روک تھام (AML) کے سخت معیارات، اپنے صارف کو جانیں (KYC)، اور بین الاقوامی مالیاتی ضوابط کی مکمل نگرانی۔",
        'es': "Supervisión de estrictos estándares contra el lavado de dinero (AML), telemetría Conozca a su Cliente (KYC) y cumplimiento de regulaciones financieras internacionales.",
        'zh': "严格执行反洗钱（AML）国际标准、了解你的客户（KYC）数字身份风控遥测及全流程合规性监管。",
        'hi': "कड़े एंटी-मनी लॉन्ड्रिंग (एएमएल) मानकों, नो-योर-कस्टमर (केवाईसी) टेलीमेट्री और अंतरराष्ट्रीय वित्तीय नियमों के पालन की निगरानी करना।",
        'it': "Supervisione dei rigorosi standard antiriciclaggio (AML), telemetria Know-Your-Customer (KYC) e conformità alle normative finanziarie internazionali.",
        'pt': "Supervisão de rigorosos padrões de combate ao branqueamento de capitais (AML), telemetria KYC e conformidade com os regulamentos financeiros internacionais.",
        'ja': "厳格なマネーロンダリング防止（AML）基準、本人確認（KYC）テレメトリ、および国際金融規制の徹底的な遵守を統括。",
        'ko': "엄격한 자금세탁방지(AML) 표준, 고객확인제도(KYC) 텔레메트리 및 국제 금융 규제 준수를 총괄 감독.",
        'nl': "Toezicht houden op strikte anti-witwasnormen (AML), KYC-procedures en naleving van internationale financiële regelgeving.",
        'uz': "Pul yuvishga qarshi qat'iy standartlar (AML), mijozni aniqlash tizimi (KYC) va xalqaro moliya qoidalariga rioya etilishini nazorat qilish.",
        'id': "Mengawasi standar Anti-Pencucian Uang (AML) yang ketat, telemetri Kenali-Nasabah-Anda (KYC), dan kepatuhan terhadap regulasi keuangan internasional."
    }

    pedigreeTitles = {
        'en': "Academic Pedigree", 'fa': "پیشینه و سوابق دانشگاهی", 'ps': "اکاډمیک شالید او اسناد",
        'ru': "Академическая подготовка", 'tr': "Akademik Geçmiş", 'de': "Akademischer Werdegang",
        'fr': "Parcours Académique", 'ar': "المسار الأكاديمي والمؤهلات", 'ur': "تعلیمی پس منظر اور اسناد",
        'es': "Trayectoria Académica", 'zh': "学术教育背景与专业认证", 'hi': "शैक्षणिक पृष्ठभूमि",
        'it': "Percorso Accademico", 'pt': "Formação Académica", 'ja': "学術的バックグラウンド",
        'ko': "학력 및 전문 인증", 'nl': "Academische Achtergrond", 'uz': "Akademik malaka", 'id': "Latar Belakang Akademik"
    }

    edu1Titles = {
        'en': "BBA Student (Bachelor of Business Administration)",
        'fa': "دانشجوی مدیریت کسب‌وکار (BBA)",
        'ps': "د سوداګرۍ ادارې او منجمنټ محصل (BBA)",
        'ru': "Студент программы BBA (Бакалавриат делового администрирования)",
        'tr': "BBA Öğrencisi (İşletme Lisans Programı)",
        'de': "BBA-Student (Bachelor of Business Administration)",
        'fr': "Étudiant en BBA (Bachelor en Administration des Affaires)",
        'ar': "طالب بكالوريوس في إدارة الأعمال (BBA)",
        'ur': "بی بی اے کے طالب علم (بیچلر آف بزنس ایڈمنسٹریشن)",
        'es': "Estudiante de BBA (Licenciatura en Administración de Empresas)",
        'zh': "工商管理学士（BBA）攻读者",
        'hi': "बीबीए छात्र (बैचलर ऑफ बिजनेस एडमिनिस्ट्रेशन)",
        'it': "Studente BBA (Laurea in Economia Aziendale)",
        'pt': "Estudante de BBA (Licenciatura em Gestão de Empresas)",
        'ja': "経営学士（BBA: Bachelor of Business Administration）在籍",
        'ko': "경영학사(BBA) 과정 재학",
        'nl': "BBA-student (Bachelor of Business Administration)",
        'uz': "BBA talabasi (Biznes boshqaruvi bakalavri)",
        'id': "Mahasiswa BBA (Sarjana Administrasi Bisnis)"
    }

    edu1Subtitles = {
        'en': "Business Administration & Management Candidate",
        'fa': "کاندیدای مدیریت کسب‌وکار و راهبری سازمانی",
        'ps': "د سوداګرۍ ادارې او مشرتابه کاندید",
        'ru': "Специализация: деловое администрирование и менеджмент",
        'tr': "İşletme Yönetimi ve Organizasyon Uzmanlığı",
        'de': "Kandidat für Betriebswirtschaft & Unternehmensführung",
        'fr': "Candidat en Administration des Affaires & Gestion",
        'ar': "مرشح في إدارة الأعمال والقيادة التنفيذية",
        'ur': "بزنس ایڈمنسٹریشن اور مینجمنٹ امیدوار",
        'es': "Candidato en Administración y Dirección de Empresas",
        'zh': "企业管理、跨国并购与国际商业扩张方向",
        'hi': "बिजनेस एडमिनिस्ट्रेशन और प्रबंधन उम्मीदवार",
        'it': "Candidato in Economia e Gestione Aziendale",
        'pt': "Candidato em Administração e Gestão de Empresas",
        'ja': "企業経営・組織戦略・国際商業展開専攻",
        'ko': "기업 경영 및 전략적 리더십 전공",
        'nl': "Kandidaat Bedrijfskunde & Management",
        'uz': "Biznes boshqaruvi va korporativ yetakchilik yo'nalishi",
        'id': "Kandidat Administrasi Bisnis & Manajemen"
    }

    edu1Descs = {
        'en': "Higher education program focused on multinational enterprise administration, micro-organizational behavior, financial accounting, strategic leadership, and international commercial expansion.",
        'fa': "برنامه آموزش عالی متمرکز بر مدیریت شرکت‌های چندملیتی، رفتار سازمانی، حسابداری مالی، رهبری استراتژیک و توسعه بازرگانی بین‌المللی.",
        'ps': "د لوړو زده کړو پروګرام چې د څو ملي شرکتونو په اداره، مالي حسابدارۍ، ستراتیژیک مشرتابه او نړیوال تجارت تمرکز لري.",
        'ru': "Программа высшего образования, сфокусированная на управлении транснациональными корпорациями, финансовом учете, стратегическом лидерстве и глобальной экспансии.",
        'tr': "Çok uluslu işletme yönetimi, kurumsal davranış, finansal muhasebe, stratejik liderlik ve uluslararası ticari genişlemeye odaklanan yüksek öğrenim programı.",
        'de': "Hochschulprogramm mit Schwerpunkt auf multinationaler Unternehmensführung, Finanzbuchhaltung, strategischer Führung und internationaler Expansion.",
        'fr': "Programme axé sur l'administration des entreprises multinationales, la comptabilité financière, le leadership stratégique et le développement international.",
        'ar': "برنامج تعليمي عالٍ يركز على إدارة الشركات متعددة الجنسيات، والمحاسبة المالية، والقيادة الاستراتيجية، والتوسع التجاري الدولي.",
        'ur': "کثیر القومی کاروباری اداروں کے انتظام، مالیاتی اکاؤنٹنگ، اسٹریٹجک قیادت، اور بین الاقوامی تجارتی توسیع پر مرکوز اعلیٰ تعلیمی پروگرام۔",
        'es': "Programa de educación superior enfocado en administración de empresas multinacionales, contabilidad financiera, liderazgo estratégico y expansión comercial internacional.",
        'zh': "聚焦于跨国跨行业集团行政管控、财务分析、企业微观行为学、战略决策与跨国贸易版图扩张的高等商业教育项目。",
        'hi': "बहुराष्ट्रीय उद्यम प्रशासन, वित्तीय लेखांकन, रणनीतिक नेतृत्व और अंतर्राष्ट्रीय वाणिज्यिक विस्तार पर केंद्रित उच्च शिक्षा कार्यक्रम।",
        'it': "Programma di istruzione superiore incentrato sull'amministrazione di imprese multinazionali, contabilità finanziaria, leadership strategica ed espansione commerciale.",
        'pt': "Programa de ensino superior focado na administração de empresas multinacionais, contabilidade financeira, liderança estratégica e expansão comercial internacional.",
        'ja': "多国籍企業マネジメント、財務会計、戦略的リーダーシップ、国際商業展開に重点を置いた高等教育プログラム。",
        'ko': "다국적 기업 경영 관리, 재무 회계, 전략적 리더십 및 글로벌 통상 확장에 중점을 둔 고등 교육 과정.",
        'nl': "Hogeronderwijsprogramma gericht op multinationaal ondernemingsbestuur, financiële administratie, strategisch leiderschap en internationale expansie.",
        'uz': "Ko'pmillatli korxonalarni boshqarish, moliyaviy hisob, strategik yetakchilik va xalqaro savdo kengayishiga yo'naltirilgan oliy ta'lim dasturi.",
        'id': "Program pendidikan tinggi yang berfokus pada administrasi perusahaan multinasional, akuntansi keuangan, kepemimpinan strategis, dan ekspansi komersial internasional."
    }

    edu2Titles = {
        'en': "Fintech Governance & Compliance Studies",
        'fa': "مطالعات راهبری فین‌تک و انطباق بانکی",
        'ps': "د فین‌ټیک حکومتولۍ او بانکي انطباق زده کړې",
        'ru': "Исследования финтех-управления и комплаенса",
        'tr': "Fintek Yönetişimi ve Uyum Çalışmaları",
        'de': "Fintech-Governance- & Compliance-Studien",
        'fr': "Gouvernance Fintech & Études de Conformité",
        'ar': "دراسات حوكمة التكنولوجيا المالية والامتثال",
        'ur': "فن ٹیک گورننس اور تعمیل کے مطالعات",
        'es': "Estudios de Gobernanza Fintech y Cumplimiento",
        'zh': "金融科技（Fintech）管治与泛欧合规专题研究",
        'hi': "फिनटेक शासन और अनुपालन अध्ययन",
        'it': "Studi di Governance Fintech e Conformità",
        'pt': "Estudos de Governança Fintech e Conformidade",
        'ja': "フィンテック・ガバナンス＆コンプライアンス研究",
        'ko': "핀테크 거버넌스 및 금융 규제 준수 연구",
        'nl': "Fintech Governance & Compliance Studies",
        'uz': "Fintek boshqaruvi va muvofiqlik bo'yicha tadqiqotlar",
        'id': "Studi Tata Kelola & Kepatuhan Fintech"
    }

    edu2Subtitles = {
        'en': "Executive Training (2025 - Present)",
        'fa': "آموزش‌های تخصصی اجرایی (۲۰۲۵ - اکنون)",
        'ps': "تخصصي اجرایوي روزنې (۲۰۲۵ - تر اوسه)",
        'ru': "Профессиональная подготовка (2025 - по наст. вр.)",
        'tr': "Yönetici Eğitimi (2025 - Günümüz)",
        'de': "Führungskräftetraining (2025 - heute)",
        'fr': "Formation Exécutive (2025 - Présent)",
        'ar': "تدريب تنفيذي متخصص (2025 - حتى الآن)",
        'ur': "ایگزیکٹو ٹریننگ (2025 - تاحال)",
        'es': "Formación Ejecutiva (2025 - Presente)",
        'zh': "高级行政研修课程（2025年 - 至今）",
        'hi': "कार्यकारी प्रशिक्षण (2025 - वर्तमान)",
        'it': "Formazione Esecutiva (2025 - Presente)",
        'pt': "Formação Executiva (2025 - Presente)",
        'ja': "エグゼクティブ・トレーニング（2025年〜現在）",
        'ko': "최고경영자 전문 트레이닝 (2025 - 현재)",
        'nl': "Executive Training (2025 - heden)",
        'uz': "Ijrochi tayyorgarlik (2025 - hozirgi vaqt)",
        'id': "Pelatihan Eksekutif (2025 - Sekarang)"
    }

    edu2Descs = {
        'en': "Specialized coursework in SEPA credit transfers, cross-border payment protocols, and digital payment infrastructure security.",
        'fa': "دوره‌های تخصصی در زمینه انتقالات اعتباری SEPA، پروتکل‌های پرداخت فرامرزی و امنیت زیرساخت پرداخت‌های دیجیتال.",
        'ps': "د SEPA کریډیټ لیږدونو، د پولو هاخوا تادیاتو او د ډیجیټل پیسو زیربنا امنیت کې ځانګړي کورسونه.",
        'ru': "Специализированные курсы по переводам SEPA, протоколам трансграничных платежей и безопасности цифровой инфраструктуры.",
        'tr': "SEPA kredi transferleri, sınır ötesi ödeme protokolleri ve dijital ödeme altyapı güvenliği üzerine uzmanlık dersleri.",
        'de': "Spezialisierte Schulungen zu SEPA-Überweisungen, grenzüberschreitenden Zahlungsprotokollen und digitaler Infrastruktursicherheit.",
        'fr': "Formations spécialisées sur les virements SEPA, les protocoles de paiement transfrontaliers et la sécurité des infrastructures de paiement.",
        'ar': "دورات متخصصة في التحويلات الائتمانية SEPA، وبروتوكولات الدفع عبر الحدود، وأمن البنية التحتية للمدفوعات الرقمية.",
        'ur': "سیپا کریڈٹ ٹرانسفر، سرحد پار ادائیگی کے پروٹوکول، اور ڈیجیٹل ادائیگی کے انفراسٹرکچر کی سیکیورٹی کے کورسز۔",
        'es': "Formación especializada en transferencias de crédito SEPA, protocolos de pago transfronterizos y seguridad de infraestructura de pagos.",
        'zh': "深入研习泛欧SEPA信用即时转账机制、跨境支付金融报文协议及数字化清结算基础设施的高强度安全防御体系。",
        'hi': "SEPA क्रेडिट ट्रांसफर, सीमा पार भुगतान प्रोटोकॉल और डिजिटल भुगतान बुनियादी ढांचे की सुरक्षा में विशेष पाठ्यक्रम।",
        'it': "Corsi specialistici in bonifici SEPA, protocolli di pagamento transfrontalieri e sicurezza dell'infrastruttura di pagamento.",
        'pt': "Cursos especializados em transferências a crédito SEPA, protocolos de pagamento transfronteiriços e segurança de infraestruturas.",
        'ja': "SEPA送金メカニズム、国境を越えた国際決済プロトコル、デジタル決済インフラのセキュリティに関する専門講義。",
        'ko': "SEPA 신용 이체, 국경 간 결제 프로토콜 및 디지털 결제 인프라 보안에 관한 전문 과정 이수.",
        'nl': "Gespecialiseerde cursussen in SEPA-overboekingen, grensoverschrijdende betalingsprotocollen en digitale infrastructuurbeveiliging.",
        'uz': "SEPA kredit o'tkazmalari, transchegaraviy to'lov protokollari va raqamli to'lov infratuzilmasi xavfsizligi bo'yicha maxsus kurslar.",
        'id': "Kursus khusus dalam transfer kredit SEPA, protokol pembayaran lintas batas, dan keamanan infrastruktur pembayaran digital."
    }

    networkTitles = {
        'en': "Linguistic & Executive Network", 'fa': "شبکه ارتباطی و تسلط به زبان‌ها", 'ps': "ژبني مهارتونه او اړیکې",
        'ru': "Языковая и исполнительная сеть", 'tr': "Dil Yetkinliği ve Yönetici Ağı", 'de': "Sprach- & Führungsnetzwerk",
        'fr': "Réseau Linguistique & Exécutif", 'ar': "الشبكة اللغوية والتنفيذية", 'ur': "لسانی اور ایگزیکٹو نیٹ ورک",
        'es': "Red Lingüística y Ejecutiva", 'zh': "国际多语言沟通能力与全球网络", 'hi': "भाषाई और कार्यकारी नेटवर्क",
        'it': "Rete Linguistica ed Esecutiva", 'pt': "Rede Linguística e Executiva", 'ja': "語学力および国際ネットワーク",
        'ko': "글로벌 어학 역량 및 네트워크", 'nl': "Taal- & Executief Netwerk", 'uz': "Til bilish va boshqaruv tarmog'i", 'id': "Jaringan Bahasa & Eksekutif"
    }

    networkSubs = {
        'en': "Language Proficiency", 'fa': "تسلط به زبان‌ها", 'ps': "د ژبو مهارت",
        'ru': "Владение языками", 'tr': "Dil Yeterliliği", 'de': "Sprachkenntnisse",
        'fr': "Compétences Linguistiques", 'ar': "إتقان اللغات", 'ur': "زبانوں پر مہارت",
        'es': "Dominio de Idiomas", 'zh': "熟练语言能力", 'hi': "भाषा प्रवीणता",
        'it': "Competenza Linguistica", 'pt': "Proficiência Linguística", 'ja': "言語運用能力",
        'ko': "구사 가능 언어", 'nl': "Taalvaardigheid", 'uz': "Til bilish darajasi", 'id': "Kemahiran Bahasa"
    }

    langEn = {
        'en': "English", 'fa': "انگلیسی", 'ps': "انګلیسي",
        'ru': "Английский", 'tr': "İngilizce", 'de': "Englisch",
        'fr': "Anglais", 'ar': "الإنجليزية", 'ur': "انگریزی",
        'es': "Inglés", 'zh': "英语", 'hi': "अंग्रेजी",
        'it': "Inglese", 'pt': "Inglês", 'ja': "英語",
        'ko': "영어", 'nl': "Engels", 'uz': "Ingliz tili", 'id': "Bahasa Inggris"
    }

    langEnLevel = {
        'en': "Professional Working", 'fa': "حرفه‌ای و کاری", 'ps': "کاري او مسلکي کچه",
        'ru': "Профессиональный", 'tr': "Profesyonel Çalışma", 'de': "Verhandlungssicher",
        'fr': "Professionnel", 'ar': "مستوى مهني متقدم", 'ur': "پیشہ ورانہ سطح",
        'es': "Profesional", 'zh': "专业工作水准", 'hi': "व्यावसायिक कार्य",
        'it': "Professionale", 'pt': "Profissional", 'ja': "ビジネス実務レベル",
        'ko': "비즈니스 실무", 'nl': "Professioneel werkend", 'uz': "Professional daraja", 'id': "Tingkat Kerja Profesional"
    }

    langFa = {
        'en': "Persian / Dari", 'fa': "فارسی / دری", 'ps': "فارسي / دري",
        'ru': "Персидский / Дари", 'tr': "Farsça / Derice", 'de': "Persisch / Dari",
        'fr': "Persan / Dari", 'ar': "الفارسية / الدارية", 'ur': "فارسی / دری",
        'es': "Persa / Dari", 'zh': "波斯语 / 达里语", 'hi': "फ़ारसी / दारी",
        'it': "Persiano / Dari", 'pt': "Persa / Dari", 'ja': "ペルシャ語／ダリー語",
        'ko': "페르시아어 / 다리어", 'nl': "Perzisch / Dari", 'uz': "Fors / Dariy tili", 'id': "Persia / Dari"
    }

    langFaLevel = {
        'en': "Native", 'fa': "زبان مادری", 'ps': "مورنۍ ژبه",
        'ru': "Родной", 'tr': "Anadil", 'de': "Muttersprache",
        'fr': "Langue maternelle", 'ar': "اللغة الأم", 'ur': "مادری زبان",
        'es': "Nativo", 'zh': "母语", 'hi': "मातृभाषा",
        'it': "Madrelingua", 'pt': "Língua materna", 'ja': "母国語",
        'ko': "원어민", 'nl': "Moedertaal", 'uz': "Ona tili", 'id': "Bahasa Ibu"
    }

    langPs = {
        'en': "Pashto", 'fa': "پشتو", 'ps': "پښتو",
        'ru': "Пушту", 'tr': "Peştuca", 'de': "Paschtu",
        'fr': "Pachto", 'ar': "البشتو", 'ur': "پشتو",
        'es': "Pastún", 'zh': "普什图语", 'hi': "पश्तो",
        'it': "Pashto", 'pt': "Pashto", 'ja': "パシュトー語",
        'ko': "파슈토어", 'nl': "Pasjtoe", 'uz': "Pushtu tili", 'id': "Pashto"
    }

    executiveDesks = {
        'en': "Executive Desk", 'fa': "میز ارتباطات اجرایی", 'ps': "اجرایوي دفتر",
        'ru': "Исполнительная приемная", 'tr': "Yönetici Masası", 'de': "Vorstandsbüro",
        'fr': "Bureau Exécutif", 'ar': "المكتب التنفيذي", 'ur': "ایگزیکٹو ڈیسک",
        'es': "Mesa Ejecutiva", 'zh': "总裁直连通道", 'hi': "कार्यकारी डेस्क",
        'it': "Scrivania Esecutiva", 'pt': "Gabinete Executivo", 'ja': "代表直通エグゼクティブ窓口",
        'ko': "최고경영진 직통 데스크", 'nl': "Directiebureau", 'uz': "Boshqaruv stoli", 'id': "Meja Eksekutif"
    }

    directChannels = {
        'en': "Direct WhatsApp Channel", 'fa': "کانال ارتباط مستقیم واتس‌اپ", 'ps': "د واټس‌اپ مستقیم چینل",
        'ru': "Прямой канал WhatsApp", 'tr': "Doğrudan WhatsApp Kanalı", 'de': "Direkter WhatsApp-Kanal",
        'fr': "Canal WhatsApp Direct", 'ar': "قناة واتساب المباشرة", 'ur': "براہ راست واٹس ایپ چینل",
        'es': "Canal Directo de WhatsApp", 'zh': "专属WhatsApp即时联络通道", 'hi': "सीधा व्हाट्सएप चैनल",
        'it': "Canale WhatsApp Diretto", 'pt': "Canal Direto de WhatsApp", 'ja': "専用WhatsAppダイレクト回線",
        'ko': "WhatsApp 다이렉트 소통 채널", 'nl': "Direct WhatsApp-kanaal", 'uz': "To'g'ridan-to'g'ri WhatsApp kanali", 'id': "Saluran WhatsApp Langsung"
    }

    inquireNows = {
        'en': "Inquire Now", 'fa': "ارتباط فوری", 'ps': "همدا اوس اړیکه ونیسئ",
        'ru': "Связаться сейчас", 'tr': "Şimdi İletişime Geçin", 'de': "Jetzt anfragen",
        'fr': "Contacter Maintenant", 'ar': "تواصل الآن", 'ur': "ابھی رابطہ کریں",
        'es': "Contactar Ahora", 'zh': "立即发起联络", 'hi': "अभी संपर्क करें",
        'it': "Contatta Ora", 'pt': "Contactar Agora", 'ja': "今すぐ問い合わせる",
        'ko': "지금 바로 문의하기", 'nl': "Nu aanvragen", 'uz': "Hozir bog'lanish", 'id': "Hubungi Sekarang"
    }

    return {
        'name': full,
        'firstName': first,
        'lastName': last,
        'role': roles.get(loc, roles['en']),
        'office': offices.get(loc, offices['en']),
        'coordinates': coordinates.get(loc, coordinates['en']),
        'badgeCEO': badgeCEOs.get(loc, badgeCEOs['en']),
        'badgeEuro': badgeEuros.get(loc, badgeEuros['en']),
        'badgeExpansion': badgeCEOs.get(loc, badgeCEOs['en']),
        'bio': bios.get(loc, bios['en']),
        'manifestoTitle': manifestoTitles.get(loc, manifestoTitles['en']),
        'manifestoQuote': quotes.get(loc, quotes['en']),
        'manifestoAuthor': quoteLocations.get(loc, quoteLocations['en']),
        'pillarsBadge': pillarsBadges.get(loc, pillarsBadges['en']),
        'pillarsTitle': pillarsTitles.get(loc, pillarsTitles['en']),
        'p1Title': p1Titles.get(loc, p1Titles['en']),
        'p1Desc': p1Descs.get(loc, p1Descs['en']),
        'p2Title': p2Titles.get(loc, p2Titles['en']),
        'p2Desc': p2Descs.get(loc, p2Descs['en']),
        'p3Title': p3Titles.get(loc, p3Titles['en']),
        'p3Desc': p3Descs.get(loc, p3Descs['en']),
        'pedigreeTitle': pedigreeTitles.get(loc, pedigreeTitles['en']),
        'edu1Title': edu1Titles.get(loc, edu1Titles['en']),
        'edu1Subtitle': edu1Subtitles.get(loc, edu1Subtitles['en']),
        'edu1Desc': edu1Descs.get(loc, edu1Descs['en']),
        'edu2Title': edu2Titles.get(loc, edu2Titles['en']),
        'edu2Subtitle': edu2Subtitles.get(loc, edu2Subtitles['en']),
        'edu2Desc': edu2Descs.get(loc, edu2Descs['en']),
        'networkTitle': networkTitles.get(loc, networkTitles['en']),
        'networkSub': networkSubs.get(loc, networkSubs['en']),
        'langEn': langEn.get(loc, langEn['en']),
        'langEnLevel': langEnLevel.get(loc, langEnLevel['en']),
        'langFa': langFa.get(loc, langFa['en']),
        'langFaLevel': langFaLevel.get(loc, langFaLevel['en']),
        'langPs': langPs.get(loc, langPs['en']),
        'langPsLevel': langFaLevel.get(loc, langFaLevel['en']),
        'executiveDesk': executiveDesks.get(loc, executiveDesks['en']),
        'directChannel': directChannels.get(loc, directChannels['en']),
        'inquireNow': inquireNows.get(loc, inquireNows['en'])
    }
