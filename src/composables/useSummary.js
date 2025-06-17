import supabase from '@/utils/supabase'
import { useSummaryStore } from '@/stores/summaryNews2'
import { fetchOpenAi } from '@/api/fetchOpenAi'

export const useSummary = () => {
  const summaryStore = useSummaryStore()

  // 클릭하면 뉴스 정보로 요약 불러오기, 없으면 생성
  const getOrCreateSummary = async (articleId, description) => {
    try {
      if (!description) return null

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
        console.log('기존 요약')
        return savedSummary.summaries_contents
      }
      // open ai 요약 생성
      const result = await fetchOpenAi(description)
      summaryStore.setSummary(articleId, result)
      console.log('요약 결과:', result)
      console.log('저장된 요약:', summaryStore.getSummary(articleId))
      const { data: existingNews } = await supabase
        .from('news')
        .select('news_id')
        .eq('news_id', articleId)
        .maybeSingle()

      if (!existingNews) {
        console.warn('news테이블에 해당 뉴스가 존재하지 않음 요약 저장 실패')
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
    }
  }
  const summarizeToggle = async (articleId, description) => {
    const existing = summaryStore.getSummary(articleId)
    if (!existing) {
      await getOrCreateSummary(articleId, description)
    }
  }

  return {
    getOrCreateSummary,
    summarizeToggle,
  }
}
