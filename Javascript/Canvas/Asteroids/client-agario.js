var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

var name = prompt("name");
var host = String(document.location);
var socket = io.connect(host, {query: "name="+name});

setInterval(function() {
    startTime = Date.now();
    socket.emit('ping');
  }, 2000);
  
  socket.on('pong', function() {
    latency = Date.now() - startTime;
    console.log("latency:", latency);
});
  


var dt = 0.1;
var game = Game.random();
var gameClient = new GameClient(game, socket, context, name);

GameClient.addEventListeners(gameClient);
GameClient.deactivate(gameClient);

gameClient.resize(window);
gameClient.on();

gameClient.main();

