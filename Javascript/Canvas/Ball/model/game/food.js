class Food extends BaseCircle {
  static radius = 5;
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
  get matrix() {
    return this.map(f => [f.position]);
  }
  get fullMatrix()
}
