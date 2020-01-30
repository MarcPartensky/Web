/*
Basically a list of points.
*/
class Form extends Matrix {
  constructor(...points, width=1, color="#ffffff") {
    super(...points);
    this.width = 1;
    this.color = color;
  }
}

/*
Polygon...
*/
class Polygon extends Form {
  show(context) {
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.beginPath();
    context.moveTo(...this[0]);
    for (const point of this) {
      context.lineTo(...point);
    }
    context.stroke();
    context.close();
  }
}


var p = new Polygon
