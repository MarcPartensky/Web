class Rectangle extends Polygon {
  static color = "#ffffff";
  static lineWidth = 1;
  static random() {
    return new Rectangle(Math.random(), Math.random(), Math.random(), Math.random());
  }
  constructor(x, y, w, h, color=Form.color, lineWidth=Form.lineWidth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.lineWidth = lineWidth;
  }
  get components() {
    return [this.x, this.y, this.w, this.h];
  }
  set components(value) {
    [this.x, this.y, this.w, this.h] = value;
  }
  get points() {
    let p1 = new Point(this.x, this.y);
    let p2 = new Point(this.x+this.w, this.y);
    let p3 = new Point(this.x+this.w, this.y+this.h);
    let p4 = new Point(this.x, this.y+this.h);
    return [p1, p2, p3, p4];
  }
  set points(value) {
    this.x = Math.min(value.map((p) => p.x));
    this.y = Math.min(value.map((p) => p.y));
    this.w = Math.max(value.map((p) => p.x))-this.x;
    this.h = Math.max(value.map((p) => p.y))-this.y;
  }
  get area() {
    return this.w*this.h;
  }
}
