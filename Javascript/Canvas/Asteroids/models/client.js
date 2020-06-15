var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

// var name = prompt("name");
var host = String(document.location);
var socket = io.connect(host) //, {query: "name="+name});

var group = new SuperGroup();
var game = new Game(group);

gameClient = new GameClient(canvas, game, socket)
gameClient.main();