<script setup lang="ts">
import { useLogicStore } from '@/stores/logic';
import { ref } from 'vue';
const emit = defineEmits(['textUpdated'])

const logicState = useLogicStore();


const handleChange = (event: KeyboardEvent) => {
    emit('textUpdated', event.key)
    // emit('textUpdated', event.target.value.toLowerCase())
}

// function handleChange(event: KeyboardEvent) {
//     console.log("")
// }

</script>

<template>
    <input type="text" @keyup="handleChange" class="text-4xl p-2 rounded-lg bg-pastel-orange placeholder:text-neutral-600" placeholder="Create a Squanq!" v-model="logicState.squanq_template">
</template>
