// ============================================================================
// STORE PAYMENT GATEWAYS 19-LANGUAGE TRANSLATIONS
// ============================================================================

export interface PaymentTranslation {
  secureBadge: string;
  chooseTitle: string;
  chooseDesc: string;
  atomaBadge: string;
  atomaTitle: string;
  atomaDesc: string;
  atomaBtn: string;
  hesabBadge: string;
  hesabTitle: string;
  hesabDesc: string;
  hesabBtn: string;
  securityNotice: string;
  adTitle: string;
}

const en: PaymentTranslation = {
  secureBadge: "End-to-End Encrypted Checkout",
  chooseTitle: "Choose Your Payment Method",
  chooseDesc: "Select your preferred payment gateway to securely complete your digital order with instant verification.",
  atomaBadge: "Active & Instant",
  atomaTitle: "AtomaPay Gateway",
  atomaDesc: "Instant wallet transfer, card processing, and rapid QR barcode confirmation.",
  atomaBtn: "Continue with AtomaPay",
  hesabBadge: "Recommended for Afghanistan",
  hesabTitle: "HesabPay Gateway",
  hesabDesc: "Easy payment via mobile HesabPay in AFN or USD with direct QR scan and instant invoice.",
  hesabBtn: "Continue with HesabPay",
  securityNotice: "All Safi Digital transactions are protected with 256-bit SSL encryption. Official invoice receipts are provided upon submission.",
  adTitle: "Featured Payment & Financial Solutions"
};

const fa: PaymentTranslation = {
  secureBadge: "درگاه پرداخت امن و تایید شده",
  chooseTitle: "انتخاب روش پرداخت",
  chooseDesc: "برای تکمیل سفارش دیجیتال خود، یکی از روش‌های پرداخت زیر را انتخاب نمایید. کلیه پرداخت‌ها بلافاصله تایید می‌شوند.",
  atomaBadge: "فعال و آنی",
  atomaTitle: "درگاه آتوماپی (AtomaPay)",
  atomaDesc: "پرداخت مستقیم و آنی کارت به کارت، کیف پول و ارزهای بین‌المللی با تایید خودکار رسید.",
  atomaBtn: "ورود به درگاه آتوماپی",
  hesabBadge: "توصیه شده در افغانستان",
  hesabTitle: "درگاه حساب‌پی (HesabPay)",
  hesabDesc: "پرداخت آسان با حساب‌پی به افغانی (AFN) یا دالر همراه با اسکن بارکد QR و تایید فوری.",
  hesabBtn: "ورود به درگاه حساب‌پی",
  securityNotice: "کلیه تراکنش‌های آکادمی صافی با استاندارد رمزنگاری امن SSL 256-bit محافظت می‌گردد و رسید رسمی به صورت خودکار صادر خواهد شد.",
  adTitle: "پیشنهادهای ویژه پرداخت و خدمات مالی"
};

const ps: PaymentTranslation = {
  secureBadge: "خوندي او تایید شوې د پیسو تادیه",
  chooseTitle: "د تادیې طریقه غوره کړئ",
  chooseDesc: "د خپل ډیجیټل آرډر بشپړولو لپاره، لاندې یوه تګلاره غوره کړئ. ټولې تادیات سمدلاسه تایید کیږي.",
  atomaBadge: "فعال او فوري",
  atomaTitle: "آتوماپی (AtomaPay) درګاه",
  atomaDesc: "مستقیم او چټک کارټ په کارټ تادیه، ډیجیټل بټوه او نړیوال اسعار.",
  atomaBtn: "آتوماپی ته دوام ورکړئ",
  hesabBadge: "په افغانستان کې وړاندیز شوی",
  hesabTitle: "حساب‌پی (HesabPay) درګاه",
  hesabDesc: "په افغانیو او ډالرو کې په اسانۍ د QR کوډ په سکین کولو سره فوري تادیه.",
  hesabBtn: "حساب‌پی ته دوام ورکړئ",
  securityNotice: "د صافي اکاډمۍ ټولې راکړې ورکړې په پرمختللي SSL 256-bit کوډ کولو سره خوندي دي.",
  adTitle: "د مالي او بانکي خدمتونو ځانګړي وړاندیزونه"
};

const ar: PaymentTranslation = {
  ...en,
  secureBadge: "بوابة دفع مشفرة وآمنة بالكامل",
  chooseTitle: "اختر وسيلة الدفع المناسبة",
  chooseDesc: "حدد بوابة الدفع المفضلة لإتمام طلبك الرقمي بأمان مع التحقق الفوري.",
  atomaBadge: "نشط وفوري",
  atomaTitle: "بوابة AtomaPay",
  atomaDesc: "تحويل فوري عبر المحفظة والبطاقات المصرفية مع تأكيد برمز QR السريع.",
  atomaBtn: "المتابعة عبر AtomaPay",
  hesabBadge: "موصى به في أفغانستان",
  hesabTitle: "بوابة HesabPay",
  hesabDesc: "دفع سلس عبر تطبيق HesabPay بالعملة الأفغانية أو الدولار مع مسح QR.",
  hesabBtn: "المتابعة عبر HesabPay",
  securityNotice: "جميع المعاملات محمية بتشفير 256-bit SSL وتصدر لها فواتير رسمية فورية."
};

const ur: PaymentTranslation = {
  ...fa,
  secureBadge: "مکمل محفوظ اور انکرپٹڈ ادائیگی",
  chooseTitle: "ادائیگی کا طریقہ منتخب کریں",
  chooseDesc: "اپنے ڈیجیٹل آرڈر کی تصدیق اور تکمیل کے لیے ترجیحی ادائیگی کا گیٹ وے منتخب کریں۔",
  atomaBtn: "آٹوما پے کے ساتھ جاری رکھیں",
  hesabBtn: "حساب پے کے ساتھ جاری رکھیں"
};

const otherPaymentLocales: Record<string, Partial<PaymentTranslation>> = {
  de: { secureBadge: "Vollständig verschlüsselte Kasse", chooseTitle: "Wählen Sie Ihre Zahlungsmethode", chooseDesc: "Wählen Sie Ihr bevorzugtes Zahlungsgateway für eine sichere Abwicklung.", atomaBtn: "Weiter mit AtomaPay", hesabBtn: "Weiter mit HesabPay" },
  fr: { secureBadge: "Paiement sécurisé de bout en bout", chooseTitle: "Choisissez votre mode de paiement", chooseDesc: "Sélectionnez votre passerelle de paiement pour finaliser votre commande en toute sécurité.", atomaBtn: "Continuer avec AtomaPay", hesabBtn: "Continuer avec HesabPay" },
  es: { secureBadge: "Pago seguro y cifrado", chooseTitle: "Elige tu método de pago", chooseDesc: "Selecciona tu pasarela de pago para completar tu pedido con verificación instantánea.", atomaBtn: "Continuar con AtomaPay", hesabBtn: "Continuar con HesabPay" },
  ru: { secureBadge: "Защищенная система оплаты", chooseTitle: "Выберите способ оплаты", chooseDesc: "Выберите удобный шлюз оплаты для моментального подтверждения цифрового заказа.", atomaBtn: "Продолжить через AtomaPay", hesabBtn: "Продолжить через HesabPay" },
  tr: { secureBadge: "Uçtan Uca Şifreli Ödeme", chooseTitle: "Ödeme Yönteminizi Seçin", chooseDesc: "Dijital siparişinizi güvenle tamamlamak için tercih ettiğiniz ödeme kanalını seçin.", atomaBtn: "AtomaPay ile Devam Et", hesabBtn: "HesabPay ile Devam Et" },
  zh: { secureBadge: "端到端全程加密结账", chooseTitle: "选择您的支付方式", chooseDesc: "选择您偏好的安全支付网关，即刻完成数字订单并获取凭证。", atomaBtn: "使用 AtomaPay 结账", hesabBtn: "使用 HesabPay 结账" },
  hi: { secureBadge: "एंड-टू-एंड एन्क्रिप्टेड भुगतान", chooseTitle: "अपनी भुगतान विधि चुनें", chooseDesc: "अपने डिजिटल ऑर्डर को सुरक्षित रूप से पूरा करने के लिए उपयुक्त गेटवे चुनें।", atomaBtn: "AtomaPay से आगे बढ़ें", hesabBtn: "HesabPay से आगे बढ़ें" },
  it: { secureBadge: "Checkout crittografato end-to-end", chooseTitle: "Scegli il tuo metodo di pagamento", chooseDesc: "Seleziona il gateway di pagamento per completare il tuo ordine in sicurezza.", atomaBtn: "Continua con AtomaPay", hesabBtn: "Continua con HesabPay" },
  pt: { secureBadge: "Pagamento seguro de ponta a ponta", chooseTitle: "Escolha o seu método de pagamento", chooseDesc: "Selecione o gateway de pagamento para concluir seu pedido digital com segurança.", atomaBtn: "Continuar com AtomaPay", hesabBtn: "Continuar com HesabPay" },
  ja: { secureBadge: "エンドツーエンド暗号化チェックアウト", chooseTitle: "お支払い方法を選択", chooseDesc: "デジタル注文を安全に完了するために、ご希望の決済ゲートウェイを選択してください。", atomaBtn: "AtomaPay で進む", hesabBtn: "HesabPay で進む" },
  ko: { secureBadge: "종단간 암호화 결제", chooseTitle: "결제 수단 선택", chooseDesc: "디지털 주문을 안전하고 즉각적으로 완료할 결제 게이트웨이를 선택하세요.", atomaBtn: "AtomaPay로 계속", hesabBtn: "HesabPay로 계속" },
  nl: { secureBadge: "End-to-end versleutelde kassa", chooseTitle: "Kies uw betaalmethode", chooseDesc: "Selecteer uw gewenste betaalgateway om uw bestelling veilig te voltooien.", atomaBtn: "Doorgaan met AtomaPay", hesabBtn: "Doorgaan met HesabPay" },
  uz: { secureBadge: "To'liq shifrlangan xavfsiz to'lov", chooseTitle: "To'lov usulini tanlang", chooseDesc: "Buyurtmangizni xavfsiz yakunlash uchun to'lov tizimini tanlang.", atomaBtn: "AtomaPay orqali davom etish", hesabBtn: "HesabPay orqali davom etish" },
  id: { secureBadge: "Checkout Terenkripsi Ujung ke Ujung", chooseTitle: "Pilih Metode Pembayaran Anda", chooseDesc: "Pilih gateway pembayaran pilihan Anda untuk menyelesaikan pesanan dengan aman.", atomaBtn: "Lanjutkan dengan AtomaPay", hesabBtn: "Lanjutkan dengan HesabPay" }
};

export const paymentTranslationsMap: Record<string, PaymentTranslation> = {
  en, fa, ps, ar, ur
};

Object.keys(otherPaymentLocales).forEach((loc) => {
  paymentTranslationsMap[loc] = {
    ...en,
    ...otherPaymentLocales[loc]
  };
});

export function getPaymentTranslation(locale: string): PaymentTranslation {
  const norm = (locale || "en").toLowerCase();
  return paymentTranslationsMap[norm] || paymentTranslationsMap.en;
}
