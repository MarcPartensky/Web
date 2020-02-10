class Matrix extends Tensor {
  /*
  * A matrix can be built from a 2d array, a list of vectors
  */
  static get order() {return 2}; /* Fancy way of declaring a static constant. */
  static w = 1;
  static h = 1;
  static format = [Matrix.w, Matrix.h];

  static random(w=Matrix.w, h=Matrix.h) {
    return new Matrix(...Tensor.convert(Tensor.random(w,h), Vector));
  }
  // constructor(...array) {
  //   Array.prototype.constructor(...Matrix.convert(...array));
  // }
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
  str() {
    let m = this.slice();
    for (let x=0; x<this.width; x++) {
      m[x] = m[x].join(" ");
    }
    return m.join("\n");
  }
  slice() {
    return new Matrix(...super.slice());
  }
  dot(matrix) {
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
  idot(matrix) {
    this.set(this.dot(matrix));
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
  imul(matrix) {
    return this.set(this.mul(matrix));
  }
  vmul(vector) {
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

class SquareMatrix extends Matrix {
  static length = 1;
  static random(length=Matrix.length) {
    let m = new SquareMatrix(...Matrix.fromFormat(length, length));
    for (let x=0; x<length; x++) {
      for (let y=0; y<length; y++) {
        m[x][y] = Math.random();
      }
    }
    return m;
  }
  constructor(...vectors) {
    if (Math.max(...vectors.map(v => v.length)) != Math.min(...vectors.map(v => v.length))) {
      throw "The vectors must have the same length.";
    }
    super(...vectors);
  }
  get det() {
    const n = this.length;
    let v = 0;
    for (let i=0; i<n; i++) {
      let p1 = 1;
      let p2 = 1;
      for (let j=0; j<n; j++) {
        console.log()
        p1 *= this[(i+j)%n][j];
        p2 *= this[(i-j+n)%n][j];
      }
      v += (p1-p2);
    }
    return v;
  }
}

/*
node
.load tensor.js
.load matrix.js
m = new SquareMatrix([1, 2], [3, 4]);

*/
