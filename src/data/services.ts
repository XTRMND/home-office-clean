import type {LucideIcon} from 'lucide-react';
import {Sparkles, Brush, Hammer, PanelTopOpen, Briefcase, Repeat} from 'lucide-react';

export type Locale = 'bg' | 'en';

export type ServiceTranslation = {
  title: string;
  short: string;
  includes: string[];
  body: string;
};

export type Service = {
  slug: string;
  order: number;
  icon: LucideIcon;
  translations: Record<Locale, ServiceTranslation>;
};

export const services: readonly Service[] = [
  {
    slug: 'osnovno-pochistvane',
    order: 10,
    icon: Sparkles,
    translations: {
      bg: {
        title: 'Основно почистване',
        short: 'Регулярно почистване на дома или офиса с грижа за всеки детайл.',
        includes: [
          'Прах от всички повърхности и обзавеждане',
          'Пране на подове и плочки',
          'Почистване на санитарни помещения',
          'Кухненски плотове и уреди отвън',
          'Изхвърляне на отпадъци',
          'Дезинфекция на често докосвани повърхности',
        ],
        body: 'Подходящо за поддръжка на чистота на седмична или месечна база. Работим с професионални препарати, безопасни за деца и домашни любимци. Екипът пристига с пълно оборудване — не е нужно да подготвяте нищо.',
      },
      en: {
        title: 'Standard cleaning',
        short: 'Routine home or office cleaning with attention to every detail.',
        includes: [
          'Dusting all surfaces and furniture',
          'Mopping floors and tiles',
          'Bathroom and toilet cleaning',
          'Kitchen counters and appliances (exterior)',
          'Waste removal',
          'Disinfection of high-touch surfaces',
        ],
        body: 'Designed for weekly or monthly upkeep. We use professional, child- and pet-safe products. Our team arrives with everything they need — no prep on your end.',
      },
    },
  },
  {
    slug: 'dulboko-pochistvane',
    order: 20,
    icon: Brush,
    translations: {
      bg: {
        title: 'Дълбоко почистване',
        short: 'Цялостно почистване в дълбочина — за пролетен старт или преди гости.',
        includes: [
          'Всичко от пакета "Основно почистване"',
          'Почистване зад и под мебели',
          'Декалциране на смесители и душове',
          'Лъскане на стъкло и огледала',
          'Почистване на уреди отвътре (фурна, микровълнова)',
          'Дезинфекция на дръжки, ключове и щепсели',
        ],
        body: 'Препоръчваме на всеки 3–6 месеца, особено след дълга зима или преди по-голямо събитие. Отделяме повече време за всяка стая и стигаме до зони, които обикновено не виждат препарат.',
      },
      en: {
        title: 'Deep cleaning',
        short: 'Top-to-bottom cleaning — perfect for a spring reset or before guests arrive.',
        includes: [
          'Everything in the Standard package',
          'Cleaning behind and under furniture',
          'Descaling faucets and showers',
          'Polishing glass and mirrors',
          'Interior of appliances (oven, microwave)',
          'Disinfection of handles, switches, outlets',
        ],
        body: 'We recommend a deep clean every 3–6 months — especially after a long winter or before a big event. We spend more time on each room and reach the spots routine cleaning misses.',
      },
    },
  },
  {
    slug: 'abonamentno-pochistvane',
    order: 30,
    icon: Repeat,
    translations: {
      bg: {
        title: 'Абонаментно почистване',
        short: 'Редовно посещение по график — с фиксиран ден, час и същия екип.',
        includes: [
          'Фиксиран ден и час всяка седмица или две',
          'Един и същ екип, който познава дома ви',
          'По-изгодно от еднократните услуги',
          'Без договор за минимален срок — спирате когато решите',
          'Приоритет при допълнителни заявки',
        ],
        body: 'Най-удобният вариант за работещи семейства и активни офиси. Резервирате веднъж — ние идваме повтаряемо. Може да съчетавате с дълбоки почиствания на сезонна база.',
      },
      en: {
        title: 'Subscription cleaning',
        short: 'Scheduled recurring visits with a fixed schedule and the same crew.',
        includes: [
          'Fixed day and time, weekly or biweekly',
          'The same team that learns your space',
          'Better value than one-off visits',
          'No minimum-term contract — cancel any time',
          'Priority booking for extra requests',
        ],
        body: 'The most convenient option for busy families and active offices. Book once, we keep coming back. Combine with seasonal deep cleans for a complete care plan.',
      },
    },
  },
  {
    slug: 'sled-remont',
    order: 40,
    icon: Hammer,
    translations: {
      bg: {
        title: 'Почистване след ремонт',
        short: 'След строители — да направим пространството годно за живот.',
        includes: [
          'Премахване на строителен прах и циментови петна',
          'Отстраняване на боя, лепило и силикон от плочки и стъкло',
          'Почистване на дограма, первази и вентилации',
          'Измиване на подове в няколко преминавания',
          'Полиране на санитарен фаянс',
          'Изнасяне на остатъчни отпадъци',
        ],
        body: 'Строителният прах прониква навсякъде и не се махна с домашен прахосмукачка. Идваме с професионални машини, специализирани препарати и опит — за да заварите готов за живот апартамент, не работна площадка.',
      },
      en: {
        title: 'Post-construction cleaning',
        short: 'After the builders — making the space live-ready again.',
        includes: [
          'Removing construction dust and cement stains',
          'Scrubbing paint, glue and silicone off tiles and glass',
          'Cleaning window frames, sills and vents',
          'Multi-pass floor washing',
          'Polishing sanitary surfaces',
          'Removal of leftover debris',
        ],
        body: 'Construction dust gets everywhere and a home vacuum won\'t cut it. We come with industrial machines, specialised products and experience — so you walk into a finished apartment, not a worksite.',
      },
    },
  },
  {
    slug: 'prozortsi',
    order: 50,
    icon: PanelTopOpen,
    translations: {
      bg: {
        title: 'Почистване на прозорци',
        short: 'Прозрачни стъкла, чисти дограми, без петна и ивици.',
        includes: [
          'Стъкла отвън и отвътре',
          'Рамки, профили и первази',
          'Дренажни отвори и уплътнения',
          'Комарници, ако са свалени',
          'Парапети на балкони',
          'Подходящи методи за висок етаж (при достъп)',
        ],
        body: 'Оферираме индивидуално според броя крила и достъпа. Препоръчваме два пъти в годината — пролет и есен. За сгради с височина над 3-ти етаж договаряме предварително.',
      },
      en: {
        title: 'Window cleaning',
        short: 'Streak-free glass, clean frames, no smudges left behind.',
        includes: [
          'Interior and exterior glass',
          'Frames, profiles and sills',
          'Drainage channels and seals',
          'Mosquito nets, if removed',
          'Balcony railings',
          'Suitable methods for upper floors (with access)',
        ],
        body: 'We quote individually based on the number of sashes and access. We recommend twice a year — spring and autumn. For buildings above the 3rd floor we coordinate in advance.',
      },
    },
  },
  {
    slug: 'ofis',
    order: 60,
    icon: Briefcase,
    translations: {
      bg: {
        title: 'Офис почистване',
        short: 'Дискретно почистване извън работните часове, с фиксиран екип.',
        includes: [
          'Работни плотове, екрани и клавиатури',
          'Заседателни зали и кухненски кът',
          'Санитарни помещения и попълване на консумативи',
          'Прах от рафтове, шкафове и техника',
          'Изхвърляне на отпадъци, сменяне на чували',
          'Доклад при отклонение или нужда от поддръжка',
        ],
        body: 'Работим преди или след офис часовете, за да не пречим на екипа ви. Подписваме декларация за конфиденциалност и при нужда — за достъп до зони с чувствителни данни.',
      },
      en: {
        title: 'Office cleaning',
        short: 'Discreet cleaning outside working hours, with a fixed team.',
        includes: [
          'Desks, screens and keyboards',
          'Meeting rooms and kitchenettes',
          'Bathrooms with consumable refills',
          'Dusting shelves, cabinets and equipment',
          'Waste removal and bag replacement',
          'Report on any issue or maintenance need',
        ],
        body: 'We work before or after office hours so we don\'t disrupt your team. We sign confidentiality agreements and, where needed, access protocols for sensitive areas.',
      },
    },
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
