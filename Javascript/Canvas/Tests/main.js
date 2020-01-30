class Board {
  static createGrid(width, height, value) {
    let grid = [];
    for (let y=0; y<height; y++) {
      let line = [];
      for (let x=0; x<width; x++) {
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
    let W = context.width/this.width;
    let H = context.height/this.height;
    let S = Math.min(W, H);
    for (let y=0; y<this.height; y++) {
      for (let x=0; x<this.width; x++){
        let X = x*S;
        let Y = y*S;
        context.fillStyle = this.grid[y][x];
        context.fillRect(X, Y, S, S);
      }
    }
  }
  setPixel(x, y, color) {
    this.grid[y][x] = color;
    console.log("board.setPixel:color", this.grid[y][x]);
  }
}

class Brush {
  constructor(x, y, color="#000000", size=1) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.down = false;
  }
  update() {
    brush.color = document.getElementById("color").value;
    console.log("brush.update:color", brush.color)
  }
  show(context, width, height) {
    let W = context.width/width;
    let H = context.height/height;
    let S = Math.min(W, H);
    let K = Math.min(width, height);
    // context.strokeStyle = color;
    // context.beginPath();
    // context.arc(this.x*S, this.y*S, this.size*S/2, 0, 2*Math.PI);
    // context.stroke();
    context.fillStyle = this.color;
    context.fillRect(this.x*S, this.y*S, S, S);
  }
}


let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let board = new Board(8,8);
let brush = new Brush();

function resize() {
  context.width = canvas.width = window.innerWidth;
  context.height = canvas.height = window.innerHeight;
}

resize();

canvas.addEventListener("mousemove",
  function(event) {
    let rect = canvas.getBoundingClientRect();
    brush.x=event.x - rect.left;
    brush.y=event.y - rect.top;
  }
)

window.addEventListener("mousedown", function() {
    brush.down = true;
  }
)

window.addEventListener("mouseup", function() {
    brush.down = false;
  }
)

function draw() {
  let W = board.width/context.width;
  let H = board.height/context.height;
  let S = Math.min(W, H);
  let x = parseInt(brush.x * S);
  let y = parseInt(brush.y * S);
  console.log("x,y:", x, y);
  board.setPixel(x, y, brush.color);
}

function step() {
  resize();
  brush.update();
  board.show(context);
  brush.show(context, board.width, board.height);
  if (brush.down) {
    draw();
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
