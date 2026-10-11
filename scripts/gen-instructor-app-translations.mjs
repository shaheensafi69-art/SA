import fs from 'fs';
import path from 'path';

const locales = ['en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur', 'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id'];

const data = {
  en: {
    isRtl: false,
    badge: "Safi Academy Faculty Recruitment • Cohort 2026",
    heroTitle: "Teach the Future.",
    heroTitleHighlight: "Earn With Global Impact.",
    heroSubtitle: "Share your real-world mastery in Tech, E-Commerce, Financial Markets, and Corporate Strategy with ambitious learners worldwide. Enjoy high revenue share, state-of-the-art live classrooms, and full LMS support.",
    metricRevenue: "Up to 70%",
    metricRevenueLabel: "Revenue Share",
    metricStudents: "50,000+",
    metricStudentsLabel: "Global Students",
    metricClassrooms: "Agora HD",
    metricClassroomsLabel: "Live Classrooms",
    metricReview: "48-72h",
    metricReviewLabel: "Review Window",
    benefitsTitle: "Why Elite Instructors Choose Safi Academy",
    benefitsSubtitle: "We take care of infrastructure, global payment processing, student acquisition, and marketing so you can focus 100% on teaching.",
    benefits: [
      {
        title: "Industry-Leading Revenue Split",
        desc: "Earn up to 70% net revenue on course sales and cohort enrollments with guaranteed monthly payouts.",
        highlight: "High Earning"
      },
      {
        title: "Ultra-Low Latency Live Classrooms",
        desc: "Deliver live interactive lectures with HD multi-stream video, interactive whiteboards, and instant chat powered by Agora RTC.",
        highlight: "HD Streaming"
      },
      {
        title: "Automated Student LMS",
        desc: "Comprehensive tools for assignment grading, quiz attempts, attendance logs, and automatic certificate issuance.",
        highlight: "Time Saving"
      },
      {
        title: "Global Audience & Marketing",
        desc: "We promote your courses across our 50,000+ student network in the US, UK, Middle East, Central Asia, and Europe.",
        highlight: "Global Reach"
      }
    ],
    stagesBadge: "Recruitment Pathway",
    stagesTitle: "From Application to First Enrolled Cohort",
    stages: [
      {
        num: "01",
        title: "Application Review",
        desc: "Our admissions board reviews your background, credentials, and proposed syllabus within 48 to 72 hours."
      },
      {
        num: "02",
        title: "Pedagogical Audition",
        desc: "A brief video interview and demonstration lecture to align on audio/video quality and teaching delivery."
      },
      {
        num: "03",
        title: "Agreement & Setup",
        desc: "Finalize your course outline, sign the faculty revenue-sharing agreement, and receive teacher portal access."
      },
      {
        num: "04",
        title: "Course Launch & Scale",
        desc: "Record modules or schedule live cohorts. Begin welcoming students and tracking revenue in real time."
      }
    ],
    faqsBadge: "Instructor FAQ",
    faqsTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What qualifications are required to teach at Safi Academy?",
        a: "We prioritize demonstrable real-world experience, practical industry mastery, and a passion for teaching over formal academic degrees. Whether you are a senior software architect, successful Amazon FBA seller, institutional trader, or business consultant, practical expertise is what matters most."
      },
      {
        q: "Can I teach live cohorts, pre-recorded masterclasses, or both?",
        a: "Yes! Our platform supports both synchronous live classes (powered by low-latency Agora RTC video broadcasts) and asynchronous pre-recorded video modules with auto-graded quizzes and assignments."
      },
      {
        q: "How and when are instructor payouts distributed?",
        a: "Instructors receive payouts monthly for both course enrollments and cohort subscriptions. Payouts can be processed via SafiPay, international wire transfer (SWIFT/SEPA), PayPal, or digital currency."
      },
      {
        q: "Do I retain ownership of my teaching curriculum?",
        a: "Yes. You maintain ownership of your proprietary instructional methods and materials, granting Safi Academy a non-exclusive distribution license to host, market, and broadcast the course to our global community."
      },
      {
        q: "Can I teach in languages other than English?",
        a: "Absolutely. Safi Academy caters to an international student base. We actively welcome courses taught in English, Persian/Dari, Pashto, and bilingual instruction."
      }
    ],
    formBadge: "Faculty Application Portal",
    formTitle: "Submit Your Instructor Application",
    formSubtitle: "Please complete all steps accurately. Your application will be processed by our academic board within 48-72 hours.",
    step1Title: "Personal Information",
    step2Title: "Course & Teaching Experience",
    step3Title: "Credentials & Verification",
    step4Title: "Review & Agreement",
    nextBtn: "Continue",
    prevBtn: "Previous Step",
    submitBtn: "Submit Faculty Application",
    submittingBtn: "Submitting Application...",
    successTitle: "Application Submitted Successfully!",
    successDesc: "Thank you for applying to teach at Safi Academy. Our academic board is reviewing your profile and will contact you via email and phone within 48 to 72 hours."
  },
  fa: {
    isRtl: true,
    badge: "جذب اساتید و هیئت علمی آکادمی صافی • دوره ۲۰۲۶",
    heroTitle: "آینده را آموزش دهید.",
    heroTitleHighlight: "با تأثیرگذاری جهانی کسب درآمد کنید.",
    heroSubtitle: "تخصص عملی خود را در فناوری، تجارت الکترونیک، بازارهای مالی و مدیریت به اشتراک بگذارید. از سهم درآمد بالا، کلاس‌های تصویری زنده فوق‌پیشرفته و سیستم جامع LMS بهره‌مند شوید.",
    metricRevenue: "تا ۷۰٪",
    metricRevenueLabel: "سهم درآمد استاد",
    metricStudents: "۵۰,۰۰۰+",
    metricStudentsLabel: "شاگردان بین‌المللی",
    metricClassrooms: "Agora HD",
    metricClassroomsLabel: "کلاس‌های زنده صوتی و تصویری",
    metricReview: "۴۸-۷۲ ساعت",
    metricReviewLabel: "مدت بررسی درخواست",
    benefitsTitle: "چرا اساتید برتر آکادمی صافی را انتخاب می‌کنند؟",
    benefitsSubtitle: "ما زیرساخت‌ها، درگاه‌های پرداخت جهانی، جذب دانشجو و بازاریابی را مدیریت می‌کنیم تا شما ۱۰۰٪ بر تدریس تمرکز کنید.",
    benefits: [
      {
        title: "بالاترین سهم درآمد در صنعت آموزش",
        desc: "تا ۷۰٪ از درآمد خالص حاصل از فروش دوره‌ها و اشتراک کلاس‌ها را با تسویه منظم و تضمین‌شده ماهانه دریافت کنید.",
        highlight: "درآمد عالی"
      },
      {
        title: "کلاس‌های زنده و بی‌وقفه با آگورا",
        desc: "کلاس‌های زنده با کیفیت HD، تخته سفید تعاملی و چت آنی با پشتیبانی شبکه جهانی Agora RTC برگزار نمایید.",
        highlight: "پخش زنده HD"
      },
      {
        title: "سیستم مدیریت یادگیری (LMS) خودکار",
        desc: "ابزارهای هوشمند نمره‌دهی تمرینات، آزمون‌های خودکار، حضور و غیاب و صدور گواهینامه‌های رسمی معتبر.",
        highlight: "صرفه‌جویی در زمان"
      },
      {
        title: "بازاریابی و مخاطبان جهانی",
        desc: "دوره‌های شما به جامعه بیش از ۵۰ هزار دانشجوی فعال ما در اروپا، آمریکا، خاورمیانه و آسیای مرکزی معرفی می‌شود.",
        highlight: "دسترسی جهانی"
      }
    ],
    stagesBadge: "مراحل پذیرش استاد",
    stagesTitle: "از ارسال درخواست تا آغاز اولین دوره آموزشی",
    stages: [
      {
        num: "۰۱",
        title: "بررسی اولیه رزومه و درخواست",
        desc: "شورای علمی و آموزشی ما سوابق، تخصص و سرفصل‌های پیشنهادی شما را ظرف ۴۸ الی ۷۲ ساعت بررسی می‌کند."
      },
      {
        num: "۰۲",
        title: "مصاحبه و ارزیابی تدریس",
        desc: "یک گفتگوی آنلاین کوتاه و تدریس آزمایشی جهت ارزیابی کیفیت صدا، تصویر و نحوه انتقال مفاهیم."
      },
      {
        num: "۰۳",
        title: "امضای قرارداد و راه‌اندازی",
        desc: "تکمیل سرفصل‌های رسمی دوره، امضای قرارداد رسمی سهم درآمد و دسترسی کامل به پنل اختصاصی استاد."
      },
      {
        num: "۰۴",
        title: "آغاز دوره و کسب درآمد",
        desc: "ضبط ویدیوها یا زمان‌بندی جلسات زنده، پذیرش دانشجویان و مشاهده گزارش‌های مالی در لحظه."
      }
    ],
    faqsBadge: "سوالات متداول اساتید",
    faqsTitle: "پاسخ به پرسش‌های رایج مدرسین",
    faqs: [
      {
        q: "چه شرایطی برای تدریس در آکادمی صافی لازم است؟",
        a: "ما به تجربه عملی واقعی و تسلط بر مهارت‌ها اهمیت می‌دهیم تا مدارک صوری دانشگاهی. خواه یک مهندس ارشد نرم‌افزار باشید، فروشنده آمازون یا تریدر حرفه‌ای، مهارت و انگیزه تدریس ملاک اصلی است."
      },
      {
        q: "آیا می‌توانم کلاس‌های زنده یا دوره‌های ویدیویی ضبط‌شده برگزار کنم؟",
        a: "بله، پلتفرم ما از هر دو مدل کلاس‌های زنده تعاملی Agora و دوره‌های ویدیویی همراه با کوییز و تمرین پشتیبانی می‌کند."
      },
      {
        q: "حق‌التدریس و سهم درآمد اساتید چگونه و چه زمانی پرداخت می‌شود؟",
        a: "تسویه حساب‌ها به صورت ماهانه از طریق SafiPay، حواله بانکی بین‌المللی، پی‌پال یا ارزهای دیجیتال انجام می‌پذیرد."
      },
      {
        q: "آیا مالکیت معنوی محتوا و دوره‌ها برای استاد محفوظ می‌ماند؟",
        a: "بله. شما مالک متدولوژی و محتوای آموزشی خود هستید و تنها مجوز انتشار غیرانحصاری به آکادمی صافی اعطا می‌شود."
      },
      {
        q: "آیا امکان تدریس به زبان‌های فارسی، پشتو یا انگلیسی وجود دارد؟",
        a: "کاملاً. آکادمی صافی از دوره‌های آموزشی به زبان‌های انگلیسی، فارسی/دری و پشتو استقبال می‌کند."
      }
    ],
    formBadge: "پورتال ثبت درخواست تدریس",
    formTitle: "فرم ثبت‌نام و عضویت هیئت علمی",
    formSubtitle: "لطفاً اطلاعات زیر را با دقت تکمیل فرمایید. درخواست شما ظرف ۴۸ تا ۷۲ ساعت توسط شورای آموزشی بررسی خواهد شد.",
    step1Title: "مشخصات فردی و تماس",
    step2Title: "اطلاعات دوره و سوابق تدریس",
    step3Title: "مدارک، رزومه و نمونه ویدیو",
    step4Title: "بررسی نهایی و توافق‌نامه",
    nextBtn: "مرحله بعدی",
    prevBtn: "مرحله قبلی",
    submitBtn: "ارسال نهایی درخواست تدریس",
    submittingBtn: "در حال ثبت اطلاعات...",
    successTitle: "درخواست شما با موفقیت ثبت شد!",
    successDesc: "با تشکر از تمایل شما برای همکاری با آکادمی صافی. شورای علمی رزومه شما را بررسی کرده و ظرف ۴۸ تا ۷۲ ساعت با شما تماس خواهد گرفت."
  },
  ps: {
    isRtl: true,
    badge: "د صافي اکاډمۍ د استادانو جذب • ۲۰۲۶ لړۍ",
    heroTitle: "راتلونکي ته زده کړه ورکړئ.",
    heroTitleHighlight: "د نړیوال اغېز سره عاید ترلاسه کړئ.",
    heroSubtitle: "په ټیکنالوژۍ، ای کامرس، مالي مارکیټونو او ستراتیژۍ کې خپلې عملي تجربې له نړیوالو محصلینو سره شریکې کړئ. د لوړ عاید او پرمختللو ټولګیو څخه ګټه پورته کړئ.",
    metricRevenue: "تر ۷۰٪ پورې",
    metricRevenueLabel: "د استاد د عاید برخه",
    metricStudents: "۵۰,۰۰۰+",
    metricStudentsLabel: "نړیوال زده کوونکي",
    metricClassrooms: "Agora HD",
    metricClassroomsLabel: "ژوندي غږیز او ویډیویي ټولګي",
    metricReview: "۴۸-۷۲ ساعته",
    metricReviewLabel: "د غوښتنلیک د ارزونې موده",
    benefitsTitle: "ولې مخکښ استادان صافي اکاډمي غوره کوي؟",
    benefitsSubtitle: "موږ ټول زیربناوې، نړیوالې تادیات او بازارموندنه پرمخ وړو ترڅو تاسو په بشپړه توګه په ښوونه تمرکز وکړئ.",
    benefits: [
      {
        title: "په تدریس کې د عاید ترټولو لوړه برخه",
        desc: "د دورو د پلور او نوملیکنې تر ۷۰٪ پورې خالص عاید ترلاسه کړئ چې په منظمه توګه هره میاشت تادیه کیږي.",
        highlight: "لوړ عاید"
      },
      {
        title: "د Agora لخوا پرمخ وړل شوي ژوندي ټولګي",
        desc: "په HD کیفیت، تعاملي تختې او فوري چیټ سره ژوندۍ لکچرونه وړاندې کړئ.",
        highlight: "HD ژوندی نشر"
      },
      {
        title: "د زده کړې اتوماتیک مدیریت (LMS)",
        desc: "د کورنیو دندو نمرې ورکول، ازموینې او د رسمي تصدیق پاڼو اتومات صادرول.",
        highlight: "د وخت سپما"
      },
      {
        title: "نړیوال لیدونکي او بازارموندنه",
        desc: "ستاسو کورسونه په ټوله نړۍ کې زموږ له ۵۰ زرو څخه زیاتو محصلینو ته وړاندې کیږي.",
        highlight: "نړیوال پوښښ"
      }
    ],
    stagesBadge: "د استادۍ پړاوونه",
    stagesTitle: "له غوښتنلیک څخه تر لومړۍ زده کړې پورې",
    stages: [
      {
        num: "۰۱",
        title: "د غوښتنلیک ارزونه",
        desc: "زموږ علمي بورډ ستاسو تجربه او وړاندیز شوی نصاب په ۴۸ تر ۷۲ ساعتونو کې څیړي."
      },
      {
        num: "۰۲",
        title: "د تدریس آزموینه او مرکه",
        desc: "د ویډیو او غږ د کیفیت او تدریس د څرنګوالي ارزونې لپاره لنډه آنلاین مرکه."
      },
      {
        num: "۰۳",
        title: "قرارداد او چمتووالی",
        desc: "د نصاب نهایی کول، د عاید تړون لاسلیک او د استاد پورټل ته لاسرسی."
      },
      {
        num: "۰۴",
        title: "د کورس پیل او عاید",
        desc: "د محصلینو منل، ژوندي یا ثبت شوي ټولګي او په ریښتیني وخت کې د عاید څارنه."
      }
    ],
    faqsBadge: "د استادانو پوښتنې",
    faqsTitle: "ډېرې پوښتل شوې پوښتنې",
    faqs: [
      {
        q: "په صافي اکاډمۍ کې د تدریس لپاره کوم شرایط لازم دي؟",
        a: "موږ د پوهنتون د رسمي اسنادو پر ځای عملي تجربې او مهارت ته لومړیتوب ورکوو."
      },
      {
        q: "ایا زه کولی شم ژوندي یا ثبت شوي کورسونه جوړ کړم؟",
        a: "هو، زموږ پلیټفارم د دواړو ماډلونو بشپړ ملاتړ کوي."
      },
      {
        q: "د استادانو عاید کله او څنګه ورکول کیږي؟",
        a: "تادیات هره میاشت د SafiPay، بانکي حوالې، پی پال یا ډیجیټل اسعارو له لارې کیږي."
      },
      {
        q: "ایا د نصاب ملکیت له استاد سره پاتې کیږي؟",
        a: "هو، د فکري ملکیت حقونه ستاسو په لاس کې دي."
      },
      {
        q: "ایا په پښتو یا فارسي ژبو تدریس ممکن دی؟",
        a: "هو بالکل، موږ په پښتو، دري او انګلیسي ژبو کورسونو ته ښه راغلاست وایو."
      }
    ],
    formBadge: "د تدریس غوښتنلیک پورټل",
    formTitle: "د ښوونکي غوښتنلیک وسپارئ",
    formSubtitle: "مهرباني وکړئ لاندې ټول پړاوونه بشپړ کړئ. ستاسو غوښتنه به په ۴۸-۷۲ ساعتونو کې وڅیړل شي.",
    step1Title: "شخصي او د اړیکې معلومات",
    step2Title: "د کورس او تدریس تجربه",
    step3Title: "اسناد او د ویډیو نمونه",
    step4Title: "بیا کتنه او موافقه",
    nextBtn: "بل ګام",
    prevBtn: "مخکینی ګام",
    submitBtn: "غوښتنلیک وسپارئ",
    submittingBtn: "د استولو په حال کې...",
    successTitle: "ستاسو غوښتنه وسپارل شوه!",
    successDesc: "په صافي اکاډمۍ کې د تدریس له غوښتنې مننه. موږ به په ۴۸ تر ۷۲ ساعتونو کې له تاسو سره اړیکه ونیسو."
  }
};

for (const loc of locales) {
  if (data[loc]) continue;
  const isRtl = ['ar', 'ur'].includes(loc);
  data[loc] = {
    ...data.en,
    isRtl
  };
}

let code = `// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES INSTRUCTOR APPLICATION TRANSLATIONS
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

export const instructorApplicationTranslations: Record<string, InstructorApplicationTranslation> = ${JSON.stringify(data, null, 2)};

export function getInstructorApplicationTranslation(locale: string): InstructorApplicationTranslation {
  return instructorApplicationTranslations[locale] || instructorApplicationTranslations.en;
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/utils/instructorApplicationTranslations.ts'), code, 'utf-8');
console.log('Successfully generated src/utils/instructorApplicationTranslations.ts with 19 languages!');
