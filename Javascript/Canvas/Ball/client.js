function resize() {
  context.width = canvas.width = window.innerWidth;
  context.height = canvas.height = window.innerHeight;
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var context = new ContextAdapter(context);
var game = new Game();
var p = Player.random();
var dt = 1;

resize();

function show(context) {
  context.clear();
  game.show(context)
  // p.setView(context);
  p.show(context);
  // context.translate(context.width/2,context.height/2);
}

function update(dt) {
  game.update(dt);
}

function step() {
  show(context);
  update(dt);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
