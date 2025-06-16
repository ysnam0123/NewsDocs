import supabase from '@/utils/supabase'
import { useSummaryStore } from '@/stores/summaryNews'
import Typed from 'typed.js'
import { nextTick, ref } from 'vue'
import { fetchOpenAi } from '@/api/fetchOpenAi'

export const useSummary = () => {
  const summaryStore = useSummaryStore()
  const typedTarget = ref(null)
  let typedInstance = null
  const wantSummary = ref(false)
  const isOpen = ref(false)
  const isLoading = ref(true)

  // 타이핑 효과
  const runTyped = async (text) => {
    await nextTick()
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

  // 클릭하면 뉴스 정보로 요약 불러오기, 없으면 저장
  const getOrCreateSummary = async (articleId, description) => {
    try {
      isOpen.value = true
      isLoading.value = true
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
        summaryStore.summaryNews(articleId, savedSummary.summaries_contents)
        runTyped(summaryStore.summaries_contents)
        console.log('기존 요약')
        return savedSummary.summaries_contents
      }
      const result = await fetchOpenAi(description)
      summaryStore.setSummary(articleId, result)
      await new Promise((resolve) => setTimeout(resolve, 50))
      await runTyped(result)

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
      isLoading.value = false
    }
  }
  const summarizeToggle = async (articleId, description) => {
    wantSummary.value = !wantSummary.value

    const existing = summaryStore.getSummary(articleId)
    if (!existing) {
      const result = await getOrCreateSummary(articleId, description)
      if (result) await runTyped(result)
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
    isLoading,
  }
}
