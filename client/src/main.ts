import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import SocketHandler from './sockets'

SocketHandler.connect(window.location.protocol + "//137.184.235.2/")

const app = createApp(App)

app.use(createPinia())
app.use(router)
router.push('/join')

app.mount('#app')
