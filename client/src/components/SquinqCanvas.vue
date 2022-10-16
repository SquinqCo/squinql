<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useDrawStore } from '@/stores/draw';
import SquanqEntry from "../components/SquanqEntry.vue"
import SquaglViewer from "../components/SquaglViewer.vue"

let size = ref(0)
let ctx: CanvasRenderingContext2D;

let drawState = useDrawStore()

// Drawing LMFAO

window.addEventListener('load', ()=>{
        
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mouseup', stopPainting);
  document.addEventListener('mousemove', sketch);
  // window.addEventListener('resize', resize);
});

let paint = false
let coord = {x:0 , y:0}; 

function getPosition(event: MouseEvent){
  let canvas = document.getElementById('squanq-drawer') as HTMLCanvasElement

  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
  
// The following functions toggle the flag to start
// and stop drawing
function startPainting(event: MouseEvent){
  paint = true;
  getPosition(event);
}

function stopPainting(){
  paint = false;
}

function sketch(event: MouseEvent){
  if (!paint) return;
  ctx.beginPath();
    
  ctx.lineWidth = 5;
   
  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round';
          
  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x-10, coord.y-10);
   
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);
   
  // A line is traced from start
  // coordinate to this coordinate
  if (drawState.tool == 'brush') {
    ctx.lineWidth = drawState.thickness
    ctx.strokeStyle = drawState.color
    ctx.lineTo(coord.x-10 , coord.y-10);
      
    // Draws the line.
    ctx.stroke();
  } else if (drawState.tool == 'erase') {
    ctx.lineWidth = drawState.thickness * 3
    ctx.strokeStyle = '#ffffff'
    ctx.lineTo(coord.x-10 , coord.y-10);
    // Draws the line.
    ctx.stroke();
  }
}

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

  ctx.beginPath()
  


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
