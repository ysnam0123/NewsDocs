<script setup>
import { fetchOpenAi } from '@/api/fetchOpenAi'
import ScrapNotOnImg from './children/ScrapNotOnImg.vue'
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews2'
import Typed from 'typed.js'

import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'

// 호버 상태
const summaryHover = ref(false)
const hoverHandler = () => {
  summaryHover.value = true
}
const hoverOut = () => {
  summaryHover.value = false
}

// 요약창 토글 상태
const wantSummary = ref(false)

const summarizeToggle = async () => {
  wantSummary.value = !wantSummary.value
  console.log('🟢 요약 토글 상태:', wantSummary.value)

  if (wantSummary.value) {
    console.log('요약 시작됨!')
    // 저장된 요약이 없으면 handleClick() 함수 실행
    if (!summaryStore.getSummary(props.news.article_id)) {
      await handleClick()
    } else {
      // 저장된 요약이 있으면 바로 보여주기
      await runTyped(summaryStore.getSummary(props.news.article_id))
    }
  }
}

// props
const props = defineProps({
  news: Object,
  newsSaveHandler: Function,
  newsDetail: Function,
})

// 상태
const isLoading = ref(true)
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const typedTarget = ref(null)
let typedInstance = null

const router = useRouter()
const summaryStore = useSummaryStore()
const newsStore = useNewsStore()

const handleClick = async () => {
  const articleId = props.news.article_id
  console.log('🟢 뉴스 클릭됨:', props.news.title)

  // 뉴스 선택
  if (newsStore.selectedNews?.article_id !== articleId) {
    console.log('💾 뉴스 저장 시도:', props.news.title)
    await props.newsSaveHandler(props.news)
  }

  if (!props.news.description) {
    console.log('❌ 요약할 description 없음')
    summaryMessage.value = '❌ 요약할 description 없음'
    return
  }

  // 저장된 요약 확인
  const existingSummary = summaryStore.getSummary(articleId)

  if (!existingSummary) {
    console.log('📤 저장된 요약 없음 → 새로 요약 시작')
    await summarizeHandler(articleId, props.news.description)
  } else {
    console.log('📥 저장된 요약 있음 → Typed 실행')
    await runTyped(existingSummary)
  }
}

const summarizeHandler = async (articleId, description) => {
  try {
    summaryStore.isLoading = true
    isSummaryLoading.value = true

    // Supabase에서 요약 불러오기
    const { data: savedSummary } = await supabase
      .from('summaries')
      .select('summaries_contents')
      .eq('news_id', articleId)
      .maybeSingle()

    if (savedSummary?.summaries_contents) {
      summaryStore.setSummary(articleId, savedSummary.summaries_contents)
      console.log('📦 Supabase에서 저장된 요약 로딩 완료')
      await runTyped(savedSummary.summaries_contents)
      return
    }

    // OpenAI로 요약 생성
    console.log('🤖 OpenAI 요약 요청 시작')
    const result = await fetchOpenAi(description)
    console.log('✅ OpenAI 요약 결과 수신:', result)

    // 상태에 저장
    summaryStore.setSummary(articleId, result)
    await runTyped(result)

    // Supabase에 저장
    const { error } = await supabase
      .from('summaries')
      .insert([{ news_id: articleId, summaries_contents: result }])
      .select()

    if (error) {
      console.error('❌ Supabase 저장 실패', error)
    } else {
      console.log('💾 Supabase에 요약 저장 완료')
    }
  } catch (err) {
    console.error('❌ 요약 중 오류 발생', err)
  } finally {
    summaryStore.isLoading = false
    isSummaryLoading.value = false
    console.log('🔚 요약 로딩 종료')
  }
}

// Typed.js 애니메이션 실행
const runTyped = async (text) => {
  await nextTick()

  if (typedTarget.value) {
    if (typedInstance) {
      typedInstance.destroy()
      console.log('🔄 이전 Typed 인스턴스 제거')
    }
    typedTarget.value.innerText = ''
    console.log('▶️ Typed 애니메이션 시작')
    typedInstance = new Typed(typedTarget.value, {
      strings: [text],
      typeSpeed: 20,
      showCursor: false,
    })
  } else {
    console.warn('⚠️ typedTarget is null')
  }
}

// 상세 페이지로 이동
const toDetailHandler = () => {
  console.log('🔗 원문 상세보기 클릭:', props.news.article_id)
  router.push(`/news/detail/${props.news.article_id}`)
}

// 마운트 후 상태 초기화
onMounted(() => {
  if (props.news) {
    isLoading.value = false
    isSummaryLoading.value = false
    console.log('🟢 컴포넌트 Mounted → 로딩 상태 false')
  }
})
</script>
<template>
  <!-- 전체 -->
  <div v-if="props.news" class="flex w-[414px] h-[132px] relative select-none">
    <!-- 호버했을때 나오는 창 -->
    <div
      v-if="summaryHover && !wantSummary"
      class="absolute w-[140px] h-[132px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeToggle"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
    <div
      v-if="wantSummary"
      class="w-[414px] h-[140px] rounded-[20px] bg-black/70 hover:bg-black/80 absolute top-0 overflow-hidden cursor-pointer z-20 backdrop-blur-lg"
      @click="summarizeToggle"
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

      <template v-else-if="summaryStore.getSummary(props.news.article_id)">
        <!-- 요약된 내용 -->
        <div class="flex flex-col relative z-30 h-full">
          <div class="flex flex-col text-[15px]">
            <div
              class="overflow-scroll px-4 py-2 max-w-[320px] max-h-[130px] text-white whitespace-pre-line leading-8"
            >
              <span ref="typedTarget" class="text-white"></span>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="summaryMessage">
        <!-- 요약할 내용 없음 등 메시지 표시 -->
        <div class="text-white text-center text-[16px] px-4">
          {{ summaryMessage }}
        </div>
      </template>
      <button
        class="absolute bottom-5 right-4 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
        @click.stop="toDetailHandler"
      >
        원문보기
      </button>
    </div>

    <!-- 뉴스 내용 -->
    <div class="flex gap-[15px]">
      <!-- 이미지 -->
      <div class="cursor-pointer w-[140px]" @mouseover="hoverHandler">
        <img :src="news.image_url" class="rounded-[20px] w-full h-full object-cover" />
      </div>
      <div class="flex flex-col max-h-[260px]">
        <!-- 기사 -->
        <div class="w-[211px] relative flex flex-col mb-[10px]">
          <div class="text-[var(--text-title)] font-bold text-[18px] max-h-[58px] line-clamp-2">
            {{ props.news.title }}
          </div>
          <div class="text-[#A8A8A8] text-[14px] pt-0.5 max-h-[48px] line-clamp-2">
            {{ props.news.description || '' }}
          </div>
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

      <ScrapNotOnImg class="absolute right-[10px] top-[10px] z-20" />
    </div>
  </div>
</template>
