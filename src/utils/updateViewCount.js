import supabase from './supabase'

export const updateViewCount = async (newsId) => {
  const { error } = await supabase.rpc('increment_viewcount', {
    news_id_input: newsId,
  })
  if (error) {
    console.error('조회수 증가 에러', error)
  }
}
