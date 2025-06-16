<script setup>
import { onMounted, ref, nextTick } from 'vue'
import supabase from '@/utils/supabase'
import { fetchOpenAi } from '@/api/fetchOpenAi'
import { useNewsStore } from '@/stores/newsStore'
import { useSummaryStore } from '@/stores/summaryNews2'
import Typed from 'typed.js'
import ScrapNotOnImg from './children/ScrapNotOnImg.vue'

import dogNotFound from '@/assets/img/dog-notfound-v2.png'
import { useNewsActions } from '@/composables/useNewsActions'
const { toDetailHandler, saveNews } = useNewsActions()
const summaryHover = ref(false)
const hoverHandler = () => {
  summaryHover.value = true
}
const hoverOut = () => {
  summaryHover.value = false
}

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

const props = defineProps({
  news: Object,
})

const isLoading = ref(true)
const isSummaryLoading = ref(true)
const summaryMessage = ref('')
const typedTarget = ref(null)
let typedInstance = null

const summaryStore = useSummaryStore()
const newsStore = useNewsStore()

const handleClick = async () => {
  const articleId = props.news.article_id
  console.log('🟢 뉴스 클릭됨:', props.news.title)

  // 뉴스 선택
  if (newsStore.selectedNews?.article_id !== articleId) {
    console.log('💾 뉴스 저장 시도:', props.news.title)
    await saveNews(props.news)
  }

  if (!props.news.description) {
    console.log('❌ 요약할 description 없음')
    summaryMessage.value = '이 뉴스는 원문에서 확인해주세요!'
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
  <div
    v-if="props.news"
    class="w-[600px] h-[118px] relative"
    @mouseover="hoverHandler"
    @mouseleave="hoverOut"
    @click="handleClick"
  >
    <!-- 호버했을때 나오는 창 -->
    <div
      v-if="summaryHover && !wantSummary"
      class="cursor-pointer absolute inset-0 bg-transparent hover:bg-black/50 flex flex-col items-center justify-center gap-4 rounded-[20px] z-10"
      @click="summarizeToggle"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>

    <div
      v-if="wantSummary"
      class="cursor-pointer inset-0 bg-black/70 hover:bg-black/80 flex flex-col gap-4 rounded-[20px] z-20 backdrop-blur-lg absolute top-0 overflow-scroll"
      @click.stop="summarizeToggle"
    >
      <!-- 클릭했을 때 나오는 창 -->
      <template v-if="isSummaryLoading">
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
      <div
        v-show="summaryStore.getSummary(props.news.article_id)"
        class="flex relative z-30 w-[520px] h-full overflow-scroll"
      >
        <div class="flex flex-col h-full">
          <div class="flex flex-col">
            <div class="max-w-[460px] px-4 py-2 text-white whitespace-pre-line leading-8">
              <span ref="typedTarget" class="text-white"></span>
            </div>
          </div>
        </div>
      </div>

      <button
        class="absolute bottom-5 right-4 w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
        @click.stop="toDetailHandler(news)"
      >
        원문보기
      </button>
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
    <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-15" />

    <!-- 클릭했을 때 나오는 창 -->
  </div>
</template>
