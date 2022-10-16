<script setup lang="ts">
import { useDrawStore } from '@/stores/draw';

let drawState = useDrawStore()

</script>

<template>
<div class="bg-pastel-dark-blue rounded-xl">
    <div class="text-4xl p-2 rounded-lg bg-pastel-orange flex">
        <button class="mr-2 rounded" :class="drawState.tool == 'brush' ? ['bg-pastel-purple'] : []" @click="drawState.setTool('brush')"><i class="las la-paint-brush"></i></button>
        <button class="mr-2 rounded" :class="drawState.tool == 'fill' ? ['bg-pastel-purple'] : []" @click="drawState.setTool('fill')"><i class="las la-fill-drip"></i></button>
        <button class="mr-auto rounded" :class="drawState.tool == 'erase' ? ['bg-pastel-purple'] : []" @click="drawState.setTool('erase')"><i class="las la-eraser"></i></button>
        
        <button class="ml-auto px-2 mr-2 rounded" :class="drawState.thickness == 4 ? ['bg-pastel-purple'] : []" @click="drawState.setThickness(4)"><div class="w-8 h-8 rounded-full bg-[#333333]"></div></button>
        <button class="mr-2 px-2 rounded" :class="drawState.thickness == 3 ? ['bg-pastel-purple'] : []" @click="drawState.setThickness(3)"><div class="w-7 h-7 rounded-full bg-[#333333]"></div></button>
        <button class="mr-2 px-2 rounded" :class="drawState.thickness == 2 ? ['bg-pastel-purple'] : []" @click="drawState.setThickness(2)"><div class="w-6 h-6 rounded-full bg-[#333333]"></div></button>
        <button class="mr-auto px-2 rounded" :class="drawState.thickness == 1 ? ['bg-pastel-purple'] : []" @click="drawState.setThickness(1)"><div class="w-5 h-5 rounded-full bg-[#333333]"></div></button>

        <button class="ml-auto mr-2 px-2 rounded" :class="drawState.color == '#333333' ? ['bg-pastel-purple'] : []" @click="drawState.setColor('#333333')"><div class="w-8 h-8 rounded-full bg-[#333333]"></div></button>
        <button class="mr-2 px-2 rounded" :class="drawState.color == '#fc0004' ? ['bg-pastel-purple'] : []" @click="drawState.setColor('#fc0004')"><div class="w-8 h-8 rounded-full bg-[#fc0004]"></div></button>
        <button class="px-2 rounded" :class="drawState.color == '#6b4c30' ? ['bg-pastel-purple'] : []" @click="drawState.setColor('#6b4c30')"><div class="w-8 h-8 rounded-full bg-[#6b4c30]"></div></button>
    </div>
</div>
</template>
