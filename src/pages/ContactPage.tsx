import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Phone, Mail, MapPin, Clock} from 'lucide-react';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {ContactForm} from '@/components/ContactForm';
import {siteInfo} from '@/data/siteInfo';
import {isLocale} from '@/i18n';

export function ContactPage() {
  const {t, i18n} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const locale = isLocale(lang) ? lang : 'bg';

  useEffect(() => {
    document.title = `${t('contact.title')} | ${t('site.name')}`;
  }, [t, i18n.language]);

  const items = [
    {icon: Phone, label: t('contact.phone'), value: siteInfo.phone, href: siteInfo.phoneHref},
    {icon: Mail, label: t('contact.email'), value: siteInfo.email, href: `mailto:${siteInfo.email}`},
    {icon: MapPin, label: t('contact.address'), value: `${siteInfo.city[locale]}, ${siteInfo.country[locale]}`},
    {icon: Clock, label: t('contact.hours'), value: siteInfo.hours[locale]},
  ];

  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">{t('contact.subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-brand-200 transition-colors">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wide text-zinc-500">{item.label}</div>
                    <div className="mt-0.5 text-zinc-900 break-words">{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
