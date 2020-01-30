class Tensor extends Array {
  /*
  Here the tensor is fundamentally an array of arrays.
  */
  get order() {
    function recursiveOrder (v) {
      if (v[0] instanceof Array) {
        return recursiveOrder(v[0])+1;
      } else {
        return 0;
      }
    }
    return recursiveOrder(this,0);
  }
  add(t) {
    return ;

  }
}


/*
Here the tensor is fundamentally an array of tensors.
It makes it easier to use but maybe slower to compute with.
*/
class Tensor1 extends Array {
  /*
  Default functions arguments to be changed.
  */
  static format = [2,2];
  static zero(format=Tensor1.format) {
    let t = new Tensor1();
    if (this.format.length>1) {
      for (let i=0; i<format[0]; i++) {
        t.push(Tensor1.zero(format.slice(1, format.length)));
      }
    } else {
      for (let i=0; i<format[0]; i++) {
        t.push(0);
      }
    }
    return t;
  }
  static fill(value, format=Tensor1.format) {

  }
  /*
  Convert an array of arrays into a tensor of tensors using
  a recursive approach.
  */
  static convert(v) {
    if (v instanceof Array) {
      if (v[0] instanceof Array) {
        return v.map(t => new Tensor1(...t));
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
    super(...Tensor1.convert(array));
  }
  /*
  Return the order of the tensor.
  */
  get order() {
    if (this[0] instanceof Tensor1) {
      return this[0].order+1;
    } else {
      return 1;
    }
  }
  /*
  Return the format of the tensor.
  */
  get format() {
    if (this[0] instanceof Tensor1) {
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
      return new Tensor1(...this.map(f));
    } else {
      return new Tensor1(...this.map(t => t.recmap(f)));
    }
  }
  irecmap(f) {
    if (this.order==1) {
      return new Tensor1(...this.map(f));
    } else {
      return new Tensor1(...this.map(t => t.recmap(f)));
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
    let t = new Tensor1();
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
      return new Tensor1(...this);
      }
    } else {
      let t = new Tensor1();
      for (const ti of this) {
        t = t.concat(ti.flatten());
      }
      return t;
    }
  }
}
