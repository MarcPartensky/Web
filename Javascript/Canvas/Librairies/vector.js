class Vector extends Tensor {
  static dim = 2;
  static color = "#ffffff";
  static norm = 2;
  static distance(v1, v2) {
    return (v1.sub(v2)).norm;
  }
  static copy(vector) {
    return new Vector(...vector);
  }
  static empty(n=0) {
    return new Vector(...Array(n));
  }
  static get zero() {
    return Vector.fill(0);
  }
  static get one() {
    return Vector.fill(1);
  }
  static get zero2D() {
    return new Vector(0, 0);
  }
  static get zero3D() {
    return new Vector(0, 0, 0);
  }
  static random(dim = this.dim) {
    let v = new Vector(dim);
    for (let i = 0; i < dim; i++) {
      v[i] = Math.random();
    }
    return v;
  }
  static randoms(n, dim = this.dim) {
    let vs = [];
    for (let i = 0; i < n; i++) {
      vs.push(Vector.random());
    }
    return vs;
  }
  static polar(norm, angle) {
    let x = norm * Math.cos(angle);
    let y = norm * Math.sin(angle);
    return new Vector(x, y);
  }
  static fill(value, dim = this.dim) {
    let v = new Vector(dim);
    for (let i = 0; i < dim; i++) {
      v[i] = value;
    }
    return v;
  }
  static adapt(...vectors) {
    let dim = Math.max(...vectors.map(v => v.dim));
    for (let i = 0; i < vectors.length; i++) {
      vectors[i].push(...Array(dim - vectors[i].dim).fill(0));
    }
  }
  static sum(...vectors) {
    Vector.adapt(...vectors);
    let v = new Vector(vectors[0].dim);
    v.fill(0);
    for (const vi of vectors) {
      v.iadd(vi);
    }
    return v;
  }
  static average(...vectors) {
    return Vector.sum(...vectors).div(vectors.length);
  }
  // constructor(...components) {
  //   super(...components);
  // }
  get x() {
    return this[0];
  }
  set x(value) {
    this[0] = value;
  }
  get y() {
    return this[1];
  }
  set y(value) {
    this[1] = value;
  }
  get z() {
    return this[2];
  }
  set z(value) {
    this[2] = value;
  }
  get norm() {
    return (this.map(x => x ** Vector.norm).reduce((x, y) => x + y))**(1/Vector.norm);
  }
  set norm(value) {
    this.irmul(value/this.norm);
  }
  get angle() {
    return Math.atan2(this.y,this.x);
  }
  set angle(value) {
    this.x = this.norm*Math.cos(value);
    this.y = this.norm*Math.sin(value);
  }
  get components() {
    return Array(...this);
  }
  set components(values) {
    for (let i = 0; i < Math.max(this.length, values.length); i++) {
      this[i] = values[i];
    }
  }
  get dim() {
    return this.length;
  }
  set dim(value) {
    throw "The dimension cannot be changed directly, however you can change it by setting new components."
  }
  get inv() {
    return this.map(x => 1 / x);
  }
  get unit() {
    let m = Math.max(...this);
    return this.map(x => x / m);
  }
  towards(vector) {
    return Vector.polar(this.norm, vector.sub(this).angle);
  }
  itowards(vector) {
    this.angle = vector.sub(this).angle;
  }
  rotate(angle) {
    this.angle += angle;
  }
  equals(vector) {
    for (let i = 0; i < Math.max(vector.dim, this.dim); i++) {
      if (this[i] != vector[i]) {
        return false;
      }
    }
    return true;
  }
  colinear(vector, error = 10 ** -10) {
    return this.mul(vector).norm < error;
  }
  fill(value) {
    for (let i = 0; i < this.dim; i++) {
      this[i] = value;
    }
  }
  map(f) {
    return new Vector(...super.map(f));
  }
  imap(f) {
    for (let i = 0; i < this.dim; i++) {
      this[i] = f(this[i]);
    }
  }
  slice(a, b) {
    return new Vector(...this.slice(a, b));
  }
  map2(vector, f) {
    let m = Math.max(this.dim, vector.dim);
    let v = Vector.empty(m);
    for (let i = 0; i < m; i++) {
      v[i] = (f(this[i], vector[i]));
    }
    return v;
  }
  imap2(vector, f) {
    let m = Math.max(this.dim, vector.dim);
    for (let i = 0; i < m; i++) {
      this[i] = (f(this[i], vector[i]));
    }
  }
  adapt(n) {
    let v = Vector.copy(this);
    if (n>this.length) {
      for (let i=0; i<n-this.length; i++) {
        v.push(0);
      }
    } else {
      for (let i=0; i<this.length-n; i++) {
        delete v[v.length-1];
      }
    }
    return v;
  }
  prod(vector) {
    // Vectorial product
    throw "Not implemented error";
  }
  div(k) {
    return this.rmul(1 / k);
  }
  idiv(k) {
    this.imul(1 / k);
  }
  ifloor() {
    this.imap(Math.floor);
  }
  floor() {
    return this.map(Math.floor);
  }
  limit(vmin, vmax) {
    let m = Math.max(this.length, vmin.length, vmax.length);
    for (let i=0; i<m; i++) {
      this[i] = Math.max(this[i], vmin[i]);
      this[i] = Math.min(this[i], vmax[i]);
    }
  }
  show(context, position = Vector.fill(0, this.dim)) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(...position.components);
    context.lineTo(...this.components);
    context.stroke();
    context.closePath();
  }
  closest(vectors) {
    let a = Infinity;
    let b, v;
    for (const vi of vectors) {
      b = this.sub(vi).norm;
      if (a > b) {
        v = vi;
        a = b;
      }
    }
    return v;
  }
  closestIndex(vectors) {
    let a = Infinity;
    let b;
    let i = 0,
      j = 0;
    for (const vi of vectors) {
      b = this.sub(vi).norm;
      if (a > b) {
        // console.log(a, b);
        a = b;
        j = i;
      }
      i++;
    }
    return j;
  }
  farthest(vectors) {
    let a = 0;
    let b, v;
    for (const vi of vectors) {
      b = this.sub(vi).norm;
      if (a < b) {
        v = vi;
        a = b;
      }
    }
    return v;
  }
  farthestIndex(vectors) {
    let a = Infinity;
    let b;
    let i = 0,
      j = 0;
    for (const vi of vectors) {
      b = this.sub(vi).norm;
      if (a < b) {
        // console.log(a, b);
        a = b;
        j = i;
      }
      i++;
    }
    return j;
  }
}
