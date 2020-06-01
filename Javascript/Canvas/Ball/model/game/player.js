class Player {
  static refreshing = false;
  static alive = true;
  static random(name="unnamed", color=Color.random(), n=1) {
    return new this(name, color, BallGroup.random(n));
  }
  constructor(
    name,
    color=Color.random(),
    ballGroup=new BallGroup(new Map([["Ball:0", Ball.random()]])),
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
  get mass() {
    return this.ballGroup.mass;
  }
  show(context) {
    this.ballGroup.show(context, this.name, this.color);
  }
  update(dt) { // lazy way to do it.
    this.ballGroup.update(dt);
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
    this.alive = (this.ballGroup.map.size > 0);
  }
  updatePosition() {
    if (this.ballGroup.map.size!=0) {
      let position = this.ballGroup.position;
      if (position) {
        this.position = position;
      }
    }
  }
  follow(position) {
    for (const b of this.ballGroup.map.values()) {
      b.follow(position);
    }
  }
  split(position) {
    position.norm = Math.max(position.norm, 1);
    const splits = [];
    let i = 0;
    for (const ball of this.ballGroup.map.values()) {
      while (this.ballGroup.map.has("Ball:"+String(i)) && i<BallGroup.maxNumber) {
        i+=1;
      }
      splits.push([i,ball]);
    }
    for (const [i,ball] of splits) {
      if (ball.mass>=2*Ball.mass) {
        this.ballGroup.map.set("Ball:"+String(i), ball.split(position));
      }
    }
  }
  spawn() {
    this.ballGroup.map.set("Ball:"+String(0), Ball.random());
  }
  clear() {
    this.ballGroup.clear();
  }
  sort(f) {
    this.ballGroup.sort(f);
  }
}

class PlayerGroup {
  static random(n) {
    const map  = new Map();
    for (let i=0; i<n; i+=1) {
      map.set("Player:"+String(i), Player.random());
    }
    return new this(map);
  }
  constructor(map) {
    this.map = map;
  }
  show(context) {
    this.map.forEach(p => p.show(context));
  }
  update(dt) {
    this.map.forEach(p => p.update(dt));
  }
  get mass() {
    return this.map.reduce(p => p.mass);
  }
}