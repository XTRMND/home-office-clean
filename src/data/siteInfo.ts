export const siteInfo = {
  legalName: 'Хоум Офис Клийн ООД',
  phone: '+359 878 868 786',
  phoneHref: 'tel:+359878868786',
  phoneDisplay: '0878 868 786',
  email: 'hi@homeofficeclean.com',
  city: {bg: 'Пловдив', en: 'Plovdiv'},
  country: {bg: 'България', en: 'Bulgaria'},
  hours: {
    bg: 'Пон–Съб: 08:00 – 17:00',
    en: 'Mon–Sat: 08:00 – 17:00',
  },
  social: {
    facebook: '',
    google: 'https://www.google.com/maps?cid=14910716150916169460',
  },
  googleReviewsUrl: 'https://www.google.com/maps?cid=14910716150916169460',
  yearsInBusiness: new Date().getFullYear() - 2019,
} as const;
