# -*- coding: utf-8 -*-
with open("src/app/[locale]/delete-account/page.tsx", "r", encoding="utf-8") as f:
    d = f.read()

replacements = [
    ('setErrorMessage(isRtl ? "لطفاً یک آدرس ایمیل معتبر وارد کنید." : "Please enter a valid registered email address.");', 'setErrorMessage(da.errEmail);'),
    ('setErrorMessage(isRtl ? "لطفاً نام و نام خانوادگی کامل خود را وارد کنید." : "Please provide your full registered name.");', 'setErrorMessage(da.errName);'),
    ('setErrorMessage(isRtl ? "باید هر دو گزینه تأیید را قبل از ارسال تیک بزنید." : "You must check both confirmation boxes before submitting.");', 'setErrorMessage(da.errConfirm);'),
    ('{isRtl ? "بازگشت به صفحه اصلی" : "Back to Homepage"}', '{da.backHome}'),
    ('{isRtl ? "تایید شده مطابق با UK GDPR و استانداردهای اپ استور" : "UK GDPR & App Store Certified"}', '{da.certifiedBadge}'),
    ('{isRtl ? "ثبت آنلاین درخواست امحای حساب کاربری" : "Online Account Erasure Request"}', '{da.onlineRequestBadge}'),
    ('{isRtl ? "مراحل بعدی چیست:" : "What happens next:"}', '{da.whatNext}'),
    ('{isRtl ? "ثبت درخواست دیگر" : "Submit Another Request"}', '{da.submitAnother}'),
    ('placeholder={isRtl ? "مثال: احمد شاه" : "e.g. Ahmad Shah"}', 'placeholder={da.namePlaceholder}'),
    ('({isRtl ? "اختیاری" : "Optional"})', '({da.optionalLabel})'),
    ('<option value="leaving">{isRtl ? "به اهداف آموزشی خود رسیده‌ام" : "I have completed my academic goals"}</option>', '<option value="leaving">{da.reasonGoal}</option>'),
    ('<option value="privacy">{isRtl ? "ملاحظات مربوط به حریم خصوصی" : "Privacy / Data Sovereignty considerations"}</option>', '<option value="privacy">{da.reasonPrivacy}</option>'),
    ('<option value="duplicate">{isRtl ? "حساب کاربری تکراری دارم" : "I have a duplicate or secondary account"}</option>', '<option value="duplicate">{da.reasonDuplicate}</option>'),
    ('<option value="app_issues">{isRtl ? "مشکلات فنی با اپلیکیشن" : "Technical difficulties with the mobile application"}</option>', '<option value="app_issues">{da.reasonAppIssues}</option>'),
    ('<option value="other">{isRtl ? "دلایل دیگر (در کادر زیر بنویسید)" : "Other reason (Please specify below)"}</option>', '<option value="other">{da.reasonOther}</option>'),
    ('placeholder={isRtl ? "نظرات و پیشنهادات خود را برای بهبود آکادمی با ما در میان بگذارید..." : "Tell us how we can improve Safi Academy or provide specific data erasure notes..."}', 'placeholder={da.feedbackPlaceholder}')
]

for old, new in replacements:
    if old in d:
        d = d.replace(old, new)
    else:
        print("Note: didn't match in delete-account:", old[:30])

# Replace hardcoded faqs array
old_faqs = '''  const faqs = [
    {
      q: "What happens to my enrolled courses and educational certificates?",
      a: "Upon account deletion, all active course enrollments, lecture progress, quiz submissions, and personal certificates in your portal will be permanently removed. If you require proof of your past achievements, we strongly urge you to download and save all your cryptographic PDF certificates and transcripts BEFORE initiating deletion. Cryptographic hashes stored on our public blockchain ledger for third-party employer verification will have all your personal identifiers (PII) stripped and redacted."
    },
    {
      q: "Can I cancel my account deletion request during the cooling-off period?",
      a: "Yes. You have a mandatory 30-calendar-day window during which you can reverse this action. Simply log back into your Safi Academy account or send an email to contact@safiacademy.org requesting cancellation before the 30 days expire."
    },
    {
      q: "Will my past invoices and accounting records be purged immediately?",
      a: "Under UK corporate law and HMRC regulations, financial and tax records (such as VAT transaction invoices and Stripe payment IDs) must be retained for up to 6 years for legal auditing. However, these records are decoupled from your active student credentials and archived securely."
    },
    {
      q: "What happens to my contributions in student discussion forums?",
      a: "Your forum posts, code snippets, and public questions will have your name, avatar, and personal identifiers permanently removed. They will appear as 'Deleted User' to maintain curriculum thread continuity for other learners without compromising your privacy."
    }
  ];'''

new_faqs = '''  const faqs = da.faqs;'''

d = d.replace(old_faqs, new_faqs, 1)

with open("src/app/[locale]/delete-account/page.tsx", "w", encoding="utf-8") as f:
    f.write(d)

print("Updated delete-account/page.tsx successfully!")
