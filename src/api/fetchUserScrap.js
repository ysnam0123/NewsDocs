import supabase from '@/utils/supabase'

export const fetchUserScrap = async (userId) => {
  const { data, error } = await supabase.from('user_scraps').select().eq('user_id', userId)
  if (error) {
    console.error('사용자가 스크랩한 뉴스ID 불러오기 실패')
    return null
  }
  return data
}
