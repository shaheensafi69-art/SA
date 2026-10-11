# -*- coding: utf-8 -*-

def get_shirin_full_sections(loc):
    p1_dict = {
        'en': "I am Shirin Gol Ahmadi, General Manager of All Safi Ecosystem at SafiPay and Director of Applied Artificial Intelligence Systems across the Safi Global Ecosystem. Born on December 16, 2004, my career is defined by fusing economic theory with full-stack engineering, high-aesthetic UI/UX design, and autonomous AI automation.",
        'fa': "من شیرین گل احمدی هستم، جنرال منیجر تمام اکوسیستم صافی در صافی‌پی و مدیر سیستم‌های کاربردی هوش مصنوعی در سرتاسر اکوسیستم جهانی صافی. متولد ۱۶ دسامبر ۲۰۰۴، مسیر حرفه‌ای من با پیوند دادن تئوری‌های اقتصادی، مهندسی فول‌استک، طراحی پیشرفته رابط کاربری و اتوماسیون هوش مصنوعی شناخته می‌شود.",
        'ps': "زه شیرین ګل احمدي یم، په صافي‌پی کې د ټول صافي ایکوسیستم عمومي مدیره او په نړیوال ایکوسیستم کې د پلي شوي مصنوعي استخباراتو د سیسټمونو مشره. د ۲۰۰۴ کال د دسمبر په ۱۶ زیږیدلې، زما مسلکي لاره د اقتصادي نظریاتو، بشپړ پروګرامینګ، عالي ډیزاین او مصنوعي استخباراتو په یوځای کولو سمبال ده.",
        'ru': "Я Ширин Голь Ахмади, генеральный менеджер всей экосистемы Safi в SafiPay и директор систем прикладного искусственного интеллекта. Родившись 16 декабря 2004 года, я посвятила карьеру объединению экономической теории, full-stack разработки, дизайна интерфейсов и ИИ-автоматизации.",
        'tr': "Ben Şirin Gol Ahmadi; SafiPay'de Tüm Safi Ekosistemi Genel Müdürü ve Uygulamalı Yapay Zeka Sistemleri Direktörüyüm. 16 Aralık 2004 doğumlu olup, kariyerim ekonomi teorisi, full-stack mühendislik, üst düzey UI/UX tasarımı ve otonom yapay zeka otomasyonunu birleştirmekle şekillendi.",
        'de': "Ich bin Shirin Gol Ahmadi, General Manager des gesamten Safi-Ökosystems bei SafiPay und Direktorin für angewandte KI-Systeme. Geboren am 16. Dezember 2004, verbindet meine Karriere Wirtschaftstheorie mit Full-Stack-Entwicklung, UI/UX-Design und autonomer KI.",
        'fr': "Je suis Shirin Gol Ahmadi, Directrice Générale de tout l'écosystème Safi chez SafiPay et Directrice des systèmes d'intelligence artificielle appliquée. Née le 16 décembre 2004, ma carrière associe théorie économique, ingénierie full-stack, design d'interfaces et automatisation par l'IA.",
        'ar': "أنا شيرين غول أحمدي، المدير العام لكافة منظومة صافي في صافي بي ومديرة أنظمة الذكاء الاصطناعي التطبيقي. وُلدت في 16 ديسمبر 2004، وتتميز مسيرتي بالدمج بين النظرية الاقتصادية وهندسة البرمجيات المتكاملة وتصميم الواجهات والأتمتة الذكية.",
        'ur': "میں شیرین گل احمدی ہوں، صافی پے میں تمام صافی ایکو سسٹم کی جنرل مینیجر اور اپلائیڈ آرٹیفیشل انٹیلیجنس سسٹمز کی ڈائریکٹر۔ 16 دسمبر 2004 کو پیدا ہوئی، میرا کیریئر اقتصادی تھیوری، فل اسٹیک انجینئرنگ، اعلیٰ ڈیزائن اور خودکار اے آئی کے امتزاج سے عبارت ہے۔",
        'es': "Soy Shirin Gol Ahmadi, Directora General de todo el Ecosistema Safi en SafiPay y Directora de Sistemas de Inteligencia Artificial Aplicada. Nacida el 16 de diciembre de 2004, mi carrera se define por unir la teoría económica con la ingeniería full-stack y la IA autónoma.",
        'zh': "我是希琳·戈尔·艾哈迈迪（Shirin Gol Ahmadi），现任SafiPay全生态系统总经理兼萨菲全球应用人工智能系统总监。生于2004年12月16日，我的专业生涯致力于将宏观经济学理论、全栈软件工程、极简美学设计与自主智能体自动化深度融合。",
        'hi': "मैं शिरीन गोल अहमदी हूं, SafiPay में सभी सफी इकोसिस्टम की महाप्रबंधक और अनुप्रयुक्त एआई सिस्टम की निदेशक। 16 दिसंबर 2004 को जन्मी, मेरा करियर आर्थिक सिद्धांत, फुल-स्टैक इंजीनियरिंग, यूआई/यूएक्स डिजाइन और स्वायत्त एआई को एकीकृत करने के लिए समर्पित है।",
        'it': "Sono Shirin Gol Ahmadi, Direttore Generale di tutto l'Ecosistema Safi presso SafiPay e Direttore dei Sistemi di Intelligenza Artificiale Applicata. Nata il 16 dicembre 2004, unisco teoria economica, ingegneria full-stack e automazione con IA.",
        'pt': "Sou Shirin Gol Ahmadi, Diretora-Geral de todo o Ecossistema Safi na SafiPay e Diretora de Sistemas de Inteligência Artificial Aplicada. Nascida a 16 de dezembro de 2004, a minha carreira funde teoria económica com engenharia full-stack e automação de IA.",
        'ja': "シリン・ゴル・アフマディ（Shirin Gol Ahmadi）と申します。SafiPayにおけるサフィ・全エコシステム総支配人兼応用AIシステム総括ディレクターを務めています。経済学理論、フルスタック工学、高品位UI/UX、自律型AIの融合を追求しています。",
        'ko': "저는 SafiPay에서 사피 전 에코시스템 총괄 매니저이자 응용 인공지능 시스템 디렉터를 맡고 있는 시린 골 아마디(Shirin Gol Ahmadi)입니다. 2004년 12월 16일생으로, 경제학 이론과 풀스택 소프트웨어 공학, 자율형 AI 오토메이션을 융합하고 있습니다.",
        'nl': "Ik ben Shirin Gol Ahmadi, General Manager van het volledige Safi Ecosysteem bij SafiPay en Directeur Toegepaste AI-systemen. Geboren op 16 december 2004, combineert mijn loopbaan economische theorie met full-stack engineering en autonome AI.",
        'uz': "Men Shirin Gol Ahmadi, SafiPay'da butun Safiy ekotizimi bosh menejeri va amaliy sun'iy intellekt tizimlari direktoriman. 2004-yil 16-dekabrda tug'ilganman; faoliyatim iqtisodiy nazariya, full-stack muhandislik va avtonom sun'iy intellektni birlashtirishga qaratilgan.",
        'id': "Saya adalah Shirin Gol Ahmadi, General Manager Seluruh Ekosistem Safi di SafiPay dan Direktur Sistem Kecerdasan Buatan Terapan. Lahir pada 16 Desember 2004, karier saya menggabungkan teori ekonomi, rekayasa full-stack, desain antarmuka, dan otomatisasi AI otonom."
    }

    p2_dict = {
        'en': "Graduated with a Bachelor of Science in Economics from the prestigious National University of Sciences & Technology (NUST) in Islamabad, Pakistan, I approach corporate leadership through an analytical, macro-financial lens. I orchestrate cross-functional teams, align engineering sprints with market demand, and establish seamless communication between developers, financial analysts, and corporate clients.",
        'fa': "با فارغ‌التحصیلی در مقطع لیسانس اقتصاد از دانشگاه معتبر علوم و فناوری ملی (NUST) در اسلام‌آباد پاکستان، رهبری سازمانی را با دیدگاهی تحلیلی و اقتصاد کلان هدایت می‌کنم. من تیم‌های بین‌رشته‌ای را هماهنگ کرده، چرخه‌های توسعه فنی را با تقاضای واقعی بازار همسو می‌سازم.",
        'ps': "د پاکستان په اسلام اباد کې د علومو او ټکنالوجۍ له ملي پوهنتون (NUST) څخه د اقتصاد په برخه کې د لیسانس په ترلاسه کولو سره، زه د تحلیلي او مالي لید له لارې د سازمانونو مشري کوم، تخنیکي او مالي ټیمونه همغږي کوم او چارې پرمخ وړم.",
        'ru': "Окончив престижный Национальный университет науки и технологий (NUST) в Исламабаде со степенью бакалавра экономики, я подхожу к руководству через аналитическую и финансовую призму, координируя команды разработчиков, аналитиков и корпоративных клиентов.",
        'tr': "İslamabad'daki saygın Ulusal Bilim ve Teknoloji Üniversitesi'nden (NUST) Ekonomi lisans derecesiyle mezun olarak kurumsal liderliğe analitik ve makro-finansal bir bakış açısıyla yaklaşıyor, mühendislik sprintlerini pazar talebiyle hizalıyorum.",
        'de': "Mit einem Bachelor in Wirtschaftswissenschaften der renommierten NUST in Islamabad führe ich Teams mit analytischer Weitsicht und stimme Entwicklungssprints mit den Anforderungen globaler Märkte ab.",
        'fr': "Diplômée d'un Bachelor en économie de la prestigieuse université NUST à Islamabad, j'aborde le leadership d'entreprise sous un angle analytique et macro-financier, alignant les sprints techniques sur les besoins du marché.",
        'ar': "تخرجت بدرجة البكالوريوس في الاقتصاد من جامعة العلوم والتكنولوجيا الوطنية المرموقة (NUST) في إسلام أباد، وأقود العمل المؤسسي بنظرة تحليلية واقتصادية شاملة تجمع بين فرق التطوير واحتياجات السوق.",
        'ur': "اسلام آباد کی نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی (NUST) سے معاشیات میں بیچلرز کے ساتھ، میں تجزیاتی اور مالیاتی نقطہ نظر سے کارپوریٹ قیادت کرتی ہوں اور ترقیاتی ٹیموں کو ہم آہنگ کرتی ہوں۔",
        'es': "Graduada con una licenciatura en Economía de la prestigiosa NUST en Islamabad, abordo el liderazgo corporativo desde una perspectiva analítica y macrofinanciera, coordinando equipos multidisciplinarios.",
        'zh': "毕业于伊斯兰堡著名的国立科技大学（NUST）经济学学士学位，我以严谨的计量经济学视角执掌企业治理，统筹跨部门研发周期与国际市场需求的无缝对接。",
        'hi': "इस्लामाबाद में प्रतिष्ठित NUST से अर्थशास्त्र में स्नातक, मैं विश्लेषणात्मक दृष्टिकोण के माध्यम से कॉर्पोरेट नेतृत्व का संचालन करती हूं और विकास टीमों को बाजार की मांग के साथ संरेखित करती हूं।",
        'it': "Laureata in Economia presso la rinomata NUST a Islamabad, guido la leadership aziendale attraverso una lente analitica e macro-finanziaria, coordinando team e sprint di sviluppo.",
        'pt': "Licenciada em Economia pela prestigiada NUST em Islamabad, abordo a liderança corporativa através de uma perspetiva analítica e macrofinanceira, alinhando engenharia e procura de mercado.",
        'ja': "パキスタン・イスラマバードの名門NUST（国立科学技術大学）経済学部を卒業。計量経済学とマクロ金融の視点から組織を統率し、開発スプリントと市場需要を完全に同期させています。",
        'ko': "파키스탄 이슬라마바드의 명문 NUST(국립과학기술대학교) 경제학 학사를 졸업하여 분석적 거시금융 관점으로 기업 거버넌스를 이끌고, 개발 스프린트와 시장 수요를 정밀하게 조율합니다.",
        'nl': "Afgestudeerd in economie aan de prestigieuze NUST in Islamabad, benader ik leiderschap analytisch en stem ik ontwikkelsprints naadloos af op de markt.",
        'uz': "Islomoboddagi nufuzli NUST universitetining iqtisodiyot bakalavriatini tamomlab, korporativ boshqaruvga chuqur tahliliy va moliyaviy yondashuv bilan rahbarlik qilaman.",
        'id': "Lulus dengan gelar Sarjana Ekonomi dari NUST yang bergengsi di Islamabad, saya memimpin korporat dengan pendekatan analitis dan makro-finansial, menyelaraskan rekayasa dengan permintaan pasar."
    }

    p3_dict = {
        'en': "Beyond corporate administration, I am an active Full-Stack Developer and Graphic Designer. Having architected complete web platforms with Next.js, TypeScript, and Python, I maintain intimate knowledge of the codebases our teams ship, ensuring that every interface under the Safi banner achieves an uncompromising standard of elegance, performance, and accessibility.",
        'fa': "فراتر از مدیریت اداری، من به عنوان توسعه‌دهنده فول‌استک و طراح گرافیک فعالیت می‌کنم. با معماری پلتفرم‌های مدرن وب با Next.js، TypeScript و Python، تسلطی عمیق بر کدهای تولیدی تیم‌هایمان دارم تا اطمینان حاصل کنم که هر پلتفرم تحت نشان صافی به بالاترین استانداردهای زیبایی، سرعت و دسترسی جهانی دست می‌یابد.",
        'ps': "د اداري مدیریت ترڅنګ، زه یوه مسلکي بشپړه پروګرامره او ګرافیک ډیزاینره یم. د Next.js، TypeScript او Python په کارولو سره د ویب پلتفارمونو په جوړولو سره، زه ډاډ ترلاسه کوم چې د صافي هر محصول د نړیوال کیفیت، ښکلا او چټکتیا لوړو معیارونو ته رسي.",
        'ru': "Помимо управления, я практикующий full-stack разработчик и графический дизайнер. Проектируя веб-платформы на Next.js, TypeScript и Python, я гарантирую, что каждый продукт под брендом Safi отвечает высшим стандартам элегантности, производительности и доступности.",
        'tr': "Kurumsal yönetimin ötesinde aktif bir Full-Stack Geliştirici ve Grafik Tasarımcısıyım. Next.js, TypeScript ve Python ile eksiksiz web platformları inşa ederek, Safi çatısı altındaki her arayüzün tavizsiz zarafet, performans ve erişilebilirlik standartlarına ulaşmasını sağlıyorum.",
        'de': "Über das Management hinaus bin ich aktive Full-Stack-Entwicklerin und Designerin. Durch Architekturen mit Next.js, TypeScript und Python stelle ich sicher, dass jedes Safi-Produkt höchste Standards in Eleganz und Performance erfüllt.",
        'fr': "Au-delà de la gestion d'entreprise, je suis développeuse Full-Stack et designer graphique. En concevant des plateformes avec Next.js, TypeScript et Python, je veille à ce que chaque interface Safi atteigne des standards d'élégance et d'accessibilité sans compromis.",
        'ar': "إلى جانب الإدارة المؤسسية، أعمل كمطورة برمجيات شاملة ومصممة جرافيك. ومع هندسة منصات الويب الحديثة باستخدام Next.js وTypeScript وPython، أضمن أن كل واجهة تحت مظلة صافي ترتقي لأعلى معايير الأناقة والسرعة وسهولة الوصول.",
        'ur': "انتظامی ذمہ داریوں کے علاوہ، میں ایک فعال فل اسٹیک ڈویلپر اور گرافک ڈیزائنر ہوں۔ Next.js، TypeScript اور Python کے ساتھ پلیٹ فارمز تشکیل دے کر میں اس بات کو یقینی بناتی ہوں کہ صافی کا ہر پروڈکٹ اعلیٰ معیار اور کارکردگی پر پورا اترے۔",
        'es': "Más allá de la administración, soy desarrolladora Full-Stack y diseñadora gráfica. Al crear plataformas web con Next.js, TypeScript y Python, garantizo que cada interfaz bajo la marca Safi cumpla con estándares de elegancia y rendimiento sin concesiones.",
        'zh': "除宏观行政决策外，我亦是一名资深全栈工程师与界面设计师。通过亲自使用Next.js、TypeScript与Python构建完整的前沿数字化平台，我确保萨菲旗下的每一处交互界面均达到优雅美学、极致性能与无障碍体验的顶级工业标准。",
        'hi': "कॉर्पोरेट प्रशासन से परे, मैं एक सक्रिय फुल-स्टैक डेवलपर और डिज़ाइनर हूं। Next.js, TypeScript और Python के साथ वेब प्लेटफॉर्म बनाकर, मैं सुनिश्चित करती हूं कि सफ़ी का प्रत्येक इंटरफ़ेस सुंदरता और प्रदर्शन के उच्चतम मानकों को पूरा करे।",
        'it': "Oltre all'amministrazione aziendale, sono una sviluppatrice Full-Stack e Graphic Designer. Progettando piattaforme con Next.js, TypeScript e Python, garantisco che ogni interfaccia Safi raggiunga standard di eleganza e prestazioni senza compromessi.",
        'pt': "Para além da administração corporativa, sou programadora Full-Stack e designer gráfica. Ao conceber plataformas web com Next.js, TypeScript e Python, asseguro que cada interface Safi atinge padrões intransigentes de elegância e desempenho.",
        'ja': "経営管理にとどまらず、現役のフルスタック・エンジニアおよびデザイナーとしても従事。Next.js、TypeScript、Pythonによるウェブ基盤設計を自ら手掛け、サフィ傘下の全インターフェースにおける美学、性能、アクセシビリティの最高峰を担保しています。",
        'ko': "기업 경영을 넘어 활동적인 풀스택 개발자이자 디자이너로서 Next.js, TypeScript, Python 기반의 플랫폼 아키텍처를 직접 구축하며, 사피 브랜드의 모든 제품이 타협 없는 우아함과 성능 표준을 달성하도록 이끌고 있습니다.",
        'nl': "Naast algemeen beheer ben ik actief full-stack ontwikkelaar en ontwerper. Met Next.js, TypeScript en Python zorg ik ervoor dat elk Safi-platform aan de hoogste eisen van elegantie en prestatie voldoet.",
        'uz': "Ma'muriy boshqaruvdan tashqari, men faol full-stack dasturchi va grafik dizaynerman. Next.js, TypeScript va Python platformalarini yaratib, Safiy mahsulotlarining yuqori estetik va texnik standartlarga mosligini ta'minlayman.",
        'id': "Di luar administrasi korporat, saya adalah pengembang Full-Stack aktif dan desainer grafis. Merancang platform web dengan Next.js, TypeScript, dan Python, saya memastikan setiap antarmuka Safi mencapai standar keanggunan dan kinerja tanpa kompromi."
    }

    return {
        'manifestoP1': p1_dict.get(loc, p1_dict['en']),
        'manifestoP2': p2_dict.get(loc, p2_dict['en']),
        'manifestoP3': p3_dict.get(loc, p3_dict['en'])
    }
