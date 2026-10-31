// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES INSTRUCTOR APPLICATION TRANSLATIONS
// 100% Native Translations, zero spread fallbacks, zero language leaks.
// ============================================================================

export interface InstructorBenefit {
  title: string;
  desc: string;
  highlight: string;
}

export interface InstructorStage {
  num: string;
  title: string;
  desc: string;
}

export interface InstructorFaq {
  q: string;
  a: string;
}

export interface InstructorApplicationTranslation {
  isRtl: boolean;
  badge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  metricRevenue: string;
  metricRevenueLabel: string;
  metricStudents: string;
  metricStudentsLabel: string;
  metricClassrooms: string;
  metricClassroomsLabel: string;
  metricReview: string;
  metricReviewLabel: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: InstructorBenefit[];
  stagesBadge: string;
  stagesTitle: string;
  stages: InstructorStage[];
  faqsBadge: string;
  faqsTitle: string;
  faqs: InstructorFaq[];
  formBadge: string;
  formTitle: string;
  formSubtitle: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  nextBtn: string;
  prevBtn: string;
  submitBtn: string;
  submittingBtn: string;
  successTitle: string;
  successDesc: string;
}

export const instructorApplicationTranslations: Record<string, InstructorApplicationTranslation> = {
  "en": {
  "isRtl": false,
  "badge": "Safi Academy Faculty Recruitment • Cohort 2026",
  "heroTitle": "Teach the Future.",
  "heroTitleHighlight": "Earn With Global Impact.",
  "heroSubtitle": "Share your real-world mastery in Tech, E-Commerce, Financial Markets, and Corporate Strategy with ambitious learners worldwide. Enjoy high revenue share, state-of-the-art live classrooms, and full LMS support.",
  "metricRevenue": "Up to 70%",
  "metricRevenueLabel": "Revenue Share",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "Global Students",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Live Classrooms",
  "metricReview": "48-72h",
  "metricReviewLabel": "Review Window",
  "benefitsTitle": "Why Elite Instructors Choose Safi Academy",
  "benefitsSubtitle": "We take care of infrastructure, global payment processing, student acquisition, and marketing so you can focus 100% on teaching.",
  "benefits": [
    {
      "title": "Industry-Leading Revenue Split",
      "desc": "Earn up to 70% net revenue on course sales and cohort enrollments with guaranteed monthly payouts.",
      "highlight": "High Earning"
    },
    {
      "title": "Ultra-Low Latency Live Classrooms",
      "desc": "Deliver live interactive lectures with HD multi-stream video, interactive whiteboards, and instant chat powered by Agora RTC.",
      "highlight": "HD Streaming"
    },
    {
      "title": "Automated Student LMS",
      "desc": "Comprehensive tools for assignment grading, quiz attempts, attendance logs, and automatic certificate issuance.",
      "highlight": "Time Saving"
    },
    {
      "title": "Global Audience & Marketing",
      "desc": "We promote your courses across our 50,000+ student network in the US, UK, Middle East, Central Asia, and Europe.",
      "highlight": "Built-in Traffic"
    }
  ],
  "stagesBadge": "Admissions Roadmap",
  "stagesTitle": "Simple 4-Step Selection Process",
  "stages": [
    {
      "num": "01",
      "title": "Application & Syllabus Submission",
      "desc": "Submit your bio, credentials, professional achievements, and a proposed course syllabus."
    },
    {
      "num": "02",
      "title": "Pedagogy & Technical Review",
      "desc": "Our academic committee evaluates course depth, market demand, and teaching style within 48-72 hours."
    },
    {
      "num": "03",
      "title": "Live Audition & Demo Lecture",
      "desc": "A 15-minute live demo lecture over Agora HD to test audio/video quality and presentation clarity."
    },
    {
      "num": "04",
      "title": "Contract & Cohort Launch",
      "desc": "Sign a formal revenue-share agreement, onboard to your instructor portal, and launch your first batch."
    }
  ],
  "faqsBadge": "Got Questions?",
  "faqsTitle": "Frequently Asked Questions",
  "faqs": [
    {
      "q": "How does the revenue share and monthly payout work?",
      "a": "Instructors receive up to 70% net revenue on sales of their courses and live cohorts. Payouts are processed on the 1st of every month via Bank Wire, Wise, PayPal, Stripe, or Crypto."
    },
    {
      "q": "Do I have to teach live, or can I submit pre-recorded video courses?",
      "a": "We support both! You can lead live cohort-based workshops via our Agora HD virtual classrooms, or publish self-paced video masterclasses with quizzes and downloadable resources."
    },
    {
      "q": "Who owns the intellectual property (IP) of my course materials?",
      "a": "You retain 100% intellectual property ownership of your content. You grant Safi Academy a non-exclusive license to host and distribute the course to enrolled students."
    },
    {
      "q": "What hardware and software setup do I need to teach?",
      "a": "All you need is a reliable broadband internet connection (at least 15 Mbps upload), a 1080p webcam, and a clear USB or XLR microphone."
    }
  ],
  "formBadge": "Faculty Admissions Application",
  "formTitle": "Instructor Application Form",
  "formSubtitle": "Fill in your background and teaching domain to join our global faculty network.",
  "step1Title": "Personal Profile",
  "step2Title": "Teaching Domain & Course",
  "step3Title": "Experience & Audition Video",
  "step4Title": "Credentials & Review",
  "nextBtn": "Continue",
  "prevBtn": "Back",
  "submitBtn": "Submit Faculty Application",
  "submittingBtn": "Submitting Application...",
  "successTitle": "Application Submitted Successfully!",
  "successDesc": "Our academic committee will review your portfolio within 48-72 hours and contact you for the audition."
},
  "fa": {
  "isRtl": true,
  "badge": "جذب اساتید و هیئت علمی آکادمی صافی • دوره ۲۰۲۶",
  "heroTitle": "آینده را آموزش دهید.",
  "heroTitleHighlight": "با تأثیرگذاری جهانی کسب درآمد کنید.",
  "heroSubtitle": "تخصص عملی خود را در فناوری، تجارت الکترونیک، بازارهای مالی و مدیریت به اشتراک بگذارید. از سهم درآمد بالا، کلاس‌های تصویری زنده فوق‌پیشرفته و سیستم جامع LMS بهره‌مند شوید.",
  "metricRevenue": "تا ۷۰٪",
  "metricRevenueLabel": "سهم درآمد استاد",
  "metricStudents": "۵۰,۰۰۰+",
  "metricStudentsLabel": "شاگردان بین‌المللی",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "کلاس‌های زنده صوتی و تصویری",
  "metricReview": "۴۸-۷۲ ساعت",
  "metricReviewLabel": "مدت بررسی درخواست",
  "benefitsTitle": "چرا اساتید برتر آکادمی صافی را انتخاب می‌کنند؟",
  "benefitsSubtitle": "ما زیرساخت‌ها، درگاه‌های پرداخت جهانی، جذب دانشجو و بازاریابی را مدیریت می‌کنیم تا شما ۱۰۰٪ بر تدریس تمرکز کنید.",
  "benefits": [
    {
      "title": "بالاترین سهم درآمد در صنعت آموزش",
      "desc": "تا ۷۰٪ از درآمد خالص حاصل از فروش دوره‌ها و اشتراک کلاس‌ها را با تسویه منظم و تضمین‌شده ماهانه دریافت کنید.",
      "highlight": "درآمد عالی"
    },
    {
      "title": "کلاس‌های آنلاین فوق‌سریع با آگورا (Agora)",
      "desc": "تدریس تعاملی و زنده با کیفیت HD، تخته‌سیاه هوشمند و چت همزمان بدون قطعی اینترنت.",
      "highlight": "پخش HD"
    },
    {
      "title": "سیستم جامع مدیریت یادگیری (LMS)",
      "desc": "ابزارهای هوشمند جهت ثبت حضور و غیاب، تصحیح تکالیف، برگزاری آزمون‌ها و صدور خودکار گواهی‌نامه‌ها.",
      "highlight": "صرفه‌جویی در وقت"
    },
    {
      "title": "مخاطبان بین‌المللی و بازاریابی هدفمند",
      "desc": "معرفی دوره‌های شما به جامعه ۵۰ هزار نفری دانشجویان در آمریکا، اروپا، خاورمیانه و آسیای مرکزی.",
      "highlight": "مخاطب آماده"
    }
  ],
  "stagesBadge": "نقشه راه گزینش اساتید",
  "stagesTitle": "فرآیند ۴ مرحله‌ای پیوستن به کادر علمی",
  "stages": [
    {
      "num": "۰۱",
      "title": "تکمیل فرم و ارسال سرفصل دوره",
      "desc": "ثبت رزومه، سوابق حرفه‌ای، افتخارات علمی و ارائه سرفصل پیشنهادی دوره آموزشی."
    },
    {
      "num": "۰۲",
      "title": "بررسی فنی و ارزیابی پداگوژیک",
      "desc": "بررسی سرفصل‌ها، جذابیت موضوع و مهارت تدریس شما توسط شورای علمی ظرف ۴۸ تا ۷۲ ساعت."
    },
    {
      "num": "۰۳",
      "title": "جلسه مصاحبه و تدریس آزمایشی",
      "desc": "ارائه یک تدریس آزمایشی ۱۵ دقیقه‌ای در بستر کلاس‌های زنده آگورا جهت سنجش کیفیت صدا، تصویر و نحوه بیان."
    },
    {
      "num": "۰۴",
      "title": "عقد قرارداد و آغاز برگزاری دوره",
      "desc": "امضای قرارداد شفاف سهم درآمد، دریافت پنل اختصاصی مدیریت کلاس و شروع ثبت‌نام اولین دوره."
    }
  ],
  "faqsBadge": "پرسش‌های پرتکرار",
  "faqsTitle": "سؤالات متداول اساتید و مدرسان",
  "faqs": [
    {
      "q": "نحوه تسویه حساب و دریافت سهم درآمد چگونه است؟",
      "a": "اساتید تا ۷۰٪ از درآمد خالص فروش دوره‌های خود را دریافت می‌کنند. تسویه‌ها در روز اول هر ماه میلادی از طریق وایز، حساب بانکی، پی‌پال یا کریپتو واریز می‌شود."
    },
    {
      "q": "آیا دوره‌ها باید حتماً زنده برگزار شوند یا ویدیوهای ضبط‌شده هم پذیرفته می‌شود؟",
      "a": "ما از هر دو روش پشتیبانی می‌کنیم. شما می‌توانید دوره‌های زنده تعاملی برگزار کنید یا دوره‌های ویدیویی با آزمون و پروژه منتشر نمایید."
    },
    {
      "q": "مالکیت معنوی محتوای دوره‌ها متعلق به کیست؟",
      "a": "۱۰۰٪ حقوق مادی و معنوی محتوای آموزشی برای همیشه متعلق به خود شماست و شما تنها مجوز انتشار در پلتفرم آکادمی صافی را به ما می‌دهید."
    },
    {
      "q": "برای تدریس به چه تجهیزات فنی نیاز دارم؟",
      "a": "اینترنت پرسرعت با آپلود مناسب (حداقل ۱۵ مگابیت)، وبکم با کیفیت Full HD و میکروفون با صدای شفاف و بدون نویز."
    }
  ],
  "formBadge": "فرم پذیرش هیئت علمی و اساتید",
  "formTitle": "درخواست تدریس در آکادمی صافی",
  "formSubtitle": "مشخصات و حوزه تدریس خود را وارد کنید تا به جمع اساتید بین‌المللی ما بپیوندید.",
  "step1Title": "اطلاعات فردی و ارتباطی",
  "step2Title": "حوزه تخصصی و معرفی دوره",
  "step3Title": "سوابق تدریس و نمونه ویدیو",
  "step4Title": "مدارک و تأیید نهایی",
  "nextBtn": "مرحله بعد",
  "prevBtn": "مرحله قبل",
  "submitBtn": "ارسال نهایی درخواست تدریس",
  "submittingBtn": "در حال ارسال درخواست...",
  "successTitle": "درخواست شما با موفقیت ثبت شد!",
  "successDesc": "شورای علمی آکادمی مدارک شما را ظرف ۴۸ تا ۷۲ ساعت کاری بررسی و جهت هماهنگی جلسه با شما تماس خواهد گرفت."
},
  "ps": {
  "isRtl": true,
  "badge": "د صافي اکاډمۍ د استادانو جذب • ۲۰۲۶ لړۍ",
  "heroTitle": "راتلونکي ته زده کړه ورکړئ.",
  "heroTitleHighlight": "د نړیوال اغېز سره عاید ترلاسه کړئ.",
  "heroSubtitle": "په ټیکنالوژۍ، ای کامرس، مالي مارکیټونو او ستراتیژۍ کې خپلې عملي تجربې له نړیوالو محصلینو سره شریکې کړئ. د لوړ عاید او پرمختللو ټولګیو څخه ګټه پورته کړئ.",
  "metricRevenue": "تر ۷۰٪ پورې",
  "metricRevenueLabel": "د استاد د عاید برخه",
  "metricStudents": "۵۰,۰۰۰+",
  "metricStudentsLabel": "نړیوال زده کوونکي",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "ژوندي غږیز او ویډیویي ټولګي",
  "metricReview": "۴۸-۷۲ ساعته",
  "metricReviewLabel": "د غوښتنلیک د بیاکتنې موده",
  "benefitsTitle": "ولې نامتو استادان صافي اکاډمي غوره کوي؟",
  "benefitsSubtitle": "موږ د زیربناوو، نړیوالو بانکي تادیاتو او بازارموندنې مدیریت کوو ترڅو تاسو په بشپړه توګه په تدریس تمرکز وکړئ.",
  "benefits": [
    {
      "title": "د لوړ عاید لویه برخه",
      "desc": "د خپلو کورسونو د پلور او نوم لیکنې څخه تر ۷۰٪ پورې عاید په منظمه میاشتنۍ توګه ترلاسه کړئ.",
      "highlight": "لوړ عاید"
    },
    {
      "title": "د پرمختللي Agora سیستم په مټ ژوندي ټولګي",
      "desc": "په لوړ کیفیت HD ویډیو، چټک غږ او هوښیار بورډ سره د نړۍ له هر ګوټ څخه ژوندۍ تدریس وکړئ.",
      "highlight": "لوړ کیفیت"
    },
    {
      "title": "د محصلینو د مدیریت اتومات سیستم (LMS)",
      "desc": "د کورنیو دندو کتل، د ازموینو اخیستل او په اتوماتيک ډول د تصدیق پاڼو صادرول.",
      "highlight": "وخت سپما"
    },
    {
      "title": "نړیوال محصلین او پراخه بازارموندنه",
      "desc": "ستاسو کورسونه په امریکا، اروپا او اسیا کې زموږ له ۵۰ زره زیاتو زده کوونکو ته رسول کیږي.",
      "highlight": "چمتو محصلین"
    }
  ],
  "stagesBadge": "د استادانو د ټاکنې لارښود",
  "stagesTitle": "د کادر غړیتوب څلور پړاوه لارښود",
  "stages": [
    {
      "num": "۰۱",
      "title": "د فورم ډکول او د کورس پلان وړاندې کول",
      "desc": "خپله پخوانۍ تجربه، کاري ریکارډ او د وړاندیز شوي کورس مفصله خاکه وسپارئ."
    },
    {
      "num": "۰۲",
      "title": "تخنیکي او مسلکي کتنه",
      "desc": "زموږ علمي شورا به په ۴۸ تر ۷۲ ساعتونو کې ستاسو د تدریس بڼه او د کورس اهمیت وڅېړي."
    },
    {
      "num": "۰۳",
      "title": "ازمایښتي تدریس او مرکه",
      "desc": "په ژوندي ټولګي کې ۱۵ دقیقې لنډ ازمایښتي درس ورکړئ ترڅو ستاسو د غږ او تدریس مهارت ولیدل شي."
    },
    {
      "num": "۰۴",
      "title": "تړون لاسلیک کول او د ټولګیو پیل",
      "desc": "د عاید رسمي تړون لاسلیک کړئ، د استادانو پینل ترلاسه کړئ او خپل لومړنی ټولګی پیل کړئ."
    }
  ],
  "faqsBadge": "عامې پوښتنې",
  "faqsTitle": "د ښوونکو او استادانو پوښتنې",
  "faqs": [
    {
      "q": "د عاید ویش او ترلاسه کول څنګه دي؟",
      "a": "استادان تر ۷۰٪ پورې د کورسونو خالص عاید ترلاسه کوي او د هرې میاشتې په لومړۍ نېټه د وایز، بانکي حساب، پی‌پال یا کریپټو له لارې ورکول کیږي."
    },
    {
      "q": "ایا ټولګي باید حتماً ژوندي وي که ویډیوګانې هم منل کیږي؟",
      "a": "موږ دواړه منو! تاسو کولی شئ ژوندي ټولګي واخلئ یا ریکارډ شوي لوړ کیفیت ویډیویي درسونه وړاندې کړئ."
    },
    {
      "q": "د درسي موادو فکري ملکیت د چا دی؟",
      "a": "د درسي موادو سل په سلو کې حق ستاسو خپل دی او تاسو یوازې صافي اکاډمۍ ته د خپرولو اجازه ورکوئ."
    },
    {
      "q": "د تدریس لپاره کوم تخنیکي وسایل پکار دي؟",
      "a": "یو چټک انټرنیټ، د Full HD کامره او یو پاک بې شور مایکروفون کافي دي."
    }
  ],
  "formBadge": "د علمي کادر د جذب فورمه",
  "formTitle": "په صافي اکاډمۍ کې د تدریس غوښتنلیک",
  "formSubtitle": "خپل معلومات او د تدریس برخه وليکئ ترڅو زموږ له نړیوال ټیم سره یوځای شئ.",
  "step1Title": "شخصي معلومات او اړیکه",
  "step2Title": "د تدریس څانګه او د کورس نوم",
  "step3Title": "کاري تجربه او نمونه ویډیو",
  "step4Title": "اسناد او وروستۍ تاییدي",
  "nextBtn": "راتلونکی ګام",
  "prevBtn": "شاته",
  "submitBtn": "د غوښتنلیک وروستی لیږل",
  "submittingBtn": "د ثبتولو په حال کې...",
  "successTitle": "غوښتنلیک په بریا سره واستول شو!",
  "successDesc": "زموږ علمي شورا به په ۴۸ تر ۷۲ ساعتونو کې ستاسو اسناد وګوري او له تاسو سره به اړیکه ونیسي."
},
  "ar": {
  "isRtl": true,
  "badge": "استقطاب الكفاءات والأساتذة • أكاديمية صافي ٢٠٢٦",
  "heroTitle": "اصنع مستقبل التعليم.",
  "heroTitleHighlight": "واربح بتأثير أكاديمي عالمي.",
  "heroSubtitle": "شارك خبرتك العملية في التكنولوجيا، التجارة الإلكترونية، الأسواق المالية وإدارة الأعمال مع طلاب طموحين حول العالم. تمتع بأعلى نسبة أرباح وفصول افتراضية متطورة ودعم تعليمي متكامل.",
  "metricRevenue": "تصل إلى ٧٠٪",
  "metricRevenueLabel": "نسبة أرباح المدرب",
  "metricStudents": "٥٠,٠٠٠+",
  "metricStudentsLabel": "طالب حول العالم",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "فصول افتراضية تفاعلية",
  "metricReview": "٤٨-٧٢ ساعة",
  "metricReviewLabel": "مدة مراجعة الطلب",
  "benefitsTitle": "لماذا يفضل نخبة المدربين أكاديمية صافي؟",
  "benefitsSubtitle": "نتولى إدارة البنية التحتية، بوابات الدفع العالمية، واستقطاب الطلاب والتسويق لتركز بنسبة ١٠٠٪ على جودة التدريس.",
  "benefits": [
    {
      "title": "أعلى نسبة مشاركة في الأرباح",
      "desc": "احصل على ما يصل إلى ٧٠٪ من صافي مبيعات دوراتك واشتراكات الطلاب مع تحويل شهري مضمون ومنتظم.",
      "highlight": "دخل مرتفع"
    },
    {
      "title": "فصول افتراضية بتقنية Agora فائقة السرعة",
      "desc": "قدم محاضراتك ببث عالي الدقة HD، وألواح كتابة تفاعلية، ومحادثات فورية دون تأخير في البث.",
      "highlight": "بث عالي الدقة"
    },
    {
      "title": "نظام إدارة التعلم الذكي (LMS)",
      "desc": "أدوات متكاملة لإدارة الحضور، تصحيح التكليفات والواجبات، وإصدار الشهادات المعتمدة تلقائياً.",
      "highlight": "توفير الوقت"
    },
    {
      "title": "جمهور عالمي وتسويق احترافي",
      "desc": "نروج لدوراتك في شبكتنا التي تضم أكثر من ٥٠ ألف طالب في أمريكا، أوروبا، الشرق الأوسط وآسيا.",
      "highlight": "تسويق جاهز"
    }
  ],
  "stagesBadge": "خارطة طريق الانضمام",
  "stagesTitle": "٤ خطوات ميسرة للانضمام إلى هيئة التدريس",
  "stages": [
    {
      "num": "٠١",
      "title": "تقديم الطلب والمحتوى التدريبي",
      "desc": "أرسل سيرتك الذاتية وخبراتك السابقة ومخطط الدورة التدريبية المقترحة."
    },
    {
      "num": "٠٢",
      "title": "التقييم الأكاديمي والتقني",
      "desc": "تقوم لجنتنا الأكاديمية بمراجعة المحتوى والأسلوب التعليمي خلال ٤٨ إلى ٧٢ ساعة."
    },
    {
      "num": "٠٣",
      "title": "المقابلة والعرض التجريبي المباشر",
      "desc": "تقديم تجريبي لمدة ١٥ دقيقة عبر فصول Agora لاختبار وضوح الصوت والصورة ومهارات الإلقاء."
    },
    {
      "num": "٠٤",
      "title": "توقيع العقد وإطلاق الدورة",
      "desc": "توقيع اتفاقية تقاسم الأرباح، استلام لوحة تحكم المعلم، وبدء تسجيل الطلاب في دورتك الأولى."
    }
  ],
  "faqsBadge": "الأسئلة الشائعة",
  "faqsTitle": "استفسارات المدربين والأساتذة",
  "faqs": [
    {
      "q": "كيف تتم تسوية الأرباح وصرف العوائد الشهرية؟",
      "a": "يحصل المدرب على ما يصل إلى ٧٠٪ من صافي الإيرادات. تصرف العوائد في اليوم الأول من كل شهر ميلادي عبر الحسابات البنكية، Wise، PayPal، أو العملات الرقمية."
    },
    {
      "q": "هل يجب أن تكون الدورات مباشرة أم يمكن تقديم دورات مسجلة مسبقاً؟",
      "a": "ندعم كلا النموذجين! يمكنك تقديم ورش عمل تدريبية مباشرة وتفاعلية، أو نشر دورات مسجلة مع اختبارات ومشاريع عملية."
    },
    {
      "q": "من يمتلك الملكية الفكرية لمحتوى الدورات؟",
      "a": "تحتفظ بالملكية الفكرية الكاملة لمحتواك بنسبة ١٠٠٪، وتمنح الأكاديمية فقط ترخيصاً غير حصري لعرض الدورة للطلاب المسجلين."
    },
    {
      "q": "ما هي المعدات التقنية المطلوبة لبدء التدريس؟",
      "a": "كل ما تحتاجه هو اتصال إنترنت مستقر (سرعة رفع لا تقل عن ١٥ ميغابت)، كاميرا ويب Full HD، وميكروفون واضح وعازل للضوضاء."
    }
  ],
  "formBadge": "استمارة الانضمام لهيئة التدريس",
  "formTitle": "طلب الانضمام كمدرب في أكاديمية صافي",
  "formSubtitle": "أدخل بياناتك ومجال خبرتك للانضمام إلى شبكة خبرائنا الدولية.",
  "step1Title": "المعلومات الشخصية وبيانات الاتصال",
  "step2Title": "مجال التدريس وبيانات الدورة",
  "step3Title": "الخبرات ومقطع العرض التجريبي",
  "step4Title": "الشهادات والمراجعة النهائية",
  "nextBtn": "المتابعة",
  "prevBtn": "السابق",
  "submitBtn": "إرسال طلب التدريس",
  "submittingBtn": "جاري إرسال الطلب...",
  "successTitle": "تم إرسال طلبك بنجاح!",
  "successDesc": "ستقوم اللجنة الأكاديمية بمراجعة ملفك والتواصل معك لتحديد موعد العرض التجريبي خلال ٤٨-٧٢ ساعة."
},
  "ur": {
  "isRtl": true,
  "badge": "صافی اکیڈمی اساتذہ کی بھرتی • تعلیمی سال ۲۰۲۶",
  "heroTitle": "مستقبل کی تعلیم دیں۔",
  "heroTitleHighlight": "عالمی اثر کے ساتھ شاندار کمائی کریں۔",
  "heroSubtitle": "ٹیکنالوجی، ای کامرس، فنانشل مارکیٹس اور بزنس اسٹریٹجی میں اپنی مہارت دنیا بھر کے طلبہ تک پہنچائیں۔ زیادہ آمدنی کا حصہ، جدید ترین لائیو کلاس رومز اور مکمل لرننگ پورٹل سے فائدہ اٹھائیں۔",
  "metricRevenue": "۷۰٪ تک",
  "metricRevenueLabel": "اساتذہ کے منافع کا حصہ",
  "metricStudents": "۵۰,۰۰۰+",
  "metricStudentsLabel": "عالمی طلبہ",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "لائیو ایچ ڈی کلاس رومز",
  "metricReview": "۴۸-۷۲ گھنٹے",
  "metricReviewLabel": "درخواست کے جائزے کا وقت",
  "benefitsTitle": "معروف اساتذہ صافی اکیڈمی کا انتخاب کیوں کرتے ہیں؟",
  "benefitsSubtitle": "ہم ٹیکنالوجی، فیس کی وصولی اور مارکیٹنگ کا انتظام کرتے ہیں تاکہ آپ کا مکمل فوکس تدریس پر ہو۔",
  "benefits": [
    {
      "title": "آمدنی کا سب سے بہترین حصہ",
      "desc": "کورسز کی فروخت پر ۷۰ فیصد تک خالص آمدنی حاصل کریں، باقاعدہ ماہانہ ادائیگی کی گارنٹی کے ساتھ۔",
      "highlight": "بہترین آمدنی"
    },
    {
      "title": "جدید لائیو ورچوئل کلاس رومز",
      "desc": "بغیر کسی تعطل کے ایچ ڈی ویڈیو، انٹرایکٹو وائٹ بورڈ اور لائیو چیٹ کے ساتھ دنیا بھر میں تدریس کریں۔",
      "highlight": "ایچ ڈی ویڈیو"
    },
    {
      "title": "خودکار لرننگ منیجمنٹ سسٹم (LMS)",
      "desc": "حاضری، ہوم ورک کی جانچ، کوئز اور طالب علموں کو خودکار سرٹیفکیٹس کا مکمل نظام۔",
      "highlight": "وقت کی بچت"
    },
    {
      "title": "عالمی طلبہ اور مارکیٹنگ سپورٹ",
      "desc": "ہم آپ کے کورسز کو امریکہ، یورپ، مشرق وسطیٰ اور ایشیا میں اپنے ۵۰ ہزار سے زائد طلبہ میں پروموٹ کرتے ہیں۔",
      "highlight": "تیار مارکیٹ"
    }
  ],
  "stagesBadge": "اساتذہ کے انتخاب کا روڈ میپ",
  "stagesTitle": "فیکلٹی میں شمولیت کے ۴ آسان مراحل",
  "stages": [
    {
      "num": "۰۱",
      "title": "درخواست جمع کروانا اور نصاب کی تفصیل",
      "desc": "اپنا تعلیمی و تدریسی تجربہ اور مجوزہ کورس کا خاکہ ہمارے ساتھ شیئر کریں۔"
    },
    {
      "num": "۰۲",
      "title": "تکنیکی اور تدریسی جائزہ",
      "desc": "ہماری تعلیمی کمیٹی ۴۸ سے ۷۲ گھنٹوں میں کورس کے مواد اور آپ کے تدریسی انداز کا جائزہ لیتی ہے۔"
    },
    {
      "num": "۰۳",
      "title": "لائیو ڈیمو اور تعارفی کلاس",
      "desc": "ویڈیو اور آواز کے معیار اور سمجھانے کی صلاحیت کو جانچنے کے لیے ۱۵ منٹ کی مختصر ڈیمو کلاس۔"
    },
    {
      "num": "۰۴",
      "title": "معاہدہ اور کورس کا باقاعدہ آغاز",
      "desc": "شفاف معاہدے پر دستخط کریں، انسٹرکٹر ڈیش بورڈ حاصل کریں اور اپنی پہلی کلاس شروع کریں۔"
    }
  ],
  "faqsBadge": "عام سوالات",
  "faqsTitle": "اساتذہ کے عمومی سوالات",
  "faqs": [
    {
      "q": "آمدنی کا حصہ اور ماہانہ ادائیگی کس طرح ہوتی ہے؟",
      "a": "اساتذہ کو کورسز کی فروخت پر ۷۰ فیصد تک خالص آمدنی ملتی ہے۔ ادائیگیاں ہر ماہ کی یکم تاریخ کو بینک وائر، Wise، پے پال یا کرپٹو کے ذریعے کی جاتی ہیں۔"
    },
    {
      "q": "کیا لائیو پڑھانا لازمی ہے یا ریکارڈ شدہ ویڈیوز بھی دے سکتے ہیں؟",
      "a": "ہم دونوں طریقہ کار کی سہولت دیتے ہیں! آپ لائیو کلاسز بھی لے سکتے ہیں یا کوئز اور اسائنمنٹس کے ساتھ ریکارڈ شدہ کورس بھی فراہم کر سکتے ہیں۔"
    },
    {
      "q": "کورس کے مواد کے جملہ حقوق کس کے پاس ہوں گے؟",
      "a": "کورس کے ۱۰۰ فیصد جملہ حقوق آپ ہی کے پاس رہیں گے۔ آپ اکیڈمی کو صرف طلبہ کو مواد فراہم کرنے کا حق دیتے ہیں۔"
    },
    {
      "q": "تدریس کے لیے کون سے تکنیکی آلات درکار ہیں؟",
      "a": "تیز رفتار انٹرنیٹ کنکشن، ۱۰۸۰p فل ایچ ڈی ویب کیم اور صاف آواز والا معیاری مائیکروفون۔"
    }
  ],
  "formBadge": "فیکلٹی داخلہ فارم",
  "formTitle": "صافی اکیڈمی میں پڑھانے کی درخواست",
  "formSubtitle": "ہمارے عالمی تعلیمی نیٹ ورک کا حصہ بننے کے لیے اپنی تفصیلات درج کریں۔",
  "step1Title": "ذاتی معلومات اور رابطہ",
  "step2Title": "شعبہ تدریس اور کورس کا عنوان",
  "step3Title": "تدریسی تجربہ اور نمونہ ویڈیو",
  "step4Title": "اسناد اور حتمی جائزہ",
  "nextBtn": "اگلا مرحلہ",
  "prevBtn": "پچھلا مرحلہ",
  "submitBtn": "درخواست جمع کروائیں",
  "submittingBtn": "درخواست بھیجی جا رہی ہے...",
  "successTitle": "آپ کی درخواست کامیابی سے موصول ہو گئی!",
  "successDesc": "ہماری تعلیمی کمیٹی ۴۸ سے ۷۲ گھنٹوں میں آپ کی درخواست کا جائزہ لے کر آپ سے رابطہ کرے گی۔"
},
  "ru": {
  "isRtl": false,
  "badge": "Набор преподавателей Safi Academy • Набор 2026",
  "heroTitle": "Обучайте будущему.",
  "heroTitleHighlight": "Зарабатывайте с мировым признанием.",
  "heroSubtitle": "Делитесь своим практическим опытом в IT, электронной коммерции, финансах и бизнесе со студентами по всему миру. Высокая доля дохода, передовые виртуальные классы и мощная LMS-платформа.",
  "metricRevenue": "До 70%",
  "metricRevenueLabel": "Доля дохода автора",
  "metricStudents": "50 000+",
  "metricStudentsLabel": "Студентов по миру",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Интерактивные классы",
  "metricReview": "48-72 ч",
  "metricReviewLabel": "Срок рассмотрения",
  "benefitsTitle": "Почему ведущие эксперты выбирают Safi Academy",
  "benefitsSubtitle": "Мы берем на себя инфраструктуру, международный прием платежей, маркетинг и привлечение студентов, чтобы вы могли сосредоточиться на преподавании.",
  "benefits": [
    {
      "title": "Лучшие условия распределения дохода",
      "desc": "Получайте до 70% чистой выручки от продажи курсов с гарантированными ежемесячными выплатами без задержек.",
      "highlight": "Высокий доход"
    },
    {
      "title": "Сверхбыстрые онлайн-классы на Agora",
      "desc": "Проводите живые интерактивные вебинары в HD-качестве, с интерактивной доской и чатом в реальном времени.",
      "highlight": "HD-вещание"
    },
    {
      "title": "Автоматизированная платформа LMS",
      "desc": "Удобная проверка домашних заданий, проведение тестирований, журнал посещаемости и автоматическая выдача сертификатов.",
      "highlight": "Экономия времени"
    },
    {
      "title": "Глобальная аудитория и продвижение",
      "desc": "Мы продвигаем ваши программы среди 50 000+ мотивированных студентов в США, Европе, на Ближнем Востоке и в Азии.",
      "highlight": "Готовая аудитория"
    }
  ],
  "stagesBadge": "Этапы отбора",
  "stagesTitle": "Простой процесс отбора из 4 шагов",
  "stages": [
    {
      "num": "01",
      "title": "Подача заявки и учебной программы",
      "desc": "Заполните профиль, укажите профессиональные достижения и приложите план предлагаемого курса."
    },
    {
      "num": "02",
      "title": "Педагогическая и техническая экспертиза",
      "desc": "Академический совет оценивает глубину программы и востребованность темы в течение 48-72 часов."
    },
    {
      "num": "03",
      "title": "Пробный демо-урок",
      "desc": "Короткое 15-минутное онлайн-выступление на платформе Agora для оценки качества звука, видео и подачи материала."
    },
    {
      "num": "04",
      "title": "Подписание договора и запуск курса",
      "desc": "Заключение официального договора о распределении дохода, настройка кабинета преподавателя и старт набора."
    }
  ],
  "faqsBadge": "Вопросы и ответы",
  "faqsTitle": "Частые вопросы преподавателей",
  "faqs": [
    {
      "q": "Как рассчитывается доход и как происходят ежемесячные выплаты?",
      "a": "Преподаватели получают до 70% чистой прибыли от продаж. Выплаты производятся 1-го числа каждого месяца через Bank Wire, Wise, PayPal, Stripe или криптовалюту."
    },
    {
      "q": "Обязательно ли вести занятия вживую или можно предоставить предзаписанные уроки?",
      "a": "Мы поддерживаем оба формата: как интерактивные когортные занятия в реальном времени, так и видеокурсы для самостоятельного изучения."
    },
    {
      "q": "Кому принадлежат авторские права на учебные материалы?",
      "a": "Вы сохраняете 100% авторских прав на свои материалы. Вы предоставляете Safi Academy неисключительную лицензию на размещение курса."
    },
    {
      "q": "Какое оборудование требуется для комфортного ведения занятий?",
      "a": "Стабильное интернет-соединение (скорость отдачи от 15 Мбит/с), веб-камера Full HD 1080p и качественный микрофон без фонового шума."
    }
  ],
  "formBadge": "Анкета кандидата в преподаватели",
  "formTitle": "Заявка на преподавание в Safi Academy",
  "formSubtitle": "Заполните данные о себе и выберите направление, чтобы присоединиться к международной команде.",
  "step1Title": "Личные и контактные данные",
  "step2Title": "Направление преподавания и курс",
  "step3Title": "Опыт и демо-видео",
  "step4Title": "Квалификация и проверка",
  "nextBtn": "Далее",
  "prevBtn": "Назад",
  "submitBtn": "Отправить заявку",
  "submittingBtn": "Отправка анкеты...",
  "successTitle": "Заявка успешно отправлена!",
  "successDesc": "Академический совет рассмотрит ваше резюме в течение 48-72 часов и свяжется с вами для согласования собеседования."
},
  "tr": {
  "isRtl": false,
  "badge": "Safi Academy Eğitmen Alımı • 2026 Dönemi",
  "heroTitle": "Geleceği Eğitin.",
  "heroTitleHighlight": "Küresel Etkiyle Kazanç Sağlayın.",
  "heroSubtitle": "Yazılım, e-ticaret, finansal piyasalar ve strateji alanındaki uzmanlığınızı dünya çapındaki hevesli öğrencilerle paylaşın. Yüksek gelir payı, gelişmiş canlı sınıflar ve tam LMS desteğinden yararlanın.",
  "metricRevenue": "%70'e Varan",
  "metricRevenueLabel": "Gelir Payı",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Küresel Öğrenci",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Canlı Sanal Sınıflar",
  "metricReview": "48-72 Saat",
  "metricReviewLabel": "Değerlendirme Süresi",
  "benefitsTitle": "Seçkin Eğitmenler Neden Safi Academy'yi Tercih Ediyor?",
  "benefitsSubtitle": "Teknik altyapı, uluslararası ödeme sistemleri, pazarlama ve öğrenci bulma süreçlerini biz yönetiyoruz; siz sadece eğitime odaklanın.",
  "benefits": [
    {
      "title": "Sektör Lideri Gelir Paylaşımı",
      "desc": "Kurs satışlarından ve canlı ders kayıtlarından net %70'e varan gelir elde edin, düzenli aylık ödemelerle kazancınızı alın.",
      "highlight": "Yüksek Kazanç"
    },
    {
      "title": "Ultra Düşük Gecikmeli Canlı Sınıflar",
      "desc": "Agora RTC destekli HD çoklu video yayını, interaktif yazı tahtası ve anlık sohbet ile kesintisiz canlı dersler verin.",
      "highlight": "HD Yayın"
    },
    {
      "title": "Otomatik Öğrenci Yönetim Sistemi (LMS)",
      "desc": "Ödev notlandırma, sınav değerlendirmeleri, yoklama takibi ve otomatik sertifika oluşturma araçlarıyla zamandan tasarruf edin.",
      "highlight": "Zaman Tasarrufu"
    },
    {
      "title": "Küresel Kitle ve Hedefli Pazarlama",
      "desc": "Kurslarınızı ABD, İngiltere, Orta Doğu, Orta Asya ve Avrupa'daki 50.000'den fazla öğrenciden oluşan ağımızda tanıtıyoruz.",
      "highlight": "Hazır Kitle"
    }
  ],
  "stagesBadge": "Eğitmen Kabul Yol Haritası",
  "stagesTitle": "4 Adımda Kolay Katılım Süreci",
  "stages": [
    {
      "num": "01",
      "title": "Başvuru ve Müfredat Teslimi",
      "desc": "Özgeçmişinizi, mesleki başarılarınızı ve önerdiğiniz ders müfredatını bize iletin."
    },
    {
      "num": "02",
      "title": "Pedagojik ve Teknik Değerlendirme",
      "desc": "Akademik kurulumuz dersin derinliğini, piyasa talebini ve anlatım tarzınızı 48-72 saat içinde inceler."
    },
    {
      "num": "03",
      "title": "Canlı Deneme Dersi ve Mülakat",
      "desc": "Ses/görüntü kalitesini ve hitabetinizi ölçmek için Agora HD üzerinden 15 dakikalık kısa bir deneme dersi gerçekleştirilir."
    },
    {
      "num": "04",
      "title": "Sözleşme ve Kurs Lansmanı",
      "desc": "Gelir ortaklığı sözleşmesini imzalayın, eğitmen panelinizi teslim alın ve ilk grubunuzu başlatın."
    }
  ],
  "faqsBadge": "Sıkça Sorulan Sorular",
  "faqsTitle": "Eğitmenler İçin Merak Edilenler",
  "faqs": [
    {
      "q": "Gelir paylaşımı ve aylık ödemeler nasıl işliyor?",
      "a": "Eğitmenler kurs satışlarından %70'e varan net pay alır. Kazançlar her ayın 1'inde Banka Havalesi, Wise, PayPal, Stripe veya Kripto ile ödenir."
    },
    {
      "q": "Dersleri canlı mı vermeliyim yoksa önceden kaydedilmiş videolar kabul ediliyor mu?",
      "a": "İki formatı da destekliyoruz! İster sanal sınıflarımızda canlı atölyeler düzenleyin, ister sınav ve projeler içeren video eğitim setleri yayınlayın."
    },
    {
      "q": "Eğitim materyallerimin telif hakları kime ait?",
      "a": "Materyallerinizin tüm telif hakları %100 size aittir. Safi Academy'ye yalnızca dersi öğrencilere sunma lisansı vermiş olursunuz."
    },
    {
      "q": "Ders vermek için hangi donanımlara ihtiyacım var?",
      "a": "İhtiyacınız olan tek şey en az 15 Mbps yükleme hızına sahip internet, 1080p HD web kamerası ve kaliteli bir mikrofondur."
    }
  ],
  "formBadge": "Eğitmen Başvuru Formu",
  "formTitle": "Safi Academy Eğitmen Başvurusu",
  "formSubtitle": "Küresel eğitim kadromuza katılmak için bilgilerinizi ve uzmanlık alanınızı girin.",
  "step1Title": "Kişisel ve İletişim Bilgileri",
  "step2Title": "Uzmanlık Alanı ve Kurs Bilgisi",
  "step3Title": "Deneyim ve Örnek Video",
  "step4Title": "Nitelikler ve İnceleme",
  "nextBtn": "Devam Et",
  "prevBtn": "Geri",
  "submitBtn": "Başvuruyu Tamamla",
  "submittingBtn": "Başvuru Gönderiliyor...",
  "successTitle": "Başvurunuz Başarıyla Alındı!",
  "successDesc": "Akademik kurulumuz dosyanızı 48-72 saat içinde inceleyecek ve deneme dersi için sizinle iletişime geçecektir."
},
  "de": {
  "isRtl": false,
  "badge": "Dozenten-Rekrutierung der Safi Academy • Jahrgang 2026",
  "heroTitle": "Gestalten Sie Bildung.",
  "heroTitleHighlight": "Mit weltweiter Wirkung gutes Geld verdienen.",
  "heroSubtitle": "Geben Sie Ihre Praxiserfahrung in Software-Engineering, E-Commerce, Finanzmärkten und Unternehmensstrategie an ambitionierte Lernende weltweit weiter. Profitieren Sie von attraktiven Erlösanteilen, modernsten virtuellen Klassenräumen und einem Rundum-LMS-Support.",
  "metricRevenue": "Bis zu 70 %",
  "metricRevenueLabel": "Dozenten-Erlösanteil",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Internationale Studierende",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Interaktive Live-Räume",
  "metricReview": "48–72 Std.",
  "metricReviewLabel": "Prüfungszeitraum",
  "benefitsTitle": "Warum Spitzen-Dozenten die Safi Academy wählen",
  "benefitsSubtitle": "Wir übernehmen Infrastruktur, globale Zahlungsabwicklung, Kursmarketing und Teilnehmergewinnung – Sie konzentrieren sich zu 100 % auf exzellente Lehre.",
  "benefits": [
    {
      "title": "Branchenführende Erlösbeteiligung",
      "desc": "Verdienen Sie bis zu 70 % des Nettoerlöses aus Kursverkäufen und Gruppenkursen mit garantierter monatlicher Auszahlung.",
      "highlight": "Hohe Einnahmen"
    },
    {
      "title": "Verzögerungsfreie HD-Live-Klassenräume",
      "desc": "Halten Sie interaktive Live-Vorlesungen mit HD-Videoübertragung, interaktiven Whiteboards und Echtzeit-Chat auf Basis von Agora RTC.",
      "highlight": "HD-Streaming"
    },
    {
      "title": "Vollautomatisiertes Lernmanagementsystem (LMS)",
      "desc": "Komfortable Tools für Aufgabenkorrektur, Online-Tests, Anwesenheitsprotokolle und automatische Zertifikatsausstellung.",
      "highlight": "Zeitersparnis"
    },
    {
      "title": "Weltweites Publikum & Gezieltes Marketing",
      "desc": "Wir bewerben Ihre Kurse in unserem weltweiten Netzwerk von über 50.000 Studierenden in den USA, Europa, dem Nahen Osten und Asien.",
      "highlight": "Bestehende Zielgruppe"
    }
  ],
  "stagesBadge": "Aufnahmeprozess",
  "stagesTitle": "In 4 einfachen Schritten zum Dozenten",
  "stages": [
    {
      "num": "01",
      "title": "Bewerbung & Lehrplanentwurf",
      "desc": "Reichen Sie Ihr Profil, Ihre Qualifikationen und den Entwurf Ihres vorgeschlagenen Kursplans ein."
    },
    {
      "num": "02",
      "title": "Fachliche & Didaktische Prüfung",
      "desc": "Unser akademischer Beirat prüft Inhaltstiefe und Marktnachfrage Ihres Themas innerhalb von 48 bis 72 Stunden."
    },
    {
      "num": "03",
      "title": "Live-Probelehrprobe",
      "desc": "Ein kurzes 15-minütiges Live-Webinar über Agora HD zur Überprüfung von Tonqualität, Video und Präsentationsstil."
    },
    {
      "num": "04",
      "title": "Vertragsabschluss & Kursstart",
      "desc": "Unterzeichnung der Kooperationsvereinbarung, Freischaltung des Dozenten-Dashboards und Start der Einschreibung."
    }
  ],
  "faqsBadge": "Häufige Fragen",
  "faqsTitle": "Wissenswertes für künftige Dozenten",
  "faqs": [
    {
      "q": "Wie funktioniert die Erlösbeteiligung und die monatliche Auszahlung?",
      "a": "Dozenten erhalten bis zu 70 % des Nettoerlöses aus den Kursverkäufen. Die Auszahlung erfolgt pünktlich zum 1. jedes Monats per Banküberweisung, Wise, PayPal, Stripe oder Krypto."
    },
    {
      "q": "Muss ich live unterrichten oder kann ich vorab aufgezeichnete Videokurse anbieten?",
      "a": "Wir unterstützen beides! Sie können interaktive Live-Kohortenkurse halten oder On-Demand-Videokurse mit begleitenden Übungen und Tests veröffentlichen."
    },
    {
      "q": "Wer behält die Urheberrechte (IP) an meinen Kursunterlagen?",
      "a": "Sie behalten 100 % des geistigen Eigentums an all Ihren Inhalten. Sie gewähren der Safi Academy lediglich eine nicht-exklusive Lizenz zur Bereitstellung für eingeschriebene Teilnehmer."
    },
    {
      "q": "Welche technische Ausstattung ist für den Unterricht erforderlich?",
      "a": "Sie benötigen lediglich eine stabile Internetverbindung (mindestens 15 Mbit/s Upload), eine 1080p-Full-HD-Webcam und ein klares Mikrofon."
    }
  ],
  "formBadge": "Bewerbungsformular für Lehrende",
  "formTitle": "Dozentenbewerbung an der Safi Academy",
  "formSubtitle": "Tragen Sie Ihre Daten und Ihr Fachgebiet ein, um unserem weltweiten Dozententeam beizutreten.",
  "step1Title": "Persönliche Daten & Kontakt",
  "step2Title": "Fachgebiet & Kurskonzept",
  "step3Title": "Lehrerfahrung & Demovideo",
  "step4Title": "Referenzen & Bestätigung",
  "nextBtn": "Weiter",
  "prevBtn": "Zurück",
  "submitBtn": "Dozentenbewerbung absenden",
  "submittingBtn": "Bewerbung wird übermittelt...",
  "successTitle": "Bewerbung erfolgreich eingereicht!",
  "successDesc": "Unser akademischer Beirat prüft Ihr Dossier innerhalb von 48 bis 72 Stunden und wird sich bezüglich einer Probelektion bei Ihnen melden."
},
  "fr": {
  "isRtl": false,
  "badge": "Recrutement du Corps Enseignant Safi Academy • Promotion 2026",
  "heroTitle": "Enseignez l'avenir.",
  "heroTitleHighlight": "Monétisez votre savoir avec un impact mondial.",
  "heroSubtitle": "Partagez votre expertise en ingénierie informatique, e-commerce, finance et stratégie d'entreprise avec des apprenants passionnés à travers le monde. Profitez d'une rémunération avantageuse, de classes virtuelles ultra-modernes et d'une plateforme LMS complète.",
  "metricRevenue": "Jusqu'à 70 %",
  "metricRevenueLabel": "Part des revenus",
  "metricStudents": "50 000+",
  "metricStudentsLabel": "Étudiants internationaux",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Classes interactives",
  "metricReview": "48-72h",
  "metricReviewLabel": "Délai d'examen",
  "benefitsTitle": "Pourquoi les formateurs d'élite choisissent Safi Academy",
  "benefitsSubtitle": "Nous gérons toute l'infrastructure technique, les encaissements internationaux et le marketing pour que vous puissiez vous dédier à 100 % à l'enseignement.",
  "benefits": [
    {
      "title": "Partage des revenus le plus avantageux du secteur",
      "desc": "Touchez jusqu'à 70 % des revenus nets sur les ventes de vos cours et cohortes avec des virements mensuels garantis.",
      "highlight": "Revenus élevés"
    },
    {
      "title": "Classes virtuelles interactives Agora HD",
      "desc": "Donnez des cours en direct en très haute définition, avec tableau blanc interactif et messagerie instantanée fluide.",
      "highlight": "Diffusion HD"
    },
    {
      "title": "Plateforme pédagogique automatisée (LMS)",
      "desc": "Outils avancés pour la notation des devoirs, la gestion des quiz, le suivi de présence et la délivrance automatique des diplômes.",
      "highlight": "Gain de temps"
    },
    {
      "title": "Audience mondiale et promotion active",
      "desc": "Nous faisons la promotion de vos formations auprès de notre communauté de plus de 50 000 étudiants en Amérique, Europe et Asie.",
      "highlight": "Audience qualifiée"
    }
  ],
  "stagesBadge": "Processus de sélection",
  "stagesTitle": "Rejoignez le corps enseignant en 4 étapes simples",
  "stages": [
    {
      "num": "01",
      "title": "Candidature et soumission du programme",
      "desc": "Transmettez votre CV, vos réalisations professionnelles et le plan détaillé du cours proposé."
    },
    {
      "num": "02",
      "title": "Évaluation pédagogique et technique",
      "desc": "Notre comité académique analyse la pertinence du cours et la demande du marché sous 48 à 72 heures."
    },
    {
      "num": "03",
      "title": "Leçon de démonstration en direct",
      "desc": "Une session en direct de 15 minutes sur Agora HD pour évaluer votre pédagogie et la clarté audiovisuelle."
    },
    {
      "num": "04",
      "title": "Signature du contrat et lancement",
      "desc": "Signature de l'accord de partenariat, configuration de votre espace enseignant et ouverture des inscriptions."
    }
  ],
  "faqsBadge": "Questions fréquentes",
  "faqsTitle": "Réponses aux questions des enseignants",
  "faqs": [
    {
      "q": "Comment fonctionnent le partage des revenus et le versement mensuel ?",
      "a": "Les formateurs perçoivent jusqu'à 70 % des revenus nets générés. Les virements sont effectués le 1er de chaque mois via virement bancaire, Wise, PayPal, Stripe ou cryptomonnaies."
    },
    {
      "q": "Dois-je obligatoirement enseigner en direct ou puis-je proposer des vidéos préenregistrées ?",
      "a": "Nous acceptons les deux approches ! Vous pouvez animer des promotions d'étudiants en direct ou publier des masterclasses vidéo avec quiz et exercices."
    },
    {
      "q": "Qui est propriétaire des droits de propriété intellectuelle sur mes cours ?",
      "a": "Vous demeurez l'unique propriétaire intellectuel à 100 % de tous vos supports. Vous accordez uniquement à Safi Academy une licence de diffusion."
    },
    {
      "q": "Quel matériel informatique est requis pour dispenser les cours ?",
      "a": "Une connexion Internet stable (au moins 15 Mbit/s en débit ascendant), une webcam 1080p et un micro clair avec réduction des bruits ambiants."
    }
  ],
  "formBadge": "Formulaire de candidature enseignant",
  "formTitle": "Rejoindre l'équipe pédagogique Safi Academy",
  "formSubtitle": "Renseignez votre profil et votre spécialité pour intégrer notre communauté académique internationale.",
  "step1Title": "Informations personnelles et contact",
  "step2Title": "Discipline et descriptif du cours",
  "step3Title": "Expérience et extrait vidéo",
  "step4Title": "Diplômes et validation",
  "nextBtn": "Continuer",
  "prevBtn": "Précédent",
  "submitBtn": "Envoyer ma candidature",
  "submittingBtn": "Envoi de la candidature...",
  "successTitle": "Candidature envoyée avec succès !",
  "successDesc": "Notre comité académique examinera vos pièces sous 48 à 72 heures et prendra contact avec vous pour organiser la démonstration."
},
  "es": {
  "isRtl": false,
  "badge": "Selección de Docentes Safi Academy • Convocatoria 2026",
  "heroTitle": "Enseña el futuro.",
  "heroTitleHighlight": "Genera ingresos con impacto académico global.",
  "heroSubtitle": "Comparte tu experiencia práctica en desarrollo de software, comercio electrónico, mercados financieros y dirección corporativa con alumnos de todo el mundo. Disfruta de un atractivo reparto de ingresos, aulas virtuales interactivas y soporte LMS integral.",
  "metricRevenue": "Hasta el 70 %",
  "metricRevenueLabel": "Reparto de ingresos",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Estudiantes globales",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Aulas virtuales en vivo",
  "metricReview": "48-72 h",
  "metricReviewLabel": "Plazo de evaluación",
  "benefitsTitle": "Por qué los mejores instructores eligen Safi Academy",
  "benefitsSubtitle": "Nos encargamos de la infraestructura técnica, cobros internacionales, captación de estudiantes y marketing para que te enfoques al 100 % en la enseñanza.",
  "benefits": [
    {
      "title": "El mejor porcentaje de ingresos del sector",
      "desc": "Gana hasta el 70 % de los ingresos netos por matriculaciones y venta de cursos, con liquidaciones mensuales garantizadas.",
      "highlight": "Altos ingresos"
    },
    {
      "title": "Aulas interactivas en vivo de latencia ultrabaja",
      "desc": "Imparte clases en vivo con vídeo HD multiemisión, pizarra interactiva y chat en tiempo real con tecnología Agora RTC.",
      "highlight": "Emisión HD"
    },
    {
      "title": "Sistema automatizado de gestión del aprendizaje (LMS)",
      "desc": "Herramientas avanzadas para corrección de tareas, exámenes en línea, control de asistencia y emisión de diplomas digitales.",
      "highlight": "Ahorro de tiempo"
    },
    {
      "title": "Audiencia internacional y promoción activa",
      "desc": "Difundimos tus cursos entre más de 50.000 estudiantes de nuestra comunidad en América, Europa, Oriente Medio y Asia.",
      "highlight": "Audiencia consolidada"
    }
  ],
  "stagesBadge": "Hoja de ruta de incorporación",
  "stagesTitle": "Proceso de admisión en 4 pasos sencillos",
  "stages": [
    {
      "num": "01",
      "title": "Solicitud y temario propuesto",
      "desc": "Envía tu biografía, trayectoria profesional y el programa detallado del curso que deseas impartir."
    },
    {
      "num": "02",
      "title": "Evaluación pedagógica y técnica",
      "desc": "Nuestro comité académico analiza la profundidad del temario y la demanda del mercado en un plazo de 48 a 72 horas."
    },
    {
      "num": "03",
      "title": "Clase de prueba en directo",
      "desc": "Una sesión demostrativa de 15 minutos en Agora HD para valorar tu metodología y la claridad audiovisual."
    },
    {
      "num": "04",
      "title": "Firma del acuerdo y apertura de inscripciones",
      "desc": "Firma del convenio de colaboración, acceso a tu panel de instructor y lanzamiento oficial de tu primer grupo de estudiantes."
    }
  ],
  "faqsBadge": "Preguntas frecuentes",
  "faqsTitle": "Dudas habituales de los docentes",
  "faqs": [
    {
      "q": "¿Cómo funciona el reparto de ingresos y cuándo se realizan los pagos?",
      "a": "Los instructores reciben hasta el 70 % de los ingresos netos de las ventas. Las liquidaciones se abonan el día 1 de cada mes mediante transferencia bancaria, Wise, PayPal, Stripe o criptomonedas."
    },
    {
      "q": "¿Es obligatorio dar clases en directo o se aceptan cursos grabados?",
      "a": "¡Admitimos ambas modalidades! Puedes liderar talleres interactivos en directo o publicar cursos grabados en vídeo con evaluaciones y material descargable."
    },
    {
      "q": "¿Quién conserva la propiedad intelectual (PI) de los materiales didácticos?",
      "a": "Tú conservas el 100 % de los derechos de propiedad intelectual de tus contenidos. Únicamente concedes a Safi Academy una licencia para su distribución en la plataforma."
    },
    {
      "q": "¿Qué requisitos técnicos se necesitan para impartir clase?",
      "a": "Solo precisas una conexión estable a internet (mínimo 15 Mbps de subida), una cámara web Full HD 1080p y un micrófono con sonido nítido."
    }
  ],
  "formBadge": "Formulario de admisión docente",
  "formTitle": "Solicitud de profesor en Safi Academy",
  "formSubtitle": "Facilita tus datos y tu área de especialización para incorporarte a nuestro claustro internacional.",
  "step1Title": "Datos personales y contacto",
  "step2Title": "Especialidad y propuesta de curso",
  "step3Title": "Experiencia y vídeo de muestra",
  "step4Title": "Acreditaciones y confirmación",
  "nextBtn": "Continuar",
  "prevBtn": "Atrás",
  "submitBtn": "Enviar solicitud docente",
  "submittingBtn": "Enviando solicitud...",
  "successTitle": "¡Solicitud enviada con éxito!",
  "successDesc": "Nuestro comité académico revisará tu perfil en un plazo de 48 a 72 horas y te contactará para coordinar la clase de prueba."
},
  "zh": {
  "isRtl": false,
  "badge": "Safi Academy 全球师资招募计划 • 2026年度",
  "heroTitle": "传授未来技能。",
  "heroTitleHighlight": "以全球影响力获取丰厚收益。",
  "heroSubtitle": "将您在软件研发、跨境电商、金融投资与商业管理领域的实战经验分享给全球求知学子。尊享高达70%的学费分成、一流的超低延迟互动直播教室及全自动LMS教学管理系统。",
  "metricRevenue": "最高达 70%",
  "metricRevenueLabel": "讲师分成比例",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "全球在册学员",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "超清直播课堂",
  "metricReview": "48-72小时",
  "metricReviewLabel": "申请审核周期",
  "benefitsTitle": "为什么全球顶尖名师选择 Safi Academy？",
  "benefitsSubtitle": "我们全权负责技术基建、跨国支付结算、学员招募与全球品牌营销，助您100%专注于教学本身。",
  "benefits": [
    {
      "title": "行业领先的丰厚学费分成",
      "desc": "享受高达70%的课程销售净收益分成，每月定期结算，资金准时直达您的指定国际账户。",
      "highlight": "高额收益"
    },
    {
      "title": "毫秒级超低延迟互动直播教室",
      "desc": "基于 Agora RTC 引擎打造，支持多路高清音视频、多功能互动白板及无延迟课堂交流。",
      "highlight": "超清直播"
    },
    {
      "title": "全自动化教学管理平台 (LMS)",
      "desc": "一键管理课后作业批阅、自动化在线随堂测验、学员出勤追踪及电子防伪结业证书颁发。",
      "highlight": "省时高效"
    },
    {
      "title": "自带全球生源与跨国营销推广",
      "desc": "我们面向欧美、中东、中亚等地区的50,000多名学员社群精准推广您的专属精品课程。",
      "highlight": "现成生源"
    }
  ],
  "stagesBadge": "师资准入流程",
  "stagesTitle": "4步轻松加入国际学术导师团队",
  "stages": [
    {
      "num": "01",
      "title": "提交申请与课程大纲",
      "desc": "填报您的个人履历、专业成就、教学经历以及拟开设课程的详细授课大纲。"
    },
    {
      "num": "02",
      "title": "教学法与专业深度评审",
      "desc": "学术评审委员会将在48至72小时内对课程大纲的体系深度及市场匹配度进行评估。"
    },
    {
      "num": "03",
      "title": "线上试讲与演示课",
      "desc": "在 Agora 直播平台进行15分钟的模拟试讲，测试音视频设备环境及课堂表达互动能力。"
    },
    {
      "num": "04",
      "title": "签署合作协议与课程上线",
      "desc": "签订具有法律效力的分成协议，开通讲师专属控制台，正式启动全球招生开课。"
    }
  ],
  "faqsBadge": "常见疑问",
  "faqsTitle": "讲师合作常见问题解答",
  "faqs": [
    {
      "q": "学费分成比例如何计算？每月如何结算提现？",
      "a": "讲师最高可享有课程销售净收入的70%。系统在每月1日自动结算，支持通过国际银行电汇、Wise、PayPal、Stripe 或加密资产提现。"
    },
    {
      "q": "我必须进行在线实时直播教学吗？是否支持录播视频课程？",
      "a": "两种模式均完美支持！您可以开设定期开课的高互动性直播训练营，也可以上传成套录播视频课程，配套随堂测验与课后答疑。"
    },
    {
      "q": "课程教学材料的知识产权 (IP) 归谁所有？",
      "a": "知识产权100%归讲师个人所有。您仅授予 Safi Academy 在平台内向付费学员提供课程播放与下载的非排他性许可。"
    },
    {
      "q": "开展授课需要配备哪些硬件和网络环境？",
      "a": "仅需稳定且上行速率不低于 15 Mbps 的宽带网络、一台 1080p 超清摄像头，以及降噪清晰的独立麦克风即可。"
    }
  ],
  "formBadge": "特聘讲师资格申请表",
  "formTitle": "Safi Academy 讲师申请表单",
  "formSubtitle": "请填写您的背景信息与拟授课方向，加入我们的全球师资网络。",
  "step1Title": "个人档案与联络方式",
  "step2Title": "专业教学领域与课程设想",
  "step3Title": "教学履历与试讲视频",
  "step4Title": "专业认证与最终确认",
  "nextBtn": "继续下一步",
  "prevBtn": "返回上一步",
  "submitBtn": "提交讲师入职申请",
  "submittingBtn": "正在提交申请...",
  "successTitle": "您的讲师申请已成功提交！",
  "successDesc": "学术委员会将在48至72小时内审核您的材料，并通过邮件联系您安排在线试讲。"
},
  "hi": {
  "isRtl": false,
  "badge": "Safi Academy शिक्षक भर्ती • 2026 सत्र",
  "heroTitle": "भविष्य को शिक्षित करें।",
  "heroTitleHighlight": "वैश्विक प्रभाव के साथ सम्मानजनक कमाई करें।",
  "heroSubtitle": "प्रौद्योगिकी, ई-कॉमर्स, वित्तीय बाजारों और प्रबंधन में अपने वास्तविक अनुभव को दुनिया भर के महत्वाकांक्षी छात्रों के साथ साझा करें। उत्कृष्ट राजस्व हिस्सेदारी और अत्याधुनिक ऑनलाइन कक्षाओं का लाभ उठाएं।",
  "metricRevenue": "70% तक",
  "metricRevenueLabel": "राजस्व हिस्सेदारी",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "वैश्विक विद्यार्थी",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "लाइव वर्चुअल कक्षाएं",
  "metricReview": "48-72 घंटे",
  "metricReviewLabel": "समीक्षा अवधि",
  "benefitsTitle": "शीर्ष शिक्षक Safi Academy को क्यों चुनते हैं?",
  "benefitsSubtitle": "हम तकनीकी अवसंरचना, अंतरराष्ट्रीय भुगतान, मार्केटिंग और छात्रों के प्रवेश का प्रबंधन करते हैं ताकि आप केवल पढ़ाने पर ध्यान केंद्रित कर सकें।",
  "benefits": [
    {
      "title": "उद्योग में सर्वश्रेष्ठ राजस्व हिस्सेदारी",
      "desc": "कोर्स की बिक्री पर 70% तक शुद्ध राजस्व प्राप्त करें, हर महीने सीधे और सुरक्षित बैंक ट्रांसफर के साथ।",
      "highlight": "उत्कृष्ट कमाई"
    },
    {
      "title": "अत्याधुनिक Agora HD लाइव कक्षाएं",
      "desc": "बिना रुकावट के हाई-डेफिनिशन वीडियो, इंटरैक्टिव डिजिटल बोर्ड और लाइव चैट के साथ दुनिया भर में पढ़ाएं।",
      "highlight": "HD स्ट्रीमिंग"
    },
    {
      "title": "स्वचालित शिक्षण प्रबंधन प्रणाली (LMS)",
      "desc": "असाइनमेंट की जांच, ऑनलाइन क्विज़, उपस्थिति ट्रैकिंग और स्वचालित प्रमाण पत्र जारी करने के आधुनिक उपकरण।",
      "highlight": "समय की बचत"
    },
    {
      "title": "वैश्विक छात्र और मार्केटिंग सहयोग",
      "desc": "हम अमेरिका, यूरोप, मध्य पूर्व और एशिया के हमारे 50,000 से अधिक छात्रों के नेटवर्क में आपके कोर्स का प्रचार करते हैं।",
      "highlight": "तैयार दर्शक"
    }
  ],
  "stagesBadge": "शिक्षक चयन प्रक्रिया",
  "stagesTitle": "फैकल्टी बनने की 4 सरल चरण प्रक्रिया",
  "stages": [
    {
      "num": "01",
      "title": "आवेदन व पाठ्यक्रम का प्रस्ताव",
      "desc": "अपनी व्यक्तिगत जानकारी, पूर्व अनुभव और प्रस्तावित कोर्स का विस्तृत सिलेबस जमा करें।"
    },
    {
      "num": "02",
      "title": "शैक्षणिक व तकनीकी समीक्षा",
      "desc": "हमारी समिति 48 से 72 घंटों में पाठ्यक्रम की गहराई और बाजार की मांग का मूल्यांकन करती है।"
    },
    {
      "num": "03",
      "title": "लाइव डेमो व साक्षात्कार",
      "desc": "वीडियो, ऑडियो और शिक्षण शैली के परीक्षण के लिए Agora HD पर 15 मिनट का संक्षिप्त डेमो सत्र।"
    },
    {
      "num": "04",
      "title": "अनुबंध व कोर्स का शुभारंभ",
      "desc": "पारदर्शी अनुबंध पर हस्ताक्षर करें, शिक्षक डैशबोर्ड प्राप्त करें और अपनी कक्षाएं शुरू करें।"
    }
  ],
  "faqsBadge": "अक्सर पूछे जाने वाले प्रश्न",
  "faqsTitle": "शिक्षकों के लिए मुख्य प्रश्नोत्तर",
  "faqs": [
    {
      "q": "राजस्व हिस्सेदारी और मासिक भुगतान कैसे काम करता है?",
      "a": "शिक्षकों को कोर्स की बिक्री पर 70% तक शुद्ध राजस्व मिलता है। भुगतान हर महीने की 1 तारीख को बैंक ट्रांसफर, Wise, PayPal یا Crypto के माध्यम से किया जाता है।"
    },
    {
      "q": "क्या लाइव पढ़ाना अनिवार्य है या रिकॉर्डेड वीडियो भी दे सकते हैं?",
      "a": "हम दोनों प्रारूपों का समर्थन करते हैं! आप लाइव इंटरैक्टिव कक्षाएं ले सकते हैं या क्विज़ के साथ रिकॉर्ड किए गए वीडियो कोर्स प्रकाशित कर सकते हैं।"
    },
    {
      "q": "कोर्स सामग्री के बौद्धिक संपदा अधिकार (IP) किसके पास होंगे?",
      "a": "आप अपनी सामग्री के 100% बौद्धिक संपदा अधिकारों के स्वामी बने रहेंगे। आप केवल Safi Academy को छात्रों को पढ़ाने का गैर-अनन्य अधिकार देते हैं।"
    },
    {
      "q": "पढ़ाने के लिए किन तकनीकी उपकरणों की आवश्यकता है?",
      "a": "हाई-स्पीड इंटरनेट कनेक्शन (कम से कम 15 Mbps अपलोड), 1080p वेबकैम और स्पष्ट ऑडियो वाला माइक्रोफ़ोन।"
    }
  ],
  "formBadge": "फैकल्टी आवेदन पत्र",
  "formTitle": "Safi Academy शिक्षक आवेदन",
  "formSubtitle": "हमारे अंतरराष्ट्रीय शिक्षक दल में शामिल होने के लिए अपनी जानकारी भरें।",
  "step1Title": "व्यक्तिगत व संपर्क जानकारी",
  "step2Title": "शिक्षण क्षेत्र व कोर्स विवरण",
  "step3Title": "अनुभव व डेमो वीडियो",
  "step4Title": "प्रमाणपत्र व अंतिम समीक्षा",
  "nextBtn": "आगे बढ़ें",
  "prevBtn": "पीछे जाएं",
  "submitBtn": "आवेदन जमा करें",
  "submittingBtn": "आवेदन जमा किया जा रहा है...",
  "successTitle": "आपका आवेदन सफलतापूर्वक प्राप्त हो गया!",
  "successDesc": "हमारी शैक्षणिक समिति 48-72 घंटों में आपके आवेदन की समीक्षा कर डेमो सत्र के लिए आपसे संपर्क करेगी।"
},
  "it": {
  "isRtl": false,
  "badge": "Reclutamento Docenti Safi Academy • Anno Accademico 2026",
  "heroTitle": "Insegna il futuro.",
  "heroTitleHighlight": "Guadagna con un impatto accademico globale.",
  "heroSubtitle": "Condividi la tua esperienza professionale in ingegneria del software, e-commerce, finanza e strategia aziendale con studenti motivati in tutto il mondo. Approfitta di un'elevata quota di ricavi, aule virtuali all'avanguardia e supporto LMS integrato.",
  "metricRevenue": "Fino al 70%",
  "metricRevenueLabel": "Quota sui ricavi",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Studenti internazionali",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Aule virtuali live",
  "metricReview": "48-72 ore",
  "metricReviewLabel": "Tempi di valutazione",
  "benefitsTitle": "Perché i migliori docenti scelgono Safi Academy",
  "benefitsSubtitle": "Gestiamo noi l'infrastruttura tecnica, i pagamenti esteri e il marketing promozionale, lasciandoti il 100% del tempo da dedicare all'insegnamento.",
  "benefits": [
    {
      "title": "La migliore quota di ricavi del settore",
      "desc": "Guadagna fino al 70% dei proventi netti generati dalle vendite dei tuoi corsi, con pagamenti mensili puntuali e garantiti.",
      "highlight": "Alti compensi"
    },
    {
      "title": "Aule live a bassissima latenza Agora HD",
      "desc": "Tieni lezioni interattive in alta definizione con lavagna digitale e chat istantanea grazie alla tecnologia Agora RTC.",
      "highlight": "Streaming HD"
    },
    {
      "title": "Piattaforma didattica automatizzata (LMS)",
      "desc": "Strumenti avanzati per la correzione dei compiti, test online, registro delle presenze e rilascio automatico dei certificati.",
      "highlight": "Risparmio di tempo"
    },
    {
      "title": "Visibilità internazionale e marketing dedicato",
      "desc": "Promuoviamo i tuoi corsi presso la nostra rete di oltre 50.000 studenti attivi in America, Europa e Asia.",
      "highlight": "Studenti pronti"
    }
  ],
  "stagesBadge": "Percorso di ammissione",
  "stagesTitle": "4 semplici passaggi per diventare docente",
  "stages": [
    {
      "num": "01",
      "title": "Invio della domanda e del programma",
      "desc": "Invia il tuo curriculum vitae, i successi professionali e la struttura didattica del corso che intendi offrire."
    },
    {
      "num": "02",
      "title": "Valutazione pedagogica e dei contenuti",
      "desc": "Il nostro comitato scientifico esamina la validità del programma e l'interesse del mercato entro 48-72 ore."
    },
    {
      "num": "03",
      "title": "Lezione di prova in live streaming",
      "desc": "Una breve lezione dimostrativa di 15 minuti su Agora HD per verificare chiarezza espositiva e qualità audio/video."
    },
    {
      "num": "04",
      "title": "Contratto e avvio delle lezioni",
      "desc": "Firma dell'accordo di collaborazione, attivazione del pannello docente e avvio delle iscrizioni per il primo gruppo."
    }
  ],
  "faqsBadge": "Domande frequenti",
  "faqsTitle": "Risposte utili per i docenti",
  "faqs": [
    {
      "q": "Come funziona la ripartizione dei ricavi e quando avvengono i pagamenti?",
      "a": "I docenti ricevono fino al 70% dei ricavi netti. I compensi vengono erogati il 1° di ogni mese tramite bonifico bancario, Wise, PayPal, Stripe o criptovalute."
    },
    {
      "q": "È necessario tenere lezioni dal vivo o posso caricare corsi registrati?",
      "a": "Supportiamo entrambe le modalità! Puoi organizzare lezioni interattive in diretta oppure pubblicare masterclass video con esercitazioni pratiche."
    },
    {
      "q": "Di chi è la proprietà intellettuale (IP) dei materiali didattici?",
      "a": "Mantieni il 100% della proprietà intellettuale di tutti i tuoi contenuti. Concedi a Safi Academy soltanto una licenza non esclusiva di fruizione per gli iscritti."
    },
    {
      "q": "Quali dotazioni tecniche sono necessarie per insegnare?",
      "a": "Una connessione internet stabile (almeno 15 Mbps in upload), una webcam Full HD a 1080p e un microfono chiaro con riduzione del rumore."
    }
  ],
  "formBadge": "Modulo di candidatura per docenti",
  "formTitle": "Candidatura come docente presso Safi Academy",
  "formSubtitle": "Inserisci le tue competenze e la materia di insegnamento per unirti alla nostra facoltà accademica globale.",
  "step1Title": "Dati anagrafici e recapiti",
  "step2Title": "Materia e dettagli del corso",
  "step3Title": "Esperienza didattica e video demo",
  "step4Title": "Titoli di studio e conferma",
  "nextBtn": "Continua",
  "prevBtn": "Indietro",
  "submitBtn": "Invia candidatura",
  "submittingBtn": "Invio della domanda in corso...",
  "successTitle": "Candidatura inviata con successo!",
  "successDesc": "La commissione esaminerà il tuo profilo entro 48-72 ore e ti contatterà per programmare la lezione di prova."
},
  "pt": {
  "isRtl": false,
  "badge": "Seleção de Docentes Safi Academy • Turma 2026",
  "heroTitle": "Ensine o futuro.",
  "heroTitleHighlight": "Fature com impacto acadêmico global.",
  "heroSubtitle": "Compartilhe seu domínio prático em tecnologia, comércio eletrônico, finanças e gestão estratégica com alunos dedicados no mundo todo. Aproveite uma divisão de receitas muito atrativa, salas de aula virtuais de ponta e um sistema LMS completo.",
  "metricRevenue": "Até 70%",
  "metricRevenueLabel": "Divisão de receitas",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Alunos mundiais",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Salas interativas ao vivo",
  "metricReview": "48-72h",
  "metricReviewLabel": "Prazo de análise",
  "benefitsTitle": "Por que os melhores instrutores escolhem a Safi Academy",
  "benefitsSubtitle": "Cuidamos de toda a infraestrutura, dos pagamentos internacionais e da atração de alunos para que você se concentre 100% em lecionar.",
  "benefits": [
    {
      "title": "A divisão de receitas mais vantajosa do mercado",
      "desc": "Receba até 70% da receita líquida das vendas dos seus cursos e turmas ao vivo com pagamentos mensais garantidos.",
      "highlight": "Altos ganhos"
    },
    {
      "title": "Salas de aula ao vivo de baixíssima latência Agora HD",
      "desc": "Conduza aulas interativas com vídeo em alta definição, lousa virtual e chat em tempo real sem travamentos.",
      "highlight": "Transmissão HD"
    },
    {
      "title": "Plataforma de ensino automatizada (LMS)",
      "desc": "Ferramentas completas para correção de exercícios, avaliações, controle de frequência e emissão automática de certificados.",
      "highlight": "Economia de tempo"
    },
    {
      "title": "Público global e divulgação ativa",
      "desc": "Promovemos seus cursos para nossa rede de mais de 50.000 alunos nas Américas, Europa, Oriente Médio e Ásia.",
      "highlight": "Alunos garantidos"
    }
  ],
  "stagesBadge": "Etapas de admissão",
  "stagesTitle": "Faça parte da nossa equipe em 4 passos simples",
  "stages": [
    {
      "num": "01",
      "title": "Envio da proposta e plano de ensino",
      "desc": "Envie suas credenciais, realizações profissionais e a ementa detalhada do curso que planeja ministrar."
    },
    {
      "num": "02",
      "title": "Avaliação pedagógica e técnica",
      "desc": "Nosso comitê acadêmico analisa a profundidade do conteúdo e a demanda de mercado no prazo de 48 a 72 horas."
    },
    {
      "num": "03",
      "title": "Aula experimental demonstrativa",
      "desc": "Apresentação ao vivo de 15 minutos na plataforma Agora HD para avaliar clareza didática e qualidade de som e vídeo."
    },
    {
      "num": "04",
      "title": "Assinatura do contrato e lançamento",
      "desc": "Formalização do acordo de divisão de receitas, configuração do painel do professor e abertura das matrículas."
    }
  ],
  "faqsBadge": "Perguntas frequentes",
  "faqsTitle": "Dúvidas comuns dos instrutores",
  "faqs": [
    {
      "q": "Como funciona o repasse de receitas e quando ocorrem os pagamentos?",
      "a": "Os instrutores recebem até 70% das vendas líquidas dos cursos. Os pagamentos são feitos pontualmente no 1º dia útil de cada mês via transferência bancária, Wise, PayPal, Stripe ou criptoativos."
    },
    {
      "q": "Preciso dar aulas ao vivo ou posso enviar cursos em vídeo gravados?",
      "a": "Apoiamos os dois modelos! Você pode lecionar para turmas ao vivo com interação em tempo real ou disponibilizar cursos em vídeo gravados com testes e exercícios."
    },
    {
      "q": "A quem pertencem os direitos autorais (IP) do material do curso?",
      "a": "Você preserva 100% da propriedade intelectual de todos os seus conteúdos. Você concede à Safi Academy apenas uma licença não exclusiva para exibi-los aos alunos matriculados."
    },
    {
      "q": "Que equipamentos são necessários para lecionar?",
      "a": "Basta possuir internet veloz (pelo menos 15 Mbps de upload), uma câmera Full HD 1080p e um microfone com boa captação de voz."
    }
  ],
  "formBadge": "Formulário de candidatura para docentes",
  "formTitle": "Inscrição de Instrutor na Safi Academy",
  "formSubtitle": "Preencha suas informações e sua área de especialidade para fazer parte do nosso corpo docente global.",
  "step1Title": "Dados pessoais e contato",
  "step2Title": "Especialidade e proposta do curso",
  "step3Title": "Experiência e vídeo demonstrativo",
  "step4Title": "Qualificações e revisão final",
  "nextBtn": "Avançar",
  "prevBtn": "Voltar",
  "submitBtn": "Enviar candidatura docente",
  "submittingBtn": "Enviando proposta...",
  "successTitle": "Candidatura enviada com sucesso!",
  "successDesc": "Nossa comissão acadêmica avaliará seus dados em 48 a 72 horas e entrará em contato para agendar sua aula teste."
},
  "ja": {
  "isRtl": false,
  "badge": "Safi Academy 講師募集 • 2026年度採用",
  "heroTitle": "未来の知を教える。",
  "heroTitleHighlight": "世界規模の教育インパクトと共に高い収益を。",
  "heroSubtitle": "IT技術、Eコマース、金融市場、経営戦略における実践的な専門知識を、世界中の学習者へ直接届けましょう。最高70%の魅力的な収益配分、Agora採用の超低遅延ライブ教室、充実したLMS機能をご活用いただけます。",
  "metricRevenue": "最大70%",
  "metricRevenueLabel": "講師レベニューシェア",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "世界中の受講生",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "HDライブ講義室",
  "metricReview": "48〜72時間",
  "metricReviewLabel": "選考審査期間",
  "benefitsTitle": "トップクラスの専門家が Safi Academy を選ぶ理由",
  "benefitsSubtitle": "システム基盤、国際決済、集客・マーケティングはすべて運営が担当します。先生は100%講義指導のみに集中していただけます。",
  "benefits": [
    {
      "title": "業界トップ水準の収益分配率",
      "desc": "講義販売およびライブコース売上の純収益から最大70%を講師へ配分。毎月指定口座へ確実にお支払いします。",
      "highlight": "高い収益性"
    },
    {
      "title": "Agora採用 超低遅延ライブ配信講義室",
      "desc": "高品質HDマルチ動画ストリーミング、ホワイトボード共有、チャット機能を搭載したオンライン講義を実施できます。",
      "highlight": "HDライブ配信"
    },
    {
      "title": "自動化された学習管理システム (LMS)",
      "desc": "課題の添削、オンライン小テストの自動採点、出席ログ、修了証の自動発行など、事務作業を大幅に削減します。",
      "highlight": "業務効率化"
    },
    {
      "title": "グローバルな集客と受講生ネットワーク",
      "desc": "アメリカ、ヨーロッパ、中東、中央アジアなど世界5万人以上の熱心な受講生コミュニティへ向けて講座をプロモーションします。",
      "highlight": "受講生基盤"
    }
  ],
  "stagesBadge": "講師採用ロードマップ",
  "stagesTitle": "講師着任までのシンプルな4つのステップ",
  "stages": [
    {
      "num": "01",
      "title": "応募フォーム送信と講義シラバスの提出",
      "desc": "職務経歴、専門実績、および開講を希望する講義シラバスの概要をご提出いただきます。"
    },
    {
      "num": "02",
      "title": "教育方針および専門カリキュラム審査",
      "desc": "学術選考委員会が講座の専門性と受講ニーズを48〜72時間以内に審査します。"
    },
    {
      "num": "03",
      "title": "ライブ模擬授業・オンライン面談",
      "desc": "Agora環境で15分間の模擬授業を実施いただき、プレゼンテーションと音声・映像環境を確認します。"
    },
    {
      "num": "04",
      "title": "契約締結およびコース公開・開講",
      "desc": "レベニューシェア契約を締結し、専用の講師ダッシュボードを付与の上、受講生募集を開始します。"
    }
  ],
  "faqsBadge": "よくあるご質問",
  "faqsTitle": "講師応募に関するFAQ",
  "faqs": [
    {
      "q": "収益分配の仕組みと毎月の支払いスケジュールはどうなっていますか？",
      "a": "講師にはコース純売上の最大70%が配分されます。毎月1日に銀行送金、Wise、PayPal、Stripe、または暗号資産にてお支払いいたします。"
    },
    {
      "q": "ライブ授業は必須ですか？録画済み動画コースの提供も可能ですか？",
      "a": "双方の形式を歓迎しております。リアルタイムのグループ講義を行うことも、課題や小テストを組み合わせた録画動画コースを公開することも可能です。"
    },
    {
      "q": "教材や講義コンテンツの著作権（知的財産権）は誰に帰属しますか？",
      "a": "コンテンツの知的財産権は100%講師ご自身に帰属します。Safi Academy には受講生への配信に必要な非独占的ライセンスのみを許諾いただきます。"
    },
    {
      "q": "講義を実施するためにどのような機材環境が必要ですか？",
      "a": "安定した高速インターネット環境（上り15Mbps以上）、1080p対応のフルHDウェブカメラ、およびクリアなマイクをご用意ください。"
    }
  ],
  "formBadge": "講師募集エントリーシート",
  "formTitle": "Safi Academy 講師登録申請フォーム",
  "formSubtitle": "経歴と担当希望科目を入力し、グローバル教育チームへご参加ください。",
  "step1Title": "基本情報・連絡先",
  "step2Title": "指導分野・開講コース概要",
  "step3Title": "指導経験・サンプル動画",
  "step4Title": "保有資格・最終確認",
  "nextBtn": "次へ進む",
  "prevBtn": "前に戻る",
  "submitBtn": "講師登録を申請する",
  "submittingBtn": "申請書類を送信中...",
  "successTitle": "講師応募が完了いたしました！",
  "successDesc": "学術選考委員会にて48〜72時間以内に審査を行い、模擬面接のご案内をメールでお送りいたします。"
},
  "ko": {
  "isRtl": false,
  "badge": "Safi Academy 글로벌 강사진 초빙 • 2026 선발",
  "heroTitle": "미래를 가르치십시오.",
  "heroTitleHighlight": "글로벌 교육 임팩트와 함께 높은 수익을 창출하세요.",
  "heroSubtitle": "소프트웨어, 이커머스, 금융 시장, 비즈니스 전략 분야에서 쌓은 실전 전문 지식을 전 세계 열정적인 학생들에게 전수하세요. 최대 70%의 높은 수익 배분, 최첨단 실시간 가상 강의실, 통합 LMS 지원을 제공합니다.",
  "metricRevenue": "최대 70%",
  "metricRevenueLabel": "강사 수익 배분율",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "글로벌 수강생",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "실시간 화상 강의실",
  "metricReview": "48-72시간",
  "metricReviewLabel": "심사 소요 시간",
  "benefitsTitle": "최고의 전문가들이 Safi Academy를 선택하는 이유",
  "benefitsSubtitle": "강의 시스템 인프라, 글로벌 결제 시스템, 학생 모집 및 마케팅은 저희가 모두 책임집니다. 강사님은 100% 강의에만 집중하세요.",
  "benefits": [
    {
      "title": "업계 최고 수준의 수익 배분",
      "desc": "강좌 판매 및 실시간 부트캠프 등록 순수익의 최대 70%를 보장된 정기 월 지급으로 정산받으세요.",
      "highlight": "높은 수익"
    },
    {
      "title": "Agora 기반 초저지연 HD 실시간 강의실",
      "desc": "다자간 HD 화상 스트리밍, 대화형 전자칠판, 실시간 채팅 기능을 통해 끊김 없는 양방향 원격 강의를 진행할 수 있습니다.",
      "highlight": "HD 스트리밍"
    },
    {
      "title": "자동화된 학습 관리 플랫폼 (LMS)",
      "desc": "과제 채점, 온라인 퀴즈 평가, 출석부 관리, 수료증 자동 발급까지 번거로운 행정 업무를 자동화합니다.",
      "highlight": "시간 절약"
    },
    {
      "title": "글로벌 학생 네트워크 및 마케팅 지원",
      "desc": "미국, 유럽, 중동, 아시아 전역의 5만 명 이상의 수강생 커뮤니티에 강사님의 강좌를 적극 홍보합니다.",
      "highlight": "수강생 보장"
    }
  ],
  "stagesBadge": "강사 선발 로드맵",
  "stagesTitle": "강사진 합류를 위한 4단계 절차",
  "stages": [
    {
      "num": "01",
      "title": "지원서 및 강의 계획서 제출",
      "desc": "전문 이력, 강의 경력, 제안하고자 하는 강좌의 상세 커리큘럼을 제출합니다."
    },
    {
      "num": "02",
      "title": "커리큘럼 및 강의력 심사",
      "desc": "학술 심사위원회가 제출된 강의의 깊이와 시장성을 48~72시간 이내에 검토합니다."
    },
    {
      "num": "03",
      "title": "실시간 시범 강의 및 인터뷰",
      "desc": "Agora HD 환경에서 15분간 시범 강의를 진행하여 강의 전달력과 화상/음향 환경을 점검합니다."
    },
    {
      "num": "04",
      "title": "계약 체결 및 수강생 모집 개시",
      "desc": "수익 배분 계약 체결 후 전용 강사 대시보드를 발급받고 강좌를 론칭합니다."
    }
  ],
  "faqsBadge": "자주 묻는 질문",
  "faqsTitle": "강사 지원 FAQ",
  "faqs": [
    {
      "q": "수익 배분 정산과 월간 지급 방식은 어떻게 되나요?",
      "a": "강사님께 순수익의 최대 70%를 배분합니다. 정산금은 매월 1일 해외 송금, Wise, PayPal, Stripe 또는 암호화폐를 통해 정기 지급됩니다."
    },
    {
      "q": "반드시 실시간 라이브로만 강의해야 하나요? 녹화 강의도 가능한가요?",
      "a": "두 가지 방식 모두 지원합니다! 정기 실시간 코호트 워크숍을 진행하거나, 퀴즈와 실습 과제가 포함된 VOD 강좌를 론칭할 수 있습니다."
    },
    {
      "q": "강의 자료의 지식재산권(IP)은 누구에게 귀속되나요?",
      "a": "강의 콘텐츠의 모든 지식재산권은 100% 강사님께 있습니다. Safi Academy에는 수강생을 대상으로 한 비독점적 배포 권한만 부여됩니다."
    },
    {
      "q": "강의 진행을 위해 필요한 하드웨어 사양은 무엇인가요?",
      "a": "안정적인 고속 인터넷 환경(최소 15Mbps 업로드), 1080p 웹캠, 노이즈가 없는 깨끗한 마이크만 있으면 충분합니다."
    }
  ],
  "formBadge": "강사 지원 신청서",
  "formTitle": "Safi Academy 강사 지원서",
  "formSubtitle": "이력과 강의 희망 분야를 입력하시고 글로벌 교수진 네트워크에 동참하세요.",
  "step1Title": "기본 정보 및 연락처",
  "step2Title": "전문 분야 및 강의 소개",
  "step3Title": "강의 경력 및 샘플 영상",
  "step4Title": "자격 증명 및 최종 확인",
  "nextBtn": "다음 단계",
  "prevBtn": "이전",
  "submitBtn": "강사 지원서 제출하기",
  "submittingBtn": "지원서 제출 중...",
  "successTitle": "강사 지원이 성공적으로 완료되었습니다!",
  "successDesc": "학술 심사위원회에서 48~72시간 내에 서류를 검토한 후 시범 강의 일정을 안내해 드리겠습니다."
},
  "nl": {
  "isRtl": false,
  "badge": "Werving van Docenten Safi Academy • Cohort 2026",
  "heroTitle": "Onderwijs de toekomst.",
  "heroTitleHighlight": "Verdien met wereldwijde maatschappelijke impact.",
  "heroSubtitle": "Deel uw praktische vakkennis in software engineering, e-commerce, financiële markten en bedrijfsstrategie met leergierige studenten wereldwijd. Geniet van een hoge omzetverdeling, ultramoderne virtuele leslokalen en complete LMS-ondersteuning.",
  "metricRevenue": "Tot 70%",
  "metricRevenueLabel": "Omzetaandeel docent",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Wereldwijde studenten",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Interactieve livelessen",
  "metricReview": "48-72 uur",
  "metricReviewLabel": "Beoordelingstermijn",
  "benefitsTitle": "Waarom topdocenten kiezen voor Safi Academy",
  "benefitsSubtitle": "Wij regelen de technische infrastructuur, internationale betalingsverwerking en studentenwerving, zodat u zich volledig kunt richten op lesgeven.",
  "benefits": [
    {
      "title": "De beste inkomstenverdeling in de sector",
      "desc": "Ontvang tot 70% van de netto-omzet uit cursusverkopen en live workshops met gegarandeerde maandelijkse uitbetalingen.",
      "highlight": "Hoge verdiensten"
    },
    {
      "title": "Ultra-lage latentie live lokalen via Agora",
      "desc": "Geef interactieve livelessen met HD-videoverbinding, digitale whiteboards en realtime chatmogelijkheden.",
      "highlight": "HD-streaming"
    },
    {
      "title": "Geautomatiseerd leermanagementsysteem (LMS)",
      "desc": "Praktische hulpmiddelen voor het nakijken van opdrachten, toetsen, aanwezigheidsregistratie en automatische certificering.",
      "highlight": "Tijdsbesparing"
    },
    {
      "title": "Wereldwijd publiek en actieve marketing",
      "desc": "Wij brengen uw cursussen onder de aandacht van onze meer dan 50.000 studenten in Amerika, Europa, het Midden-Oosten en Azië.",
      "highlight": "Groot netwerk"
    }
  ],
  "stagesBadge": "Selectieprocedure",
  "stagesTitle": "In 4 eenvoudige stappen docent worden",
  "stages": [
    {
      "num": "01",
      "title": "Aanmelding en cursusvoorstel indienen",
      "desc": "Dien uw biografie, behaalde kwalificaties en het voorgestelde lesprogramma in."
    },
    {
      "num": "02",
      "title": "Pedagogische en technische evaluatie",
      "desc": "Onze academische commissie beoordeelt de cursusinhoud en marktvraag binnen 48 tot 72 uur."
    },
    {
      "num": "03",
      "title": "Proefles in de virtuele klas",
      "desc": "Een online proefles van 15 minuten op Agora HD om uw presentatiestijl en audio- en videokwaliteit te toetsen."
    },
    {
      "num": "04",
      "title": "Overeenkomst en cursuslancering",
      "desc": "Onderteken de samenwerkingsovereenkomst, ontvang toegang tot uw docentendashboard en start met uw eerste groep."
    }
  ],
  "faqsBadge": "Veelgestelde vragen",
  "faqsTitle": "Informatie voor toekomstige docenten",
  "faqs": [
    {
      "q": "Hoe werkt het omzetaandeel en wanneer vinden de uitbetalingen plaats?",
      "a": "Docenten ontvangen tot 70% van de netto-opbrengst. Uitbetalingen worden op de 1e van elke kalendermaand verwerkt via bankoverschrijving, Wise, PayPal, Stripe of crypto."
    },
    {
      "q": "Moet ik live lesgeven of mag ik ook vooraf opgenomen videocursussen aanbieden?",
      "a": "Beide formats worden ondersteund! U kunt interactieve live sessies leiden of complete videocursussen met opdrachten en toetsen publiceren."
    },
    {
      "q": "Wie bezit het intellectueel eigendom (IP) van mijn lesmateriaal?",
      "a": "U behoudt 100% van het intellectueel eigendom op al uw materialen. U verleent Safi Academy enkel een niet-exclusieve licentie om deze aan ingeschreven studenten aan te bieden."
    },
    {
      "q": "Welke technische apparatuur heb ik nodig om les te geven?",
      "a": "Een betrouwbare breedbandverbinding (minimaal 15 Mbps uploadsnelheid), een 1080p webcam en een heldere microfoon zijn voldoende."
    }
  ],
  "formBadge": "Aanmeldingsformulier docenten",
  "formTitle": "Docent worden bij Safi Academy",
  "formSubtitle": "Vul uw gegevens en vakgebied in om lid te worden van ons wereldwijde docententeam.",
  "step1Title": "Persoonlijke gegevens & contact",
  "step2Title": "Vakgebied & cursusomschrijving",
  "step3Title": "Onderwijservaring & demovideo",
  "step4Title": "Referenties & afronding",
  "nextBtn": "Volgende",
  "prevBtn": "Vorige",
  "submitBtn": "Aanmelding versturen",
  "submittingBtn": "Aanmelding wordt verwerkt...",
  "successTitle": "Aanmelding succesvol verzonden!",
  "successDesc": "Onze academische commissie beoordeelt uw dossier binnen 48-72 uur en neemt contact op voor het plannen van de proefles."
},
  "uz": {
  "isRtl": false,
  "badge": "Safi Academy O'qituvchilarni qabul qilish • 2026-mavsum",
  "heroTitle": "Kelajakni o'rgating.",
  "heroTitleHighlight": "Global ta'sir bilan yuqori daromad oling.",
  "heroSubtitle": "Axborot texnologiyalari, elektron tijorat, moliya va biznes boshqaruvi bo'yicha amaliy bilimlaringizni butun dunyo bo'ylab talabalar bilan baham ko'ring. Yuqori daromad ulushi, eng zamonaviy onlayn sinflar va to'liq LMS tizimidan foydalaning.",
  "metricRevenue": "70% gacha",
  "metricRevenueLabel": "O'qituvchi daromad ulushi",
  "metricStudents": "50,000+",
  "metricStudentsLabel": "Xalqaro talabalar",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Jonli interaktiv darslar",
  "metricReview": "48-72 soat",
  "metricReviewLabel": "Ariza ko'rib chiqish muddati",
  "benefitsTitle": "Nega yetakchi mutaxassislar Safi Academy ni tanlashadi?",
  "benefitsSubtitle": "Biz texnik infratuzilma, xalqaro to'lovlarni qabul qilish, marketing va talabalarni jalb qilishni to'liq o'z zimmamizga olamiz, siz esa 100% dars berishga e'tibor qaratasiz.",
  "benefits": [
    {
      "title": "Sohadagi eng yuqori daromad ulushi",
      "desc": "Kurslar savdosi va guruh darslaridan tushgan sof daromadning 70% gachasini kafolatlangan oylik to'lovlar bilan oling.",
      "highlight": "Katta daromad"
    },
    {
      "title": "Agora HD asosidagi kechikishsiz jonli darslar",
      "desc": "Yuqori sifatli HD video, interaktiv doska va jonli muloqot orqali kechikishlarsiz real vaqtda dars bering.",
      "highlight": "HD translyatsiya"
    },
    {
      "title": "Avtomatlashtirilgan o'quv boshqaruv tizimi (LMS)",
      "desc": "Vazifalarni tekshirish, testlar o'tkazish, davomatni nazorat qilish va sertifikatlarni avtomatik tarzda berish.",
      "highlight": "Vaqtni tejash"
    },
    {
      "title": "Global auditoriya va faol marketing",
      "desc": "Biz sizning kurslaringizni AQSh, Yevropa, Yaqin Sharq va Osiyodagi 50 mingdan ortiq faol talabalarimiz orasida targ'ib qilamiz.",
      "highlight": "Tayyor auditoriya"
    }
  ],
  "stagesBadge": "Qabul bosqichlari",
  "stagesTitle": "O'qituvchilar safiga qo'shilishning 4 ta oson bosqichi",
  "stages": [
    {
      "num": "01",
      "title": "Ariza va kurs rejasini topshirish",
      "desc": "O'zingiz haqingizda ma'lumot, ilmiy-amaliy yutuqlaringiz va taklif etilayotgan kurs rejasini yuboring."
    },
    {
      "num": "02",
      "title": "Pedagogik va texnik baholash",
      "desc": "Akademik kengashimiz kursning dolzarbligi va mazmunini 48-72 soat ichida atroflicha ko'rib chiqadi."
    },
    {
      "num": "03",
      "title": "Onlayn sinov darsi va suhbat",
      "desc": "Nutq mahorati, ovoz va video sifatini sinash uchun Agora HD tizimida 15 daqiqalik sinov darsi o'tkaziladi."
    },
    {
      "num": "04",
      "title": "Shartnoma tuzish va kursni boshlash",
      "desc": "Hamkorlik shartnomasini imzolang, o'qituvchi profiliga kiring va birinchi guruh darslarini boshlang."
    }
  ],
  "faqsBadge": "Ko'p beriladigan savollar",
  "faqsTitle": "O'qituvchilar uchun muhim ma'lumotlar",
  "faqs": [
    {
      "q": "Daromad qanday hisoblanadi va to'lovlar qachon amalga oshiriladi?",
      "a": "O'qituvchilar sof tushumning 70% gachasini oladilar. To'lovlar har oyning 1-sanasida bank o'tkazmasi, Wise, PayPal, Stripe yoki kriptovalyutada to'lanadi."
    },
    {
      "q": "Darslar faqat jonli bo'lishi shartmi yoki oldindan yozib olingan videolarni taqdim etish mumkinmi?",
      "a": "Biz ikkala usulni ham qo'llab-quvvatlaymiz! Jonli interaktiv guruhlar ochishingiz yoki test va topshiriqlari bor videokurslarni joylashingiz mumkin."
    },
    {
      "q": "O'quv materiallariga bo'lgan mualliflik huquqi kimga tegishli?",
      "a": "Barcha materiallarga bo'lgan mualliflik huquqi 100% sizda saqlanib qoladi. Safi Academy ga faqat darslarni platformada talabalarga ko'rsatish huquqi beriladi."
    },
    {
      "q": "Dars o'tish uchun qanday texnik qurilmalar talab qilinadi?",
      "a": "Barqaror yuqori tezlikdagi internet (kamida 15 Mbit/s yuklash tezligi), 1080p Full HD veb-kamera va shovqinsiz toza mikrofon kerak bo'ladi."
    }
  ],
  "formBadge": "O'qituvchi anketasi",
  "formTitle": "Safi Academy da dars berish uchun ariza",
  "formSubtitle": "Xalqaro o'qituvchilar jamoamizga qo'shilish uchun ma'lumotlaringizni va dars yo'nalishingizni kiriting.",
  "step1Title": "Shaxsiy ma'lumotlar va aloqa",
  "step2Title": "Mutaxassislik yo'nalishi va kurs mavzusi",
  "step3Title": "Tajriba va namuna video",
  "step4Title": "Malaka va yakuniy tasdiq",
  "nextBtn": "Keyingi qadam",
  "prevBtn": "Orqaga",
  "submitBtn": "Arizani yuborish",
  "submittingBtn": "Ariza yuborilmoqda...",
  "successTitle": "Arizangiz muvaffaqiyatli qabul qilindi!",
  "successDesc": "Akademik kengash hujjatlaringizni 48-72 soat ichida ko'rib chiqadi va sinov darsi vaqtini belgilash uchun siz bilan bog'lanadi."
},
  "id": {
  "isRtl": false,
  "badge": "Perekrutan Dosen & Pengajar Safi Academy • Angkatan 2026",
  "heroTitle": "Ajarkan masa depan.",
  "heroTitleHighlight": "Raih penghasilan dengan dampak akademik global.",
  "heroSubtitle": "Bagikan keahlian praktis Anda di bidang teknologi, e-commerce, pasar keuangan, dan strategi bisnis kepada pelajar ambisius di seluruh dunia. Dapatkan bagi hasil yang tinggi, ruang kelas virtual berteknologi tinggi, dan dukungan LMS lengkap.",
  "metricRevenue": "Hingga 70%",
  "metricRevenueLabel": "Bagi Hasil Pengajar",
  "metricStudents": "50.000+",
  "metricStudentsLabel": "Siswa Global",
  "metricClassrooms": "Agora HD",
  "metricClassroomsLabel": "Kelas Interaktif Langsung",
  "metricReview": "48-72 Jam",
  "metricReviewLabel": "Waktu Peninjauan",
  "benefitsTitle": "Mengapa Pengajar Unggulan Memilih Safi Academy",
  "benefitsSubtitle": "Kami mengelola infrastruktur teknis, pemrosesan pembayaran internasional, dan pemasaran agar Anda dapat fokus 100% pada proses mengajar.",
  "benefits": [
    {
      "title": "Bagi Hasil Tertinggi di Industri Pendidikan",
      "desc": "Dapatkan hingga 70% dari pendapatan bersih penjualan kursus dan kelas intensif Anda dengan pencairan bulanan yang terjamin.",
      "highlight": "Pendapatan Tinggi"
    },
    {
      "title": "Kelas Interaktif Berlatensi Sangat Rendah Agora HD",
      "desc": "Bawakan kuliah tatap muka langsung dengan video HD multi-arah, papan tulis interaktif, dan obrolan instan bertenaga Agora RTC.",
      "highlight": "Streaming HD"
    },
    {
      "title": "Sistem Manajemen Pembelajaran Otomatis (LMS)",
      "desc": "Pemeriksaan tugas otomatis, kuis online, pelacakan absensi, dan penerbitan sertifikat digital yang efisien.",
      "highlight": "Hemat Waktu"
    },
    {
      "title": "Jangkauan Pasar Global dan Pemasaran Terarah",
      "desc": "Kami mempromosikan kursus Anda kepada lebih dari 50.000 siswa aktif di Amerika, Eropa, Timur Tengah, dan Asia.",
      "highlight": "Siswa Tersedia"
    }
  ],
  "stagesBadge": "Peta Seleksi Pengajar",
  "stagesTitle": "Bergabung Menjadi Pengajar dalam 4 Langkah Mudah",
  "stages": [
    {
      "num": "01",
      "title": "Pendaftaran dan Pengajuan Silabus",
      "desc": "Kirimkan biodata profesional, rekam jejak mengajar, dan draf silabus materi kursus yang Anda ajukan."
    },
    {
      "num": "02",
      "title": "Penilaian Pedagogi dan Keahlian Teknis",
      "desc": "Komite akademik kami akan mengevaluasi relevansi materi dan kebutuhan pasar dalam waktu 48-72 jam."
    },
    {
      "num": "03",
      "title": "Sesi Mengajar Percobaan (Audisi Langsung)",
      "desc": "Uji coba mengajar selama 15 menit melalui Agora HD untuk menilai cara penyampaian dan kualitas audio visual."
    },
    {
      "num": "04",
      "title": "Penandatanganan Kontrak dan Pembukaan Kelas",
      "desc": "Tandatangani perjanjian bagi hasil resmi, dapatkan akses ke dasbor pengajar, dan mulai kelas perdana Anda."
    }
  ],
  "faqsBadge": "Pertanyaan yang Sering Diajukan",
  "faqsTitle": "Informasi Penting bagi Calon Pengajar",
  "faqs": [
    {
      "q": "Bagaimana sistem bagi hasil dan jadwal pencairan dana bulanan?",
      "a": "Pengajar mendapatkan hingga 70% dari pendapatan bersih kursus. Pembayaran dicairkan setiap tanggal 1 setiap bulan melalui transfer bank, Wise, PayPal, Stripe, atau kripto."
    },
    {
      "q": "Apakah saya harus mengajar secara langsung atau boleh menyertakan video rekaman?",
      "a": "Kami mendukung kedua format! Anda dapat membuka kelas interaktif berbasis jadwal tatap muka langsung, atau merilis kursus video mandiri berformat rekaman."
    },
    {
      "q": "Siapa yang memiliki hak kekayaan intelektual (HAKI) atas materi kursus saya?",
      "a": "Anda memegang 100% hak kekayaan intelektual atas seluruh materi Anda. Anda hanya memberikan lisensi non-eksklusif kepada Safi Academy untuk menayangkannya."
    },
    {
      "q": "Perangkat apa saja yang diperlukan untuk mulai mengajar?",
      "a": "Anda hanya memerlukan koneksi internet stabil (kecepatan unggah minimal 15 Mbps), kamera web Full HD 1080p, dan mikrofon yang jernih."
    }
  ],
  "formBadge": "Formulir Pendaftaran Pengajar",
  "formTitle": "Pendaftaran Instruktur Safi Academy",
  "formSubtitle": "Lengkapi profil dan bidang keahlian Anda untuk bergabung dengan jaringan pengajar internasional kami.",
  "step1Title": "Profil Pribadi dan Kontak",
  "step2Title": "Bidang Pengajaran dan Judul Kursus",
  "step3Title": "Pengalaman dan Video Contoh",
  "step4Title": "Kualifikasi dan Konfirmasi",
  "nextBtn": "Lanjutkan",
  "prevBtn": "Kembali",
  "submitBtn": "Kirim Formulir Pendaftaran",
  "submittingBtn": "Mengirimkan pendaftaran...",
  "successTitle": "Pendaftaran Berhasil Dikirim!",
  "successDesc": "Komite akademik kami akan meninjau berkas Anda dalam 48-72 jam dan menghubungi Anda untuk menjadwalkan sesi audisi mengajar."
},
};

export function getInstructorApplicationTranslation(locale: string): InstructorApplicationTranslation {
  const normalized = (locale || "en").toLowerCase();
  return instructorApplicationTranslations[normalized] || instructorApplicationTranslations.en;
}
