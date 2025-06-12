import supabase from '@/utils/supabase'

export const fetchUserByNickname = async (nickname) => {
  console.log(nickname)
  const { data, error } = await supabase.from('profiles').select().eq('nickname', nickname).single()
  if (error) {
    console.error('사용자 프로필 정보 불러오기 실패')
    return null
  }
  return data
}
