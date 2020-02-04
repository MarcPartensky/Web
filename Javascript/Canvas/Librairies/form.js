/*
Basically a list of points. Unlike a figure, a form does have an area.
*/
class Form extends Figure {
  static areaColor = "#000000";
  static fill = false;
  constructor(...points) {
    super(...points);
    this.areaColor = super.areaColor;
    this.fill = super.fill;
  }
}
