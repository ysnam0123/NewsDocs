import supabase from '@/utils/supabase'

export const fetchPost = async () => {
  const { data, error } = await supabase
    .from('post')
    .select()
    .order('created_at', { ascending: false })
  if (error) {
    console.error('게시글 불러오기 실패')
    return []
  }
  return data
}
