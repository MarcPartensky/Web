class Block {
  constructor(id, src, w=100, h=100) {
    this.id = id;
    this.image = new Image(w, h);
    this.image.src = src;
  }
  show(context, x, y, w=1, h=1, t=0) {
    context.drawImage(this.image, x, y, w, h);
  }
}


class AnimatedBlock{
  constructor(id, src, w=100, h=100) {
    this.id = id;
    this.image = new Image(w, h);
    this.image.src = src;
  }
  show(context, x, y, w=1, h=1, t=0) {
    context.drawImage(this.image, x, y, w, h);
  }
}

class PixelBlock {
  constructor(id, grid, colors) {
    this.id = id;
    this.grid = grid;
    this.colors = colors;
  }
}
