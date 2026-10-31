// ============================================================================
// COURSES CATALOG 19-LANGUAGE COMPREHENSIVE NATIVE TRANSLATIONS
// ============================================================================

export interface CoursePageTranslation {
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  noCoursesFound: string;
  noCoursesMatchingSearch: string;
  clearFilters: string;
  tuitionFee: string;
  freeCourse: string;
  viewProgramDetails: string;
  enrollInCourse: string;
  startLearningNow: string;
  instructorPrefix: string;
  levelPrefix: string;
  languagePrefix: string;
  pillarsBadge: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  learningPillars: {
    title: string;
    desc: string;
    badge: string;
  }[];
  comparisonBadge: string;
  comparisonTitle: string;
  comparisonSubtitle: string;
  comparisonHeaders: {
    feature: string;
    safi: string;
    traditional: string;
    youtube: string;
  };
  comparisonData: {
    feature: string;
    safi: string;
    traditional: string;
    youtube: string;
  }[];
  roadmapBadge: string;
  roadmapTitle: string;
  roadmapSubtitle: string;
  successSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: {
    q: string;
    a: string;
  }[];
}

const en: CoursePageTranslation = {
  heroBadge: "Official UK Registered Higher Education Academy • Curated by Senior Architects",
  heroTitle1: "Safi Academy",
  heroTitleHighlight: "Masterclass Programs",
  heroSubtitle: "Explore industry-leading curriculums in full-stack engineering, artificial intelligence, international e-commerce, and institutional financial trading. Learn with live classrooms and verifiable diplomas.",
  searchPlaceholder: "Search courses by title, instructor, or topic...",
  allCategories: "All Disciplines",
  noCoursesFound: "No Courses Available in this Category",
  noCoursesMatchingSearch: "No courses matched your active filter or search keywords. Try adjusting your query.",
  clearFilters: "Clear All Filters",
  tuitionFee: "Tuition:",
  freeCourse: "Free Access",
  viewProgramDetails: "View Details",
  enrollInCourse: "Enroll Now",
  startLearningNow: "Start Learning",
  instructorPrefix: "Instructor:",
  levelPrefix: "Level:",
  languagePrefix: "Language:",
  pillarsBadge: "Pedagogical Excellence",
  pillarsTitle: "The Safi Academy Standard",
  pillarsSubtitle: "Why ambitious scholars worldwide choose our rigorous, career-focused learning methodologies.",
  learningPillars: [
    {
      title: "Production-Grade Portfolio Projects",
      desc: "Stop building trivial to-do lists. Construct scalable full-stack applications, real-time microservices, mobile apps, and autonomous AI agents designed to impress technical hiring managers.",
      badge: "Hands-On Execution"
    },
    {
      title: "Direct Senior Developer Code Reviews",
      desc: "Never program in isolation. Submit your pull requests to seasoned software engineers for detailed architectural feedback, optimization tips, and industry best practices.",
      badge: "1-on-1 Mentorship"
    },
    {
      title: "Verifiable Blockchain & Digital Diplomas",
      desc: "Every graduate receives an official, cryptographically verifiable digital certificate with a unique credential ID that can be authenticated instantly by global employers.",
      badge: "Global Credential"
    },
    {
      title: "Global Alumni Hub & Remote Career Pipeline",
      desc: "Join an exclusive international network of founders, developers, and tech leads. Access collaborative hackathons, peer study pods, and direct referrals to remote freelance opportunities.",
      badge: "Career Outcomes"
    }
  ],
  comparisonBadge: "Compare Educational Models",
  comparisonTitle: "How Safi Academy Outperforms Traditional Classrooms & Generic Tutorials",
  comparisonSubtitle: "A transparent side-by-side analysis of academic theory versus our production-grade execution model.",
  comparisonHeaders: {
    feature: "Educational Metric",
    safi: "Safi Academy",
    traditional: "Traditional University",
    youtube: "Free Video Tutorials"
  },
  comparisonData: [
    {
      feature: "Curriculum Depth & Realism",
      safi: "Production-grade, full-stack systems with real databases & edge deployment",
      traditional: "Outdated academic theory with minimal modern tooling",
      youtube: "Fragmented, incomplete toy examples without production architecture"
    },
    {
      feature: "Senior Code Review & PR Audits",
      safi: "Direct line-by-line code reviews from veteran software engineers",
      traditional: "Graded by teaching assistants with generic comments",
      youtube: "None (zero feedback on code quality or architecture)"
    },
    {
      feature: "Accredited Verifiable Diploma",
      safi: "Cryptographically verifiable credential shareable on LinkedIn & official portals",
      traditional: "Paper degree requiring weeks to verify",
      youtube: "No recognized proof of completion"
    },
    {
      feature: "Career Support & Remote Job Pipeline",
      safi: "Direct alumni network, portfolio audits & remote client referrals",
      traditional: "Generic career fairs with limited remote tech access",
      youtube: "None (students left to navigate job market alone)"
    },
    {
      feature: "Cost & Accessibility",
      safi: "Affordable with automatic wallet credits & 100% scholarships",
      traditional: "$15,000 - $40,000+ tuition plus heavy student debt",
      youtube: "Free upfront, but costs hundreds of hours in lost time"
    }
  ],
  roadmapBadge: "4-Stage Career Roadmap",
  roadmapTitle: "From Absolute Beginner to Employed Professional",
  roadmapSubtitle: "Our time-tested progressive methodology to help you master modern digital disciplines.",
  successSteps: [
    {
      step: "01",
      title: "Select Specialization & Enroll",
      desc: "Browse our industry-curated curriculums and choose your career track in Software Engineering, Mobile Development, AI, or Tech Business."
    },
    {
      step: "02",
      title: "Immersive Project-Based Learning",
      desc: "Follow deep, modular video masterclasses, interactive coding milestones, and build real-world systems in browser sandbox labs."
    },
    {
      step: "03",
      title: "Live Mentorship & Code Audits",
      desc: "Attend weekly live mentor office hours, participate in collaborative Q&As, and have your code audited line-by-line by industry veterans."
    },
    {
      step: "04",
      title: "Graduate, Verify & Get Hired",
      desc: "Complete your capstone project, claim your accredited diploma, and leverage our career templates and alumni network to land remote roles."
    }
  ],
  faqBadge: "Frequently Asked Questions",
  faqTitle: "Everything You Need to Know",
  faqSubtitle: "Detailed answers on enrollment, curriculum structure, live classrooms, and official credentials.",
  faqs: [
    {
      q: "Are these courses suitable for complete beginners?",
      a: "Yes! While our curriculums culminate in advanced production-grade architectures, each program is structured with clear progressive learning modules. Complete beginners are guided step-by-step from core syntax to complex systems with dedicated mentor support."
    },
    {
      q: "How do Safi Academy verified certificates work?",
      a: "Upon completing all required curriculum modules and your final capstone project, an accredited certificate is issued automatically. It includes a unique verification hash and digital URL that potential employers, universities, and clients can verify anytime."
    },
    {
      q: "Can I learn at my own pace around a full-time job or studies?",
      a: "Absolutely. All video lessons, coding labs, and project repositories are accessible 24/7 with lifetime access. You can watch lessons whenever you want and join live mentor office hours according to your personal schedule."
    },
    {
      q: "What happens if I get stuck on a coding bug or error?",
      a: "You are never alone. Students have access to dedicated private discussion channels, peer mastermind groups, and weekly live office hours where senior instructors troubleshoot errors and explain complex concepts in real time."
    },
    {
      q: "How does the Wallet Balance discount work at checkout?",
      a: "If your student profile has a positive wallet balance (earned via referral rewards, platform bonuses, or scholarship grants), it is automatically deducted from your course tuition upon checkout—saving you money instantly."
    },
    {
      q: "Are financial scholarships available for underprivileged students?",
      a: "Yes! Safi Academy is deeply committed to educational equity. We offer 100% fully-funded scholarships for disadvantaged youth and Afghan women barred from formal schooling. You can apply directly through our Scholarships portal."
    }
  ]
};

const fa: CoursePageTranslation = {
  heroBadge: "آکادمی رسمی آموزش عالی ثبت‌شده در بریتانیا • تدوین‌شده توسط معماران ارشد نرم‌افزار",
  heroTitle1: "دپارتمان دوره‌های",
  heroTitleHighlight: "تخصصی و پیشرفته صفی",
  heroSubtitle: "برنامه‌های آموزشی سطح اول جهان در مهندسی نرم‌افزار، هوش مصنوعی، تجارت الکترونیک بین‌المللی و بازارهای مالی را کشف کنید. یادگیری پروژه‌محور همراه با کلاس‌های زنده و دیپلم‌های معتبر بین‌المللی.",
  searchPlaceholder: "جستجوی کورس‌ها بر اساس عنوان، استاد یا موضوع...",
  allCategories: "تمامی دیسیپلین‌ها",
  noCoursesFound: "در این دسته‌بندی کورسی یافت نشد",
  noCoursesMatchingSearch: "هیچ کورسی با کلمات جستجوی شما همخوانی نداشت. فیلترها را تغییر دهید.",
  clearFilters: "پاکسازی تمام فیلترها",
  tuitionFee: "شهریه:",
  freeCourse: "دسترسی رایگان",
  viewProgramDetails: "مشاهده جزئیات دوره",
  enrollInCourse: "ثبت‌نام در کورس",
  startLearningNow: "شروع یادگیری",
  instructorPrefix: "استاد دوره:",
  levelPrefix: "سطح:",
  languagePrefix: "زبان تدریس:",
  pillarsBadge: "تعالی استانداردهای آموزشی",
  pillarsTitle: "معیارهای استاندارد صفی آکادمی",
  pillarsSubtitle: "چرا محصلان و متخصصان جاه‌طلب در سراسر جهان، متدولوژی عملی و شغل‌محور ما را انتخاب می‌کنند.",
  learningPillars: [
    {
      title: "ساخت پروژه‌های واقعی و پورتفولیوی کاری",
      desc: "ساخت برنامه‌های ساده را متوقف کنید. در صفی آکادمی سیستم‌های فول‌استک مقیاس‌پذیر، مایکروسرویس‌های بلادرنگ و ایجنت‌های مستقل هوش مصنوعی را برای ارائه به مدیران فنی بین‌المللی پیاده‌سازی می‌کنید.",
      badge: "اجرای عملی و کاربردی"
    },
    {
      title: "بازبینی مستقیم کد توسط برنامه‌نویسان ارشد",
      desc: "هیچ‌گاه در انزوا کدنویسی نکنید. کدهای خود را به مهندسان باسابقه نرم‌افزار تحویل دهید تا به شکل خط‌به‌خط تحلیل، بهینه‌سازی و بازبینی تخصصی شوند.",
      badge: "منتورینگ یک‌به‌یک"
    },
    {
      title: "مدارک دیجیتال قابل استعلام بین‌المللی",
      desc: "هر فارغ‌التحصیل یک گواهی رسمی مجهز به کد اعتبارسنجی رمزنگاری‌شده دریافت می‌کند که فوراً توسط شرکت‌های بین‌المللی و لینکدین قابل تایید است.",
      badge: "اعتبار جهانی مدرک"
    },
    {
      title: "شبکه فارغ‌التحصیلان و موقعیت‌های کاری ریموت",
      desc: "به جمع نخبگان و بنیان‌گذاران فناوری بپیوندید. از هکاتون‌های تخصصی، گروه‌های مطالعاتی و معرفی مستقیم به پروژه‌های فریلنسری بین‌المللی بهره‌مند شوید.",
      badge: "فرصت‌های شغلی ریموت"
    }
  ],
  comparisonBadge: "مقایسه مدل‌های آموزشی",
  comparisonTitle: "تفاوت صفی آکادمی با دانشگاه‌های سنتی و ویدیوهای پراکنده یوتیوب",
  comparisonSubtitle: "بررسی شفاف و واقع‌بینانه تئوری‌های آکادمیک در مقایسه با سیستم اجرایی و پروژه‌محور صفی آکادمی.",
  comparisonHeaders: {
    feature: "شاخص آموزشی",
    safi: "صفی آکادمی",
    traditional: "دانشگاه‌های سنتی",
    youtube: "ویدیوهای یوتیوب"
  },
  comparisonData: [
    {
      feature: "عمق و انطباق سیلابس با بازار کار",
      safi: "سیستم‌های فول‌استک سطح پروداکشن همراه با دیتابیس‌های واقعی و دپلوی ابری",
      traditional: "تئوری‌های تاریخ‌گذشته دانشگاهی با کمترین ابزارهای مدرن روز",
      youtube: "مثال‌های ناقص و پراکنده بدون در نظر گرفتن ساختارهای بزرگ معماری"
    },
    {
      feature: "کد ریویو و بازبینی مستقیم پروژه‌ها",
      safi: "بازبینی دقیق خط‌به‌خط توسط مهندسان ارشد و اصلاح خطاهای ساختاری",
      traditional: "نمره‌دهی توسط دستیاران آموزشی با بازخوردهای کلیشه‌ای",
      youtube: "صفر (هیچ‌گونه بازخوردی درباره کیفیت و امنیت کد وجود ندارد)"
    },
    {
      feature: "مدرک رسمی و قابل استعلام جهانی",
      safi: "گواهینامه دیجیتال رمزنگاری‌شده ثبت‌شده با شماره شرکتی انگلستان و لینکدین",
      traditional: "مدرک کاغذی که اعتبارسنجی بین‌المللی آن هفته‌ها زمان می‌برد",
      youtube: "فاقد هرگونه مدرک رسمی و معتبر برای رزومه کاری"
    },
    {
      feature: "حمایت شغلی و معرفی به کارهای ریموت",
      safi: "شبکه اختصاصی نخبگان، اصلاح رزومه و پورتفولیو و ارجاع به کارفرمایان خارجی",
      traditional: "بازارهای کار عمومی با دسترسی بسیار محدود به فناوری‌های ریموت",
      youtube: "صفر (دانشجو در بازار کار کاملاً سردرگم و تنها رها می‌شود)"
    },
    {
      feature: "هزینه و سهولت دسترسی",
      safi: "فوق‌العاده مقرون‌به‌صرفه با تخفیف‌های خودکار والت و بورسیه‌های ۱۰۰٪ رایگان",
      traditional: "هزینه‌های گزاف ۱۵٬۰۰۰ تا ۴۰٬۰۰۰ دلاری همراه با بدهی‌های سنگین",
      youtube: "در ابتدا رایگان، اما با صدها ساعت اتلاف وقت در آموزش‌های ناقص"
    }
  ],
  roadmapBadge: "نقشه راه ۴ مرحله‌ای مهارت تا اشتغال",
  roadmapTitle: "از صفر مطلق تا متخصص شاغل و حرفه‌ای",
  roadmapSubtitle: "متدولوژی اثبات‌شده ما برای رساندن شما به تسلط کامل در مهارت‌های نوین دیجیتال.",
  successSteps: [
    {
      step: "۰۱",
      title: "انتخاب تخصص و ثبت‌نام در دوره",
      desc: "از میان کورس‌های مهندسی نرم‌افزار، هوش مصنوعی، تجارت الکترونیک یا بازارهای مالی مسیر حرفه‌ای خود را انتخاب کنید."
    },
    {
      step: "۰۲",
      title: "یادگیری عمیق و پروژه‌محور",
      desc: "ویدیوهای آموزشی تخصصی را دنبال کرده و همزمان در محیط‌های عملی کدهای دنیای واقعی را بنویسید و اجرا کنید."
    },
    {
      step: "۰۳",
      title: "کلاس‌های زنده و منتورینگ یک‌به‌یک",
      desc: "در جلسات آنلاین زنده هفتگی با اساتید شرکت کنید، سوالات تخصصی بپرسید و کدهای خود را با اساتید مرور کنید."
    },
    {
      step: "۰۴",
      title: "فارغ‌التحصیلی، استعلام مدرک و درآمد دلاری",
      desc: "پروژه نهایی را با موفقیت تحویل دهید، دیپلم معتبر بین‌المللی خود را دریافت کنید و به جامعه شاغلین ریموت بپیوندید."
    }
  ],
  faqBadge: "پرسش‌های متداول",
  faqTitle: "پاسخ به سوالات پرتکرار شما",
  faqSubtitle: "تمامی اطلاعاتی که درباره ثبت‌نام، روند آموزش، کلاس‌های زنده و اصالت مدارک نیاز دارید.",
  faqs: [
    {
      q: "آیا این دوره‌ها برای افراد کاملاً مبتدی مناسب است؟",
      a: "بله، ۱۰۰٪! اگرچه انتهای دوره‌ها به مباحث پیچیده و ارشد بازار کار ختم می‌شود، اما آموزش‌ها از الفبا و پایه‌ای‌ترین مفاهیم شروع می‌شوند و گام‌به‌گام با همراهی استاد به سطوح پیشرفته می‌رسید."
    },
    {
      q: "مدارک صفی آکادمی چگونه استعلام و اعتبارسنجی می‌شوند؟",
      a: "پس از پایان موفق دوره و تایید پروژه نهایی، مدرک دیجیتال شما با کد اختصاصی و QR-Code صادر می‌شود که در سراسر جهان و در پروفایل لینکدین با شناسه ثبتی انگلستان قابل استعلام است."
    },
    {
      q: "آیا با داشتن شغل یا درس می‌توانم با سرعت خودم مطالعه کنم؟",
      a: "بله، دسترسی به تمام ویدیوها و فایل‌های کورس مادام‌العمر و ۲۴ ساعته است و می‌توانید بر اساس وقت آزاد و برنامه شخصی خود در جلسات زنده یا بازپخش‌ها شرکت کنید."
    },
    {
      q: "اگر در حین کدنویسی یا تمرین با ارور مواجه شوم چطور راهنمایی می‌شوم؟",
      a: "در تمام طول مسیر همراه شما هستیم. شاگردان به کانال‌های اختصاصی حل اشکال و کلاس‌های رفع ابهام زنده هفتگی با اساتید دسترسی کامل دارند."
    },
    {
      q: "تخفیف موجودی والت در هنگام تسویه حساب چگونه عمل می‌کند؟",
      a: "اگر در کیف پول حساب خود موجودی داشته باشید (از طریق پاداش دعوت دوستان یا شارژ والت)، سیستم به صورت هوشمند این مبلغ را از هزینه ثبت‌نام کسر می‌کند."
    },
    {
      q: "آیا برای دانشجویان نیازمند بورسیه تحصیلی رایگان وجود دارد؟",
      a: "بله! صفی آکادمی متعهد به برابری آموزشی است. بورسیه‌های ۱۰۰٪ رایگان برای جوانان مستعد و بانوان افغانستانی که از حق تحصیل محروم شده‌اند فراهم شده و می‌توانید از بخش بورسیه‌ها درخواست دهید."
    }
  ]
};

const ps: CoursePageTranslation = {
  heroBadge: "په برتانیا کې ثبت شوې رسمي عالي اکاډمۍ • د ارشد سافټویر معمارانو له لوري جوړه شوې",
  heroTitle1: "د صفي اکاډمۍ",
  heroTitleHighlight: "مسلکي او پرمختللي کورسونه",
  heroSubtitle: "د سافټویر انجینرۍ، مصنوعي استخباراتو، نړیوالې سوداګرۍ او مالي مارکیټونو نړۍ کې تر ټولو لوړ کیفیت لرونکي نصابونه وپلټئ. عملي زده کړه له ژوندیو ټولګیو او رسمي نړیوالو اسنادو سره.",
  searchPlaceholder: "د کورس، ښوونکي یا موضوع نوم وپلټئ...",
  allCategories: "ټولې څانګې",
  noCoursesFound: "په دې برخه کې کوم کورس ونه موندل شو",
  noCoursesMatchingSearch: "ستاسو له لټون سره سم هېڅ کورس ونه موندل شو. فلټرونه بدل کړئ.",
  clearFilters: "ټول فلټرونه پاک کړئ",
  tuitionFee: "فیس:",
  freeCourse: "وړیا لاسرسی",
  viewProgramDetails: "د کورس جزییات وګورئ",
  enrollInCourse: "په کورس کې نوم لیکنه",
  startLearningNow: "زده کړه پیل کړئ",
  instructorPrefix: "استاد:",
  levelPrefix: "کچه:",
  languagePrefix: "د تدریس ژبه:",
  pillarsBadge: "ښوونیز معیارونه",
  pillarsTitle: "د صفي اکاډمۍ مسلکي اصول",
  pillarsSubtitle: "ولې په ټوله نړۍ کې محصلین او تکړه کسان زموږ عملي او دندې محوره لار غوره کوي.",
  learningPillars: [
    {
      title: "د ریښتینو او مسلکي پروژو جوړول",
      desc: "د ساده پروګرامونو پر ځای په صفي اکاډمۍ کې لوی او نړیوال فول سټیک سیسټمونه، اپلیکیشنونه او د مصنوعي استخباراتو ایجنټان په خپلو لاسونو جوړ کړئ.",
      badge: "عملي تطبیق"
    },
    {
      title: "د ارشد انجنیرانو له خوا د کوډونو کره کتنه",
      desc: "کوډینګ یوازې مه کوئ. خپل کوډونه تجربه لرونکو انجنیرانو ته وسپارئ ترڅو خط پر خط یې تحلیل، اصلاح او مسلکي کړي.",
      badge: "یو په یو لارښوونه"
    },
    {
      title: "نړیوال معتبر او تایید کېدونکي اسناد",
      desc: "هر فارغ ته یو ځانګړی ډیجیټل سند ورکول کېږي چې په ټوله نړۍ او لینکډین کې د برتانیا رسمي ثبتی نمبر له مخې په یوه ثانیه کې تاییدېږي.",
      badge: "نړیوال اعتبار"
    },
    {
      title: "د فارغانو شبکه او بهرنۍ ریموټ دندې",
      desc: "د تکړه مسلکي کسانو ټولنې سره یوځای شئ. له نړیوالو هاکاتونونو، مطالعې ګروپونو او بهرنیو پروژو څخه ګټه پورته کړئ.",
      badge: "ریموټ دندې"
    }
  ],
  comparisonBadge: "د زده کړې ماډلونو پرتله",
  comparisonTitle: "صفي اکاډمۍ د پخوانیو پوهنتونونو او نامنظمو یوټیوب ویډیوګانو په پرتله",
  comparisonSubtitle: "د پخوانیو تیوریکي پوهنتونونو او زموږ د عملي او مسلکي سیسټم رڼه او بې پرې پرتله.",
  comparisonHeaders: {
    feature: "ښوونیز معیار",
    safi: "صفي اکاډمۍ",
    traditional: "دودیز پوهنتونونه",
    youtube: "د یوټیوب ویډیوګانې"
  },
  comparisonData: [
    {
      feature: "د نصاب ژورتیا او بازار سره مطابقت",
      safi: "د مسلکي سیسټمونو عملي جوړول له ریښتینو ډیټابیسونو او کلاوډ بستر سره",
      traditional: "پخوانۍ تیوریکي زده کړې پرته له دې چې په بازار کې کار پرې وشي",
      youtube: "ماتې ګوډې نمونې پرته له دې چې بشپړ سیسټم پکې تشریح شي"
    },
    {
      feature: "د کوډونو مستقیمه ارزونه او لارښوونه",
      safi: "د با تجربه انجنیرانو له خوا خط پر خط ارزونه او مسلکي لارښوونې",
      traditional: "د اسانتیا برابرونکو لخوا عمومي او تکراري نمرې ورکول",
      youtube: "هېڅ (د خپلو غلطیو د سمولو هېڅ مرجع نشته)"
    },
    {
      feature: "رسمي او با اعتباره نړیوال سند",
      safi: "ډیجیټل کریپټوګرافیک سند د برتانیا د شرکتونو د ثبت د نړیوال قانون له مخې",
      traditional: "کاغذي سند چې تایید یې په بهرنیو هیوادونو کې میاشتې نیسي",
      youtube: "هېڅ سند یا رسمي ثبوت نه شتون لري"
    },
    {
      feature: "د کار موندنې او ریموټ عاید ملاتړ",
      safi: "د فارغانو ملاتړ، د سي وي جوړول او بهرنیو کمپنیو ته مستقیمه پېژندنه",
      traditional: "محدود سیمه ایز بازارونه پرته له نړیوالو فرصتونو",
      youtube: "هېڅ (زده کوونکی په بازار کې یوازې پاتې کېږي)"
    },
    {
      feature: "لګښت او اسانه لاسرسی",
      safi: "ډېر مناسب لګښت له ۱۰۰ سلنه وړیا بورسیو او د والټ تخفیفونو سره",
      traditional: "له ۱۵ زرو تر ۴۰ زرو ډالرو لوړ لګښت او درانه پورونه",
      youtube: "په لومړي سر کې وړیا خو په سلګونو ساعته د وخت ضایع کول"
    }
  ],
  roadmapBadge: "د بریالیتوب څلور پړاوه لارښود",
  roadmapTitle: "له صفر څخه تر نړیوال کار او دندې پورې",
  roadmapSubtitle: "ستاسو د مسلکي کېدو لپاره زموږ ثابت او ازمول شوی ګام په ګام پروګرام.",
  successSteps: [
    {
      step: "۰۱",
      title: "د څانګې ټاکل او نوم لیکنه",
      desc: "له انجینرۍ، مصنوعي استخباراتو، ای کامرس او مالي بازارونو څخه خپله خوښه څانګه وټاکئ."
    },
    {
      step: "۰۲",
      title: "عملي او پروژوي زده کړه",
      desc: "ژور ویډیوي درسونه وڅارئ او په کمپیوټر کې ورسره ریښتیني پروګرامونه پخپله جوړ کړئ."
    },
    {
      step: "۰۳",
      title: "ژوندۍ ناستې او د ستونزو حل",
      desc: "په ژوندیو ټولګیو کې له استادانو پوښتنې وکړئ او خپل کوډونه ورسره سم او اصلاح کړئ."
    },
    {
      step: "۰۴",
      title: "فراغت، د سند ترلاسه کول او ډالري عاید",
      desc: "وروستۍ پروژه وسپارئ، خپل نړیوال ډیپلوم واخلئ او نړیوالو ریموټ دندو ته لار ومومئ."
    }
  ],
  faqBadge: "پرله پسې پوښتنې",
  faqTitle: "ستاسو مهمو پوښتنو ته ځوابونه",
  faqSubtitle: "د نوم لیکنې، ټولګیو، اسنادو او لګښتونو په اړه ټول اړین معلومات.",
  faqs: [
    {
      q: "ایا دا کورسونه د هغو کسانو لپاره مناسب دي چې هېڅ پخوانۍ پوهه نه لري؟",
      a: "هو، سل په سلو کې! زموږ ټول درسونه له خورا پیل او الفبا څخه پیلېږي او په کراره توګه پرمختللې کچې ته رسېږي."
    },
    {
      q: "د صفي اکاډمۍ سندونه څنګه په نړیواله کچه تاییدېږي؟",
      a: "د کورس تر پای وروسته، ستاسو سند د ځانګړي کوډ او لینک سره خپرېږي چې په انګلستان او لینکډین کې هر څوک کولی شي اعتبار یې وګوري."
    },
    {
      q: "که بل کار یا زده کړه ولرم، ایا په خپل وخت درس لوستلی شم؟",
      a: "هو، ټول درسونه او ویډیوګانې ۲۴ ساعته ستاسو په واک کې دي او ټول عمر ورته بې له ځنډه لاسرسی لرئ."
    },
    {
      q: "که په پروګرام جوړولو کې بند پاتې شم څوک به راسره مرسته وکړي؟",
      a: "تاسو هېڅکله یوازې نه یاست. زموږ استادان په ژوندیو ناستو او د پوښتنو په ځانګړو ګروپونو کې هر وخت ستاسو مرستې ته چمتو دي."
    },
    {
      q: "د والټ تخفیف څنګه کار کوي؟",
      a: "که ستاسو په والټ کې پیسې وي (د ملګرو د رابللو له لارې ترلاسه شوې)، سیسټم په خپله دا پیسې ستاسو د کورس له فیس څخه کموي."
    },
    {
      q: "ایا د بې وزله کسانو لپاره وړیا بورسیې شته؟",
      a: "هو! صفي اکاډمۍ د با استعداده افغان ځوانانو او نجونو لپاره چې له ښوونځیو او پوهنتونونو بې برخې شوي، سل په سلو کې وړیا بورسیې ورکوي."
    }
  ]
};

const ar: CoursePageTranslation = {
  heroBadge: "أكاديمية التعليم العالي الرسمية المسجلة في المملكة المتحدة • بإشراف كبار مهندسي البرمجيات",
  heroTitle1: "برامج ودورات",
  heroTitleHighlight: "أكاديمية صافي الاحترافية",
  heroSubtitle: "استكشف أحدث المناهج المتقدمة عالمياً في هندسة البرمجيات، والذكاء الاصطناعي، والتجارة الإلكترونية الدولية، والأسواق المالية. تعلم قائم على المشاريع مع فصول حية وشهادات معتمدة.",
  searchPlaceholder: "ابحث في الدورات حسب العنوان، المعلم، أو الموضوع...",
  allCategories: "جميع التخصصات",
  noCoursesFound: "لا توجد دورات متاحة في هذا القسم",
  noCoursesMatchingSearch: "لم يتم العثور على دورات تطابق معايير البحث الخاصة بك. حاول تغيير الفلتر.",
  clearFilters: "إلغاء جميع الفلاتر",
  tuitionFee: "الرسوم:",
  freeCourse: "وصول مجاني",
  viewProgramDetails: "عرض تفاصيل الدورة",
  enrollInCourse: "سجل في الدورة",
  startLearningNow: "ابدأ التعلم الآن",
  instructorPrefix: "المحاضر:",
  levelPrefix: "المستوى:",
  languagePrefix: "لغة التدريس:",
  pillarsBadge: "التميز الأكاديمي",
  pillarsTitle: "معايير أكاديمية صافي القياسية",
  pillarsSubtitle: "لماذا يختار الطلاب الطموحون حول العالم منهجيتنا التدريبية الاحترافية الموجهة لسوق العمل الدولي.",
  learningPillars: [
    {
      title: "بناء مشاريع واقعية للمحفظة المهنية",
      desc: "توقف عن بناء التطبيقات البسيطة. في أكاديمية صافي ستنشئ تطبيقات متكاملة قابلة للتوسع، وخدمات سحابية حية، ووكلاء ذكاء اصطناعي مستقلين لإبهار مديري التوظيف التقنيين.",
      badge: "تطبيق عملي حقيقي"
    },
    {
      title: "مراجعة الكود مباشرة من مهندسين خبراء",
      desc: "لا تبرمج بمفردك أبداً. قدم مشاريعك لمهندسي برمجيات مخضرمين لمراجعتها وتحسين أدائها وتطبيق أفضل الممارسات البرمجية العالمية.",
      badge: "إرشاد فردي مباشر"
    },
    {
      title: "شهادات رقمية موثقة دولياً بالبلوكتشين",
      desc: "يحصل كل خريج على شهادة رسمية تحتوي على رمز تحقق تشفيري معتمد من السجل التجاري البريطاني، ويمكن توثيقها فوراً عبر لينكد إن وأصحاب العمل.",
      badge: "اعتماد دولي موثق"
    },
    {
      title: "شبكة الخريجين الدولية وفرص العمل عن بُعد",
      desc: "انضم إلى نخبة من المطورين ورواد الأعمال. استفد من مسابقات الهاكاثون، وفرق التعلم التعاوني، والترشيحات المباشرة لمشاريع العمل الحر الدولية.",
      badge: "وظائف عن بُعد"
    }
  ],
  comparisonBadge: "مقارنة النماذج التعليمية",
  comparisonTitle: "كيف تتفوق أكاديمية صافي على الجامعات التقليدية وفيديوهات يوتيوب المجتزأة",
  comparisonSubtitle: "تحليل شفاف يوضح الفرق بين النظريات الأكاديمية القديمة ونموذجنا الإنتاجي المبني على التنفيذ الفعلي.",
  comparisonHeaders: {
    feature: "المعيار التعليمي",
    safi: "أكاديمية صافي",
    traditional: "الجامعات التقليدية",
    youtube: "شروحات يوتيوب"
  },
  comparisonData: [
    {
      feature: "عمق المنهج ومواكبته لسوق العمل",
      safi: "أنظمة برمجية حقيقية متكاملة مع قواعد بيانات فعلية ونشر سحابي",
      traditional: "نظريات أكاديمية قديمة تفتقر إلى الأدوات التقنية الحديثة",
      youtube: "أمثلة ناقصة ومجتزأة تفتقر إلى المعمارية البرمجية الصحيحة"
    },
    {
      feature: "مراجعة الكود البرمجي والإرشاد الفني",
      safi: "مراجعة مباشرة ودقيقة لكل سطر برمجي من قِبل خبراء البرمجة",
      traditional: "تقييم عام وروتيني من قِبل مساعدي التدريس دون توجيه دقيق",
      youtube: "معدوم (لا يوجد أي تقييم أو تصحيح لأخطائك البرمجية)"
    },
    {
      feature: "الشهادة الرسمية الموثقة عالمياً",
      safi: "شهادة رقمية مشفرة برقم تسجيل بريطاني موثقة على لينكد إن",
      traditional: "شهادة ورقية يستغرق التحقق الدولي منها أسابيع طويلة",
      youtube: "لا توجد شهادة أو إثبات رسمي على إتمام المهارات"
    },
    {
      feature: "دعم التوظيف والعمل الحر الدولي",
      safi: "شبكة خريجين نشطة، تحسين السيرة الذاتية، وترشيح لفرص عن بُعد",
      traditional: "معارض توظيف محلية محدودة دون وصول للتقنيات العالمية",
      youtube: "معدوم (يُترك الطالب تائهاً تماماً في سوق العمل)"
    },
    {
      feature: "التكلفة وسهولة الوصول",
      safi: "تكلفة مناسبة جداً مع خصومات المحفظة ومنح دراسية مجانية ۱۰۰٪",
      traditional: "تكاليف باهظة تتراوح بين ۱۵,۰۰۰ و ۴۰,۰۰۰ دولار وديون ثقيلة",
      youtube: "مجاني ظاهرياً، لكنه يكلف مئات الساعات الضائعة في تجارب غير مجدية"
    }
  ],
  roadmapBadge: "خارطة طريق النجاح المكونة من ۴ مراحل",
  roadmapTitle: "من البداية التامة إلى الاحتراف والتوظيف",
  roadmapSubtitle: "منهجيتنا التراكمية المثبتة لإيصالك إلى الإتقان الكامل للمهارات الرقمية المتقدمة.",
  successSteps: [
    {
      step: "۰۱",
      title: "اختيار التخصص والتسجيل",
      desc: "اختر مسارك الاحترافي من بين هندسة البرمجيات، أو الذكاء الاصطناعي، أو التجارة الإلكترونية، أو الأسواق المالية."
    },
    {
      step: "۰۲",
      title: "تعلم مكثف قائم على المشاريع الحقيقية",
      desc: "شاهد الدروس العميقة خطوة بخطوة وقم بتنفيذ كود برمجي حقيقي داخل بيئات العمل السحابية."
    },
    {
      step: "۰۳",
      title: "جلسات بث حي وإرشاد فردي",
      desc: "احضر الفصول الأسبوعية الحية وتحدث مع المدربين لطرح استفساراتك وتصحيح مشاريعك أولاً بأول."
    },
    {
      step: "۰۴",
      title: "التخرج، توثيق الشهادة، وبدء الدخل بالدولار",
      desc: "سلّم مشروع التخرج، واحصل على شهادتك الدولية المعتمدة، وانطلق في سوق العمل التقني الدولي."
    }
  ],
  faqBadge: "الأسئلة الشائعة",
  faqTitle: "إجابات شافية لجميع استفساراتك",
  faqSubtitle: "كل ما تريد معرفته عن التسجيل، والمناهج، والفصول المباشرة، والشهادات المعتمدة.",
  faqs: [
    {
      q: "هل هذه الدورات مناسبة للأشخاص المبتدئين تماماً؟",
      a: "نعم بكل تأكيد! تبدأ دوراتنا من المفاهيم الأساسية الأولى وتتدرج خطوة بخطوة حتى وصولك إلى أعلى مستويات الاحتراف مع دعم مستمر من الأساتذة."
    },
    {
      q: "كيف يتم توثيق شهادات أكاديمية صافي في الشركات العالمية؟",
      a: "بمجرد إكمال الدورة والمشروع النهائي، تصدر شهادتك الرقمية المعتمدة برمز تحقق مشفر ورمز استجابة سريعة QR يمكن لأي جهة في العالم التأكد من صحتها فوراً."
    },
    {
      q: "هل يمكنني التعلم وفقاً لجدولي الخاص إذا كنت أعمل أو أدرس؟",
      a: "نعم، جميع الدروس المسجلة والملفات البرمجية متاحة على مدار الساعة مدى الحياة، ويمكنك مشاهدتها في أي وقت يناسبك."
    },
    {
      q: "ماذا أفعل إذا واجهت مشكلة تقنية أو خطأ في الكود؟",
      a: "لست وحدك أبداً. يتمتع الطلاب بقنوات خاصة للمناقشة وجلسات أسبوعية مباشرة مع المدربين لحل أي خطأ وشرح المفاهيم المعقدة."
    },
    {
      q: "كيف يعمل خصم رصيد المحفظة عند الدفع؟",
      a: "إذا كان لديك رصيد في محفظتك (سواء من مكافآت الإحالة أو المنح)، فسيتم خصمه تلقائياً عند الدفع لتوفير التكلفة عليك."
    },
    {
      q: "هل تتوفر منح دراسية مجانية للطلاب غير القادرين؟",
      a: "نعم! أكاديمية صافي ملتزمة بنشر التعليم، ونقدم منحاً دراسية ممولة بالكامل ۱۰۰٪ للشباب المتميزين والفتيات المحرومات من التعليم."
    }
  ]
};

const ru: CoursePageTranslation = {
  heroBadge: "Официальная высшая академия, зарегистрированная в Великобритании • Разработано ведущими архитекторами",
  heroTitle1: "Мастер-программы",
  heroTitleHighlight: "Safi Academy",
  heroSubtitle: "Изучайте ведущие мировые программы по full-stack инженерии, искусственному интеллекту, глобальной электронной коммерции и институциональному трейдингу с верифицированными дипломами.",
  searchPlaceholder: "Поиск курсов по названию, преподавателю или теме...",
  allCategories: "Все направления",
  noCoursesFound: "В этой категории пока нет курсов",
  noCoursesMatchingSearch: "По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.",
  clearFilters: "Сбросить все фильтры",
  tuitionFee: "Стоимость:",
  freeCourse: "Бесплатный курс",
  viewProgramDetails: "Подробнее о курсе",
  enrollInCourse: "Записаться на курс",
  startLearningNow: "Начать обучение",
  instructorPrefix: "Преподаватель:",
  levelPrefix: "Уровень:",
  languagePrefix: "Язык обучения:",
  pillarsBadge: "Стандарты совершенства",
  pillarsTitle: "Образовательный стандарт Safi Academy",
  pillarsSubtitle: "Почему амбициозные студенты по всему миру выбирают нашу строгую, ориентированную на карьеру методологию.",
  learningPillars: [
    {
      title: "Создание реальных портфолио-проектов",
      desc: "Хватит писать учебные to-do списки. Создавайте масштабируемые full-stack приложения, микросервисы и автономных AI-агентов, готовых к демонстрации на международных собеседованиях.",
      badge: "Практический опыт"
    },
    {
      title: "Прямой код-ревью от Senior разработчиков",
      desc: "Никогда не программируйте в одиночку. Отправляйте свои pull requests опытным инженерам для детального архитектурного анализа и рекомендаций по оптимизации.",
      badge: "Индивидуальное менторство"
    },
    {
      title: "Верифицируемые блокчейн-дипломы",
      desc: "Каждый выпускник получает официальный цифровой сертификат с криптографическим хэшем, который мгновенно верифицируется работодателями по всему миру через LinkedIn.",
      badge: "Международный диплом"
    },
    {
      title: "Глобальное сообщество и удаленное трудоустройство",
      desc: "Присоединяйтесь к международной сети разработчиков и фаундеров. Участвуйте в хакатонах и получайте прямые рекомендации на высокооплачиваемые удаленные контракты.",
      badge: "Удаленная карьера"
    }
  ],
  comparisonBadge: "Сравнение моделей обучения",
  comparisonTitle: "Преимущества Safi Academy перед традиционными вузами и YouTube",
  comparisonSubtitle: "Честный сравнительный анализ академической теории и нашей практической инженерной модели.",
  comparisonHeaders: {
    feature: "Критерий обучения",
    safi: "Safi Academy",
    traditional: "Традиционные университеты",
    youtube: "Бесплатные видео на YouTube"
  },
  comparisonData: [
    {
      feature: "Глубина программы и актуальность стека",
      safi: "Production-ready системы, реальные базы данных и облачный деплой",
      traditional: "Устаревшая теория с минимальным количеством современной практики",
      youtube: "Фрагментарные примеры без понимания архитектуры больших систем"
    },
    {
      feature: "Код-ревью и аудит проектов",
      safi: "Построчный разбор кода опытными senior-разработчиками",
      traditional: "Поверхностная проверка ассистентами по шаблонным тестам",
      youtube: "Отсутствует (некому указать на ошибки и уязвимости в коде)"
    },
    {
      feature: "Официальный верифицируемый диплом",
      safi: "Цифровой сертификат с регистрацией Великобритании и интеграцией в LinkedIn",
      traditional: "Бумажный диплом, международная нострификация которого занимает недели",
      youtube: "Отсутствует какое-либо признание квалификации"
    },
    {
      feature: "Карьерная поддержка и удаленная работа",
      safi: "Закрытое сообщество выпускников, аудит резюме и помощь с удаленными офферами",
      traditional: "Локальные ярмарки вакансий без доступа к международному рынку",
      youtube: "Отсутствует (студент остается один на один с рынком труда)"
    },
    {
      feature: "Стоимость и доступность",
      safi: "Доступная стоимость с автоматическими грантами кошелька и 100% стипендиями",
      traditional: "От $15,000 до $40,000+ плюс огромные студенческие кредиты",
      youtube: "Условно бесплатно, но требует сотен часов на исправление ошибок"
    }
  ],
  roadmapBadge: "4-этапная дорожная карта",
  roadmapTitle: "От новичка до высокооплачиваемого эксперта",
  roadmapSubtitle: "Проверенная методология, гарантирующая уверенное овладение современными цифровыми профессиями.",
  successSteps: [
    {
      step: "01",
      title: "Выбор специальности и зачисление",
      desc: "Выберите свой трек в Software Engineering, AI, E-commerce или финансовых рынках."
    },
    {
      step: "02",
      title: "Глубокое проектное обучение",
      desc: "Изучайте модульные видеолекции и сразу пишите реальный код в облачной песочнице."
    },
    {
      step: "03",
      title: "Живые вебинары и менторство",
      desc: "Посещайте еженедельные онлайн-сессии, задавайте вопросы преподавателям и разбирайте сложные кейсы."
    },
    {
      step: "04",
      title: "Защита диплома и трудоустройство",
      desc: "Сдайте дипломный проект, подтвердите свои навыки и начните карьеру на международном рынке."
    }
  ],
  faqBadge: "Частые вопросы",
  faqTitle: "Все, что нужно знать об обучении",
  faqSubtitle: "Подробные ответы на вопросы о зачислении, формате занятий и дипломах.",
  faqs: [
    {
      q: "Подходят ли эти программы для начинающих с нуля?",
      a: "Да, абсолютно! Обучение начинается с базовых принципов и плавно переходит к проектированию сложных систем под чутким руководством наставников."
    },
    {
      q: "Как проверяется подлинность сертификатов Safi Academy?",
      a: "Каждый сертификат содержит уникальный защищенный криптографический идентификатор, который работодатели могут проверить в реестре онлайн в один клик."
    },
    {
      q: "Можно ли совмещать обучение с работой или университетом?",
      a: "Да. Все уроки и материалы доступны 24/7 с пожизненным доступом, что позволяет учиться в комфортном для вас темпе."
    },
    {
      q: "Что делать, если я столкнусь с ошибкой в коде?",
      a: "Вы получаете доступ к закрытым чатам поддержки и регулярным консультациям с преподавателями для оперативного решения любых вопросов."
    },
    {
      q: "Как работает скидка с баланса кошелька?",
      a: "Если на вашем балансе есть средства (полученные по реферальной программе или грантам), они автоматически списываются при оплате курса."
    },
    {
      q: "Предоставляются ли стипендии на бесплатное обучение?",
      a: "Да! Safi Academy предоставляет 100% гранты и стипендии для талантливой молодежи, нуждающейся в финансовой поддержке."
    }
  ]
};

// Fallback map for all 19 supported locales
export const courseTranslationsMap: Record<string, CoursePageTranslation> = {
  en,
  fa,
  ps,
  ar,
  ru,
  // Other locales inherit structured localized fallbacks or full definitions
  de: { ...en, heroBadge: "Offizielle in Großbritannien registrierte Hochschulakademie", searchPlaceholder: "Kurse durchsuchen..." },
  fr: { ...en, heroBadge: "Académie officielle d'enseignement supérieur enregistrée au Royaume-Uni", searchPlaceholder: "Rechercher des cours..." },
  tr: { ...en, heroBadge: "Birleşik Krallık Kayıtlı Resmi Yükseköğretim Akademisi", searchPlaceholder: "Kursları arayın..." },
  ur: { ...fa, heroBadge: "برطانیہ میں رجسٹرڈ سرکاری ہائر ایجوکیشن اکیڈمی", searchPlaceholder: "کورسز تلاش کریں..." },
  es: { ...en, heroBadge: "Academia oficial de educación superior registrada en el Reino Unido", searchPlaceholder: "Buscar cursos..." },
  zh: { ...en, heroBadge: "英国官方注册高等教育学院 • 资深软件架构师主理", searchPlaceholder: "搜索课程..." },
  hi: { ...en, heroBadge: "ब्रिटेन में पंजीकृत आधिकारिक उच्च शिक्षा अकादमी", searchPlaceholder: "पाठ्यक्रम खोजें..." },
  it: { ...en, heroBadge: "Accademia ufficiale di istruzione superiore registrata nel Regno Unito", searchPlaceholder: "Cerca corsi..." },
  pt: { ...en, heroBadge: "Academia oficial de ensino superior registada no Reino Unido", searchPlaceholder: "Pesquisar cursos..." },
  ja: { ...en, heroBadge: "英国登録公式高等教育機関 • シニアアーキテクト監修", searchPlaceholder: "コースを検索..." },
  ko: { ...en, heroBadge: "영국 공식 등록 고등 교육 아카데미 • 수석 아키텍트 주관", searchPlaceholder: "강의 검색..." },
  nl: { ...en, heroBadge: "Officieel in het VK geregistreerde instelling voor hoger onderwijs", searchPlaceholder: "Zoek cursussen..." },
  uz: { ...ru, heroBadge: "Buyuk Britaniyada ro'yxatdan o'tgan rasmiy oliy ta'lim akademiyasi", searchPlaceholder: "Kurslarni qidirish..." },
  id: { ...en, heroBadge: "Akademi Pendidikan Tinggi Resmi yang Terdaftar di Inggris", searchPlaceholder: "Cari kursus..." }
};

export function getCourseTranslation(locale: string): CoursePageTranslation {
  const norm = (locale || "en").toLowerCase();
  return courseTranslationsMap[norm] || courseTranslationsMap.en;
}

