import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Container} from '@/components/ui/Container';
import {LinkButton} from '@/components/ui/Button';
import {isLocale} from '@/i18n';

export function NotFound() {
  const {t, i18n} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const prefix = `/${isLocale(lang) ? lang : 'bg'}`;

  useEffect(() => {
    document.title = `${t('notFound.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  return (
    <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="text-7xl font-bold tracking-tight text-brand-500">404</div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-zinc-900">{t('notFound.title')}</h1>
      <p className="mt-3 text-zinc-600 max-w-md">{t('notFound.body')}</p>
      <LinkButton to={prefix} variant="primary" size="lg" className="mt-8">
        {t('notFound.cta')}
      </LinkButton>
    </Container>
  );
}
