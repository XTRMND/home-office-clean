import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {siteInfo} from '@/data/siteInfo';

type Block = {heading: string; body: string};

export function PrivacyPolicy() {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    document.title = `${t('privacy.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  const blocks = t('privacy.blocks', {
    returnObjects: true,
    legalName: siteInfo.legalName,
    email: siteInfo.email,
    phone: siteInfo.phone,
  }) as Block[];

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
          {t('privacy.title')}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{t('privacy.lastUpdated')}</p>
        <div className="mt-10 space-y-8">
          {blocks.map((b, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-zinc-900">{b.heading}</h2>
              <p className="mt-3 text-zinc-700 leading-relaxed whitespace-pre-line">{b.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
