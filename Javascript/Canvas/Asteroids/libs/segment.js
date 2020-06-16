class Segment extends Figure {
  static lineWidth = 1;
  static color = "#ffffff";
  static random(lineWidth=super.width, color=super.color) {
    return new Segment(
      Point.random(),
      Point.random(),
      lineWidth,
      color)
  }
  constructor(p1, p2, lineWidth, color) {
    super();
    this.points = [Point.from(p1), Point.from(p2)];
    this.lineWidth = lineWidth || super.lineWidth;
    this.color = color || super.color;
  }
  get p1() {
    return this.points[0];
  }
  set p1(value) {
    this.points[0] = value;
  }
  get p2() {
    return this.points[1];
  }
  set p2(value) {
    this.points[1] = value;
  }
  get vector() {
    return 
  }
  get length() {
    return this.p1.sub(this.p2).norm
  }
  show(context) {
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(...this.p1);
    context.lineTo(...this.p2);
    context.closePath();
  }
}
