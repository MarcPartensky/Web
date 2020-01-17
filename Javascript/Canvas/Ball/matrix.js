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
    let h = vectors.length
    return new Matrix(array);
  }
  get width() {
    return this.array.length;
  }
  get height() {
    return this.array[0].length;
  }
  get format() {
    return [this.width, this.height;
  }
  constructor(args) {
    this.array = Array(...args);
  }
  dot() {

  }
  mul(matrix) {
    let w = this.width;
    let d = this.height;
    let h = matrix.height;
    let m = new Matrix.fromFormat(w, h);
    for (let x=0; x<w; x++) {
      for (let y=0; y<h; y++) {
        m.array[x][y] = 0;
        for (let z=0; z<d) {
          m.array[x][y] += matrix.array[x][z]*this.array[z][y];
        }
      }
    }
    return m;
  }
}