/*
Polygon...
*/
class Polygon extends Form {
  static random(...args) {
    return new Polygon(...Form.random(...args));
  }
  get area() {

  }
  get center() {
    return Point.average(...this);
  }
  set center(value) {
    const t = value.sub(this.center);
    this.imap(p => p.add(t));
  }
  get segments() {
    const sgs = new Tensor();
    var p = undefined;
    for (const pi of this) {
      if (p) {
        sgs.push(new Segment(pi, p));
      }
    }
    return sgs;
  }
  set segments(value) {
    
  }
  show(context) {
    if (this.fill) {
      context.strokeStyle = this.color;
    } else {
      context.fillStyle = this.color;
    }
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(...this[0]);
    for (const point of this) {
      context.lineTo(...point);
    }
    if (this.fill) {
      context.stroke();
    } else {
      context.fill();
    }
    context.closePath();
  }
  rotate(angle) {
    const center = this.center;
    for (let i=0; i<this.length; i++) {
      this[i].rotate(angle, center);
    }
  }
}
