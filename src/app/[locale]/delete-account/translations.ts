// ============================================================================
// DELETE ACCOUNT PORTAL 19-LANGUAGE TRANSLATIONS (COLOCATED)
// ============================================================================

export interface DeleteAccountFaqItem {
  q: string;
  a: string;
}

export interface DeleteAccountListItem {
  lead: string;
  text: string;
}

export interface DeleteAccountTranslation {
  isRtl: boolean;
  badge: string;
  title: string;
  desc: string;
  warningTitle: string;
  warningDesc: string;
  gracePeriodNotice: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  nameLabel: string;
  emailLabel: string;
  reasonLabel: string;
  detailsLabel: string;
  confirm1: string;
  confirm2: string;
  submitBtn: string;
  processingBtn: string;
  successTitle: string;
  successDesc: string;
  referenceLabel: string;
  copyBtn: string;
  copiedBtn: string;
  errEmail: string;
  errName: string;
  errConfirm: string;
  backHome: string;
  certifiedBadge: string;
  onlineRequestBadge: string;
  whatNext: string;
  submitAnother: string;
  namePlaceholder: string;
  optionalLabel: string;
  reasonGoal: string;
  reasonPrivacy: string;
  reasonDuplicate: string;
  reasonAppIssues: string;
  reasonOther: string;
  feedbackPlaceholder: string;
  purgedDataTitle: string;
  purgedDataSubtitle: string;
  purgedItems: DeleteAccountListItem[];
  retentionExceptionsTitle: string;
  retentionExceptionsSubtitle: string;
  retentionItems: DeleteAccountListItem[];
  faqBadge: string;
  faqTitle: string;
  faqs: DeleteAccountFaqItem[];
  methodsBadge: string;
  methodsTitle: string;
  method1Badge: string;
  method1Title: string;
  method1Desc: string;
  method1Step1: string;
  method1Step2: string;
  method1Step3: string;
  method1Btn: string;
  method2Badge: string;
  method2Title: string;
  method2Desc: string;
  method2Note: string;
  method2Btn: string;
  method3Badge: string;
  method3Title: string;
  method3Desc: string;
  method3Subject: string;
  method3Btn: string;
  transparencyBadge: string;
  transparencyTitle: string;
  transparencyDesc: string;
  legalOversightTitle: string;
  legalOversightDesc: string;
  emailLabelPrefix: string;
  officeLabelPrefix: string;
}

export const deleteAccountTranslationsMap: Record<string, DeleteAccountTranslation> = {
  "en": {
    "methodsBadge": "Termination Channels",
    "methodsTitle": "Three Ways to Terminate Your Account",
    "method1Badge": "Method 1 • In-App",
    "method1Title": "Safi Academy Mobile App",
    "method1Desc": "If you have the Safi Academy iOS or Android application installed on your device, you can delete your account instantly from within your profile:",
    "method1Step1": "Open the Safi Academy app and tap your Profile.",
    "method1Step2": "Go to Settings & Privacy → Security.",
    "method1Step3": "Tap Delete Account and confirm with your password.",
    "method1Btn": "Download App",
    "method2Badge": "Method 2 • Direct Web Form",
    "method2Title": "Online Request Dispatch",
    "method2Desc": "Recommended if you uninstalled the mobile application or no longer have device access. Fill out the verified request form below on this page.",
    "method2Note": "Instant Ticket Generation: A cryptographic deletion reference ticket will be issued immediately upon submission.",
    "method2Btn": "Jump to Request Form",
    "method3Badge": "Method 3 • Legal Officer",
    "method3Title": "Data Protection Officer",
    "method3Desc": "Send a formal written erasure request under UK GDPR Article 17 directly to our designated Data Protection Officer and compliance secretariat:",
    "method3Subject": "Subject: UK GDPR Article 17 — Account Erasure Request",
    "method3Btn": "Email Legal Office",
    "transparencyBadge": "Transparency & Governance",
    "transparencyTitle": "Data Erasure vs. Statutory Retention",
    "transparencyDesc": "We operate with absolute transparency regarding exactly what is purged and what must be held under UK statutory law.",
    "legalOversightTitle": "Statutory Legal Oversight",
    "legalOversightDesc": "Safi Academy is a registered institution governed by Safi International Capital LTD. For formal legal notices, subpoena inquiries, or compliance correspondence, contact our London secretariat:",
    "emailLabelPrefix": "Email:",
    "officeLabelPrefix": "Registered Office:",

    "isRtl": false,
    "badge": "GDPR & Privacy Compliance Desk",
    "title": "Permanent Account Deletion Portal",
    "desc": "Initiate verified account deletion, cryptographic credential purge, and data removal in compliance with GDPR, UK Data Protection Act, and California Consumer Privacy Act (CCPA).",
    "warningTitle": "Mandatory Notice Regarding Permanent Deletion",
    "warningDesc": "Deleting your account permanently purges your student profile, live classroom attendance records, enrolled courses, and homework archives.",
    "gracePeriodNotice": "Safi Academy enforces a mandatory 30-Day Cooling-Off Period. You may cancel deletion within 30 days by simply logging in or contacting support.",
    "step1Title": "1. Identity & Dossier Verification",
    "step1Desc": "Authenticate your student email and registered name against our Supabase IAM ledger.",
    "step2Title": "2. 30-Day Inactive State",
    "step2Desc": "Your account is placed in an inactive status for 30 calendar days to protect against accidental loss.",
    "step3Title": "3. Cryptographic Data Purge",
    "step3Desc": "All personally identifiable data is permanently purged across active databases and backups.",
    "nameLabel": "Full Registered Name",
    "emailLabel": "Registered Account Email Address",
    "reasonLabel": "Primary Reason for Account Deletion",
    "detailsLabel": "Additional Feedback or Constructive Notes",
    "confirm1": "I understand that all my course progress, LMS files, and active subscriptions will be permanently purged.",
    "confirm2": "I understand this action cannot be undone after the mandatory 30-day cooling-off period expires.",
    "submitBtn": "Submit Formal Account Deletion Request",
    "processingBtn": "Dispatching Secure Deletion Dossier...",
    "successTitle": "Account Deletion Request Registered",
    "successDesc": "Your deletion request has been formally recorded and placed into the 30-day cooling-off state.",
    "referenceLabel": "Request Reference Ticket",
    "copyBtn": "Copy Ticket",
    "copiedBtn": "Copied!",
    "errEmail": "Please enter a valid registered email address.",
    "errName": "Please provide your full registered name.",
    "errConfirm": "You must check both confirmation boxes before submitting.",
    "backHome": "Back to Homepage",
    "certifiedBadge": "UK GDPR & App Store Certified",
    "onlineRequestBadge": "Online Account Erasure Request",
    "whatNext": "What happens next:",
    "submitAnother": "Submit Another Request",
    "namePlaceholder": "e.g. Alexander Wright",
    "optionalLabel": "Optional",
    "reasonGoal": "I have completed my academic goals",
    "reasonPrivacy": "Privacy / Data Sovereignty considerations",
    "reasonDuplicate": "I have a duplicate or secondary account",
    "reasonAppIssues": "Technical difficulties with the mobile application",
    "reasonOther": "Other reason (Please specify below)",
    "feedbackPlaceholder": "Tell us how we can improve Safi Academy or provide specific data erasure notes...",
    "purgedDataTitle": "Permanently Purged Data",
    "purgedDataSubtitle": "Erased on Day 30",
    "purgedItems": [
      {
        "lead": "Profile Credentials:",
        "text": "Full name, email address, password hashes, phone numbers, avatars, and bio."
      },
      {
        "lead": "Session & OAuth Tokens:",
        "text": "Google Sign-In tokens, Apple ID tokens, active JWT sessions, and device push tokens."
      },
      {
        "lead": "Learning Telemetry:",
        "text": "Video watch percentages, module completion timestamps, quiz scores, and student coding assignments."
      },
      {
        "lead": "Community & Communications:",
        "text": "Forum discussion threads, private messages with mentors, likes, comments, and media uploads."
      },
      {
        "lead": "Gamification & Honors:",
        "text": "Experience points (XP), Wall of Fame leaderboard rankings, trophy badges, and reward tokens."
      }
    ],
    "retentionExceptionsTitle": "Statutory Retention Exceptions",
    "retentionExceptionsSubtitle": "Mandated by UK Law",
    "retentionItems": [
      {
        "lead": "Tax & Invoicing Records (6 Years):",
        "text": "HM Revenue & Customs (HMRC) and the UK Companies Act mandate retaining transaction receipts, invoice IDs, and VAT calculations for 6 years."
      },
      {
        "lead": "Anti-Money Laundering (AML) Compliance:",
        "text": "Where financial payments were executed via SafiPay banking gateways, transaction logs are archived in encrypted cold storage pursuant to UK financial crime statutes."
      },
      {
        "lead": "Anonymized Cryptographic Hashes:",
        "text": "Hashes of issued academic diplomas remain on public ledger nodes to prevent fraudulent counterfeit diploma claims, but all personally identifiable information (PII) is permanently stripped."
      },
      {
        "lead": "Security Audit Logs (90 Days):",
        "text": "Anonymized server access logs and firewall IP event hashes are retained for 90 days under legitimate interest to prevent coordinated cyberattacks and DDoS attempts."
      }
    ],
    "faqBadge": "Answers & Clarifications",
    "faqTitle": "Account Deletion FAQ",
    "faqs": [
      {
        "q": "What happens to my enrolled courses and educational certificates?",
        "a": "Upon account deletion, all active course enrollments, lecture progress, quiz submissions, and personal certificates in your portal will be permanently removed. If you require proof of your past achievements, download and save all your cryptographic PDF certificates and transcripts BEFORE initiating deletion."
      },
      {
        "q": "Can I cancel my account deletion request if I change my mind?",
        "a": "Yes. Safi Academy enforces a mandatory 30-Day Cooling-Off (Grace) Period. During these 30 calendar days, your account is placed in an inactive, locked state. You can cancel deletion by logging back in or contacting support with your Reference Ticket."
      },
      {
        "q": "What happens to remaining balances in my SafiPay or Academy wallet?",
        "a": "Any remaining credits, cash balances, or scholarship stipends stored in your account wallet must be either withdrawn or utilized prior to submitting an account deletion request. Account deletion forfeits unspent platform-specific tokens."
      },
      {
        "q": "Why must some financial records be retained after account deletion?",
        "a": "Under the statutory laws of England and Wales, HM Revenue & Customs (HMRC) regulations, and international Anti-Money Laundering directives, Safi International Capital LTD is legally required to retain transaction receipts and accounting ledgers for a statutory period of 6 years."
      },
      {
        "q": "How does this portal comply with Google Play Store & Apple App Store rules?",
        "a": "Both Google Play and Apple App Store mandate that applications allowing account creation must provide an in-app deletion button AND an external web-based URL where users can request deletion without needing the app installed. This page is our official App Store Deletion Gateway."
      },
      {
        "q": "How can I contact the Data Protection Officer (DPO) directly?",
        "a": "You may reach our legal compliance team and Data Protection Officer at contact@safiacademy.org or by physical post to: Safi International Capital LTD, 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom."
      }
    ]
  },
  "fa": {
    "methodsBadge": "روش‌های لغو و بستن حساب",
    "methodsTitle": "سه روش رسمی برای حذف و ابطال دائمی حساب کاربری",
    "method1Badge": "روش ۱ • درون اپلیکیشن",
    "method1Title": "اپلیکیشن موبایل اکادمی صافی",
    "method1Desc": "در صورتی که اپلیکیشن اندروید یا آی‌او‌اس اکادمی صافی را نصب دارید، می‌توانید مستقیماً از بخش نمایه حساب خود را حذف کنید:",
    "method1Step1": "اپلیکیشن اکادمی صافی را باز کرده و به بخش نمایه (Profile) بروید.",
    "method1Step2": "وارد بخش تنظیمات و حریم خصوصی ← امنیت شوید.",
    "method1Step3": "روی گزینه «حذف حساب» ضربه بزنید و رمز عبور را تأیید نمایید.",
    "method1Btn": "دانلود اپلیکیشن",
    "method2Badge": "روش ۲ • فرم رسمی وب",
    "method2Title": "ارسال مستقیم درخواست از وب‌سایت",
    "method2Desc": "اگر به اپلیکیشن دسترسی ندارید یا آن را حذف کرده‌اید، فرم تأییدشده زیر در همین صفحه را با مشخصات رسمی تکمیل کنید.",
    "method2Note": "صدور آنی شناسه پیگیری: پس از ارسال، فوراً یک شماره پیگیری رمزنگاری‌شده صادر می‌گردد.",
    "method2Btn": "رفتن به فرم درخواست",
    "method3Badge": "روش ۳ • بخش حقوقی",
    "method3Title": "مسئول محافظت از داده‌ها (DPO)",
    "method3Desc": "ارسال درخواست رسمی مکتوب مطابق ماده ۱۷ مقررات GDPR بریتانیا به ایمیل رسمی بازرس حفاظت از حریم خصوصی داده‌ها:",
    "method3Subject": "موضوع: درخواست پاک‌سازی حساب کاربری بر اساس ماده ۱۷ GDPR",
    "method3Btn": "ارسال ایمیل به دفتر حقوقی",
    "transparencyBadge": "شفافیت و حاکمیت داده‌ها",
    "transparencyTitle": "تفاوت پاک‌سازی داده‌ها و نگهداری الزامی قانونی",
    "transparencyDesc": "ما با بالاترین سطح شفافیت عمل می‌کنیم؛ مواردی که کاملاً حذف می‌شوند و آنچه طبق قوانین مالیاتی بریتانیا الزامی است.",
    "legalOversightTitle": "نظارت قانونی و ثبتی شرکت",
    "legalOversightDesc": "اکادمی بین‌المللی صافی تحت نظارت حقوقی شرکت رسمی Safi International Capital LTD فعالیت می‌نماید. جهت مکاتبات قضایی یا رسمی با دبیرخانه لندن در ارتباط باشید:",
    "emailLabelPrefix": "ایمیل رسمی:",
    "officeLabelPrefix": "دفتر ثبت‌شده بریتانیا:",

    "isRtl": true,
    "badge": "دپارتمان انطباق با حریم خصوصی و GDPR",
    "title": "پورتال امحای دائمی حساب کاربری",
    "desc": "ثبت رسمی درخواست حذف حساب کاربری، امحای مدارک رمزنگاری‌شده و پاکسازی داده‌ها مطابق با قوانین GDPR بریتانیا و استانداردهای جهانی.",
    "warningTitle": "اخطار مهم و الزامی در خصوص حذف غیرقابل بازگشت",
    "warningDesc": "حذف حساب کاربری منجر به پاک شدن همیشگی پرونده آموزشی، دوره‌های خریداری‌شده، نمرات آزمون‌ها و پروژه‌های شما می‌گردد.",
    "gracePeriodNotice": "آکادمی صافی مهلت ۳۰ روزه تجدید نظر در نظر گرفته است. در طول ۳۰ روز می‌توانید با ورود به حساب، درخواست حذف را لغو کنید.",
    "step1Title": "۱. احراز هویت و بررسی پرونده",
    "step1Desc": "تطبیق ایمیل ثبت‌نامی و نام دانشجو با پایگاه داده امنیتی Supabase.",
    "step2Title": "۲. دوره تعلیق ۳۰ روزه",
    "step2Desc": "حساب شما به مدت ۳۰ روز در حالت غیرفعال قرار می‌گیرد تا از حذف تصادفی جلوگیری شود.",
    "step3Title": "۳. امحای کامل و رمزنگاری‌شده داده‌ها",
    "step3Desc": "کلیه داده‌های هویتی و سوابق از پایگاه‌های داده و نسخه‌های پشتیبان پاکسازی می‌شوند.",
    "nameLabel": "نام و نام خانوادگی ثبت‌شده",
    "emailLabel": "آدرس ایمیل متصل به حساب",
    "reasonLabel": "علت اصلی درخواست حذف حساب کاربری",
    "detailsLabel": "توضیحات تکمیلی یا نظرات پیشنهادی",
    "confirm1": "می‌دانم که تمام پیشرفت دوره‌ها، فایل‌ها و اشتراک‌های فعال من برای همیشه حذف خواهند شد.",
    "confirm2": "می‌دانم که پس از پایان مهلت ۳۰ روزه، این اقدام به هیچ وجه قابل بازگشت نخواهد بود.",
    "submitBtn": "ثبت نهایی درخواست امحای حساب کاربری",
    "processingBtn": "در حال ارسال پرونده امنیتی امحا...",
    "successTitle": "درخواست امحای حساب با موفقیت ثبت گردید",
    "successDesc": "درخواست شما ثبت شد و وارد دوره تعلیق ۳۰ روزه گردید. شناسه پیگیری خود را یادداشت فرمایید.",
    "referenceLabel": "کد پیگیری رسمی درخواست",
    "copyBtn": "کپی کد",
    "copiedBtn": "کپی شد!",
    "errEmail": "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
    "errName": "لطفاً نام و نام خانوادگی کامل خود را وارد کنید.",
    "errConfirm": "باید هر دو گزینه تأیید را قبل از ارسال تیک بزنید.",
    "backHome": "بازگشت به صفحه اصلی",
    "certifiedBadge": "تایید شده مطابق با UK GDPR و استانداردهای اپ استور",
    "onlineRequestBadge": "ثبت آنلاین درخواست امحای حساب کاربری",
    "whatNext": "مراحل بعدی چیست:",
    "submitAnother": "ثبت درخواست دیگر",
    "namePlaceholder": "مثال: احمد شاه",
    "optionalLabel": "اختیاری",
    "reasonGoal": "به اهداف آموزشی خود رسیده‌ام",
    "reasonPrivacy": "ملاحظات مربوط به حریم خصوصی",
    "reasonDuplicate": "حساب کاربری تکراری دارم",
    "reasonAppIssues": "مشکلات فنی با اپلیکیشن",
    "reasonOther": "دلایل دیگر (در کادر زیر بنویسید)",
    "feedbackPlaceholder": "نظرات و پیشنهادات خود را برای بهبود آکادمی با ما در میان بگذارید...",
    "purgedDataTitle": "داده‌هایی که برای همیشه امحا می‌شوند",
    "purgedDataSubtitle": "پاکسازی کامل در روز ۳۰ام",
    "purgedItems": [
      {
        "lead": "مشخصات و مدارک پروفایل:",
        "text": "نام کامل، نشانی ایمیل، رمزهای هش‌شده، شماره‌های تماس، عکس نمایه و بیوگرافی."
      },
      {
        "lead": "توکن‌های نشست و ورود:",
        "text": "توکن‌های ورود با گوگل و اپل، نشست‌های فعال JWT و توکن‌های نوتیفیکیشن موبایل."
      },
      {
        "lead": "سوابق آموزشی و تحصیلی:",
        "text": "درصد مشاهده ویدیوها، زمان‌بندی تکمیل دوره‌ها، نمرات کوییزها و تمرین‌های برنامه‌نویسی."
      },
      {
        "lead": "پیام‌ها و ارتباطات انجمن:",
        "text": "تاپیک‌های انجمن، گفتگوهای خصوصی با اساتید، لایک‌ها، دیدگاه‌ها و فایل‌های آپلود شده."
      },
      {
        "lead": "امتیازات و تالار افتخارات:",
        "text": "امتیاز تجربه (XP)، رتبه‌بندی در لیدربورد، نشان‌های افتخار و جوایز کسب‌شده."
      }
    ],
    "retentionExceptionsTitle": "استثنائات نگهداری قانونی داده‌ها",
    "retentionExceptionsSubtitle": "الزام‌شده توسط قوانین بریتانیا",
    "retentionItems": [
      {
        "lead": "اسناد مالی و فاکتورها (۶ سال):",
        "text": "سازمان مالیات بریتانیا (HMRC) و قانون شرکت‌ها نگهداری رسیدها و فاکتورهای مالیاتی را تا ۶ سال الزامی می‌دانند."
      },
      {
        "lead": "انطباق با مبارزه با پولشویی (AML):",
        "text": "سوابق تراکنش‌های مالی در سرورهای ابری امن و رمزنگاری‌شده مطابق قوانین مالیاتی بایگانی می‌شوند."
      },
      {
        "lead": "هش‌های رمزنگاری ناشناس مدارک:",
        "text": "هش مدارک فارغ‌التحصیلی برای اثبات اصالت گواهی در دفتر کل عمومی باقی می‌ماند اما مشخصات فردی پاک می‌شود."
      },
      {
        "lead": "لاگ‌های امنیتی سرور (۹۰ روز):",
        "text": "لاگ‌های فنی فایروال به مدت ۹۰ روز صرفاً برای دفاع در برابر حملات سایبری و دیداس نگهداری می‌شوند."
      }
    ],
    "faqBadge": "پرسش‌ها و راهنمایی‌ها",
    "faqTitle": "پرسش‌های متداول حذف حساب کاربری",
    "faqs": [
      {
        "q": "چه بر سر دوره‌های ثبت‌نام‌شده و گواهی‌نامه‌های من خواهد آمد؟",
        "a": "با امحای حساب، تمام سوابق دوره‌ها، پیشرفت ویدیوها و گواهی‌نامه‌ها پاک می‌شوند. حتماً قبل از تایید نهایی، فایل‌های PDF مدارک خود را دانلود و ذخیره نمایید."
      },
      {
        "q": "آیا امکان لغو درخواست حذف در طول دوره تعلیق وجود دارد؟",
        "a": "بله؛ شما ۳۰ روز تقویمی فرصت دارید تا با ورود مجدد به پورتال یا تماس با پشتیبانی، فرآیند حذف را لغو فرمایید."
      },
      {
        "q": "موجودی کیف پول و حساب صافی‌پی چه می‌شود؟",
        "a": "کلیه اعتبارات و موجودی‌های کیف پول باید قبل از ثبت درخواست تسویه یا برداشت شوند. پس از حذف، توکن‌های مصرف‌نشده باطل می‌گردند."
      },
      {
        "q": "چرا برخی اسناد مالی پس از حذف حساب نگهداری می‌شوند؟",
        "a": "بر اساس قوانین مالیاتی بریتانیا (HMRC) و استانداردهای حسابداری، نگهداری فاکتورها و سوابق پرداختی تا ۶ سال الزامی است."
      },
      {
        "q": "این پورتال چگونه الزامات گوگل پلی و اپ استور را تامین می‌کند؟",
        "a": "این دو فروشگاه ملزم می‌کنند که امکان حذف حساب هم در داخل اپلیکیشن و هم از طریق یک صفحه وب عمومی بدون نیاز به نصب برنامه وجود داشته باشد."
      },
      {
        "q": "چگونه می‌توانم مستقیماً با مسئول حفاظت از داده‌ها (DPO) تماس بگیرم؟",
        "a": "می‌توانید با ارسال ایمیل به contact@safiacademy.org یا از طریق آدرس دفتر مرکزی لندن با تیم حقوقی ما در ارتباط باشید."
      }
    ]
  },
  "ps": {
    "methodsBadge": "د حساب بندولو رسمي لارې",
    "methodsTitle": "ستاسو د کارن حساب د تلپاتې ړنګولو ۳ رسمي لارې",
    "method1Badge": "۱ طریقه • په موبایل اپلیکیشن کې",
    "method1Title": "د صافي اکاډمۍ موبایل اپلیکیشن",
    "method1Desc": "که تاسو په خپل موبایل کې د صافي اکاډمۍ اپلیکیشن لرئ، نو کولی شئ په مستقیم ډول له خپل پروفایل څخه حساب پاک کړئ:",
    "method1Step1": "د صافي اکاډمۍ اپلیکیشن پرانیزئ او خپل پروفایل باندې ټک وکړئ.",
    "method1Step2": "د تنظیماتو او محرمیت (Settings & Privacy) ← امنیت (Security) برخې ته لاړ شئ.",
    "method1Step3": "د حساب ړنګولو (Delete Account) انتخاب کړئ او خپل پټنوم تایید کړئ.",
    "method1Btn": "اپلیکیشن ښکته کړئ",
    "method2Badge": "۲ طریقه • رسمي انلاین فورمه",
    "method2Title": "له وېبپاڼې د غوښتنلیک لېږل",
    "method2Desc": "که چېرې تاسو اپلیکیشن نلرئ یا مو پاک کړی وي، لاندې تایید شوې رسمي فورمه ډکه او واستوئ.",
    "method2Note": "د تعقیب کوډ سمدستي صدور: د غوښتنې له ثبت وروسته سملاسي د ډیټا پاکولو رسمي کوډ درکول کېږي.",
    "method2Btn": "د غوښتنلیک فورمې ته ورشئ",
    "method3Badge": "۳ طریقه • حقوقي څانګه",
    "method3Title": "د ډیټا د خوندیتوب مسؤل (DPO)",
    "method3Desc": "د بریتانیا د GDPR د ۱۷مې مادې له مخې زموږ د معلوماتو د محرمیت مسؤل ته رسمي غوښتنلیک واستوئ:",
    "method3Subject": "موضوع: د GDPR ۱۷مې مادې له مخې د حساب د ړنګولو رسمي غوښتنه",
    "method3Btn": "حقوقي څانګې ته برېښنالیک",
    "transparencyBadge": "شفافیت او د ډیټا حاکمیت",
    "transparencyTitle": "د معلوماتو بشپړ ړنګول او قانوني ساتنه",
    "transparencyDesc": "موږ په پوره روڼتیا کار کوو؛ کوم معلومات چې د تل لپاره پاکېږي او کوم اسناد چې د بریتانیا د قانون له مخې ساتل کېږي.",
    "legalOversightTitle": "قانوني او اداري نظارت",
    "legalOversightDesc": "صافي اکاډمي د Safi International Capital LTD تر رسمي قانوني چتر لاندې ثبت او اداره کېږي. د رسمي مکتوبونو لپاره د لندن دفتر سره اړیکه ونیسئ:",
    "emailLabelPrefix": "رسمي برېښنالیک:",
    "officeLabelPrefix": "په لندن کې ثبت شوی دفتر:",

    "isRtl": true,
    "badge": "د GDPR او د محرمیت د څارنې څانګه",
    "title": "د حساب د تلپاتې ړنګولو پورتال",
    "desc": "د انګلستان د GDPR قوانینو او نړیوالو معیارونو سره سم د حساب رسمي ړنګول، د رمزونو له منځه وړل او د شخصي معلوماتو پاکول.",
    "warningTitle": "د نه بېرته راګرځېدونکي ړنګولو په اړه لازمي خبرداری",
    "warningDesc": "د حساب په ړنګولو سره ستاسو درسي سوابق، راجستر شوي کورسونه، د ازموینو نمرې او دندې د تل لپاره پاکېږي.",
    "gracePeriodNotice": "صافي اکاډمۍ د ۳۰ ورځو د فکر کولو موده ټاکلې ده. په دې موده کې تاسو کولی شئ حساب ته په ننوتلو سره دا پروسه لغوه کړئ.",
    "step1Title": "۱. د هویت تصدیق او د دوسیې کتنه",
    "step1Desc": "زموږ په امنیتي ډیټابیس کې د راجستر شوي برېښنالیک او نوم دقیق تصدیق.",
    "step2Title": "۲. د ۳۰ ورځو غیرفعال حالت",
    "step2Desc": "ستاسو حساب د ناڅاپي زیان څخه د مخنیوي لپاره د ۳۰ ورځو لپاره په قفل حالت کې ساتل کېږي.",
    "step3Title": "۳. د معلوماتو بشپړ کوډ شوی امحا",
    "step3Desc": "ټول شخصي معلومات له فعالو ډیټابیسونو او شاتړ نسخو څخه په بشپړه توګه پاکېږي.",
    "nameLabel": "بشپړ راجستر شوی نوم",
    "emailLabel": "د حساب د نښلېدو برېښنالیک پته",
    "reasonLabel": "د حساب د ړنګولو اصلي لامل",
    "detailsLabel": "نور معلومات یا د ښه والي وړاندیزونه",
    "confirm1": "زه پوهېږم چې زما د کورسونو ټول پرمختګونه، درسي فایلونه او فعال غړیتوبونه به د تل لپاره پاک شي.",
    "confirm2": "زه پوهېږم چې د ۳۰ ورځو د مودې له پای ته رسېدو وروسته دا کړنه په هیڅ ډول بېرته نه راګرځي.",
    "submitBtn": "د حساب ړنګولو رسمي غوښتنه وسپارئ",
    "processingBtn": "د دوسیې د خوندي استولو په حال کې...",
    "successTitle": "د حساب ړنګولو غوښتنه ثبت شوه",
    "successDesc": "ستاسو غوښتنه ثبت شوه او د ۳۰ ورځو د تعلیق حالت ته لاړه. خپل د تعقیب کوډ یادداشت کړئ.",
    "referenceLabel": "د غوښتنې رسمي حواله کوډ",
    "copyBtn": "کوډ کاپي کړئ",
    "copiedBtn": "کاپي شو!",
    "errEmail": "مهرباني وکړئ د برېښنالیک سمه پته ولیکئ.",
    "errName": "مهرباني وکړئ خپل بشپړ نوم دننه کړئ.",
    "errConfirm": "تاسو باید د غوښتنې له استولو مخکې دواړه تصدیقي بکسونه ټک کړئ.",
    "backHome": "اصلي پاڼې ته ستنېدل",
    "certifiedBadge": "د UK GDPR او App Store تایید شوی",
    "onlineRequestBadge": "د حساب د پاکولو آنلاین رسمي غوښتنه",
    "whatNext": "راتلونکي ګامونه څه دي:",
    "submitAnother": "بله غوښتنه ثبت کړئ",
    "namePlaceholder": "مثال: احمد شاه",
    "optionalLabel": "اختیاري",
    "reasonGoal": "خپلو تعلیمي موخو ته رسېدلی یم",
    "reasonPrivacy": "د محرمیت او معلوماتو ساتنې اندېښنې",
    "reasonDuplicate": "اضافي یا تکراري حساب لرم",
    "reasonAppIssues": "له موبایل اپلیکیشن سره تخنیکي ستونزې",
    "reasonOther": "نور لاملونه (لاندې یې ولیکئ)",
    "feedbackPlaceholder": "خپل نظر یا وړاندیز له موږ سره شریک کړئ ترڅو اکاډمۍ نوره هم ښه کړو...",
    "purgedDataTitle": "هغه معلومات چې د تل لپاره پاکېږي",
    "purgedDataSubtitle": "په ۳۰مه ورځ بشپړ پاکېدل",
    "purgedItems": [
      {
        "lead": "د پروفایل معلومات:",
        "text": "بشپړ نوم، د برېښنالیک پته، پټ نومونه، د تلیفون شمیرې، او انځور."
      },
      {
        "lead": "د ننوتلو توکنونه:",
        "text": "د ګوګل او ایپل توکنونه، فعالې امنیتي ناستې او د خبرتیاو کوډونه."
      },
      {
        "lead": "تعلیمي لاسته راوړنې:",
        "text": "د ویډیوګانو د کتلو فیصدي، د ازموینو نمرې او بشپړ شوي پروګرامونه."
      },
      {
        "lead": "د ټولنې اړیکې:",
        "text": "د بحثونو فورمونه، استادانو ته استول شوي پیغامونه او نظریات."
      },
      {
        "lead": "نمرې او افتخارات:",
        "text": "د اکاډمۍ ټکي، د ویاړونو په تخته کې مقامونه او ترلاسه شوي نښانونه."
      }
    ],
    "retentionExceptionsTitle": "د قانوني ساتلو استثناګانې",
    "retentionExceptionsSubtitle": "د انګلستان د قانون له مخې لازمي",
    "retentionItems": [
      {
        "lead": "مالیاتي او حسابي اسناد (۶ کاله):",
        "text": "د انګلستان د مالیاتو اداره (HMRC) د راکړې ورکړې د بلونو ساتنه تر ۶ کلونو پورې لازمي بولي."
      },
      {
        "lead": "د ناقانونه پیسو د مخنیوي قوانین:",
        "text": "مالي راکړې ورکړې په پټو او خوندي سرورونو کې د مالي جرمونو د مخنیوي د قوانینو له مخې ساتل کېږي."
      },
      {
        "lead": "د اسنادو پټ کوډونه:",
        "text": "د فراغت د اسنادو اصلي کوډونه په عامه سیسټم کې د جعلي اسنادو د مخنیوي لپاره پاتې کېږي خو نوم ترې لیرې کېږي."
      },
      {
        "lead": "امنیتي لاګونه (۹۰ ورځې):",
        "text": "د فایروال تخنیکي ثبتونه د ۹۰ ورځو لپاره د سایبري بریدونو د مخنیوي په موخه ساتل کېږي."
      }
    ],
    "faqBadge": "ځوابونه او روښانتیاوې",
    "faqTitle": "د حساب د ړنګولو په اړه ډېرې پوښتنې",
    "faqs": [
      {
        "q": "زما په بشپړو شویو کورسونو او سندونو به څه پېښ شي؟",
        "a": "د حساب په ړنګېدو سره ستاسو ټول کورسونه او اسناد پاکېږي. د ړنګولو له پیل مخکې خپل ټول PDF اسناد ښکته او خوندي کړئ."
      },
      {
        "q": "ایا د فکر کولو په موده کې د ړنګولو پروسه لغوه کولی شم؟",
        "a": "هو؛ تاسو ۳۰ ورځې وخت لرئ چې حساب ته په ننوتلو یا ملاتړ ډلې ته په خبر ورکولو دا پروسه بنده کړئ."
      },
      {
        "q": "د بټوې او شته پیسو وضعیت څه کېږي؟",
        "a": "په اکاونټ کې ټولې پاتې پیسې باید د حساب له ړنګولو مخکې وایستل شي؛ وروسته له هغې نه ورکول کېږي."
      },
      {
        "q": "ولې ځینې مالي اسناد له ړنګولو وروسته هم پاتې کېږي؟",
        "a": "د انګلستان د مالي قوانینو او شرکتونو د اصولو له مخې، رسمي بلونه او د مالیاتو اسناد باید تر ۶ کلونو پورې وساتل شي."
      },
      {
        "q": "دا پورتال د Google Play او App Store قوانین څنګه پوره کوي؟",
        "a": "دواړه پلورنځي لازمي بولي چې د اپلیکیشن دننه او همدارنګه په ویب پاڼه کې پرته له اپلیکیشن څخه د حساب د ړنګولو تڼۍ شتون ولري."
      },
      {
        "q": "څنګه د محرمیت له مسؤل (DPO) سره مخامخ اړیکه ونیسم؟",
        "a": "تاسو کولی شئ په contact@safiacademy.org برېښنالیک له لارې زموږ له حقوقي ټیم سره تماس ونیسئ."
      }
    ]
  },
  "ar": {
    "methodsBadge": "قنوات إغلاق الحساب",
    "methodsTitle": "ثلاث طرق رسمية لحذف حسابك نهائياً",
    "method1Badge": "الطريقة الأولى • داخل التطبيق",
    "method1Title": "تطبيق أكاديمية صافي للهاتف المحمول",
    "method1Desc": "إذا كان تطبيق أكاديمية صافي مثبتاً على جهازك، يمكنك حذف حسابك مباشرة وبشكل فوري من الملف الشخصي:",
    "method1Step1": "افتح تطبيق أكاديمية صافي واضغط على الملف الشخصي (Profile).",
    "method1Step2": "انتقل إلى الإعدادات والخصوصية ← الأمان والحماية.",
    "method1Step3": "اضغط على «حذف الحساب» وأكد رغبتك بإدخال كلمة المرور.",
    "method1Btn": "تحميل التطبيق",
    "method2Badge": "الطريقة الثانية • النموذج المباشر",
    "method2Title": "تقديم طلب الحذف عبر الموقع",
    "method2Desc": "يوصى بهذه الطريقة إذا قمت بإلغاء تثبيت التطبيق أو فقدت الوصول للجهاز. يرجى تعبئة النموذج المعتمد أدناه.",
    "method2Note": "إصدار فوري لتذكرة المتابعة: سيتم إنشاء كود مرجعي مشفر بمجرد إرسال الطلب.",
    "method2Btn": "الانتقال إلى نموذج الحذف",
    "method3Badge": "الطريقة الثالثة • الشؤون القانونية",
    "method3Title": "مسؤول حماية البيانات (DPO)",
    "method3Desc": "إرسال طلب خطي رسمي بموجب المادة 17 من اللائحة العامة لحماية البيانات في بريطانيا (UK GDPR) إلى مسؤول الخصوصية:",
    "method3Subject": "الموضوع: طلب محو الحساب بموجب المادة 17 من UK GDPR",
    "method3Btn": "مراسلة المكتب القانوني",
    "transparencyBadge": "الشفافية والحوكمة القانونية",
    "transparencyTitle": "محو البيانات مقابل الالتزامات القانونية للاحتفاظ",
    "transparencyDesc": "نعمل بشفافية تامة لتوضيح البيانات التي يتم شطبها نهائياً وتلك التي يتطلب القانون المالي البريطاني حفظها.",
    "legalOversightTitle": "الإشراف القانوني والمؤسسي",
    "legalOversightDesc": "أكاديمية صافي مؤسسة مسجلة تدار بواسطة Safi International Capital LTD. للمراسلات القضائية الرسمية يرجى التواصل مع أمانة لندن:",
    "emailLabelPrefix": "البريد الإلكتروني:",
    "officeLabelPrefix": "المكتب المسجل في لندن:",

    "isRtl": true,
    "badge": "مكتب الامتثال لـ GDPR والخصوصية",
    "title": "بوابة الحذف النهائي للحساب",
    "desc": "تقديم طلب رسمي لحذف الحساب وتطهير البيانات الرقمية وفقاً للائحة GDPR وقوانين حماية البيانات في المملكة المتحدة.",
    "warningTitle": "إشعار إلزامي بشأن الحذف غير القابل للاسترداد",
    "warningDesc": "يؤدي حذف حسابك إلى مسح ملفك التعليمي، وسجلات الحضور المباشر، والدورات المسجلة، وأرشيف الواجبات نهائياً.",
    "gracePeriodNotice": "تطبق أكاديمية صافي فترة سماح إلزامية مدتها 30 يوماً. يمكنك إلغاء الحذف خلالها بمجرد تسجيل الدخول أو التواصل مع الدعم.",
    "step1Title": "1. التحقق من الهوية والملف",
    "step1Desc": "مطابقة بريدك الإلكتروني واسمك المسجل مع سجلات الأمان في Supabase.",
    "step2Title": "2. فترة التجميد لمدة 30 يوماً",
    "step2Desc": "يتم وضع حسابك في حالة غير نشطة لمدة 30 يوماً للحماية من الحذف غير المقصود.",
    "step3Title": "3. التطهير المشفر للبيانات",
    "step3Desc": "يتم مسح جميع البيانات الشخصية نهائياً من قواعد البيانات النشطة والنسخ الاحتياطية.",
    "nameLabel": "الاسم الكامل المسجل",
    "emailLabel": "البريد الإلكتروني المرتبط بالحساب",
    "reasonLabel": "السبب الرئيسي لطلب حذف الحساب",
    "detailsLabel": "ملاحظات إضافية أو مقترحات للتطوير",
    "confirm1": "أدرك أن جميع دوراتي وملفاتي واشتراكاتي النشطة سيتم مسحها نهائياً.",
    "confirm2": "أدرك أنه لا يمكن التراجع عن هذا الإجراء بعد انتهاء فترة السماح البالغة 30 يوماً.",
    "submitBtn": "إرسال طلب الحذف النهائي للحساب",
    "processingBtn": "جاري إرسال ملف الحذف الآمن...",
    "successTitle": "تم تسجيل طلب حذف الحساب بنجاح",
    "successDesc": "تم قيد طلبك وبدأت فترة التهدئة البالغة 30 يوماً. يرجى الاحتفاظ برقم التذكرة المرجعية.",
    "referenceLabel": "رقم التذكرة المرجعية للطلب",
    "copyBtn": "نسخ الرقم",
    "copiedBtn": "تم النسخ!",
    "errEmail": "يرجى إدخال بريد إلكتروني صحيح ومسجل.",
    "errName": "يرجى إدخال اسمك الكامل المسجل.",
    "errConfirm": "يجب تأكيد كلا المربعين قبل المتابعة.",
    "backHome": "العودة إلى الصفحة الرئيسية",
    "certifiedBadge": "معتمد وفق UK GDPR ومتجر التطبيقات",
    "onlineRequestBadge": "طلب إلكتروني رسمي لمحور البيانات",
    "whatNext": "ماذا يحدث بعد ذلك:",
    "submitAnother": "تقديم طلب آخر",
    "namePlaceholder": "مثال: محمد العمري",
    "optionalLabel": "اختياري",
    "reasonGoal": "حققت أهدافي التعليمية بنجاح",
    "reasonPrivacy": "اعتبارات تتعلق بالخصوصية وسيادة البيانات",
    "reasonDuplicate": "لدي حساب مكرر أو ثانوي",
    "reasonAppIssues": "صعوبات تقنية في تطبيق الهاتف المحمول",
    "reasonOther": "أسباب أخرى (يرجى التحديد أدناه)",
    "feedbackPlaceholder": "شاركنا مقترحاتك لتحسين خدمات الأكاديمية...",
    "purgedDataTitle": "البيانات التي سيتم محوها نهائياً",
    "purgedDataSubtitle": "مسح كامل في اليوم الثلاثين",
    "purgedItems": [
      {
        "lead": "بيانات الملف الشخصي:",
        "text": "الاسم الكامل، البريد الإلكتروني، كلمات المرور المشفرة، أرقام الهواتف، والصور الشخصية."
      },
      {
        "lead": "رموز الجلسة والتوثيق:",
        "text": "رموز تسجيل الدخول عبر Google و Apple، وجلسات JWT النشطة، ومعرفات الإشعارات."
      },
      {
        "lead": "السجلات التعليمية:",
        "text": "نسب مشاهدة الدروس، تواريخ إتمام الوحدات، نتائج الاختبارات، وتطبيقات البرمجة."
      },
      {
        "lead": "مشاركات المجتمع:",
        "text": "نقاشات المنتدى، الرسائل الخاصة مع المدربين، الإعجابات، والتعليقات."
      },
      {
        "lead": "النقاط وقوائم الشرف:",
        "text": "نقاط الخبرة (XP)، لوحة المتصدرين العامة، الشارات التقديرية، والرموز التحفيزية."
      }
    ],
    "retentionExceptionsTitle": "الاستثناءات القانونية للاحتفاظ بالبيانات",
    "retentionExceptionsSubtitle": "مفروضة بموجب قوانين المملكة المتحدة",
    "retentionItems": [
      {
        "lead": "السجلات الضريبية والمالية (6 سنوات):",
        "text": "تلزم مصلحة الضرائب البريطانية (HMRC) بالاحتفاظ بإيصالات المعاملات وفواتير ضريبة القيمة المضافة لمدة 6 سنوات."
      },
      {
        "lead": "مكافحة غسل الأموال (AML):",
        "text": "تُحفظ سجلات المدفوعات المنفذة في مستودعات مشفرة وفقاً لتشريعات مكافحة الجرائم المالية."
      },
      {
        "lead": "التجزئة المشفرة للشهادات:",
        "text": "تبقى التجزئات الرياضية للشهادات المصدرة على السجل العام لمنع التزوير مع إزالة أي بيانات تعريفية."
      },
      {
        "lead": "سجلات التدقيق الأمني (90 يوماً):",
        "text": "تُحفظ سجلات جدار الحماية وعناوين IP لمدة 90 يوماً لحماية الخوادم من الهجمات السيبرانية."
      }
    ],
    "faqBadge": "إجابات وتوضيحات",
    "faqTitle": "الأسئلة الشائعة حول حذف الحساب",
    "faqs": [
      {
        "q": "ماذا يحدث للدورات المسجلة والشهادات الأكاديمية؟",
        "a": "سيتم مسح كافة سجلات الدورات والشهادات نهائياً عند اكتمال الحذف. ننصح بشدة بتنزيل نسخ PDF لشهاداتك قبل تقديم الطلب."
      },
      {
        "q": "هل يمكنني إلغاء طلب الحذف أثناء فترة التهدئة؟",
        "a": "نعم، لديك مهلة 30 يوماً تقويمياً يمكنك خلالها إلغاء الحذف بمجرد الدخول إلى حسابك أو مراسلة الدعم الفني."
      },
      {
        "q": "ماذا يحدث للرصيد المالي في محفظة الأكاديمية؟",
        "a": "يجب سحب أو استخدام أي مبالغ أو أرصدة متبقية قبل تقديم الطلب، حيث تسقط الأرصدة غير المستخدمة بعد الحذف."
      },
      {
        "q": "لماذا يجب الاحتفاظ ببعض السجلات المالية بعد الحذف؟",
        "a": "تفرض القوانين البريطانية على الشركات الاحتفاظ بالفواتير والسجلات المحاسبية لمدة 6 سنوات للأغراض الضريبية."
      },
      {
        "q": "كيف تتوافق هذه البوابة مع متطلبات Google Play و App Store؟",
        "a": "يشترط كلا المتجرين توفير خيار الحذف من داخل التطبيق ومن خلال رابط ويب خارجي مستقل دون الحاجة لتثبيت التطبيق."
      },
      {
        "q": "كيف يمكنني التواصل مباشرة مع مسؤول حماية البيانات (DPO)؟",
        "a": "يمكنك مراسلة فريقنا القانوني عبر contact@safiacademy.org أو عبر البريد إلى مقرنا في لندن."
      }
    ]
  },
  "ur": {
    "methodsBadge": "اکاؤنٹ ختم کرنے کے طریقے",
    "methodsTitle": "اپنا اکاؤنٹ مستقل طور پر ختم کرنے کے ۳ سرکاری طریقے",
    "method1Badge": "طریقہ ۱ • موبائل ایپ کے اندر",
    "method1Title": "صافی اکیڈمی موبائل ایپلیکیشن",
    "method1Desc": "اگر آپ کے فون پر صافی اکیڈمی ایپ موجود ہے تو آپ اپنی پروفائل سے براہ راست اور فوری طور پر اکاؤنٹ حذف کر سکتے ہیں:",
    "method1Step1": "صافی اکیڈمی ایپ کھولیں اور اپنے پروفائل پر ٹیپ کریں۔",
    "method1Step2": "ترتیبات اور رازداری (Settings & Privacy) ← سیکیورٹی پر جائیں۔",
    "method1Step3": "اکاؤنٹ حذف کریں (Delete Account) پر ٹیپ کریں اور پاس ورڈ درج کرکے تصدیق کریں۔",
    "method1Btn": "ایپ ڈاؤن لوڈ کریں",
    "method2Badge": "طریقہ ۲ • براہ راست ویب فارم",
    "method2Title": "ویب سائٹ سے آن لائن درخواست",
    "method2Desc": "اگر آپ کے پاس ایپ موجود نہیں ہے تو اس صفحے پر نیچے دیا گیا تصدیق شدہ سرکاری فارم پُر کر کے جمع کروائیں۔",
    "method2Note": "فوری ٹریکنگ ٹکٹ کا اجرا: درخواست جمع ہوتے ہی ایک انکرپٹڈ تصدیقی ریفرنس کوڈ فوری جاری کیا جائے گا۔",
    "method2Btn": "درخواست فارم پر جائیں",
    "method3Badge": "طریقہ ۳ • قانونی شعبہ",
    "method3Title": "ڈیٹا پروٹیکشن آفیسر (DPO)",
    "method3Desc": "برطانوی GDPR کے آرٹیکل 17 کے تحت ہمارے ڈیٹا پروٹیکشن آفیسر کو باضابطہ تحریری درخواست ای میل کریں:",
    "method3Subject": "موضوع: برطانوی GDPR آرٹیکل 17 کے تحت اکاؤنٹ کے خاتمے کی درخواست",
    "method3Btn": "قانونی دفتر کو ای میل کریں",
    "transparencyBadge": "شفافیت اور قانونی نظم و ضبط",
    "transparencyTitle": "ڈیٹا کا خاتمہ بمقابلہ قانونی تحفظ کی ذمہ داریاں",
    "transparencyDesc": "ہم مکمل شفافیت کے ساتھ کام کرتے ہیں تاکہ واضح رہے کہ کون سا ڈیٹا مستقل مٹایا جاتا ہے اور کون سا برطانوی قانون کے تحت برقرار رہتا ہے۔",
    "legalOversightTitle": "قانونی اور کارپوریٹ نگرانی",
    "legalOversightDesc": "صافی اکیڈمی ایک رجسٹرڈ ادارہ ہے جو Safi International Capital LTD کے زیر انتظام ہے۔ قانونی مراسلات کے لیے لندن سیکریٹریٹ سے رابطہ کریں:",
    "emailLabelPrefix": "سرکاری ای میل:",
    "officeLabelPrefix": "لندن کا رجسٹرڈ دفتر:",

    "isRtl": true,
    "badge": "جی ڈی پی آر اور پرائیویسی کمپلائنس ڈیسک",
    "title": "اکاؤنٹ کو مستقل حذف کرنے کا پورٹل",
    "desc": "برطانیہ کے GDPR قوانین اور بین الاقوامی معیارات کے تحت اکاؤنٹ کو مستقل حذف کرنے اور ڈیٹا کو محفوظ طریقے سے صاف کرنے کی باضابطہ درخواست۔",
    "warningTitle": "مستقل خاتمے سے متعلق لازمی نوٹس",
    "warningDesc": "اکاؤنٹ ڈیلیٹ کرنے سے آپ کا تعلیمی پروفائل، لائیو کلاسز کی حاضری، کورسز اور ہوم ورک کا ریکارڈ ہمیشہ کے لیے مٹ جائے گا۔",
    "gracePeriodNotice": "صفی اکیڈمی 30 دن کی لازمی مہلت فراہم کرتی ہے۔ اس دوران آپ لاگ ان ہو کر یا سپورٹ سے رابطہ کر کے درخواست منسوخ کر سکتے ہیں۔",
    "step1Title": "1. شناخت اور ریکارڈ کی تصدیق",
    "step1Desc": "ہمارے سیکیورٹی ڈیٹا بیس کے ذریعے آپ کے رجسٹرڈ ای میل اور نام کی تصدیق۔",
    "step2Title": "2. 30 دن کی غیر فعال حالت",
    "step2Desc": "حادثاتی نقصان سے بچاؤ کے لیے آپ کے اکاؤنٹ کو 30 دن کے لیے معطل حالت میں رکھا جاتا ہے۔",
    "step3Title": "3. ڈیٹا کا مکمل کرپٹوگرافک خاتمہ",
    "step3Desc": "تمام ذاتی معلومات کو ایکٹو ڈیٹا بیس اور بیک اپ سے ہمیشہ کے لیے صاف کر دیا جاتا ہے۔",
    "nameLabel": "مکمل رجسٹرڈ نام",
    "emailLabel": "اکاؤنٹ کا رجسٹرڈ ای میل ایڈریس",
    "reasonLabel": "اکاؤنٹ ڈیلیٹ کرنے کی بنیادی وجہ",
    "detailsLabel": "اضافی تفصیلات یا بہتری کے لیے تجاویز",
    "confirm1": "میں سمجھتا ہوں کہ میرے تمام کورسز کی پیش رفت، فائلیں اور سبسکرپشنز مستقل طور پر ختم ہو جائیں گی۔",
    "confirm2": "میں سمجھتا ہوں کہ 30 دن کی مہلت ختم ہونے کے بعد یہ عمل کسی بھی صورت واپس نہیں ہو سکے گا۔",
    "submitBtn": "اکاؤنٹ ڈیلیٹ کرنے کی باضابطہ درخواست جمع کروائیں",
    "processingBtn": "سیکیورٹی فائل بھیجی جا رہی ہے...",
    "successTitle": "درخواست کامیابی سے رجسٹر ہو گئی ہے",
    "successDesc": "آپ کی درخواست موصول ہو چکی ہے اور 30 دن کی عبوری مدت شروع ہو گئی ہے۔ اپنا ریفرینس کوڈ محفوظ فرمائیں۔",
    "referenceLabel": "درخواست کا آفیشل ریفرینس کوڈ",
    "copyBtn": "کوڈ کاپی کریں",
    "copiedBtn": "کاپی ہو گیا!",
    "errEmail": "براہ کرم درست رجسٹرڈ ای میل ایڈریس درج کریں۔",
    "errName": "براہ کرم اپنا مکمل رجسٹرڈ نام فراہم کریں۔",
    "errConfirm": "درخواست جمع کرانے سے پہلے دونوں خانوں کی تصدیق لازمی ہے۔",
    "backHome": "مرکزی صفحہ پر واپس جائیں",
    "certifiedBadge": "UK GDPR اور ایپ اسٹور سے تصدیق شدہ",
    "onlineRequestBadge": "ڈیٹا مٹانے کی آن لائن باضابطہ درخواست",
    "whatNext": "اگلے مراحل کیا ہیں:",
    "submitAnother": "دوسری درخواست جمع کروائیں",
    "namePlaceholder": "مثال: علی احمد خان",
    "optionalLabel": "اختیاری",
    "reasonGoal": "میں نے اپنے تعلیمی اہداف مکمل کر لیے ہیں",
    "reasonPrivacy": "رازداری اور ڈیٹا کے تحفظ سے متعلق تحفظات",
    "reasonDuplicate": "میرے پاس ایک اضافی اکاؤنٹ موجود ہے",
    "reasonAppIssues": "موبائل ایپلیکیشن کے تکنیکی مسائل",
    "reasonOther": "دیگر وجوہات (براہ کرم نیچے درج کریں)",
    "feedbackPlaceholder": "اکیڈمی کو مزید بہتر بنانے کے لیے اپنی تجاویز لکھیں...",
    "purgedDataTitle": "وہ ڈیٹا جو ہمیشہ کے لیے مٹا دیا جائے گا",
    "purgedDataSubtitle": "30ویں دن مکمل صفائی",
    "purgedItems": [
      {
        "lead": "پروفائل کی تفصیلات:",
        "text": "مکمل نام، ای میل، پاس ورڈ کے ہیشز، فون نمبرز، اور پروفائل تصویر۔"
      },
      {
        "lead": "لاگ ان ٹوکنز:",
        "text": "گوگل اور ایپل کے سائن ان ٹوکنز، فعال JWT سیشنز اور پش نوٹیفکیشن ٹوکنز۔"
      },
      {
        "lead": "تعلیمی پیش رفت کا ریکارڈ:",
        "text": "ویڈیوز دیکھنے کا تناسب، مکمل شدہ کورسز، کوئز کے اسکورز اور اسائنمنٹس۔"
      },
      {
        "lead": "کمیونٹی پیغامات:",
        "text": "فورم کے مباحثے، اساتذہ کو بھیجے گئے پیغامات، تبصرے اور فائلیں۔"
      },
      {
        "lead": "اکیڈمی پوائنٹس اور اعزازات:",
        "text": "حاصل کردہ پوائنٹس، وال آف فیم کی پوزیشنز، اعزازی بیجز اور ٹوکنز۔"
      }
    ],
    "retentionExceptionsTitle": "قانونی استثنیٰ کے تحت محفوظ رکھا جانے والا ڈیٹا",
    "retentionExceptionsSubtitle": "برطانوی قانون کے تحت لازمی",
    "retentionItems": [
      {
        "lead": "ٹیکس اور انوائس ریکارڈز (6 سال):",
        "text": "برطانیہ کا محکمہ ٹیکس (HMRC) انوائسز اور ٹیکس حسابات کو 6 سال تک محفوظ رکھنے کا پابند کرتا ہے۔"
      },
      {
        "lead": "اینٹی منی لانڈرنگ (AML) تعمیل:",
        "text": "مالیاتی ادائیگیوں کا ریکارڈ مالیاتی جرائم کے قوانین کے تحت انکرپٹڈ سسٹمز میں محفوظ رہتا ہے۔"
      },
      {
        "lead": "اسناد کے انکرپٹڈ ہیشز:",
        "text": "جعلی اسناد کی روک تھام کے لیے جاری کردہ اسناد کے ریاضیاتی ہیشز محفوظ رہتے ہیں لیکن ذاتی تفصیلات ہٹا دی جاتی ہیں۔"
      },
      {
        "lead": "سیکیورٹی لاگز (90 دن):",
        "text": "سائبر حملوں اور ہیکنگ سے بچاؤ کے لیے فائر وال کے تکنیکی لاگز 90 دن تک محفوظ رکھے جاتے ہیں۔"
      }
    ],
    "faqBadge": "جوابات اور وضاحتیں",
    "faqTitle": "اکاؤنٹ ڈیلیٹ کرنے کے بارے میں اہم سوالات",
    "faqs": [
      {
        "q": "میرے کورسز اور اسناد کے ساتھ کیا ہوگا؟",
        "a": "اکاؤنٹ ڈیلیٹ ہونے سے تمام کورسز اور اسناد ختم ہو جائیں گی۔ براہ کرم ڈیلیٹ کرنے سے پہلے اپنے تمام سرٹیفکیٹ ڈاؤن لوڈ کر لیں۔"
      },
      {
        "q": "کیا میں 30 دن کی مہلت کے دوران فیصلہ بدل سکتا ہوں؟",
        "a": "جی ہاں؛ آپ 30 دن کے اندر دوبارہ لاگ ان کر کے یا سپورٹ سے رابطہ کر کے ڈیلیٹ کرنے کا عمل روک سکتے ہیں۔"
      },
      {
        "q": "اکیڈمی والیٹ میں موجود رقم کا کیا ہوگا؟",
        "a": "درخواست جمع کرانے سے پہلے تمام بیلنس نکالنا یا استعمال کرنا ضروری ہے، بعد میں یہ ناقابل واپسی ہوگا۔"
      },
      {
        "q": "کچھ مالیاتی ریکارڈ کیوں محفوظ رکھے جاتے ہیں؟",
        "a": "برطانوی ٹیکس قوانین اور کمپنی ایکٹ کے تحت مالیاتی رسیدیں 6 سال تک قانونی طور پر محفوظ رکھنا لازمی ہے۔"
      },
      {
        "q": "یہ پورٹل گوگل پلے اور ایپل ایپ اسٹور کے اصولوں کو کیسے پورا کرتا ہے؟",
        "a": "دونوں اسٹورز کی شرط ہے کہ اکاؤنٹ ڈیلیٹ کرنے کا آپشن ایپ کے اندر اور باہر پبلک ویب پیج پر بھی لازمی موجود ہو۔"
      },
      {
        "q": "ڈیٹا پروٹیکشن آفیسر سے کیسے رابطہ کیا جا سکتا ہے؟",
        "a": "آپ contact@safiacademy.org پر ای میل کر کے ہماری قانونی ٹیم سے براہ راست رابطہ کر سکتے ہیں۔"
      }
    ]
  },
  "ru": {
    "methodsBadge": "Каналы прекращения обслуживания",
    "methodsTitle": "Три официальных способа безвозвратного удаления аккаунта",
    "method1Badge": "Способ 1 • В приложении",
    "method1Title": "Мобильное приложение Safi Academy",
    "method1Desc": "Если на вашем устройстве установлено приложение Safi Academy для iOS или Android, вы можете удалить профиль мгновенно:",
    "method1Step1": "Откройте приложение Safi Academy и перейдите в свой профиль.",
    "method1Step2": "Откройте «Настройки и конфиденциальность» → «Безопасность».",
    "method1Step3": "Нажмите «Удалить аккаунт» и подтвердите действие своим паролем.",
    "method1Btn": "Скачать приложение",
    "method2Badge": "Способ 2 • Веб-форма",
    "method2Title": "Подача онлайн-запроса через сайт",
    "method2Desc": "Рекомендуется, если у вас нет доступа к приложению или оно было удалено. Заполните верифицированную форму ниже.",
    "method2Note": "Мгновенная выдача тикета: сразу после отправки формы генерируется криптографический номер обращения.",
    "method2Btn": "Перейти к форме запроса",
    "method3Badge": "Способ 3 • Юридический отдел",
    "method3Title": "Сотрудник по защите данных (DPO)",
    "method3Desc": "Направьте официальный письменный запрос согласно статье 17 регламента UK GDPR назначенному офицеру по защите данных:",
    "method3Subject": "Тема: UK GDPR Article 17 — Запрос на удаление аккаунта",
    "method3Btn": "Написать в юридический отдел",
    "transparencyBadge": "Прозрачность и управление данными",
    "transparencyTitle": "Безвозвратное удаление и обязательное хранение по закону",
    "transparencyDesc": "Мы действуем с полной прозрачностью в отношении того, какие данные удаляются навсегда, а какие сохраняются по законам Великобритании.",
    "legalOversightTitle": "Законодательный и корпоративный надзор",
    "legalOversightDesc": "Safi Academy — зарегистрированная организация под управлением Safi International Capital LTD. Для официальных обращений свяжитесь с секретариатом в Лондоне:",
    "emailLabelPrefix": "Электронная почта:",
    "officeLabelPrefix": "Юридический адрес в Лондоне:",

    "isRtl": false,
    "badge": "Отдел соответствия GDPR и защите данных",
    "title": "Портал безвозвратного удаления аккаунта",
    "desc": "Подача официального заявления на удаление учетной записи, очистку учетных данных и стирание персональной информации в соответствии с регламентом GDPR Великобритании.",
    "warningTitle": "Обязательное уведомление о безвозвратном удалении",
    "warningDesc": "Удаление аккаунта приведет к безвозвратной утрате вашего учебного профиля, записей посещаемости, приобретенных курсов и архива домашних заданий.",
    "gracePeriodNotice": "Академия Safi предоставляет обязательный 30-дневный период ожидания. Вы можете отменить процедуру в течение 30 дней, просто войдя в аккаунт или связавшись с поддержкой.",
    "step1Title": "1. Проверка личности и данных",
    "step1Desc": "Сверка зарегистрированного адреса электронной почты и имени в защищенной базе данных Supabase.",
    "step2Title": "2. 30 дней неактивного статуса",
    "step2Desc": "Аккаунт блокируется на 30 календарных дней для защиты от случайного удаления данных.",
    "step3Title": "3. Криптографическое удаление данных",
    "step3Desc": "Все личные данные безвозвратно удаляются из активных баз данных и резервных копий платформы.",
    "nameLabel": "Полное имя по регистрации",
    "emailLabel": "Электронная почта учетной записи",
    "reasonLabel": "Основная причина удаления аккаунта",
    "detailsLabel": "Дополнительные комментарии или предложения",
    "confirm1": "Я понимаю, что весь учебный прогресс, файлы платформы и активные подписки будут безвозвратно удалены.",
    "confirm2": "Я понимаю, что после истечения 30-дневного периода ожидания действие нельзя будет отменить.",
    "submitBtn": "Подать официальный запрос на удаление",
    "processingBtn": "Отправка защищенного пакета на удаление...",
    "successTitle": "Запрос на удаление аккаунта зарегистрирован",
    "successDesc": "Ваш запрос успешно принят и переведен в статус 30-дневного ожидания. Сохраните номер тикета.",
    "referenceLabel": "Официальный номер обращения",
    "copyBtn": "Копировать",
    "copiedBtn": "Скопировано!",
    "errEmail": "Пожалуйста, введите действительный зарегистрированный адрес e-mail.",
    "errName": "Пожалуйста, укажите ваше полное имя по регистрации.",
    "errConfirm": "Перед отправкой необходимо подтвердить оба пункта согласия.",
    "backHome": "Вернуться на главную",
    "certifiedBadge": "Сертифицировано по UK GDPR и стандартам App Store",
    "onlineRequestBadge": "Официальный онлайн-запрос на стирание данных",
    "whatNext": "Что произойдет дальше:",
    "submitAnother": "Подать другой запрос",
    "namePlaceholder": "напр. Александр Иванов",
    "optionalLabel": "Необязательно",
    "reasonGoal": "Я успешно достиг своих учебных целей",
    "reasonPrivacy": "Соображения конфиденциальности и суверенитета данных",
    "reasonDuplicate": "У меня есть дублирующий или дополнительный аккаунт",
    "reasonAppIssues": "Технические сложности в работе мобильного приложения",
    "reasonOther": "Другая причина (укажите ниже)",
    "feedbackPlaceholder": "Напишите, что мы могли бы улучшить в Академии Safi...",
    "purgedDataTitle": "Данные, подлежащие безвозвратному удалению",
    "purgedDataSubtitle": "Полное стирание на 30-й день",
    "purgedItems": [
      {
        "lead": "Данные профиля:",
        "text": "Полное имя, адрес e-mail, хэши паролей, телефонные номера, фото и биографические сведения."
      },
      {
        "lead": "Токены сеансов:",
        "text": "Токены авторизации Google и Apple, активные сессии JWT и токены push-уведомлений."
      },
      {
        "lead": "Учебные записи:",
        "text": "Процент просмотра видеоуроков, даты завершения модулей, баллы за тесты и файлы с кодом."
      },
      {
        "lead": "Сообщения сообщества:",
        "text": "Темы на форуме, личные переписки с наставниками, лайки, комментарии и загруженные медиа."
      },
      {
        "lead": "Очки и Доска почета:",
        "text": "Очки опыта (XP), рейтинги на Доске почета, наградные значки и токены платформы."
      }
    ],
    "retentionExceptionsTitle": "Законные исключения по хранению данных",
    "retentionExceptionsSubtitle": "Требования законодательства Великобритании",
    "retentionItems": [
      {
        "lead": "Налоговая и бухгалтерская отчетность (6 лет):",
        "text": "Налоговое управление Великобритании (HMRC) обязывает сохранять чеки, счета и расчеты НДС в течение 6 лет."
      },
      {
        "lead": "Законодательство против отмывания денег (AML):",
        "text": "Записи о финансовых транзакциях архивируются в зашифрованных хранилищах согласно финансовым директивам Великобритании."
      },
      {
        "lead": "Анонимизированные криптографические хэши:",
        "text": "Хэши выданных дипломов остаются в публичном реестре для предотвращения подделок, но персональные данные полностью удаляются."
      },
      {
        "lead": "Журналы сетевой безопасности (90 дней):",
        "text": "Анонимизированные журналы доступа к серверу сохраняются в течение 90 дней для отражения DDoS-атак."
      }
    ],
    "faqBadge": "Вопросы и разъяснения",
    "faqTitle": "Часто задаваемые вопросы об удалении аккаунта",
    "faqs": [
      {
        "q": "Что произойдет с моими курсами и сертификатами?",
        "a": "При удалении аккаунта все записи о прохождении курсов и сертификаты будут безвозвратно удалены. Обязательно скачайте все свои PDF-сертификаты ДО подачи заявки."
      },
      {
        "q": "Можно ли отменить удаление во время 30-дневного периода?",
        "a": "Да. В течение 30 календарных дней вы можете возобновить действие аккаунта, просто войдя в него или обратившись в службу поддержки с номером тикета."
      },
      {
        "q": "Что будет с остатком средств на балансе кошелька?",
        "a": "Любые оставшиеся средства должны быть выведены или потрачены до подачи запроса на удаление, так как неизрасходованный баланс аннулируется."
      },
      {
        "q": "Почему некоторые финансовые документы сохраняются?",
        "a": "Законы Великобритании о компаниях и налогах требуют сохранения счетов и финансовых квитанций в течение 6 лет."
      },
      {
        "q": "Как этот портал соблюдает правила Google Play и App Store?",
        "a": "Оба магазина требуют наличия возможности удаления аккаунта как внутри приложения, так и на общедоступной веб-странице без необходимости установки приложения."
      },
      {
        "q": "Как связаться напрямую с инспектором по защите данных (DPO)?",
        "a": "Вы можете отправить письмо на contact@safiacademy.org или направить бумажный запрос по адресу нашей штаб-квартиры в Лондоне."
      }
    ]
  },
  "tr": {
    "methodsBadge": "Hesap Kapatma Kanalları",
    "methodsTitle": "Hesabınızı Kalıcı Olarak Silmenin Üç Resmi Yolu",
    "method1Badge": "Yöntem 1 • Uygulama İçi",
    "method1Title": "Safi Academy Mobil Uygulaması",
    "method1Desc": "Cihazınızda Safi Academy iOS veya Android uygulaması yüklüyse hesabınızı doğrudan profilinizden silebilirsiniz:",
    "method1Step1": "Safi Academy uygulamasını açın ve Profil sekmenize dokunun.",
    "method1Step2": "Ayarlar ve Gizlilik → Güvenlik bölümüne gidin.",
    "method1Step3": "Hesabı Sil seçeneğine dokunun ve şifrenizle onaylayın.",
    "method1Btn": "Uygulamayı İndir",
    "method2Badge": "Yöntem 2 • Doğrudan Web Formu",
    "method2Title": "Web Üzerinden Resmi Talep",
    "method2Desc": "Uygulamayı kaldırdıysanız veya cihaza erişiminiz yoksa önerilir. Bu sayfadaki doğrulanmış talep formunu doldurun.",
    "method2Note": "Anında Takip Numarası: Başvurunuz gönderildiği anda şifrelenmiş bir silme referans numarası üretilir.",
    "method2Btn": "Talep Formuna Git",
    "method3Badge": "Yöntem 3 • Hukuk Departmanı",
    "method3Title": "Veri Koruma Görevlisi (DPO)",
    "method3Desc": "Birleşik Krallık GDPR Madde 17 uyarınca resmi silme talebinizi Veri Koruma Görevlimize yazılı olarak iletin:",
    "method3Subject": "Konu: UK GDPR Madde 17 — Hesap Silme Talebi",
    "method3Btn": "Hukuk Ofisine E-posta Gönder",
    "transparencyBadge": "Şeffaflık ve Veri Yönetişimi",
    "transparencyTitle": "Kalıcı Veri İmhası ve Yasal Saklama İstisnaları",
    "transparencyDesc": "Hangi verilerin kalıcı olarak silindiği ve Birleşik Krallık yasaları gereği nelerin saklanması gerektiği konusunda tam şeffaflıkla çalışıyoruz.",
    "legalOversightTitle": "Yasal ve Kurumsal Denetim",
    "legalOversightDesc": "Safi Academy, Safi International Capital LTD tarafından yönetilen tescilli bir kuruluştur. Resmi hukuki bildirimler için Londra sekreterliğimizle iletişime geçin:",
    "emailLabelPrefix": "E-posta:",
    "officeLabelPrefix": "Londra Kayıtlı Ofisi:",

    "isRtl": false,
    "badge": "GDPR & Gizlilik Uyum Masası",
    "title": "Kalıcı Hesap Silme Portalı",
    "desc": "Birleşik Krallık GDPR mevzuatı ve uluslararası standartlara uygun olarak doğrulanmış hesap silme, kimlik verilerinin temizlenmesi ve veri imhası başvurusu.",
    "warningTitle": "Geri Alınamaz Silme İşlemine İlişkin Zorunlu Bildirim",
    "warningDesc": "Hesabınızın silinmesi öğrenci profilinizi, canlı ders katılım kayıtlarınızı, kayıtlı kurslarınızı ve ödev arşivinizi kalıcı olarak yok eder.",
    "gracePeriodNotice": "Safi Academy 30 günlük zorunlu bir cayma süresi uygular. Bu 30 gün içinde hesabınıza giriş yaparak veya destek ekibine yazarak silme işlemini iptal edebilirsiniz.",
    "step1Title": "1. Kimlik ve Dosya Doğrulaması",
    "step1Desc": "Kayıtlı e-posta adresinizin ve adınızın güvenli Supabase veri tabanımızla eşleştirilmesi.",
    "step2Title": "2. 30 Günlük Askıya Alma Durumu",
    "step2Desc": "Yanlışlıkla veri kaybını önlemek amacıyla hesabınız 30 takvim günü boyunca kilitli tutulur.",
    "step3Title": "3. Kriptografik Veri İmhası",
    "step3Desc": "Tüm kişisel veriler aktif veri tabanlarından ve yedekleme sistemlerinden kalıcı olarak temizlenir.",
    "nameLabel": "Kayıtlı Tam Adınız",
    "emailLabel": "Hesaba Bağlı E-posta Adresi",
    "reasonLabel": "Hesap Silme Talebinin Temel Nedeni",
    "detailsLabel": "Ek Açıklamalar veya Geliştirme Önerileri",
    "confirm1": "Tüm ders ilerlemelerimin, dosyalarımın ve aboneliklerimin kalıcı olarak silineceğini anlıyorum.",
    "confirm2": "30 günlük sürenin ardından bu işlemin kesinlikle geri alınamayacağını kabul ediyorum.",
    "submitBtn": "Resmi Hesap Silme Talebini Gönder",
    "processingBtn": "Güvenli silme dosyası iletiliyor...",
    "successTitle": "Hesap Silme Talebi Başarıyla Alındı",
    "successDesc": "Talebiniz kaydedildi ve 30 günlük bekleme sürecine alındı. Lütfen referans takip kodunuzu saklayın.",
    "referenceLabel": "Resmi Talep Takip Numarası",
    "copyBtn": "Kodu Kopyala",
    "copiedBtn": "Kopyalandı!",
    "errEmail": "Lütfen geçerli ve kayıtlı bir e-posta adresi girin.",
    "errName": "Lütfen tam kayıtlı adınızı belirtin.",
    "errConfirm": "Göndermeden önce her iki onay kutusunu da işaretlemelisiniz.",
    "backHome": "Ana Sayfaya Dön",
    "certifiedBadge": "UK GDPR & App Store Onaylı",
    "onlineRequestBadge": "Çevrimiçi Veri Silme Başvurusu",
    "whatNext": "Bundan sonra ne olacak:",
    "submitAnother": "Başka Bir Talep Gönder",
    "namePlaceholder": "örn. Ahmet Yılmaz",
    "optionalLabel": "İsteğe Bağlı",
    "reasonGoal": "Eğitim hedeflerimi başarıyla tamamladım",
    "reasonPrivacy": "Gizlilik ve veri güvenliği gerekçeleri",
    "reasonDuplicate": "Yinelenen veya ikincil bir hesabım var",
    "reasonAppIssues": "Mobil uygulamada teknik sorunlar yaşadım",
    "reasonOther": "Diğer nedenler (Lütfen aşağıda belirtin)",
    "feedbackPlaceholder": "Akademiyi geliştirmemize yardımcı olacak görüşlerinizi paylaşın...",
    "purgedDataTitle": "Kalıcı Olarak Yok Edilecek Veriler",
    "purgedDataSubtitle": "30. Günde Tamamen Silinir",
    "purgedItems": [
      {
        "lead": "Profil Kimlik Bilgileri:",
        "text": "Tam ad, e-posta adresi, şifre özetleri, telefon numaraları ve profil fotoğrafı."
      },
      {
        "lead": "Oturum Belirteçleri:",
        "text": "Google ve Apple giriş anahtarları, aktif JWT oturumları ve bildirim belirteçleri."
      },
      {
        "lead": "Eğitim İlerleme Kayıtları:",
        "text": "Video izleme oranları, modül tamamlama tarihleri, sınav sonuçları ve kodlama ödevleri."
      },
      {
        "lead": "Topluluk İletişimi:",
        "text": "Forum tartışmaları, eğitmenlere gönderilen özel mesajlar, beğeniler ve yorumlar."
      },
      {
        "lead": "Puanlar ve Başarılar:",
        "text": "Deneyim puanları (XP), Başarı Tablosu dereceleri, madalyalar ve akademi ödülleri."
      }
    ],
    "retentionExceptionsTitle": "Yasal Saklama İstisnaları",
    "retentionExceptionsSubtitle": "Birleşik Krallık Kanunları Gereğince",
    "retentionItems": [
      {
        "lead": "Vergi ve Fatura Kayıtları (6 Yıl):",
        "text": "BK Gelir ve Gümrük İdaresi (HMRC) muhasebe belgelerinin ve KDV hesaplamalarının 6 yıl saklanmasını zorunlu kılar."
      },
      {
        "lead": "Kara Para Aklamayla Mücadele (AML):",
        "text": "Finansal işlemlerle ilgili kayıtlar mali suç mevzuatına uygun olarak şifreli sistemlerde arşivlenir."
      },
      {
        "lead": "Anonimleştirilmiş Sertifika Özetleri:",
        "text": "Verilen diplomaların şifrelenmiş özetleri sahteciliği önlemek için saklanır ancak kimlik bilgileri silinir."
      },
      {
        "lead": "Güvenlik Günlükleri (90 Gün):",
        "text": "Siber saldırılara karşı koruma amacıyla anonim güvenlik duvarı günlükleri 90 gün boyunca tutulur."
      }
    ],
    "faqBadge": "Cevaplar ve Açıklamalar",
    "faqTitle": "Hesap Silme Hakkında Sıkça Sorulan Sorular",
    "faqs": [
      {
        "q": "Kayıtlı kurslarıma ve sertifikalarıma ne olacak?",
        "a": "Hesabınız silindiğinde tüm kurs kayıtları ve sertifikalar kalıcı olarak yok edilir. Silme işleminden önce PDF sertifikalarınızı mutlaka indirin."
      },
      {
        "q": "30 günlük bekleme süresinde silme işlemini iptal edebilir miyim?",
        "a": "Evet. 30 takvim günü içinde hesabınıza tekrar giriş yaparak veya destek ekibine referans kodunuzla ulaşarak işlemi iptal edebilirsiniz."
      },
      {
        "q": "Cüzdanda kalan bakiyelere ne olur?",
        "a": "Hesap silme başvurusundan önce tüm bakiyeler çekilmeli veya harcanmalıdır; silme sonrasında kalan bakiyeler geçersiz sayılır."
      },
      {
        "q": "Neden bazı mali kayıtlar silinme sonrasında da tutulur?",
        "a": "Birleşik Krallık ticaret ve vergi mevzuatı uyarınca şirketler finansal faturaları 6 yıl boyunca yasal olarak saklamakla yükümlüdür."
      },
      {
        "q": "Bu portal Google Play ve App Store kurallarına nasıl uyum sağlar?",
        "a": "Her iki uygulama mağazası da hesap silme seçeneğinin hem uygulama içinde hem de uygulama kurulmadan web üzerinden sunulmasını zorunlu tutar."
      },
      {
        "q": "Veri Koruma Görevlisi (DPO) ile nasıl doğrudan görüşebilirim?",
        "a": "contact@safiacademy.org adresine e-posta göndererek veya Londra'daki genel merkezimize yazarak hukuk ekibimizle iletişime geçebilirsiniz."
      }
    ]
  },
  "zh": {
    "methodsBadge": "注销渠道",
    "methodsTitle": "永久注销并删除账户的三种官方途径",
    "method1Badge": "途径一 • 应用内操作",
    "method1Title": "Safi Academy 移动应用",
    "method1Desc": "如果您的设备上安装了 Safi Academy 的 iOS 或 Android 应用，可直接在个人资料中即时删除账户：",
    "method1Step1": "打开 Safi Academy 应用程序，点击您的个人资料（Profile）。",
    "method1Step2": "前往「设置与隐私」（Settings & Privacy）→「安全」（Security）。",
    "method1Step3": "点击「删除账户」（Delete Account）并输入登录密码确认。",
    "method1Btn": "下载移动应用",
    "method2Badge": "途径二 • 在线提交表单",
    "method2Title": "官网直接申请清除",
    "method2Desc": "若您已卸载应用程序或无法使用移动设备，请在下方填写官方认证的账户注销申请表单。",
    "method2Note": "即时生成工单号：表单提交后将立即生成加密的数据清除跟踪编号。",
    "method2Btn": "前往申请表单",
    "method3Badge": "途径三 • 法务与合规",
    "method3Title": "数据保护官（DPO）",
    "method3Desc": "根据英国 GDPR 第 17 条规定，直接向我方指定的数据保护官发送正式的书面数据清除请求：",
    "method3Subject": "主题：UK GDPR 第 17 条 — 账户注销与数据清除申请",
    "method3Btn": "致信法务部门",
    "transparencyBadge": "透明度与数据治理",
    "transparencyTitle": "数据彻底清除与法定留存要求说明",
    "transparencyDesc": "我们保持绝对透明，详细告知哪些个人数据会被彻底清除，哪些记账记录依照英国法律必须依法留存。",
    "legalOversightTitle": "法定合规与公司监管",
    "legalOversightDesc": "Safi Academy 为 Safi International Capital LTD 旗下注册设立的正规教育机构。法务与诉讼公函请联系伦敦秘书处：",
    "emailLabelPrefix": "官方电子邮箱：",
    "officeLabelPrefix": "英国伦敦注册地址：",

    "isRtl": false,
    "badge": "GDPR 与隐私保护合规处",
    "title": "账号永久注销与数据销毁门户",
    "desc": "依据英国 GDPR 及全球隐私法规，提交正式的账户注销申请，执行不可逆的凭证销毁与个人数据彻底清除。",
    "warningTitle": "关于永久注销的重要法律提示",
    "warningDesc": "注销账户将永久抹除您的学员个人档案、直播课出勤记录、已购课程资料及作业提交历史。",
    "gracePeriodNotice": "萨菲学院实行严格的 30 天冷静期。在此 30 天内，您只需重新登录或联系客服即可撤销注销申请。",
    "step1Title": "1. 身份与学籍信息核实",
    "step1Desc": "在 Supabase 安全底层鉴权数据库中核实您的注册邮箱与学生姓名。",
    "step2Title": "2. 30 天账户休眠锁定",
    "step2Desc": "账户将被置为锁定保护状态 30 个自然日，以防误操作导致数据丢失。",
    "step3Title": "3. 密码学数据物理销毁",
    "step3Desc": "所有可识别个人身份的数据均从实时数据库及系统灾备介质中永久抹除。",
    "nameLabel": "注册时填写的完整姓名",
    "emailLabel": "绑定的注册电子邮箱地址",
    "reasonLabel": "申请注销账号的主要原因",
    "detailsLabel": "补充说明或意见建议",
    "confirm1": "我知悉所有课程学习进度、教学资料和有效订阅都将被永久抹除。",
    "confirm2": "我知悉在 30 天冷静期届满之后，此项注销操作将永久不可逆转。",
    "submitBtn": "提交正式账户注销与数据销毁申请",
    "processingBtn": "正在安全加密传输注销档案...",
    "successTitle": "账户注销申请已成功受理事宜",
    "successDesc": "您的注销请求已正式立案并进入 30 天冷静期。请妥善保存您的查询受理编号。",
    "referenceLabel": "申请业务受理编号",
    "copyBtn": "复制编号",
    "copiedBtn": "已复制！",
    "errEmail": "请输入有效的注册电子邮箱地址。",
    "errName": "请输入您在平台注册的真实全名。",
    "errConfirm": "在提交前必须勾选两项确认声明。",
    "backHome": "返回网站首页",
    "certifiedBadge": "英国 GDPR 及应用商店认证合规",
    "onlineRequestBadge": "在线账户与数据彻底销毁通道",
    "whatNext": "后续办理步骤说明：",
    "submitAnother": "提交其他业务申请",
    "namePlaceholder": "例如：张立强",
    "optionalLabel": "选填",
    "reasonGoal": "我已顺利完成全部学术与技能目标",
    "reasonPrivacy": "出于个人隐私与数据安全考量",
    "reasonDuplicate": "存在重复注册或多余账号",
    "reasonAppIssues": "移动端客户端遇到技术障碍",
    "reasonOther": "其他原因（请在下方说明）",
    "feedbackPlaceholder": "请留下宝贵意见以帮助我们不断改进萨菲学院...",
    "purgedDataTitle": "将被彻底永久清除的数据范畴",
    "purgedDataSubtitle": "在注销第 30 天执行全面抹除",
    "purgedItems": [
      {
        "lead": "个人档案凭据：",
        "text": "真实姓名、注册邮箱、加密密码散列、联络电话、头像照片与个人简介。"
      },
      {
        "lead": "会话鉴权令牌：",
        "text": "Google 及 Apple 联合登录令牌、有效 JWT 会话凭据与设备推送令牌。"
      },
      {
        "lead": "教学测验记录：",
        "text": "视频课时完成度、模块考核时间节点、小测验成绩与代码实训项目。"
      },
      {
        "lead": "社区互动记录：",
        "text": "论坛发表主题帖、与导师的私信咨询、点赞记录与上传的多媒体资料。"
      },
      {
        "lead": "积分与荣誉体系：",
        "text": "经验值（XP）、公开光荣榜名次、荣誉勋章以及学院积分奖励。"
      }
    ],
    "retentionExceptionsTitle": "法定义务保留的数据例外说明",
    "retentionExceptionsSubtitle": "依据英国现行法律强制保留",
    "retentionItems": [
      {
        "lead": "税务与发票凭据（保存 6 年）：",
        "text": "英国税务及海关总署（HMRC）和公司法强制要求保存支付凭证与增值税发票 6 年。"
      },
      {
        "lead": "反洗钱（AML）金融合规：",
        "text": "通过银行系统进行的资金交易日志须依据金融犯罪法律法规在加密冷库中归档。"
      },
      {
        "lead": "不可逆加密凭证哈希：",
        "text": "已颁发学术认证证书的数学哈希值保留在公开账本以防伪造，但个人姓名已被彻底抹除。"
      },
      {
        "lead": "安全审计日志（保留 90 天）：",
        "text": "用于抵御黑客与网络 DDoS 攻击的防火墙访问日志保留 90 天后自动覆盖。"
      }
    ],
    "faqBadge": "答疑与深度说明",
    "faqTitle": "账户注销常见问题解答",
    "faqs": [
      {
        "q": "已报名的课程及结业证书会怎样处置？",
        "a": "注销完成后，所有课程权限和档案将永久消除。在提交注销前，请务必提前下载并保存好全部官方 PDF 结业证书。"
      },
      {
        "q": "在冷静期内是否可以随时撤回注销申请？",
        "a": "可以。您拥有整整 30 个自然日的冷静期，期间只需重新登录或凭借受理编号联系客服即可一键终止注销。"
      },
      {
        "q": "钱包内的资金或代币余额将如何处理？",
        "a": "提交申请前必须提现或消费完账户内的全部可用余额，注销生效后未使用的平台积分与代币将自动作废。"
      },
      {
        "q": "为何部分财务记录在注销后仍需保存？",
        "a": "根据英国公司法及税务监管要求，任何商业机构均须将法定账目与付款票据保留 6 年以备法定审计。"
      },
      {
        "q": "该页面如何满足苹果与谷歌应用商店的审核政策？",
        "a": "两家主流应用商店均严格规定：必须同时在 App 内和独立公开的 Web 网页上提供免装 App 即可申请注销的通道。"
      },
      {
        "q": "如何直接与学院数据合规官（DPO）取得联络？",
        "a": "您可致信 contact@safiacademy.org 或向我们英国伦敦总部发送书面公函与合规法务团队沟通。"
      }
    ]
  },
  "hi": {
    "methodsBadge": "खाता समाप्ति के माध्यम",
    "methodsTitle": "अपना खाता स्थायी रूप से हटाने के तीन आधिकारिक तरीके",
    "method1Badge": "तरीका १ • ऐप के भीतर",
    "method1Title": "साफ़ी एकेडमी मोबाइल ऐप",
    "method1Desc": "यदि आपके पास साफ़ी एकेडमी का iOS या Android ऐप इंस्टॉल है, तो आप अपनी प्रोफ़ाइल से सीधे खाता हटा सकते हैं:",
    "method1Step1": "साफ़ी एकेडमी ऐप खोलें और अपनी प्रोफ़ाइल पर टैप करें।",
    "method1Step2": "सेटिंग्स और गोपनीयता (Settings & Privacy) → सुरक्षा पर जाएं।",
    "method1Step3": "खाता हटाएं (Delete Account) पर टैप करें और अपने पासवर्ड से पुष्टि करें।",
    "method1Btn": "ऐप डाउनलोड करें",
    "method2Badge": "तरीका २ • सीधा वेब फॉर्म",
    "method2Title": "ऑनलाइन खाता समाप्ति अनुरोध",
    "method2Desc": "यदि आपने मोबाइल ऐप अनइंस्टॉल कर दिया है या डिवाइस तक पहुंच नहीं है, तो नीचे दिया गया सत्यापित फॉर्म भरें।",
    "method2Note": "तत्काल ट्रैकिंग टिकट: अनुरोध सबमिट होते ही एक एन्क्रिप्टेड रेफरेंस नंबर जारी किया जाएगा।",
    "method2Btn": "अनुरोध फॉर्म पर जाएं",
    "method3Badge": "तरीका ३ • कानूनी विभाग",
    "method3Title": "डेटा संरक्षण अधिकारी (DPO)",
    "method3Desc": "यूके जीडीपीआर अनुच्छेद 17 के तहत हमारे नामित डेटा संरक्षण अधिकारी को औपचारिक लिखित अनुरोध भेजें:",
    "method3Subject": "विषय: UK GDPR Article 17 — खाता हटाने का अनुरोध",
    "method3Btn": "कानूनी कार्यालय को ईमेल करें",
    "transparencyBadge": "पारदर्शिता और डेटा सुशासन",
    "transparencyTitle": "डेटा निष्कासन बनाम वैधानिक रिकॉर्ड प्रतिधारण",
    "transparencyDesc": "हम पूर्ण पारदर्शिता से काम करते हैं कि कौन सा व्यक्तिगत डेटा स्थायी रूप से हटाया जाता है और क्या यूके कानून के तहत सुरक्षित रखा जाता है।",
    "legalOversightTitle": "वैधानिक और कॉर्पोरेट निरीक्षण",
    "legalOversightDesc": "साफ़ी एकेडमी Safi International Capital LTD द्वारा संचालित एक पंजीकृत संस्थान है। कानूनी पत्राचार के लिए हमारे लंदन सचिवालय से संपर्क करें:",
    "emailLabelPrefix": "आधिकारिक ईमेल:",
    "officeLabelPrefix": "लंदन में पंजीकृत कार्यालय:",

    "isRtl": false,
    "badge": "GDPR और डेटा गोपनीयता अनुपालन डेस्क",
    "title": "स्थायी खाता विलोपन पोर्टल",
    "desc": "UK GDPR और अंतरराष्ट्रीय गोपनीयता मानकों के अनुपालन में आधिकारिक खाता विलोपन और व्यक्तिगत डेटा को नष्ट करने का आवेदन।",
    "warningTitle": "अपरिवर्तनीय विलोपन के संबंध में अनिवार्य सूचना",
    "warningDesc": "खाता हटाने से आपका छात्र प्रोफ़ाइल, लाइव कक्षाओं की उपस्थिति, नामांकित पाठ्यक्रम और असाइनमेंट हमेशा के लिए मिट जाएंगे।",
    "gracePeriodNotice": "सफी एकेडमी 30 दिनों की अनिवार्य विचार अवधि प्रदान करती है। इस अवधि में आप दोबारा लॉगिन करके या सहायता टीम से संपर्क करके इसे रद्द कर सकते हैं।",
    "step1Title": "1. पहचान और रिकॉर्ड सत्यापन",
    "step1Desc": "हमारे सुरक्षित डेटाबेस के माध्यम से आपके पंजीकृत ईमेल और नाम का मिलान।",
    "step2Title": "2. 30 दिनों की निष्क्रिय अवस्था",
    "step2Desc": "आकस्मिक नुकसान से सुरक्षा के लिए आपका खाता 30 दिनों के लिए लॉक स्थिति में रखा जाता है।",
    "step3Title": "3. पूर्ण डेटा विलोपन",
    "step3Desc": "सभी व्यक्तिगत डेटा को सक्रिय डेटाबेस और बैकअप से स्थायी रूप से हटा दिया जाता है।",
    "nameLabel": "पंजीकृत पूरा नाम",
    "emailLabel": "खाते से जुड़ा पंजीकृत ईमेल",
    "reasonLabel": "खाता हटाने का मुख्य कारण",
    "detailsLabel": "अतिरिक्त विवरण या सुधार के लिए सुझाव",
    "confirm1": "मैं समझता हूँ कि मेरी सभी पाठ्यक्रम प्रगति, फ़ाइलें और सक्रिय सदस्यताएँ स्थायी रूप से हटा दी जाएंगी।",
    "confirm2": "मैं समझता हूँ कि 30 दिनों की अवधि समाप्त होने के बाद यह कार्रवाई किसी भी तरह से पूर्ववत नहीं की जा सकेगी।",
    "submitBtn": "स्थायी खाता विलोपन अनुरोध सबमिट करें",
    "processingBtn": "अनुरोध सुरक्षित रूप से भेजा जा रहा है...",
    "successTitle": "खाता विलोपन अनुरोध सफलतापूर्वक दर्ज हुआ",
    "successDesc": "आपका अनुरोध दर्ज हो गया है और 30 दिनों की कूलिंग-ऑफ अवधि शुरू हो गई है। कृपया संदर्भ टिकट संभाल कर रखें।",
    "referenceLabel": "अनुरोध संदर्भ टिकट संख्या",
    "copyBtn": "टिकट कॉपी करें",
    "copiedBtn": "कॉपी हो गया!",
    "errEmail": "कृपया एक वैध पंजीकृत ईमेल पता दर्ज करें।",
    "errName": "कृपया अपना पूरा पंजीकृत नाम दर्ज करें।",
    "errConfirm": "सबमिट करने से पहले दोनों पुष्टि बॉक्स चेक करना अनिवार्य है।",
    "backHome": "मुख्य पृष्ठ पर लौटें",
    "certifiedBadge": "UK GDPR और ऐप स्टोर प्रमाणित",
    "onlineRequestBadge": "ऑनलाइन डेटा विलोपन औपचारिक अनुरोध",
    "whatNext": "आगे की प्रक्रिया क्या है:",
    "submitAnother": "एक और अनुरोध दर्ज करें",
    "namePlaceholder": "उदा. राहुल शर्मा",
    "optionalLabel": "वैकल्पिक",
    "reasonGoal": "मैंने अपने शैक्षणिक लक्ष्य पूरे कर लिए हैं",
    "reasonPrivacy": "गोपनीयता और डेटा सुरक्षा संबंधी विचार",
    "reasonDuplicate": "मेरे पास एक डुप्लिकेट या अतिरिक्त खाता है",
    "reasonAppIssues": "मोबाइल ऐप में तकनीकी समस्याएं आ रही हैं",
    "reasonOther": "अन्य कारण (कृपया नीचे निर्दिष्ट करें)",
    "feedbackPlaceholder": "हम सफी एकेडमी को और कैसे बेहतर बना सकते हैं, इस पर अपने सुझाव दें...",
    "purgedDataTitle": "वह डेटा जो हमेशा के लिए मिटा दिया जाएगा",
    "purgedDataSubtitle": "30वें दिन पूर्ण रूप से नष्ट",
    "purgedItems": [
      {
        "lead": "प्रोफ़ाइल विवरण:",
        "text": "पूरा नाम, ईमेल पता, पासवर्ड हैश, फोन नंबर, प्रोफ़ाइल फ़ोटो और विवरण।"
      },
      {
        "lead": "सत्र टोकन:",
        "text": "Google और Apple लॉगिन टोकन, सक्रिय JWT सत्र और सूचना टोकन।"
      },
      {
        "lead": "शैक्षणिक प्रगति:",
        "text": "वीडियो देखने का प्रतिशत, पाठ्यक्रम समाप्ति समय, क्विज़ स्कोर और कोडिंग प्रोजेक्ट।"
      },
      {
        "lead": "समुदाय और संदेश:",
        "text": "फ़ोरम चर्चाएँ, शिक्षकों के साथ निजी संदेश, टिप्पणियाँ और अपलोड की गई फ़ाइलें।"
      },
      {
        "lead": "अंक और सम्मान:",
        "text": "अनुभव अंक (XP), वॉल ऑफ़ फेम रैंकिंग, सम्मान पदक और अकादमी टोकन।"
      }
    ],
    "retentionExceptionsTitle": "कानूनी रूप से सुरक्षित रखने योग्य अपवाद",
    "retentionExceptionsSubtitle": "यूके कानूनों के तहत अनिवार्य",
    "retentionItems": [
      {
        "lead": "कर और इनवॉइस रिकॉर्ड (6 वर्ष):",
        "text": "ब्रिटिश कर विभाग (HMRC) और कंपनी अधिनियम के अनुसार वित्तीय रसीदों और वैट इनवॉइस को 6 साल तक रखना अनिवार्य है।"
      },
      {
        "lead": "एंटी-मनी लॉन्ड्रिंग (AML) अनुपालन:",
        "text": "वित्तीय लेनदेन का रिकॉर्ड वित्तीय अपराध कानूनों के तहत एन्क्रिप्टेड सिस्टम में संग्रहीत रहता है।"
      },
      {
        "lead": "डिप्लोमा के एन्क्रिप्टेड हैश:",
        "text": "नकली प्रमाणपत्रों की रोकथाम के लिए सार्वजनिक लेज़र पर हैश सुरक्षित रहते हैं, लेकिन व्यक्तिगत नाम हटा दिया जाता है।"
      },
      {
        "lead": "सुरक्षा लॉग (90 दिन):",
        "text": "साइबर हमलों से सुरक्षा के लिए फ़ायरवॉल सुरक्षा लॉग 90 दिनों तक रखे जाते हैं।"
      }
    ],
    "faqBadge": "उत्तर और स्पष्टीकरण",
    "faqTitle": "खाता विलोपन संबंधी अक्सर पूछे जाने वाले प्रश्न",
    "faqs": [
      {
        "q": "मेरे पाठ्यक्रमों और प्रमाणपत्रों का क्या होगा?",
        "a": "खाता हटाने पर सभी पाठ्यक्रम और प्रमाणपत्र हमेशा के लिए नष्ट हो जाएंगे। अनुरोध भेजने से पहले अपने सभी PDF प्रमाणपत्र डाउनलोड कर लें।"
      },
      {
        "q": "क्या मैं 30 दिनों की अवधि के दौरान विलोपन रद्द कर सकता हूँ?",
        "a": "हाँ; आपके पास 30 दिनों का समय है जिसमें आप दोबारा लॉगिन करके या सहायता टीम से संपर्क करके प्रक्रिया रोक सकते हैं।"
      },
      {
        "q": "अकादमी वॉलेट में शेष राशि का क्या होगा?",
        "a": "अनुरोध करने से पहले वॉलेट की शेष राशि निकाल लेना या उपयोग कर लेना आवश्यक है; बाद में इसे पुनः प्राप्त नहीं किया जा सकता।"
      },
      {
        "q": "कुछ वित्तीय रिकॉर्ड क्यों रखे जाते हैं?",
        "a": "यूके के टैक्स कानूनों के तहत कंपनियों के लिए वित्तीय रसीदों और बिलों को 6 साल तक संभाल कर रखना कानूनी अनिवार्यता है।"
      },
      {
        "q": "यह पोर्टल Google Play और App Store के नियमों को कैसे पूरा करता है?",
        "a": "दोनों ऐप स्टोर यह अनिवार्य करते हैं कि खाता विलोपन का विकल्प ऐप के अंदर और बिना ऐप के सार्वजनिक वेब पेज पर उपलब्ध हो।"
      },
      {
        "q": "डेटा सुरक्षा अधिकारी (DPO) से सीधे कैसे संपर्क करें?",
        "a": "आप contact@safiacademy.org पर ईमेल भेजकर हमारी कानूनी टीम से सीधे संपर्क कर सकते हैं।"
      }
    ]
  },
  "de": {
    "methodsBadge": "Kündigungswege",
    "methodsTitle": "Drei offizielle Wege zur dauerhaften Löschung Ihres Kontos",
    "method1Badge": "Methode 1 • In der App",
    "method1Title": "Safi Academy Mobil-App",
    "method1Desc": "Wenn Sie die Safi Academy App auf iOS oder Android installiert haben, können Sie Ihr Konto direkt in Ihrem Profil löschen:",
    "method1Step1": "Öffnen Sie die Safi Academy App und tippen Sie auf Ihr Profil.",
    "method1Step2": "Navigieren Sie zu Einstellungen & Datenschutz → Sicherheit.",
    "method1Step3": "Tippen Sie auf «Konto löschen» und bestätigen Sie dies mit Ihrem Passwort.",
    "method1Btn": "App herunterladen",
    "method2Badge": "Methode 2 • Direktes Webformular",
    "method2Title": "Online-Löschungsantrag",
    "method2Desc": "Empfohlen, falls Sie die App deinstalliert haben oder keinen Gerätezugriff mehr besitzen. Füllen Sie das verifizierte Formular unten aus.",
    "method2Note": "Sofortige Referenznummer: Unmittelbar nach dem Absenden wird ein kryptografisches Ticket generiert.",
    "method2Btn": "Zum Antragsformular",
    "method3Badge": "Methode 3 • Rechtsabteilung",
    "method3Title": "Datenschutzbeauftragter (DPO)",
    "method3Desc": "Senden Sie einen formellen Löschantrag gemäß Art. 17 UK-DSGVO direkt an unseren Datenschutzbeauftragten:",
    "method3Subject": "Betreff: UK GDPR Artikel 17 — Antrag auf Kontolöschung",
    "method3Btn": "Rechtsabteilung kontaktieren",
    "transparencyBadge": "Transparenz & Datenverwaltung",
    "transparencyTitle": "Datenbereinigung vs. gesetzliche Aufbewahrungspflichten",
    "transparencyDesc": "Wir arbeiten mit vollständiger Transparenz darüber, welche Daten endgültig gelöscht und welche nach britischem Recht aufbewahrt werden müssen.",
    "legalOversightTitle": "Gesetzliche und gesellschaftsrechtliche Aufsicht",
    "legalOversightDesc": "Die Safi Academy ist eine eingetragene Institution unter Leitung der Safi International Capital LTD. Für gerichtliche Zustellungen wenden Sie sich an unser Londoner Sekretariat:",
    "emailLabelPrefix": "Offizielle E-Mail:",
    "officeLabelPrefix": "Eingetragener Sitz in London:",

    "isRtl": false,
    "badge": "DSGVO- & Datenschutz-Desk",
    "title": "Portal zur dauerhaften Kontolöschung",
    "desc": "Offizieller Antrag auf dauerhafte Kontolöschung, kryptografische Vernichtung von Anmeldedaten und Datenbereinigung gemäß britischer DSGVO und internationalen Standards.",
    "warningTitle": "Verbindlicher Hinweis zur unwiderruflichen Löschung",
    "warningDesc": "Die Löschung Ihres Kontos führt zur dauerhaften Entfernung Ihres Kursprofils, der Anwesenheitsnachweise, gebuchter Lehrgänge und des Aufgabenarchivs.",
    "gracePeriodNotice": "Die Safi Academy gewährt eine verbindliche 30-tägige Bedenkzeit. Innerhalb dieser Frist können Sie den Vorgang durch einfaches Einloggen oder Kontaktaufnahme abbrechen.",
    "step1Title": "1. Identitäts- & Aktenüberprüfung",
    "step1Desc": "Abgleich Ihrer hinterlegten E-Mail-Adresse und Ihres Namens mit unserer sicheren Supabase-Datenbank.",
    "step2Title": "2. 30-tägiger Ruhezustand",
    "step2Desc": "Ihr Konto wird für 30 Kalendertage gesperrt, um versehentlichen Datenverlust auszuschließen.",
    "step3Title": "3. Kryptografische Datenbereinigung",
    "step3Desc": "Sämtliche personenbezogenen Daten werden aus aktiven Datenbanken und Datensicherungen dauerhaft vernichtet.",
    "nameLabel": "Vollständiger registrierter Name",
    "emailLabel": "Mit dem Konto verknüpfte E-Mail-Adresse",
    "reasonLabel": "Hauptgrund für die Kontolöschung",
    "detailsLabel": "Zusätzliche Rückmeldungen oder Verbesserungsvorschläge",
    "confirm1": "Ich verstehe, dass alle meine Lernfortschritte, Dokumente und Abonnements dauerhaft gelöscht werden.",
    "confirm2": "Ich verstehe, dass dieser Vorgang nach Ablauf der 30-tägigen Bedenkzeit absolut unwiderruflich ist.",
    "submitBtn": "Offiziellen Antrag auf Kontolöschung einreichen",
    "processingBtn": "Sicheres Löschdossier wird übermittelt...",
    "successTitle": "Antrag auf Kontolöschung erfolgreich registriert",
    "successDesc": "Ihr Antrag wurde erfasst und die 30-tägige Bedenkzeit gestartet. Bitte notieren Sie Ihre Vorgangsnummer.",
    "referenceLabel": "Offizielle Vorgangsnummer",
    "copyBtn": "Nummer kopieren",
    "copiedBtn": "Kopiert!",
    "errEmail": "Bitte geben Sie eine gültige registrierte E-Mail-Adresse ein.",
    "errName": "Bitte geben Sie Ihren vollständigen registrierten Namen an.",
    "errConfirm": "Sie müssen vor dem Absenden beide Bestätigungsfelder ankreuzen.",
    "backHome": "Zurück zur Startseite",
    "certifiedBadge": "Zertifiziert nach UK DSGVO & App Store",
    "onlineRequestBadge": "Online-Antrag auf Datenlöschung",
    "whatNext": "Wie es weitergeht:",
    "submitAnother": "Weiteren Antrag stellen",
    "namePlaceholder": "z. B. Maximilian Weber",
    "optionalLabel": "Optional",
    "reasonGoal": "Ich habe meine Bildungsziele erfolgreich erreicht",
    "reasonPrivacy": "Bedenken hinsichtlich Datenschutz und Datensouveränität",
    "reasonDuplicate": "Ich besitze ein doppeltes oder zweites Konto",
    "reasonAppIssues": "Technische Probleme mit der mobilen Anwendung",
    "reasonOther": "Anderer Grund (bitte unten angeben)",
    "feedbackPlaceholder": "Teilen Sie uns mit, wie wir die Safi Academy weiter verbessern können...",
    "purgedDataTitle": "Dauerhaft zu löschende Daten",
    "purgedDataSubtitle": "Vollständige Bereinigung an Tag 30",
    "purgedItems": [
      {
        "lead": "Profildaten & Anmeldeinformationen:",
        "text": "Vollständiger Name, E-Mail-Adresse, Passwort-Hashes, Telefonnummern und Profilbild."
      },
      {
        "lead": "Sitzungs- und Zugriffstoken:",
        "text": "Google- und Apple-Anmeldetoken, aktive JWT-Sitzungen und Push-Benachrichtigungstoken."
      },
      {
        "lead": "Lernverlaufsdaten:",
        "text": "Video-Fortschrittsraten, Modulabschlussdaten, Prüfungsergebnisse und Programmierübungen."
      },
      {
        "lead": "Community-Kommunikation:",
        "text": "Forenbeiträge, persönliche Chatnachrichten mit Dozenten, Likes und Dateianhänge."
      },
      {
        "lead": "Punkte und Auszeichnungen:",
        "text": "Erfahrungspunkte (XP), Ranglistenplätze in der Ruhmeshalle und verliehene Auszeichnungen."
      }
    ],
    "retentionExceptionsTitle": "Gesetzliche Aufbewahrungsausnahmen",
    "retentionExceptionsSubtitle": "Nach britischem Recht vorgeschrieben",
    "retentionItems": [
      {
        "lead": "Steuer- und Buchhaltungsunterlagen (6 Jahre):",
        "text": "Die britische Steuerbehörde (HMRC) verlangt die Aufbewahrung von Rechnungen und Zahlungsbelegen für 6 Jahre."
      },
      {
        "lead": "Geldwäscheprävention (AML):",
        "text": "Aufzeichnungen über Finanztransaktionen werden zur Einhaltung der Finanzkriminalitätsgesetze verschlüsselt archiviert."
      },
      {
        "lead": "Anonymisierte Zertifikatshashes:",
        "text": "Prüfsummen von Diplomen bleiben im öffentlichen Register gespeichert, um Fälschungen zu verhindern, persönliche Daten werden jedoch entfernt."
      },
      {
        "lead": "Sicherheits-Audit-Logs (90 Tage):",
        "text": "Server- und Firewall-Protokolle werden 90 Tage gespeichert, um Cyberangriffe und Sicherheitsvorfälle abzuwehren."
      }
    ],
    "faqBadge": "Fragen & Antworten",
    "faqTitle": "Häufig gestellte Fragen zur Kontolöschung",
    "faqs": [
      {
        "q": "Was geschieht mit meinen Kursen und Abschlusszertifikaten?",
        "a": "Mit der Kontolöschung werden alle Kursberechtigungen und Zertifikate dauerhaft entfernt. Bitte laden Sie Ihre PDF-Zertifikate vor der Beantragung herunter."
      },
      {
        "q": "Kann ich die Kontolöschung während der Bedenkzeit abbrechen?",
        "a": "Ja. Sie haben 30 Kalendertage Zeit, um den Vorgang durch erneutes Anmelden im Portal oder per Nachricht an den Support mit Ihrer Vorgangsnummer abzubrechen."
      },
      {
        "q": "Was passiert mit Restguthaben in der Wallet?",
        "a": "Jegliches Restguthaben muss vor Einreichung des Löschantrags ausgezahlt oder verwendet werden, da verbleibende Punkte nach der Löschung verfallen."
      },
      {
        "q": "Warum müssen manche Finanzunterlagen aufbewahrt werden?",
        "a": "Unternehmen sind nach britischem Steuer- und Gesellschaftsrecht gesetzlich verpflichtet, Rechnungs- und Buchungsbelege 6 Jahre lang aufzubewahren."
      },
      {
        "q": "Wie erfüllt dieses Portal die Richtlinien von Google Play und App Store?",
        "a": "Beide App-Stores verlangen eine Löschfunktion sowohl innerhalb der App als auch auf einer öffentlich zugänglichen Website ohne App-Installation."
      },
      {
        "q": "Wie kann ich den Datenschutzbeauftragten (DPO) direkt kontaktieren?",
        "a": "Sie erreichen unser Rechtsteam und den Datenschutzbeauftragten unter contact@safiacademy.org oder per Post an unseren Hauptsitz in London."
      }
    ]
  },
  "fr": {
    "methodsBadge": "Canaux de résiliation",
    "methodsTitle": "Trois méthodes officielles pour supprimer définitivement votre compte",
    "method1Badge": "Méthode 1 • Dans l'application",
    "method1Title": "Application mobile Safi Academy",
    "method1Desc": "Si vous possédez l'application iOS ou Android Safi Academy, vous pouvez supprimer votre compte instantanément depuis votre profil :",
    "method1Step1": "Ouvrez l'application Safi Academy et accédez à votre Profil.",
    "method1Step2": "Allez dans Paramètres et confidentialité → Sécurité.",
    "method1Step3": "Appuyez sur « Supprimer le compte » et confirmez avec votre mot de passe.",
    "method1Btn": "Télécharger l'application",
    "method2Badge": "Méthode 2 • Formulaire Web direct",
    "method2Title": "Transmission d'une demande en ligne",
    "method2Desc": "Recommandé si vous avez désinstallé l'application mobile ou n'avez plus accès à votre appareil. Remplissez le formulaire ci-dessous.",
    "method2Note": "Génération immédiate d'un ticket : une référence cryptographique de suppression est délivrée dès la soumission.",
    "method2Btn": "Aller au formulaire de demande",
    "method3Badge": "Méthode 3 • Service juridique",
    "method3Title": "Délégué à la protection des données (DPO)",
    "method3Desc": "Envoyez une demande écrite d'effacement en vertu de l'article 17 du RGPD britannique directement à notre délégué :",
    "method3Subject": "Objet : UK GDPR Article 17 — Demande de suppression de compte",
    "method3Btn": "Écrire au service juridique",
    "transparencyBadge": "Transparence et gouvernance",
    "transparencyTitle": "Effacement des données vs conservation légale obligatoire",
    "transparencyDesc": "Nous agissons en toute transparence sur les données purgées définitivement et celles devant être archivées selon la législation britannique.",
    "legalOversightTitle": "Supervision légale et institutionnelle",
    "legalOversightDesc": "Safi Academy est une institution enregistrée administrée par Safi International Capital LTD. Pour toute notification judiciaire, contactez notre secrétariat à Londres :",
    "emailLabelPrefix": "E-mail officiel :",
    "officeLabelPrefix": "Siège social à Londres :",

    "isRtl": false,
    "badge": "Pôle de conformité RGPD & Confidentialité",
    "title": "Portail de suppression définitive du compte",
    "desc": "Formulaire officiel de demande de suppression définitive de compte, destruction des identifiants et effacement des données personnelles selon le RGPD britannique.",
    "warningTitle": "Avis obligatoire concernant la suppression irréversible",
    "warningDesc": "La suppression de votre compte efface définitivement votre dossier étudiant, l'historique d'assiduité, les cours souscrits et les archives de devoirs.",
    "gracePeriodNotice": "Safi Academy applique un délai de rétractation obligatoire de 30 jours. Durant ce délai, vous pouvez annuler la suppression en vous reconnectant ou en contactant le support.",
    "step1Title": "1. Vérification de l'identité et du dossier",
    "step1Desc": "Contrôle de conformité de votre e-mail et de votre nom enregistré avec notre registre sécurisé Supabase.",
    "step2Title": "2. État inactif pendant 30 jours",
    "step2Desc": "Votre compte est placé en état inactif pendant 30 jours calendaires afin d'éviter toute perte accidentelle.",
    "step3Title": "3. Purge cryptographique des données",
    "step3Desc": "Toutes les données personnelles identifiables sont définitivement effacées des bases de données actives et des sauvegardes.",
    "nameLabel": "Nom complet enregistré",
    "emailLabel": "Adresse e-mail associée au compte",
    "reasonLabel": "Motif principal de la demande de suppression",
    "detailsLabel": "Commentaires ou suggestions d'amélioration",
    "confirm1": "Je comprends que toute ma progression dans les cours, mes documents et mes abonnements seront définitivement effacés.",
    "confirm2": "Je comprends que cette action est totalement irréversible après l'expiration du délai de 30 jours.",
    "submitBtn": "Soumettre la demande officielle de suppression",
    "processingBtn": "Transmission sécurisée du dossier de purge...",
    "successTitle": "Demande de suppression enregistrée avec succès",
    "successDesc": "Votre demande a été prise en compte et le délai de rétractation de 30 jours a débuté. Veuillez conserver votre référence.",
    "referenceLabel": "Référence officielle du dossier",
    "copyBtn": "Copier la référence",
    "copiedBtn": "Copié !",
    "errEmail": "Veuillez renseigner une adresse e-mail enregistrée valide.",
    "errName": "Veuillez indiquer votre nom complet enregistré.",
    "errConfirm": "Vous devez cocher les deux cases de confirmation avant de soumettre.",
    "backHome": "Retour à l'accueil",
    "certifiedBadge": "Conforme UK GDPR & App Store",
    "onlineRequestBadge": "Demande officielle de droit à l'effacement en ligne",
    "whatNext": "Prochaines étapes :",
    "submitAnother": "Déposer une autre demande",
    "namePlaceholder": "ex. Julien Dupont",
    "optionalLabel": "Facultatif",
    "reasonGoal": "J'ai achevé avec succès mes objectifs de formation",
    "reasonPrivacy": "Considérations liées à la confidentialité et souveraineté des données",
    "reasonDuplicate": "Je possède un compte en doublon ou secondaire",
    "reasonAppIssues": "Difficultés techniques sur l'application mobile",
    "reasonOther": "Autre motif (veuillez préciser ci-dessous)",
    "feedbackPlaceholder": "Indiquez-nous comment nous pouvons améliorer Safi Academy...",
    "purgedDataTitle": "Données qui seront définitivement purgées",
    "purgedDataSubtitle": "Effacement complet au 30ème jour",
    "purgedItems": [
      {
        "lead": "Identifiants et profil :",
        "text": "Nom complet, e-mail, hachages de mots de passe, numéros de téléphone et photo de profil."
      },
      {
        "lead": "Jetons d'authentification :",
        "text": "Jetons de connexion Google et Apple, sessions JWT actives et jetons de notifications push."
      },
      {
        "lead": "Parcours pédagogique :",
        "text": "Pourcentages de visionnage des leçons, dates de validation, notes aux quiz et exercices de code."
      },
      {
        "lead": "Échanges communautaires :",
        "text": "Discussions sur les forums, messages privés avec les formateurs, mentions j'aime et pièces jointes."
      },
      {
        "lead": "Récompenses et classements :",
        "text": "Points d'expérience (XP), position au Tableau d'honneur et insignes de certification."
      }
    ],
    "retentionExceptionsTitle": "Exceptions légales de conservation",
    "retentionExceptionsSubtitle": "Exigées par la législation britannique",
    "retentionItems": [
      {
        "lead": "Documents comptables et fiscaux (6 ans) :",
        "text": "L'administration fiscale du Royaume-Uni (HMRC) exige la conservation des factures et écritures de TVA pendant 6 ans."
      },
      {
        "lead": "Lutte contre le blanchiment (AML) :",
        "text": "Les journaux financiers des passerelles de paiement sont archivés sous chiffrement conformément aux normes financières."
      },
      {
        "lead": "Empreintes cryptographiques anonymisées :",
        "text": "Les hachages des diplômes émis subsistent sur registre public pour certifier leur authenticité, sans aucune donnée personnelle."
      },
      {
        "lead": "Journaux de sécurité (90 jours) :",
        "text": "Les logs de pare-feu sont conservés 90 jours pour prévenir les cyberattaques et tentatives d'intrusion."
      }
    ],
    "faqBadge": "Questions & Explications",
    "faqTitle": "Foire aux questions sur la suppression du compte",
    "faqs": [
      {
        "q": "Qu'advient-il de mes cours et de mes certificats ?",
        "a": "Lors de la suppression définitive, l'accès aux cours et les certificats sont définitivement détruits. Veuillez télécharger vos certificats au format PDF AVANT de valider la demande."
      },
      {
        "q": "Puis-je annuler ma demande durant le délai de 30 jours ?",
        "a": "Oui. Vous disposez de 30 jours calendaires pour réactiver votre compte en vous reconnectant simplement ou en contactant le support avec votre numéro de dossier."
      },
      {
        "q": "Que devient le solde disponible sur mon portefeuille ?",
        "a": "Tout crédit restant doit être retiré ou utilisé avant la demande de suppression, les soldes non consommés étant définitivement annulés."
      },
      {
        "q": "Pourquoi certains documents financiers sont-ils conservés ?",
        "a": "En vertu du droit des sociétés et de la fiscalité britannique, nous sommes légalement tenus de conserver les pièces justificatives pendant 6 ans."
      },
      {
        "q": "Comment ce portail respecte-t-il les exigences de Google Play et d'Apple ?",
        "a": "Ces plateformes imposent la mise à disposition d'une option de suppression dans l'application et d'une page web accessible sans nécessiter l'installation de l'application."
      },
      {
        "q": "Comment contacter le Délégué à la Protection des Données (DPO) ?",
        "a": "Vous pouvez contacter notre service juridique à contact@safiacademy.org ou par courrier postal à notre siège à Londres."
      }
    ]
  },
  "es": {
    "methodsBadge": "Canales de cancelación",
    "methodsTitle": "Tres formas oficiales de eliminar permanentemente su cuenta",
    "method1Badge": "Método 1 • En la aplicación",
    "method1Title": "Aplicación móvil Safi Academy",
    "method1Desc": "Si tiene instalada la aplicación de Safi Academy en iOS o Android, puede eliminar su cuenta al instante desde su perfil:",
    "method1Step1": "Abra la aplicación Safi Academy y pulse en su Perfil.",
    "method1Step2": "Vaya a Ajustes y privacidad → Seguridad.",
    "method1Step3": "Pulse «Eliminar cuenta» y confirme introduciendo su contraseña.",
    "method1Btn": "Descargar aplicación",
    "method2Badge": "Método 2 • Formulario web directo",
    "method2Title": "Envío de solicitud en línea",
    "method2Desc": "Recomendado si ha desinstalado la aplicación móvil o no dispone del dispositivo. Rellene el formulario oficial que figura a continuación.",
    "method2Note": "Generación inmediata de ticket: se emitirá un identificador criptográfico de seguimiento al enviar la solicitud.",
    "method2Btn": "Ir al formulario de solicitud",
    "method3Badge": "Método 3 • Asesoría jurídica",
    "method3Title": "Delegado de Protección de Datos (DPO)",
    "method3Desc": "Envíe una solicitud formal por escrito conforme al artículo 17 del RGPD del Reino Unido a nuestro responsable de privacidad:",
    "method3Subject": "Asunto: UK GDPR Artículo 17 — Solicitud de supresión de cuenta",
    "method3Btn": "Escribir a la asesoría jurídica",
    "transparencyBadge": "Transparencia y gobernanza",
    "transparencyTitle": "Supresión de datos frente a conservación legal obligatoria",
    "transparencyDesc": "Operamos con total transparencia acerca de los datos que se purgan definitivamente y los que deben conservarse conforme a la ley británica.",
    "legalOversightTitle": "Supervisión legal y corporativa",
    "legalOversightDesc": "Safi Academy es una institución registrada gestionada por Safi International Capital LTD. Para notificaciones judiciales, contacte con nuestra secretaría en Londres:",
    "emailLabelPrefix": "Correo electrónico:",
    "officeLabelPrefix": "Sede registrada en Londres:",

    "isRtl": false,
    "badge": "Mesa de Cumplimiento de Privacidad y RGPD",
    "title": "Portal de Eliminación Permanente de Cuenta",
    "desc": "Solicitud oficial de eliminación definitiva de cuenta, destrucción de credenciales criptográficas y purga de datos conforme al RGPD británico y estándares globales.",
    "warningTitle": "Aviso obligatorio sobre la eliminación irreversible",
    "warningDesc": "La eliminación de su cuenta borrará de forma permanente su expediente de estudiante, asistencias en vivo, cursos adquiridos y archivos de tareas.",
    "gracePeriodNotice": "Safi Academy aplica un período de reflexión obligatorio de 30 días. Durante estos 30 días puede cancelar la eliminación simplemente iniciando sesión o contactando al soporte.",
    "step1Title": "1. Verificación de identidad y expediente",
    "step1Desc": "Validación de su correo electrónico y nombre registrado en nuestra base de datos segura de Supabase.",
    "step2Title": "2. Estado inactivo durante 30 días",
    "step2Desc": "Su cuenta queda bloqueada durante 30 días naturales para prevenir cualquier pérdida involuntaria de datos.",
    "step3Title": "3. Purga criptográfica de datos",
    "step3Desc": "Todos los datos de carácter personal se eliminan de forma definitiva e irrecuperable de las bases de datos activas y copias de respaldo.",
    "nameLabel": "Nombre completo registrado",
    "emailLabel": "Correo electrónico asociado a la cuenta",
    "reasonLabel": "Motivo principal de la eliminación de la cuenta",
    "detailsLabel": "Comentarios adicionales o propuestas de mejora",
    "confirm1": "Entiendo que todo el progreso de mis cursos, archivos y suscripciones se eliminarán de forma definitiva.",
    "confirm2": "Entiendo que esta acción no se puede deshacer una vez finalizado el período de reflexión de 30 días.",
    "submitBtn": "Enviar solicitud formal de eliminación de cuenta",
    "processingBtn": "Transmitiendo expediente seguro de eliminación...",
    "successTitle": "Solicitud de eliminación registrada con éxito",
    "successDesc": "Su solicitud ha sido asentada y ha comenzado el período de reflexión de 30 días. Por favor, conserve su código de referencia.",
    "referenceLabel": "Código de referencia oficial",
    "copyBtn": "Copiar código",
    "copiedBtn": "¡Copiado!",
    "errEmail": "Por favor, introduzca una dirección de correo electrónico registrada válida.",
    "errName": "Por favor, proporcione su nombre completo registrado.",
    "errConfirm": "Debe marcar ambas casillas de confirmación antes de enviar la solicitud.",
    "backHome": "Volver a la página principal",
    "certifiedBadge": "Certificado conforme a UK GDPR y App Store",
    "onlineRequestBadge": "Solicitud oficial de supresión de datos en línea",
    "whatNext": "Cuáles son los siguientes pasos:",
    "submitAnother": "Enviar otra solicitud",
    "namePlaceholder": "ej. Carlos Mendoza",
    "optionalLabel": "Opcional",
    "reasonGoal": "He cumplido con éxito mis metas académicas",
    "reasonPrivacy": "Consideraciones sobre privacidad y soberanía de datos",
    "reasonDuplicate": "Tengo una cuenta duplicada o secundaria",
    "reasonAppIssues": "Dificultades técnicas con la aplicación móvil",
    "reasonOther": "Otro motivo (por favor especifique abajo)",
    "feedbackPlaceholder": "Comparta sus sugerencias para que podamos seguir mejorando Safi Academy...",
    "purgedDataTitle": "Datos que se eliminarán permanentemente",
    "purgedDataSubtitle": "Eliminación total en el día 30",
    "purgedItems": [
      {
        "lead": "Credenciales del perfil:",
        "text": "Nombre completo, correo electrónico, hashes de contraseñas, teléfonos y foto de perfil."
      },
      {
        "lead": "Tokens de sesión y acceso:",
        "text": "Tokens de inicio de sesión con Google y Apple, sesiones JWT activas y tokens de notificaciones push."
      },
      {
        "lead": "Expediente de aprendizaje:",
        "text": "Porcentajes de visualización de vídeos, fechas de módulos completados, notas de exámenes y código fuente entregado."
      },
      {
        "lead": "Interacciones comunitarias:",
        "text": "Mensajes en foros de debate, comunicaciones privadas con tutores, valoraciones y archivos adjuntos."
      },
      {
        "lead": "Reconocimientos y puntos:",
        "text": "Puntos de experiencia (XP), posiciones en el Cuadro de Honor y medallas obtenidas."
      }
    ],
    "retentionExceptionsTitle": "Excepciones legales de conservación",
    "retentionExceptionsSubtitle": "Obligatorias según la legislación británica",
    "retentionItems": [
      {
        "lead": "Registros fiscales y contables (6 años):",
        "text": "La autoridad tributaria del Reino Unido (HMRC) exige la conservación de facturas y justificantes de pago durante 6 años."
      },
      {
        "lead": "Prevención del blanqueo de capitales (AML):",
        "text": "Los registros financieros se conservan bajo cifrado seguro en cumplimiento con las normativas financieras."
      },
      {
        "lead": "Hashes criptográficos anonimizados:",
        "text": "Los hashes matemáticos de diplomas emitidos se mantienen en el registro público para evitar falsificaciones, sin ningún dato personal."
      },
      {
        "lead": "Registros de seguridad (90 días):",
        "text": "Los registros del firewall se conservan 90 días para repeler ciberataques e intrusiones."
      }
    ],
    "faqBadge": "Respuestas y Aclaraciones",
    "faqTitle": "Preguntas frecuentes sobre la eliminación de cuenta",
    "faqs": [
      {
        "q": "¿Qué ocurrirá con mis cursos y mis diplomas?",
        "a": "Con la eliminación de la cuenta, todos los accesos a cursos y certificados se destruirán permanentemente. Descargue sus diplomas en PDF ANTES de solicitar la eliminación."
      },
      {
        "q": "¿Puedo cancelar la solicitud durante los 30 días de gracia?",
        "a": "Sí. Dispone de 30 días naturales para cancelar la solicitud simplemente iniciando sesión de nuevo o contactando al soporte con su código de referencia."
      },
      {
        "q": "¿Qué sucede con el saldo restante en la billetera de la academia?",
        "a": "Debe retirar o consumir cualquier saldo disponible antes de solicitar la eliminación, ya que los fondos no gastados caducan al eliminarse la cuenta."
      },
      {
        "q": "¿Por qué deben conservarse determinados registros financieros?",
        "a": "La legislación mercantil y tributaria del Reino Unido impone la conservación de facturas y comprobantes contables durante 6 años para auditorías obligatorias."
      },
      {
        "q": "¿Cómo cumple este portal con las normas de Google Play y App Store?",
        "a": "Ambas tiendas exigen ofrecer una función de eliminación dentro de la app y un enlace web público que permita tramitarla sin tener la app instalada."
      },
      {
        "q": "¿Cómo puedo contactar al Delegado de Protección de Datos (DPO)?",
        "a": "Puede escribir directamente a nuestro departamento legal en contact@safiacademy.org o por vía postal a nuestra sede en Londres."
      }
    ]
  },
  "it": {
    "methodsBadge": "Canali di chiusura",
    "methodsTitle": "Tre modalità ufficiali per eliminare definitivamente il tuo account",
    "method1Badge": "Metodo 1 • Nell'app",
    "method1Title": "Applicazione mobile Safi Academy",
    "method1Desc": "Se hai installato l'app Safi Academy su iOS o Android, puoi eliminare il tuo account all'istante dal tuo profilo:",
    "method1Step1": "Apri l'app Safi Academy e tocca la sezione Profilo.",
    "method1Step2": "Vai su Impostazioni e privacy → Sicurezza.",
    "method1Step3": "Tocca «Elimina account» e conferma con la tua password.",
    "method1Btn": "Scarica l'applicazione",
    "method2Badge": "Metodo 2 • Modulo web diretto",
    "method2Title": "Invio richiesta online",
    "method2Desc": "Consigliato se hai disinstallato l'app mobile o non hai accesso al dispositivo. Compila il modulo verificato sottostante.",
    "method2Note": "Emissione immediata del ticket: un codice di tracciamento crittografato viene generato all'invio della richiesta.",
    "method2Btn": "Vai al modulo di richiesta",
    "method3Badge": "Metodo 3 • Ufficio legale",
    "method3Title": "Responsabile della protezione dei dati (DPO)",
    "method3Desc": "Invia una richiesta formale di cancellazione ai sensi dell'Articolo 17 del GDPR del Regno Unito al nostro responsabile:",
    "method3Subject": "Oggetto: UK GDPR Articolo 17 — Richiesta di cancellazione account",
    "method3Btn": "Invia un'email all'ufficio legale",
    "transparencyBadge": "Trasparenza e conformità",
    "transparencyTitle": "Cancellazione dei dati vs conservazione obbligatoria per legge",
    "transparencyDesc": "Operiamo con la massima trasparenza in merito ai dati eliminati in modo definitivo e a quelli conservati ai sensi della legge britannica.",
    "legalOversightTitle": "Supervisione legale e societaria",
    "legalOversightDesc": "Safi Academy è un istituto registrato gestito da Safi International Capital LTD. Per notifiche legali, contattare la nostra segreteria di Londra:",
    "emailLabelPrefix": "Email ufficiale:",
    "officeLabelPrefix": "Sede legale a Londra:",

    "isRtl": false,
    "badge": "Desk di conformità GDPR e Privacy",
    "title": "Portale di cancellazione permanente dell'account",
    "desc": "Istanza formale di cancellazione dell'account, distruzione crittografica delle credenziali e rimozione dei dati personali in conformità al GDPR britannico.",
    "warningTitle": "Avviso obbligatorio sulla cancellazione irreversibile",
    "warningDesc": "L'eliminazione dell'account cancella definitivamente il tuo fascicolo accademico, il registro presenze delle lezioni, i corsi acquistati e l'archivio dei compiti.",
    "gracePeriodNotice": "La Safi Academy prevede un periodo obbligatorio di riflessione di 30 giorni. Durante questo periodo puoi annullare la cancellazione semplicemente effettuando l'accesso o contattando il supporto.",
    "step1Title": "1. Verifica dell'identità e del profilo",
    "step1Desc": "Controllo di conformità dell'indirizzo email registrato e del nominativo nel nostro database sicuro Supabase.",
    "step2Title": "2. Stato di sospensione di 30 giorni",
    "step2Desc": "L'account viene bloccato per 30 giorni consecutivi per impedire cancellazioni involontarie di dati.",
    "step3Title": "3. Distruzione crittografica dei dati",
    "step3Desc": "Tutti i dati personali vengono eliminati in modo irreversibile dai database attivi e dai backup.",
    "nameLabel": "Nome completo registrato",
    "emailLabel": "Indirizzo email associato all'account",
    "reasonLabel": "Motivo principale della cancellazione",
    "detailsLabel": "Note aggiuntive o suggerimenti di miglioramento",
    "confirm1": "Comprendo che tutti i miei progressi didattici, documenti e abbonamenti attivi saranno cancellati per sempre.",
    "confirm2": "Comprendo che questa operazione non potrà più essere annullata dopo la scadenza del termine di 30 giorni.",
    "submitBtn": "Invia richiesta formale di cancellazione account",
    "processingBtn": "Invio della pratica protetta in corso...",
    "successTitle": "Richiesta di cancellazione registrata con successo",
    "successDesc": "La tua richiesta è stata registrata ed è iniziato il periodo di attesa di 30 giorni. Conserva il tuo codice di riferimento.",
    "referenceLabel": "Codice identificativo della pratica",
    "copyBtn": "Copia codice",
    "copiedBtn": "Copiato!",
    "errEmail": "Inserisci un indirizzo email valido e registrato.",
    "errName": "Inserisci il tuo nome completo registrato.",
    "errConfirm": "È necessario selezionare entrambe le caselle di conferma prima di procedere.",
    "backHome": "Torna alla Home",
    "certifiedBadge": "Certificato UK GDPR & App Store",
    "onlineRequestBadge": "Richiesta telematica di cancellazione dati",
    "whatNext": "I prossimi passi:",
    "submitAnother": "Invia un'altra richiesta",
    "namePlaceholder": "es. Marco Rossi",
    "optionalLabel": "Facoltativo",
    "reasonGoal": "Ho raggiunto con successo i miei obiettivi di studio",
    "reasonPrivacy": "Esigenze legate alla riservatezza e alla sovranità dei dati",
    "reasonDuplicate": "Possiedo un account duplicato o secondario",
    "reasonAppIssues": "Problemi tecnici riscontrati con l'app mobile",
    "reasonOther": "Altro motivo (specificare di seguito)",
    "feedbackPlaceholder": "Lascia un commento su come possiamo migliorare la Safi Academy...",
    "purgedDataTitle": "Dati che saranno cancellati definitivamente",
    "purgedDataSubtitle": "Cancellazione totale al 30° giorno",
    "purgedItems": [
      {
        "lead": "Dati identificativi del profilo:",
        "text": "Nome e cognome, indirizzo email, hash di password crittografati, numeri di telefono e foto profilo."
      },
      {
        "lead": "Token di sessione e autenticazione:",
        "text": "Token di accesso Google e Apple, sessioni JWT attive e token delle notifiche push."
      },
      {
        "lead": "Tracciamento didattico:",
        "text": "Percentuali di visualizzazione delle lezioni, date di completamento dei moduli, voti dei test e compiti di programmazione."
      },
      {
        "lead": "Contributi nella community:",
        "text": "Post nei forum, messaggi privati con i docenti, like, commenti e documenti inviati."
      },
      {
        "lead": "Punteggi e riconoscimenti:",
        "text": "Punti esperienza (XP), posizioni nella classifica d'onore e medaglie conseguite."
      }
    ],
    "retentionExceptionsTitle": "Eccezioni di conservazione obbligatorie per legge",
    "retentionExceptionsSubtitle": "Imposte dalla legislazione del Regno Unito",
    "retentionItems": [
      {
        "lead": "Registri contabili e fatture (6 anni):",
        "text": "L'autorità fiscale britannica (HMRC) richiede la conservazione di fatture e ricevute di pagamento per 6 anni."
      },
      {
        "lead": "Conformità antiriciclaggio (AML):",
        "text": "I log delle transazioni finanziarie sono archiviati in server protetti secondo le norme sui reati finanziari."
      },
      {
        "lead": "Hash crittografici dei certificati:",
        "text": "Le impronte matematiche dei diplomi rimangono sul registro pubblico per prevenire falsificazioni, ma ogni dato personale viene rimosso."
      },
      {
        "lead": "Log di sicurezza dei server (90 giorni):",
        "text": "I registri del firewall vengono conservati per 90 giorni per prevenire attacchi informatici e tentativi di violazione."
      }
    ],
    "faqBadge": "Domande e Chiarimenti",
    "faqTitle": "Domande frequenti sulla cancellazione dell'account",
    "faqs": [
      {
        "q": "Cosa accadrà ai corsi che ho acquistato e ai miei certificati?",
        "a": "Con la cancellazione definitiva, l'accesso a tutti i corsi e i certificati verrà revocato per sempre. Scarica i tuoi certificati in formato PDF PRIMA di inviare la richiesta."
      },
      {
        "q": "Posso revocare la richiesta durante il periodo di 30 giorni?",
        "a": "Sì. Hai a disposizione 30 giorni solari per ripristinare il tuo account, semplicemente effettuando un nuovo login o contattando l'assistenza con il tuo codice pratica."
      },
      {
        "q": "Cosa succede ai fondi residui nel portafoglio dell'accademia?",
        "a": "Qualsiasi credito residuo deve essere prelevato o speso prima della cancellazione, poiché i fondi non utilizzati decadranno definitivamente."
      },
      {
        "q": "Perché alcuni documenti fiscali devono essere mantenuti?",
        "a": "La legge britannica impone alle aziende di conservare i documenti contabili e le fatture per un periodo di 6 anni a fini fiscali."
      },
      {
        "q": "In che modo questo portale soddisfa le policy di Google Play e App Store?",
        "a": "Entrambi gli store impongono che la funzione di cancellazione sia presente sia nell'app sia su una pagina web pubblica accessibile senza dover installare l'app."
      },
      {
        "q": "Come posso contattare direttamente il Responsabile della Protezione dei Dati (DPO)?",
        "a": "Puoi scrivere al nostro dipartimento legale all'indirizzo contact@safiacademy.org oppure tramite posta ordinaria alla nostra sede di Londra."
      }
    ]
  },
  "pt": {
    "methodsBadge": "Canais de encerramento",
    "methodsTitle": "Três formas oficiais de excluir permanentemente sua conta",
    "method1Badge": "Método 1 • No aplicativo",
    "method1Title": "Aplicativo móvel Safi Academy",
    "method1Desc": "Se você possui o aplicativo da Safi Academy instalado no iOS ou Android, pode excluir sua conta instantaneamente pelo perfil:",
    "method1Step1": "Abra o aplicativo Safi Academy e toque em seu Perfil.",
    "method1Step2": "Acesse Configurações e Privacidade → Segurança.",
    "method1Step3": "Toque em «Excluir conta» e confirme com sua senha.",
    "method1Btn": "Baixar aplicativo",
    "method2Badge": "Método 2 • Formulário web direto",
    "method2Title": "Envio de solicitação online",
    "method2Desc": "Recomendado caso tenha desinstalado o aplicativo ou não tenha acesso ao dispositivo. Preencha o formulário verificado abaixo.",
    "method2Note": "Geração imediata de protocolo: um código criptográfico de rastreamento é gerado imediatamente após o envio.",
    "method2Btn": "Ir para o formulário",
    "method3Badge": "Método 3 • Departamento jurídico",
    "method3Title": "Encarregado de Proteção de Dados (DPO)",
    "method3Desc": "Envie uma solicitação formal por escrito sob o Artigo 17 do GDPR do Reino Unido diretamente ao nosso responsável:",
    "method3Subject": "Assunto: UK GDPR Artigo 17 — Solicitação de exclusão de conta",
    "method3Btn": "Enviar e-mail ao departamento jurídico",
    "transparencyBadge": "Transparência e conformidade",
    "transparencyTitle": "Exclusão de dados versus retenção legal obrigatória",
    "transparencyDesc": "Atuamos com total transparência em relação aos dados purgados definitivamente e aos que devem ser mantidos pela legislação britânica.",
    "legalOversightTitle": "Supervisão jurídica e corporativa",
    "legalOversightDesc": "A Safi Academy é uma instituição registrada administrada pela Safi International Capital LTD. Para notificações judiciais, contate nossa secretaria em Londres:",
    "emailLabelPrefix": "E-mail oficial:",
    "officeLabelPrefix": "Sede registrada em Londres:",

    "isRtl": false,
    "badge": "Central de Conformidade GDPR & Privacidade",
    "title": "Portal de Exclusão Definitiva de Conta",
    "desc": "Solicitação formal de cancelamento irreversível de conta, descarte seguro de credenciais criptográficas e expurgo de dados conforme o GDPR britânico.",
    "warningTitle": "Aviso obrigatório sobre a exclusão definitiva",
    "warningDesc": "A exclusão de sua conta apagará permanentemente seu prontuário estudantil, frequência nas aulas ao vivo, cursos matriculados e histórico de tarefas.",
    "gracePeriodNotice": "A Safi Academy assegura um prazo de reflexão obrigatório de 30 dias. Durante esse período, você pode cancelar a solicitação simplesmente fazendo login ou contatando o suporte.",
    "step1Title": "1. Verificação de identidade e cadastro",
    "step1Desc": "Validação cruzada do seu e-mail e nome registrado junto à nossa base de segurança Supabase.",
    "step2Title": "2. Período de inatividade de 30 dias",
    "step2Desc": "Sua conta permanece em estado bloqueado durante 30 dias para evitar a perda acidental de dados.",
    "step3Title": "3. Expurgo criptográfico de dados",
    "step3Desc": "Todos os dados pessoais identificáveis são eliminados em definitivo das bases operacionais e dos backups.",
    "nameLabel": "Nome completo registrado",
    "emailLabel": "Endereço de e-mail associado à conta",
    "reasonLabel": "Motivo principal para o encerramento da conta",
    "detailsLabel": "Observações complementares ou sugestões",
    "confirm1": "Compreendo que todo o histórico dos meus cursos, arquivos e assinaturas ativas serão excluídos definitivamente.",
    "confirm2": "Compreendo que esta ação não poderá ser revertida após o término do período de 30 dias.",
    "submitBtn": "Enviar solicitação formal de exclusão de conta",
    "processingBtn": "Transmitindo dossiê seguro de expurgo...",
    "successTitle": "Solicitação de exclusão registrada com êxito",
    "successDesc": "Seu pedido foi registrado e o período de reflexão de 30 dias já começou. Guarde o código de protocolo.",
    "referenceLabel": "Código oficial de protocolo",
    "copyBtn": "Copiar código",
    "copiedBtn": "Copiado!",
    "errEmail": "Por favor, informe um endereço de e-mail registrado e válido.",
    "errName": "Por favor, informe seu nome completo registrado.",
    "errConfirm": "Você deve assinalar ambas as caixas de confirmação antes de enviar.",
    "backHome": "Voltar à página inicial",
    "certifiedBadge": "Certificado UK GDPR & App Store",
    "onlineRequestBadge": "Pedido eletrônico de exclusão definitiva de dados",
    "whatNext": "Próximos passos:",
    "submitAnother": "Enviar outro pedido",
    "namePlaceholder": "ex.: Lucas Silva",
    "optionalLabel": "Opcional",
    "reasonGoal": "Concluí com êxito minhas metas de estudo",
    "reasonPrivacy": "Preocupações com a privacidade e soberania de dados",
    "reasonDuplicate": "Possuo uma conta duplicada ou secundária",
    "reasonAppIssues": "Dificuldades técnicas com o aplicativo móvel",
    "reasonOther": "Outro motivo (especifique abaixo)",
    "feedbackPlaceholder": "Conte-nos como podemos aprimorar os serviços da Safi Academy...",
    "purgedDataTitle": "Dados que serão destruídos definitivamente",
    "purgedDataSubtitle": "Exclusão total no 30º dia",
    "purgedItems": [
      {
        "lead": "Credenciais e dados do perfil:",
        "text": "Nome completo, e-mail, hashes criptografados de senhas, telefones e foto de perfil."
      },
      {
        "lead": "Tokens de acesso e autenticação:",
        "text": "Tokens de login via Google e Apple, sessões JWT ativas e identificadores de notificações."
      },
      {
        "lead": "Histórico acadêmico:",
        "text": "Percentual de aulas assistidas, datas de conclusão de módulos, notas de testes e códigos submetidos."
      },
      {
        "lead": "Interações na comunidade:",
        "text": "Tópicos criados nos fóruns, mensagens trocadas com professores, curtidas e anexos enviados."
      },
      {
        "lead": "Pontuação e honrarias:",
        "text": "Pontos de experiência (XP), posições no Mural da Fama e distintivos conquistados."
      }
    ],
    "retentionExceptionsTitle": "Exceções legais de guarda de documentos",
    "retentionExceptionsSubtitle": "Exigidas pelas leis do Reino Unido",
    "retentionItems": [
      {
        "lead": "Documentos fiscais e faturas (6 anos):",
        "text": "A Receita do Reino Unido (HMRC) exige a preservação de comprovantes de pagamento e faturas de IVA por 6 anos."
      },
      {
        "lead": "Prevenção à lavagem de dinheiro (AML):",
        "text": "Os registros financeiros de pagamentos são arquivados sob criptografia em consonância com as normas financeiras."
      },
      {
        "lead": "Hashes criptográficos anonimizados:",
        "text": "As assinaturas matemáticas dos diplomas permanecem registradas para atestar autenticidade, mas sem dados pessoais."
      },
      {
        "lead": "Logs de segurança do sistema (90 dias):",
        "text": "Os registros do firewall são mantidos por 90 dias com o propósito de deter ataques de negação de serviço e invasões."
      }
    ],
    "faqBadge": "Esclarecimentos & Orientações",
    "faqTitle": "Perguntas frequentes sobre o encerramento da conta",
    "faqs": [
      {
        "q": "O que acontecerá com meus cursos e certificados?",
        "a": "Ao concluir a exclusão definitiva, todos os acessos aos cursos e certificados serão revogados. Faça o download de seus certificados em PDF ANTES de solicitar a exclusão."
      },
      {
        "q": "É possível cancelar o pedido de exclusão dentro dos 30 dias?",
        "a": "Sim. Você dispõe de 30 dias corridos para suspender o cancelamento, bastando fazer login novamente ou contatar o suporte com seu protocolo."
      },
      {
        "q": "O que acontece com os créditos restantes na carteira da academia?",
        "a": "Qualquer saldo deve ser resgatado ou utilizado antes do pedido de encerramento, pois créditos pendentes são cancelados após a exclusão."
      },
      {
        "q": "Por que certos registros contábeis precisam ser mantidos?",
        "a": "A legislação corporativa e fiscal do Reino Unido exige a guarda obrigatória de notas fiscais e registros de pagamento por 6 anos."
      },
      {
        "q": "Como esta página atende às normas da Google Play e da App Store?",
        "a": "Ambas as lojas exigem que o usuário possa pedir a exclusão tanto no aplicativo quanto através de uma página web acessível publicamente."
      },
      {
        "q": "Como falar diretamente com o Encarregado de Proteção de Dados (DPO)?",
        "a": "Você pode entrar em contato com nossa equipe jurídica pelo e-mail contact@safiacademy.org ou por correspondência para a nossa sede em Londres."
      }
    ]
  },
  "ja": {
    "methodsBadge": "解約・削除手続き",
    "methodsTitle": "アカウントを完全に削除する3つの公式手順",
    "method1Badge": "方法 1 • アプリ内操作",
    "method1Title": "Safi Academy モバイルアプリ",
    "method1Desc": "iOS または Android 端末に Safi Academy アプリがインストールされている場合、プロフィールから直接即座に削除できます：",
    "method1Step1": "Safi Academy アプリを開き、プロフィールをタップします。",
    "method1Step2": "「設定とプライバシー」→「セキュリティ」を選択します。",
    "method1Step3": "「アカウントを削除」をタップし、パスワードを入力して確認します。",
    "method1Btn": "アプリをダウンロード",
    "method2Badge": "方法 2 • 公式ウェブフォーム",
    "method2Title": "オンライン削除申請フォーム",
    "method2Desc": "アプリをアンインストールした場合や端末にアクセスできない場合におすすめです。以下の確認フォームにご記入ください。",
    "method2Note": "照会番号の即時発行：送信完了後、暗号化された追跡チケット番号が直ちに発行されます。",
    "method2Btn": "申請フォームへ移動",
    "method3Badge": "方法 3 • 法務・コンプライアンス",
    "method3Title": "データ保護責任者（DPO）",
    "method3Desc": "英国 GDPR 第17条に基づく書面による正式なデータ消去要求を、データ保護責任者へ直接電子メールで送信してください：",
    "method3Subject": "件名：UK GDPR 第17条に基づくアカウント削除要求",
    "method3Btn": "法務窓口へメール送信",
    "transparencyBadge": "透明性とデータガバナンス",
    "transparencyTitle": "完全データ消去と法令遵守に基づく保管例外",
    "transparencyDesc": "完全に削除されるデータと、英国の税法・商法等に基づき一定期間保管が義務付けられているデータについて完全な透明性を維持しています。",
    "legalOversightTitle": "法的監督および法人登記情報",
    "legalOversightDesc": "Safi Academy は Safi International Capital LTD が運営する英国法人登録機関です。法的通知や公的照会はロンドン事務局へご連絡ください：",
    "emailLabelPrefix": "公式メールアドレス：",
    "officeLabelPrefix": "ロンドン登記所在地：",

    "isRtl": false,
    "badge": "GDPRおよびプライバシーコンプライアンスデスク",
    "title": "アカウント恒久削除ポータル",
    "desc": "英国GDPRおよび国際的なデータ保護基準に準拠した、アカウントの完全削除、認証情報の破棄、および個人データ消去の正式申請窓口です。",
    "warningTitle": "取り消し不可能な削除に関する必須の注意事項",
    "warningDesc": "アカウントを削除すると、受講記録、ライブ講義の出席ログ、受講中コース、および提出済み課題のデータが恒久的に破棄されます。",
    "gracePeriodNotice": "サフィ・アカデミーでは30日間のクーリングオフ（猶予）期間を設けています。30日以内であれば、再ログインまたはサポートへの連絡により削除を取り消すことができます。",
    "step1Title": "1. 本人確認および学籍照合",
    "step1Desc": "Supabaseの暗号化セキュリティ台帳により、登録メールアドレスと氏名を照合します。",
    "step2Title": "2. 30日間の休止保護期間",
    "step2Desc": "誤操作によるデータ消失を防ぐため、アカウントは30日間ロック状態に置かれます。",
    "step3Title": "3. データの暗号的消去",
    "step3Desc": "すべての個人特定可能データが稼働中のデータベースおよびバックアップから恒久的に抹消されます。",
    "nameLabel": "登録氏名（フルネーム）",
    "emailLabel": "アカウントに登録されたメールアドレス",
    "reasonLabel": "アカウント削除を希望される主な理由",
    "detailsLabel": "改善のためのご意見・ご要望（任意）",
    "confirm1": "すべての学習進捗、受講資料、および有効なサブスクリプションが完全に削除されることを理解しました。",
    "confirm2": "30日間の猶予期間が終了した後は、いかなる場合もこの操作を取り消せないことを承諾します。",
    "submitBtn": "アカウント恒久削除の正式申請を送信",
    "processingBtn": "安全な削除リクエストを処理中...",
    "successTitle": "アカウント削除申請を受け付けました",
    "successDesc": "申請が正式に受理され、30日間の猶予期間に入りました。照会用チケット番号をお控えください。",
    "referenceLabel": "申請照会チケット番号",
    "copyBtn": "番号をコピー",
    "copiedBtn": "コピー完了！",
    "errEmail": "有効な登録メールアドレスを入力してください。",
    "errName": "登録されている正式な氏名を入力してください。",
    "errConfirm": "送信前に両方の同意チェックボックスにチェックを入れてください。",
    "backHome": "トップページへ戻る",
    "certifiedBadge": "英国GDPRおよびApp Store審査基準準拠",
    "onlineRequestBadge": "オンライン個人データ消去公式申請",
    "whatNext": "今後の流れについて：",
    "submitAnother": "別の申請を送信する",
    "namePlaceholder": "例: 山田 太郎",
    "optionalLabel": "任意",
    "reasonGoal": "受講目標を無事に達成したため",
    "reasonPrivacy": "プライバシーおよびデータ保護の観点から",
    "reasonDuplicate": "重複アカウントまたはサブアカウントを整理するため",
    "reasonAppIssues": "モバイルアプリの動作に関する技術的トラブル",
    "reasonOther": "その他の理由（下記にご記入ください）",
    "feedbackPlaceholder": "サフィ・アカデミーの改善に向けたご意見をお聞かせください...",
    "purgedDataTitle": "恒久的に抹消されるデータ項目",
    "purgedDataSubtitle": "申請から30日目に完全消去",
    "purgedItems": [
      {
        "lead": "プロフィール情報:",
        "text": "氏名、メールアドレス、暗号化パスワードハッシュ、電話番号、アイコン画像、自己紹介。"
      },
      {
        "lead": "セッショントークン:",
        "text": "GoogleおよびAppleログイン連携トークン、アクティブなJWTセッション、プッシュ通知用ID。"
      },
      {
        "lead": "学習・受講履歴:",
        "text": "講義動画の視聴進捗率、単元修了日時、テストの採点結果、提出したプログラムコード。"
      },
      {
        "lead": "コミュニティ投稿:",
        "text": "掲示板のスレッド、講師との個別メッセージ履歴、いいね、コメント、アップロードファイル。"
      },
      {
        "lead": "実績とランキング:",
        "text": "獲得経験値（XP）、名誉の殿堂ランキング順位、トロフィーバッジ、特典ポイント。"
      }
    ],
    "retentionExceptionsTitle": "法令に基づく保管例外事項",
    "retentionExceptionsSubtitle": "英国会社法および税法に基づく義務",
    "retentionItems": [
      {
        "lead": "税務・会計関連記録（6年間）:",
        "text": "英国税務当局（HMRC）の規定により、決済領収書、インボイス、VAT計算書類は6年間厳重に保管されます。"
      },
      {
        "lead": "マネーロンダリング防止（AML）対応:",
        "text": "決済ゲートウェイを通じて行われた取引記録は、金融犯罪防止法に基づき暗号化保管庫で管理されます。"
      },
      {
        "lead": "匿名化された証明書ハッシュ:",
        "text": "修了証の改ざん・偽造を防ぐため数学的ハッシュ値のみを公開台帳に残し、個人情報は完全に除外されます。"
      },
      {
        "lead": "セキュリティ監視ログ（90日間）:",
        "text": "サイバー攻撃およびDDoS攻撃の防御を目的として、匿名化されたアクセスログを90日間保持します。"
      }
    ],
    "faqBadge": "ご質問と補足事項",
    "faqTitle": "アカウント削除に関するよくあるご質問",
    "faqs": [
      {
        "q": "受講中の講座や修了証明書はどうなりますか？",
        "a": "アカウントの完全消去に伴い、すべての受講権限と証明書データは抹消されます。削除申請の前に、必ずすべての修了証PDFをダウンロードして保存してください。"
      },
      {
        "q": "猶予期間中に削除申請を取り消すことはできますか？",
        "a": "はい。30日以内であれば、再度ログインするか、チケット番号を添えてサポートへご連絡いただくことでいつでも削除をキャンセルできます。"
      },
      {
        "q": "アカデミー内の残高やポイントはどうなりますか？",
        "a": "残高や未利用の特典ポイントは削除申請前にご利用いただくか出金してください。削除後は無効となり返金できません。"
      },
      {
        "q": "一部の財務データが保管され続けるのはなぜですか？",
        "a": "英国の法令および企業統治基準に従い、正規の会計取引記録については6年間の保管が法定義務付けられているためです。"
      },
      {
        "q": "このポータルはGoogle PlayおよびApp Storeの規約に適合していますか？",
        "a": "はい。両ストアはアプリ内での削除機能に加え、アプリをインストールしていない状態でも手続きできる公開ウェブページの設置を義務付けています。"
      },
      {
        "q": "データ保護責任者（DPO）へ直接問い合わせるにはどうすればよいですか？",
        "a": "法務コンプライアンスチーム（contact@safiacademy.org）宛て、またはロンドン本社の住所へ書面にてお問い合わせいただけます。"
      }
    ]
  },
  "ko": {
    "methodsBadge": "계정 삭제 절차",
    "methodsTitle": "계정을 영구 삭제하는 세 가지 공식 방법",
    "method1Badge": "방법 1 • 앱 내 처리",
    "method1Title": "Safi Academy 모바일 앱",
    "method1Desc": "iOS 또는 Android 기기에 Safi Academy 앱이 설치되어 있는 경우, 프로필 메뉴에서 즉시 계정을 삭제할 수 있습니다:",
    "method1Step1": "Safi Academy 앱을 실행하고 프로필을 탭합니다.",
    "method1Step2": "설정 및 개인정보 보호 → 보안 메뉴로 이동합니다.",
    "method1Step3": "«계정 삭제»를 탭하고 비밀번호를 입력하여 승인합니다.",
    "method1Btn": "앱 다운로드",
    "method2Badge": "방법 2 • 웹 공식 신청 양식",
    "method2Title": "온라인 삭제 요청 접수",
    "method2Desc": "앱을 삭제했거나 모바일 기기를 사용할 수 없는 경우 권장합니다. 아래 인증된 웹 양식을 작성해 주십시오.",
    "method2Note": "접수 번호 즉시 발급: 제출 즉시 암호화된 데이터 삭제 추적 번호가 화면에 표시됩니다.",
    "method2Btn": "신청 양식으로 이동",
    "method3Badge": "방법 3 • 법무 및 컴플라이언스",
    "method3Title": "개인정보 보호 책임자 (DPO)",
    "method3Desc": "영국 GDPR 제17조에 따라 지정된 개인정보 보호 책임자에게 공식 서면 삭제 요청을 발송합니다:",
    "method3Subject": "제목: UK GDPR 제17조에 따른 계정 영구 삭제 요청",
    "method3Btn": "법무팀에 이메일 발송",
    "transparencyBadge": "투명성 및 데이터 거버넌스",
    "transparencyTitle": "데이터 영구 삭제 및 법정 의무 보관 안내",
    "transparencyDesc": "영구 삭제되는 개인정보와 영국 법령에 따라 필수적으로 보관해야 하는 거래 기록을 투명하게 공개합니다.",
    "legalOversightTitle": "법적 감독 및 법인 등기 정보",
    "legalOversightDesc": "Safi Academy는 Safi International Capital LTD가 공식 운영하는 교육 기관입니다. 법적 공문 및 문의는 런던 사무국으로 연락해 주십시오:",
    "emailLabelPrefix": "공식 이메일:",
    "officeLabelPrefix": "런던 법인 등기 주소:",

    "isRtl": false,
    "badge": "GDPR 및 개인정보 보호 컴플라이언스 데스크",
    "title": "계정 영구 삭제 및 데이터 파기 포털",
    "desc": "영국 GDPR 및 글로벌 개인정보 보호 규정에 따라 안전한 본인 확인을 거쳐 계정 영구 삭제 및 개인정보 파기를 신청하는 공식 창구입니다.",
    "warningTitle": "영구 삭제에 관한 필수 주의사항",
    "warningDesc": "계정을 삭제하면 학생 프로필, 실시간 수업 출석 기록, 수강 중인 강좌 내역 및 과제 제출물이 영구적으로 파기됩니다.",
    "gracePeriodNotice": "사피 아카데미는 30일간의 필수 유예(숙려) 기간을 운영합니다. 30일 이내에는 다시 로그인하거나 고객센터에 문의하여 삭제를 철회할 수 있습니다.",
    "step1Title": "1. 신원 및 학적 정보 검증",
    "step1Desc": "Supabase 보안 데이터베이스를 통해 가입된 이메일과 이름을 정확히 대조합니다.",
    "step2Title": "2. 30일 비활성화 잠금 상태",
    "step2Desc": "실수로 인한 데이터 유실을 방지하기 위해 30일 동안 계정이 안전하게 잠금 처리됩니다.",
    "step3Title": "3. 암호화 데이터 물리적 파기",
    "step3Desc": "모든 개인 식별 가능 정보가 운영 데이터베이스 및 백업 저장소에서 영구 삭제됩니다.",
    "nameLabel": "가입된 정식 성명",
    "emailLabel": "계정에 연동된 등록 이메일",
    "reasonLabel": "계정 삭제를 요청하는 주된 사유",
    "detailsLabel": "추가 의견 또는 개선 제안사항 (선택)",
    "confirm1": "모든 강의 수강 진도, 학습 자료 및 활성 구독이 영구 파기됨을 이해합니다.",
    "confirm2": "30일의 유예 기간이 만료된 후에는 이 작업을 절대 되돌릴 수 없음을 확인합니다.",
    "submitBtn": "계정 영구 삭제 공식 신청서 제출",
    "processingBtn": "보안 파기 문서를 전송하는 중...",
    "successTitle": "계정 삭제 신청이 성공적으로 접수되었습니다",
    "successDesc": "신청이 공식 등록되어 30일간의 숙려 기간이 시작되었습니다. 접수 번호를 보관해 주십시오.",
    "referenceLabel": "신청 접수 참조 번호",
    "copyBtn": "번호 복사",
    "copiedBtn": "복사 완료!",
    "errEmail": "유효한 등록 이메일 주소를 입력해 주십시오.",
    "errName": "등록된 정식 성명을 입력해 주십시오.",
    "errConfirm": "제출하기 전에 두 개의 확인 확인란에 모두 동의하셔야 합니다.",
    "backHome": "홈페이지로 돌아가기",
    "certifiedBadge": "UK GDPR 및 App Store 규정 준수 인증",
    "onlineRequestBadge": "온라인 데이터 영구 파기 공식 신청",
    "whatNext": "이후 진행 절차 안내:",
    "submitAnother": "다른 요청 접수하기",
    "namePlaceholder": "예: 김영호",
    "optionalLabel": "선택사항",
    "reasonGoal": "원하는 학업 목표를 성공적으로 달성함",
    "reasonPrivacy": "개인정보 보호 및 데이터 주권 관련 사유",
    "reasonDuplicate": "중복 또는 보조 계정을 정리하기 위함",
    "reasonAppIssues": "모바일 앱 이용 시 겪은 기술적 불편",
    "reasonOther": "기타 사유 (아래에 구체적으로 기재)",
    "feedbackPlaceholder": "사피 아카데미 서비스 개선을 위한 귀중한 의견을 남겨주세요...",
    "purgedDataTitle": "영구적으로 파기되는 데이터 항목",
    "purgedDataSubtitle": "신청 후 30일째 되는 날 전면 파기",
    "purgedItems": [
      {
        "lead": "프로필 식별 정보:",
        "text": "성명, 이메일, 암호화된 비밀번호 해시, 전화번호, 프로필 사진 및 소개글."
      },
      {
        "lead": "세션 및 인증 토큰:",
        "text": "Google 및 Apple 간편 로그인 토큰, 활성 JWT 세션 및 푸시 알림 디바이스 토큰."
      },
      {
        "lead": "학습 기록 및 이력:",
        "text": "강의 시청률, 단원 수료 일시, 퀴즈 채점 점수 및 제출한 코딩 실습물."
      },
      {
        "lead": "커뮤니티 활동 내역:",
        "text": "게시판 작성 글, 강사와의 1:1 대화 내역, 좋아요, 댓글 및 첨부 파일."
      },
      {
        "lead": "포인트 및 랭킹:",
        "text": "경험치(XP), 명예의 전당 순위, 수료 메달 및 아카데미 보상 토큰."
      }
    ],
    "retentionExceptionsTitle": "법령에 따른 보존 의무 예외 규정",
    "retentionExceptionsSubtitle": "영국 법률에 의거하여 의무 보관",
    "retentionItems": [
      {
        "lead": "세무 및 회계 영수증 (6년간 보존):",
        "text": "영국 국세청(HMRC) 규정에 따라 결제 영수증, 송장 및 부가가치세 문서는 6년간 법정 보존됩니다."
      },
      {
        "lead": "자금세탁방지(AML) 준수 기록:",
        "text": "결제 게이트웨이를 거친 금융 내역은 금융범죄방지법에 따라 암호화된 저장소에 안전하게 보관됩니다."
      },
      {
        "lead": "익명화된 수료증 암호화 해시:",
        "text": "위변조 방지를 위해 수료증 고유 해시는 공개 원장에 유지되나, 모든 개인 식별 정보는 영구 박탈됩니다."
      },
      {
        "lead": "서버 보안 로그 (90일):",
        "text": "사이버 침해 및 DDoS 공격 방어를 위해 익명 처리된 방화벽 접속 기록은 90일 동안 보존됩니다."
      }
    ],
    "faqBadge": "답변 및 상세 안내",
    "faqTitle": "계정 삭제에 대해 자주 묻는 질문",
    "faqs": [
      {
        "q": "기존에 수강하던 강좌와 발급받은 수료증은 어떻게 되나요?",
        "a": "계정 삭제 완료 시 모든 수강 권한과 수료증이 영구 소멸됩니다. 삭제 신청을 제출하기 전에 반드시 모든 PDF 수료증을 다운로드해 두시기 바랍니다."
      },
      {
        "q": "30일 숙려 기간 중에 삭제 요청을 취소할 수 있나요?",
        "a": "네, 가능합니다. 30일 이내에 포털에 다시 로그인하시거나 발급받은 접수 번호와 함께 지원팀에 연락하시면 즉시 복원됩니다."
      },
      {
        "q": "아카데미 지갑에 남아 있는 잔액은 어떻게 처리되나요?",
        "a": "잔여 크레딧 및 포인트는 계정 삭제 전 모두 환불받거나 소비하셔야 하며, 삭제 후에는 미사용 포인트가 전액 소멸됩니다."
      },
      {
        "q": "일부 금융 거래 기록이 계속 보관되는 이유는 무엇인가요?",
        "a": "영국 상법 및 세법에 따라 기업은 공인 회계 감사 및 세무 증빙을 위해 거래 송장을 6년간 보관할 법적 의무가 있습니다."
      },
      {
        "q": "이 포털은 구글 플레이 및 애플 앱스토어 규정을 충족하나요?",
        "a": "양대 앱 마켓 규정에 따라 앱 내부의 삭제 메뉴는 물론, 앱이 설치되지 않은 상태에서도 누구나 요청할 수 있는 웹 페이지를 제공합니다."
      },
      {
        "q": "개인정보 보호책임자(DPO)에게 직접 문의하려면 어떻게 하나요?",
        "a": "contact@safiacademy.org로 이메일을 보내시거나 영국 런던 본사 주소지로 서면 문의를 접수하실 수 있습니다."
      }
    ]
  },
  "nl": {
    "methodsBadge": "Opzeggingskanalen",
    "methodsTitle": "Drie officiële manieren om uw account definitief te verwijderen",
    "method1Badge": "Methode 1 • In de app",
    "method1Title": "Safi Academy Mobiele App",
    "method1Desc": "Als u de Safi Academy-app op iOS of Android heeft geïnstalleerd, kunt u uw account direct vanuit uw profiel wissen:",
    "method1Step1": "Open de Safi Academy-app en tik op uw Profiel.",
    "method1Step2": "Ga naar Instellingen & Privacy → Beveiliging.",
    "method1Step3": "Tik op «Account verwijderen» en bevestig met uw wachtwoord.",
    "method1Btn": "App downloaden",
    "method2Badge": "Methode 2 • Direct webformulier",
    "method2Title": "Online verwijderingsverzoek",
    "method2Desc": "Aanbevolen als u de mobiele app heeft verwijderd of geen toegang meer heeft tot uw apparaat. Vul het onderstaande formulier in.",
    "method2Note": "Direct referentienummer: na verzending wordt onmiddellijk een versleuteld trackingticket aangemaakt.",
    "method2Btn": "Naar het aanvraagformulier",
    "method3Badge": "Methode 3 • Juridische Zaken",
    "method3Title": "Functionaris voor Gegevensbescherming (DPO)",
    "method3Desc": "Dien een formeel schriftelijk verwijderingsverzoek in volgens artikel 17 van de Britse AVG/GDPR bij onze privacyfunctionaris:",
    "method3Subject": "Onderwerp: UK GDPR Artikel 17 — Verzoek tot accountverwijdering",
    "method3Btn": "E-mail de juridische afdeling",
    "transparencyBadge": "Transparantie & Gegevensbeheer",
    "transparencyTitle": "Gegevenswissing versus wettelijke bewaarplichten",
    "transparencyDesc": "Wij werken met volledige transparantie over welke gegevens definitief worden gewist en wat volgens de Britse wet moet worden bewaard.",
    "legalOversightTitle": "Wettelijk en toezichthoudend kader",
    "legalOversightDesc": "Safi Academy is een geregistreerde instelling onder leiding van Safi International Capital LTD. Neem voor officiële juridische stukken contact op met het secretariaat in Londen:",
    "emailLabelPrefix": "Officiële e-mail:",
    "officeLabelPrefix": "Statutaire zetel in Londen:",

    "isRtl": false,
    "badge": "AVG & Privacy Compliance Desk",
    "title": "Portaal voor Permanente Accountverwijdering",
    "desc": "Officiële aanvraag voor definitieve accountverwijdering, cryptografische vernietiging van inloggegevens en gegevenswissing conform de Britse AVG.",
    "warningTitle": "Verplichte kennisgeving inzake onomkeerbare verwijdering",
    "warningDesc": "Het verwijderen van uw account wist permanent uw studentenprofiel, aanwezigheidsregistraties, gevolgde cursussen en huiswerkarchieven.",
    "gracePeriodNotice": "Safi Academy hanteert een verplichte afkoelingsperiode van 30 dagen. Binnen deze periode kunt u de verwijdering annuleren door in te loggen of contact op te nemen.",
    "step1Title": "1. Identiteits- en dossierverificatie",
    "step1Desc": "Controle van uw geregistreerde e-mailadres en naam in onze beveiligde Supabase-database.",
    "step2Title": "2. Inactieve status gedurende 30 dagen",
    "step2Desc": "Uw account wordt 30 dagen vergrendeld om onbedoeld dataverlies te voorkomen.",
    "step3Title": "3. Cryptografische gegevenswissing",
    "step3Desc": "Alle identificeerbare persoonsgegevens worden definitief gewist uit actieve databases en back-ups.",
    "nameLabel": "Volledige geregistreerde naam",
    "emailLabel": "Gekoppeld e-mailadres van het account",
    "reasonLabel": "Voornaamste reden voor accountverwijdering",
    "detailsLabel": "Aanvullende toelichting of suggesties",
    "confirm1": "Ik begrijp dat al mijn studievoortgang, lesmateriaal en actieve abonnementen permanent gewist worden.",
    "confirm2": "Ik begrijp dat deze handeling niet meer ongedaan kan worden gemaakt na afloop van de 30 dagen.",
    "submitBtn": "Officiële aanvraag tot accountverwijdering indienen",
    "processingBtn": "Beveiligd verwijderdossier wordt verzonden...",
    "successTitle": "Aanvraag tot accountverwijdering succesvol geregistreerd",
    "successDesc": "Uw aanvraag is geregistreerd en de afkoelingsperiode van 30 dagen is ingegaan. Bewaar uw referentienummer.",
    "referenceLabel": "Officieel referentienummer",
    "copyBtn": "Nummer kopiëren",
    "copiedBtn": "Gekopieerd!",
    "errEmail": "Voer een geldig geregistreerd e-mailadres in.",
    "errName": "Vul uw volledige geregistreerde naam in.",
    "errConfirm": "U moet beide bevestigingsvakjes aanvinken voordat u kunt verzenden.",
    "backHome": "Terug naar startpagina",
    "certifiedBadge": "Gecertificeerd conform UK GDPR & App Store",
    "onlineRequestBadge": "Officiële online aanvraag voor gegevensverwijdering",
    "whatNext": "Volgende stappen:",
    "submitAnother": "Nog een aanvraag indienen",
    "namePlaceholder": "bijv. Daan van Dijk",
    "optionalLabel": "Optioneel",
    "reasonGoal": "Ik heb mijn leerdoelen succesvol behaald",
    "reasonPrivacy": "Overwegingen rond privacy en gegevensbescherming",
    "reasonDuplicate": "Ik heb een dubbel of tweede account",
    "reasonAppIssues": "Technische problemen met de mobiele app",
    "reasonOther": "Andere reden (hieronder toelichten)",
    "feedbackPlaceholder": "Laat ons weten hoe we Safi Academy kunnen verbeteren...",
    "purgedDataTitle": "Gegevens die permanent gewist worden",
    "purgedDataSubtitle": "Volledig gewist op dag 30",
    "purgedItems": [
      {
        "lead": "Profielgegevens:",
        "text": "Volledige naam, e-mailadres, gehashte wachtwoorden, telefoonnummers en profielfoto."
      },
      {
        "lead": "Sessietokens:",
        "text": "Google en Apple inlogtokens, actieve JWT-sessies en pushmeldingtokens."
      },
      {
        "lead": "Studievoortgang:",
        "text": "Videovoortgang, data van voltooide modules, toetsscores en ingeleverde programmeercode."
      },
      {
        "lead": "Communityberichten:",
        "text": "Forumbijdragen, privéberichten met mentoren, likes en geüploade bestanden."
      },
      {
        "lead": "Prestaties en punten:",
        "text": "Ervaringspunten (XP), noteringen op de Eregalerij en behaalde certificeringsbadges."
      }
    ],
    "retentionExceptionsTitle": "Wettelijke uitzonderingen voor bewaring",
    "retentionExceptionsSubtitle": "Verplicht onder de Britse wetgeving",
    "retentionItems": [
      {
        "lead": "Fiscale en facturatiegegevens (6 jaar):",
        "text": "De Britse belastingdienst (HMRC) verplicht het 6 jaar bewaren van betaalbewijzen en btw-facturen."
      },
      {
        "lead": "Wet ter voorkoming van witwassen (AML):",
        "text": "Financiële transactiegegevens worden versleuteld gearchiveerd conform de wetgeving tegen financiële misdrijven."
      },
      {
        "lead": "Geanonimiseerde certificaathashes:",
        "text": "Cryptografische hashes van behaalde diploma's blijven in het openbare register ter verificatie, zonder persoonsgegevens."
      },
      {
        "lead": "Beveiligingslogs (90 dagen):",
        "text": "Server- en firewall-logs worden 90 dagen bewaard om cyberaanvallen en misbruik te weren."
      }
    ],
    "faqBadge": "Vragen & Toelichting",
    "faqTitle": "Veelgestelde vragen over accountverwijdering",
    "faqs": [
      {
        "q": "Wat gebeurt er met mijn cursussen en certificaten?",
        "a": "Bij verwijdering worden alle cursusrechten en certificaten permanent vernietigd. Download uw PDF-certificaten VOORDAT u de aanvraag indient."
      },
      {
        "q": "Kan ik de aanvraag tijdens de 30 dagen afkoelingsperiode annuleren?",
        "a": "Ja. Binnen 30 kalenderdagen kunt u de verwijdering op elk moment herroepen door opnieuw in te loggen of de helpdesk te contacteren met uw referentienummer."
      },
      {
        "q": "Wat gebeurt er met het resterende saldo in mijn wallet?",
        "a": "Elk resterend saldo moet voorafgaand aan de aanvraag worden opgenomen of besteed; ongebruikte credits vervallen bij verwijdering."
      },
      {
        "q": "Waarom moeten bepaalde financiële gegevens bewaard blijven?",
        "a": "Onder de Britse vennootschaps- en belastingwetgeving zijn bedrijven wettelijk verplicht om transactieoverzichten 6 jaar te bewaren."
      },
      {
        "q": "Hoe voldoet dit portaal aan de eisen van Google Play en Apple?",
        "a": "Beide platforms verplichten een verwijderoptie in de app en een openbare webpagina waar de aanvraag zonder geïnstalleerde app kan worden gedaan."
      },
      {
        "q": "Hoe neem ik rechtstreeks contact op met de Functionaris Gegevensbescherming (DPO)?",
        "a": "U kunt ons juridische team bereiken via contact@safiacademy.org of per post naar ons hoofdkantoor in Londen."
      }
    ]
  },
  "uz": {
    "methodsBadge": "Hisobni bekor qilish usullari",
    "methodsTitle": "Profilingizni butunlay o‘chirishning 3 ta rasmiy yo‘li",
    "method1Badge": "1-usul • Ilova ichida",
    "method1Title": "Safi Academy mobil ilovasi",
    "method1Desc": "Agar qurilmangizda Safi Academy iOS yoki Android ilovasi o‘rnatilgan bo‘lsa, hisobingizni to‘g‘ridan-to‘g‘ri profilingizdan o‘chirishingiz mumkin:",
    "method1Step1": "Safi Academy ilovasini oching va Profilingizga kiring.",
    "method1Step2": "Sozlamalar va maxfiylik → Xavfsizlik bo‘limiga o‘ting.",
    "method1Step3": "«Hisobni o‘chirish» tugmasini bosing va parolingiz bilan tasdiqlang.",
    "method1Btn": "Ilovani yuklab olish",
    "method2Badge": "2-usul • To‘g‘ridan-to‘g‘ri veb-forma",
    "method2Title": "Sayt orqali onlayn so‘rov yuborish",
    "method2Desc": "Ilovani o‘chirib yuborgan bo‘lsangiz yoki qurilmaga kirish imkoni bo‘lmasa tavsiya etiladi. Quyidagi tasdiqlangan shaklni to‘ldiring.",
    "method2Note": "Kuzatuv raqami darhol beriladi: so‘rov yuborilishi bilan kriptografik tasdiqlovchi chipta raqami ko‘rsatiladi.",
    "method2Btn": "So‘rov shakliga o‘tish",
    "method3Badge": "3-usul • Huquqiy bo‘lim",
    "method3Title": "Ma'lumotlar xavfsizligi mas'uli (DPO)",
    "method3Desc": "Buyuk Britaniya GDPR 17-moddasi bo‘yicha rasmiy yozma arizangizni to‘g‘ridan-to‘g‘ri maxfiylik bo‘yicha mas'ul xodimimizga yuboring:",
    "method3Subject": "Mavzu: UK GDPR 17-moddasi asosida hisobni o‘chirish arizasi",
    "method3Btn": "Yuridik bo‘limga xat yozish",
    "transparencyBadge": "Shaffoflik va ma'lumotlar boshqaruvi",
    "transparencyTitle": "Ma'lumotlarni o‘chirish va qonuniy saqlash majburiyatlari",
    "transparencyDesc": "Qaysi ma'lumotlar butunlay o‘chirilishi va Britaniya qonunchiligi bo‘yicha qaysi moliyaviy yozuvlar saqlanishi kerakligi borasida to‘liq ochiqlik bilan ishlaymiz.",
    "legalOversightTitle": "Qonuniy va korporativ nazorat",
    "legalOversightDesc": "Safi Academy Safi International Capital LTD boshqaruvi ostida ro‘yxatdan o‘tgan muassasadir. Rasmiy xabarnomalar uchun London kotibiyatiga murojaat qiling:",
    "emailLabelPrefix": "Rasmiy elektron pochta:",
    "officeLabelPrefix": "Londondagi ro‘yxatdan o‘tgan manzil:",

    "isRtl": false,
    "badge": "GDPR va Maxfiylik Nazorati Xizmati",
    "title": "Akkauntni Butunlay O‘chirish Portali",
    "desc": "Buyuk Britaniya GDPR qonunchiligi va xalqaro me'yorlar asosida akkauntni butunlay o‘chirish, maxfiy kalitlarni yo‘q qilish va shaxsiy ma'lumotlarni tozalash arizasi.",
    "warningTitle": "Qaytarib bo‘lmas o‘chirish bo‘yicha majburiy ogohlantirish",
    "warningDesc": "Akkauntingiz o‘chirilishi natijasida ta'lim profili, darslardagi ishtirok qaydlari, xarid qilingan kurslar va topshiriqlar arxivi butunlay yo‘q qilinadi.",
    "gracePeriodNotice": "Safi Academy majburiy 30 kunlik o‘ylab ko‘rish muddatini beradi. Ushbu davrda qayta tizimga kirish yoki yordam xizmatiga murojaat qilish orqali o‘chirishni bekor qilishingiz mumkin.",
    "step1Title": "1. Shaxsni va profilni tekshirish",
    "step1Desc": "Ro‘yxatdan o‘tgan email va ismingizni Supabase xavfsizlik bazasi orqali tekshirish.",
    "step2Title": "2. 30 kunlik nofaol holat",
    "step2Desc": "Tasodifiy ma'lumot yo‘qotilishining oldini olish uchun akkaunt 30 kun davomida qulflangan holatda turadi.",
    "step3Title": "3. Ma'lumotlarni to‘liq tozalash",
    "step3Desc": "Barcha shaxsiy ma'lumotlar faol ma'lumotlar bazalaridan va zaxira nusxalardan butunlay o‘chiriladi.",
    "nameLabel": "Ro‘yxatdan o‘tgan to‘liq ismingiz",
    "emailLabel": "Akkauntga ulangan elektron pochta",
    "reasonLabel": "Akkauntni o‘chirishning asosiy sababi",
    "detailsLabel": "Qo‘shimcha fikrlar yoki xizmatni yaxshilash takliflari",
    "confirm1": "Kurslar bo‘yicha barcha natijalarim, fayllarim va faol obunalarim butunlay o‘chirilishini tushunaman.",
    "confirm2": "30 kunlik muddat tugaganidan so‘ng ushbu amalni hech qachon qaytarib bo‘lmasligini tasdiqlayman.",
    "submitBtn": "Akkauntni butunlay o‘chirish arizasini topshirish",
    "processingBtn": "Xavfsiz o‘chirish hujjati yuborilmoqda...",
    "successTitle": "Akkauntni o‘chirish arizasi muvaffaqiyatli qabul qilindi",
    "successDesc": "Arizangiz qayd etildi va 30 kunlik kutish holati boshlandi. Kuzatuv raqamingizni saqlab qo‘ying.",
    "referenceLabel": "Rasmiy murojaat raqami",
    "copyBtn": "Nusxa olish",
    "copiedBtn": "Nusxa olindi!",
    "errEmail": "Iltimos, to‘g‘ri ro‘yxatdan o‘tgan email manzilini kiriting.",
    "errName": "Iltimos, ro‘yxatdagi to‘liq ismingizni kiriting.",
    "errConfirm": "Yuborishdan oldin har ikkala tasdiqlash katakchasini belgilashingiz shart.",
    "backHome": "Bosh sahifaga qaytish",
    "certifiedBadge": "UK GDPR va App Store talablariga mos",
    "onlineRequestBadge": "Onlayn ma'lumotlarni o‘chirish rasmiy arizasi",
    "whatNext": "Keyingi qadamlar:",
    "submitAnother": "Boshqa ariza topshirish",
    "namePlaceholder": "masalan: Sardor Aliyev",
    "optionalLabel": "Ixtiyoriy",
    "reasonGoal": "O‘quv maqsadlarimga to‘liq erishdim",
    "reasonPrivacy": "Maxfiylik va ma'lumotlar xavfsizligi nuqtai nazaridan",
    "reasonDuplicate": "Menda takroriy yoki ikkinchi akkaunt mavjud",
    "reasonAppIssues": "Mobil ilovada texnik nosozliklarga duch keldim",
    "reasonOther": "Boshqa sabab (quyida yozib qoldiring)",
    "feedbackPlaceholder": "Safi Academy faoliyatini yanada yaxshilash uchun o‘z fikrlaringizni qoldiring...",
    "purgedDataTitle": "Butunlay yo‘q qilinadigan ma'lumotlar",
    "purgedDataSubtitle": "30-kunda to‘liq tozalash",
    "purgedItems": [
      {
        "lead": "Profil ma'lumotlari:",
        "text": "To‘liq ism, email, shifrlangan parollar, telefon raqamlari va profil rasmi."
      },
      {
        "lead": "Tizimga kirish tokenlari:",
        "text": "Google va Apple orqali kirish kalitlari, faol JWT sessiyalari va bildirishnoma tokenlari."
      },
      {
        "lead": "Ta'lim natijalari:",
        "text": "Videolarni ko‘rish foizi, modullarni tamomlash sanalari, test natijalari va kod topshiriqlari."
      },
      {
        "lead": "Hamjamiyat yozishmalari:",
        "text": "Forumdagi mavzular, o‘qituvchilar bilan shaxsiy suhbatlar, layklar va yuklangan fayllar."
      },
      {
        "lead": "Ballar va mukofotlar:",
        "text": "Tajriba ballari (XP), Faxriy doskadagi o‘rinlar, sertifikat nishonlari va tokenlar."
      }
    ],
    "retentionExceptionsTitle": "Qonuniy saqlash majburiyati istisnolari",
    "retentionExceptionsSubtitle": "Buyuk Britaniya qonunchiligi bo‘yicha talab qilinadi",
    "retentionItems": [
      {
        "lead": "Soliq va hisob-kitob hujjatlari (6 yil):",
        "text": "Buyuk Britaniya Soliq xizmati (HMRC) to‘lov cheklari va hisob-fakturalarni 6 yil davomida saqlashni talab qiladi."
      },
      {
        "lead": "Moliyaviy jinoyatlarning oldini olish (AML):",
        "text": "To‘lovlar tarixi moliyaviy jinoyatlarga qarshi kurashish qonunchiligiga muvofiq shifrlangan omborda saqlanadi."
      },
      {
        "lead": "Anonimlashtirilgan sertifikat xeshlari:",
        "text": "Berilgan diplomlarning xesh qiymatlari qalbaki hujjatlarning oldini olish uchun reyestrda saqlanadi, shaxsiy ma'lumotlar o‘chiriladi."
      },
      {
        "lead": "Tizim xavfsizligi jurnallari (90 kun):",
        "text": "Xakerlik hujumlarini qaytarish maqsadida xavfsizlik devori jurnallari 90 kun davomida saqlanadi."
      }
    ],
    "faqBadge": "Savollar va tushuntirishlar",
    "faqTitle": "Akkauntni o‘chirish bo‘yicha ko‘p beriladigan savollar",
    "faqs": [
      {
        "q": "O‘qiyotgan kurslarim va sertifikatlarim nima bo‘ladi?",
        "a": "Akkaunt o‘chirilganda barcha kurslar va sertifikatlar butunlay yo‘q qilinadi. O‘chirishdan oldin barcha PDF sertifikatlaringizni yuklab oling."
      },
      {
        "q": "30 kunlik muddat ichida o‘chirishni bekor qilsa bo‘ladimi?",
        "a": "Ha. 30 kalendar kuni ichida akkauntga qayta kirish yoki murojaat raqamingiz bilan yordam xizmatiga yozish orqali jarayonni to‘xtatishingiz mumkin."
      },
      {
        "q": "Akademiya hamyonidagi qoldiq mablag‘ nima bo‘ladi?",
        "a": "Ariza topshirishdan oldin barcha mablag‘larni yechib olish yoki ishlatish shart, o‘chirilgandan keyin qoldiqlar bekor qilinadi."
      },
      {
        "q": "Nima uchun ayrim moliyaviy ma'lumotlar saqlanadi?",
        "a": "Buyuk Britaniya kompaniyalar va soliq qonunchiligi bo‘yicha hisob-fakturalarni 6 yil saqlash majburiydir."
      },
      {
        "q": "Ushbu sahifa Google Play va App Store qoidalariga qanday javob beradi?",
        "a": "Har ikki do‘kon ilova ichida va ilovani o‘rnatmasdan ham veb-sahifa orqali akkauntni o‘chirish imkoniyati bo‘lishini talab qiladi."
      },
      {
        "q": "Ma'lumotlar himoyasi mas'uli (DPO) bilan qanday bog‘lansa bo‘ladi?",
        "a": "Bizning yuridik jamoamiz bilan contact@safiacademy.org orqali yoki Londondagi bosh ofisimizga xat yuborish orqali bog‘lanishingiz mumkin."
      }
    ]
  },
  "id": {
    "methodsBadge": "Kanal Penghentian",
    "methodsTitle": "Tiga Cara Resmi Menghapus Akun Anda Secara Permanen",
    "method1Badge": "Metode 1 • Melalui Aplikasi",
    "method1Title": "Aplikasi Seluler Safi Academy",
    "method1Desc": "Jika aplikasi Safi Academy terpasang di perangkat iOS atau Android Anda, Anda dapat menghapus akun secara instan langsung dari profil:",
    "method1Step1": "Buka aplikasi Safi Academy dan ketuk menu Profil Anda.",
    "method1Step2": "Buka Pengaturan & Privasi → Keamanan.",
    "method1Step3": "Ketuk «Hapus Akun» dan konfirmasikan dengan kata sandi Anda.",
    "method1Btn": "Unduh Aplikasi",
    "method2Badge": "Metode 2 • Formulir Web Langsung",
    "method2Title": "Pengajuan Permohonan Daring",
    "method2Desc": "Disarankan jika Anda telah mencopot pemasangan aplikasi atau kehilangan akses perangkat. Isi formulir terverifikasi di bawah ini.",
    "method2Note": "Penerbitan Tiket Instan: Tiket referensi pelacakan terenkripsi akan diterbitkan segera setelah formulir dikirimkan.",
    "method2Btn": "Lompat ke Formulir Permohonan",
    "method3Badge": "Metode 3 • Departemen Hukum",
    "method3Title": "Petugas Perlindungan Data (DPO)",
    "method3Desc": "Kirimkan permohonan penghapusan resmi secara tertulis berdasarkan Pasal 17 UK GDPR langsung kepada petugas kepatuhan privasi kami:",
    "method3Subject": "Subjek: UK GDPR Pasal 17 — Permohonan Penghapusan Akun",
    "method3Btn": "Kirim Email ke Kantor Hukum",
    "transparencyBadge": "Transparansi & Tata Kelola Data",
    "transparencyTitle": "Penghapusan Data vs Retensi yang Diwajibkan Hukum",
    "transparencyDesc": "Kami bekerja dengan transparansi penuh mengenai apa yang dihapus secara permanen dan apa yang wajib disimpan berdasarkan undang-undang Inggris.",
    "legalOversightTitle": "Pengawasan Hukum dan Korporasi",
    "legalOversightDesc": "Safi Academy adalah institusi terdaftar yang dikelola oleh Safi International Capital LTD. Untuk korespondensi hukum formal, hubungi sekretariat kami di London:",
    "emailLabelPrefix": "Email Resmi:",
    "officeLabelPrefix": "Kantor Terdaftar di London:",

    "isRtl": false,
    "badge": "Layanan Kepatuhan Privasi & GDPR",
    "title": "Portal Penghapusan Akun Permanen",
    "desc": "Permohonan resmi penghapusan akun permanen, pemusnahan kredensial kriptografis, dan pembersihan data sesuai UK GDPR dan standar privasi global.",
    "warningTitle": "Pemberitahuan Wajib Mengenai Penghapusan Permanen",
    "warningDesc": "Menghapus akun Anda akan memusnahkan profil siswa, catatan kehadiran kelas langsung, kursus yang terdaftar, dan arsip tugas secara permanen.",
    "gracePeriodNotice": "Safi Academy menerapkan masa jeda wajib selama 30 hari. Selama 30 hari ini Anda dapat membatalkan penghapusan hanya dengan masuk kembali atau menghubungi dukungan pelanggan.",
    "step1Title": "1. Verifikasi Identitas & Berkas",
    "step1Desc": "Pencocokan alamat email terdaftar dan nama resmi Anda melalui basis data keamanan Supabase.",
    "step2Title": "2. Status Non-aktif 30 Hari",
    "step2Desc": "Akun Anda dinonaktifkan dan dikunci selama 30 hari kalender untuk mencegah kehilangan data yang tidak disengaja.",
    "step3Title": "3. Pembersihan Data Kriptografis",
    "step3Desc": "Seluruh data identitas pribadi dimusnahkan secara permanen dari basis data aktif dan cadangan sistem.",
    "nameLabel": "Nama Lengkap Terdaftar",
    "emailLabel": "Alamat Email Terdaftar",
    "reasonLabel": "Alasan Utama Penghapusan Akun",
    "detailsLabel": "Komentar Tambahan atau Saran Perbaikan",
    "confirm1": "Saya memahami bahwa semua kemajuan belajar, berkas kursus, dan langganan aktif akan dihapus permanen.",
    "confirm2": "Saya memahami bahwa tindakan ini tidak dapat dibatalkan setelah masa jeda 30 hari berakhir.",
    "submitBtn": "Kirim Permohonan Resmi Penghapusan Akun",
    "processingBtn": "Mengirimkan berkas penghapusan aman...",
    "successTitle": "Permohonan Penghapusan Berhasil Terdaftar",
    "successDesc": "Permohonan Anda telah tercatat dan masa tenggang 30 hari telah dimulai. Harap simpan nomor tiket referensi Anda.",
    "referenceLabel": "Nomor Tiket Referensi Resmi",
    "copyBtn": "Salin Tiket",
    "copiedBtn": "Tersalin!",
    "errEmail": "Harap masukkan alamat email terdaftar yang valid.",
    "errName": "Harap cantumkan nama lengkap terdaftar Anda.",
    "errConfirm": "Anda harus mencentang kedua kotak konfirmasi sebelum mengirimkan permohonan.",
    "backHome": "Kembali ke Beranda",
    "certifiedBadge": "Tersertifikasi UK GDPR & App Store",
    "onlineRequestBadge": "Permohonan Daring Penghapusan Data Resmi",
    "whatNext": "Langkah selanjutnya:",
    "submitAnother": "Kirim Permohonan Lain",
    "namePlaceholder": "contoh: Budi Pratama",
    "optionalLabel": "Opsional",
    "reasonGoal": "Saya telah berhasil menyelesaikan seluruh target belajar",
    "reasonPrivacy": "Pertimbangan privasi dan kedaulatan data pribadi",
    "reasonDuplicate": "Saya memiliki akun duplikat atau akun cadangan",
    "reasonAppIssues": "Kendala teknis pada penggunaan aplikasi seluler",
    "reasonOther": "Alasan lain (silakan jelaskan di bawah)",
    "feedbackPlaceholder": "Beritahu kami bagaimana kami dapat meningkatkan kualitas Safi Academy...",
    "purgedDataTitle": "Data yang Akan Dihapus Secara Permanen",
    "purgedDataSubtitle": "Dibersihkan Sepenuhnya pada Hari ke-30",
    "purgedItems": [
      {
        "lead": "Identitas & Profil:",
        "text": "Nama lengkap, alamat email, hash kata sandi terenkripsi, nomor telepon, dan foto profil."
      },
      {
        "lead": "Token Akses & Sesi:",
        "text": "Token login Google dan Apple, sesi JWT aktif, dan token notifikasi perangkat seluler."
      },
      {
        "lead": "Riwayat Pembelajaran:",
        "text": "Persentase tontonan video, tanggal penyelesaian modul, nilai kuis, dan kode tugas pemrograman."
      },
      {
        "lead": "Interaksi Komunitas:",
        "text": "Topik diskusi forum, pesan obrolan pribadi dengan mentor, tanda suka, dan lampiran berkas."
      },
      {
        "lead": "Poin & Penghargaan:",
        "text": "Poin pengalaman (XP), peringkat Wall of Fame, lencana sertifikasi, dan token hadiah."
      }
    ],
    "retentionExceptionsTitle": "Pengecualian Penyimpanan Data Berdasarkan Hukum",
    "retentionExceptionsSubtitle": "Diwajibkan oleh Peraturan Inggris",
    "retentionItems": [
      {
        "lead": "Catatan Pajak & Faktur (6 Tahun):",
        "text": "Otoritas Pajak Inggris (HMRC) dan Undang-Undang Perusahaan mewajibkan penyimpanan tanda terima dan faktur selama 6 tahun."
      },
      {
        "lead": "Kepatuhan Anti Pencucian Uang (AML):",
        "text": "Catatan transaksi pembayaran disimpan dalam brankas terenkripsi sesuai ketentuan pencegahan kejahatan finansial."
      },
      {
        "lead": "Hash Kriptografi Anonim:",
        "text": "Hash matematika dari ijazah yang diterbitkan tetap berada di buku besar publik untuk mencegah pemalsuan, tanpa memuat data pribadi."
      },
      {
        "lead": "Log Keamanan Sistem (90 Hari):",
        "text": "Log akses firewall disimpan selama 90 hari guna melindungi infrastruktur dari serangan siber dan DDoS."
      }
    ],
    "faqBadge": "Jawaban & Penjelasan",
    "faqTitle": "Pertanyaan Umum Seputar Penghapusan Akun",
    "faqs": [
      {
        "q": "Apa yang terjadi pada kursus dan sertifikat saya?",
        "a": "Setelah penghapusan selesai, semua akses kursus dan sertifikat akan dihapus permanen. Unduh seluruh sertifikat PDF Anda SEBELUM mengajukan permohonan."
      },
      {
        "q": "Dapatkah saya membatalkan permohonan dalam masa jeda 30 hari?",
        "a": "Ya. Anda memiliki waktu 30 hari kalender untuk membatalkan proses penghapusan dengan cara masuk kembali atau menghubungi dukungan pelanggan dengan tiket referensi Anda."
      },
      {
        "q": "Apa yang terjadi dengan sisa saldo di dompet akademi?",
        "a": "Seluruh saldo harus ditarik atau digunakan sebelum mengajukan permohonan, karena saldo yang tersisa akan hangus setelah akun dihapus."
      },
      {
        "q": "Mengapa sebagian catatan keuangan tetap harus disimpan?",
        "a": "Berdasarkan undang-undang perpajakan Inggris, perusahaan diwajibkan secara hukum untuk menyimpan dokumen faktur transaksi selama 6 tahun."
      },
      {
        "q": "Bagaimana portal ini memenuhi ketentuan Google Play dan App Store?",
        "a": "Kedua toko aplikasi mewajibkan tersedianya fitur penghapusan di dalam aplikasi serta tautan situs web publik yang dapat diakses tanpa perlu menginstal aplikasi."
      },
      {
        "q": "Bagaimana cara menghubungi Pejabat Perlindungan Data (DPO) secara langsung?",
        "a": "Anda dapat menghubungi tim hukum kami melalui email contact@safiacademy.org atau melalui surat fisik ke kantor pusat kami di London."
      }
    ]
  }
};

export function getDeleteAccountTranslation(locale: string): DeleteAccountTranslation {
  const norm = (locale || "en").toLowerCase();
  return deleteAccountTranslationsMap[norm] || deleteAccountTranslationsMap.en;
}
