function createGeneration(width, height) {
  var generation = new Array(height);

  for(var y = 0; y < height; y++) {
    generation[y] = [];
    for(var x = 0; x < width; x++) {
      generation[y][x] = Math.floor(Math.random() * 2);
    }
  }
  return generation;
}

function draw(context2d, generation) {
  var height = generation.length;
  var width = generation[0].length;

  clearBackground(context2d, width, height);
  drawCells(context2d, generation, width, height);
}

function clearBackground(context2d, width, height) {
  context2d.fillStyle = 'black';
  context2d.fillRect(0, 0, width, height);
}

function drawCells(context2d, generation, width, height) {
  context2d.fillStyle = 'white';
  for(var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      if(generation[x][y] === 1) {
        context2d.fillRect(x, y, 1, 1);
      }
    }
  }
}

(function() {
  var generation = createGeneration(100, 100);
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');

  draw(ctx, generation);
})()
