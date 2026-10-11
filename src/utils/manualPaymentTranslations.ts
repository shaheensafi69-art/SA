// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES MANUAL PAYMENT GATEWAY TRANSLATIONS
// ============================================================================

export interface ManualPaymentStep {
  title: string;
  desc: string;
}

export interface ManualPaymentTranslation {
  isRtl: boolean;
  hesabTitle: string;
  hesabSubtitle: string;
  hesabAppHint: string;
  hesabSteps: ManualPaymentStep[];
  atomaTitle: string;
  atomaSubtitle: string;
  atomaAppHint: string;
  atomaSteps: ManualPaymentStep[];
  qrCardTitle: string;
  scanWithApp: string;
  merchantPhone: string;
  copyNumber: string;
  copied: string;
  verificationFormTitle: string;
  verificationFormDesc: string;
  payerNameLabel: string;
  payerNamePlaceholder: string;
  payerPhoneLabel: string;
  payerPhonePlaceholder: string;
  txIdLabel: string;
  txIdPlaceholder: string;
  paidAmountLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitBtn: string;
  submittingBtn: string;
  successTitle: string;
  successDesc: string;
  errorDesc: string;
  whatsappBtn: string;
}

export const manualPaymentTranslations: Record<string, ManualPaymentTranslation> = {
  "en": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "fa": {
    "isRtl": true,
    "hesabTitle": "درگاه پرداخت رسمی حساب‌پی (HesabPay)",
    "hesabSubtitle": "انتقال وجه آنی و پرداخت دیجیتال امن در سراسر افغانستان بدون نیاز به کارت‌های بین‌المللی",
    "hesabAppHint": "قابل پرداخت از طریق تمامی حساب‌های بانکی متصل به شبکه حساب‌پی و اپلیکیشن موبایل",
    "hesabSteps": [
      {
        "title": "۱. باز کردن اپلیکیشن حساب‌پی",
        "desc": "اپلیکیشن HesabPay را در گوشی خود باز کرده و وارد حساب کاربری خود شوید."
      },
      {
        "title": "۲. اسکن کیو آر کد یا ورود شماره",
        "desc": "گزینه «اسکن QR» را زده و کد روبرو را اسکن کنید، یا شماره 0796040415 را در بخش انتقال وجه وارد نمایید."
      },
      {
        "title": "۳. وارد کردن مبلغ و شناسه",
        "desc": "مبلغ فاکتور را به افغانی یا دالر درج کرده و در توضیحات نام یا شماره سفارش خود را بنویسید."
      },
      {
        "title": "۴. تکمیل و ثبت رسید پرداخت",
        "desc": "پس از تکمیل تراکنش، شناسه پیگیری (TxID) را در فرم زیر وارد کرده یا رسید را در واتساپ بفرستید."
      }
    ],
    "atomaTitle": "درگاه پرداخت رسمی اتوماپی (AtomaPay)",
    "atomaSubtitle": "سامانه هوشمند و امن تبادلات مالی سریع و مستقیم در افغانستان با تایید آنی",
    "atomaAppHint": "پشتیبانی از انتقال مستقیم، کیف‌پول اتوما و تسویه سریع در شبکه صرافی‌ها و بانک‌ها",
    "atomaSteps": [
      {
        "title": "۱. باز کردن اپلیکیشن اتوماپی",
        "desc": "وارد اپلیکیشن یا پورتال کاربری اتوماپی در گوشی هوشمند خود شوید."
      },
      {
        "title": "۲. اسکن کیو آر کد یا شماره حساب",
        "desc": "کیو آر کد روبرو را اسکن نموده یا شماره 0773449567 را جهت ارسال وجه انتخاب کنید."
      },
      {
        "title": "۳. مشخص نمودن مبلغ قابل پرداخت",
        "desc": "مبلغ مشخص‌شده سفارش را وارد نموده و در فیلد شرح تراکنش، نام خریدار را ذکر نمایید."
      },
      {
        "title": "۴. ارسال رسید و تایید فوری",
        "desc": "شناسه تراکنش (کد ارجاع) را در فرم زیر درج کنید تا تیم فنی سرویس شما را فعال نماید."
      }
    ],
    "qrCardTitle": "کیو آر کد رسمی حساب تجاری",
    "scanWithApp": "با اپلیکیشن بانکی اسکن کنید یا تصویر را ذخیره نمایید",
    "merchantPhone": "شماره حساب / شماره موبایل گیرنده",
    "copyNumber": "کپی شماره",
    "copied": "کپی شد!",
    "verificationFormTitle": "ثبت مشخصات و تایید رسید پرداخت",
    "verificationFormDesc": "پس از واریز، مشخصات تراکنش را در فرم زیر وارد کنید تا سفارش شما فوراً فعال و ارسال گردد.",
    "payerNameLabel": "نام و تخلص پرداخت‌کننده",
    "payerNamePlaceholder": "مثلاً: احمد کریمی",
    "payerPhoneLabel": "شماره تماس / واتساپ",
    "payerPhonePlaceholder": "0700000000",
    "txIdLabel": "شناسه تراکنش یا کد پیگیری (TxID)",
    "txIdPlaceholder": "کد پیگیری تراکنش در رسید بانکی",
    "paidAmountLabel": "مبلغ واریز شده",
    "notesLabel": "توضیحات تکمیلی (اختیاری)",
    "notesPlaceholder": "هرگونه نکته درباره سفارش یا روش پرداخت...",
    "submitBtn": "ثبت و تایید رسید پرداخت",
    "submittingBtn": "در حال ثبت تراکنش...",
    "successTitle": "رسید پرداخت با موفقیت ثبت شد!",
    "successDesc": "اطلاعات پرداخت شما با موفقیت دریافت گردید. تیم پشتیبانی پس از تطبیق فوری، سفارش شما را فعال خواهد کرد.",
    "errorDesc": "خطا در ثبت اطلاعات. لطفاً مجدداً تلاش کنید یا رسید را مستقیماً در واتساپ ارسال فرمایید.",
    "whatsappBtn": "ارسال مستقیم رسید در واتساپ"
  },
  "ps": {
    "isRtl": true,
    "hesabTitle": "د حساب‌پی (HesabPay) رسمي درګاه",
    "hesabSubtitle": "په ټول افغانستان کې سمدستي او خوندي ډیجیټل تادیه پرته له کوم نړیوال بانکي فیس څخه",
    "hesabAppHint": "د حساب‌پی شبکې سره وصل ټولو بانکي حسابونو له لارې د تادیې وړ",
    "hesabSteps": [
      {
        "title": "۱. د حساب‌پی اپلیکیشن پرانیزئ",
        "desc": "په خپل تلیفون کې د HesabPay رسمي اپلیکیشن پرانیزئ او خپل حساب ته ننوځئ."
      },
      {
        "title": "۲. د QR کوډ سکین کړئ یا شمېره ولیکئ",
        "desc": "د QR سکین کولو انتخاب وټاکئ یا 0796040415 شمېره د پیسو لیږلو لپاره وکاروئ."
      },
      {
        "title": "۳. د پیسو اندازه او یادښت وټاکئ",
        "desc": "د فاکتور اندازه په افغانیو یا ډالرو وټاکئ او خپل نوم یا د آرډر شمېره پکې ولیکئ."
      },
      {
        "title": "۴. رسید تایید او وسپارئ",
        "desc": "د لیږد وروسته د ټرانزکشن شمېره لاندې فورم کې ولیکئ یا یې واټساپ ته ولیږئ."
      }
    ],
    "atomaTitle": "د اتوماپی (AtomaPay) رسمي درګاه",
    "atomaSubtitle": "په افغانستان کې د مستقیم او چټک تادیاتو هوښیار او خوندي سیسټم",
    "atomaAppHint": "د اتوما بټوې او مستقیم بانکي لېږد ملاتړ کوي",
    "atomaSteps": [
      {
        "title": "۱. د اتوماپی اپلیکیشن پرانیزئ",
        "desc": "په خپل تلیفون کې د AtomaPay اپلیکیشن ته ننوځئ."
      },
      {
        "title": "۲. د QR کوډ سکین کړئ یا شمېره ولیکئ",
        "desc": "د QR کوډ سکین کړئ یا 0773449567 شمېره د پیسو لیږلو لپاره غوره کړئ."
      },
      {
        "title": "۳. اندازه او معلومات درج کړئ",
        "desc": "د خپل آرډر اندازه ولیکئ او د پېرودونکي نوم درج کړئ."
      },
      {
        "title": "۴. رسید وسپارئ او تصدیق ترلاسه کړئ",
        "desc": "د ټرانزکشن کود په فورم کې درج کړئ ترڅو آرډر ژر تر ژره فعال شي."
      }
    ],
    "qrCardTitle": "د سوداګریز حساب رسمي QR کوډ",
    "scanWithApp": "د خپل بانکي اپلیکیشن له لارې یې سکین کړئ یا عکس خوندي کړئ",
    "merchantPhone": "د حساب شمېره / د ترلاسه کوونکي ټیلیفون",
    "copyNumber": "شمېره کاپي کړئ",
    "copied": "کاپي شوه!",
    "verificationFormTitle": "د تادیې تایید او د آرډر ثبتول",
    "verificationFormDesc": "د پیسو له لیږلو وروسته لاندې فورم ډک کړئ ترڅو ستاسو آرډر سمدلاسه فعال شي.",
    "payerNameLabel": "د تادیه کوونکي بشپړ نوم",
    "payerNamePlaceholder": "مثلاً: احمد کریمي",
    "payerPhoneLabel": "د اړیکې شمېره / واټساپ",
    "payerPhonePlaceholder": "0700000000",
    "txIdLabel": "د ټرانزکشن شمېره (TxID)",
    "txIdPlaceholder": "د بانکي رسید شمېره",
    "paidAmountLabel": "ورکړل شوې پیسې",
    "notesLabel": "اضافي یادښتونه (اختیاري)",
    "notesPlaceholder": "د خپل آرډر په اړه اضافي توضیحات...",
    "submitBtn": "د تادیې رسید واستوئ",
    "submittingBtn": "د استولو په حال کې...",
    "successTitle": "ستاسو رسید په بریالیتوب سره ثبت شو!",
    "successDesc": "ستاسو معلومات ترلاسه شول او ژر به ستاسو آرډر فعال شي.",
    "errorDesc": "د معلوماتو په ثبتولو کې ستونزه راغله. مهرباني وکړئ واټساپ له لارې اړیکه ونیسئ.",
    "whatsappBtn": "رسید مستقیماً واټساپ ته واستوئ"
  },
  "ru": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "tr": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "de": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "fr": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "ar": {
    "isRtl": true,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "ur": {
    "isRtl": true,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "es": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "zh": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "hi": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "it": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "pt": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "ja": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "ko": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "nl": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "uz": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  },
  "id": {
    "isRtl": false,
    "hesabTitle": "HesabPay Official Payment Gateway",
    "hesabSubtitle": "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
    "hesabAppHint": "Payable via all Afghan bank accounts connected to HesabPay mobile app",
    "hesabSteps": [
      {
        "title": "1. Open HesabPay App",
        "desc": "Launch the official HesabPay app on your mobile device and log in."
      },
      {
        "title": "2. Scan QR or Enter Phone",
        "desc": "Select 'Scan QR' to scan the official code below, or manually enter phone +93 796 040 415."
      },
      {
        "title": "3. Enter Amount & Reference",
        "desc": "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
      },
      {
        "title": "4. Save Receipt & Confirm",
        "desc": "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
      }
    ],
    "atomaTitle": "AtomaPay Official Payment Gateway",
    "atomaSubtitle": "Smart, secure, and instant Afghan payment network with direct merchant verification",
    "atomaAppHint": "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
    "atomaSteps": [
      {
        "title": "1. Open AtomaPay App",
        "desc": "Log in to your AtomaPay mobile application or web portal."
      },
      {
        "title": "2. Scan QR or Enter Account",
        "desc": "Scan the displayed Atoma QR code or choose send money to +93 773 449 567."
      },
      {
        "title": "3. Specify Amount & Note",
        "desc": "Specify the exact order total in AFN or USD and add your order note."
      },
      {
        "title": "4. Submit Proof & Verify",
        "desc": "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
      }
    ],
    "qrCardTitle": "Official Merchant QR Code",
    "scanWithApp": "Scan with your banking app or save image to photos",
    "merchantPhone": "Merchant Account Phone",
    "copyNumber": "Copy Number",
    "copied": "Copied!",
    "verificationFormTitle": "Payment Verification & Order Dispatch",
    "verificationFormDesc": "Submit your transaction reference below to verify your payment and trigger automated order activation.",
    "payerNameLabel": "Payer Full Name",
    "payerNamePlaceholder": "e.g. Ahmad Karimi",
    "payerPhoneLabel": "WhatsApp / Contact Phone",
    "payerPhonePlaceholder": "+93 700 000 000",
    "txIdLabel": "Transaction ID / Reference (TxID)",
    "txIdPlaceholder": "e.g. HP-98421038 or receipt code",
    "paidAmountLabel": "Amount Paid",
    "notesLabel": "Additional Notes (Optional)",
    "notesPlaceholder": "Any notes regarding your order or transfer...",
    "submitBtn": "Verify Payment & Dispatch Order",
    "submittingBtn": "Verifying Transaction...",
    "successTitle": "Payment Proof Received!",
    "successDesc": "Your payment verification has been logged. Our dispatch team is verifying the transaction and will fulfill your order shortly.",
    "errorDesc": "An error occurred submitting payment proof. Please contact us on WhatsApp directly.",
    "whatsappBtn": "Confirm Directly on WhatsApp"
  }
};

export function getManualPaymentTranslation(locale: string): ManualPaymentTranslation {
  return manualPaymentTranslations[locale] || manualPaymentTranslations.en;
}
