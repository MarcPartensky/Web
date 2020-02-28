var canvas = document.getElementById("canvas");
var color = Color.random();
var name = "Marc";

var group = UpperBallGroup.random(1);
var map = new Map();
var entities = [["group",group], ["map",map]];
var dt = 0.1;
var game = Game.from(canvas, entities=entities, dt=dt);
game.context.plane.units.position = new Vector(1,1);


Game.addEventListeners(game);
Game.deactivate();

game.main();
