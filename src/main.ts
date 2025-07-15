import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueTheMask from 'vue-the-mask'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(VueTheMask)
app.use(autoAnimatePlugin)
app.mount('#app')
