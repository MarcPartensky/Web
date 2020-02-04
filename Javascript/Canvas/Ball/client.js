var canvas = document.getElementById("canvas");
var player = Player.random();
var players = [player];
var food = Food.random();
var map = new Map();
var game = new Game(canvas, dt=0.1, map=map, players=players);


Game.addEventListeners(game);
Game.deactivate();

game.main();
