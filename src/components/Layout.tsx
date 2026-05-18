import {Outlet, useLocation, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {CookieBanner} from '@/components/CookieBanner';
import {Testimonials} from '@/components/Testimonials';
import {DEFAULT_LOCALE, isLocale} from '@/i18n';

export function Layout() {
  const {pathname} = useLocation();
  const {lang} = useParams<{lang: string}>();
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Testimonials locale={locale} />
      <Footer />
      <CookieBanner />
    </div>
  );
}
