import supabase from '@/utils/supabase'
import { useSummaryStore } from '@/stores/summaryNews2'
import Typed from 'typed.js'
import { nextTick, ref } from 'vue'
import { fetchOpenAi } from '@/api/fetchOpenAi'

export const useSummary = () => {
  const summaryStore = useSummaryStore()
  const typedTarget = ref(null)
  let typedInstance = null
  const wantSummary = ref(false)
  const isOpen = ref(false)
  const isSummaryLoading = ref(true)

  // 타이핑 효과
  const runTyped = async (text) => {
    await nextTick()
    console.log('▶️ runTyped 호출됨. text:', text)
    if (typedTarget.value) {
      if (typedInstance) {
        typedInstance.destroy()
      }
      typedTarget.value.innerText = ''
      typedInstance = new Typed(typedTarget.value, {
        strings: [text],
        typeSpeed: 20,
        showCursor: false,
      })
    } else {
      console.warn('!!typedTarget is null!!')
    }
  }

  // 클릭하면 뉴스 정보로 요약 불러오기, 없으면 생성
  const getOrCreateSummary = async (articleId, description) => {
    try {
      isOpen.value = true
      isSummaryLoading.value = true
      if (!description) return

      const { data: savedSummary, error } = await supabase
        .from('summaries')
        .select('summaries_contents')
        .eq('news_id', articleId)
        .maybeSingle()

      if (error) {
        console.error('요약 조회 실패', error)
        return null
      }
      if (savedSummary?.summaries_contents) {
        summaryStore.setSummary(articleId, savedSummary.summaries_contents)
        await runTyped(savedSummary.summaries_contents)
        console.log('기존 요약')
        return savedSummary.summaries_contents
      }
      // open ai 요약 생성
      const result = await fetchOpenAi(description)
      summaryStore.setSummary(articleId, result)
      console.log('🧠 요약 결과:', result)
      console.log('📦 저장된 요약:', summaryStore.getSummary(articleId))
      await new Promise((resolve) => setTimeout(resolve, 50))
      await runTyped(result)
      const { data: existingNews } = await supabase
        .from('news')
        .select('news_id')
        .eq('news_id', articleId)
        .maybeSingle()

      if (!existingNews) {
        console.warn('❗ news 테이블에 해당 뉴스가 존재하지 않음, 요약 저장 실패')
        isSummaryLoading.value = false
        return result
      }
      // summary insert
      const { error: insertError } = await supabase
        .from('summaries')
        .insert([{ news_id: articleId, summaries_contents: result }])

      if (insertError) {
        console.error('요약 저장 실패', insertError)
      }

      return result
    } catch (err) {
      console.error('요약 에러 발생', err)
    } finally {
      isSummaryLoading.value = false
    }
  }
  const summarizeToggle = async (articleId, description) => {
    wantSummary.value = !wantSummary.value

    if (!wantSummary.value) {
      typedTarget.value.innerText = ''
      return
    }
    const existing = summaryStore.getSummary(articleId)
    if (!existing) {
      await getOrCreateSummary(articleId, description)
    } else {
      await runTyped(existing)
    }
  }

  return {
    getOrCreateSummary,
    summarizeToggle,
    typedTarget,
    wantSummary,
    isOpen,
    isSummaryLoading,
  }
}
