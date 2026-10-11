# -*- coding: utf-8 -*-

def get_shaheen_full_sections(loc):
    # Manifesto paragraphs
    p1_dict = {
        'en': "My professional trajectory commenced in the high-stakes, volatile environment of international financial markets. Operating as a full-time trader across the Forex markets and foreign currency matrices from 2016 through late 2024, I developed a deep, visceral understanding of global liquidity flows, order-book dynamics, and institutional risk mitigation.",
        'fa': "مسیر حرفه‌ای من در محیط پرنوسان و حساس بازارهای مالی بین‌المللی آغاز شد. با فعالیت تمام‌وقت در بازارهای فارکس و ارزهای جهانی از سال ۲۰۱۶ تا اواخر ۲۰۲۴، درکی عمیق از جریان‌های نقدینگی جهانی، پویایی دفتر سفارشات و مدیریت ریسک‌های نهادی به دست آوردم.",
        'ps': "زما مسلکي یون د نړیوالو مالي بازارونو په لوړ خطر او حساس چاپیریال کې پیل شو. له ۲۰۱۶ څخه تر ۲۰۲۴ پورې د فاریکس او نړیوالو اسعارو په بازارونو کې د بشپړ وخت سوداګر په توګه، ما د نړیوال مایع جریان، د امرونو کتاب او اداري خطر مدیریت په اړه ژوره پوهه ترلاسه کړه.",
        'ru': "Мой профессиональный путь начался в динамичной и ответственной среде международных финансовых рынков. Работая штатным трейдером на рынках Форекс и мировых валют с 2016 по конец 2024 года, я приобрел глубокое понимание глобальных потоков ликвидности, динамики биржевого стакана и институционального управления рисками.",
        'tr': "Mesleki yolculuğum uluslararası finans piyasalarının yüksek tempolu ve değişken ortamında başladı. 2016'dan 2024 sonuna kadar Forex ve döviz piyasalarında tam zamanlı yatırımcı olarak küresel likidite akışları, emir defteri dinamikleri ve kurumsal risk yönetimi konularında derin bir uzmanlık kazandım.",
        'de': "Mein beruflicher Werdegang begann im hochvolatilen Umfeld der internationalen Finanzmärkte. Als Vollzeit-Händler an den Devisenmärkten von 2016 bis Ende 2024 erwarb ich ein tiefes Verständnis für globale Liquiditätsströme, Orderbuch-Dynamiken und institutionelles Risikomanagement.",
        'fr': "Mon parcours professionnel a débuté dans l'environnement hautement volatil des marchés financiers internationaux. En opérant comme trader à plein temps sur les marchés du Forex de 2016 à fin 2024, j'ai acquis une compréhension viscérale des flux mondiaux de liquidités, de la dynamique du carnet d'ordres et de l'atténuation des risques institutionnels.",
        'ar': "بدأت مسيرتي المهنية في البيئة سريعة التقلب للأسواق المالية الدولية. من خلال عملي كمتداول بدوام كامل في أسواق الفوركس والعملات الأجنبية من عام 2016 وحتى أواخر عام 2024، اكتسبت فهماً عميقاً لتدفقات السيولة العالمية وديناميكيات دفتر الأوامر وإدارة المخاطر المؤسسية.",
        'ur': "میرے پیشہ ورانہ سفر کا آغاز بین الاقوامی مالیاتی منڈیوں کے اتار چڑھاؤ والے ماحول سے ہوا۔ 2016 سے 2024 کے اواخر تک فاریکس اور غیر ملکی کرنسی مارکیٹوں میں کل وقتی تاجر کے طور پر، میں نے عالمی لیکویڈیٹی کے بہاؤ، آرڈر بک کی حرکیات اور ادارہ جاتی رسک مینجمنٹ کی گہری سمجھ حاصل کی۔",
        'es': "Mi trayectoria profesional comenzó en el entorno volátil y de alta exigencia de los mercados financieros internacionales. Al operar como operador a tiempo completo en Forex y divisas desde 2016 hasta finales de 2024, desarrollé una comprensión profunda de los flujos de liquidez global, las dinámicas del libro de órdenes y la mitigación de riesgos institucionales.",
        'zh': "我的职业生涯始于国际金融市场风起云涌的环境。从2016年到2024年底，作为外汇全职交易员，我对全球流动性流向、订单簿动态及机构风险对冲机制建立了深刻的洞察与实践经验。",
        'hi': "मेरा पेशेवर सफर अंतरराष्ट्रीय वित्तीय बाजारों के अत्यधिक गतिशील वातावरण में शुरू हुआ। 2016 से 2024 के अंत तक विदेशी मुद्रा और फॉरेक्स बाजारों में पूर्णकालिक ट्रेडर के रूप में, मैंने वैश्विक लिक्विडिटी प्रवाह, ऑर्डर बुक डायनामिक्स और संस्थागत जोखिम प्रबंधन की गहरी समझ विकसित की।",
        'it': "Il mio percorso professionale è iniziato nell'ambiente altamente volatile dei mercati finanziari internazionali. Operando come trader a tempo pieno sui mercati Forex dal 2016 a fine 2024, ho sviluppato una profonda comprensione dei flussi di liquidità globale, delle dinamiche del book di negoziazione e della mitigazione del rischio istituzionale.",
        'pt': "A minha trajetória profissional começou no ambiente dinâmico e de alta volatilidade dos mercados financeiros internacionais. Operando como trader a tempo inteiro em Forex de 2016 ao final de 2024, desenvolvi uma compreensão profunda dos fluxos de liquidez global, dinâmica do livro de ordens e mitigação de risco institucional.",
        'ja': "私のプロフェッショナルとしての道は、国際金融市場というボラティリティの高い環境から始まりました。2016年から2024年末まで為替市場の専業トレーダーとして活動し、グローバルな流動性フロー、オーダーブック構造、機関レベルのリスク管理に対する深い知見を培いました。",
        'ko': "저의 전문적 커리어는 국제 금융 시장의 역동적인 환경에서 시작되었습니다. 2016년부터 2024년 말까지 외환 시장의 전업 트레이더로 활동하며 글로벌 유동성 흐름, 오더북 메커니즘, 기관 리스크 헤지에 대한 깊은 통찰을 축적했습니다.",
        'nl': "Mijn professionele traject begon in de dynamische omgeving van internationale financiële markten. Als voltijds handelaar op valutamarkten van 2016 tot eind 2024 ontwikkelde ik een diepgaand inzicht in wereldwijde liquiditeitsstromen, orderboekdynamiek en institutioneel risicobeheer.",
        'uz': "Mening kasbiy yo'lim xalqaro moliya bozorlarining o'ta dinamik muhitida boshlandi. 2016-yildan 2024-yil oxirigacha Forex va valyuta bozorlarida to'liq vaqtli treyder sifatida global likvidlik oqimlari, orderlar kitobi dinamikasi va institutsional xavflarni boshqarish bo'yicha chuqur tajriba orttirdim.",
        'id': "Jejak profesional saya berawal di lingkungan pasar keuangan internasional yang dinamis dan berisiko tinggi. Beroperasi sebagai trader penuh waktu di pasar valuta asing sejak 2016 hingga akhir 2024, saya memahami secara mendalam arus likuiditas global, dinamika buku pesanan, dan manajemen risiko institusional."
    }

    p2_dict = {
        'en': "In December 2024, upon earning the prestigious International Technical Analysis Certification from IFTA (International Federation of Technical Analysts), I recognized that true financial sovereignty cannot be achieved through trading alone—it requires architecting the underlying digital conduits and enterprise software that process global transactions.",
        'fa': "در دسامبر ۲۰۲۴، پس از اخذ گواهینامه معتبر تحلیل تکنیکال بین‌المللی از فدراسیون بین‌المللی تحلیل‌گران تکنیکال (IFTA)، دریافتم که استقلال واقعی مالی تنها با معامله‌گری حاصل نمی‌شود؛ بلکه نیازمند معماری زیرساخت‌های دیجیتال و نرم‌افزارهای سازمانی پردازش تراکنش‌هاست.",
        'ps': "په دسمبر ۲۰۲۴ کې، د تخنیکي تحلیلګرانو له نړیوال فدراسیون (IFTA) څخه د معتبر نړیوال تخنیکي تحلیل سند ترلاسه کولو وروسته، زه پوه شوم چې ریښتینې مالي خپلواکي یوازې په سوداګرۍ نه ترلاسه کیږي؛ بلکه دا د ډیجیټل زیربناوو او تصدۍ سافټویرونو جوړولو ته اړتیا لري.",
        'ru': "В декабре 2024 года, получив престижный международный сертификат технического анализа от IFTA (Международная федерация технических аналитиков), я осознал, что истинный финансовый суверенитет недостижим лишь трейдингом — он требует проектирования фундаментальных цифровых каналов и корпоративного ПО для обработки глобальных транзакций.",
        'tr': "Aralık 2024'te, IFTA'dan (Uluslararası Teknik Analistler Federasyonu) prestijli Uluslararası Teknik Analiz Sertifikası'nı aldıktan sonra, gerçek finansal bağımsızlığın yalnızca alım satım yapmakla sağlanamayacağını, küresel işlemleri işleyen dijital kanalların ve kurumsal yazılımların inşa edilmesini gerektirdiğini kavradım.",
        'de': "Im Dezember 2024, nach Erhalt der renommierten Zertifizierung der IFTA (International Federation of Technical Analysts), erkannte ich, dass echte finanzielle Souveränität nicht allein durch Trading erreicht werden kann – sie erfordert die Architektur digitaler Transaktionsinfrastrukturen.",
        'fr': "En décembre 2024, après avoir obtenu la prestigieuse certification de l'IFTA (Fédération Internationale des Analystes Techniques), j'ai compris que la véritable souveraineté financière ne découle pas du seul trading, mais de l'architecture d'infrastructures numériques traitant les transactions mondiales.",
        'ar': "في ديسمبر 2024، وعقب نيلي شهادة التحليل الفني الدولية المرموقة من الاتحاد الدولي للمحللين الفنيين (IFTA)، أدركت أن السيادة المالية الحقيقية لا تتحقق بالتداول وحده، بل تتطلب هندسة القنوات الرقمية والبرمجيات المؤسسية التي تعالج المعاملات العالمية.",
        'ur': "دسمبر 2024 میں، انٹرنیشنل فیڈریشن آف ٹیکنیکل اینالسٹس (IFTA) سے باوقار بین الاقوامی سرٹیفیکیشن حاصل کرنے کے بعد، مجھے احساس ہوا کہ حقیقی مالیاتی خودمختاری صرف ٹریڈنگ سے حاصل نہیں کی جا سکتی، بلکہ اس کے لیے عالمی لین دین کو پروسیس کرنے والے ڈیجیٹل انفراسٹرکچر کی تعمیر ضروری ہے۔",
        'es': "En diciembre de 2024, tras obtener la prestigiosa Certificación Internacional de Análisis Técnico de la IFTA, comprendí que la verdadera soberanía financiera no se logra solo con el trading: requiere diseñar los conductos digitales y software empresarial que procesan transacciones globales.",
        'zh': "2024年12月，在荣获国际技术分析师联合会（IFTA）的权威专业资质后，我深刻意识到，真正的金融自主权绝不能仅靠交易获取，而是必须构建底层数字枢纽与处理全球跨境结算的企业级软件体系。",
        'hi': "दिसंबर 2024 में, IFTA (इंटरनेशनल फेडरेशन ऑफ टेक्निकल एनालिस्ट्स) से प्रतिष्ठित अंतरराष्ट्रीय तकनीकी विश्लेषण प्रमाणन प्राप्त करने के बाद, मैंने महसूस किया कि वास्तविक वित्तीय संप्रभुता केवल ट्रेडिंग से हासिल नहीं की जा सकती—इसके लिए डिजिटल बुनियादी ढांचे और सॉफ्टवेयर का निर्माण आवश्यक है।",
        'it': "Nel dicembre 2024, dopo aver conseguito la prestigiosa certificazione dall'IFTA (International Federation of Technical Analysts), ho compreso che la sovranità finanziaria non si ottiene solo col trading, ma richiede la progettazione di infrastrutture digitali che elaborano transazioni globali.",
        'pt': "Em dezembro de 2024, após obter a prestigiada Certificação Internacional de Análise Técnica da IFTA, percebi que a verdadeira soberania financeira não se alcança apenas com o trading: exige a arquitetura de infraestruturas digitais empresariais que processam transações globais.",
        'ja': "2024年12月、IFTA（国際テクニカルアナリスト連盟）の国際認定を取得した際、真の金融主権はトレード単体では達成できず、グローバル取引を処理する堅牢なデジタルインフラとエンタープライズ・ソフトウェアのアーキテクチャこそが不可欠であると確信しました。",
        'ko': "2024년 12월, IFTA(국제공인기술적분석가연맹)의 국제 자격을 취득한 후, 진정한 금융 주권은 트레이딩만으로 실현될 수 없으며 전 세계 거래를 처리하는 디지털 결제 인프라와 엔터프라이즈 소프트웨어 아키텍처를 직접 구축해야 함을 깨달았습니다.",
        'nl': "In december 2024, na het behalen van de IFTA-certificering, besefte ik dat echte financiële soevereiniteit niet enkel door handelen ontstaat – het vereist het ontwerpen van digitale infrastructuren en software voor wereldwijde transacties.",
        'uz': "2024-yil dekabrida IFTA xalqaro texnik tahlil sertifikatini qo'lga kiritgach, haqiqiy moliyaviy mustaqillik faqat treyding orqali emas, balki global tranzaksiyalarni qayta ishlovchi raqamli infratuzilma va dasturiy ta'minotni yaratish orqali amalga oshishini angladim.",
        'id': "Pada Desember 2024, setelah meraih Sertifikasi Analisis Teknikal Internasional dari IFTA, saya menyadari bahwa kedaulatan finansial sejati tidak dicapai melalui trading semata—melainkan membutuhkan perancangan infrastruktur digital dan perangkat lunak pemrosesan transaksi global."
    }

    p3_dict = {
        'en': "Holding a Bachelor of Computer Science degree from Istanbul Technical University (ITU), I integrate rigorous computational engineering with corporate vision. As Founder and Group CEO of Safi International Capital LTD, I lead the technical architecture and strategic trajectory of our key platforms: SafiPay Digital Banking, Safi TopUp Global, SafiPro International Apparel, and Safi Academy.",
        'fa': "با داشتن مدرک لیسانس علوم کامپیوتر از دانشگاه فنی استانبول (ITU)، مهندسی محاسباتی دقیق را با چشم‌انداز شرکتی تلفیق کرده‌ام. به عنوان بنیان‌گذار و مدیرعامل هلدینگ Safi International Capital LTD، هدایت معماری فنی پلتفرم‌های اصلی‌مان از جمله بانکداری دیجیتال صافی‌پی، صافی تاپ‌آپ، پوشاک بین‌المللی صافی‌پرو و آکادمی صافی را بر عهده دارم.",
        'ps': "د استانبول تخنیکي پوهنتون (ITU) څخه د کمپیوټر ساینس لیسانس په درلودلو سره، زه دقیق کمپیوټري انجینري له کارپوریټ لید سره یوځای کوم. د Safi International Capital LTD د بنسټ ایښودونکي او عمومي رییس په توګه، زه د صافي‌پی ډیجیټل بانکدارۍ، صافي ټاپ‌اپ، صافي‌پرو او صافي اکاډمۍ تخنیکي معمارۍ رهبري کوم.",
        'ru': "Имея степень бакалавра компьютерных наук Стамбульского технического университета (ITU), я объединяю строгую вычислительную инженерию с корпоративным видением. Как основатель и генеральный директор Safi International Capital LTD, я руковожу технической архитектурой платформ: SafiPay, Safi TopUp, SafiPro и Safi Academy.",
        'tr': "İstanbul Teknik Üniversitesi (İTÜ) Bilgisayar Mühendisliği lisans derecesine sahip olarak, titiz hesaplamalı mühendisliği kurumsal vizyonla birleştiriyorum. Safi International Capital LTD Kurucusu ve Grup CEO'su olarak SafiPay, Safi TopUp, SafiPro ve Safi Academy'nin teknik mimarisini yönetiyorum.",
        'de': "Mit einem Bachelor in Informatik der Technischen Universität Istanbul (ITU) verbinde ich rigorose Software-Architektur mit unternehmerischer Weitsicht. Als Gründer und Group CEO von Safi International Capital LTD leite ich die Plattformen SafiPay, Safi TopUp, SafiPro und Safi Academy.",
        'fr': "Titulaire d'un Bachelor en informatique de l'Université technique d'Istanbul (ITU), j'allie ingénierie rigoureuse et vision d'entreprise. En tant que fondateur et PDG de Safi International Capital LTD, je pilote l'architecture de SafiPay, Safi TopUp, SafiPro et Safi Academy.",
        'ar': "حاملاً لشهادة البكالوريوس في علوم الحاسوب من جامعة إسطنبول التقنية (ITU)، أدمج بين الهندسة الحوسبية الصارمة والرؤية المؤسسية. وبصفتي المؤسس والرئيس التنفيذي لمجموعة Safi International Capital LTD، أقود المعمارية التقنية لمنصاتنا: صافي بي، صافي توب أب، صافي برو، وأكاديمية صافي.",
        'ur': "استنبول ٹیکنیکل یونیورسٹی (ITU) سے کمپیوٹر سائنس میں بیچلرز کی ڈگری کے ساتھ، میں سخت کمپیوٹیشنل انجینئرنگ کو کارپوریٹ وژن کے ساتھ یکجا کرتا ہوں۔ Safi International Capital LTD کے بانی اور گروپ سی ای او کے طور پر، میں صافی پے، صافی ٹاپ اپ، صافی پرو اور صافی اکیڈمی کی تکنیکی رہنمائی کرتا ہوں۔",
        'es': "Con una licenciatura en Ciencias de la Computación de la Universidad Técnica de Estambul (ITU), fusiono la rigurosa ingeniería de software con la visión empresarial. Como Fundador y CEO de Safi International Capital LTD, lidero la arquitectura de SafiPay, Safi TopUp, SafiPro y Safi Academy.",
        'zh': "凭借伊斯坦布尔理工大学（ITU）计算机科学学士学位，我将严密的计算机工程体系与宏大企业愿景深度交融。作为Safi International Capital LTD的创始人兼集团CEO，我全面统领SafiPay、Safi TopUp、SafiPro与萨菲学院的底层架构与全球化航向。",
        'hi': "इस्तांबुल तकनीकी विश्वविद्यालय (ITU) से कंप्यूटर विज्ञान में स्नातक की डिग्री के साथ, मैं सटीक सॉफ्टवेयर इंजीनियरिंग को कॉर्पोरेट दृष्टि के साथ एकीकृत करता हूं। Safi International Capital LTD के संस्थापक और सीईओ के रूप में, मैं SafiPay, Safi TopUp, SafiPro और Safi Academy का नेतृत्व करता हूं।",
        'it': "Con una laurea in Informatica presso l'Università Tecnica di Istanbul (ITU), unisco una rigorosa ingegneria computazionale alla visione aziendale. In qualità di Fondatore e CEO di Safi International Capital LTD, guido l'architettura tecnica di SafiPay, Safi TopUp, SafiPro e Safi Academy.",
        'pt': "Com licenciatura em Ciências da Computação pela Universidade Técnica de Istambul (ITU), integro engenharia de ponta com visão corporativa. Como Fundador e CEO da Safi International Capital LTD, lidero a arquitetura técnica da SafiPay, Safi TopUp, SafiPro e Safi Academy.",
        'ja': "イスタンブール工科大学（ITU）のコンピュータサイエンス学士号を有し、厳格なソフトウェア工学と企業経営ビジョンを融合。Safi International Capital LTDの創業者兼グループCEOとして、SafiPay、Safi TopUp、SafiPro、Safi Academyの技術統括を指揮しています。",
        'ko': "이스탄불 공과대학교(ITU) 컴퓨터공학 학사 학위를 바탕으로 정밀한 공학 설계와 기업가적 비전을 결합했습니다. Safi International Capital LTD의 창립자이자 그룹 CEO로서 SafiPay, Safi TopUp, SafiPro 및 Safi Academy의 기술 아키텍처를 총괄하고 있습니다.",
        'nl': "Met een bachelordiploma in computerwetenschappen van de Technische Universiteit van Istanbul (ITU), combineer ik software-engineering met zakelijk inzicht. Als Oprichter en CEO van Safi International Capital LTD leid ik SafiPay, Safi TopUp, SafiPro en Safi Academy.",
        'uz': "Istanbul Texnika Universiteti (ITU) kompyuter fanlari bakalavriatiga ega bo'lib, chuqur hisoblash muhandisligini korporativ qarashlar bilan birlashtiraman. Safi International Capital LTD asoschisi va bosh direktori sifatida SafiPay, Safi TopUp, SafiPro va Safi Academy me'morchiligini boshqaraman.",
        'id': "Memegang gelar Sarjana Ilmu Komputer dari Istanbul Technical University (ITU), saya memadukan rekayasa komputasi yang ketat dengan visi korporat. Sebagai Pendiri dan CEO Safi International Capital LTD, saya memimpin arsitektur SafiPay, Safi TopUp, SafiPro, dan Safi Academy."
    }

    # Pillars
    def get_pillars(l):
        labels = {
            'p1': {
                'title': "SafiPay Digital Banking",
                'desc': {
                    'en': "Next-generation multi-currency financial infrastructure enabling instant physical and virtual Visa card issuance, SEPA Instant compliance, and seamless cross-border liquidity across 150+ countries.",
                    'fa': "زیرساخت مالی نوین چندارزی با قابلیت صدور آنی کارت‌های ویزا فیزیکی و مجازی، پشتیبانی از سامانه SEPA Instant و نقدینگی فرامرزی در بیش از ۱۵۰ کشور جهان.",
                    'ps': "د څو اسعارو نوې مالي زیربنا چې د فزیکي او مجازی ویزا کارتونو سمدستي صادرولو، د SEPA Instant ملاتړ او په څه باندې ۱۵۰ هیوادونو کې مالي نښلون برابروي.",
                    'ru': "Мультивалютная финансовая инфраструктура нового поколения с мгновенным выпуском физических и виртуальных карт Visa, поддержкой SEPA Instant и трансграничными платежами в 150+ странах.",
                    'tr': "Fiziki ve sanal Visa kart ihracı, SEPA Instant uyumluluğu ve 150'den fazla ülkede sınır ötesi likidite sağlayan yeni nesil çok para birimli finansal altyapı.",
                    'de': "Finanzinfrastruktur der nächsten Generation für sofortige physische und virtuelle Visa-Karten, SEPA-Instant und nahtlose Liquidität in über 150 Ländern.",
                    'fr': "Infrastructure financière multidevise de nouvelle génération permettant l'émission instantanée de cartes Visa physiques et virtuelles dans plus de 150 pays.",
                    'ar': "بنية تحتية مالية متعددة العملات تتيح الإصدار الفوري لبطاقات فيزا الفعلية والافتراضية، والتوافق مع نظام SEPA في أكثر من 150 دولة.",
                    'ur': "اگلی نسل کا کثیر کرنسی مالیاتی ڈھانچہ جو فوری فزیکل اور ورچوئل ویزا کارڈ کے اجراء، SEPA Instant اور 150 سے زائد ممالک میں لین دین کو ممکن بناتا ہے۔",
                    'es': "Infraestructura financiera multidivisa de última generación con emisión instantánea de tarjetas Visa físicas y virtuales y liquidez en más de 150 países.",
                    'zh': "新一代多币种金融级基础设施，支持实体与虚拟Visa卡极速签发、SEPA即时清算，并在全球150多个国家提供无缝跨境流动性。",
                    'hi': "अगली पीढ़ी का बहु-मुद्रा वित्तीय ढांचा जो त्वरित भौतिक और वर्चुअल वीज़ा कार्ड जारी करने और 150+ देशों में तरलता को सक्षम बनाता है।",
                    'it': "Infrastruttura finanziaria multivaluta di nuova generazione che consente l'emissione istantanea di carte Visa fisiche e virtuali in oltre 150 paesi.",
                    'pt': "Infraestrutura financeira multimoeda de última geração que permite a emissão instantânea de cartões Visa físicos e virtuais em mais de 150 países.",
                    'ja': "150か国以上で即時バーチャル＆リアルVisaカード発行、SEPA Instant準拠、シームレスな流動性を提供する次世代マルチ通貨決済基盤。",
                    'ko': "150개국 이상에서 실물 및 가상 Visa 카드 즉시 발급, SEPA Instant 규정 준수 및 원활한 국경 간 유동성을 제공하는 차세대 다중 통화 금융 인프라.",
                    'nl': "Financiële infrastructuur van de volgende generatie voor directe Visa-kaartuitgifte, SEPA Instant en naadloze liquiditeit in meer dan 150 landen.",
                    'uz': "150 dan ortiq mamlakatda jismoniy va virtual Visa kartalarini tezkor chiqarish, SEPA Instant va transchegaraviy to'lovlarni ta'minlovchi yangi avlod moliyaviy tizimi.",
                    'id': "Infrastruktur keuangan multi-mata uang generasi berikutnya yang memungkinkan penerbitan kartu Visa fisik dan virtual instan di 150+ negara."
                },
                'link': {
                    'en': "Explore SafiPay Protocol", 'fa': "بررسی پروتکل صافی‌پی", 'ps': "د صافي‌پی پروتوکول لیدل",
                    'ru': "Исследовать протокол SafiPay", 'tr': "SafiPay Protokolünü Keşfet", 'de': "SafiPay-Protokoll erkunden",
                    'fr': "Explorer le Protocole SafiPay", 'ar': "استكشف بروتوكول صافي بي", 'ur': "صافی پے پروٹوکول دیکھیں",
                    'es': "Explorar Protocolo SafiPay", 'zh': "探索SafiPay协议", 'hi': "SafiPay प्रोटोकॉल देखें",
                    'it': "Esplora il Protocollo SafiPay", 'pt': "Explorar Protocolo SafiPay", 'ja': "SafiPayプロトコルを見る",
                    'ko': "SafiPay 프로토콜 탐색", 'nl': "Verken SafiPay-protocol", 'uz': "SafiPay protokolini ko'rish", 'id': "Jelajahi Protokol SafiPay"
                }
            },
            'p2': {
                'title': "Safi TopUp Global",
                'desc': {
                    'en': "Instant digital settlement network connected to 700+ telecommunications operators worldwide, powering real-time mobile recharges, utility settlements, and international gaming pins.",
                    'fa': "شبکه تسویه دیجیتال متصل به بیش از ۷۰۰ اپراتور مخابراتی در سراسر جهان برای شارژ آنی تلفن همراه، پرداخت قبوض و پین‌های بازی بین‌المللی.",
                    'ps': "د ډیجیټل تادیاتو سمدستي شبکه چې په ټوله نړۍ کې له ۷۰۰ څخه زیاتو مخابراتي شبکو سره وصل ده د موبایل سمدستي ریچارج او مالي خدمتونو لپاره.",
                    'ru': "Сеть мгновенных цифровых расчетов, подключенная к 700+ телеком-операторам по всему миру для пополнения баланса и игровых карт.",
                    'tr': "Dünya çapında 700'den fazla telekom operatörüne bağlı, gerçek zamanlı mobil yüklemeler ve uluslararası dijital pinler sunan ağ.",
                    'de': "Sofortiges digitales Abrechnungsnetzwerk mit Anbindung an über 700 Telekommunikationsanbieter weltweit.",
                    'fr': "Réseau de règlement numérique instantané connecté à plus de 700 opérateurs de télécommunications dans le monde.",
                    'ar': "شبكة تسوية رقمية فورية متصلة بأكثر من 700 مشغل اتصالات حول العالم لشحن الهواتف وبطاقات الألعاب.",
                    'ur': "فوری ڈیجیٹل تصفیہ نیٹ ورک جو دنیا بھر کے 700 سے زائد ٹیلی کام آپریٹرز سے جڑا ہوا ہے موبائل ریچارج کے لیے۔",
                    'es': "Red de liquidación digital instantánea conectada a más de 700 operadores de telecomunicaciones en todo el mundo.",
                    'zh': "直连全球700多家电信运营商的即时数字结算网络，支持全球移动话费秒级充值与国际数字点卡核销。",
                    'hi': "त्वरित डिजिटल सेटलमेंट नेटवर्क जो मोबाइल रिचार्ज और गेमिंग पिन के लिए दुनिया भर के 700+ टेलीकॉम ऑपरेटरों से जुड़ा है।",
                    'it': "Rete di regolamento digitale istantaneo collegata a oltre 700 operatori di telecomunicazioni in tutto il mondo.",
                    'pt': "Rede de liquidação digital instantânea ligada a mais de 700 operadoras de telecomunicações em todo o mundo.",
                    'ja': "世界700社以上の通信キャリアと直結し、即時モバイルチャージや国際ゲームPINを提供するグローバル決済ネットワーク。",
                    'ko': "전 세계 700개 이상의 통신사와 연결되어 실시간 모바일 충전 및 게임 핀을 지원하는 즉시 정산 네트워크.",
                    'nl': "Direct digitaal afwikkelingsnetwerk verbonden met 700+ telecomproviders wereldwijd.",
                    'uz': "Dunyo bo'ylab 700 dan ortiq aloqa operatorlariga ulangan, mobil aloqa va o'yin pinlarini to'lash tarmog'i.",
                    'id': "Jaringan penyelesaian digital instan yang terhubung ke 700+ operator telekomunikasi di seluruh dunia."
                },
                'link': {
                    'en': "Explore Safi TopUp Network", 'fa': "بررسی شبکه صافی تاپ‌آپ", 'ps': "د صافي ټاپ‌اپ شبکه لیدل",
                    'ru': "Исследовать сеть Safi TopUp", 'tr': "Safi TopUp Ağını Keşfet", 'de': "Safi TopUp-Netzwerk erkunden",
                    'fr': "Explorer le Réseau Safi TopUp", 'ar': "استكشف شبكة صافي توب أب", 'ur': "صافی ٹاپ اپ نیٹ ورک دیکھیں",
                    'es': "Explorar Red Safi TopUp", 'zh': "探索Safi TopUp网络", 'hi': "Safi TopUp नेटवर्क देखें",
                    'it': "Esplora la Rete Safi TopUp", 'pt': "Explorar Rede Safi TopUp", 'ja': "Safi TopUpネットワークを見る",
                    'ko': "Safi TopUp 네트워크 탐색", 'nl': "Verken Safi TopUp-netwerk", 'uz': "Safi TopUp tarmog'ini ko'rish", 'id': "Jelajahi Jaringan Safi TopUp"
                }
            },
            'p3': {
                'title': "Safi Academy",
                'desc': {
                    'en': "The flagship educational academy operating under UK company registration #17063286, offering verifiable certification across E-Commerce, Applied AI, Financial Markets, and 100% full-ride scholarships.",
                    'fa': "آکادمی آموزشی پیشرو تحت ثبت رسمی انگلستان با شماره ۱۷۰۶۳۲۸۶، ارائه‌دهنده مدارک بین‌المللی در حوزه‌های هوش مصنوعی، تجارت الکترونیک، بازارهای مالی و بورسیه‌های ۱۰۰٪ رایگان.",
                    'ps': "د بریتانیا تر ۱۷۰۶۳۲۸۶ رسمي ثبت لاندې مخکښ تعلیمي اکاډمي، چې په ای کامرس، مصنوعي استخباراتو، مالي بازارونو او ۱۰۰٪ وړیا بورسیو کې باوري سندونه وړاندې کوي.",
                    'ru': "Флагманская образовательная академия, зарегистрированная в Великобритании (№ 17063286), предлагающая сертифицированные курсы по ИИ, электронной коммерции и 100% стипендии.",
                    'tr': "İngiltere'de 17063286 numarasıyla tescilli, E-Ticaret, Yapay Zeka ve Finans Piyasalarında doğrulanabilir sertifikalar ve %100 burslar sunan öncü akademi.",
                    'de': "Die führende Bildungsakademie (UK-Reg. 17063286) mit verifizierbaren Zertifikaten in KI, E-Commerce und Finanzmärkten sowie 100% Vollstipendien.",
                    'fr': "L'académie éducative phare enregistrée au Royaume-Uni (#17063286), offrant des certifications vérifiables en IA, commerce électronique et bourses complètes à 100%.",
                    'ar': "الأكاديمية التعليمية الرائدة المسجلة في المملكة المتحدة برقم 17063286، وتقدم شهادات موثقة في التجارة الإلكترونية والذكاء الاصطناعي ومنحاً دراسية كاملة 100%.",
                    'ur': "برطانیہ میں رجسٹرڈ (#17063286) تعلیمی اکیڈمی جو ای کامرس، اپلائیڈ اے آئی اور فنانشل مارکیٹس میں تصدیق شدہ سرٹیفکیٹس اور 100% وظائف پیش کرتی ہے۔",
                    'es': "La academia insignia registrada en el Reino Unido (#17063286), que ofrece certificaciones verificables en comercio electrónico, IA y becas completas del 100%.",
                    'zh': "在英国官方注册（注册号：17063286）的旗舰级教育学府，提供电子商务、应用AI、金融衍生品可信认证及100%全额全奖奖学金体系。",
                    'hi': "यूके कंपनी पंजीकरण #17063286 के तहत संचालित प्रमुख अकादमी, जो ई-कॉमर्स, एआई और वित्तीय बाजारों में 100% छात्रवृत्ति और प्रमाणन प्रदान करती है।",
                    'it': "L'accademia educativa registrata nel Regno Unito (#17063286), che offre certificazioni verificabili in e-commerce, intelligenza artificiale e borse di studio al 100%.",
                    'pt': "A academia de referência registada no Reino Unido (#17063286), oferecendo certificações verificáveis em comércio eletrónico, IA e bolsas 100% integrais.",
                    'ja': "英国法人番号17063286の下で運営される旗艦教育機関。Eコマース、応用AI、金融市場の公式認証および100%全額免除奨学金を提供。",
                    'ko': "영국 공식 등록(#17063286) 하에 이커머스, 응용 AI, 금융 시장 전반의 검증 가능한 자격증과 100% 전액 장학금을 제공하는 교육 기관.",
                    'nl': "De toonaangevende academie geregistreerd in het VK (#17063286) met verifieerbare certificaten in e-commerce, AI en 100% beurzen.",
                    'uz': "Buyuk Britaniyada ro'yxatdan o'tgan (№ 17063286) yetakchi ta'lim akademiyasi: sun'iy intellekt, e-tijorat va moliya bo'yicha 100% to'liq grantlar.",
                    'id': "Akademi pendidikan unggulan berbadan hukum Inggris (#17063286), menawarkan sertifikasi terverifikasi dalam E-Commerce, AI, dan beasiswa penuh 100%."
                },
                'link': {
                    'en': "View Academic Faculties", 'fa': "مشاهده دانشکده‌های آموزشی", 'ps': "د اکاډمیکو پوهنځیو لیدل",
                    'ru': "Смотреть академические факультеты", 'tr': "Akademik Fakülteleri İncele", 'de': "Akademische Fakultäten ansehen",
                    'fr': "Voir les Facultés Académiques", 'ar': "عرض الكليات الأكاديمية", 'ur': "تعلیمی فیکلٹیز دیکھیں",
                    'es': "Ver Facultades Académicas", 'zh': "查看各学术院系", 'hi': "अकादमिक संकाय देखें",
                    'it': "Visualizza le Facoltà Accademiche", 'pt': "Ver Faculdades Académicas", 'ja': "学部一覧を見る",
                    'ko': "학부 과정 보기", 'nl': "Bekijk academische faculteiten", 'uz': "Akademik fakultetlarni ko'rish", 'id': "Lihat Fakultas Akademik"
                }
            },
            'p4': {
                'title': "SafiPro Apparel",
                'desc': {
                    'en': "Premium developer and tech streetwear engineered with certified organic cotton, minimalist cyberpunk branding, and international carbon-neutral direct distribution.",
                    'fa': "برند تخصصی پوشاک مهندسی و لباس‌های توسعه‌دهندگان با کتان ارگانیک تاییدشده، طراحی مینیمال سایبرپانک و توزیع بدون واسطه بین‌المللی بدون آلایندگی کربنی.",
                    'ps': "د سافټویر جوړونکو او مسلکي کسانو لپاره ځانګړی کالي او جامې، چې له عضوي پنبې او نړیوال کیفیت سره جوړ شوي دي.",
                    'ru': "Премиальная одежда для разработчиков и гиков из органического хлопка с минималистичным киберпанк-стилем и глобальной доставкой.",
                    'tr': "Sertifikalı organik pamuk, minimalist siberpunk tasarımı ve uluslararası karbon-nötr dağıtımıyla geliştirici sokak modası.",
                    'de': "Premium-Streetwear für Entwickler aus zertifizierter Bio-Baumwolle mit minimalistischem Cyberpunk-Branding und weltweitem Vertrieb.",
                    'fr': "Streetwear haut de gamme pour développeurs conçu en coton biologique certifié, design cyber-minimaliste et distribution mondiale neutre en carbone.",
                    'ar': "أزياء عصرية راقية للمطورين مصنوعة من القطن العضوي المعتمد بتصميم سايبربانك وتوزيع عالمي محايد للكربون.",
                    'ur': "ڈویلپرز اور ٹیکنالوجی کے شوقین افراد کے لیے سرٹیفائیڈ آرگینک کاٹن اور سائبر پنک برانڈنگ پر مشتمل ملبوسات۔",
                    'es': "Ropa urbana premium para desarrolladores confeccionada con algodón orgánico certificado, estética ciberpunk y distribución neutra en carbono.",
                    'zh': "专为全球程序员与科技极客打造的高端潮流服饰，采用国际认证有机棉、极简赛博朋克美学设计与全球碳中和直配网络。",
                    'hi': "प्रमाणित जैविक कपास और न्यूनतम साइबरपंक ब्रांडिंग के साथ डेवलपर्स के लिए प्रीमियम स्ट्रीटवियर।",
                    'it': "Streetwear premium per sviluppatori realizzato con cotone biologico certificato, design cyberpunk minimalista e spedizione globale carbon-neutral.",
                    'pt': "Streetwear premium para programadores com algodão biológico certificado, estética cyberpunk minimalista e distribuição global neutra em carbono.",
                    'ja': "認証オーガニックコットン、ミニマル・サイバーパンクの意匠、カーボンニュートラルな国際配送を備えたエンジニア向けプレミアム・アパレル。",
                    'ko': "인증된 오가닉 코튼과 미니멀 사이버펑크 디자인으로 완성된 개발자 전용 프리미엄 스트리트웨어 및 글로벌 유통 브랜드.",
                    'nl': "Premium streetwear voor developers van biologisch katoen met een minimalistisch cyberpunk-design en wereldwijde verzending.",
                    'uz': "Dasturchilar uchun sertifikatlangan organik paxtadan tayyorlangan, minimalist dizayndagi premium kiyim-kechak brendi.",
                    'id': "Streetwear premium untuk pengembang yang dirancang dengan katun organik bersertifikat dan estetika cyberpunk minimalis."
                },
                'link': {
                    'en': "Explore SafiPro Apparel", 'fa': "بررسی پوشاک صافی‌پرو", 'ps': "د صافي‌پرو جامې لیدل",
                    'ru': "Исследовать SafiPro Apparel", 'tr': "SafiPro Giyimi Keşfet", 'de': "SafiPro-Bekleidung erkunden",
                    'fr': "Explorer SafiPro Apparel", 'ar': "استكشف أزياء صافي برو", 'ur': "صافی پرو دیکھیں",
                    'es': "Explorar Ropa SafiPro", 'zh': "探索SafiPro潮牌", 'hi': "SafiPro वस्त्र देखें",
                    'it': "Esplora SafiPro Apparel", 'pt': "Explorar SafiPro Apparel", 'ja': "SafiProアパレルを見る",
                    'ko': "SafiPro 의류 탐색", 'nl': "Verken SafiPro Apparel", 'uz': "SafiPro kiyimlarini ko'rish", 'id': "Jelajahi SafiPro Apparel"
                }
            }
        }
        res = []
        for k in ['p1', 'p2', 'p3', 'p4']:
            item = labels[k]
            res.append({
                'title': item['title'],
                'desc': item['desc'].get(l, item['desc']['en']),
                'linkText': item['link'].get(l, item['link']['en'])
            })
        return res

    # Tech Stack
    def get_tech_stack(l):
        titles = {
            't1': {
                'en': "Frontend & Mobile", 'fa': "فرانت‌اند و موبایل", 'ps': "فرنټ اینډ او موبایل",
                'ru': "Фронтенд и мобильная разработка", 'tr': "Ön Yüz ve Mobil", 'de': "Frontend & Mobile",
                'fr': "Frontend & Mobile", 'ar': "الواجهات الأمامية وتطبيقات الهاتف", 'ur': "فرنٹ اینڈ اور موبائل",
                'es': "Frontend y Móvil", 'zh': "前端与移动端架构", 'hi': "फ्रंटएंड और मोबाइल",
                'it': "Frontend e Mobile", 'pt': "Frontend e Mobile", 'ja': "フロントエンド＆モバイル",
                'ko': "프론트엔드 및 모바일", 'nl': "Frontend & Mobiel", 'uz': "Frontend va mobil dasturlash", 'id': "Frontend & Seluler"
            },
            't2': {
                'en': "Backend & Data", 'fa': "بک‌اند و پایگاه داده", 'ps': "بیک اینډ او ډیټابیس",
                'ru': "Бэкенд и базы данных", 'tr': "Arka Yüz ve Veri", 'de': "Backend & Datenbanken",
                'fr': "Backend & Données", 'ar': "الأنظمة الخلفية وقواعد البيانات", 'ur': "بیک اینڈ اور ڈیٹا بیس",
                'es': "Backend y Datos", 'zh': "后端架构与数据引擎", 'hi': "बैकएंड और डेटा",
                'it': "Backend e Dati", 'pt': "Backend e Dados", 'ja': "バックエンド＆データ",
                'ko': "백엔드 및 데이터 아키텍처", 'nl': "Backend & Gegevens", 'uz': "Backend va ma'lumotlar", 'id': "Backend & Data"
            },
            't3': {
                'en': "Network Security", 'fa': "امنیت شبکه و زیرساخت", 'ps': "د شبکې امنیت او زیربناوې",
                'ru': "Сетевая безопасность", 'tr': "Ağ Güvenliği", 'de': "Netzwerksicherheit",
                'fr': "Sécurité Réseau", 'ar': "أمن الشبكات والبنية التحتية", 'ur': "نیٹ ورک سیکیورٹی",
                'es': "Seguridad de Redes", 'zh': "网络安全与加密隧道", 'hi': "नेटवर्क सुरक्षा",
                'it': "Sicurezza di Rete", 'pt': "Segurança de Rede", 'ja': "ネットワークセキュリティ",
                'ko': "네트워크 보안 및 인프라", 'nl': "Netwerkbeveiliging", 'uz': "Tarmoq xavfsizligi", 'id': "Keamanan Jaringan"
            },
            't4': {
                'en': "Financial Markets", 'fa': "بازارهای مالی و فین‌تک", 'ps': "مالي بازارونه او فینټیک",
                'ru': "Финансовые рынки", 'tr': "Finansal Piyasalar", 'de': "Finanzmärkte",
                'fr': "Marchés Financiers", 'ar': "الأسواق المالية والتحليل الكمي", 'ur': "مالیاتی منڈیاں",
                'es': "Mercados Financieros", 'zh': "金融衍生品与量化算法", 'hi': "वित्तीय बाजार",
                'it': "Mercati Finanziari", 'pt': "Mercados Financeiros", 'ja': "金融市場＆クオンツ分析",
                'ko': "금융 시장 및 퀀트 트레이딩", 'nl': "Financiële Markten", 'uz': "Moliya bozorlari", 'id': "Pasar Keuangan"
            }
        }
        descs = {
            't1': "Next.js 14/15 App Router, React.js, TypeScript, Flutter, Dart, Tailwind CSS, Framer Motion.",
            't2': "PostgreSQL, Supabase Enterprise, Node.js, Python, Redis Caching, Microservices, REST & GraphQL.",
            't3': "Cisco IOS, Routing & Switching, Hardware Firewalls, Encrypted VPN Tunnels, SSL/TLS, ISO 27001.",
            't4': "Smart Money Concepts (SMC), Order Flow, IFTA Technical Analysis, Algorithmic Risk Execution."
        }
        return [
            {'title': titles['t1'].get(l, titles['t1']['en']), 'desc': descs['t1']},
            {'title': titles['t2'].get(l, titles['t2']['en']), 'desc': descs['t2']},
            {'title': titles['t3'].get(l, titles['t3']['en']), 'desc': descs['t3']},
            {'title': titles['t4'].get(l, titles['t4']['en']), 'desc': descs['t4']},
        ]

    return {
        'manifestoP1': p1_dict.get(loc, p1_dict['en']),
        'manifestoP2': p2_dict.get(loc, p2_dict['en']),
        'manifestoP3': p3_dict.get(loc, p3_dict['en']),
        'pillars': get_pillars(loc),
        'techStack': get_tech_stack(loc)
    }
