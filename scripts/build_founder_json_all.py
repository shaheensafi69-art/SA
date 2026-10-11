#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from data_common import LOCALES, COMMON
from data_shaheen import get_shaheen
from data_shirin import get_shirin
from data_mobin import get_mobin
from data_mujtaba import get_mujtaba
from data_sahel import get_sahel
from data_sections import get_shaheen_sections
from data_shaheen_full import get_shaheen_full_sections
from data_milestones_accreditations import get_shaheen_milestones_and_credentials
from data_shirin_full import get_shirin_full_sections
from data_all_founders_full import get_mobin_full, get_mujtaba_full, get_sahel_full
from data_remaining_founders import get_shirin_sections
from data_all_remaining_full import get_mobin_sections, get_mujtaba_sections, get_sahel_sections

OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'utils', 'translations', 'founder'))
os.makedirs(OUT_DIR, exist_ok=True)

for loc in LOCALES:
    c = {
        'backLink': COMMON['backLink'].get(loc, COMMON['backLink']['en']),
        'clickCopy': COMMON['clickCopy'].get(loc, COMMON['clickCopy']['en']),
        'copied': COMMON['copied'].get(loc, COMMON['copied']['en']),
        'directContact': COMMON['directContact'].get(loc, COMMON['directContact']['en']),
        'contactDesc': COMMON['contactDesc'].get(loc, COMMON['contactDesc']['en'])
    }
    
    sec = get_shaheen_sections(loc)
    
    sh = get_shaheen(loc)
    sh.update(c)
    sh.update(sec)
    sh.update(get_shaheen_full_sections(loc))
    sh.update(get_shaheen_milestones_and_credentials(loc))
    
    shr = get_shirin(loc)
    shr.update(c)
    shr.update(sec)
    shr.update(get_shirin_full_sections(loc))
    shr.update(get_shirin_sections(loc))
    
    mb = get_mobin(loc)
    mb.update(c)
    mb.update(sec)
    mb.update(get_mobin_full(loc))
    mb.update(get_mobin_sections(loc))
    
    mj = get_mujtaba(loc)
    mj.update(c)
    mj.update(sec)
    mj.update(get_mujtaba_full(loc))
    mj.update(get_mujtaba_sections(loc))
    
    sl = get_sahel(loc)
    sl.update(c)
    sl.update(sec)
    sl.update(get_sahel_full(loc))
    sl.update(get_sahel_sections(loc))
    
    founder_dict = {
        'common': c,
        'shaheenSafi': sh,
        'shirinGolAhmadi': shr,
        'mobinHassani': mb,
        'mujtabaRahmani': mj,
        'sahelSalem': sl
    }
    
    target_file = os.path.join(OUT_DIR, f"{loc}.json")
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(founder_dict, f, ensure_ascii=False, indent=2)
    print(f"Generated {target_file}")

print("All 19 founder locale JSON files generated successfully with rich sections for all 5 executives!")
