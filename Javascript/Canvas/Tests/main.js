class Board {
  static createGrid(width, height, value) {
    var grid = [];
    for (var y=0; y<height; y++) {
      var line = [];
      for (var x=0; x<width; x++) {
        line.push(value);
      }
      grid.push(line);
    }
    return grid;
  }
  constructor(width=16, height=16, color="#eeeeee") {
    this.width = width;
    this.height = height;
    this.grid = Board.createGrid(width, height, color);
  }
  show(context) {
    var W = context.width/this.width;
    var H = context.height/this.height;
    var S = Math.min(W, H);
    for (let y=0; y<this.height; y++) {
      for (let x=0; x<this.width; x++){
        let X = x*S;
        let Y = y*S;
        context.fillStyle = this.grid[y][x];
        context.fillRect(X, Y, S, S);
      }
    }
  }
  click(x, y, color) {
    this.grid[y][x] = color;
  }
}


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var color = document.getElementById("color");
var mouse = {x: 0, y: 0};
var board = new Board(8,8);


function resize() {
  context.width = canvas.width = window.innerWidth*0.9;
  context.height = canvas.height = window.innerHeight*0.9;
}

resize();

window.addEventListener("mousemove",
  function(event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x=event.x - rect.left;
    mouse.y=event.y - rect.top;
  }
)

window.addEventListener("click",
  function() {
    var W = board.width/context.width;
    var H = board.height/context.height;
    var S = Math.min(W, H);
    var x = parseInt(mouse.x * S);
    var y = parseInt(mouse.y * S);
    board.click(x, y, color.value);
  }
)


function step() {
  board.show(context);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
