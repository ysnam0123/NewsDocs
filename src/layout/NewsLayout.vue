<script setup>
import CategoryHeader from '@/views/newsDetail/CategoryHeader.vue'
</script>
<template>
  <div class="mx-auto max-w-[1240px] flex flex-col justify-between">
    <CategoryHeader class="w-full min-w-[320px]" />
    <router-view></router-view>
  </div>
</template>

<!-- import BackButton from '@/components/common/BackButton.vue' -->
<!-- import NewsRecommend from '@/views/newsDetail/NewsRecommend.vue' -->
<!-- import { computed } from 'vue' -->
<!-- import { useRoute } from 'vue-router' -->

<!-- const route = useRoute() -->

<!-- const isDetailPage = computed(() => route.path.includes('/news/detail')) -->
<!-- <aside>
      <BackButton v-if="isDetailPage" />
    </aside>
    <div :class="[isDetailPage ? 'flex flex-1' : '']">
      <router-view />
    </div>
    <aside class="w-[307px]">
      <NewsRecommend v-if="isDetailPage" />
    </aside>
    -->
<!-- 
// { // path: 'detail/:id', // name: 'newsDetail', // component: () =>
import('../views/newsDetail/NewsDetailView.vue'), // props: true, // meta: { // hideHeaderBasic:
true, // hideHeader: false, // }, // },

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
          meta: {
            hideHeaderBasic: true,
            hideHeader: false,
          },
        },
      ],
    },

     -->
