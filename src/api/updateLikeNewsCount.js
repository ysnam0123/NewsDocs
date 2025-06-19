import supabase from '@/utils/supabase'

export const fetchNewsLike = async (newsId) => {
  // console.log(userId)
  const { data, error } = await supabase.from('like').select().eq('news_id', newsId)
  if (error) {
    console.error('좋아요 정보 불러오기 실패')
    return []
  }
  return data
}
export const fetchNewsLikes = async () => {
  const { data: likeData, error: likeError } = await supabase
    .from('like')
    .select('news_id')
    .order('news.length', { ascending: false })
  if (likeError) {
    console.error('좋아요 전체 불러오기 실패')
    return []
  }
  return likeData
}
export const newsLikeUpload = async (newsId, userId) => {
  if (userId) {
    const { error: insertError } = await supabase
      .from('like')
      .insert([
        {
          user_id: userId,
          news_id: newsId,
        },
      ])
      .select() //

    if (insertError) {
      alert('좋아요 업로드 실패!')
      console.error('좋아요 업로드 실패!:', insertError)
      throw new Error('좋아요 저장 실패')
    } else {
      console.log('좋아요업로드완료:', newsId, userId)
    }
  }
}

export const newsUnlikeUpload = async (newsId, userId) => {
  if (!userId || !newsId) {
    console.warn('userId나 postId가 없습니다')
    return
  }
  const { error: deleteError } = await supabase
    .from('like')
    .delete()
    .eq('news_id', newsId)
    .eq('user_id', userId)
  if (deleteError) {
    alert('좋아요 취소 실패')
    console.error('좋아요 삭제 실패', deleteError)
    throw new Error('좋아요 삭제 실패')
  } else {
    console.log('좋아요삭제완료:', newsId, userId)
  }
}

export const isNewsLikedByUser = async (newsId, userId) => {
  const { data, error } = await supabase
    .from('like')
    .select('like_id')
    .eq('news_id', newsId)
    .eq('user_id', userId)
    .maybeSingle() //한개 또는 null
  if (error) {
    console.error('좋아요 상태 확인 실패:', error)
    return false
  }
  return !!data
}
