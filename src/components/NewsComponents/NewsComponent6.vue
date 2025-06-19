<script setup>
import { onMounted, ref, nextTick } from 'vue'
import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { ThumbsUp, Eye } from 'lucide-vue-next'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'

const isLoading = ref(true)
const isOpen = ref(false)
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const summary = ref('')
const { runTyped, typedTarget } = useTyping()
const { getOrCreateSummary } = useSummary()
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
  }
})
</script>
<template>
  <div v-if="props.news" class="flex w-full sm:h-[184px] h-[124px] relative">
    <!-- 호버했을때 나오는 창 -->
    <div
      class="absolute w-full h-full group inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center z-12 cursor-pointer"
      @click="handleSummary"
    >
      <p class="text-white hidden group-hover:flex text-[16px] z-20">요약보기</p>
    </div>

    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col gap-4 rounded-[20px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="hidden sm:flex flex-col animate-pulse shrink-0 px-6 py-6">
          <div class="mb-8 h-7 w-[90px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[450px] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[430px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-else-if="summaryMessage">
        <!-- 요약할 내용 없음 등 메시지 표시 -->
        <div
          class="flex flex-row gap-6 items-center text-white text-center text-[22px] font-bold px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="h-[200px]" />
          {{ summaryMessage }}
        </div>
      </template>
      <div
        v-show="!isLoading"
        class="sm:max-w-[500px] w-full sm:h-full max-h-[120px] rounded-[20px] z-30 absolute top-0 overflow-scroll"
      >
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative h-full">
          <div class="flex flex-col">
            <div class="px-4 py-2 text-white whitespace-pre-line leading-8">
              <span
                v-show="!isLoading"
                ref="typedTarget"
                class="sm:text-lg text-[13px] w-full sm:py-0 py-4 text-left block"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <router-link
        :to="`/news/detail/${props.news.news_id}`"
        class="absolute bottom-5 right-4 z-30 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] mt-[16px] ml-auto flex items-center cursor-pointer hover:bg-[#D2D2D2]"
      >
        원문보기
      </router-link>
    </div>

    <div>
      <img :src="news.image_url" alt="dmz" class="rounded-[16px] w-[600px] h-full object-cover" />
    </div>
    <div
      class="flex items-center justify-between px-[20px] pt-[20px] absolute h-[83px] bg-linear-to-t from-black to-transparent sm:w-[600px] w-full bottom-0 z-10 rounded-[16px]"
    >
      <p class="font-bold w-[400px] sm:text-[18px] text-[13px] text-[white] line-clamp-2">
        {{ props.news.title }}
      </p>
      <!-- 좋아요 박스 -->
      <div class="hidden sm:flex gap-2 text-[#A8A8A8]">
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

    <!-- <ScrapNotOnImg class="absolute right-[15px] top-[10px] z-15" /> -->
    <NewsScrapButton :news-id="props.news.news_id" class="absolute right-[8px] top-[10px] z-15" />
  </div>
</template>
