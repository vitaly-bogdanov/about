export type SeedLink = {
  label: string;
  url: string;
};

export type SeedSkill = {
  name: string;
  category: string;
};

export type SeedExperience = {
  company: string;
  position: string;
  location?: string;
  website?: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
};

export type DigitalCardSeed = {
  name: string;
  description: string;
  links: SeedLink[];
  skills: SeedSkill[];
  experience: SeedExperience[];
};

export const digitalCardSeed: DigitalCardSeed = {
  name: 'Виталий Трубчининов',
  description:
    'T-shaped Backend Engineer с основным опытом в Node.js и TypeScript. Проектирую API, PostgreSQL и распределённые системы, закрываю цикл от контракта до production. Интересуюсь Go, AI/LLM-агентами и моделью акторов.',
  links: [
    { label: 'GitHub', url: 'https://github.com/vitaly-bogdanov' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vitalii-trubchininov-85bb38223/',
    },
    { label: 'Telegram', url: 'https://t.me/kaliummati' },
    { label: 'Email', url: 'mailto:kaliummati@gmail.com' },
  ],
  skills: [
    { name: 'TypeScript', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'SQL', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'Go', category: 'Languages' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'REST API', category: 'Backend' },
    { name: 'WebSocket', category: 'Backend' },
    { name: 'Prisma', category: 'Data' },
    { name: 'PostgreSQL', category: 'Data' },
    { name: 'MongoDB', category: 'Data' },
    { name: 'Redis', category: 'Data' },
    { name: 'Elasticsearch', category: 'Data' },
    { name: 'Docker', category: 'Platform' },
    { name: 'Git', category: 'Platform' },
    { name: 'GitLab CI/CD', category: 'Platform' },
    { name: 'Linux', category: 'Platform' },
    { name: 'Kubernetes', category: 'Platform' },
    { name: 'RAG', category: 'AI' },
    { name: 'MCP', category: 'AI' },
    { name: 'Claude Code', category: 'AI' },
  ],
  experience: [
    {
      company: 'All Funeral Services',
      position: 'Backend Engineer (Node.js)',
      location: 'США / удалённо',
      website: 'https://allfuneral.com/',
      startDate: '2021-08-01',
      endDate: '2026-08-01',
      achievements: [
        'Разрабатывал и поддерживал около 100 сервисов на Node.js/TypeScript: микросервисы, монолиты, SOA и legacy.',
        'Спроектировал RAG-систему по кодовой базе на Python/CocoIndex с поиском через MCP; качество поиска выросло примерно на 20%.',
        'Реализовал real-time взаимодействие на WebSocket и PostgreSQL LISTEN/NOTIFY; подход стал стандартом в большинстве проектов компании.',
        'Внедрил слоистую архитектуру Express-приложений по образцу NestJS и распространил её на большинство сервисов.',
        'Участвовал в BFF на Next.js с ISR: поисковые системы проиндексировали 100k+ страниц.',
        'Проектировал PostgreSQL и MongoDB на 1M+ записей с геоданными, GIN/GiST и полнотекстовым поиском в 50+ инстансах.',
        'Провёл code review и отвечал за качество в команде из 9 разработчиков; замещал Team Lead, нанимал и адаптировал 5 человек.',
        'Настроил GitLab CI/CD и интегрировал Stripe, AWS S3, Firebase, Google Calendar.',
      ],
    },
    {
      company: 'Magnumopus',
      position: 'Backend Developer (Node.js)',
      location: 'Нерюнгри',
      website: 'https://magnumopus.space',
      startDate: '2021-05-01',
      endDate: '2021-08-01',
      achievements: [
        'Разработал 5 Telegram-ботов для интернет-магазинов: каталог, корзина и оформление заказов.',
        'Выполнял деплой и дальнейшую поддержку ботов на Node.js, TypeScript, PostgreSQL и Prisma.',
      ],
    },
    {
      company: 'Интернет-магазин, аутсорсинг',
      position: 'Full-Stack Developer (Ruby on Rails)',
      location: 'Нерюнгри',
      startDate: '2019-09-01',
      endDate: '2021-01-01',
      achievements: [
        'С нуля собрал интернет-магазин украшений на Ruby on Rails: backend и основная бизнес-логика.',
        'Реализовал SEO-функциональность, frontend на JavaScript и вывел магазин в production.',
      ],
    },
    {
      company: 'Фогстрим',
      position: 'Full-Stack Developer (Python, PHP, JavaScript)',
      location: 'Хабаровск',
      website: 'https://fogstream.ru',
      startDate: '2019-03-01',
      endDate: '2019-04-01',
      achievements: [
        'Дорабатывал функциональность на 1С-Битрикс и расширял REST API для клиентских приложений.',
        'Писал SQL-запросы к PostgreSQL и поддерживал frontend на JavaScript.',
      ],
    },
    {
      company: 'Интернет-магазин, аутсорсинг',
      position: 'Full-Stack Developer (PHP, JavaScript)',
      location: 'Хабаровск',
      startDate: '2018-08-01',
      endDate: '2019-02-01',
      achievements: [
        'С нуля разработал интернет-магазин кафе с доставкой на Laravel и MySQL, затем около двух лет поддерживал проект.',
        'Писал парсеры и калькуляторы для автоматизации обработки данных и расчётов.',
      ],
    },
  ],
};
