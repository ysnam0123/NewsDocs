import { defineStore } from 'pinia'
import supabase from '@/utils/supabase'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedin: false,
  }),
  actions: {
    setUser(userData) {
      this.user = userData
      this.isLoggedin = true
    },
    logout() {
      this.user = null
      this.isLoggedin = false
    },

    async fetchUser() {
      try {
        const {
          data: { user: authUser },
          error,
        } = await supabase.auth.getUser()
        if (error) throw error
        if (authUser) {
          // profiles 테이블에서 추가 정보 가져오기
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_id, email, name, nickname, profile_img')
            .eq('user_id', authUser.id)
            .single()

          if (profileError) throw profileError
          this.setUser({ ...authUser, ...profile }) // 인증 정보와 프로필 정보 병합
        } else {
          this.setUser(null)
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error)
        this.setUser(null)
      }
    },
    async signInWithEmail(email, password) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        await this.fetchUser() // 로그인 후 사용자 정보 동기화
      } catch (error) {
        console.error('이메일 로그인 오류:', error)
        throw error
      }
    },
  },
})
