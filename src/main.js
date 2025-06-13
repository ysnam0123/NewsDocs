import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
// import '@/assets/toast-custom.css'
import 'vue-toastification/dist/index.css'
import supabase from './utils/supabase'
import { userAuthStore } from './stores/authStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: 'top-center',
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: true,
  maxToasts: 1,
})

//토큰 상태 변화 감지 -> 피니아 반영
supabase.auth.onAuthStateChange(async (event, session) => {
  const authStore = userAuthStore()
  if (session?.user) {
    await authStore.fetchUser()
  } else {
    authStore.logout()
  }
})

app.mount('#app')
