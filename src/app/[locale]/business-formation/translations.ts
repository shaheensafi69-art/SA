// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES BUSINESS FORMATION TRANSLATIONS (100% NATIVE)
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
  phaseLabel: string;
  disclaimerBottom: string;
  cardEntityStatus: string;
  cardShieldTitle: string;
  cardActiveBadge: string;
  cardAgentTitle: string;
  cardAgentSub: string;
  cardPrivacyTitle: string;
  cardPrivacySub: string;
  cardBoiTitle: string;
  cardBoiSub: string;
  cardMailTitle: string;
  cardMailSub: string;
  cardFootnote: string;
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
        "title": "True Founder Privacy by Default",
        "desc": "They allow clients to list their registered commercial address on public state filings whenever allowed by statute, protecting personal residences from public directories and marketers."
      },
      {
        "title": "Same-Day Document Processing",
        "desc": "Service of Process notices, court summons, and official tax correspondence are scanned and delivered electronically to your client account on the exact day they are served."
      },
      {
        "title": "Transparent & Predictable Pricing",
        "desc": "No bait-and-switch annual renewals or hidden surprise surcharges. Transparent annual registered agent rates and honest state filing expense schedules."
      },
      {
        "title": "State-of-the-Art Client Dashboard",
        "desc": "A consolidated corporate control center where you can manage multiple entities, view scanned mail, order corporate certificates, and track compliance calendars effortlessly."
      },
      {
        "title": "International Founders Welcome",
        "desc": "You do not need US citizenship or an SSN to establish an American business entity. Seamless onboarding and verification for entrepreneurs operating from across the globe."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Choose Entity Type & State",
        "desc": "Select between an LLC (popular for flexibility and pass-through taxation) or a C-Corporation (ideal for institutional venture funding). Popular states include Wyoming (privacy & low fees) and Delaware (corporate courts)."
      },
      {
        "step": "02",
        "title": "Appoint Registered Agents Inc",
        "desc": "Designate Registered Agents Inc as your official registered agent to establish physical legal standing and protect personal home address privacy on public secretary of state records."
      },
      {
        "step": "03",
        "title": "File Articles of Organization",
        "desc": "Registered Agents Inc prepares and submits your formation documents directly to state authorities, obtaining your certified formation certificate and corporate charter."
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
    ],
    "phaseLabel": "Phase",
    "disclaimerBottom": "* Registered Agents Inc is an independent service provider. Safi Academy is not a law firm and does not provide legal, tax, or official financial advice. For state filing options, please visit their official website.",
    "cardEntityStatus": "Entity Status",
    "cardShieldTitle": "US Corporate Shield",
    "cardActiveBadge": "Active",
    "cardAgentTitle": "Registered Agent",
    "cardAgentSub": "All 50 US States Covered",
    "cardPrivacyTitle": "Address Privacy",
    "cardPrivacySub": "Owner Data Shielded (Where Permitted by Law)",
    "cardBoiTitle": "FinCEN BOI Guidance",
    "cardBoiSub": "Federal Exemption & Rules Tracking",
    "cardMailTitle": "Digital Mailroom",
    "cardMailSub": "Same-Day Online Scans",
    "cardFootnote": "Recommended by Safi Academy for international & domestic founders."
  },
  "fa": {
    "isRtl": true,
    "partnerDisclosure": "افشای همکاری تجاری و رعایت مقررات رسمی:",
    "disclosureText": "آکادمی صافی دوره‌ها و منابع آموزشی مستقل را برای کارآفرینان ارائه می‌دهد. هنگامی که از طریق لینک‌های معرف ما در Registered Agents Inc ثبت‌نام یا خرید می‌کنید، ممکن است بدون هیچ هزینه اضافی برای شما، کمیسیون همکاری دریافت کنیم. ما تنها ارائه‌دهندگانی را پیشنهاد می‌کنیم که استانداردهای سخت‌گیرانه حفظ حریم خصوصی، قابلیت اطمینان و انطباق قانونی را برآورده سازند.",
    "heroBadge": "ارائه‌دهنده پیشنهادی خدمات ثبت شرکتی در ایالات متحده",
    "heroTitle1": "شرکت آمریکایی خود را",
    "heroTitle2": "ثبت و محافظت کنید",
    "heroDesc": "چه یک بنیان‌گذار بین‌المللی باشید که یک استارتاپ جهانی راه‌اندازی می‌کند، چه کارآفرینی که در حال ورود به بازار آمریکا است؛ زیرساخت شرکتی استاندارد حیاتی است. آکادمی صافی شرکت Registered Agents Inc را برای نمایندگی در ۵۰ ایالت، ثبت LLC و انطباق مستمر قانونی پیشنهاد می‌کند.",
    "ctaRegister": "ثبت شرکت در ایالات متحده",
    "ctaExploreCourses": "مشاهده دوره‌های تجاری و حقوقی",
    "servicesBadge": "خدمات سازمانی و شرکتی",
    "servicesTitle": "خدمات جامع حقوقی و اداری در تمام ۵۰ ایالت آمریکا",
    "servicesSub": "تمام آنچه برای ثبت قانونی، حفظ انطباق ایالتی و پاسداری کامل از حریم خصوصی مؤسسین نیاز دارید.",
    "whyBadge": "چرا این مجموعه را توصیه می‌کنیم",
    "whyTitle": "زیرساخت واقعی و پشتیبانی تخصصی بدون واسطه",
    "whySub": "دلیل اعتماد ده‌ها هزار کارآفرین و مؤسس به Registered Agents Inc به جای واسطه‌های تبلیغاتی.",
    "stepsBadge": "مراحل گام‌به‌گام",
    "stepsTitle": "نحوه ثبت و راه‌اندازی شرکت در آمریکا",
    "stepsSub": "نقشه راه آزمایش‌شده ما از انتخاب ایالت و ساختار شرکتی تا دریافت تأییدیه رسمی و فعال‌سازی قانونی.",
    "faqsBadge": "پرسش‌های متداول",
    "faqsTitle": "پاسخ‌های شفاف به سوالات حقوقی شما",
    "faqsSub": "توضیحات دقیق درباره وکیل ثبتی، مالکیت بین‌المللی اتباع خارجی و الزامات انطباق فدرال.",
    "ctaBottomTitle": "آماده راه‌اندازی کسب‌وکار خود در آمریکا هستید؟",
    "ctaBottomDesc": "هویت شرکتی معتبر خود را با دفاتر ثبتی بومی در هر یک از ۵۰ ایالت ایالات متحده پایه‌گذاری نمایید.",
    "ctaBottomBtn": "شروع ثبت با Registered Agents Inc",
    "services": [
      {
        "title": "وکیل و نماینده ثبتی در تمام ۵۰ ایالت",
        "desc": "طبق قوانین ایالات متحده، هر شرکت ثبت‌شده موظف است یک نماینده مقیم با آدرس فیزیکی معتبر در ایالت ثبت داشته باشد تا مکاتبات رسمی حقوقی را دریافت کند و از افشای نشانی منزل شخصی مؤسس در سوابق عمومی جلوگیری شود.",
        "badge": "الزام قانونی اصلی"
      },
      {
        "title": "ثبت انواع شرکت LLC و Corporation",
        "desc": "خدمات کامل نگارش اساسنامه و ثبت پرونده رسمی در تمامی ایالت‌ها (از جمله وایومینگ، دلاور و فلوریدا) با رعایت دقیق موازین حقوقی و دریافت گواهی تأسیس شرکتی معتبر.",
        "badge": "راه‌اندازی ساختار شرکتی"
      },
      {
        "title": "راهنمایی و پیگیری گزارش‌های FinCEN BOI",
        "desc": "بر اساس آخرین احکام قضایی دادگاه‌های فدرال و مقررات شبکه مقابله با جرایم مالی آمریکا (FinCEN)، در حال حاضر بسیاری از شرکت‌های داخلی از ارسال گزارش مالکیت ذی‌نفع (BOI) معاف هستند یا مهلت آن‌ها تعلیق شده است، در حالی که برخی شرکت‌های خارجی موظف به افشا می‌باشند. Registered Agents Inc قوانین را رصد کرده و در صورت نیاز قانونی به ثبت گزارش کمک می‌کند.",
        "badge": "انطباق با قوانین فدرال"
      },
      {
        "title": "ارائه گزارش‌های سالانه و حفظ اعتبار رسمی",
        "desc": "ایالت‌ها برای فعال نگه‌داشتن شرکت‌ها نیازمند گزارش‌های سالانه هستند. این مجموعه مهلت‌های تمدید را رصد کرده و با ارسال به‌موقع پرونده‌ها از جریمه یا تعلیق شرکت پیشگیری می‌نماید.",
        "badge": "پرونده‌های دوره‌ای ایالتی"
      },
      {
        "title": "اسکن دیجیتال آنی نامه‌ها در پنل اختصاصی",
        "desc": "کلیه مکاتبات قضایی، اخطاریه‌های حقوقی و مدارک رسمی دولتی در همان روز وصول اسکن شده و در داشبورد امن ابری شما قرار می‌گیرند تا از هر نقطه جهان به آن‌ها دسترسی داشته باشید.",
        "badge": "دسترسی فوری ابری"
      },
      {
        "title": "پکیج هویت تجاری و حریم خصوصی مؤسس",
        "desc": "زیرساخت کامل شامل شماره تلفن تجاری با پیش‌شماره اختصاصی ایالت، خدمات نشانی تجاری، دامنه‌ها و ارسال ایمیل برای تفکیک کامل هویت تجاری از حریم شخصی مؤسس.",
        "badge": "زیرساخت حریم خصوصی"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "دفاتر فیزیکی و پرسنل رسمی در ۵۰ ایالت",
        "desc": "برخلاف وب‌سایت‌های دلال که سفارش‌ها را برون‌سپاری می‌کنند، Registered Agents Inc در هر ۵۰ ایالت دارای دفتر فیزیکی و کادر رسمی مقیم است."
      },
      {
        "title": "پاسداری حداکثری از نشانی منزل و حریم شخصی",
        "desc": "در تمام پرونده‌های عمومی ثبتی که قانون ایالت اجازه دهد، نشانی دفتر تجاری آن‌ها درج می‌شود تا نشانی مسکونی شما از دسترسی عموم و بازاریاب‌ها در امان بماند."
      },
      {
        "title": "اسکن و بارگذاری اسناد در همان روز دریافت",
        "desc": "اوراق قضایی و ابلاغیه‌های دادگاهی به محض رسیدن، در همان روز کاری اسکن و با هشدارهای آنی پیامکی و ایمیلی به دست شما می‌رسد."
      },
      {
        "title": "تعرفه‌های شفاف بدون افزایش‌های پنهانی سالانه",
        "desc": "بدون قیمت‌های صوری و هزینه‌های غافلگیرکننده در سال‌های بعد؛ تعرفه سالانه نمایندگی ثبتی از ابتدا کاملاً شفاف و مشخص است."
      },
      {
        "title": "داشبورد سازمانی پیشرفته و یکپارچه",
        "desc": "مدیریت آسان چندین نهاد تجاری، دسترسی به بایگانی اسناد اسکن‌شده، سفارش گواهی‌های حسن اعتبار و تقویم انطباق حقوقی در یک کنترل پنل مدرن."
      },
      {
        "title": "پذیرش و همراهی کامل با مؤسسین بین‌المللی",
        "desc": "برای ثبت شرکت نیازی به شهروندی آمریکا یا داشتن شماره تأمین اجتماعی (SSN) ندارید؛ فرآیند تایید هویت برای متقاضیان سراسر دنیا هموار است."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "انتخاب ساختار شرکتی و ایالت مناسب",
        "desc": "تصمیم‌گیری بین ساختار منعطف LLC (مناسب کسب‌وکارهای آنلاین و بین‌المللی) یا C-Corporation (مناسب جذب سرمایه خطرپذیر). ایالت‌هایی نظیر وایومینگ و دلاور از محبوب‌ترین‌ها هستند."
      },
      {
        "step": "۰۲",
        "title": "تعیین Registered Agents Inc به عنوان وکیل ثبتی",
        "desc": "انتخاب این شرکت به عنوان نماینده مقیم شما جهت درج نشانی تجاری رسمی در مدارک ثبتی ایالت و محافظت از نشانی مسکونی شما."
      },
      {
        "step": "۰۳",
        "title": "ثبت رسمی اساسنامه در دبیرخانه ایالت",
        "desc": "نگارش و ارسال اوراق ثبت شرکت (Articles of Organization) توسط متخصصین و دریافت سند نهایی تأسیس رسمی از دولت ایالتی."
      },
      {
        "step": "۰۴",
        "title": "حفظ دائم انطباق قانونی و بهره‌برداری",
        "desc": "دریافت اسکن مکاتبات دولتی، ثبت گزارش‌های سالانه در موعد مقرر، و پایش وضعیت معافیت‌ها یا الزامات گزارش‌دهی مالکیت ذی‌نفع FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "نماینده ثبتی (Registered Agent) چیست و چرا داشتن آن الزامی است؟",
        "a": "نماینده ثبتی شخص حقیقی یا حقوقی دارای مجوز است که مسئولیت قانونی دریافت اوراق قضایی و مکاتبات رسمی ایالتی را به نیابت از شرکت شما بر عهده دارد. طبق قانون تمامی ایالت‌های آمریکا، هر شرکت تجاری باید نماینده مقیم رسمی با نشانی فیزیکی در همان ایالت داشته باشد."
      },
      {
        "q": "آیا متقاضیان غیرآمریکایی و خارج از کشور می‌توانند شرکت ثبت کنند؟",
        "a": "بله؛ هیچ محدودیتی بر اساس ملیت یا محل اقامت وجود ندارد. اشخاص غیر مقیم می‌توانند مالکیت ۱۰۰٪ یک شرکت آمریکایی (مانند LLC) را در اختیار داشته باشند و از طریق پنل دیجیتال اسناد و مکاتبات خود را مدیریت نمایند."
      },
      {
        "q": "آیا در حال حاضر ارسال گزارش FinCEN BOI برای تمام شرکت‌ها اجباری است؟",
        "a": "خیر؛ بر اساس آرای قضایی جاری دادگاه‌های فدرال ایالات متحده و به‌روزرسانی‌های سازمان FinCEN، بسیاری از شرکت‌های ثبت‌شده داخلی در حال حاضر مشمول معافیت یا توقف اجرای ضرب‌الاجل‌ها هستند، اما برخی نهادهای خارجی مشمول الزام گزارش‌دهی می‌باشند. Registered Agents Inc این تغییرات را به دقت پایش نموده و در صورت الزام قانونی پرونده را تنظیم می‌کند."
      },
      {
        "q": "آیا استفاده از لینک معرفی آکادمی صافی هزینه اضافی برای من دارد؟",
        "a": "خیر؛ هزینه‌ها کاملاً یکسان بوده و در مواردی شامل تخفیف‌های ویژه نیز می‌گردد. در صورت ثبت‌نام از طریق لینک ما، آکادمی صافی ممکن است کمیسیون همکاری دریافت کند که صرف توسعه دوره‌های آموزشی رایگان می‌شود."
      },
      {
        "q": "چگونه Registered Agents Inc از حریم خصوصی مؤسسان محافظت می‌کند؟",
        "a": "در مدارک و سوابق عمومی که در سایت رسمی ایالت منتشر می‌شود، نشانی فیزیکی تجاری این شرکت به عنوان آدرس ثبتی درج می‌گردد تا نشانی منزل مؤسس فاش نشود. همچنین این مجموعه متعهد به عدم فروش داده‌های مشتریان به اشخاص ثالث است."
      }
    ],
    "phaseLabel": "مرحله",
    "disclaimerBottom": "* مجموعه Registered Agents Inc ارائه‌دهنده خدمات مستقل است. آکادمی صافی دفتر حقوقی نبوده و مشاوره رسمی مالی، مالیاتی یا حقوقی ارائه نمی‌دهد. برای جزئیات ثبت به وب‌سایت رسمی مراجعه کنید.",
    "cardEntityStatus": "وضعیت نهاد حقوقی",
    "cardShieldTitle": "سپر شرکتی ایالات متحده",
    "cardActiveBadge": "فعال",
    "cardAgentTitle": "وکیل و نماینده مقیم ثبتی",
    "cardAgentSub": "پوشش کامل تمام ۵۰ ایالت آمریکا",
    "cardPrivacyTitle": "حفظ حریم خصوصی نشانی",
    "cardPrivacySub": "عدم انتشار نشانی شخصی (مطابق قانون ایالت)",
    "cardBoiTitle": "راهنمای فدرال FinCEN BOI",
    "cardBoiSub": "پایش معافیت‌ها و قوانین گزارش‌دهی",
    "cardMailTitle": "اتاق پست دیجیتال ابری",
    "cardMailSub": "اسکن نامه‌ها در همان روز کاری",
    "cardFootnote": "پیشنهادشده توسط آکادمی صافی برای کارآفرینان داخلی و بین‌المللی."
  },
  "ps": {
    "isRtl": true,
    "partnerDisclosure": "د سوداګریز شراکت او قانوني مقرراتو د مراعات څرګندونه:",
    "disclosureText": "د صافي اکاډمۍ د متشبثینو او سوداګرو لپاره خپلواک ښوونیز کورسونه او سرچینې وړاندې کوي. کله چې تاسو زموږ د لینکونو له لارې په Registered Agents Inc کې نوم لیکنه یا خدمتونه پیرئ، موږ ممکن پرته له کوم اضافي لګښت څخه کمیسیون ترلاسه کړو. موږ یوازې هغه باوري مراجع وړاندیز کوو چې د کاروونکو د معلوماتو محرمیت، ملي باور او رسمي قانوني معیارونه پوره کوي.",
    "heroBadge": "په متحده ایالاتو کې د شرکتونو د ثبت وړاندیز شوی باوري خدمت",
    "heroTitle1": "خپل امریکایي شرکت",
    "heroTitle2": "ثبت او خوندي کړئ",
    "heroDesc": "که تاسو یو نړیوال متشبث یاست چې نوی نړیوال سټارټ اپ جوړوئ، یا د متحده ایالاتو لوی بازار ته ننوځئ؛ سم او قانوني کارپوریټ بنسټ حیاتي دی. صافي اکاډمي په ټولو ۵۰ ایالتونو کې د باوري استازي، د LLC شرکتونو راجستر کولو او دوامداره قانوني ډاډ لپاره Registered Agents Inc وړاندیز کوي.",
    "ctaRegister": "خپل امریکایی شرکت راجستر کړئ",
    "ctaExploreCourses": "د سوداګرۍ او حقوقي کورسونو لیدل",
    "servicesBadge": "کارپوریټ او شرکتی خدمات",
    "servicesTitle": "د امریکا په ټولو ۵۰ ایالتونو کې هر اړخیز خدمات",
    "servicesSub": "هر هغه څه چې تاسو ورته د قانوني ثبت، د ایالتي مقرراتو د ساتنې او د بنسټ ایښودونکو د محرمیت لپاره اړتیا لرئ.",
    "whyBadge": "ولې موږ دا اداره وړاندیز کوو",
    "whyTitle": "مستقیم فزیکي دفترونه او مسلکي ملاتړ",
    "whySub": "هغه دلیل چې ولې په زرګونو متشبثین د منځګړو او تبلیغاتي سایټونو پر ځای په Registered Agents Inc باور کوي.",
    "stepsBadge": "ګام په ګام لارښود",
    "stepsTitle": "په امریکا کې د خپل شرکت د جوړولو لارښود",
    "stepsSub": "زموږ ازمول شوې نقشه د ایالت او شرکت بڼې له غوره کولو څخه نیولې تر بشپړ رسمي تصدیق پورې تعقیب کړئ.",
    "faqsBadge": "پرله پسې پوښتنې",
    "faqsTitle": "ستاسو حقوقي او قانوني پوښتنو ته روښانه ځوابونه",
    "faqsSub": "د راجستر شوي استازي، د بهرنیانو د ملکیت او فدرالي مقرراتو په اړه باوري معلومات.",
    "ctaBottomTitle": "ایا چمتو یاست چې په امریکا کې خپله سوداګري پیل کړئ؟",
    "ctaBottomDesc": "په متحده ایالاتو کې د محلي راجستر شویو دفترونو له لارې خپل نړیوال سوداګریز حضور پیل کړئ.",
    "ctaBottomBtn": "له Registered Agents Inc سره نوم لیکنه",
    "services": [
      {
        "title": "په ټولو ۵۰ ایالتونو کې راجستر شوی استازی",
        "desc": "د متحده ایالاتو د قوانینو له مخې، هر راجستر شوی شرکت باید په خپل ایالت کې یو استازی او فزیکي پته ولري ترڅو رسمي محکمې او دولتي اسناد ترلاسه کړي او د شخصي کور پتې د افشا کیدو مخه ونیسي.",
        "badge": "اصلي قانوني اړتیا"
      },
      {
        "title": "د LLC او کارپوریشن شرکتونو رسمي ثبت",
        "desc": "د وایومینګ، ډیلاویر او فلوریډا په شمول په ټولو ایالتونو کې د شرکتونو او اساسنامو رسمي جوړول د ایالتي قوانینو سره سم.",
        "badge": "د شرکت جوړول"
      },
      {
        "title": "د FinCEN BOI راپور ورکولو لارښوونې",
        "desc": "د فدرالي محکمو د وروستیو پریکړو او د مالي جرمونو د څارنې شبکې (FinCEN) د مقرراتو له مخې، دا مهال ډیری کورني شرکتونه له راپور ورکولو څخه معاف دي یا مهلت ځنډول شوی، خو ځینې بهرني شرکتونه مکلف دي. دا اداره بدلونونه څاري او په قانوني توګه ملاتړ کوي.",
        "badge": "فدرالي قانوني اطاعت"
      },
      {
        "title": "کلني راپورونه او د ښه اعتبار ساتنه",
        "desc": "ایالتونه د شرکتونو د فعال ساتلو لپاره کلني راپورونه غواړي. دا مجموعه د تمدید نیټې څاري او په خپل وخت د راپورونو په لیږلو سره د جریمې مخه نیسي.",
        "badge": "ایالتي راپورونه"
      },
      {
        "title": "په ډیجیټل پورټل کې د لیکونو فوري سکین",
        "desc": "ټول رسمي او قضایي اسناد او دولتي لیکونه په هماغه ورځ سکین کیږي او ستاسو خوندي آنلاین ډشبورډ ته پورته کیږي ترڅو له هر ځای څخه ورته لاسرسی ولرئ.",
        "badge": "سملاسي لاسرسی"
      },
      {
        "title": "د سوداګریز هویت او محرمیت کڅوړه",
        "desc": "د سوداګرۍ بشپړ زیربنا لکه د سیمه ایز کوډ سره کاري تلیفون، رسمي ډومین، د بریښنالیک لیږدول او د سوداګریزې پتې کارول.",
        "badge": "د محرمیت زیربنا"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "په ټولو ۵۰ ایالتونو کې فزیکي دفترونه او کارکوونکي",
        "desc": "د هغو سایټونو برعکس چې کار نورو ته سپاري، Registered Agents Inc په هر ایالت کې خپل رسمي فزیکي دفترونه او مسلکي کارکوونکي لري."
      },
      {
        "title": "د شخصي پتې او حریم بشپړ ساتنه",
        "desc": "په رسمي عامه اسنادو کې د دوی سوداګریزه پته لیکل کیږي ترڅو ستاسو د استوګنې شخصي پته له عامه لید او بازار موندونکو څخه پټه پاتې شي."
      },
      {
        "title": "په هماغه ورځ د رسمي اسنادو رسول",
        "desc": "قضایي او حقوقي پاڼې کله چې ورسیږي، په همغه کاري ورځ سکین کیږي او تاسو ته په بریښنالیک خبر درکول کیږي."
      },
      {
        "title": "روڼ او له پټو لګښتونو پرته قیمتونه",
        "desc": "هیڅ غیر متوقع کلني لګښتونه شتون نلري؛ کلنۍ بیې له پیل څخه په بشپړه توګه روښانه او عادلانه دي."
      },
      {
        "title": "پرمختللی او اسانه مدیریت ډشبورډ",
        "desc": "د ډیرو شرکتونو یوځای اداره کول، سکین شویو اسنادو ته لاسرسی، او د انطباق د نیټو تقویم په یوه پرمختللي ډشبورډ کې."
      },
      {
        "title": "د نړیوالو متشبثینو بشپړ هرکلی",
        "desc": "د امریکایي شرکت د خلاصولو لپاره امریکایي تابعیت یا SSN ته اړتیا نشته؛ د ټولې نړۍ متشبثین په اسانۍ سره منل کیږي."
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "د شرکت ډول او ایالت غوره کړئ",
        "desc": "د LLC یا C-Corporation ترمنځ انتخاب کړئ. ایالتونه لکه وایومینګ (د محرمیت او ټیټ لګښت لپاره) او ډیلاویر خورا مشهور دي."
      },
      {
        "step": "۰۲",
        "title": "Registered Agents Inc وټاکئ",
        "desc": "دا شرکت د خپل رسمي راجستر شوي استازي په توګه وټاکئ ترڅو په ایالتي ریکارډونو کې ستاسو شخصي پته خوندي شي."
      },
      {
        "step": "۰۳",
        "title": "د شرکت اساسنامه ثبت کړئ",
        "desc": "متخصصین د ثبت رسمي پاڼې چمتو کوي او د ایالت سکرتریت ته یې استوي ترڅو د شرکت رسمي سند صادر شي."
      },
      {
        "step": "۰۴",
        "title": "په دوامداره توګه قانوني پاتې شئ",
        "desc": "د لیکونو ډیجیټل سکینونه ترلاسه کړئ، کلني راپورونه پر وخت ثبت کړئ، او د FinCEN مقررات وڅارئ."
      }
    ],
    "faqs": [
      {
        "q": "راجستر شوی استازی څه شی دی او ولې اړین دی؟",
        "a": "راجستر شوی استازی یو رسمي کس یا شرکت دی چې ستاسو د شرکت په استازیتوب رسمي او قضایي پاڼې ترلاسه کوي. د امریکا په ټولو ایالتونو کې د هر شرکت لپاره دا قانوني مکلفیت دی."
      },
      {
        "q": "ایا بهرني اتباع کولی شي امریکایي شرکت ثبت کړي؟",
        "a": "هو، ټول بهرني اتباع کولی شي د امریکا د یو شرکت (لکه LLC) سل په سلو کې مالکین وي او له هر هیواد څخه خپل کارونه پرمخ یوسي."
      },
      {
        "q": "ایا دا مهال د FinCEN BOI راپور د ټولو شرکتونو لپاره لازمي دی؟",
        "a": "نه، د محکمو د پریکړو له مخې دا مهال ډیری کورني شرکتونه معاف دي یا مهلت ځنډول شوی، خو ځینې بهرني شرکتونه مکلف دي. دا شرکت حالت څاري او په ثبت کې مرسته کوي."
      },
      {
        "q": "ایا د صافي اکاډمۍ لینک کارول اضافي لګښت لري؟",
        "a": "نه، بیه کاملاً برابره ده او هیڅ اضافي فیس نشته. موږ ممکن د معرفۍ یو کمیسیون ترلاسه کړو چې د وړیا زده کړو په پراختیا کې لګول کیږي."
      },
      {
        "q": "دا شرکت څنګه د بنسټ ایښودونکي د محرمیت ساتنه کوي؟",
        "a": "په دولتي رسمي ویب پاڼو کې ستاسو د کور د پتې پر ځای د دې شرکت تجارتي پته کارول کیږي، او ستاسو معلومات هیڅکله پر دریمګړو نه پلورل کیږي."
      }
    ],
    "phaseLabel": "مرحله",
    "disclaimerBottom": "* د Registered Agents Inc اداره د خپلواکو خدماتو وړاندې کوونکې ده. صافي اکاډمي حقوقي دفتر نه دی او مالي یا مالیاتي مشورې نه ورکوي. د ثبت معلوماتو لپاره د دوی رسمي وېبپاڼه وګورئ.",
    "cardEntityStatus": "د شرکت رسمي حالت",
    "cardShieldTitle": "د متحده ایالاتو شرکتي ډال",
    "cardActiveBadge": "فعال",
    "cardAgentTitle": "راجستر شوی باوري استازی",
    "cardAgentSub": "د امریکا په ټولو ۵۰ ایالتونو کې بشپړ پوښښ",
    "cardPrivacyTitle": "د پتې بشپړ محرمیت",
    "cardPrivacySub": "د شخصي پتې نه خپرېدل (د قانون له مخې)",
    "cardBoiTitle": "د FinCEN BOI فدرالي لارښود",
    "cardBoiSub": "د معافیتونو او قوانینو دوامداره څارنه",
    "cardMailTitle": "ډیجیټل کلاوډ پوستخونه",
    "cardMailSub": "په هماغه کاري ورځ د لیکونو سکین",
    "cardFootnote": "د نړیوالو او کورنیو متشبثینو لپاره د صافي اکاډمۍ وړاندیز."
  },
  "ar": {
    "isRtl": true,
    "partnerDisclosure": "إفصاح الشراكة والامتثال التنظيمي الرسمي:",
    "disclosureText": "تقدم أكاديمية صافي دورات وموارد تعليمية مستقلة لرواد الأعمال. عند التسجيل أو شراء الخدمات من خلال روابط الإحالة الخاصة بنا إلى Registered Agents Inc، قد نتلقى عمولة تسويقية دون أي تكلفة إضافية عليك. نحن نوصي فقط بمزودي الخدمات المعتمدين الذين يستوفون معاييرنا الصارمة لخصوصية البيانات والموثوقية العالية والامتثال القانوني.",
    "heroBadge": "المزود المعتمد الموصى به لخدمات تأسيس الشركات في الولايات المتحدة",
    "heroTitle1": "تأسيس وحماية شركتك في",
    "heroTitle2": "الولايات المتحدة الأمريكية",
    "heroDesc": "سواء كنت مؤسسًا دوليًا يطلق شركة ناشئة عالمية أو رائد أعمال يتوسع في السوق الأمريكية، فإن التأسيس المؤسسي السليم أمر بالغ الأهمية. توصي أكاديمية صافي بشركة Registered Agents Inc للتمثيل القانوني للوكيل المسجل في كافة الولايات الخمسين، وتأسيس شركات LLC والشركات المساهمة، والامتثال المستمر.",
    "ctaRegister": "سجّل شركتك الأمريكية الآن",
    "ctaExploreCourses": "استكشف دورات ريادة الأعمال",
    "servicesBadge": "خدمات الشركات والمؤسسات",
    "servicesTitle": "خدمات أعمال شاملة في جميع الولايات الأمريكية الخمسين",
    "servicesSub": "كل ما تحتاجه للتأسيس القانوني السليم، والحفاظ على الامتثال التنظيمي، وحماية خصوصية المؤسسين.",
    "whyBadge": "لماذا نوصي بهذا الشريك",
    "whyTitle": "بنية تحتية حقيقية ودعم متخصص ومباشر",
    "whySub": "السبب وراء ثقة عشرات الآلاف من رواد الأعمال بشركة Registered Agents Inc مقارنة بالوسطاء الترويجيين.",
    "stepsBadge": "خطوة بخطوة",
    "stepsTitle": "كيفية تأسيس وإطلاق شركتك الأمريكية",
    "stepsSub": "اتبع خارطة الطريق المعتمدة لدينا بدءًا من اختيار الولاية ونوع الشركة وحتى التسجيل الرسمي النهائي.",
    "faqsBadge": "الأسئلة الشائعة",
    "faqsTitle": "إجابات واضحة ودقيقة على استفساراتك القانونية",
    "faqsSub": "معلومات تفصيلية حول الوكيل المسجل، والملكية الدولية للأجانب، ومتطلبات الامتثال الفيدرالي.",
    "ctaBottomTitle": "هل أنت مستعد لتأسيس أعمالك في الولايات المتحدة؟",
    "ctaBottomDesc": "أنشئ كيانك التجاري المعتمد بمكاتب مسجلة محليًا في أي من الولايات الأمريكية الخمسين.",
    "ctaBottomBtn": "ابدأ التأسيس مع Registered Agents Inc",
    "services": [
      {
        "title": "وكيل مسجل في كافة الولايات الخمسين",
        "desc": "يُلزم قانون الولايات المتحدة كل شركة بوجود وكيل معتمد بعنوان شارع حقيقي في ولاية التأسيس لاستلام الإخطارات القانونية والمراسلات الرسمية ومنع نشر عنوان منزلك في السجلات العامة.",
        "badge": "متطلب قانوني إلزامي"
      },
      {
        "title": "تأسيس شركات LLC والشركات المساهمة",
        "desc": "خدمات تأسيس متكاملة وصياغة لوائح التأسيس في جميع الولايات (بما في ذلك وايومنغ، ديلاوير، وفلوريدا) وفقًا لأعلى معايير الالتزام التنظيمي.",
        "badge": "تأسيس الكيان التجاري"
      },
      {
        "title": "إرشادات وتقارير FinCEN BOI الفيدرالية",
        "desc": "بناءً على أحكام المحاكم الفيدرالية وقرارات شبكة مكافحة الجرائم المالية (FinCEN)، تُعفى العديد من الشركات المحلية حاليًا أو تم تجميد مواعيد تقديم تقارير المالك المستفيد (BOI)، بينما تخضع بعض الكيانات الأجنبية للإفصاح. تتابع الشركة التطورات وتقدم المساعدة عند اللزوم القانوني.",
        "badge": "الامتثال الفيدرالي"
      },
      {
        "title": "التقارير السنوية والحفاظ على السجل النشط",
        "desc": "تتطلب الولايات تقديم تقارير سنوية دورية لإبقاء الشركة نشطة. تقوم الشركة بتتبع مواعيد التجديد وتجهيز الملفات لمنع الغرامات أو تعليق التراخيص.",
        "badge": "الملفات الدورية للولاية"
      },
      {
        "title": "مسح رقمي فوري للبريد في لوحة تحكم آمنة",
        "desc": "يتم مسح الإخطارات القضائية والأوراق الحكومية الرسمية ضوئيًا في نفس يوم وصولها ورفعها مباشرة إلى حسابك السحابي لتصل إليها من أي مكان في العالم.",
        "badge": "وصول فوري سحابي"
      },
      {
        "title": "باقة الهوية التجارية وحماية الخصوصية",
        "desc": "بنية تحتية احترافية تشمل خط هاتف تجاري برمز محلي، عنوان تجاري معتمد، نطاقات، وإعادة توجيه البريد لحماية هويتك الشخصية.",
        "badge": "بنية الخصوصية"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "مكاتب فعلية وموظفون دائمون في 50 ولاية",
        "desc": "على عكس المنصات التي تعتمد على وسطاء خارجيين، تمتلك Registered Agents Inc مكاتب حقيقية وفرق عمل مقيمة في كل ولاية أمريكية."
      },
      {
        "title": "حماية مطلقة لعنوان المنزل والبيانات الشخصية",
        "desc": "يتم تسجيل عنوان مكتبهم التجاري في الأوراق العامة للولاية قدر ما يسمح به القانون، مما يحمي مقر إقامتك الخاص من العلن والتسويق التجاري."
      },
      {
        "title": "معالجة وإرسال الوثائق في نفس اليوم",
        "desc": "تتم معالجة الإخطارات القضائية والمراسلات الضريبية الرسمية ورفعها إلى حسابك في نفس اليوم مع تنبيهات عبر البريد والرسائل القصيرة."
      },
      {
        "title": "أسعار واضحة دون أي رسوم سنوية مفاجئة",
        "desc": "لا توجد أسعار وهمية أو مفاجآت عند التجديد السنوي؛ التكاليف واضحة ومعلنة من اليوم الأول بشفافية ونزاهة تامة."
      },
      {
        "title": "لوحة تحكم حديثة وشاملة للشركات",
        "desc": "مركز موحد لإدارة عدة شركات تجارية، مراجعة البريد الممسوح، طلب شهادات حسن السيرة، ومتابعة تقويم الالتزام بسهولة."
      },
      {
        "title": "ترحيب كامل بالمؤسسين الدوليين غير المقيمين",
        "desc": "لا يُشترط الحصول على الجنسية الأمريكية أو رقم الضمان الاجتماعي (SSN) لتأسيس شركتك؛ إجراءات سلسة للمستثمرين حول العالم."
      }
    ],
    "formationSteps": [
      {
        "step": "٠١",
        "title": "اختر نوع الشركة والولاية المناسبة",
        "desc": "اختر بين شركة ذات مسؤولية محدودة (LLC) لمرونتها، أو شركة مساهمة (C-Corp) لجذب الاستثمارات. تشمل الولايات الأكثر تفضيلاً وايومنغ وديلاوير."
      },
      {
        "step": "٠٢",
        "title": "تعيين Registered Agents Inc كوكيل رسمي",
        "desc": "اختر الشركة لتكون ممثلك القانوني المعتمد لحماية عنوانك السكني وضمان استقبال المراسلات القضائية بأمان."
      },
      {
        "step": "٠٣",
        "title": "إيداع وثائق التأسيس في الولاية",
        "desc": "يقوم المتخصصون بإعداد وتقديم لوائح التأسيس (Articles of Organization) إلى سكرتارية الولاية واستلام الميثاق الرسمي للشركة."
      },
      {
        "step": "٠٤",
        "title": "الحفاظ على الامتثال القانوني الكامل",
        "desc": "تلقي المراسلات الحكومية، تقديم التقارير السنوية في المواعيد، ومتابعة أي متطلبات خاصة بتقارير FinCEN BOI."
      }
    ],
    "faqs": [
      {
        "q": "ما هو الوكيل المسجل ولماذا يُعد إلزاميًا بموجب القانون؟",
        "a": "الوكيل المسجل هو كيان أو فرد مرخص قانونيًا لتلقي الإخطارات القضائية والمراسلات الحكومية الرسمية بالنيابة عن شركتك. تفرض قوانين الولايات الأمريكية وجود وكيل مسجل بعنوان حقيقي داخل الولاية لكل شركة."
      },
      {
        "q": "هل يمكن لرواد الأعمال الدوليين (غير المقيمين) تأسيس شركة؟",
        "a": "نعم؛ يحق لغير المقيمين في الولايات المتحدة امتلاك وإدارة شركة أمريكية (مثل LLC) بنسبة 100% وإدارتها عبر الإنترنت بالكامل من أي مكان بالعالم."
      },
      {
        "q": "هل تقديم تقرير FinCEN BOI إلزامي حاليًا لجميع الشركات؟",
        "a": "لا؛ بموجب قرارات المحاكم الفيدرالية وتحديثات FinCEN، فإن العديد من الكيانات المحلية معفاة حاليًا أو تم تعليق المواعيد النهائية، مع بقاء بعض الشركات الأجنبية ملزمة. تتابع الشركة القوانين وتوفر حلول الامتثال عند اللزوم."
      },
      {
        "q": "هل استخدام رابط أكاديمية صافي يكلفني أي رسوم إضافية؟",
        "a": "كلا، الأسعار مطابقة تمامًا للأسعار الأصلية وربما تشمل خصومات ترويجية. قد تتلقى أكاديمية صافي عمولة تسويقية تساعدنا على تقديم موارد تعليمية مجانية للطلاب."
      },
      {
        "q": "كيف تحافظ شركة Registered Agents Inc على خصوصية المؤسس؟",
        "a": "تتيح لك الشركة إدراج عنوان مكتبها التجاري في السجلات العامة المتاحة للمواطنين بدلًا من منزلك الشخصي، كما تلتزم بسياسة صارمة بعدم بيع بيانات العملاء لأي جهة."
      }
    ],
    "phaseLabel": "المرحلة",
    "disclaimerBottom": "* تعد Registered Agents Inc جهة مستقلة لتقديم الخدمات. أكاديمية صافي ليست مكتب محاماة ولا تقدم استشارات ضريبية أو قانونية رسمية. للاطلاع على شروط التسجيل يرجى زيارة موقعهم الرسمي.",
    "cardEntityStatus": "حالة الكيان المؤسسي",
    "cardShieldTitle": "الدرع المؤسسي الأمريكي",
    "cardActiveBadge": "نشط",
    "cardAgentTitle": "وكيل مقيم معتمد",
    "cardAgentSub": "تغطية شاملة لكافة الولايات الـ 50",
    "cardPrivacyTitle": "خصوصية العنوان السكني",
    "cardPrivacySub": "حماية العنوان الشخصي (حسب ما يسمح به القانون)",
    "cardBoiTitle": "توجيهات FinCEN BOI الفيدرالية",
    "cardBoiSub": "متابعة الإعفاءات وقواعد الإفصاح",
    "cardMailTitle": "غرفة البريد الرقمية السحابية",
    "cardMailSub": "مسح ضوئي فوري في نفس اليوم",
    "cardFootnote": "موصى به من أكاديمية صافي لرواد الأعمال الدوليين والمحليين."
  },
  "ur": {
    "isRtl": true,
    "partnerDisclosure": "شراکت داری اور ریگولیٹری تعمیل کا باضابطہ اعلان:",
    "disclosureText": "صافی اکیڈمی کاروباری افراد کے لیے آزادانہ تعلیمی کورسز اور وسائل فراہم کرتی ہے۔ جب آپ Registered Agents Inc کے ریفرل لنکس کے ذریعے رجسٹریشن یا سروسز خریدتے ہیں، تو ہمیں آپ پر بغیر کسی اضافی لاگت کے الحاقی کمیشن مل سکتا ہے۔ ہم صرف ان قائم کردہ اداروں کی سفارش کرتے ہیں جو ڈیٹا پرائیویسی اور قانونی تعمیل کے اعلیٰ معیار پر پورا اترتے ہیں۔",
    "heroBadge": "امریکہ میں کمپنی رجسٹریشن کے لیے تجویز کردہ باضابطہ ادارہ",
    "heroTitle1": "اپنی امریکی کمپنی کو",
    "heroTitle2": "رجسٹر اور محفوظ بنائیں",
    "heroDesc": "چاہے آپ بین الاقوامی بانی ہوں جو عالمی اسٹارٹ اپ کا آغاز کر رہے ہیں، یا امریکی مارکیٹ میں داخل ہونے والے کاروباری شخص؛ مستند کارپوریٹ بنیاد بے حد ضروری ہے۔ صافی اکیڈمی تمام 50 ریاستوں میں رجسٹرڈ ایجنٹ کی نمائندگی، LLC کمپنی کی تشکیل، اور مستقل قانونی تعمیل کے لیے Registered Agents Inc کی سفارش کرتی ہے۔",
    "ctaRegister": "اپنی امریکی کمپنی رجسٹر کریں",
    "ctaExploreCourses": "کاروباری کورسز دریافت کریں",
    "servicesBadge": "کارپوریٹ اور بزنس سروسز",
    "servicesTitle": "تمام 50 امریکی ریاستوں میں جامع کاروباری خدمات",
    "servicesSub": "قانونی رجسٹریشن، ریاستی ضوابط کی تکمیل، اور بانیوں کی پرائیویسی کے تحفظ کے لیے درکار تمام ضروری سہولیات۔",
    "whyBadge": "ہم اس ادارے کو کیوں تجویز کرتے ہیں",
    "whyTitle": "براہ راست فزیکل دفاتر اور ماہرانہ معاونت",
    "whySub": "ہزاروں کاروباری افراد تیسرے فریق کے پورٹلز کے بجائے Registered Agents Inc پر کیوں اعتماد کرتے ہیں۔",
    "stepsBadge": "مرحلہ وار رہنمائی",
    "stepsTitle": "امریکہ میں اپنی کمپنی قائم کرنے کا طریقہ",
    "stepsSub": "ریاست اور کمپنی کی ساخت کے انتخاب سے لے کر حتمی سرکاری منظوری تک ہمارے آزمودہ روڈ میپ پر عمل کریں۔",
    "faqsBadge": "عام سوالات",
    "faqsTitle": "قانونی اور انتظامی امور کے بارے میں واضح جوابات",
    "faqsSub": "رجسٹرڈ ایجنٹ، بین الاقوامی ملکیت اور فیڈرل تعمیل کے بارے میں تفصیلی اور مستند وضاحتیں۔",
    "ctaBottomTitle": "کیا آپ امریکہ میں اپنا کاروبار شروع کرنے کے لیے تیار ہیں؟",
    "ctaBottomDesc": "تمام 50 امریکی ریاستوں میں مقامی رجسٹرڈ دفاتر کے ذریعے اپنی باوقار تجارتی شناخت قائم کریں۔",
    "ctaBottomBtn": "Registered Agents Inc کے ساتھ آغاز کریں",
    "services": [
      {
        "title": "تمام 50 ریاستوں میں باضابطہ رجسٹرڈ ایجنٹ",
        "desc": "امریکی قانون کے تحت ہر کمپنی کے لیے ضروری ہے کہ اس کے پاس ریاست میں ایک رجسٹرڈ ایجنٹ اور فزیکل پتہ ہو تاکہ قانونی نوٹسز اور سرکاری خطوط موصول کیے جا سکیں اور آپ کا ذاتی رہائشی پتہ پبلک ریکارڈز سے محفوظ رہے۔",
        "badge": "بنیادی قانونی تقاضا"
      },
      {
        "title": "LLC اور کارپوریشن کمپنیوں کی مکمل تشکیل",
        "desc": "وایومنگ، ڈیلاویئر اور فلوریڈا سمیت تمام امریکی ریاستوں میں کمپنی کے آئین اور سرکاری دستاویزات کی باضابطہ تیاری اور قانونی رجسٹریشن۔",
        "badge": "کمپنی کا قیام"
      },
      {
        "title": "FinCEN BOI رہنمائی اور فیڈرل اپ ڈیٹس",
        "desc": "فیڈرل عدالتی احکامات اور فنانشل کرائمز انفورسمنٹ نیٹ ورک (FinCEN) کے قواعد کے تحت، اس وقت بہت سی ملکی کمپنیوں کو فائدہ مند ملکیت کی رپورٹنگ (BOI) سے استثنیٰ حاصل ہے یا ڈیڈ لائنز موخر ہیں، جبکہ کچھ غیر ملکی کمپنیاں اس کی پابند ہیں۔ یہ ادارہ قواعد پر نظر رکھتا ہے اور ضرورت کے مطابق مدد فراہم کرتا ہے۔",
        "badge": "فیڈرل قانونی تعمیل"
      },
      {
        "title": "سالانہ رپورٹس اور قانونی حیثیت کی تجدید",
        "desc": "ریاستیں کمپنیوں کو فعال رکھنے کے لیے سالانہ رپورٹس کا تقاضا کرتی ہیں۔ یہ ادارہ تجدید کی آخری تاریخوں کا خیال رکھتا ہے اور جرمانوں سے بچاؤ کے لیے بروقت دستاویزات جمع کرواتا ہے۔",
        "badge": "ریاستی رپورٹس"
      },
      {
        "title": "سرکاری خطوط کی فوری ڈیجیٹل اسکیننگ",
        "desc": "قانونی نوٹسز اور سرکاری دستاویزات موصول ہونے والے ہی دن اسکین کر کے آپ کے محفوظ کلاؤڈ ڈیش بورڈ پر اپ لوڈ کر دی جاتی ہیں تاکہ آپ دنیا کے کسی بھی حصے سے انہیں دیکھ سکیں۔",
        "badge": "فوری آن لائن رسائی"
      },
      {
        "title": "بزنس شناخت اور پرائیویسی سوٹ",
        "desc": "مکمل تجارتی انفراسٹرکچر بشمول لوکل ایریا کوڈ والا فون نمبر، ڈومین، ای میل فارورڈنگ اور کمرشل بزنس ایڈریس کا محفوظ استعمال۔",
        "badge": "پرائیویسی انفراسٹرکچر"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "تمام 50 ریاستوں میں فزیکل دفاتر اور عملہ",
        "desc": "ایسی کمپنیوں کے برعکس جو کام دوسرے ایجنٹوں کو سونپتی ہیں، Registered Agents Inc کے پاس ہر امریکی ریاست میں باضابطہ دفاتر اور مقامی ٹیمیں موجود ہیں۔"
      },
      {
        "title": "رہائشی پتے اور ذاتی معلومات کا مکمل تحفظ",
        "desc": "ریاستی قوانین کے مطابق پبلک ریکارڈز میں ان کا کمرشل پتہ درج کیا جاتا ہے تاکہ آپ کا ذاتی گھر کا پتہ مارکیٹرز اور پبلک ڈائریکٹریز سے محفوظ رہے۔"
      },
      {
        "title": "اسی دن دستاویزات کی پروسیسنگ اور اسکیننگ",
        "desc": "عدالتی اور قانونی نوٹسز ملنے والے ہی دن اسکین ہو کر بذریعہ ای میل اور ایس ایم ایس نوٹیفکیشن آپ تک پہنچا دیے جاتے ہیں۔"
      },
      {
        "title": "شفاف فیسیں بغیر کسی پوشیدہ سالانہ چارجز کے",
        "desc": "کوئی پوشیدہ اخراجات یا تجدید کے وقت غیر متوقع فیسیں نہیں ہیں؛ پہلے دن سے ہی سالانہ ریٹس اور سرکاری فیسیں بالکل واضح ہیں۔"
      },
      {
        "title": "جدید اور جامع کارپوریٹ کلائنٹ ڈیش بورڈ",
        "desc": "ایک ہی پورٹل میں متعدد کمپنیوں کا انتظام، اسکین شدہ خطوط کا ریکارڈ، اور قانونی تعمیل کے کیلنڈر کی باآسانی نگرانی۔"
      },
      {
        "title": "بین الاقوامی بانیوں کا مکمل خیر مقدم",
        "desc": "امریکی کمپنی قائم کرنے کے لیے امریکی شہریت یا SSN کی ضرورت نہیں ہے؛ دنیا بھر کے کاروباری افراد کے لیے تصدیقی عمل انتہائی آسان ہے۔"
      }
    ],
    "formationSteps": [
      {
        "step": "۰۱",
        "title": "کمپنی کی قسم اور ریاست کا انتخاب",
        "desc": "LLC یا C-Corporation میں سے انتخاب کریں۔ ٹیکس فوائد اور رازداری کے لیے وایومنگ اور ڈیلاویئر مقبول ترین ریاستیں ہیں۔"
      },
      {
        "step": "۰۲",
        "title": "Registered Agents Inc کا بطور نمائندہ تقرر",
        "desc": "اس ادارے کو اپنا سرکاری ایجنٹ نامزد کریں تاکہ آپ کا رہائشی پتہ پبلک ریکارڈز سے محفوظ رہے اور قانونی نوٹسز وقت پر ملیں۔"
      },
      {
        "step": "۰۳",
        "title": "تشکیلاتی دستاویزات (Articles) جمع کروائیں",
        "desc": "ماہرین کمپنی کی باقاعدہ رجسٹریشن کے کاغذات ریاست کے سیکرٹریٹ میں جمع کروا کر باضابطہ قانونی سرٹیفکیٹ حاصل کرتے ہیں۔"
      },
      {
        "step": "۰۴",
        "title": "کمپنی کو مکمل طور پر فعال اور قانونی رکھیں",
        "desc": "ڈیجیٹل خطوط کے اسکینز وصول کریں، وقت پر سالانہ رپورٹس فائل کریں اور FinCEN کے فیڈرل قواعد کی پاسداری جاری رکھیں۔"
      }
    ],
    "faqs": [
      {
        "q": "رجسٹرڈ ایجنٹ کیا ہے اور یہ قانوناً کیوں ضروری ہے؟",
        "a": "رجسٹرڈ ایجنٹ ایک مجاز فرد یا ادارہ ہے جو آپ کی کمپنی کی جانب سے سرکاری خطوط اور عدالتی نوٹسز وصول کرنے کا قانونی ذمہ دار ہوتا ہے۔ امریکی قانون کے تحت ہر کمپنی کا متعلقہ ریاست میں فزیکل پتے کے ساتھ ایجنٹ ہونا لازمی ہے۔"
      },
      {
        "q": "کیا غیر ملکی (غیر امریکی رہائشی) اپنی کمپنی قائم کر سکتے ہیں؟",
        "a": "جی ہاں، امریکہ سے باہر رہنے والے افراد قانونی طور پر امریکی کمپنی (جیسے LLC) کے 100٪ مالک ہو سکتے ہیں اور انٹرنیٹ کے ذریعے اپنے تمام معاملات چلا سکتے ہیں۔"
      },
      {
        "q": "کیا اس وقت تمام کمپنیوں کے لیے FinCEN BOI رپورٹ جمع کروانا لازمی ہے؟",
        "a": "نہیں، فیڈرل عدالتوں کے حالیہ فیصلوں اور FinCEN کی گائیڈ لائنز کے تحت بہت سی مقامی کمپنیوں کو فی الحال استثنیٰ حاصل ہے، البتہ بعض غیر ملکی کمپنیاں رپورٹ کرنے کی پابند ہیں۔ یہ ادارہ سرکاری قواعد کے مطابق ضرورت پڑنے پر رپورٹ فائل کرنے میں مدد فراہم کرتا ہے۔"
      },
      {
        "q": "کیا صافی اکیڈمی کا ریفرل لنک استعمال کرنے پر اضافی فیس لگتی ہے؟",
        "a": "بالکل نہیں، قیمتیں اصل نرخوں کے بالکل برابر ہوتی ہیں اور بعض اوقات ڈسکاؤنٹ بھی ملتا ہے۔ ریفرل کمیشن ہمیں طلباء کے لیے مفت تعلیمی وسائل جاری رکھنے میں مدد دیتا ہے۔"
      },
      {
        "q": "یہ ادارہ بانیوں کی پرائیویسی کا کیسے تحفظ کرتا ہے؟",
        "a": "ریاستی سرکاری ریکارڈز میں آپ کے گھر کے پتے کے بجائے ان کا تجارتی دفتر درج ہوتا ہے اور وہ کسٹمرز کا ڈیٹا کسی تیسرے فریق کو نہ بیچنے کی سخت پالیسی پر عمل پیرا ہیں۔"
      }
    ],
    "phaseLabel": "مرحلہ",
    "disclaimerBottom": "* ادارہ Registered Agents Inc ایک آزاد سروس فراہم کنندہ ہے۔ صافی اکیڈمی کوئی قانونی فرم نہیں ہے اور نہ ہی سرکاری قانونی یا ٹیکس مشورے دیتی ہے۔ رجسٹریشن کے اختیارات کے لیے ان کی ویب سائٹ دیکھیں۔",
    "cardEntityStatus": "کارپوریٹ ادارے کی حیثیت",
    "cardShieldTitle": "امریکی کارپوریٹ تحفظ",
    "cardActiveBadge": "فعال",
    "cardAgentTitle": "باضابطہ رجسٹرڈ ایجنٹ",
    "cardAgentSub": "تمام 50 امریکی ریاستوں میں مکمل کوریج",
    "cardPrivacyTitle": "رہائشی پتے کی مکمل پرائیویسی",
    "cardPrivacySub": "ذاتی پتے کا اخفاء (قانون کے مطابق)",
    "cardBoiTitle": "FinCEN BOI فیڈرل گائیڈنس",
    "cardBoiSub": "استثنیٰ اور ریگولیٹری قواعد کی نگرانی",
    "cardMailTitle": "ڈیجیٹل کلاؤڈ میل روم",
    "cardMailSub": "اسی کاروباری دن میں مکمل اسکیننگ",
    "cardFootnote": "بین الاقوامی اور مقامی بانیوں کے لیے صافی اکیڈمی کی جانب سے تجویز کردہ۔"
  },
  "ru": {
    "isRtl": false,
    "partnerDisclosure": "Раскрытие партнерства и соблюдение нормативных требований:",
    "disclosureText": "Академия Safi предоставляет независимые образовательные программы и ресурсы для предпринимателей. При регистрации или заказе услуг по нашим партнерским ссылкам в Registered Agents Inc мы можем получать комиссионное вознаграждение без каких-либо дополнительных затрат для вас. Мы рекомендуем только надежных провайдеров, отвечающих строгим стандартам конфиденциальности данных и правовой надежности.",
    "heroBadge": "Рекомендованный корпоративный сервис для регистрации бизнеса в США",
    "heroTitle1": "Зарегистрируйте и защитите свою",
    "heroTitle2": "компанию в США",
    "heroDesc": "Являетесь ли вы международным основателем глобального стартапа или предпринимателем, выходящим на рынок США, надежная корпоративная основа имеет решающее значение. Академия Safi рекомендует Registered Agents Inc для предоставления услуг зарегистрированного агента во всех 50 штатах, регистрации LLC и корпораций, а также регулярной отчетности.",
    "ctaRegister": "Зарегистрировать компанию в США",
    "ctaExploreCourses": "Изучить бизнес-курсы",
    "servicesBadge": "Корпоративные услуги",
    "servicesTitle": "Комплексные бизнес-услуги во всех 50 штатах США",
    "servicesSub": "Все необходимое для законной регистрации, поддержания юридической силы и защиты конфиденциальности учредителей.",
    "whyBadge": "Почему мы рекомендуем",
    "whyTitle": "Собственная инфраструктура и прямая экспертная поддержка",
    "whySub": "Причина, по которой тысячи основателей выбирают Registered Agents Inc вместо сторонних сайтов-посредников.",
    "stepsBadge": "Пошаговое руководство",
    "stepsTitle": "Как открыть компанию в Соединенных Штатах",
    "stepsSub": "Следуйте проверенному плану: от выбора штата и формы собственности до получения сертификата о регистрации.",
    "faqsBadge": "Часто задаваемые вопросы",
    "faqsTitle": "Ответы на ключевые юридические вопросы",
    "faqsSub": "Понятные разъяснения о зарегистрированном агенте, правах нерезидентов и требованиях федерального комплаенса.",
    "ctaBottomTitle": "Готовы зарегистрировать свой бизнес в США?",
    "ctaBottomDesc": "Создайте авторитетное юридическое присутствие с реальными зарегистрированными офисами в любом из 50 штатов.",
    "ctaBottomBtn": "Начать с Registered Agents Inc",
    "services": [
      {
        "title": "Зарегистрированный агент во всех 50 штатах",
        "desc": "Законодательство каждого штата США требует наличия официального зарегистрированного агента с физическим адресом для приема юридических уведомлений и предотвращения попадания вашего домашнего адреса в открытые реестры.",
        "badge": "Обязательное требование"
      },
      {
        "title": "Регистрация LLC и корпораций (Inc)",
        "desc": "Полное сопровождение процедуры создания юридического лица в любом штате (включая Вайоминг, Делавэр и Флориду) с составлением устава и соблюдением всех требований законодательства.",
        "badge": "Открытие компании"
      },
      {
        "title": "Консультации и подача отчетов FinCEN BOI",
        "desc": "В свете актуальных судебных решений и регуляторных обновлений FinCEN многие американские компании временно освобождены от подачи отчетов о бенефициарных владельцах (BOI) либо имеют отсрочку, в то время как определенные иностранные структуры подлежат декларированию. Сервис отслеживает правила и оказывает содействие.",
        "badge": "Федеральный комплаенс"
      },
      {
        "title": "Годовые отчеты и продление юридического статуса",
        "desc": "Штаты требуют ежегодной подачи отчетов для поддержания статуса Good Standing. Сервис контролирует сроки и готовит необходимые документы для предотвращения штрафов.",
        "badge": "Регулярная отчетность"
      },
      {
        "title": "Быстрое цифровое сканирование входящей почты",
        "desc": "Судебные извещения и государственная корреспонденция сканируются в день поступления и мгновенно загружаются в защищенный личный кабинет, доступный из любой точки планеты.",
        "badge": "Мгновенный доступ"
      },
      {
        "title": "Пакет корпоративной идентичности и конфиденциальности",
        "desc": "Полная бизнес-инфраструктура, включая коммерческий телефонный номер с кодом штата, доменное имя, пересылку почты и использование официального бизнес-адреса.",
        "badge": "Инфраструктура приватности"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Собственные офисы и штатные сотрудники в 50 штатах",
        "desc": "В отличие от онлайн-посредников, передающих заказы третьим лицам, Registered Agents Inc владеет физическими офисами и собственными командами во всех штатах."
      },
      {
        "title": "Полная защита домашнего адреса учредителя",
        "desc": "В публичных государственных реестрах указывается коммерческий адрес компании-агента, сохраняя ваше личное жилье скрытым от баз данных и спама."
      },
      {
        "title": "Обработка документов в день их поступления",
        "desc": "Судебные повестки и налоговые письма обрабатываются в день вручения с немедленной отправкой уведомлений по электронной почте и SMS."
      },
      {
        "title": "Прозрачные тарифы без скрытых переплат",
        "desc": "Никаких скрытых ежегодных надбавок или искусственно заниженных цен первого года: все тарифы прозрачны и понятны с самого начала."
      },
      {
        "title": "Современный единый портал управления",
        "desc": "Интуитивный корпоративный кабинет для управления несколькими юридическими лицами, архивом сканов и календарем обязательных государственных отчетов."
      },
      {
        "title": "Открытость для международных предпринимателей",
        "desc": "Для открытия компании в США вам не требуется гражданство или номер социального страхования (SSN): процедура полностью доступна для нерезидентов."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Выбор структуры и юрисдикции",
        "desc": "Выберите между гибким LLC (для цифрового бизнеса и международной торговли) или C-Corp (для привлечения венчурных инвестиций). Популярны Вайоминг и Делавэр."
      },
      {
        "step": "02",
        "title": "Назначение Registered Agents Inc",
        "desc": "Укажите зарегистрированного агента для обеспечения законного физического адреса и защиты домашней информации в открытых базах данных штата."
      },
      {
        "step": "03",
        "title": "Подача документов на регистрацию",
        "desc": "Специалисты оформляют и направляют уставные документы (Articles of Organization) государственному секретарю штата и получают официальный сертификат."
      },
      {
        "step": "04",
        "title": "Поддержание статуса и развитие бизнеса",
        "desc": "Получайте сканы официальной корреспонденции, своевременно подавайте годовые декларации и соблюдайте действующие федеральные нормы FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "Что такое зарегистрированный агент и почему он обязателен по закону?",
        "a": "Зарегистрированный агент — это уполномоченное лицо или организация, официально принимающая судебные и государственные документы от имени вашей компании. Закон каждого штата США обязывает все LLC и корпорации иметь зарегистрированного агента с физическим адресом в штате создания."
      },
      {
        "q": "Могут ли иностранные предприниматели-нерезиденты владеть компанией в США?",
        "a": "Да. Иностранные граждане без резидентства США имеют полное законное право владеть 100% долей в американской компании (например, LLC) и управлять ею удаленно из любой точки мира."
      },
      {
        "q": "Обязаны ли все компании сейчас подавать отчеты FinCEN BOI?",
        "a": "Нет. В связи с текущими решениями федеральных судов и обновлениями FinCEN многие американские компании временно освобождены от подачи либо сроки приостановлены, но для ряда иностранных структур обязательства сохраняются. Сервис помогает соблюдать требования при наличии юридической необходимости."
      },
      {
        "q": "Взимается ли дополнительная плата при переходе по ссылке Safi Academy?",
        "a": "Нет, стоимость услуг абсолютно идентична, а иногда включает специальные предложения. Safi Academy может получать партнерское вознаграждение, которое помогает нам финансировать бесплатные обучающие материалы."
      },
      {
        "q": "Как сервис защищает личные данные учредителей?",
        "a": "При регистрации адрес агентства вносится в общедоступные реестры штата вместо домашнего адреса владельца бизнеса. Кроме того, компания строго придерживается политики неразглашения и никогда не продает данные третьим лицам."
      }
    ],
    "phaseLabel": "Этап",
    "disclaimerBottom": "* Registered Agents Inc является независимым поставщиком услуг. Safi Academy не является юридической фирмой и не предоставляет налоговых или юридических консультаций. Подробности уточняйте на их официальном сайте.",
    "cardEntityStatus": "Статус юридического лица",
    "cardShieldTitle": "Корпоративный щит США",
    "cardActiveBadge": "Активно",
    "cardAgentTitle": "Зарегистрированный агент",
    "cardAgentSub": "Покрытие всех 50 штатов США",
    "cardPrivacyTitle": "Конфиденциальность адреса",
    "cardPrivacySub": "Личный адрес скрыт (согласно закону)",
    "cardBoiTitle": "Регулирование FinCEN BOI",
    "cardBoiSub": "Мониторинг исключений и норм",
    "cardMailTitle": "Цифровой почтовый сервис",
    "cardMailSub": "Сканирование в день поступления",
    "cardFootnote": "Рекомендовано Safi Academy для международных и местных основателей."
  },
  "tr": {
    "isRtl": false,
    "partnerDisclosure": "Ortaklık ve Yasal Uyum Bildirimi:",
    "disclosureText": "Safi Akademi, girişimciler için bağımsız eğitim kursları ve kaynaklar sunar. Registered Agents Inc yönlendirme bağlantılarımız üzerinden kayıt olduğunuzda veya hizmet satın aldığınızda, tarafınıza hiçbir ek maliyet yansımaksızın bir ortaklık komisyonu alabiliriz. Yalnızca veri gizliliği, operasyonel güvenilirlik ve yasal uyum kriterlerimizi karşılayan sağlayıcıları öneriyoruz.",
    "heroBadge": "ABD Şirket Kuruluşu İçin Önerilen Kurumsal Sağlayıcı",
    "heroTitle1": "ABD Şirketinizi Kurun",
    "heroTitle2": "ve Güvenle Koruyun",
    "heroDesc": "İster küresel bir girişim başlatan uluslararası bir kurucu olun, ister ABD pazarına açılan bir girişimci; sağlam bir kurumsal temel hayati önem taşır. Safi Akademi; 50 eyaletin tamamında kayıtlı temsilcilik, LLC/Şirket kuruluşu ve sürekli yasal uyum için Registered Agents Inc'i önermektedir.",
    "ctaRegister": "ABD Şirketinizi Kaydedin",
    "ctaExploreCourses": "İşletme Kurslarını İnceleyin",
    "servicesBadge": "Kurumsal Hizmetler",
    "servicesTitle": "50 ABD Eyaletinin Tamamında Kapsamlı Şirket Hizmetleri",
    "servicesSub": "Yasal olarak şirket kurmak, eyalet uyumunu sürdürmek ve kurucu gizliliğini korumak için ihtiyacınız olan her şey.",
    "whyBadge": "Neden Tavsiye Ediyoruz",
    "whyTitle": "Doğrudan Altyapı ve Özel Uzman Desteği",
    "whySub": "Binlerce girişimcinin aracı bayiler yerine neden doğrudan Registered Agents Inc'e güvendiğinin yanıtı.",
    "stepsBadge": "Adım Adım",
    "stepsTitle": "ABD Şirketinizi Nasıl Kurarsınız?",
    "stepsSub": "Eyalet seçiminden yasal şirket onayına kadar sahada test edilmiş yol haritamızı takip edin.",
    "faqsBadge": "Sıkça Sorulan Sorular",
    "faqsTitle": "Yasal Sorularınıza Net ve Açık Yanıtlar",
    "faqsSub": "Kayıtlı temsilci kuralları, yabancı sahiplik hakları ve federal uyum zorunlulukları hakkında net bilgiler.",
    "ctaBottomTitle": "ABD Şirketinizi Kurmaya Hazır mısınız?",
    "ctaBottomDesc": "50 ABD eyaletinin herhangi birinde yerel kayıtlı ofislerle saygın kurumsal varlığınızı başlatın.",
    "ctaBottomBtn": "Registered Agents Inc ile Başlayın",
    "services": [
      {
        "title": "50 Eyaletin Tamamında Kayıtlı Temsilci (Registered Agent)",
        "desc": "ABD yasalarına göre her tüzel kişilik, yasal bildirimleri almak ve kişisel ev adresinizi kamuya açık kayıtlardan korumak için kuruluş eyaletinde fiziksel adrese sahip bir kayıtlı temsilci bulundurmak zorundadır.",
        "badge": "Yasal Zorunluluk"
      },
      {
        "title": "LLC ve Corporation Şirket Kuruluşu",
        "desc": "Wyoming, Delaware ve Florida dahil tüm ABD eyaletlerinde şirket ana sözleşmesinin hazırlanması ve eyalet sekreterliğine resmi tescil başvurusu.",
        "badge": "Şirket Tescili"
      },
      {
        "title": "FinCEN BOI Rehberliği ve Güncel Düzenlemeler",
        "desc": "Federal mahkeme kararları ve FinCEN bildirimleri doğrultusunda, birçok yerli ABD şirketi şu an intifa hakkı sahipliği (BOI) bildiriminden muaftır veya süreleri ertelenmiştir; bazı yabancı şirketler ise bildirime tabidir. Firma kuralları takip eder ve yasal gerekliliklerde destek sağlar.",
        "badge": "Federal Uyum"
      },
      {
        "title": "Yıllık Raporlama ve Şirket Durumu Yenileme",
        "desc": "Eyaletler şirketlerin faal kalması için yıllık rapor sunulmasını şart koşar. Firma son tarihleri takip eder ve cezaları önlemek için belgelerinizi zamanında sunar.",
        "badge": "Eyalet Bildirimleri"
      },
      {
        "title": "Postaların Aynı Gün Dijital Taranması",
        "desc": "Tebligatlar ve resmi devlet postaları ulaştığı gün taranır ve dünyanın her yerinden erişebilmeniz için güvenli çevrimiçi panelinize yüklenir.",
        "badge": "Anında Erişim"
      },
      {
        "title": "Ticari Kimlik ve Kurucu Gizlilik Paketi",
        "desc": "Yerel alan kodlu ticari telefon hattı, alan adı, e-posta yönlendirme ve ticari iş adresi kullanımı dahil tam kurumsal kimlik altyapısı.",
        "badge": "Gizlilik Paketi"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "50 Eyalette Fiziksel Ofisler ve Kadrolu Ekipler",
        "desc": "Siparişleri üçüncü taraflara devreden aracı sitelerin aksine, Registered Agents Inc her ABD eyaletinde kendi fiziksel ofislerine ve personeline sahiptir."
      },
      {
        "title": "Kişisel Ev Adresi İçin Tam Gizlilik Koruması",
        "desc": "Eyalet yasalarının izin verdiği kamuya açık belgelerde ticari ofis adresi kullanılarak şahsi ev adresiniz açık dizinlerden gizlenir."
      },
      {
        "title": "Belgelerin Ulaştığı Gün Taranıp Teslim Edilmesi",
        "desc": "Dava tebligatları ve resmi vergi yazışmaları aynı iş gününde dijitalleştirilip e-posta ve SMS uyarılarıyla hesabınıza iletilir."
      },
      {
        "title": "Gizli Ücret İçermeyen Şeffaf Fiyatlandırma",
        "desc": "Yıllık yenilemelerde sürpriz fiyat artışları veya gizli masraflar yoktur; temsilcilik ve eyalet harçları baştan şeffaf olarak belirtilir."
      },
      {
        "title": "Gelişmiş ve Kullanımı Kolay Müşteri Paneli",
        "desc": "Birden çok şirketi yönetebileceğiniz, taranmış evrakları inceleyebileceğiniz ve yasal uyum takvimini takip edebileceğiniz modern kurumsal kontrol merkezi."
      },
      {
        "title": "Uluslararası Girişimcilere Tam Destek",
        "desc": "ABD şirketi kurmak için ABD vatandaşı olmanız veya SSN sahibi olmanız gerekmez; tüm dünya girişimcileri için hızlı kimlik doğrulama sağlanır."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Şirket Türünü ve Eyaleti Seçin",
        "desc": "Esnek vergilendirme için LLC veya kurumsal yatırım almak için C-Corp seçin. Wyoming (düşük maliyet ve gizlilik) ve Delaware en popüler tercihlerdir."
      },
      {
        "step": "02",
        "title": "Registered Agents Inc'i Temsilci Atayın",
        "desc": "Resmi eyalet kayıtlarında fiziksel yasal adres sağlamak ve kişisel adresinizi korumak için şirketi kayıtlı temsilciniz olarak belirleyin."
      },
      {
        "step": "03",
        "title": "Kuruluş Belgelerini Eyalete Sunun",
        "desc": "Uzmanlar ana sözleşmenizi (Articles of Organization) hazırlar, eyalet sekreterliğine iletir ve onaylı kuruluş sertifikanızı teslim alır."
      },
      {
        "step": "04",
        "title": "Şirketinizi %100 Yasal ve Faal Tutun",
        "desc": "Postalarınızın taramalarını alın, yıllık raporları zamanında teslim edin ve geçerli FinCEN bildirim kurallarını sorunsuz takip edin."
      }
    ],
    "faqs": [
      {
        "q": "Kayıtlı Temsilci (Registered Agent) nedir ve neden yasal olarak zorunludur?",
        "a": "Kayıtlı Temsilci, şirketiniz adına yasal tebligatları ve resmi devlet yazışmalarını kabul etmeye yetkili kişi veya kuruluştur. ABD eyalet yasaları gereğince her LLC ve Corporation, kuruluş eyaletinde fiziksel adresi bulunan bir temsilciye sahip olmak zorundadır."
      },
      {
        "q": "ABD'de ikamet etmeyen yabancılar bu hizmetle şirket kurabilir mi?",
        "a": "Evet. ABD mukimi olmayan yabancı girişimciler bir ABD şirketinin (örneğin LLC) %100 yasal sahibi olabilir ve tüm işlemlerini internet üzerinden uzaktan yönetebilir."
      },
      {
        "q": "Şu an tüm ABD şirketlerinin FinCEN BOI raporu sunması zorunlu mu?",
        "a": "Hayır. Federal mahkeme kararları ve FinCEN güncellemeleri doğrultusunda, birçok yerli şirket şu an bildirimden muaftır veya süreleri durdurulmuştur, ancak belirli yabancı şirketler için bildirim zorunludur. Firma güncel kuralları takip eder ve gerektiğinde bildirim desteği sunar."
      },
      {
        "q": "Safi Akademi yönlendirme bağlantısını kullanmak ek ücrete yol açar mı?",
        "a": "Hayır. Fiyatlar tamamen aynıdır ve dönemsel indirimleri de içerebilir. Linkimiz üzerinden kayıt olmanız halinde Safi Akademi küçük bir komisyon alabilir; bu da ücretsiz eğitim içeriklerimizi desteklememizi sağlar."
      },
      {
        "q": "Registered Agents Inc kurucu gizliliğini nasıl korur?",
        "a": "Eyalet sitelerinde yayınlanan halka açık sicil kayıtlarında ev adresiniz yerine firmanın ticari ofis adresi kullanılır. Ayrıca müşteri verilerinin üçüncü taraflara kesinlikle satılmaması politikası uygulanır."
      }
    ],
    "phaseLabel": "Aşama",
    "disclaimerBottom": "* Registered Agents Inc bağımsız bir hizmet sağlayıcıdır. Safi Akademi bir hukuk bürosu değildir ve resmi hukuki/mali danışmanlık vermez. Eyalet başvuru seçenekleri için resmi web sitelerini ziyaret ediniz.",
    "cardEntityStatus": "Şirket Yasal Durumu",
    "cardShieldTitle": "ABD Kurumsal Kalkanı",
    "cardActiveBadge": "Aktif",
    "cardAgentTitle": "Kayıtlı Temsilci",
    "cardAgentSub": "50 ABD Eyaletinin Tamamı Kapsamda",
    "cardPrivacyTitle": "Adres Gizliliği",
    "cardPrivacySub": "Kişisel Adres Koruması (Yasaların izin verdiği ölçüde)",
    "cardBoiTitle": "FinCEN BOI Mevzuat Rehberi",
    "cardBoiSub": "Federal Muafiyet ve Kural Takibi",
    "cardMailTitle": "Dijital Posta Odası",
    "cardMailSub": "Aynı Gün Çevrimiçi Tarama",
    "cardFootnote": "Uluslararası ve yerel kurucular için Safi Akademi tarafından önerilmektedir."
  },
  "de": {
    "isRtl": false,
    "partnerDisclosure": "Offenlegung von Partnerschaften und Einhaltung gesetzlicher Vorschriften:",
    "disclosureText": "Die Safi Academy bietet unabhängige Bildungskurse und Ressourcen für Unternehmer. Wenn Sie sich über unsere Empfehlungslinks bei Registered Agents Inc registrieren oder Dienstleistungen erwerben, erhalten wir möglicherweise eine Partnerprovision ohne zusätzliche Kosten für Sie. Wir empfehlen ausschließlich etablierte Anbieter, die unseren strengen Kriterien für Datenschutz, Zuverlässigkeit und Rechtskonformität entsprechen.",
    "heroBadge": "Empfohlener US-Unternehmensdienstleister",
    "heroTitle1": "Gründen und Schützen Sie Ihr",
    "heroTitle2": "US-Unternehmen",
    "heroDesc": "Ob Sie als internationaler Gründer ein globales Startup starten oder als Unternehmer in den US-Markt expandieren: Ein solides rechtliches Fundament ist unverzichtbar. Die Safi Academy empfiehlt Registered Agents Inc für die Vertretung als Registered Agent in allen 50 Bundesstaaten, LLC/Corporation-Gründungen und fortlaufende Compliance.",
    "ctaRegister": "US-Unternehmen registrieren",
    "ctaExploreCourses": "Wirtschaftskurse entdecken",
    "servicesBadge": "Unternehmensdienstleistungen",
    "servicesTitle": "Umfassende Unternehmensservices in allen 50 US-Bundesstaaten",
    "servicesSub": "Alles, was Sie zur rechtssicheren Gründung, Aufrechterhaltung des Status und zum Schutz der Privatsphäre benötigen.",
    "whyBadge": "Warum wir empfehlen",
    "whyTitle": "Eigene Infrastruktur und engagierter Experten-Support",
    "whySub": "Warum Tausende von Unternehmern Registered Agents Inc gegenüber Drittanbieter-Portalen vertrauen.",
    "stepsBadge": "Schritt für Schritt",
    "stepsTitle": "So gründen Sie Ihr US-Unternehmen",
    "stepsSub": "Folgen Sie unserem praxiserprobten Leitfaden von der Bundesstaatsauswahl bis zum offiziellen Gründungszertifikat.",
    "faqsBadge": "Häufig gestellte Fragen",
    "faqsTitle": "Klare Antworten auf Ihre rechtlichen Fragen",
    "faqsSub": "Verlässliche Informationen zu Registered Agents, Eigentum für Nicht-US-Bürger und Bundesvorschriften.",
    "ctaBottomTitle": "Bereit zur Gründung Ihres US-Unternehmens?",
    "ctaBottomDesc": "Etablieren Sie Ihre angesehene Unternehmenspräsenz mit lokalen Büros in jedem der 50 US-Bundesstaaten.",
    "ctaBottomBtn": "Mit Registered Agents Inc starten",
    "services": [
      {
        "title": "Registered Agent in allen 50 Bundesstaaten",
        "desc": "Nach US-Recht benötigt jedes Unternehmen einen Registered Agent mit physischer Straßenadresse im Gründungsstaat, um behördliche Zustellungen entgegenzunehmen und Ihre Privatadresse vor öffentlichen Verzeichnissen zu schützen.",
        "badge": "Gesetzliche Pflicht"
      },
      {
        "title": "Gründung von LLCs und Kapitalgesellschaften",
        "desc": "Vollständiger Gründungsservice in allen US-Bundesstaaten (einschließlich Wyoming, Delaware und Florida) mit Erstellung der Articles of Organization und ordnungsgemäßer Einreichung.",
        "badge": "Unternehmensgründung"
      },
      {
        "title": "FinCEN BOI Beratung und Berichterstattung",
        "desc": "Aufgrund aktueller Urteile von US-Bundesgerichten und Richtlinien von FinCEN sind viele inländische US-Unternehmen derzeit von der Pflicht zur Meldung wirtschaftlich Berechtigter (BOI) befreit oder Fristen wurden ausgesetzt, während bestimmte ausländische Gesellschaften meldepflichtig bleiben. Der Anbieter verfolgt die Rechtslage und unterstützt bei Bedarf.",
        "badge": "Federal Compliance"
      },
      {
        "title": "Jahresberichte und Aufrechterhaltung des Good Standing",
        "desc": "US-Bundesstaaten verlangen jährliche Berichte, um den aktiven Status zu sichern. Das Team überwacht Fristen und reicht Berichte pünktlich ein, um Strafen oder Aberkennungen zu verhindern.",
        "badge": "Staatliche Berichte"
      },
      {
        "title": "Digitale Post-Scans am Tag des Eingangs",
        "desc": "Gerichtliche Mitteilungen und behördliche Schreiben werden am Tag des Eintreffens gescannt und in Ihr sicheres Online-Portal geladen, damit Sie weltweit darauf zugreifen können.",
        "badge": "Sofortiger Zugriff"
      },
      {
        "title": "Unternehmensidentität und Privatsphäre-Paket",
        "desc": "Professionelle Infrastruktur inklusive lokaler Firmentelefonnummer, Domain, E-Mail-Weiterleitung und gewerblicher Geschäftsadresse.",
        "badge": "Datenschutz-Suite"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Eigene physische Büros und Teams in allen 50 Staaten",
        "desc": "Anders als Vermittler, die Aufträge weiterleiten, betreibt Registered Agents Inc eigene Standorte und festangestellte Teams in jedem einzelnen US-Bundesstaat."
      },
      {
        "title": "Vollständiger Schutz Ihrer privaten Wohnadresse",
        "desc": "Soweit gesetzlich zulässig, wird die gewerbliche Büroadresse in öffentlichen Unterlagen angegeben, damit Ihre private Wohnadresse nicht öffentlich einsehbar ist."
      },
      {
        "title": "Postverarbeitung und Bereitstellung am selben Tag",
        "desc": "Klagen und amtliche Steuerbescheide werden am selben Tag verarbeitet und digital bereitgestellt, begleitet von sofortigen Benachrichtigungen."
      },
      {
        "title": "Transparente Preise ohne versteckte Folgekosten",
        "desc": "Keine Lockangebote mit teuren Verlängerungsgebühren im Folgejahr: Jahresgebühren und staatliche Auslagen sind von Beginn an transparent."
      },
      {
        "title": "Modernes Kunden-Dashboard für Ihr Unternehmen",
        "desc": "Zentrales Verwaltungsportal für mehrere Gesellschaften, eingescannte Dokumente, Good-Standing-Zertifikate und Compliance-Kalender."
      },
      {
        "title": "Internationale Gründer ausdrücklich willkommen",
        "desc": "Sie benötigen weder US-Staatsbürgerschaft noch eine SSN zur Unternehmensgründung. Unkomplizierte Identitätsprüfung für Gründer weltweit."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Rechtsform und Bundesstaat wählen",
        "desc": "Wählen Sie zwischen LLC (Flexibilität & steuerliche Durchleitung) oder C-Corporation (ideal für Venture Capital). Beliebt sind Wyoming und Delaware."
      },
      {
        "step": "02",
        "title": "Registered Agents Inc beauftragen",
        "desc": "Bestimmen Sie den Anbieter als Ihren offiziellen Vertreter zur Sicherstellung der legalen Postanschrift und zum Schutz Ihrer privaten Adresse."
      },
      {
        "step": "03",
        "title": "Gründungsdokumente einreichen",
        "desc": "Experten erstellen die Articles of Organization und reichen diese beim Secretary of State ein, um das offizielle Gründungszertifikat zu erhalten."
      },
      {
        "step": "04",
        "title": "Rechtskonformität dauerhaft sichern",
        "desc": "Empfangen Sie Postscans digital, reichen Sie Jahresberichte fristgerecht ein und bleiben Sie bezüglich FinCEN-Regeln stets auf der sicheren Seite."
      }
    ],
    "faqs": [
      {
        "q": "Was ist ein Registered Agent und warum ist er gesetzlich vorgeschrieben?",
        "a": "Ein Registered Agent ist eine autorisierte juristische oder natürliche Person, die rechtliche Zustellungen und amtliche Schreiben im Namen Ihres Unternehmens entgegennimmt. Das US-Recht verpflichtet jede LLC oder Corporation zu einem solchen Vertreter mit physischer Adresse im Gründungsstaat."
      },
      {
        "q": "Können internationale Gründer ohne Wohnsitz in den USA diesen Service nutzen?",
        "a": "Ja. Nicht-US-Bürger dürfen zu 100% Eigentümer eines US-Unternehmens sein und dieses vollständig digital aus dem Ausland führen."
      },
      {
        "q": "Müssen derzeit alle Unternehmen FinCEN BOI Berichte einreichen?",
        "a": "Nein. Aufgrund gerichtlicher Verfügungen und aktueller FinCEN-Verordnungen sind viele US-Inlandsgesellschaften derzeit befreit oder Fristen sind pausiert, während bestimmte ausländische Firmen meldepflichtig bleiben. Der Anbieter informiert Sie zuverlässig über die Pflichten."
      },
      {
        "q": "Entstehen bei Nutzung des Safi Academy Links zusätzliche Kosten?",
        "a": "Nein. Die Preise sind identisch oder beinhalten Sonderkonditionen. Safi Academy erhält unter Umständen eine Empfehlungsprovision, die unsere kostenlosen Bildungsangebote finanziert."
      },
      {
        "q": "Wie schützt Registered Agents Inc die Privatsphäre der Gründer?",
        "a": "Wo gesetzlich möglich, wird die Firmenadresse des Agenten anstelle Ihrer privaten Wohnadresse in öffentlichen Registern eingetragen. Zudem gilt die strikte Regel, Kundendaten niemals zu verkaufen."
      }
    ],
    "phaseLabel": "Phase",
    "disclaimerBottom": "* Registered Agents Inc ist ein unabhängiger Dienstleister. Safi Academy ist keine Anwaltskanzlei und erteilt keine Rechts- oder Steuerberatung. Bitte besuchen Sie für offizielle Details deren Website.",
    "cardEntityStatus": "Unternehmensstatus",
    "cardShieldTitle": "US Corporate Shield",
    "cardActiveBadge": "Aktiv",
    "cardAgentTitle": "Registered Agent",
    "cardAgentSub": "Alle 50 US-Bundesstaaten abgedeckt",
    "cardPrivacyTitle": "Adressenschutz",
    "cardPrivacySub": "Privatadresse geschützt (soweit gesetzlich zulässig)",
    "cardBoiTitle": "FinCEN BOI Leitfaden",
    "cardBoiSub": "Überwachung von Ausnahmen und Richtlinien",
    "cardMailTitle": "Digitale Poststelle",
    "cardMailSub": "Online-Scans am selben Tag",
    "cardFootnote": "Empfohlen von Safi Academy für internationale und inländische Gründer."
  },
  "fr": {
    "isRtl": false,
    "partnerDisclosure": "Divulgation de partenariat et conformité réglementaire :",
    "disclosureText": "Safi Academy propose des cours et des ressources éducatives indépendants pour les entrepreneurs. Lorsque vous vous inscrivez ou achetez des services via nos liens de parrainage vers Registered Agents Inc, nous pouvons recevoir une commission d'affiliation sans aucun coût supplémentaire pour vous. Nous ne recommandons que des prestataires reconnus répondant à nos critères rigoureux de confidentialité et de conformité légale.",
    "heroBadge": "Fournisseur recommandé pour la création d'entreprises aux États-Unis",
    "heroTitle1": "Créez et protégez votre",
    "heroTitle2": "entreprise aux États-Unis",
    "heroDesc": "Que vous soyez un fondateur international lançant une startup mondiale ou un entrepreneur s'implantant sur le marché américain, une structure juridique rigoureuse est primordiale. Safi Academy recommande Registered Agents Inc pour la représentation d'agent enregistré dans les 50 États, la création de LLC/Corporation et la conformité continue.",
    "ctaRegister": "Enregistrer votre entreprise aux USA",
    "ctaExploreCourses": "Découvrir les cours de gestion",
    "servicesBadge": "Services d'entreprise",
    "servicesTitle": "Services complets d'entreprise dans les 50 États américains",
    "servicesSub": "Tout ce dont vous avez besoin pour constituer votre société, maintenir la conformité d'État et protéger la vie privée des fondateurs.",
    "whyBadge": "Pourquoi nous recommandons",
    "whyTitle": "Infrastructure directe et support d'experts dédié",
    "whySub": "Pourquoi des milliers d'entrepreneurs font confiance à Registered Agents Inc plutôt qu'à des revendeurs tiers.",
    "stepsBadge": "Étape par étape",
    "stepsTitle": "Comment créer votre entreprise aux États-Unis",
    "stepsSub": "Suivez notre feuille de route éprouvée, du choix de l'État jusqu'à la délivrance de votre certificat officiel.",
    "faqsBadge": "Foire aux questions",
    "faqsTitle": "Réponses claires à vos questions juridiques",
    "faqsSub": "Des informations précises sur l'agent enregistré, la propriété pour les non-résidents et les mandats fédéraux.",
    "ctaBottomTitle": "Prêt à créer votre entreprise aux États-Unis ?",
    "ctaBottomDesc": "Établissez votre présence d'entreprise avec des bureaux enregistrés locaux dans n'importe lequel des 50 États.",
    "ctaBottomBtn": "Démarrer avec Registered Agents Inc",
    "services": [
      {
        "title": "Agent enregistré dans les 50 États américains",
        "desc": "La loi américaine exige que chaque entité dispose d'un agent enregistré avec une adresse physique dans l'État de constitution afin de recevoir les actes juridiques et d'éviter que votre adresse personnelle ne figure aux registres publics.",
        "badge": "Exigence légale"
      },
      {
        "title": "Création de LLC et de Sociétés (Corporations)",
        "desc": "Service complet d'immatriculation dans n'importe quel État (notamment le Wyoming, le Delaware et la Floride) avec rédaction des statuts conformément aux lois de l'État.",
        "badge": "Immatriculation"
      },
      {
        "title": "Conseils et rapports FinCEN BOI",
        "desc": "Suite aux récentes décisions de justice fédérale et aux directives du FinCEN, de nombreuses entreprises américaines sont actuellement exemptées ou bénéficient d'un sursis pour la déclaration des bénéficiaires effectifs (BOI), tandis que certaines entités étrangères restent soumises à déclaration. Le prestataire suit les évolutions réglementaires.",
        "badge": "Conformité fédérale"
      },
      {
        "title": "Rapports annuels et maintien de la bonne réputation",
        "desc": "Les États exigent des rapports annuels pour maintenir l'entreprise active. Le prestataire suit les échéances et prépare les déclarations afin d'éviter toute pénalité.",
        "badge": "Déclarations d'État"
      },
      {
        "title": "Numérisation du courrier le jour même",
        "desc": "Les notifications juridiques et courriers officiels sont scannés le jour de leur arrivée et téléversés sur votre tableau de bord sécurisé accessible dans le monde entier.",
        "badge": "Accès instantané"
      },
      {
        "title": "Pack identité commerciale et confidentialité",
        "desc": "Infrastructure d'entreprise complète comprenant un numéro de téléphone professionnel avec indicatif local, nom de domaine, transfert d'e-mails et adresse commerciale.",
        "badge": "Confidentialité"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Bureaux réels et personnel dédié dans les 50 États",
        "desc": "Contrairement aux plateformes qui sous-traitent à des intermédiaires, Registered Agents Inc possède des bureaux physiques et des équipes internes dans chaque État."
      },
      {
        "title": "Protection absolue de votre adresse personnelle",
        "desc": "Dans la mesure permise par la loi, leur adresse commerciale est inscrite sur les registres publics afin de protéger votre domicile privé des démarcheurs."
      },
      {
        "title": "Traitement des documents le jour même de leur réception",
        "desc": "Les assignations en justice et notifications fiscales officielles sont numérisées et transmises électroniquement le jour même avec alertes par e-mail et SMS."
      },
      {
        "title": "Tarification transparente sans frais cachés",
        "desc": "Aucune mauvaise surprise lors du renouvellement annuel : les tarifs de représentation et les taxes d'État sont clairs et détaillés dès le départ."
      },
      {
        "title": "Tableau de bord client moderne et intuitif",
        "desc": "Un centre de contrôle unique pour gérer plusieurs entreprises, consulter les courriers numérisés et suivre votre calendrier de conformité légale."
      },
      {
        "title": "Entrepreneurs internationaux bienvenus",
        "desc": "Vous n'avez pas besoin de la citoyenneté américaine ni d'un numéro de sécurité sociale (SSN) pour créer votre société américaine : vérification fluide pour tous."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Choisir la structure et l'État",
        "desc": "Choisissez entre une LLC (flexibilité fiscale) ou une C-Corporation (recherche de capital-risque). Le Wyoming et le Delaware figurent parmi les États les plus prisés."
      },
      {
        "step": "02",
        "title": "Désigner Registered Agents Inc",
        "desc": "Désignez la société comme agent officiel pour garantir votre conformité physique et protéger l'adresse de votre domicile personnel."
      },
      {
        "step": "03",
        "title": "Déposer les statuts de constitution",
        "desc": "Des spécialistes préparent et soumettent vos statuts (Articles of Organization) au secrétariat d'État et obtiennent votre certificat d'immatriculation."
      },
      {
        "step": "04",
        "title": "Maintenir la conformité et développer l'activité",
        "desc": "Recevez vos courriers scannés, déposez vos rapports annuels en temps voulu et suivez l'évolution des réglementations fédérales du FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "Qu'est-ce qu'un agent enregistré et pourquoi est-il obligatoire ?",
        "a": "Un agent enregistré est une personne physique ou morale autorisée à recevoir les actes de procédure judiciaire et les correspondances officielles d'État pour votre entreprise. La loi exige que chaque société dispose d'un agent avec une adresse physique dans l'État de constitution."
      },
      {
        "q": "Les fondateurs internationaux (non-résidents) peuvent-ils créer une société ?",
        "a": "Oui. Les non-résidents peuvent légalement détenir 100 % d'une entreprise américaine (telle qu'une LLC) et la gérer entièrement en ligne depuis l'étranger."
      },
      {
        "q": "Toutes les entreprises américaines doivent-elles soumettre le rapport FinCEN BOI ?",
        "a": "Non. Selon les décisions judiciaires actuelles et les directives du FinCEN, de nombreuses entités américaines sont actuellement exemptées ou voient leurs délais suspendus, tandis que certaines entreprises étrangères demeurent soumises à déclaration. Le service vous accompagne selon les exigences en vigueur."
      },
      {
        "q": "L'utilisation du lien Safi Academy entraîne-t-elle des frais supplémentaires ?",
        "a": "Non, les tarifs sont identiques et peuvent même inclure des réductions promotionnelles. Safi Academy peut percevoir une commission qui contribue à financer nos cours gratuits."
      },
      {
        "q": "Comment Registered Agents Inc protège-t-il la confidentialité du fondateur ?",
        "a": "L'adresse commerciale de l'agent est inscrite sur les registres publics à la place de votre adresse personnelle partout où la loi le permet, et aucune donnée client n'est vendue à des tiers."
      }
    ],
    "phaseLabel": "Phase",
    "disclaimerBottom": "* Registered Agents Inc est un prestataire de services indépendant. Safi Academy n'est pas un cabinet d'avocats et ne fournit pas de conseils fiscaux ou juridiques. Consultez leur site officiel pour plus d'informations.",
    "cardEntityStatus": "Statut de l'entité",
    "cardShieldTitle": "Bouclier d'entreprise US",
    "cardActiveBadge": "Actif",
    "cardAgentTitle": "Agent enregistré",
    "cardAgentSub": "Couverture intégrale des 50 États",
    "cardPrivacyTitle": "Confidentialité de l'adresse",
    "cardPrivacySub": "Adresse personnelle protégée (selon la loi)",
    "cardBoiTitle": "Guide FinCEN BOI",
    "cardBoiSub": "Suivi des exemptions et règles fédérales",
    "cardMailTitle": "Courrier numérique",
    "cardMailSub": "Numérisation le jour même",
    "cardFootnote": "Recommandé par Safi Academy pour les fondateurs internationaux et locaux."
  },
  "es": {
    "isRtl": false,
    "partnerDisclosure": "Divulgación de afiliación y cumplimiento normativo:",
    "disclosureText": "Safi Academy ofrece cursos y recursos educativos independientes para emprendedores. Al registrarse o adquirir servicios a través de nuestros enlaces de recomendación a Registered Agents Inc, podemos recibir una comisión de afiliado sin coste adicional para usted. Solo recomendamos proveedores consolidados que cumplen con nuestros estrictos estándares de privacidad de datos, fiabilidad y cumplimiento normativo.",
    "heroBadge": "Proveedor recomendado para la constitución de empresas en EE. UU.",
    "heroTitle1": "Constituya y proteja su",
    "heroTitle2": "empresa en Estados Unidos",
    "heroDesc": "Tanto si es un fundador internacional que lanza una startup global como si es un emprendedor que se expande al mercado estadounidense, una base corporativa legal sólida es indispensable. Safi Academy recomienda Registered Agents Inc para la representación de agente registrado en los 50 estados, creación de LLC/Corporaciones y cumplimiento continuo.",
    "ctaRegister": "Registrar su empresa en EE. UU.",
    "ctaExploreCourses": "Explorar cursos de negocios",
    "servicesBadge": "Servicios corporativos",
    "servicesTitle": "Servicios empresariales integrales en los 50 estados de EE. UU.",
    "servicesSub": "Todo lo que necesita para constituir legalmente su sociedad, mantener el cumplimiento estatal y blindar la privacidad del fundador.",
    "whyBadge": "Por qué lo recomendamos",
    "whyTitle": "Infraestructura propia y soporte especializado directo",
    "whySub": "Por qué miles de emprendedores confían en Registered Agents Inc antes que en portales intermediarios.",
    "stepsBadge": "Paso a paso",
    "stepsTitle": "Cómo constituir su empresa en Estados Unidos",
    "stepsSub": "Siga nuestra hoja de ruta comprobada desde la selección del estado hasta la obtención de su certificado oficial de constitución.",
    "faqsBadge": "Preguntas frecuentes",
    "faqsTitle": "Respuestas claras a sus dudas legales",
    "faqsSub": "Información certera sobre el agente registrado, propiedad para no residentes y normativas de cumplimiento federal.",
    "ctaBottomTitle": "¿Listo para constituir su negocio en EE. UU.?",
    "ctaBottomDesc": "Establezca una presencia corporativa reconocida con oficinas locales registradas en cualquiera de los 50 estados.",
    "ctaBottomBtn": "Comenzar con Registered Agents Inc",
    "services": [
      {
        "title": "Agente registrado en los 50 estados",
        "desc": "La legislación de cada estado exige que toda entidad cuente con un agente registrado con dirección física local para recibir notificaciones judiciales y evitar que su dirección personal figure en registros públicos.",
        "badge": "Requisito legal esencial"
      },
      {
        "title": "Constitución de LLC y Corporaciones",
        "desc": "Servicio integral de registro en cualquier estado (incluidos Wyoming, Delaware y Florida) con redacción de estatutos y presentación conforme a la normativa legal.",
        "badge": "Creación de sociedad"
      },
      {
        "title": "Asesoría e informes FinCEN BOI",
        "desc": "A raíz de recientes sentencias judiciales federales y actualizaciones de FinCEN, muchas empresas nacionales de EE. UU. están actualmente exentas o disfrutan de plazos suspendidos para el reporte de Beneficiario Final (BOI), mientras que ciertas empresas extranjeras siguen sujetas a declaración. El proveedor vigila la normativa y ayuda en el reporte según corresponda por ley.",
        "badge": "Cumplimiento federal"
      },
      {
        "title": "Informes anuales y mantenimiento de buen estado legal",
        "desc": "Los estados exigen reportes anuales para mantener activa la empresa. El equipo supervisa los vencimientos y presenta los informes a tiempo para evitar sanciones.",
        "badge": "Trámites periódicos"
      },
      {
        "title": "Digitalización de correspondencia en el mismo día",
        "desc": "Las notificaciones legales y documentos gubernamentales oficiales se escanean el mismo día de su recepción y se cargan a su panel seguro en la nube, accesible desde cualquier lugar.",
        "badge": "Acceso instantáneo"
      },
      {
        "title": "Paquete de identidad corporativa y privacidad",
        "desc": "Infraestructura empresarial completa que incluye línea telefónica profesional con prefijo local, dominio web, reenvío de correos y uso de dirección comercial.",
        "badge": "Infraestructura privada"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Oficinas físicas y personal propio en los 50 estados",
        "desc": "A diferencia de servicios que subcontratan a terceros, Registered Agents Inc dispone de oficinas físicas y equipos propios en cada estado estadounidense."
      },
      {
        "title": "Protección total de su dirección personal",
        "desc": "En los documentos públicos permitidos por ley se inscribe la dirección comercial del agente, manteniendo su domicilio privado fuera del alcance de terceros."
      },
      {
        "title": "Procesamiento de documentos el mismo día",
        "desc": "Las notificaciones judiciales y requerimientos fiscales se procesan y suben a su cuenta el mismo día hábil con alertas automáticas por correo y SMS."
      },
      {
        "title": "Tarifas transparentes sin costes imprevistos",
        "desc": "Sin sobrecostes en las renovaciones anuales: tarifas de agente registrado y tasas oficiales del estado claras y sin sorpresas desde el primer día."
      },
      {
        "title": "Panel de control moderno e intuitivo",
        "desc": "Administre múltiples sociedades mercantiles, acceda a los documentos escaneados y supervise su calendario de cumplimiento en una sola interfaz."
      },
      {
        "title": "Fundadores internacionales bienvenidos",
        "desc": "No necesita tener ciudadanía estadounidense ni número de seguridad social (SSN) para crear una sociedad en EE. UU.; proceso de alta ágil para inversores globales."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Seleccione el tipo de entidad y el estado",
        "desc": "Elija entre una LLC (ideal por su flexibilidad fiscal) o una C-Corporation (adecuada para rondas de capital riesgo). Destacan Wyoming y Delaware."
      },
      {
        "step": "02",
        "title": "Designe a Registered Agents Inc",
        "desc": "Designe a la compañía como su agente oficial para garantizar una dirección legal válida y resguardar su domicilio particular."
      },
      {
        "step": "03",
        "title": "Presentación de los estatutos de constitución",
        "desc": "Especialistas redactan y presentan los Artículos de Organización ante la Secretaría de Estado correspondiente para obtener el certificado oficial."
      },
      {
        "step": "04",
        "title": "Mantenga su empresa 100% al día",
        "desc": "Revise las notificaciones digitalizadas, presente los informes anuales obligatorios y manténgase al día con las exigencias de FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "¿Qué es un Agente Registrado y por qué es obligatorio por ley?",
        "a": "Un Agente Registrado es una persona física o jurídica debidamente autorizada para recibir notificaciones judiciales y correspondencia oficial en nombre de su compañía. La ley estadounidense exige que toda LLC o Corporación cuente con un agente con dirección física en el estado donde se constituyó."
      },
      {
        "q": "¿Pueden los emprendedores no residentes en EE. UU. constituir una sociedad?",
        "a": "Sí. Las personas no residentes pueden ser propietarios del 100% de una empresa estadounidense (como una LLC) y gestionarla completamente por internet desde cualquier parte del mundo."
      },
      {
        "q": "¿Es obligatorio actualmente para todas las empresas presentar el informe FinCEN BOI?",
        "a": "No. Tras resoluciones judiciales federales y disposiciones actualizadas de FinCEN, muchas empresas nacionales de EE. UU. se encuentran exentas temporalmente o con plazos paralizados, mientras que ciertas entidades extranjeras continúan sujetas a presentación obligatoria. El agente asiste en la presentación en caso de ser exigible por ley."
      },
      {
        "q": "¿Supone un coste adicional utilizar el enlace de Safi Academy?",
        "a": "No. Las tarifas son exactamente las mismas e incluso pueden incluir promociones especiales. Safi Academy puede percibir una comisión de afiliación que nos ayuda a ofrecer formación gratuita."
      },
      {
        "q": "¿Cómo protege el agente la privacidad del emprendedor?",
        "a": "En los registros públicos oficiales se hace constar la dirección comercial del agente en lugar de su domicilio residencial particular, manteniendo además una estricta política de confidencialidad que prohíbe la cesión de datos a terceros."
      }
    ],
    "phaseLabel": "Fase",
    "disclaimerBottom": "* Registered Agents Inc es un proveedor independiente. Safi Academy no es un bufete de abogados y no presta asesoría fiscal ni jurídica formal. Consulte su sitio web oficial para conocer las opciones disponibles.",
    "cardEntityStatus": "Estado de la sociedad",
    "cardShieldTitle": "Blindaje corporativo en EE. UU.",
    "cardActiveBadge": "Activa",
    "cardAgentTitle": "Agente registrado",
    "cardAgentSub": "Cobertura en los 50 estados",
    "cardPrivacyTitle": "Privacidad del domicilio",
    "cardPrivacySub": "Dirección personal blindada (conforme a la ley)",
    "cardBoiTitle": "Guía FinCEN BOI",
    "cardBoiSub": "Monitoreo de exenciones federales",
    "cardMailTitle": "Buzón digital en la nube",
    "cardMailSub": "Digitalización en el mismo día",
    "cardFootnote": "Recomendado por Safi Academy para emprendedores globales y locales."
  },
  "zh": {
    "isRtl": false,
    "partnerDisclosure": "商业伙伴与监管合规披露：",
    "disclosureText": "Safi Academy 为创业者提供独立的教育课程与资源支持。当您通过我们的推荐链接在 Registered Agents Inc 注册或购买企业服务时，我们可能会获得推广佣金，您无需为此承担任何额外费用。我们仅推荐完全符合数据隐私安全、全美服务可靠性与法律合规标准的高品质供应商。",
    "heroBadge": "全美备受推崇的企业设立与注册代理服务商",
    "heroTitle1": "设立并全方位保护您的",
    "heroTitle2": "美国公司",
    "heroDesc": "无论您是创立全球化初创企业的国际创始人，还是开拓美国本土市场的企业家，正规健全的公司架构都是事业成功的基石。Safi Academy 官方推荐 Registered Agents Inc，为您提供全美50州法定注册代理人、LLC/股份有限公司设立以及长效合规监管保障。",
    "ctaRegister": "立即注册您的美国公司",
    "ctaExploreCourses": "浏览商业与法律课程",
    "servicesBadge": "全方位企业服务",
    "servicesTitle": "覆盖全美 50 州的一站式公司法务与运营服务",
    "servicesSub": "为您提供合法设立公司、维护州级合规状态及全方位保护创始人隐私所需的一切专业工具。",
    "whyBadge": "为什么选择我们推荐的服务",
    "whyTitle": "自营全美实体网点与专属专家支持",
    "whySub": "探寻数以万计的创业者为何选择直属自营的 Registered Agents Inc，而非层层加价的第三方中介。",
    "stepsBadge": "分步设立指南",
    "stepsTitle": "如何规范高效地成立您的美国公司",
    "stepsSub": "遵循我们经过实战检验的标准流程：从选定注册州与公司类型，到获得州政府官方颁发的设立证书。",
    "faqsBadge": "常见问题解答",
    "faqsTitle": "为您解答关于美国公司设立的核心法务疑问",
    "faqsSub": "详细解析注册代理人法定义务、非美国居民持股政策以及联邦合规申报的最新要求。",
    "ctaBottomTitle": "准备好开启您的美国商业旅程了吗？",
    "ctaBottomDesc": "通过全美50州本土正规注册办事处，树立权威可靠的跨国企业品牌形象。",
    "ctaBottomBtn": "立即携手 Registered Agents Inc 启航",
    "services": [
      {
        "title": "全美 50 州法定注册代理人 (Registered Agent)",
        "desc": "美国各州法律强制要求每家公司在注册州拥有常设实体街道地址的法定注册代理人，负责签收官方司法传票与政府信件，有效防止您的私人家庭住址在州公开记录中曝光。",
        "badge": "法定强制要求"
      },
      {
        "title": "LLC 及股份公司 (Corporation) 设立",
        "desc": "在全美任意州（包括怀俄明州、特拉华州和佛罗里达州等主流商业州）提供全流程公司设立，专业撰写组织章程并递交州务卿官方审批。",
        "badge": "公司主体架构"
      },
      {
        "title": "FinCEN BOI 最终实益拥有人申报合规指导",
        "desc": "根据美国联邦法院最新判决及金融犯罪执法网络 (FinCEN) 的监管通告，目前众多美国本土注册企业享有豁免或暂缓申报实益拥有人信息 (BOI)，而部分特定外国企业仍须按期申报。该机构持续追踪官方动态并在依法适用的情况下协助办理合规手续。",
        "badge": "联邦合规保障"
      },
      {
        "title": "年度报告递交与良好存续状态 (Good Standing) 维持",
        "desc": "各州要求企业定期递交年度报告以维持法定有效存续。专业团队精准把控申报截止日期，自动协助提交报表，规避高额罚金与执照注销风险。",
        "badge": "州级例行业务"
      },
      {
        "title": "政府来信当天极速数字化扫描上云",
        "desc": "法院传票、税务账单及州政府官方函件在送达当天即完成高精度扫描，并实时上传至高安全加密云端控制台，让您无论身处世界何地皆可实时查阅。",
        "badge": "实时即刻查阅"
      },
      {
        "title": "商务企业形象与创始人隐私尊享套件",
        "desc": "配备包含本地州区号的专属企业商务电话、官方域名、邮件转发及商用办公地址授权，彻底将企业业务与个人隐私进行物理隔离。",
        "badge": "隐私安全套件"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "全美 50 州均设立自营实体办事处与专职团队",
        "desc": "不同于将订单外包的转包中介网站，Registered Agents Inc 在全美各个州均拥有真正属于自己的物理办公场所与常驻专业员工。"
      },
      {
        "title": "依法默认最大化保护创始人家庭住址隐私",
        "desc": "在州政府法律允许的公开备案文书中，均填报代理人商业办公地址，避免您的私人住宅地址被网络爬虫、广告推销商与公开名录收录。"
      },
      {
        "title": "法律司法文书送达当天极速处理",
        "desc": "传票与重要公函在签收当天立即处理扫描，并通过安全邮件与短信通知极速告知，确保您不会错失任何法定答辩期限。"
      },
      {
        "title": "收费公开透明，绝无隐形加价与续费套路",
        "desc": "坚决拒绝第一年超低价引流而在次年强制翻倍扣费的陷阱，注册代理人年费与各州政府规费开诚布公，账目清晰。"
      },
      {
        "title": "工业级全功能企业管理客户控制台",
        "desc": "现代化控制面板，支持同时高效管理多家公司、统一查阅扫描件归档、一键开具存续证明并实时掌握合规申报日历。"
      },
      {
        "title": "全面拥抱并支持国际创始人全球化创业",
        "desc": "无需拥有美国公民身份或美国社安号 (SSN) 即可合法注册并全资拥有美国企业，为全球跨国创业者提供丝滑高效的身份核验服务。"
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "选定公司类型与注册州",
        "desc": "在灵活税收穿透的有限责任公司 (LLC) 与适合风险投资的 C-Corporation 之间做出战略抉择；主流推荐怀俄明州（隐私保护好、规费低）与特拉华州（商业法体系完善）。"
      },
      {
        "step": "02",
        "title": "指定 Registered Agents Inc 为法定代理人",
        "desc": "委任该专业机构为您的法定注册代理人，在州务卿公开记录中合法提供实体街道地址，有力保障个人家庭隐私。"
      },
      {
        "step": "03",
        "title": "提交公司组织章程 (Articles of Organization)",
        "desc": "资深团队规范起草设立文件并向所在州州务卿官方系统进行正式申报，取得带有州政府公章的正式设立证书与执照。"
      },
      {
        "step": "04",
        "title": "确保持续合规与常态化稳健经营",
        "desc": "实时接收数字化公函扫描件，按时递交州级年审报告，紧跟 FinCEN BOI 最前沿政策，确保企业始终处于良好合法状态。"
      }
    ],
    "faqs": [
      {
        "q": "什么是法定注册代理人 (Registered Agent)？为何法律强制要求？",
        "a": "注册代理人是代表您的公司正式签收法律司法传票与州政府官方通知的法定责任人或正规法人机构。美国各州法律明文规定，每家有限责任公司 (LLC) 或股份有限公司必须在其设立的州境内拥有一个具备真实物理街道地址的注册代理人。"
      },
      {
        "q": "非美国居民（国际创始人）是否能够使用本服务在美国注册公司？",
        "a": "完全可以。非美国居民依法可以 100% 全资拥有并合法设立美国企业（例如有限责任公司 LLC）。该机构提供所需的实体法定地址，并将全部公函扫描至在线平台，支持您在世界任何角落远程管理。"
      },
      {
        "q": "目前是否所有美国公司都必须强制提交 FinCEN BOI 实益所有权报告？",
        "a": "并非如此。由于美国联邦法院的一系列最新判决与 FinCEN 官方的政策调适，目前多数美国本土新设或既有企业暂时享有豁免或中止执行，而部分外国申报实体依然须按要求合规披露。专业机构会持续监控政策并在依法需要时提供合规申报支持。"
      },
      {
        "q": "通过 Safi Academy 推荐链接办理是否会产生任何额外费用？",
        "a": "绝无任何额外费用。价格与官方完全一致，甚至可享受合作专享优惠方案。Safi Academy 可能会从服务商处获得少许推荐佣金，这将专项用于持续支持我们为大众提供优质免费的开源教育课程。"
      },
      {
        "q": "Registered Agents Inc 如何全方位保护公司创始人的隐私安全？",
        "a": "在法律法规允许的公开州政府备案记录中，代理人允许使用其正规商用注册地址替代您的私人住宅地址；此外，该公司秉持最高职业道德准则，严禁向任何第三方商业机构出售客户个人信息。"
      }
    ],
    "phaseLabel": "阶段",
    "disclaimerBottom": "* Registered Agents Inc 是独立的商业服务机构。Safi Academy 并非律师事务所，不提供官方的税务或法律顾问服务。有关州务卿具体申请细则，请参阅其官方网站。",
    "cardEntityStatus": "公司存续状态",
    "cardShieldTitle": "全美企业合规护盾",
    "cardActiveBadge": "有效激活",
    "cardAgentTitle": "法定注册代理人",
    "cardAgentSub": "全美 50 州实体网络全覆盖",
    "cardPrivacyTitle": "个人住所隐私保护",
    "cardPrivacySub": "依法隔绝公开住宅地址",
    "cardBoiTitle": "FinCEN BOI 实益所有权指南",
    "cardBoiSub": "联邦豁免与法条动态追踪",
    "cardMailTitle": "云端极速数字化收发室",
    "cardMailSub": "送达当日高清扫描上云",
    "cardFootnote": "Safi Academy 官方推荐，专为全球跨境创业者量身打造。"
  },
  "hi": {
    "isRtl": false,
    "partnerDisclosure": "साझेदारी और नियामक अनुपालन प्रकटीकरण:",
    "disclosureText": "साफ़ी अकादमी उद्यमियों के लिए स्वतंत्र शैक्षिक पाठ्यक्रम और संसाधन प्रदान करती है। जब आप Registered Agents Inc के हमारे रेफरल लिंक के माध्यम से पंजीकरण करते हैं या सेवाएं खरीदते हैं, तो हमें आपसे बिना किसी अतिरिक्त लागत के एक संबद्ध कमीशन प्राप्त हो सकता है। हम केवल उन स्थापित सेवा प्रदाताओं की सिफारिश करते हैं जो डेटा गोपनीयता और कानूनी विश्वसनीयता के उच्च मानकों को पूरा करते हैं।",
    "heroBadge": "अमेरिका में कंपनी पंजीकरण के लिए अनुशंसित कॉर्पोरेट सेवा प्रदाता",
    "heroTitle1": "अपनी अमेरिकी कंपनी को",
    "heroTitle2": "पंजीकृत और सुरक्षित करें",
    "heroDesc": "चाहे आप एक अंतरराष्ट्रीय संस्थापक हों जो वैश्विक स्टार्टअप लॉन्च कर रहे हैं, या अमेरिकी बाजार में विस्तार करने वाले उद्यमी; एक मजबूत कानूनी कॉर्पोरेट आधार अत्यंत आवश्यक है। साफ़ी अकादमी सभी 50 राज्यों में पंजीकृत एजेंट प्रतिनिधित्व, LLC/निगम गठन और निरंतर कानूनी अनुपालन के लिए Registered Agents Inc की सिफारिश करती है।",
    "ctaRegister": "अपनी अमेरिकी कंपनी पंजीकृत करें",
    "ctaExploreCourses": "बिजनेस पाठ्यक्रम देखें",
    "servicesBadge": "कॉर्पोरेट सेवाएं",
    "servicesTitle": "अमेरिका के सभी 50 राज्यों में व्यापक व्यावसायिक सेवाएं",
    "servicesSub": "कंपनी को कानूनी रूप से स्थापित करने, राज्य अनुपालन बनाए रखने और संस्थापकों की गोपनीयता सुरक्षित रखने के लिए आवश्यक सभी सुविधाएं।",
    "whyBadge": "हम इसकी अनुशंसा क्यों करते हैं",
    "whyTitle": "प्रत्यक्ष बुनियादी ढांचा और समर्पित विशेषज्ञ सहायता",
    "whySub": "हजारों उद्यमी तीसरे पक्ष के बिचौलियों के बजाय सीधे Registered Agents Inc पर भरोसा क्यों करते हैं।",
    "stepsBadge": "चरण-दर-चरण",
    "stepsTitle": "अमेरिका में अपनी कंपनी कैसे बनाएं",
    "stepsSub": "राज्य और कंपनी के प्रकार के चयन से लेकर आधिकारिक प्रमाणपत्र प्राप्त करने तक हमारे सिद्ध रोडमैप का पालन करें।",
    "faqsBadge": "अक्सर पूछे जाने वाले प्रश्न",
    "faqsTitle": "कानूनी और कॉर्पोरेट सवालों के स्पष्ट उत्तर",
    "faqsSub": "पंजीकृत एजेंट, गैर-अमेरिकी नागरिकों के स्वामित्व और संघीय अनुपालन अनिवार्यताओं पर सटीक जानकारी।",
    "ctaBottomTitle": "क्या आप अमेरिका में अपना व्यवसाय शुरू करने के लिए तैयार हैं?",
    "ctaBottomDesc": "सभी 50 अमेरिकी राज्यों में स्थानीय पंजीकृत कार्यालयों के साथ अपनी सम्मानित कॉर्पोरेट पहचान स्थापित करें।",
    "ctaBottomBtn": "Registered Agents Inc के साथ शुरुआत करें",
    "services": [
      {
        "title": "सभी 50 राज्यों में पंजीकृत एजेंट (Registered Agent)",
        "desc": "अमेरिकी कानून के अनुसार हर कंपनी के पास गठन के राज्य में भौतिक पते वाला एक पंजीकृत एजेंट होना अनिवार्य है, ताकि कानूनी नोटिस स्वीकार किए जा सकें और आपके घर का व्यक्तिगत पता सार्वजनिक रिकॉर्ड में आने से बच सके।",
        "badge": "प्रमुख कानूनी अनिवार्यता"
      },
      {
        "title": "LLC और कॉर्पोरेशन का पूर्ण गठन",
        "desc": "वायोमिंग, डेलावेयर और फ्लोरिडा सहित किसी भी अमेरिकी राज्य में नियमों के अनुसार आर्टिकल्स ऑफ ऑर्गनाइजेशन और कानूनी दस्तावेज तैयार कर कंपनी का गठन।",
        "badge": "कंपनी की स्थापना"
      },
      {
        "title": "FinCEN BOI मार्गदर्शन और अपडेट",
        "desc": "संघीय अदालती फैसलों और FinCEN नियमों के अनुसार, वर्तमान में कई घरेलू अमेरिकी कंपनियों को लाभकारी स्वामित्व जानकारी (BOI) रिपोर्टिंग से छूट प्राप्त है या समयसीमा रोक दी गई है, जबकि कुछ विदेशी कंपनियां रिपोर्टिंग के अधीन हैं। यह एजेंसी नियमों पर नजर रखती है और आवश्यकता पड़ने पर सहायता प्रदान करती है।",
        "badge": "संघीय अनुपालन"
      },
      {
        "title": "वार्षिक रिपोर्ट और गुड स्टैंडिंग नवीनीकरण",
        "desc": "कंपनियों को सक्रिय रखने के लिए राज्यों को वार्षिक रिपोर्ट की आवश्यकता होती है। यह सेवा समयसीमा पर नजर रखती है और जुर्माने से बचने के लिए समय पर दस्तावेज जमा करती है।",
        "badge": "राज्य फाइलिंग"
      },
      {
        "title": "उसी दिन पत्रों की डिजिटल स्कैनिंग",
        "desc": "कानूनी नोटिस और आधिकारिक सरकारी दस्तावेज मिलने के दिन ही स्कैन किए जाते हैं और आपके सुरक्षित ऑनलाइन डैशबोर्ड पर अपलोड कर दिए जाते हैं ताकि आप दुनिया में कहीं से भी उन तक पहुंच सकें।",
        "badge": "त्वरित पहुंच"
      },
      {
        "title": "व्यावसायिक पहचान और गोपनीयता सुइट",
        "desc": "स्थानीय एरिया कोड वाला फोन नंबर, डोमेन नाम, ईमेल अग्रेषण और व्यावसायिक पते के उपयोग सहित पूर्ण कॉर्पोरेट ढांचा।",
        "badge": "गोपनीयता अवसंरचना"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "सभी 50 राज्यों में वास्तविक भौतिक कार्यालय और समर्पित कर्मचारी",
        "desc": "अन्य मध्यस्थ वेबसाइटों के विपरीत जो काम दूसरों को सौंपती हैं, Registered Agents Inc के पास हर राज्य में अपने भौतिक कार्यालय और स्थानीय टीमें हैं।"
      },
      {
        "title": "संस्थापक के व्यक्तिगत पते की पूर्ण सुरक्षा",
        "desc": "कानून द्वारा अनुमत सार्वजनिक रिकॉर्ड में उनके वाणिज्यिक कार्यालय का पता दर्ज किया जाता है, जिससे आपका आवासीय पता सार्वजनिक सूचियों से सुरक्षित रहता है।"
      },
      {
        "title": "दस्तावेजों का उसी दिन प्रसंस्करण और स्कैनिंग",
        "desc": "अदالती समन और आधिकारिक कर नोटिस उसी कार्य दिवस में स्कैन किए जाते हैं और ईमेल तथा एसएमएस अलर्ट के साथ आपको प्रदान किए जाते हैं।"
      },
      {
        "title": "पारदर्शी मूल्य निर्धारण बिना किसी छिपे हुए शुल्क के",
        "desc": "नवीनीकरण के समय कोई आश्चर्यजनक अतिरिक्त शुल्क नहीं है; वार्षिक एजेंट दरें और राज्य फाइलिंग शुल्क पहले दिन से पूरी तरह स्पष्ट हैं।"
      },
      {
        "title": "आधुनिक और सुव्यवस्थित कॉर्पोरेट डैशबोर्ड",
        "desc": "एक ही पोर्टल पर कई कंपनियों का प्रबंधन करें, स्कैन किए गए पत्र देखें और कानूनी अनुपालन कैलेंडर की आसानी से निगरानी करें।"
      },
      {
        "title": "अंतरराष्ट्रीय संस्थापकों का स्वागत",
        "desc": "अमेरिकी कंपनी स्थापित करने के लिए आपको अमेरिकी नागरिकता या SSN की आवश्यकता नहीं है; विश्व भर के उद्यमियों के लिए सत्यापन प्रक्रिया बेहद सरल है।"
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "कंपनी का प्रकार और राज्य चुनें",
        "desc": "LLC (कर लचीलेपन के लिए) या C-Corp (वेंचर कैपिटल निवेश के लिए) में से चुनें। वायोमिंग और डेलावेयर सबसे पसंदीदा राज्य हैं।"
      },
      {
        "step": "02",
        "title": "Registered Agents Inc को नियुक्त करें",
        "desc": "सरकारी रिकॉर्ड में अपना कानूनी भौतिक पता सुरक्षित करने और व्यक्तिगत पते की गोपनीयता बनाए रखने के लिए कंपनी को आधिकारिक एजेंट बनाएं।"
      },
      {
        "step": "03",
        "title": "गठन दस्तावेज (Articles) दाखिल करें",
        "desc": "विशेषज्ञ आपके गठन दस्तावेज तैयार करके राज्य के सेक्रेटरी ऑफ स्टेट को प्रस्तुत करते हैं और कंपनी का आधिकारिक चार्टर प्राप्त करते हैं।"
      },
      {
        "step": "04",
        "title": "कंपनी को 100% अनुपालक और सक्रिय रखें",
        "desc": "डिजिटल पत्र प्राप्त करें, समय पर वार्षिक रिपोर्ट दाखिल करें और FinCEN BOI से संबंधित नियमों का अनुपालन बनाए रखें।"
      }
    ],
    "faqs": [
      {
        "q": "पंजीकृत एजेंट क्या है और यह कानूनी रूप से क्यों अनिवार्य है?",
        "a": "पंजीकृत एजेंट एक अधिकृत व्यक्ति या इकाई है जो आपकी कंपनी की ओर से कानूनी अदालती नोटिस और राज्य के पत्राचार स्वीकार करने के लिए जिम्मेदार होता है। अमेरिकी कानून हर कंपनी के लिए गठन के राज्य में भौतिक पते वाले एजेंट का होना अनिवार्य बनाता है।"
      },
      {
        "q": "क्या गैर-अमेरिकी निवासी उद्यमी इस सेवा का उपयोग कर कंपनी बना सकते हैं?",
        "a": "हाँ। गैर-अमेरिकी निवासी कानूनी रूप से अमेरिकी व्यवसाय (जैसे LLC) के 100% मालिक हो सकते हैं और इंटरनेट के माध्यम से दुनिया के किसी भी कोने से इसे प्रबंधित कर सकते हैं।"
      },
      {
        "q": "क्या वर्तमान में सभी कंपनियों के लिए FinCEN BOI रिपोर्ट जमा करना अनिवार्य है?",
        "a": "नहीं। संघीय अदालती आदेशों और FinCEN के नए निर्देशों के अनुसार, कई अमेरिकी कंपनियों को वर्तमान में छूट प्राप्त है या समयसीमा रोक दी गई है, जबकि कुछ विदेशी कंपनियां रिपोर्टिंग के लिए बाध्य हैं। यह सेवा आवश्यक होने पर फाइलिंग में सहायता करती है।"
      },
      {
        "q": "क्या साफ़ी अकादमी के लिंक का उपयोग करने से अतिरिक्त लागत आती है?",
        "a": "नहीं। कीमतें बिल्कुल समान रहती हैं और अक्सर छूट भी शामिल होती है। साफ़ी अकादमी को रेफरल कमीशन मिल सकता है, जो हमारे मुफ्त शैक्षिक कार्यक्रमों को जारी रखने में मदद करता है।"
      },
      {
        "q": "Registered Agents Inc संस्थापकों की गोपनीयता की रक्षा कैसे करता है?",
        "a": "सार्वजनिक राज्य दस्तावेजों पर आपके घर के पते के बजाय उनका व्यावसायिक पता दर्ज किया जाता है, और वे ग्राहकों का डेटा किसी तीसरे पक्ष को कभी न बेचने की सख्त नीति का पालन करते हैं।"
      }
    ],
    "phaseLabel": "चरण",
    "disclaimerBottom": "* Registered Agents Inc एक स्वतंत्र सेवा प्रदाता है। साफ़ी अकादमी कोई लॉ फर्म नहीं है और कानूनी या कर सलाह प्रदान नहीं करती है। राज्य फाइलिंग के लिए कृपया उनकी आधिकारिक वेबसाइट देखें।",
    "cardEntityStatus": "संस्था की कानूनी स्थिति",
    "cardShieldTitle": "अमेरिकी कॉर्पोरेट सुरक्षा कवच",
    "cardActiveBadge": "सक्रिय",
    "cardAgentTitle": "पंजीकृत एजेंट",
    "cardAgentSub": "सभी 50 अमेरिकी राज्यों में कवरेज",
    "cardPrivacyTitle": "पते की गोपनीयता",
    "cardPrivacySub": "व्यक्तिगत पता सुरक्षित (कानून के दायरे में)",
    "cardBoiTitle": "FinCEN BOI मार्गदर्शन",
    "cardBoiSub": "संघीय छूट और नियमों की निगरानी",
    "cardMailTitle": "डिजिटल मेलरूम",
    "cardMailSub": "उसी दिन ऑनलाइन स्कैनिंग",
    "cardFootnote": "अंतरराष्ट्रीय और स्थानीय उद्यमियों के लिए साफ़ी अकादमी द्वारा अनुशंसित।"
  },
  "it": {
    "isRtl": false,
    "partnerDisclosure": "Divulgazione di partnership e conformità normativa:",
    "disclosureText": "Safi Academy fornisce corsi educativi e risorse indipendenti per gli imprenditori. Quando ti registri o acquisti servizi tramite i nostri link di riferimento verso Registered Agents Inc, potremmo ricevere una commissione di affiliazione senza alcun costo aggiuntivo per te. Raccomandiamo esclusivamente fornitori consolidati che soddisfano i nostri rigorosi criteri di riservatezza dei dati e conformità legale.",
    "heroBadge": "Fornitore consigliato per la costituzione di società negli Stati Uniti",
    "heroTitle1": "Costituisci e proteggi la tua",
    "heroTitle2": "società negli Stati Uniti",
    "heroDesc": "Che tu sia un fondatore internazionale che lancia una startup globale o un imprenditore che si espande nel mercato statunitense, una corretta struttura societaria è fondamentale. Safi Academy raccomanda Registered Agents Inc per la rappresentanza di agente registrato in tutti i 50 stati, costituzione di LLC/Corporation e conformità normativa continua.",
    "ctaRegister": "Registra la tua azienda negli USA",
    "ctaExploreCourses": "Esplora i corsi di business",
    "servicesBadge": "Servizi aziendali",
    "servicesTitle": "Servizi societari completi in tutti i 50 stati degli USA",
    "servicesSub": "Tutto il necessario per costituire legalmente, mantenere la conformità statale e proteggere la privacy del fondatore.",
    "whyBadge": "Perché lo raccomandiamo",
    "whyTitle": "Infrastruttura diretta e supporto specialistico dedicato",
    "whySub": "Perché migliaia di imprenditori scelgono Registered Agents Inc anziché portali di rivendita terzi.",
    "stepsBadge": "Passo dopo passo",
    "stepsTitle": "Come costituire la tua società negli Stati Uniti",
    "stepsSub": "Segui il nostro piano d'azione collaudato dalla selezione dello stato fino all'ottenimento dell'attestato societario ufficiale.",
    "faqsBadge": "Domande frequenti",
    "faqsTitle": "Risposte chiare alle tue domande legali",
    "faqsSub": "Informazioni trasparenti su agente registrato, proprietà per non residenti e obblighi di conformità federale.",
    "ctaBottomTitle": "Pronto a costituire la tua azienda negli Stati Uniti?",
    "ctaBottomDesc": "Crea una presenza aziendale autorevole con uffici registrati locali in qualsiasi dei 50 stati USA.",
    "ctaBottomBtn": "Inizia con Registered Agents Inc",
    "services": [
      {
        "title": "Agente registrato in tutti i 50 stati",
        "desc": "La legge statunitense impone a ogni entità un agente registrato con un indirizzo civico fisico nello stato di costituzione per ricevere atti legali e impedire che il tuo indirizzo di residenza diventi pubblico.",
        "badge": "Requisito obbligatorio"
      },
      {
        "title": "Costituzione di LLC e Corporation",
        "desc": "Servizio completo di registrazione in qualsiasi stato USA (inclusi Wyoming, Delaware e Florida) con redazione dello statuto societario nel rispetto delle leggi statali.",
        "badge": "Costituzione societaria"
      },
      {
        "title": "Guida e dichiarazioni FinCEN BOI",
        "desc": "In seguito alle recenti sentenze dei tribunali federali e agli aggiornamenti di FinCEN, molte società statunitensi sono attualmente esenti o beneficiano di termini sospesi per la dichiarazione della titolarità effettiva (BOI), mentre alcune entità estere rimangono soggette a obbligo. Il servizio monitora le norme e offre assistenza se legalmente richiesto.",
        "badge": "Conformità federale"
      },
      {
        "title": "Rapporti annuali e mantenimento del Good Standing",
        "desc": "Gli stati richiedono dichiarazioni annuali per mantenere attive le imprese. Il team monitora le scadenze e compila le pratiche in tempo per prevenire sanzioni.",
        "badge": "Dichiarazioni periodiche"
      },
      {
        "title": "Scansione digitale della posta in giornata",
        "desc": "Notifiche legali e corrispondenza statale ufficiale vengono scansionate il giorno stesso dell'arrivo e caricate nella tua dashboard sicura accessibile in tutto il mondo.",
        "badge": "Accesso immediato"
      },
      {
        "title": "Pacchetto identità aziendale e riservatezza",
        "desc": "Infrastruttura professionale completa che include linea telefonica aziendale con prefisso locale, dominio, inoltro e-mail e utilizzo di indirizzo commerciale.",
        "badge": "Suite di riservatezza"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Uffici fisici e dipendenti diretti in tutti i 50 stati",
        "desc": "A differenza dei portali che subappaltano a terzi, Registered Agents Inc dispone di uffici reali e personale proprio in ciascuno stato degli Stati Uniti."
      },
      {
        "title": "Totale protezione dell'indirizzo di casa del fondatore",
        "desc": "Nei registri pubblici previsti dalla legge viene indicato il loro indirizzo commerciale, preservando la tua residenza privata da elenchi pubblici e pubblicità."
      },
      {
        "title": "Elaborazione dei documenti nello stesso giorno",
        "desc": "Atti giudiziari e comunicazioni fiscali ufficiali vengono elaborati il giorno stesso della notifica con avvisi automatici via email e SMS."
      },
      {
        "title": "Prezzi trasparenti senza costi nascosti al rinnovo",
        "desc": "Nessuna sorpresa con rincari nei rinnovi annuali: i costi per i servizi di agente registrato e le tasse statali sono chiari fin dal primo giorno."
      },
      {
        "title": "Dashboard aziendale moderna e intuitiva",
        "desc": "Un centro di controllo per gestire molteplici società, consultare i documenti scansionati e monitorare il calendario degli obblighi di conformità."
      },
      {
        "title": "Fondatori internazionali benvenuti",
        "desc": "Non è necessaria la cittadinanza statunitense né il codice SSN per avviare la tua azienda negli USA: verifica dell'identità rapida per imprenditori globali."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Scegli tipo di entità e stato",
        "desc": "Scegli tra LLC (flessibilità e tassazione pass-through) o C-Corp (ideale per raccogliere venture capital). Wyoming e Delaware sono tra i più gettonati."
      },
      {
        "step": "02",
        "title": "Nomina Registered Agents Inc",
        "desc": "Indica la società come agente ufficiale per assicurare una presenza fisica a norma e salvaguardare il tuo indirizzo personale di residenza."
      },
      {
        "step": "03",
        "title": "Presenta gli Articles of Organization",
        "desc": "Esperti legali redigono e depositano i documenti di costituzione presso la Segreteria di Stato per ottenere il certificato societario ufficiale."
      },
      {
        "step": "04",
        "title": "Resta al 100% in regola con le norme",
        "desc": "Ricevi le scansioni della posta, presenta i report annuali in tempo e segui gli aggiornamenti sulle regole di conformità FinCEN BOI."
      }
    ],
    "faqs": [
      {
        "q": "Cos'è un Agente Registrato e perché è obbligatorio per legge?",
        "a": "Un Agente Registrato è una persona fisica o giuridica autorizzata a ricevere notifiche legali e corrispondenza statale ufficiale per conto della tua azienda. La legge statunitense impone che ogni LLC o Corporation abbia un agente con un indirizzo civico nello stato di costituzione."
      },
      {
        "q": "I fondatori internazionali (non residenti) possono utilizzare questo servizio?",
        "a": "Sì. I soggetti non residenti negli USA possono legalmente possedere il 100% di una società statunitense (come una LLC) e gestirla interamente online da qualsiasi paese."
      },
      {
        "q": "Tutte le società devono presentare attualmente il report FinCEN BOI?",
        "a": "No. A seguito delle sentenze dei tribunali federali e dei chiarimenti di FinCEN, molte entità statunitensi sono attualmente esenti o con scadenze sospese, mentre alcune società estere restano tenute alla dichiarazione. Il servizio offre assistenza nei casi previsti dalla legge."
      },
      {
        "q": "L'utilizzo del link Safi Academy comporta costi aggiuntivi?",
        "a": "No. Le tariffe sono esattamente identiche e possono includere sconti promozionali. Safi Academy potrebbe ricevere una commissione di affiliazione utile a sostenere i nostri corsi gratuiti."
      },
      {
        "q": "In che modo l'agente protegge la privacy del fondatore?",
        "a": "Nei registri pubblici statali viene inserito l'indirizzo dell'ufficio commerciale dell'agente al posto della tua abitazione personale, con l'impegno assoluto di non vendere mai i dati a terzi."
      }
    ],
    "phaseLabel": "Fase",
    "disclaimerBottom": "* Registered Agents Inc è un fornitore di servizi indipendente. Safi Academy non è uno studio legale e non fornisce consulenza fiscale o giuridica. Per i dettagli visita il loro sito web ufficiale.",
    "cardEntityStatus": "Stato dell'entità",
    "cardShieldTitle": "Scudo aziendale USA",
    "cardActiveBadge": "Attivo",
    "cardAgentTitle": "Agente registrato",
    "cardAgentSub": "Copertura in tutti i 50 stati USA",
    "cardPrivacyTitle": "Riservatezza dell'indirizzo",
    "cardPrivacySub": "Residenza protetta (ove consentito dalla legge)",
    "cardBoiTitle": "Guida FinCEN BOI",
    "cardBoiSub": "Monitoraggio esenzioni e norme federali",
    "cardMailTitle": "Ufficio postale digitale",
    "cardMailSub": "Scansione online in giornata",
    "cardFootnote": "Raccomandato da Safi Academy per fondatori internazionali e locali."
  },
  "pt": {
    "isRtl": false,
    "partnerDisclosure": "Divulgação de parceria e conformidade regulatória:",
    "disclosureText": "A Safi Academy oferece cursos educacionais e recursos independentes para empreendedores. Ao se cadastrar ou contratar serviços por meio de nossos links de indicação para a Registered Agents Inc, poderemos receber uma comissão de afiliado sem nenhum custo adicional para você. Recomendamos apenas provedores consolidados que atendam aos nossos critérios de privacidade de dados e conformidade legal.",
    "heroBadge": "Provedor recomendado para abertura de empresas nos EUA",
    "heroTitle1": "Abra e proteja sua",
    "heroTitle2": "empresa nos Estados Unidos",
    "heroDesc": "Seja você um fundador internacional lançando uma startup global ou um empreendedor expandindo para o mercado americano, uma base corporativa sólida é fundamental. A Safi Academy recomenda a Registered Agents Inc para representação de agente registrado em todos os 50 estados, abertura de LLC/Corporation e conformidade contínua.",
    "ctaRegister": "Registrar sua empresa nos EUA",
    "ctaExploreCourses": "Explorar cursos de negócios",
    "servicesBadge": "Serviços corporativos",
    "servicesTitle": "Serviços empresariais abrangentes em todos os 50 estados dos EUA",
    "servicesSub": "Tudo o que você precisa para constituir legalmente sua empresa, manter a conformidade estadual e resguardar a privacidade dos sócios.",
    "whyBadge": "Por que recomendamos",
    "whyTitle": "Infraestrutura própria e suporte especializado direto",
    "whySub": "Por que milhares de empresários confiam na Registered Agents Inc em vez de portais revendedores terceirizados.",
    "stepsBadge": "Passo a passo",
    "stepsTitle": "Como abrir sua empresa nos Estados Unidos",
    "stepsSub": "Siga nosso roteiro comprovado desde a escolha do estado até a obtenção do seu certificado oficial de constituição.",
    "faqsBadge": "Perguntas frequentes",
    "faqsTitle": "Respostas claras para suas dúvidas jurídicas",
    "faqsSub": "Informações precisas sobre agente registrado, posse de empresas por não residentes e normas federais.",
    "ctaBottomTitle": "Pronto para abrir seu negócio nos EUA?",
    "ctaBottomDesc": "Estabeleça uma presença corporativa respeitável com escritórios registrados locais em qualquer um dos 50 estados.",
    "ctaBottomBtn": "Começar com a Registered Agents Inc",
    "services": [
      {
        "title": "Agente registrado em todos os 50 estados",
        "desc": "A legislação dos EUA exige que toda entidade possua um agente registrado com endereço físico no estado de constituição para receber intimações legais e evitar que seu endereço residencial seja exposto em registros públicos.",
        "badge": "Exigência legal obrigatória"
      },
      {
        "title": "Abertura de LLC e Corporações",
        "desc": "Serviço completo de constituição em qualquer estado dos EUA (incluindo Wyoming, Delaware e Flórida), redigindo o contrato social e arquivando conforme as leis estaduais.",
        "badge": "Abertura de empresa"
      },
      {
        "title": "Orientação e declarações FinCEN BOI",
        "desc": "Com base em recentes decisões de tribunais federais e atualizações do FinCEN, muitas empresas americanas domésticas estão atualmente isentas ou têm prazos suspensos para envio do relatório de Beneficiário Efetivo (BOI), enquanto certas empresas estrangeiras continuam sujeitas à declaração. O provedor acompanha as diretrizes e auxilia no cumprimento legal.",
        "badge": "Conformidade federal"
      },
      {
        "title": "Relatórios anuais e manutenção do Good Standing",
        "desc": "Os estados exigem relatórios anuais para manter a empresa ativa. O provedor monitora os prazos e protocola os documentos a tempo de evitar multas ou cancelamentos.",
        "badge": "Obrigações anuais"
      },
      {
        "title": "Digitalização de correspondências no mesmo dia",
        "desc": "Notificações judiciais e documentos governamentais oficiais são escaneados no mesmo dia em que chegam e disponibilizados em seu painel seguro na nuvem.",
        "badge": "Acesso imediato"
      },
      {
        "title": "Pacote de identidade empresarial e privacidade",
        "desc": "Infraestrutura completa incluindo linha telefônica comercial com código local, domínio, encaminhamento de e-mails e uso de endereço comercial oficial.",
        "badge": "Privacidade corporativa"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Escritórios físicos e funcionários próprios nos 50 estados",
        "desc": "Diferente de intermediários que terceirizam os serviços, a Registered Agents Inc possui escritórios físicos reais e equipes dedicadas em cada um dos estados americanos."
      },
      {
        "title": "Proteção total do endereço de sua residência",
        "desc": "Nos registros públicos autorizados por lei, é inserido o endereço comercial do agente para manter sua casa privada longe de spams e curiosos."
      },
      {
        "title": "Processamento de documentos no mesmo dia do recebimento",
        "desc": "Intimações de processos e correspondências fiscais são digitalizadas no mesmo dia útil e enviadas com alertas imediatos por e-mail e SMS."
      },
      {
        "title": "Preços transparentes sem surpresas na renovação",
        "desc": "Sem aumentos repentinos no segundo ano: os valores do agente registrado e as taxas estaduais são claros e definidos desde o início."
      },
      {
        "title": "Painel de controle corporativo moderno e prático",
        "desc": "Gerencie múltiplas empresas, visualize documentos escaneados, solicite certidões e acompanhe prazos de conformidade em um só lugar."
      },
      {
        "title": "Acolhimento a fundadores internacionais",
        "desc": "Você não precisa de cidadania americana nem de SSN para abrir sua empresa nos Estados Unidos; verificação simplificada para empreendedores do mundo todo."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Escolha o tipo de empresa e o estado",
        "desc": "Opte por LLC (flexibilidade e transparência fiscal) ou C-Corporation (ideal para atrair investimentos de venture capital). Wyoming e Delaware são os mais procurados."
      },
      {
        "step": "02",
        "title": "Nomeie a Registered Agents Inc",
        "desc": "Designe a empresa como seu agente oficial para garantir endereço legal válido e resguardar a privacidade da sua casa."
      },
      {
        "step": "03",
        "title": "Protocolo dos documentos de constituição",
        "desc": "Especialistas elaboram e enviam os Artigos de Organização à Secretaria de Estado para emissão do seu certificado corporativo oficial."
      },
      {
        "step": "04",
        "title": "Mantenha conformidade integral e opere com calma",
        "desc": "Receba notificações digitalizadas, entregue relatórios anuais dentro do prazo e mantenha-se em dia com as normas do FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "O que é um Agente Registrado e por que ele é obrigatório por lei?",
        "a": "Um Agente Registrado é uma pessoa física ou jurídica autorizada a receber citações judiciais e correspondências oficiais do governo em nome de sua empresa. A lei americana determina que toda LLC ou Corporation mantenha um agente com endereço físico no estado de constituição."
      },
      {
        "q": "Fundadores internacionais (não residentes) podem abrir empresas nos EUA?",
        "a": "Sim. Cidadãos de outros países que não residem nos EUA podem deter legalmente 100% de uma empresa americana (como uma LLC) e administrá-la integralmente online."
      },
      {
        "q": "Todas as empresas são obrigadas a entregar o relatório FinCEN BOI agora?",
        "a": "Não. Em virtude de recentes decisões de tribunais federais e atualizações do FinCEN, muitas empresas domésticas dos EUA estão isentas no momento ou têm seus prazos suspensos, enquanto certas entidades estrangeiras continuam obrigadas. A empresa acompanha as diretrizes e ajuda no preenchimento quando legalmente exigido."
      },
      {
        "q": "Usar o link da Safi Academy gera custos adicionais para mim?",
        "a": "Não. Os preços são exatamente os mesmos e podem incluir vantagens promocionais. A Safi Academy pode receber uma comissão de indicação que nos ajuda a manter materiais educacionais gratuitos."
      },
      {
        "q": "Como a Registered Agents Inc protege a privacidade do sócio?",
        "a": "Nos registros públicos governamentais, é utilizado o endereço comercial da empresa de representação em vez do seu endereço residencial, além de uma política rigorosa que proíbe a venda de dados a terceiros."
      }
    ],
    "phaseLabel": "Fase",
    "disclaimerBottom": "* A Registered Agents Inc é uma prestadora de serviços independente. A Safi Academy não é um escritório de advocacia e não presta assessoria jurídica ou tributária. Para opções estaduais, consulte o site oficial.",
    "cardEntityStatus": "Status da sociedade",
    "cardShieldTitle": "Escudo corporativo nos EUA",
    "cardActiveBadge": "Ativo",
    "cardAgentTitle": "Agente registrado",
    "cardAgentSub": "Cobertura em todos os 50 estados",
    "cardPrivacyTitle": "Privacidade do endereço",
    "cardPrivacySub": "Residência protegida (conforme a lei)",
    "cardBoiTitle": "Orientação FinCEN BOI",
    "cardBoiSub": "Acompanhamento de isenções federais",
    "cardMailTitle": "Central postal digital",
    "cardMailSub": "Digitalização no mesmo dia útil",
    "cardFootnote": "Recomendado pela Safi Academy para fundadores internacionais e locais."
  },
  "ja": {
    "isRtl": false,
    "partnerDisclosure": "提携およびコンプライアンスに関する開示事項：",
    "disclosureText": "Safi Academyは起業家向けに独立した教育コースと情報を提供しています。当サイトの紹介リンクを通じてRegistered Agents Incに登録またはサービスを購入された場合、お客様に追加費用が発生することなく紹介手数料を受け取る場合があります。当校では、プライバシー保護と法令遵守の厳格な基準を満たす信頼性の高い正規事業者のみを推薦しています。",
    "heroBadge": "全米法人設立・登録代理人推奨サービス",
    "heroTitle1": "信頼できる米国法人を",
    "heroTitle2": "安全に設立・維持する",
    "heroDesc": "世界規模のスタートアップを立ち上げる国際的な創業者であっても、米国市場に進出する起業家であっても、強固な法人基盤の構築は不可欠です。Safi Academyは、全米50州での登録代理人業務、LLC・法人の設立、および継続的なコンプライアンス対応においてRegistered Agents Incの利用を推奨しています。",
    "ctaRegister": "米国法人を設立・登録する",
    "ctaExploreCourses": "ビジネスコースを見る",
    "servicesBadge": "法人向け総合サービス",
    "servicesTitle": "全米50州をカバーする包括的な法人サポート",
    "servicesSub": "適法な法人設立、州への年次報告、創業者個人のプライバシー保護に必要なすべての機能を完備しています。",
    "whyBadge": "選ばれる理由",
    "whyTitle": "全米直営の物理オフィスと専任エキスパート",
    "whySub": "何万人もの起業家が下請け仲介業者ではなくRegistered Agents Incを直接選ぶ理由。",
    "stepsBadge": "設立ステップ",
    "stepsTitle": "米国法人設立のわかりやすい手順",
    "stepsSub": "法人の種類や設立州の選定から正式な設立証明書の取得まで、実績あるロードマップに従ってスムーズに進められます。",
    "faqsBadge": "よくあるご質問",
    "faqsTitle": "米国法人設立に関する重要Q&A",
    "faqsSub": "登録代理人の義務、非居住者の所有権、連邦報告規制に関する的確なご案内。",
    "ctaBottomTitle": "米国でのビジネスを始める準備はできましたか？",
    "ctaBottomDesc": "全米50州の現地直営オフィスを通じて、確かな社会的信用を持つ法人拠点を構築しましょう。",
    "ctaBottomBtn": "Registered Agents Incで今すぐ開始",
    "services": [
      {
        "title": "全米50州対応の登録代理人 (Registered Agent)",
        "desc": "米国の法律により、すべての法人は設立州内に実住所を持つ登録代理人を置くことが義務付けられており、公的文書の受領や創業者の自宅住所の公開防止に役立ちます。",
        "badge": "法定必須要件"
      },
      {
        "title": "LLCおよび株式会社 (Corporation) の設立",
        "desc": "ワイオミング州、デラウェア州、フロリダ州など全米の州に対応し、定款の作成から州務長官への正式な設立登記申請まで一括サポートします。",
        "badge": "法人登記"
      },
      {
        "title": "FinCEN BOI 実質的支配者報告のガイダンス",
        "desc": "連邦裁判所の最新判決およびFinCENの通達に基づき、現在米国内の多くの事業体はBOI報告が免除または期限猶予されていますが、一部の外国事業体は報告義務があります。最新の法改正を監視し、法的に必要な手続きを支援します。",
        "badge": "連邦コンプライアンス"
      },
      {
        "title": "年次報告書 (Annual Report) の提出と法人維持",
        "desc": "法人の存続ステータスを維持するため、州への定期報告書提出期日を管理し、ペナルティや登記抹消を未然に防止します。",
        "badge": "州年次報告"
      },
      {
        "title": "公的郵便物の当日デジタルスキャン",
        "desc": "司法召喚状や州政府からの重要書類は到着当日に高画質スキャンされ、暗号化された安全なオンライン画面で世界中から即座に確認できます。",
        "badge": "即時閲覧可能"
      },
      {
        "title": "法人アイデンティティとプライバシー保護",
        "desc": "現地エリアコード付きビジネス専用電話、ドメイン、メール転送、商業住所の利用など、私生活を守るインフラを包括提供します。",
        "badge": "プライバシー機能"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "全米50州すべてに直営オフィスと専任社員を配置",
        "desc": "外部に丸投げする仲介サイトとは異なり、全米の各州に自社の物理拠点と正規スタッフを常駐させています。"
      },
      {
        "title": "創業者の自宅住所を公的記録から完全に保護",
        "desc": "法的に認められる公的登記書類には商業住所を記載し、個人の住居が一般名簿や営業リストに出回るのを防ぎます。"
      },
      {
        "title": "法的文書の到着即日スキャンと電子通知",
        "desc": "裁判所からの訴状や税務署からの通知を受領したその日のうちにスキャンし、メールやSMSでアラートを送信します。"
      },
      {
        "title": "更新時も安心の明朗かつ透明な価格設定",
        "desc": "初年度のみ極端に安く翌年から高額請求する手口は一切なく、年次費用や州費用が常に明確に開示されています。"
      },
      {
        "title": "直感的で操作しやすい法人管理ダッシュボード",
        "desc": "複数の法人管理、過去の郵便スキャンの閲覧、存続証明書の発行依頼、提出期日カレンダーを1つの画面で完結。"
      },
      {
        "title": "日本および世界各国の創業者の受け入れに対応",
        "desc": "米国の市民権や社会保障番号 (SSN) は不要で、日本をはじめ世界中の起業家がスムーズに本人確認と設立を行えます。"
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "法人形態と設立州の選択",
        "desc": "パススルー課税のLLCか、VC調達に適したC-Corpかを選択。プライバシー重視のワイオミング州や会社法が充実したデラウェア州が定番です。"
      },
      {
        "step": "02",
        "title": "Registered Agents Incを代理人に指定",
        "desc": "正式な登録代理人として選任し、設立州での物理的な法的住所を確保して個人の自宅住所を保護します。"
      },
      {
        "step": "03",
        "title": "定款・組織規約の登記申請",
        "desc": "専門チームが登記書類を作成して州務長官に正式提出し、認可印の入った設立証明書を取得します。"
      },
      {
        "step": "04",
        "title": "適法ステータスを維持して事業展開",
        "desc": "デジタル郵便を確認し、年次報告書を確実に提出しながら、FinCENの規則に従って健全な法人運営を継続します。"
      }
    ],
    "faqs": [
      {
        "q": "登録代理人 (Registered Agent) とは何ですか？なぜ必須なのですか？",
        "a": "登録代理人とは、裁判所の召喚状や州政府からの公的書簡を会社に代わって受領する権限を持つ法人または個人です。米国法に基づき、すべてのLLCや法人は設立州内に実住所を持つ登録代理人を置くことが義務付けられています。"
      },
      {
        "q": "米国非居住者（日本在住者など）でも米国法人を設立できますか？",
        "a": "はい、可能です。米国居住者でなくても、合法的に米国企業（LLCなど）を100％所有・設立し、日本や海外から完全にオンラインで運営できます。"
      },
      {
        "q": "現在、すべての米国企業にFinCEN BOI報告義務がありますか？",
        "a": "いいえ。連邦裁判所の判決と規制の改定により、現在米国内の多くの企業は報告免除または期限保留の対象となっていますが、一部の外国企業には義務が残っています。専門チームが最新動向を監視し、法的に必要な場合にサポートします。"
      },
      {
        "q": "Safi Academyの紹介リンクを使用すると追加料金がかかりますか？",
        "a": "いいえ、費用は全く同一であり、割引が適用される場合もあります。当校は紹介手数料を受け取る場合がありますが、これは無料教育コンテンツの維持に充当されます。"
      },
      {
        "q": "個人のプライバシーはどのように保護されますか？",
        "a": "州の公開登記簿において自宅住所の代わりに代理人の商業住所が記載されるため、プライバシーが守られます。また、顧客データが第三者に販売されることは一切ありません。"
      }
    ],
    "phaseLabel": "フェーズ",
    "disclaimerBottom": "* Registered Agents Incは独立したサービス提供事業者です。Safi Academyは法律事務所ではなく、法的な税務・法務アドバイスを行うものではありません。詳細は公式サイトをご確認ください。",
    "cardEntityStatus": "法人登録ステータス",
    "cardShieldTitle": "米国法人保護シールド",
    "cardActiveBadge": "有効（Active）",
    "cardAgentTitle": "公認登録代理人",
    "cardAgentSub": "全米50州すべてを網羅",
    "cardPrivacyTitle": "住所の完全保護",
    "cardPrivacySub": "個人自宅住所の非公開化（州法準拠）",
    "cardBoiTitle": "FinCEN BOI ガイダンス",
    "cardBoiSub": "連邦免除規定と法改正の追跡",
    "cardMailTitle": "デジタル郵便センター",
    "cardMailSub": "受領当日の高画質スキャン",
    "cardFootnote": "世界および米国の起業家のためにSafi Academyが公式推奨。"
  },
  "ko": {
    "isRtl": false,
    "partnerDisclosure": "파트너십 및 규정 준수 고지:",
    "disclosureText": "Safi Academy는 창업가를 위한 독립적인 교육 과정과 자료를 제공합니다. 당사의 추천 링크를 통해 Registered Agents Inc에 등록하거나 서비스를 이용할 경우 귀하에게 추가 비용 없이 소정의 제휴 수수료를 지급받을 수 있습니다. 당사는 데이터 개인정보 보호와 법적 준수 요건을 철저히 충족하는 신뢰할 수 있는 기관만을 추천합니다.",
    "heroBadge": "미국 법인 설립 및 등록 대리인 공식 추천 서비스",
    "heroTitle1": "안전하고 신뢰할 수 있는",
    "heroTitle2": "미국 법인 설립 및 보호",
    "heroDesc": "글로벌 스타트업을 론칭하는 해외 창업가이든, 미국 시장으로 비즈니스를 확장하는 기업가이든 올바른 법인 체계 구축은 필수입니다. Safi Academy는 미국 50개 전 주 등록 대리인 서비스, LLC 및 법인 설립, 그리고 체계적인 법적 규정 준수를 위해 Registered Agents Inc를 적극 추천합니다.",
    "ctaRegister": "미국 법인 지금 등록하기",
    "ctaExploreCourses": "비즈니스 강좌 둘러보기",
    "servicesBadge": "법인 전문 서비스",
    "servicesTitle": "미국 50개 전 주를 아우르는 원스톱 법인 솔루션",
    "servicesSub": "합법적인 회사 설립, 주정부 규정 준수 상태 유지, 창업자 개인정보 보호에 필요한 모든 기능을 지원합니다.",
    "whyBadge": "추천하는 이유",
    "whyTitle": "직영 인프라 및 전담 전문가의 직접 지원",
    "whySub": "수많은 창업가들이 외주 중개 포털 대신 직영 Registered Agents Inc를 선택하는 확실한 이유.",
    "stepsBadge": "단계별 절차",
    "stepsTitle": "미국 법인을 설립하는 명쾌한 로드맵",
    "stepsSub": "설립 주 및 법인 형태 선택부터 공식 설립 승인서 취득까지 검증된 단계별 가이드를 따르세요.",
    "faqsBadge": "자주 묻는 질문",
    "faqsTitle": "미국 법인 설립에 관한 핵심 궁금증 해결",
    "faqsSub": "등록 대리인의 법적 역할, 비거주자의 소유권 규정, 연방정부 준수 사항에 대한 투명한 안내.",
    "ctaBottomTitle": "미국 비즈니스를 시작할 준비가 되셨습니까?",
    "ctaBottomDesc": "미국 50개 전 주에 위치한 검증된 등록 사무소를 통해 공신력 있는 법인을 구축하십시오.",
    "ctaBottomBtn": "Registered Agents Inc로 시작하기",
    "services": [
      {
        "title": "미국 50개 전 주 등록 대리인 (Registered Agent)",
        "desc": "미국 법률에 따라 모든 법인은 공식 소송 문서와 주정부 공문을 수령하기 위해 설립 주 내에 실제 주소를 둔 등록 대리인을 지정해야 하며, 이를 통해 개인 자택 주소가 공개되는 것을 방지합니다.",
        "badge": "법적 필수 요건"
      },
      {
        "title": "LLC 및 주식회사 (Corporation) 설립",
        "desc": "와이오밍, 델라웨어, 플로리다 등 미국 전역의 주에서 설립 정관 작성 및 주정부 공식 등록 절차를 전문적으로 대행합니다.",
        "badge": "법인 설립 등록"
      },
      {
        "title": "FinCEN BOI 실소유자 신고 안내",
        "desc": "최근 연방 법원 판결 및 FinCEN 지침에 따라 현재 다수의 미국 국내 기업은 실소유자(BOI) 신고가 면제되거나 기한이 유예되었으나 일부 외국 기업은 여전히 신고 대상입니다. 본 서비스는 최신 규정을 추적하여 필요 시 신고를 지원합니다.",
        "badge": "연방 규정 준수"
      },
      {
        "title": "연례 보고서 제출 및 양호한 법적 지위(Good Standing) 유지",
        "desc": "각 주는 법인의 합법적 활성 상태를 유지하기 위해 연례 보고서를 요구합니다. 마감 기한을 철저히 관리하여 과태료나 법인 자격 정지를 예방합니다.",
        "badge": "주정부 정기 보고"
      },
      {
        "title": "공문서 당일 즉시 디지털 스캔 업로드",
        "desc": "소송 소장 및 주정부 공식 통지서는 도착 당일 즉시 고해상도 스캔되어 전 세계 어디서든 안전하게 확인할 수 있는 클라우드 대시보드에 업로드됩니다.",
        "badge": "실시간 확인"
      },
      {
        "title": "비즈니스 아이덴티티 및 프라이버시 패키지",
        "desc": "지역 번호가 포함된 전용 비즈니스 전화, 도메인, 이메일 전달, 상업용 주소 사용권을 포함한 종합 프라이버시 인프라를 제공합니다.",
        "badge": "개인정보 보호 패키지"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "미국 50개 전 주 직영 사무실 및 정규 직원 상주",
        "desc": "외주 업체에 일감을 넘기는 일반 대행 사이트와 달리, Registered Agents Inc는 전 주에 실제 직영 사무실과 전담 팀을 운영합니다."
      },
      {
        "title": "창업자 개인 자택 주소의 완벽한 비공개 보호",
        "desc": "주정부 공개 서류에 등록 대리인의 상업 주소가 기재되어 창업자의 거주지가 광고업체나 공개 데이터베이스에 노출되지 않습니다."
      },
      {
        "title": "법적 문서의 당일 처리 및 즉각 알림",
        "desc": "소송 통지서나 세무 공문이 도착한 당일 처리되어 이메일 및 문자 알림과 함께 고객 대시보드로 즉각 전송됩니다."
      },
      {
        "title": "숨은 비용 없는 투명한 가격 정책",
        "desc": "갱신 시 과도한 비용을 요구하는 관행 없이, 연간 대리인 비용과 주정부 수수료가 처음부터 명확하게 공개됩니다."
      },
      {
        "title": "모던하고 직관적인 통합 고객 대시보드",
        "desc": "여러 법인을 손쉽게 통합 관리하고 스캔된 문서를 열람하며 규정 준수 일정을 한눈에 파악할 수 있는 편리한 인터페이스."
      },
      {
        "title": "해외 글로벌 창업자 적극 지원",
        "desc": "미국 시민권이나 사회보장번호(SSN)가 없어도 합법적으로 법인을 설립할 수 있으며, 전 세계 창업자를 위한 본인 확인 시스템이 마련되어 있습니다."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "법인 유형 및 설립 주 선택",
        "desc": "세무적 유연성이 뛰어난 LLC와 벤처 투자 유치에 유리한 C-Corp 중 선택하십시오. 와이오밍(비용 및 프라이버시)과 델라웨어가 대표적입니다."
      },
      {
        "step": "02",
        "title": "Registered Agents Inc를 대리인으로 지정",
        "desc": "공식 등록 대리인으로 선임하여 설립 주 내 합법적인 주소를 확보하고 개인 자택 주소의 노출을 방지합니다."
      },
      {
        "step": "03",
        "title": "설립 정관(Articles of Organization) 제출",
        "desc": "법률 전문가가 정관을 작성하여 주정부 서기실에 제출하고 공식 승인된 설립 인가증을 수령합니다."
      },
      {
        "step": "04",
        "title": "지속적인 법적 준수 상태 유지",
        "desc": "디지털 공문을 수시로 확인하고 매년 요구되는 보고서를 적기에 제출하며 연방 FinCEN 규정을 철저히 준수합니다."
      }
    ],
    "faqs": [
      {
        "q": "등록 대리인(Registered Agent)이란 무엇이며 왜 법적으로 필수인가요?",
        "a": "등록 대리인은 법인을 대신하여 공식 소송 문서와 주정부 공문을 수령하도록 법적으로 인가받은 개인 또는 기관입니다. 미국 주법은 모든 LLC와 법인이 설립 주 내에 실제 주소를 둔 등록 대리인을 둘 것을 의무화하고 있습니다."
      },
      {
        "q": "미국 비거주자(외국인)도 이 서비스를 통해 법인을 세울 수 있나요?",
        "a": "네, 가능합니다. 미국 거주자가 아니더라도 합법적으로 미국 법인(예: LLC)의 지분을 100% 소유할 수 있으며 온라인을 통해 원격으로 운영할 수 있습니다."
      },
      {
        "q": "현재 모든 미국 기업이 FinCEN BOI 보고서를 제출해야 합니까?",
        "a": "아닙니다. 연방 법원 판결 및 FinCEN의 발표에 따라 다수의 미국 내국 기업은 현재 면제 또는 보고 기한 유예 대상이지만 특정 외국계 기업은 신고 의무가 있습니다. 본 서비스는 최신 규정을 모니터링하여 적법한 신고를 지원합니다."
      },
      {
        "q": "Safi Academy 추천 링크를 사용하면 추가 비용이 청구됩니까?",
        "a": "아닙니다. 가격은 공식 웹사이트와 동일하거나 프로모션 혜택이 적용됩니다. Safi Academy는 제휴 수수료를 지급받을 수 있으며, 이는 무료 교육 자료를 제작하는 데 활용됩니다."
      },
      {
        "q": "Registered Agents Inc는 창업자의 개인정보를 어떻게 보호합니까?",
        "a": "주정부 공개 문서에 창업자의 실제 거주지 대신 대리인의 상업 사무소 주소를 등록하며, 고객 정보를 제3자에게 절대 판매하지 않는 엄격한 원칙을 준수합니다."
      }
    ],
    "phaseLabel": "단계",
    "disclaimerBottom": "* Registered Agents Inc는 독립된 서비스 제공업체입니다. Safi Academy는 법률 사무소가 아니며 공식적인 세무나 법률 자문을 제공하지 않습니다. 구체적인 사항은 공식 웹사이트를 확인하십시오.",
    "cardEntityStatus": "법인 등록 지위",
    "cardShieldTitle": "미국 법인 보호 실드",
    "cardActiveBadge": "활성(Active)",
    "cardAgentTitle": "공식 등록 대리인",
    "cardAgentSub": "미국 50개 전 주 완벽 대응",
    "cardPrivacyTitle": "자택 주소 프라이버시",
    "cardPrivacySub": "개인 거주지 비공개 보호(주법 준수)",
    "cardBoiTitle": "FinCEN BOI 지침 안내",
    "cardBoiSub": "연방 면제 규정 및 규칙 모니터링",
    "cardMailTitle": "클라우드 디지털 우편실",
    "cardMailSub": "도착 당일 온라인 스캔 업로드",
    "cardFootnote": "글로벌 및 미국 내 창업가를 위해 Safi Academy가 공식 추천합니다."
  },
  "nl": {
    "isRtl": false,
    "partnerDisclosure": "Openbaarmaking van partnerschap en naleving van regelgeving:",
    "disclosureText": "Safi Academy biedt onafhankelijke educatieve cursussen en middelen voor ondernemers. Wanneer u zich registreert of diensten aanschaft via onze verwijzingslinks naar Registered Agents Inc, kunnen wij een partnercommissie ontvangen zonder extra kosten voor u. Wij bevelen uitsluitend gevestigde aanbieders aan die voldoen aan onze strenge normen voor gegevensprivacy en naleving van wetgeving.",
    "heroBadge": "Aanbevolen dienstverlener voor oprichting van Amerikaanse bedrijven",
    "heroTitle1": "Richt uw Amerikaanse onderneming op en",
    "heroTitle2": "bescherm uw privacy",
    "heroDesc": "Of u nu een internationale oprichter bent die een wereldwijde startup lanceert of een ondernemer die uitbreidt naar de Amerikaanse markt: een solide juridische bedrijfsbasis is essentieel. Safi Academy beveelt Registered Agents Inc aan voor vertegenwoordiging in alle 50 staten, oprichting van LLC's/corporaties en doorlopende naleving van de wetgeving.",
    "ctaRegister": "Uw Amerikaanse bedrijf registreren",
    "ctaExploreCourses": "Zakelijke cursussen bekijken",
    "servicesBadge": "Zakelijke diensten",
    "servicesTitle": "Uitgebreide bedrijfsdiensten in alle 50 Amerikaanse staten",
    "servicesSub": "Alles wat u nodig heeft om wettelijk op te richten, aan staatsregels te voldoen en de privacy van de oprichter te waarborgen.",
    "whyBadge": "Waarom wij dit aanbevelen",
    "whyTitle": "Eigen infrastructuur en toegewijde deskundige ondersteuning",
    "whySub": "Waarom duizenden ondernemers kiezen voor Registered Agents Inc in plaats van wederverkopers.",
    "stepsBadge": "Stap voor stap",
    "stepsTitle": "Hoe u uw Amerikaanse bedrijf opricht",
    "stepsSub": "Volg ons beproefde stappenplan van staatsselectie tot officiële afgifte van uw oprichtingscertificaat.",
    "faqsBadge": "Veelgestelde vragen",
    "faqsTitle": "Duidelijke antwoorden op uw juridische vragen",
    "faqsSub": "Heldere uitleg over geregistreerde agenten, buitenlands eigendom en federale rapportageverplichtingen.",
    "ctaBottomTitle": "Klaar om uw Amerikaanse bedrijf op te richten?",
    "ctaBottomDesc": "Bouw uw zakelijke aanwezigheid op met lokale geregistreerde kantoren in elk van de 50 Amerikaanse staten.",
    "ctaBottomBtn": "Start met Registered Agents Inc",
    "services": [
      {
        "title": "Geregistreerd agent in alle 50 staten",
        "desc": "De Amerikaanse wet vereist dat elk bedrijf een geregistreerde agent heeft met een fysiek adres in de staat van oprichting om officiële post te ontvangen en te voorkomen dat uw privéadres openbaar wordt.",
        "badge": "Wettelijke verplichting"
      },
      {
        "title": "Oprichting van LLC's en vennootschappen (Inc)",
        "desc": "Volledige oprichtingsservice in elke staat (waaronder Wyoming, Delaware en Florida) met het opstellen van statuten en tijdige indiening.",
        "badge": "Bedrijfsoprichting"
      },
      {
        "title": "FinCEN BOI advies en rapportage",
        "desc": "Na recente uitspraken van federale rechtbanken en richtlijnen van FinCEN zijn veel binnenlandse bedrijven momenteel vrijgesteld of zijn termijnen gepauzeerd, terwijl bepaalde buitenlandse entiteiten meldingsplichtig blijven. De aanbieder volgt de regels en biedt assistentie wanneer dat wettelijk vereist is.",
        "badge": "Federale compliance"
      },
      {
        "title": "Jaarverslagen en behoud van Good Standing",
        "desc": "Staten vereisen jaarlijkse rapportages om de actieve status te behouden. De dienst bewaakt deadlines en dient rapporten in om boetes te voorkomen.",
        "badge": "Staatseisen"
      },
      {
        "title": "Digitale postscans op dezelfde dag",
        "desc": "Gerechtelijke documenten en officiële overheidsbrieven worden op de dag van aankomst gescand en geüpload naar uw veilige online dashboard.",
        "badge": "Directe toegang"
      },
      {
        "title": "Zakelijke identiteit en privacysuite",
        "desc": "Volledige bedrijfsinfrastructuur inclusief professioneel telefoonnummer met lokaal netnummer, domeinnaam, e-mail forwarden en zakelijk adres.",
        "badge": "Privacysuite"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Fysieke kantoren en eigen personeel in alle 50 staten",
        "desc": "In tegenstelling tot tussenpersonen die opdrachten uitbesteden, beschikt Registered Agents Inc over fysieke locaties en eigen teams in elke Amerikaanse staat."
      },
      {
        "title": "Volledige bescherming van uw woonadres",
        "desc": "Waar wettelijk toegestaan wordt het zakelijke adres vermeld in openbare registers, zodat uw privéadres verborgen blijft voor het publiek."
      },
      {
        "title": "Verwerking van documenten op dezelfde dag",
        "desc": "Dagvaardingen en officiële belastingberichten worden op de dag van ontvangst verwerkt en met e-mail- en sms-notificaties verzonden."
      },
      {
        "title": "Transparante tarieven zonder verborgen verrassingen",
        "desc": "Geen onverwachte prijsverhogingen bij jaarlijkse verlenging; de tarieven voor de geregistreerde agent en staatsleges zijn vanaf het begin duidelijk."
      },
      {
        "title": "Modern en overzichtelijk klantendashboard",
        "desc": "Beheer meerdere entiteiten, bekijk gescande post, vraag uittreksels aan en bewaak de compliance-kalender op één plek."
      },
      {
        "title": "Internationale oprichters van harte welkom",
        "desc": "U heeft geen Amerikaans staatsburgerschap of SSN nodig om een bedrijf op te richten; eenvoudige verificatie voor ondernemers wereldwijd."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Kies rechtsvorm en staat",
        "desc": "Kies tussen een LLC (flexibel en fiscaal transparant) of een C-Corporation (voor durfkapitaal). Wyoming en Delaware zijn favoriet."
      },
      {
        "step": "02",
        "title": "Wijs Registered Agents Inc aan",
        "desc": "Benoem hen als uw officiële geregistreerde agent om te zorgen voor een geldig fysiek adres en ter bescherming van uw privacy."
      },
      {
        "step": "03",
        "title": "Dien de oprichtingsdocumenten in",
        "desc": "Specialisten stellen de statuten (Articles of Organization) op en dienen deze in bij de Secretary of State voor officiële goedkeuring."
      },
      {
        "step": "04",
        "title": "Blijf 100% in overeenstemming met de wet",
        "desc": "Ontvang digitale post, dien tijdig uw jaarverslagen in en blijf op de hoogte van de actuele FinCEN BOI-vereisten."
      }
    ],
    "faqs": [
      {
        "q": "Wat is een geregistreerde agent en waarom is deze wettelijk verplicht?",
        "a": "Een geregistreerde agent is een bevoegde persoon of entiteit die officiële gerechtelijke stukken en overheidscorrespondentie namens uw bedrijf in ontvangst neemt. De wet vereist dat elk bedrijf een agent met een fysiek adres in de oprichtingsstaat heeft."
      },
      {
        "q": "Kunnen internationale oprichters (niet-inwoners) van deze dienst gebruikmaken?",
        "a": "Ja. Niet-inwoners kunnen voor 100% eigenaar zijn van een Amerikaans bedrijf (zoals een LLC) en dit volledig online vanuit het buitenland beheren."
      },
      {
        "q": "Moeten alle bedrijven momenteel een FinCEN BOI-rapport indienen?",
        "a": "Nee. Door gerechtelijke uitspraken en FinCEN-updates zijn veel Amerikaanse binnenlandse bedrijven momenteel vrijgesteld of zijn termijnen opgeschort, terwijl bepaalde buitenlandse entiteiten wel meldingsplichtig zijn. De dienst helpt bij het indienen wanneer dat wettelijk verplicht is."
      },
      {
        "q": "Kost het gebruik van de link van Safi Academy extra geld?",
        "a": "Nee. De tarieven zijn exact hetzelfde en bevatten soms zelfs kortingen. Safi Academy kan een commissie ontvangen waarmee wij gratis onderwijs kunnen blijven aanbieden."
      },
      {
        "q": "Hoe beschermt Registered Agents Inc de privacy van de oprichter?",
        "a": "Waar wettelijk toegestaan wordt het kantooradres van de agent vermeld in plaats van uw privéadres, en gegevens worden nooit verkocht aan derden."
      }
    ],
    "phaseLabel": "Fase",
    "disclaimerBottom": "* Registered Agents Inc is een onafhankelijke dienstverlener. Safi Academy is geen advocatenkantoor en verstrekt geen fiscaal of juridisch advies. Bezoek de officiële website voor details.",
    "cardEntityStatus": "Bedrijfsstatus",
    "cardShieldTitle": "Amerikaans bedrijfsschild",
    "cardActiveBadge": "Actief",
    "cardAgentTitle": "Geregistreerd agent",
    "cardAgentSub": "Dekt alle 50 Amerikaanse staten",
    "cardPrivacyTitle": "Adresprivacy",
    "cardPrivacySub": "Woonadres afgeschermd (waar wettelijk toegestaan)",
    "cardBoiTitle": "FinCEN BOI Richtlijnen",
    "cardBoiSub": "Monitoring van federale vrijstellingen",
    "cardMailTitle": "Digitale postkamer",
    "cardMailSub": "Scans op dezelfde dag",
    "cardFootnote": "Aanbevolen door Safi Academy voor internationale en lokale oprichters."
  },
  "uz": {
    "isRtl": false,
    "partnerDisclosure": "Hamkorlik va me'yoriy talablarga muvofiqlik bayonoti:",
    "disclosureText": "Safi Academy tadbirkorlar uchun mustaqil ta'lim kurslari va resurslarini taqdim etadi. Siz Registered Agents Inc xizmatlariga bizning tavsiya havolalarimiz orqali ro'yxatdan o'tganingizda yoki xarid qilganingizda, siz uchun hech qanday qo'shimcha xarajatsiz biz hamkorlik komissiyasini olishimiz mumkin. Biz faqat ma'lumotlar maxfiyligi va qonuniy ishonchlilik talablariga to'liq javob beradigan provayderlarni tavsiya qilamiz.",
    "heroBadge": "AQShda kompaniya ochish uchun tavsiya etilgan korporativ xizmat",
    "heroTitle1": "AQShdagi kompaniyangizni oching",
    "heroTitle2": "va xavfsiz himoya qiling",
    "heroDesc": "Global startap boshlayotgan xalqaro tadbirkor bo'lasizmi yoki AQSh bozoriga kirib kelayotgan biznes egasimi, mustahkam korporativ poydevor hal qiluvchi ahamiyatga ega. Safi Academy barcha 50 shtatda ro'yxatdan o'tgan agent vakilligi, LLC/korporatsiyalarni ta'sis etish va qonuniy muvofiqlik uchun Registered Agents Inc'ni tavsiya etadi.",
    "ctaRegister": "AQSh kompaniyangizni ro'yxatdan o'tkazing",
    "ctaExploreCourses": "Biznes kurslarini ko'rish",
    "servicesBadge": "Korporativ xizmatlar",
    "servicesTitle": "AQShning barcha 50 shtatida keng qamrovli biznes xizmatlari",
    "servicesSub": "Kompaniyani qonuniy ro'yxatdan o'tkazish, davlat talablariga doimiy muvofiqlik va ta'sischilar maxfiyligini saqlash uchun barcha kerakli vositalar.",
    "whyBadge": "Nima uchun tavsiya qilamiz",
    "whyTitle": "To'g'ridan-to'g'ri infratuzilma va professional ekspert yordami",
    "whySub": "Minglab tadbirkorlar nega vositachi saytlar o'rniga aynan Registered Agents Inc xizmatini tanlashadi.",
    "stepsBadge": "Bosqichma-bosqich qo'llanma",
    "stepsTitle": "AQShda kompaniya ochish tartibi",
    "stepsSub": "Shtat va kompaniya turini tanlashdan tortib rasmiy ro'yxatdan o'tish sertifikatini olguncha ishonchli rejamizga amal qiling.",
    "faqsBadge": "Ko'p beriladigan savollar",
    "faqsTitle": "Huquqiy savollaringizga aniq va to'g'ri javoblar",
    "faqsSub": "Ro'yxatdan o'tgan agent, norezidentlar mulkdorligi va federal me'yorlar haqida batafsil ma'lumotlar.",
    "ctaBottomTitle": "AQShda o'z biznesingizni boshlashga tayyormisiz?",
    "ctaBottomDesc": "50 shtatning istalgan birida mahalliy rasmiy ofislar orqali ishonchli korporativ mavqeingizni yarating.",
    "ctaBottomBtn": "Registered Agents Inc bilan boshlash",
    "services": [
      {
        "title": "Barcha 50 shtatda ro'yxatdan o'tgan agent (Registered Agent)",
        "desc": "AQSh qonunlariga ko'ra, har bir yuridik shaxs sud va rasmiy davlat xabarnomalarini qabul qilish va shaxsiy uy manzili ommaviy reyestrlarga tushishining oldini olish uchun ro'yxatdan o'tgan shtatida jismoniy manzilga ega agentga ega bo'lishi shart.",
        "badge": "Qonuniy majburiy talab"
      },
      {
        "title": "LLC va korporatsiyalarni ta'sis etish",
        "desc": "AQShning istalgan shtatida (jumladan Vayoming, Delaver va Florida) ustav hujjatlarini tuzish va davlat kotibiyatiga rasmiy ro'yxatdan o'tkazish xizmati.",
        "badge": "Kompaniya ochish"
      },
      {
        "title": "FinCEN BOI yo'riqnomasi va hisobotlari",
        "desc": "Federal sud qarorlari va FinCEN qoidalariga ko'ra, hozirda ko'plab mahalliy AQSh kompaniyalari benefitsiar mulkdorlik (BOI) hisobotidan ozod qilingan yoki muddatlari kechiktirilgan, ayrim xorijiy kompaniyalar esa hisobot topshirishi shart. Kompaniya qonunlarni kuzatib boradi va kerak bo'lganda yordam beradi.",
        "badge": "Federal muvofiqlik"
      },
      {
        "title": "Yillik hisobotlar va faol maqomni (Good Standing) saqlash",
        "desc": "Shtatlar kompaniyalarning faol bo'lishini ta'minlash uchun yillik hisobotlarni talab qiladi. Agentlik muddatlarni kuzatib boradi va jarimalarning oldini olish uchun hisobotlarni o'z vaqtida topshiradi.",
        "badge": "Davlat hisobotlari"
      },
      {
        "title": "Xatlarni o'sha kunning o'zida raqamli skanerlash",
        "desc": "Sud xabarnomalari va rasmiy davlat xatlari kelgan kuniyoq skaner qilinadi va dunyoning istalgan nuqtasidan kirish mumkin bo'lgan xavfsiz shaxsiy kabinetingizga yuklanadi.",
        "badge": "Tezkor kirish"
      },
      {
        "title": "Biznes identifikatsiyasi va maxfiylik to'plami",
        "desc": "Mahalliy hududiy kodli biznes telefon raqami, domen, xatlarni yo'naltirish va rasmiy tijorat manzilidan foydalanishni o'z ichiga olgan to'liq infratuzilma.",
        "badge": "Maxfiylik to'plami"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "50 shtatning barchasida o'z ofislari va rasmiy xodimlari",
        "desc": "Buyurtmalarni boshqalarga topshiradigan vositachi saytlardan farqli o'laroq, Registered Agents Inc har bir shtatda o'z jismoniy ofislariga va mahalliy xodimlariga ega."
      },
      {
        "title": "Uy manzilingiz va shaxsiy daxlsizligingiz to'liq himoyasi",
        "desc": "Qonun ruxsat bergan davlat ommaviy hujjatlarida shaxsiy uyingiz manzili o'rniga ularning tijorat manzili ko'rsatiladi va shaxsiy ma'lumotlaringiz himoya qilinadi."
      },
      {
        "title": "Hujjatlar kelgan kuniyoq skanerlanadi va yetkaziladi",
        "desc": "Sud bildirishnomalari va soliq xatlari kelgan ish kunining o'zidayoq skaner qilinadi va elektron pochta hamda SMS orqali darhol xabar qilinadi."
      },
      {
        "title": "Yashirin to'lovlarsiz shaffof narxlar",
        "desc": "Yillik yangilashda hech qanday kutilmagan qimmat narxlar bo'lmaydi; agentlik va davlat to'lovlari boshidanoq aniq va shaffof ko'rsatiladi."
      },
      {
        "title": "Zamonaviy va qulay mijoz boshqaruv paneli",
        "desc": "Bir nechta kompaniyalarni boshqarish, skaner qilingan hujjatlarni ko'rish va hisobot topshirish taqvimini yagona tizimda nazorat qilish."
      },
      {
        "title": "Xalqaro tadbirkorlar uchun to'liq imkoniyat",
        "desc": "AQShda kompaniya ochish uchun AQSh fuqaroligi yoki SSN talab qilinmaydi; butun dunyo tadbirkorlari uchun shaxsni tasdiqlash juda qulay."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Kompaniya turi va shtatni tanlang",
        "desc": "Soliq qulayligi uchun LLC yoki investitsiyalar jalb qilish uchun C-Corp'ni tanlang. Vayoming (arzon xarajat va maxfiylik) va Delaver eng mashhur tanlovlardir."
      },
      {
        "step": "02",
        "title": "Registered Agents Inc'ni rasmiy agent qilib tayinlang",
        "desc": "Shtat reyestrida qonuniy jismoniy manzilga ega bo'lish va shaxsiy uyingiz manzilini himoya qilish uchun kompaniyani agent qilib belgilang."
      },
      {
        "step": "03",
        "title": "Ta'sis hujjatlarini davlatga topshiring",
        "desc": "Mutaxassislar hujjatlarni (Articles of Organization) tayyorlaydi, davlat kotibiyatiga topshiradi va rasmiy ta'sis sertifikatini oladi."
      },
      {
        "step": "04",
        "title": "Kompaniyangizni doimo qonuniy va faol saqlang",
        "desc": "Raqamli xatlarni qabul qiling, yillik hisobotlarni o'z vaqtida topshiring va FinCEN qoidalariga rioya qiling."
      }
    ],
    "faqs": [
      {
        "q": "Ro'yxatdan o'tgan agent (Registered Agent) nima va u nega qonuniy talab qilinadi?",
        "a": "Ro'yxatdan o'tgan agent — bu kompaniyangiz nomidan sud bildirishnomalari va rasmiy davlat xatlarini qabul qilish huquqiga ega bo'lgan vakil yoki tashkilotdir. AQSh qonunlari har bir kompaniyadan ta'sis etilgan shtatida jismoniy manzilga ega agent bo'lishini talab qiladi."
      },
      {
        "q": "AQSh norezidentlari ushbu xizmat orqali kompaniya ocha oladimi?",
        "a": "Ha. AQShda yashamaydigan xorijiy fuqarolar AQSh kompaniyasiga (masalan, LLC) 100% qonuniy egalik qilishlari va uni internet orqali to'liq masofadan boshqarishlari mumkin."
      },
      {
        "q": "Hozir barcha kompaniyalar FinCEN BOI hisobotini topshirishi shartmi?",
        "a": "Yo'q. Federal sud qarorlari va FinCEN bildirishnomalariga asosan hozirda ko'plab mahalliy AQSh kompaniyalari hisobotdan ozod qilingan yoki muddatlari to'xtatilgan, ammo ayrim xorijiy kompaniyalar uchun talab saqlanib qolgan. Xizmat qonun talab qilganda topshirishda yordam beradi."
      },
      {
        "q": "Safi Academy havolasidan foydalanish qo'shimcha xarajat tug'diradimi?",
        "a": "Yo'q. Narxlar rasmiy veb-sayt bilan bir xil va ba'zan chegirmalarni ham o'z ichiga oladi. Safi Academy tavsiya komissiyasini olishi mumkin, bu esa bepul ta'lim kurslarini davom ettirishimizga ko'maklashadi."
      },
      {
        "q": "Registered Agents Inc ta'sischining maxfiyligini qanday himoya qiladi?",
        "a": "Davlatning ochiq reyestrlarida sizning uy manzilingiz o'rniga agentning tijorat ofisi manzili ko'rsatiladi va mijozlar ma'lumotlari uchinchi shaxslarga hech qachon sotilmaydi."
      }
    ],
    "phaseLabel": "Bosqich",
    "disclaimerBottom": "* Registered Agents Inc mustaqil xizmat ko'rsatuvchi hisoblanadi. Safi Academy yuridik firma emas va rasmiy soliq yoki yuridik maslahat bermaydi. Tafsilotlar uchun rasmiy veb-saytga tashrif buyuring.",
    "cardEntityStatus": "Yuridik shaxs maqomi",
    "cardShieldTitle": "AQSh korporativ qalqoni",
    "cardActiveBadge": "Faol",
    "cardAgentTitle": "Ro'yxatdan o'tgan agent",
    "cardAgentSub": "AQShning barcha 50 shtati qamrab olingan",
    "cardPrivacyTitle": "Manzil maxfiyligi",
    "cardPrivacySub": "Shaxsiy manzil yashirilgan (qonun doirasida)",
    "cardBoiTitle": "FinCEN BOI ko'rsatmalari",
    "cardBoiSub": "Federal istisnolar va qoidalarni kuzatish",
    "cardMailTitle": "Raqamli pochta xizmati",
    "cardMailSub": "O'sha kunning o'zida onlayn skanerlash",
    "cardFootnote": "Xalqaro va mahalliy tadbirkorlar uchun Safi Academy tomonidan tavsiya etiladi."
  },
  "id": {
    "isRtl": false,
    "partnerDisclosure": "Pengungkapan Kemitraan & Kepatuhan Regulasi Resmi:",
    "disclosureText": "Safi Academy menyediakan kursus dan sumber daya pendidikan independen untuk para wirausahawan. Ketika Anda mendaftar atau membeli layanan melalui tautan rujukan kami ke Registered Agents Inc, kami mungkin menerima komisi afiliasi tanpa biaya tambahan bagi Anda. Kami hanya merekomendasikan penyedia terpercaya yang memenuhi kriteria ketat privasi data dan kepatuhan hukum.",
    "heroBadge": "Penyedia Layanan Pendirian Perusahaan AS yang Direkomendasikan",
    "heroTitle1": "Dirikan & Lindungi Perusahaan",
    "heroTitle2": "Amerika Serikat Anda",
    "heroDesc": "Baik Anda seorang pendiri internasional yang meluncurkan startup global maupun pengusaha yang berekspansi ke pasar Amerika Serikat, fondasi hukum korporat yang kokoh sangat penting. Safi Academy merekomendasikan Registered Agents Inc untuk perwakilan agen terdaftar di 50 negara bagian, pendirian LLC/Korporasi, dan kepatuhan hukum berkelanjutan.",
    "ctaRegister": "Daftarkan Perusahaan AS Anda",
    "ctaExploreCourses": "Lihat Kursus Bisnis",
    "servicesBadge": "Layanan Korporat",
    "servicesTitle": "Layanan Bisnis Komprehensif di Seluruh 50 Negara Bagian AS",
    "servicesSub": "Semua yang Anda butuhkan untuk mendirikan badan hukum secara sah, menjaga kepatuhan negara bagian, dan menjaga privasi pendiri.",
    "whyBadge": "Mengapa Kami Merekomendasikan",
    "whyTitle": "Infrastruktur Langsung & Dukungan Ahli Berdedikasi",
    "whySub": "Alasan ribuan pengusaha mempercayai Registered Agents Inc daripada portal perantara pihak ketiga.",
    "stepsBadge": "Langkah demi Langkah",
    "stepsTitle": "Cara Mendirikan Perusahaan Anda di Amerika Serikat",
    "stepsSub": "Ikuti panduan teruji kami mulai dari pemilihan negara bagian hingga penerbitan sertifikat pendirian resmi.",
    "faqsBadge": "Pertanyaan yang Sering Diajukan",
    "faqsTitle": "Jawaban Jelas untuk Pertanyaan Hukum Anda",
    "faqsSub": "Penjelasan terperinci mengenai aturan agen terdaftar, kepemilikan oleh bukan warga AS, dan mandat kepatuhan federal.",
    "ctaBottomTitle": "Siap Mendirikan Bisnis Anda di AS?",
    "ctaBottomDesc": "Bangun kehadiran korporat terkemuka dengan kantor terdaftar lokal di salah satu dari 50 negara bagian AS.",
    "ctaBottomBtn": "Mulai bersama Registered Agents Inc",
    "services": [
      {
        "title": "Agen Terdaftar di Seluruh 50 Negara Bagian",
        "desc": "Hukum AS mewajibkan setiap entitas memiliki agen terdaftar dengan alamat fisik di negara bagian pendirian untuk menerima surat hukum resmi dan menjaga alamat rumah pribadi Anda dari catatan publik.",
        "badge": "Kewajiban Hukum"
      },
      {
        "title": "Pendirian Badan Usaha LLC & Korporasi",
        "desc": "Layanan pendirian entitas lengkap di seluruh negara bagian AS (termasuk Wyoming, Delaware, dan Florida) dengan penyusunan anggaran dasar sesuai ketentuan hukum.",
        "badge": "Pendirian Perusahaan"
      },
      {
        "title": "Panduan & Pelaporan FinCEN BOI",
        "desc": "Berdasarkan putusan pengadilan federal terbaru dan arahan FinCEN, banyak perusahaan domestik AS saat ini dikecualikan atau batas waktunya ditangguhkan untuk pelaporan pemilik manfaat (BOI), sementara entitas asing tertentu tetap wajib lapor. Layanan ini memantau aturan dan membantu kepatuhan jika diwajibkan oleh hukum.",
        "badge": "Kepatuhan Federal"
      },
      {
        "title": "Laporan Tahunan & Pemeliharaan Status Good Standing",
        "desc": "Negara bagian mewajibkan pengajuan laporan tahunan agar izin usaha tetap aktif. Tim memantau tenggat waktu dan memproses berkas tepat waktu untuk mencegah denda.",
        "badge": "Laporan Negara Bagian"
      },
      {
        "title": "Pemindaian Dokumen Digital di Hari yang Sama",
        "desc": "Pemberitahuan hukum dan surat resmi pemerintah dipindai pada hari kedatangan dan diunggah ke dasbor online Anda yang aman untuk diakses dari mana saja.",
        "badge": "Akses Cepat"
      },
      {
        "title": "Paket Identitas Bisnis & Privasi Pendiri",
        "desc": "Infrastruktur bisnis lengkap termasuk nomor telepon bisnis dengan kode area lokal, domain, penerusan email, dan penggunaan alamat kantor komersial.",
        "badge": "Privasi Korporat"
      }
    ],
    "whyWeRecommend": [
      {
        "title": "Kantor Fisik & Karyawan Tetap di Seluruh 50 Negara Bagian",
        "desc": "Tidak seperti situs perantara yang mensubkontrakkan pesanan, Registered Agents Inc memiliki kantor fisik nyata dan tim sendiri di setiap negara bagian AS."
      },
      {
        "title": "Perlindungan Penuh Alamat Rumah Pribadi",
        "desc": "Di dokumen publik resmi negara bagian, alamat kantor komersial mereka dicantumkan sehingga alamat hunian pribadi Anda aman dari konsumsi publik."
      },
      {
        "title": "Pemrosesan Surat Dokumen pada Hari yang Sama",
        "desc": "Panggilan pengadilan dan surat pajak resmi dipindai pada hari kerja yang sama dengan notifikasi langsung melalui email dan SMS."
      },
      {
        "title": "Biaya Transparan Tanpa Biaya Tersembunyi",
        "desc": "Tidak ada kenaikan biaya tahunan mendadak; tarif agen terdaftar dan biaya negara bagian selalu jelas dan terbuka sejak awal."
      },
      {
        "title": "Dasbor Klien Korporat yang Modern & Mudah Digunakan",
        "desc": "Pusat kontrol terpadu untuk mengelola beberapa perusahaan, melihat arsip surat, meminta sertifikat resmi, dan memantau kalender kepatuhan."
      },
      {
        "title": "Menyambut Pendiri Internasional dari Seluruh Dunia",
        "desc": "Anda tidak memerlukan kewarganegaraan AS atau SSN untuk mendirikan perusahaan Amerika; proses verifikasi identitas sangat mudah bagi pengusaha global."
      }
    ],
    "formationSteps": [
      {
        "step": "01",
        "title": "Pilih Jenis Entitas dan Negara Bagian",
        "desc": "Pilih antara LLC (fleksibilitas pajak) atau C-Corporation (ideal untuk pendanaan modal ventura). Wyoming dan Delaware adalah pilihan terpopuler."
      },
      {
        "step": "02",
        "title": "Tunjuk Registered Agents Inc sebagai Agen",
        "desc": "Pilih perusahaan sebagai perwakilan resmi untuk memastikan alamat fisik legal dan melindungi privasi alamat rumah pribadi Anda."
      },
      {
        "step": "03",
        "title": "Pengajuan Berkas Pendirian (Articles of Organization)",
        "desc": "Para ahli menyusun dan mengajukan berkas ke Sekretariat Negara Bagian untuk mendapatkan akta pendirian resmi perusahaan Anda."
      },
      {
        "step": "04",
        "title": "Jaga Kepatuhan Hukum 100% dan Jalankan Bisnis",
        "desc": "Terima dokumen digital, ajukan laporan tahunan tepat waktu, dan ikuti perkembangan aturan kepatuhan federal FinCEN."
      }
    ],
    "faqs": [
      {
        "q": "Apa itu Agen Terdaftar (Registered Agent) dan mengapa diwajibkan oleh hukum?",
        "a": "Agen Terdaftar adalah perorangan atau badan hukum resmi yang berwenang menerima panggilan pengadilan dan surat dinas resmi pemerintah atas nama perusahaan Anda. Hukum negara bagian AS mewajibkan setiap LLC atau Korporasi memiliki agen dengan alamat fisik di negara bagian pendirian."
      },
      {
        "q": "Bisakah pendiri internasional (bukan warga AS) mendirikan perusahaan?",
        "a": "Ya. Warga non-AS berhak secara hukum memiliki 100% kepemilikan bisnis AS (seperti LLC) dan mengelolanya secara daring dari mana saja di seluruh dunia."
      },
      {
        "q": "Apakah saat ini semua perusahaan AS wajib mengajukan laporan FinCEN BOI?",
        "a": "Tidak. Berdasarkan putusan pengadilan federal dan pembaruan aturan FinCEN, banyak entitas domestik AS saat ini dibebaskan atau tenggat waktunya ditunda, sementara entitas asing tertentu tetap wajib melapor. Layanan ini memantau aturan dan membantu pelaporan bila diwajibkan secara hukum."
      },
      {
        "q": "Apakah menggunakan tautan Safi Academy memicu biaya tambahan?",
        "a": "Tidak. Harganya sama persis dan bahkan sering kali mencakup potongan promo. Safi Academy mungkin menerima komisi yang digunakan untuk mendanai materi edukasi gratis kami."
      },
      {
        "q": "Bagaimana Registered Agents Inc menjaga privasi pendiri bisnis?",
        "a": "Pada dokumen resmi negara bagian yang dapat diakses publik, alamat kantor komersial agen dicantumkan sebagai ganti alamat pribadi Anda, serta mereka memegang teguh kebijakan tidak pernah menjual data pelanggan kepada pihak ketiga."
      }
    ],
    "phaseLabel": "Fase",
    "disclaimerBottom": "* Registered Agents Inc adalah penyedia layanan independen. Safi Academy bukan firma hukum dan tidak memberikan nasihat pajak atau hukum resmi. Untuk opsi pendaftaran negara bagian, silakan kunjungi situs resmi mereka.",
    "cardEntityStatus": "Status Entitas Perusahaan",
    "cardShieldTitle": "Perisai Korporat AS",
    "cardActiveBadge": "Aktif",
    "cardAgentTitle": "Agen Terdaftar",
    "cardAgentSub": "Mencakup Seluruh 50 Negara Bagian AS",
    "cardPrivacyTitle": "Privasi Alamat",
    "cardPrivacySub": "Data Pemilik Dilindungi (Jika Diizinkan Hukum)",
    "cardBoiTitle": "Panduan FinCEN BOI",
    "cardBoiSub": "Pemantauan Pengecualian & Aturan Federal",
    "cardMailTitle": "Ruang Surat Digital",
    "cardMailSub": "Pemindaian Online di Hari yang Sama",
    "cardFootnote": "Direkomendasikan oleh Safi Academy untuk pendiri internasional dan domestik."
  }
};

export function getBusinessFormationTranslation(locale: string): BusinessFormationTranslation {
  const normalized = (locale || "en").toLowerCase();
  return businessFormationTranslations[normalized] || businessFormationTranslations.en;
}
