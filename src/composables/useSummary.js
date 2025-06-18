import supabase from '@/utils/supabase'
import { fetchOpenAi } from '@/api/fetchOpenAi'

export const useSummary = () => {
  const defaultMessage = `앗, 아직 뉴스 내용이 없는 것 같아! 😅 
원문으로 안내해줄게 📰✨`

  // 클릭하면 뉴스 정보로 요약 불러오기, 없으면 생성
  const getOrCreateSummary = async (articleId, description) => {
    try {
      if (!description) {
        return defaultMessage
      }

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
        console.log('기존 요약')
        return savedSummary.summaries_contents
      }

      // open ai 요약 생성
      const result = await fetchOpenAi(description)
      console.log('요약 결과:', result)

      // 새로 만든 summary insert
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
    await getOrCreateSummary(articleId, description)
  }

  return {
    getOrCreateSummary,
    summarizeToggle,
  }
}
