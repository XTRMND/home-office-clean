import {useEffect} from 'react';
import {Link, useParams, Navigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Check, ArrowLeft} from 'lucide-react';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {ContactForm} from '@/components/ContactForm';
import {getService} from '@/data/services';
import {isLocale} from '@/i18n';

export function ServicePage() {
  const {lang, slug} = useParams<{lang: string; slug: string}>();
  const {t, i18n} = useTranslation();
  const locale = isLocale(lang) ? lang : 'bg';
  const prefix = `/${locale}`;

  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    if (service) {
      document.title = `${service.translations[locale].title} | ${t('site.name')}`;
    }
  }, [service, locale, t, i18n.language]);

  if (!service) return <Navigate to={`${prefix}/uslugi`} replace />;
  const tr = service.translations[locale];
  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <Section spacing="md" className="bg-gradient-to-b from-brand-50 to-white">
        <Container className="max-w-3xl">
          <Link
            to={`${prefix}/uslugi`}
            className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('service.backToServices')}
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white flex-shrink-0">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
                {tr.title}
              </h1>
              <p className="mt-3 text-lg text-zinc-600">{tr.short}</p>
            </div>
          </div>

        </Container>
      </Section>

      {/* What's included + body */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">{t('service.includes')}</h2>
              <ul className="mt-5 space-y-3">
                {tr.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-brand-500" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-700 leading-relaxed">{tr.body}</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900">{t('service.bookCta')}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t('home.contactCta.subtitle')}</p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
