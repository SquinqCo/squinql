<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SquanqEntry from "../components/SquanqEntry.vue"
import SquaglViewer from "../components/SquaglViewer.vue"
import BaseCanvas from "../components/BaseCanvas.vue"

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
      <BaseCanvas></BaseCanvas>
    </div>
    <div class="p-4 bg-pastel-dark-turquoise flex flex-row">
      <SquanqEntry class="w-full"></SquanqEntry>
    </div>
  </main>
</template>
