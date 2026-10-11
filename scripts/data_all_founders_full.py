# -*- coding: utf-8 -*-

def get_mobin_full(loc):
    p1 = {
        'en': "I am Mobin Hassani, Lead Developer and Head of Software Architecture across the Safi Ecosystem. My mission is to design, engineer, and lead the resilient technical foundations that power our financial applications, global student portals, and distributed microservices with near-zero latency and bank-grade security.",
        'fa': "من مبین حسنی هستم؛ مهندس ارشد نرم‌افزار، معمار سیستم‌های ابری توزیع‌شده و لیدر بخش توسعه‌دهندگان (Lead Developer) در اکوسیستم صافی. رسالت من خلق، مهندسی و هدایت زیرساخت‌های نرم‌افزاری مدرنی است که میلیون‌ها تراکنش و تعاملات آموزشی و مالی را با حداکثر سرعت، پایداری و امنیت مدیریت می‌کنند.",
        'ps': "زه مبین حسني یم؛ د سافټویر مخکښ انجنیر، د کلاوډ سیسټمونو معمار او په صافي ایکوسیستم کې د پروګرامرانو لیدر. زما موخه د داسې پرمختللو سافټویري زیربناوو جوړول دي چې ملیونونه تعلیمي او مالي معاملې په خورا لوړ سرعت، دوام او امنیت سره سمبال کړي.",
        'ru': "Я Мобин Хассани, ведущий разработчик и руководитель архитектуры программного обеспечения экосистемы Safi. Моя миссия — проектировать и возглавлять устойчивую техническую базу, обеспечивающую работу финансовых приложений и образовательных порталов с околонулевой задержкой и банковской безопасностью.",
        'tr': "Ben Mobin Hassani; Safi Ekosistemi Kıdemli Geliştiricisi ve Yazılım Mimarisi Lideriyim. Misyonum; finansal uygulamalarımıza, küresel öğrenci portallarına ve mikro hizmetlerimize sıfıra yakın gecikme ve banka düzeyinde güvenlik sağlayan dayanıklı teknik temelleri tasarlamak ve yönetmektir.",
        'de': "Ich bin Mobin Hassani, Lead Developer und Leiter der Softwarearchitektur im Safi-Ökosystem. Meine Mission ist es, robuste technische Grundlagen für Finanzanwendungen und globale Bildungsportale mit höchster Sicherheit und minimaler Latenz zu schaffen.",
        'fr': "Je suis Mobin Hassani, Lead Développeur et Chef de l'architecture logicielle de l'écosystème Safi. Ma mission est de concevoir et diriger les fondations techniques hautement sécurisées de nos applications financières et portails éducatifs.",
        'ar': "أنا مبين حسني، كبير المطورين ورئيس هندسة البرمجيات في منظومة صافي. تتمثل مهمتي في تصميم وهندسة وقيادة الأسس التقنية المرنة لتطبيقاتنا المالية وبواباتنا التعليمية بأعلى معايير الأمان المصرفي والسرعة.",
        'ur': "میں مبین حسنی ہوں، صافی ایکو سسٹم میں لیڈ سافٹ ویئر انجینئر اور کلاؤڈ سسٹمز آرکیٹیکٹ۔ میرا مشن ایسے جدید سافٹ ویئر انفراسٹرکچر کی تعمیر ہے جو تعلیمی اور مالیاتی لین دین کو انتہائی رفتار اور بینک گریڈ سیکیورٹی کے ساتھ سنبھالے۔",
        'es': "Soy Mobin Hassani, Desarrollador Principal y Jefe de Arquitectura de Software del Ecosistema Safi. Mi misión es diseñar y dirigir las bases técnicas que impulsan nuestras aplicaciones financieras y portales globales con seguridad bancaria.",
        'zh': "我是莫宾·哈萨尼（Mobin Hassani），萨菲全球生态系统首席软件架构师与开发团队负责人。我的使命是设计并主导构建高韧性底层技术底座，以极速低延迟与银行级安全标准支撑起全球海量在线金融交易与学术互动。",
        'hi': "मैं मोबिन हसानी हूं, सफी इकोसिस्टम में लीड सॉफ्टवेयर इंजीनियर और क्लाउड सिस्टम आर्किटेक्ट। मेरा मिशन ऐसे मजबूत तकनीकी ढांचे का निर्माण करना है जो हमारे वित्तीय और शैक्षिक पोर्टल्स को अत्यधिक गति और बैंक-स्तरीय सुरक्षा प्रदान करे।",
        'it': "Sono Mobin Hassani, Lead Developer e Responsabile dell'Architettura Software dell'Ecosistema Safi. Progetto e guido basi tecniche resilienti per le nostre applicazioni finanziarie e portali con sicurezza di livello bancario.",
        'pt': "Sou Mobin Hassani, Programador Principal e Diretor de Arquitetura de Software do Ecossistema Safi. A minha missão é conceber e liderar bases técnicas resilientes para as nossas plataformas financeiras e portais globais com segurança bancária.",
        'ja': "モビン・ハッサニ（Mobin Hassani）と申します。サフィ・エコシステムにおけるリード・ソフトウェアエンジニア兼クラウドアーキテクト。銀行水準のセキュリティと極限の低遅延を誇る分散基盤の設計・統括を担当しています。",
        'ko': "저는 사피 에코시스템의 수석 소프트웨어 엔지니어이자 클라우드 시스템 아키텍트인 모빈 하사니(Mobin Hassani)입니다. 은행급 보안과 초저지연 성능으로 금융 및 교육 플랫폼을 지탱하는 복원력 높은 기술 인프라를 구축하고 있습니다.",
        'nl': "Ik ben Mobin Hassani, Lead Developer en Hoofd Software-architectuur van het Safi Ecosysteem. Ik ontwerp en leid robuuste infrastructuren voor onze financiële en educatieve platforms met bankwaardige beveiliging.",
        'uz': "Men Mobin Hassani, Safiy ekotizimi yetakchi dasturchisi va dasturiy ta'minot arxitekturasi rahbariman. Mening vazifam moliyaviy va ta'limiy ilovalarimiz uchun bank darajasidagi xavfsizlikka ega texnik infratuzilmani yaratishdir.",
        'id': "Saya adalah Mobin Hassani, Pengembang Utama dan Kepala Arsitektur Perangkat Lunak di Ekosistem Safi. Misi saya adalah merancang dan memimpin fondasi teknis tangguh yang mendukung aplikasi keuangan dan portal kami dengan keamanan tingkat bank."
    }
    p2 = {
        'en': "Leading the development ecosystem, I oversee full software lifecycle governance—from reactive frontend experiences and high-throughput backend APIs to cloud orchestration, CI/CD automated deployment pipelines, and proactive vulnerability mitigation.",
        'fa': "به‌عنوان لیدر تیم توسعه‌دهندگان، نظارت مستقیم بر کل چرخه حیات نرم‌افزارهای اکوسیستم، از معماری فرانت‌اند و بک‌اند، پیاده‌سازی APIهای اختصاصی مالی، سیستم‌های احراز هویت چندلایه تا استقرار سرویس‌های ابری با استانداردهای سخت‌گیرانه بین‌المللی را بر عهده دارم.",
        'ps': "د پروګرامرانو د مشر په توګه، زه د سافټویر جوړولو ټول بهیر څارم — له مخکینۍ برخې او د لوړ سرعت APIګانو څخه نیولې تر کلاوډ جوړښتونو، اتومات خپرولو او د امنیتي ګواښونو مخنیوي پورې.",
        'ru': "Возглавляя команду разработки, я контролирую весь жизненный цикл ПО: от быстродействующих интерфейсов и API высокой пропускной способности до оркестрации облаков, конвейеров CI/CD и проактивного устранения уязвимостей.",
        'tr': "Geliştirme ekibine liderlik ederek; reaktif ön yüz deneyimlerinden yüksek verimli arka yüz API'lerine, bulut orkestrasyonundan CI/CD dağıtım hatlarına kadar tüm yazılım yaşam döngüsünü denetliyorum.",
        'de': "Als Leiter des Entwicklerteams überwache ich den gesamten Software-Lebenszyklus – von reaktiven Frontend-Erlebnissen und hochperformanten APIs bis hin zur Cloud-Orchestrierung und automatisierten CI/CD-Pipelines.",
        'fr': "En dirigeant l'équipe de développement, je supervise l'intégralité du cycle de vie logiciel : des interfaces réactives aux API haute performance, en passant par l'orchestration cloud et les pipelines CI/CD.",
        'ar': "وبصفتي قائد فريق التطوير، أشرف على دورة حياة البرمجيات بأكملها: من واجهات المستخدم التفاعلية وواجهات برمجة التطبيقات عالية الإنتاجية إلى بنية السحابة وأنابيب النشر الآلي وتأمين الثغرات.",
        'ur': "ڈویلپمنٹ ٹیم کی قیادت کرتے ہوئے، میں فرنٹ اینڈ تجربات، ہائی تھرو پٹ بیک اینڈ APIs، کلاؤڈ آرکیسٹریشن اور خودکار تعیناتی سے لے کر سیکیورٹی تک تمام مراحل کی نگرانی کرتا ہوں۔",
        'es': "Al liderar el equipo de desarrollo, superviso todo el ciclo de vida del software: desde experiencias de usuario reactivas y API de alto rendimiento hasta orquestación en la nube y pipelines CI/CD.",
        'zh': "作为核心研发团队掌舵人，我统揽全栈软件工程的完整生命周期治理——涵盖超响应式前端交互、高并发分布式后端API、跨地域多云编排、自动化CI/CD持续交付流水线及主动式安全漏洞攻防。",
        'hi': "विकास टीम का नेतृत्व करते हुए, मैं प्रतिक्रियाशील फ्रंटएंड, उच्च-थ्रूपुट बैकएंड एपीआई, क्लाउड ऑर्केस्ट्रेशन और स्वचालित सीआई/सीडी पाइपलाइनों से लेकर सुरक्षा तक संपूर्ण सॉफ्टवेयर जीवन चक्र की निगरानी करता हूं।",
        'it': "Alla guida del team di sviluppo, supervisiono l'intero ciclo di vita del software: dalle interfacce reattive alle API ad alto rendimento, fino all'orchestrazione cloud e alle pipeline CI/CD.",
        'pt': "Liderando a equipa de desenvolvimento, supervisiono todo o ciclo de vida do software: desde interfaces reativas e APIs de alto débito até à orquestração na nuvem e pipelines CI/CD.",
        'ja': "開発チームのリードとして、リアクティブなフロントエンド設計、高スループットAPI、マルチクラウド・オーケストレーション、CI/CD自動デプロイ、脆弱性防御まで全工程を直接統括しています。",
        'ko': "개발 팀을 이끌며 반응형 프론트엔드 환경, 고처리량 백엔드 API, 멀티 클라우드 오케스트레이션, CI/CD 자동화 배포 파이프라인 및 선제적 보안 취약점 방어에 이르는 전체 소프트웨어 라이프사이클을 총괄합니다.",
        'nl': "Als leidinggevende van het ontwikkelteam houd ik toezicht op de complete softwarecyclus: van reactieve frontends en snelle API's tot cloudorkestratie en geautomatiseerde CI/CD-pipelines.",
        'uz': "Dasturchilar guruhiga rahbarlik qilib, reaktiv frontend, yuqori tezlikdagi backend APIlar, bulutli infratuzilma va CI/CD jarayonlarini to'liq nazorat qilaman.",
        'id': "Memimpin tim pengembangan, saya mengawasi seluruh siklus hidup perangkat lunak: mulai dari antarmuka reaktif, API throughput tinggi, hingga orkestrasi cloud dan pipeline CI/CD."
    }
    return {
        'manifestoP1': p1.get(loc, p1['en']),
        'manifestoP2': p2.get(loc, p2['en'])
    }

def get_mujtaba_full(loc):
    p1 = {
        'en': "My name is Sayed Mujtaba Rahmani. In a world where digital boundaries are dissolving and economic sovereignty is governed by code, my life mission is to engineer systems that grant Afghan students and global professionals unfettered access to world-class financial instruments and technical education.",
        'fa': "نام من سید مجتبی رحمانی است. در دنیایی که مرزهای دیجیتال در حال محو شدن هستند و حاکمیت اقتصادی با کدها رقم می‌خورد، رسالت زندگی من ساخت سیستم‌هایی است که به جوانان و پژوهشگران در سراسر جهان دسترسی نامحدود به ابزارهای مالی بین‌المللی و آموزش تخصصی اعطا نماید.",
        'ps': "زما نوم سید مجتبی رحماني دی. په داسې نړۍ کې چې ډیجیټل پولې له منځه ځي او اقتصادي خپلواکي د کوډونو لخوا ټاکل کیږي، زما د ژوند ماموریت د داسې سیسټمونو جوړول دي چې ځوانانو او نړیوالو محصلینو ته نړیوالو مالي اسانتیاوو او لوړو مسلکي زده کړو ته بې خنډه لاسرسی ورکړي.",
        'ru': "Меня зовут Саид Муджтаба Рахмани. В мире, где цифровые границы стираются, а экономический суверенитет определяется кодом, цель моей жизни — создавать системы, открывающие студентам и специалистам по всему миру прямой доступ к финансовым инструментам и передовому образованию.",
        'tr': "Benim adım Seyid Mücteba Rahmani. Dijital sınırların kalktığı ve ekonomik egemenliğin kodlarla belirlendiği bir dünyada, yaşam misyonum; gençlere ve araştırmacılara dünya standartlarında finansal araçlara ve teknik eğitime engelsiz erişim sağlayan sistemler kurmaktır.",
        'de': "Mein Name ist Sayed Mujtaba Rahmani. In einer Welt, in der digitale Grenzen verschwinden, ist es meine Lebensaufgabe, Systeme zu entwickeln, die Schülern und Fachkräften weltweit uneingeschränkten Zugang zu erstklassigen Finanzinstrumenten und Bildung verschaffen.",
        'fr': "Je m'appelle Sayed Mujtaba Rahmani. Dans un monde où les frontières numériques s'effacent, ma mission est de concevoir des systèmes offrant aux étudiants et professionnels un accès direct aux instruments financiers mondiaux et à une formation d'élite.",
        'ar': "اسمي سيد مجتبى رحماني. في عالم تتلاشى فيه الحدود الرقمية وتُحكم فيه السيادة الاقتصادية بالبرمجيات، تتمثل رسالتي في بناء أنظمة تمنح الطلاب والمهنيين حول العالم وصولاً حراً إلى الأدوات المالية العالمية والتعليم التقني الرفيع.",
        'ur': "میرا نام سید مجتبی رحمانی ہے۔ ایسی دنیا میں جہاں ڈیجیٹل سرحدیں ختم ہو رہی ہیں، میری زندگی کا مشن ایسے سسٹمز تیار کرنا ہے جو طلباء اور پیشہ ور افراد کو بین الاقوامی مالیاتی آلات اور معیاری تعلیم تک بلا تعطل رسائی فراہم کریں۔",
        'es': "Mi nombre es Sayed Mujtaba Rahmani. En un mundo donde las fronteras digitales se desvanecen, mi misión de vida es diseñar sistemas que otorguen a estudiantes y profesionales acceso sin restricciones a instrumentos financieros y educación técnica de nivel mundial.",
        'zh': "我是赛义德·穆杰塔巴·拉赫马尼（Sayed Mujtaba Rahmani）。在数字边界日益消融、经济主权由底层代码重新定义的时代，我的毕生使命是构建卓越系统，赋予青年学子与全球专业人士自由通达世界一流金融基础设施与尖端工程教育的权利。",
        'hi': "मेरा नाम सैयद मुज्तबा रहमानी है। ऐसी दुनिया में जहां डिजिटल सीमाएं समाप्त हो रही हैं, मेरा जीवन मिशन ऐसे सिस्टम बनाना है जो छात्रों और पेशेवरों को विश्व स्तरीय वित्तीय साधनों और शिक्षा तक निर्बाध पहुंच प्रदान करें।",
        'it': "Mi chiamo Sayed Mujtaba Rahmani. In un mondo in cui i confini digitali si dissolvono, la mia missione è progettare sistemi che offrano a studenti e professionisti accesso illimitato a strumenti finanziari globali e istruzione d'élite.",
        'pt': "O meu nome é Sayed Mujtaba Rahmani. Num mundo em que as fronteiras digitais se desvanecem, a minha missão é criar sistemas que proporcionem a estudantes e profissionais acesso sem restrições a instrumentos financeiros globais e educação de elite.",
        'ja': "サイエド・ムジタバ・ラフマニ（Sayed Mujtaba Rahmani）と申します。デジタルの国境が消滅し、経済的主権がコードによって規定される現代において、若者や研究者に対し、世界水準の金融インフラと専門教育への自由なアクセスを提供するシステムの構築を使命としています。",
        'ko': "제 이름은 사예드 무즈타바 라흐마니(Sayed Mujtaba Rahmani)입니다. 디지털 국경이 허물어지고 코드에 의해 경제 주권이 확립되는 시대에, 전 세계 학생과 전문가들에게 세계적 수준의 금융 수단과 기술 교육에 대한 완전한 접근성을 부여하는 시스템을 구축하는 것이 저의 사명입니다.",
        'nl': "Mijn naam is Sayed Mujtaba Rahmani. In een wereld waarin digitale grenzen vervagen, is het mijn levensdoel om systemen te bouwen die studenten en professionals wereldwijd onbeperkte toegang geven tot financiële instrumenten en topeducatie.",
        'uz': "Mening ismim Sayed Mujtaba Rahmani. Raqamli chegaralar yo'qolib borayotgan dunyoda, mening maqsadim talabalar va mutaxassislarga jahon darajasidagi moliyaviy vositalar va sifatli ta'limdan erkin foydalanish imkoniyatini beruvchi tizimlarni yaratishdir.",
        'id': "Nama saya adalah Sayed Mujtaba Rahmani. Di dunia di mana batas-batas digital memudar dan kedaulatan ekonomi diatur oleh kode, misi hidup saya adalah merekayasa sistem yang memberi para pelajar dan profesional akses tanpa hambatan ke instrumen keuangan global dan pendidikan teknik."
    }
    p2 = {
        'en': "Holding a specialized academic foundation in Economics and Online Business from the University of the People (UoPeople, USA), I have dedicated myself to bridging traditional macroeconomic models with modern decentralized fintech architecture.",
        'fa': "با داشتن پیشینه تحصیلی تخصصی در اقتصاد و کسب‌وکار آنلاین از دانشگاه University of the People (ایالات متحده آمریکا)، خود را وقف پیوند دادن مدل‌های اقتصاد کلان کلاسیک با معماری مدرن فین‌تک کرده‌ام.",
        'ps': "د امریکا د پیپل پوهنتون (UoPeople) څخه په اقتصاد او آنلاین سوداګرۍ کې د مسلکي زده کړو په درلودلو سره، ما خپل ځان د کلاسیکو اقتصادي ماډلونو او نوې مالي ټکنالوجۍ د یوځای کولو لپاره وقف کړی دی.",
        'ru': "Имея академическую подготовку в области экономики и онлайн-бизнеса в University of the People (США), я посвятил себя объединению макроэкономических моделей с современной финтех-архитектурой.",
        'tr': "University of the People'dan (ABD) Ekonomi ve Çevrimiçi İşletme alanında akademik altyapıya sahip olarak, kendimi geleneksel makroekonomik modeller ile modern FinTech mimarisini birleştirmeye adadım.",
        'de': "Mit einem akademischen Hintergrund in Wirtschaft und Online-Business an der University of the People (USA) widme ich mich der Verbindung makroökonomischer Modelle mit moderner Fintech-Architektur.",
        'fr': "Fort d'une formation en économie et commerce en ligne à l'University of the People (États-Unis), je me consacre à relier les modèles macroéconomiques classiques aux architectures fintech modernes.",
        'ar': "بفضل خلفيتي الأكاديمية المتخصصة في الاقتصاد والأعمال الرقمية من جامعة الناس (UoPeople، الولايات المتحدة)، كرست جهودي لربط نماذج الاقتصاد الكلي التقليدية مع معمارية التكنولوجيا المالية الحديثة.",
        'ur': "یونیورسٹی آف دی پیپل (امریکہ) سے معاشیات اور آن لائن بزنس میں تعلیم کے ساتھ، میں نے روایتی معاشی ماڈلز کو جدید فین ٹیک انفراسٹرکچر سے جوڑنے کے لیے خود کو وقف کیا ہے۔",
        'es': "Con una sólida formación académica en Economía y Negocios en Línea de la University of the People (EE. UU.), me he dedicado a conectar modelos macroeconómicos tradicionales con arquitecturas fintech modernas.",
        'zh': "依托美国人民大学（University of the People, USA）经济学与数字化商业管理的专业学术积淀，我始终专注于将经典宏观经济学模型与前沿现代金融科技架构进行系统性贯通与工程化落地。",
        'hi': "यूनिवर्सिटी ऑफ द पीपल (यूएसए) से अर्थशास्त्र और ऑनलाइन व्यवसाय में शैक्षणिक पृष्ठभूमि के साथ, मैंने पारंपरिक मैक्रोइकॉनॉमिक मॉडल को आधुनिक फिनटेक आर्किटेक्चर से जोड़ने के लिए खुद को समर्पित किया है।",
        'it': "Con una solida base accademica in Economia e Business Digitale presso la University of the People (USA), mi dedico a unire modelli macroeconomici tradizionali e moderne architetture fintech.",
        'pt': "Com formação académica em Economia e Negócios Digitais pela University of the People (EUA), dedico-me a ligar modelos macroeconómicos tradicionais à moderna arquitetura fintech.",
        'ja': "米国のUniversity of the Peopleにて経済学およびオンラインビジネスの専門教育を修め、伝統的マクロ経済モデルと最新のFinTechアーキテクチャの架橋に尽力してきました。",
        'ko': "미국 피플대학교(UoPeople)에서 경제학 및 온라인 비즈니스를 전공한 학문적 기반을 바탕으로, 전통적 거시경제 모델과 최신 핀테크 아키텍처를 유기적으로 연결하는 데 헌신해 왔습니다.",
        'nl': "Met een academische basis in economie en online zakendoen aan de University of the People (VS), wijd ik mij aan het verbinden van traditionele macro-economie met moderne fintech-architectuur.",
        'uz': "University of the People (AQSh) da iqtisodiyot va onlayn biznes bo'yicha akademik ta'lim olib, an'anaviy makroiqtisodiy modellarni zamonaviy FinTech arxitekturasi bilan bog'lashga o'zimni bag'ishladim.",
        'id': "Memiliki landasan akademis khusus dalam Ekonomi dan Bisnis Online dari University of the People (AS), saya mendedikasikan diri untuk menjembatani model makroekonomi tradisional dengan arsitektur fintech modern."
    }
    return {
        'manifestoP1': p1.get(loc, p1['en']),
        'manifestoP2': p2.get(loc, p2['en'])
    }

def get_sahel_full(loc):
    p1 = {
        'en': "My name is Sahel Salem, Chief Executive Officer (CEO) and Director of European Relations at Safi Academy. Born on March 19, 2007, my vocation is to dismantle the geographical and bureaucratic walls that prevent emerging talent from participating directly in the European economy.",
        'fa': "نام من ساحل سالم است، مدیرعامل (CEO) و مدیر ارتباطات اروپا در آکادمی صافی. متولد ۱۹ مارس ۲۰۰۷، رسالت من برداشتن موانع جغرافیایی و دیوان‌سالاری است که مانع از ورود مستقیم استعدادهای نوظهور به اقتصاد پویای اروپا می‌شود.",
        'ps': "زما نوم ساحل سالم دی، په صافي اکاډمۍ کې اجراییوي رییس (CEO) او د اروپا د اړیکو مسؤل. د ۲۰۰۷ کال د مارچ په ۱۹ زیږیدلی، زما موخه د هغو جغرافیایي او اداري خنډونو له منځه وړل دي چې نوي استعدادونه د اروپا له اقتصاد سره له نښلیدو منع کوي.",
        'ru': "Меня зовут Сахель Салем, генеральный директор (CEO) и директор по европейским связям Safi Academy. Родившись 19 марта 2007 года, я посвятил себя устранению географических и бюрократических барьеров, мешающих молодым талантам участвовать в европейской экономике.",
        'tr': "Benim adım Sahel Salem; Safi Academy CEO'su ve Avrupa İlişkileri Direktörüyüm. 19 Mart 2007 doğumlu olup amacım; genç yeteneklerin Avrupa ekonomisine doğrudan katılmasını engelleyen coğrafi ve bürokratik engelleri ortadan kaldırmaktır.",
        'de': "Mein Name ist Sahel Salem, CEO und Leiter der europäischen Beziehungen der Safi Academy. Geboren am 19. März 2007, widme ich mich dem Abbau bürokratischer Hürden, damit aufstrebende Talente direkt an der europäischen Wirtschaft teilhaben können.",
        'fr': "Je m'appelle Sahel Salem, PDG et Directeur des relations européennes de la Safi Academy. Né le 19 mars 2007, ma vocation est de briser les barrières bureaucratiques qui empêchent les talents d'intégrer l'économie européenne.",
        'ar': "اسمي ساحل سالم، الرئيس التنفيذي (CEO) ومدير العلاقات الأوروبية في أكاديمية صافي. وُلدت في 19 مارس 2007، وتتمثل غايتي في تفكيك الحواجز الجغرافية والبيروقراطية التي تعيق انخراط المواهب الصاعدة مباشرة في الاقتصاد الأوروبي.",
        'ur': "میرا نام ساحل سالم ہے، صافی اکیڈمی کے چیف ایگزیکٹو آفیسر (سی ای او) اور ڈائریکٹر آف یورپین ریلیشنز۔ 19 مارچ 2007 کو پیدا ہوا، میرا مقصد جغرافیائی اور دفتری رکاوٹوں کو ختم کرنا ہے تاکہ باصلاحیت نوجوان براہ راست یورپی معیشت سے جڑ سکیں۔",
        'es': "Mi nombre es Sahel Salem, CEO y Director de Relaciones Europeas de Safi Academy. Nacido el 19 de marzo de 2007, mi vocación es derribar las barreras burocráticas que impiden a los talentos emergentes integrarse a la economía europea.",
        'zh': "我是萨赫勒·萨利姆（Sahel Salem），萨菲学院首席执行官（CEO）兼欧洲国际关系全权总监。生于2007年3月19日，我的使命是坚决打破阻碍广大杰出青年直接参与欧洲高价值经济循环的一切地理与繁文缛节壁垒。",
        'hi': "मेरा नाम साहिल सलेम है, सफ़ी अकादमी के सीईओ और यूरोपीय संबंधों के निदेशक। 19 मार्च 2007 को जन्मे, मेरा मिशन उन बाधाओं को दूर करना है जो उभरती प्रतिभाओं को यूरोपीय अर्थव्यवस्था में सीधे भाग लेने से रोकती हैं।",
        'it': "Mi chiamo Sahel Salem, CEO e Direttore delle Relazioni Europee presso Safi Academy. Nato il 19 marzo 2007, la mia missione è abbattere le barriere burocratiche per consentire ai talenti di partecipare direttamente all'economia europea.",
        'pt': "O meu nome é Sahel Salem, CEO e Diretor de Relações Europeias na Safi Academy. Nascido a 19 de março de 2007, a minha vocação é derrubar as barreiras que impedem os talentos de participar diretamente na economia europeia.",
        'ja': "サヘル・サレム（Sahel Salem）と申します。サフィ・アカデミー最高経営責任者（CEO）兼欧州関係総括ディレクター。2007年3月19日生まれ。若き才能が欧州経済圏へダイレクトに参画することを阻む地理的・官僚的障壁を打破することを使命としています。",
        'ko': "제 이름은 사헬 살렘(Sahel Salem)이며, 사피 아카데미 최고경영자(CEO) 겸 유럽 대외협력 총괄 디렉터입니다. 2007년 3월 19일생으로, 유망한 인재들이 유럽 경제 생태계에 직접 참여하는 것을 가로막는 지리적·관료적 장벽을 해체하는 것이 저의 소명입니다.",
        'nl': "Mijn naam is Sahel Salem, CEO en Directeur Europese Betrekkingen van Safi Academy. Geboren op 19 maart 2007, breek ik bureaucratische barrières af zodat talent direct kan participeren in de Europese economie.",
        'uz': "Mening ismim Sahel Salem, Safiy Academy bosh ijrochi direktori (CEO) va Yevropa aloqalari direktoriman. 2007-yil 19-martda tug'ilganman; maqsadim yosh iqtidorlarning Yevropa iqtisodiyotida bevosita ishtirok etishiga to'siq bo'lgan to'siqlarni bartaraf etishdir.",
        'id': "Nama saya adalah Sahel Salem, Chief Executive Officer (CEO) dan Direktur Hubungan Eropa di Safi Academy. Lahir pada 19 Maret 2007, panggilan hidup saya adalah meruntuhkan tembok birokrasi yang menghalangi talenta berkembang untuk berpartisipasi langsung dalam ekonomi Eropa."
    }
    p2 = {
        'en': "Through deep strategic integration with German, British, and pan-European financial networks, I lead Safi Academy's international student mobility initiatives, corporate partnerships, and SEPA banking bridges.",
        'fa': "از طریق هماهنگی‌های عمیق راهبردی با شبکه‌های مالی آلمان، بریتانیا و سراسر اروپا، هدایت برنامه‌های پویایی بین‌المللی دانشجویان، همکاری‌های شرکتی و پل‌های بانکی SEPA آکادمی صافی را بر عهده دارم.",
        'ps': "له جرمني، انګلستان او اروپایي مالي شبکو سره د ژورو ستراتیژیکو اړیکو له لارې، زه د صافي اکاډمۍ د محصلینو نړیوال خوځښت، کارپوریټ ملګرتیا او د SEPA بانکي اړیکې رهبري کوم.",
        'ru': "Благодаря стратегической интеграции с финансовыми сетями Германии, Великобритании и Европы, я руковожу программами мобильности студентов, корпоративными альянсами и банковскими каналами SEPA.",
        'tr': "Alman, İngiliz ve Avrupa finans ağlarıyla derin stratejik entegrasyon yoluyla Safi Academy'nin uluslararası öğrenci hareketliliği girişimlerine, kurumsal ortaklıklara ve SEPA bankacılık köprülerine liderlik ediyorum.",
        'de': "Durch strategische Kooperationen mit deutschen, britischen und europäischen Finanznetzwerken leite ich die internationale Studentenmobilität und SEPA-Bankenbrücken der Safi Academy.",
        'fr': "Grâce à une intégration stratégique avec les réseaux financiers allemands, britanniques et européens, je pilote la mobilité étudiante internationale et les ponts bancaires SEPA de la Safi Academy.",
        'ar': "من خلال التكامل الاستراتيجي الوثيق مع الشبكات المالية الألمانية والبريطانية والأوروبية، أقود مبادرات التنقل الدولي للطلاب والشراكات المؤسسية والجسور المصرفية SEPA لأكاديمية صافي.",
        'ur': "جرمن، برطانوی اور یورپی مالیاتی نیٹ ورکس کے ساتھ اسٹریٹجک تعلقات کے ذریعے، میں صافی اکیڈمی کی بین الاقوامی طلباء کی نقل و حرکت اور SEPA بینکنگ رابطوں کی قیادت کرتا ہوں۔",
        'es': "Mediante una integración estratégica con redes financieras de Alemania, Reino Unido y Europa, lidero las iniciativas de movilidad estudiantil y los puentes bancarios SEPA de Safi Academy.",
        'zh': "依托与德国、英国及泛欧金融核心网络的深厚战略同盟，我全面统领萨菲学院的国际学术交流计划、跨国企业联合培养通道及泛欧SEPA企业银行结算桥梁。",
        'hi': "जर्मन, ब्रिटिश और यूरोपीय वित्तीय नेटवर्क के साथ रणनीतिक एकीकरण के माध्यम से, मैं सफ़ी अकादमी की अंतरराष्ट्रीय छात्र गतिशीलता और SEPA बैंकिंग सेतुओं का नेतृत्व करता हूं।",
        'it': "Attraverso una profonda integrazione strategica con le reti finanziarie europee, guido le iniziassi di mobilità studentesca e i ponti bancari SEPA di Safi Academy.",
        'pt': "Através de uma integração estratégica com as redes financeiras europeias, lidero as iniciativas de mobilidade estudantil e as pontes bancárias SEPA da Safi Academy.",
        'ja': "ドイツ、イギリス、汎欧州の金融ネットワークとの戦略的提携を通じ、サフィ・アカデミーの国際人材流動化イニシアチブ、企業アライアンス、SEPA銀行決済ブリッジを統括しています。",
        'ko': "독일, 영국 및 범유럽 금융 네트워크와의 전략적 연계를 통해 사피 아카데미의 글로벌 학생 이동성 프로젝트, 기업 파트너십 및 SEPA 은행 결제 브릿지를 진두지휘하고 있습니다.",
        'nl': "Door strategische integratie met Europese financiële netwerken leid ik de internationale mobiliteit van studenten en SEPA-bankkoppelingen van Safi Academy.",
        'uz': "Germaniya, Buyuk Britaniya va Yevropa moliya tarmoqlari bilan strategik hamkorlik orqali Safiy Academy xalqaro talabalar mobilligi va SEPA bank aloqalarini boshqaraman.",
        'id': "Melalui integrasi strategis dengan jaringan keuangan Jerman, Inggris, dan pan-Eropa, saya memimpin inisiatif mobilitas pelajar internasional dan jembatan perbankan SEPA di Safi Academy."
    }
    return {
        'manifestoP1': p1.get(loc, p1['en']),
        'manifestoP2': p2.get(loc, p2['en'])
    }
