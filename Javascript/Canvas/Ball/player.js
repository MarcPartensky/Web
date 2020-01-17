class Player {
  mass = 10;
  position = [0,0];
  view_factor = 5;
  /*
  * Creates a random player.
  */
  static random() {
    let position = Vector.random();
    return new Player(position);
  }
  constructor(position, mass=Player.mass, color=Color.random(), alive=false) {
    this.position = position;
    this.mass = mass;
    this.alive = alive;
    this.color = color;
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
    var [x, y] = this.position.components;
    context.arc(x, y, this.radius, 0, 2*Math.PI);
    context.fill();
  }
  follow
}
