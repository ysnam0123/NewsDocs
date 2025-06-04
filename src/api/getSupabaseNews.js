import supabase from '@/utils/supabase'

export const getNewsList = async () => {
  const { data, error } = await supabase.from('news_data').select('*').limit(10)

  if (error) {
    console.error('뉴스 가져오기 실패:', error)
    return []
  }

  return data
}
