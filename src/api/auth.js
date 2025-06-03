import { supabase } from '@supabase/supabase-js'

export const signInWithOAuth = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'https://axixniqetwtbejqvtcdc.supabase.co/auth/v1/callback',
    },
  })
  if (error) {
    console.log('불러오기 실패', error)
  } else {
    console.log('userData', data)
  }
}
