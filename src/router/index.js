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
      path: '/community',
      name: 'community',
      component: () => import('../views/community/CommunityListView.vue'),
    },
    {
      path: '/community/:id',
      name: 'communityDetail',
      component: () => import('../views/community/CommunityDetailView.vue'),
    },
  ],
})

export default router
