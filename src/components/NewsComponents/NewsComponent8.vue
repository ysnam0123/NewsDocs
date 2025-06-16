<script setup>
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews2'
import ScrapImg from './children/ScrapImg.vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'

import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useNewsActions } from '@/composables/useNewsActions'
import { useSummary } from '@/composables/useSummary'
const { toDetailHandler, saveNews } = useNewsActions()
const { summarizeToggle, typedTarget, wantSummary, isOpen, isLoading } = useSummary()
// 호버 상태
const summaryHover = ref(false)
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const summaryStore = useSummaryStore()
const newsStore = useNewsStore()
const props = defineProps({
  news: Object,
})
const hoverHandler = () => {
  summaryHover.value = true
}
const hoverOut = () => {
  summaryHover.value = false
}

const handleClick = async () => {
  const { article_id, description, title } = props.news

  if (newsStore.selectedNews?.article_id !== article_id) {
    console.log('뉴스 저장 시도', title)
    await saveNews(props.news)
  }
  // description이 없을 때
  if (!description) {
    console.log('description X')
    summaryMessage.value = '이 뉴스는 원문에서 확인해주세요!'
    return
  }
  // 요약하고 저장
  await summarizeToggle(article_id, description)
}

// 마운트 후 상태 초기화
onMounted(() => {
  if (props.news) {
    isSummaryLoading.value = false
    console.log('🟢 컴포넌트 Mounted → 로딩 상태 false')
  }
})
</script>
<template>
  <div v-if="props.news" class="h-[430px] relative group select-none">
    <!-- 호버했을때 나오는 창 -->
    <div
      v-if="summaryHover && !wantSummary"
      class="absolute w-full h-[300px] inset-0 bg-transparent hover:bg-black/50 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click.stop="handleClick"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-medium text-[16px] z-20">요약보기</p>
    </div>
    <div
      v-if="wantSummary"
      class="h-full flex flex-col cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 gap-4 rounded-[20px] z-20 backdrop-blur-lg"
      @click.stop="summarizeToggle(news)"
    >
      <template v-if="isSummaryLoading">
        <div class="flex flex-col animate-pulse shrink-0 px-6 py-15">
          <div class="mb-8 h-7 w-[90px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[330px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[300px] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[260px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-else-if="summaryMessage">
        <!-- 요약할 내용 없음 메시지 표시 -->
        <div class="flex justify-center items-center">
          <div
            class="flex flex-col items-center justify-center text-white text-center font-semibold text-[16px] px-4"
          >
            <img :src="dogNotFound" alt="noDescribe" class="w-[200px]" />
            {{ summaryMessage }}
          </div>
        </div>
      </template>

      <div
        v-show="summaryStore.getSummary(props.news.article_id)"
        class="w-full h-[470px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px] overflow-scroll"
      >
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full">
          <h1 class="text-[20px] font-semibold text-white mb-[32px]">세줄 요약</h1>
          <div class="flex flex-col">
            <div class="text-white whitespace-pre-line leading-8">
              <span ref="typedTarget" class="text-white"></span>
            </div>
          </div>
        </div>
      </div>

      <button
        class="absolute bottom-5 right-4 z-30 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
        @click.stop="toDetailHandler(news)"
      >
        원문보기
      </button>
    </div>

    <!-- 뉴스 내용 -->
    <div>
      <!-- 뉴스 이미지 -->
      <div class="w-full h-[300px] cursor-pointer" @mouseover="hoverHandler">
        <img :src="news.image_url" class="w-full h-full object-cover rounded-[20px]" />
      </div>
      <!-- 뉴스 텍스트 -->
      <div>
        <div class="px-[10px] select-none">
          <div
            class="text-[var(--text-title)] text-[20px] font-bold mt-[12px] mb-[5px] line-clamp-1"
          >
            {{ props.news.title }}
          </div>
          <div class="text-[16px] text-[#A8A8A8] min-h-[50px] mb-[5px] line-clamp-2">
            {{ props.news.description || '' }}
          </div>
          <!-- 좋아요 박스 -->
          <div class="flex gap-2 text-[#A8A8A8] mb-16">
            <div class="flex gap-1">
              <ThumbsUp class="w-4" />
              <span>23</span>
            </div>
            <div class="flex gap-1">
              <Eye class="w-4" />
              <span>300</span>
            </div>
          </div>
        </div>
      </div>

      <ScrapImg class="absolute right-[15px] top-[10px] z-25" />
    </div>
  </div>
</template>
