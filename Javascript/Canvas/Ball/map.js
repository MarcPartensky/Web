class Map {
  static foodNumber = 100;
  static borderColor = "#ffffff";
  static lineWidth = 1;
  static rect = [-500,-500, 1000, 1000]
  constructor(rect = Map.rect, food=[], foodNumber=Map.foodNumber, lineWidth=Map.lineWidth, borderColor=Map.borderColor) {
    this.rect = rect;
    this.food = food;
    this.foodNumber = foodNumber;
    this.lineWidth = lineWidth;
    this.borderColor = borderColor;
  }
  get vmin() {
    return new Vector(this.rect[0], this.rect[1]);
  }
  get vmax() {
    return new Vector(this.rect[0]+this.rect[2], this.rect[1]+this.rect[3]);
  }
  show(context) {
    this.food.map(food => food.show(context));
    this.showBorders(context);
  }
  showBorders(context) {
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.borderColor;
    context.strokeRect(...this.rect);
  }
  update(dt=1) {
    this.spawnFood(this.foodNumber-this.food.length);
  }
  spawnFood(n) {
    for (let i=0; i<n; i++) {
      this.food.push(Food.random());
    }
  }
}
