// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES BUSINESS FORMATION TRANSLATIONS
// ============================================================================

export interface BusinessServiceItem {
  title: string;
  desc: string;
  badge: string;
}

export interface BusinessWhyItem {
  title: string;
  desc: string;
}

export interface BusinessStepItem {
  step: string;
  title: string;
  desc: string;
}

export interface BusinessFaqItem {
  q: string;
  a: string;
}

export interface BusinessFormationTranslation {
  isRtl: boolean;
  partnerDisclosure: string;
  disclosureText: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  ctaRegister: string;
  ctaExploreCourses: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSub: string;
  whyBadge: string;
  whyTitle: string;
  whySub: string;
  stepsBadge: string;
  stepsTitle: string;
  stepsSub: string;
  faqsBadge: string;
  faqsTitle: string;
  faqsSub: string;
  ctaBottomTitle: string;
  ctaBottomDesc: string;
  ctaBottomBtn: string;
  services: BusinessServiceItem[];
  whyWeRecommend: BusinessWhyItem[];
  formationSteps: BusinessStepItem[];
  faqs: BusinessFaqItem[];
}

export const businessFormationTranslations: Record<string, BusinessFormationTranslation> = {
  "en": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "fa": {
    "isRtl": true,
    "partnerDisclosure": "افشای همکاری تجاری و رعایت مقررات رسمی:",
    "disclosureText": "آکادمی صافی دوره‌ها و منابع آموزشی مستقل را برای کارآفرینان ارائه می‌دهد. هنگامی که از طریق لینک‌های معرف ما در Registered Agents Inc ثبت‌نام یا خرید می‌کنید، ممکن است بدون هیچ هزینه اضافی برای شما، کمیسیون همکاری دریافت کنیم. ما تنها ارائه‌دهندگانی را پیشنهاد می‌کنیم که استانداردهای سخت‌گیرانه حفظ حریم خصوصی، قابلیت اطمینان و انطباق قانونی را برآورده سازند.",
    "heroBadge": "ارائه‌دهنده رسمی و مورد تأیید خدمات شرکتی در ایالات متحده",
    "heroTitle1": "ثبت و حفاظت رسمی از",
    "heroTitle2": "شرکت شما در آمریکا",
    "heroDesc": "چه یک بنیان‌گذار بین‌المللی در حال راه‌اندازی استارتاپ جهانی باشید و چه کارآفرینی در حال ورود به بازار آمریکا، ساختار رسمی حقوقی نقشی حیاتی دارد. آکادمی صافی خدمات رسمی Registered Agents Inc را برای نمایندگی در تمامی ۵۰ ایالت، ثبت شرکت LLC/Corporation و رعایت مداوم قوانین ایالتی پیشنهاد می‌کند.",
    "ctaRegister": "ثبت رسمی شرکت در آمریکا",
    "ctaExploreCourses": "مشاهده دوره‌های کارآفرینی",
    "servicesBadge": "خدمات حقوقی و شرکتی",
    "servicesTitle": "خدمات جامع شرکتی در تمامی ۵۰ ایالت آمریکا",
    "servicesSub": "تمام آنچه برای ثبت قانونی، حفظ اعتبار حقوقی و حفاظت از حریم خصوصی بنیان‌گذاران نیاز دارید.",
    "whyBadge": "چرا این سرویس؟",
    "whyTitle": "زیرساخت مستقیم فیزیکی و پشتیبانی تخصصی",
    "whySub": "چرا هزاران کارآفرین بین‌المللی به جای واسطه‌ها، مستقیماً به Registered Agents Inc اعتماد می‌کنند.",
    "stepsBadge": "مراحل گام‌به‌گام",
    "stepsTitle": "نحوه ثبت شرکت شما در آمریکا",
    "stepsSub": "نقشه راه آزموده‌شده ما را از انتخاب ایالت تا دریافت اسناد رسمی و اعتبار کامل دنبال کنید.",
    "faqsBadge": "پرسش‌های متداول",
    "faqsTitle": "پرسش‌های پرتکرار در مورد ثبت شرکت در آمریکا",
    "faqsSub": "پاسخ‌های شفاف و رسمی در مورد ایجنت ثبت‌شده، مالکیت بین‌المللی و قوانین شفافیت مالیاتی.",
    "ctaBottomTitle": "آماده راه‌اندازی شرکت رسمی خود در آمریکا هستید؟",
    "ctaBottomDesc": "دفتر تجاری رسمی، اسکن فوری نامه‌ها و پشتیبانی تخصصی حقوقی را در هر یک از ۵۰ ایالت دریافت کنید.",
    "ctaBottomBtn": "شروع ثبت شرکت با Registered Agents Inc",
    "services": [
      {
        "title": "ایجنت ثبت‌شده رسمی (Registered Agent) در ۵۰ ایالت",
        "desc": "طبق قوانین ایالات متحده، هر شرکت ثبت‌شده موظف است یک نماینده مقیم با آدرس فیزیکی معتبر در ایالت ثبت داشته باشد. Registered Agents Inc به عنوان نماینده حقوقی شما عمل کرده و مانع از انتشار آدرس منزل شما در سوابق عمومی می‌شود.",
        "badge": "الزام اساسی قانونی"
      },
      {
        "title": "ثبت رسمی شرکت‌های LLC و Corporation",
        "desc": "ثبت کامل و معتبر شرکت در تمامی ایالات آمریکا از جمله وایومینگ، دلاور و فلوریدا با تهیه اساسنامه (Articles of Organization) و ارسال دقیق پرونده به وزارت خارجه ایالتی.",
        "badge": "تأسیس رسمی شرکت"
      },
      {
        "title": "راهنمایی و پیگیری آخرین مقررات FinCEN BOI",
        "desc": "ارائه دستورالعمل‌های رسمی در خصوص گزارش‌دهی مالکیت ذی‌نفع (BOI). با توجه به احکام دادگاه‌های فدرال، بسیاری از شرکت‌های داخلی در وضعیت معافیت موقت قرار دارند در حالی که شرکت‌های خارجی تحت مقررات جاری هستند. این تیم انطباق کامل شما را تضمین می‌کند.",
        "badge": "انطباق فدرال"
      },
      {
        "title": "گزارش سالانه و حفظ وضعیت فعال (Good Standing)",
        "desc": "ایالات آمریکا نیازمند ارسال گزارش سالانه برای فعال ماندن شرکت هستند. Registered Agents Inc مهلت‌ها را رصد کرده و پرونده‌های سالانه را برای حفظ اعتبار بی‌نقص شرکت شما تنظیم می‌کند.",
        "badge": "پرونده‌های ایالتی"
      },
      {
        "title": "اسکن دیجیتال آنی نامه‌ها و پرتال آنلاین",
        "desc": "مکاتبات رسمی، ابلاغیه‌های دادگاه و نامه‌های دولتی در همان روز دریافت اسکن شده و در داشبورد رمزگذاری‌شده شما قرار می‌گیرند تا از هر کجای دنیا به آن‌ها دسترسی داشته باشید.",
        "badge": "دسترسی فوری جهانی"
      },
      {
        "title": "بسته هویت تجاری و حریم خصوصی کامل",
        "desc": "زیرساخت کامل شامل خط تلفن تجاری آمریکا با کد محلی، دامین اینترنتی، فوروارد ایمیل و استفاده مجاز از آدرس تجاری معتبر.",
        "badge": "زیرساخت شرکتی"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "دفاتر و کارمندان بومی در هر ۵۰ ایالت",
        "desc": "برخلاف شرکت‌های واسطه، Registered Agents Inc در تمامی ایالات آمریکا دارای دفاتر فیزیکی ملکی و تیم‌های مستقر برای پردازش مطمئن نامه‌های حقوقی است."
      },
      {
        "title": "حفظ حداکثری حریم خصوصی بنیان‌گذار",
        "desc": "اطلاعات شما به هیچ عنوان به اشخاص ثالث یا لیست‌های تبلیغاتی فروخته نمی‌شود و آدرس شخصی شما از اسناد عمومی دولتی حذف می‌گردد."
      },
      {
        "title": "اسکن مدارک در همان روز دریافت",
        "desc": "ابلاغیه‌های حساس زمان‌بندی‌شده و نامه‌های رسمی در روز دریافت اسکن و در حساب آنلاین امن شما بارگذاری می‌شوند."
      },
      {
        "title": "بیش از دو دهه اعتبار در صنعت حقوقی",
        "desc": "دهه‌ها پیشگامی اثبات‌شده در زمینه ثبت شرکت و نمایندگی حقوقی، مورد اعتماد صدها هزار کارآفرین بین‌المللی."
      },
      {
        "title": "داشبورد مرکزی و یکپارچه انطباق",
        "desc": "مشاهده مهلت‌های قانونی ایالتی، دانلود اسناد مهروموم شده شرکت و مدیریت گزارش‌های سالانه همگی در یک پرتال واحد."
      },
      {
        "title": "پشتیبانی اختصاصی کارشناسان شرکتی",
        "desc": "کارشناسان زبده و مسلط به قوانین ویژه هر ایالت از طریق تلفن و پیام‌رسان مستقیم برای راهنمایی پرونده‌های شما در دسترس هستند."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "آموزش و انتخاب ایالت مناسب",
        "desc": "بررسی کنید که آیا وایومینگ، دلاور یا ایالتی دیگر با مدل تجاری شما سازگار است. دوره‌های تخصصی آکادمی صافی مالیات، مزایا و استراتژی ایالات را پوشش می‌دهند."
      },
      {
        "step": "۰۲",
        "title": "ثبت از طریق Registered Agents Inc",
        "desc": "با استفاده از لینک معرف ما، پکیج LLC یا Corporation خود را انتخاب کرده و آن‌ها را به عنوان ایجنت رسمی تعیین کنید."
      },
      {
        "step": "۰۳",
        "title": "دریافت مدارک و شناسه مالیاتی EIN",
        "desc": "اساسنامه رسمی تاییدشده ایالتی را دریافت کرده، کد مالیاتی فدرال EIN را بگیرید و ساختار سازمانی خود را تکمیل نمایید."
      },
      {
        "step": "۰۴",
        "title": "حفظ انطباق و فعالیت قانونی ۱۰۰٪",
        "desc": "نامه‌های اسکن‌شده را دریافت کنید، مهلت‌های گزارش سالانه را زیر نظر داشته باشید و با قوانین فدرال به‌روز بمانید."
      }
    ],
    "faqs": [
      {
        "q": "ایجنت ثبت‌شده (Registered Agent) چیست و چرا از نظر قانونی الزامی است؟",
        "a": "ایجنت ثبت‌شده فرد یا نهادی حقوقی است که مجاز به دریافت ابلاغیه‌های دادگاه و مکاتبات رسمی ایالتی از طرف شرکت شماست. طبق قوانین آمریکا، داشتن ایجنت فیزیکی در ایالت تأسیس برای تمامی شرکت‌ها اجباری است."
      },
      {
        "q": "آیا کارآفرینان بین‌المللی (غیرمقیم آمریکا) می‌توانند از این خدمات استفاده کنند؟",
        "a": "بله، اشخاص غیر مقیم در آمریکا می‌توانند کاملاً قانونی مالک ۱۰۰٪ یک شرکت آمریکایی (مانند LLC) باشند. این سرویس آدرس فیزیکی معتبر آمریکا را فراهم کرده و کلیه نامه‌ها را دیجیتالی به شما تحویل می‌دهد."
      },
      {
        "q": "آیا در حال حاضر تمامی شرکت‌های آمریکایی ملزم به ارسال گزارش FinCEN BOI هستند؟",
        "a": "خیر، پیرو احکام دادگاه‌های فدرال، برخی شرکت‌های داخلی فعلاً دارای معافیت یا توقف موقت هستند، در حالی که شرکت‌های خارجی ملزم به شفاف‌سازی‌اند. این ارائه‌دهنده آخرین دستورالعمل‌ها را رصد می‌کند."
      },
      {
        "q": "آیا استفاده از لینک معرف آکادمی صافی هزینه اضافی دارد؟",
        "a": "خیر، قیمت‌ها کاملاً یکسان (و اغلب شامل تخفیف‌های ویژه ارجاع) است. آکادمی صافی ممکن است کمیسیون معرف دریافت کند که به تأمین مالی آموزش‌های رایگان کمک می‌کند."
      },
      {
        "q": "چگونه حریم خصوصی بنیان‌گذاران در این سرویس تضمین می‌شود؟",
        "a": "به جای درج آدرس شخصی و منزل شما در سامانه‌های عمومی ایالتی، آدرس تجاری و اداری Registered Agents Inc درج می‌شود تا هویت و محل سکونت شما محرمانه باقی بماند."
      }
    ]
  },
  "ps": {
    "isRtl": true,
    "partnerDisclosure": "افشای همکاری تجاری و رعایت مقررات رسمی:",
    "disclosureText": "آکادمی صافی دوره‌ها و منابع آموزشی مستقل را برای کارآفرینان ارائه می‌دهد. هنگامی که از طریق لینک‌های معرف ما در Registered Agents Inc ثبت‌نام یا خرید می‌کنید، ممکن است بدون هیچ هزینه اضافی برای شما، کمیسیون همکاری دریافت کنیم. ما تنها ارائه‌دهندگانی را پیشنهاد می‌کنیم که استانداردهای سخت‌گیرانه حفظ حریم خصوصی، قابلیت اطمینان و انطباق قانونی را برآورده سازند.",
    "heroBadge": "ارائه‌دهنده رسمی و مورد تأیید خدمات شرکتی در ایالات متحده",
    "heroTitle1": "ثبت و حفاظت رسمی از",
    "heroTitle2": "شرکت شما در آمریکا",
    "heroDesc": "چه یک بنیان‌گذار بین‌المللی در حال راه‌اندازی استارتاپ جهانی باشید و چه کارآفرینی در حال ورود به بازار آمریکا، ساختار رسمی حقوقی نقشی حیاتی دارد. آکادمی صافی خدمات رسمی Registered Agents Inc را برای نمایندگی در تمامی ۵۰ ایالت، ثبت شرکت LLC/Corporation و رعایت مداوم قوانین ایالتی پیشنهاد می‌کند.",
    "ctaRegister": "ثبت رسمی شرکت در آمریکا",
    "ctaExploreCourses": "مشاهده دوره‌های کارآفرینی",
    "servicesBadge": "خدمات حقوقی و شرکتی",
    "servicesTitle": "خدمات جامع شرکتی در تمامی ۵۰ ایالت آمریکا",
    "servicesSub": "تمام آنچه برای ثبت قانونی، حفظ اعتبار حقوقی و حفاظت از حریم خصوصی بنیان‌گذاران نیاز دارید.",
    "whyBadge": "چرا این سرویس؟",
    "whyTitle": "زیرساخت مستقیم فیزیکی و پشتیبانی تخصصی",
    "whySub": "چرا هزاران کارآفرین بین‌المللی به جای واسطه‌ها، مستقیماً به Registered Agents Inc اعتماد می‌کنند.",
    "stepsBadge": "مراحل گام‌به‌گام",
    "stepsTitle": "نحوه ثبت شرکت شما در آمریکا",
    "stepsSub": "نقشه راه آزموده‌شده ما را از انتخاب ایالت تا دریافت اسناد رسمی و اعتبار کامل دنبال کنید.",
    "faqsBadge": "پرسش‌های متداول",
    "faqsTitle": "پرسش‌های پرتکرار در مورد ثبت شرکت در آمریکا",
    "faqsSub": "پاسخ‌های شفاف و رسمی در مورد ایجنت ثبت‌شده، مالکیت بین‌المللی و قوانین شفافیت مالیاتی.",
    "ctaBottomTitle": "آماده راه‌اندازی شرکت رسمی خود در آمریکا هستید؟",
    "ctaBottomDesc": "دفتر تجاری رسمی، اسکن فوری نامه‌ها و پشتیبانی تخصصی حقوقی را در هر یک از ۵۰ ایالت دریافت کنید.",
    "ctaBottomBtn": "شروع ثبت شرکت با Registered Agents Inc",
    "services": [
      {
        "title": "ایجنت ثبت‌شده رسمی (Registered Agent) در ۵۰ ایالت",
        "desc": "طبق قوانین ایالات متحده، هر شرکت ثبت‌شده موظف است یک نماینده مقیم با آدرس فیزیکی معتبر در ایالت ثبت داشته باشد. Registered Agents Inc به عنوان نماینده حقوقی شما عمل کرده و مانع از انتشار آدرس منزل شما در سوابق عمومی می‌شود.",
        "badge": "الزام اساسی قانونی"
      },
      {
        "title": "ثبت رسمی شرکت‌های LLC و Corporation",
        "desc": "ثبت کامل و معتبر شرکت در تمامی ایالات آمریکا از جمله وایومینگ، دلاور و فلوریدا با تهیه اساسنامه (Articles of Organization) و ارسال دقیق پرونده به وزارت خارجه ایالتی.",
        "badge": "تأسیس رسمی شرکت"
      },
      {
        "title": "راهنمایی و پیگیری آخرین مقررات FinCEN BOI",
        "desc": "ارائه دستورالعمل‌های رسمی در خصوص گزارش‌دهی مالکیت ذی‌نفع (BOI). با توجه به احکام دادگاه‌های فدرال، بسیاری از شرکت‌های داخلی در وضعیت معافیت موقت قرار دارند در حالی که شرکت‌های خارجی تحت مقررات جاری هستند. این تیم انطباق کامل شما را تضمین می‌کند.",
        "badge": "انطباق فدرال"
      },
      {
        "title": "گزارش سالانه و حفظ وضعیت فعال (Good Standing)",
        "desc": "ایالات آمریکا نیازمند ارسال گزارش سالانه برای فعال ماندن شرکت هستند. Registered Agents Inc مهلت‌ها را رصد کرده و پرونده‌های سالانه را برای حفظ اعتبار بی‌نقص شرکت شما تنظیم می‌کند.",
        "badge": "پرونده‌های ایالتی"
      },
      {
        "title": "اسکن دیجیتال آنی نامه‌ها و پرتال آنلاین",
        "desc": "مکاتبات رسمی، ابلاغیه‌های دادگاه و نامه‌های دولتی در همان روز دریافت اسکن شده و در داشبورد رمزگذاری‌شده شما قرار می‌گیرند تا از هر کجای دنیا به آن‌ها دسترسی داشته باشید.",
        "badge": "دسترسی فوری جهانی"
      },
      {
        "title": "بسته هویت تجاری و حریم خصوصی کامل",
        "desc": "زیرساخت کامل شامل خط تلفن تجاری آمریکا با کد محلی، دامین اینترنتی، فوروارد ایمیل و استفاده مجاز از آدرس تجاری معتبر.",
        "badge": "زیرساخت شرکتی"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "دفاتر و کارمندان بومی در هر ۵۰ ایالت",
        "desc": "برخلاف شرکت‌های واسطه، Registered Agents Inc در تمامی ایالات آمریکا دارای دفاتر فیزیکی ملکی و تیم‌های مستقر برای پردازش مطمئن نامه‌های حقوقی است."
      },
      {
        "title": "حفظ حداکثری حریم خصوصی بنیان‌گذار",
        "desc": "اطلاعات شما به هیچ عنوان به اشخاص ثالث یا لیست‌های تبلیغاتی فروخته نمی‌شود و آدرس شخصی شما از اسناد عمومی دولتی حذف می‌گردد."
      },
      {
        "title": "اسکن مدارک در همان روز دریافت",
        "desc": "ابلاغیه‌های حساس زمان‌بندی‌شده و نامه‌های رسمی در روز دریافت اسکن و در حساب آنلاین امن شما بارگذاری می‌شوند."
      },
      {
        "title": "بیش از دو دهه اعتبار در صنعت حقوقی",
        "desc": "دهه‌ها پیشگامی اثبات‌شده در زمینه ثبت شرکت و نمایندگی حقوقی، مورد اعتماد صدها هزار کارآفرین بین‌المللی."
      },
      {
        "title": "داشبورد مرکزی و یکپارچه انطباق",
        "desc": "مشاهده مهلت‌های قانونی ایالتی، دانلود اسناد مهروموم شده شرکت و مدیریت گزارش‌های سالانه همگی در یک پرتال واحد."
      },
      {
        "title": "پشتیبانی اختصاصی کارشناسان شرکتی",
        "desc": "کارشناسان زبده و مسلط به قوانین ویژه هر ایالت از طریق تلفن و پیام‌رسان مستقیم برای راهنمایی پرونده‌های شما در دسترس هستند."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "آموزش و انتخاب ایالت مناسب",
        "desc": "بررسی کنید که آیا وایومینگ، دلاور یا ایالتی دیگر با مدل تجاری شما سازگار است. دوره‌های تخصصی آکادمی صافی مالیات، مزایا و استراتژی ایالات را پوشش می‌دهند."
      },
      {
        "step": "۰۲",
        "title": "ثبت از طریق Registered Agents Inc",
        "desc": "با استفاده از لینک معرف ما، پکیج LLC یا Corporation خود را انتخاب کرده و آن‌ها را به عنوان ایجنت رسمی تعیین کنید."
      },
      {
        "step": "۰۳",
        "title": "دریافت مدارک و شناسه مالیاتی EIN",
        "desc": "اساسنامه رسمی تاییدشده ایالتی را دریافت کرده، کد مالیاتی فدرال EIN را بگیرید و ساختار سازمانی خود را تکمیل نمایید."
      },
      {
        "step": "۰۴",
        "title": "حفظ انطباق و فعالیت قانونی ۱۰۰٪",
        "desc": "نامه‌های اسکن‌شده را دریافت کنید، مهلت‌های گزارش سالانه را زیر نظر داشته باشید و با قوانین فدرال به‌روز بمانید."
      }
    ],
    "faqs": [
      {
        "q": "ایجنت ثبت‌شده (Registered Agent) چیست و چرا از نظر قانونی الزامی است؟",
        "a": "ایجنت ثبت‌شده فرد یا نهادی حقوقی است که مجاز به دریافت ابلاغیه‌های دادگاه و مکاتبات رسمی ایالتی از طرف شرکت شماست. طبق قوانین آمریکا، داشتن ایجنت فیزیکی در ایالت تأسیس برای تمامی شرکت‌ها اجباری است."
      },
      {
        "q": "آیا کارآفرینان بین‌المللی (غیرمقیم آمریکا) می‌توانند از این خدمات استفاده کنند؟",
        "a": "بله، اشخاص غیر مقیم در آمریکا می‌توانند کاملاً قانونی مالک ۱۰۰٪ یک شرکت آمریکایی (مانند LLC) باشند. این سرویس آدرس فیزیکی معتبر آمریکا را فراهم کرده و کلیه نامه‌ها را دیجیتالی به شما تحویل می‌دهد."
      },
      {
        "q": "آیا در حال حاضر تمامی شرکت‌های آمریکایی ملزم به ارسال گزارش FinCEN BOI هستند؟",
        "a": "خیر، پیرو احکام دادگاه‌های فدرال، برخی شرکت‌های داخلی فعلاً دارای معافیت یا توقف موقت هستند، در حالی که شرکت‌های خارجی ملزم به شفاف‌سازی‌اند. این ارائه‌دهنده آخرین دستورالعمل‌ها را رصد می‌کند."
      },
      {
        "q": "آیا استفاده از لینک معرف آکادمی صافی هزینه اضافی دارد؟",
        "a": "خیر، قیمت‌ها کاملاً یکسان (و اغلب شامل تخفیف‌های ویژه ارجاع) است. آکادمی صافی ممکن است کمیسیون معرف دریافت کند که به تأمین مالی آموزش‌های رایگان کمک می‌کند."
      },
      {
        "q": "چگونه حریم خصوصی بنیان‌گذاران در این سرویس تضمین می‌شود؟",
        "a": "به جای درج آدرس شخصی و منزل شما در سامانه‌های عمومی ایالتی، آدرس تجاری و اداری Registered Agents Inc درج می‌شود تا هویت و محل سکونت شما محرمانه باقی بماند."
      }
    ]
  },
  "ar": {
    "isRtl": true,
    "partnerDisclosure": "افشای همکاری تجاری و رعایت مقررات رسمی:",
    "disclosureText": "آکادمی صافی دوره‌ها و منابع آموزشی مستقل را برای کارآفرینان ارائه می‌دهد. هنگامی که از طریق لینک‌های معرف ما در Registered Agents Inc ثبت‌نام یا خرید می‌کنید، ممکن است بدون هیچ هزینه اضافی برای شما، کمیسیون همکاری دریافت کنیم. ما تنها ارائه‌دهندگانی را پیشنهاد می‌کنیم که استانداردهای سخت‌گیرانه حفظ حریم خصوصی، قابلیت اطمینان و انطباق قانونی را برآورده سازند.",
    "heroBadge": "ارائه‌دهنده رسمی و مورد تأیید خدمات شرکتی در ایالات متحده",
    "heroTitle1": "ثبت و حفاظت رسمی از",
    "heroTitle2": "شرکت شما در آمریکا",
    "heroDesc": "چه یک بنیان‌گذار بین‌المللی در حال راه‌اندازی استارتاپ جهانی باشید و چه کارآفرینی در حال ورود به بازار آمریکا، ساختار رسمی حقوقی نقشی حیاتی دارد. آکادمی صافی خدمات رسمی Registered Agents Inc را برای نمایندگی در تمامی ۵۰ ایالت، ثبت شرکت LLC/Corporation و رعایت مداوم قوانین ایالتی پیشنهاد می‌کند.",
    "ctaRegister": "ثبت رسمی شرکت در آمریکا",
    "ctaExploreCourses": "مشاهده دوره‌های کارآفرینی",
    "servicesBadge": "خدمات حقوقی و شرکتی",
    "servicesTitle": "خدمات جامع شرکتی در تمامی ۵۰ ایالت آمریکا",
    "servicesSub": "تمام آنچه برای ثبت قانونی، حفظ اعتبار حقوقی و حفاظت از حریم خصوصی بنیان‌گذاران نیاز دارید.",
    "whyBadge": "چرا این سرویس؟",
    "whyTitle": "زیرساخت مستقیم فیزیکی و پشتیبانی تخصصی",
    "whySub": "چرا هزاران کارآفرین بین‌المللی به جای واسطه‌ها، مستقیماً به Registered Agents Inc اعتماد می‌کنند.",
    "stepsBadge": "مراحل گام‌به‌گام",
    "stepsTitle": "نحوه ثبت شرکت شما در آمریکا",
    "stepsSub": "نقشه راه آزموده‌شده ما را از انتخاب ایالت تا دریافت اسناد رسمی و اعتبار کامل دنبال کنید.",
    "faqsBadge": "پرسش‌های متداول",
    "faqsTitle": "پرسش‌های پرتکرار در مورد ثبت شرکت در آمریکا",
    "faqsSub": "پاسخ‌های شفاف و رسمی در مورد ایجنت ثبت‌شده، مالکیت بین‌المللی و قوانین شفافیت مالیاتی.",
    "ctaBottomTitle": "آماده راه‌اندازی شرکت رسمی خود در آمریکا هستید؟",
    "ctaBottomDesc": "دفتر تجاری رسمی، اسکن فوری نامه‌ها و پشتیبانی تخصصی حقوقی را در هر یک از ۵۰ ایالت دریافت کنید.",
    "ctaBottomBtn": "شروع ثبت شرکت با Registered Agents Inc",
    "services": [
      {
        "title": "ایجنت ثبت‌شده رسمی (Registered Agent) در ۵۰ ایالت",
        "desc": "طبق قوانین ایالات متحده، هر شرکت ثبت‌شده موظف است یک نماینده مقیم با آدرس فیزیکی معتبر در ایالت ثبت داشته باشد. Registered Agents Inc به عنوان نماینده حقوقی شما عمل کرده و مانع از انتشار آدرس منزل شما در سوابق عمومی می‌شود.",
        "badge": "الزام اساسی قانونی"
      },
      {
        "title": "ثبت رسمی شرکت‌های LLC و Corporation",
        "desc": "ثبت کامل و معتبر شرکت در تمامی ایالات آمریکا از جمله وایومینگ، دلاور و فلوریدا با تهیه اساسنامه (Articles of Organization) و ارسال دقیق پرونده به وزارت خارجه ایالتی.",
        "badge": "تأسیس رسمی شرکت"
      },
      {
        "title": "راهنمایی و پیگیری آخرین مقررات FinCEN BOI",
        "desc": "ارائه دستورالعمل‌های رسمی در خصوص گزارش‌دهی مالکیت ذی‌نفع (BOI). با توجه به احکام دادگاه‌های فدرال، بسیاری از شرکت‌های داخلی در وضعیت معافیت موقت قرار دارند در حالی که شرکت‌های خارجی تحت مقررات جاری هستند. این تیم انطباق کامل شما را تضمین می‌کند.",
        "badge": "انطباق فدرال"
      },
      {
        "title": "گزارش سالانه و حفظ وضعیت فعال (Good Standing)",
        "desc": "ایالات آمریکا نیازمند ارسال گزارش سالانه برای فعال ماندن شرکت هستند. Registered Agents Inc مهلت‌ها را رصد کرده و پرونده‌های سالانه را برای حفظ اعتبار بی‌نقص شرکت شما تنظیم می‌کند.",
        "badge": "پرونده‌های ایالتی"
      },
      {
        "title": "اسکن دیجیتال آنی نامه‌ها و پرتال آنلاین",
        "desc": "مکاتبات رسمی، ابلاغیه‌های دادگاه و نامه‌های دولتی در همان روز دریافت اسکن شده و در داشبورد رمزگذاری‌شده شما قرار می‌گیرند تا از هر کجای دنیا به آن‌ها دسترسی داشته باشید.",
        "badge": "دسترسی فوری جهانی"
      },
      {
        "title": "بسته هویت تجاری و حریم خصوصی کامل",
        "desc": "زیرساخت کامل شامل خط تلفن تجاری آمریکا با کد محلی، دامین اینترنتی، فوروارد ایمیل و استفاده مجاز از آدرس تجاری معتبر.",
        "badge": "زیرساخت شرکتی"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "دفاتر و کارمندان بومی در هر ۵۰ ایالت",
        "desc": "برخلاف شرکت‌های واسطه، Registered Agents Inc در تمامی ایالات آمریکا دارای دفاتر فیزیکی ملکی و تیم‌های مستقر برای پردازش مطمئن نامه‌های حقوقی است."
      },
      {
        "title": "حفظ حداکثری حریم خصوصی بنیان‌گذار",
        "desc": "اطلاعات شما به هیچ عنوان به اشخاص ثالث یا لیست‌های تبلیغاتی فروخته نمی‌شود و آدرس شخصی شما از اسناد عمومی دولتی حذف می‌گردد."
      },
      {
        "title": "اسکن مدارک در همان روز دریافت",
        "desc": "ابلاغیه‌های حساس زمان‌بندی‌شده و نامه‌های رسمی در روز دریافت اسکن و در حساب آنلاین امن شما بارگذاری می‌شوند."
      },
      {
        "title": "بیش از دو دهه اعتبار در صنعت حقوقی",
        "desc": "دهه‌ها پیشگامی اثبات‌شده در زمینه ثبت شرکت و نمایندگی حقوقی، مورد اعتماد صدها هزار کارآفرین بین‌المللی."
      },
      {
        "title": "داشبورد مرکزی و یکپارچه انطباق",
        "desc": "مشاهده مهلت‌های قانونی ایالتی، دانلود اسناد مهروموم شده شرکت و مدیریت گزارش‌های سالانه همگی در یک پرتال واحد."
      },
      {
        "title": "پشتیبانی اختصاصی کارشناسان شرکتی",
        "desc": "کارشناسان زبده و مسلط به قوانین ویژه هر ایالت از طریق تلفن و پیام‌رسان مستقیم برای راهنمایی پرونده‌های شما در دسترس هستند."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "آموزش و انتخاب ایالت مناسب",
        "desc": "بررسی کنید که آیا وایومینگ، دلاور یا ایالتی دیگر با مدل تجاری شما سازگار است. دوره‌های تخصصی آکادمی صافی مالیات، مزایا و استراتژی ایالات را پوشش می‌دهند."
      },
      {
        "step": "۰۲",
        "title": "ثبت از طریق Registered Agents Inc",
        "desc": "با استفاده از لینک معرف ما، پکیج LLC یا Corporation خود را انتخاب کرده و آن‌ها را به عنوان ایجنت رسمی تعیین کنید."
      },
      {
        "step": "۰۳",
        "title": "دریافت مدارک و شناسه مالیاتی EIN",
        "desc": "اساسنامه رسمی تاییدشده ایالتی را دریافت کرده، کد مالیاتی فدرال EIN را بگیرید و ساختار سازمانی خود را تکمیل نمایید."
      },
      {
        "step": "۰۴",
        "title": "حفظ انطباق و فعالیت قانونی ۱۰۰٪",
        "desc": "نامه‌های اسکن‌شده را دریافت کنید، مهلت‌های گزارش سالانه را زیر نظر داشته باشید و با قوانین فدرال به‌روز بمانید."
      }
    ],
    "faqs": [
      {
        "q": "ایجنت ثبت‌شده (Registered Agent) چیست و چرا از نظر قانونی الزامی است؟",
        "a": "ایجنت ثبت‌شده فرد یا نهادی حقوقی است که مجاز به دریافت ابلاغیه‌های دادگاه و مکاتبات رسمی ایالتی از طرف شرکت شماست. طبق قوانین آمریکا، داشتن ایجنت فیزیکی در ایالت تأسیس برای تمامی شرکت‌ها اجباری است."
      },
      {
        "q": "آیا کارآفرینان بین‌المللی (غیرمقیم آمریکا) می‌توانند از این خدمات استفاده کنند؟",
        "a": "بله، اشخاص غیر مقیم در آمریکا می‌توانند کاملاً قانونی مالک ۱۰۰٪ یک شرکت آمریکایی (مانند LLC) باشند. این سرویس آدرس فیزیکی معتبر آمریکا را فراهم کرده و کلیه نامه‌ها را دیجیتالی به شما تحویل می‌دهد."
      },
      {
        "q": "آیا در حال حاضر تمامی شرکت‌های آمریکایی ملزم به ارسال گزارش FinCEN BOI هستند؟",
        "a": "خیر، پیرو احکام دادگاه‌های فدرال، برخی شرکت‌های داخلی فعلاً دارای معافیت یا توقف موقت هستند، در حالی که شرکت‌های خارجی ملزم به شفاف‌سازی‌اند. این ارائه‌دهنده آخرین دستورالعمل‌ها را رصد می‌کند."
      },
      {
        "q": "آیا استفاده از لینک معرف آکادمی صافی هزینه اضافی دارد؟",
        "a": "خیر، قیمت‌ها کاملاً یکسان (و اغلب شامل تخفیف‌های ویژه ارجاع) است. آکادمی صافی ممکن است کمیسیون معرف دریافت کند که به تأمین مالی آموزش‌های رایگان کمک می‌کند."
      },
      {
        "q": "چگونه حریم خصوصی بنیان‌گذاران در این سرویس تضمین می‌شود؟",
        "a": "به جای درج آدرس شخصی و منزل شما در سامانه‌های عمومی ایالتی، آدرس تجاری و اداری Registered Agents Inc درج می‌شود تا هویت و محل سکونت شما محرمانه باقی بماند."
      }
    ]
  },
  "ur": {
    "isRtl": true,
    "partnerDisclosure": "افشای همکاری تجاری و رعایت مقررات رسمی:",
    "disclosureText": "آکادمی صافی دوره‌ها و منابع آموزشی مستقل را برای کارآفرینان ارائه می‌دهد. هنگامی که از طریق لینک‌های معرف ما در Registered Agents Inc ثبت‌نام یا خرید می‌کنید، ممکن است بدون هیچ هزینه اضافی برای شما، کمیسیون همکاری دریافت کنیم. ما تنها ارائه‌دهندگانی را پیشنهاد می‌کنیم که استانداردهای سخت‌گیرانه حفظ حریم خصوصی، قابلیت اطمینان و انطباق قانونی را برآورده سازند.",
    "heroBadge": "ارائه‌دهنده رسمی و مورد تأیید خدمات شرکتی در ایالات متحده",
    "heroTitle1": "ثبت و حفاظت رسمی از",
    "heroTitle2": "شرکت شما در آمریکا",
    "heroDesc": "چه یک بنیان‌گذار بین‌المللی در حال راه‌اندازی استارتاپ جهانی باشید و چه کارآفرینی در حال ورود به بازار آمریکا، ساختار رسمی حقوقی نقشی حیاتی دارد. آکادمی صافی خدمات رسمی Registered Agents Inc را برای نمایندگی در تمامی ۵۰ ایالت، ثبت شرکت LLC/Corporation و رعایت مداوم قوانین ایالتی پیشنهاد می‌کند.",
    "ctaRegister": "ثبت رسمی شرکت در آمریکا",
    "ctaExploreCourses": "مشاهده دوره‌های کارآفرینی",
    "servicesBadge": "خدمات حقوقی و شرکتی",
    "servicesTitle": "خدمات جامع شرکتی در تمامی ۵۰ ایالت آمریکا",
    "servicesSub": "تمام آنچه برای ثبت قانونی، حفظ اعتبار حقوقی و حفاظت از حریم خصوصی بنیان‌گذاران نیاز دارید.",
    "whyBadge": "چرا این سرویس؟",
    "whyTitle": "زیرساخت مستقیم فیزیکی و پشتیبانی تخصصی",
    "whySub": "چرا هزاران کارآفرین بین‌المللی به جای واسطه‌ها، مستقیماً به Registered Agents Inc اعتماد می‌کنند.",
    "stepsBadge": "مراحل گام‌به‌گام",
    "stepsTitle": "نحوه ثبت شرکت شما در آمریکا",
    "stepsSub": "نقشه راه آزموده‌شده ما را از انتخاب ایالت تا دریافت اسناد رسمی و اعتبار کامل دنبال کنید.",
    "faqsBadge": "پرسش‌های متداول",
    "faqsTitle": "پرسش‌های پرتکرار در مورد ثبت شرکت در آمریکا",
    "faqsSub": "پاسخ‌های شفاف و رسمی در مورد ایجنت ثبت‌شده، مالکیت بین‌المللی و قوانین شفافیت مالیاتی.",
    "ctaBottomTitle": "آماده راه‌اندازی شرکت رسمی خود در آمریکا هستید؟",
    "ctaBottomDesc": "دفتر تجاری رسمی، اسکن فوری نامه‌ها و پشتیبانی تخصصی حقوقی را در هر یک از ۵۰ ایالت دریافت کنید.",
    "ctaBottomBtn": "شروع ثبت شرکت با Registered Agents Inc",
    "services": [
      {
        "title": "ایجنت ثبت‌شده رسمی (Registered Agent) در ۵۰ ایالت",
        "desc": "طبق قوانین ایالات متحده، هر شرکت ثبت‌شده موظف است یک نماینده مقیم با آدرس فیزیکی معتبر در ایالت ثبت داشته باشد. Registered Agents Inc به عنوان نماینده حقوقی شما عمل کرده و مانع از انتشار آدرس منزل شما در سوابق عمومی می‌شود.",
        "badge": "الزام اساسی قانونی"
      },
      {
        "title": "ثبت رسمی شرکت‌های LLC و Corporation",
        "desc": "ثبت کامل و معتبر شرکت در تمامی ایالات آمریکا از جمله وایومینگ، دلاور و فلوریدا با تهیه اساسنامه (Articles of Organization) و ارسال دقیق پرونده به وزارت خارجه ایالتی.",
        "badge": "تأسیس رسمی شرکت"
      },
      {
        "title": "راهنمایی و پیگیری آخرین مقررات FinCEN BOI",
        "desc": "ارائه دستورالعمل‌های رسمی در خصوص گزارش‌دهی مالکیت ذی‌نفع (BOI). با توجه به احکام دادگاه‌های فدرال، بسیاری از شرکت‌های داخلی در وضعیت معافیت موقت قرار دارند در حالی که شرکت‌های خارجی تحت مقررات جاری هستند. این تیم انطباق کامل شما را تضمین می‌کند.",
        "badge": "انطباق فدرال"
      },
      {
        "title": "گزارش سالانه و حفظ وضعیت فعال (Good Standing)",
        "desc": "ایالات آمریکا نیازمند ارسال گزارش سالانه برای فعال ماندن شرکت هستند. Registered Agents Inc مهلت‌ها را رصد کرده و پرونده‌های سالانه را برای حفظ اعتبار بی‌نقص شرکت شما تنظیم می‌کند.",
        "badge": "پرونده‌های ایالتی"
      },
      {
        "title": "اسکن دیجیتال آنی نامه‌ها و پرتال آنلاین",
        "desc": "مکاتبات رسمی، ابلاغیه‌های دادگاه و نامه‌های دولتی در همان روز دریافت اسکن شده و در داشبورد رمزگذاری‌شده شما قرار می‌گیرند تا از هر کجای دنیا به آن‌ها دسترسی داشته باشید.",
        "badge": "دسترسی فوری جهانی"
      },
      {
        "title": "بسته هویت تجاری و حریم خصوصی کامل",
        "desc": "زیرساخت کامل شامل خط تلفن تجاری آمریکا با کد محلی، دامین اینترنتی، فوروارد ایمیل و استفاده مجاز از آدرس تجاری معتبر.",
        "badge": "زیرساخت شرکتی"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "دفاتر و کارمندان بومی در هر ۵۰ ایالت",
        "desc": "برخلاف شرکت‌های واسطه، Registered Agents Inc در تمامی ایالات آمریکا دارای دفاتر فیزیکی ملکی و تیم‌های مستقر برای پردازش مطمئن نامه‌های حقوقی است."
      },
      {
        "title": "حفظ حداکثری حریم خصوصی بنیان‌گذار",
        "desc": "اطلاعات شما به هیچ عنوان به اشخاص ثالث یا لیست‌های تبلیغاتی فروخته نمی‌شود و آدرس شخصی شما از اسناد عمومی دولتی حذف می‌گردد."
      },
      {
        "title": "اسکن مدارک در همان روز دریافت",
        "desc": "ابلاغیه‌های حساس زمان‌بندی‌شده و نامه‌های رسمی در روز دریافت اسکن و در حساب آنلاین امن شما بارگذاری می‌شوند."
      },
      {
        "title": "بیش از دو دهه اعتبار در صنعت حقوقی",
        "desc": "دهه‌ها پیشگامی اثبات‌شده در زمینه ثبت شرکت و نمایندگی حقوقی، مورد اعتماد صدها هزار کارآفرین بین‌المللی."
      },
      {
        "title": "داشبورد مرکزی و یکپارچه انطباق",
        "desc": "مشاهده مهلت‌های قانونی ایالتی، دانلود اسناد مهروموم شده شرکت و مدیریت گزارش‌های سالانه همگی در یک پرتال واحد."
      },
      {
        "title": "پشتیبانی اختصاصی کارشناسان شرکتی",
        "desc": "کارشناسان زبده و مسلط به قوانین ویژه هر ایالت از طریق تلفن و پیام‌رسان مستقیم برای راهنمایی پرونده‌های شما در دسترس هستند."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "آموزش و انتخاب ایالت مناسب",
        "desc": "بررسی کنید که آیا وایومینگ، دلاور یا ایالتی دیگر با مدل تجاری شما سازگار است. دوره‌های تخصصی آکادمی صافی مالیات، مزایا و استراتژی ایالات را پوشش می‌دهند."
      },
      {
        "step": "۰۲",
        "title": "ثبت از طریق Registered Agents Inc",
        "desc": "با استفاده از لینک معرف ما، پکیج LLC یا Corporation خود را انتخاب کرده و آن‌ها را به عنوان ایجنت رسمی تعیین کنید."
      },
      {
        "step": "۰۳",
        "title": "دریافت مدارک و شناسه مالیاتی EIN",
        "desc": "اساسنامه رسمی تاییدشده ایالتی را دریافت کرده، کد مالیاتی فدرال EIN را بگیرید و ساختار سازمانی خود را تکمیل نمایید."
      },
      {
        "step": "۰۴",
        "title": "حفظ انطباق و فعالیت قانونی ۱۰۰٪",
        "desc": "نامه‌های اسکن‌شده را دریافت کنید، مهلت‌های گزارش سالانه را زیر نظر داشته باشید و با قوانین فدرال به‌روز بمانید."
      }
    ],
    "faqs": [
      {
        "q": "ایجنت ثبت‌شده (Registered Agent) چیست و چرا از نظر قانونی الزامی است؟",
        "a": "ایجنت ثبت‌شده فرد یا نهادی حقوقی است که مجاز به دریافت ابلاغیه‌های دادگاه و مکاتبات رسمی ایالتی از طرف شرکت شماست. طبق قوانین آمریکا، داشتن ایجنت فیزیکی در ایالت تأسیس برای تمامی شرکت‌ها اجباری است."
      },
      {
        "q": "آیا کارآفرینان بین‌المللی (غیرمقیم آمریکا) می‌توانند از این خدمات استفاده کنند؟",
        "a": "بله، اشخاص غیر مقیم در آمریکا می‌توانند کاملاً قانونی مالک ۱۰۰٪ یک شرکت آمریکایی (مانند LLC) باشند. این سرویس آدرس فیزیکی معتبر آمریکا را فراهم کرده و کلیه نامه‌ها را دیجیتالی به شما تحویل می‌دهد."
      },
      {
        "q": "آیا در حال حاضر تمامی شرکت‌های آمریکایی ملزم به ارسال گزارش FinCEN BOI هستند؟",
        "a": "خیر، پیرو احکام دادگاه‌های فدرال، برخی شرکت‌های داخلی فعلاً دارای معافیت یا توقف موقت هستند، در حالی که شرکت‌های خارجی ملزم به شفاف‌سازی‌اند. این ارائه‌دهنده آخرین دستورالعمل‌ها را رصد می‌کند."
      },
      {
        "q": "آیا استفاده از لینک معرف آکادمی صافی هزینه اضافی دارد؟",
        "a": "خیر، قیمت‌ها کاملاً یکسان (و اغلب شامل تخفیف‌های ویژه ارجاع) است. آکادمی صافی ممکن است کمیسیون معرف دریافت کند که به تأمین مالی آموزش‌های رایگان کمک می‌کند."
      },
      {
        "q": "چگونه حریم خصوصی بنیان‌گذاران در این سرویس تضمین می‌شود؟",
        "a": "به جای درج آدرس شخصی و منزل شما در سامانه‌های عمومی ایالتی، آدرس تجاری و اداری Registered Agents Inc درج می‌شود تا هویت و محل سکونت شما محرمانه باقی بماند."
      }
    ]
  },
  "ru": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "tr": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "de": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "fr": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "es": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "zh": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "hi": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "it": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "pt": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "ja": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "ko": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "nl": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "uz": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  },
  "id": {
    "isRtl": false,
    "partnerDisclosure": "Partner & Regulatory Compliance Disclosure:",
    "disclosureText": "Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.",
    "heroBadge": "Recommended US Corporate Service Provider",
    "heroTitle1": "Form & Protect Your",
    "heroTitle2": "US Company",
    "heroDesc": "Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends Registered Agents Inc for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.",
    "ctaRegister": "Register Your US Company",
    "ctaExploreCourses": "Explore Business Courses",
    "servicesBadge": "Corporate Services",
    "servicesTitle": "Comprehensive Business Services in All 50 States",
    "servicesSub": "Everything you need to legally incorporate, maintain state compliance, and safeguard founder privacy.",
    "whyBadge": "Why We Recommend",
    "whyTitle": "Direct Infrastructure & Dedicated Support",
    "whySub": "Why thousands of entrepreneurs trust Registered Agents Inc over third-party reseller portals.",
    "stepsBadge": "Step-by-Step",
    "stepsTitle": "How to Form Your US Company",
    "stepsSub": "Follow our battle-tested roadmap from state selection to full corporate good standing.",
    "faqsBadge": "FAQ",
    "faqsTitle": "Frequently Asked Questions",
    "faqsSub": "Clear answers on US registered agent rules, international ownership, and compliance mandates.",
    "ctaBottomTitle": "Ready to Form Your US Business?",
    "ctaBottomDesc": "Establish your corporate presence with local registered offices in any of the 50 US states.",
    "ctaBottomBtn": "Launch with Registered Agents Inc",
    "services": [
      {
        "title": "Registered Agent in All 50 States",
        "desc": "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
        "badge": "Core Requirement"
      },
      {
        "title": "LLC & Corporation Formation",
        "desc": "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
        "badge": "Entity Setup"
      },
      {
        "title": "FinCEN BOI Guidance & Updates",
        "desc": "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Annual Report & Good Standing",
        "desc": "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
        "badge": "State Filings"
      },
      {
        "title": "Digital Mail Scanning & Portal",
        "desc": "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
        "badge": "Instant Access"
      },
      {
        "title": "Business Identity & Privacy Suite",
        "desc": "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
        "badge": "Infrastructure"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Locally Staffed in All 50 States",
        "desc": "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing."
      },
      {
        "title": "Total Founder Privacy",
        "desc": "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail."
      },
      {
        "title": "Same-Day Document Uploads",
        "desc": "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7."
      },
      {
        "title": "Over Two Decades of Authority",
        "desc": "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs."
      },
      {
        "title": "Centralized Compliance Dashboard",
        "desc": "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal."
      },
      {
        "title": "Dedicated Specialist Support",
        "desc": "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Learn & Select State",
        "desc": "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
      },
      {
        "step": "02",
        "title": "Register via Registered Agents Inc",
        "desc": "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
      },
      {
        "step": "03",
        "title": "Obtain Documents & EIN",
        "desc": "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
      },
      {
        "step": "04",
        "title": "Stay 100% Compliant",
        "desc": "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
      }
    ],
    "faqs": [
      {
        "q": "What is a Registered Agent and why is it legally required?",
        "a": "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
      },
      {
        "q": "Can international founders (non-US residents) use this service?",
        "a": "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
      },
      {
        "q": "Are all US companies currently required to submit FinCEN BOI reports?",
        "a": "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
      },
      {
        "q": "Does using the Safi Academy referral link cost extra?",
        "a": "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
      },
      {
        "q": "How does Registered Agents Inc protect founder privacy?",
        "a": "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
      }
    ]
  }
};

export function getBusinessFormationTranslation(locale: string): BusinessFormationTranslation {
  const normalized = (locale || "en").toLowerCase();
  return businessFormationTranslations[normalized] || businessFormationTranslations.en;
}
