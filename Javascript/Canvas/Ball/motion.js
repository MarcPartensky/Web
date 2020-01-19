class Motion extends Matrix{
  static random(n=3) {
    let matrix = Array(3);
    for (let i=0; i<n; i++) {
      matrix[i] = Vector.random();
    }
    return new Motion(...matrix);
  }
  get position() {
    return this.vectors[0];
  }
  set position(matrix) {
    this.matrix[0] = matrix;
  }
  get velocity() {
    return this.matrix[1];
  }
  set velocity(matrix) {
    this.matrix[1] = matrix;
  }
  get acceleration() {
    return this.matrix[2];
  }
  set acceleration(matrix) {
    this.matrix[2] = matrix;
  }
  get vectors() {
    return this.matrix.vectors;
  }
  update(dt=1) {
    for(let x=0; x<this.width-1; x++) {
      for(let y=0; y<this.height; y++) {
        this.matrix[x][y] = this.matrix[x+1][y]*dt;
      }
    }
  }

}
