#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os

OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'utils', 'translations', 'founder'))
os.makedirs(OUT_DIR, exist_ok=True)

LOCALES = ['en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur', 'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id']

print("Builder started...")
