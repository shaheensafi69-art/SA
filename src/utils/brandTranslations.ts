// ============================================================================
// SAFI ACADEMY - 19-LANGUAGE BRAND & ECOSYSTEM TRANSLATIONS
// ============================================================================

export interface EcosystemTranslations {
  safipay: string;
  safitopup: string;
  safipro: string;
  saficapital: string;
  holdingBadge: string;
  safiai: string;
}

export interface BrandTranslation {
  isRtl: boolean;
  brandName: string;
  brandPrefix: string;
  brandHighlight: string;
  ecosystem: EcosystemTranslations;
}

export const brandTranslationsMap: Record<string, BrandTranslation> = {
  en: {
    isRtl: false,
    brandName: "Safi Academy",
    brandPrefix: "Safi",
    brandHighlight: "Academy",
    ecosystem: {
      safipay: "SafiPay Banking",
      safitopup: "Safi TopUp Global",
      safipro: "SafiPro Apparel",
      saficapital: "Safi Capital LTD",
      holdingBadge: "Holding",
      safiai: "Safi AI Autonomous Labs",
    },
  },
  fa: {
    isRtl: true,
    brandName: "آکادمی صافی",
    brandPrefix: "آکادمی",
    brandHighlight: "صافی",
    ecosystem: {
      safipay: "بانکداری بین‌المللی صافی‌پی",
      safitopup: "شارژ و خدمات ارزی صافی تاپ‌آپ",
      safipro: "پوشاک و برند انحصاری صافی‌پرو",
      saficapital: "هلدینگ بین‌المللی صافی کپیتال",
      holdingBadge: "هلدینگ",
      safiai: "آزمایشگاه‌های خودمختار هوش مصنوعی صافی",
    },
  },
  ps: {
    isRtl: true,
    brandName: "صافي اکاډمي",
    brandPrefix: "د صافي",
    brandHighlight: "اکاډمي",
    ecosystem: {
      safipay: "د صافي‌پي بانکي خدمتونه",
      safitopup: "د صافي ټاپ‌اپ نړیوال کریډیټ",
      safipro: "د صافي‌پرو ځانګړې جامې او برانډ",
      saficapital: "د صافي کپيټل نړیوال هولډینګ",
      holdingBadge: "هولډینګ",
      safiai: "د صافي هوښیار خودمختاره لابراتوارونه",
    },
  },
  ar: {
    isRtl: true,
    brandName: "أكاديمية صافي",
    brandPrefix: "أكاديمية",
    brandHighlight: "صافي",
    ecosystem: {
      safipay: "مصرفية صافي باي العالمية",
      safitopup: "شحن الرصيد والخدمات الرقمية صافي توب آب",
      safipro: "أزياء ومنتجات صافي برو الفاخرة",
      saficapital: "مجموعة صافي كابيتال القابضة",
      holdingBadge: "قابضة",
      safiai: "مختبرات الذكاء الاصطناعي المستقلة صافي",
    },
  },
  ur: {
    isRtl: true,
    brandName: "صافی اکیڈمی",
    brandPrefix: "صافی",
    brandHighlight: "اکیڈمی",
    ecosystem: {
      safipay: "صافی پے عالمی بینکاری",
      safitopup: "صافی گلوبل ٹاپ اپ سروسز",
      safipro: "صافی پرو ملبوسات و برانڈ",
      saficapital: "صافی کیپیٹل انویسٹمنٹ ہولڈنگ",
      holdingBadge: "ہولڈنگ",
      safiai: "صافی اے آئی خود مختار لیبز",
    },
  },
  ru: {
    isRtl: false,
    brandName: "Академия Сафи",
    brandPrefix: "Академия",
    brandHighlight: "Сафи",
    ecosystem: {
      safipay: "Международный банкинг SafiPay",
      safitopup: "Международный сервис Safi TopUp",
      safipro: "Премиальная одежда SafiPro",
      saficapital: "Инвестиционный холдинг Safi Capital",
      holdingBadge: "Холдинг",
      safiai: "Автономные лаборатории ИИ Safi",
    },
  },
  tr: {
    isRtl: false,
    brandName: "Safi Akademisi",
    brandPrefix: "Safi",
    brandHighlight: "Akademisi",
    ecosystem: {
      safipay: "SafiPay Küresel Bankacılık",
      safitopup: "Safi TopUp Küresel Yükleme",
      safipro: "SafiPro Özel Giyim Markası",
      saficapital: "Safi Capital Yatırım Holdingi",
      holdingBadge: "Holding",
      safiai: "Safi Otonom Yapay Zeka Laboratuvarları",
    },
  },
  de: {
    isRtl: false,
    brandName: "Safi Akademie",
    brandPrefix: "Safi",
    brandHighlight: "Akademie",
    ecosystem: {
      safipay: "SafiPay Globales Banking",
      safitopup: "Safi TopUp Weltweit",
      safipro: "SafiPro Bekleidung & Mode",
      saficapital: "Safi Capital Investment Holding",
      holdingBadge: "Holding",
      safiai: "Safi KI Autonome Forschungslabore",
    },
  },
  fr: {
    isRtl: false,
    brandName: "Académie Safi",
    brandPrefix: "Académie",
    brandHighlight: "Safi",
    ecosystem: {
      safipay: "Services bancaires SafiPay",
      safitopup: "Recharge internationale Safi TopUp",
      safipro: "Vêtements et marque SafiPro",
      saficapital: "Holding d'investissement Safi Capital",
      holdingBadge: "Holding",
      safiai: "Laboratoires autonomes d'IA Safi",
    },
  },
  es: {
    isRtl: false,
    brandName: "Academia Safi",
    brandPrefix: "Academia",
    brandHighlight: "Safi",
    ecosystem: {
      safipay: "Banca internacional SafiPay",
      safitopup: "Recargas globales Safi TopUp",
      safipro: "Moda y prendas exclusivas SafiPro",
      saficapital: "Holding de inversiones Safi Capital",
      holdingBadge: "Holding",
      safiai: "Laboratorios autónomos de IA Safi",
    },
  },
  zh: {
    isRtl: false,
    brandName: "萨菲学院",
    brandPrefix: "萨菲",
    brandHighlight: "学院",
    ecosystem: {
      safipay: "SafiPay 离岸银行与跨境结算",
      safitopup: "Safi TopUp 全球话费流量直充",
      safipro: "SafiPro 高端品牌服饰",
      saficapital: "萨菲国际资本控股集团",
      holdingBadge: "控股母公司",
      safiai: "萨菲人工智能自主研发实验室",
    },
  },
  hi: {
    isRtl: false,
    brandName: "साफ़ी अकादमी",
    brandPrefix: "साफ़ी",
    brandHighlight: "अकादमी",
    ecosystem: {
      safipay: "साफ़ीपे ग्लोबल बैंकिंग",
      safitopup: "साफ़ी टॉपअप ग्लोबल सेवाएं",
      safipro: "साफ़ीप्रो परिधान एवं ब्रांड",
      saficapital: "साफ़ी कैपिटल इनवेस्टमेंट होल्डिंग",
      holdingBadge: "होल्डिंग",
      safiai: "साफ़ी एआई स्वायत्त प्रयोगशालाएं",
    },
  },
  it: {
    isRtl: false,
    brandName: "Accademia Safi",
    brandPrefix: "Accademia",
    brandHighlight: "Safi",
    ecosystem: {
      safipay: "Servizi bancari SafiPay",
      safitopup: "Ricarica globale Safi TopUp",
      safipro: "Abbigliamento esclusivo SafiPro",
      saficapital: "Holding di investimento Safi Capital",
      holdingBadge: "Holding",
      safiai: "Laboratori autonomi di IA Safi",
    },
  },
  pt: {
    isRtl: false,
    brandName: "Academia Safi",
    brandPrefix: "Academia",
    brandHighlight: "Safi",
    ecosystem: {
      safipay: "Serviços bancários SafiPay",
      safitopup: "Recargas globais Safi TopUp",
      safipro: "Vestuário exclusivo SafiPro",
      saficapital: "Holding de investimentos Safi Capital",
      holdingBadge: "Holding",
      safiai: "Laboratórios autônomos de IA Safi",
    },
  },
  ja: {
    isRtl: false,
    brandName: "サフィ・アカデミー",
    brandPrefix: "サフィ",
    brandHighlight: "アカデミー",
    ecosystem: {
      safipay: "SafiPay グローバル・バンキング",
      safitopup: "Safi TopUp 国際リチャージ",
      safipro: "SafiPro アパレル＆ブランド",
      saficapital: "Safi キャピタル・ホールディングス",
      holdingBadge: "持株会社",
      safiai: "Safi 自律型人工知能研究所",
    },
  },
  ko: {
    isRtl: false,
    brandName: "사피 아카데미",
    brandPrefix: "사피",
    brandHighlight: "아카데미",
    ecosystem: {
      safipay: "SafiPay 글로벌 뱅킹",
      safitopup: "Safi TopUp 글로벌 충전 서비스",
      safipro: "SafiPro 프리미엄 어패럴",
      saficapital: "Safi 캐피탈 투자 지주회사",
      holdingBadge: "지주회사",
      safiai: "Safi 자율형 인공지능 연구소",
    },
  },
  nl: {
    isRtl: false,
    brandName: "Safi Academie",
    brandPrefix: "Safi",
    brandHighlight: "Academie",
    ecosystem: {
      safipay: "SafiPay Internationaal Bankieren",
      safitopup: "Safi TopUp Wereldwijde Herlading",
      safipro: "SafiPro Exclusieve Kleding",
      saficapital: "Safi Capital Investeringsholding",
      holdingBadge: "Holding",
      safiai: "Safi AI Autonome Onderzoekslabs",
    },
  },
  uz: {
    isRtl: false,
    brandName: "Safi Akademiyasi",
    brandPrefix: "Safi",
    brandHighlight: "Akademiyasi",
    ecosystem: {
      safipay: "SafiPay Xalqaro bank xizmatlari",
      safitopup: "Safi TopUp Global to'ldirish",
      safipro: "SafiPro Maxsus kiyim brendi",
      saficapital: "Safi Capital Xalqaro investitsiya xoldingi",
      holdingBadge: "Xolding",
      safiai: "Safi Sun'iy intellekt avtonom laboratoriyalari",
    },
  },
  id: {
    isRtl: false,
    brandName: "Akademi Safi",
    brandPrefix: "Akademi",
    brandHighlight: "Safi",
    ecosystem: {
      safipay: "Perbankan Global SafiPay",
      safitopup: "Layanan Isi Ulang Global Safi TopUp",
      safipro: "Pakaian & Merek Eksklusif SafiPro",
      saficapital: "Holding Investasi Safi Capital",
      holdingBadge: "Holding",
      safiai: "Laboratorium Otonom AI Safi",
    },
  },
};

export const getBrandTranslation = (locale?: string): BrandTranslation => {
  const loc = (locale || "en").toLowerCase();
  return brandTranslationsMap[loc] || brandTranslationsMap.en;
};
