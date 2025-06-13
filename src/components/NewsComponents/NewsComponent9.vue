<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import { fetchOpenAi } from '@/api/fetchOpenAi'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews'
import Typed from 'typed.js'
import ScrapImg from './children/ScrapImg.vue'
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
    const result = await fetchOpenAi(props.news.description)
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
  <div v-if="props.news" class="w-[300px] h-[385px] relative" @click="handleClick">
    <div class="w-[300px] h-[217px] mb-[16px]">
      <img :src="news.image_url" class="w-full h-full object-cover" @mouseover="hoverHandler" />
    </div>
    <div class="mb-[12px] px-[10px]">
      <div class="text-xl text-[var(--text-title)] font-bold mb-[10px] max-h-[56px] line-clamp-2">
        {{ props.news.title }}
      </div>
      <div class="text-sm text-[#A8A8A8] max-h-[40px] line-clamp-2 mb-[12px]">
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
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[300px] h-[217px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeToggle"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
    <!-- 클릭했을 때 나오는 창 -->
    <transition name="fade">
      <div
        v-if="wantSummary"
        class="w-[300px] h-[385px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px] overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/80 blur-xs rounded-[20px] z-30"></div>

        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full">
          <h1 class="text-[20px] font-semibold text-white mb-[32px]">세줄 요약</h1>
          <ul class="text-white leading-8">
            <li>해일의 높이는 2,000m</li>
            <li>박은서, 기네스 기록 돒파</li>
            <li>박은서, 세계대회 우승</li>
          </ul>
          <button
            class="w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] mt-auto ml-auto flex items-center cursor-pointer hover:bg-[#D2D2D2]"
            @click="toDetailHandler"
          >
            원문보기
          </button>
        </div>
      </div>
    </transition>
    <ScrapImg class="absolute right-[8px] top-[10px] z-25" />
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
