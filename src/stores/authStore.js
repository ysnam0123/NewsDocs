// src/stores/authStore.js
import { defineStore } from 'pinia'
import supabase from '@/utils/supabase'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async initialize() {
      const { data: session } = await supabase.auth.getSession()
      this.isLoggedIn = !!session?.user

      supabase.auth.onAuthStateChange((event, session) => {
        this.isLoggedIn = !!session?.user
      })
    },
    // 이메일/비밀번호 로그인
    async signInWithEmail(email, password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      // 로그인 성공 시 Supabase 세션이 자동으로 갱신됨
    },

    async fetchUser() {
      if (!this.isLoggedin) return
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
    // 로그아웃
    async logout() {
      await supabase.auth.signOut()
      // 로그아웃 시 Supabase 세션이 자동으로 삭제됨
    },

    // 현재 로그인된 사용자 정보 가져오기 (항상 Supabase에서 직접 조회)
    async getCurrentUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
  },
})
