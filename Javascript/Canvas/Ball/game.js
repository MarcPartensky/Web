class Game {
  constructor(map=new Map(), players=[]) {
    this.map = map;
    this.players = players;
  }
  show(context) {
    this.map.show(context);
    this.players.map(p => p.show(context));
  }
}
