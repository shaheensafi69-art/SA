# -*- coding: utf-8 -*-
from data_common import LOCALES

def get_shaheen(loc):
    names = {
        'en': ('Shaheen', 'Safi'), 'fa': ('شاهین', 'صافی'), 'ps': ('شاهین', 'صافي'),
        'ru': ('Шахин', 'Сафи'), 'tr': ('Şahin', 'Safi'), 'de': ('Shaheen', 'Safi'),
        'fr': ('Shaheen', 'Safi'), 'ar': ('شاهين', 'صافي'), 'ur': ('شاہین', 'صافی'),
        'es': ('Shaheen', 'Safi'), 'zh': ('沙欣', '萨菲'), 'hi': ('शाहीन', 'सफी'),
        'it': ('Shaheen', 'Safi'), 'pt': ('Shaheen', 'Safi'), 'ja': ('シャヒーン', 'サフィ'),
        'ko': ('샤힌', '사피'), 'nl': ('Shaheen', 'Safi'), 'uz': ('Shahin', 'Safiy'), 'id': ('Shaheen', 'Safi')
    }
    first, last = names.get(loc, ('Shaheen', 'Safi'))
    full = f"{first} {last}" if loc != 'zh' else f"{first}·{last}"

    roles = {
        'en': "Director & Founder", 'fa': "دایرکتور و بنیان‌گذار", 'ps': "ډایرکټر او بنسټ ایښودونکی",
        'ru': "Директор и основатель", 'tr': "Direktör ve Kurucu", 'de': "Direktor & Gründer",
        'fr': "Directeur & Fondateur", 'ar': "المدير والمؤسس", 'ur': "ڈائریکٹر اور بانی",
        'es': "Director y Fundador", 'zh': "董事兼创始人", 'hi': "निदेशक और संस्थापक",
        'it': "Direttore e Fondatore", 'pt': "Diretor e Fundador", 'ja': "ディレクター兼創業者",
        'ko': "총괄 이사 및 창립자", 'nl': "Directeur & Oprichter", 'uz': "Direktor va Asoschi", 'id': "Direktur & Pendiri"
    }

    bios = {
        'en': "Director, Founder & Lead Fintech Systems Architect of the Safi Global Ecosystem.",
        'fa': "دایرکتور، بنیان‌گذار اکوسیستم جهانی صافی و معمار ارشد سیستم‌های فین‌تک بین‌المللی.",
        'ps': "ډایرکټر، د صافي نړیوال ایکوسیستم بنسټ ایښودونکی او د فینټیک سیسټمونو مخکښ معمار.",
        'ru': "Директор, основатель глобальной экосистемы Safi и ведущий архитектор финтех-систем.",
        'tr': "Direktör, Safi Küresel Ekosistemi Kurucusu ve Lider FinTech Sistemleri Mimarı.",
        'de': "Direktor, Gründer und leitender Fintech-Systemarchitekt des globalen Safi-Ökosystems.",
        'fr': "Directeur, Fondateur et Architecte Principal des Systèmes Fintech de l'Écosystème Mondial Safi.",
        'ar': "المدير والمؤسس لمنظومة صافي العالمية وكبير مهندسي أنظمة التكنولوجيا المالية.",
        'ur': "ڈائریکٹر، صافی گلوبل ایکو سسٹم کے بانی اور معروف فین ٹیک سسٹمز آرکیٹیکٹ۔",
        'es': "Director, Fundador y Arquitecto Principal de Sistemas Fintech del Ecosistema Global Safi.",
        'zh': "萨菲全球生态系统董事、创始人兼首席金融科技系统架构师。",
        'hi': "सफी ग्लोबल इकोसिस्टम के निदेशक, संस्थापक और प्रमुख फिनटेक सिस्टम आर्किटेक्ट।",
        'it': "Direttore, Fondatore e Capo Architetto dei Sistemi Fintech dell'Ecosistema Globale Safi.",
        'pt': "Diretor, Fundador e Arquiteto Líder de Sistemas Fintech do Ecossistema Global Safi.",
        'ja': "サフィ・グローバル・エコシステムのディレクター、創業者兼リードFinTechシステムアーキテクト。",
        'ko': "사피 글로벌 에코시스템의 총괄 이사, 창립자 및 수석 핀테크 시스템 아키텍트.",
        'nl': "Directeur, Oprichter & Hoofd Fintech Systeemarchitect van het Wereldwijde Safi Ecosysteem.",
        'uz': "Direktor, Safiy global ekotizimi asoschisi va yetakchi FinTech tizimlari me'mori.",
        'id': "Direktur, Pendiri & Kepala Arsitek Sistem Fintech dari Ekosistem Global Safi."
    }

    offices = {
        'en': "Executive Office • London / Kabul", 'fa': "دفتر اجرایی • لندن / کابل", 'ps': "اجرایوي دفتر • لندن / کابل",
        'ru': "Исполнительный офис • Лондон / Кабул", 'tr': "Yönetici Ofisi • Londra / Kabil", 'de': "Vorstandsbüro • London / Kabul",
        'fr': "Bureau Exécutif • Londres / Kaboul", 'ar': "المكتب التنفيذي • لندن / كابول", 'ur': "ایگزیکٹو آفس • لندن / کابل",
        'es': "Oficina Ejecutiva • Londres / Kabul", 'zh': "行政办公室 • 伦敦 / 喀布尔", 'hi': "कार्यकारी कार्यालय • लंदन / काबुल",
        'it': "Ufficio Esecutivo • Londra / Kabul", 'pt': "Gabinete Executivo • Londres / Cabul", 'ja': "エグゼクティブオフィス • ロンドン / カブール",
        'ko': "집무실 • 런던 / 카불", 'nl': "Bestuurskantoor • Londen / Kabul", 'uz': "Ijroiya idorasi • London / Qobil", 'id': "Kantor Eksekutif • London / Kabul"
    }

    coordinates = {
        'en': "London, UK & Kabul, AFG", 'fa': "لندن، بریتانیا و کابل، افغانستان", 'ps': "لندن، انګلستان او کابل، افغانستان",
        'ru': "Лондон, Великобритания и Кабул, Афганистан", 'tr': "Londra, Birleşik Krallık & Kabil, Afganistan", 'de': "London, UK & Kabul, AFG",
        'fr': "Londres, Royaume-Uni & Kaboul, Afghanistan", 'ar': "لندن، المملكة المتحدة وكابول، أفغانستان", 'ur': "لندن، برطانیہ اور کابل، افغانستان",
        'es': "Londres, Reino Unido y Kabul, Afganistán", 'zh': "英国伦敦与阿富汗喀布尔", 'hi': "लंदन, यूके और काबुल, अफगानिस्तान",
        'it': "Londra, Regno Unito e Kabul, Afghanistan", 'pt': "Londres, Reino Unido e Cabul, Afeganistão", 'ja': "英国ロンドン＆アフガニスタン・カブール",
        'ko': "영국 런던 및 아프가니스탄 카불", 'nl': "Londen, VK & Kabul, AFG", 'uz': "London, Buyuk Britaniya va Qobil, Afg'oniston", 'id': "London, Inggris & Kabul, Afganistan"
    }

    badgeArchitects = {
        'en': "Lead Architect", 'fa': "معمار ارشد سیستم‌ها", 'ps': "د سیسټمونو مشر معمار",
        'ru': "Главный архитектор систем", 'tr': "Baş Mimar", 'de': "Chefarchitekt",
        'fr': "Architecte Principal", 'ar': "كبير مهندسي النظم", 'ur': "چیف سسٹم آرکیٹیکٹ",
        'es': "Arquitecto Principal", 'zh': "首席架构师", 'hi': "प्रमुख वास्तुकार",
        'it': "Capo Architetto", 'pt': "Arquiteto Principal", 'ja': "リードアーキテクト",
        'ko': "수석 아키텍트", 'nl': "Hoofdarchitect", 'uz': "Bosh arxitektor", 'id': "Arsitek Utama"
    }

    badgeFintechs = {
        'en': "Full-Stack FinTech", 'fa': "فول‌استک فین‌تک", 'ps': "فول سټیک فنټیک",
        'ru': "Full-Stack FinTech", 'tr': "Full-Stack FinTech", 'de': "Full-Stack FinTech",
        'fr': "FinTech Full-Stack", 'ar': "فنتك متكامل", 'ur': "فل اسٹیک فن ٹیک",
        'es': "FinTech Full-Stack", 'zh': "全栈金融科技", 'hi': "फुल-स्टैक फिनटेक",
        'it': "FinTech Full-Stack", 'pt': "FinTech Full-Stack", 'ja': "フルスタックFinTech",
        'ko': "풀스택 핀테크", 'nl': "Full-Stack FinTech", 'uz': "Full-Stack FinTech", 'id': "FinTech Full-Stack"
    }

    manifestoTitles = {
        'en': "Architectural Directive & Executive Manifesto",
        'fa': "دستورالعمل معماری و بیانیه اجرایی",
        'ps': "د معمارۍ لارښود او اجرایوي اعلامیه",
        'ru': "Архитектурная директива и исполнительный манифест",
        'tr': "Mimari Direktif ve Yönetici Manifestosu",
        'de': "Architekturrichtlinie & Führungskräfte-Manifest",
        'fr': "Directive Architecturale & Manifeste Exécutif",
        'ar': "التوجيه المعماري والبيان التنفيذي",
        'ur': "آرکیٹیکچرل ہدایت نامہ اور ایگزیکٹو منشور",
        'es': "Directiva Arquitectónica y Manifiesto Ejecutivo",
        'zh': "架构指令与执行宣言",
        'hi': "वास्तुशिल्प निर्देश और कार्यकारी घोषणापत्र",
        'it': "Direttiva Architetturale e Manifesto Esecutivo",
        'pt': "Diretiva Arquitetural e Manifesto Executivo",
        'ja': "アーキテクチャ方針とエグゼクティブ・マニフェスト",
        'ko': "아키텍처 지침 및 경영진 선언문",
        'nl': "Architectonische Richtlijn & Uitvoerend Manifest",
        'uz': "Arxitektura yo'riqnomasi va Ijroiya manifesti",
        'id': "Direktif Arsitektur & Manifes Eksekutif"
    }

    quotes = {
        'en': "\"We did not establish Safi Academy and SafiPay merely to participate in the digital economy—we founded them to build an unassailable financial and educational bridge connecting Afghan youth and global scholars directly with European and American enterprise markets.\"",
        'fa': "«ما آکادمی صافی و صافی‌پی را تنها برای حضور در اقتصاد دیجیتال تأسیس نکردیم؛ هدف ما ساختن پلی استوار و تسخیرناپذیر از آموزش و زیرساخت مالی بود تا جوانان و دانش‌پژوهان را مستقیماً به بازارهای سازمانی اروپا و آمریکا متصل سازیم.»",
        'ps': "«موږ صافي اکاډمي او صافي‌پي یوازې په ډیجیټل اقتصاد کې د شتون لپاره نه دي جوړ کړي؛ زموږ موخه د زده کړې او مالي زیربنا یو نه ماتیدونکی پل جوړول و ترڅو افغان ځوانان او نړیوال محصلین مستقیم د اروپا او امریکا سازماني بازارونو سره ونښلوي.»",
        'ru': "«Мы создали Safi Academy и SafiPay не просто для участия в цифровой экономике — мы основали их, чтобы построить несокрушимый финансовый и образовательный мост, соединяющий молодежь и исследователей напрямую с рынками Европы и Америки.»",
        'tr': "\"Safi Academy ve SafiPay'i yalnızca dijital ekonomide yer almak için kurmadık; amacımız gençleri doğrudan Avrupa ve Amerikan kurumsal pazarlarına bağlayan sarsılmaz bir eğitim ve finansal altyapı köprüsü inşa etmekti.\"",
        'de': "„Wir haben die Safi Academy und SafiPay nicht gegründet, um lediglich an der digitalen Wirtschaft teilzuhaben – wir haben sie aufgebaut, um eine unerschütterliche Bildungs- und Finanzbrücke zu europäischen und amerikanischen Märkten zu schaffen.“",
        'fr': "« Nous n'avons pas fondé la Safi Academy et SafiPay simplement pour participer à l'économie numérique — nous les avons créées pour bâtir un pont éducatif et financier inébranlable vers les marchés européens et américains. »",
        'ar': "«لم نؤسس أكاديمية صافي وصافي بي لمجرد التواجد في الاقتصاد الرقمي، بل أنشأناهما لبناء جسر تعليمي ومالي متين يربط الشباب والباحثين مباشرة بأسواق المؤسسات الأوروبية والأمريكية.»",
        'ur': "«ہم نے صافی اکیڈمی اور صافی پے صرف ڈیجیٹل معیشت میں شرکت کے لیے قائم نہیں کیے؛ بلکہ ہمارا مقصد ایک ناقابل تسخیر تعلیمی اور مالی پل بنانا تھا جو نوجوانوں کو براہ راست یورپی اور امریکی منڈیوں سے جوڑے۔»",
        'es': "«No fundamos Safi Academy y SafiPay solo para estar en la economía digital: las creamos para construir un puente educativo y financiero inquebrantable que conecte directamente con los mercados corporativos de Europa y América.»",
        'zh': "“我们创立萨菲学院和SafiPay不仅是为了参与数字经济——我们的使命是架起一座坚不可摧的教育与金融桥梁，将青年学子直接连接至欧美企业级市场。”",
        'hi': "«हमने सफी अकादमी और सफीपे की स्थापना केवल डिजिटल अर्थव्यवस्था में भाग लेने के लिए नहीं की—हमने इसे एक अटूट शैक्षिक और वित्तीय सेतु बनाने के लिए स्थापित किया जो युवाओं को सीधे यूरोपीय और अमेरिकी बाजारों से जोड़े।»",
        'it': "«Non abbiamo fondato Safi Academy e SafiPay solo per partecipare all'economia digitale: le abbiamo create per costruire un ponte educativo e finanziario incrollabile verso i mercati europei e americani.»",
        'pt': "«Não fundámos a Safi Academy e o SafiPay apenas para participar na economia digital: criámo-los para construir uma ponte educacional e financeira inabalável que conecta diretamente com os mercados europeus e americanos.»",
        'ja': "「私たちは単にデジタル経済に参加するためだけにサフィ・アカデミーとSafiPayを設立したのではなく、若者たちを欧米の企業市場に直接結びつける強固な教育と金融の架け橋を築くために創設しました。」",
        'ko': "\"우리는 단순히 디지털 경제에 참여하기 위해 사피 아카데미와 SafiPay를 설립한 것이 아닙니다. 청년들과 연구자들을 유럽과 미국의 기업 시장으로 직접 연결하는 확고한 금융 및 교육의 가교를 놓기 위해 창립했습니다.\"",
        'nl': "„We hebben Safi Academy en SafiPay niet opgericht om slechts deel te nemen aan de digitale economie – we hebben ze opgericht om een onwrikbare financiële en educatieve brug te bouwen naar Europese en Amerikaanse markten.”",
        'uz': "«Biz Safiy Academy va SafiPay'ni shunchaki raqamli iqtisodiyotda ishtirok etish uchun tashkil qilmadik; maqsadimiz yoshlarni to'g'ridan-to'g'ri Yevropa va Amerika korporativ bozorlariga bog'lovchi mustahkam ta'lim va moliya ko'prigini qurish edi.»",
        'id': "«Kami mendirikan Safi Academy dan SafiPay bukan hanya untuk berpartisipasi dalam ekonomi digital—kami mendirikannya untuk membangun jembatan pendidikan dan keuangan kokoh yang menghubungkan langsung dengan pasar Eropa dan Amerika.»"
    }

    quoteLocations = {
        'en': f"— {full} • London, United Kingdom",
        'fa': f"— {full} • لندن، بریتانیا",
        'ps': f"— {full} • لندن، انګلستان",
        'ru': f"— {full} • Лондон, Великобритания",
        'tr': f"— {full} • Londra, Birleşik Krallık",
        'de': f"— {full} • London, Vereinigtes Königreich",
        'fr': f"— {full} • Londres, Royaume-Uni",
        'ar': f"— {full} • لندن، المملكة المتحدة",
        'ur': f"— {full} • لندن، برطانیہ",
        'es': f"— {full} • Londres, Reino Unido",
        'zh': f"— {full} • 英国伦敦",
        'hi': f"— {full} • लंदन, यूनाइटेड किंगडम",
        'it': f"— {full} • Londra, Regno Unito",
        'pt': f"— {full} • Londres, Reino Unido",
        'ja': f"— {full} • 英国ロンドン",
        'ko': f"— {full} • 영국 런던",
        'nl': f"— {full} • Londen, Verenigd Koninkrijk",
        'uz': f"— {full} • London, Buyuk Britaniya",
        'id': f"— {full} • London, Inggris Raya"
    }

    return {
        'name': full,
        'firstName': first,
        'lastName': last,
        'role': roles.get(loc, roles['en']),
        'office': offices.get(loc, offices['en']),
        'coordinates': coordinates.get(loc, coordinates['en']),
        'badgeLead': badgeArchitects.get(loc, badgeArchitects['en']),
        'badgeFintech': badgeFintechs.get(loc, badgeFintechs['en']),
        'badgeFounder': roles.get(loc, roles['en']),
        'reg': "Safi International Capital LTD • UK Reg: 17063286",
        'bio': bios.get(loc, bios['en']),
        'manifestoTitle': manifestoTitles.get(loc, manifestoTitles['en']),
        'manifestoQuote': quotes.get(loc, quotes['en']),
        'manifestoAuthor': quoteLocations.get(loc, quoteLocations['en'])
    }
