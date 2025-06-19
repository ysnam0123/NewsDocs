import supabase from '../utils/supabase'

// 뉴스 like 처리
export const toggleLike = async (userId, newsId) => {
  if (!userId || !newsId) {
    console.warn('userId나 postId가 없습니다')
    return
  }
  const { data: alreadyLike } = await supabase
    .from('like')
    .select('like_id')
    .eq('user_id', userId)
    .eq('news_id', newsId)
    .maybeSingle()

  if (!alreadyLike) {
    await supabase.from('like').insert([{ user_id: userId, news_id: newsId }])
  } else {
    await supabase.from('like').delete().eq('user_id', userId).eq('news_id', newsId)
  }
}

// 뉴스 좋아요 상태 확인
export const checkUserLiked = async (userId, newsId) => {
  const { data, error } = await supabase
    .from('like')
    .select('like_id')
    .eq('user_id', userId)
    .eq('news_id', newsId)
    .maybeSingle()
  if (error) {
    console.error('좋아요 상태 확인 실패:', error)
    return false
  }

  return !!data
}
