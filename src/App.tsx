import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {DEFAULT_LOCALE} from '@/i18n';
import {LocaleSync} from '@/components/LocaleSync';
import {Layout} from '@/components/Layout';
import {Home} from '@/pages/Home';
import {ServicesIndex} from '@/pages/ServicesIndex';
import {ServicePage} from '@/pages/ServicePage';
import {ContactPage} from '@/pages/ContactPage';
import {PrivacyPolicy} from '@/pages/PrivacyPolicy';
import {CookiePolicy} from '@/pages/CookiePolicy';
import {NotFound} from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
        <Route path=":lang" element={<LocaleSync />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="uslugi">
              <Route index element={<ServicesIndex />} />
              <Route path=":slug" element={<ServicePage />} />
            </Route>
            <Route path="kontakti" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
