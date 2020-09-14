var canvas = document.getElementById("canvas");

var blocks = [
  new Block("water", "imgs/water.png", new Vector(0, 0, 1)),
  new Block("beach", "imgs/sand.png", new Vector(0.1, 0.5, 0.8)),
  new Block("dark_water", "imgs/dark_water.png", new Vector(-1, -0.5, 1)),
  new Block("sand", "imgs/sand.png", new Vector(0, 1, -1)),
  new Block("grass", "imgs/grass.png", new Vector(1, 0, 0)),
  new Block("ice", "imgs/ice.png", new Vector(1, -1, 0)),
  new Block("frozen_water", "imgs/frozen_water.png", new Vector(0, -0.5, 1)),
  new Block("snow", "imgs/snow.png", new Vector(0.5, -1, 0.5)),
  new Block("red dirt", "imgs/red_dirt.png", new Vector(0.3, 0.5, 1)),
  new Block("apple_tree", "imgs/apple_tree.png", new Vector(0.6, 0.8, 0.7)),
  new Block("tree", "imgs/tree.png", new Vector(0.5, 0.5, 0.5)),
  new Block("rock", "imgs/rock.png", new Vector(0.9, 0, -0.9)),
  new PixelBlock("slowice", [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ],["#a7eeee", "#62daee"], new Vector(1, -1, 1)),
];

var frequency = 1/10;
var terrain = new Terrain(blocks, frequency=frequency);
var game = new Game(canvas, terrain, dt=1);

// document.addEventListener("DOMContentLoaded", game.main);
game.main();
