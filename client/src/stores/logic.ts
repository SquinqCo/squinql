import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogicStore = defineStore('logic', {
    state: () => ({
        squanql: ""
    })
})