import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateSquinq } from "./line"

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  // TODO: Other data associated with user
}

const app = express();
const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData> (server, {
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
      ${generateSquinq("xx", 0).toString()}
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

  // socket.on('registerUser', (userName) => {
  //   socket.data.name = userName
  // })

  // socket.on("getSquanql", (letter) => {
  //   socket.emit("", generateSquinq(letter, 0))
  // });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
