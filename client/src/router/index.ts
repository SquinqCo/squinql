import GameVue from '@/views/Game.vue'
import PregameVue from '@/views/Pregame.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameVue
    },
  ]
})

export default router
