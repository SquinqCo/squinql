import { io } from "socket.io-client";
import type { Socket } from "socket.io-client"
import { useLogicStore } from "./stores/logic";
import { pinia } from "./main";

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
            
        })

        this.socket.on('joinGame', (r) => {
            console.log(r)
        })

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

}