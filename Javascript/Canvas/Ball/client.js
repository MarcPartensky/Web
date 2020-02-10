var canvas = document.getElementById("canvas");
var players = [];
var n = 10;
for (let i=0; i<n; i++) {
  players.push(Player.random());
}
var food = Food.random();
var map = new Map();

var game = new Game(canvas, dt=0.1, map=map, players=players);
game.context.plane.units.position = new Vector(0.5,0.5);


Game.addEventListeners(game);
Game.deactivate();

game.main();
