class Vector extends Array{
  static dim = 2;
  static color = "#FFFFFF";
  static copy(vector) {
    return new Vector(...vector.components);
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
    let v = new Vector(dim);
    for (let i=0; i<dim; i++) {
      v[i] = Math.random();
    }
    return v;
  }
  static fill(value, dim=this.dim) {
    let v = Vector(dim);
    for (let i=0; i<dim; i++) {
      v[i] = value;
    }
    return v;
  }
  static adapt(...vectors) {
    let dim = Math.max(...vectors.map(v => v.dim));
    for (let i=0; i<vectors.length; i++) {
      vectors[i].push(...Array(dim-vectors[i].dim).fill(0));
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
  get dim() {
    return this.length;
  }
  get components() {
    return Array(...this);
  }
  set components(values) {
    for (let i=0; i<values.length; i++) {
      this[i] = values[i];
    }
  }
  set dim(value) {
    throw "The dimension cannot be changed directly, however you can change it by setting new components."
  }
  get norm() {
    return Math.sqrt(this.components.map(x => x**2).reduce((x,y) => x+y));
  }
  get inv() {
    return this.map(x => 1/x);
  }
  get unit() {
    let m = Math.max(...this);
    return this.map(x => x/m);
  }
  copy(vector) {
    this.components = vector.components;
  }
  fill(value) {
    for (let i=0; i<this.dim; i++) {
      this[i] = value;
    }
  }
  map(f) {
    return new Vector(...this.components.map(f));
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
    return new Vector(...this.components.slice(a,b));
  }
  apply(vector, f) {
    var components = [];
    var m = Math.max(this.dim, vector.dim);
    for (let i=0; i<m; i++) {
      this.push(f(this[i],vector[i]));
    }
    return new Vector(components);
  }
  assign(vector, f) {
    let m = Math.max(this.dim, vector.dim);
    for (let i=0; i<m; i++) {
      this[i] = f(this[i],vector[i]);
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


v1 = Vector.random();
v2 = Vector.random();
console.log(Vector.sum(v1, v2));
