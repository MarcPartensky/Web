class Food extends BaseCircle {
  static radius = 5;
  static random() {
    return new this(Vector.random());
  }
  constructor(
    position=Vector.zero2D,
    radius=Food.radius,
    color=Color.random()
  ) {
    super(radius);
    this.position = position;
    this.color = color;
  }
  show(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(...this.position, this.radius, 0, 2*Math.PI);
    context.fill();
    context.closePath();
  }
}


class FoodGroup extends BaseCircleGroup {
  static random(n) {
    const map = new Map();
    for (let i=0; i<n; i+=1) {
      map.set(String(i), Food.random())
    }
    return new this(map);
  }
  constructor(map = new Map()) {
    this.map = map;
  }
  show(context) {
    this.map.forEach(f => f.show(context));
  }
  update(dt) {
    this.map.forEach(f => f.update(dt))
  }
}
