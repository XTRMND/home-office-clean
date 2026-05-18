// Hand-curated reviews from the Google Maps web UI (the internal
// /MapsUgcPostService.ListUgcPosts RPC returns all reviews, but it's not
// suitable for automated fetching — needs logged-in cookies and may break).
// Re-fetched manually if/when new positive reviews appear on the listing.

import type {Testimonial} from './testimonials';

export const manualReviews: readonly Testimonial[] = [
  {
    name: 'Ramadan Emin',
    rating: 5,
    date: 'май 2026 г.',
    text: 'Изключително доволен съм от услугите на Хоум Офис Клийн / Home Office Clean. Екипът работи бързо, организирано и с внимание към всеки детайл. Домът ми остана перфектно почистен, а отношението беше професионално и коректно от началото до края. Личи си, че хората си разбират от работата и държат на качеството. Препоръчвам с две ръце на всеки, който търси надеждна фирма за почистване!',
    lang: 'bg',
    avatar: '/reviews/ramadan.png',
  },
  {
    name: 'Ramadan Emin',
    rating: 5,
    date: 'May 2026',
    text: 'I am extremely satisfied with the services of Home Office Clean. The team works quickly, organized and with attention to every detail. My home was left perfectly cleaned, and the attitude was professional and correct from start to finish. It is clear that the people know their job and care about quality. I recommend them with both hands to anyone looking for a reliable cleaning company!',
    lang: 'en',
    avatar: '/reviews/ramadan.png',
  },
  {
    name: 'Teodor Mitrev',
    rating: 5,
    date: 'март 2025 г.',
    text: 'Перфектно свършена работа.',
    lang: 'bg',
    avatar: '/reviews/teodor.png',
  },
  {
    name: 'Teodor Mitrev',
    rating: 5,
    date: 'March 2025',
    text: 'Perfectly done job.',
    lang: 'en',
    avatar: '/reviews/teodor.png',
  },
  {
    name: 'Елис Фейзула',
    rating: 5,
    date: 'юни 2024 г.',
    text: 'Изключително професионално и добро почистване! :)',
    lang: 'bg',
    avatar: '/reviews/elis.png',
  },
  {
    name: 'Елис Фейзула',
    rating: 5,
    date: 'June 2024',
    text: 'Extremely professional and good cleaning! :)',
    lang: 'en',
    avatar: '/reviews/elis.png',
  },
];
