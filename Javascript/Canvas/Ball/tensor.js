class Tensor {
  constructor(...vectors) {
    this.vectors = vectors;
  }
  get position() {
    return this.vectors[0];
  }
  set position(vector) {
    this.vectors[0] = vector;
  }
  get velocity() {
    return this.vectors[1];
  }
  set velocity(vector) {
    this.vectors[1] = vector;
  }
  get acceleration() {
    return this.vectors[2];
  }
  set acceleration(vector) {
    this.vectors[2] = vector;
  }
}
