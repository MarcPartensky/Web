var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context = new ContextAdapter(context);
var size = 100;

// var map = new Map(size, size);
// map.generate();
// var generator = new Generator();

var date = new Date();

var blocks = [
  new Block("water", "imgs/water.png"),
  new Block("sand", "imgs/sand.png"),
]

var terrain = new Terrain(blocks);

var movement = {up: false, down: false, right: false, left: false, zoomin: false, zoomout: false};


function resize() {
  canvas.width = context.width = window.innerWidth;
  canvas.height = context.height = window.innerHeight;
}

function onKeyDown(evt) {
  switch(evt.keyCode){
        case 39: // Arrow Right
          movement.right = true;
          break;
        case 37: // Arrow Left
          movement.left = true;
          break;
        case 40: // Arrow Up
          movement.up = true;
          break;
        case 38: // Arrow Down
          movement.down = true;
          break;
        case 16:
          if (evt.location == 1) {
            movement.zoomout = true;
          } else {
            movement.zoomin = true;
          }
          break;
    }
}

function onKeyUp(evt) {
  switch(evt.keyCode) {
        case 39: // Arrow Right
          movement.right = false;
          break;
        case 37: // Arrow Left
          movement.left = false;
          break;
        case 40: // Arrow Up
          movement.up = false;
          break;
        case 38: // Arrow Down
          movement.down = false;
          break;
        case 16:
          if (evt.location == 1) {
            movement.zoomout = false;
          } else {
            movement.zoomin = false;
          }
          break;
    }
}

function move(movement) {
  if (movement.up) {
    context.plane.position.y += context.plane.speed/context.plane.ux;
  }
  if (movement.down) {
    context.plane.position.y -= context.plane.speed/context.plane.uy;
  }
  if (movement.left) {
    context.plane.position.x -= context.plane.speed/context.plane.ux;
  }
  if (movement.right) {
    context.plane.position.x += context.plane.speed/context.plane.uy;
  }
  if (movement.zoomin) {
    context.plane.units.imul(1.1);
  }
  if (movement.zoomout) {
    context.plane.units.imul(0.9);
  }
}

function loop() {
  context.fillStyle = "black";
  context.clear();
  let [xmin, ymin] = context.plane.fromScreen(new Vector(-context.width/2, -context.height/2)).floor();
  let [xmax, ymax] = context.plane.fromScreen(new Vector(context.width/2, context.height/2)).floor();
  // generator.showNet(context, xmin-1, ymin-1, xmax+2, ymax+2);
  // generator.showRaw(context, xmin-1, ymin-1, xmax+2, ymax+2);
  // var img = new Image(100, 100);
  // img.src = "imgs/water.png";
  // context.drawImage(img, 0, 0, 10, 10);
  // map.show(context)
  var t = date.getTime();
  terrain.show(context, t);
  move(movement);
  requestAnimationFrame(loop);
}

function deactivate() {
  window.addEventListener("keydown", function(e) {
    // prevent default actions from space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);
}

function main() {
  resize();
  deactivate();
  loop();
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}

document.addEventListener("DOMContentLoaded", main);
