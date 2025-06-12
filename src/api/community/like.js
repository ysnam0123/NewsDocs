import supabase from '@/utils/supabase'
// import { getCurrentUser } from './getCurrentUser'

export const fetchLike = async (postId) => {
  // console.log(userId)
  const { data, error } = await supabase.from('like').select().eq('post_id', postId)
  if (error) {
    console.error('좋아요 정보 불러오기 실패')
    return []
  }
  return data
}

export const likeUpload = async (postId, userId) => {
  //   const user = await getCurrentUser()

  if (userId) {
    const { error: insertError } = await supabase
      .from('like')
      .insert([
        {
          user_id: userId,
          post_id: postId,
          comments_id: null,
          news_id: null,
        },
      ])
      .select() //

    if (insertError) {
      alert('좋아요 업로드 실패!')
      console.error('좋아요 업로드 실패!:', insertError)
      throw new Error('좋아요 저장 실패')
    } else {
      console.log('좋아요업로드완료:', postId, userId)
    }
  }
}

export const unlikeUpload = async (postId, userId) => {
  if (!userId || !postId) {
    console.warn('userId나 postId가 없습니다')
    return
  }
  const { error: deleteError } = await supabase
    .from('like')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId)
  if (deleteError) {
    alert('좋아요 취소 실패')
    console.error('좋아요 삭제 실패', deleteError)
    throw new Error('좋아요 삭제 실패')
  } else {
    console.log('좋아요삭제완료:', postId, userId)
  }
}

export const isLikedByUser = async (postId, userId) => {
  const { data, error } = await supabase
    .from('like')
    .select('like_id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle() //한개 또는 null
  if (error) {
    console.error('좋아요 상태 확인 실패:', error)
    return false
  }
  return !!data
}
