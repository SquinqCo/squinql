import GameVue from '@/views/Game.vue'
import HostVue from '@/views/Host.vue'
import JoinVue from '@/views/Join.vue'
import LobbyVue from '@/views/Lobby.vue'
import NameVue from '@/views/Name.vue'
import PostgameVue from '@/views/Postgame.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'name',
      component: NameVue
    },
    {
      path: '/game',
      name: 'game',
      component: GameVue
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyVue
    },
    {
      path: '/host',
      name: 'host',
      component: HostVue
    },
    {
      path: '/join',
      name: 'join',
      component: JoinVue
    },
    {
      path: '/summary',
      name: 'summary',
      component: PostgameVue
    }
  ]
})

export default router
