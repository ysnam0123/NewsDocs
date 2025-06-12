import supabase from '@/utils/supabase'

export function useGoogleAuth() {
  const signInWithGoogle = async (toast, redirectTo = '/') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })
    if (error && toast) {
      toast('구글 로그인에 실패했습니다.', { icon: false })
    }
  }

  return { signInWithGoogle }
}
