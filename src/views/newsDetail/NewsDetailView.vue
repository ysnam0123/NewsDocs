<script setup>
import supabase from '@/utils/supabase'
import { ref, onMounted, nextTick } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
import BackButton from '@/components/common/BackButton.vue'
import NewsRecommend from './NewsRecommend.vue'
import CommunityRecommend from './CommunityRecommend.vue'

const { getOrCreateSummary } = useSummary()
const { runTyped, typedTarget } = useTyping()
const isOpen = ref(false)
const isLoading = ref(true)
const news = ref(null)
const categoryLabel = ref(null)
const summary = ref('')
const defaultMessage = `앗, 아직 뉴스 내용이 없는 것 같아! 😅 
원문으로 안내해줄게 📰✨`
const route = useRoute()
console.log('너의 이름은', route.params)
const newsId = route.params.id
console.log('detail page newsId', newsId)
const handleSummary = async () => {
  if (isOpen.value) {
    isOpen.value = false
    return
  }

  isLoading.value = true
  isOpen.value = true
  await nextTick()
  if (summary.value) {
    await runTyped(summary.value)
  } else {
    const result = await getOrCreateSummary(news.value.news_id, news.value.description)
    if (result) {
      summary.value = result
      await runTyped(result)
    }
  }
  isLoading.value = false
}
onMounted(async () => {
  const { data, error } = await supabase
    .from('news')
    .select(`*, category:category_id (title)`)
    .eq('news_id', newsId)
    .maybeSingle()
  if (data && !error) {
    console.log('찾았다', data)
    news.value = data
  }
})
</script>
<template>
  <section class="flex">
    <div>
      <BackButton class="sm:flex hidden" />
    </div>
    <section v-if="news" class="sm:my-10 justify-center rounded-xl sm:max-w-[707px] mx-10">
      <div class="text-md text-[#7537E3] dark:text-[#A878FD] font-medium">
        <span># {{ news.category.title }}</span>
      </div>
      <h1 class="text-[32px] my-4 font-semibold dark:text-white">
        {{ news.title }}
      </h1>
      <div class="flex justify-between">
        <div>
          <span class="mr-2 text-sm text-[#A6A6A6]">{{ news.pubData }}</span>
          <span class="text-sm text-[#A6A6A6]">{{ news.source_name }}</span>
        </div>
        <div class="flex justify-center items-center gap-2">
          <ThumbsUp class="cursor-pointer" />
          <Eye /><span class="mr-2">{{ news.view_count ?? 0 }}</span>
        </div>
      </div>
      <div class="bg-[#f5f5f5]/70 rounded-2xl">
        <img :src="news.image_url" class="w-full h-[500px] object-contain rounded-2xl my-7.5" />
      </div>
      <div class="text-left flex gap-4 h-10 mb-5">
        <button
          @click="handleSummary"
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
            <h2 class="text-lg mb-4 text-[#7537E3] dark:text-[#A26EFF] font-semibold">
              세 줄 요약
            </h2>
            <div class="flex flex-col whitespace-pre-line leading-7">
              <span ref="typedTarget" class="dark:text-white"></span>
            </div>
          </div>
        </div>
      </div>
      <span class="leading-[29px] text-lg text-left dark:text-white font-extralight line-clamp-10">
        {{ news.description || defaultMessage }}
      </span>
      <button class="cursor-pointer mb-10 text-[#AEAEAE] hover:underline underline-offset-2">
        <a :href="news.link" target="_blank">원문보기</a>
      </button>
      <hr class="text-gray-200 dark:text-[#282828]" />
    </section>
    <div class="mr-2">
      <NewsRecommend class="sm:flex hidden" />
    </div>
  </section>
  <section>
    <CommunityRecommend
      v-if="news"
      :category-id="news.category_id"
      :category-label="categoryLabel"
    />
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
