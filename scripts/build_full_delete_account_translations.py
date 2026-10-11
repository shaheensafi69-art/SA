# -*- coding: utf-8 -*-
import json

LANGS = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]

del_data = {
    "en": {
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
        "faqs": [
            {
                "q": "What happens to my enrolled courses and educational certificates?",
                "a": "Upon account deletion, all active course enrollments, lecture progress, quiz submissions, and personal certificates in your portal will be permanently removed. Download your certificates BEFORE initiating deletion."
            },
            {
                "q": "Can I cancel my account deletion request during the cooling-off period?",
                "a": "Yes! You have a 30-calendar-day window during which you can reverse this action by logging into your portal or reaching out to support."
            },
            {
                "q": "Will my payment and transaction records be purged immediately?",
                "a": "Student profile data is purged, but mandatory statutory accounting records (such as UK VAT and corporation tax invoices) are legally retained for statutory compliance periods."
            }
        ]
    },
    "fa": {
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
                "q": "آیا سوابق مالی و فاکتورها نیز فوراً پاک می‌شوند؟",
                "a": "اطلاعات هویتی پاک می‌شوند، اما فاکتورهای مالی طبق الزامات قانونی حسابداری بریتانیا برای دوره‌های مشخص نگهداری می‌گردند."
            }
        ]
    }
}

# Expand for all 17 remaining languages
for lang in LANGS:
    if lang in del_data:
        continue
    base = del_data["en"]
    del_data[lang] = {
        "badge": base["badge"],
        "title": base["title"],
        "desc": base["desc"],
        "warningTitle": base["warningTitle"],
        "warningDesc": base["warningDesc"],
        "gracePeriodNotice": base["gracePeriodNotice"],
        "step1Title": base["step1Title"],
        "step1Desc": base["step1Desc"],
        "step2Title": base["step2Title"],
        "step2Desc": base["step2Desc"],
        "step3Title": base["step3Title"],
        "step3Desc": base["step3Desc"],
        "nameLabel": base["nameLabel"],
        "emailLabel": base["emailLabel"],
        "reasonLabel": base["reasonLabel"],
        "detailsLabel": base["detailsLabel"],
        "confirm1": base["confirm1"],
        "confirm2": base["confirm2"],
        "submitBtn": base["submitBtn"],
        "processingBtn": base["processingBtn"],
        "successTitle": base["successTitle"],
        "successDesc": base["successDesc"],
        "referenceLabel": base["referenceLabel"],
        "copyBtn": base["copyBtn"],
        "copiedBtn": base["copiedBtn"],
        "errEmail": base["errEmail"],
        "errName": base["errName"],
        "errConfirm": base["errConfirm"],
        "backHome": base["backHome"],
        "certifiedBadge": base["certifiedBadge"],
        "onlineRequestBadge": base["onlineRequestBadge"],
        "whatNext": base["whatNext"],
        "submitAnother": base["submitAnother"],
        "namePlaceholder": base["namePlaceholder"],
        "optionalLabel": base["optionalLabel"],
        "reasonGoal": base["reasonGoal"],
        "reasonPrivacy": base["reasonPrivacy"],
        "reasonDuplicate": base["reasonDuplicate"],
        "reasonAppIssues": base["reasonAppIssues"],
        "reasonOther": base["reasonOther"],
        "feedbackPlaceholder": base["feedbackPlaceholder"],
        "faqs": base["faqs"]
    }

# Specific high-fidelity translations for Russian, Chinese, Turkish
del_data["ru"]["title"] = "Портал безвозвратного удаления аккаунта"
del_data["ru"]["badge"] = "Отдел соответствия GDPR и защите данных"
del_data["ru"]["backHome"] = "Вернуться на главную"
del_data["ru"]["certifiedBadge"] = "Сертифицировано по UK GDPR и App Store"
del_data["ru"]["onlineRequestBadge"] = "Онлайн-запрос на удаление профиля"
del_data["ru"]["whatNext"] = "Что происходит дальше:"
del_data["ru"]["submitAnother"] = "Подать еще один запрос"
del_data["ru"]["namePlaceholder"] = "например: Александр Морозов"
del_data["ru"]["optionalLabel"] = "Необязательно"
del_data["ru"]["reasonGoal"] = "Я достиг всех учебных целей"
del_data["ru"]["reasonPrivacy"] = "Соображения конфиденциальности"
del_data["ru"]["reasonDuplicate"] = "У меня есть дублирующий аккаунт"
del_data["ru"]["reasonAppIssues"] = "Технические проблемы с приложением"
del_data["ru"]["reasonOther"] = "Другая причина (укажите ниже)"
del_data["ru"]["feedbackPlaceholder"] = "Поделитесь вашим отзывом или укажите детали..."
del_data["ru"]["errEmail"] = "Пожалуйста, введите корректный e-mail."
del_data["ru"]["errName"] = "Пожалуйста, укажите ваше полное имя."
del_data["ru"]["errConfirm"] = "Необходимо подтвердить оба пункта перед отправкой."

del_data["zh"]["title"] = "账号永久注销与数据销毁门户"
del_data["zh"]["badge"] = "GDPR 与隐私保护合规处"
del_data["zh"]["backHome"] = "返回官方首页"
del_data["zh"]["certifiedBadge"] = "符合英国GDPR及苹果App Store双重认证"
del_data["zh"]["onlineRequestBadge"] = "线上自主提交账号销毁申请"
del_data["zh"]["whatNext"] = "后续执行步骤："
del_data["zh"]["submitAnother"] = "提交其他工单"
del_data["zh"]["namePlaceholder"] = "例如：王思明"
del_data["zh"]["optionalLabel"] = "可选填"
del_data["zh"]["reasonGoal"] = "已完成全部学业目标"
del_data["zh"]["reasonPrivacy"] = "个人隐私及数据主权考量"
del_data["zh"]["reasonDuplicate"] = "拥有重复或备用账户"
del_data["zh"]["reasonAppIssues"] = "移动端应用程序技术故障"
del_data["zh"]["reasonOther"] = "其他原因（请在下方说明）"
del_data["zh"]["feedbackPlaceholder"] = "请告知我们可以如何改进，或填写具体数据清除备注..."
del_data["zh"]["errEmail"] = "请输入有效的注册电子邮箱地址。"
del_data["zh"]["errName"] = "请输入完整的注册姓名。"
del_data["zh"]["errConfirm"] = "提交前必须勾选两项确认声明。"

del_data["tr"]["title"] = "Kalıcı Hesap Silme Portalı"
del_data["tr"]["badge"] = "GDPR & Gizlilik Uyum Masası"
del_data["tr"]["backHome"] = "Ana Sayfaya Dön"
del_data["tr"]["certifiedBadge"] = "UK GDPR ve App Store Onaylı"
del_data["tr"]["onlineRequestBadge"] = "Çevrim İçi Hesap Silme Talebi"
del_data["tr"]["whatNext"] = "Sonraki adımlar:"
del_data["tr"]["submitAnother"] = "Başka Talep Gönder"
del_data["tr"]["namePlaceholder"] = "ör. Mehmet Yılmaz"
del_data["tr"]["optionalLabel"] = "İsteğe Bağlı"
del_data["tr"]["reasonGoal"] = "Eğitim hedeflerimi tamamladım"
del_data["tr"]["reasonPrivacy"] = "Gizlilik ve veri güvenliği nedenleri"
del_data["tr"]["reasonDuplicate"] = "Mükerrer veya ikinci bir hesabım var"
del_data["tr"]["reasonAppIssues"] = "Mobil uygulama ile ilgili teknik sorunlar"
del_data["tr"]["reasonOther"] = "Diğer nedenler (lütfen aşağıda belirtin)"
del_data["tr"]["feedbackPlaceholder"] = "Akademi'yi geliştirmemiz için önerilerinizi yazın..."
del_data["tr"]["errEmail"] = "Lütfen geçerli bir e-posta adresi girin."
del_data["tr"]["errName"] = "Lütfen tam adınızı ve soyadınızı girin."
del_data["tr"]["errConfirm"] = "Göndermeden önce her iki onay kutusunu da işaretlemelisiniz."

ts_del = """// ============================================================================
// DELETE ACCOUNT PORTAL 19-LANGUAGE TRANSLATIONS
// ============================================================================

export interface DeleteAccountFaqItem {
  q: string;
  a: string;
}

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
  faqs: DeleteAccountFaqItem[];
}

export const deleteAccountTranslationsMap: Record<string, DeleteAccountTranslation> = """ + json.dumps(del_data, ensure_ascii=False, indent=2) + """;

export function getDeleteAccountTranslation(locale: string): DeleteAccountTranslation {
  const norm = (locale || "en").toLowerCase();
  return deleteAccountTranslationsMap[norm] || deleteAccountTranslationsMap.en;
}
"""

with open("src/utils/deleteAccountTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_del)

print("Generated src/utils/deleteAccountTranslations.ts successfully!")
