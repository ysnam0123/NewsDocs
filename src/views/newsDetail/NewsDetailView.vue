<script setup>
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import CommunityRecommend from './CommunityRecommend.vue'

import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews'
import { fetchOpenAi } from '@/api/fetchOpenAi'
import supabase from '@/utils/supabase'
import { ref, nextTick, watch } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'
import Typed from 'typed.js'

const newsStore = useNewsStore()
const summaryStore = useSummaryStore()
const news = newsStore.selectedNews
const isOpen = ref(false)
const isLoading = ref(true)
const typedTarget = ref(null)
let typedInstance = null

const runTyped = async (text) => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  if (typedTarget.value) {
    if (typedInstance) {
      typedInstance.destroy()
    }
    typedTarget.value.innerText = ''
    typedInstance = new Typed(typedTarget.value, {
      strings: [text],
      typeSpeed: 20,
      showCursor: false,
    })
  } else {
    console.warn('value is null')
  }
}

// 클릭하면 요약
const summarizeHandler = async () => {
  try {
    isOpen.value = true
    isLoading.value = true
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
    await runTyped(result)
    const { error: insertError } = await supabase
      .from('summaries')
      .insert([{ news_id: news.article_id, summaries_contents: result }])

    if (insertError) {
      console.error('요약 저장 실패', error)
    }
  } catch (err) {
    console.error('에러 발생', err)
  } finally {
    isLoading.value = false
  }
}

watch(isLoading, async (value) => {
  if (value === false && summaryStore.summaryNews) {
    await nextTick()
    runTyped(summaryStore.summaryNews)
  }
})
</script>
<template>
  <section v-if="news" class="my-10 justify-center rounded-xl max-w-[707px]">
    <div class="text-md text-[#7537E3] dark:text-[#A878FD] font-medium">
      <span># {{ news.keywords[0] }}</span>
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
        <Eye />
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
      v-if="isOpen"
      class="justify-center rounded-xl max-w-[707px] bg-[#EFEFEF] mb-5 dark:bg-[#323232] dark:text-white"
    >
      <!-- 로딩중 -->
      <div v-if="isLoading" class="flex flex-col justify-center items-center h-[200px]">
        <DotLottieVue
          style="height: 120px"
          autoplay
          loop
          noMargin
          src="https://lottie.host/c3112035-c95f-40a1-b006-a53c7780f4a7/MFmjOedJhQ.lottie"
        />
        <p class="text-lg">요약중...</p>
      </div>
      <!-- 요약보기 -->
      <div v-else>
        <div class="py-5 mx-8">
          <h2 class="text-lg mb-4 text-[#7537E3] dark:text-[#A26EFF] font-semibold">세 줄 요약</h2>
          <div class="flex flex-col whitespace-pre-line leading-7">
            <span ref="typedTarget" class="dark:text-white"></span>
          </div>
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
    <!-- <CommunityRecommend /> -->
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
