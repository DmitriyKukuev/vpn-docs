import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { nav } from './nav'
import { sidebar } from './sidebar'

let secretToken = process.env.DOCS_SECRET_TOKEN || ''

if (!secretToken) {
  const envPath = resolve(import.meta.dirname, '../.env')
  if (existsSync(envPath)) {
    const match = readFileSync(envPath, 'utf-8').match(/^DOCS_SECRET_TOKEN=(.+)$/m)
    if (match) secretToken = match[1].trim()
  }
}
const hasToken = secretToken.length > 0

if (hasToken) {
  console.log(`[docs] Secret token detected — site will be served at /${secretToken}/`)
} else {
  console.log('[docs] No DOCS_SECRET_TOKEN set — site will be served at /')
}

export default defineConfig({
  ...(hasToken ? { base: `/${secretToken}/`, outDir: resolve(import.meta.dirname, `dist/${secretToken}`) } : {}),
  lang: 'ru',
  title: 'VPN Сервис',
  description: 'Документация VPN-сервиса',
  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
  ],
  themeConfig: {
    nav,
    sidebar,
    outline: { level: [2, 3], label: 'Содержание' },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница',
    },
    returnToTopLabel: 'Наверх',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
              modal: {
                noResultsText: 'Ничего не найдено',
                resetButtonTitle: 'Сбросить поиск',
                footer: { selectText: 'Выбрать', navigateText: 'Перейти', closeText: 'Закрыть' },
              },
            },
          },
        },
      },
    },
  },
})
