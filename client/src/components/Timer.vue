<script setup lang="ts">
import { useLogicStore } from '@/stores/logic';

const logicState = useLogicStore();

</script>

<template>
  <div class="w-24 h-24 bg-pastel-yellow rounded-b-full">
    <h1 class="text-6xl">{{logicState.timeLeft}}</h1>
  </div>
</template>
