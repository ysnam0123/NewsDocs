import supabase from '@/utils/supabase'

export const fetchUser = async (userId) => {
  // console.log(userId)
  const { data, error } = await supabase.from('profiles').select().eq('user_id', userId).single()
  if (error) {
    console.error('사용자 프로필 정보 불러오기 실패')
    return null
  }
  return data
}
