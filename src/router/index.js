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
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/profile/:id',
      name: 'UserProfile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('../views/ProfileEditView.vue'),
    },
    {
      path: '/profile/news',
      name: 'ProfileNews',
      component: () => import('../views/ProfileNewsView.vue'),
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
    },
    {
      path: '/news',
      name: 'newsLayout',
      component: () => import('../layout/NewsLayout.vue'),
      meta: {
        hideHeader: false,
        hideFooter: true,
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
