/*
Here the tensor is fundamentally an array of tensors.
It makes it easier to use but maybe slower to compute with.
*/
class Tensor extends Array {
  /*
  Default functions arguments to be changed.
  */
  static format = [2,2];
  static zero(format=Tensor.format) {
    let t = new Tensor();
    if (this.format.length>1) {
      for (let i=0; i<format[0]; i++) {
        t.push(Tensor.zero(format.slice(1, format.length)));
      }
    } else {
      for (let i=0; i<format[0]; i++) {
        t.push(0);
      }
    }
    return t;
  }
  static fill(value, format=Tensor.format) {

  }
  static sum(...tensors) {
    let t = Tensor();
    for (let ti of tensors) {
      t.iadapt(ti);
      t.iadd(ti);
    }
    return t;
  }
  static prod(...tensors) {
    let t = Tensor();
    for (let ti of tensors) {
      t.iadapt(ti);
      t.imul(ti);
    }
    return t;
  }
  /*
  Convert an array of arrays into a tensor of tensors using
  a recursive approach.
  */
  static convert(v) {
    if (v instanceof Array) {
      if (v[0] instanceof Array) {
        return v.map(t => new Tensor(...t));
      } else {
        return v;
      }
    } else {
      return v;
    }
  }
  /*
  The constructor takes an array of arrays as input and makes
  it a tensor of tensors.
  */
  constructor(...array) {
    super(...Tensor.convert(array));
  }
  /*
  Return the order of the tensor.
  */
  get order() {
    if (this[0] instanceof Tensor) {
      return this[0].order+1;
    } else {
      return 1;
    }
  }
  /*
  Return the format of the tensor.
  */
  get format() {
    if (this[0] instanceof Tensor) {
      return [this.length].concat(this[0].format);
    } else {
      return [this.length];
    }
  }
  /*
  Map that is applied to the lowest elements only.
  */
  recmap(f) {
    if (this.order==1) {
      return new Tensor(...this.map(f));
    } else {
      return new Tensor(...this.map(t => t.recmap(f)));
    }
  }
  irecmap(f) {
    if (this.order==1) {
      return new Tensor(...this.map(f));
    } else {
      return new Tensor(...this.map(t => t.recmap(f)));
    }
  }
  neg() {
    return this.recmap(t => -t);
  }
  inv() {
    return this.recmap(t => 1/t);
  }
  floor() {
    return this.recmap(Math.floor);
  }
  rmul(k) {
    return this.recmap(t => k*t);
  }
  fill(v) {
    return this.recmap(t => v);
  }
  add(other) {
    let t = new Tensor();
    if (this.order==1) {
      for (let i=0; i<Math.max(this.length, other.length); i++) {
        t.push(this[i] + other[i]);
      }
    } else {
      for (let i=0; i<Math.max(this.length, other.length); i++) {
        t.push(this[i].add(other[i]));
      }
    }
    return t;
  }
  iadd(other) {

  }
  sub(other) {
    return this.add(other.neg());
  }
  reshape(format) {

  }
  flatten() {
    if (this.order==1) {
      return new Tensor(...this);
    } else {
      let t = new Tensor();
      for (const ti of this) {
        t = t.concat(ti.flatten());
      }
      return t;
    }
  }
}
