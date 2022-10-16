import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogicStore = defineStore('logic', {
    state: () => ({
        squanql: "",
        gameKey: "",
        phase: 0
    }),
    actions: {
        setGameKey(key: string) {
            this.gameKey = key
        },
        clearGameKey() {
            this.gameKey = ""
        },
        incrPhase() {
            this.phase += 1
        },
        resetPhase() {
            this.phase = 0
        }
    }
})