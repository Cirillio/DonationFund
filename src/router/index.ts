import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', name: 'donat', component: () => import('../views/DonateView.vue') },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('../views/StatsView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
