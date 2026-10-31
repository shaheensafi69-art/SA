"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Power, Zap } from "lucide-react";
import { isRtlPortal } from "@/utils/portalTranslations";

const notFoundTranslations: Record<string, {
  lostTitle: string;
  lostDesc: string;
  oopsTitle: string;
  oopsDesc: string;
  backHome: string;
}> = {
  en: {
    lostTitle: "Looks like you are lost...",
    lostDesc: "It's dark out here. Turn on the light to find your path.",
    oopsTitle: "404 - Page Not Found",
    oopsDesc: "The page or resource you are looking for does not exist or has been relocated.",
    backHome: "Back to Home"
  },
  fa: {
    lostTitle: "انگار مسیر را گم کرده‌اید...",
    lostDesc: "اینجا خیلی تاریک است. برای پیدا کردن راه، چراغ را روشن کنید.",
    oopsTitle: "خطای ۴۰۴ - صفحه پیدا نشد",
    oopsDesc: "متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا منتقل شده است.",
    backHome: "بازگشت به صفحه اصلی"
  },
  ps: {
    lostTitle: "داسې ښکاري چې خپله لاره مو ورکه کړې...",
    lostDesc: "دلته ډیره تیاره ده. د لارې موندلو لپاره څراغ ولګوئ.",
    oopsTitle: "۴۰۴ تېروتنه - پاڼه ونه موندل شوه",
    oopsDesc: "بښنه غواړو، هغه پاڼه چې تاسو یې لټوئ شتون نلري یا ړنګه شوې ده.",
    backHome: "اصلي پاڼې ته ستنېدل"
  },
  ar: {
    lostTitle: "يبدو أنك ضللت الطريق...",
    lostDesc: "المكان مظلم للغاية هنا. أشعل المصباح لتجد طريقك.",
    oopsTitle: "خطأ 404 - الصفحة غير موجودة",
    oopsDesc: "عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.",
    backHome: "العودة إلى الصفحة الرئيسية"
  },
  ru: {
    lostTitle: "Похоже, вы заблудились...",
    lostDesc: "Здесь слишком темно. Включите свет, чтобы найти дорогу.",
    oopsTitle: "Ошибка 404 — Страница не найдена",
    oopsDesc: "К сожалению, запрашиваемая вами страница не существует или была перемещена.",
    backHome: "Вернуться на главную"
  },
  tr: {
    lostTitle: "Görünüşe göre yolunuzu kaybettiniz...",
    lostDesc: "Burası çok karanlık. Yolunuzu bulmak için ışığı açın.",
    oopsTitle: "404 - Sayfa Bulunamadı",
    oopsDesc: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    backHome: "Ana Sayfaya Dön"
  },
  de: {
    lostTitle: "Sie haben sich anscheinend verirrt...",
    lostDesc: "Hier ist es stockdunkel. Schalten Sie das Licht ein.",
    oopsTitle: "404 - Seite nicht gefunden",
    oopsDesc: "Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.",
    backHome: "Zur Startseite"
  },
  fr: {
    lostTitle: "Vous semblez vous être égaré...",
    lostDesc: "Il fait sombre ici. Allumez la lumière pour retrouver votre chemin.",
    oopsTitle: "404 - Page Introuvable",
    oopsDesc: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil"
  },
  ur: {
    lostTitle: "ایسا لگتا ہے کہ آپ راستہ بھول گئے ہیں...",
    lostDesc: "یہاں بہت اندھیرا ہے۔ راستہ تلاش کرنے کے لیے لائٹ آن کریں۔",
    oopsTitle: "خرابی 404 - صفحہ دستیاب نہیں",
    oopsDesc: "معذرت، آپ کا مطلوبہ صفحہ موجود نہیں ہے یا منتقل کر دیا گیا ہے۔",
    backHome: "مرکزی صفحہ پر واپس جائیں"
  }
};

export default function NotFoundPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seg = window.location.pathname.split("/")[1];
      if (seg && seg in notFoundTranslations) {
        setLocale(seg);
      }
    }
  }, []);

  const t = notFoundTranslations[locale] || notFoundTranslations.en;
  const isRtl = isRtlPortal(locale);

  const turnOnLight = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  if (step === 0) {
    return (
      <section dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#040812] flex items-center justify-center relative overflow-hidden font-sans">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-slate-300/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="flex flex-col items-center justify-center space-y-8 z-10 animate-in fade-in duration-1000 px-4 text-center">
          <Moon className="w-20 h-20 text-slate-200/50 drop-shadow-[0_0_20px_rgba(226,232,240,0.3)]" />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-200 tracking-tight">
              {t.lostTitle}
            </h2>
            <p className="text-slate-400 max-w-md">
              {t.lostDesc}
            </p>
          </div>

          <button
            onClick={turnOnLight}
            className="group relative w-24 h-24 bg-[#0a1120] border border-slate-700/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-[#0f172a] transition-all"
          >
            <Power className="w-10 h-10 text-slate-500 group-hover:text-yellow-400 transition-colors" />
          </button>
        </div>
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center transition-colors duration-75">
        <div className="scale-125 transition-transform duration-75">
          <Zap className="w-40 h-40 text-yellow-500 animate-ping drop-shadow-[0_0_50px_rgba(250,204,21,1)]" />
        </div>
      </section>
    );
  }

  return (
    <section dir={isRtl ? "rtl" : "ltr"} className="bg-white font-sans min-h-screen flex items-center justify-center animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 text-center">
            <div
              className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
              aria-hidden="true"
            >
              <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8 font-black">
                404
              </h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                {t.oopsTitle}
              </h3>
              <p className="mb-6 text-neutral-600 sm:mb-5 max-w-lg mx-auto">
                {t.oopsDesc}
              </p>

              <Button
                variant="default"
                asChild
                className="my-5 bg-amber-500 hover:bg-amber-600 text-black font-black px-8 py-6 rounded-2xl shadow-xl transition-all"
              >
                <Link href={`/${locale}`}>
                  {t.backHome}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
