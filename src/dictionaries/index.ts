import en from './en.json';
import fa from './fa.json';
import ps from './ps.json';
import ru from './ru.json';
import tr from './tr.json';
import de from './de.json';
import fr from './fr.json';
import ar from './ar.json';
import ur from './ur.json';
import es from './es.json';
import zh from './zh.json';
import hi from './hi.json';
import it from './it.json';
import pt from './pt.json';
import ja from './ja.json';
import ko from './ko.json';
import nl from './nl.json';
import uz from './uz.json';
import id from './id.json';

export const dictionaries = {
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

export type SupportedLocale = keyof typeof dictionaries;

export const rtlLocales: readonly SupportedLocale[] = ['fa', 'ps', 'ar', 'ur'] as const;

export const isRtlLocale = (locale: string): boolean => {
  return rtlLocales.includes(locale as SupportedLocale);
};

export const getDictionary = (locale?: string) => {
  if (!locale || !(locale in dictionaries)) {
    return dictionaries.en;
  }
  return dictionaries[locale as SupportedLocale] || dictionaries.en;
};
