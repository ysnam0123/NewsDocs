<script setup>
import { onMounted } from 'vue'
import ThumbsUp from '@/components/icon/thumbsUp.vue'
import CommunityRecommend from './CommunityRecommend.vue'
import ViewCount from '@/components/icon/viewCount.vue'
import { useNewsStore } from '@/stores/newsStore'

const newsStore = useNewsStore()
const news = newsStore.selectedNews

onMounted(async () => {})
</script>
<template>
  <section v-if="news" class="my-10 justify-center rounded-xl max-w-[707px]">
    <div class="text-md text-[#7537E3] dark:text-[#A878FD] font-medium">
      <span># 연예</span>
    </div>
    <h1 class="text-[32px] my-4 font-semibold dark:text-white">
      {{ news.title }}
    </h1>
    <div class="flex justify-between">
      <div>
        <span class="mr-2 text-sm text-[#A6A6A6]">{{ news.pubData }}</span>
        <span class="text-sm text-[#A6A6A6]">{{ news.source_name }}</span>
      </div>
      <div class="flex justify-center items-center gap-3">
        <ThumbsUp />
        <ViewCount />
      </div>
    </div>
    <img :src="news.image_url" class="w-full h-auto rounded-2xl my-7.5" />
    <div class="text-left flex gap-4 h-10 mb-5">
      <button
        class="cursor-pointer px-4 rounded-lg bg-[#7537E3] hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9] transition duration-300 text-white items-center justify-center"
      >
        요약보기
      </button>
      <div
        class="bounce relative w-fit bg-[#EFEFEF] text-[#282828] px-4 mr-2 pt-2 rounded-sm items-center justify-center"
      >
        뉴스독이 기사를 세 줄로 요약해드려요!
        <div class="absolute -left-1 top-3 w-4 h-4 bg-[#EFEFEF] rotate-45"></div>
      </div>
    </div>
    <span class="leading-[29px] text-lg text-left dark:text-white font-extralight">
      {{ news.description }}
    </span>
    <button class="cursor-pointer mb-10 text-[#AEAEAE]">
      <a :href="news.link" target="_blank">원문보기</a>
    </button>
    <hr class="text-gray-200 dark:text-[#282828]" />
    <CommunityRecommend />
  </section>
  <section v-else>
    <p>로딩중...</p>
  </section>
</template>
<style scoped>
.bounce {
  animation: 0.5s linear 0s infinite alternate bounce;
}
@keyframes bounce {
  from {
    transform: translateY(-0.3vh);
  }
  to {
    transform: translateY(0vh);
  }
}
</style>
