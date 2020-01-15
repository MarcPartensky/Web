const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    os = require('os');

var players = [];

io.sockets.on('connection', function (socket, name) {
  socket.on('new player', function(name) {
    players.push();

  }
  socket.on('client deconnexion', function() {})
  socket.on('disconnect', function() {
  console.log('disconnection');
});
}
