import supabase from '@/utils/supabase'
// import { getCurrentUser } from './getCurrentUser'

export const commentUpload = async ({ postId, userId, content }) => {
  //   const user = await getCurrentUser()
  if (userId) {
    const { error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          user_id: userId,
          post_id: postId,
          contents: content,
        },
      ])
      .select() //

    if (insertError) {
      alert('댓글 업로드 실패!')
      console.error('댓글 업로드 실패!:', insertError)
      throw new Error('댓글 저장 실패')
    }
  }
}

export const fetchComment = async (postId) => {
  // console.log(userId)
  const { data, error } = await supabase.from('comments').select().eq('post_id', postId)
  if (error) {
    console.error('댓글 정보 불러오기 실패')
    return []
  }
  return data
}
