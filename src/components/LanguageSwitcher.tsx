import {Link, useLocation, useParams} from 'react-router-dom';
import {SUPPORTED_LOCALES, type Locale} from '@/i18n';

export function LanguageSwitcher() {
  const {lang} = useParams<{lang: string}>();
  const {pathname} = useLocation();
  const current = (SUPPORTED_LOCALES as readonly string[]).includes(lang ?? '') ? lang : 'bg';
  const restOfPath = lang ? pathname.replace(`/${lang}`, '') : pathname;

  return (
    <div className="flex gap-1 text-sm">
      {SUPPORTED_LOCALES.map((loc: Locale) => (
        <Link
          key={loc}
          to={`/${loc}${restOfPath || ''}`}
          className={
            loc === current
              ? 'rounded px-2 py-1 bg-brand-500 text-white'
              : 'rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100'
          }
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
