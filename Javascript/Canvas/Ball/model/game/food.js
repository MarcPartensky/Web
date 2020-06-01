class Food extends BaseCircle {
  static radius = 2;
  static random() {
    return new this(Vector.random().rsub(0.5).rmul(GameMap.size));
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
  static number = 300;
  static random(n=FoodGroup.number) {
    const map = new Map();
    for (let i=0; i<n; i+=1) {
      map.set("Food:"+String(i), Food.random());
    }
    return new this(map);
  }
  show(context) {
    this.map.forEach(f => f.show(context));
  }
  update(dt) {
    this.map.forEach(f => f.update(dt))
  }
}
