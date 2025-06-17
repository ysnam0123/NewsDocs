import supabase from '@/utils/supabase'
import { useRouter } from 'vue-router'

// news component에서 사용할 함수들을 지정
export const useNewsActions = () => {
  const router = useRouter()

  const searchNews = async (newsId) => {
    console.log('0번 컴포넌트에서 뉴스를 찾는다 ', newsId)
    console.log('newsId 타입:', typeof newsId, newsId)
    const { data: newsData, error } = await supabase
      .from('news')
      .select('*')
      .eq('news_id', newsId)
      .maybeSingle()

    if (error) {
      console.error('뉴스 찾기 실패', error)
      return null
    }
    if (!newsData.description) {
      console.log('no description')
      return null
    }
    return newsData
  }

  // view count 증가
  const updateViewCount = async (newsId) => {
    const { error } = await supabase.rpc('increment_viewcount', {
      news_id_input: newsId,
    })
    if (error) {
      console.error('조회수 증가 에러', error)
    }
  }
  // 뉴스 클릭 시 저장 -> 조회수 증가 -> 디테일 페이지 이동
  const toDetailHandler = async (news) => {
    await updateViewCount(news.article_id)
    router.push(`/news/detail/${news.article_id}`)
    console.log('뉴스 아이디', news.article_id)
  }

  return {
    searchNews,
    updateViewCount,
    toDetailHandler,
  }
}
