import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {setConsent, getStoredConsent} from '@/lib/analytics';
import {Button} from '@/components/ui/Button';

type Row = {name: string; purpose: string; provider: string; duration: string};

export function CookiePolicy() {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    document.title = `${t('cookies.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  const rows = t('cookies.table', {returnObjects: true}) as Row[];
  const current = getStoredConsent();

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
          {t('cookies.title')}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{t('cookies.lastUpdated')}</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p className="text-zinc-700 leading-relaxed whitespace-pre-line">{t('cookies.intro')}</p>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-zinc-900">{t('cookies.tableHeading')}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">{t('cookies.tableHeaders.name')}</th>
                <th className="px-4 py-3">{t('cookies.tableHeaders.purpose')}</th>
                <th className="px-4 py-3">{t('cookies.tableHeaders.provider')}</th>
                <th className="px-4 py-3">{t('cookies.tableHeaders.duration')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-mono text-zinc-900">{r.name}</td>
                  <td className="px-4 py-3 text-zinc-700">{r.purpose}</td>
                  <td className="px-4 py-3 text-zinc-700">{r.provider}</td>
                  <td className="px-4 py-3 text-zinc-700">{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-zinc-900">{t('cookies.controlHeading')}</h2>
        <p className="mt-3 text-zinc-700">{t('cookies.controlBody')}</p>
        <p className="mt-3 text-sm text-zinc-500">
          {t('cookies.currentLabel')}:{' '}
          <strong className="text-zinc-700">
            {current === 'granted'
              ? t('cookies.accept')
              : current === 'denied'
                ? t('cookies.decline')
                : t('cookies.notSet')}
          </strong>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => setConsent('granted')} variant="primary" size="md">
            {t('cookies.accept')}
          </Button>
          <Button onClick={() => setConsent('denied')} variant="outline" size="md">
            {t('cookies.decline')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
