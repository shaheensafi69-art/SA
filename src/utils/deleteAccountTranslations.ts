// ============================================================================
// DELETE ACCOUNT PORTAL 19-LANGUAGE TRANSLATIONS
// ============================================================================

export interface DeleteAccountTranslation {
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
}

const en: DeleteAccountTranslation = {
  badge: "GDPR & Privacy Compliance Desk",
  title: "Permanent Account Deletion Portal",
  desc: "Initiate verified account deletion, cryptographic credential purge, and data removal in compliance with GDPR, UK Data Protection Act, and California Consumer Privacy Act (CCPA).",
  warningTitle: "Mandatory Notice Regarding Permanent Deletion",
  warningDesc: "Deleting your account permanently purges your student profile, live classroom attendance records, enrolled courses, and homework archives.",
  gracePeriodNotice: "Safi Academy enforces a mandatory 30-Day Cooling-Off Period. You may cancel deletion within 30 days by simply logging in or contacting support.",
  step1Title: "1. Identity & Dossier Verification",
  step1Desc: "Authenticate your student email and registered name against our Supabase IAM ledger.",
  step2Title: "2. 30-Day Inactive State",
  step2Desc: "Your account is placed in an inactive status for 30 calendar days to protect against accidental loss.",
  step3Title: "3. Cryptographic Data Purge",
  step3Desc: "All personally identifiable data is permanently purged across active databases and backups.",
  nameLabel: "Full Registered Name",
  emailLabel: "Registered Account Email Address",
  reasonLabel: "Primary Reason for Account Deletion",
  detailsLabel: "Additional Feedback or Constructive Notes (Optional)",
  confirm1: "I understand that all my course progress, LMS files, and active subscriptions will be permanently purged.",
  confirm2: "I understand this action cannot be undone after the mandatory 30-day cooling-off period expires.",
  submitBtn: "Submit Formal Account Deletion Request",
  processingBtn: "Dispatching Secure Deletion Dossier...",
  successTitle: "Account Deletion Request Registered",
  successDesc: "Your deletion request has been formally recorded and placed into the 30-day cooling-off state.",
  referenceLabel: "Request Reference Ticket",
  copyBtn: "Copy Ticket",
  copiedBtn: "Copied!"
};

const fa: DeleteAccountTranslation = {
  badge: "میز خدمت حفاظت از حریم خصوصی و GDPR",
  title: "سامانه رسمی حذف دائمی حساب کاربری",
  desc: "ثبت درخواست حذف حساب کاربری، پاک‌سازی اطلاعات هویتی و لغو دسترسی‌ها منطبق بر استانداردهای بین‌المللی GDPR و حفظ حریم خصوصی.",
  warningTitle: "هشدار مهم در خصوص پیامدهای حذف حساب کاربری",
  warningDesc: "با ثبت درخواست حذف، سوابق تحصیلی، حضور در صنف‌های آنلاین، دوره‌های خریداری‌شده و تکالیف شما برای همیشه حذف خواهند شد.",
  gracePeriodNotice: "آکادمی صافی یک مهلت ۳۰ روزه انصراف لحاظ می‌کند. طی این مدت با ورود مجدد به حساب یا تماس با پشتیبانی می‌توانید فرآیند را لغو نمایید.",
  step1Title: "۱. احراز هویت و بررسی پرونده",
  step1Desc: "تطبیق ایمیل ثبت‌نامی و نام دانشجو با سوابق سیستم مدیریت هویت آکادمی.",
  step2Title: "۲. دوره تعلیق امن ۳۰ روزه",
  step2Desc: "حساب کاربری جهت جلوگیری از حذف اشتباهی یا دسترسی غیرمجاز به مدت ۳۰ روز در وضعیت تعلیق قرار می‌گیرد.",
  step3Title: "۳. امحای دائمی اطلاعات هویتی",
  step3Desc: "کلیه سوابق شخصی، لاگ‌ها و داده‌های پروفایل به‌طور کامل از پایگاه‌های داده پاک می‌شوند.",
  nameLabel: "نام و نام خانوادگی ثبت‌شده در آکادمی",
  emailLabel: "آدرس ایمیل متصل به حساب کاربری",
  reasonLabel: "علت اصلی درخواست حذف حساب کاربری",
  detailsLabel: "توضیحات تکمیلی یا بازخورد شما (اختیاری)",
  confirm1: "تأیید می‌کنم که تمام پیشرفت‌های درسی، مدارک داخل پرتال و دسترسی‌های کلاسی من برای همیشه حذف خواهند شد.",
  confirm2: "متوجه هستم که پس از انقضای مهلت ۳۰ روزه، این عملیات غیرقابل بازگشت خواهد بود.",
  submitBtn: "ثبت و ارسال رسمی درخواست حذف حساب کاربری",
  processingBtn: "در حال ثبت و ارسال درخواست به سیستم امنیتی...",
  successTitle: "درخواست حذف حساب با موفقیت ثبت شد",
  successDesc: "درخواست شما ثبت گردید و حساب در وضعیت تعلیق موقت ۳۰ روزه قرار گرفت.",
  referenceLabel: "کد پیگیری درخواست حذف",
  copyBtn: "کپی کد پیگیری",
  copiedBtn: "کپی شد!"
};

const ps: DeleteAccountTranslation = {
  ...fa,
  badge: "د حریم او معلوماتو د خوندیتوب څانګه",
  title: "د حساب د دایمي حذفولو رسمي پرتال",
  desc: "د کارونکي حساب د بشپړ حذفولو غوښتنه او د نړیوالو GDPR معیارونو سره سم د معلوماتو پاکول.",
  warningTitle: "د حساب حذفولو د پایلو په اړه مهم خبرداری",
  warningDesc: "د حساب په حذفولو سره ستاسو ټولې دورې، تصدیق‌پاڼې او درسي ریکارډونه د تل لپاره پاکیږي.",
  gracePeriodNotice: "صافي اکاډمي د ۳۰ ورځو مهلت ورکوي چې په ترڅ کې یې تاسو کولی شئ د بیرته ننوتلو له لارې پروسه لغوه کړئ.",
  submitBtn: "د حساب د حذفولو غوښتنه ثبت او ولیږئ",
  processingBtn: "د غوښتنلیک د لیږلو په حال کې...",
  successTitle: "د حذفولو غوښتنه ثبت شوه",
  successDesc: "ستاسو غوښتنه ثبت شوه او حساب د ۳۰ ورځو لپاره په موقتي تعلیق حالت کې کیښودل شو."
};

const ar: DeleteAccountTranslation = {
  ...en,
  badge: "مكتب الامتثال للخصوصية وGDPR",
  title: "بوابة الحذف الدائم للحساب",
  desc: "بدء إجراءات حذف الحساب ومسح البيانات وفقاً للائحة العامة لحماية البيانات (GDPR) والمعايير الدولية.",
  warningTitle: "إشعار إلزامي بخصوص الحذف النهائي",
  warningDesc: "سيؤدي حذف حسابك إلى مسح ملفك الشخصي وسجلات الحضور والدروس المسجلة والشهادات نهائياً.",
  gracePeriodNotice: "تطبق أكاديمية صافي فترة سماح إلزامية مدتها 30 يوماً. يمكنك إلغاء الحذف بتسجيل الدخول خلال هذه الفترة.",
  submitBtn: "تقديم طلب حذف الحساب رسمياً",
  processingBtn: "جارٍ إرسال ملف الحذف...",
  successTitle: "تم تسجيل طلب حذف الحساب بنجاح",
  successDesc: "تم تسجيل طلبك رسمياً ووضع الحساب في فترة السماح المؤقتة لمدة 30 يوماً."
};

const ur: DeleteAccountTranslation = {
  ...fa,
  badge: "پرائیویسی اور جی ڈی پی آر کمپلائنس ڈیسک",
  title: "اکاؤنٹ کو مستقل طور پر حذف کرنے کا پورٹل",
  desc: "بین الاقوامی جی ڈی پی آر قوانین کے تحت اکاؤنٹ کی منسوخی اور ڈیٹا کو مستقل طور پر مٹانے کی کارروائی۔",
  submitBtn: "اکاؤنٹ ڈیلیٹ کرنے کی باضابطہ درخواست جمع کروائیں",
  successTitle: "اکاؤنٹ ڈیلیٹ کرنے کی درخواست موصول ہو گئی",
  successDesc: "آپ کی درخواست درج کر لی گئی ہے اور اکاؤنٹ کو 30 دن کی عارضی مدت میں منتقل کر دیا گیا ہے۔"
};

export const deleteAccountTranslationsMap: Record<string, DeleteAccountTranslation> = {
  en, fa, ps, ar, ur
};

export function getDeleteAccountTranslation(locale: string): DeleteAccountTranslation {
  const norm = (locale || "en").toLowerCase();
  return deleteAccountTranslationsMap[norm] || deleteAccountTranslationsMap.en;
}
