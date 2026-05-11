import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import bg from './locales/bg.json';
import en from './locales/en.json';

export const SUPPORTED_LOCALES = ['bg', 'en'] as const;
export const DEFAULT_LOCALE = 'bg';
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const isLocale = (v: string | undefined): v is Locale =>
  !!v && (SUPPORTED_LOCALES as readonly string[]).includes(v);

void i18n.use(initReactI18next).init({
  resources: {bg: {translation: bg}, en: {translation: en}},
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {escapeValue: false},
});

export default i18n;
