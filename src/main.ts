import '@/assets/main.css'
import  setupI18n  from '../i18n.config'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

const i18n = setupI18n()
const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.mount('#app')