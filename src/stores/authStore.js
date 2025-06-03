import { defineStore } from 'pinia'

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
  },
})
