"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";

import { Suspense, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ArrowRight, Home, ShieldCheck } from "lucide-react";
import { trackPurchaseConversion } from "@/lib/gtag";
import { getDonateTranslation } from "@/utils/donateTranslations";

const SUCCESS_TRANSLATIONS: Record<string, {
  badge: string;
  title1: string;
  title2: string;
  desc: string;
  refId: string;
  homeBtn: string;
  coursesBtn: string;
}> = {
  en: {
    badge: "Payment Confirmed",
    title1: "Thank You for Your",
    title2: "Support & Defiance!",
    desc: "Your contribution directly powers digital classrooms, scholarships, and borderless education for Afghan girls and women. A receipt has been sent to your email.",
    refId: "Reference ID",
    homeBtn: "Return Home",
    coursesBtn: "Explore Courses"
  },
  fa: {
    badge: "پرداخت با موفقیت تأیید شد",
    title1: "سپاس صمیمانه از همبستگی و",
    title2: "حمایت شجاعانه شما!",
    desc: "کمک ارزشمند شما مستقیماً کلاس‌های درس دیجیتال، بورسیه‌های تحصیلی و آموزش نامحدود دختران و زنان شجاع افغانستان را تأمین مالی می‌کند. رسید رسمی به ایمیل شما ارسال شد.",
    refId: "کد پیگیری تراکنش",
    homeBtn: "بازگشت به صفحه اصلی",
    coursesBtn: "مشاهده دوره‌های آموزشی"
  },
  ps: {
    badge: "تادیه په بریالیتوب سره تایید شوه",
    title1: "ستاسو د همپالنې او",
    title2: "زړور ملاتړ څخه ډېره مننه!",
    desc: "ستاسو مرسته مستقیماً د افغان نجونو او ښځو لپاره ډیجیټل ټولګي، تحصیلي بورسونه او وړیا زده کړې برابروي. رسمي رسید ستاسو بریښنالیک ته ولیږل شو.",
    refId: "د معاملې حواله نمبر",
    homeBtn: "اصلي پاڼې ته ستنیدل",
    coursesBtn: "د کورسونو لیدل"
  },
  ar: {
    badge: "تم تأكيد الدفع بنجاح",
    title1: "شكراً جزيلاً لتضامنكم و",
    title2: "دعمكم الشجاع!",
    desc: "مساهمتك السخية تمول مباشرة الفصول الدراسية الرقمية والمنح التعليمية للفتيات والنساء الأفغانيات. تم إرسال الإيصال الرسمي إلى بريدك الإلكتروني.",
    refId: "الرقم المرجعي للمعاملة",
    homeBtn: "العودة للرئيسية",
    coursesBtn: "استكشاف الدورات"
  },
  ur: {
    badge: "ادائیگی کامیابی سے تصدیق شدہ",
    title1: "آپ کے غیر متزلزل تعاون اور",
    title2: "بہادرانہ حمایت کا شکریہ!",
    desc: "آپ کا عطیہ براہ راست افغان لڑکیوں اور خواتین کے لیے ڈیجیٹل کلاس رومز اور اسکالرشپس فراہم کرتا ہے۔ رسید آپ کے ای میل پر بھیج دی گئی ہے۔",
    refId: "ٹرانزیکشن ریفرنس آئی ڈی",
    homeBtn: "مرکزی صفحہ پر واپس جائیں",
    coursesBtn: "کورسز دیکھیں"
  },
  de: {
    badge: "Zahlung bestätigt",
    title1: "Vielen Dank für Ihre",
    title2: "Unterstützung & Solidarität!",
    desc: "Ihr Beitrag finanziert direkt digitale Klassenzimmer, Stipendien und grenzenlose Bildung für afghanische Mädchen und Frauen. Ein Beleg wurde an Ihre E-Mail gesendet.",
    refId: "Referenz-ID",
    homeBtn: "Zur Startseite",
    coursesBtn: "Kurse entdecken"
  },
  fr: {
    badge: "Paiement confirmé",
    title1: "Merci pour votre",
    title2: "Soutien & Solidarité !",
    desc: "Votre don finance directement des salles de classe numériques, des bourses et une éducation sans frontières pour les filles et femmes afghanes. Un reçu a été envoyé par e-mail.",
    refId: "Identifiant de référence",
    homeBtn: "Retour à l'accueil",
    coursesBtn: "Explorer les cours"
  },
  es: {
    badge: "Pago confirmado",
    title1: "¡Gracias por su",
    title2: "Apoyo y Valentía!",
    desc: "Su contribución impulsa directamente aulas digitales, becas y educación sin fronteras para niñas y mujeres afganas. Se ha enviado un recibo a su correo.",
    refId: "ID de referencia",
    homeBtn: "Volver al inicio",
    coursesBtn: "Explorar cursos"
  },
  ru: {
    badge: "Платёж подтверждён",
    title1: "Спасибо за вашу",
    title2: "Поддержку и Стойкость!",
    desc: "Ваш вклад напрямую финансирует цифровые классы, стипендии и образование без границ для афганских девушек и женщин. Квитанция отправлена на ваш email.",
    refId: "Номер транзакции",
    homeBtn: "На главную",
    coursesBtn: "Все курсы"
  },
  tr: {
    badge: "Ödeme Onaylandı",
    title1: "Desteğiniz ve",
    title2: "Cesaretiniz İçin Teşekkürler!",
    desc: "Bağışınız, Afgan kızları ve kadınları için dijital sınıfları, bursları ve sınırsız eğitimi doğrudan finanse eder. Makbuz e-postanıza gönderildi.",
    refId: "Referans Kodu",
    homeBtn: "Ana Sayfaya Dön",
    coursesBtn: "Kursları Keşfet"
  },
  zh: {
    badge: "付款已确认",
    title1: "衷心感谢您的",
    title2: "坚定支持与奉献！",
    desc: "您的捐助将直接支持阿富汗女性的数字课堂、奖学金与无界教育。收据已发送至您的电子邮箱。",
    refId: "交易参考号",
    homeBtn: "返回首页",
    coursesBtn: "探索课程"
  },
  hi: {
    badge: "भुगतान की पुष्टि हुई",
    title1: "आपके बहुमूल्य",
    title2: "समर्थन और साहस के लिए धन्यवाद!",
    desc: "आपका योगदान अफगान लड़कियों और महिलाओं के लिए डिजिटल कक्षाओं और छात्रवृत्तियों का सीधा समर्थन करता है। रसीद आपके ईमेल पर भेज दी गई है।",
    refId: "संदर्भ आईडी",
    homeBtn: "होम पेज पर लौटें",
    coursesBtn: "कोर्स देखें"
  },
  it: {
    badge: "Pagamento confermato",
    title1: "Grazie per il vostro",
    title2: "Sostegno e Coraggio!",
    desc: "Il tuo contributo finanzia direttamente aule digitali, borse di studio e istruzione senza confini per ragazze e donne afghane. Una ricevuta è stata inviata alla tua email.",
    refId: "ID di riferimento",
    homeBtn: "Torna alla home",
    coursesBtn: "Esplora i corsi"
  },
  pt: {
    badge: "Pagamento confirmado",
    title1: "Obrigado pelo seu",
    title2: "Apoio e Coragem!",
    desc: "Sua contribuição financia diretamente salas de aula digitais, bolsas e educação sem fronteiras para meninas e mulheres afegãs. O recibo foi enviado por e-mail.",
    refId: "ID de referência",
    homeBtn: "Voltar ao início",
    coursesBtn: "Explorar cursos"
  },
  ja: {
    badge: "お支払いが確認されました",
    title1: "皆様の温かい",
    title2: "ご支援と連帯に心より感謝申し上げます！",
    desc: "皆様のご寄付はアフガニスタンの少女や女性のためのデジタル教室や奨学金、国境のない教育に直接役立てられます。領収書をメールに送信しました。",
    refId: "参照ID",
    homeBtn: "ホームへ戻る",
    coursesBtn: "コースを見る"
  },
  ko: {
    badge: "결제가 확인되었습니다",
    title1: "따뜻한 연대와",
    title2: "후원에 깊이 감사드립니다!",
    desc: "여러분의 후원은 아프간 소녀들과 여성들을 위한 디지털 교실, 장학금 및 국경 없는 교육에 직접 사용됩니다. 영수증이 이메일로 발송되었습니다.",
    refId: "참조 ID",
    homeBtn: "홈으로 돌아가기",
    coursesBtn: "강좌 둘러보기"
  },
  nl: {
    badge: "Betaling bevestigd",
    title1: "Hartelijk dank voor uw",
    title2: "Steun & Solidariteit!",
    desc: "Uw bijdrage financiert direct digitale klaslokalen, beurzen en onderwijs zonder grenzen voor Afghaanse meisjes en vrouwen. Een ontvangstbewijs is naar uw e-mail verzonden.",
    refId: "Referentie-ID",
    homeBtn: "Terug naar startpagina",
    coursesBtn: "Bekijk cursussen"
  },
  uz: {
    badge: "Toʻlov tasdiqlandi",
    title1: "Samimiy birdamlik va",
    title2: "Jasoratli qoʻllab-quvvatlashingiz uchun rahmat!",
    desc: "Sizning hissangiz afgʻon qizlari va ayollari uchun raqamli sinflar, stipendiyalar va cheksiz taʼlimni toʻgʻridan-toʻgʻri taʼminlaydi. Kvitansiya elektron pochtangizga yuborildi.",
    refId: "Tranzaksiya IDsi",
    homeBtn: "Bosh sahifaga qaytish",
    coursesBtn: "Kurslarni koʻrish"
  },
  id: {
    badge: "Pembayaran Dikonfirmasi",
    title1: "Terima kasih atas",
    title2: "Dukungan & Keberanian Anda!",
    desc: "Kontribusi Anda secara langsung mendanai ruang kelas digital, beasiswa, dan pendidikan tanpa batas untuk anak perempuan dan perempuan Afghanistan. Tanda terima telah dikirim ke email Anda.",
    refId: "ID Referensi",
    homeBtn: "Kembali ke Beranda",
    coursesBtn: "Jelajahi Kursus"
  }
};

function DonationSuccessContent() {
  const pathname = usePathname() || "/en";
  const currentLocale = (pathname.split("/")[1] || "en").toLowerCase();
  const dt = getDonateTranslation(currentLocale);
  const isRtl = dt.isRtl;
  const t = SUCCESS_TRANSLATIONS[currentLocale] || SUCCESS_TRANSLATIONS.en;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  useEffect(() => {
    // Dynamic conversion event firing with session id
    trackPurchaseConversion({
      value: 1.0,
      currency: "GBP",
      transactionId: sessionId,
    });
  }, [sessionId]);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      {/* Static Google Ads Event Snippet for Verification Crawlers */}
      <Script
        id="google-ads-purchase-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                'send_to': 'AW-18447660056/A5oFCJ2I4vUcEJjow9xE',
                'value': 1.0,
                'currency': 'GBP',
                'transaction_id': '${sessionId}'
              });
            }
          `,
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest mb-6">
        <Heart size={14} className="fill-yellow-500/40 text-yellow-500" />
        {t.badge}
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
        {t.title1} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
          {t.title2}
        </span>
      </h1>

      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
        {t.desc}
      </p>

      {sessionId && (
        <div className="mb-10 p-4 bg-white/[0.02] border border-white/10 rounded-2xl max-w-md mx-auto text-left rtl:text-right">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            <ShieldCheck size={14} className="text-emerald-400" /> {t.refId}
          </div>
          <p className="text-xs font-mono text-neutral-300 break-all select-all">
            {sessionId}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/${currentLocale}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-xs tracking-widest transition-all shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:scale-105"
        >
          <Home size={16} /> {t.homeBtn}
        </Link>
        <Link
          href={`/${currentLocale}/courses`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase text-xs tracking-widest transition-all"
        >
          {t.coursesBtn} <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;
  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden relative" >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[180px]"></div>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">{t.publicPages.loadingConfirmation}</div>}>
        <DonationSuccessContent />
      </Suspense>
    </main>
  );
}
