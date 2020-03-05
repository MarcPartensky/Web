class Manager extends Map {
  static entities = [];
  static dt = 0.1;
  static movement = {up: false, down: false, right: false, left: false, zoomin: false, zoomout: false};
  static backgroundColor = "#000000";

  static addEventListeners(manager) {
    window.addEventListener("keydown", evt => manager.onKeyDown(evt));
    window.addEventListener("keyup", evt => manager.onKeyUp(evt));
    window.addEventListener("mousemove", evt => manager.onMouseMotion(evt));
  }
  static deactivate() {
    // prevent default actions from space and arrow keys
    window.addEventListener("keydown", function(e) {
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
    }, false);
  }
  static from(
    canvas,
    entities=this.entities,
    dt=this.dt,
    movement=this.movement,
    backgroundColor=this.backgroundColor
  ) {
    let m = new this(entities)
    m.canvas = canvas;
    m.context = new ContextAdapter(m.canvas.getContext("2d"));
    m.dt = dt;
    m.movement = movement;
    m.backgroundColor = backgroundColor;
    m.mouse = new Vector(0, 0);
    m.resize();
    return m
  }
  clear() {
    this.context.fillStyle = this.backgroundColor;
    this.context.clear();
  }
  show() {
    for (const [k,v] of this) {
      v.show(this.context);
    }
    // this.forEach((v,k,m) => v.show(this.context));
  }
  update() {
    this.context.plane.location.update();
    this.context.plane.units.update();
    this.move();
    for (const [k,v] of this) {
      this.set(k, v);
      v.update(this.dt);
      // console.log(v.position);
    }
    // this.forEach((v,k,m) => v.update(this.dt));
    // for (const v of this.values())
  }
  resize() {
    this.canvas.width = this.context.width = window.innerWidth;
    this.canvas.height = this.context.height = window.innerHeight;
  }
  onKeyDown(evt) {
    switch(evt.keyCode){
      case 39: // Arrow Right
        this.movement.right = true;
        break;
      case 37: // Arrow Left
        this.movement.left = true;
        break;
      case 40: // Arrow Up
        this.movement.up = true;
        break;
      case 38: // Arrow Down
        this.movement.down = true;
        break;
      case 16: // Left and Right shift
        if (evt.location == 1) {
          this.movement.zoomout = true;
        } else {
          this.movement.zoomin = true;
        }
        break;
      }
  }
  onKeyUp(evt) {
    switch(evt.keyCode) {
      case 39: // Arrow Right
        this.movement.right = false;
        break;
      case 37: // Arrow Left
        this.movement.left = false;
        break;
      case 40: // Arrow Up
        this.movement.up = false;
        break;
      case 38: // Arrow Down
        this.movement.down = false;
        break;
      case 16:
        if (evt.location == 1) {
          this.movement.zoomout = false;
        } else {
          this.movement.zoomin = false;
        }
        break;
      }
  }
  onMouseMotion(evt) {
    this.mouse = new Vector(evt.x, evt.y);
  }

  move() {
    if (this.movement.up) {
      this.context.plane.y += this.context.plane.speed/this.context.plane.ux;
    }
    if (this.movement.down) {
      this.context.plane.y -= this.context.plane.speed/this.context.plane.uy;
    }
    if (this.movement.left) {
      this.context.plane.x -= this.context.plane.speed/this.context.plane.ux;
    }
    if (this.movement.right) {
      this.context.plane.x += this.context.plane.speed/this.context.plane.uy;
    }
    if (this.movement.zoomin) {
      this.context.plane.units[0].irmul(1.1);
    }
    if (this.movement.zoomout) {
      this.context.plane.units[0].irmul(0.9);
    }
  }
  loop() {
    this.update();
    this.show();
    requestAnimationFrame(this.loop.bind(this));
  }
  main() {
    this.loop();
  }
}

