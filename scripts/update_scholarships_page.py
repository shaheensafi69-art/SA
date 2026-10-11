# -*- coding: utf-8 -*-
with open("src/app/[locale]/scholarships/page.tsx", "r", encoding="utf-8") as f:
    s = f.read()

# Add import
old_import = 'import { getPortalTranslation } from "@/utils/portalTranslations";'
new_import = '''import { getPortalTranslation } from "@/utils/portalTranslations";
import { getScholarshipTranslation } from "@/utils/scholarshipTranslations";'''

s = s.replace(old_import, new_import, 1)

# Hook call
old_hook = '  const isRtl = t.isRtl;'
new_hook = '''  const isRtl = t.isRtl;
  const st = getScholarshipTranslation(currentLocale);'''

s = s.replace(old_hook, new_hook, 1)

# Replacements in checklist
replacements = [
    ('{isRtl ? "ویرایش و بازنویسی تخصصی انگیزه‌نامه (SOP)" : "Motivation Letter (SOP) Surgery"}', '{st.sopTitle}'),
    ('{isRtl ? "بررسی کلمه به کلمه ساختار روایی، هدف شغلی و تطابق با معیارهای پذیرش دانشگاه." : "We analyze your narrative arc, hook, career objectives, and university alignment word-by-word."}', '{st.sopDesc}'),
    ('{isRtl ? "بهینه‌سازی رزومه مطابق استانداردهای یوروپس و ATS آمریکا" : "Europass & US ATS CV Optimization"}', '{st.cvTitle}'),
    ('{isRtl ? "فرمت‌بندی دستاوردها، مقالات پژوهشی و سوابق علمی بر اساس استانداردهای کمیته‌های بین‌المللی." : "Format your achievements, research publications, and leadership milestones according to international committee standards."}', '{st.cvDesc}'),
    ('{isRtl ? "شبیه‌سازی مصاحبه و دفاعیه با برندگان قبلی بورسیه" : "Mock Interview & Defense Panels"}', '{st.mockTitle}'),
    ('{isRtl ? "تمرین با برندگان بورسیه از دانشگاه‌های آکسفورد و مونیخ جهت تسلط بر سوالات علمی و رفتاری." : "Practice with past scholarship winners from Oxford, TUM Germany, and Tokyo Tech to master behavioral and academic interview questions."}', '{st.mockDesc}'),
    ('{isRtl ? "ارتباط با منتورهای پذیرش تحصیلی" : "Connect With Application Mentors"}', '{st.connectBtn}'),
    ('{isRtl ? "چک‌لیست آمادگی و مدارک پذیرش" : "Application Readiness Dossier"}', '{st.dossierTitle}'),
    ('{isRtl ? "استاندارد مدارک الزامی جهت ارسال به دانشگاه‌ها و بورسیه‌های بین‌المللی" : "Standard requirements for competitive global applications"}', '{st.dossierSub}'),
    ('{isRtl ? "الگوی تایید شده" : "Verified Matrix"}', '{st.verifiedMatrix}'),
    ('{isRtl ? "۱. ریز نمرات رسمی و دانشنامه تحصیلی" : "1. Official Transcripts & Degree Certificates"}', '{st.checkTranscripts}'),
    ('<span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> {isRtl ? "الزامی" : "Required"}</span>', '<span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> {st.checkTranscriptsBadge}</span>'),
    ('{isRtl ? "۲. انگیزه‌نامه هدفمند (SOP / Motivation)" : "2. Statement of Purpose (SOP / Motivation)"}', '{st.checkSop}'),
    ('{isRtl ? "حیاتی" : "Crucial"}', '{st.checkSopBadge}'),
    ('{isRtl ? "۳. توصیه‌نامه‌های آکادمیک (۲ الی ۳ مورد)" : "3. Academic Letters of Recommendation (2-3)"}', '{st.checkLetters}'),
    ('{isRtl ? "۴. مدرک زبان (آیلتس، تافل یا گواهی MOI)" : "4. English Proficiency (IELTS / TOEFL / MOI)"}', '{st.checkLanguage}'),
    ('{isRtl ? "قابل معافیت" : "Waiverable"}', '{st.checkLanguageBadge}'),
    ('{isRtl ? "۵. رزومه تحصیلی مطابق استاندارد ATS" : "5. Detailed Academic CV / Resume (ATS Standard)"}', '{st.checkCv}'),
    ('{isRtl ? "۶. پروپوزال پژوهشی (ویژه مقاطع ارشد و دکتری)" : "6. Research Proposal (Masters by Research & PhD)"}', '{st.checkProposal}'),
    ('{isRtl ? "بسته به رشته" : "Program Specific"}', '{st.checkProposalBadge}'),
    ('{isRtl ? <>نکته کلیدی: بسیاری از دانشگاه‌های اروپایی در صورت گذراندن مقطع قبلی به زبان انگلیسی، <strong>گواهی زبان تدریس (MOI)</strong> را به جای آیلتس می‌پذیرند.</> : <>Tip: Many European universities accept an <strong>English Medium of Instruction (MOI) Certificate</strong> instead of IELTS if your previous degree was in English.</>}', '{st.tipText}'),
    ('<HelpCircle size={14} /> Clarifications & Guidance', '<HelpCircle size={14} /> {st.faqBadge}'),
    ('Frequently Asked Questions\n            </h2>', '{st.faqTitle}\n            </h2>'),
    ('Everything you need to know about international scholarship applications, deadlines, English proficiency, and Safi Academy mentorship.', '{st.faqSub}')
]

# Note: for remaining {isRtl ? "الزامی" : "Required"}
s = s.replace(
    '<span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> {isRtl ? "الزامی" : "Required"}</span>',
    '<span className="text-emerald-400 font-black flex items-center gap-1"><Check size={14} /> {st.checkTranscriptsBadge}</span>'
)

for old, new in replacements:
    if old in s:
        s = s.replace(old, new)
    else:
        print("Note: didn't match:", old[:30])

# Update FAQs loop
old_faq_block = '''          <div className="space-y-4">
            {[
              {
                q: "Can I apply for global scholarships without an IELTS or TOEFL score?",
                a: "Yes, in many cases! Hundreds of universities across Germany, France, Italy, Hungary, China, and Malaysia accept an English Medium of Instruction (MOI) letter from your previous university. Furthermore, prestigious scholarships like the DAAD or Turkiye Burslari frequently offer language prep years or accept Duolingo English Test (DET) scores."
              },
              {
                q: "Does Safi Academy charge any fee for scholarship listings or mentorship?",
                a: "Absolutely not. Safi Academy is a non-profit humanitarian and educational initiative. Our scholarship database, document review guides, application webinars, and community mentorship are 100% free of charge for all students."
              },
              {
                q: "Are high school graduates eligible for fully-funded Bachelor degrees abroad?",
                a: "Yes. Major international government grants such as the Turkiye Burslari, MEXT Undergraduate, Chinese Government Scholarship (CSC), Romanian Government Grant, and various Korean GKS programs offer full funding for Bachelor students, including language training and living allowances."
              },
              {
                q: "How early should I begin preparing my scholarship documents?",
                a: "We strongly recommend beginning 6 to 9 months before the target university deadline. Document translation, notarization, writing your motivation letter, and requesting recommendations from university professors typically take between 60 to 90 days."
              },
              {
                q: "Can Afghan students facing visa restrictions still secure international scholarships?",
                a: "Yes. Despite consular closures in Kabul, thousands of Afghan scholars successfully process their student visas through neighboring hubs like Islamabad, Tehran, New Delhi, or Dubai. Numerous European and North American universities offer official sponsorship letters and visa expedition assistance for enrolled scholars."
              },
              {
                q: "What makes an application stand out to scholarship selection committees?",
                a: "Beyond solid grades, committees prioritize purposeful commitment: clearly articulating how your studies will solve real-world problems in your home country, demonstrable leadership or volunteer experience, and genuine familiarity with the specific curriculum of the host university."
              }
            ].map((faq, idx) => ('''

new_faq_block = '''          <div className="space-y-4">
            {st.faqs.map((faq, idx) => ('''

s = s.replace(old_faq_block, new_faq_block, 1)

with open("src/app/[locale]/scholarships/page.tsx", "w", encoding="utf-8") as f:
    f.write(s)

print("Updated scholarships/page.tsx successfully!")
