class Map {
  static foods_number;
  constructor(rect = [0, 0, 1, 1], foods=[], borderColor="#ffffff") {
    this.rect = rect;
    this.foods = foods;
    this.borderColor = borderColor;
  }
  show(context) {
    this.foods.map(food => food.show(context));
    this.showBorders(context);
  }
  showBorders(context) {
    context.strokeStyle = this.borderColor;
    context.strokeRect(...this.rect);
  }
  update(dt=1) {
    this.spawnFoods(Map.foodsNumber-this.foods.length);
  }
  spawnFoods(n) {
    for (let i=0; i<n; i++) {
      this.foods.push(Food.random());
    }
  }
}
