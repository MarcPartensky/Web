class ContextAdapter {
  constructor(context, plane = new Plane()) {
    this.context = context;
    this.plane = plane;
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
  strokeRect(x, y, w, h) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.strokeRect(x, y, w, h);
  }
  fillRect(x, y, w, h) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.fillRect(x, y, w, h);
  }
  clearRect(x, y, w, h) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    [w, h] = this.plane.units.dot(new Vector(w,h)).components;
    this.context.clearRect(x, y, w, h);
  }
  fillText(x, y) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    this.context.fillText(x, y);
  }
  arc(x, y, r, a, b) {
    [x, y] = this.plane.toScreen(new Vector(x,y)).components;
    r *= Math.max(this.plane.units);
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
