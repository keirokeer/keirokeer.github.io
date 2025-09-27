// Конфигурация сайта - замените значения на свои
export const siteConfig = {
  username: 'keirokeer', // Ваш никнейм на GitHub (с него будет подгружаться аватарка)
  
  // Никнейм и описание
  // Для переноса на следующую строку используйте \n
  content: {
    name: 'keirokeer',
    bio: `Audio engineer, content creator & voice synthesis enthusiast.
Creator/voice of KEIRO and founder of LUNAI Project (DiffSinger virtual performers).
OpenUtau contributor.
Commissions open.`,
  },
  
  // Цветовая схема кнопок
  // Доступные цвета: cream, brown, red, red-light, orange, orange-light
  // green, green-light, mint, mint-light, blue, blue-light, violet, violet-light
  // purple, purple-light, pink, pink-light, cherry, cherry-light
  colors: {
    primaryButton: {
      normal: 'orange',       // Основной цвет большой кнопки
      hover: 'orange-light'   // Цвет при наведении
    },
    platformButton: {
      hover: 'orange-light'   // Цвет рамки кнопок платформ при наведении
    }
  },
  
  // Главная кнопка (Commissions)
  // Если type: 'internal' - будет ссылка на страницу /commissions этого сайта
  // Если type: 'external' - будет ссылка на внешний сайт (укажите url)
  primaryButton: {
    type: 'internal', // 'internal' или 'external'
    name: 'Commissions', // Текст кнопки
    url: '' // Заполняется только если type: 'external'
  },
  
  // Две основные кнопки
  mainButtons: [
    {
      name: 'USTs / SVPs',
      url: 'https://www.mediafire.com/folder/hzd1w9m2e176q/keirokeer_USTs'
    },
    {
      name: 'LUNAI Project', 
      url: 'https://lunaiproject.github.io/'
    }
  ],
  
  // Платформы
  // Чтобы какая то платформа не отображалась - уберите ссылку на нее
  platforms: {
    youtube: 'https://www.youtube.com/@keirokeer',
    soundcloud: 'https://soundcloud.com/keirokeer',
    twitter: 'https://x.com/keirokeer',
    bluesky: '',
    tiktok: '',
    twitch: '',
    vk: '',
    telegram: '',
    deviantart: '',
    artstation: '',
    furaffinity: '',
    pinterest: '',
    instagram: '',
    facebook: '',
    github: 'https://github.com/keirokeer',
    boosty: 'https://boosty.to/keirokeer',
    lavatop: '',
    paypal: '',
    discord: 'keirokeer' // Для Discord указывается только никнейм
  }
};

export default siteConfig;