<script setup>
import { nextTick, ref, onMounted } from 'vue'
import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useSummary } from '@/composables/useSummary'
import { useTyping } from '@/composables/useTyping'
const { getOrCreateSummary } = useSummary()
const { typedTarget, runTyped } = useTyping()
const summaryMessage = ref('')
const isSummaryLoading = ref(true)
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
    console.log(summary.value)
  } else if (!summary.value) {
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
  <div v-if="props.news" class="w-[600px] h-[118px] relative">
    <!-- 호버했을때 나오는 창 -->
    <div
      class="cursor-pointer absolute inset-0 bg-transparent hover:bg-black/50 flex flex-col items-center justify-center gap-4 rounded-[20px] z-10"
      @click="handleSummary"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>

    <div
      v-if="isOpen"
      class="cursor-pointer inset-0 bg-black/70 hover:bg-black/80 flex flex-col gap-4 rounded-[20px] z-20 backdrop-blur-lg absolute top-0"
      @click="isOpen = false"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="flex flex-col animate-pulse shrink-0 py-6 px-3">
          <div class="mb-3 h-7 w-[420px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-7 w-[400px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <template v-else-if="summaryMessage">
        <!-- 요약할 내용 없음 메시지 표시 -->
        <div
          class="flex flex-row gap-8 items-center text-white text-center text-[22px] font-bold px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="h-[125px]" />
          {{ summaryMessage }}
        </div>
      </template>
      <div v-show="!isLoading" class="flex relative z-30 w-[520px] h-full overflow-scroll">
        <div class="flex flex-col h-full">
          <div class="flex flex-col">
            <div class="max-w-[460px] px-4 py-2 text-white whitespace-pre-line leading-8">
              <span ref="typedTarget" class="text-white"></span>
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

    <div
      class="w-[600px] h-[118px] rounded-[16px] p-[20px] border-1 border-[#EBEBEB] dark:border-[#343434]"
    >
      <div class="flex flex-col gap-[12px]">
        <h1 class="w-[425px] text-[18px] font-semibold text-[var(--text-title)] line-clamp-1">
          {{ props.news.title }}
        </h1>
        <div class="flex">
          <p class="text-[#8f8f8f] text-[14px] w-[425px] line-clamp-2">
            {{ props.news.description || '' }}
          </p>
        </div>
      </div>
    </div>
    <!-- <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-15" /> -->
    <NewsScrapButton
      :news-id="props.news.news_id"
      :show-bg="false"
      class="absolute right-[8px] top-[10px] z-15"
    />

    <!-- 클릭했을 때 나오는 창 -->
  </div>
</template>
