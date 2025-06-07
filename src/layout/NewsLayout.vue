<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import NewsRecommend from '@/views/newsDetail/NewsRecommend.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isDetailPage = computed(() => route.name === 'newsDetail')
</script>
<template>
  <div class="flex h-screen">
    <div class="flex">
      <ProfileCard v-if="isDetailPage" />
      <router-view />
      <NewsRecommend v-if="isDetailPage" />
    </div>
  </div>
</template>
