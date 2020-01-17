class Plane {
  static position = Vector.zero;
  static units = new Vector(500, 500);
  constructor(position=Plane.position, units=Plane.units) {
    this.position = position;
    this.units = units;
  }
  get x() {
    return this.position.x;
  }
  set x(value) {
    this.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  get ux() {
    return this.unit.x;
  }
  set ux(value) {
    this.units.x = value;
  }
  get uy() {
    return this.units.y;
  }
  set uy(value) {
    this.units.y = value;
  }
  toScreen(position) {
    return (position.sub(this.position)).dot(this.units);
  }
  fromScreen(position) {
    return (position.dot(this.units.map(x => 1/x))).add(this.position);
  }
}