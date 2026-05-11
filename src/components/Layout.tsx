import {Outlet, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {CookieBanner} from '@/components/CookieBanner';

export function Layout() {
  const {pathname} = useLocation();

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
      <Footer />
      <CookieBanner />
    </div>
  );
}
