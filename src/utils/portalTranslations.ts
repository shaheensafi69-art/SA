import en from "./translations/en.json";
import fa from "./translations/fa.json";
import ps from "./translations/ps.json";
import ar from "./translations/ar.json";
import ur from "./translations/ur.json";
import ru from "./translations/ru.json";
import tr from "./translations/tr.json";
import de from "./translations/de.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";
import zh from "./translations/zh.json";
import hi from "./translations/hi.json";
import it from "./translations/it.json";
import pt from "./translations/pt.json";
import ja from "./translations/ja.json";
import ko from "./translations/ko.json";
import nl from "./translations/nl.json";
import uz from "./translations/uz.json";
import id from "./translations/id.json";

export const portalTranslations = {
  en,
  fa,
  ps,
  ar,
  ur,
  ru,
  tr,
  de,
  fr,
  es,
  zh,
  hi,
  it,
  pt,
  ja,
  ko,
  nl,
  uz,
  id,
} as const;

export type PortalLocale = keyof typeof portalTranslations;

export const isRtlPortal = (locale: string): boolean => {
  return ["fa", "ps", "ar", "ur"].includes(locale);
};

export const getPortalTranslation = (locale?: string) => {
  let activeLocale = locale;
  if (!activeLocale && typeof window !== "undefined") {
    const segment = window.location.pathname.split("/")[1];
    if (segment && segment in portalTranslations) {
      activeLocale = segment;
    }
  }
  const loc = (activeLocale && activeLocale in portalTranslations ? activeLocale : "en") as PortalLocale;
  const translation = portalTranslations[loc] || portalTranslations.en;
  return {
    ...translation,
    isRtl: isRtlPortal(activeLocale || "en"),
  };
};
