const express = require('express'), // for easier syntax;
    http = require('http'), // for connexion
    socket = require('socket.io'), // for easier connexion
    ent = require('ent'), // html url security
    os = require('os'), // os access
    fs = require('fs'), // file system
    vm = require('vm'); // to execute scripts

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const files = [
  "../Librairies/test.js",
  "../Librairies/iterator.js",
  "../Librairies/group.js",
  "../Librairies/tensor.js",
  "../Librairies/vector.js",
  "../Librairies/matrix.js",
  "../Librairies/color.js",
  "../Librairies/point.js",
  "../Librairies/figure.js",
  "../Librairies/form.js",
  "../Librairies/polygon.js",
  "../Librairies/rectangle.js",
  "../Librairies/circle.js",
  "../Librairies/motion.js",
  "../Librairies/body.js",
  "../Librairies/plane.js",
  "../Librairies/context.js",
  "../Librairies/manager.js",

  "model/game/map.js",
  "model/game/ball.js",
  "model/game/ballgroup.js",
  "model/game/ballsupergroup.js",
  "model/game/player.js",
  "model/game/food.js",
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

app.use('/libs', express.static('../Librairies'));
app.use('/public', express.static('model/game'));
app.use('/view/home/', express.static('../view'));

var path = __dirname.split("/");
path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
  res.redirect("/home");
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

io.sockets.on('connection', function (socket, name) {
  socket.on('connect', function() {
    console.log('connected');
  });
  socket.on('play-button', function(name) {
    console.log("play button pressed");
    res.redirect('/game?name=${name}');
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
});


server.listen(8000);


var game = Game.random(1);
var gameServer= new GameServer(game, socket);
gameServer.main();

