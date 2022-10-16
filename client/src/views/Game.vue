<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Pallette from "../components/Pallette.vue"
import SquaglViewer from "../components/SquaglViewer.vue"
import SquinqCanvas from "../components/SquinqCanvas.vue"
import SquanqCanvas from "../components/SquanqCanvas.vue"
import SquanqEntry from "../components/SquanqEntry.vue"
import { useLogicStore } from "../stores/logic";
import Timer from "../components/Timer.vue";

let size = 0

const logicState = useLogicStore()

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
  <main class="flex flex-col h-screen">
    <div class="bg-pastel-magenta h-full">
      <Timer class="absolute z-10 mx-auto left-0 right-0 text-center"></Timer>
      <SquanqCanvas v-if="logicState.phase == 1"></SquanqCanvas>
      <SquinqCanvas v-else-if="logicState.phase == 2"></SquinqCanvas>
    </div>
    <div class="p-4 bg-pastel-dark-turquoise flex flex-row">
      <SquanqEntry v-if="logicState.phase == 1" class="w-full"></SquanqEntry>
      <Pallette v-else-if="logicState.phase == 2" class="w-full"></Pallette>
    </div>
  </main>
</template>
