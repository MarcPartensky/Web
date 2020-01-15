class Vector {
  static dim = 2;
  static color = "#FFFFFF";
  static copy(vector) {
    return new Vector(vector.components);
  }
  static fill(value, dim=this.dim) {
    const a = [];
    for (let i=0; i<dim; i++) {
      a.push(value);
    }
    return new Vector(a);
  }
  static get empty() {
    return new Vector();
  }
  static get zero() {
    return Vector.fill(0);
  }
  static get one() {
    return Vector.fill(1);
  }
  static get zero2D() {
    return new Vector(0,0);
  }
  static get zero3D() {
    return new Vector(0,0,0);
  }
  static random(dim=this.dim) {
    const components = [];
    for (let i=0; i<dim; i++) {
      components.push(Math.random());
    }
    return new Vector(components);
  }
  static format(...vectors) {
    let dim = Math.max(...vectors.map(v => v.dim));
    for (let i=0; i<vectors.length; i++) {
      vectors[i].components.push(...Array(dim-vectors[i].dim).fill(0));
    }
  }
  static sum(...vectors) {
    let v = Vector.empty;
    for (const vi of vectors) {
      this.format(v, vi);
      v.iadd(vi);
    }
    return v;
  }
  static average(...vectors) {
    return Vector.sum(...vectors).div(vectors.length);
  }
  constructor(...components) {
    if (components[0] instanceof Array) {
      components = components[0];
    }
    this.components = components;
    this.color = Vector.color; // white
  }
  get x() {
    return this.components[0];
  }
  set x(value) {
    this.components[0] = value;
  }
  get y() {
    return this.components[1];
  }
  set y(value) {
    this.components[1] = value;
  }
  get z() {
    return this.components[2];
  }
  set z(value) {
    this.components[2] = value;
  }
  get dim() {
    return this.components.length;
  }
  set dim(value) {
    throw "The dimension cannot be changed directly, however you can change it by setting new components."
  }
  get norm() {
    return Math.sqrt(this.components.map(x => x**2).reduce((x,y) => x+y));
  }
  get inv() {
    return new Vector(this.components.map(x => 1/x));
  }
  get unit() {
    let m = Math.max(...this.components);
    return new Vector(this.components.map(x => x/m));
  }
  copy(vector) {
    this.components = vector.components;
  }
  fill(value) {
    for (let i=0; i<this.dim; i++) {
      this.components[i] = value;
    }
  }
  map(f) {
    return new Vector(this.components.map(f));
  }
  imap(f) {
    for(let i=0; i<this.dim; i++) {
      this.components[i] = f(this.components[i]);
    }
  }
  reduce(f) {
    return this.components.reduce(f);
  }
  slice(a, b) {
    return new Vector(this.components.slice(a,b));
  }
  apply(vector, f) {
    var components = [];
    var m = Math.max(this.dim, vector.dim);
    for (let i=0; i<m; i++) {
      components.push(f(this.components[i],vector.components[i]));
    }
    return new Vector(components);
  }
  assign(vector, f) {
    let m = Math.max(this.dim, vector.dim);
    for (let i=0; i<m; i++) {
      this.components[i] = f(this.components[i],vector.components[i]);
    }
  }
  add(vector) {
    return this.apply(vector, (x,y) => x+y);
  }
  iadd(vector) {
    this.assign(vector, (x,y) => x+y);
  }
  sub(vector) {
    return this.apply(vector, (x,y) => x-y);
  }
  isub(vector) {
    this.assign(vector, (x,y) => x-y);
  }
  dot(vector) {
    return this.apply(vector, (x,y) => x*y);
  }
  rmul(k) {
    return this.map(x => k*x);
  }
  imul(k) {
    this.imap(x => k*x);
  }
  pow(k) {
    return this.map(x => x**k)
  }
  ipow(k) {
    this.imap(x => x**k);
  }
  prod(vector) {
    // Vectorial product
    throw "Not implemented error";
  }
  div(k) {
    return this.rmul(1/k);
  }
  idiv(k) {
    this.imul(1/k);
  }
  ifloor() {
    this.imap(Math.floor);
  }
  floor() {
    return this.map(Math.floor);
  }
  show(context, position=Vector.fill(0, this.dim)) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(...position.components);
    context.lineTo(...this.components);
    context.stroke();
    context.closePath();
  }
}
