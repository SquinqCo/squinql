<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref, watch } from 'vue';
import SquanqEntry from "../components/SquanqEntry.vue"
import SquaglViewer from "../components/SquaglViewer.vue"
import { useLogicStore } from '@/stores/logic';
import { storeToRefs } from 'pinia';

let size = ref(0)
let ctx: CanvasRenderingContext2D;

let logicState = useLogicStore();

logicState.$subscribe((mut, state) => {
  for (let i = 0; i < logicState.paths.length; i++) {
    console.log(logicState.paths[i])
    let path = new Path2D(logicState.paths[i])
    ctx.moveTo(0,0)
    ctx.stroke(path)
  }
})

let calcWidthHeight = () => {
  if (window.innerWidth < window.innerHeight) {
    size.value = window.innerWidth-22
    console.log(size)
  }
  else {
    size.value = window.innerHeight-134
    console.log(size)
  }
}

let bindCtx = (context: CanvasRenderingContext2D) => {
  ctx = context
}

calcWidthHeight()

onMounted(() => {
  let canvas = document.getElementById('squanq-drawer') as HTMLCanvasElement
  let context = canvas.getContext("2d")

  if (context) {
    bindCtx(context)
  }

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
})

onUnmounted(() => {
  window.removeEventListener('resize', calcWidthHeight)
})

</script>

<template>
  <div class="bg">
    <canvas id="squanq-drawer" class="mx-auto my-[10px] border-black border-8 rounded-xl" :width="size" :height="size"></canvas>
  </div>
</template>
