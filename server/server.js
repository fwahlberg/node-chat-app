const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const Message = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const PublicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(PublicPath))


io.on('connection', (socket) => {
  console.log('Client connected');




  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required!');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);


    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', new Message('Admin', 'Welcome to the chat!'));


    socket.broadcast.to(params.room).emit('newMessage', new Message('Admin', `${params.name} just joined!`));


    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', new Message(user.name, message.text));
    }

    callback();

  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user && coords) {
    io.to(user.room).emit('newLocationMessage', new Message(user.name, {
      latitude: coords.latitude,
      longitude: coords.longitude
    }, true))
  }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', new Message('Admin', `${user.name} has left ;(`));
    }

  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
