"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Globe, Check, Bell, BellRing, Sparkles } from "lucide-react";

export const ACADEMY_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "fa", name: "Persian (Dari)", nativeName: "فارسی / دری", flag: "🇦🇫" },
  { code: "ps", name: "Pashto", nativeName: "پښتو", flag: "🇦🇫" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "uz", name: "Uzbek", nativeName: "Oʻzbekcha", flag: "🇺🇿" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
];

interface LanguagePreferencesTabProps {
  userId: string;
  currentLocale: string;
  t: any;
  isRtl: boolean;
}

export default function LanguagePreferencesTab({ userId, currentLocale, t, isRtl }: LanguagePreferencesTabProps) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const [selectedLang, setSelectedLang] = useState(currentLocale);
  const [isUpdating, setIsUpdating] = useState(false);

  const [notifications, setNotifications] = useState({
    academyUpdates: true,
    classReminders: true,
    emailAlerts: true,
  });

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === selectedLang) return;
    setSelectedLang(langCode);
    setIsUpdating(true);

    const supabase = createClient();
    try {
      if (userId) {
        await supabase
          .from("profiles")
          .update({ preferred_language: langCode })
          .eq("id", userId);
      }

      // Reconstruct pathname with new locale
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        segments[0] = langCode;
        const newPath = "/" + segments.join("/");
        router.push(newPath);
      } else {
        router.push(`/${langCode}`);
      }
    } catch (e) {
      console.error("Failed to switch language:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <Globe className="w-6 h-6 text-amber-400" />
          {t.settings?.language || "Language & Preferences"}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1">
          {t.settings?.selectLanguage || "Select your preferred display language for the academy interface."}
        </p>
      </div>

      {/* 19 Languages Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 px-1">
            {t.settings?.selectLanguage || "Select Interface Language (19 Languages)"}
          </h3>
          <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            {ACADEMY_LANGUAGES.length} Languages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ACADEMY_LANGUAGES.map((lang) => {
            const isCurrent = lang.code === selectedLang;

            return (
              <button
                key={lang.code}
                type="button"
                disabled={isUpdating}
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isCurrent
                    ? "bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                    : "bg-black/30 border-white/5 hover:border-white/20 text-neutral-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0 drop-shadow-sm">{lang.flag}</span>
                  <div className="min-w-0">
                    <p className={`text-xs font-black truncate ${isCurrent ? "text-amber-300" : "text-white"}`}>
                      {lang.nativeName}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate font-medium">
                      {lang.name}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-md">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 px-1 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" />
          {t.settings?.notificationCenter || "Notifications & Alerts"}
        </h3>

        <div className="space-y-3">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
            <div className="pr-4">
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {t.settings?.academyUpdates || "Academy Updates & Announcements"}
              </h4>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                {t.settings?.academyUpdatesDesc || "Receive news about new courses, scholarships, and features."}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications.academyUpdates}
                onChange={(e) => setNotifications({ ...notifications, academyUpdates: e.target.checked })}
              />
              <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
            </label>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
            <div className="pr-4">
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {t.settings?.marketingOffers || "Live Class & Quiz Reminders"}
              </h4>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                {t.settings?.marketingOffersDesc || "Get reminders about upcoming scheduled classes and assignments."}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications.classReminders}
                onChange={(e) => setNotifications({ ...notifications, classReminders: e.target.checked })}
              />
              <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
