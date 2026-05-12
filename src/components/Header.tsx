import {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Phone, Menu, X} from 'lucide-react';
import {Container} from '@/components/ui/Container';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {ExternalLinkButton} from '@/components/ui/Button';
import {siteInfo} from '@/data/siteInfo';
import {cn} from '@/lib/cn';

export function Header() {
  const {t} = useTranslation();
  const {lang} = useParams<{lang: string}>();
  const [open, setOpen] = useState(false);
  const prefix = `/${lang ?? 'bg'}`;

  const nav = [
    {to: `${prefix}`, label: t('nav.home'), end: true},
    {to: `${prefix}/uslugi`, label: t('nav.services')},
    {to: `${prefix}/kontakti`, label: t('nav.contact')},
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to={prefix} className="flex items-center" aria-label={t('site.name')}>
          <img
            src="/logo.png"
            alt={t('site.name')}
            width={511}
            height={114}
            className="h-9 w-auto sm:h-10"
          />
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({isActive}) =>
                cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ExternalLinkButton
            href={siteInfo.phoneHref}
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {siteInfo.phoneDisplay}
          </ExternalLinkButton>
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden -mr-2 rounded p-2 text-zinc-600 hover:bg-zinc-100"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white">
          <Container className="flex flex-col py-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({isActive}) =>
                  cn(
                    'rounded-lg px-3 py-2 text-base',
                    isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700 hover:bg-zinc-50',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href={siteInfo.phoneHref} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-white">
              <Phone className="h-4 w-4" />
              {siteInfo.phoneDisplay}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
