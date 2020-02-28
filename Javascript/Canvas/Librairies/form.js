/*
Basically a list of points. Unlike a figure, a form does have an area.
*/
class Form extends Figure {
  static width = 3;
  static height = 2;

  static color = "#ffffff";
  static areaColor = this.color;
  static borderColor = Color.darken(this.areaColor);
  static fill = true;

}
