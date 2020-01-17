class Map {
  static foods_number;
  constructor(rect = [0, 0, 1, 1], foods=[], border_color="#ffffff") {
    this.rect = rect;
    this.foods = foods;
    this.border_color = border_color;
  }
  show(context) {
    this.foods.map(f => f.show(context));
    this.showBorders(context);
  }
  showBorders(context) {
    context.strokeStyle = this.border_color;
    let [x, y, w, h] = this.rect;
    context.strokeRect(x, y, w, h);
  }
  update(dt=1) {
    this.spawnFoods(Map.foods_number-this.foods.length);
  }
  spawnFoods(n) {
    for (let i=0; i<n; i++) {
      this.foods.push(Food.random());
    }
  }
}
