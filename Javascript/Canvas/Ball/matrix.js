class Matrix {
  /*
  * A matrix can be built from a 2d array, a list of vectors
  */
  static fromFormat(width, height, value=undefined) {
    let array = new Array(width);
    for (let x=0; x<width; x++) {
      array[x] = new Array(height);
    }
    return new Matrix(array);
  }
  static fromVectors( ...vectors) {
    let x = Math.max(vectors.map());
    let h = vectors.length;
    return new Matrix(array);
  }
  get width() {
    return this.array.length;
  }
  get height() {
    return this.array[0].length;
  }
  get format() {
    return [this.width, this.height];
  }
  constructor(args) {
    this.array = Array(...args);
  }
  map(f) {
    return this.array.map(f);
  }
  str() {
    let m = this.slice();
    for (let x=0; x<this.width; x++) {
      m[x] = m.array[x].join(" ");
    }
    return m.array.join("\n");
  }
  slice() {
    return new Matrix(this.array.slice());
  }
  dot() {    let d = this.width;
      let h = this.height;
      let w = matrix.width;
      let m = Matrix.fromFormat(w, h);
      for (let x=0; x<w; x++) {
        for (let y=0; y<h; y++) {
          m.array[x][y] = this.array[x][y]*matrix.array[x][y];
        }
      }
      return m;
  }
  mul(matrix) {
    let d = this.width;
    let h = this.height;
    let w = matrix.width;
    let m = Matrix.fromFormat(w, h);
    for (let x=0; x<w; x++) {
      for (let y=0; y<h; y++) {
        m.array[x][y] = 0;
        for (let z=0; z<d; z++) {
          m.array[x][y] += this.array[z][y]*matrix.array[x][z];
        }
      }
    }
    return m;
  }
}
