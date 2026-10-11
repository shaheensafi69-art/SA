# -*- coding: utf-8 -*-
from data_common import LOCALES

def get_mujtaba(loc):
    names = {
        'en': ('Mujtaba', 'Rahmani'), 'fa': ('مجتبی', 'رحمانی'), 'ps': ('مجتبی', 'رحماني'),
        'ru': ('Муджтаба', 'Рахмани'), 'tr': ('Mücteba', 'Rahmani'), 'de': ('Mujtaba', 'Rahmani'),
        'fr': ('Mujtaba', 'Rahmani'), 'ar': ('مجتبى', 'رحماني'), 'ur': ('مجتبیٰ', 'رحمانی'),
        'es': ('Mujtaba', 'Rahmani'), 'zh': ('穆吉塔巴', '拉赫马尼'), 'hi': ('मुजतबा', 'रहमानी'),
        'it': ('Mujtaba', 'Rahmani'), 'pt': ('Mujtaba', 'Rahmani'), 'ja': ('ムジタバ', 'ラフマニ'),
        'ko': ('무즈타바', '라흐مانی'), 'nl': ('Mujtaba', 'Rahmani'), 'uz': ('Mujtaba', 'Rahmoniy'), 'id': ('Mujtaba', 'Rahmani')
    }
    first, last = names.get(loc, ('Mujtaba', 'Rahmani'))
    full = f"{first} {last}" if loc != 'zh' else f"{first}·{last}"

    roles = {
        'en': "Chief Operating Officer (COO)",
        'fa': "مدیر ارشد عملیات (COO)",
        'ps': "د عملیاتو لوی مدیر (COO)",
        'ru': "Главный операционный директор (COO)",
        'tr': "Operasyon Direktörü (COO)",
        'de': "Chief Operating Officer (COO)",
        'fr': "Directeur des Opérations (COO)",
        'ar': "الرئيس التنفيذي للعمليات (COO)",
        'ur': "چیف آپریٹنگ آفیسر (سی او او)",
        'es': "Director de Operaciones (COO)",
        'zh': "首席运营官 (COO)",
        'hi': "मुख्य परिचालन अधिकारी (सीओओ)",
        'it': "Chief Operating Officer (COO)",
        'pt': "Diretor de Operações (COO)",
        'ja': "最高執行責任者 (COO)",
        'ko': "최고 운영 책임자 (COO)",
        'nl': "Chief Operating Officer (COO)",
        'uz': "Bosh operatsion direktor (COO)",
        'id': "Chief Operating Officer (COO)"
    }

    bios = {
        'en': "Chief Operating Officer of Safi Global Ecosystem, Enterprise Operations Director & Corporate Execution Lead.",
        'fa': "مدیر ارشد عملیات اکوسیستم جهانی صافی، راهبر عملیات سازمانی و مدیر اجرای استراتژیک شرکت.",
        'ps': "د صافي نړیوال ایکوسیستم د عملیاتو لوی مدیر، د تشبثاتو د عملیاتو مشر او د کارپوریټ پلي کولو لارښود.",
        'ru': "Главный операционный директор глобальной экосистемы Safi, директор по корпоративным операциям.",
        'tr': "Safi Küresel Ekosistemi Operasyon Direktörü, Kurumsal Operasyonlar ve Stratejik İcra Lideri.",
        'de': "Chief Operating Officer des globalen Safi-Ökosystems, Direktor für Unternehmensabläufe & strategische Umsetzung.",
        'fr': "Directeur des Opérations de l'Écosystème Mondial Safi, Directeur des Opérations d'Entreprise.",
        'ar': "الرئيس التنفيذي للعمليات لمنظومة صافي العالمية، مدير العمليات المؤسسية وقائد التنفيذ الاستراتيجي.",
        'ur': "صافی گلوبل ایکو سسٹم کے چیف آپریٹنگ آفیسر، انٹرپرائز آپریشنز ڈائریکٹر اور کارپوریٹ ایگزیکیوشن لیڈ۔",
        'es': "Director de Operaciones del Ecosistema Global Safi, Director de Operaciones Corporativas.",
        'zh': "萨菲全球生态系统首席运营官、企业级运营总监兼战略执行负责人。",
        'hi': "सफी ग्लोबल इकोसिस्टम के मुख्य परिचालन अधिकारी, एंटरप्राइज संचालन निदेशक और कॉर्पोरेट निष्पादन प्रमुख।",
        'it': "Chief Operating Officer dell'Ecosistema Globale Safi, Direttore delle Operazioni Aziendali.",
        'pt': "Diretor de Operações do Ecossistema Global Safi, Diretor de Operações Corporativas.",
        'ja': "サフィ・グローバル・エコシステム最高執行責任者、エンタープライズ・オペレーション・ディレクター。",
        'ko': "사피 글로벌 에코시스템 최고 운영 책임자(COO), 엔터프라이즈 운영 총괄 디렉터.",
        'nl': "Chief Operating Officer van het Wereldwijde Safi Ecosysteem, Directeur Bedrijfsvoering.",
        'uz': "Safiy global ekotizimi bosh operatsion direktori, korporativ operatsiyalar va strategik ijro rahbari.",
        'id': "Chief Operating Officer Ekosistem Global Safi, Direktur Operasi Perusahaan & Pemimpin Eksekusi Korporat."
    }

    offices = {
        'en': "Executive Operations • Kabul / Dubai", 'fa': "عملیات اجرایی • کابل / دبی", 'ps': "اجرایوي عملیات • کابل / دوبۍ",
        'ru': "Исполнительные операции • Кабул / Дубай", 'tr': "Yönetici Operasyonları • Kabil / Dubai", 'de': "Operative Führung • Kabul / Dubai",
        'fr': "Opérations Exécutives • Kaboul / Dubaï", 'ar': "العمليات التنفيذية • كابول / دبي", 'ur': "ایگزیکٹو آپریشنز • کابل / دبئی",
        'es': "Operaciones Ejecutivas • Kabul / Dubái", 'zh': "行政运营 • 喀布尔 / 迪拜", 'hi': "कार्यकारी संचालन • काबुल / दुबई",
        'it': "Operazioni Esecutive • Kabul / Dubai", 'pt': "Operações Executivas • Cabul / Dubai", 'ja': "エグゼクティブ・オペレーション • カブール / ドバイ",
        'ko': "운영 집무실 • 카불 / 두바이", 'nl': "Uitvoerende Operaties • Kabul / Dubai", 'uz': "Ijroiya operatsiyalari • Qobil / Dubay",
        'id': "Operasi Eksekutif • Kabul / Dubai"
    }

    coordinates = {
        'en': "Kabul, AFG & Dubai, UAE", 'fa': "کابل، افغانستان و دبی، امارات", 'ps': "کابل، افغانستان او دوبۍ، متحده امارات",
        'ru': "Кабул, Афганистан и Дубай, ОАЭ", 'tr': "Kabil, Afganistan & Dubai, BAE", 'de': "Kabul, AFG & Dubai, VAE",
        'fr': "Kaboul, Afghanistan & Dubaï, Émirats", 'ar': "كابول، أفغانستان ودبي، الإمارات", 'ur': "کابل، افغانستان اور دبئی، یو اے ای",
        'es': "Kabul, Afganistán y Dubái, EAU", 'zh': "阿富汗喀布尔与阿联酋迪拜", 'hi': "काबुल, अफगानिस्तान और दुबई, यूएई",
        'it': "Kabul, Afghanistan e Dubai, EAU", 'pt': "Cabul, Afeganistão e Dubai, EAU", 'ja': "アフガニスタン・カブール＆アラブ首長国連邦ドバイ",
        'ko': "아프가니스탄 카불 및 UAE 두바이", 'nl': "Kabul, AFG & Dubai, VAE", 'uz': "Qobil, Afg'oniston va Dubay, BAA",
        'id': "Kabul, Afganistan & Dubai, UEA"
    }

    badgeCOOs = {
        'en': "Chief Operating Officer", 'fa': "مدیر ارشد عملیات", 'ps': "د عملیاتو لوی مدیر",
        'ru': "Главный операционный директор", 'tr': "Operasyon Direktörü", 'de': "Chief Operating Officer",
        'fr': "Directeur des Opérations", 'ar': "الرئيس التنفيذي للعمليات", 'ur': "چیف آپریٹنگ آفیسر",
        'es': "Director de Operaciones", 'zh': "首席运营官", 'hi': "मुख्य परिचालन अधिकारी",
        'it': "Chief Operating Officer", 'pt': "Diretor de Operações", 'ja': "最高執行責任者",
        'ko': "최고 운영 책임자", 'nl': "Chief Operating Officer", 'uz': "Bosh operatsion direktor", 'id': "Chief Operating Officer"
    }

    badgeOps = {
        'en': "Global Operations", 'fa': "عملیات بین‌المللی", 'ps': "نړیوال عملیات",
        'ru': "Глобальные операции", 'tr': "Küresel Operasyonlar", 'de': "Globale Operationen",
        'fr': "Opérations Globales", 'ar': "العمليات العالمية", 'ur': "عالمی آپریشنز",
        'es': "Operaciones Globales", 'zh': "全球运营", 'hi': "वैश्विक संचालन",
        'it': "Operazioni Globali", 'pt': "Operações Globais", 'ja': "グローバル・オペレーション",
        'ko': "글로벌 운영", 'nl': "Wereldwijde Operaties", 'uz': "Global operatsiyalar", 'id': "Operasi Global"
    }

    manifestoTitles = {
        'en': "Operational Excellence & Global Execution Manifesto",
        'fa': "تعالی عملیاتی و بیانیه اجرای جهانی",
        'ps': "عملیاتي برتري او د نړیوال تطبیق اعلامیه",
        'ru': "Операционное совершенство и глобальное исполнение",
        'tr': "Operasyonel Mükemmellik ve Küresel İcra Manifestosu",
        'de': "Operative Exzellenz & Globales Ausführungsmanifest",
        'fr': "Excellence Opérationnelle & Manifeste d'Exécution Mondiale",
        'ar': "التميز التشغيلي وبيان التنفيذ العالمي",
        'ur': "آپریشنل ایکسیلنس اور گلوبل ایگزیکیوشن کا منشور",
        'es': "Excelencia Operativa y Manifiesto de Ejecución Global",
        'zh': "卓越运营与全球战略执行宣言",
        'hi': "परिचालन उत्कृष्टता और वैश्विक निष्पादन घोषणापत्र",
        'it': "Eccellenza Operativa e Manifesto di Esecuzione Globale",
        'pt': "Excelência Operacional e Manifesto de Execução Global",
        'ja': "オペレーショナル・エクセレンス＆グローバル実行マニフェスト",
        'ko': "운영의 탁월함 및 글로벌 실행 선언문",
        'nl': "Operationele Uitmuntendheid & Wereldwijd Executie-manifest",
        'uz': "Operatsion mukammallik va Global ijro manifesti",
        'id': "Keunggulan Operasional & Manifes Eksekusi Global"
    }

    quotes = {
        'en': "\"Operations is not merely managing logistics; it is the vital heartbeat that transforms ambitious visions into flawless, everyday execution across continents.\"",
        'fa': "«عملیات تنها مدیریت تدارکات نیست؛ بلکه نبض تپنده‌ای است که چشم‌اندازهای بزرگ را به اجرایی بی‌نقص و روزمره در سراسر قاره‌ها تبدیل می‌کند.»",
        'ps': "«عملیات یوازې د لوژستیک مدیریت نه دی؛ بلکه هغه ژوندی زړه دی چې لوی لیدونه په ټولو وچو کې په بې عیب او ورځني تطبیق بدلوي.»",
        'ru': "\"Операции — это не просто логистика, это живой пульс, превращающий масштабные замыслы в безупречную ежедневную реальность на всех континентах.\"",
        'tr': "\"Operasyon yalnızca lojistiği yönetmek değildir; büyük vizyonları kıtalar arası kusursuz bir günlük icraya dönüştüren canlı kalp atışıdır.\"",
        'de': "„Operations ist nicht nur Logistikmanagement; es ist der lebenswichtige Herzschlag, der ehrgeizige Visionen in fehlerfreie tägliche Ausführung verwandelt.“",
        'fr': "« Les opérations ne sont pas simplement de la logistique ; c'est le battement de cœur vital qui transforme de grandes visions en une exécution quotidienne sans faille. »",
        'ar': "«إن العمليات ليست مجرد إدارة لوجستية، بل هي النبض الحيوي الذي يحول الرؤى الطموحة إلى تنفيذ يومي لا تشوبه شائبة عبر القارات.»",
        'ur': "«آپریشنز صرف لاجسٹکس کا انتظام نہیں ہیں؛ یہ وہ اہم نبض ہے جو پرعزم وژن کو براعظموں میں بے عیب روزمرہ کے نفاذ میں تبدیل کرتی ہے۔»",
        'es': "«Las operaciones no son solo logística; son el latido vital que transforma visiones ambiciosas en una ejecución impecable a través de los continentes.»",
        'zh': "“运营绝不仅仅是后勤保障；它是将宏大愿景转化为跨越各大洲的无瑕日常执行力的生命脉搏。”",
        'hi': "«संचालन केवल रसद प्रबंधन नहीं है; यह वह महत्वपूर्ण धड़कन है जो महत्वाकांक्षी दृष्टिकोणों को महाद्वीपों में निर्दोष दैनिक निष्पादन में बदल देती है।»",
        'it': "«Le operazioni non sono solo logistica; sono il battito vitale che trasforma visioni ambiziose in un'esecuzione quotidiana impeccabile.»",
        'pt': "«As operações não são apenas logística; são a pulsação vital que transforma visões ambiciosas numa execução diária impecável através dos continentes.»",
        'ja': "「オペレーションは単なるロジスティクスの管理ではなく、野心的なビジョンを大陸を越えた完璧な日常の実行へと変える不可欠な鼓動です。」",
        'ko': "\"운영은 단순한 물류 관리가 아닙니다. 원대한 비전을 대륙을 가로지르는 완벽한 일상의 실행으로 탈바꿈시키는 핵심 맥박입니다.\"",
        'nl': "„Operaties zijn niet slechts logistiek beheer; het is de vitale hartslag die ambitieuze visies omzet in vlekkeloze dagelijkse uitvoering over continenten heen.”",
        'uz': "«Operatsiyalar shunchaki logistika emas; bu buyuk rejalarni barcha qit'alarda benuqson kundalik ijroga aylantiruvchi tirik yurak urishidir.»",
        'id': "«Operasi bukan sekadar mengelola logistik; ini adalah detak jantung vital yang mengubah visi ambisius menjadi eksekusi harian sempurna di seluruh benua.»"
    }

    quoteLocations = {
        'en': f"— {full} • Chief Operating Officer",
        'fa': f"— {full} • مدیر ارشد عملیات",
        'ps': f"— {full} • د عملیاتو لوی مدیر",
        'ru': f"— {full} • Главный операционный директор",
        'tr': f"— {full} • Operasyon Direktörü",
        'de': f"— {full} • Chief Operating Officer",
        'fr': f"— {full} • Directeur des Opérations",
        'ar': f"— {full} • الرئيس التنفيذي للعمليات",
        'ur': f"— {full} • چیف آپریٹنگ آفیسر",
        'es': f"— {full} • Director de Operaciones",
        'zh': f"— {full} • 首席运营官",
        'hi': f"— {full} • मुख्य परिचालन अधिकारी",
        'it': f"— {full} • Chief Operating Officer",
        'pt': f"— {full} • Diretor de Operações",
        'ja': f"— {full} • 最高執行責任者",
        'ko': f"— {full} • 최고 운영 책임자",
        'nl': f"— {full} • Chief Operating Officer",
        'uz': f"— {full} • Bosh operatsion direktor",
        'id': f"— {full} • Chief Operating Officer"
    }

    return {
        'name': full,
        'firstName': first,
        'lastName': last,
        'role': roles.get(loc, roles['en']),
        'office': offices.get(loc, offices['en']),
        'coordinates': coordinates.get(loc, coordinates['en']),
        'badgeCOO': badgeCOOs.get(loc, badgeCOOs['en']),
        'badgeOps': badgeOps.get(loc, badgeOps['en']),
        'badgeExecution': badgeCOOs.get(loc, badgeCOOs['en']),
        'bio': bios.get(loc, bios['en']),
        'manifestoTitle': manifestoTitles.get(loc, manifestoTitles['en']),
        'manifestoQuote': quotes.get(loc, quotes['en']),
        'manifestoAuthor': quoteLocations.get(loc, quoteLocations['en'])
    }
