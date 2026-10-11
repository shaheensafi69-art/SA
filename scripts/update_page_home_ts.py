# -*- coding: utf-8 -*-
"""
Update src/app/[locale]/page.tsx:
1. Add missing 10 languages to partnerDescriptions and appMenuItemsData
2. Import getFounderLocaleData and bind leadershipTeam names/roles to fDict
"""
import re

TARGET = "/Users/Safi_Sahib/safi-academy/src/app/[locale]/page.tsx"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Ensure import of getFounderLocaleData
if "getFounderLocaleData" not in content:
    content = content.replace(
        'import { getDictionary, isRtlLocale } from "@/dictionaries";',
        'import { getDictionary, isRtlLocale } from "@/dictionaries";\nimport { getFounderLocaleData } from "@/utils/founderTranslations";'
    )

# 2. Add 10 missing languages to partnerDescriptions
partner_extra = """,
  es: {
    aws: "Infraestructura en la nube y créditos de cómputo para estudiantes",
    ms: "Planes de estudio para desarrolladores empresariales y Azure Labs",
    google: "Fundamentos de IA y marcos de agentes autónomos",
    gates: "Educación humanitaria e inclusión global",
    comptia: "Estándares de ciberseguridad e ingeniería de sistemas",
    pmi: "Liderazgo ágil y gobernanza global",
    credly: "Verificación criptográfica de credenciales a prueba de manipulaciones",
    accredible: "Verificación académica en registro de blockchain",
    badgecert: "Protocolo de integridad de certificaciones institucionales",
    nefe: "Educación financiera y gestión de riesgos"
  },
  zh: {
    aws: "全球云基础设施与学员计算资源配额支持",
    ms: "企业级前沿开发者培养体系与Azure实战沙盒",
    google: "人工智能基石与自主智能体（Agent）框架",
    gates: "人道主义普惠教育与全球数字公平",
    comptia: "网络安全防御与系统工程国际通用标准",
    pmi: "敏捷项目管理与跨国企业治理框架",
    credly: "防篡改加密数字学位与技能认证查验",
    accredible: "基于不可篡改区块链账本的学业成果链上存证",
    badgecert: "国际权威机构学术证书完整性验证协议",
    nefe: "高阶财商认知体系与全流程风险管控体系"
  },
  hi: {
    aws: "क्लाउड इन्फ्रास्ट्रक्चर और छात्र कंप्यूट क्रेडिट",
    ms: "एंटरप्राइज डेवलपर पाठ्यक्रम और एज़्योर लैब्स",
    google: "एआई अनिवार्यताएं और स्वायत्त एजेंटिक फ्रेमवर्क",
    gates: "मानवीय शिक्षा और वैश्विक समावेशन",
    comptia: "साइबर सुरक्षा और सिस्टम इंजीनियरिंग मानक",
    pmi: "एजाइल नेतृत्व और वैश्विक शासन",
    credly: "क्रिप्टोग्राफिक छेड़छाड़-रोधी क्रेडेंशियल सत्यापन",
    accredible: "ब्लॉकचेन लेज़र शैक्षणिक सत्यापन",
    badgecert: "संस्थागत प्रमाणन अखंडता प्रोटोकॉल",
    nefe: "वित्तीय साक्षरता और जोखिम प्रबंधन शासन"
  },
  it: {
    aws: "Infrastruttura Cloud e crediti di calcolo per studenti",
    ms: "Curriculum per sviluppatori aziendali e laboratori Azure",
    google: "Fondamenti di IA e framework per agenti autonomi",
    gates: "Istruzione umanitaria e inclusione globale",
    comptia: "Standard di sicurezza informatica e ingegneria dei sistemi",
    pmi: "Leadership Agile e governance globale",
    credly: "Verifica crittografica delle credenziali a prova di manomissione",
    accredible: "Verifica accademica su registro blockchain",
    badgecert: "Protocollo di integrità delle certificazioni istituzionali",
    nefe: "Alfabetizzazione finanziaria e gestione dei rischi"
  },
  pt: {
    aws: "Infraestrutura Cloud e créditos de computação para estudantes",
    ms: "Currículos de desenvolvedor empresarial e Azure Labs",
    google: "Fundamentos de IA e frameworks de agentes autónomos",
    gates: "Educação humanitária e inclusão global",
    comptia: "Normas de cibersegurança e engenharia de sistemas",
    pmi: "Liderança ágil e governança global",
    credly: "Verificação criptográfica de credenciais invioláveis",
    accredible: "Verificação académica em registo blockchain",
    badgecert: "Protocolo de integridade de certificações institucionais",
    nefe: "Literacia financeira e governança de gestão de riscos"
  },
  ja: {
    aws: "クラウドインフラストラクチャ＆学生向けコンピューティングクレジット",
    ms: "エンタープライズ開発者カリキュラム＆Azureラボ環境",
    google: "AIエッセンシャルズ＆自律型AIエージェントフレームワーク",
    gates: "人道教育支援＆グローバル・インクルージョン",
    comptia: "サイバーセキュリティ＆システムエンジニアリング国際標準",
    pmi: "アジャイル・リーダーシップ＆グローバル・ガバナンス",
    credly: "改ざん耐性のある暗号学的デジタル認定書検証",
    accredible: "ブロックチェーン台帳による学術認定検証",
    badgecert: "機関認証インテグリティ・プロトコル",
    nefe: "金融リテラシー＆リスクマネジメント・ガバナンス"
  },
  ko: {
    aws: "클라우드 인프라 및 학생 컴퓨팅 크레딧 지원",
    ms: "엔터프라이즈 개발자 커리큘럼 및 Azure 실습 랩",
    google: "인공지능 필수 과정 및 자율 에이전트 프레임워크",
    gates: "인도주의적 교육 지원 및 글로벌 포용성",
    comptia: "사이버 보안 및 시스템 엔지니어링 표준",
    pmi: "애자일 리더십 및 글로벌 거버넌스",
    credly: "위변조 방지 암호화 디지털 자격 증명 검증",
    accredible: "블록체인 분산 원장 기반 학업 인증",
    badgecert: "기관 인증 무결성 보장 프로토콜",
    nefe: "금융 이해력 및 리스크 관리 거버넌스"
  },
  nl: {
    aws: "Cloudinfrastructuur & computetegoeden voor studenten",
    ms: "Enterprise ontwikkelaarscurricula & Azure Labs",
    google: "AI Essentials & autonome agent-frameworks",
    gates: "Humanitair onderwijs & mondiale inclusie",
    comptia: "Cyberbeveiliging & systeemtechnische standaarden",
    pmi: "Agile leiderschap & mondiaal bestuur",
    credly: "Cryptografische fraudebestendige verificatie van referenties",
    accredible: "Academische verificatie op blockchain-grootboek",
    badgecert: "Protocol voor integriteit van institutionele certificering",
    nefe: "Financiële geletterdheid & risicobeheer"
  },
  uz: {
    aws: "Bulut infratuzilmasi va talabalar uchun hisoblash kreditlari",
    ms: "Korporativ dasturchilar o'quv dasturlari va Azure laboratoriyalari",
    google: "Sun'iy intellekt asoslari va avtonom agentlik freymvorklari",
    gates: "Insonparvarlik ta'limi va global qamrov",
    comptia: "Kiberxavfsizlik va tizim muhandisligi standartlari",
    pmi: "Agile yetakchilik va global boshqaruv",
    credly: "Qalbakiylashtirishdan himoyalangan kriptografik sertifikat tekshiruvi",
    accredible: "Blokcheyn daftarida akademik tasdiqlash",
    badgecert: "Tashkiliy sertifikatlar butunligi protokoli",
    nefe: "Moliyaviy savodxonlik va risklarni boshqarish"
  },
  id: {
    aws: "Infrastruktur Cloud & Kredit Komputasi Mahasiswa",
    ms: "Kurikulum Pengembang Perusahaan & Lab Azure",
    google: "Dasar-dasar AI & Kerangka Kerja Agen Otonom",
    gates: "Pendidikan Kemanusiaan & Inklusi Global",
    comptia: "Standar Keamanan Siber & Rekayasa Sistem",
    pmi: "Kepemimpinan Agile & Tata Kelola Global",
    credly: "Verifikasi Kredensial Kriptografis Tahan Rusak",
    accredible: "Verifikasi Akademik Buku Besar Blockchain",
    badgecert: "Protokol Integritas Sertifikasi Institusional",
    nefe: "Literasi Keuangan & Tata Kelola Manajemen Risiko"
  }"""

if 'es: {' not in content[:3000]:
    # Replace the closing of ur in partnerDescriptions
    content = content.replace(
        '    nefe: "مالیاتی خواندگی اور رسک مینجمنٹ گورننس"\n  }\n};',
        '    nefe: "مالیاتی خواندگی اور رسک مینجمنٹ گورننس"\n  }' + partner_extra + '\n};',
        1
    )

# 3. Add 10 missing languages to appMenuItemsData
menu_extra = """,
  es: [
    { label: "Anuncios" }, { label: "Mis Cursos" }, { label: "Lista de Deseos" }, { label: "Campus en Vivo" },
    { label: "Tareas" }, { label: "Exámenes y Cuestionarios" }, { label: "Certificados" }, { label: "Becas" },
    { label: "Pagos y Facturas" }, { label: "Diario de Trading" }
  ],
  zh: [
    { label: "官方公告" }, { label: "我的课程" }, { label: "心愿清单" }, { label: "实况校区" },
    { label: "课程作业" }, { label: "考核测验" }, { label: "毕业证书" }, { label: "助学奖金" },
    { label: "支付账单" }, { label: "交易日志" }
  ],
  hi: [
    { label: "घोषणाएँ" }, { label: "मेरे पाठ्यक्रम" }, { label: "इच्छासूची" }, { label: "लाइव परिसर" },
    { label: "असाइनमेंट" }, { label: "परीक्षाएं और प्रश्नोत्तरी" }, { label: "प्रमाण पत्र" }, { label: "छात्रवृत्ति" },
    { label: "भुगतान और चालान" }, { label: "ट्रेडिंग जर्नल" }
  ],
  it: [
    { label: "Annunci" }, { label: "I Miei Corsi" }, { label: "Lista Desideri" }, { label: "Campus dal Vivo" },
    { label: "Compiti" }, { label: "Esami e Quiz" }, { label: "Certificati" }, { label: "Borse di Studio" },
    { label: "Pagamenti e Fatture" }, { label: "Diario di Trading" }
  ],
  pt: [
    { label: "Avisos" }, { label: "Os Meus Cursos" }, { label: "Lista de Desejos" }, { label: "Campus ao Vivo" },
    { label: "Tarefas" }, { label: "Exames e Quizzes" }, { label: "Certificados" }, { label: "Bolsas de Estudo" },
    { label: "Pagamentos e Faturas" }, { label: "Diário de Trading" }
  ],
  ja: [
    { label: "お知らせ" }, { label: "マイコース" }, { label: "ウィッシュリスト" }, { label: "ライブキャンパス" },
    { label: "課題・レポート" }, { label: "試験・小テスト" }, { label: "修了証明書" }, { label: "奨学金" },
    { label: "決済・請求書" }, { label: "トレード記録" }
  ],
  ko: [
    { label: "공지사항" }, { label: "내 수강 강좌" }, { label: "위시리스트" }, { label: "라이브 캠퍼스" },
    { label: "과제 및 프로젝트" }, { label: "시험 및 퀴즈" }, { label: "수료증 발급" }, { label: "장학금 안내" },
    { label: "결제 및 청구서" }, { label: "트레이딩 일지" }
  ],
  nl: [
    { label: "Aankondigingen" }, { label: "Mijn Cursussen" }, { label: "Verlanglijst" }, { label: "Live Campus" },
    { label: "Opdrachten" }, { label: "Examens & Quizzen" }, { label: "Certificaten" }, { label: "Beurzen" },
    { label: "Betalingen & Facturen" }, { label: "Handelsjournaal" }
  ],
  uz: [
    { label: "E'lonlar" }, { label: "Mening kurslarim" }, { label: "Tanlanganlar" }, { label: "Jonli kampus" },
    { label: "Vazifalar" }, { label: "Imtihonlar va testlar" }, { label: "Sertifikatlar" }, { label: "Stipendiyalar" },
    { label: "To'lovlar va hisoblar" }, { label: "Savdo jurnali" }
  ],
  id: [
    { label: "Pengumuman" }, { label: "Kursus Saya" }, { label: "Daftar Keinginan" }, { label: "Kampus Langsung" },
    { label: "Tugas" }, { label: "Ujian & Kuis" }, { label: "Sertifikat" }, { label: "Beasiswa" },
    { label: "Pembayaran & Tagihan" }, { label: "Jurnal Trading" }
  ]"""

if 'zh: [' not in content[:6000]:
    content = content.replace(
        '    { label: "ادائیگی اور انوائس" }, { label: "ٹریڈنگ جرنل" }\n  ]\n};',
        '    { label: "ادائیگی اور انوائس" }, { label: "ٹریڈنگ جرنل" }\n  ]' + menu_extra + '\n};',
        1
    )

# 4. In LocalizedHome, get fDict and update leadershipTeam
old_leadership_code = """  const leadershipTeam = [
    { 
      name: "Shaheen Safi", 
      role: dict.leadership.shaheenRole, 
      title: dict.leadership.shaheenTitle, 
      image: "/team/shaheen.jpeg",
      link: `/${currentLocale}/founder/shaheen-safi`,
      bio: dict.leadership.shaheenBio
    },
    { 
      name: "Sahel Salem", 
      role: dict.leadership.sahelRole, 
      title: dict.leadership.sahelTitle, 
      image: "/team/sahel.jpeg",
      link: `/${currentLocale}/founder/sahel-salem`,
      bio: dict.leadership.sahelBio
    },
    { 
      name: "Shirin Gol Ahmadi", 
      role: dict.leadership.shirinRole, 
      title: dict.leadership.shirinTitle, 
      image: "/team/shirin.jpeg",
      link: `/${currentLocale}/founder/shirin-gol-ahmadi`,
      bio: dict.leadership.shirinBio
    },
    { 
      name: "Mujtaba Rahmani", 
      role: dict.leadership.mujtabaRole, 
      title: dict.leadership.mujtabaTitle, 
      image: "/team/mujtaba.jpeg",
      link: `/${currentLocale}/founder/mujtaba-rahmani`,
      bio: dict.leadership.mujtabaBio
    },
    { 
      name: "Mobin Hassani", 
      role: (dict.leadership as any).mobinRole || "Lead Developer", 
      title: (dict.leadership as any).mobinTitle || "Lead Software Engineer & Cloud Systems Architect", 
      image: "/team/mobin.jpeg",
      link: `/${currentLocale}/founder/mobin-hassani`,
      bio: (dict.leadership as any).mobinBio || "Directing software engineering squads, high-concurrency cloud architecture, and end-to-end fintech security."
    }
  ];"""

new_leadership_code = """  const { dict: fDict } = getFounderLocaleData(currentLocale);

  const leadershipTeam = [
    { 
      name: fDict.shaheenSafi.name, 
      role: fDict.shaheenSafi.role, 
      title: dict.leadership.shaheenTitle, 
      image: "/team/shaheen.jpeg",
      link: `/${currentLocale}/founder/shaheen-safi`,
      bio: fDict.shaheenSafi.bio
    },
    { 
      name: fDict.sahelSalem.name, 
      role: fDict.sahelSalem.role, 
      title: dict.leadership.sahelTitle, 
      image: "/team/sahel.jpeg",
      link: `/${currentLocale}/founder/sahel-salem`,
      bio: fDict.sahelSalem.bio
    },
    { 
      name: fDict.shirinGolAhmadi.name, 
      role: fDict.shirinGolAhmadi.role, 
      title: dict.leadership.shirinTitle, 
      image: "/team/shirin.jpeg",
      link: `/${currentLocale}/founder/shirin-gol-ahmadi`,
      bio: fDict.shirinGolAhmadi.bio
    },
    { 
      name: fDict.mujtabaRahmani.name, 
      role: fDict.mujtabaRahmani.role, 
      title: dict.leadership.mujtabaTitle, 
      image: "/team/mujtaba.jpeg",
      link: `/${currentLocale}/founder/mujtaba-rahmani`,
      bio: fDict.mujtabaRahmani.bio
    },
    { 
      name: fDict.mobinHassani.name, 
      role: fDict.mobinHassani.role, 
      title: (dict.leadership as any).mobinTitle || fDict.mobinHassani.role, 
      image: "/team/mobin.jpeg",
      link: `/${currentLocale}/founder/mobin-hassani`,
      bio: fDict.mobinHassani.bio
    }
  ];"""

if old_leadership_code in content:
    content = content.replace(old_leadership_code, new_leadership_code)
    print("Leadership team updated to use localized fDict!")
else:
    print("Warning: old_leadership_code not found in exact format.")

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("src/app/[locale]/page.tsx updated successfully!")
