import { createWebHistory, createRouter } from 'vue-router'
// Не импортируйте компоненты здесь, если они будут загружаться лениво!
// import StatsView from '../views/StatsView.vue'
// import NewsView from '../views/NewsView.vue'

const routes = [
  { path: '/', name: 'donat', component: () => import('../views/DonateView.vue') },
  {
    path: '/stats',
    name: 'stats',
    // Правильная ленивая загрузка: используйте import() как функцию
    component: () => import('../views/StatsView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    // Правильная ленивая загрузка
    component: () => import('../views/NewsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
