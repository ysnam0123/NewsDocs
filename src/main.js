import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import '@/assets/root.css'

import App from './App.vue'
import router from './router'

import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import 'quill/dist/quill.snow.css'

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 1000,
  position: 'top-center',
})

app.use(createPinia())
app.use(router)

app.mount('#app')
