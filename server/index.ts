import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap, EventsMap } from "socket.io/dist/typed-events";
import { generateSquinq } from "./line"
import { GameManager } from "./GameManager"

interface SocketData {
  name: string;
  gameKey: string;
  gameId: string;
  is_host: boolean;
  assignedSquanql: Array<string>
  // TODO: Other data associated with user
}

const app = express();
const server = createServer(app);
const io = new Server<DefaultEventsMap, DefaultEventsMap, EventsMap, SocketData> (server, {
    cors: {
      origin: '*',
    }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
          <title>Squinql!</title>
      </head>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
      </script>
      <div style="margin:500;padding:200">
        ${generateSquinq("xx", 0).toString()}
      </div>
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
    let gamepair = GameManager.generateKey()
    socket.join(gamepair[1])
    socket.data.gameKey = gamepair[0]
    socket.data.gameId = gamepair[1]
    socket.data.is_host = true
    socket.emit('createGame', gamepair[0])
  })

  socket.on('cancelGame', () => {
    if (socket.data.gameKey) {
      GameManager.clearPendingGame(socket.data.gameKey)
    }
  })

  socket.on('startGame', () => {
    if (socket.data.gameKey && socket.data.gameId && socket.data.is_host) {
      GameManager.clearPendingGame(socket.data.gameKey)
      GameManager.createOngoingGame(socket.data.gameId)
      io.to(socket.data.gameId).emit("startGame", 30)
      GameManager.storeValue(socket.data.gameId, "squanqlBox", [])
      setTimeout(() => {
        socket.emit("stopPhase1")
      }, 30000);
    }
  })

  socket.on('sendSquanql', (text:string, svg:string) => {
    if (socket.data.gameId) {
      let squanqlBox = GameManager.getValue(socket.data.gameId, "squanqlBox") as Array<Array<string>>;
      squanqlBox.push([socket.id, text, svg])

      if (squanqlBox.length == io.sockets.adapter.rooms.get(socket.data.gameId)?.size) {
        const clients = io.sockets.adapter.rooms.get(socket.data.gameId);

        for (const clientId of clients ?? []) {
          let num = Math.floor(Math.random() * squanqlBox.length); 
          let entry = squanqlBox[num]
          if (entry[0] == clientId) {
            if (num != 0) {
              num = num - 1
              entry = squanqlBox[num-1]
            }
            else{
              num = num + 1
              entry = squanqlBox[num+1]
            }
          }
          squanqlBox.splice(num, 1)
          const clientSocket = io.sockets.sockets.get(clientId);

          if (clientSocket) {
            clientSocket.data.assignedSquanql = entry
            clientSocket.emit("sendSquanql", entry[2])
          }
        }
        io.to(socket.data.gameId).emit('startPhase2', 30)
        GameManager.storeValue(socket.data.gameId, "squinqlBox", [])
        setTimeout(() => {
          socket.emit("stopPhase2")
        }, 30000);
      }
    }
  })

  socket.on('sendSquinql', (jpg:string) => {
    if (socket.data.assignedSquanql && socket.data.gameId && socket.data.name) {
      let squinqlBox = GameManager.getValue(socket.data.gameId, "sqinqlBox") as Array<Record<string, string>>
      let squanql = socket.data.assignedSquanql
      const authorSocket = io.sockets.sockets.get(squanql[0]);
      if (authorSocket?.data.name) {
        let sqinql = {squanqlAuthor: authorSocket.data.name, squinqlAuthor: socket.data.name, word: squanql[1], jpg: jpg}
        squinqlBox.push(sqinql)

        if (squinqlBox.length == io.sockets.adapter.rooms.get(socket.data.gameId)?.size) {
          io.to(socket.data.gameId).emit("sendSquinql", squinqlBox)
        }
      }
    }
  })

  socket.on('joinGame', (code:string) => {
    let game = GameManager.getPendingGame(code);

    if (game) {
      io.to(game).emit('playerJoin', socket.data.name)
      socket.join(game)
      const clients = io.sockets.adapter.rooms.get(game);
      let playerNames = []
      for (const client in clients) {
        playerNames.push(io.sockets.sockets.get(client)?.data.name)
      }
      socket.emit("joinGame", playerNames)
      socket.data.gameId = game
    }
    else {
      socket.emit("joinGame", 400)
    }
  })

  socket.on('leaveGame', () => {
    if (socket.data.gameId) {
      socket.leave(socket.data.gameId)
      io.to(socket.data.gameId).emit('playerLeave', socket.data.name)
      delete socket.data.gameId
    }
  })

  socket.on('registerUser', (userName) => {
    socket.data.name = userName
  })

  socket.on("getSquanqlet", (letter) => {
    socket.emit("getSquanqlet", generateSquinq(letter, 0))
  });

  socket.on('disconnect', () => {
    if (socket.data.gameId && !io.sockets.adapter.rooms.get(socket.data.gameId)) {
      io.to(socket.data.gameId).emit('playerLeave', socket.data.name)
      socket.leave(socket.data.gameId)
    }
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
