import {Link, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Container} from '@/components/ui/Container';
import {services} from '@/data/services';
import {siteInfo} from '@/data/siteInfo';
import {isLocale} from '@/i18n';

export function Footer() {
  const {t, i18n} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const locale = isLocale(lang) ? lang : 'bg';
  const prefix = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/logo.png"
              alt={t('site.name')}
              width={511}
              height={114}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-sm text-zinc-600 max-w-xs">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {t('footer.servicesHeading')}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`${prefix}/uslugi/${s.slug}`}
                    className="text-zinc-700 hover:text-brand-600"
                  >
                    {s.translations[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {t('footer.companyHeading')}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to={prefix} className="text-zinc-700 hover:text-brand-600">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={`${prefix}/uslugi`} className="text-zinc-700 hover:text-brand-600">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to={`${prefix}/kontakti`} className="text-zinc-700 hover:text-brand-600">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to={`${prefix}/privacy`} className="text-zinc-700 hover:text-brand-600">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to={`${prefix}/cookies`} className="text-zinc-700 hover:text-brand-600">
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {t('footer.contactHeading')}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a href={siteInfo.phoneHref} className="hover:text-brand-600">
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`} className="hover:text-brand-600">
                  {siteInfo.email}
                </a>
              </li>
              <li>{siteInfo.city[locale]}, {siteInfo.country[locale]}</li>
              <li className="text-zinc-500">{siteInfo.hours[locale]}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
          <span>© {year} {siteInfo.legalName}. {t('footer.rights')}</span>
          <span lang={i18n.language}>{siteInfo.legalName}</span>
        </div>
      </Container>
    </footer>
  );
}
