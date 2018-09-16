const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PublicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(PublicPath))


io.on('connection', (socket) => {
  console.log('Client connected');


  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!'
  });


  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined!'
  })



  socket.on('createMessage', (message) => {
    console.log(message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });


  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
