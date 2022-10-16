<script setup lang="ts">
import { useLogicStore } from '@/stores/logic';

const logicState = useLogicStore();
</script>

<template>
    <div class="flex flex-col">
        <div class="" v-for="name in logicState.players">
            <p>{{name}}</p>
        </div>
    </div>
</template>
