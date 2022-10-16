import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogicStore = defineStore('logic', {
    state: () => ({
        squanql: "",
        gameKey: "",
        phase: 0,
        timeLeft: 0,
        players: [] as Array<string>
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
        },
        setPlayers(players: Array<string>) {
            this.players = players
        },
        addPlayer(player: string) {
            this.players.push(player)
        },
        removePlayer(player: string){
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i] == player) {
                    this.players.splice(i, 1)
                    break
                }
            }
        },
        setTimer(time: number) {
            this.timeLeft = time
            const timedown = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft -=1
                }
                else {
                    clearTimeout(timedown)
                }
            }, 1000)
        }
    }
})