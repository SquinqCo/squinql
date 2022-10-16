<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SquanqEntry from "../components/SquanqEntry.vue"


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
    <aside>
  
    </aside>
    <main class="flex flex-col h-screen">
      <div class="bg-pastel-magenta h-full">
        <h1>Welcome to Squinql</h1>
        <SquanqEntry class="w-full"></SquanqEntry>
        <!-- <SquanqCanvas></SquanqCanvas> -->
        <!-- <div class="p-24 bg-pastel-dark-turquoise flex flex-column"></div> -->
      </div>
      <!-- <div class="p-4 bg-pastel-dark-turquoise flex flex-row"> -->
      <!-- </div> -->
    </main>
  </template>