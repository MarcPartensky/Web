var canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
context = new ContextAdapter(context);
var size = 5;
var map = new Map(size, size);
map.generate();


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop() {
  map.show(context);
  window.requestAnimationFrame(loop);
}

function main() {
  resize();
  window.requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", main);
