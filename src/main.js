import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import '@/assets/root.css'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
// import '@/assets/toast-custom.css'
import 'vue-toastification/dist/index.css'

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

app.mount('#app')
