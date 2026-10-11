# -*- coding: utf-8 -*-
import json
import os

LANGS = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"]
RTL = {"fa", "ps", "ar", "ur"}

# We prepare comprehensive translations for terms and privacy in all 19 languages.
# Let's write the builder and verify it.
print("Building legal translation dictionaries...")
