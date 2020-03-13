class Game {
  static dt = 0.1;
  static font = "Arial";
  static index = 0;
  static maps = [];
  static precision = 5;
  static random(n=10) {
    return new this([GameMap.random(n)]);
  }
  constructor(
    maps=Game.maps,
    dt=Game.dt,
    font=Game.font,
    index=Game.index,
    open=Game.open,
    precision=Game.precision
  ) {
    this.maps = maps;
    this.dt = dt;
    this.font = font;
    this.index = index;
    this.open = open;
    this.map = this.maps[this.index];
    this.precision = precision;
  }
  updateMap() {
    this.map = this.maps[this.index];
  }
  update() {
    this.map.update(this.dt);
  }
  show(context) {
    this.map.show(context);
  }
  getStream() {
    return JSON.stringify(Array.from(this.map.group.players));
  }
  setStream(stream) {
    let balls;
    let position, velocity;
    let motion;
    let direction;
    this.map.group.players = new Map();
    const players = new Map(JSON.parse(stream));
    for (const [id, player] of players) {
      balls = [];
      for (const ball of player.balls) {
        position = Vector.from(ball.motion[0]);
        velocity = Vector.from(ball.motion[1]);
        motion = new Motion(position, velocity);
        balls.push(new Ball(motion, Math.PI * ball.radius**2));
      }
      direction = Vector.from(player.direction);
      this.map.group.players.set(
        id, 
        new Player(player.name, player.color, balls, direction));
    }
  }
}