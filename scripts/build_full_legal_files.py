# -*- coding: utf-8 -*-
import json
import os
from build_full_terms_privacy_ts import LANGS, RTL_SET, terms_meta, TERMS_SECTIONS, TERMS_HIGHLIGHTS

# Build termsTranslations.ts dictionary
terms_dict = {}

for lang in LANGS:
    meta = terms_meta[lang]
    secs = TERMS_SECTIONS[lang]
    highs = TERMS_HIGHLIGHTS[lang]
    is_rtl = lang in RTL_SET

    # Construct sections list
    section_list = []
    for i, title in enumerate(secs):
        sid = ["agreement", "scope", "disclaimer", "affiliates", "accounts", "ip", "payments", "liability", "governing-law", "contact"][i]
        item = {"id": sid, "title": title}
        if sid == "disclaimer":
            item["isWarning"] = True
        elif sid == "affiliates":
            item["isHighlight"] = True
        section_list.append(item)

    # Localized text blocks for section 1 to 10
    terms_dict[lang] = {
        "isRtl": is_rtl,
        "badge": meta["badge"],
        "heroTitleLine1": meta["title1"],
        "heroTitleLine2": meta["title2"],
        "heroSub": meta["sub"],
        "entityLabel": meta["entity"],
        "regLabel": meta["reg"],
        "jurisdictionLabel": meta["jur"],
        "highlights": highs,
        "tocTitle": meta["tocTitle"],
        "tocCount": meta["tocCount"],
        "sections": section_list,
        "legalHelp": {
            "title": meta["legalTitle"],
            "desc": meta["legalDesc"],
            "btn": meta["legalBtn"]
        },
        "section1": {
            "secBadge": f"{meta['sec']} 1",
            "title": secs[0],
            "desc": meta["sub"],
            "opEntityLabel": meta["entity"].split(":")[0] if ":" in meta["entity"] else "Entity",
            "companyNumLabel": meta["reg"].split(":")[0] if ":" in meta["reg"] else "Reg",
            "hqLabel": "Headquarters" if lang == "en" else meta["entity"].split(":")[0],
            "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
        },
        "section2": {
            "secBadge": f"{meta['sec']} 2",
            "title": secs[1],
            "p1": highs[0]["desc"],
            "p2": meta["sub"]
        },
        "section3": {
            "secBadge": f"{meta['sec']} 3 • {meta['disc']}",
            "title": secs[2],
            "alert": highs[0]["desc"],
            "bullets": [
                highs[0]["desc"],
                meta["sub"],
                highs[1]["desc"]
            ]
        },
        "section4": {
            "secBadge": f"{meta['sec']} 4 • {meta['thirdParty']}",
            "title": secs[3],
            "badge": highs[1]["badge"],
            "p1": highs[1]["desc"],
            "rulesTitle": secs[3],
            "rulesBullets": [
                {"lead": highs[1]["badge"] + ":", "text": highs[1]["desc"]},
                {"lead": meta["thirdParty"] + ":", "text": meta["sub"]}
            ],
            "adTitle": "Google AdSense & Digital Advertising",
            "adBullets": [
                {"lead": "Display:", "text": highs[1]["desc"]},
                {"lead": "Compliance:", "text": meta["sub"]}
            ]
        },
        "section5": {
            "secBadge": f"{meta['sec']} 5",
            "title": secs[4],
            "p1": highs[3]["desc"],
            "rulesTitle": highs[3]["title"],
            "rulesDesc": highs[3]["desc"]
        },
        "section6": {
            "secBadge": f"{meta['sec']} 6",
            "title": secs[5],
            "p1": highs[2]["desc"],
            "p2": highs[2]["desc"]
        },
        "section7": {
            "secBadge": f"{meta['sec']} 7",
            "title": secs[6],
            "p1": meta["sub"],
            "policyTitle": secs[6],
            "policyDesc": meta["sub"]
        },
        "section8": {
            "secBadge": f"{meta['sec']} 8",
            "title": secs[7],
            "p1": meta["sub"],
            "p2": meta["sub"]
        },
        "section9": {
            "secBadge": f"{meta['sec']} 9",
            "title": secs[8],
            "p1": meta["jur"],
            "p2": meta["jur"]
        },
        "section10": {
            "secBadge": f"{meta['sec']} 10",
            "title": secs[9],
            "p1": meta["legalDesc"],
            "emailLabel": meta["legalTitle"],
            "btn": meta["legalBtn"],
            "relatedTitle": meta["related"],
            "privacyPolicy": meta["privacy"],
            "contactUs": meta["contact"],
            "deleteAccount": meta["delete"]
        }
    }

ts_terms_code = """// ============================================================================
// TERMS OF SERVICE TRANSLATIONS (19 OFFICIAL LANGUAGES)
// ============================================================================

export interface TermsSectionItem {
  id: string;
  title: string;
  isWarning?: boolean;
  isHighlight?: boolean;
}

export interface TermsHighlightItem {
  title: string;
  desc: string;
  badge: string;
}

export interface TermsTranslation {
  isRtl: boolean;
  badge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSub: string;
  entityLabel: string;
  regLabel: string;
  jurisdictionLabel: string;
  highlights: TermsHighlightItem[];
  tocTitle: string;
  tocCount: string;
  sections: TermsSectionItem[];
  legalHelp: {
    title: string;
    desc: string;
    btn: string;
  };
  section1: {
    secBadge: string;
    title: string;
    desc: string;
    opEntityLabel: string;
    companyNumLabel: string;
    hqLabel: string;
    hqValue: string;
  };
  section2: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section3: {
    secBadge: string;
    title: string;
    alert: string;
    bullets: string[];
  };
  section4: {
    secBadge: string;
    title: string;
    badge: string;
    p1: string;
    rulesTitle: string;
    rulesBullets: { lead: string; text: string }[];
    adTitle: string;
    adBullets: { lead: string; text: string }[];
  };
  section5: {
    secBadge: string;
    title: string;
    p1: string;
    rulesTitle: string;
    rulesDesc: string;
  };
  section6: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section7: {
    secBadge: string;
    title: string;
    p1: string;
    policyTitle: string;
    policyDesc: string;
  };
  section8: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section9: {
    secBadge: string;
    title: string;
    p1: string;
    p2: string;
  };
  section10: {
    secBadge: string;
    title: string;
    p1: string;
    emailLabel: string;
    btn: string;
    relatedTitle: string;
    privacyPolicy: string;
    contactUs: string;
    deleteAccount: string;
  };
}

export const termsTranslations: Record<string, TermsTranslation> = """ + json.dumps(terms_dict, ensure_ascii=False, indent=2) + """;

export function getTermsTranslation(locale: string): TermsTranslation {
  const norm = (locale || "en").toLowerCase();
  return termsTranslations[norm] || termsTranslations.en;
}
"""

with open("src/utils/termsTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_terms_code)

print("Generated src/utils/termsTranslations.ts successfully!")
