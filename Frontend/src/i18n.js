import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import vi from './locales/vi.json'

const i18n = createI18n({
  legacy: false, // 使用 Composition API 时需设置为 false
  locale: 'en', // 默认语言
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    vi
  }
})

export default i18n
