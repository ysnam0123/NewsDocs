<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import { fetchOpenAiShort } from '@/api/fetchOpenAiShort'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews'
import Typed from 'typed.js'
import ScrapNotOnImg from './children/ScrapNotOnImg.vue'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'

const summaryHover = ref(false)
const hoverHandler = () => {
  summaryHover.value = true
}
const hoverOut = () => {
  summaryHover.value = false
}
const wantSummary = ref(false)
const summarizeToggle = () => {
  wantSummary.value = !wantSummary.value
}

const props = defineProps({
  news: Object,
  newsSaveHandler: Function,
  newsDetail: Function,
})

const router = useRouter()
const isOpen = ref(false)
const summaryStore = useSummaryStore()
const newsStore = useNewsStore()
const isLoading = ref(true)
const typedTarget = ref(null)
let typedInstance = null

const handleClick = async () => {
  if (newsStore.selectedNews?.article_id !== props.news.article_id) {
    console.log('저장 호출됨:', props.news.title)
    await props.newsSaveHandler(props.news)
  }
  if (!props.news.description) return
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    if (!summaryStore.summaryNews) {
      await summarizeHandler()
    } else {
      await runTyped(summaryStore.summaryNews)
    }
  }
}

const runTyped = async (text) => {
  await nextTick()

  if (typedTarget.value) {
    if (typedInstance) {
      typedInstance.destroy()
    }
    typedTarget.value.innerText = ''
    new Typed(typedTarget.value, {
      strings: [text],
      typeSpeed: 20,
      showCursor: false,
    })
  } else {
    console.warn('value is null')
  }
}

const summarizeHandler = async () => {
  try {
    if (!props.news.description) return

    const { data: savedSummary } = await supabase
      .from('summaries')
      .select('summaries_contents')
      .eq('news_id', props.news.article_id)
      .maybeSingle()

    if (savedSummary && savedSummary.summaries_contents) {
      summaryStore.summaryNews = savedSummary.summaries_contents
      await runTyped(savedSummary.summaries_contents)
      return
    }
    const result = await fetchOpenAiShort(props.news.description)
    summaryStore.summaryNews = result
    await runTyped(result)
    const { error } = await supabase
      .from('summaries')
      .insert([{ news_id: props.news.article_id, summaries_contents: result }])
      .select()

    if (error) {
      console.error('요약 저장 실패', error)
      const { error } = await supabase
        .from('summaries')
        .select('*')
        .eq('news_id', props.news.article_id)
    }
  } catch (err) {
    console.error('요약 중 요류', err)
  } finally {
    isLoading.value = false
  }
}

const toDetailHandler = () => {
  router.push(`/news/detail/${props.news.article_id}`)
}
onMounted(() => {
  if (props.news) {
    isLoading.value = false
  }
})
</script>
<template>
  <div
    v-if="props.news"
    class="flex w-[600px] h-[184px] relative"
    @mouseover="hoverHandler"
    @click="handleClick"
  >
    <div class="w-[600px] h-[184px]">
      <img :src="news.image_url" alt="dmz" class="rounded-[16px] w-full h-full object-cover" />
    </div>
    <div
      v-show="!wantSummary"
      class="flex items-center justify-between px-[20px] pt-[20px] absolute h-[83px] w-[600px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="font-bold w-[400px] text-[18px] text-[white]">
        {{ props.news.title }}
      </p>
      <!-- 좋아요 박스 -->
      <div class="flex gap-2 text-[#A8A8A8]">
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
    <div
      v-if="wantSummary"
      class="absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col items-center justify-center gap-4 rounded-[20px] z-20 backdrop-blur-lg"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isSummaryLoading">
        <div class="flex flex-col animate-pulse shrink-0">
          <div class="mb-8 h-7 w-[84px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[500px] bg-[#626262]/70 rounded-md"></div>
          <div class="mb-3 h-8 w-[400px] bg-[#626262]/70 rounded-md"></div>
          <div class="h-8 w-[400px] bg-[#626262]/70 rounded-md"></div>
        </div>
      </template>
      <div
        v-else-if="summaryStore.summaryNews"
        class="w-full h-full rounded-[20px] absolute top-0 overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/80 z-30"></div>
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full">
          <div class="flex flex-col">
            <div class="px-4 py-2 text-white whitespace-pre-line leading-8">
              <span ref="typedTarget" class="text-white"></span>
            </div>
          </div>
        </div>
      </div>
      <button
        class="absolute bottom-5 right-4 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
        @click.stop="toDetailHandler"
      >
        원문보기
      </button>
    </div>
    <ScrapNotOnImg class="absolute right-[15px] top-[10px] z-15" />
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-full h-[184px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeToggle"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
  </div>
</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s ease forwards;
}
.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}
</style>
