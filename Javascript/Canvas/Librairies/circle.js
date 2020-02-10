class Circle extends Form {
  constructor(vector, radius) {
    super(vector);
    this.radius = radius;
  }
  get center() {
    return this[0];
  }
  set center(value) {
    this[0] = value;
  }
  get x() {
    return this[0][0];
  }
  set x(value) {
    this[0][0] = value;
  }
  get y() {
    return this[0][1];
  }
  set y(value) {
    this[0][1] = value;
  }
  get r() {
    return this.radius;
  }
  set r(value) {
    this.radius = value;
  }
  show(context) {
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.arc(...this[0], this.radius, 0, 2*Math.PI);
    
    context.close();
  }

}
