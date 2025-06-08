<script setup>
import BackButton from '@/components/common/BackButton.vue'
import NewsRecommend from '@/views/newsDetail/NewsRecommend.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isDetailPage = computed(() => route.name === 'newsDetail')
</script>
<template>
  <div class="mx-auto max-w-[1240px] flex justify-between">
    <aside>
      <BackButton v-if="isDetailPage" />
    </aside>
    <div class="flex flex-1">
      <router-view />
    </div>
    <aside class="w-[307px]">
      <NewsRecommend v-if="isDetailPage" />
    </aside>
  </div>
</template>
