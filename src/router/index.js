import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/chooseinterest',
      name: 'chooseinterest',
      component: () => import('../views/ChooseInterest.vue'),
      meta: {
        hideHeader: true,
      },
    },
    {
      path: '/choosefavorite',
      name: 'choosefavorite',
      component: () => import('../views/FavoriteInterest.vue'),
      meta: {
        hideHeader: true,
      },
    },
  ],
})

export default router
