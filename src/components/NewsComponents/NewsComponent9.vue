<script setup>
import { ref, nextTick, onMounted } from 'vue'

// import { Eye } from 'lucide-vue-next'
import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
import NewsScrapButton from '../common/NewsScrapButton.vue'

const props = defineProps({
  news: Object,
})

const { getOrCreateSummary } = useSummary()
const { runTyped, typedTarget } = useTyping()
const isLoading = ref(true)
const summaryMessage = ref('')
const isOpen = ref(false)
const summary = ref('')
const isSummaryLoading = ref(true)

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
  <div v-if="props.news" class="group w-[300px] h-[385px] relative select-none">
    <!-- 호버했을때 나오는 창 -->
    <div
      class="absolute w-full h-[217px] group inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click.stop="handleSummary"
    >
      <p class="text-white hidden group-hover:flex text-[16px] z-20">요약보기</p>
    </div>

    <!-- 클릭했을 때 나오는 창 -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="w-full cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col rounded-[20px] z-20 backdrop-blur-lg"
    >
      <template v-if="isLoading">
        <div class="w-full flex flex-col animate-pulse shrink-0 px-7 py-9">
          <div class="mb-8 h-7 w-[40%] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-7 w-[80%] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-7 w-[80%] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[35%] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-if="summaryMessage">
        <!-- 요약할 내용 없음 메시지 표시 -->
        <div
          class="flex flex-col items-center justify-center text-white text-center font-semibold text-[16px] px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="w-[150px]" />
          {{ summaryMessage }}
        </div>
      </template>
      <div
        v-show="!isLoading"
        class="h-[385px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px]"
      >
        <div class="flex flex-col relative z-30 h-full">
          <h1 class="text-[20px] text-white mb-8">세줄 요약</h1>
          <div class="flex flex-col w-full">
            <div class="max-h-[220px] overflow-y-auto scrollbar-hide pr-1">
              <div class="text-white whitespace-pre-line leading-8">
                <span ref="typedTarget" class="text-lg w-full text-left block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-link
        :to="`/news/detail/${props.news.news_id}`"
        class="absolute bottom-5 right-4 z-30 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
      >
        원문보기
      </router-link>
    </div>

    <div class="w-[300px] h-[217px] mb-[16px]">
      <img :src="news.image_url" class="w-full h-full object-cover space-y-0.5 rounded-[20px]" />
    </div>

    <div class="mb-[12px] px-[10px]">
      <div class="text-xl text-[var(--text-title)] font-bold mb-[10px] max-h-[56px] line-clamp-2">
        {{ props.news.title }}
      </div>
      <div class="text-sm text-[#A8A8A8] min-h-[40px] line-clamp-2 mb-[12px]">
        {{ props.news.description || '' }}
      </div>
      <!-- 좋아요 박스 -->
      <!-- <div class="flex gap-2 text-[#A8A8A8] mb-16">
        <Eye class="w-4" />
        <span>11</span>
      </div> -->
    </div>

    <!-- <ScrapImg class="absolute right-[8px] top-[10px] z-25" /> -->
    <NewsScrapButton :news-id="props.news.news_id" class="absolute right-[8px] top-[10px] z-10" />
  </div>
</template>
