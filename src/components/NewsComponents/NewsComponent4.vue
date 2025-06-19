<script setup>
import { onMounted, ref, nextTick } from 'vue'
// import { Eye } from 'lucide-vue-next'
import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
const { getOrCreateSummary } = useSummary()
const { runTyped, typedTarget } = useTyping()
const isOpen = ref(false)
const isLoading = ref(true)
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
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
  }
})
</script>
<template>
  <div v-if="props.news" class="h-[468px] w-[35%] relative select-none">
    <!-- 호버했을때 나오는 창 -->
    <div
      class="absolute w-full h-[350px] group inset-0 bg-transparent hover:bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click.stop="handleSummary"
    >
      <p class="text-white hidden group-hover:flex font-medium text-[16px] z-20">요약보기</p>
    </div>
    <div
      v-if="isOpen"
      class="h-full flex flex-col cursor-pointer absolute inset-0 bg-black/70 hover:bg-black/80 gap-4 rounded-[20px] z-20 backdrop-blur-lg"
      @click="isOpen = false"
    >
      <template v-if="isLoading">
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
        v-show="!isLoading"
        class="w-full h-[470px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px]"
      >
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full">
          <h1 class="text-[20px] font-semibold text-white mb-[32px]">세줄 요약</h1>
          <div class="flex flex-col">
            <div class="text-white whitespace-pre-line leading-8">
              <span v-show="!isLoading" ref="typedTarget" class="text-white text-lg"></span>
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

    <!-- 뉴스 내용 -->
    <div>
      <!-- 뉴스 이미지 -->
      <div class="w-full h-[350px] cursor-pointer">
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
          <div class="text-[16px] text-[#A8A8A8] min-h-[40px] mb-[5px] line-clamp-2">
            {{ props.news.description || '' }}
          </div>
          <!-- 좋아요 박스 -->
          <!-- <div class="flex text-[#A8A8A8] mb-16 gap-2">
            <Eye class="w-4" />
            <span>8</span>
          </div> -->
        </div>
      </div>

      <!-- <ScrapImg class="absolute right-[15px] top-[10px] z-25" /> -->
      <NewsScrapButton :news-id="props.news.news_id" class="absolute right-[8px] top-[10px] z-15" />
    </div>
  </div>
</template>
