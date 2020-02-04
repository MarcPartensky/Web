class Game extends Manager {
  constructor(canvas, dt=0.1, map=new Map(), players=[]) {
    super(canvas, dt=dt);
    this.map = map;
    this.players = players;
  }
  show() {
    this.clear();
    this.map.show(this.context);
    this.players.map(player => player.show(this.context));
  }
}
