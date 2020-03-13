class Player {
  static splitLimit = 2**4;
  static refreshing = false;
  static alive = true;
  static random(name="unnamed", color=Color.random(), n=1) {
    let balls = [];
    for (let i=0; i<n; i++) {
      balls.push(Ball.random());
    }
    return new this(name, color, balls);
  }
  constructor(
    name,
    color=Color.random(),
    balls=[],
    direction=Vector.zero2D,
    position=Vector.zero2D,
    refreshing = Player.refreshing,
    alive = Player.alive,
  ) {
    this.name = name;
    this.color = color;
    this.balls = balls;
    this.direction = direction;
    this.position = position;
    this.refreshing = refreshing;
    this.alive = alive;
  }
  show(context) {
    this.balls.forEach(b => b.show(context, this.name, this.color));
  }
  update(dt) { // lazy way to do it.
    this.balls.forEach(b => b.update(dt));
    this.follow(this.direction);
    this.updatePosition();
    this.refreshing = true;
    if (this.refreshing) {
      this.clear();
      this.sort();
      this.updateAlive();
      this.refreshing = false;
    }
  }
  updateAlive() {
    this.alive = (this.balls.length > 0);
  }
  updatePosition() {
    if (this.balls.length!=0) {
      let position = Vector.average(...this.balls.map(b => b.position));
      if (position) {
        this.position = position;
      }
    }
  }
  follow(position) {
    this.balls.forEach(b => b.follow(position));
  }
  split(position) {
    position.norm = Math.max(position.norm, 1);
    let balls = [];
    for (const ball of this.balls) {
      if (this.balls.length < Player.splitLimit) {
        balls.push(ball.split(position));
      }
    }
    this.balls.push(...balls);
  }
  spawn(vmin, vmax) {
    this.balls = [Ball.random(vmin, vmax)];
  }
  clear() {
    this.balls = this.balls.filter(b => b.mass>0);
  }
  sort() {
    this.balls.sort(b => b.mass);
  }
}