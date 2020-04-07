class Player {
  static maxBalls = 2**4;
  static refreshing = false;
  static alive = true;
  static random(name="unnamed", color=Color.random(), n=1) {
    return new this(name, color, BallGroup.random(n));
  }
  constructor(
    name,
    color=Color.random(),
    ballGroup=new BallGroup(),
    direction=Vector.zero2D,
    position=Vector.zero2D,
    refreshing = Player.refreshing,
    alive = Player.alive,
  ) {
    this.name = name;
    this.color = color;
    this.ballGroup = ballGroup;
    this.direction = direction;
    this.position = position;
    this.refreshing = refreshing;
    this.alive = alive;
  }
  show(context) {
    this.ballGroup.forEach(b => b.show(context, this.name, this.color));
  }
  update(dt) { // lazy way to do it.
    this.ballGroup.forEach(b => b.update(dt));
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
    this.alive = (this.ballGroup.map.length > 0);
  }
  updatePosition() {
    if (this.ballGroup.length!=0) {
      let position = this.ballGroup.position;
      if (position) {
        this.position = position;
      }
    }
  }
  follow(position) {
    this.ballGroup.map.forEach(b => b.follow(position));
  }
  split(position) {
    position.norm = Math.max(position.norm, 1);
    let balls = [];
    let i = 0;
    for (const ball of this.ballGroup.values()) {
      if (this.ballGroup.map.length < Player.maxBalls) {
        balls.set(ball.split(position));
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

class PlayerGroup {
  static random(n) {
    const map  = new Map();
    for (let i=0; i<n; i+=1) {
      map.set("player"+String(i), Player.random());
    }
    return new this(map);
  }
  constructor(map) {
    this.map = map;
  }
  show(context) {
    this.map.forEach(p => p.show(context));
  }
  update(context) {
    console.log(this);
    this.map.forEach(p => p.update(context));
  }
  collide() {
    this.collider.handle(this.map);
  }
}