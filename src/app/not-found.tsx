"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Power, Zap } from "lucide-react";

export default function NotFoundPage() {
    // مراحل نمایش: 0 = تاریکی شب | 1 = لحظه اتصالی | 2 = صفحه سفید نهایی (دیزاین شما)
    const [step, setStep] = useState<0 | 1 | 2>(0);

    const turnOnLight = () => {
        setStep(1); // شروع اتصالی (فلش زدن)

        // بعد از 800 میلی‌ثانیه لامپ‌ها روشن می‌شوند و دیزاین اصلی شما بالا می‌آید
        setTimeout(() => {
            setStep(2);
        }, 800);
    };

    // -----------------------------------------------------
    // سناریو 1: تاریکی مطلق، نور مهتاب و کلید برق
    // -----------------------------------------------------
    if (step === 0) {
        return (
            <section className="min-h-screen bg-[#040812] flex items-center justify-center relative overflow-hidden font-sans">
                {/* نور مهتاب */}
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-slate-300/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="flex flex-col items-center justify-center space-y-8 z-10 animate-in fade-in duration-1000">
                    <Moon className="w-20 h-20 text-slate-200/50 drop-shadow-[0_0_20px_rgba(226,232,240,0.3)]" />

                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-slate-200 tracking-tight">
                            انگار مسیر را گم کرده‌اید...
                        </h2>
                        <p className="text-slate-400">
                            اینجا خیلی تاریک است. برای پیدا کردن راه، چراغ را روشن کنید.
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

    // -----------------------------------------------------
    // سناریو 2: لحظه اتصالی و برق گرفتگی (فلش سفید وحشتناک)
    // -----------------------------------------------------
    if (step === 1) {
        return (
            <section className="min-h-screen bg-white flex items-center justify-center transition-colors duration-75">
                <div className="scale-125 transition-transform duration-75">
                    <Zap className="w-40 h-40 text-yellow-500 animate-ping drop-shadow-[0_0_50px_rgba(250,204,21,1)]" />
                </div>
            </section>
        );
    }

    // -----------------------------------------------------
    // سناریو 3: دیزاین درخواستی شما (Shadcn + Dribbble GIF)
    // -----------------------------------------------------
    return (
        <section className="bg-white font-serif min-h-screen flex items-center justify-center animate-in fade-in duration-500">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full sm:w-10/12 md:w-8/12 text-center">

                        {/* Dribbble GIF Background */}
                        <div
                            className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
                            aria-hidden="true"
                        >
                            <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8">
                                404
                            </h1>
                        </div>

                        {/* Content Section */}
                        <div className="mt-[-50px]">
                            <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                                Oops! اتصالی شد
                            </h3>
                            <p className="mb-6 text-black sm:mb-5">
                                متأسفانه صفحه‌ای که به دنبال آن بودید پیدا نشد!
                            </p>

                            {/* Action Button using next/link via asChild */}
                            <Button
                                variant="default"
                                asChild
                                className="my-5 bg-green-600 hover:bg-green-700 text-white font-sans"
                            >
                                <Link href="/en/dashboard">
                                    بازگشت به پنل
                                </Link>
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}