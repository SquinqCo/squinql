<script setup lang="ts">
import router from '@/router';
import SocketHandler from '@/sockets';
import { ref, onMounted } from 'vue';


let size = 0

let calcWidthHeight = () => {
  if (window.innerWidth < window.innerHeight) {
    size = window.innerWidth-20
  }
  else {
    size = window.innerHeight-20
  }
}

calcWidthHeight()

onMounted(() => {
  window.addEventListener('resize', calcWidthHeight)
})

</script>

<template>
    <main class="flex flex-col h-screen bg-pastel-magenta">
      <div class="h-full text-center">
        <h1 class="text-6xl font-bold mt-24">Welcome to Squinql</h1>
        <div class="flex flex-col mt-16">
          <button class="bg-pastel-purple py-3 w-2/3 text-3xl mx-auto rounded-xl" @click="router.push('/host')">Create a Lobby</button>
          <button class="bg-pastel-purple mt-16 py-3 w-2/3 text-3xl mx-auto rounded-xl" @click="router.push('/join')">Join a Lobby</button>
        </div>
      </div>
    </main>
  </template>