class Motion extends Matrix {
  get position() {
    return new Vector(...this[0]);
  }
  set position(v) {
    this[0] = v.components;
  }
  get velocity() {
    return new Vector(...this[1]);
  }
  set velocity(v) {
    this[1] = v.components;
  }
  get acceleration() {
    return new Vector(...this[2]);
  }
  set acceleration(v) {
    this[2] = v.components;
  }

  get x() {
    return this[0][0];
  }
  set x(v) {
    this[0][0] = v;
  }
  get y() {
    return this[0][1];
  }
  set y(v) {
    this[0][1] = v;
  }
  get z() {
    return this[0][2];
  }
  set z(v) {
    this[0][2] = v;
  }

  get vx() {
    return this[1][0];
  }
  set vx(v) {
    this[1][0] = v;
  }
  get vy() {
    return this[1][1];
  }
  set vy(v) {
    this[1][1] = v;
  }
  get vz() {
    return this[1][2];
  }
  set vz(v) {
    this[1][2] = v;
  }

  get ax() {
    return this[2][0];
  }
  set ax(v) {
    this[2][0] = v;
  }
  get ay() {
    return this[2][1];
  }
  set ay(v) {
    this[2][1] = v;
  }
  get az() {
    return this[2][2];
  }
  set az(v) {
    this[2][2] = v;
  }

  update(dt=1) {
    for(let x=0; x<this.width-1; x++) {
      for(let y=0; y<this.height; y++) {
        this[x][y] = this[x+1][y]*dt;
      }
    }
  }

}
