import { createMemoryHistory, createRouter } from 'vue-router'
import StatsView from '../views/StatsView.vue'
import NewsView from '../views/NewsView.vue'

const routes = [
  { path: '/', name: 'donat', component: () => import('@/views/DonateView.vue') },
  {
    path: '/stats',
    name: 'stats',
    component: () => StatsView,
  },
  {
    path: '/news',
    name: 'news',
    component: () => NewsView,
  },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
