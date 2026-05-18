import type {LucideIcon} from 'lucide-react';
import {
  Sparkles,
  Brush,
  Hammer,
  PanelTopOpen,
  Briefcase,
  Repeat,
  BedDouble,
  Sofa,
  Armchair,
} from 'lucide-react';

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
  {
    slug: 'prane-matraci',
    order: 70,
    icon: BedDouble,
    translations: {
      bg: {
        title: 'Пране на матраци',
        short: 'Дълбоко екстракционно пране — премахваме пот, акари и алергени.',
        includes: [
          'Изпиване с професионален екстрактор от двете страни',
          'Премахване на петна, акари и алергени',
          'Антибактериална обработка',
          'Дезодориране и неутрализиране на миризми',
          'Подходящо за всички видове матраци, включително memory foam',
          'Изсушаване — обикновено 2–4 часа',
        ],
        body: 'Матракът събира пот, кожни люспи, акари и алергени, които обикновеното пране не премахва. Работим с професионален екстрактор и сертифицирани препарати, безопасни за деца, домашни любимци и хора с алергии. Препоръчваме на всеки 6–12 месеца.',
      },
      en: {
        title: 'Mattress cleaning',
        short: 'Deep extraction wash — removing sweat, mites and allergens.',
        includes: [
          'Extractor wash on both sides',
          'Stain, dust-mite and allergen removal',
          'Antibacterial treatment',
          'Odour neutralisation',
          'Suitable for all mattress types, including memory foam',
          'Drying — usually 2–4 hours',
        ],
        body: 'A mattress collects sweat, skin flakes, mites and allergens that ordinary cleaning won\'t remove. We use a professional extractor and certified products that are safe for children, pets and people with allergies. We recommend it every 6–12 months.',
      },
    },
  },
  {
    slug: 'prane-divani',
    order: 80,
    icon: Sofa,
    translations: {
      bg: {
        title: 'Пране на дивани и фотьойли',
        short: 'Връщаме мекия мебел в свеж и хигиеничен вид.',
        includes: [
          'Изпиване на тапицерията с екстрактор',
          'Премахване на петна от храна, кафе, вино',
          'Дезинфекция и неутрализиране на миризми',
          'Премахване на козина и люспи от домашни любимци',
          'Защита от бъдещи петна (по избор)',
          'Внимателно отношение към велур, шенил, микрофибър',
        ],
        body: 'Преди започване проверяваме типа на материала и тестваме препарата на скрита зона. Подходящо за памучни, велурени, микрофибърни и шенилни тапицерии. Изсушаването е 3–5 часа в зависимост от плътността.',
      },
      en: {
        title: 'Sofa & armchair cleaning',
        short: 'Bringing upholstered furniture back to fresh and hygienic.',
        includes: [
          'Extractor wash of the upholstery',
          'Removing food, coffee and wine stains',
          'Disinfection and odour neutralisation',
          'Pet hair and dander removal',
          'Stain protection coating (optional)',
          'Careful treatment of velvet, chenille, microfibre',
        ],
        body: 'Before starting we identify the fabric and patch-test the product on a hidden area. Suitable for cotton, velvet, microfibre and chenille upholstery. Drying takes 3–5 hours depending on density.',
      },
    },
  },
  {
    slug: 'prane-stolove',
    order: 90,
    icon: Armchair,
    translations: {
      bg: {
        title: 'Пране на столове и офис кресла',
        short: 'Свежи столове за дома, ресторанта или офиса.',
        includes: [
          'Изпиване на седалка, облегалка и подлакътници',
          'Премахване на петна и неприятни миризми',
          'Антибактериална обработка',
          'Цени на бройка — изгодни оферти за повече столове',
          'Гъвкав график — без прекъсване на работа',
          'Подходящо за трапезни, офис и заведителски столове',
        ],
        body: 'Работим с трапезни столове, офис кресла, барбарии и стол-фотьойли в заведения. За корпоративни клиенти и хотелиерство предлагаме обиколка по график — без да спираме работата ви.',
      },
      en: {
        title: 'Chair & office-chair cleaning',
        short: 'Fresh chairs for the home, the restaurant or the office.',
        includes: [
          'Cleaning seat, backrest and armrests',
          'Stain and odour removal',
          'Antibacterial treatment',
          'Per-piece pricing — better rates in volume',
          'Flexible scheduling — no disruption to your work',
          'Suitable for dining, office and hospitality seating',
        ],
        body: 'We clean dining chairs, office chairs, bar stools and restaurant seating. For corporate and hospitality clients we run scheduled rounds so we don\'t interrupt your operation.',
      },
    },
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
