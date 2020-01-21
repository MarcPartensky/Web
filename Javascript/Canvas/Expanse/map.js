class Map extends Array{
  /*
  * Extending array for syntax simplicity.
  */
  /*
  * Create an empty map using its width and height.
  */
  constructor(width, height) {
    for (let x=0; x<width; x++) {
      this.push(Array(height));
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
    let k = 100;
    let a = parseInt(k*(noise.perlin2(x, y)+1)/2);
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
        this[x][y].show(context)
      }
    }
  }
}
