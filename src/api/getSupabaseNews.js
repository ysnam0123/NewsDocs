import supabase from '@/utils/supabase'

// 뉴스 리스트 가져오기
export const getNewsList = async () => {
  const { data, error } = await supabase.from('news_data').select('*')

  if (error) {
    console.error('뉴스 가져오기 실패:', error)
    return []
  }
  return data.filter((news) => news.description !== null)
}
