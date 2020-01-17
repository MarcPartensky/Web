class ContextAdapter {
  constructor(context, plane = new Plane()) {
    this.context = context;
    this.plane = plane;
  }
  get width() {
    return this.context.width;
  }
  set width(value) {
    this.context.width = value;
  }
  get height() {
    return this.context.height;
  }
  set height(value) {
    this.context.height = value;
  }
  get center() {
    return new Vector(this.width/2, this.height/2);
  }
  set strokeStyle(value) {
    this.context.strokeStyle = value;
  }
  get strokeStyle() {
    return this.context.strokeStyle;
  }
  set fillStyle(value) {
    this.context.fillStyle = value;
  }
  get fillStyle() {
    return this.context.fillStyle;
  }
  set strokeWidth(value) {
    this.context.strokeWidth = value;
  }
  get strokeWidth() {
    return this.context.strokeWidth;
  }
  set fillWidth(value) {
    this.context.fillWidth = value;
  }
  get fillWidth() {
    return this.context.fillWidth;
  }
  beginPath() {
    this.context.beginPath();
  }
  closePath() {
    this.context.closePath();
  }
  stroke() {
    this.context.stroke();
  }
  fill() {
    this.context.fill();
  }
  translate(x, y) {
    let v = this.plane.units.dot(new Vector(x,y));
    this.plane.position = v;
  }
  clear() {
    this.context.clearRect(0, 0, this.context.width, this.context.height);
  }
  strokeRect(x, y, w, h) {
    [x, y] = this.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.strokeRect(x-w/2, y-h/2, w, h);
  }
  fillRect(x, y, w, h) {
    [x, y] = this.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.fillRect(x-w/2, y-h/2, w, h);
  }
  clearRect(x, y, w, h) {
    [x, y] = this.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.clearRect(x-w/2, y-h/2, w, h);
  }
  fillText(x, y) {
    [x, y] = this.toScreen(new Vector(x,y)).components;
    this.context.fillText(x, y);
  }
  arc(x, y, r, a, b) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    // r *= Math.max(...this.plane.units.components);
    r = 50;
    this.context.arc(x, y, r, a, b);
  }
  moveTo(x, y) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    this.context.moveTo(x, y);
  }
  lineTo(x, y) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    this.context.lineTo(x, y);
  }
  toScreen(v) {
    v = this.plane.toScreen(v);
    v.iadd(this.center);
    return v;
  }
}








// CanvasRenderingContext2D.prototype.setPlane = function(plane) {
//     this.plane = plane;
// }
// CanvasRenderingContext2D.prototype.strokeRect = function(x, y, w, h) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     [w, h] = this.plane.units.dot(new Vector(w,h)).components;
//     this.context.strokeRect(x, y, w, h);
// }
// CanvasRenderingContext2D.prototype.fillRect = function(x, y, w, h) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     [w, h] = this.plane.units.dot(new Vector(w,h)).components;
//     this.context.fillRect(x, y, w, h);
// }
// CanvasRenderingContext2D.prototype.clearRect = function(x, y, w, h) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     [w, h] = this.plane.units.dot(new Vector(w,h)).components;
//     this.context.clearRect(x, y, w, h);
// }
// CanvasRenderingContext2D.prototype.fillText = function(x, y) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     this.context.fillText(x, y);
// }
// CanvasRenderingContext2D.prototype.moveTo = function(x, y) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     this.context.moveTo(x, y);
// }
// CanvasRenderingContext2D.prototype.lineTo = function(x, y) {
//     [x, y] = this.plane.toScreen(new Vector(x,y)).components;
//     this.context.lineTo(x, y);
// }


// CanvasRenderingContext2D.prototype.constructor = (
//   function constructor(context, plane = new Plane()) {
//     this.context = context;
//     this.plane = plane;
//   })