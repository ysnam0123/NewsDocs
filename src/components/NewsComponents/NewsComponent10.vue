<script setup>
import { ref, nextTick, onMounted } from 'vue'
//import ScrapImg from './children/ScrapImg.vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'
import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
import NewsScrapButton from '../common/NewsScrapButton.vue'

// props
const props = defineProps({
  news: Object,
})
const { getOrCreateSummary } = useSummary()
const { typedTarget, runTyped } = useTyping()
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const isLoading = ref(true)
const isOpen = ref(false)
const summary = ref('')

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
onMounted(() => {
  if (props.news) {
    isSummaryLoading.value = false
  }
})
</script>
<template>
  <div
    v-if="props.news"
    class="sm:w-[292px] sm:h-[384px] w-[185px] h-[222px] relative select-none group"
  >
    <!-- 호버했을때 나오는 창 -->
    <div
      @click.stop="handleSummary"
      @mouseleave="hoverOut"
      class="absolute w-full h-full inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center z-12 cursor-pointer"
    >
      <p class="text-white hidden group-hover:flex text-[16px] z-20">요약보기</p>
    </div>

    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col items-center justify-center gap-4 rounded-[16px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="w-full hidden sm:flex flex-col animate-pulse shrink-0 ml-3">
          <div class="mb-8 h-7 w-[80px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[250px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[230px] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[200px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-if="summaryMessage">
        <!-- 요약할 내용 없음 메시지 표시 -->
        <div
          class="flex flex-col items-center justify-center text-white text-center text-[16px] px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="w-[150px]" />
          {{ summaryMessage }}
        </div>
      </template>

      <div
        v-show="!isLoading"
        class="w-full h-full rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px]"
      >
        <div class="flex flex-col relative z-30 h-full">
          <h1 class="hidden sm:block text-[20px] font-semibold text-white mb-[24px]">세줄 요약</h1>

          <div
            class="sm:max-h-[220px] max-h-[calc(100%-20px)] pr-1 text-white whitespace-pre-line w-full text-left leading-8 overflow-scroll"
          >
            <span ref="typedTarget" class="text-white w-full text-left"></span>
          </div>
        </div>
      </div>
      <router-link
        :to="`/news/detail/${props.news.news_id}`"
        class="absolute sm:bottom-5 bottom-2 sm:right-4 right-3 z-30 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] mt-[16px] ml-auto flex items-center cursor-pointer hover:bg-[#D2D2D2]"
      >
        원문보기
      </router-link>
    </div>

    <div class="relative w-full h-full">
      <img :src="news.image_url" alt="newsImage" class="w-full h-full object-cover rounded-3xl" />
      <div
        class="flex flex-col px-[20px] absolute sm:h-[187px] h-full sm:w-[292px] w-full bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
      >
        <p class="font-bold sm:text-[20px] text-[12px] text-[white] mt-auto line-clamp-2">
          {{ props.news.title }}
        </p>
        <!-- 좋아요 박스 -->
        <div class="flex gap-2 text-[#A8A8A8] mb-3">
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
    <NewsScrapButton :news-id="props.news.news_id" class="absolute right-[8px] top-[10px] z-10" />
    <!-- <ScrapImg class="absolute right-[8px] top-[10px] z-15" /> -->
  </div>
</template>
