import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideHeader: true,
        hideFooter: true,
        hideHeaderBasic: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { hideHeader: true, hideFooter: true },
    },

    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/ProfileView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/:id',
      name: 'UserProfile',
      component: () => import('../views/profile/ProfileView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('../views/profile/ProfileEditView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/news',
      name: 'ProfileNews',
      component: () => import('../views/profile/ProfileNewsView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/write',
      name: 'ProfileWrite',
      component: () => import('../views/profile/ProfileWriteView.vue'),
    },
    {
      path: '/interest',
      name: 'interest',
      component: () => import('../views/ChooseInterest.vue'),
      meta: {
        hideHeader: true,
      },
    },
    {
      path: '/favoriteinterest',
      name: 'favoriteinterest',
      component: () => import('../views/FavoriteInterest.vue'),
      meta: {
        hideHeader: true,
      },
    },
    {
      path: '/myinterest',
      name: 'myInterest',
      component: () => import('../views/MyInterest.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/news',
      name: 'newsLayout',
      component: () => import('../layout/NewsLayout.vue'),
      meta: {
        hideHeader: false,
        hideFooter: true,
        hideHeaderBasic: true,
      },
      children: [
        {
          path: '',
          name: 'newsList',
          component: () => import('../views/newsDetail/NewsListView.vue'),
        },
        {
          path: 'detail',
          name: 'newsDetail',
          component: () => import('../views/newsDetail/NewsDetailView.vue'),
          // props: true,
        },
      ],
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/community/CommunityListView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/community/:id',
      name: 'communityDetail',
      component: () => import('../views/community/CommunityDetailView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
  ],
})

export default router
