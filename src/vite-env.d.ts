/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
