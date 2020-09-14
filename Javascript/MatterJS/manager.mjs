import ContextAdapter from 'context.js';
import Vector from 'vector.js';


export default class Manager {
  static zoomDelta = 0.1;
  static scrollZoomFactor = 0.5;
  static entities = [];
  static movement = {up: false, down: false, right: false, left: false, zoomin: false, zoomout: false};
  static backgroundColor = "#000000";

  addEventListeners() {
    window.addEventListener("mousemove", this.onMouseMotion.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("mousewheel", this.onScroll.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
  }
  deactivate() {
    // prevent default actions from space and arrow keys
    window.addEventListener("keydown", function(e) {
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
    }, false);
  }
 resize() {
    this.canvas.width = this.context.width = window.innerWidth;
    this.canvas.height = this.context.height = window.innerHeight;
  }
  onKeyDown(evt) {
    switch(evt.keyCode){
      case 39: // Arrow Right for moving right
        this.movement.right = true;
        break;
      case 37: // Arrow Left for moving left
        this.movement.left = true;
        break;
      case 40: // Arrow Up for moving up
        this.movement.up = true;
        break;
      case 38: // Arrow Down for moving down
        this.movement.down = true;
        break;
      case 16: // Left and Right shift for zooming in and out
        if (evt.location == 1) {
          this.movement.zoomout = true;
        } else {
          this.movement.zoomin = true;
        }
        break;
      case 18: // Alt for pause
        if (this.game.dt) {
          this.game.dt = 0;
        } else {
          this.game.dt = Game.dt;
        }
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
  onScroll(evt) {
    if (evt.wheelDeltaY>0) {
        this.context.plane.units[0].irmul(1+Manager.scrollZoomFactor*Manager.zoomDelta);
    } else {
        this.context.plane.units[0].irmul(1-Manager.scrollZoomFactor*Manager.zoomDelta);
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
      this.context.plane.units[0].irmul(1+Manager.zoomDelta);
    }
    if (this.movement.zoomout) {
      this.context.plane.units[0].irmul(1-Manager.zoomDelta);
    }
  }
  loop() {
    this.update();
    this.show();
    // requestAnimationFrame(this.loop.bind(this));
  }
  start() {
    this.addEventListeners();
  }
  main() {
    this.start();
    setInterval(this.loop.bind(this), 100);
  }
}

