var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

var host = String(document.location);
// host = host.replace("http", "ws");
// var socket = io(host, {transports: ['websocket']});
var socket = io.connect(host);

var dt = 0.1;
// var map = new GameMap();
var map = GameMap.random();
var game = new Game([map], dt);
var gameClient = new GameClient(game, socket, context);

GameClient.addEventListeners(gameClient);
GameClient.deactivate(gameClient);

gameClient.resize(window);
gameClient.on();

gameClient.main();

