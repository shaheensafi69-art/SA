# -*- coding: utf-8 -*-
"""
Reads current src/utils/aboutTranslations.ts and updates each language definition with the new fields.
"""
import re
import os
from data_about_full import (
    LOCALES, heroLine1, heroLine2, heroDesc, fullCertIncluded,
    institutionalStandard, leadershipBadge, executiveBoardTitle,
    executiveBoardDesc, readFullBio, executiveBoardBadge,
    eliteFaculty, facultyTitle, facultyDesc, explorePlatform,
    corporateGovTitle, corporateGovP1, corporateGovP2,
    corporateGovQuote, corporateGovAuthor, faqSubtitle,
    footerCtaDesc, enrollAsStudent, applyAsInstructor
)

TARGET = "/Users/Safi_Sahib/safi-academy/src/utils/aboutTranslations.ts"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update interface AboutTranslation
interface_fields = """  heroLine1: string;
  heroLine2: string;
  heroDesc: string;
  fullCertIncluded: string;
  institutionalStandard: string;
  leadershipBadge: string;
  executiveBoardTitle: string;
  executiveBoardDesc: string;
  readFullBio: string;
  executiveBoardBadge: string;
  eliteFaculty: string;
  facultyTitle: string;
  facultyDesc: string;
  explorePlatform: string;
  corporateGovTitle: string;
  corporateGovP1: string;
  corporateGovP2: string;
  corporateGovQuote: string;
  corporateGovAuthor: string;
  faqSubtitle: string;
  footerCtaDesc: string;
  enrollAsStudent: string;
  applyAsInstructor: string;
"""

if "heroLine1: string;" not in content:
    content = content.replace(
        "export interface AboutTranslation {",
        "export interface AboutTranslation {\n" + interface_fields
    )

def escape_str(s):
    return json_str(s)

def json_str(s):
    import json
    return json.dumps(s, ensure_ascii=False)

for loc in LOCALES:
    fields_to_add = f"""  heroLine1: {json_str(heroLine1[loc])},
  heroLine2: {json_str(heroLine2[loc])},
  heroDesc: {json_str(heroDesc[loc])},
  fullCertIncluded: {json_str(fullCertIncluded[loc])},
  institutionalStandard: {json_str(institutionalStandard[loc])},
  leadershipBadge: {json_str(leadershipBadge[loc])},
  executiveBoardTitle: {json_str(executiveBoardTitle[loc])},
  executiveBoardDesc: {json_str(executiveBoardDesc[loc])},
  readFullBio: {json_str(readFullBio[loc])},
  executiveBoardBadge: {json_str(executiveBoardBadge[loc])},
  eliteFaculty: {json_str(eliteFaculty[loc])},
  facultyTitle: {json_str(facultyTitle[loc])},
  facultyDesc: {json_str(facultyDesc[loc])},
  explorePlatform: {json_str(explorePlatform[loc])},
  corporateGovTitle: {json_str(corporateGovTitle[loc])},
  corporateGovP1: {json_str(corporateGovP1[loc])},
  corporateGovP2: {json_str(corporateGovP2[loc])},
  corporateGovQuote: {json_str(corporateGovQuote[loc])},
  corporateGovAuthor: {json_str(corporateGovAuthor[loc])},
  faqSubtitle: {json_str(faqSubtitle[loc])},
  footerCtaDesc: {json_str(footerCtaDesc[loc])},
  enrollAsStudent: {json_str(enrollAsStudent[loc])},
  applyAsInstructor: {json_str(applyAsInstructor[loc])},
"""
    # Find const {loc}: AboutTranslation = {
    pattern = rf"(const {loc}:\s*AboutTranslation\s*=\s*\{{)"
    if re.search(pattern, content):
        content = re.sub(pattern, rf"\1\n{fields_to_add}", content)
    else:
        print(f"Warning: pattern not matched for {loc}")

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("src/utils/aboutTranslations.ts updated successfully with all 19 language properties!")
