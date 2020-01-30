export class Point extends Vector {
  static radius = 1;
  static color = "#ffffff";
  constructor(...components) {
    super(...components);
    this.radius = radius;
    this.color = color;
  }
  get r() {
    return this.radius;
  }
  set r(value) {
    this.radius = value;
  }
  show(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.fill();
    context.close();
  }
}
