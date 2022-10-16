<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Pallette from "../components/Pallette.vue"
import SquaglViewer from "../components/SquaglViewer.vue"
import SquinqCanvas from "../components/SquinqCanvas.vue"

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
      <SquinqCanvas></SquinqCanvas>
    </div>
    <div class="p-4 bg-pastel-dark-turquoise flex flex-row">
      <Pallette class="w-full"></Pallette>
    </div>
  </main>
</template>
