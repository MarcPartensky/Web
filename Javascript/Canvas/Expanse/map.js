class Map extends Array {
  /*
  * Extending array for syntax simplicity.
  */
  /*
  * Create an empty map using its width and height.
  */
  constructor(width, height) {
    super(width);
    for (let x=0; x<width; x++) {
      this[x] = Array(height);
    }
  }
  get width() {
    return this.length;
  }
  get height() {
    return this[0].length;
  }
  /*
  * Generate the map using perlin noise generation.
  */
  generate() {
    for (let x=0; x<this.width; x++) {
      for (let y=0; y<this.height; y++) {
        this[x][y] = this.create(x, y);
      }
    }
  }
  /*
  * Create a case at a given position.
  */
  create(x, y) {
    let f = 1/10;
    let k = 255;
    let a = parseInt(k*(noise.perlin2(f*x, f*y)+1)/2);
    let v = new Vector(a, a, a);
    let c = Color.fromVector(v);
    return new Case(c);
  }
  /*
  * Show the map.
  */
  show(context) {
    for (let x=0; x<this.width; x++) {
      for (let y=0; y<this.height; y++) {
        this[x][y].show(context, x, y);
      }
    }
  }
}
