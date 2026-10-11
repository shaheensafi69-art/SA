# -*- coding: utf-8 -*-
with open("src/app/[locale]/privacy-policy/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace import
old_import = 'import { getPortalTranslation } from "@/utils/portalTranslations";'
new_import = '''import { getPortalTranslation } from "@/utils/portalTranslations";
import { getPrivacyTranslation } from "@/utils/privacyTranslations";'''

content = content.replace(old_import, new_import, 1)

# Replace hook and state setup
old_hook = '''  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  const [activeSection, setActiveSection] = useState("controller");

  const sections = [
    { id: "controller", title: "1. Data Controller", icon: Building2 },
    { id: "collection", title: "2. Information We Collect", icon: Eye },
    { id: "affiliates", title: "3. Affiliates & Third Parties", icon: Share2, isHighlight: true },
    { id: "usage", title: "4. How We Use Data", icon: Server },
    { id: "cookies", title: "5. Cookies & Tracking", icon: Cookie },
    { id: "security", title: "6. Security & Storage", icon: Lock },
    { id: "rights", title: "7. Your Legal Rights", icon: Scale },
    { id: "contact", title: "8. Privacy Inquiries", icon: Mail },
  ];

  const highlights = [
    {
      title: "Zero Data Selling",
      desc: "We strictly never sell or rent your personal information to third-party data brokers.",
      icon: ShieldCheck,
      color: "emerald"
    },
    {
      title: "Affiliate Transparency",
      desc: "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
      icon: Share2,
      color: "amber"
    },
    {
      title: "Enterprise Encryption",
      desc: "End-to-end TLS/SSL encryption across all academy courses, credentials, and data.",
      icon: Lock,
      color: "blue"
    },
    {
      title: "Full GDPR Control",
      desc: "Unrestricted rights to access, rectify, port, or erase your account data at any time.",
      icon: UserCheck,
      color: "purple"
    }
  ];'''

new_hook = '''  const t = getPortalTranslation(currentLocale);
  const pm = getPrivacyTranslation(currentLocale);
  const isRtl = pm.isRtl;
  const [activeSection, setActiveSection] = useState("controller");

  const sections = [
    { id: "controller", title: pm.sections[0].title, icon: Building2 },
    { id: "collection", title: pm.sections[1].title, icon: Eye },
    { id: "affiliates", title: pm.sections[2].title, icon: Share2, isHighlight: true },
    { id: "usage", title: pm.sections[3].title, icon: Server },
    { id: "cookies", title: pm.sections[4].title, icon: Cookie },
    { id: "security", title: pm.sections[5].title, icon: Lock },
    { id: "rights", title: pm.sections[6].title, icon: Scale },
    { id: "contact", title: pm.sections[7].title, icon: Mail },
  ];

  const highlights = [
    {
      title: pm.highlights[0].title,
      desc: pm.highlights[0].desc,
      icon: ShieldCheck,
      color: "emerald"
    },
    {
      title: pm.highlights[1].title,
      desc: pm.highlights[1].desc,
      icon: Share2,
      color: "amber"
    },
    {
      title: pm.highlights[2].title,
      desc: pm.highlights[2].desc,
      icon: Lock,
      color: "blue"
    },
    {
      title: pm.highlights[3].title,
      desc: pm.highlights[3].desc,
      icon: UserCheck,
      color: "purple"
    }
  ];'''

content = content.replace(old_hook, new_hook, 1)

# Replace Top Hero Banner Badge and Title
content = content.replace(
    '<Shield size={14} className="animate-pulse" /> Official Data Charter & Privacy Policy',
    '<Shield size={14} className="animate-pulse" /> {pm.badge}',
    1
)

content = content.replace(
'''            Your Privacy & Data <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Are Fully Protected
            </span>''',
'''            {pm.heroTitleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              {pm.heroTitleLine2}
            </span>''',
    1
)

# Replace Subtitle (previously had binary ternary!)
old_sub = '''            {isRtl
              ? "آکادمی صافی تحت بالاترین استانداردهای یکپارچگی داده‌ها و انطباق با قوانین حریم خصوصی فعالیت می‌کند. در این بخش با نحوه پردازش و امنیت داده‌های شما در Safi International Capital LTD آشنا می‌شوید."
              : "Safi Academy operates under the highest standards of data integrity and regulatory compliance. Learn how Safi International Capital LTD processes, secures, and honors your personal data."}'''

content = content.replace(old_sub, '            {pm.heroSub}', 1)

# Replace Metadata Pill Bar
content = content.replace(
'''            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">Entity: Safi International Capital LTD</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">Reg: 17063286 (UK)</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium">UK GDPR & DPA 2018</span>''',
'''            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white">{pm.entityLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">{pm.regLabel}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium">{pm.lawLabel}</span>''',
    1
)

# Replace highlights badge
content = content.replace(
    '{isRtl ? "استاندارد تضمین‌شده" : "Guaranteed Standard"}',
    '{pm.highlights[0].badge}',
    1
)

# Replace TOC
content = content.replace(
'''                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t.publicPages.navigationIndex}</span>
                <span className="text-[11px] font-mono text-neutral-500">{isRtl ? "۸ بخش قانونی" : "8 Sections"}</span>''',
'''                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{pm.tocTitle}</span>
                <span className="text-[11px] font-mono text-neutral-500">{pm.tocCount}</span>''',
    1
)

# Replace Sidebar Contact Support Box
content = content.replace(
'''                <Mail className="w-4 h-4 text-emerald-400" /> Have Data Questions?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Reach our designated compliance officer for GDPR access, data modification, or third-party inquiries.
              </p>
              <a
                href="mailto:contact@safiacademy.org"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-emerald-400 transition-colors"
              >
                <span>{t.publicPages.emailPrivacyTeam}</span>''',
'''                <Mail className="w-4 h-4 text-emerald-400" /> {pm.legalHelp.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {pm.legalHelp.desc}
              </p>
              <a
                href="mailto:contact@safiacademy.org"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-emerald-400 transition-colors"
              >
                <span>{pm.legalHelp.btn}</span>''',
    1
)

# Replace Section 1
content = content.replace(
'''                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Section 1</span>
                  <h2 className="text-2xl font-black text-white">Data Controller & Operating Entity</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Safi Academy is operated by <strong>Safi International Capital LTD</strong>, a corporation officially registered and governed under the laws of England and Wales. We act as the primary data controller for all personal information collected through our educational platform.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Legal Entity</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Company Number</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">Headquarters Address</span>
                  <span className="text-neutral-300">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</span>
                </div>
              </div>''',
'''                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">{pm.section1.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{pm.section1.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {pm.section1.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{pm.section1.legalEntityLabel}</span>
                  <strong className="text-white text-sm">Safi International Capital LTD</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{pm.section1.companyNumLabel}</span>
                  <strong className="text-white text-sm font-mono">17063286 (UK)</strong>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <span className="text-neutral-500 block mb-1 font-mono uppercase text-[10px]">{pm.section1.hqLabel}</span>
                  <span className="text-neutral-300">{pm.section1.hqValue}</span>
                </div>
              </div>''',
    1
)

# Replace Section 2 title and desc
content = content.replace(
'''                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Section 2</span>
                  <h2 className="text-2xl font-black text-white">Categories of Information We Collect</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                We only gather data necessary to provide seamless course experiences, secure authentication, and verified educational credentials.
              </p>''',
'''                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">{pm.section2.secBadge}</span>
                  <h2 className="text-2xl font-black text-white">{pm.section2.title}</h2>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {pm.section2.desc}
              </p>''',
    1
)

# Replace Section 7 account deletion button label
content = content.replace(
'''                    <p className="text-xs font-bold text-white">Need to permanently delete your account & erase your data?</p>
                    <p className="text-[11px] text-neutral-400">Access our official self-service App Store & GDPR Account Deletion Gateway.</p>
                  </div>
                </div>
                <Link
                  href={`/${currentLocale}/delete-account`}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <span>Delete Account</span>''',
'''                    <p className="text-xs font-bold text-white">{pm.section7.deletionBox.title}</p>
                    <p className="text-[11px] text-neutral-400">{pm.section7.deletionBox.sub}</p>
                  </div>
                </div>
                <Link
                  href={`/${currentLocale}/delete-account`}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <span>{pm.section7.deletionBox.btn}</span>''',
    1
)

# Replace Section 8 button and channel label
content = content.replace(
'''                <div>
                  <div className="text-xs text-neutral-500 uppercase font-mono mb-1">Direct Support Channel</div>
                  <div className="text-base font-bold text-white font-mono">contact@safiacademy.org</div>
                </div>
                <a
                  href="mailto:contact@safiacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Inquiries</span>''',
'''                <div>
                  <div className="text-xs text-neutral-500 uppercase font-mono mb-1">{pm.section8.emailLabel}</div>
                  <div className="text-base font-bold text-white font-mono">contact@safiacademy.org</div>
                </div>
                <a
                  href="mailto:contact@safiacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{pm.section8.btn}</span>''',
    1
)

with open("src/app/[locale]/privacy-policy/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Privacy page updated successfully!")
