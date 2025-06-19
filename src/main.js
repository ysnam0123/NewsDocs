// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import '@/assets/main.css'
import '@/assets/root.css'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast, {
  position: 'top-center',
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: true,
  maxToasts: 1,
})

// 7. 앱 마운트
app.mount('#app')
