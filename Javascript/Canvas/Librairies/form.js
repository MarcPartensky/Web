/*
Basically a list of points. Unlike a figure, a form does have an area.
*/
class Form extends Figure {
  static areaColor = "#000000";
  static fill = false;
  static width = 3;
  static height = 2;
  static random(width=Form.width, height=Form.height) {
    return new Form(...Figure.random(width, height));
  }
  constructor(...points) {
    super(...points);
    this.areaColor = Form.areaColor;
    this.fill = Form.fill;
  }
}
