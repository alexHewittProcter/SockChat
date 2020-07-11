const socketIO = require('socket.io');

const socketServer = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log(`New message! ${msg}`);
      io.emit('chat message', msg);
    });
  });
};

module.exports = socketServer;
