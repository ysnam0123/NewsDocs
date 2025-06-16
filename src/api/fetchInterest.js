import supabase from '@/utils/supabase'

export const fetchInterest = async (userId) => {
  // console.log(userId)
  const { data, error } = await supabase.from('user_interests').select().eq('user_id', userId)

  if (error) {
    console.error('사용자 관심 카테고리 불러오기 실패')
    return null
  }
  return data
}
