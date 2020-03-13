class GameMap {
  static size = 1000;
  static lineWidth = 1;
  static borderColor = "#ffffff";
  static random(n=0) {
    let group = GameGroup.random(n);
    return new this(group);
  }
  constructor(group=new GameGroup(), size=GameMap.size, lineWidth=GameMap.lineWidth, borderColor=Map.borderColor) {
    this.group = group;
    this.size = size;
    this.lineWidth = lineWidth;
    this.borderColor = borderColor;
    this.updateSize();
  }
  show(context) {
    this.group.show(context);
    this.showBorders(context);
  }
  showBorders(context) {
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.borderColor;
    context.strokeRect(...this.vmin, ...this.vsize);
  }
  update(dt) {
    this.group.update(dt);
  }
  updateSize() {
    this.vmin = this.getVmin();
    this.vmax = this.getVmax();
    this.vsize = this.getVsize();
  }
  getVmin() {
    return new Vector(-this.size/2, -this.size/2);
  }
  getVmax() {
    return new Vector(this.size/2, this.size/2);
  }
  getVsize() {
    return new Vector(this.size, this.size);
  }
}