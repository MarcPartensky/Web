class Game {
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.map = new Map(this.engine);
  }
}
