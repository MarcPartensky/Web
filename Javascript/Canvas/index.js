const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    os = require('os');

// server.maxConnections = 2;

// app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });


io.sockets.on('connection', function (socket, pseudo) {

});

server.listen(8000);
