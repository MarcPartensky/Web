/*

*/
class Figure extends Matrix {
  static lineWidth = 1;
  static color = "#ffffff";
  constructor(...points) {
    super(...points);
    this.lineWidth = super.lineWidth;
    this.color = super.color;
  }
}
