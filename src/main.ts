import '@/assets/main.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  IoLanguage,
  PrSun,
  PrMoon,
  PrTrash,
  PrPencil,
  PrPlusCircle,
  PrCopy,
  PrTag,
  PrAt,
  PrTimes,
  PrPlus,
  PrSave,
  GiBroom
} from 'oh-vue-icons/icons'
import setupI18n from '../i18n.config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

addIcons(
  IoLanguage,
  PrSun,
  PrMoon,
  PrTrash,
  PrPencil,
  PrPlusCircle,
  PrCopy,
  PrTag,
  PrAt,
  PrTimes,
  PrPlus,
  PrSave,
  GiBroom
)
const i18n = setupI18n()
const pinia = createPinia()
const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(i18n)
app.use(pinia)
app.mount('#app')
