const express = require('express'), // for easier syntax;
    http = require('http'), // for connexion
    socket = require('socket.io'), // for easier connexion
    ent = require('ent'), // html url security
    os = require('os'), // os access
    fs = require('fs'), // file system
    vm = require('vm'), // to execute scripts
    ss = require('socket.io-stream'); // to stream data

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

// server.maxConnections = 10;

const files = [
  "../Libraries/tools.js",
  "../Libraries/test.js",
  "../Libraries/iterator.js",
  "../Libraries/group.js",
  "../Libraries/tensor.js",
  "../Libraries/vector.js",
  "../Libraries/matrix.js",
  "../Libraries/color.js",
  "../Libraries/point.js",
  "../Libraries/figure.js",
  "../Libraries/form.js",
  "../Libraries/polygon.js",
  "../Libraries/rectangle.js",
  "../Libraries/circle.js",
  "../Libraries/motion.js",
  "../Libraries/body.js",
  "../Libraries/plane.js",
  "../Libraries/context.js",
  "../Libraries/manager.js",

  "model/game/ball.js",
  "model/game/ballgroup.js",
  "model/game/ballsupergroup.js",
  "model/game/collider.js",
  "model/game/gamegroup.js",
  "model/game/player.js",
  "model/game/food.js",
  "model/game/map.js",
  "model/game/game.js",
  "model/game/gamemanager.js",
  "model/game/gameclient.js",
  "model/game/gameserver.js",
];

for (const file of files) {
  let data = fs.readFileSync(file);
  let script = new vm.Script(data);
  script.runInThisContext();
}

app.use('/libs', express.static('../Libraries'));
app.use('/public', express.static('model/game'));
app.use('/view/home/', express.static('../view'));

var path = __dirname.split("/");
path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
  res.sendFile(path + "/view/game/index.html");
  // no redirection
  // res.redirect("/game");
  // res.redirect("/home");
});

app.get('/home', function (req, res) {
  res.sendFile(path + "/view/home/index.html");
});

app.get('/home/style.css', function(req, res) {
  res.sendFile(path + "/view/home/style.css");
});

app.get('/home/script.js', function(req, res) {
  res.sendFile(path + "/view/home/script.js");
});

app.get('/game', function (req, res) {
  res.sendFile(path + "/view/game/index.html");
});


io.on('connection', function (socket, name) {
  socket.on('play-button', function(name) {
    console.log("play button pressed");
    res.redirect('/game?name=${name}');
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
  socket.on("message", function(message) {
    console.log(message);
  })

});


server.listen(8000);


var game = Game.random(0);
console.log(game.map.group.players);
console.log(game.getStream());
game.updateMap();
// console.log(game.map);
var gameServer= new GameServer(game);
// gameServer.on(io;)
// console.log(io.sockets.broadcast);


gameServer.main(io, ss);

