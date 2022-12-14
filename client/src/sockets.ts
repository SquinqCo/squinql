import { io } from "socket.io-client";
import type { Socket } from "socket.io-client"
import { useLogicStore } from "./stores/logic";
import { pinia } from "./main";
import router from "./router";

export default class SocketHandler {
    private static socket: Socket;

    static connect(url: string) {
        this.socket = io(url)
        const logicState = useLogicStore(pinia)
        console.log("Established Connection with Game Server")

        this.socket.on('createGame', (key: string) => {
            logicState.setGameKey(key)
        })

        this.socket.on('startGame', (time: number) => {
            logicState.incrPhase();
            router.push('/game')
            logicState.setTimer(time)
            logicState.startTimer()
        })

        this.socket.on('stopPhase1', () => {
            this.sendSquanql(logicState.squanq_template, logicState.paths)
        })

        this.socket.on('sendSquanql', (squanq: Array<string>) => {
            logicState.setSquanq(squanq);
        })

        this.socket.on('startPhase2', (time: number) => {
            logicState.incrPhase();
            logicState.setTimer(time)
        })

        this.socket.on('stopPhase2', () => {
            router.push('/summary')
        })

        this.socket.on('joinGame', (r) => {
            logicState.setPlayers(r)
        })

        this.socket.on('playerJoin', (r) =>{
            logicState.addPlayer(r)
        })

        this.socket.on('playerLeave', (r) => {
            logicState.removePlayer(r)
        })

        this.socket.on('sendCharacter', (r) => {
            console.log(r)
            logicState.addPath(r)
        })

    }

    static registerUser(name: string) {
        this.socket.emit("registerUser", name)
    }

    static createGame() {
        this.socket.emit("createGame")
    }

    static joinGame(key: string) {
        this.socket.emit("joinGame", key)
    }

    static startGame() {
        this.socket.emit("startGame")
    }

    static sendCharacter(character: string, offset=0): void {
        this.socket.emit("sendCharacter", character, offset)
    }

    static sendSquanql(word: string, paths: Array<string>) {
        this.socket.emit("sendSquanql", word, paths)
    }

}