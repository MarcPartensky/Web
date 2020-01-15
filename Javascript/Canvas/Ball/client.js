function resize() {
  context.width = canvas.width = window.innerWidth*0.9;
  context.height = canvas.height = window.innerHeight*0.9;
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var context = new ContextAdapter(context);
var game = new Game();

// game.map.show(context);

var p = Player.random();
// p.show(context);

resize();

function show() {
  game.map.show(context);
  // p.setView(context);
  p.show(context);
}


function step() {
  show(context);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
