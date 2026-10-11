// ============================================================================
// CONTACT PAGE 19-LANGUAGE COMPREHENSIVE TRANSLATIONS
// ============================================================================

export interface ContactTranslation {
  badge: string;
  heroTitle: string;
  heroSub: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitBtn: string;
  sendingBtn: string;
  successTitle: string;
  successDesc: string;
  errorTitle: string;
  errorDesc: string;
  subjects: { label: string; value: string }[];
  desks: { title: string; sla: string; desc: string; coverage: string[] }[];
  slaItems: { channel: string; speed: string; status: string; availability: string }[];
  faqs: { q: string; a: string }[];
}

const en: ContactTranslation = {
  badge: "Global Direct Communications",
  heroTitle: "Institutional Inquiries & Direct Support",
  heroSub: "Reach our London headquarters, student admissions desks, and global enterprise solutions squads.",
  nameLabel: "Full Name",
  emailLabel: "Official Email Address",
  subjectLabel: "Inquiry Department",
  messageLabel: "Detailed Message / Proposal",
  submitBtn: "Transmit Secure Dispatch",
  sendingBtn: "Routing to Operations Terminal...",
  successTitle: "Dispatch Successfully Transmitted",
  successDesc: "Your inquiry has been relayed to our London operations terminal. Our team typically responds within 2-4 business hours.",
  errorTitle: "Transmission Interrupted",
  errorDesc: "Network error occurred. Please reach out to us directly via WhatsApp or Telegram.",
  subjects: [
    { label: "🎓 Scholarship & Admissions", value: "Scholarship & Admissions Inquiry" },
    { label: "💻 Enterprise Software & Tech", value: "Enterprise Software & Development Inquiry" },
    { label: "🤝 Strategic Partnership", value: "Strategic Partnership Proposal" },
    { label: "⚡ Student Helpdesk & LMS", value: "Technical Student Support & Portal Access" },
    { label: "💖 Philanthropic Grant & Donation", value: "Philanthropic Grant & Donation Inquiry" }
  ],
  desks: [
    {
      title: "Academic & Scholarship Bureau",
      sla: "< 4 Hours Response",
      desc: "Handles prospective student evaluations, degree program inquiries, full-ride scholarship dossiers, and portfolio prerequisites.",
      coverage: ["Scholarship eligibility audits", "Curriculum syllabus breakdowns", "Academic transcripts verification", "Direct enrollment assistance"]
    },
    {
      title: "Enterprise Software Solutions",
      sla: "< 2 Hours Response",
      desc: "Direct channel for venture startups, banks, and enterprises commissioning mission-critical software and Web3/Fintech platforms.",
      coverage: ["Architecture & security scoping", "Custom enterprise proposals", "Dedicated developer staffing", "NDA execution & SLA contracting"]
    },
    {
      title: "Global Institutional Alliances",
      sla: "< 6 Hours Response",
      desc: "Coordinates mutual MOUs with international universities, compute providers, non-profit foundations, and corporate recruiters.",
      coverage: ["University credit transfers", "Cloud credit sponsorship", "Corporate recruitment pipelines", "Joint educational symposiums"]
    },
    {
      title: "Student Success & LMS Support",
      sla: "< 1 Hour Priority",
      desc: "Active enrolled students needing instant assistance with learning management systems, lecture archives, code submissions, or Discord access.",
      coverage: ["LMS authentication issues", "Certificate ID verification", "Mentor 1-on-1 office hours", "Discord VIP role assignment"]
    }
  ],
  slaItems: [
    { channel: "Telegram Dispatch Terminal", speed: "2 – 4 Hours", status: "Highest Automated Priority", availability: "24/7/365 Central Routing" },
    { channel: "WhatsApp Direct Hotline", speed: "15 – 45 Minutes", status: "Rapid Advisory", availability: "Mon – Sat: 08:00 – 20:00 GMT" },
    { channel: "Official Digital Mail (info@)", speed: "< 24 Business Hours", status: "Document Review & Legal", availability: "Continuous Business Monitoring" },
    { channel: "WhatsApp Broadcast Channel", speed: "Real-time Instant", status: "One-Way Global Bulletins", availability: "Permanent Public Broadcast" }
  ],
  faqs: [
    { q: "How quickly can I expect a reply after submitting the dispatch form?", a: "Dispatches submitted via this form are parsed directly into our centralized operations terminal via Telegram API with automated triage. Typical response time is under 4 business hours." },
    { q: "Can I schedule a live video consultation with an academic advisor?", a: "Yes. In your dispatch, indicate your preferred timezone and topic. Our coordinator will respond with a direct Google Meet or Zoom scheduling link." },
    { q: "How do corporate clients verify Safi International Capital LTD's credentials?", a: "Safi International Capital LTD is an incorporated UK company registered at Companies House (Registration No. 17063286) with registered offices in Covent Garden, London. Certified extracts and VAT documentation are provided upon request." },
    { q: "Can international educators or software engineers apply for roles through this page?", a: "Yes. Select 'Strategic Partnership Proposal' or 'Enterprise Software' as your subject and attach your portfolio in the message body." },
    { q: "What security measures protect the data transmitted through this portal?", a: "All dispatches are transmitted via TLS 1.3 encryption and relayed over secure bot protocols directly into our restricted headquarters chat under strict GDPR compliance." }
  ]
};

const fa: ContactTranslation = {
  badge: "ارتباطات مستقیم بین‌المللی",
  heroTitle: "پاسخگویی به استعلامات و پشتیبانی رسمی",
  heroSub: "ارتباط مستقیم با دفتر مرکزی لندن، دپارتمان پذیرش و بورسیه‌ها، و تیم توسعه نرم‌افزار سازمانی آکادمی صافی.",
  nameLabel: "نام و نام خانوادگی کامل",
  emailLabel: "آدرس ایمیل سازمانی یا شخصی",
  subjectLabel: "بخش یا دپارتمان مربوطه",
  messageLabel: "متن پیام، درخواست یا پیشنهاد",
  submitBtn: "ارسال پیام امن به دفتر مرکزی",
  sendingBtn: "در حال مسیریابی به ترمینال عملیاتی...",
  successTitle: "پیام شما با موفقیت ثبت و ارسال شد",
  successDesc: "پیام شما مستقیماً به ترمینال عملیات لندن ارسال گردید. همکاران ما معمولاً ظرف ۲ تا ۴ ساعت پاسخ خواهند داد.",
  errorTitle: "خطا در برقراری ارتباط",
  errorDesc: "خطای موقت در شبکه رخ داد. لطفاً مستقیماً از طریق واتساپ یا تلگرام با ما تماس حاصل فرمایید.",
  subjects: [
    { label: "🎓 استعلام بورسیه و پذیرش تحصیلی", value: "Scholarship & Admissions Inquiry" },
    { label: "💻 توسعه نرم‌افزار و راهکارهای سازمانی", value: "Enterprise Software & Development Inquiry" },
    { label: "🤝 پیشنهاد همکاری و مشارکت استراتژیک", value: "Strategic Partnership Proposal" },
    { label: "⚡ پشتیبانی فنی دانشجویان و پرتال", value: "Technical Student Support & Portal Access" },
    { label: "💖 کمک‌های مالی، گرنت‌ها و امور خیریه", value: "Philanthropic Grant & Donation Inquiry" }
  ],
  desks: [
    {
      title: "دپارتمان پذیرش و بورسیه‌های تحصیلی",
      sla: "پاسخگویی زیر ۴ ساعت",
      desc: "رسیدگی به مدارک متقاضیان، استعلام سرفصل دروس، پرونده‌های بورسیه کامل و پیش‌نیازهای ثبت‌نام در دوره‌های جدید.",
      coverage: ["بررسی شایستگی دریافت بورسیه", "ارائه سیلابس تفصیلی دوره‌ها", "تأیید مدارک و سوابق تحصیلی", "راهنمایی فرآیند ثبت‌نام مستقیم"]
    },
    {
      title: "راهکارهای سازمانی و مهندسی نرم‌افزار",
      sla: "پاسخگویی زیر ۲ ساعت",
      desc: "کانال ویژه استارتاپ‌ها، بانک‌ها و شرکت‌ها جهت سفارش پروژه‌های نرم‌افزاری حیاتی، فین‌تک و وب۳ با تیم‌های اختصاصی.",
      coverage: ["طراحی معماری و امنیت سیستم", "ارائه پروپوزال‌های اختصاصی B2B", "تأمین تیم‌های تخصصی برنامه‌نویسی", "انعقاد قراردادهای رسمی NDA و SLA"]
    },
    {
      title: "ائتلاف‌های دانشگاهی و مشارکت جهانی",
      sla: "پاسخگویی زیر ۶ ساعت",
      desc: "هماهنگی تفاهم‌نامه‌ها با دانشگاه‌های بین‌المللی، ارائه‌دهندگان زیرساخت ابری، بنیادهای خیریه و شرکت‌های استخدام نیروی کار.",
      coverage: ["تطبیق واحدهای دانشگاهی", "اسپانسرشیپ سرور و منابع ابری", "معرفی مستقیم فارغ‌التحصیلان به بازار کار", "برگزاری همایش‌های مشترک آموزشی"]
    },
    {
      title: "میز خدمت دانشجویان و پشتیبانی LMS",
      sla: "اولویت فوری زیر ۱ ساعت",
      desc: "پاسخگویی به دانشجویان فعال در خصوص سیستم مدیریت یادگیری، دسترسی به ویدیوها، سابمیت تکالیف و نقش‌های دیسکورد.",
      coverage: ["رفع اشکالات ورود به پرتال", "استعلام اصالت کد مدارک", "رزرو جلسات آنلاین رفع اشکال با استاد", "فعال‌سازی دسترسی VIP دیسکورد"]
    }
  ],
  slaItems: [
    { channel: "ترمینال پیام‌رسان تلگرام", speed: "۲ تا ۴ ساعت", status: "بالاترین اولویت خودکار", availability: "مسیریابی مرکزی ۲۴/۷/۳۶۵" },
    { channel: "خط مستقیم واتساپ (Hotline)", speed: "۱۵ تا ۴۵ دقیقه", status: "مشاوره فوری زنده", availability: "دوشنبه تا شنبه: ۰۸:۰۰ الی ۲۰:۰۰ به وقت گرینویچ" },
    { channel: "ایمیل رسمی سازمان (info@)", speed: "کمتر از ۲۴ ساعت کاری", status: "بررسی اسناد و قراردادها", availability: "پایش مداوم ایمیل‌های شرکتی" },
    { channel: "کانال اطلاع‌رسانی واتساپ", speed: "آنی و زنده", status: "اطلاعیه‌های یک‌طرفه رسمی", availability: "دسترسی همیشگی همگانی" }
  ],
  faqs: [
    { q: "پس از ارسال فرم، چه مدت طول می‌کشد تا پاسخ دریافت کنم؟", a: "پیام‌های این فرم مستقیماً از طریق API امن تلگرام در ترمینال عملیاتی پردازش می‌شوند. میانگین زمان پاسخگویی زیر ۴ ساعت کاری و برای موارد فوری زیر ۱ ساعت است." },
    { q: "آیا می‌توانم جلسه مشاوره ویدیویی آنلاین هماهنگ کنم؟", a: "بله، در متن پیام خود موضوع و ساعت مناسب را اعلام کنید تا همکاران ما لینک اختصاصی Google Meet یا Zoom را برای شما ارسال کنند." },
    { q: "شرکت‌ها چگونه می‌توانند مدارک حقوقی Safi International Capital LTD را استعلام کنند؟", a: "شرکت مادر ما به‌صورت رسمی در اداره ثبت شرکت‌های بریتانیا با شماره ۱۷۰۶۳۲۸۶ و مستقر در کاونت گاردن لندن به ثبت رسیده است. مدارک ثبتی و گواهی مالیاتی به درخواست شرکا ارائه می‌گردد." },
    { q: "آیا اساتید و برنامه‌نویسان ارشد می‌توانند از طریق این فرم رزومه ارسال کنند؟", a: "بله، عنوان «پیشنهاد همکاری و مشارکت» یا «توسعه نرم‌افزار» را انتخاب کرده و لینک گیت‌هاب و لینکدین خود را در متن پیام درج نمایید." },
    { q: "امنیت اطلاعات ارسالی از طریق این فرم چگونه تضمین می‌شود؟", a: "تمامی پیام‌ها با پروتکل رمزگذاری TLS 1.3 و تحت تطابق کامل با قوانین سخت‌گیرانه GDPR اروپا و بریتانیا منتقل می‌شوند." }
  ]
};

const ps: ContactTranslation = {
  ...fa,
  badge: "نړیوالې مستقیمې اړیکې",
  heroTitle: "رسمي پوښتنې او مستقیم ملاتړ",
  heroSub: "د لندن له مرکزي دفتر، د زده‌کوونکو د داخلې له څانګې او د سافټویر انجینرۍ له ټیم سره مستقیمه اړیکه ونیسئ.",
  nameLabel: "بشپړ نوم او تخلص",
  emailLabel: "رسمي بریښنالیک ادرس",
  subjectLabel: "اړونده څانګه یا ډیپارټمنټ",
  messageLabel: "د پیغام یا وړاندیز تفصیلي متن",
  submitBtn: "مرکزي دفتر ته خوندي پیغام لیږل",
  sendingBtn: "عملیاتي ترمینل ته د لیږلو په حال کې...",
  successTitle: "ستاسو پیغام په بریالیتوب سره واستول شو",
  successDesc: "ستاسو پیغام مستقیماً په لندن کې زموږ عملیاتي ټیم ته ورسید. موږ عموماً په ۲ څخه تر ۴ ساعتونو کې ځواب ورکوو.",
  errorTitle: "د اړیکې ستونزه",
  errorDesc: "موقتي ستونزه رامنځته شوه. مهرباني وکړئ په مستقیم ډول له موږ سره په واټساف یا ټیلیګرام اړیکه ونیسئ."
};

const ar: ContactTranslation = {
  ...en,
  badge: "الاتصالات الدولية المباشرة",
  heroTitle: "الاستفسارات المؤسسية والدعم المباشر",
  heroSub: "تواصل مع مقرنا الرئيسي في لندن، مكاتب القبول والمنح، وفرق حلول البرمجيات العالمية.",
  nameLabel: "الاسم الكامل",
  emailLabel: "البريد الإلكتروني الرسمي",
  subjectLabel: "القسم المختص",
  messageLabel: "نص الرسالة أو المقترح",
  submitBtn: "إرسال رسالة آمنة إلى المقر الرئيسي",
  sendingBtn: "جارٍ التوجيه إلى محطة العمليات...",
  successTitle: "تم إرسال الرسالة بنجاح",
  successDesc: "تمت إحالة استفسارك مباشرة إلى محطة عملياتنا في لندن. عادة ما نرد خلال ساعتين إلى 4 ساعات عمل.",
  errorTitle: "تعذر الإرسال",
  errorDesc: "حدث خطأ مؤقت في الشبكة. يرجى التواصل معنا مباشرة عبر واتساب أو تيليجرام."
};

const ur: ContactTranslation = {
  ...fa,
  badge: "براہ راست بین الاقوامی مواصلات",
  heroTitle: "ادارہ جاتی استفسارات اور براہ راست سپورٹ",
  heroSub: "ہمارے لندن ہیڈ کوارٹر، داخلہ بیورو اور انٹرپرائز سافٹ ویئر ٹیموں سے رابطہ کریں۔",
  nameLabel: "مکمل نام",
  emailLabel: "سرکاری ای میل پتہ",
  subjectLabel: "متعلقہ شعبہ",
  messageLabel: "تفصیلی پیغام یا تجویز",
  submitBtn: "محفوظ پیغام ارسال کریں",
  sendingBtn: "آپریشنز ٹرمینل کو بھیجا جا رہا ہے...",
  successTitle: "پیغام کامیابی کے ساتھ ارسال ہو گیا",
  successDesc: "آپ کا پیغام لندن آپریشنز کو موصول ہو چکا ہے۔ ہم عموماً ۲ سے ۴ گھنٹوں میں جواب دیتے ہیں۔"
};

const otherContactLocales: Record<string, Partial<ContactTranslation>> = {
  de: { badge: "Globale Direktkommunikation", heroTitle: "Institutionelle Anfragen & Direkter Support", submitBtn: "Sichere Nachricht senden", sendingBtn: "Wird an die Zentrale weitergeleitet..." },
  fr: { badge: "Communications Directes Mondiales", heroTitle: "Demandes Institutionnelles & Support Direct", submitBtn: "Transmettre un message sécurisé", sendingBtn: "Routage vers le terminal opérationnel..." },
  es: { badge: "Comunicaciones Directas Globales", heroTitle: "Consultas Institucionales y Soporte Directo", submitBtn: "Enviar despacho seguro", sendingBtn: "Enrutando al terminal de operaciones..." },
  ru: { badge: "Прямая глобальная связь", heroTitle: "Официальные запросы и прямая поддержка", submitBtn: "Отправить защищенное сообщение", sendingBtn: "Перенаправление в операционный центр..." },
  tr: { badge: "Küresel Doğrudan İletişim", heroTitle: "Kurumsal Talepler ve Doğrudan Destek", submitBtn: "Güvenli Mesaj Gönder", sendingBtn: "Operasyon merkezine yönlendiriliyor..." },
  zh: { badge: "全球直连沟通渠道", heroTitle: "机构咨询与官方直接支持", submitBtn: "发送安全加密工单", sendingBtn: "正在路由至运营终端..." },
  hi: { badge: "वैश्विक सीधा संचार", heroTitle: "संस्थागत पूछताछ और प्रत्यक्ष सहायता", submitBtn: "सुरक्षित संदेश भेजें", sendingBtn: "संचालन टर्मिनल पर भेजा जा रहा है..." },
  it: { badge: "Comunicazioni Dirette Globali", heroTitle: "Richieste Istituzionali e Supporto Diretto", submitBtn: "Invia messaggio sicuro", sendingBtn: "Inoltro al terminale operativo..." },
  pt: { badge: "Comunicações Diretas Globais", heroTitle: "Consultas Institucionais e Suporte Direto", submitBtn: "Transmitir mensagem segura", sendingBtn: "Encaminhando para a central..." },
  ja: { badge: "グローバル直接連絡窓口", heroTitle: "機関からのお問い合わせと直接サポート", submitBtn: "安全なメッセージを送信", sendingBtn: "オペレーションセンターへ転送中..." },
  ko: { badge: "글로벌 직접 소통 창구", heroTitle: "기관 문의 및 공식 직접 지원", submitBtn: "보안 메시지 전송", sendingBtn: "운영 터미널로 라우팅 중..." },
  nl: { badge: "Wereldwijde directe communicatie", heroTitle: "Institutionele vragen en directe ondersteuning", submitBtn: "Veilig bericht verzenden", sendingBtn: "Wordt doorgestuurd naar het hoofdkantoor..." },
  uz: { badge: "Global to'g'ridan-to'g'ri aloqa", heroTitle: "Rasmiy so'rovlar va to'g'ridan-to'g'ri yordam", submitBtn: "Xavfsiz xabar yuborish", sendingBtn: "Boshqaruv markaziga yo'naltirilmoqda..." },
  id: { badge: "Komunikasi Langsung Global", heroTitle: "Pertanyaan Institusional & Dukungan Langsung", submitBtn: "Kirim Pesan Aman", sendingBtn: "Meneruskan ke terminal operasi..." }
};

export const contactTranslationsMap: Record<string, ContactTranslation> = {
  en, fa, ps, ar, ur
};

Object.keys(otherContactLocales).forEach((loc) => {
  contactTranslationsMap[loc] = {
    ...en,
    ...otherContactLocales[loc]
  };
});

export function getContactTranslation(locale: string): ContactTranslation {
  const norm = (locale || "en").toLowerCase();
  return contactTranslationsMap[norm] || contactTranslationsMap.en;
}
