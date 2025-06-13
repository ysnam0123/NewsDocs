import supabase from '@/utils/supabase'

export const commentUpload = async ({ postId, userId, content }) => {
  console.log('유저아이디:', userId)
  if (userId) {
    const { data: insertData, error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          user_id: userId,
          post_id: postId,
          contents: content,
        },
      ])
      .select()
    //

    if (insertError) {
      alert('댓글 업로드 실패!')
      console.error('댓글 업로드 실패!:', insertError)
      throw new Error('댓글 저장 실패')
    } else {
      console.log('댓글 업로드 완료', insertData)
      return insertData?.[0] //
    }
  }
}

export const fetchComment = async (postId) => {
  // console.log(userId)
  const { data, error } = await supabase
    .from('comments')
    .select('comments_id,user_id, post_id, contents,created_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: false }) //최신순으로 정렬
  if (error) {
    console.error('댓글 정보 불러오기 실패')
    return []
  }
  // console.log('댓글 불러오기 완료', data)
  return data
}

export const updateComment = async (commentId, newContent) => {
  const { error } = await supabase
    .from('comments')
    .update({ contents: newContent })
    .eq('comments_id', commentId)

  if (error) throw error
}

export const deleteComment = async (commentId) => {
  // console.log(userId)
  const { error: deleteError } = await supabase
    .from('comments')
    .delete()
    .eq('comments_id', commentId)
  if (deleteError) {
    console.error('댓글 삭제 실패', deleteError)
  } else {
    console.log('댓글 삭제 완료')
  }
}
