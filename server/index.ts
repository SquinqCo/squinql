// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });
// const port = process.env.PORT || 8080

// app.get('/', function(req, res) {
//   console.log(process.dir)
//   res.sendFile('/client/index.html')
// })

// io.on('connection', (socket) => {
//   console.log("user connect")

//   socket.on('disconnect', function () {
//     console.log(`user disconnect`)
//   })
// })

// httpServer.listen(port, function() {
//   console.log(`Listening on port ${port}`)
// })


import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { /* options */ });


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
      <body>SQUINK!!! SQUNIQL!!</body>
    </html>
  `);
});

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
