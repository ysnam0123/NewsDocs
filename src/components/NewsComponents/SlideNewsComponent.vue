<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'
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
const isSummaryLoading = ref(true)
const isOpen = ref(false)
const summaryMessage = ref('')
const summary = ref('')

const handleSummary = async () => {
  console.log('props.news:', props.news)
  if (isOpen.value) {
    isOpen.value = false
    return
  }
  isLoading.value = true
  isOpen.value = true
  await nextTick()

  if (summary.value) {
    await runTyped(summary.value)
    console.log('summary', summary.value)
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
  }
})
</script>
<template>
  <div
    v-if="props.news"
    class="rounded-[16px] sm:h-[384px] sm:w-full w-[185px] h-[202px] relative select-none cursor-pointer"
  >
    <!-- 호버했을때 나오는 창 -->
    <div
      class="absolute w-full h-full group inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center z-12 cursor-pointer"
      @click.stop="handleSummary"
    >
      <p class="text-white hidden group-hover:flex text-[16px] z-20">요약보기</p>
    </div>
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col gap-4 rounded-[16px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="flex flex-col h-full py-10 px-7 animate-pulse shrink-0">
          <div class="mb-6 h-8 w-[35%] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-4 h-6.5 w-[85%] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-4 h-6.5 w-[85%] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-4 h-6.5 w-[85%] bg-[#626262]/70 rounded-md"></div>
          <div class="h-6.5 w-[85%] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-else-if="summaryMessage">
        <!-- 요약할 내용 없음 메시지 표시 -->
        <div
          class="flex flex-col items-center justify-center text-white overflow-scroll text-center text-[16px] px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="sm:w-[200px] w-full h-full" />
          {{ summaryMessage }}
        </div>
      </template>

      <div
        v-show="!isLoading"
        class="w-full sm:h-[384px] h-full rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px]"
      >
        <div class="flex flex-col relative z-30">
          <h1 class="text-[20px] font-semibold text-white mb-[24px]">세줄 요약</h1>
          <div class="pr-1">
            <div
              class="text-white whitespace-pre-line leading-8 overflow-scroll scrollbar-hide max-h-[220px]"
            >
              <span v-show="!isLoading" ref="typedTarget" class="text-white"></span>
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

    <img :src="news.image_url" alt="slide" class="w-full h-full object-cover rounded-[16px]" />
    <div
      class="flex flex-col px-[20px] absolute sm:w-[292px] w-full h-full bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="sm:text-[20px] text-[13px] text-white mt-auto break-words line-clamp-2">
        {{ props.news.title }}
      </p>
      <!-- 좋아요 박스 -->
      <div class="flex gap-2 text-[#A8A8A8] mb-2">
        <div class="flex gap-1">
          <ThumbsUp class="w-4" />
          <span>23</span>
        </div>
        <div class="flex gap-1">
          <Eye class="w-4" />
          <span>{{ props.news.view_count }}</span>
        </div>
      </div>
    </div>
    <NewsScrapButton :news-id="props.news.news_id" class="absolute right-[8px] top-[10px] z-10" />
  </div>
</template>
