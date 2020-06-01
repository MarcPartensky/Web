var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

var host = String(document.location);
// host = host.replace("http", "ws");
// var socket = io(host, {transports: ['websocket']});
var name = prompt("name");
var socket = io.connect(host, {query: "name="+name});


setInterval(function() {
    startTime = Date.now();
    socket.emit('ping1');
  }, 2000);
  
  socket.on('pong', function() {
    latency = Date.now() - startTime;
    console.log("latency:", latency);
  });
  


var dt = 0.1;
// var map = new GameMap();
// var game = new Game([map], dt);
var game = Game.random(5);
var gameClient = new GameClient(game, socket, context, name);

GameClient.addEventListeners(gameClient);
GameClient.deactivate(gameClient);

gameClient.resize(window);
gameClient.on();

gameClient.main();

