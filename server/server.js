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

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
