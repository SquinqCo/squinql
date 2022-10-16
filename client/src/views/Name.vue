<script setup lang="ts">
import router from '@/router';
import SocketHandler from '@/sockets';
import { useLogicStore } from '@/stores/logic';

const logicState = useLogicStore()

let name = ""
</script>

<template>
  <aside>

  </aside>
  <main class="flex flex-col h-screen bg-pastel-magenta">
      <div class="h-full text-center">
        <h1 class="text-5xl font-bold mt-24">Pick A Name!</h1>

        <div class="flex flex-row">
            <input class="bg-pastel-yellow px-4 py-2 my-16 w-2/3 ml-auto text-6xl rounded-xl" v-model="name">
            <button class="bg-pastel-turquoise px-4 my-16 w-96 ml-4 mr-auto rounded-xl text-6xl font-bold" @click="SocketHandler.registerUser(name);router.push('/lobby')">Confirm</button>
        </div>
      </div>

  </main>
</template>
