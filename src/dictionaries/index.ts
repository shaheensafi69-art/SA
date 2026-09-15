import en from './en.json';
import fa from './fa.json';
import ps from './ps.json';
import ru from './ru.json';
import tr from './tr.json';
import de from './de.json';
import fr from './fr.json';
import ar from './ar.json';
import ur from './ur.json';

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
