class Game {
  static dt = 0.1;
  static font = "Arial";
  static index = 0;
  static maps = [];
  static precision = 5;
  static random() {
    return new this([GameMap.random()]);
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
  update(dt) {
    this.map.update(dt);
  }
  show(context) {
    this.map.show(context);
  }
  getStream() {
    let stream = [];
    let playerStream;
    for (const [id, player] of this.map.group.players) {
      playerStream = id + " ";
      for (const ball of player.balls) {
        playerStream += String(ball.position.round(this.precision));
        playerStream += + " ";
        playerStream += String(ball.radius).slice(0, this.precision);
      }
      stream.push(playerStream);
    }
    return stream.join("|");
  }
}