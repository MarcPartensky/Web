class Player {
  static random(name="unnamed", n=1) {
    let balls = [];
    for (let i=0; i<n; i++) {
      balls.push(Ball.random());
    }
    return new this(name, balls);
  }
  constructor(name, balls) {
    this.name = name;
    this.balls = balls;
  }
  show(context) {
    this.balls.forEach(b => b.show(context));
  }
  update(dt) {
    this.balls.forEach(b => b.update(dt));
  }
}