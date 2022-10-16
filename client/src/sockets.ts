import { io } from "socket.io-client";
import type { Socket } from "socket.io-client"

export default class SocketHandler {
    static socket: Socket;
    private static connectAttempt = false
    private static connected = false;

    static connect(url: string) {
        this.socket = io(url)

        console.log("Established Connection with Game Server")
    }

}