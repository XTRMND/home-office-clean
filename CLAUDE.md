# hox — Home Office Clean

Working directory for the **homeofficeclean.com** rebuild. The live site is the old WordPress version; this repo holds the new build that will replace it.

## Tech stack (current, after 2026-05-11 simplification)

- **Vite 7** + **React 19** + **TypeScript 5** — SPA, no SSR
- **Tailwind v4** via `@tailwindcss/vite` (no postcss config needed)
- **react-router-dom v7** — `/:lang/*` URL pattern
- **i18next + react-i18next** — Bulgarian (default) + English. Translations in `src/locales/{bg,en}.json`
- **react-hook-form + zod** — form (Phase 4)
- **lucide-react, clsx, tailwind-merge** — UI utilities
- Build target: static files in `dist/`, deployed anywhere that serves static + does SPA fallback (Vercel, Cloudflare Pages, Netlify, S3+CloudFront, even SiteGround). No Node server required.

### SEO trade-off (acknowledged)

Pure SPA — the initial HTML Google receives is the empty shell from `index.html`, content paints client-side. Google does execute JS during indexing, so the site *will* be indexed, but:
- Indexing latency is slower than SSR/SSG (days, not hours)
- Schema.org JSON-LD must be injected before Googlebot decides to abandon the render — we inject in `index.html` for the home page and via `useEffect` for inner routes
- Some crawlers (Bing, smaller engines) handle JS-rendered pages worse than Google
- Social-media previews (Facebook, LinkedIn, X) often *don't* run JS — OG tags need to be in `index.html`, which means the home-page OG tags are static; inner-route OG tags require a prerender step we don't have

If at any point the SEO ceiling becomes a problem (low rankings after content is done), the realistic upgrade path is `vite-plugin-ssg` (static prerender of known routes) or a one-time migration to Astro — both keep the React components we write.

## Tech that's NOT in the project (and why)

- **No Next.js** — user wanted "just React, no complications" (2026-05-11)
- **No Sanity / CMS** — too much overhead for ~25 mostly-static pages with one editor (the user)
- **No MDX** — user opted against
- **No backend / server** — pure static SPA; Phase 4 form will POST to a third-party form endpoint (Formspree/Web3Forms/Basin) + a separate marketing tool (Brevo) instead of a Next API route. Lead persistence to our own DB is therefore deferred / requires reintroducing a tiny serverless function.

## URL structure (planned)

```
/                        redirects to /bg
/bg                      home
/bg/uslugi               services index
/bg/uslugi/[slug]        6 service pages
/bg/plovdiv              city hub
/bg/plovdiv/[district]   district pages
/bg/uslugi/[slug]/plovdiv/[district]   service × location combos
/bg/blog/[slug]          blog (empty at launch)
/bg/kontakti             contact
/en/...                  English mirror
```

Routing is handled in `src/App.tsx`. `LocaleSync` (in `src/components/LocaleSync.tsx`) guards every `/:lang` route, syncs i18next + `<html lang>` to the URL, and 404→/bg for unknown locales.

## Repo layout

```
hox/
├─ index.html               Vite entry (static head: title, description, og:locale=bg_BG)
├─ vite.config.ts           Vite + React + Tailwind + @/ alias → src/
├─ tsconfig.json            Vite-style, strict, @/* path mapping
├─ public/                  served as-is at /
├─ src/
│  ├─ main.tsx              StrictMode + createRoot
│  ├─ App.tsx               BrowserRouter + Routes
│  ├─ i18n.ts               i18next init, SUPPORTED_LOCALES, isLocale guard
│  ├─ index.css             Tailwind v4 (@import + @theme tokens for brand-50..900)
│  ├─ locales/{bg,en}.json  translations
│  ├─ components/           LocaleSync, LanguageSwitcher, plus future shared UI
│  └─ pages/                Home, then Services, ServicePage, District, Contact, etc.
├─ .env.local               VITE_-prefixed vars only (gitignored)
├─ .mcp.json                legacy-WP MCP, gitignored
├─ CLAUDE.md                this file
└─ LEAD_RECOVERY.md         instructions for pulling old WPForms leads (deferred)
```

## Current live-site inventory (the thing being replaced)

Captured 2026-05-11. The live site is still on WP until cutover.

**Stack:** WordPress + Astra v3.9.1 + Elementor v3.35.7 + Ultimate Addons v1.36.8 + WPForms Lite v1.9.9.4 + AIOSEO v4.9.5.1. Last meaningful edit: 2022-09-13.

**Footprint:** 1 page, 0 posts, 49 small media items. Single-page site with anchor nav.

### Tracking — preserve exactly through cutover

- **Google Ads conversion ID:** `AW-17906353585`
- **Conversion label (form submit):** `TILYCPOb4IMcELGLtdpC`
- Fires on WPForms form ID 971 via `wpformsAjaxSubmitSuccess` jQuery hook → `gtag('event','conversion',{send_to:'AW-17906353585/TILYCPOb4IMcELGLtdpC'})`
- No GA4, no GTM, no Meta Pixel today (we'll add fresh)

### Brand to keep

- **Name:** Хоум Офис Клийн ООД
- **Phone:** +359 878 868 786
- **City:** Пловдив
- **Primary color:** `#557dbc` — already wired as the `brand-500` token in `src/index.css` (full 50→900 scale)
- **Logo:** https://homeofficeclean.com/wp-content/uploads/2022/09/logo-1-1.{svg,png,webp} (starting point for refresh)

### Services to cover

- Основно почистване, Дълбоко / Абонаментно, Почистване след ремонт, Прозорци, Офис почистване

### Geo (Plovdiv districts)

Тракия, Кючук Париж, Център, Каменица, Смирненски — confirm full list during content phase.

## Dev workflow

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the built bundle locally
```

## Tracking + consent

- **gtag.js** is loaded directly in `index.html` with **Consent Mode v2** defaulting to `denied` for ad/analytics storage.
- **CookieBanner** (`src/components/CookieBanner.tsx`) shows on first visit, writes the user's choice to `localStorage` (key `hox-consent-v1`), and calls `setConsent()` to update Consent Mode.
- **Google Ads form-submit conversion** (`AW-17906353585/TILYCPOb4IMcELGLtdpC`) fires from `ContactForm` via `fireFormConversion()` in `src/lib/analytics.ts`. Consent Mode handles signal downgrading server-side for users who haven't accepted.
- To switch to GTM later: replace the inline gtag in `index.html` with the GTM container snippet, and have the GTM container own the Ads conversion + GA4. Consent Mode defaults stay the same.

## Form delivery

- **Web3Forms** (https://web3forms.com). Access key in `.env.local` as `VITE_WEB3FORMS_ACCESS_KEY`. Web3Forms delivers submissions by email to whatever inbox is set in their dashboard.
- Each submission includes: name, phone, email, message, marketing-opt-in flag, locale, source URL, referrer, timestamp. The admin email subject is `Ново запитване от {name} (BG)` so leads from the BG vs. EN site are distinguishable at a glance.
- Honeypot field (`botcheck`) hidden in the form blocks naïve spam bots.

## Deployment

The Vite build outputs static files to `dist/` — no server required.

**Recommended path: Vercel.**

1. Push the repo to GitHub.
2. https://vercel.com/new → import the repo.
3. Vercel auto-detects Vite. Defaults are correct (build command `npm run build`, output `dist/`).
4. **Add env vars** in the Vercel project's Settings → Environment Variables (copy from `.env.local`): `VITE_FORM_ENDPOINT`, `VITE_WEB3FORMS_ACCESS_KEY`, `VITE_GOOGLE_ADS_CONVERSION_ID`, `VITE_GOOGLE_ADS_CONVERSION_LABEL`, and any of `VITE_GTM_ID` / `VITE_GA4_ID` when ready.
5. Deploy. First deploy lands at `<project>.vercel.app` — QA there first.
6. **Domain swap.** In Vercel project → Settings → Domains, add `homeofficeclean.com` and `www.homeofficeclean.com`. Vercel gives DNS records. Update the DNS at SiteGround (or move nameservers to Vercel). The WP site stays online until DNS propagates.

`vercel.json` at the repo root contains the SPA rewrite (`/(.*)` → `/index.html`) and security headers (HSTS, Permissions-Policy, etc.). Cache-Control for `/assets/*` is set to immutable (Vite hashes filenames).

## What's still ahead

- Per-route meta description + OG tags + JSON-LD (`LocalBusiness`, `Service`) — Phase 5
- Real logo (current is a literal `H` in a square) — Phase 6
- GA4 property + Search Console verification — Phase 5
- Real testimonials, FAQs, hero stat numbers — content phase
- Recover legacy WPForms leads — deferred (see `LEAD_RECOVERY.md`)
- Service × district combo pages — Phase 5 (SEO play)
