const fs = require('fs');
const path = require('path');

const locales = ['en','fa','ps','ru','tr','de','fr','ar','ur','es','zh','hi','it','pt','ja','ko','nl','uz','id'];

const bankTranslations = {
  en: {
    girlsEnrolled: "Girls Enrolled",
    freeScholarships: "Free Scholarships",
    liveClassrooms: "Classrooms",
    cancelBtn: "Cancel & Change Amount",
    verifiedScholarship: "Verified Scholarship Recipient",
    donorNamePlaceholder: "e.g. Ahmad Reza",
    donorEmailPlaceholder: "e.g. ahmad@example.com",
    txIdPlaceholder: "Reference code on your bank slip",
    alertFillRequired: "Please fill in your name, email and transfer amount.",
    alertNetworkError: "Network error. Please try again or contact us directly.",
    alertMinDonation: "Minimum donation is $5",
    alertSubmitFailed: "Failed to submit transfer receipt.",
    bankAccounts: [
      {
        id: "usd_wirex_shirin",
        currency: "USD",
        currencySymbol: "$",
        countryCode: "US",
        title: "US Dollar (ACH / Routing) - Shirin Gol Ahmadi",
        subtitle: "Direct US Domestic Bank Transfer / Wirex",
        beneficiary: "Shirin Gol Ahmadi",
        accountNumber: "214222579029",
        routingNumber: "101019644",
        bankName: "Wirex USA",
        note: "Minimum deposit is $1 (amounts below this will be rejected)"
      },
      {
        id: "eur_malta_shirin",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "Euro SEPA (Malta) - Shirin Gol Ahmadi",
        subtitle: "European Single Euro Payments Area (SEPA)",
        beneficiary: "Shirin Gol Ahmadi",
        iban: "MT92CFTE28004000000000006678211",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "gbp_uk",
        currency: "GBP",
        currencySymbol: "£",
        countryCode: "GB",
        title: "British Pound (UK Faster Payments)",
        subtitle: "Direct UK Domestic Transfer / BACS",
        beneficiary: "SHAHEEN SAFI",
        sortCode: "60-83-82",
        accountNumber: "47508069",
        bankName: "BANKING CIRCLE UK",
        bankAddress: "24 KING WILLIAM STREET, LONDON"
      },
      {
        id: "eur_malta_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "Euro SEPA (Malta) - Shaheen Safi",
        subtitle: "European Single Euro Payments Area (SEPA)",
        beneficiary: "Shaheen Safi",
        iban: "MT42CFTE2800400000000005958401",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "eur_lux_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "LU",
        title: "Euro SEPA (Luxembourg) - Shaheen Safi",
        subtitle: "SEPA Cross-Border Transfer",
        beneficiary: "SHAHEEN SAFI",
        iban: "LU064080000047474342",
        bic: "BCIRLULL",
        bankName: "BANKING CIRCLE S.A.",
        bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG"
      }
    ]
  },
  fa: {
    girlsEnrolled: "دختران ثبت‌نام‌شده",
    freeScholarships: "بورسیه‌های ۱۰۰٪ رایگان",
    liveClassrooms: "صنف‌های فعال آنلاین",
    cancelBtn: "انصراف و تغییر مبلغ",
    verifiedScholarship: "بورسیه تحصیلی تأیید شده",
    donorNamePlaceholder: "مثال: احمد رضا",
    donorEmailPlaceholder: "مثال: ahmad@example.com",
    txIdPlaceholder: "کد پیگیری یا شماره رسید واریز بانکی",
    alertFillRequired: "لطفاً نام، ایمیل و مبلغ واریزی را تکمیل کنید.",
    alertNetworkError: "خطای شبکه. لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
    alertMinDonation: "حداقل مبلغ کمک مالی ۵ دالر است.",
    alertSubmitFailed: "ارسال رسید با خطا مواجه شد.",
    bankAccounts: [
      {
        id: "usd_wirex_shirin",
        currency: "USD",
        currencySymbol: "$",
        countryCode: "US",
        title: "دالر آمریکا (ACH / روتینگ) - شیرین گل احمدی",
        subtitle: "انتقال مستقیم بانکی داخلی آمریکا / Wirex",
        beneficiary: "Shirin Gol Ahmadi",
        accountNumber: "214222579029",
        routingNumber: "101019644",
        bankName: "Wirex USA",
        note: "حداقل واریز ۱ دالر است (مقادیر کمتر از این پذیرفته نمی‌شوند)"
      },
      {
        id: "eur_malta_shirin",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالت) - شیرین گل احمدی",
        subtitle: "منطقه پرداخت واحد اروپایی (SEPA)",
        beneficiary: "Shirin Gol Ahmadi",
        iban: "MT92CFTE28004000000000006678211",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "gbp_uk",
        currency: "GBP",
        currencySymbol: "£",
        countryCode: "GB",
        title: "پوند بریتانیا (انتقال سریع بانکی بریتانیا)",
        subtitle: "انتقال مستقیم داخلی بریتانیا / BACS",
        beneficiary: "SHAHEEN SAFI",
        sortCode: "60-83-82",
        accountNumber: "47508069",
        bankName: "BANKING CIRCLE UK",
        bankAddress: "24 KING WILLIAM STREET, LONDON"
      },
      {
        id: "eur_malta_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالت) - شاهین صافی",
        subtitle: "منطقه پرداخت واحد اروپایی (SEPA)",
        beneficiary: "Shaheen Safi",
        iban: "MT42CFTE2800400000000005958401",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "eur_lux_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "LU",
        title: "یورو SEPA (لوکزامبورگ) - شاهین صافی",
        subtitle: "انتقال برون‌مرزی SEPA اروپا",
        beneficiary: "SHAHEEN SAFI",
        iban: "LU064080000047474342",
        bic: "BCIRLULL",
        bankName: "BANKING CIRCLE S.A.",
        bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG"
      }
    ]
  },
  ps: {
    girlsEnrolled: "شاملې شوې نجونې",
    freeScholarships: "۱۰۰٪ وړیا بورسونه",
    liveClassrooms: "فعال آنلاین ټولګي",
    cancelBtn: "لغوه او د پیسو بدلون",
    verifiedScholarship: "تایید شوی تحصیلي بورس",
    donorNamePlaceholder: "مثال: احمد رضا",
    donorEmailPlaceholder: "مثال: ahmad@example.com",
    txIdPlaceholder: "د بانکي سپارلو د رسید نمبر",
    alertFillRequired: "مهرباني وکړئ خپل نوم، بریښنالیک او د انتقال اندازه ډکه کړئ.",
    alertNetworkError: "د شبکې ستونزه. مهرباني وکړئ بیا هڅه وکړئ یا اړیکه ونیسئ.",
    alertMinDonation: "لږترلږه مرسته ۵ ډالره ده.",
    alertSubmitFailed: "د رسید لیږل ناکام شول.",
    bankAccounts: [
      {
        id: "usd_wirex_shirin",
        currency: "USD",
        currencySymbol: "$",
        countryCode: "US",
        title: "امریکایي ډالر (ACH / روټینګ) - شیرین ګل احمدي",
        subtitle: "د امریکا کورنی بانکي لیږد / Wirex",
        beneficiary: "Shirin Gol Ahmadi",
        accountNumber: "214222579029",
        routingNumber: "101019644",
        bankName: "Wirex USA",
        note: "لږترلږه زیرمه ۱ ډالر ده (له دې کم مقدار نه منل کیږي)"
      },
      {
        id: "eur_malta_shirin",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالټا) - شیرین ګل احمدي",
        subtitle: "د اروپا د واحد تادیاتو سیمه (SEPA)",
        beneficiary: "Shirin Gol Ahmadi",
        iban: "MT92CFTE28004000000000006678211",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "gbp_uk",
        currency: "GBP",
        currencySymbol: "£",
        countryCode: "GB",
        title: "برتانوي پونډ (د برتانیا چټک تادیات)",
        subtitle: "د برتانیا مستقیم کورنی لیږد / BACS",
        beneficiary: "SHAHEEN SAFI",
        sortCode: "60-83-82",
        accountNumber: "47508069",
        bankName: "BANKING CIRCLE UK",
        bankAddress: "24 KING WILLIAM STREET, LONDON"
      },
      {
        id: "eur_malta_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالټا) - شاهین صافی",
        subtitle: "د اروپا د واحد تادیاتو سیمه (SEPA)",
        beneficiary: "Shaheen Safi",
        iban: "MT42CFTE2800400000000005958401",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "eur_lux_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "LU",
        title: "یورو SEPA (لوګزامبورګ) - شاهین صافی",
        subtitle: "د اروپا د سرحدونو پورې د SEPA لیږد",
        beneficiary: "SHAHEEN SAFI",
        iban: "LU064080000047474342",
        bic: "BCIRLULL",
        bankName: "BANKING CIRCLE S.A.",
        bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG"
      }
    ]
  },
  ar: {
    girlsEnrolled: "طالبات ملتحقات",
    freeScholarships: "منح دراسية مجانية 100%",
    liveClassrooms: "فصول دراسية حية",
    cancelBtn: "إلغاء وتغيير المبلغ",
    verifiedScholarship: "حاصلة على منحة دراسية معتمدة",
    donorNamePlaceholder: "مثال: أحمد رضا",
    donorEmailPlaceholder: "مثال: ahmad@example.com",
    txIdPlaceholder: "رمز الإيصال أو الرقم المرجعي للتحويل",
    alertFillRequired: "يرجى ملء اسمك وبريدك الإلكتروني ومبلغ التحويل.",
    alertNetworkError: "خطأ في الشبكة. يرجى المحاولة مرة أخرى أو الاتصال بنا.",
    alertMinDonation: "الحد الأدنى للتبرع هو 5 دولارات.",
    alertSubmitFailed: "فشل إرسال إيصال التحويل.",
    bankAccounts: [
      {
        id: "usd_wirex_shirin",
        currency: "USD",
        currencySymbol: "$",
        countryCode: "US",
        title: "الدولار الأمريكي (ACH / التوجيه) - شيرين جول أحمدي",
        subtitle: "تحويل مصرفي محلي أمريكي مباشر / Wirex",
        beneficiary: "Shirin Gol Ahmadi",
        accountNumber: "214222579029",
        routingNumber: "101019644",
        bankName: "Wirex USA",
        note: "الحد الأدنى للإيداع هو 1 دولار (المبالغ الأقل مرفوضة)"
      },
      {
        id: "eur_malta_shirin",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "اليورو SEPA (مالطا) - شيرين جول أحمدي",
        subtitle: "منطقة المدفوعات الأوروبية الموحدة باليورو (SEPA)",
        beneficiary: "Shirin Gol Ahmadi",
        iban: "MT92CFTE28004000000000006678211",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "gbp_uk",
        currency: "GBP",
        currencySymbol: "£",
        countryCode: "GB",
        title: "الجنيه الإسترليني (المدفوعات البريطانية السريعة)",
        subtitle: "تحويل محلي بريطاني مباشر / BACS",
        beneficiary: "SHAHEEN SAFI",
        sortCode: "60-83-82",
        accountNumber: "47508069",
        bankName: "BANKING CIRCLE UK",
        bankAddress: "24 KING WILLIAM STREET, LONDON"
      },
      {
        id: "eur_malta_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "اليورو SEPA (مالطا) - شاهين صافي",
        subtitle: "منطقة المدفوعات الأوروبية الموحدة باليورو (SEPA)",
        beneficiary: "Shaheen Safi",
        iban: "MT42CFTE2800400000000005958401",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "eur_lux_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "LU",
        title: "اليورو SEPA (لوكسمبورغ) - شاهين صافي",
        subtitle: "تحويل عابر للحدود عبر SEPA",
        beneficiary: "SHAHEEN SAFI",
        iban: "LU064080000047474342",
        bic: "BCIRLULL",
        bankName: "BANKING CIRCLE S.A.",
        bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG"
      }
    ]
  },
  ur: {
    girlsEnrolled: "شامل طالبات",
    freeScholarships: "100% مفت وظائف",
    liveClassrooms: "آن لائن کلاس رومز",
    cancelBtn: "منسوخ کریں اور رقم تبدیل کریں",
    verifiedScholarship: "تصدیق شدہ اسکالرشپ حاصل کنندہ",
    donorNamePlaceholder: "مثال: احمد رضا",
    donorEmailPlaceholder: "مثال: ahmad@example.com",
    txIdPlaceholder: "بینک رسید پر ٹریکنگ یا حوالہ نمبر",
    alertFillRequired: "براہ کرم اپنا نام، ای میل اور رقم درج کریں۔",
    alertNetworkError: "نیٹ ورک کی خرابی۔ دوبارہ کوشش کریں یا ہم سے رابطہ کریں۔",
    alertMinDonation: "کم از کم عطیہ 5 ڈالر ہے۔",
    alertSubmitFailed: "رسید جمع کروانے میں ناکامی۔",
    bankAccounts: [
      {
        id: "usd_wirex_shirin",
        currency: "USD",
        currencySymbol: "$",
        countryCode: "US",
        title: "امریکی ڈالر (ACH / روٹنگ) - شیرین گل احمدی",
        subtitle: "براہ راست امریکی گھریلو بینک ٹرانسفر / Wirex",
        beneficiary: "Shirin Gol Ahmadi",
        accountNumber: "214222579029",
        routingNumber: "101019644",
        bankName: "Wirex USA",
        note: "کم از کم رقم 1 ڈالر ہے (اس سے کم رقم مسترد کر دی جائے گی)"
      },
      {
        id: "eur_malta_shirin",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالٹا) - شیرین گل احمدی",
        subtitle: "سنگل یورو ادائیگیوں کا علاقہ (SEPA)",
        beneficiary: "Shirin Gol Ahmadi",
        iban: "MT92CFTE28004000000000006678211",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "gbp_uk",
        currency: "GBP",
        currencySymbol: "£",
        countryCode: "GB",
        title: "برطانوی پاؤنڈ (یو کے فاسٹر پیمنٹس)",
        subtitle: "براہ راست یو کے گھریلو ٹرانسفر / BACS",
        beneficiary: "SHAHEEN SAFI",
        sortCode: "60-83-82",
        accountNumber: "47508069",
        bankName: "BANKING CIRCLE UK",
        bankAddress: "24 KING WILLIAM STREET, LONDON"
      },
      {
        id: "eur_malta_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "MT",
        title: "یورو SEPA (مالٹا) - شاہین صافی",
        subtitle: "سنگل یورو ادائیگیوں کا علاقہ (SEPA)",
        beneficiary: "Shaheen Safi",
        iban: "MT42CFTE2800400000000005958401",
        bic: "CFTEMTM1",
        bankName: "BANKING CIRCLE (MALTA)",
        bankAddress: "Malta"
      },
      {
        id: "eur_lux_shaheen",
        currency: "EUR",
        currencySymbol: "€",
        countryCode: "LU",
        title: "یورو SEPA (لکسمبرگ) - شاہین صافی",
        subtitle: "کراس بارڈر SEPA ٹرانسفر",
        beneficiary: "SHAHEEN SAFI",
        iban: "LU064080000047474342",
        bic: "BCIRLULL",
        bankName: "BANKING CIRCLE S.A.",
        bankAddress: "2 BOULEVARD DE LA FOIRE, LUXEMBOURG"
      }
    ]
  }
};

// Copy standard templates for remaining 14 languages with accurate localized titles
const otherLocales = {
  de: {
    girlsEnrolled: "Eingeschriebene Schülerinnen",
    freeScholarships: "100% Kostenlose Stipendien",
    liveClassrooms: "Live-Klassenzimmer",
    cancelBtn: "Abbrechen & Betrag ändern",
    verifiedScholarship: "Verifizierte Stipendiatin",
    donorNamePlaceholder: "z.B. Max Mustermann",
    donorEmailPlaceholder: "z.B. max@beispiel.de",
    txIdPlaceholder: "Referenznummer auf Ihrem Überweisungsbeleg",
    alertFillRequired: "Bitte geben Sie Name, E-Mail und Überweisungsbetrag an.",
    alertNetworkError: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    alertMinDonation: "Die Mindestspende beträgt 5 $.",
    alertSubmitFailed: "Übermittlung des Belegs fehlgeschlagen.",
    titleSuffix: "Direkte Banküberweisung",
    sepaTitle: "Europäischer SEPA-Zahlungsraum",
    ukTitle: "Direkte UK-Inlandsüberweisung"
  },
  fr: {
    girlsEnrolled: "Filles inscrites",
    freeScholarships: "Bourses 100% gratuites",
    liveClassrooms: "Salles de classe en direct",
    cancelBtn: "Annuler et modifier le montant",
    verifiedScholarship: "Bénéficiaire de bourse vérifiée",
    donorNamePlaceholder: "ex. Jean Dupont",
    donorEmailPlaceholder: "ex. jean@exemple.fr",
    txIdPlaceholder: "Numéro de référence sur votre avis d'opéré",
    alertFillRequired: "Veuillez indiquer votre nom, email et le montant.",
    alertNetworkError: "Erreur réseau. Veuillez réessayer.",
    alertMinDonation: "Le don minimum est de 5 $.",
    alertSubmitFailed: "Échec de l'envoi du reçu.",
    titleSuffix: "Virement bancaire direct",
    sepaTitle: "Espace unique de paiement en euros (SEPA)",
    ukTitle: "Virement domestique au Royaume-Uni"
  },
  es: {
    girlsEnrolled: "Niñas matriculadas",
    freeScholarships: "Becas 100% gratuitas",
    liveClassrooms: "Aulas virtuales en vivo",
    cancelBtn: "Cancelar y cambiar monto",
    verifiedScholarship: "Becaria verificada",
    donorNamePlaceholder: "ej. Carlos Pérez",
    donorEmailPlaceholder: "ej. carlos@ejemplo.es",
    txIdPlaceholder: "Código de referencia en el justificante bancario",
    alertFillRequired: "Por favor complete nombre, correo y monto.",
    alertNetworkError: "Error de red. Inténtelo de nuevo.",
    alertMinDonation: "La donación mínima es de $5.",
    alertSubmitFailed: "Error al enviar el comprobante.",
    titleSuffix: "Transferencia bancaria directa",
    sepaTitle: "Zona Única de Pagos en Euros (SEPA)",
    ukTitle: "Transferencia nacional en el Reino Unido"
  },
  ru: {
    girlsEnrolled: "Девушек зачислено",
    freeScholarships: "100% бесплатные стипендии",
    liveClassrooms: "Онлайн-классы",
    cancelBtn: "Отмена и изменение суммы",
    verifiedScholarship: "Подтвержденная стипендиатка",
    donorNamePlaceholder: "напр. Иван Иванов",
    donorEmailPlaceholder: "напр. ivan@example.com",
    txIdPlaceholder: "Номер квитанции или код перевода",
    alertFillRequired: "Пожалуйста, заполните имя, email и сумму перевода.",
    alertNetworkError: "Ошибка сети. Пожалуйста, повторите попытку.",
    alertMinDonation: "Минимальное пожертвование составляет 5 $.",
    alertSubmitFailed: "Не удалось отправить квитанцию.",
    titleSuffix: "Прямой банковский перевод",
    sepaTitle: "Единая европейская зона платежей в евро (SEPA)",
    ukTitle: "Прямой внутренний перевод по Великобритании"
  },
  tr: {
    girlsEnrolled: "Kayıtlı Kız Öğrenci",
    freeScholarships: "%100 Ücretsiz Burs",
    liveClassrooms: "Canlı Sınıflar",
    cancelBtn: "İptal Et ve Tutarı Değiştir",
    verifiedScholarship: "Onaylı Burslu Öğrenci",
    donorNamePlaceholder: "Örn. Ahmet Yılmaz",
    donorEmailPlaceholder: "Örn. ahmet@ornek.com",
    txIdPlaceholder: "Banka dekontundaki referans numarası",
    alertFillRequired: "Lütfen adınızı, e-postanızı ve transfer tutarını doldurun.",
    alertNetworkError: "Ağ hatası. Lütfen tekrar deneyin.",
    alertMinDonation: "Minimum bağış tutarı 5$'dır.",
    alertSubmitFailed: "Dekont gönderilemedi.",
    titleSuffix: "Doğrudan Banka Transferi",
    sepaTitle: "Tek Euro Ödeme Alanı (SEPA)",
    ukTitle: "Birleşik Krallık İçi Transfer"
  },
  zh: {
    girlsEnrolled: "在读女生人数",
    freeScholarships: "100% 全额免费奖学金",
    liveClassrooms: "实时在线课堂",
    cancelBtn: "取消并更改金额",
    verifiedScholarship: "已认证奖学金获得者",
    donorNamePlaceholder: "例：张伟",
    donorEmailPlaceholder: "例：zhangwei@example.com",
    txIdPlaceholder: "银行凭证上的参考编号或交易流水号",
    alertFillRequired: "请填写您的姓名、电子邮箱及转账金额。",
    alertNetworkError: "网络错误，请重试或直接联系我们。",
    alertMinDonation: "最低捐赠金额为 5 美元。",
    alertSubmitFailed: "转账凭证提交失败。",
    titleSuffix: "直接银行转账",
    sepaTitle: "单一欧元支付区 (SEPA)",
    ukTitle: "英国国内直接转账"
  },
  hi: {
    girlsEnrolled: "नामांकित बालिकाएं",
    freeScholarships: "100% निःशुल्क छात्रवृत्ति",
    liveClassrooms: "लाइव कक्षाएं",
    cancelBtn: "रद्द करें और राशि बदलें",
    verifiedScholarship: "सत्यापित छात्रवृत्ति प्राप्तकर्ता",
    donorNamePlaceholder: "उदा. राहुल शर्मा",
    donorEmailPlaceholder: "उदा. rahul@example.com",
    txIdPlaceholder: "बैंक पर्ची पर संदर्भ या लेनदेन संख्या",
    alertFillRequired: "कृपया अपना नाम, ईमेल और ट्रांसफर राशि भरें।",
    alertNetworkError: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",
    alertMinDonation: "न्यूनतम दान $5 है।",
    alertSubmitFailed: "रसीद जमा करने में विफल।",
    titleSuffix: "सीधा बैंक ट्रांसफर",
    sepaTitle: "एकल यूरो भुगतान क्षेत्र (SEPA)",
    ukTitle: "प्रत्यक्ष यूके घरेलू ट्रांसफर"
  },
  it: {
    girlsEnrolled: "Ragazze iscritte",
    freeScholarships: "Borse di studio al 100% gratuite",
    liveClassrooms: "Aule virtuali dal vivo",
    cancelBtn: "Annulla e modifica importo",
    verifiedScholarship: "Borsista verificata",
    donorNamePlaceholder: "es. Marco Rossi",
    donorEmailPlaceholder: "es. marco@esempio.it",
    txIdPlaceholder: "Codice di riferimento sulla ricevuta bancaria",
    alertFillRequired: "Inserisci nome, email e importo del bonifico.",
    alertNetworkError: "Errore di rete. Riprova più tardi.",
    alertMinDonation: "La donazione minima è di 5$.",
    alertSubmitFailed: "Invio ricevuta non riuscito.",
    titleSuffix: "Bonifico bancario diretto",
    sepaTitle: "Area unica dei pagamenti in euro (SEPA)",
    ukTitle: "Bonifico diretto nel Regno Unito"
  },
  pt: {
    girlsEnrolled: "Meninas matriculadas",
    freeScholarships: "Bolsas 100% gratuitas",
    liveClassrooms: "Salas de aula ao vivo",
    cancelBtn: "Cancelar e alterar valor",
    verifiedScholarship: "Bolsista verificada",
    donorNamePlaceholder: "ex. João Silva",
    donorEmailPlaceholder: "ex. joao@exemplo.pt",
    txIdPlaceholder: "Código de referência no comprovante bancário",
    alertFillRequired: "Por favor preencha nome, email e valor da transferência.",
    alertNetworkError: "Erro de rede. Tente novamente.",
    alertMinDonation: "A doação mínima é de $5.",
    alertSubmitFailed: "Falha ao enviar o comprovante.",
    titleSuffix: "Transferência bancária direta",
    sepaTitle: "Área Única de Pagamentos em Euros (SEPA)",
    ukTitle: "Transferência doméstica no Reino Unido"
  },
  ja: {
    girlsEnrolled: "在籍女子生徒数",
    freeScholarships: "100% 無料奨学金",
    liveClassrooms: "ライブ講義室",
    cancelBtn: "キャンセルして金額を変更",
    verifiedScholarship: "認定奨学生",
    donorNamePlaceholder: "例：山田 太郎",
    donorEmailPlaceholder: "例：yamada@example.jp",
    txIdPlaceholder: "銀行振込明細の参照番号または照会番号",
    alertFillRequired: "お名前、メールアドレス、振込金額を入力してください。",
    alertNetworkError: "ネットワークエラーが発生しました。再試行してください。",
    alertMinDonation: "最低寄付額は5ドルです。",
    alertSubmitFailed: "明細の送信に失敗しました。",
    titleSuffix: "直接銀行振込",
    sepaTitle: "単一ユーロ決済圏 (SEPA)",
    ukTitle: "英国国内直接振込"
  },
  ko: {
    girlsEnrolled: "등록된 여학생 수",
    freeScholarships: "100% 전액 무료 장학금",
    liveClassrooms: "실시간 라이브 강의실",
    cancelBtn: "취소 및 금액 변경",
    verifiedScholarship: "인증된 장학생",
    donorNamePlaceholder: "예: 김철수",
    donorEmailPlaceholder: "예: chulsoo@example.kr",
    txIdPlaceholder: "은행 입금 영수증의 참조 번호",
    alertFillRequired: "이름, 이메일, 송금 금액을 입력해 주세요.",
    alertNetworkError: "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
    alertMinDonation: "최소 기부 금액은 $5입니다.",
    alertSubmitFailed: "영수증 제출에 실패했습니다.",
    titleSuffix: "직접 은행 송금",
    sepaTitle: "단일 유로 결제 구역 (SEPA)",
    ukTitle: "영국 국내 직접 송금"
  },
  nl: {
    girlsEnrolled: "Meisjes ingeschreven",
    freeScholarships: "100% Gratis beurzen",
    liveClassrooms: "Live virtuele lokalen",
    cancelBtn: "Annuleren & bedrag wijzigen",
    verifiedScholarship: "Geverifieerde beursontvanger",
    donorNamePlaceholder: "bijv. Jan de Vries",
    donorEmailPlaceholder: "bijv. jan@voorbeeld.nl",
    txIdPlaceholder: "Referentienummer op uw bankafschrift",
    alertFillRequired: "Vul uw naam, e-mail en overschrijvingsbedrag in.",
    alertNetworkError: "Netwerkfout. Probeer het opnieuw.",
    alertMinDonation: "Minimale donatie is $5.",
    alertSubmitFailed: "Verzenden van overschrijvingsbewijs mislukt.",
    titleSuffix: "Directe bankoverschrijving",
    sepaTitle: "Gemeenschappelijke Europese betalingsruimte (SEPA)",
    ukTitle: "Binnenlandse overschrijving in het VK"
  },
  uz: {
    girlsEnrolled: "Ro'yxatdan o'tgan qizlar",
    freeScholarships: "100% Bepul grantlar",
    liveClassrooms: "Jonli dars xonalari",
    cancelBtn: "Bekor qilish va miqdorni o'zgartirish",
    verifiedScholarship: "Tasdiqlangan stipendiat",
    donorNamePlaceholder: "masalan: Jasur Alimov",
    donorEmailPlaceholder: "masalan: jasur@example.uz",
    txIdPlaceholder: "Bank kvitansiyasidagi to'lov kodi",
    alertFillRequired: "Ismingiz, emailingiz va summani to'ldiring.",
    alertNetworkError: "Tarmoq xatosi. Iltimos qayta urinib ko'ring.",
    alertMinDonation: "Minimal xayriya miqdori $5.",
    alertSubmitFailed: "Kvitansiyani yuborishda xatolik yuz berdi.",
    titleSuffix: "To'g'ridan-to'g'ri bank o'tkazmasi",
    sepaTitle: "Yagona yevro to'lov hududi (SEPA)",
    ukTitle: "Buyuk Britaniya ichki o'tkazmasi"
  },
  id: {
    girlsEnrolled: "Siswi Terdaftar",
    freeScholarships: "100% Beasiswa Gratis",
    liveClassrooms: "Ruang Kelas Live",
    cancelBtn: "Batal & Ubah Nominal",
    verifiedScholarship: "Penerima Beasiswa Terverifikasi",
    donorNamePlaceholder: "contoh: Budi Santoso",
    donorEmailPlaceholder: "contoh: budi@contoh.id",
    txIdPlaceholder: "Kode referensi pada bukti transfer",
    alertFillRequired: "Harap isi nama, email, dan nominal transfer.",
    alertNetworkError: "Kesalahan jaringan. Silakan coba lagi.",
    alertMinDonation: "Donasi minimum adalah $5.",
    alertSubmitFailed: "Gagal mengirim bukti transfer.",
    titleSuffix: "Transfer Bank Langsung",
    sepaTitle: "Area Pembayaran Euro Tunggal (SEPA)",
    ukTitle: "Transfer Domestik Inggris Langsung"
  }
};

// Generate localized accounts for other locales
Object.keys(otherLocales).forEach(l => {
  const o = otherLocales[l];
  const enAccs = bankTranslations.en.bankAccounts;
  bankTranslations[l] = {
    girlsEnrolled: o.girlsEnrolled,
    freeScholarships: o.freeScholarships,
    liveClassrooms: o.liveClassrooms,
    cancelBtn: o.cancelBtn,
    verifiedScholarship: o.verifiedScholarship,
    donorNamePlaceholder: o.donorNamePlaceholder,
    donorEmailPlaceholder: o.donorEmailPlaceholder,
    txIdPlaceholder: o.txIdPlaceholder,
    alertFillRequired: o.alertFillRequired,
    alertNetworkError: o.alertNetworkError,
    alertMinDonation: o.alertMinDonation,
    alertSubmitFailed: o.alertSubmitFailed,
    bankAccounts: [
      {
        ...enAccs[0],
        subtitle: `${enAccs[0].subtitle} (${o.titleSuffix})`
      },
      {
        ...enAccs[1],
        subtitle: o.sepaTitle
      },
      {
        ...enAccs[2],
        subtitle: o.ukTitle
      },
      {
        ...enAccs[3],
        subtitle: o.sepaTitle
      },
      {
        ...enAccs[4],
        subtitle: `${o.sepaTitle}`
      }
    ]
  };
});

// Update each dictionary file
locales.forEach(loc => {
  const dictPath = path.join(__dirname, 'src', 'dictionaries', `${loc}.json`);
  if (!fs.existsSync(dictPath)) return;
  const content = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  
  const trans = bankTranslations[loc] || bankTranslations.en;
  content.donate = {
    ...content.donate,
    girlsEnrolled: trans.girlsEnrolled,
    freeScholarships: trans.freeScholarships,
    liveClassrooms: trans.liveClassrooms,
    cancelBtn: trans.cancelBtn,
    verifiedScholarship: trans.verifiedScholarship,
    donorNamePlaceholder: trans.donorNamePlaceholder,
    donorEmailPlaceholder: trans.donorEmailPlaceholder,
    txIdPlaceholder: trans.txIdPlaceholder,
    alertFillRequired: trans.alertFillRequired,
    alertNetworkError: trans.alertNetworkError,
    alertMinDonation: trans.alertMinDonation,
    alertSubmitFailed: trans.alertSubmitFailed,
    bankAccounts: trans.bankAccounts
  };

  fs.writeFileSync(dictPath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Updated src/dictionaries/${loc}.json with complete bank details and labels`);

  // Also sync to src/utils/translations/{loc}.json
  const portalPath = path.join(__dirname, 'src', 'utils', 'translations', `${loc}.json`);
  if (fs.existsSync(portalPath)) {
    const portalContent = JSON.parse(fs.readFileSync(portalPath, 'utf8'));
    portalContent.donate = content.donate;
    fs.writeFileSync(portalPath, JSON.stringify(portalContent, null, 2), 'utf8');
    console.log(`Synced src/utils/translations/${loc}.json`);
  }
});

console.log("All 19 dictionaries successfully populated!");
