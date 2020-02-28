const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    os = require('os');
var state = 0, 
    pseudos = [],
    clients = 0;

server.maxConnections = 2;

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        clients++;
        pseudo = ent.encode(pseudo);
        socket.client_id = clients;
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', {pseudo: pseudo, clients:clients});
        socket.broadcast.emit('clients', String(clients));
        socket.emit('clients', String(clients));
        if (clients==2) {
          socket.broadcast.emit('turn', "1");
        }
        console.log('connection:', "clients:", clients);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });

    socket.on('joue', function(choice) {
      choice = ent.encode(choice);
      if (clients==2 && state%2==socket.client_id-1) {
        socket.broadcast.emit('joue', choice);
        state++;
      } else if (clients!=2){
        socket.broadcast.emit('erreur', "Il y a "+client+" joueurs au lieu de 2.");
      } else if (state%2!=socket.client_id-1) {
        console.log(state, socket.client_id)
        socket.broadcast.emit('erreur', "Ce n'est pas votre tour!");
      } else {
        socket.broadcast.emit('erreur', "Une erreur inconnue s'est produite.");
      }
    });

    socket.on("restart", function(_) {
      socket.broadcast.emit("restart", _);
    })

    // socket.on('disconnect', function() {
    //   clients--;
    //   console.log('disconnection');
    // });
});



server.listen(8080);
