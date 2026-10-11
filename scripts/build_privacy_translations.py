# -*- coding: utf-8 -*-
import json
from build_full_terms_privacy_ts import LANGS, RTL_SET, terms_meta

PRIVACY_SECTIONS = {
    "en": [
        "1. Data Controller", "2. Information We Collect", "3. Affiliates & Third Parties",
        "4. How We Use Data", "5. Cookies & Tracking", "6. Security & Storage",
        "7. Your Legal Rights", "8. Privacy Inquiries"
    ],
    "fa": [
        "۱. نهاد کنترل‌کننده داده‌ها", "۲. دسته‌بندی اطلاعات گردآوری‌شده", "۳. پیوندهای ارجاع و شخص ثالث",
        "۴. مبنای قانونی و کاربرد داده‌ها", "۵. کوکی‌ها و فناوری‌های رهگیری", "۶. امنیت، نگهداری و انتقال داده‌ها",
        "۷. حقوق قانونی و درخواست امحا", "۸. استعلامات حریم خصوصی و مراجع نظارتی"
    ],
    "ps": [
        "۱. د معلوماتو کنټرول کوونکې اداره", "۲. د راټولو شویو معلوماتو کټګورۍ", "۳. د دریمې ډلې او ملګرو لینکونه",
        "۴. د معلوماتو قانوني کارول", "۵. کوکیز او تعقیبي ټیکنالوژي", "۶. امنیت او د معلوماتو ساتنه",
        "۷. ستاسو قانوني حقونه او د حذف غوښتنه", "۸. د محرمیت اړیکې او پوښتنې"
    ],
    "ru": [
        "1. Оператор персональных данных", "2. Категории собираемой информации", "3. Сторонние ссылки и партнеры",
        "4. Правовые основания и цели обработки", "5. Файлы cookie и отслеживание", "6. Безопасность и хранение данных",
        "7. Ваши законные права (GDPR)", "8. Запросы о конфиденциальности и регуляторы"
    ],
    "tr": [
        "1. Veri Sorumlusu ve Tüzel Kişilik", "2. Toplanan Bilgi Kategorileri", "3. Üçüncü Taraf Bağlantıları ve Ortaklar",
        "4. Verilerin Kullanım Amaçları", "5. Çerezler ve İzleme Teknolojileri", "6. Veri Güvenliği ve Saklama",
        "7. Yasal Haklarınız (GDPR)", "8. Gizlilik Talepleri ve Denetim Makamı"
    ],
    "de": [
        "1. Verantwortliche Stelle & Unternehmen", "2. Erfasste Datenkategorien", "3. Drittanbieter-Links & Partner",
        "4. Rechtsgrundlagen & Nutzung der Daten", "5. Cookies & Tracking-Technologien", "6. Datensicherheit & Speicherung",
        "7. Ihre gesetzlichen Rechte (DSGVO)", "8. Datenschutzanfragen & Aufsichtsbehörde"
    ],
    "fr": [
        "1. Responsable du traitement des données", "2. Catégories d'informations collectées", "3. Liens tiers et partenaires affiliés",
        "4. Utilisation et base légale des données", "5. Cookies et technologies de suivi", "6. Sécurité et conservation des données",
        "7. Vos droits légaux (RGPD)", "8. Demandes de confidentialité et autorité"
    ],
    "ar": [
        "1. مسؤول معالجة البيانات والكيان", "2. فئات المعلومات التي نجمعها", "3. روابط الطرف الثالث والشركاء",
        "4. الأساس القانوني واستخدام البيانات", "5. ملفات تعريف الارتباط والتتبع", "6. أمن البيانات وبروتوكولات التخزين",
        "7. حقوقك القانونية وطلب الحذف", "8. استفسارات الخصوصية والجهات التنظيمية"
    ],
    "ur": [
        "1. ڈیٹا کنٹرولر اور ادارہ", "2. جمع کی جانے والی معلومات کے زمرے", "3. تیسرے فریق کے لنکس اور پارٹنرز",
        "4. ڈیٹا کے استعمال کی قانونی بنیادیں", "5. کوکیز اور ٹریکنگ ٹیکنالوجیز", "6. ڈیٹا کی حفاظت اور اسٹوریج",
        "7. آپ کے قانونی حقوق اور اکاؤنٹ حذف کرنا", "8. رازداری کے استفسارات اور رابطہ"
    ],
    "es": [
        "1. Responsable del tratamiento de datos", "2. Categorías de información recopilada", "3. Enlaces a terceros y afiliados",
        "4. Base legal y uso de datos", "5. Cookies y tecnologías de rastreo", "6. Seguridad y almacenamiento de datos",
        "7. Sus derechos legales (RGPD)", "8. Consultas de privacidad y autoridades"
    ],
    "zh": [
        "1. 数据控制者与法人实体", "2. 我们收集的个人信息类别", "3. 第三方外链与商业推广披露",
        "4. 数据处理的合法性基础与用途", "5. Cookie与追踪技术管理", "6. 数据安全防护与跨境传输协议",
        "7. 您的法定数据权利与注销通道", "8. 隐私事务联络与ICO监管投诉"
    ],
    "hi": [
        "1. डेटा नियंत्रक और कानूनी इकाई", "2. एकत्र की गई जानकारी की श्रेणियां", "3. तृतीय-पक्ष लिंक और संबद्ध साझेदार",
        "4. कानूनी आधार और डेटा का उपयोग", "5. कुकीज़ और ट्रैकिंग तकनीक", "6. डेटा सुरक्षा और भंडारण प्रोटोकॉल",
        "7. आपके कानूनी अधिकार (GDPR)", "8. गोपनीयता पूछताछ और शिकायत निवारण"
    ],
    "it": [
        "1. Titolare del trattamento dei dati", "2. Categorie di informazioni raccolte", "3. Link di terze parti e affiliati",
        "4. Base giuridica e utilizzo dei dati", "5. Cookie e tecnologie di tracciamento", "6. Sicurezza e conservazione dei dati",
        "7. I tuoi diritti legali (GDPR)", "8. Richieste sulla privacy e autorità"
    ],
    "pt": [
        "1. Controlador de dados e entidade", "2. Categorias de informações coletadas", "3. Links de terceiros e afiliados",
        "4. Base legal e uso de dados", "5. Cookies e tecnologias de rastreamento", "6. Segurança e armazenamento de dados",
        "7. Seus direitos legais (GDPR)", "8. Consultas de privacidade e autoridade"
    ],
    "ja": [
        "1. データ管理者および運営組織", "2. 収集する個人情報の分類と項目", "3. 第三者リンクおよびアフィリエイト開示",
        "4. 適法な処理根拠および利用目的", "5. Cookieおよびトラッキング技術の管理", "6. データセキュリティおよび保管基準",
        "7. 利用者の法的権利（GDPR等）および削除", "8. プライバシー窓口および監督機関"
    ],
    "ko": [
        "1. 개인정보 처리자 및 법인 개요", "2. 수집하는 개인정보 항목 및 범주", "3. 제3자 링크 및 제휴 파트너 고지",
        "4. 정보 처리의 적법한 근거 및 목적", "5. 쿠키 및 추적 기술 운영 정책", "6. 데이터 보안 조치 및 보관 기간",
        "7. 정보주체의 법적 권리 및 삭제 신청", "8. 개인정보 보호 문의 및 감독 기구"
    ],
    "nl": [
        "1. Gegevensverantwoordelijke & entiteit", "2. Categorieën van verzamelde gegevens", "3. Externe links & partners",
        "4. Wettelijke grondslag & gebruik van data", "5. Cookies & trackingtechnologieën", "6. Beveiliging & gegevensopslag",
        "7. Uw wettelijke rechten (AVG)", "8. Privacyverzoeken & toezichthouder"
    ],
    "uz": [
        "1. Ma’lumotlar nazoratchisi va yuridik shaxs", "2. To‘planadigan ma’lumotlar toifalari", "3. Uchinchi tomon havolalari va hamkorlar",
        "4. Ma’lumotlardan foydalanishning qonuniy asoslari", "5. Cookie fayllari va kuzatuv texnologiyalari", "6. Ma’lumotlar xavfsizligi va saqlash",
        "7. Sizning qonuniy huquqlaringiz", "8. Maxfiylik bo‘yicha so‘rovlar"
    ],
    "id": [
        "1. Pengendali Data & Entitas Hukum", "2. Kategori Informasi yang Kami Kumpulkan", "3. Tautan Pihak Ketiga & Afiliasi",
        "4. Dasar Hukum & Penggunaan Data", "5. Cookie & Teknologi Pelacakan", "6. Keamanan & Penyimpanan Data",
        "7. Hak Hukum Anda (GDPR)", "8. Pertanyaan Privasi & Otoritas Pengawas"
    ]
}

PRIVACY_HIGHLIGHTS = {
    "en": [
        {"title": "Zero Data Selling", "desc": "We strictly never sell or rent your personal information to third-party data brokers.", "badge": "Guaranteed Standard"},
        {"title": "Affiliate Transparency", "desc": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.", "badge": "FTC Compliant"},
        {"title": "Enterprise Encryption", "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data.", "badge": "Cryptographic Guard"},
        {"title": "Full GDPR Control", "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time.", "badge": "Statutory Rights"}
    ],
    "fa": [
        {"title": "عدم فروش اطلاعات کاربران", "desc": "ما هرگز اطلاعات هویتی یا تحصیلی شما را به کارگزاران داده یا واسطه‌ها نمی‌فروشیم.", "badge": "استاندارد تضمین‌شده"},
        {"title": "شفافیت در کوکی‌های ارجاع", "desc": "افشای کامل کوکی‌های ردیابی شرکای رسمی نظیر Registered Agents Inc.", "badge": "منطبق با مقررات FTC"},
        {"title": "رمزنگاری سطح سازمانی", "desc": "رمزنگاری پیشرفته TLS 1.3 برای کلیه داده‌ها، جلسات ورود و مدارک هویتی.", "badge": "حفاظت رمزنگاری‌شده"},
        {"title": "کنترل کامل GDPR", "desc": "حقوق نامحدود قانونی جهت مشاهده، تصحیح، انتقال یا امحای دائمی اطلاعات حساب.", "badge": "حقوق مصرح قانونی"}
    ],
    "ps": [
        {"title": "د معلوماتو نه پلورل", "desc": "موږ هیڅکله ستاسو شخصي معلومات دریمې ډلې یا سوداګرو ته نه پلورو.", "badge": "تضمین شوی معیار"},
        {"title": "د کوکیز روڼتیا", "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي کوکیز بشپړ څرګندونه.", "badge": "د FTC معیار"},
        {"title": "پرمختللی کوډکول", "desc": "د ټولو اکاډمیک اسنادو او کارن معلوماتو لپاره د TLS پرمختللی کوډکول.", "badge": "خوندي ساتنه"},
        {"title": "د GDPR بشپړ کنټرول", "desc": "په هر وخت کې ستاسو د حساب معلوماتو ته د لاسرسي، اصلاح او حذف پوره حق.", "badge": "قانوني حقونه"}
    ],
    "ru": [
        {"title": "Никакой продажи данных", "desc": "Мы строго никогда не продаем и не передаем персональные данные третьим лицам.", "badge": "Гарантия безопасности"},
        {"title": "Прозрачность файлов cookie", "desc": "Четкие правила использования партнерских cookie с провайдерами, такими как Registered Agents Inc.", "badge": "Стандарт FTC"},
        {"title": "Шифрование данных", "desc": "Сквозное шифрование TLS 1.3 для всех учебных курсов, паролей и персональных данных.", "badge": "Криптографическая защита"},
        {"title": "Полный контроль GDPR", "desc": "Безусловное право на доступ, исправление, экспорт или удаление вашего профиля.", "badge": "Законные права"}
    ],
    "tr": [
        {"title": "Veri Satışı Yapılmaz", "desc": "Kişisel bilgilerinizi asla veri simsarlarına veya üçüncü taraflara satmayız ve kiralamayız.", "badge": "Garantili Standart"},
        {"title": "Şeffaf Yönlendirme Çerezleri", "desc": "Registered Agents Inc gibi ortaklarla ilgili yönlendirme çerezlerine dair açık beyan.", "badge": "FTC Uyumlu"},
        {"title": "Kurumsal Düzeyde Şifreleme", "desc": "Tüm akademi dersleri, kimlik bilgileri ve veriler için uçtan uca TLS/SSL şifrelemesi.", "badge": "Kriptografik Koruma"},
        {"title": "Tam GDPR Kontrolü", "desc": "Hesap verilerinize istediğiniz zaman erişme, düzeltme, aktarma veya silme hakkı.", "badge": "Yasal Haklar"}
    ],
    "de": [
        {"title": "Kein Datenverkauf", "desc": "Wir verkaufen oder vermieten Ihre personenbezogenen Daten unter keinen Umständen an Dritte.", "badge": "Garantierter Standard"},
        {"title": "Affiliate-Transparenz", "desc": "Klare Offenlegung bezüglich Tracking-Cookies von Partnern wie Registered Agents Inc.", "badge": "FTC-konform"},
        {"title": "Unternehmensverschlüsselung", "desc": "Ende-zu-Ende-TLS/SSL-Verschlüsselung für alle Kurse, Zugangsdaten und Plattformaktivitäten.", "badge": "Kryptografischer Schutz"},
        {"title": "Volle DSGVO-Kontrolle", "desc": "Uneingeschränkte Rechte auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung.", "badge": "Gesetzliche Rechte"}
    ],
    "fr": [
        {"title": "Zéro vente de données", "desc": "Nous ne vendons ni ne louons jamais vos informations personnelles à des courtiers de données.", "badge": "Norme garantie"},
        {"title": "Transparence d'affiliation", "desc": "Divulgation complète des cookies de parrainage avec des partenaires comme Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Chiffrement de pointe", "desc": "Chiffrement TLS/SSL de bout en bout sur tous les cours, identifiants et données de l'académie.", "badge": "Protection cryptographique"},
        {"title": "Contrôle RGPD complet", "desc": "Droits illimités d'accès, de rectification, de portabilité ou d'effacement de vos données.", "badge": "Droits légaux"}
    ],
    "ar": [
        {"title": "حظر بيع البيانات نهائياً", "desc": "نحن لا نبيع ولا نؤجر بياناتك الشخصية أو الأكاديمية لأي وسطاء أو سماسرة بيانات.", "badge": "معيار مضمون"},
        {"title": "شفافية ملفات تعريف الإحالة", "desc": "إفصاح كامل وواضح عن كوكيز الإحالة والتتبع مع شركاء مثل Registered Agents Inc.", "badge": "متوافق مع FTC"},
        {"title": "تشفير بمستوى المؤسسات", "desc": "تشفير شامل بتقنية TLS 1.3 لكافة الدورات وبيانات الاعتماد وجلسات تسجيل الدخول.", "badge": "حماية مشفرة"},
        {"title": "تحكم كامل بموجب GDPR", "desc": "حقوق قانونية غير مقيدة للوصول إلى بياناتك وتصحيحها ونقلها أو حذفها نهائياً.", "badge": "حقوق قانونية ملزمة"}
    ],
    "ur": [
        {"title": "ڈیٹا فروخت نہ کرنے کی ضمانت", "desc": "ہم آپ کی ذاتی یا تعلیمی معلومات کو کبھی بھی تیسرے فریق کو فروخت یا کرایہ پر نہیں دیتے۔", "badge": "گارنٹی شدہ معیار"},
        {"title": "الحاق کی شفافیت", "desc": "Registered Agents Inc جیسے باضابطہ پارٹنرز کے ریفرل کوکیز کا شفاف انکشاف۔", "badge": "FTC کے مطابق"},
        {"title": "اعلیٰ درجے کی انکرپشن", "desc": "تمام کورسز، اسناد اور صارف کے ڈیٹا کے لیے اینڈ ٹو اینڈ TLS انکرپشن۔", "badge": "کرپٹوگرافک تحفظ"},
        {"title": "مکمل GDPR کنٹرول", "desc": "کسی بھی وقت اپنے اکاؤنٹ کا ڈیٹا دیکھنے، درست کرنے یا مستقل طور پر حذف کرنے کا مکمل حق۔", "badge": "قانونی حقوق"}
    ],
    "es": [
        {"title": "Cero venta de datos", "desc": "Nunca vendemos ni alquilamos su información personal a intermediarios de datos.", "badge": "Estándar garantizado"},
        {"title": "Transparencia de afiliados", "desc": "Divulgación clara sobre cookies de referencia y socios como Registered Agents Inc.", "badge": "Cumple con la FTC"},
        {"title": "Cifrado empresarial", "desc": "Cifrado TLS/SSL de extremo a extremo en todos los cursos, credenciales y registros.", "badge": "Protección criptográfica"},
        {"title": "Control total de RGPD", "desc": "Derechos irrestrictos para acceder, rectificar, portar o eliminar sus datos en cualquier momento.", "badge": "Derechos legales"}
    ],
    "zh": [
        {"title": "坚决绝不出售任何数据", "desc": "我们严格承诺绝不将您的个人信息、学习档案或交易记录出售或出租给任何数据经纪商。", "badge": "品质合规保证"},
        {"title": "推广返佣机制完全透明", "desc": "全面公开披露针对外部合作伙伴（如 Registered Agents Inc）的引流追踪Cookie运作规则。", "badge": "符合FTC规范"},
        {"title": "金融企业级端到端加密", "desc": "全站数据传输、视频播放流、身份鉴权与凭证颁发全程采用严密的 TLS 1.3 现代加密保护。", "badge": "密码级安全屏障"},
        {"title": "完整英国/欧盟GDPR主权", "desc": "赋予用户法定权利随时自由查询、修正、导出档案并一键发起账号及数据的永久销毁。", "badge": "法定主权权利"}
    ],
    "hi": [
        {"title": "डेटा कभी नहीं बेचा जाता", "desc": "हम आपकी व्यक्तिगत जानकारी को कभी भी तीसरे पक्ष के डेटा दलालों को नहीं बेचते या किराए पर नहीं देते।", "badge": "गारंटीकृत मानक"},
        {"title": "संबद्ध कुकी पारदर्शिता", "desc": "Registered Agents Inc जैसे भागीदारों के रेफरल कुकीज़ के संबंध में स्पष्ट प्रकटीकरण।", "badge": "FTC अनुपालन"},
        {"title": "उन्नत स्तर का एन्क्रिप्शन", "desc": "सभी पाठ्यक्रमों, क्रेडेंशियल्स और डेटा पर एंड-टू-एंड टीएलएस/एसएसएल एन्क्रिप्शन।", "badge": "क्रिप्टोग्राफिक सुरक्षा"},
        {"title": "पूर्ण GDPR नियंत्रण", "desc": "किसी भी समय अपने डेटा तक पहुंचने, सुधारने या हटाने का पूर्ण वैधानिक अधिकार।", "badge": "वैधानिक अधिकार"}
    ],
    "it": [
        {"title": "Nessuna vendita di dati", "desc": "Non vendiamo né noleggiamo mai le tue informazioni personali a broker di dati.", "badge": "Standard garantito"},
        {"title": "Trasparenza sui cookie", "desc": "Informativa chiara sui cookie di referral e partner come Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Crittografia di livello enterprise", "desc": "Crittografia end-to-end TLS/SSL per tutti i corsi, le credenziali e i dati della piattaforma.", "badge": "Protezione crittografica"},
        {"title": "Controllo GDPR completo", "desc": "Diritto illimitato di accedere, rettificare, trasferire o cancellare i tuoi dati in qualsiasi momento.", "badge": "Diritti statutari"}
    ],
    "pt": [
        {"title": "Zero venda de dados", "desc": "Nós nunca vendemos ou alugamos suas informações pessoais para corretores de dados.", "badge": "Padrão garantido"},
        {"title": "Transparência de afiliados", "desc": "Divulgações claras sobre cookies de indicação e parceiros como Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Criptografia corporativa", "desc": "Criptografia TLS/SSL de ponta a ponta em todos os cursos, credenciais e dados.", "badge": "Guarda criptográfica"},
        {"title": "Controle total do GDPR", "desc": "Direitos irrestritos para acessar, retificar, portar ou apagar seus dados a qualquer momento.", "badge": "Direitos estatutários"}
    ],
    "ja": [
        {"title": "個人データの売買一切禁止", "desc": "学習履歴や個人識別情報を第三者データブローカーに売却・貸与することは一切ありません。", "badge": "保証基準"},
        {"title": "アフィリエイトCookieの透明性", "desc": "Registered Agents Inc 等の提携先への遷移時に付与されるトラッキングCookieを明確に告知します。", "badge": "FTC基準準拠"},
        {"title": "エンタープライズ級の暗号化", "desc": "すべての講義受講、ログイン認証、学習データに最先端の TLS 1.3 暗号化プロトコルを適用。", "badge": "暗号化保護"},
        {"title": "完全なGDPR権利保障", "desc": "自己のデータに対する閲覧、訂正、ポータビリティ、および完全な削除請求権をいつでも行使可能です。", "badge": "法定権利"}
    ],
    "ko": [
        {"title": "개인정보 매매 절대 금지", "desc": "어떠한 경우에도 수강생의 개인정보를 제3자 데이터 브로커에 판매하거나 임대하지 않습니다.", "badge": "보증된 보안 표준"},
        {"title": "제휴 쿠키의 투명한 운영", "desc": "Registered Agents Inc 등 협력사 링크 클릭 시 수집되는 추천 쿠키에 대해 명확히 고지합니다.", "badge": "FTC 규정 준수"},
        {"title": "엔터프라이즈급 암호화", "desc": "모든 강의 시청, 자격 증명 및 계정 데이터에 대해 강력한 종단간 TLS/SSL 암호화를 적용합니다.", "badge": "암호화 가드"},
        {"title": "완벽한 GDPR 권리 보장", "desc": "언제든지 자신의 계정 정보에 대한 열람, 정정, 데이터 이전 및 영구 삭제를 요구할 수 있습니다.", "badge": "법적 권리"}
    ],
    "nl": [
        {"title": "Geen gegevensverkoop", "desc": "Wij verkopen of verhuren uw persoonlijke gegevens nooit aan datahandelaren.", "badge": "Gegarandeerde standaard"},
        {"title": "Affiliate-transparantie", "desc": "Duidelijke informatie over trackingcookies van partners zoals Registered Agents Inc.", "badge": "FTC-conform"},
        {"title": "Enterprise encryptie", "desc": "End-to-end TLS/SSL-versleuteling voor alle cursussen, inloggegevens en platformdata.", "badge": "Cryptografische bescherming"},
        {"title": "Volledige AVG-controle", "desc": "Onbeperkt recht op inzage, rectificatie, overdraagbaarheid of verwijdering van gegevens.", "badge": "Wettelijke rechten"}
    ],
    "uz": [
        {"title": "Ma’lumotlar sotilmaydi", "desc": "Shaxsiy ma’lumotlaringizni hech qachon uchinchi shaxslarga yoki brokerlarga sotmaymiz.", "badge": "Kafolatlangan standart"},
        {"title": "Cookie fayllari shaffofligi", "desc": "Registered Agents Inc kabi hamkorlarning yo‘naltiruvchi cookie fayllari to‘g‘risida ochiq ma’lumot.", "badge": "FTC talablariga mos"},
        {"title": "Kuchli shifrlash", "desc": "Barcha kurslar, hisob ma’lumotlari va shaxsiy fayllar uchun TLS/SSL shifrlash.", "badge": "Kriptografik himoya"},
        {"title": "To‘liq GDPR nazorati", "desc": "Istalgan vaqtda ma’lumotlaringizni ko‘rish, tuzatish yoki butunlay o‘chirish huquqi.", "badge": "Qonuniy huquqlar"}
    ],
    "id": [
        {"title": "Data Tidak Dijual", "desc": "Kami sangat melarang penjualan atau penyewaan informasi pribadi Anda kepada pialang data.", "badge": "Standar Terjamin"},
        {"title": "Transparansi Cookie Afiliasi", "desc": "Pengungkapan yang jelas terkait cookie rujukan dengan mitra seperti Registered Agents Inc.", "badge": "Sesuai Aturan FTC"},
        {"title": "Enkripsi Tingkat Enterprise", "desc": "Enkripsi TLS/SSL ujung ke ujung di semua kursus, kredensial, dan data platform.", "badge": "Pelindung Kriptografi"},
        {"title": "Kontrol Penuh Sesuai GDPR", "desc": "Hak tanpa batas untuk mengakses, memperbaiki, memindahkan, atau menghapus data Anda kapan saja.", "badge": "Hak Hukum"}
    ]
}

privacy_dict = {}

for lang in LANGS:
    meta = terms_meta[lang]
    secs = PRIVACY_SECTIONS[lang]
    highs = PRIVACY_HIGHLIGHTS[lang]
    is_rtl = lang in RTL_SET

    section_list = []
    for i, title in enumerate(secs):
        sid = ["controller", "collection", "affiliates", "usage", "cookies", "security", "rights", "contact"][i]
        item = {"id": sid, "title": title}
        if sid == "affiliates":
            item["isHighlight"] = True
        section_list.append(item)

    privacy_dict[lang] = {
        "isRtl": is_rtl,
        "badge": "Official Data Charter & Privacy Policy" if lang == "en" else meta["badge"],
        "heroTitleLine1": "Your Privacy & Data" if lang == "en" else meta["title1"],
        "heroTitleLine2": "Are Fully Protected" if lang == "en" else meta["title2"],
        "heroSub": meta["sub"],
        "entityLabel": meta["entity"],
        "regLabel": meta["reg"],
        "lawLabel": "UK GDPR & DPA 2018",
        "highlights": highs,
        "tocTitle": meta["tocTitle"],
        "tocCount": f"8 {meta['tocCount'].split(' ')[1] if ' ' in meta['tocCount'] else 'Sections'}",
        "sections": section_list,
        "legalHelp": {
            "title": "Have Data Questions?" if lang == "en" else meta["legalTitle"],
            "desc": meta["legalDesc"],
            "btn": "Email Privacy Team" if lang == "en" else meta["legalBtn"]
        },
        "section1": {
            "secBadge": f"{meta['sec']} 1",
            "title": secs[0],
            "desc": meta["sub"],
            "legalEntityLabel": meta["entity"].split(":")[0] if ":" in meta["entity"] else "Entity",
            "companyNumLabel": meta["reg"].split(":")[0] if ":" in meta["reg"] else "Reg",
            "hqLabel": "Headquarters Address",
            "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
        },
        "section2": {
            "secBadge": f"{meta['sec']} 2",
            "title": secs[1],
            "desc": highs[0]["desc"],
            "cards": [
                {"title": highs[0]["title"], "desc": highs[0]["desc"]},
                {"title": highs[1]["title"], "desc": highs[1]["desc"]},
                {"title": highs[2]["title"], "desc": highs[2]["desc"]},
                {"title": highs[3]["title"], "desc": highs[3]["desc"]}
            ]
        },
        "section3": {
            "secBadge": f"{meta['sec']} 3 • {meta['thirdParty']}",
            "title": secs[2],
            "badge": highs[1]["badge"],
            "desc": highs[1]["desc"],
            "rulesTitle": secs[2],
            "bullets": [
                highs[1]["desc"],
                meta["sub"],
                highs[0]["desc"],
                highs[2]["desc"]
            ]
        },
        "section4": {
            "secBadge": f"{meta['sec']} 4",
            "title": secs[3],
            "desc": meta["sub"],
            "items": [
                {"title": "Contractual Fulfillment:", "desc": highs[2]["desc"]},
                {"title": "Legitimate Interests:", "desc": highs[3]["desc"]},
                {"title": "Statutory Obligations:", "desc": meta["sub"]}
            ]
        },
        "section5": {
            "secBadge": f"{meta['sec']} 5",
            "title": secs[4],
            "desc": meta["sub"],
            "cookies": [
                {"title": "Strictly Necessary Cookies", "desc": "Authentication & security.", "badge": "Always Active"},
                {"title": "Performance & Metrics", "desc": "Lesson loading performance.", "badge": "Configurable"},
                {"title": "Affiliate & Referral Cookies", "desc": "Set upon clicking partner links.", "badge": "Outbound Only"},
                {"title": "Google AdSense Advertising Cookies", "desc": "Relevant ad delivery by Google.", "badge": "Third-Party"}
            ],
            "adHeading": "Google AdSense Compliance",
            "adIntro": highs[1]["desc"],
            "adBullets": [
                {"lead": "Third-Party Vendors:", "text": meta["sub"]},
                {"lead": "Personalized Ads:", "text": highs[0]["desc"]}
            ]
        },
        "section6": {
            "secBadge": f"{meta['sec']} 6",
            "title": secs[5],
            "desc": highs[2]["desc"],
            "retentionTitle": "Data Retention Period:",
            "retentionDesc": meta["sub"],
            "transfersTitle": "International Transfers:",
            "transfersDesc": meta["jur"]
        },
        "section7": {
            "secBadge": f"{meta['sec']} 7",
            "title": secs[6],
            "desc": highs[3]["desc"],
            "rights": [
                {"title": "Right of Access", "desc": highs[3]["desc"]},
                {"title": "Right to Rectification", "desc": meta["sub"]},
                {"title": "Right to Erasure", "desc": highs[0]["desc"]},
                {"title": "Right to Restriction", "desc": meta["sub"]},
                {"title": "Right to Portability", "desc": highs[2]["desc"]},
                {"title": "Right to Object", "desc": highs[3]["desc"]}
            ],
            "deletionBox": {
                "title": "Need to permanently delete your account & erase your data?",
                "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
                "btn": meta["delete"]
            }
        },
        "section8": {
            "secBadge": f"{meta['sec']} 8",
            "title": secs[7],
            "desc": meta["legalDesc"],
            "emailLabel": meta["legalTitle"],
            "btn": meta["legalBtn"],
            "icoText": "UK Information Commissioner's Office (ICO): ico.org.uk"
        }
    }

ts_privacy_code = """// ============================================================================
// PRIVACY POLICY TRANSLATIONS (19 OFFICIAL LANGUAGES)
// ============================================================================

export interface PrivacySectionItem {
  id: string;
  title: string;
  isHighlight?: boolean;
}

export interface PrivacyHighlightItem {
  title: string;
  desc: string;
  badge: string;
}

export interface PrivacyTranslation {
  isRtl: boolean;
  badge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSub: string;
  entityLabel: string;
  regLabel: string;
  lawLabel: string;
  highlights: PrivacyHighlightItem[];
  tocTitle: string;
  tocCount: string;
  sections: PrivacySectionItem[];
  legalHelp: {
    title: string;
    desc: string;
    btn: string;
  };
  section1: {
    secBadge: string;
    title: string;
    desc: string;
    legalEntityLabel: string;
    companyNumLabel: string;
    hqLabel: string;
    hqValue: string;
  };
  section2: {
    secBadge: string;
    title: string;
    desc: string;
    cards: { title: string; desc: string }[];
  };
  section3: {
    secBadge: string;
    title: string;
    badge: string;
    desc: string;
    rulesTitle: string;
    bullets: string[];
  };
  section4: {
    secBadge: string;
    title: string;
    desc: string;
    items: { title: string; desc: string }[];
  };
  section5: {
    secBadge: string;
    title: string;
    desc: string;
    cookies: { title: string; desc: string; badge: string }[];
    adHeading: string;
    adIntro: string;
    adBullets: { lead: string; text: string }[];
  };
  section6: {
    secBadge: string;
    title: string;
    desc: string;
    retentionTitle: string;
    retentionDesc: string;
    transfersTitle: string;
    transfersDesc: string;
  };
  section7: {
    secBadge: string;
    title: string;
    desc: string;
    rights: { title: string; desc: string }[];
    deletionBox: {
      title: string;
      sub: string;
      btn: string;
    };
  };
  section8: {
    secBadge: string;
    title: string;
    desc: string;
    emailLabel: string;
    btn: string;
    icoText: string;
  };
}

export const privacyTranslations: Record<string, PrivacyTranslation> = """ + json.dumps(privacy_dict, ensure_ascii=False, indent=2) + """;

export function getPrivacyTranslation(locale: string): PrivacyTranslation {
  const norm = (locale || "en").toLowerCase();
  return privacyTranslations[norm] || privacyTranslations.en;
}
"""

with open("src/utils/privacyTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_privacy_code)

print("Generated src/utils/privacyTranslations.ts successfully!")
