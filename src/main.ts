import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import router from './router'
import './styles/style.css'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'

const app = createApp(App)
const pinia = createPinia()

app.use(VueTheMask as any)
app.use(autoAnimatePlugin)
app.use(router)
app.use(pinia)

app.mount('#app')
