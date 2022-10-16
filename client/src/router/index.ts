import GameVue from '@/views/Game.vue'
import LobbyVue from '@/views/Lobby.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameVue
    },{
      path: '/join',
      name: 'lobby',
      component: LobbyVue
    }
  ]
})

export default router
