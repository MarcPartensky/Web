var io = require('socket.io')(8000);

io.on('connection', function (socket) {
  socket.on('message', function (message) {
    console.log(message);
  });
  socket.on('disconnect', function () { });
});
