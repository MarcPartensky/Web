class Player extends Body {
  static mass = 10;
  static position = [0,0];
  static view_factor = 5;
  static alive = false;
  /*
  * Creates a random player.
  */
  static random() {
    return new Player(Vector.random());
  }
  constructor(motion, mass, color, alive) {
    super(motion);
    this.mass = mass || super.mass;
    this.alive = alive || super.alive;
    this.color = color || Color.random();
  }
  get radius() {
    return this.mass**2;
  }
  spawn(position) {
    this.position = Vector.random();
    this.mass = Player.mass;
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
    context.plane.units = Player.view_factor*this.radius;
  }
  show(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.fill();
  }
  follow(positoin) {

  }
}
