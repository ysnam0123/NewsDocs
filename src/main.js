import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import '@/assets/root.css'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons'
library.add(faHeart, faMessage, faMagnifyingGlass, faCaretDown)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
