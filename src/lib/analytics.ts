/**
 * Thin wrappers around gtag for Google Ads conversion + Consent Mode v2.
 *
 * The gtag script is injected in index.html with consent defaulted to "denied"
 * for ad/analytics storage. After the user accepts the cookie banner we update
 * to "granted"; on a hard reject we explicitly stay at "denied".
 *
 * The Ads conversion fires on form submit regardless of consent — Google's
 * Consent Mode automatically downgrades the signal (or sends pings only) when
 * ad_storage is denied, so we stay GDPR-compliant while not silently dropping
 * conversion attribution for users who consented.
 */

const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
const ADS_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL;
const CONSENT_KEY = 'hox-consent-v1';

type ConsentState = 'granted' | 'denied';

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  const w = window as unknown as {gtag?: Gtag};
  return typeof w.gtag === 'function' ? w.gtag : undefined;
}

export function setConsent(state: ConsentState) {
  const gtag = getGtag();
  if (gtag) {
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // localStorage can throw in private mode — ignore
  }
}

export function getStoredConsent(): ConsentState | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Fire the legacy Google Ads form-submit conversion. This is the SAME event
 * the old WordPress site fires from WPForms' submit handler, so paid
 * campaigns keep attribution after cutover.
 */
export function fireFormConversion() {
  if (!ADS_ID || !ADS_LABEL) {
    // eslint-disable-next-line no-console
    console.info('[ads] conversion not fired — missing env vars');
    return;
  }
  const gtag = getGtag();
  if (!gtag) {
    // eslint-disable-next-line no-console
    console.info('[ads] gtag not loaded yet; conversion would be:', `${ADS_ID}/${ADS_LABEL}`);
    return;
  }
  gtag('event', 'conversion', {send_to: `${ADS_ID}/${ADS_LABEL}`});
}
