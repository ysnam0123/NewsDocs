import supabase from '@/utils/supabase'

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return
  }
  return data.user
}
