import supabase from '@/utils/supabase'

export const fetchScrapNews = async (newsId) => {
  const { data, error } = await supabase.from('news').select().eq('news_id', newsId)
  if (error) {
    console.error('사용자가 스크랩한 뉴스 데이터 불러오기 실패')
    return null
  }
  return data
}
