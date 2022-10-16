"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const line_1 = require("./line");
const GameManager_1 = require("./GameManager");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
          <title>Hello squrkle!</title>
      </head>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
      </script>
      ${(0, line_1.generateSquinq)("xx", 0).toString()}
      <body>SQUINK!!! SQUNIQL!!</body>
    </html>
  `);
});
io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    // console.log(generateSquinq("ae", 0).toString())
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('createGame', () => {
        let gamepair = GameManager_1.GameManager.generateKey();
        socket.join(gamepair[1]);
        socket.data.gameKey = gamepair[0];
        socket.data.gameId = gamepair[1];
        socket.data.is_host = true;
        socket.emit('createGame', gamepair[0]);
    });
    socket.on('cancelGame', () => {
        if (socket.data.gameKey) {
            GameManager_1.GameManager.clearPendingGame(socket.data.gameKey);
        }
    });
    socket.on('startGame', () => {
        if (socket.data.gameKey && socket.data.gameId && socket.data.is_host) {
            GameManager_1.GameManager.clearPendingGame(socket.data.gameKey);
            GameManager_1.GameManager.createOngoingGame(socket.data.gameId);
            io.to(socket.data.gameId).emit("startGame", 30);
            GameManager_1.GameManager.storeValue(socket.data.gameId, "squanqlBox", []);
            setTimeout(() => {
                socket.emit("stopPhase1");
            }, 30000);
        }
    });
    socket.on('sendSquanql', (text, svg) => {
        var _a;
        if (socket.data.gameId) {
            let squanqlBox = GameManager_1.GameManager.getValue(socket.data.gameId, "squanqlBox");
            squanqlBox.push([socket.id, text, svg]);
            if (squanqlBox.length == ((_a = io.sockets.adapter.rooms.get(socket.data.gameId)) === null || _a === void 0 ? void 0 : _a.size)) {
                const clients = io.sockets.adapter.rooms.get(socket.data.gameId);
                for (const clientId of clients !== null && clients !== void 0 ? clients : []) {
                    let num = Math.floor(Math.random() * squanqlBox.length);
                    let entry = squanqlBox[num];
                    if (entry[0] == clientId) {
                        if (num != 0) {
                            num = num - 1;
                            entry = squanqlBox[num - 1];
                        }
                        else {
                            num = num + 1;
                            entry = squanqlBox[num + 1];
                        }
                    }
                    squanqlBox.splice(num, 1);
                    const clientSocket = io.sockets.sockets.get(clientId);
                    if (clientSocket) {
                        clientSocket.data.assignedSquanql = entry;
                        clientSocket.emit("sendSquanql", entry[2]);
                    }
                }
                io.to(socket.data.gameId).emit('startPhase2', 30);
                GameManager_1.GameManager.storeValue(socket.data.gameId, "squinqlBox", []);
                setTimeout(() => {
                    socket.emit("stopPhase2");
                }, 30000);
            }
        }
    });
    socket.on('sendSquinql', (jpg) => {
        var _a;
        if (socket.data.assignedSquanql && socket.data.gameId && socket.data.name) {
            let squinqlBox = GameManager_1.GameManager.getValue(socket.data.gameId, "sqinqlBox");
            let squanql = socket.data.assignedSquanql;
            const authorSocket = io.sockets.sockets.get(squanql[0]);
            if (authorSocket === null || authorSocket === void 0 ? void 0 : authorSocket.data.name) {
                let sqinql = { squanqlAuthor: authorSocket.data.name, squinqlAuthor: socket.data.name, word: squanql[1], jpg: jpg };
                squinqlBox.push(sqinql);
                if (squinqlBox.length == ((_a = io.sockets.adapter.rooms.get(socket.data.gameId)) === null || _a === void 0 ? void 0 : _a.size)) {
                    io.to(socket.data.gameId).emit("sendSquinql", squinqlBox);
                }
            }
        }
    });
    socket.on('joinGame', (code) => {
        let game = GameManager_1.GameManager.getPendingGame(code);
        if (game) {
            socket.join(game);
            socket.emit("joinGame", 200);
            socket.data.gameId = game;
        }
        else {
            socket.emit("joinGame", 400);
        }
    });
    socket.on('leaveGame', () => {
        if (socket.data.gameId) {
            socket.leave(socket.data.gameId);
            delete socket.data.gameId;
        }
    });
    socket.on('registerUser', (userName) => {
        socket.data.name = userName;
    });
    socket.on("getSquanqlet", (letter) => {
        socket.emit("getSquanqlet", (0, line_1.generateSquinq)(letter, 0));
    });
    socket.on('disconnect', () => {
        if (socket.data.gameId && !io.sockets.adapter.rooms.get(socket.data.gameId)) {
            socket.leave(socket.data.gameId);
        }
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
