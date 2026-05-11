import {useEffect} from 'react';
import {useParams, Navigate, Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {DEFAULT_LOCALE, isLocale} from '@/i18n';

/**
 * Guards every /:lang route: if the URL locale is unsupported, redirect to /bg.
 * Otherwise sync i18next + <html lang> with the URL.
 */
export function LocaleSync() {
  const {lang} = useParams<{lang: string}>();
  const {i18n} = useTranslation();

  useEffect(() => {
    if (isLocale(lang)) {
      if (i18n.language !== lang) void i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!isLocale(lang)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  }
  return <Outlet />;
}
