import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Cookie, X} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {setConsent, getStoredConsent} from '@/lib/analytics';
import {isLocale} from '@/i18n';

export function CookieBanner() {
  const {t} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const prefix = `/${isLocale(lang) ? lang : 'bg'}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer: don't paint the banner on first paint, wait for client hydration
    // and only show if the user hasn't made a choice yet.
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent('granted');
    setVisible(false);
  };
  const decline = () => {
    setConsent('denied');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t('cookies.bannerTitle')}
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-xl p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 flex-shrink-0">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-zinc-900">{t('cookies.bannerTitle')}</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {t('cookies.bannerBody')}{' '}
              <Link to={`${prefix}/privacy`} className="text-brand-600 underline hover:no-underline">
                {t('cookies.privacyLink')}
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button onClick={accept} variant="primary" size="md">
                {t('cookies.accept')}
              </Button>
              <Button onClick={decline} variant="outline" size="md">
                {t('cookies.decline')}
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={decline}
            aria-label={t('cookies.decline')}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
