import supabase from '@/utils/supabase'

export const fetchPostDetail = async (postId) => {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('post_id', postId)
    .maybeSingle()
  if (error) {
    console.error('게시글 불러오기 실패', error)
    return
  }
  // console.log('postId:', postId)
  // console.log('가져온 데이터:', data)
  return data
}
