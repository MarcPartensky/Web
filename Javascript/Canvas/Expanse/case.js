class Case {
  constructor(color) {
    this.color = color;
    // this.texture = texture;
  }
  show(context, x, y) {
    console.log(this.color);
    context.styleFill  = this.color;
    context.fillRect(x, y, 1, 1);
    context.context.fillRect(x, y, 10, 10);
  }
}
