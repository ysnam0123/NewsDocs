import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'

import { useInterestStore } from '@/stores/interestStore'
import MyInterest from '../views/MyInterest.vue'
import NewsLayout from '@/layout/NewsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyInterest',
      component: MyInterest,
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
      meta: { hideHeader: true, hideFooter: true, hideHeaderBasic: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/ProfileView.vue'),
      meta: {
        hideHeaderBasic: false,
      },
    },
    {
      path: '/profile/:nickname',
      name: 'DiffProfile',
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
        mobile: {
          hideHeader: true,
        },
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
      path: '/profile/:nickname/news',
      name: 'DiffProfileNews',
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
      path: '/profile/:nickname/write',
      name: 'DiffProfileWrite',
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
      path: '/interest/fav',
      name: 'favoriteinterest',
      component: () => import('../views/FavoriteInterest.vue'),
      meta: {
        hideHeader: true,
      },
    },
    {
      path: '/news',
      name: 'news',
      component: NewsLayout,
      children: [
        {
          path: '',
          name: 'allNews',
          component: () => import('../views/newsDetail/NewsListView.vue'),
        },
        {
          path: ':categoryName',
          name: 'Category',
          component: () => import('../views/newsDetail/CategoryView.vue'),
        },
        {
          path: 'detail/:id',
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
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue'),
      meta: {
        hideHeader: true,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

//관심사 3개 이상 선택 안하고 /fav로 라우팅 방지
router.beforeEach((to, from, next) => {
  const interestStore = useInterestStore()
  if (to.path === '/interest/fav' && interestStore.interest.length === 0) {
    console.log('관심사가 선택되지 않음. /interest로 리다이렉트')
    return next('/interest')
  }
  next()
})

export default router
