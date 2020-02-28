class Game {
  static dt = 0.1;
  static font = "Arial";
  static index = 0;
  static maps = [];
  static random() {
    return new this();
  }
  constructor(
    maps=Game.maps,
    dt=Game.dt,
    font=Game.font,
    index=Game.index,
    open=Game.open
  ) {
    this.maps = maps;
    this.dt = dt;
    this.font = font;
    this.index = index;
    this.open = open;
    this.map = this.maps[this.index];
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
}