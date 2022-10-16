import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import SocketHandler from './sockets'


const app = createApp(App)
export const pinia = createPinia()

SocketHandler.connect(window.location.protocol + "//137.184.235.2/")

app.use(pinia)
app.use(router)

app.mount('#app')
