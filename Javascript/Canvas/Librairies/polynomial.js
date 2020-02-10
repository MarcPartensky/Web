class Polynomial extends Vector {
  /*
  Create a polynomial using the unpacked list of components.
  */
  constructor(...components) {
    super(...components);
  }
  /*
  Evaluate the polynomial at a given value.
  */
  call(x) {
    let v = 0;
    for (let i=0; i<this.length; i++) {
      v += x*this[i]**i;
    }
    return v;
  }
  /*
  Delete the zeros at the end of the polynomial.
  */
  correct() {
    while (this[this.length-1]==0) {
      delete this[this.length-1];
    }
  }
  /*
  Return the degree of the polynomial.
  */
  get degree() {
    return this.length;
  }
  /*
  Multiply the polynomial with another polynomial.
  */
  mul(other) {
    let n = this.degree;
    let p = other.degree;
    let m = Math.max(n, p);
    this.iadapt(m);
    other.iadapt(m);
    let polynomial = new Polynomial();
    for (let k=0; k<m; k++) {
      let c = 0;
      for (let i=0; i<k; i++) {
        c += this[i] * other[k-i];
      }
      polynomial.push(c);
    }
    polynomial.correct();
    return polynomial;
  }
}
