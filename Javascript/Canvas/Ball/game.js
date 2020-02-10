class Game extends Manager {
  constructor(canvas, dt=0.1, map=new Map(), players=[]) {
    super(canvas, dt=dt);
    this.map = map;
    this.players = players;
  }
  update() {
    super.update();
    this.players.map(function(player) {
      player.update(this.dt);
      player.follow(this.context.fromScreen(this.mouse));
      player.motion[0].limit(
        this.map.vmin.radd(player.radius), 
        this.map.vmax.rsub(player.radius)
      );
    }.bind(this));
    this.map.update(this.dt);
    game.context.plane.location.position = game.players[0].position;
  }
  updatePlayers() {
    for(let i=0; i<this.players.length; i++) {

    }
  }
  show() {
    this.clear();
    this.map.show(this.context);
    this.players.map(player => player.show(this.context));
    this.context.fillText("slt", 0, 0);
  }
}
