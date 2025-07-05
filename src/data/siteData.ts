export interface SiteData {
  hero: {
    title: string[];
    priceText: string;
    ctaButton: string;
    benefits: string[];
  };
  about: {
    title: string;
    subtitle: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
    mainTitle: string;
    features: string[];
    regions: {
      main: string;
      coverage: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    mainService: {
      title: string;
      description: string;
      price: string;
      included: string[];
      guarantees: string[];
    };
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  portfolio: {
    title: string;
    projects: Array<{
      id: number;
      title: string;
      location: string;
      date: string;
      area: string;
      description: string;
      image: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    callSection: {
      title: string;
      description: string;
      benefits: string[];
    };
    contactInfo: {
      email: string;
      workHours: string[];
      address: string[];
    };
  };
  modal: {
    title: string;
    subtitle: string;
    benefits: string[];
    footer: string;
  };
}

export const defaultSiteData: SiteData = {
  hero: {
    title: ["Противопожарная", "обработка", "деревянных конструкций"],
    priceText: "От 125₽/м²",
    ctaButton: "Получить расчет стоимости",
    benefits: ["Сертифицированные составы", "Акты и гарантии", "Вся Россия"]
  },
  about: {
    title: "О компании REAS",
    subtitle: "Мы специализируемся на профессиональной противопожарной обработке деревянных конструкций, обеспечивая безопасность и соответствие всем требованиям пожарной безопасности",
    stats: [
      { number: "50+", label: "Выполненных проектов" },
      { number: "3+", label: "Лет опыта" },
      { number: "15", label: "Регионов России" },
      { number: "100%", label: "Качество работ" }
    ],
    mainTitle: "Профессиональный подход к защите",
    features: [
      "Используем только сертифицированные огнезащитные составы от проверенных производителей",
      "Все работы выполняются в строгом соответствии с требованиями СНиП и пожарной безопасности",
      "Предоставляем полный пакет документов: акты, сертификаты, гарантийные обязательства"
    ],
    regions: {
      main: "Москва и Московская область, Санкт-Петербург, Краснодарский край, Ростовская область, Чеченская Республика",
      coverage: "Работаем по всей территории Российской Федерации. Выезжаем в любой регион для выполнения работ любого масштаба."
    }
  },
  services: {
    title: "Наши услуги",
    subtitle: "Комплексная противопожарная обработка деревянных конструкций с полным сопровождением и гарантией качества",
    mainService: {
      title: "Противопожарная обработка деревянных конструкций",
      description: "Профессиональная обработка всех типов деревянных конструкций: стропильные системы, балки, перекрытия, стены, фасады и другие элементы.",
      price: "от 125₽/м²",
      included: [
        "Подготовка поверхности",
        "Нанесение огнезащитного состава",
        "Контроль качества покрытия",
        "Оформление документации"
      ],
      guarantees: [
        "Срок эффективности до 10 лет",
        "Гарантия на выполненные работы",
        "Полный пакет документов"
      ]
    },
    features: [
      {
        title: "Огнезащитная обработка",
        description: "Нанесение сертифицированных составов для повышения огнестойкости деревянных конструкций"
      },
      {
        title: "Документооборот",
        description: "Полный пакет документов: акты выполненных работ, сертификаты соответствия, гарантии"
      },
      {
        title: "Соблюдение сроков",
        description: "Выполняем работы точно в установленные сроки с учетом технологических требований"
      },
      {
        title: "Качество работ",
        description: "Строгое соблюдение СНиП, контроль качества на каждом этапе выполнения работ"
      }
    ]
  },
  portfolio: {
    title: "Выполненные проекты",
    projects: [
      {
        id: 1,
        title: 'Спортивный комплекс Ахмат-Арена',
        location: 'Чеченская Республика',
        date: '2024',
        area: '2500 м²',
        description: 'Противопожарная обработка деревянных конструкций кровли и трибун современного стадиона',
        image: '/stadion.jpg'
      },
      {
        id: 2,
        title: 'Административное здание ТФОМС',
        location: 'Чеченская Республика',
        date: '2024',
        area: '1800 м²',
        description: 'Комплексная огнезащитная обработка деревянных элементов здания Территориального фонда ОМС',
        image: '/tfoms.JPG'
      },
      {
        id: 3,
        title: 'Союз писателей',
        location: 'Чеченская Республика',
        date: '2023',
        area: '1200 м²',
        description: 'Обработка деревянных конструкций общественного здания с соблюдением архитектурных требований',
        image: '/pisateli.jpeg'
      },
      {
        id: 4,
        title: 'Министерство труда, занятости и социального развития',
        location: 'Чеченская Республика',
        date: '2023',
        area: '3200 м²',
        description: 'Противопожарная обработка деревянных элементов многоэтажного жилого здания',
        image: '/zanyatoct.jpg'
      },
      {
        id: 5,
        title: 'Министерство здравоохранения',
        location: 'Чеченская Республика',
        date: '2023',
        area: '2800 м²',
        description: 'Огнезащитная обработка деревянных конструкций здания государственного учреждения',
        image: '/zdravo.jpg'
      },
      {
        id: 6,
        title: 'Управление судебного департамента',
        location: 'Чеченская Республика',
        date: '2023',
        area: '2800 м²',
        description: 'Огнезащитная обработка деревянных конструкций здания государственного учреждения',
        image: '/sud.jpg'
      },
      {
        id: 7,
        title: 'Министерство по делам молодежи',
        location: 'Чеченская Республика',
        date: '2023',
        area: '2800 м²',
        description: 'Огнезащитная обработка деревянных конструкций здания государственного учреждения',
        image: '/molodezh.jpeg'
      }
    ]
  },
  contact: {
    title: "Свяжитесь с нами",
    subtitle: "Позвоните нам для получения бесплатной консультации и расчета стоимости противопожарной обработки",
    callSection: {
      title: "Позвоните нам прямо сейчас",
      description: "Наши специалисты готовы ответить на все ваши вопросы и предоставить профессиональную консультацию",
      benefits: [
        "Бесплатную консультацию специалиста",
        "Расчет стоимости работ",
        "Ответы на технические вопросы",
        "Планирование сроков выполнения"
      ]
    },
    contactInfo: {
      email: "info@company.ru",
      workHours: ["Пн–Пт: 09:00–18:00", "Сб–Вс: по договоренности"],
      address: ["г. Москва, ул. Примерная, д. 1", "Работаем по всей России"]
    }
  },
  modal: {
    title: "Позвоните нам прямо сейчас",
    subtitle: "Наши специалисты готовы ответить на все ваши вопросы",
    benefits: [
      "Бесплатную консультацию специалиста",
      "Расчет стоимости работ",
      "Ответы на технические вопросы",
      "Планирование сроков выполнения"
    ],
    footer: "Звонок и консультация специалиста - бесплатны"
  }
};

// Функции для работы с localStorage
export const getSiteData = (): SiteData => {
  try {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : defaultSiteData;
  } catch {
    return defaultSiteData;
  }
};

export const saveSiteData = (data: SiteData): void => {
  localStorage.setItem('siteData', JSON.stringify(data));
};