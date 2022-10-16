import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogicStore = defineStore('logic', {
    state: () => ({
        squanql: "",
        gameKey: "",
        phase: 0,
        timeLeft: 0,
        players: [] as Array<string>,
        paths: [] as Array<string>,
        squanq_template: "",
        squanq: [] as Array<string>
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
        },
        startTimer() {
            const timedown = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft -=1
                }
                else {
                    clearInterval(timedown)
                }
            }, 1000)
        },
        addPath(path: string) {
            this.paths.push(path)
            console.log(this.paths)
        },
        popPath() {
            this.paths.pop()
        },
        getPaths() {
            return this.paths
        },

        setSquanq(squanq: Array<string>) {
            this.squanq = squanq
        },
        getSquanq() {
            return this.squanq
        }
    }
})