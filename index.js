const express = require('express')

const http = require('http')


const app = express()
const server = http.createServer(app)
const { join } = require('node:path');
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname+"/public")));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/public/index.html'));
  });

  // io.on('connection', (socket) => {
  //   console.log('a user connected');
  //   socket.on('disconnect', () => {
  //       console.log('user disconnected');
  //     });

    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);

    // });

  // });

  io.on("connection", (socket) => {
    socket.on("newuser",(username)=>{
      socket.broadcast.emit("update",username + "joined")
      console.log(username + " has joined");
      socket.on('disconnect', () => {
              console.log(username + ' user disconnected');
            });
    })

    socket.on('chat', (message) => {
      console.log('message: ' + message);
      io.emit('chat', message);

  });
  })

const port = 3000
server.listen(port,()=>{
    console.log(port);
})