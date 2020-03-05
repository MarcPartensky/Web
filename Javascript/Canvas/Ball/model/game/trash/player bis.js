class Player extends Body {
  static mass = 10;
  static view = 5;
  static alive = false;
  static lineWidth = 2;
  static minSpeed = 0.1;
  static maxSpeed = 10;
  /*
  * Creates a random player.
  */
  static random() {
    return new Player(new Motion(Vector.random(2).radd(-1/2).rmul(10), Vector.random(2).radd(-1/2), Vector.random(2).radd(-1/2)));
  }
  constructor(
    motion, 
    mass=Player.mass, 
    alive=Player.alive, 
    lineWidth=Player.lineWidth, 
    color=Color.random(),
    minSpeed = Player.minSpeed,
    maxSpeed = Player.maxSpeed) {
    super(motion);
    this.mass = mass;
    this.alive = alive;
    this.lineWidth = lineWidth;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.color = color;
  }
  get radius() {
    return this.mass**0.5;
  }
  spawn(position) {
    this.position = position;
    this.alive = true;
  }
  spawnRandom(borns) {
    [bx, by] = borns;
    var x = parseInt(bx*Math.random());
    var y = parseInt(by*Math.random());
    this.spawn([x, y]);
  }
  setView(context) {
    context.plane.position = this.position;
    context.plane.units = Player.view*this.radius;
  }
  show(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.fill();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = Color.darken(this.color);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.stroke();
  }
  follow(vector) {
    let norm = vector.sub(this.position).norm/this.radius;
    if (norm<1) {
      norm = 0;
    } else if (norm > 10) {
      norm = 10;
    }
    let angle = vector.sub(this.position).angle;
    this.motion.velocity = Vector.polar(norm, angle);
  }
  update(dt) {
    this.motion.update(dt);
  }
}
