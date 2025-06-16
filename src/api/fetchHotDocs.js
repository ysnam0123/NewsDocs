import supabase from '@/utils/supabase'

export const fetchHotDocs = async () => {
  const { data, error } = await supabase
    .from('news')
    .select(
      `news_id, view_count, description, title, image_url,
          like!like_news_id_fkey (like_id)`,
    )
    .order('view_count', { ascending: false })
    .limit(5)

  if (error) {
    console.error('hotdocs 조회 실패', error)
  }
  if (!data || !Array.isArray(data)) {
    console.warn('뉴스 데이터가 없거나 배열이 아님')
    return
  }

  for (const news of data) {
    const { count, error: likeError } = await supabase
      .from('like')
      .select('*', { count: 'exact', head: true })
      .eq('news_id', news.news_id)

    if (likeError) {
      console.error('좋아요 카운트 실패', likeError)
    } else {
      news.like.length = count
    }
  }
  return data
}
