<script setup>
import { nextTick, ref, onMounted } from 'vue'
import ScrapImg from './children/ScrapImg.vue'
import { ThumbsUp, Eye } from 'lucide-vue-next'
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
  <div v-if="props.news" class="relative rounded-[16px] h-[468px] w-[75%] select-none group">
    <!-- 호버했을때 나오는 창 -->
    <div
      @click.stop="handleSummary"
      class="absolute h-full inset-0 hover:bg-black/30 rounded-[20px] flex items-center justify-center text-center z-12 cursor-pointer"
    >
      <p class="hidden group-hover:flex text-white text-[16px] hover:z-20">요약보기</p>
    </div>
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="absolute cursor-pointer inset-0 bg-black/70 hover:bg-black/80 flex flex-col items-center gap-4 rounded-[16px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isLoading">
        <div class="w-full flex flex-col py-10 px-7 animate-pulse shrink-0">
          <div class="mb-6 h-9 w-[100px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-4 h-8 w-[530px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-4 h-8 w-[510px] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[400px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <!-- 요약할 내용 없음 메시지 표시 -->
      <template v-else-if="summaryMessage">
        <div
          class="flex flex-col items-center justify-center text-white text-center text-[16px] px-4"
        >
          <img :src="dogNotFound" alt="noDescribe" class="w-[200px]" />
          {{ summaryMessage }}
        </div>
      </template>

      <div
        v-show="!isLoading"
        class="w-full h-[468px] rounded-[20px] pt-[40px] pb-[32px] px-[30px]"
      >
        <div class="flex flex-col z-30 h-full text-white">
          <h1 class="text-[20px] font-semibold mb-[24px]">세 줄 요약</h1>
          <div class="max-h-[220px] pr-1 w-full">
            <div class="whitespace-pre-line leading-8 w-full text-left">
              <span
                v-show="!isLoading"
                ref="typedTarget"
                class="text-[20px] w-full text-left"
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

    <img :src="news.image_url" alt="slide" class="w-full h-full object-cover rounded-[16px]" />
    <div
      v-if="props.news.description"
      class="flex flex-col gap-2 px-[20px] absolute w-full h-[468px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="text-[20px] text-white mt-auto break-words line-clamp-2">
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
          <span>300</span>
        </div>
      </div>
    </div>

    <ScrapImg class="absolute right-[8px] top-[10px] z-20" />
  </div>
</template>
