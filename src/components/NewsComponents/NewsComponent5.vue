<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import { fetchOpenAi } from '@/api/fetchOpenAi'
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
const isSummaryLoading = ref(true)

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
    isSummaryLoading.value = false
  }
})
</script>

<template>
  <div v-if="props.news" class="relative flex gap-[22px] w-[600px] h-[184px] rounded-[16px]">
    <!-- 호버했을때 나오는 창 -->
    <div
      v-if="summaryHover && !wantSummary"
      class="absolute w-[200px] h-[184px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-12 cursor-pointer"
      @click="summarizeToggle"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
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
      <template v-else-if="summaryStore.summaryNews">
        <!-- 클릭했을 때 나오는 창 -->
        <div v-if="wantSummary" class="w-full h-full rounded-[20px] absolute top-0 overflow-hidden">
          <!-- 요약된 내용 -->
          <div class="flex flex-col relative z-30 h-full">
            <div class="flex flex-col">
              <div class="px-4 py-2 text-white whitespace-pre-line leading-8">
                <span ref="typedTarget" class="text-white"></span>
              </div>
            </div>
            <button
              class="absolute bottom-5 right-4 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
              @click.stop="toDetailHandler"
            >
              원문보기
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="w-[200px] h-[184px]" @click="handleClick">
      <img
        :src="news.image_url"
        class="w-full h-full object-cover rounded-[16px] cursor-pointer"
        @mouseover="hoverHandler"
        @mouseleave="hoverOut"
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

    <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-20" />
  </div>
</template>
