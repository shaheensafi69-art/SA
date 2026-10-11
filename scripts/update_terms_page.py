# -*- coding: utf-8 -*-
with open("src/app/[locale]/terms/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace import
old_import = 'import { getPortalTranslation } from "@/utils/portalTranslations";'
new_import = '''import { getPortalTranslation } from "@/utils/portalTranslations";
import { getTermsTranslation } from "@/utils/termsTranslations";'''

content = content.replace(old_import, new_import, 1)

# Replace top hook setup
old_hook = '''  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", title: "1. Acceptance of Terms", icon: Scale },
    { id: "scope", title: "2. Nature of Services", icon: BookOpen },
    { id: "disclaimer", title: "3. No Legal/Tax Advice", icon: ShieldAlert, isWarning: true },
    { id: "affiliates", title: "4. Third-Party & Affiliates", icon: Share2, isHighlight: true },
    { id: "accounts", title: "5. Accounts & Gamification", icon: UserCheck },
    { id: "ip", title: "6. Intellectual Property", icon: Award },
    { id: "payments", title: "7. Payments & Subscriptions", icon: CreditCard },
    { id: "liability", title: "8. Limitation of Liability", icon: AlertCircle },
    { id: "governing-law", title: "9. Governing Law & Courts", icon: Gavel },
    { id: "contact", title: "10. Legal Inquiries", icon: Mail },
  ];

  const highlights = [
    {
      title: "Strictly Educational",
      desc: "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
      icon: ShieldAlert,
      badge: "Crucial Notice"
    },
    {
      title: "Affiliate Transparency",
      desc: "Disclosing independent referral partnerships with providers like Registered Agents Inc.",
      icon: Share2,
      badge: "FTC Compliant"
    },
    {
      title: "Protected Academy IP",
      desc: "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.",
      icon: Award,
      badge: "Protected Assets"
    },
    {
      title: "Fair Gamification",
      desc: "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.",
      icon: Sparkles,
      badge: "Ecosystem Rules"
    }
  ];'''

new_hook = '''  const t = getPortalTranslation(currentLocale);
  const tm = getTermsTranslation(currentLocale);
  const isRtl = tm.isRtl;
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", title: tm.sections[0].title, icon: Scale },
    { id: "scope", title: tm.sections[1].title, icon: BookOpen },
    { id: "disclaimer", title: tm.sections[2].title, icon: ShieldAlert, isWarning: true },
    { id: "affiliates", title: tm.sections[3].title, icon: Share2, isHighlight: true },
    { id: "accounts", title: tm.sections[4].title, icon: UserCheck },
    { id: "ip", title: tm.sections[5].title, icon: Award },
    { id: "payments", title: tm.sections[6].title, icon: CreditCard },
    { id: "liability", title: tm.sections[7].title, icon: AlertCircle },
    { id: "governing-law", title: tm.sections[8].title, icon: Gavel },
    { id: "contact", title: tm.sections[9].title, icon: Mail },
  ];

  const highlights = [
    {
      title: tm.highlights[0].title,
      desc: tm.highlights[0].desc,
      icon: ShieldAlert,
      badge: tm.highlights[0].badge
    },
    {
      title: tm.highlights[1].title,
      desc: tm.highlights[1].desc,
      icon: Share2,
      badge: tm.highlights[1].badge
    },
    {
      title: tm.highlights[2].title,
      desc: tm.highlights[2].desc,
      icon: Award,
      badge: tm.highlights[2].badge
    },
    {
      title: tm.highlights[3].title,
      desc: tm.highlights[3].desc,
      icon: Sparkles,
      badge: tm.highlights[3].badge
    }
  ];'''

content = content.replace(old_hook, new_hook, 1)

# Replace top hero elements
content = content.replace(
    '<Scale size={14} className="animate-pulse" /> Official Terms & User Agreement',
    '<Scale size={14} className="animate-pulse" /> {tm.badge}',
    1
)

content = content.replace(
'''            Terms of Service & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600">
              User Agreement
            </span>''',
'''            {tm.heroTitleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600">
              {tm.heroTitleLine2}
            </span>''',
    1
)

content = content.replace(
'''            These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.''',
'''            {tm.heroSub}''',
    1
)

content = content.replace(
'''            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">Entity: Safi International Capital LTD</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">Reg: 17063286 (UK)</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 font-medium">Jurisdiction: England & Wales</span>''',
'''            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">{tm.entityLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">{tm.regLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 font-medium">{tm.jurisdictionLabel}</span>''',
    1
)

# Replace TOC header
content = content.replace(
'''                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">{t.publicPages.navigationIndex}</span>
                <span className="text-[11px] font-mono text-neutral-500">{isRtl ? "۱۰ ماده حقوقی" : "10 Sections"}</span>''',
'''                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">{tm.tocTitle}</span>
                <span className="text-[11px] font-mono text-neutral-500">{tm.tocCount}</span>''',
    1
)

# Replace Legal Help Box
content = content.replace(
'''                <Gavel className="w-4 h-4 text-yellow-500" /> Need Legal Clarification?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.
              </p>
              <a
                href="mailto:contact@safiacademy.org"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-yellow-400 transition-colors"
              >
                <span>{t.publicPages.contactLegalDepartment}</span>''',
'''                <Gavel className="w-4 h-4 text-yellow-500" /> {tm.legalHelp.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {tm.legalHelp.desc}
              </p>
              <a
                href="mailto:contact@safiacademy.org"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-yellow-400 transition-colors"
              >
                <span>{tm.legalHelp.btn}</span>''',
    1
)

# Replace Section 1
content = content.replace(
'''                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 1</span>
                  <h2 className="text-2xl font-black text-white">Acceptance of Terms & Corporate Entity</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                These Terms of Service ("Terms") constitute a legally binding agreement entered into between you and <strong>Safi International Capital LTD</strong>, governing your use of the website, learning management tools, video masterclasses, and services offered under <strong>Safi Academy</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Operating Entity</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Company Number</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Official Headquarters</span>
                  <span className="text-neutral-300">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</span>
                </div>
              </div>''',
'''                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">{tm.section1.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section1.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {tm.section1.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.opEntityLabel}</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.companyNumLabel}</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{tm.section1.hqLabel}</span>
                  <span className="text-neutral-300">{tm.section1.hqValue}</span>
                </div>
              </div>''',
    1
)

# Replace Section 2
content = content.replace(
'''                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">Section 2</span>
                  <h2 className="text-2xl font-black text-white">Scope of Academy Services</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                Safi Academy is an online educational institution dedicated to teaching software development, global e-commerce, digital marketing, corporate setup basics, and technology careers.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Services provided include interactive lessons, video curriculum, student discussion forums, practice quizzes, gamification badges, and curated recommendations of external tools that assist founders with practical business execution.
              </p>''',
'''                  <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">{tm.section2.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section2.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                {tm.section2.p1}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {tm.section2.p2}
              </p>''',
    1
)

# Replace Section 3
content = content.replace(
'''                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider block">Section 3 • Essential Disclaimer</span>
                  <h2 className="text-2xl font-black text-white">No Legal, Tax, or Financial Advice</h2>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-red-500/20 text-xs md:text-sm text-neutral-300 space-y-3">
                <p className="font-bold text-white leading-relaxed">
                  Safi Academy and Safi International Capital LTD are strictly educational entities. We are NOT a law firm, licensed legal counsel, Certified Public Accountant (CPA) firm, financial broker, or licensed registered agent.
                </p>
                <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                  <li>Any training, templates, or articles addressing US LLCs, corporations, registered agent services, state filing requirements, or taxes are provided exclusively for general informational and educational illustration.</li>
                  <li>State laws, federal tax duties (including IRS filings and FinCEN Beneficial Ownership Information reports), and commercial regulations differ significantly across jurisdictions.</li>
                  <li>You are solely responsible for conducting due diligence and consulting licensed attorneys or certified financial accountants prior to forming an entity or signing binding agreements.</li>
                </ul>
              </div>''',
'''                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider block">{tm.section3.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{tm.section3.title}</h2>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-red-500/20 text-xs md:text-sm text-neutral-300 space-y-3">
                <p className="font-bold text-white leading-relaxed">
                  {tm.section3.alert}
                </p>
                <ul className="list-disc list-inside text-neutral-400 space-y-2 pl-2 text-xs leading-relaxed">
                  {tm.section3.bullets.map((bullet, bidx) => (
                    <li key={bidx}>{bullet}</li>
                  ))}
                </ul>
              </div>''',
    1
)

# Replace Section 10 footer links
content = content.replace(
'''                <div className="text-xs text-neutral-500 uppercase font-mono mb-1">Corporate Legal Email</div>
                  <div className="text-base font-bold text-white font-mono">contact@safiacademy.org</div>
                </div>
                <a
                  href="mailto:contact@safiacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Legal Team</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5 text-xs text-neutral-400">
                <span>Related Documents:</span>
                <Link href={`/${currentLocale}/privacy-policy`} className="text-amber-400 hover:underline font-bold">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/contact`} className="text-amber-400 hover:underline font-bold">
                  Contact Us
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/delete-account`} className="text-rose-400 hover:underline font-bold">
                  Account Deletion
                </Link>''',
'''                <div className="text-xs text-neutral-500 uppercase font-mono mb-1">{tm.section10.emailLabel}</div>
                  <div className="text-base font-bold text-white font-mono">contact@safiacademy.org</div>
                </div>
                <a
                  href="mailto:contact@safiacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{tm.section10.btn}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5 text-xs text-neutral-400">
                <span>{tm.section10.relatedTitle}</span>
                <Link href={`/${currentLocale}/privacy-policy`} className="text-amber-400 hover:underline font-bold">
                  {tm.section10.privacyPolicy}
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/contact`} className="text-amber-400 hover:underline font-bold">
                  {tm.section10.contactUs}
                </Link>
                <span>•</span>
                <Link href={`/${currentLocale}/delete-account`} className="text-rose-400 hover:underline font-bold">
                  {tm.section10.deleteAccount}
                </Link>''',
    1
)

with open("src/app/[locale]/terms/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Terms page updated successfully!")
