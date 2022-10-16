<script setup lang="ts">
import SocketHandler from '@/sockets';
import { useLogicStore } from '@/stores/logic';
import PlayerList from '../components/PlayerList.vue';

const logicState = useLogicStore()
SocketHandler.createGame();
</script>

<template>
  <aside>

  </aside>
  <main class="flex flex-col h-screen bg-pastel-magenta">
    <div class="h-full text-center">
      <h1 class="text-5xl font-bold mt-24">Invite Your Friends!</h1>
      <div class="flex flex-row">
        <div class="bg-pastel-yellow px-4 py-2 my-16 w-2/3 ml-auto rounded-xl">
          <h2 class="text-6xl font-bold">{{logicState.gameKey}}</h2>
        </div>
        <button class="bg-pastel-turquoise px-4 my-16 w-96 ml-4 mr-auto rounded-xl text-6xl font-bold"
          @click="SocketHandler.startGame()">Start!</button>
      </div>
      <h2 class="text-4xl font-bold mt-24">Players</h2>
      <PlayerList class="text-3xl"></PlayerList>
    </div>
  </main>
</template>
