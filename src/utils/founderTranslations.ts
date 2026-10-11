import en from "./translations/founder/en.json";
import fa from "./translations/founder/fa.json";
import ps from "./translations/founder/ps.json";
import ru from "./translations/founder/ru.json";
import tr from "./translations/founder/tr.json";
import de from "./translations/founder/de.json";
import fr from "./translations/founder/fr.json";
import ar from "./translations/founder/ar.json";
import ur from "./translations/founder/ur.json";
import es from "./translations/founder/es.json";
import zh from "./translations/founder/zh.json";
import hi from "./translations/founder/hi.json";
import it from "./translations/founder/it.json";
import pt from "./translations/founder/pt.json";
import ja from "./translations/founder/ja.json";
import ko from "./translations/founder/ko.json";
import nl from "./translations/founder/nl.json";
import uz from "./translations/founder/uz.json";
import id from "./translations/founder/id.json";

export const founderTranslations = {
  en,
  fa,
  ps,
  ru,
  tr,
  de,
  fr,
  ar,
  ur,
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

export type FounderLocale = keyof typeof founderTranslations;

export function getFounderLocaleData(locale?: string) {
  const loc = (locale && locale in founderTranslations ? locale : "en") as FounderLocale;
  const isRtl = ["fa", "ps", "ar", "ur"].includes(loc);
  return {
    dict: founderTranslations[loc] || founderTranslations.en,
    locale: loc,
    isRtl,
    dir: isRtl ? ("rtl" as const) : ("ltr" as const),
  };
}
