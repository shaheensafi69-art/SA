// ============================================================================
// ABOUT PAGE 19-LANGUAGE COMPREHENSIVE TRANSLATIONS
// ============================================================================

export interface AboutTranslation {
  manifestoBadge: string;
  manifestoTitle: string;
  manifestoHighlight: string;
  manifestoP1: string;
  manifestoP2: string;
  manifestoP3: string;
  curriculumBadge: string;
  curriculumTitle: string;
  curriculumDesc: string;
  techBadge: string;
  techTitle: string;
  techDesc: string;
  ecosystemBadge: string;
  ecosystemTitle: string;
  ecosystemDesc: string;
  faqBadge: string;
  faqTitle: string;
  disciplines: { title: string; desc: string }[];
  techPillars: { title: string; desc: string }[];
  companies: { name: string; description: string }[];
  faqs: { q: string; a: string }[];
}

const en: AboutTranslation = {
  manifestoBadge: "The Safi Academy Manifesto",
  manifestoTitle: "Why We Built Safi Academy:",
  manifestoHighlight: "Skills Over Theory. Execution Over Speculation.",
  manifestoP1: "For decades, traditional higher education has failed to keep pace with the hyper-accelerated evolution of modern technology. Students spend years accumulating debt for theoretical degrees that are rendered obsolete before graduation. Meanwhile, geographic barriers prevent brilliant minds in emerging economies from accessing world-class knowledge.",
  manifestoP2: "We set out to shatter these limitations. Initiated by visionary entrepreneur Shaheen Safi and backed by Safi International Capital LTD, our institution delivers education exclusively through active industry practitioners.",
  manifestoP3: "From our corporate headquarters in London, we serve as an educational launching pad. We do not simply teach students; we integrate them into our global network, connect them with our fintech platform SafiPay, and support them through our scholarship fund.",
  curriculumBadge: "Comprehensive Curriculum",
  curriculumTitle: "Our Academic Disciplines",
  curriculumDesc: "Meticulously engineered programs bridging modern engineering, global trade, and international finance.",
  techBadge: "Technological Infrastructure",
  techTitle: "Built on Enterprise-Grade Edge Systems",
  techDesc: "Powered by real-time WebRTC, edge distribution, and embedded artificial intelligence.",
  ecosystemBadge: "Corporate Conglomerate",
  ecosystemTitle: "The Global Safi Ecosystem",
  ecosystemDesc: "Backed by registered UK corporate entities, digital fintech rails, and international networks.",
  faqBadge: "Institutional FAQ",
  faqTitle: "Frequently Asked Questions",
  disciplines: [
    { title: "Full-Stack & AI Engineering", desc: "Next.js 15, TypeScript, autonomous agentic AI workflows, vector embeddings, and cloud architecture." },
    { title: "Global E-Commerce & Logistics", desc: "Amazon FBA, Shopify private labeling, international freight forwarding, and multi-channel global sales." },
    { title: "Institutional Financial Markets", desc: "Smart Money Concepts (SMC), liquidity algorithms, risk mitigation, and algorithmic trading." },
    { title: "Cross-Border Business Formation", desc: "Forming US LLCs & UK Ltd entities, federal EIN acquisition, US registered agents, and corporate banking." },
    { title: "UI/UX & Modern Creative Media", desc: "Human-centric interface design, Figma masteries, 3D motion graphics, brand identity, and video production." },
    { title: "Academic & Business Languages", desc: "Professional English for global remote careers, academic TOEFL/IELTS preparation, and business communication." }
  ],
  techPillars: [
    { title: "Agora RTC Live Classrooms", desc: "Sub-200ms ultra-low latency real-time video broadcasting with screen sharing and live student interaction." },
    { title: "Safi AI 24/7 Smart Tutor", desc: "Embedded Gemini-powered artificial intelligence answering student questions, debugging code, and analyzing setups." },
    { title: "Verifiable Cryptographic Certificates", desc: "Every certificate includes a unique verification code backed by our London corporate registrar for global authentication." },
    { title: "Global Cloudflare R2 Edge Delivery", desc: "Zero-buffering video streaming and lightning-fast downloads across 300+ edge locations worldwide." }
  ],
  companies: [
    { name: "Safi International Capital LTD", description: "The global financial and corporate parent entity of the Safi Ecosystem, registered in England and Wales under company number 17063286." },
    { name: "SafiPay", description: "Digital fintech application facilitating international account creation, Visa card issuance, and instant multi-currency global student payouts." },
    { name: "Safi TopUp", description: "Cross-border telecommunications, mobile credit distribution, and digital gift cards connecting over 150 countries worldwide." },
    { name: "SafiPro", description: "Modern lifestyle, hardware tools, and premium apparel crafted with exacting standards for an ambitious international audience." },
    { name: "Safi AI", description: "Proprietary artificial intelligence engine powering automated student tutoring, real-time code analysis, and smart tools." },
    { name: "Shaheen Safi Blog", description: "Exclusive strategic analysis, architectural fintech frameworks, and macroeconomic insights directly from our Founder, Shaheen Safi." }
  ],
  faqs: [
    { q: "What is Safi Academy and who owns it?", a: "Safi Academy is the flagship digital educational institution of Safi International Capital LTD, a prestigious financial and corporate holding company registered in England and Wales (Company No. 17063286), headquartered in Covent Garden, London, United Kingdom." },
    { q: "How does Safi Academy differ from generic online platforms?", a: "Unlike platforms selling static videos, Safi Academy operates as an elite, structured academy combining live Agora RTC broadcasts, hands-on project reviews, direct mentorship, and an integrated fintech ecosystem (SafiPay)." },
    { q: "Are graduation certificates verifiable by international employers?", a: "Yes. Every student who completes a course receives an official Certificate of Completion containing a unique, verifiable Certificate Code authenticatable through our portal." },
    { q: "How do live cohort classes work across different global time zones?", a: "Classes are scheduled conveniently for international attendees across UK, Europe, Middle East, and Asia, and every live session is automatically recorded in HD for 24/7 on-demand review." },
    { q: "What payment methods are supported for course enrollment?", a: "We support international Visa, Mastercard, American Express via Stripe, SafiPay digital accounts, direct bank wire transfer, and approved digital assets." },
    { q: "How does Safi Academy support female students and learners in restricted regions?", a: "Through our scholarship funds and community grants, we provide free and heavily subsidized access to thousands of motivated female students and underprivileged youth facing educational barriers." },
    { q: "What is the relationship between Safi Academy and external corporate partners?", a: "To help our students form legitimate international businesses, Safi Academy provides educational resources and vetted referral pathways to trusted providers like Registered Agents Inc." },
    { q: "Can I teach at Safi Academy as an instructor?", a: "Yes! Faculty members earn up to 70% revenue share and gain access to our live classroom broadcast suite. Applications are open via our Instructor Application portal." }
  ]
};

const fa: AboutTranslation = {
  manifestoBadge: "مانیفست و منشور بنیادین آکادمی صافی",
  manifestoTitle: "چرا آکادمی صافی را ساختیم:",
  manifestoHighlight: "مهارت به جای تئوری. اجرای واقعی به جای حدس و گمان.",
  manifestoP1: "دهه‌هاست که آموزش عالی سنتی از تحولات سریع فناوری و اقتصاد نوین عقب مانده است. دانشجویان سال‌ها وقت خود را صرف مدارک تئوریک می‌کنند که پیش از فارغ‌التحصیلی منسوخ می‌شوند. در عین حال، موانع جغرافیایی مانع دسترسی استعدادهای درخشان به دانش جهانی شده است.",
  manifestoP2: "ما برای شکستن این محدودیت‌ها برخاستیم. به ابتکار کارآفرین پیشرو شاهین صافی و پشتوانه مالی شرکت Safi International Capital LTD، نهادی بنا نهادیم که آموزش در آن صرفاً توسط فعالان ارشد بازار و مهندسان تراز اول ارائه می‌شود.",
  manifestoP3: "از مقر اصلی ما در لندن، ما سکوی پرتاب آموزشی شما هستیم. ما فقط آموزش نمی‌دهیم؛ بلکه دانشجویان را به شبکه جهانی وصل می‌کنیم، با پلتفرم مالی SafiPay متصل می‌سازیم و از طریق صندوق بورسیه حمایت می‌نماییم.",
  curriculumBadge: "برنامه آموزشی جامع و تخصصی",
  curriculumTitle: "دپارتمان‌های علمی و مهارتی ما",
  curriculumDesc: "برنامه‌های مهندسی‌شده که فاصله‌ی میان برنامه‌نویسی مدرن، تجارت جهانی و بازارهای مالی را پر می‌کنند.",
  techBadge: "زیرساخت پیشرفته فناوری",
  techTitle: "مبتنی بر زیرساخت‌های ابری تراز اول بین‌المللی",
  techDesc: "پخش زنده فوق‌سریع WebRTC، شبکه‌های تحویل محتوای جهانی و هوش مصنوعی تعبیه‌شده اختصاصی.",
  ecosystemBadge: "هلدینگ بزرگ سازمانی",
  ecosystemTitle: "اکوسیستم جهانی صافی",
  ecosystemDesc: "با حمایت نهادهای رسمی ثبت‌شده در انگلستان، سیستم‌های نوین فین‌تک و شبکه‌های بازرگانی بین‌المللی.",
  faqBadge: "پرسش‌های رسمی و سازمانی",
  faqTitle: "پاسخ به سوالات متداول",
  disciplines: [
    { title: "مهندسی فول‌استک و هوش مصنوعی", desc: "از Next.js 15 و تایپ‌اسکریپت تا سیستم‌های ایجنت هوش مصنوعی، پایگاه‌های داده برداری و معماری ابری." },
    { title: "تجارت الکترونیک و لاجستیک بین‌الملل", desc: "تسلط کامل بر Amazon FBA، فروشگاه‌های Shopify، حمل‌ونقل بین‌المللی و فروش چندکاناله جهانی." },
    { title: "بازارهای مالی و تریدینگ نهادی", desc: "مفاهیم پول هوشمند (SMC)، الگوریتم‌های نقدینگی، مدیریت ریسک و معاملات الگوریتمی برای شرکت‌های پراپ." },
    { title: "ثبت شرکت‌های بین‌المللی در آمریکا و بریتانیا", desc: "تاسیس LLC در آمریکا و Ltd در بریتانیا، دریافت کد مالیاتی EIN، ایجنت رسمی و افتتاح حساب بانکی شرکتی." },
    { title: "طراحی رابط کاربری UI/UX و رسانه‌های خلاق", desc: "طراحی تجربه‌محور با Figma، موشن‌گرافیک سه‌بعدی، هویت برند و تولید محتوای ویدیویی تراز اول." },
    { title: "زبان‌های تجاری و آکادمیک بین‌المللی", desc: "انگلیسی تخصصی بازار کار ریموت جهانی، آمادگی تافل و آیلتس و مکاتبات بازرگانی چندزبانه." }
  ],
  techPillars: [
    { title: "صنف‌های آنلاین زنده Agora RTC", desc: "پخش زنده ویدیویی با تاخیر زیر ۲۰۰ میلی‌ثانیه، اشتراک‌گذاری دسکتاپ و تعامل صوتی تصویری مستقیم با استاد." },
    { title: "استاد هوشمند ۲۴ ساعته Safi AI", desc: "هوش مصنوعی داخلی بر پایه جمینای برای پاسخ آنی به اشکالات درسی، دیباگ کدها و تحلیل تمرین‌ها." },
    { title: "مدارک معتبر و قابل استعلام بین‌المللی", desc: "هر گواهینامه دارای کد رهگیری یکتا و رسمی تحت رجیستری شرکتی لندن جهت ارائه به کارفرمایان جهانی است." },
    { title: "سرورهای توزیع محتوای جهانی Cloudflare R2", desc: "پخش ویدیویی بدون بافر و دانلود فوق‌سریع فایل‌های آموزشی از بیش از ۳۰۰ دیتاسنتر در سراسر جهان." }
  ],
  companies: [
    { name: "Safi International Capital LTD", description: "شرکت مادر هلدینگ و بازوی سرمایه‌گذاری اکوسیستم صافی، ثبت‌شده رسمی در انگلستان با شناسه ثبتی ۱۷۰۶۳۲۸۶." },
    { name: "SafiPay", description: "اپلیکیشن پیشرفته فین‌تک برای افتتاح حساب‌های ارزی بین‌المللی، صدور ویزاکارت و تسویه آنی پاداش‌های ارزی دانشجویان." },
    { name: "Safi TopUp", description: "سامانه بین‌المللی خدمات مخابراتی، شارژ سیم‌کارت و گیفت‌کارت‌های دیجیتال متصل به بیش از ۱۵۰ کشور دنیا." },
    { name: "SafiPro", description: "تجهیزات سخت‌افزاری مدرن، ابزارهای تخصصی و پوشاک برند اختصاصی با استانداردهای کیفیت سخت‌گیرانه بین‌المللی." },
    { name: "Safi AI", description: "موتور هوش مصنوعی اختصاصی اکوسیستم صافی برای آموزش هوشمند دانشجویان، تحلیل کد و اتوماسیون سازمانی." },
    { name: "Shaheen Safi Blog", description: "تحلیل‌های استراتژیک، معماری سیستم‌های فین‌تک و چشم‌اندازهای اقتصاد کلان با نگارش مستقیم شاهین صافی." }
  ],
  faqs: [
    { q: "آکادمی صافی چیست و چه هویتی دارد؟", a: "آکادمی صافی نهاد آموزشی پرچمدار شرکت Safi International Capital LTD است که به‌صورت رسمی در انگلستان (ثبت ۱۷۰۶۳۲۸۶) و مستقر در کاونت گاردن لندن به ثبت رسیده است." },
    { q: "تفاوت آکادمی صافی با پلتفرم‌های معمولی مانند یودمی چیست؟", a: "برخلاف سایت‌های فروش ویدیوهای ضبط‌شده و بی‌ارتباط، آکادمی صافی یک مرکز منسجم با کلاس‌های زنده، بررسی پروژه‌ها، اساتید پاسخگو و اکوسیستم مالی متصل SafiPay است." },
    { q: "آیا مدارک فارغ‌التحصیلی در سراسر جهان قابل استعلام است؟", a: "بله، هر دانشجو پس از موفقیت در کوییزها و پروژه‌ها مدرک معتبر با کد اعتبارسنجی بین‌المللی دریافت می‌کند که کارفرمایان جهانی می‌توانند آن را مستقیماً راستی‌آزمایی کنند." },
    { q: "برنامه‌ریزی ساعات کلاس‌ها برای مناطق زمانی مختلف چگونه است؟", a: "ساعات صنف‌ها طوری تنظیم شده که دانشجویان اروپا، خاورمیانه و آسیا شرکت کنند و کلیه جلسات با کیفیت HD ضبط و در پنل ذخیره می‌شوند." },
    { q: "کدام روش‌های پرداخت برای ثبت‌نام در دوره‌ها پشتیبانی می‌شوند؟", a: "کارت‌های بین‌المللی ویزا و مسترکارت، حساب‌های فین‌تک SafiPay، انتقال مستقیم بانکی SEPA/بریتانیا و ارزهای دیجیتال مورد تایید." },
    { q: "آکادمی صافی چگونه از دختران و دانشجویان مناطق محروم حمایت می‌کند؟", a: "ما از طریق صندوق بورسیه و کمک‌های مالی، آموزش‌های رایگان همراه با انترنت و لپ‌تاپ را در اختیار هزاران دختر شجاع و دانشجوی مستعد قرار می‌دهیم." },
    { q: "آیا می‌توانم به عنوان مدرس در آکادمی صافی تدریس کنم؟", a: "بله! متخصصان و برنامه‌نویسان ارشد می‌توانند از طریق بخش «درخواست تدریس» اپلای کنند و از مزایای سهم ۷۰ درصدی و کلاس‌های زنده بهره‌مند شوند." },
    { q: "همکاری آکادمی با نهادهای حقوقی خارجی چگونه است؟", a: "برای راه‌اندازی قانونی بیزینس در آمریکا، ما با موسسات معتبر ثبت رسمی از جمله Registered Agents Inc همکاری نزدیک داریم." }
  ]
};

const ps: AboutTranslation = {
  ...fa,
  manifestoBadge: "د صافي اکاډمۍ بنسټیز منشور او پیژندنه",
  manifestoTitle: "ولې موږ صافي اکاډمي جوړه کړه:",
  manifestoHighlight: "مهارت پر تیورۍ غوره دی. ریښتینی عمل پر شک او اټکل غوره دی.",
  manifestoP1: "له لسیزو راهیسې دودیزې لوړې زده کړې د نوې ټیکنالوژۍ او اقتصاد له چټک پرمختګ څخه وروسته پاتې دي. محصلین کلونه په تیوریکي سندونو لګوي چې د فراغت څخه مخکې زړیږي.",
  manifestoP2: "موږ د دې خنډونو ماتولو لپاره راپورته شو. د مخکښ متشبث شاهین صافي په نوښت او د Safi International Capital LTD په مالي ملاتړ، داسې بنسټ مو جوړ کړ چې زده کړې پکې یوازې د مسلکي انجنیرانو لخوا ورکول کیږي.",
  manifestoP3: "په لندن کې زموږ له مرکزي دفتر څخه، موږ ستاسو تحصیلي لانچ پیډ یو. موږ نه یوازې تدریس کوو، بلکې محصلین له نړیوالې شبکې او SafiPay سره یوځای کوو.",
  curriculumBadge: "جامع او مسلکي درسي نصاب",
  curriculumTitle: "زموږ علمي او مسلکي څانګې",
  curriculumDesc: "انجینري شوي پروګرامونه چې د سافټویر، نړیوالې سوداګرۍ او مالي بازارونو ترمنځ واټن له منځه وړي.",
  techBadge: "پرمختللی تخنیکي زیربنا",
  techTitle: "د لوړې کچې نړیوالو کلاوډ سیسټمونو پر بنسټ",
  techDesc: "د چټک Agora RTC ژوندی خپرونې، د کلاوډفلیر سرورونه او جوړ شوی مصنوعي ذهانت.",
  ecosystemBadge: "ستر سازماني هولډنګ",
  ecosystemTitle: "د صافي نړیوال ایکوسیستم",
  ecosystemDesc: "په انګلستان کې د ثبت شویو رسمي بنسټونو او مالي فینټیک پلاتفورمونو په ملاتړ.",
  faqBadge: "رسمي او اداري پوښتنې",
  faqTitle: "د ډیرو پوښتل شویو پوښتنو ځوابونه"
};

const ar: AboutTranslation = {
  ...en,
  manifestoBadge: "ميثاق ومنهاج أكاديمية صافي",
  manifestoTitle: "لماذا أسسنا أكاديمية صافي:",
  manifestoHighlight: "المهارة فوق النظرية. والتنفيذ العملي فوق التكهنات.",
  manifestoP1: "لعقود طويلة، عجز التعليم التقليدي عن مواكبة التطور الفائق للتكنولوجيا والاقتصاد الرقمي. يقضي الطلاب سنوات في مراكمة الديون للحصول على شهادات تفقد قيمتها قبل التخرج.",
  manifestoP2: "انطلقنا لكسر هذه القيود. بمبادرة من رائد الأعمال شاهين صافي وبدعم من Safi International Capital LTD، بنينا مؤسسة يقدم فيها التعليم حصرياً كبار الممارسين في السوق.",
  manifestoP3: "من مقرنا الرئيسي في لندن، نمثل منصة الانطلاق الأكاديمية والمهنية لك. نربط طلابنا بالشبكات العالمية ونظام الدفع SafiPay وصناديق المنح الدراسية الكاملة.",
  curriculumBadge: "مناهج شاملة ومتطورة",
  curriculumTitle: "التخصصات الأكاديمية والمهنية",
  curriculumDesc: "برامج مصممة لربط هندسة البرمجيات المتقدمة بالتجارة العالمية والأسواق المالية.",
  techBadge: "بنية تحتية تكنولوجية متقدمة",
  techTitle: "مبنية على أحدث الأنظمة السحابية العالمية",
  techDesc: "بث مباشر عبر WebRTC، توزيع سحابي عالمي وذكاء اصطناعي مدمج على مدار الساعة.",
  ecosystemBadge: "مجموعة شركات دولية",
  ecosystemTitle: "منظومة صافي العالمية المتكاملة",
  ecosystemDesc: "مدعومة بكيانات رسمية مسجلة في المملكة المتحدة وأنظمة مصرفية وتكنولوجية متطورة.",
  faqBadge: "الأسئلة الشائعة",
  faqTitle: "إجابات واضحة لجميع استفساراتكم"
};

const ur: AboutTranslation = {
  ...fa,
  manifestoBadge: "صافی اکیڈمی کا بنیادی منشور",
  manifestoTitle: "ہم نے صافی اکیڈمی کیوں بنائی:",
  manifestoHighlight: "تھیوری پر مہارت کو فوقیت۔ قیاس آرائی پر عملی نفاذ کو ترجیح۔",
  curriculumBadge: "جامع پیشہ ورانہ نصاب",
  curriculumTitle: "ہمارے تعلیمی شعبہ جات",
  techBadge: "جدید ترین تکنیکی انفراسٹرکچر",
  techTitle: "عالمی معیار کے کلاؤڈ سسٹمز پر مبنی",
  ecosystemBadge: "عالمی کاروباری نیٹ ورک",
  ecosystemTitle: "صافی کا بین الاقوامی ایکو سسٹم",
  faqBadge: "سرکاری اکثر پوچھے گئے سوالات",
  faqTitle: "آپ کے سوالات کے شفاف جوابات"
};

const de: AboutTranslation = {
  ...en,
  manifestoBadge: "Das Manifest der Safi Academy",
  manifestoTitle: "Warum wir die Safi Academy gegründet haben:",
  manifestoHighlight: "Fähigkeiten vor Theorie. Ausführung vor Spekulation.",
  curriculumBadge: "Umfassendes Curriculum",
  curriculumTitle: "Unsere akademischen Disziplinen",
  techBadge: "Technologische Infrastruktur",
  techTitle: "Gebaut auf erstklassigen Edge-Systemen",
  ecosystemBadge: "Internationales Firmenkonglomerat",
  ecosystemTitle: "Das globale Safi-Ökosystem",
  faqBadge: "Häufig gestellte Fragen",
  faqTitle: "Transparente Antworten für Sie"
};

const fr: AboutTranslation = {
  ...en,
  manifestoBadge: "Le Manifeste de la Safi Academy",
  manifestoTitle: "Pourquoi nous avons créé Safi Academy :",
  manifestoHighlight: "La pratique avant la théorie. L'exécution avant la spéculation.",
  curriculumBadge: "Programme académique complet",
  curriculumTitle: "Nos disciplines d'enseignement",
  techBadge: "Infrastructure technologique",
  techTitle: "Conçue sur des serveurs distribués de pointe",
  ecosystemBadge: "Groupe d'entreprises mondial",
  ecosystemTitle: "L'écosystème international Safi",
  faqBadge: "Questions fréquentes",
  faqTitle: "Réponses claires et officielles"
};

const es: AboutTranslation = {
  ...en,
  manifestoBadge: "El Manifiesto de Safi Academy",
  manifestoTitle: "Por qué fundamos Safi Academy:",
  manifestoHighlight: "Habilidades sobre teoría. Ejecución sobre especulación.",
  curriculumBadge: "Plan de estudios integral",
  curriculumTitle: "Nuestras disciplinas académicas",
  techBadge: "Infraestructura tecnológica",
  techTitle: "Construida sobre sistemas edge de nivel empresarial",
  ecosystemBadge: "Conglomerado corporativo",
  ecosystemTitle: "El ecosistema global de Safi",
  faqBadge: "Preguntas frecuentes",
  faqTitle: "Respuestas claras a tus dudas"
};

const ru: AboutTranslation = {
  ...en,
  manifestoBadge: "Манифест Safi Academy",
  manifestoTitle: "Почему мы создали Safi Academy:",
  manifestoHighlight: "Навыки важнее теории. Практика важнее догадок.",
  curriculumBadge: "Комплексная учебная программа",
  curriculumTitle: "Наши учебные направления",
  techBadge: "Технологическая инфраструктура",
  techTitle: "Построено на передовых облачных технологиях",
  ecosystemBadge: "Международный холдинг",
  ecosystemTitle: "Глобальная экосистема Safi",
  faqBadge: "Часто задаваемые вопросы",
  faqTitle: "Официальные ответы академии"
};

const tr: AboutTranslation = {
  ...en,
  manifestoBadge: "Safi Akademi Manifestosu",
  manifestoTitle: "Safi Akademi'yi Neden Kurduk:",
  manifestoHighlight: "Teori yerine pratik beceri. Tahmin yerine doğrudan uygulama.",
  curriculumBadge: "Kapsamlı Müfredat",
  curriculumTitle: "Akademik Disiplinlerimiz",
  techBadge: "Teknolojik Altyapı",
  techTitle: "Kurumsal Düzeyde Edge Sistemler Üzerine İnşa Edildi",
  ecosystemBadge: "Küresel Şirketler Grubu",
  ecosystemTitle: "Uluslararası Safi Ekosistemi",
  faqBadge: "Sıkça Sorulan Sorular",
  faqTitle: "Şeffaf ve Resmi Cevaplar"
};

const zh: AboutTranslation = {
  ...en,
  manifestoBadge: "萨菲学院核心宣言",
  manifestoTitle: "我们创立萨菲学院的初衷：",
  manifestoHighlight: "技能胜于空洞理论，务实执行优于纸上谈兵。",
  curriculumBadge: "全面学术课程体系",
  curriculumTitle: "核心学科与培养方向",
  techBadge: "前沿技术基础设施",
  techTitle: "依托全球企业级边缘网络构建",
  ecosystemBadge: "国际企业综合集团",
  ecosystemTitle: "全球萨菲生态系统",
  faqBadge: "常见问题解答",
  faqTitle: "官方解答与透明指南"
};

const hi: AboutTranslation = {
  ...en,
  manifestoBadge: "साफ़ी अकादमी का घोषणापत्र",
  manifestoTitle: "हमने साफ़ी अकादमी क्यों बनाई:",
  manifestoHighlight: "सिद्धांत से बढ़कर व्यावहारिक कौशल। अनुमान से बढ़कर वास्तविक निष्पादन।",
  curriculumBadge: "व्यापक पाठ्यक्रम",
  curriculumTitle: "हमारे शैक्षणिक विषय",
  techBadge: "तकनीकी अवसंरचना",
  techTitle: "उद्यम-स्तरीय एज सिस्टम पर निर्मित",
  ecosystemBadge: "वैश्विक कॉर्पोरेट समूह",
  ecosystemTitle: "साफ़ी अंतरराष्ट्रीय पारिस्थितिकी तंत्र",
  faqBadge: "अक्सर पूछे जाने वाले प्रश्न",
  faqTitle: "आधिकारिक और पारदर्शी उत्तर"
};

const it: AboutTranslation = {
  ...en,
  manifestoBadge: "Il Manifesto di Safi Academy",
  manifestoTitle: "Perché abbiamo fondato Safi Academy:",
  manifestoHighlight: "Competenze prima della teoria. Esecuzione prima della speculazione.",
  curriculumBadge: "Curriculum completo",
  curriculumTitle: "Le nostre discipline accademiche",
  techBadge: "Infrastruttura tecnologica",
  techTitle: "Costruita su sistemi edge di livello enterprise",
  ecosystemBadge: "Conglomerato aziendale",
  ecosystemTitle: "L'ecosistema globale Safi",
  faqBadge: "Domande frequenti",
  faqTitle: "Risposte chiare alle tue domande"
};

const pt: AboutTranslation = {
  ...en,
  manifestoBadge: "O Manifesto da Safi Academy",
  manifestoTitle: "Por que fundamos a Safi Academy:",
  manifestoHighlight: "Competências acima da teoria. Execução acima da especulação.",
  curriculumBadge: "Currículo abrangente",
  curriculumTitle: "Nossas disciplinas acadêmicas",
  techBadge: "Infraestrutura tecnológica",
  techTitle: "Construída sobre sistemas edge empresariais",
  ecosystemBadge: "Conglomerado corporativo",
  ecosystemTitle: "O ecossistema global Safi",
  faqBadge: "Perguntas frequentes",
  faqTitle: "Respostas transparentes e oficiais"
};

const ja: AboutTranslation = {
  ...en,
  manifestoBadge: "サフィ・アカデミー設立宣言",
  manifestoTitle: "サフィ・アカデミー設立の理念：",
  manifestoHighlight: "理論よりも実践的スキル。推測よりも確実な実行力。",
  curriculumBadge: "包括的なカリキュラム",
  curriculumTitle: "専門学問分野とカリキュラム",
  techBadge: "先進的テクノロジー基盤",
  techTitle: "エンタープライズグレードの分散エッジシステム",
  ecosystemBadge: "世界的コングロマリット",
  ecosystemTitle: "グローバル・サフィ・エコシステム",
  faqBadge: "よくあるご質問",
  faqTitle: "公式の回答と透明性のあるご案内"
};

const ko: AboutTranslation = {
  ...en,
  manifestoBadge: "사피 아카데미 선언문",
  manifestoTitle: "사피 아카데미를 설립한 이유:",
  manifestoHighlight: "이론을 뛰어넘는 실전 기술. 막연한 추측을 넘어선 실행력.",
  curriculumBadge: "종합 커리큘럼",
  curriculumTitle: "전문 교육 분야",
  techBadge: "첨단 기술 인프라",
  techTitle: "엔터프라이즈급 엣지 시스템 기반",
  ecosystemBadge: "글로벌 기업 복합체",
  ecosystemTitle: "글로벌 사피 생태계",
  faqBadge: "자주 묻는 질문",
  faqTitle: "투명하고 명확한 공식 답변"
};

const nl: AboutTranslation = {
  ...en,
  manifestoBadge: "Het Manifest van Safi Academy",
  manifestoTitle: "Waarom we Safi Academy hebben opgericht:",
  manifestoHighlight: "Vaardigheden boven theorie. Uitvoering boven speculatie.",
  curriculumBadge: "Uitgebreid curriculum",
  curriculumTitle: "Onze academische disciplines",
  techBadge: "Technologische infrastructuur",
  techTitle: "Gebouwd op enterprise-grade edge-systemen",
  ecosystemBadge: "Zakelijk conglomeraat",
  ecosystemTitle: "Het wereldwijde Safi-ecosysteem",
  faqBadge: "Veelgestelde vragen",
  faqTitle: "Duidelijke en officiële antwoorden"
};

const uz: AboutTranslation = {
  ...fa,
  manifestoBadge: "Safi Academy bosh manifesti",
  manifestoTitle: "Nega Safi Akademiyasini yaratdik:",
  manifestoHighlight: "Nazariyadan ko'ra real mahorat. Taxmindan ko'ra amaliy ijro.",
  curriculumBadge: "Keng qamrovli o'quv dasturi",
  curriculumTitle: "Akademik yo'nalishlarimiz",
  techBadge: "Texnologik infratuzilma",
  techTitle: "Yuqori darajadagi xalqaro server tizimlari",
  ecosystemBadge: "Katta xalqaro xolding",
  ecosystemTitle: "Global Safi ekotizimi",
  faqBadge: "Rasmiy savol-javoblar",
  faqTitle: "Ko'p beriladigan savollarga javoblar"
};

const id: AboutTranslation = {
  ...en,
  manifestoBadge: "Manifesto Safi Academy",
  manifestoTitle: "Mengapa Kami Membangun Safi Academy:",
  manifestoHighlight: "Keahlian di atas teori. Eksekusi nyata di atas spekulasi.",
  curriculumBadge: "Kurikulum Komprehensif",
  curriculumTitle: "Disiplin Akademik Kami",
  techBadge: "Infrastruktur Teknologi",
  techTitle: "Dibangun di atas sistem edge tingkat korporat",
  ecosystemBadge: "Konglomerat Korporat",
  ecosystemTitle: "Ekosistem Global Safi",
  faqBadge: "Pertanyaan yang Sering Diajukan",
  faqTitle: "Jawaban Resmi dan Transparan"
};

export const aboutTranslationsMap: Record<string, AboutTranslation> = {
  en, fa, ps, ar, ur, de, fr, es, ru, tr, zh, hi, it, pt, ja, ko, nl, uz, id
};

export function getAboutTranslation(locale: string): AboutTranslation {
  const norm = (locale || "en").toLowerCase();
  return aboutTranslationsMap[norm] || aboutTranslationsMap.en;
}
