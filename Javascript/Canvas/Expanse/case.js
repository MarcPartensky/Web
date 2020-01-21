class Case {
  constructor(color) {
    this.color = color;
    // this.texture = texture;
  }
  show(context, x, y) {
    context.styleFill  = color;
    context.fillRect(x, y, 1, 1);
  }
}
