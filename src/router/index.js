import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
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
    {
      path: '/news',
      name: 'newsLayout',
      component: () => import('../layout/NewsLayout.vue'),
      children: [
        {
          path: '',
          name: 'newsList',
          component: () => import('../views/NewsListView.vue'),
        },
        {
          path: ':id',
          name: 'news',
          component: () => import('../views/NewsDetailView.vue'),
        },
      ],
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
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
