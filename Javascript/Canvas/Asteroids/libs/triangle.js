class Triangle extends Polygon {
  // number of points is always 3
  static get length() {return 3;}
  static get w() {return 3;}
  static get width() {return 3;}
  static random(s, color, lineWidth, fill) {
    return new this(
      Matrix.random(this.w, this.h),
      color, lineWidth, fill);
  }
  constructor(matrix, ...args) {
    super(matrix, ...args)
  }
  get area() {
    const [a,b,c] = this.segments.map(s => s.length);
    console.log(a, b, c);
    return 1/4*Math.sqrt((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c));
  }
}
