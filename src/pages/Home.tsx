import {useEffect} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Sparkles, Shield, Tag, Users, ArrowRight} from 'lucide-react';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {LinkButton} from '@/components/ui/Button';
import {ServiceCard} from '@/components/ServiceCard';
import {ContactForm} from '@/components/ContactForm';
import {services} from '@/data/services';
import {siteInfo} from '@/data/siteInfo';
import {isLocale} from '@/i18n';

type Stat = {value: string; label: string};
type WhyItem = {title: string; body: string};

export function Home() {
  const {t, i18n} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const locale = isLocale(lang) ? lang : 'bg';
  const prefix = `/${locale}`;

  useEffect(() => {
    document.title = `${t('home.hero.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  const stats = t('home.stats', {returnObjects: true, years: siteInfo.yearsInBusiness}) as Stat[];
  const whyItems = t('home.whyUs.items', {returnObjects: true}) as WhyItem[];
  const whyIcons = [Users, Tag, Sparkles, Shield];

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 [background:radial-gradient(closest-side,theme(colors.brand.200)_0%,transparent_70%)] opacity-50"
        />
        <Container className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-lg text-zinc-600">{t('home.hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton to={`${prefix}/kontakti`} variant="primary" size="lg">
              {t('home.hero.primaryCta')}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton to={`${prefix}/uslugi`} variant="outline" size="lg">
              {t('home.hero.secondaryCta')}
            </LinkButton>
          </div>
        </Container>

        <Container className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat: Stat, i: number) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-zinc-900">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </Container>
      </Section>

      {/* Services */}
      <Section variant="muted">
        <Container>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t('home.services.eyebrow')}
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              {t('home.services.title')}
            </h2>
            <p className="mt-3 text-zinc-600">{t('home.services.subtitle')}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} langPrefix={prefix} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Why us */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t('home.whyUs.eyebrow')}
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              {t('home.whyUs.title')}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item: WhyItem, i: number) => {
              const Icon = whyIcons[i] ?? Sparkles;
              return (
                <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <Icon className="h-7 w-7 text-brand-500" />
                  <h3 className="mt-4 text-base font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{item.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section id="contact" variant="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {t('home.contactCta.eyebrow')}
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                {t('home.contactCta.title')}
              </h2>
              <p className="mt-3 text-zinc-600">{t('home.contactCta.subtitle')}</p>
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                  <dt className="font-medium text-zinc-700">{t('contact.phone')}</dt>
                  <dd>
                    <a href={siteInfo.phoneHref} className="text-brand-600 hover:underline">
                      {siteInfo.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                  <dt className="font-medium text-zinc-700">{t('contact.email')}</dt>
                  <dd>
                    <a href={`mailto:${siteInfo.email}`} className="text-brand-600 hover:underline">
                      {siteInfo.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-zinc-700">{t('contact.hours')}</dt>
                  <dd className="text-zinc-600">{siteInfo.hours[locale]}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-zinc-200">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// Suppress unused-import warning if Trans is dropped later. Keeping ref:
void Trans;
