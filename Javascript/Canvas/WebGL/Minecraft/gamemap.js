// var canvas = document.getElementById("canvas");
// var engine = new BABYLON.Engine(canvas, true);

class Map {
  static n=0;
  static createGrid(width, height, depth) {
    let a = new Array(width);
    for (let x=0; x<width; x++) {
      let b = Array(height);
      for (let y=0; y<height; y++) {
        let c = Array(depth);
        b[y] = c;
      }
      a[x] = b;
    }
    return a;
  }
  static createScene(engine) {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.9,0.9,0.9);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;
    return scene;
  }
  constructor(engine) {
    this.scene = Map.createScene(engine);
    this.grid = Map.createGrid(10, 10, 10);
    this.load(10, 10, 10);
  }

  load(width, height, depth) {
    for (let x=0; x<width; x++) {
      for (let y=0; y<height; y++) {
        for (let z=0; z<depth; z++) {
          this.grid[x][y][z] = this.getBox(x, y, z, this.scene);
        }
      }
    }
  }

  getBox(x, y, z, scene) {
    noise.perlin3()
    Map.n+=1;
    var box = BABYLON.Mesh.CreateBox("box"+Map.n, 3, scene);
    box.position = new BABYLON.Vector3(x, y, z);
    return box;
  }
}
