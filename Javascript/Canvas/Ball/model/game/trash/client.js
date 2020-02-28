var canvas = document.getElementById("canvas");
var color = Color.random();
var name = "Marc";

var group = UpperBallGroup.random(5);
var map = new Map();
var entities = [["group",group], ["map",map]];
var dt = 0.1;
var game = Game.from(canvas, entities=entities, dt=dt);
game.context.plane.units.position = new Vector(1,1);


Game.addEventListeners(game);
Game.deactivate();

game.main();

var host = String(document.location);
host = host.replace("http", "ws");
var socket = io(host, {transports: ['websocket']});
// console.log(host);
