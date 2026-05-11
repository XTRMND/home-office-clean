import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {ServiceCard} from '@/components/ServiceCard';
import {services} from '@/data/services';
import {isLocale} from '@/i18n';

export function ServicesIndex() {
  const {t, i18n} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const locale = isLocale(lang) ? lang : 'bg';
  const prefix = `/${locale}`;

  useEffect(() => {
    document.title = `${t('servicesIndex.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            {t('servicesIndex.title')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">{t('servicesIndex.subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} langPrefix={prefix} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
