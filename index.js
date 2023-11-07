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

  

  io.on("connection", (socket) => {

    socket.on('chat', (message) => {
      const data = JSON.parse(message)
      console.log('username ' + data.username +  ' message: '  + data.message);
      io.emit('chat', message);

  });
  })

const port = 3000
server.listen(port,()=>{
    console.log(port);
})