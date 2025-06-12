<script setup>
import ThumbsUp from '@/components/icon/thumbsUp.vue'
import CommunityRecommend from './CommunityRecommend.vue'
import ViewCount from '@/components/icon/viewCount.vue'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews'
import { fetchOpenAi } from '@/api/fetchOpenAi'
import supabase from '@/utils/supabase'
import { ref } from 'vue'

const newsStore = useNewsStore()
const summaryStore = useSummaryStore()
const news = newsStore.selectedNews
const isOpen = ref(false)
const summarizeHandler = async () => {
  isOpen.value = true
  if (!news.description) return

  const { data: savedSummary, error } = await supabase
    .from('summaries')
    .select('summaries_contents')
    .eq('news_id', news.article_id)
    .maybeSingle()

  if (error) {
    console.error('요약 조회 실패', error)
    return
  }
  if (savedSummary && savedSummary?.summaries_contents) {
    summaryStore.summaryNews = savedSummary.summaries_contents
    console.log('기존 요약')
    return
  }
  const result = await fetchOpenAi(news.description)
  summaryStore.summaryNews = result

  const { error: insertError } = await supabase
    .from('summaries')
    .insert([{ news_id: news.article_id, summaries_contents: result }])

  if (insertError) {
    console.error('요약 저장 실패', error)
  }
}
</script>
<template>
  <section v-if="news" class="my-10 justify-center rounded-xl max-w-[707px]">
    <div class="text-md text-[#7537E3] dark:text-[#A878FD] font-medium">
      <span># {{ news.keywords.join('') }}</span>
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
    <div class="bg-[#f5f5f5]/70 rounded-2xl">
      <img :src="news.image_url" class="w-full h-[500px] object-contain rounded-2xl my-7.5" />
    </div>
    <div class="text-left flex gap-4 h-10 mb-5">
      <button
        @click="summarizeHandler"
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
    <div
      v-if="isOpen && summaryStore.summaryNews"
      class="justify-center rounded-xl max-w-[707px] bg-[#EFEFEF] mb-5 dark:bg-[#323232] dark:text-white"
    >
      <div class="py-5 mx-8">
        <h2 class="text-lg mb-4 text-[#7537E3] dark:text-[#A26EFF] font-semibold">세 줄 요약</h2>
        <div class="flex flex-col whitespace-pre-line leading-7">
          {{ summaryStore.summaryNews }}
        </div>
      </div>
    </div>
    <span class="leading-[29px] text-lg text-left dark:text-white font-extralight">
      {{ news.description }}
    </span>
    <button class="cursor-pointer mb-10 text-[#AEAEAE] ml-2 hover:underline underline-offset-2">
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
