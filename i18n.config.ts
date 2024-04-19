import { createI18n } from 'vue-i18n'
import en from './src/locale/en.json'
import sp from './src/locale/sp.json'

export default function setupI18n() {
  return createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: en,
      sp: sp
    }
  })
}
