import supabase from '@/utils/supabase'

export const fetchCategory = async (categoryId) => {
  // console.log('카테고리id', categoryId)
  const { data, error } = await supabase
    .from('category')
    .select()
    .eq('category_id', categoryId)
    .single()
  if (error) {
    console.error('게시글 카테고리 정보 불러오기 실패')
    return null
  }
  return data
}
