import supabase from '@/utils/supabase'
// import { getCurrentUser } from './getCurrentUser'

export const commentUpload = async (postId, userId, content) => {
  //   const user = await getCurrentUser()
  console.log('유저아이디:', userId)
  if (userId) {
    // console.log('유저아이디는 받았습니다')
    const { data: insertData, error: insertError } = await supabase
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
    } else {
      console.log('댓글 업로드 완료', insertData)
    }
  }
}

export const fetchComment = async (postId) => {
  // console.log(userId)
  const { data, error } = await supabase
    .from('comments')
    .select()
    .eq('post_id', postId)
    .order('created_at', { ascending: false }) //최신순으로 정렬
  if (error) {
    console.error('댓글 정보 불러오기 실패')
    return []
  }
  console.log('댓글 불러오기 완료', data)
  return data
}
