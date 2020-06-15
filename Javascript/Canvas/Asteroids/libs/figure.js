/*

*/
class Figure {
  static lineWidth = 1;
  static color = "#ffffff";
  static borderColor = this.color;
  static areaColor = this.color;
  static conversion = true;
  static random(...args) {
    throw "Figure: Static function not implemented."
  }
}
