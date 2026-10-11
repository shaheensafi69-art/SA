# -*- coding: utf-8 -*-
# scripts/data_sections.py

def get_shaheen_sections(loc):
    # Portfolio titles & badges
    portfolioBadges = {
        'en': "Corporate Portfolio", 'fa': "پورتفولیوی شرکتی", 'ps': "کارپوریټ پورتفولیو",
        'ru': "Корпоративное портфолио", 'tr': "Kurumsal Portföy", 'de': "Unternehmensportfolio",
        'fr': "Portefeuille d'Entreprise", 'ar': "المحفظة المؤسسية", 'ur': "کارپوریٹ پورٹ فولیو",
        'es': "Portafolio Corporativo", 'zh': "企业投资组合", 'hi': "कॉर्पोरेट पोर्टफोलियो",
        'it': "Portfolio Aziendale", 'pt': "Portfólio Corporativo", 'ja': "企業ポートフォリオ",
        'ko': "기업 포트폴리오", 'nl': "Bedrijfsportfolio", 'uz': "Korporativ portfel", 'id': "Portofolio Korporat"
    }
    portfolioTitles = {
        'en': "The Safi Global Enterprise", 'fa': "اکوسیستم جهانی صافی", 'ps': "د صافي نړیوال تشبث",
        'ru': "Глобальное предприятие Safi", 'tr': "Safi Küresel Girişimi", 'de': "Das globale Safi-Unternehmen",
        'fr': "L'Entreprise Mondiale Safi", 'ar': "مؤسسة صافي العالمية", 'ur': "صافی گلوبل انٹرپرائز",
        'es': "La Empresa Global Safi", 'zh': "萨菲全球企业帝国", 'hi': "सफी ग्लोबल एंटरप्राइज",
        'it': "L'Impresa Globale Safi", 'pt': "A Empresa Global Safi", 'ja': "サフィ・グローバル・エンタープライズ",
        'ko': "사피 글로벌 엔터프라이즈", 'nl': "De Wereldwijde Safi Onderneming", 'uz': "Safiy global korxonasi", 'id': "Perusahaan Global Safi"
    }

    # Tech Stack
    techBadges = {
        'en': "System Engineering", 'fa': "مهندسی سیستم‌ها", 'ps': "د سیسټمونو انجنیري",
        'ru': "Системная инженерия", 'tr': "Sistem Mühendisliği", 'de': "Systemtechnik",
        'fr': "Ingénierie des Systèmes", 'ar': "هندسة النظم", 'ur': "سسٹم انجینئرنگ",
        'es': "Ingeniería de Sistemas", 'zh': "系统工程", 'hi': "सिस्टम इंजीनियरिंग",
        'it': "Ingegneria dei Sistemi", 'pt': "Engenharia de Sistemas", 'ja': "システムエンジニアリング",
        'ko': "시스템 엔지니어링", 'nl': "Systeemtechniek", 'uz': "Tizim muhandisligi", 'id': "Rekayasa Sistem"
    }
    techTitles = {
        'en': "Core Technical Stack", 'fa': "استک فنی و هسته معماری", 'ps': "اصلي تخنیکي سټیک",
        'ru': "Основной технологический стек", 'tr': "Temel Teknik Yığın", 'de': "Technologischer Kern-Stack",
        'fr': "Stack Technique Principal", 'ar': "حزمة التقنيات الأساسية", 'ur': "بنیادی تکنیکی اسٹیک",
        'es': "Stack Técnico Principal", 'zh': "核心技术架构栈", 'hi': "कोर तकनीकी स्टैक",
        'it': "Stack Tecnico Principale", 'pt': "Stack Técnico Principal", 'ja': "コア技術スタック",
        'ko': "핵심 기술 스택", 'nl': "Kern Technische Stack", 'uz': "Asosiy texnik to'plam", 'id': "Stack Teknis Inti"
    }

    # Milestones
    milestoneBadges = {
        'en': "Executive Milestones", 'fa': "دستاوردهای اجرایی و مدیریتی", 'ps': "اجرایوي پړاوونه او لاسته راوړنې",
        'ru': "Исполнительные вехи", 'tr': "Yönetici Aşamaları", 'de': "Führungsetappen",
        'fr': "Jalons Exécutifs", 'ar': "المحطات التنفيذية", 'ur': "ایگزیکٹو سنگ میل",
        'es': "Hitos Ejecutivos", 'zh': "执行里程碑", 'hi': "कार्यकारी मील के पत्थर",
        'it': "Tappe Esecutive", 'pt': "Marcos Executivos", 'ja': "エグゼクティブ・マイルストーン",
        'ko': "경영 주요 이력", 'nl': "Uitvoerende Mijlpalen", 'uz': "Ijroiya bosqichlari", 'id': "Tonggak Eksekutif"
    }

    # Pedigree
    pedigreeBadges = {
        'en': "Academic Pedigree", 'fa': "سوابق علمی و مدارک بین‌المللی", 'ps': "علمي سوابق او نړیوال سندونه",
        'ru': "Академическая квалификация", 'tr': "Akademik Geçmiş", 'de': "Akademischer Werdegang",
        'fr': "Parcours Académique", 'ar': "المؤهلات الأكاديمية", 'ur': "تعلیمی پس منظر",
        'es': "Pedigrí Académico", 'zh': "学术背景与资质", 'hi': "शैक्षणिक पृष्ठभूमि",
        'it': "Pedigree Accademico", 'pt': "Percurso Académico", 'ja': "学術的経歴と資格",
        'ko': "학업 및 전문 자격", 'nl': "Academische Achtergrond", 'uz': "Akademik malaka", 'id': "Kualifikasi Akademik"
    }

    # Languages
    languageBadges = {
        'en': "Linguistic Fluency", 'fa': "تسلط بر زبان‌های بین‌المللی", 'ps': "په ژبو برلاسی",
        'ru': "Владение языками", 'tr': "Dil Yetkinliği", 'de': "Sprachkenntnisse",
        'fr': "Compétences Linguistiques", 'ar': "الطلاقة اللغوية", 'ur': "لسانی مہارت",
        'es': "Fluidez Lingüística", 'zh': "多语言能力", 'hi': "भाषाई प्रवाह",
        'it': "Competenze Linguistiche", 'pt': "Fluência Linguística", 'ja': "語学力",
        'ko': "구사 가능 언어", 'nl': "Taalvaardigheid", 'uz': "Til bilish darajasi", 'id': "Kemampuan Bahasa"
    }

    return {
        'portfolioBadge': portfolioBadges.get(loc, portfolioBadges['en']),
        'portfolioTitle': portfolioTitles.get(loc, portfolioTitles['en']),
        'techBadge': techBadges.get(loc, techBadges['en']),
        'techTitle': techTitles.get(loc, techTitles['en']),
        'milestonesBadge': milestoneBadges.get(loc, milestoneBadges['en']),
        'pedigreeBadge': pedigreeBadges.get(loc, pedigreeBadges['en']),
        'languagesBadge': languageBadges.get(loc, languageBadges['en']),
    }
