# -*- coding: utf-8 -*-
with open("src/app/[locale]/bank-account-service/page.tsx", "r", encoding="utf-8") as f:
    b = f.read()

# Replace hero elements
b = b.replace('{t.bankService?.badge || "Global Banking Infrastructure"}', '{bs.badge}')
b = b.replace('{t.bankService?.heroTitle || "Banking without borders."}', '{bs.heroTitle}')
b = b.replace(
'''            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mb-10">
              {t.bankService?.heroSubtitle ||
                "A premium international-account experience designed for people and businesses operating across currencies, countries and digital markets."}
            </p>''',
'''            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mb-10">
              {bs.heroSubtitle}
            </p>'''
)
b = b.replace('{t.bankService?.startApplication || "Start Application"}', '{bs.startApplication}')
b = b.replace('{t.bankService?.exploreProviders || "Explore Providers"}', '{bs.exploreProviders}')

# Replace architecture section
b = b.replace('{t.bankService?.archBadge || "01 / Architecture"}', '{bs.archBadge || "01 / Architecture"}')
b = b.replace('{t.bankService?.archTitle || "A financial interface built like a product, not a form."}', '{bs.archTitle || "A financial interface built like a product, not a form."}')
b = b.replace(
'''            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.bankService?.archSubtitle ||
                "Understand what each rail provides and prepare your dossier with precision."}
            </p>''',
'''            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {bs.archSubtitle}
            </p>'''
)

# Replace 4 hardcoded features
old_features_block = '''          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: Globe,
                title: "Multi-Currency Vault",
                desc: "Hold and convert major international currencies with real mid-market rates across 40+ countries without hidden fees."
              },
              {
                num: "02",
                icon: Building2,
                title: "Dedicated IBAN Rails",
                desc: "Receive dedicated local bank credentials in Europe (SEPA), United Kingdom (Faster Payments), and the US (ACH)."
              },
              {
                num: "03",
                icon: CreditCard,
                title: "Corporate & Virtual Cards",
                desc: "Issue virtual cards instantly for SaaS tools, cloud servers, and international advertising campaigns."
              },
              {
                num: "04",
                icon: ShieldCheck,
                title: "Strict Regulatory Safeguard",
                desc: "Customer funds are safeguarded in segregated accounts under UK FCA and European Central Bank regulations."
              }
            ].map((feature, idx) => ('''

new_features_block = '''          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(bs.features || [
              {
                num: "01",
                title: "Multi-Currency Vault",
                desc: "Hold and convert major international currencies with real mid-market rates across 40+ countries without hidden fees."
              },
              {
                num: "02",
                title: "Dedicated IBAN Rails",
                desc: "Receive dedicated local bank credentials in Europe (SEPA), United Kingdom (Faster Payments), and the US (ACH)."
              },
              {
                num: "03",
                title: "Corporate & Virtual Cards",
                desc: "Issue virtual cards instantly for SaaS tools, cloud servers, and international advertising campaigns."
              },
              {
                num: "04",
                title: "Strict Regulatory Safeguard",
                desc: "Customer funds are safeguarded in segregated accounts under UK FCA and European Central Bank regulations."
              }
            ]).map((feature, idx) => {
              const FeatureIcon = [Globe, Building2, CreditCard, ShieldCheck][idx % 4];
              return ('''

b = b.replace(old_features_block, new_features_block, 1)
# Also replace <feature.icon size={20} /> with <FeatureIcon size={20} />
b = b.replace('<feature.icon size={20} />', '<FeatureIcon size={20} />', 1)
# Close return
b = b.replace('            ))}</div>', '            );})}</div>', 1)

# Replace providers section
b = b.replace('{t.bankService?.providersBadge || "02 / Global Providers"}', '{bs.providersBadge}')
b = b.replace('{t.bankService?.providersTitle || "Know the rails behind the logo."}', '{bs.providersTitle}')
b = b.replace(
'''            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore the four flagship international banking and fintech ecosystems we support.
            </p>''',
'''            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {bs.providersSub}
            </p>'''
)

b = b.replace('Verified Capabilities & Rails:', '{bs.verifiedCapabilitiesLabel || "Verified Capabilities & Rails:"}')
b = b.replace(
'''                <span className="text-[11px] text-neutral-500 max-w-sm">
                  Full eligibility, jurisdictional availability, and pricing terms are confirmed during personal advisory onboarding.
                </span>''',
'''                <span className="text-[11px] text-neutral-500 max-w-sm">
                  {bs.termsDisclaimer}
                </span>'''
)
b = b.replace(
'Apply for {partners[activePartner].name}',
'{bs.applyForPartner || "Apply for"} {partners[activePartner].name}'
)

with open("src/app/[locale]/bank-account-service/page.tsx", "w", encoding="utf-8") as f:
    f.write(b)

print("Updated bank-account-service/page.tsx successfully!")
