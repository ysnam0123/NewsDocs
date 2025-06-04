import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/news_detail',
      name: 'newsList',
      component: () => import('../views/NewsListView.vue'),
    },
    {
      path: '/news_detail/:id',
      name: 'newsDetail',
      component: () => import('../layout/NewsDetailView.vue'),
    },
  ],
})

export default router
