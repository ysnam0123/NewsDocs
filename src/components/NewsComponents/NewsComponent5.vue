<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'

import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
import NewsScrapButton from '../common/NewsScrapButton.vue'
const { getOrCreateSummary } = useSummary()
const { runTyped, typedTarget } = useTyping()
// 호버 상태
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const isLoading = ref(true)
const isOpen = ref(false)
const summary = ref('')
const props = defineProps({
  news: Object,
})

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
    const result = await getOrCreateSummary(props.news.news_id, props.news.description)
    if (result) {
      summary.value = result
      await runTyped(result)
    }
  }

  isLoading.value = false
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
  <div v-if="props.news" class="relative group flex gap-[22px] w-[600px] h-[184px] rounded-[16px]">
    <!-- 호버했을때 나오는 창 -->
    <div
      class="absolute w-full h-[184px] inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center z-12 cursor-pointer"
      @click="handleSummary"
    >
      <p class="text-white hidden group-hover:flex font-semibold z-20">요약보기</p>
    </div>
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col justify-center gap-4 rounded-[16px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="flex flex-col animate-pulse shrink-0 px-6">
          <div class="mb-8 h-7 w-[95px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[450px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[420px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-if="summaryMessage">
        <!-- 요약할 내용 없음 등 메시지 표시 -->
        <div
          class="flex flex-row gap-6 items-center text-white text-center text-[22px] font-bold px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="h-[200px]" />
          {{ summaryMessage }}
        </div>
      </template>

      <div v-show="!isLoading" class="w-full h-full rounded-[20px] absolute overflow-y-auto">
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full ml-5">
          <h1 class="text-lg text-white mb-3 mt-2">세줄 요약</h1>

          <div class="flex flex-col">
            <div class="py-2 w-[80%] text-white whitespace-pre-line leading-8">
              <span ref="typedTarget" class="text-white"></span>
            </div>
          </div>
        </div>
      </div>

      <button
        class="absolute bottom-5 right-4 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
        @click="toDetailHandler(news)"
      >
        원문보기
      </button>
    </div>

    <div class="w-[200px] h-[184px]">
      <img
        :src="news.image_url"
        class="w-full h-full object-cover rounded-[16px] cursor-pointer"
        @mouseover="hoverHandler"
      />
    </div>
    <div class="flex flex-col gap-[10px] py-[18px] w-[350px] h-[184px]">
      <div class="font-bold text-[18px] w-[300px] text-[var(--text-title)]">
        {{ props.news.title }}
      </div>
      <span class="text-sm text-[var(--text-content)] line-clamp-2">
        {{ props.news.description || '' }}
      </span>
      <!-- 좋아요 박스 -->
      <div class="flex gap-2 text-[#A8A8A8] mt-auto">
        <div class="flex gap-1">
          <ThumbsUp class="w-6" />
          <span>23</span>
        </div>
        <div class="flex gap-1">
          <Eye class="w-6" />
          <span>300</span>
        </div>
      </div>
    </div>

    <!-- <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-20" /> -->
    <NewsScrapButton
      :news-id="props.news.news_id"
      :show-bg="false"
      class="absolute right-[8px] top-[10px] z-15"
    />
  </div>
</template>
