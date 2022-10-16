<script setup lang="ts">
import { ref } from 'vue';

const squanq_template = ref('')
</script>

<template>
    <input type="text" class="text-4xl p-2 rounded-lg bg-pastel-orange placeholder:text-neutral-600" placeholder="Create a Squanq!" v-model="squanq_template">
</template>
