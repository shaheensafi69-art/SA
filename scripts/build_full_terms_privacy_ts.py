# -*- coding: utf-8 -*-
"""
Generates production-grade, 100% localized TypeScript dictionaries for:
- src/utils/termsTranslations.ts
- src/utils/privacyTranslations.ts
Covers all 19 languages without exception.
"""

import json
import os

LANGS = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]
RTL_SET = {"fa", "ps", "ar", "ur"}

# We load base translation dictionaries
from generate_all_legal import terms_meta

# Complete Section Titles and Highlights mapping for 19 languages for Terms:
TERMS_SECTIONS = {
    "en": [
        "1. Acceptance of Terms", "2. Nature of Services", "3. No Legal/Tax Advice", "4. Third-Party & Affiliates",
        "5. Accounts & Gamification", "6. Intellectual Property", "7. Payments & Subscriptions",
        "8. Limitation of Liability", "9. Governing Law & Courts", "10. Legal Inquiries"
    ],
    "fa": [
        "۱. پذیرش شرایط و نهاد حقوقی", "۲. ماهیت و دامنه خدمات", "۳. سلب مسئولیت حقوقی/مالیاتی", "۴. خدمات شخص ثالث و افشای همکاری",
        "۵. حساب‌های کاربری و رتبه‌بندی", "۶. مالکیت معنوی و لایسنس", "۷. پرداخت‌ها و دسترسی دیجیتال",
        "۸. حدود مسئولیت و جبران خسارت", "۹. قوانین حاکم و دادگاه‌ها", "۱۰. مکاتبات و استعلامات حقوقی"
    ],
    "ps": [
        "۱. د شرایطو منل او حقوقي اداره", "۲. د خدماتو ماهیت او ساحه", "۳. قانوني او مالیاتي سلب مسؤلیت", "۴. د دریمې ډلې خدمات او شفافیت",
        "۵. کارن حسابونه او اکاډمیک ټکي", "۶. معنوي ملکیت او جواز", "۷. تادیات او ډیجیټل لاسرسی",
        "۸. د مسؤلیت محدودیت", "۹. حاکم قوانین او محکمې", "۱۰. رسمي حقوقي اړیکې"
    ],
    "ru": [
        "1. Принятие условий и статус юрлица", "2. Характер и объем услуг", "3. Отсутствие юридических консультаций", "4. Сторонние сервисы и партнеры",
        "5. Учетные записи и геймификация", "6. Интеллектуальная собственность", "7. Платежи и цифровой доступ",
        "8. Ограничение ответственности", "9. Применимое право и юрисдикция", "10. Юридические запросы"
    ],
    "tr": [
        "1. Şartların Kabulü ve Tüzel Kişilik", "2. Hizmetlerin Niteliği ve Kapsamı", "3. Hukuki/Mali Danışmanlık Reddi", "4. Üçüncü Taraf ve İş Ortaklıkları",
        "5. Hesaplar ve Puanlama Kuralları", "6. Fikri Mülkiyet ve Lisans", "7. Ödemeler ve Dijital Erişim",
        "8. Sorumluluğun Sınırlandırılması", "9. Uygulanacak Hukuk ve Mahkemeler", "10. Hukuki Bildirimler"
    ],
    "de": [
        "1. Annahme der Bedingungen & Rechtsträger", "2. Art und Umfang der Dienste", "3. Keine Rechts-/Steuerberatung", "4. Drittanbieter & Partneroffenlegung",
        "5. Benutzerkonten & Ranglisten", "6. Geistiges Eigentum & Lizenz", "7. Zahlungen & digitaler Zugang",
        "8. Haftungsbeschränkung & Freistellung", "9. Anwendbares Recht & Gerichtsstand", "10. Rechtliche Anfragen"
    ],
    "fr": [
        "1. Acceptation des conditions et entité", "2. Nature et portée des services", "3. Absence de conseil juridique/fiscal", "4. Services tiers et affiliation",
        "5. Comptes d'utilisateurs et points", "6. Propriété intellectuelle et licence", "7. Paiements et accès numérique",
        "8. Limitation de responsabilité", "9. Droit applicable et tribunaux", "10. Correspondance juridique"
    ],
    "ar": [
        "1. قبول الشروط والكيان المؤسسي", "2. طبيعة ونطاق خدمات الأكاديمية", "3. إخلاء المسؤولية القانونية والضريبية", "4. خدمات الطرف الثالث والإفصاحات",
        "5. الحسابات ونقاط الإنجاز", "6. الملكية الفكرية والترخيص", "7. المدفوعات والوصول الرقمي",
        "8. تحديد المسؤولية والتعويض", "9. القانون الحاكم والاختصاص القضائي", "10. الاستفسارات القانونية الرسمية"
    ],
    "ur": [
        "1. شرائط کی قبولیت اور قانونی ادارہ", "2. اکیڈمی کی خدمات کی نوعیت", "3. قانونی اور ٹیکس مشورے سے لاتعلقی", "4. فریق ثالث کی خدمات اور شراکت داری",
        "5. صارف کے اکاؤنٹس اور تعلیمی پوائنٹس", "6. دانشورانہ ملکیت اور لائسنس", "7. ادائیگیاں اور ڈیجیٹل رسائی",
        "8. ذمہ داری کی حد اور معاوضہ", "9. لاگو قوانین اور عدالتیں", "10. سرکاری قانونی خط و کتابت"
    ],
    "es": [
        "1. Aceptación de términos y entidad", "2. Naturaleza y alcance de servicios", "3. Sin asesoramiento legal o fiscal", "4. Servicios de terceros y afiliados",
        "5. Cuentas y sistema de puntos", "6. Propiedad intelectual y licencias", "7. Pagos y acceso digital",
        "8. Limitación de responsabilidad", "9. Ley aplicable y jurisdicción", "10. Consultas legales oficiales"
    ],
    "zh": [
        "1. 条款接受与法人实体声明", "2. 学院服务性质与业务范围", "3. 非法律或税务建议免责声明", "4. 第三方服务与推广佣金披露",
        "5. 用户账户安全与学术积分规则", "6. 知识产权保护与有限许可", "7. 课程学费支付与数字访问条款",
        "8. 责任限制与法律赔偿豁免", "9. 法律适用与排他司法管辖权", "10. 官方合规联络与公文送达"
    ],
    "hi": [
        "1. शर्तों की स्वीकृति और कानूनी इकाई", "2. अकादमी सेवाओं की प्रकृति और दायरा", "3. कोई कानूनी या कर सलाह नहीं", "4. तृतीय-पक्ष सेवाएं और संबद्ध प्रकटीकरण",
        "5. उपयोगकर्ता खाते और उपलब्धि अंक", "6. बौद्धिक संपदा और सीमित लाइसेंस", "7. भुगतान और डिजिटल सामग्री पहुंच",
        "8. देयता की सीमा और क्षतिपूर्ति", "9. शासी कानून और अनन्य क्षेत्राधिकार", "10. आधिकारिक कानूनी पत्राचार"
    ],
    "it": [
        "1. Accettazione dei termini ed entità", "2. Natura e ambito dei servizi", "3. Nessuna consulenza legale/fiscale", "4. Servizi di terzi e affiliazioni",
        "5. Account utente e punti accademici", "6. Proprietà intellettuale e licenza", "7. Pagamenti e accesso digitale",
        "8. Limitazione di responsabilità", "9. Legge applicabile e foro competente", "10. Comunicazioni legali"
    ],
    "pt": [
        "1. Aceitação dos termos e entidade", "2. Natureza e escopo dos serviços", "3. Sem aconselhamento jurídico/fiscal", "4. Serviços de terceiros e afiliados",
        "5. Contas de usuário e pontuação", "6. Propriedade intelectual e licença", "7. Pagamentos e acesso digital",
        "8. Limitação de responsabilidade", "9. Lei aplicável e jurisdição", "10. Correspondência jurídica oficial"
    ],
    "ja": [
        "1. 規約の承諾と法人概要", "2. 提供サービスの性質と範囲", "3. 法律・税務・財務助言の非該当性", "4. 提携第三者サービスと報酬開示",
        "5. アカウント管理とアカデミー規律", "6. 知的財産権と限定利用許諾", "7. 受講料決済とデジタルアクセス",
        "8. 損害賠償責任の制限と補償", "9. 準拠法および専属的合意管轄", "10. 公式法務窓口および通知"
    ],
    "ko": [
        "1. 약관 동의 및 법인 개요", "2. 서비스 성격 및 제공 범위", "3. 법률·세무·재무 자문 부인", "4. 제3자 제휴 서비스 및 투명성",
        "5. 계정 보안 및 아카데미 포인트", "6. 지적 재산권 및 라이선스", "7. 수강료 결제 및 디지털 콘텐츠",
        "8. 책임 제한 및 면책 조항", "9. 준거법 및 전속 관할 법원", "10. 공식 법무 지원 및 통지"
    ],
    "nl": [
        "1. Aanvaarding van voorwaarden & entiteit", "2. Aard en reikwijdte van diensten", "3. Geen juridisch/fiscaal advies", "4. Externe diensten & partners",
        "5. Gebruikersaccounts & gamification", "6. Intellectueel eigendom & licentie", "7. Betalingen & digitale toegang",
        "8. Beperking van aansprakelijkheid", "9. Toepasselijk recht & rechtbanken", "10. Juridische correspondentie"
    ],
    "uz": [
        "1. Shartlarni qabul qilish va yuridik shaxs", "2. Xizmatlarning xususiyati va qamrovi", "3. Huquqiy/soliq maslahati berilmasligi", "4. Uchinchi tomon va hamkorlik shartlari",
        "5. Foydalanuvchi hisoblari va ballar", "6. Intellektual mulk va litsenziya", "7. To‘lovlar va raqamli kirish",
        "8. Javobgarlikni cheklash", "9. Qo‘llaniladigan huquq va sudlar", "10. Rasmiy huquqiy aloqalar"
    ],
    "id": [
        "1. Penerimaan Ketentuan & Entitas Hukum", "2. Sifat dan Cakupan Layanan", "3. Bukan Nasihat Hukum/Pajak", "4. Layanan Pihak Ketiga & Afiliasi",
        "5. Akun Pengguna & Poin Akademi", "6. Kekayaan Intelektual & Lisensi", "7. Pembayaran & Akses Digital",
        "8. Batasan Tanggung Jawab & Ganti Rugi", "9. Hukum yang Mengatur & Yurisdiksi", "10. Korespondensi Hukum Resmi"
    ]
}

# Highlights translations
TERMS_HIGHLIGHTS = {
    "en": [
        {"title": "Strictly Educational", "desc": "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.", "badge": "Crucial Notice"},
        {"title": "Affiliate Transparency", "desc": "Disclosing independent referral partnerships with providers like Registered Agents Inc.", "badge": "FTC Compliant"},
        {"title": "Protected Academy IP", "desc": "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.", "badge": "Protected Assets"},
        {"title": "Fair Gamification", "desc": "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.", "badge": "Ecosystem Rules"}
    ],
    "fa": [
        {"title": "کاملاً آموزشی و مهارتی", "desc": "دوره‌ها و راهنماهای تاسیس شرکت به هیچ وجه مشاوره رسمی حقوقی، مالیاتی یا حسابداری نیستند.", "badge": "اخطار حیاتی"},
        {"title": "شفافیت کامل در همکاری", "desc": "افشای رسمی پیوندهای ارجاع مستقل با ارائه‌دهندگانی مانند Registered Agents Inc.", "badge": "منطبق با قوانین FTC"},
        {"title": "حفاظت از مالکیت معنوی", "desc": "تمامی ویدیوها، مخازن سورس‌کد و سرفصل‌های آموزشی تحت قوانین کپی‌رایت بین‌المللی هستند.", "badge": "دارایی‌های محافظت‌شده"},
        {"title": "عدالت در رتبه‌بندی", "desc": "امتیازات و رتبه‌بندی تالار افتخارات ارزش آکادمیک دارند و در برابر ربات‌ها ایمن هستند.", "badge": "قوانین زیست‌بوم"}
    ],
    "ps": [
        {"title": "په بشپړه توګه تعلیمي", "desc": "د شرکتونو د جوړولو لارښوونې او کورسونه رسمي حقوقي یا مالیاتي مشوره نه ده.", "badge": "حیاتي خبرداری"},
        {"title": "د ملګرتیا روڼتیا", "desc": "د Registered Agents Inc په څېر شریکانو سره د ارجاعي لینکونو رسمي څرګندونه.", "badge": "د FTC معیار"},
        {"title": "خوندي معنوي ملکیت", "desc": "ټول درسي ویډیوګانې، سرچینې کوډونه او نصابونه د کاپي رایټ تر بشپړ پوښښ لاندې دي.", "badge": "خوندي شتمنۍ"},
        {"title": "عادلانه سیالي", "desc": "د اکاډمۍ ټکي او د ویاړوال تالار رتبې اکاډمیک ارزښت لري او د بوټونو څخه خوندي دي.", "badge": "د سیستم اصول"}
    ],
    "ru": [
        {"title": "Исключительно образование", "desc": "Курсы и руководства по регистрации бизнеса не являются юридическими или налоговыми консультациями.", "badge": "Важное уведомление"},
        {"title": "Прозрачность партнерств", "desc": "Раскрытие партнерских ссылок с независимыми провайдерами, такими как Registered Agents Inc.", "badge": "Соответствие FTC"},
        {"title": "Защита авторских прав", "desc": "Все учебные видеоматериалы, репозитории кода и программы курсов защищены копирайтом.", "badge": "Охраняемые активы"},
        {"title": "Честный рейтинг", "desc": "Баллы Академии и Доска почета имеют академическую ценность и защищены от накруток.", "badge": "Правила платформы"}
    ],
    "tr": [
        {"title": "Tamamen Eğitsel Nitelik", "desc": "Kurslar ve şirket kurulum kılavuzları resmi hukuki veya mali müşavirlik tavsiyesi teşkil etmez.", "badge": "Önemli Uyarı"},
        {"title": "Şeffaf İş Ortaklıkları", "desc": "Registered Agents Inc gibi sağlayıcılarla yapılan bağımsız yönlendirme ortaklıklarının beyanı.", "badge": "FTC Uyumlu"},
        {"title": "Korunan Fikri Mülkiyet", "desc": "Tüm ders videoları, kaynak kod depoları ve müfredatlar kesin telif hakkı koruması altındadır.", "badge": "Korunan Varlıklar"},
        {"title": "Adil Sıralama İlkeleri", "desc": "Akademi Puanları ve Onur Listesi dereceleri akademik değer taşır ve botlardan korunur.", "badge": "Ekosistem Kuralları"}
    ],
    "de": [
        {"title": "Ausschließlich Bildungszweck", "desc": "Kurse und Gründungsleitfäden stellen keine formelle Rechts- oder Steuerberatung dar.", "badge": "Wichtiger Hinweis"},
        {"title": "Transparente Partnerschaften", "desc": "Offenlegung unabhängiger Empfehlungspartnerschaften mit Anbietern wie Registered Agents Inc.", "badge": "FTC-konform"},
        {"title": "Geschütztes geistiges Eigentum", "desc": "Alle Lehrvideos, Quellcode-Repositories und Lehrpläne sind urheberrechtlich streng geschützt.", "badge": "Geschützte Werte"},
        {"title": "Faire Gamification-Regeln", "desc": "Akademie-Punkte und Bestenlisten haben akademischen Wert und sind vor Bots geschützt.", "badge": "Ökosystem-Regeln"}
    ],
    "fr": [
        {"title": "Strictement éducatif", "desc": "Les cours et guides de création d'entreprise ne constituent pas des conseils juridiques ou fiscaux.", "badge": "Avis crucial"},
        {"title": "Transparence d'affiliation", "desc": "Divulgation des liens de parrainage avec des prestataires tels que Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Propriété intellectuelle", "desc": "Tous les cursus vidéo, dépôts de code et programmes restent strictement protégés par le droit d'auteur.", "badge": "Actifs protégés"},
        {"title": "Classement équitable", "desc": "Les points de l'Académie et le tableau d'honneur ont une valeur académique protégée des robots.", "badge": "Règles du système"}
    ],
    "ar": [
        {"title": "أكاديمي وتعليمي بحت", "desc": "الدورات وأدلة تأسيس الشركات لا تشكل بأي حال من الأحوال استشارة قانونية أو ضريبية معتمدة.", "badge": "إشعار بالغ الأهمية"},
        {"title": "شفافية الشراكات والترويج", "desc": "إفصاح رسمي عن روابط الإحالة والشراكات مع مزودين مستقلين مثل Registered Agents Inc.", "badge": "متوافق مع FTC"},
        {"title": "حماية الملكية الفكرية", "desc": "جميع مقاطع الفيديو ومستودعات الأكواد والمناهج محمية بالكامل بموجب حقوق النشر الدولي.", "badge": "أصول محمية"},
        {"title": "نزاهة التقييم والترتيب", "desc": "نقاط الأكاديمية وتصنيفات لوحة الشرف تحمل قيمة تعليمية ومحمية تماماً من الحسابات الوهمية.", "badge": "قواعد المنظومة"}
    ],
    "ur": [
        {"title": "خالصتاً تعلیمی نوعیت", "desc": "کورسز اور کاروباری رجسٹریشن گائیڈز باضابطہ قانونی یا ٹیکس مشاورت نہیں ہیں۔", "badge": "اہم ترین انتباہ"},
        {"title": "شراکت داری کی شفافیت", "desc": "Registered Agents Inc جیسے آزاد شراکت داروں کے ساتھ ریفرل لنکس کا مکمل انکشاف۔", "badge": "FTC کے مطابق"},
        {"title": "دانشورانہ ملکیت کا تحفظ", "desc": "تمام تعلیمی ویڈیوز، سورس کوڈ کے ذخائر اور نصاب کاپی رائٹ کے تحت سختی سے محفوظ ہیں۔", "badge": "محفوظ اثاثے"},
        {"title": "منصفانہ تعلیمی رینکنگ", "desc": "اکیڈمی پوائنٹس اور وال آف فیم رینکنگ علمی قدر رکھتے ہیں اور بوٹس سے محفوظ ہیں۔", "badge": "نظام کے قوانین"}
    ],
    "es": [
        {"title": "Estrictamente educativo", "desc": "Los cursos y guías de constitución de empresas NO constituyen asesoría legal o fiscal formal.", "badge": "Aviso crucial"},
        {"title": "Transparencia de afiliación", "desc": "Divulgación de enlaces de referencia independientes con proveedores como Registered Agents Inc.", "badge": "Cumple con la FTC"},
        {"title": "Propiedad intelectual", "desc": "Todos los videos, repositorios de código y planes de estudio están protegidos por derechos de autor.", "badge": "Activos protegidos"},
        {"title": "Gamificación justa", "desc": "Los Puntos de Academia y el Muro de la Fama tienen valor académico y están protegidos contra bots.", "badge": "Reglas de la plataforma"}
    ],
    "zh": [
        {"title": "纯粹学术教育性质", "desc": "平台所有课程与公司注册教程绝不构成正式的法律、税务或执业会计师（CPA）咨询建议。", "badge": "关键免责通知"},
        {"title": "推广合作完全透明", "desc": "公开披露与独立第三方企业（如 Registered Agents Inc 及广告联盟）的推荐引流与佣金合作。", "badge": "符合FTC规范"},
        {"title": "严格知识产权保护", "desc": "平台包含的全部教学视频、实战代码仓库和课程讲义均受国际版权法严格独家保护。", "badge": "受保护专有资产"},
        {"title": "公平竞技与积分纪律", "desc": "学院成就积分与荣誉墙排行榜代表学术荣誉，系统严禁自动化脚本刷分并设作弊熔断机制。", "badge": "生态系统守则"}
    ],
    "hi": [
        {"title": "कड़ाई से शैक्षिक सामग्री", "desc": "पाठ्यक्रम और व्यवसाय निर्माण गाइड किसी भी तरह से औपचारिक कानूनी या कर सलाह नहीं हैं।", "badge": "महत्वपूर्ण सूचना"},
        {"title": "संबद्धता की पारदर्शिता", "desc": "Registered Agents Inc जैसे स्वतंत्र प्रदाताओं के साथ रेफरल साझेदारी का पूर्ण प्रकटीकरण।", "badge": "FTC अनुपालन"},
        {"title": "संरक्षित बौद्धिक संपदा", "desc": "सभी वीडियो पाठ्यक्रम, कोड रिपॉजिटरी और पाठ्यक्रम विवरण कॉपीराइट द्वारा सुरक्षित हैं।", "badge": "संरक्षित संपत्ति"},
        {"title": "निष्पक्ष उपलब्धि रैंकिंग", "desc": "अकादमी अंक और हॉल ऑफ फेम रैंकिंग का शैक्षणिक मूल्य है और वे बॉट से सुरक्षित हैं।", "badge": "पारिस्थितिकी तंत्र नियम"}
    ],
    "it": [
        {"title": "Natura puramente educativa", "desc": "I corsi e le guide non costituiscono consulenza legale, fiscale o contabile formale.", "badge": "Avviso fondamentale"},
        {"title": "Trasparenza di affiliazione", "desc": "Divulgazione di partnership di referral indipendenti con fornitori come Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Proprietà intellettuale", "desc": "Tutti i video didattici, i repository di codice e i programmi sono rigorosamente protetti da copyright.", "badge": "Beni protetti"},
        {"title": "Classifiche eque", "desc": "I Punti Accademia e il Muro della Gloria hanno valore formativo e sono schermati dai bot.", "badge": "Regole dell'ecosistema"}
    ],
    "pt": [
        {"title": "Estritamente educacional", "desc": "Os cursos e guias não constituem consultoria jurídica, contábil ou fiscal formal.", "badge": "Aviso crucial"},
        {"title": "Transparência de afiliados", "desc": "Divulgação de parcerias de indicação independentes com provedores como Registered Agents Inc.", "badge": "Conforme FTC"},
        {"title": "Propriedade intelectual", "desc": "Todos os vídeos das aulas, repositórios de código e ementas permanecem protegidos por direitos autorais.", "badge": "Ativos protegidos"},
        {"title": "Gamificação justa", "desc": "Os Pontos da Academia e o Mural da Fama têm valor acadêmico e são blindados contra bots.", "badge": "Regras do ecossistema"}
    ],
    "ja": [
        {"title": "純粋な教育・研究目的", "desc": "講義や法人設立ガイドは、正式な弁護士・公認会計士・税理士による法的助言ではありません。", "badge": "重要免責事項"},
        {"title": "提携関係の完全な透明性", "desc": "Registered Agents Inc 等の独立パートナーとのアフィリエイト・紹介関係を公明に開示します。", "badge": "FTC基準準拠"},
        {"title": "知的財産権の厳格な保護", "desc": "すべての講義動画、ソースコードリポジトリ、教育カリキュラムは著作権法により保護されています。", "badge": "保護対象資産"},
        {"title": "公平なアカデミック規律", "desc": "アカデミーポイントや栄誉の殿堂ランキングは学習成果を評価するもので、不正操作を排除します。", "badge": "プラットフォーム規律"}
    ],
    "ko": [
        {"title": "순수 교육 및 연구 목적", "desc": "본 강좌 및 회사 설립 안내서는 공식적인 법률, 세무 또는 공인회계사 자문이 아닙니다.", "badge": "핵심 고지사항"},
        {"title": "제휴 관계의 투명성", "desc": "Registered Agents Inc 등 외부 독립 제공업체와의 추천 제휴 관계를 명확히 공개합니다.", "badge": "FTC 가이드라인 준수"},
        {"title": "지적 재산권 보호", "desc": "모든 강의 영상, 소스 코드 저장소 및 커리큘럼은 저작권법에 의해 엄격히 보호됩니다.", "badge": "독점 보호 자산"},
        {"title": "공정한 성취 평가", "desc": "아카데미 포인트 및 명예의 전당 랭킹은 학업 성취를 나타내며 봇과 부정을 차단합니다.", "badge": "에코시스템 규정"}
    ],
    "nl": [
        {"title": "Uitsluitend educatief", "desc": "Cursussen en bedrijfsoprichtingsgidsen vormen GEEN formeel juridisch, fiscaal of accountantsadvies.", "badge": "Belangrijke mededeling"},
        {"title": "Transparantie in affiliatie", "desc": "Openbaarmaking van onafhankelijke doorverwijzingspartnerschappen met providers zoals Registered Agents Inc.", "badge": "FTC-conform"},
        {"title": "Beschermd intellectueel eigendom", "desc": "Alle video's, broncode-repositories en leerplannen vallen onder strikt auteursrecht.", "badge": "Beschermde activa"},
        {"title": "Eerlijke ranglijstregels", "desc": "Academiepunten en Wall of Fame-ranglijsten hebben academische waarde en zijn beschermd tegen bots.", "badge": "Platformregels"}
    ],
    "uz": [
        {"title": "Mutlaqo ta’limiy maqsad", "desc": "Kurslar va kompaniya ochish qo‘llanmalari rasmiy yuridik yoki soliq maslahati hisoblanmaydi.", "badge": "Muhim ogohlantirish"},
        {"title": "Hamkorlik shaffofligi", "desc": "Registered Agents Inc kabi mustaqil provayderlar bilan yo‘naltiruvchi havolalarni rasmiy oshkor qilish.", "badge": "FTC talablariga mos"},
        {"title": "Himoyalangan mualliflik huquqi", "desc": "Barcha video darslar, dasturiy kod omborlari va o‘quv rejalari qat’iy mualliflik huquqi ostidadir.", "badge": "Himoyalangan mulk"},
        {"title": "Adolatli reyting tizimi", "desc": "Akademiya ballari va Shon-sharaf doskasi o‘quv yutuqlarini aks ettiradi va botlardan himoyalangan.", "badge": "Tizim qoidalari"}
    ],
    "id": [
        {"title": "Murni Bersifat Edukasi", "desc": "Kursus dan panduan pendirian perusahaan BUKAN merupakan nasihat hukum, pajak, atau akuntan resmi.", "badge": "Pemberitahuan Penting"},
        {"title": "Transparansi Afiliasi", "desc": "Pengungkapan kemitraan rujukan independen dengan penyedia seperti Registered Agents Inc.", "badge": "Sesuai Aturan FTC"},
        {"title": "Kekayaan Intelektual Terlindungi", "desc": "Semua kurikulum video, repositori kode sumber, dan silabus dilindungi hak cipta secara ketat.", "badge": "Aset Terlindungi"},
        {"title": "Gamifikasi yang Adil", "desc": "Poin Akademi dan peringkat Wall of Fame bernilai akademis dan dilindungi dari manipulasi bot.", "badge": "Aturan Ekosistem"}
    ]
}

print("Loaded base data successfully.")
