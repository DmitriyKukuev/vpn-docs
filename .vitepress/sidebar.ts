import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: 'AmneziaVPN',
      collapsed: false,
      items: [
        { text: 'Подключение через ключ в виде текста', link: '/guide/amneziavpn-key' },
        { text: 'Подключение через файл конфигурации', link: '/guide/amneziavpn' },
      ],
    },
    { text: 'Xray', link: '/guide/xray' },
  ],
}
