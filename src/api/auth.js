import { userAuthStore } from '@/stores/authStore'
import { supabase } from '@supabase/supabase-js'
export const signInWithOAuth = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'https://axixniqetwtbejqvtcdc.supabase.co/auth/v1/callback',
      },
    })
    if (error) throw error
    console.log('OAuth 로그인 성공:', data)
    // 콜백 처리 후 사용자 정보 동기화는 콜백 페이지에서 수행
    return data
  } catch (error) {
    console.error('OAuth 로그인 실패:', error)
    throw error
  }
}

// OAuth 콜백 처리 (예: /auth/callback 컴포넌트에서 호출)
export const handleOAuthCallback = async () => {
  const authStore = userAuthStore()
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) throw error
    if (session) {
      await authStore.fetchUser() // 콜백 후 사용자 정보 동기화
      return true
    }
    return false
  } catch (error) {
    console.error('OAuth 콜백 처리 오류:', error)
    return false
  }
}
