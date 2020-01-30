class Segment extends Matrix {
  constructor(p1, p2, width=1, color="#ffffff") {
    super(p1, p2);
    this.width = width;
    this.color = color;
  }
  get p1() {
    return this[0];
  }
  set p1(value) {
    this[0] = value;
  }
  get p2() {
    return this[1];
  }
  set p2(value) {
    this[1] = value;
  }
  show(context) {
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(...this.p1);
    context.lineTo(...this.p2);
    context.close();
  }
}
