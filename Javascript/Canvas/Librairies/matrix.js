class Matrix extends Array {
  /*
  * A matrix can be built from a 2d array, a list of vectors
  */
  static format = [2,2];
  static random(format=Matrix.format) {
    let [w, h] = format;
    let m = Matrix.fromFormat(format);
    for (let x=0; x<w; x++) {
      for (let y=0; y<h; y++) {
        m[x][y] = Math.random();
      }
    }
    return m;
  }
  static fromFormat(...format) {
    if (format[0] instanceof Array) {
      format = format[0];
    }
    let [width, height] = format;
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
    return this.length;
  }
  get height() {
    return this[0].length;
  }
  get format() {
    return [this.width, this.height];
  }
  get vectors() {
    let vs = [];
    for (const a of this) {
      vs.append(Vector(...a));
    }
    return vs;
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
  dot() {
    let d = this.width;
    let h = this.height;
    let w = matrix.width;
    let m = Matrix.fromFormat(w, h);
    for (let x=0; x<w; x++) {
      for (let y=0; y<h; y++) {
        m[x][y] = this[x][y]*matrix[x][y];
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
        m[x][y] = 0;
        for (let z=0; z<d; z++) {
          m[x][y] += this[z][y]*matrix[x][z];
        }
      }
    }
    return m;
  }
  mulvec(vector) {
    let w = this.width;
    let h = this.height;
    let a = Array(h);
    for (let y=0; y<h; y++) {
      a[y] = 0;
      for (let x=0; x<w; x++) {
        a[y] += this[x][y] * vector[x];
      }
    }
    return new Vector(...a);
  }
}
