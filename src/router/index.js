import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/LoginView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true,
        hideHeaderBasic: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/:id',
      name: 'UserProfile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('../views/ProfileEditView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
    },
    {
      path: '/profile/news',
      name: 'ProfileNews',
      component: () => import('../views/ProfileNewsView.vue'),
      meta: {
        hideHeaderBasic: true,
      },
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
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
