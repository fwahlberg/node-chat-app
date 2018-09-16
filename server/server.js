const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const Message = require('./utils/message');
const PublicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(PublicPath))


io.on('connection', (socket) => {
  console.log('Client connected');


  socket.emit('newMessage', new Message('Admin', 'Welcome to the chat!'));


  socket.broadcast.emit('newMessage', new Message('Admin', 'A new user has joined!'));



  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', new Message(message.from, message.text));
    callback();

  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
