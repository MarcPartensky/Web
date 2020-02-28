class Game extends Manager {
  static dt = 0.1;
  static font = "Arial";

  /* Only for test purposes. */
  static random(canvas, n=10, dt=this.dt, font=this.font) {
    let entities = [["group", UpperBallGroup.random(n)], ["map", new Map()]];
    return this.from(canvas, entities, dt, font);
  }
  static from(
    canvas,
    entities=[["group", new UpperBallGroup()], ["map", new Map()]],
    dt=this.dt,
    font=this.font
  ) {
    let g = super.from(canvas, entities, dt=dt);
    g.context.textFont = font;
    return g;
  }
  update() {
    super.update();
    this.updateGroup();
    // this.map.update(this.dt);
    this.context.plane.location.position = this.get("group")[0].position;
  }
  updateGroup() {
    this.get("group").forEach(function(group) {
      group.follow(this.context.fromScreen(this.mouse));
      group.limit(this.get("map").vmin, this.get("map").vmax);
    }.bind(this));
  }
  show() {
    this.clear();
    super.show();
  }
  find(name) {
    return 
  }

}
